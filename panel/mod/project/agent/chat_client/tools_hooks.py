# coding: utf-8
# -------------------------------------------------------------------
# Copyright (c) 2014-2099 All rights reserved.
# -------------------------------------------------------------------
# Author: 宝塔
# -------------------------------------------------------------------
import json
import uuid

from .tools import registry
from .tools.base import _xml_response


class ToolGuard:
    """工具执行守卫: pre_call -> 外部execute_tool_call -> post_call"""

    @staticmethod
    def normalize_args(args_str):
        """参数归一化:按键排序序列化。全 key 一致才判重复(对齐百炼"精确匹配 name+args")。"""
        try:
            return json.dumps(json.loads(args_str or "{}"), sort_keys=True, ensure_ascii=False)
        except (json.JSONDecodeError, TypeError):
            return args_str or ""

    @staticmethod
    def last_tool_fp(messages):
        """历史中最后一个工具调用的指纹"""
        for m in reversed(messages):
            if m.get("role") == "assistant" and m.get("tool_calls"):
                last = m["tool_calls"][-1]
                return (
                    last.get("function", {}).get("name"),
                    ToolGuard.normalize_args(last.get("function", {}).get("arguments", ""))
                )
        return None

    @staticmethod
    def pre_call(func_name, args_str, enabled_tools, prev_fp):
        """工具 pre-hook:执行前统一拦截。顺序判定——
        1) 不存在 → 错误结果;
        2) 未启用 → 错误结果;
        3) 与上一个工具调用"连续相同"(prev_fp)→ 轻推结果。仅判连续重复。
        任一命中返回合成结果(跳过真实执行);均不命中返回 None。
        prev_fp: 单元素列表 [上一调用指纹],调用方跨轮持有, 原地更新"""
        if not registry.tool_exists(func_name):
            return _xml_response(func_name, "error", f"Error: Tool '{func_name}' does not exist.")
        if not registry.is_tool_enabled(func_name, enabled_tools):
            tool_id = registry.get_tool_id(func_name)
            return _xml_response(
                func_name,
                "error",
                f"Error: Tool '{func_name}' (ID: {tool_id}) is not enabled. You do not have permission to use this tool."
            )
        fp = (func_name, ToolGuard.normalize_args(args_str))
        is_repeat = prev_fp[0] is not None and fp == prev_fp[0]
        prev_fp[0] = fp
        if is_repeat:
            return _xml_response(
                func_name,
                "done",
                "【系统警告】禁止重复相同工具调用（结果不变）。换工具/参数，或直接用已有结果；再犯将强制终止。本次已拦截，合成标记：" + uuid.uuid4().hex[
                    :8]
            )
        return None

    @staticmethod
    def post_call(func_name, args_str, result_str, messages, **kwargs):
        """工具 post-hook:执行后回调(占位)。当前 no-op;未来用于结果观测/事后异常检测。"""
        pass
