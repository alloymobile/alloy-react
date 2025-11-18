import { jsx as r, jsxs as v } from "react/jsx-runtime";
import * as g from "react";
import { useRef as R, useState as A, useMemo as T, forwardRef as pe, useImperativeHandle as ye, useEffect as ae, useCallback as Je } from "react";
import "react-dom";
function j(e = "id") {
  const t = Date.now(), n = Math.random().toString(36).slice(2, 7);
  return `${e}-${t}-${n}`;
}
class w {
  constructor(t = {}) {
    const { id: n, name: s, className: a } = t;
    this.id = n ?? j("tag"), this.name = s ?? "", this.className = a ?? "";
  }
}
class F {
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
      type: s = "",
      action: a = "",
      data: l = {},
      error: c = !1
    } = t || {}, o = typeof n < "u" ? n : l && typeof l.id < "u" ? l.id : "";
    this.id = o, this.type = s, this.action = a, this.error = !!c, this.data = { ...l };
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
  static ok({ id: t = "", type: n = "", action: s = "", data: a = {} } = {}) {
    return new F({
      id: t,
      type: n,
      action: s,
      error: !1,
      data: a
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
    action: s = "",
    message: a = "",
    data: l = {}
  } = {}) {
    const c = { ...l };
    return a && c.message == null && (c.message = String(a)), new F({
      id: t,
      type: n,
      action: s,
      error: !0,
      data: c
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
    const s = { ...this.data, ...n };
    return t && s.message == null && (s.message = String(t)), this.data = s, this;
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
class B {
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
    this.id = t.id ?? j("icon"), this.iconClass = t.iconClass;
  }
}
function D({ icon: e }) {
  if (!e) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ r("i", { id: e.id, className: e.iconClass, "aria-hidden": "true" });
}
function Ge(e = "", t = "") {
  const [n, s] = A(!1), [a, l] = A(!1), [c, o] = A(!1);
  return {
    className: T(() => [e, (n || a || c) && t].filter(Boolean).join(" "), [e, t, n, a, c]),
    events: {
      onMouseEnter: () => s(!0),
      onMouseLeave: () => {
        s(!1), l(!1);
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
    this.id = t.id ?? j("link"), this.name = t.name, this.href = t.href, this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function Ye({ link: e }) {
  if (!e || !(e instanceof K))
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  const t = R(e.id), { className: n, events: s } = Ge(e.className, e.active), a = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel;
  return /* @__PURE__ */ r(
    "a",
    {
      id: t.current,
      href: e.href,
      className: n,
      target: e.target,
      rel: a,
      onClick: e.onClick,
      title: e.title,
      ...s,
      children: /* @__PURE__ */ r("span", { children: e.name })
    }
  );
}
function Ze(e = "", t = "") {
  const [n, s] = A(!1), [a, l] = A(!1), [c, o] = A(!1);
  return {
    className: T(() => [e, (n || a || c) && t].filter(Boolean).join(" "), [e, t, n, a, c]),
    events: {
      onMouseEnter: () => s(!0),
      onMouseLeave: () => {
        s(!1), l(!1);
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
    const n = t.icon instanceof B ? t.icon : new B(t.icon);
    this.id = t.id ?? j("link-icon"), this.href = t.href, this.icon = n, this.name = t.name, this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function Xe({ linkIcon: e }) {
  if (!e || !(e instanceof M))
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  const t = R(e.id), { className: n, events: s } = Ze(
    e.className,
    e.active
  ), a = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, l = !!e.name;
  return /* @__PURE__ */ r(
    "a",
    {
      id: t.current,
      href: e.href,
      className: n,
      target: e.target,
      rel: a,
      onClick: e.onClick,
      title: e.title,
      ...s,
      children: /* @__PURE__ */ v("span", { className: "d-inline-flex align-items-center", children: [
        /* @__PURE__ */ r(D, { icon: e.icon }),
        l && /* @__PURE__ */ r("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
function Qe(e = "", t = "") {
  const [n, s] = A(!1), [a, l] = A(!1), [c, o] = A(!1);
  return {
    className: T(() => [e, (n || a || c) && t].filter(Boolean).join(" "), [e, t, n, a, c]),
    events: {
      onMouseEnter: () => s(!0),
      onMouseLeave: () => {
        s(!1), l(!1);
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
    this.id = t.id ?? j("link-logo"), this.name = t.name, this.href = t.href, this.logo = t.logo, this.width = t.width, this.height = t.height, this.logoAlt = t.logoAlt ?? t.name ?? "", this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function Se({ linkLogo: e }) {
  if (!e || !(e instanceof q))
    throw new Error(
      "AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance)."
    );
  const t = R(e.id), { className: n, events: s } = Qe(
    e.className,
    e.active
  ), a = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, l = !!e.name;
  return /* @__PURE__ */ r(
    "a",
    {
      id: t.current,
      href: e.href,
      className: n,
      target: e.target,
      rel: a,
      onClick: e.onClick,
      title: e.title,
      ...s,
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
        l && /* @__PURE__ */ r("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
function Ie(e = "", t = "") {
  const [n, s] = A(!1), [a, l] = A(!1), [c, o] = A(!1);
  return {
    className: T(() => [e, (n || a || c) && t].filter(Boolean).join(" "), [e, t, n, a, c]),
    events: {
      onMouseEnter: () => s(!0),
      onMouseLeave: () => {
        s(!1), l(!1);
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
    this.id = t.id ?? j("btn"), this.name = t.name, this.className = t.className ?? "btn btn-primary", this.active = t.active ?? "", this.disabled = !!t.disabled, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const et = pe(function({ button: t, output: n }, s) {
  if (!t || !(t instanceof W))
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  const a = R(null), l = R(t.id), c = t.disabled, { className: o, events: d } = Ie(
    t.className,
    t.active
  );
  ye(
    s,
    () => ({
      el: a.current,
      model: t,
      focus: () => {
        var h;
        return (h = a.current) == null ? void 0 : h.focus();
      },
      click: () => {
        var h;
        return (h = a.current) == null ? void 0 : h.click();
      }
    }),
    [t]
  );
  const i = (h, f, p) => (m) => {
    if (f == null || f(m), typeof n == "function") {
      const N = F.ok({
        id: t.id,
        type: "button",
        action: p,
        data: {
          // keep payload minimal; we don't duplicate id here
          name: t.name
        }
      });
      n(N);
    }
    h == null || h(m, t);
  }, u = {
    onClick: i(t.onClick, void 0, "click"),
    onKeyDown: i(t.onKeyDown, d.onFocus, "keydown"),
    onKeyUp: i(t.onKeyUp, void 0, "keyup"),
    onFocus: i(t.onFocus, d.onFocus, "focus"),
    onBlur: i(t.onBlur, d.onBlur, "blur"),
    onMouseEnter: i(
      t.onMouseEnter,
      d.onMouseEnter,
      "mouseenter"
    ),
    onMouseLeave: i(
      t.onMouseLeave,
      d.onMouseLeave,
      "mouseleave"
    ),
    onMouseDown: i(void 0, d.onMouseDown, "mousedown"),
    onMouseUp: i(void 0, d.onMouseUp, "mouseup")
  };
  return /* @__PURE__ */ r(
    "button",
    {
      id: l.current,
      ref: a,
      type: "button",
      className: o,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-disabled": c || void 0,
      disabled: c,
      tabIndex: t.tabIndex,
      ...u,
      children: /* @__PURE__ */ r("span", { className: "px-2 align-middle", children: t.name })
    }
  );
});
function tt(e = "", t = "") {
  const [n, s] = A(!1), [a, l] = A(!1), [c, o] = A(!1);
  return {
    className: T(() => [e, (n || a || c) && t].filter(Boolean).join(" "), [e, t, n, a, c]),
    events: {
      onMouseEnter: () => s(!0),
      onMouseLeave: () => {
        s(!1), l(!1);
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
    const n = t.icon instanceof B ? t.icon : new B(t.icon);
    this.id = t.id ?? j("btn-icon"), this.name = t.name, this.icon = n, this.className = t.className ?? "btn btn-primary", this.active = t.active ?? "", this.disabled = !!t.disabled, this.title = t.title ?? t.name ?? "icon button", this.ariaLabel = t.ariaLabel ?? t.name ?? "icon button", this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const nt = pe(function({ buttonIcon: t, output: n }, s) {
  if (!t || !(t instanceof z))
    throw new Error(
      "AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance)."
    );
  const a = R(null), l = R(t.id), c = t.disabled, { className: o, events: d } = tt(
    t.className,
    t.active
  );
  ye(
    s,
    () => ({
      el: a.current,
      model: t,
      focus: () => {
        var h;
        return (h = a.current) == null ? void 0 : h.focus();
      },
      click: () => {
        var h;
        return (h = a.current) == null ? void 0 : h.click();
      }
    }),
    [t]
  );
  const i = (h, f, p) => (m) => {
    if (f == null || f(m), typeof n == "function") {
      const N = new F({
        id: t.id,
        type: "button-icon",
        action: p,
        data: {
          // minimal payload: only "name" (no disabled, iconClass, etc.)
          name: t.name ?? ""
        }
      });
      n(N);
    }
    h == null || h(m, t);
  }, u = {
    onClick: i(t.onClick, void 0, "click"),
    onKeyDown: i(t.onKeyDown, d.onFocus, "keydown"),
    onKeyUp: i(t.onKeyUp, void 0, "keyup"),
    onFocus: i(t.onFocus, d.onFocus, "focus"),
    onBlur: i(t.onBlur, d.onBlur, "blur"),
    onMouseEnter: i(
      t.onMouseEnter,
      d.onMouseEnter,
      "mouseenter"
    ),
    onMouseLeave: i(
      t.onMouseLeave,
      d.onMouseLeave,
      "mouseleave"
    ),
    onMouseDown: i(void 0, d.onMouseDown, "mousedown"),
    onMouseUp: i(void 0, d.onMouseUp, "mouseup")
  };
  return /* @__PURE__ */ v(
    "button",
    {
      id: l.current,
      ref: a,
      type: "button",
      className: o,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-disabled": c || void 0,
      disabled: c,
      tabIndex: t.tabIndex,
      ...u,
      children: [
        /* @__PURE__ */ r("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ r(D, { icon: t.icon }) }),
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
    const n = t.icon instanceof B ? t.icon : new B(t.icon);
    this.id = t.id ?? j("btn-submit"), this.name = t.name, this.icon = n, this.className = t.className ?? "", this.disabled = !!t.disabled, this.loading = !!t.loading, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onMouseDown = t.onMouseDown, this.onKeyDown = t.onKeyDown;
  }
}
const st = pe(function({ buttonSubmit: t, output: n }, s) {
  if (!t || !(t instanceof ne))
    throw new Error(
      "AlloyButtonSubmit requires `buttonSubmit` (ButtonSubmitObject instance)."
    );
  const a = R(null), l = R(t.id), [c, o] = A(!!t.loading), d = R(!1);
  ae(() => {
    const y = !!t.loading;
    o(y), y || (d.current = !1);
  }, [t.loading]);
  const i = t.disabled || c;
  ye(
    s,
    () => ({
      el: a.current,
      model: t,
      focus: () => {
        var y;
        return (y = a.current) == null ? void 0 : y.focus();
      },
      click: () => {
        var y;
        return (y = a.current) == null ? void 0 : y.click();
      }
    }),
    [t]
  );
  const u = () => d.current || i ? !1 : (d.current = !0, t.loading = !0, t.disabled = !0, o(!0), !0), h = (y, x, b) => {
    if (typeof n == "function") {
      const k = new F({
        id: t.id,
        type: "button-submit",
        action: b,
        error: !1,
        data: {
          name: t.name
        }
      });
      n(k);
    }
    x == null || x(y, t);
  }, f = (y) => {
    u() && h(y, t.onClick, "click");
  }, p = (y) => {
    u() && h(y, t.onMouseDown, "mousedown");
  }, m = (y) => {
    const x = y.key;
    (x === "Enter" || x === " ") && u() && h(y, t.onKeyDown, "keydown");
  }, N = c;
  return /* @__PURE__ */ v(
    "button",
    {
      id: l.current,
      ref: a,
      type: "submit",
      className: t.className,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-busy": c || void 0,
      "aria-disabled": i || void 0,
      disabled: i,
      tabIndex: t.tabIndex,
      onClick: f,
      onMouseDown: p,
      onKeyDown: m,
      children: [
        N && /* @__PURE__ */ r("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ r(D, { icon: t.icon }) }),
        /* @__PURE__ */ r("span", { className: N ? "px-2 align-middle" : "align-middle", children: t.name }),
        c ? /* @__PURE__ */ r("span", { className: "ms-2 visually-hidden", "aria-live": "polite", children: "Loading…" }) : null
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
      name: s,
      type: a = "text",
      label: l = "",
      value: c,
      layout: o = "text",
      icon: d,
      placeholder: i = "",
      required: u = !1,
      minLength: h,
      maxLength: f,
      min: p,
      max: m,
      pattern: N,
      matchWith: y,
      passwordStrength: x,
      className: b,
      options: k = [],
      validators: O = [],
      ...C
    } = t;
    if (!s)
      throw new Error("InputObject requires `name`.");
    if ((o === "icon" || o === "floating") && !d)
      throw new Error(
        "InputObject with layout='icon' or 'floating' requires `icon`."
      );
    let E;
    typeof c < "u" ? E = c : a === "checkbox" ? E = [] : E = "";
    const L = d instanceof B ? d : d ? new B(d) : void 0;
    this.id = n ?? j("input"), this.name = s, this.type = a, this.label = l, this.value = E, this.layout = o, this.icon = L, this.placeholder = i, this.required = !!u, this.minLength = h, this.maxLength = f, this.min = p, this.max = m, this.pattern = N, this.matchWith = y, this.passwordStrength = x, typeof b == "string" && b.trim() !== "" ? this.className = b.trim() : a === "select" ? this.className = "form-select" : a === "radio" || a === "checkbox" ? this.className = "form-check-input" : this.className = "form-control", this.options = k, this.validators = O, Object.assign(this, C);
  }
}
function at({ input: e, output: t }) {
  const [n, s] = A(e.value), [a, l] = A(!1);
  ae(() => {
    s(e.value), l(!1);
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
  const c = (C) => {
    const E = [], L = typeof C == "string" ? C.trim() : C;
    if (e.required) {
      const U = Array.isArray(L) && L.length === 0, Y = !Array.isArray(L) && (L === "" || L === !1 || L == null);
      (U || Y) && E.push("This field is required.");
    }
    return typeof L == "string" && e.minLength != null && L.length < e.minLength && E.push(`Minimum length is ${e.minLength}`), typeof L == "string" && e.maxLength != null && L.length > e.maxLength && E.push(`Maximum length is ${e.maxLength}`), typeof L == "string" && e.pattern && e.pattern !== "" && (new RegExp(e.pattern).test(L) || E.push("Invalid format.")), e.passwordStrength && typeof L == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(
      L
    ) || E.push("Password is too weak.")), E;
  }, o = c(n), d = a && o.length > 0, i = d && o.length > 0 && /* @__PURE__ */ r("div", { className: "mt-2", "aria-live": "polite", children: o.map((C, E) => /* @__PURE__ */ r(
    "div",
    {
      className: "alert alert-danger py-2 mb-2",
      role: "alert",
      children: C
    },
    E
  )) }), u = (C, E = "change") => {
    const L = c(C), U = L.length > 0;
    if (typeof t == "function") {
      const Y = new F({
        id: e.id,
        type: "input",
        action: E,
        error: U,
        data: {
          name: e.name,
          value: C,
          errors: L
        }
      });
      t(Y);
    }
  }, h = (C) => {
    const E = C.target.value;
    if (e.type === "checkbox") {
      const L = Array.isArray(n) ? [...n] : [], U = L.indexOf(E);
      U > -1 ? L.splice(U, 1) : L.push(E), s(L), u(L, "change");
    } else e.type, s(E), u(E, "change");
  }, f = () => {
    l(!0), u(n, "blur");
  }, p = {
    id: e.id,
    name: e.name,
    placeholder: e.placeholder,
    onBlur: f,
    "aria-invalid": d || void 0
  }, m = (C) => C + (d ? " is-invalid" : ""), N = () => /* @__PURE__ */ r(
    "textarea",
    {
      ...p,
      value: n,
      onChange: h,
      className: m(e.className)
    }
  ), y = () => /* @__PURE__ */ r(
    "select",
    {
      ...p,
      value: n,
      onChange: h,
      className: m(e.className),
      children: e.options.map((C) => /* @__PURE__ */ r("option", { value: C.value, children: C.label }, C.value))
    }
  ), x = () => /* @__PURE__ */ v("div", { children: [
    e.label && /* @__PURE__ */ r("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((C, E) => /* @__PURE__ */ v("div", { className: "form-check", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "radio",
          id: `${e.id}_${E}`,
          className: m(e.className),
          name: e.name,
          value: C.value,
          checked: n === C.value,
          onChange: h,
          onBlur: f,
          "aria-invalid": d || void 0
        }
      ),
      /* @__PURE__ */ r(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${E}`,
          children: C.label
        }
      )
    ] }, E)),
    i
  ] }), b = () => /* @__PURE__ */ v("div", { children: [
    e.label && /* @__PURE__ */ r("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((C, E) => /* @__PURE__ */ v("div", { className: "form-check", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "checkbox",
          id: `${e.id}_${E}`,
          className: m(e.className),
          name: e.name,
          value: C.value,
          checked: Array.isArray(n) && n.includes(C.value),
          onChange: h,
          onBlur: f,
          "aria-invalid": d || void 0
        }
      ),
      /* @__PURE__ */ r(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${E}`,
          children: C.label
        }
      )
    ] }, E)),
    i
  ] }), k = () => /* @__PURE__ */ r(
    "input",
    {
      ...p,
      type: e.type,
      value: n,
      onChange: h,
      className: m(e.className)
    }
  ), O = () => {
    switch (e.type) {
      case "textarea":
        return N();
      case "select":
        return y();
      case "radio":
        return x();
      case "checkbox":
        return b();
      default:
        return k();
    }
  };
  return e.layout === "floating" ? /* @__PURE__ */ v("div", { className: "mb-3", children: [
    /* @__PURE__ */ v("div", { className: "form-floating", children: [
      O(),
      /* @__PURE__ */ v("label", { htmlFor: e.id, children: [
        e.icon && /* @__PURE__ */ r(D, { icon: e.icon }),
        e.icon && " ",
        e.label
      ] })
    ] }),
    !(e.type === "radio" || e.type === "checkbox") && i
  ] }) : e.layout === "icon" ? /* @__PURE__ */ v("div", { className: "mb-3", children: [
    e.label && /* @__PURE__ */ r("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    /* @__PURE__ */ v("div", { className: "input-group", children: [
      /* @__PURE__ */ r("span", { className: "input-group-text", children: /* @__PURE__ */ r(D, { icon: e.icon }) }),
      ["radio", "checkbox"].includes(e.type) ? O() : /* @__PURE__ */ r(
        "input",
        {
          ...p,
          type: e.type,
          value: n,
          onChange: h,
          className: m(e.className)
        }
      )
    ] }),
    !(e.type === "radio" || e.type === "checkbox") && i
  ] }) : /* @__PURE__ */ v("div", { className: "mb-3", children: [
    ["text", "textarea", "number", "email", "password", "date"].includes(
      e.type
    ) && e.label && /* @__PURE__ */ r("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    O(),
    !(e.type === "radio" || e.type === "checkbox") && i
  ] });
}
class P {
  /**
   * @param {LinkBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? j("linkBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyLink", this.linkClass = t.linkClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof w ? this.title = t.title : t.title ? this.title = new w(t.title) : this.title = new w({});
    const n = Array.isArray(t.links) ? t.links : [];
    this.type === "AlloyLinkIcon" ? this.links = n.map(
      (s) => s instanceof M ? s : new M(s)
    ) : this.type === "AlloyLinkLogo" ? this.links = n.map(
      (s) => s instanceof q ? s : new q(s)
    ) : this.links = n.map(
      (s) => s instanceof K ? s : new K(s)
    );
  }
}
function it(e, t, n, s) {
  const a = n ? t : "";
  return e instanceof K ? new K({
    id: e.id,
    name: e.name,
    href: e.href,
    className: e.className,
    active: a,
    target: e.target,
    rel: e.rel,
    onClick: s,
    title: e.title
  }) : e instanceof M ? new M({
    id: e.id,
    href: e.href,
    icon: e.icon,
    name: e.name,
    className: e.className,
    active: a,
    target: e.target,
    rel: e.rel,
    onClick: s,
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
    active: a,
    target: e.target,
    rel: e.rel,
    onClick: s,
    title: e.title
  }) : e;
}
function ie({ linkBar: e }) {
  if (!e || !(e instanceof P))
    throw new Error("AlloyLinkBar requires `linkBar` (LinkBarObject instance).");
  const t = R(e.id), [n, s] = A("");
  ae(() => {
    s("");
  }, [e]);
  const a = () => e.title && e.title.name ? /* @__PURE__ */ r(
    "div",
    {
      id: e.title.id,
      className: e.title.className,
      children: e.title.name
    }
  ) : null;
  function l(o) {
    const d = o.onClick;
    return (i) => {
      const u = o.id || `${o.href || ""}-${o.name || ""}`;
      s(u), d == null || d(i);
    };
  }
  function c() {
    return /* @__PURE__ */ r("ul", { id: t.current, className: e.className, children: e.links.map((o, d) => {
      const i = ((o == null ? void 0 : o.id) ?? "") === n, u = it(
        o,
        e.selected,
        i,
        l(o)
      );
      switch (e.type) {
        case "AlloyLink":
          if (!(u instanceof K))
            throw new Error(
              "AlloyLinkBar (type='AlloyLink') expects each link to be a LinkObject instance."
            );
          return /* @__PURE__ */ r(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ r(Ye, { link: u })
            },
            ((o == null ? void 0 : o.id) ?? d) + "-li"
          );
        case "AlloyLinkIcon":
          if (!(u instanceof M))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkIcon') expects each link to be a LinkIconObject instance."
            );
          return /* @__PURE__ */ r(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ r(Xe, { linkIcon: u })
            },
            ((o == null ? void 0 : o.id) ?? d) + "-li"
          );
        case "AlloyLinkLogo":
          if (!(u instanceof q))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkLogo') expects each link to be a LinkLogoObject instance."
            );
          return /* @__PURE__ */ r(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ r(Se, { linkLogo: u })
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
  return /* @__PURE__ */ v("nav", { "data-type": e.type, children: [
    /* @__PURE__ */ r(a, {}),
    c()
  ] });
}
class V {
  /**
   * @param {ButtonBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? j("buttonBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyButton", this.buttonClass = t.buttonClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof w ? this.title = t.title : t.title ? this.title = new w(t.title) : this.title = new w({});
    const n = Array.isArray(t.buttons) ? t.buttons : [];
    this.type === "AlloyButtonIcon" ? this.buttons = n.map(
      (s) => s instanceof z ? s : new z(s)
    ) : this.buttons = n.map(
      (s) => s instanceof W ? s : new W(s)
    );
  }
}
function Ce(e, t, n, s, a) {
  const l = n ? t : "";
  function c(o) {
    var u, h;
    if (!o)
      return;
    if ((o.action || ((u = o == null ? void 0 : o.data) == null ? void 0 : u.event) || "") === "click") {
      const f = ((h = o == null ? void 0 : o.data) == null ? void 0 : h.id) ?? "";
      f && s(f);
    }
    a == null || a(o);
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
  }), onAnyEvent: c } : e instanceof z ? { model: new z({
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
  }), onAnyEvent: c } : { model: e, onAnyEvent: c };
}
function re({ buttonBar: e, output: t }) {
  if (!e || !(e instanceof V))
    throw new Error(
      "AlloyButtonBar requires `buttonBar` (ButtonBarObject instance)."
    );
  const n = R(e.id), [s, a] = A("");
  ae(() => {
    a("");
  }, [e]);
  const l = () => e.title && e.title.name ? /* @__PURE__ */ r("div", { id: e.title.id, className: e.title.className, children: e.title.name }) : null;
  function c() {
    return /* @__PURE__ */ r("ul", { id: n.current, className: e.className, children: e.buttons.map((i, u) => {
      if (!(i instanceof W))
        throw new Error(
          "AlloyButtonBar (type='AlloyButton') expects ButtonObject items."
        );
      const h = ((i == null ? void 0 : i.id) ?? "") === s, { model: f, onAnyEvent: p } = Ce(
        i,
        e.selected,
        h,
        a,
        t
      );
      return /* @__PURE__ */ r(
        "li",
        {
          className: e.buttonClass,
          children: /* @__PURE__ */ r(et, { button: f, output: p })
        },
        ((i == null ? void 0 : i.id) ?? u) + "-li"
      );
    }) });
  }
  function o() {
    return /* @__PURE__ */ r("ul", { id: n.current, className: e.className, children: e.buttons.map((i, u) => {
      if (!(i instanceof z))
        throw new Error(
          "AlloyButtonBar (type='AlloyButtonIcon') expects ButtonIconObject items."
        );
      const h = ((i == null ? void 0 : i.id) ?? "") === s, { model: f, onAnyEvent: p } = Ce(
        i,
        e.selected,
        h,
        a,
        t
      );
      return /* @__PURE__ */ r(
        "li",
        {
          className: e.buttonClass,
          children: /* @__PURE__ */ r(nt, { buttonIcon: f, output: p })
        },
        ((i == null ? void 0 : i.id) ?? u) + "-li"
      );
    }) });
  }
  function d() {
    switch (e.type) {
      case "AlloyButtonIcon":
        return o();
      case "AlloyButton":
      default:
        return c();
    }
  }
  return /* @__PURE__ */ v("nav", { "data-type": e.type, children: [
    /* @__PURE__ */ r(l, {}),
    d()
  ] });
}
class rt {
  /**
   * @param {NavBarConfig} nav = {}
   */
  constructor(t = {}) {
    if (this.id = t.id ?? j("navbar"), this.className = t.className ?? "navbar navbar-expand-lg navbar-light bg-light", t.logo instanceof q)
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
function fn({ navBar: e }) {
  if (!e || !(e instanceof rt))
    throw new Error("AlloyNavBar requires `navBar` (NavBarObject instance).");
  const t = R(e.id), n = `${t.current}-collapse`;
  return /* @__PURE__ */ r("nav", { id: t.current, className: e.className, children: /* @__PURE__ */ v("div", { className: "container-fluid", children: [
    /* @__PURE__ */ r(Se, { linkLogo: e.logo }),
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
    this.id = t.id ?? j("table"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [];
    const n = { iconClass: "fa-solid fa-user" }, s = { iconClass: "fa-solid fa-arrow-down" }, a = t.icon instanceof B ? t.icon : new B(t.icon || n), l = t.sort instanceof B ? t.sort : new B(t.sort || s);
    this.icon = a, this.sort = l;
  }
}
function ct(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function mn({ table: e, output: t }) {
  if (!e || !(e instanceof lt))
    throw new Error("AlloyTable requires `table` (TableObject instance).");
  const n = R(e.id), [s, a] = A({ col: "", dir: "asc" }), l = T(
    () => ct(e.rows),
    [e.rows]
  ), c = (d) => {
    if (!d) return;
    const i = s.col === d && s.dir === "asc" ? "desc" : "asc";
    a({ col: d, dir: i }), t == null || t({
      type: "column",
      name: d,
      dir: i
    });
  }, o = (d) => {
    t == null || t({
      type: "row",
      id: d
    });
  };
  return /* @__PURE__ */ v("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ r("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ v("tr", { children: [
      /* @__PURE__ */ r("th", { scope: "col", children: "Type" }),
      l.map((d) => {
        const i = s.col === d, u = i && s.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ v(
          "span",
          {
            onClick: () => c(d),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              ot(d),
              i && /* @__PURE__ */ r(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: u ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: u ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ r(D, { icon: e.sort })
                }
              )
            ]
          }
        ) }, d);
      })
    ] }) }),
    /* @__PURE__ */ r("tbody", { children: e.rows.length > 0 ? e.rows.map((d, i) => /* @__PURE__ */ v(
      "tr",
      {
        onClick: () => o(d == null ? void 0 : d.id),
        style: { cursor: "pointer" },
        children: [
          /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(D, { icon: e.icon }) }),
          l.map((u) => /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r("span", { children: d == null ? void 0 : d[u] }) }, `${(d == null ? void 0 : d.id) ?? i}-${u}`))
        ]
      },
      (d == null ? void 0 : d.id) ?? i
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
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
    }
    return e;
  }, ue.apply(this, arguments);
}
var Ee;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(Ee || (Ee = {}));
function S(e, t) {
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
function fe(e) {
  let {
    pathname: t = "/",
    search: n = "",
    hash: s = ""
  } = e;
  return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n), s && s !== "#" && (t += s.charAt(0) === "#" ? s : "#" + s), t;
}
function Re(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
    let s = e.indexOf("?");
    s >= 0 && (t.search = e.substr(s), e = e.substr(0, s)), e && (t.pathname = e);
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
  let [n, s] = dt(e.path, e.caseSensitive, e.end), a = t.match(n);
  if (!a) return null;
  let l = a[0], c = l.replace(/(.)\/+$/, "$1"), o = a.slice(1);
  return {
    params: s.reduce((i, u, h) => {
      let {
        paramName: f,
        isOptional: p
      } = u;
      if (f === "*") {
        let N = o[h] || "";
        c = l.slice(0, l.length - N.length).replace(/(.)\/+$/, "$1");
      }
      const m = o[h];
      return p && !m ? i[f] = void 0 : i[f] = (m || "").replace(/%2F/g, "/"), i;
    }, {}),
    pathname: l,
    pathnameBase: c,
    pattern: e
  };
}
function dt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !0), Z(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let s = [], a = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (c, o, d) => (s.push({
    paramName: o,
    isOptional: d != null
  }), d ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (s.push({
    paramName: "*"
  }), a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? a += "\\/*$" : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"), [new RegExp(a, t ? void 0 : "i"), s];
}
function H(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length, s = e.charAt(n);
  return s && s !== "/" ? null : e.slice(n) || "/";
}
function ht(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: s = "",
    hash: a = ""
  } = typeof e == "string" ? Re(e) : e;
  return {
    pathname: n ? n.startsWith("/") ? n : ut(n, t) : t,
    search: mt(s),
    hash: pt(a)
  };
}
function ut(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((a) => {
    a === ".." ? n.length > 1 && n.pop() : a !== "." && n.push(a);
  }), n.length > 1 ? n.join("/") : "/";
}
function de(e, t, n, s) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(s) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function ft(e) {
  return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0);
}
function Fe(e, t) {
  let n = ft(e);
  return t ? n.map((s, a) => a === n.length - 1 ? s.pathname : s.pathnameBase) : n.map((s) => s.pathnameBase);
}
function De(e, t, n, s) {
  s === void 0 && (s = !1);
  let a;
  typeof e == "string" ? a = Re(e) : (a = ue({}, e), S(!a.pathname || !a.pathname.includes("?"), de("?", "pathname", "search", a)), S(!a.pathname || !a.pathname.includes("#"), de("#", "pathname", "hash", a)), S(!a.search || !a.search.includes("#"), de("#", "search", "hash", a)));
  let l = e === "" || a.pathname === "", c = l ? "/" : a.pathname, o;
  if (c == null)
    o = n;
  else {
    let h = t.length - 1;
    if (!s && c.startsWith("..")) {
      let f = c.split("/");
      for (; f[0] === ".."; )
        f.shift(), h -= 1;
      a.pathname = f.join("/");
    }
    o = h >= 0 ? t[h] : "/";
  }
  let d = ht(a, o), i = c && c !== "/" && c.endsWith("/"), u = (l || c === ".") && n.endsWith("/");
  return !d.pathname.endsWith("/") && (i || u) && (d.pathname += "/"), d;
}
const ve = (e) => e.join("/").replace(/\/\/+/g, "/"), mt = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, pt = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, Ue = ["post", "put", "patch", "delete"];
new Set(Ue);
const yt = ["get", ...Ue];
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
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
    }
    return e;
  }, me.apply(this, arguments);
}
const oe = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (oe.displayName = "DataRouter");
const Te = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (Te.displayName = "DataRouterState");
const vt = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (vt.displayName = "Await");
const _ = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (_.displayName = "Navigation");
const Ne = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (Ne.displayName = "Location");
const G = /* @__PURE__ */ g.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (G.displayName = "Route");
const Nt = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (Nt.displayName = "RouteError");
function wt(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t;
  we() || (process.env.NODE_ENV !== "production" ? S(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : S(!1));
  let {
    basename: s,
    navigator: a
  } = g.useContext(_), {
    hash: l,
    pathname: c,
    search: o
  } = Q(e, {
    relative: n
  }), d = c;
  return s !== "/" && (d = c === "/" ? s : ve([s, c])), a.createHref({
    pathname: d,
    search: o,
    hash: l
  });
}
function we() {
  return g.useContext(Ne) != null;
}
function X() {
  return we() || (process.env.NODE_ENV !== "production" ? S(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : S(!1)), g.useContext(Ne).location;
}
const $e = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Pe(e) {
  g.useContext(_).static || g.useLayoutEffect(e);
}
function gt() {
  let {
    isDataRoute: e
  } = g.useContext(G);
  return e ? kt() : bt();
}
function bt() {
  we() || (process.env.NODE_ENV !== "production" ? S(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : S(!1));
  let e = g.useContext(oe), {
    basename: t,
    future: n,
    navigator: s
  } = g.useContext(_), {
    matches: a
  } = g.useContext(G), {
    pathname: l
  } = X(), c = JSON.stringify(Fe(a, n.v7_relativeSplatPath)), o = g.useRef(!1);
  return Pe(() => {
    o.current = !0;
  }), g.useCallback(function(i, u) {
    if (u === void 0 && (u = {}), process.env.NODE_ENV !== "production" && Z(o.current, $e), !o.current) return;
    if (typeof i == "number") {
      s.go(i);
      return;
    }
    let h = De(i, JSON.parse(c), l, u.relative === "path");
    e == null && t !== "/" && (h.pathname = h.pathname === "/" ? t : ve([t, h.pathname])), (u.replace ? s.replace : s.push)(h, u.state, u);
  }, [t, s, c, l, e]);
}
function Q(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    future: s
  } = g.useContext(_), {
    matches: a
  } = g.useContext(G), {
    pathname: l
  } = X(), c = JSON.stringify(Fe(a, s.v7_relativeSplatPath));
  return g.useMemo(() => De(e, JSON.parse(c), l, n === "path"), [e, c, l, n]);
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
  let t = g.useContext(oe);
  return t || (process.env.NODE_ENV !== "production" ? S(!1, _e(e)) : S(!1)), t;
}
function Ct(e) {
  let t = g.useContext(G);
  return t || (process.env.NODE_ENV !== "production" ? S(!1, _e(e)) : S(!1)), t;
}
function qe(e) {
  let t = Ct(e), n = t.matches[t.matches.length - 1];
  return n.route.id || (process.env.NODE_ENV !== "production" ? S(!1, e + ' can only be used on routes that contain a unique "id"') : S(!1)), n.route.id;
}
function Et() {
  return qe(ge.UseRouteId);
}
function kt() {
  let {
    router: e
  } = xt(Ve.UseNavigateStable), t = qe(ge.UseNavigateStable), n = g.useRef(!1);
  return Pe(() => {
    n.current = !0;
  }), g.useCallback(function(a, l) {
    l === void 0 && (l = {}), process.env.NODE_ENV !== "production" && Z(n.current, $e), n.current && (typeof a == "number" ? e.navigate(a) : e.navigate(a, me({
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
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
    }
    return e;
  }, J.apply(this, arguments);
}
function be(e, t) {
  if (e == null) return {};
  var n = {}, s = Object.keys(e), a, l;
  for (l = 0; l < s.length; l++)
    a = s[l], !(t.indexOf(a) >= 0) && (n[a] = e[a]);
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
function St() {
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
const Rt = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function he(e) {
  return e != null && !Rt.has(e) ? (process.env.NODE_ENV !== "production" && Z(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + te + '"')), null) : e;
}
function Ft(e, t) {
  let n, s, a, l, c;
  if (Ot(e)) {
    let o = e.getAttribute("action");
    s = o ? H(o, t) : null, n = e.getAttribute("method") || ee, a = he(e.getAttribute("enctype")) || te, l = new FormData(e);
  } else if (Lt(e) || Bt(e) && (e.type === "submit" || e.type === "image")) {
    let o = e.form;
    if (o == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let d = e.getAttribute("formaction") || o.getAttribute("action");
    if (s = d ? H(d, t) : null, n = e.getAttribute("formmethod") || o.getAttribute("method") || ee, a = he(e.getAttribute("formenctype")) || he(o.getAttribute("enctype")) || te, l = new FormData(o, e), !St()) {
      let {
        name: i,
        type: u,
        value: h
      } = e;
      if (u === "image") {
        let f = i ? i + "." : "";
        l.append(f + "x", "0"), l.append(f + "y", "0");
      } else i && l.append(i, h);
    }
  } else {
    if (le(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    n = ee, s = null, a = te, c = e;
  }
  return l && a === "text/plain" && (c = l, l = void 0), {
    action: s,
    method: n.toLowerCase(),
    encType: a,
    formData: l,
    body: c
  };
}
const Dt = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], Ut = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], Tt = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], $t = "6";
try {
  window.__reactRouterVersion = $t;
} catch {
}
const Ke = /* @__PURE__ */ g.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (Ke.displayName = "ViewTransition");
const Pt = /* @__PURE__ */ g.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (Pt.displayName = "Fetchers");
process.env.NODE_ENV;
const Vt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", _t = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, $ = /* @__PURE__ */ g.forwardRef(function(t, n) {
  let {
    onClick: s,
    relative: a,
    reloadDocument: l,
    replace: c,
    state: o,
    target: d,
    to: i,
    preventScrollReset: u,
    viewTransition: h
  } = t, f = be(t, Dt), {
    basename: p
  } = g.useContext(_), m, N = !1;
  if (typeof i == "string" && _t.test(i) && (m = i, Vt))
    try {
      let k = new URL(window.location.href), O = i.startsWith("//") ? new URL(k.protocol + i) : new URL(i), C = H(O.pathname, p);
      O.origin === k.origin && C != null ? i = C + O.search + O.hash : N = !0;
    } catch {
      process.env.NODE_ENV !== "production" && Z(!1, '<Link to="' + i + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let y = wt(i, {
    relative: a
  }), x = Wt(i, {
    replace: c,
    state: o,
    target: d,
    preventScrollReset: u,
    relative: a,
    viewTransition: h
  });
  function b(k) {
    s && s(k), k.defaultPrevented || x(k);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ g.createElement("a", J({}, f, {
      href: m || y,
      onClick: N || l ? s : b,
      ref: n,
      target: d
    }))
  );
});
process.env.NODE_ENV !== "production" && ($.displayName = "Link");
const qt = /* @__PURE__ */ g.forwardRef(function(t, n) {
  let {
    "aria-current": s = "page",
    caseSensitive: a = !1,
    className: l = "",
    end: c = !1,
    style: o,
    to: d,
    viewTransition: i,
    children: u
  } = t, h = be(t, Ut), f = Q(d, {
    relative: h.relative
  }), p = X(), m = g.useContext(Te), {
    navigator: N,
    basename: y
  } = g.useContext(_), x = m != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Zt(f) && i === !0, b = N.encodeLocation ? N.encodeLocation(f).pathname : f.pathname, k = p.pathname, O = m && m.navigation && m.navigation.location ? m.navigation.location.pathname : null;
  a || (k = k.toLowerCase(), O = O ? O.toLowerCase() : null, b = b.toLowerCase()), O && y && (O = H(O, y) || O);
  const C = b !== "/" && b.endsWith("/") ? b.length - 1 : b.length;
  let E = k === b || !c && k.startsWith(b) && k.charAt(C) === "/", L = O != null && (O === b || !c && O.startsWith(b) && O.charAt(b.length) === "/"), U = {
    isActive: E,
    isPending: L,
    isTransitioning: x
  }, Y = E ? s : void 0, ce;
  typeof l == "function" ? ce = l(U) : ce = [l, E ? "active" : null, L ? "pending" : null, x ? "transitioning" : null].filter(Boolean).join(" ");
  let He = typeof o == "function" ? o(U) : o;
  return /* @__PURE__ */ g.createElement($, J({}, h, {
    "aria-current": Y,
    className: ce,
    ref: n,
    style: He,
    to: d,
    viewTransition: i
  }), typeof u == "function" ? u(U) : u);
});
process.env.NODE_ENV !== "production" && (qt.displayName = "NavLink");
const Kt = /* @__PURE__ */ g.forwardRef((e, t) => {
  let {
    fetcherKey: n,
    navigate: s,
    reloadDocument: a,
    replace: l,
    state: c,
    method: o = ee,
    action: d,
    onSubmit: i,
    relative: u,
    preventScrollReset: h,
    viewTransition: f
  } = e, p = be(e, Tt), m = Gt(), N = Yt(d, {
    relative: u
  }), y = o.toLowerCase() === "get" ? "get" : "post", x = (b) => {
    if (i && i(b), b.defaultPrevented) return;
    b.preventDefault();
    let k = b.nativeEvent.submitter, O = (k == null ? void 0 : k.getAttribute("formmethod")) || o;
    m(k || b.currentTarget, {
      fetcherKey: n,
      method: O,
      navigate: s,
      replace: l,
      state: c,
      relative: u,
      preventScrollReset: h,
      viewTransition: f
    });
  };
  return /* @__PURE__ */ g.createElement("form", J({
    ref: t,
    method: y,
    action: N,
    onSubmit: a ? i : x
  }, p));
});
process.env.NODE_ENV !== "production" && (Kt.displayName = "Form");
process.env.NODE_ENV;
var se;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(se || (se = {}));
var Oe;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Oe || (Oe = {}));
function Mt(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Me(e) {
  let t = g.useContext(oe);
  return t || (process.env.NODE_ENV !== "production" ? S(!1, Mt(e)) : S(!1)), t;
}
function Wt(e, t) {
  let {
    target: n,
    replace: s,
    state: a,
    preventScrollReset: l,
    relative: c,
    viewTransition: o
  } = t === void 0 ? {} : t, d = gt(), i = X(), u = Q(e, {
    relative: c
  });
  return g.useCallback((h) => {
    if (jt(h, n)) {
      h.preventDefault();
      let f = s !== void 0 ? s : fe(i) === fe(u);
      d(e, {
        replace: f,
        state: a,
        preventScrollReset: l,
        relative: c,
        viewTransition: o
      });
    }
  }, [i, d, u, s, a, n, e, l, c, o]);
}
function zt() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let Ht = 0, Jt = () => "__" + String(++Ht) + "__";
function Gt() {
  let {
    router: e
  } = Me(se.UseSubmit), {
    basename: t
  } = g.useContext(_), n = Et();
  return g.useCallback(function(s, a) {
    a === void 0 && (a = {}), zt();
    let {
      action: l,
      method: c,
      encType: o,
      formData: d,
      body: i
    } = Ft(s, t);
    if (a.navigate === !1) {
      let u = a.fetcherKey || Jt();
      e.fetch(u, n, a.action || l, {
        preventScrollReset: a.preventScrollReset,
        formData: d,
        body: i,
        formMethod: a.method || c,
        formEncType: a.encType || o,
        flushSync: a.flushSync
      });
    } else
      e.navigate(a.action || l, {
        preventScrollReset: a.preventScrollReset,
        formData: d,
        body: i,
        formMethod: a.method || c,
        formEncType: a.encType || o,
        replace: a.replace,
        state: a.state,
        fromRouteId: n,
        flushSync: a.flushSync,
        viewTransition: a.viewTransition
      });
  }, [e, t, n]);
}
function Yt(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    basename: s
  } = g.useContext(_), a = g.useContext(G);
  a || (process.env.NODE_ENV !== "production" ? S(!1, "useFormAction must be used inside a RouteContext") : S(!1));
  let [l] = a.matches.slice(-1), c = J({}, Q(e || ".", {
    relative: n
  })), o = X();
  if (e == null) {
    c.search = o.search;
    let d = new URLSearchParams(c.search), i = d.getAll("index");
    if (i.some((h) => h === "")) {
      d.delete("index"), i.filter((f) => f).forEach((f) => d.append("index", f));
      let h = d.toString();
      c.search = h ? "?" + h : "";
    }
  }
  return (!e || e === ".") && l.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), s !== "/" && (c.pathname = c.pathname === "/" ? s : ve([s, c.pathname])), fe(c);
}
function Zt(e, t) {
  t === void 0 && (t = {});
  let n = g.useContext(Ke);
  n == null && (process.env.NODE_ENV !== "production" ? S(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : S(!1));
  let {
    basename: s
  } = Me(se.useViewTransitionState), a = Q(e, {
    relative: t.relative
  });
  if (!n.isTransitioning)
    return !1;
  let l = H(n.currentLocation.pathname, s) || n.currentLocation.pathname, c = H(n.nextLocation.pathname, s) || n.nextLocation.pathname;
  return Le(a.pathname, c) != null || Le(a.pathname, l) != null;
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
    this.id = t.id ?? j("table-link"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = t.link;
    const n = { iconClass: "fa-solid fa-user" }, s = { iconClass: "fa-solid fa-arrow-down" };
    this.icon = t.icon instanceof B ? t.icon : new B(t.icon || n), this.sort = t.sort instanceof B ? t.sort : new B(t.sort || s);
  }
}
function It(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function pn({ tableLink: e, output: t }) {
  if (!e || !(e instanceof Qt))
    throw new Error(
      "AlloyTableLink requires `tableLink` (TableLinkObject instance)."
    );
  const n = R(e.id), [s, a] = A({ col: "", dir: "asc" }), l = T(
    () => It(e.rows),
    [e.rows]
  ), c = (o) => {
    if (!o) return;
    const d = s.col === o && s.dir === "asc" ? "desc" : "asc";
    a({ col: o, dir: d }), t == null || t({
      type: "column",
      name: o,
      dir: d
    });
  };
  return /* @__PURE__ */ v("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ r("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ v("tr", { children: [
      /* @__PURE__ */ r("th", { scope: "col", children: "Type" }),
      l.map((o) => {
        const d = s.col === o, i = d && s.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ v(
          "span",
          {
            onClick: () => c(o),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              Xt(o),
              d && /* @__PURE__ */ r(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: i ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: i ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ r(D, { icon: e.sort })
                }
              )
            ]
          }
        ) }, o);
      })
    ] }) }),
    /* @__PURE__ */ r("tbody", { children: e.rows.length > 0 ? e.rows.map((o, d) => {
      const i = (o == null ? void 0 : o.id) ?? d, h = `${e.link.endsWith("/") ? e.link.slice(0, -1) : e.link}/${i}`;
      return /* @__PURE__ */ v("tr", { children: [
        /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(D, { icon: e.icon }) }),
        l.map((f) => /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(
          $,
          {
            to: h,
            className: "text-decoration-none",
            onClick: () => t == null ? void 0 : t({
              type: "navigate",
              to: h,
              id: i
            }),
            children: /* @__PURE__ */ r("span", { children: o == null ? void 0 : o[f] })
          }
        ) }, `${i}-${f}`))
      ] }, i);
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
function nn(e) {
  if (!e || typeof e != "object") return "";
  const t = typeof e.name == "string" ? e.name.trim() : "";
  if (t) return t;
  const n = typeof e.ariaLabel == "string" ? e.ariaLabel.trim() : "";
  if (n) return n;
  const s = typeof e.title == "string" ? e.title.trim() : "";
  if (s) return s;
  const a = typeof e.id == "string" ? e.id.trim() : "";
  return a || "";
}
class sn {
  /**
   * @param {Object} cfg
   */
  constructor(t = {}) {
    this.id = t.id ?? j("table-action"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = typeof t.link == "string" ? t.link : "";
    const n = new B({ iconClass: "fa-solid fa-user" }), s = new B({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = t.icon instanceof B ? t.icon : new B(t.icon || n), this.sort = t.sort instanceof B ? t.sort : new B(t.sort || s), this.actions = t.actions ? t.actions instanceof V ? t.actions : new V(t.actions) : void 0;
  }
}
function yn({ tableAction: e, output: t }) {
  if (!e || !(e instanceof sn))
    throw new Error(
      "AlloyTableAction requires `tableAction` (TableActionObject instance)."
    );
  const n = R(e.id), s = T(
    () => tn(e.rows),
    [e.rows]
  ), [a, l] = A({ col: "", dir: "asc" });
  function c(i) {
    const u = a.col === i && a.dir === "asc" ? "desc" : "asc";
    l({ col: i, dir: u });
    const h = new F({
      id: n.current,
      type: "column",
      action: "Sort",
      error: !1,
      data: {
        name: i,
        dir: u
      }
    });
    t == null || t(h);
  }
  function o(i) {
    return (u, h) => {
      const f = nn(u), p = new F({
        id: n.current,
        type: "table",
        action: f,
        error: !1,
        data: i
      });
      t == null || t(p);
    };
  }
  const d = !!e.actions;
  return /* @__PURE__ */ v("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ r("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ v("tr", { children: [
      /* @__PURE__ */ r("th", { scope: "col", children: "Type" }),
      s.map((i) => {
        const u = a.col === i, h = u && a.dir === "desc";
        return /* @__PURE__ */ r("th", { scope: "col", children: /* @__PURE__ */ v(
          "span",
          {
            onClick: () => c(i),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              en(i),
              u && /* @__PURE__ */ r(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: h ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: h ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ r(D, { icon: e.sort })
                }
              )
            ]
          }
        ) }, `h-${i}`);
      }),
      d && /* @__PURE__ */ r("th", { scope: "col", className: "text-end", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ r("tbody", { children: e.rows.length > 0 ? e.rows.map((i, u) => {
      const h = (i == null ? void 0 : i.id) ?? u, f = e.actions;
      return /* @__PURE__ */ v("tr", { children: [
        /* @__PURE__ */ r("td", { children: /* @__PURE__ */ r(D, { icon: e.icon }) }),
        s.map((p) => {
          const m = e.link || "", N = m.endsWith("/") ? m.slice(0, -1) : m, y = N ? `${N}/${h}` : "";
          return /* @__PURE__ */ r("td", { children: N ? /* @__PURE__ */ r(
            $,
            {
              to: y,
              onClick: () => {
                const x = new F({
                  id: n.current,
                  type: "row",
                  action: "navigate",
                  error: !1,
                  data: {
                    to: y,
                    ...i
                  }
                });
                t == null || t(x);
              },
              className: "text-decoration-none",
              children: /* @__PURE__ */ r("span", { children: i == null ? void 0 : i[p] })
            }
          ) : /* @__PURE__ */ r("span", { children: i == null ? void 0 : i[p] }) }, `${h}-${p}`);
        }),
        d && /* @__PURE__ */ r("td", { className: "text-end", children: /* @__PURE__ */ r(
          re,
          {
            buttonBar: f,
            output: o(i)
          }
        ) })
      ] }, h);
    }) : /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r(
      "td",
      {
        colSpan: (
          // icon col + data cols (+ actions col if present)
          1 + s.length + (d ? 1 : 0)
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
    if (this.id = t.id ?? j("card"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "", t.header instanceof w)
      this.header = t.header;
    else if (t.header) {
      const s = new w(t.header);
      s.className = s.className || "card-header", this.header = s;
    } else
      this.header = void 0;
    if (t.body instanceof w)
      this.body = t.body;
    else {
      const s = new w(t.body);
      s.className = s.className || "card-body", this.body = s;
    }
    if (t.footer instanceof w)
      this.footer = t.footer;
    else if (t.footer) {
      const s = new w(t.footer);
      s.className = s.className || "card-footer", this.footer = s;
    } else
      this.footer = void 0;
    const n = Array.isArray(t.fields) ? t.fields : [];
    this.fields = n.map((s) => s instanceof w ? s : new w(s || {}));
  }
}
function vn({ card: e }) {
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
  ) : null, n = /* @__PURE__ */ v(
    "div",
    {
      id: e.body.id,
      className: e.body.className || "card-body",
      "aria-label": e.body.name,
      children: [
        e.body.name && /* @__PURE__ */ r("div", { className: "mb-2", children: e.body.name }),
        e.fields.map((c) => /* @__PURE__ */ r(
          "div",
          {
            id: c.id,
            className: c.className,
            "aria-label": c.name,
            children: c.name
          },
          c.id
        ))
      ]
    }
  ), s = e.link ? /* @__PURE__ */ r(
    $,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (l = e.body) == null ? void 0 : l.name,
      children: n
    }
  ) : n, a = e.footer ? /* @__PURE__ */ r(
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
    s,
    a
  ] });
}
class an extends We {
  constructor(t = {}) {
    if (super(t), !t.icon)
      throw new Error("CardIconObject requires `icon`.");
    this.icon = t.icon instanceof B ? t.icon : new B(t.icon), this.iconClass = t.iconClass ?? "col-4 d-flex align-items-start justify-content-center text-warning fs-2", this.textClass = t.textClass ?? "col-8";
  }
}
function Nn({ cardIcon: e }) {
  var l, c, o, d;
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
      children: /* @__PURE__ */ v("div", { className: "row m-0", children: [
        /* @__PURE__ */ r("div", { className: e.iconClass, children: /* @__PURE__ */ r(D, { icon: e.icon }) }),
        /* @__PURE__ */ v("div", { className: e.textClass, children: [
          (c = e.body) != null && c.name ? /* @__PURE__ */ r("div", { className: "mb-1 fw-semibold", children: e.body.name }) : null,
          e.fields.map(
            (i) => i != null && i.name ? /* @__PURE__ */ r(
              "div",
              {
                id: i.id,
                className: i.className,
                children: i.name
              },
              i.id
            ) : null
          )
        ] })
      ] })
    }
  ), s = e.link ? /* @__PURE__ */ r(
    $,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (o = e.body) == null ? void 0 : o.name,
      children: n
    }
  ) : n, a = (d = e.footer) != null && d.name ? /* @__PURE__ */ r(
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
        s,
        a
      ]
    }
  );
}
class Be {
  constructor(t = {}) {
    this.id = t.id ?? j("logo"), this.imageUrl = t.imageUrl ?? "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png", this.alt = t.alt ?? "Alloymobile", this.width = t.width ?? "72px", this.height = t.height ?? "auto";
  }
}
class ze {
  constructor(t = {}) {
    this.id = t.id ?? j("card"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "", this.header = t.header instanceof w ? t.header : new w(t.header || {}), this.body = t.body instanceof w ? t.body : new w(t.body || {}), this.footer = t.footer instanceof w ? t.footer : new w(t.footer || {});
    const n = Array.isArray(t.fields) ? t.fields : [];
    this.fields = n.map(
      (s) => s instanceof w ? s : new w(s || {})
    ), this.logo = t.logo instanceof Be ? t.logo : new Be(t.logo || {}), this.logoClass = t.logoClass ?? "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0", this.textClass = t.textClass ?? "col-8";
  }
}
function wn({ cardImage: e }) {
  var l, c, o, d;
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
          (c = e.body) != null && c.name ? /* @__PURE__ */ r("div", { className: "fw-semibold mb-1", children: e.body.name }) : null,
          e.fields.map(
            (i) => i != null && i.name ? /* @__PURE__ */ r(
              "div",
              {
                id: i.id,
                className: i.className || "",
                children: i.name
              },
              i.id ?? j("card-image-field")
            ) : null
          )
        ] }) })
      ] })
    }
  ), s = e.link ? /* @__PURE__ */ r(
    $,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (o = e.body) == null ? void 0 : o.name,
      children: n
    }
  ) : n, a = (d = e.footer) != null && d.name ? /* @__PURE__ */ r(
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
        s,
        a
      ]
    }
  );
}
class rn {
  constructor(t = {}) {
    this.id = t.id ?? j("card-action"), this.className = t.className ?? "card border m-2 shadow", this.link = t.link ?? "";
    const n = t.header ?? {};
    this.header = n instanceof w ? n : new w(n);
    const s = t.body ?? {};
    this.body = s instanceof w ? s : new w(s);
    const a = Array.isArray(t.fields) ? t.fields : [];
    this.fields = a.map(
      (o) => o instanceof w ? o : new w(o || {})
    );
    const l = t.footer ?? {};
    this.footer = l instanceof w ? l : new w(l), this.type = t.type ?? "AlloyButtonBar";
    const c = t.action;
    this.type === "AlloyLinkBar" ? this.action = c instanceof P ? c : c ? new P(c) : void 0 : this.action = c instanceof V ? c : c ? new V(c) : void 0;
  }
}
function gn({ cardAction: e, output: t }) {
  var d, i;
  if (!e || !(e instanceof rn))
    throw new Error(
      "AlloyCardAction requires `cardAction` (CardActionObject instance)."
    );
  function n(u) {
    if (typeof t != "function") return;
    const h = u && typeof u.toJSON == "function" ? u.toJSON() : u || {}, { error: f = !1, errorMessage: p = [] } = h, m = s(h), N = {};
    Array.isArray(e.fields) && e.fields.forEach((x) => {
      if (!x) return;
      const b = x.id, k = x.name;
      b && typeof k < "u" && (N[b] = k);
    });
    const y = new F({
      id: e.id,
      type: "card-action",
      action: m,
      error: !!f,
      errorMessage: p || [],
      data: N
    });
    t(y);
  }
  function s(u) {
    if (!u || typeof u != "object") return "";
    const h = (p) => {
      if (!p || typeof p != "object") return "";
      const m = typeof p.name == "string" ? p.name.trim() : "";
      if (m) return m;
      const N = typeof p.ariaLabel == "string" ? p.ariaLabel.trim() : "";
      if (N) return N;
      const y = typeof p.title == "string" ? p.title.trim() : "";
      if (y) return y;
      const x = typeof p.id == "string" ? p.id.trim() : "";
      return x || "";
    }, f = u.data && typeof u.data == "object" ? u.data : null;
    if (f) {
      if (f.action && typeof f.action == "object") {
        const m = h(f.action);
        if (m) return m;
      }
      if (f.button && typeof f.button == "object") {
        const m = h(f.button);
        if (m) return m;
      }
      if (f.link && typeof f.link == "object") {
        const m = h(f.link);
        if (m) return m;
      }
      const p = h(f);
      if (p) return p;
    }
    return h(u);
  }
  const a = (d = e.header) != null && d.name ? /* @__PURE__ */ r(
    "div",
    {
      id: e.header.id,
      className: e.header.className ?? "card-header py-2 fw-semibold",
      children: e.header.name
    }
  ) : null, l = /* @__PURE__ */ v(
    "div",
    {
      id: e.body.id,
      className: e.body.className ?? "card-body",
      children: [
        e.body.name ? /* @__PURE__ */ r("div", { className: "fw-semibold mb-1", children: e.body.name }) : null,
        e.fields.map(
          (u) => u != null && u.name ? /* @__PURE__ */ r(
            "div",
            {
              id: u.id,
              className: u.className ?? "",
              children: u.name
            },
            u.id ?? j("card-field")
          ) : null
        )
      ]
    }
  ), c = e.link ? /* @__PURE__ */ r(
    $,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (i = e.body) == null ? void 0 : i.name,
      children: l
    }
  ) : l, o = /* @__PURE__ */ v(
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
  return /* @__PURE__ */ v(
    "div",
    {
      id: e.id,
      className: e.className ?? "card border m-2 shadow",
      children: [
        a,
        c,
        o
      ]
    }
  );
}
class on {
  /**
   * @param {CardIconActionConfig} card
   */
  constructor(t = {}) {
    this.id = t.id ?? j("card-icon-action"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "";
    const n = t.header ?? {};
    this.header = n instanceof w ? n : new w(n);
    const s = t.body ?? {};
    this.body = s instanceof w ? s : new w(s);
    const a = Array.isArray(t.fields) ? t.fields : [];
    this.fields = a.map(
      (o) => o instanceof w ? o : new w(o || {})
    );
    const l = t.footer ?? {};
    this.footer = l instanceof w ? l : new w(l);
    const c = new B({ iconClass: "fa-solid fa-user fa-2xl" });
    this.icon = t.icon instanceof B ? t.icon : new B(t.icon || { iconClass: c.iconClass }), this.iconClass = t.iconClass ?? "col-3 d-flex align-items-center justify-content-center rounded-circle bg-warning text-white mb-0", this.textClass = t.textClass ?? "col-9", this.type = t.type ?? "AlloyButtonBar", this.type === "AlloyLinkBar" ? this.action = t.action instanceof P ? t.action : new P(t.action || {}) : this.action = t.action instanceof V ? t.action : new V(t.action || {});
  }
}
function bn({ cardIconAction: e, output: t }) {
  var i, u;
  if (!e || !(e instanceof on))
    throw new Error(
      "AlloyCardIconAction requires `cardIconAction` (CardIconActionObject instance)."
    );
  function n(h) {
    if (!h || typeof h != "object") return "";
    const f = typeof h.name == "string" ? h.name.trim() : "";
    if (f) return f;
    const p = typeof h.ariaLabel == "string" ? h.ariaLabel.trim() : "";
    if (p) return p;
    const m = typeof h.title == "string" ? h.title.trim() : "";
    if (m) return m;
    const N = typeof h.id == "string" ? h.id.trim() : "";
    return N || "";
  }
  function s() {
    return (h, f) => {
      if (typeof t != "function") return;
      const p = n(h), m = {};
      Array.isArray(e.fields) && e.fields.forEach((y) => {
        if (!y) return;
        const x = y.id, b = y.name;
        x && typeof b < "u" && (m[x] = b);
      });
      const N = new F({
        id: e.id,
        // align with AlloyCardAction
        type: "card-action",
        action: p,
        error: !1,
        errorMessage: [],
        data: m
      });
      t(N);
    };
  }
  const a = (i = e.header) != null && i.name ? /* @__PURE__ */ r(
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
      className: e.body.className || "card-body",
      "aria-label": e.body.name,
      children: /* @__PURE__ */ v("div", { className: "row m-0", children: [
        /* @__PURE__ */ r("div", { className: e.iconClass, children: /* @__PURE__ */ r(D, { icon: e.icon }) }),
        /* @__PURE__ */ r("div", { className: e.textClass, children: /* @__PURE__ */ r("div", { className: "row p-1", children: e.fields.map(
          (h) => h != null && h.name ? /* @__PURE__ */ r(
            "div",
            {
              id: h.id,
              className: h.className,
              children: h.name
            },
            h.id ?? j("card-icon-action-field")
          ) : null
        ) }) })
      ] })
    }
  ), c = e.link ? /* @__PURE__ */ r(
    $,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (u = e.body) == null ? void 0 : u.name,
      children: l
    }
  ) : l, o = e.type === "AlloyLinkBar" ? /* @__PURE__ */ r(
    ie,
    {
      linkBar: e.action,
      output: s()
    }
  ) : /* @__PURE__ */ r(
    re,
    {
      buttonBar: e.action,
      output: s()
    }
  ), d = /* @__PURE__ */ v(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      "aria-label": e.footer.name,
      children: [
        /* @__PURE__ */ r("div", { className: "me-auto", children: e.footer.name ? e.footer.name : null }),
        /* @__PURE__ */ r("div", { role: "group", children: o })
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
        c,
        d
      ]
    }
  );
}
class ln extends ze {
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
    super(t), this.header = t.header instanceof w ? t.header : new w(
      t.header || {
        className: "card-header py-2 fw-semibold",
        name: ""
      }
    ), this.body = t.body instanceof w ? t.body : new w(
      t.body || {
        className: "card-body d-flex align-items-center",
        name: "Card Body"
      }
    );
    const n = Array.isArray(t.fields) ? t.fields : [];
    switch (this.fields = n.map(
      (s, a) => s instanceof w ? s : new w({
        id: (s == null ? void 0 : s.id) || `field_${a + 1}`,
        className: (s == null ? void 0 : s.className) ?? "",
        name: (s == null ? void 0 : s.name) ?? ""
      })
    ), this.footer = t.footer instanceof w ? t.footer : new w(
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
function xn({ cardImageAction: e, output: t }) {
  var d, i, u, h, f, p;
  if (!e || !(e instanceof ln))
    throw new Error(
      "AlloyCardImageAction requires `cardImageAction` (CardImageActionObject instance)."
    );
  function n() {
    return (m, N) => {
      if (typeof t != "function") return;
      const y = cn(m), x = {};
      Array.isArray(e.fields) && e.fields.forEach((k) => {
        if (!k) return;
        const O = k.id, C = k.name;
        O && typeof C < "u" && (x[O] = C);
      });
      const b = new F({
        id: e.id,
        type: "card-action",
        action: y,
        error: !1,
        errorMessage: [],
        data: x
      });
      t(b);
    };
  }
  const a = e.header && ((d = e.header.name) == null ? void 0 : d.trim()) ? /* @__PURE__ */ r(
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
      children: /* @__PURE__ */ v("div", { className: "row m-0", children: [
        /* @__PURE__ */ r("div", { className: e.logoClass, children: /* @__PURE__ */ r(
          "img",
          {
            src: (i = e.logo) == null ? void 0 : i.imageUrl,
            alt: (u = e.logo) == null ? void 0 : u.alt,
            style: {
              width: (h = e.logo) == null ? void 0 : h.width,
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
  ), c = e.link ? /* @__PURE__ */ r(
    $,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (p = e.body) == null ? void 0 : p.name,
      children: l
    }
  ) : l, o = /* @__PURE__ */ v(
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
  return /* @__PURE__ */ v(
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
function cn(e) {
  if (!e || typeof e != "object") return "";
  const t = typeof e.name == "string" ? e.name.trim() : "";
  if (t) return t;
  const n = typeof e.ariaLabel == "string" ? e.ariaLabel.trim() : "";
  if (n) return n;
  const s = typeof e.title == "string" ? e.title.trim() : "";
  if (s) return s;
  const a = typeof e.id == "string" ? e.id.trim() : "";
  return a || "";
}
class Ae {
  constructor(t = {}) {
    const {
      id: n,
      title: s = "AlloyMobile",
      className: a = "col m-2",
      message: l = "",
      action: c = "",
      type: o = "AlloyInputTextIcon",
      submit: d,
      fields: i,
      data: u
    } = t;
    this.id = n ?? j("form"), this.title = s, this.className = a, this.message = l, this.action = c, this.type = o, this.submit = d instanceof ne ? d : new ne(
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
    const h = Array.isArray(i) ? i : [];
    this.fields = h.map(
      (f) => f instanceof xe ? f : new xe(f)
    ), this.data = u ?? {};
  }
}
function je(e, t, n) {
  let s = !0;
  const a = [];
  if (e.required && (e.type === "checkbox" ? (Array.isArray(t) ? t : []).length === 0 && (s = !1, a.push("This field is required.")) : (t === "" || t === !1 || t === void 0 || t === null) && (s = !1, a.push("This field is required."))), s && typeof e.minLength == "number" && typeof t == "string" && t.length < e.minLength && (s = !1, a.push(`Minimum length is ${e.minLength}`)), s && typeof e.maxLength == "number" && typeof t == "string" && t.length > e.maxLength && (s = !1, a.push(`Maximum length is ${e.maxLength}`)), s && e.pattern && typeof t == "string" && !new RegExp(e.pattern).test(t) && (s = !1, a.push("Invalid format.")), s && e.passwordStrength && typeof t == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(t) || (s = !1, a.push("Password is too weak."))), s && e.matchWith) {
    const l = e.matchWith;
    n[l] !== t && (s = !1, a.push("Values do not match."));
  }
  return {
    valid: s,
    error: !s,
    errors: a
  };
}
function Cn({ form: e, output: t }) {
  const n = e instanceof Ae ? e : new Ae(e || {});
  if (!n || !Array.isArray(n.fields) || !(n.submit instanceof ne))
    throw new Error(
      "AlloyForm could not hydrate a valid FormObject (missing fields[] or submit)."
    );
  const [s, a] = A(() => {
    const h = {}, f = {};
    return n.fields.forEach((p) => {
      f[p.name] = p.value;
    }), n.fields.forEach((p) => {
      const m = p.value, { valid: N, error: y, errors: x } = je(
        p,
        m,
        f
      );
      h[p.name] = {
        value: m,
        valid: N,
        error: y,
        errors: x
      };
    }), h;
  }), l = R(null), c = Je(
    (h) => {
      const f = {};
      Object.keys(h).forEach((m) => {
        f[m] = h[m].value;
      });
      const p = {};
      return n.fields.forEach((m) => {
        const N = f[m.name], { valid: y, error: x, errors: b } = je(
          m,
          N,
          f
        );
        p[m.name] = {
          value: N,
          valid: y,
          error: x,
          errors: b
        };
      }), p;
    },
    [n.fields]
  );
  function o(h) {
    const f = h instanceof F ? h.data || {} : h || {}, { name: p, value: m } = f;
    p && a((N) => {
      const y = { ...N };
      return y[p] = {
        ...N[p] || {
          value: void 0,
          valid: !0,
          error: !1,
          errors: []
        },
        value: m
      }, c(y);
    });
  }
  const d = T(() => {
    const h = {};
    return Object.keys(s).forEach((f) => {
      h[f] = s[f].value;
    }), h;
  }, [s]), i = T(() => Object.values(s).some(
    (h) => h.error || !h.valid
  ), [s]);
  function u(h) {
    let f = !1;
    Object.values(s).forEach((y) => {
      (y.error || !y.valid) && (f = !0);
    });
    const p = { ...d };
    n.data = p, n.message = "";
    const m = f ? { ...s } : p, N = new F({
      id: n.id,
      // top-level id, as you requested
      type: "form",
      action: "submit",
      data: m,
      error: f
      // no errorMessage; all useful info is inside data for error=true
    });
    t == null || t(N);
  }
  return n.submit.disabled = i || !!n.submit.loading, /* @__PURE__ */ r("div", { className: "row", children: /* @__PURE__ */ r("div", { className: n.className, children: /* @__PURE__ */ v("div", { className: "text-center", children: [
    /* @__PURE__ */ r("h3", { children: n.title }),
    n.message !== "" && /* @__PURE__ */ r("div", { className: "alert alert-text-danger m-0 p-0", children: n.message }),
    n.fields.map((h) => /* @__PURE__ */ r(
      at,
      {
        input: h,
        output: o
      },
      h.id
    )),
    /* @__PURE__ */ r(
      st,
      {
        ref: l,
        buttonSubmit: n.submit,
        output: u
      }
    )
  ] }) }) });
}
export {
  et as AlloyButton,
  re as AlloyButtonBar,
  nt as AlloyButtonIcon,
  st as AlloyButtonSubmit,
  vn as AlloyCard,
  gn as AlloyCardAction,
  Nn as AlloyCardIcon,
  bn as AlloyCardIconAction,
  wn as AlloyCardImage,
  xn as AlloyCardImageAction,
  Cn as AlloyForm,
  D as AlloyIcon,
  at as AlloyInput,
  Ye as AlloyLink,
  ie as AlloyLinkBar,
  Xe as AlloyLinkIcon,
  Se as AlloyLinkLogo,
  fn as AlloyNavBar,
  mn as AlloyTable,
  yn as AlloyTableAction,
  pn as AlloyTableLink,
  V as ButtonBarObject,
  z as ButtonIconObject,
  W as ButtonObject,
  ne as ButtonSubmitObject,
  rn as CardActionObject,
  on as CardIconActionObject,
  an as CardIconObject,
  ln as CardImageActionObject,
  ze as CardImageObject,
  We as CardObject,
  Ae as FormObject,
  B as IconObject,
  xe as InputObject,
  P as LinkBarObject,
  M as LinkIconObject,
  q as LinkLogoObject,
  K as LinkObject,
  rt as NavBarObject,
  sn as TableActionObject,
  Qt as TableLinkObject,
  lt as TableObject
};
//# sourceMappingURL=alloy-react.es.js.map
