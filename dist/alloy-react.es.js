import { jsx as c, jsxs as g, Fragment as T } from "react/jsx-runtime";
import * as y from "react";
import { useRef as k, useState as x, useMemo as S, forwardRef as le, useImperativeHandle as de, useEffect as J } from "react";
import "react-dom";
let pe = 0;
function Qe() {
  return pe += 1, `alloyIcon${pe}`;
}
class N {
  /**
   * @param {{ id?: string, iconClass: string }} params
   */
  constructor({ id: n, iconClass: a }) {
    if (!a) throw new Error("Icon requires iconClass");
    this.id = n ?? Qe(), this.iconClass = a;
  }
}
function I({ icon: e }) {
  if (!e) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ c("i", { id: e.id, className: e.iconClass, "aria-hidden": "true" });
}
let ge = 0;
function et() {
  return ge += 1, `alloyLink${ge}`;
}
function tt(e = "", n = "") {
  const [a, s] = x(!1), [r, i] = x(!1), [l, d] = x(!1);
  return {
    className: S(() => [e, (a || r || l) && n].filter(Boolean).join(" "), [e, n, a, r, l]),
    events: {
      onMouseEnter: () => s(!0),
      onMouseLeave: () => {
        s(!1), i(!1);
      },
      onMouseDown: () => i(!0),
      onMouseUp: () => i(!1),
      onFocus: () => d(!0),
      onBlur: () => d(!1)
    }
  };
}
class _ {
  /**
   * @param {{ id?: string, name?: string, link: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e: any)=>void, title?: string }} p
   */
  constructor({
    id: n,
    name: a,
    href: s,
    className: r,
    active: i,
    target: l,
    rel: d,
    onClick: o,
    title: t
  }) {
    if (!s) throw new Error("LinkObject requires `href`.");
    this.id = n ?? et(), this.name = a, this.href = s, this.className = r ?? "", this.active = i ?? "", this.target = l, this.rel = d, this.onClick = o, this.title = t;
  }
}
function nt({ link: e }) {
  if (!e || !(e instanceof _))
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  if (!e.name) throw new Error("AlloyLink requires `link.name`.");
  const n = k(e.id), { className: a, events: s } = tt(e.className, e.active), r = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel;
  return /* @__PURE__ */ c(
    "a",
    {
      id: n.current,
      href: e.href,
      className: a,
      target: e.target,
      rel: r,
      onClick: e.onClick,
      title: e.title,
      ...s,
      children: /* @__PURE__ */ c("span", { children: e.name })
    }
  );
}
let Ne = 0;
function at() {
  return Ne += 1, `alloyLinkIcon${Ne}`;
}
function rt(e = "", n = "") {
  const [a, s] = x(!1), [r, i] = x(!1), [l, d] = x(!1);
  return {
    className: S(
      () => [e, (a || r || l) && n].filter(Boolean).join(" "),
      [e, n, a, r, l]
    ),
    events: {
      onMouseEnter: () => s(!0),
      onMouseLeave: () => {
        s(!1), i(!1);
      },
      onMouseDown: () => i(!0),
      onMouseUp: () => i(!1),
      onFocus: () => d(!0),
      onBlur: () => d(!1)
    }
  };
}
class R {
  /**
   * @param {{ id?: string, link: string, icon: Icon, name?: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e:any)=>void, title?: string }} p
   */
  constructor({
    id: n,
    href: a,
    icon: s,
    name: r,
    className: i,
    active: l,
    target: d,
    rel: o,
    onClick: t,
    title: u
  }) {
    if (!a) throw new Error("LinkIconObject requires `href`.");
    if (!s || !(s instanceof N))
      throw new Error("LinkIconObject requires `icon` (Icon instance).");
    this.id = n ?? at(), this.href = a, this.icon = s instanceof N ? s : new N(s), this.name = r, this.className = i ?? "", this.active = l ?? "", this.target = d, this.rel = o, this.onClick = t, this.title = u;
  }
}
function st({ linkIcon: e }) {
  if (!e || !(e instanceof R))
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  const n = k(e.id), { className: a, events: s } = rt(e.className, e.active), r = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, i = !!e.name;
  return /* @__PURE__ */ c(
    "a",
    {
      id: n.current,
      href: e.href,
      className: a,
      target: e.target,
      rel: r,
      onClick: e.onClick,
      title: e.title,
      ...s,
      children: /* @__PURE__ */ g("span", { children: [
        /* @__PURE__ */ c(I, { icon: e.icon }),
        i && /* @__PURE__ */ c("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
let we = 0;
function ot() {
  return we += 1, `alloyLinkLogo${we}`;
}
function it(e = "", n = "") {
  const [a, s] = x(!1), [r, i] = x(!1), [l, d] = x(!1);
  return {
    className: S(
      () => [e, (a || r || l) && n].filter(Boolean).join(" "),
      [e, n, a, r, l]
    ),
    events: {
      onMouseEnter: () => s(!0),
      onMouseLeave: () => {
        s(!1), i(!1);
      },
      onMouseDown: () => i(!0),
      onMouseUp: () => i(!1),
      onFocus: () => d(!0),
      onBlur: () => d(!1)
    }
  };
}
class M {
  /**
   * @param {{ id?: string, name?: string, link: string, logo: string, width?: number|string, height?: number|string, logoAlt?: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e:any)=>void, title?: string }} p
   */
  constructor({
    id: n,
    name: a,
    href: s,
    logo: r,
    width: i,
    height: l,
    logoAlt: d = "",
    className: o,
    active: t,
    target: u,
    rel: h,
    onClick: f,
    title: w
  }) {
    if (!s) throw new Error("LinkLogoObject requires `href`.");
    if (!r) throw new Error("LinkLogoObject requires `logo`.");
    this.id = n ?? ot(), this.name = a, this.href = s, this.logo = r, this.width = i, this.height = l, this.logoAlt = d, this.className = o ?? "", this.active = t ?? "", this.target = u, this.rel = h, this.onClick = f, this.title = w;
  }
}
function Fe({ linkLogo: e }) {
  if (!e || !(e instanceof M))
    throw new Error("AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance).");
  const n = k(e.id), { className: a, events: s } = it(e.className, e.active), r = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, i = !!e.name;
  return /* @__PURE__ */ c(
    "a",
    {
      id: n.current,
      href: e.href,
      className: a,
      target: e.target,
      rel: r,
      onClick: e.onClick,
      title: e.title,
      ...s,
      children: /* @__PURE__ */ g("span", { children: [
        /* @__PURE__ */ c(
          "img",
          {
            src: e.logo,
            alt: e.logoAlt || e.name,
            width: e.width,
            height: e.height,
            style: { display: "inline-block" }
          }
        ),
        i && /* @__PURE__ */ c("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
let xe = 0;
function ct() {
  return xe += 1, `alloyBtn${xe}`;
}
function lt(e = "", n = "") {
  const [a, s] = x(!1), [r, i] = x(!1), [l, d] = x(!1);
  return {
    className: S(() => [e, (a || r || l) && n].filter(Boolean).join(" "), [e, n, a, r, l]),
    events: {
      onMouseEnter: () => s(!0),
      onMouseLeave: () => {
        s(!1), i(!1);
      },
      onMouseDown: () => i(!0),
      onMouseUp: () => i(!1),
      onFocus: () => d(!0),
      onBlur: () => d(!1)
    }
  };
}
class $ {
  constructor(n) {
    if (!n || !n.name) throw new Error("ButtonObject requires `name`.");
    this.id = n.id ?? ct(), this.name = n.name, this.className = n.className ?? "", this.active = n.active ?? "", this.disabled = !!n.disabled, this.title = n.title, this.ariaLabel = n.ariaLabel, this.tabIndex = n.tabIndex, this.onClick = n.onClick, this.onKeyDown = n.onKeyDown, this.onKeyUp = n.onKeyUp, this.onFocus = n.onFocus, this.onBlur = n.onBlur, this.onMouseEnter = n.onMouseEnter, this.onMouseLeave = n.onMouseLeave;
  }
}
const dt = le(function({ button: n, output: a }, s) {
  if (!n || !(n instanceof $))
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  const r = k(null), i = k(n.id), l = n.disabled, { className: d, events: o } = lt(n.className, n.active);
  de(
    s,
    () => ({
      el: r.current,
      model: n,
      focus: () => {
        var h;
        return (h = r.current) == null ? void 0 : h.focus();
      },
      click: () => {
        var h;
        return (h = r.current) == null ? void 0 : h.click();
      }
    }),
    [n]
  );
  const t = (h, f) => (w) => {
    f == null || f(w), a == null || a(n, w), h == null || h(w, n);
  }, u = {
    onClick: t(n.onClick),
    onKeyDown: t(n.onKeyDown, o.onFocus),
    onKeyUp: t(n.onKeyUp),
    onFocus: t(n.onFocus, o.onFocus),
    onBlur: t(n.onBlur, o.onBlur),
    onMouseEnter: t(n.onMouseEnter, o.onMouseEnter),
    onMouseLeave: t(n.onMouseLeave, o.onMouseLeave),
    onMouseDown: t(void 0, o.onMouseDown),
    onMouseUp: t(void 0, o.onMouseUp)
  };
  return /* @__PURE__ */ c(
    "button",
    {
      id: i.current,
      ref: r,
      type: "button",
      className: d,
      title: n.title,
      "aria-label": n.ariaLabel || n.name,
      "aria-disabled": l || void 0,
      disabled: l,
      tabIndex: n.tabIndex,
      ...u,
      children: /* @__PURE__ */ c("span", { className: "px-2 align-middle", children: n.name })
    }
  );
});
let Ce = 0;
function ut() {
  return Ce += 1, `alloyBtnicon${Ce}`;
}
function ht(e = "", n = "") {
  const [a, s] = x(!1), [r, i] = x(!1), [l, d] = x(!1);
  return {
    className: S(() => [e, (a || r || l) && n].filter(Boolean).join(" "), [e, n, a, r, l]),
    events: {
      onMouseEnter: () => s(!0),
      onMouseLeave: () => {
        s(!1), i(!1);
      },
      onMouseDown: () => i(!0),
      onMouseUp: () => i(!1),
      onFocus: () => d(!0),
      onBlur: () => d(!1)
    }
  };
}
class b {
  constructor(n) {
    if (!n || !n.icon) throw new Error("ButtonIconObject requires `icon` (IconObject).");
    this.id = n.id ?? ut(), this.name = n.name, this.icon = n.icon instanceof N ? n.icon : new N(n.icon), this.className = n.className ?? "", this.active = n.active ?? "", this.disabled = !!n.disabled, this.title = n.title, this.ariaLabel = n.ariaLabel, this.tabIndex = n.tabIndex, this.onClick = n.onClick, this.onKeyDown = n.onKeyDown, this.onKeyUp = n.onKeyUp, this.onFocus = n.onFocus, this.onBlur = n.onBlur, this.onMouseEnter = n.onMouseEnter, this.onMouseLeave = n.onMouseLeave;
  }
}
const ft = le(function({ buttonIcon: n, output: a }, s) {
  if (!n || !(n instanceof b))
    throw new Error("AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance).");
  const r = k(null), i = k(n.id), l = n.disabled, { className: d, events: o } = ht(n.className, n.active);
  de(
    s,
    () => ({
      el: r.current,
      model: n,
      focus: () => {
        var f;
        return (f = r.current) == null ? void 0 : f.focus();
      },
      click: () => {
        var f;
        return (f = r.current) == null ? void 0 : f.click();
      }
    }),
    [n]
  );
  const t = (f, w) => (v) => {
    w == null || w(v), a == null || a(n, v), f == null || f(v, n);
  }, u = {
    onClick: t(n.onClick),
    onKeyDown: t(n.onKeyDown, o.onFocus),
    onKeyUp: t(n.onKeyUp),
    onFocus: t(n.onFocus, o.onFocus),
    onBlur: t(n.onBlur, o.onBlur),
    onMouseEnter: t(n.onMouseEnter, o.onMouseEnter),
    onMouseLeave: t(n.onMouseLeave, o.onMouseLeave),
    onMouseDown: t(void 0, o.onMouseDown),
    onMouseUp: t(void 0, o.onMouseUp)
  }, h = n.ariaLabel || n.name || "icon button";
  return /* @__PURE__ */ g(
    "button",
    {
      id: i.current,
      ref: r,
      type: "button",
      className: d,
      title: n.title,
      "aria-label": h,
      "aria-disabled": l || void 0,
      disabled: l,
      tabIndex: n.tabIndex,
      ...u,
      children: [
        /* @__PURE__ */ c("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ c(I, { icon: n.icon }) }),
        n.name ? /* @__PURE__ */ c("span", { className: "px-2 align-middle", children: n.name }) : null
      ]
    }
  );
});
let Le = 0;
function mt() {
  return Le += 1, `alloyBtnsubmit${Le}`;
}
class vt {
  constructor(n) {
    if (!n || !n.name) throw new Error("ButtonSubmitObject requires `name`.");
    if (!n.icon) throw new Error("ButtonSubmitObject requires `icon`.");
    this.id = n.id ?? mt(), this.name = n.name, this.icon = n.icon instanceof N ? n.icon : new N(n.icon), this.className = n.className ?? "", this.disabled = !!n.disabled, this.loading = !!n.loading, this.title = n.title, this.ariaLabel = n.ariaLabel, this.tabIndex = n.tabIndex, this.onClick = n.onClick, this.onMouseDown = n.onMouseDown, this.onKeyDown = n.onKeyDown;
  }
}
const _n = le(function({ buttonSubmit: n, output: a }, s) {
  if (!n || !(n instanceof vt))
    throw new Error("AlloyButtonSubmit requires `buttonSubmit` (ButtonSubmitObject instance).");
  const r = k(null), i = k(n.id), [l, d] = x(!!n.loading);
  J(() => {
    d(!!n.loading);
  }, [n.loading]);
  const o = n.disabled || l;
  de(
    s,
    () => ({
      el: r.current,
      model: n,
      focus: () => {
        var m;
        return (m = r.current) == null ? void 0 : m.focus();
      },
      click: () => {
        var m;
        return (m = r.current) == null ? void 0 : m.click();
      }
    }),
    [n]
  );
  const t = k(!1);
  J(() => {
    l || (t.current = !1);
  }, [l]);
  const u = () => t.current || o ? !1 : (t.current = !0, n.loading = !0, n.disabled = !0, d(!0), !0), h = (m, O) => {
    a == null || a(n, m), O == null || O(m, n);
  }, f = (m) => {
    u() && h(m, n.onClick);
  }, w = (m) => {
    u() && h(m, n.onMouseDown);
  }, v = (m) => {
    const O = m.key;
    (O === "Enter" || O === " ") && u() && h(m, n.onKeyDown);
  }, p = l;
  return /* @__PURE__ */ g(
    "button",
    {
      id: i.current,
      ref: r,
      type: "submit",
      className: n.className,
      title: n.title,
      "aria-label": n.ariaLabel || n.name,
      "aria-busy": l || void 0,
      "aria-disabled": o || void 0,
      disabled: o,
      tabIndex: n.tabIndex,
      onClick: f,
      onMouseDown: w,
      onKeyDown: v,
      children: [
        p && /* @__PURE__ */ c("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ c(I, { icon: n.icon }) }),
        /* @__PURE__ */ c("span", { className: p ? "px-2 align-middle" : "align-middle", children: n.name }),
        l ? /* @__PURE__ */ c("span", { className: "ms-2 visually-hidden", "aria-live": "polite", children: "Loading…" }) : null
      ]
    }
  );
});
let Ee = 0;
function yt() {
  return Ee += 1, `alloyinput${Ee}`;
}
class Rn {
  constructor(n) {
    const {
      id: a,
      name: s,
      type: r = "text",
      label: i = "",
      value: l = r === "checkbox" ? [] : "",
      layout: d = "text",
      icon: o,
      placeholder: t = "",
      required: u = !1,
      minLength: h,
      maxLength: f,
      min: w,
      max: v,
      pattern: p,
      matchWith: m,
      passwordStrength: O,
      options: C = [],
      validators: A = [],
      ...E
    } = n || {};
    if (!s) throw new Error("InputObject requires a 'name' field");
    if (["icon", "floating"].includes(d) && !o)
      throw new Error("Icon is required for icon and floating layouts");
    this.id = a ?? yt(), this.name = s, this.type = r, this.label = i, this.value = l, this.layout = d, this.icon = o instanceof N ? o : o ? new N(o) : void 0, this.placeholder = t, this.required = u, this.minLength = h, this.maxLength = f, this.min = w, this.max = v, this.pattern = p, this.matchWith = m, this.passwordStrength = O, this.options = C, this.validators = A, Object.assign(this, E);
  }
}
function Sn({ input: e, output: n }) {
  const [a, s] = x(e.value), [r, i] = x(!1), l = (v) => {
    const p = [], m = typeof v == "string" ? v.trim() : v;
    return e.required && (Array.isArray(m) && m.length === 0 || !Array.isArray(m) && (m === "" || m === !1)) && p.push("This field is required."), e.minLength && typeof m == "string" && m.length < e.minLength && p.push(`Minimum length is ${e.minLength}`), e.maxLength && typeof m == "string" && m.length > e.maxLength && p.push(`Maximum length is ${e.maxLength}`), e.pattern && typeof m == "string" && !new RegExp(e.pattern).test(m) && p.push("Invalid format."), e.passwordStrength && typeof m == "string" && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(m) && p.push("Password is too weak."), p;
  }, d = (v) => {
    const p = l(v);
    n == null || n({
      id: e.id,
      name: e.name,
      value: v,
      valid: p.length === 0,
      error: p.length > 0,
      errors: p
    });
  }, o = () => i(!0), t = r && l(a).length > 0, u = t && /* @__PURE__ */ c("div", { className: "mt-2", "aria-live": "polite", children: l(a).map((v, p) => /* @__PURE__ */ c("div", { className: "alert alert-danger py-2 mb-2", role: "alert", children: v }, p)) }), h = {
    name: e.name,
    placeholder: e.placeholder,
    onBlur: o,
    "aria-invalid": t || void 0
  }, f = (v) => {
    const p = v.target.value;
    if (e.type === "checkbox") {
      const m = Array.isArray(a) ? [...a] : [], O = m.indexOf(p);
      O > -1 ? m.splice(O, 1) : m.push(p), s(m), d(m);
    } else
      s(p), d(p);
  }, w = () => e.type === "textarea" ? /* @__PURE__ */ c("textarea", { ...h, value: a, className: `form-control${t ? " is-invalid" : ""}` }) : e.type === "select" ? /* @__PURE__ */ c("select", { ...h, value: a, className: `form-select${t ? " is-invalid" : ""}`, onChange: f, children: e.options.map((v) => /* @__PURE__ */ c("option", { value: v.value, children: v.label }, v.value)) }) : e.type === "radio" ? /* @__PURE__ */ g("div", { children: [
    /* @__PURE__ */ c("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((v, p) => /* @__PURE__ */ g("div", { className: "form-check", children: [
      /* @__PURE__ */ c(
        "input",
        {
          type: "radio",
          id: `${e.id}_${p}`,
          className: `form-check-input${t ? " is-invalid" : ""}`,
          name: e.name,
          value: v.value,
          checked: a === v.value,
          onChange: (m) => {
            s(m.target.value), d(m.target.value);
          }
        }
      ),
      /* @__PURE__ */ c("label", { className: "form-check-label", htmlFor: `${e.id}_${p}`, children: v.label })
    ] }, p))
  ] }) : e.type === "checkbox" ? /* @__PURE__ */ g("div", { children: [
    /* @__PURE__ */ c("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((v, p) => /* @__PURE__ */ g("div", { className: "form-check", children: [
      /* @__PURE__ */ c(
        "input",
        {
          type: "checkbox",
          id: `${e.id}_${p}`,
          className: `form-check-input${t ? " is-invalid" : ""}`,
          name: e.name,
          value: v.value,
          checked: Array.isArray(a) && a.includes(v.value),
          onChange: f
        }
      ),
      /* @__PURE__ */ c("label", { className: "form-check-label", htmlFor: `${e.id}_${p}`, children: v.label })
    ] }, p))
  ] }) : /* @__PURE__ */ c("input", { ...h, type: e.type, value: a, onChange: f, className: `form-control${t ? " is-invalid" : ""}` });
  return e.layout === "floating" ? /* @__PURE__ */ g("div", { className: "mb-3", children: [
    /* @__PURE__ */ g("div", { className: "form-floating", children: [
      w(),
      /* @__PURE__ */ g("label", { htmlFor: e.id, children: [
        e.icon && /* @__PURE__ */ c(I, { icon: e.icon }),
        " ",
        e.label
      ] })
    ] }),
    u
  ] }) : e.layout === "icon" ? /* @__PURE__ */ g("div", { className: "mb-3", children: [
    /* @__PURE__ */ c("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    /* @__PURE__ */ g("div", { className: "input-group", children: [
      /* @__PURE__ */ c("span", { className: "input-group-text", children: /* @__PURE__ */ c(I, { icon: e.icon }) }),
      w()
    ] }),
    u
  ] }) : /* @__PURE__ */ g("div", { className: "mb-3", children: [
    ["text", "textarea", "number", "email", "password", "date"].includes(e.type) && /* @__PURE__ */ c("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    w(),
    u
  ] });
}
let Ae = 0;
function pt() {
  return Ae += 1, `barItem${Ae}`;
}
let Oe = 0;
function gt() {
  return Oe += 1, `linkBar${Oe}`;
}
let ke = class {
  /**
   * @param {{ id?: string, name?: string, className?: string, show?: boolean }} p
   */
  constructor({ id: n, name: a, className: s, show: r } = {}) {
    this.id = n ?? pt(), this.name = a ?? "Bar Item", this.className = s ?? "", this.show = typeof r == "boolean" ? r : !1;
  }
};
class re {
  constructor({ id: n, className: a, barName: s, type: r, linkClass: i, links: l, selected: d } = {}) {
    this.id = n ?? gt(), this.className = a ?? "d-flex justify-content-center", this.barName = s instanceof ke ? s : new ke(s ?? {}), this.type = r ?? "AlloyLink", this.linkClass = i ?? "nav-item", this.selected = d ?? "active";
    const o = Array.isArray(l) ? l : [];
    switch (this.type) {
      case "AlloyLinkIcon":
        this.links = o.map(
          (t) => t instanceof R ? t : new R({
            id: t == null ? void 0 : t.id,
            href: t == null ? void 0 : t.href,
            icon: t == null ? void 0 : t.icon,
            // LinkIconObject ctor will wrap plain icon into IconObject
            name: t == null ? void 0 : t.name,
            className: t == null ? void 0 : t.className,
            active: t == null ? void 0 : t.active,
            target: t == null ? void 0 : t.target,
            rel: t == null ? void 0 : t.rel,
            onClick: t == null ? void 0 : t.onClick,
            title: t == null ? void 0 : t.title
          })
        );
        break;
      case "AlloyLinkLogo":
        this.links = o.map(
          (t) => t instanceof M ? t : new M({
            id: t == null ? void 0 : t.id,
            name: t == null ? void 0 : t.name,
            href: t == null ? void 0 : t.href,
            logo: t == null ? void 0 : t.logo,
            width: t == null ? void 0 : t.width,
            height: t == null ? void 0 : t.height,
            logoAlt: t == null ? void 0 : t.logoAlt,
            className: t == null ? void 0 : t.className,
            active: t == null ? void 0 : t.active,
            target: t == null ? void 0 : t.target,
            rel: t == null ? void 0 : t.rel,
            onClick: t == null ? void 0 : t.onClick,
            title: t == null ? void 0 : t.title
          })
        );
        break;
      case "AlloyLink":
      default:
        this.links = o.map(
          (t) => t instanceof _ ? t : new _({
            id: t == null ? void 0 : t.id,
            name: t == null ? void 0 : t.name,
            href: t == null ? void 0 : t.href,
            className: t == null ? void 0 : t.className,
            active: t == null ? void 0 : t.active,
            target: t == null ? void 0 : t.target,
            rel: t == null ? void 0 : t.rel,
            onClick: t == null ? void 0 : t.onClick,
            title: t == null ? void 0 : t.title
          })
        );
        break;
    }
  }
}
function te(e, n, a, s) {
  const r = a ? n : "";
  return e instanceof _ ? new _({
    id: e.id,
    name: e.name,
    href: e.href,
    className: e.className,
    active: r,
    target: e.target,
    rel: e.rel,
    onClick: s,
    title: e.title
  }) : e instanceof R ? new R({
    id: e.id,
    href: e.href,
    icon: e.icon,
    name: e.name,
    className: e.className,
    active: r,
    target: e.target,
    rel: e.rel,
    onClick: s,
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
    active: r,
    target: e.target,
    rel: e.rel,
    onClick: s,
    title: e.title
  }) : e;
}
function Nt({ linkBar: e }) {
  if (!e || !(e instanceof re))
    throw new Error("AlloyLinkBar requires `linkBar` (LinkBarObject instance).");
  const n = k(e.id), [a, s] = x("");
  J(() => {
    s("");
  }, [e]);
  const r = () => {
    var t;
    return (t = e.barName) != null && t.show ? /* @__PURE__ */ c("div", { id: e.barName.id, className: e.barName.className, children: e.barName.name }) : null;
  };
  function i(t) {
    const u = t.onClick;
    return (h) => {
      const f = t.id || `${t.href || ""}-${t.name || ""}`;
      s(f), u == null || u(h);
    };
  }
  const l = () => /* @__PURE__ */ g(T, { children: [
    /* @__PURE__ */ c(r, {}),
    /* @__PURE__ */ c("ul", { id: n.current, className: e.className, children: e.links.map((t, u) => {
      if (!(t instanceof _))
        throw new Error(
          "AlloyLinkBar (type='AlloyLink') requires each `links` item to be a LinkObject instance."
        );
      const h = ((t == null ? void 0 : t.id) ?? "") === a, f = te(
        t,
        e.selected,
        h,
        i(t)
      );
      return /* @__PURE__ */ c("li", { className: e.linkClass, children: /* @__PURE__ */ c(nt, { link: f }) }, ((t == null ? void 0 : t.id) ?? u) + "-li");
    }) })
  ] }), d = () => /* @__PURE__ */ g(T, { children: [
    /* @__PURE__ */ c(r, {}),
    /* @__PURE__ */ c("ul", { id: n.current, className: e.className, children: e.links.map((t, u) => {
      if (!(t instanceof R))
        throw new Error(
          "AlloyLinkBar (type='AlloyLinkIcon') requires each `links` item to be a LinkIconObject instance."
        );
      const h = ((t == null ? void 0 : t.id) ?? "") === a, f = te(
        t,
        e.selected,
        h,
        i(t)
      );
      return /* @__PURE__ */ c("li", { className: e.linkClass, children: /* @__PURE__ */ c(st, { linkIcon: f }) }, ((t == null ? void 0 : t.id) ?? u) + "-li");
    }) })
  ] }), o = () => /* @__PURE__ */ g(T, { children: [
    /* @__PURE__ */ c(r, {}),
    /* @__PURE__ */ c("ul", { id: n.current, className: e.className, children: e.links.map((t, u) => {
      if (!(t instanceof M))
        throw new Error(
          "AlloyLinkBar (type='AlloyLinkLogo') requires each `links` item to be a LinkLogoObject instance."
        );
      const h = ((t == null ? void 0 : t.id) ?? "") === a, f = te(
        t,
        e.selected,
        h,
        i(t)
      );
      return /* @__PURE__ */ c("li", { className: e.linkClass, children: /* @__PURE__ */ c(Fe, { linkLogo: f }) }, ((t == null ? void 0 : t.id) ?? u) + "-li");
    }) })
  ] });
  switch (e.type) {
    case "AlloyLink":
      return /* @__PURE__ */ c("nav", { "data-type": "AlloyLink", children: l() });
    case "AlloyLinkIcon":
      return /* @__PURE__ */ c("nav", { "data-type": "AlloyLinkIcon", children: d() });
    case "AlloyLinkLogo":
      return /* @__PURE__ */ c("nav", { "data-type": "AlloyLinkLogo", children: o() });
    default:
      return /* @__PURE__ */ c("nav", { "data-type": "AlloyLink", children: l() });
  }
}
let wt = 0;
function xt() {
  return `barItem${++wt}`;
}
let Ct = 0;
function Lt() {
  return `buttonBar${++Ct}`;
}
class Ie {
  constructor({ id: n, name: a, className: s, show: r } = {}) {
    this.id = n ?? xt(), this.name = a ?? "Bar", this.className = s ?? "", this.show = typeof r == "boolean" ? r : !1;
  }
}
class se {
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
  constructor({ id: n, className: a, barName: s, type: r, buttonClass: i, buttons: l, selected: d } = {}) {
    this.id = n ?? Lt(), this.className = a ?? "d-flex justify-content-center", this.barName = s instanceof Ie ? s : new Ie(s ?? {}), this.type = r ?? "AlloyButton", this.buttonClass = i ?? "nav-item", this.selected = d ?? "active";
    const o = Array.isArray(l) ? l : [];
    this.type === "AlloyButtonIcon" ? this.buttons = o.map(
      (t) => t instanceof b ? t : new b({
        id: t == null ? void 0 : t.id,
        name: t == null ? void 0 : t.name,
        icon: t == null ? void 0 : t.icon,
        // ButtonIconObject will wrap plain {iconClass} into IconObject
        className: t == null ? void 0 : t.className,
        active: t == null ? void 0 : t.active,
        disabled: t == null ? void 0 : t.disabled,
        title: t == null ? void 0 : t.title,
        ariaLabel: t == null ? void 0 : t.ariaLabel,
        tabIndex: t == null ? void 0 : t.tabIndex,
        onClick: t == null ? void 0 : t.onClick,
        onKeyDown: t == null ? void 0 : t.onKeyDown,
        onKeyUp: t == null ? void 0 : t.onKeyUp,
        onFocus: t == null ? void 0 : t.onFocus,
        onBlur: t == null ? void 0 : t.onBlur,
        onMouseEnter: t == null ? void 0 : t.onMouseEnter,
        onMouseLeave: t == null ? void 0 : t.onMouseLeave
      })
    ) : this.buttons = o.map(
      (t) => t instanceof $ ? t : new $({
        id: t == null ? void 0 : t.id,
        name: t == null ? void 0 : t.name,
        className: t == null ? void 0 : t.className,
        active: t == null ? void 0 : t.active,
        disabled: t == null ? void 0 : t.disabled,
        title: t == null ? void 0 : t.title,
        ariaLabel: t == null ? void 0 : t.ariaLabel,
        tabIndex: t == null ? void 0 : t.tabIndex,
        onClick: t == null ? void 0 : t.onClick,
        onKeyDown: t == null ? void 0 : t.onKeyDown,
        onKeyUp: t == null ? void 0 : t.onKeyUp,
        onFocus: t == null ? void 0 : t.onFocus,
        onBlur: t == null ? void 0 : t.onBlur,
        onMouseEnter: t == null ? void 0 : t.onMouseEnter,
        onMouseLeave: t == null ? void 0 : t.onMouseLeave
      })
    );
  }
}
function Me(e, n, a) {
  const s = a ? n : "";
  return e instanceof $ ? new $({
    id: e.id,
    name: e.name,
    className: e.className,
    active: s,
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
  }) : e instanceof b ? new b({
    id: e.id,
    name: e.name,
    icon: e.icon,
    // keep IconObject instance
    className: e.className,
    active: s,
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
function Et({ buttonBar: e, output: n }) {
  if (!e || !(e instanceof se))
    throw new Error("AlloyButtonBar requires `buttonBar` (ButtonBarObject instance).");
  const a = k(e.id), [s, r] = x("");
  J(() => {
    r("");
  }, [e]);
  const i = () => {
    var t;
    return (t = e.barName) != null && t.show ? /* @__PURE__ */ c("div", { id: e.barName.id, className: e.barName.className, children: e.barName.name }) : null;
  }, l = (t, u) => {
    if ((u == null ? void 0 : u.type) === "click") {
      const h = (t == null ? void 0 : t.id) ?? "";
      r(h);
    }
    n == null || n(t, u);
  }, d = () => /* @__PURE__ */ g(T, { children: [
    /* @__PURE__ */ c(i, {}),
    /* @__PURE__ */ c("ul", { id: a.current, className: e.className, children: e.buttons.map((t, u) => {
      if (!(t instanceof $))
        throw new Error("AlloyButtonBar (type='AlloyButton') requires ButtonObject items.");
      const h = ((t == null ? void 0 : t.id) ?? "") === s, f = Me(t, e.selected, h);
      return /* @__PURE__ */ c("li", { className: e.buttonClass, children: /* @__PURE__ */ c(dt, { button: f, output: l }) }, ((t == null ? void 0 : t.id) ?? u) + "-li");
    }) })
  ] }), o = () => /* @__PURE__ */ g(T, { children: [
    /* @__PURE__ */ c(i, {}),
    /* @__PURE__ */ c("ul", { id: a.current, className: e.className, children: e.buttons.map((t, u) => {
      if (!(t instanceof b))
        throw new Error("AlloyButtonBar (type='AlloyButtonIcon') requires ButtonIconObject items.");
      const h = ((t == null ? void 0 : t.id) ?? "") === s, f = Me(t, e.selected, h);
      return /* @__PURE__ */ c("li", { className: e.buttonClass, children: /* @__PURE__ */ c(ft, { buttonIcon: f, output: l }) }, ((t == null ? void 0 : t.id) ?? u) + "-li");
    }) })
  ] });
  switch (e.type) {
    case "AlloyButton":
      return /* @__PURE__ */ c("nav", { "data-type": "AlloyButton", children: d() });
    case "AlloyButtonIcon":
      return /* @__PURE__ */ c("nav", { "data-type": "AlloyButtonIcon", children: o() });
    default:
      return /* @__PURE__ */ c("nav", { "data-type": "AlloyButton", children: d() });
  }
}
let De = 0;
function At() {
  return De += 1, `navbar${De}`;
}
function Ot(e, n) {
  if (!Array.isArray(n)) return [];
  switch (e) {
    case "AlloyLinkIcon":
      return n.map(
        (a) => a instanceof R ? a : new R({
          id: a == null ? void 0 : a.id,
          name: a == null ? void 0 : a.name,
          href: a == null ? void 0 : a.href,
          icon: (a == null ? void 0 : a.icon) instanceof N ? a.icon : new N((a == null ? void 0 : a.icon) || {}),
          className: a == null ? void 0 : a.className,
          // no per-item active; bar will inject selected class
          target: a == null ? void 0 : a.target,
          rel: a == null ? void 0 : a.rel,
          onClick: a == null ? void 0 : a.onClick,
          title: a == null ? void 0 : a.title
        })
      );
    case "AlloyLinkLogo":
      return n.map(
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
      return n.map(
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
class kt {
  constructor({ id: n, className: a, logo: s, linkBar: r } = {}) {
    if (this.id = n ?? At(), this.className = a ?? "navbar navbar-expand-lg navbar-light bg-light", this.logo = s instanceof M ? s : new M(
      s || {
        href: "/",
        logo: "/logos/alloy.svg",
        name: "Alloy",
        width: 110,
        height: 28,
        logoAlt: "Alloy",
        className: "navbar-brand d-flex align-items-center gap-2"
      }
    ), r instanceof re)
      this.linkBar = r;
    else {
      const i = (r == null ? void 0 : r.type) ?? "AlloyLink", l = Ot(i, (r == null ? void 0 : r.links) || []);
      this.linkBar = new re({
        id: r == null ? void 0 : r.id,
        className: (r == null ? void 0 : r.className) ?? "navbar-nav ms-auto mb-2 mb-lg-0 gap-2",
        barName: (r == null ? void 0 : r.barName) ?? { show: !1 },
        type: i,
        linkClass: (r == null ? void 0 : r.linkClass) ?? "nav-item",
        links: l,
        selected: (r == null ? void 0 : r.selected) ?? "active"
        // navbar demos want 'active'
      });
    }
  }
}
function bn({ navBar: e }) {
  if (!e || !(e instanceof kt))
    throw new Error("AlloyNavBar requires `navBar` (NavBarObject instance).");
  const n = k(e.id), a = `${n.current}-collapse`;
  return /* @__PURE__ */ c("nav", { id: n.current, className: e.className, children: /* @__PURE__ */ g("div", { className: "container-fluid", children: [
    /* @__PURE__ */ c(Fe, { linkLogo: e.logo }),
    /* @__PURE__ */ c(
      "button",
      {
        className: "navbar-toggler",
        type: "button",
        "data-bs-toggle": "collapse",
        "data-bs-target": `#${a}`,
        "aria-controls": a,
        "aria-expanded": "false",
        "aria-label": "Toggle navigation",
        children: /* @__PURE__ */ c("span", { className: "navbar-toggler-icon" })
      }
    ),
    /* @__PURE__ */ c("div", { className: "position-relative navbar-collapse collapse justify-content-end", id: a, children: /* @__PURE__ */ c(Nt, { linkBar: e.linkBar }) })
  ] }) });
}
function It(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
let _e = 0;
function Mt() {
  return _e += 1, `table${_e}`;
}
class Dt {
  constructor(n = {}) {
    this.id = n.id ?? Mt(), this.className = n.className ?? "table", this.name = n.name ?? "table", this.rows = Array.isArray(n.rows) ? n.rows.slice() : [];
    const a = new N({ iconClass: "fa-solid fa-user" }), s = new N({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = n.icon instanceof N ? n.icon : new N(n.icon || a), this.sort = n.sort instanceof N ? n.sort : new N(n.sort || s);
  }
}
function _t(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((n) => n !== "id");
}
function jn({ table: e, output: n }) {
  if (!e || !(e instanceof Dt))
    throw new Error("AlloyTable requires `table` (TableObject instance).");
  const a = k(e.id), [s, r] = x({ col: "", dir: "asc" }), i = S(() => _t(e.rows), [e.rows]), l = (o) => {
    if (!o) return;
    const t = s.col === o && s.dir === "asc" ? "desc" : "asc";
    r({ col: o, dir: t }), n == null || n({ type: "column", name: o, dir: t });
  }, d = (o) => {
    n == null || n({ type: "row", id: o });
  };
  return /* @__PURE__ */ g("table", { id: a.current, className: e.className, children: [
    /* @__PURE__ */ c("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ c("thead", { children: /* @__PURE__ */ g("tr", { children: [
      /* @__PURE__ */ c("th", { scope: "col", children: "Type" }),
      i.map((o) => {
        const t = s.col === o, u = t && s.dir === "desc";
        return /* @__PURE__ */ c("th", { scope: "col", children: /* @__PURE__ */ g(
          "span",
          {
            onClick: () => l(o),
            style: { userSelect: "none" },
            children: [
              It(o),
              t && /* @__PURE__ */ c(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: u ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: u ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ c(I, { icon: e.sort })
                }
              )
            ]
          }
        ) }, o);
      })
    ] }) }),
    /* @__PURE__ */ c("tbody", { children: (e.rows ?? []).length > 0 ? (e.rows ?? []).map((o, t) => /* @__PURE__ */ g("tr", { onClick: () => d(o == null ? void 0 : o.id), children: [
      /* @__PURE__ */ c("td", { children: /* @__PURE__ */ c(I, { icon: e.icon }) }),
      i.map((u) => /* @__PURE__ */ c("td", { className: "cursor", children: /* @__PURE__ */ c("span", { children: o == null ? void 0 : o[u] }) }, `${(o == null ? void 0 : o.id) ?? t}-${u}`))
    ] }, (o == null ? void 0 : o.id) ?? t)) : /* @__PURE__ */ c("tr", { children: /* @__PURE__ */ c("td", { colSpan: Math.max(1, i.length) + 1, className: "text-center text-secondary", children: "No rows" }) }) })
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
function oe() {
  return oe = Object.assign ? Object.assign.bind() : function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var a = arguments[n];
      for (var s in a)
        Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
    }
    return e;
  }, oe.apply(this, arguments);
}
var Re;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(Re || (Re = {}));
function L(e, n) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(n);
}
function P(e, n) {
  if (!e) {
    typeof console < "u" && console.warn(n);
    try {
      throw new Error(n);
    } catch {
    }
  }
}
function ie(e) {
  let {
    pathname: n = "/",
    search: a = "",
    hash: s = ""
  } = e;
  return a && a !== "?" && (n += a.charAt(0) === "?" ? a : "?" + a), s && s !== "#" && (n += s.charAt(0) === "#" ? s : "#" + s), n;
}
function Te(e) {
  let n = {};
  if (e) {
    let a = e.indexOf("#");
    a >= 0 && (n.hash = e.substr(a), e = e.substr(0, a));
    let s = e.indexOf("?");
    s >= 0 && (n.search = e.substr(s), e = e.substr(0, s)), e && (n.pathname = e);
  }
  return n;
}
var Se;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(Se || (Se = {}));
function $e(e, n) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [a, s] = Rt(e.path, e.caseSensitive, e.end), r = n.match(a);
  if (!r) return null;
  let i = r[0], l = i.replace(/(.)\/+$/, "$1"), d = r.slice(1);
  return {
    params: s.reduce((t, u, h) => {
      let {
        paramName: f,
        isOptional: w
      } = u;
      if (f === "*") {
        let p = d[h] || "";
        l = i.slice(0, i.length - p.length).replace(/(.)\/+$/, "$1");
      }
      const v = d[h];
      return w && !v ? t[f] = void 0 : t[f] = (v || "").replace(/%2F/g, "/"), t;
    }, {}),
    pathname: i,
    pathnameBase: l,
    pattern: e
  };
}
function Rt(e, n, a) {
  n === void 0 && (n = !1), a === void 0 && (a = !0), P(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let s = [], r = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (l, d, o) => (s.push({
    paramName: d,
    isOptional: o != null
  }), o ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (s.push({
    paramName: "*"
  }), r += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : a ? r += "\\/*$" : e !== "" && e !== "/" && (r += "(?:(?=\\/|$))"), [new RegExp(r, n ? void 0 : "i"), s];
}
function j(e, n) {
  if (n === "/") return e;
  if (!e.toLowerCase().startsWith(n.toLowerCase()))
    return null;
  let a = n.endsWith("/") ? n.length - 1 : n.length, s = e.charAt(a);
  return s && s !== "/" ? null : e.slice(a) || "/";
}
function St(e, n) {
  n === void 0 && (n = "/");
  let {
    pathname: a,
    search: s = "",
    hash: r = ""
  } = typeof e == "string" ? Te(e) : e;
  return {
    pathname: a ? a.startsWith("/") ? a : $t(a, n) : n,
    search: jt(s),
    hash: Ut(r)
  };
}
function $t(e, n) {
  let a = n.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((r) => {
    r === ".." ? a.length > 1 && a.pop() : r !== "." && a.push(r);
  }), a.length > 1 ? a.join("/") : "/";
}
function ne(e, n, a, s) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + n + "` field [" + JSON.stringify(s) + "].  Please separate it out to the ") + ("`to." + a + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function bt(e) {
  return e.filter((n, a) => a === 0 || n.route.path && n.route.path.length > 0);
}
function Pe(e, n) {
  let a = bt(e);
  return n ? a.map((s, r) => r === a.length - 1 ? s.pathname : s.pathnameBase) : a.map((s) => s.pathnameBase);
}
function Be(e, n, a, s) {
  s === void 0 && (s = !1);
  let r;
  typeof e == "string" ? r = Te(e) : (r = oe({}, e), L(!r.pathname || !r.pathname.includes("?"), ne("?", "pathname", "search", r)), L(!r.pathname || !r.pathname.includes("#"), ne("#", "pathname", "hash", r)), L(!r.search || !r.search.includes("#"), ne("#", "search", "hash", r)));
  let i = e === "" || r.pathname === "", l = i ? "/" : r.pathname, d;
  if (l == null)
    d = a;
  else {
    let h = n.length - 1;
    if (!s && l.startsWith("..")) {
      let f = l.split("/");
      for (; f[0] === ".."; )
        f.shift(), h -= 1;
      r.pathname = f.join("/");
    }
    d = h >= 0 ? n[h] : "/";
  }
  let o = St(r, d), t = l && l !== "/" && l.endsWith("/"), u = (i || l === ".") && a.endsWith("/");
  return !o.pathname.endsWith("/") && (t || u) && (o.pathname += "/"), o;
}
const ue = (e) => e.join("/").replace(/\/\/+/g, "/"), jt = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Ut = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, Ke = ["post", "put", "patch", "delete"];
new Set(Ke);
const Ft = ["get", ...Ke];
new Set(Ft);
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
function ce() {
  return ce = Object.assign ? Object.assign.bind() : function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var a = arguments[n];
      for (var s in a)
        Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
    }
    return e;
  }, ce.apply(this, arguments);
}
const G = /* @__PURE__ */ y.createContext(null);
process.env.NODE_ENV !== "production" && (G.displayName = "DataRouter");
const qe = /* @__PURE__ */ y.createContext(null);
process.env.NODE_ENV !== "production" && (qe.displayName = "DataRouterState");
const Tt = /* @__PURE__ */ y.createContext(null);
process.env.NODE_ENV !== "production" && (Tt.displayName = "Await");
const D = /* @__PURE__ */ y.createContext(null);
process.env.NODE_ENV !== "production" && (D.displayName = "Navigation");
const he = /* @__PURE__ */ y.createContext(null);
process.env.NODE_ENV !== "production" && (he.displayName = "Location");
const F = /* @__PURE__ */ y.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (F.displayName = "Route");
const Pt = /* @__PURE__ */ y.createContext(null);
process.env.NODE_ENV !== "production" && (Pt.displayName = "RouteError");
function Bt(e, n) {
  let {
    relative: a
  } = n === void 0 ? {} : n;
  fe() || (process.env.NODE_ENV !== "production" ? L(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : L(!1));
  let {
    basename: s,
    navigator: r
  } = y.useContext(D), {
    hash: i,
    pathname: l,
    search: d
  } = K(e, {
    relative: a
  }), o = l;
  return s !== "/" && (o = l === "/" ? s : ue([s, l])), r.createHref({
    pathname: o,
    search: d,
    hash: i
  });
}
function fe() {
  return y.useContext(he) != null;
}
function B() {
  return fe() || (process.env.NODE_ENV !== "production" ? L(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : L(!1)), y.useContext(he).location;
}
const Ve = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function We(e) {
  y.useContext(D).static || y.useLayoutEffect(e);
}
function Kt() {
  let {
    isDataRoute: e
  } = y.useContext(F);
  return e ? Jt() : qt();
}
function qt() {
  fe() || (process.env.NODE_ENV !== "production" ? L(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : L(!1));
  let e = y.useContext(G), {
    basename: n,
    future: a,
    navigator: s
  } = y.useContext(D), {
    matches: r
  } = y.useContext(F), {
    pathname: i
  } = B(), l = JSON.stringify(Pe(r, a.v7_relativeSplatPath)), d = y.useRef(!1);
  return We(() => {
    d.current = !0;
  }), y.useCallback(function(t, u) {
    if (u === void 0 && (u = {}), process.env.NODE_ENV !== "production" && P(d.current, Ve), !d.current) return;
    if (typeof t == "number") {
      s.go(t);
      return;
    }
    let h = Be(t, JSON.parse(l), i, u.relative === "path");
    e == null && n !== "/" && (h.pathname = h.pathname === "/" ? n : ue([n, h.pathname])), (u.replace ? s.replace : s.push)(h, u.state, u);
  }, [n, s, l, i, e]);
}
function K(e, n) {
  let {
    relative: a
  } = n === void 0 ? {} : n, {
    future: s
  } = y.useContext(D), {
    matches: r
  } = y.useContext(F), {
    pathname: i
  } = B(), l = JSON.stringify(Pe(r, s.v7_relativeSplatPath));
  return y.useMemo(() => Be(e, JSON.parse(l), i, a === "path"), [e, l, i, a]);
}
var ze = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(ze || {}), me = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(me || {});
function Je(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Vt(e) {
  let n = y.useContext(G);
  return n || (process.env.NODE_ENV !== "production" ? L(!1, Je(e)) : L(!1)), n;
}
function Wt(e) {
  let n = y.useContext(F);
  return n || (process.env.NODE_ENV !== "production" ? L(!1, Je(e)) : L(!1)), n;
}
function He(e) {
  let n = Wt(e), a = n.matches[n.matches.length - 1];
  return a.route.id || (process.env.NODE_ENV !== "production" ? L(!1, e + ' can only be used on routes that contain a unique "id"') : L(!1)), a.route.id;
}
function zt() {
  return He(me.UseRouteId);
}
function Jt() {
  let {
    router: e
  } = Vt(ze.UseNavigateStable), n = He(me.UseNavigateStable), a = y.useRef(!1);
  return We(() => {
    a.current = !0;
  }), y.useCallback(function(r, i) {
    i === void 0 && (i = {}), process.env.NODE_ENV !== "production" && P(a.current, Ve), a.current && (typeof r == "number" ? e.navigate(r) : e.navigate(r, ce({
      fromRouteId: n
    }, i)));
  }, [e, n]);
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
function U() {
  return U = Object.assign ? Object.assign.bind() : function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var a = arguments[n];
      for (var s in a)
        Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
    }
    return e;
  }, U.apply(this, arguments);
}
function ve(e, n) {
  if (e == null) return {};
  var a = {}, s = Object.keys(e), r, i;
  for (i = 0; i < s.length; i++)
    r = s[i], !(n.indexOf(r) >= 0) && (a[r] = e[r]);
  return a;
}
const W = "get", z = "application/x-www-form-urlencoded";
function Y(e) {
  return e != null && typeof e.tagName == "string";
}
function Ht(e) {
  return Y(e) && e.tagName.toLowerCase() === "button";
}
function Gt(e) {
  return Y(e) && e.tagName.toLowerCase() === "form";
}
function Yt(e) {
  return Y(e) && e.tagName.toLowerCase() === "input";
}
function Xt(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Zt(e, n) {
  return e.button === 0 && // Ignore everything but left clicks
  (!n || n === "_self") && // Let browser handle "target=_blank" etc.
  !Xt(e);
}
let V = null;
function Qt() {
  if (V === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), V = !1;
    } catch {
      V = !0;
    }
  return V;
}
const en = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function ae(e) {
  return e != null && !en.has(e) ? (process.env.NODE_ENV !== "production" && P(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + z + '"')), null) : e;
}
function tn(e, n) {
  let a, s, r, i, l;
  if (Gt(e)) {
    let d = e.getAttribute("action");
    s = d ? j(d, n) : null, a = e.getAttribute("method") || W, r = ae(e.getAttribute("enctype")) || z, i = new FormData(e);
  } else if (Ht(e) || Yt(e) && (e.type === "submit" || e.type === "image")) {
    let d = e.form;
    if (d == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let o = e.getAttribute("formaction") || d.getAttribute("action");
    if (s = o ? j(o, n) : null, a = e.getAttribute("formmethod") || d.getAttribute("method") || W, r = ae(e.getAttribute("formenctype")) || ae(d.getAttribute("enctype")) || z, i = new FormData(d, e), !Qt()) {
      let {
        name: t,
        type: u,
        value: h
      } = e;
      if (u === "image") {
        let f = t ? t + "." : "";
        i.append(f + "x", "0"), i.append(f + "y", "0");
      } else t && i.append(t, h);
    }
  } else {
    if (Y(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    a = W, s = null, r = z, l = e;
  }
  return i && r === "text/plain" && (l = i, i = void 0), {
    action: s,
    method: a.toLowerCase(),
    encType: r,
    formData: i,
    body: l
  };
}
const nn = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], an = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], rn = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], sn = "6";
try {
  window.__reactRouterVersion = sn;
} catch {
}
const Ge = /* @__PURE__ */ y.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (Ge.displayName = "ViewTransition");
const on = /* @__PURE__ */ y.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (on.displayName = "Fetchers");
process.env.NODE_ENV;
const cn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", ln = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, X = /* @__PURE__ */ y.forwardRef(function(n, a) {
  let {
    onClick: s,
    relative: r,
    reloadDocument: i,
    replace: l,
    state: d,
    target: o,
    to: t,
    preventScrollReset: u,
    viewTransition: h
  } = n, f = ve(n, nn), {
    basename: w
  } = y.useContext(D), v, p = !1;
  if (typeof t == "string" && ln.test(t) && (v = t, cn))
    try {
      let A = new URL(window.location.href), E = t.startsWith("//") ? new URL(A.protocol + t) : new URL(t), q = j(E.pathname, w);
      E.origin === A.origin && q != null ? t = q + E.search + E.hash : p = !0;
    } catch {
      process.env.NODE_ENV !== "production" && P(!1, '<Link to="' + t + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let m = Bt(t, {
    relative: r
  }), O = fn(t, {
    replace: l,
    state: d,
    target: o,
    preventScrollReset: u,
    relative: r,
    viewTransition: h
  });
  function C(A) {
    s && s(A), A.defaultPrevented || O(A);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ y.createElement("a", U({}, f, {
      href: v || m,
      onClick: p || i ? s : C,
      ref: a,
      target: o
    }))
  );
});
process.env.NODE_ENV !== "production" && (X.displayName = "Link");
const dn = /* @__PURE__ */ y.forwardRef(function(n, a) {
  let {
    "aria-current": s = "page",
    caseSensitive: r = !1,
    className: i = "",
    end: l = !1,
    style: d,
    to: o,
    viewTransition: t,
    children: u
  } = n, h = ve(n, an), f = K(o, {
    relative: h.relative
  }), w = B(), v = y.useContext(qe), {
    navigator: p,
    basename: m
  } = y.useContext(D), O = v != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Nn(f) && t === !0, C = p.encodeLocation ? p.encodeLocation(f).pathname : f.pathname, A = w.pathname, E = v && v.navigation && v.navigation.location ? v.navigation.location.pathname : null;
  r || (A = A.toLowerCase(), E = E ? E.toLowerCase() : null, C = C.toLowerCase()), E && m && (E = j(E, m) || E);
  const q = C !== "/" && C.endsWith("/") ? C.length - 1 : C.length;
  let Z = A === C || !l && A.startsWith(C) && A.charAt(q) === "/", ye = E != null && (E === C || !l && E.startsWith(C) && E.charAt(C.length) === "/"), Q = {
    isActive: Z,
    isPending: ye,
    isTransitioning: O
  }, Xe = Z ? s : void 0, ee;
  typeof i == "function" ? ee = i(Q) : ee = [i, Z ? "active" : null, ye ? "pending" : null, O ? "transitioning" : null].filter(Boolean).join(" ");
  let Ze = typeof d == "function" ? d(Q) : d;
  return /* @__PURE__ */ y.createElement(X, U({}, h, {
    "aria-current": Xe,
    className: ee,
    ref: a,
    style: Ze,
    to: o,
    viewTransition: t
  }), typeof u == "function" ? u(Q) : u);
});
process.env.NODE_ENV !== "production" && (dn.displayName = "NavLink");
const un = /* @__PURE__ */ y.forwardRef((e, n) => {
  let {
    fetcherKey: a,
    navigate: s,
    reloadDocument: r,
    replace: i,
    state: l,
    method: d = W,
    action: o,
    onSubmit: t,
    relative: u,
    preventScrollReset: h,
    viewTransition: f
  } = e, w = ve(e, rn), v = pn(), p = gn(o, {
    relative: u
  }), m = d.toLowerCase() === "get" ? "get" : "post", O = (C) => {
    if (t && t(C), C.defaultPrevented) return;
    C.preventDefault();
    let A = C.nativeEvent.submitter, E = (A == null ? void 0 : A.getAttribute("formmethod")) || d;
    v(A || C.currentTarget, {
      fetcherKey: a,
      method: E,
      navigate: s,
      replace: i,
      state: l,
      relative: u,
      preventScrollReset: h,
      viewTransition: f
    });
  };
  return /* @__PURE__ */ y.createElement("form", U({
    ref: n,
    method: m,
    action: p,
    onSubmit: r ? t : O
  }, w));
});
process.env.NODE_ENV !== "production" && (un.displayName = "Form");
process.env.NODE_ENV;
var H;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(H || (H = {}));
var be;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(be || (be = {}));
function hn(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Ye(e) {
  let n = y.useContext(G);
  return n || (process.env.NODE_ENV !== "production" ? L(!1, hn(e)) : L(!1)), n;
}
function fn(e, n) {
  let {
    target: a,
    replace: s,
    state: r,
    preventScrollReset: i,
    relative: l,
    viewTransition: d
  } = n === void 0 ? {} : n, o = Kt(), t = B(), u = K(e, {
    relative: l
  });
  return y.useCallback((h) => {
    if (Zt(h, a)) {
      h.preventDefault();
      let f = s !== void 0 ? s : ie(t) === ie(u);
      o(e, {
        replace: f,
        state: r,
        preventScrollReset: i,
        relative: l,
        viewTransition: d
      });
    }
  }, [t, o, u, s, r, a, e, i, l, d]);
}
function mn() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let vn = 0, yn = () => "__" + String(++vn) + "__";
function pn() {
  let {
    router: e
  } = Ye(H.UseSubmit), {
    basename: n
  } = y.useContext(D), a = zt();
  return y.useCallback(function(s, r) {
    r === void 0 && (r = {}), mn();
    let {
      action: i,
      method: l,
      encType: d,
      formData: o,
      body: t
    } = tn(s, n);
    if (r.navigate === !1) {
      let u = r.fetcherKey || yn();
      e.fetch(u, a, r.action || i, {
        preventScrollReset: r.preventScrollReset,
        formData: o,
        body: t,
        formMethod: r.method || l,
        formEncType: r.encType || d,
        flushSync: r.flushSync
      });
    } else
      e.navigate(r.action || i, {
        preventScrollReset: r.preventScrollReset,
        formData: o,
        body: t,
        formMethod: r.method || l,
        formEncType: r.encType || d,
        replace: r.replace,
        state: r.state,
        fromRouteId: a,
        flushSync: r.flushSync,
        viewTransition: r.viewTransition
      });
  }, [e, n, a]);
}
function gn(e, n) {
  let {
    relative: a
  } = n === void 0 ? {} : n, {
    basename: s
  } = y.useContext(D), r = y.useContext(F);
  r || (process.env.NODE_ENV !== "production" ? L(!1, "useFormAction must be used inside a RouteContext") : L(!1));
  let [i] = r.matches.slice(-1), l = U({}, K(e || ".", {
    relative: a
  })), d = B();
  if (e == null) {
    l.search = d.search;
    let o = new URLSearchParams(l.search), t = o.getAll("index");
    if (t.some((h) => h === "")) {
      o.delete("index"), t.filter((f) => f).forEach((f) => o.append("index", f));
      let h = o.toString();
      l.search = h ? "?" + h : "";
    }
  }
  return (!e || e === ".") && i.route.index && (l.search = l.search ? l.search.replace(/^\?/, "?index&") : "?index"), s !== "/" && (l.pathname = l.pathname === "/" ? s : ue([s, l.pathname])), ie(l);
}
function Nn(e, n) {
  n === void 0 && (n = {});
  let a = y.useContext(Ge);
  a == null && (process.env.NODE_ENV !== "production" ? L(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : L(!1));
  let {
    basename: s
  } = Ye(H.useViewTransitionState), r = K(e, {
    relative: n.relative
  });
  if (!a.isTransitioning)
    return !1;
  let i = j(a.currentLocation.pathname, s) || a.currentLocation.pathname, l = j(a.nextLocation.pathname, s) || a.nextLocation.pathname;
  return $e(r.pathname, l) != null || $e(r.pathname, i) != null;
}
function wn(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
let je = 0;
function xn() {
  return je += 1, `tablelink${je}`;
}
class Cn {
  constructor(n = {}) {
    if (!n.link) throw new Error("TableLinkObject requires `link` (base route).");
    this.id = n.id ?? xn(), this.className = n.className ?? "table", this.name = n.name ?? "table", this.rows = Array.isArray(n.rows) ? n.rows.slice() : [], this.link = n.link;
    const a = new N({ iconClass: "fa-solid fa-user" }), s = new N({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = n.icon instanceof N ? n.icon : new N(n.icon || a), this.sort = n.sort instanceof N ? n.sort : new N(n.sort || s);
  }
}
function Ln(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((n) => n !== "id");
}
function Un({ table: e, output: n }) {
  if (!e || !(e instanceof Cn))
    throw new Error("AlloyTableLink requires `table` (TableLinkObject instance).");
  const a = k(e.id), [s, r] = x({ col: "", dir: "asc" }), i = S(() => Ln(e.rows), [e.rows]), l = (d) => {
    if (!d) return;
    const o = s.col === d && s.dir === "asc" ? "desc" : "asc";
    r({ col: d, dir: o }), n == null || n({ type: "column", name: d, dir: o });
  };
  return /* @__PURE__ */ g("table", { id: a.current, className: e.className, children: [
    /* @__PURE__ */ c("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ c("thead", { children: /* @__PURE__ */ g("tr", { children: [
      /* @__PURE__ */ c("th", { scope: "col", children: "Type" }),
      i.map((d) => {
        const o = s.col === d, t = o && s.dir === "desc";
        return /* @__PURE__ */ c("th", { scope: "col", children: /* @__PURE__ */ g(
          "span",
          {
            className: "cursor",
            onClick: () => l(d),
            style: { userSelect: "none" },
            children: [
              wn(d),
              o && /* @__PURE__ */ c(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: t ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: t ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ c(I, { icon: e.sort })
                }
              )
            ]
          }
        ) }, d);
      })
    ] }) }),
    /* @__PURE__ */ c("tbody", { children: (e.rows ?? []).length > 0 ? (e.rows ?? []).map((d, o) => {
      const t = (d == null ? void 0 : d.id) ?? o, h = `${e.link.endsWith("/") ? e.link.slice(0, -1) : e.link}/${t}`;
      return /* @__PURE__ */ g("tr", { children: [
        /* @__PURE__ */ c("td", { children: /* @__PURE__ */ c(I, { icon: e.icon }) }),
        i.map((f) => /* @__PURE__ */ c("td", { children: /* @__PURE__ */ c(
          X,
          {
            to: h,
            onClick: () => n == null ? void 0 : n({ type: "navigate", to: h, id: t }),
            className: "text-decoration-none",
            children: /* @__PURE__ */ c("span", { children: d == null ? void 0 : d[f] })
          }
        ) }, `${t}-${f}`))
      ] }, t);
    }) : /* @__PURE__ */ c("tr", { children: /* @__PURE__ */ c("td", { colSpan: Math.max(1, i.length) + 1, className: "text-center text-secondary", children: "No rows" }) }) })
  ] });
}
let Ue = 0;
function En() {
  return Ue += 1, `tableaction${Ue}`;
}
function An(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
function On(e) {
  if (!Array.isArray(e) || e.length === 0) return [];
  const n = e[0] ?? {};
  return Object.keys(n).filter((a) => a !== "id");
}
class kn {
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
  constructor(n = {}) {
    if (!n.actions) throw new Error("TableActionObject requires `actions`.");
    this.id = n.id ?? En(), this.className = n.className ?? "table", this.name = n.name ?? "table", this.rows = Array.isArray(n.rows) ? n.rows.slice() : [], this.link = typeof n.link == "string" ? n.link : "";
    const a = new N({ iconClass: "fa-solid fa-user" }), s = new N({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = n.icon instanceof N ? n.icon : new N(n.icon || a), this.sort = n.sort instanceof N ? n.sort : new N(n.sort || s), this.actions = n.actions instanceof se ? n.actions : new se(n.actions || {});
  }
}
function Fn({ table: e, output: n }) {
  if (!e || !(e instanceof kn))
    throw new Error("AlloyTableAction requires `table` (TableActionObject instance).");
  const a = k(e.id), s = S(() => On(e.rows), [e.rows]), [r, i] = x({ col: "", dir: "asc" });
  function l(o) {
    const t = r.col === o && r.dir === "asc" ? "desc" : "asc";
    i({ col: o, dir: t }), n == null || n({ type: "column", name: o, dir: t });
  }
  function d(o) {
    return (t, u) => {
      var h;
      n == null || n({
        type: "action",
        action: {
          id: t == null ? void 0 : t.id,
          name: t == null ? void 0 : t.name,
          className: t == null ? void 0 : t.className,
          active: t == null ? void 0 : t.active,
          disabled: !!(t != null && t.disabled),
          title: t == null ? void 0 : t.title,
          ariaLabel: t == null ? void 0 : t.ariaLabel,
          tabIndex: t == null ? void 0 : t.tabIndex,
          iconClass: (h = t == null ? void 0 : t.icon) == null ? void 0 : h.iconClass
        },
        row: o
      });
    };
  }
  return /* @__PURE__ */ g("table", { id: a.current, className: e.className, children: [
    /* @__PURE__ */ c("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ c("thead", { children: /* @__PURE__ */ g("tr", { children: [
      /* @__PURE__ */ c("th", { scope: "col", children: "Type" }),
      s.map((o) => {
        const t = r.col === o, u = t && r.dir === "desc" ? "rotate-180" : "";
        return /* @__PURE__ */ c("th", { scope: "col", children: /* @__PURE__ */ g(
          "button",
          {
            type: "button",
            className: "btn btn-link p-0 text-decoration-none",
            onClick: () => l(o),
            children: [
              An(o),
              t && /* @__PURE__ */ c("span", { className: `ms-1 align-middle ${u}`, "aria-hidden": "true", children: /* @__PURE__ */ c(I, { icon: e.sort }) })
            ]
          }
        ) }, `h-${o}`);
      }),
      /* @__PURE__ */ c("th", { scope: "col", className: "text-end", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ c("tbody", { children: e.rows.map((o, t) => {
      const u = (o == null ? void 0 : o.id) ?? t, h = e.actions;
      return /* @__PURE__ */ g("tr", { children: [
        /* @__PURE__ */ c("td", { children: /* @__PURE__ */ c(I, { icon: e.icon }) }),
        s.map((f) => {
          const w = e.link ? `${e.link}/${u}` : "";
          return /* @__PURE__ */ c("td", { children: e.link ? /* @__PURE__ */ c(
            X,
            {
              to: w,
              onClick: () => n == null ? void 0 : n({ type: "navigate", to: w, id: u, row: o }),
              className: "text-decoration-none",
              children: /* @__PURE__ */ c("span", { children: o == null ? void 0 : o[f] })
            }
          ) : /* @__PURE__ */ c("span", { children: o == null ? void 0 : o[f] }) }, `${u}-${f}`);
        }),
        /* @__PURE__ */ c("td", { className: "text-end", children: /* @__PURE__ */ c(Et, { buttonBar: h, output: d(o) }) })
      ] }, u);
    }) })
  ] });
}
export {
  dt as AlloyButton,
  Et as AlloyButtonBar,
  ft as AlloyButtonIcon,
  _n as AlloyButtonSubmit,
  I as AlloyIcon,
  Sn as AlloyInput,
  nt as AlloyLink,
  Nt as AlloyLinkBar,
  st as AlloyLinkIcon,
  Fe as AlloyLinkLogo,
  bn as AlloyNavBar,
  jn as AlloyTable,
  Fn as AlloyTableAction,
  Un as AlloyTableLink,
  se as ButtonBarObject,
  b as ButtonIconObject,
  $ as ButtonObject,
  vt as ButtonSubmitObject,
  N as IconObject,
  Rn as InputObject,
  re as LinkBarObject,
  R as LinkIconObject,
  M as LinkLogoObject,
  _ as LinkObject,
  kt as NavBarObject,
  kn as TableActionObject,
  Cn as TableLinkObject,
  Dt as TableObject
};
//# sourceMappingURL=alloy-react.es.js.map
