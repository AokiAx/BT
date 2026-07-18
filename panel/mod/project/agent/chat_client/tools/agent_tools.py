import glob
import os
import re
import shutil
import sys
from typing import List

from . import register_tool
from .base import _xml_response

os.chdir('/www/server/panel/')
sys.path.insert(0, 'class/')
sys.path.insert(0, '/www/server/panel/')


# --- Tools ---

@register_tool(category="Agent", name_cn="Glob查找", risk_level="low")
def Glob(pattern: str, path: str = None) -> str:
    """
    - Fast file pattern matching tool that works with any codebase size
    - Supports glob patterns like "**/*.js" or "src/**/*.ts"
    - Returns matching file paths sorted by modification time
    - Use this tool when you need to find files by name patterns
    - When you are doing an open-ended search that may require multiple rounds of globbing and grepping, use the Task tool instead
    - You have the capability to call multiple tools in a single response. It is always better to speculatively perform multiple searches as a batch that are potentially useful.
    
    Args:
        pattern: The glob pattern to match files against
        path: The directory to search in. If not specified, the current working directory will be used. IMPORTANT: Omit this field to use the default directory. DO NOT enter "undefined" or "null" - simply omit it for the default behavior. Must be a valid directory path if provided; never `/` or a whole-disk root (`//`, `/.`, …) — scope to a concrete dir.
    """
    if not path:
        path = os.getcwd()

    try:
        if not os.path.exists(path):
            return _xml_response("Glob", "error", f"Path not found: {path}")

        search_path = os.path.join(path, pattern)
        files = glob.glob(search_path, recursive=True)

        # Filter only files and sort by mtime (descending)
        file_stats = []
        for f in files:
            if os.path.isfile(f):
                try:
                    mtime = os.path.getmtime(f)
                    file_stats.append((f, mtime))
                except:
                    pass

        file_stats.sort(key=lambda x: x[1], reverse=True)

        limit = 100
        truncated = False
        if len(file_stats) > limit:
            file_stats = file_stats[:limit]
            truncated = True

        output = [f[0] for f in file_stats]

        if not output:
            return _xml_response("Glob", "done", "No files found")

        result = "\n".join(output)
        if truncated:
            result += f"\n\n(Results are truncated: showing first {limit} results. Consider using a more specific path or pattern.)"

        return _xml_response("Glob", "done", result)
    except Exception as e:
        return _xml_response("Glob", "error", str(e))


@register_tool(category="Agent", name_cn="Grep搜索", risk_level="low")
def Grep(pattern: str, include: str = None, path: str = None, **kwargs) -> str:
    r"""
    - Fast content search tool that works with any codebase size
    - Searches file contents using regular expressions
    - Supports full regex syntax (eg. "log.*Error", "function\s+\w+", etc.)
    - Filter files by pattern with the include parameter (eg. "*.js", "*.{ts,tsx}")
    - Returns file paths and line numbers with at least one match sorted by modification time
    - Use this tool when you need to find files containing specific patterns
    - If you need to identify/count the number of matches within files, use the Bash tool with `rg` (ripgrep) directly. Do NOT use `grep`.
    - When you are doing an open-ended search that may require multiple rounds of globbing and grepping, use the Task tool instead
    
    Args:
        pattern: The regex pattern to search for in file contents
        path: The directory to search in. Defaults to the current working directory; never `/` or a whole-disk root — scope to a concrete dir.
        include: File pattern to include in the search (e.g. "*.js", "*.{ts,tsx}")
    """
    if not path:
        path = os.getcwd()

    try:
        import glob as glob_module

        # 1. Find files
        files_to_search = []
        if os.path.isfile(path):
            files_to_search = [path]
        else:
            search_glob = include if include else "**/*"
            # Support simple brace expansion if needed, but glob doesn't support it natively in all versions
            # For simplicity, we assume standard glob patterns
            candidates = glob_module.glob(os.path.join(path, search_glob), recursive=True)
            files_to_search = [f for f in candidates if os.path.isfile(f)]

        regex = re.compile(pattern)
        matches = []
        MAX_LINE_LENGTH = 2000

        for file_path in files_to_search:
            try:
                # Check file size/binary? Skip for now to keep simple
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
                    try:
                        mtime = os.path.getmtime(file_path)
                    except:
                        mtime = 0

                    for i, line in enumerate(lines):
                        if regex.search(line):
                            matches.append({
                                "path": file_path,
                                "lineNum": i + 1,
                                "lineText": line.rstrip(),
                                "mtime": mtime
                            })
            except Exception:
                continue

        # Sort by mtime desc
        matches.sort(key=lambda x: x["mtime"], reverse=True)

        limit = 100
        truncated = len(matches) > limit
        final_matches = matches[:limit] if truncated else matches

        if not final_matches:
            return _xml_response("Grep", "done", "No files found")

        output_lines = [f"Found {len(matches)} matches{f' (showing first {limit})' if truncated else ''}"]

        current_file = ""
        for match in final_matches:
            if current_file != match["path"]:
                if current_file != "":
                    output_lines.append("")
                current_file = match["path"]
                output_lines.append(f"{match['path']}:")

            line_text = match["lineText"]
            if len(line_text) > MAX_LINE_LENGTH:
                line_text = line_text[:MAX_LINE_LENGTH] + "..."
            output_lines.append(f"  Line {match['lineNum']}: {line_text}")

        if truncated:
            output_lines.append("")
            output_lines.append(
                f"(Results truncated: showing {limit} of {len(matches)} matches. Consider using a more specific path or pattern.)")

        return _xml_response("Grep", "done", "\n".join(output_lines))

    except Exception as e:
        return _xml_response("Grep", "error", str(e))


@register_tool(category="Agent", name_cn="列出目录", risk_level="low")
def LS(path: str = None, ignore: List[str] = None) -> str:
    """
    Lists files and directories in a given path. The path parameter must be absolute; omit it to use the current workspace directory. You can optionally provide an array of glob patterns to ignore with the ignore parameter. You should generally prefer the Glob and Grep tools, if you know which directories to search.
    
    Args:
        path: The absolute path to the directory to list (must be absolute, not relative).
        ignore: List of glob patterns to ignore.
    """
    if not path:
        path = os.getcwd()

    try:
        if not os.path.exists(path):
            return _xml_response("LS", "error", "Path not found")

        DEFAULT_IGNORE = [
            "node_modules", "__pycache__", ".git", "dist", "build", "target",
            "vendor", "bin", "obj", ".idea", ".vscode", ".zig-cache", "zig-out",
            "coverage", "tmp", "temp", ".cache", "logs",
            ".venv", "venv", "env"
        ]

        ignore_patterns = DEFAULT_IGNORE + (ignore if ignore else [])

        LIMIT = 100

        def should_ignore(name):
            return name in ignore_patterns or any(glob.fnmatch.fnmatch(name, p) for p in ignore_patterns)

        try:
            entries = os.listdir(path)
        except PermissionError:
            return _xml_response("LS", "error", f"Permission denied: {path}")

        dirs = []
        files = []
        for entry in entries:
            if should_ignore(entry):
                continue
            full_path = os.path.join(path, entry)
            if os.path.isdir(full_path):
                dirs.append(entry)
            else:
                files.append(entry)

        dirs.sort()
        files.sort()

        output_lines = [f"{path}/"]

        for d in dirs:
            subdir_path = os.path.join(path, d)
            output_lines.append(f"  {d}/")

            try:
                sub_entries = os.listdir(subdir_path)
            except PermissionError:
                continue

            sub_dirs = []
            sub_files = []
            for entry in sub_entries:
                if should_ignore(entry):
                    continue
                entry_path = os.path.join(subdir_path, entry)
                if os.path.isdir(entry_path):
                    sub_dirs.append(entry)
                else:
                    sub_files.append(entry)

            sub_dirs.sort()
            sub_files.sort()

            count = 0
            truncated = False
            for sub_d in sub_dirs:
                if count >= LIMIT:
                    truncated = True
                    break
                output_lines.append(f"    {sub_d}/")
                count += 1

            for sub_f in sub_files:
                if count >= LIMIT:
                    truncated = True
                    break
                output_lines.append(f"    {sub_f}")
                count += 1

            if truncated:
                output_lines.append(f"    ... (当前目录仅展示{LIMIT}条，若需要更多请再次使用LS工具查看该目录)")

        for f in files:
            output_lines.append(f"  {f}")

        result_content = "\n".join(output_lines)
        # 清理文件名中可能包含的代理字符（Windows上os.listdir可能产生）
        result_content = result_content.encode("utf-8", errors="surrogateescape").decode("utf-8", errors="replace")
        return _xml_response("LS", "done", result_content)
    except Exception as e:
        return _xml_response("LS", "error", str(e))


@register_tool(category="Agent", name_cn="写入文件", risk_level="high")
def Write(file_path: str, content: str) -> str:
    """
    Writes a file to the local filesystem.Create a new file or overwrite the entire content of the existing file
    
    Usage:
    - This tool will overwrite the existing file if there is one at the provided path.
    - If this is an existing file, you MUST use the Read tool first to read the file's contents. This tool will fail if you did not read the file first.
    - ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required.
    - NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
    - Only use emojis if the user explicitly requests it. Avoid writing emojis to files unless asked.
    
    Args:
        content: The content to write to the file
        file_path: The absolute path to the file to write (must be absolute, not relative)
    """
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return _xml_response("Write", "done", f"Write file successfully at: {file_path}")
    except Exception as e:
        return _xml_response("Write", "error", str(e))


@register_tool(category="Agent", name_cn="删除文件", risk_level="high")
def DeleteFile(file_paths: List[str]) -> str:
    """
    Delete files or directories.
    
    Args:
        file_paths: The list of file paths you want to delete, you MUST set file path to absolute path.
    """
    deleted = []
    errors = []
    for path in file_paths:
        try:
            if os.path.isdir(path):
                shutil.rmtree(path)
            else:
                os.remove(path)
            deleted.append(path)
        except Exception as e:
            errors.append(f"{path}: {str(e)}")

    result = "<file_changes>\nThese files is deleted in this toolcall:\n<deleted_files>\n"
    for p in deleted:
        result += f"  - {p}\n"
    result += "</deleted_files>\n</file_changes>"

    if errors:
        result += f"\nErrors:\n" + "\n".join(errors)

    return _xml_response("DeleteFile", "done", result)
