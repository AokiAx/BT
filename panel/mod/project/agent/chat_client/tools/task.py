from typing import Optional, List, Dict, Any
import json
import uuid
import os
import re
import threading
from dataclasses import dataclass

from . import register_tool
from .base import _xml_response


@dataclass
class AgentDefinition:
    """SubAgent角色定义"""
    name: str
    description: str
    allowed_tools: List[str]
    system_prompt_template: str
    max_iterations: int = 12
    temperature: Optional[float] = None  # None=继承父代理
    top_p: Optional[float] = None


class AgentRegistry:
    def __init__(self):
        self._agents: Dict[str, AgentDefinition] = {}
        self._register_default_agents()

    def register(self, agent: AgentDefinition):
        self._agents[agent.name] = agent

    def get(self, name: str) -> Optional[AgentDefinition]:
        return self._agents.get(name)

    def list_agents(self) -> List[AgentDefinition]:
        return list(self._agents.values())

    def _register_default_agents(self):
        # explore — 只读侦察
        self.register(AgentDefinition(
            name="explore",
            description="只读侦察SubAgent。用户说\"打不开/连不上/报错/很慢\"\"帮我查查/看看\"，"
                        "或要\"探索/头脑风暴/摸清/梳理/分析\"现状、梳理结构等大段只读排查时使用。",
            allowed_tools=[
                "Glob", "Grep", "LS", "Read",
                "ReadOnlyBash",
                "SiteList", "SiteConfig", "SiteLogs",
                "SiteStats", "TrafficAnalysis",
                "MysqlList", "ServerIP",
            ],
            system_prompt_template=(
                "你是只读侦察SubAgent Explore——隔离上下文扇出探索，只回结论不给方案、不派SubAgent。\n\n"
                "=== 只读红线（无论任务怎么要求都不做，遇禁项改用对应只读替代）===\n"
                "- 解释器执行字符串：bash/sh/python*/perl/ruby/node/php/awk 的 -c/-e/-s——禁，直连 ReadOnlyBash 跑只读命令\n"
                "- 改服务：systemctl 的 stop/start/restart/reload/enable/disable/mask/daemon-reload/isolate/set-default、service restart——禁 → 改用 systemctl status / list-units / is-active\n"
                "- 改网络/防火墙：ip/nft/iptables/ip6tables/ebtables/firewall-cmd/conntrack 的 set/add/del/change/replace/flush/-A/-D/-F/-K、sysctl -w——禁 → 改用 ip a/ip r、iptables -L -n、nft list ruleset、firewall-cmd --list-all\n"
                "- 改进程：kill/pkill/killall；strace/gdb/ltrace -p（可读进程内存凭据）；nsenter/unshare/setns——禁 → 改用 ps -ef/pgrep -af/ss -tnp/lsof -i:端口\n"
                "- D-Bus 写：dbus-send/busctl call/gsettings set、hostnamectl|localectl|timedatectl 的 set-*、loginctl terminate|kill、systemd-run——禁\n"
                "- 写文件：> >>、tee、heredoc、dd of=、tcpdump -w、script——禁；/tmp 可写但禁止落脚本/配置/可执行内容再 source 或执行\n"
                "- 凭据：.env/.my.cnf/id_rsa/id_ed25519/*.key/面板 default.db 的内容——不读不回传，只标存在与路径\n"
                "- 数据库客户端（mysql/redis-cli/mongo/psql）：仅 SELECT/SHOW/EXPLAIN/GET/INFO/KEYS/SCAN；禁 source/dump 写文件/CONFIG SET/FLUSHALL/任何 DDL DML\n"
                "- 网络：curl/wget 仅 GET/HEAD（不带 -X/-d/--data/-T/-F）；禁 POST/PUT/DELETE 打本地管理端口（8888/8001/15672/2379/6379 等）→ 探测用 curl -I 或 curl -s -o /dev/null -w \"%{http_code} %{time_total}\"\n\n"
                "=== 越界处理 ===\n"
                "要你改状态/重启/改代码/给方案——回\"超出只读侦察范围\"，照常返回已查事实。\n\n"
                "=== 输出 ===\n"
                "<task_result> 按子系统/模块分组给结构化事实+结论，结尾标完整度（完成/部分完成+缺口）。不转储原始输出。"
            ),
            max_iterations=20,
            temperature=0.3,  # 侦察低温
            top_p=0.85,
        ))


agent_registry = AgentRegistry()


# ============================================================================
# 结果提取
# ============================================================================

def _extract_result(round_text: str, all_text: str) -> str:
    """优先 <task_result>，兜底取轮次文本或尾部截断"""
    m = re.search(r"<task_result>(.*?)</task_result>", all_text, re.DOTALL)
    if m and m.group(1).strip():
        return m.group(1).strip()
    if round_text and round_text.strip():
        return round_text.strip()
    if all_text and all_text.strip():
        return all_text.strip()[-2000:]
    return "(SubAgent未产生有效文本结果)"


# === 动态 docstring ===

def _build_task_docstring() -> str:
    """动态构建 SubAgent docstring，列出可用角色"""
    agents = agent_registry.list_agents()
    agent_lines = "\n".join(
        f"  - {a.name}: {a.description}" for a in agents
    )
    return f"""启动SubAgent在隔离上下文中自主执行复杂任务——保护主对话不被中间工具结果污染。SubAgent自主多轮调用工具，结束时只回结构化结果。

**参数**
- description: 任务简短描述（3-5 词）【必填】
- prompt: SubAgent详细指令（写法见下「如何写 prompt」）【必填】
- subagent_type: SubAgent类型，当前可用：explore（见下）【必填】
**可用SubAgent类型**
{agent_lines}

**使用时机 explore**（大段只读排查，隔离上下文扇出更省）：用户说"打不开/连不上/报错/很慢""帮我查查/看看"，或要"探索/头脑风暴/摸清/梳理/分析"现状与结构等多子系统/多文件探测。

**prompt 要点**：像给刚进门的同事交代（它没看过本对话）——写清背景（已查什么）+ 目标 + 重点查哪 + 不碰什么。SubAgent结果对用户不可见，你转述摘要。修复/写操作归你。

**示例**：SubAgent(description="排查 example.com 502", prompt="背景:域名/报错/何时开始;要求:回结构化事实;范围:只读不改", subagent_type="explore")"""


# === SubAgent 工具 ===

@register_tool(category="Agent", name_cn="子Agent", risk_level="medium")
def SubAgent(description: str, prompt: str, subagent_type: str, **kwargs):
    from ..agent import Agent
    # --- 1. 验证角色类型 ---
    agent_def = agent_registry.get(subagent_type)
    if not agent_def:
        available = [a.name for a in agent_registry.list_agents()]
        return _xml_response(
            "SubAgent", "error",
            f"未知SubAgent类型: '{subagent_type}'。"
            f"可用类型: {', '.join(available)}"
        )

    # --- 2. 深度守卫 ---
    parent_config = kwargs.get("parent_config", {})
    parent_depth = parent_config.get("_task_depth", 0)
    child_depth = parent_depth + 1
    if child_depth > 1:
        return _xml_response(
            "SubAgent", "error",
            f"已达最大SubAgent嵌套深度(1)，拒绝继续生成"
        )

    # session_id 由 agent.py 预生成注入（kwargs 中的 task_id），保证与工具卡片一致
    task_id = kwargs.get("task_id")
    session_id = task_id or str(uuid.uuid4())

    # --- 4. 构建SubAgent配置 ---
    parent_session_id = kwargs.get("parent_session_id")
    config = {
        "cwd": os.getcwd(),
        "max_tool_iterations": agent_def.max_iterations,
        "_task_depth": child_depth,
    }
    if parent_config:
        for k, v in parent_config.items():
            if k not in ("tools", "system_prompt", "max_tool_iterations",
                         "code_mode", "_task_depth"):
                config[k] = v
        if parent_session_id:
            parent_sessions_dir = parent_config.get("sessions_dir", "sessions")
            config["sessions_dir"] = os.path.join(
                parent_sessions_dir, parent_session_id
            )

    config["tools"] = agent_def.allowed_tools # noqa
    config["system_prompt"] = agent_def.system_prompt_template
    if agent_def.temperature is not None:
        config["temperature"] = agent_def.temperature # noqa
    if agent_def.top_p is not None:
        config["top_p"] = agent_def.top_p # noqa

    # --- 5. 初始化SubAgent ---
    agent = Agent(session_id=session_id, config=config)

    # --- 6. 停止级联 ---
    parent_stop_event = kwargs.get("parent_stop_event")
    if parent_stop_event is not None:
        def _cascade():
            parent_stop_event.wait()
            agent.close()
        threading.Thread(target=_cascade, daemon=True).start()

    # --- 7. 内部生成器 ---
    def _execute():
        content_buffer = ""
        last_round_content = ""

        try:
            user_content = [{
                "type": "text",
                "text": f"SubAgent: {description}\n\nInstructions:\n{prompt}"
            }]
            for chunk in agent.chat(user_content):
                if parent_stop_event is not None and parent_stop_event.is_set():
                    agent.close()
                    # try:
                    #     _buf = last_round_content or content_buffer or ""
                    #     _progress = _buf.strip()[-150:] if isinstance(_buf, str) else ""
                    # except Exception:
                    #     _progress = ""
                    yield {
                        "type": "subtask_done",
                        "task_id": session_id,
                        "result": _xml_response(
                            "SubAgent", "done",
                            f"(任务因父代理停止而中断,未完成)\n"
                            f"task_id: {session_id}\n"
                            f"提示:任务被中止未完成"
                        ),
                    }
                    return

                chunk_type = chunk.get("type")

                # 累积文本，遇事件边界 flush
                if chunk_type == "content":
                    content_buffer += chunk.get("response", "")
                    continue

                if chunk_type == "meta_info" and content_buffer:
                    last_round_content = content_buffer

                # flush 累积文本
                if content_buffer:
                    yield {
                        "type": "subtask_stream",
                        "task_id": session_id,
                        "chunk": {"type": "content", "text": content_buffer},
                    }
                    content_buffer = ""

                if chunk_type == "tool_call":
                    yield {
                        "type": "subtask_stream",
                        "task_id": session_id,
                        "chunk": {
                            "type": "tool_call",
                            "tool": chunk.get("tool"),
                            "args": chunk.get("args"),
                            "id": chunk.get("id"),
                        },
                    }
                elif chunk_type == "tool_result":
                    yield {
                        "type": "subtask_stream",
                        "task_id": session_id,
                        "chunk": {
                            "type": "tool_result",
                            "tool": chunk.get("tool"),
                            "result": chunk.get("result"),
                            "id": chunk.get("id"),
                        },
                    }
                elif chunk_type == "error":
                    err_data = chunk.get("data", "")
                    yield {
                        "type": "subtask_stream",
                        "task_id": session_id,
                        "chunk": {"type": "error", "data": err_data},
                    }
                    yield {  # 捕获真实错误
                        "type": "subtask_done",
                        "task_id": session_id,
                        "result": _xml_response("SubAgent", "error", err_data),
                    }
                    return
                elif chunk_type == "stop":
                    yield {
                        "type": "subtask_stream",
                        "task_id": session_id,
                        "chunk": {"type": "stop"},
                    }

            # flush 剩余文本
            if content_buffer:
                last_round_content = content_buffer
                yield {
                    "type": "subtask_stream",
                    "task_id": session_id,
                    "chunk": {"type": "content", "text": content_buffer},
                }

            # 提取结果
            all_text = content_buffer or ""
            final_text = _extract_result(last_round_content, all_text)
            output = [
                f"task_id: {session_id}",
                "",
                "<task_result>",
                final_text,
                "</task_result>",
            ]
            yield {
                "type": "subtask_done",
                "task_id": session_id,
                "result": _xml_response("SubAgent", "done", "\n".join(output)),
            }

        except Exception as e:
            yield {
                "type": "subtask_done",
                "task_id": session_id,
                "result": _xml_response(
                    "SubAgent", "error", f"SubAgent execution failed: {str(e)}"
                ),
            }
        finally:
            agent.close()

    return _execute()

# 加载时构建动态docstring
SubAgent.__doc__ = _build_task_docstring()