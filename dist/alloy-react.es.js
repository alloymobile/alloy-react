import { jsx as r, jsxs as v } from "react/jsx-runtime";
import * as w from "react";
import { useRef as j, useState as B, useMemo as F, forwardRef as ue, useImperativeHandle as me, useEffect as fe, useCallback as Je } from "react";
import "react-dom";
function k(e = "id") {
  const t = Date.now(), n = Math.random().toString(36).slice(2, 7);
  return `${e}-${t}-${n}`;
}
class N {
  constructor(t = {}) {
    const { id: n, name: a, className: i } = t;
    this.id = n ?? k("tag"), this.name = a ?? "", this.className = i ?? "";
  }
}
class L {
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
    this.id = t.id ?? k("icon"), this.iconClass = t.iconClass;
  }
}
function R({ icon: e }) {
  if (!e) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ r("i", { id: e.id, className: e.iconClass, "aria-hidden": "true" });
}
function Ge(e = "", t = "") {
  const [n, a] = B(!1), [i, d] = B(!1), [h, o] = B(!1);
  return {
    className: F(() => [e, (n || i || h) && t].filter(Boolean).join(" "), [e, t, n, i, h]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), d(!1);
      },
      onMouseDown: () => d(!0),
      onMouseUp: () => d(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
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
    this.id = t.id ?? k("link"), this.name = t.name, this.href = t.href, this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function Ye({ link: e }) {
  if (!e || !(e instanceof _))
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  const t = j(e.id), { className: n, events: a } = Ge(e.className, e.active), i = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel;
  return /* @__PURE__ */ r(
    "a",
    {
      id: t.current,
      href: e.href,
      className: n,
      target: e.target,
      rel: i,
      onClick: e.onClick,
      title: e.title,
      ...a,
      children: /* @__PURE__ */ r("span", { children: e.name })
    }
  );
}
function Ze(e = "", t = "") {
  const [n, a] = B(!1), [i, d] = B(!1), [h, o] = B(!1);
  return {
    className: F(() => [e, (n || i || h) && t].filter(Boolean).join(" "), [e, t, n, i, h]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), d(!1);
      },
      onMouseDown: () => d(!0),
      onMouseUp: () => d(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class V {
  /**
   * @param {LinkIconConfig} linkIcon
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkIconObject requires `href`.");
    if (!t.icon)
      throw new Error("LinkIconObject requires `icon`.");
    const n = t.icon instanceof L ? t.icon : new L(t.icon);
    this.id = t.id ?? k("link-icon"), this.href = t.href, this.icon = n, this.name = t.name, this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function Xe({ linkIcon: e }) {
  if (!e || !(e instanceof V))
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  const t = j(e.id), { className: n, events: a } = Ze(
    e.className,
    e.active
  ), i = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, d = !!e.name;
  return /* @__PURE__ */ r(
    "a",
    {
      id: t.current,
      href: e.href,
      className: n,
      target: e.target,
      rel: i,
      onClick: e.onClick,
      title: e.title,
      ...a,
      children: /* @__PURE__ */ v("span", { className: "d-inline-flex align-items-center", children: [
        /* @__PURE__ */ r(R, { icon: e.icon }),
        d && /* @__PURE__ */ r("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
function Qe(e = "", t = "") {
  const [n, a] = B(!1), [i, d] = B(!1), [h, o] = B(!1);
  return {
    className: F(() => [e, (n || i || h) && t].filter(Boolean).join(" "), [e, t, n, i, h]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), d(!1);
      },
      onMouseDown: () => d(!0),
      onMouseUp: () => d(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class P {
  /**
   * @param {LinkLogoConfig} linkLogo
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkLogoObject requires `href`.");
    if (!t.logo)
      throw new Error("LinkLogoObject requires `logo`.");
    this.id = t.id ?? k("link-logo"), this.name = t.name, this.href = t.href, this.logo = t.logo, this.width = t.width, this.height = t.height, this.logoAlt = t.logoAlt ?? t.name ?? "", this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function je({ linkLogo: e }) {
  if (!e || !(e instanceof P))
    throw new Error(
      "AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance)."
    );
  const t = j(e.id), { className: n, events: a } = Qe(
    e.className,
    e.active
  ), i = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, d = !!e.name;
  return /* @__PURE__ */ r(
    "a",
    {
      id: t.current,
      href: e.href,
      className: n,
      target: e.target,
      rel: i,
      onClick: e.onClick,
      title: e.title,
      ...a,
      children: /* @__PURE__ */ v("span", { className: "d-inline-flex align-items-center", children: [
        /* @__PURE__ */ r(
          "img",
          {
            src: e.logo,
            alt: e.logoAlt || e.name || "",
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
function Ie(e = "", t = "") {
  const [n, a] = B(!1), [i, d] = B(!1), [h, o] = B(!1);
  return {
    className: F(() => [e, (n || i || h) && t].filter(Boolean).join(" "), [e, t, n, i, h]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), d(!1);
      },
      onMouseDown: () => d(!0),
      onMouseUp: () => d(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class q {
  /**
   * @param {ButtonConfig} button
   */
  constructor(t = {}) {
    if (!t.name)
      throw new Error("ButtonObject requires `name`.");
    this.id = t.id ?? k("btn"), this.name = t.name, this.className = t.className ?? "", this.active = t.active ?? "btn btn-primary", this.disabled = !!t.disabled, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const et = ue(function({ button: t, output: n }, a) {
  if (!t || !(t instanceof q))
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  const i = j(null), d = j(t.id), h = t.disabled, { className: o, events: l } = Ie(
    t.className,
    t.active
  );
  me(
    a,
    () => ({
      el: i.current,
      model: t,
      focus: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.focus();
      },
      click: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }
    }),
    [t]
  );
  const s = (u, f) => (y) => {
    f == null || f(y), n == null || n(t, y), u == null || u(y, t);
  }, c = {
    onClick: s(t.onClick),
    onKeyDown: s(t.onKeyDown, l.onFocus),
    onKeyUp: s(t.onKeyUp),
    onFocus: s(t.onFocus, l.onFocus),
    onBlur: s(t.onBlur, l.onBlur),
    onMouseEnter: s(t.onMouseEnter, l.onMouseEnter),
    onMouseLeave: s(t.onMouseLeave, l.onMouseLeave),
    onMouseDown: s(void 0, l.onMouseDown),
    onMouseUp: s(void 0, l.onMouseUp)
  };
  return /* @__PURE__ */ r(
    "button",
    {
      id: d.current,
      ref: i,
      type: "button",
      className: o,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-disabled": h || void 0,
      disabled: h,
      tabIndex: t.tabIndex,
      ...c,
      children: /* @__PURE__ */ r("span", { className: "px-2 align-middle", children: t.name })
    }
  );
});
function tt(e = "", t = "") {
  const [n, a] = B(!1), [i, d] = B(!1), [h, o] = B(!1);
  return {
    className: F(() => [e, (n || i || h) && t].filter(Boolean).join(" "), [e, t, n, i, h]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), d(!1);
      },
      onMouseDown: () => d(!0),
      onMouseUp: () => d(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class K {
  /**
   * @param {ButtonIconConfig} buttonIcon
   */
  constructor(t = {}) {
    if (!t.icon)
      throw new Error("ButtonIconObject requires `icon`.");
    const n = t.icon instanceof L ? t.icon : new L(t.icon);
    this.id = t.id ?? k("btn-icon"), this.name = t.name, this.icon = n, this.className = t.className ?? "btn btn-primary", this.active = t.active ?? "", this.disabled = !!t.disabled, this.title = t.title ?? t.name ?? "icon button", this.ariaLabel = t.ariaLabel ?? t.name ?? "icon button", this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const nt = ue(function({ buttonIcon: t, output: n }, a) {
  if (!t || !(t instanceof K))
    throw new Error(
      "AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance)."
    );
  const i = j(null), d = j(t.id), h = t.disabled, { className: o, events: l } = tt(
    t.className,
    t.active
  );
  me(
    a,
    () => ({
      el: i.current,
      model: t,
      focus: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.focus();
      },
      click: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }
    }),
    [t]
  );
  const s = (u, f) => (y) => {
    f == null || f(y), n == null || n(t, y), u == null || u(y, t);
  }, c = {
    onClick: s(t.onClick),
    onKeyDown: s(t.onKeyDown, l.onFocus),
    onKeyUp: s(t.onKeyUp),
    onFocus: s(t.onFocus, l.onFocus),
    onBlur: s(t.onBlur, l.onBlur),
    onMouseEnter: s(t.onMouseEnter, l.onMouseEnter),
    onMouseLeave: s(t.onMouseLeave, l.onMouseLeave),
    onMouseDown: s(void 0, l.onMouseDown),
    onMouseUp: s(void 0, l.onMouseUp)
  };
  return /* @__PURE__ */ v(
    "button",
    {
      id: d.current,
      ref: i,
      type: "button",
      className: o,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-disabled": h || void 0,
      disabled: h,
      tabIndex: t.tabIndex,
      ...c,
      children: [
        /* @__PURE__ */ r("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ r(R, { icon: t.icon }) }),
        t.name ? /* @__PURE__ */ r("span", { className: "px-2 align-middle", children: t.name }) : null
      ]
    }
  );
});
class I {
  /**
   * @param {ButtonSubmitConfig} buttonSubmit
   */
  constructor(t = {}) {
    if (!t.name)
      throw new Error("ButtonSubmitObject requires `name`.");
    if (!t.icon)
      throw new Error("ButtonSubmitObject requires `icon`.");
    const n = t.icon instanceof L ? t.icon : new L(t.icon);
    this.id = t.id ?? k("btn-submit"), this.name = t.name, this.icon = n, this.className = t.className ?? "", this.disabled = !!t.disabled, this.loading = !!t.loading, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onMouseDown = t.onMouseDown, this.onKeyDown = t.onKeyDown;
  }
}
const at = ue(function({ buttonSubmit: t, output: n }, a) {
  if (!t || !(t instanceof I))
    throw new Error(
      "AlloyButtonSubmit requires `buttonSubmit` (ButtonSubmitObject instance)."
    );
  const i = j(null), d = j(t.id), [h, o] = B(!!t.loading), l = j(!1);
  fe(() => {
    const b = !!t.loading;
    o(b), b || (l.current = !1);
  }, [t.loading]);
  const s = t.disabled || h;
  me(
    a,
    () => ({
      el: i.current,
      model: t,
      focus: () => {
        var b;
        return (b = i.current) == null ? void 0 : b.focus();
      },
      click: () => {
        var b;
        return (b = i.current) == null ? void 0 : b.click();
      }
    }),
    [t]
  );
  const c = () => l.current || s ? !1 : (l.current = !0, t.loading = !0, t.disabled = !0, o(!0), !0), u = (b, O) => {
    n == null || n(t, b), O == null || O(b, t);
  }, f = (b) => {
    c() && u(b, t.onClick);
  }, y = (b) => {
    c() && u(b, t.onMouseDown);
  }, m = (b) => {
    const O = b.key;
    (O === "Enter" || O === " ") && c() && u(b, t.onKeyDown);
  }, C = h;
  return /* @__PURE__ */ v(
    "button",
    {
      id: d.current,
      ref: i,
      type: "submit",
      className: t.className,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-busy": h || void 0,
      "aria-disabled": s || void 0,
      disabled: s,
      tabIndex: t.tabIndex,
      onClick: f,
      onMouseDown: y,
      onKeyDown: m,
      children: [
        C && /* @__PURE__ */ r("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ r(R, { icon: t.icon }) }),
        /* @__PURE__ */ r("span", { className: C ? "px-2 align-middle" : "align-middle", children: t.name }),
        h ? /* @__PURE__ */ r("span", { className: "ms-2 visually-hidden", "aria-live": "polite", children: "Loading…" }) : null
      ]
    }
  );
});
class ge {
  /**
   * @param {InputConfig} config
   */
  constructor(t = {}) {
    const {
      id: n,
      name: a,
      type: i = "text",
      label: d = "",
      value: h,
      layout: o = "text",
      icon: l,
      placeholder: s = "",
      required: c = !1,
      minLength: u,
      maxLength: f,
      min: y,
      max: m,
      pattern: C,
      matchWith: b,
      passwordStrength: O,
      options: E = [],
      validators: g = [],
      ...p
    } = t;
    if (!a)
      throw new Error("InputObject requires `name`.");
    if ((o === "icon" || o === "floating") && !l)
      throw new Error(
        "InputObject with layout='icon' or 'floating' requires `icon`."
      );
    let x;
    typeof h < "u" ? x = h : i === "checkbox" ? x = [] : x = "";
    const S = l instanceof L ? l : l ? new L(l) : void 0;
    this.id = n ?? k("input"), this.name = a, this.type = i, this.label = d, this.value = x, this.layout = o, this.icon = S, this.placeholder = s, this.required = !!c, this.minLength = u, this.maxLength = f, this.min = y, this.max = m, this.pattern = C, this.matchWith = b, this.passwordStrength = O, this.options = E, this.validators = g, Object.assign(this, p);
  }
}
function st({ input: e, output: t }) {
  const [n, a] = B(e.value), [i, d] = B(!1), h = (g) => {
    const p = [], x = typeof g == "string" ? g.trim() : g;
    if (e.required) {
      const S = Array.isArray(x) && x.length === 0, Y = !Array.isArray(x) && (x === "" || x === !1 || x == null);
      (S || Y) && p.push("This field is required.");
    }
    return typeof x == "string" && e.minLength != null && x.length < e.minLength && p.push(`Minimum length is ${e.minLength}`), typeof x == "string" && e.maxLength != null && x.length > e.maxLength && p.push(`Maximum length is ${e.maxLength}`), typeof x == "string" && e.pattern && e.pattern !== "" && (new RegExp(e.pattern).test(x) || p.push("Invalid format.")), e.passwordStrength && typeof x == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(
      x
    ) || p.push("Password is too weak.")), p;
  }, o = h(n), l = i && o.length > 0, s = l && o.length > 0 && /* @__PURE__ */ r("div", { className: "mt-2", "aria-live": "polite", children: o.map((g, p) => /* @__PURE__ */ r(
    "div",
    {
      className: "alert alert-danger py-2 mb-2",
      role: "alert",
      children: g
    },
    p
  )) }), c = {
    id: e.id,
    name: e.name,
    placeholder: e.placeholder,
    onBlur: () => d(!0),
    "aria-invalid": l || void 0
  }, u = (g) => {
    const p = h(g);
    t == null || t({
      id: e.id,
      name: e.name,
      value: g,
      valid: p.length === 0,
      error: p.length > 0,
      errors: p
    });
  }, f = (g) => {
    const p = g.target.value;
    if (e.type === "checkbox") {
      const x = Array.isArray(n) ? [...n] : [], S = x.indexOf(p);
      S > -1 ? x.splice(S, 1) : x.push(p), a(x), u(x);
    } else e.type, a(p), u(p);
  }, y = () => /* @__PURE__ */ r(
    "textarea",
    {
      ...c,
      value: n,
      onChange: f,
      className: `form-control${l ? " is-invalid" : ""}`
    }
  ), m = () => /* @__PURE__ */ r(
    "select",
    {
      ...c,
      value: n,
      onChange: f,
      className: `form-select${l ? " is-invalid" : ""}`,
      children: e.options.map((g) => /* @__PURE__ */ r("option", { value: g.value, children: g.label }, g.value))
    }
  ), C = () => /* @__PURE__ */ v("div", { children: [
    e.label && /* @__PURE__ */ r("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((g, p) => /* @__PURE__ */ v("div", { className: "form-check", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "radio",
          id: `${e.id}_${p}`,
          className: `form-check-input${l ? " is-invalid" : ""}`,
          name: e.name,
          value: g.value,
          checked: n === g.value,
          onChange: f,
          onBlur: () => d(!0),
          "aria-invalid": l || void 0
        }
      ),
      /* @__PURE__ */ r(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${p}`,
          children: g.label
        }
      )
    ] }, p))
  ] }), b = () => /* @__PURE__ */ v("div", { children: [
    e.label && /* @__PURE__ */ r("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((g, p) => /* @__PURE__ */ v("div", { className: "form-check", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "checkbox",
          id: `${e.id}_${p}`,
          className: `form-check-input${l ? " is-invalid" : ""}`,
          name: e.name,
          value: g.value,
          checked: Array.isArray(n) && n.includes(g.value),
          onChange: f,
          onBlur: () => d(!0),
          "aria-invalid": l || void 0
        }
      ),
      /* @__PURE__ */ r(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${p}`,
          children: g.label
        }
      )
    ] }, p))
  ] }), O = () => /* @__PURE__ */ r(
    "input",
    {
      ...c,
      type: e.type,
      value: n,
      onChange: f,
      className: `form-control${l ? " is-invalid" : ""}`
    }
  ), E = () => {
    switch (e.type) {
      case "textarea":
        return y();
      case "select":
        return m();
      case "radio":
        return C();
      case "checkbox":
        return b();
      default:
        return O();
    }
  };
  return e.layout === "floating" ? /* @__PURE__ */ v("div", { className: "mb-3", children: [
    /* @__PURE__ */ v("div", { className: "form-floating", children: [
      E(),
      /* @__PURE__ */ v("label", { htmlFor: e.id, children: [
        e.icon && /* @__PURE__ */ r(R, { icon: e.icon }),
        e.icon && " ",
        e.label
      ] })
    ] }),
    s
  ] }) : e.layout === "icon" ? /* @__PURE__ */ v("div", { className: "mb-3", children: [
    e.label && /* @__PURE__ */ r("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    /* @__PURE__ */ v("div", { className: "input-group", children: [
      /* @__PURE__ */ r("span", { className: "input-group-text", children: /* @__PURE__ */ r(R, { icon: e.icon }) }),
      E()
    ] }),
    s
  ] }) : /* @__PURE__ */ v("div", { className: "mb-3", children: [
    ["text", "textarea", "number", "email", "password", "date"].includes(
      e.type
    ) && e.label && /* @__PURE__ */ r("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    E(),
    s
  ] });
}
class U {
  /**
   * @param {LinkBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? k("linkBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyLink", this.linkClass = t.linkClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof N ? this.title = t.title : t.title ? this.title = new N(t.title) : this.title = new N({});
    const n = Array.isArray(t.links) ? t.links : [];
    this.type === "AlloyLinkIcon" ? this.links = n.map(
      (a) => a instanceof V ? a : new V(a)
    ) : this.type === "AlloyLinkLogo" ? this.links = n.map(
      (a) => a instanceof P ? a : new P(a)
    ) : this.links = n.map(
      (a) => a instanceof _ ? a : new _(a)
    );
  }
}
function it(e, t, n, a) {
  const i = n ? t : "";
  return e instanceof _ ? new _({
    id: e.id,
    name: e.name,
    href: e.href,
    className: e.className,
    active: i,
    target: e.target,
    rel: e.rel,
    onClick: a,
    title: e.title
  }) : e instanceof V ? new V({
    id: e.id,
    href: e.href,
    icon: e.icon,
    name: e.name,
    className: e.className,
    active: i,
    target: e.target,
    rel: e.rel,
    onClick: a,
    title: e.title
  }) : e instanceof P ? new P({
    id: e.id,
    name: e.name,
    href: e.href,
    logo: e.logo,
    width: e.width,
    height: e.height,
    logoAlt: e.logoAlt,
    className: e.className,
    active: i,
    target: e.target,
    rel: e.rel,
    onClick: a,
    title: e.title
  }) : e;
}
function te({ linkBar: e }) {
  if (!e || !(e instanceof U))
    throw new Error("AlloyLinkBar requires `linkBar` (LinkBarObject instance).");
  const t = j(e.id), [n, a] = B("");
  fe(() => {
    a("");
  }, [e]);
  const i = () => e.title && e.title.name ? /* @__PURE__ */ r(
    "div",
    {
      id: e.title.id,
      className: e.title.className,
      children: e.title.name
    }
  ) : null;
  function d(o) {
    const l = o.onClick;
    return (s) => {
      const c = o.id || `${o.href || ""}-${o.name || ""}`;
      a(c), l == null || l(s);
    };
  }
  function h() {
    return /* @__PURE__ */ r("ul", { id: t.current, className: e.className, children: e.links.map((o, l) => {
      const s = ((o == null ? void 0 : o.id) ?? "") === n, c = it(
        o,
        e.selected,
        s,
        d(o)
      );
      switch (e.type) {
        case "AlloyLink":
          if (!(c instanceof _))
            throw new Error(
              "AlloyLinkBar (type='AlloyLink') expects each link to be a LinkObject instance."
            );
          return /* @__PURE__ */ r(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ r(Ye, { link: c })
            },
            ((o == null ? void 0 : o.id) ?? l) + "-li"
          );
        case "AlloyLinkIcon":
          if (!(c instanceof V))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkIcon') expects each link to be a LinkIconObject instance."
            );
          return /* @__PURE__ */ r(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ r(Xe, { linkIcon: c })
            },
            ((o == null ? void 0 : o.id) ?? l) + "-li"
          );
        case "AlloyLinkLogo":
          if (!(c instanceof P))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkLogo') expects each link to be a LinkLogoObject instance."
            );
          return /* @__PURE__ */ r(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ r(je, { linkLogo: c })
            },
            ((o == null ? void 0 : o.id) ?? l) + "-li"
          );
        default:
          throw new Error(
            `Unsupported linkBar.type "${e.type}".`
          );
      }
    }) });
  }
  return /* @__PURE__ */ v("nav", { "data-type": e.type, children: [
    /* @__PURE__ */ r(i, {}),
    h()
  ] });
}
class $ {
  /**
   * @param {ButtonBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? k("buttonBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyButton", this.buttonClass = t.buttonClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof N ? this.title = t.title : t.title ? this.title = new N(t.title) : this.title = new N({});
    const n = Array.isArray(t.buttons) ? t.buttons : [];
    this.type === "AlloyButtonIcon" ? this.buttons = n.map(
      (a) => a instanceof K ? a : new K(a)
    ) : this.buttons = n.map(
      (a) => a instanceof q ? a : new q(a)
    );
  }
}
function be(e, t, n, a, i) {
  const d = n ? t : "";
  function h(o, l) {
    if ((l == null ? void 0 : l.type) === "click") {
      const s = (o == null ? void 0 : o.id) ?? "";
      a(s);
    }
    i == null || i(o, l);
  }
  return e instanceof q ? { model: new q({
    id: e.id,
    name: e.name,
    className: e.className,
    active: d,
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
  }), onAnyEvent: h } : e instanceof K ? { model: new K({
    id: e.id,
    name: e.name,
    icon: e.icon,
    // already an IconObject (normalized in ButtonIconObject)
    className: e.className,
    active: d,
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
  }), onAnyEvent: h } : { model: e, onAnyEvent: h };
}
function ne({ buttonBar: e, output: t }) {
  if (!e || !(e instanceof $))
    throw new Error(
      "AlloyButtonBar requires `buttonBar` (ButtonBarObject instance)."
    );
  const n = j(e.id), [a, i] = B("");
  fe(() => {
    i("");
  }, [e]);
  const d = () => e.title && e.title.name ? /* @__PURE__ */ r("div", { id: e.title.id, className: e.title.className, children: e.title.name }) : null;
  function h() {
    return /* @__PURE__ */ r("ul", { id: n.current, className: e.className, children: e.buttons.map((s, c) => {
      if (!(s instanceof q))
        throw new Error(
          "AlloyButtonBar (type='AlloyButton') expects ButtonObject items."
        );
      const u = ((s == null ? void 0 : s.id) ?? "") === a, { model: f, onAnyEvent: y } = be(
        s,
        e.selected,
        u,
        i,
        t
      );
      return /* @__PURE__ */ r(
        "li",
        {
          className: e.buttonClass,
          children: /* @__PURE__ */ r(et, { button: f, output: y })
        },
        ((s == null ? void 0 : s.id) ?? c) + "-li"
      );
    }) });
  }
  function o() {
    return /* @__PURE__ */ r("ul", { id: n.current, className: e.className, children: e.buttons.map((s, c) => {
      if (!(s instanceof K))
        throw new Error(
          "AlloyButtonBar (type='AlloyButtonIcon') expects ButtonIconObject items."
        );
      const u = ((s == null ? void 0 : s.id) ?? "") === a, { model: f, onAnyEvent: y } = be(
        s,
        e.selected,
        u,
        i,
        t
      );
      return /* @__PURE__ */ r(
        "li",
        {
          className: e.buttonClass,
          children: /* @__PURE__ */ r(nt, { buttonIcon: f, output: y })
        },
        ((s == null ? void 0 : s.id) ?? c) + "-li"
      );
    }) });
  }
  function l() {
    switch (e.type) {
      case "AlloyButtonIcon":
        return o();
      case "AlloyButton":
      default:
        return h();
    }
  }
  return /* @__PURE__ */ v("nav", { "data-type": e.type, children: [
    /* @__PURE__ */ r(d, {}),
    l()
  ] });
}
class rt {
  /**
   * @param {NavBarConfig} nav = {}
   */
  constructor(t = {}) {
    if (this.id = t.id ?? k("navbar"), this.className = t.className ?? "navbar navbar-expand-lg navbar-light bg-light", t.logo instanceof P)
      this.logo = t.logo;
    else {
      const n = t.logo ?? {
        href: "/",
        logo: "/logos/alloy.svg",
        name: "Alloy",
        width: 110,
        height: 28,
        logoAlt: "Alloy",
        className: "navbar-brand d-flex align-items-center gap-2"
      };
      this.logo = new P(n);
    }
    if (t.linkBar instanceof U)
      this.linkBar = t.linkBar;
    else {
      const n = t.linkBar ?? {};
      this.linkBar = new U({
        // let LinkBarObject generate its own id if missing
        id: n.id,
        className: n.className ?? "navbar-nav ms-auto mb-2 mb-lg-0 gap-2",
        // Nav bar headings are usually not shown, but we still pass something
        // valid for `title`. If name is "", AlloyLinkBar won't render it.
        title: n.title ?? {
          name: "",
          className: "text-center fw-semibold mb-2"
        },
        type: n.type ?? "AlloyLink",
        linkClass: n.linkClass ?? "nav-item",
        selected: n.selected ?? "active",
        // Let LinkBarObject do the heavy lifting:
        links: Array.isArray(n.links) ? n.links : []
      });
    }
  }
}
function un({ navBar: e }) {
  if (!e || !(e instanceof rt))
    throw new Error("AlloyNavBar requires `navBar` (NavBarObject instance).");
  const t = j(e.id), n = `${t.current}-collapse`;
  return /* @__PURE__ */ r("nav", { id: t.current, className: e.className, children: /* @__PURE__ */ v("div", { className: "container-fluid", children: [
    /* @__PURE__ */ r(je, { linkLogo: e.logo }),
    /* @__PURE__ */ r(
      "button",
      {
        className: "navbar-toggler",
        type: "button",
        "data-bs-toggle": "collapse",
        "data-bs-target": `#${n}`,
        "aria-controls": n,
        "aria-expanded": "false",
        "aria-label": "Toggle navigation",
        children: /* @__PURE__ */ r("span", { className: "navbar-toggler-icon" })
      }
    ),
    /* @__PURE__ */ r(
      "div",
      {
        className: "position-relative navbar-collapse collapse justify-content-end",
        id: n,
        children: /* @__PURE__ */ r(te, { linkBar: e.linkBar })
      }
    )
  ] }) });
}
function ot(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
class lt {
  /**
   * @param {TableConfig} table
   */
  constructor(t = {}) {
    this.id = t.id ?? k("table"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [];
    const n = { iconClass: "fa-solid fa-user" }, a = { iconClass: "fa-solid fa-arrow-down" }, i = t.icon instanceof L ? t.icon : new L(t.icon || n), d = t.sort instanceof L ? t.sort : new L(t.sort || a);
    this.icon = i, this.sort = d;
  }
}
function ct(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function mn({ table: e, output: t }) {
  if (!e || !(e instanceof lt))
    throw new Error("AlloyTable requires `table` (TableObject instance).");
  const n = j(e.id), [a, i] = B({ col: "", dir: "asc" }), d = F(
    () => ct(e.rows),
    [e.rows]
  ), h = (l) => {
    if (!l) return;
    const s = a.col === l && a.dir === "asc" ? "desc" : "asc";
    i({ col: l, dir: s }), t == null || t({
      type: "column",
      name: l,
      dir: s
    });
  }, o = (l) => {
    t == null || t({
      type: "row",
      id: l
    });
  };
  return /* @__PURE__ */ v("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ r("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ v("tr", { children: [
      /* @__PURE__ */ r("th", { scope: "col", children: "Type" }),
      d.map((l) => {
        const s = a.col === l, c = s && a.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ v(
          "span",
          {
            onClick: () => h(l),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              ot(l),
              s && /* @__PURE__ */ r(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: c ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: c ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ r(R, { icon: e.sort })
                }
              )
            ]
          }
        ) }, l);
      })
    ] }) }),
    /* @__PURE__ */ r("tbody", { children: e.rows.length > 0 ? e.rows.map((l, s) => /* @__PURE__ */ v(
      "tr",
      {
        onClick: () => o(l == null ? void 0 : l.id),
        style: { cursor: "pointer" },
        children: [
          /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(R, { icon: e.icon }) }),
          d.map((c) => /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r("span", { children: l == null ? void 0 : l[c] }) }, `${(l == null ? void 0 : l.id) ?? s}-${c}`))
        ]
      },
      (l == null ? void 0 : l.id) ?? s
    )) : /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r(
      "td",
      {
        colSpan: Math.max(1, d.length) + 1,
        className: "text-center text-secondary",
        children: "No rows"
      }
    ) }) })
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
function ce() {
  return ce = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, ce.apply(this, arguments);
}
var xe;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(xe || (xe = {}));
function A(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function H(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function de(e) {
  let {
    pathname: t = "/",
    search: n = "",
    hash: a = ""
  } = e;
  return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n), a && a !== "#" && (t += a.charAt(0) === "#" ? a : "#" + a), t;
}
function Re(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
    let a = e.indexOf("?");
    a >= 0 && (t.search = e.substr(a), e = e.substr(0, a)), e && (t.pathname = e);
  }
  return t;
}
var Ce;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(Ce || (Ce = {}));
function Ee(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [n, a] = dt(e.path, e.caseSensitive, e.end), i = t.match(n);
  if (!i) return null;
  let d = i[0], h = d.replace(/(.)\/+$/, "$1"), o = i.slice(1);
  return {
    params: a.reduce((s, c, u) => {
      let {
        paramName: f,
        isOptional: y
      } = c;
      if (f === "*") {
        let C = o[u] || "";
        h = d.slice(0, d.length - C.length).replace(/(.)\/+$/, "$1");
      }
      const m = o[u];
      return y && !m ? s[f] = void 0 : s[f] = (m || "").replace(/%2F/g, "/"), s;
    }, {}),
    pathname: d,
    pathnameBase: h,
    pattern: e
  };
}
function dt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !0), H(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let a = [], i = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (h, o, l) => (a.push({
    paramName: o,
    isOptional: l != null
  }), l ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (a.push({
    paramName: "*"
  }), i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? i += "\\/*$" : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"), [new RegExp(i, t ? void 0 : "i"), a];
}
function M(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length, a = e.charAt(n);
  return a && a !== "/" ? null : e.slice(n) || "/";
}
function ht(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: a = "",
    hash: i = ""
  } = typeof e == "string" ? Re(e) : e;
  return {
    pathname: n ? n.startsWith("/") ? n : ut(n, t) : t,
    search: ft(a),
    hash: pt(i)
  };
}
function ut(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((i) => {
    i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
  }), n.length > 1 ? n.join("/") : "/";
}
function oe(e, t, n, a) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(a) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function mt(e) {
  return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0);
}
function Se(e, t) {
  let n = mt(e);
  return t ? n.map((a, i) => i === n.length - 1 ? a.pathname : a.pathnameBase) : n.map((a) => a.pathnameBase);
}
function Fe(e, t, n, a) {
  a === void 0 && (a = !1);
  let i;
  typeof e == "string" ? i = Re(e) : (i = ce({}, e), A(!i.pathname || !i.pathname.includes("?"), oe("?", "pathname", "search", i)), A(!i.pathname || !i.pathname.includes("#"), oe("#", "pathname", "hash", i)), A(!i.search || !i.search.includes("#"), oe("#", "search", "hash", i)));
  let d = e === "" || i.pathname === "", h = d ? "/" : i.pathname, o;
  if (h == null)
    o = n;
  else {
    let u = t.length - 1;
    if (!a && h.startsWith("..")) {
      let f = h.split("/");
      for (; f[0] === ".."; )
        f.shift(), u -= 1;
      i.pathname = f.join("/");
    }
    o = u >= 0 ? t[u] : "/";
  }
  let l = ht(i, o), s = h && h !== "/" && h.endsWith("/"), c = (d || h === ".") && n.endsWith("/");
  return !l.pathname.endsWith("/") && (s || c) && (l.pathname += "/"), l;
}
const pe = (e) => e.join("/").replace(/\/\/+/g, "/"), ft = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, pt = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, De = ["post", "put", "patch", "delete"];
new Set(De);
const yt = ["get", ...De];
new Set(yt);
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
function he() {
  return he = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, he.apply(this, arguments);
}
const ae = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (ae.displayName = "DataRouter");
const Ue = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (Ue.displayName = "DataRouterState");
const vt = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (vt.displayName = "Await");
const T = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (T.displayName = "Navigation");
const ye = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (ye.displayName = "Location");
const z = /* @__PURE__ */ w.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (z.displayName = "Route");
const Nt = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (Nt.displayName = "RouteError");
function wt(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t;
  ve() || (process.env.NODE_ENV !== "production" ? A(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : A(!1));
  let {
    basename: a,
    navigator: i
  } = w.useContext(T), {
    hash: d,
    pathname: h,
    search: o
  } = G(e, {
    relative: n
  }), l = h;
  return a !== "/" && (l = h === "/" ? a : pe([a, h])), i.createHref({
    pathname: l,
    search: o,
    hash: d
  });
}
function ve() {
  return w.useContext(ye) != null;
}
function J() {
  return ve() || (process.env.NODE_ENV !== "production" ? A(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : A(!1)), w.useContext(ye).location;
}
const $e = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Te(e) {
  w.useContext(T).static || w.useLayoutEffect(e);
}
function gt() {
  let {
    isDataRoute: e
  } = w.useContext(z);
  return e ? Lt() : bt();
}
function bt() {
  ve() || (process.env.NODE_ENV !== "production" ? A(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : A(!1));
  let e = w.useContext(ae), {
    basename: t,
    future: n,
    navigator: a
  } = w.useContext(T), {
    matches: i
  } = w.useContext(z), {
    pathname: d
  } = J(), h = JSON.stringify(Se(i, n.v7_relativeSplatPath)), o = w.useRef(!1);
  return Te(() => {
    o.current = !0;
  }), w.useCallback(function(s, c) {
    if (c === void 0 && (c = {}), process.env.NODE_ENV !== "production" && H(o.current, $e), !o.current) return;
    if (typeof s == "number") {
      a.go(s);
      return;
    }
    let u = Fe(s, JSON.parse(h), d, c.relative === "path");
    e == null && t !== "/" && (u.pathname = u.pathname === "/" ? t : pe([t, u.pathname])), (c.replace ? a.replace : a.push)(u, c.state, c);
  }, [t, a, h, d, e]);
}
function G(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    future: a
  } = w.useContext(T), {
    matches: i
  } = w.useContext(z), {
    pathname: d
  } = J(), h = JSON.stringify(Se(i, a.v7_relativeSplatPath));
  return w.useMemo(() => Fe(e, JSON.parse(h), d, n === "path"), [e, h, d, n]);
}
var Pe = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(Pe || {}), Ne = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(Ne || {});
function _e(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function xt(e) {
  let t = w.useContext(ae);
  return t || (process.env.NODE_ENV !== "production" ? A(!1, _e(e)) : A(!1)), t;
}
function Ct(e) {
  let t = w.useContext(z);
  return t || (process.env.NODE_ENV !== "production" ? A(!1, _e(e)) : A(!1)), t;
}
function Ve(e) {
  let t = Ct(e), n = t.matches[t.matches.length - 1];
  return n.route.id || (process.env.NODE_ENV !== "production" ? A(!1, e + ' can only be used on routes that contain a unique "id"') : A(!1)), n.route.id;
}
function Et() {
  return Ve(Ne.UseRouteId);
}
function Lt() {
  let {
    router: e
  } = xt(Pe.UseNavigateStable), t = Ve(Ne.UseNavigateStable), n = w.useRef(!1);
  return Te(() => {
    n.current = !0;
  }), w.useCallback(function(i, d) {
    d === void 0 && (d = {}), process.env.NODE_ENV !== "production" && H(n.current, $e), n.current && (typeof i == "number" ? e.navigate(i) : e.navigate(i, he({
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
function W() {
  return W = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, W.apply(this, arguments);
}
function we(e, t) {
  if (e == null) return {};
  var n = {}, a = Object.keys(e), i, d;
  for (d = 0; d < a.length; d++)
    i = a[d], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
const X = "get", Q = "application/x-www-form-urlencoded";
function se(e) {
  return e != null && typeof e.tagName == "string";
}
function Ot(e) {
  return se(e) && e.tagName.toLowerCase() === "button";
}
function Bt(e) {
  return se(e) && e.tagName.toLowerCase() === "form";
}
function kt(e) {
  return se(e) && e.tagName.toLowerCase() === "input";
}
function At(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function jt(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !At(e);
}
let Z = null;
function Rt() {
  if (Z === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Z = !1;
    } catch {
      Z = !0;
    }
  return Z;
}
const St = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function le(e) {
  return e != null && !St.has(e) ? (process.env.NODE_ENV !== "production" && H(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + Q + '"')), null) : e;
}
function Ft(e, t) {
  let n, a, i, d, h;
  if (Bt(e)) {
    let o = e.getAttribute("action");
    a = o ? M(o, t) : null, n = e.getAttribute("method") || X, i = le(e.getAttribute("enctype")) || Q, d = new FormData(e);
  } else if (Ot(e) || kt(e) && (e.type === "submit" || e.type === "image")) {
    let o = e.form;
    if (o == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let l = e.getAttribute("formaction") || o.getAttribute("action");
    if (a = l ? M(l, t) : null, n = e.getAttribute("formmethod") || o.getAttribute("method") || X, i = le(e.getAttribute("formenctype")) || le(o.getAttribute("enctype")) || Q, d = new FormData(o, e), !Rt()) {
      let {
        name: s,
        type: c,
        value: u
      } = e;
      if (c === "image") {
        let f = s ? s + "." : "";
        d.append(f + "x", "0"), d.append(f + "y", "0");
      } else s && d.append(s, u);
    }
  } else {
    if (se(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    n = X, a = null, i = Q, h = e;
  }
  return d && i === "text/plain" && (h = d, d = void 0), {
    action: a,
    method: n.toLowerCase(),
    encType: i,
    formData: d,
    body: h
  };
}
const Dt = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], Ut = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], $t = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], Tt = "6";
try {
  window.__reactRouterVersion = Tt;
} catch {
}
const qe = /* @__PURE__ */ w.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (qe.displayName = "ViewTransition");
const Pt = /* @__PURE__ */ w.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (Pt.displayName = "Fetchers");
process.env.NODE_ENV;
const _t = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Vt = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, D = /* @__PURE__ */ w.forwardRef(function(t, n) {
  let {
    onClick: a,
    relative: i,
    reloadDocument: d,
    replace: h,
    state: o,
    target: l,
    to: s,
    preventScrollReset: c,
    viewTransition: u
  } = t, f = we(t, Dt), {
    basename: y
  } = w.useContext(T), m, C = !1;
  if (typeof s == "string" && Vt.test(s) && (m = s, _t))
    try {
      let g = new URL(window.location.href), p = s.startsWith("//") ? new URL(g.protocol + s) : new URL(s), x = M(p.pathname, y);
      p.origin === g.origin && x != null ? s = x + p.search + p.hash : C = !0;
    } catch {
      process.env.NODE_ENV !== "production" && H(!1, '<Link to="' + s + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let b = wt(s, {
    relative: i
  }), O = Wt(s, {
    replace: h,
    state: o,
    target: l,
    preventScrollReset: c,
    relative: i,
    viewTransition: u
  });
  function E(g) {
    a && a(g), g.defaultPrevented || O(g);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ w.createElement("a", W({}, f, {
      href: m || b,
      onClick: C || d ? a : E,
      ref: n,
      target: l
    }))
  );
});
process.env.NODE_ENV !== "production" && (D.displayName = "Link");
const qt = /* @__PURE__ */ w.forwardRef(function(t, n) {
  let {
    "aria-current": a = "page",
    caseSensitive: i = !1,
    className: d = "",
    end: h = !1,
    style: o,
    to: l,
    viewTransition: s,
    children: c
  } = t, u = we(t, Ut), f = G(l, {
    relative: u.relative
  }), y = J(), m = w.useContext(Ue), {
    navigator: C,
    basename: b
  } = w.useContext(T), O = m != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Zt(f) && s === !0, E = C.encodeLocation ? C.encodeLocation(f).pathname : f.pathname, g = y.pathname, p = m && m.navigation && m.navigation.location ? m.navigation.location.pathname : null;
  i || (g = g.toLowerCase(), p = p ? p.toLowerCase() : null, E = E.toLowerCase()), p && b && (p = M(p, b) || p);
  const x = E !== "/" && E.endsWith("/") ? E.length - 1 : E.length;
  let S = g === E || !h && g.startsWith(E) && g.charAt(x) === "/", Y = p != null && (p === E || !h && p.startsWith(E) && p.charAt(E.length) === "/"), ie = {
    isActive: S,
    isPending: Y,
    isTransitioning: O
  }, ze = S ? a : void 0, re;
  typeof d == "function" ? re = d(ie) : re = [d, S ? "active" : null, Y ? "pending" : null, O ? "transitioning" : null].filter(Boolean).join(" ");
  let He = typeof o == "function" ? o(ie) : o;
  return /* @__PURE__ */ w.createElement(D, W({}, u, {
    "aria-current": ze,
    className: re,
    ref: n,
    style: He,
    to: l,
    viewTransition: s
  }), typeof c == "function" ? c(ie) : c);
});
process.env.NODE_ENV !== "production" && (qt.displayName = "NavLink");
const Kt = /* @__PURE__ */ w.forwardRef((e, t) => {
  let {
    fetcherKey: n,
    navigate: a,
    reloadDocument: i,
    replace: d,
    state: h,
    method: o = X,
    action: l,
    onSubmit: s,
    relative: c,
    preventScrollReset: u,
    viewTransition: f
  } = e, y = we(e, $t), m = Gt(), C = Yt(l, {
    relative: c
  }), b = o.toLowerCase() === "get" ? "get" : "post", O = (E) => {
    if (s && s(E), E.defaultPrevented) return;
    E.preventDefault();
    let g = E.nativeEvent.submitter, p = (g == null ? void 0 : g.getAttribute("formmethod")) || o;
    m(g || E.currentTarget, {
      fetcherKey: n,
      method: p,
      navigate: a,
      replace: d,
      state: h,
      relative: c,
      preventScrollReset: u,
      viewTransition: f
    });
  };
  return /* @__PURE__ */ w.createElement("form", W({
    ref: t,
    method: b,
    action: C,
    onSubmit: i ? s : O
  }, y));
});
process.env.NODE_ENV !== "production" && (Kt.displayName = "Form");
process.env.NODE_ENV;
var ee;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(ee || (ee = {}));
var Le;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Le || (Le = {}));
function Mt(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Ke(e) {
  let t = w.useContext(ae);
  return t || (process.env.NODE_ENV !== "production" ? A(!1, Mt(e)) : A(!1)), t;
}
function Wt(e, t) {
  let {
    target: n,
    replace: a,
    state: i,
    preventScrollReset: d,
    relative: h,
    viewTransition: o
  } = t === void 0 ? {} : t, l = gt(), s = J(), c = G(e, {
    relative: h
  });
  return w.useCallback((u) => {
    if (jt(u, n)) {
      u.preventDefault();
      let f = a !== void 0 ? a : de(s) === de(c);
      l(e, {
        replace: f,
        state: i,
        preventScrollReset: d,
        relative: h,
        viewTransition: o
      });
    }
  }, [s, l, c, a, i, n, e, d, h, o]);
}
function zt() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let Ht = 0, Jt = () => "__" + String(++Ht) + "__";
function Gt() {
  let {
    router: e
  } = Ke(ee.UseSubmit), {
    basename: t
  } = w.useContext(T), n = Et();
  return w.useCallback(function(a, i) {
    i === void 0 && (i = {}), zt();
    let {
      action: d,
      method: h,
      encType: o,
      formData: l,
      body: s
    } = Ft(a, t);
    if (i.navigate === !1) {
      let c = i.fetcherKey || Jt();
      e.fetch(c, n, i.action || d, {
        preventScrollReset: i.preventScrollReset,
        formData: l,
        body: s,
        formMethod: i.method || h,
        formEncType: i.encType || o,
        flushSync: i.flushSync
      });
    } else
      e.navigate(i.action || d, {
        preventScrollReset: i.preventScrollReset,
        formData: l,
        body: s,
        formMethod: i.method || h,
        formEncType: i.encType || o,
        replace: i.replace,
        state: i.state,
        fromRouteId: n,
        flushSync: i.flushSync,
        viewTransition: i.viewTransition
      });
  }, [e, t, n]);
}
function Yt(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    basename: a
  } = w.useContext(T), i = w.useContext(z);
  i || (process.env.NODE_ENV !== "production" ? A(!1, "useFormAction must be used inside a RouteContext") : A(!1));
  let [d] = i.matches.slice(-1), h = W({}, G(e || ".", {
    relative: n
  })), o = J();
  if (e == null) {
    h.search = o.search;
    let l = new URLSearchParams(h.search), s = l.getAll("index");
    if (s.some((u) => u === "")) {
      l.delete("index"), s.filter((f) => f).forEach((f) => l.append("index", f));
      let u = l.toString();
      h.search = u ? "?" + u : "";
    }
  }
  return (!e || e === ".") && d.route.index && (h.search = h.search ? h.search.replace(/^\?/, "?index&") : "?index"), a !== "/" && (h.pathname = h.pathname === "/" ? a : pe([a, h.pathname])), de(h);
}
function Zt(e, t) {
  t === void 0 && (t = {});
  let n = w.useContext(qe);
  n == null && (process.env.NODE_ENV !== "production" ? A(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : A(!1));
  let {
    basename: a
  } = Ke(ee.useViewTransitionState), i = G(e, {
    relative: t.relative
  });
  if (!n.isTransitioning)
    return !1;
  let d = M(n.currentLocation.pathname, a) || n.currentLocation.pathname, h = M(n.nextLocation.pathname, a) || n.nextLocation.pathname;
  return Ee(i.pathname, h) != null || Ee(i.pathname, d) != null;
}
function Xt(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
class Qt {
  /**
   * @param {TableLinkConfig} tableLink
   */
  constructor(t = {}) {
    if (!t.link)
      throw new Error("TableLinkObject requires `link` (base route).");
    this.id = t.id ?? k("table-link"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = t.link;
    const n = { iconClass: "fa-solid fa-user" }, a = { iconClass: "fa-solid fa-arrow-down" };
    this.icon = t.icon instanceof L ? t.icon : new L(t.icon || n), this.sort = t.sort instanceof L ? t.sort : new L(t.sort || a);
  }
}
function It(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function fn({ tableLink: e, output: t }) {
  if (!e || !(e instanceof Qt))
    throw new Error(
      "AlloyTableLink requires `tableLink` (TableLinkObject instance)."
    );
  const n = j(e.id), [a, i] = B({ col: "", dir: "asc" }), d = F(
    () => It(e.rows),
    [e.rows]
  ), h = (o) => {
    if (!o) return;
    const l = a.col === o && a.dir === "asc" ? "desc" : "asc";
    i({ col: o, dir: l }), t == null || t({
      type: "column",
      name: o,
      dir: l
    });
  };
  return /* @__PURE__ */ v("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ r("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ v("tr", { children: [
      /* @__PURE__ */ r("th", { scope: "col", children: "Type" }),
      d.map((o) => {
        const l = a.col === o, s = l && a.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ v(
          "span",
          {
            onClick: () => h(o),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              Xt(o),
              l && /* @__PURE__ */ r(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: s ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: s ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ r(R, { icon: e.sort })
                }
              )
            ]
          }
        ) }, o);
      })
    ] }) }),
    /* @__PURE__ */ r("tbody", { children: e.rows.length > 0 ? e.rows.map((o, l) => {
      const s = (o == null ? void 0 : o.id) ?? l, u = `${e.link.endsWith("/") ? e.link.slice(0, -1) : e.link}/${s}`;
      return /* @__PURE__ */ v("tr", { children: [
        /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(R, { icon: e.icon }) }),
        d.map((f) => /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(
          D,
          {
            to: u,
            className: "text-decoration-none",
            onClick: () => t == null ? void 0 : t({
              type: "navigate",
              to: u,
              id: s
            }),
            children: /* @__PURE__ */ r("span", { children: o == null ? void 0 : o[f] })
          }
        ) }, `${s}-${f}`))
      ] }, s);
    }) : /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r(
      "td",
      {
        colSpan: Math.max(1, d.length) + 1,
        className: "text-center text-secondary",
        children: "No rows"
      }
    ) }) })
  ] });
}
function en(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
function tn(e) {
  if (!Array.isArray(e) || e.length === 0) return [];
  const t = e[0] ?? {};
  return Object.keys(t).filter((n) => n !== "id");
}
class nn {
  /**
   * @param {Object} cfg
   */
  constructor(t = {}) {
    this.id = t.id ?? k("table-action"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = typeof t.link == "string" ? t.link : "";
    const n = new L({ iconClass: "fa-solid fa-user" }), a = new L({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = t.icon instanceof L ? t.icon : new L(t.icon || n), this.sort = t.sort instanceof L ? t.sort : new L(t.sort || a), this.actions = t.actions ? t.actions instanceof $ ? t.actions : new $(t.actions) : void 0;
  }
}
function pn({ tableAction: e, output: t }) {
  if (!e || !(e instanceof nn))
    throw new Error(
      "AlloyTableAction requires `tableAction` (TableActionObject instance)."
    );
  const n = j(e.id), a = F(
    () => tn(e.rows),
    [e.rows]
  ), [i, d] = B({ col: "", dir: "asc" });
  function h(s) {
    const c = i.col === s && i.dir === "asc" ? "desc" : "asc";
    d({ col: s, dir: c }), t == null || t({
      type: "column",
      name: s,
      dir: c
    });
  }
  function o(s) {
    return (c, u) => {
      var f;
      t == null || t({
        type: "action",
        action: {
          id: c == null ? void 0 : c.id,
          name: c == null ? void 0 : c.name,
          className: c == null ? void 0 : c.className,
          active: c == null ? void 0 : c.active,
          disabled: !!(c != null && c.disabled),
          title: c == null ? void 0 : c.title,
          ariaLabel: c == null ? void 0 : c.ariaLabel,
          tabIndex: c == null ? void 0 : c.tabIndex,
          iconClass: (f = c == null ? void 0 : c.icon) == null ? void 0 : f.iconClass
        },
        row: s
      });
    };
  }
  const l = !!e.actions;
  return /* @__PURE__ */ v("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ r("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ v("tr", { children: [
      /* @__PURE__ */ r("th", { scope: "col", children: "Type" }),
      a.map((s) => {
        const c = i.col === s, u = c && i.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ v(
          "span",
          {
            onClick: () => h(s),
            style: { userSelect: "none" },
            children: [
              en(s),
              c && /* @__PURE__ */ r(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: u ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: u ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ r(R, { icon: e.sort })
                }
              )
            ]
          }
        ) }, `h-${s}`);
      }),
      l && /* @__PURE__ */ r("th", { scope: "col", className: "text-end", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ r("tbody", { children: e.rows.length > 0 ? e.rows.map((s, c) => {
      const u = (s == null ? void 0 : s.id) ?? c, f = e.actions;
      return /* @__PURE__ */ v("tr", { children: [
        /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(R, { icon: e.icon }) }),
        a.map((y) => {
          const m = e.link || "", C = m.endsWith("/") ? m.slice(0, -1) : m, b = C ? `${C}/${u}` : "";
          return /* @__PURE__ */ r("td", { children: C ? /* @__PURE__ */ r(
            D,
            {
              to: b,
              onClick: () => t == null ? void 0 : t({
                type: "navigate",
                to: b,
                id: u,
                row: s
              }),
              className: "text-decoration-none",
              children: /* @__PURE__ */ r("span", { children: s == null ? void 0 : s[y] })
            }
          ) : /* @__PURE__ */ r("span", { children: s == null ? void 0 : s[y] }) }, `${u}-${y}`);
        }),
        l && /* @__PURE__ */ r("td", { className: "text-end", children: /* @__PURE__ */ r(
          ne,
          {
            buttonBar: f,
            output: o(s)
          }
        ) })
      ] }, u);
    }) : /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r(
      "td",
      {
        colSpan: (
          // icon col + data cols (+ actions col if present)
          1 + a.length + (l ? 1 : 0)
        ),
        className: "text-center text-secondary",
        children: "No rows"
      }
    ) }) })
  ] });
}
class Me {
  /**
   * @param {Object} card
   * @param {string} [card.id]                - DOM id for the card wrapper
   * @param {string} [card.className]         - wrapper classes (outer .card)
   * @param {string} [card.link]              - optional href/route; used to wrap ONLY the body
   * @param {TagObject|Object} [card.header]  - optional top section (className defaults "card-header")
   * @param {TagObject|Object} card.body      - REQUIRED main content section (className defaults "card-body")
   * @param {TagObject|Object} [card.footer]  - optional bottom section (className defaults "card-footer")
   * @param {Array<TagObject|Object>} [card.fields] - optional array of content blocks inside body
   */
  constructor(t = {}) {
    if (!t.body)
      throw new Error("CardObject requires `body`.");
    if (this.id = t.id ?? k("card"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "", t.header instanceof N)
      this.header = t.header;
    else if (t.header) {
      const a = new N(t.header);
      a.className = a.className || "card-header", this.header = a;
    } else
      this.header = void 0;
    if (t.body instanceof N)
      this.body = t.body;
    else {
      const a = new N(t.body);
      a.className = a.className || "card-body", this.body = a;
    }
    if (t.footer instanceof N)
      this.footer = t.footer;
    else if (t.footer) {
      const a = new N(t.footer);
      a.className = a.className || "card-footer", this.footer = a;
    } else
      this.footer = void 0;
    const n = Array.isArray(t.fields) ? t.fields : [];
    this.fields = n.map((a) => a instanceof N ? a : new N(a || {}));
  }
}
function yn({ card: e }) {
  var d;
  if (!e || !(e instanceof Me))
    throw new Error("AlloyCard requires `card` (CardObject instance).");
  const t = e.header ? /* @__PURE__ */ r(
    "div",
    {
      id: e.header.id,
      className: e.header.className || "card-header",
      "aria-label": e.header.name,
      children: e.header.name
    }
  ) : null, n = /* @__PURE__ */ v(
    "div",
    {
      id: e.body.id,
      className: e.body.className || "card-body",
      "aria-label": e.body.name,
      children: [
        e.body.name && /* @__PURE__ */ r("div", { className: "mb-2", children: e.body.name }),
        e.fields.map((h) => /* @__PURE__ */ r(
          "div",
          {
            id: h.id,
            className: h.className,
            "aria-label": h.name,
            children: h.name
          },
          h.id
        ))
      ]
    }
  ), a = e.link ? /* @__PURE__ */ r(
    D,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (d = e.body) == null ? void 0 : d.name,
      children: n
    }
  ) : n, i = e.footer ? /* @__PURE__ */ r(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer",
      "aria-label": e.footer.name,
      children: e.footer.name
    }
  ) : null;
  return /* @__PURE__ */ v("div", { id: e.id, className: e.className, children: [
    t,
    a,
    i
  ] });
}
class an extends Me {
  constructor(t = {}) {
    if (super(t), !t.icon)
      throw new Error("CardIconObject requires `icon`.");
    this.icon = t.icon instanceof L ? t.icon : new L(t.icon), this.iconClass = t.iconClass ?? "col-4 d-flex align-items-start justify-content-center text-warning fs-2", this.textClass = t.textClass ?? "col-8";
  }
}
function vn({ cardIcon: e }) {
  var d, h, o, l;
  if (!e || !(e instanceof an))
    throw new Error(
      "AlloyCardIcon requires `cardIcon` (CardIconObject instance)."
    );
  const t = (d = e.header) != null && d.name ? /* @__PURE__ */ r(
    "div",
    {
      id: e.header.id,
      className: e.header.className,
      children: e.header.name
    }
  ) : null, n = /* @__PURE__ */ r(
    "div",
    {
      id: e.body.id,
      className: e.body.className,
      "aria-label": e.body.name,
      children: /* @__PURE__ */ v("div", { className: "row m-0", children: [
        /* @__PURE__ */ r("div", { className: e.iconClass, children: /* @__PURE__ */ r(R, { icon: e.icon }) }),
        /* @__PURE__ */ v("div", { className: e.textClass, children: [
          (h = e.body) != null && h.name ? /* @__PURE__ */ r("div", { className: "mb-1 fw-semibold", children: e.body.name }) : null,
          e.fields.map(
            (s) => s != null && s.name ? /* @__PURE__ */ r(
              "div",
              {
                id: s.id,
                className: s.className,
                children: s.name
              },
              s.id
            ) : null
          )
        ] })
      ] })
    }
  ), a = e.link ? /* @__PURE__ */ r(
    D,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (o = e.body) == null ? void 0 : o.name,
      children: n
    }
  ) : n, i = (l = e.footer) != null && l.name ? /* @__PURE__ */ r(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className,
      children: e.footer.name
    }
  ) : null;
  return /* @__PURE__ */ v(
    "div",
    {
      id: e.id,
      className: e.className,
      children: [
        t,
        a,
        i
      ]
    }
  );
}
class Oe {
  constructor(t = {}) {
    this.id = t.id ?? k("logo"), this.imageUrl = t.imageUrl ?? "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png", this.alt = t.alt ?? "Alloymobile", this.width = t.width ?? "72px", this.height = t.height ?? "auto";
  }
}
class We {
  constructor(t = {}) {
    this.id = t.id ?? k("card"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "", this.header = t.header instanceof N ? t.header : new N(t.header || {}), this.body = t.body instanceof N ? t.body : new N(t.body || {}), this.footer = t.footer instanceof N ? t.footer : new N(t.footer || {});
    const n = Array.isArray(t.fields) ? t.fields : [];
    this.fields = n.map(
      (a) => a instanceof N ? a : new N(a || {})
    ), this.logo = t.logo instanceof Oe ? t.logo : new Oe(t.logo || {}), this.logoClass = t.logoClass ?? "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0", this.textClass = t.textClass ?? "col-8";
  }
}
function Nn({ cardImage: e }) {
  var d, h, o, l;
  if (!(e instanceof We))
    throw new Error(
      "AlloyCardImage requires `cardImage` (CardImageObject instance)."
    );
  const t = (d = e.header) != null && d.name ? /* @__PURE__ */ r(
    "div",
    {
      id: e.header.id,
      className: e.header.className || "card-header py-2 fw-semibold",
      "aria-label": e.header.name,
      children: e.header.name
    }
  ) : null, n = /* @__PURE__ */ r(
    "div",
    {
      id: e.body.id,
      className: e.body.className || "card-body py-3",
      "aria-label": e.body.name,
      children: /* @__PURE__ */ v("div", { className: "row m-0", children: [
        /* @__PURE__ */ r("div", { className: e.logoClass, children: /* @__PURE__ */ r(
          "img",
          {
            src: e.logo.imageUrl,
            alt: e.logo.alt,
            style: {
              width: e.logo.width,
              height: e.logo.height,
              maxWidth: "100%",
              objectFit: "contain"
            }
          }
        ) }),
        /* @__PURE__ */ r("div", { className: e.textClass, children: /* @__PURE__ */ v("div", { className: "row p-1", children: [
          (h = e.body) != null && h.name ? /* @__PURE__ */ r("div", { className: "fw-semibold mb-1", children: e.body.name }) : null,
          e.fields.map(
            (s) => s != null && s.name ? /* @__PURE__ */ r(
              "div",
              {
                id: s.id,
                className: s.className || "",
                children: s.name
              },
              s.id ?? k("card-image-field")
            ) : null
          )
        ] }) })
      ] })
    }
  ), a = e.link ? /* @__PURE__ */ r(
    D,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (o = e.body) == null ? void 0 : o.name,
      children: n
    }
  ) : n, i = (l = e.footer) != null && l.name ? /* @__PURE__ */ r(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer small text-muted py-2",
      "aria-label": e.footer.name,
      children: e.footer.name
    }
  ) : null;
  return /* @__PURE__ */ v(
    "div",
    {
      id: e.id,
      className: e.className,
      children: [
        t,
        a,
        i
      ]
    }
  );
}
class sn {
  constructor(t = {}) {
    this.id = t.id ?? k("card-action"), this.className = t.className ?? "card border m-2 shadow", this.link = t.link ?? "";
    const n = t.header ?? {};
    this.header = n instanceof N ? n : new N(n);
    const a = t.body ?? {};
    this.body = a instanceof N ? a : new N(a);
    const i = Array.isArray(t.fields) ? t.fields : [];
    this.fields = i.map(
      (o) => o instanceof N ? o : new N(o || {})
    );
    const d = t.footer ?? {};
    this.footer = d instanceof N ? d : new N(d), this.type = t.type ?? "AlloyButtonBar";
    const h = t.action;
    this.type === "AlloyLinkBar" ? this.action = h instanceof U ? h : h ? new U(h) : void 0 : this.action = h instanceof $ ? h : h ? new $(h) : void 0;
  }
}
function wn({ cardAction: e, output: t }) {
  var o, l;
  if (!e || !(e instanceof sn))
    throw new Error(
      "AlloyCardAction requires `cardAction` (CardActionObject instance)."
    );
  function n(s, c) {
    var u;
    t == null || t({
      type: "action",
      action: {
        id: s == null ? void 0 : s.id,
        name: s == null ? void 0 : s.name,
        className: s == null ? void 0 : s.className,
        active: s == null ? void 0 : s.active,
        disabled: (s == null ? void 0 : s.disabled) ?? !1,
        title: s == null ? void 0 : s.title,
        ariaLabel: s == null ? void 0 : s.ariaLabel,
        tabIndex: s == null ? void 0 : s.tabIndex,
        iconClass: (u = s == null ? void 0 : s.icon) == null ? void 0 : u.iconClass,
        href: s == null ? void 0 : s.href
      },
      card: {
        id: e.id
      }
    });
  }
  const a = (o = e.header) != null && o.name ? /* @__PURE__ */ r(
    "div",
    {
      id: e.header.id,
      className: e.header.className ?? "card-header py-2 fw-semibold",
      children: e.header.name
    }
  ) : null, i = /* @__PURE__ */ v(
    "div",
    {
      id: e.body.id,
      className: e.body.className ?? "card-body",
      children: [
        e.body.name ? /* @__PURE__ */ r("div", { className: "fw-semibold mb-1", children: e.body.name }) : null,
        e.fields.map(
          (s) => s != null && s.name ? /* @__PURE__ */ r(
            "div",
            {
              id: s.id,
              className: s.className ?? "",
              children: s.name
            },
            s.id ?? k("card-field")
          ) : null
        )
      ]
    }
  ), d = e.link ? /* @__PURE__ */ r(
    D,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (l = e.body) == null ? void 0 : l.name,
      children: i
    }
  ) : i, h = /* @__PURE__ */ v(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className ?? "card-footer d-flex align-items-center gap-2 py-2",
      children: [
        e.footer.name ? /* @__PURE__ */ r("div", { className: "me-auto small text-muted", children: e.footer.name }) : null,
        e.action ? e.type === "AlloyLinkBar" ? /* @__PURE__ */ r(te, { linkBar: e.action, output: n }) : /* @__PURE__ */ r(
          ne,
          {
            buttonBar: e.action,
            output: n
          }
        ) : null
      ]
    }
  );
  return /* @__PURE__ */ v(
    "div",
    {
      id: e.id,
      className: e.className ?? "card border m-2 shadow",
      children: [
        a,
        d,
        h
      ]
    }
  );
}
class rn {
  /**
   * @param {CardIconActionConfig} card = {}
   */
  constructor(t = {}) {
    this.id = t.id ?? k("card-icon-action"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "";
    const n = t.header ?? {};
    this.header = n instanceof N ? n : new N(n);
    const a = t.body ?? {};
    this.body = a instanceof N ? a : new N(a);
    const i = Array.isArray(t.fields) ? t.fields : [];
    this.fields = i.map(
      (o) => o instanceof N ? o : new N(o || {})
    );
    const d = t.footer ?? {};
    this.footer = d instanceof N ? d : new N(d);
    const h = new L({ iconClass: "fa-solid fa-user fa-2xl" });
    this.icon = t.icon instanceof L ? t.icon : new L(t.icon || { iconClass: h.iconClass }), this.iconClass = t.iconClass ?? "col-3 d-flex align-items-center justify-content-center rounded-circle bg-warning text-white mb-0", this.textClass = t.textClass ?? "col-9", this.type = t.type ?? "AlloyButtonBar", this.type === "AlloyLinkBar" ? this.action = t.action instanceof U ? t.action : new U(t.action || {}) : this.action = t.action instanceof $ ? t.action : new $(t.action || {});
  }
}
function gn({ cardIconAction: e, output: t }) {
  var l, s;
  if (!e || !(e instanceof rn))
    throw new Error(
      "AlloyCardIconAction requires `cardIconAction` (CardIconActionObject instance)."
    );
  function n() {
    return (c, u) => {
      var f;
      t == null || t({
        type: "action",
        action: {
          id: c == null ? void 0 : c.id,
          name: c == null ? void 0 : c.name,
          title: c == null ? void 0 : c.title,
          href: c == null ? void 0 : c.href,
          className: c == null ? void 0 : c.className,
          iconClass: (f = c == null ? void 0 : c.icon) == null ? void 0 : f.iconClass,
          active: c == null ? void 0 : c.active,
          disabled: !!(c != null && c.disabled),
          ariaLabel: c == null ? void 0 : c.ariaLabel,
          tabIndex: c == null ? void 0 : c.tabIndex
        },
        card: {
          id: e.id
        }
      });
    };
  }
  const a = (l = e.header) != null && l.name ? /* @__PURE__ */ r(
    "div",
    {
      id: e.header.id,
      className: e.header.className || "card-header py-2 fw-semibold",
      "aria-label": e.header.name,
      children: e.header.name
    }
  ) : null, i = /* @__PURE__ */ r(
    "div",
    {
      id: e.body.id,
      className: e.body.className || "card-body",
      "aria-label": e.body.name,
      children: /* @__PURE__ */ v("div", { className: "row m-0", children: [
        /* @__PURE__ */ r("div", { className: e.iconClass, children: /* @__PURE__ */ r(R, { icon: e.icon }) }),
        /* @__PURE__ */ r("div", { className: e.textClass, children: /* @__PURE__ */ r("div", { className: "row p-1", children: e.fields.map(
          (c) => c != null && c.name ? /* @__PURE__ */ r(
            "div",
            {
              id: c.id,
              className: c.className,
              children: c.name
            },
            c.id ?? k("card-icon-action-field")
          ) : null
        ) }) })
      ] })
    }
  ), d = e.link ? /* @__PURE__ */ r(
    D,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (s = e.body) == null ? void 0 : s.name,
      children: i
    }
  ) : i, h = e.type === "AlloyLinkBar" ? /* @__PURE__ */ r(
    te,
    {
      linkBar: e.action,
      output: n()
    }
  ) : /* @__PURE__ */ r(
    ne,
    {
      buttonBar: e.action,
      output: n()
    }
  ), o = /* @__PURE__ */ v(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      "aria-label": e.footer.name,
      children: [
        /* @__PURE__ */ r("div", { className: "me-auto", children: e.footer.name ? e.footer.name : null }),
        /* @__PURE__ */ r("div", { role: "group", children: h })
      ]
    }
  );
  return /* @__PURE__ */ v(
    "div",
    {
      id: e.id,
      className: e.className,
      children: [
        a,
        d,
        o
      ]
    }
  );
}
class on extends We {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *
   *   link?: string,               // we keep it in the model - only body clickable
   *
   *   header?: TagObject|object,
   *   body?: TagObject|object,     // required-ish
   *   fields?: Array<TagObject|object>,
   *   footer?: TagObject|object,   // required-ish
   *
   *   logo?: object,
   *   logoClass?: string,
   *   textClass?: string,
   *
   *   type?: "AlloyButtonBar"|"AlloyLinkBar",
   *   action?: object
   * }=} res
   */
  constructor(t = {}) {
    super(t), this.header = t.header instanceof N ? t.header : new N(
      t.header || {
        className: "card-header py-2 fw-semibold",
        name: ""
      }
    ), this.body = t.body instanceof N ? t.body : new N(
      t.body || {
        className: "card-body d-flex align-items-center",
        name: "Card Body"
      }
    );
    const n = Array.isArray(t.fields) ? t.fields : [];
    switch (this.fields = n.map(
      (a, i) => a instanceof N ? a : new N({
        id: (a == null ? void 0 : a.id) || `field_${i + 1}`,
        className: (a == null ? void 0 : a.className) ?? "",
        name: (a == null ? void 0 : a.name) ?? ""
      })
    ), this.footer = t.footer instanceof N ? t.footer : new N(
      t.footer || {
        className: "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
        name: "Footer"
      }
    ), this.type = t.type ?? "AlloyButtonBar", this.type) {
      case "AlloyLinkBar": {
        this.action = t.action instanceof U ? t.action : new U(
          t.action || {
            className: "nav gap-2",
            linkClass: "nav-item",
            barName: { show: !1 },
            type: "AlloyLink",
            links: []
          }
        );
        break;
      }
      case "AlloyButtonBar":
      default: {
        this.type = "AlloyButtonBar", this.action = t.action instanceof $ ? t.action : new $(
          t.action || {
            className: "nav gap-2",
            buttonClass: "nav-item",
            barName: { show: !1 },
            type: "AlloyButton",
            buttons: []
          }
        );
        break;
      }
    }
  }
}
function bn({ cardImageAction: e, output: t }) {
  var l, s, c, u, f, y;
  if (!e || !(e instanceof on))
    throw new Error(
      "AlloyCardImageAction requires `cardImageAction` (CardImageActionObject instance)."
    );
  function n() {
    return (m, C) => {
      var b, O;
      t == null || t({
        type: "action",
        action: {
          id: m == null ? void 0 : m.id,
          name: m == null ? void 0 : m.name,
          title: m == null ? void 0 : m.title,
          href: m == null ? void 0 : m.href,
          className: m == null ? void 0 : m.className,
          iconClass: (b = m == null ? void 0 : m.icon) == null ? void 0 : b.iconClass,
          active: m == null ? void 0 : m.active,
          disabled: !!(m != null && m.disabled),
          ariaLabel: m == null ? void 0 : m.ariaLabel,
          tabIndex: m == null ? void 0 : m.tabIndex
        },
        card: {
          id: e.id,
          bodyId: (O = e.body) == null ? void 0 : O.id
        }
      });
    };
  }
  const i = e.header && ((l = e.header.name) == null ? void 0 : l.trim()) ? /* @__PURE__ */ r(
    "div",
    {
      id: e.header.id,
      className: e.header.className || "card-header py-2 fw-semibold",
      "aria-label": e.header.name,
      children: e.header.name
    }
  ) : null, d = /* @__PURE__ */ r(
    "div",
    {
      id: e.body.id,
      className: e.body.className || "card-body d-flex align-items-center",
      "aria-label": e.body.name,
      children: /* @__PURE__ */ v("div", { className: "row m-0", children: [
        /* @__PURE__ */ r("div", { className: e.logoClass, children: /* @__PURE__ */ r(
          "img",
          {
            src: (s = e.logo) == null ? void 0 : s.imageUrl,
            alt: (c = e.logo) == null ? void 0 : c.alt,
            style: {
              width: (u = e.logo) == null ? void 0 : u.width,
              height: (f = e.logo) == null ? void 0 : f.height,
              maxWidth: "100%",
              objectFit: "contain"
            }
          }
        ) }),
        /* @__PURE__ */ r("div", { className: e.textClass, children: /* @__PURE__ */ r("div", { className: "row p-1", children: e.fields.map(
          (m) => m != null && m.name ? /* @__PURE__ */ r(
            "div",
            {
              id: m.id,
              className: m.className,
              children: m.name
            },
            m.id
          ) : null
        ) }) })
      ] })
    }
  ), h = e.link ? /* @__PURE__ */ r(
    D,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (y = e.body) == null ? void 0 : y.name,
      children: d
    }
  ) : d, o = /* @__PURE__ */ v(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      "aria-label": e.footer.name,
      children: [
        /* @__PURE__ */ r("div", { className: "flex-grow-1", children: e.footer.name }),
        /* @__PURE__ */ r("div", { role: "group", children: e.type === "AlloyLinkBar" ? /* @__PURE__ */ r(
          te,
          {
            linkBar: e.action,
            output: n()
          }
        ) : /* @__PURE__ */ r(
          ne,
          {
            buttonBar: e.action,
            output: n()
          }
        ) })
      ]
    }
  );
  return /* @__PURE__ */ v(
    "div",
    {
      id: e.id,
      className: e.className,
      children: [
        i,
        h,
        o
      ]
    }
  );
}
let Be = 0;
function ln() {
  return Be += 1, `alloyform${Be}`;
}
class ke {
  constructor(t = {}) {
    this.id = t.id ?? ln(), this.title = t.title ?? "AlloyMobile", this.className = t.className ?? "col m-2", this.message = t.message ?? "", this.action = t.action ?? "", this.type = t.type ?? "AlloyInputTextIcon", this.submit = t.submit instanceof I ? t.submit : new I(
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
    const n = Array.isArray(t.fields) ? t.fields : [];
    this.fields = n.map(
      (a) => a instanceof ge ? a : new ge(a)
    ), this.data = t.data ?? {};
  }
}
function Ae(e, t, n) {
  let a = !0;
  const i = [];
  if (e.required && (e.type === "checkbox" ? (Array.isArray(t) ? t : []).length === 0 && (a = !1, i.push("This field is required.")) : (t === "" || t === !1 || t === void 0 || t === null) && (a = !1, i.push("This field is required."))), a && typeof e.minLength == "number" && typeof t == "string" && t.length < e.minLength && (a = !1, i.push(`Minimum length is ${e.minLength}`)), a && typeof e.maxLength == "number" && typeof t == "string" && t.length > e.maxLength && (a = !1, i.push(`Maximum length is ${e.maxLength}`)), a && e.pattern && typeof t == "string" && !new RegExp(e.pattern).test(t) && (a = !1, i.push("Invalid format.")), a && e.passwordStrength && typeof t == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(t) || (a = !1, i.push("Password is too weak."))), a && e.matchWith) {
    const d = e.matchWith;
    n[d] !== t && (a = !1, i.push("Values do not match."));
  }
  return {
    valid: a,
    error: !a,
    errors: i
  };
}
function xn({ form: e, output: t }) {
  const n = e instanceof ke ? e : new ke(e || {});
  if (!n || !Array.isArray(n.fields) || !(n.submit instanceof I))
    throw new Error(
      "AlloyForm could not hydrate a valid FormObject (missing fields[] or submit)."
    );
  const [a, i] = B(() => {
    const u = {}, f = {};
    return n.fields.forEach((y) => {
      f[y.name] = y.value;
    }), n.fields.forEach((y) => {
      const m = y.value, { valid: C, error: b, errors: O } = Ae(y, m, f);
      u[y.name] = {
        value: m,
        valid: C,
        error: b,
        errors: O
      };
    }), u;
  }), d = j(null), h = Je(
    (u) => {
      const f = {};
      Object.keys(u).forEach((m) => {
        f[m] = u[m].value;
      });
      const y = {};
      return n.fields.forEach((m) => {
        const C = f[m.name], { valid: b, error: O, errors: E } = Ae(
          m,
          C,
          f
        );
        y[m.name] = {
          value: C,
          valid: b,
          error: O,
          errors: E
        };
      }), y;
    },
    [n.fields]
  );
  function o(u) {
    if (!u || !u.name) return;
    const { name: f, value: y } = u;
    i((m) => {
      const C = { ...m };
      return C[f] = {
        ...m[f],
        value: y
      }, h(C);
    });
  }
  const l = F(() => {
    const u = {};
    return Object.keys(a).forEach((f) => {
      u[f] = a[f].value;
    }), u;
  }, [a]), s = F(() => Object.values(a).some(
    (u) => u.error || !u.valid
  ), [a]);
  function c(u, f) {
    const y = {
      ...l,
      action: n.action
    };
    n.data = y, n.message = "", t == null || t(y);
  }
  return n.submit.disabled = s || !!n.submit.loading, /* @__PURE__ */ r("div", { className: "row", children: /* @__PURE__ */ r("div", { className: n.className, children: /* @__PURE__ */ v("div", { className: "text-center", children: [
    /* @__PURE__ */ r("h3", { children: n.title }),
    n.message !== "" && /* @__PURE__ */ r("div", { className: "alert alert-text-danger m-0 p-0", children: n.message }),
    n.fields.map((u) => /* @__PURE__ */ r(
      st,
      {
        input: u,
        output: o
      },
      u.id
    )),
    /* @__PURE__ */ r(
      at,
      {
        ref: d,
        buttonSubmit: n.submit,
        output: c
      }
    )
  ] }) }) });
}
export {
  et as AlloyButton,
  ne as AlloyButtonBar,
  nt as AlloyButtonIcon,
  at as AlloyButtonSubmit,
  yn as AlloyCard,
  wn as AlloyCardAction,
  vn as AlloyCardIcon,
  gn as AlloyCardIconAction,
  Nn as AlloyCardImage,
  bn as AlloyCardImageAction,
  xn as AlloyForm,
  R as AlloyIcon,
  st as AlloyInput,
  Ye as AlloyLink,
  te as AlloyLinkBar,
  Xe as AlloyLinkIcon,
  je as AlloyLinkLogo,
  un as AlloyNavBar,
  mn as AlloyTable,
  pn as AlloyTableAction,
  fn as AlloyTableLink,
  $ as ButtonBarObject,
  K as ButtonIconObject,
  q as ButtonObject,
  I as ButtonSubmitObject,
  sn as CardActionObject,
  rn as CardIconActionObject,
  an as CardIconObject,
  on as CardImageActionObject,
  We as CardImageObject,
  Me as CardObject,
  ke as FormObject,
  L as IconObject,
  ge as InputObject,
  U as LinkBarObject,
  V as LinkIconObject,
  P as LinkLogoObject,
  _ as LinkObject,
  rt as NavBarObject,
  nn as TableActionObject,
  Qt as TableLinkObject,
  lt as TableObject
};
//# sourceMappingURL=alloy-react.es.js.map
