# Ubuntu 纯净版 · GitHub raw 一键安装

目标：像官方一样一条命令装，不用手动 scp 覆盖。

```bash
curl -fsSL https://raw.githubusercontent.com/AokiAx/BT/main/install_pure.sh | bash
```

---

## 一、你需要推到 GitHub 的文件

| 文件 | 说明 |
|------|------|
| `install_pure.sh` | 一键入口（curl 这个） |
| `install_panel.sh` | 官方安装逻辑 + 支持纯净 zip |
| `panel-pure.zip` | 纯净面板包（约 40MB+） |

本地打包 zip：

```powershell
cd E:\AokiCore\BT
powershell -ExecutionPolicy Bypass -File .\pack_pure_zip.ps1
```

---

## 二、改仓库地址

编辑 `install_pure.sh` 顶部：

```bash
DEFAULT_PURE_RAW_BASE="https://raw.githubusercontent.com/AokiAx/BT/main"
```

推送到 GitHub（public 仓库，raw 才能免登录下）。

### 关于 panel-pure.zip

- **体积约 40MB**：可以放仓库根目录，raw 能下，但 clone 会变大。
- **更稳妥**：做成 [Release 附件](https://docs.github.com/en/repositories/releasing-projects-on-github)，在 `install_pure.sh` 里写：

```bash
DEFAULT_PANEL_ZIP_URL="https://github.com/AokiAx/BT/releases/download/pure-v1/panel-pure.zip"
```

---

## 三、服务器上安装（Ubuntu）

```bash
sudo -i

# 推荐：一条命令（仓库已改好 DEFAULT_PURE_RAW_BASE）
curl -fsSL https://raw.githubusercontent.com/AokiAx/BT/main/install_pure.sh | bash

# 或临时指定仓库：
# export PURE_RAW_BASE=https://raw.githubusercontent.com/AokiAx/BT/main
# curl -fsSL $PURE_RAW_BASE/install_pure.sh | bash
```

装完：

```bash
bt default
```

浏览器打开，**Ctrl+F5**。

---

## 四、原理

```text
install_pure.sh  (raw)
    ├─ 下载 install_panel.sh
    ├─ 下载 panel-pure.zip  → /root/panel-pure.zip
    └─ bash install_panel.sh btg26
            └─ Install_Bt 发现本地/远程纯净包 → 不解官方 panel6.zip
```

依赖、pyenv、init 仍走官方下载节点；**面板代码**用你的纯净包。

---

## 五、没有 GitHub 时

仍可手动上传：

```bash
# 把 panel-pure.zip + install_panel.sh 放到 /root/
bash /root/install_panel.sh btg26
```
