import { jsx as r, jsxs as p } from "react/jsx-runtime";
import * as w from "react";
import { useRef as R, useState as k, useMemo as D, forwardRef as ue, useImperativeHandle as fe, useEffect as ne, useCallback as He } from "react";
import "react-dom";
function B(e = "id") {
  const t = Date.now(), n = Math.random().toString(36).slice(2, 7);
  return `${e}-${t}-${n}`;
}
class v {
  constructor(t = {}) {
    const { id: n, name: a, className: i } = t;
    this.id = n ?? B("tag"), this.name = a ?? "", this.className = i ?? "";
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
    this.id = t.id ?? B("icon"), this.iconClass = t.iconClass;
  }
}
function S({ icon: e }) {
  if (!e) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ r("i", { id: e.id, className: e.iconClass, "aria-hidden": "true" });
}
function Je(e = "", t = "") {
  const [n, a] = k(!1), [i, c] = k(!1), [h, o] = k(!1);
  return {
    className: D(() => [e, (n || i || h) && t].filter(Boolean).join(" "), [e, t, n, i, h]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), c(!1);
      },
      onMouseDown: () => c(!0),
      onMouseUp: () => c(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class V {
  /**
   * @param {LinkConfig} link
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkObject requires `href`.");
    if (!t.name)
      throw new Error("LinkObject requires `name`.");
    this.id = t.id ?? B("link"), this.name = t.name, this.href = t.href, this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function Ge({ link: e }) {
  if (!e || !(e instanceof V))
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  const t = R(e.id), { className: n, events: a } = Je(e.className, e.active), i = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel;
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
function Ye(e = "", t = "") {
  const [n, a] = k(!1), [i, c] = k(!1), [h, o] = k(!1);
  return {
    className: D(() => [e, (n || i || h) && t].filter(Boolean).join(" "), [e, t, n, i, h]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), c(!1);
      },
      onMouseDown: () => c(!0),
      onMouseUp: () => c(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class q {
  /**
   * @param {LinkIconConfig} linkIcon
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkIconObject requires `href`.");
    if (!t.icon)
      throw new Error("LinkIconObject requires `icon`.");
    const n = t.icon instanceof L ? t.icon : new L(t.icon);
    this.id = t.id ?? B("link-icon"), this.href = t.href, this.icon = n, this.name = t.name, this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function Ze({ linkIcon: e }) {
  if (!e || !(e instanceof q))
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  const t = R(e.id), { className: n, events: a } = Ye(
    e.className,
    e.active
  ), i = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, c = !!e.name;
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
      children: /* @__PURE__ */ p("span", { className: "d-inline-flex align-items-center", children: [
        /* @__PURE__ */ r(S, { icon: e.icon }),
        c && /* @__PURE__ */ r("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
function Xe(e = "", t = "") {
  const [n, a] = k(!1), [i, c] = k(!1), [h, o] = k(!1);
  return {
    className: D(() => [e, (n || i || h) && t].filter(Boolean).join(" "), [e, t, n, i, h]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), c(!1);
      },
      onMouseDown: () => c(!0),
      onMouseUp: () => c(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class _ {
  /**
   * @param {LinkLogoConfig} linkLogo
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkLogoObject requires `href`.");
    if (!t.logo)
      throw new Error("LinkLogoObject requires `logo`.");
    this.id = t.id ?? B("link-logo"), this.name = t.name, this.href = t.href, this.logo = t.logo, this.width = t.width, this.height = t.height, this.logoAlt = t.logoAlt ?? t.name ?? "", this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function Ae({ linkLogo: e }) {
  if (!e || !(e instanceof _))
    throw new Error(
      "AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance)."
    );
  const t = R(e.id), { className: n, events: a } = Xe(
    e.className,
    e.active
  ), i = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, c = !!e.name;
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
      children: /* @__PURE__ */ p("span", { className: "d-inline-flex align-items-center", children: [
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
        c && /* @__PURE__ */ r("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
function Qe(e = "", t = "") {
  const [n, a] = k(!1), [i, c] = k(!1), [h, o] = k(!1);
  return {
    className: D(() => [e, (n || i || h) && t].filter(Boolean).join(" "), [e, t, n, i, h]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), c(!1);
      },
      onMouseDown: () => c(!0),
      onMouseUp: () => c(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class K {
  /**
   * @param {ButtonConfig} button
   */
  constructor(t = {}) {
    if (!t.name)
      throw new Error("ButtonObject requires `name`.");
    this.id = t.id ?? B("btn"), this.name = t.name, this.className = t.className ?? "", this.active = t.active ?? "btn btn-primary", this.disabled = !!t.disabled, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const Ie = ue(function({ button: t, output: n }, a) {
  if (!t || !(t instanceof K))
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  const i = R(null), c = R(t.id), h = t.disabled, { className: o, events: d } = Qe(
    t.className,
    t.active
  );
  fe(
    a,
    () => ({
      el: i.current,
      model: t,
      focus: () => {
        var m;
        return (m = i.current) == null ? void 0 : m.focus();
      },
      click: () => {
        var m;
        return (m = i.current) == null ? void 0 : m.click();
      }
    }),
    [t]
  );
  const s = (m, u) => (y) => {
    u == null || u(y), n == null || n(t, y), m == null || m(y, t);
  }, l = {
    onClick: s(t.onClick),
    onKeyDown: s(t.onKeyDown, d.onFocus),
    onKeyUp: s(t.onKeyUp),
    onFocus: s(t.onFocus, d.onFocus),
    onBlur: s(t.onBlur, d.onBlur),
    onMouseEnter: s(t.onMouseEnter, d.onMouseEnter),
    onMouseLeave: s(t.onMouseLeave, d.onMouseLeave),
    onMouseDown: s(void 0, d.onMouseDown),
    onMouseUp: s(void 0, d.onMouseUp)
  };
  return /* @__PURE__ */ r(
    "button",
    {
      id: c.current,
      ref: i,
      type: "button",
      className: o,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-disabled": h || void 0,
      disabled: h,
      tabIndex: t.tabIndex,
      ...l,
      children: /* @__PURE__ */ r("span", { className: "px-2 align-middle", children: t.name })
    }
  );
});
function et(e = "", t = "") {
  const [n, a] = k(!1), [i, c] = k(!1), [h, o] = k(!1);
  return {
    className: D(() => [e, (n || i || h) && t].filter(Boolean).join(" "), [e, t, n, i, h]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), c(!1);
      },
      onMouseDown: () => c(!0),
      onMouseUp: () => c(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class M {
  /**
   * @param {ButtonIconConfig} buttonIcon
   */
  constructor(t = {}) {
    if (!t.icon)
      throw new Error("ButtonIconObject requires `icon`.");
    const n = t.icon instanceof L ? t.icon : new L(t.icon);
    this.id = t.id ?? B("btn-icon"), this.name = t.name, this.icon = n, this.className = t.className ?? "btn btn-primary", this.active = t.active ?? "", this.disabled = !!t.disabled, this.title = t.title ?? t.name ?? "icon button", this.ariaLabel = t.ariaLabel ?? t.name ?? "icon button", this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const tt = ue(function({ buttonIcon: t, output: n }, a) {
  if (!t || !(t instanceof M))
    throw new Error(
      "AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance)."
    );
  const i = R(null), c = R(t.id), h = t.disabled, { className: o, events: d } = et(
    t.className,
    t.active
  );
  fe(
    a,
    () => ({
      el: i.current,
      model: t,
      focus: () => {
        var m;
        return (m = i.current) == null ? void 0 : m.focus();
      },
      click: () => {
        var m;
        return (m = i.current) == null ? void 0 : m.click();
      }
    }),
    [t]
  );
  const s = (m, u) => (y) => {
    u == null || u(y), n == null || n(t, y), m == null || m(y, t);
  }, l = {
    onClick: s(t.onClick),
    onKeyDown: s(t.onKeyDown, d.onFocus),
    onKeyUp: s(t.onKeyUp),
    onFocus: s(t.onFocus, d.onFocus),
    onBlur: s(t.onBlur, d.onBlur),
    onMouseEnter: s(t.onMouseEnter, d.onMouseEnter),
    onMouseLeave: s(t.onMouseLeave, d.onMouseLeave),
    onMouseDown: s(void 0, d.onMouseDown),
    onMouseUp: s(void 0, d.onMouseUp)
  };
  return /* @__PURE__ */ p(
    "button",
    {
      id: c.current,
      ref: i,
      type: "button",
      className: o,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-disabled": h || void 0,
      disabled: h,
      tabIndex: t.tabIndex,
      ...l,
      children: [
        /* @__PURE__ */ r("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ r(S, { icon: t.icon }) }),
        t.name ? /* @__PURE__ */ r("span", { className: "px-2 align-middle", children: t.name }) : null
      ]
    }
  );
});
class ee {
  /**
   * @param {ButtonSubmitConfig} buttonSubmit
   */
  constructor(t = {}) {
    if (!t.name)
      throw new Error("ButtonSubmitObject requires `name`.");
    if (!t.icon)
      throw new Error("ButtonSubmitObject requires `icon`.");
    const n = t.icon instanceof L ? t.icon : new L(t.icon);
    this.id = t.id ?? B("btn-submit"), this.name = t.name, this.icon = n, this.className = t.className ?? "", this.disabled = !!t.disabled, this.loading = !!t.loading, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onMouseDown = t.onMouseDown, this.onKeyDown = t.onKeyDown;
  }
}
const nt = ue(function({ buttonSubmit: t, output: n }, a) {
  if (!t || !(t instanceof ee))
    throw new Error(
      "AlloyButtonSubmit requires `buttonSubmit` (ButtonSubmitObject instance)."
    );
  const i = R(null), c = R(t.id), [h, o] = k(!!t.loading), d = R(!1);
  ne(() => {
    const g = !!t.loading;
    o(g), g || (d.current = !1);
  }, [t.loading]);
  const s = t.disabled || h;
  fe(
    a,
    () => ({
      el: i.current,
      model: t,
      focus: () => {
        var g;
        return (g = i.current) == null ? void 0 : g.focus();
      },
      click: () => {
        var g;
        return (g = i.current) == null ? void 0 : g.click();
      }
    }),
    [t]
  );
  const l = () => d.current || s ? !1 : (d.current = !0, t.loading = !0, t.disabled = !0, o(!0), !0), m = (g, O) => {
    n == null || n(t, g), O == null || O(g, t);
  }, u = (g) => {
    l() && m(g, t.onClick);
  }, y = (g) => {
    l() && m(g, t.onMouseDown);
  }, f = (g) => {
    const O = g.key;
    (O === "Enter" || O === " ") && l() && m(g, t.onKeyDown);
  }, x = h;
  return /* @__PURE__ */ p(
    "button",
    {
      id: c.current,
      ref: i,
      type: "submit",
      className: t.className,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-busy": h || void 0,
      "aria-disabled": s || void 0,
      disabled: s,
      tabIndex: t.tabIndex,
      onClick: u,
      onMouseDown: y,
      onKeyDown: f,
      children: [
        x && /* @__PURE__ */ r("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ r(S, { icon: t.icon }) }),
        /* @__PURE__ */ r("span", { className: x ? "px-2 align-middle" : "align-middle", children: t.name }),
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
      label: c = "",
      value: h,
      layout: o = "text",
      icon: d,
      placeholder: s = "",
      required: l = !1,
      minLength: m,
      maxLength: u,
      min: y,
      max: f,
      pattern: x,
      matchWith: g,
      passwordStrength: O,
      className: E,
      // NEW
      options: A = [],
      validators: N = [],
      ...b
    } = t;
    if (!a)
      throw new Error("InputObject requires `name`.");
    if ((o === "icon" || o === "floating") && !d)
      throw new Error(
        "InputObject with layout='icon' or 'floating' requires `icon`."
      );
    let C;
    typeof h < "u" ? C = h : i === "checkbox" ? C = [] : C = "";
    const F = d instanceof L ? d : d ? new L(d) : void 0;
    this.id = n ?? B("input"), this.name = a, this.type = i, this.label = c, this.value = C, this.layout = o, this.icon = F, this.placeholder = s, this.required = !!l, this.minLength = m, this.maxLength = u, this.min = y, this.max = f, this.pattern = x, this.matchWith = g, this.passwordStrength = O, typeof E == "string" && E.trim() !== "" ? this.className = E.trim() : i === "select" ? this.className = "form-select" : i === "radio" || i === "checkbox" ? this.className = "form-check-input" : this.className = "form-control", this.options = A, this.validators = N, Object.assign(this, b);
  }
}
function at({ input: e, output: t }) {
  const [n, a] = k(e.value), [i, c] = k(!1);
  ne(() => {
    a(e.value), c(!1);
  }, [
    e.value,
    e.required,
    e.minLength,
    e.maxLength,
    e.min,
    e.max,
    e.pattern,
    e.passwordStrength,
    e.matchWith,
    e.type,
    e.layout,
    e.options
  ]);
  const h = (N) => {
    const b = [], C = typeof N == "string" ? N.trim() : N;
    if (e.required) {
      const F = Array.isArray(C) && C.length === 0, J = !Array.isArray(C) && (C === "" || C === !1 || C == null);
      (F || J) && b.push("This field is required.");
    }
    return typeof C == "string" && e.minLength != null && C.length < e.minLength && b.push(`Minimum length is ${e.minLength}`), typeof C == "string" && e.maxLength != null && C.length > e.maxLength && b.push(`Maximum length is ${e.maxLength}`), typeof C == "string" && e.pattern && e.pattern !== "" && (new RegExp(e.pattern).test(C) || b.push("Invalid format.")), e.passwordStrength && typeof C == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(
      C
    ) || b.push("Password is too weak.")), b;
  }, o = h(n), d = i && o.length > 0, s = d && o.length > 0 && /* @__PURE__ */ r("div", { className: "mt-2", "aria-live": "polite", children: o.map((N, b) => /* @__PURE__ */ r(
    "div",
    {
      className: "alert alert-danger py-2 mb-2",
      role: "alert",
      children: N
    },
    b
  )) }), l = (N) => {
    const b = h(N);
    t == null || t({
      id: e.id,
      name: e.name,
      value: N,
      valid: b.length === 0,
      error: b.length > 0,
      errors: b
    });
  }, m = (N) => {
    const b = N.target.value;
    if (e.type === "checkbox") {
      const C = Array.isArray(n) ? [...n] : [], F = C.indexOf(b);
      F > -1 ? C.splice(F, 1) : C.push(b), a(C), l(C);
    } else e.type, a(b), l(b);
  }, u = {
    id: e.id,
    name: e.name,
    placeholder: e.placeholder,
    onBlur: () => c(!0),
    "aria-invalid": d || void 0
  }, y = (N) => N + (d ? " is-invalid" : ""), f = () => /* @__PURE__ */ r(
    "textarea",
    {
      ...u,
      value: n,
      onChange: m,
      className: y(e.className)
    }
  ), x = () => /* @__PURE__ */ r(
    "select",
    {
      ...u,
      value: n,
      onChange: m,
      className: y(e.className),
      children: e.options.map((N) => /* @__PURE__ */ r("option", { value: N.value, children: N.label }, N.value))
    }
  ), g = () => /* @__PURE__ */ p("div", { children: [
    e.label && /* @__PURE__ */ r("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((N, b) => /* @__PURE__ */ p("div", { className: "form-check", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "radio",
          id: `${e.id}_${b}`,
          className: y(e.className),
          name: e.name,
          value: N.value,
          checked: n === N.value,
          onChange: m,
          onBlur: () => c(!0),
          "aria-invalid": d || void 0
        }
      ),
      /* @__PURE__ */ r(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${b}`,
          children: N.label
        }
      )
    ] }, b)),
    s
  ] }), O = () => /* @__PURE__ */ p("div", { children: [
    e.label && /* @__PURE__ */ r("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((N, b) => /* @__PURE__ */ p("div", { className: "form-check", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "checkbox",
          id: `${e.id}_${b}`,
          className: y(e.className),
          name: e.name,
          value: N.value,
          checked: Array.isArray(n) && n.includes(N.value),
          onChange: m,
          onBlur: () => c(!0),
          "aria-invalid": d || void 0
        }
      ),
      /* @__PURE__ */ r(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${b}`,
          children: N.label
        }
      )
    ] }, b)),
    s
  ] }), E = () => /* @__PURE__ */ r(
    "input",
    {
      ...u,
      type: e.type,
      value: n,
      onChange: m,
      className: y(e.className)
    }
  ), A = () => {
    switch (e.type) {
      case "textarea":
        return f();
      case "select":
        return x();
      case "radio":
        return g();
      case "checkbox":
        return O();
      default:
        return E();
    }
  };
  return e.layout === "floating" ? /* @__PURE__ */ p("div", { className: "mb-3", children: [
    /* @__PURE__ */ p("div", { className: "form-floating", children: [
      A(),
      /* @__PURE__ */ p("label", { htmlFor: e.id, children: [
        e.icon && /* @__PURE__ */ r(S, { icon: e.icon }),
        e.icon && " ",
        e.label
      ] })
    ] }),
    !(e.type === "radio" || e.type === "checkbox") && s
  ] }) : e.layout === "icon" ? /* @__PURE__ */ p("div", { className: "mb-3", children: [
    e.label && /* @__PURE__ */ r("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    /* @__PURE__ */ p("div", { className: "input-group", children: [
      /* @__PURE__ */ r("span", { className: "input-group-text", children: /* @__PURE__ */ r(S, { icon: e.icon }) }),
      ["radio", "checkbox"].includes(e.type) ? A() : /* @__PURE__ */ r(
        "input",
        {
          ...u,
          type: e.type,
          value: n,
          onChange: m,
          className: y(e.className)
        }
      )
    ] }),
    !(e.type === "radio" || e.type === "checkbox") && s
  ] }) : /* @__PURE__ */ p("div", { className: "mb-3", children: [
    ["text", "textarea", "number", "email", "password", "date"].includes(
      e.type
    ) && e.label && /* @__PURE__ */ r("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    A(),
    !(e.type === "radio" || e.type === "checkbox") && s
  ] });
}
class T {
  /**
   * @param {LinkBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? B("linkBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyLink", this.linkClass = t.linkClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof v ? this.title = t.title : t.title ? this.title = new v(t.title) : this.title = new v({});
    const n = Array.isArray(t.links) ? t.links : [];
    this.type === "AlloyLinkIcon" ? this.links = n.map(
      (a) => a instanceof q ? a : new q(a)
    ) : this.type === "AlloyLinkLogo" ? this.links = n.map(
      (a) => a instanceof _ ? a : new _(a)
    ) : this.links = n.map(
      (a) => a instanceof V ? a : new V(a)
    );
  }
}
function st(e, t, n, a) {
  const i = n ? t : "";
  return e instanceof V ? new V({
    id: e.id,
    name: e.name,
    href: e.href,
    className: e.className,
    active: i,
    target: e.target,
    rel: e.rel,
    onClick: a,
    title: e.title
  }) : e instanceof q ? new q({
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
  }) : e instanceof _ ? new _({
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
function ae({ linkBar: e }) {
  if (!e || !(e instanceof T))
    throw new Error("AlloyLinkBar requires `linkBar` (LinkBarObject instance).");
  const t = R(e.id), [n, a] = k("");
  ne(() => {
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
  function c(o) {
    const d = o.onClick;
    return (s) => {
      const l = o.id || `${o.href || ""}-${o.name || ""}`;
      a(l), d == null || d(s);
    };
  }
  function h() {
    return /* @__PURE__ */ r("ul", { id: t.current, className: e.className, children: e.links.map((o, d) => {
      const s = ((o == null ? void 0 : o.id) ?? "") === n, l = st(
        o,
        e.selected,
        s,
        c(o)
      );
      switch (e.type) {
        case "AlloyLink":
          if (!(l instanceof V))
            throw new Error(
              "AlloyLinkBar (type='AlloyLink') expects each link to be a LinkObject instance."
            );
          return /* @__PURE__ */ r(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ r(Ge, { link: l })
            },
            ((o == null ? void 0 : o.id) ?? d) + "-li"
          );
        case "AlloyLinkIcon":
          if (!(l instanceof q))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkIcon') expects each link to be a LinkIconObject instance."
            );
          return /* @__PURE__ */ r(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ r(Ze, { linkIcon: l })
            },
            ((o == null ? void 0 : o.id) ?? d) + "-li"
          );
        case "AlloyLinkLogo":
          if (!(l instanceof _))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkLogo') expects each link to be a LinkLogoObject instance."
            );
          return /* @__PURE__ */ r(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ r(Ae, { linkLogo: l })
            },
            ((o == null ? void 0 : o.id) ?? d) + "-li"
          );
        default:
          throw new Error(
            `Unsupported linkBar.type "${e.type}".`
          );
      }
    }) });
  }
  return /* @__PURE__ */ p("nav", { "data-type": e.type, children: [
    /* @__PURE__ */ r(i, {}),
    h()
  ] });
}
class $ {
  /**
   * @param {ButtonBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? B("buttonBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyButton", this.buttonClass = t.buttonClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof v ? this.title = t.title : t.title ? this.title = new v(t.title) : this.title = new v({});
    const n = Array.isArray(t.buttons) ? t.buttons : [];
    this.type === "AlloyButtonIcon" ? this.buttons = n.map(
      (a) => a instanceof M ? a : new M(a)
    ) : this.buttons = n.map(
      (a) => a instanceof K ? a : new K(a)
    );
  }
}
function be(e, t, n, a, i) {
  const c = n ? t : "";
  function h(o, d) {
    if ((d == null ? void 0 : d.type) === "click") {
      const s = (o == null ? void 0 : o.id) ?? "";
      a(s);
    }
    i == null || i(o, d);
  }
  return e instanceof K ? { model: new K({
    id: e.id,
    name: e.name,
    className: e.className,
    active: c,
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
  }), onAnyEvent: h } : e instanceof M ? { model: new M({
    id: e.id,
    name: e.name,
    icon: e.icon,
    // already an IconObject (normalized in ButtonIconObject)
    className: e.className,
    active: c,
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
function se({ buttonBar: e, output: t }) {
  if (!e || !(e instanceof $))
    throw new Error(
      "AlloyButtonBar requires `buttonBar` (ButtonBarObject instance)."
    );
  const n = R(e.id), [a, i] = k("");
  ne(() => {
    i("");
  }, [e]);
  const c = () => e.title && e.title.name ? /* @__PURE__ */ r("div", { id: e.title.id, className: e.title.className, children: e.title.name }) : null;
  function h() {
    return /* @__PURE__ */ r("ul", { id: n.current, className: e.className, children: e.buttons.map((s, l) => {
      if (!(s instanceof K))
        throw new Error(
          "AlloyButtonBar (type='AlloyButton') expects ButtonObject items."
        );
      const m = ((s == null ? void 0 : s.id) ?? "") === a, { model: u, onAnyEvent: y } = be(
        s,
        e.selected,
        m,
        i,
        t
      );
      return /* @__PURE__ */ r(
        "li",
        {
          className: e.buttonClass,
          children: /* @__PURE__ */ r(Ie, { button: u, output: y })
        },
        ((s == null ? void 0 : s.id) ?? l) + "-li"
      );
    }) });
  }
  function o() {
    return /* @__PURE__ */ r("ul", { id: n.current, className: e.className, children: e.buttons.map((s, l) => {
      if (!(s instanceof M))
        throw new Error(
          "AlloyButtonBar (type='AlloyButtonIcon') expects ButtonIconObject items."
        );
      const m = ((s == null ? void 0 : s.id) ?? "") === a, { model: u, onAnyEvent: y } = be(
        s,
        e.selected,
        m,
        i,
        t
      );
      return /* @__PURE__ */ r(
        "li",
        {
          className: e.buttonClass,
          children: /* @__PURE__ */ r(tt, { buttonIcon: u, output: y })
        },
        ((s == null ? void 0 : s.id) ?? l) + "-li"
      );
    }) });
  }
  function d() {
    switch (e.type) {
      case "AlloyButtonIcon":
        return o();
      case "AlloyButton":
      default:
        return h();
    }
  }
  return /* @__PURE__ */ p("nav", { "data-type": e.type, children: [
    /* @__PURE__ */ r(c, {}),
    d()
  ] });
}
class it {
  /**
   * @param {NavBarConfig} nav = {}
   */
  constructor(t = {}) {
    if (this.id = t.id ?? B("navbar"), this.className = t.className ?? "navbar navbar-expand-lg navbar-light bg-light", t.logo instanceof _)
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
      this.logo = new _(n);
    }
    if (t.linkBar instanceof T)
      this.linkBar = t.linkBar;
    else {
      const n = t.linkBar ?? {};
      this.linkBar = new T({
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
function dn({ navBar: e }) {
  if (!e || !(e instanceof it))
    throw new Error("AlloyNavBar requires `navBar` (NavBarObject instance).");
  const t = R(e.id), n = `${t.current}-collapse`;
  return /* @__PURE__ */ r("nav", { id: t.current, className: e.className, children: /* @__PURE__ */ p("div", { className: "container-fluid", children: [
    /* @__PURE__ */ r(Ae, { linkLogo: e.logo }),
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
        children: /* @__PURE__ */ r(ae, { linkBar: e.linkBar })
      }
    )
  ] }) });
}
function rt(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
class ot {
  /**
   * @param {TableConfig} table
   */
  constructor(t = {}) {
    this.id = t.id ?? B("table"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [];
    const n = { iconClass: "fa-solid fa-user" }, a = { iconClass: "fa-solid fa-arrow-down" }, i = t.icon instanceof L ? t.icon : new L(t.icon || n), c = t.sort instanceof L ? t.sort : new L(t.sort || a);
    this.icon = i, this.sort = c;
  }
}
function lt(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function hn({ table: e, output: t }) {
  if (!e || !(e instanceof ot))
    throw new Error("AlloyTable requires `table` (TableObject instance).");
  const n = R(e.id), [a, i] = k({ col: "", dir: "asc" }), c = D(
    () => lt(e.rows),
    [e.rows]
  ), h = (d) => {
    if (!d) return;
    const s = a.col === d && a.dir === "asc" ? "desc" : "asc";
    i({ col: d, dir: s }), t == null || t({
      type: "column",
      name: d,
      dir: s
    });
  }, o = (d) => {
    t == null || t({
      type: "row",
      id: d
    });
  };
  return /* @__PURE__ */ p("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ r("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ p("tr", { children: [
      /* @__PURE__ */ r("th", { scope: "col", children: "Type" }),
      c.map((d) => {
        const s = a.col === d, l = s && a.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ p(
          "span",
          {
            onClick: () => h(d),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              rt(d),
              s && /* @__PURE__ */ r(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: l ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: l ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ r(S, { icon: e.sort })
                }
              )
            ]
          }
        ) }, d);
      })
    ] }) }),
    /* @__PURE__ */ r("tbody", { children: e.rows.length > 0 ? e.rows.map((d, s) => /* @__PURE__ */ p(
      "tr",
      {
        onClick: () => o(d == null ? void 0 : d.id),
        style: { cursor: "pointer" },
        children: [
          /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(S, { icon: e.icon }) }),
          c.map((l) => /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r("span", { children: d == null ? void 0 : d[l] }) }, `${(d == null ? void 0 : d.id) ?? s}-${l}`))
        ]
      },
      (d == null ? void 0 : d.id) ?? s
    )) : /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r(
      "td",
      {
        colSpan: Math.max(1, c.length) + 1,
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
function de() {
  return de = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, de.apply(this, arguments);
}
var xe;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(xe || (xe = {}));
function j(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function G(e, t) {
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
    search: n = "",
    hash: a = ""
  } = e;
  return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n), a && a !== "#" && (t += a.charAt(0) === "#" ? a : "#" + a), t;
}
function je(e) {
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
  let [n, a] = ct(e.path, e.caseSensitive, e.end), i = t.match(n);
  if (!i) return null;
  let c = i[0], h = c.replace(/(.)\/+$/, "$1"), o = i.slice(1);
  return {
    params: a.reduce((s, l, m) => {
      let {
        paramName: u,
        isOptional: y
      } = l;
      if (u === "*") {
        let x = o[m] || "";
        h = c.slice(0, c.length - x.length).replace(/(.)\/+$/, "$1");
      }
      const f = o[m];
      return y && !f ? s[u] = void 0 : s[u] = (f || "").replace(/%2F/g, "/"), s;
    }, {}),
    pathname: c,
    pathnameBase: h,
    pattern: e
  };
}
function ct(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !0), G(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let a = [], i = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (h, o, d) => (a.push({
    paramName: o,
    isOptional: d != null
  }), d ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (a.push({
    paramName: "*"
  }), i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? i += "\\/*$" : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"), [new RegExp(i, t ? void 0 : "i"), a];
}
function W(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length, a = e.charAt(n);
  return a && a !== "/" ? null : e.slice(n) || "/";
}
function dt(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: a = "",
    hash: i = ""
  } = typeof e == "string" ? je(e) : e;
  return {
    pathname: n ? n.startsWith("/") ? n : ht(n, t) : t,
    search: ut(a),
    hash: ft(i)
  };
}
function ht(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((i) => {
    i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
  }), n.length > 1 ? n.join("/") : "/";
}
function le(e, t, n, a) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(a) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function mt(e) {
  return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0);
}
function Re(e, t) {
  let n = mt(e);
  return t ? n.map((a, i) => i === n.length - 1 ? a.pathname : a.pathnameBase) : n.map((a) => a.pathnameBase);
}
function Se(e, t, n, a) {
  a === void 0 && (a = !1);
  let i;
  typeof e == "string" ? i = je(e) : (i = de({}, e), j(!i.pathname || !i.pathname.includes("?"), le("?", "pathname", "search", i)), j(!i.pathname || !i.pathname.includes("#"), le("#", "pathname", "hash", i)), j(!i.search || !i.search.includes("#"), le("#", "search", "hash", i)));
  let c = e === "" || i.pathname === "", h = c ? "/" : i.pathname, o;
  if (h == null)
    o = n;
  else {
    let m = t.length - 1;
    if (!a && h.startsWith("..")) {
      let u = h.split("/");
      for (; u[0] === ".."; )
        u.shift(), m -= 1;
      i.pathname = u.join("/");
    }
    o = m >= 0 ? t[m] : "/";
  }
  let d = dt(i, o), s = h && h !== "/" && h.endsWith("/"), l = (c || h === ".") && n.endsWith("/");
  return !d.pathname.endsWith("/") && (s || l) && (d.pathname += "/"), d;
}
const ye = (e) => e.join("/").replace(/\/\/+/g, "/"), ut = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, ft = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, Fe = ["post", "put", "patch", "delete"];
new Set(Fe);
const yt = ["get", ...Fe];
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
function me() {
  return me = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, me.apply(this, arguments);
}
const ie = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (ie.displayName = "DataRouter");
const De = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (De.displayName = "DataRouterState");
const pt = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (pt.displayName = "Await");
const P = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (P.displayName = "Navigation");
const pe = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (pe.displayName = "Location");
const H = /* @__PURE__ */ w.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (H.displayName = "Route");
const vt = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (vt.displayName = "RouteError");
function Nt(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t;
  ve() || (process.env.NODE_ENV !== "production" ? j(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : j(!1));
  let {
    basename: a,
    navigator: i
  } = w.useContext(P), {
    hash: c,
    pathname: h,
    search: o
  } = Z(e, {
    relative: n
  }), d = h;
  return a !== "/" && (d = h === "/" ? a : ye([a, h])), i.createHref({
    pathname: d,
    search: o,
    hash: c
  });
}
function ve() {
  return w.useContext(pe) != null;
}
function Y() {
  return ve() || (process.env.NODE_ENV !== "production" ? j(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : j(!1)), w.useContext(pe).location;
}
const Ue = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Te(e) {
  w.useContext(P).static || w.useLayoutEffect(e);
}
function wt() {
  let {
    isDataRoute: e
  } = w.useContext(H);
  return e ? Et() : gt();
}
function gt() {
  ve() || (process.env.NODE_ENV !== "production" ? j(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : j(!1));
  let e = w.useContext(ie), {
    basename: t,
    future: n,
    navigator: a
  } = w.useContext(P), {
    matches: i
  } = w.useContext(H), {
    pathname: c
  } = Y(), h = JSON.stringify(Re(i, n.v7_relativeSplatPath)), o = w.useRef(!1);
  return Te(() => {
    o.current = !0;
  }), w.useCallback(function(s, l) {
    if (l === void 0 && (l = {}), process.env.NODE_ENV !== "production" && G(o.current, Ue), !o.current) return;
    if (typeof s == "number") {
      a.go(s);
      return;
    }
    let m = Se(s, JSON.parse(h), c, l.relative === "path");
    e == null && t !== "/" && (m.pathname = m.pathname === "/" ? t : ye([t, m.pathname])), (l.replace ? a.replace : a.push)(m, l.state, l);
  }, [t, a, h, c, e]);
}
function Z(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    future: a
  } = w.useContext(P), {
    matches: i
  } = w.useContext(H), {
    pathname: c
  } = Y(), h = JSON.stringify(Re(i, a.v7_relativeSplatPath));
  return w.useMemo(() => Se(e, JSON.parse(h), c, n === "path"), [e, h, c, n]);
}
var $e = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}($e || {}), Ne = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(Ne || {});
function Pe(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function bt(e) {
  let t = w.useContext(ie);
  return t || (process.env.NODE_ENV !== "production" ? j(!1, Pe(e)) : j(!1)), t;
}
function xt(e) {
  let t = w.useContext(H);
  return t || (process.env.NODE_ENV !== "production" ? j(!1, Pe(e)) : j(!1)), t;
}
function _e(e) {
  let t = xt(e), n = t.matches[t.matches.length - 1];
  return n.route.id || (process.env.NODE_ENV !== "production" ? j(!1, e + ' can only be used on routes that contain a unique "id"') : j(!1)), n.route.id;
}
function Ct() {
  return _e(Ne.UseRouteId);
}
function Et() {
  let {
    router: e
  } = bt($e.UseNavigateStable), t = _e(Ne.UseNavigateStable), n = w.useRef(!1);
  return Te(() => {
    n.current = !0;
  }), w.useCallback(function(i, c) {
    c === void 0 && (c = {}), process.env.NODE_ENV !== "production" && G(n.current, Ue), n.current && (typeof i == "number" ? e.navigate(i) : e.navigate(i, me({
      fromRouteId: t
    }, c)));
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
function z() {
  return z = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, z.apply(this, arguments);
}
function we(e, t) {
  if (e == null) return {};
  var n = {}, a = Object.keys(e), i, c;
  for (c = 0; c < a.length; c++)
    i = a[c], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
const Q = "get", I = "application/x-www-form-urlencoded";
function re(e) {
  return e != null && typeof e.tagName == "string";
}
function Lt(e) {
  return re(e) && e.tagName.toLowerCase() === "button";
}
function Ot(e) {
  return re(e) && e.tagName.toLowerCase() === "form";
}
function kt(e) {
  return re(e) && e.tagName.toLowerCase() === "input";
}
function Bt(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function At(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !Bt(e);
}
let X = null;
function jt() {
  if (X === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), X = !1;
    } catch {
      X = !0;
    }
  return X;
}
const Rt = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function ce(e) {
  return e != null && !Rt.has(e) ? (process.env.NODE_ENV !== "production" && G(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + I + '"')), null) : e;
}
function St(e, t) {
  let n, a, i, c, h;
  if (Ot(e)) {
    let o = e.getAttribute("action");
    a = o ? W(o, t) : null, n = e.getAttribute("method") || Q, i = ce(e.getAttribute("enctype")) || I, c = new FormData(e);
  } else if (Lt(e) || kt(e) && (e.type === "submit" || e.type === "image")) {
    let o = e.form;
    if (o == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let d = e.getAttribute("formaction") || o.getAttribute("action");
    if (a = d ? W(d, t) : null, n = e.getAttribute("formmethod") || o.getAttribute("method") || Q, i = ce(e.getAttribute("formenctype")) || ce(o.getAttribute("enctype")) || I, c = new FormData(o, e), !jt()) {
      let {
        name: s,
        type: l,
        value: m
      } = e;
      if (l === "image") {
        let u = s ? s + "." : "";
        c.append(u + "x", "0"), c.append(u + "y", "0");
      } else s && c.append(s, m);
    }
  } else {
    if (re(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    n = Q, a = null, i = I, h = e;
  }
  return c && i === "text/plain" && (h = c, c = void 0), {
    action: a,
    method: n.toLowerCase(),
    encType: i,
    formData: c,
    body: h
  };
}
const Ft = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], Dt = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], Ut = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], Tt = "6";
try {
  window.__reactRouterVersion = Tt;
} catch {
}
const Ve = /* @__PURE__ */ w.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (Ve.displayName = "ViewTransition");
const $t = /* @__PURE__ */ w.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && ($t.displayName = "Fetchers");
process.env.NODE_ENV;
const Pt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", _t = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, U = /* @__PURE__ */ w.forwardRef(function(t, n) {
  let {
    onClick: a,
    relative: i,
    reloadDocument: c,
    replace: h,
    state: o,
    target: d,
    to: s,
    preventScrollReset: l,
    viewTransition: m
  } = t, u = we(t, Ft), {
    basename: y
  } = w.useContext(P), f, x = !1;
  if (typeof s == "string" && _t.test(s) && (f = s, Pt))
    try {
      let A = new URL(window.location.href), N = s.startsWith("//") ? new URL(A.protocol + s) : new URL(s), b = W(N.pathname, y);
      N.origin === A.origin && b != null ? s = b + N.search + N.hash : x = !0;
    } catch {
      process.env.NODE_ENV !== "production" && G(!1, '<Link to="' + s + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let g = Nt(s, {
    relative: i
  }), O = Mt(s, {
    replace: h,
    state: o,
    target: d,
    preventScrollReset: l,
    relative: i,
    viewTransition: m
  });
  function E(A) {
    a && a(A), A.defaultPrevented || O(A);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ w.createElement("a", z({}, u, {
      href: f || g,
      onClick: x || c ? a : E,
      ref: n,
      target: d
    }))
  );
});
process.env.NODE_ENV !== "production" && (U.displayName = "Link");
const Vt = /* @__PURE__ */ w.forwardRef(function(t, n) {
  let {
    "aria-current": a = "page",
    caseSensitive: i = !1,
    className: c = "",
    end: h = !1,
    style: o,
    to: d,
    viewTransition: s,
    children: l
  } = t, m = we(t, Dt), u = Z(d, {
    relative: m.relative
  }), y = Y(), f = w.useContext(De), {
    navigator: x,
    basename: g
  } = w.useContext(P), O = f != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Yt(u) && s === !0, E = x.encodeLocation ? x.encodeLocation(u).pathname : u.pathname, A = y.pathname, N = f && f.navigation && f.navigation.location ? f.navigation.location.pathname : null;
  i || (A = A.toLowerCase(), N = N ? N.toLowerCase() : null, E = E.toLowerCase()), N && g && (N = W(N, g) || N);
  const b = E !== "/" && E.endsWith("/") ? E.length - 1 : E.length;
  let C = A === E || !h && A.startsWith(E) && A.charAt(b) === "/", F = N != null && (N === E || !h && N.startsWith(E) && N.charAt(E.length) === "/"), J = {
    isActive: C,
    isPending: F,
    isTransitioning: O
  }, We = C ? a : void 0, oe;
  typeof c == "function" ? oe = c(J) : oe = [c, C ? "active" : null, F ? "pending" : null, O ? "transitioning" : null].filter(Boolean).join(" ");
  let ze = typeof o == "function" ? o(J) : o;
  return /* @__PURE__ */ w.createElement(U, z({}, m, {
    "aria-current": We,
    className: oe,
    ref: n,
    style: ze,
    to: d,
    viewTransition: s
  }), typeof l == "function" ? l(J) : l);
});
process.env.NODE_ENV !== "production" && (Vt.displayName = "NavLink");
const qt = /* @__PURE__ */ w.forwardRef((e, t) => {
  let {
    fetcherKey: n,
    navigate: a,
    reloadDocument: i,
    replace: c,
    state: h,
    method: o = Q,
    action: d,
    onSubmit: s,
    relative: l,
    preventScrollReset: m,
    viewTransition: u
  } = e, y = we(e, Ut), f = Jt(), x = Gt(d, {
    relative: l
  }), g = o.toLowerCase() === "get" ? "get" : "post", O = (E) => {
    if (s && s(E), E.defaultPrevented) return;
    E.preventDefault();
    let A = E.nativeEvent.submitter, N = (A == null ? void 0 : A.getAttribute("formmethod")) || o;
    f(A || E.currentTarget, {
      fetcherKey: n,
      method: N,
      navigate: a,
      replace: c,
      state: h,
      relative: l,
      preventScrollReset: m,
      viewTransition: u
    });
  };
  return /* @__PURE__ */ w.createElement("form", z({
    ref: t,
    method: g,
    action: x,
    onSubmit: i ? s : O
  }, y));
});
process.env.NODE_ENV !== "production" && (qt.displayName = "Form");
process.env.NODE_ENV;
var te;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(te || (te = {}));
var Le;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Le || (Le = {}));
function Kt(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function qe(e) {
  let t = w.useContext(ie);
  return t || (process.env.NODE_ENV !== "production" ? j(!1, Kt(e)) : j(!1)), t;
}
function Mt(e, t) {
  let {
    target: n,
    replace: a,
    state: i,
    preventScrollReset: c,
    relative: h,
    viewTransition: o
  } = t === void 0 ? {} : t, d = wt(), s = Y(), l = Z(e, {
    relative: h
  });
  return w.useCallback((m) => {
    if (At(m, n)) {
      m.preventDefault();
      let u = a !== void 0 ? a : he(s) === he(l);
      d(e, {
        replace: u,
        state: i,
        preventScrollReset: c,
        relative: h,
        viewTransition: o
      });
    }
  }, [s, d, l, a, i, n, e, c, h, o]);
}
function Wt() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let zt = 0, Ht = () => "__" + String(++zt) + "__";
function Jt() {
  let {
    router: e
  } = qe(te.UseSubmit), {
    basename: t
  } = w.useContext(P), n = Ct();
  return w.useCallback(function(a, i) {
    i === void 0 && (i = {}), Wt();
    let {
      action: c,
      method: h,
      encType: o,
      formData: d,
      body: s
    } = St(a, t);
    if (i.navigate === !1) {
      let l = i.fetcherKey || Ht();
      e.fetch(l, n, i.action || c, {
        preventScrollReset: i.preventScrollReset,
        formData: d,
        body: s,
        formMethod: i.method || h,
        formEncType: i.encType || o,
        flushSync: i.flushSync
      });
    } else
      e.navigate(i.action || c, {
        preventScrollReset: i.preventScrollReset,
        formData: d,
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
function Gt(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    basename: a
  } = w.useContext(P), i = w.useContext(H);
  i || (process.env.NODE_ENV !== "production" ? j(!1, "useFormAction must be used inside a RouteContext") : j(!1));
  let [c] = i.matches.slice(-1), h = z({}, Z(e || ".", {
    relative: n
  })), o = Y();
  if (e == null) {
    h.search = o.search;
    let d = new URLSearchParams(h.search), s = d.getAll("index");
    if (s.some((m) => m === "")) {
      d.delete("index"), s.filter((u) => u).forEach((u) => d.append("index", u));
      let m = d.toString();
      h.search = m ? "?" + m : "";
    }
  }
  return (!e || e === ".") && c.route.index && (h.search = h.search ? h.search.replace(/^\?/, "?index&") : "?index"), a !== "/" && (h.pathname = h.pathname === "/" ? a : ye([a, h.pathname])), he(h);
}
function Yt(e, t) {
  t === void 0 && (t = {});
  let n = w.useContext(Ve);
  n == null && (process.env.NODE_ENV !== "production" ? j(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : j(!1));
  let {
    basename: a
  } = qe(te.useViewTransitionState), i = Z(e, {
    relative: t.relative
  });
  if (!n.isTransitioning)
    return !1;
  let c = W(n.currentLocation.pathname, a) || n.currentLocation.pathname, h = W(n.nextLocation.pathname, a) || n.nextLocation.pathname;
  return Ee(i.pathname, h) != null || Ee(i.pathname, c) != null;
}
function Zt(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
class Xt {
  /**
   * @param {TableLinkConfig} tableLink
   */
  constructor(t = {}) {
    if (!t.link)
      throw new Error("TableLinkObject requires `link` (base route).");
    this.id = t.id ?? B("table-link"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = t.link;
    const n = { iconClass: "fa-solid fa-user" }, a = { iconClass: "fa-solid fa-arrow-down" };
    this.icon = t.icon instanceof L ? t.icon : new L(t.icon || n), this.sort = t.sort instanceof L ? t.sort : new L(t.sort || a);
  }
}
function Qt(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function mn({ tableLink: e, output: t }) {
  if (!e || !(e instanceof Xt))
    throw new Error(
      "AlloyTableLink requires `tableLink` (TableLinkObject instance)."
    );
  const n = R(e.id), [a, i] = k({ col: "", dir: "asc" }), c = D(
    () => Qt(e.rows),
    [e.rows]
  ), h = (o) => {
    if (!o) return;
    const d = a.col === o && a.dir === "asc" ? "desc" : "asc";
    i({ col: o, dir: d }), t == null || t({
      type: "column",
      name: o,
      dir: d
    });
  };
  return /* @__PURE__ */ p("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ r("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ p("tr", { children: [
      /* @__PURE__ */ r("th", { scope: "col", children: "Type" }),
      c.map((o) => {
        const d = a.col === o, s = d && a.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ p(
          "span",
          {
            onClick: () => h(o),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              Zt(o),
              d && /* @__PURE__ */ r(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: s ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: s ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ r(S, { icon: e.sort })
                }
              )
            ]
          }
        ) }, o);
      })
    ] }) }),
    /* @__PURE__ */ r("tbody", { children: e.rows.length > 0 ? e.rows.map((o, d) => {
      const s = (o == null ? void 0 : o.id) ?? d, m = `${e.link.endsWith("/") ? e.link.slice(0, -1) : e.link}/${s}`;
      return /* @__PURE__ */ p("tr", { children: [
        /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(S, { icon: e.icon }) }),
        c.map((u) => /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(
          U,
          {
            to: m,
            className: "text-decoration-none",
            onClick: () => t == null ? void 0 : t({
              type: "navigate",
              to: m,
              id: s
            }),
            children: /* @__PURE__ */ r("span", { children: o == null ? void 0 : o[u] })
          }
        ) }, `${s}-${u}`))
      ] }, s);
    }) : /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r(
      "td",
      {
        colSpan: Math.max(1, c.length) + 1,
        className: "text-center text-secondary",
        children: "No rows"
      }
    ) }) })
  ] });
}
function It(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
function en(e) {
  if (!Array.isArray(e) || e.length === 0) return [];
  const t = e[0] ?? {};
  return Object.keys(t).filter((n) => n !== "id");
}
class tn {
  /**
   * @param {Object} cfg
   */
  constructor(t = {}) {
    this.id = t.id ?? B("table-action"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = typeof t.link == "string" ? t.link : "";
    const n = new L({ iconClass: "fa-solid fa-user" }), a = new L({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = t.icon instanceof L ? t.icon : new L(t.icon || n), this.sort = t.sort instanceof L ? t.sort : new L(t.sort || a), this.actions = t.actions ? t.actions instanceof $ ? t.actions : new $(t.actions) : void 0;
  }
}
function un({ tableAction: e, output: t }) {
  if (!e || !(e instanceof tn))
    throw new Error(
      "AlloyTableAction requires `tableAction` (TableActionObject instance)."
    );
  const n = R(e.id), a = D(
    () => en(e.rows),
    [e.rows]
  ), [i, c] = k({ col: "", dir: "asc" });
  function h(s) {
    const l = i.col === s && i.dir === "asc" ? "desc" : "asc";
    c({ col: s, dir: l }), t == null || t({
      type: "column",
      name: s,
      dir: l
    });
  }
  function o(s) {
    return (l, m) => {
      var u;
      t == null || t({
        type: "action",
        action: {
          id: l == null ? void 0 : l.id,
          name: l == null ? void 0 : l.name,
          className: l == null ? void 0 : l.className,
          active: l == null ? void 0 : l.active,
          disabled: !!(l != null && l.disabled),
          title: l == null ? void 0 : l.title,
          ariaLabel: l == null ? void 0 : l.ariaLabel,
          tabIndex: l == null ? void 0 : l.tabIndex,
          iconClass: (u = l == null ? void 0 : l.icon) == null ? void 0 : u.iconClass
        },
        row: s
      });
    };
  }
  const d = !!e.actions;
  return /* @__PURE__ */ p("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ r("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ p("tr", { children: [
      /* @__PURE__ */ r("th", { scope: "col", children: "Type" }),
      a.map((s) => {
        const l = i.col === s, m = l && i.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ p(
          "span",
          {
            onClick: () => h(s),
            style: { userSelect: "none" },
            children: [
              It(s),
              l && /* @__PURE__ */ r(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: m ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: m ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ r(S, { icon: e.sort })
                }
              )
            ]
          }
        ) }, `h-${s}`);
      }),
      d && /* @__PURE__ */ r("th", { scope: "col", className: "text-end", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ r("tbody", { children: e.rows.length > 0 ? e.rows.map((s, l) => {
      const m = (s == null ? void 0 : s.id) ?? l, u = e.actions;
      return /* @__PURE__ */ p("tr", { children: [
        /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(S, { icon: e.icon }) }),
        a.map((y) => {
          const f = e.link || "", x = f.endsWith("/") ? f.slice(0, -1) : f, g = x ? `${x}/${m}` : "";
          return /* @__PURE__ */ r("td", { children: x ? /* @__PURE__ */ r(
            U,
            {
              to: g,
              onClick: () => t == null ? void 0 : t({
                type: "navigate",
                to: g,
                id: m,
                row: s
              }),
              className: "text-decoration-none",
              children: /* @__PURE__ */ r("span", { children: s == null ? void 0 : s[y] })
            }
          ) : /* @__PURE__ */ r("span", { children: s == null ? void 0 : s[y] }) }, `${m}-${y}`);
        }),
        d && /* @__PURE__ */ r("td", { className: "text-end", children: /* @__PURE__ */ r(
          se,
          {
            buttonBar: u,
            output: o(s)
          }
        ) })
      ] }, m);
    }) : /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r(
      "td",
      {
        colSpan: (
          // icon col + data cols (+ actions col if present)
          1 + a.length + (d ? 1 : 0)
        ),
        className: "text-center text-secondary",
        children: "No rows"
      }
    ) }) })
  ] });
}
class Ke {
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
    if (this.id = t.id ?? B("card"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "", t.header instanceof v)
      this.header = t.header;
    else if (t.header) {
      const a = new v(t.header);
      a.className = a.className || "card-header", this.header = a;
    } else
      this.header = void 0;
    if (t.body instanceof v)
      this.body = t.body;
    else {
      const a = new v(t.body);
      a.className = a.className || "card-body", this.body = a;
    }
    if (t.footer instanceof v)
      this.footer = t.footer;
    else if (t.footer) {
      const a = new v(t.footer);
      a.className = a.className || "card-footer", this.footer = a;
    } else
      this.footer = void 0;
    const n = Array.isArray(t.fields) ? t.fields : [];
    this.fields = n.map((a) => a instanceof v ? a : new v(a || {}));
  }
}
function fn({ card: e }) {
  var c;
  if (!e || !(e instanceof Ke))
    throw new Error("AlloyCard requires `card` (CardObject instance).");
  const t = e.header ? /* @__PURE__ */ r(
    "div",
    {
      id: e.header.id,
      className: e.header.className || "card-header",
      "aria-label": e.header.name,
      children: e.header.name
    }
  ) : null, n = /* @__PURE__ */ p(
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
    U,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (c = e.body) == null ? void 0 : c.name,
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
  return /* @__PURE__ */ p("div", { id: e.id, className: e.className, children: [
    t,
    a,
    i
  ] });
}
class nn extends Ke {
  constructor(t = {}) {
    if (super(t), !t.icon)
      throw new Error("CardIconObject requires `icon`.");
    this.icon = t.icon instanceof L ? t.icon : new L(t.icon), this.iconClass = t.iconClass ?? "col-4 d-flex align-items-start justify-content-center text-warning fs-2", this.textClass = t.textClass ?? "col-8";
  }
}
function yn({ cardIcon: e }) {
  var c, h, o, d;
  if (!e || !(e instanceof nn))
    throw new Error(
      "AlloyCardIcon requires `cardIcon` (CardIconObject instance)."
    );
  const t = (c = e.header) != null && c.name ? /* @__PURE__ */ r(
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
      children: /* @__PURE__ */ p("div", { className: "row m-0", children: [
        /* @__PURE__ */ r("div", { className: e.iconClass, children: /* @__PURE__ */ r(S, { icon: e.icon }) }),
        /* @__PURE__ */ p("div", { className: e.textClass, children: [
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
    U,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (o = e.body) == null ? void 0 : o.name,
      children: n
    }
  ) : n, i = (d = e.footer) != null && d.name ? /* @__PURE__ */ r(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className,
      children: e.footer.name
    }
  ) : null;
  return /* @__PURE__ */ p(
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
    this.id = t.id ?? B("logo"), this.imageUrl = t.imageUrl ?? "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png", this.alt = t.alt ?? "Alloymobile", this.width = t.width ?? "72px", this.height = t.height ?? "auto";
  }
}
class Me {
  constructor(t = {}) {
    this.id = t.id ?? B("card"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "", this.header = t.header instanceof v ? t.header : new v(t.header || {}), this.body = t.body instanceof v ? t.body : new v(t.body || {}), this.footer = t.footer instanceof v ? t.footer : new v(t.footer || {});
    const n = Array.isArray(t.fields) ? t.fields : [];
    this.fields = n.map(
      (a) => a instanceof v ? a : new v(a || {})
    ), this.logo = t.logo instanceof Oe ? t.logo : new Oe(t.logo || {}), this.logoClass = t.logoClass ?? "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0", this.textClass = t.textClass ?? "col-8";
  }
}
function pn({ cardImage: e }) {
  var c, h, o, d;
  if (!(e instanceof Me))
    throw new Error(
      "AlloyCardImage requires `cardImage` (CardImageObject instance)."
    );
  const t = (c = e.header) != null && c.name ? /* @__PURE__ */ r(
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
      children: /* @__PURE__ */ p("div", { className: "row m-0", children: [
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
        /* @__PURE__ */ r("div", { className: e.textClass, children: /* @__PURE__ */ p("div", { className: "row p-1", children: [
          (h = e.body) != null && h.name ? /* @__PURE__ */ r("div", { className: "fw-semibold mb-1", children: e.body.name }) : null,
          e.fields.map(
            (s) => s != null && s.name ? /* @__PURE__ */ r(
              "div",
              {
                id: s.id,
                className: s.className || "",
                children: s.name
              },
              s.id ?? B("card-image-field")
            ) : null
          )
        ] }) })
      ] })
    }
  ), a = e.link ? /* @__PURE__ */ r(
    U,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (o = e.body) == null ? void 0 : o.name,
      children: n
    }
  ) : n, i = (d = e.footer) != null && d.name ? /* @__PURE__ */ r(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer small text-muted py-2",
      "aria-label": e.footer.name,
      children: e.footer.name
    }
  ) : null;
  return /* @__PURE__ */ p(
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
class an {
  constructor(t = {}) {
    this.id = t.id ?? B("card-action"), this.className = t.className ?? "card border m-2 shadow", this.link = t.link ?? "";
    const n = t.header ?? {};
    this.header = n instanceof v ? n : new v(n);
    const a = t.body ?? {};
    this.body = a instanceof v ? a : new v(a);
    const i = Array.isArray(t.fields) ? t.fields : [];
    this.fields = i.map(
      (o) => o instanceof v ? o : new v(o || {})
    );
    const c = t.footer ?? {};
    this.footer = c instanceof v ? c : new v(c), this.type = t.type ?? "AlloyButtonBar";
    const h = t.action;
    this.type === "AlloyLinkBar" ? this.action = h instanceof T ? h : h ? new T(h) : void 0 : this.action = h instanceof $ ? h : h ? new $(h) : void 0;
  }
}
function vn({ cardAction: e, output: t }) {
  var o, d;
  if (!e || !(e instanceof an))
    throw new Error(
      "AlloyCardAction requires `cardAction` (CardActionObject instance)."
    );
  function n(s, l) {
    var m;
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
        iconClass: (m = s == null ? void 0 : s.icon) == null ? void 0 : m.iconClass,
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
  ) : null, i = /* @__PURE__ */ p(
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
            s.id ?? B("card-field")
          ) : null
        )
      ]
    }
  ), c = e.link ? /* @__PURE__ */ r(
    U,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (d = e.body) == null ? void 0 : d.name,
      children: i
    }
  ) : i, h = /* @__PURE__ */ p(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className ?? "card-footer d-flex align-items-center gap-2 py-2",
      children: [
        e.footer.name ? /* @__PURE__ */ r("div", { className: "me-auto small text-muted", children: e.footer.name }) : null,
        e.action ? e.type === "AlloyLinkBar" ? /* @__PURE__ */ r(ae, { linkBar: e.action, output: n }) : /* @__PURE__ */ r(
          se,
          {
            buttonBar: e.action,
            output: n
          }
        ) : null
      ]
    }
  );
  return /* @__PURE__ */ p(
    "div",
    {
      id: e.id,
      className: e.className ?? "card border m-2 shadow",
      children: [
        a,
        c,
        h
      ]
    }
  );
}
class sn {
  /**
   * @param {CardIconActionConfig} card = {}
   */
  constructor(t = {}) {
    this.id = t.id ?? B("card-icon-action"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "";
    const n = t.header ?? {};
    this.header = n instanceof v ? n : new v(n);
    const a = t.body ?? {};
    this.body = a instanceof v ? a : new v(a);
    const i = Array.isArray(t.fields) ? t.fields : [];
    this.fields = i.map(
      (o) => o instanceof v ? o : new v(o || {})
    );
    const c = t.footer ?? {};
    this.footer = c instanceof v ? c : new v(c);
    const h = new L({ iconClass: "fa-solid fa-user fa-2xl" });
    this.icon = t.icon instanceof L ? t.icon : new L(t.icon || { iconClass: h.iconClass }), this.iconClass = t.iconClass ?? "col-3 d-flex align-items-center justify-content-center rounded-circle bg-warning text-white mb-0", this.textClass = t.textClass ?? "col-9", this.type = t.type ?? "AlloyButtonBar", this.type === "AlloyLinkBar" ? this.action = t.action instanceof T ? t.action : new T(t.action || {}) : this.action = t.action instanceof $ ? t.action : new $(t.action || {});
  }
}
function Nn({ cardIconAction: e, output: t }) {
  var d, s;
  if (!e || !(e instanceof sn))
    throw new Error(
      "AlloyCardIconAction requires `cardIconAction` (CardIconActionObject instance)."
    );
  function n() {
    return (l, m) => {
      var u;
      t == null || t({
        type: "action",
        action: {
          id: l == null ? void 0 : l.id,
          name: l == null ? void 0 : l.name,
          title: l == null ? void 0 : l.title,
          href: l == null ? void 0 : l.href,
          className: l == null ? void 0 : l.className,
          iconClass: (u = l == null ? void 0 : l.icon) == null ? void 0 : u.iconClass,
          active: l == null ? void 0 : l.active,
          disabled: !!(l != null && l.disabled),
          ariaLabel: l == null ? void 0 : l.ariaLabel,
          tabIndex: l == null ? void 0 : l.tabIndex
        },
        card: {
          id: e.id
        }
      });
    };
  }
  const a = (d = e.header) != null && d.name ? /* @__PURE__ */ r(
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
      children: /* @__PURE__ */ p("div", { className: "row m-0", children: [
        /* @__PURE__ */ r("div", { className: e.iconClass, children: /* @__PURE__ */ r(S, { icon: e.icon }) }),
        /* @__PURE__ */ r("div", { className: e.textClass, children: /* @__PURE__ */ r("div", { className: "row p-1", children: e.fields.map(
          (l) => l != null && l.name ? /* @__PURE__ */ r(
            "div",
            {
              id: l.id,
              className: l.className,
              children: l.name
            },
            l.id ?? B("card-icon-action-field")
          ) : null
        ) }) })
      ] })
    }
  ), c = e.link ? /* @__PURE__ */ r(
    U,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (s = e.body) == null ? void 0 : s.name,
      children: i
    }
  ) : i, h = e.type === "AlloyLinkBar" ? /* @__PURE__ */ r(
    ae,
    {
      linkBar: e.action,
      output: n()
    }
  ) : /* @__PURE__ */ r(
    se,
    {
      buttonBar: e.action,
      output: n()
    }
  ), o = /* @__PURE__ */ p(
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
  return /* @__PURE__ */ p(
    "div",
    {
      id: e.id,
      className: e.className,
      children: [
        a,
        c,
        o
      ]
    }
  );
}
class rn extends Me {
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
    super(t), this.header = t.header instanceof v ? t.header : new v(
      t.header || {
        className: "card-header py-2 fw-semibold",
        name: ""
      }
    ), this.body = t.body instanceof v ? t.body : new v(
      t.body || {
        className: "card-body d-flex align-items-center",
        name: "Card Body"
      }
    );
    const n = Array.isArray(t.fields) ? t.fields : [];
    switch (this.fields = n.map(
      (a, i) => a instanceof v ? a : new v({
        id: (a == null ? void 0 : a.id) || `field_${i + 1}`,
        className: (a == null ? void 0 : a.className) ?? "",
        name: (a == null ? void 0 : a.name) ?? ""
      })
    ), this.footer = t.footer instanceof v ? t.footer : new v(
      t.footer || {
        className: "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
        name: "Footer"
      }
    ), this.type = t.type ?? "AlloyButtonBar", this.type) {
      case "AlloyLinkBar": {
        this.action = t.action instanceof T ? t.action : new T(
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
function wn({ cardImageAction: e, output: t }) {
  var d, s, l, m, u, y;
  if (!e || !(e instanceof rn))
    throw new Error(
      "AlloyCardImageAction requires `cardImageAction` (CardImageActionObject instance)."
    );
  function n() {
    return (f, x) => {
      var g, O;
      t == null || t({
        type: "action",
        action: {
          id: f == null ? void 0 : f.id,
          name: f == null ? void 0 : f.name,
          title: f == null ? void 0 : f.title,
          href: f == null ? void 0 : f.href,
          className: f == null ? void 0 : f.className,
          iconClass: (g = f == null ? void 0 : f.icon) == null ? void 0 : g.iconClass,
          active: f == null ? void 0 : f.active,
          disabled: !!(f != null && f.disabled),
          ariaLabel: f == null ? void 0 : f.ariaLabel,
          tabIndex: f == null ? void 0 : f.tabIndex
        },
        card: {
          id: e.id,
          bodyId: (O = e.body) == null ? void 0 : O.id
        }
      });
    };
  }
  const i = e.header && ((d = e.header.name) == null ? void 0 : d.trim()) ? /* @__PURE__ */ r(
    "div",
    {
      id: e.header.id,
      className: e.header.className || "card-header py-2 fw-semibold",
      "aria-label": e.header.name,
      children: e.header.name
    }
  ) : null, c = /* @__PURE__ */ r(
    "div",
    {
      id: e.body.id,
      className: e.body.className || "card-body d-flex align-items-center",
      "aria-label": e.body.name,
      children: /* @__PURE__ */ p("div", { className: "row m-0", children: [
        /* @__PURE__ */ r("div", { className: e.logoClass, children: /* @__PURE__ */ r(
          "img",
          {
            src: (s = e.logo) == null ? void 0 : s.imageUrl,
            alt: (l = e.logo) == null ? void 0 : l.alt,
            style: {
              width: (m = e.logo) == null ? void 0 : m.width,
              height: (u = e.logo) == null ? void 0 : u.height,
              maxWidth: "100%",
              objectFit: "contain"
            }
          }
        ) }),
        /* @__PURE__ */ r("div", { className: e.textClass, children: /* @__PURE__ */ r("div", { className: "row p-1", children: e.fields.map(
          (f) => f != null && f.name ? /* @__PURE__ */ r(
            "div",
            {
              id: f.id,
              className: f.className,
              children: f.name
            },
            f.id
          ) : null
        ) }) })
      ] })
    }
  ), h = e.link ? /* @__PURE__ */ r(
    U,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (y = e.body) == null ? void 0 : y.name,
      children: c
    }
  ) : c, o = /* @__PURE__ */ p(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      "aria-label": e.footer.name,
      children: [
        /* @__PURE__ */ r("div", { className: "flex-grow-1", children: e.footer.name }),
        /* @__PURE__ */ r("div", { role: "group", children: e.type === "AlloyLinkBar" ? /* @__PURE__ */ r(
          ae,
          {
            linkBar: e.action,
            output: n()
          }
        ) : /* @__PURE__ */ r(
          se,
          {
            buttonBar: e.action,
            output: n()
          }
        ) })
      ]
    }
  );
  return /* @__PURE__ */ p(
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
class ke {
  constructor(t = {}) {
    const {
      id: n,
      title: a = "AlloyMobile",
      className: i = "col m-2",
      message: c = "",
      action: h = "",
      type: o = "AlloyInputTextIcon",
      submit: d,
      fields: s,
      data: l
    } = t;
    this.id = n ?? B("form"), this.title = a, this.className = i, this.message = c, this.action = h, this.type = o, this.submit = d instanceof ee ? d : new ee(
      d || {
        // sane defaults
        name: "Submit",
        icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
        className: "btn btn-primary w-100 mt-3",
        disabled: !1,
        loading: !1,
        ariaLabel: "Submit",
        title: "Submit"
      }
    );
    const m = Array.isArray(s) ? s : [];
    this.fields = m.map(
      (u) => u instanceof ge ? u : new ge(u)
    ), this.data = l ?? {};
  }
}
function Be(e, t, n) {
  let a = !0;
  const i = [];
  if (e.required && (e.type === "checkbox" ? (Array.isArray(t) ? t : []).length === 0 && (a = !1, i.push("This field is required.")) : (t === "" || t === !1 || t === void 0 || t === null) && (a = !1, i.push("This field is required."))), a && typeof e.minLength == "number" && typeof t == "string" && t.length < e.minLength && (a = !1, i.push(`Minimum length is ${e.minLength}`)), a && typeof e.maxLength == "number" && typeof t == "string" && t.length > e.maxLength && (a = !1, i.push(`Maximum length is ${e.maxLength}`)), a && e.pattern && typeof t == "string" && !new RegExp(e.pattern).test(t) && (a = !1, i.push("Invalid format.")), a && e.passwordStrength && typeof t == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(t) || (a = !1, i.push("Password is too weak."))), a && e.matchWith) {
    const c = e.matchWith;
    n[c] !== t && (a = !1, i.push("Values do not match."));
  }
  return {
    valid: a,
    error: !a,
    errors: i
  };
}
function gn({ form: e, output: t }) {
  const n = e instanceof ke ? e : new ke(e || {});
  if (!n || !Array.isArray(n.fields) || !(n.submit instanceof ee))
    throw new Error(
      "AlloyForm could not hydrate a valid FormObject (missing fields[] or submit)."
    );
  const [a, i] = k(() => {
    const m = {}, u = {};
    return n.fields.forEach((y) => {
      u[y.name] = y.value;
    }), n.fields.forEach((y) => {
      const f = y.value, { valid: x, error: g, errors: O } = Be(
        y,
        f,
        u
      );
      m[y.name] = {
        value: f,
        valid: x,
        error: g,
        errors: O
      };
    }), m;
  }), c = R(null), h = He(
    (m) => {
      const u = {};
      Object.keys(m).forEach((f) => {
        u[f] = m[f].value;
      });
      const y = {};
      return n.fields.forEach((f) => {
        const x = u[f.name], { valid: g, error: O, errors: E } = Be(
          f,
          x,
          u
        );
        y[f.name] = {
          value: x,
          valid: g,
          error: O,
          errors: E
        };
      }), y;
    },
    [n.fields]
  );
  function o(m) {
    if (!m || !m.name) return;
    const { name: u, value: y } = m;
    i((f) => {
      const x = { ...f };
      return x[u] = {
        ...f[u],
        value: y
      }, h(x);
    });
  }
  const d = D(() => {
    const m = {};
    return Object.keys(a).forEach((u) => {
      m[u] = a[u].value;
    }), m;
  }, [a]), s = D(() => Object.values(a).some(
    (m) => m.error || !m.valid
  ), [a]);
  function l(m, u) {
    const y = {
      ...d,
      action: n.action
    };
    n.data = y, n.message = "", t == null || t(y);
  }
  return n.submit.disabled = s || !!n.submit.loading, /* @__PURE__ */ r("div", { className: "row", children: /* @__PURE__ */ r("div", { className: n.className, children: /* @__PURE__ */ p("div", { className: "text-center", children: [
    /* @__PURE__ */ r("h3", { children: n.title }),
    n.message !== "" && /* @__PURE__ */ r("div", { className: "alert alert-text-danger m-0 p-0", children: n.message }),
    n.fields.map((m) => /* @__PURE__ */ r(
      at,
      {
        input: m,
        output: o
      },
      m.id
    )),
    /* @__PURE__ */ r(
      nt,
      {
        ref: c,
        buttonSubmit: n.submit,
        output: l
      }
    )
  ] }) }) });
}
export {
  Ie as AlloyButton,
  se as AlloyButtonBar,
  tt as AlloyButtonIcon,
  nt as AlloyButtonSubmit,
  fn as AlloyCard,
  vn as AlloyCardAction,
  yn as AlloyCardIcon,
  Nn as AlloyCardIconAction,
  pn as AlloyCardImage,
  wn as AlloyCardImageAction,
  gn as AlloyForm,
  S as AlloyIcon,
  at as AlloyInput,
  Ge as AlloyLink,
  ae as AlloyLinkBar,
  Ze as AlloyLinkIcon,
  Ae as AlloyLinkLogo,
  dn as AlloyNavBar,
  hn as AlloyTable,
  un as AlloyTableAction,
  mn as AlloyTableLink,
  $ as ButtonBarObject,
  M as ButtonIconObject,
  K as ButtonObject,
  ee as ButtonSubmitObject,
  an as CardActionObject,
  sn as CardIconActionObject,
  nn as CardIconObject,
  rn as CardImageActionObject,
  Me as CardImageObject,
  Ke as CardObject,
  ke as FormObject,
  L as IconObject,
  ge as InputObject,
  T as LinkBarObject,
  q as LinkIconObject,
  _ as LinkLogoObject,
  V as LinkObject,
  it as NavBarObject,
  tn as TableActionObject,
  Xt as TableLinkObject,
  ot as TableObject
};
//# sourceMappingURL=alloy-react.es.js.map
