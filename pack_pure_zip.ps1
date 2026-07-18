# 打包纯净版 panel-pure.zip（结构与官方 panel6.zip 一致：zip 根目录含 panel/）
# 在 Windows 上、仓库根目录执行:  powershell -ExecutionPolicy Bypass -File .\pack_pure_zip.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$PanelDir = Join-Path $Root "panel"
$OutZip = Join-Path $Root "panel-pure.zip"
$Stage = Join-Path $env:TEMP ("bt-pure-panel-" + [guid]::NewGuid().ToString("N"))

if (-not (Test-Path $PanelDir)) {
    Write-Error "找不到 panel 目录: $PanelDir"
}

# 确保纯净标记存在
$flags = @(
    "pure_mode.pl", "hide_ad.pl", "initBind.pl", "licenes.pl",
    "not_evaluate.pl", "not_recommend.pl", "not_workorder.pl",
    "recommend_show.pl", "is_set_improvement.pl"
)
$dataDir = Join-Path $PanelDir "data"
foreach ($f in $flags) {
    $p = Join-Path $dataDir $f
    if (-not (Test-Path $p)) {
        Set-Content -Path $p -Value "True" -NoNewline -Encoding ascii
        Write-Host "created flag $f"
    }
}
$improvement = Join-Path $dataDir "improvement.pl"
if (Test-Path $improvement) { Remove-Item $improvement -Force }

New-Item -ItemType Directory -Path (Join-Path $Stage "panel") -Force | Out-Null
Write-Host "Copying panel -> stage..."
robocopy $PanelDir (Join-Path $Stage "panel") /E /XD __pycache__ .git /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
if ($LASTEXITCODE -ge 8) { Write-Error "robocopy failed: $LASTEXITCODE" }

if (Test-Path $OutZip) { Remove-Item $OutZip -Force }
Write-Host "Compressing $OutZip ..."
Compress-Archive -Path (Join-Path $Stage "panel") -DestinationPath $OutZip -Force

Remove-Item $Stage -Recurse -Force
$sizeMB = [math]::Round((Get-Item $OutZip).Length / 1MB, 2)
Write-Host "OK: $OutZip ($sizeMB MB)"
Write-Host "Upload to server /root/panel-pure.zip then run install."
