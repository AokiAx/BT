from . import register_tool
from .base import _xml_response, BASH_MAX_RETURN_CHARS
import threading
import subprocess
import time
import uuid
import os
import json
import re

_RM_CMD_RE = re.compile(r"\brm\s")
_RM_REC_RE = re.compile(r"""-\w*[rR]\w*|--recursive\b""")   # -r/-R/-rf/-Rf/--recursive
_RM_FORCE_RE = re.compile(r"""-\w*f\w*|--force\b""")        # -f/-rf/--force
_RM_ROOT_RE = re.compile(r"""(?:^|[\s"'`(])/(?:\*+|\.(?:\.)?)?(?=["']|[\s;&|)]|$)""")

def _is_rm_root_disaster(command: str) -> bool:
    m = _RM_CMD_RE.search(command)
    if not m:
        return False
    tail = command[m.start():]
    return bool(_RM_REC_RE.search(tail) and _RM_FORCE_RE.search(tail) and _RM_ROOT_RE.search(tail))

_CMD_SESSION = threading.local()

def _get_session_context():
    """从线程局部变量中获取当前会话上下文。
    
    Returns:
        tuple: (session_id, sessions_dir)，若未设置则返回 (None, None)
    """
    return getattr(_CMD_SESSION, 'session_id', None), getattr(_CMD_SESSION, 'sessions_dir', None)

# --- Command Manager for Non-blocking Commands ---
class CommandManager:
    """后台命令管理器，负责管理非阻塞命令的生命周期。
    
    支持命令的启动、状态查询、输出读取、结果持久化和跨会话恢复。
    使用线程安全的字典存储命令状态，通过后台线程异步读取命令输出。
    """
    
    def __init__(self):
        """初始化命令管理器，创建空的命令字典和线程锁。"""
        self.commands = {}
        self.lock = threading.Lock()
        self._file_lock = threading.Lock()

    def start_command(self, command: str, cwd: str, session_id: str = None, sessions_dir: str = None, background: bool = False, no_wait: bool = False) -> tuple:
        """启动一个新的子进程命令。
        
        Args:
            command: 要执行的 shell 命令字符串。
            cwd: 命令执行的工作目录。
            session_id: 会话ID，用于关联命令与会话。
            sessions_dir: 会话目录路径，用于持久化结果。
            background: 是否为后台命令（影响是否持久化结果）。
            no_wait: 是否为常驻命令（如启动服务），标记后不会进入 wait_for_commands 等待。
            
        Returns:
            tuple: (cmd_id, error)，成功时 error 为 None，失败时 cmd_id 为 None。
        """
        cmd_id = str(uuid.uuid4())
        
        shell_cmd = command
        if os.name == 'nt':
             shell_cmd = ["powershell", "-Command", command]
        
        try:
            process = subprocess.Popen(
                shell_cmd,
                cwd=cwd,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1,
                encoding='utf-8',
                errors='replace',
                shell=False if os.name == 'nt' else True 
            )
        except Exception as e:
            return None, str(e)

        cmd_info = {
            "id": cmd_id,
            "session_id": session_id,
            "sessions_dir": sessions_dir,
            "process": process,
            "output": [], # List of lines
            "status": "running",
            "start_time": time.time(),
            "cwd": cwd,
            "command": command,
            "background": background,
            "no_wait": no_wait
        }
        
        with self.lock:
            self.commands[cmd_id] = cmd_info

        # 启动后台线程读取命令输出
        t = threading.Thread(target=self._read_output, args=(cmd_id, process))
        t.daemon = True
        t.start()
        
        return cmd_id, None

    def _read_output(self, cmd_id, process):
        """后台线程：持续读取子进程的标准输出，命令结束时更新状态并持久化结果。
        
        此方法在独立线程中运行，逐行读取输出并存储到 cmd_info["output"] 列表中。
        当进程结束时，将状态设为 "done" 并触发结果持久化。
        
        Args:
            cmd_id: 命令的唯一标识符。
            process: subprocess.Popen 对象。
        """
        try:
            for line in iter(process.stdout.readline, ''):
                cmd = self.commands.get(cmd_id)
                if cmd:
                    cmd["output"].append(line)
        except Exception:
            pass
        finally:
            try:
                process.stdout.close()
            except:
                pass
            
            # 等待进程结束并获取返回码
            return_code = process.wait()
            
            with self.lock:
                if cmd_id in self.commands:
                    # 保留 stop_command 设置的 "stopped" 状态，不覆盖为 "done"
                    if self.commands[cmd_id]["status"] != "stopped":
                        self.commands[cmd_id]["status"] = "done"
                    self.commands[cmd_id]["returncode"] = return_code

            # 命令完成后持久化结果到磁盘
            self._persist_command_result(cmd_id)

    def get_status(self, cmd_id: str, priority: str = "bottom", limit: int = 1000):
        """获取指定命令的当前状态和部分输出。
        
        Args:
            cmd_id: 命令的唯一标识符。
            priority: 输出优先级，"bottom" 返回最新行，"top" 返回最早行。
            limit: 最多返回的输出行数。
            
        Returns:
            dict: 包含 status, returncode, output, cwd, command 的字典，
                  若命令不存在则返回 None。
        """
        with self.lock:
            if cmd_id not in self.commands:
                return None
            cmd = self.commands[cmd_id]
            lines = cmd["output"][-limit:] if priority == "bottom" else cmd["output"][:limit]
            status, returncode, cwd, command = cmd["status"], cmd.get("returncode"), cmd["cwd"], cmd["command"]
        return {
            "status": status,
            "returncode": returncode,
            "output": "".join(lines),
            "cwd": cwd,
            "command": command,
        }

    def get_running_command_ids(self, session_id: str = None, exclude_no_wait: bool = False) -> list:
        """获取当前正在运行的命令ID列表。
        
        Args:
            session_id: 可选，仅返回属于该会话的运行中命令。
            exclude_no_wait: 为 True 时排除标记为 no_wait 的常驻命令（如启动的服务）。
            
        Returns:
            list: 状态为 "running" 的命令ID列表。
        """
        with self.lock:
            result = []
            for cid, cmd in self.commands.items():
                if cmd["status"] == "running":
                    if session_id is not None and cmd.get("session_id") != session_id:
                        continue
                    if exclude_no_wait and cmd.get("no_wait"):
                        continue
                    result.append(cid)
            return result

    def list_commands(self, session_id: str, include_output_preview: bool = False, output_preview_lines: int = 20) -> list:
        """非破坏性地列出指定会话的所有后台命令（不清除命令）。
        
        Args:
            session_id: 会话ID，只返回属于该会话的命令。
            include_output_preview: 是否在列表中附带输出预览（最后N行）。
            output_preview_lines: 输出预览的行数，默认20。
            
        Returns:
            list: 命令信息字典列表，按 start_time 降序排列（最新的在前）。
        """
        with self.lock:
            results = []
            for cid, cmd in self.commands.items():
                if cmd.get("session_id") != session_id:
                    continue
                info = {
                    "id": cmd["id"],
                    "session_id": cmd.get("session_id"),
                    "command": cmd["command"],
                    "cwd": cmd["cwd"],
                    "status": cmd["status"],
                    "returncode": cmd.get("returncode"),
                    "start_time": cmd["start_time"],
                    "background": cmd.get("background", False),
                    "stopped_by_user": cmd.get("_stopped_by_user", False),
                    "output_lines": len(cmd["output"])
                }
                if include_output_preview:
                    lines = cmd["output"][-output_preview_lines:]
                    info["output_preview"] = "".join(lines)
                results.append(info)
        results.sort(key=lambda x: x["start_time"], reverse=True)
        return results

    def get_finished_commands(self, session_id: str = None) -> list:
        """非阻塞地获取已完成（done/stopped）的后台命令结果，并从内部状态中清除。
        
        与 wait_for_commands 不同，此方法不会阻塞等待运行中的命令，
        仅返回当前已经完成的命令。用于在工具执行循环中主动检测后台命令完成，
        避免模型在调用其他工具期间不知道后台命令已完成。
        
        Args:
            session_id: 会话ID，仅返回属于该会话的命令结果。
            
        Returns:
            已完成命令的结果字典列表。
        """
        # 扫描所有命令，收集非 running 状态且属于当前会话的命令
        results = []
        finished_ids = []
        sessions_dir = None

        with self.lock:
            for cid, cmd in self.commands.items():
                if cmd["status"] == "running":
                    continue
                if session_id is not None and cmd.get("session_id") != session_id:
                    continue
                results.append(self._result_dict(cmd))
                finished_ids.append(cid)
                if not sessions_dir:
                    sessions_dir = cmd.get("sessions_dir")

        # 从内部状态中删除已消费的命令
        for cid in finished_ids:
            with self.lock:
                if cid in self.commands:
                    del self.commands[cid]

        # 清理磁盘持久化文件中对应的条目，防止下次对话重复消费
        if finished_ids and sessions_dir and session_id:
            self._remove_persisted_entries(set(finished_ids), sessions_dir, session_id)

        return results

    def _get_command_output(self, cmd_id: str) -> str:
        """获取指定命令的完整输出（拼接所有行）。
        
        Args:
            cmd_id: 命令的唯一标识符。
            
        Returns:
            str: 命令的完整输出文本，若命令不存在则返回空字符串。
        """
        with self.lock:
            if cmd_id in self.commands:
                return "".join(self.commands[cmd_id]["output"])
            return ""

    def _result_dict(self, cmd):
        """从命令信息字典构建标准化的结果字典。
        
        Args:
            cmd: 命令信息字典（self.commands 中的条目）。
            
        Returns:
            dict: 包含 id, session_id, status, returncode, output, cwd, command 的结果字典。
        """
        return {
            "id": cmd["id"],
            "session_id": cmd.get("session_id"),
            "status": cmd["status"],
            "returncode": cmd.get("returncode", -1),
            "output": "".join(cmd["output"]),
            "cwd": cmd["cwd"],
            "command": cmd["command"],
            "_stopped_by_user": cmd.get("_stopped_by_user", False)
        }

    def _persist_command_result(self, cmd_id):
        """将后台命令的执行结果持久化到磁盘文件。
        
        仅在命令标记为 background=True 且未被 wait_for_commands 消费时才会持久化，
        避免与 wait_for_commands 的结果重复。
        
        Args:
            cmd_id: 命令的唯一标识符。
        """
        with self.lock:
            if cmd_id not in self.commands:
                return
            cmd = self.commands[cmd_id]
            if cmd.get("_consumed_by_wait"):
                return
            if not cmd.get("background") and not cmd.get("_stopped_by_user"):
                return
            sessions_dir = cmd.get("sessions_dir")
            session_id = cmd.get("session_id")
            if not sessions_dir or not session_id:
                return
            result = self._result_dict(cmd)
        self._persist_results([result], sessions_dir, session_id)

    def _persist_results(self, results, sessions_dir, session_id):
        """将命令结果列表追加写入持久化文件。
        
        持久化文件路径：{sessions_dir}/{session_id}/.bg_command_results.json
        
        Args:
            results: 要持久化的结果字典列表。
            sessions_dir: 会话目录路径。
            session_id: 会话ID。
        """
        if not sessions_dir or not session_id:
            return
        bg_file = os.path.join(sessions_dir, session_id, '.bg_command_results.json')
        with self._file_lock:
            try:
                os.makedirs(os.path.dirname(bg_file), exist_ok=True)
                existing = []
                if os.path.exists(bg_file):
                    try:
                        with open(bg_file, 'r', encoding='utf-8') as f:
                            existing = json.load(f)
                    except Exception:
                        pass
                existing.extend(results)
                with open(bg_file, 'w', encoding='utf-8') as f:
                    json.dump(existing, f, ensure_ascii=False)
            except Exception:
                pass

    def consume_persisted_results(self, sessions_dir: str, session_id: str) -> list:
        """消费（读取并删除）持久化的后台命令结果。
        
        在新对话开始时调用，用于获取上一轮对话中后台命令的完成结果。
        读取后会删除持久化文件，确保不会重复消费。
        
        Args:
            sessions_dir: 会话目录路径。
            session_id: 会话ID。
            
        Returns:
            list: 持久化的命令结果列表，若无文件或读取失败则返回空列表。
        """
        if not sessions_dir or not session_id:
            return []
        bg_file = os.path.join(sessions_dir, session_id, '.bg_command_results.json')
        if not os.path.exists(bg_file):
            return []
        with self._file_lock:
            try:
                with open(bg_file, 'r', encoding='utf-8') as f:
                    results = json.load(f)
                os.remove(bg_file)
                return results
            except Exception:
                return []

    def _remove_persisted_entries(self, cmd_ids: set, sessions_dir: str, session_id: str):
        """从持久化文件中移除指定命令ID的条目。
        
        当命令结果已被 get_finished_commands 或 wait_for_commands 消费后，
        需要同步清理持久化文件，防止下次对话重复消费。
        
        Args:
            cmd_ids: 要移除的命令ID集合。
            sessions_dir: 会话目录路径。
            session_id: 会话ID。
        """
        if not sessions_dir or not session_id:
            return
        bg_file = os.path.join(sessions_dir, session_id, '.bg_command_results.json')
        with self._file_lock:
            try:
                if not os.path.exists(bg_file):
                    return
                with open(bg_file, 'r', encoding='utf-8') as f:
                    existing = json.load(f)
                filtered = [r for r in existing if r.get("id") not in cmd_ids]
                if filtered:
                    with open(bg_file, 'w', encoding='utf-8') as f:
                        json.dump(filtered, f, ensure_ascii=False)
                else:
                    os.remove(bg_file)
            except Exception:
                pass

    def wait_for_commands(self, cmd_ids: list, poll_interval: float = 2, max_wait: float = 1800,
                          sessions_dir: str = None, session_id: str = None, wait_all: bool = True,
                          stop_event=None):
        """阻塞等待指定命令完成，超时后强制终止。
        
        当模型停止调用工具时调用，等待所有运行中的后台命令完成。
        超过 max_wait 秒后，未完成的命令会被强制终止。
        此方法会标记命令为 "_consumed_by_wait"，防止 _persist_command_result 重复持久化。
        
        Args:
            cmd_ids: 要等待的命令ID列表。
            poll_interval: 轮询间隔（秒），默认2秒。
            max_wait: 最大等待时间（秒），默认1800秒（30分钟）。
            sessions_dir: 会话目录路径，用于清理持久化文件。
            session_id: 会话ID。
            wait_all: 是否等待所有命令完成。False 时有命令完成就返回，不强制终止未完成的。
            stop_event: 可选的 threading.Event，被 set 时立即中断等待返回。
            
        Returns:
            list: 已完成命令的结果字典列表（wait_all=False 时不包含未完成的命令）。
        """
        cmd_id_set = set(cmd_ids)
        # 标记这些命令已被 wait 消费，防止 _read_output 线程重复持久化
        with self.lock:
            for cid in cmd_id_set:
                if cid in self.commands:
                    self.commands[cid]["_consumed_by_wait"] = True

        results = []
        remaining_ids = set(cmd_ids)
        start_time = time.time()

        # 轮询等待所有命令完成
        while remaining_ids and (time.time() - start_time) < max_wait:
            # 外部中断信号（如用户停止会话），立即返回
            if stop_event is not None and stop_event.is_set():
                break
            finished_ids = set()
            for cid in list(remaining_ids):
                with self.lock:
                    if cid not in self.commands:
                        finished_ids.add(cid)
                        continue
                    cmd = self.commands[cid]
                    if cmd["status"] in ("done", "stopped"):
                        finished_ids.add(cid)
                        results.append(self._result_dict(cmd))

            remaining_ids -= finished_ids

            if results and not wait_all:
                break

            if remaining_ids:
                time.sleep(poll_interval)

        if not wait_all:
            # 仅清理已完成的命令，未完成的继续后台运行
            finished_id_set = {r['id'] for r in results}
            for cid in finished_id_set:
                with self.lock:
                    if cid in self.commands:
                        del self.commands[cid]
            self._remove_persisted_entries(finished_id_set, sessions_dir, session_id)
            return results

        # 超时后强制终止未完成的命令
        for cid in remaining_ids:
            with self.lock:
                if cid in self.commands:
                    cmd = self.commands[cid]
                    try:
                        cmd["process"].terminate()
                    except Exception:
                        pass
                    cmd["status"] = "stopped"
                    results.append(self._result_dict(cmd))

        # 清理内部状态
        for cid in cmd_ids:
            with self.lock:
                if cid in self.commands:
                    del self.commands[cid]

        # 清理持久化文件中对应的条目
        self._remove_persisted_entries(cmd_id_set, sessions_dir, session_id)

        return results

    def stop_command(self, cmd_id: str, by_user: bool = True):
        """终止指定的运行中命令。
        
        Args:
            cmd_id: 命令的唯一标识符。
            by_user: 是否由用户手动停止。True=前端用户停止（保留在Manager中），
                     False=AI通过StopCommand停止（直接从Manager中移除）。
            
        Returns:
            dict: 成功终止时返回命令快照（id, command, cwd, output_lines）。
            None: 命令不存在或非运行状态时返回 None。
        """
        with self.lock:
            if cmd_id not in self.commands:
                return None
            
            cmd = self.commands[cmd_id]
            if cmd["status"] != "running":
                return None
            try:
                cmd["process"].terminate() 
            except:
                pass
            cmd["status"] = "stopped"
            snapshot = {
                "id": cmd["id"],
                "command": cmd["command"],
                "cwd": cmd["cwd"],
                "output_lines": len(cmd["output"])
            }
            if by_user:
                cmd["_stopped_by_user"] = True
                cmd["background"] = True  # 确保结果被持久化
            else:
                # AI停止的命令直接从Manager中移除
                del self.commands[cmd_id]
        return snapshot

    def stop_session_commands(self, session_id: str, by_user: bool = True) -> list:
        """原子操作：终止指定会话所有运行中的命令。
        
        Args:
            session_id: 会话ID。
            by_user: 是否由用户手动停止。True=前端用户停止（保留在Manager中），
                     False=AI停止（直接从Manager中移除）。
            
        Returns:
            list: 已停止的命令快照列表，每个元素包含 id, command, cwd, output_lines。
        """
        stopped = []
        with self.lock:
            to_remove = []
            for cid, cmd in self.commands.items():
                if cmd.get("session_id") != session_id:
                    continue
                if cmd["status"] != "running":
                    continue
                try:
                    cmd["process"].terminate()
                except:
                    pass
                cmd["status"] = "stopped"
                stopped.append({
                    "id": cmd["id"],
                    "command": cmd["command"],
                    "cwd": cmd["cwd"],
                    "output_lines": len(cmd["output"])
                })
                if by_user:
                    cmd["_stopped_by_user"] = True
                    cmd["background"] = True  # 确保结果被持久化
                else:
                    to_remove.append(cid)
            for cid in to_remove:
                del self.commands[cid]
        return stopped

_CMD_MANAGER = CommandManager()

@register_tool(category="Agent", name_cn="运行命令", risk_level="high")
class RunCommand:
    """
    执行终端命令并返回输出。

    ## 何时用
    - 运行终端命令：git/npm/pip/systemctl/docker 等
    - 链式命令：用 &&（前成功才后）或 ;（不顾前成败）串多步，单次搞定
      例：cd /www/wwwlogs && ls -la && tail -50 access.log
    - 多个独立命令要并行 → 同一消息发多个 RunCommand 调用

    ## 何时不用
    - 文件读写/编辑/搜索 → 用专用工具（Read/Write/SearchReplace/Glob/Grep），更易审查
    - 交互命令（top/nano/vi/less）→ 会 hang，别用
    - 需 sudo 交互输入 → 用非交互 flag（如 apt-get -y）

    ## 后台任务
    - 预计 >20s 或常驻不退出（启动服务/数据库/watch）→ blocking=False，后台跑，完成自动通知
    - 阻塞命令超 20s 自动转后台，无需手动设置

    ## 安全红线
    - rm -rf / 裸根、bt 面板命令
    - 写类操作（重启服务/改文件/执行脚本）先说明并获用户授权

    ## 提示
    - 避免无谓 sleep：可立即运行的命令间别休眠；必须睡保持 1-5s
    - find 起点不得为 / 或整盘根；按文件名找优先用 Glob

    Args:
        command: 终端命令，支持 && ; || 链式
        blocking: 是否阻塞等待（默认 True）。False=后台运行不阻塞会话，适合常驻服务
        cwd: 工作目录，默认当前目录
        timeout: 超时毫秒，默认 120000（2 分钟），仅 blocking=True 生效
        description: 命令简述（5-10 词）
    """
    def execute(self, command: str, blocking: bool = True, cwd: str = None, timeout: int = 120000, description: str = None) -> str:
        """执行终端命令。
        
        支持阻塞和非阻塞两种模式：
        - 阻塞模式 (blocking=True)：等待命令完成或超过自动转后台阈值后返回
        - 非阻塞模式 (blocking=False)：立即返回，命令在后台运行, 当该命令完成后，你将自动收到通知。
        
        Args:
            command: 要执行的终端命令字符串。
            blocking: 是否阻塞等待命令完成，默认 True。设为 False 时命令在后台运行且不会阻塞会话（适用于常驻服务）。
            cwd: 工作目录，默认使用当前目录。
            timeout: 超时时间（毫秒），默认120000ms（2分钟），仅阻塞模式有效。
            description: 命令描述（5-10词），用于结果展示。
            
        Returns:
            str: XML 格式的执行结果，包含命令输出或错误信息。
        """
        AUTO_BG_THRESHOLD = 20

        stripped_cmd = command.strip()
        if _is_rm_root_disaster(command):
            return _xml_response(
                "RunCommand", "error",
                "拒绝执行：已拦截。"
            )
        lc_cmd = stripped_cmd.lower()
        if (lc_cmd in ("bt",) or lc_cmd.startswith("bt ")
            or lc_cmd.startswith("/etc/init.d/bt") or lc_cmd.startswith("service bt")
            or lc_cmd.startswith("sudo bt")):
            warning = (
                "[BT Panel Command Blocked]\n"
                f"Original command: {command}\n\n"
                "禁止帮用户执行面板相关操作命令，请让用户通过宝塔 Web 界面手动完成。"
            )
            return _xml_response("RunCommand", "done", warning, max_chars=BASH_MAX_RETURN_CHARS)

        session_id, sessions_dir = _get_session_context()
        
        if not cwd:
            cwd = os.getcwd()
        
        # blocking=False 表示 AI 主动声明该命令不需要等待结果（如常驻服务），
        # 标记为 no_wait=True 让会话不阻塞在 wait_for_commands 上。
        # blocking=True 超过阈值自动转后台时 no_wait=False，仍需等待。
        no_wait = not blocking
            
        if blocking:
            try:
                cmd_id, err = _CMD_MANAGER.start_command(command, cwd, session_id=session_id, sessions_dir=sessions_dir, no_wait=no_wait)
                if err:
                    return _xml_response("RunCommand", "error", err, max_chars=BASH_MAX_RETURN_CHARS)

                start_time = time.time()
                # 阻塞等待时间上限：取 AUTO_BG_THRESHOLD 和 timeout 的较小值
                max_block = min(AUTO_BG_THRESHOLD, timeout / 1000.0)

                # 轮询等待命令完成
                while time.time() - start_time < max_block:
                    status_info = _CMD_MANAGER.get_status(cmd_id)
                    if not status_info:
                        return _xml_response("RunCommand", "error", "Command process lost unexpectedly", max_chars=BASH_MAX_RETURN_CHARS)

                    if status_info["status"] in ("done", "stopped"):
                        output = status_info["output"]

                        final_output = output
                        if description:
                            final_output = f"Description: {description}\n\n{output}"

                        with _CMD_MANAGER.lock:
                            if cmd_id in _CMD_MANAGER.commands:
                                del _CMD_MANAGER.commands[cmd_id]

                        return _xml_response("RunCommand", "done", final_output, max_chars=BASH_MAX_RETURN_CHARS)

                    # 会话停止则终止子进程 + 返回部分输出(≤1s 响应)
                    _stop_ev = getattr(_CMD_SESSION, 'stop_event', None)
                    if _stop_ev is not None and _stop_ev.is_set():
                        try:
                            cmd_info = _CMD_MANAGER.commands.get(cmd_id)
                            if cmd_info and cmd_info.get("process"):
                                cmd_info["process"].terminate()
                        except Exception:
                            pass
                        partial = _CMD_MANAGER._get_command_output(cmd_id)
                        with _CMD_MANAGER.lock:
                            _CMD_MANAGER.commands.pop(cmd_id, None)
                        return _xml_response("RunCommand", "error",
                            f"命令因会话停止而中止\n部分输出:\n{partial}", max_chars=BASH_MAX_RETURN_CHARS)

                    time.sleep(1)

                # 超过阈值未完成，自动转为后台执行
                current_output = _CMD_MANAGER._get_command_output(cmd_id)
                with _CMD_MANAGER.lock:
                    if cmd_id in _CMD_MANAGER.commands:
                        _CMD_MANAGER.commands[cmd_id]["background"] = True
                result = f"""
<terminal_cwd>{cwd}</terminal_cwd>
注意：命令已超过 {AUTO_BG_THRESHOLD} 秒的自动后台执行阈值，已自动切换为后台执行。
<command_id>{cmd_id}</command_id>
命令已经切换至后台运行。当该命令完成后你将自动收到通知。如需等待该命令完成，请停止后续动作并等待系统的通知。
[目前的命令输出]：
```
{current_output or "暂无命令输出"}
```
"""
                return _xml_response("RunCommand", "running", result, max_chars=BASH_MAX_RETURN_CHARS)

            except Exception as e:
                return _xml_response("RunCommand", "error", str(e), max_chars=BASH_MAX_RETURN_CHARS)
        else:
            # 非阻塞模式：直接以 background=True 启动
            cmd_id, err = _CMD_MANAGER.start_command(command, cwd, session_id=session_id, sessions_dir=sessions_dir, background=True, no_wait=no_wait)
            if err:
                return _xml_response("RunCommand", "error", err, max_chars=BASH_MAX_RETURN_CHARS)
                
            result = f"""
<terminal_cwd>{cwd}</terminal_cwd>
注意：命令 ID 供你稍后检查命令状态使用。
<command_id>{cmd_id}</command_id>
命令已经切换至后台运行。当该命令完成后你将自动收到通知。如需等待该命令完成，请停止后续动作并等待系统的通知。
"""
            return _xml_response("RunCommand", "running", result, max_chars=BASH_MAX_RETURN_CHARS)

@register_tool(category="Agent", name_cn="检查命令状态", risk_level="low")
class CheckCommandStatus:
    """
    Check the status and output of a non-blocking command.
    
    Args:
        command_id: ID of the command to get status for.
        output_priority: Priority for displaying command output. 'bottom' (show newest lines) or 'top'.
    """
    def execute(self, command_id: str, output_priority: str = "bottom") -> str:
        """检查指定命令的执行状态和输出。通常每个命令只需要检查一次。
        注意:禁止重复调用该工具，这是一个无意义的行为，因为会在命令完成后自动向你通知。
        
        Args:
            command_id: 要检查的命令ID。
            output_priority: 输出优先级，"bottom" 显示最新行，"top" 显示最早行。
            
        Returns:
            str: XML 格式的命令状态和输出日志。
        """
        status_info = _CMD_MANAGER.get_status(command_id, output_priority)
        if not status_info:
            return _xml_response("CheckCommandStatus", "error", "Command ID not found")
            
        # 命令已完成，从管理器中清理
        if status_info["status"] in ("done", "stopped"):
            with _CMD_MANAGER.lock:
                if command_id in _CMD_MANAGER.commands:
                    del _CMD_MANAGER.commands[command_id]

        logs = status_info["output"]
        status_str = status_info["status"]
        
        # 若命令仍在运行，提醒模型不要重复轮询
        running_hint = ""
        if status_str == "running":
            running_hint = """
提醒：你不需要重复调用 CheckCommandStatus。命令完成后你将自动收到通知。请停止轮询并等待——重复调用会浪费计算资源和用户配额。如果你当前正在循环轮询或使用Sleep-轮询模式，请立即停止。
"""

        result = f"""
<terminal_cwd>{status_info['cwd']}</terminal_cwd>
<command_id>{command_id}</command_id>
<command_status>{status_str.capitalize()}</command_status><command_run_logs>
command output:
```
{logs}
```
</command_run_logs>
{running_hint}"""
        return _xml_response("CheckCommandStatus", "done", result, max_chars=BASH_MAX_RETURN_CHARS)

@register_tool(category="Agent", name_cn="停止命令", risk_level="medium")
class StopCommand:
    """
    停止指定运行中的命令。
    
    Args:
        command_id: 要停止的命令ID。
    """
    def execute(self, command_id: str) -> str:
        """停止指定的运行中命令。
        
        Args:
            command_id: 要停止的命令ID。
            
        Returns:
            str: XML 格式的停止结果，成功或失败信息。
        """
        if _CMD_MANAGER.stop_command(command_id, by_user=False):
            return _xml_response("StopCommand", "done", f"Command {command_id} stopped.")
        else:
            return _xml_response("StopCommand", "error", f"Failed to stop command {command_id} (not running or not found).")
