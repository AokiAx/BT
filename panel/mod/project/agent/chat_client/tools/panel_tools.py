import json
import os
import subprocess
import sys

from . import register_tool
from .base import _xml_response

os.chdir('/www/server/panel/')
sys.path.insert(0, 'class/')
sys.path.insert(0, '/www/server/panel/')
import public


def _run_shell_cmd(command: list, timeout: int = 300) -> tuple:
    """
    Common function to execute shell commands.
    Returns (success: bool, output: str)
    """
    try:
        # Use shell=False for security when passing a list
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            timeout=timeout
        )

        output = result.stdout.strip()
        if not output:
            output = result.stderr.strip()

        return result.returncode == 0, output
    except subprocess.TimeoutExpired:
        return False, f"Error: Command timed out after {timeout} seconds."
    except FileNotFoundError:
        return False, f"Error: Command not found: {command[0]}"
    except Exception as e:
        return False, f"Error executing command: {str(e)}"


# --- Tools ---

@register_tool(category="网站", name_cn="获取网站列表(不包含Docker站点)", risk_level="low")
def SiteList(search: str = None, page: int = 1, page_size: int = 20) -> str:
    """
    获取宝塔面板管理的网站列表（支持按站点名模糊搜索与分页）。只读。

    - 返回 {page, page_size, total, total_pages, sites}；sites 每项含 id、name、project_type、path（根目录）、status（运行状态）、ps（备注）、domains（绑定域名列表）、ports（端口列表，去重）。
    - name 是站点唯一标识，作为 SiteConfig / SiteLogs / SiteDelete 等工具的站点参数。
    - 仅面板原生站点；Docker 部署的站点存储在独立表，不在返回中。
    - 查网站列表用本工具，不要用 RunCommand 跑 SQL。

    Args:
        search: 站点名模糊匹配（大小写不敏感子串），可选。
        page: 页码，从 1 开始，默认 1。
        page_size: 每页条数，默认 20，上限 100。
    """
    MAX_PAGE_SIZE = 100
    try:
        page = max(1, int(page))
        page_size = max(1, min(int(page_size), MAX_PAGE_SIZE))
    except (TypeError, ValueError):
        page, page_size = 1, 20

    total_q = public.M('sites')
    if search:
        total_q = total_q.where("name LIKE ?", "%" + str(search) + "%")
    total = int(total_q.count())

    page_q = public.M('sites').field('id,name,project_type,path,status,ps')
    if search:
        page_q = page_q.where("name LIKE ?", "%" + str(search) + "%")
    sites = page_q.limit(page_size, (page - 1) * page_size).select()

    domains = public.M('domain').field('pid,name,port').select()
    dmap, pmap = {}, {}
    for d in domains:
        pid = d.get('pid')
        if pid is None:
            continue
        if d.get('name'):
            dmap.setdefault(pid, set()).add(d['name'])
        if d.get('port') not in (None, ''):
            pmap.setdefault(pid, set()).add(str(d['port']))
    for s in sites:
        sid = s.get('id')
        s['domains'] = sorted(dmap.get(sid, []))
        s['ports'] = sorted(pmap.get(sid, []), key=int)

    total_pages = (total + page_size - 1) // page_size if total else 0
    result = {
        "page": page,
        "page_size": page_size,
        "total": total,
        "total_pages": total_pages,
        "sites": sites,
    }
    return _xml_response("SiteList", "done", json.dumps(result, ensure_ascii=False, indent=2))


@register_tool(category="网站", name_cn="获取网站配置", risk_level="low")
def SiteConfig(site_name: str) -> str:
    """
    获取指定网站当前 webserver（nginx 优先，其次 apache）的站点配置文件内容。只读。

    - 返回首行标识 webserver（[webserver: nginx] 或 apache），后接原始配置全文，含 server_name / root / 反代 / 证书路径等。
    - 改配置用 SearchReplace 直接编辑该文件。

    Args:
        site_name: 网站域名或绑定标识，从 SiteList 获取。
    """

    site_data = public.M('sites').field('name,project_type').where("name=?", site_name).select()
    if not site_data:
        return _xml_response("SiteConfig", "error", f"Error: site '{site_name}' not found in panel.")
    project_type = site_data[0]['project_type'].lower()
    prefixes = [''] if project_type in ('php', 'proxy', 'phpmod', 'wp2', 'html') else ['', f"{project_type}_"]

    for ws in ('nginx', 'apache'):
        for pfx in prefixes:
            full_path = f"/www/server/panel/vhost/{ws}/{pfx}{site_name}.conf"
            if os.path.exists(full_path):
                with open(full_path, 'r') as f:
                    content = f.read()
                return _xml_response("SiteConfig", "done", f"[webserver: {ws}]\n{content}")

    return _xml_response("SiteConfig", "error", f"Error: configuration for site '{site_name}' not found.")


@register_tool(category="网站", name_cn="获取网站访问日志", risk_level="low")
def SiteLogs(site_name: str) -> str:
    """
    获取指定网站的访问日志。只读。

    - 返回面板日志接口给出的访问日志纯文本（已 XSS 转义，并对URL query 中的凭据参数脱敏），最多末尾 1000 行（另有字节上限）。
    - 仅访问日志；错误日志用 RunCommand 查 webserver 的 error log。
    - 要看统计加工数据（UV/PV/流量趋势）用 SiteStats。

    Args:
        site_name: 网站域名或绑定标识，从 SiteList 获取。
    """
    from logsModel.siteModel import main
    logs_model = main()

    logs = logs_model.GetSiteLogs(public.to_dict_obj({"siteName": site_name}))

    import re
    if isinstance(logs, dict) and isinstance(logs.get('msg'), str):
        text = logs['msg']
        text = re.sub(r'(?i)(token|key|password|passwd|secret|auth|ticket)=([^&\s]+)', r'\1=****', text)
        logs['msg'] = text

    return _xml_response("SiteLogs", "done", json.dumps(logs, ensure_ascii=False, indent=2))


@register_tool(category="网站", name_cn="获取指定网站流量访问数据", risk_level="low")
def SiteStats(site_name: str) -> str:
    """
    获取指定网站的访问统计数据。只读。

    - 返回该站的三日总览 + 近 7 日趋势（各段含流量/请求数/UV/PV）；不含站点排名。
    - site_name 必须是 SiteList 返回的 name（仅允许字母/数字/点/短横线/下划线，否则后端拒绝）。
    - 全站流量与排名用 TrafficAnalysis；原始访问日志用 SiteLogs。

    Args:
        site_name: 站点 name，从 SiteList 获取。
    """
    from projectModel.monitorModel import main as monitor

    monitordata = monitor().get_site_overview(public.to_dict_obj({"site_name": site_name}))

    return _xml_response("SiteStats", "done", json.dumps(monitordata, ensure_ascii=False, indent=2))


@register_tool(category="网站", name_cn="获取全部网站流量分析数据", risk_level="low")
def TrafficAnalysis() -> str:
    """
    获取全部网站的流量分析数据。只读。

    - 返回全站聚合数据：三日总览、当日 Top5 站点（按流量降序）、全站近 7 日趋势；各段含流量/请求数/UV/PV。
    - 字段不固定，调用后检查实际返回。
    - 单站明细用 SiteStats。
    """
    from projectModel.monitorModel import main as monitor
    monitordata = monitor().get_overview(public.to_dict_obj({"metric": "traffic", "order": "desc"}))
    return _xml_response("TrafficAnalysis", "done", json.dumps(monitordata, ensure_ascii=False, indent=2))


@register_tool(category="网站", name_cn="创建网站", risk_level="medium")
def SiteCreate(domain: str, site_path: str) -> str:
    """
    在宝塔面板创建网站（仅纯静态项目：HTML/CSS/JS 或打包前端产物）。中风险。

    - domain 支持纯域名（默认 80）、IP_端口（下划线分隔）或 IP:端口；仅当下划线/冒号后缀为纯数字才识别为端口，否则按纯域名、80 端口处理。
    - 成功返回 site_id、网站目录与 nginx 配置路径；动态项目需后续手改 nginx 反代。
    - 创建前与用户确认域名/端口/目录；误建可用 SiteDelete 删除。

    Args:
        domain: 网站域名或 IP_端口 / IP:端口，从用户获取。
        site_path: 网站文件绝对路径，通常为 /www/wwwroot/<域名或IP>。
    """
    from panelSite import panelSite

    # 识别 IP_端口 / IP:端口 格式：仅当下划线/冒号后缀为纯数字才认定，避免误伤含 _ 的普通域名
    port = '80'
    clean_domain = domain
    if '_' in domain and domain.rsplit('_', 1)[-1].isdigit():
        port = domain.rsplit('_', 1)[-1]
        clean_domain = domain.replace('_', ':', 1)
    elif ':' in domain and domain.rsplit(':', 1)[-1].isdigit():
        port = domain.rsplit(':', 1)[-1]

    webname_json = json.dumps({
        "domain": clean_domain,
        "domainlist": [],
        "count": 0
    }, ensure_ascii=False)

    params = {
        "path": site_path,
        "ftp": "false",
        "type": "PHP",
        "type_id": "0",
        "ps": "来自AI助手",
        "port": port,
        "version": "00",
        "need_index": "0",
        "need_404": "0",
        "sql": "false",
        "codeing": "utf8mb4",
        "webname": webname_json,
        "add_dns_record": "false"
    }
    result = panelSite().AddSite(public.to_dict_obj(params))

    # 判断创建状态并返回相应内容
    if result and result.get('siteStatus', False):
        # 创建成功，返回提示信息
        site_id = result.get('siteId')
        success_msg = f"站点已创建成功（site_id={site_id}）\n"
        success_msg += f"当前网站目录：{site_path}\n"
        success_msg += f"项目为纯静态项目，访问时以{site_path}/index.html为项目根目录\n\n"
        success_msg += f"nginx配置文件位于：/www/server/panel/vhost/nginx/{clean_domain.split(':')[0]}.conf\n\n"
        success_msg += f"提示：若是动态项目，可以通过修改nginx配置文件，通过反代到动态项目服务器实现。"
        return _xml_response("SiteCreate", "done", success_msg)
    else:
        # 创建失败，返回错误信息
        error_msg = result.get('msg', '创建网站失败，未知错误') if result else '创建网站失败，未返回结果'
        return _xml_response("SiteCreate", "error", error_msg)


@register_tool(category="网站", name_cn="删除网站", risk_level="high")
def SiteDelete(site_id: str, domain: str, delete_path: bool = True, ftp: bool = False, database: bool = False) -> str:
    """
    删除宝塔面板中的网站。高风险、不可逆，调用前必须向用户确认。

    - delete_path 默认 True 会连网站目录一并删（不可逆）；只想删站点记录、保留文件时显式传 False。
    - ftp / database 默认 False；需同删先与用户确认。
    - 删前用 SiteList 核对 site_id 与 domain，避免误删。

    Args:
        site_id: 网站 ID，从 SiteList 获取。
        domain: 网站域名或绑定标识，从 SiteList 获取。
        delete_path: 是否同时删网站目录，默认 True（不可逆）。
        ftp: 是否同删关联 FTP，默认 False。
        database: 是否同删关联数据库，默认 False。
    """
    from panelSite import panelSite

    params = {
        "id": site_id,
        "webname": domain,
        "path": "1" if delete_path else "0",
        "ftp": "1" if ftp else "0",
        "sql": "1" if database else "0"
    }
    result = panelSite().DeleteSite(public.to_dict_obj(params))

    if result and result.get('status', False):
        return _xml_response("SiteDelete", "done", "网站删除成功")
    else:
        error_msg = result.get('msg', '删除网站失败，未知错误') if result else '删除网站失败，未返回结果'
        return _xml_response("SiteDelete", "error", error_msg)


@register_tool(category="数据库", name_cn="获取Mysql数据库列表", risk_level="low")
def MysqlList() -> str:
    """
    获取面板管理的 MySQL 数据库列表。只读。

    - 返回每个库的 name、username、accept（允许连接的来源 IP）、type；不返回密码字段。
    - 连接密码不会由本工具提供，须向用户索取；禁止自行获取密码。
    - 查库列表用本工具，不要用 RunCommand 跑 SQL。
    """
    dbs = public.M('databases').field('name,username,accept,type').where("LOWER(type)=?", "mysql").select()
    return _xml_response("MysqlList", "done", json.dumps(dbs, ensure_ascii=False, indent=2))


@register_tool(category="网络", name_cn="获取服务器IP", risk_level="low")
def ServerIP() -> str:
    """
    获取服务器内网与公网 IP。只读。

    - 内网：各网卡 IPv4（ip -o -4 addr show，失败回退 hostname -I）。
    - 公网：经面板接口查询；接口不可用时返回 Unknown。
    - 返回可读文本（非结构化），精确解析 IP 时注意多网卡情形。
    """
    info = []

    # Internal IPs with Interface names
    # Try ip -o -4 addr show first (Linux)
    success, output = _run_shell_cmd(['ip', '-o', '-4', 'addr', 'show'])
    if success:
        info.append("--- Network Interfaces (Internal) ---")
        info.append(output)
    else:
        # Fallback to hostname -I
        s, o = _run_shell_cmd(['hostname', '-I'])
        if s:
            info.append(f"Internal IPs: {o}")
        else:
            info.append("Internal IPs: Unable to retrieve (not Linux?)")

    # External IP
    external_ip = "Unknown"
    # Try multiple services
    services = ["https://api.bt.cn/Api/getIpAddress"]
    for service in services:
        s, o = _run_shell_cmd(["curl", "-s", "--connect-timeout", "3", service])
        if s and o:
            external_ip = o
            break

    info.append(f"\n--- External IP ---")
    info.append(external_ip)

    return _xml_response("ServerIP", "done", "\n".join(info))
