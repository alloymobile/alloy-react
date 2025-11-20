import { jsx as i, jsxs as N } from "react/jsx-runtime";
import * as g from "react";
import { useRef as $, useState as j, useMemo as M, forwardRef as Le, useImperativeHandle as Be, useEffect as pe, useCallback as it } from "react";
import "react-dom";
function S(e = "id") {
  const t = Date.now(), n = Math.random().toString(36).slice(2, 7);
  return `${e}-${t}-${n}`;
}
class w {
  constructor(t = {}) {
    const { id: n, name: s, className: a } = t;
    this.id = n ?? S("tag"), this.name = s ?? "", this.className = a ?? "";
  }
}
class P {
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
      data: r = {},
      error: c = !1
    } = t || {}, l = typeof n < "u" ? n : r && typeof r.id < "u" ? r.id : "";
    this.id = l, this.type = s, this.action = a, this.error = !!c, this.data = { ...r };
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
    return new P({
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
    data: r = {}
  } = {}) {
    const c = { ...r };
    return a && c.message == null && (c.message = String(a)), new P({
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
class A {
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
    this.id = t.id ?? S("icon"), this.iconClass = t.iconClass;
  }
}
function q({ icon: e }) {
  if (!e) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ i("i", { id: e.id, className: e.iconClass, "aria-hidden": "true" });
}
function rt(e = "", t = "") {
  const [n, s] = j(!1), [a, r] = j(!1), [c, l] = j(!1);
  return {
    className: M(() => [e, (n || a || c) && t].filter(Boolean).join(" "), [e, t, n, a, c]),
    events: {
      onMouseEnter: () => s(!0),
      onMouseLeave: () => {
        s(!1), r(!1);
      },
      onMouseDown: () => r(!0),
      onMouseUp: () => r(!1),
      onFocus: () => l(!0),
      onBlur: () => l(!1)
    }
  };
}
class I {
  /**
   * @param {LinkConfig} link
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkObject requires `href`.");
    if (!t.name)
      throw new Error("LinkObject requires `name`.");
    this.id = t.id ?? S("link"), this.name = t.name, this.href = t.href, this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function ot({ link: e }) {
  if (!e || !(e instanceof I))
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  const t = $(e.id), { className: n, events: s } = rt(e.className, e.active), a = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel;
  return /* @__PURE__ */ i(
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
      children: /* @__PURE__ */ i("span", { children: e.name })
    }
  );
}
function lt(e = "", t = "") {
  const [n, s] = j(!1), [a, r] = j(!1), [c, l] = j(!1);
  return {
    className: M(() => [e, (n || a || c) && t].filter(Boolean).join(" "), [e, t, n, a, c]),
    events: {
      onMouseEnter: () => s(!0),
      onMouseLeave: () => {
        s(!1), r(!1);
      },
      onMouseDown: () => r(!0),
      onMouseUp: () => r(!1),
      onFocus: () => l(!0),
      onBlur: () => l(!1)
    }
  };
}
class ee {
  /**
   * @param {LinkIconConfig} linkIcon
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkIconObject requires `href`.");
    if (!t.icon)
      throw new Error("LinkIconObject requires `icon`.");
    const n = t.icon instanceof A ? t.icon : new A(t.icon);
    this.id = t.id ?? S("link-icon"), this.href = t.href, this.icon = n, this.name = t.name, this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function ct({ linkIcon: e }) {
  if (!e || !(e instanceof ee))
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  const t = $(e.id), { className: n, events: s } = lt(
    e.className,
    e.active
  ), a = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, r = !!e.name;
  return /* @__PURE__ */ i(
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
      children: /* @__PURE__ */ N("span", { className: "d-inline-flex align-items-center", children: [
        /* @__PURE__ */ i(q, { icon: e.icon }),
        r && /* @__PURE__ */ i("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
function dt(e = "", t = "") {
  const [n, s] = j(!1), [a, r] = j(!1), [c, l] = j(!1);
  return {
    className: M(() => [e, (n || a || c) && t].filter(Boolean).join(" "), [e, t, n, a, c]),
    events: {
      onMouseEnter: () => s(!0),
      onMouseLeave: () => {
        s(!1), r(!1);
      },
      onMouseDown: () => r(!0),
      onMouseUp: () => r(!1),
      onFocus: () => l(!0),
      onBlur: () => l(!1)
    }
  };
}
class Y {
  /**
   * @param {LinkLogoConfig} linkLogo
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkLogoObject requires `href`.");
    if (!t.logo)
      throw new Error("LinkLogoObject requires `logo`.");
    this.id = t.id ?? S("link-logo"), this.name = t.name, this.href = t.href, this.logo = t.logo, this.width = t.width, this.height = t.height, this.logoAlt = t.logoAlt ?? t.name ?? "", this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function Me({ linkLogo: e }) {
  if (!e || !(e instanceof Y))
    throw new Error(
      "AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance)."
    );
  const t = $(e.id), { className: n, events: s } = dt(
    e.className,
    e.active
  ), a = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, r = !!e.name;
  return /* @__PURE__ */ i(
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
      children: /* @__PURE__ */ N("span", { className: "d-inline-flex align-items-center", children: [
        /* @__PURE__ */ i(
          "img",
          {
            src: e.logo,
            alt: e.logoAlt || e.name || "",
            width: e.width,
            height: e.height,
            style: { display: "inline-block" }
          }
        ),
        r && /* @__PURE__ */ i("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
function ht(e = "", t = "") {
  const [n, s] = j(!1), [a, r] = j(!1), [c, l] = j(!1);
  return {
    className: M(() => [e, (n || a || c) && t].filter(Boolean).join(" "), [e, t, n, a, c]),
    events: {
      onMouseEnter: () => s(!0),
      onMouseLeave: () => {
        s(!1), r(!1);
      },
      onMouseDown: () => r(!0),
      onMouseUp: () => r(!1),
      onFocus: () => l(!0),
      onBlur: () => l(!1)
    }
  };
}
class te {
  /**
   * @param {ButtonConfig} button
   */
  constructor(t = {}) {
    if (!t.name)
      throw new Error("ButtonObject requires `name`.");
    this.id = t.id ?? S("btn"), this.name = t.name, this.className = t.className ?? "btn btn-primary", this.active = t.active ?? "", this.disabled = !!t.disabled, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const ut = Le(function({ button: t, output: n }, s) {
  if (!t || !(t instanceof te))
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  const a = $(null), r = $(t.id), c = t.disabled, { className: l, events: d } = ht(
    t.className,
    t.active
  );
  Be(
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
  const o = (h, f, p) => (m) => {
    if (f == null || f(m), typeof n == "function") {
      const v = P.ok({
        id: t.id,
        type: "button",
        action: p,
        data: {
          // keep payload minimal; we don't duplicate id here
          name: t.name
        }
      });
      n(v);
    }
    h == null || h(m, t);
  }, u = {
    onClick: o(t.onClick, void 0, "click"),
    onKeyDown: o(t.onKeyDown, d.onFocus, "keydown"),
    onKeyUp: o(t.onKeyUp, void 0, "keyup"),
    onFocus: o(t.onFocus, d.onFocus, "focus"),
    onBlur: o(t.onBlur, d.onBlur, "blur"),
    onMouseEnter: o(
      t.onMouseEnter,
      d.onMouseEnter,
      "mouseenter"
    ),
    onMouseLeave: o(
      t.onMouseLeave,
      d.onMouseLeave,
      "mouseleave"
    ),
    onMouseDown: o(void 0, d.onMouseDown, "mousedown"),
    onMouseUp: o(void 0, d.onMouseUp, "mouseup")
  };
  return /* @__PURE__ */ i(
    "button",
    {
      id: r.current,
      ref: a,
      type: "button",
      className: l,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-disabled": c || void 0,
      disabled: c,
      tabIndex: t.tabIndex,
      ...u,
      children: /* @__PURE__ */ i("span", { className: "px-2 align-middle", children: t.name })
    }
  );
});
function ft(e = "", t = "") {
  const [n, s] = j(!1), [a, r] = j(!1), [c, l] = j(!1);
  return {
    className: M(() => [e, (n || a || c) && t].filter(Boolean).join(" "), [e, t, n, a, c]),
    events: {
      onMouseEnter: () => s(!0),
      onMouseLeave: () => {
        s(!1), r(!1);
      },
      onMouseDown: () => r(!0),
      onMouseUp: () => r(!1),
      onFocus: () => l(!0),
      onBlur: () => l(!1)
    }
  };
}
class _ {
  /**
   * @param {ButtonIconConfig} btn
   */
  constructor(t = {}) {
    if (!t.icon)
      throw new Error("ButtonIconObject requires `icon`.");
    this.id = t.id ?? S("btn-icon"), this.name = t.name, this.className = t.className ?? "btn btn-primary", this.active = t.active ?? "", this.disabled = !!t.disabled;
    const n = this.name || "icon button";
    this.title = t.title ?? n, this.ariaLabel = t.ariaLabel ?? n, this.tabIndex = t.tabIndex, this.icon = t.icon instanceof A ? t.icon : new A(t.icon), this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const de = Le(function({ buttonIcon: t, output: n }, s) {
  if (!t || !(t instanceof _))
    throw new Error(
      "AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance)."
    );
  const a = $(null), r = $(t.id), c = t.disabled, { className: l, events: d } = ft(
    t.className,
    t.active
  );
  Be(
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
  const o = (h, f, p, m) => (v) => {
    if (f == null || f(v), m && typeof n == "function") {
      const y = P.ok({
        id: t.id,
        type: "button-icon",
        action: p,
        data: {
          name: t.name
        }
      });
      n(y);
    }
    h == null || h(v, t);
  }, u = {
    // EMIT
    onClick: o(t.onClick, void 0, "click", !0),
    onKeyDown: o(
      t.onKeyDown,
      d.onFocus,
      "keydown",
      !0
    ),
    // NO EMIT – just state + model handler
    onKeyUp: o(t.onKeyUp, void 0, "keyup", !1),
    onFocus: o(t.onFocus, d.onFocus, "focus", !1),
    onBlur: o(t.onBlur, d.onBlur, "blur", !1),
    onMouseEnter: o(
      t.onMouseEnter,
      d.onMouseEnter,
      "mouseenter",
      !1
    ),
    onMouseLeave: o(
      t.onMouseLeave,
      d.onMouseLeave,
      "mouseleave",
      !1
    ),
    onMouseDown: o(void 0, d.onMouseDown, "mousedown", !1),
    onMouseUp: o(void 0, d.onMouseUp, "mouseup", !1)
  };
  return /* @__PURE__ */ N(
    "button",
    {
      id: r.current,
      ref: a,
      type: "button",
      className: l,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-disabled": c || void 0,
      disabled: c,
      tabIndex: t.tabIndex,
      ...u,
      children: [
        /* @__PURE__ */ i("span", { className: "align-middle", children: /* @__PURE__ */ i(q, { icon: t.icon }) }),
        t.name && /* @__PURE__ */ i("span", { className: "px-2 align-middle", children: t.name })
      ]
    }
  );
});
class fe {
  /**
   * @param {ButtonSubmitConfig} buttonSubmit
   */
  constructor(t = {}) {
    if (!t.name)
      throw new Error("ButtonSubmitObject requires `name`.");
    if (!t.icon)
      throw new Error("ButtonSubmitObject requires `icon`.");
    const n = t.icon instanceof A ? t.icon : new A(t.icon);
    this.id = t.id ?? S("btn-submit"), this.name = t.name, this.icon = n, this.className = t.className ?? "", this.disabled = !!t.disabled, this.loading = !!t.loading, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onMouseDown = t.onMouseDown, this.onKeyDown = t.onKeyDown;
  }
}
const mt = Le(function({ buttonSubmit: t, output: n }, s) {
  if (!t || !(t instanceof fe))
    throw new Error(
      "AlloyButtonSubmit requires `buttonSubmit` (ButtonSubmitObject instance)."
    );
  const a = $(null), r = $(t.id), [c, l] = j(!!t.loading), d = $(!1);
  pe(() => {
    const y = !!t.loading;
    l(y), y || (d.current = !1);
  }, [t.loading]);
  const o = t.disabled || c;
  Be(
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
  const u = () => d.current || o ? !1 : (d.current = !0, t.loading = !0, t.disabled = !0, l(!0), !0), h = (y, C, b) => {
    if (typeof n == "function") {
      const O = new P({
        id: t.id,
        type: "button-submit",
        action: b,
        error: !1,
        data: {
          name: t.name
        }
      });
      n(O);
    }
    C == null || C(y, t);
  }, f = (y) => {
    u() && h(y, t.onClick, "click");
  }, p = (y) => {
    u() && h(y, t.onMouseDown, "mousedown");
  }, m = (y) => {
    const C = y.key;
    (C === "Enter" || C === " ") && u() && h(y, t.onKeyDown, "keydown");
  }, v = c;
  return /* @__PURE__ */ N(
    "button",
    {
      id: r.current,
      ref: a,
      type: "submit",
      className: t.className,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-busy": c || void 0,
      "aria-disabled": o || void 0,
      disabled: o,
      tabIndex: t.tabIndex,
      onClick: f,
      onMouseDown: p,
      onKeyDown: m,
      children: [
        v && /* @__PURE__ */ i("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ i(q, { icon: t.icon }) }),
        /* @__PURE__ */ i("span", { className: v ? "px-2 align-middle" : "align-middle", children: t.name }),
        c ? /* @__PURE__ */ i("span", { className: "ms-2 visually-hidden", "aria-live": "polite", children: "Loading…" }) : null
      ]
    }
  );
});
class Ce {
  /**
   * @param {InputConfig} config
   */
  constructor(t = {}) {
    const {
      id: n,
      name: s,
      type: a = "text",
      label: r = "",
      value: c,
      layout: l = "text",
      icon: d,
      placeholder: o = "",
      required: u = !1,
      minLength: h,
      maxLength: f,
      min: p,
      max: m,
      pattern: v,
      matchWith: y,
      passwordStrength: C,
      className: b,
      options: O = [],
      validators: L = [],
      ...E
    } = t;
    if (!s)
      throw new Error("InputObject requires `name`.");
    if ((l === "icon" || l === "floating") && !d)
      throw new Error(
        "InputObject with layout='icon' or 'floating' requires `icon`."
      );
    let k;
    typeof c < "u" ? k = c : a === "checkbox" ? k = [] : k = "";
    const B = d instanceof A ? d : d ? new A(d) : void 0;
    this.id = n ?? S("input"), this.name = s, this.type = a, this.label = r, this.value = k, this.layout = l, this.icon = B, this.placeholder = o, this.required = !!u, this.minLength = h, this.maxLength = f, this.min = p, this.max = m, this.pattern = v, this.matchWith = y, this.passwordStrength = C, typeof b == "string" && b.trim() !== "" ? this.className = b.trim() : a === "select" ? this.className = "form-select" : a === "radio" || a === "checkbox" ? this.className = "form-check-input" : this.className = "form-control", this.options = O, this.validators = L, Object.assign(this, E);
  }
}
function We({ input: e, output: t }) {
  const [n, s] = j(e.value), [a, r] = j(!1);
  pe(() => {
    s(e.value), r(!1);
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
  const c = (E) => {
    const k = [], B = typeof E == "string" ? E.trim() : E;
    if (e.required) {
      const V = Array.isArray(B) && B.length === 0, x = !Array.isArray(B) && (B === "" || B === !1 || B == null);
      (V || x) && k.push("This field is required.");
    }
    return typeof B == "string" && e.minLength != null && B.length < e.minLength && k.push(`Minimum length is ${e.minLength}`), typeof B == "string" && e.maxLength != null && B.length > e.maxLength && k.push(`Maximum length is ${e.maxLength}`), typeof B == "string" && e.pattern && e.pattern !== "" && (new RegExp(e.pattern).test(B) || k.push("Invalid format.")), e.passwordStrength && typeof B == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(
      B
    ) || k.push("Password is too weak.")), k;
  }, l = c(n), d = a && l.length > 0, o = d && l.length > 0 && /* @__PURE__ */ i("div", { className: "mt-2", "aria-live": "polite", children: l.map((E, k) => /* @__PURE__ */ i(
    "div",
    {
      className: "alert alert-danger py-2 mb-2",
      role: "alert",
      children: E
    },
    k
  )) }), u = (E, k = "change") => {
    const B = c(E), V = B.length > 0;
    if (typeof t == "function") {
      const x = new P({
        id: e.id,
        type: "input",
        action: k,
        error: V,
        data: {
          name: e.name,
          value: E,
          errors: B
        }
      });
      t(x);
    }
  }, h = (E) => {
    const k = E.target.value;
    if (e.type === "checkbox") {
      const B = Array.isArray(n) ? [...n] : [], V = B.indexOf(k);
      V > -1 ? B.splice(V, 1) : B.push(k), s(B), u(B, "change");
    } else e.type, s(k), u(k, "change");
  }, f = () => {
    r(!0), u(n, "blur");
  }, p = {
    id: e.id,
    name: e.name,
    placeholder: e.placeholder,
    onBlur: f,
    "aria-invalid": d || void 0
  }, m = (E) => E + (d ? " is-invalid" : ""), v = () => /* @__PURE__ */ i(
    "textarea",
    {
      ...p,
      value: n,
      onChange: h,
      className: m(e.className)
    }
  ), y = () => /* @__PURE__ */ i(
    "select",
    {
      ...p,
      value: n,
      onChange: h,
      className: m(e.className),
      children: e.options.map((E) => /* @__PURE__ */ i("option", { value: E.value, children: E.label }, E.value))
    }
  ), C = () => /* @__PURE__ */ N("div", { children: [
    e.label && /* @__PURE__ */ i("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((E, k) => /* @__PURE__ */ N("div", { className: "form-check", children: [
      /* @__PURE__ */ i(
        "input",
        {
          type: "radio",
          id: `${e.id}_${k}`,
          className: m(e.className),
          name: e.name,
          value: E.value,
          checked: n === E.value,
          onChange: h,
          onBlur: f,
          "aria-invalid": d || void 0
        }
      ),
      /* @__PURE__ */ i(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${k}`,
          children: E.label
        }
      )
    ] }, k)),
    o
  ] }), b = () => /* @__PURE__ */ N("div", { children: [
    e.label && /* @__PURE__ */ i("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((E, k) => /* @__PURE__ */ N("div", { className: "form-check", children: [
      /* @__PURE__ */ i(
        "input",
        {
          type: "checkbox",
          id: `${e.id}_${k}`,
          className: m(e.className),
          name: e.name,
          value: E.value,
          checked: Array.isArray(n) && n.includes(E.value),
          onChange: h,
          onBlur: f,
          "aria-invalid": d || void 0
        }
      ),
      /* @__PURE__ */ i(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${k}`,
          children: E.label
        }
      )
    ] }, k)),
    o
  ] }), O = () => /* @__PURE__ */ i(
    "input",
    {
      ...p,
      type: e.type,
      value: n,
      onChange: h,
      className: m(e.className)
    }
  ), L = () => {
    switch (e.type) {
      case "textarea":
        return v();
      case "select":
        return y();
      case "radio":
        return C();
      case "checkbox":
        return b();
      default:
        return O();
    }
  };
  return e.layout === "floating" ? /* @__PURE__ */ N("div", { className: "mb-3", children: [
    /* @__PURE__ */ N("div", { className: "form-floating", children: [
      L(),
      /* @__PURE__ */ N("label", { htmlFor: e.id, children: [
        e.icon && /* @__PURE__ */ i(q, { icon: e.icon }),
        e.icon && " ",
        e.label
      ] })
    ] }),
    !(e.type === "radio" || e.type === "checkbox") && o
  ] }) : e.layout === "icon" ? /* @__PURE__ */ N("div", { className: "mb-3", children: [
    e.label && /* @__PURE__ */ i("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    /* @__PURE__ */ N("div", { className: "input-group", children: [
      /* @__PURE__ */ i("span", { className: "input-group-text", children: /* @__PURE__ */ i(q, { icon: e.icon }) }),
      ["radio", "checkbox"].includes(e.type) ? L() : /* @__PURE__ */ i(
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
    !(e.type === "radio" || e.type === "checkbox") && o
  ] }) : /* @__PURE__ */ N("div", { className: "mb-3", children: [
    ["text", "textarea", "number", "email", "password", "date"].includes(
      e.type
    ) && e.label && /* @__PURE__ */ i("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    L(),
    !(e.type === "radio" || e.type === "checkbox") && o
  ] });
}
class J {
  /**
   * @param {LinkBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? S("linkBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyLink", this.linkClass = t.linkClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof w ? this.title = t.title : t.title ? this.title = new w(t.title) : this.title = new w({});
    const n = Array.isArray(t.links) ? t.links : [];
    this.type === "AlloyLinkIcon" ? this.links = n.map(
      (s) => s instanceof ee ? s : new ee(s)
    ) : this.type === "AlloyLinkLogo" ? this.links = n.map(
      (s) => s instanceof Y ? s : new Y(s)
    ) : this.links = n.map(
      (s) => s instanceof I ? s : new I(s)
    );
  }
}
function pt(e, t, n, s) {
  const a = n ? t : "";
  return e instanceof I ? new I({
    id: e.id,
    name: e.name,
    href: e.href,
    className: e.className,
    active: a,
    target: e.target,
    rel: e.rel,
    onClick: s,
    title: e.title
  }) : e instanceof ee ? new ee({
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
  }) : e instanceof Y ? new Y({
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
function ye({ linkBar: e }) {
  if (!e || !(e instanceof J))
    throw new Error("AlloyLinkBar requires `linkBar` (LinkBarObject instance).");
  const t = $(e.id), [n, s] = j("");
  pe(() => {
    s("");
  }, [e]);
  const a = () => e.title && e.title.name ? /* @__PURE__ */ i(
    "div",
    {
      id: e.title.id,
      className: e.title.className,
      children: e.title.name
    }
  ) : null;
  function r(l) {
    const d = l.onClick;
    return (o) => {
      const u = l.id || `${l.href || ""}-${l.name || ""}`;
      s(u), d == null || d(o);
    };
  }
  function c() {
    return /* @__PURE__ */ i("ul", { id: t.current, className: e.className, children: e.links.map((l, d) => {
      const o = ((l == null ? void 0 : l.id) ?? "") === n, u = pt(
        l,
        e.selected,
        o,
        r(l)
      );
      switch (e.type) {
        case "AlloyLink":
          if (!(u instanceof I))
            throw new Error(
              "AlloyLinkBar (type='AlloyLink') expects each link to be a LinkObject instance."
            );
          return /* @__PURE__ */ i(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ i(ot, { link: u })
            },
            ((l == null ? void 0 : l.id) ?? d) + "-li"
          );
        case "AlloyLinkIcon":
          if (!(u instanceof ee))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkIcon') expects each link to be a LinkIconObject instance."
            );
          return /* @__PURE__ */ i(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ i(ct, { linkIcon: u })
            },
            ((l == null ? void 0 : l.id) ?? d) + "-li"
          );
        case "AlloyLinkLogo":
          if (!(u instanceof Y))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkLogo') expects each link to be a LinkLogoObject instance."
            );
          return /* @__PURE__ */ i(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ i(Me, { linkLogo: u })
            },
            ((l == null ? void 0 : l.id) ?? d) + "-li"
          );
        default:
          throw new Error(
            `Unsupported linkBar.type "${e.type}".`
          );
      }
    }) });
  }
  return /* @__PURE__ */ N("nav", { "data-type": e.type, children: [
    /* @__PURE__ */ i(a, {}),
    c()
  ] });
}
class H {
  /**
   * @param {ButtonBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? S("buttonBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyButton", this.buttonClass = t.buttonClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof w ? this.title = t.title : t.title ? this.title = new w(t.title) : this.title = new w({});
    const n = Array.isArray(t.buttons) ? t.buttons : [];
    this.type === "AlloyButtonIcon" ? this.buttons = n.map(
      (s) => s instanceof _ ? s : new _(s)
    ) : this.buttons = n.map(
      (s) => s instanceof te ? s : new te(s)
    );
  }
}
function Fe(e, t, n, s, a) {
  const r = n ? t : "";
  function c(l) {
    var u, h;
    if (!l)
      return;
    if ((l.action || ((u = l == null ? void 0 : l.data) == null ? void 0 : u.event) || "") === "click") {
      const f = ((h = l == null ? void 0 : l.data) == null ? void 0 : h.id) ?? "";
      f && s(f);
    }
    a == null || a(l);
  }
  return e instanceof te ? { model: new te({
    id: e.id,
    name: e.name,
    className: e.className,
    active: r,
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
  }), onAnyEvent: c } : e instanceof _ ? { model: new _({
    id: e.id,
    name: e.name,
    icon: e.icon,
    // already an IconObject (normalized in ButtonIconObject)
    className: e.className,
    active: r,
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
function ve({ buttonBar: e, output: t }) {
  if (!e || !(e instanceof H))
    throw new Error(
      "AlloyButtonBar requires `buttonBar` (ButtonBarObject instance)."
    );
  const n = $(e.id), [s, a] = j("");
  pe(() => {
    a("");
  }, [e]);
  const r = () => e.title && e.title.name ? /* @__PURE__ */ i("div", { id: e.title.id, className: e.title.className, children: e.title.name }) : null;
  function c() {
    return /* @__PURE__ */ i("ul", { id: n.current, className: e.className, children: e.buttons.map((o, u) => {
      if (!(o instanceof te))
        throw new Error(
          "AlloyButtonBar (type='AlloyButton') expects ButtonObject items."
        );
      const h = ((o == null ? void 0 : o.id) ?? "") === s, { model: f, onAnyEvent: p } = Fe(
        o,
        e.selected,
        h,
        a,
        t
      );
      return /* @__PURE__ */ i(
        "li",
        {
          className: e.buttonClass,
          children: /* @__PURE__ */ i(ut, { button: f, output: p })
        },
        ((o == null ? void 0 : o.id) ?? u) + "-li"
      );
    }) });
  }
  function l() {
    return /* @__PURE__ */ i("ul", { id: n.current, className: e.className, children: e.buttons.map((o, u) => {
      if (!(o instanceof _))
        throw new Error(
          "AlloyButtonBar (type='AlloyButtonIcon') expects ButtonIconObject items."
        );
      const h = ((o == null ? void 0 : o.id) ?? "") === s, { model: f, onAnyEvent: p } = Fe(
        o,
        e.selected,
        h,
        a,
        t
      );
      return /* @__PURE__ */ i(
        "li",
        {
          className: e.buttonClass,
          children: /* @__PURE__ */ i(de, { buttonIcon: f, output: p })
        },
        ((o == null ? void 0 : o.id) ?? u) + "-li"
      );
    }) });
  }
  function d() {
    switch (e.type) {
      case "AlloyButtonIcon":
        return l();
      case "AlloyButton":
      default:
        return c();
    }
  }
  return /* @__PURE__ */ N("nav", { "data-type": e.type, children: [
    /* @__PURE__ */ i(r, {}),
    d()
  ] });
}
class yt {
  /**
   * @param {NavBarConfig} nav = {}
   */
  constructor(t = {}) {
    if (this.id = t.id ?? S("navbar"), this.className = t.className ?? "navbar navbar-expand-lg navbar-light bg-light", t.logo instanceof Y)
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
      this.logo = new Y(n);
    }
    if (t.linkBar instanceof J)
      this.linkBar = t.linkBar;
    else {
      const n = t.linkBar ?? {};
      this.linkBar = new J({
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
function On({ navBar: e }) {
  if (!e || !(e instanceof yt))
    throw new Error("AlloyNavBar requires `navBar` (NavBarObject instance).");
  const t = $(e.id), n = `${t.current}-collapse`;
  return /* @__PURE__ */ i("nav", { id: t.current, className: e.className, children: /* @__PURE__ */ N("div", { className: "container-fluid", children: [
    /* @__PURE__ */ i(Me, { linkLogo: e.logo }),
    /* @__PURE__ */ i(
      "button",
      {
        className: "navbar-toggler",
        type: "button",
        "data-bs-toggle": "collapse",
        "data-bs-target": `#${n}`,
        "aria-controls": n,
        "aria-expanded": "false",
        "aria-label": "Toggle navigation",
        children: /* @__PURE__ */ i("span", { className: "navbar-toggler-icon" })
      }
    ),
    /* @__PURE__ */ i(
      "div",
      {
        className: "position-relative navbar-collapse collapse justify-content-end",
        id: n,
        children: /* @__PURE__ */ i(ye, { linkBar: e.linkBar })
      }
    )
  ] }) });
}
function vt(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
class Nt {
  /**
   * @param {TableConfig} table
   */
  constructor(t = {}) {
    this.id = t.id ?? S("table"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [];
    const n = { iconClass: "fa-solid fa-user" }, s = { iconClass: "fa-solid fa-arrow-down" }, a = t.icon instanceof A ? t.icon : new A(t.icon || n), r = t.sort instanceof A ? t.sort : new A(t.sort || s);
    this.icon = a, this.sort = r;
  }
}
function wt(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function Ln({ table: e, output: t }) {
  if (!e || !(e instanceof Nt))
    throw new Error("AlloyTable requires `table` (TableObject instance).");
  const n = $(e.id), [s, a] = j({ col: "", dir: "asc" }), r = M(
    () => wt(e.rows),
    [e.rows]
  ), c = (d) => {
    if (!d) return;
    const o = s.col === d && s.dir === "asc" ? "desc" : "asc";
    a({ col: d, dir: o }), t == null || t({
      type: "column",
      name: d,
      dir: o
    });
  }, l = (d) => {
    t == null || t({
      type: "row",
      id: d
    });
  };
  return /* @__PURE__ */ N("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ i("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ i("thead", { children: /* @__PURE__ */ N("tr", { children: [
      /* @__PURE__ */ i("th", { scope: "col", children: "Type" }),
      r.map((d) => {
        const o = s.col === d, u = o && s.dir === "desc";
        return /* @__PURE__ */ i("th", { scope: "col", children: /* @__PURE__ */ N(
          "span",
          {
            onClick: () => c(d),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              vt(d),
              o && /* @__PURE__ */ i(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: u ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: u ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ i(q, { icon: e.sort })
                }
              )
            ]
          }
        ) }, d);
      })
    ] }) }),
    /* @__PURE__ */ i("tbody", { children: e.rows.length > 0 ? e.rows.map((d, o) => /* @__PURE__ */ N(
      "tr",
      {
        onClick: () => l(d == null ? void 0 : d.id),
        style: { cursor: "pointer" },
        children: [
          /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i(q, { icon: e.icon }) }),
          r.map((u) => /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i("span", { children: d == null ? void 0 : d[u] }) }, `${(d == null ? void 0 : d.id) ?? o}-${u}`))
        ]
      },
      (d == null ? void 0 : d.id) ?? o
    )) : /* @__PURE__ */ i("tr", { children: /* @__PURE__ */ i(
      "td",
      {
        colSpan: Math.max(1, r.length) + 1,
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
function Ee() {
  return Ee = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
    }
    return e;
  }, Ee.apply(this, arguments);
}
var De;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(De || (De = {}));
function F(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function ie(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function ke(e) {
  let {
    pathname: t = "/",
    search: n = "",
    hash: s = ""
  } = e;
  return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n), s && s !== "#" && (t += s.charAt(0) === "#" ? s : "#" + s), t;
}
function ze(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
    let s = e.indexOf("?");
    s >= 0 && (t.search = e.substr(s), e = e.substr(0, s)), e && (t.pathname = e);
  }
  return t;
}
var Ue;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(Ue || (Ue = {}));
function $e(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [n, s] = gt(e.path, e.caseSensitive, e.end), a = t.match(n);
  if (!a) return null;
  let r = a[0], c = r.replace(/(.)\/+$/, "$1"), l = a.slice(1);
  return {
    params: s.reduce((o, u, h) => {
      let {
        paramName: f,
        isOptional: p
      } = u;
      if (f === "*") {
        let v = l[h] || "";
        c = r.slice(0, r.length - v.length).replace(/(.)\/+$/, "$1");
      }
      const m = l[h];
      return p && !m ? o[f] = void 0 : o[f] = (m || "").replace(/%2F/g, "/"), o;
    }, {}),
    pathname: r,
    pathnameBase: c,
    pattern: e
  };
}
function gt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !0), ie(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let s = [], a = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (c, l, d) => (s.push({
    paramName: l,
    isOptional: d != null
  }), d ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (s.push({
    paramName: "*"
  }), a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? a += "\\/*$" : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"), [new RegExp(a, t ? void 0 : "i"), s];
}
function ne(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length, s = e.charAt(n);
  return s && s !== "/" ? null : e.slice(n) || "/";
}
function bt(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: s = "",
    hash: a = ""
  } = typeof e == "string" ? ze(e) : e;
  return {
    pathname: n ? n.startsWith("/") ? n : xt(n, t) : t,
    search: Et(s),
    hash: kt(a)
  };
}
function xt(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((a) => {
    a === ".." ? n.length > 1 && n.pop() : a !== "." && n.push(a);
  }), n.length > 1 ? n.join("/") : "/";
}
function be(e, t, n, s) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(s) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Ct(e) {
  return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0);
}
function Je(e, t) {
  let n = Ct(e);
  return t ? n.map((s, a) => a === n.length - 1 ? s.pathname : s.pathnameBase) : n.map((s) => s.pathnameBase);
}
function He(e, t, n, s) {
  s === void 0 && (s = !1);
  let a;
  typeof e == "string" ? a = ze(e) : (a = Ee({}, e), F(!a.pathname || !a.pathname.includes("?"), be("?", "pathname", "search", a)), F(!a.pathname || !a.pathname.includes("#"), be("#", "pathname", "hash", a)), F(!a.search || !a.search.includes("#"), be("#", "search", "hash", a)));
  let r = e === "" || a.pathname === "", c = r ? "/" : a.pathname, l;
  if (c == null)
    l = n;
  else {
    let h = t.length - 1;
    if (!s && c.startsWith("..")) {
      let f = c.split("/");
      for (; f[0] === ".."; )
        f.shift(), h -= 1;
      a.pathname = f.join("/");
    }
    l = h >= 0 ? t[h] : "/";
  }
  let d = bt(a, l), o = c && c !== "/" && c.endsWith("/"), u = (r || c === ".") && n.endsWith("/");
  return !d.pathname.endsWith("/") && (o || u) && (d.pathname += "/"), d;
}
const Ae = (e) => e.join("/").replace(/\/\/+/g, "/"), Et = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, kt = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, Ge = ["post", "put", "patch", "delete"];
new Set(Ge);
const Ot = ["get", ...Ge];
new Set(Ot);
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
function Oe() {
  return Oe = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
    }
    return e;
  }, Oe.apply(this, arguments);
}
const Ne = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (Ne.displayName = "DataRouter");
const Ye = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (Ye.displayName = "DataRouterState");
const Lt = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (Lt.displayName = "Await");
const G = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (G.displayName = "Navigation");
const je = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (je.displayName = "Location");
const ae = /* @__PURE__ */ g.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (ae.displayName = "Route");
const Bt = /* @__PURE__ */ g.createContext(null);
process.env.NODE_ENV !== "production" && (Bt.displayName = "RouteError");
function At(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t;
  Se() || (process.env.NODE_ENV !== "production" ? F(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : F(!1));
  let {
    basename: s,
    navigator: a
  } = g.useContext(G), {
    hash: r,
    pathname: c,
    search: l
  } = oe(e, {
    relative: n
  }), d = c;
  return s !== "/" && (d = c === "/" ? s : Ae([s, c])), a.createHref({
    pathname: d,
    search: l,
    hash: r
  });
}
function Se() {
  return g.useContext(je) != null;
}
function re() {
  return Se() || (process.env.NODE_ENV !== "production" ? F(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : F(!1)), g.useContext(je).location;
}
const Ze = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Xe(e) {
  g.useContext(G).static || g.useLayoutEffect(e);
}
function jt() {
  let {
    isDataRoute: e
  } = g.useContext(ae);
  return e ? Dt() : St();
}
function St() {
  Se() || (process.env.NODE_ENV !== "production" ? F(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : F(!1));
  let e = g.useContext(Ne), {
    basename: t,
    future: n,
    navigator: s
  } = g.useContext(G), {
    matches: a
  } = g.useContext(ae), {
    pathname: r
  } = re(), c = JSON.stringify(Je(a, n.v7_relativeSplatPath)), l = g.useRef(!1);
  return Xe(() => {
    l.current = !0;
  }), g.useCallback(function(o, u) {
    if (u === void 0 && (u = {}), process.env.NODE_ENV !== "production" && ie(l.current, Ze), !l.current) return;
    if (typeof o == "number") {
      s.go(o);
      return;
    }
    let h = He(o, JSON.parse(c), r, u.relative === "path");
    e == null && t !== "/" && (h.pathname = h.pathname === "/" ? t : Ae([t, h.pathname])), (u.replace ? s.replace : s.push)(h, u.state, u);
  }, [t, s, c, r, e]);
}
function oe(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    future: s
  } = g.useContext(G), {
    matches: a
  } = g.useContext(ae), {
    pathname: r
  } = re(), c = JSON.stringify(Je(a, s.v7_relativeSplatPath));
  return g.useMemo(() => He(e, JSON.parse(c), r, n === "path"), [e, c, r, n]);
}
var Qe = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(Qe || {}), Re = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(Re || {});
function Ie(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Rt(e) {
  let t = g.useContext(Ne);
  return t || (process.env.NODE_ENV !== "production" ? F(!1, Ie(e)) : F(!1)), t;
}
function Tt(e) {
  let t = g.useContext(ae);
  return t || (process.env.NODE_ENV !== "production" ? F(!1, Ie(e)) : F(!1)), t;
}
function et(e) {
  let t = Tt(e), n = t.matches[t.matches.length - 1];
  return n.route.id || (process.env.NODE_ENV !== "production" ? F(!1, e + ' can only be used on routes that contain a unique "id"') : F(!1)), n.route.id;
}
function Ft() {
  return et(Re.UseRouteId);
}
function Dt() {
  let {
    router: e
  } = Rt(Qe.UseNavigateStable), t = et(Re.UseNavigateStable), n = g.useRef(!1);
  return Xe(() => {
    n.current = !0;
  }), g.useCallback(function(a, r) {
    r === void 0 && (r = {}), process.env.NODE_ENV !== "production" && ie(n.current, Ze), n.current && (typeof a == "number" ? e.navigate(a) : e.navigate(a, Oe({
      fromRouteId: t
    }, r)));
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
function se() {
  return se = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
    }
    return e;
  }, se.apply(this, arguments);
}
function Te(e, t) {
  if (e == null) return {};
  var n = {}, s = Object.keys(e), a, r;
  for (r = 0; r < s.length; r++)
    a = s[r], !(t.indexOf(a) >= 0) && (n[a] = e[a]);
  return n;
}
const he = "get", ue = "application/x-www-form-urlencoded";
function we(e) {
  return e != null && typeof e.tagName == "string";
}
function Ut(e) {
  return we(e) && e.tagName.toLowerCase() === "button";
}
function $t(e) {
  return we(e) && e.tagName.toLowerCase() === "form";
}
function Pt(e) {
  return we(e) && e.tagName.toLowerCase() === "input";
}
function Vt(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function qt(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !Vt(e);
}
let ce = null;
function _t() {
  if (ce === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), ce = !1;
    } catch {
      ce = !0;
    }
  return ce;
}
const Kt = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function xe(e) {
  return e != null && !Kt.has(e) ? (process.env.NODE_ENV !== "production" && ie(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + ue + '"')), null) : e;
}
function Mt(e, t) {
  let n, s, a, r, c;
  if ($t(e)) {
    let l = e.getAttribute("action");
    s = l ? ne(l, t) : null, n = e.getAttribute("method") || he, a = xe(e.getAttribute("enctype")) || ue, r = new FormData(e);
  } else if (Ut(e) || Pt(e) && (e.type === "submit" || e.type === "image")) {
    let l = e.form;
    if (l == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let d = e.getAttribute("formaction") || l.getAttribute("action");
    if (s = d ? ne(d, t) : null, n = e.getAttribute("formmethod") || l.getAttribute("method") || he, a = xe(e.getAttribute("formenctype")) || xe(l.getAttribute("enctype")) || ue, r = new FormData(l, e), !_t()) {
      let {
        name: o,
        type: u,
        value: h
      } = e;
      if (u === "image") {
        let f = o ? o + "." : "";
        r.append(f + "x", "0"), r.append(f + "y", "0");
      } else o && r.append(o, h);
    }
  } else {
    if (we(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    n = he, s = null, a = ue, c = e;
  }
  return r && a === "text/plain" && (c = r, r = void 0), {
    action: s,
    method: n.toLowerCase(),
    encType: a,
    formData: r,
    body: c
  };
}
const Wt = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], zt = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], Jt = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], Ht = "6";
try {
  window.__reactRouterVersion = Ht;
} catch {
}
const tt = /* @__PURE__ */ g.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (tt.displayName = "ViewTransition");
const Gt = /* @__PURE__ */ g.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (Gt.displayName = "Fetchers");
process.env.NODE_ENV;
const Yt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Zt = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, W = /* @__PURE__ */ g.forwardRef(function(t, n) {
  let {
    onClick: s,
    relative: a,
    reloadDocument: r,
    replace: c,
    state: l,
    target: d,
    to: o,
    preventScrollReset: u,
    viewTransition: h
  } = t, f = Te(t, Wt), {
    basename: p
  } = g.useContext(G), m, v = !1;
  if (typeof o == "string" && Zt.test(o) && (m = o, Yt))
    try {
      let O = new URL(window.location.href), L = o.startsWith("//") ? new URL(O.protocol + o) : new URL(o), E = ne(L.pathname, p);
      L.origin === O.origin && E != null ? o = E + L.search + L.hash : v = !0;
    } catch {
      process.env.NODE_ENV !== "production" && ie(!1, '<Link to="' + o + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let y = At(o, {
    relative: a
  }), C = en(o, {
    replace: c,
    state: l,
    target: d,
    preventScrollReset: u,
    relative: a,
    viewTransition: h
  });
  function b(O) {
    s && s(O), O.defaultPrevented || C(O);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ g.createElement("a", se({}, f, {
      href: m || y,
      onClick: v || r ? s : b,
      ref: n,
      target: d
    }))
  );
});
process.env.NODE_ENV !== "production" && (W.displayName = "Link");
const Xt = /* @__PURE__ */ g.forwardRef(function(t, n) {
  let {
    "aria-current": s = "page",
    caseSensitive: a = !1,
    className: r = "",
    end: c = !1,
    style: l,
    to: d,
    viewTransition: o,
    children: u
  } = t, h = Te(t, zt), f = oe(d, {
    relative: h.relative
  }), p = re(), m = g.useContext(Ye), {
    navigator: v,
    basename: y
  } = g.useContext(G), C = m != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  on(f) && o === !0, b = v.encodeLocation ? v.encodeLocation(f).pathname : f.pathname, O = p.pathname, L = m && m.navigation && m.navigation.location ? m.navigation.location.pathname : null;
  a || (O = O.toLowerCase(), L = L ? L.toLowerCase() : null, b = b.toLowerCase()), L && y && (L = ne(L, y) || L);
  const E = b !== "/" && b.endsWith("/") ? b.length - 1 : b.length;
  let k = O === b || !c && O.startsWith(b) && O.charAt(E) === "/", B = L != null && (L === b || !c && L.startsWith(b) && L.charAt(b.length) === "/"), V = {
    isActive: k,
    isPending: B,
    isTransitioning: C
  }, x = k ? s : void 0, T;
  typeof r == "function" ? T = r(V) : T = [r, k ? "active" : null, B ? "pending" : null, C ? "transitioning" : null].filter(Boolean).join(" ");
  let R = typeof l == "function" ? l(V) : l;
  return /* @__PURE__ */ g.createElement(W, se({}, h, {
    "aria-current": x,
    className: T,
    ref: n,
    style: R,
    to: d,
    viewTransition: o
  }), typeof u == "function" ? u(V) : u);
});
process.env.NODE_ENV !== "production" && (Xt.displayName = "NavLink");
const Qt = /* @__PURE__ */ g.forwardRef((e, t) => {
  let {
    fetcherKey: n,
    navigate: s,
    reloadDocument: a,
    replace: r,
    state: c,
    method: l = he,
    action: d,
    onSubmit: o,
    relative: u,
    preventScrollReset: h,
    viewTransition: f
  } = e, p = Te(e, Jt), m = an(), v = rn(d, {
    relative: u
  }), y = l.toLowerCase() === "get" ? "get" : "post", C = (b) => {
    if (o && o(b), b.defaultPrevented) return;
    b.preventDefault();
    let O = b.nativeEvent.submitter, L = (O == null ? void 0 : O.getAttribute("formmethod")) || l;
    m(O || b.currentTarget, {
      fetcherKey: n,
      method: L,
      navigate: s,
      replace: r,
      state: c,
      relative: u,
      preventScrollReset: h,
      viewTransition: f
    });
  };
  return /* @__PURE__ */ g.createElement("form", se({
    ref: t,
    method: y,
    action: v,
    onSubmit: a ? o : C
  }, p));
});
process.env.NODE_ENV !== "production" && (Qt.displayName = "Form");
process.env.NODE_ENV;
var me;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(me || (me = {}));
var Pe;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Pe || (Pe = {}));
function It(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function nt(e) {
  let t = g.useContext(Ne);
  return t || (process.env.NODE_ENV !== "production" ? F(!1, It(e)) : F(!1)), t;
}
function en(e, t) {
  let {
    target: n,
    replace: s,
    state: a,
    preventScrollReset: r,
    relative: c,
    viewTransition: l
  } = t === void 0 ? {} : t, d = jt(), o = re(), u = oe(e, {
    relative: c
  });
  return g.useCallback((h) => {
    if (qt(h, n)) {
      h.preventDefault();
      let f = s !== void 0 ? s : ke(o) === ke(u);
      d(e, {
        replace: f,
        state: a,
        preventScrollReset: r,
        relative: c,
        viewTransition: l
      });
    }
  }, [o, d, u, s, a, n, e, r, c, l]);
}
function tn() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let nn = 0, sn = () => "__" + String(++nn) + "__";
function an() {
  let {
    router: e
  } = nt(me.UseSubmit), {
    basename: t
  } = g.useContext(G), n = Ft();
  return g.useCallback(function(s, a) {
    a === void 0 && (a = {}), tn();
    let {
      action: r,
      method: c,
      encType: l,
      formData: d,
      body: o
    } = Mt(s, t);
    if (a.navigate === !1) {
      let u = a.fetcherKey || sn();
      e.fetch(u, n, a.action || r, {
        preventScrollReset: a.preventScrollReset,
        formData: d,
        body: o,
        formMethod: a.method || c,
        formEncType: a.encType || l,
        flushSync: a.flushSync
      });
    } else
      e.navigate(a.action || r, {
        preventScrollReset: a.preventScrollReset,
        formData: d,
        body: o,
        formMethod: a.method || c,
        formEncType: a.encType || l,
        replace: a.replace,
        state: a.state,
        fromRouteId: n,
        flushSync: a.flushSync,
        viewTransition: a.viewTransition
      });
  }, [e, t, n]);
}
function rn(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    basename: s
  } = g.useContext(G), a = g.useContext(ae);
  a || (process.env.NODE_ENV !== "production" ? F(!1, "useFormAction must be used inside a RouteContext") : F(!1));
  let [r] = a.matches.slice(-1), c = se({}, oe(e || ".", {
    relative: n
  })), l = re();
  if (e == null) {
    c.search = l.search;
    let d = new URLSearchParams(c.search), o = d.getAll("index");
    if (o.some((h) => h === "")) {
      d.delete("index"), o.filter((f) => f).forEach((f) => d.append("index", f));
      let h = d.toString();
      c.search = h ? "?" + h : "";
    }
  }
  return (!e || e === ".") && r.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), s !== "/" && (c.pathname = c.pathname === "/" ? s : Ae([s, c.pathname])), ke(c);
}
function on(e, t) {
  t === void 0 && (t = {});
  let n = g.useContext(tt);
  n == null && (process.env.NODE_ENV !== "production" ? F(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : F(!1));
  let {
    basename: s
  } = nt(me.useViewTransitionState), a = oe(e, {
    relative: t.relative
  });
  if (!n.isTransitioning)
    return !1;
  let r = ne(n.currentLocation.pathname, s) || n.currentLocation.pathname, c = ne(n.nextLocation.pathname, s) || n.nextLocation.pathname;
  return $e(a.pathname, c) != null || $e(a.pathname, r) != null;
}
function ln(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
class cn {
  /**
   * @param {TableLinkConfig} tableLink
   */
  constructor(t = {}) {
    if (!t.link)
      throw new Error("TableLinkObject requires `link` (base route).");
    this.id = t.id ?? S("table-link"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = t.link;
    const n = { iconClass: "fa-solid fa-user" }, s = { iconClass: "fa-solid fa-arrow-down" };
    this.icon = t.icon instanceof A ? t.icon : new A(t.icon || n), this.sort = t.sort instanceof A ? t.sort : new A(t.sort || s);
  }
}
function dn(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function Bn({ tableLink: e, output: t }) {
  if (!e || !(e instanceof cn))
    throw new Error(
      "AlloyTableLink requires `tableLink` (TableLinkObject instance)."
    );
  const n = $(e.id), [s, a] = j({ col: "", dir: "asc" }), r = M(
    () => dn(e.rows),
    [e.rows]
  ), c = (l) => {
    if (!l) return;
    const d = s.col === l && s.dir === "asc" ? "desc" : "asc";
    a({ col: l, dir: d }), t == null || t({
      type: "column",
      name: l,
      dir: d
    });
  };
  return /* @__PURE__ */ N("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ i("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ i("thead", { children: /* @__PURE__ */ N("tr", { children: [
      /* @__PURE__ */ i("th", { scope: "col", children: "Type" }),
      r.map((l) => {
        const d = s.col === l, o = d && s.dir === "desc";
        return /* @__PURE__ */ i("th", { scope: "col", children: /* @__PURE__ */ N(
          "span",
          {
            onClick: () => c(l),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              ln(l),
              d && /* @__PURE__ */ i(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: o ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: o ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ i(q, { icon: e.sort })
                }
              )
            ]
          }
        ) }, l);
      })
    ] }) }),
    /* @__PURE__ */ i("tbody", { children: e.rows.length > 0 ? e.rows.map((l, d) => {
      const o = (l == null ? void 0 : l.id) ?? d, h = `${e.link.endsWith("/") ? e.link.slice(0, -1) : e.link}/${o}`;
      return /* @__PURE__ */ N("tr", { children: [
        /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i(q, { icon: e.icon }) }),
        r.map((f) => /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i(
          W,
          {
            to: h,
            className: "text-decoration-none",
            onClick: () => t == null ? void 0 : t({
              type: "navigate",
              to: h,
              id: o
            }),
            children: /* @__PURE__ */ i("span", { children: l == null ? void 0 : l[f] })
          }
        ) }, `${o}-${f}`))
      ] }, o);
    }) : /* @__PURE__ */ i("tr", { children: /* @__PURE__ */ i(
      "td",
      {
        colSpan: Math.max(1, r.length) + 1,
        className: "text-center text-secondary",
        children: "No rows"
      }
    ) }) })
  ] });
}
function hn(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
function un(e) {
  if (!Array.isArray(e) || e.length === 0) return [];
  const t = e[0] ?? {};
  return Object.keys(t).filter((n) => n !== "id");
}
function fn(e) {
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
class mn {
  /**
   * @param {Object} cfg
   */
  constructor(t = {}) {
    this.id = t.id ?? S("table-action"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = typeof t.link == "string" ? t.link : "";
    const n = new A({ iconClass: "fa-solid fa-user" }), s = new A({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = t.icon instanceof A ? t.icon : new A(t.icon || n), this.sort = t.sort instanceof A ? t.sort : new A(t.sort || s), this.actions = t.actions ? t.actions instanceof H ? t.actions : new H(t.actions) : void 0;
  }
}
function An({ tableAction: e, output: t }) {
  if (!e || !(e instanceof mn))
    throw new Error(
      "AlloyTableAction requires `tableAction` (TableActionObject instance)."
    );
  const n = $(e.id), s = M(
    () => un(e.rows),
    [e.rows]
  ), [a, r] = j({ col: "", dir: "asc" });
  function c(o) {
    const u = a.col === o && a.dir === "asc" ? "desc" : "asc";
    r({ col: o, dir: u });
    const h = new P({
      id: n.current,
      type: "column",
      action: "Sort",
      error: !1,
      data: {
        name: o,
        dir: u
      }
    });
    t == null || t(h);
  }
  function l(o) {
    return (u, h) => {
      const f = fn(u), p = new P({
        id: n.current,
        type: "table",
        action: f,
        error: !1,
        data: o
      });
      t == null || t(p);
    };
  }
  const d = !!e.actions;
  return /* @__PURE__ */ N("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ i("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ i("thead", { children: /* @__PURE__ */ N("tr", { children: [
      /* @__PURE__ */ i("th", { scope: "col", children: "Type" }),
      s.map((o) => {
        const u = a.col === o, h = u && a.dir === "desc";
        return /* @__PURE__ */ i("th", { scope: "col", children: /* @__PURE__ */ N(
          "span",
          {
            onClick: () => c(o),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              hn(o),
              u && /* @__PURE__ */ i(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: h ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: h ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ i(q, { icon: e.sort })
                }
              )
            ]
          }
        ) }, `h-${o}`);
      }),
      d && /* @__PURE__ */ i("th", { scope: "col", className: "text-end", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ i("tbody", { children: e.rows.length > 0 ? e.rows.map((o, u) => {
      const h = (o == null ? void 0 : o.id) ?? u, f = e.actions;
      return /* @__PURE__ */ N("tr", { children: [
        /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i(q, { icon: e.icon }) }),
        s.map((p) => {
          const m = e.link || "", v = m.endsWith("/") ? m.slice(0, -1) : m, y = v ? `${v}/${h}` : "";
          return /* @__PURE__ */ i("td", { children: v ? /* @__PURE__ */ i(
            W,
            {
              to: y,
              onClick: () => {
                const C = new P({
                  id: n.current,
                  type: "row",
                  action: "navigate",
                  error: !1,
                  data: {
                    to: y,
                    ...o
                  }
                });
                t == null || t(C);
              },
              className: "text-decoration-none",
              children: /* @__PURE__ */ i("span", { children: o == null ? void 0 : o[p] })
            }
          ) : /* @__PURE__ */ i("span", { children: o == null ? void 0 : o[p] }) }, `${h}-${p}`);
        }),
        d && /* @__PURE__ */ i("td", { className: "text-end", children: /* @__PURE__ */ i(
          ve,
          {
            buttonBar: f,
            output: l(o)
          }
        ) })
      ] }, h);
    }) : /* @__PURE__ */ i("tr", { children: /* @__PURE__ */ i(
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
class st {
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
    if (this.id = t.id ?? S("card"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "", t.header instanceof w)
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
function jn({ card: e }) {
  var r;
  if (!e || !(e instanceof st))
    throw new Error("AlloyCard requires `card` (CardObject instance).");
  const t = e.header ? /* @__PURE__ */ i(
    "div",
    {
      id: e.header.id,
      className: e.header.className || "card-header",
      "aria-label": e.header.name,
      children: e.header.name
    }
  ) : null, n = /* @__PURE__ */ N(
    "div",
    {
      id: e.body.id,
      className: e.body.className || "card-body",
      "aria-label": e.body.name,
      children: [
        e.body.name && /* @__PURE__ */ i("div", { className: "mb-2", children: e.body.name }),
        e.fields.map((c) => /* @__PURE__ */ i(
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
  ), s = e.link ? /* @__PURE__ */ i(
    W,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (r = e.body) == null ? void 0 : r.name,
      children: n
    }
  ) : n, a = e.footer ? /* @__PURE__ */ i(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer",
      "aria-label": e.footer.name,
      children: e.footer.name
    }
  ) : null;
  return /* @__PURE__ */ N("div", { id: e.id, className: e.className, children: [
    t,
    s,
    a
  ] });
}
class pn extends st {
  constructor(t = {}) {
    if (super(t), !t.icon)
      throw new Error("CardIconObject requires `icon`.");
    this.icon = t.icon instanceof A ? t.icon : new A(t.icon), this.iconClass = t.iconClass ?? "col-4 d-flex align-items-start justify-content-center text-warning fs-2", this.textClass = t.textClass ?? "col-8";
  }
}
function Sn({ cardIcon: e }) {
  var r, c, l, d;
  if (!e || !(e instanceof pn))
    throw new Error(
      "AlloyCardIcon requires `cardIcon` (CardIconObject instance)."
    );
  const t = (r = e.header) != null && r.name ? /* @__PURE__ */ i(
    "div",
    {
      id: e.header.id,
      className: e.header.className,
      children: e.header.name
    }
  ) : null, n = /* @__PURE__ */ i(
    "div",
    {
      id: e.body.id,
      className: e.body.className,
      "aria-label": e.body.name,
      children: /* @__PURE__ */ N("div", { className: "row m-0", children: [
        /* @__PURE__ */ i("div", { className: e.iconClass, children: /* @__PURE__ */ i(q, { icon: e.icon }) }),
        /* @__PURE__ */ N("div", { className: e.textClass, children: [
          (c = e.body) != null && c.name ? /* @__PURE__ */ i("div", { className: "mb-1 fw-semibold", children: e.body.name }) : null,
          e.fields.map(
            (o) => o != null && o.name ? /* @__PURE__ */ i(
              "div",
              {
                id: o.id,
                className: o.className,
                children: o.name
              },
              o.id
            ) : null
          )
        ] })
      ] })
    }
  ), s = e.link ? /* @__PURE__ */ i(
    W,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (l = e.body) == null ? void 0 : l.name,
      children: n
    }
  ) : n, a = (d = e.footer) != null && d.name ? /* @__PURE__ */ i(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className,
      children: e.footer.name
    }
  ) : null;
  return /* @__PURE__ */ N(
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
class Ve {
  constructor(t = {}) {
    this.id = t.id ?? S("logo"), this.imageUrl = t.imageUrl ?? "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png", this.alt = t.alt ?? "Alloymobile", this.width = t.width ?? "72px", this.height = t.height ?? "auto";
  }
}
class at {
  constructor(t = {}) {
    this.id = t.id ?? S("card"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "", this.header = t.header instanceof w ? t.header : new w(t.header || {}), this.body = t.body instanceof w ? t.body : new w(t.body || {}), this.footer = t.footer instanceof w ? t.footer : new w(t.footer || {});
    const n = Array.isArray(t.fields) ? t.fields : [];
    this.fields = n.map(
      (s) => s instanceof w ? s : new w(s || {})
    ), this.logo = t.logo instanceof Ve ? t.logo : new Ve(t.logo || {}), this.logoClass = t.logoClass ?? "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0", this.textClass = t.textClass ?? "col-8";
  }
}
function Rn({ cardImage: e }) {
  var r, c, l, d;
  if (!(e instanceof at))
    throw new Error(
      "AlloyCardImage requires `cardImage` (CardImageObject instance)."
    );
  const t = (r = e.header) != null && r.name ? /* @__PURE__ */ i(
    "div",
    {
      id: e.header.id,
      className: e.header.className || "card-header py-2 fw-semibold",
      "aria-label": e.header.name,
      children: e.header.name
    }
  ) : null, n = /* @__PURE__ */ i(
    "div",
    {
      id: e.body.id,
      className: e.body.className || "card-body py-3",
      "aria-label": e.body.name,
      children: /* @__PURE__ */ N("div", { className: "row m-0", children: [
        /* @__PURE__ */ i("div", { className: e.logoClass, children: /* @__PURE__ */ i(
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
        /* @__PURE__ */ i("div", { className: e.textClass, children: /* @__PURE__ */ N("div", { className: "row p-1", children: [
          (c = e.body) != null && c.name ? /* @__PURE__ */ i("div", { className: "fw-semibold mb-1", children: e.body.name }) : null,
          e.fields.map(
            (o) => o != null && o.name ? /* @__PURE__ */ i(
              "div",
              {
                id: o.id,
                className: o.className || "",
                children: o.name
              },
              o.id ?? S("card-image-field")
            ) : null
          )
        ] }) })
      ] })
    }
  ), s = e.link ? /* @__PURE__ */ i(
    W,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (l = e.body) == null ? void 0 : l.name,
      children: n
    }
  ) : n, a = (d = e.footer) != null && d.name ? /* @__PURE__ */ i(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer small text-muted py-2",
      "aria-label": e.footer.name,
      children: e.footer.name
    }
  ) : null;
  return /* @__PURE__ */ N(
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
class yn {
  constructor(t = {}) {
    this.id = t.id ?? S("card-action"), this.className = t.className ?? "card border m-2 shadow", this.link = t.link ?? "";
    const n = t.header ?? {};
    this.header = n instanceof w ? n : new w(n);
    const s = t.body ?? {};
    this.body = s instanceof w ? s : new w(s);
    const a = Array.isArray(t.fields) ? t.fields : [];
    this.fields = a.map(
      (l) => l instanceof w ? l : new w(l || {})
    );
    const r = t.footer ?? {};
    this.footer = r instanceof w ? r : new w(r), this.type = t.type ?? "AlloyButtonBar";
    const c = t.action;
    this.type === "AlloyLinkBar" ? this.action = c instanceof J ? c : c ? new J(c) : void 0 : this.action = c instanceof H ? c : c ? new H(c) : void 0;
  }
}
function Tn({ cardAction: e, output: t }) {
  var d, o;
  if (!e || !(e instanceof yn))
    throw new Error(
      "AlloyCardAction requires `cardAction` (CardActionObject instance)."
    );
  function n(u) {
    if (typeof t != "function") return;
    const h = u && typeof u.toJSON == "function" ? u.toJSON() : u || {}, { error: f = !1, errorMessage: p = [] } = h, m = s(h), v = {};
    Array.isArray(e.fields) && e.fields.forEach((C) => {
      if (!C) return;
      const b = C.id, O = C.name;
      b && typeof O < "u" && (v[b] = O);
    });
    const y = new P({
      id: e.id,
      type: "card-action",
      action: m,
      error: !!f,
      errorMessage: p || [],
      data: v
    });
    t(y);
  }
  function s(u) {
    if (!u || typeof u != "object") return "";
    const h = (p) => {
      if (!p || typeof p != "object") return "";
      const m = typeof p.name == "string" ? p.name.trim() : "";
      if (m) return m;
      const v = typeof p.ariaLabel == "string" ? p.ariaLabel.trim() : "";
      if (v) return v;
      const y = typeof p.title == "string" ? p.title.trim() : "";
      if (y) return y;
      const C = typeof p.id == "string" ? p.id.trim() : "";
      return C || "";
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
  const a = (d = e.header) != null && d.name ? /* @__PURE__ */ i(
    "div",
    {
      id: e.header.id,
      className: e.header.className ?? "card-header py-2 fw-semibold",
      children: e.header.name
    }
  ) : null, r = /* @__PURE__ */ N(
    "div",
    {
      id: e.body.id,
      className: e.body.className ?? "card-body",
      children: [
        e.body.name ? /* @__PURE__ */ i("div", { className: "fw-semibold mb-1", children: e.body.name }) : null,
        e.fields.map(
          (u) => u != null && u.name ? /* @__PURE__ */ i(
            "div",
            {
              id: u.id,
              className: u.className ?? "",
              children: u.name
            },
            u.id ?? S("card-field")
          ) : null
        )
      ]
    }
  ), c = e.link ? /* @__PURE__ */ i(
    W,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (o = e.body) == null ? void 0 : o.name,
      children: r
    }
  ) : r, l = /* @__PURE__ */ N(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className ?? "card-footer d-flex align-items-center gap-2 py-2",
      children: [
        e.footer.name ? /* @__PURE__ */ i("div", { className: "me-auto small text-muted", children: e.footer.name }) : null,
        e.action ? e.type === "AlloyLinkBar" ? /* @__PURE__ */ i(ye, { linkBar: e.action, output: n }) : /* @__PURE__ */ i(
          ve,
          {
            buttonBar: e.action,
            output: n
          }
        ) : null
      ]
    }
  );
  return /* @__PURE__ */ N(
    "div",
    {
      id: e.id,
      className: e.className ?? "card border m-2 shadow",
      children: [
        a,
        c,
        l
      ]
    }
  );
}
class vn {
  /**
   * @param {CardIconActionConfig} card
   */
  constructor(t = {}) {
    this.id = t.id ?? S("card-icon-action"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "";
    const n = t.header ?? {};
    this.header = n instanceof w ? n : new w(n);
    const s = t.body ?? {};
    this.body = s instanceof w ? s : new w(s);
    const a = Array.isArray(t.fields) ? t.fields : [];
    this.fields = a.map(
      (l) => l instanceof w ? l : new w(l || {})
    );
    const r = t.footer ?? {};
    this.footer = r instanceof w ? r : new w(r);
    const c = new A({ iconClass: "fa-solid fa-user fa-2xl" });
    this.icon = t.icon instanceof A ? t.icon : new A(t.icon || { iconClass: c.iconClass }), this.iconClass = t.iconClass ?? "col-3 d-flex align-items-center justify-content-center rounded-circle bg-warning text-white mb-0", this.textClass = t.textClass ?? "col-9", this.type = t.type ?? "AlloyButtonBar", this.type === "AlloyLinkBar" ? this.action = t.action instanceof J ? t.action : new J(t.action || {}) : this.action = t.action instanceof H ? t.action : new H(t.action || {});
  }
}
function Fn({ cardIconAction: e, output: t }) {
  var o, u;
  if (!e || !(e instanceof vn))
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
    const v = typeof h.id == "string" ? h.id.trim() : "";
    return v || "";
  }
  function s() {
    return (h, f) => {
      if (typeof t != "function") return;
      const p = n(h), m = {};
      Array.isArray(e.fields) && e.fields.forEach((y) => {
        if (!y) return;
        const C = y.id, b = y.name;
        C && typeof b < "u" && (m[C] = b);
      });
      const v = new P({
        id: e.id,
        // align with AlloyCardAction
        type: "card-action",
        action: p,
        error: !1,
        errorMessage: [],
        data: m
      });
      t(v);
    };
  }
  const a = (o = e.header) != null && o.name ? /* @__PURE__ */ i(
    "div",
    {
      id: e.header.id,
      className: e.header.className || "card-header py-2 fw-semibold",
      "aria-label": e.header.name,
      children: e.header.name
    }
  ) : null, r = /* @__PURE__ */ i(
    "div",
    {
      id: e.body.id,
      className: e.body.className || "card-body",
      "aria-label": e.body.name,
      children: /* @__PURE__ */ N("div", { className: "row m-0", children: [
        /* @__PURE__ */ i("div", { className: e.iconClass, children: /* @__PURE__ */ i(q, { icon: e.icon }) }),
        /* @__PURE__ */ i("div", { className: e.textClass, children: /* @__PURE__ */ i("div", { className: "row p-1", children: e.fields.map(
          (h) => h != null && h.name ? /* @__PURE__ */ i(
            "div",
            {
              id: h.id,
              className: h.className,
              children: h.name
            },
            h.id ?? S("card-icon-action-field")
          ) : null
        ) }) })
      ] })
    }
  ), c = e.link ? /* @__PURE__ */ i(
    W,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (u = e.body) == null ? void 0 : u.name,
      children: r
    }
  ) : r, l = e.type === "AlloyLinkBar" ? /* @__PURE__ */ i(
    ye,
    {
      linkBar: e.action,
      output: s()
    }
  ) : /* @__PURE__ */ i(
    ve,
    {
      buttonBar: e.action,
      output: s()
    }
  ), d = /* @__PURE__ */ N(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      "aria-label": e.footer.name,
      children: [
        /* @__PURE__ */ i("div", { className: "me-auto", children: e.footer.name ? e.footer.name : null }),
        /* @__PURE__ */ i("div", { role: "group", children: l })
      ]
    }
  );
  return /* @__PURE__ */ N(
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
class Nn extends at {
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
        this.action = t.action instanceof J ? t.action : new J(
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
        this.type = "AlloyButtonBar", this.action = t.action instanceof H ? t.action : new H(
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
function Dn({ cardImageAction: e, output: t }) {
  var d, o, u, h, f, p;
  if (!e || !(e instanceof Nn))
    throw new Error(
      "AlloyCardImageAction requires `cardImageAction` (CardImageActionObject instance)."
    );
  function n() {
    return (m, v) => {
      if (typeof t != "function") return;
      const y = wn(m), C = {};
      Array.isArray(e.fields) && e.fields.forEach((O) => {
        if (!O) return;
        const L = O.id, E = O.name;
        L && typeof E < "u" && (C[L] = E);
      });
      const b = new P({
        id: e.id,
        type: "card-action",
        action: y,
        error: !1,
        errorMessage: [],
        data: C
      });
      t(b);
    };
  }
  const a = e.header && ((d = e.header.name) == null ? void 0 : d.trim()) ? /* @__PURE__ */ i(
    "div",
    {
      id: e.header.id,
      className: e.header.className || "card-header py-2 fw-semibold",
      "aria-label": e.header.name,
      children: e.header.name
    }
  ) : null, r = /* @__PURE__ */ i(
    "div",
    {
      id: e.body.id,
      className: e.body.className || "card-body d-flex align-items-center",
      "aria-label": e.body.name,
      children: /* @__PURE__ */ N("div", { className: "row m-0", children: [
        /* @__PURE__ */ i("div", { className: e.logoClass, children: /* @__PURE__ */ i(
          "img",
          {
            src: (o = e.logo) == null ? void 0 : o.imageUrl,
            alt: (u = e.logo) == null ? void 0 : u.alt,
            style: {
              width: (h = e.logo) == null ? void 0 : h.width,
              height: (f = e.logo) == null ? void 0 : f.height,
              maxWidth: "100%",
              objectFit: "contain"
            }
          }
        ) }),
        /* @__PURE__ */ i("div", { className: e.textClass, children: /* @__PURE__ */ i("div", { className: "row p-1", children: e.fields.map(
          (m) => m != null && m.name ? /* @__PURE__ */ i(
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
  ), c = e.link ? /* @__PURE__ */ i(
    W,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (p = e.body) == null ? void 0 : p.name,
      children: r
    }
  ) : r, l = /* @__PURE__ */ N(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      "aria-label": e.footer.name,
      children: [
        /* @__PURE__ */ i("div", { className: "flex-grow-1", children: e.footer.name }),
        /* @__PURE__ */ i("div", { role: "group", children: e.type === "AlloyLinkBar" ? /* @__PURE__ */ i(
          ye,
          {
            linkBar: e.action,
            output: n()
          }
        ) : /* @__PURE__ */ i(
          ve,
          {
            buttonBar: e.action,
            output: n()
          }
        ) })
      ]
    }
  );
  return /* @__PURE__ */ N(
    "div",
    {
      id: e.id,
      className: e.className,
      children: [
        a,
        c,
        l
      ]
    }
  );
}
function wn(e) {
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
class qe {
  constructor(t = {}) {
    const {
      id: n,
      title: s = "AlloyMobile",
      className: a = "col m-2",
      message: r = "",
      action: c = "",
      type: l = "AlloyInputTextIcon",
      submit: d,
      fields: o,
      data: u
    } = t;
    this.id = n ?? S("form"), this.title = s, this.className = a, this.message = r, this.action = c, this.type = l, this.submit = d instanceof fe ? d : new fe(
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
    const h = Array.isArray(o) ? o : [];
    this.fields = h.map(
      (f) => f instanceof Ce ? f : new Ce(f)
    ), this.data = u ?? {};
  }
}
function _e(e, t, n) {
  let s = !0;
  const a = [];
  if (e.required && (e.type === "checkbox" ? (Array.isArray(t) ? t : []).length === 0 && (s = !1, a.push("This field is required.")) : (t === "" || t === !1 || t === void 0 || t === null) && (s = !1, a.push("This field is required."))), s && typeof e.minLength == "number" && typeof t == "string" && t.length < e.minLength && (s = !1, a.push(`Minimum length is ${e.minLength}`)), s && typeof e.maxLength == "number" && typeof t == "string" && t.length > e.maxLength && (s = !1, a.push(`Maximum length is ${e.maxLength}`)), s && e.pattern && typeof t == "string" && !new RegExp(e.pattern).test(t) && (s = !1, a.push("Invalid format.")), s && e.passwordStrength && typeof t == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(t) || (s = !1, a.push("Password is too weak."))), s && e.matchWith) {
    const r = e.matchWith;
    n[r] !== t && (s = !1, a.push("Values do not match."));
  }
  return {
    valid: s,
    error: !s,
    errors: a
  };
}
function Un({ form: e, output: t }) {
  const n = e instanceof qe ? e : new qe(e || {});
  if (!n || !Array.isArray(n.fields) || !(n.submit instanceof fe))
    throw new Error(
      "AlloyForm could not hydrate a valid FormObject (missing fields[] or submit)."
    );
  const [s, a] = j(() => {
    const h = {}, f = {};
    return n.fields.forEach((p) => {
      f[p.name] = p.value;
    }), n.fields.forEach((p) => {
      const m = p.value, { valid: v, error: y, errors: C } = _e(
        p,
        m,
        f
      );
      h[p.name] = {
        value: m,
        valid: v,
        error: y,
        errors: C
      };
    }), h;
  }), r = $(null), c = it(
    (h) => {
      const f = {};
      Object.keys(h).forEach((m) => {
        f[m] = h[m].value;
      });
      const p = {};
      return n.fields.forEach((m) => {
        const v = f[m.name], { valid: y, error: C, errors: b } = _e(
          m,
          v,
          f
        );
        p[m.name] = {
          value: v,
          valid: y,
          error: C,
          errors: b
        };
      }), p;
    },
    [n.fields]
  );
  function l(h) {
    const f = h instanceof P ? h.data || {} : h || {}, { name: p, value: m } = f;
    p && a((v) => {
      const y = { ...v };
      return y[p] = {
        ...v[p] || {
          value: void 0,
          valid: !0,
          error: !1,
          errors: []
        },
        value: m
      }, c(y);
    });
  }
  const d = M(() => {
    const h = {};
    return Object.keys(s).forEach((f) => {
      h[f] = s[f].value;
    }), h;
  }, [s]), o = M(() => Object.values(s).some(
    (h) => h.error || !h.valid
  ), [s]);
  function u(h) {
    let f = !1;
    Object.values(s).forEach((y) => {
      (y.error || !y.valid) && (f = !0);
    });
    const p = { ...d };
    n.data = p, n.message = "";
    const m = f ? { ...s } : p, v = new P({
      id: n.id,
      // top-level id, as you requested
      type: "form",
      action: "submit",
      data: m,
      error: f
      // no errorMessage; all useful info is inside data for error=true
    });
    t == null || t(v);
  }
  return n.submit.disabled = o || !!n.submit.loading, /* @__PURE__ */ i("div", { className: "row", children: /* @__PURE__ */ i("div", { className: n.className, children: /* @__PURE__ */ N("div", { className: "text-center", children: [
    /* @__PURE__ */ i("h3", { children: n.title }),
    n.message !== "" && /* @__PURE__ */ i("div", { className: "alert alert-text-danger m-0 p-0", children: n.message }),
    n.fields.map((h) => /* @__PURE__ */ i(
      We,
      {
        input: h,
        output: l
      },
      h.id
    )),
    /* @__PURE__ */ i(
      mt,
      {
        ref: r,
        buttonSubmit: n.submit,
        output: u
      }
    )
  ] }) }) });
}
class gn {
  constructor(t = {}) {
    this.id = t.id ?? S("tab"), this.key = t.key ?? this.id, this.title = t.title ?? "", this.subtitle = t.subtitle ?? "", this.order = typeof t.order == "number" ? t.order : 0, this.required = !!t.required, this.stage = t.stage ?? "", this.status = t.status ?? "", this.icon = t.icon ? t.icon instanceof A ? t.icon : new A(t.icon) : null, this.inputs = Array.isArray(t.inputs) ? t.inputs : [];
  }
}
class bn {
  constructor(t = {}) {
    this.id = t.id ?? S("tab-form"), this.name = t.name ?? "", this.status = t.status ?? "draft";
    const s = (Array.isArray(t.tabs) ? t.tabs : []).map((c) => new gn(c));
    this.tabs = s.sort((c, l) => c.order - l.order);
    let a = typeof t.currentIndex == "number" ? t.currentIndex : 0;
    a < 0 && (a = 0), a >= this.tabs.length && (a = this.tabs.length - 1), this.currentIndex = this.tabs.length > 0 ? a : 0;
    const r = t.navButtons || {};
    this.navButtons = {
      previous: r.previous ? new _({
        ...r.previous,
        name: r.previous.name || r.previous.label || "Previous"
      }) : null,
      next: r.next ? new _({
        ...r.next,
        name: r.next.name || r.next.label || "Next"
      }) : null,
      finish: r.finish ? new _({
        ...r.finish,
        name: r.finish.name || r.finish.label || "Finish"
      }) : null
    };
  }
}
function xn(e) {
  const t = {};
  return e.tabs.forEach((n) => {
    const s = {};
    n.inputs.forEach((a) => {
      const r = a.name;
      r && (typeof a.value < "u" ? s[r] = a.value : a.type === "checkbox" ? s[r] = !1 : s[r] = "");
    }), t[n.key] = s;
  }), t;
}
function Ke(e, t) {
  const n = {};
  return e.inputs.forEach((s) => {
    const a = s.name;
    if (!a) return;
    const r = [], c = typeof t[a] < "u" ? t[a] : s.value;
    if (s.required && (s.type === "checkbox" ? c || r.push("This field is required.") : (c === "" || c === null || typeof c > "u") && r.push("This field is required.")), s.matchWith) {
      const l = s.matchWith, d = t[l];
      c !== d && r.push("Values do not match.");
    }
    r.length > 0 && (n[a] = r);
  }), n;
}
function $n({ tabForm: e, output: t }) {
  if (!e || !(e instanceof bn))
    throw new Error("AlloyTabForm requires `tabForm` (TabFormObject instance).");
  const [n, s] = j(e.currentIndex), [a, r] = j(() => xn(e)), [c, l] = j({}), d = e.tabs, o = d.length, u = d[n] || null, h = u ? u.key : "", f = e.navButtons || {};
  function p(x, T, R, D) {
    const U = a[x] || {};
    return Object.prototype.hasOwnProperty.call(U, T) ? U[T] : typeof R < "u" ? R : D === "checkbox" ? !1 : "";
  }
  function m(x, T) {
    var X, z, le;
    const R = T && typeof T.toJSON == "function" ? T.toJSON() : T, D = (X = R == null ? void 0 : R.data) == null ? void 0 : X.name, U = (z = R == null ? void 0 : R.data) == null ? void 0 : z.value, K = ((le = R == null ? void 0 : R.data) == null ? void 0 : le.errors) || [];
    D && (r((ge) => {
      const Z = { ...ge }, Q = { ...Z[x] || {} };
      return Q[D] = U, Z[x] = Q, Z;
    }), l((ge) => {
      const Z = { ...ge }, Q = { ...Z[x] || {} };
      return K.length > 0 ? Q[D] = K : delete Q[D], Z[x] = Q, Z;
    }));
  }
  function v(x, T, R, D, U) {
    const K = d[T] || u, X = K ? K.key : h, z = {
      currentIndex: T,
      currentTabKey: X,
      values: R
    };
    if (U && D && Object.keys(D).length > 0 && (z.errors = D, z.message = "Validation failed for current step."), typeof t != "function") return;
    const le = U ? P.errorOf({
      id: e.id,
      type: "tab-form",
      action: x === "finish" ? "submit" : "draft",
      data: z
    }) : P.ok({
      id: e.id,
      type: "tab-form",
      action: x === "finish" ? "submit" : "draft",
      data: z
    });
    t(le);
  }
  function y() {
    if (!u || n <= 0) return;
    const x = n - 1;
    s(x), v("previous", x, a, c, !1);
  }
  function C() {
    if (!u || n >= o - 1) return;
    const x = u.key, T = a[x] || {}, R = Ke(u, T);
    if (Object.keys(R).length > 0) {
      const K = {
        ...c,
        [x]: R
      };
      l(K), v("next", n, a, K, !0);
      return;
    }
    const D = n + 1;
    s(D);
    const U = { ...c };
    delete U[x], l(U), v("next", D, a, U, !1);
  }
  function b() {
    if (!u) return;
    const x = u.key, T = a[x] || {}, R = Ke(u, T);
    if (Object.keys(R).length > 0) {
      const U = {
        ...c,
        [x]: R
      };
      l(U), v("finish", n, a, U, !0);
      return;
    }
    const D = { ...c };
    delete D[x], l(D), v("finish", n, a, D, !1);
  }
  if (!u)
    return /* @__PURE__ */ i("div", { className: "alert alert-warning", children: "No steps defined for this TabForm." });
  const O = n > 0, L = n === o - 1, E = !L, k = O && (f.previous || new _({
    name: "Previous",
    icon: { iconClass: "fa-solid fa-arrow-left" },
    className: "btn btn-primary"
  })), B = E && (f.next || new _({
    name: "Next",
    icon: { iconClass: "fa-solid fa-arrow-right" },
    className: "btn btn-primary"
  })), V = L && (f.finish || new _({
    name: "Finish",
    icon: { iconClass: "fa-solid fa-paper-plane" },
    className: "btn btn-primary"
  }));
  return /* @__PURE__ */ N("div", { className: "alloy-tab-form", children: [
    /* @__PURE__ */ i("ul", { className: "nav nav-tabs mb-3 flex-wrap", children: d.map((x, T) => /* @__PURE__ */ i("li", { className: "nav-item", children: /* @__PURE__ */ N(
      "button",
      {
        type: "button",
        className: `nav-link ${T === n ? "active" : ""}`,
        onClick: () => s(T),
        children: [
          x.icon && /* @__PURE__ */ i("span", { className: "me-1", children: /* @__PURE__ */ i(q, { icon: x.icon }) }),
          x.title || `Step ${T + 1}`
        ]
      }
    ) }, x.id)) }),
    (u.title || u.subtitle) && /* @__PURE__ */ N("div", { className: "mb-3", children: [
      u.title && /* @__PURE__ */ i("h5", { className: "mb-1", children: u.title }),
      u.subtitle && /* @__PURE__ */ i("div", { className: "text-muted small", children: u.subtitle })
    ] }),
    /* @__PURE__ */ N(
      "form",
      {
        onSubmit: (x) => x.preventDefault(),
        noValidate: !0,
        children: [
          /* @__PURE__ */ i("div", { className: "row g-3", children: /* @__PURE__ */ i("div", { className: "col-12 col-md-6 col-lg-5 mx-auto", children: u.inputs.map((x, T) => {
            const R = p(
              u.key,
              x.name,
              x.value,
              x.type
            ), U = (c[u.key] || {})[x.name] || [], K = U.length > 0, X = new Ce({
              ...x,
              value: R,
              errors: U,
              invalid: K
            });
            return /* @__PURE__ */ i(
              We,
              {
                input: X,
                output: (z) => m(u.key, z)
              },
              `inp-${T}`
            );
          }) }) }),
          /* @__PURE__ */ N("div", { className: "d-flex justify-content-between mt-4", children: [
            O ? /* @__PURE__ */ i(
              de,
              {
                buttonIcon: k,
                output: () => y()
              }
            ) : /* @__PURE__ */ i("span", {}),
            /* @__PURE__ */ N("div", { className: "d-flex gap-2 ms-auto", children: [
              E && /* @__PURE__ */ i(
                de,
                {
                  buttonIcon: B,
                  output: () => C()
                }
              ),
              L && /* @__PURE__ */ i(
                de,
                {
                  buttonIcon: V,
                  output: () => b()
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  ut as AlloyButton,
  ve as AlloyButtonBar,
  de as AlloyButtonIcon,
  mt as AlloyButtonSubmit,
  jn as AlloyCard,
  Tn as AlloyCardAction,
  Sn as AlloyCardIcon,
  Fn as AlloyCardIconAction,
  Rn as AlloyCardImage,
  Dn as AlloyCardImageAction,
  Un as AlloyForm,
  q as AlloyIcon,
  We as AlloyInput,
  ot as AlloyLink,
  ye as AlloyLinkBar,
  ct as AlloyLinkIcon,
  Me as AlloyLinkLogo,
  On as AlloyNavBar,
  $n as AlloyTabForm,
  Ln as AlloyTable,
  An as AlloyTableAction,
  Bn as AlloyTableLink,
  H as ButtonBarObject,
  _ as ButtonIconObject,
  te as ButtonObject,
  fe as ButtonSubmitObject,
  yn as CardActionObject,
  vn as CardIconActionObject,
  pn as CardIconObject,
  Nn as CardImageActionObject,
  at as CardImageObject,
  st as CardObject,
  qe as FormObject,
  A as IconObject,
  Ce as InputObject,
  J as LinkBarObject,
  ee as LinkIconObject,
  Y as LinkLogoObject,
  I as LinkObject,
  yt as NavBarObject,
  bn as TabFormObject,
  gn as TabObject,
  mn as TableActionObject,
  cn as TableLinkObject,
  Nt as TableObject
};
//# sourceMappingURL=alloy-react.es.js.map
