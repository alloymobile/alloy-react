import { jsx as d, jsxs as E } from "react/jsx-runtime";
import { useRef as y, useState as h, useMemo as g, forwardRef as j, useImperativeHandle as D, useEffect as C } from "react";
let A = 0;
function _() {
  return A += 1, `icon${A}`;
}
class M {
  /**
   * @param {{ id?: string, iconClass: string }} params
   */
  constructor({ id: e, iconClass: n }) {
    if (!n) throw new Error("Icon requires iconClass");
    this.id = e ?? _(), this.iconClass = n;
  }
}
function N({ icon: s }) {
  if (!s) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ d("i", { id: s.id, className: s.iconClass, "aria-hidden": "true" });
}
let O = 0;
function b() {
  return O += 1, `alloylink${O}`;
}
function $(s = "", e = "") {
  const [n, r] = h(!1), [o, t] = h(!1), [i, l] = h(!1);
  return {
    className: g(() => [s, (n || o || i) && e].filter(Boolean).join(" "), [s, e, n, o, i]),
    events: {
      onMouseEnter: () => r(!0),
      onMouseLeave: () => {
        r(!1), t(!1);
      },
      onMouseDown: () => t(!0),
      onMouseUp: () => t(!1),
      onFocus: () => l(!0),
      onBlur: () => l(!1)
    }
  };
}
class I {
  /**
   * @param {{ id?: string, name?: string, link: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e: any)=>void, title?: string }} p
   */
  constructor({
    id: e,
    name: n,
    href: r,
    className: o,
    active: t,
    target: i,
    rel: l,
    onClick: c,
    title: a
  }) {
    if (!r) throw new Error("LinkObject requires `href`.");
    this.id = e ?? b(), this.name = n, this.href = r, this.className = o ?? "", this.active = t ?? "", this.target = i, this.rel = l, this.onClick = c, this.title = a;
  }
}
function se({ link: s }) {
  if (!s || !(s instanceof I))
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  if (!s.name) throw new Error("AlloyLink requires `link.name`.");
  const e = y(s.id), { className: n, events: r } = $(s.className, s.active), o = s.target === "_blank" ? s.rel ? `${s.rel} noopener noreferrer` : "noopener noreferrer" : s.rel;
  return /* @__PURE__ */ d(
    "a",
    {
      id: e.current,
      href: s.href,
      className: n,
      target: s.target,
      rel: o,
      onClick: s.onClick,
      title: s.title,
      ...r,
      children: /* @__PURE__ */ d("span", { children: s.name })
    }
  );
}
let F = 0;
function H() {
  return F += 1, `alloylink${F}`;
}
function R(s = "", e = "") {
  const [n, r] = h(!1), [o, t] = h(!1), [i, l] = h(!1);
  return {
    className: g(
      () => [s, (n || o || i) && e].filter(Boolean).join(" "),
      [s, e, n, o, i]
    ),
    events: {
      onMouseEnter: () => r(!0),
      onMouseLeave: () => {
        r(!1), t(!1);
      },
      onMouseDown: () => t(!0),
      onMouseUp: () => t(!1),
      onFocus: () => l(!0),
      onBlur: () => l(!1)
    }
  };
}
class P {
  /**
   * @param {{ id?: string, link: string, icon: Icon, name?: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e:any)=>void, title?: string }} p
   */
  constructor({
    id: e,
    href: n,
    icon: r,
    name: o,
    className: t,
    active: i,
    target: l,
    rel: c,
    onClick: a,
    title: w
  }) {
    if (!n) throw new Error("LinkIconObject requires `href`.");
    if (!r || !(r instanceof M))
      throw new Error("LinkIconObject requires `icon` (Icon instance).");
    this.id = e ?? H(), this.href = n, this.icon = r instanceof M ? r : new M(r), this.name = o, this.className = t ?? "", this.active = i ?? "", this.target = l, this.rel = c, this.onClick = a, this.title = w;
  }
}
function ne({ linkIcon: s }) {
  if (!s || !(s instanceof P))
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  const e = y(s.id), { className: n, events: r } = R(s.className, s.active), o = s.target === "_blank" ? s.rel ? `${s.rel} noopener noreferrer` : "noopener noreferrer" : s.rel, t = !!s.name;
  return /* @__PURE__ */ d(
    "a",
    {
      id: e.current,
      href: s.href,
      className: n,
      target: s.target,
      rel: o,
      onClick: s.onClick,
      title: s.title,
      ...r,
      children: /* @__PURE__ */ E("span", { children: [
        /* @__PURE__ */ d(N, { icon: s.icon }),
        t && /* @__PURE__ */ d("span", { className: "px-1", children: s.name })
      ] })
    }
  );
}
let K = 0;
function T() {
  return K += 1, `alloylink${K}`;
}
function z(s = "", e = "") {
  const [n, r] = h(!1), [o, t] = h(!1), [i, l] = h(!1);
  return {
    className: g(
      () => [s, (n || o || i) && e].filter(Boolean).join(" "),
      [s, e, n, o, i]
    ),
    events: {
      onMouseEnter: () => r(!0),
      onMouseLeave: () => {
        r(!1), t(!1);
      },
      onMouseDown: () => t(!0),
      onMouseUp: () => t(!1),
      onFocus: () => l(!0),
      onBlur: () => l(!1)
    }
  };
}
class G {
  /**
   * @param {{ id?: string, name?: string, link: string, logo: string, width?: number|string, height?: number|string, logoAlt?: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e:any)=>void, title?: string }} p
   */
  constructor({
    id: e,
    name: n,
    href: r,
    logo: o,
    width: t,
    height: i,
    logoAlt: l = "",
    className: c,
    active: a,
    target: w,
    rel: u,
    onClick: f,
    title: v
  }) {
    if (!r) throw new Error("LinkLogoObject requires `href`.");
    if (!o) throw new Error("LinkLogoObject requires `logo`.");
    this.id = e ?? T(), this.name = n, this.href = r, this.logo = o, this.width = t, this.height = i, this.logoAlt = l, this.className = c ?? "", this.active = a ?? "", this.target = w, this.rel = u, this.onClick = f, this.title = v;
  }
}
function oe({ linkLogo: s }) {
  if (!s || !(s instanceof G))
    throw new Error("AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance).");
  const e = y(s.id), { className: n, events: r } = z(s.className, s.active), o = s.target === "_blank" ? s.rel ? `${s.rel} noopener noreferrer` : "noopener noreferrer" : s.rel, t = !!s.name;
  return /* @__PURE__ */ d(
    "a",
    {
      id: e.current,
      href: s.href,
      className: n,
      target: s.target,
      rel: o,
      onClick: s.onClick,
      title: s.title,
      ...r,
      children: /* @__PURE__ */ E("span", { children: [
        /* @__PURE__ */ d(
          "img",
          {
            src: s.logo,
            alt: s.logoAlt || s.name,
            width: s.width,
            height: s.height,
            style: { display: "inline-block" }
          }
        ),
        t && /* @__PURE__ */ d("span", { className: "px-1", children: s.name })
      ] })
    }
  );
}
let q = 0;
function J() {
  return q += 1, `alloybtn${q}`;
}
function Q(s = "", e = "") {
  const [n, r] = h(!1), [o, t] = h(!1), [i, l] = h(!1);
  return {
    className: g(() => [s, (n || o || i) && e].filter(Boolean).join(" "), [s, e, n, o, i]),
    events: {
      onMouseEnter: () => r(!0),
      onMouseLeave: () => {
        r(!1), t(!1);
      },
      onMouseDown: () => t(!0),
      onMouseUp: () => t(!1),
      onFocus: () => l(!0),
      onBlur: () => l(!1)
    }
  };
}
class V {
  constructor(e) {
    if (!e || !e.name) throw new Error("ButtonObject requires `name`.");
    this.id = e.id ?? J(), this.name = e.name, this.className = e.className ?? "", this.active = e.active ?? "", this.disabled = !!e.disabled, this.title = e.title, this.ariaLabel = e.ariaLabel, this.tabIndex = e.tabIndex, this.onClick = e.onClick, this.onKeyDown = e.onKeyDown, this.onKeyUp = e.onKeyUp, this.onFocus = e.onFocus, this.onBlur = e.onBlur, this.onMouseEnter = e.onMouseEnter, this.onMouseLeave = e.onMouseLeave;
  }
}
const re = j(function({ button: e, output: n }, r) {
  if (!e || !(e instanceof V))
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  const o = y(null), t = y(e.id), i = e.disabled, { className: l, events: c } = Q(e.className, e.active);
  D(
    r,
    () => ({
      el: o.current,
      model: e,
      focus: () => {
        var u;
        return (u = o.current) == null ? void 0 : u.focus();
      },
      click: () => {
        var u;
        return (u = o.current) == null ? void 0 : u.click();
      }
    }),
    [e]
  );
  const a = (u, f) => (v) => {
    f == null || f(v), n == null || n(e, v), u == null || u(v, e);
  }, w = {
    onClick: a(e.onClick),
    onKeyDown: a(e.onKeyDown, c.onFocus),
    onKeyUp: a(e.onKeyUp),
    onFocus: a(e.onFocus, c.onFocus),
    onBlur: a(e.onBlur, c.onBlur),
    onMouseEnter: a(e.onMouseEnter, c.onMouseEnter),
    onMouseLeave: a(e.onMouseLeave, c.onMouseLeave),
    onMouseDown: a(void 0, c.onMouseDown),
    onMouseUp: a(void 0, c.onMouseUp)
  };
  return /* @__PURE__ */ d(
    "button",
    {
      id: t.current,
      ref: o,
      type: "button",
      className: l,
      title: e.title,
      "aria-label": e.ariaLabel || e.name,
      "aria-disabled": i || void 0,
      disabled: i,
      tabIndex: e.tabIndex,
      ...w,
      children: /* @__PURE__ */ d("span", { className: "px-2 align-middle", children: e.name })
    }
  );
});
let k = 0;
function W() {
  return k += 1, `alloybtnicon${k}`;
}
function X(s = "", e = "") {
  const [n, r] = h(!1), [o, t] = h(!1), [i, l] = h(!1);
  return {
    className: g(() => [s, (n || o || i) && e].filter(Boolean).join(" "), [s, e, n, o, i]),
    events: {
      onMouseEnter: () => r(!0),
      onMouseLeave: () => {
        r(!1), t(!1);
      },
      onMouseDown: () => t(!0),
      onMouseUp: () => t(!1),
      onFocus: () => l(!0),
      onBlur: () => l(!1)
    }
  };
}
class Y {
  constructor(e) {
    if (!e || !e.icon) throw new Error("ButtonIconObject requires `icon` (IconObject).");
    this.id = e.id ?? W(), this.name = e.name, this.icon = e.icon instanceof M ? e.icon : new M(e.icon), this.className = e.className ?? "", this.active = e.active ?? "", this.disabled = !!e.disabled, this.title = e.title, this.ariaLabel = e.ariaLabel, this.tabIndex = e.tabIndex, this.onClick = e.onClick, this.onKeyDown = e.onKeyDown, this.onKeyUp = e.onKeyUp, this.onFocus = e.onFocus, this.onBlur = e.onBlur, this.onMouseEnter = e.onMouseEnter, this.onMouseLeave = e.onMouseLeave;
  }
}
const te = j(function({ buttonIcon: e, output: n }, r) {
  if (!e || !(e instanceof Y))
    throw new Error("AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance).");
  const o = y(null), t = y(e.id), i = e.disabled, { className: l, events: c } = X(e.className, e.active);
  D(
    r,
    () => ({
      el: o.current,
      model: e,
      focus: () => {
        var f;
        return (f = o.current) == null ? void 0 : f.focus();
      },
      click: () => {
        var f;
        return (f = o.current) == null ? void 0 : f.click();
      }
    }),
    [e]
  );
  const a = (f, v) => (L) => {
    v == null || v(L), n == null || n(e, L), f == null || f(L, e);
  }, w = {
    onClick: a(e.onClick),
    onKeyDown: a(e.onKeyDown, c.onFocus),
    onKeyUp: a(e.onKeyUp),
    onFocus: a(e.onFocus, c.onFocus),
    onBlur: a(e.onBlur, c.onBlur),
    onMouseEnter: a(e.onMouseEnter, c.onMouseEnter),
    onMouseLeave: a(e.onMouseLeave, c.onMouseLeave),
    onMouseDown: a(void 0, c.onMouseDown),
    onMouseUp: a(void 0, c.onMouseUp)
  }, u = e.ariaLabel || e.name || "icon button";
  return /* @__PURE__ */ E(
    "button",
    {
      id: t.current,
      ref: o,
      type: "button",
      className: l,
      title: e.title,
      "aria-label": u,
      "aria-disabled": i || void 0,
      disabled: i,
      tabIndex: e.tabIndex,
      ...w,
      children: [
        /* @__PURE__ */ d("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ d(N, { icon: e.icon }) }),
        e.name ? /* @__PURE__ */ d("span", { className: "px-2 align-middle", children: e.name }) : null
      ]
    }
  );
});
let U = 0;
function Z() {
  return U += 1, `alloybtnsubmit${U}`;
}
class p {
  constructor(e) {
    if (!e || !e.name) throw new Error("ButtonSubmitObject requires `name`.");
    if (!e.icon) throw new Error("ButtonSubmitObject requires `icon`.");
    this.id = e.id ?? Z(), this.name = e.name, this.icon = e.icon instanceof M ? e.icon : new M(e.icon), this.className = e.className ?? "", this.disabled = !!e.disabled, this.loading = !!e.loading, this.title = e.title, this.ariaLabel = e.ariaLabel, this.tabIndex = e.tabIndex, this.onClick = e.onClick, this.onMouseDown = e.onMouseDown, this.onKeyDown = e.onKeyDown;
  }
}
const ie = j(function({ buttonSubmit: e, output: n }, r) {
  if (!e || !(e instanceof p))
    throw new Error("AlloyButtonSubmit requires `buttonSubmit` (ButtonSubmitObject instance).");
  const o = y(null), t = y(e.id), [i, l] = h(!!e.loading);
  C(() => {
    l(!!e.loading);
  }, [e.loading]);
  const c = e.disabled || i;
  D(
    r,
    () => ({
      el: o.current,
      model: e,
      focus: () => {
        var m;
        return (m = o.current) == null ? void 0 : m.focus();
      },
      click: () => {
        var m;
        return (m = o.current) == null ? void 0 : m.click();
      }
    }),
    [e]
  );
  const a = y(!1);
  C(() => {
    i || (a.current = !1);
  }, [i]);
  const w = () => a.current || c ? !1 : (a.current = !0, e.loading = !0, e.disabled = !0, l(!0), !0), u = (m, B) => {
    n == null || n(e, m), B == null || B(m, e);
  }, f = (m) => {
    w() && u(m, e.onClick);
  }, v = (m) => {
    w() && u(m, e.onMouseDown);
  }, L = (m) => {
    const B = m.key;
    (B === "Enter" || B === " ") && w() && u(m, e.onKeyDown);
  }, x = i;
  return /* @__PURE__ */ E(
    "button",
    {
      id: t.current,
      ref: o,
      type: "submit",
      className: e.className,
      title: e.title,
      "aria-label": e.ariaLabel || e.name,
      "aria-busy": i || void 0,
      "aria-disabled": c || void 0,
      disabled: c,
      tabIndex: e.tabIndex,
      onClick: f,
      onMouseDown: v,
      onKeyDown: L,
      children: [
        x && /* @__PURE__ */ d("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ d(N, { icon: e.icon }) }),
        /* @__PURE__ */ d("span", { className: x ? "px-2 align-middle" : "align-middle", children: e.name }),
        i ? /* @__PURE__ */ d("span", { className: "ms-2 visually-hidden", "aria-live": "polite", children: "Loading…" }) : null
      ]
    }
  );
});
export {
  re as AlloyButton,
  te as AlloyButtonIcon,
  ie as AlloyButtonSubmit,
  N as AlloyIcon,
  se as AlloyLink,
  ne as AlloyLinkIcon,
  oe as AlloyLinkLogo,
  Y as ButtonIconObject,
  V as ButtonObject,
  p as ButtonSubmitObject,
  M as IconObject,
  P as LinkIconObject,
  G as LinkLogoObject,
  I as LinkObject
};
//# sourceMappingURL=alloy-react.es.js.map
