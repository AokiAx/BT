"""bubblewrap 只读终端 — 内核层 RO 沙箱 + advisory 最小黑名单（防误用，不防绕过）"""
import shlex
import shutil
import subprocess
import os
import re

from . import register_tool
from .base import _xml_response, BASH_MAX_RETURN_CHARS

# bwrap：整盘 ro + devtmpfs + tmpfs + 随父死亡；网络保留（侦察依赖 ss/ip/ping/dig/curl）
BWRAP_ARGS = [
    "--ro-bind", "/", "/",
    "--dev", "/dev",
    "--tmpfs", "/tmp",
    "--die-with-parent",
]

DEFAULT_TIMEOUT_MS = 10000

ADVISORY_INTERACTIVE_CMDS = {"vi", "vim", "nano", "emacs"}
ADVISORY_SIGNAL_CMDS = {"kill", "pkill", "killall"}
ADVISORY_POWER_CMDS = {"reboot", "shutdown", "poweroff", "halt", "init", "telinit"}
ADVISORY_SYSTEMCTL_WRITE = {
    "stop", "start", "restart", "reload", "enable", "disable", "mask", "unmask",
    "daemon-reload", "isolate", "set-default",
}
ADVISORY_SCRIPT_INTERPRETERS = {"perl", "ruby", "node", "nodejs", "php", "tclsh", "wish", "guile", "m4"}
ADVISORY_SHELLS = {"bash", "sh", "dash", "zsh", "ash", "ksh", "mksh", "csh", "tcsh"}
_SUBCMD_SEP = re.compile(r"\|\||&&|;|\|")
_SHELL_OPS = frozenset({"|", "||", "&&", ";", "&", ">", ">>", "<"})
_REDIRECT_RE = re.compile(r"^(?:\d*|&)?(?:>{1,2}|<)")


def _is_script_interpreter(name):
    return (name in ADVISORY_SCRIPT_INTERPRETERS
            or name.startswith("python") or name.startswith("lua"))


def _extract_c_string(argv):
    for i, a in enumerate(argv[1:], 1):
        if a == "--":
            return None
        if a.startswith("-") and not a.startswith("--") and len(a) > 1 and "c" in a[1:]:
            return argv[i + 1] if i + 1 < len(argv) else ""
    return None


def _advisory_block(argv, _depth=0):
    cmd_name = os.path.basename(argv[0])
    if cmd_name in ADVISORY_INTERACTIVE_CMDS:
        return True, "查看文件内容用 Read 工具、cat 或 head/tail"
    if cmd_name in ADVISORY_SIGNAL_CMDS:
        return True, "查看进程用 ps -ef 或 pgrep"
    if cmd_name in ADVISORY_POWER_CMDS:
        return True, "查看系统运行状态用 uptime、systemctl status 或 who"
    if cmd_name == "systemctl":
        sub = next((a for a in argv[1:] if not a.startswith("-")), None)
        if sub in ADVISORY_SYSTEMCTL_WRITE:
            return True, "查看服务状态用 systemctl status/show/cat 或 list-units"
    if _is_script_interpreter(cmd_name):
        return True, "只读侦察不执行脚本——用 ReadOnlyBash 跑只读命令，或 Grep/Read 查文件"

    if _depth < 3 and cmd_name in ADVISORY_SHELLS:
        c_string = _extract_c_string(argv)
        if c_string:
            for part in _SUBCMD_SEP.split(c_string):
                part = part.strip()
                if not part:
                    continue
                try:
                    sub_argv = shlex.split(part)
                except ValueError:
                    sub_argv = part.split()
                if sub_argv:
                    blocked, hint = _advisory_block(sub_argv, _depth + 1)
                    if blocked:
                        return True, hint
        elif _depth == 0 and any(not a.startswith("-") and a != "--" for a in argv[1:]):
            return True, "只读侦察不执行脚本——用 ReadOnlyBash 跑只读命令，或 Grep/Read 查文件"
    return False, ""


def _needs_shell(argv):
    return any(tok in _SHELL_OPS or _REDIRECT_RE.match(tok) for tok in argv)


@register_tool(category="Agent", name_cn="只读命令", risk_level="low")
class ReadOnlyBash:
    """
    在沙箱中执行只读侦察命令（读配置/查状态/看日志）。

    **仅当工具集不含 RunCommand 时使用。若你拥有RunCommand，直接用它, 而不是ReadOnlyBash。**

    文件系统只读（写路径返回 EROFS；/tmp 可写但隔离丢弃）。网络开放用于只读侦察
    （ss/ip/iptables -L/ping/dig/curl -I 等可用）。写文件、设备写会被内核拒绝。

    Args:
        command: Shell command to execute (will be parsed with shlex, not passed to a shell).
        cwd: Working directory (default: current directory, must exist in sandbox).
        timeout: Timeout in milliseconds (default: 10000, max: 120000).
    """

    def execute(self, command: str, cwd: str = None, timeout: int = DEFAULT_TIMEOUT_MS) -> str:
        # bwrap 不可用
        bwrap_path = shutil.which("bwrap")
        if not bwrap_path:
            return _xml_response(
                "ReadOnlyBash", "error",
                "当前环境无法执行该命令。只读侦察请改用 Glob/Grep/Read 读文件，"
                "或用其他只读途径查看服务/进程状态。"
            )

        try:
            argv = shlex.split(command)
        except Exception as e:
            return _xml_response("ReadOnlyBash", "error", f"Command parsing failed: {e}")

        if not argv:
            return _xml_response("ReadOnlyBash", "error", "Empty command")

        if _needs_shell(argv):
            argv = ["sh", "-c", command]

        blocked, hint = _advisory_block(argv)
        if blocked:
            return _xml_response("ReadOnlyBash", "error", hint)

        cmd_path = shutil.which(argv[0])
        if not cmd_path:
            return _xml_response("ReadOnlyBash", "error", f"Command not found: {argv[0]}")

        bwrap_argv = [bwrap_path] + BWRAP_ARGS + ["--", cmd_path] + argv[1:]

        timeout_sec = min(max(timeout, 1000), 120000) / 1000.0

        try:
            proc = subprocess.Popen(
                bwrap_argv,
                cwd=cwd or os.getcwd(),
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                shell=False,
            )

            try:
                stdout, _ = proc.communicate(timeout=timeout_sec)
                status = "done" if proc.returncode == 0 else "error"
                return _xml_response(
                    "ReadOnlyBash", status,
                    stdout or "",
                    max_chars=BASH_MAX_RETURN_CHARS,
                )
            except subprocess.TimeoutExpired:
                proc.kill()
                proc.wait()
                return _xml_response(
                    "ReadOnlyBash", "error",
                    f"Command timed out after {timeout_sec:.0f}s"
                )
        except Exception as e:
            return _xml_response("ReadOnlyBash", "error", f"Execution failed: {e}")
