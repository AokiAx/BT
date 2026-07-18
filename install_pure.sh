#!/bin/bash
# ============================================================
# 宝塔纯净版一键安装入口
# 用法（推到 GitHub 后，把下面地址换成你的仓库）：
#
#   curl -fsSL https://raw.githubusercontent.com/你的用户名/你的仓库/main/install_pure.sh | bash
#
# 或：
#   wget -O install_pure.sh https://raw.githubusercontent.com/你的用户名/你的仓库/main/install_pure.sh
#   bash install_pure.sh
#
# 可选环境变量：
#   PURE_RAW_BASE   raw 根地址（默认见下方配置区）
#   PANEL_ZIP_URL   纯净 panel-pure.zip 直链（默认 $PURE_RAW_BASE/panel-pure.zip）
#   INSTALL_EDITION 传给 install_panel.sh 的参数，默认 btg26
# ============================================================
set -e
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
LANG=en_US.UTF-8

# ---------- 配置区：发布到 GitHub 后改成你的仓库 ----------
# 例：https://raw.githubusercontent.com/AokiCore/BT/main
DEFAULT_PURE_RAW_BASE="https://raw.githubusercontent.com/CHANGE_ME/BT/main"
# 大文件更推荐 Release（超过几十 MB 时 raw 可能慢或失败）：
# DEFAULT_PANEL_ZIP_URL="https://github.com/CHANGE_ME/BT/releases/download/pure-v1/panel-pure.zip"
DEFAULT_PANEL_ZIP_URL=""
# ---------------------------------------------------------

if [ "$(id -u)" -ne 0 ]; then
	echo "请使用 root 运行：sudo -i  或  sudo bash install_pure.sh"
	exit 1
fi

PURE_RAW_BASE="${PURE_RAW_BASE:-$DEFAULT_PURE_RAW_BASE}"
INSTALL_EDITION="${INSTALL_EDITION:-btg26}"

if [ -z "${PANEL_ZIP_URL}" ]; then
	if [ -n "${DEFAULT_PANEL_ZIP_URL}" ]; then
		PANEL_ZIP_URL="${DEFAULT_PANEL_ZIP_URL}"
	else
		PANEL_ZIP_URL="${PURE_RAW_BASE}/panel-pure.zip"
	fi
fi

INSTALL_PANEL_URL="${INSTALL_PANEL_URL:-${PURE_RAW_BASE}/install_panel.sh}"

if echo "${PURE_RAW_BASE}" | grep -q "CHANGE_ME"; then
	echo "============================================================"
	echo "请先修改 install_pure.sh 顶部配置区，或通过环境变量指定仓库："
	echo ""
	echo "  export PURE_RAW_BASE=https://raw.githubusercontent.com/你的用户名/你的仓库/main"
	echo "  curl -fsSL \$PURE_RAW_BASE/install_pure.sh | bash"
	echo ""
	echo "并把 panel-pure.zip、install_panel.sh、install_pure.sh 推到该仓库。"
	echo "============================================================"
	exit 1
fi

echo "============================================================"
echo " 宝塔纯净版安装"
echo " 脚本: ${INSTALL_PANEL_URL}"
echo " 面板包: ${PANEL_ZIP_URL}"
echo "============================================================"

cd /root
WORKDIR="/root/bt-pure-install"
mkdir -p "${WORKDIR}"
cd "${WORKDIR}"

download() {
	local url="$1"
	local out="$2"
	echo "下载: ${url}"
	if command -v curl >/dev/null 2>&1; then
		curl -fL --connect-timeout 20 --retry 3 -o "${out}" "${url}"
	elif command -v wget >/dev/null 2>&1; then
		wget -O "${out}" "${url}" -T 120
	else
		echo "需要 curl 或 wget"
		exit 1
	fi
	if [ ! -s "${out}" ]; then
		echo "下载失败: ${url}"
		exit 1
	fi
}

# 系统基础工具（Ubuntu/Debian）
if command -v apt-get >/dev/null 2>&1; then
	export DEBIAN_FRONTEND=noninteractive
	apt-get update -y
	apt-get install -y curl wget unzip ca-certificates || true
fi

download "${INSTALL_PANEL_URL}" "install_panel.sh"
download "${PANEL_ZIP_URL}" "panel-pure.zip"

# 给 install_panel.sh 识别
export LOCAL_PANEL_ZIP="${WORKDIR}/panel-pure.zip"
export PANEL_ZIP_URL=""
\cp -f panel-pure.zip /root/panel-pure.zip

chmod +x install_panel.sh
echo "开始安装面板（纯净包）..."
bash install_panel.sh "${INSTALL_EDITION}"

echo ""
echo "============================================================"
echo " 安装流程已结束。查看登录信息："
echo "   bt default"
echo "============================================================"
