import { t as e } from "./rolldown-runtime.js";
//#region \0virtual:btpanel-shared/vue
if (!globalThis.__BT_PANEL_SHARED__) throw Error("[Panel Shared] registry is not installed");
var t = globalThis.__BT_PANEL_SHARED__.get("vue");
if (!t) throw Error("[Panel Shared] missing shared package: vue");
t.BaseTransition, t.BaseTransitionPropsValidators, t.Comment, t.DeprecationTypes, t.EffectScope, t.ErrorCodes, t.ErrorTypeStrings;
var n = t.Fragment;
t.KeepAlive, t.ReactiveEffect, t.Static, t.Suspense;
var r = t.Teleport;
t.Text, t.TrackOpTypes;
var i = t.Transition, a = t.TransitionGroup;
t.TriggerOpTypes, t.VueElement, t.assertNumber, t.callWithAsyncErrorHandling, t.callWithErrorHandling, t.camelize, t.capitalize, t.cloneVNode, t.compatUtils, t.compile;
var o = t.computed, s = t.createApp, c = t.createBlock, l = t.createCommentVNode, u = t.createElementBlock, d = t.createElementVNode;
t.createHydrationRenderer, t.createPropsRestProxy, t.createRenderer, t.createSSRApp;
var f = t.createSlots, p = t.createStaticVNode, m = t.createTextVNode, h = t.createVNode;
t.customRef, t.defineAsyncComponent;
var g = t.defineComponent;
t.defineCustomElement, t.defineEmits, t.defineExpose, t.defineModel, t.defineOptions, t.defineProps, t.defineSSRCustomElement, t.defineSlots, t.devtools, t.effect;
var _ = t.effectScope;
t.getCurrentInstance;
var v = t.getCurrentScope;
t.getCurrentWatcher, t.getTransitionRawChildren;
var y = t.guardReactiveProps, b = t.h;
t.handleError;
var x = t.hasInjectionContext;
t.hydrate, t.hydrateOnIdle, t.hydrateOnInteraction, t.hydrateOnMediaQuery, t.hydrateOnVisible, t.initCustomFormatter, t.initDirectivesForSSR;
var S = t.inject;
t.isMemoSame, t.isProxy;
var C = t.isReactive;
t.isReadonly;
var w = t.isRef;
t.isRuntimeOnly, t.isShallow, t.isVNode;
var T = t.markRaw;
t.mergeDefaults, t.mergeModels;
var E = t.mergeProps, D = t.nextTick;
t.nodeOps;
var ee = t.normalizeClass, O = t.normalizeProps, k = t.normalizeStyle, A = t.onActivated;
t.onBeforeMount;
var j = t.onBeforeUnmount;
t.onBeforeUpdate, t.onDeactivated, t.onErrorCaptured;
var te = t.onMounted;
t.onRenderTracked, t.onRenderTriggered;
var M = t.onScopeDispose;
t.onServerPrefetch;
var N = t.onUnmounted;
t.onUpdated, t.onWatcherCleanup;
var P = t.openBlock;
t.patchProp, t.popScopeId;
var F = t.provide;
t.proxyRefs, t.pushScopeId, t.queuePostFlushCb;
var I = t.reactive;
t.readonly;
var L = t.ref;
t.registerRuntimeCompiler, t.render;
var R = t.renderList, z = t.renderSlot, B = t.resolveComponent;
t.resolveDirective;
var ne = t.resolveDynamicComponent;
t.resolveFilter, t.resolveTransitionHooks, t.setBlockTracking, t.setDevtoolsHook, t.setTransitionHooks;
var re = t.shallowReactive;
t.shallowReadonly;
var ie = t.shallowRef;
t.ssrContextKey, t.ssrUtils, t.stop;
var ae = t.toDisplayString;
t.toHandlerKey;
var oe = t.toHandlers, se = t.toRaw, ce = t.toRef, le = t.toRefs, ue = t.toValue;
t.transformVNodeArgs, t.triggerRef;
var de = t.unref, fe = t.useAttrs;
t.useCssModule, t.useCssVars, t.useHost, t.useId, t.useModel, t.useSSRContext, t.useShadowRoot;
var pe = t.useSlots;
t.useTemplateRef, t.useTransitionState;
var me = t.vModelCheckbox;
t.vModelDynamic, t.vModelRadio;
var he = t.vModelSelect, ge = t.vModelText, _e = t.vShow;
t.version, t.warn;
var ve = t.watch, ye = t.watchEffect, be = t.watchPostEffect;
t.watchSyncEffect, t.withAsyncContext;
var xe = t.withCtx;
t.withDefaults;
var Se = t.withDirectives, Ce = t.withKeys;
t.withMemo;
var we = t.withModifiers;
t.withScopeId;
//#endregion
//#region ../../node_modules/.pnpm/overlayscrollbars@2.16.0/node_modules/overlayscrollbars/overlayscrollbars.mjs
var V = (e, t) => {
	let { o: n, i: r, u: i } = e, a = n, o, s = (e, t) => {
		let n = a, s = e, c = t || (r ? !r(n, s) : n !== s);
		return (c || i) && (a = s, o = n), [
			a,
			c,
			o
		];
	};
	return [t ? (e) => s(t(a, o), e) : s, (e) => [
		a,
		!!e,
		o
	]];
}, H = typeof window < "u" && typeof HTMLElement < "u" && window.document ? window : {}, Te = Math.max, Ee = Math.min, De = Math.round, Oe = Math.abs, ke = Math.sign, Ae = H.cancelAnimationFrame, je = H.requestAnimationFrame, Me = H.setTimeout, Ne = H.clearTimeout, Pe = (e) => H[e] === void 0 ? void 0 : H[e], Fe = Pe("MutationObserver"), Ie = Pe("IntersectionObserver"), Le = Pe("ResizeObserver"), Re = Pe("ScrollTimeline"), ze = (e) => e === void 0, Be = (e) => e === null, Ve = (e) => typeof e == "number", He = (e) => typeof e == "string", Ue = (e) => typeof e == "boolean", We = (e) => typeof e == "function", U = (e) => Array.isArray(e), Ge = (e) => typeof e == "object" && !U(e) && !Be(e), Ke = (e) => {
	let t = !!e && e.length, n = Ve(t) && t > -1 && t % 1 == 0;
	return U(e) || !We(e) && n ? t > 0 && Ge(e) ? t - 1 in e : !0 : !1;
}, qe = (e) => !!e && e.constructor === Object, Je = (e) => e instanceof HTMLElement, Ye = (e) => e instanceof Element;
function W(e, t) {
	if (Ke(e)) for (let n = 0; n < e.length && t(e[n], n, e) !== !1; n++);
	else e && W(Object.keys(e), ((n) => t(e[n], n, e)));
	return e;
}
var Xe = (e, t) => e.indexOf(t) >= 0, Ze = (e, t) => e.concat(t), G = (e, t, n) => (!He(t) && Ke(t) ? Array.prototype.push.apply(e, t) : e.push(t), e), Qe = (e) => Array.from(e || []), $e = (e) => U(e) ? e : !He(e) && Ke(e) ? Qe(e) : [e], et = (e) => !!e && !e.length, tt = (e) => Qe(new Set(e)), K = (e, t, n) => {
	W(e, (e) => e ? e.apply(void 0, t || []) : !0), n || (e.length = 0);
}, nt = "paddingTop", rt = "paddingRight", it = "paddingLeft", at = "paddingBottom", ot = "marginLeft", st = "marginRight", ct = "marginBottom", lt = "overflowX", ut = "overflowY", dt = "width", ft = "height", pt = "visible", mt = "hidden", ht = "scroll", gt = (e) => {
	let t = String(e || "");
	return t ? t[0].toUpperCase() + t.slice(1) : "";
}, _t = (e, t, n, r) => {
	if (e && t) {
		let r = !0;
		return W(n, ((n) => {
			e[n] !== t[n] && (r = !1);
		})), r;
	}
	return !1;
}, vt = (e, t) => _t(e, t, ["w", "h"]), yt = (e, t) => _t(e, t, ["x", "y"]), bt = (e, t) => _t(e, t, [
	"t",
	"r",
	"b",
	"l"
]), q = (e, ...t) => e.bind(0, ...t), xt = (e) => {
	let t, n = e ? Me : je, r = e ? Ne : Ae;
	return [(i) => {
		r(t), t = n((() => i()), We(e) ? e() : e);
	}, () => r(t)];
}, St = (e) => {
	let t = We(e) ? e() : e;
	if (Ve(t)) {
		let e = t ? Me : je, n = t ? Ne : Ae;
		return (r) => {
			let i = e((() => r()), t);
			return () => {
				n(i);
			};
		};
	}
	return t && t._;
}, Ct = (e, t) => {
	let { p: n, v: r, S: i, m: a } = t || {}, o, s, c, l, u = function(t) {
		s && s(), o && o(), l = s = o = c = void 0, e.apply(this, t);
	}, d = (e) => a && c ? a(c, e) : e, f = () => {
		s && c && u(d(c) || c);
	}, p = function() {
		let e = Qe(arguments), t = St(n);
		if (t) {
			let n = typeof i == "function" ? i() : i, a = St(r), p = d(e) || e, m = u.bind(0, p);
			s && s(), n && !l ? (m(), l = !0, s = t((() => l = void 0))) : (s = t(m), a && !o && (o = a(f))), c = p;
		} else u(e);
	};
	return p.O = f, p;
}, wt = (e, t) => Object.prototype.hasOwnProperty.call(e, t), J = (e) => e ? Object.keys(e) : [], Y = (e, t, n, r, i, a, o) => {
	let s = [
		t,
		n,
		r,
		i,
		a,
		o
	];
	return (typeof e != "object" || Be(e)) && !We(e) && (e = {}), W(s, ((t) => {
		W(t, ((n, r) => {
			let i = t[r];
			if (e === i) return !0;
			let a = U(i);
			if (i && qe(i)) {
				let t = e[r], n = t;
				a && !U(t) ? n = [] : !a && !qe(t) && (n = {}), e[r] = Y(n, i);
			} else e[r] = a ? i.slice() : i;
		}));
	})), e;
}, Tt = (e, t) => W(Y({}, e), ((e, t, n) => {
	e === void 0 ? delete n[t] : e && qe(e) && (n[t] = Tt(e));
})), Et = (e) => !J(e).length, Dt = () => {}, Ot = (e, t, n) => Te(e, Ee(t, n)), kt = (e) => tt((U(e) ? e : (e || "").split(" ")).filter(((e) => e))), At = (e, t) => e && e.getAttribute(t), jt = (e, t) => e && e.hasAttribute(t), Mt = (e, t, n) => {
	W(kt(t), ((t) => {
		e && e.setAttribute(t, String(n || ""));
	}));
}, Nt = (e, t) => {
	W(kt(t), ((t) => e && e.removeAttribute(t)));
}, Pt = (e, t) => {
	let n = kt(At(e, t)), r = q(Mt, e, t), i = (e, t) => {
		let r = new Set(n);
		return W(kt(e), ((e) => {
			r[t](e);
		})), Qe(r).join(" ");
	};
	return {
		C: (e) => r(i(e, "delete")),
		$: (e) => r(i(e, "add")),
		H: (e) => {
			let t = kt(e);
			return t.reduce(((e, t) => e && n.includes(t)), t.length > 0);
		}
	};
}, Ft = (e, t, n) => (Pt(e, t).C(n), q(It, e, t, n)), It = (e, t, n) => (Pt(e, t).$(n), q(Ft, e, t, n)), Lt = (e, t, n, r) => (r ? It : Ft)(e, t, n), Rt = (e, t, n) => Pt(e, t).H(n), zt = (e) => Pt(e, "class"), Bt = (e, t) => {
	zt(e).C(t);
}, Vt = (e, t) => (zt(e).$(t), q(Bt, e, t)), Ht = (e, t) => {
	let n = t ? Ye(t) && t : document;
	return n ? Qe(n.querySelectorAll(e)) : [];
}, Ut = (e, t) => {
	let n = t ? Ye(t) && t : document;
	return n && n.querySelector(e);
}, Wt = (e, t) => Ye(e) && e.matches(t), Gt = (e) => Wt(e, "body"), Kt = (e) => e ? Qe(e.childNodes) : [], qt = (e) => e && e.parentElement, Jt = (e, t) => Ye(e) && e.closest(t), Yt = (e) => document.activeElement, Xt = (e, t, n) => {
	let r = Jt(e, t), i = e && Ut(n, r), a = Jt(i, t) === r;
	return r && i ? r === e || i === e || a && Jt(Jt(e, n), t) !== r : !1;
}, Zt = (e) => {
	W($e(e), ((e) => {
		let t = qt(e);
		e && t && t.removeChild(e);
	}));
}, X = (e, t) => q(Zt, e && t && W($e(t), ((t) => {
	t && e.appendChild(t);
}))), Qt, $t = () => Qt, en = (e) => {
	Qt = e;
}, tn = (e) => {
	let t = document.createElement("div");
	return Mt(t, "class", e), t;
}, nn = (e) => {
	let t = tn(), n = $t(), r = e.trim();
	return t.innerHTML = n ? n.createHTML(r) : r, W(Kt(t), ((e) => Zt(e)));
}, rn = (e, t) => e.getPropertyValue(t) || e[t] || "", an = (e) => {
	let t = e || 0;
	return isFinite(t) ? t : 0;
}, on = (e) => an(parseFloat(e || "")), sn = (e) => Math.round(e * 1e4) / 1e4, cn = (e) => `${sn(an(e))}px`;
function ln(e, t) {
	e && t && W(t, ((t, n) => {
		try {
			let r = e.style, i = Be(t) || Ue(t) ? "" : Ve(t) ? cn(t) : t;
			n.indexOf("--") === 0 ? r.setProperty(n, i) : r[n] = i;
		} catch {}
	}));
}
function un(e, t, n) {
	let r = He(t), i = r ? "" : {};
	if (e) {
		let a = H.getComputedStyle(e, n) || e.style;
		i = r ? rn(a, t) : Qe(t).reduce(((e, t) => (e[t] = rn(a, t), e)), i);
	}
	return i;
}
var dn = (e, t, n) => {
	let r = t ? `${t}-` : "", i = n ? `-${n}` : "", a = `${r}top${i}`, o = `${r}right${i}`, s = `${r}bottom${i}`, c = `${r}left${i}`, l = un(e, [
		a,
		o,
		s,
		c
	]);
	return {
		t: on(l[a]),
		r: on(l[o]),
		b: on(l[s]),
		l: on(l[c])
	};
}, fn = (e, t) => `translate${Ge(e) ? `(${e.x},${e.y})` : `${t ? "X" : "Y"}(${e})`}`, pn = (e) => !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length), mn = {
	w: 0,
	h: 0
}, hn = (e, t) => t ? {
	w: t[`${e}Width`],
	h: t[`${e}Height`]
} : mn, gn = (e) => hn("inner", e || H), _n = q(hn, "offset"), vn = q(hn, "client"), yn = q(hn, "scroll"), bn = (e) => {
	let t = parseFloat(un(e, dt)) || 0, n = parseFloat(un(e, ft)) || 0;
	return {
		w: t - De(t),
		h: n - De(n)
	};
}, xn = (e) => e.getBoundingClientRect(), Sn = (e) => !!e && pn(e), Cn = (e) => !!(e && (e[ft] || e[dt])), wn = (e, t) => {
	let n = Cn(e);
	return !Cn(t) && n;
}, Tn = (e, t, n, r) => {
	W(kt(t), ((t) => {
		e && e.removeEventListener(t, n, r);
	}));
}, Z = (e, t, n, r) => {
	let i = (r && r.D) ?? !0, a = r && r.I || !1, o = r && r.A || !1, s = {
		passive: i,
		capture: a
	};
	return q(K, kt(t).map(((t) => {
		let r = o ? (i) => {
			Tn(e, t, r, a), n && n(i);
		} : n;
		return e && e.addEventListener(t, r, s), q(Tn, e, t, r, a);
	})));
}, En = (e) => e.stopPropagation(), Dn = (e) => e.preventDefault(), On = (e) => En(e) || Dn(e), kn = (e, t) => {
	let { x: n, y: r } = Ve(t) ? {
		x: t,
		y: t
	} : t || {};
	Ve(n) && (e.scrollLeft = n), Ve(r) && (e.scrollTop = r);
}, Q = (e) => ({
	x: e.scrollLeft,
	y: e.scrollTop
}), An = () => ({
	T: {
		x: 0,
		y: 0
	},
	k: {
		x: 0,
		y: 0
	}
}), jn = (e, t) => {
	let { T: n, k: r } = e, { w: i, h: a } = t, o = (e, t, n) => {
		let r = ke(e) * n, i = ke(t) * n;
		if (r === i) {
			let n = Oe(e), a = Oe(t);
			i = n > a ? 0 : i, r = n < a ? 0 : r;
		}
		return r = r === i ? 0 : r, [r + 0, i + 0];
	}, [s, c] = o(n.x, r.x, i), [l, u] = o(n.y, r.y, a);
	return {
		T: {
			x: s,
			y: l
		},
		k: {
			x: c,
			y: u
		}
	};
}, Mn = ({ T: e, k: t }) => {
	let n = (e, t) => e === 0 && e <= t;
	return {
		x: n(e.x, t.x),
		y: n(e.y, t.y)
	};
}, Nn = ({ T: e, k: t }, n) => {
	let r = (e, t, n) => Ot(0, 1, (e - n) / (e - t) || 0);
	return {
		x: r(e.x, t.x, n.x),
		y: r(e.y, t.y, n.y)
	};
}, Pn = (e) => {
	e && e.focus && e.focus({
		preventScroll: !0,
		focusVisible: !1
	});
}, Fn = (e, t) => {
	W($e(t), e);
}, In = (e) => {
	let t = /* @__PURE__ */ new Map(), n = (e, n) => {
		if (e) {
			let r = t.get(e);
			Fn(((e) => {
				r && r[e ? "delete" : "clear"](e);
			}), n);
		} else t.forEach(((e) => {
			e.clear();
		})), t.clear();
	}, r = (e, i) => {
		if (He(e)) {
			let r = t.get(e) || /* @__PURE__ */ new Set();
			return t.set(e, r), Fn(((e) => {
				We(e) && r.add(e);
			}), i), q(n, e, i);
		}
		Ue(i) && i && n();
		let a = J(e), o = [];
		return W(a, ((t) => {
			let n = e[t];
			n && G(o, r(t, n));
		})), q(K, o);
	};
	return r(e || {}), [
		r,
		n,
		(e, n) => {
			W(Qe(t.get(e)), ((e) => {
				n && !et(n) ? e.apply(0, n) : e();
			}));
		}
	];
}, Ln = {}, Rn = {}, zn = (e) => {
	W(e, ((e) => W(e, ((t, n) => {
		Ln[n] = e[n];
	}))));
}, Bn = (e, t, n) => J(e).map(((r) => {
	let { static: i, instance: a } = e[r], [o, s, c] = n || [], l = n ? a : i;
	if (l) {
		let e = n ? l(o, s, t) : l(t);
		return (c || Rn)[r] = e;
	}
})), Vn = (e, t) => e[t], Hn = (e) => Vn(Rn, e), Un = "__osOptionsValidationPlugin", Wn = "data-overlayscrollbars", Gn = "os-environment", Kn = `${Gn}-scrollbar-hidden`, qn = `${Wn}-initialize`, Jn = "noClipping", Yn = `${Wn}-body`, Xn = Wn, Zn = "host", Qn = `${Wn}-viewport`, $n = lt, er = ut, tr = "arrange", nr = "measuring", rr = "scrolling", ir = "scrollbarHidden", ar = "noContent", or = `${Wn}-padding`, sr = `${Wn}-content`, cr = "os-size-observer", lr = `${cr}-appear`, ur = `${cr}-listener`;
`${ur}`, `${ur}`;
var dr = "os-trinsic-observer", fr = "os-theme-none", $ = "os-scrollbar", pr = `${$}-rtl`, mr = `${$}-horizontal`, hr = `${$}-vertical`, gr = `${$}-track`, _r = `${$}-handle`, vr = `${$}-visible`, yr = `${$}-cornerless`, br = `${$}-interaction`, xr = `${$}-unusable`, Sr = `${$}-auto-hide`, Cr = `${Sr}-hidden`, wr = `${$}-wheel`, Tr = `${gr}-interactive`, Er = `${_r}-interactive`, Dr = "__osSizeObserverPlugin", Or = (e, t) => {
	let { M: n } = t, [r, i] = e("showNativeOverlaidScrollbars");
	return [r && n.x && n.y, i];
}, kr = (e) => e.indexOf(pt) === 0, Ar = (e) => e.replace(`${pt}-`, ""), jr = (e, t) => {
	if (e === "auto") return t ? ht : mt;
	let n = e || mt;
	return [
		mt,
		ht,
		pt
	].includes(n) ? n : mt;
}, Mr = (e, t) => {
	let { overflowX: n, overflowY: r } = un(e, [lt, ut]);
	return {
		x: jr(n, t.x),
		y: jr(r, t.y)
	};
}, Nr = "__osScrollbarsHidingPlugin", Pr = "__osClickScrollPlugin", Fr = (e) => JSON.stringify(e, ((e, t) => {
	if (We(t)) throw 0;
	return t;
})), Ir = (e, t) => e ? `${t}`.split(".").reduce(((e, t) => e && wt(e, t) ? e[t] : void 0), e) : void 0, Lr = [0, 33], Rr = [33, 99], zr = [
	222,
	666,
	!0
], Br = {
	paddingAbsolute: !1,
	showNativeOverlaidScrollbars: !1,
	update: {
		elementEvents: [["img", "load"]],
		debounce: {
			mutation: Lr,
			resize: null,
			event: Rr,
			env: zr
		},
		attributes: null,
		ignoreMutation: null,
		flowDirectionStyles: null
	},
	overflow: {
		x: "scroll",
		y: "scroll"
	},
	scrollbars: {
		theme: "os-theme-dark",
		visibility: "auto",
		autoHide: "never",
		autoHideDelay: 1300,
		autoHideSuspend: !1,
		dragScroll: !0,
		clickScroll: !1,
		pointers: [
			"mouse",
			"touch",
			"pen"
		]
	}
}, Vr = (e, t) => {
	let n = {};
	return W(Ze(J(t), J(e)), ((r) => {
		let i = e[r], a = t[r];
		if (Ge(i) && Ge(a)) Y(n[r] = {}, Vr(i, a)), Et(n[r]) && delete n[r];
		else if (wt(t, r) && a !== i) {
			let e = !0;
			if (U(i) || U(a)) try {
				Fr(i) === Fr(a) && (e = !1);
			} catch {}
			e && (n[r] = a);
		}
	})), n;
}, Hr = (e, t, n) => (r) => [Ir(e, r), n || Ir(t, r) !== void 0], Ur, Wr = () => Ur, Gr = (e) => {
	Ur = e;
}, Kr, qr = () => {
	let e = (e, t, n) => {
		X(document.body, e), X(document.body, e);
		let r = vn(e), i = _n(e), a = bn(t);
		return n && Zt(e), {
			x: i.h - r.h + a.h,
			y: i.w - r.w + a.w
		};
	}, t = (e) => {
		let t = !1, n = Vt(e, Kn);
		try {
			t = un(e, "scrollbar-width") === "none" || un(e, "display", "::-webkit-scrollbar") === "none";
		} catch {}
		return n(), t;
	}, n = nn(`<div class="${Gn}"><div></div><style>${`.${Gn}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Gn} div{width:200%;height:200%;margin:10px 0}.${Kn}{scrollbar-width:none!important}.${Kn}::-webkit-scrollbar,.${Kn}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`}</style></div>`)[0], r = n.firstChild, i = n.lastChild, a = Wr();
	a && (i.nonce = a);
	let [o, , s] = In(), [c, l] = V({
		o: e(n, r),
		i: yt
	}, q(e, n, r, !0)), [u] = l(), d = t(n), f = {
		x: u.x === 0,
		y: u.y === 0
	}, p = {
		elements: {
			host: null,
			padding: !d,
			viewport: (e) => d && Gt(e) && e,
			content: !1
		},
		scrollbars: { slot: !0 },
		cancel: {
			nativeScrollbarsOverlaid: !1,
			body: null
		}
	}, m = Y({}, Br), h = q(Y, {}, m), g = q(Y, {}, p), _ = {
		U: u,
		M: f,
		P: d,
		J: !!Re,
		G: q(o, "r"),
		K: g,
		Z: (e) => Y(p, e) && g(),
		tt: h,
		nt: (e) => Y(m, e) && h(),
		ot: Y({}, p),
		st: Y({}, m)
	};
	if (Nt(n, "style"), Zt(n), Z(H, "resize", (() => {
		s("r", []);
	})), We(H.matchMedia) && !d && (!f.x || !f.y)) {
		let e = (t) => {
			Z(H.matchMedia(`(resolution: ${H.devicePixelRatio}dppx)`), "change", (() => {
				t(), e(t);
			}), { A: !0 });
		};
		e((() => {
			let [e, t] = c();
			Y(_.U, e), s("r", [t]);
		}));
	}
	return _;
}, Jr = () => (Kr ||= qr(), Kr), Yr = (e, t, n) => {
	let r = !1, i = n ? /* @__PURE__ */ new WeakMap() : !1, a = () => {
		r = !0;
	}, o = (a) => {
		i && n && W(n.map(((t) => {
			let [n, r] = t || [];
			return [r && n ? (a || Ht)(n, e) : [], r];
		})), ((n) => W(n[0], ((a) => {
			let o = n[1], s = i.get(a) || [];
			if (e.contains(a) && o) {
				let e = Z(a, o, ((n) => {
					r ? (e(), i.delete(a)) : t(n);
				}));
				i.set(a, G(s, e));
			} else K(s), i.delete(a);
		}))));
	};
	return o(), [a, o];
}, Xr = (e, t, n, r) => {
	let i = !1, { et: a, ct: o, rt: s, it: c, lt: l, ut: u } = r || {}, [d, f] = Yr(e, (() => i && n(!0)), s), p = a || [], m = o || [], h = Ze(p, m), g = (i, a) => {
		if (!et(a)) {
			let o = l || Dt, s = u || Dt, d = [], p = [], h = !1, g = !1;
			if (W(a, ((n) => {
				let { attributeName: i, target: a, type: l, oldValue: u, addedNodes: f, removedNodes: _ } = n, v = l === "attributes", y = l === "childList", b = e === a, x = v && i, S = x && At(a, i || ""), C = He(S) ? S : null, w = x && u !== C, T = Xe(m, i) && w;
				if (t && (y || !b)) {
					let t = v && w, l = t && c && Wt(a, c), p = (l ? !o(a, i, u, C) : !v || t) && !s(n, !!l, e, r);
					W(f, ((e) => G(d, e))), W(_, ((e) => G(d, e))), g ||= p;
				}
				!t && b && w && !o(a, i, u, C) && (G(p, i), h ||= T);
			})), f(((e) => tt(d).reduce(((t, n) => (G(t, Ht(e, n)), Wt(n, e) ? G(t, n) : t)), []))), t) return !i && g && n(!1), [!1];
			if (!et(p) || h) {
				let e = [tt(p), h];
				return i || n.apply(0, e), e;
			}
		}
	}, _ = new Fe(q(g, !1));
	return [() => (_.observe(e, {
		attributes: !0,
		attributeOldValue: !0,
		attributeFilter: h,
		subtree: t,
		childList: t,
		characterData: t
	}), i = !0, () => {
		i &&= (d(), _.disconnect(), !1);
	}), () => {
		if (i) return g(!0, _.takeRecords());
	}];
}, Zr = null, Qr = (e, t, n) => {
	let { ft: r } = n || {}, i = Hn(Dr), [a] = V({
		o: !1,
		u: !0
	});
	return () => {
		let n = [], o = nn(`<div class="${cr}"><div class="${ur}"></div></div>`)[0], s = o.firstChild, c = (e) => {
			let n = U(e) && !et(e), r = !1, i = !1;
			if (n) {
				let t = e[0], [n, , o] = a(t.contentRect), s = Cn(n);
				i = wn(n, o), r = !i && !s;
			} else i = e === !0;
			r || t({
				_t: !0,
				ft: i
			});
		};
		if (Le) {
			if (!Ue(Zr)) {
				let t = new Le(Dt);
				t.observe(e, { get box() {
					Zr = !0;
				} }), Zr ||= !1, t.disconnect();
			}
			let t = Ct(c, {
				p: 0,
				v: 0
			}), r = (e) => t(e), i = new Le(r);
			if (i.observe(Zr ? e : s), G(n, [() => {
				i.disconnect();
			}, !Zr && X(e, o)]), Zr) {
				let t = new Le(r);
				t.observe(e, { box: "border-box" }), G(n, (() => t.disconnect()));
			}
		} else if (i) {
			let [t, a] = i(s, c, r);
			G(n, Ze([
				Vt(o, lr),
				Z(o, "animationstart", t),
				X(e, o)
			], a));
		} else return Dt;
		return q(K, n);
	};
}, $r = (e, t) => {
	let n, r = (e) => e.h === 0 || e.isIntersecting || e.intersectionRatio > 0, i = tn(dr), [a] = V({ o: !1 }), o = (e, n) => {
		if (e) {
			let i = a(r(e)), [, o] = i;
			return o && !n && t(i) && [i];
		}
	}, s = (e, t) => o(t.pop(), e);
	return [() => {
		let t = [];
		if (Ie) n = new Ie(q(s, !1), { root: e }), n.observe(i), G(t, (() => {
			n.disconnect();
		}));
		else {
			let e = () => {
				o(_n(i));
			};
			G(t, Qr(i, e)()), e();
		}
		return q(K, G(t, X(e, i)));
	}, () => n && s(!0, n.takeRecords())];
}, ei = (e, t, n, r) => {
	let i, a, o, s, c, l, u, d, f = `[${Xn}]`, p = `[${Qn}]`, m = [
		"id",
		"class",
		"style",
		"open",
		"wrap",
		"cols",
		"rows"
	], { dt: h, vt: g, L: _, gt: v, ht: y, V: b, bt: x, yt: S, wt: C, St: w } = e, T = (e) => un(e, "direction") === "rtl", E = () => {
		let e, t, n, i = Ct(r, {
			p: () => e,
			v: () => t,
			S: () => n,
			m(e, t) {
				let [n] = e, [r] = t;
				return [Ze(J(n), J(r)).reduce(((e, t) => (e[t] = n[t] || r[t], e)), {})];
			}
		}), a = (r, a) => {
			if (U(a)) {
				let [r, i, o] = a;
				e = r, t = i, n = o;
			} else Ve(a) ? (e = a, t = !1, n = !1) : (e = !1, t = !1, n = !1);
			i(r);
		};
		return a.O = i.O, a;
	}, D = {
		Ot: !1,
		B: T(h)
	}, ee = Jr(), O = Hn(Nr), [k] = V({
		i: vt,
		o: {
			w: 0,
			h: 0
		}
	}, (() => {
		let r = O && O.R(e, t, D, ee, n).Y, i = !(x && b) && Rt(g, Xn, Jn), a = !b && S(tr), o = a && Q(v), s = o && w(), c = C(nr, i), l = a && r && r(), u = yn(_), d = bn(_);
		return l && l(), kn(v, o), s && s(), i && c(), {
			w: u.w + d.w,
			h: u.h + d.h
		};
	})), A = E(), j = (e) => {
		let t = T(h);
		Y(e, { Ct: d !== t }), Y(D, { B: t }), d = t;
	}, te = (e, t) => {
		let [n, i] = e, a = { $t: i };
		return Y(D, { Ot: n }), t || r(a), a;
	}, M = ({ _t: e, ft: t }) => {
		let n = t ? r : A, i = {
			_t: e || t,
			ft: t
		};
		j(i), n(i, a);
	}, N = (e, t) => {
		let [, n] = k(), r = { xt: n };
		return j(r), n && !t && A(r, e ? o : i), r;
	}, P = (e, t, n) => {
		let r = { Ht: t };
		return j(r), t && !n && A(r, i), r;
	}, [F, I] = y ? $r(g, te) : [], L = !b && Qr(g, M, { ft: !0 }), [R, z] = Xr(g, !1, P, {
		ct: m,
		et: m
	}), B = b && Le && new Le(((e) => {
		let t = e[e.length - 1].contentRect;
		M({
			_t: !0,
			ft: wn(t, u)
		}), u = t;
	}));
	return [
		() => {
			B && B.observe(g);
			let e = L && L(), t = F && F(), n = R(), r = ee.G(((e) => {
				let [, t] = k();
				A({
					Et: e,
					xt: t,
					_t: x
				}, s);
			}));
			return () => {
				B && B.disconnect(), e && e(), t && t(), l && l(), n(), r();
			};
		},
		({ Dt: e, zt: t, It: n }) => {
			let r = {}, [u] = e("update.ignoreMutation"), [d, h] = e("update.attributes"), [g, v] = e("update.elementEvents"), [x, S] = e("update.debounce"), C = v || h, w = t || n, T = (e) => We(u) && !!u(e);
			if (C) {
				c && c(), l && l();
				let [e, t] = Xr(y || _, !0, N, {
					et: Ze(m, d || []),
					rt: g,
					it: f,
					ut: (e, t) => {
						let { target: n, attributeName: r } = e;
						return (!t && r && !b ? Xt(n, f, p) : !1) || !!Jt(n, `.${$}`) || T(e);
					}
				});
				l = e(), c = t;
			}
			if (S && (A.O(), U(x) || Ve(x) ? (i = x, a = !1, o = Rr, s = zr) : qe(x) ? (i = x.mutation, a = x.resize, o = x.event, s = x.env) : (i = !1, a = !1, o = !1, s = !1)), w) {
				let e = z(), t = I && I(), n = c && c();
				e && Y(r, P(e[0], e[1], w)), t && Y(r, te(t[0], w)), n && Y(r, N(n[0], w));
			}
			return j(r), r;
		},
		D
	];
}, ti = (e, t) => We(t) ? t.apply(0, e) : t, ni = (e, t, n, r) => ti(e, ze(r) ? n : r) || t.apply(0, e), ri = (e, t, n, r) => {
	let i = ti(e, ze(r) ? n : r);
	return !!i && (Je(i) ? i : t.apply(0, e));
}, ii = (e, t) => {
	let { nativeScrollbarsOverlaid: n, body: r } = t || {}, { M: i, P: a, K: o } = Jr(), { nativeScrollbarsOverlaid: s, body: c } = o().cancel, l = n ?? s, u = ze(r) ? c : r, d = (i.x || i.y) && l, f = e && (Be(u) ? !a : u);
	return !!d || !!f;
}, ai = (e, t, n, r) => {
	let { K: i } = Jr(), { scrollbars: a } = i(), { slot: o } = a, { dt: s, vt: c, L: l, At: u, gt: d, bt: f, V: p } = t, { scrollbars: m } = u ? {} : e, { slot: h } = m || {}, g = [], _ = [], v = [], y = ri([
		s,
		c,
		l
	], (() => p && f ? s : c), o, h), b = (e) => {
		if (Re) {
			let t = null, r = [], i = new Re({
				source: d,
				axis: e
			}), a = () => {
				t && t.cancel(), t = null;
			};
			return { Mt: (o) => {
				let { Tt: s } = n, c = Mn(s)[e], l = e === "x", u = [fn(0, l), fn(`calc(-100% + 100cq${l ? "w" : "h"})`, l)], d = c ? u : u.reverse();
				return r[0] === d[0] && r[1] === d[1] ? a : (r = d, a(), t = o.kt.animate({
					clear: ["left"],
					transform: d
				}, { timeline: i }), a);
			} };
		}
	}, x = {
		x: b("x"),
		y: b("y")
	}, S = () => {
		let { Rt: e, Vt: t } = n, r = (e, t) => Ot(0, 1, e / (e + t) || 0);
		return {
			x: r(t.x, e.x),
			y: r(t.y, e.y)
		};
	}, C = (e, t, n) => {
		let r = n ? Vt : Bt;
		W(e, ((e) => {
			r(e.Lt, t);
		}));
	}, w = (e, t) => {
		W(e, ((e) => {
			let [n, r] = t(e);
			ln(n, r);
		}));
	}, T = (e, t, n) => {
		let r = Ue(n), i = r ? n : !0, a = r ? !n : !0;
		i && C(_, e, t), a && C(v, e, t);
	}, E = () => {
		let e = S(), t = (e) => (t) => [t.Lt, { "--os-viewport-percent": sn(e) + "" }];
		w(_, t(e.x)), w(v, t(e.y));
	}, D = () => {
		if (!Re) {
			let { Tt: e } = n, t = Nn(e, Q(d)), r = (e) => (t) => [t.Lt, { "--os-scroll-percent": sn(e) + "" }];
			w(_, r(t.x)), w(v, r(t.y));
		}
	}, ee = () => {
		let { Tt: e } = n, t = Mn(e), r = (e) => (t) => [t.Lt, { "--os-scroll-direction": e ? "0" : "1" }];
		w(_, r(t.x)), w(v, r(t.y)), Re && (_.forEach(x.x.Mt), v.forEach(x.y.Mt));
	}, O = () => {
		if (p && !f) {
			let { Rt: e, Tt: t } = n, r = Mn(t), i = Nn(t, Q(d)), a = (t) => {
				let { Lt: n } = t, a = qt(n) === l && n, o = (e, t, n) => {
					let r = t * e;
					return cn(n ? r : -r);
				};
				return [a, a && { transform: fn({
					x: o(i.x, e.x, r.x),
					y: o(i.y, e.y, r.y)
				}) }];
			};
			w(_, a), w(v, a);
		}
	}, k = (e) => {
		let t = e ? "x" : "y", n = tn(`${$} ${e ? mr : hr}`), i = tn(gr), a = tn(_r), o = {
			Lt: n,
			Pt: i,
			kt: a
		}, s = x[t];
		return G(e ? _ : v, o), G(g, [
			X(n, i),
			X(i, a),
			q(Zt, n),
			s && s.Mt(o),
			r(o, T, e)
		]), o;
	}, A = q(k, !0), j = q(k, !1);
	return A(), j(), [{
		Ut: E,
		Nt: D,
		qt: ee,
		Bt: O,
		Ft: T,
		jt: {
			Xt: _,
			Yt: A,
			Wt: q(w, _)
		},
		Jt: {
			Xt: v,
			Yt: j,
			Wt: q(w, v)
		}
	}, () => (X(y, _[0].Lt), X(y, v[0].Lt), q(K, g))];
}, oi = (e, t, n, r, i) => (a, o, s) => {
	let { vt: c, L: l, V: u, gt: d, Gt: f, St: p } = t, { Lt: m, Pt: h, kt: g } = a, [_, v] = xt(333), [y, b] = xt(444), x = (e) => {
		We(d.scrollBy) && d.scrollBy({
			behavior: "smooth",
			left: e.x,
			top: e.y
		});
	}, S = () => {
		let t = "pointerup pointercancel lostpointercapture", i = `client${s ? "X" : "Y"}`, a = s ? dt : ft, o = s ? "left" : "top", c = s ? "w" : "h", l = s ? "x" : "y", u = [];
		return Z(h, "pointerdown", r(((r) => {
			let m = Jt(r.target, `.${_r}`) === g, _ = m ? g : h, v = e.scrollbars, S = v[m ? "dragScroll" : "clickScroll"], { button: C, isPrimary: w, pointerType: T } = r, { pointers: E } = v;
			if (C === 0 && w && S && (E || []).includes(T)) {
				K(u), b();
				let e = !m && (r.shiftKey || S === "instant"), v = q(xn, g), C = q(xn, h), w = (e, t) => (e || v())[o] - (t || C())[o], T = De(xn(d)[a]) / _n(d)[c] || 1, E = Q(d)[l], D = (e) => {
					kn(d, { [l]: E + e });
				}, ee = (e) => {
					let { Rt: t } = n, r = _n(h)[c] - _n(g)[c];
					D(1 / T * e / r * t[l]);
				}, O = r[i], k = v(), A = C(), j = k[a], te = w(k, A) + j / 2, M = O - A[o] - te, N = m ? 0 : M, P = (e) => {
					K(L), _.releasePointerCapture(e.pointerId);
				}, F = m || e, I = p(), L = [
					Z(f, t, P),
					Z(f, "selectstart", ((e) => Dn(e)), { D: !1 }),
					Z(h, t, P),
					F && Z(h, "pointermove", ((e) => ee(N + e[i] - O))),
					F && (() => {
						let e = Q(d);
						I();
						let t = Q(d), n = {
							x: t.x - e.x,
							y: t.y - e.y
						};
						(Oe(n.x) > 3 || Oe(n.y) > 3) && (p(), kn(d, e), x(n), y(I));
					})
				];
				if (_.setPointerCapture(r.pointerId), e) ee(M);
				else if (!m) {
					let e = Hn(Pr);
					if (e) {
						let { Vt: t } = n, r = e(D, ee, q(w), M, t[l], S, !!s, ((e) => {
							e ? I() : G(L, I);
						}));
						G(L, r), G(u, q(r, !0));
					}
				}
			}
		})));
	}, C = !0;
	return q(K, [
		Z(g, "pointermove pointerleave", r(i)),
		Z(m, "pointerenter", r((() => {
			o(br, !0);
		}))),
		Z(m, "pointerleave pointercancel", r((() => {
			o(br, !1);
		}))),
		Z(m, "wheel", r(((e) => {
			let { deltaX: t, deltaY: n, deltaMode: r } = e;
			C && r === 0 && qt(m) === c && x({
				x: t,
				y: n
			}), C = !1, o(wr, !0), _((() => {
				C = !0, o(wr);
			})), Dn(e);
		})), {
			D: !1,
			I: !0
		}),
		!u && Z(m, "mousedown", r((() => {
			let e = Yt();
			(jt(e, Qn) || jt(e, Xn) || e === document.body) && Me(q(Pn, l), 25);
		}))),
		Z(m, "pointerdown", (() => {
			let e = Z(f, "click", ((e) => {
				t(), On(e);
			}), {
				A: !0,
				I: !0,
				D: !1
			}), t = Z(f, "pointerup pointercancel", (() => {
				t(), setTimeout(e, 150);
			}), {
				I: !0,
				D: !0
			});
		}), {
			I: !0,
			D: !0
		}),
		S(),
		v,
		b
	]);
}, si = (e, t, n, r, i, a, o) => {
	let s, c, l, u, d, f = Dt, p = 0, m = ["mouse", "pen"], h = (e) => (t) => {
		n.Kt || e(t);
	}, g = (e) => m.includes(e.pointerType), [_, v] = xt(), [y, b] = xt(100), [x, S] = xt(50), [C, w] = xt((() => p)), [T, E] = ai(e, a, i, oi(t, a, i, h, ((e) => g(e) && P()))), { vt: D, Qt: ee, bt: O } = a, { Ft: k, Ut: A, Nt: j, qt: te, Bt: M } = T, N = (e, t) => {
		w();
		let r = (e) => {
			n.Kt || k(Cr, e);
		};
		if (e) r();
		else {
			let e = l ? !s : !0;
			p > 0 && !t ? C(q(r, e)) : r(e);
		}
	}, P = () => {
		(l ? !s : !u) && (N(!0), y((() => {
			N(!1);
		})));
	}, F = (e) => {
		g(e) && (s = !0, !n.Kt && l && N(!0));
	}, I = (e) => {
		g(e) && (s = !1, !n.Kt && l && N(!1));
	}, L = (e) => {
		k(Sr, e, !0), k(Sr, e, !1);
	}, R = [
		w,
		b,
		S,
		v,
		() => f(),
		Z(D, "pointerover", F, { A: !0 }),
		Z(D, "pointerenter", F),
		Z(D, "pointerleave", I),
		Z(D, "pointermove", h(((e) => {
			g(e) && c && P();
		}))),
		Z(ee, "scroll", h(((e) => {
			_((() => {
				j(), P();
			})), o(e), M();
		})))
	], z = Hn(Nr);
	return [
		() => q(K, G(R, E())),
		({ Dt: e, It: t, Zt: n, tn: a }) => {
			let { nn: o, sn: s, en: m, cn: g } = a || {}, { Ct: _, ft: v } = n || {}, { B: y } = r, { M: b, P: S } = Jr(), { rn: C, j: w } = i, [T, E] = e("showNativeOverlaidScrollbars"), [D, P] = e("scrollbars.theme"), [F, I] = e("scrollbars.visibility"), [R, B] = e("scrollbars.autoHide"), [ne, re] = e("scrollbars.autoHideSuspend"), [ie] = e("scrollbars.autoHideDelay"), [ae, oe] = e("scrollbars.dragScroll"), [se, ce] = e("scrollbars.clickScroll"), [le, ue] = e("overflow"), de = v && !t, fe = o || s || g || _ || t, pe = m || I || ue, me = T && b.x && b.y, he = !S && !z, ge = me || he, _e = (e, t, n) => {
				let r = e.includes(ht) && (F === pt || F === "auto" && t === ht);
				return k(vr, r, n), r;
			};
			if (p = ie, (E || he) && k(fr, ge), P && (k(d), k(D, !0), d = D), (re || de) && (L(!ne), de && ne && (w.x || w.y ? (f(), x((() => {
				f = Z(ee, ht, h(q(L, !0)), { A: !0 });
			}))) : L(!0))), B && (c = R === "move", l = R === "leave", u = R === "never", N(u, !0)), oe && k(Er, ae), ce && k(Tr, !!se), pe) {
				let e = _e(le.x, C.x, !0), t = _e(le.y, C.y, !1);
				k(yr, !(e && t));
			}
			fe && (j(), A(), M(), g && te(), k(xr, !w.x, !0), k(xr, !w.y, !1), k(pr, y && !O));
		},
		{},
		T
	];
}, ci = (e) => {
	let { K: t, P: n } = Jr(), { elements: r } = t(), { padding: i, viewport: a, content: o } = r, s = Je(e), c = s ? {} : e, { elements: l } = c, { padding: u, viewport: d, content: f } = l || {}, p = s ? e : c.target, m = Gt(p), h = p.ownerDocument, g = h.documentElement, _ = () => h.defaultView || H, v = q(ni, [p]), y = q(ri, [p]), b = q(tn, ""), x = q(v, b, a), S = q(y, b, o), C = (e) => {
		let t = _n(e), n = yn(e), r = un(e, lt), i = un(e, ut);
		return n.w - t.w > 0 && !kr(r) || n.h - t.h > 0 && !kr(i);
	}, w = x(d), T = w === p, E = T && m, D = !T && S(f), ee = !T && w === D, O = E ? g : w, k = E ? O : p, A = !T && y(b, i, u), j = !ee && D, te = [
		j,
		O,
		A,
		k
	].map(((e) => Je(e) && !qt(e) && e)), M = (e) => e && Xe(te, e), N = !M(O) && C(O) ? O : p, P = E ? g : O, F = {
		dt: p,
		vt: k,
		L: O,
		ln: A,
		ht: j,
		gt: P,
		Qt: E ? h : O,
		an: m ? g : N,
		Gt: h,
		bt: m,
		At: s,
		V: T,
		un: _,
		yt: (e) => Rt(O, Qn, e),
		wt: (e, t) => Lt(O, Qn, e, t),
		St: () => Lt(P, Qn, rr, !0)
	}, { dt: I, vt: L, ln: R, L: z, ht: B } = F, ne = [() => {
		Nt(L, [Xn, qn]), Nt(I, qn), m && Nt(g, [qn, Xn]);
	}], re = Kt([
		B,
		z,
		R,
		L,
		I
	].find(((e) => e && !M(e)))), ie = E ? I : B || z, ae = q(K, ne);
	return [
		F,
		() => {
			let e = _(), t = Yt(), r = (e) => {
				X(qt(e), Kt(e)), Zt(e);
			}, i = (e) => Z(e, "focusin focusout focus blur", On, {
				I: !0,
				D: !1
			}), a = "tabindex", o = At(z, a), s = i(t);
			return Mt(L, Xn, T ? "" : Zn), Mt(R, or, ""), Mt(z, Qn, ""), Mt(B, sr, ""), T || (Mt(z, a, o || "-1"), m && Mt(g, Yn, "")), X(ie, re), X(L, R), X(R || L, !T && z), X(z, B), G(ne, [s, () => {
				let e = Yt(), t = M(z), n = t && e === z ? I : e, s = i(n);
				Nt(R, or), Nt(B, sr), Nt(z, Qn), m && Nt(g, Yn), o ? Mt(z, a, o) : Nt(z, a), M(B) && r(B), t && r(z), M(R) && r(R), Pn(n), s();
			}]), n && !T && (It(z, Qn, ir), G(ne, q(Nt, z, Qn))), Pn(!T && m && t === I && e.top === e ? z : t), s(), re = 0, ae;
		},
		ae
	];
}, li = ({ ht: e }) => ({ Zt: t, fn: n, It: r }) => {
	let { $t: i } = t || {}, { Ot: a } = n;
	e && (i || r) && ln(e, { [ft]: a && "100%" });
}, ui = ({ vt: e, ln: t, L: n, V: r }, i) => {
	let [a, o] = V({
		i: bt,
		o: dn()
	}, q(dn, e, "padding", ""));
	return ({ Dt: e, Zt: s, fn: c, It: l }) => {
		let [u, d] = o(l), { P: f } = Jr(), { _t: p, xt: m, Ct: h } = s || {}, { B: g } = c, [_, v] = e("paddingAbsolute");
		(p || d || l || m) && ([u, d] = a(l));
		let y = !r && (v || h || d);
		if (y) {
			let e = !_ || !t && !f, r = u.r + u.l, a = u.t + u.b, o = {
				[st]: e && !g ? -r : 0,
				[ct]: e ? -a : 0,
				[ot]: e && g ? -r : 0,
				top: e ? -u.t : 0,
				right: e ? g ? -u.r : "auto" : 0,
				left: e ? g ? "auto" : -u.l : 0,
				[dt]: e && `calc(100% + ${r}px)`
			}, s = {
				[nt]: e ? u.t : 0,
				[rt]: e ? u.r : 0,
				[at]: e ? u.b : 0,
				[it]: e ? u.l : 0
			};
			ln(t || n, o), ln(n, s), Y(i, {
				ln: u,
				_n: !e,
				F: t ? s : Y({}, o, s)
			});
		}
		return { dn: y };
	};
}, di = (e, t) => {
	let n = Jr(), { vt: r, ln: i, L: a, V: o, Qt: s, gt: c, bt: l, wt: u, un: d } = e, { P: f } = n, p = l && o, m = q(Te, 0), h = {
		display: () => !1,
		direction: (e) => e !== "ltr",
		flexDirection: (e) => e.endsWith("-reverse"),
		writingMode: (e) => e !== "horizontal-tb"
	}, g = J(h), _ = {
		i: vt,
		o: {
			w: 0,
			h: 0
		}
	}, v = {
		i: yt,
		o: {}
	}, y = (e) => {
		u(nr, !p && e);
	}, b = () => un(a, g), x = (e, t) => {
		let n = !J(e).length, r = t ? !0 : g.some(((t) => {
			let n = e[t];
			return He(n) && h[t](n);
		}));
		if (n || !r || !Sn(a)) return {
			T: {
				x: 0,
				y: 0
			},
			k: {
				x: 1,
				y: 1
			}
		};
		y(!0);
		let i = Q(c), o = Z(s, ht, ((e) => {
			let t = Q(c);
			e.isTrusted && t.x === i.x && t.y === i.y && En(e);
		}), {
			I: !0,
			A: !0
		}), l = u(ar, !0);
		kn(c, {
			x: 0,
			y: 0
		}), l();
		let d = Q(c), f = yn(c);
		kn(c, {
			x: f.w,
			y: f.h
		});
		let p = Q(c), m = {
			x: p.x - d.x,
			y: p.y - d.y
		};
		kn(c, {
			x: -f.w,
			y: -f.h
		});
		let _ = Q(c), v = {
			x: _.x - d.x,
			y: _.y - d.y
		}, b = {
			x: Oe(m.x) >= Oe(v.x) ? p.x : _.x,
			y: Oe(m.y) >= Oe(v.y) ? p.y : _.y
		};
		return kn(c, i), je((() => o())), {
			T: d,
			k: b
		};
	}, S = (e, t) => {
		let n = H.devicePixelRatio % 1 == 0 ? 0 : 1, r = {
			w: m(e.w - t.w),
			h: m(e.h - t.h)
		};
		return {
			w: r.w > n ? r.w : 0,
			h: r.h > n ? r.h : 0
		};
	}, C = (e, t) => {
		let n = (e, t, n, r) => {
			let i = e === pt ? mt : Ar(e), a = kr(e), o = kr(n);
			return !t && !r ? mt : a && o ? pt : a ? t && r ? i : t ? pt : mt : t ? i : o && r ? pt : mt;
		};
		return {
			x: n(t.x, e.x, t.y, e.y),
			y: n(t.y, e.y, t.x, e.x)
		};
	}, w = (e) => {
		let t = (e) => [
			pt,
			mt,
			ht
		].map(((t) => L(jr(t), e)));
		u(t(!0).concat(t()).join(" ")), u(J(e).map(((t) => L(e[t], t === "x"))).join(" "), !0);
	}, [T, E] = V(_, q(bn, a)), [D, ee] = V(_, q(yn, a)), [O, k] = V(_), [A] = V(v), [j, te] = V(_), [M] = V(v), [N] = V({
		i: (e, t) => _t(e, t, tt(Ze(J(e), J(t)))),
		o: {}
	}), [P, F] = V({
		i: (e, t) => yt(e.T, t.T) && yt(e.k, t.k),
		o: An()
	}), I = Hn(Nr), L = (e, t) => `${t ? $n : er}${gt(e)}`;
	return ({ Dt: o, Zt: s, fn: c, It: l }, { dn: h }) => {
		let { _t: g, Ht: _, xt: v, Ct: L, ft: R, Et: z } = s || {}, { X: B, Y: ne, W: re } = I && I.R(e, t, c, n, o) || {}, [ie, ae] = Or(o, n), [oe, se] = o("overflow"), ce = kr(oe.x), le = kr(oe.y), ue = g || h || v || L || z || ae, de = E(l), fe = ee(l), pe = k(l), me = te(l);
		if (ae && f && u(ir, !ie), ue) {
			Rt(r, Xn, Jn) && y(!0);
			let e = ne && ne(), [t] = de = T(l), [n] = fe = D(l), i = vn(a), o = p && gn(d()), s = {
				w: m(n.w + t.w),
				h: m(n.h + t.h)
			}, c = {
				w: m((o ? o.w : i.w + m(i.w - n.w)) + t.w),
				h: m((o ? o.h : i.h + m(i.h - n.h)) + t.h)
			};
			e && e(), me = j(c), pe = O(S(s, c), l);
		}
		let [he, ge] = me, [_e, ve] = pe, [ye, be] = fe, [xe, Se] = de, [Ce] = A({
			x: _e.w > 0,
			y: _e.h > 0
		}), we = ce && le && (Ce.x || Ce.y) || ce && Ce.x && !Ce.y || le && Ce.y && !Ce.x, V = h || L || z || Se || be || ge || ve || se || ae || ue || _ && p, [H] = o("update.flowDirectionStyles"), [Te, Ee] = N(H ? H(a) || {} : b(), l), [De, Oe] = L || R || Ee || l ? P(x(Te, !!H), l) : F(), ke = C(Ce, oe);
		y(!1), V && (w(ke), ke = Mr(a, Ce), re && B && (B(ke, ye, xe), ln(a, re(ke))));
		let [Ae, je] = M(ke);
		return Lt(r, Xn, Jn, we), Lt(i, or, Jn, we), Y(t, {
			rn: Ae,
			Vt: {
				x: he.w,
				y: he.h
			},
			Rt: {
				x: _e.w,
				y: _e.h
			},
			j: Ce,
			Tt: jn(De, _e)
		}), {
			en: je,
			nn: ge,
			sn: ve,
			cn: Oe || ve
		};
	};
}, fi = (e) => {
	let [t, n, r] = ci(e), i = {
		ln: {
			t: 0,
			r: 0,
			b: 0,
			l: 0
		},
		_n: !1,
		F: {
			[st]: 0,
			[ct]: 0,
			[ot]: 0,
			[nt]: 0,
			[rt]: 0,
			[at]: 0,
			[it]: 0
		},
		Vt: {
			x: 0,
			y: 0
		},
		Rt: {
			x: 0,
			y: 0
		},
		rn: {
			x: mt,
			y: mt
		},
		j: {
			x: !1,
			y: !1
		},
		Tt: An()
	}, { dt: a, gt: o, V: s, St: c } = t, { P: l, M: u } = Jr(), d = !l && (u.x || u.y), f = [
		li(t),
		ui(t, i),
		di(t, i)
	];
	return [
		n,
		(e) => {
			let t = {}, n = d && Q(o), r = n && c();
			return W(f, ((n) => {
				Y(t, n(e, t) || {});
			})), kn(o, n), r && r(), s || kn(a, 0), t;
		},
		i,
		t,
		r
	];
}, pi = (e, t, n, r) => {
	let i = !1, a = {
		Kt: !1,
		pn: !1
	}, o = Hr(t, {}), [s, c, l, u, d] = fi(e), [f, p, m] = ei(u, l, o, ((e) => {
		y({}, e);
	})), [h, g, , _] = si(e, t, a, m, l, u, r), v = (e) => J(e).some(((t) => !!e[t])), y = (e, r) => {
		let { Kt: o, pn: s } = a;
		if (s || o && i) return !1;
		let { vn: l, It: u, zt: d } = e, f = l || {}, h = !!u || !i, _ = {
			Dt: Hr(t, f, h),
			vn: f,
			It: h
		}, y = r || p(Y({}, _, { zt: d })), b = c(Y({}, _, {
			fn: m,
			Zt: y
		}));
		g(Y({}, _, {
			Zt: y,
			tn: b
		}));
		let x = v(y), S = v(b), C = x || S || !Et(f) || h;
		return i = !0, C && n(e, {
			Zt: y,
			tn: b
		}), C;
	};
	return [
		() => {
			let { an: e, gt: t, St: n } = u, r = Q(e), i = [
				f(),
				s(),
				h(),
				() => {
					a.pn = !0;
				}
			], o = n();
			return kn(t, r), o(), q(K, i);
		},
		y,
		(e) => {
			let t = a.Kt;
			a.Kt = e, !e && t !== e && y({
				It: !0,
				zt: !0
			});
		},
		() => {
			g({
				Dt: Hr(t, {}, !1),
				vn: {},
				It: !1
			});
		},
		() => ({
			gn: a,
			hn: m,
			bn: l
		}),
		{
			yn: u,
			wn: _
		},
		d
	];
}, mi = /* @__PURE__ */ new WeakMap(), hi = (e, t) => {
	mi.set(e, t);
}, gi = (e) => {
	mi.delete(e);
}, _i = (e) => mi.get(e), vi = (e, t, n) => {
	let { tt: r } = Jr(), i = Je(e), a = i ? e : e.target, o = _i(a);
	if (t && !o) {
		let o = [], s = {}, c = (e) => {
			let t = Tt(e), n = Hn(Un);
			return n ? n(t, !0) : t;
		}, l = Y({}, r(), c(t)), [u, d, f] = In(), [p, m, h] = In(n), g = (e, t) => {
			h(e, t), f(e, t);
		}, [_, v, y, b, x, S, C] = pi(e, l, (({ vn: e, It: t }, { Zt: n, tn: r }) => {
			let { _t: i, Ct: a, $t: o, xt: s, Ht: c, ft: l } = n, { nn: u, sn: d, en: f, cn: p } = r;
			g("updated", [T, {
				updateHints: {
					sizeChanged: !!i,
					directionChanged: !!a,
					heightIntrinsicChanged: !!o,
					overflowEdgeChanged: !!u,
					overflowAmountChanged: !!d,
					overflowStyleChanged: !!f,
					scrollCoordinatesChanged: !!p,
					contentMutation: !!s,
					hostMutation: !!c,
					appear: !!l
				},
				changedOptions: e || {},
				force: !!t
			}]);
		}), ((e) => g("scroll", [T, e]))), w = (e) => {
			let { gn: t } = x(), { pn: n } = t;
			n || (gi(a), K(o), g("destroyed", [T, e]), d(), m());
		}, T = {
			options(e, t) {
				if (e) {
					let n = Vr(l, Y(t ? r() : {}, c(e)));
					Et(n) || (Y(l, n), v({ vn: n }));
				}
				return Y({}, l);
			},
			on: p,
			off: (e, t) => {
				e && t && m(e, t);
			},
			state() {
				let { gn: e, hn: t, bn: n } = x(), { pn: r, Kt: i } = e, { B: a } = t, { Vt: o, Rt: s, rn: c, j: l, ln: u, _n: d, Tt: f } = n;
				return Y({}, {
					overflowEdge: o,
					overflowAmount: s,
					overflowStyle: c,
					hasOverflow: l,
					scrollCoordinates: {
						start: f.T,
						end: f.k
					},
					padding: u,
					paddingAbsolute: d,
					directionRTL: a,
					sleeping: i,
					destroyed: r
				});
			},
			elements() {
				let { dt: e, vt: t, ln: n, L: r, ht: i, gt: a, Qt: o } = S.yn, { jt: s, Jt: c } = S.wn, l = (e) => {
					let { kt: t, Pt: n, Lt: r } = e;
					return {
						scrollbar: r,
						track: n,
						handle: t
					};
				}, u = (e) => {
					let { Xt: t, Yt: n } = e;
					return Y({}, l(t[0]), { clone: () => {
						let e = l(n());
						return b(), e;
					} });
				};
				return Y({}, {
					target: e,
					host: t,
					padding: n || r,
					viewport: r,
					content: i || r,
					scrollOffsetElement: a,
					scrollEventElement: o,
					scrollbarHorizontal: u(s),
					scrollbarVertical: u(c)
				});
			},
			update: (e) => v({
				It: e,
				zt: !0
			}),
			destroy: q(w, !1),
			sleep: y,
			plugin: (e) => s[J(e)[0]]
		};
		return G(o, [C]), hi(a, T), Bn(Ln, vi, [
			T,
			u,
			s
		]), ii(S.yn.bt, !i && e.cancel) ? (w(!0), T) : (G(o, _()), g("initialized", [T]), T.update(), T);
	}
	return o;
};
vi.plugin = (e) => {
	let t = U(e), n = t ? e : [e], r = n.map(((e) => Bn(e, vi)[0]));
	return zn(n), t ? r : r[0];
}, vi.valid = (e) => {
	let t = e && e.elements, n = We(t) && t();
	return qe(n) && !!_i(n.target);
}, vi.env = () => {
	let { U: e, M: t, P: n, J: r, ot: i, st: a, K: o, Z: s, tt: c, nt: l } = Jr();
	return Y({}, {
		scrollbarsSize: e,
		scrollbarsOverlaid: t,
		scrollbarsHiding: n,
		scrollTimeline: r,
		staticDefaultInitialization: i,
		staticDefaultOptions: a,
		getDefaultInitialization: o,
		setDefaultInitialization: s,
		getDefaultOptions: c,
		setDefaultOptions: l
	});
}, vi.nonce = Gr, vi.trustedTypePolicy = en;
//#endregion
//#region ../../node_modules/.pnpm/overlayscrollbars-vue@0.5.10_overlayscrollbars@2.16.0_vue@3.5.34_typescript@6.0.3_/node_modules/overlayscrollbars-vue/overlayscrollbars-vue.mjs
var yi = () => {
	if (typeof window > "u") {
		let e = () => {};
		return [e, e];
	}
	let e, t, n = window, r = typeof n.requestIdleCallback == "function", i = n.requestAnimationFrame, a = n.cancelAnimationFrame, o = r ? n.requestIdleCallback : i, s = r ? n.cancelIdleCallback : a, c = () => {
		s(e), a(t);
	};
	return [(n, a) => {
		c(), e = o(r ? () => {
			c(), t = i(n);
		} : n, typeof a == "object" ? a : { timeout: 2233 });
	}, c];
}, bi = (e) => {
	let t = null, n, r, i, a = ie(e || {}), [o, s] = yi();
	return ve(() => de(a.value?.defer), (e) => {
		i = e;
	}, {
		deep: !0,
		immediate: !0
	}), ve(() => de(a.value?.options), (e) => {
		n = e, vi.valid(t) && t.options(n || {}, !0);
	}, {
		deep: !0,
		immediate: !0
	}), ve(() => de(a.value?.events), (e) => {
		r = e, vi.valid(t) && t.on(
			/* c8 ignore next */
			r || {},
			!0
		);
	}, {
		deep: !0,
		immediate: !0
	}), N(() => {
		s(), t?.destroy();
	}), [(e) => {
		if (vi.valid(t)) return t;
		let a = () => t = vi(e, n || {}, r || {});
		i ? o(a, i) : a();
	}, () => t];
}, xi = /* @__PURE__ */ g({
	__name: "OverlayScrollbarsComponent",
	props: {
		element: {
			type: [String, Object],
			default: "div"
		},
		options: { type: Object },
		events: { type: Object },
		defer: { type: [Boolean, Object] }
	},
	emits: [
		"osInitialized",
		"osUpdated",
		"osDestroyed",
		"osScroll"
	],
	setup(e, { expose: t, emit: n }) {
		let r = e, i = {
			initialized: "osInitialized",
			updated: "osUpdated",
			destroyed: "osDestroyed",
			scroll: "osScroll"
		}, { element: a, options: o, events: s, defer: l } = le(r), d = ie(null), f = ie(null), p = L(), [m, h] = bi({
			options: o,
			events: p,
			defer: l
		});
		return t({
			osInstance: h,
			getElement: () => d.value
		}), be((e) => {
			let { value: t } = d, { value: n } = f;
			t && (m(a.value === "body" ? {
				target: t,
				cancel: { body: null }
			} : {
				target: t,
				elements: {
					viewport: n,
					content: n
				}
			}), e(() => h()?.destroy()));
		}), ve(() => de(s), (e) => {
			let t = e || {};
			p.value = Object.keys(i).reduce((e, r) => {
				let a = t[r];
				return e[r] = [(...e) => n(i[r], ...e), ...(Array.isArray(a) ? a : [a]).filter(Boolean)], e;
			}, {});
		}, {
			deep: !0,
			immediate: !0
		}), (e, t) => (P(), c(ne(de(a)), {
			"data-overlayscrollbars-initialize": "",
			ref_key: "elementRef",
			ref: d
		}, {
			default: xe(() => [de(a) === "body" ? z(e.$slots, "default", { key: 0 }) : (P(), u("div", {
				key: 1,
				"data-overlayscrollbars-contents": "",
				ref_key: "slotRef",
				ref: f
			}, [z(e.$slots, "default")], 512))]),
			_: 3
		}, 512));
	}
}), Si = /* @__PURE__ */ e({});
//#endregion
export { de as $, ee as A, L as B, x as C, T as D, w as E, te as F, re as G, z as H, M as I, oe as J, ie as K, P as L, k as M, A as N, E as O, j as P, ue as Q, F as R, b as S, C as T, B as U, R as V, ne as W, ce as X, se as Y, le as Z, h as _, r as a, _e as at, v as b, o as c, xe as ct, l as d, we as dt, fe as et, u as f, m as g, p as h, n as i, ge as it, O as j, D as k, s as l, Se as lt, f as m, xi as n, me as nt, i as o, ve as ot, d as p, ae as q, bi as r, he as rt, a as s, ye as st, Si as t, pe as tt, c as u, Ce as ut, g as v, S as w, y as x, _ as y, I as z };
