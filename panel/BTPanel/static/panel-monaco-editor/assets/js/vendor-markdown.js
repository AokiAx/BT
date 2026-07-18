//#region \0virtual:btpanel-shared/marked
if (!globalThis.__BT_PANEL_SHARED__) throw Error("[Panel Shared] registry is not installed");
var e = globalThis.__BT_PANEL_SHARED__.get("marked");
if (!e) throw Error("[Panel Shared] missing shared package: marked");
var t = e.marked;
//#endregion
export { t };
