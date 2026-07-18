# coding: utf-8
# -------------------------------------------------------------------
# 流管理器 - 管理 Agent 后台运行和 SSE 事件分发
# -------------------------------------------------------------------
import json
import queue
import threading
import time
import logging
from typing import Dict, List, Any, Optional


class SessionStream:
    """单个会话的流状态"""

    def __init__(self, session_key: str):
        self.session_key = session_key
        self.status = "running"  # "running"：运行中 | "completed"：已完成 | "error"：出错 | "stopped"：已停止

        # content_blocks 快照（实时更新，全部是未持久化的数据）
        self.content_blocks: List[Dict] = []
        self.accumulated_content: str = ""
        self.accumulated_think: str = ""

        # 运行实例
        self.agent: Any = None
        self.thread: Optional[threading.Thread] = None
        self._stop_event = threading.Event()  # 停止信号

        # subscriber 分发（每个 subscriber 是一个 queue.Queue）
        self.subscribers: List[queue.Queue] = []
        self._subscribers_lock = threading.Lock()

        # 生命周期
        self.created_at: float = time.time()
        self.last_activity: float = time.time()

    @property
    def is_stopped(self) -> bool:
        """检查是否已请求停止"""
        return self._stop_event.is_set()

    def request_stop(self):
        """请求停止 Agent（设置停止标志并关闭 Agent 连接）"""
        self._stop_event.set()
        self.status = "stopped"
        # 关闭 Agent 连接，使流式请求中断
        if self.agent:
            try:
                self.agent.close()
            except Exception:
                pass

    def update_blocks(self, chunk: Dict):
        """根据 Agent yield 的 chunk 类型维护 content_blocks 列表

        content_blocks 保存当前正在生成的、尚未持久化的内容块。
        清空时机：
        1. persisted 事件：_process_tool_calls 完成后，assistant/tool 消息已持久化
        2. stop 事件：afterloop 完成后，最终 assistant 消息已持久化

        订阅在线时：content_blocks 正常被 SSE 推送给 subscriber
        订阅不在线时：content_blocks 保留未持久化的内容，供 resume 时回放
                     stop 时清空（因为已持久化，不需要再保留）
        """
        chunk_type = chunk.get("type")
        self.last_activity = time.time()

        if chunk_type == "reasoning":
            # 思考块：累积到当前 think block
            if (not self.content_blocks or
                    self.content_blocks[-1]["type"] != "reasoning"):
                self.content_blocks.append({
                    "type": "reasoning",
                    "response": ""
                })
            self.content_blocks[-1]["response"] += chunk.get("response", "")
            self.accumulated_think += chunk.get("response", "")

        elif chunk_type == "content":
            # 内容块：累积到当前 message block
            if (not self.content_blocks or
                    self.content_blocks[-1]["type"] != "content"):
                self.content_blocks.append({
                    "type": "content",
                    "response": ""
                })
            self.content_blocks[-1]["response"] += chunk.get("response", "")
            self.accumulated_content += chunk.get("response", "")

        elif chunk_type == "tool_call":
            # 工具调用块
            block = {
                "type": "tool_call",
                "tool": chunk.get("tool"),
                "args": chunk.get("args", ""),
                "id": chunk.get("id")
            }
            # 注入的 task_id,透传进快照供 resume 回放配对
            if chunk.get("task_id"):
                block["task_id"] = chunk["task_id"]
            self.content_blocks.append(block)

        elif chunk_type == "tool_result":
            # 工具结果块
            self.content_blocks.append({
                "type": "tool_result",
                "id": chunk.get("id"),
                "result": chunk.get("result", "")
            })

        elif chunk_type == "subtask_stream":
            # id=call_id 供 resume 回放配对 tool_call(与在线实时一致),task_id 标识子会话
            self.content_blocks.append({
                "type": "subtask_stream",
                "id": chunk.get("id"),
                "task_id": chunk.get("task_id"),
                "chunk": chunk.get("chunk"),
            })

        elif chunk_type == "persisted":
            # _process_tool_calls 完成，assistant 和 tool 消息已持久化到 sessions.json
            # 清空 content_blocks，避免 resume 时重复推送已持久化的内容
            self.content_blocks = []
            self.accumulated_content = ""
            self.accumulated_think = ""

        elif chunk_type == "compressing":
            # 自动压缩提示事件，不产生 visible block，仅透传给在线 subscriber
            pass

        elif chunk_type == "stop":
            # agent.chat() 的 stop 事件，在 afterloop 持久化完成之后触发
            # 此时所有内容已写入 memory，可以安全清空 content_blocks
            self.content_blocks = []
            self.accumulated_content = ""
            self.accumulated_think = ""

        elif chunk_type == "error":
            # 错误信息作为 block 记录
            self.content_blocks.append({
                "type": "error",
                "data": chunk.get("data", "")
            })

    def notify_subscribers(self, event: str):
        """推送 SSE 事件给所有在线 subscriber"""
        with self._subscribers_lock:
            dead_subs = []
            for q in self.subscribers:
                try:
                    q.put_nowait(event)
                except queue.Full:
                    dead_subs.append(q)
            # 清理已满队列的 subscriber
            for q in dead_subs:
                self.subscribers.remove(q)

    def add_subscriber(self) -> queue.Queue:
        """添加一个新的 subscriber，返回其 queue"""
        q = queue.Queue(maxsize=1000)
        with self._subscribers_lock:
            self.subscribers.append(q)
        return q

    def remove_subscriber(self, q: queue.Queue):
        """移除一个 subscriber"""
        with self._subscribers_lock:
            if q in self.subscribers:
                self.subscribers.remove(q)

    def get_content_blocks(self) -> List[Dict]:
        """获取 content_blocks 快照（深拷贝，避免外部修改）"""
        return [dict(b) for b in self.content_blocks]

    def clear_blocks(self):
        """清空 content_blocks（Agent 已持久化后调用）"""
        self.content_blocks = []
        self.accumulated_content = ""
        self.accumulated_think = ""

    def mark_completed(self):
        """标记为完成"""
        self.status = "completed"

    def mark_error(self):
        """标记为错误"""
        self.status = "error"


class StreamManager:
    """单例，管理所有活跃的聊天流"""

    # 清理延迟（秒）：completed/error 后多久清理内存
    CLEANUP_DELAY = 600  # 10 分钟

    def __init__(self):
        self._sessions: Dict[str, SessionStream] = {}
        self._lock = threading.Lock()
        self._cleanup_timer: Optional[threading.Timer] = None
        self._start_cleanup_loop()

    def get(self, session_key: str) -> Optional[SessionStream]:
        """获取指定 session 的 SessionStream"""
        with self._lock:
            return self._sessions.get(session_key)

    def create(self, session_key: str) -> SessionStream:
        """创建新的 SessionStream（如果已存在则返回已有的）"""
        with self._lock:
            if session_key in self._sessions:
                existing = self._sessions[session_key]
                # 如果已有的已完成、出错或已停止，创建新的
                if existing.status in ("completed", "error", "stopped"):
                    del self._sessions[session_key]
                else:
                    return existing

            stream = SessionStream(session_key)
            self._sessions[session_key] = stream
            return stream

    def remove(self, session_key: str):
        """移除指定 session（先停止运行中的 Agent）"""
        with self._lock:
            stream = self._sessions.pop(session_key, None)
            if stream and stream.status == "running":
                stream.request_stop()

    def stop_session(self, session_key: str) -> bool:
        """停止指定 session 的运行"""
        with self._lock:
            stream = self._sessions.get(session_key)
            if stream and stream.status == "running":
                stream.request_stop()
                # 通知所有 subscriber 停止
                stream.notify_subscribers(None)  # None 作为结束信号
                return True
            return False

    def _start_cleanup_loop(self):
        """启动定期清理循环"""
        self._cleanup()

    def _cleanup(self):
        """清理过期的 SessionStream"""
        now = time.time()
        with self._lock:
            expired = [
                key for key, stream in self._sessions.items()
                if stream.status in ("completed", "error", "stopped")
                and (now - stream.last_activity) > self.CLEANUP_DELAY
            ]
            for key in expired:
                del self._sessions[key]

        # 每分钟检查一次
        self._cleanup_timer = threading.Timer(60, self._cleanup)
        self._cleanup_timer.daemon = True
        self._cleanup_timer.start()

    def get_all_status(self) -> Dict[str, Dict]:
        """获取所有活跃 session 的状态摘要（调试用）"""
        with self._lock:
            return {
                key: {
                    "status": stream.status,
                    "blocks_count": len(stream.content_blocks),
                    "subscribers_count": len(stream.subscribers),
                    "created_at": stream.created_at,
                }
                for key, stream in self._sessions.items()
            }


# -------------------------------------------------------------------
# 单例管理
# -------------------------------------------------------------------
_instance: Optional[StreamManager] = None
_instance_lock = threading.Lock()


def get_stream_manager() -> StreamManager:
    """获取 StreamManager 单例"""
    global _instance
    if _instance is None:
        with _instance_lock:
            if _instance is None:
                _instance = StreamManager()
    return _instance
