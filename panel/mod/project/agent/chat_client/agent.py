import json
import logging
import traceback
import threading
from typing import Generator, List, Dict, Any, Optional, Union
import openai # noqa
import uuid
import os
import platform
import datetime
import queue
import time
from concurrent.futures import ThreadPoolExecutor

import public # noqa
from mod.project.agent.chat_client.memory import MemoryManager
from mod.project.agent.chat_client.retrieval import RAGService, ExternalRAGService
from mod.project.agent.chat_client.context_compactor import ContextCompactor

from .tools import registry
from .tools.base import _xml_response, process_tool_return, BASH_MAX_RETURN_CHARS
from .tools.terminal import _CMD_MANAGER, _CMD_SESSION
from .tools.task import SubAgent
from .tools_hooks import ToolGuard

BINARY_EXTENSIONS = {
    '.zip', '.tar', '.gz', '.exe', '.dll', '.so', '.class', '.jar', '.war', '.7z',
    '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.ico', '.pdf', '.doc', '.docx', '.xls', '.xlsx',
    '.mp3', '.mp4', '.avi', '.mov', '.wmv', '.flv', '.wav', '.ogg', '.mpg', '.mpeg',
    '.iso', '.bin', '.dat', '.db', '.sqlite', '.pyc', '.pyo'
}

# normalize 缺失 tool 结果的占位(常量;保缓存:不带易变量)
PLACEHOLDER_TOOL_RESULT = "<aborted>结果缺失(会话中断)"

# 并发控制: 开关 + SERIAL_TOOLS 名单 + _should_run_serial 决策
BANKAI = True
SERIAL_TOOLS = set()  # 强制串行的工具, 如 {"Write"})

class Agent:
    __version__ = "11.8.1_7.9"

    def __init__(self, session_id: str, config: Dict[str, Any] = None):
        self.session_id = session_id
        self.config = config or {}

        # 提取配置
        self.api_key = self.config.get("api_key")
        base_url = self.config.get("base_url")
        self.base_url = public.get_home_node(base_url) if base_url and 'bt.cn' in base_url else base_url
        self.model_name = self.config.get("model_name")
        self.rag_trigger_threshold = self.config.get("rag_trigger_threshold", 10)
        self.max_tool_iterations = self.config.get("max_tool_iterations", 10)
        self.enabled_tools = self.config.get("tools", [])
        self.default_headers = self.config.get("default_headers", {})
        self.default_headers["X-CVERSION"] = self.__version__
        self.system_prompt = self.config.get("system_prompt", "")
        self.temperature = self.config.get("temperature", 1)
        self.top_p = self.config.get("top_p", 1)

        # 官网知识库
        self.use_external_kb = self.config.get("use_external_kb", False)
        self.external_kb_appid = self.config.get("external_kb_appid", "bt_app_002")

        self.current_dir = self.config.get("cwd") or os.getcwd()

        # 主/子代理标志：子代理由 SubAgent 派生（_task_depth>0）。所有主子差异基于此判断
        self.is_subagent = self.config.get("_task_depth", 0) > 0

        # Skills 默认追加，子代理除外
        if not self.is_subagent and "Skills" not in self.enabled_tools:
            self.enabled_tools.append("Skills")

        self.memory = MemoryManager(
            session_id=session_id,
            sessions_dir=self.config.get("sessions_dir", "sessions"),
            sliding_window_size=self.config.get("sliding_window_size", 10),
            skill_agent_id=self.config.get("skill_agent_id"),
            model_name=self.model_name
        )

        # 将 MemoryManager 确定的 session_dir 传递给 RAGService
        self.rag = RAGService(
            session_dir=self.memory.session_dir,
            openai_api_key=self.api_key,
            openai_base_url=self.base_url,
            embedding_api_key=self.config.get("embedding_api_key"),
            embedding_base_url=self._process_url(self.config.get("embedding_base_url")),
            embedding_model_name=self.config.get("embedding_model_name"),
            small_model_name=self.config.get("small_model_name"),
            rag_retrieval_count=self.config.get("rag_retrieval_count", 10),
            rag_final_count=self.config.get("rag_final_count", 5),
            default_headers=self.default_headers
        )

        # 全局的知识库 RAG Service
        self.global_rag=None
        if self.use_external_kb:
            self.global_rag = ExternalRAGService(
                enable_rag_judgment=self.config.get("enable_rag_judgment", True),
                default_headers=self.default_headers
            )

        self.client = openai.OpenAI(
            api_key=self.api_key,
            base_url=self.base_url,
            default_headers=self.default_headers
        )

        # 停止信号：close() 时设置，供 wait_for_commands 轮询中断
        self._stop_event = threading.Event()

    def _process_url(self, url):
        if url and 'bt.cn' in url:
            return public.get_home_node(url)
        return url

    def _get_environment_info(self) -> str:
        """Constructs environment information string to append to system prompt."""
        cwd = self.current_dir
        if os.path.exists(cwd):
            is_git = os.path.isdir(os.path.join(cwd, ".git"))
        else:
            is_git = False
        plat = platform.system().lower()
        today = datetime.date.today().strftime("%Y-%m-%d")

        # Note: model info is usually handled by the caller/config,
        # but we can try to include what we have.
        # The prompt template requested:
        # You are powered by the model named ${model.api.id}. The exact model ID is ${model.providerID}/${model.api.id}

        env_info = f"""

You are powered by the model named {self.model_name}.

Here is some useful information about the environment you are running in:
<env>
  Working directory: {cwd}
  Is directory a git repo: {"yes" if is_git else "no"}
  Platform: {plat}
  Today's date: {today}
</env>
<directories>
</directories>
"""
        return env_info

    def _is_binary_file(self, file_path: str) -> bool:
        """检查文件是否为二进制文件"""
        ext = os.path.splitext(file_path)[1].lower()
        if ext in BINARY_EXTENSIONS:
            return True

        try:
            with open(file_path, 'rb') as f:
                chunk = f.read(8192)
                if b'\x00' in chunk:
                    return True
        except:
            pass
        return False

    def _process_site_reference(self, site_name: str) -> tuple:
        """
        处理网站引用，返回 (call_prompt, result) 元组
        """
        call_prompt = f'[系统预处理] 检测到用户提到网站 "{site_name}"，已自动从数据库获取该网站的基础信息：'
        try:
            site_info = public.M('sites').where('name=?', (site_name,)).field('name,path,status,project_type,project_config').find()

            if not site_info:
                result = f'未找到网站: {site_name}'
            else:
                status_text = '开启' if site_info.get('status') == '1' else '关闭'
                result = f"网站基础信息:\n"
                result += f"- 网站名称(name): {site_info.get('name', '')}\n"
                result += f"- 项目路径(path): {site_info.get('path', '')}\n"
                result += f"- 网站状态(status): {status_text} (1=开启, 0=关闭)\n"
                result += f"- 项目类型(project_type): {site_info.get('project_type', 'PHP')}\n"
                result += f"- 项目配置(project_config): {site_info.get('project_config', '{}')}\n"
                result += f"\n字段说明:\n"
                result += f"- path: 网站项目路径\n"
                result += f"- status: 网站状态，1为开启状态，0为关闭状态\n"
                result += f"- project_type: 项目类型，如PHP、Java、Node等等\n"
                result += f"- project_config: 项目的额外配置，如果是需要启动的项目通常包含启动命令等信息，如果是静态或PHP项目通常为空\n"
        except Exception as e:
            result = f'获取网站信息失败: {str(e)}'

        return (call_prompt, result)

    def _process_file_reference(self, file_path: str) -> tuple:
        """
        处理单个文件引用，返回 (call_prompt, result) 元组
        """
        if not os.path.exists(file_path):
            return (
                f'Called the Read tool with the following input: {{"filePath":"{file_path}"}}',
                f'ERROR: 文件路径不存在: {file_path}'
            )

        if os.path.isdir(file_path):
            call_prompt = f'Called the LS tool with the following input: {{"path":"{file_path}"}}'
            try:
                from .tools.agent_tools import LS
                result = LS(path=file_path)
            except Exception as e:
                result = f'ERROR: 读取文件夹失败: {str(e)}'
            return (call_prompt, result)

        if self._is_binary_file(file_path):
            return (
                f'Called the Read tool with the following input: {{"filePath":"{file_path}"}}',
                f'ERROR: 当前是二进制文件还不支持读取: {file_path}'
            )

        call_prompt = f'Called the Read tool with the following input: {{"filePath":"{file_path}"}}'
        try:
            from .tools.read import Read
            result = Read(file_path=file_path)
        except Exception as e:
            result = f'ERROR: 读取文件失败: {str(e)}'
        return (call_prompt, result)

    def _process_user_input_files(self, user_input: Union[str, List[Dict[str, Any]]]) -> Union[str, List[Dict[str, Any]]]:
        """
        处理用户输入中的文件引用，将文件内容追加到 content 列表中
        """
        if isinstance(user_input, str):
            return user_input

        if not isinstance(user_input, list):
            return user_input

        file_refs = [item for item in user_input if isinstance(item, dict) and item.get("type") == "file"]
        site_refs = [item for item in user_input if isinstance(item, dict) and item.get("type") == "site"]

        if not file_refs and not site_refs:
            return user_input

        new_content = list(user_input)

        for file_ref in file_refs:
            file_path = file_ref.get("path", "")
            if not file_path:
                continue

            call_prompt, result = self._process_file_reference(file_path)

            new_content.append({
                "type": "text",
                "text": call_prompt,
                "ismeta": True
            })
            new_content.append({
                "type": "text",
                "text": result,
                "ismeta": True
            })

        for site_ref in site_refs:
            site_name = site_ref.get("name", "") or site_ref.get("path", "")
            if not site_name:
                continue

            call_prompt, result = self._process_site_reference(site_name)

            new_content.append({
                "type": "text",
                "text": call_prompt,
                "ismeta": True
            })
            new_content.append({
                "type": "text",
                "text": result,
                "ismeta": True
            })

        return new_content

    def close(self):
        """
        关闭 Agent，释放资源。
        """
        self._stop_event.set()
        self.rag.close()
        if self.global_rag:
            self.global_rag.close()
        self.client.close()

    def _build_bg_command_messages(self, results: list, messages: list):
        """将后台命令结果注入 messages、持久化、并 yield 给前端。

        将所有后台命令结果合并为一个 role=user 的消息块，
        每个结果作为 content 数组中的一个 text block，
        使用 <system-reminder> 标签包裹提示内容。
        消息和每个 content block 均标记 ismeta=True，前端据此过滤渲染。
        """
        if not results:
            return

        content_blocks = []
        for r in results:
            cmd = r.get("command", "")
            cwd = r.get("cwd")

            # 对后台命令输出做长度治理，与 RunCommand 保持一致
            output = process_tool_return(
                tool_name="RunCommand",
                content=r.get("output", ""),
                max_chars=BASH_MAX_RETURN_CHARS,
            )

            # 根据是否为用户手动停止，构建不同的消息模板
            if r.get('_stopped_by_user'):
                result_text = (
                    f"<system-reminder>\n"
                    f"用户已手动停止后台命令 {r['id']} "
                    f"(status={r.get('status', 'unknown')}, "
                    f"returncode={r.get('returncode', -1)})：\n\n"
                    f"执行命令：{cmd}\n\n"
                    f"停止前的部分输出结果：\n\n"
                    f"{output}\n"
                    f"</system-reminder>"
                )
            else:
                result_text = (
                    f"<system-reminder>\n"
                    f"后台命令 {r['id']} 已完成 (status={r.get('status', 'unknown')}, "
                    f"returncode={r.get('returncode', -1)})：\n\n"
                    f"执行命令：{cmd}\n\n"
                    f"命令输出结果：\n\n"
                    f"{output}\n"
                    f"</system-reminder>"
                )

            content_blocks.append({
                "type": "text",
                "text": result_text,
                "ismeta": True
            })

        # 只合并到非 ismeta 的真正用户输入消息，避免：
        # 1. 合并到之前后台命令结果（ismeta=True）导致累积
        # 2. 在 tool 消息后错误合并（messages[-1] 非 user 时走 else 新建）
        if messages and messages[-1].get("role") == "user" and not messages[-1].get("ismeta"):
            existing_content = messages[-1].get("content")
            if isinstance(existing_content, list):
                existing_content.extend(content_blocks)
            elif isinstance(existing_content, str):
                messages[-1]["content"] = [{"type": "text", "text": existing_content}] + content_blocks
            else:
                messages[-1]["content"] = content_blocks
            messages[-1]["ismeta"] = True

            if self.memory.history and self.memory.history[-1].get("role") == "user" and not self.memory.history[-1].get("ismeta"):
                history_content = self.memory.history[-1].get("content")
                if isinstance(history_content, list):
                    history_content.extend(content_blocks)
                elif isinstance(history_content, str):
                    self.memory.history[-1]["content"] = [{"type": "text", "text": history_content}] + content_blocks
                else:
                    self.memory.history[-1]["content"] = content_blocks
                self.memory.history[-1]["ismeta"] = True
                self.memory.save_session()
            else:
                self.memory.add_message("user", content_blocks, id=str(uuid.uuid4()), ismeta=True)
        else:
            user_msg = {
                "role": "user",
                "content": content_blocks,
                "ismeta": True
            }
            # 持久化到会话文件（一条 user 消息）
            self.memory.add_message("user", content_blocks, id=str(uuid.uuid4()), ismeta=True)
            messages.append(user_msg)

        yield {"type": "persisted"}

    def _append_dynamic_reminder(self, collection: list, reminder_text: str):
        """
        将动态 reminder 文本追加到收集列表中。
        这些 reminder 会在每轮迭代时重新生成，不累积上一轮的内容。
        
        参数:
            collection: reminder 收集列表
            reminder_text: 要追加的 reminder 文本
        """
        collection.append(reminder_text)

    def _build_user_meta_message(self) -> List[Dict[str, Any]]:
        """
        构建系统环境信息的 content 列表。
        调用方需要自行包装成完整的消息字典（如 role="user", ismeta=True）。
        
        该 content 会被插入到消息数组的 system 之后，作为第一条用户消息的 content，
        并持久化到 session 文件。
        
        包含信息：操作系统、系统日期（仅日期，不含时间以提高缓存命中率）、当前模型、面板版本。
        每个 content block 标记 ismeta=True，用于前端隐藏显示。
        
        返回:
            包含系统环境信息的 content block 列表
        """
        import platform as _platform
        os_name = _platform.platform()
        current_date = datetime.date.today().strftime("%Y-%m-%d")
        panel_version = getattr(public, 'version', lambda: 'unknown')() if hasattr(public, 'version') else 'unknown'

        text = (
            f"<system-reminder>\n"
            f"以下是当前系统环境信息，请在执行任务时参考：\n"
            f"- 操作系统: {os_name}\n"
            f"- 系统日期: {current_date}\n"
            f"- 当前模型: {self.model_name}\n"
            f"- 面板版本: {panel_version}\n"
            f"在执行所有动作前，都需要判断是否有对应可以使用的Skill工具，这将会提升你的效率和理解用户需求的能力。\n"
            f"</system-reminder>"
        )

        return [{"type": "text", "text": text, "ismeta": True}]

    def _build_user_meta_reminder(self, dynamic_reminders: list) -> Optional[Dict[str, Any]]:
        """
        将动态 reminder 列表合并为独立的 ismeta 用户消息块。
        该消息块不会被持久化到 session 文件，仅追加到 request_messages 末尾，每轮重新生成。
        
        动态 reminder 包括：RAG 检索结果、Skills 列表、后台命令执行结果等。
        消息级别和每个 content block 级别均标记 ismeta=True，用于前端隐藏显示。
        
        参数:
            dynamic_reminders: 当前轮次的动态 reminder 文本列表
            
        返回:
            合并后的用户消息字典，若列表为空则返回 None
        """
        if not dynamic_reminders:
            return None

        content_blocks = []
        for reminder in dynamic_reminders:
            content_blocks.append({
                "type": "text",
                "text": reminder,
                "ismeta": True
            })

        return {
            "role": "user",
            "content": content_blocks,
            "ismeta": True
        }

    def _wrapup_reminder_text(self, remaining: int, count: int = 2) -> Optional[str]:
        """工具轮次不足 count 轮时的主动收尾 reminder 文本；否则 None。"""
        if not 0 <= remaining < count:
            return None
        return (
            "<system-reminder>\n"
            f"工具轮次即将耗尽（剩余 {remaining} 轮）。立即基于当前进度主动收尾，不要再发起新的探测或长工具链。\n"
            "按完整度给出最终结果：\n"
            "- 已完成 → 直接给结论/结果\n"
            "- 仍有未完成 → 部分完成：已确认的结论/事实 + 未完成原因 + 下一步建议方向\n"
            "</system-reminder>"
        )

    def _strip_meta_from_messages(self, messages: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        在发送给 AI API 之前，从消息数组中清除所有 ismeta 字段。
        保留消息和内容本身，仅移除 ismeta 标记

        处理两个层级：
        1. 消息级别的 ismeta 字段（如 _build_user_meta_reminder 构建的整条消息）
        2. content block 级别的 ismeta 字段（如文件/站点引用注入的内容块）
        """
        result = []
        for msg in messages:
            clean_msg = {k: v for k, v in msg.items() if k != "ismeta"}
            content = clean_msg.get("content")
            if isinstance(content, list):
                clean_content = []
                for block in content:
                    if isinstance(block, dict):
                        clean_content.append({k: v for k, v in block.items() if k != "ismeta"})
                    else:
                        clean_content.append(block)
                clean_msg["content"] = clean_content
            result.append(clean_msg)
        return result

    def _inject_cache_control(self, request_messages: list) -> list:
        """
        注入消息缓存控制字段。

        固定缓存断点策略（4 个缓存点）：
          1. 第一条 system 消息（system prompt）的末尾 content block
          2. 第二条 user 消息（首次会话持久化的系统 ENV meta 信息）的首个 text block
          3. 最后一条 user 消息（当前用户输入）的首个 text block
          4. 最后一条 tool 消息（工具执行结果）的首个 text block

        注意：必须在 meta 消息追加之前调用，确保 cache_control 只打在真正的用户输入消息上，
        而不是最末尾的 system-reminder meta 消息块上。
        """
        result = []
        for msg in request_messages:
            new_msg = dict(msg)
            content = new_msg.get("content")
            if isinstance(content, str):
                new_msg["content"] = [{"type": "text", "text": content}]
            elif isinstance(content, list):
                new_msg["content"] = [dict(block) if isinstance(block, dict) else block for block in content]
            result.append(new_msg)

        def _mark_first_text_block(message: dict) -> None:
            """在消息的 content 中找到第一个 text 类型的 block 并打上 cache_control"""
            content = message.get("content")
            if isinstance(content, list) and content:
                for block in content:
                    if isinstance(block, dict) and block.get("type") == "text":
                        block["cache_control"] = {"type": "ephemeral"}
                        return

        def _mark_last_content_block(message: dict) -> None:
            """在消息的 content 中找到最后一个 content block 并打上 cache_control"""
            content = message.get("content")
            if isinstance(content, list) and content:
                content[-1]["cache_control"] = {"type": "ephemeral"}

        # 缓存点 1: 第一条 system 消息（system prompt），打在最后一个 content block 上
        for i in range(len(result)):
            if result[i].get("role") == "system":
                _mark_last_content_block(result[i])
                break

        # 缓存点 2: 第二条 user 消息（首次会话时持久化的系统 ENV meta 信息，位于 index 1）
        # 仅在 [1] 确实是 user 消息时才打缓存点，避免误打到其他角色的消息上
        if len(result) > 1 and result[1].get("role") == "user":
            _mark_first_text_block(result[1])

        # 缓存点 3: 最后一条真正的用户输入消息（跳过 ismeta 的后台命令结果等）
        for i in range(len(result) - 1, -1, -1):
            if result[i].get("role") == "user" and not result[i].get("ismeta"):
                _mark_first_text_block(result[i])
                break

        # 缓存点 4: 最后一条 tool 消息（工具执行结果）
        for i in range(len(result) - 1, -1, -1):
            if result[i].get("role") == "tool":
                _mark_first_text_block(result[i])
                break

        # 统一消息键顺序，符合 OpenAI message 推荐顺序
        # 顶层: role -> content -> tool_calls -> tool_call_id -> name -> reasoning_content
        # 嵌套: tool_call(id -> type -> function)、function(name -> arguments)、content block(type -> text -> image_url -> cache_control)
        TOP_KEY_ORDER = {"role": 0, "content": 1, "tool_calls": 2, "tool_call_id": 3, "name": 4, "reasoning_content": 5}
        TOOL_CALL_KEY_ORDER = {"id": 0, "type": 1, "function": 2}
        FUNCTION_KEY_ORDER = {"name": 0, "arguments": 1}
        BLOCK_KEY_ORDER = {"type": 0, "text": 1, "image_url": 2, "cache_control": 3}

        def _order_keys(obj, key_order):
            if not isinstance(obj, dict):
                return obj
            return {k: obj[k] for k in sorted(obj.keys(), key=lambda x: (key_order.get(x, 99), x))}

        standardized = []
        for msg in result:
            ordered_msg = _order_keys(msg, TOP_KEY_ORDER)
            content = ordered_msg.get("content")
            if isinstance(content, list):
                ordered_msg["content"] = [
                    _order_keys(block, BLOCK_KEY_ORDER) if isinstance(block, dict) else block
                    for block in content
                ]
            tool_calls = ordered_msg.get("tool_calls")
            if isinstance(tool_calls, list):
                ordered_tc = []
                for tc in tool_calls:
                    if isinstance(tc, dict):
                        tc = _order_keys(tc, TOOL_CALL_KEY_ORDER)
                        fn = tc.get("function")
                        if isinstance(fn, dict):
                            tc["function"] = _order_keys(fn, FUNCTION_KEY_ORDER)
                    ordered_tc.append(tc)
                ordered_msg["tool_calls"] = ordered_tc
            standardized.append(ordered_msg)
        return standardized

    def _create_completion_stream(self, messages: List[Dict[str, Any]], tools: Optional[List[Dict[str, Any]]], max_tokens: int = 0):
        params = {
            "model": self.model_name,
            "messages": messages,
            "tools": tools if tools else None,
            "stream": True,
            "stream_options": {"include_usage": True},
            "temperature": self.temperature,
            "top_p": self.top_p,
            "extra_body": {}
        }
        # max_tokens>0：子代理撞墙收尾限输出（默认0不传，沿用模型上限）
        if max_tokens > 0:
            params["max_tokens"] = max_tokens

        thinking = self.config.get("thinking", False)
        web_search = self.config.get("web_search", False)

        if "qwen" in str(self.model_name).lower() or "default" in str(self.model_name).lower():
            params["extra_body"]["enable_thinking"] = thinking
            params["extra_body"]["preserve_thinking"] = thinking
            params["extra_body"]["enable_search"] = web_search
            params["extra_body"]["search_options"] = {
                "search_strategy": "max",       # 配置搜索策略为高性能模式
                "enable_search_extension": True # 垂直领域搜索增强 例如天气、股市等
            }

        if "doubao" in str(self.model_name).lower():
            enable_type = "enabled" if thinking else "disabled"
            params['extra_body']["thinking"] = {
                "type": enable_type
            }
        # todo RateLimitError重试策略, 前端友好显示?
        return self.client.chat.completions.create(**params)

    def _accumulate_usage(self, total_usage: dict, last_loop_tokens: dict, chunk) -> str:
        """
        从流式响应的 chunk 中累加 token 使用量统计。
        
        累加到 total_usage（整个聊天会话的总 token 使用量）和 
        last_loop_tokens（当前轮次的 token 使用量）。
        同时处理缓存相关的 token 统计（cache_creation_input_tokens, cached_tokens）。
        
        参数:
            total_usage: 总 token 使用量字典
            last_loop_tokens: 当前轮次 token 使用量字典
            chunk: OpenAI 流式响应 chunk
            
        返回:
            chunk 的消息 ID，若无则返回空字符串
        """
        if not chunk.usage:
            return ""
        total_usage["total_tokens"] += chunk.usage.total_tokens
        total_usage["input_tokens"] += chunk.usage.prompt_tokens
        total_usage["output_tokens"] += chunk.usage.completion_tokens
        last_loop_tokens["total_tokens"] = chunk.usage.total_tokens
        last_loop_tokens["input_tokens"] = chunk.usage.prompt_tokens
        last_loop_tokens["output_tokens"] = chunk.usage.completion_tokens
        ptd = getattr(chunk.usage, 'prompt_tokens_details', None)
        if not ptd:
            extra = getattr(chunk.usage, 'model_extra', None) or getattr(chunk.usage, '__pydantic_extra__', None) or {}
            ptd = extra.get('prompt_tokens_details')
        if ptd:
            if isinstance(ptd, dict):
                cache_creation = ptd.get('cache_creation_input_tokens', 0) or 0
                cached = ptd.get('cached_tokens', 0) or 0
            else:
                cache_creation = getattr(ptd, 'cache_creation_input_tokens', 0) or 0
                cached = getattr(ptd, 'cached_tokens', 0) or 0
            total_usage["cache_creation_input_tokens"] += cache_creation
            total_usage["cached_tokens"] += cached
            last_loop_tokens["cache_creation_input_tokens"] = cache_creation
            last_loop_tokens["cached_tokens"] = cached
        return chunk.id or ""

    def _process_completion_stream(self, response_stream, total_usage: dict, last_loop_tokens: dict):
        """
        处理 OpenAI 流式响应，累加内容并 yield 事件给前端。
        
        作为生成器函数，通过 yield from 将事件（reasoning/content/tool_call）直接转发给调用方，
        同时通过 return 传回计算结果（current_response_content, current_reasoning_content, 
        finish_reason, tool_call_chunks）。
        
        参数:
            response_stream: OpenAI 流式响应对象
            total_usage: 总 token 使用量字典
            last_loop_tokens: 当前轮次 token 使用量字典
            
        生成器:
            yield: 事件字典（type: reasoning/content/tool_call）
            return: (current_response_content, current_reasoning_content, finish_reason, tool_call_chunks)
        """
        tool_call_chunks = {}
        reported_tool_indices = set()
        current_response_content = ""
        current_reasoning_content = ""
        finish_reason = None

        for chunk in response_stream:
            msg_id = self._accumulate_usage(total_usage, last_loop_tokens, chunk)
            if msg_id:
                last_loop_tokens["_message_id"] = msg_id

            if not chunk.choices:
                continue

            delta = chunk.choices[0].delta
            if chunk.choices[0].finish_reason:
                finish_reason = chunk.choices[0].finish_reason

            if getattr(delta, "reasoning_content", None):
                current_reasoning_content += delta.reasoning_content
                yield {"type": "reasoning", "response": delta.reasoning_content}

            if delta.content:
                current_response_content += delta.content
                yield {"type": "content", "response": delta.content}

            if delta.tool_calls:
                for tc in delta.tool_calls:
                    index = tc.index
                    if index not in tool_call_chunks:
                        tool_call_chunks[index] = {"id": tc.id, "function": {"name": "", "arguments": ""}}
                    if tc.id:
                        tool_call_chunks[index]["id"] = tc.id
                    if tc.function.name:
                        tool_call_chunks[index]["function"]["name"] += tc.function.name
                    if tc.function.arguments:
                        tool_call_chunks[index]["function"]["arguments"] += tc.function.arguments
                    _entry = tool_call_chunks[index]
                    tool_name = _entry["function"]["name"]
                    # 仅 SubAgent:第一轮即预生成 task_id(唯一来源,不读模型 args)
                    if tool_name == "SubAgent" and "task_id" not in _entry:
                        _entry["task_id"] = str(uuid.uuid4())
                    if tool_name and _entry["function"]["arguments"]:
                        tool_exists = registry.tool_exists(tool_name)
                        tool_enabled = registry.is_tool_enabled(tool_name, self.enabled_tools) if tool_exists else False
                        if tool_exists and tool_enabled:
                            reported_tool_indices.add(index)
                            tool_chunk = {
                                "type": "tool_call",
                                "tool": tool_name,
                                "args": _entry["function"]["arguments"],
                                "id": _entry["id"]
                            }
                            # task_id 已预生成,透传给前端配对子任务流
                            if tool_name == "SubAgent":
                                _tid = _entry.get("task_id")
                                if _tid:
                                    tool_chunk["task_id"] = _tid
                            yield tool_chunk

        return current_response_content, current_reasoning_content, finish_reason, tool_call_chunks

    def _process_tool_calls(self, tool_call_chunks, current_response_content,
                            current_reasoning_content, messages, ai_msg_id, prev_fp):
        """工具调用分发:BANKAI=True 走并发(_concurrent),False 走原串行(_serial)。"""
        if BANKAI:
            return (yield from self._process_tool_calls_concurrent(
                tool_call_chunks, current_response_content, current_reasoning_content,
                messages, ai_msg_id, prev_fp))
        return (yield from self._process_tool_calls_serial(
            tool_call_chunks, current_response_content, current_reasoning_content,
            messages, ai_msg_id, prev_fp))

    def _process_tool_calls_serial(self, tool_call_chunks, current_response_content, current_reasoning_content,messages, ai_msg_id, prev_fp):
        """
        执行工具调用并处理结果。
        
        作为生成器函数，通过 yield from 将工具执行事件（tool_call/tool_result/subtask_stream）
        直接转发给调用方，同时通过 return 传回更新后的消息列表。
        
        主要逻辑：
        1. 将助手消息（含工具调用）添加到记忆和消息列表
        2. 逐个执行工具调用，处理存在/启用检查
        3. 特殊处理 Task 工具（子代理事件转发）和 TodoWrite/Read 工具（注入 session_id）
        4. 检查已完成的后台命令，注入到消息列表
        
        参数:
            tool_call_chunks: 工具调用块字典
            current_response_content: 当前轮次的文本响应内容
            current_reasoning_content: 当前轮次的推理内容
            messages: 消息列表（会被修改）
            ai_msg_id: AI 消息 ID
            
        生成器:
            yield: 事件字典（type: tool_call/tool_result/subtask_stream/error）
            return: messages（更新后的消息列表）
        """
        assistant_msg_kwargs = {"tool_calls": []}
        for idx in sorted(tool_call_chunks.keys()):
            tc = tool_call_chunks[idx]
            assistant_msg_kwargs["tool_calls"].append({
                "id": tc["id"], "type": "function", "function": tc["function"]
            })
        if current_reasoning_content:
            assistant_msg_kwargs["reasoning_content"] = current_reasoning_content

        # 在持久化之前验证并修复 tool_calls 的 arguments，确保是有效的 JSON 格式
        for tc in assistant_msg_kwargs["tool_calls"]:
            args_str = tc["function"]["arguments"]
            if args_str:
                try:
                    # 验证是否为有效 JSON
                    json.loads(args_str)
                except json.JSONDecodeError:
                    tc["function"]["arguments"] = '{}'

        self.memory.add_message("assistant", current_response_content, id=ai_msg_id, **assistant_msg_kwargs)
        # assistant 消息已持久化到 sessions.json，通知 stream_manager 清空已累积的 blocks
        yield {"type": "persisted"}

        assistant_api_msg = {
            "role": "assistant", "content": current_response_content,
            "tool_calls": assistant_msg_kwargs["tool_calls"],
            "reasoning_content": current_reasoning_content
        }
        messages.append(assistant_api_msg)

        _CMD_SESSION.session_id = self.session_id
        _CMD_SESSION.sessions_dir = self.config.get("sessions_dir")

        intercepted = False  # 本轮是否被 pre_hook 拦截(无真实进展), 工具循环措施计数
        for idx in sorted(tool_call_chunks):
            tc = tool_call_chunks[idx]
            func_name = tc["function"]["name"]
            args_str = tc["function"]["arguments"]
            call_id = tc["id"]

            # === pre-hook ===
            result_str = ToolGuard.pre_call(func_name, args_str, self.enabled_tools, prev_fp)
            if result_str is None:
                # === 工具执行 ===
                result_str = yield from self._execute_tool_call_serial(
                    func_name, args_str, task_id=tc.get("task_id"))
            else:
                intercepted = True  # pre_hook 拦截(不存在/未启用/循环自愈) 本轮无真实进展

            # === 工具 post-hook:回调 ===
            ToolGuard.post_call(func_name, args_str, result_str, messages)

            yield {"type": "tool_result", "tool": func_name, "result": result_str, "id": call_id}
            content_structure = [{"type": "text", "text": result_str}]
            self.memory.add_message("tool", content_structure, tool_call_id=call_id, id=ai_msg_id)
            messages.append({"role": "tool", "tool_call_id": call_id, "content": content_structure})
            yield {"type": "persisted"}

        return messages, intercepted

    def _execute_tool_call_serial(self, func_name: str, args_str: str, task_id=None):
        """执行单个工具调用。生成器:可能 yield, return 最终结果字符串。"""
        try:
            args = json.loads(args_str)

            if func_name == "SubAgent":
                agent_config = self.config.copy()
                agent_config.pop("system_prompt", None)
                agent_config.pop("tools", None)
                args["parent_config"] = agent_config
                args["parent_session_id"] = self.session_id
                args["parent_stop_event"] = self._stop_event
                # 注入源头预生成 task_id(覆盖 args),保证 session_id 与 tool_call/subtask_stream 一致
                if task_id:
                    args["task_id"] = task_id

            if func_name in ["TodoWrite", "TodoRead"]:
                args["session_id"] = self.session_id
                args["sessions_dir"] = self.config.get("sessions_dir")

            func = registry.get_tool_func(func_name)
            if not func:
                return _xml_response(func_name, "error", f"Error: Tool {func_name} not found.")
            result = func(**args)

            if func_name == "SubAgent" and hasattr(result, '__next__'):
                result_str = ""
                for event in result:
                    event_type = event.get("type")
                    if event_type == "subtask_stream":
                        yield {"type": "subtask_stream", "task_id": event.get("task_id"), "chunk": event.get("chunk")}
                    elif event_type == "subtask_done":
                        result_str = event.get("result", "")
                    elif event_type == "subtask_error":
                        result_str = _xml_response(func_name, "error", event.get("data", ""))
                return result_str or _xml_response(func_name, "error", "Task produced no result")
            return result
        except Exception as e:
            return _xml_response(func_name, "error", f"Error executing tool: {str(e)}")

    def _execute_tool_call(self, func_name: str, args_str: str) -> str:
        """同步执行单个工具(非 SubAgent)。并发 worker 直接调。开头设 _CMD_SESSION(含 stop_event)。"""
        _CMD_SESSION.session_id = self.session_id
        _CMD_SESSION.sessions_dir = self.config.get("sessions_dir")
        _CMD_SESSION.stop_event = self._stop_event
        try:
            args = json.loads(args_str)
            if func_name in ("TodoWrite", "TodoRead"):
                args["session_id"] = self.session_id
                args["sessions_dir"] = self.config.get("sessions_dir")
            func = registry.get_tool_func(func_name)
            if not func:
                return _xml_response(func_name, "error", f"Error: Tool {func_name} not found.")
            return func(**args)
        except Exception as e:
            return _xml_response(func_name, "error", f"Error executing tool: {str(e)}")

    def _should_run_serial(self, name: str, args_str: str) -> bool:
        """单个工具是否走串行(不进并发池)。集中判断,便于扩展。"""
        if not BANKAI:
            return True
        if name in SERIAL_TOOLS:
            return True
        return False

    def _persist_assistant_turn(self, tool_call_chunks, content, reasoning, messages, ai_msg_id):
        """Phase 0: assistant(tool_calls) 落盘 + messages.append + yield persisted。含 arguments JSON 校验。"""
        tool_calls = [
            {
                "id": tool_call_chunks[i]["id"],
                "type": "function",
                "function": dict(tool_call_chunks[i]["function"])} for i in sorted(tool_call_chunks)
        ]
        for tc in tool_calls:                       # arguments JSON 校验
            a = tc["function"].get("arguments")
            if a:
                try:
                    json.loads(a)
                except json.JSONDecodeError:
                    tc["function"]["arguments"] = '{}'
        kwargs = {"tool_calls": tool_calls}
        if reasoning:
            kwargs["reasoning_content"] = reasoning
        self.memory.add_message("assistant", content, id=ai_msg_id, **kwargs)
        yield {"type": "persisted"}
        messages.append(
            {
                "role": "assistant",
                "content": content,
                "tool_calls": tool_calls,
                "reasoning_content": reasoning
            }
        )

    def _process_tool_calls_concurrent(self, tool_call_chunks, current_response_content,
                                       current_reasoning_content, messages, ai_msg_id, prev_fp):
        _CMD_SESSION.session_id = self.session_id        # 主线程(给 serial 工具 + 主线程 RunCommand)
        _CMD_SESSION.sessions_dir = self.config.get("sessions_dir")
        _CMD_SESSION.stop_event = self._stop_event

        # Phase 0: assistant(tool_calls) 落盘
        yield from self._persist_assistant_turn(
            tool_call_chunks, current_response_content, current_reasoning_content, messages, ai_msg_id
        )

        # Phase 1: 预检分流(主线程串行,原地更新 prev_fp)
        pre_results, serial_tasks, parallel_tasks = {}, [], []
        for idx in sorted(tool_call_chunks):
            tc = tool_call_chunks[idx]
            name, args_str, call_id = tc["function"]["name"], tc["function"]["arguments"], tc["id"]
            pre = ToolGuard.pre_call(name, args_str, self.enabled_tools, prev_fp)
            if pre is not None:
                pre_results[idx] = (call_id, name, pre)
            elif self._should_run_serial(name, args_str):
                serial_tasks.append((idx, call_id, name, args_str))
            else:
                parallel_tasks.append((idx, call_id, name, args_str))

        channel = queue.Queue()

        def worker(idx, call_id, name, args_str):
            _CMD_SESSION.session_id = self.session_id
            _CMD_SESSION.sessions_dir = self.config.get("sessions_dir")
            _CMD_SESSION.stop_event = self._stop_event
            try:
                if name == "SubAgent":
                    args = json.loads(args_str)
                    cfg = self.config.copy()
                    cfg.pop("system_prompt", None)
                    cfg.pop("tools", None)
                    args.update({"parent_config": cfg, "parent_session_id": self.session_id,
                                 "parent_stop_event": self._stop_event})
                    # 注入源头预生成 task_id(覆盖 args),保证 session_id 与 tool_call/subtask_stream 一致
                    _tid = tool_call_chunks[idx].get("task_id")
                    if _tid:
                        args["task_id"] = _tid
                    gen = SubAgent(**args)
                    r = ""
                    if hasattr(gen, '__next__'):
                        for ev in gen:
                            t = ev.get("type")
                            if t == "subtask_stream":
                                channel.put(("stream", call_id, ev))
                            elif t == "subtask_done":
                                r = ev.get("result", "")
                        r = r or _xml_response("SubAgent", "error", "Task produced no result")
                    else:
                        r = gen
                else:
                    r = self._execute_tool_call(name, args_str)
                channel.put(("result", idx, call_id, name, r))
            except BaseException as e:
                channel.put(("result", idx, call_id, name, _xml_response(name, "error", f"worker 异常: {e}")))

        # Phase 2: 全工具同池(含 SubAgent/RunCommand);parallel_tasks 空时不建池
        pool = ThreadPoolExecutor(max_workers=min(max(len(parallel_tasks), 1), 8)) if parallel_tasks else None
        if pool:
            for t in parallel_tasks:
                pool.submit(worker, *t)

        flushed = set()
        last_heartbeat = time.time()
        try:
            # 推 pre_results(拦截产物,index 序)
            for idx in sorted(pre_results):
                call_id, name, r = pre_results[idx]
                ToolGuard.post_call(name, tool_call_chunks[idx]["function"]["arguments"], r, messages)
                yield {"type": "tool_result", "tool": name, "result": r, "id": call_id}
                self.memory.add_message("tool", [{"type": "text", "text": r}], tool_call_id=call_id, id=ai_msg_id)
                messages.append({"role": "tool", "tool_call_id": call_id, "content": [{"type": "text", "text": r}]})
                yield {"type": "persisted"}
                flushed.add(idx)

            # serial 工具(主线程逐个,SERIAL_TOOLS 内互斥;复用生成器版透传 SubAgent 流式)
            for idx, call_id, name, args_str in serial_tasks:
                if self._stop_event.is_set():
                    break
                r = yield from self._execute_tool_call_serial(name, args_str, task_id=tool_call_chunks[idx].get("task_id"))
                ToolGuard.post_call(name, args_str, r, messages)
                yield {"type": "tool_result", "tool": name, "result": r, "id": call_id}
                self.memory.add_message("tool", [{"type": "text", "text": r}], tool_call_id=call_id, id=ai_msg_id)
                messages.append({"role": "tool", "tool_call_id": call_id, "content": [{"type": "text", "text": r}]})
                yield {"type": "persisted"}
                flushed.add(idx)

            # drain parallel_tasks(完成序)
            done = 0
            while done < len(parallel_tasks):
                if self._stop_event.is_set():
                    break
                try:
                    ev = channel.get(timeout=0.2)
                except queue.Empty:
                    if time.time() - last_heartbeat > 5:   # 心跳:防nginx
                        yield {}
                        last_heartbeat = time.time()
                    continue
                last_heartbeat = time.time()
                if ev[0] == "stream":
                    stream_ev = ev[2]
                    stream_ev["id"] = ev[1]
                    yield stream_ev
                else:
                    _, idx, call_id, name, r = ev
                    ToolGuard.post_call(name, tool_call_chunks[idx]["function"]["arguments"], r, messages)
                    yield {"type": "tool_result", "tool": name, "result": r, "id": call_id}
                    self.memory.add_message("tool", [{"type": "text", "text": r}], tool_call_id=call_id, id=ai_msg_id)
                    messages.append({"role": "tool", "tool_call_id": call_id, "content": [{"type": "text", "text": r}]})
                    yield {"type": "persisted"}
                    flushed.add(idx)
                    done += 1
        finally:
            if pool:
                try:
                    pool.shutdown(wait=False, cancel_futures=True)
                except TypeError:
                    pool.shutdown(wait=False)
            # 先非阻塞 drain channel 真实 result(修占位覆盖)
            while True:
                try:
                    ev = channel.get_nowait()
                except queue.Empty:
                    break
                if ev[0] == "result":
                    _, idx, call_id, name, r = ev
                    if idx not in flushed:
                        self.memory.add_message("tool", [{"type": "text", "text": r}], tool_call_id=call_id, id=ai_msg_id)
                        messages.append({"role": "tool", "tool_call_id": call_id, "content": [{"type": "text", "text": r}]})
                        flushed.add(idx)
            # 再占位未完成的(保 tool_calls 契约;:1064 normalize 第二道兜底)
            for idx in sorted(tool_call_chunks):
                if idx not in flushed:
                    tc = tool_call_chunks[idx]
                    r = _xml_response(tc["function"]["name"], "error", "<aborted>执行被中止")
                    self.memory.add_message("tool", [{"type": "text", "text": r}], tool_call_id=tc["id"], id=ai_msg_id)
                    messages.append({"role": "tool", "tool_call_id": tc["id"], "content": [{"type": "text", "text": r}]})
        return messages, (len(pre_results) > 0)

    def _check_and_compact(self, iteration_count: int, prev_loop_input_tokens: int, messages: list) -> Generator[Dict[str, Any], None, tuple]:
        """
        检查是否需要自动压缩，若需要则执行压缩。

        首轮用历史 input_tokens（meta），后续轮用上一轮 API 返回的 input_tokens。
        首轮额外用实际 messages token 估算兜底，避免 stale meta 导致短历史误触发压缩。

        参数:
            iteration_count: 当前迭代轮次（1 表示首轮）
            prev_loop_input_tokens: 上一轮 API 返回的 input_tokens
            messages: 当前内存消息列表

        Yields:
            compressing / session_refresh / error 事件

        Returns:
            (messages, should_break, finalize_max_tokens):
                - messages: 处理后的消息列表（压缩成功时为重建后的列表，否则为原列表）
                - should_break: 是否需要跳出主循环（压缩失败时 True）
                - finalize_max_tokens: 子代理撞墙收尾的输出上限（>0 本轮收尾，0 正常agent）
        """
        auto_compact_config = self.config.get("auto_compact", {})
        if not auto_compact_config.get("enabled", False):
            return messages, False, 0

        max_ctx_tokens = self.config.get("max_context_tokens", 64000)
        threshold_ratio = auto_compact_config.get("threshold_ratio", 0.75)
        threshold = max_ctx_tokens * threshold_ratio
        # 第一轮：从 memory 取上次请求的 input_tokens；后续轮：用上一轮 API 返回的 input_tokens
        check_tokens = self.memory.get_meta_value("input_tokens", 0) if iteration_count == 1 else prev_loop_input_tokens
        # 首轮额外校验：stale meta 可能让短历史误触发压缩，用实际 messages token 估算兜底
        if iteration_count == 1 and check_tokens >= threshold:
            try:
                from mod.project.agent.chat_client.utils.token_utils import estimate_message_tokens
                actual_tokens = estimate_message_tokens(messages)
            except Exception:
                actual_tokens = 0
            # 实际估算未超阈值则跳过压缩，避免 stale meta 导致首轮误报
            if actual_tokens < threshold:
                check_tokens = 0

        if check_tokens >= threshold:
            # 子代理拒绝压缩：注入告警，返回收尾 max_tokens（本轮即收尾：禁工具+限输出+限输出token）
            if self.is_subagent:
                yield {"type": "compressing", "data": "子代理上下文达上限，要求立即总结返回"}
                warn_text = """<system-warning>
上下文已达上限，必须立即停止。
停止一切工具调用，基于本轮周期内已收集的全部进度与事实，整理生成最终 <task_result> 返回。
不得再调用任何工具，不得请求继续；不要臆测、不要下结论，只如实汇总已得信息。
</system-warning>"""
                warn_content = [{"type": "text", "text": warn_text}]
                self.memory.add_message("user", warn_content)
                messages.append({"role": "user", "content": warn_content})
                # 收尾输出上限：安全剩余(max_ctx - 当前input) 与 4096 取最小，下限256
                safe_remaining = int(max_ctx_tokens - check_tokens)
                finalize_max = max(256, min(safe_remaining, 4096))
                return messages, False, finalize_max

            compacted, rebuilt = yield from self._try_auto_compact()
            if compacted:
                return rebuilt, False, 0
            else:
                yield {"type": "error", "data": "上下文已超过压缩阈值，自动压缩失败，请手动压缩上下文后再继续对话"}
                return messages, True, 0
        return messages, False, 0

    def _try_auto_compact(self) -> Generator[Dict[str, Any], None, tuple]:
        """
        尝试执行自动压缩。
        Yields:
            compressing 事件通知前端
        Returns:
            (success: bool, rebuilt_messages: list)
            压缩成功时返回 (True, 重建后的消息数组)，失败时返回 (False, [])
        """
        auto_compact_config = self.config.get("auto_compact", {})
        if not auto_compact_config.get("enabled", False):
            return False, []

        yield {"type": "compressing", "data": "上下文较大，正在自动压缩..."}

        try:
            compact_config = ContextCompactor.load_compact_config(
                prompts_dir=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'prompts')
            )
            preserve_rounds = auto_compact_config.get("preserve_rounds", compact_config.get("preserve_rounds", 3))

            compactor = ContextCompactor(
                api_key=self.api_key,
                base_url=self.base_url,
                default_headers=self.default_headers,
                config={
                    "model_name": compact_config.get("model_name", "qwen3.5-plus"),
                    "temperature": compact_config.get("temperature", 0.3),
                    "max_tokens": compact_config.get("max_tokens", 4096),
                    "preserve_rounds": preserve_rounds,
                    "system_prompt": compact_config.get("compact_instructions", ""),
                }
            )

            history = list(self.memory.history)
            compacted, summary, pre_tokens, post_tokens = compactor.compact(history)
            compactor.close()

            if compacted:
                summary_msg = compacted[0]
                messages_to_keep = compacted[1:]
                self.memory.compact_messages(summary_msg, messages_to_keep)
                self.memory.update_meta_tokens(
                    total_tokens=post_tokens,
                    input_tokens=post_tokens,
                    output_tokens=0
                )
                rebuilt_messages = self._build_messages()
                yield {"type": "session_refresh", "data": "上下文已自动压缩，会话页面需要刷新"}
                return True, rebuilt_messages
        except Exception as e:
            logging.warning(f"Auto compact failed: {e}")

        return False, []

    def chat(self, user_input: Union[str, List[Dict[str, Any]]]) -> Generator[Dict[str, Any], None, None]:
        """
        主聊天循环，支持流式响应和工具调用。
        
        生命周期（6 阶段）:
            Phase 1 - 初始化: 生成消息 ID
            Phase 2 - preloop: 系统信息持久化 + 用户输入处理（含 RAG 合并）+ 记忆写入
            Phase 3 - 构建消息: 构建基础消息数组（含系统信息）
            Phase 4 - 循环准备: 工具配置 + pending_bg_reminders 初始化
            Phase 5 - 迭代循环:
                - pre_iteration: dynamic_reminders 每轮全新重建（不累积）
                - API 调用 + 流式处理
                - post_iteration: 后台命令 → tool_call + tool_result 注入到 messages
            Phase 6 - afterloop: 保存助手响应 + 更新 token

        循环防护:
            - 工具重复: pre_call 拦截同名同参→轻推;连续 3 轮无视→硬中断。
            - 文本重复: 连续 3 轮纯文本一致→硬中断。

        消息数组结构:
            [0] system_prompt                                    (role: system)
            [1] system_info_message                              (role: user, ismeta, persisted)
            [2..N-1] 历史消息                                     (from memory)
            [N] 当前用户输入（含 RAG 结果）                          (role: user, persisted)
            [N+1] dynamic_meta_message                           (role: user, NOT persisted)
        
        参数:
            user_input: 用户输入，可以是字符串或包含文本/文件/站点引用的列表
            
        生成器:
            yield: 事件字典（type: meta_info/content/reasoning/tool_call/tool_result/subtask_stream/stop/error）
        """
        try:
            # === Phase 1: 初始化 ===
            user_msg_id = str(uuid.uuid4())
            ai_msg_id = str(uuid.uuid4())
            yield {"type": "meta_info", "user_msg_id": user_msg_id, "ai_msg_id": ai_msg_id}

            # === Phase 2: 处理用户输入与记忆（preloop） ===
            # 系统信息消息持久化：仅在首次空会话时添加，保存到 session 文件
            is_first_chat = self.memory.get_total_rounds() == 0
            if is_first_chat:
                self.memory.add_message("user", self._build_user_meta_message(), ismeta=True)
            # 处理文件/站点引用，注入的 ismeta 块会被合并到用户消息中
            user_input = self._process_user_input_files(user_input)

            # RAG检索：结果合并到用户输入中一起持久化，避免作为 dynamic_reminder 每轮变动破坏缓存命中
            # 先从 user_input 中提取纯文本用于 RAG 检索
            user_text: str = user_input
            if isinstance(user_input, list):
                text_parts = []
                for item in user_input:
                    if isinstance(item, dict) and item.get("type") == "text":
                        text_parts.append(item.get("text", ""))
                user_text = "\n".join(text_parts)

            recent_history = self.memory.get_sliding_window()
            if self.global_rag:
                global_docs = self.global_rag.search(user_text, scope="global", session_history=recent_history,enable_rag_judgment=True)
                if global_docs:
                    rag_blocks = "\n".join(
                        f"<knowledge_base>\n{doc}\n</knowledge_base>" for doc in global_docs
                    )
                    rag_content = (
                        f"<system-reminder>\n"
                        f"以下内容来自外部知识库检索结果，仅供参考。请注意：\n"
                        f"1. 这些内容并非用户直接输入，而是系统自动检索的补充资料\n"
                        f"2. 可以作为回答的参考依据，但不能完全信任其准确性\n"
                        f"3. 如果与用户当前问题无关，请忽略这些内容\n\n"
                        f"{rag_blocks}\n"
                        f"</system-reminder>"
                    )
                    # 合并到用户输入 content 中，标记 ismeta 用于前端隐藏
                    if isinstance(user_input, str):
                        user_input = [{"type": "text", "text": user_input}]
                    user_input.append({"type": "text", "text": rag_content, "ismeta": True})

            # 用户消息持久化
            self.memory.add_message("user", user_input, id=user_msg_id)

            # === Phase 4: 构建基础消息数组（preloop） ===
            messages = self._build_messages()

            turn_text_sigs = [] # 纯文本assistant消息(content, reasoning), 轮次消息签名缓存, 连续重复判定
            tool_loop_strikes = 0  # 连续被 pre_hook 拦截的轮数(工具循环升级计数)
            prev_fp = [ToolGuard.last_tool_fp(messages)]  # 上次工具使用指纹(跨chat)

            # 消费未被使用的reminder（这些会在第一轮 pre_iteration 时加入 dynamic_reminders）
            pending_bg_reminders = []

            tools = registry.get_openai_tools(enabled_ids=self.enabled_tools)
            iteration_count = 0
            tool_call_chunks = {}
            total_usage = {"total_tokens": 0, "input_tokens": 0, "output_tokens": 0,"cache_creation_input_tokens": 0, "cached_tokens": 0}
            last_message_id = ""
            _stop_data = None  # 用于在 afterloop 之后 yield stop
            prev_loop_input_tokens = 0  # 上一轮 API 返回的 input_tokens，供下一轮压缩检查使用
            prev_had_tool_calls = True  # 上一轮是否有工具调用，首轮默认 True 表示不等待后台命令

            # === Phase 5: 迭代循环 ===
            while iteration_count < self.max_tool_iterations:
                iteration_count += 1
                last_loop_tokens = {"total_tokens": 0, "input_tokens": 0, "output_tokens": 0,"cache_creation_input_tokens": 0, "cached_tokens": 0}

                # --- 统一自动压缩检查 ---
                messages, should_break, finalize_max = yield from self._check_and_compact(
                    iteration_count, prev_loop_input_tokens, messages
                )
                if should_break:
                    break

                # pre_iteration: 每轮重新生成 dynamic_reminders 动态内容 保证每次都会在message最末尾 ---
                # 从 pending_bg_reminders 复制并清空，确保不累积上一轮的 reminder
                dynamic_reminders = list(pending_bg_reminders)
                pending_bg_reminders = []

                # --- dynamic_reminders ---
                # 工具轮次预算不足：主动收尾 reminder，经 _build_user_meta_reminder 统一注入到末尾 ismeta user 消息
                wrapup = self._wrapup_reminder_text(self.max_tool_iterations - iteration_count)
                if wrapup:
                    dynamic_reminders.append(wrapup)

                # --- 统一处理后台命令：优先持久化 → 内存已完成 → 等待运行中 ---
                persisted = _CMD_MANAGER.consume_persisted_results(
                    self.config.get("sessions_dir", "sessions"), self.session_id
                )
                if persisted:
                    yield from self._build_bg_command_messages(persisted, messages)

                # 上一轮无工具调用（AI 准结束但后台还在跑）才等待后台命令；有工具调用则不卡，优先把结果给 AI 继续处理
                if not prev_had_tool_calls:
                    running_ids = _CMD_MANAGER.get_running_command_ids(session_id=self.session_id, exclude_no_wait=True)
                    if running_ids:
                        # 通知前端：正在等待后台命令完成，并非卡住
                        yield {"type": "bg_command_waiting", "data": {"command_ids": running_ids}}
                        bg_results = _CMD_MANAGER.wait_for_commands(
                            running_ids, sessions_dir=self.config.get("sessions_dir"),
                            session_id=self.session_id, wait_all=False, stop_event=self._stop_event
                        )
                        yield from self._build_bg_command_messages(bg_results, messages)

                # 构建请求消息：normalize(重排/补缺/删余保缓存) → 注入缓存控制 → 追加动态 meta → 清除 ismeta
                request_messages = self._normalize_tool_messages(messages)

                # 注意：cache_control 必须在 meta 消息追加之前注入，避免缓存打到 meta 上
                request_messages = self._inject_cache_control(request_messages)

                meta_msg = self._build_user_meta_reminder(dynamic_reminders)
                if meta_msg:
                    request_messages.append(meta_msg)

                # 清除 ismeta 字段（保留内容）
                request_messages = self._strip_meta_from_messages(request_messages)

                # if finalize_max > 0：子代理撞墙收尾（3禁）
                response_stream = self._create_completion_stream(
                    request_messages, [] if finalize_max > 0 else tools, finalize_max
                )

                # --- 流式响应处理 ---
                stream_result = yield from self._process_completion_stream(response_stream, total_usage, last_loop_tokens)
                current_response_content, current_reasoning_content, finish_reason, tool_call_chunks = stream_result
                last_message_id = last_loop_tokens.pop("_message_id", last_message_id)
                prev_loop_input_tokens = last_loop_tokens.get("input_tokens", 0)

                # API 无任何返回（内容、推理、工具调用均为空），抛出异常
                if not current_response_content and not current_reasoning_content and not tool_call_chunks:
                    raise Exception("API无任何返回")

                # --- 循环异常检测 ---
                if self._check_loop_anomaly(turn_text_sigs):
                    yield {"type": "error", "data": "AI陷入循环（连续3轮输出完全一致），已强制停止当前对话，请发送'继续'继续对话 error_code:loop_anomaly"}
                    break

                yield {"type": "meta_info", "user_msg_id": user_msg_id, "ai_msg_id": ai_msg_id,"last_loop_tokens": dict(last_loop_tokens), "iteration": iteration_count}
                # --- post_iteration: 停止/工具调用分支 ---
                if not tool_call_chunks:
                    prev_had_tool_calls = False
                    # 持久化 AI 文本回复并追加到 messages（有工具调用时在 _process_tool_calls 中完成）
                    if current_response_content:
                        kwargs = {}
                        if current_reasoning_content:
                            kwargs["reasoning_content"] = current_reasoning_content
                        self.memory.add_message("assistant", current_response_content, id=ai_msg_id, **kwargs)
                        # 统一追加到 messages，避免内存与持久化不同步（无论是否有后台命令）
                        messages.append({
                            "role": "assistant",
                            "content": current_response_content,
                            "reasoning_content": current_reasoning_content or None,
                            "id": ai_msg_id
                        })
                        # 收集本轮纯文本签名供循环检测
                        turn_text_sigs.append(
                            (current_response_content or "", current_reasoning_content or "")
                        )
                        yield {"type": "persisted"}

                    # 子代理专属, 收尾轮：强制结束，不等后台命令（上下文撞墙已要求立即总结返回）
                    if finalize_max > 0:
                        _stop_data = {"type": "stop", "usage": total_usage, "message_id": last_message_id}
                        break

                    # 还有后台命令在运行则继续 loop，让下一轮等待后台命令完成
                    if _CMD_MANAGER.get_running_command_ids(session_id=self.session_id, exclude_no_wait=True):
                        continue
                    # 无后台命令，正常停止
                    # 保存 stop 数据，在 afterloop 持久化完成后再 yield
                    _stop_data = {"type": "stop", "usage": total_usage, "message_id": last_message_id}
                    break

                # --- 工具执行 ---
                prev_had_tool_calls = True
                # yield from 委托给 _process_tool_calls，内部已在每次 add_message 后 yield persisted
                messages, intercepted = yield from self._process_tool_calls(
                    tool_call_chunks, current_response_content, current_reasoning_content,messages, ai_msg_id, prev_fp
                )
                # 工具循环升级:连续被 pre_hook 拦截(轻推无效)超过阈值 → 硬中断
                if intercepted:
                    tool_loop_strikes += 1
                    if tool_loop_strikes >= 3: # 连续被 pre_hook 拦截3次, 硬中断
                        yield {"type": "error", "data": "AI连续重复相同的工具调用，已停止当前对话。请更换工具或参数后重试。 error_code:repetitive_tool_loop"}
                        break
                else:
                    tool_loop_strikes = 0

            # === Phase 6: 最终记忆更新（afterloop） ===
            if iteration_count >= self.max_tool_iterations:
                yield {"type": "error", "data": "达到最大行动次数上限，已强制停止当前对话 error_code:max_tool_iterations"}


            # 更新 meta.json 中的 token 使用量
            self.memory.update_meta_tokens(
                total_tokens=last_loop_tokens["total_tokens"], # noqa
                input_tokens=last_loop_tokens["input_tokens"],
                output_tokens=last_loop_tokens["output_tokens"]
            )

            # 发送 meta_info 包含 ID 和 token 使用量
            yield {
                "type": "meta_info",
                "user_msg_id": user_msg_id,
                "ai_msg_id": ai_msg_id,
                "last_loop_tokens": last_loop_tokens
            }

            # 持久化完成后再 yield stop，确保 stop 代表"一切已完成"
            if _stop_data is not None:
                yield _stop_data

        except openai.AuthenticationError as e:
            yield {"type": "error", "data": f"API密钥错误或无效，请检查密钥是否正确:{e}"}
        except openai.RateLimitError as e:
            yield {"type": "error", "data": "接口调用频率超限:{}".format(e)}
        except openai.APIConnectionError as e:
            yield {"type": "error", "data": f"无法连接到API服务器（{self.base_url}），请检查网络或地址是否正确:{e}"}
        except openai.APIError as e:
            yield {"type": "error", "data": f"API返回错误：{str(e)}"}
        except Exception as e:
            logging.error(f"Unexpected error in Agent.chat: {traceback.format_exc()}")
            yield {"type": "error", "data": f"调用AI接口时发生未知错误：{str(e)}"}

    def _check_loop_anomaly(self, text_sigs: list) -> bool:
        """检测纯文本循环:最近 3 个无工具 assistant 的 (content, reasoning_content) 是否完全一致。
        (与 messages 解耦, 不受压缩影响)"""
        if len(text_sigs) < 3:
            return False
        return text_sigs[-3] == text_sigs[-2] == text_sigs[-1]

    def _filter_file_blocks(self, content: Union[str, List[Dict[str, Any]]]) -> Union[str, List[Dict[str, Any]]]:
        """
        过滤掉 type="file" 和 type="site" 的块，只保留 type="text" 的块
        """
        if isinstance(content, str):
            return content

        if not isinstance(content, list):
            return content

        FILTERED_TYPES = {"file", "site"}
        return [item for item in content if not (isinstance(item, dict) and item.get("type") in FILTERED_TYPES)]

    def _build_messages(self) -> List[Dict[str, Any]]:
        """构建包含系统指令、上下文和滑动窗口的 Prompt。

        参数:
            is_first_chat: 是否为首次空会话，仅在首次时插入系统环境信息消息

        技术债务：当前 sliding window 机制已移除（get_sliding_window 返回全部历史）。
        如果未来恢复 sliding window，需要在加载历史消息时过滤掉带 ismeta 的 content blocks，
        避免已持久化的系统信息消息在历史中重复出现。
        过滤方式：对 content 为 list 的消息，过滤掉 ismeta=True 的 block；
        如果过滤后 content 为空，则跳过整条消息。
        """

        messages = [{"role": "system", "content": self.system_prompt}]

        window = self.memory.get_sliding_window()
        for msg in window:
            content = msg["content"]
            content = self._filter_file_blocks(content)
            # 深拷贝 content，避免修改 memory 中的原始数据
            if isinstance(content, list):
                content = [dict(block) if isinstance(block, dict) else block for block in content]

            m = {
                "role": msg["role"],
                "content": content
            }
            if msg.get("role") == "assistant" and "reasoning_content" in msg:
                m["reasoning_content"] = msg["reasoning_content"]
            if "tool_calls" in msg:
                m["tool_calls"] = msg["tool_calls"]
            if "tool_call_id" in msg:
                m["tool_call_id"] = msg["tool_call_id"]
            messages.append(m)

        return messages

    def _normalize_tool_messages(self, messages):
        """发 API 前确保 tool 消息合法:重排(声明序)+ 补缺(占位)+ 删余(孤儿)。
        返回新列表,不改输入(保留中断现场)。幂等 + 占位常量 -> 保 prompt cache。
        必须在 _inject_cache_control 之前调用(:1064 -> :1066)。"""
        result = []
        i = 0
        while i < len(messages):
            msg = messages[i]
            if msg.get("role") == "assistant" and msg.get("tool_calls"):
                result.append(msg)
                tc_ids = [tc["id"] for tc in msg["tool_calls"]]
                tool_map = {}
                j = i + 1
                while j < len(messages) and messages[j].get("role") == "tool":
                    tool_map[messages[j].get("tool_call_id")] = messages[j]
                    j += 1
                for tc_id in tc_ids:
                    if tc_id in tool_map:
                        result.append(tool_map[tc_id])
                    else:
                        result.append({
                            "role": "tool",
                            "tool_call_id": tc_id,
                            "content": [{"type": "text", "text": PLACEHOLDER_TOOL_RESULT}],
                        })
                i = j
            elif msg.get("role") == "tool":
                i += 1  # 孤儿 tool(脱离 assistant(tool_calls))-> 删
            else:
                result.append(msg)
                i += 1
        return result
