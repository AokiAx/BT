# coding: utf-8
"""
Token 估算工具函数集合

提供与模型无关的 token 估算工具，避免在业务类中直接实现计算逻辑，
保持 chat_client 核心代码整洁。
"""
import re
from typing import List, Dict, Any


def estimate_text_tokens(text: str) -> int:
    """
    估算单段文本的 token 数。

    使用精细化估算：
    - 1个汉字 ≈ 1.75 个 Token (取1.5-2的中间值)
    - 1个英文单词 ≈ 1.3 个 Token
    - 其他字符（标点、空格、符号等）≈ 0.25 个 Token
    """
    if not text:
        return 0

    chinese_chars = len(re.findall(r'[\u4e00-\u9fff\u3400-\u4dbf]', text))
    english_words = len(re.findall(r'[a-zA-Z]+', text))
    total_chars = len(text)
    other_chars = total_chars - chinese_chars - english_words

    return int(chinese_chars * 1.75 + english_words * 1.3 + other_chars * 0.25)


def estimate_message_tokens(messages: List[Dict[str, Any]]) -> int:
    """
    估算消息列表的 token 数。

    支持 content 为字符串或列表（包含 text/image 等 block）的消息格式，
    并会统计 reasoning_content、tool_calls 等字段。
    """
    total_tokens = 0

    for msg in messages:
        content = msg.get('content', '')
        if isinstance(content, str):
            total_tokens += estimate_text_tokens(content)
        elif isinstance(content, list):
            for item in content:
                if isinstance(item, dict) and item.get('type') == 'text':
                    total_tokens += estimate_text_tokens(item.get('text', ''))
                elif isinstance(item, str):
                    total_tokens += estimate_text_tokens(item)

        reasoning_content = msg.get('reasoning_content', '')
        if reasoning_content:
            total_tokens += estimate_text_tokens(reasoning_content)

        for tc in msg.get('tool_calls', []):
            func = tc.get('function', {})
            tool_str = func.get('name', '') + ' ' + func.get('arguments', '')
            total_tokens += estimate_text_tokens(tool_str)

        tool_call_id = msg.get('tool_call_id', '')
        if tool_call_id:
            total_tokens += estimate_text_tokens(tool_call_id)

    return total_tokens
