import { t as e } from "./rolldown-runtime.js";
//#region \0virtual:btpanel-shared/@xterm/addon-fit
var t = /* @__PURE__ */ e({ FitAddon: () => r });
if (!globalThis.__BT_PANEL_SHARED__) throw Error("[Panel Shared] registry is not installed");
var n = globalThis.__BT_PANEL_SHARED__.get("@xterm/addon-fit");
if (!n) throw Error("[Panel Shared] missing shared package: @xterm/addon-fit");
var r = n.FitAddon, i = /* @__PURE__ */ e({ WebLinksAddon: () => o });
if (!globalThis.__BT_PANEL_SHARED__) throw Error("[Panel Shared] registry is not installed");
var a = globalThis.__BT_PANEL_SHARED__.get("@xterm/addon-web-links");
if (!a) throw Error("[Panel Shared] missing shared package: @xterm/addon-web-links");
var o = a.WebLinksAddon, s = /* @__PURE__ */ e({ Terminal: () => l });
if (!globalThis.__BT_PANEL_SHARED__) throw Error("[Panel Shared] registry is not installed");
var c = globalThis.__BT_PANEL_SHARED__.get("@xterm/xterm");
if (!c) throw Error("[Panel Shared] missing shared package: @xterm/xterm");
var l = c.Terminal;
//#endregion
export { i as n, t as r, s as t };
