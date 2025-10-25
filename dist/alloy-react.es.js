import { jsx as r, jsxs as N, Fragment as K } from "react/jsx-runtime";
import * as g from "react";
import { useRef as O, useState as C, useMemo as S, forwardRef as fe, useImperativeHandle as ye, useEffect as Z, useCallback as mt } from "react";
import "react-dom";
let xe = 0;
function ft() {
  return xe += 1, `alloyIcon${xe}`;
}
class w {
  /**
   * @param {{ id?: string, iconClass: string }} params
   */
  constructor({ id: t, iconClass: a }) {
    if (!a) throw new Error("Icon requires iconClass");
    this.id = t ?? ft(), this.iconClass = a;
  }
}
function k({ icon: e }) {
  if (!e) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ r("i", { id: e.id, className: e.iconClass, "aria-hidden": "true" });
}
let be = 0;
function yt() {
  return be += 1, `alloyLink${be}`;
}
function vt(e = "", t = "") {
  const [a, i] = C(!1), [o, l] = C(!1), [u, s] = C(!1);
  return {
    className: S(() => [e, (a || o || u) && t].filter(Boolean).join(" "), [e, t, a, o, u]),
    events: {
      onMouseEnter: () => i(!0),
      onMouseLeave: () => {
        i(!1), l(!1);
      },
      onMouseDown: () => l(!0),
      onMouseUp: () => l(!1),
      onFocus: () => s(!0),
      onBlur: () => s(!1)
    }
  };
}
class $ {
  /**
   * @param {{ id?: string, name?: string, link: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e: any)=>void, title?: string }} p
   */
  constructor({
    id: t,
    name: a,
    href: i,
    className: o,
    active: l,
    target: u,
    rel: s,
    onClick: c,
    title: n
  }) {
    if (!i) throw new Error("LinkObject requires `href`.");
    this.id = t ?? yt(), this.name = a, this.href = i, this.className = o ?? "", this.active = l ?? "", this.target = u, this.rel = s, this.onClick = c, this.title = n;
  }
}
function pt({ link: e }) {
  if (!e || !(e instanceof $))
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  if (!e.name) throw new Error("AlloyLink requires `link.name`.");
  const t = O(e.id), { className: a, events: i } = vt(e.className, e.active), o = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel;
  return /* @__PURE__ */ r(
    "a",
    {
      id: t.current,
      href: e.href,
      className: a,
      target: e.target,
      rel: o,
      onClick: e.onClick,
      title: e.title,
      ...i,
      children: /* @__PURE__ */ r("span", { children: e.name })
    }
  );
}
let Ee = 0;
function gt() {
  return Ee += 1, `alloyLinkIcon${Ee}`;
}
function Nt(e = "", t = "") {
  const [a, i] = C(!1), [o, l] = C(!1), [u, s] = C(!1);
  return {
    className: S(
      () => [e, (a || o || u) && t].filter(Boolean).join(" "),
      [e, t, a, o, u]
    ),
    events: {
      onMouseEnter: () => i(!0),
      onMouseLeave: () => {
        i(!1), l(!1);
      },
      onMouseDown: () => l(!0),
      onMouseUp: () => l(!1),
      onFocus: () => s(!0),
      onBlur: () => s(!1)
    }
  };
}
class B {
  /**
   * @param {{ id?: string, link: string, icon: Icon, name?: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e:any)=>void, title?: string }} p
   */
  constructor({
    id: t,
    href: a,
    icon: i,
    name: o,
    className: l,
    active: u,
    target: s,
    rel: c,
    onClick: n,
    title: h
  }) {
    if (!a) throw new Error("LinkIconObject requires `href`.");
    if (!i || !(i instanceof w))
      throw new Error("LinkIconObject requires `icon` (Icon instance).");
    this.id = t ?? gt(), this.href = a, this.icon = i instanceof w ? i : new w(i), this.name = o, this.className = l ?? "", this.active = u ?? "", this.target = s, this.rel = c, this.onClick = n, this.title = h;
  }
}
function wt({ linkIcon: e }) {
  if (!e || !(e instanceof B))
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  const t = O(e.id), { className: a, events: i } = Nt(e.className, e.active), o = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, l = !!e.name;
  return /* @__PURE__ */ r(
    "a",
    {
      id: t.current,
      href: e.href,
      className: a,
      target: e.target,
      rel: o,
      onClick: e.onClick,
      title: e.title,
      ...i,
      children: /* @__PURE__ */ N("span", { children: [
        /* @__PURE__ */ r(k, { icon: e.icon }),
        l && /* @__PURE__ */ r("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
let Le = 0;
function Ct() {
  return Le += 1, `alloyLinkLogo${Le}`;
}
function xt(e = "", t = "") {
  const [a, i] = C(!1), [o, l] = C(!1), [u, s] = C(!1);
  return {
    className: S(
      () => [e, (a || o || u) && t].filter(Boolean).join(" "),
      [e, t, a, o, u]
    ),
    events: {
      onMouseEnter: () => i(!0),
      onMouseLeave: () => {
        i(!1), l(!1);
      },
      onMouseDown: () => l(!0),
      onMouseUp: () => l(!1),
      onFocus: () => s(!0),
      onBlur: () => s(!1)
    }
  };
}
class M {
  /**
   * @param {{ id?: string, name?: string, link: string, logo: string, width?: number|string, height?: number|string, logoAlt?: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e:any)=>void, title?: string }} p
   */
  constructor({
    id: t,
    name: a,
    href: i,
    logo: o,
    width: l,
    height: u,
    logoAlt: s = "",
    className: c,
    active: n,
    target: h,
    rel: d,
    onClick: m,
    title: p
  }) {
    if (!i) throw new Error("LinkLogoObject requires `href`.");
    if (!o) throw new Error("LinkLogoObject requires `logo`.");
    this.id = t ?? Ct(), this.name = a, this.href = i, this.logo = o, this.width = l, this.height = u, this.logoAlt = s, this.className = c ?? "", this.active = n ?? "", this.target = h, this.rel = d, this.onClick = m, this.title = p;
  }
}
function Ye({ linkLogo: e }) {
  if (!e || !(e instanceof M))
    throw new Error("AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance).");
  const t = O(e.id), { className: a, events: i } = xt(e.className, e.active), o = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, l = !!e.name;
  return /* @__PURE__ */ r(
    "a",
    {
      id: t.current,
      href: e.href,
      className: a,
      target: e.target,
      rel: o,
      onClick: e.onClick,
      title: e.title,
      ...i,
      children: /* @__PURE__ */ N("span", { children: [
        /* @__PURE__ */ r(
          "img",
          {
            src: e.logo,
            alt: e.logoAlt || e.name,
            width: e.width,
            height: e.height,
            style: { display: "inline-block" }
          }
        ),
        l && /* @__PURE__ */ r("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
let Ae = 0;
function bt() {
  return Ae += 1, `alloyBtn${Ae}`;
}
function Et(e = "", t = "") {
  const [a, i] = C(!1), [o, l] = C(!1), [u, s] = C(!1);
  return {
    className: S(() => [e, (a || o || u) && t].filter(Boolean).join(" "), [e, t, a, o, u]),
    events: {
      onMouseEnter: () => i(!0),
      onMouseLeave: () => {
        i(!1), l(!1);
      },
      onMouseDown: () => l(!0),
      onMouseUp: () => l(!1),
      onFocus: () => s(!0),
      onBlur: () => s(!1)
    }
  };
}
class F {
  constructor(t) {
    if (!t || !t.name) throw new Error("ButtonObject requires `name`.");
    this.id = t.id ?? bt(), this.name = t.name, this.className = t.className ?? "", this.active = t.active ?? "", this.disabled = !!t.disabled, this.title = t.title, this.ariaLabel = t.ariaLabel, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const Lt = fe(function({ button: t, output: a }, i) {
  if (!t || !(t instanceof F))
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  const o = O(null), l = O(t.id), u = t.disabled, { className: s, events: c } = Et(t.className, t.active);
  ye(
    i,
    () => ({
      el: o.current,
      model: t,
      focus: () => {
        var d;
        return (d = o.current) == null ? void 0 : d.focus();
      },
      click: () => {
        var d;
        return (d = o.current) == null ? void 0 : d.click();
      }
    }),
    [t]
  );
  const n = (d, m) => (p) => {
    m == null || m(p), a == null || a(t, p), d == null || d(p, t);
  }, h = {
    onClick: n(t.onClick),
    onKeyDown: n(t.onKeyDown, c.onFocus),
    onKeyUp: n(t.onKeyUp),
    onFocus: n(t.onFocus, c.onFocus),
    onBlur: n(t.onBlur, c.onBlur),
    onMouseEnter: n(t.onMouseEnter, c.onMouseEnter),
    onMouseLeave: n(t.onMouseLeave, c.onMouseLeave),
    onMouseDown: n(void 0, c.onMouseDown),
    onMouseUp: n(void 0, c.onMouseUp)
  };
  return /* @__PURE__ */ r(
    "button",
    {
      id: l.current,
      ref: o,
      type: "button",
      className: s,
      title: t.title,
      "aria-label": t.ariaLabel || t.name,
      "aria-disabled": u || void 0,
      disabled: u,
      tabIndex: t.tabIndex,
      ...h,
      children: /* @__PURE__ */ r("span", { className: "px-2 align-middle", children: t.name })
    }
  );
});
let Oe = 0;
function At() {
  return Oe += 1, `alloyBtnicon${Oe}`;
}
function Ot(e = "", t = "") {
  const [a, i] = C(!1), [o, l] = C(!1), [u, s] = C(!1);
  return {
    className: S(() => [e, (a || o || u) && t].filter(Boolean).join(" "), [e, t, a, o, u]),
    events: {
      onMouseEnter: () => i(!0),
      onMouseLeave: () => {
        i(!1), l(!1);
      },
      onMouseDown: () => l(!0),
      onMouseUp: () => l(!1),
      onFocus: () => s(!0),
      onBlur: () => s(!1)
    }
  };
}
class I {
  constructor(t) {
    if (!t || !t.icon) throw new Error("ButtonIconObject requires `icon` (IconObject).");
    this.id = t.id ?? At(), this.name = t.name, this.icon = t.icon instanceof w ? t.icon : new w(t.icon), this.className = t.className ?? "", this.active = t.active ?? "", this.disabled = !!t.disabled, this.title = t.title, this.ariaLabel = t.ariaLabel, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const kt = fe(function({ buttonIcon: t, output: a }, i) {
  if (!t || !(t instanceof I))
    throw new Error("AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance).");
  const o = O(null), l = O(t.id), u = t.disabled, { className: s, events: c } = Ot(t.className, t.active);
  ye(
    i,
    () => ({
      el: o.current,
      model: t,
      focus: () => {
        var m;
        return (m = o.current) == null ? void 0 : m.focus();
      },
      click: () => {
        var m;
        return (m = o.current) == null ? void 0 : m.click();
      }
    }),
    [t]
  );
  const n = (m, p) => (f) => {
    p == null || p(f), a == null || a(t, f), m == null || m(f, t);
  }, h = {
    onClick: n(t.onClick),
    onKeyDown: n(t.onKeyDown, c.onFocus),
    onKeyUp: n(t.onKeyUp),
    onFocus: n(t.onFocus, c.onFocus),
    onBlur: n(t.onBlur, c.onBlur),
    onMouseEnter: n(t.onMouseEnter, c.onMouseEnter),
    onMouseLeave: n(t.onMouseLeave, c.onMouseLeave),
    onMouseDown: n(void 0, c.onMouseDown),
    onMouseUp: n(void 0, c.onMouseUp)
  }, d = t.ariaLabel || t.name || "icon button";
  return /* @__PURE__ */ N(
    "button",
    {
      id: l.current,
      ref: o,
      type: "button",
      className: s,
      title: t.title,
      "aria-label": d,
      "aria-disabled": u || void 0,
      disabled: u,
      tabIndex: t.tabIndex,
      ...h,
      children: [
        /* @__PURE__ */ r("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ r(k, { icon: t.icon }) }),
        t.name ? /* @__PURE__ */ r("span", { className: "px-2 align-middle", children: t.name }) : null
      ]
    }
  );
});
let ke = 0;
function St() {
  return ke += 1, `alloyBtnsubmit${ke}`;
}
class X {
  constructor(t) {
    if (!t || !t.name) throw new Error("ButtonSubmitObject requires `name`.");
    if (!t.icon) throw new Error("ButtonSubmitObject requires `icon`.");
    this.id = t.id ?? St(), this.name = t.name, this.icon = t.icon instanceof w ? t.icon : new w(t.icon), this.className = t.className ?? "", this.disabled = !!t.disabled, this.loading = !!t.loading, this.title = t.title, this.ariaLabel = t.ariaLabel, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onMouseDown = t.onMouseDown, this.onKeyDown = t.onKeyDown;
  }
}
const Mt = fe(function({ buttonSubmit: t, output: a }, i) {
  if (!t || !(t instanceof X))
    throw new Error("AlloyButtonSubmit requires `buttonSubmit` (ButtonSubmitObject instance).");
  const o = O(null), l = O(t.id), [u, s] = C(!!t.loading);
  Z(() => {
    s(!!t.loading);
  }, [t.loading]);
  const c = t.disabled || u;
  ye(
    i,
    () => ({
      el: o.current,
      model: t,
      focus: () => {
        var v;
        return (v = o.current) == null ? void 0 : v.focus();
      },
      click: () => {
        var v;
        return (v = o.current) == null ? void 0 : v.click();
      }
    }),
    [t]
  );
  const n = O(!1);
  Z(() => {
    u || (n.current = !1);
  }, [u]);
  const h = () => n.current || c ? !1 : (n.current = !0, t.loading = !0, t.disabled = !0, s(!0), !0), d = (v, b) => {
    a == null || a(t, v), b == null || b(v, t);
  }, m = (v) => {
    h() && d(v, t.onClick);
  }, p = (v) => {
    h() && d(v, t.onMouseDown);
  }, f = (v) => {
    const b = v.key;
    (b === "Enter" || b === " ") && h() && d(v, t.onKeyDown);
  }, y = u;
  return /* @__PURE__ */ N(
    "button",
    {
      id: l.current,
      ref: o,
      type: "submit",
      className: t.className,
      title: t.title,
      "aria-label": t.ariaLabel || t.name,
      "aria-busy": u || void 0,
      "aria-disabled": c || void 0,
      disabled: c,
      tabIndex: t.tabIndex,
      onClick: m,
      onMouseDown: p,
      onKeyDown: f,
      children: [
        y && /* @__PURE__ */ r("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ r(k, { icon: t.icon }) }),
        /* @__PURE__ */ r("span", { className: y ? "px-2 align-middle" : "align-middle", children: t.name }),
        u ? /* @__PURE__ */ r("span", { className: "ms-2 visually-hidden", "aria-live": "polite", children: "Loading…" }) : null
      ]
    }
  );
});
let Se = 0;
function jt() {
  return Se += 1, `alloyinput${Se}`;
}
class Me {
  constructor(t) {
    const {
      id: a,
      name: i,
      type: o = "text",
      label: l = "",
      value: u = o === "checkbox" ? [] : "",
      layout: s = "text",
      icon: c,
      placeholder: n = "",
      required: h = !1,
      minLength: d,
      maxLength: m,
      min: p,
      max: f,
      pattern: y,
      matchWith: v,
      passwordStrength: b,
      options: x = [],
      validators: A = [],
      ...L
    } = t || {};
    if (!i) throw new Error("InputObject requires a 'name' field");
    if (["icon", "floating"].includes(s) && !c)
      throw new Error("Icon is required for icon and floating layouts");
    this.id = a ?? jt(), this.name = i, this.type = o, this.label = l, this.value = u, this.layout = s, this.icon = c instanceof w ? c : c ? new w(c) : void 0, this.placeholder = n, this.required = h, this.minLength = d, this.maxLength = m, this.min = p, this.max = f, this.pattern = y, this.matchWith = v, this.passwordStrength = b, this.options = x, this.validators = A, Object.assign(this, L);
  }
}
function _t({ input: e, output: t }) {
  const [a, i] = C(e.value), [o, l] = C(!1), u = (f) => {
    const y = [], v = typeof f == "string" ? f.trim() : f;
    return e.required && (Array.isArray(v) && v.length === 0 || !Array.isArray(v) && (v === "" || v === !1)) && y.push("This field is required."), e.minLength && typeof v == "string" && v.length < e.minLength && y.push(`Minimum length is ${e.minLength}`), e.maxLength && typeof v == "string" && v.length > e.maxLength && y.push(`Maximum length is ${e.maxLength}`), e.pattern && typeof v == "string" && !new RegExp(e.pattern).test(v) && y.push("Invalid format."), e.passwordStrength && typeof v == "string" && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(v) && y.push("Password is too weak."), y;
  }, s = (f) => {
    const y = u(f);
    t == null || t({
      id: e.id,
      name: e.name,
      value: f,
      valid: y.length === 0,
      error: y.length > 0,
      errors: y
    });
  }, c = () => l(!0), n = o && u(a).length > 0, h = n && u(a).length > 0 && /* @__PURE__ */ r("div", { className: "mt-2", "aria-live": "polite", children: u(a).map((f, y) => /* @__PURE__ */ r(
    "div",
    {
      className: "alert alert-danger py-2 mb-2",
      role: "alert",
      children: f
    },
    y
  )) }), d = {
    id: e.id,
    name: e.name,
    placeholder: e.placeholder,
    onBlur: c,
    "aria-invalid": n || void 0
  }, m = (f) => {
    const y = f.target.value;
    if (e.type === "checkbox") {
      const v = Array.isArray(a) ? [...a] : [], b = v.indexOf(y);
      b > -1 ? v.splice(b, 1) : v.push(y), i(v), s(v);
    } else e.type, i(y), s(y);
  }, p = () => e.type === "textarea" ? /* @__PURE__ */ r(
    "textarea",
    {
      ...d,
      value: a,
      onChange: m,
      className: `form-control${n ? " is-invalid" : ""}`
    }
  ) : e.type === "select" ? /* @__PURE__ */ r(
    "select",
    {
      ...d,
      value: a,
      onChange: m,
      className: `form-select${n ? " is-invalid" : ""}`,
      children: e.options.map((f) => /* @__PURE__ */ r("option", { value: f.value, children: f.label }, f.value))
    }
  ) : e.type === "radio" ? /* @__PURE__ */ N("div", { children: [
    /* @__PURE__ */ r("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((f, y) => /* @__PURE__ */ N("div", { className: "form-check", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "radio",
          id: `${e.id}_${y}`,
          className: `form-check-input${n ? " is-invalid" : ""}`,
          name: e.name,
          value: f.value,
          checked: a === f.value,
          onChange: m
        }
      ),
      /* @__PURE__ */ r(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${y}`,
          children: f.label
        }
      )
    ] }, y))
  ] }) : e.type === "checkbox" ? /* @__PURE__ */ N("div", { children: [
    /* @__PURE__ */ r("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((f, y) => /* @__PURE__ */ N("div", { className: "form-check", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "checkbox",
          id: `${e.id}_${y}`,
          className: `form-check-input${n ? " is-invalid" : ""}`,
          name: e.name,
          value: f.value,
          checked: Array.isArray(a) && a.includes(f.value),
          onChange: m
        }
      ),
      /* @__PURE__ */ r(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${y}`,
          children: f.label
        }
      )
    ] }, y))
  ] }) : /* @__PURE__ */ r(
    "input",
    {
      ...d,
      type: e.type,
      value: a,
      onChange: m,
      className: `form-control${n ? " is-invalid" : ""}`
    }
  );
  return e.layout === "floating" ? /* @__PURE__ */ N("div", { className: "mb-3", children: [
    /* @__PURE__ */ N("div", { className: "form-floating", children: [
      p(),
      /* @__PURE__ */ N("label", { htmlFor: e.id, children: [
        e.icon && /* @__PURE__ */ r(k, { icon: e.icon }),
        " ",
        e.label
      ] })
    ] }),
    h
  ] }) : e.layout === "icon" ? /* @__PURE__ */ N("div", { className: "mb-3", children: [
    /* @__PURE__ */ r("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    /* @__PURE__ */ N("div", { className: "input-group", children: [
      /* @__PURE__ */ r("span", { className: "input-group-text", children: /* @__PURE__ */ r(k, { icon: e.icon }) }),
      p()
    ] }),
    h
  ] }) : /* @__PURE__ */ N("div", { className: "mb-3", children: [
    ["text", "textarea", "number", "email", "password", "date"].includes(
      e.type
    ) && /* @__PURE__ */ r("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    p(),
    h
  ] });
}
let je = 0;
function Rt() {
  return je += 1, `barItem${je}`;
}
let _e = 0;
function $t() {
  return _e += 1, `linkBar${_e}`;
}
let Re = class {
  /**
   * @param {{ id?: string, name?: string, className?: string, show?: boolean }} p
   */
  constructor({ id: t, name: a, className: i, show: o } = {}) {
    this.id = t ?? Rt(), this.name = a ?? "Bar Item", this.className = i ?? "", this.show = typeof o == "boolean" ? o : !1;
  }
};
class j {
  constructor({ id: t, className: a, barName: i, type: o, linkClass: l, links: u, selected: s } = {}) {
    this.id = t ?? $t(), this.className = a ?? "d-flex justify-content-center", this.barName = i instanceof Re ? i : new Re(i ?? {}), this.type = o ?? "AlloyLink", this.linkClass = l ?? "nav-item", this.selected = s ?? "active";
    const c = Array.isArray(u) ? u : [];
    switch (this.type) {
      case "AlloyLinkIcon":
        this.links = c.map(
          (n) => n instanceof B ? n : new B({
            id: n == null ? void 0 : n.id,
            href: n == null ? void 0 : n.href,
            icon: (n == null ? void 0 : n.icon) instanceof w ? n == null ? void 0 : n.icon : new w(n == null ? void 0 : n.icon),
            name: n == null ? void 0 : n.name,
            className: n == null ? void 0 : n.className,
            active: n == null ? void 0 : n.active,
            target: n == null ? void 0 : n.target,
            rel: n == null ? void 0 : n.rel,
            onClick: n == null ? void 0 : n.onClick,
            title: n == null ? void 0 : n.title
          })
        );
        break;
      case "AlloyLinkLogo":
        this.links = c.map(
          (n) => n instanceof M ? n : new M({
            id: n == null ? void 0 : n.id,
            name: n == null ? void 0 : n.name,
            href: n == null ? void 0 : n.href,
            logo: n == null ? void 0 : n.logo,
            width: n == null ? void 0 : n.width,
            height: n == null ? void 0 : n.height,
            logoAlt: n == null ? void 0 : n.logoAlt,
            className: n == null ? void 0 : n.className,
            active: n == null ? void 0 : n.active,
            target: n == null ? void 0 : n.target,
            rel: n == null ? void 0 : n.rel,
            onClick: n == null ? void 0 : n.onClick,
            title: n == null ? void 0 : n.title
          })
        );
        break;
      case "AlloyLink":
      default:
        this.links = c.map(
          (n) => n instanceof $ ? n : new $({
            id: n == null ? void 0 : n.id,
            name: n == null ? void 0 : n.name,
            href: n == null ? void 0 : n.href,
            className: n == null ? void 0 : n.className,
            active: n == null ? void 0 : n.active,
            target: n == null ? void 0 : n.target,
            rel: n == null ? void 0 : n.rel,
            onClick: n == null ? void 0 : n.onClick,
            title: n == null ? void 0 : n.title
          })
        );
        break;
    }
  }
}
function ce(e, t, a, i) {
  const o = a ? t : "";
  return e instanceof $ ? new $({
    id: e.id,
    name: e.name,
    href: e.href,
    className: e.className,
    active: o,
    target: e.target,
    rel: e.rel,
    onClick: i,
    title: e.title
  }) : e instanceof B ? new B({
    id: e.id,
    href: e.href,
    icon: e.icon,
    name: e.name,
    className: e.className,
    active: o,
    target: e.target,
    rel: e.rel,
    onClick: i,
    title: e.title
  }) : e instanceof M ? new M({
    id: e.id,
    name: e.name,
    href: e.href,
    logo: e.logo,
    width: e.width,
    height: e.height,
    logoAlt: e.logoAlt,
    className: e.className,
    active: o,
    target: e.target,
    rel: e.rel,
    onClick: i,
    title: e.title
  }) : e;
}
function ee({ linkBar: e }) {
  if (!e || !(e instanceof j))
    throw new Error("AlloyLinkBar requires `linkBar` (LinkBarObject instance).");
  const t = O(e.id), [a, i] = C("");
  Z(() => {
    i("");
  }, [e]);
  const o = () => {
    var n;
    return (n = e.barName) != null && n.show ? /* @__PURE__ */ r("div", { id: e.barName.id, className: e.barName.className, children: e.barName.name }) : null;
  };
  function l(n) {
    const h = n.onClick;
    return (d) => {
      const m = n.id || `${n.href || ""}-${n.name || ""}`;
      i(m), h == null || h(d);
    };
  }
  const u = () => /* @__PURE__ */ N(K, { children: [
    /* @__PURE__ */ r(o, {}),
    /* @__PURE__ */ r("ul", { id: t.current, className: e.className, children: e.links.map((n, h) => {
      if (!(n instanceof $))
        throw new Error(
          "AlloyLinkBar (type='AlloyLink') requires each `links` item to be a LinkObject instance."
        );
      const d = ((n == null ? void 0 : n.id) ?? "") === a, m = ce(
        n,
        e.selected,
        d,
        l(n)
      );
      return /* @__PURE__ */ r("li", { className: e.linkClass, children: /* @__PURE__ */ r(pt, { link: m }) }, ((n == null ? void 0 : n.id) ?? h) + "-li");
    }) })
  ] }), s = () => /* @__PURE__ */ N(K, { children: [
    /* @__PURE__ */ r(o, {}),
    /* @__PURE__ */ r("ul", { id: t.current, className: e.className, children: e.links.map((n, h) => {
      if (!(n instanceof B))
        throw new Error(
          "AlloyLinkBar (type='AlloyLinkIcon') requires each `links` item to be a LinkIconObject instance."
        );
      const d = ((n == null ? void 0 : n.id) ?? "") === a, m = ce(
        n,
        e.selected,
        d,
        l(n)
      );
      return /* @__PURE__ */ r("li", { className: e.linkClass, children: /* @__PURE__ */ r(wt, { linkIcon: m }) }, ((n == null ? void 0 : n.id) ?? h) + "-li");
    }) })
  ] }), c = () => /* @__PURE__ */ N(K, { children: [
    /* @__PURE__ */ r(o, {}),
    /* @__PURE__ */ r("ul", { id: t.current, className: e.className, children: e.links.map((n, h) => {
      if (!(n instanceof M))
        throw new Error(
          "AlloyLinkBar (type='AlloyLinkLogo') requires each `links` item to be a LinkLogoObject instance."
        );
      const d = ((n == null ? void 0 : n.id) ?? "") === a, m = ce(
        n,
        e.selected,
        d,
        l(n)
      );
      return /* @__PURE__ */ r("li", { className: e.linkClass, children: /* @__PURE__ */ r(Ye, { linkLogo: m }) }, ((n == null ? void 0 : n.id) ?? h) + "-li");
    }) })
  ] });
  switch (e.type) {
    case "AlloyLink":
      return /* @__PURE__ */ r("nav", { "data-type": "AlloyLink", children: u() });
    case "AlloyLinkIcon":
      return /* @__PURE__ */ r("nav", { "data-type": "AlloyLinkIcon", children: s() });
    case "AlloyLinkLogo":
      return /* @__PURE__ */ r("nav", { "data-type": "AlloyLinkLogo", children: c() });
    default:
      return /* @__PURE__ */ r("nav", { "data-type": "AlloyLink", children: u() });
  }
}
let Bt = 0;
function Dt() {
  return `barItem${++Bt}`;
}
let Ft = 0;
function It() {
  return `buttonBar${++Ft}`;
}
class $e {
  constructor({ id: t, name: a, className: i, show: o } = {}) {
    this.id = t ?? Dt(), this.name = a ?? "Bar", this.className = i ?? "", this.show = typeof o == "boolean" ? o : !1;
  }
}
class _ {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *   barName?: BarItem|object,
   *   type?: "AlloyButton"|"AlloyButtonIcon",
   *   buttonClass?: string,
   *   buttons?: any[],            // plain JSON or instances; hydrated here
   *   selected?: string           // class name for selected item, e.g. "active"
   * }} p
   */
  constructor({ id: t, className: a, barName: i, type: o, buttonClass: l, buttons: u, selected: s } = {}) {
    this.id = t ?? It(), this.className = a ?? "d-flex justify-content-center", this.barName = i instanceof $e ? i : new $e(i ?? {}), this.type = o ?? "AlloyButton", this.buttonClass = l ?? "nav-item", this.selected = s ?? "active";
    const c = Array.isArray(u) ? u : [];
    this.type === "AlloyButtonIcon" ? this.buttons = c.map(
      (n) => n instanceof I ? n : new I({
        id: n == null ? void 0 : n.id,
        name: n == null ? void 0 : n.name,
        icon: (n == null ? void 0 : n.icon) instanceof w ? n == null ? void 0 : n.icon : new w(n == null ? void 0 : n.icon),
        className: n == null ? void 0 : n.className,
        active: n == null ? void 0 : n.active,
        disabled: n == null ? void 0 : n.disabled,
        title: n == null ? void 0 : n.title,
        ariaLabel: n == null ? void 0 : n.ariaLabel,
        tabIndex: n == null ? void 0 : n.tabIndex,
        onClick: n == null ? void 0 : n.onClick,
        onKeyDown: n == null ? void 0 : n.onKeyDown,
        onKeyUp: n == null ? void 0 : n.onKeyUp,
        onFocus: n == null ? void 0 : n.onFocus,
        onBlur: n == null ? void 0 : n.onBlur,
        onMouseEnter: n == null ? void 0 : n.onMouseEnter,
        onMouseLeave: n == null ? void 0 : n.onMouseLeave
      })
    ) : this.buttons = c.map(
      (n) => n instanceof F ? n : new F({
        id: n == null ? void 0 : n.id,
        name: n == null ? void 0 : n.name,
        className: n == null ? void 0 : n.className,
        active: n == null ? void 0 : n.active,
        disabled: n == null ? void 0 : n.disabled,
        title: n == null ? void 0 : n.title,
        ariaLabel: n == null ? void 0 : n.ariaLabel,
        tabIndex: n == null ? void 0 : n.tabIndex,
        onClick: n == null ? void 0 : n.onClick,
        onKeyDown: n == null ? void 0 : n.onKeyDown,
        onKeyUp: n == null ? void 0 : n.onKeyUp,
        onFocus: n == null ? void 0 : n.onFocus,
        onBlur: n == null ? void 0 : n.onBlur,
        onMouseEnter: n == null ? void 0 : n.onMouseEnter,
        onMouseLeave: n == null ? void 0 : n.onMouseLeave
      })
    );
  }
}
function Be(e, t, a) {
  const i = a ? t : "";
  return e instanceof F ? new F({
    id: e.id,
    name: e.name,
    className: e.className,
    active: i,
    disabled: e.disabled,
    title: e.title,
    ariaLabel: e.ariaLabel,
    tabIndex: e.tabIndex,
    onClick: e.onClick,
    onKeyDown: e.onKeyDown,
    onKeyUp: e.onKeyUp,
    onFocus: e.onFocus,
    onBlur: e.onBlur,
    onMouseEnter: e.onMouseEnter,
    onMouseLeave: e.onMouseLeave
  }) : e instanceof I ? new I({
    id: e.id,
    name: e.name,
    icon: e.icon,
    // keep IconObject instance
    className: e.className,
    active: i,
    disabled: e.disabled,
    title: e.title,
    ariaLabel: e.ariaLabel,
    tabIndex: e.tabIndex,
    onClick: e.onClick,
    onKeyDown: e.onKeyDown,
    onKeyUp: e.onKeyUp,
    onFocus: e.onFocus,
    onBlur: e.onBlur,
    onMouseEnter: e.onMouseEnter,
    onMouseLeave: e.onMouseLeave
  }) : e;
}
function te({ buttonBar: e, output: t }) {
  if (!e || !(e instanceof _))
    throw new Error("AlloyButtonBar requires `buttonBar` (ButtonBarObject instance).");
  const a = O(e.id), [i, o] = C("");
  Z(() => {
    o("");
  }, [e]);
  const l = () => {
    var n;
    return (n = e.barName) != null && n.show ? /* @__PURE__ */ r("div", { id: e.barName.id, className: e.barName.className, children: e.barName.name }) : null;
  }, u = (n, h) => {
    if ((h == null ? void 0 : h.type) === "click") {
      const d = (n == null ? void 0 : n.id) ?? "";
      o(d);
    }
    t == null || t(n, h);
  }, s = () => /* @__PURE__ */ N(K, { children: [
    /* @__PURE__ */ r(l, {}),
    /* @__PURE__ */ r("ul", { id: a.current, className: e.className, children: e.buttons.map((n, h) => {
      if (!(n instanceof F))
        throw new Error("AlloyButtonBar (type='AlloyButton') requires ButtonObject items.");
      const d = ((n == null ? void 0 : n.id) ?? "") === i, m = Be(n, e.selected, d);
      return /* @__PURE__ */ r("li", { className: e.buttonClass, children: /* @__PURE__ */ r(Lt, { button: m, output: u }) }, ((n == null ? void 0 : n.id) ?? h) + "-li");
    }) })
  ] }), c = () => /* @__PURE__ */ N(K, { children: [
    /* @__PURE__ */ r(l, {}),
    /* @__PURE__ */ r("ul", { id: a.current, className: e.className, children: e.buttons.map((n, h) => {
      if (!(n instanceof I))
        throw new Error("AlloyButtonBar (type='AlloyButtonIcon') requires ButtonIconObject items.");
      const d = ((n == null ? void 0 : n.id) ?? "") === i, m = Be(n, e.selected, d);
      return /* @__PURE__ */ r("li", { className: e.buttonClass, children: /* @__PURE__ */ r(kt, { buttonIcon: m, output: u }) }, ((n == null ? void 0 : n.id) ?? h) + "-li");
    }) })
  ] });
  switch (e.type) {
    case "AlloyButton":
      return /* @__PURE__ */ r("nav", { "data-type": "AlloyButton", children: s() });
    case "AlloyButtonIcon":
      return /* @__PURE__ */ r("nav", { "data-type": "AlloyButtonIcon", children: c() });
    default:
      return /* @__PURE__ */ r("nav", { "data-type": "AlloyButton", children: s() });
  }
}
let De = 0;
function Ut() {
  return De += 1, `navbar${De}`;
}
function Tt(e, t) {
  if (!Array.isArray(t)) return [];
  switch (e) {
    case "AlloyLinkIcon":
      return t.map(
        (a) => a instanceof B ? a : new B({
          id: a == null ? void 0 : a.id,
          name: a == null ? void 0 : a.name,
          href: a == null ? void 0 : a.href,
          icon: (a == null ? void 0 : a.icon) instanceof w ? a.icon : new w((a == null ? void 0 : a.icon) || {}),
          className: a == null ? void 0 : a.className,
          // no per-item active; bar will inject selected class
          target: a == null ? void 0 : a.target,
          rel: a == null ? void 0 : a.rel,
          onClick: a == null ? void 0 : a.onClick,
          title: a == null ? void 0 : a.title
        })
      );
    case "AlloyLinkLogo":
      return t.map(
        (a) => a instanceof M ? a : new M({
          id: a == null ? void 0 : a.id,
          name: a == null ? void 0 : a.name,
          href: a == null ? void 0 : a.href,
          logo: a == null ? void 0 : a.logo,
          width: a == null ? void 0 : a.width,
          height: a == null ? void 0 : a.height,
          logoAlt: a == null ? void 0 : a.logoAlt,
          className: a == null ? void 0 : a.className,
          target: a == null ? void 0 : a.target,
          rel: a == null ? void 0 : a.rel,
          onClick: a == null ? void 0 : a.onClick,
          title: a == null ? void 0 : a.title
        })
      );
    case "AlloyLink":
    default:
      return t.map(
        (a) => a instanceof $ ? a : new $({
          id: a == null ? void 0 : a.id,
          name: a == null ? void 0 : a.name,
          href: a == null ? void 0 : a.href,
          className: a == null ? void 0 : a.className,
          // no per-item active; bar will inject selected class
          target: a == null ? void 0 : a.target,
          rel: a == null ? void 0 : a.rel,
          onClick: a == null ? void 0 : a.onClick,
          title: a == null ? void 0 : a.title
        })
      );
  }
}
class Pt {
  constructor({ id: t, className: a, logo: i, linkBar: o } = {}) {
    if (this.id = t ?? Ut(), this.className = a ?? "navbar navbar-expand-lg navbar-light bg-light", this.logo = i instanceof M ? i : new M(
      i || {
        href: "/",
        logo: "/logos/alloy.svg",
        name: "Alloy",
        width: 110,
        height: 28,
        logoAlt: "Alloy",
        className: "navbar-brand d-flex align-items-center gap-2"
      }
    ), o instanceof j)
      this.linkBar = o;
    else {
      const l = (o == null ? void 0 : o.type) ?? "AlloyLink", u = Tt(l, (o == null ? void 0 : o.links) || []);
      this.linkBar = new j({
        id: o == null ? void 0 : o.id,
        className: (o == null ? void 0 : o.className) ?? "navbar-nav ms-auto mb-2 mb-lg-0 gap-2",
        barName: (o == null ? void 0 : o.barName) ?? { show: !1 },
        type: l,
        linkClass: (o == null ? void 0 : o.linkClass) ?? "nav-item",
        links: u,
        selected: (o == null ? void 0 : o.selected) ?? "active"
        // navbar demos want 'active'
      });
    }
  }
}
function Xn({ navBar: e }) {
  if (!e || !(e instanceof Pt))
    throw new Error("AlloyNavBar requires `navBar` (NavBarObject instance).");
  const t = O(e.id), a = `${t.current}-collapse`;
  return /* @__PURE__ */ r("nav", { id: t.current, className: e.className, children: /* @__PURE__ */ N("div", { className: "container-fluid", children: [
    /* @__PURE__ */ r(Ye, { linkLogo: e.logo }),
    /* @__PURE__ */ r(
      "button",
      {
        className: "navbar-toggler",
        type: "button",
        "data-bs-toggle": "collapse",
        "data-bs-target": `#${a}`,
        "aria-controls": a,
        "aria-expanded": "false",
        "aria-label": "Toggle navigation",
        children: /* @__PURE__ */ r("span", { className: "navbar-toggler-icon" })
      }
    ),
    /* @__PURE__ */ r("div", { className: "position-relative navbar-collapse collapse justify-content-end", id: a, children: /* @__PURE__ */ r(ee, { linkBar: e.linkBar }) })
  ] }) });
}
function Kt(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
let Fe = 0;
function qt() {
  return Fe += 1, `table${Fe}`;
}
class Vt {
  constructor(t = {}) {
    this.id = t.id ?? qt(), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [];
    const a = new w({ iconClass: "fa-solid fa-user" }), i = new w({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = t.icon instanceof w ? t.icon : new w(t.icon || a), this.sort = t.sort instanceof w ? t.sort : new w(t.sort || i);
  }
}
function Wt(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function Qn({ table: e, output: t }) {
  if (!e || !(e instanceof Vt))
    throw new Error("AlloyTable requires `table` (TableObject instance).");
  const a = O(e.id), [i, o] = C({ col: "", dir: "asc" }), l = S(() => Wt(e.rows), [e.rows]), u = (c) => {
    if (!c) return;
    const n = i.col === c && i.dir === "asc" ? "desc" : "asc";
    o({ col: c, dir: n }), t == null || t({ type: "column", name: c, dir: n });
  }, s = (c) => {
    t == null || t({ type: "row", id: c });
  };
  return /* @__PURE__ */ N("table", { id: a.current, className: e.className, children: [
    /* @__PURE__ */ r("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ N("tr", { children: [
      /* @__PURE__ */ r("th", { scope: "col", children: "Type" }),
      l.map((c) => {
        const n = i.col === c, h = n && i.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ N(
          "span",
          {
            onClick: () => u(c),
            style: { userSelect: "none" },
            children: [
              Kt(c),
              n && /* @__PURE__ */ r(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: h ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: h ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ r(k, { icon: e.sort })
                }
              )
            ]
          }
        ) }, c);
      })
    ] }) }),
    /* @__PURE__ */ r("tbody", { children: (e.rows ?? []).length > 0 ? (e.rows ?? []).map((c, n) => /* @__PURE__ */ N("tr", { onClick: () => s(c == null ? void 0 : c.id), children: [
      /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(k, { icon: e.icon }) }),
      l.map((h) => /* @__PURE__ */ r("td", { className: "cursor", children: /* @__PURE__ */ r("span", { children: c == null ? void 0 : c[h] }) }, `${(c == null ? void 0 : c.id) ?? n}-${h}`))
    ] }, (c == null ? void 0 : c.id) ?? n)) : /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r("td", { colSpan: Math.max(1, l.length) + 1, className: "text-center text-secondary", children: "No rows" }) }) })
  ] });
}
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function ue() {
  return ue = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t];
      for (var i in a)
        Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
  }, ue.apply(this, arguments);
}
var Ie;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(Ie || (Ie = {}));
function E(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function q(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function he(e) {
  let {
    pathname: t = "/",
    search: a = "",
    hash: i = ""
  } = e;
  return a && a !== "?" && (t += a.charAt(0) === "?" ? a : "?" + a), i && i !== "#" && (t += i.charAt(0) === "#" ? i : "#" + i), t;
}
function Ze(e) {
  let t = {};
  if (e) {
    let a = e.indexOf("#");
    a >= 0 && (t.hash = e.substr(a), e = e.substr(0, a));
    let i = e.indexOf("?");
    i >= 0 && (t.search = e.substr(i), e = e.substr(0, i)), e && (t.pathname = e);
  }
  return t;
}
var Ue;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(Ue || (Ue = {}));
function Te(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [a, i] = zt(e.path, e.caseSensitive, e.end), o = t.match(a);
  if (!o) return null;
  let l = o[0], u = l.replace(/(.)\/+$/, "$1"), s = o.slice(1);
  return {
    params: i.reduce((n, h, d) => {
      let {
        paramName: m,
        isOptional: p
      } = h;
      if (m === "*") {
        let y = s[d] || "";
        u = l.slice(0, l.length - y.length).replace(/(.)\/+$/, "$1");
      }
      const f = s[d];
      return p && !f ? n[m] = void 0 : n[m] = (f || "").replace(/%2F/g, "/"), n;
    }, {}),
    pathname: l,
    pathnameBase: u,
    pattern: e
  };
}
function zt(e, t, a) {
  t === void 0 && (t = !1), a === void 0 && (a = !0), q(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let i = [], o = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (u, s, c) => (i.push({
    paramName: s,
    isOptional: c != null
  }), c ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (i.push({
    paramName: "*"
  }), o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : a ? o += "\\/*$" : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, t ? void 0 : "i"), i];
}
function U(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let a = t.endsWith("/") ? t.length - 1 : t.length, i = e.charAt(a);
  return i && i !== "/" ? null : e.slice(a) || "/";
}
function Jt(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: a,
    search: i = "",
    hash: o = ""
  } = typeof e == "string" ? Ze(e) : e;
  return {
    pathname: a ? a.startsWith("/") ? a : Ht(a, t) : t,
    search: Yt(i),
    hash: Zt(o)
  };
}
function Ht(e, t) {
  let a = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((o) => {
    o === ".." ? a.length > 1 && a.pop() : o !== "." && a.push(o);
  }), a.length > 1 ? a.join("/") : "/";
}
function le(e, t, a, i) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(i) + "].  Please separate it out to the ") + ("`to." + a + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Gt(e) {
  return e.filter((t, a) => a === 0 || t.route.path && t.route.path.length > 0);
}
function Xe(e, t) {
  let a = Gt(e);
  return t ? a.map((i, o) => o === a.length - 1 ? i.pathname : i.pathnameBase) : a.map((i) => i.pathnameBase);
}
function Qe(e, t, a, i) {
  i === void 0 && (i = !1);
  let o;
  typeof e == "string" ? o = Ze(e) : (o = ue({}, e), E(!o.pathname || !o.pathname.includes("?"), le("?", "pathname", "search", o)), E(!o.pathname || !o.pathname.includes("#"), le("#", "pathname", "hash", o)), E(!o.search || !o.search.includes("#"), le("#", "search", "hash", o)));
  let l = e === "" || o.pathname === "", u = l ? "/" : o.pathname, s;
  if (u == null)
    s = a;
  else {
    let d = t.length - 1;
    if (!i && u.startsWith("..")) {
      let m = u.split("/");
      for (; m[0] === ".."; )
        m.shift(), d -= 1;
      o.pathname = m.join("/");
    }
    s = d >= 0 ? t[d] : "/";
  }
  let c = Jt(o, s), n = u && u !== "/" && u.endsWith("/"), h = (l || u === ".") && a.endsWith("/");
  return !c.pathname.endsWith("/") && (n || h) && (c.pathname += "/"), c;
}
const ve = (e) => e.join("/").replace(/\/\/+/g, "/"), Yt = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Zt = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, et = ["post", "put", "patch", "delete"];
new Set(et);
const Xt = ["get", ...et];
new Set(Xt);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function me() {
  return me = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t];
      for (var i in a)
        Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
  }, me.apply(this, arguments);
}
const ne = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (ne.displayName = "DataRouter");
const tt = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (tt.displayName = "DataRouterState");
const Qt = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (Qt.displayName = "Await");
const R = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (R.displayName = "Navigation");
const pe = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (pe.displayName = "Location");
const P = /* @__PURE__ */ g.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (P.displayName = "Route");
const en = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (en.displayName = "RouteError");
function tn(e, t) {
  let {
    relative: a
  } = t === void 0 ? {} : t;
  ge() || (process.env.NODE_ENV !== "production" ? E(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : E(!1));
  let {
    basename: i,
    navigator: o
  } = g.useContext(R), {
    hash: l,
    pathname: u,
    search: s
  } = W(e, {
    relative: a
  }), c = u;
  return i !== "/" && (c = u === "/" ? i : ve([i, u])), o.createHref({
    pathname: c,
    search: s,
    hash: l
  });
}
function ge() {
  return g.useContext(pe) != null;
}
function V() {
  return ge() || (process.env.NODE_ENV !== "production" ? E(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : E(!1)), g.useContext(pe).location;
}
const nt = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function at(e) {
  g.useContext(R).static || g.useLayoutEffect(e);
}
function nn() {
  let {
    isDataRoute: e
  } = g.useContext(P);
  return e ? cn() : an();
}
function an() {
  ge() || (process.env.NODE_ENV !== "production" ? E(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : E(!1));
  let e = g.useContext(ne), {
    basename: t,
    future: a,
    navigator: i
  } = g.useContext(R), {
    matches: o
  } = g.useContext(P), {
    pathname: l
  } = V(), u = JSON.stringify(Xe(o, a.v7_relativeSplatPath)), s = g.useRef(!1);
  return at(() => {
    s.current = !0;
  }), g.useCallback(function(n, h) {
    if (h === void 0 && (h = {}), process.env.NODE_ENV !== "production" && q(s.current, nt), !s.current) return;
    if (typeof n == "number") {
      i.go(n);
      return;
    }
    let d = Qe(n, JSON.parse(u), l, h.relative === "path");
    e == null && t !== "/" && (d.pathname = d.pathname === "/" ? t : ve([t, d.pathname])), (h.replace ? i.replace : i.push)(d, h.state, h);
  }, [t, i, u, l, e]);
}
function W(e, t) {
  let {
    relative: a
  } = t === void 0 ? {} : t, {
    future: i
  } = g.useContext(R), {
    matches: o
  } = g.useContext(P), {
    pathname: l
  } = V(), u = JSON.stringify(Xe(o, i.v7_relativeSplatPath));
  return g.useMemo(() => Qe(e, JSON.parse(u), l, a === "path"), [e, u, l, a]);
}
var it = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(it || {}), Ne = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(Ne || {});
function ot(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function on(e) {
  let t = g.useContext(ne);
  return t || (process.env.NODE_ENV !== "production" ? E(!1, ot(e)) : E(!1)), t;
}
function sn(e) {
  let t = g.useContext(P);
  return t || (process.env.NODE_ENV !== "production" ? E(!1, ot(e)) : E(!1)), t;
}
function st(e) {
  let t = sn(e), a = t.matches[t.matches.length - 1];
  return a.route.id || (process.env.NODE_ENV !== "production" ? E(!1, e + ' can only be used on routes that contain a unique "id"') : E(!1)), a.route.id;
}
function rn() {
  return st(Ne.UseRouteId);
}
function cn() {
  let {
    router: e
  } = on(it.UseNavigateStable), t = st(Ne.UseNavigateStable), a = g.useRef(!1);
  return at(() => {
    a.current = !0;
  }), g.useCallback(function(o, l) {
    l === void 0 && (l = {}), process.env.NODE_ENV !== "production" && q(a.current, nt), a.current && (typeof o == "number" ? e.navigate(o) : e.navigate(o, me({
      fromRouteId: t
    }, l)));
  }, [e, t]);
}
new Promise(() => {
});
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function T() {
  return T = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t];
      for (var i in a)
        Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
  }, T.apply(this, arguments);
}
function we(e, t) {
  if (e == null) return {};
  var a = {}, i = Object.keys(e), o, l;
  for (l = 0; l < i.length; l++)
    o = i[l], !(t.indexOf(o) >= 0) && (a[o] = e[o]);
  return a;
}
const G = "get", Y = "application/x-www-form-urlencoded";
function ae(e) {
  return e != null && typeof e.tagName == "string";
}
function ln(e) {
  return ae(e) && e.tagName.toLowerCase() === "button";
}
function dn(e) {
  return ae(e) && e.tagName.toLowerCase() === "form";
}
function un(e) {
  return ae(e) && e.tagName.toLowerCase() === "input";
}
function hn(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function mn(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !hn(e);
}
let J = null;
function fn() {
  if (J === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), J = !1;
    } catch {
      J = !0;
    }
  return J;
}
const yn = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function de(e) {
  return e != null && !yn.has(e) ? (process.env.NODE_ENV !== "production" && q(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + Y + '"')), null) : e;
}
function vn(e, t) {
  let a, i, o, l, u;
  if (dn(e)) {
    let s = e.getAttribute("action");
    i = s ? U(s, t) : null, a = e.getAttribute("method") || G, o = de(e.getAttribute("enctype")) || Y, l = new FormData(e);
  } else if (ln(e) || un(e) && (e.type === "submit" || e.type === "image")) {
    let s = e.form;
    if (s == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let c = e.getAttribute("formaction") || s.getAttribute("action");
    if (i = c ? U(c, t) : null, a = e.getAttribute("formmethod") || s.getAttribute("method") || G, o = de(e.getAttribute("formenctype")) || de(s.getAttribute("enctype")) || Y, l = new FormData(s, e), !fn()) {
      let {
        name: n,
        type: h,
        value: d
      } = e;
      if (h === "image") {
        let m = n ? n + "." : "";
        l.append(m + "x", "0"), l.append(m + "y", "0");
      } else n && l.append(n, d);
    }
  } else {
    if (ae(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    a = G, i = null, o = Y, u = e;
  }
  return l && o === "text/plain" && (u = l, l = void 0), {
    action: i,
    method: a.toLowerCase(),
    encType: o,
    formData: l,
    body: u
  };
}
const pn = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], gn = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], Nn = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], wn = "6";
try {
  window.__reactRouterVersion = wn;
} catch {
}
const rt = /* @__PURE__ */ g.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (rt.displayName = "ViewTransition");
const Cn = /* @__PURE__ */ g.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (Cn.displayName = "Fetchers");
process.env.NODE_ENV;
const xn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", bn = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, D = /* @__PURE__ */ g.forwardRef(function(t, a) {
  let {
    onClick: i,
    relative: o,
    reloadDocument: l,
    replace: u,
    state: s,
    target: c,
    to: n,
    preventScrollReset: h,
    viewTransition: d
  } = t, m = we(t, pn), {
    basename: p
  } = g.useContext(R), f, y = !1;
  if (typeof n == "string" && bn.test(n) && (f = n, xn))
    try {
      let A = new URL(window.location.href), L = n.startsWith("//") ? new URL(A.protocol + n) : new URL(n), z = U(L.pathname, p);
      L.origin === A.origin && z != null ? n = z + L.search + L.hash : y = !0;
    } catch {
      process.env.NODE_ENV !== "production" && q(!1, '<Link to="' + n + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let v = tn(n, {
    relative: o
  }), b = On(n, {
    replace: u,
    state: s,
    target: c,
    preventScrollReset: h,
    relative: o,
    viewTransition: d
  });
  function x(A) {
    i && i(A), A.defaultPrevented || b(A);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ g.createElement("a", T({}, m, {
      href: f || v,
      onClick: y || l ? i : x,
      ref: a,
      target: c
    }))
  );
});
process.env.NODE_ENV !== "production" && (D.displayName = "Link");
const En = /* @__PURE__ */ g.forwardRef(function(t, a) {
  let {
    "aria-current": i = "page",
    caseSensitive: o = !1,
    className: l = "",
    end: u = !1,
    style: s,
    to: c,
    viewTransition: n,
    children: h
  } = t, d = we(t, gn), m = W(c, {
    relative: d.relative
  }), p = V(), f = g.useContext(tt), {
    navigator: y,
    basename: v
  } = g.useContext(R), b = f != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Rn(m) && n === !0, x = y.encodeLocation ? y.encodeLocation(m).pathname : m.pathname, A = p.pathname, L = f && f.navigation && f.navigation.location ? f.navigation.location.pathname : null;
  o || (A = A.toLowerCase(), L = L ? L.toLowerCase() : null, x = x.toLowerCase()), L && v && (L = U(L, v) || L);
  const z = x !== "/" && x.endsWith("/") ? x.length - 1 : x.length;
  let oe = A === x || !u && A.startsWith(x) && A.charAt(z) === "/", Ce = L != null && (L === x || !u && L.startsWith(x) && L.charAt(x.length) === "/"), se = {
    isActive: oe,
    isPending: Ce,
    isTransitioning: b
  }, ut = oe ? i : void 0, re;
  typeof l == "function" ? re = l(se) : re = [l, oe ? "active" : null, Ce ? "pending" : null, b ? "transitioning" : null].filter(Boolean).join(" ");
  let ht = typeof s == "function" ? s(se) : s;
  return /* @__PURE__ */ g.createElement(D, T({}, d, {
    "aria-current": ut,
    className: re,
    ref: a,
    style: ht,
    to: c,
    viewTransition: n
  }), typeof h == "function" ? h(se) : h);
});
process.env.NODE_ENV !== "production" && (En.displayName = "NavLink");
const Ln = /* @__PURE__ */ g.forwardRef((e, t) => {
  let {
    fetcherKey: a,
    navigate: i,
    reloadDocument: o,
    replace: l,
    state: u,
    method: s = G,
    action: c,
    onSubmit: n,
    relative: h,
    preventScrollReset: d,
    viewTransition: m
  } = e, p = we(e, Nn), f = jn(), y = _n(c, {
    relative: h
  }), v = s.toLowerCase() === "get" ? "get" : "post", b = (x) => {
    if (n && n(x), x.defaultPrevented) return;
    x.preventDefault();
    let A = x.nativeEvent.submitter, L = (A == null ? void 0 : A.getAttribute("formmethod")) || s;
    f(A || x.currentTarget, {
      fetcherKey: a,
      method: L,
      navigate: i,
      replace: l,
      state: u,
      relative: h,
      preventScrollReset: d,
      viewTransition: m
    });
  };
  return /* @__PURE__ */ g.createElement("form", T({
    ref: t,
    method: v,
    action: y,
    onSubmit: o ? n : b
  }, p));
});
process.env.NODE_ENV !== "production" && (Ln.displayName = "Form");
process.env.NODE_ENV;
var Q;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(Q || (Q = {}));
var Pe;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Pe || (Pe = {}));
function An(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function ct(e) {
  let t = g.useContext(ne);
  return t || (process.env.NODE_ENV !== "production" ? E(!1, An(e)) : E(!1)), t;
}
function On(e, t) {
  let {
    target: a,
    replace: i,
    state: o,
    preventScrollReset: l,
    relative: u,
    viewTransition: s
  } = t === void 0 ? {} : t, c = nn(), n = V(), h = W(e, {
    relative: u
  });
  return g.useCallback((d) => {
    if (mn(d, a)) {
      d.preventDefault();
      let m = i !== void 0 ? i : he(n) === he(h);
      c(e, {
        replace: m,
        state: o,
        preventScrollReset: l,
        relative: u,
        viewTransition: s
      });
    }
  }, [n, c, h, i, o, a, e, l, u, s]);
}
function kn() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let Sn = 0, Mn = () => "__" + String(++Sn) + "__";
function jn() {
  let {
    router: e
  } = ct(Q.UseSubmit), {
    basename: t
  } = g.useContext(R), a = rn();
  return g.useCallback(function(i, o) {
    o === void 0 && (o = {}), kn();
    let {
      action: l,
      method: u,
      encType: s,
      formData: c,
      body: n
    } = vn(i, t);
    if (o.navigate === !1) {
      let h = o.fetcherKey || Mn();
      e.fetch(h, a, o.action || l, {
        preventScrollReset: o.preventScrollReset,
        formData: c,
        body: n,
        formMethod: o.method || u,
        formEncType: o.encType || s,
        flushSync: o.flushSync
      });
    } else
      e.navigate(o.action || l, {
        preventScrollReset: o.preventScrollReset,
        formData: c,
        body: n,
        formMethod: o.method || u,
        formEncType: o.encType || s,
        replace: o.replace,
        state: o.state,
        fromRouteId: a,
        flushSync: o.flushSync,
        viewTransition: o.viewTransition
      });
  }, [e, t, a]);
}
function _n(e, t) {
  let {
    relative: a
  } = t === void 0 ? {} : t, {
    basename: i
  } = g.useContext(R), o = g.useContext(P);
  o || (process.env.NODE_ENV !== "production" ? E(!1, "useFormAction must be used inside a RouteContext") : E(!1));
  let [l] = o.matches.slice(-1), u = T({}, W(e || ".", {
    relative: a
  })), s = V();
  if (e == null) {
    u.search = s.search;
    let c = new URLSearchParams(u.search), n = c.getAll("index");
    if (n.some((d) => d === "")) {
      c.delete("index"), n.filter((m) => m).forEach((m) => c.append("index", m));
      let d = c.toString();
      u.search = d ? "?" + d : "";
    }
  }
  return (!e || e === ".") && l.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), i !== "/" && (u.pathname = u.pathname === "/" ? i : ve([i, u.pathname])), he(u);
}
function Rn(e, t) {
  t === void 0 && (t = {});
  let a = g.useContext(rt);
  a == null && (process.env.NODE_ENV !== "production" ? E(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : E(!1));
  let {
    basename: i
  } = ct(Q.useViewTransitionState), o = W(e, {
    relative: t.relative
  });
  if (!a.isTransitioning)
    return !1;
  let l = U(a.currentLocation.pathname, i) || a.currentLocation.pathname, u = U(a.nextLocation.pathname, i) || a.nextLocation.pathname;
  return Te(o.pathname, u) != null || Te(o.pathname, l) != null;
}
function $n(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
let Ke = 0;
function Bn() {
  return Ke += 1, `tablelink${Ke}`;
}
class Dn {
  constructor(t = {}) {
    if (!t.link) throw new Error("TableLinkObject requires `link` (base route).");
    this.id = t.id ?? Bn(), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = t.link;
    const a = new w({ iconClass: "fa-solid fa-user" }), i = new w({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = t.icon instanceof w ? t.icon : new w(t.icon || a), this.sort = t.sort instanceof w ? t.sort : new w(t.sort || i);
  }
}
function Fn(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function ea({ tableLink: e, output: t }) {
  if (!e || !(e instanceof Dn))
    throw new Error("AlloyTableLink requires `tableLink` (TableLinkObject instance).");
  const a = O(e.id), [i, o] = C({ col: "", dir: "asc" }), l = S(() => Fn(e.rows), [e.rows]), u = (s) => {
    if (!s) return;
    const c = i.col === s && i.dir === "asc" ? "desc" : "asc";
    o({ col: s, dir: c }), t == null || t({ type: "column", name: s, dir: c });
  };
  return /* @__PURE__ */ N("table", { id: a.current, className: e.className, children: [
    /* @__PURE__ */ r("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ N("tr", { children: [
      /* @__PURE__ */ r("th", { scope: "col", children: "Type" }),
      l.map((s) => {
        const c = i.col === s, n = c && i.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ N(
          "span",
          {
            onClick: () => u(s),
            style: { userSelect: "none" },
            children: [
              $n(s),
              c && /* @__PURE__ */ r(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: n ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: n ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ r(k, { icon: e.sort })
                }
              )
            ]
          }
        ) }, s);
      })
    ] }) }),
    /* @__PURE__ */ r("tbody", { children: (e.rows ?? []).length > 0 ? (e.rows ?? []).map((s, c) => {
      const n = (s == null ? void 0 : s.id) ?? c, d = `${e.link.endsWith("/") ? e.link.slice(0, -1) : e.link}/${n}`;
      return /* @__PURE__ */ N("tr", { children: [
        /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(k, { icon: e.icon }) }),
        l.map((m) => /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(
          D,
          {
            to: d,
            onClick: () => t == null ? void 0 : t({ type: "navigate", to: d, id: n }),
            className: "text-decoration-none",
            children: /* @__PURE__ */ r("span", { children: s == null ? void 0 : s[m] })
          }
        ) }, `${n}-${m}`))
      ] }, n);
    }) : /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r("td", { colSpan: Math.max(1, l.length) + 1, className: "text-center text-secondary", children: "No rows" }) }) })
  ] });
}
let qe = 0;
function In() {
  return qe += 1, `tableaction${qe}`;
}
function Un(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
function Tn(e) {
  if (!Array.isArray(e) || e.length === 0) return [];
  const t = e[0] ?? {};
  return Object.keys(t).filter((a) => a !== "id");
}
class Pn {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *   name?: string,
   *   rows?: Array<Record<string, any>>,
   *   icon?: IconObject|object,
   *   sort?: IconObject|object,
   *   actions: ButtonBarObject|object,  // REQUIRED
   *   link?: string                     // OPTIONAL, base route for row links; e.g. "/users"
   * }} p
   */
  constructor(t = {}) {
    if (!t.actions) throw new Error("TableActionObject requires `actions`.");
    this.id = t.id ?? In(), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = typeof t.link == "string" ? t.link : "";
    const a = new w({ iconClass: "fa-solid fa-user" }), i = new w({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = t.icon instanceof w ? t.icon : new w(t.icon || a), this.sort = t.sort instanceof w ? t.sort : new w(t.sort || i), this.actions = t.actions instanceof _ ? t.actions : new _(t.actions || {});
  }
}
function ta({ tableAction: e, output: t }) {
  if (!e || !(e instanceof Pn))
    throw new Error("AlloyTableAction requires `tableAction` (TableActionObject instance).");
  const a = O(e.id), i = S(() => Tn(e.rows), [e.rows]), [o, l] = C({ col: "", dir: "asc" });
  function u(c) {
    const n = o.col === c && o.dir === "asc" ? "desc" : "asc";
    l({ col: c, dir: n }), t == null || t({ type: "column", name: c, dir: n });
  }
  function s(c) {
    return (n, h) => {
      var d;
      t == null || t({
        type: "action",
        action: {
          id: n == null ? void 0 : n.id,
          name: n == null ? void 0 : n.name,
          className: n == null ? void 0 : n.className,
          active: n == null ? void 0 : n.active,
          disabled: !!(n != null && n.disabled),
          title: n == null ? void 0 : n.title,
          ariaLabel: n == null ? void 0 : n.ariaLabel,
          tabIndex: n == null ? void 0 : n.tabIndex,
          iconClass: (d = n == null ? void 0 : n.icon) == null ? void 0 : d.iconClass
        },
        row: c
      });
    };
  }
  return /* @__PURE__ */ N("table", { id: a.current, className: e.className, children: [
    /* @__PURE__ */ r("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ N("tr", { children: [
      /* @__PURE__ */ r("th", { scope: "col", children: "Type" }),
      i.map((c) => {
        const n = o.col === c, h = n && o.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ N(
          "span",
          {
            onClick: () => u(c),
            style: { userSelect: "none" },
            children: [
              Un(c),
              n && /* @__PURE__ */ r(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: h ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: h ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ r(k, { icon: e.sort })
                }
              )
            ]
          }
        ) }, `h-${c}`);
      }),
      /* @__PURE__ */ r("th", { scope: "col", className: "text-end", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ r("tbody", { children: e.rows.map((c, n) => {
      const h = (c == null ? void 0 : c.id) ?? n, d = e.actions;
      return /* @__PURE__ */ N("tr", { children: [
        /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(k, { icon: e.icon }) }),
        i.map((m) => {
          const p = e.link ? `${e.link}/${h}` : "";
          return /* @__PURE__ */ r("td", { children: e.link ? /* @__PURE__ */ r(
            D,
            {
              to: p,
              onClick: () => t == null ? void 0 : t({ type: "navigate", to: p, id: h, row: c }),
              className: "text-decoration-none",
              children: /* @__PURE__ */ r("span", { children: c == null ? void 0 : c[m] })
            }
          ) : /* @__PURE__ */ r("span", { children: c == null ? void 0 : c[m] }) }, `${h}-${m}`);
        }),
        /* @__PURE__ */ r("td", { className: "text-end", children: /* @__PURE__ */ r(te, { buttonBar: d, output: s(c) }) })
      ] }, h);
    }) })
  ] });
}
let Ve = 0, We = 0;
function Kn() {
  return Ve += 1, `card${Ve}`;
}
function qn() {
  return We += 1, `carditem${We}`;
}
class H {
  /**
   * @param {{ id?:string, name?:string, className?:string, show?:boolean }=} res
   */
  constructor(t = {}) {
    this.id = t.id ?? qn(), this.className = t.className ?? "", this.name = t.name ?? "Card Item", this.show = typeof t.show == "boolean" ? t.show : !0;
  }
}
class ie {
  /**
   * @param {{ id?:string, className?:string, body?:CardItem|object, fields?:Array<CardItem|object>, link?:string }=} res
   */
  constructor(t = {}) {
    this.id = t.id ?? Kn(), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "", this.body = t.body instanceof H ? t.body : new H(t.body || {});
    const a = Array.isArray(t.fields) ? t.fields : [];
    this.fields = a.map((i) => i instanceof H ? i : new H(i));
  }
}
function na({ card: e }) {
  if (!e || !(e instanceof ie))
    throw new Error("AlloyCard requires `card` (CardObject instance).");
  const t = /* @__PURE__ */ r(
    "div",
    {
      id: e.body.id,
      className: e.body.className,
      "aria-label": e.body.name,
      children: e.fields.map(
        (a) => a != null && a.show ? /* @__PURE__ */ r("div", { id: a.id, className: a.className, children: a.name }, a.id) : null
      )
    }
  );
  return e.link ? /* @__PURE__ */ r(D, { id: e.id, to: e.link, className: e.className + " text-decoration-none", children: t }) : /* @__PURE__ */ r("div", { id: e.id, className: e.className, children: t });
}
class lt extends ie {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *   link?: string,
   *   body?: CardItem|object,
   *   fields?: Array<CardItem|object>,
   *   icon?: IconObject|object,
   *   iconClass?: string,
   *   textClass?: string
   * }=} res
   */
  constructor(t = {}) {
    super(t), this.icon = t.icon instanceof w ? t.icon : new w(t.icon || {}), this.iconClass = t.iconClass ?? "col-4 icon-lg rounded-circle bg-warning text-white mb-0", this.textClass = t.textClass ?? "col-8";
  }
}
function aa({ cardIcon: e }) {
  if (!e || !(e instanceof lt))
    throw new Error("AlloyCardIcon requires `cardIcon` (CardIconObject instance).");
  const t = /* @__PURE__ */ r(
    "div",
    {
      id: e.body.id,
      className: e.body.className,
      "aria-label": e.body.name,
      children: /* @__PURE__ */ N("div", { className: "row m-0", children: [
        /* @__PURE__ */ r("div", { className: e.iconClass, children: /* @__PURE__ */ r(k, { icon: e.icon }) }),
        /* @__PURE__ */ r("div", { className: e.textClass, children: /* @__PURE__ */ r("div", { className: "row p-1", children: e.fields.map(
          (a) => a != null && a.show ? /* @__PURE__ */ r(
            "div",
            {
              id: a.id,
              className: a.className,
              children: a.name
            },
            a.id
          ) : null
        ) }) })
      ] })
    }
  );
  return e.link ? /* @__PURE__ */ r(
    D,
    {
      id: e.id,
      to: e.link,
      className: e.className + " text-decoration-none",
      children: t
    }
  ) : /* @__PURE__ */ r("div", { id: e.id, className: e.className, children: t });
}
class ze {
  /**
   * @param {{
   *   imageUrl?: string,
   *   alt?: string,
   *   width?: string,
   *   height?: string
   * }=} res
   */
  constructor(t = {}) {
    t && Object.keys(t).length > 0 ? (this.imageUrl = t.imageUrl ?? "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png", this.alt = t.alt ?? "Alloymobile", this.width = t.width ?? "auto", this.height = t.height ?? "auto") : (this.imageUrl = "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png", this.alt = "Alloymobile", this.width = "72", this.height = "auto");
  }
}
class dt extends ie {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *   link?: string,
   *   body?: CardItem|object,
   *   fields?: Array<CardItem|object>,
   *   logo?: LogoObject|object,
   *   logoClass?: string,
   *   textClass?: string
   * }=} res
   */
  constructor(t = {}) {
    super(t), this.logo = t.logo instanceof ze ? t.logo : new ze(t.logo || {}), this.logoClass = t.logoClass ?? "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0", this.textClass = t.textClass ?? "col-8";
  }
}
function ia({ cardImage: e }) {
  if (!e || !(e instanceof dt))
    throw new Error("AlloyCardImage requires `cardImage` (CardImageObject instance).");
  const t = /* @__PURE__ */ r(
    "div",
    {
      id: e.body.id,
      className: e.body.className,
      "aria-label": e.body.name,
      children: /* @__PURE__ */ N("div", { className: "row m-0", children: [
        /* @__PURE__ */ r("div", { className: e.logoClass, children: /* @__PURE__ */ r(
          "img",
          {
            src: e.logo.imageUrl,
            alt: e.logo.alt,
            style: {
              width: e.logo.width,
              height: e.logo.height,
              maxWidth: "100%",
              // keep image from overflowing
              objectFit: "contain"
            }
          }
        ) }),
        /* @__PURE__ */ r("div", { className: e.textClass, children: /* @__PURE__ */ r("div", { className: "row p-1", children: e.fields.map(
          (a) => a != null && a.show ? /* @__PURE__ */ r(
            "div",
            {
              id: a.id,
              className: a.className,
              children: a.name
            },
            a.id
          ) : null
        ) }) })
      ] })
    }
  );
  return e.link ? /* @__PURE__ */ r(
    D,
    {
      id: e.id,
      to: e.link,
      className: e.className + " text-decoration-none",
      children: t
    }
  ) : /* @__PURE__ */ r("div", { id: e.id, className: e.className, children: t });
}
class Vn extends ie {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *   link?: string,            // (in CardAction template we don't wrap whole card in a Link, but we still inherit)
   *   body?: CardItem|object,
   *   fields?: Array<CardItem|object>,
   *   type?: string,            // "AlloyButtonBar" | "AlloyLinkBar"
   *   action?: object           // raw config for the bar
   * }=} res
   */
  constructor(t = {}) {
    switch (super(t), this.type = t.type ?? "AlloyButtonBar", this.type) {
      case "AlloyLinkBar": {
        this.action = t.action instanceof j ? t.action : new j(t.action || {});
        break;
      }
      case "AlloyButtonBar":
      default: {
        this.action = t.action instanceof _ ? t.action : new _(t.action || {});
        break;
      }
    }
  }
}
function oa({ cardAction: e, output: t }) {
  var l, u;
  if (!e || !(e instanceof Vn))
    throw new Error("AlloyCardAction requires `cardAction` (CardActionObject instance).");
  function a() {
    return (s, c) => {
      var n, h;
      t == null || t({
        type: "action",
        action: {
          id: s == null ? void 0 : s.id,
          name: s == null ? void 0 : s.name,
          className: s == null ? void 0 : s.className,
          active: s == null ? void 0 : s.active,
          disabled: !!(s != null && s.disabled),
          title: s == null ? void 0 : s.title,
          ariaLabel: s == null ? void 0 : s.ariaLabel,
          tabIndex: s == null ? void 0 : s.tabIndex,
          iconClass: (n = s == null ? void 0 : s.icon) == null ? void 0 : n.iconClass,
          href: s == null ? void 0 : s.href
        },
        card: {
          id: e.id,
          bodyId: (h = e.body) == null ? void 0 : h.id
        }
      });
    };
  }
  const i = /* @__PURE__ */ r(
    "div",
    {
      id: e.body.id,
      className: e.body.className,
      "aria-label": e.body.name,
      children: e.fields.map(
        (s) => s != null && s.show ? /* @__PURE__ */ r(
          "div",
          {
            id: s.id,
            className: s.className,
            children: s.name
          },
          s.id
        ) : null
      )
    }
  ), o = /* @__PURE__ */ r(
    "div",
    {
      id: (l = e.action) == null ? void 0 : l.id,
      className: (u = e.action) == null ? void 0 : u.className,
      role: "group",
      children: e.type === "AlloyLinkBar" ? /* @__PURE__ */ r(ee, { linkBar: e.action, output: a() }) : (
        // default: AlloyButtonBar
        /* @__PURE__ */ r(
          te,
          {
            buttonBar: e.action,
            output: a()
          }
        )
      )
    }
  );
  return /* @__PURE__ */ N("div", { id: e.id, className: e.className, children: [
    i,
    o
  ] });
}
class Wn extends lt {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *   link?: string,
   *   body?: CardItem|object,
   *   fields?: Array<CardItem|object>,
   *   icon?: IconObject|object,
   *   iconClass?: string,
   *   textClass?: string,
   *   type?: string,        // "AlloyButtonBar" | "AlloyLinkBar"
   *   action?: object       // config for the action bar
   * }=} res
   */
  constructor(t = {}) {
    switch (super(t), this.type = t.type ?? "AlloyButtonBar", this.type) {
      case "AlloyLinkBar": {
        this.action = t.action instanceof j ? t.action : new j(t.action || {});
        break;
      }
      case "AlloyButtonBar":
      default: {
        this.action = t.action instanceof _ ? t.action : new _(t.action || {});
        break;
      }
    }
  }
}
function sa({ cardIconAction: e, output: t }) {
  var l, u;
  if (!e || !(e instanceof Wn))
    throw new Error(
      "AlloyCardIconAction requires `cardIconAction` (CardIconActionObject instance)."
    );
  function a() {
    return (s, c) => {
      var n, h;
      t == null || t({
        type: "action",
        action: {
          id: s == null ? void 0 : s.id,
          name: s == null ? void 0 : s.name,
          title: s == null ? void 0 : s.title,
          href: s == null ? void 0 : s.href,
          className: s == null ? void 0 : s.className,
          iconClass: (n = s == null ? void 0 : s.icon) == null ? void 0 : n.iconClass,
          active: s == null ? void 0 : s.active,
          disabled: !!(s != null && s.disabled),
          ariaLabel: s == null ? void 0 : s.ariaLabel,
          tabIndex: s == null ? void 0 : s.tabIndex
        },
        card: {
          id: e.id,
          bodyId: (h = e.body) == null ? void 0 : h.id
        }
      });
    };
  }
  const i = /* @__PURE__ */ r(
    "div",
    {
      id: e.body.id,
      className: e.body.className,
      "aria-label": e.body.name,
      children: /* @__PURE__ */ N("div", { className: "row m-0", children: [
        /* @__PURE__ */ r("div", { className: e.iconClass, children: /* @__PURE__ */ r(k, { icon: e.icon }) }),
        /* @__PURE__ */ r("div", { className: e.textClass, children: /* @__PURE__ */ r("div", { className: "row p-1", children: e.fields.map(
          (s) => s != null && s.show ? /* @__PURE__ */ r(
            "div",
            {
              id: s.id,
              className: s.className,
              children: s.name
            },
            s.id
          ) : null
        ) }) })
      ] })
    }
  ), o = /* @__PURE__ */ r(
    "div",
    {
      id: (l = e.action) == null ? void 0 : l.id,
      className: (u = e.action) == null ? void 0 : u.className,
      role: "group",
      children: e.type === "AlloyLinkBar" ? /* @__PURE__ */ r(
        ee,
        {
          linkBar: e.action,
          output: a()
        }
      ) : (
        // default: AlloyButtonBar
        /* @__PURE__ */ r(
          te,
          {
            buttonBar: e.action,
            output: a()
          }
        )
      )
    }
  );
  return /* @__PURE__ */ N("div", { id: e.id, className: e.className, children: [
    i,
    o
  ] });
}
class zn extends dt {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *   link?: string,
   *   body?: CardItem|object,
   *   fields?: Array<CardItem|object>,
   *   logo?: object,
   *   logoClass?: string,
   *   textClass?: string,
   *   type?: string,        // "AlloyButtonBar" | "AlloyLinkBar"
   *   action?: object       // config for the bar
   * }=} res
   */
  constructor(t = {}) {
    switch (super(t), this.type = t.type ?? "AlloyButtonBar", this.type) {
      case "AlloyLinkBar": {
        this.action = t.action instanceof j ? t.action : new j(t.action || {});
        break;
      }
      case "AlloyButtonBar":
      default: {
        this.action = t.action instanceof _ ? t.action : new _(t.action || {});
        break;
      }
    }
  }
}
function ra({ cardImageAction: e, output: t }) {
  var l, u, s, c, n, h;
  if (!e || !(e instanceof zn))
    throw new Error(
      "AlloyCardImageAction requires `cardImageAction` (CardImageActionObject instance)."
    );
  function a() {
    return (d, m) => {
      var p, f;
      t == null || t({
        type: "action",
        action: {
          id: d == null ? void 0 : d.id,
          name: d == null ? void 0 : d.name,
          // button text OR link text
          title: d == null ? void 0 : d.title,
          // may be used for tooltip
          href: d == null ? void 0 : d.href,
          // link target if it's a link
          className: d == null ? void 0 : d.className,
          iconClass: (p = d == null ? void 0 : d.icon) == null ? void 0 : p.iconClass,
          active: d == null ? void 0 : d.active,
          disabled: !!(d != null && d.disabled),
          ariaLabel: d == null ? void 0 : d.ariaLabel,
          tabIndex: d == null ? void 0 : d.tabIndex
        },
        card: {
          id: e.id,
          bodyId: (f = e.body) == null ? void 0 : f.id
        }
      });
    };
  }
  const i = /* @__PURE__ */ r(
    "div",
    {
      id: e.body.id,
      className: e.body.className,
      "aria-label": e.body.name,
      children: /* @__PURE__ */ N("div", { className: "row m-0", children: [
        /* @__PURE__ */ r("div", { className: e.logoClass, children: /* @__PURE__ */ r(
          "img",
          {
            src: (l = e.logo) == null ? void 0 : l.imageUrl,
            alt: (u = e.logo) == null ? void 0 : u.alt,
            style: {
              width: (s = e.logo) == null ? void 0 : s.width,
              height: (c = e.logo) == null ? void 0 : c.height,
              maxWidth: "100%",
              objectFit: "contain"
            }
          }
        ) }),
        /* @__PURE__ */ r("div", { className: e.textClass, children: /* @__PURE__ */ r("div", { className: "row p-1", children: e.fields.map(
          (d) => d != null && d.show ? /* @__PURE__ */ r(
            "div",
            {
              id: d.id,
              className: d.className,
              children: d.name
            },
            d.id
          ) : null
        ) }) })
      ] })
    }
  ), o = /* @__PURE__ */ r(
    "div",
    {
      id: (n = e.action) == null ? void 0 : n.id,
      className: (h = e.action) == null ? void 0 : h.className,
      role: "group",
      children: e.type === "AlloyLinkBar" ? /* @__PURE__ */ r(
        ee,
        {
          linkBar: e.action,
          output: a()
        }
      ) : (
        // default to AlloyButtonBar
        /* @__PURE__ */ r(
          te,
          {
            buttonBar: e.action,
            output: a()
          }
        )
      )
    }
  );
  return /* @__PURE__ */ N("div", { id: e.id, className: e.className, children: [
    i,
    o
  ] });
}
let Je = 0;
function Jn() {
  return Je += 1, `alloyform${Je}`;
}
class He {
  constructor(t = {}) {
    this.id = t.id ?? Jn(), this.title = t.title ?? "AlloyMobile", this.className = t.className ?? "col m-2", this.message = t.message ?? "", this.action = t.action ?? "", this.type = t.type ?? "AlloyInputTextIcon", this.submit = t.submit instanceof X ? t.submit : new X(
      t.submit || {
        name: "Submit",
        icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
        className: "btn btn-primary w-100 mt-3",
        disabled: !1,
        loading: !1,
        ariaLabel: "Submit",
        title: "Submit"
      }
    );
    const a = Array.isArray(t.fields) ? t.fields : [];
    this.fields = a.map(
      (i) => i instanceof Me ? i : new Me(i)
    ), this.data = t.data ?? {};
  }
}
function Ge(e, t, a) {
  let i = !0;
  const o = [];
  if (e.required && (e.type === "checkbox" ? (Array.isArray(t) ? t : []).length === 0 && (i = !1, o.push("This field is required.")) : (t === "" || t === !1 || t === void 0 || t === null) && (i = !1, o.push("This field is required."))), i && typeof e.minLength == "number" && typeof t == "string" && t.length < e.minLength && (i = !1, o.push(`Minimum length is ${e.minLength}`)), i && typeof e.maxLength == "number" && typeof t == "string" && t.length > e.maxLength && (i = !1, o.push(`Maximum length is ${e.maxLength}`)), i && e.pattern && typeof t == "string" && !new RegExp(e.pattern).test(t) && (i = !1, o.push("Invalid format.")), i && e.passwordStrength && typeof t == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(t) || (i = !1, o.push("Password is too weak."))), i && e.matchWith) {
    const l = e.matchWith;
    a[l] !== t && (i = !1, o.push("Values do not match."));
  }
  return {
    valid: i,
    error: !i,
    errors: o
  };
}
function ca({ form: e, output: t }) {
  const a = e instanceof He ? e : new He(e || {});
  if (!a || !Array.isArray(a.fields) || !(a.submit instanceof X))
    throw new Error(
      "AlloyForm could not hydrate a valid FormObject (missing fields[] or submit)."
    );
  const [i, o] = C(() => {
    const d = {}, m = {};
    return a.fields.forEach((p) => {
      m[p.name] = p.value;
    }), a.fields.forEach((p) => {
      const f = p.value, { valid: y, error: v, errors: b } = Ge(p, f, m);
      d[p.name] = {
        value: f,
        valid: y,
        error: v,
        errors: b
      };
    }), d;
  }), l = O(null), u = mt(
    (d) => {
      const m = {};
      Object.keys(d).forEach((f) => {
        m[f] = d[f].value;
      });
      const p = {};
      return a.fields.forEach((f) => {
        const y = m[f.name], { valid: v, error: b, errors: x } = Ge(
          f,
          y,
          m
        );
        p[f.name] = {
          value: y,
          valid: v,
          error: b,
          errors: x
        };
      }), p;
    },
    [a.fields]
  );
  function s(d) {
    if (!d || !d.name) return;
    const { name: m, value: p } = d;
    o((f) => {
      const y = { ...f };
      return y[m] = {
        ...f[m],
        value: p
      }, u(y);
    });
  }
  const c = S(() => {
    const d = {};
    return Object.keys(i).forEach((m) => {
      d[m] = i[m].value;
    }), d;
  }, [i]), n = S(() => Object.values(i).some(
    (d) => d.error || !d.valid
  ), [i]);
  function h(d, m) {
    const p = {
      ...c,
      action: a.action
    };
    a.data = p, a.message = "", t == null || t(p);
  }
  return a.submit.disabled = n || !!a.submit.loading, /* @__PURE__ */ r("div", { className: "row", children: /* @__PURE__ */ r("div", { className: a.className, children: /* @__PURE__ */ N("div", { className: "text-center", children: [
    /* @__PURE__ */ r("h3", { children: a.title }),
    a.message !== "" && /* @__PURE__ */ r("div", { className: "alert alert-text-danger m-0 p-0", children: a.message }),
    a.fields.map((d) => /* @__PURE__ */ r(
      _t,
      {
        input: d,
        output: s
      },
      d.id
    )),
    /* @__PURE__ */ r(
      Mt,
      {
        ref: l,
        buttonSubmit: a.submit,
        output: h
      }
    )
  ] }) }) });
}
export {
  Lt as AlloyButton,
  te as AlloyButtonBar,
  kt as AlloyButtonIcon,
  Mt as AlloyButtonSubmit,
  na as AlloyCard,
  oa as AlloyCardAction,
  aa as AlloyCardIcon,
  sa as AlloyCardIconAction,
  ia as AlloyCardImage,
  ra as AlloyCardImageAction,
  ca as AlloyForm,
  k as AlloyIcon,
  _t as AlloyInput,
  pt as AlloyLink,
  ee as AlloyLinkBar,
  wt as AlloyLinkIcon,
  Ye as AlloyLinkLogo,
  Xn as AlloyNavBar,
  Qn as AlloyTable,
  ta as AlloyTableAction,
  ea as AlloyTableLink,
  _ as ButtonBarObject,
  I as ButtonIconObject,
  F as ButtonObject,
  X as ButtonSubmitObject,
  Vn as CardActionObject,
  Wn as CardIconActionObject,
  lt as CardIconObject,
  zn as CardImageActionObject,
  dt as CardImageObject,
  ie as CardObject,
  He as FormObject,
  w as IconObject,
  Me as InputObject,
  j as LinkBarObject,
  B as LinkIconObject,
  M as LinkLogoObject,
  $ as LinkObject,
  Pt as NavBarObject,
  Pn as TableActionObject,
  Dn as TableLinkObject,
  Vt as TableObject
};
//# sourceMappingURL=alloy-react.es.js.map
