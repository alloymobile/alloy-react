import { jsx as r, jsxs as p } from "react/jsx-runtime";
import * as w from "react";
import { useRef as S, useState as B, useMemo as U, forwardRef as ye, useImperativeHandle as pe, useEffect as se, useCallback as Je } from "react";
import "react-dom";
function A(e = "id") {
  const t = Date.now(), n = Math.random().toString(36).slice(2, 7);
  return `${e}-${t}-${n}`;
}
class v {
  constructor(t = {}) {
    const { id: n, name: a, className: i } = t;
    this.id = n ?? A("tag"), this.name = a ?? "", this.className = i ?? "";
  }
}
class $ {
  /**
   * @param {Object} [output]
   * @param {string} [output.id]             - Optional top-level id; if omitted we try data.id, else "".
   * @param {string} [output.type=""]        - "button" | "form" | "icon" | ...
   * @param {string} [output.action=""]      - "click" | "submit" | "change" | ...
   * @param {Object} [output.data={}]        - Payload; shape depends on error flag.
   * @param {boolean} [output.error=false]   - Error flag
   */
  constructor(t = {}) {
    const {
      id: n,
      type: a = "",
      action: i = "",
      data: l = {},
      error: h = !1
    } = t || {}, o = typeof n < "u" ? n : l && typeof l.id < "u" ? l.id : "";
    this.id = o, this.type = a, this.action = i, this.error = !!h, this.data = { ...l };
  }
  /**
   * Helper: success (non-error) payload
   *
   * Usage:
   *   OutputObject.ok({
   *     id: "button1",
   *     type: "button",
   *     action: "mouseleave",
   *     data: { name: "Primary" }
   *   });
   */
  static ok({ id: t = "", type: n = "", action: a = "", data: i = {} } = {}) {
    return new $({
      id: t,
      type: n,
      action: a,
      error: !1,
      data: i
    });
  }
  /**
   * Helper: error payload
   *
   * Usage:
   *   OutputObject.errorOf({
   *     id: "button1",
   *     type: "button",
   *     action: "mouseleave",
   *     message: "There is an error in the button"
   *   });
   */
  static errorOf({
    id: t = "",
    type: n = "",
    action: a = "",
    message: i = "",
    data: l = {}
  } = {}) {
    const h = { ...l };
    return i && h.message == null && (h.message = String(i)), new $({
      id: t,
      type: n,
      action: a,
      error: !0,
      data: h
    });
  }
  /**
   * Mark this instance as error and merge extra fields into data.
   *
   * Example:
   *   out.addError("Bad value", { code: "BAD_VALUE" });
   */
  addError(t, n = {}) {
    this.error = !0;
    const a = { ...this.data, ...n };
    return t && a.message == null && (a.message = String(t)), this.data = a, this;
  }
  /** Clear error flag; keep existing data as-is */
  clearError() {
    return this.error = !1, this;
  }
  /** Safe JSON representation */
  toJSON() {
    return {
      id: this.id,
      type: this.type,
      action: this.action,
      error: this.error,
      data: { ...this.data }
    };
  }
}
class k {
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
    this.id = t.id ?? A("icon"), this.iconClass = t.iconClass;
  }
}
function F({ icon: e }) {
  if (!e) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ r("i", { id: e.id, className: e.iconClass, "aria-hidden": "true" });
}
function Ge(e = "", t = "") {
  const [n, a] = B(!1), [i, l] = B(!1), [h, o] = B(!1);
  return {
    className: U(() => [e, (n || i || h) && t].filter(Boolean).join(" "), [e, t, n, i, h]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), l(!1);
      },
      onMouseDown: () => l(!0),
      onMouseUp: () => l(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class K {
  /**
   * @param {LinkConfig} link
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkObject requires `href`.");
    if (!t.name)
      throw new Error("LinkObject requires `name`.");
    this.id = t.id ?? A("link"), this.name = t.name, this.href = t.href, this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function Ye({ link: e }) {
  if (!e || !(e instanceof K))
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  const t = S(e.id), { className: n, events: a } = Ge(e.className, e.active), i = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel;
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
  const [n, a] = B(!1), [i, l] = B(!1), [h, o] = B(!1);
  return {
    className: U(() => [e, (n || i || h) && t].filter(Boolean).join(" "), [e, t, n, i, h]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), l(!1);
      },
      onMouseDown: () => l(!0),
      onMouseUp: () => l(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class M {
  /**
   * @param {LinkIconConfig} linkIcon
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkIconObject requires `href`.");
    if (!t.icon)
      throw new Error("LinkIconObject requires `icon`.");
    const n = t.icon instanceof k ? t.icon : new k(t.icon);
    this.id = t.id ?? A("link-icon"), this.href = t.href, this.icon = n, this.name = t.name, this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function Xe({ linkIcon: e }) {
  if (!e || !(e instanceof M))
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  const t = S(e.id), { className: n, events: a } = Ze(
    e.className,
    e.active
  ), i = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, l = !!e.name;
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
        /* @__PURE__ */ r(F, { icon: e.icon }),
        l && /* @__PURE__ */ r("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
function Qe(e = "", t = "") {
  const [n, a] = B(!1), [i, l] = B(!1), [h, o] = B(!1);
  return {
    className: U(() => [e, (n || i || h) && t].filter(Boolean).join(" "), [e, t, n, i, h]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), l(!1);
      },
      onMouseDown: () => l(!0),
      onMouseUp: () => l(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class q {
  /**
   * @param {LinkLogoConfig} linkLogo
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkLogoObject requires `href`.");
    if (!t.logo)
      throw new Error("LinkLogoObject requires `logo`.");
    this.id = t.id ?? A("link-logo"), this.name = t.name, this.href = t.href, this.logo = t.logo, this.width = t.width, this.height = t.height, this.logoAlt = t.logoAlt ?? t.name ?? "", this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function Re({ linkLogo: e }) {
  if (!e || !(e instanceof q))
    throw new Error(
      "AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance)."
    );
  const t = S(e.id), { className: n, events: a } = Qe(
    e.className,
    e.active
  ), i = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, l = !!e.name;
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
        l && /* @__PURE__ */ r("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
function Ie(e = "", t = "") {
  const [n, a] = B(!1), [i, l] = B(!1), [h, o] = B(!1);
  return {
    className: U(() => [e, (n || i || h) && t].filter(Boolean).join(" "), [e, t, n, i, h]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), l(!1);
      },
      onMouseDown: () => l(!0),
      onMouseUp: () => l(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class W {
  /**
   * @param {ButtonConfig} button
   */
  constructor(t = {}) {
    if (!t.name)
      throw new Error("ButtonObject requires `name`.");
    this.id = t.id ?? A("btn"), this.name = t.name, this.className = t.className ?? "btn btn-primary", this.active = t.active ?? "", this.disabled = !!t.disabled, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const et = ye(function({ button: t, output: n }, a) {
  if (!t || !(t instanceof W))
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  const i = S(null), l = S(t.id), h = t.disabled, { className: o, events: d } = Ie(
    t.className,
    t.active
  );
  pe(
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
  const s = (u, f, y) => (m) => {
    if (f == null || f(m), typeof n == "function") {
      const g = $.ok({
        id: t.id,
        type: "button",
        action: y,
        data: {
          // keep payload minimal; we don't duplicate id here
          name: t.name
        }
      });
      n(g);
    }
    u == null || u(m, t);
  }, c = {
    onClick: s(t.onClick, void 0, "click"),
    onKeyDown: s(t.onKeyDown, d.onFocus, "keydown"),
    onKeyUp: s(t.onKeyUp, void 0, "keyup"),
    onFocus: s(t.onFocus, d.onFocus, "focus"),
    onBlur: s(t.onBlur, d.onBlur, "blur"),
    onMouseEnter: s(
      t.onMouseEnter,
      d.onMouseEnter,
      "mouseenter"
    ),
    onMouseLeave: s(
      t.onMouseLeave,
      d.onMouseLeave,
      "mouseleave"
    ),
    onMouseDown: s(void 0, d.onMouseDown, "mousedown"),
    onMouseUp: s(void 0, d.onMouseUp, "mouseup")
  };
  return /* @__PURE__ */ r(
    "button",
    {
      id: l.current,
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
  const [n, a] = B(!1), [i, l] = B(!1), [h, o] = B(!1);
  return {
    className: U(() => [e, (n || i || h) && t].filter(Boolean).join(" "), [e, t, n, i, h]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), l(!1);
      },
      onMouseDown: () => l(!0),
      onMouseUp: () => l(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class z {
  /**
   * @param {ButtonIconConfig} buttonIcon
   */
  constructor(t = {}) {
    if (!t.icon)
      throw new Error("ButtonIconObject requires `icon`.");
    const n = t.icon instanceof k ? t.icon : new k(t.icon);
    this.id = t.id ?? A("btn-icon"), this.name = t.name, this.icon = n, this.className = t.className ?? "btn btn-primary", this.active = t.active ?? "", this.disabled = !!t.disabled, this.title = t.title ?? t.name ?? "icon button", this.ariaLabel = t.ariaLabel ?? t.name ?? "icon button", this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const nt = ye(function({ buttonIcon: t, output: n }, a) {
  if (!t || !(t instanceof z))
    throw new Error(
      "AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance)."
    );
  const i = S(null), l = S(t.id), h = t.disabled, { className: o, events: d } = tt(
    t.className,
    t.active
  );
  pe(
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
  const s = (u, f, y) => (m) => {
    if (f == null || f(m), typeof n == "function") {
      const g = new $({
        id: t.id,
        type: "button-icon",
        action: y,
        data: {
          // minimal payload: only "name" (no disabled, iconClass, etc.)
          name: t.name ?? ""
        }
      });
      n(g);
    }
    u == null || u(m, t);
  }, c = {
    onClick: s(t.onClick, void 0, "click"),
    onKeyDown: s(t.onKeyDown, d.onFocus, "keydown"),
    onKeyUp: s(t.onKeyUp, void 0, "keyup"),
    onFocus: s(t.onFocus, d.onFocus, "focus"),
    onBlur: s(t.onBlur, d.onBlur, "blur"),
    onMouseEnter: s(
      t.onMouseEnter,
      d.onMouseEnter,
      "mouseenter"
    ),
    onMouseLeave: s(
      t.onMouseLeave,
      d.onMouseLeave,
      "mouseleave"
    ),
    onMouseDown: s(void 0, d.onMouseDown, "mousedown"),
    onMouseUp: s(void 0, d.onMouseUp, "mouseup")
  };
  return /* @__PURE__ */ p(
    "button",
    {
      id: l.current,
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
        /* @__PURE__ */ r("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ r(F, { icon: t.icon }) }),
        t.name ? /* @__PURE__ */ r("span", { className: "px-2 align-middle", children: t.name }) : null
      ]
    }
  );
});
class ne {
  /**
   * @param {ButtonSubmitConfig} buttonSubmit
   */
  constructor(t = {}) {
    if (!t.name)
      throw new Error("ButtonSubmitObject requires `name`.");
    if (!t.icon)
      throw new Error("ButtonSubmitObject requires `icon`.");
    const n = t.icon instanceof k ? t.icon : new k(t.icon);
    this.id = t.id ?? A("btn-submit"), this.name = t.name, this.icon = n, this.className = t.className ?? "", this.disabled = !!t.disabled, this.loading = !!t.loading, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onMouseDown = t.onMouseDown, this.onKeyDown = t.onKeyDown;
  }
}
const at = ye(function({ buttonSubmit: t, output: n }, a) {
  if (!t || !(t instanceof ne))
    throw new Error(
      "AlloyButtonSubmit requires `buttonSubmit` (ButtonSubmitObject instance)."
    );
  const i = S(null), l = S(t.id), [h, o] = B(!!t.loading), d = S(!1);
  se(() => {
    const N = !!t.loading;
    o(N), N || (d.current = !1);
  }, [t.loading]);
  const s = t.disabled || h;
  pe(
    a,
    () => ({
      el: i.current,
      model: t,
      focus: () => {
        var N;
        return (N = i.current) == null ? void 0 : N.focus();
      },
      click: () => {
        var N;
        return (N = i.current) == null ? void 0 : N.click();
      }
    }),
    [t]
  );
  const c = () => d.current || s ? !1 : (d.current = !0, t.loading = !0, t.disabled = !0, o(!0), !0), u = (N, L, C) => {
    if (typeof n == "function") {
      const j = new $({
        id: t.id,
        type: "button-submit",
        action: C,
        error: !1,
        data: {
          name: t.name
        }
      });
      n(j);
    }
    L == null || L(N, t);
  }, f = (N) => {
    c() && u(N, t.onClick, "click");
  }, y = (N) => {
    c() && u(N, t.onMouseDown, "mousedown");
  }, m = (N) => {
    const L = N.key;
    (L === "Enter" || L === " ") && c() && u(N, t.onKeyDown, "keydown");
  }, g = h;
  return /* @__PURE__ */ p(
    "button",
    {
      id: l.current,
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
        g && /* @__PURE__ */ r("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ r(F, { icon: t.icon }) }),
        /* @__PURE__ */ r("span", { className: g ? "px-2 align-middle" : "align-middle", children: t.name }),
        h ? /* @__PURE__ */ r("span", { className: "ms-2 visually-hidden", "aria-live": "polite", children: "Loading…" }) : null
      ]
    }
  );
});
class xe {
  /**
   * @param {InputConfig} config
   */
  constructor(t = {}) {
    const {
      id: n,
      name: a,
      type: i = "text",
      label: l = "",
      value: h,
      layout: o = "text",
      icon: d,
      placeholder: s = "",
      required: c = !1,
      minLength: u,
      maxLength: f,
      min: y,
      max: m,
      pattern: g,
      matchWith: N,
      passwordStrength: L,
      className: C,
      options: j = [],
      validators: O = [],
      ...x
    } = t;
    if (!a)
      throw new Error("InputObject requires `name`.");
    if ((o === "icon" || o === "floating") && !d)
      throw new Error(
        "InputObject with layout='icon' or 'floating' requires `icon`."
      );
    let b;
    typeof h < "u" ? b = h : i === "checkbox" ? b = [] : b = "";
    const E = d instanceof k ? d : d ? new k(d) : void 0;
    this.id = n ?? A("input"), this.name = a, this.type = i, this.label = l, this.value = b, this.layout = o, this.icon = E, this.placeholder = s, this.required = !!c, this.minLength = u, this.maxLength = f, this.min = y, this.max = m, this.pattern = g, this.matchWith = N, this.passwordStrength = L, typeof C == "string" && C.trim() !== "" ? this.className = C.trim() : i === "select" ? this.className = "form-select" : i === "radio" || i === "checkbox" ? this.className = "form-check-input" : this.className = "form-control", this.options = j, this.validators = O, Object.assign(this, x);
  }
}
function st({ input: e, output: t }) {
  const [n, a] = B(e.value), [i, l] = B(!1);
  se(() => {
    a(e.value), l(!1);
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
  const h = (x) => {
    const b = [], E = typeof x == "string" ? x.trim() : x;
    if (e.required) {
      const D = Array.isArray(E) && E.length === 0, Y = !Array.isArray(E) && (E === "" || E === !1 || E == null);
      (D || Y) && b.push("This field is required.");
    }
    return typeof E == "string" && e.minLength != null && E.length < e.minLength && b.push(`Minimum length is ${e.minLength}`), typeof E == "string" && e.maxLength != null && E.length > e.maxLength && b.push(`Maximum length is ${e.maxLength}`), typeof E == "string" && e.pattern && e.pattern !== "" && (new RegExp(e.pattern).test(E) || b.push("Invalid format.")), e.passwordStrength && typeof E == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(
      E
    ) || b.push("Password is too weak.")), b;
  }, o = h(n), d = i && o.length > 0, s = d && o.length > 0 && /* @__PURE__ */ r("div", { className: "mt-2", "aria-live": "polite", children: o.map((x, b) => /* @__PURE__ */ r(
    "div",
    {
      className: "alert alert-danger py-2 mb-2",
      role: "alert",
      children: x
    },
    b
  )) }), c = (x, b = "change") => {
    const E = h(x), D = E.length > 0;
    if (typeof t == "function") {
      const Y = new $({
        id: e.id,
        type: "input",
        action: b,
        error: D,
        data: {
          name: e.name,
          value: x,
          errors: E
        }
      });
      t(Y);
    }
  }, u = (x) => {
    const b = x.target.value;
    if (e.type === "checkbox") {
      const E = Array.isArray(n) ? [...n] : [], D = E.indexOf(b);
      D > -1 ? E.splice(D, 1) : E.push(b), a(E), c(E, "change");
    } else e.type, a(b), c(b, "change");
  }, f = () => {
    l(!0), c(n, "blur");
  }, y = {
    id: e.id,
    name: e.name,
    placeholder: e.placeholder,
    onBlur: f,
    "aria-invalid": d || void 0
  }, m = (x) => x + (d ? " is-invalid" : ""), g = () => /* @__PURE__ */ r(
    "textarea",
    {
      ...y,
      value: n,
      onChange: u,
      className: m(e.className)
    }
  ), N = () => /* @__PURE__ */ r(
    "select",
    {
      ...y,
      value: n,
      onChange: u,
      className: m(e.className),
      children: e.options.map((x) => /* @__PURE__ */ r("option", { value: x.value, children: x.label }, x.value))
    }
  ), L = () => /* @__PURE__ */ p("div", { children: [
    e.label && /* @__PURE__ */ r("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((x, b) => /* @__PURE__ */ p("div", { className: "form-check", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "radio",
          id: `${e.id}_${b}`,
          className: m(e.className),
          name: e.name,
          value: x.value,
          checked: n === x.value,
          onChange: u,
          onBlur: f,
          "aria-invalid": d || void 0
        }
      ),
      /* @__PURE__ */ r(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${b}`,
          children: x.label
        }
      )
    ] }, b)),
    s
  ] }), C = () => /* @__PURE__ */ p("div", { children: [
    e.label && /* @__PURE__ */ r("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((x, b) => /* @__PURE__ */ p("div", { className: "form-check", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "checkbox",
          id: `${e.id}_${b}`,
          className: m(e.className),
          name: e.name,
          value: x.value,
          checked: Array.isArray(n) && n.includes(x.value),
          onChange: u,
          onBlur: f,
          "aria-invalid": d || void 0
        }
      ),
      /* @__PURE__ */ r(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${b}`,
          children: x.label
        }
      )
    ] }, b)),
    s
  ] }), j = () => /* @__PURE__ */ r(
    "input",
    {
      ...y,
      type: e.type,
      value: n,
      onChange: u,
      className: m(e.className)
    }
  ), O = () => {
    switch (e.type) {
      case "textarea":
        return g();
      case "select":
        return N();
      case "radio":
        return L();
      case "checkbox":
        return C();
      default:
        return j();
    }
  };
  return e.layout === "floating" ? /* @__PURE__ */ p("div", { className: "mb-3", children: [
    /* @__PURE__ */ p("div", { className: "form-floating", children: [
      O(),
      /* @__PURE__ */ p("label", { htmlFor: e.id, children: [
        e.icon && /* @__PURE__ */ r(F, { icon: e.icon }),
        e.icon && " ",
        e.label
      ] })
    ] }),
    !(e.type === "radio" || e.type === "checkbox") && s
  ] }) : e.layout === "icon" ? /* @__PURE__ */ p("div", { className: "mb-3", children: [
    e.label && /* @__PURE__ */ r("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    /* @__PURE__ */ p("div", { className: "input-group", children: [
      /* @__PURE__ */ r("span", { className: "input-group-text", children: /* @__PURE__ */ r(F, { icon: e.icon }) }),
      ["radio", "checkbox"].includes(e.type) ? O() : /* @__PURE__ */ r(
        "input",
        {
          ...y,
          type: e.type,
          value: n,
          onChange: u,
          className: m(e.className)
        }
      )
    ] }),
    !(e.type === "radio" || e.type === "checkbox") && s
  ] }) : /* @__PURE__ */ p("div", { className: "mb-3", children: [
    ["text", "textarea", "number", "email", "password", "date"].includes(
      e.type
    ) && e.label && /* @__PURE__ */ r("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    O(),
    !(e.type === "radio" || e.type === "checkbox") && s
  ] });
}
class P {
  /**
   * @param {LinkBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? A("linkBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyLink", this.linkClass = t.linkClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof v ? this.title = t.title : t.title ? this.title = new v(t.title) : this.title = new v({});
    const n = Array.isArray(t.links) ? t.links : [];
    this.type === "AlloyLinkIcon" ? this.links = n.map(
      (a) => a instanceof M ? a : new M(a)
    ) : this.type === "AlloyLinkLogo" ? this.links = n.map(
      (a) => a instanceof q ? a : new q(a)
    ) : this.links = n.map(
      (a) => a instanceof K ? a : new K(a)
    );
  }
}
function it(e, t, n, a) {
  const i = n ? t : "";
  return e instanceof K ? new K({
    id: e.id,
    name: e.name,
    href: e.href,
    className: e.className,
    active: i,
    target: e.target,
    rel: e.rel,
    onClick: a,
    title: e.title
  }) : e instanceof M ? new M({
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
  }) : e instanceof q ? new q({
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
function ie({ linkBar: e }) {
  if (!e || !(e instanceof P))
    throw new Error("AlloyLinkBar requires `linkBar` (LinkBarObject instance).");
  const t = S(e.id), [n, a] = B("");
  se(() => {
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
  function l(o) {
    const d = o.onClick;
    return (s) => {
      const c = o.id || `${o.href || ""}-${o.name || ""}`;
      a(c), d == null || d(s);
    };
  }
  function h() {
    return /* @__PURE__ */ r("ul", { id: t.current, className: e.className, children: e.links.map((o, d) => {
      const s = ((o == null ? void 0 : o.id) ?? "") === n, c = it(
        o,
        e.selected,
        s,
        l(o)
      );
      switch (e.type) {
        case "AlloyLink":
          if (!(c instanceof K))
            throw new Error(
              "AlloyLinkBar (type='AlloyLink') expects each link to be a LinkObject instance."
            );
          return /* @__PURE__ */ r(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ r(Ye, { link: c })
            },
            ((o == null ? void 0 : o.id) ?? d) + "-li"
          );
        case "AlloyLinkIcon":
          if (!(c instanceof M))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkIcon') expects each link to be a LinkIconObject instance."
            );
          return /* @__PURE__ */ r(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ r(Xe, { linkIcon: c })
            },
            ((o == null ? void 0 : o.id) ?? d) + "-li"
          );
        case "AlloyLinkLogo":
          if (!(c instanceof q))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkLogo') expects each link to be a LinkLogoObject instance."
            );
          return /* @__PURE__ */ r(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ r(Re, { linkLogo: c })
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
class V {
  /**
   * @param {ButtonBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? A("buttonBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyButton", this.buttonClass = t.buttonClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof v ? this.title = t.title : t.title ? this.title = new v(t.title) : this.title = new v({});
    const n = Array.isArray(t.buttons) ? t.buttons : [];
    this.type === "AlloyButtonIcon" ? this.buttons = n.map(
      (a) => a instanceof z ? a : new z(a)
    ) : this.buttons = n.map(
      (a) => a instanceof W ? a : new W(a)
    );
  }
}
function Ce(e, t, n, a, i) {
  const l = n ? t : "";
  function h(o) {
    var c, u;
    if (!o)
      return;
    if ((o.action || ((c = o == null ? void 0 : o.data) == null ? void 0 : c.event) || "") === "click") {
      const f = ((u = o == null ? void 0 : o.data) == null ? void 0 : u.id) ?? "";
      f && a(f);
    }
    i == null || i(o);
  }
  return e instanceof W ? { model: new W({
    id: e.id,
    name: e.name,
    className: e.className,
    active: l,
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
  }), onAnyEvent: h } : e instanceof z ? { model: new z({
    id: e.id,
    name: e.name,
    icon: e.icon,
    // already an IconObject (normalized in ButtonIconObject)
    className: e.className,
    active: l,
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
function re({ buttonBar: e, output: t }) {
  if (!e || !(e instanceof V))
    throw new Error(
      "AlloyButtonBar requires `buttonBar` (ButtonBarObject instance)."
    );
  const n = S(e.id), [a, i] = B("");
  se(() => {
    i("");
  }, [e]);
  const l = () => e.title && e.title.name ? /* @__PURE__ */ r("div", { id: e.title.id, className: e.title.className, children: e.title.name }) : null;
  function h() {
    return /* @__PURE__ */ r("ul", { id: n.current, className: e.className, children: e.buttons.map((s, c) => {
      if (!(s instanceof W))
        throw new Error(
          "AlloyButtonBar (type='AlloyButton') expects ButtonObject items."
        );
      const u = ((s == null ? void 0 : s.id) ?? "") === a, { model: f, onAnyEvent: y } = Ce(
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
      if (!(s instanceof z))
        throw new Error(
          "AlloyButtonBar (type='AlloyButtonIcon') expects ButtonIconObject items."
        );
      const u = ((s == null ? void 0 : s.id) ?? "") === a, { model: f, onAnyEvent: y } = Ce(
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
    /* @__PURE__ */ r(l, {}),
    d()
  ] });
}
class rt {
  /**
   * @param {NavBarConfig} nav = {}
   */
  constructor(t = {}) {
    if (this.id = t.id ?? A("navbar"), this.className = t.className ?? "navbar navbar-expand-lg navbar-light bg-light", t.logo instanceof q)
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
      this.logo = new q(n);
    }
    if (t.linkBar instanceof P)
      this.linkBar = t.linkBar;
    else {
      const n = t.linkBar ?? {};
      this.linkBar = new P({
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
function hn({ navBar: e }) {
  if (!e || !(e instanceof rt))
    throw new Error("AlloyNavBar requires `navBar` (NavBarObject instance).");
  const t = S(e.id), n = `${t.current}-collapse`;
  return /* @__PURE__ */ r("nav", { id: t.current, className: e.className, children: /* @__PURE__ */ p("div", { className: "container-fluid", children: [
    /* @__PURE__ */ r(Re, { linkLogo: e.logo }),
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
        children: /* @__PURE__ */ r(ie, { linkBar: e.linkBar })
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
    this.id = t.id ?? A("table"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [];
    const n = { iconClass: "fa-solid fa-user" }, a = { iconClass: "fa-solid fa-arrow-down" }, i = t.icon instanceof k ? t.icon : new k(t.icon || n), l = t.sort instanceof k ? t.sort : new k(t.sort || a);
    this.icon = i, this.sort = l;
  }
}
function ct(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function un({ table: e, output: t }) {
  if (!e || !(e instanceof lt))
    throw new Error("AlloyTable requires `table` (TableObject instance).");
  const n = S(e.id), [a, i] = B({ col: "", dir: "asc" }), l = U(
    () => ct(e.rows),
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
      l.map((d) => {
        const s = a.col === d, c = s && a.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ p(
          "span",
          {
            onClick: () => h(d),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              ot(d),
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
                  children: /* @__PURE__ */ r(F, { icon: e.sort })
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
          /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(F, { icon: e.icon }) }),
          l.map((c) => /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r("span", { children: d == null ? void 0 : d[c] }) }, `${(d == null ? void 0 : d.id) ?? s}-${c}`))
        ]
      },
      (d == null ? void 0 : d.id) ?? s
    )) : /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r(
      "td",
      {
        colSpan: Math.max(1, l.length) + 1,
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
function ue() {
  return ue = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, ue.apply(this, arguments);
}
var Ee;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(Ee || (Ee = {}));
function R(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function Z(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function me(e) {
  let {
    pathname: t = "/",
    search: n = "",
    hash: a = ""
  } = e;
  return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n), a && a !== "#" && (t += a.charAt(0) === "#" ? a : "#" + a), t;
}
function Se(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
    let a = e.indexOf("?");
    a >= 0 && (t.search = e.substr(a), e = e.substr(0, a)), e && (t.pathname = e);
  }
  return t;
}
var ke;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(ke || (ke = {}));
function Le(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [n, a] = dt(e.path, e.caseSensitive, e.end), i = t.match(n);
  if (!i) return null;
  let l = i[0], h = l.replace(/(.)\/+$/, "$1"), o = i.slice(1);
  return {
    params: a.reduce((s, c, u) => {
      let {
        paramName: f,
        isOptional: y
      } = c;
      if (f === "*") {
        let g = o[u] || "";
        h = l.slice(0, l.length - g.length).replace(/(.)\/+$/, "$1");
      }
      const m = o[u];
      return y && !m ? s[f] = void 0 : s[f] = (m || "").replace(/%2F/g, "/"), s;
    }, {}),
    pathname: l,
    pathnameBase: h,
    pattern: e
  };
}
function dt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !0), Z(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let a = [], i = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (h, o, d) => (a.push({
    paramName: o,
    isOptional: d != null
  }), d ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (a.push({
    paramName: "*"
  }), i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? i += "\\/*$" : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"), [new RegExp(i, t ? void 0 : "i"), a];
}
function H(e, t) {
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
  } = typeof e == "string" ? Se(e) : e;
  return {
    pathname: n ? n.startsWith("/") ? n : ut(n, t) : t,
    search: ft(a),
    hash: yt(i)
  };
}
function ut(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((i) => {
    i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
  }), n.length > 1 ? n.join("/") : "/";
}
function de(e, t, n, a) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(a) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function mt(e) {
  return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0);
}
function Fe(e, t) {
  let n = mt(e);
  return t ? n.map((a, i) => i === n.length - 1 ? a.pathname : a.pathnameBase) : n.map((a) => a.pathnameBase);
}
function De(e, t, n, a) {
  a === void 0 && (a = !1);
  let i;
  typeof e == "string" ? i = Se(e) : (i = ue({}, e), R(!i.pathname || !i.pathname.includes("?"), de("?", "pathname", "search", i)), R(!i.pathname || !i.pathname.includes("#"), de("#", "pathname", "hash", i)), R(!i.search || !i.search.includes("#"), de("#", "search", "hash", i)));
  let l = e === "" || i.pathname === "", h = l ? "/" : i.pathname, o;
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
  let d = ht(i, o), s = h && h !== "/" && h.endsWith("/"), c = (l || h === ".") && n.endsWith("/");
  return !d.pathname.endsWith("/") && (s || c) && (d.pathname += "/"), d;
}
const ve = (e) => e.join("/").replace(/\/\/+/g, "/"), ft = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, yt = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, Ue = ["post", "put", "patch", "delete"];
new Set(Ue);
const pt = ["get", ...Ue];
new Set(pt);
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
function fe() {
  return fe = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, fe.apply(this, arguments);
}
const oe = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (oe.displayName = "DataRouter");
const Te = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (Te.displayName = "DataRouterState");
const vt = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (vt.displayName = "Await");
const _ = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (_.displayName = "Navigation");
const Ne = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (Ne.displayName = "Location");
const G = /* @__PURE__ */ w.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (G.displayName = "Route");
const Nt = /* @__PURE__ */ w.createContext(null);
process.env.NODE_ENV !== "production" && (Nt.displayName = "RouteError");
function wt(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t;
  we() || (process.env.NODE_ENV !== "production" ? R(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : R(!1));
  let {
    basename: a,
    navigator: i
  } = w.useContext(_), {
    hash: l,
    pathname: h,
    search: o
  } = Q(e, {
    relative: n
  }), d = h;
  return a !== "/" && (d = h === "/" ? a : ve([a, h])), i.createHref({
    pathname: d,
    search: o,
    hash: l
  });
}
function we() {
  return w.useContext(Ne) != null;
}
function X() {
  return we() || (process.env.NODE_ENV !== "production" ? R(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : R(!1)), w.useContext(Ne).location;
}
const $e = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Pe(e) {
  w.useContext(_).static || w.useLayoutEffect(e);
}
function gt() {
  let {
    isDataRoute: e
  } = w.useContext(G);
  return e ? kt() : bt();
}
function bt() {
  we() || (process.env.NODE_ENV !== "production" ? R(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : R(!1));
  let e = w.useContext(oe), {
    basename: t,
    future: n,
    navigator: a
  } = w.useContext(_), {
    matches: i
  } = w.useContext(G), {
    pathname: l
  } = X(), h = JSON.stringify(Fe(i, n.v7_relativeSplatPath)), o = w.useRef(!1);
  return Pe(() => {
    o.current = !0;
  }), w.useCallback(function(s, c) {
    if (c === void 0 && (c = {}), process.env.NODE_ENV !== "production" && Z(o.current, $e), !o.current) return;
    if (typeof s == "number") {
      a.go(s);
      return;
    }
    let u = De(s, JSON.parse(h), l, c.relative === "path");
    e == null && t !== "/" && (u.pathname = u.pathname === "/" ? t : ve([t, u.pathname])), (c.replace ? a.replace : a.push)(u, c.state, c);
  }, [t, a, h, l, e]);
}
function Q(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    future: a
  } = w.useContext(_), {
    matches: i
  } = w.useContext(G), {
    pathname: l
  } = X(), h = JSON.stringify(Fe(i, a.v7_relativeSplatPath));
  return w.useMemo(() => De(e, JSON.parse(h), l, n === "path"), [e, h, l, n]);
}
var Ve = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(Ve || {}), ge = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(ge || {});
function _e(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function xt(e) {
  let t = w.useContext(oe);
  return t || (process.env.NODE_ENV !== "production" ? R(!1, _e(e)) : R(!1)), t;
}
function Ct(e) {
  let t = w.useContext(G);
  return t || (process.env.NODE_ENV !== "production" ? R(!1, _e(e)) : R(!1)), t;
}
function qe(e) {
  let t = Ct(e), n = t.matches[t.matches.length - 1];
  return n.route.id || (process.env.NODE_ENV !== "production" ? R(!1, e + ' can only be used on routes that contain a unique "id"') : R(!1)), n.route.id;
}
function Et() {
  return qe(ge.UseRouteId);
}
function kt() {
  let {
    router: e
  } = xt(Ve.UseNavigateStable), t = qe(ge.UseNavigateStable), n = w.useRef(!1);
  return Pe(() => {
    n.current = !0;
  }), w.useCallback(function(i, l) {
    l === void 0 && (l = {}), process.env.NODE_ENV !== "production" && Z(n.current, $e), n.current && (typeof i == "number" ? e.navigate(i) : e.navigate(i, fe({
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
function J() {
  return J = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, J.apply(this, arguments);
}
function be(e, t) {
  if (e == null) return {};
  var n = {}, a = Object.keys(e), i, l;
  for (l = 0; l < a.length; l++)
    i = a[l], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
const ee = "get", te = "application/x-www-form-urlencoded";
function le(e) {
  return e != null && typeof e.tagName == "string";
}
function Lt(e) {
  return le(e) && e.tagName.toLowerCase() === "button";
}
function Ot(e) {
  return le(e) && e.tagName.toLowerCase() === "form";
}
function Bt(e) {
  return le(e) && e.tagName.toLowerCase() === "input";
}
function At(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function jt(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !At(e);
}
let I = null;
function Rt() {
  if (I === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), I = !1;
    } catch {
      I = !0;
    }
  return I;
}
const St = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function he(e) {
  return e != null && !St.has(e) ? (process.env.NODE_ENV !== "production" && Z(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + te + '"')), null) : e;
}
function Ft(e, t) {
  let n, a, i, l, h;
  if (Ot(e)) {
    let o = e.getAttribute("action");
    a = o ? H(o, t) : null, n = e.getAttribute("method") || ee, i = he(e.getAttribute("enctype")) || te, l = new FormData(e);
  } else if (Lt(e) || Bt(e) && (e.type === "submit" || e.type === "image")) {
    let o = e.form;
    if (o == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let d = e.getAttribute("formaction") || o.getAttribute("action");
    if (a = d ? H(d, t) : null, n = e.getAttribute("formmethod") || o.getAttribute("method") || ee, i = he(e.getAttribute("formenctype")) || he(o.getAttribute("enctype")) || te, l = new FormData(o, e), !Rt()) {
      let {
        name: s,
        type: c,
        value: u
      } = e;
      if (c === "image") {
        let f = s ? s + "." : "";
        l.append(f + "x", "0"), l.append(f + "y", "0");
      } else s && l.append(s, u);
    }
  } else {
    if (le(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    n = ee, a = null, i = te, h = e;
  }
  return l && i === "text/plain" && (h = l, l = void 0), {
    action: a,
    method: n.toLowerCase(),
    encType: i,
    formData: l,
    body: h
  };
}
const Dt = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], Ut = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], Tt = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], $t = "6";
try {
  window.__reactRouterVersion = $t;
} catch {
}
const Ke = /* @__PURE__ */ w.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (Ke.displayName = "ViewTransition");
const Pt = /* @__PURE__ */ w.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (Pt.displayName = "Fetchers");
process.env.NODE_ENV;
const Vt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", _t = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, T = /* @__PURE__ */ w.forwardRef(function(t, n) {
  let {
    onClick: a,
    relative: i,
    reloadDocument: l,
    replace: h,
    state: o,
    target: d,
    to: s,
    preventScrollReset: c,
    viewTransition: u
  } = t, f = be(t, Dt), {
    basename: y
  } = w.useContext(_), m, g = !1;
  if (typeof s == "string" && _t.test(s) && (m = s, Vt))
    try {
      let j = new URL(window.location.href), O = s.startsWith("//") ? new URL(j.protocol + s) : new URL(s), x = H(O.pathname, y);
      O.origin === j.origin && x != null ? s = x + O.search + O.hash : g = !0;
    } catch {
      process.env.NODE_ENV !== "production" && Z(!1, '<Link to="' + s + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let N = wt(s, {
    relative: i
  }), L = Wt(s, {
    replace: h,
    state: o,
    target: d,
    preventScrollReset: c,
    relative: i,
    viewTransition: u
  });
  function C(j) {
    a && a(j), j.defaultPrevented || L(j);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ w.createElement("a", J({}, f, {
      href: m || N,
      onClick: g || l ? a : C,
      ref: n,
      target: d
    }))
  );
});
process.env.NODE_ENV !== "production" && (T.displayName = "Link");
const qt = /* @__PURE__ */ w.forwardRef(function(t, n) {
  let {
    "aria-current": a = "page",
    caseSensitive: i = !1,
    className: l = "",
    end: h = !1,
    style: o,
    to: d,
    viewTransition: s,
    children: c
  } = t, u = be(t, Ut), f = Q(d, {
    relative: u.relative
  }), y = X(), m = w.useContext(Te), {
    navigator: g,
    basename: N
  } = w.useContext(_), L = m != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Zt(f) && s === !0, C = g.encodeLocation ? g.encodeLocation(f).pathname : f.pathname, j = y.pathname, O = m && m.navigation && m.navigation.location ? m.navigation.location.pathname : null;
  i || (j = j.toLowerCase(), O = O ? O.toLowerCase() : null, C = C.toLowerCase()), O && N && (O = H(O, N) || O);
  const x = C !== "/" && C.endsWith("/") ? C.length - 1 : C.length;
  let b = j === C || !h && j.startsWith(C) && j.charAt(x) === "/", E = O != null && (O === C || !h && O.startsWith(C) && O.charAt(C.length) === "/"), D = {
    isActive: b,
    isPending: E,
    isTransitioning: L
  }, Y = b ? a : void 0, ce;
  typeof l == "function" ? ce = l(D) : ce = [l, b ? "active" : null, E ? "pending" : null, L ? "transitioning" : null].filter(Boolean).join(" ");
  let He = typeof o == "function" ? o(D) : o;
  return /* @__PURE__ */ w.createElement(T, J({}, u, {
    "aria-current": Y,
    className: ce,
    ref: n,
    style: He,
    to: d,
    viewTransition: s
  }), typeof c == "function" ? c(D) : c);
});
process.env.NODE_ENV !== "production" && (qt.displayName = "NavLink");
const Kt = /* @__PURE__ */ w.forwardRef((e, t) => {
  let {
    fetcherKey: n,
    navigate: a,
    reloadDocument: i,
    replace: l,
    state: h,
    method: o = ee,
    action: d,
    onSubmit: s,
    relative: c,
    preventScrollReset: u,
    viewTransition: f
  } = e, y = be(e, Tt), m = Gt(), g = Yt(d, {
    relative: c
  }), N = o.toLowerCase() === "get" ? "get" : "post", L = (C) => {
    if (s && s(C), C.defaultPrevented) return;
    C.preventDefault();
    let j = C.nativeEvent.submitter, O = (j == null ? void 0 : j.getAttribute("formmethod")) || o;
    m(j || C.currentTarget, {
      fetcherKey: n,
      method: O,
      navigate: a,
      replace: l,
      state: h,
      relative: c,
      preventScrollReset: u,
      viewTransition: f
    });
  };
  return /* @__PURE__ */ w.createElement("form", J({
    ref: t,
    method: N,
    action: g,
    onSubmit: i ? s : L
  }, y));
});
process.env.NODE_ENV !== "production" && (Kt.displayName = "Form");
process.env.NODE_ENV;
var ae;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(ae || (ae = {}));
var Oe;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Oe || (Oe = {}));
function Mt(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Me(e) {
  let t = w.useContext(oe);
  return t || (process.env.NODE_ENV !== "production" ? R(!1, Mt(e)) : R(!1)), t;
}
function Wt(e, t) {
  let {
    target: n,
    replace: a,
    state: i,
    preventScrollReset: l,
    relative: h,
    viewTransition: o
  } = t === void 0 ? {} : t, d = gt(), s = X(), c = Q(e, {
    relative: h
  });
  return w.useCallback((u) => {
    if (jt(u, n)) {
      u.preventDefault();
      let f = a !== void 0 ? a : me(s) === me(c);
      d(e, {
        replace: f,
        state: i,
        preventScrollReset: l,
        relative: h,
        viewTransition: o
      });
    }
  }, [s, d, c, a, i, n, e, l, h, o]);
}
function zt() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let Ht = 0, Jt = () => "__" + String(++Ht) + "__";
function Gt() {
  let {
    router: e
  } = Me(ae.UseSubmit), {
    basename: t
  } = w.useContext(_), n = Et();
  return w.useCallback(function(a, i) {
    i === void 0 && (i = {}), zt();
    let {
      action: l,
      method: h,
      encType: o,
      formData: d,
      body: s
    } = Ft(a, t);
    if (i.navigate === !1) {
      let c = i.fetcherKey || Jt();
      e.fetch(c, n, i.action || l, {
        preventScrollReset: i.preventScrollReset,
        formData: d,
        body: s,
        formMethod: i.method || h,
        formEncType: i.encType || o,
        flushSync: i.flushSync
      });
    } else
      e.navigate(i.action || l, {
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
function Yt(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    basename: a
  } = w.useContext(_), i = w.useContext(G);
  i || (process.env.NODE_ENV !== "production" ? R(!1, "useFormAction must be used inside a RouteContext") : R(!1));
  let [l] = i.matches.slice(-1), h = J({}, Q(e || ".", {
    relative: n
  })), o = X();
  if (e == null) {
    h.search = o.search;
    let d = new URLSearchParams(h.search), s = d.getAll("index");
    if (s.some((u) => u === "")) {
      d.delete("index"), s.filter((f) => f).forEach((f) => d.append("index", f));
      let u = d.toString();
      h.search = u ? "?" + u : "";
    }
  }
  return (!e || e === ".") && l.route.index && (h.search = h.search ? h.search.replace(/^\?/, "?index&") : "?index"), a !== "/" && (h.pathname = h.pathname === "/" ? a : ve([a, h.pathname])), me(h);
}
function Zt(e, t) {
  t === void 0 && (t = {});
  let n = w.useContext(Ke);
  n == null && (process.env.NODE_ENV !== "production" ? R(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : R(!1));
  let {
    basename: a
  } = Me(ae.useViewTransitionState), i = Q(e, {
    relative: t.relative
  });
  if (!n.isTransitioning)
    return !1;
  let l = H(n.currentLocation.pathname, a) || n.currentLocation.pathname, h = H(n.nextLocation.pathname, a) || n.nextLocation.pathname;
  return Le(i.pathname, h) != null || Le(i.pathname, l) != null;
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
    this.id = t.id ?? A("table-link"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = t.link;
    const n = { iconClass: "fa-solid fa-user" }, a = { iconClass: "fa-solid fa-arrow-down" };
    this.icon = t.icon instanceof k ? t.icon : new k(t.icon || n), this.sort = t.sort instanceof k ? t.sort : new k(t.sort || a);
  }
}
function It(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function mn({ tableLink: e, output: t }) {
  if (!e || !(e instanceof Qt))
    throw new Error(
      "AlloyTableLink requires `tableLink` (TableLinkObject instance)."
    );
  const n = S(e.id), [a, i] = B({ col: "", dir: "asc" }), l = U(
    () => It(e.rows),
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
      l.map((o) => {
        const d = a.col === o, s = d && a.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ p(
          "span",
          {
            onClick: () => h(o),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              Xt(o),
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
                  children: /* @__PURE__ */ r(F, { icon: e.sort })
                }
              )
            ]
          }
        ) }, o);
      })
    ] }) }),
    /* @__PURE__ */ r("tbody", { children: e.rows.length > 0 ? e.rows.map((o, d) => {
      const s = (o == null ? void 0 : o.id) ?? d, u = `${e.link.endsWith("/") ? e.link.slice(0, -1) : e.link}/${s}`;
      return /* @__PURE__ */ p("tr", { children: [
        /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(F, { icon: e.icon }) }),
        l.map((f) => /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(
          T,
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
        colSpan: Math.max(1, l.length) + 1,
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
    this.id = t.id ?? A("table-action"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = typeof t.link == "string" ? t.link : "";
    const n = new k({ iconClass: "fa-solid fa-user" }), a = new k({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = t.icon instanceof k ? t.icon : new k(t.icon || n), this.sort = t.sort instanceof k ? t.sort : new k(t.sort || a), this.actions = t.actions ? t.actions instanceof V ? t.actions : new V(t.actions) : void 0;
  }
}
function fn({ tableAction: e, output: t }) {
  if (!e || !(e instanceof nn))
    throw new Error(
      "AlloyTableAction requires `tableAction` (TableActionObject instance)."
    );
  const n = S(e.id), a = U(
    () => tn(e.rows),
    [e.rows]
  ), [i, l] = B({ col: "", dir: "asc" });
  function h(s) {
    const c = i.col === s && i.dir === "asc" ? "desc" : "asc";
    l({ col: s, dir: c }), t == null || t({
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
  const d = !!e.actions;
  return /* @__PURE__ */ p("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ r("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ p("tr", { children: [
      /* @__PURE__ */ r("th", { scope: "col", children: "Type" }),
      a.map((s) => {
        const c = i.col === s, u = c && i.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ p(
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
                  children: /* @__PURE__ */ r(F, { icon: e.sort })
                }
              )
            ]
          }
        ) }, `h-${s}`);
      }),
      d && /* @__PURE__ */ r("th", { scope: "col", className: "text-end", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ r("tbody", { children: e.rows.length > 0 ? e.rows.map((s, c) => {
      const u = (s == null ? void 0 : s.id) ?? c, f = e.actions;
      return /* @__PURE__ */ p("tr", { children: [
        /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(F, { icon: e.icon }) }),
        a.map((y) => {
          const m = e.link || "", g = m.endsWith("/") ? m.slice(0, -1) : m, N = g ? `${g}/${u}` : "";
          return /* @__PURE__ */ r("td", { children: g ? /* @__PURE__ */ r(
            T,
            {
              to: N,
              onClick: () => t == null ? void 0 : t({
                type: "navigate",
                to: N,
                id: u,
                row: s
              }),
              className: "text-decoration-none",
              children: /* @__PURE__ */ r("span", { children: s == null ? void 0 : s[y] })
            }
          ) : /* @__PURE__ */ r("span", { children: s == null ? void 0 : s[y] }) }, `${u}-${y}`);
        }),
        d && /* @__PURE__ */ r("td", { className: "text-end", children: /* @__PURE__ */ r(
          re,
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
          1 + a.length + (d ? 1 : 0)
        ),
        className: "text-center text-secondary",
        children: "No rows"
      }
    ) }) })
  ] });
}
class We {
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
    if (this.id = t.id ?? A("card"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "", t.header instanceof v)
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
function yn({ card: e }) {
  var l;
  if (!e || !(e instanceof We))
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
    T,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (l = e.body) == null ? void 0 : l.name,
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
class an extends We {
  constructor(t = {}) {
    if (super(t), !t.icon)
      throw new Error("CardIconObject requires `icon`.");
    this.icon = t.icon instanceof k ? t.icon : new k(t.icon), this.iconClass = t.iconClass ?? "col-4 d-flex align-items-start justify-content-center text-warning fs-2", this.textClass = t.textClass ?? "col-8";
  }
}
function pn({ cardIcon: e }) {
  var l, h, o, d;
  if (!e || !(e instanceof an))
    throw new Error(
      "AlloyCardIcon requires `cardIcon` (CardIconObject instance)."
    );
  const t = (l = e.header) != null && l.name ? /* @__PURE__ */ r(
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
        /* @__PURE__ */ r("div", { className: e.iconClass, children: /* @__PURE__ */ r(F, { icon: e.icon }) }),
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
    T,
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
class Be {
  constructor(t = {}) {
    this.id = t.id ?? A("logo"), this.imageUrl = t.imageUrl ?? "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png", this.alt = t.alt ?? "Alloymobile", this.width = t.width ?? "72px", this.height = t.height ?? "auto";
  }
}
class ze {
  constructor(t = {}) {
    this.id = t.id ?? A("card"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "", this.header = t.header instanceof v ? t.header : new v(t.header || {}), this.body = t.body instanceof v ? t.body : new v(t.body || {}), this.footer = t.footer instanceof v ? t.footer : new v(t.footer || {});
    const n = Array.isArray(t.fields) ? t.fields : [];
    this.fields = n.map(
      (a) => a instanceof v ? a : new v(a || {})
    ), this.logo = t.logo instanceof Be ? t.logo : new Be(t.logo || {}), this.logoClass = t.logoClass ?? "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0", this.textClass = t.textClass ?? "col-8";
  }
}
function vn({ cardImage: e }) {
  var l, h, o, d;
  if (!(e instanceof ze))
    throw new Error(
      "AlloyCardImage requires `cardImage` (CardImageObject instance)."
    );
  const t = (l = e.header) != null && l.name ? /* @__PURE__ */ r(
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
              s.id ?? A("card-image-field")
            ) : null
          )
        ] }) })
      ] })
    }
  ), a = e.link ? /* @__PURE__ */ r(
    T,
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
class sn {
  constructor(t = {}) {
    this.id = t.id ?? A("card-action"), this.className = t.className ?? "card border m-2 shadow", this.link = t.link ?? "";
    const n = t.header ?? {};
    this.header = n instanceof v ? n : new v(n);
    const a = t.body ?? {};
    this.body = a instanceof v ? a : new v(a);
    const i = Array.isArray(t.fields) ? t.fields : [];
    this.fields = i.map(
      (o) => o instanceof v ? o : new v(o || {})
    );
    const l = t.footer ?? {};
    this.footer = l instanceof v ? l : new v(l), this.type = t.type ?? "AlloyButtonBar";
    const h = t.action;
    this.type === "AlloyLinkBar" ? this.action = h instanceof P ? h : h ? new P(h) : void 0 : this.action = h instanceof V ? h : h ? new V(h) : void 0;
  }
}
function Nn({ cardAction: e, output: t }) {
  var o, d;
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
            s.id ?? A("card-field")
          ) : null
        )
      ]
    }
  ), l = e.link ? /* @__PURE__ */ r(
    T,
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
        e.action ? e.type === "AlloyLinkBar" ? /* @__PURE__ */ r(ie, { linkBar: e.action, output: n }) : /* @__PURE__ */ r(
          re,
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
        l,
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
    this.id = t.id ?? A("card-icon-action"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "";
    const n = t.header ?? {};
    this.header = n instanceof v ? n : new v(n);
    const a = t.body ?? {};
    this.body = a instanceof v ? a : new v(a);
    const i = Array.isArray(t.fields) ? t.fields : [];
    this.fields = i.map(
      (o) => o instanceof v ? o : new v(o || {})
    );
    const l = t.footer ?? {};
    this.footer = l instanceof v ? l : new v(l);
    const h = new k({ iconClass: "fa-solid fa-user fa-2xl" });
    this.icon = t.icon instanceof k ? t.icon : new k(t.icon || { iconClass: h.iconClass }), this.iconClass = t.iconClass ?? "col-3 d-flex align-items-center justify-content-center rounded-circle bg-warning text-white mb-0", this.textClass = t.textClass ?? "col-9", this.type = t.type ?? "AlloyButtonBar", this.type === "AlloyLinkBar" ? this.action = t.action instanceof P ? t.action : new P(t.action || {}) : this.action = t.action instanceof V ? t.action : new V(t.action || {});
  }
}
function wn({ cardIconAction: e, output: t }) {
  var d, s;
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
        /* @__PURE__ */ r("div", { className: e.iconClass, children: /* @__PURE__ */ r(F, { icon: e.icon }) }),
        /* @__PURE__ */ r("div", { className: e.textClass, children: /* @__PURE__ */ r("div", { className: "row p-1", children: e.fields.map(
          (c) => c != null && c.name ? /* @__PURE__ */ r(
            "div",
            {
              id: c.id,
              className: c.className,
              children: c.name
            },
            c.id ?? A("card-icon-action-field")
          ) : null
        ) }) })
      ] })
    }
  ), l = e.link ? /* @__PURE__ */ r(
    T,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (s = e.body) == null ? void 0 : s.name,
      children: i
    }
  ) : i, h = e.type === "AlloyLinkBar" ? /* @__PURE__ */ r(
    ie,
    {
      linkBar: e.action,
      output: n()
    }
  ) : /* @__PURE__ */ r(
    re,
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
        l,
        o
      ]
    }
  );
}
class on extends ze {
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
        this.action = t.action instanceof P ? t.action : new P(
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
        this.type = "AlloyButtonBar", this.action = t.action instanceof V ? t.action : new V(
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
function gn({ cardImageAction: e, output: t }) {
  var d, s, c, u, f, y;
  if (!e || !(e instanceof on))
    throw new Error(
      "AlloyCardImageAction requires `cardImageAction` (CardImageActionObject instance)."
    );
  function n() {
    return (m, g) => {
      var N, L;
      t == null || t({
        type: "action",
        action: {
          id: m == null ? void 0 : m.id,
          name: m == null ? void 0 : m.name,
          title: m == null ? void 0 : m.title,
          href: m == null ? void 0 : m.href,
          className: m == null ? void 0 : m.className,
          iconClass: (N = m == null ? void 0 : m.icon) == null ? void 0 : N.iconClass,
          active: m == null ? void 0 : m.active,
          disabled: !!(m != null && m.disabled),
          ariaLabel: m == null ? void 0 : m.ariaLabel,
          tabIndex: m == null ? void 0 : m.tabIndex
        },
        card: {
          id: e.id,
          bodyId: (L = e.body) == null ? void 0 : L.id
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
  ) : null, l = /* @__PURE__ */ r(
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
    T,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (y = e.body) == null ? void 0 : y.name,
      children: l
    }
  ) : l, o = /* @__PURE__ */ p(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      "aria-label": e.footer.name,
      children: [
        /* @__PURE__ */ r("div", { className: "flex-grow-1", children: e.footer.name }),
        /* @__PURE__ */ r("div", { role: "group", children: e.type === "AlloyLinkBar" ? /* @__PURE__ */ r(
          ie,
          {
            linkBar: e.action,
            output: n()
          }
        ) : /* @__PURE__ */ r(
          re,
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
class Ae {
  constructor(t = {}) {
    const {
      id: n,
      title: a = "AlloyMobile",
      className: i = "col m-2",
      message: l = "",
      action: h = "",
      type: o = "AlloyInputTextIcon",
      submit: d,
      fields: s,
      data: c
    } = t;
    this.id = n ?? A("form"), this.title = a, this.className = i, this.message = l, this.action = h, this.type = o, this.submit = d instanceof ne ? d : new ne(
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
    const u = Array.isArray(s) ? s : [];
    this.fields = u.map(
      (f) => f instanceof xe ? f : new xe(f)
    ), this.data = c ?? {};
  }
}
function je(e, t, n) {
  let a = !0;
  const i = [];
  if (e.required && (e.type === "checkbox" ? (Array.isArray(t) ? t : []).length === 0 && (a = !1, i.push("This field is required.")) : (t === "" || t === !1 || t === void 0 || t === null) && (a = !1, i.push("This field is required."))), a && typeof e.minLength == "number" && typeof t == "string" && t.length < e.minLength && (a = !1, i.push(`Minimum length is ${e.minLength}`)), a && typeof e.maxLength == "number" && typeof t == "string" && t.length > e.maxLength && (a = !1, i.push(`Maximum length is ${e.maxLength}`)), a && e.pattern && typeof t == "string" && !new RegExp(e.pattern).test(t) && (a = !1, i.push("Invalid format.")), a && e.passwordStrength && typeof t == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(t) || (a = !1, i.push("Password is too weak."))), a && e.matchWith) {
    const l = e.matchWith;
    n[l] !== t && (a = !1, i.push("Values do not match."));
  }
  return {
    valid: a,
    error: !a,
    errors: i
  };
}
function bn({ form: e, output: t }) {
  const n = e instanceof Ae ? e : new Ae(e || {});
  if (!n || !Array.isArray(n.fields) || !(n.submit instanceof ne))
    throw new Error(
      "AlloyForm could not hydrate a valid FormObject (missing fields[] or submit)."
    );
  const [a, i] = B(() => {
    const u = {}, f = {};
    return n.fields.forEach((y) => {
      f[y.name] = y.value;
    }), n.fields.forEach((y) => {
      const m = y.value, { valid: g, error: N, errors: L } = je(
        y,
        m,
        f
      );
      u[y.name] = {
        value: m,
        valid: g,
        error: N,
        errors: L
      };
    }), u;
  }), l = S(null), h = Je(
    (u) => {
      const f = {};
      Object.keys(u).forEach((m) => {
        f[m] = u[m].value;
      });
      const y = {};
      return n.fields.forEach((m) => {
        const g = f[m.name], { valid: N, error: L, errors: C } = je(
          m,
          g,
          f
        );
        y[m.name] = {
          value: g,
          valid: N,
          error: L,
          errors: C
        };
      }), y;
    },
    [n.fields]
  );
  function o(u) {
    const f = u instanceof $ ? u.data || {} : u || {}, { name: y, value: m } = f;
    y && i((g) => {
      const N = { ...g };
      return N[y] = {
        ...g[y] || {
          value: void 0,
          valid: !0,
          error: !1,
          errors: []
        },
        value: m
      }, h(N);
    });
  }
  const d = U(() => {
    const u = {};
    return Object.keys(a).forEach((f) => {
      u[f] = a[f].value;
    }), u;
  }, [a]), s = U(() => Object.values(a).some(
    (u) => u.error || !u.valid
  ), [a]);
  function c(u) {
    let f = !1;
    Object.values(a).forEach((N) => {
      (N.error || !N.valid) && (f = !0);
    });
    const y = { ...d };
    n.data = y, n.message = "";
    const m = f ? { ...a } : y, g = new $({
      id: n.id,
      // top-level id, as you requested
      type: "form",
      action: "submit",
      data: m,
      error: f
      // no errorMessage; all useful info is inside data for error=true
    });
    t == null || t(g);
  }
  return n.submit.disabled = s || !!n.submit.loading, /* @__PURE__ */ r("div", { className: "row", children: /* @__PURE__ */ r("div", { className: n.className, children: /* @__PURE__ */ p("div", { className: "text-center", children: [
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
        ref: l,
        buttonSubmit: n.submit,
        output: c
      }
    )
  ] }) }) });
}
export {
  et as AlloyButton,
  re as AlloyButtonBar,
  nt as AlloyButtonIcon,
  at as AlloyButtonSubmit,
  yn as AlloyCard,
  Nn as AlloyCardAction,
  pn as AlloyCardIcon,
  wn as AlloyCardIconAction,
  vn as AlloyCardImage,
  gn as AlloyCardImageAction,
  bn as AlloyForm,
  F as AlloyIcon,
  st as AlloyInput,
  Ye as AlloyLink,
  ie as AlloyLinkBar,
  Xe as AlloyLinkIcon,
  Re as AlloyLinkLogo,
  hn as AlloyNavBar,
  un as AlloyTable,
  fn as AlloyTableAction,
  mn as AlloyTableLink,
  V as ButtonBarObject,
  z as ButtonIconObject,
  W as ButtonObject,
  ne as ButtonSubmitObject,
  sn as CardActionObject,
  rn as CardIconActionObject,
  an as CardIconObject,
  on as CardImageActionObject,
  ze as CardImageObject,
  We as CardObject,
  Ae as FormObject,
  k as IconObject,
  xe as InputObject,
  P as LinkBarObject,
  M as LinkIconObject,
  q as LinkLogoObject,
  K as LinkObject,
  rt as NavBarObject,
  nn as TableActionObject,
  Qt as TableLinkObject,
  lt as TableObject
};
//# sourceMappingURL=alloy-react.es.js.map
