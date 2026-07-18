import { $ as e, A as t, B as n, C as r, D as i, E as a, F as o, G as s, H as c, I as l, J as u, K as d, L as f, M as p, N as m, O as h, P as g, Q as _, R as v, S as y, T as b, U as x, V as S, W as C, X as w, Y as T, Z as E, _ as D, a as O, at as k, b as A, c as j, ct as M, d as N, dt as P, et as F, f as I, g as L, h as R, i as z, it as B, j as V, k as ee, l as te, lt as H, m as ne, n as re, nt as U, o as ie, ot as W, p as G, q as K, r as ae, rt as q, s as oe, st as se, tt as ce, u as J, ut as le, v as Y, w as ue, x as de, y as fe, z as pe } from "./js/vendor-scrollbar.js";
import { ft as me, ht as he, mt as ge, pt as _e } from "./js/vendor-shiki.js";
import { a as ve, i as ye, o as be, r as xe, s as Se } from "./js/vendor-monaco.js";
import { t as Ce } from "./js/vendor-markdown.js";
import "./js/vendor-xterm.js";
//#region ../../node_modules/.pnpm/pinia@3.0.4_typescript@6.0.3_vue@3.5.34_typescript@6.0.3_/node_modules/pinia/dist/pinia.mjs
var we = typeof window < "u", Te, Ee = (e) => Te = e, De = Symbol();
function Oe(e) {
	return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ke;
(function(e) {
	e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ke ||= {});
var Ae = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function je(e, { autoBom: t = !1 } = {}) {
	return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["﻿", e], { type: e.type }) : e;
}
function Me(e, t, n) {
	let r = new XMLHttpRequest();
	r.open("GET", e), r.responseType = "blob", r.onload = function() {
		Le(r.response, t, n);
	}, r.onerror = function() {
		console.error("could not download file");
	}, r.send();
}
function Ne(e) {
	let t = new XMLHttpRequest();
	t.open("HEAD", e, !1);
	try {
		t.send();
	} catch {}
	return t.status >= 200 && t.status <= 299;
}
function Pe(e) {
	try {
		e.dispatchEvent(new MouseEvent("click"));
	} catch {
		let t = new MouseEvent("click", {
			bubbles: !0,
			cancelable: !0,
			view: window,
			detail: 0,
			screenX: 80,
			screenY: 20,
			clientX: 80,
			clientY: 20,
			ctrlKey: !1,
			altKey: !1,
			shiftKey: !1,
			metaKey: !1,
			button: 0,
			relatedTarget: null
		});
		e.dispatchEvent(t);
	}
}
var Fe = typeof navigator == "object" ? navigator : { userAgent: "" }, Ie = /Macintosh/.test(Fe.userAgent) && /AppleWebKit/.test(Fe.userAgent) && !/Safari/.test(Fe.userAgent), Le = we ? typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Ie ? Re : "msSaveOrOpenBlob" in Fe ? ze : Be : () => {};
function Re(e, t = "download", n) {
	let r = document.createElement("a");
	r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin === location.origin ? Pe(r) : Ne(r.href) ? Me(e, t, n) : (r.target = "_blank", Pe(r))) : (r.href = URL.createObjectURL(e), setTimeout(function() {
		URL.revokeObjectURL(r.href);
	}, 4e4), setTimeout(function() {
		Pe(r);
	}, 0));
}
function ze(e, t = "download", n) {
	if (typeof e == "string") if (Ne(e)) Me(e, t, n);
	else {
		let t = document.createElement("a");
		t.href = e, t.target = "_blank", setTimeout(function() {
			Pe(t);
		});
	}
	else navigator.msSaveOrOpenBlob(je(e, n), t);
}
function Be(e, t, n, r) {
	if (r ||= open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string") return Me(e, t, n);
	let i = e.type === "application/octet-stream", a = /constructor/i.test(String(Ae.HTMLElement)) || "safari" in Ae, o = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((o || i && a || Ie) && typeof FileReader < "u") {
		let t = new FileReader();
		t.onloadend = function() {
			let e = t.result;
			if (typeof e != "string") throw r = null, Error("Wrong reader.result type");
			e = o ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = e : location.assign(e), r = null;
		}, t.readAsDataURL(e);
	} else {
		let t = URL.createObjectURL(e);
		r ? r.location.assign(t) : location.href = t, r = null, setTimeout(function() {
			URL.revokeObjectURL(t);
		}, 4e4);
	}
}
var { assign: Ve } = Object;
function He() {
	let e = fe(!0), t = e.run(() => n({})), r = [], a = [], o = i({
		install(e) {
			Ee(o), o._a = e, e.provide(De, o), e.config.globalProperties.$pinia = o, a.forEach((e) => r.push(e)), a = [];
		},
		use(e) {
			return this._a ? r.push(e) : a.push(e), this;
		},
		_p: r,
		_a: null,
		_e: e,
		_s: /* @__PURE__ */ new Map(),
		state: t
	});
	return o;
}
var Ue = () => {};
function We(e, t, n, r = Ue) {
	e.add(t);
	let i = () => {
		e.delete(t) && r();
	};
	return !n && A() && l(i), i;
}
function Ge(e, ...t) {
	e.forEach((e) => {
		e(...t);
	});
}
var Ke = (e) => e(), qe = Symbol(), Je = Symbol();
function Ye(e, t) {
	e instanceof Map && t instanceof Map ? t.forEach((t, n) => e.set(n, t)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (let n in t) {
		if (!t.hasOwnProperty(n)) continue;
		let r = t[n], i = e[n];
		Oe(i) && Oe(r) && e.hasOwnProperty(n) && !a(r) && !b(r) ? e[n] = Ye(i, r) : e[n] = r;
	}
	return e;
}
var Xe = Symbol();
function Ze(e) {
	return !Oe(e) || !Object.prototype.hasOwnProperty.call(e, Xe);
}
var { assign: Qe } = Object;
function $e(e) {
	return !!(a(e) && e.effect);
}
function et(e, t, n, r) {
	let { state: a, actions: o, getters: s } = t, c = n.state.value[e], l;
	function u() {
		return c || (n.state.value[e] = a ? a() : {}), Qe(E(n.state.value[e]), o, Object.keys(s || {}).reduce((t, r) => (t[r] = i(j(() => {
			Ee(n);
			let t = n._s.get(e);
			return s[r].call(t, t);
		})), t), {}));
	}
	return l = tt(e, u, t, n, r, !0), l;
}
function tt(e, t, r = {}, i, o, s) {
	let c, l = Qe({ actions: {} }, r), u = { deep: !0 }, d, f, p = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set(), h = i.state.value[e];
	!s && !h && (i.state.value[e] = {}), n({});
	let g;
	function _(t) {
		let n;
		d = f = !1, typeof t == "function" ? (t(i.state.value[e]), n = {
			type: ke.patchFunction,
			storeId: e,
			events: void 0
		}) : (Ye(i.state.value[e], t), n = {
			type: ke.patchObject,
			payload: t,
			storeId: e,
			events: void 0
		});
		let r = g = Symbol();
		ee().then(() => {
			g === r && (d = !0);
		}), f = !0, Ge(p, n, i.state.value[e]);
	}
	let v = s ? function() {
		let { state: e } = r, t = e ? e() : {};
		this.$patch((e) => {
			Qe(e, t);
		});
	} : Ue;
	function y() {
		c.stop(), p.clear(), m.clear(), i._s.delete(e);
	}
	let x = (t, n = "") => {
		if (qe in t) return t[Je] = n, t;
		let r = function() {
			Ee(i);
			let n = Array.from(arguments), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
			function s(e) {
				a.add(e);
			}
			function c(e) {
				o.add(e);
			}
			Ge(m, {
				args: n,
				name: r[Je],
				store: S,
				after: s,
				onError: c
			});
			let l;
			try {
				l = t.apply(this && this.$id === e ? this : S, n);
			} catch (e) {
				throw Ge(o, e), e;
			}
			return l instanceof Promise ? l.then((e) => (Ge(a, e), e)).catch((e) => (Ge(o, e), Promise.reject(e))) : (Ge(a, l), l);
		};
		return r[qe] = !0, r[Je] = n, r;
	}, S = pe({
		_p: i,
		$id: e,
		$onAction: We.bind(null, m),
		$patch: _,
		$reset: v,
		$subscribe(t, n = {}) {
			let r = We(p, t, n.detached, () => a()), a = c.run(() => W(() => i.state.value[e], (r) => {
				(n.flush === "sync" ? f : d) && t({
					storeId: e,
					type: ke.direct,
					events: void 0
				}, r);
			}, Qe({}, u, n)));
			return r;
		},
		$dispose: y
	});
	i._s.set(e, S);
	let C = (i._a && i._a.runWithContext || Ke)(() => i._e.run(() => (c = fe()).run(() => t({ action: x }))));
	for (let t in C) {
		let n = C[t];
		a(n) && !$e(n) || b(n) ? s || (h && Ze(n) && (a(n) ? n.value = h[t] : Ye(n, h[t])), i.state.value[e][t] = n) : typeof n == "function" && (C[t] = x(n, t), l.actions[t] = n);
	}
	return Qe(S, C), Qe(T(S), C), Object.defineProperty(S, "$state", {
		get: () => i.state.value[e],
		set: (e) => {
			_((t) => {
				Qe(t, e);
			});
		}
	}), i._p.forEach((e) => {
		Qe(S, c.run(() => e({
			store: S,
			app: i._a,
			pinia: i,
			options: l
		})));
	}), h && s && r.hydrate && r.hydrate(S.$state, h), d = !0, f = !0, S;
}
function nt(e, t, n) {
	let i, a = typeof t == "function";
	i = a ? n : t;
	function o(n, o) {
		let s = r();
		return n ||= s ? ue(De, null) : null, n && Ee(n), n = Te, n._s.has(e) || (a ? tt(e, t, i, n) : et(e, i, n)), n._s.get(e);
	}
	return o.$id = e, o;
}
//#endregion
//#region src/components/common/Codicon.vue?vue&type=script&setup=true&lang.ts
var rt = [
	"aria-hidden",
	"aria-label",
	"role"
], X = /* @__PURE__ */ Y({
	__name: "Codicon",
	props: {
		name: {},
		label: { default: void 0 },
		decorative: {
			type: Boolean,
			default: !1
		},
		size: { default: void 0 }
	},
	setup(e) {
		let n = e, r = j(() => n.name.startsWith("codicon-") ? n.name : `codicon-${n.name}`), i = j(() => n.decorative || !n.label), a = j(() => {
			if (!(n.size === void 0 || n.size === "")) return { fontSize: typeof n.size == "number" ? `${n.size}px` : n.size };
		});
		return (n, o) => (f(), I("span", {
			class: t(["codicon ide-codicon", r.value]),
			style: p(a.value),
			"aria-hidden": i.value ? "true" : void 0,
			"aria-label": i.value ? void 0 : e.label,
			role: i.value ? void 0 : "img"
		}, null, 14, rt));
	}
}), it = /* @__PURE__ */ Y({
	__name: "OverlayScrollArea",
	setup(t) {
		let n = { scrollbars: {
			autoHide: "move",
			theme: "os-theme-ide"
		} };
		return (t, r) => (f(), J(e(re), {
			element: "div",
			class: "overlay-scroll-area",
			options: n,
			defer: !0
		}, {
			default: M(() => [c(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}));
	}
}), at = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, ot = /* @__PURE__ */ at(it, [["__scopeId", "data-v-6eb11fb9"]]);
//#endregion
//#region \0virtual:btpanel-shared/@vueuse/core
if (!globalThis.__BT_PANEL_SHARED__) throw Error("[Panel Shared] registry is not installed");
var Z = globalThis.__BT_PANEL_SHARED__.get("@vueuse/core");
if (!Z) throw Error("[Panel Shared] missing shared package: @vueuse/core");
Z.DefaultMagicKeysAliasMap, Z.StorageSerializers, Z.TransitionPresets, Z.assert, Z.asyncComputed, Z.autoResetRef, Z.breakpointsAntDesign, Z.breakpointsBootstrapV5, Z.breakpointsElement, Z.breakpointsMasterCss, Z.breakpointsPrimeFlex, Z.breakpointsQuasar, Z.breakpointsSematic, Z.breakpointsTailwind, Z.breakpointsVuetify, Z.breakpointsVuetifyV2, Z.breakpointsVuetifyV3, Z.bypassFilter, Z.camelize, Z.clamp, Z.cloneFnJSON, Z.computedAsync, Z.computedEager, Z.computedInject, Z.computedWithControl, Z.containsProp, Z.controlledComputed, Z.controlledRef, Z.createDisposableDirective, Z.createEventHook, Z.createFetch, Z.createFilterWrapper, Z.createGlobalState, Z.createInjectionState, Z.createReactiveFn, Z.createRef, Z.createReusableTemplate, Z.createSharedComposable, Z.createSingletonPromise, Z.createTemplatePromise, Z.createUnrefFn, Z.customStorageEventName, Z.debounceFilter, Z.debouncedRef, Z.debouncedWatch, Z.defaultDocument, Z.defaultLocation, Z.defaultNavigator, Z.defaultWindow, Z.eagerComputed, Z.executeTransition, Z.extendRef, Z.formatDate, Z.formatTimeAgo, Z.formatTimeAgoIntl, Z.formatTimeAgoIntlParts, Z.get, Z.getLifeCycleTarget, Z.getSSRHandler, Z.hasOwn, Z.hyphenate, Z.identity, Z.ignorableWatch, Z.increaseWithUnit, Z.injectLocal, Z.invoke, Z.isClient, Z.isDef, Z.isDefined, Z.isIOS, Z.isObject, Z.isWorker, Z.makeDestructurable, Z.mapGamepadToXbox360Controller, Z.noop, Z.normalizeDate, Z.notNullish, Z.now, Z.objectEntries, Z.objectOmit, Z.objectPick, Z.onClickOutside, Z.onElementRemoval, Z.onKeyDown, Z.onKeyPressed, Z.onKeyStroke, Z.onKeyUp, Z.onLongPress, Z.onStartTyping, Z.pausableFilter, Z.pausableWatch, Z.promiseTimeout, Z.provideLocal, Z.provideSSRWidth, Z.pxValue, Z.rand, Z.reactify, Z.reactifyObject, Z.reactiveComputed, Z.reactiveOmit, Z.reactivePick, Z.refAutoReset, Z.refDebounced, Z.refDefault, Z.refManualReset, Z.refThrottled, Z.refWithControl, Z.set, Z.setSSRHandler, Z.syncRef, Z.syncRefs, Z.templateRef, Z.throttleFilter, Z.throttledRef, Z.throttledWatch, Z.timestamp, Z.toArray, Z.toReactive, Z.toRef, Z.toRefs, Z.transition, Z.tryOnBeforeMount, Z.tryOnBeforeUnmount, Z.tryOnMounted, Z.tryOnScopeDispose, Z.tryOnUnmounted, Z.unrefElement, Z.until, Z.useActiveElement, Z.useAnimate, Z.useArrayDifference, Z.useArrayEvery, Z.useArrayFilter, Z.useArrayFind, Z.useArrayFindIndex, Z.useArrayFindLast, Z.useArrayIncludes, Z.useArrayJoin, Z.useArrayMap, Z.useArrayReduce, Z.useArraySome, Z.useArrayUnique, Z.useAsyncQueue, Z.useAsyncState, Z.useBase64, Z.useBattery, Z.useBluetooth, Z.useBreakpoints, Z.useBroadcastChannel, Z.useBrowserLocation, Z.useCached, Z.useClipboard, Z.useClipboardItems, Z.useCloned, Z.useColorMode, Z.useConfirmDialog, Z.useCountdown, Z.useCounter, Z.useCssSupports, Z.useCssVar, Z.useCurrentElement, Z.useCycleList, Z.useDark, Z.useDateFormat, Z.useDebounce, Z.useDebounceFn, Z.useDebouncedRefHistory, Z.useDeviceMotion, Z.useDeviceOrientation, Z.useDevicePixelRatio, Z.useDevicesList, Z.useDisplayMedia, Z.useDocumentVisibility, Z.useDraggable, Z.useDropZone, Z.useElementBounding, Z.useElementByPoint, Z.useElementHover, Z.useElementSize, Z.useElementVisibility, Z.useEventBus;
var st = Z.useEventListener;
Z.useEventSource, Z.useEyeDropper, Z.useFavicon, Z.useFetch, Z.useFileDialog, Z.useFileSystemAccess, Z.useFocus, Z.useFocusWithin, Z.useFps, Z.useFullscreen, Z.useGamepad, Z.useGeolocation, Z.useIdle, Z.useImage, Z.useInfiniteScroll, Z.useIntersectionObserver, Z.useInterval, Z.useIntervalFn, Z.useKeyModifier, Z.useLastChanged, Z.useLocalStorage, Z.useMagicKeys, Z.useManualRefHistory, Z.useMediaControls, Z.useMediaQuery, Z.useMemoize, Z.useMemory, Z.useMounted, Z.useMouse, Z.useMouseInElement, Z.useMousePressed, Z.useMutationObserver, Z.useNavigatorLanguage, Z.useNetwork, Z.useNow, Z.useObjectUrl, Z.useOffsetPagination, Z.useOnline, Z.usePageLeave, Z.useParallax, Z.useParentElement, Z.usePerformanceObserver, Z.usePermission, Z.usePointer, Z.usePointerLock, Z.usePointerSwipe, Z.usePreferredColorScheme, Z.usePreferredContrast, Z.usePreferredDark, Z.usePreferredLanguages, Z.usePreferredReducedMotion, Z.usePreferredReducedTransparency, Z.usePrevious, Z.useRafFn, Z.useRefHistory;
var ct = Z.useResizeObserver;
Z.useSSRWidth, Z.useScreenOrientation, Z.useScreenSafeArea, Z.useScriptTag, Z.useScroll, Z.useScrollLock, Z.useSessionStorage, Z.useShare, Z.useSorted, Z.useSpeechRecognition, Z.useSpeechSynthesis, Z.useStepper, Z.useStorage, Z.useStorageAsync, Z.useStyleTag, Z.useSupported, Z.useSwipe, Z.useTemplateRefsList, Z.useTextDirection, Z.useTextSelection, Z.useTextareaAutosize, Z.useThrottle;
var lt = Z.useThrottleFn;
Z.useThrottledRefHistory, Z.useTimeAgo, Z.useTimeAgoIntl, Z.useTimeout, Z.useTimeoutFn, Z.useTimeoutPoll, Z.useTimestamp, Z.useTitle, Z.useToNumber, Z.useToString, Z.useToggle, Z.useTransition, Z.useUrlSearchParams, Z.useUserMedia, Z.useVModel, Z.useVModels, Z.useVibrate;
var ut = Z.useVirtualList;
Z.useWakeLock, Z.useWebNotification, Z.useWebSocket, Z.useWebWorker, Z.useWebWorkerFn, Z.useWindowFocus, Z.useWindowScroll, Z.useWindowSize, Z.watchArray, Z.watchAtMost, Z.watchDebounced, Z.watchDeep, Z.watchIgnorable, Z.watchImmediate, Z.watchOnce, Z.watchPausable, Z.watchThrottled, Z.watchTriggerable, Z.watchWithFilter, Z.whenever;
//#endregion
//#region src/composables/useVirtualWorkbenchList.ts
var dt = (e, t = {}) => {
	let n = j(() => _(e)), r = ut(n, {
		itemHeight: t.itemHeight ?? 24,
		overscan: t.overscan ?? 8
	}), [i] = ae({
		options: { scrollbars: {
			autoHide: "move",
			theme: "os-theme-ide"
		} },
		defer: !0
	});
	W(() => r.containerProps.ref.value, (e) => {
		e && i(e);
	}, {
		flush: "post",
		immediate: !0
	});
	let a = j(() => r.list.value.length > 0 ? r.list.value : n.value.slice(0, t.fallbackItemCount ?? 80).map((e, t) => ({
		data: e,
		index: t
	})));
	return {
		...r,
		list: a
	};
}, ft = nt("command", {
	state: () => ({ commands: [] }),
	actions: {
		setCommands(e) {
			this.commands = e.map((e) => ({ ...e }));
		},
		upsertCommand(e) {
			let t = this.commands.findIndex((t) => t.id === e.id);
			if (t >= 0) {
				this.commands[t] = { ...e };
				return;
			}
			this.commands.push({ ...e });
		},
		removeCommand(e) {
			this.commands = this.commands.filter((t) => t.id !== e);
		}
	}
}), pt = [
	"Ctrl",
	"Alt",
	"Shift",
	"Meta"
], mt = (e) => {
	let t = e.split("+").map((e) => e.trim()).filter(Boolean), n = t.filter((e) => pt.some((t) => t.toLowerCase() === e.toLowerCase())).map((e) => pt.find((t) => t.toLowerCase() === e.toLowerCase()) ?? e), r = t.find((e) => !pt.some((t) => t.toLowerCase() === e.toLowerCase()));
	return [...pt.filter((e) => n.includes(e)), r?.toUpperCase()].filter(Boolean).join("+");
}, ht = (e) => {
	let t = e.key.length === 1 ? e.key.toUpperCase() : e.key;
	return [
		"Alt",
		"Control",
		"Ctrl",
		"Meta",
		"Shift"
	].includes(t) ? "" : mt([
		e.ctrlKey ? "Ctrl" : void 0,
		e.altKey ? "Alt" : void 0,
		e.shiftKey ? "Shift" : void 0,
		e.metaKey ? "Meta" : void 0,
		t
	].filter(Boolean).join("+"));
}, gt = new class {
	overrides = /* @__PURE__ */ new Map();
	constructor(e = {}) {
		for (let [t, n] of Object.entries(e)) this.overrides.set(t, mt(n));
	}
	getRows(e) {
		return e.map((e) => ({
			commandId: e.id,
			title: e.title,
			category: e.category,
			defaultKeybinding: e.keybinding,
			keybinding: this.getEffectiveKeybinding(e)
		}));
	}
	getEffectiveKeybinding(e) {
		return this.overrides.get(e.id) ?? e.keybinding;
	}
	updateKeybinding(e, t, n) {
		let r = mt(t), i = n.find((t) => t.id !== e && this.getEffectiveKeybinding(t) && mt(this.getEffectiveKeybinding(t) ?? "") === r);
		return i ? {
			ok: !1,
			error: {
				code: "KEYBINDING_CONFLICT",
				message: `快捷键 "${r}" 已被 "${i.title}" 使用。`,
				conflictingCommandId: i.id
			}
		} : (this.overrides.set(e, r), {
			ok: !0,
			commandId: e,
			keybinding: r
		});
	}
	findCommandByKeyboardEvent(e, t) {
		let n = ht(e);
		if (!n) return;
		let r = e.metaKey && !e.ctrlKey ? [n, mt(n.replace("Meta", "Ctrl"))] : [n];
		return t.find((e) => this.getEffectiveKeybinding(e) && r.includes(mt(this.getEffectiveKeybinding(e) ?? "")));
	}
}(), _t = {
	class: "keybindings-view",
	"data-testid": "keybindings-view"
}, vt = { class: "keybindings-view__header" }, yt = { class: "keybindings-view__title" }, bt = { class: "keybindings-view__search" }, xt = { class: "keybindings-view__table" }, St = {
	key: 0,
	class: "keybindings-view__empty"
}, Ct = { class: "keybindings-view__command" }, wt = { class: "keybindings-view__binding" }, Tt = [
	"title",
	"aria-label",
	"onClick"
], Et = ["onKeydown"], Dt = {
	key: 2,
	class: "keybindings-view__conflict",
	"data-testid": "keybinding-conflict"
}, Ot = { class: "keybindings-view__source" }, kt = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "KeybindingsView",
	setup(t) {
		let r = ft(), i = n(""), a = n(0), o = n(), s = n(), c = j(() => {
			a.value;
			let e = i.value.trim().toLowerCase(), t = gt.getRows(r.commands);
			return e ? t.filter((t) => [
				t.title,
				t.commandId,
				t.category,
				t.keybinding,
				t.defaultKeybinding
			].filter(Boolean).join(" ").toLowerCase().includes(e)) : t;
		}), { list: l, containerProps: u, wrapperProps: d } = dt(c, {
			itemHeight: 42,
			overscan: 10
		}), p = async (e) => {
			o.value = e, s.value = void 0, await ee(), document.querySelector("[data-testid=\"keybinding-recorder\"]")?.focus();
		}, m = (e, t) => {
			let n = ht(t);
			if (!n) return;
			let i = gt.updateKeybinding(e, n, r.commands);
			if (!i.ok) {
				s.value = {
					commandId: e,
					message: i.error.message
				};
				return;
			}
			o.value = void 0, s.value = void 0, a.value += 1;
		};
		return (t, n) => (f(), I("section", _t, [G("header", vt, [G("div", yt, [n[1] ||= G("h2", null, "键盘快捷方式", -1), G("span", null, K(c.value.length) + " 个命令", 1)]), G("div", bt, [D(X, {
			name: "search",
			decorative: ""
		}), H(G("input", {
			"onUpdate:modelValue": n[0] ||= (e) => i.value = e,
			"data-testid": "keybindings-search",
			type: "search",
			autocomplete: "off",
			spellcheck: "false",
			placeholder: "搜索快捷键"
		}, null, 512), [[B, i.value]])])]), G("div", xt, [n[2] ||= G("div", {
			class: "keybindings-view__table-head",
			"aria-hidden": "true"
		}, [
			G("span", null, "命令"),
			G("span", null, "快捷键"),
			G("span", null, "来源")
		], -1), c.value.length === 0 ? (f(), I("div", St, " 未找到快捷键。 ")) : (f(), I("div", h({
			key: 1,
			class: "keybindings-view__list"
		}, e(u)), [G("div", V(de(e(d))), [(f(!0), I(z, null, S(e(l), ({ data: e }) => (f(), I("div", {
			key: e.commandId,
			class: "keybindings-view__row",
			"data-testid": "keybinding-row"
		}, [
			G("div", Ct, [G("span", null, K(e.title), 1), G("small", null, K(e.commandId), 1)]),
			G("div", wt, [o.value === e.commandId ? (f(), I("button", {
				key: 1,
				class: "keybindings-view__recorder",
				type: "button",
				"data-testid": "keybinding-recorder",
				onKeydown: P((t) => m(e.commandId, t), ["stop", "prevent"])
			}, " 按下快捷键 ", 40, Et)) : (f(), I("button", {
				key: 0,
				class: "keybindings-view__edit",
				type: "button",
				"data-testid": "keybinding-edit",
				title: `编辑 ${e.title}`,
				"aria-label": `编辑 ${e.title}`,
				onClick: (t) => p(e.commandId)
			}, [G("kbd", null, K(e.keybinding || "未分配"), 1), D(X, {
				name: "edit",
				decorative: ""
			})], 8, Tt)), s.value?.commandId === e.commandId ? (f(), I("p", Dt, K(s.value.message), 1)) : N("", !0)]),
			G("span", Ot, K(e.category), 1)
		]))), 128))], 16)], 16))])]));
	}
}), [["__scopeId", "data-v-90ac9409"]]), At = [
	{
		id: "json",
		displayName: "JSON",
		extensions: [".json", ".jsonc"]
	},
	{
		id: "vue",
		displayName: "Vue",
		extensions: [".vue"]
	},
	{
		id: "image",
		displayName: "图片",
		extensions: [
			".jpg",
			".jpeg",
			".png",
			".gif",
			".webp",
			".avif",
			".bmp",
			".ico"
		]
	},
	{
		id: "video",
		displayName: "视频",
		extensions: [
			".mp4",
			".webm",
			".ogg",
			".ogv",
			".mov"
		]
	},
	{
		id: "settings",
		displayName: "设置"
	},
	{
		id: "plaintext",
		displayName: "纯文本"
	},
	{
		id: "abap",
		displayName: "abap",
		extensions: [".abap"]
	},
	{
		id: "apex",
		displayName: "Apex",
		extensions: [".cls"]
	},
	{
		id: "azcli",
		displayName: "Azure CLI",
		extensions: [".azcli"]
	},
	{
		id: "bat",
		displayName: "Batch",
		extensions: [".bat", ".cmd"]
	},
	{
		id: "bicep",
		displayName: "Bicep",
		extensions: [".bicep"]
	},
	{
		id: "cameligo",
		displayName: "Cameligo",
		extensions: [".mligo"]
	},
	{
		id: "clojure",
		displayName: "clojure",
		extensions: [
			".clj",
			".cljs",
			".cljc",
			".edn"
		]
	},
	{
		id: "coffeescript",
		displayName: "CoffeeScript",
		extensions: [".coffee"]
	},
	{
		id: "c",
		displayName: "C",
		extensions: [".c", ".h"]
	},
	{
		id: "cpp",
		displayName: "C++",
		extensions: [
			".cpp",
			".cc",
			".cxx",
			".hpp",
			".hh",
			".hxx"
		]
	},
	{
		id: "csharp",
		displayName: "C#",
		extensions: [
			".cs",
			".csx",
			".cake"
		]
	},
	{
		id: "csp",
		displayName: "CSP",
		extensions: [".csp"]
	},
	{
		id: "css",
		displayName: "CSS",
		extensions: [".css"]
	},
	{
		id: "cypher",
		displayName: "Cypher",
		extensions: [".cypher", ".cyp"]
	},
	{
		id: "dart",
		displayName: "Dart",
		extensions: [".dart"]
	},
	{
		id: "dockerfile",
		displayName: "Dockerfile",
		extensions: [".dockerfile"],
		filenames: ["Dockerfile"]
	},
	{
		id: "ecl",
		displayName: "ECL",
		extensions: [".ecl"]
	},
	{
		id: "elixir",
		displayName: "Elixir",
		extensions: [".ex", ".exs"]
	},
	{
		id: "flow9",
		displayName: "Flow9",
		extensions: [".flow"]
	},
	{
		id: "freemarker2",
		displayName: "FreeMarker2",
		extensions: [
			".ftl",
			".ftlh",
			".ftlx"
		]
	},
	{
		id: "freemarker2.tag-angle.interpolation-dollar",
		displayName: "FreeMarker2 (Angle/Dollar)"
	},
	{
		id: "freemarker2.tag-bracket.interpolation-dollar",
		displayName: "FreeMarker2 (Bracket/Dollar)"
	},
	{
		id: "freemarker2.tag-angle.interpolation-bracket",
		displayName: "FreeMarker2 (Angle/Bracket)"
	},
	{
		id: "freemarker2.tag-bracket.interpolation-bracket",
		displayName: "FreeMarker2 (Bracket/Bracket)"
	},
	{
		id: "freemarker2.tag-auto.interpolation-dollar",
		displayName: "FreeMarker2 (Auto/Dollar)"
	},
	{
		id: "freemarker2.tag-auto.interpolation-bracket",
		displayName: "FreeMarker2 (Auto/Bracket)"
	},
	{
		id: "fsharp",
		displayName: "F#",
		extensions: [
			".fs",
			".fsi",
			".ml",
			".mli",
			".fsx",
			".fsscript"
		]
	},
	{
		id: "go",
		displayName: "Go",
		extensions: [".go"]
	},
	{
		id: "graphql",
		displayName: "GraphQL",
		extensions: [".graphql", ".gql"]
	},
	{
		id: "handlebars",
		displayName: "Handlebars",
		extensions: [".handlebars", ".hbs"]
	},
	{
		id: "hcl",
		displayName: "Terraform",
		extensions: [
			".tf",
			".tfvars",
			".hcl"
		]
	},
	{
		id: "html",
		displayName: "HTML",
		extensions: [
			".html",
			".htm",
			".shtml",
			".xhtml",
			".mdoc",
			".jsp",
			".asp",
			".aspx",
			".jshtm"
		]
	},
	{
		id: "ini",
		displayName: "Ini",
		extensions: [
			".ini",
			".properties",
			".gitconfig"
		],
		filenames: [
			"config",
			".gitattributes",
			".gitconfig",
			".editorconfig"
		]
	},
	{
		id: "java",
		displayName: "Java",
		extensions: [".java", ".jav"]
	},
	{
		id: "javascript",
		displayName: "JavaScript",
		extensions: [
			".js",
			".es6",
			".jsx",
			".mjs",
			".cjs"
		],
		filenames: ["jakefile"]
	},
	{
		id: "julia",
		displayName: "julia",
		extensions: [".jl"]
	},
	{
		id: "kotlin",
		displayName: "Kotlin",
		extensions: [".kt", ".kts"]
	},
	{
		id: "less",
		displayName: "Less",
		extensions: [".less"]
	},
	{
		id: "lexon",
		displayName: "Lexon",
		extensions: [".lex"]
	},
	{
		id: "liquid",
		displayName: "Liquid",
		extensions: [".liquid", ".html.liquid"]
	},
	{
		id: "lua",
		displayName: "Lua",
		extensions: [".lua"]
	},
	{
		id: "m3",
		displayName: "Modula-3",
		extensions: [
			".m3",
			".i3",
			".mg",
			".ig"
		]
	},
	{
		id: "markdown",
		displayName: "Markdown",
		extensions: [
			".md",
			".markdown",
			".mdown",
			".mkdn",
			".mkd",
			".mdwn",
			".mdtxt",
			".mdtext"
		]
	},
	{
		id: "mdx",
		displayName: "MDX",
		extensions: [".mdx"]
	},
	{
		id: "mips",
		displayName: "MIPS",
		extensions: [".s"]
	},
	{
		id: "msdax",
		displayName: "DAX",
		extensions: [".dax", ".msdax"]
	},
	{
		id: "mysql",
		displayName: "MySQL"
	},
	{
		id: "objective-c",
		displayName: "Objective-C",
		extensions: [".m"]
	},
	{
		id: "pascal",
		displayName: "Pascal",
		extensions: [
			".pas",
			".p",
			".pp"
		]
	},
	{
		id: "pascaligo",
		displayName: "Pascaligo",
		extensions: [".ligo"]
	},
	{
		id: "perl",
		displayName: "Perl",
		extensions: [".pl", ".pm"]
	},
	{
		id: "pgsql",
		displayName: "PostgreSQL"
	},
	{
		id: "php",
		displayName: "PHP",
		extensions: [
			".php",
			".php4",
			".php5",
			".phtml",
			".ctp"
		]
	},
	{
		id: "pla",
		displayName: "pla",
		extensions: [".pla"]
	},
	{
		id: "postiats",
		displayName: "ATS",
		extensions: [
			".dats",
			".sats",
			".hats"
		]
	},
	{
		id: "powerquery",
		displayName: "PQ",
		extensions: [".pq", ".pqm"]
	},
	{
		id: "powershell",
		displayName: "PowerShell",
		extensions: [
			".ps1",
			".psm1",
			".psd1"
		]
	},
	{
		id: "proto",
		displayName: "protobuf",
		extensions: [".proto"]
	},
	{
		id: "pug",
		displayName: "Pug",
		extensions: [".jade", ".pug"]
	},
	{
		id: "python",
		displayName: "Python",
		extensions: [
			".py",
			".rpy",
			".pyw",
			".cpy",
			".gyp",
			".gypi"
		]
	},
	{
		id: "qsharp",
		displayName: "Q#",
		extensions: [".qs"]
	},
	{
		id: "r",
		displayName: "R",
		extensions: [
			".r",
			".rhistory",
			".rmd",
			".rprofile",
			".rt"
		]
	},
	{
		id: "razor",
		displayName: "Razor",
		extensions: [".cshtml"]
	},
	{
		id: "redis",
		displayName: "redis",
		extensions: [".redis"]
	},
	{
		id: "redshift",
		displayName: "Redshift"
	},
	{
		id: "restructuredtext",
		displayName: "reStructuredText",
		extensions: [".rst"]
	},
	{
		id: "ruby",
		displayName: "Ruby",
		extensions: [
			".rb",
			".rbx",
			".rjs",
			".gemspec",
			".pp"
		],
		filenames: ["rakefile", "Gemfile"]
	},
	{
		id: "rust",
		displayName: "Rust",
		extensions: [".rs", ".rlib"]
	},
	{
		id: "sb",
		displayName: "Small Basic",
		extensions: [".sb"]
	},
	{
		id: "scala",
		displayName: "Scala",
		extensions: [
			".scala",
			".sc",
			".sbt"
		]
	},
	{
		id: "scheme",
		displayName: "scheme",
		extensions: [
			".scm",
			".ss",
			".sch",
			".rkt"
		]
	},
	{
		id: "scss",
		displayName: "Sass",
		extensions: [".scss"]
	},
	{
		id: "shell",
		displayName: "Shell",
		extensions: [".sh", ".bash"]
	},
	{
		id: "sol",
		displayName: "sol",
		extensions: [".sol"]
	},
	{
		id: "aes",
		displayName: "aes",
		extensions: [".aes"]
	},
	{
		id: "sparql",
		displayName: "sparql",
		extensions: [".rq"]
	},
	{
		id: "sql",
		displayName: "SQL",
		extensions: [".sql"]
	},
	{
		id: "st",
		displayName: "StructuredText",
		extensions: [
			".st",
			".iecst",
			".iecplc",
			".lc3lib",
			".TcPOU",
			".TcDUT",
			".TcGVL",
			".TcIO"
		]
	},
	{
		id: "swift",
		displayName: "Swift",
		extensions: [".swift"]
	},
	{
		id: "systemverilog",
		displayName: "SV",
		extensions: [".sv", ".svh"]
	},
	{
		id: "verilog",
		displayName: "V",
		extensions: [".v", ".vh"]
	},
	{
		id: "tcl",
		displayName: "tcl",
		extensions: [".tcl"]
	},
	{
		id: "twig",
		displayName: "Twig",
		extensions: [".twig"]
	},
	{
		id: "typescript",
		displayName: "TypeScript",
		extensions: [
			".ts",
			".tsx",
			".cts",
			".mts"
		]
	},
	{
		id: "typespec",
		displayName: "TypeSpec",
		extensions: [".tsp"]
	},
	{
		id: "vb",
		displayName: "Visual Basic",
		extensions: [".vb"]
	},
	{
		id: "wgsl",
		displayName: "WebGPU Shading Language",
		extensions: [".wgsl"]
	},
	{
		id: "xml",
		displayName: "XML",
		extensions: [
			".xml",
			".xsd",
			".dtd",
			".ascx",
			".csproj",
			".config",
			".props",
			".targets",
			".wxi",
			".wxl",
			".wxs",
			".xaml",
			".svg",
			".svgz",
			".opf",
			".xslt",
			".xsl"
		]
	},
	{
		id: "yaml",
		displayName: "YAML",
		extensions: [".yaml", ".yml"]
	}
], jt = new Map(At.map((e) => [e.id, e])), Mt = At.flatMap((e) => (e.extensions ?? []).map((t) => ({
	extension: t.toLowerCase(),
	languageId: e.id
}))).sort((e, t) => t.extension.length - e.extension.length), Nt = At.flatMap((e) => (e.filenames ?? []).map((t) => ({
	filename: t.toLowerCase(),
	languageId: e.id
}))), Pt = (e) => e.replace(/[?#].*$/, "").replace(/\\/g, "/").toLowerCase(), Ft = (e) => e.split("/").filter(Boolean).at(-1) ?? e, It = (e) => !e || e === "plaintext" ? "纯文本" : jt.get(e)?.displayName ?? e, Lt = (e) => {
	let t = Pt(e), n = Ft(t), r = Nt.find((e) => e.filename === n);
	return r ? r.languageId : Mt.find((e) => t.endsWith(e.extension))?.languageId ?? "plaintext";
}, Rt = nt("commandPalette", {
	state: () => ({
		visible: !1,
		mode: "commands",
		query: ""
	}),
	actions: {
		open(e) {
			this.mode = e, this.query = "", this.visible = !0;
		},
		close() {
			this.visible = !1, this.query = "";
		},
		setQuery(e) {
			this.query = e;
		}
	}
}), zt = nt("workspace", {
	state: () => ({
		workspaceName: "monaco-workspace",
		currentDirectoryPath: "/",
		fileTree: [],
		fileTreeLoading: !1,
		fileTreeError: null,
		activeFilePath: null,
		selectedPath: null,
		selectedPaths: [],
		selectionAnchorPath: null,
		focusedPath: null,
		expandedFolderPaths: [],
		fileSystemProviderStatus: null
	}),
	actions: {
		setWorkspaceName(e) {
			this.workspaceName = e;
		},
		setCurrentDirectoryPath(e) {
			this.currentDirectoryPath = e || "/";
		},
		setFileTree(e) {
			this.fileTree = e;
		},
		setFileTreeLoading(e) {
			this.fileTreeLoading = e, e && (this.fileTreeError = null);
		},
		setFileTreeError(e) {
			this.fileTreeError = e;
		},
		setActiveFilePath(e) {
			this.activeFilePath = e;
		},
		setSelectedPath(e) {
			this.selectedPath = e, this.selectedPaths = e ? [e] : [], this.selectionAnchorPath = e;
		},
		setSelectedPaths(e, t) {
			let n = Array.from(new Set(e));
			this.selectedPaths = n, this.selectedPath = n.at(-1) ?? null, this.selectionAnchorPath = t === void 0 ? this.selectionAnchorPath ?? this.selectedPath : t;
		},
		setFocusedPath(e) {
			this.focusedPath = e;
		},
		setExpandedFolderPaths(e) {
			this.expandedFolderPaths = e;
		},
		setFileSystemProviderStatus(e) {
			this.fileSystemProviderStatus = e;
		},
		toggleExpandedFolderPath(e) {
			if (this.expandedFolderPaths.includes(e)) {
				this.expandedFolderPaths = this.expandedFolderPaths.filter((t) => t !== e);
				return;
			}
			this.expandedFolderPaths = [...this.expandedFolderPaths, e];
		}
	}
}), Bt = () => ({
	aiEnabled: !0,
	extensionsEnabled: !0,
	externalNetworkEnabled: !0,
	readOnlyWorkspace: !1,
	remoteEnabled: !0,
	terminalEnabled: !0
}), Vt = new Set([
	"file.save",
	"file.newFile",
	"file.newFolder",
	"file.rename",
	"file.delete"
]), Ht = new Set([
	"workspace.connectMockRemote",
	"workspace.connectManagedRemote",
	"workspace.simulateRemoteDisconnect",
	"workspace.startRemoteReconnect",
	"workspace.cancelRemoteReconnect",
	"workspace.retryRemoteReconnect",
	"workspace.simulateRemoteSaveConflict",
	"workspace.resolveRemoteConflictUseLocal"
]), Ut = new Set([
	"extensions.activateExample",
	"extensions.installMarketplaceDemo",
	"extensions.enableMarketplaceDemo"
]), Wt = () => ({
	auditLog: [],
	policy: Bt()
}), Gt = new class {
	auditCounter = 0;
	state = d(Wt());
	get stateRef() {
		return this.state;
	}
	getState() {
		return {
			auditLog: [...this.state.value.auditLog],
			policy: { ...this.state.value.policy }
		};
	}
	applyPolicy(e) {
		this.state.value = {
			...this.state.value,
			policy: {
				...this.state.value.policy,
				...e
			}
		};
	}
	applyLockedDownPolicy() {
		this.applyPolicy({
			aiEnabled: !1,
			extensionsEnabled: !1,
			externalNetworkEnabled: !1,
			readOnlyWorkspace: !0,
			remoteEnabled: !1,
			terminalEnabled: !1
		});
	}
	clearPolicy() {
		this.state.value = {
			...this.state.value,
			policy: Bt()
		};
	}
	reset() {
		this.auditCounter = 0, this.state.value = Wt();
	}
	evaluateCommand(e) {
		let t = this.state.value.policy;
		return t.readOnlyWorkspace && Vt.has(e) ? {
			allowed: !1,
			reason: `${e} 需要可写工作区。`,
			requirement: "writable-workspace"
		} : !t.terminalEnabled && e === "workbench.action.openTerminal" ? {
			allowed: !1,
			reason: `${e} 需要启用终端。`,
			requirement: "terminal"
		} : !t.aiEnabled && e.startsWith("ai.") && e !== "ai.cancel" ? {
			allowed: !1,
			reason: `${e} 需要启用 AI。`,
			requirement: "ai"
		} : !t.extensionsEnabled && Ut.has(e) ? {
			allowed: !1,
			reason: `${e} 需要启用扩展。`,
			requirement: "extensions"
		} : !t.remoteEnabled && Ht.has(e) ? {
			allowed: !1,
			reason: `${e} 需要启用远程工作区。`,
			requirement: "remote"
		} : { allowed: !0 };
	}
	recordCommandDecision(e, t) {
		t.allowed || (this.auditCounter += 1, this.state.value = {
			...this.state.value,
			auditLog: [...this.state.value.auditLog, {
				commandId: e,
				decision: "denied",
				id: `enterprise-audit-${this.auditCounter}`,
				reason: t.reason,
				requirement: t.requirement,
				timestamp: Date.now()
			}]
		});
	}
}(), Kt = 1e4, qt = new class {
	linesByChannel = /* @__PURE__ */ new Map();
	listeners = /* @__PURE__ */ new Set();
	activeChannel = "Tasks";
	constructor() {
		this.linesByChannel.set(this.activeChannel, []);
	}
	appendLine(e, t) {
		let n = this.linesByChannel.get(e);
		n ? (n.push(t), n.length > Kt && n.splice(0, n.length - Kt)) : this.linesByChannel.set(e, [t]), this.activeChannel = e, this.notify();
	}
	clear(e = this.activeChannel) {
		this.linesByChannel.set(e, []), this.notify();
	}
	getChannels() {
		return Array.from(this.linesByChannel.keys());
	}
	getActiveChannel() {
		return this.activeChannel;
	}
	setActiveChannel(e) {
		this.activeChannel = e, this.linesByChannel.has(e) || this.linesByChannel.set(e, []), this.notify();
	}
	getLines(e = this.activeChannel) {
		return [...this.linesByChannel.get(e) ?? []];
	}
	onDidChange(e) {
		return this.listeners.add(e), () => {
			this.listeners.delete(e);
		};
	}
	notify() {
		for (let e of this.listeners) e();
	}
}(), Jt = nt("layout", {
	state: () => ({
		sidebar: { visible: !0 },
		panel: { visible: !0 },
		rightPanel: { visible: !1 },
		performanceMonitor: { visible: !1 },
		activeActivity: "explorer",
		activePanelTab: "problems",
		focusedArea: "editor"
	}),
	actions: {
		setSidebarVisible(e) {
			this.sidebar.visible = e;
		},
		setPanelVisible(e) {
			this.panel.visible = e;
		},
		setRightPanelVisible(e) {
			this.rightPanel.visible = e;
		},
		setPerformanceMonitorVisible(e) {
			this.performanceMonitor.visible = e;
		},
		togglePerformanceMonitor() {
			this.performanceMonitor.visible = !this.performanceMonitor.visible;
		},
		setActiveActivity(e) {
			this.activeActivity = e;
		},
		setActivePanelTab(e) {
			this.activePanelTab = e;
		},
		setFocusedArea(e) {
			this.focusedArea = e;
		}
	}
}), Yt = (e, t) => {
	let n = t.filter((t) => t.groupId === e.id).map((e) => e.id);
	if (!n.length) return [];
	if (!e.tabIds.length) return n;
	let r = new Set(n), i = e.tabIds.filter((e) => r.has(e)), a = new Set(i);
	return [...i, ...n.filter((e) => !a.has(e))];
}, Xt = nt("editor", {
	state: () => ({
		tabs: [],
		groups: [{
			id: "main",
			tabIds: []
		}],
		groupLayout: "single",
		activeGroupId: "main",
		activeTabId: null,
		cursorPosition: {
			lineNumber: 1,
			column: 1
		},
		activeEditorStatus: null
	}),
	actions: {
		setTabs(e) {
			this.tabs = e;
		},
		setGroups(e) {
			this.groups = e;
		},
		setGroupLayout(e) {
			this.groupLayout = e;
		},
		setActiveGroupId(e) {
			this.activeGroupId = e;
		},
		setActiveTabId(e) {
			this.activeTabId = e;
		},
		setCursorPosition(e) {
			this.cursorPosition = e;
		},
		setActiveEditorStatus(e) {
			this.activeEditorStatus = e, this.cursorPosition = e.cursor;
		},
		clearActiveEditorStatus() {
			this.activeEditorStatus = null;
		},
		setTabDirty(e, t) {
			this.tabs = this.tabs.map((n) => n.id === e ? {
				...n,
				dirty: t
			} : n);
		},
		setTabDirtyByPath(e, t) {
			this.tabs = this.tabs.map((n) => n.path === e ? {
				...n,
				dirty: t
			} : n);
		},
		setTabPinned(e, t) {
			this.tabs = this.tabs.map((n) => n.id === e ? {
				...n,
				pinned: t
			} : n);
		},
		setTabContentStatus(e, t, n) {
			this.tabs = this.tabs.map((r) => r.id === e ? {
				...r,
				contentStatus: t,
				contentError: n
			} : r);
		},
		setTabFileMeta(e, t) {
			this.tabs = this.tabs.map((n) => n.id === e ? {
				...n,
				fileMeta: {
					...n.fileMeta,
					...t
				}
			} : n);
		},
		setTabPresentation(e, t) {
			this.tabs = this.tabs.map((n) => n.id === e ? {
				...n,
				...t
			} : n);
		},
		moveTabWithinGroup(e, t, n, r = "before") {
			if (e === t) return !1;
			let i = this.tabs.find((t) => t.id === e), a = this.tabs.find((e) => e.id === t);
			if (!i || !a || i.groupId !== a.groupId) return !1;
			let o = n ?? i.groupId;
			if (i.groupId !== o) return !1;
			let s = this.groups.find((e) => e.id === o), c = this.tabs.filter((e) => e.groupId === o).map((e) => e.id), l = [...(s?.tabIds.length ? s.tabIds : c).filter((e) => c.includes(e)), ...c.filter((e) => !s?.tabIds.includes(e))].filter((t) => t !== e), u = l.indexOf(t);
			if (u < 0) return !1;
			l.splice(u + +(r === "after"), 0, e), this.groups = this.groups.map((e) => e.id === o ? {
				...e,
				tabIds: l
			} : e);
			let d = new Map(this.tabs.map((e) => [e.id, e])), f = l.map((e) => d.get(e)).filter((e) => !!e), p = !1;
			return this.tabs = this.tabs.flatMap((e) => e.groupId === o ? p ? [] : (p = !0, f) : [e]), !0;
		},
		moveTabToGroup(e, t) {
			let n = this.tabs.find((t) => t.id === e), r = this.groups.find((e) => e.id === t);
			if (!n || !r) return !1;
			let i = n.groupId;
			if (i === t) return this.setActiveGroupId(t), this.setActiveTabId(e), !0;
			let a = new Map(this.groups.map((e) => [e.id, Yt(e, this.tabs)])), o = a.get(i) ?? [], s = [...(a.get(t) ?? []).filter((t) => t !== e), e];
			return this.tabs = this.tabs.map((n) => n.id === e ? {
				...n,
				groupId: t
			} : n), this.groups = this.groups.map((n) => n.id === i ? {
				...n,
				tabIds: o.filter((t) => t !== e)
			} : n.id === t ? {
				...n,
				tabIds: s
			} : n), this.setActiveGroupId(t), this.setActiveTabId(e), !0;
		}
	}
}), Zt = 2, Qt = (e) => e === "right" ? "horizontal" : "vertical", $t = (e) => e.split("/").at(-1) || e, en = (e, t) => e.find((e) => e.id !== t)?.id ?? e[0]?.id ?? "main", tn = new class {
	split(e, t) {
		let n = Xt(t), r = Qt(e);
		if (n.groups.length >= Zt) {
			let e = en(n.groups.slice(0, Zt), n.activeGroupId);
			return n.setActiveGroupId(e), n.setGroupLayout(r), {
				ok: !0,
				groupId: e,
				maxGroupsReached: !0,
				reused: !0
			};
		}
		let i = `group-${n.groups.length + 1}`;
		return n.setGroups([...n.groups, {
			id: i,
			tabIds: []
		}]), n.setActiveGroupId(i), n.setGroupLayout(r), {
			ok: !0,
			groupId: i
		};
	}
	openDiff(e, t, n) {
		let r = Xt(n), i = r.activeGroupId, a = `diff:${e}:${t}`, o = r.tabs.find((e) => e.id === a);
		if (o) return r.setActiveTabId(o.id), r.setActiveGroupId(o.groupId), {
			ok: !0,
			tabId: a
		};
		let s = {
			id: a,
			path: t,
			title: `${$t(e)} ↔ ${$t(t)}`,
			language: "diff",
			dirty: !1,
			groupId: i,
			kind: "diff",
			originalPath: e,
			modifiedPath: t
		};
		return r.setTabs([...r.tabs, s]), r.setGroups(r.groups.map((e) => e.id === i ? {
			...e,
			tabIds: [...e.tabIds, a]
		} : e)), r.setActiveTabId(a), {
			ok: !0,
			tabId: a
		};
	}
	openMarkdownPreview(e, t) {
		let n = Xt(t), r = n.activeGroupId, i = `preview:${e}`, a = n.tabs.find((e) => e.id === i);
		if (a) return n.setActiveTabId(a.id), n.setActiveGroupId(a.groupId), {
			ok: !0,
			tabId: i
		};
		let o = {
			id: i,
			path: e,
			title: `Preview ${$t(e)}`,
			language: "markdown",
			dirty: !1,
			groupId: r,
			kind: "markdown-preview",
			previewPath: e
		};
		return n.setTabs([...n.tabs, o]), n.setGroups(n.groups.map((e) => e.id === r ? {
			...e,
			tabIds: [...e.tabIds, i]
		} : e)), n.setActiveTabId(i), {
			ok: !0,
			tabId: i
		};
	}
}();
//#endregion
//#region ../../node_modules/.pnpm/@panzoom+panzoom@4.6.2/node_modules/@panzoom/panzoom/dist/panzoom.es.js
typeof window < "u" && (window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach), typeof window.CustomEvent != "function" && (window.CustomEvent = function(e, t) {
	t ||= {
		bubbles: !1,
		cancelable: !1,
		detail: null
	};
	var n = document.createEvent("CustomEvent");
	return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
}));
var nn = typeof document < "u" && !!document.documentMode, rn;
function an() {
	return rn ||= document.createElement("div").style;
}
var on = [
	"webkit",
	"moz",
	"ms"
], sn = {};
function cn(e) {
	if (sn[e]) return sn[e];
	let t = an();
	if (e in t) return sn[e] = e;
	let n = e[0].toUpperCase() + e.slice(1), r = on.length;
	for (; r--;) {
		let i = `${on[r]}${n}`;
		if (i in t) return sn[e] = i;
	}
}
function ln(e, t) {
	return parseFloat(t[cn(e)]) || 0;
}
function un(e, t, n = window.getComputedStyle(e)) {
	let r = t === "border" ? "Width" : "";
	return {
		left: ln(`${t}Left${r}`, n),
		right: ln(`${t}Right${r}`, n),
		top: ln(`${t}Top${r}`, n),
		bottom: ln(`${t}Bottom${r}`, n)
	};
}
function dn(e, t, n) {
	e.style[cn(t)] = n;
}
function fn(e, t) {
	dn(e, "transition", `${cn("transform")} ${t.duration}ms ${t.easing}`);
}
function pn(e, { x: t, y: n, scale: r, isSVG: i }, a) {
	if (dn(e, "transform", `scale(${r}) translate(${t}px, ${n}px)`), i && nn) {
		let t = window.getComputedStyle(e).getPropertyValue("transform");
		e.setAttribute("transform", t);
	}
}
function mn(e) {
	let t = e.parentNode;
	(!t || t.nodeType !== 1) && (t = document.documentElement);
	let n = window.getComputedStyle(e), r = window.getComputedStyle(t), i = e.getBoundingClientRect(), a = t.getBoundingClientRect();
	return {
		elem: {
			style: n,
			width: i.width,
			height: i.height,
			top: i.top,
			bottom: i.bottom,
			left: i.left,
			right: i.right,
			margin: un(e, "margin", n),
			border: un(e, "border", n)
		},
		parent: {
			style: r,
			width: a.width,
			height: a.height,
			top: a.top,
			bottom: a.bottom,
			left: a.left,
			right: a.right,
			padding: un(t, "padding", r),
			border: un(t, "border", r)
		}
	};
}
var hn = {
	down: "mousedown",
	move: "mousemove",
	up: "mouseup mouseleave"
};
typeof window < "u" && (typeof window.PointerEvent == "function" ? hn = {
	down: "pointerdown",
	move: "pointermove",
	up: "pointerup pointerleave pointercancel"
} : typeof window.TouchEvent == "function" && (hn = {
	down: "touchstart",
	move: "touchmove",
	up: "touchend touchcancel"
}));
function gn(e, t, n, r) {
	hn[e].split(" ").forEach((e) => {
		t.addEventListener(e, n, r);
	});
}
function _n(e, t, n) {
	hn[e].split(" ").forEach((e) => {
		t.removeEventListener(e, n);
	});
}
function vn(e, t) {
	let n = e.length;
	for (; n--;) if (e[n].pointerId === t.pointerId) return n;
	return -1;
}
function yn(e, t) {
	let n;
	if (t.touches) {
		n = 0;
		for (let r of t.touches) r.pointerId = n++, yn(e, r);
		return;
	}
	n = vn(e, t), n > -1 && e.splice(n, 1), e.push(t);
}
function bn(e, t) {
	if (t.touches) {
		for (; e.length;) e.pop();
		return;
	}
	let n = vn(e, t);
	n > -1 && e.splice(n, 1);
}
function xn(e) {
	e = e.slice(0);
	let t = e.pop(), n;
	for (; n = e.pop();) t = {
		clientX: (n.clientX - t.clientX) / 2 + t.clientX,
		clientY: (n.clientY - t.clientY) / 2 + t.clientY
	};
	return t;
}
function Sn(e) {
	if (e.length < 2) return 0;
	let t = e[0], n = e[1];
	return Math.sqrt(Math.abs(n.clientX - t.clientX) ** 2 + Math.abs(n.clientY - t.clientY) ** 2);
}
function Cn(e) {
	let t = e;
	for (; t && t.parentNode;) {
		if (t.parentNode === document) return !0;
		t = t.parentNode instanceof ShadowRoot ? t.parentNode.host : t.parentNode;
	}
	return !1;
}
function wn(e) {
	return (e.getAttribute("class") || "").trim();
}
function Tn(e, t) {
	return e.nodeType === 1 && ` ${wn(e)} `.indexOf(` ${t} `) > -1;
}
function En(e, t) {
	for (let n = e; n != null; n = n.parentNode) if (Tn(n, t.excludeClass) || t.exclude.indexOf(n) > -1) return !0;
	return !1;
}
var Dn = /^http:[\w\.\/]+svg$/;
function On(e) {
	return Dn.test(e.namespaceURI) && e.nodeName.toLowerCase() !== "svg";
}
function kn(e) {
	let t = {};
	for (let n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
	return t;
}
var An = {
	animate: !1,
	canvas: !1,
	cursor: "move",
	disablePan: !1,
	disableZoom: !1,
	disableXAxis: !1,
	disableYAxis: !1,
	duration: 200,
	easing: "ease-in-out",
	exclude: [],
	excludeClass: "panzoom-exclude",
	handleStartEvent: (e) => {
		e.preventDefault(), e.stopPropagation();
	},
	maxScale: 4,
	minScale: .125,
	overflow: "hidden",
	panOnlyWhenZoomed: !1,
	pinchAndPan: !1,
	relative: !1,
	setTransform: pn,
	startX: 0,
	startY: 0,
	startScale: 1,
	step: .3,
	touchAction: "none"
};
function jn(e, t) {
	if (!e) throw Error("Panzoom requires an element as an argument");
	if (e.nodeType !== 1) throw Error("Panzoom requires an element with a nodeType of 1");
	if (!Cn(e)) throw Error("Panzoom should be called on elements that have been attached to the DOM");
	t = {
		...An,
		...t
	};
	let n = On(e), r = e.parentNode;
	r.style.overflow = t.overflow, r.style.userSelect = "none", r.style.touchAction = t.touchAction, (t.canvas ? r : e).style.cursor = t.cursor, e.style.userSelect = "none", e.style.touchAction = t.touchAction, dn(e, "transformOrigin", typeof t.origin == "string" ? t.origin : n ? "0 0" : "50% 50%");
	function i() {
		r.style.overflow = "", r.style.userSelect = "", r.style.touchAction = "", r.style.cursor = "", e.style.cursor = "", e.style.userSelect = "", e.style.touchAction = "", dn(e, "transformOrigin", "");
	}
	function a(n = {}) {
		for (let e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
		(n.hasOwnProperty("cursor") || n.hasOwnProperty("canvas")) && (r.style.cursor = e.style.cursor = "", (t.canvas ? r : e).style.cursor = t.cursor), n.hasOwnProperty("overflow") && (r.style.overflow = n.overflow), n.hasOwnProperty("touchAction") && (r.style.touchAction = n.touchAction, e.style.touchAction = n.touchAction);
	}
	let o = 0, s = 0, c = 1, l = !1;
	h(t.startScale, {
		animate: !1,
		force: !0
	}), setTimeout(() => {
		m(t.startX, t.startY, {
			animate: !1,
			force: !0
		});
	});
	function u(t, n, r) {
		if (r.silent) return;
		let i = new CustomEvent(t, { detail: n });
		e.dispatchEvent(i);
	}
	function d(t, r, i) {
		let a = {
			x: o,
			y: s,
			scale: c,
			isSVG: n,
			originalEvent: i
		};
		return requestAnimationFrame(() => {
			typeof r.animate == "boolean" && (r.animate ? fn(e, r) : dn(e, "transition", "none")), r.setTransform(e, a, r), u(t, a, r), u("panzoomchange", a, r);
		}), a;
	}
	function f(n, r, i, a) {
		let l = {
			...t,
			...a
		}, u = {
			x: o,
			y: s,
			opts: l
		};
		if (!a?.force && (l.disablePan || l.panOnlyWhenZoomed && c === l.startScale)) return u;
		if (n = parseFloat(n), r = parseFloat(r), l.disableXAxis || (u.x = (l.relative ? o : 0) + n), l.disableYAxis || (u.y = (l.relative ? s : 0) + r), l.contain) {
			let t = mn(e), n = t.elem.width / c, r = t.elem.height / c, a = n * i, o = r * i, s = (a - n) / 2, d = (o - r) / 2;
			if (l.contain === "inside") {
				let e = (-t.elem.margin.left - t.parent.padding.left + s) / i, n = (t.parent.width - a - t.parent.padding.left - t.elem.margin.left - t.parent.border.left - t.parent.border.right + s) / i;
				u.x = Math.max(Math.min(u.x, n), e);
				let r = (-t.elem.margin.top - t.parent.padding.top + d) / i, c = (t.parent.height - o - t.parent.padding.top - t.elem.margin.top - t.parent.border.top - t.parent.border.bottom + d) / i;
				u.y = Math.max(Math.min(u.y, c), r);
			} else if (l.contain === "outside") {
				let e = (-(a - t.parent.width) - t.parent.padding.left - t.parent.border.left - t.parent.border.right + s) / i, n = (s - t.parent.padding.left) / i;
				u.x = Math.max(Math.min(u.x, n), e);
				let r = (-(o - t.parent.height) - t.parent.padding.top - t.parent.border.top - t.parent.border.bottom + d) / i, c = (d - t.parent.padding.top) / i;
				u.y = Math.max(Math.min(u.y, c), r);
			}
		}
		return l.roundPixels && (u.x = Math.round(u.x), u.y = Math.round(u.y)), u;
	}
	function p(n, r) {
		let i = {
			...t,
			...r
		}, a = {
			scale: c,
			opts: i
		};
		if (!r?.force && i.disableZoom) return a;
		let o = t.minScale, s = t.maxScale;
		if (i.contain) {
			let n = mn(e), r = n.elem.width / c, i = n.elem.height / c;
			if (r > 1 && i > 1) {
				let e = n.parent.width - n.parent.border.left - n.parent.border.right, a = n.parent.height - n.parent.border.top - n.parent.border.bottom, c = e / r, l = a / i;
				t.contain === "inside" ? s = Math.min(s, c, l) : t.contain === "outside" && (o = Math.max(o, c, l));
			}
		}
		return a.scale = Math.min(Math.max(n, o), s), a;
	}
	function m(e, t, r, i) {
		let a = f(e, t, c, r);
		return o !== a.x || s !== a.y ? (o = a.x, s = a.y, d("panzoompan", a.opts, i)) : {
			x: o,
			y: s,
			scale: c,
			isSVG: n,
			originalEvent: i
		};
	}
	function h(e, t, n) {
		let r = p(e, t), i = r.opts;
		if (!t?.force && i.disableZoom) return;
		e = r.scale;
		let a = o, l = s;
		if (i.focal) {
			let t = i.focal;
			a = (t.x / e - t.x / c + o * e) / e, l = (t.y / e - t.y / c + s * e) / e;
		}
		let u = f(a, l, e, {
			relative: !1,
			force: !0
		});
		return o = u.x, s = u.y, c = e, d("panzoomzoom", i, n);
	}
	function g(e, n) {
		let r = {
			...t,
			animate: !0,
			...n
		};
		return h(c * Math.exp((e ? 1 : -1) * r.step), r);
	}
	function _(e) {
		return g(!0, e);
	}
	function v(e) {
		return g(!1, e);
	}
	function y(t, r, i, a) {
		let o = mn(e), s = {
			width: o.parent.width - o.parent.padding.left - o.parent.padding.right - o.parent.border.left - o.parent.border.right,
			height: o.parent.height - o.parent.padding.top - o.parent.padding.bottom - o.parent.border.top - o.parent.border.bottom
		}, l = r.clientX - o.parent.left - o.parent.padding.left - o.parent.border.left - o.elem.margin.left, u = r.clientY - o.parent.top - o.parent.padding.top - o.parent.border.top - o.elem.margin.top;
		n || (l -= o.elem.width / c / 2, u -= o.elem.height / c / 2);
		let d = {
			x: l / s.width * (s.width * t),
			y: u / s.height * (s.height * t)
		};
		return h(t, {
			...i,
			animate: !1,
			focal: d
		}, a);
	}
	function b(e, n) {
		e.preventDefault();
		let r = {
			...t,
			...n,
			animate: !1
		}, i = (e.deltaY === 0 && e.deltaX ? e.deltaX : e.deltaY) < 0 ? 1 : -1, a = p(c * Math.exp(i * r.step / 3), r).scale;
		return y(a, e, r, e);
	}
	function x(e) {
		let n = {
			...t,
			animate: !0,
			force: !0,
			...e
		};
		c = p(n.startScale, n).scale;
		let r = f(n.startX, n.startY, c, n);
		return o = r.x, s = r.y, d("panzoomreset", n);
	}
	let S, C, w, T, E, D, O = [];
	function k(e) {
		if (En(e.target, t)) return;
		yn(O, e), l = !0, t.handleStartEvent(e), S = o, C = s, u("panzoomstart", {
			x: o,
			y: s,
			scale: c,
			isSVG: n,
			originalEvent: e
		}, t);
		let r = xn(O);
		w = r.clientX, T = r.clientY, E = c, D = Sn(O);
	}
	function A(e) {
		if (!l || S === void 0 || C === void 0 || w === void 0 || T === void 0) return;
		yn(O, e);
		let n = xn(O), r = O.length > 1, i = c;
		r && (D === 0 && (D = Sn(O)), i = p((Sn(O) - D) * t.step / 80 + E).scale, y(i, n, { animate: !1 }, e)), (!r || t.pinchAndPan) && m(S + (n.clientX - w) / i, C + (n.clientY - T) / i, { animate: !1 }, e);
	}
	function j(e) {
		O.length === 1 && u("panzoomend", {
			x: o,
			y: s,
			scale: c,
			isSVG: n,
			originalEvent: e
		}, t), bn(O, e), l && (l = !1, S = C = w = T = void 0);
	}
	let M = !1;
	function N() {
		M || (M = !0, gn("down", t.canvas ? r : e, k), gn("move", document, A, { passive: !0 }), gn("up", document, j, { passive: !0 }));
	}
	function P() {
		M = !1, _n("down", t.canvas ? r : e, k), _n("move", document, A), _n("up", document, j);
	}
	return t.noBind || N(), {
		bind: N,
		destroy: P,
		eventNames: hn,
		getPan: () => ({
			x: o,
			y: s
		}),
		getScale: () => c,
		getOptions: () => kn(t),
		handleDown: k,
		handleMove: A,
		handleUp: j,
		pan: m,
		reset: x,
		resetStyle: i,
		setOptions: a,
		setStyle: (t, n) => dn(e, t, n),
		zoom: h,
		zoomIn: _,
		zoomOut: v,
		zoomToPoint: y,
		zoomWithWheel: b
	};
}
jn.defaultOptions = An;
//#endregion
//#region src/features/image-preview/services/imagePreviewService.ts
var Mn = {
	avif: "image/avif",
	bmp: "image/bmp",
	gif: "image/gif",
	ico: "image/x-icon",
	jpeg: "image/jpeg",
	jpg: "image/jpeg",
	png: "image/png",
	svg: "image/svg+xml",
	webp: "image/webp"
}, Nn = (e) => {
	let t = e.split(/[?#]/)[0] ?? e, n = t.split(".").at(-1)?.toLowerCase();
	return n && n !== t ? n : "";
}, Pn = (e) => Nn(e) in Mn, Fn = (e) => Nn(e) === "svg", In = (e) => Mn[Nn(e)] ?? null, Ln = (e) => `/download?${new URLSearchParams({ filename: e }).toString()}`, Rn = ["src", "alt"], zn = {
	class: "image-preview__footer-toolbar",
	"data-testid": "image-preview-footer-toolbar",
	"aria-label": "图片预览工具"
}, Bn = { class: "image-preview__meta" }, Vn = ["title"], Hn = {
	key: 0,
	class: "image-preview__info",
	"data-testid": "image-preview-info"
}, Un = {
	class: "image-preview__actions",
	"aria-label": "缩放操作"
}, Wn = ["disabled"], Gn = {
	class: "image-preview__zoom",
	"data-testid": "image-preview-zoom-label"
}, Kn = ["disabled"], qn = {
	key: 0,
	class: "image-preview__state",
	"data-testid": "image-preview-loading"
}, Jn = {
	key: 1,
	class: "image-preview__state image-preview__state--error",
	"data-testid": "image-preview-error"
}, Yn = .05, Xn = 8, Zn = .92, Qn = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "ImagePreview",
	props: { tab: {} },
	setup(e) {
		let r = e, i = n(null), a = n(null), o = n(null), s = n("loading"), c = n({
			width: 0,
			height: 0
		}), l = n(1), u = null, d = null, m = null, h = j(() => Ln(r.tab.path)), _ = j(() => In(r.tab.path)), v = j(() => _.value === "image/svg+xml"), y = j(() => r.tab.title || r.tab.path.split("/").at(-1) || r.tab.path), b = j(() => s.value === "ready"), x = j(() => `${Math.round(l.value * 100)}%`), S = j(() => v.value ? {
			height: "100%",
			width: "100%"
		} : {
			height: c.value.height > 0 ? `${c.value.height}px` : void 0,
			width: c.value.width > 0 ? `${c.value.width}px` : void 0
		}), C = j(() => {
			let e = [];
			return c.value.width > 0 && c.value.height > 0 && e.push(`${c.value.width} x ${c.value.height}`), _.value && e.push(_.value), e.join(" · ");
		}), w = () => {
			l.value = u?.getScale() ?? 1;
		}, T = () => {
			d?.removeEventListener("wheel", L), m?.removeEventListener("panzoomchange", R), m?.removeEventListener("panzoomzoom", R), u?.destroy(), u = null, d = null, m = null;
		}, E = () => {
			let e = i.value, { width: t, height: n } = c.value;
			if (v.value || !e || t <= 0 || n <= 0) return 1;
			let r = e.getBoundingClientRect(), a = r.width || e.clientWidth, o = r.height || e.clientHeight;
			if (a <= 0 || o <= 0) return 1;
			let s = Math.min(1, a * Zn / t, o * Zn / n);
			return Math.min(Xn, Math.max(Yn, s));
		}, O = (e = !0) => {
			if (!u) return;
			let t = E();
			u.zoom(t, {
				animate: e,
				force: !0
			}), u.pan(0, 0, {
				animate: e,
				force: !0
			}), w();
		}, k = async () => {
			await ee(), T();
			let e = i.value, t = a.value;
			!e || !t || s.value !== "ready" || (u = jn(t, {
				canvas: !0,
				cursor: "grab",
				maxScale: Xn,
				minScale: Yn,
				step: .18
			}), d = e, m = t, e.addEventListener("wheel", L, { passive: !1 }), t.addEventListener("panzoomchange", R), t.addEventListener("panzoomzoom", R), O(!1));
		}, A = (e) => {
			c.value = {
				height: e.naturalHeight || e.height || 0,
				width: e.naturalWidth || e.width || 0
			}, s.value = "ready", k();
		}, M = (e) => {
			A(e.target);
		}, P = async () => {
			await ee();
			let e = o.value;
			!e || s.value !== "loading" || e.complete && e.naturalWidth > 0 && A(e);
		}, F = () => {
			T(), s.value = "error";
		};
		function L(e) {
			u && (e.preventDefault(), u.zoomWithWheel(e), w());
		}
		function R() {
			w();
		}
		let z = () => {
			u?.zoomIn(), w();
		}, B = () => {
			u?.zoomOut(), w();
		};
		return W(() => r.tab.path, () => {
			T(), s.value = "loading", c.value = {
				width: 0,
				height: 0
			}, l.value = 1, P();
		}, { immediate: !0 }), g(T), (e, n) => (f(), I("section", {
			class: t(["image-preview", { "image-preview--svg": v.value }]),
			"data-testid": "image-preview"
		}, [G("div", {
			ref_key: "viewportRef",
			ref: i,
			class: t(["image-preview__viewport", { "image-preview__viewport--error": s.value === "error" }])
		}, [
			G("figure", {
				ref_key: "figureRef",
				ref: a,
				class: "image-preview__figure",
				"data-testid": "image-preview-figure"
			}, [G("img", {
				ref_key: "imageRef",
				ref: o,
				class: "image-preview__image",
				"data-testid": "image-preview-image",
				src: h.value,
				alt: y.value,
				style: p(S.value),
				draggable: "false",
				onLoad: M,
				onError: F
			}, null, 44, Rn)], 512),
			G("div", zn, [G("div", Bn, [
				D(X, {
					name: "file-media",
					decorative: ""
				}),
				G("span", {
					class: "image-preview__title",
					"data-testid": "image-preview-title",
					title: r.tab.path
				}, K(y.value), 9, Vn),
				C.value ? (f(), I("span", Hn, K(C.value), 1)) : N("", !0)
			]), G("div", Un, [
				G("button", {
					class: "image-preview__button",
					type: "button",
					title: "缩小",
					"aria-label": "缩小",
					"data-testid": "image-preview-zoom-out",
					disabled: !b.value,
					onClick: B
				}, [D(X, {
					name: "zoom-out",
					decorative: ""
				})], 8, Wn),
				G("span", Gn, K(x.value), 1),
				G("button", {
					class: "image-preview__button",
					type: "button",
					title: "放大",
					"aria-label": "放大",
					"data-testid": "image-preview-zoom-in",
					disabled: !b.value,
					onClick: z
				}, [D(X, {
					name: "zoom-in",
					decorative: ""
				})], 8, Kn)
			])]),
			s.value === "loading" ? (f(), I("div", qn, [...n[0] ||= [G("div", {
				class: "image-preview__spinner",
				"aria-hidden": "true"
			}, null, -1), G("span", null, "正在加载图片", -1)]])) : s.value === "error" ? (f(), I("div", Jn, [D(X, {
				name: "warning",
				decorative: ""
			}), n[1] ||= G("span", null, "图片加载失败", -1)])) : N("", !0)
		], 2)], 2));
	}
}), [["__scopeId", "data-v-9c60d875"]]), $n = {
	m4v: "video/mp4",
	mov: "video/quicktime",
	mp4: "video/mp4",
	ogg: "video/ogg",
	ogv: "video/ogg",
	webm: "video/webm"
}, er = (e) => {
	let t = e.split(/[?#]/)[0] ?? e, n = t.split(".").at(-1)?.toLowerCase();
	return n && n !== t ? n : "";
}, tr = (e) => er(e) in $n, nr = (e) => $n[er(e)] ?? null, rr = (e) => `/download?${new URLSearchParams({
	filename: e,
	play: "true"
}).toString()}`, ir = {
	class: "video-preview",
	"data-testid": "video-preview"
}, ar = { class: "video-preview__toolbar" }, or = { class: "video-preview__meta" }, sr = ["title"], cr = {
	key: 0,
	class: "video-preview__info",
	"data-testid": "video-preview-info"
}, lr = ["src", "aria-label"], ur = {
	key: 0,
	class: "video-preview__state",
	"data-testid": "video-preview-loading"
}, dr = {
	key: 1,
	class: "video-preview__state video-preview__state--error",
	"data-testid": "video-preview-error"
}, fr = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "VideoPreview",
	props: { tab: {} },
	setup(e) {
		let r = e, i = n("loading"), a = n({
			width: 0,
			height: 0
		}), o = n(0), s = j(() => rr(r.tab.path)), c = j(() => nr(r.tab.path)), l = j(() => r.tab.title || r.tab.path.split("/").at(-1) || r.tab.path), u = j(() => {
			let e = [];
			return a.value.width > 0 && a.value.height > 0 && e.push(`${a.value.width} x ${a.value.height}`), o.value > 0 && e.push(d(o.value)), c.value && e.push(c.value), e.join(" · ");
		}), d = (e) => {
			if (!Number.isFinite(e) || e <= 0) return "";
			let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = String(r).padStart(2, "0"), o = String(i).padStart(2, "0");
			return n > 0 ? `${n}:${a}:${o}` : `${a}:${o}`;
		}, p = (e) => {
			let t = e.target;
			a.value = {
				height: t.videoHeight,
				width: t.videoWidth
			}, o.value = t.duration, i.value = "ready";
		}, m = () => {
			i.value = "error";
		};
		return W(() => r.tab.path, () => {
			i.value = "loading", a.value = {
				width: 0,
				height: 0
			}, o.value = 0;
		}, { immediate: !0 }), (e, n) => (f(), I("section", ir, [G("header", ar, [G("div", or, [
			D(X, {
				name: "file-media",
				decorative: ""
			}),
			G("span", {
				class: "video-preview__title",
				"data-testid": "video-preview-title",
				title: r.tab.path
			}, K(l.value), 9, sr),
			u.value ? (f(), I("span", cr, K(u.value), 1)) : N("", !0)
		])]), G("div", { class: t(["video-preview__viewport", { "video-preview__viewport--error": i.value === "error" }]) }, [G("video", {
			class: t(["video-preview__player", { "video-preview__player--hidden": i.value === "error" }]),
			"data-testid": "video-preview-player",
			src: s.value,
			"aria-label": l.value,
			controls: "",
			controlslist: "nodownload",
			preload: "metadata",
			onLoadedmetadata: p,
			onError: m
		}, " 您的浏览器不支持 video 标签。 ", 42, lr), i.value === "loading" ? (f(), I("div", ur, [...n[0] ||= [G("div", {
			class: "video-preview__spinner",
			"aria-hidden": "true"
		}, null, -1), G("span", null, "正在加载视频", -1)]])) : i.value === "error" ? (f(), I("div", dr, [D(X, {
			name: "warning",
			decorative: ""
		}), n[1] ||= G("span", null, "视频加载失败，当前浏览器可能不支持该视频容器或编码", -1)])) : N("", !0)], 2)]));
	}
}), [["__scopeId", "data-v-14c3d7ad"]]), pr = (e) => e.split("/").at(-1) || e, mr = Lt, hr = (e) => Pn(e.path) ? {
	openInput: {
		...e.groupId ? { groupId: e.groupId } : {},
		path: e.path,
		title: e.title ?? pr(e.path),
		language: "image",
		kind: "image-preview",
		contentStatus: "ready"
	},
	shouldLoadTextContent: !1
} : tr(e.path) ? {
	openInput: {
		...e.groupId ? { groupId: e.groupId } : {},
		path: e.path,
		title: e.title ?? pr(e.path),
		language: "video",
		kind: "video-preview",
		contentStatus: "ready"
	},
	shouldLoadTextContent: !1
} : {
	openInput: {
		...e.groupId ? { groupId: e.groupId } : {},
		path: e.path,
		title: e.title ?? pr(e.path),
		language: e.language ?? mr(e.path),
		kind: "text"
	},
	shouldLoadTextContent: !0
}, gr = "application/x-btpanel-editor-tab", _r = [gr, "application/x-btpanel-explorer-file"], vr = (e) => typeof e == "object" && !!e, yr = (e) => Array.from(e?.types ?? []), br = (e) => vr(e) ? e.kind === "tab" && typeof e.tabId == "string" && e.tabId ? {
	kind: "tab",
	tabId: e.tabId
} : e.kind === "file" && typeof e.path == "string" && e.path ? {
	kind: "file",
	path: e.path,
	...typeof e.title == "string" ? { title: e.title } : {},
	...typeof e.language == "string" ? { language: e.language } : {}
} : null : null, xr = (e) => {
	let t = yr(e);
	return t.includes("application/x-btpanel-editor-tab") ? "tab" : t.includes("application/x-btpanel-explorer-file") ? "file" : null;
}, Sr = (e) => {
	if (!e) return null;
	for (let t of _r) {
		let n = e.getData(t);
		if (n) try {
			let e = br(JSON.parse(n));
			if (e) return e;
		} catch {
			return null;
		}
	}
	return null;
}, Cr = (e, t) => {
	e && (e.setData("text/plain", t), e.setData(gr, JSON.stringify({
		kind: "tab",
		tabId: t
	})), e.effectAllowed = "move");
}, wr = new class {
	state = d(null);
	pointerDropHandlers = /* @__PURE__ */ new Set();
	beginDrag(e, t) {
		this.state.value = {
			payload: e,
			...t
		};
	}
	updatePoint(e) {
		let t = this.state.value;
		t && (this.state.value = {
			...t,
			...e
		});
	}
	endDrag() {
		this.state.value = null;
	}
	registerPointerDropHandler(e) {
		return this.pointerDropHandlers.add(e), () => {
			this.pointerDropHandlers.delete(e);
		};
	}
	dispatchPointerDrop(e) {
		let t = this.state.value;
		if (!t) return !1;
		let n = {
			payload: t.payload,
			...e
		};
		for (let e of [...this.pointerDropHandlers].reverse()) if (e(n)) return this.endDrag(), !0;
		return !1;
	}
}(), Tr = nt("contextMenu", {
	state: () => ({
		visible: !1,
		x: 0,
		y: 0,
		items: []
	}),
	actions: {
		open(e) {
			this.visible = !0, this.x = e.x, this.y = e.y, this.items = e.items.map((e) => ({ ...e }));
		},
		close() {
			this.visible = !1, this.items = [];
		}
	}
}), Er = (e) => () => ({ tabId: e }), Dr = (e) => e.modifiedPath ?? e.previewPath ?? e.path, Or = (e) => e.kind !== "settings-view" && e.kind !== "settings-json", kr = (e) => {
	let t = e.orderedTabs.findIndex((t) => t.id === e.tab.id), n = e.tabs.some((t) => t.id !== e.tab.id), r = t >= 0 && t < e.orderedTabs.length - 1, i = e.tabs.some((e) => !e.dirty), a = Dr(e.tab);
	return [
		{
			commandId: "editor.closeTab",
			id: "editor.closeTab",
			label: "关闭",
			payload: Er(e.tab.id)
		},
		{
			commandId: "editor.closeOtherTabs",
			disabled: !n,
			id: "editor.closeOtherTabs",
			label: "关闭其他",
			payload: Er(e.tab.id)
		},
		{
			commandId: "editor.closeTabsToTheRight",
			disabled: !r,
			id: "editor.closeTabsToTheRight",
			label: "关闭右侧标签页",
			payload: Er(e.tab.id)
		},
		{
			id: "divider:editor.closeBulk",
			kind: "divider"
		},
		{
			commandId: "editor.closeSavedTabs",
			disabled: !i,
			id: "editor.closeSavedTabs",
			label: "关闭已保存"
		},
		{
			commandId: "editor.closeAllTabs",
			disabled: e.tabs.length === 0,
			id: "editor.closeAllTabs",
			label: "全部关闭"
		},
		{
			id: "divider:editor.pin",
			kind: "divider"
		},
		{
			commandId: "editor.toggleTabPinned",
			id: "editor.toggleTabPinned",
			label: e.tab.pinned ? "取消固定" : "固定",
			payload: Er(e.tab.id)
		},
		{
			id: "divider:editor.path",
			kind: "divider"
		},
		{
			commandId: "file.copyPath",
			disabled: !Or(e.tab),
			id: "file.copyPath",
			label: "复制路径",
			payload: () => ({ path: a })
		},
		{
			commandId: "file.revealInExplorer",
			disabled: !Or(e.tab),
			id: "file.revealInExplorer",
			label: "在资源管理器中显示",
			payload: () => ({ path: a })
		}
	];
}, Ar = { open(e) {
	Tr().open({
		items: kr(e),
		x: e.event.clientX,
		y: e.event.clientY
	});
} }, jr = nt("settings", {
	state: () => ({
		values: { ...oi },
		version: 1
	}),
	actions: {
		setValue(e, t) {
			this.values[e] = t, this.version += 1;
		},
		replaceValues(e) {
			this.values = { ...e }, this.version += 1;
		}
	}
}), Mr = {
	id: "ide-dark",
	label: "One Dark Pro",
	type: "dark",
	syntaxThemeId: "one-dark-pro",
	workbench: {
		bg: "#282C34",
		fg: "#abb2bf",
		"muted-fg": "#7f8897",
		border: "#3b4048",
		"focus-border": "#5c6370",
		accent: "#8f97a7",
		"titlebar-bg": "#282C34",
		"titlebar-fg": "#abb2bf",
		"titlebar-hover-bg": "#2c313a",
		"activitybar-bg": "#282C34",
		"activitybar-fg": "#8f97a7",
		"activitybar-active-fg": "#d7dae0",
		"activitybar-hover-bg": "#2c313a",
		"activitybar-active-bg": "#5a5d5e4f",
		"sidebar-bg": "#282C34",
		"sidebar-fg": "#abb2bf",
		"sidebar-header-bg": "#21252b",
		"sidebar-header-fg": "#abb2bf",
		"splitter-hover-bg": "#5c6370",
		"editor-bg": "#282c34",
		"editor-fg": "#abb2bf",
		"bottom-panel-bg": "#282c34",
		"terminal-fg": "#abb2bf",
		"terminal-cursor": "#d7dae0",
		"terminal-selection-bg": "#3f4451",
		"panel-bg": "#21252b",
		"panel-fg": "#abb2bf",
		"tab-bg": "#21252b",
		"tab-fg": "#8b93a2",
		"tab-active-bg": "#282c34",
		"tab-active-fg": "#d7dae0",
		"tab-hover-bg": "#2c313a",
		"tab-border": "#3b4048",
		"tab-active-border": "#5c6370",
		"tab-close-hover-bg": "#3a404c",
		"tab-close-hover-fg": "#d7dae0",
		"statusbar-bg": "#2c313a",
		"statusbar-fg": "#d7dae0",
		"statusbar-hover-bg": "#363d49",
		"input-bg": "#282c34",
		"input-fg": "#abb2bf",
		"input-border": "#3b4048",
		"selection-bg": "#3f4451",
		"list-active-bg": "#3f4451",
		"list-hover-bg": "#2c313a",
		"button-bg": "#3a404c",
		"button-fg": "#d7dae0",
		"button-hover-bg": "#3f4451",
		"primary-button-bg": "#4b5563",
		"primary-button-fg": "#1f2329",
		"primary-button-hover-bg": "#5b6472",
		"editor-widget-bg": "#282C34",
		"editor-widget-fg": "#abb2bf",
		"editor-widget-border": "#3b4048",
		"editor-error-fg": "#f48771",
		"editor-warning-fg": "#d19a66",
		"editor-warning-bg": "#d19a6626",
		"editor-success-fg": "#98c379",
		"menu-bg": "#282c34",
		"menu-fg": "#abb2bf",
		"menu-selection-bg": "#3f4451",
		"menu-selection-fg": "#d7dae0",
		"menu-selection-border": "#00000000",
		"menu-border": "#3b4048",
		"menu-separator-bg": "#3b4048",
		"disabled-fg": "#7f889799",
		"widget-mask-bg": "#00000066",
		"widget-shadow": "#0000005c",
		"progress-bg": "#6f7786",
		"scrollbar-slider-bg": "#6f778633",
		"scrollbar-slider-hover-bg": "#8f98a855",
		"scrollbar-slider-active-bg": "#aab2c066",
		"scrollbar-shadow": "#00000000",
		"danger-fg": "#f48771",
		"info-fg": "#aab2bf",
		"warning-fg": "#d19a66",
		"success-fg": "#98c379"
	},
	editor: {
		background: "#282c34",
		foreground: "#abb2bf",
		selectionBackground: "#3f4451",
		cursorForeground: "#c8c8c8"
	},
	syntax: {
		name: "one-dark-pro",
		type: "dark",
		colors: {
			"editor.background": "#282c34",
			"editor.foreground": "#abb2bf",
			"editor.selectionBackground": "#3f4451",
			"editorCursor.foreground": "#c8c8c8",
			"editorLineNumber.foreground": "#636d83",
			"editorLineNumber.activeForeground": "#abb2bf",
			editorLineHighlightBackground: "#2c313c",
			"editorGutter.background": "#282c34",
			"editorWidget.background": "#282C34",
			"editorWidget.border": "#3b4048",
			"widget.shadow": "#0000005c",
			"scrollbarSlider.background": "#6f778633",
			"scrollbarSlider.hoverBackground": "#8f98a855",
			"scrollbarSlider.activeBackground": "#aab2c066",
			"scrollbar.shadow": "#00000000"
		},
		tokenColors: [
			{
				scope: "comment",
				settings: {
					foreground: "#5c6370",
					fontStyle: "italic"
				}
			},
			{
				scope: "string",
				settings: { foreground: "#98c379" }
			},
			{
				scope: "keyword",
				settings: { foreground: "#c678dd" }
			},
			{
				scope: "entity.name.function",
				settings: { foreground: "#aab2bf" }
			},
			{
				scope: "constant.numeric",
				settings: { foreground: "#d19a66" }
			},
			{
				scope: "variable.parameter",
				settings: { foreground: "#e06c75" }
			}
		]
	}
}, Nr = (e) => ({
	id: e.id,
	label: e.label,
	type: e.type,
	colors: e.workbench,
	editor: e.editor
}), Pr = (e) => ({
	...e.syntax,
	name: e.syntax.name,
	type: e.syntax.type
}), Fr = (e) => `shiki-${e.syntaxThemeId}`, Ir = Mr, Lr = Nr(Ir), Rr = {
	id: "ide-light",
	label: "One Light",
	type: "light",
	syntaxThemeId: "one-light",
	workbench: {
		bg: "#f3f3f3",
		fg: "#383a42",
		"muted-fg": "#6f737d",
		border: "#d7dae0",
		"focus-border": "#8c959f",
		accent: "#6f737d",
		"titlebar-bg": "#f3f3f3",
		"titlebar-fg": "#383a42",
		"titlebar-hover-bg": "#e8e8e9",
		"activitybar-bg": "#f3f3f3",
		"activitybar-fg": "#686c75",
		"activitybar-active-fg": "#383a42",
		"activitybar-hover-bg": "#e8e8e9",
		"activitybar-active-bg": "#dfe2e8",
		"sidebar-bg": "#f3f3f3",
		"sidebar-fg": "#383a42",
		"sidebar-header-bg": "#fff",
		"sidebar-header-fg": "#383a42",
		"splitter-hover-bg": "#8c959f",
		"editor-bg": "#fafafa",
		"editor-fg": "#383a42",
		"bottom-panel-bg": "#ffffff",
		"terminal-fg": "#1f2328",
		"terminal-cursor": "#1f2328",
		"terminal-selection-bg": "#c8d0da",
		"panel-bg": "#ffffff",
		"panel-fg": "#383a42",
		"tab-bg": "#f3f3f3",
		"tab-fg": "#5f636d",
		"tab-active-bg": "#fafafa",
		"tab-active-fg": "#383a42",
		"tab-hover-bg": "#e8e8e9",
		"tab-border": "#d7dae0",
		"tab-active-border": "#8c959f",
		"tab-close-hover-bg": "#dfe2e8",
		"tab-close-hover-fg": "#383a42",
		"statusbar-bg": "#e8e8e9",
		"statusbar-fg": "#383a42",
		"statusbar-hover-bg": "#dfe2e8",
		"input-bg": "#ffffff",
		"input-fg": "#383a42",
		"input-border": "#d7dae0",
		"selection-bg": "#d8dee6",
		"list-active-bg": "#d8dee6",
		"list-hover-bg": "#e8e8e9",
		"button-bg": "#e8e8e9",
		"button-fg": "#383a42",
		"button-hover-bg": "#dfe2e8",
		"primary-button-bg": "#6f737d",
		"primary-button-fg": "#ffffff",
		"primary-button-hover-bg": "#5f636d",
		"editor-widget-bg": "#ffffff",
		"editor-widget-fg": "#383a42",
		"editor-widget-border": "#d7dae0",
		"editor-error-fg": "#a1260d",
		"editor-warning-fg": "#986801",
		"editor-warning-bg": "#9868011f",
		"editor-success-fg": "#50a14f",
		"menu-bg": "#ffffff",
		"menu-fg": "#383a42",
		"menu-selection-bg": "#d8dee6",
		"menu-selection-fg": "#383a42",
		"menu-selection-border": "#00000000",
		"menu-border": "#d7dae0",
		"menu-separator-bg": "#d7dae0",
		"disabled-fg": "#6f737d99",
		"widget-mask-bg": "#00000033",
		"widget-shadow": "#00000029",
		"progress-bg": "#8c959f",
		"scrollbar-slider-bg": "#5f636d33",
		"scrollbar-slider-hover-bg": "#5f636d55",
		"scrollbar-slider-active-bg": "#383a4266",
		"scrollbar-shadow": "#00000000",
		"danger-fg": "#a1260d",
		"info-fg": "#6f737d",
		"warning-fg": "#986801",
		"success-fg": "#50a14f"
	},
	editor: {
		background: "#fafafa",
		foreground: "#383a42",
		selectionBackground: "#d8dee6",
		cursorForeground: "#5f636d"
	},
	syntax: {
		name: "one-light",
		type: "light",
		colors: {
			"editor.background": "#fafafa",
			"editor.foreground": "#383a42",
			"editor.selectionBackground": "#d8dee6",
			"editorCursor.foreground": "#5f636d",
			"editorLineNumber.foreground": "#9d9d9f",
			"editorLineNumber.activeForeground": "#383a42",
			editorLineHighlightBackground: "#f0f0f1",
			"editorGutter.background": "#fafafa",
			"editorWidget.background": "#ffffff",
			"editorWidget.border": "#d7dae0",
			"widget.shadow": "#00000029",
			"scrollbarSlider.background": "#5f636d33",
			"scrollbarSlider.hoverBackground": "#5f636d55",
			"scrollbarSlider.activeBackground": "#383a4266",
			"scrollbar.shadow": "#00000000"
		},
		tokenColors: [
			{
				scope: "comment",
				settings: {
					foreground: "#a0a1a7",
					fontStyle: "italic"
				}
			},
			{
				scope: "string",
				settings: { foreground: "#50a14f" }
			},
			{
				scope: "keyword",
				settings: { foreground: "#a626a4" }
			},
			{
				scope: "entity.name.function",
				settings: { foreground: "#5f636d" }
			},
			{
				scope: "constant.numeric",
				settings: { foreground: "#986801" }
			},
			{
				scope: "variable.parameter",
				settings: { foreground: "#e45649" }
			}
		]
	}
}, zr = Nr(Rr), Br = {
	[Fr(Ir)]: Pr(Ir),
	[Fr(Rr)]: Pr(Rr),
	"shiki-vitesse-dark": {
		name: "vitesse-dark",
		type: "dark",
		colors: {
			"editor.background": "#121212",
			"editor.foreground": "#dbd7ca",
			"editor.selectionBackground": "#3f4451",
			"editorCursor.foreground": "#c8c8c8",
			"editorLineNumber.foreground": "#6b6b6b",
			"editorLineNumber.activeForeground": "#c6c6c6",
			"editorGutter.background": "#121212",
			"editorWidget.background": "#1f1f1f",
			"editorWidget.border": "#3a3a3a"
		},
		tokenColors: [
			{
				scope: "comment",
				settings: {
					foreground: "#758575",
					fontStyle: "italic"
				}
			},
			{
				scope: "string",
				settings: { foreground: "#c98a7d" }
			},
			{
				scope: "keyword",
				settings: { foreground: "#cb7676" }
			}
		]
	},
	"shiki-github-light": {
		name: "github-light",
		type: "light",
		colors: {
			"editor.background": "#ffffff",
			"editor.foreground": "#24292f",
			"editor.selectionBackground": "#d8dee6",
			"editorCursor.foreground": "#24292f",
			"editorLineNumber.foreground": "#8c959f",
			"editorLineNumber.activeForeground": "#24292f",
			"editorGutter.background": "#ffffff",
			"editorWidget.background": "#f6f8fa",
			"editorWidget.border": "#d0d7de"
		},
		tokenColors: [
			{
				scope: "comment",
				settings: {
					foreground: "#6e7781",
					fontStyle: "italic"
				}
			},
			{
				scope: "string",
				settings: { foreground: "#0a3069" }
			},
			{
				scope: "keyword",
				settings: { foreground: "#cf222e" }
			}
		]
	}
}, Vr = {
	"ide-dark": `shiki-${ge.dark}`,
	"ide-light": `shiki-${ge.light}`
}, Hr = (e) => Vr[e] ?? Vr["ide-dark"], Ur = (e) => ({
	id: e.id,
	label: e.label,
	type: e.type
}), Wr = new class {
	themes = /* @__PURE__ */ new Map();
	register(e) {
		return this.themes.has(e.id) ? {
			ok: !1,
			error: {
				code: "THEME_ALREADY_REGISTERED",
				message: `Theme "${e.id}" is already registered.`
			}
		} : (this.themes.set(e.id, e), {
			ok: !0,
			themeId: e.id
		});
	}
	get(e) {
		return this.themes.get(e);
	}
	getOrError(e) {
		let t = this.get(e);
		return t ? {
			ok: !0,
			theme: t
		} : {
			ok: !1,
			error: {
				code: "THEME_NOT_FOUND",
				message: `Theme "${e}" is not registered.`
			}
		};
	}
	list() {
		return Array.from(this.themes.values()).map(Ur);
	}
}(), Gr = 0, Kr = (e) => e.replace(/\\/g, "\\\\").replace(/"/g, "\\\""), qr = (e, t, n) => {
	let r = e.getElementById(t);
	if (r instanceof HTMLStyleElement) return r;
	let i = e.createElement("style");
	return i.id = t, i.dataset[n] = "true", e.head.append(i), i;
}, Jr = ({ attributeName: e, defaultSelector: t = ":root", scopePrefix: n, target: r }) => {
	if (r === r.ownerDocument.documentElement) return t;
	let i = r.dataset[e] ?? `${n}-${++Gr}`;
	return r.dataset[e] = i, `[data-${e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`)}="${Kr(i)}"]`;
}, Yr = (e, t) => `${e} {\n${Object.entries(t).map(([e, t]) => `\t${e}: ${t};`).join("\n")}\n}`, Xr = "monaco-editor-shell-theme-tokens", Zr = class {
	constructor(e = document.documentElement) {
		this.target = e;
	}
	apply(e) {
		let t = qr(this.target.ownerDocument, Xr, "ideEditorShellThemeTokens");
		return t.textContent = Yr(Jr({
			attributeName: "ideEditorShellThemeScope",
			scopePrefix: "editor-shell-scope",
			target: this.target
		}), Object.fromEntries(Object.entries(e.editorShellTokens).map(([e, t]) => [`--ide-${e}`, t]))), this.target.dataset.ideSyntaxTheme = e.id, {
			appliedThemeId: e.id,
			appliedVariableCount: Object.keys(e.editorShellTokens).length
		};
	}
}, Qr = (e) => e === "light" ? "vs" : "vs-dark", $r = class {
	registeredThemeIds = /* @__PURE__ */ new Set();
	constructor(e) {
		this.runtime = e;
	}
	apply(e) {
		this.runtime && (this.registeredThemeIds.has(e.monacoThemeId) || (this.runtime.defineTheme(e.monacoThemeId, {
			base: Qr(e.type),
			inherit: !0,
			rules: e.syntaxRules,
			colors: e.monacoColors
		}), this.registeredThemeIds.add(e.monacoThemeId)), this.runtime.setTheme(e.monacoThemeId));
	}
	getRegisteredThemeIds() {
		return [...this.registeredThemeIds];
	}
}, ei = (e) => typeof e == "object" && !!e, ti = (e) => ei(e) ? { themeId: typeof e.themeId == "string" ? e.themeId : void 0 } : {}, ni = (e, t, n) => {
	e.register({
		id: "workbench.action.selectTheme",
		title: "选择颜色主题",
		category: "工作台",
		run: async (e) => {
			let n = ti(e);
			n.themeId && await t.execute("settings.update", {
				key: "workbench.colorTheme",
				value: n.themeId
			});
		}
	}), ft(n).setCommands(e.list());
}, ri = class {
	constructor(e, t, n = document.documentElement, r = {}) {
		this.registry = e, this.tokenService = t, this.target = n, this.options = r;
	}
	applyTheme(e, t = {}) {
		let n = this.registry.getOrError(e);
		if (!n.ok) return n;
		let r = this.tokenService.applyCssVariables(n.theme, this.target), i = 0, a;
		if (this.options.shikiThemeAdapter) {
			let e = t.syntaxTheme ?? (t.syntaxThemeId ? this.options.syntaxThemes?.[t.syntaxThemeId] : void 0), r = this.options.shikiThemeAdapter.resolveEditorPalette(e, n.theme);
			i = this.options.editorShellThemeBridge?.apply(r).appliedVariableCount ?? 0, this.options.monacoThemeBridge?.apply(r), a = r.monacoThemeId;
		}
		return {
			ok: !0,
			themeId: e,
			appliedVariableCount: r.appliedVariableCount + i,
			monacoThemeId: a
		};
	}
}, ii = "monaco-workbench-theme-tokens", ai = new class {
	toCssVariables(e) {
		return Object.fromEntries(Object.entries(e.colors).map(([e, t]) => [`--ide-${e}`, t]));
	}
	toCssText(e, t = ":root") {
		return Yr(t, this.toCssVariables(e));
	}
	applyCssVariables(e, t = document.documentElement) {
		let n = this.toCssVariables(e), r = t.ownerDocument, i = Jr({
			attributeName: "ideThemeScope",
			scopePrefix: "theme-scope",
			target: t
		}), a = qr(r, ii, "ideThemeTokens");
		return a.textContent = this.toCssText(e, i), t.dataset.ideTheme = e.id, {
			appliedThemeId: e.id,
			appliedVariableCount: Object.keys(n).length
		};
	}
}(), oi = {
	"editor.fontSize": 14,
	"editor.fontFamily": "monospace",
	"editor.lineHeight": 20,
	"editor.tabSize": 4,
	"editor.insertSpaces": !0,
	"editor.detectIndentation": !0,
	"editor.trimAutoWhitespace": !0,
	"editor.acceptSuggestionOnCommitCharacter": !0,
	"editor.acceptSuggestionOnEnter": "on",
	"editor.suggestFontSize": 0,
	"editor.suggestLineHeight": 0,
	"editor.suggestOnTriggerCharacters": !1,
	"editor.suggestSelection": "first",
	"editor.tabCompletion": "off",
	"editor.snippetSuggestions": "inline",
	"editor.quickSuggestions": !1,
	"editor.quickSuggestionsDelay": 10,
	"editor.formatOnPaste": !1,
	"editor.formatOnType": !1,
	"editor.inlineCompletionsAccessibilityVerbose": !1,
	"editor.cursorBlinking": "blink",
	"editor.cursorSmoothCaretAnimation": "off",
	"editor.cursorStyle": "line",
	"editor.cursorWidth": 0,
	"editor.roundedSelection": !0,
	"editor.multiCursorLimit": 1e4,
	"editor.multiCursorMergeOverlapping": !0,
	"editor.multiCursorModifier": "alt",
	"editor.multiCursorPaste": "spread",
	"editor.selectionHighlight": !1,
	"editor.columnSelection": !1,
	"editor.emptySelectionClipboard": !0,
	"editor.linkedEditing": !1,
	"editor.lineNumbers": "on",
	"editor.lineNumbersMinChars": 3,
	"editor.renderLineHighlight": "line",
	"editor.renderLineHighlightOnlyWhenFocus": !1,
	"editor.glyphMargin": !0,
	"editor.defaultColorDecorators": "auto",
	"editor.wordWrap": "on",
	"editor.wordWrapColumn": 80,
	"editor.wrappingIndent": "same",
	"editor.wrappingStrategy": "simple",
	"editor.wordBreak": "normal",
	"editor.useTabStops": !0,
	"editor.minimap.enabled": !1,
	"editor.minimap.autohide": !1,
	"editor.minimap.size": "proportional",
	"editor.minimap.side": "right",
	"editor.minimap.showSlider": "mouseover",
	"editor.minimap.renderCharacters": !0,
	"editor.minimap.maxColumn": 120,
	"editor.minimap.scale": 1,
	"editor.renderWhitespace": "selection",
	"editor.renderControlCharacters": !1,
	"editor.renderFinalNewline": "on",
	"editor.trimWhitespaceOnDelete": !0,
	"editor.unusualLineTerminators": "prompt",
	"editor.experimentalWhitespaceRendering": "off",
	"editor.scrollBeyondLastLine": !1,
	"editor.scrollBeyondLastColumn": 5,
	"editor.smoothScrolling": !1,
	"editor.inertialScroll": !1,
	"editor.mouseWheelScrollSensitivity": 1,
	"editor.mouseWheelZoom": !1,
	"editor.fastScrollSensitivity": 5,
	"editor.scrollPredominantAxis": !0,
	"editor.scrollOnMiddleClick": !0,
	"editor.revealHorizontalRightPadding": 30,
	"editor.mouseStyle": "text",
	"editor.scrollbar.vertical": "auto",
	"editor.scrollbar.horizontal": "auto",
	"editor.scrollbar.verticalScrollbarSize": 14,
	"editor.scrollbar.horizontalScrollbarSize": 12,
	"editor.scrollbar.useShadows": !0,
	"editor.scrollbar.scrollByPage": !1,
	"editor.folding": !1,
	"editor.foldingHighlight": !0,
	"editor.foldingImportsByDefault": !1,
	"editor.foldingMaximumRegions": 5e3,
	"editor.foldingStrategy": "auto",
	"editor.showFoldingControls": "mouseover",
	"editor.unfoldOnClickAfterEndOfLine": !1,
	"editor.find.loop": !0,
	"editor.find.seedSearchStringFromSelection": "always",
	"editor.find.autoCloseAfterNonMatch": !1,
	"editor.find.addExtraSpaceOnTop": !0,
	"editor.matchBrackets": "always",
	"editor.occurrencesHighlight": "off",
	"editor.occurrencesHighlightDelay": 250,
	"editor.copyWithSyntaxHighlighting": !0,
	"editor.codeLens": !1,
	"editor.colorDecorators": !0,
	"editor.colorDecoratorsActivatedOn": "clickAndHover",
	"editor.colorDecoratorsLimit": 500,
	"editor.guides.enabled": !0,
	"editor.guides.highlightActiveIndentation": !0,
	"editor.guides.highlightActiveBracketPair": !0,
	"editor.guides.bracketPairs": !1,
	"editor.guides.bracketPairsHorizontal": !1,
	"editor.bracketPairColorization.enabled": !0,
	"editor.bracketPairColorization.independentColorPoolPerBracketType": !1,
	"editor.hover.enabled": !1,
	"editor.hover.delay": 300,
	"editor.hover.sticky": !0,
	"editor.hover.hidingDelay": 300,
	"editor.inlayHints.enabled": "off",
	"editor.inlayHints.fontSize": 0,
	"editor.inlayHints.padding": !1,
	"editor.inlineSuggest.enabled": !1,
	"editor.inlineSuggest.showToolbar": "onHover",
	"editor.inlineSuggest.mode": "subword",
	"editor.stickyScroll.enabled": !1,
	"editor.stickyScroll.maxLineCount": 5,
	"editor.lightbulb.enabled": !0,
	"editor.comments.insertSpace": !0,
	"editor.comments.ignoreEmptyLines": !0,
	"editor.autoClosingBrackets": "languageDefined",
	"editor.autoClosingComments": "languageDefined",
	"editor.autoClosingQuotes": "languageDefined",
	"editor.autoSurround": "languageDefined",
	"editor.dragAndDrop": !1,
	"editor.autoIndent": "full",
	"editor.autoIndentOnPaste": !0,
	"editor.autoIndentOnPasteWithinString": !1,
	"editor.accessibilitySupport": "auto",
	"editor.accessibilityPageSize": 10,
	"editor.renderRichScreenReaderContent": !0,
	"editor.readOnly": !1,
	"editor.domReadOnly": !1,
	"editor.renameOnType": !0,
	"editor.renderValidationDecorations": "off",
	"editor.stopRenderingLineAfter": 1e4,
	"editor.experimentalGpuAcceleration": "off",
	"editor.definitionLinkOpensInPeek": !1,
	"editor.peekWidgetDefaultFocus": "tree",
	"editor.contextmenu": !0,
	"editor.links": !0,
	"editor.selectOnLineNumbers": !0,
	"editor.automaticLayout": !1,
	"editor.tabFocusMode": !1,
	"editor.showDeprecated": !0,
	"editor.showUnused": !0,
	"editor.overviewRulerBorder": !0,
	"editor.overviewRulerLanes": 3,
	"editor.maxTokenizationLineLength": 1e3,
	"files.autoSave": "off",
	"workbench.colorTheme": "ide-dark",
	"workbench.editorTheme": "auto",
	"workbench.breadcrumbs.enabled": !0,
	"workbench.statusBar.visible": !0,
	"workbench.statusBar.problems.visible": !0,
	"workbench.statusBar.cursor.visible": !0,
	"workbench.statusBar.indentation.visible": !0,
	"workbench.statusBar.encoding.visible": !0,
	"workbench.statusBar.language.visible": !0,
	"workbench.statusBar.eol.visible": !0
}, Q = (e) => ({
	category: "编辑器",
	defaultValue: oi[e.key],
	...e
}), si = (...e) => e.map(([e, t]) => ({
	label: e,
	value: t
})), ci = [{
	label: "跟随界面主题",
	value: "auto"
}, ..._e.map((e) => ({
	label: `${e.label} · ${e.tone === "dark" ? "深色" : "浅色"}`,
	value: `shiki-${e.id}`
}))], li = [
	Q({
		key: "editor.fontSize",
		title: "字号",
		description: "控制编辑器正文、Diff 编辑器和设置 JSON 标签页的基础字号。",
		subcategory: "基础与缩进",
		type: "number",
		min: 10,
		max: 32
	}),
	Q({
		key: "editor.fontFamily",
		title: "字体",
		description: "控制编辑器正文使用的字体，默认使用浏览器 monospace 字体。",
		subcategory: "基础与缩进",
		type: "string"
	}),
	Q({
		key: "editor.lineHeight",
		title: "行高",
		description: "控制代码行垂直间距，设置为 0 时会回退到 Monaco 默认行高。",
		subcategory: "基础与缩进",
		type: "number",
		min: 0,
		max: 48
	}),
	Q({
		key: "editor.tabSize",
		title: "Tab 大小",
		description: "控制一个 Tab 等于几个空格。",
		subcategory: "基础与缩进",
		type: "number",
		min: 1,
		max: 8
	}),
	Q({
		key: "editor.insertSpaces",
		title: "使用空格缩进",
		description: "开启后按 Tab 会插入空格。",
		subcategory: "基础与缩进",
		type: "boolean"
	}),
	Q({
		key: "editor.detectIndentation",
		title: "检测缩进",
		description: "打开文件时自动根据内容检测 Tab 大小和空格缩进风格。",
		subcategory: "基础与缩进",
		type: "boolean"
	}),
	Q({
		key: "editor.trimAutoWhitespace",
		title: "清理自动空白",
		description: "自动删除编辑器插入的行尾空白。",
		subcategory: "基础与缩进",
		type: "boolean"
	}),
	Q({
		key: "editor.acceptSuggestionOnCommitCharacter",
		title: "提交字符接受建议",
		description: "输入提交字符时接受当前建议项。",
		subcategory: "建议与补全",
		type: "boolean"
	}),
	Q({
		key: "editor.acceptSuggestionOnEnter",
		title: "回车接受建议",
		description: "控制回车键接受建议的方式。",
		subcategory: "建议与补全",
		type: "enum",
		options: si(["关闭", "off"], ["开启", "on"], ["智能", "smart"])
	}),
	Q({
		key: "editor.suggestFontSize",
		title: "建议字号",
		description: "控制建议列表的字体大小，0 表示跟随编辑器字号。",
		subcategory: "建议与补全",
		type: "number",
		min: 0,
		max: 32
	}),
	Q({
		key: "editor.suggestLineHeight",
		title: "建议行高",
		description: "控制建议列表的行高，0 表示使用默认行高。",
		subcategory: "建议与补全",
		type: "number",
		min: 0,
		max: 48
	}),
	Q({
		key: "editor.suggestOnTriggerCharacters",
		title: "触发字符建议",
		description: "输入触发字符时自动显示建议列表。",
		subcategory: "建议与补全",
		type: "boolean"
	}),
	Q({
		key: "editor.suggestSelection",
		title: "建议选中策略",
		description: "控制建议列表默认选中哪一项。",
		subcategory: "建议与补全",
		type: "enum",
		options: si(["首项", "first"], ["最近使用", "recentlyUsed"], ["按前缀最近使用", "recentlyUsedByPrefix"])
	}),
	Q({
		key: "editor.tabCompletion",
		title: "Tab 补全",
		description: "控制 Tab 键补全建议或代码片段的行为。",
		subcategory: "建议与补全",
		type: "enum",
		options: si(["关闭", "off"], ["开启", "on"], ["仅代码片段", "onlySnippets"])
	}),
	Q({
		key: "editor.snippetSuggestions",
		title: "代码片段排序",
		description: "控制代码片段建议在建议列表中的展示位置。",
		subcategory: "建议与补全",
		type: "enum",
		options: si(["不显示", "none"], ["置顶", "top"], ["置底", "bottom"], ["内联", "inline"])
	}),
	Q({
		key: "editor.quickSuggestions",
		title: "快速建议",
		description: "输入时自动弹出建议列表。",
		subcategory: "建议与补全",
		type: "boolean"
	}),
	Q({
		key: "editor.quickSuggestionsDelay",
		title: "快速建议延迟",
		description: "输入后显示快速建议的延迟毫秒数。",
		subcategory: "建议与补全",
		type: "number",
		min: 0,
		max: 2e3
	}),
	Q({
		key: "editor.formatOnPaste",
		title: "粘贴时格式化",
		description: "粘贴内容后自动格式化。",
		subcategory: "建议与补全",
		type: "boolean"
	}),
	Q({
		key: "editor.formatOnType",
		title: "输入时格式化",
		description: "输入触发字符时自动格式化当前内容。",
		subcategory: "建议与补全",
		type: "boolean"
	}),
	Q({
		key: "editor.inlineCompletionsAccessibilityVerbose",
		title: "内联补全无障碍播报",
		description: "为内联补全提供更详细的屏幕阅读器播报。",
		subcategory: "建议与补全",
		type: "boolean"
	}),
	Q({
		key: "editor.cursorBlinking",
		title: "光标闪烁",
		description: "控制光标闪烁动画样式。",
		subcategory: "光标与选择",
		type: "enum",
		options: si(["闪烁", "blink"], ["平滑", "smooth"], ["相位", "phase"], ["扩展", "expand"], ["实心", "solid"])
	}),
	Q({
		key: "editor.cursorSmoothCaretAnimation",
		title: "光标平滑动画",
		description: "控制光标移动时是否使用平滑动画。",
		subcategory: "光标与选择",
		type: "enum",
		options: si(["关闭", "off"], ["开启", "on"], ["显式", "explicit"])
	}),
	Q({
		key: "editor.cursorStyle",
		title: "光标样式",
		description: "控制编辑器光标的形状。",
		subcategory: "光标与选择",
		type: "enum",
		options: si(["竖线", "line"], ["块", "block"], ["下划线", "underline"], ["细竖线", "line-thin"], ["空心块", "block-outline"], ["细下划线", "underline-thin"])
	}),
	Q({
		key: "editor.cursorWidth",
		title: "光标宽度",
		description: "控制竖线光标宽度。",
		subcategory: "光标与选择",
		type: "number",
		min: 0,
		max: 10
	}),
	Q({
		key: "editor.roundedSelection",
		title: "圆角选择区域",
		description: "控制选择区域是否使用圆角。",
		subcategory: "光标与选择",
		type: "boolean"
	}),
	Q({
		key: "editor.multiCursorLimit",
		title: "多光标上限",
		description: "限制同时存在的多光标数量。",
		subcategory: "光标与选择",
		type: "number",
		min: 1,
		max: 5e4
	}),
	Q({
		key: "editor.multiCursorMergeOverlapping",
		title: "合并重叠多光标",
		description: "当多个光标重叠时自动合并。",
		subcategory: "光标与选择",
		type: "boolean"
	}),
	Q({
		key: "editor.multiCursorModifier",
		title: "多光标修饰键",
		description: "控制添加多光标使用的修饰键。",
		subcategory: "光标与选择",
		type: "enum",
		options: si(["Alt", "alt"], ["Ctrl/Cmd", "ctrlCmd"])
	}),
	Q({
		key: "editor.multiCursorPaste",
		title: "多光标粘贴",
		description: "控制多光标粘贴时内容如何分发。",
		subcategory: "光标与选择",
		type: "enum",
		options: si(["分散", "spread"], ["完整粘贴", "full"])
	}),
	Q({
		key: "editor.selectionHighlight",
		title: "选择高亮",
		description: "高亮当前选中内容的其他匹配位置。",
		subcategory: "光标与选择",
		type: "boolean"
	}),
	Q({
		key: "editor.columnSelection",
		title: "列选择模式",
		description: "启用列选择编辑模式。",
		subcategory: "光标与选择",
		type: "boolean"
	}),
	Q({
		key: "editor.emptySelectionClipboard",
		title: "空选择复制当前行",
		description: "没有选择内容时复制当前行。",
		subcategory: "光标与选择",
		type: "boolean"
	}),
	Q({
		key: "editor.linkedEditing",
		title: "链接编辑",
		description: "同步编辑 HTML 标签等成对结构。",
		subcategory: "光标与选择",
		type: "boolean"
	}),
	Q({
		key: "editor.lineNumbers",
		title: "行号",
		description: "控制行号显示方式。",
		subcategory: "行号与外观",
		type: "enum",
		options: si(["开启", "on"], ["关闭", "off"], ["相对", "relative"], ["间隔", "interval"])
	}),
	Q({
		key: "editor.lineNumbersMinChars",
		title: "行号最小宽度",
		description: "控制行号区域的最小字符宽度。",
		subcategory: "行号与外观",
		type: "number",
		min: 1,
		max: 12
	}),
	Q({
		key: "editor.renderLineHighlight",
		title: "当前行高亮",
		description: "控制当前行高亮范围。",
		subcategory: "行号与外观",
		type: "enum",
		options: si(["整行", "all"], ["行内容", "line"], ["无", "none"], ["行号区", "gutter"])
	}),
	Q({
		key: "editor.renderLineHighlightOnlyWhenFocus",
		title: "聚焦时高亮当前行",
		description: "仅在编辑器获得焦点时显示当前行高亮。",
		subcategory: "行号与外观",
		type: "boolean"
	}),
	Q({
		key: "editor.glyphMargin",
		title: "字形边距",
		description: "显示断点、装饰等图标区域。",
		subcategory: "行号与外观",
		type: "boolean"
	}),
	Q({
		key: "editor.defaultColorDecorators",
		title: "默认颜色装饰器",
		description: "控制默认颜色装饰器显示策略。",
		subcategory: "行号与外观",
		type: "enum",
		options: si(["自动", "auto"], ["总是", "always"], ["从不", "never"])
	}),
	Q({
		key: "editor.wordWrap",
		title: "自动换行",
		description: "控制长行是否在视口内自动折行。",
		subcategory: "空白字符与换行",
		type: "enum",
		options: si(["关闭", "off"], ["开启", "on"], ["固定列", "wordWrapColumn"], ["视口与固定列", "bounded"])
	}),
	Q({
		key: "editor.wordWrapColumn",
		title: "自动换行列",
		description: "当自动换行使用固定列时的列号。",
		subcategory: "空白字符与换行",
		type: "number",
		min: 20,
		max: 300
	}),
	Q({
		key: "editor.wrappingIndent",
		title: "换行缩进",
		description: "控制折行后的缩进方式。",
		subcategory: "空白字符与换行",
		type: "enum",
		options: si(["无", "none"], ["同级", "same"], ["缩进", "indent"], ["深缩进", "deepIndent"])
	}),
	Q({
		key: "editor.wrappingStrategy",
		title: "换行策略",
		description: "控制折行算法。",
		subcategory: "空白字符与换行",
		type: "enum",
		options: si(["简单", "simple"], ["高级", "advanced"])
	}),
	Q({
		key: "editor.wordBreak",
		title: "单词断行",
		description: "控制 CJK 等文字的断行方式。",
		subcategory: "空白字符与换行",
		type: "enum",
		options: si(["正常", "normal"], ["保持全部", "keepAll"])
	}),
	Q({
		key: "editor.useTabStops",
		title: "使用 Tab 停止位",
		description: "退格时按 Tab 停止位删除空白。",
		subcategory: "空白字符与换行",
		type: "boolean"
	}),
	Q({
		key: "editor.minimap.enabled",
		title: "缩略图",
		description: "控制编辑器右侧代码缩略图是否显示。",
		subcategory: "缩略图",
		type: "boolean"
	}),
	Q({
		key: "editor.minimap.autohide",
		title: "自动隐藏缩略图",
		description: "仅在鼠标悬停时显示缩略图。",
		subcategory: "缩略图",
		type: "boolean"
	}),
	Q({
		key: "editor.minimap.size",
		title: "缩略图尺寸",
		description: "控制缩略图的宽度计算方式。",
		subcategory: "缩略图",
		type: "enum",
		options: si(["实际内容", "actual"], ["覆盖", "cover"], ["包含", "contain"], ["等比", "proportional"], ["填充", "fill"])
	}),
	Q({
		key: "editor.minimap.side",
		title: "缩略图位置",
		description: "控制缩略图显示在编辑器左侧或右侧。",
		subcategory: "缩略图",
		type: "enum",
		options: si(["右侧", "right"], ["左侧", "left"])
	}),
	Q({
		key: "editor.minimap.showSlider",
		title: "缩略图滑块",
		description: "控制缩略图滑块显示方式。",
		subcategory: "缩略图",
		type: "enum",
		options: si(["总是", "always"], ["悬停", "mouseover"])
	}),
	Q({
		key: "editor.minimap.renderCharacters",
		title: "渲染缩略图字符",
		description: "控制缩略图是否渲染字符形状。",
		subcategory: "缩略图",
		type: "boolean"
	}),
	Q({
		key: "editor.minimap.maxColumn",
		title: "缩略图最大列",
		description: "超过该列数后缩略图会缩放。",
		subcategory: "缩略图",
		type: "number",
		min: 20,
		max: 300
	}),
	Q({
		key: "editor.minimap.scale",
		title: "缩略图比例",
		description: "控制缩略图缩放比例。",
		subcategory: "缩略图",
		type: "number",
		min: 1,
		max: 3
	}),
	Q({
		key: "editor.renderWhitespace",
		title: "空白字符",
		description: "控制空格、Tab 等空白字符的可视化方式。",
		subcategory: "空白字符与换行",
		type: "enum",
		options: si(["不显示", "none"], ["边界位置", "boundary"], ["选区内", "selection"], ["行尾", "trailing"], ["全部", "all"])
	}),
	Q({
		key: "editor.renderControlCharacters",
		title: "控制字符",
		description: "显示控制字符。",
		subcategory: "空白字符与换行",
		type: "boolean"
	}),
	Q({
		key: "editor.renderFinalNewline",
		title: "文件末尾换行",
		description: "控制文件末尾换行符的显示方式。",
		subcategory: "空白字符与换行",
		type: "enum",
		options: si(["关闭", "off"], ["开启", "on"], ["暗淡", "dimmed"])
	}),
	Q({
		key: "editor.trimWhitespaceOnDelete",
		title: "删除时清理空白",
		description: "删除内容时清理自动插入的行尾空白。",
		subcategory: "空白字符与换行",
		type: "boolean"
	}),
	Q({
		key: "editor.unusualLineTerminators",
		title: "异常行终止符",
		description: "控制异常行终止符的处理方式。",
		subcategory: "空白字符与换行",
		type: "enum",
		options: si(["关闭", "off"], ["自动", "auto"], ["提示", "prompt"])
	}),
	Q({
		key: "editor.experimentalWhitespaceRendering",
		title: "空白字符渲染实验",
		description: "控制实验性空白字符渲染方式。",
		subcategory: "空白字符与换行",
		type: "enum",
		options: si(["关闭", "off"], ["SVG", "svg"], ["字体", "font"])
	}),
	Q({
		key: "editor.scrollBeyondLastLine",
		title: "末行后滚动",
		description: "允许滚动到文件最后一行之后。",
		subcategory: "滚动条与滚动",
		type: "boolean"
	}),
	Q({
		key: "editor.scrollBeyondLastColumn",
		title: "末列后滚动",
		description: "允许水平方向滚动到最后一列之后的列数。",
		subcategory: "滚动条与滚动",
		type: "number",
		min: 0,
		max: 100
	}),
	Q({
		key: "editor.smoothScrolling",
		title: "平滑滚动",
		description: "控制编辑器滚动时是否使用平滑动画。",
		subcategory: "滚动条与滚动",
		type: "boolean"
	}),
	Q({
		key: "editor.inertialScroll",
		title: "惯性滚动",
		description: "启用惯性滚动效果。",
		subcategory: "滚动条与滚动",
		type: "boolean"
	}),
	Q({
		key: "editor.mouseWheelScrollSensitivity",
		title: "滚轮灵敏度",
		description: "控制鼠标滚轮滚动灵敏度。",
		subcategory: "滚动条与滚动",
		type: "number",
		min: 0,
		max: 10
	}),
	Q({
		key: "editor.mouseWheelZoom",
		title: "滚轮缩放",
		description: "按住 Ctrl/Cmd 并滚动鼠标滚轮时缩放编辑器字号。",
		subcategory: "滚动条与滚动",
		type: "boolean"
	}),
	Q({
		key: "editor.fastScrollSensitivity",
		title: "快速滚动灵敏度",
		description: "按住 Alt 时的滚动速度倍数。",
		subcategory: "滚动条与滚动",
		type: "number",
		min: 1,
		max: 20
	}),
	Q({
		key: "editor.scrollPredominantAxis",
		title: "主轴优先滚动",
		description: "滚动时优先沿主要方向移动。",
		subcategory: "滚动条与滚动",
		type: "boolean"
	}),
	Q({
		key: "editor.scrollOnMiddleClick",
		title: "中键点击滚动",
		description: "允许通过鼠标中键触发滚动。",
		subcategory: "滚动条与滚动",
		type: "boolean"
	}),
	Q({
		key: "editor.revealHorizontalRightPadding",
		title: "水平揭示右侧填充",
		description: "水平滚动揭示位置时保留的右侧填充。",
		subcategory: "滚动条与滚动",
		type: "number",
		min: 0,
		max: 200
	}),
	Q({
		key: "editor.mouseStyle",
		title: "鼠标样式",
		description: "控制编辑器内容区鼠标样式。",
		subcategory: "滚动条与滚动",
		type: "enum",
		options: si(["文本", "text"], ["默认", "default"], ["复制", "copy"])
	}),
	Q({
		key: "editor.scrollbar.vertical",
		title: "垂直滚动条",
		description: "控制垂直滚动条可见性。",
		subcategory: "滚动条与滚动",
		type: "enum",
		options: si(["自动", "auto"], ["显示", "visible"], ["隐藏", "hidden"])
	}),
	Q({
		key: "editor.scrollbar.horizontal",
		title: "水平滚动条",
		description: "控制水平滚动条可见性。",
		subcategory: "滚动条与滚动",
		type: "enum",
		options: si(["自动", "auto"], ["显示", "visible"], ["隐藏", "hidden"])
	}),
	Q({
		key: "editor.scrollbar.verticalScrollbarSize",
		title: "垂直滚动条大小",
		description: "控制垂直滚动条宽度。",
		subcategory: "滚动条与滚动",
		type: "number",
		min: 4,
		max: 40
	}),
	Q({
		key: "editor.scrollbar.horizontalScrollbarSize",
		title: "水平滚动条大小",
		description: "控制水平滚动条高度。",
		subcategory: "滚动条与滚动",
		type: "number",
		min: 4,
		max: 40
	}),
	Q({
		key: "editor.scrollbar.useShadows",
		title: "滚动阴影",
		description: "滚动时显示内容阴影。",
		subcategory: "滚动条与滚动",
		type: "boolean"
	}),
	Q({
		key: "editor.scrollbar.scrollByPage",
		title: "按页滚动",
		description: "点击滚动条轨道时按页滚动。",
		subcategory: "滚动条与滚动",
		type: "boolean"
	}),
	Q({
		key: "editor.folding",
		title: "代码折叠",
		description: "控制编辑器是否启用折叠区块。",
		subcategory: "折叠",
		type: "boolean"
	}),
	Q({
		key: "editor.foldingHighlight",
		title: "折叠高亮",
		description: "高亮折叠区域。",
		subcategory: "折叠",
		type: "boolean"
	}),
	Q({
		key: "editor.foldingImportsByDefault",
		title: "默认折叠导入",
		description: "默认折叠导入语句区域。",
		subcategory: "折叠",
		type: "boolean"
	}),
	Q({
		key: "editor.foldingMaximumRegions",
		title: "最大折叠区域",
		description: "限制可计算的最大折叠区域数量。",
		subcategory: "折叠",
		type: "number",
		min: 100,
		max: 5e4
	}),
	Q({
		key: "editor.foldingStrategy",
		title: "折叠策略",
		description: "控制折叠区域由语言服务或缩进推导。",
		subcategory: "折叠",
		type: "enum",
		options: si(["自动", "auto"], ["缩进", "indentation"])
	}),
	Q({
		key: "editor.showFoldingControls",
		title: "折叠控件",
		description: "控制折叠控件显示方式。",
		subcategory: "折叠",
		type: "enum",
		options: si(["总是", "always"], ["从不", "never"], ["悬停", "mouseover"])
	}),
	Q({
		key: "editor.unfoldOnClickAfterEndOfLine",
		title: "行尾点击展开",
		description: "点击折叠行末尾后展开折叠区域。",
		subcategory: "折叠",
		type: "boolean"
	}),
	Q({
		key: "editor.find.loop",
		title: "循环查找",
		description: "查找到文档末尾后从开头继续。",
		subcategory: "查找与高亮",
		type: "boolean"
	}),
	Q({
		key: "editor.find.seedSearchStringFromSelection",
		title: "选区填充查找词",
		description: "控制查找框是否使用当前选区作为初始搜索词。",
		subcategory: "查找与高亮",
		type: "enum",
		options: si(["从不", "never"], ["总是", "always"], ["选区", "selection"])
	}),
	Q({
		key: "editor.find.autoCloseAfterNonMatch",
		title: "无匹配后关闭查找",
		description: "查找无匹配结果时自动关闭查找控件。",
		subcategory: "查找与高亮",
		type: "boolean"
	}),
	Q({
		key: "editor.find.addExtraSpaceOnTop",
		title: "查找顶部额外空间",
		description: "为查找控件预留顶部空间。",
		subcategory: "查找与高亮",
		type: "boolean"
	}),
	Q({
		key: "editor.matchBrackets",
		title: "括号匹配",
		description: "控制括号匹配高亮方式。",
		subcategory: "查找与高亮",
		type: "enum",
		options: si(["总是", "always"], ["从不", "never"], ["附近", "near"])
	}),
	Q({
		key: "editor.occurrencesHighlight",
		title: "出现位置高亮",
		description: "控制同一符号或单词的出现位置高亮。",
		subcategory: "查找与高亮",
		type: "enum",
		options: si(["关闭", "off"], ["单文件", "singleFile"], ["多文件", "multiFile"])
	}),
	Q({
		key: "editor.occurrencesHighlightDelay",
		title: "出现位置高亮延迟",
		description: "显示出现位置高亮前的延迟毫秒数。",
		subcategory: "查找与高亮",
		type: "number",
		min: 0,
		max: 2e3
	}),
	Q({
		key: "editor.copyWithSyntaxHighlighting",
		title: "复制语法高亮",
		description: "复制内容时携带语法高亮信息。",
		subcategory: "查找与高亮",
		type: "boolean"
	}),
	Q({
		key: "editor.codeLens",
		title: "CodeLens",
		description: "显示代码透镜信息。",
		subcategory: "查找与高亮",
		type: "boolean"
	}),
	Q({
		key: "editor.colorDecorators",
		title: "颜色装饰器",
		description: "在颜色文本旁显示颜色预览。",
		subcategory: "查找与高亮",
		type: "boolean"
	}),
	Q({
		key: "editor.colorDecoratorsActivatedOn",
		title: "颜色装饰器触发",
		description: "控制颜色装饰器交互触发方式。",
		subcategory: "查找与高亮",
		type: "enum",
		options: si(["点击和悬停", "clickAndHover"], ["点击", "click"], ["悬停", "hover"])
	}),
	Q({
		key: "editor.colorDecoratorsLimit",
		title: "颜色装饰器数量限制",
		description: "限制颜色装饰器显示数量。",
		subcategory: "查找与高亮",
		type: "number",
		min: 0,
		max: 5e3
	}),
	Q({
		key: "editor.guides.enabled",
		title: "缩进向导线",
		description: "显示缩进向导线。",
		subcategory: "向导线与括号",
		type: "boolean"
	}),
	Q({
		key: "editor.guides.highlightActiveIndentation",
		title: "高亮活动缩进",
		description: "高亮当前活动缩进向导线。",
		subcategory: "向导线与括号",
		type: "boolean"
	}),
	Q({
		key: "editor.guides.highlightActiveBracketPair",
		title: "高亮活动括号对",
		description: "高亮当前活动括号对。",
		subcategory: "向导线与括号",
		type: "boolean"
	}),
	Q({
		key: "editor.guides.bracketPairs",
		title: "括号对向导线",
		description: "显示括号对垂直向导线。",
		subcategory: "向导线与括号",
		type: "boolean"
	}),
	Q({
		key: "editor.guides.bracketPairsHorizontal",
		title: "括号对水平向导线",
		description: "显示括号对水平向导线。",
		subcategory: "向导线与括号",
		type: "boolean"
	}),
	Q({
		key: "editor.bracketPairColorization.enabled",
		title: "括号对颜色化",
		description: "为括号对使用不同颜色。",
		subcategory: "向导线与括号",
		type: "boolean"
	}),
	Q({
		key: "editor.bracketPairColorization.independentColorPoolPerBracketType",
		title: "独立括号颜色池",
		description: "不同括号类型使用独立颜色池。",
		subcategory: "向导线与括号",
		type: "boolean"
	}),
	Q({
		key: "editor.hover.enabled",
		title: "悬停提示",
		description: "启用鼠标悬停提示。",
		subcategory: "悬停与内联提示",
		type: "boolean"
	}),
	Q({
		key: "editor.hover.delay",
		title: "悬停延迟",
		description: "显示悬停提示前的延迟毫秒数。",
		subcategory: "悬停与内联提示",
		type: "number",
		min: 0,
		max: 3e3
	}),
	Q({
		key: "editor.hover.sticky",
		title: "悬停保持",
		description: "鼠标移入悬停提示后保持显示。",
		subcategory: "悬停与内联提示",
		type: "boolean"
	}),
	Q({
		key: "editor.hover.hidingDelay",
		title: "悬停隐藏延迟",
		description: "隐藏悬停提示前的延迟毫秒数。",
		subcategory: "悬停与内联提示",
		type: "number",
		min: 0,
		max: 3e3
	}),
	Q({
		key: "editor.inlayHints.enabled",
		title: "内联提示",
		description: "控制内联提示显示方式。",
		subcategory: "悬停与内联提示",
		type: "enum",
		options: si(["开启", "on"], ["关闭", "off"], ["按下时关闭", "offUnlessPressed"], ["按下时开启", "onUnlessPressed"])
	}),
	Q({
		key: "editor.inlayHints.fontSize",
		title: "内联提示字号",
		description: "控制内联提示字号，0 表示使用默认值。",
		subcategory: "悬停与内联提示",
		type: "number",
		min: 0,
		max: 32
	}),
	Q({
		key: "editor.inlayHints.padding",
		title: "内联提示内边距",
		description: "为内联提示增加内边距。",
		subcategory: "悬停与内联提示",
		type: "boolean"
	}),
	Q({
		key: "editor.inlineSuggest.enabled",
		title: "内联建议",
		description: "启用 Copilot 风格的内联建议。",
		subcategory: "悬停与内联提示",
		type: "boolean"
	}),
	Q({
		key: "editor.inlineSuggest.showToolbar",
		title: "内联建议工具栏",
		description: "控制内联建议工具栏显示方式。",
		subcategory: "悬停与内联提示",
		type: "enum",
		options: si(["总是", "always"], ["悬停", "onHover"])
	}),
	Q({
		key: "editor.inlineSuggest.mode",
		title: "内联建议模式",
		description: "控制内联建议匹配模式。",
		subcategory: "悬停与内联提示",
		type: "enum",
		options: si(["前缀", "prefix"], ["子词", "subword"], ["智能子词", "subwordSmart"])
	}),
	Q({
		key: "editor.stickyScroll.enabled",
		title: "粘性滚动",
		description: "滚动时在顶部固定显示当前结构上下文。",
		subcategory: "悬停与内联提示",
		type: "boolean"
	}),
	Q({
		key: "editor.stickyScroll.maxLineCount",
		title: "粘性滚动最大行数",
		description: "限制粘性滚动区域最多显示的行数。",
		subcategory: "悬停与内联提示",
		type: "number",
		min: 1,
		max: 20
	}),
	Q({
		key: "editor.lightbulb.enabled",
		title: "快速修复灯泡",
		description: "显示快速修复灯泡图标。",
		subcategory: "悬停与内联提示",
		type: "boolean"
	}),
	Q({
		key: "editor.comments.insertSpace",
		title: "注释插入空格",
		description: "切换注释时在注释符号后插入空格。",
		subcategory: "编辑行为",
		type: "boolean"
	}),
	Q({
		key: "editor.comments.ignoreEmptyLines",
		title: "注释忽略空行",
		description: "切换行注释时忽略空行。",
		subcategory: "编辑行为",
		type: "boolean"
	}),
	Q({
		key: "editor.autoClosingBrackets",
		title: "自动闭合括号",
		description: "控制括号自动闭合策略。",
		subcategory: "编辑行为",
		type: "enum",
		options: si(["总是", "always"], ["语言定义", "languageDefined"], ["空白前", "beforeWhitespace"], ["从不", "never"])
	}),
	Q({
		key: "editor.autoClosingComments",
		title: "自动闭合注释",
		description: "控制注释自动闭合策略。",
		subcategory: "编辑行为",
		type: "enum",
		options: si(["总是", "always"], ["语言定义", "languageDefined"], ["空白前", "beforeWhitespace"], ["从不", "never"])
	}),
	Q({
		key: "editor.autoClosingQuotes",
		title: "自动闭合引号",
		description: "控制引号自动闭合策略。",
		subcategory: "编辑行为",
		type: "enum",
		options: si(["总是", "always"], ["语言定义", "languageDefined"], ["空白前", "beforeWhitespace"], ["从不", "never"])
	}),
	Q({
		key: "editor.autoSurround",
		title: "自动包围",
		description: "控制选择内容时自动包围字符的策略。",
		subcategory: "编辑行为",
		type: "enum",
		options: si(["总是", "always"], ["语言定义", "languageDefined"], ["空白前", "beforeWhitespace"], ["从不", "never"])
	}),
	Q({
		key: "editor.dragAndDrop",
		title: "拖拽编辑",
		description: "允许通过拖拽移动选中文本。",
		subcategory: "编辑行为",
		type: "boolean"
	}),
	Q({
		key: "editor.autoIndent",
		title: "自动缩进",
		description: "控制自动缩进策略。",
		subcategory: "编辑行为",
		type: "enum",
		options: si(["无", "none"], ["高级", "advanced"], ["完整", "full"], ["括号", "brackets"], ["保持", "keep"])
	}),
	Q({
		key: "editor.autoIndentOnPaste",
		title: "粘贴时自动缩进",
		description: "粘贴内容时自动调整缩进。",
		subcategory: "编辑行为",
		type: "boolean"
	}),
	Q({
		key: "editor.autoIndentOnPasteWithinString",
		title: "字符串内粘贴缩进",
		description: "在字符串内粘贴时自动调整缩进。",
		subcategory: "编辑行为",
		type: "boolean"
	}),
	Q({
		key: "editor.readOnly",
		title: "只读模式",
		description: "禁止编辑器内容被修改。",
		subcategory: "编辑行为",
		type: "boolean"
	}),
	Q({
		key: "editor.domReadOnly",
		title: "DOM 只读",
		description: "禁止 DOM 接收输入事件。",
		subcategory: "编辑行为",
		type: "boolean"
	}),
	Q({
		key: "editor.renameOnType",
		title: "输入时重命名",
		description: "输入时同步重命名相关符号。",
		subcategory: "编辑行为",
		type: "boolean"
	}),
	Q({
		key: "editor.renderValidationDecorations",
		title: "验证装饰",
		description: "控制错误、警告等验证装饰的显示方式。",
		subcategory: "编辑行为",
		type: "enum",
		options: si(["关闭", "off"], ["开启", "on"], ["可编辑时", "editable"])
	}),
	Q({
		key: "editor.definitionLinkOpensInPeek",
		title: "定义链接在 Peek 中打开",
		description: "点击定义链接时在 Peek 视图中打开。",
		subcategory: "编辑行为",
		type: "boolean"
	}),
	Q({
		key: "editor.peekWidgetDefaultFocus",
		title: "Peek 默认焦点",
		description: "控制 Peek 部件打开后的默认焦点。",
		subcategory: "编辑行为",
		type: "enum",
		options: si(["树", "tree"], ["编辑器", "editor"])
	}),
	Q({
		key: "editor.contextmenu",
		title: "上下文菜单",
		description: "启用编辑器右键上下文菜单。",
		subcategory: "编辑行为",
		type: "boolean"
	}),
	Q({
		key: "editor.links",
		title: "链接检测",
		description: "自动检测并允许打开链接。",
		subcategory: "编辑行为",
		type: "boolean"
	}),
	Q({
		key: "editor.selectOnLineNumbers",
		title: "点击行号选择整行",
		description: "点击行号时选择整行。",
		subcategory: "编辑行为",
		type: "boolean"
	}),
	Q({
		key: "editor.accessibilitySupport",
		title: "无障碍支持",
		description: "控制编辑器无障碍模式。",
		subcategory: "无障碍与性能",
		type: "enum",
		options: si(["自动", "auto"], ["开启", "on"], ["关闭", "off"])
	}),
	Q({
		key: "editor.accessibilityPageSize",
		title: "无障碍页大小",
		description: "屏幕阅读器每次读取的行数。",
		subcategory: "无障碍与性能",
		type: "number",
		min: 1,
		max: 100
	}),
	Q({
		key: "editor.renderRichScreenReaderContent",
		title: "丰富屏幕阅读器内容",
		description: "为屏幕阅读器渲染更丰富的内容。",
		subcategory: "无障碍与性能",
		type: "boolean"
	}),
	Q({
		key: "editor.stopRenderingLineAfter",
		title: "停止渲染超长行",
		description: "超过指定列数后停止渲染字符以提升性能。",
		subcategory: "无障碍与性能",
		type: "number",
		min: 100,
		max: 5e4
	}),
	Q({
		key: "editor.experimentalGpuAcceleration",
		title: "GPU 加速实验",
		description: "控制实验性 GPU 加速。",
		subcategory: "无障碍与性能",
		type: "enum",
		options: si(["关闭", "off"], ["开启", "on"])
	}),
	Q({
		key: "editor.automaticLayout",
		title: "自动布局",
		description: "容器大小变化时自动布局编辑器。",
		subcategory: "无障碍与性能",
		type: "boolean"
	}),
	Q({
		key: "editor.tabFocusMode",
		title: "Tab 焦点模式",
		description: "让 Tab 键在编辑器内移动焦点。",
		subcategory: "无障碍与性能",
		type: "boolean"
	}),
	Q({
		key: "editor.showDeprecated",
		title: "显示弃用标记",
		description: "显示已弃用符号的装饰标记。",
		subcategory: "无障碍与性能",
		type: "boolean"
	}),
	Q({
		key: "editor.showUnused",
		title: "显示未使用标记",
		description: "显示未使用符号的装饰标记。",
		subcategory: "无障碍与性能",
		type: "boolean"
	}),
	Q({
		key: "editor.overviewRulerBorder",
		title: "概览标尺边框",
		description: "显示概览标尺边框。",
		subcategory: "无障碍与性能",
		type: "boolean"
	}),
	Q({
		key: "editor.overviewRulerLanes",
		title: "概览标尺通道",
		description: "控制概览标尺通道数量。",
		subcategory: "无障碍与性能",
		type: "number",
		min: 0,
		max: 5
	}),
	Q({
		key: "editor.maxTokenizationLineLength",
		title: "最大分词行长度",
		description: "超过该长度的行停止语法分词以提升性能。",
		subcategory: "无障碍与性能",
		type: "number",
		min: 100,
		max: 2e5
	}),
	Q({
		key: "files.autoSave",
		title: "自动保存",
		description: "失去编辑器焦点时自动触发保存。",
		category: "文件",
		subcategory: "保存",
		type: "enum",
		options: si(["关闭", "off"], ["失去焦点时", "onFocusChange"])
	}),
	Q({
		key: "workbench.colorTheme",
		title: "界面主题",
		description: "控制窗口外壳、编辑器外壳和基础明暗模式。",
		category: "工作台",
		subcategory: "外观主题",
		type: "enum",
		options: si(["默认暗色 · One Dark Pro", "ide-dark"], ["默认亮色 · One Light", "ide-light"])
	}),
	Q({
		key: "workbench.editorTheme",
		title: "编辑器主题",
		description: "选择跟随界面主题，或指定基于 @shikijs/monaco 主题桥接的编辑器语法与内容区配色。",
		category: "工作台",
		subcategory: "外观主题",
		type: "enum",
		options: ci
	}),
	Q({
		key: "workbench.breadcrumbs.enabled",
		title: "面包屑导航",
		description: "控制编辑器标签下方的路径面包屑是否显示。",
		category: "工作台",
		subcategory: "外观主题",
		type: "boolean"
	}),
	Q({
		key: "workbench.statusBar.visible",
		title: "状态栏",
		description: "控制工作台底部状态栏是否显示。",
		category: "工作台",
		subcategory: "状态栏",
		type: "boolean"
	}),
	Q({
		key: "workbench.statusBar.problems.visible",
		title: "错误警告",
		description: "控制状态栏是否显示错误和警告数量。",
		category: "工作台",
		subcategory: "状态栏",
		type: "boolean"
	}),
	Q({
		key: "workbench.statusBar.cursor.visible",
		title: "行列位置",
		description: "控制状态栏是否显示当前光标所在行列。",
		category: "工作台",
		subcategory: "状态栏",
		type: "boolean"
	}),
	Q({
		key: "workbench.statusBar.indentation.visible",
		title: "缩进信息",
		description: "控制状态栏是否显示当前文件的 Tab 或空格数量。",
		category: "工作台",
		subcategory: "状态栏",
		type: "boolean"
	}),
	Q({
		key: "workbench.statusBar.encoding.visible",
		title: "文件编码",
		description: "控制状态栏是否显示当前文件编码。",
		category: "工作台",
		subcategory: "状态栏",
		type: "boolean"
	}),
	Q({
		key: "workbench.statusBar.language.visible",
		title: "文件语言",
		description: "控制状态栏是否显示当前文件语言。",
		category: "工作台",
		subcategory: "状态栏",
		type: "boolean"
	}),
	Q({
		key: "workbench.statusBar.eol.visible",
		title: "行结束符",
		description: "控制状态栏是否显示当前文件保存行结束符。",
		category: "工作台",
		subcategory: "状态栏",
		type: "boolean"
	})
], ui = li.filter((e) => e.category === "编辑器").map((e) => e.key), di = (e) => typeof e == "number" && Number.isFinite(e), fi = (e, t) => e.type === "number" ? di(t) && (e.min === void 0 || t >= e.min) && (e.max === void 0 || t <= e.max) : e.type === "boolean" ? typeof t == "boolean" : e.type === "string" ? typeof t == "string" : typeof t == "string" && e.options?.some((e) => e.value === t) === !0, pi = (e, t) => {
	let n = t[e.key];
	return fi(e, n) ? n : oi[e.key];
}, mi = (e) => e.replace(/^editor\./, "").split("."), hi = (e) => typeof e == "object" && !!e && !Array.isArray(e), gi = (e, t, n) => {
	let r = e;
	for (let e of t.slice(0, -1)) {
		let t = r[e];
		hi(t) || (r[e] = {}), r = r[e];
	}
	let i = t[t.length - 1];
	i && (r[i] = n);
}, _i = (e) => ui.includes(e), vi = (e) => li.reduce((t, n) => (n.category === "编辑器" && (t[n.key] = pi(n, e)), t), {}), yi = (e) => {
	let t = {};
	for (let n of li) n.category === "编辑器" && gi(t, mi(n.key), pi(n, e));
	return t;
}, bi = "monaco.settings", xi = (e) => li.some((t) => t.key === e), Si = class {
	constructor(e = {}) {
		this.bridge = e;
	}
	getSchema() {
		return li.map((e) => ({ ...e }));
	}
	restoreDefaults(e) {
		let t = jr(e);
		t.replaceValues({ ...oi }), this.persist(t.values), this.notifyAllBridge(t.values);
	}
	restorePersisted(e) {
		if (typeof localStorage > "u") return;
		let t = localStorage.getItem(bi);
		if (t) try {
			let n = JSON.parse(t), r = { ...oi };
			for (let [e, t] of Object.entries(n)) xi(e) && this.validateSetting(e, t).ok && (r[e] = t);
			jr(e).replaceValues(r);
		} catch {
			localStorage.removeItem(bi);
		}
	}
	updateSetting(e, t, n) {
		let r = li.find((t) => t.key === e), i = this.validateValue(e, r, t);
		if (!i.ok) return i;
		let a = jr(n);
		return a.setValue(e, t), this.persist(a.values), this.notifyBridge(e, a.values), {
			ok: !0,
			key: e,
			value: t
		};
	}
	validateSetting(e, t) {
		let n = li.find((t) => t.key === e);
		return this.validateValue(e, n, t);
	}
	validateValue(e, t, n) {
		return t ? t.type === "number" ? typeof n == "number" ? t.min !== void 0 && n < t.min || t.max !== void 0 && n > t.max ? {
			ok: !1,
			error: {
				code: "SETTING_OUT_OF_RANGE",
				message: `Setting "${t.key}" is out of range.`
			}
		} : {
			ok: !0,
			key: t.key,
			value: n
		} : this.typeMismatch(t, "number") : t.type === "boolean" ? typeof n == "boolean" ? {
			ok: !0,
			key: t.key,
			value: n
		} : this.typeMismatch(t, "boolean") : typeof n == "string" ? t.type === "string" || t.options?.some((e) => e.value === n) ? {
			ok: !0,
			key: t.key,
			value: n
		} : {
			ok: !1,
			error: {
				code: "SETTING_INVALID_VALUE",
				message: `Setting "${t.key}" received an unsupported value.`
			}
		} : this.typeMismatch(t, "string") : {
			ok: !1,
			error: {
				code: "SETTING_NOT_FOUND",
				message: `Setting "${e}" is not registered.`
			}
		};
	}
	typeMismatch(e, t) {
		return {
			ok: !1,
			error: {
				code: "SETTING_TYPE_MISMATCH",
				message: `Setting "${e.key}" expects ${t}.`
			}
		};
	}
	notifyBridge(e, t) {
		if (e === "workbench.colorTheme" || e === "workbench.editorTheme") {
			this.bridge.applyTheme?.(String(t["workbench.colorTheme"]), t);
			return;
		}
		_i(e) && this.bridge.updateEditorOptions?.({ ...t });
	}
	notifyAllBridge(e) {
		this.bridge.applyTheme?.(String(e["workbench.colorTheme"]), e), this.bridge.updateEditorOptions?.({ ...e });
	}
	persist(e) {
		typeof localStorage > "u" || localStorage.setItem(bi, JSON.stringify(e));
	}
}, Ci = "/settings.json", wi = "settings:json", Ti = (e) => typeof e == "object" && !!e && !Array.isArray(e), Ei = (e) => typeof e == "string" || typeof e == "number" || typeof e == "boolean", Di = class {
	path = Ci;
	tabId = wi;
	constructor(e = new Si()) {
		this.settingsService = e;
	}
	stringifySettings(e) {
		let t = jr(e).values, n = li.reduce((e, n) => (e[n.key] = t[n.key] ?? n.defaultValue, e), {});
		return `${JSON.stringify(n, null, "	")}\n`;
	}
	applyJson(e, t) {
		let n = this.parse(e);
		if (!n.ok) return n;
		let r = this.validate(n.value);
		if (!r.ok) return r;
		let i = jr(t), a = r.entries.filter(([e, t]) => i.values[e] !== t);
		for (let [e, n] of a) {
			let r = this.settingsService.updateSetting(e, n, t);
			if (!r.ok) return {
				ok: !1,
				error: {
					...r.error,
					key: e
				}
			};
		}
		return {
			ok: !0,
			path: this.path,
			changedKeys: a.map(([e]) => e)
		};
	}
	parse(e) {
		try {
			let t = JSON.parse(e);
			return Ti(t) ? {
				ok: !0,
				value: t
			} : {
				ok: !1,
				error: {
					code: "SETTINGS_JSON_ROOT_TYPE",
					message: "settings.json must contain a JSON object."
				}
			};
		} catch {
			return {
				ok: !1,
				error: {
					code: "SETTINGS_JSON_PARSE_ERROR",
					message: "settings.json contains invalid JSON."
				}
			};
		}
	}
	validate(e) {
		let t = [];
		for (let [n, r] of Object.entries(e)) {
			let e = this.settingsService.validateSetting(n, r);
			if (!e.ok) return {
				ok: !1,
				error: {
					...e.error,
					key: n
				}
			};
			Ei(r) && t.push([n, r]);
		}
		return {
			ok: !0,
			entries: t
		};
	}
}, Oi = new Di(), ki = { class: "settings-view__header" }, Ai = { class: "settings-view__toolbar" }, ji = {
	class: "settings-view__actions",
	"aria-label": "设置操作"
}, Mi = { class: "settings-view__search" }, Ni = { class: "settings-view__content" }, Pi = {
	class: "settings-view__nav-list",
	"aria-label": "设置分类"
}, Fi = ["data-settings-category"], Ii = [
	"aria-expanded",
	"aria-controls",
	"data-settings-category-toggle",
	"onClick"
], Li = [
	"data-settings-common-nav",
	"data-settings-section-target",
	"onClick"
], Ri = ["id"], zi = [
	"data-settings-subcategory",
	"data-settings-section-target",
	"onClick"
], Bi = ["aria-valuenow"], Vi = { class: "settings-view__sections-content" }, Hi = [
	"id",
	"data-settings-common-section",
	"data-settings-category-section"
], Ui = ["data-settings-sticky-header"], Wi = ["id", "data-settings-section"], Gi = {
	key: 0,
	class: "settings-view__section-header"
}, Ki = {
	class: "settings-view__list",
	"data-testid": "settings-list"
}, qi = ["data-setting-row"], Ji = { class: "settings-view__copy" }, Yi = { class: "settings-view__label" }, Xi = { class: "settings-view__key" }, Zi = {
	key: 0,
	class: "settings-view__description"
}, Qi = [
	"data-setting-key",
	"min",
	"max",
	"aria-label",
	"value",
	"onInput"
], $i = [
	"data-setting-key",
	"aria-label",
	"placeholder",
	"value",
	"onInput"
], ea = {
	key: 2,
	class: "settings-view__checkbox-control"
}, ta = [
	"data-setting-key",
	"aria-label",
	"checked",
	"onChange"
], na = {
	class: "settings-view__checkbox-box",
	"aria-hidden": "true"
}, ra = [
	"data-setting-key",
	"aria-label",
	"value",
	"onChange"
], ia = ["value"], aa = {
	key: 0,
	class: "settings-view__empty"
}, oa = "settings-category-common", sa = 150, ca = 250, la = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "SettingsView",
	setup(r) {
		let i = jr(), a = n(null), o = n(null), s = n(""), c = n(210), l = n(/* @__PURE__ */ new Set()), u = n(!1), d = n(oa), m = 0, h = c.value, _ = (e) => `settings-category-${e}`, v = (e, t) => `${_(e)}-${t}`, y = (e) => `${e}-nav-children`, b = j(() => [...new Set(li.map((e) => e.category))]), x = [
			"editor.fontSize",
			"editor.fontFamily",
			"editor.lineHeight",
			"editor.tabSize",
			"editor.insertSpaces",
			"editor.wordWrap",
			"editor.minimap.enabled",
			"files.autoSave",
			"workbench.colorTheme",
			"workbench.editorTheme",
			"workbench.breadcrumbs.enabled",
			"workbench.statusBar.visible"
		], C = j(() => x.map((e) => li.find((t) => t.key === e)).filter((e) => e !== void 0)), w = j(() => s.value.trim().length > 0), T = j(() => !w.value && C.value.length > 0), E = j(() => {
			let e = s.value.trim().toLowerCase();
			return e ? li.filter((t) => [
				t.key,
				t.title,
				t.description,
				t.category,
				t.subcategory
			].filter(Boolean).join(" ").toLowerCase().includes(e)) : li;
		}), O = j(() => b.value.map((e) => {
			let t = E.value.filter((t) => t.category === e), n = [...new Set(t.map((e) => e.subcategory))];
			return {
				category: e,
				count: t.length,
				id: _(e),
				isCommon: !1,
				subgroups: n.map((n) => ({
					id: v(e, n),
					subcategory: n,
					settings: t.filter((e) => e.subcategory === n)
				}))
			};
		}).filter((e) => e.count > 0)), k = j(() => {
			let e = {
				category: "常用设置",
				count: C.value.length,
				id: oa,
				isCommon: !0,
				subgroups: [{
					id: `${oa}-shortcuts`,
					subcategory: "快捷操作",
					settings: C.value
				}]
			};
			return T.value ? [e, ...O.value] : O.value;
		}), A = j(() => `${E.value.length}/${li.length}`), P = j(() => ({ "--settings-nav-width": `${c.value}px` })), F = j(() => [...T.value ? [{
			id: oa,
			label: "常用设置",
			count: C.value.length,
			children: []
		}] : [], ...O.value.map((e) => ({
			id: e.id,
			label: e.category,
			count: e.count,
			children: e.subgroups.map((e) => ({
				id: e.id,
				label: e.subcategory,
				count: e.settings.length
			}))
		}))]), L = {
			editor: "Editor",
			files: "Files",
			workbench: "Workbench"
		}, R = (e, t) => {
			let n = e.split(".")[0] ?? "";
			return `${L[n] ?? n}: ${t}`;
		}, V = async (e, t) => {
			await Ep.execute("settings.update", {
				key: e,
				value: t
			});
		}, te = (e, t) => {
			let n = t.target, r = Number(n.value);
			Number.isFinite(r) && V(e, r);
		}, ne = (e, t) => {
			let n = t.target;
			V(e, n.checked);
		}, re = (e, t) => {
			let n = t.target;
			V(e, n.value);
		}, U = (e, t) => {
			let n = t.target;
			V(e, n.value);
		}, ie = async () => {
			await Ep.execute("workbench.action.openSettingsJson");
		}, W = async () => {
			await Ep.execute("settings.restoreDefaults");
		}, ae = () => {
			o.value?.click();
		}, q = async (e) => {
			let t = e.target, n = t.files?.[0];
			if (n) try {
				await Ep.execute("settings.applyJson", { content: await n.text() });
			} finally {
				t.value = "";
			}
		}, oe = () => {
			if (!globalThis.document || !globalThis.URL?.createObjectURL) return;
			let e = globalThis.URL.createObjectURL(new Blob([Oi.stringifySettings()], { type: "application/json;charset=utf-8" })), t = globalThis.document.createElement("a");
			t.href = e, t.download = "settings.json", t.rel = "noopener", t.style.display = "none", globalThis.document.body.append(t), t.click(), t.remove(), globalThis.URL.revokeObjectURL?.(e);
		}, se = () => a.value?.querySelector("[data-testid=\"settings-sections-scroll\"] [data-overlayscrollbars-viewport]") ?? a.value?.querySelector("[data-testid=\"settings-sections-scroll\"]") ?? null, ce = (e, t) => {
			if (typeof e.scrollTo == "function") {
				e.scrollTo({
					top: t,
					behavior: "smooth"
				});
				return;
			}
			e.scrollTop = t;
		}, J = async (e) => {
			d.value = e, await ee();
			let t = se();
			if (!t) return;
			if (e === oa) {
				ce(t, 0);
				return;
			}
			let n = document.getElementById(e);
			if (!n) return;
			let r = t.getBoundingClientRect(), i = n.getBoundingClientRect();
			ce(t, t.scrollTop + i.top - r.top);
		}, le = (e) => Math.min(Math.max(e, sa), ca), Y = (e) => !l.value.has(e), ue = (e) => {
			let t = new Set(l.value);
			t.has(e) ? t.delete(e) : t.add(e), l.value = t;
		}, de = () => {
			u.value = !1, window.removeEventListener("pointermove", fe), window.removeEventListener("pointerup", pe), window.removeEventListener("pointercancel", pe);
		}, fe = (e) => {
			u.value && (e.preventDefault(), c.value = le(h + e.clientX - m));
		}, pe = () => {
			de();
		}, me = (e) => {
			e.preventDefault(), u.value = !0, m = e.clientX, h = c.value, e.isTrusted && e.currentTarget.setPointerCapture?.(e.pointerId), window.addEventListener("pointermove", fe, { passive: !1 }), window.addEventListener("pointerup", pe), window.addEventListener("pointercancel", pe);
		}, he = (e) => {
			e.key === "ArrowLeft" && (e.preventDefault(), c.value = le(c.value - 10)), e.key === "ArrowRight" && (e.preventDefault(), c.value = le(c.value + 10)), e.key === "Home" && (e.preventDefault(), c.value = sa), e.key === "End" && (e.preventDefault(), c.value = ca);
		};
		return g(de), (n, r) => (f(), I("section", {
			ref_key: "settingsViewRef",
			ref: a,
			class: "settings-view",
			style: p(P.value),
			"data-testid": "settings-view"
		}, [G("header", ki, [r[1] ||= G("div", { class: "settings-view__title" }, [G("h2", null, "设置")], -1), G("div", Ai, [G("div", ji, [
			G("button", {
				class: "settings-view__action-button",
				type: "button",
				"aria-label": "查看配置",
				title: "查看配置",
				"data-testid": "settings-view-config",
				onClick: ie
			}, [D(X, {
				name: "file",
				decorative: ""
			})]),
			G("button", {
				class: "settings-view__action-button",
				type: "button",
				"aria-label": "导入配置",
				title: "导入配置",
				"data-testid": "settings-import",
				onClick: ae
			}, [D(X, {
				name: "cloud-upload",
				decorative: ""
			})]),
			G("button", {
				class: "settings-view__action-button",
				type: "button",
				"aria-label": "导出配置",
				title: "导出配置",
				"data-testid": "settings-export",
				onClick: oe
			}, [D(X, {
				name: "cloud-download",
				decorative: ""
			})]),
			G("button", {
				class: "settings-view__action-button",
				type: "button",
				"aria-label": "恢复默认配置",
				title: "恢复默认配置",
				"data-testid": "settings-restore-defaults",
				onClick: W
			}, [D(X, {
				name: "discard",
				decorative: ""
			})]),
			G("input", {
				ref_key: "importInputRef",
				ref: o,
				class: "settings-view__import-input",
				type: "file",
				accept: "application/json,.json",
				"data-testid": "settings-import-input",
				onChange: q
			}, null, 544)
		]), G("label", Mi, [
			D(X, {
				name: "search",
				decorative: ""
			}),
			H(G("input", {
				"onUpdate:modelValue": r[0] ||= (e) => s.value = e,
				type: "search",
				placeholder: "搜索设置",
				"aria-label": "搜索设置"
			}, null, 512), [[B, s.value]]),
			G("span", null, K(A.value), 1)
		])])]), G("div", Ni, [
			D(ot, {
				class: "settings-view__nav",
				"data-testid": "settings-nav-scroll",
				role: "navigation",
				"aria-label": "设置分类"
			}, {
				default: M(() => [G("nav", Pi, [(f(!0), I(z, null, S(F.value, (e) => (f(), I("div", {
					key: e.id,
					class: "settings-view__nav-group",
					"data-settings-category": e.children.length > 0 ? e.label : void 0
				}, [e.children.length > 0 ? (f(), I("button", {
					key: 0,
					class: "settings-view__nav-item settings-view__nav-item--category",
					type: "button",
					"aria-expanded": Y(e.label),
					"aria-controls": y(e.id),
					"data-settings-category-toggle": e.label,
					onClick: (t) => ue(e.label)
				}, [
					D(X, {
						name: "chevron-right",
						class: t(["settings-view__nav-chevron", { "settings-view__nav-chevron--expanded": Y(e.label) }]),
						decorative: ""
					}, null, 8, ["class"]),
					G("span", null, K(e.label), 1),
					G("span", null, K(e.count), 1)
				], 8, Ii)) : (f(), I("button", {
					key: 1,
					class: t(["settings-view__nav-item", { "settings-view__nav-item--active": d.value === e.id }]),
					type: "button",
					"data-settings-common-nav": e.id === oa ? "true" : void 0,
					"data-settings-section-target": e.id,
					onClick: (t) => J(e.id)
				}, [
					D(X, {
						name: e.id === oa ? "" : "chevron-right",
						decorative: ""
					}, null, 8, ["name"]),
					G("span", null, K(e.label), 1),
					G("span", null, K(e.count), 1)
				], 10, Li)), e.children.length > 0 && Y(e.label) ? (f(), I("div", {
					key: 2,
					id: y(e.id),
					class: "settings-view__nav-children"
				}, [(f(!0), I(z, null, S(e.children, (e) => (f(), I("button", {
					key: e.id,
					class: t(["settings-view__nav-item settings-view__nav-item--subitem", { "settings-view__nav-item--active": d.value === e.id }]),
					type: "button",
					"data-settings-subcategory": e.label,
					"data-settings-section-target": e.id,
					onClick: (t) => J(e.id)
				}, [G("span", null, K(e.label), 1), G("span", null, K(e.count), 1)], 10, zi))), 128))], 8, Ri)) : N("", !0)], 8, Fi))), 128))])]),
				_: 1
			}),
			G("div", {
				class: "splitter-handle splitter-handle--vertical settings-view__nav-splitter",
				role: "separator",
				tabindex: "0",
				"aria-label": "调整设置导航宽度",
				"aria-orientation": "vertical",
				"aria-valuemin": sa,
				"aria-valuemax": ca,
				"aria-valuenow": c.value,
				onKeydown: he,
				onPointerdown: me
			}, null, 40, Bi),
			D(ot, {
				class: "settings-view__sections",
				"data-testid": "settings-sections-scroll"
			}, {
				default: M(() => [G("div", Vi, [(f(!0), I(z, null, S(k.value, (n) => (f(), I("section", {
					id: n.id,
					key: n.id,
					class: "settings-view__category-section",
					"data-settings-common-section": n.isCommon ? "true" : void 0,
					"data-settings-category-section": n.category
				}, [G("header", {
					class: "settings-view__category-header",
					"data-settings-sticky-header": n.category
				}, [G("h2", null, K(n.category), 1)], 8, Ui), (f(!0), I(z, null, S(n.subgroups, (r) => (f(), I("section", {
					id: r.id,
					key: r.subcategory,
					class: "settings-view__section",
					"data-settings-section": r.subcategory
				}, [n.isCommon ? N("", !0) : (f(), I("header", Gi, [G("h3", null, K(r.subcategory), 1)])), G("div", Ki, [(f(!0), I(z, null, S(r.settings, (n) => (f(), I("div", {
					key: n.key,
					class: "settings-view__row",
					"data-setting-row": n.key
				}, [G("span", Ji, [
					G("span", Yi, K(R(n.key, n.title)), 1),
					G("span", Xi, K(n.key), 1),
					n.description ? (f(), I("span", Zi, K(n.description), 1)) : N("", !0)
				]), G("span", { class: t(["settings-view__control-group", { "settings-view__control-group--boolean": n.type === "boolean" }]) }, [n.type === "number" ? (f(), I("input", {
					key: 0,
					class: "settings-view__control",
					"data-setting-key": n.key,
					type: "number",
					min: n.min,
					max: n.max,
					"aria-label": n.title,
					value: e(i).values[n.key],
					onInput: (e) => te(n.key, e)
				}, null, 40, Qi)) : n.type === "string" ? (f(), I("input", {
					key: 1,
					class: "settings-view__control",
					"data-setting-key": n.key,
					type: "text",
					"aria-label": n.title,
					placeholder: String(n.defaultValue),
					value: e(i).values[n.key],
					onInput: (e) => re(n.key, e)
				}, null, 40, $i)) : n.type === "boolean" ? (f(), I("label", ea, [G("input", {
					class: "settings-view__checkbox",
					"data-setting-key": n.key,
					type: "checkbox",
					"aria-label": n.title,
					checked: e(i).values[n.key] === !0,
					onChange: (e) => ne(n.key, e)
				}, null, 40, ta), G("span", na, [D(X, {
					name: "check",
					decorative: ""
				})])])) : (f(), I("select", {
					key: 3,
					class: "settings-view__control",
					"data-setting-key": n.key,
					"aria-label": n.title,
					value: e(i).values[n.key],
					onChange: (e) => U(n.key, e)
				}, [(f(!0), I(z, null, S(n.options, (e) => (f(), I("option", {
					key: String(e.value),
					value: String(e.value)
				}, K(e.label), 9, ia))), 128))], 40, ra))], 2)], 8, qi))), 128))])], 8, Wi))), 128))], 8, Hi))), 128)), k.value.length === 0 ? (f(), I("p", aa, "没有匹配的设置")) : N("", !0)])]),
				_: 1
			})
		])], 4));
	}
}), [["__scopeId", "data-v-e82b9544"]]), ua = (e) => typeof e == "object" && !!e, da = (e) => {
	if (!ua(e)) return {};
	let t = e.value;
	return {
		key: typeof e.key == "string" ? e.key : void 0,
		value: typeof t == "string" || typeof t == "number" || typeof t == "boolean" ? t : void 0
	};
}, fa = (e) => ua(e) ? { content: typeof e.content == "string" ? e.content : void 0 } : {}, pa = (e, t, n) => {
	let r = new Di(t);
	e.register({
		id: "settings.update",
		title: "更新设置",
		category: "设置",
		run: (e) => {
			let r = da(e);
			!r.key || r.value === void 0 || t.updateSetting(r.key, r.value, n);
		}
	}), e.register({
		id: "settings.applyJson",
		title: "应用设置 JSON",
		category: "设置",
		run: (e) => {
			let t = fa(e);
			t.content !== void 0 && r.applyJson(t.content, n);
		}
	}), e.register({
		id: "settings.restoreDefaults",
		title: "恢复默认配置",
		category: "设置",
		run: () => {
			t.restoreDefaults(n);
		}
	}), ft(n).setCommands(e.list());
}, ma = {
	name: "monaco-workspace",
	children: [
		{
			type: "folder",
			path: "/src",
			name: "src",
			children: [
				{
					type: "folder",
					path: "/src/app",
					name: "app",
					children: [{
						type: "file",
						path: "/src/app/App.vue",
						name: "App.vue",
						language: "vue",
						content: "<script setup lang=\"ts\">\nimport WorkbenchShell from \"./WorkbenchShell.vue\";\n<\/script>\n\n<template>\n	<WorkbenchShell />\n</template>\n"
					}]
				},
				{
					type: "file",
					path: "/src/main.ts",
					name: "main.ts",
					language: "typescript",
					content: "import { createApp } from \"vue\";\nimport App from \"./app/App.vue\";\n\ncreateApp(App).mount(\"#app\");\n"
				},
				{
					type: "file",
					path: "/src/large-file.ts",
					name: "large-file.ts",
					language: "typescript",
					content: Array.from({ length: 5e3 }, (e, t) => `export const sampleLine${t + 1} = ${t + 1};`).join("\n")
				}
			]
		},
		{
			type: "file",
			path: "/README.md",
			name: "README.md",
			language: "markdown",
			content: "# Monaco Workspace\n\nA small seed workspace for the new IDE shell.\n"
		},
		{
			type: "file",
			path: "/package.json",
			name: "package.json",
			language: "json",
			content: "{\n	\"name\": \"monaco-workspace\",\n	\"type\": \"module\"\n}\n"
		}
	]
}, ha = (e) => ({
	code: "PATH_NOT_FOUND",
	message: `Path "${e}" does not exist.`
}), ga = (e) => ({
	code: "NOT_A_FILE",
	message: `Path "${e}" is not a file.`
}), _a = (e) => ({
	code: "NOT_A_FOLDER",
	message: `Path "${e}" is not a folder.`
}), va = (e) => ({
	code: "PATH_ALREADY_EXISTS",
	message: `Path "${e}" already exists.`
}), ya = (e) => ({
	code: "INVALID_PATH",
	message: `Path segment "${e}" is invalid.`
}), ba = (e) => ({
	type: "file",
	path: e.path,
	name: e.name,
	language: e.language,
	size: e.content.length
}), xa = (e) => ({
	type: "folder",
	path: e.path,
	name: e.name,
	children: e.children.map(Sa)
}), Sa = (e) => e.type === "file" ? ba(e) : xa(e), Ca = (e) => structuredClone(e), wa = (e, t) => e === "/" ? `/${t}` : `${e}/${t}`, Ta = (e) => {
	let t = e.lastIndexOf("/");
	return t <= 0 ? "/" : e.slice(0, t);
}, Ea = (e) => e.split("/").filter(Boolean).at(-1) ?? "", Da = (e) => e.trim().length > 0 && !e.includes("/") && !e.includes("\\"), Oa = class {
	pathIndex = /* @__PURE__ */ new Map();
	fileContents = /* @__PURE__ */ new Map();
	fileTree;
	constructor(e) {
		this.workspace = e, this.fileTree = e.children.map(Sa), this.indexNodes(e.children, this.fileTree);
	}
	getWorkspaceName() {
		return this.workspace.name;
	}
	getFileTree() {
		return Ca(this.fileTree);
	}
	getNodeByPath(e) {
		let t = this.pathIndex.get(e);
		return t ? Ca(t) : {
			ok: !1,
			error: ha(e)
		};
	}
	readFile(e) {
		let t = this.pathIndex.get(e);
		return t ? t.type === "file" ? {
			ok: !0,
			path: e,
			content: this.fileContents.get(e) ?? ""
		} : {
			ok: !1,
			error: ga(e)
		} : {
			ok: !1,
			error: ha(e)
		};
	}
	replaceFolderChildren(e, t) {
		let n = t.map(Sa);
		if (e === "/") {
			for (let e of this.fileTree) this.removeNodeFromIndex(e);
			return this.fileTree.splice(0, this.fileTree.length, ...n), this.indexNodes(t, this.fileTree), {
				ok: !0,
				path: e,
				children: Ca(this.fileTree)
			};
		}
		let r = this.pathIndex.get(e);
		if (!r) return {
			ok: !1,
			error: ha(e)
		};
		if (r.type !== "folder") return {
			ok: !1,
			error: _a(e)
		};
		for (let e of r.children) this.removeNodeFromIndex(e);
		return r.children = n, this.indexNodes(t, r.children), {
			ok: !0,
			path: e,
			children: Ca(r.children)
		};
	}
	writeFile(e, t) {
		let n = this.pathIndex.get(e);
		return n ? n.type === "file" ? (this.fileContents.set(e, t), n.size = t.length, {
			ok: !0,
			path: e
		}) : {
			ok: !1,
			error: ga(e)
		} : {
			ok: !1,
			error: ha(e)
		};
	}
	createFile(e, t, n = "", r = Lt(t)) {
		if (!Da(t)) return {
			ok: !1,
			error: ya(t)
		};
		let i = e === "/" ? null : this.pathIndex.get(e);
		if (!i) {
			if (e === "/") {
				let i = wa(e, t);
				if (this.pathIndex.has(i)) return {
					ok: !1,
					error: va(i)
				};
				let a = {
					type: "file",
					path: i,
					name: t,
					language: r,
					size: n.length
				};
				return this.fileTree.push(a), this.pathIndex.set(i, a), this.fileContents.set(i, n), {
					ok: !0,
					path: i
				};
			}
			return {
				ok: !1,
				error: ha(e)
			};
		}
		if (i.type !== "folder") return {
			ok: !1,
			error: _a(e)
		};
		let a = wa(e, t);
		if (this.pathIndex.has(a)) return {
			ok: !1,
			error: va(a)
		};
		let o = {
			type: "file",
			path: a,
			name: t,
			language: r,
			size: n.length
		};
		return i.children.push(o), this.pathIndex.set(a, o), this.fileContents.set(a, n), {
			ok: !0,
			path: a
		};
	}
	createFolder(e, t) {
		if (!Da(t)) return {
			ok: !1,
			error: ya(t)
		};
		let n = e === "/" ? null : this.pathIndex.get(e);
		if (!n) {
			if (e === "/") {
				let n = wa(e, t);
				if (this.pathIndex.has(n)) return {
					ok: !1,
					error: va(n)
				};
				let r = {
					type: "folder",
					path: n,
					name: t,
					children: []
				};
				return this.fileTree.push(r), this.pathIndex.set(n, r), {
					ok: !0,
					path: n
				};
			}
			return {
				ok: !1,
				error: ha(e)
			};
		}
		if (n.type !== "folder") return {
			ok: !1,
			error: _a(e)
		};
		let r = wa(e, t);
		if (this.pathIndex.has(r)) return {
			ok: !1,
			error: va(r)
		};
		let i = {
			type: "folder",
			path: r,
			name: t,
			children: []
		};
		return n.children.push(i), this.pathIndex.set(r, i), {
			ok: !0,
			path: r
		};
	}
	copyNode(e, t) {
		let n = this.pathIndex.get(e);
		if (!n) return {
			ok: !1,
			error: ha(e)
		};
		if (this.pathIndex.has(t)) return {
			ok: !1,
			error: va(t)
		};
		let r = Ea(t), i = Ta(t);
		if (!Da(r)) return {
			ok: !1,
			error: ya(r)
		};
		if (n.type === "file") return this.createFile(i, r, this.fileContents.get(e) ?? "", n.language);
		let a = this.createFolder(i, r);
		if (!a.ok) return a;
		for (let e of n.children) {
			let n = this.copyNode(e.path, wa(t, e.name));
			if (!n.ok) return n;
		}
		return {
			ok: !0,
			path: t
		};
	}
	moveNode(e, t) {
		if (e === t) return {
			ok: !0,
			path: t,
			previousPath: e
		};
		if (t.startsWith(`${e}/`)) return {
			ok: !1,
			error: ya(t)
		};
		let n = this.copyNode(e, t);
		if (!n.ok) return n;
		let r = this.deleteNode(e);
		return r.ok ? {
			ok: !0,
			path: t,
			previousPath: e
		} : r;
	}
	renameNode(e, t) {
		if (!Da(t)) return {
			ok: !1,
			error: ya(t)
		};
		let n = this.pathIndex.get(e);
		if (!n) return {
			ok: !1,
			error: ha(e)
		};
		let r = wa(Ta(e), t);
		return r !== e && this.pathIndex.has(r) ? {
			ok: !1,
			error: va(r)
		} : (this.reindexRenamedNode(n, e, r, t), {
			ok: !0,
			path: r,
			previousPath: e
		});
	}
	deleteNode(e) {
		let t = this.pathIndex.get(e);
		if (!t) return {
			ok: !1,
			error: ha(e)
		};
		let n = this.pathIndex.get(Ta(e));
		if (n?.type === "folder") n.children = n.children.filter((t) => t.path !== e);
		else {
			let t = this.fileTree.findIndex((t) => t.path === e);
			t >= 0 && this.fileTree.splice(t, 1);
		}
		return this.removeNodeFromIndex(t), {
			ok: !0,
			path: e
		};
	}
	listVisibleNodes(e) {
		let t = new Set(e), n = [], r = (e, i) => {
			if (n.push({
				path: e.path,
				name: e.name,
				type: e.type,
				depth: i,
				...e.type === "file" ? { language: e.language } : {},
				...e.type === "folder" ? { expanded: t.has(e.path) } : {}
			}), e.type === "folder" && t.has(e.path)) for (let t of e.children) r(t, i + 1);
		};
		for (let e of this.fileTree) r(e, 0);
		return n;
	}
	indexNodes(e, t) {
		e.forEach((e, n) => {
			let r = t[n];
			if (r) {
				if (this.pathIndex.set(e.path, r), e.type === "file") {
					this.fileContents.set(e.path, e.content);
					return;
				}
				r.type === "folder" && this.indexNodes(e.children, r.children);
			}
		});
	}
	reindexRenamedNode(e, t, n, r) {
		let i = e.type === "file" ? this.fileContents.get(t) : void 0;
		this.removeNodeFromIndex(e), e.path = n, e.name = r, e.type === "folder" && this.rewriteChildPaths(e), this.indexRuntimeNode(e), e.type === "file" && i !== void 0 && this.fileContents.set(n, i);
	}
	rewriteChildPaths(e) {
		if (e.type === "folder") for (let t of e.children) t.path = wa(e.path, t.name), this.rewriteChildPaths(t);
	}
	indexRuntimeNode(e) {
		if (this.pathIndex.set(e.path, e), e.type !== "file") for (let t of e.children) this.indexRuntimeNode(t);
	}
	removeNodeFromIndex(e) {
		if (this.pathIndex.delete(e.path), e.type === "file") {
			this.fileContents.delete(e.path);
			return;
		}
		for (let t of e.children) this.removeNodeFromIndex(t);
	}
}, ka = new Oa(ma), Aa = class {
	listeners = /* @__PURE__ */ new Set();
	id;
	name;
	constructor(e = ka, t = {}) {
		this.filesystem = e, this.id = t.id ?? "virtual", this.name = t.name ?? "Virtual Workspace";
	}
	getStatus() {
		return {
			id: this.id,
			name: this.name,
			kind: "virtual",
			ready: !0,
			capabilities: {
				create: !0,
				delete: !0,
				native: !1,
				rename: !0,
				watch: !0,
				write: !0
			}
		};
	}
	getWorkspaceName() {
		return this.filesystem.getWorkspaceName();
	}
	getFileTree() {
		return this.filesystem.getFileTree();
	}
	getNodeByPath(e) {
		return this.filesystem.getNodeByPath(e);
	}
	readFile(e) {
		return this.filesystem.readFile(e);
	}
	loadFolder(e) {
		if (e === "/") return {
			ok: !0,
			path: e,
			children: this.filesystem.getFileTree()
		};
		let t = this.filesystem.getNodeByPath(e);
		return "ok" in t ? t : t.type === "folder" ? {
			ok: !0,
			path: e,
			children: t.children
		} : {
			ok: !1,
			error: {
				code: "NOT_A_FOLDER",
				message: `Path "${e}" is not a folder.`
			}
		};
	}
	replaceFolderChildren(e, t) {
		let n = this.filesystem.replaceFolderChildren(e, t);
		return n.ok && this.emit({
			type: "changed",
			path: e,
			providerId: this.id
		}), n;
	}
	writeFile(e, t) {
		let n = this.filesystem.writeFile(e, t);
		return n.ok && this.emit({
			type: "changed",
			path: e,
			providerId: this.id
		}), n;
	}
	createFile(e, t, n = "", r) {
		let i = this.filesystem.createFile(e, t, n, r);
		return i.ok && this.emit({
			type: "created",
			path: i.path,
			providerId: this.id
		}), i;
	}
	createFolder(e, t) {
		let n = this.filesystem.createFolder(e, t);
		return n.ok && this.emit({
			type: "created",
			path: n.path,
			providerId: this.id
		}), n;
	}
	copyFile(e, t) {
		let n = this.filesystem.copyNode(e, t);
		return n.ok && this.emit({
			type: "created",
			path: n.path,
			providerId: this.id
		}), n;
	}
	moveFile(e, t) {
		let n = this.filesystem.moveNode(e, t);
		return n.ok && this.emit({
			type: "renamed",
			path: n.path,
			previousPath: e,
			providerId: this.id
		}), n;
	}
	rename(e, t) {
		let n = this.filesystem.renameNode(e, t);
		return n.ok && this.emit({
			type: "renamed",
			path: n.path,
			previousPath: n.previousPath,
			providerId: this.id
		}), n;
	}
	delete(e) {
		let t = this.filesystem.deleteNode(e);
		return t.ok && this.emit({
			type: "deleted",
			path: e,
			providerId: this.id
		}), t;
	}
	watch(e) {
		return this.listeners.add(e), () => {
			this.listeners.delete(e);
		};
	}
	emit(e) {
		for (let t of this.listeners) t(e);
	}
}, ja = (e) => {
	let t = e.lastIndexOf("/");
	return t <= 0 ? "/" : e.slice(0, t);
}, Ma = (e) => e.split("/").filter(Boolean).at(-1) ?? "", Na = (e, t) => e === "/" ? `/${t}` : `${e.replace(/\/$/, "")}/${t}`, Pa = (e) => "ok" in e, Fa = (e, t) => ({
	is_dir: t.type === "folder",
	is_link: !1,
	name: t.name,
	path: ja(e),
	st_size: t.type === "file" ? t.size : 0,
	st_type: t.type === "file" ? t.language : "dir"
}), Ia = new class {
	constructor(e = new Aa()) {
		this.provider = e;
	}
	setProvider(e) {
		this.provider = e;
	}
	getProviderStatus() {
		return this.provider.getStatus();
	}
	getWorkspaceName() {
		return this.provider.getWorkspaceName();
	}
	getFileTree() {
		return this.provider.getFileTree();
	}
	getNodeByPath(e) {
		return this.provider.getNodeByPath(e);
	}
	readFile(e) {
		return this.provider.readFile(e);
	}
	async getFileAttribute(e) {
		if (this.provider.getFileAttribute) return this.provider.getFileAttribute(e);
		let t = this.provider.getNodeByPath(e);
		return Pa(t) ? t : {
			ok: !0,
			path: e,
			attribute: Fa(e, t)
		};
	}
	async getFileAccess(e) {
		return this.provider.getFileAccess ? this.provider.getFileAccess(e) : {
			ok: !1,
			error: {
				code: "FILE_SYSTEM_ACCESS_UNAVAILABLE",
				message: "当前文件系统不支持读取文件权限"
			}
		};
	}
	async setFileAccess(e, t) {
		return this.provider.setFileAccess ? this.provider.setFileAccess(e, t) : {
			ok: !1,
			error: {
				code: "FILE_SYSTEM_ACCESS_UNAVAILABLE",
				message: "当前文件系统不支持设置文件权限"
			}
		};
	}
	prefetchFile(e) {
		return this.provider.prefetchFile?.(e) ?? this.provider.readFile(e);
	}
	loadFolder(e) {
		if (this.provider.loadFolder) return this.provider.loadFolder(e);
		if (e === "/") return {
			ok: !0,
			path: e,
			children: this.provider.getFileTree()
		};
		let t = this.provider.getNodeByPath(e);
		return "ok" in t ? t : t.type === "folder" ? {
			ok: !0,
			path: e,
			children: t.children
		} : {
			ok: !1,
			error: {
				code: "NOT_A_FOLDER",
				message: `Path "${e}" is not a folder.`
			}
		};
	}
	writeFile(e, t) {
		return this.provider.writeFile(e, t);
	}
	createFile(e, t, n = "", r) {
		return this.provider.createFile(e, t, n, r);
	}
	createFolder(e, t) {
		return this.provider.createFolder(e, t);
	}
	async checkExistsFiles(e, t) {
		let n = t ? Na(e, t) : e;
		return Pa(this.provider.getNodeByPath(n)) ? await this.provider.checkExistsFiles?.(e, t) ?? !1 : !0;
	}
	async copyFile(e, t) {
		return this.provider.copyFile ? this.provider.copyFile(e, t) : this.copyFileFallback(e, t);
	}
	async moveFile(e, t, n = {}) {
		if (this.provider.moveFile) return this.provider.moveFile(e, t, n);
		let r = await this.copyFileFallback(e, t);
		if (!r.ok) return r;
		let i = await this.provider.delete(e);
		return i.ok ? {
			ok: !0,
			path: t,
			previousPath: e
		} : i;
	}
	rename(e, t) {
		return this.provider.rename(e, t);
	}
	delete(e) {
		return this.provider.delete(e);
	}
	watch(e) {
		return this.provider.watch(e);
	}
	async copyFileFallback(e, t) {
		let n = this.provider.getNodeByPath(e);
		if (Pa(n)) return n;
		let r = ja(t), i = Ma(t);
		if (n.type === "file") {
			let t = this.provider.readFile(e);
			return t.ok ? this.provider.createFile(r, i, t.content, n.language) : t;
		}
		let a = await this.provider.createFolder(r, i);
		if (!a.ok) return a;
		let o = await this.loadFolder(e), s = o.ok ? o.children : n.children;
		for (let e of s) {
			let n = t === "/" ? `/${e.name}` : `${t}/${e.name}`, r = await this.copyFileFallback(e.path, n);
			if (!r.ok) return r;
		}
		return {
			ok: !0,
			path: t
		};
	}
}(), La = "File System Access API is not available in this browser.", Ra = "No browser directory has been selected.", za = "Browser directory scan was cancelled.", Ba = {
	code: "FILE_SYSTEM_ACCESS_UNAVAILABLE",
	message: La
}, Va = {
	code: "FILE_SYSTEM_ACCESS_UNAVAILABLE",
	message: Ra
}, Ha = {
	code: "FILE_SYSTEM_OPERATION_CANCELLED",
	message: za
}, Ua = (e) => ({
	code: "PATH_NOT_FOUND",
	message: `Path "${e}" does not exist.`
}), Wa = (e) => ({
	code: "NOT_A_FOLDER",
	message: `Path "${e}" is not a folder.`
}), Ga = (e) => structuredClone(e), Ka = (e, t) => e === "/" ? `/${t}` : `${e}/${t}`, qa = (e) => {
	let t = e.lastIndexOf("/");
	return t <= 0 ? "/" : e.slice(0, t);
}, Ja = (e) => e.split("/").filter(Boolean).at(-1) ?? e, Ya = () => new Promise((e) => {
	globalThis.setTimeout(e, 0);
}), Xa = class extends Error {
	constructor(e) {
		super(e.message), this.fileSystemError = e;
	}
}, Za = class {
	listeners = /* @__PURE__ */ new Set();
	directoryHandle = null;
	workspaceName = "browser-workspace";
	fileTree = [];
	scanBatchSize;
	yieldToEventLoop;
	fileContents = /* @__PURE__ */ new Map();
	fileHandles = /* @__PURE__ */ new Map();
	directoryHandles = /* @__PURE__ */ new Map();
	pathIndex = /* @__PURE__ */ new Map();
	fallbackReason;
	scannedEntries = 0;
	constructor(e = globalThis, t = {}) {
		this.host = e, this.scanBatchSize = Math.max(1, t.scanBatchSize ?? 100), this.yieldToEventLoop = t.yieldToEventLoop ?? Ya;
	}
	async mount(e = {}) {
		if (!this.isSupported() || !this.host.showDirectoryPicker) return this.fallbackReason = La, {
			ok: !1,
			error: Ba
		};
		try {
			this.throwIfAborted(e.signal);
			let t = await this.host.showDirectoryPicker();
			this.throwIfAborted(e.signal), this.workspaceName = t.name, this.clearIndexes(), this.directoryHandles.set("/", t), this.scannedEntries = 0, this.fileTree = await this.readDirectory(t, "/", e.signal), this.directoryHandle = t, this.fallbackReason = void 0;
		} catch (e) {
			let t = e instanceof Xa ? e.fileSystemError : Va;
			return this.directoryHandle = null, this.fileTree = [], this.clearIndexes(), this.fallbackReason = t.message, {
				ok: !1,
				error: t
			};
		}
		return this.emit({
			type: "changed",
			path: "/",
			providerId: "browser-file-system-access"
		}), {
			ok: !0,
			path: "/"
		};
	}
	getStatus() {
		let e = this.isSupported(), t = !!this.directoryHandle, n = e ? this.fallbackReason ?? Ra : La;
		return {
			id: "browser-file-system-access",
			name: "Browser File System Access",
			kind: "browser-file-system-access",
			ready: t,
			capabilities: {
				create: t,
				delete: t,
				native: !0,
				rename: !1,
				watch: !1,
				write: t
			},
			...t ? {} : { fallbackReason: n }
		};
	}
	getWorkspaceName() {
		return this.workspaceName;
	}
	getFileTree() {
		return Ga(this.fileTree);
	}
	getNodeByPath(e) {
		let t = this.pathIndex.get(e);
		return t ? structuredClone(t) : {
			ok: !1,
			error: Ua(e)
		};
	}
	readFile(e) {
		if (!this.directoryHandle) return {
			ok: !1,
			error: Ba
		};
		let t = this.fileContents.get(e);
		return t === void 0 ? {
			ok: !1,
			error: Ua(e)
		} : {
			ok: !0,
			path: e,
			content: t
		};
	}
	async writeFile(e, t) {
		if (!this.directoryHandle) return {
			ok: !1,
			error: Ba
		};
		let n = this.fileHandles.get(e);
		if (!n) return {
			ok: !1,
			error: Ua(e)
		};
		let r = await n.createWritable();
		return await r.write(t), await r.close(), this.fileContents.set(e, t), this.updateNodeSize(e, t.length), this.emit({
			type: "changed",
			path: e,
			providerId: "browser-file-system-access"
		}), {
			ok: !0,
			path: e
		};
	}
	async createFile(e, t, n = "") {
		if (!this.directoryHandle) return {
			ok: !1,
			error: Ba
		};
		let r = this.directoryHandles.get(e);
		if (!r?.getFileHandle) return {
			ok: !1,
			error: Wa(e)
		};
		let i = await r.getFileHandle(t, { create: !0 }), a = Ka(e, t);
		this.fileHandles.set(a, i);
		let o = await i.createWritable();
		await o.write(n), await o.close(), this.fileContents.set(a, n);
		let s = {
			type: "file",
			path: a,
			name: t,
			language: Lt(a),
			size: n.length
		};
		return this.addNode(e, s), this.emit({
			type: "created",
			path: a,
			providerId: "browser-file-system-access"
		}), {
			ok: !0,
			path: a
		};
	}
	async createFolder(e, t) {
		if (!this.directoryHandle) return {
			ok: !1,
			error: Ba
		};
		let n = this.directoryHandles.get(e);
		if (!n?.getDirectoryHandle) return {
			ok: !1,
			error: Wa(e)
		};
		let r = await n.getDirectoryHandle(t, { create: !0 }), i = Ka(e, t);
		this.directoryHandles.set(i, r);
		let a = {
			type: "folder",
			path: i,
			name: t,
			children: []
		};
		return this.addNode(e, a), this.emit({
			type: "created",
			path: i,
			providerId: "browser-file-system-access"
		}), {
			ok: !0,
			path: i
		};
	}
	rename() {
		return {
			ok: !1,
			error: Ba
		};
	}
	async delete(e) {
		if (!this.directoryHandle) return {
			ok: !1,
			error: Ba
		};
		let t = qa(e), n = this.directoryHandles.get(t);
		return n?.removeEntry ? (await n.removeEntry(Ja(e), { recursive: !0 }), this.removeNode(e), this.emit({
			type: "deleted",
			path: e,
			providerId: "browser-file-system-access"
		}), {
			ok: !0,
			path: e
		}) : {
			ok: !1,
			error: Wa(t)
		};
	}
	watch(e) {
		return this.listeners.add(e), () => {
			this.listeners.delete(e);
		};
	}
	isSupported() {
		return typeof this.host.showDirectoryPicker == "function";
	}
	async readDirectory(e, t, n) {
		let r = [];
		for await (let [i, a] of e.entries()) {
			this.throwIfAborted(n);
			let e = Ka(t, i);
			if (a.kind === "directory") {
				this.directoryHandles.set(e, a);
				let t = {
					type: "folder",
					path: e,
					name: i,
					children: await this.readDirectory(a, e, n)
				};
				this.pathIndex.set(e, t), r.push(t), await this.yieldAfterScannedEntry(n);
				continue;
			}
			let o = await a.getFile(), s = await o.text();
			this.fileHandles.set(e, a), this.fileContents.set(e, s);
			let c = {
				type: "file",
				path: e,
				name: i,
				language: Lt(e),
				size: o.size ?? s.length
			};
			this.pathIndex.set(e, c), r.push(c), await this.yieldAfterScannedEntry(n);
		}
		return r;
	}
	clearIndexes() {
		this.fileContents.clear(), this.fileHandles.clear(), this.directoryHandles.clear(), this.pathIndex.clear();
	}
	throwIfAborted(e) {
		if (e?.aborted) throw new Xa(Ha);
	}
	async yieldAfterScannedEntry(e) {
		this.scannedEntries += 1, this.scannedEntries % this.scanBatchSize === 0 && (await this.yieldToEventLoop(), this.throwIfAborted(e));
	}
	addNode(e, t) {
		if (e === "/") {
			this.fileTree.push(t), this.pathIndex.set(t.path, t);
			return;
		}
		let n = this.pathIndex.get(e);
		n?.type === "folder" && (n.children.push(t), this.pathIndex.set(t.path, t));
	}
	removeNode(e) {
		let t = qa(e), n = t === "/" ? {
			type: "folder",
			children: this.fileTree
		} : this.pathIndex.get(t);
		n?.type === "folder" && (n.children = n.children.filter((t) => t.path !== e)), this.fileContents.delete(e), this.fileHandles.delete(e), this.directoryHandles.delete(e), this.pathIndex.delete(e);
	}
	updateNodeSize(e, t) {
		let n = this.pathIndex.get(e);
		n?.type === "file" && (n.size = t);
	}
	emit(e) {
		for (let t of this.listeners) t(e);
	}
}, Qa = {
	name: "mock-remote-workspace",
	children: [{
		type: "file",
		path: "/REMOTE.md",
		name: "REMOTE.md",
		language: "markdown",
		content: "# Mock Remote Workspace\n\nThis file is served by the mock remote provider.\n"
	}, {
		type: "folder",
		path: "/remote",
		name: "remote",
		children: [{
			type: "file",
			path: "/remote/app.ts",
			name: "app.ts",
			language: "typescript",
			content: "export const remote = true;\n"
		}]
	}]
}, $a = class {
	provider;
	id;
	name;
	constructor(e = {}) {
		this.id = e.id ?? "mock-remote", this.name = e.name ?? "Mock Remote Workspace", this.provider = new Aa(new Oa(Qa), {
			id: this.id,
			name: this.name
		});
	}
	getStatus() {
		return {
			id: this.id,
			name: this.name,
			kind: "remote",
			ready: !0,
			capabilities: {
				create: !0,
				delete: !0,
				native: !1,
				rename: !0,
				watch: !0,
				write: !0
			}
		};
	}
	getWorkspaceName() {
		return this.provider.getWorkspaceName();
	}
	getFileTree() {
		return this.provider.getFileTree();
	}
	getNodeByPath(e) {
		return this.provider.getNodeByPath(e);
	}
	readFile(e) {
		return this.provider.readFile(e);
	}
	writeFile(e, t) {
		return this.provider.writeFile(e, t);
	}
	createFile(e, t, n = "", r) {
		return this.provider.createFile(e, t, n, r);
	}
	createFolder(e, t) {
		return this.provider.createFolder(e, t);
	}
	rename(e, t) {
		return this.provider.rename(e, t);
	}
	delete(e) {
		return this.provider.delete(e);
	}
	watch(e) {
		return this.provider.watch(e);
	}
}, eo = null, to = () => import("./js/vendor-monaco.js").then((e) => e.t), no = (e = to) => (eo ||= e().then(() => void 0).catch((e) => {
	throw eo = null, e;
}), eo), ro = {
	editor: Se,
	json: ye,
	css: be,
	html: ve,
	typescript: xe
}, io = new Set([
	"css",
	"scss",
	"less"
]), ao = new Set([
	"html",
	"handlebars",
	"razor"
]), oo = new Set(["typescript", "javascript"]), so = (e, t) => e === "json" ? t.json : io.has(e) ? t.css : ao.has(e) ? t.html : oo.has(e) ? t.typescript : t.editor, co = (e = ro) => (t, n) => new (so(n, e))(), lo = ({ createWorkerFactory: e = co } = {}) => {
	let t = e();
	globalThis.MonacoEnvironment = {
		locale: "zh-cn",
		getWorker: (e, n) => (jf.recordWorker(n), t(e, n))
	};
}, uo = "editor.action.quickCommand", fo = () => globalThis.performance?.now() ?? Date.now(), po = {
	lineNumber: 1,
	column: 1
}, mo = (e) => (e?.trim() || "utf-8").toUpperCase(), ho = (e) => e === "\r\n" ? "CRLF" : "LF", go = (e) => ({
	automaticLayout: !1,
	codeLens: !1,
	glyphMargin: !0,
	hover: { enabled: !1 },
	lineDecorationsWidth: 10,
	lineNumbersMinChars: 3,
	maxTokenizationLineLength: 1e3,
	occurrencesHighlight: "off",
	parameterHints: { enabled: !1 },
	quickSuggestions: !1,
	renderValidationDecorations: "off",
	selectionHighlight: !1,
	semanticHighlighting: { enabled: !1 },
	suggestOnTriggerCharacters: !1,
	...yi(e)
}), _o = new class {
	monacoModule = null;
	editors = /* @__PURE__ */ new Map();
	diffEditors = /* @__PURE__ */ new Map();
	models = /* @__PURE__ */ new Map();
	pendingThemeDefinitions = /* @__PURE__ */ new Map();
	activeThemeId = "vs-dark";
	commandCenterKeybindingConfigured = !1;
	async loadMonaco() {
		if (!this.monacoModule) {
			lo(), await no(), this.monacoModule = await import("./js/vendor-monaco.js").then((e) => e.n);
			for (let [e, t] of this.pendingThemeDefinitions) this.monacoModule.editor.defineTheme(e, t);
			this.monacoModule.editor.setTheme(this.activeThemeId);
		}
		return this.monacoModule;
	}
	async createEditor(e, t) {
		let n = await this.loadMonaco();
		this.configureWorkbenchKeybindings(n);
		let r = this.getOrCreateModel(n, t.path, t.content, t.language), i = n.editor.create(e, {
			model: r,
			...go(t)
		});
		return this.editors.set(e, i), i;
	}
	async createDiffEditor(e, t) {
		let n = await this.loadMonaco();
		this.configureWorkbenchKeybindings(n);
		let r = this.getOrCreateModel(n, t.original.path, t.original.content, t.original.language), i = this.getOrCreateModel(n, t.modified.path, t.modified.content, t.modified.language), a = n.editor.createDiffEditor(e, {
			renderSideBySide: !0,
			...go(t)
		});
		return a.setModel({
			original: r,
			modified: i
		}), this.diffEditors.set(e, a), a;
	}
	configureWorkbenchKeybindings(e) {
		this.commandCenterKeybindingConfigured ||= (e.editor.addKeybindingRules([{
			command: `-${uo}`,
			keybinding: e.KeyCode.F1
		}, {
			command: uo,
			keybinding: e.KeyMod.CtrlCmd | e.KeyMod.Shift | e.KeyCode.KeyP
		}]), !0);
	}
	async setEditorModel(e, t, n, r) {
		let i = await this.loadMonaco();
		e.setModel(this.getOrCreateModel(i, t, n, r));
	}
	async setDiffEditorModel(e, t) {
		let n = await this.loadMonaco();
		e.setModel({
			original: this.getOrCreateModel(n, t.original.path, t.original.content, t.original.language),
			modified: this.getOrCreateModel(n, t.modified.path, t.modified.content, t.modified.language)
		});
	}
	onDidChangeModelContent(e, t) {
		return e.onDidChangeModelContent(t);
	}
	onDidChangeCursorPosition(e, t) {
		return e.onDidChangeCursorPosition((e) => {
			t(e.position);
		});
	}
	onDidBlurEditorWidget(e, t) {
		return e.onDidBlurEditorWidget(t);
	}
	getEditorStatus(e, t = {}) {
		let n = e.getModel(), r = n?.getOptions();
		return {
			cursor: e.getPosition() ?? t.cursor ?? po,
			encoding: mo(t.encoding),
			eol: ho(n?.getEOL()),
			indentation: {
				insertSpaces: r?.insertSpaces ?? !0,
				tabSize: r?.tabSize ?? 4
			},
			language: n?.getLanguageId() ?? t.language ?? "plaintext"
		};
	}
	updateAllEditorsOptions(e) {
		for (let t of this.editors.values()) t.updateOptions(e);
		for (let t of this.diffEditors.values()) t.updateOptions(e);
	}
	setTheme(e) {
		this.activeThemeId = e, this.monacoModule?.editor.setTheme(e);
	}
	defineTheme(e, t) {
		this.pendingThemeDefinitions.set(e, t), this.monacoModule?.editor.defineTheme(e, t);
	}
	layoutEditor(e) {
		let t = fo();
		e.layout(), jf.recordLayout(fo() - t);
	}
	disposeEditor(e) {
		let t = this.editors.get(e);
		if (t) {
			t.dispose(), this.editors.delete(e);
			return;
		}
		let n = this.diffEditors.get(e);
		n && (n.dispose(), this.diffEditors.delete(e));
	}
	releaseModel(e) {
		let t = this.models.get(e);
		if (!t) return !1;
		for (let e of this.editors.values()) e.getModel() === t && e.setModel(null);
		for (let e of this.diffEditors.values()) {
			let n = e.getModel();
			(n?.original === t || n?.modified === t) && e.setModel(null);
		}
		return t.dispose(), this.models.delete(e), !0;
	}
	getModelContent(e) {
		return this.models.get(e)?.getValue();
	}
	setModelContent(e, t) {
		let n = this.models.get(e);
		return n ? (n.getValue() !== t && n.setValue(t), !0) : !1;
	}
	getPerformanceMetrics() {
		let e = [...this.models.values()];
		return {
			decorationCount: e.reduce((e, t) => e + t.getAllDecorations().length, 0),
			editorCount: this.editors.size,
			diffEditorCount: this.diffEditors.size,
			markerCount: this.monacoModule?.editor.getModelMarkers({}).length ?? null,
			modelCount: this.models.size,
			totalTextSize: e.reduce((e, t) => e + t.getValueLength(), 0)
		};
	}
	getOrCreateModel(e, t, n, r) {
		let i = this.models.get(t);
		if (i) return i;
		let a = e.editor.createModel(n, r, e.Uri.parse(`file://${t}`));
		return this.models.set(t, a), a;
	}
}(), vo = (e) => {
	if (e instanceof Error) return e.message;
	if (typeof e == "string") return e;
	if (typeof e == "object" && e && "message" in e) {
		let t = e.message;
		if (typeof t == "string") return t;
	}
	return "文件数据获取失败";
}, yo = (e) => e.kind === "image-preview" || e.kind === "video-preview" || e.kind === "markdown-preview" || e.kind === "settings-view" ? [] : e.kind === "diff" ? [`${e.originalPath ?? e.path}?original`, e.modifiedPath ?? e.path] : [e.path], bo = {
	id: "main",
	tabIds: []
}, xo = "/.editor-tab-group/", So = (e, t) => {
	let n = t.filter((t) => t.groupId === e.id).map((e) => e.id);
	if (!n.length) return [];
	if (!e.tabIds.length) return n;
	let r = new Set(n), i = e.tabIds.filter((e) => r.has(e)), a = new Set(i);
	return [...i, ...n.filter((e) => !a.has(e))];
}, Co = (e, t) => {
	let n = e.map((e) => ({
		...e,
		tabIds: So(e, t)
	})).filter((e) => e.tabIds.length > 0);
	return n.length ? n : [{
		...bo,
		tabIds: []
	}];
}, wo = (e, t, n) => {
	if (!n.some((t) => t.id === e)) return e;
	let r = `${e}${xo}${encodeURIComponent(t)}`;
	if (!n.some((e) => e.id === r)) return r;
	let i = 2;
	for (; n.some((e) => e.id === `${r}-${i}`);) i += 1;
	return `${r}-${i}`;
}, To = new class {
	constructor(e, t = Ia) {
		this.modelLifecycle = e, this.fileContentLoader = t;
	}
	openFile(e, t) {
		let n = Xt(t), r = zt(t), i = e.groupId ?? n.activeGroupId, a = n.tabs.find((t) => t.path === e.path && (e.groupId ? t.groupId === e.groupId : !0)), o = n.tabs.find((t) => t.path === e.path);
		if (r.setActiveFilePath(e.path), r.setSelectedPath(e.path), a) return e.contentStatus && n.setTabContentStatus(a.id, e.contentStatus, e.contentError), this.activateTab(a.id, t), n.tabs.find((e) => e.id === a.id) ?? a;
		let s = {
			id: wo(e.path, i, n.tabs),
			path: e.path,
			title: e.title,
			language: e.language,
			dirty: o?.dirty ?? !1,
			groupId: i,
			contentStatus: e.contentStatus ?? o?.contentStatus ?? "loading",
			contentError: e.contentError ?? o?.contentError,
			...e.kind ? { kind: e.kind } : {},
			fileMeta: o?.fileMeta
		};
		return n.setTabs([...n.tabs, s]), n.setGroups(n.groups.map((e) => e.id === i ? {
			...e,
			tabIds: [...e.tabIds, s.id]
		} : e)), n.setActiveGroupId(i), n.setActiveTabId(s.id), s;
	}
	openSettingsJson(e) {
		let t = Xt(e), n = zt(e), r = t.tabs.find((e) => e.id === Oi.tabId);
		if (n.setActiveFilePath(Oi.path), r) return this.activateTab(r.id, e), r;
		let i = t.activeGroupId, a = {
			id: Oi.tabId,
			path: Oi.path,
			title: "settings.json",
			language: "json",
			dirty: !1,
			groupId: i,
			kind: "settings-json"
		};
		return t.setTabs([...t.tabs, a]), t.setGroups(t.groups.map((e) => e.id === i ? {
			...e,
			tabIds: [...e.tabIds, a.id]
		} : e)), t.setActiveGroupId(i), t.setActiveTabId(a.id), a;
	}
	openSettingsView(e) {
		let t = Xt(e), n = zt(e), r = t.tabs.find((e) => e.id === "settings:view");
		if (n.setActiveFilePath("/settings"), n.setSelectedPath("/settings"), r) return this.activateTab(r.id, e), r;
		let i = t.activeGroupId, a = {
			id: "settings:view",
			path: "/settings",
			title: "设置",
			language: "settings",
			dirty: !1,
			groupId: i,
			kind: "settings-view"
		};
		return t.setTabs([...t.tabs, a]), t.setGroups(t.groups.map((e) => e.id === i ? {
			...e,
			tabIds: [...e.tabIds, a.id]
		} : e)), t.setActiveGroupId(i), t.setActiveTabId(a.id), a;
	}
	activateTab(e, t) {
		let n = Xt(t), r = zt(t), i = n.tabs.find((t) => t.id === e);
		i && (n.setActiveGroupId(i.groupId), n.setActiveTabId(i.id), r.setActiveFilePath(i.path), r.setSelectedPath(i.path));
	}
	closeTab(e, t) {
		let n = Xt(t), r = zt(t), i = n.tabs.find((t) => t.id === e);
		if (!i) return;
		let a = n.tabs.filter((t) => t.id !== e), o = So(n.groups.find((e) => e.id === i.groupId) ?? {
			id: i.groupId,
			tabIds: []
		}, n.tabs), s = o.indexOf(e), c = o[s + 1] ?? o[s - 1] ?? null, l = c ? a.find((e) => e.id === c) : a.find((e) => e.groupId === i.groupId) ?? a[0], u = Co(n.groups, a);
		if (n.setTabs(a), n.setGroups(u), u.length <= 1 && n.setGroupLayout("single"), this.releaseClosedTabModels([i], a), n.activeTabId !== e) {
			if (!u.some((e) => e.id === n.activeGroupId)) {
				let e = a.find((e) => e.id === n.activeTabId);
				n.setActiveGroupId(e?.groupId ?? u[0]?.id ?? "main");
			}
			return;
		}
		if (n.setActiveTabId(l?.id ?? null), l) {
			n.setActiveGroupId(l.groupId), r.setActiveFilePath(l.path), r.setSelectedPath(l.path);
			return;
		}
		n.setActiveGroupId("main"), r.setActiveFilePath(null), r.setSelectedPath(null);
	}
	closeActiveTab(e) {
		let t = Xt(e).activeTabId;
		t && this.closeTab(t, e);
	}
	closeOtherTabs(e, t) {
		let n = Xt(t), r = n.tabs.find((t) => t.id === e);
		if (!r) return;
		let i = n.tabs.filter((t) => t.id !== e), a = [r], o = Co(n.groups, a);
		n.setTabs(a), n.setGroups(o), o.length <= 1 && n.setGroupLayout("single"), this.releaseClosedTabModels(i, a), this.activateTab(r.id, t);
	}
	closeTabsToTheRight(e, t) {
		let n = Xt(t), r = n.tabs.find((t) => t.id === e), i = r ? n.groups.find((e) => e.id === r.groupId) : void 0;
		if (!r || !i) return;
		let a = So(i, n.tabs), o = a.indexOf(e);
		if (o < 0) return;
		let s = new Set(a.slice(o + 1)), c = n.tabs.filter((e) => s.has(e.id)), l = n.tabs.filter((e) => !s.has(e.id)), u = Co(n.groups, l);
		n.setTabs(l), n.setGroups(u), u.length <= 1 && n.setGroupLayout("single"), this.releaseClosedTabModels(c, l), n.activeTabId && s.has(n.activeTabId) && this.activateTab(e, t);
	}
	closeSavedTabs(e) {
		let t = Xt(e), n = t.tabs.filter((e) => !e.dirty);
		n.length !== 0 && this.replaceTabsAfterBulkClose(n, t.tabs.filter((e) => e.dirty), e);
	}
	closeAllTabs(e) {
		let t = Xt(e);
		t.tabs.length !== 0 && this.replaceTabsAfterBulkClose(t.tabs, [], e);
	}
	togglePinned(e, t) {
		let n = Xt(t), r = n.tabs.find((t) => t.id === e);
		r && n.setTabPinned(r.id, !r.pinned);
	}
	setDirty(e, t, n) {
		Xt(n).setTabDirty(e, t);
	}
	async loadFileContent(e, t) {
		let n = Xt(t), r = n.tabs.find((t) => t.id === e);
		if (r && r.contentStatus !== "ready") {
			n.setTabContentStatus(r.id, "loading");
			try {
				let e = await this.fileContentLoader.prefetchFile(r.path), n = Xt(t);
				return n.tabs.some((e) => e.id === r.id) && (e.ok ? (n.setTabFileMeta(r.id, { encoding: e.encoding }), n.setTabContentStatus(r.id, "ready")) : n.setTabContentStatus(r.id, "error", vo(e.error))), e;
			} catch (e) {
				let n = Xt(t);
				return n.tabs.some((e) => e.id === r.id) && n.setTabContentStatus(r.id, "error", vo(e)), {
					ok: !1,
					error: {
						code: "REMOTE_PROVIDER_NOT_CONNECTED",
						message: vo(e)
					}
				};
			}
		}
	}
	hasDirtyTabs(e) {
		return Xt(e).tabs.some((e) => e.dirty);
	}
	replaceTabsAfterBulkClose(e, t, n) {
		let r = Xt(n), i = zt(n), a = Co(r.groups, t), o = r.activeTabId, s = t.find((e) => e.id === o) ?? t[0];
		if (r.setTabs(t), r.setGroups(a), a.length <= 1 && r.setGroupLayout("single"), this.releaseClosedTabModels(e, t), s) {
			r.setActiveTabId(s.id), r.setActiveGroupId(s.groupId), i.setActiveFilePath(s.path), i.setSelectedPath(s.path);
			return;
		}
		r.setActiveTabId(null), r.setActiveGroupId("main"), i.setActiveFilePath(null), i.setSelectedPath(null);
	}
	releaseClosedTabModels(e, t) {
		if (!this.modelLifecycle || e.length === 0) return;
		let n = new Set(t.flatMap(yo));
		for (let t of new Set(e.flatMap(yo))) n.has(t) || this.modelLifecycle.releaseModel(t);
	}
}(_o), Eo = new class {
	constructor(e, t, n, r) {
		this.modelReader = e, this.fileWriter = t, this.settingsJsonApplier = n, this.languageService = r;
	}
	setSettingsJsonApplier(e) {
		this.settingsJsonApplier = e;
	}
	setLanguageService(e) {
		this.languageService = e;
	}
	async saveFile(e) {
		let t = zt(), n = Xt(), r = e ?? t.activeFilePath;
		if (!r) return { ok: !1 };
		let i = this.modelReader.getModelContent(r);
		if (i === void 0) return { ok: !1 };
		let a = n.tabs.find((e) => e.path === r);
		if (this.settingsJsonApplier && (a?.kind === "settings-json" || r === this.settingsJsonApplier.path)) {
			let e = this.settingsJsonApplier.applyJson(i);
			return e.ok && n.setTabDirtyByPath(r, !1), e;
		}
		let o = await this.fileWriter.writeFile(r, i);
		return o.ok && (n.setTabDirtyByPath(r, !1), this.languageService?.validateDocument({
			path: r,
			language: a?.language ?? "plaintext",
			content: i
		})), o;
	}
	updateOptions(e) {
		this.modelReader.updateAllEditorsOptions?.(yi(vi(e)));
	}
	updateTheme(e) {
		this.modelReader.setTheme?.(e);
	}
}(_o, Ia), Do = {
	class: "explorer-toolbar",
	"aria-label": "资源管理器操作"
}, Oo = ["title"], ko = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "ExplorerToolbar",
	props: {
		actionsVisible: {
			type: Boolean,
			default: !1
		},
		path: { default: "/" }
	},
	emits: [
		"new-file",
		"new-folder",
		"refresh",
		"collapse-all"
	],
	setup(e, { emit: n }) {
		let r = e, i = n, a = j(() => `路径: ${r.path || "/"}`);
		return (n, r) => (f(), I("div", Do, [G("div", {
			class: "explorer-toolbar__title",
			title: a.value
		}, K(a.value), 9, Oo), G("div", { class: t(["explorer-toolbar__actions", { "explorer-toolbar__actions--visible": e.actionsVisible }]) }, [
			G("button", {
				class: "explorer-toolbar__button",
				type: "button",
				"aria-label": "新建文件",
				title: "新建文件",
				onClick: r[0] ||= (e) => i("new-file")
			}, [D(X, {
				name: "new-file",
				decorative: ""
			})]),
			G("button", {
				class: "explorer-toolbar__button",
				type: "button",
				"aria-label": "新建文件夹",
				title: "新建文件夹",
				onClick: r[1] ||= (e) => i("new-folder")
			}, [D(X, {
				name: "new-folder",
				decorative: ""
			})]),
			G("button", {
				class: "explorer-toolbar__button",
				type: "button",
				"aria-label": "刷新资源管理器",
				title: "刷新资源管理器",
				onClick: r[2] ||= (e) => i("refresh")
			}, [D(X, {
				name: "refresh",
				decorative: ""
			})]),
			G("button", {
				class: "explorer-toolbar__button",
				type: "button",
				"aria-label": "全部折叠",
				title: "全部折叠",
				onClick: r[3] ||= (e) => i("collapse-all")
			}, [D(X, {
				name: "collapse-all",
				decorative: ""
			})])
		], 2)]));
	}
}), [["__scopeId", "data-v-69ad87d9"]]), Ao = Symbol("message-api"), jo = () => {
	let e = ue(Ao, null);
	if (!e) throw Error("useMessage must be used inside MessageProvider.");
	return e;
}, Mo = (e) => {
	let t = e?.trim() || "/";
	return t === "/" ? "/" : t.replace(/\/+$/, "");
}, No = (e) => {
	let t = Mo(e), n = t.lastIndexOf("/");
	return n <= 0 ? "/" : t.slice(0, n);
}, Po = (e, t) => {
	let n = Mo(e);
	return n === "/" ? `/${t}` : `${n}/${t}`;
}, Fo = (e, t) => e === t || e.startsWith(`${t}/`), Io = (e, t, n) => Fo(e, t) ? `${n}${e.slice(t.length)}` : e, Lo = (e) => e.type === "folder" ? {
	...e,
	children: Ro(e.children ?? [])
} : { ...e }, Ro = (e) => e.map(Lo), zo = (e, t, n) => {
	let r = Io(e.path, t, n);
	return e.type === "folder" ? {
		...e,
		path: r,
		children: (e.children ?? []).map((e) => zo(e, t, n))
	} : {
		...e,
		path: r
	};
}, Bo = (e, t) => {
	for (let n of e) {
		if (n.path === t && n.type === "folder") return n;
		if (n.type !== "folder" || !n.children) continue;
		let e = Bo(n.children, t);
		if (e) return e;
	}
	return null;
}, Vo = (e, t) => t === "/" ? e : Bo(e, t)?.children ?? null, Ho = (e, t, n) => {
	let r = new Map(t.filter((e) => e.type === "folder").map((e) => [e.path, e]));
	return e.map((e) => {
		if (e.type !== "folder") return Lo(e);
		let t = r.get(e.path);
		return {
			...e,
			children: t && n.has(e.path) ? Ro(t.children ?? []) : Ro(e.children ?? [])
		};
	});
}, Uo = (e, t, n) => {
	if (t === "/") return {
		nodes: Ro(n),
		replaced: !0
	};
	let r = !1;
	return {
		nodes: e.map((e) => {
			if (e.path === t && e.type === "folder") return r = !0, {
				...e,
				children: Ro(n)
			};
			if (e.type !== "folder" || !e.children) return e;
			let i = Uo(e.children, t, n);
			return i.replaced ? (r = !0, {
				...e,
				children: i.nodes
			}) : e;
		}),
		replaced: r
	};
}, Wo = (e, t, n) => {
	if (t === "/") return {
		nodes: [...Ro(e), ...Ro(n)],
		inserted: !0
	};
	let r = !1;
	return {
		nodes: e.map((e) => {
			if (e.path === t && e.type === "folder") return r = !0, {
				...e,
				children: [...Ro(e.children ?? []), ...Ro(n)]
			};
			if (e.type !== "folder" || !e.children) return e;
			let i = Wo(e.children, t, n);
			return i.inserted ? (r = !0, {
				...e,
				children: i.nodes
			}) : e;
		}),
		inserted: r
	};
}, Go = (e, t) => {
	let n = !1;
	return {
		nodes: e.flatMap((e) => {
			if (e.path === t) return n = !0, [];
			if (e.type !== "folder" || !e.children) return [e];
			let r = Go(e.children, t);
			return r.removed ? (n = !0, [{
				...e,
				children: r.nodes
			}]) : [e];
		}),
		removed: n
	};
}, Ko = (e) => e.split("/").at(-1) || e, qo = new class {
	constructor(e) {
		this.filesystem = e;
	}
	async createFile(e, t, n = "", r) {
		let i = await this.filesystem.createFile(e, t, n);
		return i.ok && (await this.refreshDirectory(e, r), this.selectPath(i.path, r), this.ensureExpanded(e, r)), i;
	}
	async createFolder(e, t, n) {
		let r = await this.filesystem.createFolder(e, t);
		return r.ok && (await this.refreshDirectory(e, n), this.selectPath(r.path, n), this.ensureExpanded(e, n)), r;
	}
	async renamePath(e, t, n) {
		let r = await this.filesystem.rename(e, t);
		if (!r.ok) return r;
		let i = r.previousPath ?? e;
		return await this.refreshDirectory(No(i), n), this.replaceWorkspacePaths(i, r.path, n), this.replaceEditorPaths(i, r.path, n), r;
	}
	async deletePath(e, t, n = {}) {
		let r = await this.filesystem.delete(e);
		if (!r.ok) return r;
		let i = zt(t);
		if (n.refreshParentDirectory === !1) {
			let t = Go(i.fileTree, e);
			t.removed && i.setFileTree(t.nodes);
		} else await this.refreshDirectory(No(e), t);
		return i.setExpandedFolderPaths(i.expandedFolderPaths.filter((t) => !Fo(t, e))), this.removeEditorPaths(e, t), i.activeFilePath && Fo(i.activeFilePath, e) && i.setActiveFilePath(null), i.setSelectedPath(No(e)), r;
	}
	async copyFile(e, t, n) {
		let r = await this.filesystem.copyFile(e, t);
		if (!r.ok) return r;
		let i = No(t);
		return await this.refreshDirectory(i, n), this.selectPath(r.path, n), this.ensureExpanded(i, n), r;
	}
	async moveFile(e, t, n, r = {}) {
		let i = await this.filesystem.moveFile(e, t, r);
		if (!i.ok) return i;
		let a = zt(n), o = Go(a.fileTree, e);
		o.removed && a.setFileTree(o.nodes);
		let s = No(t);
		return await this.refreshDirectory(s, n), a.setExpandedFolderPaths(a.expandedFolderPaths.filter((t) => !Fo(t, e)).map((n) => Io(n, e, t))), this.replaceWorkspacePaths(e, t, n), this.replaceEditorPaths(e, t, n), this.selectPath(i.path, n), this.ensureExpanded(s, n), i;
	}
	refreshWorkspace(e) {
		zt(e).setFileTree(this.filesystem.getFileTree());
	}
	async refreshDirectory(e, t) {
		let n = zt(t), r = await this.filesystem.loadFolder(Mo(e));
		if (!r.ok) return this.refreshWorkspace(t), r;
		let i = Mo(r.path), a = Mo(n.currentDirectoryPath) === i, o = Vo(n.fileTree, i) ?? (a ? n.fileTree : []), s = Ho(r.children, o, new Set(n.expandedFolderPaths)), c = Uo(n.fileTree, i, s);
		return n.setFileTree(c.replaced ? c.nodes : a ? s : this.filesystem.getFileTree()), r;
	}
	ensureExpanded(e, t) {
		let n = zt(t);
		e !== "/" && !n.expandedFolderPaths.includes(e) && n.setExpandedFolderPaths([...n.expandedFolderPaths, e]);
	}
	selectPath(e, t) {
		zt(t).setSelectedPath(e);
	}
	replaceWorkspacePaths(e, t, n) {
		let r = zt(n);
		r.setExpandedFolderPaths(r.expandedFolderPaths.map((n) => Io(n, e, t))), r.activeFilePath && r.setActiveFilePath(Io(r.activeFilePath, e, t)), r.selectedPath && r.setSelectedPath(Io(r.selectedPath, e, t));
	}
	replaceEditorPaths(e, t, n) {
		let r = Xt(n), i = r.tabs.map((n) => {
			if (!Fo(n.path, e)) return n;
			let r = Io(n.path, e, t);
			return {
				...n,
				id: Io(n.id, e, t),
				path: r,
				title: Ko(r)
			};
		});
		r.setTabs(i), r.setGroups(r.groups.map((n) => ({
			...n,
			tabIds: n.tabIds.map((n) => Io(n, e, t))
		}))), r.activeTabId && r.setActiveTabId(Io(r.activeTabId, e, t));
	}
	removeEditorPaths(e, t) {
		let n = Xt(t), r = n.tabs.filter((t) => !Fo(t.path, e)), i = new Set(r.map((e) => e.id));
		if (n.setTabs(r), n.setGroups(n.groups.map((e) => ({
			...e,
			tabIds: e.tabIds.filter((e) => i.has(e))
		}))), n.activeTabId && !i.has(n.activeTabId)) {
			let e = r[0];
			n.setActiveTabId(e?.id ?? null), e && n.setActiveGroupId(e.groupId);
		}
	}
}(Ia), Jo = {
	create: !0,
	delete: !0,
	native: !1,
	rename: !0,
	watch: !0,
	write: !0
}, Yo = (e) => ({
	code: "PATH_NOT_FOUND",
	message: `Path "${e}" does not exist.`
}), Xo = (e) => ({
	code: "REMOTE_PROVIDER_NOT_CONNECTED",
	message: `Editor API client does not implement "${e}".`
}), Zo = (e) => typeof e == "object" && !!e && !Array.isArray(e), Qo = (e, t) => {
	for (let n of t) {
		let t = e[n];
		if (typeof t == "string" && t.trim().length > 0) return t;
	}
}, $o = (e, t) => {
	for (let n of t) {
		let t = e[n];
		if (typeof t == "string") return t;
	}
}, es = (e, t) => {
	if (e) for (let n of t) {
		let t = e[n];
		if (typeof t == "boolean") return t;
	}
}, ts = (e, t) => {
	for (let n of t) {
		let t = e[n];
		if (Array.isArray(t)) return t;
	}
	return [];
}, ns = (e) => e.split("/").filter(Boolean).at(-1) ?? e, rs = (e, t, n) => (e?.startsWith("/") ? e : void 0) || (n === "/" ? `/${t}` : `${n}/${t}`), is = (e) => e.endsWith(".ts") ? "typescript" : e.endsWith(".vue") ? "vue" : e.endsWith(".json") ? "json" : e.endsWith(".md") ? "markdown" : "plaintext", as = (e) => {
	let t = Zo(e) ? e : void 0, n = es(t, ["readOnly", "readonly"]) ?? !1, r = es(t, [
		"canWrite",
		"write",
		"writable"
	]);
	return {
		create: !n && (es(t, ["canCreate", "create"]) ?? !0),
		delete: !n && (es(t, ["canDelete", "delete"]) ?? !0),
		native: es(t, ["native"]) ?? !1,
		rename: !n && (es(t, ["canRename", "rename"]) ?? !0),
		watch: es(t, ["canWatch", "watch"]) ?? !0,
		write: !n && (r ?? !0)
	};
}, os = (e, t = "/") => {
	if (!Zo(e)) throw Error("Editor API node must be an object.");
	let n = Qo(e, [
		"resourceType",
		"kind",
		"type",
		"nodeType"
	]) ?? "file", r = ts(e, [
		"children",
		"items",
		"nodes",
		"resources"
	]), i = [
		"dir",
		"directory",
		"folder"
	].includes(n) || e.isDirectory === !0 || r.length > 0 && n !== "file", a = rs(Qo(e, [
		"path",
		"fullPath",
		"filePath",
		"resourcePath",
		"key"
	]), Qo(e, [
		"name",
		"displayName",
		"fileName",
		"label"
	]) ?? "untitled", t), o = Qo(e, [
		"name",
		"displayName",
		"fileName",
		"label"
	]) ?? ns(a);
	if (i) return {
		type: "folder",
		path: a,
		name: o,
		children: r.map((e) => os(e, a))
	};
	let s = Zo(e.meta) ? e.meta : void 0;
	return {
		type: "file",
		path: a,
		name: o,
		language: Qo(e, [
			"language",
			"lang",
			"languageId"
		]) ?? (s ? Qo(s, [
			"language",
			"lang",
			"languageId"
		]) : void 0) ?? is(a),
		content: $o(e, [
			"content",
			"source",
			"value",
			"text"
		]) ?? ""
	};
}, ss = new class {
	toProductWorkspace(e) {
		let t = Zo(e) ? e : {};
		if (Zo(t.workspace)) return this.fromFinalWorkspace(t.workspace);
		if (Array.isArray(t.tree)) return this.fromCurrentWorkspace(t);
		if (Array.isArray(t.children)) {
			let e = Qo(t, ["name", "workspaceName"]) ?? "Editor Workspace";
			return {
				capabilities: Jo,
				seedWorkspace: {
					name: e,
					children: ts(t, ["children"]).map((e) => os(e))
				},
				source: "product-model",
				workspaceId: Qo(t, ["id", "workspaceId"]) ?? e,
				workspaceName: e
			};
		}
		throw Error("Unsupported editor workspace api response.");
	}
	toProviderStatus(e) {
		return {
			id: e.workspaceId,
			name: e.workspaceName,
			kind: "remote",
			ready: !0,
			capabilities: e.capabilities
		};
	}
	toMutationResult(e, t) {
		if (Zo(e) && e.ok === !1) return {
			ok: !1,
			error: Zo(e.error) ? {
				code: "REMOTE_PROVIDER_NOT_CONNECTED",
				message: Qo(e.error, ["message"]) ?? "Editor API mutation failed."
			} : Xo("mutation")
		};
		let n = Zo(e) ? e : {};
		return {
			ok: !0,
			path: Qo(n, [
				"path",
				"filePath",
				"resourcePath"
			]) ?? t,
			previousPath: Qo(n, ["previousPath"])
		};
	}
	toSeedWorkspaceNodes(e, t = "/") {
		if (Array.isArray(e)) return e.map((e) => os(e, t));
		let n = Zo(e) ? e : {}, r = Zo(n.workspace) ? n.workspace : void 0;
		return (r ? ts(r, [
			"root",
			"children",
			"resources"
		]) : ts(n, [
			"resources",
			"children",
			"items",
			"nodes",
			"root",
			"tree"
		])).map((e) => os(e, t));
	}
	missingFile(e) {
		return Yo(e);
	}
	unsupportedOperation(e) {
		return Xo(e);
	}
	fromCurrentWorkspace(e) {
		let t = Qo(e, [
			"projectName",
			"name",
			"workspaceName"
		]) ?? "Business Workspace", n = Qo(e, [
			"projectId",
			"id",
			"workspaceId"
		]) ?? t;
		return {
			capabilities: as({ writable: es(e, ["writable", "canWrite"]) }),
			seedWorkspace: {
				name: t,
				children: ts(e, ["tree"]).map((e) => os(e))
			},
			source: "current-business-api",
			workspaceId: n,
			workspaceName: t
		};
	}
	fromFinalWorkspace(e) {
		let t = Qo(e, ["name", "workspaceName"]) ?? "Editor Workspace", n = Qo(e, ["id", "workspaceId"]) ?? t;
		return {
			capabilities: as(e.capabilities),
			seedWorkspace: {
				name: t,
				children: ts(e, [
					"root",
					"children",
					"resources"
				]).map((e) => os(e))
			},
			source: "final-editor-api",
			workspaceId: n,
			workspaceName: t
		};
	}
}(), cs = (e) => ({
	id: e ?? "editor-api",
	name: "Editor API Workspace",
	kind: "remote",
	ready: !1,
	fallbackReason: "Editor API workspace has not been loaded.",
	capabilities: {
		create: !1,
		delete: !1,
		native: !1,
		rename: !1,
		watch: !1,
		write: !1
	}
}), ls = (e) => typeof e == "object" && !!e && !Array.isArray(e), us = (e, t) => {
	for (let n of t) {
		let t = e[n];
		if (typeof t == "string") return t;
	}
}, ds = (e) => {
	if (typeof e == "boolean") return e;
	if (Array.isArray(e)) return e.length > 0;
	if (!ls(e)) return !1;
	let t = e.data;
	return Array.isArray(t) ? t.length > 0 : typeof e.exists == "boolean" ? e.exists : !1;
}, fs = class {
	adapter;
	workspaceId;
	productWorkspace = null;
	provider = null;
	constructor(e, t = {}) {
		this.client = e, this.adapter = t.adapter ?? ss, this.workspaceId = t.workspaceId;
	}
	async connect() {
		let e = await this.client.getWorkspace({ workspaceId: this.workspaceId });
		return this.productWorkspace = this.adapter.toProductWorkspace(e), this.provider = new Aa(new Oa(this.productWorkspace.seedWorkspace), {
			id: this.productWorkspace.workspaceId,
			name: this.productWorkspace.workspaceName
		}), this.getStatus();
	}
	getStatus() {
		return this.productWorkspace ? this.adapter.toProviderStatus(this.productWorkspace) : cs(this.workspaceId);
	}
	getWorkspaceName() {
		return this.productWorkspace?.workspaceName ?? "Editor API Workspace";
	}
	getFileTree() {
		return this.provider?.getFileTree() ?? [];
	}
	getNodeByPath(e) {
		return this.provider?.getNodeByPath(e) ?? {
			ok: !1,
			error: this.adapter.missingFile(e)
		};
	}
	readFile(e) {
		return this.provider?.readFile(e) ?? {
			ok: !1,
			error: this.adapter.missingFile(e)
		};
	}
	async getFileAttribute(e) {
		if (!this.provider || !this.productWorkspace || !this.client.getFileAttribute) return {
			ok: !1,
			error: this.adapter.unsupportedOperation("getFileAttribute")
		};
		let t = await this.client.getFileAttribute({
			path: e,
			workspaceId: this.productWorkspace.workspaceId
		});
		return ls(t) && t.ok === !1 ? {
			ok: !1,
			error: this.adapter.unsupportedOperation("getFileAttribute")
		} : {
			ok: !0,
			path: e,
			attribute: t
		};
	}
	async getFileAccess(e) {
		if (!this.productWorkspace || !this.client.getFileAccess) return {
			ok: !1,
			error: this.adapter.unsupportedOperation("getFileAccess")
		};
		let t = await this.client.getFileAccess({
			path: e,
			workspaceId: this.productWorkspace.workspaceId
		});
		return ls(t) && t.ok === !1 ? {
			ok: !1,
			error: this.adapter.unsupportedOperation("getFileAccess")
		} : {
			ok: !0,
			path: e,
			access: {
				chmod: String(t.chmod ?? "000"),
				chown: t.chown ?? "",
				users: Array.isArray(t.users) ? t.users : []
			}
		};
	}
	async setFileAccess(e, t) {
		if (!this.productWorkspace || !this.client.setFileAccess) return {
			ok: !1,
			error: this.adapter.unsupportedOperation("setFileAccess")
		};
		let n = await this.client.setFileAccess({
			access: t.access,
			applyToChildren: t.applyToChildren,
			path: e,
			user: t.user,
			workspaceId: this.productWorkspace.workspaceId
		});
		return this.adapter.toMutationResult(n, e);
	}
	async loadFolder(e) {
		if (!this.provider || !this.productWorkspace) return {
			ok: !1,
			error: this.adapter.unsupportedOperation("loadFolder")
		};
		if (!this.client.readDirectory) return this.provider.loadFolder(e);
		let t = await this.client.readDirectory({
			path: e,
			workspaceId: this.productWorkspace.workspaceId
		});
		if (ls(t) && t.ok === !1) return {
			ok: !1,
			error: this.adapter.unsupportedOperation("readDirectory")
		};
		let n = this.adapter.toSeedWorkspaceNodes(t, e), r = this.provider.replaceFolderChildren(e, n);
		if (r.ok || r.error.code !== "PATH_NOT_FOUND") return r;
		let i = this.provider.replaceFolderChildren("/", n);
		return i.ok ? {
			ok: !0,
			path: e,
			children: i.children
		} : i;
	}
	async prefetchFile(e) {
		if (!this.provider || !this.productWorkspace || !this.client.readFile) return this.readFile(e);
		let t = await this.client.readFile({
			path: e,
			workspaceId: this.productWorkspace.workspaceId
		});
		if (ls(t) && t.ok === !1) return {
			ok: !1,
			error: this.adapter.unsupportedOperation("readFile")
		};
		let n = ls(t) ? t : {}, r = us(n, [
			"content",
			"data",
			"text",
			"value"
		]) ?? "", i = us(n, ["encoding", "charset"]), a = this.provider.writeFile(e, r);
		return a.ok ? {
			ok: !0,
			path: e,
			content: r,
			...i ? { encoding: i } : {}
		} : a;
	}
	async writeFile(e, t) {
		if (!this.provider || !this.productWorkspace || !this.client.writeFile) return {
			ok: !1,
			error: this.adapter.unsupportedOperation("writeFile")
		};
		let n = await this.client.writeFile({
			content: t,
			path: e,
			workspaceId: this.productWorkspace.workspaceId
		}), r = this.adapter.toMutationResult(n, e);
		return r.ok ? this.provider.writeFile(r.path, t) : r;
	}
	async createFile(e, t, n = "", r) {
		if (!this.provider || !this.productWorkspace || !this.client.createFile) return {
			ok: !1,
			error: this.adapter.unsupportedOperation("createFile")
		};
		let i = await this.client.createFile({
			content: n,
			language: r,
			name: t,
			parentPath: e,
			workspaceId: this.productWorkspace.workspaceId
		}), a = this.provider.createFile(e, t, n, r);
		return a.ok ? this.adapter.toMutationResult(i, a.path) : a;
	}
	async createFolder(e, t) {
		if (!this.provider || !this.productWorkspace || !this.client.createFolder) return {
			ok: !1,
			error: this.adapter.unsupportedOperation("createFolder")
		};
		let n = await this.client.createFolder({
			name: t,
			parentPath: e,
			workspaceId: this.productWorkspace.workspaceId
		}), r = this.provider.createFolder(e, t);
		return r.ok ? this.adapter.toMutationResult(n, r.path) : r;
	}
	async checkExistsFiles(e, t) {
		return !this.productWorkspace || !this.client.checkExistsFiles ? !1 : ds(await this.client.checkExistsFiles({
			path: e,
			name: t,
			workspaceId: this.productWorkspace.workspaceId
		}));
	}
	async copyFile(e, t) {
		if (!this.provider || !this.productWorkspace || !this.client.copyFile) return {
			ok: !1,
			error: this.adapter.unsupportedOperation("copyFile")
		};
		let n = await this.client.copyFile({
			sourcePath: e,
			targetPath: t,
			workspaceId: this.productWorkspace.workspaceId
		}), r = this.provider.copyFile(e, t);
		return r.ok ? this.adapter.toMutationResult(n, r.path) : r;
	}
	async moveFile(e, t, n = {}) {
		if (!this.provider || !this.productWorkspace || !this.client.moveFile) return {
			ok: !1,
			error: this.adapter.unsupportedOperation("moveFile")
		};
		let r = await this.client.moveFile({
			...n.rename === void 0 ? {} : { rename: n.rename },
			sourcePath: e,
			targetPath: t,
			workspaceId: this.productWorkspace.workspaceId
		}), i = this.provider.moveFile(e, t);
		if (!i.ok) return i;
		let a = this.adapter.toMutationResult(r, i.path);
		return a.ok ? {
			...a,
			previousPath: i.previousPath
		} : a;
	}
	async rename(e, t) {
		if (!this.provider || !this.productWorkspace || !this.client.rename) return {
			ok: !1,
			error: this.adapter.unsupportedOperation("rename")
		};
		let n = await this.client.rename({
			name: t,
			path: e,
			workspaceId: this.productWorkspace.workspaceId
		}), r = this.provider.rename(e, t);
		return r.ok ? this.adapter.toMutationResult(n, r.path) : r;
	}
	async delete(e) {
		if (!this.provider || !this.productWorkspace || !this.client.delete) return {
			ok: !1,
			error: this.adapter.unsupportedOperation("delete")
		};
		let t = await this.client.delete({
			path: e,
			workspaceId: this.productWorkspace.workspaceId
		}), n = this.provider.delete(e);
		return n.ok ? this.adapter.toMutationResult(t, e) : n;
	}
	watch(e) {
		return this.provider?.watch(e) ?? (() => void 0);
	}
}, ps = (e, t) => e === "/" ? `/${t}` : `${e.replace(/\/$/, "")}/${t}`, ms = (e) => e.split("/").filter(Boolean).at(-1) ?? e, hs = (e) => {
	let t = e.lastIndexOf("/");
	return t <= 0 ? "/" : e.slice(0, t);
}, gs = (e) => e.endsWith(".ts") || e.endsWith(".tsx") ? "typescript" : e.endsWith(".js") || e.endsWith(".jsx") || e.endsWith(".mjs") ? "javascript" : e.endsWith(".vue") ? "vue" : e.endsWith(".json") ? "json" : e.endsWith(".md") ? "markdown" : e.endsWith(".css") ? "css" : e.endsWith(".html") ? "html" : e.endsWith(".yaml") || e.endsWith(".yml") ? "yaml" : "plaintext", _s = (e) => typeof e == "object" && !!e && !Array.isArray(e), vs = (e) => !_s(e) || e.status !== !1, ys = () => {
	if (typeof window > "u") return {};
	let e = window;
	return e.vite_public_request_token ? { "x-http-token": e.vite_public_request_token } : {};
}, bs = (e = {
	BASE_URL: "./",
	DEV: !1,
	MODE: "build",
	PROD: !0,
	SSR: !1,
	VITE_CJS_IGNORE_WARNING: "true"
}) => e.VITE_MONACO_FILE_API_ENDPOINT ? e.VITE_MONACO_FILE_API_ENDPOINT : e.MODE === "build" || e.PROD ? "/files" : "/api/files", xs = class {
	endpoint;
	fetcher;
	getHeaders;
	rootPath;
	showRow;
	constructor(e = {}) {
		this.endpoint = e.endpoint ?? bs(e.environment), this.fetcher = e.fetcher ?? globalThis.fetch.bind(globalThis), this.getHeaders = e.getHeaders ?? ys, this.rootPath = e.rootPath ?? "/", this.showRow = e.showRow ?? 500;
	}
	async getWorkspace(e) {
		let { path: t, resources: n } = await this.readDirectory({ path: this.rootPath });
		return { workspace: {
			id: e.workspaceId ?? t,
			name: t,
			capabilities: {
				canCreate: !0,
				canDelete: !0,
				canRename: !0,
				canWatch: !1,
				canWrite: !0
			},
			root: n
		} };
	}
	async readDirectory(e) {
		let t = await this.post("GetDirNew", {
			p: "1",
			showRow: String(this.showRow),
			path: e.path,
			sort: "name",
			reverse: "False"
		}), n = t.path ?? e.path;
		return {
			path: n,
			resources: [...(t.dir ?? []).map((e) => this.toDirectoryResource(n, e)), ...(t.files ?? []).map((e) => this.toFileResource(n, e))]
		};
	}
	async readFile(e) {
		let t = await this.post("GetFileBody", { path: e.path });
		return {
			ok: t.status !== !1,
			path: e.path,
			content: t.data ?? "",
			size: t.size ?? (t.data ?? "").length,
			encoding: t.encoding ?? "utf-8",
			stMtime: t.st_mtime === void 0 ? void 0 : String(t.st_mtime)
		};
	}
	async getFileAttribute(e) {
		return this.post("get_file_attribute", { filename: e.path });
	}
	async getFileAccess(e) {
		return this.post("GetFileAccess", { filename: e.path });
	}
	async setFileAccess(e) {
		return this.post("SetFileAccess", {
			filename: e.path,
			user: e.user,
			access: e.access,
			all: e.applyToChildren ? "True" : "False"
		});
	}
	async writeFile(e) {
		let t = await this.post("SaveFileBody", {
			path: e.path,
			data: e.content,
			encoding: "utf-8",
			st_mtime: "0",
			force: "0"
		});
		return {
			ok: vs(t),
			path: e.path,
			stMtime: _s(t) && t.st_mtime ? String(t.st_mtime) : void 0
		};
	}
	async createFile(e) {
		let t = ps(e.parentPath, e.name), n = await this.post("CreateFile", { path: t });
		return e.content && await this.writeFile({
			path: t,
			content: e.content,
			workspaceId: e.workspaceId
		}), {
			ok: vs(n),
			path: t
		};
	}
	async createFolder(e) {
		let t = ps(e.parentPath, e.name);
		return {
			ok: vs(await this.post("CreateDir", { path: t })),
			path: t
		};
	}
	async checkExistsFiles(e) {
		let t = await this.post("CheckExistsFiles", {
			dfile: e.path,
			...e.name ? { filename: e.name } : {}
		});
		return Array.isArray(t) && t.length > 0;
	}
	async rename(e) {
		let t = ps(hs(e.path), e.name);
		return {
			ok: vs(await this.post("MvFile", {
				sfile: e.path,
				dfile: t,
				rename: "true"
			})),
			path: t,
			previousPath: e.path
		};
	}
	async delete(e) {
		return {
			ok: vs(await this.post("DeleteFile", { path: e.path })),
			path: e.path
		};
	}
	async copyFile(e) {
		return {
			ok: vs(await this.post("CopyFile", {
				sfile: e.sourcePath,
				dfile: e.targetPath
			})),
			path: e.targetPath
		};
	}
	async moveFile(e) {
		return {
			ok: vs(await this.post("MvFile", {
				...e.rename === void 0 ? {} : { rename: String(e.rename) },
				sfile: e.sourcePath,
				dfile: e.targetPath
			})),
			path: e.targetPath,
			previousPath: e.sourcePath
		};
	}
	async searchFiles(e) {
		return await this.post("SearchFiles", {
			path: e.path,
			search: e.query,
			limit: String(e.limit ?? 300)
		});
	}
	async post(e, t) {
		return (await this.fetcher(`${this.endpoint}?action=${e}`, {
			method: "POST",
			headers: {
				"content-type": "application/x-www-form-urlencoded;charset=UTF-8",
				...this.getHeaders()
			},
			body: new URLSearchParams(t).toString()
		})).json();
	}
	toDirectoryResource(e, t) {
		return {
			name: t.nm,
			path: ps(e, t.nm),
			resourceType: "directory",
			children: [],
			meta: { size: t.sz ?? 0 }
		};
	}
	toFileResource(e, t) {
		let n = ps(e, t.nm);
		return {
			name: ms(n),
			path: n,
			resourceType: "file",
			text: "",
			meta: {
				languageId: gs(n),
				size: t.sz ?? 0
			}
		};
	}
}, Ss = (e, t = {}) => t.forcedProvider ? t.forcedProvider : e.VITE_MONACO_FILE_API_PROVIDER ? e.VITE_MONACO_FILE_API_PROVIDER : e.DEV ? "bt-panel" : "virtual", Cs = {
	id: "mock-remote",
	name: "Mock Remote Workspace",
	kind: "remote",
	ready: !1,
	fallbackReason: "模拟远程连接已断开。",
	capabilities: {
		create: !1,
		delete: !1,
		native: !1,
		rename: !1,
		watch: !1,
		write: !1
	}
}, ws = (e) => ({
	id: "managed-remote",
	name: "Managed Remote Workspace",
	kind: "remote",
	ready: !e,
	fallbackReason: e,
	capabilities: {
		create: !0,
		delete: !0,
		native: !1,
		rename: !0,
		watch: !0,
		write: !0
	}
}), Ts = (e) => e.trim().startsWith("/") ? e : "/", Es = new class {
	state = {
		connection: "disconnected",
		activeRequestId: null,
		requests: [],
		conflicts: []
	};
	requestSequence = 0;
	constructor(e = Ia) {
		this.filesystem = e;
	}
	connectMockRemote(e) {
		let t = new $a();
		this.filesystem.setProvider(t);
		let n = zt(e), r = t.getStatus();
		n.setFileSystemProviderStatus(r);
		let i = t.getWorkspaceName();
		return n.setWorkspaceName(i), n.setCurrentDirectoryPath(Ts(i)), n.setFileTree(t.getFileTree()), n.setExpandedFolderPaths([]), n.setSelectedPath(null), n.setFocusedPath(null), r;
	}
	simulateRemoteFailure(e) {
		return zt(e).setFileSystemProviderStatus(Cs), Cs;
	}
	connectManagedRemote(e) {
		let t = new $a({
			id: "managed-remote",
			name: "Managed Remote Workspace"
		});
		return this.filesystem.setProvider(t), this.refreshWorkspaceFromProvider(t, e), this.state.connection = "connected", this.state.activeRequestId = null, t.getStatus();
	}
	async connectEditorApiWorkspace(e, t) {
		let n = new fs(e), r = await n.connect();
		return this.filesystem.setProvider(n), this.refreshWorkspaceFromProvider(n, t), this.state.connection = "connected", this.state.activeRequestId = null, r;
	}
	simulateManagedRemoteDisconnect(e) {
		let t = ws("托管远程连接已断开。");
		return this.state.connection = "disconnected", this.state.activeRequestId = null, zt(e).setFileSystemProviderStatus(t), t;
	}
	startReconnect(e) {
		let t = this.createReconnectRequest("pending");
		return this.state.connection = "reconnecting", this.state.activeRequestId = t.id, zt(e).setFileSystemProviderStatus(ws("托管远程重连等待中。")), {
			ok: !0,
			requestId: t.id,
			status: t.status
		};
	}
	cancelRemoteRequest(e, t) {
		let n = this.state.requests.find((t) => t.id === e);
		return n ? (n.status = "cancelled", this.state.connection = "disconnected", this.state.activeRequestId = null, zt(t).setFileSystemProviderStatus(ws("托管远程重连已取消。")), {
			ok: !0,
			requestId: e,
			status: n.status
		}) : {
			ok: !1,
			error: {
				code: "REMOTE_REQUEST_NOT_FOUND",
				message: `Remote request "${e}" was not found.`
			}
		};
	}
	retryRemoteConnection(e) {
		let t = this.createReconnectRequest("completed");
		return this.connectManagedRemote(e), {
			ok: !0,
			requestId: t.id,
			status: t.status
		};
	}
	simulateSaveConflict(e, t, n, r) {
		let i = {
			path: e,
			localContent: t,
			remoteContent: n,
			status: "pending"
		};
		return this.state.conflicts = [...this.state.conflicts.filter((t) => t.path !== e), i], zt(r).setFileSystemProviderStatus(ws(`远程保存冲突: ${e}。`)), i;
	}
	resolveSaveConflict(e, t, n) {
		let r = this.state.conflicts.find((t) => t.path === e);
		if (!r) return {
			ok: !1,
			error: {
				code: "REMOTE_CONFLICT_NOT_FOUND",
				message: `Remote conflict "${e}" was not found.`
			}
		};
		let i = t === "local" ? r.localContent : r.remoteContent;
		if (this.filesystem.writeFile(e, i) instanceof Promise) throw Error("Remote conflict resolution requires a synchronous provider.");
		return r.status = t === "local" ? "resolved-local" : "resolved-remote", zt(n).setFileSystemProviderStatus(ws()), {
			ok: !0,
			path: e,
			status: r.status
		};
	}
	getState() {
		return {
			connection: this.state.connection,
			activeRequestId: this.state.activeRequestId,
			requests: this.state.requests.map((e) => ({ ...e })),
			conflicts: this.state.conflicts.map((e) => ({ ...e }))
		};
	}
	reset() {
		this.state = {
			connection: "disconnected",
			activeRequestId: null,
			requests: [],
			conflicts: []
		}, this.requestSequence = 0;
	}
	createReconnectRequest(e) {
		this.requestSequence += 1;
		let t = {
			id: `remote-reconnect-${this.requestSequence}`,
			type: "reconnect",
			status: e,
			attempt: this.requestSequence
		};
		return this.state.requests = [...this.state.requests, t], t;
	}
	refreshWorkspaceFromProvider(e, t) {
		let n = zt(t);
		n.setFileSystemProviderStatus(e.getStatus());
		let r = e.getWorkspaceName();
		n.setWorkspaceName(r), n.setCurrentDirectoryPath(Ts(r)), n.setFileTree(e.getFileTree()), n.setExpandedFolderPaths([]), n.setSelectedPath(null), n.setFocusedPath(null);
	}
}(), Ds = nt("splitter", {
	state: () => ({
		sidebar: { width: 280 },
		bottomPanel: { height: 180 },
		rightPanel: { width: 400 },
		editorGroup: { ratio: 50 },
		terminalSessions: { width: 160 },
		dragging: !1,
		activeHandle: null
	}),
	actions: {
		setSidebarWidth(e) {
			this.sidebar.width = e;
		},
		setBottomPanelHeight(e) {
			this.bottomPanel.height = e;
		},
		setRightPanelWidth(e) {
			this.rightPanel.width = e;
		},
		setEditorGroupRatio(e) {
			this.editorGroup.ratio = e;
		},
		setTerminalSessionsWidth(e) {
			this.terminalSessions.width = e;
		},
		startDragging(e) {
			this.dragging = !0, this.activeHandle = e;
		},
		stopDragging() {
			this.dragging = !1, this.activeHandle = null;
		}
	}
}), Os = {
	id: "main",
	tabIds: []
}, ks = (e) => typeof e == "object" && !!e, As = (e) => [
	"explorer",
	"keybindings",
	"search",
	"settings"
].includes(String(e)), js = (e) => ["problems", "terminal"].includes(String(e)), Ms = (e) => [
	"titlebar",
	"activitybar",
	"sidebar",
	"editor",
	"panel",
	"statusbar"
].includes(String(e)), Ns = (e) => [
	"single",
	"horizontal",
	"vertical"
].includes(String(e)), Ps = new class {
	storageKey = "monaco.workbench.session";
	saveTimerId = null;
	unsubscribers = [];
	flushPendingSave;
	capture(e) {
		let t = Xt(e), n = Jt(e), r = Ds(e), i = jr(e);
		return {
			version: 1,
			editor: { groupLayout: t.groupLayout },
			layout: {
				sidebarVisible: n.sidebar.visible,
				panelVisible: n.panel.visible,
				rightPanelVisible: n.rightPanel.visible,
				activeActivity: n.activeActivity,
				activePanelTab: n.activePanelTab,
				focusedArea: n.focusedArea
			},
			splitter: {
				sidebarWidth: r.sidebar.width,
				bottomPanelHeight: r.bottomPanel.height,
				rightPanelWidth: r.rightPanel.width
			},
			settings: { values: { ...i.values } }
		};
	}
	persist(e) {
		typeof localStorage > "u" || localStorage.setItem(this.storageKey, JSON.stringify(this.capture(e)));
	}
	restore(e) {
		if (typeof localStorage > "u") return !1;
		let t = this.readSnapshot();
		return t ? (this.applySnapshot(t, e), !0) : !1;
	}
	restoreShellLayout(e) {
		if (typeof localStorage > "u") return !1;
		let t = this.readSnapshot();
		return t ? (this.applyShellSnapshot(t, e), !0) : !1;
	}
	startAutoSave(e) {
		this.stopAutoSave();
		let t = () => this.schedulePersist(e);
		this.flushPendingSave = () => {
			this.saveTimerId !== null && (window.clearTimeout(this.saveTimerId), this.saveTimerId = null), this.persist(e);
		}, this.unsubscribers = [
			Jt(e).$subscribe(t, { detached: !0 }),
			Ds(e).$subscribe(t, { detached: !0 }),
			jr(e).$subscribe(t, { detached: !0 })
		], typeof window < "u" && window.addEventListener("beforeunload", this.flushPendingSave);
	}
	stopAutoSave() {
		this.saveTimerId !== null && (window.clearTimeout(this.saveTimerId), this.saveTimerId = null);
		for (let e of this.unsubscribers) e();
		this.unsubscribers = [], this.flushPendingSave && typeof window < "u" && window.removeEventListener("beforeunload", this.flushPendingSave), this.flushPendingSave = void 0;
	}
	schedulePersist(e) {
		typeof window > "u" || (this.saveTimerId !== null && window.clearTimeout(this.saveTimerId), this.saveTimerId = window.setTimeout(() => {
			this.saveTimerId = null, this.persist(e);
		}, 80));
	}
	readSnapshot() {
		let e = localStorage.getItem(this.storageKey);
		if (!e) return null;
		try {
			return JSON.parse(e);
		} catch {
			return localStorage.removeItem(this.storageKey), null;
		}
	}
	applySnapshot(e, t) {
		let n = Xt(t), r = zt(t), i = jr(t);
		n.setTabs([]), n.setGroups([Os]), n.setActiveTabId(null), n.setActiveGroupId(Os.id), Ns(e.editor?.groupLayout) && n.setGroupLayout(e.editor.groupLayout), this.applyShellSnapshot(e, t), r.setActiveFilePath(null), r.setSelectedPath(null), r.setExpandedFolderPaths([]), ks(e.settings?.values) && i.replaceValues({
			...i.values,
			...e.settings.values
		});
	}
	applyShellSnapshot(e, t) {
		let n = Jt(t), r = Ds(t);
		typeof e.layout?.sidebarVisible == "boolean" && n.setSidebarVisible(e.layout.sidebarVisible), typeof e.layout?.panelVisible == "boolean" && n.setPanelVisible(e.layout.panelVisible), typeof e.layout?.rightPanelVisible == "boolean" && n.setRightPanelVisible(e.layout.rightPanelVisible), As(e.layout?.activeActivity) && n.setActiveActivity(e.layout.activeActivity), js(e.layout?.activePanelTab) && n.setActivePanelTab(e.layout.activePanelTab), Ms(e.layout?.focusedArea) && n.setFocusedArea(e.layout.focusedArea), typeof e.splitter?.sidebarWidth == "number" && r.setSidebarWidth(e.splitter.sidebarWidth), typeof e.splitter?.bottomPanelHeight == "number" && r.setBottomPanelHeight(e.splitter.bottomPanelHeight), typeof e.splitter?.rightPanelWidth == "number" && r.setRightPanelWidth(e.splitter.rightPanelWidth);
	}
}(), Fs = nt("explorer", {
	state: () => ({
		createRequest: null,
		nextCreateRequestId: 0,
		nextPropertyRequestId: 0,
		nextRenameRequestId: 0,
		propertyRequest: null,
		renameRequest: null
	}),
	actions: {
		requestCreate(e) {
			this.nextCreateRequestId += 1, this.createRequest = {
				anchorPath: e.anchorPath,
				id: this.nextCreateRequestId,
				kind: e.kind,
				parentPath: e.parentPath
			};
		},
		clearCreateRequest(e) {
			e !== void 0 && this.createRequest?.id !== e || (this.createRequest = null);
		},
		requestRename(e) {
			this.nextRenameRequestId += 1, this.renameRequest = {
				id: this.nextRenameRequestId,
				name: e.name,
				path: e.path
			};
		},
		clearRenameRequest(e) {
			e !== void 0 && this.renameRequest?.id !== e || (this.renameRequest = null);
		},
		requestProperties(e) {
			this.nextPropertyRequestId += 1, this.propertyRequest = {
				id: this.nextPropertyRequestId,
				name: e.name,
				path: e.path,
				type: e.type
			};
		},
		clearPropertyRequest(e) {
			e !== void 0 && this.propertyRequest?.id !== e || (this.propertyRequest = null);
		}
	}
}), Is = {
	class: "monaco-menu",
	role: "presentation"
}, Ls = {
	class: "monaco-action-bar vertical",
	role: "presentation"
}, Rs = {
	class: "actions-container",
	role: "menu"
}, zs = ["data-submenu-id"], Bs = [
	"disabled",
	"data-command-id",
	"data-menu-checked",
	"title",
	"onClick"
], Vs = { class: "action-menu-item" }, Hs = { class: "action-label" }, Us = {
	key: 0,
	class: "keybinding"
}, Ws = {
	class: "action-menu-nested context-view monaco-menu-container ide-monaco-menu",
	role: "presentation"
}, Gs = [
	"disabled",
	"data-command-id",
	"data-menu-checked",
	"title",
	"onClick"
], Ks = { class: "action-menu-item" }, qs = { class: "action-label" }, Js = {
	key: 0,
	class: "keybinding"
}, Ys = {
	key: 1,
	class: "submenu-indicator",
	"aria-hidden": "true"
}, Xs = /* @__PURE__ */ Y({
	name: "ActionMenuList",
	__name: "ActionMenuList",
	props: {
		dividerClass: { default: "" },
		itemClass: { default: "" },
		items: {},
		surfaceClass: { default: "" }
	},
	emits: ["select"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = (e) => e.kind === "divider", o = (e) => (e.children?.length ?? 0) > 0, s = (e) => {
			e.disabled || o(e) || i("select", e);
		}, c = (e) => {
			i("select", e);
		};
		return (e, n) => {
			let i = x("ActionMenuList", !0);
			return f(), I("div", Is, [G("div", Ls, [G("div", Rs, [(f(!0), I(z, null, S(r.items, (e) => (f(), I(z, { key: e.id }, [a(e) ? (f(), I("div", {
				key: 0,
				class: t(["action-menu-divider action-label separator", r.dividerClass]),
				"data-testid": "context-menu-divider",
				role: "separator"
			}, null, 2)) : o(e) ? (f(), I("div", {
				key: 1,
				class: t(["action-menu-row action-menu-row--nested", { "action-menu-row--disabled": e.disabled }]),
				"data-submenu-id": e.id
			}, [G("button", {
				class: t(["action-item", [r.itemClass, { "context-menu__item--danger": e.danger }]]),
				type: "button",
				role: "menuitem",
				"aria-haspopup": "menu",
				disabled: e.disabled,
				"data-command-id": e.commandId,
				"data-menu-checked": e.checked ? "true" : void 0,
				title: e.disabledReason ?? e.label,
				onClick: P((t) => s(e), ["stop"])
			}, [G("span", Vs, [
				n[0] ||= G("span", {
					class: "titlebar__submenu-check",
					"aria-hidden": "true"
				}, null, -1),
				G("span", Hs, K(e.label), 1),
				e.keybinding ? (f(), I("span", Us, K(e.keybinding), 1)) : N("", !0),
				n[1] ||= G("span", {
					class: "submenu-indicator",
					"aria-hidden": "true"
				}, null, -1)
			])], 10, Bs), G("div", Ws, [G("div", { class: t(["monaco-scrollable-element ide-monaco-menu__surface", r.surfaceClass]) }, [D(i, {
				items: e.children ?? [],
				"item-class": r.itemClass,
				"divider-class": r.dividerClass,
				"surface-class": r.surfaceClass,
				onSelect: c
			}, null, 8, [
				"items",
				"item-class",
				"divider-class",
				"surface-class"
			])], 2)])], 10, zs)) : (f(), I("button", {
				key: 2,
				class: t(["action-item", [r.itemClass, { "context-menu__item--danger": e.danger }]]),
				type: "button",
				role: "menuitem",
				disabled: e.disabled,
				"data-command-id": e.commandId,
				"data-menu-checked": e.checked ? "true" : void 0,
				title: e.disabledReason ?? e.label,
				onClick: P((t) => s(e), ["stop"])
			}, [G("span", Ks, [
				n[2] ||= G("span", {
					class: "titlebar__submenu-check",
					"aria-hidden": "true"
				}, null, -1),
				G("span", qs, K(e.label), 1),
				e.keybinding ? (f(), I("span", Js, K(e.keybinding), 1)) : N("", !0),
				e.children?.length ? (f(), I("span", Ys)) : N("", !0)
			])], 10, Gs))], 64))), 128))])])]);
		};
	}
}), Zs = { class: "base-modal__heading" }, Qs = {
	key: 0,
	class: "base-modal__header-actions"
}, $s = ["tabindex"], ec = {
	key: 0,
	class: "base-modal__footer-content"
}, tc = ["disabled"], nc = {
	key: 0,
	class: "base-modal__button-spinner",
	"aria-hidden": "true"
}, rc = ["disabled"], ic = {
	key: 0,
	class: "base-modal__button-spinner",
	"aria-hidden": "true"
}, ac = 0, oc = 0, sc = "", cc = 0, lc = 12, uc = 1e5, dc = [], fc = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	inheritAttrs: !1,
	__name: "BaseModal",
	props: {
		action: {
			type: [String, Function],
			default: void 0
		},
		actionClass: { default: void 0 },
		actionStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		autoFocus: {
			type: Boolean,
			default: !0
		},
		blockScroll: {
			type: Boolean,
			default: !0
		},
		bodyStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		closable: {
			type: Boolean,
			default: !0
		},
		closeFocusable: {
			type: Boolean,
			default: !1
		},
		closeOnEsc: {
			type: Boolean,
			default: !0
		},
		content: {
			type: [String, Function],
			default: void 0
		},
		contentClass: { default: void 0 },
		contentScrollable: {
			type: Boolean,
			default: !1
		},
		contentStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		cover: {
			type: [String, Function],
			default: void 0
		},
		coverClass: { default: void 0 },
		coverStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		displayDirective: { default: "if" },
		draggable: {
			type: [Boolean, Object],
			default: !0
		},
		embedded: {
			type: Boolean,
			default: !1
		},
		footer: {
			type: [String, Function],
			default: void 0
		},
		footerClass: { default: void 0 },
		footerStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		headerExtra: {
			type: [String, Function],
			default: void 0
		},
		headerClass: { default: void 0 },
		headerExtraClass: { default: void 0 },
		headerExtraStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		headerStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		hoverable: {
			type: Boolean,
			default: !1
		},
		icon: {
			type: [String, Function],
			default: void 0
		},
		iconPlacement: { default: "left" },
		loading: {
			type: Boolean,
			default: !1
		},
		maskClosable: {
			type: Boolean,
			default: !0
		},
		negativeText: { default: void 0 },
		negativeButtonProps: { default: void 0 },
		closeHandler: {
			type: Function,
			default: void 0
		},
		escHandler: {
			type: Function,
			default: void 0
		},
		negativeClickHandler: {
			type: Function,
			default: void 0
		},
		positiveClickHandler: {
			type: Function,
			default: void 0
		},
		positiveText: { default: void 0 },
		positiveButtonProps: { default: void 0 },
		preset: { default: "card" },
		role: { default: void 0 },
		segmented: {
			type: [Boolean, Object],
			default: !1
		},
		show: {
			type: Boolean,
			default: !1
		},
		showIcon: {
			type: Boolean,
			default: !0
		},
		showMask: {
			type: Boolean,
			default: !0
		},
		size: { default: "medium" },
		tag: { default: "section" },
		title: {
			type: [String, Function],
			default: void 0
		},
		titleClass: { default: void 0 },
		titleStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		to: {
			type: [String, Boolean],
			default: "body"
		},
		trapFocus: {
			type: Boolean,
			default: !0
		},
		transformOrigin: { default: "mouse" },
		type: { default: "default" },
		width: { default: void 0 },
		zIndex: { default: void 0 }
	},
	emits: [
		"after-enter",
		"after-leave",
		"before-leave",
		"close",
		"esc",
		"mask-click",
		"negative-click",
		"positive-click",
		"update:show"
	],
	setup(r, { emit: i }) {
		let a = r, o = i, s = Y({
			name: "BaseModalRenderNode",
			props: { render: {
				type: [String, Function],
				required: !0
			} },
			setup(e) {
				return () => typeof e.render == "function" ? e.render() : e.render;
			}
		}), l = null, u = (e) => {
			l = {
				x: e.clientX,
				y: e.clientY
			};
		};
		typeof document < "u" && document.addEventListener("pointerdown", u, { passive: !0 });
		let d = (e) => {
			let t = dc.findIndex((t) => t.id === e);
			t !== -1 && dc.splice(t, 1);
		}, m = (e) => {
			d(e);
			let t = uc + ++cc;
			return dc.push({
				id: e,
				zIndex: t
			}), t;
		}, _ = (e) => dc[dc.length - 1]?.id === e, v = () => {
			typeof document > "u" || (oc === 0 && (sc = document.body.style.overflow, document.body.style.overflow = "hidden"), oc += 1);
		}, y = () => {
			typeof document > "u" || oc === 0 || (--oc, oc === 0 && (document.body.style.overflow = sc, sc = ""));
		}, b = ce(), x = F(), S = n(null), w = n(a.show), T = n(!1), E = n(!1), A = n(!1), L = n({
			x: 0,
			y: 0
		}), R = `base-modal-${++ac}`, z = `${R}-title`, B = n(void 0), V = null, te = null, ne = 0, re = 0, U = {
			x: 0,
			y: 0
		}, ae = {
			x: 0,
			y: 0
		}, q = {
			bottom: 0,
			left: 0,
			right: 0,
			top: 0
		}, oe = 0, se = j(() => a.displayDirective === "show" ? w.value : a.show), le = j(() => !!(a.showIcon && (b.icon || a.icon || a.preset === "dialog"))), ue = j(() => !!(b.header || b.title || a.title || le.value)), de = j(() => !!(b["header-extra"] || a.headerExtra)), fe = j(() => !!(b.footer || a.footer || b.action || a.action || a.negativeText || a.positiveText)), pe = j(() => !!(a.negativeText || a.positiveText)), me = j(() => !!(b.title || a.title)), he = j(() => a.to === !1 ? "body" : a.to), ge = j(() => typeof a.segmented == "object" ? !!a.segmented.content : a.segmented), _e = j(() => typeof a.segmented == "object" ? !!a.segmented.footer : a.segmented), ve = j(() => typeof a.segmented == "object" ? !!a.segmented.action : !1), ye = j(() => typeof a.draggable != "object" || a.draggable.bounds !== "none"), be = j(() => a.bodyStyle ? a.contentStyle ? [a.bodyStyle, a.contentStyle] : a.bodyStyle : a.contentStyle), xe = j(() => ({
			"--base-modal-width": a.width === void 0 ? void 0 : typeof a.width == "number" ? `${a.width}px` : a.width,
			transform: L.value.x || L.value.y ? `translate3d(${L.value.x}px, ${L.value.y}px, 0)` : void 0
		})), Se = j(() => ({ zIndex: a.zIndex ?? B.value })), Ce = j(() => a.role ?? "dialog"), we = j(() => a.type === "success" ? "check" : a.type === "warning" ? "warning" : a.type === "error" ? "error" : a.type === "info" ? "info" : "question"), Te = j(() => !!(a.loading || a.positiveButtonProps?.loading)), Ee = j(() => !!a.negativeButtonProps?.loading), De = j(() => !!(Te.value || a.positiveButtonProps?.disabled)), Oe = j(() => !!(Ee.value || a.negativeButtonProps?.disabled)), ke = (e) => e?.type ?? "default", Ae = (e) => {
			if (!e) return;
			let { class: t, disabled: n, loading: r, style: i, type: a, ...o } = e;
			return o;
		}, je = j(() => Ae(a.negativeButtonProps)), Me = j(() => Ae(a.positiveButtonProps)), Ne = j(() => [
			a.negativeButtonProps?.class,
			`base-modal__action-button--${ke(a.negativeButtonProps)}`,
			{ "base-modal__action-button--loading": Ee.value }
		]), Pe = j(() => [
			a.positiveButtonProps?.class,
			`base-modal__action-button--${ke(a.positiveButtonProps) === "default" ? "primary" : ke(a.positiveButtonProps)}`,
			{ "base-modal__action-button--loading": Te.value }
		]), Fe = [
			"a[href]",
			"button:not([disabled])",
			"textarea:not([disabled])",
			"input:not([disabled])",
			"select:not([disabled])",
			"[tabindex]:not([tabindex='-1'])"
		].join(","), Ie = (e) => `translate3d(${e.x}px, ${e.y}px, 0)`, Le = () => ({
			height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
			width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
		}), Re = (e) => {
			if (!ye.value) return e;
			let t = Le(), n = e.x - U.x, r = e.y - U.y, i = lc - q.left, a = t.width - lc - q.right, o = lc - q.top, s = t.height - lc - q.bottom;
			return {
				x: U.x + Math.min(Math.max(n, i), a),
				y: U.y + Math.min(Math.max(r, o), s)
			};
		}, ze = (e) => Re({
			x: U.x + e.clientX - ne,
			y: U.y + e.clientY - re
		}), Be = () => {
			oe = 0;
			let e = S.value;
			e && (e.style.transform = Ie(ae));
		}, Ve = () => {
			oe ||= window.requestAnimationFrame(Be);
		}, He = () => {
			oe &&= (window.cancelAnimationFrame(oe), 0);
		}, Ue = () => {
			let e = S.value;
			e && (e.style.willChange = "");
		}, We = () => {
			He(), Ue(), te = null, A.value = !1;
		}, Ge = (e) => {
			if (!a.draggable || !a.show) return !1;
			let t = e.target;
			return !(t instanceof HTMLElement) || !t.closest(".base-modal__header") || t.closest("button, a, input, textarea, select, [contenteditable='true'], [data-modal-drag-disabled]") ? !1 : !!S.value?.contains(t);
		}, Ke = (e) => {
			if (!Ge(e)) return;
			let t = S.value;
			if (!t) return;
			e.preventDefault(), te = e.pointerId, A.value = !0, ne = e.clientX, re = e.clientY, U = { ...L.value }, ae = { ...L.value };
			let n = t.getBoundingClientRect();
			q = {
				bottom: n.bottom,
				left: n.left,
				right: n.right,
				top: n.top
			}, t.style.willChange = "transform";
			try {
				t.setPointerCapture?.(e.pointerId);
			} catch {}
		}, qe = (e) => {
			te === e.pointerId && (e.preventDefault(), ae = ze(e), Ve());
		}, Je = (e) => {
			te === e.pointerId && (e.preventDefault(), L.value = ze(e), We());
		}, Ye = () => {
			let e = S.value;
			return e ? Array.from(e.querySelectorAll(Fe)).filter((e) => !e.hasAttribute("disabled") && e.getAttribute("aria-hidden") !== "true") : [];
		}, Xe = async () => {
			if (!a.autoFocus) return;
			await ee();
			let e = S.value;
			!e || !a.show || (Ye()[0] ?? e).focus();
		}, Ze = (e, t) => {
			if (e === "close-button" && a.closeHandler) return a.closeHandler(e);
			if (e === "negative" && a.negativeClickHandler) return a.negativeClickHandler(t);
			if (e === "positive" && a.positiveClickHandler) return a.positiveClickHandler(t);
		}, Qe = (e, t) => {
			t !== !1 && (o("close", e), o("update:show", !1));
		}, $e = (e, t) => {
			let n = Ze(e, t);
			if (n && typeof n.then == "function") {
				Promise.resolve(n).then((t) => Qe(e, t));
				return;
			}
			Qe(e, n);
		}, et = (e) => {
			_(R) && (o("mask-click", e), a.maskClosable && $e("mask", e));
		}, tt = (e, t) => {
			o(e === "negative" ? "negative-click" : "positive-click", t), $e(e, t);
		}, nt = (e) => {
			!a.show || e.key !== "Escape" || !a.closeOnEsc || !_(R) || (a.escHandler?.(), o("esc"), $e("esc"));
		}, rt = (e) => {
			if (!a.trapFocus || e.key !== "Tab") return;
			let t = Ye();
			if (!t.length) {
				e.preventDefault(), S.value?.focus();
				return;
			}
			let n = t[0], r = t[t.length - 1];
			if (e.shiftKey && document.activeElement === n) {
				e.preventDefault(), r.focus();
				return;
			}
			!e.shiftKey && document.activeElement === r && (e.preventDefault(), n.focus());
		}, it = () => {
			T.value || typeof document > "u" || (document.addEventListener("keydown", nt), T.value = !0);
		}, at = () => {
			!T.value || typeof document > "u" || (document.removeEventListener("keydown", nt), T.value = !1);
		}, ot = () => {
			!a.blockScroll || E.value || (v(), E.value = !0);
		}, Z = () => {
			E.value &&= (y(), !1);
		}, st = async () => {
			await ee();
			let e = S.value;
			if (!e) return;
			if (a.transformOrigin === "center" || !l) {
				e.style.transformOrigin = "center";
				return;
			}
			let t = e.getBoundingClientRect();
			e.style.transformOrigin = `${l.x - t.left}px ${l.y - t.top}px`;
		};
		return W(() => a.show, (e, t) => {
			if (e) {
				w.value = !0, L.value = {
					x: 0,
					y: 0
				}, B.value = m(R), V = document.activeElement instanceof HTMLElement ? document.activeElement : null, it(), ot(), st(), Xe().then(() => o("after-enter"));
				return;
			}
			t !== void 0 && (We(), o("before-leave"), at(), Z(), d(R), V?.focus?.(), V = null, o("after-leave"));
		}, { immediate: !0 }), g(() => {
			We(), at(), Z(), d(R), typeof document < "u" && document.removeEventListener("pointerdown", u);
		}), (n, i) => (f(), J(O, {
			to: he.value,
			disabled: r.to === !1
		}, [D(ie, {
			name: "base-modal-transition",
			appear: ""
		}, {
			default: M(() => [se.value ? H((f(), I("div", {
				key: 0,
				class: t(["base-modal-layer", { "base-modal-layer--mask-hidden": !r.showMask }]),
				"data-testid": "base-modal-layer",
				style: p(Se.value),
				onClick: i[3] ||= P((e) => !r.showMask && et(e), ["self"]),
				onContextmenu: i[4] ||= P(() => {}, ["stop"])
			}, [r.showMask ? (f(), I("div", {
				key: 0,
				class: "base-modal__mask",
				"data-testid": "base-modal-mask",
				"aria-hidden": "true",
				onClick: P(et, ["self"])
			})) : N("", !0), (f(), J(C(r.tag), h({
				ref_key: "modalRef",
				ref: S
			}, e(x), {
				class: ["base-modal", [
					`base-modal--${r.preset}`,
					`base-modal--${r.type}`,
					`base-modal--size-${r.size}`,
					{
						"base-modal--content-scrollable": r.contentScrollable,
						"base-modal--draggable": r.draggable,
						"base-modal--dragging": A.value,
						"base-modal--embedded": r.embedded,
						"base-modal--hoverable": r.hoverable,
						"base-modal--icon-top": r.iconPlacement === "top",
						"base-modal--loading": r.loading,
						"base-modal--mask-hidden": !r.showMask,
						"base-modal--no-preset": !r.preset,
						"base-modal--segmented-action": ve.value,
						"base-modal--segmented-content": ge.value,
						"base-modal--segmented-footer": _e.value
					}
				]],
				"data-testid": "base-modal",
				role: Ce.value,
				"aria-modal": "true",
				"aria-labelledby": me.value ? z : void 0,
				tabindex: "-1",
				style: [e(x).style, xe.value],
				onKeydown: rt,
				onPointerdown: Ke,
				onPointermove: qe,
				onPointerup: Je,
				onPointercancel: Je
			}), {
				default: M(() => [
					n.$slots.cover || r.cover ? (f(), I("div", {
						key: 0,
						class: t(["base-modal__cover", r.coverClass]),
						style: p(r.coverStyle)
					}, [c(n.$slots, "cover", {}, () => [r.cover ? (f(), J(e(s), {
						key: 0,
						render: r.cover
					}, null, 8, ["render"])) : N("", !0)], !0)], 6)) : N("", !0),
					ue.value || de.value || r.closable ? (f(), I("header", {
						key: 1,
						class: t(["base-modal__header", r.headerClass]),
						style: p(r.headerStyle)
					}, [c(n.$slots, "header", {}, () => [G("div", Zs, [le.value ? (f(), I("span", {
						key: 0,
						class: t(["base-modal__icon", `base-modal__icon--${r.type}`])
					}, [c(n.$slots, "icon", {}, () => [r.icon ? (f(), J(e(s), {
						key: 0,
						render: r.icon
					}, null, 8, ["render"])) : (f(), J(X, {
						key: 1,
						name: we.value,
						decorative: ""
					}, null, 8, ["name"]))], !0)], 2)) : N("", !0), me.value ? (f(), I("h2", {
						key: 1,
						id: z,
						class: t(["base-modal__title", r.titleClass]),
						style: p(r.titleStyle)
					}, [c(n.$slots, "title", {}, () => [r.title ? (f(), J(e(s), {
						key: 0,
						render: r.title
					}, null, 8, ["render"])) : N("", !0)], !0)], 6)) : N("", !0)])], !0), de.value || r.closable ? (f(), I("div", Qs, [de.value ? (f(), I("div", {
						key: 0,
						class: t(["base-modal__header-extra", r.headerExtraClass]),
						style: p(r.headerExtraStyle)
					}, [c(n.$slots, "header-extra", {}, () => [r.headerExtra ? (f(), J(e(s), {
						key: 0,
						render: r.headerExtra
					}, null, 8, ["render"])) : N("", !0)], !0)], 6)) : N("", !0), r.closable ? (f(), I("button", {
						key: 1,
						class: "base-modal__close",
						"data-testid": "base-modal-close",
						type: "button",
						tabindex: r.closeFocusable ? void 0 : -1,
						"aria-label": "关闭",
						onClick: i[0] ||= (e) => $e("close-button", e)
					}, [c(n.$slots, "close", {}, () => [D(X, {
						name: "close",
						decorative: ""
					})], !0)], 8, $s)) : N("", !0)])) : N("", !0)], 6)) : N("", !0),
					G("div", {
						class: t(["base-modal__body", r.contentClass]),
						style: p(be.value)
					}, [c(n.$slots, "default", {}, () => [r.content ? (f(), J(e(s), {
						key: 0,
						render: r.content
					}, null, 8, ["render"])) : N("", !0)], !0)], 6),
					fe.value ? (f(), I("footer", {
						key: 2,
						class: t(["base-modal__footer", r.footerClass]),
						style: p(r.footerStyle)
					}, [n.$slots.footer || r.footer ? (f(), I("div", ec, [c(n.$slots, "footer", {}, () => [r.footer ? (f(), J(e(s), {
						key: 0,
						render: r.footer
					}, null, 8, ["render"])) : N("", !0)], !0)])) : N("", !0), n.$slots.action || r.action || pe.value ? (f(), I("div", {
						key: 1,
						class: t(["base-modal__actions", r.actionClass]),
						style: p(r.actionStyle)
					}, [c(n.$slots, "action", {}, () => [
						r.action ? (f(), J(e(s), {
							key: 0,
							render: r.action
						}, null, 8, ["render"])) : N("", !0),
						!r.action && r.negativeText ? (f(), I("button", h({ key: 1 }, je.value, {
							class: ["base-modal__action-button base-modal__action-button--secondary", Ne.value],
							style: r.negativeButtonProps?.style,
							type: "button",
							disabled: Oe.value,
							onClick: i[1] ||= (e) => tt("negative", e)
						}), [Ee.value ? (f(), I("span", nc)) : N("", !0), G("span", null, K(r.negativeText), 1)], 16, tc)) : N("", !0),
						!r.action && r.positiveText ? (f(), I("button", h({ key: 2 }, Me.value, {
							class: ["base-modal__action-button", Pe.value],
							style: r.positiveButtonProps?.style,
							type: "button",
							disabled: De.value,
							onClick: i[2] ||= (e) => tt("positive", e)
						}), [Te.value ? (f(), I("span", ic)) : N("", !0), G("span", null, K(r.positiveText), 1)], 16, rc)) : N("", !0)
					], !0)], 6)) : N("", !0)], 6)) : N("", !0)
				]),
				_: 3
			}, 16, [
				"class",
				"role",
				"aria-labelledby",
				"style"
			]))], 38)), [[k, r.show]]) : N("", !0)]),
			_: 3
		})], 8, ["to", "disabled"]));
	}
}), [["__scopeId", "data-v-cfdf2c7c"]]), pc = /* @__PURE__ */ Y({
	inheritAttrs: !1,
	__name: "Modal",
	props: {
		action: {
			type: [String, Function],
			default: void 0
		},
		actionClass: { default: void 0 },
		actionStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		autoFocus: {
			type: Boolean,
			default: !0
		},
		blockScroll: {
			type: Boolean,
			default: !0
		},
		bodyStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		closable: {
			type: Boolean,
			default: !0
		},
		closeFocusable: {
			type: Boolean,
			default: !1
		},
		closeOnEsc: {
			type: Boolean,
			default: !0
		},
		content: {
			type: [String, Function],
			default: void 0
		},
		contentClass: { default: void 0 },
		contentScrollable: {
			type: Boolean,
			default: !1
		},
		contentStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		cover: {
			type: [String, Function],
			default: void 0
		},
		coverClass: { default: void 0 },
		coverStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		displayDirective: { default: "if" },
		draggable: {
			type: [Boolean, Object],
			default: !0
		},
		embedded: {
			type: Boolean,
			default: !1
		},
		footer: {
			type: [String, Function],
			default: void 0
		},
		footerClass: { default: void 0 },
		footerStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		headerExtra: {
			type: [String, Function],
			default: void 0
		},
		headerClass: { default: void 0 },
		headerExtraClass: { default: void 0 },
		headerExtraStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		headerStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		hoverable: {
			type: Boolean,
			default: !1
		},
		icon: {
			type: [String, Function],
			default: void 0
		},
		iconPlacement: { default: "left" },
		loading: {
			type: Boolean,
			default: !1
		},
		maskClosable: {
			type: Boolean,
			default: !0
		},
		negativeText: { default: void 0 },
		negativeButtonProps: { default: void 0 },
		onClose: {
			type: Function,
			default: void 0
		},
		onEsc: {
			type: Function,
			default: void 0
		},
		onNegativeClick: {
			type: Function,
			default: void 0
		},
		onPositiveClick: {
			type: Function,
			default: void 0
		},
		positiveText: { default: void 0 },
		positiveButtonProps: { default: void 0 },
		preset: { default: "card" },
		role: { default: void 0 },
		segmented: {
			type: [Boolean, Object],
			default: !1
		},
		show: {
			type: Boolean,
			default: !1
		},
		showIcon: {
			type: Boolean,
			default: !0
		},
		showMask: {
			type: Boolean,
			default: !0
		},
		size: { default: "medium" },
		tag: { default: "section" },
		title: {
			type: [String, Function],
			default: void 0
		},
		titleClass: { default: void 0 },
		titleStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		to: {
			type: [String, Boolean],
			default: "body"
		},
		trapFocus: {
			type: Boolean,
			default: !0
		},
		transformOrigin: { default: "mouse" },
		type: { default: "default" },
		width: { default: void 0 },
		zIndex: { default: void 0 }
	},
	emits: [
		"after-enter",
		"after-leave",
		"before-leave",
		"close",
		"esc",
		"mask-click",
		"negative-click",
		"positive-click",
		"update:show"
	],
	setup(t, { emit: n }) {
		let r = t, i = n, a = F(), o = j(() => r.preset === "confirm" ? "dialog" : r.preset), s = j(() => r.bodyStyle ? r.contentStyle ? [r.bodyStyle, r.contentStyle] : r.bodyStyle : r.contentStyle);
		return (n, r) => (f(), J(fc, h(e(a), {
			action: t.action,
			"action-class": t.actionClass,
			"action-style": t.actionStyle,
			"auto-focus": t.autoFocus,
			"block-scroll": t.blockScroll,
			"body-style": s.value,
			closable: t.closable,
			"close-focusable": t.closeFocusable,
			"close-on-esc": t.closeOnEsc,
			content: t.content,
			"content-class": t.contentClass,
			"content-scrollable": t.contentScrollable,
			cover: t.cover,
			"cover-class": t.coverClass,
			"cover-style": t.coverStyle,
			"data-modal-preset": t.preset,
			"data-modal-transform-origin": t.transformOrigin,
			"display-directive": t.displayDirective,
			draggable: t.draggable,
			embedded: t.embedded,
			footer: t.footer,
			"footer-class": t.footerClass,
			"footer-style": t.footerStyle,
			"header-extra": t.headerExtra,
			"header-class": t.headerClass,
			"header-extra-class": t.headerExtraClass,
			"header-extra-style": t.headerExtraStyle,
			"header-style": t.headerStyle,
			hoverable: t.hoverable,
			icon: t.icon,
			"icon-placement": t.iconPlacement,
			loading: t.loading,
			"mask-closable": t.maskClosable,
			"negative-button-props": t.negativeButtonProps,
			"negative-click-handler": t.onNegativeClick,
			"negative-text": t.negativeText,
			"positive-button-props": t.positiveButtonProps,
			"positive-click-handler": t.onPositiveClick,
			"positive-text": t.positiveText,
			"close-handler": t.onClose,
			"esc-handler": t.onEsc,
			preset: o.value,
			role: t.role,
			segmented: t.segmented,
			show: t.show,
			"show-icon": t.showIcon,
			"show-mask": t.showMask,
			size: t.size,
			tag: t.tag,
			title: t.title,
			"title-class": t.titleClass,
			"title-style": t.titleStyle,
			to: t.to,
			"trap-focus": t.trapFocus,
			"transform-origin": t.transformOrigin,
			type: t.type,
			width: t.width,
			"z-index": t.zIndex,
			onAfterEnter: r[0] ||= (e) => i("after-enter"),
			onAfterLeave: r[1] ||= (e) => i("after-leave"),
			onBeforeLeave: r[2] ||= (e) => i("before-leave"),
			onClose: r[3] ||= (e) => !t.onClose && i("close", e),
			onEsc: r[4] ||= (e) => !t.onEsc && i("esc"),
			onMaskClick: r[5] ||= (e) => i("mask-click", e),
			onNegativeClick: r[6] ||= (e) => !t.onNegativeClick && i("negative-click", e),
			onPositiveClick: r[7] ||= (e) => !t.onPositiveClick && i("positive-click", e),
			"onUpdate:show": r[8] ||= (e) => i("update:show", e)
		}), ne({ _: 2 }, [
			n.$slots.cover ? {
				name: "cover",
				fn: M(() => [c(n.$slots, "cover")]),
				key: "0"
			} : void 0,
			n.$slots.header ? {
				name: "header",
				fn: M(() => [c(n.$slots, "header")]),
				key: "1"
			} : void 0,
			n.$slots.icon ? {
				name: "icon",
				fn: M(() => [c(n.$slots, "icon")]),
				key: "2"
			} : void 0,
			n.$slots.title ? {
				name: "title",
				fn: M(() => [c(n.$slots, "title")]),
				key: "3"
			} : void 0,
			n.$slots["header-extra"] ? {
				name: "header-extra",
				fn: M(() => [c(n.$slots, "header-extra")]),
				key: "4"
			} : void 0,
			n.$slots.close ? {
				name: "close",
				fn: M(() => [c(n.$slots, "close")]),
				key: "5"
			} : void 0,
			n.$slots.default ? {
				name: "default",
				fn: M(() => [c(n.$slots, "default")]),
				key: "6"
			} : void 0,
			n.$slots.footer ? {
				name: "footer",
				fn: M(() => [c(n.$slots, "footer")]),
				key: "7"
			} : void 0,
			n.$slots.action ? {
				name: "action",
				fn: M(() => [c(n.$slots, "action")]),
				key: "8"
			} : void 0
		]), 1040, /* @__PURE__ */ "action.action-class.action-style.auto-focus.block-scroll.body-style.closable.close-focusable.close-on-esc.content.content-class.content-scrollable.cover.cover-class.cover-style.data-modal-preset.data-modal-transform-origin.display-directive.draggable.embedded.footer.footer-class.footer-style.header-extra.header-class.header-extra-class.header-extra-style.header-style.hoverable.icon.icon-placement.loading.mask-closable.negative-button-props.negative-click-handler.negative-text.positive-button-props.positive-click-handler.positive-text.close-handler.esc-handler.preset.role.segmented.show.show-icon.show-mask.size.tag.title.title-class.title-style.to.trap-focus.transform-origin.type.width.z-index".split(".")));
	}
}), mc = ["aria-describedby"], hc = {
	key: 0,
	class: "base-tooltip__arrow",
	"data-testid": "base-tooltip-arrow"
}, gc = 0, _c = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "Tooltip",
	props: {
		animated: {
			type: Boolean,
			default: !0
		},
		content: { default: void 0 },
		contentClass: { default: void 0 },
		contentStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		defaultShow: {
			type: Boolean,
			default: !1
		},
		delay: { default: 0 },
		disabled: {
			type: Boolean,
			default: !1
		},
		duration: { default: 120 },
		getDisabled: {
			type: Function,
			default: void 0
		},
		placement: { default: "top" },
		raw: {
			type: Boolean,
			default: !1
		},
		show: {
			type: Boolean,
			default: void 0
		},
		showArrow: {
			type: Boolean,
			default: !0
		},
		to: { default: "body" },
		trigger: { default: "hover" },
		width: { default: void 0 },
		zIndex: { default: 100200 }
	},
	emits: ["update:show"],
	setup(e, { expose: r, emit: i }) {
		let a = e, o = i, s = ce(), l = n(null), u = n(null), d = n(a.defaultShow), m = n({
			left: 0,
			top: 0
		}), h = `base-tooltip-${++gc}`, _, v, y = j(() => a.show !== void 0), b = j(() => a.show ?? d.value), x = j(() => a.disabled || !!a.getDisabled?.()), S = j(() => b.value && !x.value && !!(a.content || s.default)), C = j(() => a.animated ? "base-tooltip-transition" : ""), w = j(() => {
			if (!(a.width === void 0 || a.width === null || a.width === "")) return typeof a.width == "number" ? `${a.width}px` : a.width;
		}), T = j(() => ({
			"--base-tooltip-duration": `${Math.max(a.duration, 0)}ms`,
			left: `${m.value.left}px`,
			top: `${m.value.top}px`,
			width: w.value,
			zIndex: a.zIndex
		})), E = () => {
			_ !== void 0 && (window.clearTimeout(_), _ = void 0), v !== void 0 && (window.clearTimeout(v), v = void 0);
		}, k = (e) => {
			e && x.value || (y.value || (d.value = e), o("update:show", e), e && oe());
		}, A = () => {
			if (a.trigger === "manual") return;
			E();
			let e = Math.max(a.delay, 0);
			if (e > 0) {
				_ = window.setTimeout(() => k(!0), e);
				return;
			}
			k(!0);
		}, P = () => {
			a.trigger !== "manual" && (E(), k(!1));
		}, F = () => {
			a.trigger === "hover" && A();
		}, R = () => {
			a.trigger === "hover" && P();
		}, B = () => {
			a.trigger === "focus" && A();
		}, V = () => {
			a.trigger === "focus" && P();
		}, te = () => {
			a.trigger === "click" && (E(), k(!b.value));
		}, H = () => {
			E(), k(!1);
		}, ne = (e) => {
			let t = e.target;
			t && (l.value?.contains(t) || u.value?.contains(t) || H());
		}, re = (e) => {
			e.key === "Escape" && H();
		}, U = () => {
			S.value && oe();
		}, ae = (e, t, n) => Math.min(Math.max(e, t), n), q = (e, t) => {
			let n = a.showArrow ? 8 : 6, r = (t.width || w.value) && Number.parseFloat(String(w.value)) || t.width, i = t.height, o = e.left + e.width / 2 - r / 2, s = e.top - i - n;
			a.placement.startsWith("bottom") && (s = e.bottom + n), a.placement.startsWith("left") && (o = e.left - r - n, s = e.top + e.height / 2 - i / 2), a.placement.startsWith("right") && (o = e.right + n, s = e.top + e.height / 2 - i / 2), a.placement.endsWith("-start") && (a.placement.startsWith("top") || a.placement.startsWith("bottom") ? o = e.left : s = e.top), a.placement.endsWith("-end") && (a.placement.startsWith("top") || a.placement.startsWith("bottom") ? o = e.right - r : s = e.bottom - i);
			let c = Math.max(window.innerWidth - r - 8, 8), l = Math.max(window.innerHeight - i - 8, 8);
			return {
				left: ae(o, 8, c),
				top: ae(s, 8, l)
			};
		}, oe = async () => {
			await ee();
			let e = l.value, t = u.value;
			!e || !t || (m.value = q(e.getBoundingClientRect(), t.getBoundingClientRect()));
		};
		return W(S, (e) => {
			if (e) {
				document.addEventListener("keydown", re), a.trigger === "click" && document.addEventListener("pointerdown", ne), window.addEventListener("resize", U), window.addEventListener("scroll", U, !0), oe();
				return;
			}
			document.removeEventListener("keydown", re), document.removeEventListener("pointerdown", ne), window.removeEventListener("resize", U), window.removeEventListener("scroll", U, !0);
		}, { immediate: !0 }), W(() => [
			a.placement,
			a.width,
			a.showArrow
		], () => {
			S.value && oe();
		}), g(() => {
			E(), document.removeEventListener("keydown", re), document.removeEventListener("pointerdown", ne), window.removeEventListener("resize", U), window.removeEventListener("scroll", U, !0);
		}), r({ syncPosition: oe }), (n, r) => (f(), I(z, null, [G("span", {
			ref_key: "triggerRef",
			ref: l,
			class: "base-tooltip-trigger",
			"data-testid": "base-tooltip-trigger",
			"aria-describedby": S.value ? h : void 0,
			onMouseenterCapture: F,
			onMouseleaveCapture: R,
			onFocusin: B,
			onFocusout: V,
			onClick: te
		}, [c(n.$slots, "trigger", {}, void 0, !0)], 40, mc), (f(), J(O, { to: e.to }, [D(ie, { name: C.value }, {
			default: M(() => [S.value ? (f(), I("div", {
				key: 0,
				id: h,
				ref_key: "tooltipRef",
				ref: u,
				class: t(["base-tooltip", [
					`base-tooltip--${e.placement}`,
					{ "base-tooltip--raw": e.raw },
					e.contentClass
				]]),
				style: p([T.value, e.contentStyle]),
				"data-testid": "base-tooltip",
				role: "tooltip"
			}, [c(n.$slots, "default", {}, () => [L(K(e.content), 1)], !0), e.showArrow && !e.raw ? (f(), I("span", hc)) : N("", !0)], 6)) : N("", !0)]),
			_: 3
		}, 8, ["name"])], 8, ["to"]))], 64));
	}
}), [["__scopeId", "data-v-1b0c7cb0"]]), vc = (e) => !!(e && typeof e.then == "function"), yc = (e) => ({ ...e }), bc = (e) => {
	let { lockWhenPending: t, show: n, ...r } = e;
	return r;
}, xc = (e, t, n) => {
	if (!(!e && !t && !n)) return {
		...e,
		disabled: !!(e?.disabled || n),
		loading: !!(e?.loading || t)
	};
}, Sc = (e, t) => {
	for (let n of Object.keys(e)) n in t || delete e[n];
	Object.assign(e, t);
}, Cc = (e = {}) => {
	let t = yc(e), r = d(yc(e)), i = n(!!e.show), a = n(!1), o = n(!1), s = n(!1), c = pe({
		show: i.value,
		"onUpdate:show": (e) => {
			i.value = e;
		}
	}), l = j(() => a.value || o.value || s.value), u = (e, t, ...n) => {
		if (t) try {
			let r = t(...n);
			return vc(r) ? (e.value = !0, Promise.resolve(r).finally(() => {
				e.value = !1;
			})) : r;
		} catch (t) {
			throw e.value = !1, t;
		}
	}, f = (e) => {
		e && (r.value = {
			...r.value,
			...e
		}), i.value = !0;
	}, p = () => {
		i.value = !1;
	}, m = (e = !i.value) => {
		i.value = e;
	}, h = (e) => {
		r.value = {
			...r.value,
			...e
		};
	}, g = (e) => {
		r.value = {
			...t,
			...e
		}, i.value = !!r.value.show, a.value = !1, o.value = !1, s.value = !1;
	}, _ = () => {
		let e = bc(r.value), t = !!r.value.lockWhenPending && l.value, { loading: n, maskClosable: c, closable: d, closeOnEsc: f, negativeButtonProps: p, onClose: m, onNegativeClick: h, onPositiveClick: g, positiveButtonProps: _, ...v } = e;
		return {
			...v,
			closable: t ? !1 : d,
			closeOnEsc: t ? !1 : f,
			loading: !!(n || a.value),
			maskClosable: t ? !1 : c,
			negativeButtonProps: xc(p, o.value, t && !o.value),
			positiveButtonProps: xc(_, a.value, t && !a.value),
			show: i.value,
			...m ? { onClose: (e) => u(s, m, e) } : {},
			...h ? { onNegativeClick: (e) => u(o, h, e) } : {},
			...g ? { onPositiveClick: (e) => u(a, g, e) } : {},
			"onUpdate:show": (e) => {
				i.value = e;
			}
		};
	};
	return se(() => {
		Sc(c, _());
	}, { flush: "sync" }), {
		actionPending: l,
		close: p,
		closePending: s,
		negativePending: o,
		open: f,
		options: r,
		positivePending: a,
		props: c,
		reset: g,
		setOptions: h,
		toggle: m,
		visible: i
	};
}, wc = ["onMouseenter", "onMouseleave"], Tc = { class: "base-message__content" }, Ec = ["onClick"], Dc = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "MessageProvider",
	props: {
		closable: {
			type: Boolean,
			default: !1
		},
		containerClass: { default: void 0 },
		containerStyle: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: void 0
		},
		duration: { default: 3e3 },
		keepAliveOnHover: {
			type: Boolean,
			default: !1
		},
		max: { default: void 0 },
		placement: { default: "top" },
		to: { default: "body" }
	},
	setup(r) {
		let i = r, a = Y({
			name: "MessageRenderNode",
			props: { render: {
				type: [String, Function],
				required: !0
			} },
			setup(e) {
				return () => typeof e.render == "function" ? e.render() : e.render;
			}
		}), o = 0, s = n([]), l = j(() => [
			"base-message-container",
			`base-message-container--${i.placement}`,
			i.containerClass
		]), u = j(() => i.containerStyle), d = (e) => e === "success" ? "check" : e === "warning" ? "warning" : e === "error" ? "error" : e === "loading" ? "loading" : e === "info" ? "info" : "bell", m = (e) => {
			e.timerId &&= (window.clearTimeout(e.timerId), void 0);
		}, g = (e, t = !1) => {
			m(e);
			let n = s.value.findIndex((t) => t.id === e.id);
			n !== -1 && (t && e.onClose?.(), e.onLeave?.(), s.value.splice(n, 1), e.onAfterLeave?.());
		}, _ = (e) => ({
			closable: e.closable,
			content: e.content,
			icon: e.icon,
			onClose: () => g(e, !0),
			type: e.type
		}), y = (e) => {
			m(e), !(e.duration <= 0) && (e.remaining = e.duration, e.startedAt = Date.now(), e.timerId = window.setTimeout(() => g(e), e.remaining));
		}, b = (e) => {
			if (!e.keepAliveOnHover || !e.timerId) return;
			let t = Date.now() - e.startedAt;
			e.remaining = Math.max(e.remaining - t, 0), m(e);
		}, x = (e) => {
			!e.keepAliveOnHover || e.timerId || e.remaining <= 0 || (e.startedAt = Date.now(), e.timerId = window.setTimeout(() => g(e), e.remaining));
		}, C = (e, t) => t?.duration === void 0 ? e === "loading" ? 0 : i.duration : t.duration, w = () => {
			if (!(!i.max || i.max <= 0)) for (; s.value.length > i.max;) g(s.value[0]);
		}, T = (e) => ({
			get closable() {
				return e.closable;
			},
			set closable(t) {
				e.closable = t;
			},
			get content() {
				return e.content;
			},
			set content(t) {
				e.content = t, e.render = void 0;
			},
			get duration() {
				return e.duration;
			},
			set duration(t) {
				e.duration = t, y(e);
			},
			get icon() {
				return e.icon;
			},
			set icon(t) {
				e.icon = t;
			},
			get keepAliveOnHover() {
				return e.keepAliveOnHover;
			},
			set keepAliveOnHover(t) {
				e.keepAliveOnHover = t;
			},
			get showIcon() {
				return e.showIcon;
			},
			set showIcon(t) {
				e.showIcon = t;
			},
			get type() {
				return e.type;
			},
			set type(t) {
				e.type = t;
			},
			destroy: () => g(e)
		}), E = (e, t = {}) => {
			let n = t.type ?? "default", r = pe({
				closable: t.closable ?? i.closable,
				content: t.content ?? e,
				duration: C(n, t),
				icon: t.icon,
				id: `base-message-${++o}`,
				keepAliveOnHover: t.keepAliveOnHover ?? i.keepAliveOnHover,
				onAfterLeave: t.onAfterLeave,
				onClose: t.onClose,
				onLeave: t.onLeave,
				remaining: 0,
				render: t.render,
				showIcon: t.showIcon ?? !0,
				spinProps: t.spinProps,
				startedAt: 0,
				type: n
			});
			return s.value.push(r), w(), y(r), T(r);
		}, k = (e) => (t, n = {}) => E(t, {
			...n,
			type: e
		}), A = {
			create: E,
			destroyAll: () => {
				for (let e of [...s.value]) g(e);
			},
			error: k("error"),
			info: k("info"),
			loading: k("loading"),
			success: k("success"),
			warning: k("warning")
		};
		return v(Ao, A), W(() => i.max, () => w()), (n, i) => (f(), I(z, null, [c(n.$slots, "default", { message: A }, void 0, !0), (f(), J(O, { to: r.to }, [D(oe, {
			name: "base-message-transition",
			tag: "div",
			class: t(l.value),
			style: p(u.value),
			"data-testid": "base-message-container"
		}, {
			default: M(() => [(f(!0), I(z, null, S(s.value, (n) => (f(), I("div", {
				key: n.id,
				class: t(["base-message", [`base-message--${n.type}`, { "base-message--closable": n.closable }]]),
				"data-testid": "base-message",
				role: "status",
				onMouseenter: (e) => b(n),
				onMouseleave: (e) => x(n)
			}, [
				n.showIcon ? (f(), I("span", {
					key: 0,
					class: t(["base-message__icon", `base-message__icon--${n.type}`])
				}, [n.icon ? (f(), J(e(a), {
					key: 0,
					render: n.icon
				}, null, 8, ["render"])) : n.type === "loading" ? (f(), I("span", h({
					key: 1,
					class: "base-message__spinner",
					"aria-hidden": "true"
				}, { ref_for: !0 }, n.spinProps), null, 16)) : (f(), J(X, {
					key: 2,
					name: d(n.type),
					decorative: ""
				}, null, 8, ["name"]))], 2)) : N("", !0),
				G("span", Tc, [n.render ? (f(), J(e(a), {
					key: 0,
					render: () => n.render?.(_(n))
				}, null, 8, ["render"])) : (f(), J(e(a), {
					key: 1,
					render: n.content
				}, null, 8, ["render"]))]),
				n.closable ? (f(), I("button", {
					key: 1,
					class: "base-message__close",
					"data-testid": "base-message-close",
					type: "button",
					"aria-label": "关闭消息",
					onClick: (e) => g(n, !0)
				}, [D(X, {
					name: "close",
					decorative: ""
				})], 8, Ec)) : N("", !0)
			], 42, wc))), 128))]),
			_: 1
		}, 8, ["class", "style"])], 8, ["to"]))], 64));
	}
}), [["__scopeId", "data-v-3fb2b92c"]]), Oc = { class: "monaco-scrollable-element ide-monaco-menu__surface context-menu__surface" }, kc = { class: "context-menu-delete-confirm__layout" }, Ac = { class: "context-menu-delete-confirm__content" }, jc = { class: "context-menu-delete-confirm__title" }, Mc = { class: "context-menu-delete-confirm__message" }, Nc = 10, Pc = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "ContextMenu",
	props: { executeCommand: { type: Function } },
	setup(t) {
		let r = t, i = Tr(), a = n(null), o = n({
			x: i.x,
			y: i.y
		}), s = n(!1), c = n(null), l = !1, u = 0, d = (e, t) => r.executeCommand?.(e, t) ?? Ep.execute(e, t), m = (e) => !!(e && typeof e == "object"), _ = (e) => m(e) ? {
			name: typeof e.name == "string" ? e.name : void 0,
			path: typeof e.path == "string" ? e.path : void 0,
			type: typeof e.type == "string" ? e.type : void 0
		} : {}, v = (e) => {
			let t = e.trim();
			return !t || t === "/" ? t || "/" : t.split("/").filter(Boolean).at(-1) ?? t;
		}, y = j(() => _(c.value?.payload)), b = j(() => y.value.name ?? (y.value.path ? v(y.value.path) : "当前项目")), x = j(() => y.value.type === "folder" ? "文件夹" : "文件"), S = j(() => `确认删除${x.value} '${b.value}'？`), C = j(() => x.value === "文件夹" ? "此操作会删除该文件夹及其包含的内容，请确认后继续。" : "此操作会删除该文件内容，请确认后继续。");
		async function w() {
			let e = c.value;
			if (!e || T.actionPending.value) return !1;
			try {
				return await d(e.commandId, e.payload), !0;
			} catch (e) {
				return console.error("删除失败", e), !1;
			}
		}
		let T = Cc({
			lockWhenPending: !0,
			negativeText: "取消",
			onPositiveClick: w,
			positiveButtonProps: { type: "primary" },
			positiveText: "确认",
			preset: "dialog",
			role: "alertdialog",
			showIcon: !1,
			type: "warning",
			width: 420
		}), E = j(() => ({
			...T.props,
			positiveText: T.positivePending.value ? "处理中" : "确认"
		})), O = (e, t) => {
			c.value = {
				commandId: e,
				payload: t
			}, i.close(), T.open();
		}, k = () => {
			T.actionPending.value || (c.value = null);
		}, A = async (e) => {
			if (e.disabled || !e.commandId) return;
			let t = typeof e.payload == "function" ? e.payload() : e.payload;
			if (e.commandId === "file.delete") {
				O(e.commandId, t);
				return;
			}
			await d(e.commandId, t), i.close();
		}, F = (e) => {
			let t = a.value;
			return t ? e.composedPath().includes(t) : !1;
		}, L = (e) => {
			!i.visible || F(e) || i.close();
		}, R = (e) => {
			!i.visible || e.key !== "Escape" || i.close();
		}, B = () => {
			l ||= (document.addEventListener("pointerdown", L, !0), document.addEventListener("keydown", R), !0);
		}, V = () => {
			l &&= (document.removeEventListener("pointerdown", L, !0), document.removeEventListener("keydown", R), !1);
		}, te = () => window.innerHeight || document.documentElement.clientHeight || 0, H = () => window.innerWidth || document.documentElement.clientWidth || 0, ne = (e, t, n) => {
			if (n <= 0) return e;
			let r = Math.max(Nc, n - t - Nc);
			return Math.min(Math.max(e, Nc), r);
		}, re = async () => {
			let e = ++u;
			if (!i.visible) {
				s.value = !1;
				return;
			}
			let t = {
				x: i.x,
				y: i.y
			};
			if (o.value = t, s.value = !1, await ee(), e !== u || !i.visible) return;
			let n = a.value;
			if (!n) return;
			let r = te(), c = H(), l = n.getBoundingClientRect();
			o.value = {
				x: ne(t.x, l.width, c),
				y: ne(t.y, l.height, r)
			}, s.value = !0;
		};
		return W(() => i.visible, (e) => {
			e ? B() : V();
		}, {
			flush: "post",
			immediate: !0
		}), W(() => [
			i.visible,
			i.x,
			i.y,
			i.items.length
		], () => {
			re();
		}, {
			flush: "post",
			immediate: !0
		}), g(V), (t, n) => (f(), I(z, null, [e(i).visible ? (f(), I("div", {
			key: 0,
			ref_key: "menuRef",
			ref: a,
			class: "context-menu context-view monaco-component monaco-menu-container ide-monaco-menu",
			"data-testid": "context-menu",
			style: p({
				left: `${o.value.x}px`,
				top: `${o.value.y}px`,
				visibility: s.value ? "visible" : "hidden"
			}),
			role: "menu",
			onKeydown: n[0] ||= le((t) => e(i).close(), ["esc"]),
			onContextmenu: n[1] ||= P(() => {}, ["prevent"])
		}, [G("div", Oc, [D(Xs, {
			items: e(i).items,
			"item-class": "context-menu__item",
			"divider-class": "context-menu__divider",
			"surface-class": "context-menu__surface",
			onSelect: A
		}, null, 8, ["items"])])], 36)) : N("", !0), D(e(pc), h(E.value, {
			class: "context-menu-delete-confirm",
			onAfterLeave: k
		}), {
			default: M(() => [G("div", kc, [D(e(X), {
				class: "context-menu-delete-confirm__icon",
				name: "alert",
				size: 24,
				decorative: ""
			}), G("div", Ac, [G("h2", jc, K(S.value), 1), G("p", Mc, K(C.value), 1)])])]),
			_: 1
		}, 16)], 64));
	}
}), [["__scopeId", "data-v-5e821923"]]), Fc = (e) => e ? Array.isArray(e) ? e : [e] : [], Ic = (e) => `${e.order ?? 0}:${e.id}`, Lc = (e) => typeof e == "function", Rc = (e) => [
	e.targetPath,
	e.targetName,
	e.parentPath,
	e.targetType,
	e.extension ?? "",
	e.language ?? "",
	e.selectedPaths.join("\n"),
	e.selectedPaths.length > 1 ? "multiple" : "single",
	e.providerCapabilities.create ? "c" : "-",
	e.providerCapabilities.delete ? "d" : "-",
	e.providerCapabilities.rename ? "r" : "-",
	e.providerCapabilities.write ? "w" : "-",
	e.clipboard?.explorerTransfer ? "clipboard" : "-",
	String(e.clipboard?.version ?? 0)
].join("|"), zc = (e, t) => {
	if (e === "resource:file") return t.targetType === "file";
	if (e === "resource:folder") return t.targetType === "folder";
	if (e === "resource:explorer") return t.targetType === "explorer";
	if (e === "selection:single") return t.selectedPaths.length <= 1;
	if (e === "selection:multiple") return t.selectedPaths.length > 1;
	if (e.startsWith("capability:")) {
		let n = e.slice(11);
		return !!t.providerCapabilities[n];
	}
	return e.startsWith("ext:") ? t.extension === e.slice(4) : e === "clipboard:explorerTransfer" ? t.clipboard?.explorerTransfer === !0 : !0;
}, Bc = (e, t) => Fc(e).every((e) => typeof e == "string" ? zc(e, t) : e(t)), Vc = class {
	groupVersion = 0;
	groups = /* @__PURE__ */ new Map();
	items = /* @__PURE__ */ new Map();
	sortedGroups = null;
	sortedItemsByGroup = /* @__PURE__ */ new Map();
	get version() {
		return this.groupVersion;
	}
	registerMenuGroup(e) {
		this.groups.set(e.id, { ...e }), this.sortedGroups = null, this.groupVersion += 1;
	}
	registerMenuItem(e) {
		let t = this.items.get(e.id);
		this.items.set(e.id, { ...e }), t && this.sortedItemsByGroup.delete(t.group), this.sortedItemsByGroup.delete(e.group), this.groupVersion += 1;
	}
	unregisterMenuItem(e) {
		let t = this.items.get(e), n = this.items.delete(e);
		return n && (t && this.sortedItemsByGroup.delete(t.group), this.groupVersion += 1), n;
	}
	getGroups() {
		return this.sortedGroups ??= Array.from(this.groups.values()).filter((e) => e.visible !== !1).sort((e, t) => Ic(e).localeCompare(Ic(t))), this.sortedGroups.slice();
	}
	getItemsByGroup(e) {
		let t = this.sortedItemsByGroup.get(e);
		if (t) return t.slice();
		let n = Array.from(this.items.values()).filter((t) => t.group === e).sort((e, t) => Ic(e).localeCompare(Ic(t)));
		return this.sortedItemsByGroup.set(e, n), n.slice();
	}
}, Hc = class {
	cache = /* @__PURE__ */ new Map();
	cacheVersion = -1;
	constructor(e) {
		this.registry = e;
	}
	resolve(e) {
		this.cacheVersion !== this.registry.version && (this.cache.clear(), this.cacheVersion = this.registry.version);
		let t = Rc(e), n = this.cache.get(t);
		if (n) return n.map((e) => ({ ...e }));
		let r = [];
		for (let t of this.registry.getGroups()) {
			let n = this.registry.getItemsByGroup(t.id).filter((t) => Bc(t.when, e)).map((t) => this.resolveItem(t, e));
			n.length !== 0 && (r.length > 0 && r.push({
				id: `divider:${t.id}`,
				kind: "divider"
			}), r.push(...n));
		}
		return this.cache.set(t, r), r.map((e) => ({ ...e }));
	}
	resolveItem(e, t) {
		let n = e.payload;
		return {
			children: e.children?.filter((e) => Bc(e.when, t)).map((e) => this.resolveItem(e, t)),
			commandId: e.commandId,
			danger: e.danger,
			disabled: !Bc(e.enablement, t),
			id: e.id,
			keybinding: e.keybinding,
			label: e.label,
			payload: Lc(n) ? () => n(t) : n
		};
	}
}, Uc = new class {
	clipboardState = null;
	stateVersion = 0;
	get version() {
		return this.stateVersion;
	}
	getState() {
		return this.clipboardState ? { ...this.clipboardState } : null;
	}
	hasState() {
		return this.clipboardState !== null;
	}
	setState(e) {
		let t = e.path.trim();
		if (!t) {
			this.clear();
			return;
		}
		this.clipboardState = {
			operation: e.operation,
			path: t
		}, this.stateVersion += 1;
	}
	clear() {
		this.clipboardState && (this.clipboardState = null, this.stateVersion += 1);
	}
}(), Wc = "目录受保护，无法执行该操作。", Gc = new Set(["/.Recycle_bin", "/www/.Recycle_bin"]), Kc = new Set([".Recycle_bin", "Recycle_bin"]), qc = new Set([
	"/",
	"/www",
	"/root",
	"/boot",
	"/bin",
	"/etc",
	"/home",
	"/dev",
	"/sbin",
	"/var",
	"/usr",
	"/tmp",
	"/sys",
	"/proc",
	"/media",
	"/mnt",
	"/opt",
	"/lib",
	"/srv",
	"/selinux",
	"/www/server",
	"/www/server/data"
]), Jc = new Set([
	"/root",
	"/boot",
	"/bin",
	"/etc",
	"/home",
	"/dev",
	"/sbin",
	"/var",
	"/usr",
	"/tmp",
	"/sys",
	"/proc",
	"/media",
	"/mnt",
	"/opt",
	"/lib",
	"/srv",
	"/selinux",
	"/www/server"
]), Yc = new Set(/* @__PURE__ */ "/proc./dev./sys./tmp./var/log./var/run./var/spool./var/lock./var/mail./mnt./media./dev/shm./lib./lib64./lib32./usr/lib./usr/lib64./usr/local/lib./usr/local/lib64./usr/local/libexec./usr/local/sbin./usr/local/bin./www/server/data./www/server/mysql./www/server/redis./www/server/mongodb./www/server/nvm./www/server/pass./www/server/speed./www/server/docker./www/server/total./www/server/btwaf./www/server/pure-ftpd./www/server/phpmyadmin./www/server/rar./www/server/stop./www/server/nginx./www/server/apache./www/server/cron./www/server/php./www/server/tomcat./www/php_session".split(".")), Xc = new Set([
	"/",
	"/root",
	"/boot",
	"/bin",
	"/etc",
	"/dev",
	"/sbin",
	"/sys",
	"/proc",
	"/lib",
	"/usr"
]), Zc = Array.from(Gc), Qc = Array.from(Jc), $c = Array.from(Yc), el = Array.from(Xc), tl = (e) => {
	let t = e?.trim() || "/", n = t.startsWith("/") ? t : `/${t}`;
	return n === "/" ? "/" : n.replace(/\/+$/, "");
}, nl = (e) => tl(e).split("/").filter(Boolean), rl = (e, t) => {
	let n = tl(e), r = tl(t);
	return n === r || n.startsWith(`${r}/`);
}, il = (e, t) => {
	if (!e) return !1;
	let n = tl(e);
	return t.some((e) => rl(n, e));
}, al = (e) => {
	if (!e) return !1;
	let t = tl(e);
	return Zc.some((e) => rl(t, e)) ? !0 : nl(t).some((e) => Kc.has(e));
}, ol = (e) => {
	if (!e) return !1;
	let t = tl(e);
	return qc.has(t) || il(t, Qc);
}, sl = (e) => il(e, $c), cl = (e) => il(e, el), ll = () => ({
	allowed: !1,
	reason: Wc
}), ul = () => ({ allowed: !0 }), dl = (e) => {
	let t = e.sourcePath ? tl(e.sourcePath) : void 0, n = e.targetPath ? tl(e.targetPath) : void 0;
	return al(t) || al(n) ? ll() : e.operation === "browse" ? ul() : e.operation === "delete" ? ol(t) || sl(t) ? ll() : ul() : e.operation === "rename" || e.operation === "cut" ? ol(t) ? ll() : ul() : e.operation === "create" || e.operation === "paste" ? ol(n) || cl(n) ? ll() : ul() : e.operation === "move" && (ol(t) || ol(n) || cl(n)) ? ll() : ul();
}, fl = class extends Error {
	constructor(e) {
		super(e.reason ?? Wc), this.decision = e, this.name = "ExplorerOperationPolicyError";
	}
}, pl = {
	evaluate: dl,
	isDeleteForbiddenPath: sl,
	isPasteForbiddenPath: cl,
	isProtectedPath: ol,
	isRecyclePath: al,
	normalizePath: tl,
	protectedReason: Wc
}, ml = {
	create: !0,
	delete: !0,
	rename: !0,
	write: !0
}, hl = (e) => {
	let t = e.trim() || "/", n = t.lastIndexOf("/");
	return n <= 0 ? "/" : t.slice(0, n);
}, gl = (e, t) => {
	if (t !== "file") return;
	let n = e.lastIndexOf(".");
	if (!(n < 0 || n === e.length - 1)) return e.slice(n + 1).toLowerCase();
}, _l = (e) => e.targetPath, vl = (e) => e.parentPath, yl = (e, t) => pl.evaluate({
	operation: e,
	sourcePath: _l(t),
	targetPath: vl(t)
}).allowed, bl = (e) => pl.evaluate({
	operation: "create",
	targetPath: e.parentPath
}).allowed, xl = (e) => pl.evaluate({
	operation: "paste",
	targetPath: e.parentPath
}).allowed, Sl = (e) => yl("browse", e), Cl = (e) => yl("download", e), wl = (e, t = {}) => ({
	clipboard: {
		explorerTransfer: Uc.hasState(),
		version: Uc.version
	},
	extension: gl(e.name, e.type),
	language: e.type === "file" ? e.language : void 0,
	parentPath: e.type === "file" ? hl(e.path) : e.path,
	providerCapabilities: {
		...ml,
		...t.providerCapabilities
	},
	selectedPaths: t.selectedPaths?.length ? t.selectedPaths : [e.path],
	targetName: e.name,
	targetPath: e.path,
	targetType: e.type
}), Tl = new Hc((() => {
	let e = new Vc();
	return e.registerMenuGroup({
		id: "open",
		order: 10
	}), e.registerMenuGroup({
		id: "openToSide",
		order: 20
	}), e.registerMenuGroup({
		id: "transfer",
		order: 30
	}), e.registerMenuGroup({
		id: "create",
		order: 40
	}), e.registerMenuGroup({
		id: "createMore",
		order: 50
	}), e.registerMenuGroup({
		id: "copy",
		order: 60
	}), e.registerMenuGroup({
		id: "edit",
		order: 70
	}), e.registerMenuGroup({
		id: "properties",
		order: 75
	}), e.registerMenuGroup({
		id: "danger",
		order: 80
	}), e.registerMenuItem({
		commandId: "file.open",
		enablement: Sl,
		group: "open",
		id: "explorer.open",
		label: "打开",
		order: 10,
		payload: (e) => ({
			language: e.language ?? "plaintext",
			path: e.targetPath,
			title: e.targetName
		}),
		when: "resource:file"
	}), e.registerMenuItem({
		commandId: "file.openToSide",
		enablement: Sl,
		group: "openToSide",
		id: "explorer.openToSide",
		label: "从侧边打开",
		order: 20,
		payload: (e) => ({
			language: e.language ?? "plaintext",
			path: e.targetPath,
			title: e.targetName
		}),
		when: "resource:file"
	}), e.registerMenuItem({
		commandId: "file.openInIntegratedExplorer",
		enablement: Sl,
		group: "open",
		id: "explorer.openInIntegratedExplorer",
		label: "在资源管理器中打开",
		order: 25,
		payload: (e) => ({ path: e.targetPath }),
		when: "resource:folder"
	}), e.registerMenuItem({
		commandId: "workbench.action.openTerminal",
		enablement: Sl,
		group: "transfer",
		id: "explorer.openTerminal",
		label: "在集成终端中打开",
		order: 30,
		payload: (e) => ({ cwd: e.targetType === "folder" ? e.targetPath : e.parentPath })
	}), e.registerMenuItem({
		commandId: "file.newFile",
		enablement: ["capability:create", bl],
		group: "transfer",
		id: "explorer.newFile",
		label: "新建文件",
		order: 10,
		payload: (e) => ({
			...e.targetType === "folder" ? { anchorPath: e.targetPath } : {},
			parentPath: e.parentPath
		}),
		when: (e) => e.targetType !== "file"
	}), e.registerMenuItem({
		commandId: "file.newFolder",
		enablement: ["capability:create", bl],
		group: "createMore",
		id: "explorer.newFolder",
		label: "新建文件夹",
		order: 20,
		payload: (e) => ({
			...e.targetType === "folder" ? { anchorPath: e.targetPath } : {},
			parentPath: e.parentPath
		}),
		when: (e) => e.targetType !== "file"
	}), e.registerMenuItem({
		commandId: "file.download",
		enablement: Cl,
		group: "createMore",
		id: "explorer.download",
		label: "下载",
		order: 30,
		payload: (e) => ({ path: e.targetPath }),
		when: (e) => e.targetType !== "explorer"
	}), e.registerMenuItem({
		commandId: "file.cut",
		enablement: ["capability:write", (e) => yl("cut", e)],
		group: "createMore",
		id: "explorer.cut",
		label: "剪切",
		order: 40,
		payload: (e) => ({ path: e.targetPath }),
		when: (e) => e.targetType !== "explorer"
	}), e.registerMenuItem({
		commandId: "file.copy",
		enablement: (e) => yl("copy", e),
		group: "copy",
		id: "explorer.copy",
		label: "复制",
		order: 10,
		payload: (e) => ({ path: e.targetPath }),
		when: (e) => e.targetType !== "explorer"
	}), e.registerMenuItem({
		commandId: "file.paste",
		enablement: [
			"capability:write",
			"clipboard:explorerTransfer",
			xl
		],
		group: "edit",
		id: "explorer.paste",
		label: "粘贴",
		order: 10,
		payload: (e) => ({ parentPath: e.parentPath }),
		when: (e) => e.targetType !== "file"
	}), e.registerMenuItem({
		commandId: "file.copyPath",
		group: "edit",
		id: "explorer.copyPath",
		label: "复制路径",
		order: 20,
		payload: (e) => ({ path: e.targetPath })
	}), e.registerMenuItem({
		commandId: "file.openProperties",
		group: "properties",
		id: "explorer.properties",
		label: "属性",
		order: 10,
		payload: (e) => ({
			name: e.targetName,
			path: e.targetPath,
			type: e.targetType
		}),
		when: (e) => e.targetType !== "explorer"
	}), e.registerMenuItem({
		commandId: "file.rename",
		enablement: ["capability:rename", (e) => yl("rename", e)],
		group: "edit",
		id: "explorer.rename",
		label: "重命名",
		order: 30,
		payload: (e) => ({
			name: e.targetName,
			path: e.targetPath
		}),
		when: (e) => e.targetType !== "explorer"
	}), e.registerMenuItem({
		commandId: "file.delete",
		danger: !0,
		enablement: ["capability:delete", (e) => yl("delete", e)],
		group: "danger",
		id: "explorer.delete",
		label: "删除",
		order: 20,
		payload: (e) => ({
			name: e.targetName,
			path: e.targetPath,
			type: e.targetType
		}),
		when: (e) => e.targetType !== "explorer"
	}), e;
})()), El = {
	explorer: [
		"explorer.openTerminal",
		"divider:create",
		"explorer.newFile",
		"explorer.newFolder",
		"divider:copy",
		"explorer.paste",
		"explorer.copyPath"
	],
	file: [
		"explorer.open",
		"explorer.openToSide",
		"explorer.openTerminal",
		"divider:transfer",
		"explorer.download",
		"divider:edit",
		"explorer.cut",
		"explorer.copy",
		"divider:path",
		"explorer.copyPath",
		"divider:properties",
		"explorer.properties",
		"divider:danger",
		"explorer.rename",
		"explorer.delete"
	],
	folder: [
		"explorer.openInIntegratedExplorer",
		"explorer.openTerminal",
		"divider:create",
		"explorer.newFile",
		"explorer.newFolder",
		"divider:transfer",
		"explorer.download",
		"divider:copy",
		"explorer.cut",
		"explorer.copy",
		"explorer.paste",
		"divider:path",
		"explorer.copyPath",
		"divider:properties",
		"explorer.properties",
		"divider:danger",
		"explorer.rename",
		"explorer.delete"
	]
}, Dl = (e) => e.kind === "divider", Ol = (e, t) => {
	let n = new Map(t.filter((e) => !Dl(e)).map((e) => [e.id, e])), r = [], i = null;
	for (let t of El[e.targetType]) {
		if (t.startsWith("divider:")) {
			i = {
				id: t,
				kind: "divider"
			};
			continue;
		}
		let e = n.get(t);
		e && (i && r.length > 0 && r.push(i), i = null, r.push(e));
	}
	return r;
}, kl = (e) => Ol(e, Tl.resolve(e)), Al = { open(e) {
	let t = wl(e.node, e);
	Tr().open({
		items: kl(t),
		x: e.event.clientX,
		y: e.event.clientY
	});
} }, jl = (e) => ({
	name: e.name,
	path: e.path,
	type: e.type
}), Ml = (e, t) => {
	let n = t.filter((e) => e.selected);
	return e.selected && n.length > 0 ? n.map(jl) : [jl(e)];
}, Nl = (e, t) => {
	if (!e.length) return {
		allowed: !1,
		reason: "没有可移动的文件或文件夹。"
	};
	if (!t || t.type !== "folder") return {
		allowed: !1,
		reason: "只能拖放到文件夹目录。"
	};
	let n = Mo(t.path);
	for (let t of e) {
		let e = Mo(t.path);
		if (Mo(No(e)) === n) return {
			allowed: !1,
			reason: "文件已在目标目录中。"
		};
		if (t.type === "folder" && Fo(n, e)) return {
			allowed: !1,
			reason: "不能将文件夹移动到自身或子目录中。"
		};
		let r = pl.evaluate({
			operation: "move",
			sourcePath: e,
			targetPath: Po(n, t.name)
		});
		if (!r.allowed) return {
			allowed: !1,
			reason: r.reason
		};
	}
	return { allowed: !0 };
}, Pl = async (e) => {
	let t = Nl(e.draggedItems, e.targetNode);
	if (!t.allowed) return {
		ok: !1,
		reason: t.reason ?? "无法移动到目标目录。"
	};
	let n = Mo(e.targetNode.path), r = [];
	for (let t of e.draggedItems) {
		if (e.sourceExists && !await e.sourceExists(t.path)) return {
			ok: !1,
			reason: `源路径不存在：${t.path}`
		};
		if (await e.targetExists(n, t.name)) return {
			ok: !1,
			reason: `目标目录已存在同名文件或文件夹：${t.name}`
		};
		r.push({
			name: t.name,
			sourcePath: t.path,
			targetPath: Po(n, t.name),
			type: t.type
		});
	}
	return {
		ok: !0,
		moves: r,
		targetPath: n
	};
}, Fl = (e, t) => e ? `${e}.${t + 1}` : `${t + 1}`, Il = (e, t, n) => {
	let r = e.get(t);
	if (r) {
		r.push(n);
		return;
	}
	e.set(t, [n]);
}, Ll = (e) => ({
	id: e.id,
	parentId: e.parentId,
	path: e.path,
	name: e.name,
	type: e.type,
	depth: e.treeLayer,
	treeLayer: e.treeLayer,
	selected: e.isSelected,
	focused: e.isFocused,
	...e.type === "file" ? { language: e.meta.language ?? "plaintext" } : {},
	...e.type === "folder" ? { expanded: e.isExpanded } : {}
}), Rl = (e) => {
	let t = e.now ?? (() => globalThis.performance?.now?.() ?? Date.now()), n = t(), r = new Set(e.expandedFolderPaths), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = [], c = /* @__PURE__ */ new Set(), l = new Set(e.selectedPaths ?? []);
	e.selectedPath && l.add(e.selectedPath);
	let u = null, d = (t, n, f, p, m) => {
		let h = Fl(n, p), g = t.type === "folder" && r.has(t.path), _ = l.has(t.path), v = e.focusedPath === t.path, y = {
			id: h,
			parentId: n,
			treeLayer: f,
			type: t.type,
			name: t.name,
			path: t.path,
			isExpanded: g,
			isVisible: m,
			isLoaded: t.type === "folder" ? Array.isArray(t.children) : !0,
			isLoading: !1,
			loadError: null,
			isSelected: _,
			isFocused: v,
			isDragging: !1,
			isDropTarget: !1,
			meta: {
				...t.type === "file" ? { language: t.language ?? "plaintext" } : {},
				...typeof t.size == "number" ? { size: t.size } : {}
			}
		};
		if (i.set(h, y), o.set(t.path, h), Il(a, n, h), _ && c.add(h), v && (u = h), m && s.push(h), t.type !== "folder") return;
		let b = m && g;
		for (let [e, n] of (t.children ?? []).entries()) d(n, h, f + 1, e, b);
	};
	for (let [t, n] of e.fileTree.entries()) d(n, null, 0, t, !0);
	let f = t(), p = i.size;
	return {
		registry: i,
		visibleIds: s,
		childrenIndex: a,
		pathIndex: o,
		performance: {
			buildDurationMs: Math.max(0, f - n),
			childrenIndexCount: a.size,
			hiddenNodeCount: p - s.length,
			pathIndexCount: o.size,
			registryNodeCount: i.size,
			totalNodeCount: p,
			visibleNodeCount: s.length
		},
		expandedSet: r,
		selectedIds: c,
		focusedId: u,
		visibleNodes: s.map((e) => i.get(e)).filter((e) => !!e).map(Ll)
	};
}, zl = new class {
	getVisibleNodes(e, t, n = {}) {
		return this.getFlatTreeSnapshot(e, t, n).visibleNodes;
	}
	getFlatTreeSnapshot(e, t, n = {}) {
		return Rl({
			fileTree: e,
			expandedFolderPaths: t,
			selectedPath: n.selectedPath,
			selectedPaths: n.selectedPaths,
			focusedPath: n.focusedPath
		});
	}
}();
//#endregion
//#region ../../node_modules/.pnpm/vue-virtual-scroller@3.0.3_vue@3.5.34_typescript@6.0.3_/node_modules/vue-virtual-scroller/dist/keyField-D6okV6nC.js
function Bl(e) {
	return e == null ? "null" : typeof e == "function" ? "a function" : `'${e}'`;
}
function Vl(e, t, n) {
	if (!n) return t;
	let r = typeof n == "function" ? n(e, t) : e?.[n];
	if (r == null) throw Error(`Key is ${r} on item (keyField is ${Bl(n)})`);
	return r;
}
//#endregion
//#region ../../node_modules/.pnpm/vue-virtual-scroller@3.0.3_vue@3.5.34_typescript@6.0.3_/node_modules/vue-virtual-scroller/dist/useRecycleScroller-G2SVHG1u.js
function Hl(e, t, n) {
	return Vl(e, t, n);
}
function Ul(e, t) {
	return e.map((e, n) => Hl(e, n, t));
}
function Wl(e, t, n) {
	let r = [], i = [];
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = Hl(o, a, t), c = n(o, a, s);
		r.push(s), i.push(typeof c == "number" && c > 0 ? c : null);
	}
	return {
		keys: r,
		sizes: i
	};
}
function Gl(e, t, n) {
	if (!e || e.keys.length !== t.length || e.sizes.length !== t.length) return !1;
	for (let r = 0; r < t.length; r++) if (e.keys[r] !== Hl(t[r], r, n)) return !1;
	return !0;
}
function Kl(e, t, n) {
	if (!Gl(e, t, n)) return {};
	let r = {};
	for (let t = 0; t < e.keys.length; t++) {
		let n = e.sizes[t];
		typeof n == "number" && n > 0 && (r[e.keys[t]] = n);
	}
	return r;
}
function ql(e, t) {
	if (!e.length || t.length <= e.length) return 0;
	let n = e[0], r = t.indexOf(n);
	if (r <= 0 || r + e.length < t.length && e.length > t.length - r) return 0;
	for (let n = 0; n < e.length; n++) if (t[r + n] !== e[n]) return 0;
	return r;
}
function Jl(e, t, n, r, i, a = 0) {
	let o = i ?? "start";
	if (o === "nearest") {
		let i = n + r, o = e + t;
		return e >= n && o <= i ? null : e < n ? e + a : o - r + a;
	}
	return o === "end" ? e + t - r + a : o === "center" ? e + (t - r) / 2 + a : e + a;
}
function Yl(e) {
	return e.flowMode && e.direction === "vertical" && !e.gridItems ? "flow" : e.disableTransform ? "position" : "transform";
}
function Xl(e, t) {
	let n = t.direction === "vertical", r = t.mode ?? "transform", i = {
		visibility: e.nr.used ? "visible" : "hidden",
		pointerEvents: e.nr.used ? void 0 : "none"
	};
	if (r === "flow" ? i.display = e.nr.used ? void 0 : "none" : (i.position = "absolute", i.top = "0px", i.left = "0px", i.display = void 0), r === "position" ? (i[n ? "top" : "left"] = `${e.position}px`, i[n ? "left" : "top"] = `${e.offset}px`, i.transform = "none", i.willChange = "unset") : r === "transform" && (i.transform = n ? `translateY(${e.position}px) translateX(${e.offset}px)` : `translateX(${e.position}px) translateY(${e.offset}px)`, i.willChange = "transform"), t.gridItems && t.itemSize != null) {
		let e = t.itemSecondarySize || t.itemSize;
		i.width = `${n ? e : t.itemSize}px`, i.height = `${n ? t.itemSize : e}px`;
	}
	return i;
}
function Zl(e) {
	return j(() => _(e));
}
function Ql(e, t, n, r, i) {
	let a = Zl(e);
	return {
		el: j(() => {
			let e = a.value.el;
			return _(t ?? e);
		}),
		before: j(() => {
			let e = a.value.before;
			return _(n ?? e);
		}),
		after: j(() => {
			let e = a.value.after;
			return _(r ?? e);
		}),
		callbacks: {
			onResize: () => (i?.onResize ?? a.value.onResize)?.(),
			onVisible: () => (i?.onVisible ?? a.value.onVisible)?.(),
			onHidden: () => (i?.onHidden ?? a.value.onHidden)?.(),
			onUpdate: (e, t, n, r) => (i?.onUpdate ?? a.value.onUpdate)?.(e, t, n, r)
		}
	};
}
var $l = { itemsLimit: 1e3 };
function eu(e) {
	return typeof window < "u" && e === window;
}
var tu = (() => {
	if (typeof document > "u") return "negative";
	let e = document.createElement("div"), t = document.createElement("div");
	e.style.width = "4px", e.style.height = "1px", e.style.overflow = "auto", e.style.direction = "rtl", t.style.width = "8px", t.style.height = "1px", e.appendChild(t), document.body.appendChild(e), e.scrollLeft = -1;
	let n = e.scrollLeft < 0;
	return document.body.removeChild(e), n ? "negative" : "default";
})();
function nu(e, t, n) {
	return t !== "horizontal" || !n || eu(n) || getComputedStyle(n).direction !== "rtl" ? e : tu === "negative" ? -e : e;
}
function ru(e, t, n) {
	return nu(e, t, n);
}
function iu(e, t, n, r) {
	let i = ru(n, t, e), a = !!(r != null && r.smooth);
	if (eu(e)) {
		t === "vertical" ? e.scrollTo({
			top: i,
			behavior: a ? "smooth" : "auto"
		}) : e.scrollTo({
			left: i,
			behavior: a ? "smooth" : "auto"
		});
		return;
	}
	if (typeof e.scrollTo == "function") {
		e.scrollTo(t === "vertical" ? {
			top: i,
			behavior: a ? "smooth" : "auto"
		} : {
			left: i,
			behavior: a ? "smooth" : "auto"
		});
		return;
	}
	t === "vertical" ? e.scrollTop = i : e.scrollLeft = i;
}
function au(e, t, n) {
	return n ? t === "vertical" ? window.innerHeight : window.innerWidth : t === "vertical" ? e.clientHeight : e.clientWidth;
}
var ou = /auto|scroll/;
function su(e, t) {
	return e.parentNode === null ? t : su(e.parentNode, [...t, e]);
}
function cu(e, t) {
	return getComputedStyle(e, null).getPropertyValue(t);
}
function lu(e) {
	return cu(e, "overflow") + cu(e, "overflow-y") + cu(e, "overflow-x");
}
function uu(e) {
	return ou.test(lu(e));
}
function du(e) {
	if (!(e instanceof HTMLElement || e instanceof SVGElement)) return;
	let t = su(e.parentNode, []);
	for (let e = 0; e < t.length; e += 1) if (t[e] instanceof Element && uu(t[e])) return t[e];
	return document.scrollingElement || document.documentElement;
}
var fu = !1;
function pu() {
	return fu;
}
if (typeof window < "u") {
	fu = !1;
	try {
		let e = Object.defineProperty({}, "passive", { get() {
			fu = !0;
		} });
		window.addEventListener("test", null, e);
	} catch {}
}
function mu(e) {
	return typeof e == "number" ? e : null;
}
function hu(e, t, n, r, i) {
	return typeof n == "number" ? n : typeof n == "function" ? n(e, t) || r || void 0 : r || e?.[i ?? "size"] || void 0;
}
function gu(e, t, n, r, i, a) {
	return typeof n == "function" ? n(e, t) || r || Number(i) || 0 : r || e?.[a ?? "size"] || Number(i) || 0;
}
var _u = 0, vu = [];
function yu(e) {
	for (let t = 0; t < e.length; t++) e[t];
}
function bu(e, t) {
	return e && typeof e == "object" ? e[t] : void 0;
}
function xu(e, t) {
	return e.map((e) => bu(e, t));
}
function Su(e, t, n, r) {
	if (e.length !== n.length || t.length !== r.length) return !1;
	for (let i = 0; i < e.length; i++) if (e[i] !== n[i] || t[i] !== r[i]) return !1;
	return !0;
}
function Cu(e) {
	let t = e;
	t._vs_styleStamp++;
}
function wu(e) {
	let t = e;
	t._vs_visibilityStamp++, t._vs_styleStamp++;
}
function Tu(e, t, n, r) {
	if (n) {
		for (let e of n) r(e);
		return;
	}
	for (let n = e; n < t; n++) r(n);
}
var Eu = 8, Du = 1;
function Ou(e, t, r, a, c, l) {
	let u = Zl(e), d = Ql(u, t, r, a, c), f = j(() => {
		let e = _(q().items);
		return yu(e), e;
	}), p = n([]), h = n(0), v = n(0), y = n(0), b = n(!1), x = 0, S = 0, C = 0, w = 0, T = !1, E = /* @__PURE__ */ new Map(), D = /* @__PURE__ */ new Map(), O = !1, k = 0, A = 0, M = !1, N = null, P = null, F = null, I = 0, L = null, R = null, z = [], B = [], V = null, te = null, H = null, ne = !1, re = !1, U = !1, ie = /* @__PURE__ */ new Set(), G = n({}), K = [], ae = { accumulator: 0 };
	function q() {
		return u.value;
	}
	function oe() {
		return l?.pageMode ?? q().pageMode;
	}
	let se = j(() => _(q().enabled ?? !0)), ce = j(() => {
		let e = f.value;
		return e.length > 0 && typeof e[0] != "object";
	}), J = j(() => {
		let e = q();
		if (mu(e.itemSize) === null) {
			let t = f.value, n = Array.from({ length: t.length });
			ae.accumulator = 0, n[-1] = ae;
			let r = e.minItemSize, i = G.value, a = ce.value, o = 1e4, s = 0, c;
			for (let l = 0, u = t.length; l < u; l++) {
				let u = a ? l : Vl(t[l], l, e.keyField);
				c = gu(t[l], l, e.itemSize, i[u], r, e.sizeField), c < o && (o = c), s += c;
				let d = K[l] ?? (K[l] = {
					accumulator: 0,
					size: void 0
				});
				d.accumulator = s, d.size = c, n[l] = d;
			}
			return K.length = t.length, I = o, n;
		}
		return vu;
	}), le = j(() => p.value.filter((e) => (e._vs_visibilityStamp, e.nr.used)).sort((e, t) => e.nr.index - t.nr.index)), Y = j(() => {
		let e = q(), t = ce.value ? null : e.keyField;
		return Wl(f.value, t, (t, n, r) => hu(t, n, e.itemSize, G.value[r], e.sizeField));
	});
	function ue(e = q()) {
		return e.direction ?? "vertical";
	}
	function de(e = q()) {
		let t = ue(e), n = e.flowMode ?? !1;
		return n && t !== "vertical" && (re ||= (console.warn("[vue-recycle-scroller] flowMode only supports vertical lists. Falling back to standard positioning."), !0), n = !1), n && e.gridItems && (U ||= (console.warn("[vue-recycle-scroller] flowMode does not support gridItems. Falling back to standard positioning."), !0), n = !1), Yl({
			direction: t,
			disableTransform: e.disableTransform ?? !1,
			flowMode: n,
			gridItems: e.gridItems
		});
	}
	function fe() {
		p.value.sort((e, t) => e.nr.used === t.nr.used ? e.nr.used && t.nr.used ? e.nr.index - t.nr.index : e.nr.id - t.nr.id : e.nr.used ? -1 : 1);
	}
	function pe(e) {
		let t = q();
		return G.value = Kl(e, f.value, ce.value ? null : t.keyField), Object.keys(G.value).length > 0;
	}
	function me(e) {
		let t = D.get(e);
		return t || (t = [], D.set(e, t)), t;
	}
	function he(e, t, n, r, a) {
		let o = s({
			item: n,
			position: 0,
			offset: 0,
			nr: i({
				id: _u++,
				index: t,
				used: !0,
				key: r,
				type: a
			}),
			_vs_styleStamp: 0,
			_vs_visibilityStamp: 0
		});
		return e.push(o), o;
	}
	function ge(e) {
		let t = me(e);
		if (t && t.length) {
			let e = t.pop();
			return e.nr.used = !0, wu(e), e;
		}
	}
	function _e(e, t) {
		let n = p.value, r = n.indexOf(e);
		if (r === -1) return;
		let i = Math.max(0, Math.min(t, n.length - 1));
		r !== i && (n.splice(r, 1), n.splice(i, 0, e));
	}
	function ve(e) {
		_e(e, p.value.length - 1);
	}
	function ye() {
		let e = p.value, t = 0;
		for (; t < e.length && !e[t].nr.used;) t++;
		let n = 0;
		for (let r = t; r < e.length && e[r].nr.used; r++) n++;
		return {
			activeStart: t,
			activeCount: n,
			headInsertCount: 0
		};
	}
	function be(e, t, n) {
		let r = null;
		t < x ? (r = n.activeStart + n.headInsertCount, n.headInsertCount++, n.activeCount++) : t >= S && (r = n.activeStart + n.activeCount, n.activeCount++), r != null && _e(e, r);
	}
	function xe(e, t = !1) {
		let n = e.nr.type;
		me(n).push(e), e.nr.used = !1, e.position = q().hiddenPosition ?? -999999, wu(e), E.delete(e.nr.key), t && ve(e);
	}
	function Se() {
		E.clear(), D.clear();
		for (let e = 0, t = p.value.length; e < t; e++) {
			let t = p.value[e];
			t && xe(t);
		}
	}
	function Ce(e) {
		let t = -1;
		return t = requestAnimationFrame(() => {
			ie.delete(t), e();
		}), ie.add(t), t;
	}
	function we() {
		for (let e of ie) cancelAnimationFrame(e);
		ie.clear();
	}
	function Te() {
		N &&= (clearTimeout(N), null), P &&= (clearTimeout(P), null), F &&= (clearTimeout(F), null), te &&= (clearTimeout(te), null), H &&= (clearTimeout(H), null);
	}
	function Ee() {
		var e, t;
		se.value && ((t = (e = d.callbacks).onResize) == null || t.call(e), b.value && Ye(!1));
	}
	function De() {
		if (!se.value) return;
		V && !ne && Re();
		let e = q();
		if (!O) {
			if (O = !0, N) return;
			let t = () => Ce(() => {
				O = !1;
				let { continuous: t } = Ye(!1, !0);
				t || (P && clearTimeout(P), P = setTimeout(De, e.updateInterval + 100));
			});
			t(), e.updateInterval && (N = setTimeout(() => {
				N = null, O && t();
			}, e.updateInterval));
		}
	}
	function Oe(e, t) {
		var n, r, i, a;
		se.value && b.value && (e || t.boundingClientRect.width !== 0 || t.boundingClientRect.height !== 0 ? ((r = (n = d.callbacks).onVisible) == null || r.call(n), Ce(() => {
			Ye(!1);
		})) : (a = (i = d.callbacks).onHidden) == null || a.call(i));
	}
	function ke() {
		let e = d.el.value, t = e ? du(e) : void 0;
		return window.document && (t === window.document.documentElement || t === window.document.body) ? window : t || window;
	}
	function Ae() {
		let e = d.before.value;
		return e ? ue(q()) === "vertical" ? e.scrollHeight : e.scrollWidth : 0;
	}
	function je() {
		let e = d.el.value;
		if (!e) return {
			start: 0,
			end: 0
		};
		let t = ue(q()), n = t === "vertical", r;
		if (oe()) {
			let t = e.getBoundingClientRect(), i = n ? t.height : t.width, a = -(n ? t.top : t.left), o = n ? window.innerHeight : window.innerWidth;
			a < 0 && (o += a, a = 0), a + o > i && (o = i - a), r = {
				start: a,
				end: a + o
			};
		} else r = n ? {
			start: e.scrollTop,
			end: e.scrollTop + e.clientHeight
		} : {
			start: nu(e.scrollLeft, t, e),
			end: nu(e.scrollLeft, t, e) + e.clientWidth
		};
		return r;
	}
	function Me() {
		let e = d.el.value;
		if (!e) return {
			start: 0,
			end: 0
		};
		if (ue(q()) === "vertical") {
			let t = nu(e.scrollLeft, "horizontal", e);
			return {
				start: t,
				end: t + e.clientWidth
			};
		}
		return {
			start: e.scrollTop,
			end: e.scrollTop + e.clientHeight
		};
	}
	function Ne(e, t, n, r) {
		let i = Ae(), a = e.start - r - i, o = e.end + r - i;
		return x > 0 && a <= (n[x - 1]?.accumulator ?? 0) || x < t - 1 && a > (n[x]?.accumulator ?? Infinity) || S > 1 && o <= (n[S - 2]?.accumulator ?? 0) || S < t && o > (n[S - 1]?.accumulator ?? Infinity);
	}
	function Pe(e) {
		let t = q(), n = mu(t.itemSize);
		return n === null ? J.value[e]?.size || Number(t.minItemSize) || 0 : n;
	}
	function Fe(e) {
		let t = q();
		return Xl(e, {
			direction: ue(t),
			mode: de(t),
			itemSize: mu(t.itemSize),
			gridItems: t.gridItems,
			itemSecondarySize: t.itemSecondarySize
		});
	}
	function Ie(e) {
		let t = q(), n = t.gridItems || 1, r = mu(t.itemSize);
		return e <= 0 ? 0 : r === null ? J.value[e - 1]?.accumulator || 0 : Math.floor(e / n) * r;
	}
	function Le(e) {
		let t = q(), n = f.value.length, r = t.gridItems || 1, i = mu(t.itemSize);
		if (!n) return 0;
		if (i !== null) {
			let t = Math.floor(e / i) * r;
			return Math.min(Math.max(t, 0), n - 1);
		}
		let a = 0, o = n - 1, s = 0;
		for (; a <= o;) {
			let t = Math.floor((a + o) / 2);
			Ie(t) <= e ? (s = t, a = t + 1) : o = t - 1;
		}
		return s;
	}
	function Re() {
		te &&= (clearTimeout(te), null), V = null;
	}
	function ze() {
		te && clearTimeout(te), te = setTimeout(() => {
			V = null, te = null;
		}, 150);
	}
	function Be(e, t) {
		if (!e.length) {
			Re();
			return;
		}
		let n = Math.max(je().start - Ae(), 0), r = Math.min(Le(n), e.length - 1), i = e[r], a = t ? Vl(i, r, t) : r, o = Ae() + Ie(r);
		V = {
			key: a,
			offset: je().start - o
		};
	}
	function Ve(e) {
		if (!V) return !1;
		let t = q(), n = Ul(e ?? f.value, ce.value ? null : t.keyField).indexOf(V.key);
		if (n === -1) return Re(), !1;
		let r = Ae() + Ie(n) + V.offset, i = je().start;
		return Math.abs(r - i) < .5 ? !1 : (ne = !0, et(r), Ce(() => {
			ne = !1;
		}), !0);
	}
	function He() {
		if (Ue(), !se.value) return;
		let e = oe() ? ke() : d.el.value;
		e && (L = e, L.addEventListener("scroll", De, pu() ? { passive: !0 } : !1), oe() && (R = e, R.addEventListener("resize", Ee)));
	}
	function Ue() {
		L &&= (L.removeEventListener("scroll", De), null), R &&= (R.removeEventListener("resize", Ee), null);
	}
	function We(e, t, n, r, i, a) {
		let o = Math.ceil(e / t) * n, s = Math.max(0, Math.floor(i.start / n)), c = Math.min(Math.ceil(i.end / n), Math.ceil(e / t)), l = Math.max(0, Math.floor(a.start / r)), u = Math.min(Math.ceil(a.end / r), t), d = [];
		for (let n = s; n < c; n++) {
			let r = n * t;
			for (let t = l; t < u; t++) {
				let n = r + t;
				if (n >= e) break;
				d.push(n);
			}
		}
		let f = d[0] ?? 0, p = d.at(-1) ?? -1;
		return {
			renderedIndices: d,
			startIndex: f,
			endIndex: p + 1,
			visibleStartIndex: f,
			visibleEndIndex: p,
			totalSize: o
		};
	}
	function Ge() {
		let e = q(), t = mu(e.itemSize);
		if (!e.gridItems || t == null) return !1;
		let n = d.el.value;
		if (!n) return !1;
		let r = e.itemSecondarySize || t, i = ue(e) === "vertical" ? n.clientWidth : n.clientHeight;
		return r * e.gridItems > i;
	}
	function Ke(e, t, n, r) {
		if (Math.abs(e - t) !== 1 || t < 0 || t >= n) return e;
		let i = e > t ? Ie(t) + Pe(t) : Ie(t);
		return Math.abs(i - r) <= Eu ? t : e;
	}
	function qe(e, t, n, r, i) {
		if (Math.abs(e - t) !== 1) return e;
		let a = i ? t - 1 : t;
		if (a < 0 || a >= n) return e;
		let o = e > t ? Ie(a) + Pe(a) : Ie(a);
		return Math.abs(o - r) <= Eu ? t : e;
	}
	function Je(e, t, n) {
		let r = {
			...e,
			visibleStartIndex: Ke(e.visibleStartIndex, C, t, n.rawViewportStart),
			visibleEndIndex: qe(e.visibleEndIndex, w, t, n.rawViewportEnd, !1),
			startIndex: Ke(e.startIndex, x, t, n.renderStart),
			endIndex: qe(e.endIndex, S, t, n.renderEnd, !0)
		};
		r.startIndex > r.visibleStartIndex && (r.startIndex = r.visibleStartIndex);
		let i = Math.min(t, r.visibleEndIndex + 1);
		return r.endIndex < i && (r.endIndex = i), r.endIndex < r.startIndex && (r.endIndex = r.startIndex), r;
	}
	function Ye(e, t = !1) {
		var n, r;
		if (!se.value) return { continuous: !0 };
		let i = q(), a = mu(i.itemSize), o = i.gridItems || 1, s = i.itemSecondarySize || a || 0, c = I, l = i.typeField, u = ce.value ? null : i.keyField, m = f.value, g = m.length, _ = J.value, b = E, D = p.value, O = null, j = null, N, P, L, R, z, B = a !== null || g === 0 || _[g - 1] != null;
		if (!g || !B) N = P = R = z = L = 0;
		else if (M) N = R = 0, P = z = Math.min(i.prerender, m.length), L = 0;
		else {
			let e = je(), n = Me(), r = k, l = A, u = { ...e }, f = { ...n };
			if (t) {
				let t = e.start - r;
				t < 0 && (t = -t);
				let u = n.start - l;
				u < 0 && (u = -u);
				let d = a === null && Ne(e, g, _, i.buffer);
				if (!(a === null && (t >= c || d) || a !== null && t >= a) && !(o > 1 && a != null && u >= s)) return { continuous: !0 };
			}
			k = e.start, A = n.start;
			let p = i.buffer;
			u.start -= p, u.end += p, f.start -= p, f.end += p;
			let h = 0, v = d.before.value;
			v && (h = v.scrollHeight, u.start -= h);
			let y = d.after.value;
			if (y) {
				let e = y.scrollHeight;
				u.end += e;
			}
			let b = de(i) === "flow" && a === null && !t && T && Math.abs(e.start - r) <= Du && Math.abs(n.start - l) <= Du;
			if (a === null) {
				let t, n = 0, r = g - 1, i = ~~(g / 2), a;
				do
					a = i, t = _[i]?.accumulator ?? 0, t < u.start ? n = i : i < g - 1 && (_[i + 1]?.accumulator ?? Infinity) > u.start && (r = i), i = ~~((n + r) / 2);
				while (i !== a);
				for (i < 0 && (i = 0), N = i, L = _[g - 1]?.accumulator ?? 0, P = i; P < g && (_[P]?.accumulator ?? Infinity) < u.end; P++);
				for (P === -1 ? P = m.length - 1 : (P++, P > g && (P = g)), R = N; R < g && h + (_[R]?.accumulator ?? Infinity) < u.start; R++);
				for (z = R; z < g && h + (_[z]?.accumulator ?? Infinity) < u.end; z++);
				if (b) {
					let t = Je({
						startIndex: N,
						endIndex: P,
						visibleStartIndex: R,
						visibleEndIndex: z
					}, g, {
						rawViewportStart: e.start - h,
						rawViewportEnd: e.end - h,
						renderStart: e.start - p - h,
						renderEnd: e.end + p - h
					});
					N = t.startIndex, P = t.endIndex, R = t.visibleStartIndex, z = t.visibleEndIndex;
				}
			} else if (o > 1) {
				let e = We(g, o, a, s, u, f);
				O = e.renderedIndices, j = new Set(O), N = e.startIndex, P = e.endIndex, R = e.visibleStartIndex, z = e.visibleEndIndex, L = e.totalSize;
			} else {
				N = ~~(u.start / a * o);
				let e = N % o;
				N -= e, P = Math.ceil(u.end / a * o), R = Math.max(0, Math.floor((u.start - h) / a * o)), z = Math.floor((u.end - h) / a * o), N < 0 && (N = 0), P > g && (P = g), R < 0 && (R = 0), z > g && (z = g), L = Math.ceil(g / o) * a;
			}
		}
		P - N > $l.itemsLimit && Xe(), h.value = L, v.value = 0, y.value = de(i) === "flow" ? L : 0;
		let V, ee = N <= S && P >= x, te = de(i) === "flow", H = te && ee && !e, ne = null;
		if (!ee || e) Se();
		else {
			let e = (e) => {
				let t = D[e];
				if (t && (V = t, V.nr.used)) {
					let e = j ? j.has(V.nr.index) : V.nr.index >= N && V.nr.index < P, t = a || _[V.nr.index] && _[V.nr.index].size;
					(!e || !t) && xe(V, H);
				}
			};
			if (H) {
				for (let t = D.length - 1; t >= 0; t--) e(t);
				ne = ye();
			} else for (let t = 0, n = D.length; t < n; t++) e(t);
		}
		let re, U, ie = null, W = 0;
		return Tu(N, P, O, (e) => {
			let t = a || _[e] && _[e].size;
			if (!t) return;
			re = m[e];
			let n = u ? Vl(re, e, u) : e;
			V = b.get(n);
			let r = !1;
			if (V) V.item !== re && (V.item = re), V.nr.used || console.warn(`Expected existing view's used flag to be true, got ${V.nr.used}`);
			else {
				if (U = re[l], V = ge(U), V) {
					let t = V.nr.index !== e || V.nr.key !== n;
					V.item = re, V.nr.index = e, V.nr.key = n, V.nr.type !== U && console.warn("Reused view's type does not match pool's type"), t && Cu(V);
				} else V = he(D, e, re, n, U);
				b.set(n, V), r = !0;
			}
			a === null ? (V.position = _[e - 1]?.accumulator || 0, V.offset = 0) : (V.position = Math.floor(e / o) * a, V.offset = e % o * s), ne && r && be(V, e, ne), ie ??= V.position, W += t;
		}), te ? (ie == null ? (v.value = 0, y.value = L) : (v.value = ie, y.value = Math.max(0, L - ie - W)), H || fe()) : (v.value = 0, y.value = 0), x = N, S = P, C = R, w = z, T = !0, i.emitUpdate && ((r = (n = d.callbacks).onUpdate) == null || r.call(n, N, P, R, z)), de(i) !== "flow" && (F && clearTimeout(F), F = setTimeout(Qe, i.updateInterval + 300)), { continuous: ee };
	}
	function Xe() {
		throw H = setTimeout(() => {
			H = null, console.warn("It seems the scroller element isn't scrolling, so it tries to render all the items at once.", "Scroller:", d.el.value), console.warn("Make sure the scroller has a fixed height (or width) and 'overflow-y' (or 'overflow-x') set to 'auto' so it can scroll correctly and only render the items visible in the scroll viewport.");
		}), /* @__PURE__ */ Error("Rendered items limit reached");
	}
	function Ze() {
		if (Ge()) return !1;
		let e = p.value.filter(({ nr: e }) => e.used);
		for (let t = 1; t < e.length; t++) if (e[t].nr.index !== e[t - 1].nr.index + 1) return !0;
		return !1;
	}
	function Qe() {
		if (se.value) {
			if (de() === "flow") {
				fe();
				return;
			}
			p.value.sort((e, t) => e.nr.index - t.nr.index), Ze() && (Ye(!1), F && clearTimeout(F));
		}
	}
	function $e(e, t) {
		if (!se.value) return;
		let n = q(), r = ue(n), i = d.el.value;
		if (!i) return;
		let a = Math.max(0, Math.min(e, f.value.length - 1)), o = je().start, s = au(i, r, n.pageMode), c = Jl(Ie(a), Pe(a), o, s, t?.align, t?.offset ?? 0);
		if (c == null) return;
		et(c, t);
		let l = mu(n.itemSize);
		if (n.gridItems && l != null) {
			let e = d.el.value;
			if (!e) return;
			let i = n.gridItems, o = n.itemSecondarySize || l, s = a % i * o, c = r === "vertical" ? "horizontal" : "vertical", u = Jl(s, o, c === "horizontal" ? nu(e.scrollLeft, "horizontal", e) : e.scrollTop, c === "horizontal" ? e.clientWidth : e.clientHeight, t?.align, t?.offset ?? 0);
			u != null && iu(e, c, u, t);
		}
	}
	function et(e, t) {
		if (!se.value) return;
		let n = ue(q()), r = d.el.value;
		if (r) if (oe()) {
			let i = du(r), a = i.getBoundingClientRect(), o = r.getBoundingClientRect(), s = n === "vertical" ? "top" : "left", c = du(r) === document.documentElement || du(r) === document.body ? n === "vertical" ? window.scrollY : window.scrollX : nu(n === "vertical" ? i.scrollTop : i.scrollLeft, n, i), l = o[s] - a[s];
			iu(i.tagName === "HTML" ? window : i, n, e + c + l, t);
		} else iu(r, n, e, t);
	}
	let tt = q(), nt = f.value;
	return z = Ul(nt, nt.length > 0 && typeof nt[0] != "object" ? null : tt.keyField), B = xu(nt, tt.typeField), tt.cache && pe(tt.cache), se.value && tt.prerender && (M = !0, Ye(!1)), tt.gridItems && mu(tt.itemSize) == null && console.error("[vue-recycle-scroller] You must provide an itemSize when using gridItems"), o(() => {
		se.value && (He(), ee(() => {
			M = !1, Ye(!0), b.value = !0;
		}));
	}), m(() => {
		if (!se.value) return;
		let e = k;
		typeof e == "number" && ee(() => {
			et(e);
		});
	}), g(() => {
		Te(), we(), Ue();
	}), W(se, (e) => {
		e ? (He(), ee(() => {
			Ye(!0), b.value = !0;
		})) : (Ue(), Te(), we(), b.value = !1);
	}), W(() => q().cache, (e) => {
		se.value && (pe(e), Ye(!0));
	}), W(() => _(q().items).slice(), (e, t) => {
		if (!se.value) return;
		let n = q(), r = ce.value ? null : n.keyField, i = Ul(e, r), a = xu(e, n.typeField), o = z, s = !Su(i, a, o, B);
		n.shift && ql(o, i) > 0 ? Be(t ?? [], r) : Re(), z = i, B = a, Ve(e), Ye(s);
	}), W(() => q().keyField, () => {
		if (!se.value) return;
		let e = q(), t = ce.value ? null : e.keyField;
		z = Ul(f.value, t), B = xu(f.value, e.typeField), Re(), Ye(!0);
	}), W(() => q().typeField, () => {
		if (!se.value) return;
		let e = q();
		B = xu(f.value, e.typeField), Re(), Ye(!0);
	}), W(oe, () => {
		se.value && (Ue(), He(), Ye(!1));
	}), W(d.el, () => {
		se.value && (Ue(), He(), Ye(!1));
	}), W(J, () => {
		se.value && (Ve() && ze(), Ye(!1));
	}), W(() => q().gridItems, () => {
		se.value && Ye(!0);
	}), W(() => q().itemSecondarySize, () => {
		se.value && Ye(!0);
	}), {
		pool: p,
		visiblePool: le,
		totalSize: h,
		startSpacerSize: v,
		endSpacerSize: y,
		ready: b,
		sizes: J,
		simpleArray: ce,
		scrollToItem: $e,
		scrollToPosition: et,
		getScroll: je,
		findItemIndex: Le,
		getItemOffset: Ie,
		getItemSize: Pe,
		getViewStyle: Fe,
		cacheSnapshot: Y,
		restoreCache: pe,
		updateVisibleItems: Ye,
		handleResize: Ee,
		handleVisibilityChange: Oe,
		sortViews: Qe
	};
}
//#endregion
//#region ../../node_modules/.pnpm/vue-virtual-scroller@3.0.3_vue@3.5.34_typescript@6.0.3_/node_modules/vue-virtual-scroller/dist/scroller.css_vue_type_style_index_0_src_true_lang--7gJ3zh_.js
var ku = /* @__PURE__ */ new WeakMap();
function Au(e) {
	return typeof e == "function" ? {
		callback: e,
		observer: null,
		intersection: void 0,
		visible: null
	} : {
		callback: e.callback,
		observer: null,
		intersection: e.intersection,
		visible: null
	};
}
function ju(e, t) {
	Mu(e);
	let n = Au(t.value);
	if (ku.set(e, n), typeof IntersectionObserver > "u") {
		let t = e.getBoundingClientRect();
		n.visible = !0, n.callback(!0, { boundingClientRect: t });
		return;
	}
	n.observer = new IntersectionObserver((e) => {
		let t = e[0], r = !!(t != null && t.isIntersecting);
		n.visible !== null && n.visible === r || (n.visible = r, n.callback(r, t));
	}, n.intersection), n.observer.observe(e);
}
function Mu(e) {
	let t = ku.get(e);
	t != null && t.observer && (t.observer.disconnect(), t.observer = null);
}
var Nu = {
	mounted(e, t) {
		ju(e, t);
	},
	updated(e, t) {
		t.value !== t.oldValue && ju(e, t);
	},
	unmounted(e) {
		Mu(e), ku.delete(e);
	}
}, Pu = /* @__PURE__ */ Y({
	__name: "ItemView",
	props: {
		view: {},
		itemTag: {}
	},
	setup(e) {
		let t = e;
		return (e, n) => (f(), J(C(t.itemTag), { class: "vue-recycle-scroller__item-view" }, {
			default: M(() => [c(e.$slots, "default", {
				item: t.view.item,
				index: t.view.nr.index,
				active: t.view.nr.used
			})]),
			_: 3
		}));
	}
}), Fu = /* @__PURE__ */ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})(/* @__PURE__ */ Y({
	__name: "ResizeObserver",
	emits: ["notify"],
	setup(e, { emit: t }) {
		let r = t, i = n(), a = null, s = null;
		function c() {
			r("notify");
		}
		return o(() => {
			let e = i.value?.parentElement;
			if (e) {
				if (typeof ResizeObserver < "u") {
					a = new ResizeObserver(() => {
						c();
					}), a.observe(e);
					return;
				}
				s = () => c(), window.addEventListener("resize", s);
			}
		}), g(() => {
			a &&= (a.disconnect(), null), s &&= (window.removeEventListener("resize", s), null);
		}), (e, t) => (f(), I("div", {
			ref_key: "el",
			ref: i,
			class: "vue-recycle-scroller__resize-observer",
			"aria-hidden": "true"
		}, null, 512));
	}
}), [["__scopeId", "data-v-08cc04ab"]]), Iu = /* @__PURE__ */ Y({
	__name: "RecycleScroller",
	props: {
		items: {},
		keyField: { default: "id" },
		direction: { default: "vertical" },
		listTag: { default: "div" },
		itemTag: { default: "div" },
		itemSize: { default: null },
		gridItems: { default: void 0 },
		itemSecondarySize: { default: void 0 },
		minItemSize: { default: null },
		sizeField: { default: "size" },
		typeField: { default: "type" },
		buffer: { default: 200 },
		pageMode: {
			type: Boolean,
			default: !1
		},
		shift: {
			type: Boolean,
			default: !1
		},
		cache: { default: void 0 },
		prerender: { default: 0 },
		emitUpdate: {
			type: Boolean,
			default: !1
		},
		disableTransform: {
			type: Boolean,
			default: !1
		},
		flowMode: {
			type: Boolean,
			default: !1
		},
		hiddenPosition: { default: void 0 },
		updateInterval: { default: 0 },
		skipHover: {
			type: Boolean,
			default: !1
		},
		enabled: {
			type: Boolean,
			default: !0
		},
		listClass: { default: "" },
		itemClass: { default: "" }
	},
	emits: [
		"resize",
		"visible",
		"hidden",
		"update",
		"scrollStart",
		"scrollEnd"
	],
	setup(r, { expose: i, emit: a }) {
		let o = r, s = a, l = Nu, d = n(), m = n(), g = n(), _ = n(null), v = w(o, "items"), { pool: y, visiblePool: b, totalSize: x, startSpacerSize: T, endSpacerSize: E, ready: O, scrollToItem: k, scrollToPosition: A, getScroll: P, findItemIndex: F, getItemOffset: L, getItemSize: R, getViewStyle: B, cacheSnapshot: V, restoreCache: ee, updateVisibleItems: te, handleResize: ne, handleVisibilityChange: re } = Ou(j(() => ({
			items: v,
			el: d,
			before: m,
			after: g,
			keyField: o.keyField,
			direction: o.direction,
			itemSize: o.itemSize,
			gridItems: o.gridItems,
			itemSecondarySize: o.itemSecondarySize,
			minItemSize: o.minItemSize,
			sizeField: o.sizeField,
			typeField: o.typeField,
			buffer: o.buffer,
			pageMode: o.pageMode,
			shift: o.shift,
			cache: o.cache,
			prerender: o.prerender,
			emitUpdate: o.emitUpdate,
			disableTransform: o.disableTransform,
			flowMode: o.flowMode,
			hiddenPosition: o.hiddenPosition,
			updateInterval: o.updateInterval,
			enabled: o.enabled,
			onResize: () => s("resize"),
			onVisible: () => s("visible"),
			onHidden: () => s("hidden"),
			onUpdate: (e, t, n, r) => {
				s("update", e, t, n, r), n <= 0 && s("scrollStart"), r >= o.items.length - 1 && s("scrollEnd");
			}
		}))), U = j(() => Yl({
			direction: o.direction,
			disableTransform: o.disableTransform,
			flowMode: o.flowMode,
			gridItems: o.gridItems
		}) === "flow"), ie = j(() => ({ height: `${T.value}px` })), W = j(() => ({ height: `${E.value}px` }));
		function G(e) {
			_.value = e;
		}
		function K() {
			_.value = null;
		}
		let ae = j(() => {
			let e = { [o.direction === "vertical" ? "minHeight" : "minWidth"]: `${x.value}px` }, t = mu(o.itemSize);
			if (o.gridItems && t != null) {
				let n = (o.itemSecondarySize || t) * o.gridItems;
				e[o.direction === "vertical" ? "minWidth" : "minHeight"] = `${n}px`;
			}
			return e;
		});
		return i({
			el: d,
			visiblePool: b,
			startSpacerSize: T,
			endSpacerSize: E,
			scrollToItem: k,
			scrollToPosition: A,
			getScroll: P,
			findItemIndex: F,
			getItemOffset: L,
			getItemSize: R,
			cacheSnapshot: V,
			restoreCache: ee,
			updateVisibleItems: te
		}), (n, r) => H((f(), I("div", {
			ref_key: "el",
			ref: d,
			class: t(["vue-recycle-scroller", {
				"grid-mode": o.gridItems,
				"flow-mode": U.value,
				ready: e(O),
				"page-mode": o.pageMode,
				[`direction-${o.direction}`]: !0
			}])
		}, [
			n.$slots.before ? (f(), I("div", {
				key: 0,
				ref_key: "before",
				ref: m,
				class: "vue-recycle-scroller__slot"
			}, [c(n.$slots, "before")], 512)) : N("", !0),
			(f(), J(C(o.listTag), {
				style: p(ae.value),
				class: t(["vue-recycle-scroller__item-wrapper", o.listClass])
			}, {
				default: M(() => [
					U.value && e(T) > 0 ? (f(), J(C(o.itemTag), {
						key: 0,
						"aria-hidden": "true",
						class: "vue-recycle-scroller__item-spacer",
						style: p(ie.value)
					}, null, 8, ["style"])) : N("", !0),
					(f(!0), I(z, null, S(e(y), (t) => (f(), J(Pu, h({
						key: t.nr.id,
						view: t,
						"item-tag": o.itemTag,
						style: e(O) ? e(B)(t) : null,
						class: ["vue-recycle-scroller__item-view", [o.itemClass, { hover: !o.skipHover && _.value === t.nr.key }]]
					}, u(o.skipHover ? {} : {
						mouseenter: () => {
							G(t.nr.key);
						},
						mouseleave: () => {
							K();
						}
					})), {
						default: M((e) => [c(n.$slots, "default", h({ ref_for: !0 }, e))]),
						_: 2
					}, 1040, [
						"view",
						"item-tag",
						"style",
						"class"
					]))), 128)),
					U.value && e(E) > 0 ? (f(), J(C(o.itemTag), {
						key: 1,
						"aria-hidden": "true",
						class: "vue-recycle-scroller__item-spacer",
						style: p(W.value)
					}, null, 8, ["style"])) : N("", !0),
					o.items.length === 0 ? c(n.$slots, "empty", { key: 2 }) : N("", !0)
				]),
				_: 3
			}, 8, ["style", "class"])),
			n.$slots.after ? (f(), I("div", {
				key: 1,
				ref_key: "after",
				ref: g,
				class: "vue-recycle-scroller__slot"
			}, [c(n.$slots, "after")], 512)) : N("", !0),
			D(Fu, { onNotify: e(ne) }, null, 8, ["onNotify"])
		], 2)), [[e(l), e(re)]]);
	}
}), Lu = new Set(/* @__PURE__ */ "3d.android.apiblueprint.asciidoc.assembly.astro.audio.authors.babel.bazel.bibtex-style.bicep.biome.blender.browserlist.bruno.bun.c.certificate.changelog.clojure.cmake.console.cpp.csharp.css.css-map.cucumber.cypress.dart.database.diff.dll.docker.document.drawio.editorconfig.ejs.elixir.elm.erlang.esbuild.eslint.figma.file.folder.folder-components.folder-components-open.folder-config.folder-config-open.folder-docs.folder-docs-open.folder-images.folder-images-open.folder-node.folder-node-open.folder-open.folder-src.folder-src-open.folder-test.folder-test-open.font.fsharp.git.go.gradle.graphql.groovy.haml.handlebars.haskell.html.http.image.java.javascript.javascript-map.jest.jinja.jsconfig.json.jupyter.key.kotlin.laravel.less.license.liquid.lock.log.lua.makefile.markdown.mdx.mermaid.nginx.nim.nix.nodejs.npm.nunjucks.ocaml.odin.oxc.pdf.perl.php.playwright.pnpm.postcss.powerpoint.powershell.prettier.prisma.pug.python.qwik.r.raml.razor.react.react_ts.readme.riot.robot.rollup.ruby.rust.sass.scala.settings.sketch.slim.storybook.stylelint.stylus.svelte.svg.swagger.swc.swift.systemd.table.tailwindcss.terraform.todo.toml.tsconfig.tune.twig.typescript.typescript-def.uml.unocss.verilog.video.visualstudio.vite.vitest.vue.webpack.word.xml.yaml.yarn.zig.zip".split(".")), Ru = (e) => Lu.has(e), zu = {
	ts: "typescript",
	tsx: "react_ts",
	js: "javascript",
	jsx: "react",
	mjs: "javascript",
	cjs: "javascript",
	vue: "vue",
	json: "json",
	jsonc: "json",
	json5: "json",
	md: "markdown",
	markdown: "markdown",
	mdx: "mdx",
	html: "html",
	htm: "html",
	css: "css",
	scss: "sass",
	sass: "sass",
	less: "less",
	styl: "stylus",
	yaml: "yaml",
	yml: "yaml",
	toml: "toml",
	xml: "xml",
	svg: "svg",
	png: "image",
	jpg: "image",
	jpeg: "image",
	gif: "image",
	webp: "image",
	avif: "image",
	ico: "image",
	bmp: "image",
	tiff: "image",
	mp3: "audio",
	wav: "audio",
	flac: "audio",
	ogg: "audio",
	mp4: "video",
	mov: "video",
	avi: "video",
	mkv: "video",
	webm: "video",
	pdf: "pdf",
	doc: "word",
	docx: "word",
	xls: "excel",
	xlsx: "excel",
	ppt: "powerpoint",
	pptx: "powerpoint",
	csv: "table",
	tsv: "table",
	txt: "document",
	log: "log",
	env: "tune",
	ini: "settings",
	conf: "settings",
	config: "settings",
	lock: "lock",
	gitignore: "git",
	dockerignore: "docker",
	editorconfig: "editorconfig",
	npmrc: "npm",
	yarnrc: "yarn",
	pnpmfile: "pnpm",
	sh: "console",
	bash: "console",
	zsh: "console",
	fish: "console",
	ps1: "powershell",
	bat: "console",
	cmd: "console",
	py: "python",
	pyw: "python",
	ipynb: "jupyter",
	rb: "ruby",
	erb: "ruby",
	php: "php",
	phtml: "php",
	go: "go",
	rs: "rust",
	java: "java",
	class: "java",
	jar: "java",
	kt: "kotlin",
	kts: "kotlin",
	scala: "scala",
	swift: "swift",
	c: "c",
	h: "c",
	cpp: "cpp",
	cxx: "cpp",
	cc: "cpp",
	hpp: "cpp",
	cs: "csharp",
	fs: "fsharp",
	fsx: "fsharp",
	vb: "visualstudio",
	dart: "dart",
	lua: "lua",
	r: "r",
	pl: "perl",
	pm: "perl",
	perl: "perl",
	ex: "elixir",
	exs: "elixir",
	erl: "erlang",
	hrl: "erlang",
	clj: "clojure",
	cljs: "clojure",
	cljc: "clojure",
	edn: "clojure",
	hs: "haskell",
	lhs: "haskell",
	elm: "elm",
	ml: "ocaml",
	mli: "ocaml",
	nim: "nim",
	zig: "zig",
	odin: "odin",
	v: "v",
	sv: "verilog",
	svh: "verilog",
	vhdl: "vhdl",
	vhd: "vhdl",
	asm: "assembly",
	s: "assembly",
	wasm: "wasm",
	wat: "wasm",
	sql: "database",
	sqlite: "database",
	db: "database",
	graphql: "graphql",
	gql: "graphql",
	proto: "protobuf",
	thrift: "thrift",
	gradle: "gradle",
	groovy: "groovy",
	makefile: "makefile",
	mk: "makefile",
	cmake: "cmake",
	bazel: "bazel",
	bzl: "bazel",
	nix: "nix",
	tf: "terraform",
	tfvars: "terraform",
	hcl: "terraform",
	nomad: "terraform",
	dockerfile: "docker",
	compose: "docker",
	nginx: "nginx",
	apache: "apache",
	htaccess: "apache",
	graphqls: "graphql",
	prisma: "prisma",
	svelte: "svelte",
	astro: "astro",
	solid: "solid",
	qwik: "qwik",
	riot: "riot",
	handlebars: "handlebars",
	hbs: "handlebars",
	mustache: "mustache",
	ejs: "ejs",
	pug: "pug",
	jade: "pug",
	njk: "nunjucks",
	liquid: "liquid",
	twig: "twig",
	jinja: "jinja",
	jinja2: "jinja",
	razor: "razor",
	cshtml: "razor",
	vbhtml: "razor",
	blade: "laravel",
	latte: "latte",
	haml: "haml",
	slim: "slim",
	postcss: "postcss",
	pcss: "postcss",
	tailwind: "tailwindcss",
	unocss: "unocss",
	eslint: "eslint",
	prettier: "prettier",
	stylelint: "stylelint",
	babel: "babel",
	browserslistrc: "browserlist",
	vite: "vite",
	webpack: "webpack",
	rollup: "rollup",
	esbuild: "esbuild",
	swc: "swc",
	biome: "biome",
	oxc: "oxc",
	jest: "jest",
	vitest: "vitest",
	cypress: "cypress",
	playwright: "playwright",
	storybook: "storybook",
	npmignore: "npm",
	nvmrc: "nodejs",
	node: "nodejs",
	bun: "bun",
	lockb: "bun",
	yarn: "yarn",
	pnpm: "pnpm",
	gemfile: "ruby",
	gemspec: "ruby",
	podspec: "ruby",
	cocoapods: "ruby",
	cargo: "rust",
	rake: "ruby",
	"blade.php": "laravel",
	"d.ts": "typescript-def",
	"d.mts": "typescript-def",
	"d.cts": "typescript-def",
	"min.js": "javascript",
	map: "javascript-map",
	"css.map": "css-map",
	"js.map": "javascript-map",
	"wasm.map": "wasm",
	LICENSE: "license",
	license: "license",
	copying: "license",
	changelog: "changelog",
	authors: "authors",
	contributors: "authors",
	readme: "readme",
	todo: "todo",
	diff: "diff",
	patch: "diff",
	crt: "certificate",
	cer: "certificate",
	pem: "certificate",
	key: "key",
	pub: "key",
	asc: "key",
	gpg: "key",
	zip: "zip",
	gz: "zip",
	tgz: "zip",
	bz2: "zip",
	xz: "zip",
	"7z": "zip",
	rar: "zip",
	tar: "zip",
	apk: "android",
	aab: "android",
	ipa: "apple",
	dmg: "apple",
	pkg: "package",
	deb: "debian",
	rpm: "redhat",
	msi: "windows",
	exe: "windows",
	dll: "dll",
	so: "dll",
	dylib: "dll",
	o: "binary",
	obj: "binary",
	bin: "binary",
	dat: "binary",
	pkl: "binary",
	pickle: "binary",
	parquet: "database",
	avro: "database",
	orc: "database",
	ndjson: "json",
	jsonl: "json",
	http: "http",
	rest: "http",
	bruno: "bruno",
	bru: "bruno",
	graphqlconfig: "graphql",
	openapi: "swagger",
	swagger: "swagger",
	raml: "raml",
	apib: "apiblueprint",
	bicep: "bicep",
	psm1: "powershell",
	psd1: "powershell",
	psql: "database",
	mongo: "database",
	redis: "redis",
	service: "systemd",
	timer: "systemd",
	socket: "systemd",
	timerunit: "systemd",
	desktop: "linux",
	plist: "apple",
	profile: "console",
	csh: "console",
	ksh: "console",
	awk: "console",
	sed: "console",
	regex: "regex",
	re: "regex",
	tex: "latex",
	latex: "latex",
	bib: "bibtex",
	bst: "bibtex-style",
	cls: "latex",
	sty: "latex",
	rst: "restructuredtext",
	adoc: "asciidoc",
	asciidoc: "asciidoc",
	mmd: "mermaid",
	mermaid: "mermaid",
	drawio: "drawio",
	plantuml: "plantuml",
	puml: "plantuml",
	uxf: "uml",
	fig: "figma",
	sketch: "sketch",
	blend: "blender",
	fbx: "3d",
	obj3d: "3d",
	gltf: "3d",
	glb: "3d",
	stl: "3d",
	step: "3d",
	stp: "3d",
	dae: "3d",
	dae3d: "3d",
	ttf: "font",
	otf: "font",
	woff: "font",
	woff2: "font",
	eot: "font",
	sqlite3: "database",
	mdb: "database",
	accdb: "database",
	ora: "database",
	dbf: "database",
	dotenv: "tune",
	properties: "settings",
	prefs: "settings",
	feature: "cucumber",
	steps: "cucumber",
	robot: "robot",
	spec: "test",
	test: "test",
	snap: "test",
	coverage: "coverage",
	lcov: "coverage",
	nfo: "info",
	ignore: "git",
	gitattributes: "git",
	gitmodules: "git",
	mailmap: "git"
}, Bu = {
	"package.json": "nodejs",
	"package-lock.json": "npm",
	"pnpm-lock.yaml": "pnpm",
	"yarn.lock": "yarn",
	"vite.config.ts": "vite",
	"vite.config.js": "vite",
	"tsconfig.json": "tsconfig",
	"jsconfig.json": "jsconfig",
	Dockerfile: "docker",
	Makefile: "makefile",
	LICENSE: "license",
	README: "readme"
}, Vu = {
	src: "folder-src",
	source: "folder-src",
	node_modules: "folder-node",
	components: "folder-components",
	test: "folder-test",
	tests: "folder-test",
	docs: "folder-docs",
	images: "folder-images",
	assets: "folder-images",
	config: "folder-config"
}, Hu = "file", Uu = (e) => e.trim(), Wu = (e) => `file-icon-${e}`, Gu = (e, t) => {
	let n = Wu(e);
	return {
		id: e,
		symbolId: n,
		href: `#${n}`,
		fallback: t
	};
}, Ku = (e, t = Hu) => Ru(e) ? Gu(e, !1) : Gu(Ru(t) ? t : Hu, !0), qu = (e) => {
	let t = Uu(e).toLowerCase(), n = t.split(".").filter(Boolean);
	if (n.length <= 1) return [t];
	let r = [];
	for (let e = 0; e < n.length - 1; e += 1) r.push(n.slice(e).join("."));
	return r.push(n.at(-1) ?? t), r;
}, Ju = (e) => {
	if (e.type === "folder") {
		let t = Vu[Uu(e.name).toLowerCase()];
		return t ? Ku(e.expanded ? `${t}-open` : t, e.expanded ? "folder-open" : "folder") : Ku(e.expanded ? "folder-open" : "folder", "folder");
	}
	let t = Uu(e.name), n = Bu[t] ?? Bu[t.toLowerCase()];
	if (n) return Ku(n);
	for (let e of qu(t)) {
		let t = zu[e];
		if (t) return Ku(t);
	}
	return {
		...Ku(Hu),
		fallback: !0
	};
}, Yu = [
	"aria-level",
	"aria-expanded",
	"aria-busy",
	"aria-selected",
	"data-node-id",
	"data-path",
	"title",
	"onKeydown"
], Xu = { class: "file-tree-item__content" }, Zu = {
	class: "file-tree-item__chevron",
	"aria-hidden": "true"
}, Qu = ["data-icon-id"], $u = ["href"], ed = { class: "file-tree-item__name" }, td = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "FileTreeItem",
	props: {
		node: {},
		active: { type: Boolean },
		dropScope: { type: Boolean },
		dropTarget: { type: Boolean },
		loading: { type: Boolean }
	},
	emits: [
		"toggle-folder",
		"open-file",
		"item-contextmenu",
		"select-item"
	],
	setup(e, { emit: n }) {
		let r = e, i = n, a = j(() => r.node.treeLayer ?? r.node.depth), o = j(() => ({ "--file-tree-indent": `${a.value * 10 + 6}px` })), s = j(() => pl.evaluate({
			operation: "browse",
			sourcePath: r.node.path
		}).allowed), c = j(() => pl.isProtectedPath(r.node.path)), l = j(() => pl.isRecyclePath(r.node.path)), u = j(() => r.node.type === "folder" && s.value), d = j(() => u.value ? r.loading ? "codicon-loading" : r.node.expanded ? "codicon-chevron-down" : "codicon-chevron-right" : ""), m = j(() => Ju({
			type: r.node.type,
			name: r.node.name,
			expanded: r.node.expanded
		})), h = j(() => l.value ? `${r.node.name}\n回收站目录，用于存放已删除文件。禁止打开、展开、折叠、浏览内容、删除、重命名、移动、剪切、复制、粘贴、清空。` : c.value ? `${r.node.name}\n系统保护目录，用于系统运行。禁止删除、重命名、移动、剪切、粘贴、覆盖、修改权限。` : r.node.path), g = (e) => {
			if (e instanceof MouseEvent && (e.metaKey || e.ctrlKey || e.shiftKey)) {
				i("select-item", {
					node: r.node,
					event: e
				});
				return;
			}
			if (r.node.type === "folder") {
				if (r.loading || !s.value) return;
				i("toggle-folder", r.node.path);
				return;
			}
			i("open-file", r.node);
		}, _ = (e) => {
			i("item-contextmenu", {
				node: r.node,
				event: e
			});
		};
		return (n, r) => (f(), I("div", {
			class: t(["file-tree-item", {
				"file-tree-item--folder": e.node.type === "folder",
				"file-tree-item--active": e.active,
				"file-tree-item--focused": e.node.focused,
				"file-tree-item--restricted": !s.value,
				"file-tree-item--selected": e.node.selected,
				"file-tree-item--drop-scope": e.dropScope,
				"file-tree-item--drop-target": e.dropTarget
			}]),
			role: "treeitem",
			tabindex: "0",
			draggable: "false",
			"aria-level": e.node.depth + 1,
			"aria-expanded": u.value ? !!e.node.expanded : void 0,
			"aria-busy": e.loading ? "true" : void 0,
			"aria-selected": e.active || e.node.selected ? "true" : "false",
			"data-node-id": e.node.id,
			"data-path": e.node.path,
			"data-testid": "file-tree-item",
			title: h.value,
			style: p(o.value),
			onClick: g,
			onDragstart: r[0] ||= P(() => {}, ["prevent"]),
			onKeydown: [le(P(g, ["prevent"]), ["enter"]), le(P(g, ["prevent"]), ["space"])],
			onContextmenu: P(_, ["prevent"])
		}, [G("span", Xu, [
			G("span", Zu, [d.value ? (f(), J(X, {
				key: 0,
				name: d.value,
				class: t({ "file-tree-item__loading-icon": e.loading }),
				decorative: ""
			}, null, 8, ["name", "class"])) : N("", !0)]),
			(f(), I("svg", {
				class: "file-tree-item__asset-icon",
				"data-icon-id": m.value.id,
				"aria-hidden": "true",
				focusable: "false"
			}, [G("use", { href: m.value.href }, null, 8, $u)], 8, Qu)),
			G("span", ed, K(e.node.name), 1)
		])], 46, Yu));
	}
}), [["__scopeId", "data-v-6a19b261"]]), nd = ["data-icon-id"], rd = ["href"], id = ["placeholder", "onKeydown"], ad = 120, od = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "InlineFileInput",
	props: {
		cancelOnBlur: {
			type: Boolean,
			default: !1
		},
		confirmOnBlur: {
			type: Boolean,
			default: !0
		},
		initialValue: { default: "" },
		kind: { default: "file" },
		placeholder: { default: "名称" }
	},
	emits: ["confirm", "cancel"],
	setup(e, { emit: t }) {
		let r = e, i = t, a = n(r.initialValue), s = n(null), c = n(null), l = !1, u = null, d = !1, p = j(() => Ju({
			type: r.kind,
			name: r.kind === "folder" ? "folder" : a.value.trim() || "untitled.txt"
		})), m = () => {
			let e = a.value.trim();
			if (!e) {
				i("cancel");
				return;
			}
			i("confirm", e);
		}, h = () => {
			if (r.cancelOnBlur) {
				if (d) {
					d = !1, i("cancel");
					return;
				}
				ee(() => {
					c.value?.focus();
				});
				return;
			}
			if (!r.confirmOnBlur) {
				ee(() => {
					c.value?.focus();
				});
				return;
			}
			if (!a.value.trim()) {
				if (!l) return;
				if (d) {
					d = !1, m();
					return;
				}
				ee(() => {
					c.value?.focus();
				});
				return;
			}
			m();
		}, _ = (e) => {
			let t = e.target;
			t instanceof Node && (d = !s.value?.contains(t));
		};
		return o(async () => {
			await ee(), c.value?.focus(), c.value?.select(), document.addEventListener("pointerdown", _, !0), u = window.setTimeout(() => {
				l = !0, u = null;
			}, ad);
		}), g(() => {
			u !== null && window.clearTimeout(u), document.removeEventListener("pointerdown", _, !0);
		}), (t, n) => (f(), I("div", {
			ref_key: "rootRef",
			ref: s,
			class: "inline-file-input"
		}, [(f(), I("svg", {
			class: "inline-file-input__asset-icon",
			"data-icon-id": p.value.id,
			"aria-hidden": "true",
			focusable: "false"
		}, [G("use", { href: p.value.href }, null, 8, rd)], 8, nd)), H(G("input", {
			ref_key: "inputRef",
			ref: c,
			"onUpdate:modelValue": n[0] ||= (e) => a.value = e,
			class: "inline-file-input__control",
			"data-testid": "inline-file-input",
			placeholder: e.placeholder,
			onKeydown: [le(P(m, ["prevent"]), ["enter"]), n[1] ||= le(P((e) => i("cancel"), ["prevent"]), ["esc"])],
			onBlur: h
		}, null, 40, id), [[B, a.value]])], 512));
	}
}), [["__scopeId", "data-v-28d28144"]]), sd = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "VirtualScrollbarOverlay",
	props: {
		minThumbSize: { default: 24 },
		orientation: { default: "vertical" },
		revision: { default: 0 },
		scrollElement: {},
		viewportActive: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let r = e, i = n(null), a = n(null), s = null, c = null, l = null, u = null, d = null, p = (e, t, n) => Math.min(Math.max(e, t), n), m = () => r.orientation === "horizontal", h = (e) => m() ? e.scrollLeft : e.scrollTop, _ = (e, t) => {
			if (m()) {
				e.scrollLeft = t;
				return;
			}
			e.scrollTop = t;
		}, v = (e) => m() ? e.clientX : e.clientY, y = () => {
			let e = i.value?.getBoundingClientRect();
			return e ? m() ? e.left : e.top : 0;
		}, b = (e) => {
			let t = m() ? e.clientWidth : e.clientHeight, n = m() ? e.scrollWidth : e.scrollHeight;
			if (t <= 0 || n <= t) return null;
			let i = n - t, a = p(t / n * t, r.minThumbSize, t);
			return {
				maxScrollOffset: i,
				maxThumbOffset: Math.max(0, t - a),
				thumbSize: a,
				viewportSize: t
			};
		}, x = (e) => {
			i.value?.classList.toggle("virtual-scrollbar-overlay--hidden", e);
		}, S = () => {
			let e = r.scrollElement, t = i.value, n = a.value;
			if (!e || !t || !n) {
				x(!0);
				return;
			}
			let o = b(e);
			if (!o) {
				x(!0);
				return;
			}
			let s = o.maxScrollOffset > 0 ? p(h(e), 0, o.maxScrollOffset) / o.maxScrollOffset * o.maxThumbOffset : 0;
			if (x(!1), m()) {
				t.style.width = `${o.viewportSize}px`, t.style.height = "", n.style.width = `${o.thumbSize}px`, n.style.height = "", n.style.transform = `translate3d(${s}px, 0, 0)`;
				return;
			}
			t.style.width = "", t.style.height = `${o.viewportSize}px`, n.style.width = "", n.style.height = `${o.thumbSize}px`, n.style.transform = `translate3d(0, ${s}px, 0)`;
		}, C = () => {
			s === null && (s = window.requestAnimationFrame(() => {
				s = null, S();
			}));
		}, w = () => {
			let e = i.value;
			e && (e.classList.add("virtual-scrollbar-overlay--scrolling"), c && window.clearTimeout(c), c = window.setTimeout(() => {
				e.classList.remove("virtual-scrollbar-overlay--scrolling"), c = null;
			}, 700));
		}, T = () => {
			w(), C();
		}, E = () => {
			u?.(), u = null, l?.disconnect(), l = null;
		}, D = (e) => {
			if (E(), !e) {
				x(!0);
				return;
			}
			e.addEventListener("scroll", T, { passive: !0 }), u = () => e.removeEventListener("scroll", T), typeof ResizeObserver < "u" && (l = new ResizeObserver(C), l.observe(e)), C();
		}, O = (e) => {
			let t = r.scrollElement;
			if (!t) return;
			let n = b(t);
			!n || n.maxThumbOffset <= 0 || (_(t, p(e, 0, n.maxThumbOffset) / n.maxThumbOffset * n.maxScrollOffset), C());
		}, k = (e) => {
			if (!d || !r.scrollElement) return;
			e.preventDefault();
			let t = d.startScrollOffset + (v(e) - d.startPointerOffset) / d.maxThumbOffset * d.maxScrollOffset;
			_(r.scrollElement, p(t, 0, d.maxScrollOffset)), C();
		}, A = () => {
			d = null, i.value?.classList.remove("virtual-scrollbar-overlay--dragging"), document.removeEventListener("pointermove", k), document.removeEventListener("pointerup", A), document.removeEventListener("pointercancel", A), C();
		}, j = (e) => {
			let t = r.scrollElement;
			if (!t) return;
			let n = b(t);
			!n || n.maxThumbOffset <= 0 || (e.preventDefault(), d = {
				maxScrollOffset: n.maxScrollOffset,
				maxThumbOffset: n.maxThumbOffset,
				startPointerOffset: v(e),
				startScrollOffset: h(t)
			}, i.value?.classList.add("virtual-scrollbar-overlay--dragging"), document.addEventListener("pointermove", k, { passive: !1 }), document.addEventListener("pointerup", A), document.addEventListener("pointercancel", A));
		}, M = (e) => {
			if (e.target === a.value) return;
			let t = r.scrollElement;
			if (!t) return;
			let n = b(t);
			n && O(v(e) - y() - n.thumbSize / 2);
		}, N = (e) => {
			i.value?.classList.toggle("virtual-scrollbar-overlay--hovering", e);
		}, F = () => {
			i.value?.classList.toggle("virtual-scrollbar-overlay--viewport-active", r.viewportActive);
		};
		return W(() => r.scrollElement, D, {
			flush: "post",
			immediate: !0
		}), W(() => r.revision, C, { flush: "post" }), W(() => r.viewportActive, F, {
			flush: "post",
			immediate: !0
		}), o(() => {
			F(), C();
		}), g(() => {
			s !== null && window.cancelAnimationFrame(s), c && window.clearTimeout(c), A(), E();
		}), (n, r) => (f(), I("div", {
			ref_key: "overlayRef",
			ref: i,
			class: t(["virtual-scrollbar-overlay virtual-scrollbar-overlay--hidden", `virtual-scrollbar-overlay--${e.orientation}`]),
			"data-testid": "virtual-scrollbar-overlay",
			"aria-hidden": "true",
			onPointerdown: P(M, ["self"]),
			onPointerenter: r[0] ||= (e) => N(!0),
			onPointerleave: r[1] ||= (e) => N(!1)
		}, [G("div", {
			ref_key: "thumbRef",
			ref: a,
			class: "virtual-scrollbar-overlay__thumb",
			"data-testid": "virtual-scrollbar-thumb",
			onPointerdown: P(j, ["stop"])
		}, null, 544)], 34));
	}
}), [["__scopeId", "data-v-3e7331cc"]]), cd = ["data-anchor-path"], ld = ["data-anchor-path"], ud = ["title"], dd = {
	key: 0,
	class: "explorer-drag-ghost__stack",
	"aria-hidden": "true"
}, fd = ["data-icon-id"], pd = ["href"], md = { class: "explorer-drag-ghost__label" }, hd = {
	key: 2,
	class: "explorer-drag-ghost__count"
}, gd = 24, _d = 50, vd = 4, yd = 500, bd = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "FileTree",
	props: {
		nodes: {},
		activeFilePath: {},
		inlineCreate: {},
		inlineRename: {},
		loadingFolderPaths: {},
		treeKey: {}
	},
	emits: [
		"toggle-folder",
		"open-file",
		"item-contextmenu",
		"blank-contextmenu",
		"inline-create-confirm",
		"inline-create-cancel",
		"inline-rename-confirm",
		"inline-rename-cancel",
		"select-item",
		"drag-hover-folder",
		"drop-items"
	],
	setup(r, { emit: i }) {
		let a = gd * 10, o = r, s = i, c = d(null), l = d(null), u = d(!1), m = n(null), h = j(() => new Set(o.loadingFolderPaths ?? [])), _ = j(() => new Map(o.nodes.map((e) => [e.path, e]))), v = j(() => {
			let e = m.value;
			return e ? { transform: `translate3d(${e.x + 12}px, ${e.y + 12}px, 0)` } : {};
		}), y = j(() => {
			let e = m.value?.items[0];
			return e ? Ju({
				type: e.type,
				name: e.name,
				expanded: !1
			}) : null;
		}), b = (e) => ({ "--file-tree-inline-indent": `${e * 10 + 6}px` }), x = j(() => {
			let e = [];
			for (let t of o.nodes) {
				if (o.inlineRename?.path === t.path) {
					e.push({
						initialValue: o.inlineRename.initialValue,
						itemType: "inline-rename",
						kind: o.inlineRename.kind,
						node: t,
						path: `__inline-rename__:${t.path}`,
						treeLayer: t.treeLayer ?? t.depth
					});
					continue;
				}
				if (e.push({
					itemType: "node",
					node: t,
					path: t.path
				}), o.inlineCreate?.anchorPath === t.path) {
					let n = t.type === "folder" ? (t.treeLayer ?? t.depth) + 1 : t.treeLayer ?? t.depth;
					e.push({
						anchorNode: t,
						itemType: "inline-create",
						kind: o.inlineCreate.kind,
						path: `__inline-create__:${t.path}:${o.inlineCreate.kind}`,
						treeLayer: n
					});
				}
			}
			return e;
		});
		W(c, (e) => {
			l.value = e?.$el instanceof HTMLElement ? e.$el : null;
		}, {
			flush: "post",
			immediate: !0
		});
		let S = null, C = null, w = null, T = null, E = null, O = !1, k = {
			x: 0,
			y: 0
		}, A = {
			x: 0,
			y: 0
		}, F = !1, L = () => {
			S !== null && (window.clearTimeout(S), S = null);
		}, R = () => {
			C !== null && (window.cancelAnimationFrame(C), C = null);
		}, z = () => {
			w !== null && (window.clearTimeout(w), w = null, T = null);
		}, B = (e) => {
			let t = (e instanceof Element ? e.closest(".file-tree-item") : null)?.dataset.path;
			return t ? _.value.get(t) : void 0;
		}, V = (e, t) => {
			let n = document.elementFromPoint?.(e, t);
			return B(n);
		}, ee = (e) => {
			let t = Mo(e), n = t === "/" ? "/" : t.split("/").filter(Boolean).at(-1) ?? t;
			return {
				depth: Math.max(0, t.split("/").filter(Boolean).length - 1),
				name: n,
				path: t,
				type: "folder"
			};
		}, te = (e) => {
			if (!e) return {
				highlightPath: null,
				targetNode: null
			};
			if (e.type === "folder") return {
				highlightPath: e.path,
				targetNode: e
			};
			let t = Mo(No(e.path)), n = _.value.get(t);
			return n?.type === "folder" ? {
				highlightPath: n.path,
				targetNode: n
			} : {
				highlightPath: e.path,
				targetNode: ee(t)
			};
		}, H = (e) => {
			if (!e || e.type !== "folder" || e.expanded) {
				z();
				return;
			}
			T !== e.path && (z(), T = e.path, w = window.setTimeout(() => {
				let e = T;
				z(), e && s("drag-hover-folder", e);
			}, yd));
		}, ne = () => {
			C = null;
			let e = m.value;
			if (!e) return;
			let t = V(A.x, A.y), n = te(t), r = Nl(e.items, n.targetNode);
			m.value = {
				...e,
				x: A.x,
				y: A.y,
				targetAllowed: r.allowed,
				targetHighlightPath: r.allowed ? n.highlightPath : null,
				targetNode: r.allowed ? n.targetNode : null,
				targetPath: r.allowed ? n.targetNode?.path ?? null : null,
				targetReason: r.reason ?? null
			}, H(r.allowed && t?.type === "folder" ? t : null);
		}, re = () => {
			C === null && (C = window.requestAnimationFrame(ne));
		}, U = (e) => {
			let t = m.value?.targetPath;
			return !!(m.value?.targetAllowed && t && Fo(e.path, t));
		}, ie = () => {
			let e = A.x - k.x, t = A.y - k.y;
			return Math.hypot(e, t) >= vd;
		}, ae = () => ({
			clientX: A.x,
			clientY: A.y
		}), q = () => {
			window.removeEventListener("pointermove", ce), window.removeEventListener("pointerup", le), window.removeEventListener("pointercancel", oe), document.removeEventListener("keydown", Y);
		}, oe = () => {
			L(), R(), z(), wr.endDrag(), E = null, O = !1, m.value = null, q();
		}, se = () => {
			let e = E;
			if (E = null, !e) return;
			let t = Ml(e, o.nodes);
			m.value = {
				items: t,
				primaryName: e.name,
				x: A.x,
				y: A.y,
				targetAllowed: !1,
				targetHighlightPath: null,
				targetNode: null,
				targetPath: null,
				targetReason: null
			}, t.length === 1 && e.type === "file" ? wr.beginDrag({
				kind: "file",
				language: e.language,
				path: e.path,
				title: e.name
			}, ae()) : wr.endDrag(), re();
		}, ce = (e) => {
			if (A = {
				x: e.clientX,
				y: e.clientY
			}, m.value) {
				e.preventDefault(), wr.updatePoint(ae()), re();
				return;
			}
			E && O && ie() && (e.preventDefault(), se());
		}, le = (e) => {
			A = {
				x: e.clientX,
				y: e.clientY
			};
			let t = m.value;
			!wr.dispatchPointerDrop(ae()) && t?.targetNode && s("drop-items", {
				items: t.items,
				targetNode: t.targetNode
			}), t && (F = !0), oe();
		}, Y = (e) => {
			e.key === "Escape" && oe();
		}, ue = (e) => {
			if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
			let t = B(e.target);
			t && (oe(), E = t, O = !1, k = {
				x: e.clientX,
				y: e.clientY
			}, A = {
				x: e.clientX,
				y: e.clientY
			}, window.addEventListener("pointermove", ce, { passive: !1 }), window.addEventListener("pointerup", le), window.addEventListener("pointercancel", oe), document.addEventListener("keydown", Y), S = window.setTimeout(() => {
				S = null, O = !0, ie() && se();
			}, _d));
		}, de = (e) => {
			F && (F = !1, e.preventDefault(), e.stopPropagation());
		};
		g(oe);
		let fe = (e) => {
			let t = e.target, n = (t instanceof Element ? t.closest(".file-tree-item") : null)?.dataset.path, r = n ? _.value.get(n) : void 0;
			if (r) {
				s("item-contextmenu", {
					event: e,
					node: r
				});
				return;
			}
			s("blank-contextmenu", e);
		};
		return (n, i) => (f(), I("div", {
			class: "file-tree-shell",
			onPointerenter: i[7] ||= (e) => u.value = !0,
			onPointerleave: i[8] ||= (e) => u.value = !1,
			onPointerdown: ue,
			onClickCapture: de,
			onContextmenu: P(fe, ["prevent"])
		}, [
			(f(), J(e(Iu), {
				ref_key: "scrollerRef",
				ref: c,
				key: r.treeKey ?? "file-tree",
				class: "file-tree file-tree--overlay-scrollbar ide-scrollable",
				"aria-label": "文件树",
				"data-testid": "file-tree",
				role: "tree",
				items: x.value,
				"item-size": gd,
				"key-field": "path",
				buffer: a
			}, {
				default: M(({ item: e }) => [e.itemType === "node" ? (f(), J(td, {
					key: 0,
					node: e.node,
					active: e.node.path === r.activeFilePath,
					"drop-scope": U(e.node),
					"drop-target": m.value?.targetHighlightPath === e.node.path && m.value.targetAllowed,
					loading: h.value.has(e.node.path),
					onToggleFolder: i[0] ||= (e) => s("toggle-folder", e),
					onOpenFile: i[1] ||= (e) => s("open-file", e),
					onSelectItem: i[2] ||= (e) => s("select-item", e)
				}, null, 8, [
					"node",
					"active",
					"drop-scope",
					"drop-target",
					"loading"
				])) : e.itemType === "inline-rename" ? (f(), I("div", {
					key: 1,
					class: "file-tree__inline-create",
					style: p(b(e.treeLayer)),
					"data-anchor-path": e.node.path
				}, [D(od, {
					kind: e.kind,
					"initial-value": e.initialValue,
					"cancel-on-blur": "",
					placeholder: "重命名",
					onConfirm: i[3] ||= (e) => s("inline-rename-confirm", e),
					onCancel: i[4] ||= (e) => s("inline-rename-cancel")
				}, null, 8, ["kind", "initial-value"])], 12, cd)) : (f(), I("div", {
					key: 2,
					class: "file-tree__inline-create",
					style: p(b(e.treeLayer)),
					"data-anchor-path": e.anchorNode.path
				}, [D(od, {
					kind: e.kind,
					placeholder: e.kind === "file" ? "新文件名称" : "新文件夹名称",
					onConfirm: i[5] ||= (e) => s("inline-create-confirm", e),
					onCancel: i[6] ||= (e) => s("inline-create-cancel")
				}, null, 8, ["kind", "placeholder"])], 12, ld))]),
				after: M(() => [...i[9] ||= [G("div", {
					class: "file-tree__bottom-spacer",
					"data-testid": "file-tree-bottom-spacer",
					"aria-hidden": "true"
				}, null, -1)]]),
				_: 1
			}, 8, ["items"])),
			D(sd, {
				"scroll-element": l.value,
				revision: x.value.length,
				"viewport-active": u.value
			}, null, 8, [
				"scroll-element",
				"revision",
				"viewport-active"
			]),
			m.value ? (f(), I("div", {
				key: 0,
				class: t(["explorer-drag-ghost", {
					"explorer-drag-ghost--stacked": m.value.items.length > 1,
					"explorer-drag-ghost--blocked": !m.value.targetAllowed && m.value.targetReason
				}]),
				style: p(v.value),
				"data-testid": "explorer-drag-ghost",
				title: m.value.targetReason ?? void 0
			}, [
				m.value.items.length > 1 ? (f(), I("span", dd, [...i[10] ||= [
					G("span", { class: "explorer-drag-ghost__stack-layer explorer-drag-ghost__stack-layer--one" }, null, -1),
					G("span", { class: "explorer-drag-ghost__stack-layer explorer-drag-ghost__stack-layer--two" }, null, -1),
					G("span", { class: "explorer-drag-ghost__stack-layer explorer-drag-ghost__stack-layer--three" }, null, -1)
				]])) : N("", !0),
				y.value ? (f(), I("svg", {
					key: 1,
					class: "explorer-drag-ghost__icon",
					"data-icon-id": y.value.id,
					"aria-hidden": "true",
					focusable: "false"
				}, [G("use", { href: y.value.href }, null, 8, pd)], 8, fd)) : N("", !0),
				G("span", md, K(m.value.primaryName), 1),
				m.value.items.length > 1 ? (f(), I("span", hd, "+" + K(m.value.items.length - 1) + " items", 1)) : N("", !0)
			], 14, ud)) : N("", !0)
		], 32));
	}
}), [["__scopeId", "data-v-6fd00d5a"]]), xd = {
	key: 0,
	class: "explorer-view__provider-warning",
	"data-testid": "filesystem-provider-warning"
}, Sd = { class: "explorer-view__parent-entry-icon" }, Cd = {
	key: "loading",
	class: "explorer-view__list-loading",
	"data-testid": "explorer-file-tree-loading"
}, wd = {
	key: "error",
	class: "explorer-view__list-error",
	"data-testid": "explorer-file-tree-error"
}, Td = 700, Ed = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "ExplorerView",
	props: { executeCommand: { type: Function } },
	setup(t) {
		let r = t, i = zt(), a = Fs(), s = jo(), c = n(null), l = n(null), u = n(!1), d = n(null), p = n(/* @__PURE__ */ new Set()), m = n(/* @__PURE__ */ new Set()), h = /* @__PURE__ */ new Map(), _ = j(() => {
			let e = V();
			return e === "/" ? i.fileTree : Bo(i.fileTree, e)?.children ?? i.fileTree;
		}), v = j(() => zl.getFlatTreeSnapshot(_.value, i.expandedFolderPaths, {
			selectedPath: i.selectedPath,
			selectedPaths: i.selectedPaths,
			focusedPath: i.focusedPath
		})), y = j(() => v.value.visibleNodes), b = j(() => Array.from(m.value)), x = j(() => new Set(y.value.map((e) => e.path))), S = j(() => !c.value?.anchorPath || !x.value.has(c.value.anchorPath) ? null : {
			anchorPath: c.value.anchorPath,
			kind: c.value.kind
		}), C = j(() => c.value && !S.value ? c.value : null), w = j(() => {
			let e = l.value;
			return !e || !x.value.has(e.path) ? null : {
				initialValue: e.name,
				kind: e.kind,
				path: e.path
			};
		}), T = (e) => {
			let t = Mo(e);
			if (t === "/") return [];
			let n = t.split("/").filter(Boolean);
			return n.map((e, t) => `/${n.slice(0, t + 1).join("/")}`);
		}, E = (e, t) => r.executeCommand?.(e, t) ?? Ep.execute(e, t), O = (e) => !!(e && typeof e == "object"), k = (e) => O(e) && e.ok === !1, A = (e, t) => {
			let n = { duration: e === "error" ? 4500 : 3e3 };
			if (e === "error") {
				s.error(t, n);
				return;
			}
			s.success(t, n);
		}, P = (e) => pl.evaluate({
			operation: "browse",
			sourcePath: e
		}).allowed, F = (e) => pl.evaluate({
			operation: "create",
			targetPath: e
		}).allowed, L = (e) => {
			let t = v.value.pathIndex.get(e);
			return t ? v.value.registry.get(t) : void 0;
		}, R = j(() => i.selectedPath ?? i.activeFilePath), z = () => {
			let e = i.selectedPath;
			return e && L(e) ? e : null;
		}, B = () => {
			let e = z();
			if (!e) return {
				anchorPath: null,
				parentPath: V()
			};
			let t = L(e);
			return t ? {
				anchorPath: e,
				parentPath: t.type === "folder" ? t.path : No(t.path)
			} : {
				anchorPath: null,
				parentPath: V()
			};
		}, V = () => Mo(i.currentDirectoryPath), ee = () => {
			let e = V(), t = e === "/" ? "/" : e.split("/").filter(Boolean).at(-1) ?? e;
			return {
				depth: 0,
				id: `explorer:${e}`,
				name: t,
				path: e,
				type: "explorer"
			};
		}, te = j(() => {
			let e = V();
			return i.currentDirectoryPath || e;
		}), H = j(() => {
			let e = V();
			return e === "/" ? null : No(e);
		}), ne = (e) => {
			let t = new Set(i.expandedFolderPaths);
			e.forEach((e) => {
				e !== "/" && t.add(e);
			}), i.setExpandedFolderPaths(Array.from(t));
		}, re = (e) => {
			ne([e]);
		}, U = (e) => p.value.has(e), ae = (e, t) => {
			let n = new Set(p.value);
			t ? n.add(e) : n.delete(e), p.value = n;
		}, q = (e, t) => {
			let n = new Set(m.value);
			t ? n.add(e) : n.delete(e), m.value = n;
		}, oe = (e) => {
			let t = h.get(e);
			t && (window.clearTimeout(t), h.delete(e));
		}, se = (e) => {
			oe(e);
			let t = window.setTimeout(() => {
				h.delete(e), U(e) && q(e, !0);
			}, Td);
			h.set(e, t);
		}, ce = (e) => {
			oe(e), ae(e, !1), q(e, !1);
		}, le = async (e) => {
			let t = await Ia.loadFolder(e);
			if (t.ok) {
				let e = Uo(i.fileTree, t.path, t.children);
				e.replaced ? i.setFileTree(e.nodes) : Mo(t.path) === V() ? i.setFileTree(Ro(t.children)) : i.setFileTree(Ia.getFileTree());
			}
			return t;
		}, Y = async (e) => {
			if (!P(e)) return !1;
			let t = T(e);
			if (i.expandedFolderPaths.includes(e)) return ne(t), !0;
			if (U(e)) return !1;
			ae(e, !0), se(e);
			try {
				return (await le(e)).ok ? (ne(t), !0) : !1;
			} finally {
				ce(e);
			}
		}, ue = async (e) => {
			if (P(e) && (i.setSelectedPath(e), i.setFocusedPath(e), !U(e))) {
				if (i.expandedFolderPaths.includes(e)) {
					i.toggleExpandedFolderPath(e);
					return;
				}
				ae(e, !0), se(e);
				try {
					(await le(e)).ok && re(e);
				} finally {
					ce(e);
				}
			}
		}, de = async (e) => {
			P(e.path) && (i.setSelectedPath(e.path), i.setFocusedPath(e.path), await E("file.open", {
				path: e.path,
				title: e.name,
				language: e.language ?? "plaintext"
			}));
		}, fe = () => {
			let e = i.fileSystemProviderStatus?.capabilities;
			if (e) return {
				create: e.create,
				delete: e.delete,
				rename: e.rename,
				write: e.write
			};
		}, pe = (e) => {
			let { node: t, event: n } = e, r = i.selectedPaths.includes(t.path) && i.selectedPaths.length > 1 ? i.selectedPaths : [t.path];
			i.selectedPaths.includes(t.path) || i.setSelectedPath(t.path), i.setFocusedPath(t.path), Al.open({
				event: n,
				node: t,
				providerCapabilities: fe(),
				selectedPaths: r
			});
		}, me = (e) => {
			let t = ee();
			Al.open({
				event: e,
				node: t,
				providerCapabilities: fe(),
				selectedPaths: [t.path]
			});
		}, he = async (e, t, n) => {
			l.value = null;
			let r = Mo(t);
			if (!F(r)) return;
			let a = n ? Mo(n) : null, o = a ? L(a) : void 0;
			o && (i.setSelectedPath(o.path), i.setFocusedPath(o.path)), !(o?.type === "folder" && !await Y(o.path)) && (c.value = {
				anchorPath: o?.path ?? null,
				kind: e,
				parentPath: r
			});
		}, ge = (e, t) => {
			let n = y.value.map((e) => e.path), r = n.indexOf(e), i = n.indexOf(t);
			if (r < 0 || i < 0) return [t];
			let a = Math.min(r, i), o = Math.max(r, i);
			return n.slice(a, o + 1);
		}, _e = (e) => {
			let { event: t, node: n } = e;
			if (i.setFocusedPath(n.path), t.shiftKey) {
				let e = i.selectionAnchorPath && x.value.has(i.selectionAnchorPath) ? i.selectionAnchorPath : i.selectedPath ?? n.path;
				i.setSelectedPaths(ge(e, n.path), e);
				return;
			}
			if (t.metaKey || t.ctrlKey) {
				let e = new Set(i.selectedPaths);
				e.has(n.path) ? e.delete(n.path) : e.add(n.path);
				let t = y.value.map((e) => e.path).filter((t) => e.has(t));
				i.setSelectedPaths(t, i.selectionAnchorPath ?? n.path);
				return;
			}
			i.setSelectedPath(n.path);
		}, ve = (e) => "ok" in e, ye = (e, t) => {
			let n = {
				expandedFolderPaths: [...i.expandedFolderPaths],
				fileTree: Ro(i.fileTree),
				focusedPath: i.focusedPath,
				selectedPath: i.selectedPath,
				selectedPaths: [...i.selectedPaths],
				selectionAnchorPath: i.selectionAnchorPath
			}, r = [], a = Ro(i.fileTree);
			for (let t of e) {
				let e = Ia.getNodeByPath(t.sourcePath);
				if (ve(e)) return null;
				r.push(zo(e, t.sourcePath, t.targetPath)), a = Go(a, t.sourcePath).nodes;
			}
			let o = Wo(a, t, r);
			if (!o.inserted) return null;
			let s = e.map((e) => e.sourcePath), c = e.map((e) => e.targetPath), l = new Set(i.expandedFolderPaths.filter((e) => !s.some((t) => Fo(e, t))));
			return t !== "/" && l.add(t), i.setFileTree(o.nodes), i.setExpandedFolderPaths(Array.from(l)), i.setSelectedPaths(c, c[0] ?? null), i.setFocusedPath(c.at(-1) ?? null), () => {
				i.setFileTree(n.fileTree), i.setExpandedFolderPaths(n.expandedFolderPaths), i.selectedPath = n.selectedPath, i.selectedPaths = n.selectedPaths, i.selectionAnchorPath = n.selectionAnchorPath, i.setFocusedPath(n.focusedPath);
			};
		}, be = async (e) => {
			let t = await Pl({
				draggedItems: e.items,
				targetNode: e.targetNode,
				sourceExists: (e) => !ve(Ia.getNodeByPath(e)),
				targetExists: (e, t) => Ia.checkExistsFiles(e, t)
			});
			if (!t.ok) {
				A("error", t.reason);
				return;
			}
			let n = ye(t.moves, t.targetPath);
			for (let e of t.moves) if (!(await qo.moveFile(e.sourcePath, e.targetPath)).ok) {
				n?.(), A("error", `移动失败：${e.name}`);
				return;
			}
			A("success", `已移动 ${t.moves.length} 个项目到 ${t.targetPath}`);
		}, xe = async (e) => {
			let t = B();
			await he(e, t.parentPath, t.anchorPath);
		};
		W(() => a.createRequest, (e) => {
			e && (he(e.kind, e.parentPath, e.anchorPath ?? null), a.clearCreateRequest(e.id));
		}, { flush: "post" }), W(() => a.renameRequest, (e) => {
			if (!e) return;
			let t = L(e.path);
			if (!t) {
				A("error", "无法重命名：目标不在当前资源管理器列表中。"), a.clearRenameRequest(e.id);
				return;
			}
			c.value = null, l.value = {
				kind: t.type,
				name: e.name,
				parentPath: No(t.path),
				path: t.path,
				requestId: e.id
			}, i.setSelectedPath(t.path), i.setFocusedPath(t.path), a.clearRenameRequest(e.id);
		}, { flush: "post" });
		let Se = (e) => {
			let t = Ia.getNodeByPath(e);
			return !("ok" in t && t.ok === !1);
		}, Ce = async (e) => {
			let t = c.value;
			if (!t) return;
			let n = e.trim();
			if (!n) {
				c.value = null;
				return;
			}
			let { kind: r, parentPath: i } = t, a = Po(i, n);
			c.value = null, !Se(a) && !k(await E(r === "file" ? "file.newFile" : "file.newFolder", {
				parentPath: i,
				name: n
			})) && !L(a) && await qo.refreshDirectory(i);
		}, we = () => {
			l.value = null;
		}, Te = async (e) => {
			let t = l.value;
			if (!t) return;
			let n = e.trim();
			if (!n || n === t.name) {
				l.value = null;
				return;
			}
			let r = Po(t.parentPath, n);
			if (r !== t.path && Se(r)) {
				A("error", `已存在同名文件或文件夹：${n}`);
				return;
			}
			l.value = null;
			let i = await E("file.rename", {
				commit: !0,
				name: n,
				path: t.path
			});
			if (typeof i == "object" && i && "ok" in i && i.ok === !1) {
				A("error", `重命名失败：${n}`);
				return;
			}
			A("success", `已重命名为 ${n}`);
		}, Ee = () => {
			i.setExpandedFolderPaths([]);
		}, De = async () => {
			let e = V();
			try {
				await le(e);
			} finally {
				Ee();
			}
		}, Oe = async () => {
			let e = H.value;
			if (e) {
				if (i.setExpandedFolderPaths([]), e === "/") {
					i.setCurrentDirectoryPath("/"), i.setSelectedPath(null), i.setFocusedPath(null), await le(e);
					return;
				}
				i.setCurrentDirectoryPath(e), i.setSelectedPath(null), i.setFocusedPath(null), await le(e);
			}
		}, ke = (e) => {
			let t = e.target;
			t instanceof Node && (d.value?.contains(t) || i.setFocusedPath(null));
		};
		return o(() => {
			document.addEventListener("pointerdown", ke);
		}), g(() => {
			Array.from(h.keys()).forEach(oe), document.removeEventListener("pointerdown", ke);
		}), (t, n) => (f(), I("section", {
			ref_key: "explorerViewRef",
			ref: d,
			class: "explorer-view",
			onPointerenter: n[4] ||= (e) => u.value = !0,
			onPointerleave: n[5] ||= (e) => u.value = !1
		}, [
			e(i).fileSystemProviderStatus?.fallbackReason ? (f(), I("div", xd, K(e(i).fileSystemProviderStatus.fallbackReason), 1)) : N("", !0),
			D(ko, {
				"actions-visible": u.value,
				path: te.value,
				onNewFile: n[0] ||= (e) => xe("file"),
				onNewFolder: n[1] ||= (e) => xe("folder"),
				onRefresh: De,
				onCollapseAll: Ee
			}, null, 8, ["actions-visible", "path"]),
			H.value ? (f(), I("button", {
				key: 1,
				class: "explorer-view__parent-entry",
				type: "button",
				"aria-label": "返回上一层目录",
				"data-testid": "explorer-parent-entry",
				onClick: Oe
			}, [G("span", Sd, [D(X, {
				name: "ellipsis",
				decorative: ""
			})]), n[6] ||= G("span", { class: "explorer-view__parent-entry-label" }, "返回上一层目录", -1)])) : N("", !0),
			C.value ? (f(), J(od, {
				key: 2,
				kind: C.value.kind,
				placeholder: C.value.kind === "file" ? "新文件名称" : "新文件夹名称",
				onConfirm: Ce,
				onCancel: n[2] ||= (e) => c.value = null
			}, null, 8, ["kind", "placeholder"])) : N("", !0),
			D(ie, {
				name: "explorer-view__list",
				mode: "out-in"
			}, {
				default: M(() => [e(i).fileTreeLoading && y.value.length === 0 ? (f(), I("div", Cd, [...n[7] ||= [G("span", {
					class: "codicon codicon-loading explorer-view__list-loading-icon",
					"aria-hidden": "true"
				}, null, -1), G("span", { class: "explorer-view__list-loading-text" }, "正在加载文件列表...", -1)]])) : e(i).fileTreeError && y.value.length === 0 ? (f(), I("div", wd, K(e(i).fileTreeError), 1)) : (f(), J(bd, {
					key: 2,
					nodes: y.value,
					"active-file-path": R.value,
					"inline-create": S.value,
					"inline-rename": w.value,
					"loading-folder-paths": b.value,
					"tree-key": V(),
					onToggleFolder: ue,
					onOpenFile: de,
					onSelectItem: _e,
					onDragHoverFolder: Y,
					onDropItems: be,
					onItemContextmenu: pe,
					onBlankContextmenu: me,
					onInlineCreateConfirm: Ce,
					onInlineCreateCancel: n[3] ||= (e) => c.value = null,
					onInlineRenameConfirm: Te,
					onInlineRenameCancel: we
				}, null, 8, [
					"nodes",
					"active-file-path",
					"inline-create",
					"inline-rename",
					"loading-folder-paths",
					"tree-key"
				]))]),
				_: 1
			})
		], 544));
	}
}), [["__scopeId", "data-v-7d45145d"]]), Dd = { class: "file-properties-modal-root" }, Od = { class: "file-properties" }, kd = {
	class: "file-properties__tabs",
	role: "tablist",
	"aria-label": "文件属性"
}, Ad = [
	"aria-selected",
	"data-testid",
	"onClick"
], jd = {
	key: 0,
	class: "file-properties__state"
}, Md = {
	key: 1,
	class: "file-properties__state file-properties__state--error"
}, Nd = {
	key: 0,
	class: "file-properties__panel",
	role: "tabpanel"
}, Pd = { class: "file-properties__summary" }, Fd = ["data-icon-id"], Id = ["href"], Ld = { class: "file-properties__summary-text" }, Rd = { class: "file-properties__summary-name" }, zd = { class: "file-properties__summary-meta" }, Bd = { class: "file-properties__rows" }, Vd = {
	key: 1,
	class: "file-properties__panel",
	role: "tabpanel"
}, Hd = {
	class: "file-properties__table",
	role: "table",
	"aria-label": "详细信息"
}, Ud = {
	class: "file-properties__table-label",
	role: "cell"
}, Wd = {
	class: "file-properties__table-value",
	role: "cell"
}, Gd = {
	key: 2,
	class: "file-properties__panel",
	role: "tabpanel"
}, Kd = {
	key: 0,
	class: "file-properties__history"
}, qd = { class: "file-properties__section-heading" }, Jd = { class: "file-properties__history-main" }, Yd = { class: "file-properties__history-grid" }, Xd = {
	key: 1,
	class: "file-properties__empty"
}, Zd = {
	key: 3,
	class: "file-properties__panel",
	role: "tabpanel"
}, Qd = {
	key: 0,
	class: "file-properties__permission-note"
}, $d = {
	key: 1,
	class: "file-properties__permission-note file-properties__permission-note--error"
}, ef = {
	key: 2,
	class: "file-properties__permission-note file-properties__permission-note--success"
}, tf = { class: "file-properties__permission-summary" }, nf = { class: "file-properties__permission-summary-main" }, rf = { class: "file-properties__permission-state" }, af = { class: "file-properties__permission-description" }, of = {
	class: "file-properties__permission-badges",
	"aria-label": "权限摘要"
}, sf = { class: "file-properties__permission-badge" }, cf = { class: "file-properties__permission-badge" }, lf = { "data-testid": "permission-symbolic" }, uf = { class: "file-properties__permission-badge" }, df = { class: "file-properties__permissions" }, ff = ["data-testid"], pf = { class: "file-properties__permission-heading" }, mf = { class: "file-properties__permission-title" }, hf = { class: "file-properties__permission-subtitle" }, gf = { class: "file-properties__permission-code" }, _f = { class: "file-properties__permission-items" }, vf = [
	"aria-checked",
	"disabled",
	"data-testid",
	"onClick"
], yf = { class: "file-properties__permission-actions" }, bf = ["value", "disabled"], xf = ["disabled"], Sf = ["value"], Cf = { class: "file-properties__permission-recursive" }, wf = ["disabled"], Tf = ["disabled"], Ef = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	name: "FilePropertiesModal",
	__name: "FilePropertiesModal",
	setup(r) {
		let i = [
			{
				id: "general",
				label: "常规"
			},
			{
				id: "details",
				label: "详细信息"
			},
			{
				id: "history",
				label: "历史版本"
			},
			{
				id: "permissions",
				label: "权限"
			}
		], a = Fs(), o = n("general"), s = n(null), c = n(!1), l = n(""), u = n("000"), d = n(!1), p = n(""), m = n(!1), h = n(""), g = n(!1), _ = n(!1), v = n(""), y = n([]), b = j(() => a.propertyRequest), x = j(() => b.value !== null), C = (e) => e?.name || e?.path.split("/").filter(Boolean).at(-1) || "文件", w = (e) => {
			let t = e.trim() || "/", n = t.lastIndexOf("/");
			return n <= 0 ? "/" : t.slice(0, n);
		}, T = (e) => e == null || e === "" ? "-" : typeof e == "boolean" ? e ? "是" : "否" : String(e), E = (e) => {
			if (typeof e != "number" || !Number.isFinite(e)) return "-";
			if (e === 0) return "0 B";
			let t = [
				"B",
				"KB",
				"MB",
				"GB",
				"TB"
			], n = e, r = 0;
			for (; n >= 1024 && r < t.length - 1;) n /= 1024, r += 1;
			return r === 0 ? `${n} ${t[r]}` : `${n.toFixed(2)} ${t[r]}`;
		}, O = (e) => {
			if (typeof e != "number" || !Number.isFinite(e) || e <= 0) return "-";
			let t = /* @__PURE__ */ new Date(e * 1e3), n = (e) => String(e).padStart(2, "0");
			return [
				t.getFullYear(),
				n(t.getMonth() + 1),
				n(t.getDate())
			].join("-") + ` ${n(t.getHours())}:${n(t.getMinutes())}:${n(t.getSeconds())}`;
		}, k = (e) => {
			let t = String(e ?? "").replace(/[^0-7]/g, "").slice(-3).padStart(3, "0");
			return /^[0-7]{3}$/.test(t) ? t : "000";
		}, A = (e) => typeof e?.mode == "string" && e.mode.trim() ? k(e.mode) : typeof e?.st_mode == "number" ? (e.st_mode & 511).toString(8).padStart(3, "0") : null, P = (e, t) => {
			let n = Number.parseInt(e, 10);
			return Number.isFinite(n) ? (n & t) === t : !1;
		}, F = (e) => [
			P(e, 4) ? "r" : "-",
			P(e, 2) ? "w" : "-",
			P(e, 1) ? "x" : "-"
		].join(""), R = j(() => `[ ${s.value?.name ?? C(b.value)} ] - 文件属性`), B = j(() => s.value?.is_dir === !0 || b.value?.type === "folder" ? "文件夹" : "文件"), V = j(() => s.value?.name ?? C(b.value)), ee = j(() => s.value?.path ?? (b.value ? w(b.value.path) : "-")), te = j(() => b.value?.path ?? (ee.value === "/" ? `/${V.value}` : `${ee.value.replace(/\/$/, "")}/${V.value}`)), ne = j(() => B.value === "文件夹" ? "folder" : "file"), re = j(() => Ju({
			type: ne.value,
			name: V.value,
			expanded: ne.value === "folder"
		})), ie = j(() => [
			{
				label: "文件名称",
				value: V.value
			},
			{
				label: "文件类型",
				value: s.value?.st_type ? `${B.value} (${s.value.st_type})` : B.value
			},
			{
				label: "文件路径",
				value: ee.value
			},
			{
				label: "文件大小",
				value: E(s.value?.st_size)
			},
			{
				label: "权限",
				value: T(s.value?.mode)
			},
			{
				label: "用户",
				value: T(s.value?.user)
			},
			{
				label: "用户组",
				value: T(s.value?.group)
			},
			{
				label: "访问时间",
				value: O(s.value?.st_atime)
			},
			{
				label: "修改时间",
				value: O(s.value?.st_mtime)
			}
		]), ae = j(() => [
			{
				label: "文件名",
				value: V.value
			},
			{
				label: "类型",
				value: T(s.value?.st_type ?? B.value)
			},
			{
				label: "文件路径",
				value: te.value
			},
			{
				label: "文件大小",
				value: E(s.value?.st_size)
			},
			{
				label: "访问时间",
				value: O(s.value?.st_atime)
			},
			{
				label: "修改时间",
				value: O(s.value?.st_mtime)
			},
			{
				label: "元数据修改时间",
				value: O(s.value?.st_ctime)
			},
			{
				label: "文件MD5",
				value: T(s.value?.md5)
			},
			{
				label: "文件sha1",
				value: T(s.value?.sha1)
			},
			{
				label: "所属用户",
				value: T(s.value?.user)
			},
			{
				label: "所属组",
				value: T(s.value?.group)
			},
			{
				label: "文件权限",
				value: T(s.value?.mode)
			},
			{
				label: "特殊权限",
				value: T(s.value?.lsattr)
			},
			{
				label: "用户id",
				value: T(s.value?.st_uid)
			},
			{
				label: "用户组id",
				value: T(s.value?.st_gid)
			},
			{
				label: "inode的链接数",
				value: T(s.value?.st_nlink)
			},
			{
				label: "inode的节点号",
				value: T(s.value?.st_ino)
			},
			{
				label: "inode保护模式",
				value: T(s.value?.st_mode)
			},
			{
				label: "inode驻留设备",
				value: T(s.value?.st_dev)
			}
		]), oe = j(() => [...s.value?.history ?? []].sort((e, t) => (t.st_mtime ?? 0) - (e.st_mtime ?? 0))), se = j(() => g.value ? k(u.value).split("").map(F).join("") : "---------"), ce = j(() => `${ne.value === "folder" ? "d" : "-"}${se.value}`), le = j(() => g.value ? "权限已读取" : "权限未知"), Y = j(() => g.value ? "按所有者、用户组和其他用户分组展示读写执行权限。" : "无法读取权限时使用只读占位展示。"), ue = j(() => {
			let [e, t, n] = k(u.value).split(""), r = (e = "0") => [
				{
					id: "read",
					label: "读取",
					checked: P(e, 4)
				},
				{
					id: "write",
					label: "写入",
					checked: P(e, 2)
				},
				{
					id: "execute",
					label: "执行",
					checked: P(e, 1)
				}
			];
			return [
				{
					id: "owner",
					label: "所有者",
					description: "文件所有者",
					digit: g.value ? e : "-",
					items: r(e),
					symbols: g.value ? F(e) : "---"
				},
				{
					id: "group",
					label: "用户组",
					description: "同组用户",
					digit: g.value ? t : "-",
					items: r(t),
					symbols: g.value ? F(t) : "---"
				},
				{
					id: "public",
					label: "其他用户",
					description: "其他访问者",
					digit: g.value ? n : "-",
					items: r(n),
					symbols: g.value ? F(n) : "---"
				}
			];
		}), de = j(() => /^[0-7]{3}$/.test(u.value)), fe = j(() => m.value || _.value || !g.value), pe = () => {
			let e = A(s.value);
			g.value = e !== null, u.value = e ?? "000", v.value = T(s.value?.user) === "-" ? "" : T(s.value?.user), y.value = v.value ? [v.value] : [];
		}, me = async (e) => {
			c.value = !0, l.value = "", s.value = null;
			let t = e.id;
			try {
				let n = await Ia.getFileAttribute(e.path);
				if (a.propertyRequest?.id !== t) return;
				if (!n.ok) {
					l.value = n.error.message || "文件属性读取失败";
					return;
				}
				s.value = n.attribute;
			} catch (e) {
				if (a.propertyRequest?.id !== t) return;
				l.value = e instanceof Error ? e.message : "文件属性读取失败";
			} finally {
				a.propertyRequest?.id === t && (c.value = !1);
			}
		}, he = async (e) => {
			m.value = !0, p.value = "", h.value = "";
			let t = e.id;
			try {
				let n = await Ia.getFileAccess(e.path);
				if (a.propertyRequest?.id !== t) return;
				if (!n.ok) {
					pe(), p.value = n.error.message || "文件权限读取失败";
					return;
				}
				u.value = k(n.access.chmod), g.value = !0, v.value = n.access.chown || n.access.users[0] || "", y.value = Array.from(new Set([v.value, ...n.access.users].filter(Boolean)));
			} catch (e) {
				if (a.propertyRequest?.id !== t) return;
				pe(), p.value = e instanceof Error ? e.message : "文件权限读取失败";
			} finally {
				a.propertyRequest?.id === t && (m.value = !1);
			}
		}, ge = (e, t) => {
			if (fe.value) return;
			let n = e === "owner" ? 0 : e === "group" ? 1 : 2, r = t === "read" ? 4 : t === "write" ? 2 : 1, i = k(u.value).split(""), a = Number.parseInt(i[n] ?? "0", 10);
			i[n] = String((a & r) === r ? a & ~r : a | r), u.value = i.join(""), h.value = "";
		}, _e = (e) => {
			u.value = e.target.value.replace(/[^0-7]/g, "").slice(0, 3), g.value = de.value, h.value = "";
		}, ve = async () => {
			let e = b.value;
			if (!(!e || !de.value || !v.value)) {
				_.value = !0, p.value = "", h.value = "";
				try {
					let t = await Ia.setFileAccess(e.path, {
						access: u.value,
						applyToChildren: d.value,
						user: v.value
					});
					if (!t.ok) {
						p.value = t.error.message || "文件权限设置失败";
						return;
					}
					h.value = "设置成功", await Promise.all([me(e), he(e)]), h.value = "设置成功";
				} catch (e) {
					p.value = e instanceof Error ? e.message : "文件权限设置失败";
				} finally {
					_.value = !1;
				}
			}
		}, ye = () => {
			a.clearPropertyRequest(b.value?.id);
		};
		return W(() => a.propertyRequest, (e) => {
			if (!e) {
				o.value = "general", s.value = null, l.value = "", c.value = !1, u.value = "000", d.value = !1, p.value = "", m.value = !1, h.value = "", g.value = !1, _.value = !1, v.value = "", y.value = [];
				return;
			}
			o.value = "general", me(e), he(e);
		}, { immediate: !0 }), (n, r) => (f(), I("div", Dd, [D(e(pc), {
			class: "file-properties-modal",
			to: !1,
			show: x.value,
			title: R.value,
			"show-icon": !1,
			"mask-closable": !0,
			width: 528,
			"body-style": { padding: "0" },
			onClose: ye,
			"onUpdate:show": r[2] ||= (e) => !e && ye()
		}, {
			default: M(() => [G("div", Od, [G("div", kd, [(f(), I(z, null, S(i, (e) => G("button", {
				key: e.id,
				class: t(["file-properties__tab", { "file-properties__tab--active": o.value === e.id }]),
				type: "button",
				role: "tab",
				"aria-selected": o.value === e.id,
				"data-testid": `file-properties-tab-${e.id}`,
				onClick: (t) => o.value = e.id
			}, K(e.label), 11, Ad)), 64))]), c.value ? (f(), I("div", jd, [...r[3] ||= [G("span", {
				class: "codicon codicon-loading file-properties__loading-icon",
				"aria-hidden": "true"
			}, null, -1), G("span", null, "正在读取文件属性", -1)]])) : l.value ? (f(), I("div", Md, [D(e(X), {
				name: "warning",
				decorative: ""
			}), G("span", null, K(l.value), 1)])) : (f(), J(e(ot), {
				key: 2,
				class: "file-properties__content"
			}, {
				default: M(() => [o.value === "general" ? (f(), I("section", Nd, [G("div", Pd, [(f(), I("svg", {
					class: "file-properties__summary-icon",
					"data-icon-id": re.value.id,
					"data-testid": "file-properties-summary-icon",
					"aria-hidden": "true",
					focusable: "false"
				}, [G("use", { href: re.value.href }, null, 8, Id)], 8, Fd)), G("div", Ld, [G("div", Rd, K(V.value), 1), G("div", zd, K(B.value), 1)])]), G("dl", Bd, [(f(!0), I(z, null, S(ie.value, (e) => (f(), I(z, { key: e.label }, [G("dt", null, K(e.label), 1), G("dd", null, K(e.value), 1)], 64))), 128))])])) : o.value === "details" ? (f(), I("section", Vd, [G("div", Hd, [(f(!0), I(z, null, S(ae.value, (e) => (f(), I("div", {
					key: e.label,
					class: "file-properties__table-row",
					role: "row"
				}, [G("div", Ud, K(e.label), 1), G("div", Wd, K(e.value), 1)]))), 128))])])) : o.value === "history" ? (f(), I("section", Gd, [oe.value.length ? (f(), I("div", Kd, [G("div", qd, "历史版本 " + K(oe.value.length) + " 个", 1), (f(!0), I(z, null, S(oe.value, (e) => (f(), I("div", {
					key: `${e.history_file ?? e.md5 ?? e.st_mtime}`,
					class: "file-properties__history-item"
				}, [G("div", Jd, [r[4] ||= G("span", { class: "file-properties__history-label" }, "修改时间", -1), G("span", null, K(O(e.st_mtime)), 1)]), G("div", Yd, [
					r[5] ||= G("span", null, "大小", -1),
					G("strong", null, K(E(e.st_size)), 1),
					r[6] ||= G("span", null, "MD5", -1),
					G("strong", null, K(T(e.md5)), 1),
					r[7] ||= G("span", null, "备份路径", -1),
					G("strong", null, K(T(e.history_file)), 1)
				])]))), 128))])) : (f(), I("div", Xd, "暂无可用历史版本"))])) : (f(), I("section", Zd, [
					m.value ? (f(), I("div", Qd, "正在读取权限信息")) : N("", !0),
					p.value ? (f(), I("div", $d, [D(e(X), {
						name: "warning",
						decorative: ""
					}), G("span", null, K(p.value), 1)])) : N("", !0),
					h.value ? (f(), I("div", ef, [D(e(X), {
						name: "check",
						decorative: ""
					}), G("span", null, K(h.value), 1)])) : N("", !0),
					G("div", tf, [G("div", nf, [G("span", rf, K(le.value), 1), G("span", af, K(Y.value), 1)]), G("div", of, [
						G("div", sf, [r[8] ||= G("span", null, "权限值", -1), G("strong", null, K(g.value ? u.value : "---"), 1)]),
						G("div", cf, [r[9] ||= G("span", null, "符号权限", -1), G("strong", lf, K(se.value), 1)]),
						G("div", uf, [r[10] ||= G("span", null, "完整模式", -1), G("strong", null, K(g.value ? ce.value : "?" + se.value), 1)])
					])]),
					G("div", df, [(f(!0), I(z, null, S(ue.value, (n) => (f(), I("div", {
						key: n.id,
						class: "file-properties__permission-group",
						"data-testid": `permission-${n.id}`
					}, [G("div", pf, [G("div", null, [G("div", mf, K(n.label), 1), G("div", hf, K(n.description), 1)]), G("div", gf, [G("span", null, K(n.digit), 1), G("strong", null, K(n.symbols), 1)])]), G("div", _f, [(f(!0), I(z, null, S(n.items, (r) => (f(), I("button", {
						key: r.id,
						class: t(["file-properties__permission-item", { "file-properties__permission-item--checked": r.checked }]),
						type: "button",
						role: "checkbox",
						"aria-checked": r.checked,
						disabled: fe.value,
						"data-testid": `permission-${n.id}-${r.id}`,
						onClick: (e) => ge(n.id, r.id)
					}, [D(e(X), {
						name: r.checked ? "check" : "chrome-close",
						decorative: ""
					}, null, 8, ["name"]), L(" " + K(r.label), 1)], 10, vf))), 128))])], 8, ff))), 128))]),
					G("div", yf, [
						G("input", {
							class: "file-properties__permission-input",
							value: u.value,
							inputmode: "numeric",
							maxlength: "3",
							disabled: fe.value,
							"data-testid": "permission-access-input",
							"aria-label": "权限值",
							onInput: _e
						}, null, 40, bf),
						r[12] ||= G("span", { class: "file-properties__permission-action-label" }, "权限，所有者", -1),
						H(G("select", {
							"onUpdate:modelValue": r[0] ||= (e) => v.value = e,
							class: "file-properties__permission-select",
							disabled: fe.value,
							"data-testid": "permission-user-select",
							"aria-label": "所有者"
						}, [(f(!0), I(z, null, S(y.value, (e) => (f(), I("option", {
							key: e,
							value: e
						}, K(e), 9, Sf))), 128))], 8, xf), [[q, v.value]]),
						G("label", Cf, [H(G("input", {
							"onUpdate:modelValue": r[1] ||= (e) => d.value = e,
							type: "checkbox",
							disabled: fe.value,
							"data-testid": "permission-apply-children"
						}, null, 8, wf), [[U, d.value]]), r[11] ||= G("span", null, "应用到子目录", -1)]),
						G("button", {
							class: "file-properties__permission-apply",
							type: "button",
							disabled: fe.value || !de.value || !v.value,
							"data-testid": "permission-apply",
							onClick: ve
						}, K(_.value ? "应用中" : "应用"), 9, Tf)
					])
				]))]),
				_: 1
			}))])]),
			_: 1
		}, 8, ["show", "title"])]));
	}
}), [["__scopeId", "data-v-cb8b72fc"]]), Df = (e, t = 1) => Math.round(e * 10 ** t) / 10 ** t, Of = (e) => e.length === 0 ? 0 : Df(e.reduce((e, t) => e + t, 0) / e.length), kf = () => globalThis.performance?.now() ?? Date.now(), Af = (e, t, n = 1e3) => e.filter((e) => t - e <= n).length, jf = new class {
	commandDurations = [];
	layoutDurations = [];
	storeUpdateTimestamps = [];
	workerLabels = [];
	appMountMs = null;
	consoleCaptureStarted = !1;
	consoleErrorCount = 0;
	consoleWarningCount = 0;
	firstEditorReadyMs = null;
	lastCommandDurationMs = null;
	lastCommandId = null;
	lastConsoleMessage = null;
	lastLayoutDurationMs = null;
	lastWorkerResponseMs = null;
	slowestCommandDurationMs = null;
	slowestCommandId = null;
	commandFailureCount = 0;
	workspaceReadyMs = null;
	constructor(e = kf) {
		this.now = e;
	}
	recordCommand(e, t, n) {
		let r = Df(t);
		this.commandDurations.push({
			durationMs: r,
			timestamp: this.now()
		}), this.lastCommandDurationMs = r, this.lastCommandId = e, n || (this.commandFailureCount += 1), (this.slowestCommandDurationMs === null || r > this.slowestCommandDurationMs) && (this.slowestCommandDurationMs = r, this.slowestCommandId = e);
	}
	recordLayout(e) {
		let t = Df(e);
		this.layoutDurations.push({
			durationMs: t,
			timestamp: this.now()
		}), this.lastLayoutDurationMs = t;
	}
	recordStoreUpdate() {
		this.storeUpdateTimestamps.push(this.now());
	}
	markStartup(e, t) {
		let n = Df(t);
		if (e === "appMountMs") {
			this.appMountMs = n;
			return;
		}
		if (e === "firstEditorReadyMs" && this.firstEditorReadyMs === null) {
			this.firstEditorReadyMs = n;
			return;
		}
		e === "workspaceReadyMs" && (this.workspaceReadyMs = n);
	}
	recordConsole(e, t) {
		e === "error" ? this.consoleErrorCount += 1 : this.consoleWarningCount += 1, this.lastConsoleMessage = t.slice(0, 240);
	}
	recordWorker(e) {
		this.workerLabels.push(e);
	}
	recordWorkerResponse(e) {
		this.lastWorkerResponseMs = Df(e);
	}
	startConsoleCapture() {
		if (this.consoleCaptureStarted || !globalThis.console) return;
		this.consoleCaptureStarted = !0;
		let e = globalThis.console.error.bind(globalThis.console), t = globalThis.console.warn.bind(globalThis.console);
		globalThis.console.error = (...t) => {
			this.recordConsole("error", t.map(String).join(" ")), e(...t);
		}, globalThis.console.warn = (...e) => {
			this.recordConsole("warn", e.map(String).join(" ")), t(...e);
		};
	}
	getMetrics(e = this.now()) {
		let t = this.commandDurations.map((e) => e.durationMs), n = this.layoutDurations.map((e) => e.durationMs);
		return {
			commands: {
				averageDurationMs: Of(t),
				count: this.commandDurations.length,
				failedCount: this.commandFailureCount,
				lastCommandDurationMs: this.lastCommandDurationMs,
				lastCommandId: this.lastCommandId,
				slowestCommandDurationMs: this.slowestCommandDurationMs,
				slowestCommandId: this.slowestCommandId
			},
			layout: {
				averageDurationMs: Of(n),
				count: this.layoutDurations.length,
				lastDurationMs: this.lastLayoutDurationMs,
				perSecond: Af(this.layoutDurations.map((e) => e.timestamp), e)
			},
			runtime: {
				consoleErrorCount: this.consoleErrorCount,
				consoleWarningCount: this.consoleWarningCount,
				lastConsoleMessage: this.lastConsoleMessage
			},
			startup: {
				appMountMs: this.appMountMs,
				firstEditorReadyMs: this.firstEditorReadyMs,
				workspaceReadyMs: this.workspaceReadyMs
			},
			store: {
				updateCount: this.storeUpdateTimestamps.length,
				updateRatePerSecond: Af(this.storeUpdateTimestamps, e)
			},
			workers: {
				createdWorkerCount: this.workerLabels.length,
				labels: [...new Set(this.workerLabels)],
				lastWorkerResponseMs: this.lastWorkerResponseMs
			}
		};
	}
}(), Mf = 1024 * 1024, Nf = 1e3, Pf = 50, Ff = 500, If = 180, Lf = {
	maxCommandFailures: 0,
	maxConsoleErrors: 0,
	maxCreatedWorkerCount: 8,
	maxDomNodeCount: 12e3,
	maxEventLoopMaxLagMs: 80,
	maxFlatTreeBuildDurationMs: 16,
	maxFrameP95Ms: 24,
	maxHeapGrowthRateMBPerMinute: 12,
	maxLayoutPerSecond: 60,
	maxLongTaskTotalBlockingTimeMs: 150,
	maxResourceTransferKB: 4096,
	maxStoreUpdatesPerSecond: 60,
	minFps: 50
}, Rf = (e, t = 1) => Math.round(e * 10 ** t) / 10 ** t, zf = (e) => Rf(e / Mf), Bf = (e) => {
	try {
		return new URL(e).pathname.split("/").filter(Boolean).at(-1) ?? e;
	} catch {
		return e.split("/").filter(Boolean).at(-1) ?? e;
	}
}, Vf = (e, t) => {
	if (e.length === 0) return 0;
	let n = [...e].sort((e, t) => e - t);
	return Rf(n[Math.min(n.length - 1, Math.max(0, Math.ceil(t / 100 * n.length) - 1))] ?? 0);
}, Hf = (e) => e.length === 0 ? 0 : Rf(e.reduce((e, t) => e + t, 0) / e.length), Uf = () => globalThis.document?.getElementsByTagName("*").length ?? 0, Wf = () => globalThis.performance?.memory || null, Gf = () => {
	try {
		let e = Xt(), t = zt(), n = zl.getFlatTreeSnapshot(t.fileTree, t.expandedFolderPaths, {
			selectedPath: t.selectedPath,
			focusedPath: t.focusedPath
		});
		return {
			expandedFolderCount: t.expandedFolderPaths.length,
			fileTreeNodeCount: n.performance.totalNodeCount,
			flatTreeBuildDurationMs: n.performance.buildDurationMs,
			flatTreeChildrenIndexCount: n.performance.childrenIndexCount,
			flatTreeHiddenNodeCount: n.performance.hiddenNodeCount,
			flatTreePathIndexCount: n.performance.pathIndexCount,
			flatTreeRegistryNodeCount: n.performance.registryNodeCount,
			groupCount: e.groups.length,
			openTabCount: e.tabs.length,
			visibleFileTreeNodeCount: n.performance.visibleNodeCount
		};
	} catch {
		return {
			expandedFolderCount: 0,
			fileTreeNodeCount: 0,
			groupCount: 0,
			openTabCount: 0,
			visibleFileTreeNodeCount: 0
		};
	}
}, Kf = () => {
	let e = globalThis.performance?.getEntriesByType?.("resource").filter((e) => "name" in e) ?? [], t = e.reduce((e, t) => !e || t.duration > e.duration ? t : e, null), n = e.reduce((e, t) => e + (t.transferSize ?? 0), 0);
	return {
		scriptCount: e.filter((e) => e.initiatorType === "script" || e.name.endsWith(".js")).length,
		slowestResourceDurationMs: t ? Rf(t.duration) : null,
		slowestResourceName: t ? Bf(t.name) : null,
		stylesheetCount: e.filter((e) => e.initiatorType === "css" || e.name.endsWith(".css")).length,
		totalTransferKB: Rf(n / 1024),
		workerCount: e.filter((e) => e.name.includes("worker")).length
	};
}, qf = (e) => e === null ? "N/A" : `${e.toFixed(1)} MB`, Jf = (e) => e === null ? "N/A" : `${e.toFixed(1)} ms`, Yf = (e) => e === null ? "N/A" : String(e), Xf = (e) => e ?? "N/A", Zf = (e) => Number.isInteger(e) ? String(e) : e.toFixed(1), Qf = (e, t) => e === null ? "N/A" : `${Zf(e)}${t ? ` ${t}` : ""}`, $f = (e, t, n) => `${e === "min" ? ">=" : "<="} ${Qf(t, n)}`, ep = (e) => String(e).replaceAll("|", "\\|"), $ = (e, t, n = "") => `| ${e} | ${ep(t)} | ${ep(n)} |`, tp = (e) => {
	let t = e.actual === null ? "unknown" : e.comparator === "min" ? e.actual >= e.limit ? "pass" : "fail" : e.actual <= e.limit ? "pass" : "fail";
	return {
		...e,
		actualText: Qf(e.actual, e.unit),
		limitText: $f(e.comparator, e.limit, e.unit),
		status: t
	};
}, np = (e) => `| ${ep(e.label)} | ${ep(e.actualText)} | ${ep(e.limitText)} | ${e.status === "pass" ? "通过" : e.status === "fail" ? "超限" : "未知"} | ${ep(e.note)} |`, rp = (e, t = Lf) => {
	let n = [
		tp({
			id: "fps",
			label: "FPS",
			actual: e.fps === 0 && e.frameTime.averageMs === 0 ? null : e.fps,
			limit: t.minFps,
			comparator: "min",
			unit: "fps",
			note: "持续低于预算会影响编辑和滚动手感"
		}),
		tp({
			id: "frameTimeP95Ms",
			label: "P95 帧耗时",
			actual: e.frameTime.p95Ms === 0 ? null : e.frameTime.p95Ms,
			limit: t.maxFrameP95Ms,
			comparator: "max",
			unit: "ms",
			note: "P95 帧耗时用于发现偶发卡顿"
		}),
		tp({
			id: "longTaskTotalBlockingTimeMs",
			label: "长任务阻塞总时长",
			actual: e.longTasks.totalBlockingTimeMs,
			limit: t.maxLongTaskTotalBlockingTimeMs,
			comparator: "max",
			unit: "ms",
			note: "主线程长任务总阻塞时间"
		}),
		tp({
			id: "resourceTransferKB",
			label: "资源传输",
			actual: e.resources.totalTransferKB,
			limit: t.maxResourceTransferKB,
			comparator: "max",
			unit: "KB",
			note: "当前页面资源传输体积"
		}),
		tp({
			id: "createdWorkerCount",
			label: "已创建 Worker",
			actual: e.workers.createdWorkerCount,
			limit: t.maxCreatedWorkerCount,
			comparator: "max",
			unit: "",
			note: "Worker 数量持续增长需要排查释放逻辑"
		}),
		tp({
			id: "commandFailures",
			label: "命令失败",
			actual: e.workbench.commandFailureCount,
			limit: t.maxCommandFailures,
			comparator: "max",
			unit: "",
			note: "命令失败进入可观测预算"
		}),
		tp({
			id: "consoleErrors",
			label: "控制台错误",
			actual: e.runtime.consoleErrorCount,
			limit: t.maxConsoleErrors,
			comparator: "max",
			unit: "",
			note: "运行时错误不得静默进入验收"
		}),
		tp({
			id: "eventLoopMaxLagMs",
			label: "事件循环最大延迟",
			actual: e.eventLoop.maxLagMs,
			limit: t.maxEventLoopMaxLagMs,
			comparator: "max",
			unit: "ms",
			note: "主线程事件循环延迟峰值"
		}),
		tp({
			id: "heapGrowthRateMBPerMinute",
			label: "堆内存增长速率",
			actual: e.memory.heapGrowthRateMBPerMinute,
			limit: t.maxHeapGrowthRateMBPerMinute,
			comparator: "max",
			unit: "MB/min",
			note: "浏览器不暴露 heap 时显示 N/A"
		}),
		tp({
			id: "domNodeCount",
			label: "DOM 节点",
			actual: e.dom.nodeCount,
			limit: t.maxDomNodeCount,
			comparator: "max",
			unit: "",
			note: "DOM 规模影响样式和布局成本"
		}),
		tp({
			id: "flatTreeBuildDurationMs",
			label: "Flat Tree 构建耗时",
			actual: e.workbench.flatTreeBuildDurationMs ?? null,
			limit: t.maxFlatTreeBuildDurationMs,
			comparator: "max",
			unit: "ms",
			note: "资源管理器扁平树快照构建应控制在单帧预算内"
		}),
		tp({
			id: "storeUpdatesPerSecond",
			label: "状态更新/秒",
			actual: e.workbench.storeUpdateRatePerSecond,
			limit: t.maxStoreUpdatesPerSecond,
			comparator: "max",
			unit: "/s",
			note: "高频状态写入需要批处理或节流"
		}),
		tp({
			id: "layoutPerSecond",
			label: "布局调用/秒",
			actual: e.workbench.layoutPerSecond,
			limit: t.maxLayoutPerSecond,
			comparator: "max",
			unit: "/s",
			note: "高频布局调用需要合并触发"
		})
	], r = n.filter((e) => e.status === "fail"), i = n.filter((e) => e.status === "unknown");
	return {
		checks: n,
		failedChecks: r,
		status: r.length > 0 ? "fail" : "pass",
		summary: r.length > 0 ? `${r.length} 项检查超出预算。` : i.length > 0 ? `已知检查均通过；${i.length} 项检查暂无数据。` : "所有性能预算检查均通过。",
		unknownChecks: i
	};
}, ip = (e, t = Lf) => {
	let n = rp(e, t);
	return `${[
		"# Monaco 性能报告",
		"",
		"## AI 分析上下文",
		"- 目标：请基于以下快照分析编辑器卡顿、内存增长、渲染压力、工作台状态更新和资源加载风险。",
		"- 建议输出：先列高风险指标，再给出可能原因、验证步骤和可落地优化建议。",
		"- 说明：N/A 表示当前浏览器或当前阶段没有对应采集能力，不代表数值为 0。",
		"",
		"## 性能预算",
		"| 指标 | 数值 | 备注 |",
		"| --- | ---: | --- |",
		$("整体状态", n.status === "pass" ? "通过" : "超限", n.summary),
		$("失败检查", n.failedChecks.length, ""),
		$("未知检查", n.unknownChecks.length, ""),
		"",
		"| 检查项 | 当前值 | 预算 | 状态 | 备注 |",
		"| --- | ---: | ---: | --- | --- |",
		...n.checks.map(np),
		"",
		"## 核心指标",
		"| 指标 | 数值 | 备注 |",
		"| --- | ---: | --- |",
		$("FPS", e.fps, "越接近 60/120 越稳定"),
		$("平均帧耗时", Jf(e.frameTime.averageMs), ""),
		$("P95 帧耗时", Jf(e.frameTime.p95Ms), "高于 16.7ms 可能掉帧"),
		$("最大帧耗时", Jf(e.frameTime.maxMs), ""),
		$("DOM 节点", e.dom.nodeCount, "节点越多，样式和布局成本越高"),
		$("事件循环延迟", Jf(e.eventLoop.lagMs), ""),
		$("最大事件循环延迟", Jf(e.eventLoop.maxLagMs), ""),
		"",
		"## 长任务",
		"| 指标 | 数值 | 备注 |",
		"| --- | ---: | --- |",
		$("数量", e.longTasks.count, ">50ms 的主线程任务"),
		$("最近耗时", Jf(e.longTasks.lastDurationMs), ""),
		$("阻塞总时长", Jf(e.longTasks.totalBlockingTimeMs), ""),
		"",
		"## 内存",
		"| 指标 | 数值 | 备注 |",
		"| --- | ---: | --- |",
		$("已用堆内存", qf(e.memory.usedHeapSizeMB), ""),
		$("总堆内存", qf(e.memory.totalHeapSizeMB), ""),
		$("堆内存上限", qf(e.memory.jsHeapSizeLimitMB), ""),
		$("峰值堆内存", qf(e.memory.heapPeakMB), ""),
		$("堆内存增量", qf(e.memory.heapDeltaMB), "相对面板启动时变化"),
		$("堆内存增长速率", e.memory.heapGrowthRateMBPerMinute === null ? "N/A" : `${e.memory.heapGrowthRateMBPerMinute.toFixed(1)} MB/min`, ""),
		"",
		"## 编辑器",
		"| 指标 | 数值 | 备注 |",
		"| --- | ---: | --- |",
		$("编辑器数量", e.editor.editorCount, ""),
		$("模型数量", e.editor.modelCount, "关闭 tab 后持续增长需要关注"),
		$("文本总量", e.editor.totalTextSize, "全部模型字符数"),
		$("装饰数量", Yf(e.editor.decorationCount), ""),
		$("标记数量", Yf(e.editor.markerCount), ""),
		$("已创建 Worker", e.workers.createdWorkerCount, ""),
		$("Worker 标签", e.workers.labels.join(", ") || "N/A", ""),
		$("最近 Worker 响应", Jf(e.workers.lastWorkerResponseMs), ""),
		"",
		"## 工作台",
		"| 指标 | 数值 | 备注 |",
		"| --- | ---: | --- |",
		$("打开标签", e.workbench.openTabCount, ""),
		$("编辑器组", e.workbench.groupCount, ""),
		$("文件树节点", e.workbench.fileTreeNodeCount, ""),
		$("可见文件树节点", e.workbench.visibleFileTreeNodeCount, ""),
		$("展开目录", e.workbench.expandedFolderCount, ""),
		$("Flat Tree 构建耗时", Jf(e.workbench.flatTreeBuildDurationMs ?? null), "目标 <= 16ms"),
		$("Flat Tree Registry", Yf(e.workbench.flatTreeRegistryNodeCount ?? null), "全量已加载节点"),
		$("Flat Tree PathIndex", Yf(e.workbench.flatTreePathIndexCount ?? null), "路径索引规模"),
		$("Flat Tree ChildrenIndex", Yf(e.workbench.flatTreeChildrenIndexCount ?? null), "子级索引规模"),
		$("Flat Tree 隐藏节点", Yf(e.workbench.flatTreeHiddenNodeCount ?? null), "折叠软隐藏节点"),
		$("状态更新/秒", e.workbench.storeUpdateRatePerSecond, ""),
		$("状态更新次数", e.workbench.storeUpdateCount, ""),
		$("命令执行", e.workbench.commandCount, ""),
		$("命令失败", e.workbench.commandFailureCount, ""),
		$("最近命令", Xf(e.workbench.lastCommandId), ""),
		$("最近命令耗时", Jf(e.workbench.lastCommandDurationMs), ""),
		$("最慢命令", Xf(e.workbench.slowestCommandId), ""),
		$("最慢命令耗时", Jf(e.workbench.slowestCommandDurationMs), ""),
		$("布局调用/秒", e.workbench.layoutPerSecond, ""),
		$("布局调用次数", e.workbench.layoutCount, ""),
		$("最近布局耗时", Jf(e.workbench.lastLayoutDurationMs), ""),
		$("平均布局耗时", Jf(e.workbench.layoutAverageDurationMs), ""),
		"",
		"## 资源与启动",
		"| 指标 | 数值 | 备注 |",
		"| --- | ---: | --- |",
		$("脚本资源", e.resources.scriptCount, ""),
		$("样式资源", e.resources.stylesheetCount, ""),
		$("Worker 资源", e.resources.workerCount, ""),
		$("传输体积", `${e.resources.totalTransferKB.toFixed(1)} KB`, ""),
		$("最慢资源", Xf(e.resources.slowestResourceName), ""),
		$("最慢资源耗时", Jf(e.resources.slowestResourceDurationMs), ""),
		$("工作区就绪", Jf(e.startup.workspaceReadyMs), ""),
		$("应用挂载", Jf(e.startup.appMountMs), ""),
		$("首个编辑器就绪", Jf(e.startup.firstEditorReadyMs), ""),
		"",
		"## 运行时",
		"| 指标 | 数值 | 备注 |",
		"| --- | ---: | --- |",
		$("控制台警告", e.runtime.consoleWarningCount, ""),
		$("控制台错误", e.runtime.consoleErrorCount, ""),
		$("最近控制台消息", Xf(e.runtime.lastConsoleMessage), "")
	].join("\n")}\n`;
}, ap = class {
	frameDurations = [];
	frameTimestamps = [];
	eventLoopIntervalId = null;
	eventLoopLagMs = 0;
	fps = 0;
	heapBaselineMB = null;
	heapBaselineTimestamp = null;
	heapPeakMB = null;
	lastFrameTimestamp = null;
	longTaskCount = 0;
	longTaskObserver = null;
	maxEventLoopLagMs = 0;
	totalBlockingTimeMs = 0;
	lastLongTaskDurationMs = null;
	constructor(e = {}) {
		this.dependencies = e, this.captureMemoryBaseline();
	}
	start() {
		jf.startConsoleCapture(), this.startLongTaskObserver(), this.startEventLoopLagProbe();
	}
	stop() {
		this.longTaskObserver?.disconnect(), this.longTaskObserver = null, this.eventLoopIntervalId !== null && (window.clearInterval(this.eventLoopIntervalId), this.eventLoopIntervalId = null);
	}
	recordFrame(e = this.getNow()) {
		this.lastFrameTimestamp !== null && (this.frameDurations.push(Rf(e - this.lastFrameTimestamp)), this.frameDurations.length > If && this.frameDurations.shift()), this.lastFrameTimestamp = e, this.frameTimestamps.push(e);
		let t = e - Ff;
		for (; this.frameTimestamps.length > 0 && this.frameTimestamps[0] < t;) this.frameTimestamps.shift();
		let n = this.frameTimestamps[0], r = this.frameTimestamps.at(-1);
		if (n === void 0 || r === void 0 || n === r) {
			this.fps = 0;
			return;
		}
		this.fps = Math.round((this.frameTimestamps.length - 1) * 1e3 / (r - n));
	}
	recordLongTask(e) {
		this.longTaskCount += 1, this.lastLongTaskDurationMs = Rf(e), this.totalBlockingTimeMs = Rf(this.totalBlockingTimeMs + Math.max(0, e - Pf));
	}
	recordEventLoopLag(e) {
		let t = Rf(Math.max(0, e));
		this.eventLoopLagMs = t, this.maxEventLoopLagMs = Math.max(this.maxEventLoopLagMs, t);
	}
	getSnapshot() {
		let e = this.getNow(), t = this.getMemory(), n = this.getTelemetryMetrics(), r = this.getWorkspaceMetrics();
		return {
			dom: { nodeCount: this.getNodeCount() },
			editor: this.getEditorMetrics(),
			eventLoop: {
				lagMs: this.eventLoopLagMs,
				maxLagMs: this.maxEventLoopLagMs
			},
			fps: this.fps,
			frameTime: {
				averageMs: Hf(this.frameDurations),
				maxMs: this.frameDurations.length ? Math.max(...this.frameDurations) : 0,
				p95Ms: Vf(this.frameDurations, 95)
			},
			longTasks: {
				count: this.longTaskCount,
				lastDurationMs: this.lastLongTaskDurationMs,
				totalBlockingTimeMs: this.totalBlockingTimeMs
			},
			memory: this.createMemoryMetrics(t, e),
			resources: this.getResourceMetrics(),
			runtime: n.runtime,
			startup: n.startup,
			updatedAt: e,
			workbench: {
				...r,
				averageCommandDurationMs: n.commands.averageDurationMs,
				commandCount: n.commands.count,
				commandFailureCount: n.commands.failedCount,
				lastCommandDurationMs: n.commands.lastCommandDurationMs,
				lastCommandId: n.commands.lastCommandId,
				lastLayoutDurationMs: n.layout.lastDurationMs,
				layoutAverageDurationMs: n.layout.averageDurationMs,
				layoutCount: n.layout.count,
				layoutPerSecond: n.layout.perSecond,
				slowestCommandDurationMs: n.commands.slowestCommandDurationMs,
				slowestCommandId: n.commands.slowestCommandId,
				storeUpdateCount: n.store.updateCount,
				storeUpdateRatePerSecond: n.store.updateRatePerSecond
			},
			workers: n.workers
		};
	}
	captureMemoryBaseline() {
		let e = this.getMemory();
		if (!e) return;
		let t = zf(e.usedJSHeapSize);
		this.heapBaselineMB = t, this.heapBaselineTimestamp = this.getNow(), this.heapPeakMB = t;
	}
	createMemoryMetrics(e, t) {
		if (!e) return {
			heapDeltaMB: null,
			heapGrowthRateMBPerMinute: null,
			heapPeakMB: null,
			jsHeapSizeLimitMB: null,
			totalHeapSizeMB: null,
			usedHeapSizeMB: null
		};
		let n = zf(e.usedJSHeapSize);
		(this.heapBaselineMB === null || this.heapBaselineTimestamp === null) && (this.heapBaselineMB = n, this.heapBaselineTimestamp = t), this.heapPeakMB = this.heapPeakMB === null ? n : Math.max(this.heapPeakMB, n);
		let r = Rf(n - this.heapBaselineMB), i = Math.max(0, (t - this.heapBaselineTimestamp) / 6e4);
		return {
			heapDeltaMB: r,
			heapGrowthRateMBPerMinute: i === 0 ? 0 : Rf(r / i),
			heapPeakMB: this.heapPeakMB,
			jsHeapSizeLimitMB: zf(e.jsHeapSizeLimit),
			totalHeapSizeMB: zf(e.totalJSHeapSize),
			usedHeapSizeMB: n
		};
	}
	startLongTaskObserver() {
		this.longTaskObserver || typeof PerformanceObserver > "u" || (PerformanceObserver.supportedEntryTypes ?? []).includes("longtask") && (this.longTaskObserver = new PerformanceObserver((e) => {
			for (let t of e.getEntries()) this.recordLongTask(t.duration);
		}), this.longTaskObserver.observe({ entryTypes: ["longtask"] }));
	}
	startEventLoopLagProbe() {
		if (this.eventLoopIntervalId !== null) return;
		let e = this.getNow() + Nf;
		this.eventLoopIntervalId = window.setInterval(() => {
			let t = this.getNow();
			this.recordEventLoopLag(t - e), e = t + Nf;
		}, Nf);
	}
	getEditorMetrics() {
		return this.dependencies.getEditorMetrics?.() ?? _o.getPerformanceMetrics();
	}
	getMemory() {
		return this.dependencies.getMemory ? this.dependencies.getMemory() : Wf();
	}
	getNodeCount() {
		return this.dependencies.getNodeCount?.() ?? Uf();
	}
	getResourceMetrics() {
		return this.dependencies.getResourceMetrics?.() ?? Kf();
	}
	getTelemetryMetrics() {
		return this.dependencies.getTelemetryMetrics?.() ?? jf.getMetrics(this.getNow());
	}
	getWorkspaceMetrics() {
		return this.dependencies.getWorkspaceMetrics?.() ?? Gf();
	}
	getNow() {
		return this.dependencies.now?.() ?? globalThis.performance?.now() ?? Date.now();
	}
}, op = {
	class: "performance-monitor__tabs",
	role: "tablist",
	"aria-label": "性能指标分类"
}, sp = [
	"aria-selected",
	"data-testid",
	"onClick"
], cp = {
	key: 0,
	class: "performance-monitor__content"
}, lp = ["data-status"], up = { class: "performance-monitor__grid" }, dp = { class: "performance-monitor__label" }, fp = { key: 0 }, pp = {
	key: 1,
	class: "performance-monitor__content performance-monitor__content--export"
}, mp = ["value"], hp = 380, gp = 560, _p = 12, vp = 250, yp = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "PerformanceMonitorOverlay",
	props: {
		initialPosition: {},
		provider: {}
	},
	setup(e) {
		let r = e, i = r.provider ?? new ap(), a = Jt(), s = n(i.getSnapshot()), c = n("overview"), l = n("idle"), u = n(null), d = pe({
			x: r.initialPosition?.x ?? 0,
			y: r.initialPosition?.y ?? 0
		}), m = pe({
			active: !1,
			originX: 0,
			originY: 0,
			startX: 0,
			startY: 0
		}), h = null, _ = null, v = null, y = [
			{
				id: "overview",
				label: "概览",
				icon: "codicon-dashboard"
			},
			{
				id: "rendering",
				label: "渲染",
				icon: "codicon-graph-line"
			},
			{
				id: "memory",
				label: "内存",
				icon: "codicon-server-process"
			},
			{
				id: "editor",
				label: "编辑器",
				icon: "codicon-files"
			},
			{
				id: "workbench",
				label: "工作台",
				icon: "codicon-layout"
			},
			{
				id: "resources",
				label: "资源",
				icon: "codicon-cloud-download"
			},
			{
				id: "budget",
				label: "预算",
				icon: "codicon-pulse"
			},
			{
				id: "export",
				label: "导出",
				icon: "codicon-export"
			}
		], b = j(() => ({
			left: `${d.x}px`,
			top: `${d.y}px`
		})), x = j(() => {
			let e = qf(s.value.memory.usedHeapSizeMB), t = qf(s.value.memory.totalHeapSizeMB);
			return s.value.memory.usedHeapSizeMB === null || s.value.memory.totalHeapSizeMB === null ? "N/A" : `${e} / ${t}`;
		}), C = j(() => qf(s.value.memory.jsHeapSizeLimitMB)), w = j(() => {
			let e = s.value.memory.heapGrowthRateMBPerMinute;
			return e === null ? "N/A" : `${e.toFixed(1)} MB/min`;
		}), T = j(() => `${s.value.frameTime.averageMs.toFixed(1)} / ${s.value.frameTime.p95Ms.toFixed(1)} ms`), E = j(() => `${s.value.longTasks.count} / ${s.value.longTasks.totalBlockingTimeMs.toFixed(1)} ms`), D = j(() => `${s.value.workbench.commandCount} / ${s.value.workbench.lastCommandDurationMs?.toFixed(1) ?? "N/A"} ms`);
		j(() => `${s.value.resources.scriptCount} JS / ${s.value.resources.workerCount} W`);
		let O = j(() => rp(s.value)), A = j(() => ip(s.value)), M = j(() => l.value === "copied" ? "已复制" : l.value === "selected" ? "已选中" : l.value === "failed" ? "失败" : "复制"), F = (e) => e === null ? "N/A" : `${e.toFixed(1)} ms`, L = (e) => `${e}/s`, R = (e) => e === "pass" ? "通过" : e === "fail" ? "超限" : e === "unknown" ? "未知" : e, B = j(() => R(O.value.status)), V = j(() => O.value.status === "pass" ? "codicon-pass" : "codicon-error"), ee = j(() => [
			{
				icon: "codicon-dashboard",
				label: "FPS",
				value: s.value.fps,
				note: "帧率"
			},
			{
				icon: "codicon-graph-line",
				label: "帧耗时",
				value: T.value,
				note: "平均 / P95"
			},
			{
				icon: "codicon-warning",
				label: "长任务",
				value: E.value,
				note: "次数 / 阻塞"
			},
			{
				icon: "codicon-clock",
				label: "事件延迟",
				value: F(s.value.eventLoop.lagMs),
				note: "主线程"
			},
			{
				icon: "codicon-symbol-structure",
				label: "DOM 节点",
				value: s.value.dom.nodeCount,
				note: "当前页面"
			},
			{
				icon: "codicon-server-process",
				label: "JS 堆内存",
				value: x.value,
				note: "已用 / 总量",
				wide: !0
			}
		]), te = j(() => [
			{
				icon: "codicon-dashboard",
				label: "FPS",
				value: s.value.fps
			},
			{
				icon: "codicon-graph-line",
				label: "平均帧耗时",
				value: F(s.value.frameTime.averageMs)
			},
			{
				icon: "codicon-graph-scatter",
				label: "P95 帧耗时",
				value: F(s.value.frameTime.p95Ms)
			},
			{
				icon: "codicon-pulse",
				label: "最大帧耗时",
				value: F(s.value.frameTime.maxMs)
			},
			{
				icon: "codicon-warning",
				label: "长任务数量",
				value: s.value.longTasks.count
			},
			{
				icon: "codicon-debug-alt",
				label: "阻塞总时长",
				value: F(s.value.longTasks.totalBlockingTimeMs)
			},
			{
				icon: "codicon-history",
				label: "最近长任务",
				value: F(s.value.longTasks.lastDurationMs)
			},
			{
				icon: "codicon-clock",
				label: "事件延迟峰值",
				value: F(s.value.eventLoop.maxLagMs)
			}
		]), ne = j(() => [
			{
				icon: "codicon-server-process",
				label: "JS 堆内存",
				value: x.value,
				note: "已用 / 总量",
				wide: !0
			},
			{
				icon: "codicon-chip",
				label: "堆内存上限",
				value: C.value
			},
			{
				icon: "codicon-graph-line",
				label: "峰值内存",
				value: qf(s.value.memory.heapPeakMB)
			},
			{
				icon: "codicon-diff-modified",
				label: "内存增量",
				value: qf(s.value.memory.heapDeltaMB)
			},
			{
				icon: "codicon-arrow-swap",
				label: "增长速率",
				value: w.value
			}
		]), re = j(() => [
			{
				icon: "codicon-edit",
				label: "编辑器数量",
				value: s.value.editor.editorCount
			},
			{
				icon: "codicon-files",
				label: "模型数量",
				value: s.value.editor.modelCount
			},
			{
				icon: "codicon-symbol-text",
				label: "文本总量",
				value: s.value.editor.totalTextSize,
				note: "字符"
			},
			{
				icon: "codicon-symbol-color",
				label: "装饰 / 标记",
				value: `${s.value.editor.decorationCount ?? "N/A"} / ${s.value.editor.markerCount ?? "N/A"}`
			},
			{
				icon: "codicon-server-process",
				label: "Worker 数量",
				value: s.value.workers.createdWorkerCount
			},
			{
				icon: "codicon-list-tree",
				label: "Worker 标签",
				value: s.value.workers.labels.join(", ") || "N/A",
				wide: !0
			},
			{
				icon: "codicon-watch",
				label: "Worker 响应",
				value: F(s.value.workers.lastWorkerResponseMs)
			}
		]), U = j(() => [
			{
				icon: "codicon-multiple-windows",
				label: "打开标签",
				value: s.value.workbench.openTabCount
			},
			{
				icon: "codicon-layout",
				label: "编辑器组",
				value: s.value.workbench.groupCount
			},
			{
				icon: "codicon-list-tree",
				label: "文件树节点",
				value: `${s.value.workbench.visibleFileTreeNodeCount} / ${s.value.workbench.fileTreeNodeCount}`,
				note: "可见 / 总数"
			},
			{
				icon: "codicon-folder-opened",
				label: "展开目录",
				value: s.value.workbench.expandedFolderCount
			},
			{
				icon: "codicon-watch",
				label: "Flat Tree",
				value: F(s.value.workbench.flatTreeBuildDurationMs ?? null),
				note: "构建耗时"
			},
			{
				icon: "codicon-database",
				label: "Registry",
				value: s.value.workbench.flatTreeRegistryNodeCount ?? "N/A",
				note: "节点索引"
			},
			{
				icon: "codicon-symbol-string",
				label: "PathIndex",
				value: s.value.workbench.flatTreePathIndexCount ?? "N/A",
				note: "路径索引"
			},
			{
				icon: "codicon-symbol-array",
				label: "ChildrenIndex",
				value: s.value.workbench.flatTreeChildrenIndexCount ?? "N/A",
				note: "子级索引"
			},
			{
				icon: "codicon-eye-closed",
				label: "隐藏节点",
				value: s.value.workbench.flatTreeHiddenNodeCount ?? "N/A",
				note: "折叠保留"
			},
			{
				icon: "codicon-sync",
				label: "状态更新",
				value: L(s.value.workbench.storeUpdateRatePerSecond)
			},
			{
				icon: "codicon-terminal",
				label: "命令执行",
				value: D.value,
				note: "次数 / 最近耗时",
				wide: !0
			},
			{
				icon: "codicon-error",
				label: "命令失败",
				value: s.value.workbench.commandFailureCount
			},
			{
				icon: "codicon-dashboard",
				label: "布局调用",
				value: `${s.value.workbench.layoutCount} / ${L(s.value.workbench.layoutPerSecond)}`
			},
			{
				icon: "codicon-flame",
				label: "最慢命令",
				value: s.value.workbench.slowestCommandId ?? "N/A",
				wide: !0
			}
		]), ie = j(() => [
			{
				icon: "codicon-file-code",
				label: "脚本资源",
				value: s.value.resources.scriptCount
			},
			{
				icon: "codicon-file-media",
				label: "样式资源",
				value: s.value.resources.stylesheetCount
			},
			{
				icon: "codicon-server-process",
				label: "Worker 资源",
				value: s.value.resources.workerCount
			},
			{
				icon: "codicon-cloud-download",
				label: "传输体积",
				value: `${s.value.resources.totalTransferKB.toFixed(1)} KB`
			},
			{
				icon: "codicon-flame",
				label: "最慢资源",
				value: s.value.resources.slowestResourceName ?? "N/A",
				wide: !0
			},
			{
				icon: "codicon-watch",
				label: "资源耗时",
				value: F(s.value.resources.slowestResourceDurationMs)
			},
			{
				icon: "codicon-rocket",
				label: "应用挂载",
				value: F(s.value.startup.appMountMs)
			},
			{
				icon: "codicon-workspace-trusted",
				label: "工作区就绪",
				value: F(s.value.startup.workspaceReadyMs)
			},
			{
				icon: "codicon-edit",
				label: "首个编辑器",
				value: F(s.value.startup.firstEditorReadyMs)
			},
			{
				icon: "codicon-bug",
				label: "控制台告警",
				value: `${s.value.runtime.consoleWarningCount} 警告 / ${s.value.runtime.consoleErrorCount} 错误`,
				wide: !0
			}
		]), W = j(() => O.value.checks.map((e) => ({
			icon: e.status === "pass" ? "codicon-pass" : e.status === "fail" ? "codicon-error" : "codicon-question",
			label: e.label,
			value: R(e.status),
			note: `${e.actualText} / ${e.limitText}`,
			wide: e.status === "fail"
		}))), ae = j(() => c.value === "rendering" ? te.value : c.value === "memory" ? ne.value : c.value === "editor" ? re.value : c.value === "workbench" ? U.value : c.value === "resources" ? ie.value : c.value === "budget" ? W.value : ee.value), q = (e, t, n) => Math.min(Math.max(e, t), Math.max(t, n)), oe = () => {
			r.initialPosition || (d.x = q(window.innerWidth - hp - 24, _p, window.innerWidth - hp - _p), d.y = q(64, _p, window.innerHeight - gp - _p));
		}, se = () => {
			s.value = i.getSnapshot();
		}, ce = async (e) => {
			if (navigator.clipboard?.writeText) try {
				return await navigator.clipboard.writeText(e), !0;
			} catch {}
			let t = u.value ?? document.createElement("textarea"), n = !u.value;
			n && (t.value = e, t.setAttribute("readonly", "true"), t.style.position = "fixed", t.style.opacity = "0", document.body.appendChild(t)), t.select();
			let r = document.execCommand("copy");
			return n && document.body.removeChild(t), r;
		}, J = async () => {
			try {
				l.value = await ce(A.value) ? "copied" : "selected";
			} catch {
				l.value = "failed";
			}
			v !== null && window.clearTimeout(v), v = window.setTimeout(() => {
				l.value = "idle", v = null;
			}, 1800);
		}, le = () => {
			a.setPerformanceMonitorVisible(!1);
		}, Y = (e) => {
			i.recordFrame(e), h = window.requestAnimationFrame(Y);
		}, ue = () => {
			m.active = !1, window.removeEventListener("pointermove", de), window.removeEventListener("pointerup", ue);
		}, de = (e) => {
			if (!m.active) return;
			let t = m.originX + e.clientX - m.startX, n = m.originY + e.clientY - m.startY;
			d.x = q(t, _p, window.innerWidth - hp - _p), d.y = q(n, _p, window.innerHeight - gp - _p);
		}, fe = (e) => {
			m.active = !0, m.startX = e.clientX, m.startY = e.clientY, m.originX = d.x, m.originY = d.y, window.addEventListener("pointermove", de), window.addEventListener("pointerup", ue);
		};
		return o(() => {
			oe(), i.start?.(), se(), h = window.requestAnimationFrame(Y), _ = window.setInterval(se, vp);
		}), g(() => {
			h !== null && window.cancelAnimationFrame(h), _ !== null && window.clearInterval(_), v !== null && window.clearTimeout(v), i.stop?.(), ue();
		}), (e, n) => (f(), I("section", {
			class: "performance-monitor",
			"data-testid": "performance-monitor",
			style: p(b.value),
			"aria-label": "开发性能检测"
		}, [
			G("header", {
				class: "performance-monitor__header",
				"data-testid": "performance-monitor-drag-handle",
				onPointerdown: fe
			}, [
				n[4] ||= G("span", {
					class: "codicon codicon-pulse",
					"aria-hidden": "true"
				}, null, -1),
				n[5] ||= G("span", { class: "performance-monitor__title" }, "性能检测", -1),
				G("button", {
					class: "performance-monitor__copy",
					type: "button",
					"aria-label": "复制性能报告",
					onPointerdown: n[0] ||= P(() => {}, ["stop"]),
					onClick: P(J, ["stop"])
				}, [n[2] ||= G("span", {
					class: "codicon codicon-copy",
					"aria-hidden": "true"
				}, null, -1), G("span", null, K(M.value), 1)], 32),
				G("button", {
					class: "performance-monitor__close",
					type: "button",
					"aria-label": "关闭性能检测",
					title: "关闭性能检测",
					onPointerdown: n[1] ||= P(() => {}, ["stop"]),
					onClick: P(le, ["stop"])
				}, [...n[3] ||= [G("span", {
					class: "codicon codicon-close",
					"aria-hidden": "true"
				}, null, -1)]], 32),
				n[6] ||= G("span", {
					class: "codicon codicon-gripper performance-monitor__grip",
					"aria-hidden": "true"
				}, null, -1)
			], 32),
			G("nav", op, [(f(), I(z, null, S(y, (e) => G("button", {
				key: e.id,
				class: t(["performance-monitor__tab", { "performance-monitor__tab--active": c.value === e.id }]),
				type: "button",
				role: "tab",
				"aria-selected": c.value === e.id,
				"data-testid": `performance-tab-${e.id}`,
				onClick: (t) => c.value = e.id
			}, [G("span", {
				class: t(["codicon", e.icon]),
				"aria-hidden": "true"
			}, null, 2), G("span", null, K(e.label), 1)], 10, sp)), 64))]),
			c.value === "export" ? (f(), I("div", pp, [n[8] ||= G("div", { class: "performance-monitor__export-note" }, [G("strong", null, "导出给 AI 分析"), G("span", null, "复制下方 Markdown 性能报告，可直接粘贴给 AI 做卡顿、内存和渲染优化分析。")], -1), G("button", {
				class: "performance-monitor__export-copy",
				type: "button",
				onClick: J
			}, [n[7] ||= G("span", {
				class: "codicon codicon-copy",
				"aria-hidden": "true"
			}, null, -1), G("span", null, K(M.value), 1)])])) : (f(), I("div", cp, [c.value === "budget" ? (f(), I("div", {
				key: 0,
				class: "performance-monitor__budget-summary",
				"data-testid": "performance-budget-status",
				"data-status": O.value.status
			}, [
				G("span", {
					class: t(["codicon", V.value]),
					"aria-hidden": "true"
				}, null, 2),
				G("strong", null, K(B.value), 1),
				G("small", null, K(O.value.summary), 1)
			], 8, lp)) : N("", !0), G("div", up, [(f(!0), I(z, null, S(ae.value, (e) => (f(), I("div", {
				key: `${e.label}-${e.value}`,
				class: t(["performance-monitor__metric", { "performance-monitor__metric--wide": e.wide }])
			}, [
				G("span", {
					class: t(["codicon", e.icon]),
					"aria-hidden": "true"
				}, null, 2),
				G("span", dp, K(e.label), 1),
				G("strong", null, K(e.value), 1),
				e.note ? (f(), I("small", fp, K(e.note), 1)) : N("", !0)
			], 2))), 128))])])),
			H(G("textarea", {
				ref_key: "reportOutputRef",
				ref: u,
				class: "performance-monitor__report",
				"data-testid": "performance-report-output",
				"aria-label": "性能报告导出内容",
				readonly: "",
				value: A.value
			}, null, 8, mp), [[k, c.value === "export"]])
		], 4));
	}
}), [["__scopeId", "data-v-2500a438"]]), bp = (e) => {
	let t = {
		id: e.id,
		title: e.title,
		category: e.category
	};
	return e.keybinding && (t.keybinding = e.keybinding), t;
}, xp = class {
	commands = /* @__PURE__ */ new Map();
	register(e) {
		return this.commands.has(e.id) ? {
			ok: !1,
			error: {
				code: "COMMAND_ALREADY_REGISTERED",
				message: `Command "${e.id}" is already registered.`
			}
		} : (this.commands.set(e.id, e), {
			ok: !0,
			commandId: e.id
		});
	}
	unregister(e) {
		return this.commands.delete(e);
	}
	get(e) {
		return this.commands.get(e);
	}
	list() {
		return Array.from(this.commands.values()).map(bp);
	}
}, Sp = () => ({ timestamp: Date.now() }), Cp = () => globalThis.performance?.now() ?? Date.now(), wp = class {
	constructor(e, t = Sp, n = Gt) {
		this.registry = e, this.createContext = t, this.policyGuard = n;
	}
	async execute(e, t) {
		let n = Cp(), r = this.registry.get(e);
		if (!r) return jf.recordCommand(e, Cp() - n, !1), {
			ok: !1,
			commandId: e,
			error: {
				code: "COMMAND_NOT_FOUND",
				message: `命令 "${e}" 尚未注册。`
			}
		};
		let i = this.policyGuard.evaluateCommand(e);
		if (!i.allowed) {
			this.policyGuard.recordCommandDecision?.(e, i);
			let t = `策略拒绝: ${i.reason}`;
			return qt.appendLine("Enterprise Policy", t), jf.recordCommand(e, Cp() - n, !1), {
				ok: !1,
				commandId: e,
				error: {
					code: "COMMAND_BLOCKED_BY_POLICY",
					message: t
				}
			};
		}
		let a = this.createContext();
		if (typeof r.disabled == "function" ? r.disabled(a) : r.disabled === !0) return jf.recordCommand(e, Cp() - n, !1), {
			ok: !1,
			commandId: e,
			error: {
				code: "COMMAND_DISABLED",
				message: `命令 "${e}" 已禁用。`
			}
		};
		try {
			return await r.run(t, a), jf.recordCommand(e, Cp() - n, !0), {
				ok: !0,
				commandId: e
			};
		} catch (t) {
			return jf.recordCommand(e, Cp() - n, !1), {
				ok: !1,
				commandId: e,
				error: {
					code: "COMMAND_FAILED",
					message: `命令 "${e}" 执行失败。`,
					cause: t
				}
			};
		}
	}
}, Tp = new xp(), Ep = new wp(Tp), Dp = { class: "command-palette__panel" }, Op = ["value", "placeholder"], kp = ["data-command-id", "onClick"], Ap = { key: 0 }, jp = ["data-file-path", "onClick"], Mp = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "CommandPalette",
	props: { executeCommand: { type: Function } },
	setup(t) {
		let r = t, i = ft(), a = Rt(), s = zt(), c = n(null), l = (e, t) => r.executeCommand?.(e, t) ?? Ep.execute(e, t), u = (e) => e.flatMap((e) => e.type === "file" ? [e] : u(e.children ?? [])), d = j(() => a.query.trim().toLowerCase()), p = j(() => i.commands.filter((e) => `${e.title} ${e.id} ${e.category}`.toLowerCase().includes(d.value))), m = j(() => u(s.fileTree).filter((e) => `${e.name} ${e.path}`.toLowerCase().includes(d.value))), h = async (e) => {
			await l(e), a.close();
		}, g = (e) => gt.getEffectiveKeybinding(e), _ = async (e) => {
			await l("file.open", {
				path: e.path,
				title: e.name,
				language: e.language ?? Lt(e.path)
			}), a.close();
		};
		return o(async () => {
			await ee(), c.value?.focus();
		}), (t, n) => e(a).visible ? (f(), I("div", {
			key: 0,
			class: "command-palette",
			role: "dialog",
			"aria-modal": "true",
			"data-testid": "command-palette",
			onKeydown: n[1] ||= le((t) => e(a).close(), ["esc"])
		}, [G("div", Dp, [G("input", {
			ref_key: "inputRef",
			ref: c,
			class: "command-palette__input",
			"data-testid": "command-palette-input",
			value: e(a).query,
			placeholder: e(a).mode === "commands" ? "运行命令" : "打开文件",
			onInput: n[0] ||= (t) => e(a).setQuery(t.target.value)
		}, null, 40, Op), D(ot, { class: "command-palette__list" }, {
			default: M(() => [e(a).mode === "commands" ? (f(!0), I(z, { key: 0 }, S(p.value, (e) => (f(), I("button", {
				key: e.id,
				class: "command-palette__item",
				type: "button",
				"data-command-id": e.id,
				onClick: (t) => h(e.id)
			}, [
				D(X, {
					name: "terminal",
					decorative: ""
				}),
				G("span", null, K(e.title), 1),
				g(e) ? (f(), I("kbd", Ap, K(g(e)), 1)) : N("", !0)
			], 8, kp))), 128)) : (f(!0), I(z, { key: 1 }, S(m.value, (e) => (f(), I("button", {
				key: e.path,
				class: "command-palette__item",
				type: "button",
				"data-file-path": e.path,
				onClick: (t) => _(e)
			}, [
				D(X, {
					name: "file",
					decorative: ""
				}),
				G("span", null, K(e.name), 1),
				G("small", null, K(e.path), 1)
			], 8, jp))), 128))]),
			_: 1
		})])], 32)) : N("", !0);
	}
}), [["__scopeId", "data-v-2d338449"]]), Np = {
	error: 0,
	warning: 1,
	info: 2,
	hint: 3
}, Pp = (e) => e.split("/").at(-1) || e, Fp = new class {
	diagnosticsBySource = /* @__PURE__ */ new Map();
	listeners = /* @__PURE__ */ new Set();
	setDiagnostics(e, t) {
		this.diagnosticsBySource.set(e, t.map((t) => ({
			...t,
			source: e
		}))), this.notify();
	}
	clearSource(e) {
		this.diagnosticsBySource.delete(e), this.notify();
	}
	clearAll() {
		this.diagnosticsBySource.clear(), this.notify();
	}
	getDiagnostics() {
		return Array.from(this.diagnosticsBySource.values()).flat().sort((e, t) => e.path.localeCompare(t.path) || Np[e.severity] - Np[t.severity] || e.lineNumber - t.lineNumber || e.column - t.column);
	}
	getGroups() {
		let e = /* @__PURE__ */ new Map();
		for (let t of this.getDiagnostics()) e.set(t.path, [...e.get(t.path) ?? [], t]);
		return Array.from(e.entries()).map(([e, t]) => ({
			path: e,
			name: Pp(e),
			count: t.length,
			diagnostics: t
		}));
	}
	getCounts() {
		return this.getDiagnostics().reduce((e, t) => ({
			...e,
			[t.severity]: e[t.severity] + 1
		}), {
			error: 0,
			warning: 0,
			info: 0,
			hint: 0
		});
	}
	onDidChange(e) {
		return this.listeners.add(e), () => {
			this.listeners.delete(e);
		};
	}
	notify() {
		for (let e of this.listeners) e();
	}
}(), Ip = {
	class: "problems-view",
	"data-testid": "problems-view"
}, Lp = {
	key: 0,
	class: "problems-view__empty"
}, Rp = {
	key: 0,
	class: "problems-view__group"
}, zp = ["onClick"], Bp = { class: "problems-view__message" }, Vp = { class: "problems-view__location" }, Hp = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "ProblemsView",
	props: {
		executeCommand: { type: Function },
		filterText: {}
	},
	setup(r) {
		let i = r, a = n(0), s, c = j(() => i.filterText?.trim().toLowerCase() ?? ""), l = j(() => (a.value, Fp.getGroups())), u = j(() => c.value ? l.value.map((e) => {
			let t = e.name.toLowerCase().includes(c.value) || e.path.toLowerCase().includes(c.value), n = e.diagnostics.filter((e) => t ? !0 : [
				e.path,
				e.message,
				e.source,
				e.severity,
				e.code ?? "",
				String(e.lineNumber),
				String(e.column)
			].some((e) => e.toLowerCase().includes(c.value)));
			return {
				...e,
				count: n.length,
				diagnostics: n
			};
		}).filter((e) => e.diagnostics.length > 0) : l.value), d = j(() => u.value.flatMap((e) => [{
			type: "group",
			group: e
		}, ...e.diagnostics.map((t) => ({
			type: "diagnostic",
			group: e,
			diagnostic: t
		}))])), { list: p, containerProps: m, wrapperProps: _ } = dt(d, {
			itemHeight: 30,
			overscan: 10
		}), v = (e, t) => i.executeCommand?.(e, t) ?? Ep.execute(e, t), y = async (e) => {
			await v("problems.open", {
				path: e.path,
				lineNumber: e.lineNumber,
				column: e.column
			});
		}, b = (e) => e === "error" ? "error" : e === "warning" ? "warning" : e === "info" ? "info" : "lightbulb";
		return o(() => {
			s = Fp.onDidChange(() => {
				a.value += 1;
			});
		}), g(() => {
			s?.();
		}), (n, r) => (f(), I("section", Ip, [d.value.length === 0 ? (f(), I("div", Lp, " 暂未检测到问题。 ")) : (f(), I("div", h({
			key: 1,
			class: "problems-view__list"
		}, e(m)), [G("div", V(de(e(_))), [(f(!0), I(z, null, S(e(p), ({ data: e }) => (f(), I(z, { key: e.type === "group" ? e.group.path : `${e.diagnostic.source}:${e.diagnostic.path}:${e.diagnostic.lineNumber}:${e.diagnostic.column}:${e.diagnostic.message}` }, [e.type === "group" ? (f(), I("div", Rp, [
			D(X, {
				name: "file",
				decorative: ""
			}),
			G("span", null, K(e.group.name), 1),
			G("small", null, K(e.group.count), 1)
		])) : (f(), I("button", {
			key: 1,
			class: "problems-view__problem",
			type: "button",
			"data-testid": "problem-row",
			onClick: (t) => y(e.diagnostic)
		}, [
			D(X, {
				class: t(["problems-view__severity", `problems-view__severity--${e.diagnostic.severity}`]),
				name: b(e.diagnostic.severity),
				decorative: ""
			}, null, 8, ["class", "name"]),
			G("span", Bp, K(e.diagnostic.message), 1),
			G("span", Vp, K(e.diagnostic.lineNumber) + ":" + K(e.diagnostic.column), 1),
			G("small", null, K(e.diagnostic.source), 1)
		], 8, zp))], 64))), 128))], 16)], 16))]));
	}
}), [["__scopeId", "data-v-c8f8d692"]]), Up = [
	{
		name: "README.md",
		originalContent: "# Original README\n\nThis file represents the saved Git version.\n",
		path: "/README.md",
		status: "changed"
	},
	{
		name: "main.ts",
		originalContent: "import { createApp } from \"vue\";\nimport App from \"./app/App.vue\";\n\ncreateApp(App).mount(\"#root\");\n",
		path: "/src/main.ts",
		status: "staged"
	},
	{
		name: "package.json",
		originalContent: "",
		path: "/package.json",
		status: "untracked"
	}
], Wp = {
	changed: "Changes",
	staged: "Staged Changes",
	untracked: "Untracked"
}, Gp = class {
	constructor(e = {}) {
		this.options = e;
	}
	getState() {
		let e = this.options.available ?? !0;
		return {
			available: e,
			changes: e ? this.options.changes ?? Up : [],
			...e ? {} : { message: "Git service is not available." },
			repositoryName: this.options.repositoryName ?? "monaco-workspace"
		};
	}
}, Kp = class {
	contents = /* @__PURE__ */ new Map();
	createOriginalPath(e) {
		return `/__source-control/original${e}`;
	}
	setOriginalContent(e, t) {
		let n = this.createOriginalPath(e);
		return this.contents.set(n, t), n;
	}
	readContent(e) {
		return this.contents.get(e);
	}
	clear() {
		this.contents.clear();
	}
}, qp = class extends Error {
	constructor(e) {
		super(`Source Control command "${e}" is not connected to a Git provider yet.`), this.name = "SourceControlCommandUnavailableError";
	}
}, Jp = class {
	constructor(e = new Gp(), t = Yp) {
		this.provider = e, this.diffContentService = t;
	}
	getState() {
		return this.provider.getState();
	}
	getSections() {
		let e = this.getState();
		return e.available ? [
			"changed",
			"staged",
			"untracked"
		].map((t) => {
			let n = e.changes.filter((e) => e.status === t);
			return {
				changes: n,
				count: n.length,
				id: t,
				title: Wp[t]
			};
		}).filter((e) => e.count > 0) : [];
	}
	openChangeDiff(e, t) {
		let n = this.getState().changes.find((t) => t.path === e);
		if (!n) return {
			ok: !1,
			error: {
				code: "SOURCE_CONTROL_CHANGE_NOT_FOUND",
				message: `Source Control change "${e}" does not exist.`
			}
		};
		let r = this.diffContentService.setOriginalContent(e, n.originalContent);
		return tn.openDiff(r, n.path, t), {
			ok: !0,
			originalPath: r,
			modifiedPath: n.path
		};
	}
	createUnavailableCommandError(e) {
		return new qp(e);
	}
}, Yp = new Kp(), Xp = new Jp(), Zp = 1200, Qp = (e) => e.length > Zp ? `${e.slice(0, Zp - 12)}\n[truncated]` : e, $p = new class {
	listeners = /* @__PURE__ */ new Set();
	state = {
		prompt: "",
		response: "",
		status: "idle",
		sources: [],
		toolCalls: [],
		auditLog: []
	};
	toolSequence = 0;
	collectContext(e) {
		let t = zt(e), n = [];
		if (t.activeFilePath) {
			let e = Ia.readFile(t.activeFilePath);
			e.ok && n.push({
				id: "current-file",
				kind: "current-file",
				label: `当前文件: ${e.path}`,
				content: Qp(e.content)
			});
		}
		let r = Fp.getDiagnostics();
		r.length > 0 && n.push({
			id: "problems",
			kind: "problems",
			label: "问题",
			content: Qp(r.map((e) => `${e.severity} ${e.path}:${e.lineNumber}:${e.column} ${e.message}`).join("\n"))
		});
		let i = Xp.getState();
		i.available && i.changes.length > 0 && n.push({
			id: "source-control",
			kind: "source-control",
			label: "源代码管理",
			content: Qp(i.changes.map((e) => `${e.status} ${e.path}`).join("\n"))
		});
		let a = qt.getLines(qt.getActiveChannel());
		return a.length > 0 && n.push({
			id: "output",
			kind: "output",
			label: `输出: ${qt.getActiveChannel()}`,
			content: Qp(a.slice(-20).join("\n"))
		}), n;
	}
	runPrompt(e, t) {
		let n = this.collectContext(t);
		return this.state = {
			...this.state,
			prompt: e,
			status: "streaming",
			sources: n,
			response: [
				"模拟 AI 响应",
				`使用 ${n.length} 个上下文来源。`,
				`提示: ${e}`
			].join("\n")
		}, this.notify(), {
			ok: !0,
			status: "streaming"
		};
	}
	async runToolCall(e, t) {
		this.toolSequence += 1;
		let n = `ai-tool-${this.toolSequence}`, r = {
			...e,
			status: "running"
		};
		this.state = {
			...this.state,
			toolCalls: [...this.state.toolCalls, {
				...r,
				id: n
			}],
			auditLog: [...this.state.auditLog, {
				toolCallId: n,
				action: "started",
				commandId: e.commandId,
				message: `已开始 ${e.label}。`
			}]
		}, this.notify();
		let i = await t(e.commandId), a = i.ok ? "success" : "failed";
		return this.state = {
			...this.state,
			toolCalls: this.state.toolCalls.map((e) => e.id === n ? {
				...e,
				status: a
			} : e),
			auditLog: [...this.state.auditLog, {
				toolCallId: n,
				action: a,
				commandId: e.commandId,
				message: i.ok ? `已完成 ${e.label}。` : i.error?.message ?? `${e.label} 失败。`
			}]
		}, this.notify(), {
			ok: !0,
			toolCallId: n,
			commandId: e.commandId,
			status: a
		};
	}
	cancel() {
		return this.state.status === "idle" ? {
			ok: !1,
			status: "idle"
		} : (this.state = {
			...this.state,
			status: "canceled",
			response: `${this.state.response}\n[已取消]`
		}, this.notify(), {
			ok: !0,
			status: "canceled"
		});
	}
	getState() {
		return {
			...this.state,
			sources: this.state.sources.map((e) => ({ ...e })),
			toolCalls: this.state.toolCalls.map((e) => ({ ...e })),
			auditLog: this.state.auditLog.map((e) => ({ ...e }))
		};
	}
	reset() {
		this.state = {
			prompt: "",
			response: "",
			status: "idle",
			sources: [],
			toolCalls: [],
			auditLog: []
		}, this.toolSequence = 0, this.notify();
	}
	onDidChange(e) {
		return this.listeners.add(e), () => {
			this.listeners.delete(e);
		};
	}
	notify() {
		for (let e of this.listeners) e();
	}
}(), em = { class: "ai-panel__topbar" }, tm = {
	class: "ai-panel__top-actions",
	"aria-label": "AI 面板操作"
}, nm = {
	class: "ai-panel__icon-button",
	type: "button",
	"aria-label": "刷新上下文",
	title: "刷新上下文"
}, rm = {
	class: "ai-panel__icon-button",
	type: "button",
	"aria-label": "AI 设置",
	title: "AI 设置"
}, im = { class: "ai-panel__body" }, am = {
	class: "ai-panel__task-list",
	"data-testid": "ai-task-list"
}, om = { class: "ai-panel__section-title" }, sm = { class: "ai-panel__status" }, cm = ["onClick"], lm = { class: "ai-panel__workspace" }, um = {
	key: 0,
	class: "ai-panel__empty-state",
	"aria-label": "暂无 AI 运行内容"
}, dm = {
	key: 1,
	class: "ai-panel__run-feed"
}, fm = {
	key: 0,
	class: "ai-panel__feed-section"
}, pm = { class: "ai-panel__response" }, mm = { class: "ai-panel__feed-section" }, hm = {
	key: 0,
	class: "ai-panel__empty-line"
}, gm = { class: "ai-panel__feed-section" }, _m = {
	key: 0,
	class: "ai-panel__empty-line"
}, vm = ["data-testid"], ym = {
	class: "ai-panel__feed-section",
	"data-testid": "ai-audit-log"
}, bm = {
	key: 0,
	class: "ai-panel__empty-line"
}, xm = { class: "ai-panel__footer" }, Sm = {
	class: "ai-panel__composer",
	"data-testid": "ai-composer"
}, Cm = { class: "ai-panel__composer-actions" }, wm = ["aria-expanded"], Tm = {
	key: 0,
	class: "ai-panel__add-popover",
	"data-testid": "ai-add-menu",
	role: "menu",
	"aria-label": "添加上下文"
}, Em = {
	class: "ai-panel__add-option ai-panel__add-option--primary",
	type: "button",
	role: "menuitem"
}, Dm = {
	class: "ai-panel__add-option-icon",
	"aria-hidden": "true"
}, Om = { focusable: "false" }, km = ["href"], Am = {
	class: "ai-panel__add-option",
	type: "button",
	role: "switch",
	"aria-checked": "false"
}, jm = {
	class: "ai-panel__add-option-icon",
	"aria-hidden": "true"
}, Mm = { focusable: "false" }, Nm = ["href"], Pm = {
	class: "ai-panel__add-option",
	type: "button",
	role: "switch",
	"aria-checked": "false"
}, Fm = {
	class: "ai-panel__add-option-icon",
	"aria-hidden": "true"
}, Im = { focusable: "false" }, Lm = ["href"], Rm = {
	class: "ai-panel__add-option",
	type: "button",
	role: "switch",
	"aria-checked": "false"
}, zm = {
	class: "ai-panel__add-option-icon",
	"aria-hidden": "true"
}, Bm = { focusable: "false" }, Vm = ["href"], Hm = {
	class: "ai-panel__add-option",
	type: "button",
	role: "menuitem",
	"data-testid": "ai-add-plugins"
}, Um = {
	class: "ai-panel__add-option-icon",
	"aria-hidden": "true"
}, Wm = { focusable: "false" }, Gm = ["href"], Km = {
	class: "ai-panel__add-option-chevron",
	"aria-hidden": "true"
}, qm = { focusable: "false" }, Jm = ["href"], Ym = ["aria-label", "aria-expanded"], Xm = {
	class: "ai-panel__approval-mode-icon",
	"aria-hidden": "true"
}, Zm = { focusable: "false" }, Qm = ["href"], $m = {
	key: 0,
	"data-testid": "ai-approval-button-label"
}, eh = [
	"aria-selected",
	"data-testid",
	"onClick"
], th = {
	class: "ai-panel__approval-option-icon",
	"aria-hidden": "true"
}, nh = { focusable: "false" }, rh = ["href"], ih = {
	class: "ai-panel__menu-button ai-panel__menu-button--model",
	type: "button"
}, ah = ["disabled"], oh = {
	class: "ai-panel__send-icon",
	"aria-hidden": "true",
	focusable: "false"
}, sh = ["href"], ch = {
	key: 0,
	class: "ai-panel__policy-note"
}, lh = 8, uh = 280, dh = 300, fh = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "AIPanel",
	props: { executeCommand: { type: Function } },
	setup(e) {
		let r = e, i = n(""), a = n(0), s = n(!1), c = n(!1), l = n(!1), u = n("ask"), d = n(null), m = n(null), h = n(null), _ = n({}), v = Gt.stateRef, y, b, x = {
			addPhotoFile: "#codex-icon-add-photo-file",
			arrowUp: "#codex-icon-arrow-up",
			chevronRight: "#codex-icon-chevron-right",
			completely: "#codex-icon-completely",
			goal: "#codex-icon-goal",
			ideContext: "#codex-icon-ide-context",
			planMode: "#codex-icon-plan-mode",
			plugins: "#codex-icon-plugins",
			request: "#codex-icon-request",
			substitute: "#codex-icon-substitute"
		}, C = [
			{
				id: "ask",
				iconHref: x.request,
				label: "请求审批",
				description: "编辑外部文件和使用互联网时始终询问"
			},
			{
				id: "auto",
				iconHref: x.substitute,
				label: "替我审批",
				description: "仅对检测到的风险操作请求批准",
				color: "#61afef"
			},
			{
				id: "full",
				iconHref: x.completely,
				label: "完全访问",
				description: "可不受限制地访问互联网和您电脑上的任何文件",
				color: "#d19a66"
			}
		], w = (e) => {
			if (e.color) return {
				"--ai-panel-approval-mode-color": e.color,
				color: e.color
			};
		}, T = [
			{
				id: "monaco",
				label: "monaco 编辑器",
				time: "1w"
			},
			{
				id: "compatibility",
				label: "检查浏览器兼容性",
				time: "1d"
			},
			{
				id: "prompt-page",
				label: "优化兼容提示页面",
				time: "6h"
			}
		], E = j(() => (a.value, $p.getState())), O = (e, t) => t === void 0 ? r.executeCommand?.(e) ?? Ep.execute(e) : r.executeCommand?.(e, t) ?? Ep.execute(e, t), k = () => {
			let e = M.value;
			return !e || A.value ? Promise.resolve() : O("ai.runPrompt", { prompt: e });
		}, A = j(() => !v.value.policy.aiEnabled), M = j(() => i.value.trim()), P = j(() => C.find((e) => e.id === u.value) ?? C[0]), F = j(() => E.value.status === "streaming"), R = j(() => E.value.status === "streaming" ? "生成中" : E.value.status === "canceled" ? "已取消" : "空闲"), V = j(() => E.value.status === "streaming" ? "loading" : E.value.status === "canceled" ? "debug-stop" : "circle-outline"), te = j(() => !!E.value.response || E.value.sources.length > 0 || E.value.toolCalls.length > 0 || E.value.auditLog.length > 0), ne = j(() => [...E.value.prompt ? [{
			id: "active",
			label: E.value.prompt,
			time: R.value
		}] : [], ...T]), re = (e) => e === "running" ? "运行中" : e === "success" ? "成功" : e === "failed" ? "失败" : e, U = (e) => e === "started" ? "已开始" : e === "success" ? "成功" : e === "failed" ? "失败" : e, ie = (e) => e === "current-file" ? "当前文件" : e === "output" ? "输出" : e === "problems" ? "问题" : e === "source-control" ? "源代码管理" : e, W = (e) => {
			i.value = e;
		}, ae = () => {
			i.value = "";
		}, q = () => O("workbench.action.toggleRightPanel"), oe = () => {
			let e = d.value?.getBoundingClientRect().width ?? dh;
			l.value = e > 0 && e < dh;
		}, se = () => {
			let e = d.value, t = h.value;
			if (!e || !t) {
				_.value = {};
				return;
			}
			let n = e.getBoundingClientRect(), r = t.getBoundingClientRect(), i = Math.max(0, n.width), a = Math.max(0, i - lh * 2);
			if (a === 0) {
				_.value = {};
				return;
			}
			let o = Math.min(uh, a), s = r.left - n.left, c = s - lh, l = Math.max(lh, i - lh - o), u = Math.min(Math.max(lh, c), l) - s;
			_.value = {
				width: `${Math.round(o)}px`,
				left: `${Math.round(u)}px`
			};
		}, ce = async () => {
			c.value = !c.value, c.value && (s.value = !1, await ee(), se());
		}, le = () => {
			s.value = !s.value, s.value && (c.value = !1);
		}, Y = (e) => {
			u.value = e, c.value = !1;
		}, ue = (e) => {
			let t = e.target;
			t instanceof Node && (s.value && !m.value?.contains(t) && (s.value = !1), c.value && !h.value?.contains(t) && (c.value = !1));
		}, de = () => {
			oe(), c.value && se();
		};
		return o(() => {
			y = $p.onDidChange(() => {
				a.value += 1;
			}), ee(() => oe()), document.addEventListener("pointerdown", ue), window.addEventListener("resize", de), typeof ResizeObserver < "u" && d.value && (b = new ResizeObserver(() => de()), b.observe(d.value));
		}), g(() => {
			y?.(), document.removeEventListener("pointerdown", ue), window.removeEventListener("resize", de), b?.disconnect();
		}), (e, n) => (f(), I("section", {
			ref_key: "aiPanelRef",
			ref: d,
			class: "ai-panel",
			"data-testid": "ai-panel"
		}, [
			G("header", em, [n[2] ||= G("nav", {
				class: "ai-panel__tabs",
				"data-testid": "ai-mode-tabs",
				"aria-label": "AI 模式"
			}, [G("button", {
				class: "ai-panel__tab",
				type: "button"
			}, "聊天"), G("button", {
				class: "ai-panel__tab ai-panel__tab--active",
				type: "button",
				"aria-current": "page"
			}, "CODEX")], -1), G("div", tm, [
				G("button", {
					class: "ai-panel__icon-button",
					type: "button",
					"aria-label": "新建任务",
					title: "新建任务",
					onClick: ae
				}, [D(X, {
					name: "edit",
					decorative: ""
				})]),
				G("button", nm, [D(X, {
					name: "refresh",
					decorative: ""
				})]),
				G("button", rm, [D(X, {
					name: "gear",
					decorative: ""
				})]),
				G("button", {
					class: "ai-panel__icon-button",
					type: "button",
					"aria-label": "关闭 AI 面板",
					title: "关闭 AI 面板",
					onClick: q
				}, [D(X, {
					name: "close",
					decorative: ""
				})])
			])]),
			G("div", im, [G("section", am, [
				G("header", om, [n[3] ||= G("span", null, "任务", -1), G("span", sm, [D(X, {
					name: V.value,
					decorative: ""
				}, null, 8, ["name"]), L(" " + K(R.value), 1)])]),
				(f(!0), I(z, null, S(ne.value, (e) => (f(), I("button", {
					key: e.id,
					class: t(["ai-panel__task-row", { "ai-panel__task-row--active": e.id === "active" }]),
					type: "button",
					"data-testid": "ai-task-suggestion",
					onClick: (t) => W(e.label)
				}, [G("span", null, K(e.label), 1), G("small", null, K(e.time), 1)], 10, cm))), 128)),
				n[4] ||= G("button", {
					class: "ai-panel__view-all",
					type: "button"
				}, "查看全部 (50)", -1)
			]), G("section", lm, [te.value ? (f(), I("div", dm, [
				E.value.response ? (f(), I("section", fm, [n[6] ||= G("header", null, "响应", -1), G("pre", pm, K(E.value.response), 1)])) : N("", !0),
				G("section", mm, [
					n[7] ||= G("header", null, "上下文", -1),
					E.value.sources.length === 0 ? (f(), I("div", hm, "尚未收集上下文。")) : N("", !0),
					(f(!0), I(z, null, S(E.value.sources, (e) => (f(), I("div", {
						key: e.id,
						class: "ai-panel__data-row",
						"data-testid": "ai-context-source"
					}, [G("strong", null, K(e.label), 1), G("small", null, K(ie(e.kind)), 1)]))), 128))
				]),
				G("section", gm, [
					n[8] ||= G("header", null, "工具", -1),
					E.value.toolCalls.length === 0 ? (f(), I("div", _m, "暂无工具调用。")) : N("", !0),
					(f(!0), I(z, null, S(E.value.toolCalls, (e) => (f(), I("div", {
						key: e.id,
						class: "ai-panel__data-row",
						"data-testid": `ai-tool-call-${e.id === "ai-tool-1" ? e.id.replace("ai-tool-1", "open-search") : e.id}`
					}, [G("strong", null, K(e.label), 1), G("small", null, K(e.commandId) + " · " + K(re(e.status)), 1)], 8, vm))), 128))
				]),
				G("section", ym, [
					n[9] ||= G("header", null, "审计", -1),
					E.value.auditLog.length === 0 ? (f(), I("div", bm, "暂无审计记录。")) : N("", !0),
					(f(!0), I(z, null, S(E.value.auditLog, (e) => (f(), I("div", {
						key: `${e.toolCallId}-${e.action}`,
						class: "ai-panel__data-row"
					}, [G("strong", null, K(U(e.action)), 1), G("small", null, K(e.commandId), 1)]))), 128))
				])
			])) : (f(), I("div", um, [...n[5] ||= [G("svg", {
				class: "ai-panel__empty-logo",
				"data-testid": "ai-empty-logo",
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 500 500",
				fill: "currentColor",
				"aria-hidden": "true"
			}, [
				G("path", { d: "M330.34,313.62h-67.84c-7.65,0-13.85-6.2-13.85-13.85s6.2-13.85,13.85-13.85h67.84c7.65,0,13.85,6.2,13.85,13.85s-6.2,13.85-13.85,13.85Z" }),
				G("path", { d: "M169.65,313.38c-2.36,0-4.74-.6-6.93-1.87-6.62-3.83-8.88-12.31-5.05-18.93l23.78-41.08-23.91-43.21c-3.7-6.69-1.28-15.12,5.41-18.82,6.69-3.71,15.12-1.28,18.82,5.41l31.51,56.94-31.64,54.65c-2.57,4.43-7.22,6.91-12,6.91Z" }),
				G("path", { d: "M144.61,144.5c1.42-41.82,35.79-75.27,77.95-75.25,27.89.02,52.35,14.68,66.11,36.71,10.93-5.82,23.41-9.12,36.65-9.11,43.05.02,77.94,34.94,77.91,78,0,13.24-3.32,25.72-9.16,36.64,22.02,13.79,36.66,38.26,36.64,66.15-.02,42.16-33.52,76.48-75.34,77.86-1.42,41.82-35.78,75.28-77.94,75.25-27.89-.02-52.35-14.68-66.11-36.72-10.93,5.82-23.4,9.13-36.65,9.12-43.05-.02-77.94-34.94-77.91-78,0-13.24,3.32-25.72,9.16-36.64-22.02-13.79-36.65-38.26-36.64-66.15.02-42.16,33.51-76.48,75.33-77.86ZM297.77,71.99c-19.24-19.26-45.83-31.17-75.2-31.19-49.23-.03-90.67,33.39-102.84,78.79-45.41,12.12-78.87,53.52-78.9,102.76-.02,29.37,11.87,55.97,31.1,75.23-2.35,8.79-3.62,18.03-3.63,27.56-.03,58.77,47.58,106.44,106.35,106.47,9.53,0,18.77-1.25,27.55-3.6,19.24,19.26,45.84,31.18,75.21,31.2,49.24.03,90.67-33.39,102.84-78.8,45.42-12.11,78.88-53.51,78.91-102.75.02-29.37-11.87-55.98-31.11-75.24,2.35-8.78,3.62-18.02,3.63-27.55.03-58.77-47.58-106.44-106.35-106.47-9.53,0-18.77,1.25-27.56,3.59Z" })
			], -1)]]))])]),
			G("footer", xm, [G("div", Sm, [H(G("textarea", {
				"onUpdate:modelValue": n[0] ||= (e) => i.value = e,
				"data-testid": "ai-prompt",
				rows: "2",
				placeholder: "输入任务指令"
			}, null, 512), [[B, i.value]]), G("div", Cm, [
				G("div", {
					ref_key: "addMenuRef",
					ref: m,
					class: t(["ai-panel__add-menu-wrap", { "ai-panel__add-menu-wrap--open": s.value }]),
					"aria-label": "添加上下文菜单"
				}, [G("button", {
					class: "ai-panel__add-button",
					type: "button",
					"data-testid": "ai-add-button",
					"aria-label": "添加上下文",
					title: "添加上下文",
					"aria-haspopup": "menu",
					"aria-expanded": s.value,
					onClick: le
				}, [D(X, {
					name: "add",
					decorative: "",
					size: "14px"
				})], 8, wm), s.value ? (f(), I("div", Tm, [
					G("button", Em, [G("span", Dm, [(f(), I("svg", Om, [G("use", { href: x.addPhotoFile }, null, 8, km)]))]), n[10] ||= G("span", { class: "ai-panel__add-option-label" }, "添加照片和文件", -1)]),
					G("button", Am, [
						G("span", jm, [(f(), I("svg", Mm, [G("use", { href: x.ideContext }, null, 8, Nm)]))]),
						n[11] ||= G("span", { class: "ai-panel__add-option-label" }, "包含 IDE 背景信息", -1),
						n[12] ||= G("span", {
							class: "ai-panel__add-switch",
							"aria-hidden": "true"
						}, [G("span")], -1)
					]),
					G("button", Pm, [
						G("span", Fm, [(f(), I("svg", Im, [G("use", { href: x.planMode }, null, 8, Lm)]))]),
						n[13] ||= G("span", { class: "ai-panel__add-option-label" }, "计划模式", -1),
						n[14] ||= G("span", {
							class: "ai-panel__add-switch",
							"aria-hidden": "true"
						}, [G("span")], -1)
					]),
					G("button", Rm, [
						G("span", zm, [(f(), I("svg", Bm, [G("use", { href: x.goal }, null, 8, Vm)]))]),
						n[15] ||= G("span", { class: "ai-panel__add-option-label" }, "追求目标", -1),
						n[16] ||= G("span", {
							class: "ai-panel__add-switch",
							"aria-hidden": "true"
						}, [G("span")], -1)
					]),
					G("button", Hm, [
						G("span", Um, [(f(), I("svg", Wm, [G("use", { href: x.plugins }, null, 8, Gm)]))]),
						n[17] ||= G("span", { class: "ai-panel__add-option-label" }, "插件", -1),
						G("span", Km, [(f(), I("svg", qm, [G("use", { href: x.chevronRight }, null, 8, Jm)]))])
					])
				])) : N("", !0)], 2),
				G("div", {
					ref_key: "approvalMenuRef",
					ref: h,
					class: "ai-panel__approval-menu-wrap"
				}, [G("button", {
					class: t(["ai-panel__menu-button ai-panel__menu-button--approval", {
						"ai-panel__menu-button--open": c.value,
						"ai-panel__menu-button--compact": l.value
					}]),
					style: p(w(P.value)),
					type: "button",
					"data-testid": "ai-approval-button",
					"aria-label": P.value.label,
					"aria-haspopup": "listbox",
					"aria-expanded": c.value,
					onClick: ce
				}, [
					G("span", Xm, [(f(), I("svg", Zm, [G("use", { href: P.value.iconHref }, null, 8, Qm)]))]),
					l.value ? N("", !0) : (f(), I("span", $m, K(P.value.label), 1)),
					D(X, {
						name: "chevron-down",
						decorative: ""
					})
				], 14, Ym), c.value ? (f(), I("div", {
					key: 0,
					class: "ai-panel__approval-popover",
					style: p(_.value),
					"data-testid": "ai-approval-menu",
					role: "listbox",
					"aria-label": "审批模式"
				}, [n[18] ||= G("header", { class: "ai-panel__approval-heading" }, [G("span", null, "应如何批准 Codex 操作?")], -1), (f(), I(z, null, S(C, (e) => G("button", {
					key: e.id,
					class: t(["ai-panel__approval-option", { "ai-panel__approval-option--active": e.id === u.value }]),
					type: "button",
					role: "option",
					"aria-selected": e.id === u.value,
					"data-testid": `ai-approval-${e.id}`,
					onClick: (t) => Y(e.id)
				}, [
					G("span", th, [(f(), I("svg", nh, [G("use", { href: e.iconHref }, null, 8, rh)]))]),
					G("span", null, [G("strong", null, K(e.label), 1), G("small", null, K(e.description), 1)]),
					e.id === u.value ? (f(), J(X, {
						key: 0,
						class: "ai-panel__approval-check",
						name: "check",
						decorative: ""
					})) : N("", !0)
				], 10, eh)), 64))], 4)) : N("", !0)], 512),
				G("button", ih, [n[19] ||= G("span", null, "5.5", -1), D(X, {
					name: "chevron-down",
					decorative: ""
				})]),
				F.value ? (f(), I("button", {
					key: 0,
					class: "ai-panel__plain-icon ai-panel__plain-icon--danger",
					type: "button",
					"data-testid": "ai-cancel",
					"aria-label": "暂停 AI 响应",
					title: "暂停 AI 响应",
					onClick: n[1] ||= (e) => O("ai.cancel")
				}, [D(X, {
					name: "debug-pause",
					decorative: ""
				})])) : (f(), I("button", {
					key: 1,
					class: "ai-panel__send",
					type: "button",
					"data-testid": "ai-run",
					disabled: A.value || !M.value,
					"aria-label": "发送任务",
					title: "发送任务",
					onClick: k
				}, [(f(), I("svg", oh, [G("use", { href: x.arrowUp }, null, 8, sh)]))], 8, ah))
			])]), A.value ? (f(), I("p", ch, "企业策略已禁用 AI。")) : N("", !0)])
		], 512));
	}
}), [["__scopeId", "data-v-c4a0ac86"]]), ph = 1e3, mh = 120, hh = (e) => e.toString().padStart(3, "0"), gh = ({ filesPerFolder: e = 40, folderCount: t = 60 } = {}) => Array.from({ length: t }, (t, n) => {
	let r = hh(n), i = `/packages/package-${r}`;
	return {
		children: Array.from({ length: e }, (e, t) => {
			let n = hh(t);
			return {
				language: "typescript",
				name: `file-${n}.ts`,
				path: `${i}/file-${n}.ts`,
				size: 512 + t,
				type: "file"
			};
		}),
		name: `package-${r}`,
		path: i,
		type: "folder"
	};
}), _h = (e) => ({
	actualText: e.actualText,
	id: e.id,
	label: e.label,
	limitText: e.limitText,
	note: e.note,
	status: e.passed ? "pass" : "fail"
}), vh = (e) => {
	let t = [
		_h({
			id: "largeWorkspaceLoaded",
			label: "Large workspace loaded",
			actualText: String(e.totalVisibleFileTreeNodes),
			limitText: `>= ${ph} visible nodes`,
			note: "确保验收不是小样本冒烟",
			passed: e.totalVisibleFileTreeNodes >= ph
		}),
		_h({
			id: "fileTreeVirtualized",
			label: "File tree virtualization",
			actualText: `${e.renderedFileTreeItems} / ${e.totalVisibleFileTreeNodes}`,
			limitText: `<= ${mh} rendered items`,
			note: "左侧文件树必须保持虚拟渲染",
			passed: e.totalVisibleFileTreeNodes >= ph && e.renderedFileTreeItems <= mh && e.renderedFileTreeItems < e.totalVisibleFileTreeNodes
		}),
		_h({
			id: "commandFailures",
			label: "Command failures",
			actualText: String(e.commandFailureCount),
			limitText: "0 failures",
			note: "稳定性验收期间命令不能失败",
			passed: e.commandFailureCount === 0
		}),
		_h({
			id: "policyDenied",
			label: "Policy denied commands",
			actualText: String(e.policyDeniedCount),
			limitText: "0 denied commands",
			note: "稳定性验收默认不应触发策略拒绝",
			passed: e.policyDeniedCount === 0
		})
	], n = t.filter((e) => e.status === "fail");
	return {
		checks: t,
		failedChecks: n,
		status: n.length > 0 ? "fail" : "pass",
		summary: n.length > 0 ? `${n.length} stability checks failed.` : "All P4 stability checks passed."
	};
}, yh = (e) => `${[
	"# P4 Stability Report",
	"",
	`Overall: ${e.status.toUpperCase()}`,
	`Summary: ${e.summary}`,
	"",
	"| Check | Actual | Budget | Status | Note |",
	"| --- | ---: | ---: | --- | --- |",
	...e.checks.map((e) => `| ${e.label} | ${e.actualText} | ${e.limitText} | ${e.status.toUpperCase()} | ${e.note} |`)
].join("\n")}\n`, bh = new class {
	tasks = /* @__PURE__ */ new Map();
	listeners = /* @__PURE__ */ new Set();
	constructor(e = qt, t = Fp) {
		this.output = e, this.diagnostics = t, this.reset();
	}
	getTasks() {
		return Array.from(this.tasks.values()).map((e) => ({ ...e }));
	}
	getTask(e) {
		let t = this.tasks.get(e);
		return t ? { ...t } : void 0;
	}
	async runTask(e) {
		return this.tasks.get(e) ? (this.setStatus(e, "running"), this.output.appendLine("Tasks", "> mock build"), this.output.appendLine("Tasks", "src/main.ts:4:8 - error TS1005: ';' expected."), this.output.appendLine("Tasks", "构建失败。"), this.diagnostics.setDiagnostics("task:mock.build", [{
			path: "/src/main.ts",
			message: "TS1005: ';' expected.",
			severity: "error",
			lineNumber: 4,
			column: 8,
			source: "mock.build"
		}]), this.setStatus(e, "failed"), {
			ok: !1,
			taskId: e,
			error: {
				code: "TASK_FAILED",
				message: "模拟构建失败。"
			}
		}) : {
			ok: !1,
			taskId: e,
			error: {
				code: "TASK_NOT_FOUND",
				message: `任务 "${e}" 尚未注册。`
			}
		};
	}
	cancelTask(e) {
		return this.tasks.get(e) ? (this.setStatus(e, "canceled"), this.output.appendLine("Tasks", "任务已取消。"), {
			ok: !0,
			taskId: e
		}) : {
			ok: !1,
			taskId: e,
			error: {
				code: "TASK_NOT_FOUND",
				message: `任务 "${e}" 尚未注册。`
			}
		};
	}
	reset() {
		this.tasks.clear(), this.tasks.set("mock.build", {
			id: "mock.build",
			label: "模拟构建",
			status: "idle"
		}), this.notify();
	}
	onDidChange(e) {
		return this.listeners.add(e), () => {
			this.listeners.delete(e);
		};
	}
	setStatus(e, t) {
		let n = this.tasks.get(e);
		n && (this.tasks.set(e, {
			...n,
			status: t
		}), this.notify());
	}
	notify() {
		for (let e of this.listeners) e();
	}
}(), xh = (e) => e.split("/").at(-1) || e, Sh = (e) => typeof e == "object" && !!e, Ch = (e) => Sh(e) ? {
	path: typeof e.path == "string" ? e.path : void 0,
	title: typeof e.title == "string" ? e.title : void 0,
	language: typeof e.language == "string" ? e.language : void 0
} : {}, wh = (e) => Sh(e) ? { path: typeof e.path == "string" ? e.path : void 0 } : {}, Th = (e) => Sh(e) ? {
	anchorPath: typeof e.anchorPath == "string" ? e.anchorPath : void 0,
	commit: e.commit === !0,
	parentPath: typeof e.parentPath == "string" ? e.parentPath : void 0,
	path: typeof e.path == "string" ? e.path : void 0,
	name: typeof e.name == "string" ? e.name : void 0,
	type: e.type === "folder" ? "folder" : e.type === "file" ? "file" : void 0
} : {}, Eh = (e) => Sh(e) ? { tabId: typeof e.tabId == "string" ? e.tabId : void 0 } : {}, Dh = (e) => Sh(e) ? {
	originalPath: typeof e.originalPath == "string" ? e.originalPath : void 0,
	modifiedPath: typeof e.modifiedPath == "string" ? e.modifiedPath : void 0
} : {}, Oh = (e) => Sh(e) ? {
	path: typeof e.path == "string" ? e.path : void 0,
	lineNumber: typeof e.lineNumber == "number" ? e.lineNumber : void 0,
	column: typeof e.column == "number" ? e.column : void 0
} : {}, kh = (e) => {
	let t = pl.evaluate(e);
	if (!t.allowed) throw new fl(t);
}, Ah = (e) => Sh(e) ? { prompt: typeof e.prompt == "string" ? e.prompt : void 0 } : {}, jh = (e, t, n) => {
	if (!e.path) return;
	let r = hr({
		...n ? { groupId: n } : {},
		path: e.path,
		title: e.title,
		language: e.language
	}), i = To.openFile(r.openInput, t);
	r.shouldLoadTextContent && To.loadFileContent(i.id, t);
}, Mh = (e) => "ok" in e, Nh = (e, t) => {
	if (t === "folder") return {
		baseName: e,
		extension: ""
	};
	let n = e.lastIndexOf(".");
	return n <= 0 ? {
		baseName: e,
		extension: ""
	} : {
		baseName: e.slice(0, n),
		extension: e.slice(n)
	};
}, Ph = (e, t, n) => {
	let { baseName: r, extension: i } = Nh(e, t);
	return `${r}${n === 1 ? " copy" : ` copy ${n}`}${i}`;
}, Fh = (e, t) => Ia.checkExistsFiles(e, t), Ih = async (e, t) => {
	if (!await Fh(e, t.name)) return t.name;
	let n = 1;
	for (; await Fh(e, Ph(t.name, t.type, n));) n += 1;
	return Ph(t.name, t.type, n);
}, Lh = async (e, t) => Po(e, await Ih(e, t)), Rh = (e, t, n, r, i) => e === "copy" ? qo.copyFile(t, n, r) : i ? qo.moveFile(t, n, r, i) : qo.moveFile(t, n, r), zh = async (e) => {
	let t = await Ia.readFile(e);
	if (!t.ok || !globalThis.document || !globalThis.URL?.createObjectURL) return;
	let n = globalThis.URL.createObjectURL(new Blob([t.content], { type: "text/plain;charset=utf-8" })), r = globalThis.document.createElement("a");
	r.href = n, r.download = xh(e), globalThis.navigator?.userAgent?.includes("jsdom") || r.click(), globalThis.URL.revokeObjectURL?.(n);
}, Bh = (e, t) => [
	{
		id: "workbench.action.toggleSidebarVisibility",
		title: "切换侧边栏",
		category: "工作台",
		run: () => {
			let e = Jt(t);
			e.setSidebarVisible(!e.sidebar.visible);
		}
	},
	{
		id: "workbench.action.togglePanel",
		title: "切换面板",
		category: "工作台",
		run: () => {
			let e = Jt(t);
			e.setPanelVisible(!e.panel.visible);
		}
	},
	{
		id: "workbench.action.toggleRightPanel",
		title: "切换右侧面板",
		category: "工作台",
		run: () => {
			let e = Jt(t);
			e.setRightPanelVisible(!e.rightPanel.visible);
		}
	},
	{
		id: "workbench.action.openExplorer",
		title: "打开资源管理器",
		category: "工作台",
		run: () => {
			let e = Jt(t);
			e.setActiveActivity("explorer"), e.setSidebarVisible(!0), e.setFocusedArea("sidebar");
		}
	},
	{
		id: "workbench.action.openSettings",
		title: "打开设置",
		category: "工作台",
		run: () => {
			Jt(t).setFocusedArea("editor"), To.openSettingsView(t);
		}
	},
	{
		id: "workbench.action.openSearch",
		title: "打开搜索",
		category: "工作台",
		run: () => {
			let e = Jt(t);
			e.setActiveActivity("search"), e.setSidebarVisible(!0), e.setFocusedArea("sidebar");
		}
	},
	{
		id: "workbench.action.openSettingsJson",
		title: "打开设置 JSON",
		category: "工作台",
		run: () => {
			let e = Jt(t);
			e.setActiveActivity("explorer"), e.setFocusedArea("editor"), To.openSettingsJson(t);
		}
	},
	{
		id: "workbench.action.openKeyboardShortcuts",
		title: "打开键盘快捷方式",
		category: "工作台",
		run: () => {
			let e = Jt(t);
			e.setActiveActivity("keybindings"), e.setSidebarVisible(!1), e.setFocusedArea("editor");
		}
	},
	{
		id: "workbench.action.openAIPanel",
		title: "打开 AI 面板",
		category: "工作台",
		run: () => {
			let e = Jt(t);
			e.setRightPanelVisible(!0), e.setFocusedArea("panel");
		}
	},
	{
		id: "workbench.action.openTerminal",
		title: "打开终端",
		category: "工作台",
		run: () => {
			let e = Jt(t);
			e.setPanelVisible(!0), e.setActivePanelTab("terminal"), e.setFocusedArea("panel");
		}
	},
	{
		id: "workbench.action.togglePerformanceMonitor",
		title: "切换性能监控",
		category: "开发者",
		run: () => {
			Jt(t).togglePerformanceMonitor();
		}
	},
	{
		id: "enterprise.applyLockedDownPolicy",
		title: "应用企业锁定策略",
		category: "企业",
		run: () => {
			Gt.applyLockedDownPolicy(), qt.appendLine("Enterprise Policy", "已应用企业锁定策略。");
		}
	},
	{
		id: "enterprise.clearPolicy",
		title: "清除企业策略",
		category: "企业",
		run: () => {
			Gt.clearPolicy(), qt.appendLine("Enterprise Policy", "已清除企业策略。");
		}
	},
	{
		id: "workspace.loadP4LargeMockWorkspace",
		title: "加载 P4 大型模拟工作区",
		category: "工作区",
		run: () => {
			let e = Jt(t), n = zt(t), r = gh(), i = r.map((e) => e.path);
			n.setWorkspaceName("p4-large-mock-workspace"), n.setFileTree(r), n.setExpandedFolderPaths(i), n.setSelectedPath(r[0]?.path ?? null), n.setFileSystemProviderStatus({
				capabilities: {
					create: !1,
					delete: !1,
					native: !1,
					rename: !1,
					watch: !1,
					write: !1
				},
				id: "p4-large-mock",
				kind: "virtual",
				name: "P4 Large Mock Workspace",
				ready: !0
			}), e.setActiveActivity("explorer"), e.setSidebarVisible(!0), e.setFocusedArea("sidebar");
		}
	},
	{
		id: "workbench.action.runP4StabilityCheck",
		title: "运行 P4 稳定性检查",
		category: "开发者",
		run: () => {
			let e = zt(t), n = zl.getVisibleNodes(e.fileTree, e.expandedFolderPaths), r = globalThis.document?.querySelectorAll("[data-testid=\"file-tree-item\"]").length ?? n.length, i = vh({
				commandFailureCount: jf.getMetrics().commands.failedCount,
				policyDeniedCount: Gt.getState().auditLog.length,
				renderedFileTreeItems: r,
				totalVisibleFileTreeNodes: n.length
			});
			qt.clear("P4 Stability");
			for (let e of yh(i).trimEnd().split("\n")) qt.appendLine("P4 Stability", e);
		}
	},
	{
		id: "workspace.useBrowserFileSystemAccess",
		title: "使用浏览器文件系统访问",
		category: "工作区",
		run: async () => {
			let e = zt(t), n = new Za(), r = await n.mount();
			e.setFileSystemProviderStatus(n.getStatus()), r.ok && (Ia.setProvider(n), e.setWorkspaceName(Ia.getWorkspaceName()), e.setFileTree(Ia.getFileTree()));
		}
	},
	{
		id: "workspace.connectMockRemote",
		title: "连接模拟远程工作区",
		category: "工作区",
		run: () => {
			Es.connectMockRemote(t);
		}
	},
	{
		id: "workspace.simulateRemoteFailure",
		title: "模拟远程工作区失败",
		category: "工作区",
		run: () => {
			Es.simulateRemoteFailure(t);
		}
	},
	{
		id: "workspace.connectManagedRemote",
		title: "连接托管远程工作区",
		category: "工作区",
		run: () => {
			Es.connectManagedRemote(t);
		}
	},
	{
		id: "workspace.simulateRemoteDisconnect",
		title: "模拟托管远程断开",
		category: "工作区",
		run: () => {
			Es.simulateManagedRemoteDisconnect(t);
		}
	},
	{
		id: "workspace.startRemoteReconnect",
		title: "开始托管远程重连",
		category: "工作区",
		run: () => {
			Es.startReconnect(t);
		}
	},
	{
		id: "workspace.cancelRemoteReconnect",
		title: "取消托管远程重连",
		category: "工作区",
		run: () => {
			let e = Es.getState().activeRequestId;
			e && Es.cancelRemoteRequest(e, t);
		}
	},
	{
		id: "workspace.retryRemoteReconnect",
		title: "重试托管远程重连",
		category: "工作区",
		run: () => {
			Es.retryRemoteConnection(t);
		}
	},
	{
		id: "workspace.simulateRemoteSaveConflict",
		title: "模拟远程保存冲突",
		category: "工作区",
		run: () => {
			Es.simulateSaveConflict("/remote/app.ts", "local draft", "remote changed", t);
		}
	},
	{
		id: "workspace.resolveRemoteConflictUseLocal",
		title: "使用本地内容解决远程冲突",
		category: "工作区",
		run: () => {
			Es.resolveSaveConflict("/remote/app.ts", "local", t);
		}
	},
	{
		id: "workbench.action.showCommands",
		title: "显示所有命令",
		category: "工作台",
		keybinding: "Ctrl+Shift+P",
		run: () => {
			Rt(t).open("commands");
		}
	},
	{
		id: "workbench.action.quickOpen",
		title: "快速打开",
		category: "工作台",
		keybinding: "Ctrl+P",
		run: () => {
			Rt(t).open("files");
		}
	},
	{
		id: "file.open",
		title: "打开文件",
		category: "文件",
		keybinding: "Ctrl+O",
		run: async (e) => {
			let n = Ch(e);
			n.path && (kh({
				operation: "browse",
				sourcePath: n.path
			}), jh(n, t));
		}
	},
	{
		id: "file.openToSide",
		title: "从侧边打开",
		category: "文件",
		run: async (e) => {
			let n = Ch(e);
			n.path && (kh({
				operation: "browse",
				sourcePath: n.path
			}), jh(n, t, tn.split("right", t).groupId));
		}
	},
	{
		id: "file.openInIntegratedExplorer",
		title: "在资源管理器中打开",
		category: "文件",
		run: async (e) => {
			let n = Th(e);
			if (!n.path) return;
			kh({
				operation: "browse",
				sourcePath: n.path
			});
			let r = await Ia.loadFolder(n.path);
			if (!r.ok) return;
			let i = Jt(t), a = zt(t);
			i.setActiveActivity("explorer"), i.setSidebarVisible(!0), i.setFocusedArea("sidebar"), a.setCurrentDirectoryPath(r.path), a.setSelectedPath(null), a.setFocusedPath(null), a.setFileTree(Ia.getFileTree());
		}
	},
	{
		id: "file.save",
		title: "保存文件",
		category: "文件",
		keybinding: "Ctrl+S",
		run: async (e) => {
			let n = wh(e), r = zt(t), i = n.path ?? r.activeFilePath;
			i && await Eo.saveFile(i);
		}
	},
	{
		id: "file.newFile",
		title: "新建文件",
		category: "文件",
		run: async (e) => {
			let n = Th(e), r = zt(t), i = n.parentPath ?? r.selectedPath ?? "/";
			if (kh({
				operation: "create",
				targetPath: i
			}), !n.name) {
				Fs(t).requestCreate({
					anchorPath: n.anchorPath,
					kind: "file",
					parentPath: i
				});
				return;
			}
			await qo.createFile(i, n.name, "", t);
		}
	},
	{
		id: "file.newFolder",
		title: "新建文件夹",
		category: "文件",
		run: async (e) => {
			let n = Th(e), r = zt(t), i = n.parentPath ?? r.selectedPath ?? "/";
			if (kh({
				operation: "create",
				targetPath: i
			}), !n.name) {
				Fs(t).requestCreate({
					anchorPath: n.anchorPath,
					kind: "folder",
					parentPath: i
				});
				return;
			}
			await qo.createFolder(i, n.name, t);
		}
	},
	{
		id: "file.rename",
		title: "重命名",
		category: "文件",
		run: async (e) => {
			let n = Th(e);
			if (!(!n.path || !n.name)) {
				if (kh({
					operation: "rename",
					sourcePath: n.path,
					targetPath: Po(No(n.path), n.name)
				}), !n.commit) {
					Fs(t).requestRename({
						name: n.name,
						path: n.path
					});
					return;
				}
				await qo.renamePath(n.path, n.name, t);
			}
		}
	},
	{
		id: "file.delete",
		title: "删除",
		category: "文件",
		run: async (e) => {
			let n = Th(e);
			n.path && (kh({
				operation: "delete",
				sourcePath: n.path
			}), await qo.deletePath(n.path, t));
		}
	},
	{
		id: "file.download",
		title: "下载",
		category: "文件",
		run: async (e) => {
			let t = Th(e);
			t.path && await zh(t.path);
		}
	},
	{
		id: "file.cut",
		title: "剪切",
		category: "文件",
		run: (e) => {
			let t = Th(e);
			t.path && (kh({
				operation: "cut",
				sourcePath: t.path
			}), Uc.setState({
				operation: "cut",
				path: t.path
			}));
		}
	},
	{
		id: "file.copy",
		title: "复制",
		category: "文件",
		run: (e) => {
			let t = Th(e);
			t.path && (kh({
				operation: "copy",
				sourcePath: t.path
			}), Uc.setState({
				operation: "copy",
				path: t.path
			}));
		}
	},
	{
		id: "file.copyPath",
		title: "复制路径",
		category: "文件",
		run: async (e) => {
			let t = Th(e);
			t.path && await globalThis.navigator?.clipboard?.writeText?.(t.path);
		}
	},
	{
		id: "file.paste",
		title: "粘贴",
		category: "文件",
		run: async (e) => {
			let n = Mo(Th(e).parentPath ?? zt(t).selectedPath ?? "/");
			kh({
				operation: "paste",
				targetPath: n
			});
			let r = Uc.getState();
			if (!r) return;
			let i = Ia.getNodeByPath(r.path);
			if (Mh(i) || r.operation === "cut" && Mo(No(i.path)) === n || i.type === "folder" && Fo(n, i.path)) return;
			let a = await Lh(n, i);
			kh({
				operation: r.operation === "cut" ? "move" : "copy",
				sourcePath: i.path,
				targetPath: a
			});
			let o = Po(n, i.name), s = r.operation === "cut" && a !== o ? { rename: !0 } : void 0;
			(await Rh(r.operation, i.path, a, t, s)).ok && Uc.clear();
		}
	},
	{
		id: "file.revealInExplorer",
		title: "在资源管理器中显示",
		category: "文件",
		run: (e) => {
			let n = Th(e);
			if (!n.path) return;
			let r = Jt(t), i = zt(t), a = n.path.split("/").filter(Boolean), o = a.slice(0, -1).map((e, t) => `/${a.slice(0, t + 1).join("/")}`);
			r.setActiveActivity("explorer"), r.setSidebarVisible(!0), r.setFocusedArea("sidebar"), i.setExpandedFolderPaths(Array.from(new Set([...i.expandedFolderPaths, ...o]))), i.setSelectedPath(n.path), i.setFocusedPath(n.path);
		}
	},
	{
		id: "file.openProperties",
		title: "属性",
		category: "文件",
		run: (e) => {
			let n = Th(e);
			n.path && Fs(t).requestProperties({
				name: n.name ?? xh(n.path),
				path: n.path,
				type: n.type ?? "file"
			});
		}
	},
	{
		id: "search.openResult",
		title: "打开搜索结果",
		category: "搜索",
		run: (e) => {
			let n = Th(e);
			n.path && To.openFile({
				path: n.path,
				title: xh(n.path),
				language: Lt(n.path)
			}, t);
		}
	},
	{
		id: "workbench.action.openProblems",
		title: "打开问题",
		category: "工作台",
		run: () => {
			let e = Jt(t);
			e.setPanelVisible(!0), e.setActivePanelTab("problems"), e.setFocusedArea("panel");
		}
	},
	{
		id: "problems.open",
		title: "打开问题项",
		category: "问题",
		run: (e) => {
			let n = Oh(e);
			n.path && (To.openFile({
				path: n.path,
				title: xh(n.path),
				language: Lt(n.path)
			}, t), Xt(t).setCursorPosition({
				lineNumber: n.lineNumber ?? 1,
				column: n.column ?? 1
			}));
		}
	},
	{
		id: "problems.clear",
		title: "清除问题",
		category: "问题",
		run: () => {
			Fp.clearAll();
		}
	},
	{
		id: "tasks.runBuild",
		title: "运行构建任务",
		category: "任务",
		run: async () => {
			let e = Jt(t);
			e.setPanelVisible(!0), e.setActivePanelTab("problems"), e.setFocusedArea("panel"), qt.setActiveChannel("Tasks"), await bh.runTask("mock.build");
		}
	},
	{
		id: "tasks.cancelBuild",
		title: "取消构建任务",
		category: "任务",
		run: () => {
			let e = Jt(t);
			e.setPanelVisible(!0), e.setActivePanelTab("problems"), e.setFocusedArea("panel"), qt.setActiveChannel("Tasks"), bh.cancelTask("mock.build");
		}
	},
	{
		id: "ai.runPrompt",
		title: "运行 AI 上下文提示",
		category: "AI",
		run: (e) => {
			let n = Jt(t), r = Ah(e);
			n.setRightPanelVisible(!0), n.setFocusedArea("panel"), $p.runPrompt(r.prompt ?? "总结当前工作区上下文。", t);
		}
	},
	{
		id: "ai.runSearchTool",
		title: "运行 AI 搜索工具",
		category: "AI",
		run: async () => {
			let n = Jt(t);
			n.setRightPanelVisible(!0), n.setFocusedArea("panel");
			let r = new wp(e);
			await $p.runToolCall({
				id: "open-search",
				label: "打开搜索",
				commandId: "workbench.action.openSearch"
			}, (e) => r.execute(e));
		}
	},
	{
		id: "ai.cancel",
		title: "取消 AI 响应",
		category: "AI",
		run: () => {
			$p.cancel();
		}
	},
	{
		id: "editor.splitRight",
		title: "向右拆分编辑器",
		category: "编辑器",
		run: () => {
			tn.split("right", t);
		}
	},
	{
		id: "editor.splitDown",
		title: "向下拆分编辑器",
		category: "编辑器",
		run: () => {
			tn.split("down", t);
		}
	},
	{
		id: "editor.openDiff",
		title: "打开 Diff 编辑器",
		category: "编辑器",
		run: (e) => {
			let n = Dh(e);
			!n.originalPath || !n.modifiedPath || tn.openDiff(n.originalPath, n.modifiedPath, t);
		}
	},
	{
		id: "file.compareWithSaved",
		title: "与已保存内容比较",
		category: "文件",
		run: (e) => {
			let n = Th(e).path ?? zt(t).activeFilePath;
			n && tn.openDiff(n, n, t);
		}
	},
	{
		id: "markdown.openPreview",
		title: "打开 Markdown 预览",
		category: "Markdown",
		run: (e) => {
			let n = Th(e).path ?? zt(t).activeFilePath;
			n && tn.openMarkdownPreview(n, t);
		}
	},
	{
		id: "editor.activateTab",
		title: "激活编辑器标签",
		category: "编辑器",
		run: (e) => {
			let n = Eh(e);
			n.tabId && To.activateTab(n.tabId, t);
		}
	},
	{
		id: "editor.closeTab",
		title: "关闭编辑器标签",
		category: "编辑器",
		run: (e) => {
			let n = Eh(e);
			n.tabId && To.closeTab(n.tabId, t);
		}
	},
	{
		id: "editor.closeActiveTab",
		title: "关闭当前编辑器标签",
		category: "编辑器",
		run: () => {
			To.closeActiveTab(t);
		}
	},
	{
		id: "editor.closeOtherTabs",
		title: "关闭其他编辑器标签",
		category: "编辑器",
		run: (e) => {
			let n = Eh(e).tabId ?? zt(t).activeFilePath;
			n && To.closeOtherTabs(n, t);
		}
	},
	{
		id: "editor.closeTabsToTheRight",
		title: "关闭右侧编辑器标签",
		category: "编辑器",
		run: (e) => {
			let n = Eh(e).tabId ?? zt(t).activeFilePath;
			n && To.closeTabsToTheRight(n, t);
		}
	},
	{
		id: "editor.closeSavedTabs",
		title: "关闭已保存编辑器标签",
		category: "编辑器",
		run: () => {
			To.closeSavedTabs(t);
		}
	},
	{
		id: "editor.closeAllTabs",
		title: "关闭全部编辑器标签",
		category: "编辑器",
		run: () => {
			To.closeAllTabs(t);
		}
	},
	{
		id: "editor.toggleTabPinned",
		title: "切换编辑器标签固定状态",
		category: "编辑器",
		run: (e) => {
			let n = Eh(e);
			n.tabId && To.togglePinned(n.tabId, t);
		}
	}
], Vh = (e, t) => {
	for (let n of Bh(e, t)) e.register(n);
	ft(t).setCommands(e.list());
}, Hh = (e, t) => {
	let n = Math.max(0, Math.min(t, e.length)), r = e.slice(0, n).split("\n");
	return {
		lineNumber: r.length,
		column: r.at(-1)?.length ? r.at(-1).length + 1 : 1
	};
}, Uh = (e) => {
	let t = String(e).match(/position\s+(\d+)/i);
	return t ? Number(t[1]) : 0;
}, Wh = class {
	id = "json-language-service";
	matches(e) {
		return e.language === "json" || e.path.endsWith(".json");
	}
	validateDocument(e) {
		try {
			return JSON.parse(e.content), [];
		} catch (t) {
			let n = Hh(e.content, Uh(t));
			return [{
				path: e.path,
				message: `JSON 无效: ${String(t).replace(/^SyntaxError:\s*/, "")}`,
				severity: "error",
				lineNumber: n.lineNumber,
				column: n.column,
				source: this.id
			}];
		}
	}
}, Gh = new class {
	providers = [];
	constructor(e = Fp) {
		this.diagnostics = e;
	}
	registerProvider(e) {
		this.providers.push(e);
	}
	validateDocument(e) {
		let t = this.providers.find((t) => t.matches(e));
		if (!t) return [];
		let n = t.validateDocument(e);
		return this.diagnostics.setDiagnostics(t.id, n), n;
	}
}(), Kh = {
	sidebar: "splitter.sidebar.resize",
	bottomPanel: "splitter.bottomPanel.resize",
	rightPanel: "splitter.rightPanel.resize",
	editorGroup: "splitter.editorGroup.resize",
	terminalSessions: "splitter.terminalSessions.resize"
}, qh = 80, Jh = 150, Yh = 120, Xh = ({ handleRef: e, handle: t }) => {
	let n = Jt(), r = Ds(), i = 0, a = 0, o = 0, s = null, c = 0, l = -Infinity, u = () => t === "sidebar" ? r.sidebar.width : t === "bottomPanel" ? r.bottomPanel.height : t === "rightPanel" ? r.rightPanel.width : t === "terminalSessions" ? ig.terminalSessions.defaultSize : r.editorGroup.ratio, d = () => {
		let t = e.value?.parentElement;
		for (; t;) {
			let e = t.getBoundingClientRect().width;
			if (e > 0) return e;
			t = t.parentElement;
		}
		return 0;
	}, f = (e) => {
		if (t === "sidebar") return o + e.clientX - i;
		if (t === "bottomPanel") return o - (e.clientY - a);
		if (t === "rightPanel" || t === "terminalSessions") return o - (e.clientX - i);
		let n = d();
		return n <= 0 ? o : o + (e.clientX - i) / n * 100;
	}, p = () => {
		c = 0, s !== null && (Ep.execute(Kh[t], { size: s }), s = null);
	}, m = (e) => {
		s = e, !c && (c = window.requestAnimationFrame(p));
	}, h = (e) => t === "sidebar" && e <= ig.sidebar.min - qh, g = (e) => t === "bottomPanel" && n.panel.visible && e.clientY <= Jh, _ = () => {
		c &&= (window.cancelAnimationFrame(c), 0), s = null, r.setSidebarWidth(ig.sidebar.min), r.stopDragging(), n.setSidebarVisible(!1);
	}, v = (e) => {
		window.dispatchEvent(new CustomEvent(e, { detail: { handle: t } }));
	}, y = () => {
		let e = performance.now();
		e - l < Yh || (l = e, v($h));
	}, b = (n) => {
		let s = e.value;
		s && (n.preventDefault(), i = n.clientX, a = n.clientY, o = u(), l = -Infinity, r.startDragging(t), s.setPointerCapture?.(n.pointerId));
	}, x = (e) => {
		if (!r.dragging || r.activeHandle !== t) return;
		e.preventDefault();
		let n = g(e) ? ig.bottomPanel.max : f(e);
		if (h(n)) {
			_();
			return;
		}
		m(n), y();
	}, S = (e) => {
		r.activeHandle === t && (e.preventDefault(), c && (window.cancelAnimationFrame(c), p()), r.stopDragging(), v(eg));
	};
	st(e, "pointerdown", b), st(window, "pointermove", x), st(window, "pointerup", S), st(window, "pointercancel", S);
}, Zh = [
	"aria-label",
	"aria-orientation",
	"data-testid"
], Qh = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "SplitterHandle",
	props: {
		handle: {},
		orientation: {}
	},
	setup(e) {
		let r = e, i = n(null);
		Xh({
			handleRef: i,
			handle: r.handle
		});
		let a = j(() => r.handle === "sidebar" ? "Resize sidebar" : r.handle === "bottomPanel" ? "Resize bottom panel" : r.handle === "rightPanel" ? "Resize right panel" : "Resize editor group");
		return (n, r) => (f(), I("div", {
			ref_key: "handleRef",
			ref: i,
			class: t(["splitter-handle", `splitter-handle--${e.orientation}`]),
			role: "separator",
			tabindex: "0",
			"aria-label": a.value,
			"aria-orientation": e.orientation,
			"data-testid": `splitter-${e.handle}`
		}, null, 10, Zh));
	}
}), [["__scopeId", "data-v-fda2cea3"]]), $h = "workbench:resize", eg = "workbench:resize-complete", tg = (e) => typeof e == "object" && !!e, ng = (e) => tg(e) ? { size: typeof e.size == "number" ? e.size : void 0 } : {}, rg = (e, t, n, r) => {
	e.register({
		id: "splitter.sidebar.resize",
		title: "调整侧边栏宽度",
		category: "布局",
		run: (e) => {
			let t = ng(e);
			t.size !== void 0 && Ds(r).setSidebarWidth(n.clampSize("sidebar", t.size));
		}
	}), e.register({
		id: "splitter.bottomPanel.resize",
		title: "调整底部面板高度",
		category: "布局",
		run: (e) => {
			let t = ng(e);
			t.size !== void 0 && Ds(r).setBottomPanelHeight(n.clampSize("bottomPanel", t.size));
		}
	}), e.register({
		id: "splitter.rightPanel.resize",
		title: "调整右侧面板宽度",
		category: "布局",
		run: (e) => {
			let t = ng(e);
			t.size !== void 0 && Ds(r).setRightPanelWidth(n.clampSize("rightPanel", t.size));
		}
	}), e.register({
		id: "splitter.editorGroup.resize",
		title: "调整编辑器组宽度",
		category: "布局",
		run: (e) => {
			let t = ng(e);
			t.size !== void 0 && Ds(r).setEditorGroupRatio(n.clampSize("editorGroup", t.size));
		}
	}), e.register({
		id: "splitter.terminalSessions.resize",
		title: "调整终端会话列表宽度",
		category: "布局",
		run: (e) => {
			let t = ng(e);
			t.size !== void 0 && Ds(r).setTerminalSessionsWidth(n.clampSize("terminalSessions", t.size));
		}
	}), e.register({
		id: "workbench.layout.reset",
		title: "重置工作台布局",
		category: "布局",
		run: () => {
			let e = Ds(r), t = n.getDefaultLayout();
			e.setSidebarWidth(t.sidebarWidth), e.setBottomPanelHeight(t.bottomPanelHeight), e.setRightPanelWidth(t.rightPanelWidth), e.setEditorGroupRatio(t.editorGroupRatio), e.setTerminalSessionsWidth(t.terminalSessionsWidth), e.stopDragging();
		}
	}), ft(r).setCommands(e.list());
}, ig = {
	sidebar: {
		defaultSize: 280,
		min: 180,
		max: 520
	},
	bottomPanel: {
		defaultSize: 180,
		min: 120,
		max: 480
	},
	rightPanel: {
		defaultSize: 400,
		min: 280,
		max: 520
	},
	editorGroup: {
		defaultSize: 50,
		min: 20,
		max: 80
	},
	terminalSessions: {
		defaultSize: 160,
		min: 120,
		max: 200
	}
}, ag = new class {
	constructor(e = ig) {
		this.config = e;
	}
	clampSize(e, t) {
		let n = this.config[e];
		return Math.min(n.max, Math.max(n.min, Math.round(t)));
	}
	getDefaultLayout() {
		return {
			sidebarWidth: this.config.sidebar.defaultSize,
			bottomPanelHeight: this.config.bottomPanel.defaultSize,
			rightPanelWidth: this.config.rightPanel.defaultSize,
			editorGroupRatio: this.config.editorGroup.defaultSize,
			terminalSessionsWidth: this.config.terminalSessions.defaultSize
		};
	}
}(), og = [
	{
		id: "core",
		label: "Core Services",
		description: "加载基础运行时、状态容器和命令注册。",
		statusText: "正在启动核心服务"
	},
	{
		id: "ui",
		label: "Workbench UI",
		description: "渲染标题栏、活动栏、侧栏、编辑区和状态栏框架。",
		statusText: "正在挂载工作台框架"
	},
	{
		id: "language",
		label: "Language Services",
		description: "准备主题、语言服务、诊断和 Monaco Worker。",
		statusText: "正在初始化语言服务"
	},
	{
		id: "workspace",
		label: "Workspace",
		description: "连接文件系统、同步目录树并打开初始文件。",
		statusText: "正在加载工作区"
	}
], sg = new Map(og.map((e, t) => [e.id, t])), cg = nt("startup", {
	state: () => ({
		status: "booting",
		phase: "core",
		errorMessage: null,
		welcomeMessageShown: !1
	}),
	getters: {
		activePhaseIndex: (e) => sg.get(e.phase) ?? 0,
		isInteractionLocked: (e) => e.status !== "ready",
		shouldShowWelcomeMessage: (e) => e.status === "ready" && !e.welcomeMessageShown,
		currentStatusText: (e) => e.status === "ready" ? "初始化完成" : e.status === "error" ? e.errorMessage || "初始化失败" : og[sg.get(e.phase) ?? 0]?.statusText ?? "正在初始化"
	},
	actions: {
		reset() {
			this.status = "booting", this.phase = "core", this.errorMessage = null, this.welcomeMessageShown = !1;
		},
		setPhase(e) {
			this.phase = e, this.status = "booting", this.errorMessage = null;
		},
		markReady() {
			this.status = "ready", this.errorMessage = null;
		},
		markError(e) {
			this.status = "error", this.errorMessage = e;
		},
		markWelcomeMessageShown() {
			this.welcomeMessageShown = !0;
		}
	}
}), lg = {
	width: 980,
	height: 720
}, ug = () => ({
	width: Math.max(globalThis.document?.documentElement.clientWidth ?? lg.width, lg.width),
	height: Math.max(globalThis.document?.documentElement.clientHeight ?? lg.height, lg.height)
}), dg = () => {
	let e = ug();
	return {
		x: Math.max(0, Math.floor((e.width - lg.width) / 2)),
		y: Math.max(0, Math.floor((e.height - lg.height) / 2)),
		width: lg.width,
		height: lg.height
	};
}, fg = nt("window", {
	state: () => {
		let e = dg();
		return {
			mode: "windowed",
			rect: { ...e },
			restoreRect: { ...e },
			dragging: !1,
			resizing: !1
		};
	},
	actions: {
		setRect(e) {
			this.rect = {
				...this.rect,
				...e
			}, this.mode === "windowed" && (this.restoreRect = { ...this.rect });
		},
		startDrag() {
			this.dragging = !0;
		},
		stopDrag() {
			this.dragging = !1;
		},
		startResize() {
			this.resizing = !0;
		},
		stopResize() {
			this.resizing = !1;
		},
		minimize() {
			this.mode === "windowed" && (this.restoreRect = { ...this.rect }), this.mode = "minimized", this.dragging = !1, this.resizing = !1;
		},
		open() {
			(this.mode === "closed" || this.mode === "minimized") && (this.mode = "windowed", this.rect = { ...this.restoreRect }), this.dragging = !1, this.resizing = !1;
		},
		close() {
			this.mode === "windowed" && (this.restoreRect = { ...this.rect }), this.mode = "closed", this.dragging = !1, this.resizing = !1;
		},
		maximize() {
			this.mode === "windowed" && (this.restoreRect = { ...this.rect }), this.mode = "maximized", this.dragging = !1, this.resizing = !1;
		},
		restore() {
			this.mode = "windowed", this.rect = { ...this.restoreRect }, this.dragging = !1, this.resizing = !1;
		}
	}
}), pg = [
	"aria-label",
	"data-testid",
	"onKeydown"
], mg = {
	class: "desktop-icon__glyph",
	"aria-hidden": "true"
}, hg = { class: "desktop-icon__window" }, gg = {
	key: 0,
	class: "desktop-icon__dialog"
}, _g = {
	key: 1,
	class: "desktop-icon__message"
}, vg = {
	key: 2,
	class: "desktop-icon__tooltip"
}, yg = { class: "desktop-icon__label" }, bg = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "DesktopIcon",
	props: {
		ariaLabel: { default: "打开编辑器" },
		label: { default: "编辑器" },
		openOnClick: {
			type: Boolean,
			default: !1
		},
		testId: { default: "desktop-app-editor" },
		variant: { default: "editor" }
	},
	emits: ["open"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = () => {
			i("open");
		}, o = () => {
			r.openOnClick && a();
		};
		return (n, r) => (f(), I("button", {
			class: t(["desktop-icon", `desktop-icon--${e.variant}`]),
			type: "button",
			"aria-label": e.ariaLabel,
			"data-testid": e.testId,
			onClick: o,
			onDblclick: a,
			onKeydown: [le(P(a, ["prevent"]), ["enter"]), le(P(a, ["prevent"]), ["space"])]
		}, [G("span", mg, [G("span", hg, [
			r[3] ||= G("span", { class: "desktop-icon__bar" }, null, -1),
			r[4] ||= G("span", { class: "desktop-icon__line desktop-icon__line--short" }, null, -1),
			r[5] ||= G("span", { class: "desktop-icon__line" }, null, -1),
			r[6] ||= G("span", { class: "desktop-icon__cursor" }, null, -1),
			e.variant === "modal" ? (f(), I("span", gg, [...r[0] ||= [G("span", { class: "desktop-icon__dialog-line" }, null, -1), G("span", { class: "desktop-icon__dialog-button" }, null, -1)]])) : N("", !0),
			e.variant === "message" ? (f(), I("span", _g, [...r[1] ||= [G("span", { class: "desktop-icon__message-dot" }, null, -1), G("span", { class: "desktop-icon__message-line" }, null, -1)]])) : N("", !0),
			e.variant === "tooltip" ? (f(), I("span", vg, [...r[2] ||= [G("span", { class: "desktop-icon__tooltip-line" }, null, -1)]])) : N("", !0)
		])]), G("span", yg, K(e.label), 1)], 42, pg));
	}
}), [["__scopeId", "data-v-98d2f058"]]), xg = {
	class: "message-playground-window",
	"data-testid": "message-playground-window",
	"aria-label": "Message 组件实验台"
}, Sg = { class: "message-playground-window__titlebar" }, Cg = { class: "message-playground-window__title" }, wg = { class: "message-playground-window__body" }, Tg = ["onSubmit"], Eg = { class: "message-playground-window__section" }, Dg = { class: "message-playground-window__field" }, Og = { class: "message-playground-window__grid" }, kg = { class: "message-playground-window__field" }, Ag = { class: "message-playground-window__field" }, jg = { class: "message-playground-window__section" }, Mg = { class: "message-playground-window__field" }, Ng = { class: "message-playground-window__section" }, Pg = { class: "message-playground-window__grid" }, Fg = { class: "message-playground-window__field" }, Ig = { class: "message-playground-window__checks" }, Lg = { class: "message-playground-window__section" }, Rg = { class: "message-playground-window__buttons" }, zg = {
	class: "message-playground-window__primary",
	"data-testid": "message-playground-create",
	type: "submit"
}, Bg = ["onClick"], Vg = ["onClick"], Hg = ["onClick"], Ug = { class: "message-playground-window__preview" }, Wg = { class: "message-playground-window__code" }, Gg = { "data-testid": "message-playground-code" }, Kg = { class: "message-playground-window__events" }, qg = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "MessagePlaygroundWindow",
	emits: ["close"],
	setup(t, { emit: r }) {
		let i = r, a = n("success"), o = n("top"), s = n("保存成功"), c = n(3e3), l = n(4), u = n(!0), d = n(!0), p = n(!0), m = n(!1), h = n(!1), g = n(null), _ = n(["等待触发 Message"]), v = j(() => h.value ? { "--message-playground-offset": "48px" } : void 0), y = j(() => m.value ? "message-playground-window__custom-container" : void 0), b = j(() => Math.min(Math.max(l.value, 1), 8)), x = j(() => Math.max(c.value, 0)), C = j(() => a.value === "default" ? "create" : a.value), w = j(() => [
			`\tduration: ${x.value}, // 持续时间`,
			`\tclosable: ${u.value}, // 可关闭`,
			`\tkeepAliveOnHover: ${d.value}, // 悬停保活`,
			`\tshowIcon: ${p.value}, // 显示图标`
		]), T = j(() => [
			"const message = useMessage()",
			"",
			`const current = message.${C.value}('${E(s.value)}', {`,
			...w.value,
			"})",
			"",
			"current.content = '已同步到服务器' // 动态更新内容",
			"current.type = 'info' // 动态更新类型",
			"current.destroy() // 手动销毁",
			"message.destroyAll() // 清空队列"
		].join("\n")), E = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n"), O = (e) => {
			_.value = [`${(/* @__PURE__ */ new Date()).toLocaleTimeString()} ${e}`, ..._.value].slice(0, 12);
		}, k = () => ({
			closable: u.value,
			duration: x.value,
			keepAliveOnHover: d.value,
			showIcon: p.value
		}), A = (e) => {
			let t = k();
			g.value = a.value === "default" ? e.create(s.value, t) : e[a.value](s.value, t), O(`create:${a.value}`);
		}, N = (e) => {
			g.value = e.loading("加载中", {
				closable: !0,
				keepAliveOnHover: d.value,
				showIcon: !0
			}), O("loading");
		}, F = (e) => {
			e.info("第一条消息", { duration: 0 }), e.success("第二条消息", { duration: 0 }), g.value = e.warning("第三条消息", { duration: 0 }), O("create:max");
		}, R = () => {
			g.value && (g.value.content = "已同步到服务器", g.value.type = "info", g.value.closable = !0, g.value.showIcon = !0, s.value = "已同步到服务器", a.value = "info", O("update:current"));
		}, V = () => {
			g.value?.destroy(), g.value = null, O("destroy:current");
		}, ee = (e) => {
			e.destroyAll(), g.value = null, O("destroyAll");
		};
		return (t, n) => (f(), J(e(Dc), {
			closable: u.value,
			"container-class": y.value,
			"container-style": v.value,
			duration: x.value,
			"keep-alive-on-hover": d.value,
			max: b.value,
			placement: o.value,
			to: "body"
		}, {
			default: M(({ message: t }) => [G("section", xg, [G("header", Sg, [G("div", Cg, [D(e(X), {
				name: "bell",
				decorative: ""
			}), n[11] ||= G("span", null, "Message 组件实验台", -1)]), G("button", {
				class: "message-playground-window__close",
				type: "button",
				"aria-label": "关闭 Message 实验台",
				onClick: n[0] ||= (e) => i("close")
			}, [D(e(X), {
				name: "chrome-close",
				size: 13,
				decorative: ""
			})])]), G("div", wg, [G("form", {
				class: "message-playground-window__controls",
				onSubmit: P((e) => A(t), ["prevent"])
			}, [
				G("section", Eg, [
					n[16] ||= G("h2", null, "基础配置", -1),
					G("label", Dg, [n[12] ||= G("span", null, "内容（content）", -1), H(G("textarea", {
						"onUpdate:modelValue": n[1] ||= (e) => s.value = e,
						"data-testid": "message-playground-content",
						rows: "3"
					}, null, 512), [[B, s.value]])]),
					G("div", Og, [G("label", kg, [n[14] ||= G("span", null, "类型（type）", -1), H(G("select", {
						"onUpdate:modelValue": n[2] ||= (e) => a.value = e,
						"data-testid": "message-playground-type"
					}, [...n[13] ||= [
						G("option", { value: "default" }, "default", -1),
						G("option", { value: "info" }, "info", -1),
						G("option", { value: "success" }, "success", -1),
						G("option", { value: "warning" }, "warning", -1),
						G("option", { value: "error" }, "error", -1),
						G("option", { value: "loading" }, "loading", -1)
					]], 512), [[q, a.value]])]), G("label", Ag, [n[15] ||= G("span", null, "持续时间（duration）", -1), H(G("input", {
						"onUpdate:modelValue": n[3] ||= (e) => c.value = e,
						"data-testid": "message-playground-duration",
						type: "number",
						min: "0",
						step: "500"
					}, null, 512), [[
						B,
						c.value,
						void 0,
						{ number: !0 }
					]])])])
				]),
				G("section", jg, [n[19] ||= G("h2", null, "显示位置", -1), G("label", Mg, [n[18] ||= G("span", null, "位置（placement）", -1), H(G("select", {
					"onUpdate:modelValue": n[4] ||= (e) => o.value = e,
					"data-testid": "message-playground-placement"
				}, [...n[17] ||= [
					G("option", { value: "top" }, "top", -1),
					G("option", { value: "top-left" }, "top-left", -1),
					G("option", { value: "top-right" }, "top-right", -1),
					G("option", { value: "center" }, "center", -1),
					G("option", { value: "bottom" }, "bottom", -1),
					G("option", { value: "bottom-left" }, "bottom-left", -1),
					G("option", { value: "bottom-right" }, "bottom-right", -1)
				]], 512), [[q, o.value]])])]),
				G("section", Ng, [
					n[27] ||= G("h2", null, "队列与容器", -1),
					G("div", Pg, [G("label", Fg, [n[20] ||= G("span", null, "最大数量（max）", -1), H(G("input", {
						"onUpdate:modelValue": n[5] ||= (e) => l.value = e,
						type: "number",
						min: "1",
						max: "8",
						step: "1"
					}, null, 512), [[
						B,
						l.value,
						void 0,
						{ number: !0 }
					]])]), n[21] ||= G("label", { class: "message-playground-window__field" }, [G("span", null, "挂载目标（to）"), G("input", {
						value: "body",
						disabled: ""
					})], -1)]),
					G("div", Ig, [
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[6] ||= (e) => u.value = e,
							type: "checkbox"
						}, null, 512), [[U, u.value]]), n[22] ||= L("可关闭（closable）", -1)]),
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[7] ||= (e) => d.value = e,
							type: "checkbox"
						}, null, 512), [[U, d.value]]), n[23] ||= L("悬停保活（keepAliveOnHover）", -1)]),
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[8] ||= (e) => p.value = e,
							type: "checkbox"
						}, null, 512), [[U, p.value]]), n[24] ||= L("显示图标（showIcon）", -1)]),
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[9] ||= (e) => m.value = e,
							type: "checkbox"
						}, null, 512), [[U, m.value]]), n[25] ||= L("容器类名（containerClass）", -1)]),
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[10] ||= (e) => h.value = e,
							type: "checkbox"
						}, null, 512), [[U, h.value]]), n[26] ||= L("容器样式（containerStyle）", -1)])
					])
				]),
				G("section", Lg, [n[34] ||= G("h2", null, "动态实例", -1), G("div", Rg, [
					G("button", zg, [D(e(X), {
						name: "run",
						decorative: ""
					}), n[28] ||= G("span", null, "创建 Message", -1)]),
					G("button", {
						class: "message-playground-window__secondary",
						"data-testid": "message-playground-loading",
						type: "button",
						onClick: (e) => N(t)
					}, [D(e(X), {
						name: "loading",
						decorative: ""
					}), n[29] ||= G("span", null, "loading", -1)], 8, Bg),
					G("button", {
						class: "message-playground-window__secondary",
						type: "button",
						onClick: (e) => F(t)
					}, [D(e(X), {
						name: "list-unordered",
						decorative: ""
					}), n[30] ||= G("span", null, "测试 max", -1)], 8, Vg),
					G("button", {
						class: "message-playground-window__secondary",
						"data-testid": "message-playground-update-current",
						type: "button",
						onClick: R
					}, [D(e(X), {
						name: "sync",
						decorative: ""
					}), n[31] ||= G("span", null, "动态更新", -1)]),
					G("button", {
						class: "message-playground-window__secondary",
						type: "button",
						onClick: V
					}, [D(e(X), {
						name: "trash",
						decorative: ""
					}), n[32] ||= G("span", null, "销毁当前", -1)]),
					G("button", {
						class: "message-playground-window__secondary",
						"data-testid": "message-playground-destroy-all",
						type: "button",
						onClick: (e) => ee(t)
					}, [D(e(X), {
						name: "clear-all",
						decorative: ""
					}), n[33] ||= G("span", null, "destroyAll", -1)], 8, Hg)
				])])
			], 40, Tg), G("aside", Ug, [
				G("section", Wg, [n[35] ||= G("h2", null, "useMessage 代码演示", -1), G("pre", Gg, [G("code", null, K(T.value), 1)])]),
				n[37] ||= G("section", { class: "message-playground-window__coverage" }, [G("h2", null, "覆盖面"), G("ul", null, [
					G("li", null, [
						G("code", null, "create"),
						G("code", null, "info"),
						G("code", null, "success"),
						G("code", null, "warning"),
						G("code", null, "error"),
						G("code", null, "loading")
					]),
					G("li", null, [
						G("code", null, "destroy"),
						G("code", null, "destroyAll"),
						G("code", null, "duration"),
						G("code", null, "closable"),
						G("code", null, "max"),
						G("code", null, "placement")
					]),
					G("li", null, [
						G("code", null, "keepAliveOnHover"),
						G("code", null, "showIcon"),
						G("code", null, "containerClass"),
						G("code", null, "containerStyle"),
						G("code", null, "to")
					])
				])], -1),
				G("section", Kg, [n[36] ||= G("h2", null, "事件日志", -1), G("ul", null, [(f(!0), I(z, null, S(_.value, (e) => (f(), I("li", { key: e }, K(e), 1))), 128))])])
			])])])]),
			_: 1
		}, 8, [
			"closable",
			"container-class",
			"container-style",
			"duration",
			"keep-alive-on-hover",
			"max",
			"placement"
		]));
	}
}), [["__scopeId", "data-v-8162e19e"]]), Jg = {
	class: "minimized-editor-card__icon",
	"aria-hidden": "true"
}, Yg = ["title"], Xg = { class: "minimized-editor-card__actions" }, Zg = 280, Qg = 52, $g = 20, e_ = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "MinimizedEditorCard",
	props: { title: {} },
	emits: ["close", "restore"],
	setup(e, { emit: t }) {
		let r = t, i = n({
			x: $g,
			y: Math.max($g, document.documentElement.clientHeight - Qg - $g)
		}), a = n({
			pointerX: 0,
			pointerY: 0,
			...i.value
		}), o = n(null), s = j(() => ({
			left: `${i.value.x}px`,
			top: `${i.value.y}px`
		})), c = (e, t) => {
			let n = Math.max($g, document.documentElement.clientWidth - Zg - $g), r = Math.max($g, document.documentElement.clientHeight - Qg - $g);
			return {
				x: Math.min(Math.max(e, $g), n),
				y: Math.min(Math.max(t, $g), r)
			};
		}, l = (e) => {
			let t = e.target;
			if (!(t instanceof HTMLElement && t.closest("button"))) {
				e.preventDefault(), o.value = e.pointerId, a.value = {
					pointerX: e.clientX,
					pointerY: e.clientY,
					x: i.value.x,
					y: i.value.y
				};
				try {
					e.currentTarget.setPointerCapture?.(e.pointerId);
				} catch {}
			}
		}, u = (e) => {
			o.value === e.pointerId && (e.preventDefault(), i.value = c(a.value.x + e.clientX - a.value.pointerX, a.value.y + e.clientY - a.value.pointerY));
		}, d = (e) => {
			o.value === e.pointerId && (e.preventDefault(), o.value = null);
		};
		return (t, n) => (f(), I("section", {
			class: "minimized-editor-card",
			style: p(s.value),
			"data-testid": "minimized-editor-card",
			"aria-label": "最小化的编辑器",
			onPointerdown: l,
			onPointermove: u,
			onPointerup: d,
			onPointercancel: d
		}, [
			G("div", Jg, [D(X, {
				name: "code",
				size: 15,
				decorative: ""
			})]),
			G("div", {
				class: "minimized-editor-card__title",
				title: e.title
			}, K(e.title), 9, Yg),
			G("div", Xg, [G("button", {
				class: "minimized-editor-card__action",
				type: "button",
				"aria-label": "还原编辑器",
				title: "还原编辑器",
				onClick: n[0] ||= P((e) => r("restore"), ["stop"])
			}, [D(X, {
				name: "chrome-restore",
				size: 15,
				decorative: ""
			})]), G("button", {
				class: "minimized-editor-card__action minimized-editor-card__action--danger",
				type: "button",
				"aria-label": "关闭编辑器",
				title: "关闭编辑器",
				onClick: n[1] ||= P((e) => r("close"), ["stop"])
			}, [D(X, {
				name: "chrome-close",
				size: 13,
				decorative: ""
			})])])
		], 36));
	}
}), [["__scopeId", "data-v-60e381f9"]]), t_ = {
	class: "modal-playground-window",
	"data-testid": "modal-playground-window",
	"aria-label": "Modal 组件实验台"
}, n_ = { class: "modal-playground-window__titlebar" }, r_ = { class: "modal-playground-window__title" }, i_ = { class: "modal-playground-window__body" }, a_ = { class: "modal-playground-window__section" }, o_ = { class: "modal-playground-window__grid" }, s_ = { class: "modal-playground-window__field" }, c_ = { class: "modal-playground-window__field" }, l_ = { class: "modal-playground-window__field" }, u_ = { class: "modal-playground-window__field" }, d_ = ["disabled"], f_ = { class: "modal-playground-window__field modal-playground-window__field--inline" }, p_ = { class: "modal-playground-window__section" }, m_ = { class: "modal-playground-window__field" }, h_ = { class: "modal-playground-window__field" }, g_ = { class: "modal-playground-window__grid" }, __ = { class: "modal-playground-window__field" }, v_ = { class: "modal-playground-window__field" }, y_ = { class: "modal-playground-window__field" }, b_ = { class: "modal-playground-window__field" }, x_ = { class: "modal-playground-window__section" }, S_ = { class: "modal-playground-window__checks" }, C_ = { class: "modal-playground-window__section" }, w_ = { class: "modal-playground-window__grid" }, T_ = { class: "modal-playground-window__field" }, E_ = { class: "modal-playground-window__section" }, D_ = { class: "modal-playground-window__grid" }, O_ = { class: "modal-playground-window__field" }, k_ = { class: "modal-playground-window__field" }, A_ = { class: "modal-playground-window__checks" }, j_ = { class: "modal-playground-window__section" }, M_ = { class: "modal-playground-window__checks modal-playground-window__checks--three" }, N_ = { class: "modal-playground-window__section" }, P_ = { class: "modal-playground-window__grid" }, F_ = { class: "modal-playground-window__field" }, I_ = { class: "modal-playground-window__field" }, L_ = { class: "modal-playground-window__field" }, R_ = { class: "modal-playground-window__field" }, z_ = { class: "modal-playground-window__checks" }, B_ = { class: "modal-playground-window__section" }, V_ = { class: "modal-playground-window__checks" }, H_ = { class: "modal-playground-window__buttons" }, U_ = {
	class: "modal-playground-window__primary",
	"data-testid": "modal-playground-open",
	type: "submit"
}, W_ = { class: "modal-playground-window__preview" }, G_ = { class: "modal-playground-window__code-demo" }, K_ = { "data-testid": "modal-playground-code" }, q_ = { class: "modal-playground-window__usage" }, J_ = { class: "modal-playground-window__usage-actions" }, Y_ = { "data-testid": "modal-playground-usage-code" }, X_ = { class: "modal-playground-window__coverage" }, Z_ = { class: "modal-playground-window__events" }, Q_ = {
	class: "modal-playground-window__cover",
	"data-testid": "modal-playground-cover"
}, $_ = { class: "modal-playground-window__custom-header" }, ev = "Modal 组件测试", tv = "这里会实时使用左侧参数渲染 Modal，可用于检查主题、插槽、关闭行为和多弹窗栈。", nv = 520, rv = "info", iv = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "ModalPlaygroundWindow",
	emits: ["close"],
	setup(t, { emit: r }) {
		let i = r, a = Cc(), o = Cc({
			content: "用于检查多 Modal 层级、滚动锁和 ESC 只关闭顶层。",
			negativeText: "关闭",
			positiveText: "还原",
			preset: "dialog",
			title: "第二层 Modal",
			type: "warning"
		}), s = n("card"), c = n("if"), l = n("mouse"), u = n("info"), d = n("medium"), p = n("left"), m = n("section"), g = n("dialog"), _ = n(ev), v = n(tv), b = n(nv), x = n(!1), C = n(2600), w = n(!0), T = n(!0), E = n(!0), O = n(!0), k = n(!1), A = n(!0), N = n(!0), F = n(!0), V = n(!1), ee = n(!1), te = n(!1), re = n(!0), ie = n(!1), W = n("bounded"), ae = n(!1), oe = n(!1), ce = n(!1), J = n(!1), le = n(!0), Y = n(!0), ue = n(!1), de = n(!1), fe = n(!1), pe = n(!1), me = n(!1), he = n(!1), ge = n(!1), _e = n(!1), ve = n(!1), ye = n(!0), be = n(!1), xe = n(!1), Se = n(!1), Ce = n("确认"), we = n("取消"), Te = n("primary"), Ee = n("default"), De = n(!1), Oe = n(!1), ke = n(!1), Ae = n(!1), je = n(!1), Me = n(!1), Ne = n(!1), Pe = n(["等待打开 Modal"]), Fe = [
			[
				"show",
				"showMask",
				"maskClosable",
				"preset",
				"to",
				"displayDirective",
				"transformOrigin",
				"zIndex"
			],
			[
				"autoFocus",
				"trapFocus",
				"closeOnEsc",
				"blockScroll",
				"draggable"
			],
			[
				"type",
				"title",
				"content",
				"showIcon",
				"icon",
				"iconPlacement",
				"loading"
			],
			[
				"positiveText",
				"negativeText",
				"positiveButtonProps",
				"negativeButtonProps"
			],
			[
				"closable",
				"closeFocusable",
				"contentScrollable",
				"embedded",
				"segmented",
				"size",
				"hoverable",
				"role",
				"tag"
			],
			[
				"titleClass",
				"titleStyle",
				"contentClass",
				"contentStyle",
				"actionClass",
				"actionStyle"
			],
			[
				"headerClass",
				"headerStyle",
				"headerExtraClass",
				"headerExtraStyle",
				"footerClass",
				"footerStyle"
			],
			[
				"cover",
				"footer",
				"headerExtra",
				"action",
				"cover slot",
				"header slot",
				"icon slot",
				"title slot",
				"footer slot"
			],
			[
				"open()",
				"open(nextOptions)",
				"setOptions()",
				"reset()",
				"toggle()",
				"props"
			],
			[
				"update:show",
				"after-enter",
				"before-leave",
				"after-leave",
				"close",
				"esc",
				"mask-click",
				"positive-click",
				"negative-click"
			]
		], Ie = j(() => !ve.value && !ye.value && !be.value ? !1 : {
			action: be.value,
			content: ve.value,
			footer: ye.value
		}), Le = j(() => W.value === "disabled" ? !1 : W.value === "unbounded" ? { bounds: "none" } : !0), Re = j(() => Math.min(Math.max(b.value, 280), 920)), ze = j(() => x.value ? C.value : void 0), Be = j(() => xe.value ? "modal-playground-window__api" : void 0), Ve = j(() => Be.value ? `${Be.value}-title` : void 0), He = j(() => Be.value ? `${Be.value}-content` : void 0), Ue = j(() => Be.value ? `${Be.value}-action` : void 0), We = j(() => Be.value ? `${Be.value}-header` : void 0), Ge = j(() => Be.value ? `${Be.value}-header-extra` : void 0), Ke = j(() => Be.value ? `${Be.value}-footer` : void 0), qe = j(() => Se.value ? { color: "var(--ide-focus-border)" } : void 0), Je = j(() => Se.value ? { borderLeft: "2px solid var(--ide-focus-border)" } : void 0), Ye = j(() => Se.value ? { background: "var(--ide-sidebar-header-bg)" } : void 0), Xe = j(() => Se.value ? { opacity: "0.86" } : void 0), Ze = j(() => Se.value ? { background: "color-mix(in srgb, var(--ide-input-bg) 78%, transparent)" } : void 0), Qe = j(() => Se.value ? { gap: "10px" } : void 0), $e = j(() => de.value ? () => y("span", { class: "modal-playground-window__rendered-prop" }, `prop:title ${_.value}`) : _.value), et = j(() => fe.value ? () => y("div", { class: "modal-playground-window__rendered-prop" }, `prop:content ${v.value}`) : v.value), tt = j(() => {
			if (pe.value) return () => y(X, {
				name: "symbol-event",
				decorative: !0
			});
		}), nt = j(() => {
			if (me.value) return () => y("div", { class: "modal-playground-window__cover" }, "prop:cover");
		}), rt = j(() => {
			if (he.value) return () => y("button", {
				class: "modal-playground-window__ghost",
				type: "button"
			}, "prop:headerExtra");
		}), it = j(() => {
			if (ge.value) return () => y("span", `prop:footer ${s.value} / ${Re.value}px`);
		}), at = j(() => {
			if (_e.value) return () => y("button", {
				class: "modal-playground-window__modal-button",
				type: "button",
				onClick: _t
			}, "prop:action 关闭");
		}), ot = j(() => ({
			disabled: Oe.value,
			loading: Ae.value,
			type: Ee.value
		})), Z = j(() => ({
			disabled: De.value,
			loading: ke.value,
			type: Te.value
		})), st = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n"), ct = (e) => typeof e == "string" ? `'${st(e)}'` : typeof e == "number" || typeof e == "boolean" || !e || typeof e != "object" ? String(e) : `{ ${Object.entries(e).map(([e, t]) => `${e}: ${ct(t)}`).join(", ")} }`, lt = j(() => W.value === "disabled" ? !1 : W.value === "unbounded" ? { bounds: "none" } : !0), ut = j(() => !ve.value && !ye.value && !be.value ? !1 : {
			action: be.value,
			content: ve.value,
			footer: ye.value
		}), dt = j(() => [
			{
				key: "preset",
				value: s.value,
				comment: "预设"
			},
			{
				key: "type",
				value: u.value,
				comment: "类型"
			},
			{
				key: "size",
				value: d.value,
				comment: "尺寸"
			},
			{
				key: "title",
				value: _.value,
				comment: "标题"
			},
			{
				key: "content",
				value: v.value,
				comment: "内容"
			},
			{
				key: "width",
				value: Re.value,
				comment: "宽度"
			},
			{
				key: "displayDirective",
				value: c.value,
				comment: "渲染指令"
			},
			{
				key: "transformOrigin",
				value: l.value,
				comment: "动画原点"
			},
			{
				key: "to",
				value: "body",
				comment: "挂载目标"
			},
			{
				key: "zIndex",
				value: C.value,
				comment: "层级",
				enabled: x.value
			},
			{
				key: "showMask",
				value: w.value,
				comment: "显示遮罩"
			},
			{
				key: "maskClosable",
				value: T.value,
				comment: "遮罩可关闭"
			},
			{
				key: "closeOnEsc",
				value: E.value,
				comment: "ESC 关闭"
			},
			{
				key: "closable",
				value: O.value,
				comment: "显示关闭按钮"
			},
			{
				key: "autoFocus",
				value: A.value,
				comment: "自动聚焦"
			},
			{
				key: "trapFocus",
				value: N.value,
				comment: "焦点锁定"
			},
			{
				key: "blockScroll",
				value: F.value,
				comment: "锁定页面滚动"
			},
			{
				key: "draggable",
				value: lt.value,
				comment: "拖拽模式"
			},
			{
				key: "tag",
				value: m.value,
				comment: "标签"
			},
			{
				key: "role",
				value: g.value,
				comment: "无障碍角色"
			},
			{
				key: "showIcon",
				value: re.value,
				comment: "显示图标"
			},
			{
				key: "iconPlacement",
				value: p.value,
				comment: "图标位置"
			},
			{
				key: "loading",
				value: ie.value,
				comment: "加载状态"
			},
			{
				key: "hoverable",
				value: V.value,
				comment: "悬浮反馈"
			},
			{
				key: "embedded",
				value: ee.value,
				comment: "嵌入模式"
			},
			{
				key: "contentScrollable",
				value: te.value,
				comment: "内容滚动"
			},
			{
				key: "segmented",
				value: ut.value,
				comment: "分段区域"
			},
			{
				key: "positiveText",
				value: Ce.value,
				comment: "确认文案"
			},
			{
				key: "negativeText",
				value: we.value,
				comment: "取消文案"
			},
			{
				key: "positiveButtonProps",
				value: Z.value,
				comment: "确认按钮配置"
			},
			{
				key: "negativeButtonProps",
				value: ot.value,
				comment: "取消按钮配置"
			}
		]), ft = j(() => [
			"const modal = useModal({",
			...dt.value.filter((e) => e.enabled !== !1).map((e) => `\t${e.key}: ${ct(e.value)}, // ${e.comment}`),
			"})",
			"",
			"modal.open() // 打开弹窗"
		].join("\n")), pt = j(() => [
			"const modal = useModal({",
			"	type: 'info', // 初始类型",
			"	title: 'Modal 组件测试', // 初始标题",
			"})",
			"",
			"modal.open() // 使用现有参数打开",
			"",
			"modal.setOptions({",
			"	type: 'success', // 动态类型",
			"	title: '动态更新成功', // 动态标题",
			"	content: 'setOptions 可以在 Modal 打开后即时更新当前弹窗。', // 动态内容",
			"	width: 640, // 动态宽度",
			"})",
			"",
			"modal.open({",
			"	type: 'warning', // 临时覆盖",
			"	title: 'open(nextOptions) 临时配置', // 临时标题",
			"})",
			"",
			"modal.reset({ show: true }) // 重置并保持显示"
		].join("\n")), mt = (e) => {
			Pe.value = [`${(/* @__PURE__ */ new Date()).toLocaleTimeString()} ${e}`, ...Pe.value].slice(0, 12);
		}, ht = () => {
			a.open(Ot.value), mt("open");
		}, gt = () => {
			a.open(Ot.value), o.open(), mt("open:stacked");
		}, _t = () => {
			a.close(), mt("custom-action-close");
		}, vt = (e) => {
			typeof e.title == "string" && (_.value = e.title), typeof e.content == "string" && (v.value = e.content), e.type && (u.value = e.type), typeof e.width == "number" && (b.value = e.width), ie.value = !!e.loading, oe.value = !1, ce.value = !1, de.value = !1, fe.value = !1;
		}, yt = () => ({
			content: "setOptions 可以在 Modal 打开后即时更新当前弹窗。",
			loading: !1,
			showIcon: !0,
			title: "动态更新成功",
			type: "success",
			width: 640
		}), bt = () => ({
			content: "open(nextOptions) 会合并临时参数并立即显示，可用于命令式场景。",
			loading: !1,
			showIcon: !0,
			title: "open(nextOptions) 临时配置",
			type: "warning",
			width: 600
		}), xt = () => {
			let e = yt();
			vt(e), a.setOptions({
				...Ot.value,
				...e
			}), a.visible.value || a.open(), mt("setOptions:dynamic");
		}, St = () => {
			let e = bt();
			vt(e), a.open({
				...Ot.value,
				...e
			}), mt("open:nextOptions");
		}, Ct = () => {
			vt({
				content: tv,
				loading: !1,
				title: ev,
				type: rv,
				width: nv
			}), a.reset({
				...Ot.value,
				show: !0
			}), mt("reset:show");
		}, wt = () => {
			a.close(), o.close(), i("close");
		}, Tt = (e) => {
			if (mt(`prop:onClose:${e}`), e === "close-button" && je.value) return !1;
		}, Et = () => {
			if (mt("prop:onPositiveClick"), Me.value) return !1;
		}, Dt = () => {
			if (mt("prop:onNegativeClick"), Ne.value) return !1;
		}, Ot = j(() => ({
			action: _e.value && !ue.value ? at.value : void 0,
			actionClass: Ue.value,
			actionStyle: Qe.value,
			autoFocus: A.value,
			blockScroll: F.value,
			closable: O.value,
			closeFocusable: k.value,
			closeOnEsc: E.value,
			content: et.value,
			contentClass: He.value,
			contentScrollable: te.value,
			contentStyle: Je.value,
			cover: me.value && !ae.value ? nt.value : void 0,
			displayDirective: c.value,
			draggable: Le.value,
			embedded: ee.value,
			footer: ge.value && !Y.value ? it.value : void 0,
			footerClass: Ke.value,
			footerStyle: Ze.value,
			headerClass: We.value,
			headerExtra: he.value && !le.value ? rt.value : void 0,
			headerExtraClass: Ge.value,
			headerExtraStyle: Xe.value,
			headerStyle: Ye.value,
			hoverable: V.value,
			icon: pe.value && !J.value ? tt.value : void 0,
			iconPlacement: p.value,
			loading: ie.value,
			maskClosable: T.value,
			negativeButtonProps: ot.value,
			negativeText: ue.value || _e.value ? void 0 : we.value,
			onClose: Tt,
			onNegativeClick: Dt,
			onPositiveClick: Et,
			positiveButtonProps: Z.value,
			positiveText: ue.value || _e.value ? void 0 : Ce.value,
			preset: s.value,
			role: g.value,
			segmented: Ie.value,
			showIcon: re.value,
			showMask: w.value,
			size: d.value,
			tag: m.value,
			title: $e.value,
			titleClass: Ve.value,
			titleStyle: qe.value,
			to: "body",
			trapFocus: N.value,
			transformOrigin: l.value,
			type: u.value,
			width: Re.value,
			zIndex: ze.value
		}));
		return se(() => {
			a.setOptions(Ot.value);
		}), (t, n) => (f(), I("section", t_, [
			G("header", n_, [G("div", r_, [D(e(X), {
				name: "multiple-windows",
				decorative: ""
			}), n[68] ||= G("span", null, "Modal 组件实验台", -1)]), G("button", {
				class: "modal-playground-window__close",
				type: "button",
				"aria-label": "关闭 Modal 实验台",
				onClick: wt
			}, [D(e(X), {
				name: "chrome-close",
				size: 13,
				decorative: ""
			})])]),
			G("div", i_, [G("form", {
				class: "modal-playground-window__controls",
				onSubmit: P(ht, ["prevent"])
			}, [
				G("section", a_, [n[78] ||= G("h2", null, "基础配置", -1), G("div", o_, [
					G("label", s_, [n[70] ||= G("span", null, "预设（preset）", -1), H(G("select", {
						"onUpdate:modelValue": n[0] ||= (e) => s.value = e,
						"data-testid": "modal-playground-preset"
					}, [...n[69] ||= [
						G("option", { value: "card" }, "card", -1),
						G("option", { value: "dialog" }, "dialog", -1),
						G("option", { value: "confirm" }, "confirm", -1)
					]], 512), [[q, s.value]])]),
					G("label", c_, [n[72] ||= G("span", null, "渲染指令（displayDirective）", -1), H(G("select", { "onUpdate:modelValue": n[1] ||= (e) => c.value = e }, [...n[71] ||= [G("option", { value: "if" }, "if", -1), G("option", { value: "show" }, "show", -1)]], 512), [[q, c.value]])]),
					G("label", l_, [n[74] ||= G("span", null, "动画原点（transformOrigin）", -1), H(G("select", { "onUpdate:modelValue": n[2] ||= (e) => l.value = e }, [...n[73] ||= [G("option", { value: "mouse" }, "mouse", -1), G("option", { value: "center" }, "center", -1)]], 512), [[q, l.value]])]),
					n[77] ||= G("label", { class: "modal-playground-window__field" }, [G("span", null, "挂载目标（to）"), G("input", {
						value: "body",
						disabled: ""
					})], -1),
					G("label", u_, [n[75] ||= G("span", null, "层级（zIndex）", -1), H(G("input", {
						"onUpdate:modelValue": n[3] ||= (e) => C.value = e,
						type: "number",
						min: "2000",
						step: "10",
						disabled: !x.value
					}, null, 8, d_), [[
						B,
						C.value,
						void 0,
						{ number: !0 }
					]])]),
					G("label", f_, [H(G("input", {
						"onUpdate:modelValue": n[4] ||= (e) => x.value = e,
						type: "checkbox"
					}, null, 512), [[U, x.value]]), n[76] ||= G("span", null, "自定义层级（custom zIndex）", -1)])
				])]),
				G("section", p_, [
					n[88] ||= G("h2", null, "内容与视觉", -1),
					G("label", m_, [n[79] ||= G("span", null, "标题（title）", -1), H(G("input", {
						"onUpdate:modelValue": n[5] ||= (e) => _.value = e,
						"data-testid": "modal-playground-title"
					}, null, 512), [[B, _.value]])]),
					G("label", h_, [n[80] ||= G("span", null, "内容（content）", -1), H(G("textarea", {
						"onUpdate:modelValue": n[6] ||= (e) => v.value = e,
						"data-testid": "modal-playground-content",
						rows: "3"
					}, null, 512), [[B, v.value]])]),
					G("div", g_, [
						G("label", __, [n[82] ||= G("span", null, "类型（type）", -1), H(G("select", { "onUpdate:modelValue": n[7] ||= (e) => u.value = e }, [...n[81] ||= [R("<option value=\"default\" data-v-189a5a21>default</option><option value=\"info\" data-v-189a5a21>info</option><option value=\"success\" data-v-189a5a21>success</option><option value=\"warning\" data-v-189a5a21>warning</option><option value=\"error\" data-v-189a5a21>error</option>", 5)]], 512), [[q, u.value]])]),
						G("label", v_, [n[84] ||= G("span", null, "图标位置（iconPlacement）", -1), H(G("select", { "onUpdate:modelValue": n[8] ||= (e) => p.value = e }, [...n[83] ||= [G("option", { value: "left" }, "left", -1), G("option", { value: "top" }, "top", -1)]], 512), [[q, p.value]])]),
						G("label", y_, [n[86] ||= G("span", null, "尺寸（size）", -1), H(G("select", { "onUpdate:modelValue": n[9] ||= (e) => d.value = e }, [...n[85] ||= [
							G("option", { value: "small" }, "small", -1),
							G("option", { value: "medium" }, "medium", -1),
							G("option", { value: "large" }, "large", -1),
							G("option", { value: "huge" }, "huge", -1)
						]], 512), [[q, d.value]])]),
						G("label", b_, [n[87] ||= G("span", null, "宽度（width）", -1), H(G("input", {
							"onUpdate:modelValue": n[10] ||= (e) => b.value = e,
							"data-testid": "modal-playground-width",
							type: "number",
							min: "280",
							max: "920",
							step: "20"
						}, null, 512), [[
							B,
							b.value,
							void 0,
							{ number: !0 }
						]])])
					])
				]),
				G("section", x_, [n[97] ||= G("h2", null, "行为控制", -1), G("div", S_, [
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[11] ||= (e) => w.value = e,
						"data-testid": "modal-playground-show-mask",
						type: "checkbox"
					}, null, 512), [[U, w.value]]), n[89] ||= L("显示遮罩（showMask）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[12] ||= (e) => T.value = e,
						type: "checkbox"
					}, null, 512), [[U, T.value]]), n[90] ||= L("遮罩可关闭（maskClosable）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[13] ||= (e) => E.value = e,
						type: "checkbox"
					}, null, 512), [[U, E.value]]), n[91] ||= L("ESC 关闭（closeOnEsc）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[14] ||= (e) => O.value = e,
						type: "checkbox"
					}, null, 512), [[U, O.value]]), n[92] ||= L("显示关闭按钮（closable）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[15] ||= (e) => k.value = e,
						type: "checkbox"
					}, null, 512), [[U, k.value]]), n[93] ||= L("关闭按钮可聚焦（closeFocusable）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[16] ||= (e) => A.value = e,
						type: "checkbox"
					}, null, 512), [[U, A.value]]), n[94] ||= L("自动聚焦（autoFocus）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[17] ||= (e) => N.value = e,
						type: "checkbox"
					}, null, 512), [[U, N.value]]), n[95] ||= L("焦点锁定（trapFocus）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[18] ||= (e) => F.value = e,
						type: "checkbox"
					}, null, 512), [[U, F.value]]), n[96] ||= L("锁定滚动（blockScroll）", -1)])
				])]),
				G("section", C_, [n[101] ||= G("h2", null, "拖拽控制", -1), G("div", w_, [G("label", T_, [n[99] ||= G("span", null, "模式（draggable）", -1), H(G("select", {
					"onUpdate:modelValue": n[19] ||= (e) => W.value = e,
					"data-testid": "modal-playground-draggable"
				}, [...n[98] ||= [
					G("option", { value: "disabled" }, "禁用拖拽（false）", -1),
					G("option", { value: "bounded" }, "限制在视口内（true）", -1),
					G("option", { value: "unbounded" }, "不限制边界（bounds: none）", -1)
				]], 512), [[q, W.value]])]), n[100] ||= G("div", { class: "modal-playground-window__field modal-playground-window__hint" }, [G("span", null, "拖拽区域"), G("p", null, "按住 Modal 头部移动；交互控件会自动排除拖拽。")], -1)])]),
				G("section", E_, [
					n[112] ||= G("h2", null, "布局与外观", -1),
					G("div", D_, [G("label", O_, [n[103] ||= G("span", null, "标签（tag）", -1), H(G("select", { "onUpdate:modelValue": n[20] ||= (e) => m.value = e }, [...n[102] ||= [
						G("option", { value: "section" }, "section", -1),
						G("option", { value: "article" }, "article", -1),
						G("option", { value: "div" }, "div", -1)
					]], 512), [[q, m.value]])]), G("label", k_, [n[104] ||= G("span", null, "角色（role）", -1), H(G("input", { "onUpdate:modelValue": n[21] ||= (e) => g.value = e }, null, 512), [[B, g.value]])])]),
					G("div", A_, [
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[22] ||= (e) => V.value = e,
							type: "checkbox"
						}, null, 512), [[U, V.value]]), n[105] ||= L("悬浮反馈（hoverable）", -1)]),
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[23] ||= (e) => ee.value = e,
							type: "checkbox"
						}, null, 512), [[U, ee.value]]), n[106] ||= L("嵌入模式（embedded）", -1)]),
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[24] ||= (e) => te.value = e,
							type: "checkbox"
						}, null, 512), [[U, te.value]]), n[107] ||= L("内容滚动（contentScrollable）", -1)]),
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[25] ||= (e) => re.value = e,
							type: "checkbox"
						}, null, 512), [[U, re.value]]), n[108] ||= L("显示图标（showIcon）", -1)]),
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[26] ||= (e) => ie.value = e,
							type: "checkbox"
						}, null, 512), [[U, ie.value]]), n[109] ||= L("加载状态（loading）", -1)]),
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[27] ||= (e) => xe.value = e,
							type: "checkbox"
						}, null, 512), [[U, xe.value]]), n[110] ||= L("类名属性（class props）", -1)]),
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[28] ||= (e) => Se.value = e,
							type: "checkbox"
						}, null, 512), [[U, Se.value]]), n[111] ||= L("样式属性（style props）", -1)])
					])
				]),
				G("section", j_, [n[127] ||= G("h2", null, "渲染通道", -1), G("div", M_, [
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[29] ||= (e) => ae.value = e,
						"data-testid": "modal-playground-show-cover",
						type: "checkbox"
					}, null, 512), [[U, ae.value]]), n[113] ||= L("封面插槽（#cover）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[30] ||= (e) => oe.value = e,
						type: "checkbox"
					}, null, 512), [[U, oe.value]]), n[114] ||= L("头部插槽（#header）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[31] ||= (e) => ce.value = e,
						type: "checkbox"
					}, null, 512), [[U, ce.value]]), n[115] ||= L("标题插槽（#title）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[32] ||= (e) => J.value = e,
						type: "checkbox"
					}, null, 512), [[U, J.value]]), n[116] ||= L("图标插槽（#icon）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[33] ||= (e) => le.value = e,
						type: "checkbox"
					}, null, 512), [[U, le.value]]), n[117] ||= L("头部扩展（#header-extra）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[34] ||= (e) => Y.value = e,
						type: "checkbox"
					}, null, 512), [[U, Y.value]]), n[118] ||= L("页脚插槽（#footer）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[35] ||= (e) => ue.value = e,
						type: "checkbox"
					}, null, 512), [[U, ue.value]]), n[119] ||= L("操作插槽（#action）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[36] ||= (e) => de.value = e,
						type: "checkbox"
					}, null, 512), [[U, de.value]]), n[120] ||= L("标题函数（prop:title）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[37] ||= (e) => fe.value = e,
						type: "checkbox"
					}, null, 512), [[U, fe.value]]), n[121] ||= L("内容函数（prop:content）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[38] ||= (e) => pe.value = e,
						type: "checkbox"
					}, null, 512), [[U, pe.value]]), n[122] ||= L("图标函数（prop:icon）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[39] ||= (e) => me.value = e,
						type: "checkbox"
					}, null, 512), [[U, me.value]]), n[123] ||= L("封面函数（prop:cover）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[40] ||= (e) => he.value = e,
						type: "checkbox"
					}, null, 512), [[U, he.value]]), n[124] ||= L("头部扩展函数（prop:headerExtra）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[41] ||= (e) => ge.value = e,
						type: "checkbox"
					}, null, 512), [[U, ge.value]]), n[125] ||= L("页脚函数（prop:footer）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[42] ||= (e) => _e.value = e,
						type: "checkbox"
					}, null, 512), [[U, _e.value]]), n[126] ||= L("操作函数（prop:action）", -1)])
				])]),
				G("section", N_, [
					n[141] ||= G("h2", null, "按钮与回调", -1),
					G("div", P_, [
						G("label", F_, [n[128] ||= G("span", null, "确认文案（positiveText）", -1), H(G("input", { "onUpdate:modelValue": n[43] ||= (e) => Ce.value = e }, null, 512), [[B, Ce.value]])]),
						G("label", I_, [n[129] ||= G("span", null, "取消文案（negativeText）", -1), H(G("input", { "onUpdate:modelValue": n[44] ||= (e) => we.value = e }, null, 512), [[B, we.value]])]),
						G("label", L_, [n[131] ||= G("span", null, "确认按钮类型（positiveButtonProps.type）", -1), H(G("select", { "onUpdate:modelValue": n[45] ||= (e) => Te.value = e }, [...n[130] ||= [R("<option value=\"primary\" data-v-189a5a21>primary</option><option value=\"default\" data-v-189a5a21>default</option><option value=\"info\" data-v-189a5a21>info</option><option value=\"success\" data-v-189a5a21>success</option><option value=\"warning\" data-v-189a5a21>warning</option><option value=\"error\" data-v-189a5a21>error</option>", 6)]], 512), [[q, Te.value]])]),
						G("label", R_, [n[133] ||= G("span", null, "取消按钮类型（negativeButtonProps.type）", -1), H(G("select", { "onUpdate:modelValue": n[46] ||= (e) => Ee.value = e }, [...n[132] ||= [R("<option value=\"default\" data-v-189a5a21>default</option><option value=\"primary\" data-v-189a5a21>primary</option><option value=\"info\" data-v-189a5a21>info</option><option value=\"success\" data-v-189a5a21>success</option><option value=\"warning\" data-v-189a5a21>warning</option><option value=\"error\" data-v-189a5a21>error</option>", 6)]], 512), [[q, Ee.value]])])
					]),
					G("div", z_, [
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[47] ||= (e) => De.value = e,
							type: "checkbox"
						}, null, 512), [[U, De.value]]), n[134] ||= L("确认禁用（positive disabled）", -1)]),
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[48] ||= (e) => Oe.value = e,
							type: "checkbox"
						}, null, 512), [[U, Oe.value]]), n[135] ||= L("取消禁用（negative disabled）", -1)]),
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[49] ||= (e) => ke.value = e,
							type: "checkbox"
						}, null, 512), [[U, ke.value]]), n[136] ||= L("确认加载（positive loading）", -1)]),
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[50] ||= (e) => Ae.value = e,
							type: "checkbox"
						}, null, 512), [[U, Ae.value]]), n[137] ||= L("取消加载（negative loading）", -1)]),
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[51] ||= (e) => je.value = e,
							type: "checkbox"
						}, null, 512), [[U, je.value]]), n[138] ||= L("关闭拦截（onClose false）", -1)]),
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[52] ||= (e) => Me.value = e,
							type: "checkbox"
						}, null, 512), [[U, Me.value]]), n[139] ||= L("确认拦截（onPositive false）", -1)]),
						G("label", null, [H(G("input", {
							"onUpdate:modelValue": n[53] ||= (e) => Ne.value = e,
							type: "checkbox"
						}, null, 512), [[U, Ne.value]]), n[140] ||= L("取消拦截（onNegative false）", -1)])
					])
				]),
				G("section", B_, [n[145] ||= G("h2", null, "分段区域", -1), G("div", V_, [
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[54] ||= (e) => ve.value = e,
						type: "checkbox"
					}, null, 512), [[U, ve.value]]), n[142] ||= L("内容分段（content）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[55] ||= (e) => ye.value = e,
						type: "checkbox"
					}, null, 512), [[U, ye.value]]), n[143] ||= L("页脚分段（footer）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[56] ||= (e) => be.value = e,
						type: "checkbox"
					}, null, 512), [[U, be.value]]), n[144] ||= L("操作分段（action）", -1)])
				])]),
				n[148] ||= R("<section class=\"modal-playground-window__section\" data-v-189a5a21><h2 data-v-189a5a21>useModal 控制器</h2><div class=\"modal-playground-window__checks\" data-v-189a5a21><label data-v-189a5a21><input checked type=\"checkbox\" disabled data-v-189a5a21>属性绑定（props）</label><label data-v-189a5a21><input checked type=\"checkbox\" disabled data-v-189a5a21>打开关闭（open / close）</label><label data-v-189a5a21><input checked type=\"checkbox\" disabled data-v-189a5a21>叠层状态（stacked）</label><label data-v-189a5a21><input checked type=\"checkbox\" disabled data-v-189a5a21>事件透传（events）</label></div></section>", 1),
				G("div", H_, [G("button", U_, [D(e(X), {
					name: "run",
					decorative: ""
				}), n[146] ||= G("span", null, "显示 Modal", -1)]), G("button", {
					class: "modal-playground-window__secondary",
					type: "button",
					onClick: gt
				}, [D(e(X), {
					name: "multiple-windows",
					decorative: ""
				}), n[147] ||= G("span", null, "打开两层", -1)])])
			], 32), G("aside", W_, [
				G("section", G_, [n[149] ||= G("h2", null, "代码演示", -1), G("pre", K_, [G("code", null, K(ft.value), 1)])]),
				G("section", q_, [
					n[153] ||= G("h2", null, "useModal 使用方式", -1),
					G("div", J_, [
						G("button", {
							class: "modal-playground-window__secondary",
							"data-testid": "modal-playground-dynamic-update",
							type: "button",
							onClick: xt
						}, [D(e(X), {
							name: "sync",
							decorative: ""
						}), n[150] ||= G("span", null, "setOptions 更新当前 Modal", -1)]),
						G("button", {
							class: "modal-playground-window__secondary",
							"data-testid": "modal-playground-open-runtime",
							type: "button",
							onClick: St
						}, [D(e(X), {
							name: "run",
							decorative: ""
						}), n[151] ||= G("span", null, "open(nextOptions) 临时打开", -1)]),
						G("button", {
							class: "modal-playground-window__secondary",
							"data-testid": "modal-playground-reset-dynamic",
							type: "button",
							onClick: Ct
						}, [D(e(X), {
							name: "discard",
							decorative: ""
						}), n[152] ||= G("span", null, "reset 重置并显示", -1)])
					]),
					G("pre", Y_, [G("code", null, K(pt.value), 1)])
				]),
				G("section", X_, [n[154] ||= G("h2", null, "覆盖面", -1), G("ul", null, [(f(), I(z, null, S(Fe, (e) => G("li", { key: e.join("-") }, [(f(!0), I(z, null, S(e, (e) => (f(), I("code", { key: e }, K(e), 1))), 128))])), 64))])]),
				G("section", Z_, [n[155] ||= G("h2", null, "事件日志", -1), G("ul", null, [(f(!0), I(z, null, S(Pe.value, (e) => (f(), I("li", { key: e }, K(e), 1))), 128))])])
			])]),
			D(e(pc), h(e(a).props, {
				onAfterEnter: n[59] ||= (e) => mt("after-enter"),
				onAfterLeave: n[60] ||= (e) => mt("after-leave"),
				onBeforeLeave: n[61] ||= (e) => mt("before-leave"),
				onEsc: n[62] ||= (e) => mt("esc"),
				onMaskClick: n[63] ||= (e) => mt("mask-click"),
				"onUpdate:show": n[64] ||= (t) => {
					e(a).visible.value = t, mt(`update:show:${t}`);
				}
			}), ne({
				default: M(() => [
					G("p", null, K(v.value), 1),
					n[157] ||= G("p", { class: "modal-playground-window__muted" }, "当前弹窗使用 VS Code 主题变量渲染，可在暗色和亮色主题下检查一致性。", -1),
					n[158] ||= G("input", {
						class: "modal-playground-window__input",
						value: "focus target"
					}, null, -1),
					G("div", { class: "modal-playground-window__inline-actions" }, [
						G("button", {
							class: "modal-playground-window__modal-button modal-playground-window__modal-button--primary",
							"data-testid": "modal-playground-inline-dynamic-update",
							type: "button",
							onClick: xt
						}, "setOptions 更新"),
						G("button", {
							class: "modal-playground-window__modal-button",
							"data-testid": "modal-playground-inline-open-runtime",
							type: "button",
							onClick: St
						}, "open(nextOptions)"),
						G("button", {
							class: "modal-playground-window__modal-button",
							"data-testid": "modal-playground-inline-reset-dynamic",
							type: "button",
							onClick: Ct
						}, "reset 重置")
					])
				]),
				_: 2
			}, [
				ae.value ? {
					name: "cover",
					fn: M(() => [G("div", Q_, [D(e(X), {
						name: "symbol-color",
						decorative: ""
					}), n[156] ||= G("span", null, "Cover Slot", -1)])]),
					key: "0"
				} : void 0,
				oe.value ? {
					name: "header",
					fn: M(() => [G("div", $_, [D(e(X), {
						name: "window",
						decorative: ""
					}), G("span", null, "Header Slot: " + K(_.value), 1)])]),
					key: "1"
				} : void 0,
				J.value ? {
					name: "icon",
					fn: M(() => [D(e(X), {
						name: "symbol-interface",
						decorative: ""
					})]),
					key: "2"
				} : void 0,
				ce.value ? {
					name: "title",
					fn: M(() => [G("span", null, "Title Slot: " + K(_.value), 1)]),
					key: "3"
				} : void 0,
				le.value ? {
					name: "header-extra",
					fn: M(() => [G("button", {
						class: "modal-playground-window__ghost",
						type: "button",
						onClick: n[57] ||= (e) => mt("header-extra-click")
					}, "header-extra")]),
					key: "4"
				} : void 0,
				Y.value ? {
					name: "footer",
					fn: M(() => [G("span", null, "Footer Slot: " + K(s.value) + " / " + K(Re.value) + "px", 1)]),
					key: "5"
				} : void 0,
				ue.value ? {
					name: "action",
					fn: M(() => [G("button", {
						class: "modal-playground-window__modal-button",
						type: "button",
						onClick: _t
					}, "slot:action 关闭"), G("button", {
						class: "modal-playground-window__modal-button modal-playground-window__modal-button--primary",
						type: "button",
						onClick: n[58] ||= (e) => mt("slot-action-confirm")
					}, "slot:action 确认")]),
					key: "6"
				} : void 0
			]), 1040),
			D(e(pc), h(e(o).props, {
				onClose: n[65] ||= (e) => mt(`stacked:close:${e}`),
				onEsc: n[66] ||= (e) => mt("stacked:esc"),
				"onUpdate:show": n[67] ||= (t) => {
					e(o).visible.value = t, mt(`stacked:update:show:${t}`);
				}
			}), null, 16)
		]));
	}
}), [["__scopeId", "data-v-189a5a21"]]), av = {
	class: "tooltip-playground-window",
	"data-testid": "tooltip-playground-window",
	"aria-label": "Tooltip 组件实验台"
}, ov = { class: "tooltip-playground-window__titlebar" }, sv = { class: "tooltip-playground-window__title" }, cv = { class: "tooltip-playground-window__body" }, lv = { class: "tooltip-playground-window__section" }, uv = { class: "tooltip-playground-window__field" }, dv = { class: "tooltip-playground-window__grid" }, fv = { class: "tooltip-playground-window__field" }, pv = { class: "tooltip-playground-window__field" }, mv = { class: "tooltip-playground-window__checks" }, hv = { class: "tooltip-playground-window__section" }, gv = { class: "tooltip-playground-window__field" }, _v = { class: "tooltip-playground-window__section" }, vv = { class: "tooltip-playground-window__grid" }, yv = { class: "tooltip-playground-window__field" }, bv = { class: "tooltip-playground-window__field" }, xv = { class: "tooltip-playground-window__field" }, Sv = { class: "tooltip-playground-window__field" }, Cv = ["value"], wv = { class: "tooltip-playground-window__checks" }, Tv = { class: "tooltip-playground-window__section" }, Ev = { class: "tooltip-playground-window__checks" }, Dv = { class: "tooltip-playground-window__buttons" }, Ov = { class: "tooltip-playground-window__preview" }, kv = { class: "tooltip-playground-window__demo" }, Av = {
	class: "tooltip-playground-window__preview-button",
	"data-testid": "tooltip-playground-preview-trigger",
	type: "button"
}, jv = { class: "tooltip-playground-window__code" }, Mv = { "data-testid": "tooltip-playground-code" }, Nv = { class: "tooltip-playground-window__events" }, Pv = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "TooltipPlaygroundWindow",
	emits: ["close"],
	setup(t, { emit: r }) {
		let i = r, a = n("hover"), o = n("top"), s = n("保存当前文件"), c = n(0), l = n(120), u = n(!0), d = n(!1), p = n(!0), m = n(!1), h = n(220), g = n(100200), _ = n(!1), v = n(!1), y = n(!1), b = n(!1), x = n(!1), C = n(null), w = n(["等待触发 Tooltip"]), T = j(() => y.value ? C.value ?? "body" : "body"), E = j(() => b.value ? "tooltip-playground-window__custom-tooltip" : void 0), O = j(() => x.value ? { borderColor: "var(--ide-focus-border)" } : void 0), k = j(() => _.value ? v.value : void 0), A = j(() => Math.max(c.value, 0)), N = j(() => Math.max(l.value, 0)), F = j(() => Math.max(h.value, 120)), V = j(() => Math.max(g.value, 1)), ee = j(() => a.value === "hover" ? "悬停查看" : a.value === "focus" ? "聚焦查看" : a.value === "click" ? "点击查看" : "手动控制"), te = j(() => [
			`\ttrigger: '${a.value}', // 触发方式`,
			`\tplacement: '${o.value}', // 位置`,
			`\tdelay: ${A.value}, // 显示延迟`,
			`\tduration: ${N.value}, // 动画时长`,
			`\tshowArrow: ${u.value}, // 显示箭头`,
			`\tdisabled: ${d.value}, // 禁用`,
			`\tto: ${y.value ? "mountTarget.value ?? 'body'" : "'body'"}, // 挂载目标`,
			`\tzIndex: ${V.value}, // 层级`,
			`\tanimated: ${p.value}, // 过渡动画`,
			`\traw: ${m.value}, // 原始内容`,
			`\twidth: ${F.value}, // 宽度`,
			..._.value ? ["	show: show.value, // 受控显示"] : [],
			...b.value ? ["	contentClass: 'tooltip-playground-window__custom-tooltip', // 内容类名"] : [],
			...x.value ? ["	contentStyle: { borderColor: 'var(--ide-focus-border)' }, // 内容样式"] : []
		]), ne = j(() => {
			let e = _.value || y.value ? "import { computed, ref } from 'vue'" : "import { computed } from 'vue'", t = [..._.value ? ["const show = ref(false) // 受控显示"] : [], ...y.value ? ["const mountTarget = ref<HTMLElement | null>(null) // 挂载目标"] : []], n = y.value ? ["	<div ref=\"mountTarget\">"] : [], r = y.value ? ["	</div>"] : [], i = y.value ? "		" : "	", a = `${i}\t`, o = _.value ? " @update:show=\"show = $event\"" : "", c = s.value.split("\n").map((e) => `${a}${e}`);
			return [
				"<script setup lang=\"ts\">",
				e,
				...t,
				"",
				"const tooltipProps = computed(() => ({",
				...te.value,
				"}))",
				"<\/script>",
				"",
				"<template>",
				...n,
				`${i}<Tooltip v-bind="tooltipProps"${o}>`,
				`${a}<template #trigger>`,
				`${a}\t<button>${ee.value}</button>`,
				`${a}</template>`,
				...c,
				`${i}</Tooltip>`,
				...r,
				"</template>"
			].join("\n");
		}), re = (e) => {
			w.value = [`${(/* @__PURE__ */ new Date()).toLocaleTimeString()} ${e}`, ...w.value].slice(0, 12);
		}, ie = (e) => {
			v.value = e, re(`update:show:${e}`);
		}, W = () => {
			v.value = !v.value, re(`manual:${v.value}`);
		};
		return (t, n) => (f(), I("section", av, [G("header", ov, [G("div", sv, [D(e(X), {
			name: "symbol-method",
			decorative: ""
		}), n[17] ||= G("span", null, "Tooltip 组件实验台", -1)]), G("button", {
			class: "tooltip-playground-window__close",
			type: "button",
			"aria-label": "关闭 Tooltip 实验台",
			onClick: n[0] ||= (e) => i("close")
		}, [D(e(X), {
			name: "chrome-close",
			size: 13,
			decorative: ""
		})])]), G("div", cv, [G("form", {
			class: "tooltip-playground-window__controls",
			onSubmit: n[16] ||= P(() => {}, ["prevent"])
		}, [
			G("section", lv, [
				n[25] ||= G("h2", null, "基础配置", -1),
				G("label", uv, [n[18] ||= G("span", null, "内容（content）", -1), H(G("textarea", {
					"onUpdate:modelValue": n[1] ||= (e) => s.value = e,
					"data-testid": "tooltip-playground-content",
					rows: "3"
				}, null, 512), [[B, s.value]])]),
				G("div", dv, [G("label", fv, [n[20] ||= G("span", null, "触发方式（trigger）", -1), H(G("select", {
					"onUpdate:modelValue": n[2] ||= (e) => a.value = e,
					"data-testid": "tooltip-playground-trigger"
				}, [...n[19] ||= [
					G("option", { value: "hover" }, "hover", -1),
					G("option", { value: "focus" }, "focus", -1),
					G("option", { value: "click" }, "click", -1),
					G("option", { value: "manual" }, "manual", -1)
				]], 512), [[q, a.value]])]), G("label", pv, [n[21] ||= G("span", null, "显示延迟（delay）", -1), H(G("input", {
					"onUpdate:modelValue": n[3] ||= (e) => c.value = e,
					type: "number",
					min: "0",
					step: "100"
				}, null, 512), [[
					B,
					c.value,
					void 0,
					{ number: !0 }
				]])])]),
				G("div", mv, [
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[4] ||= (e) => u.value = e,
						type: "checkbox"
					}, null, 512), [[U, u.value]]), n[22] ||= L("显示箭头（showArrow）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[5] ||= (e) => d.value = e,
						type: "checkbox"
					}, null, 512), [[U, d.value]]), n[23] ||= L("禁用（disabled）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[6] ||= (e) => p.value = e,
						type: "checkbox"
					}, null, 512), [[U, p.value]]), n[24] ||= L("过渡动画（animated）", -1)])
				])
			]),
			G("section", hv, [n[28] ||= G("h2", null, "显示位置", -1), G("label", gv, [n[27] ||= G("span", null, "位置（placement）", -1), H(G("select", {
				"onUpdate:modelValue": n[7] ||= (e) => o.value = e,
				"data-testid": "tooltip-playground-placement"
			}, [...n[26] ||= [R("<option value=\"top\" data-v-ad7c596b>top</option><option value=\"top-start\" data-v-ad7c596b>top-start</option><option value=\"top-end\" data-v-ad7c596b>top-end</option><option value=\"bottom\" data-v-ad7c596b>bottom</option><option value=\"bottom-start\" data-v-ad7c596b>bottom-start</option><option value=\"bottom-end\" data-v-ad7c596b>bottom-end</option><option value=\"left\" data-v-ad7c596b>left</option><option value=\"left-start\" data-v-ad7c596b>left-start</option><option value=\"left-end\" data-v-ad7c596b>left-end</option><option value=\"right\" data-v-ad7c596b>right</option><option value=\"right-start\" data-v-ad7c596b>right-start</option><option value=\"right-end\" data-v-ad7c596b>right-end</option>", 12)]], 512), [[q, o.value]])])]),
			G("section", _v, [
				n[37] ||= G("h2", null, "挂载与样式", -1),
				G("div", vv, [
					G("label", yv, [n[29] ||= G("span", null, "动画时长（duration）", -1), H(G("input", {
						"onUpdate:modelValue": n[8] ||= (e) => l.value = e,
						type: "number",
						min: "0",
						step: "40"
					}, null, 512), [[
						B,
						l.value,
						void 0,
						{ number: !0 }
					]])]),
					G("label", bv, [n[30] ||= G("span", null, "层级（zIndex）", -1), H(G("input", {
						"onUpdate:modelValue": n[9] ||= (e) => g.value = e,
						type: "number",
						min: "1",
						step: "1"
					}, null, 512), [[
						B,
						g.value,
						void 0,
						{ number: !0 }
					]])]),
					G("label", xv, [n[31] ||= G("span", null, "宽度（width）", -1), H(G("input", {
						"onUpdate:modelValue": n[10] ||= (e) => h.value = e,
						type: "number",
						min: "120",
						step: "20"
					}, null, 512), [[
						B,
						h.value,
						void 0,
						{ number: !0 }
					]])]),
					G("label", Sv, [n[32] ||= G("span", null, "挂载目标（to）", -1), G("input", {
						value: y.value ? "实验台局部容器" : "body",
						disabled: ""
					}, null, 8, Cv)])
				]),
				G("div", wv, [
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[11] ||= (e) => y.value = e,
						type: "checkbox"
					}, null, 512), [[U, y.value]]), n[33] ||= L("局部挂载（to）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[12] ||= (e) => m.value = e,
						type: "checkbox"
					}, null, 512), [[U, m.value]]), n[34] ||= L("原始内容（raw）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[13] ||= (e) => b.value = e,
						type: "checkbox"
					}, null, 512), [[U, b.value]]), n[35] ||= L("内容类名（contentClass）", -1)]),
					G("label", null, [H(G("input", {
						"onUpdate:modelValue": n[14] ||= (e) => x.value = e,
						type: "checkbox"
					}, null, 512), [[U, x.value]]), n[36] ||= L("内容样式（contentStyle）", -1)])
				])
			]),
			G("section", Tv, [
				n[39] ||= G("h2", null, "受控模式", -1),
				G("div", Ev, [G("label", null, [H(G("input", {
					"onUpdate:modelValue": n[15] ||= (e) => _.value = e,
					type: "checkbox"
				}, null, 512), [[U, _.value]]), n[38] ||= L("受控显示（show）", -1)])]),
				G("div", Dv, [G("button", {
					class: "tooltip-playground-window__secondary",
					type: "button",
					onClick: W
				}, [D(e(X), {
					name: "eye",
					decorative: ""
				}), G("span", null, K(v.value ? "隐藏" : "显示"), 1)])])
			])
		], 32), G("aside", Ov, [
			G("section", kv, [n[40] ||= G("h2", null, "交互测试", -1), G("div", {
				ref_key: "localMountRef",
				ref: C,
				class: "tooltip-playground-window__mount",
				"data-testid": "tooltip-playground-local-mount"
			}, [D(e(_c), {
				animated: p.value,
				"content-class": E.value,
				"content-style": O.value,
				delay: A.value,
				disabled: d.value,
				duration: N.value,
				placement: o.value,
				raw: m.value,
				show: k.value,
				"show-arrow": u.value,
				to: T.value,
				trigger: a.value,
				width: F.value,
				"z-index": V.value,
				"onUpdate:show": ie
			}, {
				trigger: M(() => [G("button", Av, K(ee.value), 1)]),
				default: M(() => [L(" " + K(s.value), 1)]),
				_: 1
			}, 8, [
				"animated",
				"content-class",
				"content-style",
				"delay",
				"disabled",
				"duration",
				"placement",
				"raw",
				"show",
				"show-arrow",
				"to",
				"trigger",
				"width",
				"z-index"
			])], 512)]),
			G("section", jv, [n[41] ||= G("h2", null, "Tooltip 代码演示", -1), G("pre", Mv, [G("code", null, K(ne.value), 1)])]),
			n[43] ||= R("<section class=\"tooltip-playground-window__coverage\" data-v-ad7c596b><h2 data-v-ad7c596b>覆盖面</h2><ul data-v-ad7c596b><li data-v-ad7c596b><code data-v-ad7c596b>trigger</code><code data-v-ad7c596b>placement</code><code data-v-ad7c596b>show</code><code data-v-ad7c596b>defaultShow</code><code data-v-ad7c596b>delay</code><code data-v-ad7c596b>duration</code></li><li data-v-ad7c596b><code data-v-ad7c596b>showArrow</code><code data-v-ad7c596b>disabled</code><code data-v-ad7c596b>getDisabled</code><code data-v-ad7c596b>to</code><code data-v-ad7c596b>zIndex</code><code data-v-ad7c596b>animated</code></li><li data-v-ad7c596b><code data-v-ad7c596b>raw</code><code data-v-ad7c596b>width</code><code data-v-ad7c596b>contentClass</code><code data-v-ad7c596b>contentStyle</code><code data-v-ad7c596b>syncPosition</code></li></ul></section>", 1),
			G("section", Nv, [n[42] ||= G("h2", null, "事件日志", -1), G("ul", null, [(f(!0), I(z, null, S(w.value, (e) => (f(), I("li", { key: e }, K(e), 1))), 128))])])
		])])]));
	}
}), [["__scopeId", "data-v-ad7c596b"]]), Fv = {
	class: "virtual-desktop",
	"data-testid": "virtual-desktop",
	"aria-label": "虚拟桌面"
}, Iv = {
	class: "virtual-desktop__icons",
	"aria-label": "桌面应用"
}, Lv = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "VirtualDesktop",
	setup(e) {
		let r = fg(), i = Xt(), a = n(!1), o = n(!1), s = n(!1), l = n(!1), u = j(() => a.value && r.mode !== "closed"), d = j(() => u.value && r.mode !== "minimized"), p = j(() => a.value && r.mode === "minimized"), m = j(() => i.tabs.find((e) => e.id === i.activeTabId)?.title ?? "Linux Panel IDE"), h = () => {
			r.open(), a.value = !0;
		}, g = () => {
			r.restore();
		}, _ = () => {
			r.close();
		}, v = () => {
			s.value = !0;
		}, y = () => {
			s.value = !1;
		}, b = () => {
			o.value = !0;
		}, x = () => {
			o.value = !1;
		}, S = () => {
			l.value = !0;
		}, C = () => {
			l.value = !1;
		};
		return (e, n) => (f(), I("section", Fv, [
			G("div", Iv, [
				D(bg, { onOpen: h }),
				D(bg, {
					"aria-label": "打开 Modal 实验台",
					label: "Modal",
					"open-on-click": "",
					"test-id": "desktop-app-modal-playground",
					variant: "modal",
					onOpen: v
				}),
				D(bg, {
					"aria-label": "打开 Message 实验台",
					label: "Message",
					"open-on-click": "",
					"test-id": "desktop-app-message-playground",
					variant: "message",
					onOpen: b
				}),
				D(bg, {
					"aria-label": "打开 Tooltip 实验台",
					label: "Tooltip",
					"open-on-click": "",
					"test-id": "desktop-app-tooltip-playground",
					variant: "tooltip",
					onOpen: S
				})
			]),
			u.value ? (f(), I("div", {
				key: 0,
				class: t(["virtual-desktop__editor-host", { "virtual-desktop__editor-host--hidden": !d.value }]),
				"data-testid": "virtual-desktop-editor-host"
			}, [c(e.$slots, "editor", {}, void 0, !0)], 2)) : N("", !0),
			s.value ? (f(), J(iv, {
				key: 1,
				onClose: y
			})) : N("", !0),
			o.value ? (f(), J(qg, {
				key: 2,
				onClose: x
			})) : N("", !0),
			l.value ? (f(), J(Pv, {
				key: 3,
				onClose: C
			})) : N("", !0),
			p.value ? (f(), J(e_, {
				key: 4,
				title: m.value,
				onRestore: g,
				onClose: _
			}, null, 8, ["title"])) : N("", !0)
		]));
	}
}), [["__scopeId", "data-v-de7e5af7"]]), Rv = {
	class: "activity-bar",
	"data-testid": "activitybar",
	"aria-label": "活动栏"
}, zv = { class: "activity-bar__primary" }, Bv = { class: "activity-bar__secondary" }, Vv = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "ActivityBar",
	setup(e) {
		let n = Jt(), r = j(() => n.activeActivity === "explorer" && n.sidebar.visible), i = j(() => n.activeActivity === "search"), a = async (e) => {
			await Ep.execute(e);
		}, o = async () => {
			if (n.activeActivity === "explorer") {
				await a("workbench.action.toggleSidebarVisibility");
				return;
			}
			await a("workbench.action.openExplorer");
		};
		return (e, n) => (f(), I("aside", Rv, [G("div", zv, [G("button", {
			class: t(["activity-bar__item", { "activity-bar__item--active": r.value }]),
			type: "button",
			"aria-label": "资源管理器",
			title: "资源管理器",
			onClick: o
		}, [D(X, {
			class: "activity-bar__icon",
			name: "files",
			decorative: ""
		})], 2), G("button", {
			class: t(["activity-bar__item", { "activity-bar__item--active": i.value }]),
			type: "button",
			"aria-label": "搜索",
			title: "搜索",
			onClick: n[0] ||= (e) => a("workbench.action.openSearch")
		}, [D(X, {
			class: "activity-bar__icon",
			name: "search",
			decorative: ""
		})], 2)]), G("div", Bv, [G("button", {
			class: "activity-bar__item",
			type: "button",
			"aria-label": "设置",
			title: "设置",
			onClick: n[1] ||= (e) => a("workbench.action.openSettings")
		}, [D(X, {
			class: "activity-bar__icon",
			name: "settings-gear",
			decorative: ""
		})])])]));
	}
}), [["__scopeId", "data-v-8873f1e1"]]), Hv = (e, t = 180) => {
	let n = null, r = () => {
		n !== null && (globalThis.clearTimeout(n), n = null);
	};
	return {
		cancel: r,
		flush: () => {
			r(), e();
		},
		schedule: () => {
			r(), n = globalThis.setTimeout(() => {
				n = null, e();
			}, t);
		}
	};
}, Uv = {
	class: "diff-editor-view",
	"data-testid": "diff-editor"
}, Wv = {
	key: 0,
	class: "diff-editor-view__loading"
}, Gv = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "DiffEditorView",
	props: { tab: {} },
	setup(e) {
		let t = e, r = d(null), i = n(!0), a = jr(), s = null, c = 0, l = j(() => vi(a.values)), u = (e) => {
			if (!e) return "";
			let t = Yp.readContent(e);
			if (t !== void 0) return t;
			let n = Ia.readFile(e);
			return n.ok ? n.content : "";
		}, p = (e) => e ? Lt(e) : "plaintext", m = (e) => ({
			original: {
				path: `${e.originalPath ?? e.path}?original`,
				content: u(e.originalPath),
				language: p(e.originalPath)
			},
			modified: {
				path: e.modifiedPath ?? e.path,
				content: u(e.modifiedPath),
				language: p(e.modifiedPath)
			},
			...l.value
		}), h = () => {
			!s || c || (c = window.requestAnimationFrame(() => {
				c = 0, s && _o.layoutEditor(s);
			}));
		}, _ = Hv(h), v = lt(h, 120, !0, !0), y = async (e) => {
			let t = r.value;
			if (!t) return;
			let n = m(e);
			s ? await _o.setDiffEditorModel(s, n) : (i.value = !0, s = await _o.createDiffEditor(t, n), i.value = !1), await ee(), h();
		};
		return o(() => {
			y(t.tab);
		}), W(() => t.tab.id, () => {
			y(t.tab);
		}), W(l, (e) => {
			s?.updateOptions(yi(e));
		}), ct(r, _.schedule), st(window, $h, v), st(window, eg, _.flush), g(() => {
			_.cancel(), c && window.cancelAnimationFrame(c), r.value && _o.disposeEditor(r.value);
		}), (e, t) => (f(), I("section", Uv, [G("div", {
			ref_key: "containerRef",
			ref: r,
			class: "diff-editor-view__surface"
		}, null, 512), i.value ? (f(), I("div", Wv, "正在加载 Diff...")) : N("", !0)]));
	}
}), [["__scopeId", "data-v-e52e387c"]]), Kv = /* @__PURE__ */ Y({
	__name: "DiffEditorPane",
	props: { tab: {} },
	setup(e) {
		return (t, n) => (f(), J(Gv, { tab: e.tab }, null, 8, ["tab"]));
	}
}), qv = ["innerHTML"], Jv = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "MarkdownPreview",
	props: { content: {} },
	setup(e) {
		let t = e, n = j(() => Ce.parse(t.content, { async: !1 }));
		return (e, t) => (f(), I("article", {
			class: "markdown-preview",
			"data-testid": "markdown-preview",
			innerHTML: n.value
		}, null, 8, qv));
	}
}), [["__scopeId", "data-v-3c34c105"]]), Yv = { class: "monaco-editor-host" }, Xv = {
	key: 0,
	class: "monaco-editor-host__loading"
}, Zv = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "MonacoEditor",
	props: { tab: {} },
	setup(e) {
		let t = e, r = d(null), i = n(!0), a = Xt(), s = jr(), c = null, l = null, u = null, p = null, m = 0, h = !1, _ = !1, v = null, y = /* @__PURE__ */ new Map(), b = j(() => vi(s.values)), x = (e) => {
			if (e.kind === "settings-json") return Oi.stringifySettings();
			let t = Ia.readFile(e.path);
			return t.ok ? t.content : "";
		}, S = () => {
			!c || m || (m = window.requestAnimationFrame(() => {
				m = 0, c && _o.layoutEditor(c);
			}));
		}, C = Hv(S), w = lt(S, 120, !0, !0), T = () => {
			let e = c?.getPosition();
			return e ? {
				lineNumber: e.lineNumber,
				column: e.column
			} : a.cursorPosition;
		}, E = () => {
			if (!c) {
				a.clearActiveEditorStatus();
				return;
			}
			a.setActiveEditorStatus(_o.getEditorStatus(c, {
				cursor: T(),
				encoding: t.tab.fileMeta?.encoding,
				language: t.tab.language
			}));
		}, D = () => {
			u?.dispose(), u = null, c && (u = _o.onDidChangeModelContent(c, () => {
				if (h) {
					h = !1;
					return;
				}
				let e = a.tabs.find((e) => e.id === t.tab.id);
				e && !e.dirty && a.setTabDirty(e.id, !0), E();
			}));
		}, O = lt((e) => {
			a.setCursorPosition({
				lineNumber: e.lineNumber,
				column: e.column
			}), E();
		}, 80), k = () => {
			if (p?.dispose(), p = null, !c) return;
			let e = c.getPosition();
			e && O(e), p = _o.onDidChangeCursorPosition(c, O);
		}, A = () => s.values["files.autoSave"] === "onFocusChange", M = async () => {
			if (!A() || _) return;
			let e = a.tabs.find((e) => e.id === t.tab.id);
			if (e?.dirty) {
				_ = !0;
				try {
					await Ep.execute("file.save", { path: e.path });
				} finally {
					_ = !1;
				}
			}
		}, P = () => {
			l?.dispose(), l = null, c && (l = _o.onDidBlurEditorWidget(c, () => {
				M();
			}));
		}, F = () => {
			!c || !v || y.set(v, c.saveViewState());
		}, L = (e) => {
			let t = y.get(e);
			!c || !t || c.restoreViewState(t);
		}, R = async (e) => {
			let t = r.value;
			if (!t) return;
			let n = x(e);
			c ? (v !== e.path && F(), await _o.setEditorModel(c, e.path, n, e.language)) : (i.value = !0, c = await _o.createEditor(t, {
				path: e.path,
				content: n,
				language: e.language,
				...b.value
			}), i.value = !1, jf.markStartup("firstEditorReadyMs", performance.now())), v = e.path, L(e.path), D(), k(), P(), E(), await ee(), S(), c?.focus();
		};
		return o(() => {
			R(t.tab);
		}), W(() => t.tab.id, () => {
			R(t.tab);
		}), W(b, (e) => {
			c?.updateOptions(yi(e)), E();
		}), W(() => s.version, () => {
			!c || t.tab.kind !== "settings-json" || a.tabs.find((e) => e.id === t.tab.id)?.dirty || (h = !0, _o.setModelContent(t.tab.path, Oi.stringifySettings()));
		}), ct(r, C.schedule), st(window, $h, w), st(window, eg, C.flush), g(() => {
			F(), a.clearActiveEditorStatus(), l?.dispose(), u?.dispose(), p?.dispose(), C.cancel(), m && window.cancelAnimationFrame(m), r.value && _o.disposeEditor(r.value);
		}), (e, t) => (f(), I("div", Yv, [G("div", {
			ref_key: "containerRef",
			ref: r,
			class: "monaco-editor-host__surface"
		}, null, 512), i.value ? (f(), I("div", Xv, "正在加载编辑器...")) : N("", !0)]));
	}
}), [["__scopeId", "data-v-ca6a3b6f"]]), Qv = /* @__PURE__ */ Y({
	__name: "TextEditorPane",
	props: { tab: {} },
	setup(e) {
		return (t, n) => (f(), J(Zv, { tab: e.tab }, null, 8, ["tab"]));
	}
}), $v = {
	key: 5,
	class: "editor-pane-host__state",
	"data-testid": "editor-file-loading-state"
}, ey = {
	key: 6,
	class: "editor-pane-host__state editor-pane-host__state--error",
	"data-testid": "editor-file-error-state"
}, ty = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "EditorPaneHost",
	props: { tab: {} },
	setup(t) {
		let n = t, r = j(() => n.tab?.contentStatus ?? "ready"), i = j(() => n.tab?.kind === "settings-view"), a = (e) => {
			if (!e) return "";
			let t = Ia.readFile(e);
			return t.ok ? t.content : "";
		};
		return (t, o) => i.value ? (f(), J(e(la), { key: 0 })) : n.tab?.kind === "diff" ? (f(), J(Kv, {
			key: 1,
			tab: n.tab
		}, null, 8, ["tab"])) : n.tab?.kind === "image-preview" ? (f(), J(e(Qn), {
			key: 2,
			tab: n.tab
		}, null, 8, ["tab"])) : n.tab?.kind === "video-preview" ? (f(), J(e(fr), {
			key: 3,
			tab: n.tab
		}, null, 8, ["tab"])) : n.tab?.kind === "markdown-preview" ? (f(), J(e(Jv), {
			key: 4,
			content: a(n.tab?.previewPath)
		}, null, 8, ["content"])) : r.value === "loading" ? (f(), I("div", $v, [
			o[0] ||= G("div", {
				class: "editor-pane-host__spinner",
				"aria-hidden": "true"
			}, null, -1),
			o[1] ||= G("h2", null, "正在获取文件数据中", -1),
			G("p", null, K(n.tab?.title), 1)
		])) : r.value === "error" ? (f(), I("div", ey, [o[2] ||= G("h2", null, "文件数据获取失败", -1), G("p", null, K(n.tab?.contentError || n.tab?.title), 1)])) : n.tab ? (f(), J(Qv, {
			key: 7,
			tab: n.tab
		}, null, 8, ["tab"])) : c(t.$slots, "empty", { key: 8 }, void 0, !0);
	}
}), [["__scopeId", "data-v-318e99ee"]]), ny = ["aria-selected", "data-tab-id"], ry = ["data-icon-id"], iy = ["href"], ay = { class: "editor-tab-item__title" }, oy = ["aria-label", "data-state"], sy = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "EditorTabItem",
	props: {
		tab: {},
		active: { type: Boolean },
		dragging: { type: Boolean },
		dragOver: { type: Boolean },
		dragOverPlacement: {}
	},
	emits: [
		"activate",
		"context-menu",
		"close",
		"drag-start",
		"drag-over",
		"drop-tab",
		"drag-end"
	],
	setup(e, { emit: r }) {
		let i = e, a = r, o = j(() => Ju({
			type: "file",
			name: i.tab.title || i.tab.path
		})), s = j(() => i.tab.kind === "settings-view" ? "settings-gear" : ""), c = n(!1), l = j(() => i.tab.pinned && !c.value ? "pinned" : i.tab.pinned && c.value ? "close" : i.tab.dirty ? "dirty" : "close"), u = j(() => l.value === "pinned" ? `解锁关闭 ${i.tab.title}` : `关闭 ${i.tab.title}`);
		W(() => [i.tab.id, i.tab.pinned], () => {
			c.value = !1;
		});
		let d = () => {
			if (l.value === "pinned") {
				c.value = !0;
				return;
			}
			a("close", i.tab.id);
		};
		return (n, r) => (f(), I("div", {
			class: t(["editor-tab-item", {
				"editor-tab-item--active": e.active,
				"editor-tab-item--dragging": e.dragging,
				"editor-tab-item--drag-over": e.dragOver,
				"editor-tab-item--drag-over-after": e.dragOver && e.dragOverPlacement === "after",
				"editor-tab-item--dirty": e.tab.dirty,
				"editor-tab-item--loading": e.tab.contentStatus === "loading",
				"editor-tab-item--pinned": e.tab.pinned
			}]),
			role: "tab",
			tabindex: "0",
			draggable: "true",
			"aria-selected": e.active,
			"data-tab-id": e.tab.id,
			onClick: r[2] ||= (t) => a("activate", e.tab.id),
			onContextmenu: r[3] ||= P((t) => a("context-menu", e.tab.id, t), ["prevent"]),
			onKeydown: r[4] ||= le((t) => a("activate", e.tab.id), ["enter"]),
			onDragstart: r[5] ||= (t) => a("drag-start", e.tab.id, t),
			onDragover: r[6] ||= (t) => a("drag-over", e.tab.id, t),
			onDrop: r[7] ||= (t) => a("drop-tab", e.tab.id, t),
			onDragend: r[8] ||= (e) => a("drag-end")
		}, [
			s.value ? (f(), J(X, {
				key: 0,
				class: "editor-tab-item__codicon",
				name: s.value,
				decorative: ""
			}, null, 8, ["name"])) : (f(), I("svg", {
				key: 1,
				class: "editor-tab-item__asset-icon",
				"data-icon-id": o.value.id,
				"aria-hidden": "true",
				focusable: "false"
			}, [G("use", { href: o.value.href }, null, 8, iy)], 8, ry)),
			G("span", ay, K(e.tab.title), 1),
			G("button", {
				class: "editor-tab-item__close",
				type: "button",
				draggable: "false",
				"aria-label": u.value,
				"data-state": l.value,
				onClick: P(d, ["stop"]),
				onPointerdown: r[0] ||= P(() => {}, ["stop"]),
				onDragstart: r[1] ||= P(() => {}, ["stop", "prevent"])
			}, [l.value === "dirty" ? (f(), I(z, { key: 0 }, [r[9] ||= G("span", {
				class: "editor-tab-item__dirty-dot",
				"aria-hidden": "true"
			}, null, -1), D(X, {
				class: "editor-tab-item__close-icon",
				name: "close",
				decorative: ""
			})], 64)) : l.value === "pinned" ? (f(), J(X, {
				key: 1,
				class: "editor-tab-item__close-icon",
				name: "pinned",
				decorative: ""
			})) : (f(), J(X, {
				key: 2,
				class: "editor-tab-item__close-icon",
				name: "close",
				decorative: ""
			}))], 40, oy)
		], 42, ny));
	}
}), [["__scopeId", "data-v-b99d78cd"]]), cy = 140, ly = 260, uy = 16, dy = 160, fy = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "EditorTabs",
	props: {
		executeCommand: { type: Function },
		groupId: {}
	},
	setup(r) {
		let i = r, a = Xt(), o = j(() => {
			if (!i.groupId) return a.tabs;
			let e = a.tabs.filter((e) => e.groupId === i.groupId), t = a.groups.find((e) => e.id === i.groupId);
			return t?.tabIds.length ? t.tabIds.map((e) => a.tabs.find((t) => t.id === e)).filter((e) => e !== void 0 && e.groupId === i.groupId) : e;
		}), s = j(() => o.value.length === 0), c = n(null), l = n(null), u = n("before"), d = n(null), m = n(null), g = n(!1), _ = j(() => ({
			"--editor-tab-min-width": `${cy}px`,
			"--editor-tab-max-width": `${ly}px`
		})), v = (e, t) => i.executeCommand?.(e, t) ?? Ep.execute(e, t), b = (e) => {
			v("editor.activateTab", { tabId: e });
		}, x = (e) => {
			v("editor.closeTab", { tabId: e });
		}, C = () => {
			d.value = null;
		}, w = () => {
			let e = d.value;
			e && (x(e.id), O.close(), C());
		}, T = () => {
			O.close(), C();
		}, E = () => {
			let e = d.value;
			e && (Promise.resolve(v("file.save", { path: e.path })).then(() => {
				x(e.id);
			}), O.close(), C());
		}, O = Cc({
			action: () => y("div", { class: "editor-tabs-unsaved-confirm__actions" }, [
				y("button", {
					class: "editor-tabs-unsaved-confirm__button",
					"data-testid": "editor-tab-discard-close",
					type: "button",
					onClick: w
				}, "不保存"),
				y("button", {
					class: "editor-tabs-unsaved-confirm__button",
					"data-testid": "editor-tab-cancel-close",
					type: "button",
					onClick: T
				}, "取消"),
				y("button", {
					class: "editor-tabs-unsaved-confirm__button editor-tabs-unsaved-confirm__button--primary",
					"data-testid": "editor-tab-save-close",
					type: "button",
					onClick: E
				}, "保存")
			]),
			content: "如果不保存，你的更改将丢失。",
			onClose: C,
			preset: "confirm",
			role: "alertdialog",
			title: () => `是否要保存对 ${d.value?.title ?? "文件"} 的更改？`,
			type: "warning",
			width: 420
		}), k = (e) => {
			let t = a.tabs.find((t) => t.id === e);
			if (!t?.dirty) {
				x(e);
				return;
			}
			d.value = t, O.open();
		}, A = (e, t) => {
			c.value = e, Cr(t.dataTransfer, e);
		}, M = (e) => {
			let t = e.currentTarget, n = t instanceof HTMLElement ? t : e.target instanceof Element ? e.target.closest(".editor-tab-item") : null;
			if (!n) return "before";
			let r = n.getBoundingClientRect();
			return e.clientX > r.left + r.width / 2 ? "after" : "before";
		}, N = (e, t) => {
			t.preventDefault(), l.value = e, u.value = M(t), t.dataTransfer && (t.dataTransfer.dropEffect = "move");
		}, P = (e, t) => {
			t.preventDefault();
			let n = c.value ?? t.dataTransfer?.getData("text/plain") ?? "";
			n && a.moveTabWithinGroup(n, e, i.groupId, M(t)), c.value = null, l.value = null;
		}, F = () => {
			c.value = null, l.value = null;
		}, L = (e) => e.target instanceof Element && !!e.target.closest(".editor-tab-item"), R = (e) => [...o.value].reverse().find((t) => t.id !== e), B = (e) => {
			if (L(e)) return;
			let t = c.value ?? e.dataTransfer?.getData("text/plain") ?? "", n = t ? R(t) : null;
			n && (e.preventDefault(), l.value = n.id, u.value = "after", e.dataTransfer && (e.dataTransfer.dropEffect = "move"));
		}, V = (e) => {
			if (L(e)) return;
			e.preventDefault();
			let t = c.value ?? e.dataTransfer?.getData("text/plain") ?? "", n = t ? R(t) : null;
			t && n && a.moveTabWithinGroup(t, n.id, i.groupId, "after"), c.value = null, l.value = null;
		}, ee = (e) => {
			let t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
			return e.deltaMode === WheelEvent.DOM_DELTA_LINE ? t * uy : e.deltaMode === WheelEvent.DOM_DELTA_PAGE ? t * dy : t;
		}, te = (e) => {
			if (e.ctrlKey || !(e.currentTarget instanceof HTMLElement)) return;
			let t = ee(e);
			if (t === 0) return;
			let n = e.currentTarget, r = Math.max(0, n.scrollWidth - n.clientWidth);
			if (r === 0) return;
			let i = Math.min(r, Math.max(0, n.scrollLeft + t));
			i !== n.scrollLeft && (e.preventDefault(), n.scrollLeft = i);
		}, H = (e, t) => {
			let n = a.tabs.find((t) => t.id === e);
			n && Ar.open({
				event: t,
				orderedTabs: o.value,
				tab: n,
				tabs: a.tabs
			});
		};
		return (n, r) => (f(), I("div", {
			class: t(["editor-tabs", { "editor-tabs--empty": s.value }]),
			role: "tablist",
			"aria-label": "编辑器标签栏"
		}, [G("div", {
			class: "editor-tabs__scroll-shell",
			onPointerenter: r[0] ||= (e) => g.value = !0,
			onPointerleave: r[1] ||= (e) => g.value = !1
		}, [G("div", {
			ref_key: "tabStripRef",
			ref: m,
			class: "editor-tabs__scroller editor-tabs__scroller--compact-scrollbar ide-scrollable",
			"data-testid": "editor-tabs-scroller",
			onDragover: B,
			onDrop: V,
			onWheel: te
		}, [G("div", {
			class: "editor-tabs__strip",
			style: p(_.value)
		}, [(f(!0), I(z, null, S(o.value, (t) => (f(), J(sy, {
			key: t.id,
			tab: t,
			active: t.id === e(a).activeTabId,
			dragging: t.id === c.value,
			"drag-over": t.id === l.value && t.id !== c.value,
			"drag-over-placement": u.value,
			onActivate: b,
			onContextMenu: H,
			onClose: k,
			onDragStart: A,
			onDragOver: N,
			onDropTab: P,
			onDragEnd: F
		}, null, 8, [
			"tab",
			"active",
			"dragging",
			"drag-over",
			"drag-over-placement"
		]))), 128))], 4)], 544), D(e(sd), {
			"scroll-element": m.value,
			revision: o.value.length,
			"viewport-active": g.value,
			orientation: "horizontal"
		}, null, 8, [
			"scroll-element",
			"revision",
			"viewport-active"
		])], 32), D(e(pc), h(e(O).props, {
			class: "editor-tabs-unsaved-confirm",
			onAfterLeave: C
		}), null, 16)], 2));
	}
}), [["__scopeId", "data-v-4653fc6c"]]), py = ["data-virtualized"], my = ["title"], hy = ["aria-expanded", "onClick"], gy = ["data-icon-id"], _y = ["href"], vy = { class: "monaco-breadcrumbs__label" }, yy = [
	"data-path",
	"data-active",
	"onClick"
], by = {
	key: 1,
	class: "monaco-breadcrumbs__directory-chevron",
	"aria-hidden": "true"
}, xy = ["data-icon-id"], Sy = ["href"], Cy = { class: "monaco-breadcrumbs__directory-label" }, wy = {
	key: 0,
	class: "monaco-breadcrumbs__directory-empty"
}, Ty = 8, Ey = 40, Dy = 8, Oy = 240, ky = 12, Ay = 24, jy = 10, My = 4, Ny = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "MonacoBreadcrumbs",
	props: { path: {} },
	setup(r) {
		let i = r, a = zt(), s = n(null), c = n([]), l = n(!1), u = (e) => (e ?? "").replace(/\\/g, "/").replace(/\/+/g, "/").replace(/\/$/, ""), d = (e, t) => e.length ? `${t}${e.join("/")}` : t ? "/" : "", m = (e) => {
			let t = u(e), n = t.split("/").filter(Boolean), r = t.startsWith("/") ? "/" : "";
			return n.map((e, t) => ({
				fileIcon: t === n.length - 1 ? Ju({
					name: e,
					type: "file"
				}) : void 0,
				key: `${t}-${e}`,
				label: e,
				parentPath: d(n.slice(0, t), r),
				path: d(n.slice(0, t + 1), r),
				title: `${r}${n.slice(0, t + 1).join("/")}`
			}));
		}, _ = (e) => {
			if (!e) return Ey;
			let t = e.fileIcon ? 19 : 0, n = e.fileIcon ? 0 : 12, r = e.label.length * Ty;
			return Math.max(Ey, r + t + n + 16);
		}, v = j(() => m(i.path)), y = j(() => v.value.length > Dy), b = ut(v, {
			itemWidth: (e) => _(v.value[e]),
			overscan: 2
		}), x = j(() => b.containerProps.ref.value), C = j(() => v.value.reduce((e, t) => e + t.label.length, v.value.length)), w = j(() => y.value ? b.list.value.length > 0 ? b.list.value : v.value.slice(0, Dy).map((e, t) => ({
			data: e,
			index: t
		})) : v.value.map((e, t) => ({
			data: e,
			index: t
		}))), T = j(() => y.value ? b.wrapperProps.value : { style: {
			display: "flex",
			height: "100%",
			marginLeft: "0",
			width: "max-content"
		} }), E = (e) => u(e) || "/", k = (e, t) => {
			let n = E(t);
			for (let t of e) {
				if (E(t.path) === n) return t;
				let e = k(t.children ?? [], n);
				if (e) return e;
			}
			return null;
		}, A = (e) => {
			let t = E(e);
			return t === "/" ? a.fileTree : k(a.fileTree, t)?.children ?? [];
		}, M = (e) => [...e].sort((e, t) => e.type === t.type ? e.name.localeCompare(t.name) : e.type === "folder" ? -1 : 1), F = (e) => c.value.includes(E(e)), L = (e) => {
			let t = E(e);
			c.value = F(t) ? c.value.filter((e) => e !== t) : [...c.value, t];
		}, R = (e, t = 0) => M(e).flatMap((e) => {
			let n = E(e.path), r = e.type === "folder" && F(n), i = {
				depth: t,
				expanded: r,
				node: e
			};
			return r ? [i, ...R(e.children ?? [], t + 1)] : [i];
		}), B = j(() => s.value ? R(A(s.value.rootPath)) : []), V = ut(B, {
			itemHeight: Ay,
			overscan: My
		}), ee = j(() => V.list.value.length > 0 ? V.list.value : B.value.slice(0, jy + My).map((e, t) => ({
			data: e,
			index: t
		}))), te = j(() => V.wrapperProps.value), H = j(() => s.value ? {
			left: `${Math.min(s.value.left, window.innerWidth - Oy - 8)}px`,
			top: `${s.value.top}px`,
			width: `${Oy}px`
		} : {}), ne = j(() => ({
			...V.containerProps,
			style: [V.containerProps.style, H.value]
		})), re = (e, t) => {
			let n = t.currentTarget.getBoundingClientRect();
			c.value = [], s.value = {
				activePath: E(e.path),
				left: n.left,
				rootPath: E(e.parentPath),
				top: n.bottom + 4
			};
		}, U = () => {
			s.value = null, c.value = [];
		}, ie = async (e) => {
			if (e.node.type === "folder") {
				let t = E(e.node.path);
				(await Ia.loadFolder(e.node.path)).ok && (a.setFileTree(Ia.getFileTree()), L(t)), a.setSelectedPath(e.node.path), s.value = s.value ? {
					...s.value,
					activePath: t
				} : null;
				return;
			}
			let t = To.openFile({
				path: e.node.path,
				title: e.node.name,
				language: e.node.language ?? Lt(e.node.path)
			});
			To.loadFileContent(t.id), U();
		}, W = (e) => Ju({
			name: e.node.name,
			type: e.node.type,
			expanded: e.expanded
		}), ae = (e) => ({ paddingLeft: `${6 + e.depth * ky}px` }), q = (e) => {
			e.key === "Escape" && U();
		};
		return o(() => {
			document.addEventListener("click", U), document.addEventListener("keydown", q);
		}), g(() => {
			document.removeEventListener("click", U), document.removeEventListener("keydown", q);
		}), (n, r) => (f(), I(z, null, [G("div", {
			class: t(["monaco-breadcrumbs__scroll-shell", {
				"monaco-breadcrumbs__scroll-shell--empty": v.value.length === 0,
				"monaco-breadcrumbs--scrollable": y.value
			}]),
			"data-virtualized": y.value ? "true" : "false",
			"data-testid": "monaco-breadcrumbs",
			onPointerenter: r[0] ||= (e) => l.value = !0,
			onPointerleave: r[1] ||= (e) => l.value = !1
		}, [G("nav", h(e(b).containerProps, {
			class: ["monaco-breadcrumbs", { "monaco-breadcrumbs--empty": v.value.length === 0 }],
			"aria-label": "编辑器路径面包屑"
		}), [G("ol", h(T.value, { class: "monaco-breadcrumbs__list" }), [(f(!0), I(z, null, S(w.value, (e) => (f(), I("li", {
			key: e.data.key,
			class: "monaco-breadcrumbs__item",
			"data-testid": "monaco-breadcrumbs-item",
			title: e.data.title
		}, [G("button", {
			class: "monaco-breadcrumbs__target",
			type: "button",
			"data-testid": "monaco-breadcrumbs-target",
			"aria-expanded": s.value?.activePath === E(e.data.path),
			onClick: P((t) => re(e.data, t), ["stop"])
		}, [e.data.fileIcon ? (f(), I("svg", {
			key: 0,
			class: "monaco-breadcrumbs__file-icon",
			"data-icon-id": e.data.fileIcon.id,
			"data-testid": "monaco-breadcrumbs-file-icon",
			"aria-hidden": "true",
			focusable: "false"
		}, [G("use", { href: e.data.fileIcon.href }, null, 8, _y)], 8, gy)) : N("", !0), G("span", vy, K(e.data.label), 1)], 8, hy), e.index < v.value.length - 1 ? (f(), J(X, {
			key: 0,
			class: "monaco-breadcrumbs__separator",
			name: "chevron-right",
			decorative: ""
		})) : N("", !0)], 8, my))), 128))], 16)], 16), D(e(sd), {
			"scroll-element": x.value,
			revision: C.value,
			"viewport-active": l.value,
			orientation: "horizontal"
		}, null, 8, [
			"scroll-element",
			"revision",
			"viewport-active"
		])], 42, py), (f(), J(O, { to: "body" }, [s.value ? (f(), I("div", h({ key: 0 }, ne.value, {
			class: "monaco-breadcrumbs__directory-popover",
			"data-testid": "monaco-breadcrumbs-directory-popover",
			role: "menu",
			onClick: r[2] ||= P(() => {}, ["stop"])
		}), [G("div", h(te.value, { class: "monaco-breadcrumbs__directory-list" }), [(f(!0), I(z, null, S(ee.value, (e) => (f(), I("button", {
			key: e.data.node.path,
			class: t(["monaco-breadcrumbs__directory-item", { "monaco-breadcrumbs__directory-item--active": E(e.data.node.path) === s.value.activePath }]),
			style: p(ae(e.data)),
			type: "button",
			"data-path": e.data.node.path,
			"data-active": E(e.data.node.path) === s.value.activePath ? "true" : "false",
			role: "menuitem",
			onClick: (t) => ie(e.data)
		}, [
			e.data.node.type === "folder" ? (f(), J(X, {
				key: 0,
				class: "monaco-breadcrumbs__directory-chevron",
				name: e.data.expanded ? "chevron-down" : "chevron-right",
				decorative: ""
			}, null, 8, ["name"])) : (f(), I("span", by)),
			(f(), I("svg", {
				class: "monaco-breadcrumbs__directory-icon",
				"data-icon-id": W(e.data).id,
				"aria-hidden": "true",
				focusable: "false"
			}, [G("use", { href: W(e.data).href }, null, 8, Sy)], 8, xy)),
			G("span", Cy, K(e.data.node.name), 1)
		], 14, yy))), 128))], 16), B.value.length === 0 ? (f(), I("div", wy, "暂无目录内容")) : N("", !0)], 16)) : N("", !0)]))], 64));
	}
}), [["__scopeId", "data-v-e6ed4f9a"]]), Py = ["data-group-id", "onClick"], Fy = { class: "editor-area__surface" }, Iy = 2, Ly = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "EditorArea",
	setup(r) {
		let i = Xt(), a = Jt(), o = jr(), s = Ds(), c = n(null), l = n(null), u = n(null), d = j(() => o.values["workbench.breadcrumbs.enabled"] !== !1), m = j(() => i.groups.slice(0, Iy)), h = j(() => i.groupLayout === "horizontal" && m.value.length === Iy), _ = j(() => s.dragging && s.activeHandle === "editorGroup"), v = j(() => s.editorGroup.ratio), y = j(() => 100 - v.value), b = (e) => `${Number(e.toFixed(2))}%`, x = j(() => b(v.value)), C = j(() => b(y.value)), w = j(() => `minmax(0, ${x.value}) var(--ide-splitter-size) minmax(0, ${C.value})`), T = j(() => h.value ? { gridTemplateColumns: w.value } : void 0), E = j(() => h.value ? { gridTemplateColumns: w.value } : void 0), O = j(() => {
			let e = /* @__PURE__ */ new Map(), t = i.tabs.find((e) => e.id === i.activeTabId);
			for (let n of m.value) {
				let r = i.tabs.filter((e) => e.groupId === n.id);
				e.set(n.id, t?.groupId === n.id ? t : r[0]);
			}
			return e;
		}), k = (e) => O.value.get(e), A = (e) => e?.kind === "settings-view", P = (e) => !e || A(e) || e.kind === "settings-json" || e.kind === "image-preview" ? "" : e.kind === "diff" ? e.modifiedPath ?? e.path : e.kind === "markdown-preview" ? e.previewPath ?? e.path : e.path, F = (e) => d.value && P(e), L = (e, t) => {
			let n = c.value;
			if (!n) return !1;
			let r = n.getBoundingClientRect();
			return e >= r.left && e <= r.right && t >= r.top && t <= r.bottom;
		}, R = () => {
			let e = l.value;
			if (!e || !h.value) return null;
			let t = Array.from(e.querySelectorAll(".editor-area__group[data-group-id]")).slice(0, Iy);
			return t.length < Iy ? null : t;
		}, B = (e) => {
			let t = R();
			if (t) {
				let [n, r] = t, i = n.getBoundingClientRect(), a = r.getBoundingClientRect();
				if (i.width > 0 && a.width > 0) return e <= i.right ? "left" : e >= a.left ? "right" : e < i.right + (a.left - i.right) / 2 ? "left" : "right";
			}
			let n = c.value;
			if (!n) return null;
			let r = n.getBoundingClientRect();
			return r.width <= 0 ? null : e < r.left + r.width / 2 ? "left" : "right";
		}, V = (e) => {
			let t = i.groups.slice(0, Iy);
			return t.length < Iy ? (tn.split("right"), t = i.groups.slice(0, Iy)) : i.setGroupLayout("horizontal"), e === "left" ? t[0]?.id ?? "main" : t[1]?.id ?? t[0]?.id ?? "main";
		}, ee = (e, t) => i.moveTabToGroup(e.tabId, t), te = (e, t) => {
			let n = hr({
				groupId: t,
				language: e.language,
				path: e.path,
				title: e.title
			}), r = To.openFile(n.openInput);
			return n.shouldLoadTextContent && To.loadFileContent(r.id), !0;
		}, H = (e, t) => {
			let n = V(t), r = e.kind === "tab" ? ee(e, n) : te(e, n);
			return r && (u.value = null), r;
		}, ne = () => {
			let e = wr.state.value;
			if (!e || !L(e.clientX, e.clientY)) {
				u.value = null;
				return;
			}
			u.value = B(e.clientX);
		}, re = (e) => e.target instanceof Element && !!e.target.closest(".editor-tabs"), U = (e) => {
			if (re(e)) return;
			let t = xr(e.dataTransfer) ?? Sr(e.dataTransfer)?.kind;
			if (!t) return;
			let n = B(e.clientX);
			!n || !L(e.clientX, e.clientY) || (e.preventDefault(), u.value = n, e.dataTransfer && (e.dataTransfer.dropEffect = t === "tab" ? "move" : "copy"));
		}, ie = (e) => {
			if (re(e)) return;
			let t = Sr(e.dataTransfer), n = B(e.clientX);
			if (!t || !n || !L(e.clientX, e.clientY)) {
				u.value = null;
				return;
			}
			e.preventDefault(), H(t, n);
		}, K = (e) => {
			let t = e.relatedTarget;
			t instanceof Node && c.value?.contains(t) || (u.value = null);
		}, ae = wr.registerPointerDropHandler((e) => {
			if (!L(e.clientX, e.clientY)) return u.value = null, !1;
			let t = B(e.clientX);
			return t ? H(e.payload, t) : !1;
		});
		return W(wr.state, ne), g(() => {
			ae();
		}), (n, r) => (f(), I("section", {
			ref_key: "editorAreaRef",
			ref: c,
			class: t(["editor-area", { "editor-area--settings": e(a).activeActivity === "keybindings" || e(i).tabs.some((t) => t.id === e(i).activeTabId && A(t)) }]),
			"data-testid": "editor-area",
			onDragover: U,
			onDrop: ie,
			onDragleave: K
		}, [e(a).activeActivity === "keybindings" ? (f(), J(e(kt), { key: 0 })) : (f(), I("div", {
			key: 1,
			ref_key: "editorGroupsRef",
			ref: l,
			class: t(["editor-area__groups", [`editor-area__groups--${e(i).groupLayout}`, {
				"editor-area__groups--split": h.value,
				"editor-area__groups--resizing": _.value
			}]]),
			style: p(T.value),
			"data-testid": "editor-area-groups"
		}, [(f(!0), I(z, null, S(m.value, (n, a) => (f(), I("section", {
			key: n.id,
			class: t(["editor-area__group", { "editor-area__group--active": n.id === e(i).activeGroupId }]),
			style: p(h.value && a === 1 ? { gridColumn: "3" } : void 0),
			"data-group-id": n.id,
			onClick: (t) => e(i).setActiveGroupId(n.id)
		}, [
			D(e(fy), { "group-id": n.id }, null, 8, ["group-id"]),
			F(k(n.id)) ? (f(), J(e(Ny), {
				key: 0,
				path: P(k(n.id))
			}, null, 8, ["path"])) : N("", !0),
			G("div", Fy, [D(e(ty), { tab: k(n.id) }, {
				empty: M(() => [...r[0] ||= [G("div", {
					class: "editor-area__empty",
					"data-testid": "editor-empty-state"
				}, [
					G("div", {
						class: "editor-area__mark",
						"aria-hidden": "true"
					}),
					G("h2", null, "Linux Panel IDE"),
					G("p", null, [
						G("span", null, "使用智能体编码"),
						G("kbd", null, "⌘"),
						G("kbd", null, "L")
					])
				], -1)]]),
				_: 1
			}, 8, ["tab"])])
		], 14, Py))), 128)), h.value ? (f(), J(e(Qh), {
			key: 0,
			class: "editor-area__splitter",
			handle: "editorGroup",
			orientation: "vertical"
		})) : N("", !0)], 6)), u.value ? (f(), I("div", {
			key: 2,
			class: "editor-area__split-drop-overlay",
			style: p(E.value),
			"data-testid": "editor-split-drop-overlay",
			"aria-hidden": "true"
		}, [G("div", {
			class: t(["editor-area__split-drop-zone", { "editor-area__split-drop-zone--active": u.value === "left" }]),
			"data-testid": "editor-split-drop-left"
		}, null, 2), G("div", {
			class: t(["editor-area__split-drop-zone", { "editor-area__split-drop-zone--active": u.value === "right" }]),
			style: p(h.value ? { gridColumn: "3" } : void 0),
			"data-testid": "editor-split-drop-right"
		}, null, 6)], 4)) : N("", !0)], 34));
	}
}), [["__scopeId", "data-v-8c161c5f"]]), Ry = (e) => {
	let t = globalThis;
	if (typeof t.requestAnimationFrame == "function") {
		let n = t.requestAnimationFrame(e);
		return () => t.cancelAnimationFrame?.(n);
	}
	let n = globalThis.setTimeout(e, 16);
	return () => globalThis.clearTimeout(n);
}, zy = class {
	sessions = /* @__PURE__ */ new Map();
	listeners = /* @__PURE__ */ new Set();
	pendingLayoutSessions = /* @__PURE__ */ new Set();
	activeSessionId = null;
	constructor(e) {
		this.options = e;
	}
	async createSession(e) {
		if (this.sessions.has(e.id)) return this.activateSession(e.id), this.getSession(e.id);
		let t = await this.options.runtimeFactory({
			container: e.container,
			title: e.title
		}), n = this.options.adapterFactory({
			id: e.id,
			title: e.title
		}), r = {
			adapter: n,
			disposables: [
				t.terminal.onData((e) => n.input(e)),
				n.onEvent((t) => this.handleAdapterEvent(e.id, t)),
				...t.disposables ?? []
			],
			id: e.id,
			runtime: t,
			state: "connecting",
			title: e.title
		};
		return this.sessions.set(e.id, r), this.activeSessionId = e.id, t.terminal.open(e.container), await n.connect(), r.state = "connected", this.emitChange(), this.toSnapshot(r);
	}
	getSessions() {
		return Array.from(this.sessions.values()).map((e) => this.toSnapshot(e));
	}
	getActiveSessionId() {
		return this.activeSessionId;
	}
	onDidChange(e) {
		return this.listeners.add(e), { dispose: () => this.listeners.delete(e) };
	}
	activateSession(e) {
		let t = this.sessions.get(e);
		return t ? (this.activeSessionId = e, t.runtime.terminal.focus(), this.emitChange(), !0) : !1;
	}
	focusSession(e = this.activeSessionId) {
		if (!e) return !1;
		let t = this.sessions.get(e);
		return t ? (t.runtime.terminal.focus(), !0) : !1;
	}
	clearSession(e = this.activeSessionId) {
		if (!e) return !1;
		let t = this.sessions.get(e);
		return t ? (t.runtime.terminal.clear(), !0) : !1;
	}
	closeSession(e = this.activeSessionId) {
		if (!e) return !1;
		let t = this.sessions.get(e);
		if (!t) return !1;
		for (let e of t.disposables) e.dispose();
		return t.adapter.dispose(), t.runtime.terminal.dispose(), t.state = "closed", this.sessions.delete(e), this.activeSessionId === e && (this.activeSessionId = this.sessions.values().next().value?.id ?? null), this.emitChange(), !0;
	}
	layoutSession(e = this.activeSessionId) {
		if (!e || this.pendingLayoutSessions.has(e)) return !1;
		let t = this.sessions.get(e);
		return t ? (this.pendingLayoutSessions.add(e), (this.options.scheduleLayout ?? Ry)(() => {
			this.pendingLayoutSessions.delete(e), t.runtime.fitAddon?.fit(), t.adapter.resize(t.runtime.terminal.cols, t.runtime.terminal.rows);
		}), !0) : !1;
	}
	dispose() {
		for (let e of Array.from(this.sessions.keys())) this.closeSession(e);
		this.listeners.clear(), this.pendingLayoutSessions.clear();
	}
	handleAdapterEvent(e, t) {
		let n = this.sessions.get(e);
		if (n) {
			if (t.type === "output") {
				n.runtime.terminal.write(t.data);
				return;
			}
			if (t.type === "exit") {
				n.state = "closed", this.emitChange();
				return;
			}
			t.type === "error" && (n.state = "error", n.runtime.terminal.write(`\r\n${t.message}\r\n`), this.emitChange());
		}
	}
	getSession(e) {
		let t = this.sessions.get(e);
		if (!t) throw Error(`Terminal session "${e}" does not exist.`);
		return this.toSnapshot(t);
	}
	toSnapshot(e) {
		return {
			id: e.id,
			state: e.state,
			title: e.title
		};
	}
	emitChange() {
		for (let e of this.listeners) e();
	}
}, By = "127.0.0.1", Vy = "本地服务器", Hy = "/webssh", Uy = (e) => {
	if (e.startsWith("ws://") || e.startsWith("wss://")) return e;
	let t = typeof window > "u" ? "http://localhost" : window.location.href, n = new URL(e, t);
	return n.protocol = n.protocol === "https:" ? "wss:" : "ws:", n.toString();
}, Wy = () => typeof window > "u" ? "" : window.vite_public_request_token ?? "", Gy = class {
	listeners = /* @__PURE__ */ new Set();
	socket = null;
	constructor(e) {
		this.options = e;
	}
	connect() {
		return new Promise((e, t) => {
			let n = new WebSocket(Uy(this.options.url ?? Hy));
			this.socket = n, n.onopen = () => {
				n.send(JSON.stringify({
					host: this.options.host ?? By,
					id: this.options.id,
					ps: this.options.ps ?? Vy,
					"x-http-token": Wy()
				})), e();
			}, n.onmessage = (e) => {
				this.emit({
					type: "output",
					data: String(e.data)
				});
			}, n.onerror = () => {
				let e = /* @__PURE__ */ Error("终端 WebSocket 连接失败");
				this.emit({
					type: "error",
					message: e.message
				}), t(e);
			}, n.onclose = () => {
				this.emit({ type: "exit" });
			};
		});
	}
	input(e) {
		this.send(e);
	}
	resize(e, t) {
		this.send(JSON.stringify({
			cols: e,
			resize: 1,
			rows: t
		}));
	}
	onEvent(e) {
		return this.listeners.add(e), { dispose: () => this.listeners.delete(e) };
	}
	dispose() {
		this.listeners.clear(), this.socket?.close(), this.socket = null;
	}
	send(e) {
		this.socket?.readyState === WebSocket.OPEN && this.socket.send(e);
	}
	emit(e) {
		for (let t of this.listeners) t(e);
	}
}, Ky = (e, t, n) => typeof document > "u" ? n : getComputedStyle(e ?? document.documentElement).getPropertyValue(t).trim() || n, qy = (e) => ({
	background: Ky(e, "--ide-bottom-panel-bg", "#282c34"),
	cursor: Ky(e, "--ide-terminal-cursor", "#d6deeb"),
	foreground: Ky(e, "--ide-terminal-fg", "#d6deeb"),
	selectionBackground: Ky(e, "--ide-terminal-selection-bg", "#264f78")
}), Jy = (e, t) => {
	e.options && (e.options.theme = qy(t));
}, Yy = (e, t) => {
	if (typeof document > "u" || typeof MutationObserver > "u") return { dispose: () => {} };
	let n = new MutationObserver(() => Jy(e, t));
	return n.observe(document.documentElement, {
		attributeFilter: ["data-ide-theme", "style"],
		attributes: !0
	}), t && t !== document.documentElement && n.observe(t, {
		attributeFilter: ["data-ide-theme", "style"],
		attributes: !0
	}), n.observe(document.head, {
		childList: !0,
		characterData: !0,
		subtree: !0
	}), { dispose: () => n.disconnect() };
}, Xy = async ({ container: e }) => {
	let [{ Terminal: t }, { FitAddon: n }, { WebLinksAddon: r }] = await Promise.all([
		import("./js/vendor-xterm.js").then((e) => e.t),
		import("./js/vendor-xterm.js").then((e) => e.r),
		import("./js/vendor-xterm.js").then((e) => e.n)
	]), i = new t({
		convertEol: !0,
		cursorBlink: !0,
		fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
		fontSize: 12,
		theme: qy(e)
	}), a = new n(), o = new r(), s = Yy(i, e);
	return i.loadAddon(a), i.loadAddon(o), {
		disposables: [
			a,
			o,
			s
		],
		fitAddon: a,
		terminal: i
	};
}, Zy = { class: "terminal-view__body" }, Qy = ["data-testid", "onClick"], $y = [
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow"
], eb = {
	class: "terminal-view__sessions",
	"data-testid": "terminal-session-list",
	"aria-label": "终端会话"
}, tb = {
	key: 0,
	class: "terminal-view__actions"
}, nb = ["onClick"], rb = ["onClick"], ib = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "TerminalView",
	props: {
		service: {},
		showInlineActions: {
			type: Boolean,
			default: !0
		}
	},
	setup(r, { expose: i }) {
		let a = r, s = a.service ?? new zy({
			adapterFactory: (e) => new Gy(e),
			runtimeFactory: Xy
		}), c = n(null), l = n(ig.terminalSessions.defaultSize), u = n([]), d = n(null), m = n([]), h = /* @__PURE__ */ new Map(), _ = 0, v = null, y = null, b = Hv(() => {
			s.layoutSession();
		}), x = j(() => ({ gridTemplateColumns: `minmax(0, 1fr) var(--ide-splitter-size) ${l.value}px` })), C = () => {
			m.value = s.getSessions(), d.value = s.getActiveSessionId(), u.value = m.value.map((e) => ({
				id: e.id,
				title: e.title
			}));
		}, w = (e, t) => {
			if (t instanceof HTMLElement) {
				h.set(e, t);
				return;
			}
			h.delete(e);
		}, T = async () => {
			_ += 1;
			let e = `terminal:${_}`, t = `终端 ${_}`;
			u.value = [...u.value, {
				id: e,
				title: t
			}], d.value = e, await ee();
			let n = h.get(e);
			n && (await s.createSession({
				container: n,
				id: e,
				title: t
			}), C(), await ee(), s.layoutSession(e));
		}, E = async (e) => {
			s.activateSession(e), C(), await ee(), s.layoutSession(e);
		}, O = () => {
			s.clearSession();
		}, A = async () => {
			await M(d.value);
		}, M = async (e) => {
			let t = e;
			if (t) {
				if (s.closeSession(t), h.delete(t), C(), u.value.length === 0) {
					await T();
					return;
				}
				await ee(), s.layoutSession();
			}
		}, F = (e) => {
			s.focusSession(e);
		}, L = (e) => {
			e.preventDefault();
			let t = e.clientX, n = l.value, r = (e) => {
				let r = t - e.clientX;
				l.value = ag.clampSize("terminalSessions", n + r), b.schedule();
			}, i = () => {
				y?.(), y = null, s.layoutSession();
			};
			y = () => {
				window.removeEventListener("mousemove", r), window.removeEventListener("mouseup", i);
			}, window.addEventListener("mousemove", r), window.addEventListener("mouseup", i);
		};
		i({
			clearTerminal: O,
			closeTerminal: A,
			createTerminal: T
		});
		let R = s.onDidChange(C);
		return o(async () => {
			await T(), typeof ResizeObserver < "u" && c.value && (v = new ResizeObserver(() => {
				b.schedule();
			}), v.observe(c.value));
		}), st(window, $h, b.schedule), st(window, eg, b.flush), g(() => {
			y?.(), v?.disconnect(), b.cancel(), R.dispose(), s.dispose();
		}), (n, r) => (f(), I("section", {
			ref_key: "rootRef",
			ref: c,
			class: "terminal-view",
			style: p(x.value),
			"data-testid": "terminal-view"
		}, [
			G("div", Zy, [(f(!0), I(z, null, S(u.value, (e) => H((f(), I("div", {
				key: e.id,
				ref_for: !0,
				ref: (t) => w(e.id, t),
				class: "terminal-view__xterm",
				"data-testid": d.value === e.id ? "xterm-container" : void 0,
				onClick: (t) => F(e.id)
			}, null, 8, Qy)), [[k, d.value === e.id]])), 128))]),
			G("div", {
				class: "terminal-view__session-splitter",
				"data-testid": "terminal-session-splitter",
				role: "separator",
				"aria-label": "调整终端会话列表宽度",
				"aria-orientation": "vertical",
				"aria-valuemin": e(ig).terminalSessions.min,
				"aria-valuemax": e(ig).terminalSessions.max,
				"aria-valuenow": l.value,
				onMousedown: L
			}, null, 40, $y),
			G("aside", eb, [a.showInlineActions ? (f(), I("div", tb, [
				G("button", {
					class: "terminal-view__action",
					type: "button",
					title: "新建终端",
					"aria-label": "新建终端",
					"data-testid": "terminal-new",
					onClick: T
				}, [D(X, {
					name: "plus",
					decorative: ""
				})]),
				G("button", {
					class: "terminal-view__action",
					type: "button",
					title: "清空终端",
					"aria-label": "清空终端",
					"data-testid": "terminal-clear",
					onClick: O
				}, [D(X, {
					name: "clear-all",
					decorative: ""
				})]),
				G("button", {
					class: "terminal-view__action",
					type: "button",
					title: "关闭终端",
					"aria-label": "关闭终端",
					"data-testid": "terminal-close",
					onClick: A
				}, [D(X, {
					name: "close",
					decorative: ""
				})])
			])) : N("", !0), (f(!0), I(z, null, S(u.value, (e) => (f(), I("div", {
				key: e.id,
				class: t(["terminal-view__tab-row", { "terminal-view__tab-row--active": d.value === e.id }])
			}, [G("button", {
				class: "terminal-view__tab",
				type: "button",
				"data-testid": "terminal-tab",
				onClick: (t) => E(e.id)
			}, [D(X, {
				name: "terminal",
				decorative: ""
			}), G("span", null, K(e.title), 1)], 8, nb), G("button", {
				class: "terminal-view__tab-delete",
				type: "button",
				title: "删除终端",
				"aria-label": "删除终端",
				"data-testid": "terminal-tab-delete",
				onClick: P((t) => M(e.id), ["stop"])
			}, [D(X, {
				name: "trash",
				decorative: ""
			})], 8, rb)], 2))), 128))])
		], 4));
	}
}), [["__scopeId", "data-v-2b5a96b7"]]), ab = {
	class: "bottom-panel",
	"data-testid": "bottom-panel"
}, ob = { class: "bottom-panel__header" }, sb = {
	class: "bottom-panel__tabs",
	role: "tablist",
	"aria-label": "底部面板"
}, cb = ["aria-selected"], lb = {
	key: 0,
	class: "bottom-panel__badge",
	"data-testid": "bottom-panel-problems-count"
}, ub = ["aria-selected", "disabled"], db = { class: "bottom-panel__toolbar" }, fb = {
	key: 0,
	class: "bottom-panel__filter"
}, pb = {
	key: 1,
	class: "bottom-panel__terminal-toolbar",
	id: "bottom-panel-terminal-actions",
	"data-testid": "bottom-panel-terminal-toolbar"
}, mb = { class: "terminal-view__actions bottom-panel__terminal-actions" }, hb = ["title", "aria-label"], gb = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "BottomPanel",
	setup(r) {
		let i = Jt(), a = Ds(), s = Gt.stateRef, c = n(""), l = n(0), u = n(null), d = j(() => !s.value.policy.terminalEnabled), p = j(() => {
			l.value;
			let e = Fp.getCounts();
			return e.error + e.warning + e.info + e.hint;
		}), m = j(() => a.bottomPanel.height >= ig.bottomPanel.max), h = async (e) => {
			if (e === "terminal") {
				if (d.value) return;
				i.setPanelVisible(!0), i.setActivePanelTab("terminal"), i.setFocusedArea("panel");
				return;
			}
			i.setActivePanelTab(e);
		}, _ = () => {
			i.setPanelVisible(!1);
		}, v = () => {
			a.setBottomPanelHeight(m.value ? ig.bottomPanel.defaultSize : ig.bottomPanel.max);
		}, y = async () => {
			await u.value?.createTerminal();
		}, b = () => {
			u.value?.clearTerminal();
		}, x;
		return o(() => {
			x = Fp.onDidChange(() => {
				l.value += 1;
			});
		}), g(() => {
			x?.();
		}), (n, r) => (f(), I("section", ab, [G("div", ob, [G("div", sb, [G("button", {
			class: t(["bottom-panel__tab", { "bottom-panel__tab--active": e(i).activePanelTab === "problems" }]),
			type: "button",
			role: "tab",
			"aria-selected": e(i).activePanelTab === "problems",
			"data-testid": "bottom-panel-tab-problems",
			onClick: r[0] ||= (e) => h("problems")
		}, [r[3] ||= G("span", null, "问题", -1), p.value > 0 ? (f(), I("span", lb, K(p.value), 1)) : N("", !0)], 10, cb), G("button", {
			class: t(["bottom-panel__tab", { "bottom-panel__tab--active": e(i).activePanelTab === "terminal" }]),
			type: "button",
			role: "tab",
			"aria-selected": e(i).activePanelTab === "terminal",
			"data-testid": "bottom-panel-tab-terminal",
			disabled: d.value,
			onClick: r[1] ||= (e) => h("terminal")
		}, [...r[4] ||= [G("span", null, "终端", -1)]], 10, ub)]), G("div", db, [
			e(i).activePanelTab === "problems" ? (f(), I("label", fb, [D(X, {
				name: "filter",
				decorative: ""
			}), H(G("input", {
				"onUpdate:modelValue": r[2] ||= (e) => c.value = e,
				"data-testid": "bottom-panel-problems-filter",
				type: "search",
				placeholder: "筛选器(例如 text、**/*.ts、!**)"
			}, null, 512), [[B, c.value]])])) : (f(), I("div", pb, [G("div", mb, [G("button", {
				class: "terminal-view__action bottom-panel__icon-button",
				type: "button",
				title: "新建终端",
				"aria-label": "新建终端",
				"data-testid": "terminal-new",
				onClick: y
			}, [D(X, {
				name: "plus",
				decorative: ""
			})]), G("button", {
				class: "terminal-view__action bottom-panel__icon-button",
				type: "button",
				title: "清空终端",
				"aria-label": "清空终端",
				"data-testid": "terminal-clear",
				onClick: b
			}, [D(X, {
				name: "clear-all",
				decorative: ""
			})])])])),
			G("button", {
				class: "bottom-panel__icon-button",
				type: "button",
				title: m.value ? "恢复默认视图" : "全屏显示面板",
				"aria-label": m.value ? "恢复默认视图" : "全屏显示面板",
				"data-testid": "bottom-panel-maximize",
				onClick: v
			}, [D(X, {
				name: m.value ? "screen-normal" : "screen-full",
				decorative: ""
			}, null, 8, ["name"])], 8, hb),
			G("button", {
				class: "bottom-panel__icon-button",
				type: "button",
				title: "关闭面板",
				"aria-label": "关闭面板",
				"data-testid": "bottom-panel-close",
				onClick: _
			}, [D(X, {
				name: "close",
				decorative: ""
			})])
		])]), e(i).activePanelTab === "problems" ? (f(), J(e(Hp), {
			key: 0,
			"filter-text": c.value
		}, null, 8, ["filter-text"])) : (f(), J(e(ib), {
			key: 1,
			ref_key: "terminalViewRef",
			ref: u,
			"show-inline-actions": !1
		}, null, 512))]));
	}
}), [["__scopeId", "data-v-4caab33c"]]), _b = {
	ok: !1,
	error: {
		code: "SEARCH_CANCELLED",
		message: "Search was cancelled."
	}
}, vb = (e) => e.flatMap((e) => e.type === "file" ? [e] : vb(e.children)), yb = (e, t) => e.toLowerCase().includes(t.toLowerCase()), bb = new class {
	flattenedCache = null;
	lastFileTreeRef = null;
	constructor(e = Ia) {
		this.filesystem = e;
	}
	search(e, t = {}) {
		let n = e.trim();
		if (t.signal?.aborted) return _b;
		if (!n) return {
			ok: !0,
			groups: [],
			query: n
		};
		let r = [], i = this.filesystem.getFileTree();
		(this.flattenedCache === null || this.lastFileTreeRef !== i) && (this.flattenedCache = vb(i), this.lastFileTreeRef = i);
		for (let e of this.flattenedCache) {
			if (t.signal?.aborted) return _b;
			if (e.type !== "file") continue;
			let i = [];
			yb(e.name, n) && i.push({
				kind: "filename",
				lineNumber: 1,
				preview: e.name
			});
			let a = this.filesystem.readFile(e.path);
			if (a.ok) {
				let e = a.content.split(/\r?\n/);
				for (let [r, a] of e.entries()) {
					if (t.signal?.aborted) return _b;
					yb(a, n) && i.push({
						kind: "content",
						lineNumber: r + 1,
						preview: a.trim() || a
					});
				}
			}
			i.length > 0 && r.push({
				matches: i,
				name: e.name,
				path: e.path
			});
		}
		return {
			ok: !0,
			groups: r,
			query: n
		};
	}
}(), xb = {
	class: "search-view",
	"data-testid": "search-view"
}, Sb = { class: "search-view__box" }, Cb = {
	key: 0,
	class: "search-view__empty"
}, wb = {
	key: 0,
	class: "search-view__group"
}, Tb = ["onClick"], Eb = { class: "search-view__line" }, Db = { class: "search-view__preview" }, Ob = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "SearchView",
	props: { executeCommand: { type: Function } },
	setup(t) {
		let r = t, i = n(""), a = j(() => bb.search(i.value)), o = j(() => a.value.ok ? a.value.groups : []), s = j(() => o.value.flatMap((e) => [{
			type: "group",
			group: e
		}, ...e.matches.map((t) => ({
			type: "match",
			group: e,
			match: t
		}))])), { list: c, containerProps: l, wrapperProps: u } = dt(s, {
			itemHeight: 30,
			overscan: 8
		}), d = (e, t) => r.executeCommand?.(e, t) ?? Ep.execute(e, t), p = async (e) => {
			await d("search.openResult", { path: e.path });
		};
		return (t, n) => (f(), I("section", xb, [G("div", Sb, [D(X, {
			name: "search",
			decorative: ""
		}), H(G("input", {
			"onUpdate:modelValue": n[0] ||= (e) => i.value = e,
			"data-testid": "search-input",
			type: "search",
			autocomplete: "off",
			spellcheck: "false",
			placeholder: "搜索"
		}, null, 512), [[B, i.value]])]), i.value.trim() && s.value.length === 0 ? (f(), I("div", Cb, " 未找到结果。 ")) : (f(), I("div", h({
			key: 1,
			class: "search-view__results"
		}, e(l)), [G("div", V(de(e(u))), [(f(!0), I(z, null, S(e(c), ({ data: e }) => (f(), I(z, { key: e.type === "group" ? e.group.path : `${e.group.path}:${e.match.lineNumber}:${e.match.preview}` }, [e.type === "group" ? (f(), I("div", wb, [
			D(X, {
				name: "file",
				decorative: ""
			}),
			G("span", null, K(e.group.name), 1),
			G("small", null, K(e.group.path), 1)
		])) : (f(), I("button", {
			key: 1,
			class: "search-view__result",
			type: "button",
			"data-testid": "search-result",
			onClick: (t) => p(e.group)
		}, [G("span", Eb, K(e.match.lineNumber), 1), G("span", Db, K(e.match.preview), 1)], 8, Tb))], 64))), 128))], 16)], 16))]));
	}
}), [["__scopeId", "data-v-425c1e60"]]), kb = {
	class: "side-bar",
	"data-testid": "sidebar"
}, Ab = { class: "side-bar__header" }, jb = {
	key: 2,
	class: "side-bar__placeholder"
}, Mb = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "SideBar",
	setup(t) {
		let n = Jt(), r = j(() => n.activeActivity === "settings" || n.activeActivity === "keybindings" ? "设置" : n.activeActivity === "search" ? "搜索" : "资源管理器");
		return (t, i) => (f(), I("aside", kb, [G("header", Ab, [G("span", null, K(r.value), 1)]), e(n).activeActivity === "explorer" ? (f(), J(e(Ed), { key: 0 })) : e(n).activeActivity === "search" ? (f(), J(e(Ob), { key: 1 })) : (f(), I("div", jb, K(r.value), 1))]));
	}
}), [["__scopeId", "data-v-6a1f179e"]]), Nb = {
	class: "status-bar",
	"data-testid": "statusbar"
}, Pb = [
	"id",
	"data-testid",
	"data-statusbar-item-id",
	"data-statusbar-action-id",
	"title",
	"aria-label",
	"onClick"
], Fb = [
	"id",
	"data-testid",
	"data-statusbar-item-id",
	"data-statusbar-action-id",
	"title",
	"aria-label",
	"onClick"
], Ib = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "StatusBar",
	setup(e) {
		let t = Xt(), r = jr(), i = n(0), a, s = j(() => t.activeEditorStatus), c = j(() => t.tabs.find((e) => e.id === t.activeTabId) ?? null), l = (e) => r.values[e] !== !1, u = j(() => s.value !== null), d = j(() => !!(c.value?.path && Fn(c.value.path))), p = j(() => {
			let e = s.value?.cursor;
			return e ? `行 ${e.lineNumber}, 列 ${e.column}` : "";
		}), m = j(() => {
			let e = s.value?.indentation;
			return e ? `${e.insertSpaces ? "空格" : "Tab"}: ${e.tabSize}` : "";
		}), h = j(() => s.value?.encoding ?? ""), _ = j(() => s.value?.eol ?? ""), v = j(() => It(s.value?.language)), y = j(() => (i.value, Fp.getCounts())), b = j(() => {
			let e = y.value;
			return `${e.error} 个错误 ${e.warning} 个警告`;
		}), x = async (e) => {
			await Ep.execute(e);
		}, C = (e) => ({
			id: e,
			run: () => x(e)
		}), w = (e) => {
			let n = c.value;
			if (!(!n || !d.value)) {
				if (e === "preview") {
					t.setTabPresentation(n.id, {
						contentStatus: "ready",
						kind: "image-preview",
						language: "image"
					});
					return;
				}
				t.setTabPresentation(n.id, {
					contentStatus: "loading",
					kind: "text",
					language: "xml"
				}), To.loadFileContent(n.id);
			}
		}, T = [
			{
				id: "problems",
				placement: "left",
				settingKey: "workbench.statusBar.problems.visible",
				testId: "problems-status",
				label: () => b.value,
				action: () => C("workbench.action.openProblems")
			},
			{
				id: "svg-editor-mode",
				placement: "right",
				testId: "statusbar-svg-editor-mode",
				icon: "code",
				label: () => "查看源码",
				title: () => "查看 SVG 源码",
				ariaLabel: () => "查看 SVG 源码",
				visible: () => d.value && c.value?.kind === "image-preview",
				action: () => ({
					id: "statusbar.svg.editor",
					run: () => w("editor")
				})
			},
			{
				id: "svg-preview-mode",
				placement: "right",
				testId: "statusbar-svg-preview-mode",
				icon: "preview",
				label: () => "预览图片",
				title: () => "预览 SVG 图片",
				ariaLabel: () => "预览 SVG 图片",
				visible: () => d.value && c.value?.kind !== "image-preview",
				action: () => ({
					id: "statusbar.svg.preview",
					run: () => w("preview")
				})
			},
			{
				id: "cursor",
				placement: "right",
				settingKey: "workbench.statusBar.cursor.visible",
				label: () => p.value,
				visible: () => u.value,
				action: () => C("editor.action.goToLine")
			},
			{
				id: "indentation",
				placement: "right",
				settingKey: "workbench.statusBar.indentation.visible",
				label: () => m.value,
				visible: () => u.value,
				action: () => C("editor.action.selectIndentation")
			},
			{
				id: "encoding",
				placement: "right",
				settingKey: "workbench.statusBar.encoding.visible",
				label: () => h.value,
				visible: () => u.value
			},
			{
				id: "language",
				placement: "right",
				settingKey: "workbench.statusBar.language.visible",
				label: () => v.value,
				visible: () => u.value,
				action: () => C("editor.action.selectLanguage")
			},
			{
				id: "eol",
				placement: "right",
				settingKey: "workbench.statusBar.eol.visible",
				label: () => _.value,
				visible: () => u.value
			}
		], E = j(() => T.flatMap((e) => {
			if (e.settingKey && !l(e.settingKey) || e.visible && !e.visible()) return [];
			let t = e.label(), n = e.title?.(), r = e.ariaLabel?.() ?? n ?? t;
			return [{
				id: e.id,
				placement: e.placement,
				testId: e.testId,
				icon: e.icon,
				label: t,
				title: n,
				ariaLabel: r,
				action: e.action?.()
			}];
		})), D = j(() => E.value.filter((e) => e.placement === "left")), O = j(() => E.value.filter((e) => e.placement === "right")), k = async (e) => {
			await e.action?.run();
		};
		return o(() => {
			a = Fp.onDidChange(() => {
				i.value += 1;
			});
		}), g(() => {
			a?.();
		}), (e, t) => (f(), I("footer", Nb, [
			(f(!0), I(z, null, S(D.value, (e) => (f(), I("button", {
				id: `statusbar-item-${e.id}`,
				key: e.id,
				class: "status-bar__item",
				type: "button",
				"data-testid": e.testId,
				"data-statusbar-item-id": e.id,
				"data-statusbar-action-id": e.action?.id,
				title: e.title,
				"aria-label": e.ariaLabel,
				onClick: (t) => k(e)
			}, [e.icon ? (f(), J(X, {
				key: 0,
				name: e.icon,
				decorative: ""
			}, null, 8, ["name"])) : N("", !0), G("span", null, K(e.label), 1)], 8, Pb))), 128)),
			t[0] ||= G("div", { class: "status-bar__spacer" }, null, -1),
			(f(!0), I(z, null, S(O.value, (e) => (f(), I("button", {
				id: `statusbar-item-${e.id}`,
				key: e.id,
				class: "status-bar__item",
				type: "button",
				"data-testid": e.testId,
				"data-statusbar-item-id": e.id,
				"data-statusbar-action-id": e.action?.id,
				title: e.title,
				"aria-label": e.ariaLabel,
				onClick: (t) => k(e)
			}, [e.icon ? (f(), J(X, {
				key: 0,
				name: e.icon,
				decorative: ""
			}, null, 8, ["name"])) : N("", !0), G("span", null, K(e.label), 1)], 8, Fb))), 128))
		]));
	}
}), [["__scopeId", "data-v-18478249"]]), Lb = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%3e%3cpath%20fill='%232196f3'%20d='M11.5%2011.19V4.8L7.3%207.99M1.17%206.07a.6.6%200%200%201-.01-.81L2%204.48c.14-.13.48-.18.73%200l2.39%201.83%205.55-5.09c.22-.22.61-.32%201.05-.08l2.8%201.34c.25.15.49.38.49.81v9.49c0%20.28-.2.58-.42.7l-3.08%201.48c-.22.09-.64%200-.79-.14L5.11%209.69l-2.38%201.83c-.27.18-.6.13-.74%200l-.84-.77c-.22-.23-.2-.61.04-.84l2.1-1.9'/%3e%3c/svg%3e", Rb = ["onKeydown"], zb = { class: "titlebar__leading" }, Bb = ["src"], Vb = {
	class: "titlebar__menus",
	role: "menubar",
	"aria-label": "窗口菜单"
}, Hb = [
	"aria-expanded",
	"aria-controls",
	"onClick"
], Ub = ["id"], Wb = { class: "monaco-scrollable-element ide-monaco-menu__surface titlebar__submenu-surface" }, Gb = ["title"], Kb = {
	class: "titlebar__window-actions",
	"aria-label": "窗口操作"
}, qb = [
	"aria-label",
	"data-action-id",
	"data-testid",
	"title",
	"onClick"
], Jb = 13, Yb = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "TitleBar",
	props: {
		hideWindowControls: { type: Boolean },
		onRequestMinimize: { type: Function }
	},
	setup(r) {
		let i = r, a = async (e, t) => {
			await Ep.execute(e, t);
		}, s = Gt.stateRef, c = j(() => !s.value.policy.terminalEnabled), l = fg(), u = Jt(), d = Xt(), p = n(null), m = n(null), h = j(() => {
			let e = d.tabs.find((e) => e.id === d.activeTabId);
			return {
				label: e?.title ?? "",
				title: e?.path ?? ""
			};
		}), _ = j(() => l.mode === "windowed" ? {
			ariaLabel: "最大化",
			icon: "chrome-maximize",
			iconSize: Jb,
			id: "titlebar-window-maximize",
			windowAction: "maximize"
		} : {
			ariaLabel: "还原",
			icon: "chrome-restore",
			iconSize: 15,
			id: "titlebar-window-restore",
			windowAction: "restore"
		}), v = j(() => [
			{
				label: "文件",
				actions: [
					{
						label: "打开文件",
						commandId: "file.open",
						payload: {
							path: "/src/main.ts",
							title: "main.ts",
							language: "typescript"
						}
					},
					{
						label: "保存",
						commandId: "file.save"
					},
					{
						label: "快速打开",
						commandId: "workbench.action.quickOpen"
					}
				]
			},
			{
				label: "编辑",
				actions: [{
					label: "命令面板",
					commandId: "workbench.action.showCommands"
				}, {
					label: "打开设置 JSON",
					commandId: "workbench.action.openSettingsJson"
				}]
			},
			{
				label: "选择",
				actions: [{
					label: "选择缩进",
					commandId: "editor.action.selectIndentation"
				}, {
					label: "选择语言",
					commandId: "editor.action.selectLanguage"
				}]
			},
			{
				label: "查看",
				actions: [
					{
						label: "资源管理器",
						commandId: "workbench.action.openExplorer"
					},
					{
						label: "搜索",
						commandId: "workbench.action.openSearch"
					},
					{
						label: "切换侧边栏",
						commandId: "workbench.action.toggleSidebarVisibility"
					},
					{
						label: "切换面板",
						commandId: "workbench.action.togglePanel"
					},
					{
						label: "性能检测",
						commandId: "workbench.action.togglePerformanceMonitor"
					}
				]
			},
			{
				label: "转到",
				actions: [{
					label: "转到行",
					commandId: "editor.action.goToLine"
				}, {
					label: "快速打开",
					commandId: "workbench.action.quickOpen"
				}]
			},
			{
				label: "运行",
				actions: [{
					label: "打开终端",
					commandId: "workbench.action.openTerminal",
					disabled: c.value
				}, {
					label: "运行稳定性检查",
					commandId: "workbench.action.runP4StabilityCheck"
				}]
			},
			{
				label: "终端",
				actions: [{
					label: "新建终端",
					commandId: "workbench.action.openTerminal",
					disabled: c.value
				}]
			},
			{
				label: "窗口",
				actions: [
					{
						label: "切换侧边栏",
						commandId: "workbench.action.toggleSidebarVisibility"
					},
					{
						label: "切换底部面板",
						commandId: "workbench.action.togglePanel"
					},
					{
						label: "打开 AI 面板",
						commandId: "workbench.action.openAIPanel"
					}
				]
			},
			{
				label: "帮助",
				actions: [{
					label: "键盘快捷方式",
					commandId: "workbench.action.openKeyboardShortcuts"
				}, {
					label: "命令面板",
					commandId: "workbench.action.showCommands"
				}]
			}
		]), y = j(() => [
			{
				ariaLabel: "切换左侧栏",
				icon: u.sidebar.visible ? "layout-sidebar-left" : "layout-sidebar-left-off",
				iconSize: Jb,
				id: "titlebar-window-toggle-sidebar",
				commandId: "workbench.action.toggleSidebarVisibility"
			},
			{
				ariaLabel: "切换底部面板",
				icon: u.panel.visible ? "layout-panel" : "layout-panel-off",
				iconSize: Jb,
				id: "titlebar-window-toggle-bottom-panel",
				commandId: "workbench.action.togglePanel"
			},
			{
				ariaLabel: "切换右侧栏",
				icon: u.rightPanel.visible ? "layout-sidebar-right" : "layout-sidebar-right-off",
				iconSize: Jb,
				id: "titlebar-window-toggle-right-panel",
				commandId: "workbench.action.toggleRightPanel"
			},
			...i.hideWindowControls ? [] : [
				{
					ariaLabel: "最小化",
					icon: "chrome-minimize",
					iconSize: Jb,
					id: "titlebar-window-minimize",
					windowAction: "minimize"
				},
				_.value,
				{
					ariaLabel: "关闭",
					icon: "chrome-close",
					danger: !0,
					iconSize: Jb,
					id: "titlebar-window-close",
					windowAction: "close"
				}
			]
		]), b = () => {
			m.value = null;
		}, x = (e) => {
			m.value = m.value === e ? null : e;
		}, C = (e, t) => ({
			commandId: t.commandId,
			disabled: t.disabled,
			id: t.commandId ?? `${e.label}:${t.label}`,
			label: t.label,
			payload: t.payload
		}), w = (e) => e.actions.map((t) => C(e, t)), T = (e) => {
			let t = e.target;
			t instanceof Node && p.value?.contains(t) || b();
		};
		o(() => {
			document.addEventListener("pointerdown", T);
		}), g(() => {
			document.removeEventListener("pointerdown", T);
		});
		let E = (e) => {
			e.disabled || !e.commandId || (b(), a(e.commandId, e.payload));
		}, O = (e) => {
			if (e.windowAction === "minimize") {
				if (i.onRequestMinimize) {
					i.onRequestMinimize();
					return;
				}
				l.minimize();
				return;
			}
			if (e.windowAction === "maximize") {
				l.maximize();
				return;
			}
			if (e.windowAction === "restore") {
				l.restore();
				return;
			}
			if (e.windowAction === "close") {
				l.close();
				return;
			}
			e.commandId && a(e.commandId);
		};
		return (n, r) => (f(), I("header", {
			ref_key: "titlebarRef",
			ref: p,
			class: "titlebar",
			"data-testid": "titlebar",
			onKeydown: le(P(b, ["stop", "prevent"]), ["escape"])
		}, [
			G("div", zb, [G("img", {
				class: "titlebar__app-icon",
				src: e(Lb),
				alt: "编辑器图标",
				draggable: "false"
			}, null, 8, Bb), G("nav", Vb, [(f(!0), I(z, null, S(v.value, (n, r) => (f(), I("div", {
				key: n.label,
				class: t(["titlebar__menu-group", { "titlebar__menu-group--open": m.value === n.label }])
			}, [G("button", {
				class: "titlebar__menu-button",
				type: "button",
				role: "menuitem",
				"aria-haspopup": "true",
				"aria-expanded": m.value === n.label ? "true" : "false",
				"aria-controls": `titlebar-submenu-${r}`,
				onClick: P((e) => x(n.label), ["stop"])
			}, K(n.label), 9, Hb), G("div", {
				id: `titlebar-submenu-${r}`,
				class: "titlebar__submenu context-view monaco-menu-container ide-monaco-menu",
				role: "presentation"
			}, [G("div", Wb, [D(e(Xs), {
				items: w(n),
				"item-class": "titlebar__submenu-item",
				"divider-class": "titlebar__submenu-separator",
				"surface-class": "titlebar__submenu-surface",
				onSelect: E
			}, null, 8, ["items"])])], 8, Ub)], 2))), 128))])]),
			G("div", {
				class: "titlebar__brand",
				title: h.value.title
			}, K(h.value.label), 9, Gb),
			G("nav", Kb, [(f(!0), I(z, null, S(y.value, (e) => (f(), I("button", {
				key: e.id,
				class: t(["titlebar__window-action", { "titlebar__window-action--danger": e.danger }]),
				type: "button",
				"aria-label": e.ariaLabel,
				"data-action-id": e.id,
				"data-testid": e.id,
				title: e.ariaLabel,
				onClick: (t) => O(e)
			}, [D(X, {
				name: e.icon,
				size: e.iconSize,
				decorative: ""
			}, null, 8, ["name", "size"])], 10, qb))), 128))])
		], 40, Rb));
	}
}), [["__scopeId", "data-v-3d9f1734"]]), Xb = ["aria-busy"], Zb = {
	class: "workbench-startup-overlay__frame",
	"aria-hidden": "true"
}, Qb = { class: "workbench-startup-overlay__sidebar" }, $b = {
	class: "workbench-startup-overlay__content",
	"aria-label": "Monaco Editor 初始化状态"
}, ex = { class: "workbench-startup-overlay__header" }, tx = {
	key: 0,
	class: "workbench-startup-overlay__error"
}, nx = {
	key: 1,
	class: "workbench-startup-overlay__hint"
}, rx = {
	class: "workbench-startup-overlay__progress",
	"aria-hidden": "true"
}, ix = { class: "workbench-startup-overlay__phases" }, ax = { class: "workbench-startup-overlay__phase-copy" }, ox = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "WorkbenchStartupOverlay",
	setup(n) {
		let r = cg(), i = jo(), a = j(() => og.map((e, t) => r.status === "error" && t === r.activePhaseIndex ? {
			...e,
			state: "error"
		} : t < r.activePhaseIndex ? {
			...e,
			state: "done"
		} : t === r.activePhaseIndex ? {
			...e,
			state: "active"
		} : {
			...e,
			state: "pending"
		})), o = j(() => `${(r.activePhaseIndex + 1) / og.length * 100}%`), s = j(() => r.status === "error" ? "初始化未完成" : r.currentStatusText), c = () => {
			window.location.reload();
		};
		return W(() => r.shouldShowWelcomeMessage, (e) => {
			e && (i.success("初始化完成，欢迎使用 Monaco Editor"), r.markWelcomeMessageShown());
		}, { immediate: !0 }), (n, i) => e(r).status === "ready" ? N("", !0) : (f(), I("div", {
			key: 0,
			class: "workbench-startup-overlay",
			"data-testid": "workbench-startup-overlay",
			role: "status",
			"aria-busy": e(r).status === "booting",
			"aria-live": "polite"
		}, [G("div", Zb, [
			i[0] ||= G("div", { class: "workbench-startup-overlay__activitybar" }, null, -1),
			G("div", Qb, [(f(!0), I(z, null, S(e(og), (e) => (f(), I("span", { key: e.id }))), 128))]),
			i[1] ||= G("div", { class: "workbench-startup-overlay__editor" }, [
				G("span"),
				G("span"),
				G("span")
			], -1)
		]), G("section", $b, [
			G("div", ex, [
				i[2] ||= G("p", { class: "workbench-startup-overlay__eyebrow" }, "Monaco Editor", -1),
				G("h2", null, K(s.value), 1),
				e(r).status === "error" ? (f(), I("p", tx, K(e(r).errorMessage), 1)) : (f(), I("p", nx, "工作台框架已优先呈现，初始化结束前暂时锁定所有编辑器操作。"))
			]),
			G("div", rx, [G("span", { style: p({ width: o.value }) }, null, 4)]),
			G("ol", ix, [(f(!0), I(z, null, S(a.value, (e) => (f(), I("li", {
				key: e.id,
				class: t(["workbench-startup-overlay__phase", `workbench-startup-overlay__phase--${e.state}`])
			}, [i[3] ||= G("span", {
				class: "workbench-startup-overlay__phase-marker",
				"aria-hidden": "true"
			}, null, -1), G("span", ax, [G("strong", null, K(e.label), 1), G("small", null, K(e.description), 1)])], 2))), 128))]),
			e(r).status === "error" ? (f(), I("button", {
				key: 0,
				class: "workbench-startup-overlay__retry",
				type: "button",
				onClick: c
			}, " 重新加载 ")) : N("", !0)
		])], 8, Xb));
	}
}), [["__scopeId", "data-v-d466a249"]]), sx = { class: "workbench-shell__editor-stack" }, cx = {
	class: "workbench-shell__right-panel workbench-shell__right-panel--fixed-min-width",
	"aria-label": "AI 面板"
}, lx = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	__name: "WorkbenchShell",
	props: {
		hideWindowControls: { type: Boolean },
		onRequestMinimize: { type: Function }
	},
	setup(n) {
		let r = Jt(), i = ft(), a = jr(), s = Ds(), c = cg(), l = j(() => r.performanceMonitor.visible), u = j(() => s.dragging && s.activeHandle === "rightPanel"), d = j(() => a.values["workbench.statusBar.visible"] !== !1), m = j(() => r.panel.visible && s.bottomPanel.height >= ig.bottomPanel.max), h = j(() => {
			let e = ig.rightPanel;
			return Math.min(e.max, Math.max(e.min, s.rightPanel.width));
		}), _ = j(() => ({
			"--workbench-sidebar-width": r.sidebar.visible ? `${s.sidebar.width}px` : "0px",
			"--workbench-sidebar-splitter-width": r.sidebar.visible ? "var(--ide-splitter-size)" : "0px",
			"--workbench-panel-height": r.panel.visible ? `${s.bottomPanel.height}px` : "0px",
			"--workbench-panel-splitter-height": r.panel.visible ? "var(--ide-splitter-size)" : "0px",
			"--workbench-right-panel-splitter-width": r.rightPanel.visible ? "var(--ide-splitter-size)" : "0px",
			"--workbench-right-panel-min-width": r.rightPanel.visible ? `${ig.rightPanel.min}px` : "0px",
			"--workbench-right-panel-width": r.rightPanel.visible ? `${h.value}px` : "0px",
			"--workbench-statusbar-height": d.value ? "var(--ide-statusbar-height)" : "0px"
		})), v = (e) => {
			let t = gt.findCommandByKeyboardEvent(e, i.commands);
			t && (e.preventDefault(), !c.isInteractionLocked && Ep.execute(t.id));
		};
		return o(() => {
			document.addEventListener("keydown", v);
		}), g(() => {
			document.removeEventListener("keydown", v);
		}), (i, a) => (f(), I("div", {
			class: t(["workbench-shell", { "workbench-shell--bottom-panel-fullscreen": m.value }]),
			"data-testid": "workbench-shell",
			style: p(_.value)
		}, [
			D(Yb, {
				"hide-window-controls": n.hideWindowControls,
				"on-request-minimize": n.onRequestMinimize
			}, null, 8, ["hide-window-controls", "on-request-minimize"]),
			G("div", { class: t(["workbench-shell__main", { "workbench-shell__main--resizing-right-panel": u.value }]) }, [
				D(Vv, { class: "workbench-shell__activitybar" }),
				H(D(Mb, { class: "workbench-shell__sidebar" }, null, 512), [[k, e(r).sidebar.visible]]),
				H(D(e(Qh), {
					class: "workbench-shell__sidebar-splitter",
					handle: "sidebar",
					orientation: "vertical"
				}, null, 512), [[k, e(r).sidebar.visible]]),
				G("div", sx, [
					D(Ly, { class: "workbench-shell__editor-area" }),
					H(D(e(Qh), {
						class: "workbench-shell__bottom-panel-splitter",
						handle: "bottomPanel",
						orientation: "horizontal"
					}, null, 512), [[k, e(r).panel.visible]]),
					H(D(gb, { class: "workbench-shell__bottom-panel" }, null, 512), [[k, e(r).panel.visible]])
				]),
				H(D(e(Qh), {
					class: "workbench-shell__right-panel-splitter",
					handle: "rightPanel",
					orientation: "vertical"
				}, null, 512), [[k, e(r).rightPanel.visible]]),
				H(G("aside", cx, [e(r).rightPanel.visible ? (f(), J(e(fh), { key: 0 })) : N("", !0)], 512), [[k, e(r).rightPanel.visible]])
			], 2),
			d.value ? (f(), J(Ib, { key: 0 })) : N("", !0),
			D(e(Mp)),
			D(e(Pc)),
			D(e(Ef)),
			D(ox),
			(f(), J(O, { to: "body" }, [l.value ? (f(), J(e(yp), { key: 0 })) : N("", !0)]))
		], 6));
	}
}), [["__scopeId", "data-v-76a25f7e"]]), ux = [
	"aria-label",
	"data-testid",
	"onPointerdown"
], dx = 420, fx = 32, px = 220, mx = /* @__PURE__ */ at(/* @__PURE__ */ Y({
	name: "EditorWindow",
	__name: "EditorWindow",
	props: {
		hideWindowControls: { type: Boolean },
		enableFrameSync: { type: Boolean },
		isMaximized: { type: Boolean },
		onFrameModeChange: { type: Function },
		onRequestClose: { type: Function },
		onRequestMinimize: { type: Function }
	},
	setup(n) {
		let r = n, i = fg(), a = cg(), s = lg.width, c = lg.height, l = d(null), u = d(null), m = d("capture"), h = null, _ = null, v = null, y = 0, b = 0, x = { ...i.rect }, C = 0, w = { ...i.rect }, T = { ...i.rect }, E = null, O = null, k = null, A = null, P = () => ({
			width: Math.max(document.documentElement.clientWidth, s),
			height: Math.max(document.documentElement.clientHeight, c)
		}), F = (e) => {
			let t = P(), n = Math.min(Math.max(e.width, s), t.width), r = Math.min(Math.max(e.height, c), t.height);
			return {
				x: Math.min(Math.max(e.x, 0), Math.max(0, t.width - n)),
				y: Math.min(Math.max(e.y, 0), Math.max(0, t.height - r)),
				width: n,
				height: r
			};
		}, L = (e, t, n) => Math.min(Math.max(e, t), Math.max(t, n)), R = () => {
			let e = P(), t = i.restoreRect, n = Math.min(dx, e.width), r = fx;
			return {
				x: Math.min(Math.max(t.x, 0), Math.max(0, e.width - n)),
				y: Math.min(Math.max(t.y, 0), Math.max(0, e.height - r)),
				width: n,
				height: r
			};
		}, B = j(() => {
			if (i.mode === "maximized") return {
				height: "100%",
				left: "0px",
				top: "0px",
				width: "100%"
			};
			let e = i.mode === "minimized" ? R() : i.rect;
			return {
				height: `${e.height}px`,
				left: `${e.x}px`,
				top: `${e.y}px`,
				width: `${e.width}px`
			};
		}), V = j(() => ({
			"ide-window--dragging": i.dragging,
			"ide-window--frame-released": m.value === "release",
			"ide-window--maximized": i.mode === "maximized",
			"ide-window--minimized": i.mode === "minimized",
			"ide-window--resizing": i.resizing
		})), te = j(() => i.mode !== "closed"), H = j(() => a.isInteractionLocked), ne = j(() => !!r.enableFrameSync), re = j(() => ne.value && m.value === "release"), U = j(() => u.value ?? "body"), ie = {
			position: "absolute",
			right: "18px",
			bottom: "calc(var(--ide-statusbar-height) + 18px)"
		}, K = j(() => B.value), ae = (e) => {
			if (H.value || i.mode !== "windowed") return !1;
			let t = e.target;
			return !(t instanceof HTMLElement) || !t.closest(".titlebar") ? !1 : !t.closest("button, [role='menu'], .titlebar__submenu");
		}, q = () => {
			let e = l.value;
			if (!e || !te.value) return;
			let t = e.getBoundingClientRect();
			if (!(t.width <= 0 || t.height <= 0)) return {
				left: t.left,
				top: t.top,
				width: t.width,
				height: t.height
			};
		}, oe = () => k ?? m.value, se = (e) => {
			k = e, O === null && (O = window.requestAnimationFrame(() => {
				O = null, k &&= (m.value = k, null);
			}));
		}, ce = () => {
			O !== null && window.cancelAnimationFrame(O), O = null, k = null;
		}, J = () => {
			A !== null && window.clearTimeout(A), A = null;
		}, le = () => {
			if (A = null, !ne.value || oe() === "release" || _ || i.dragging || i.resizing) return;
			if (i.mode === "maximized") {
				Y();
				return;
			}
			let e = q();
			e && (r.onFrameModeChange?.("release", e), se("release"));
		}, Y = () => {
			ne.value && (J(), oe() !== "capture" && (r.onFrameModeChange?.("capture"), se("capture")));
		}, ue = () => {
			ne.value && oe() !== "release" && A === null && (A = window.setTimeout(le, px));
		}, de = (e) => F({
			...x,
			x: x.x + e.clientX - y,
			y: x.y + e.clientY - b
		}), fe = (e) => {
			if (!v) return x;
			let t = e.clientX - y, n = e.clientY - b, r = P(), i = x.x + x.width, a = x.y + x.height, o = { ...x };
			return v.includes("e") && (o.width = L(x.width + t, s, r.width - x.x)), v.includes("s") && (o.height = L(x.height + n, c, r.height - x.y)), v.includes("w") && (o.width = L(x.width - t, s, i), o.x = i - o.width), v.includes("n") && (o.height = L(x.height - n, c, a), o.y = a - o.height), o;
		}, pe = () => {
			let e = l.value;
			e && (e.style.transform = "", e.style.willChange = "");
		}, me = () => {
			C = 0;
			let e = l.value;
			if (!e) return;
			let t = w.x - x.x, n = w.y - x.y;
			e.style.transform = `translate3d(${t}px, ${n}px, 0)`;
		}, he = () => {
			C = 0;
			let e = l.value;
			e && (e.style.left = `${T.x}px`, e.style.top = `${T.y}px`, e.style.width = `${T.width}px`, e.style.height = `${T.height}px`);
		}, ge = (e) => {
			C ||= window.requestAnimationFrame(e);
		}, _e = () => {
			C &&= (window.cancelAnimationFrame(C), 0);
		}, ve = () => {
			_ === "drag" && i.stopDrag(), _ === "resize" && i.stopResize(), h = null, _ = null, v = null, _e(), pe();
		}, ye = (e) => {
			ae(e) && (e.preventDefault(), Y(), h = e.pointerId, _ = "drag", y = e.clientX, b = e.clientY, x = { ...i.rect }, w = { ...x }, i.startDrag(), l.value && (l.value.style.willChange = "transform"), e.currentTarget.setPointerCapture?.(e.pointerId));
		}, be = (e, t) => {
			H.value || i.mode === "windowed" && (e.preventDefault(), Y(), h = e.pointerId, _ = "resize", v = t, y = e.clientX, b = e.clientY, x = { ...i.rect }, T = { ...x }, i.startResize(), l.value && (l.value.style.willChange = "left, top, width, height"), e.currentTarget.setPointerCapture?.(e.pointerId));
		}, xe = (e) => {
			w = de(e), ge(me);
		}, Se = (e) => {
			T = fe(e), ge(he);
		}, Ce = (e) => {
			if (!(h !== e.pointerId || !_)) {
				if (e.preventDefault(), _ === "drag") {
					xe(e);
					return;
				}
				Se(e);
			}
		}, we = (e) => {
			if (h === e.pointerId) {
				if (e.preventDefault(), _ === "drag") {
					let t = de(e);
					_e(), pe(), i.setRect(t);
				} else if (_ === "resize") {
					let t = fe(e);
					_e(), l.value && (l.value.style.willChange = ""), i.setRect(t);
				}
				ve();
			}
		}, Te = () => {
			if (i.mode === "maximized" || i.mode === "closed") return;
			let e = F(i.mode === "minimized" ? i.restoreRect : i.rect);
			i.setRect(e), i.mode === "minimized" && (i.restoreRect = { ...e });
		}, Ee = () => {
			re.value || (E !== null && window.clearTimeout(E), E = window.setTimeout(() => {
				E = null, Te();
			}, 160));
		};
		return o(() => {
			r.isMaximized && i.maximize(), Te(), window.addEventListener("resize", Ee);
		}), g(() => {
			ve(), J(), ce(), E !== null && window.clearTimeout(E), window.removeEventListener("resize", Ee);
		}), W(() => i.mode, async (e) => {
			if (ne.value) {
				if (e === "maximized") {
					Y();
					return;
				}
				(e === "closed" || e === "minimized") && (await ee(), ue());
			}
		}), W(() => i.mode, (e) => {
			e === "closed" && r.onRequestClose?.();
		}), (r, i) => (f(), I("div", { class: t(["editor-window-layer", { "editor-window-layer--frame-sync": ne.value }]) }, [ne.value ? (f(), I("div", {
			key: 0,
			class: "editor-window-frame-mask",
			"data-testid": "monaco-frame-mask",
			onMouseenter: ue,
			onMousemove: ue
		}, null, 32)) : N("", !0), te.value ? (f(), I("main", {
			key: 1,
			ref_key: "windowElementRef",
			ref: l,
			class: t(["ide-window", V.value]),
			style: p(K.value),
			"data-testid": "ide-window",
			"aria-label": "编辑器窗口",
			onPointerenter: Y,
			onPointerdown: ye,
			onPointermove: Ce,
			onPointerup: we,
			onPointercancel: we
		}, [
			G("div", {
				ref_key: "messageRootRef",
				ref: u,
				class: "ide-window__message-root",
				"data-testid": "ide-window-message-root"
			}, null, 512),
			D(e(Dc), {
				to: U.value,
				placement: "bottom-right",
				max: 4,
				"container-style": ie
			}, {
				default: M(() => [D(lx, {
					"hide-window-controls": n.hideWindowControls,
					"on-request-minimize": n.onRequestMinimize
				}, null, 8, ["hide-window-controls", "on-request-minimize"])]),
				_: 1
			}, 8, ["to"]),
			(f(), I(z, null, S([
				"e",
				"s",
				"w",
				"ne",
				"nw",
				"se",
				"sw"
			], (e) => G("div", {
				key: e,
				class: t(["ide-window__resize-handle", `ide-window__resize-handle--${e}`]),
				role: "separator",
				"aria-label": `调整窗口大小 ${e}`,
				"data-testid": `window-resize-${e}`,
				onPointerdown: (t) => be(t, e)
			}, null, 42, ux)), 64))
		], 38)) : N("", !0)], 2));
	}
}), [["__scopeId", "data-v-fda1fa77"]]), hx = /* @__PURE__ */ Y({
	__name: "App",
	props: {
		isPanelRemote: { type: Boolean },
		isWindow: { type: Boolean },
		isMaximized: { type: Boolean },
		windowId: {},
		initialFile: {},
		rootPath: {},
		hideWindowControls: { type: Boolean },
		enableFrameSync: { type: Boolean },
		onFrameModeChange: { type: Function },
		onRequestClose: { type: Function },
		onRequestMinimize: { type: Function }
	},
	setup(t) {
		return (n, r) => t.isPanelRemote ? (f(), J(mx, {
			key: 0,
			"hide-window-controls": t.hideWindowControls,
			"is-maximized": t.isMaximized,
			"enable-frame-sync": t.enableFrameSync,
			"on-frame-mode-change": t.onFrameModeChange,
			"on-request-close": t.onRequestClose,
			"on-request-minimize": t.onRequestMinimize
		}, null, 8, [
			"hide-window-controls",
			"is-maximized",
			"enable-frame-sync",
			"on-frame-mode-change",
			"on-request-close",
			"on-request-minimize"
		])) : (f(), J(e(Lv), { key: 1 }, {
			editor: M(() => [D(mx)]),
			_: 1
		}));
	}
}), gx = 1e4, _x = {
	now: () => performance.now(),
	sleep: (e) => new Promise((t) => {
		setTimeout(t, e);
	})
}, vx = (e, t) => {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	return !Number.isFinite(n) || n < 0 ? t : Math.min(Math.round(n), gx);
}, yx = (e = {}, t = {
	BASE_URL: "./",
	DEV: !1,
	MODE: "build",
	PROD: !0,
	SSR: !1,
	VITE_CJS_IGNORE_WARNING: "true"
}) => vx(e.startupDelayMs ?? t.VITE_MONACO_STARTUP_DELAY_MS, 300), bx = async (e, t, n = _x) => {
	let r = t - Math.max(0, n.now() - e);
	r <= 0 || await n.sleep(r);
}, xx = (e) => e.trim().startsWith("/") ? e : "/", Sx = (e) => {
	let t = e.lastIndexOf("/");
	return t <= 0 ? "/" : e.slice(0, t);
}, Cx = (e) => e.split("/").filter(Boolean).at(-1) ?? e, wx = (e) => e.endsWith(".ts") || e.endsWith(".tsx") ? "typescript" : e.endsWith(".js") || e.endsWith(".jsx") || e.endsWith(".mjs") ? "javascript" : e.endsWith(".vue") ? "vue" : e.endsWith(".json") ? "json" : e.endsWith(".md") ? "markdown" : e.endsWith(".css") ? "css" : e.endsWith(".html") ? "html" : e.endsWith(".yaml") || e.endsWith(".yml") ? "yaml" : "plaintext", Tx = (e) => ({
	id: "editor-api",
	name: "远程文件系统",
	kind: "remote",
	ready: !1,
	fallbackReason: e,
	capabilities: {
		create: !1,
		delete: !1,
		native: !1,
		rename: !1,
		watch: !1,
		write: !1
	}
}), Ex = (e) => e instanceof Error && e.message ? e.message : "未知错误", Dx = 180, Ox = () => {
	let e = document.getElementById("monaco-state");
	!e || e.classList.contains("is-hidden") || (e.classList.add("is-hiding"), e.setAttribute("aria-busy", "false"), window.setTimeout(() => {
		e.classList.add("is-hidden"), e.setAttribute("aria-hidden", "true");
	}, Dx));
}, kx = (e) => {
	e.use(({ store: e }) => {
		e.$subscribe(() => {
			jf.recordStoreUpdate();
		}, { detached: !0 });
	});
}, Ax = (e, t) => {
	Wr.register(Lr), Wr.register(zr);
	let n = new ri(Wr, ai, t, {
		editorShellThemeBridge: new Zr(t),
		monacoThemeBridge: new $r(_o),
		shikiThemeAdapter: new me(),
		syntaxThemes: Br
	}), r = (t) => {
		let r = String(t["workbench.colorTheme"] ?? "ide-dark"), i = String(t["workbench.editorTheme"] ?? "auto"), a = i && i !== "auto" ? i : Hr(r), o = (e) => {
			e.ok && e.monacoThemeId && Eo.updateTheme(e.monacoThemeId);
		};
		if (a in Br) {
			o(n.applyTheme(r, { syntaxThemeId: a }));
			return;
		}
		o(n.applyTheme(r, { syntaxThemeId: Hr(r) })), he(a).then((t) => {
			let i = jr(e).values, s = String(i["workbench.colorTheme"] ?? "ide-dark"), c = String(i["workbench.editorTheme"] ?? "auto"), l = c && c !== "auto" ? c : Hr(s);
			!t || s !== r || l !== a || o(n.applyTheme(r, {
				syntaxThemeId: a,
				syntaxTheme: t
			}));
		});
	}, i = new Si({
		applyTheme: (e, t) => {
			r(t);
		},
		updateEditorOptions: (e) => {
			Eo.updateOptions(e);
		}
	});
	return Eo.setSettingsJsonApplier(new Di(i)), Gh.registerProvider(new Wh()), Eo.setLanguageService(Gh), i.restorePersisted(e), Vh(Tp, e), pa(Tp, i, e), ni(Tp, Ep, e), rg(Tp, Ep, ag, e), {
		applyCurrentTheme: r,
		themeService: n
	};
}, jx = (e) => {
	let t = performance.now(), n = He(), r = te(hx, {
		isPanelRemote: e.runtime === "panel-remote" || !!e.isPanelRemote,
		isWindow: e.isWindow,
		windowId: e.windowId,
		isMaximized: e.isMaximized,
		initialFile: e.initialFile,
		rootPath: e.rootPath,
		hideWindowControls: e.hideWindowControls,
		enableFrameSync: e.enableFrameSync,
		onFrameModeChange: e.onFrameModeChange,
		onRequestClose: e.onRequestClose,
		onRequestMinimize: e.onRequestMinimize
	});
	kx(n), r.use(n);
	let { applyCurrentTheme: i, themeService: a } = Ax(n, e.themeTarget ?? document.documentElement);
	return {
		app: r,
		pinia: n,
		bootStartedAt: t,
		fileApiProviderKind: Ss({
			BASE_URL: "./",
			DEV: !1,
			MODE: "build",
			PROD: !0,
			SSR: !1,
			VITE_CJS_IGNORE_WARNING: "true"
		}, { forcedProvider: e.forceFileApiProvider }),
		themeService: a,
		applyCurrentTheme: i
	};
}, Mx = (e) => {
	let t = zt(e), n = Ia.getWorkspaceName(), r = Ia.getProviderStatus();
	t.setWorkspaceName(n), t.setCurrentDirectoryPath(xx(n)), t.setFileTree(Ia.getFileTree()), t.setExpandedFolderPaths(r.kind === "virtual" ? ["/src"] : []), t.setFileSystemProviderStatus(r), t.setFileTreeError(null);
}, Nx = (e, t) => {
	let n = zt(e.pinia);
	if (e.fileApiProviderKind !== "bt-panel") {
		Mx(e.pinia);
		return;
	}
	let r = t.rootPath || Sx(t.initialFile?.path ?? "/") || "/";
	n.setWorkspaceName(r), n.setCurrentDirectoryPath(xx(r)), n.setFileTree([]), n.setExpandedFolderPaths([]), n.setFileSystemProviderStatus(Tx()), n.setFileTreeLoading(!0), n.setFileTreeError(null);
}, Px = async (e, t) => {
	if (e.fileApiProviderKind !== "bt-panel") return;
	let n = new fs(new xs({
		endpoint: bs({
			BASE_URL: "./",
			DEV: !1,
			MODE: "build",
			PROD: !0,
			SSR: !1,
			VITE_CJS_IGNORE_WARNING: "true"
		}),
		rootPath: t.rootPath || Sx(t.initialFile?.path ?? "") || "/www/server/panel"
	}), { workspaceId: void 0 });
	await n.connect(), Ia.setProvider(n);
}, Fx = async (e, t) => {
	let n = zt(e), r = t.rootPath || Sx(t.initialFile?.path ?? "");
	if (r) {
		let e = await Ia.loadFolder(r);
		e.ok && (n.setCurrentDirectoryPath(e.path), n.setFileTree(Ia.getFileTree()), n.setExpandedFolderPaths(e.path === "/" ? [] : [e.path]));
	}
	if (!t.initialFile?.path) return;
	let i = To.openFile({
		path: t.initialFile.path,
		title: t.initialFile.name || Cx(t.initialFile.path),
		language: wx(t.initialFile.path)
	}, e);
	await To.loadFileContent(i.id, e);
}, Ix = async (e, t) => {
	let n = zt(e.pinia), r = cg(e.pinia);
	n.setFileTreeLoading(!0), n.setFileTreeError(null);
	try {
		r.setPhase("language"), await Px(e, t), Mx(e.pinia), r.setPhase("workspace"), Ps.restore(e.pinia), await Fx(e.pinia, t), Ps.startAutoSave(e.pinia), await bx(e.bootStartedAt, yx(t)), r.markReady();
	} catch (e) {
		let t = `文件列表加载失败：${Ex(e)}`;
		n.setFileTree([]), n.setFileTreeError(t), n.setFileSystemProviderStatus(Tx(t)), r.markError(t);
	} finally {
		n.setFileTreeLoading(!1), jf.markStartup("workspaceReadyMs", performance.now() - e.bootStartedAt);
	}
}, Lx = (e, t) => {
	let n = document.documentElement.dataset.monacoRuntime;
	t.runtime === "standalone" ? (document.documentElement.lang = "zh-CN", document.documentElement.dataset.ideTheme = "ide-dark", delete document.documentElement.dataset.monacoRuntime) : document.documentElement.dataset.monacoRuntime = "panel-remote";
	let r = jx(t), i = cg(r.pinia);
	return i.reset(), Nx(r, t), Ps.restoreShellLayout(r.pinia), Fp.setDiagnostics("mock", [{
		path: "/README.md",
		message: "模拟诊断: README 需要项目摘要。",
		severity: "warning",
		lineNumber: 3,
		column: 1,
		source: "mock"
	}]), r.applyCurrentTheme(jr(r.pinia).values), i.setPhase("ui"), r.app.mount(e), Ox(), jf.markStartup("appMountMs", performance.now() - r.bootStartedAt), Ix(r, t), {
		update() {},
		async requestClose() {
			return Xt(r.pinia).tabs.filter((e) => e.dirty).length ? typeof window > "u" || typeof window.confirm != "function" ? !1 : window.confirm("当前编辑器存在未保存内容，确定关闭吗？") : !0;
		},
		unmount() {
			Ps.persist(r.pinia), Ps.stopAutoSave(), r.app.unmount(), n === void 0 ? delete document.documentElement.dataset.monacoRuntime : document.documentElement.dataset.monacoRuntime = n, e.replaceChildren();
		}
	};
}, Rx, zx = async () => (Rx ||= Promise.all([
	Promise.resolve({          }),
	import("./js/vendor-scrollbar.js").then((e) => e.t),
	Promise.resolve({                   }),
	import("./js/virtual_svg-icons-register.js"),
	Promise.resolve({    }),
	Promise.resolve({       }),
	Promise.resolve({           }),
	Promise.resolve({        }),
	Promise.resolve({     }),
	Promise.resolve({    }),
	Promise.resolve({         }),
	Promise.resolve({           })
]).then(() => void 0), Rx), Bx = async (e, t = {}) => {
	await zx();
	let n = document.createElement("div");
	return n.className = "monaco-workbench-remote-root", n.style.width = "100%", n.style.height = "100%", n.style.minHeight = "0", e.replaceChildren(n), Lx(n, {
		runtime: "panel-remote",
		forceFileApiProvider: "bt-panel",
		themeTarget: n,
		initialFile: t.initialFile,
		rootPath: t.rootPath,
		isPanelRemote: !0,
		isWindow: t.isWindow ?? !0,
		windowId: t.windowId ?? "panel-remote",
		isMaximized: !!t.isMaximized,
		hideWindowControls: !!t.hideWindowControls,
		startupDelayMs: t.startupDelayMs,
		enableFrameSync: !!t.onFrameModeChange,
		onFrameModeChange: t.onFrameModeChange,
		onRequestClose: t.onRequestClose,
		onRequestMinimize: t.onRequestMinimize
	});
}, Vx = "btpanel-monaco-editor-esm-v1", Hx = "panel_monaco_editor", Ux = { mount(e, t = {}) {
	return Bx(e, {
		...t,
		isPanelRemote: !0
	});
} };
//#endregion
export { Ux as default, Hx as name, Vx as protocol };
