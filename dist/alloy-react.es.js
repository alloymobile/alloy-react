import { jsx as r, jsxs as N, Fragment as K } from "react/jsx-runtime";
import * as g from "react";
import { useRef as O, useState as C, useMemo as S, forwardRef as fe, useImperativeHandle as ye, useEffect as Z, useCallback as ht } from "react";
import "react-dom";
function He(e = "id") {
  const t = Date.now(), a = Math.random().toString(36).slice(2, 7);
  return `${e}-${t}-${a}`;
}
class w {
  /**
   * Build a new IconObject.
   *
   * Consumers pass one config object (IconConfig). We normalize it
   * and guarantee it has an id.
   *
   * @param {IconConfig} icon
   */
  constructor(t = {}) {
    if (!t.iconClass)
      throw new Error("IconObject requires `iconClass`.");
    this.id = t.id ?? He("icon"), this.iconClass = t.iconClass;
  }
}
function k({ icon: e }) {
  if (!e) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ r("i", { id: e.id, className: e.iconClass, "aria-hidden": "true" });
}
function mt(e = "", t = "") {
  const [a, i] = C(!1), [o, d] = C(!1), [u, s] = C(!1);
  return {
    className: S(() => [e, (a || o || u) && t].filter(Boolean).join(" "), [e, t, a, o, u]),
    events: {
      onMouseEnter: () => i(!0),
      onMouseLeave: () => {
        i(!1), d(!1);
      },
      onMouseDown: () => d(!0),
      onMouseUp: () => d(!1),
      onFocus: () => s(!0),
      onBlur: () => s(!1)
    }
  };
}
class _ {
  /**
   * @param {LinkConfig} link
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkObject requires `href`.");
    if (!t.name)
      throw new Error("LinkObject requires `name`.");
    this.id = t.id ?? He("link"), this.name = t.name, this.href = t.href, this.className = t.className ?? "", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function ft({ link: e }) {
  if (!e || !(e instanceof _))
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  const t = O(e.id), { className: a, events: i } = mt(e.className, e.active), o = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel;
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
let xe = 0;
function yt() {
  return xe += 1, `alloyLinkIcon${xe}`;
}
function vt(e = "", t = "") {
  const [a, i] = C(!1), [o, d] = C(!1), [u, s] = C(!1);
  return {
    className: S(
      () => [e, (a || o || u) && t].filter(Boolean).join(" "),
      [e, t, a, o, u]
    ),
    events: {
      onMouseEnter: () => i(!0),
      onMouseLeave: () => {
        i(!1), d(!1);
      },
      onMouseDown: () => d(!0),
      onMouseUp: () => d(!1),
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
    className: d,
    active: u,
    target: s,
    rel: c,
    onClick: n,
    title: h
  }) {
    if (!a) throw new Error("LinkIconObject requires `href`.");
    if (!i || !(i instanceof w))
      throw new Error("LinkIconObject requires `icon` (Icon instance).");
    this.id = t ?? yt(), this.href = a, this.icon = i instanceof w ? i : new w(i), this.name = o, this.className = d ?? "", this.active = u ?? "", this.target = s, this.rel = c, this.onClick = n, this.title = h;
  }
}
function pt({ linkIcon: e }) {
  if (!e || !(e instanceof B))
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  const t = O(e.id), { className: a, events: i } = vt(e.className, e.active), o = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, d = !!e.name;
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
        d && /* @__PURE__ */ r("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
let be = 0;
function gt() {
  return be += 1, `alloyLinkLogo${be}`;
}
function Nt(e = "", t = "") {
  const [a, i] = C(!1), [o, d] = C(!1), [u, s] = C(!1);
  return {
    className: S(
      () => [e, (a || o || u) && t].filter(Boolean).join(" "),
      [e, t, a, o, u]
    ),
    events: {
      onMouseEnter: () => i(!0),
      onMouseLeave: () => {
        i(!1), d(!1);
      },
      onMouseDown: () => d(!0),
      onMouseUp: () => d(!1),
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
    width: d,
    height: u,
    logoAlt: s = "",
    className: c,
    active: n,
    target: h,
    rel: l,
    onClick: m,
    title: p
  }) {
    if (!i) throw new Error("LinkLogoObject requires `href`.");
    if (!o) throw new Error("LinkLogoObject requires `logo`.");
    this.id = t ?? gt(), this.name = a, this.href = i, this.logo = o, this.width = d, this.height = u, this.logoAlt = s, this.className = c ?? "", this.active = n ?? "", this.target = h, this.rel = l, this.onClick = m, this.title = p;
  }
}
function Ge({ linkLogo: e }) {
  if (!e || !(e instanceof M))
    throw new Error("AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance).");
  const t = O(e.id), { className: a, events: i } = Nt(e.className, e.active), o = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, d = !!e.name;
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
        d && /* @__PURE__ */ r("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
let Ee = 0;
function wt() {
  return Ee += 1, `alloyBtn${Ee}`;
}
function Ct(e = "", t = "") {
  const [a, i] = C(!1), [o, d] = C(!1), [u, s] = C(!1);
  return {
    className: S(() => [e, (a || o || u) && t].filter(Boolean).join(" "), [e, t, a, o, u]),
    events: {
      onMouseEnter: () => i(!0),
      onMouseLeave: () => {
        i(!1), d(!1);
      },
      onMouseDown: () => d(!0),
      onMouseUp: () => d(!1),
      onFocus: () => s(!0),
      onBlur: () => s(!1)
    }
  };
}
class F {
  constructor(t) {
    if (!t || !t.name) throw new Error("ButtonObject requires `name`.");
    this.id = t.id ?? wt(), this.name = t.name, this.className = t.className ?? "", this.active = t.active ?? "", this.disabled = !!t.disabled, this.title = t.title, this.ariaLabel = t.ariaLabel, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const xt = fe(function({ button: t, output: a }, i) {
  if (!t || !(t instanceof F))
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  const o = O(null), d = O(t.id), u = t.disabled, { className: s, events: c } = Ct(t.className, t.active);
  ye(
    i,
    () => ({
      el: o.current,
      model: t,
      focus: () => {
        var l;
        return (l = o.current) == null ? void 0 : l.focus();
      },
      click: () => {
        var l;
        return (l = o.current) == null ? void 0 : l.click();
      }
    }),
    [t]
  );
  const n = (l, m) => (p) => {
    m == null || m(p), a == null || a(t, p), l == null || l(p, t);
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
      id: d.current,
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
let Le = 0;
function bt() {
  return Le += 1, `alloyBtnicon${Le}`;
}
function Et(e = "", t = "") {
  const [a, i] = C(!1), [o, d] = C(!1), [u, s] = C(!1);
  return {
    className: S(() => [e, (a || o || u) && t].filter(Boolean).join(" "), [e, t, a, o, u]),
    events: {
      onMouseEnter: () => i(!0),
      onMouseLeave: () => {
        i(!1), d(!1);
      },
      onMouseDown: () => d(!0),
      onMouseUp: () => d(!1),
      onFocus: () => s(!0),
      onBlur: () => s(!1)
    }
  };
}
class U {
  constructor(t) {
    if (!t || !t.icon) throw new Error("ButtonIconObject requires `icon` (IconObject).");
    this.id = t.id ?? bt(), this.name = t.name, this.icon = t.icon instanceof w ? t.icon : new w(t.icon), this.className = t.className ?? "", this.active = t.active ?? "", this.disabled = !!t.disabled, this.title = t.title, this.ariaLabel = t.ariaLabel, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const Lt = fe(function({ buttonIcon: t, output: a }, i) {
  if (!t || !(t instanceof U))
    throw new Error("AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance).");
  const o = O(null), d = O(t.id), u = t.disabled, { className: s, events: c } = Et(t.className, t.active);
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
  }, l = t.ariaLabel || t.name || "icon button";
  return /* @__PURE__ */ N(
    "button",
    {
      id: d.current,
      ref: o,
      type: "button",
      className: s,
      title: t.title,
      "aria-label": l,
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
let Ae = 0;
function At() {
  return Ae += 1, `alloyBtnsubmit${Ae}`;
}
class X {
  constructor(t) {
    if (!t || !t.name) throw new Error("ButtonSubmitObject requires `name`.");
    if (!t.icon) throw new Error("ButtonSubmitObject requires `icon`.");
    this.id = t.id ?? At(), this.name = t.name, this.icon = t.icon instanceof w ? t.icon : new w(t.icon), this.className = t.className ?? "", this.disabled = !!t.disabled, this.loading = !!t.loading, this.title = t.title, this.ariaLabel = t.ariaLabel, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onMouseDown = t.onMouseDown, this.onKeyDown = t.onKeyDown;
  }
}
const Ot = fe(function({ buttonSubmit: t, output: a }, i) {
  if (!t || !(t instanceof X))
    throw new Error("AlloyButtonSubmit requires `buttonSubmit` (ButtonSubmitObject instance).");
  const o = O(null), d = O(t.id), [u, s] = C(!!t.loading);
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
  const h = () => n.current || c ? !1 : (n.current = !0, t.loading = !0, t.disabled = !0, s(!0), !0), l = (v, b) => {
    a == null || a(t, v), b == null || b(v, t);
  }, m = (v) => {
    h() && l(v, t.onClick);
  }, p = (v) => {
    h() && l(v, t.onMouseDown);
  }, f = (v) => {
    const b = v.key;
    (b === "Enter" || b === " ") && h() && l(v, t.onKeyDown);
  }, y = u;
  return /* @__PURE__ */ N(
    "button",
    {
      id: d.current,
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
let Oe = 0;
function kt() {
  return Oe += 1, `alloyinput${Oe}`;
}
class ke {
  constructor(t) {
    const {
      id: a,
      name: i,
      type: o = "text",
      label: d = "",
      value: u = o === "checkbox" ? [] : "",
      layout: s = "text",
      icon: c,
      placeholder: n = "",
      required: h = !1,
      minLength: l,
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
    this.id = a ?? kt(), this.name = i, this.type = o, this.label = d, this.value = u, this.layout = s, this.icon = c instanceof w ? c : c ? new w(c) : void 0, this.placeholder = n, this.required = h, this.minLength = l, this.maxLength = m, this.min = p, this.max = f, this.pattern = y, this.matchWith = v, this.passwordStrength = b, this.options = x, this.validators = A, Object.assign(this, L);
  }
}
function St({ input: e, output: t }) {
  const [a, i] = C(e.value), [o, d] = C(!1), u = (f) => {
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
  }, c = () => d(!0), n = o && u(a).length > 0, h = n && u(a).length > 0 && /* @__PURE__ */ r("div", { className: "mt-2", "aria-live": "polite", children: u(a).map((f, y) => /* @__PURE__ */ r(
    "div",
    {
      className: "alert alert-danger py-2 mb-2",
      role: "alert",
      children: f
    },
    y
  )) }), l = {
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
      ...l,
      value: a,
      onChange: m,
      className: `form-control${n ? " is-invalid" : ""}`
    }
  ) : e.type === "select" ? /* @__PURE__ */ r(
    "select",
    {
      ...l,
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
      ...l,
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
let Se = 0;
function Mt() {
  return Se += 1, `barItem${Se}`;
}
let Me = 0;
function jt() {
  return Me += 1, `linkBar${Me}`;
}
let je = class {
  /**
   * @param {{ id?: string, name?: string, className?: string, show?: boolean }} p
   */
  constructor({ id: t, name: a, className: i, show: o } = {}) {
    this.id = t ?? Mt(), this.name = a ?? "Bar Item", this.className = i ?? "", this.show = typeof o == "boolean" ? o : !1;
  }
};
class j {
  constructor({ id: t, className: a, barName: i, type: o, linkClass: d, links: u, selected: s } = {}) {
    this.id = t ?? jt(), this.className = a ?? "d-flex justify-content-center", this.barName = i instanceof je ? i : new je(i ?? {}), this.type = o ?? "AlloyLink", this.linkClass = d ?? "nav-item", this.selected = s ?? "active";
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
          (n) => n instanceof _ ? n : new _({
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
  return e instanceof _ ? new _({
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
  function d(n) {
    const h = n.onClick;
    return (l) => {
      const m = n.id || `${n.href || ""}-${n.name || ""}`;
      i(m), h == null || h(l);
    };
  }
  const u = () => /* @__PURE__ */ N(K, { children: [
    /* @__PURE__ */ r(o, {}),
    /* @__PURE__ */ r("ul", { id: t.current, className: e.className, children: e.links.map((n, h) => {
      if (!(n instanceof _))
        throw new Error(
          "AlloyLinkBar (type='AlloyLink') requires each `links` item to be a LinkObject instance."
        );
      const l = ((n == null ? void 0 : n.id) ?? "") === a, m = ce(
        n,
        e.selected,
        l,
        d(n)
      );
      return /* @__PURE__ */ r("li", { className: e.linkClass, children: /* @__PURE__ */ r(ft, { link: m }) }, ((n == null ? void 0 : n.id) ?? h) + "-li");
    }) })
  ] }), s = () => /* @__PURE__ */ N(K, { children: [
    /* @__PURE__ */ r(o, {}),
    /* @__PURE__ */ r("ul", { id: t.current, className: e.className, children: e.links.map((n, h) => {
      if (!(n instanceof B))
        throw new Error(
          "AlloyLinkBar (type='AlloyLinkIcon') requires each `links` item to be a LinkIconObject instance."
        );
      const l = ((n == null ? void 0 : n.id) ?? "") === a, m = ce(
        n,
        e.selected,
        l,
        d(n)
      );
      return /* @__PURE__ */ r("li", { className: e.linkClass, children: /* @__PURE__ */ r(pt, { linkIcon: m }) }, ((n == null ? void 0 : n.id) ?? h) + "-li");
    }) })
  ] }), c = () => /* @__PURE__ */ N(K, { children: [
    /* @__PURE__ */ r(o, {}),
    /* @__PURE__ */ r("ul", { id: t.current, className: e.className, children: e.links.map((n, h) => {
      if (!(n instanceof M))
        throw new Error(
          "AlloyLinkBar (type='AlloyLinkLogo') requires each `links` item to be a LinkLogoObject instance."
        );
      const l = ((n == null ? void 0 : n.id) ?? "") === a, m = ce(
        n,
        e.selected,
        l,
        d(n)
      );
      return /* @__PURE__ */ r("li", { className: e.linkClass, children: /* @__PURE__ */ r(Ge, { linkLogo: m }) }, ((n == null ? void 0 : n.id) ?? h) + "-li");
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
let Rt = 0;
function $t() {
  return `barItem${++Rt}`;
}
let _t = 0;
function Bt() {
  return `buttonBar${++_t}`;
}
class Re {
  constructor({ id: t, name: a, className: i, show: o } = {}) {
    this.id = t ?? $t(), this.name = a ?? "Bar", this.className = i ?? "", this.show = typeof o == "boolean" ? o : !1;
  }
}
class R {
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
  constructor({ id: t, className: a, barName: i, type: o, buttonClass: d, buttons: u, selected: s } = {}) {
    this.id = t ?? Bt(), this.className = a ?? "d-flex justify-content-center", this.barName = i instanceof Re ? i : new Re(i ?? {}), this.type = o ?? "AlloyButton", this.buttonClass = d ?? "nav-item", this.selected = s ?? "active";
    const c = Array.isArray(u) ? u : [];
    this.type === "AlloyButtonIcon" ? this.buttons = c.map(
      (n) => n instanceof U ? n : new U({
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
function $e(e, t, a) {
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
  }) : e instanceof U ? new U({
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
  if (!e || !(e instanceof R))
    throw new Error("AlloyButtonBar requires `buttonBar` (ButtonBarObject instance).");
  const a = O(e.id), [i, o] = C("");
  Z(() => {
    o("");
  }, [e]);
  const d = () => {
    var n;
    return (n = e.barName) != null && n.show ? /* @__PURE__ */ r("div", { id: e.barName.id, className: e.barName.className, children: e.barName.name }) : null;
  }, u = (n, h) => {
    if ((h == null ? void 0 : h.type) === "click") {
      const l = (n == null ? void 0 : n.id) ?? "";
      o(l);
    }
    t == null || t(n, h);
  }, s = () => /* @__PURE__ */ N(K, { children: [
    /* @__PURE__ */ r(d, {}),
    /* @__PURE__ */ r("ul", { id: a.current, className: e.className, children: e.buttons.map((n, h) => {
      if (!(n instanceof F))
        throw new Error("AlloyButtonBar (type='AlloyButton') requires ButtonObject items.");
      const l = ((n == null ? void 0 : n.id) ?? "") === i, m = $e(n, e.selected, l);
      return /* @__PURE__ */ r("li", { className: e.buttonClass, children: /* @__PURE__ */ r(xt, { button: m, output: u }) }, ((n == null ? void 0 : n.id) ?? h) + "-li");
    }) })
  ] }), c = () => /* @__PURE__ */ N(K, { children: [
    /* @__PURE__ */ r(d, {}),
    /* @__PURE__ */ r("ul", { id: a.current, className: e.className, children: e.buttons.map((n, h) => {
      if (!(n instanceof U))
        throw new Error("AlloyButtonBar (type='AlloyButtonIcon') requires ButtonIconObject items.");
      const l = ((n == null ? void 0 : n.id) ?? "") === i, m = $e(n, e.selected, l);
      return /* @__PURE__ */ r("li", { className: e.buttonClass, children: /* @__PURE__ */ r(Lt, { buttonIcon: m, output: u }) }, ((n == null ? void 0 : n.id) ?? h) + "-li");
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
let _e = 0;
function Dt() {
  return _e += 1, `navbar${_e}`;
}
function Ft(e, t) {
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
        (a) => a instanceof _ ? a : new _({
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
class Ut {
  constructor({ id: t, className: a, logo: i, linkBar: o } = {}) {
    if (this.id = t ?? Dt(), this.className = a ?? "navbar navbar-expand-lg navbar-light bg-light", this.logo = i instanceof M ? i : new M(
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
      const d = (o == null ? void 0 : o.type) ?? "AlloyLink", u = Ft(d, (o == null ? void 0 : o.links) || []);
      this.linkBar = new j({
        id: o == null ? void 0 : o.id,
        className: (o == null ? void 0 : o.className) ?? "navbar-nav ms-auto mb-2 mb-lg-0 gap-2",
        barName: (o == null ? void 0 : o.barName) ?? { show: !1 },
        type: d,
        linkClass: (o == null ? void 0 : o.linkClass) ?? "nav-item",
        links: u,
        selected: (o == null ? void 0 : o.selected) ?? "active"
        // navbar demos want 'active'
      });
    }
  }
}
function Gn({ navBar: e }) {
  if (!e || !(e instanceof Ut))
    throw new Error("AlloyNavBar requires `navBar` (NavBarObject instance).");
  const t = O(e.id), a = `${t.current}-collapse`;
  return /* @__PURE__ */ r("nav", { id: t.current, className: e.className, children: /* @__PURE__ */ N("div", { className: "container-fluid", children: [
    /* @__PURE__ */ r(Ge, { linkLogo: e.logo }),
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
function It(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
let Be = 0;
function Tt() {
  return Be += 1, `table${Be}`;
}
class Pt {
  constructor(t = {}) {
    this.id = t.id ?? Tt(), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [];
    const a = new w({ iconClass: "fa-solid fa-user" }), i = new w({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = t.icon instanceof w ? t.icon : new w(t.icon || a), this.sort = t.sort instanceof w ? t.sort : new w(t.sort || i);
  }
}
function Kt(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function Yn({ table: e, output: t }) {
  if (!e || !(e instanceof Pt))
    throw new Error("AlloyTable requires `table` (TableObject instance).");
  const a = O(e.id), [i, o] = C({ col: "", dir: "asc" }), d = S(() => Kt(e.rows), [e.rows]), u = (c) => {
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
      d.map((c) => {
        const n = i.col === c, h = n && i.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ N(
          "span",
          {
            onClick: () => u(c),
            style: { userSelect: "none" },
            children: [
              It(c),
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
      d.map((h) => /* @__PURE__ */ r("td", { className: "cursor", children: /* @__PURE__ */ r("span", { children: c == null ? void 0 : c[h] }) }, `${(c == null ? void 0 : c.id) ?? n}-${h}`))
    ] }, (c == null ? void 0 : c.id) ?? n)) : /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r("td", { colSpan: Math.max(1, d.length) + 1, className: "text-center text-secondary", children: "No rows" }) }) })
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
var De;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(De || (De = {}));
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
function Ye(e) {
  let t = {};
  if (e) {
    let a = e.indexOf("#");
    a >= 0 && (t.hash = e.substr(a), e = e.substr(0, a));
    let i = e.indexOf("?");
    i >= 0 && (t.search = e.substr(i), e = e.substr(0, i)), e && (t.pathname = e);
  }
  return t;
}
var Fe;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(Fe || (Fe = {}));
function Ue(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [a, i] = qt(e.path, e.caseSensitive, e.end), o = t.match(a);
  if (!o) return null;
  let d = o[0], u = d.replace(/(.)\/+$/, "$1"), s = o.slice(1);
  return {
    params: i.reduce((n, h, l) => {
      let {
        paramName: m,
        isOptional: p
      } = h;
      if (m === "*") {
        let y = s[l] || "";
        u = d.slice(0, d.length - y.length).replace(/(.)\/+$/, "$1");
      }
      const f = s[l];
      return p && !f ? n[m] = void 0 : n[m] = (f || "").replace(/%2F/g, "/"), n;
    }, {}),
    pathname: d,
    pathnameBase: u,
    pattern: e
  };
}
function qt(e, t, a) {
  t === void 0 && (t = !1), a === void 0 && (a = !0), q(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let i = [], o = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (u, s, c) => (i.push({
    paramName: s,
    isOptional: c != null
  }), c ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (i.push({
    paramName: "*"
  }), o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : a ? o += "\\/*$" : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, t ? void 0 : "i"), i];
}
function I(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let a = t.endsWith("/") ? t.length - 1 : t.length, i = e.charAt(a);
  return i && i !== "/" ? null : e.slice(a) || "/";
}
function Vt(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: a,
    search: i = "",
    hash: o = ""
  } = typeof e == "string" ? Ye(e) : e;
  return {
    pathname: a ? a.startsWith("/") ? a : Wt(a, t) : t,
    search: Jt(i),
    hash: Ht(o)
  };
}
function Wt(e, t) {
  let a = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((o) => {
    o === ".." ? a.length > 1 && a.pop() : o !== "." && a.push(o);
  }), a.length > 1 ? a.join("/") : "/";
}
function le(e, t, a, i) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(i) + "].  Please separate it out to the ") + ("`to." + a + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function zt(e) {
  return e.filter((t, a) => a === 0 || t.route.path && t.route.path.length > 0);
}
function Ze(e, t) {
  let a = zt(e);
  return t ? a.map((i, o) => o === a.length - 1 ? i.pathname : i.pathnameBase) : a.map((i) => i.pathnameBase);
}
function Xe(e, t, a, i) {
  i === void 0 && (i = !1);
  let o;
  typeof e == "string" ? o = Ye(e) : (o = ue({}, e), E(!o.pathname || !o.pathname.includes("?"), le("?", "pathname", "search", o)), E(!o.pathname || !o.pathname.includes("#"), le("#", "pathname", "hash", o)), E(!o.search || !o.search.includes("#"), le("#", "search", "hash", o)));
  let d = e === "" || o.pathname === "", u = d ? "/" : o.pathname, s;
  if (u == null)
    s = a;
  else {
    let l = t.length - 1;
    if (!i && u.startsWith("..")) {
      let m = u.split("/");
      for (; m[0] === ".."; )
        m.shift(), l -= 1;
      o.pathname = m.join("/");
    }
    s = l >= 0 ? t[l] : "/";
  }
  let c = Vt(o, s), n = u && u !== "/" && u.endsWith("/"), h = (d || u === ".") && a.endsWith("/");
  return !c.pathname.endsWith("/") && (n || h) && (c.pathname += "/"), c;
}
const ve = (e) => e.join("/").replace(/\/\/+/g, "/"), Jt = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Ht = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, Qe = ["post", "put", "patch", "delete"];
new Set(Qe);
const Gt = ["get", ...Qe];
new Set(Gt);
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
const et = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (et.displayName = "DataRouterState");
const Yt = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (Yt.displayName = "Await");
const $ = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && ($.displayName = "Navigation");
const pe = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (pe.displayName = "Location");
const P = /* @__PURE__ */ g.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (P.displayName = "Route");
const Zt = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (Zt.displayName = "RouteError");
function Xt(e, t) {
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
  } = g.useContext($), {
    hash: d,
    pathname: u,
    search: s
  } = W(e, {
    relative: a
  }), c = u;
  return i !== "/" && (c = u === "/" ? i : ve([i, u])), o.createHref({
    pathname: c,
    search: s,
    hash: d
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
const tt = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function nt(e) {
  g.useContext($).static || g.useLayoutEffect(e);
}
function Qt() {
  let {
    isDataRoute: e
  } = g.useContext(P);
  return e ? on() : en();
}
function en() {
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
  } = g.useContext($), {
    matches: o
  } = g.useContext(P), {
    pathname: d
  } = V(), u = JSON.stringify(Ze(o, a.v7_relativeSplatPath)), s = g.useRef(!1);
  return nt(() => {
    s.current = !0;
  }), g.useCallback(function(n, h) {
    if (h === void 0 && (h = {}), process.env.NODE_ENV !== "production" && q(s.current, tt), !s.current) return;
    if (typeof n == "number") {
      i.go(n);
      return;
    }
    let l = Xe(n, JSON.parse(u), d, h.relative === "path");
    e == null && t !== "/" && (l.pathname = l.pathname === "/" ? t : ve([t, l.pathname])), (h.replace ? i.replace : i.push)(l, h.state, h);
  }, [t, i, u, d, e]);
}
function W(e, t) {
  let {
    relative: a
  } = t === void 0 ? {} : t, {
    future: i
  } = g.useContext($), {
    matches: o
  } = g.useContext(P), {
    pathname: d
  } = V(), u = JSON.stringify(Ze(o, i.v7_relativeSplatPath));
  return g.useMemo(() => Xe(e, JSON.parse(u), d, a === "path"), [e, u, d, a]);
}
var at = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(at || {}), Ne = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(Ne || {});
function it(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function tn(e) {
  let t = g.useContext(ne);
  return t || (process.env.NODE_ENV !== "production" ? E(!1, it(e)) : E(!1)), t;
}
function nn(e) {
  let t = g.useContext(P);
  return t || (process.env.NODE_ENV !== "production" ? E(!1, it(e)) : E(!1)), t;
}
function ot(e) {
  let t = nn(e), a = t.matches[t.matches.length - 1];
  return a.route.id || (process.env.NODE_ENV !== "production" ? E(!1, e + ' can only be used on routes that contain a unique "id"') : E(!1)), a.route.id;
}
function an() {
  return ot(Ne.UseRouteId);
}
function on() {
  let {
    router: e
  } = tn(at.UseNavigateStable), t = ot(Ne.UseNavigateStable), a = g.useRef(!1);
  return nt(() => {
    a.current = !0;
  }), g.useCallback(function(o, d) {
    d === void 0 && (d = {}), process.env.NODE_ENV !== "production" && q(a.current, tt), a.current && (typeof o == "number" ? e.navigate(o) : e.navigate(o, me({
      fromRouteId: t
    }, d)));
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
  var a = {}, i = Object.keys(e), o, d;
  for (d = 0; d < i.length; d++)
    o = i[d], !(t.indexOf(o) >= 0) && (a[o] = e[o]);
  return a;
}
const G = "get", Y = "application/x-www-form-urlencoded";
function ae(e) {
  return e != null && typeof e.tagName == "string";
}
function sn(e) {
  return ae(e) && e.tagName.toLowerCase() === "button";
}
function rn(e) {
  return ae(e) && e.tagName.toLowerCase() === "form";
}
function cn(e) {
  return ae(e) && e.tagName.toLowerCase() === "input";
}
function ln(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function dn(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !ln(e);
}
let J = null;
function un() {
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
const hn = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function de(e) {
  return e != null && !hn.has(e) ? (process.env.NODE_ENV !== "production" && q(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + Y + '"')), null) : e;
}
function mn(e, t) {
  let a, i, o, d, u;
  if (rn(e)) {
    let s = e.getAttribute("action");
    i = s ? I(s, t) : null, a = e.getAttribute("method") || G, o = de(e.getAttribute("enctype")) || Y, d = new FormData(e);
  } else if (sn(e) || cn(e) && (e.type === "submit" || e.type === "image")) {
    let s = e.form;
    if (s == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let c = e.getAttribute("formaction") || s.getAttribute("action");
    if (i = c ? I(c, t) : null, a = e.getAttribute("formmethod") || s.getAttribute("method") || G, o = de(e.getAttribute("formenctype")) || de(s.getAttribute("enctype")) || Y, d = new FormData(s, e), !un()) {
      let {
        name: n,
        type: h,
        value: l
      } = e;
      if (h === "image") {
        let m = n ? n + "." : "";
        d.append(m + "x", "0"), d.append(m + "y", "0");
      } else n && d.append(n, l);
    }
  } else {
    if (ae(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    a = G, i = null, o = Y, u = e;
  }
  return d && o === "text/plain" && (u = d, d = void 0), {
    action: i,
    method: a.toLowerCase(),
    encType: o,
    formData: d,
    body: u
  };
}
const fn = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], yn = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], vn = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], pn = "6";
try {
  window.__reactRouterVersion = pn;
} catch {
}
const st = /* @__PURE__ */ g.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (st.displayName = "ViewTransition");
const gn = /* @__PURE__ */ g.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (gn.displayName = "Fetchers");
process.env.NODE_ENV;
const Nn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", wn = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, D = /* @__PURE__ */ g.forwardRef(function(t, a) {
  let {
    onClick: i,
    relative: o,
    reloadDocument: d,
    replace: u,
    state: s,
    target: c,
    to: n,
    preventScrollReset: h,
    viewTransition: l
  } = t, m = we(t, fn), {
    basename: p
  } = g.useContext($), f, y = !1;
  if (typeof n == "string" && wn.test(n) && (f = n, Nn))
    try {
      let A = new URL(window.location.href), L = n.startsWith("//") ? new URL(A.protocol + n) : new URL(n), z = I(L.pathname, p);
      L.origin === A.origin && z != null ? n = z + L.search + L.hash : y = !0;
    } catch {
      process.env.NODE_ENV !== "production" && q(!1, '<Link to="' + n + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let v = Xt(n, {
    relative: o
  }), b = En(n, {
    replace: u,
    state: s,
    target: c,
    preventScrollReset: h,
    relative: o,
    viewTransition: l
  });
  function x(A) {
    i && i(A), A.defaultPrevented || b(A);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ g.createElement("a", T({}, m, {
      href: f || v,
      onClick: y || d ? i : x,
      ref: a,
      target: c
    }))
  );
});
process.env.NODE_ENV !== "production" && (D.displayName = "Link");
const Cn = /* @__PURE__ */ g.forwardRef(function(t, a) {
  let {
    "aria-current": i = "page",
    caseSensitive: o = !1,
    className: d = "",
    end: u = !1,
    style: s,
    to: c,
    viewTransition: n,
    children: h
  } = t, l = we(t, yn), m = W(c, {
    relative: l.relative
  }), p = V(), f = g.useContext(et), {
    navigator: y,
    basename: v
  } = g.useContext($), b = f != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Mn(m) && n === !0, x = y.encodeLocation ? y.encodeLocation(m).pathname : m.pathname, A = p.pathname, L = f && f.navigation && f.navigation.location ? f.navigation.location.pathname : null;
  o || (A = A.toLowerCase(), L = L ? L.toLowerCase() : null, x = x.toLowerCase()), L && v && (L = I(L, v) || L);
  const z = x !== "/" && x.endsWith("/") ? x.length - 1 : x.length;
  let oe = A === x || !u && A.startsWith(x) && A.charAt(z) === "/", Ce = L != null && (L === x || !u && L.startsWith(x) && L.charAt(x.length) === "/"), se = {
    isActive: oe,
    isPending: Ce,
    isTransitioning: b
  }, dt = oe ? i : void 0, re;
  typeof d == "function" ? re = d(se) : re = [d, oe ? "active" : null, Ce ? "pending" : null, b ? "transitioning" : null].filter(Boolean).join(" ");
  let ut = typeof s == "function" ? s(se) : s;
  return /* @__PURE__ */ g.createElement(D, T({}, l, {
    "aria-current": dt,
    className: re,
    ref: a,
    style: ut,
    to: c,
    viewTransition: n
  }), typeof h == "function" ? h(se) : h);
});
process.env.NODE_ENV !== "production" && (Cn.displayName = "NavLink");
const xn = /* @__PURE__ */ g.forwardRef((e, t) => {
  let {
    fetcherKey: a,
    navigate: i,
    reloadDocument: o,
    replace: d,
    state: u,
    method: s = G,
    action: c,
    onSubmit: n,
    relative: h,
    preventScrollReset: l,
    viewTransition: m
  } = e, p = we(e, vn), f = kn(), y = Sn(c, {
    relative: h
  }), v = s.toLowerCase() === "get" ? "get" : "post", b = (x) => {
    if (n && n(x), x.defaultPrevented) return;
    x.preventDefault();
    let A = x.nativeEvent.submitter, L = (A == null ? void 0 : A.getAttribute("formmethod")) || s;
    f(A || x.currentTarget, {
      fetcherKey: a,
      method: L,
      navigate: i,
      replace: d,
      state: u,
      relative: h,
      preventScrollReset: l,
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
process.env.NODE_ENV !== "production" && (xn.displayName = "Form");
process.env.NODE_ENV;
var Q;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(Q || (Q = {}));
var Ie;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Ie || (Ie = {}));
function bn(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function rt(e) {
  let t = g.useContext(ne);
  return t || (process.env.NODE_ENV !== "production" ? E(!1, bn(e)) : E(!1)), t;
}
function En(e, t) {
  let {
    target: a,
    replace: i,
    state: o,
    preventScrollReset: d,
    relative: u,
    viewTransition: s
  } = t === void 0 ? {} : t, c = Qt(), n = V(), h = W(e, {
    relative: u
  });
  return g.useCallback((l) => {
    if (dn(l, a)) {
      l.preventDefault();
      let m = i !== void 0 ? i : he(n) === he(h);
      c(e, {
        replace: m,
        state: o,
        preventScrollReset: d,
        relative: u,
        viewTransition: s
      });
    }
  }, [n, c, h, i, o, a, e, d, u, s]);
}
function Ln() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let An = 0, On = () => "__" + String(++An) + "__";
function kn() {
  let {
    router: e
  } = rt(Q.UseSubmit), {
    basename: t
  } = g.useContext($), a = an();
  return g.useCallback(function(i, o) {
    o === void 0 && (o = {}), Ln();
    let {
      action: d,
      method: u,
      encType: s,
      formData: c,
      body: n
    } = mn(i, t);
    if (o.navigate === !1) {
      let h = o.fetcherKey || On();
      e.fetch(h, a, o.action || d, {
        preventScrollReset: o.preventScrollReset,
        formData: c,
        body: n,
        formMethod: o.method || u,
        formEncType: o.encType || s,
        flushSync: o.flushSync
      });
    } else
      e.navigate(o.action || d, {
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
function Sn(e, t) {
  let {
    relative: a
  } = t === void 0 ? {} : t, {
    basename: i
  } = g.useContext($), o = g.useContext(P);
  o || (process.env.NODE_ENV !== "production" ? E(!1, "useFormAction must be used inside a RouteContext") : E(!1));
  let [d] = o.matches.slice(-1), u = T({}, W(e || ".", {
    relative: a
  })), s = V();
  if (e == null) {
    u.search = s.search;
    let c = new URLSearchParams(u.search), n = c.getAll("index");
    if (n.some((l) => l === "")) {
      c.delete("index"), n.filter((m) => m).forEach((m) => c.append("index", m));
      let l = c.toString();
      u.search = l ? "?" + l : "";
    }
  }
  return (!e || e === ".") && d.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), i !== "/" && (u.pathname = u.pathname === "/" ? i : ve([i, u.pathname])), he(u);
}
function Mn(e, t) {
  t === void 0 && (t = {});
  let a = g.useContext(st);
  a == null && (process.env.NODE_ENV !== "production" ? E(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : E(!1));
  let {
    basename: i
  } = rt(Q.useViewTransitionState), o = W(e, {
    relative: t.relative
  });
  if (!a.isTransitioning)
    return !1;
  let d = I(a.currentLocation.pathname, i) || a.currentLocation.pathname, u = I(a.nextLocation.pathname, i) || a.nextLocation.pathname;
  return Ue(o.pathname, u) != null || Ue(o.pathname, d) != null;
}
function jn(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
let Te = 0;
function Rn() {
  return Te += 1, `tablelink${Te}`;
}
class $n {
  constructor(t = {}) {
    if (!t.link) throw new Error("TableLinkObject requires `link` (base route).");
    this.id = t.id ?? Rn(), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = t.link;
    const a = new w({ iconClass: "fa-solid fa-user" }), i = new w({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = t.icon instanceof w ? t.icon : new w(t.icon || a), this.sort = t.sort instanceof w ? t.sort : new w(t.sort || i);
  }
}
function _n(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function Zn({ tableLink: e, output: t }) {
  if (!e || !(e instanceof $n))
    throw new Error("AlloyTableLink requires `tableLink` (TableLinkObject instance).");
  const a = O(e.id), [i, o] = C({ col: "", dir: "asc" }), d = S(() => _n(e.rows), [e.rows]), u = (s) => {
    if (!s) return;
    const c = i.col === s && i.dir === "asc" ? "desc" : "asc";
    o({ col: s, dir: c }), t == null || t({ type: "column", name: s, dir: c });
  };
  return /* @__PURE__ */ N("table", { id: a.current, className: e.className, children: [
    /* @__PURE__ */ r("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ N("tr", { children: [
      /* @__PURE__ */ r("th", { scope: "col", children: "Type" }),
      d.map((s) => {
        const c = i.col === s, n = c && i.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ N(
          "span",
          {
            onClick: () => u(s),
            style: { userSelect: "none" },
            children: [
              jn(s),
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
      const n = (s == null ? void 0 : s.id) ?? c, l = `${e.link.endsWith("/") ? e.link.slice(0, -1) : e.link}/${n}`;
      return /* @__PURE__ */ N("tr", { children: [
        /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(k, { icon: e.icon }) }),
        d.map((m) => /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(
          D,
          {
            to: l,
            onClick: () => t == null ? void 0 : t({ type: "navigate", to: l, id: n }),
            className: "text-decoration-none",
            children: /* @__PURE__ */ r("span", { children: s == null ? void 0 : s[m] })
          }
        ) }, `${n}-${m}`))
      ] }, n);
    }) : /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r("td", { colSpan: Math.max(1, d.length) + 1, className: "text-center text-secondary", children: "No rows" }) }) })
  ] });
}
let Pe = 0;
function Bn() {
  return Pe += 1, `tableaction${Pe}`;
}
function Dn(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
function Fn(e) {
  if (!Array.isArray(e) || e.length === 0) return [];
  const t = e[0] ?? {};
  return Object.keys(t).filter((a) => a !== "id");
}
class Un {
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
    this.id = t.id ?? Bn(), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = typeof t.link == "string" ? t.link : "";
    const a = new w({ iconClass: "fa-solid fa-user" }), i = new w({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = t.icon instanceof w ? t.icon : new w(t.icon || a), this.sort = t.sort instanceof w ? t.sort : new w(t.sort || i), this.actions = t.actions instanceof R ? t.actions : new R(t.actions || {});
  }
}
function Xn({ tableAction: e, output: t }) {
  if (!e || !(e instanceof Un))
    throw new Error("AlloyTableAction requires `tableAction` (TableActionObject instance).");
  const a = O(e.id), i = S(() => Fn(e.rows), [e.rows]), [o, d] = C({ col: "", dir: "asc" });
  function u(c) {
    const n = o.col === c && o.dir === "asc" ? "desc" : "asc";
    d({ col: c, dir: n }), t == null || t({ type: "column", name: c, dir: n });
  }
  function s(c) {
    return (n, h) => {
      var l;
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
          iconClass: (l = n == null ? void 0 : n.icon) == null ? void 0 : l.iconClass
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
              Dn(c),
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
      const h = (c == null ? void 0 : c.id) ?? n, l = e.actions;
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
        /* @__PURE__ */ r("td", { className: "text-end", children: /* @__PURE__ */ r(te, { buttonBar: l, output: s(c) }) })
      ] }, h);
    }) })
  ] });
}
let Ke = 0, qe = 0;
function In() {
  return Ke += 1, `card${Ke}`;
}
function Tn() {
  return qe += 1, `carditem${qe}`;
}
class H {
  /**
   * @param {{ id?:string, name?:string, className?:string, show?:boolean }=} res
   */
  constructor(t = {}) {
    this.id = t.id ?? Tn(), this.className = t.className ?? "", this.name = t.name ?? "Card Item", this.show = typeof t.show == "boolean" ? t.show : !0;
  }
}
class ie {
  /**
   * @param {{ id?:string, className?:string, body?:CardItem|object, fields?:Array<CardItem|object>, link?:string }=} res
   */
  constructor(t = {}) {
    this.id = t.id ?? In(), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "", this.body = t.body instanceof H ? t.body : new H(t.body || {});
    const a = Array.isArray(t.fields) ? t.fields : [];
    this.fields = a.map((i) => i instanceof H ? i : new H(i));
  }
}
function Qn({ card: e }) {
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
class ct extends ie {
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
function ea({ cardIcon: e }) {
  if (!e || !(e instanceof ct))
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
class Ve {
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
class lt extends ie {
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
    super(t), this.logo = t.logo instanceof Ve ? t.logo : new Ve(t.logo || {}), this.logoClass = t.logoClass ?? "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0", this.textClass = t.textClass ?? "col-8";
  }
}
function ta({ cardImage: e }) {
  if (!e || !(e instanceof lt))
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
class Pn extends ie {
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
        this.action = t.action instanceof R ? t.action : new R(t.action || {});
        break;
      }
    }
  }
}
function na({ cardAction: e, output: t }) {
  var d, u;
  if (!e || !(e instanceof Pn))
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
      id: (d = e.action) == null ? void 0 : d.id,
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
class Kn extends ct {
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
        this.action = t.action instanceof R ? t.action : new R(t.action || {});
        break;
      }
    }
  }
}
function aa({ cardIconAction: e, output: t }) {
  var d, u;
  if (!e || !(e instanceof Kn))
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
      id: (d = e.action) == null ? void 0 : d.id,
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
class qn extends lt {
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
        this.action = t.action instanceof R ? t.action : new R(t.action || {});
        break;
      }
    }
  }
}
function ia({ cardImageAction: e, output: t }) {
  var d, u, s, c, n, h;
  if (!e || !(e instanceof qn))
    throw new Error(
      "AlloyCardImageAction requires `cardImageAction` (CardImageActionObject instance)."
    );
  function a() {
    return (l, m) => {
      var p, f;
      t == null || t({
        type: "action",
        action: {
          id: l == null ? void 0 : l.id,
          name: l == null ? void 0 : l.name,
          // button text OR link text
          title: l == null ? void 0 : l.title,
          // may be used for tooltip
          href: l == null ? void 0 : l.href,
          // link target if it's a link
          className: l == null ? void 0 : l.className,
          iconClass: (p = l == null ? void 0 : l.icon) == null ? void 0 : p.iconClass,
          active: l == null ? void 0 : l.active,
          disabled: !!(l != null && l.disabled),
          ariaLabel: l == null ? void 0 : l.ariaLabel,
          tabIndex: l == null ? void 0 : l.tabIndex
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
            src: (d = e.logo) == null ? void 0 : d.imageUrl,
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
          (l) => l != null && l.show ? /* @__PURE__ */ r(
            "div",
            {
              id: l.id,
              className: l.className,
              children: l.name
            },
            l.id
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
let We = 0;
function Vn() {
  return We += 1, `alloyform${We}`;
}
class ze {
  constructor(t = {}) {
    this.id = t.id ?? Vn(), this.title = t.title ?? "AlloyMobile", this.className = t.className ?? "col m-2", this.message = t.message ?? "", this.action = t.action ?? "", this.type = t.type ?? "AlloyInputTextIcon", this.submit = t.submit instanceof X ? t.submit : new X(
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
      (i) => i instanceof ke ? i : new ke(i)
    ), this.data = t.data ?? {};
  }
}
function Je(e, t, a) {
  let i = !0;
  const o = [];
  if (e.required && (e.type === "checkbox" ? (Array.isArray(t) ? t : []).length === 0 && (i = !1, o.push("This field is required.")) : (t === "" || t === !1 || t === void 0 || t === null) && (i = !1, o.push("This field is required."))), i && typeof e.minLength == "number" && typeof t == "string" && t.length < e.minLength && (i = !1, o.push(`Minimum length is ${e.minLength}`)), i && typeof e.maxLength == "number" && typeof t == "string" && t.length > e.maxLength && (i = !1, o.push(`Maximum length is ${e.maxLength}`)), i && e.pattern && typeof t == "string" && !new RegExp(e.pattern).test(t) && (i = !1, o.push("Invalid format.")), i && e.passwordStrength && typeof t == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(t) || (i = !1, o.push("Password is too weak."))), i && e.matchWith) {
    const d = e.matchWith;
    a[d] !== t && (i = !1, o.push("Values do not match."));
  }
  return {
    valid: i,
    error: !i,
    errors: o
  };
}
function oa({ form: e, output: t }) {
  const a = e instanceof ze ? e : new ze(e || {});
  if (!a || !Array.isArray(a.fields) || !(a.submit instanceof X))
    throw new Error(
      "AlloyForm could not hydrate a valid FormObject (missing fields[] or submit)."
    );
  const [i, o] = C(() => {
    const l = {}, m = {};
    return a.fields.forEach((p) => {
      m[p.name] = p.value;
    }), a.fields.forEach((p) => {
      const f = p.value, { valid: y, error: v, errors: b } = Je(p, f, m);
      l[p.name] = {
        value: f,
        valid: y,
        error: v,
        errors: b
      };
    }), l;
  }), d = O(null), u = ht(
    (l) => {
      const m = {};
      Object.keys(l).forEach((f) => {
        m[f] = l[f].value;
      });
      const p = {};
      return a.fields.forEach((f) => {
        const y = m[f.name], { valid: v, error: b, errors: x } = Je(
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
  function s(l) {
    if (!l || !l.name) return;
    const { name: m, value: p } = l;
    o((f) => {
      const y = { ...f };
      return y[m] = {
        ...f[m],
        value: p
      }, u(y);
    });
  }
  const c = S(() => {
    const l = {};
    return Object.keys(i).forEach((m) => {
      l[m] = i[m].value;
    }), l;
  }, [i]), n = S(() => Object.values(i).some(
    (l) => l.error || !l.valid
  ), [i]);
  function h(l, m) {
    const p = {
      ...c,
      action: a.action
    };
    a.data = p, a.message = "", t == null || t(p);
  }
  return a.submit.disabled = n || !!a.submit.loading, /* @__PURE__ */ r("div", { className: "row", children: /* @__PURE__ */ r("div", { className: a.className, children: /* @__PURE__ */ N("div", { className: "text-center", children: [
    /* @__PURE__ */ r("h3", { children: a.title }),
    a.message !== "" && /* @__PURE__ */ r("div", { className: "alert alert-text-danger m-0 p-0", children: a.message }),
    a.fields.map((l) => /* @__PURE__ */ r(
      St,
      {
        input: l,
        output: s
      },
      l.id
    )),
    /* @__PURE__ */ r(
      Ot,
      {
        ref: d,
        buttonSubmit: a.submit,
        output: h
      }
    )
  ] }) }) });
}
export {
  xt as AlloyButton,
  te as AlloyButtonBar,
  Lt as AlloyButtonIcon,
  Ot as AlloyButtonSubmit,
  Qn as AlloyCard,
  na as AlloyCardAction,
  ea as AlloyCardIcon,
  aa as AlloyCardIconAction,
  ta as AlloyCardImage,
  ia as AlloyCardImageAction,
  oa as AlloyForm,
  k as AlloyIcon,
  St as AlloyInput,
  ft as AlloyLink,
  ee as AlloyLinkBar,
  pt as AlloyLinkIcon,
  Ge as AlloyLinkLogo,
  Gn as AlloyNavBar,
  Yn as AlloyTable,
  Xn as AlloyTableAction,
  Zn as AlloyTableLink,
  R as ButtonBarObject,
  U as ButtonIconObject,
  F as ButtonObject,
  X as ButtonSubmitObject,
  Pn as CardActionObject,
  Kn as CardIconActionObject,
  ct as CardIconObject,
  qn as CardImageActionObject,
  lt as CardImageObject,
  ie as CardObject,
  ze as FormObject,
  w as IconObject,
  ke as InputObject,
  j as LinkBarObject,
  B as LinkIconObject,
  M as LinkLogoObject,
  _ as LinkObject,
  Ut as NavBarObject,
  Un as TableActionObject,
  $n as TableLinkObject,
  Pt as TableObject
};
//# sourceMappingURL=alloy-react.es.js.map
