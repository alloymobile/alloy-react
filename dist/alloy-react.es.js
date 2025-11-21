import { jsx as o, jsxs as x, Fragment as Fe } from "react/jsx-runtime";
import * as O from "react";
import { useRef as P, useState as L, useMemo as _, forwardRef as $e, useImperativeHandle as Pe, useEffect as z, useCallback as pt } from "react";
import "react-dom";
function S(e = "id") {
  const t = Date.now(), n = Math.random().toString(36).slice(2, 7);
  return `${e}-${t}-${n}`;
}
class A {
  constructor(t = {}) {
    const { id: n, name: s, className: a } = t;
    this.id = n ?? S("tag"), this.name = s ?? "", this.className = a ?? "";
  }
}
class B {
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
      data: i = {},
      error: r = !1
    } = t || {}, d = typeof n < "u" ? n : i && typeof i.id < "u" ? i.id : "";
    this.id = d, this.type = s, this.action = a, this.error = !!r, this.data = { ...i };
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
    return new B({
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
    data: i = {}
  } = {}) {
    const r = { ...i };
    return a && r.message == null && (r.message = String(a)), new B({
      id: t,
      type: n,
      action: s,
      error: !0,
      data: r
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
class R {
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
function V({ icon: e }) {
  if (!e) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ o("i", { id: e.id, className: e.iconClass, "aria-hidden": "true" });
}
function yt(e = "", t = "") {
  const [n, s] = L(!1), [a, i] = L(!1), [r, d] = L(!1);
  return {
    className: _(() => [e, (n || a || r) && t].filter(Boolean).join(" "), [e, t, n, a, r]),
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
class ae {
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
function vt({ link: e }) {
  if (!e || !(e instanceof ae))
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  const t = P(e.id), { className: n, events: s } = yt(e.className, e.active), a = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel;
  return /* @__PURE__ */ o(
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
      children: /* @__PURE__ */ o("span", { children: e.name })
    }
  );
}
function wt(e = "", t = "") {
  const [n, s] = L(!1), [a, i] = L(!1), [r, d] = L(!1);
  return {
    className: _(() => [e, (n || a || r) && t].filter(Boolean).join(" "), [e, t, n, a, r]),
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
class ie {
  /**
   * @param {LinkIconConfig} linkIcon
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkIconObject requires `href`.");
    if (!t.icon)
      throw new Error("LinkIconObject requires `icon`.");
    const n = t.icon instanceof R ? t.icon : new R(t.icon);
    this.id = t.id ?? S("link-icon"), this.href = t.href, this.icon = n, this.name = t.name, this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function Nt({ linkIcon: e }) {
  if (!e || !(e instanceof ie))
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  const t = P(e.id), { className: n, events: s } = wt(
    e.className,
    e.active
  ), a = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, i = !!e.name;
  return /* @__PURE__ */ o(
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
      children: /* @__PURE__ */ x("span", { className: "d-inline-flex align-items-center", children: [
        /* @__PURE__ */ o(V, { icon: e.icon }),
        i && /* @__PURE__ */ o("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
function bt(e = "", t = "") {
  const [n, s] = L(!1), [a, i] = L(!1), [r, d] = L(!1);
  return {
    className: _(() => [e, (n || a || r) && t].filter(Boolean).join(" "), [e, t, n, a, r]),
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
class Q {
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
function et({ linkLogo: e }) {
  if (!e || !(e instanceof Q))
    throw new Error(
      "AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance)."
    );
  const t = P(e.id), { className: n, events: s } = bt(
    e.className,
    e.active
  ), a = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, i = !!e.name;
  return /* @__PURE__ */ o(
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
      children: /* @__PURE__ */ x("span", { className: "d-inline-flex align-items-center", children: [
        /* @__PURE__ */ o(
          "img",
          {
            src: e.logo,
            alt: e.logoAlt || e.name || "",
            width: e.width,
            height: e.height,
            style: { display: "inline-block" }
          }
        ),
        i && /* @__PURE__ */ o("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
function gt(e = "", t = "") {
  const [n, s] = L(!1), [a, i] = L(!1), [r, d] = L(!1);
  return {
    className: _(() => [e, (n || a || r) && t].filter(Boolean).join(" "), [e, t, n, a, r]),
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
class K {
  /**
   * @param {ButtonConfig} button
   */
  constructor(t = {}) {
    if (!t.name)
      throw new Error("ButtonObject requires `name`.");
    this.id = t.id ?? S("btn"), this.name = t.name, this.className = t.className ?? "btn btn-primary", this.active = t.active ?? "", this.disabled = !!t.disabled, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const Ue = $e(function({ button: t, output: n }, s) {
  if (!t || !(t instanceof K))
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  const a = P(null), i = P(t.id), r = t.disabled, { className: d, events: u } = gt(
    t.className,
    t.active
  );
  Pe(
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
  const l = (h, m, g, N) => (E) => {
    if (m == null || m(E), N && typeof n == "function") {
      const c = B.ok({
        id: t.id,
        type: "button",
        action: g,
        data: {
          // keep payload minimal; we don't duplicate id here
          name: t.name
        }
      });
      n(c);
    }
    h == null || h(E, t);
  }, f = {
    // EMIT
    onClick: l(t.onClick, void 0, "click", !0),
    onMouseDown: l(void 0, u.onMouseDown, "mousedown", !0),
    // NO EMIT – just state + model handler
    onKeyDown: l(
      t.onKeyDown,
      u.onFocus,
      "keydown",
      !1
    ),
    onKeyUp: l(t.onKeyUp, void 0, "keyup", !1),
    onFocus: l(t.onFocus, u.onFocus, "focus", !1),
    onBlur: l(t.onBlur, u.onBlur, "blur", !1),
    onMouseEnter: l(
      t.onMouseEnter,
      u.onMouseEnter,
      "mouseenter",
      !1
    ),
    onMouseLeave: l(
      t.onMouseLeave,
      u.onMouseLeave,
      "mouseleave",
      !1
    ),
    onMouseUp: l(void 0, u.onMouseUp, "mouseup", !1)
  };
  return /* @__PURE__ */ o(
    "button",
    {
      id: i.current,
      ref: a,
      type: "button",
      className: d,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-disabled": r || void 0,
      disabled: r,
      tabIndex: t.tabIndex,
      ...f,
      children: /* @__PURE__ */ o("span", { className: "px-2 align-middle", children: t.name })
    }
  );
});
function xt(e = "", t = "") {
  const [n, s] = L(!1), [a, i] = L(!1), [r, d] = L(!1);
  return {
    className: _(() => [e, (n || a || r) && t].filter(Boolean).join(" "), [e, t, n, a, r]),
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
class q {
  /**
   * @param {ButtonIconConfig} btn
   */
  constructor(t = {}) {
    if (!t.icon)
      throw new Error("ButtonIconObject requires `icon`.");
    this.id = t.id ?? S("btn-icon"), this.name = t.name, this.className = t.className ?? "btn btn-primary", this.active = t.active ?? "", this.disabled = !!t.disabled;
    const n = this.name || "icon button";
    this.title = t.title ?? n, this.ariaLabel = t.ariaLabel ?? n, this.tabIndex = t.tabIndex, this.icon = t.icon instanceof R ? t.icon : new R(t.icon), this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const te = $e(function({ buttonIcon: t, output: n }, s) {
  if (!t || !(t instanceof q))
    throw new Error(
      "AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance)."
    );
  const a = P(null), i = P(t.id), r = t.disabled, { className: d, events: u } = xt(
    t.className,
    t.active
  );
  Pe(
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
  const l = (h, m, g, N) => (E) => {
    if (m == null || m(E), N && typeof n == "function") {
      const c = B.ok({
        id: t.id,
        type: "button-icon",
        action: g,
        data: {
          name: t.name
        }
      });
      n(c);
    }
    h == null || h(E, t);
  }, f = {
    // EMIT
    onClick: l(t.onClick, void 0, "click", !0),
    onKeyDown: l(
      t.onKeyDown,
      u.onFocus,
      "keydown",
      !0
    ),
    // NO EMIT – just state + model handler
    onKeyUp: l(t.onKeyUp, void 0, "keyup", !1),
    onFocus: l(t.onFocus, u.onFocus, "focus", !1),
    onBlur: l(t.onBlur, u.onBlur, "blur", !1),
    onMouseEnter: l(
      t.onMouseEnter,
      u.onMouseEnter,
      "mouseenter",
      !1
    ),
    onMouseLeave: l(
      t.onMouseLeave,
      u.onMouseLeave,
      "mouseleave",
      !1
    ),
    onMouseDown: l(void 0, u.onMouseDown, "mousedown", !1),
    onMouseUp: l(void 0, u.onMouseUp, "mouseup", !1)
  };
  return /* @__PURE__ */ x(
    "button",
    {
      id: i.current,
      ref: a,
      type: "button",
      className: d,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-disabled": r || void 0,
      disabled: r,
      tabIndex: t.tabIndex,
      ...f,
      children: [
        /* @__PURE__ */ o("span", { className: "align-middle", children: /* @__PURE__ */ o(V, { icon: t.icon }) }),
        t.name && /* @__PURE__ */ o("span", { className: "px-2 align-middle", children: t.name })
      ]
    }
  );
});
class we {
  /**
   * @param {ButtonSubmitConfig} buttonSubmit
   */
  constructor(t = {}) {
    if (!t.name)
      throw new Error("ButtonSubmitObject requires `name`.");
    if (!t.icon)
      throw new Error("ButtonSubmitObject requires `icon`.");
    const n = t.icon instanceof R ? t.icon : new R(t.icon);
    this.id = t.id ?? S("btn-submit"), this.name = t.name, this.icon = n, this.className = t.className ?? "", this.disabled = !!t.disabled, this.loading = !!t.loading, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onMouseDown = t.onMouseDown, this.onKeyDown = t.onKeyDown;
  }
}
const Ct = $e(function({ buttonSubmit: t, output: n }, s) {
  if (!t || !(t instanceof we))
    throw new Error(
      "AlloyButtonSubmit requires `buttonSubmit` (ButtonSubmitObject instance)."
    );
  const a = P(null), i = P(t.id), [r, d] = L(!!t.loading), u = P(!1);
  z(() => {
    const c = !!t.loading;
    d(c), c || (u.current = !1);
  }, [t.loading]);
  const l = t.disabled || r;
  Pe(
    s,
    () => ({
      el: a.current,
      model: t,
      focus: () => {
        var c;
        return (c = a.current) == null ? void 0 : c.focus();
      },
      click: () => {
        var c;
        return (c = a.current) == null ? void 0 : c.click();
      }
    }),
    [t]
  );
  const f = () => u.current || l ? !1 : (u.current = !0, t.loading = !0, t.disabled = !0, d(!0), !0), h = (c, p, v) => {
    if (typeof n == "function") {
      const C = new B({
        id: t.id,
        type: "button-submit",
        action: v,
        error: !1,
        data: {
          name: t.name
        }
      });
      n(C);
    }
    p == null || p(c, t);
  }, m = (c) => {
    f() && h(c, t.onClick, "click");
  }, g = (c) => {
    f() && h(c, t.onMouseDown, "mousedown");
  }, N = (c) => {
    const p = c.key;
    (p === "Enter" || p === " ") && f() && h(c, t.onKeyDown, "keydown");
  }, E = r;
  return /* @__PURE__ */ x(
    "button",
    {
      id: i.current,
      ref: a,
      type: "submit",
      className: t.className,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-busy": r || void 0,
      "aria-disabled": l || void 0,
      disabled: l,
      tabIndex: t.tabIndex,
      onClick: m,
      onMouseDown: g,
      onKeyDown: N,
      children: [
        E && /* @__PURE__ */ o("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ o(V, { icon: t.icon }) }),
        /* @__PURE__ */ o("span", { className: E ? "px-2 align-middle" : "align-middle", children: t.name }),
        r ? /* @__PURE__ */ o("span", { className: "ms-2 visually-hidden", "aria-live": "polite", children: "Loading…" }) : null
      ]
    }
  );
});
class W {
  /**
   * @param {InputConfig} config
   */
  constructor(t = {}) {
    const {
      id: n,
      name: s,
      type: a = "text",
      label: i = "",
      value: r,
      layout: d = "text",
      icon: u,
      placeholder: l = "",
      required: f = !1,
      minLength: h,
      maxLength: m,
      min: g,
      max: N,
      pattern: E,
      matchWith: c,
      passwordStrength: p,
      className: v,
      options: C = [],
      validators: b = [],
      ...y
    } = t;
    if (!s)
      throw new Error("InputObject requires `name`.");
    if ((d === "icon" || d === "floating") && !u)
      throw new Error(
        "InputObject with layout='icon' or 'floating' requires `icon`."
      );
    let w;
    typeof r < "u" ? w = r : a === "checkbox" ? w = [] : w = "";
    const k = u instanceof R ? u : u ? new R(u) : void 0;
    this.id = n ?? S("input"), this.name = s, this.type = a, this.label = i, this.value = w, this.layout = d, this.icon = k, this.placeholder = l, this.required = !!f, this.minLength = h, this.maxLength = m, this.min = g, this.max = N, this.pattern = E, this.matchWith = c, this.passwordStrength = p, typeof v == "string" && v.trim() !== "" ? this.className = v.trim() : a === "select" ? this.className = "form-select" : a === "radio" || a === "checkbox" ? this.className = "form-check-input" : this.className = "form-control", this.options = C, this.validators = b, Object.assign(this, y);
  }
}
function de({ input: e, output: t }) {
  const [n, s] = L(e.value), [a, i] = L(!1);
  z(() => {
    s(e.value), i(!1);
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
  const r = (y) => {
    const w = [], k = typeof y == "string" ? y.trim() : y;
    if (e.required) {
      const M = Array.isArray(k) && k.length === 0, j = !Array.isArray(k) && (k === "" || k === !1 || k == null);
      (M || j) && w.push("This field is required.");
    }
    return typeof k == "string" && e.minLength != null && k.length < e.minLength && w.push(`Minimum length is ${e.minLength}`), typeof k == "string" && e.maxLength != null && k.length > e.maxLength && w.push(`Maximum length is ${e.maxLength}`), typeof k == "string" && e.pattern && e.pattern !== "" && (new RegExp(e.pattern).test(k) || w.push("Invalid format.")), e.passwordStrength && typeof k == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(
      k
    ) || w.push("Password is too weak.")), w;
  }, d = r(n), u = a && d.length > 0, l = u && d.length > 0 && /* @__PURE__ */ o("div", { className: "mt-2", "aria-live": "polite", children: d.map((y, w) => /* @__PURE__ */ o(
    "div",
    {
      className: "alert alert-danger py-2 mb-2",
      role: "alert",
      children: y
    },
    w
  )) }), f = (y, w = "change") => {
    const k = r(y), M = k.length > 0;
    if (typeof t == "function") {
      const j = new B({
        id: e.id,
        type: "input",
        action: w,
        error: M,
        data: {
          name: e.name,
          value: y,
          errors: k
        }
      });
      t(j);
    }
  }, h = (y) => {
    const w = y.target.value;
    if (e.type === "checkbox") {
      const k = Array.isArray(n) ? [...n] : [], M = k.indexOf(w);
      M > -1 ? k.splice(M, 1) : k.push(w), s(k), f(k, "change");
    } else e.type, s(w), f(w, "change");
  }, m = () => {
    i(!0), f(n, "blur");
  }, g = {
    id: e.id,
    name: e.name,
    placeholder: e.placeholder,
    onBlur: m,
    "aria-invalid": u || void 0
  }, N = (y) => y + (u ? " is-invalid" : ""), E = () => /* @__PURE__ */ o(
    "textarea",
    {
      ...g,
      value: n,
      onChange: h,
      className: N(e.className)
    }
  ), c = () => /* @__PURE__ */ o(
    "select",
    {
      ...g,
      value: n,
      onChange: h,
      className: N(e.className),
      children: e.options.map((y) => /* @__PURE__ */ o("option", { value: y.value, children: y.label }, y.value))
    }
  ), p = () => /* @__PURE__ */ x("div", { children: [
    e.label && /* @__PURE__ */ o("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((y, w) => /* @__PURE__ */ x("div", { className: "form-check", children: [
      /* @__PURE__ */ o(
        "input",
        {
          type: "radio",
          id: `${e.id}_${w}`,
          className: N(e.className),
          name: e.name,
          value: y.value,
          checked: n === y.value,
          onChange: h,
          onBlur: m,
          "aria-invalid": u || void 0
        }
      ),
      /* @__PURE__ */ o(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${w}`,
          children: y.label
        }
      )
    ] }, w)),
    l
  ] }), v = () => /* @__PURE__ */ x("div", { children: [
    e.label && /* @__PURE__ */ o("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((y, w) => /* @__PURE__ */ x("div", { className: "form-check", children: [
      /* @__PURE__ */ o(
        "input",
        {
          type: "checkbox",
          id: `${e.id}_${w}`,
          className: N(e.className),
          name: e.name,
          value: y.value,
          checked: Array.isArray(n) && n.includes(y.value),
          onChange: h,
          onBlur: m,
          "aria-invalid": u || void 0
        }
      ),
      /* @__PURE__ */ o(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${w}`,
          children: y.label
        }
      )
    ] }, w)),
    l
  ] }), C = () => /* @__PURE__ */ o(
    "input",
    {
      ...g,
      type: e.type,
      value: n,
      onChange: h,
      className: N(e.className)
    }
  ), b = () => {
    switch (e.type) {
      case "textarea":
        return E();
      case "select":
        return c();
      case "radio":
        return p();
      case "checkbox":
        return v();
      default:
        return C();
    }
  };
  return e.layout === "floating" ? /* @__PURE__ */ x("div", { className: "mb-3", children: [
    /* @__PURE__ */ x("div", { className: "form-floating", children: [
      b(),
      /* @__PURE__ */ x("label", { htmlFor: e.id, children: [
        e.icon && /* @__PURE__ */ o(V, { icon: e.icon }),
        e.icon && " ",
        e.label
      ] })
    ] }),
    !(e.type === "radio" || e.type === "checkbox") && l
  ] }) : e.layout === "icon" ? /* @__PURE__ */ x("div", { className: "mb-3", children: [
    e.label && /* @__PURE__ */ o("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    /* @__PURE__ */ x("div", { className: "input-group", children: [
      /* @__PURE__ */ o("span", { className: "input-group-text", children: /* @__PURE__ */ o(V, { icon: e.icon }) }),
      ["radio", "checkbox"].includes(e.type) ? b() : /* @__PURE__ */ o(
        "input",
        {
          ...g,
          type: e.type,
          value: n,
          onChange: h,
          className: N(e.className)
        }
      )
    ] }),
    !(e.type === "radio" || e.type === "checkbox") && l
  ] }) : /* @__PURE__ */ x("div", { className: "mb-3", children: [
    ["text", "textarea", "number", "email", "password", "date"].includes(
      e.type
    ) && e.label && /* @__PURE__ */ o("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    b(),
    !(e.type === "radio" || e.type === "checkbox") && l
  ] });
}
class Y {
  /**
   * @param {LinkBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? S("linkBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyLink", this.linkClass = t.linkClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof A ? this.title = t.title : t.title ? this.title = new A(t.title) : this.title = new A({});
    const n = Array.isArray(t.links) ? t.links : [];
    this.type === "AlloyLinkIcon" ? this.links = n.map(
      (s) => s instanceof ie ? s : new ie(s)
    ) : this.type === "AlloyLinkLogo" ? this.links = n.map(
      (s) => s instanceof Q ? s : new Q(s)
    ) : this.links = n.map(
      (s) => s instanceof ae ? s : new ae(s)
    );
  }
}
function Et(e, t, n, s) {
  const a = n ? t : "";
  return e instanceof ae ? new ae({
    id: e.id,
    name: e.name,
    href: e.href,
    className: e.className,
    active: a,
    target: e.target,
    rel: e.rel,
    onClick: s,
    title: e.title
  }) : e instanceof ie ? new ie({
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
  }) : e instanceof Q ? new Q({
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
function xe({ linkBar: e }) {
  if (!e || !(e instanceof Y))
    throw new Error("AlloyLinkBar requires `linkBar` (LinkBarObject instance).");
  const t = P(e.id), [n, s] = L("");
  z(() => {
    s("");
  }, [e]);
  const a = () => e.title && e.title.name ? /* @__PURE__ */ o(
    "div",
    {
      id: e.title.id,
      className: e.title.className,
      children: e.title.name
    }
  ) : null;
  function i(d) {
    const u = d.onClick;
    return (l) => {
      const f = d.id || `${d.href || ""}-${d.name || ""}`;
      s(f), u == null || u(l);
    };
  }
  function r() {
    return /* @__PURE__ */ o("ul", { id: t.current, className: e.className, children: e.links.map((d, u) => {
      const l = ((d == null ? void 0 : d.id) ?? "") === n, f = Et(
        d,
        e.selected,
        l,
        i(d)
      );
      switch (e.type) {
        case "AlloyLink":
          if (!(f instanceof ae))
            throw new Error(
              "AlloyLinkBar (type='AlloyLink') expects each link to be a LinkObject instance."
            );
          return /* @__PURE__ */ o(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ o(vt, { link: f })
            },
            ((d == null ? void 0 : d.id) ?? u) + "-li"
          );
        case "AlloyLinkIcon":
          if (!(f instanceof ie))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkIcon') expects each link to be a LinkIconObject instance."
            );
          return /* @__PURE__ */ o(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ o(Nt, { linkIcon: f })
            },
            ((d == null ? void 0 : d.id) ?? u) + "-li"
          );
        case "AlloyLinkLogo":
          if (!(f instanceof Q))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkLogo') expects each link to be a LinkLogoObject instance."
            );
          return /* @__PURE__ */ o(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ o(et, { linkLogo: f })
            },
            ((d == null ? void 0 : d.id) ?? u) + "-li"
          );
        default:
          throw new Error(
            `Unsupported linkBar.type "${e.type}".`
          );
      }
    }) });
  }
  return /* @__PURE__ */ x("nav", { "data-type": e.type, children: [
    /* @__PURE__ */ o(a, {}),
    r()
  ] });
}
class Z {
  /**
   * @param {ButtonBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? S("buttonBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyButton", this.buttonClass = t.buttonClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof A ? this.title = t.title : t.title ? this.title = new A(t.title) : this.title = new A({});
    const n = Array.isArray(t.buttons) ? t.buttons : [];
    this.type === "AlloyButtonIcon" ? this.buttons = n.map(
      (s) => s instanceof q ? s : new q(s)
    ) : this.buttons = n.map(
      (s) => s instanceof K ? s : new K(s)
    );
  }
}
function ze(e, t, n, s, a) {
  const i = n ? t : "";
  function r(d) {
    var f, h;
    if (!d)
      return;
    if ((d.action || ((f = d == null ? void 0 : d.data) == null ? void 0 : f.event) || "") === "click") {
      const m = ((h = d == null ? void 0 : d.data) == null ? void 0 : h.id) ?? "";
      m && s(m);
    }
    a == null || a(d);
  }
  return e instanceof K ? { model: new K({
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
  }), onAnyEvent: r } : e instanceof q ? { model: new q({
    id: e.id,
    name: e.name,
    icon: e.icon,
    // already an IconObject (normalized in ButtonIconObject)
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
  }), onAnyEvent: r } : { model: e, onAnyEvent: r };
}
function Ce({ buttonBar: e, output: t }) {
  if (!e || !(e instanceof Z))
    throw new Error(
      "AlloyButtonBar requires `buttonBar` (ButtonBarObject instance)."
    );
  const n = P(e.id), [s, a] = L("");
  z(() => {
    a("");
  }, [e]);
  const i = () => e.title && e.title.name ? /* @__PURE__ */ o("div", { id: e.title.id, className: e.title.className, children: e.title.name }) : null;
  function r() {
    return /* @__PURE__ */ o("ul", { id: n.current, className: e.className, children: e.buttons.map((l, f) => {
      if (!(l instanceof K))
        throw new Error(
          "AlloyButtonBar (type='AlloyButton') expects ButtonObject items."
        );
      const h = ((l == null ? void 0 : l.id) ?? "") === s, { model: m, onAnyEvent: g } = ze(
        l,
        e.selected,
        h,
        a,
        t
      );
      return /* @__PURE__ */ o(
        "li",
        {
          className: e.buttonClass,
          children: /* @__PURE__ */ o(Ue, { button: m, output: g })
        },
        ((l == null ? void 0 : l.id) ?? f) + "-li"
      );
    }) });
  }
  function d() {
    return /* @__PURE__ */ o("ul", { id: n.current, className: e.className, children: e.buttons.map((l, f) => {
      if (!(l instanceof q))
        throw new Error(
          "AlloyButtonBar (type='AlloyButtonIcon') expects ButtonIconObject items."
        );
      const h = ((l == null ? void 0 : l.id) ?? "") === s, { model: m, onAnyEvent: g } = ze(
        l,
        e.selected,
        h,
        a,
        t
      );
      return /* @__PURE__ */ o(
        "li",
        {
          className: e.buttonClass,
          children: /* @__PURE__ */ o(te, { buttonIcon: m, output: g })
        },
        ((l == null ? void 0 : l.id) ?? f) + "-li"
      );
    }) });
  }
  function u() {
    switch (e.type) {
      case "AlloyButtonIcon":
        return d();
      case "AlloyButton":
      default:
        return r();
    }
  }
  return /* @__PURE__ */ x("nav", { "data-type": e.type, children: [
    /* @__PURE__ */ o(i, {}),
    u()
  ] });
}
class kt {
  /**
   * @param {NavBarConfig} nav = {}
   */
  constructor(t = {}) {
    if (this.id = t.id ?? S("navbar"), this.className = t.className ?? "navbar navbar-expand-lg navbar-light bg-light", t.logo instanceof Q)
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
      this.logo = new Q(n);
    }
    if (t.linkBar instanceof Y)
      this.linkBar = t.linkBar;
    else {
      const n = t.linkBar ?? {};
      this.linkBar = new Y({
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
function In({ navBar: e }) {
  if (!e || !(e instanceof kt))
    throw new Error("AlloyNavBar requires `navBar` (NavBarObject instance).");
  const t = P(e.id), n = `${t.current}-collapse`;
  return /* @__PURE__ */ o("nav", { id: t.current, className: e.className, children: /* @__PURE__ */ x("div", { className: "container-fluid", children: [
    /* @__PURE__ */ o(et, { linkLogo: e.logo }),
    /* @__PURE__ */ o(
      "button",
      {
        className: "navbar-toggler",
        type: "button",
        "data-bs-toggle": "collapse",
        "data-bs-target": `#${n}`,
        "aria-controls": n,
        "aria-expanded": "false",
        "aria-label": "Toggle navigation",
        children: /* @__PURE__ */ o("span", { className: "navbar-toggler-icon" })
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        className: "position-relative navbar-collapse collapse justify-content-end",
        id: n,
        children: /* @__PURE__ */ o(xe, { linkBar: e.linkBar })
      }
    )
  ] }) });
}
function At(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
class Ot {
  /**
   * @param {TableConfig} table
   */
  constructor(t = {}) {
    this.id = t.id ?? S("table"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [];
    const n = { iconClass: "fa-solid fa-user" }, s = { iconClass: "fa-solid fa-arrow-down" }, a = t.icon instanceof R ? t.icon : new R(t.icon || n), i = t.sort instanceof R ? t.sort : new R(t.sort || s);
    this.icon = a, this.sort = i;
  }
}
function jt(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function Hn({ table: e, output: t }) {
  if (!e || !(e instanceof Ot))
    throw new Error("AlloyTable requires `table` (TableObject instance).");
  const n = P(e.id), [s, a] = L({ col: "", dir: "asc" }), i = _(
    () => jt(e.rows),
    [e.rows]
  ), r = (u) => {
    if (!u) return;
    const l = s.col === u && s.dir === "asc" ? "desc" : "asc";
    a({ col: u, dir: l }), t == null || t({
      type: "column",
      name: u,
      dir: l
    });
  }, d = (u) => {
    t == null || t({
      type: "row",
      id: u
    });
  };
  return /* @__PURE__ */ x("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ o("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ o("thead", { children: /* @__PURE__ */ x("tr", { children: [
      /* @__PURE__ */ o("th", { scope: "col", children: "Type" }),
      i.map((u) => {
        const l = s.col === u, f = l && s.dir === "desc";
        return /* @__PURE__ */ o("th", { scope: "col", children: /* @__PURE__ */ x(
          "span",
          {
            onClick: () => r(u),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              At(u),
              l && /* @__PURE__ */ o(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: f ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: f ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ o(V, { icon: e.sort })
                }
              )
            ]
          }
        ) }, u);
      })
    ] }) }),
    /* @__PURE__ */ o("tbody", { children: e.rows.length > 0 ? e.rows.map((u, l) => /* @__PURE__ */ x(
      "tr",
      {
        onClick: () => d(u == null ? void 0 : u.id),
        style: { cursor: "pointer" },
        children: [
          /* @__PURE__ */ o("td", { children: /* @__PURE__ */ o(V, { icon: e.icon }) }),
          i.map((f) => /* @__PURE__ */ o("td", { children: /* @__PURE__ */ o("span", { children: u == null ? void 0 : u[f] }) }, `${(u == null ? void 0 : u.id) ?? l}-${f}`))
        ]
      },
      (u == null ? void 0 : u.id) ?? l
    )) : /* @__PURE__ */ o("tr", { children: /* @__PURE__ */ o(
      "td",
      {
        colSpan: Math.max(1, i.length) + 1,
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
function Be() {
  return Be = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
    }
    return e;
  }, Be.apply(this, arguments);
}
var Je;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(Je || (Je = {}));
function $(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function ue(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function Le(e) {
  let {
    pathname: t = "/",
    search: n = "",
    hash: s = ""
  } = e;
  return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n), s && s !== "#" && (t += s.charAt(0) === "#" ? s : "#" + s), t;
}
function tt(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
    let s = e.indexOf("?");
    s >= 0 && (t.search = e.substr(s), e = e.substr(0, s)), e && (t.pathname = e);
  }
  return t;
}
var Ie;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(Ie || (Ie = {}));
function He(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [n, s] = Bt(e.path, e.caseSensitive, e.end), a = t.match(n);
  if (!a) return null;
  let i = a[0], r = i.replace(/(.)\/+$/, "$1"), d = a.slice(1);
  return {
    params: s.reduce((l, f, h) => {
      let {
        paramName: m,
        isOptional: g
      } = f;
      if (m === "*") {
        let E = d[h] || "";
        r = i.slice(0, i.length - E.length).replace(/(.)\/+$/, "$1");
      }
      const N = d[h];
      return g && !N ? l[m] = void 0 : l[m] = (N || "").replace(/%2F/g, "/"), l;
    }, {}),
    pathname: i,
    pathnameBase: r,
    pattern: e
  };
}
function Bt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !0), ue(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let s = [], a = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (r, d, u) => (s.push({
    paramName: d,
    isOptional: u != null
  }), u ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (s.push({
    paramName: "*"
  }), a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? a += "\\/*$" : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"), [new RegExp(a, t ? void 0 : "i"), s];
}
function oe(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length, s = e.charAt(n);
  return s && s !== "/" ? null : e.slice(n) || "/";
}
function Lt(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: s = "",
    hash: a = ""
  } = typeof e == "string" ? tt(e) : e;
  return {
    pathname: n ? n.startsWith("/") ? n : St(n, t) : t,
    search: Dt(s),
    hash: Mt(a)
  };
}
function St(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((a) => {
    a === ".." ? n.length > 1 && n.pop() : a !== "." && n.push(a);
  }), n.length > 1 ? n.join("/") : "/";
}
function Oe(e, t, n, s) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(s) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Rt(e) {
  return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0);
}
function nt(e, t) {
  let n = Rt(e);
  return t ? n.map((s, a) => a === n.length - 1 ? s.pathname : s.pathnameBase) : n.map((s) => s.pathnameBase);
}
function st(e, t, n, s) {
  s === void 0 && (s = !1);
  let a;
  typeof e == "string" ? a = tt(e) : (a = Be({}, e), $(!a.pathname || !a.pathname.includes("?"), Oe("?", "pathname", "search", a)), $(!a.pathname || !a.pathname.includes("#"), Oe("#", "pathname", "hash", a)), $(!a.search || !a.search.includes("#"), Oe("#", "search", "hash", a)));
  let i = e === "" || a.pathname === "", r = i ? "/" : a.pathname, d;
  if (r == null)
    d = n;
  else {
    let h = t.length - 1;
    if (!s && r.startsWith("..")) {
      let m = r.split("/");
      for (; m[0] === ".."; )
        m.shift(), h -= 1;
      a.pathname = m.join("/");
    }
    d = h >= 0 ? t[h] : "/";
  }
  let u = Lt(a, d), l = r && r !== "/" && r.endsWith("/"), f = (i || r === ".") && n.endsWith("/");
  return !u.pathname.endsWith("/") && (l || f) && (u.pathname += "/"), u;
}
const qe = (e) => e.join("/").replace(/\/\/+/g, "/"), Dt = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Mt = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, at = ["post", "put", "patch", "delete"];
new Set(at);
const Ft = ["get", ...at];
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
function Se() {
  return Se = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
    }
    return e;
  }, Se.apply(this, arguments);
}
const Ee = /* @__PURE__ */ O.createContext(null);
process.env.NODE_ENV !== "production" && (Ee.displayName = "DataRouter");
const it = /* @__PURE__ */ O.createContext(null);
process.env.NODE_ENV !== "production" && (it.displayName = "DataRouterState");
const $t = /* @__PURE__ */ O.createContext(null);
process.env.NODE_ENV !== "production" && ($t.displayName = "Await");
const X = /* @__PURE__ */ O.createContext(null);
process.env.NODE_ENV !== "production" && (X.displayName = "Navigation");
const Te = /* @__PURE__ */ O.createContext(null);
process.env.NODE_ENV !== "production" && (Te.displayName = "Location");
const le = /* @__PURE__ */ O.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (le.displayName = "Route");
const Pt = /* @__PURE__ */ O.createContext(null);
process.env.NODE_ENV !== "production" && (Pt.displayName = "RouteError");
function Ut(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t;
  Ve() || (process.env.NODE_ENV !== "production" ? $(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : $(!1));
  let {
    basename: s,
    navigator: a
  } = O.useContext(X), {
    hash: i,
    pathname: r,
    search: d
  } = fe(e, {
    relative: n
  }), u = r;
  return s !== "/" && (u = r === "/" ? s : qe([s, r])), a.createHref({
    pathname: u,
    search: d,
    hash: i
  });
}
function Ve() {
  return O.useContext(Te) != null;
}
function he() {
  return Ve() || (process.env.NODE_ENV !== "production" ? $(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : $(!1)), O.useContext(Te).location;
}
const ot = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function rt(e) {
  O.useContext(X).static || O.useLayoutEffect(e);
}
function qt() {
  let {
    isDataRoute: e
  } = O.useContext(le);
  return e ? Wt() : Tt();
}
function Tt() {
  Ve() || (process.env.NODE_ENV !== "production" ? $(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : $(!1));
  let e = O.useContext(Ee), {
    basename: t,
    future: n,
    navigator: s
  } = O.useContext(X), {
    matches: a
  } = O.useContext(le), {
    pathname: i
  } = he(), r = JSON.stringify(nt(a, n.v7_relativeSplatPath)), d = O.useRef(!1);
  return rt(() => {
    d.current = !0;
  }), O.useCallback(function(l, f) {
    if (f === void 0 && (f = {}), process.env.NODE_ENV !== "production" && ue(d.current, ot), !d.current) return;
    if (typeof l == "number") {
      s.go(l);
      return;
    }
    let h = st(l, JSON.parse(r), i, f.relative === "path");
    e == null && t !== "/" && (h.pathname = h.pathname === "/" ? t : qe([t, h.pathname])), (f.replace ? s.replace : s.push)(h, f.state, f);
  }, [t, s, r, i, e]);
}
function fe(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    future: s
  } = O.useContext(X), {
    matches: a
  } = O.useContext(le), {
    pathname: i
  } = he(), r = JSON.stringify(nt(a, s.v7_relativeSplatPath));
  return O.useMemo(() => st(e, JSON.parse(r), i, n === "path"), [e, r, i, n]);
}
var lt = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(lt || {}), _e = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(_e || {});
function ct(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Vt(e) {
  let t = O.useContext(Ee);
  return t || (process.env.NODE_ENV !== "production" ? $(!1, ct(e)) : $(!1)), t;
}
function _t(e) {
  let t = O.useContext(le);
  return t || (process.env.NODE_ENV !== "production" ? $(!1, ct(e)) : $(!1)), t;
}
function dt(e) {
  let t = _t(e), n = t.matches[t.matches.length - 1];
  return n.route.id || (process.env.NODE_ENV !== "production" ? $(!1, e + ' can only be used on routes that contain a unique "id"') : $(!1)), n.route.id;
}
function Kt() {
  return dt(_e.UseRouteId);
}
function Wt() {
  let {
    router: e
  } = Vt(lt.UseNavigateStable), t = dt(_e.UseNavigateStable), n = O.useRef(!1);
  return rt(() => {
    n.current = !0;
  }), O.useCallback(function(a, i) {
    i === void 0 && (i = {}), process.env.NODE_ENV !== "production" && ue(n.current, ot), n.current && (typeof a == "number" ? e.navigate(a) : e.navigate(a, Se({
      fromRouteId: t
    }, i)));
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
function re() {
  return re = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
    }
    return e;
  }, re.apply(this, arguments);
}
function Ke(e, t) {
  if (e == null) return {};
  var n = {}, s = Object.keys(e), a, i;
  for (i = 0; i < s.length; i++)
    a = s[i], !(t.indexOf(a) >= 0) && (n[a] = e[a]);
  return n;
}
const ye = "get", ve = "application/x-www-form-urlencoded";
function ke(e) {
  return e != null && typeof e.tagName == "string";
}
function zt(e) {
  return ke(e) && e.tagName.toLowerCase() === "button";
}
function Jt(e) {
  return ke(e) && e.tagName.toLowerCase() === "form";
}
function It(e) {
  return ke(e) && e.tagName.toLowerCase() === "input";
}
function Ht(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Gt(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !Ht(e);
}
let pe = null;
function Yt() {
  if (pe === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), pe = !1;
    } catch {
      pe = !0;
    }
  return pe;
}
const Zt = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function je(e) {
  return e != null && !Zt.has(e) ? (process.env.NODE_ENV !== "production" && ue(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + ve + '"')), null) : e;
}
function Xt(e, t) {
  let n, s, a, i, r;
  if (Jt(e)) {
    let d = e.getAttribute("action");
    s = d ? oe(d, t) : null, n = e.getAttribute("method") || ye, a = je(e.getAttribute("enctype")) || ve, i = new FormData(e);
  } else if (zt(e) || It(e) && (e.type === "submit" || e.type === "image")) {
    let d = e.form;
    if (d == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let u = e.getAttribute("formaction") || d.getAttribute("action");
    if (s = u ? oe(u, t) : null, n = e.getAttribute("formmethod") || d.getAttribute("method") || ye, a = je(e.getAttribute("formenctype")) || je(d.getAttribute("enctype")) || ve, i = new FormData(d, e), !Yt()) {
      let {
        name: l,
        type: f,
        value: h
      } = e;
      if (f === "image") {
        let m = l ? l + "." : "";
        i.append(m + "x", "0"), i.append(m + "y", "0");
      } else l && i.append(l, h);
    }
  } else {
    if (ke(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    n = ye, s = null, a = ve, r = e;
  }
  return i && a === "text/plain" && (r = i, i = void 0), {
    action: s,
    method: n.toLowerCase(),
    encType: a,
    formData: i,
    body: r
  };
}
const Qt = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], en = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], tn = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], nn = "6";
try {
  window.__reactRouterVersion = nn;
} catch {
}
const ut = /* @__PURE__ */ O.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (ut.displayName = "ViewTransition");
const sn = /* @__PURE__ */ O.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (sn.displayName = "Fetchers");
process.env.NODE_ENV;
const an = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", on = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, H = /* @__PURE__ */ O.forwardRef(function(t, n) {
  let {
    onClick: s,
    relative: a,
    reloadDocument: i,
    replace: r,
    state: d,
    target: u,
    to: l,
    preventScrollReset: f,
    viewTransition: h
  } = t, m = Ke(t, Qt), {
    basename: g
  } = O.useContext(X), N, E = !1;
  if (typeof l == "string" && on.test(l) && (N = l, an))
    try {
      let C = new URL(window.location.href), b = l.startsWith("//") ? new URL(C.protocol + l) : new URL(l), y = oe(b.pathname, g);
      b.origin === C.origin && y != null ? l = y + b.search + b.hash : E = !0;
    } catch {
      process.env.NODE_ENV !== "production" && ue(!1, '<Link to="' + l + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let c = Ut(l, {
    relative: a
  }), p = dn(l, {
    replace: r,
    state: d,
    target: u,
    preventScrollReset: f,
    relative: a,
    viewTransition: h
  });
  function v(C) {
    s && s(C), C.defaultPrevented || p(C);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ O.createElement("a", re({}, m, {
      href: N || c,
      onClick: E || i ? s : v,
      ref: n,
      target: u
    }))
  );
});
process.env.NODE_ENV !== "production" && (H.displayName = "Link");
const rn = /* @__PURE__ */ O.forwardRef(function(t, n) {
  let {
    "aria-current": s = "page",
    caseSensitive: a = !1,
    className: i = "",
    end: r = !1,
    style: d,
    to: u,
    viewTransition: l,
    children: f
  } = t, h = Ke(t, en), m = fe(u, {
    relative: h.relative
  }), g = he(), N = O.useContext(it), {
    navigator: E,
    basename: c
  } = O.useContext(X), p = N != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  yn(m) && l === !0, v = E.encodeLocation ? E.encodeLocation(m).pathname : m.pathname, C = g.pathname, b = N && N.navigation && N.navigation.location ? N.navigation.location.pathname : null;
  a || (C = C.toLowerCase(), b = b ? b.toLowerCase() : null, v = v.toLowerCase()), b && c && (b = oe(b, c) || b);
  const y = v !== "/" && v.endsWith("/") ? v.length - 1 : v.length;
  let w = C === v || !r && C.startsWith(v) && C.charAt(y) === "/", k = b != null && (b === v || !r && b.startsWith(v) && b.charAt(v.length) === "/"), M = {
    isActive: w,
    isPending: k,
    isTransitioning: p
  }, j = w ? s : void 0, F;
  typeof i == "function" ? F = i(M) : F = [i, w ? "active" : null, k ? "pending" : null, p ? "transitioning" : null].filter(Boolean).join(" ");
  let D = typeof d == "function" ? d(M) : d;
  return /* @__PURE__ */ O.createElement(H, re({}, h, {
    "aria-current": j,
    className: F,
    ref: n,
    style: D,
    to: u,
    viewTransition: l
  }), typeof f == "function" ? f(M) : f);
});
process.env.NODE_ENV !== "production" && (rn.displayName = "NavLink");
const ln = /* @__PURE__ */ O.forwardRef((e, t) => {
  let {
    fetcherKey: n,
    navigate: s,
    reloadDocument: a,
    replace: i,
    state: r,
    method: d = ye,
    action: u,
    onSubmit: l,
    relative: f,
    preventScrollReset: h,
    viewTransition: m
  } = e, g = Ke(e, tn), N = mn(), E = pn(u, {
    relative: f
  }), c = d.toLowerCase() === "get" ? "get" : "post", p = (v) => {
    if (l && l(v), v.defaultPrevented) return;
    v.preventDefault();
    let C = v.nativeEvent.submitter, b = (C == null ? void 0 : C.getAttribute("formmethod")) || d;
    N(C || v.currentTarget, {
      fetcherKey: n,
      method: b,
      navigate: s,
      replace: i,
      state: r,
      relative: f,
      preventScrollReset: h,
      viewTransition: m
    });
  };
  return /* @__PURE__ */ O.createElement("form", re({
    ref: t,
    method: c,
    action: E,
    onSubmit: a ? l : p
  }, g));
});
process.env.NODE_ENV !== "production" && (ln.displayName = "Form");
process.env.NODE_ENV;
var Ne;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(Ne || (Ne = {}));
var Ge;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Ge || (Ge = {}));
function cn(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function ht(e) {
  let t = O.useContext(Ee);
  return t || (process.env.NODE_ENV !== "production" ? $(!1, cn(e)) : $(!1)), t;
}
function dn(e, t) {
  let {
    target: n,
    replace: s,
    state: a,
    preventScrollReset: i,
    relative: r,
    viewTransition: d
  } = t === void 0 ? {} : t, u = qt(), l = he(), f = fe(e, {
    relative: r
  });
  return O.useCallback((h) => {
    if (Gt(h, n)) {
      h.preventDefault();
      let m = s !== void 0 ? s : Le(l) === Le(f);
      u(e, {
        replace: m,
        state: a,
        preventScrollReset: i,
        relative: r,
        viewTransition: d
      });
    }
  }, [l, u, f, s, a, n, e, i, r, d]);
}
function un() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let hn = 0, fn = () => "__" + String(++hn) + "__";
function mn() {
  let {
    router: e
  } = ht(Ne.UseSubmit), {
    basename: t
  } = O.useContext(X), n = Kt();
  return O.useCallback(function(s, a) {
    a === void 0 && (a = {}), un();
    let {
      action: i,
      method: r,
      encType: d,
      formData: u,
      body: l
    } = Xt(s, t);
    if (a.navigate === !1) {
      let f = a.fetcherKey || fn();
      e.fetch(f, n, a.action || i, {
        preventScrollReset: a.preventScrollReset,
        formData: u,
        body: l,
        formMethod: a.method || r,
        formEncType: a.encType || d,
        flushSync: a.flushSync
      });
    } else
      e.navigate(a.action || i, {
        preventScrollReset: a.preventScrollReset,
        formData: u,
        body: l,
        formMethod: a.method || r,
        formEncType: a.encType || d,
        replace: a.replace,
        state: a.state,
        fromRouteId: n,
        flushSync: a.flushSync,
        viewTransition: a.viewTransition
      });
  }, [e, t, n]);
}
function pn(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    basename: s
  } = O.useContext(X), a = O.useContext(le);
  a || (process.env.NODE_ENV !== "production" ? $(!1, "useFormAction must be used inside a RouteContext") : $(!1));
  let [i] = a.matches.slice(-1), r = re({}, fe(e || ".", {
    relative: n
  })), d = he();
  if (e == null) {
    r.search = d.search;
    let u = new URLSearchParams(r.search), l = u.getAll("index");
    if (l.some((h) => h === "")) {
      u.delete("index"), l.filter((m) => m).forEach((m) => u.append("index", m));
      let h = u.toString();
      r.search = h ? "?" + h : "";
    }
  }
  return (!e || e === ".") && i.route.index && (r.search = r.search ? r.search.replace(/^\?/, "?index&") : "?index"), s !== "/" && (r.pathname = r.pathname === "/" ? s : qe([s, r.pathname])), Le(r);
}
function yn(e, t) {
  t === void 0 && (t = {});
  let n = O.useContext(ut);
  n == null && (process.env.NODE_ENV !== "production" ? $(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : $(!1));
  let {
    basename: s
  } = ht(Ne.useViewTransitionState), a = fe(e, {
    relative: t.relative
  });
  if (!n.isTransitioning)
    return !1;
  let i = oe(n.currentLocation.pathname, s) || n.currentLocation.pathname, r = oe(n.nextLocation.pathname, s) || n.nextLocation.pathname;
  return He(a.pathname, r) != null || He(a.pathname, i) != null;
}
function vn(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
class wn {
  /**
   * @param {TableLinkConfig} tableLink
   */
  constructor(t = {}) {
    if (!t.link)
      throw new Error("TableLinkObject requires `link` (base route).");
    this.id = t.id ?? S("table-link"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = t.link;
    const n = { iconClass: "fa-solid fa-user" }, s = { iconClass: "fa-solid fa-arrow-down" };
    this.icon = t.icon instanceof R ? t.icon : new R(t.icon || n), this.sort = t.sort instanceof R ? t.sort : new R(t.sort || s);
  }
}
function Nn(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function Gn({ tableLink: e, output: t }) {
  if (!e || !(e instanceof wn))
    throw new Error(
      "AlloyTableLink requires `tableLink` (TableLinkObject instance)."
    );
  const n = P(e.id), [s, a] = L({ col: "", dir: "asc" }), i = _(
    () => Nn(e.rows),
    [e.rows]
  ), r = (d) => {
    if (!d) return;
    const u = s.col === d && s.dir === "asc" ? "desc" : "asc";
    a({ col: d, dir: u }), t == null || t({
      type: "column",
      name: d,
      dir: u
    });
  };
  return /* @__PURE__ */ x("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ o("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ o("thead", { children: /* @__PURE__ */ x("tr", { children: [
      /* @__PURE__ */ o("th", { scope: "col", children: "Type" }),
      i.map((d) => {
        const u = s.col === d, l = u && s.dir === "desc";
        return /* @__PURE__ */ o("th", { scope: "col", children: /* @__PURE__ */ x(
          "span",
          {
            onClick: () => r(d),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              vn(d),
              u && /* @__PURE__ */ o(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: l ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: l ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ o(V, { icon: e.sort })
                }
              )
            ]
          }
        ) }, d);
      })
    ] }) }),
    /* @__PURE__ */ o("tbody", { children: e.rows.length > 0 ? e.rows.map((d, u) => {
      const l = (d == null ? void 0 : d.id) ?? u, h = `${e.link.endsWith("/") ? e.link.slice(0, -1) : e.link}/${l}`;
      return /* @__PURE__ */ x("tr", { children: [
        /* @__PURE__ */ o("td", { children: /* @__PURE__ */ o(V, { icon: e.icon }) }),
        i.map((m) => /* @__PURE__ */ o("td", { children: /* @__PURE__ */ o(
          H,
          {
            to: h,
            className: "text-decoration-none",
            onClick: () => t == null ? void 0 : t({
              type: "navigate",
              to: h,
              id: l
            }),
            children: /* @__PURE__ */ o("span", { children: d == null ? void 0 : d[m] })
          }
        ) }, `${l}-${m}`))
      ] }, l);
    }) : /* @__PURE__ */ o("tr", { children: /* @__PURE__ */ o(
      "td",
      {
        colSpan: Math.max(1, i.length) + 1,
        className: "text-center text-secondary",
        children: "No rows"
      }
    ) }) })
  ] });
}
function bn(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
function gn(e) {
  if (!Array.isArray(e) || e.length === 0) return [];
  const t = e[0] ?? {};
  return Object.keys(t).filter((n) => n !== "id");
}
function xn(e) {
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
class ce {
  /**
   * @param {Object} cfg
   */
  constructor(t = {}) {
    this.id = t.id ?? S("table-action"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = typeof t.link == "string" ? t.link : "";
    const n = new R({ iconClass: "fa-solid fa-user" }), s = new R({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = t.icon instanceof R ? t.icon : new R(t.icon || n), this.sort = t.sort instanceof R ? t.sort : new R(t.sort || s), this.actions = t.actions ? t.actions instanceof Z ? t.actions : new Z(t.actions) : void 0;
  }
}
function ft({ tableAction: e, output: t }) {
  if (!e || !(e instanceof ce))
    throw new Error(
      "AlloyTableAction requires `tableAction` (TableActionObject instance)."
    );
  const n = P(e.id), s = _(
    () => gn(e.rows),
    [e.rows]
  ), [a, i] = L({ col: "", dir: "asc" });
  function r(l) {
    const f = a.col === l && a.dir === "asc" ? "desc" : "asc";
    i({ col: l, dir: f });
    const h = new B({
      id: n.current,
      type: "column",
      action: "Sort",
      error: !1,
      data: {
        name: l,
        dir: f
      }
    });
    t == null || t(h);
  }
  function d(l) {
    return (f, h) => {
      const m = xn(f), g = new B({
        id: n.current,
        type: "table",
        action: m,
        error: !1,
        data: l
      });
      t == null || t(g);
    };
  }
  const u = !!e.actions;
  return /* @__PURE__ */ x("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ o("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ o("thead", { children: /* @__PURE__ */ x("tr", { children: [
      /* @__PURE__ */ o("th", { scope: "col", children: "Type" }),
      s.map((l) => {
        const f = a.col === l, h = f && a.dir === "desc";
        return /* @__PURE__ */ o("th", { scope: "col", children: /* @__PURE__ */ x(
          "span",
          {
            onClick: () => r(l),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              bn(l),
              f && /* @__PURE__ */ o(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: h ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: h ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ o(V, { icon: e.sort })
                }
              )
            ]
          }
        ) }, `h-${l}`);
      }),
      u && /* @__PURE__ */ o("th", { scope: "col", className: "text-end", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ o("tbody", { children: e.rows.length > 0 ? e.rows.map((l, f) => {
      const h = (l == null ? void 0 : l.id) ?? f, m = e.actions;
      return /* @__PURE__ */ x("tr", { children: [
        /* @__PURE__ */ o("td", { children: /* @__PURE__ */ o(V, { icon: e.icon }) }),
        s.map((g) => {
          const N = e.link || "", E = N.endsWith("/") ? N.slice(0, -1) : N, c = E ? `${E}/${h}` : "";
          return /* @__PURE__ */ o("td", { children: E ? /* @__PURE__ */ o(
            H,
            {
              to: c,
              onClick: () => {
                const p = new B({
                  id: n.current,
                  type: "row",
                  action: "navigate",
                  error: !1,
                  data: {
                    to: c,
                    ...l
                  }
                });
                t == null || t(p);
              },
              className: "text-decoration-none",
              children: /* @__PURE__ */ o("span", { children: l == null ? void 0 : l[g] })
            }
          ) : /* @__PURE__ */ o("span", { children: l == null ? void 0 : l[g] }) }, `${h}-${g}`);
        }),
        u && /* @__PURE__ */ o("td", { className: "text-end", children: /* @__PURE__ */ o(
          Ce,
          {
            buttonBar: m,
            output: d(l)
          }
        ) })
      ] }, h);
    }) : /* @__PURE__ */ o("tr", { children: /* @__PURE__ */ o(
      "td",
      {
        colSpan: (
          // icon col + data cols (+ actions col if present)
          1 + s.length + (u ? 1 : 0)
        ),
        className: "text-center text-secondary",
        children: "No rows"
      }
    ) }) })
  ] });
}
class be {
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
    if (this.id = t.id ?? S("card"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "", t.header instanceof A)
      this.header = t.header;
    else if (t.header) {
      const s = new A(t.header);
      s.className = s.className || "card-header", this.header = s;
    } else
      this.header = void 0;
    if (t.body instanceof A)
      this.body = t.body;
    else {
      const s = new A(t.body);
      s.className = s.className || "card-body", this.body = s;
    }
    if (t.footer instanceof A)
      this.footer = t.footer;
    else if (t.footer) {
      const s = new A(t.footer);
      s.className = s.className || "card-footer", this.footer = s;
    } else
      this.footer = void 0;
    const n = Array.isArray(t.fields) ? t.fields : [];
    this.fields = n.map((s) => s instanceof A ? s : new A(s || {}));
  }
}
function Cn({ card: e }) {
  var i;
  if (!e || !(e instanceof be))
    throw new Error("AlloyCard requires `card` (CardObject instance).");
  const t = e.header ? /* @__PURE__ */ o(
    "div",
    {
      id: e.header.id,
      className: e.header.className || "card-header",
      "aria-label": e.header.name,
      children: e.header.name
    }
  ) : null, n = /* @__PURE__ */ x(
    "div",
    {
      id: e.body.id,
      className: e.body.className || "card-body",
      "aria-label": e.body.name,
      children: [
        e.body.name && /* @__PURE__ */ o("div", { className: "mb-2", children: e.body.name }),
        e.fields.map((r) => /* @__PURE__ */ o(
          "div",
          {
            id: r.id,
            className: r.className,
            "aria-label": r.name,
            children: r.name
          },
          r.id
        ))
      ]
    }
  ), s = e.link ? /* @__PURE__ */ o(
    H,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (i = e.body) == null ? void 0 : i.name,
      children: n
    }
  ) : n, a = e.footer ? /* @__PURE__ */ o(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer",
      "aria-label": e.footer.name,
      children: e.footer.name
    }
  ) : null;
  return /* @__PURE__ */ x("div", { id: e.id, className: e.className, children: [
    t,
    s,
    a
  ] });
}
class En extends be {
  constructor(t = {}) {
    if (super(t), !t.icon)
      throw new Error("CardIconObject requires `icon`.");
    this.icon = t.icon instanceof R ? t.icon : new R(t.icon), this.iconClass = t.iconClass ?? "col-4 d-flex align-items-start justify-content-center text-warning fs-2", this.textClass = t.textClass ?? "col-8";
  }
}
function Yn({ cardIcon: e }) {
  var i, r, d, u;
  if (!e || !(e instanceof En))
    throw new Error(
      "AlloyCardIcon requires `cardIcon` (CardIconObject instance)."
    );
  const t = (i = e.header) != null && i.name ? /* @__PURE__ */ o(
    "div",
    {
      id: e.header.id,
      className: e.header.className,
      children: e.header.name
    }
  ) : null, n = /* @__PURE__ */ o(
    "div",
    {
      id: e.body.id,
      className: e.body.className,
      "aria-label": e.body.name,
      children: /* @__PURE__ */ x("div", { className: "row m-0", children: [
        /* @__PURE__ */ o("div", { className: e.iconClass, children: /* @__PURE__ */ o(V, { icon: e.icon }) }),
        /* @__PURE__ */ x("div", { className: e.textClass, children: [
          (r = e.body) != null && r.name ? /* @__PURE__ */ o("div", { className: "mb-1 fw-semibold", children: e.body.name }) : null,
          e.fields.map(
            (l) => l != null && l.name ? /* @__PURE__ */ o(
              "div",
              {
                id: l.id,
                className: l.className,
                children: l.name
              },
              l.id
            ) : null
          )
        ] })
      ] })
    }
  ), s = e.link ? /* @__PURE__ */ o(
    H,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (d = e.body) == null ? void 0 : d.name,
      children: n
    }
  ) : n, a = (u = e.footer) != null && u.name ? /* @__PURE__ */ o(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className,
      children: e.footer.name
    }
  ) : null;
  return /* @__PURE__ */ x(
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
class Ye {
  constructor(t = {}) {
    this.id = t.id ?? S("logo"), this.imageUrl = t.imageUrl ?? "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png", this.alt = t.alt ?? "Alloymobile", this.width = t.width ?? "72px", this.height = t.height ?? "auto";
  }
}
class mt {
  constructor(t = {}) {
    this.id = t.id ?? S("card"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "", this.header = t.header instanceof A ? t.header : new A(t.header || {}), this.body = t.body instanceof A ? t.body : new A(t.body || {}), this.footer = t.footer instanceof A ? t.footer : new A(t.footer || {});
    const n = Array.isArray(t.fields) ? t.fields : [];
    this.fields = n.map(
      (s) => s instanceof A ? s : new A(s || {})
    ), this.logo = t.logo instanceof Ye ? t.logo : new Ye(t.logo || {}), this.logoClass = t.logoClass ?? "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0", this.textClass = t.textClass ?? "col-8";
  }
}
function Zn({ cardImage: e }) {
  var i, r, d, u;
  if (!(e instanceof mt))
    throw new Error(
      "AlloyCardImage requires `cardImage` (CardImageObject instance)."
    );
  const t = (i = e.header) != null && i.name ? /* @__PURE__ */ o(
    "div",
    {
      id: e.header.id,
      className: e.header.className || "card-header py-2 fw-semibold",
      "aria-label": e.header.name,
      children: e.header.name
    }
  ) : null, n = /* @__PURE__ */ o(
    "div",
    {
      id: e.body.id,
      className: e.body.className || "card-body py-3",
      "aria-label": e.body.name,
      children: /* @__PURE__ */ x("div", { className: "row m-0", children: [
        /* @__PURE__ */ o("div", { className: e.logoClass, children: /* @__PURE__ */ o(
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
        /* @__PURE__ */ o("div", { className: e.textClass, children: /* @__PURE__ */ x("div", { className: "row p-1", children: [
          (r = e.body) != null && r.name ? /* @__PURE__ */ o("div", { className: "fw-semibold mb-1", children: e.body.name }) : null,
          e.fields.map(
            (l) => l != null && l.name ? /* @__PURE__ */ o(
              "div",
              {
                id: l.id,
                className: l.className || "",
                children: l.name
              },
              l.id ?? S("card-image-field")
            ) : null
          )
        ] }) })
      ] })
    }
  ), s = e.link ? /* @__PURE__ */ o(
    H,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (d = e.body) == null ? void 0 : d.name,
      children: n
    }
  ) : n, a = (u = e.footer) != null && u.name ? /* @__PURE__ */ o(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer small text-muted py-2",
      "aria-label": e.footer.name,
      children: e.footer.name
    }
  ) : null;
  return /* @__PURE__ */ x(
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
class Re {
  constructor(t = {}) {
    this.id = t.id ?? S("card-action"), this.className = t.className ?? "card border m-2 shadow", this.link = t.link ?? "";
    const n = t.header ?? {};
    this.header = n instanceof A ? n : new A(n);
    const s = t.body ?? {};
    this.body = s instanceof A ? s : new A(s);
    const a = Array.isArray(t.fields) ? t.fields : [];
    this.fields = a.map(
      (d) => d instanceof A ? d : new A(d || {})
    );
    const i = t.footer ?? {};
    this.footer = i instanceof A ? i : new A(i), this.type = t.type ?? "AlloyButtonBar";
    const r = t.action;
    this.type === "AlloyLinkBar" ? this.action = r instanceof Y ? r : r ? new Y(r) : void 0 : this.action = r instanceof Z ? r : r ? new Z(r) : void 0;
  }
}
function kn({ cardAction: e, output: t }) {
  var u, l;
  if (!e || !(e instanceof Re))
    throw new Error(
      "AlloyCardAction requires `cardAction` (CardActionObject instance)."
    );
  function n(f) {
    if (typeof t != "function") return;
    const h = f && typeof f.toJSON == "function" ? f.toJSON() : f || {}, { error: m = !1, errorMessage: g = [] } = h, N = s(h), E = {};
    Array.isArray(e.fields) && e.fields.forEach((p) => {
      if (!p) return;
      const v = p.id, C = p.name;
      v && typeof C < "u" && (E[v] = C);
    });
    const c = new B({
      id: e.id,
      type: "card-action",
      action: N,
      error: !!m,
      errorMessage: g || [],
      data: E
    });
    t(c);
  }
  function s(f) {
    if (!f || typeof f != "object") return "";
    const h = (g) => {
      if (!g || typeof g != "object") return "";
      const N = typeof g.name == "string" ? g.name.trim() : "";
      if (N) return N;
      const E = typeof g.ariaLabel == "string" ? g.ariaLabel.trim() : "";
      if (E) return E;
      const c = typeof g.title == "string" ? g.title.trim() : "";
      if (c) return c;
      const p = typeof g.id == "string" ? g.id.trim() : "";
      return p || "";
    }, m = f.data && typeof f.data == "object" ? f.data : null;
    if (m) {
      if (m.action && typeof m.action == "object") {
        const N = h(m.action);
        if (N) return N;
      }
      if (m.button && typeof m.button == "object") {
        const N = h(m.button);
        if (N) return N;
      }
      if (m.link && typeof m.link == "object") {
        const N = h(m.link);
        if (N) return N;
      }
      const g = h(m);
      if (g) return g;
    }
    return h(f);
  }
  const a = (u = e.header) != null && u.name ? /* @__PURE__ */ o(
    "div",
    {
      id: e.header.id,
      className: e.header.className ?? "card-header py-2 fw-semibold",
      children: e.header.name
    }
  ) : null, i = /* @__PURE__ */ x(
    "div",
    {
      id: e.body.id,
      className: e.body.className ?? "card-body",
      children: [
        e.body.name ? /* @__PURE__ */ o("div", { className: "fw-semibold mb-1", children: e.body.name }) : null,
        e.fields.map(
          (f) => f != null && f.name ? /* @__PURE__ */ o(
            "div",
            {
              id: f.id,
              className: f.className ?? "",
              children: f.name
            },
            f.id ?? S("card-field")
          ) : null
        )
      ]
    }
  ), r = e.link ? /* @__PURE__ */ o(
    H,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (l = e.body) == null ? void 0 : l.name,
      children: i
    }
  ) : i, d = /* @__PURE__ */ x(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className ?? "card-footer d-flex align-items-center gap-2 py-2",
      children: [
        e.footer.name ? /* @__PURE__ */ o("div", { className: "me-auto small text-muted", children: e.footer.name }) : null,
        e.action ? e.type === "AlloyLinkBar" ? /* @__PURE__ */ o(xe, { linkBar: e.action, output: n }) : /* @__PURE__ */ o(
          Ce,
          {
            buttonBar: e.action,
            output: n
          }
        ) : null
      ]
    }
  );
  return /* @__PURE__ */ x(
    "div",
    {
      id: e.id,
      className: e.className ?? "card border m-2 shadow",
      children: [
        a,
        r,
        d
      ]
    }
  );
}
class De {
  /**
   * @param {CardIconActionConfig} card
   */
  constructor(t = {}) {
    this.id = t.id ?? S("card-icon-action"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "";
    const n = t.header ?? {};
    this.header = n instanceof A ? n : new A(n);
    const s = t.body ?? {};
    this.body = s instanceof A ? s : new A(s);
    const a = Array.isArray(t.fields) ? t.fields : [];
    this.fields = a.map(
      (d) => d instanceof A ? d : new A(d || {})
    );
    const i = t.footer ?? {};
    this.footer = i instanceof A ? i : new A(i);
    const r = new R({ iconClass: "fa-solid fa-user fa-2xl" });
    this.icon = t.icon instanceof R ? t.icon : new R(t.icon || { iconClass: r.iconClass }), this.iconClass = t.iconClass ?? "col-3 d-flex align-items-center justify-content-center rounded-circle bg-warning text-white mb-0", this.textClass = t.textClass ?? "col-9", this.type = t.type ?? "AlloyButtonBar", this.type === "AlloyLinkBar" ? this.action = t.action instanceof Y ? t.action : new Y(t.action || {}) : this.action = t.action instanceof Z ? t.action : new Z(t.action || {});
  }
}
function An({ cardIconAction: e, output: t }) {
  var l, f;
  if (!e || !(e instanceof De))
    throw new Error(
      "AlloyCardIconAction requires `cardIconAction` (CardIconActionObject instance)."
    );
  function n(h) {
    if (!h || typeof h != "object") return "";
    const m = typeof h.name == "string" ? h.name.trim() : "";
    if (m) return m;
    const g = typeof h.ariaLabel == "string" ? h.ariaLabel.trim() : "";
    if (g) return g;
    const N = typeof h.title == "string" ? h.title.trim() : "";
    if (N) return N;
    const E = typeof h.id == "string" ? h.id.trim() : "";
    return E || "";
  }
  function s() {
    return (h, m) => {
      if (typeof t != "function") return;
      const g = n(h), N = {};
      Array.isArray(e.fields) && e.fields.forEach((c) => {
        if (!c) return;
        const p = c.id, v = c.name;
        p && typeof v < "u" && (N[p] = v);
      });
      const E = new B({
        id: e.id,
        // align with AlloyCardAction
        type: "card-action",
        action: g,
        error: !1,
        errorMessage: [],
        data: N
      });
      t(E);
    };
  }
  const a = (l = e.header) != null && l.name ? /* @__PURE__ */ o(
    "div",
    {
      id: e.header.id,
      className: e.header.className || "card-header py-2 fw-semibold",
      "aria-label": e.header.name,
      children: e.header.name
    }
  ) : null, i = /* @__PURE__ */ o(
    "div",
    {
      id: e.body.id,
      className: e.body.className || "card-body",
      "aria-label": e.body.name,
      children: /* @__PURE__ */ x("div", { className: "row m-0", children: [
        /* @__PURE__ */ o("div", { className: e.iconClass, children: /* @__PURE__ */ o(V, { icon: e.icon }) }),
        /* @__PURE__ */ o("div", { className: e.textClass, children: /* @__PURE__ */ o("div", { className: "row p-1", children: e.fields.map(
          (h) => h != null && h.name ? /* @__PURE__ */ o(
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
  ), r = e.link ? /* @__PURE__ */ o(
    H,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (f = e.body) == null ? void 0 : f.name,
      children: i
    }
  ) : i, d = e.type === "AlloyLinkBar" ? /* @__PURE__ */ o(
    xe,
    {
      linkBar: e.action,
      output: s()
    }
  ) : /* @__PURE__ */ o(
    Ce,
    {
      buttonBar: e.action,
      output: s()
    }
  ), u = /* @__PURE__ */ x(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      "aria-label": e.footer.name,
      children: [
        /* @__PURE__ */ o("div", { className: "me-auto", children: e.footer.name ? e.footer.name : null }),
        /* @__PURE__ */ o("div", { role: "group", children: d })
      ]
    }
  );
  return /* @__PURE__ */ x(
    "div",
    {
      id: e.id,
      className: e.className,
      children: [
        a,
        r,
        u
      ]
    }
  );
}
class Me extends mt {
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
    super(t), this.header = t.header instanceof A ? t.header : new A(
      t.header || {
        className: "card-header py-2 fw-semibold",
        name: ""
      }
    ), this.body = t.body instanceof A ? t.body : new A(
      t.body || {
        className: "card-body d-flex align-items-center",
        name: "Card Body"
      }
    );
    const n = Array.isArray(t.fields) ? t.fields : [];
    switch (this.fields = n.map(
      (s, a) => s instanceof A ? s : new A({
        id: (s == null ? void 0 : s.id) || `field_${a + 1}`,
        className: (s == null ? void 0 : s.className) ?? "",
        name: (s == null ? void 0 : s.name) ?? ""
      })
    ), this.footer = t.footer instanceof A ? t.footer : new A(
      t.footer || {
        className: "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
        name: "Footer"
      }
    ), this.type = t.type ?? "AlloyButtonBar", this.type) {
      case "AlloyLinkBar": {
        this.action = t.action instanceof Y ? t.action : new Y(
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
        this.type = "AlloyButtonBar", this.action = t.action instanceof Z ? t.action : new Z(
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
function On({ cardImageAction: e, output: t }) {
  var u, l, f, h, m, g;
  if (!e || !(e instanceof Me))
    throw new Error(
      "AlloyCardImageAction requires `cardImageAction` (CardImageActionObject instance)."
    );
  function n() {
    return (N, E) => {
      if (typeof t != "function") return;
      const c = jn(N), p = {};
      Array.isArray(e.fields) && e.fields.forEach((C) => {
        if (!C) return;
        const b = C.id, y = C.name;
        b && typeof y < "u" && (p[b] = y);
      });
      const v = new B({
        id: e.id,
        type: "card-action",
        action: c,
        error: !1,
        errorMessage: [],
        data: p
      });
      t(v);
    };
  }
  const a = e.header && ((u = e.header.name) == null ? void 0 : u.trim()) ? /* @__PURE__ */ o(
    "div",
    {
      id: e.header.id,
      className: e.header.className || "card-header py-2 fw-semibold",
      "aria-label": e.header.name,
      children: e.header.name
    }
  ) : null, i = /* @__PURE__ */ o(
    "div",
    {
      id: e.body.id,
      className: e.body.className || "card-body d-flex align-items-center",
      "aria-label": e.body.name,
      children: /* @__PURE__ */ x("div", { className: "row m-0", children: [
        /* @__PURE__ */ o("div", { className: e.logoClass, children: /* @__PURE__ */ o(
          "img",
          {
            src: (l = e.logo) == null ? void 0 : l.imageUrl,
            alt: (f = e.logo) == null ? void 0 : f.alt,
            style: {
              width: (h = e.logo) == null ? void 0 : h.width,
              height: (m = e.logo) == null ? void 0 : m.height,
              maxWidth: "100%",
              objectFit: "contain"
            }
          }
        ) }),
        /* @__PURE__ */ o("div", { className: e.textClass, children: /* @__PURE__ */ o("div", { className: "row p-1", children: e.fields.map(
          (N) => N != null && N.name ? /* @__PURE__ */ o(
            "div",
            {
              id: N.id,
              className: N.className,
              children: N.name
            },
            N.id
          ) : null
        ) }) })
      ] })
    }
  ), r = e.link ? /* @__PURE__ */ o(
    H,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (g = e.body) == null ? void 0 : g.name,
      children: i
    }
  ) : i, d = /* @__PURE__ */ x(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      "aria-label": e.footer.name,
      children: [
        /* @__PURE__ */ o("div", { className: "flex-grow-1", children: e.footer.name }),
        /* @__PURE__ */ o("div", { role: "group", children: e.type === "AlloyLinkBar" ? /* @__PURE__ */ o(
          xe,
          {
            linkBar: e.action,
            output: n()
          }
        ) : /* @__PURE__ */ o(
          Ce,
          {
            buttonBar: e.action,
            output: n()
          }
        ) })
      ]
    }
  );
  return /* @__PURE__ */ x(
    "div",
    {
      id: e.id,
      className: e.className,
      children: [
        a,
        r,
        d
      ]
    }
  );
}
function jn(e) {
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
class ge {
  constructor(t = {}) {
    const {
      id: n,
      title: s = "AlloyMobile",
      className: a = "col m-2",
      message: i = "",
      action: r = "",
      type: d = "AlloyInputTextIcon",
      submit: u,
      fields: l,
      data: f
    } = t;
    this.id = n ?? S("form"), this.title = s, this.className = a, this.message = i, this.action = r, this.type = d, this.submit = u instanceof we ? u : new we(
      u || {
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
    const h = Array.isArray(l) ? l : [];
    this.fields = h.map(
      (m) => m instanceof W ? m : new W(m)
    ), this.data = f ?? {};
  }
}
function Ze(e, t, n) {
  let s = !0;
  const a = [];
  if (e.required && (e.type === "checkbox" ? (Array.isArray(t) ? t : []).length === 0 && (s = !1, a.push("This field is required.")) : (t === "" || t === !1 || t === void 0 || t === null) && (s = !1, a.push("This field is required."))), s && typeof e.minLength == "number" && typeof t == "string" && t.length < e.minLength && (s = !1, a.push(`Minimum length is ${e.minLength}`)), s && typeof e.maxLength == "number" && typeof t == "string" && t.length > e.maxLength && (s = !1, a.push(`Maximum length is ${e.maxLength}`)), s && e.pattern && typeof t == "string" && !new RegExp(e.pattern).test(t) && (s = !1, a.push("Invalid format.")), s && e.passwordStrength && typeof t == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(t) || (s = !1, a.push("Password is too weak."))), s && e.matchWith) {
    const i = e.matchWith;
    n[i] !== t && (s = !1, a.push("Values do not match."));
  }
  return {
    valid: s,
    error: !s,
    errors: a
  };
}
function Bn({ form: e, output: t }) {
  const n = e instanceof ge ? e : new ge(e || {});
  if (!n || !Array.isArray(n.fields) || !(n.submit instanceof we))
    throw new Error(
      "AlloyForm could not hydrate a valid FormObject (missing fields[] or submit)."
    );
  const [s, a] = L(() => {
    const h = {}, m = {};
    return n.fields.forEach((g) => {
      m[g.name] = g.value;
    }), n.fields.forEach((g) => {
      const N = g.value, { valid: E, error: c, errors: p } = Ze(
        g,
        N,
        m
      );
      h[g.name] = {
        value: N,
        valid: E,
        error: c,
        errors: p
      };
    }), h;
  }), i = P(null), r = pt(
    (h) => {
      const m = {};
      Object.keys(h).forEach((N) => {
        m[N] = h[N].value;
      });
      const g = {};
      return n.fields.forEach((N) => {
        const E = m[N.name], { valid: c, error: p, errors: v } = Ze(
          N,
          E,
          m
        );
        g[N.name] = {
          value: E,
          valid: c,
          error: p,
          errors: v
        };
      }), g;
    },
    [n.fields]
  );
  function d(h) {
    const m = h instanceof B ? h.data || {} : h || {}, { name: g, value: N } = m;
    g && a((E) => {
      const c = { ...E };
      return c[g] = {
        ...E[g] || {
          value: void 0,
          valid: !0,
          error: !1,
          errors: []
        },
        value: N
      }, r(c);
    });
  }
  const u = _(() => {
    const h = {};
    return Object.keys(s).forEach((m) => {
      h[m] = s[m].value;
    }), h;
  }, [s]), l = _(() => Object.values(s).some(
    (h) => h.error || !h.valid
  ), [s]);
  function f(h) {
    let m = !1;
    Object.values(s).forEach((c) => {
      (c.error || !c.valid) && (m = !0);
    });
    const g = { ...u };
    n.data = g, n.message = "";
    const N = m ? { ...s } : g, E = new B({
      id: n.id,
      // top-level id, as you requested
      type: "form",
      action: "submit",
      data: N,
      error: m
      // no errorMessage; all useful info is inside data for error=true
    });
    t == null || t(E);
  }
  return n.submit.disabled = l || !!n.submit.loading, /* @__PURE__ */ o("div", { className: "row", children: /* @__PURE__ */ o("div", { className: n.className, children: /* @__PURE__ */ x("div", { className: "text-center", children: [
    /* @__PURE__ */ o("h3", { children: n.title }),
    n.message !== "" && /* @__PURE__ */ o("div", { className: "alert alert-text-danger m-0 p-0", children: n.message }),
    n.fields.map((h) => /* @__PURE__ */ o(
      de,
      {
        input: h,
        output: d
      },
      h.id
    )),
    /* @__PURE__ */ o(
      Ct,
      {
        ref: i,
        buttonSubmit: n.submit,
        output: f
      }
    )
  ] }) }) });
}
class Ln {
  constructor(t = {}) {
    this.id = t.id ?? S("tab"), this.key = t.key ?? this.id, this.title = t.title ?? "", this.subtitle = t.subtitle ?? "", this.order = typeof t.order == "number" ? t.order : 0, this.required = !!t.required, this.stage = t.stage ?? "", this.status = t.status ?? "", this.icon = t.icon ? t.icon instanceof R ? t.icon : new R(t.icon) : null, this.inputs = Array.isArray(t.inputs) ? t.inputs : [];
  }
}
class Sn {
  constructor(t = {}) {
    this.id = t.id ?? S("tab-form"), this.name = t.name ?? "", this.status = t.status ?? "draft";
    const s = (Array.isArray(t.tabs) ? t.tabs : []).map((r) => new Ln(r));
    this.tabs = s.sort((r, d) => r.order - d.order);
    let a = typeof t.currentIndex == "number" ? t.currentIndex : 0;
    a < 0 && (a = 0), a >= this.tabs.length && (a = this.tabs.length - 1), this.currentIndex = this.tabs.length > 0 ? a : 0;
    const i = t.navButtons || {};
    this.navButtons = {
      previous: i.previous ? new q({
        ...i.previous,
        name: i.previous.name || i.previous.label || "Previous"
      }) : null,
      next: i.next ? new q({
        ...i.next,
        name: i.next.name || i.next.label || "Next"
      }) : null,
      finish: i.finish ? new q({
        ...i.finish,
        name: i.finish.name || i.finish.label || "Finish"
      }) : null
    };
  }
}
function Rn(e) {
  const t = {};
  return e.tabs.forEach((n) => {
    const s = {};
    n.inputs.forEach((a) => {
      const i = a.name;
      i && (typeof a.value < "u" ? s[i] = a.value : a.type === "checkbox" ? s[i] = !1 : s[i] = "");
    }), t[n.key] = s;
  }), t;
}
function Xe(e, t) {
  const n = {};
  return e.inputs.forEach((s) => {
    const a = s.name;
    if (!a) return;
    const i = [], r = typeof t[a] < "u" ? t[a] : s.value;
    if (s.required && (s.type === "checkbox" ? r || i.push("This field is required.") : (r === "" || r === null || typeof r > "u") && i.push("This field is required.")), s.matchWith) {
      const d = s.matchWith, u = t[d];
      r !== u && i.push("Values do not match.");
    }
    i.length > 0 && (n[a] = i);
  }), n;
}
function Xn({ tabForm: e, output: t }) {
  if (!e || !(e instanceof Sn))
    throw new Error("AlloyTabForm requires `tabForm` (TabFormObject instance).");
  const [n, s] = L(e.currentIndex), [a, i] = L(() => Rn(e)), [r, d] = L({}), u = e.tabs, l = u.length, f = u[n] || null, h = f ? f.key : "", m = e.navButtons || {};
  function g(j, F, D, U) {
    const T = a[j] || {};
    return Object.prototype.hasOwnProperty.call(T, F) ? T[F] : typeof D < "u" ? D : U === "checkbox" ? !1 : "";
  }
  function N(j, F) {
    var ne, G, me;
    const D = F && typeof F.toJSON == "function" ? F.toJSON() : F, U = (ne = D == null ? void 0 : D.data) == null ? void 0 : ne.name, T = (G = D == null ? void 0 : D.data) == null ? void 0 : G.value, J = ((me = D == null ? void 0 : D.data) == null ? void 0 : me.errors) || [];
    U && (i((Ae) => {
      const ee = { ...Ae }, se = { ...ee[j] || {} };
      return se[U] = T, ee[j] = se, ee;
    }), d((Ae) => {
      const ee = { ...Ae }, se = { ...ee[j] || {} };
      return J.length > 0 ? se[U] = J : delete se[U], ee[j] = se, ee;
    }));
  }
  function E(j, F, D, U, T) {
    const J = u[F] || f, ne = J ? J.key : h, G = {
      currentIndex: F,
      currentTabKey: ne,
      values: D
    };
    if (T && U && Object.keys(U).length > 0 && (G.errors = U, G.message = "Validation failed for current step."), typeof t != "function") return;
    const me = T ? B.errorOf({
      id: e.id,
      type: "tab-form",
      action: j === "finish" ? "submit" : "draft",
      data: G
    }) : B.ok({
      id: e.id,
      type: "tab-form",
      action: j === "finish" ? "submit" : "draft",
      data: G
    });
    t(me);
  }
  function c() {
    if (!f || n <= 0) return;
    const j = n - 1;
    s(j), E("previous", j, a, r, !1);
  }
  function p() {
    if (!f || n >= l - 1) return;
    const j = f.key, F = a[j] || {}, D = Xe(f, F);
    if (Object.keys(D).length > 0) {
      const J = {
        ...r,
        [j]: D
      };
      d(J), E("next", n, a, J, !0);
      return;
    }
    const U = n + 1;
    s(U);
    const T = { ...r };
    delete T[j], d(T), E("next", U, a, T, !1);
  }
  function v() {
    if (!f) return;
    const j = f.key, F = a[j] || {}, D = Xe(f, F);
    if (Object.keys(D).length > 0) {
      const T = {
        ...r,
        [j]: D
      };
      d(T), E("finish", n, a, T, !0);
      return;
    }
    const U = { ...r };
    delete U[j], d(U), E("finish", n, a, U, !1);
  }
  if (!f)
    return /* @__PURE__ */ o("div", { className: "alert alert-warning", children: "No steps defined for this TabForm." });
  const C = n > 0, b = n === l - 1, y = !b, w = C && (m.previous || new q({
    name: "Previous",
    icon: { iconClass: "fa-solid fa-arrow-left" },
    className: "btn btn-primary"
  })), k = y && (m.next || new q({
    name: "Next",
    icon: { iconClass: "fa-solid fa-arrow-right" },
    className: "btn btn-primary"
  })), M = b && (m.finish || new q({
    name: "Finish",
    icon: { iconClass: "fa-solid fa-paper-plane" },
    className: "btn btn-primary"
  }));
  return /* @__PURE__ */ x("div", { className: "alloy-tab-form", children: [
    /* @__PURE__ */ o("ul", { className: "nav nav-tabs mb-3 flex-wrap", children: u.map((j, F) => /* @__PURE__ */ o("li", { className: "nav-item", children: /* @__PURE__ */ x(
      "button",
      {
        type: "button",
        className: `nav-link ${F === n ? "active" : ""}`,
        onClick: () => s(F),
        children: [
          j.icon && /* @__PURE__ */ o("span", { className: "me-1", children: /* @__PURE__ */ o(V, { icon: j.icon }) }),
          j.title || `Step ${F + 1}`
        ]
      }
    ) }, j.id)) }),
    (f.title || f.subtitle) && /* @__PURE__ */ x("div", { className: "mb-3", children: [
      f.title && /* @__PURE__ */ o("h5", { className: "mb-1", children: f.title }),
      f.subtitle && /* @__PURE__ */ o("div", { className: "text-muted small", children: f.subtitle })
    ] }),
    /* @__PURE__ */ x(
      "form",
      {
        onSubmit: (j) => j.preventDefault(),
        noValidate: !0,
        children: [
          /* @__PURE__ */ o("div", { className: "row g-3", children: /* @__PURE__ */ o("div", { className: "col-12 col-md-6 col-lg-5 mx-auto", children: f.inputs.map((j, F) => {
            const D = g(
              f.key,
              j.name,
              j.value,
              j.type
            ), T = (r[f.key] || {})[j.name] || [], J = T.length > 0, ne = new W({
              ...j,
              value: D,
              errors: T,
              invalid: J
            });
            return /* @__PURE__ */ o(
              de,
              {
                input: ne,
                output: (G) => N(f.key, G)
              },
              `inp-${F}`
            );
          }) }) }),
          /* @__PURE__ */ x("div", { className: "d-flex justify-content-between mt-4", children: [
            C ? /* @__PURE__ */ o(
              te,
              {
                buttonIcon: w,
                output: () => c()
              }
            ) : /* @__PURE__ */ o("span", {}),
            /* @__PURE__ */ x("div", { className: "d-flex gap-2 ms-auto", children: [
              y && /* @__PURE__ */ o(
                te,
                {
                  buttonIcon: k,
                  output: () => p()
                }
              ),
              b && /* @__PURE__ */ o(
                te,
                {
                  buttonIcon: M,
                  output: () => v()
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
class I {
  /**
   * @param {ModalConfig} modal
   */
  constructor(t = {}) {
    const {
      id: n,
      title: s,
      className: a,
      action: i,
      submit: r,
      fields: d = [],
      data: u = {},
      ...l
    } = t;
    this.id = n ?? S("modal"), this.title = s ?? "", this.className = a ?? "modal fade", this.action = i ?? "", r instanceof K ? this.submit = r : r && typeof r == "object" ? this.submit = new K(r) : this.submit = null, this.fields = d.map(
      (h) => h instanceof W ? h : new W(h)
    );
    const f = {};
    this.fields.forEach((h) => {
      f[h.name] = h.value;
    }), this.data = { ...f, ...u }, Object.assign(this, l);
  }
}
function Qe(e) {
  const t = {};
  return e && Array.isArray(e.fields) && e.fields.forEach((n) => {
    n instanceof W && (t[n.name] = n.value);
  }), { ...t, ...e.data || {} };
}
function Dn(e) {
  return Object.values(e).some(
    (t) => Array.isArray(t) && t.length > 0
  );
}
function Mn(e) {
  if (!e) return;
  const t = document.getElementById(e);
  if (!t) return;
  const n = typeof window < "u" ? window : void 0;
  if (n && n.bootstrap && n.bootstrap.Modal) {
    const a = n.bootstrap.Modal.getOrCreateInstance(t);
    if (a) {
      a.hide();
      return;
    }
  }
  const s = t.querySelector('[data-bs-dismiss="modal"]');
  s && typeof s.click == "function" && s.click();
}
function We({ modal: e, output: t }) {
  if (!e || !(e instanceof I))
    throw new Error("AlloyModal requires `modal` (ModalObject instance).");
  if (!e.submit || !(e.submit instanceof K))
    throw new Error(
      "ModalObject.submit must be a ButtonObject instance for AlloyModal."
    );
  const [n, s] = L(() => Qe(e)), [a, i] = L({});
  z(() => {
    s(Qe(e)), i({});
  }, [e]);
  const r = (u) => {
    if (!u || !(u instanceof B)) return;
    const { data: l, error: f } = u;
    if (!l || !l.name) return;
    const { name: h, value: m, errors: g = [] } = l;
    s((N) => ({
      ...N,
      [h]: m
    })), i((N) => ({
      ...N,
      [h]: f ? g : []
    }));
  }, d = () => {
    if (typeof t != "function") return;
    const u = { ...n };
    if (Dn(a)) {
      const f = B.errorOf({
        id: e.id,
        type: "modal",
        action: "submit",
        message: "Validation failed",
        data: {
          ...u,
          errors: a
        }
      });
      t(f);
      return;
    }
    const l = B.ok({
      id: e.id,
      type: "modal",
      action: "submit",
      data: u
    });
    t(l), Mn(e.id);
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: e.className,
      id: e.id,
      tabIndex: -1,
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true",
      role: "dialog",
      children: /* @__PURE__ */ o("div", { className: "modal-dialog", role: "document", children: /* @__PURE__ */ x("div", { className: "modal-content", children: [
        /* @__PURE__ */ x("div", { className: "modal-header", children: [
          /* @__PURE__ */ o("h5", { className: "modal-title", id: "exampleModalLabel", children: e.action + " a " + e.title }),
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              className: "btn-close",
              "data-bs-dismiss": "modal",
              "aria-label": "Close"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "modal-body", children: e.fields.map((u) => /* @__PURE__ */ o(
          de,
          {
            input: u,
            output: r
          },
          u.id
        )) }),
        /* @__PURE__ */ x("div", { className: "modal-footer", children: [
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              className: "btn btn-outline-dark",
              "data-bs-dismiss": "modal",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ o(Ue, { button: e.submit, output: d })
        ] })
      ] }) })
    }
  );
}
class Fn {
  /**
   * @param {ModalToastConfig} modalToast
   */
  constructor(t = {}) {
    const {
      id: n,
      title: s,
      className: a,
      action: i,
      submit: r,
      message: d,
      ...u
    } = t;
    this.id = n ?? S("modalToast"), this.title = s ?? "", this.className = a ?? "modal fade", this.action = i ?? "", r instanceof K ? this.submit = r : r && typeof r == "object" ? this.submit = new K(r) : this.submit = null, this.message = d ?? "", Object.assign(this, u);
  }
}
function $n(e) {
  const t = document.getElementById(e);
  if (!t) return;
  const n = t.querySelector('[data-bs-dismiss="modal"]');
  n && typeof n.click == "function" && n.click();
}
function Qn({ modalToast: e, output: t }) {
  if (!e || !(e instanceof Fn))
    throw new Error(
      "AlloyModalToast requires `modalToast` (ModalToastObject instance)."
    );
  if (!e.submit || !(e.submit instanceof K))
    throw new Error(
      "ModalToastObject.submit must be a ButtonObject instance for AlloyModalToast."
    );
  const n = () => {
    if (typeof t == "function") {
      const s = B.ok({
        id: e.id,
        type: "modal-toast",
        action: "click",
        data: {
          action: e.action,
          title: e.title,
          message: e.message
        }
      });
      t(s);
    }
    $n(e.id);
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: e.className,
      id: e.id,
      tabIndex: -1,
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true",
      role: "dialog",
      children: /* @__PURE__ */ o("div", { className: "modal-dialog", role: "document", children: /* @__PURE__ */ x("div", { className: "modal-content", children: [
        /* @__PURE__ */ x("div", { className: "modal-header", children: [
          /* @__PURE__ */ o("h5", { className: "modal-title", id: "exampleModalLabel", children: e.title }),
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              className: "btn-close",
              "data-bs-dismiss": "modal",
              "aria-label": "Close"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "modal-body", children: /* @__PURE__ */ o("h3", { children: e.message }) }),
        /* @__PURE__ */ x("div", { className: "modal-footer", children: [
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              className: "btn btn-outline-dark",
              "data-bs-dismiss": "modal",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ o(Ue, { button: e.submit, output: n })
        ] })
      ] }) })
    }
  );
}
class Pn {
  constructor(t = {}) {
    const {
      id: n,
      className: s = "container-fluid",
      modal: a,
      search: i,
      add: r,
      table: d,
      ...u
    } = t || {};
    this.id = n ?? S("crud-table"), this.className = s, this.modal = a instanceof I ? a : new I(a || {}), this.search = i instanceof W ? i : i ? new W(i) : null, this.add = r instanceof q ? r : r ? new q(r) : null, this.table = d instanceof ce ? d : new ce(d || {}), Object.assign(this, u);
  }
}
function Un(e) {
  if (!e) return;
  const t = document.getElementById(e);
  if (!t) return;
  const n = typeof window < "u" ? window : void 0;
  if (n && n.bootstrap && n.bootstrap.Modal) {
    n.bootstrap.Modal.getOrCreateInstance(t).show();
    return;
  }
  const s = document.querySelector(
    `[data-bs-toggle="modal"][data-bs-target="#${e}"]`
  );
  s && typeof s.click == "function" && s.click();
}
function es({ crudTable: e, output: t }) {
  var E;
  if (!e || !(e instanceof Pn))
    throw new Error(
      "AlloyCrudTable requires `crudTable` (CrudTableObject instance)."
    );
  const n = (c) => {
    typeof t == "function" && t(c);
  }, s = P(null), a = () => {
    var c;
    if (s.current && typeof s.current.click == "function") {
      s.current.click();
      return;
    }
    (c = e.modal) != null && c.id && Un(e.modal.id);
  }, [i, r] = L(() => {
    var c;
    return {
      mode: "create",
      // "create" | "edit" | "delete"
      data: ((c = e.modal) == null ? void 0 : c.data) || {},
      disabled: !1,
      version: 0
      // bump this to force rebuild of ModalObject
    };
  }), [d, u] = L(!1);
  z(() => {
    r((c) => {
      var p;
      return {
        mode: "create",
        data: ((p = e.modal) == null ? void 0 : p.data) || {},
        disabled: !1,
        version: c.version + 1
      };
    }), u(!1);
  }, [e]), z(() => {
    var c;
    d && (c = e.modal) != null && c.id && (a(), u(!1));
  }, [i.version, d, (E = e.modal) == null ? void 0 : E.id]);
  const l = _(() => {
    const c = e.modal;
    let p;
    i.mode === "edit" ? p = "Edit" : i.mode === "delete" ? p = "Delete" : p = c.action || "Create";
    const v = i.data || {}, C = Array.isArray(c.fields) ? c.fields.map((b) => {
      const y = b instanceof W ? { ...b } : { ...b }, w = y.name;
      return w && Object.prototype.hasOwnProperty.call(v, w) && (y.value = v[w]), i.disabled && (y.disabled = !0, y.readOnly = !0), y;
    }) : [];
    return new I({
      ...c,
      action: p,
      fields: C,
      data: i.data
    });
  }, [
    e.modal,
    i.mode,
    i.data,
    i.disabled,
    i.version
    // ensure fresh ModalObject for every Add/Edit/Delete
  ]);
  function f(c = {}) {
    const p = {}, v = e.modal || {}, C = v.data || {};
    return (Array.isArray(v.fields) ? v.fields : []).forEach((y) => {
      const w = y == null ? void 0 : y.name;
      w && (Object.prototype.hasOwnProperty.call(c, w) ? p[w] = c[w] : Object.prototype.hasOwnProperty.call(C, w) ? p[w] = C[w] : p[w] = "");
    }), p;
  }
  const h = (c) => {
    var y, w, k;
    const p = ((y = c == null ? void 0 : c.data) == null ? void 0 : y.name) ?? ((w = e.search) == null ? void 0 : w.name) ?? "", v = (k = c == null ? void 0 : c.data) == null ? void 0 : k.value, C = p && typeof p == "string" ? { [p]: v } : {}, b = B.ok({
      id: e.id,
      type: "crud-table",
      action: "search",
      data: C
    });
    n(b);
  }, m = (c) => {
    var v, C;
    if (!c) return;
    if (c.type === "column" && c.action === "Sort") {
      const b = ((v = c.data) == null ? void 0 : v.name) ?? "", y = ((C = c.data) == null ? void 0 : C.dir) ?? "", w = b && typeof b == "string" ? { [b]: y } : {}, k = B.ok({
        id: e.id,
        type: "crud-table",
        action: "Sort",
        data: w
      });
      n(k);
      return;
    }
    if (c.type === "table") {
      const b = c.data || {}, y = c.action || "", w = (y || "").toLowerCase();
      if (w.includes("edit")) {
        const k = f(b);
        r((M) => ({
          mode: "edit",
          data: k,
          disabled: !1,
          version: M.version + 1
        })), u(!0);
        return;
      }
      if (w.includes("delete")) {
        const k = f(b);
        r((M) => ({
          mode: "delete",
          data: k,
          disabled: !0,
          version: M.version + 1
        })), u(!0);
        return;
      }
      if (y) {
        const k = B.ok({
          id: e.id,
          type: "crud-table",
          action: y,
          // any custom button name
          data: {
            ...b
          }
        });
        n(k);
      }
      return;
    }
    if (c.type === "row" && c.action === "navigate") {
      const { to: b, ...y } = c.data || {}, w = B.ok({
        id: e.id,
        type: "crud-table",
        action: "navigate",
        data: {
          to: b,
          ...y
        }
      });
      n(w);
      return;
    }
    const p = B.ok({
      id: e.id,
      type: "crud-table",
      action: c.action || "table",
      data: { ...c.data || {} }
    });
    n(p);
  }, g = (c) => {
    var b, y;
    if (!c || c.type !== "modal" || c.error)
      return;
    const p = c.data || {};
    let v;
    i.mode === "edit" ? v = "Edit" : i.mode === "delete" ? v = "Delete" : v = ((y = (b = e.modal) == null ? void 0 : b.submit) == null ? void 0 : y.name) || "Create";
    const C = B.ok({
      id: e.id,
      type: "crud-table",
      action: v,
      data: {
        ...p
        // key/value only (vendorName, email, city, status, ...)
      }
    });
    n(C);
  }, N = () => {
    var p;
    const c = ((p = e.modal) == null ? void 0 : p.data) || {};
    r((v) => ({
      mode: "create",
      data: { ...c },
      // fresh clone every time
      disabled: !1,
      version: v.version + 1
    })), u(!0);
  };
  return /* @__PURE__ */ x(Fe, { children: [
    /* @__PURE__ */ x("div", { className: e.className, children: [
      /* @__PURE__ */ x("div", { className: "row input-group mt-2", children: [
        /* @__PURE__ */ o("div", { className: "col-sm-8", children: e.search && /* @__PURE__ */ o(
          de,
          {
            input: e.search,
            output: h
          }
        ) }),
        /* @__PURE__ */ o("div", { className: "col-sm-4 d-flex align-items-center justify-content-end", children: e.add && /* @__PURE__ */ o(
          te,
          {
            buttonIcon: e.add,
            output: N
          }
        ) })
      ] }),
      /* @__PURE__ */ o(
        ft,
        {
          tableAction: e.table,
          output: m
        }
      )
    ] }),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        ref: s,
        className: "d-none",
        "data-bs-toggle": "modal",
        "data-bs-target": `#${e.modal.id}`
      }
    ),
    /* @__PURE__ */ o(We, { modal: l, output: g })
  ] });
}
class qn {
  constructor(t = {}) {
    const {
      id: n,
      className: s = "col-sm-6 col-md-4 col-lg-3 mb-3",
      type: a = "AlloyCardAction",
      modal: i,
      add: r,
      cards: d = [],
      ...u
    } = t || {};
    this.id = n ?? S("crud-card"), this.className = s, this.type = a, this.modal = i instanceof I ? i : new I(i || {}), this.add = r instanceof q ? r : r ? new q(r) : null, this.cards = d.map((l) => a === "AlloyCardIconAction" ? l instanceof De ? l : new De(l || {}) : a === "AlloyCardImageAction" ? l instanceof Me ? l : new Me(l || {}) : l instanceof Re ? l : new Re(l || {})), Object.assign(this, u);
  }
}
function Tn(e) {
  if (!e) return;
  const t = document.getElementById(e);
  if (!t) return;
  const n = typeof window < "u" ? window : void 0;
  if (n && n.bootstrap && n.bootstrap.Modal) {
    n.bootstrap.Modal.getOrCreateInstance(t).show();
    return;
  }
  const s = document.querySelector(
    `[data-bs-toggle="modal"][data-bs-target="#${e}"]`
  );
  s && typeof s.click == "function" && s.click();
}
function ts({ crudCard: e, output: t }) {
  var E;
  if (!e || !(e instanceof qn))
    throw new Error(
      "AlloyCrudCard requires `crudCard` (CrudCardObject instance)."
    );
  const n = (c) => {
    typeof t == "function" && t(c);
  }, s = P(null), a = () => {
    var c;
    if (s.current && typeof s.current.click == "function") {
      s.current.click();
      return;
    }
    (c = e.modal) != null && c.id && Tn(e.modal.id);
  }, [i, r] = L(() => {
    var c;
    return {
      mode: "create",
      // "create" | "edit" | "delete"
      data: ((c = e.modal) == null ? void 0 : c.data) || {},
      disabled: !1,
      version: 0
      // bump this to force rebuild of ModalObject
    };
  }), [d, u] = L(!1);
  z(() => {
    r((c) => {
      var p;
      return {
        mode: "create",
        data: ((p = e.modal) == null ? void 0 : p.data) || {},
        disabled: !1,
        version: c.version + 1
      };
    }), u(!1);
  }, [e]), z(() => {
    var c;
    d && (c = e.modal) != null && c.id && (a(), u(!1));
  }, [i.version, d, (E = e.modal) == null ? void 0 : E.id]);
  const l = _(() => {
    const c = e.modal;
    let p;
    i.mode === "edit" ? p = "Edit" : i.mode === "delete" ? p = "Delete" : p = c.action || "Create";
    const v = i.data || {}, C = Array.isArray(c.fields) ? c.fields.map((b) => {
      const y = b ? { ...b } : {}, w = y.name;
      return w && Object.prototype.hasOwnProperty.call(v, w) && (y.value = v[w]), i.disabled && (y.disabled = !0, y.readOnly = !0), y;
    }) : [];
    return new I({
      ...c,
      action: p,
      fields: C,
      data: i.data
    });
  }, [
    e.modal,
    i.mode,
    i.data,
    i.disabled,
    i.version
  ]);
  function f(c = {}) {
    const p = {}, v = e.modal || {}, C = v.data || {};
    return (Array.isArray(v.fields) ? v.fields : []).forEach((y) => {
      const w = y == null ? void 0 : y.name;
      w && (Object.prototype.hasOwnProperty.call(c, w) ? p[w] = c[w] : Object.prototype.hasOwnProperty.call(C, w) ? p[w] = C[w] : p[w] = "");
    }), p;
  }
  const h = (c) => {
    if (!c || c.type !== "card-action")
      return;
    const p = c.data || {}, v = c.action || "", C = v.toLowerCase();
    if (C.includes("edit")) {
      const b = f(p);
      r((y) => ({
        mode: "edit",
        data: b,
        disabled: !1,
        version: y.version + 1
      })), u(!0);
      return;
    }
    if (C.includes("delete")) {
      const b = f(p);
      r((y) => ({
        mode: "delete",
        data: b,
        disabled: !0,
        version: y.version + 1
      })), u(!0);
      return;
    }
    if (v) {
      const b = B.ok({
        id: e.id,
        type: "crud-card",
        action: v,
        data: {
          ...p
        }
      });
      n(b);
    }
  }, m = (c) => {
    var b, y;
    if (!c || c.type !== "modal" || c.error)
      return;
    const p = c.data || {};
    let v;
    i.mode === "edit" ? v = "Edit" : i.mode === "delete" ? v = "Delete" : v = ((y = (b = e.modal) == null ? void 0 : b.submit) == null ? void 0 : y.name) || "Create";
    const C = B.ok({
      id: e.id,
      type: "crud-card",
      action: v,
      data: {
        ...p
        // key/value only (vendorName, email, city, status, ...)
      }
    });
    n(C);
  }, g = () => {
    var p;
    const c = ((p = e.modal) == null ? void 0 : p.data) || {};
    r((v) => ({
      mode: "create",
      data: { ...c },
      // fresh clone every time; always blank/default
      disabled: !1,
      version: v.version + 1
    })), u(!0);
  }, N = () => Array.isArray(e.cards) ? e.type === "AlloyCardIconAction" ? e.cards.map((c) => /* @__PURE__ */ o("div", { className: e.className, children: /* @__PURE__ */ o(
    An,
    {
      cardIconAction: c,
      output: h
    }
  ) }, c.id)) : e.type === "AlloyCardImageAction" ? e.cards.map((c) => /* @__PURE__ */ o("div", { className: e.className, children: /* @__PURE__ */ o(
    On,
    {
      cardImageAction: c,
      output: h
    }
  ) }, c.id)) : e.cards.map((c) => /* @__PURE__ */ o("div", { className: e.className, children: /* @__PURE__ */ o(kn, { cardAction: c, output: h }) }, c.id)) : null;
  return /* @__PURE__ */ x(Fe, { children: [
    /* @__PURE__ */ o("div", { className: "row mt-2", children: /* @__PURE__ */ o("div", { className: "col-sm-12 text-end", children: e.add && /* @__PURE__ */ o(te, { buttonIcon: e.add, output: g }) }) }),
    /* @__PURE__ */ o("div", { id: e.id, className: "row", children: N() }),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        ref: s,
        className: "d-none",
        "data-bs-toggle": "modal",
        "data-bs-target": `#${e.modal.id}`
      }
    ),
    /* @__PURE__ */ o(We, { modal: l, output: m })
  ] });
}
class Vn {
  constructor(t = {}) {
    const {
      id: n,
      className: s = "container-fluid",
      modal: a,
      search: i,
      send: r,
      table: d,
      ...u
    } = t || {};
    this.id = n ?? S("email"), this.className = s, this.modal = a instanceof I ? a : new I(a || {}), this.search = i instanceof W ? i : i ? new W(i) : null, this.send = r instanceof q ? r : r ? new q(r) : null, this.table = d instanceof ce ? d : new ce(d || {}), Object.assign(this, u);
  }
}
function _n(e) {
  if (!e) return;
  const t = document.getElementById(e);
  if (!t) return;
  const n = typeof window < "u" ? window : void 0;
  if (n && n.bootstrap && n.bootstrap.Modal) {
    n.bootstrap.Modal.getOrCreateInstance(t).show();
    return;
  }
  const s = document.querySelector(
    `[data-bs-toggle="modal"][data-bs-target="#${e}"]`
  );
  s && typeof s.click == "function" && s.click();
}
function ns({ email: e, output: t }) {
  var E;
  if (!e || !(e instanceof Vn))
    throw new Error("AlloyEmail requires `email` (EmailObject instance).");
  const n = (c) => {
    typeof t == "function" && t(c);
  }, s = P(null), a = () => {
    var c;
    if (s.current && typeof s.current.click == "function") {
      s.current.click();
      return;
    }
    (c = e.modal) != null && c.id && _n(e.modal.id);
  }, [i, r] = L(() => {
    var c;
    return {
      mode: "compose",
      // "compose" | "open" | "reply" | "delete"
      data: ((c = e.modal) == null ? void 0 : c.data) || {},
      disabled: !1,
      version: 0
      // bump this to force rebuild / open timing
    };
  }), [d, u] = L(!1);
  z(() => {
    r((c) => {
      var p;
      return {
        mode: "compose",
        data: ((p = e.modal) == null ? void 0 : p.data) || {},
        disabled: !1,
        version: c.version + 1
      };
    }), u(!1);
  }, [e]), z(() => {
    var c;
    d && (c = e.modal) != null && c.id && (a(), u(!1));
  }, [i.version, d, (E = e.modal) == null ? void 0 : E.id]);
  const l = _(() => {
    const c = e.modal;
    let p;
    i.mode === "open" ? p = "Open" : i.mode === "reply" ? p = "Reply" : i.mode === "delete" ? p = "Delete" : p = c.action || "Compose";
    const v = i.data || {}, C = Array.isArray(c.fields) ? c.fields.map((b) => {
      const y = b instanceof W ? { ...b } : { ...b }, w = y.name;
      return w && Object.prototype.hasOwnProperty.call(v, w) && (y.value = v[w]), i.disabled && (y.disabled = !0, y.readOnly = !0), y;
    }) : [];
    return new I({
      ...c,
      action: p,
      fields: C,
      data: i.data
    });
  }, [e.modal, i.mode, i.data, i.disabled]);
  function f(c = {}) {
    const p = {}, v = e.modal || {}, C = v.data || {};
    return (Array.isArray(v.fields) ? v.fields : []).forEach((y) => {
      const w = y == null ? void 0 : y.name;
      w && (Object.prototype.hasOwnProperty.call(c, w) ? p[w] = c[w] : Object.prototype.hasOwnProperty.call(C, w) ? p[w] = C[w] : p[w] = "");
    }), p;
  }
  const h = (c) => {
    var y, w, k;
    const p = ((y = c == null ? void 0 : c.data) == null ? void 0 : y.name) ?? ((w = e.search) == null ? void 0 : w.name) ?? "", v = (k = c == null ? void 0 : c.data) == null ? void 0 : k.value, C = p && typeof p == "string" ? { [p]: v } : {}, b = B.ok({
      id: e.id,
      type: "email",
      action: "search",
      data: C
    });
    n(b);
  }, m = (c) => {
    var v, C;
    if (!c) return;
    if (c.type === "column" && c.action === "Sort") {
      const b = ((v = c.data) == null ? void 0 : v.name) ?? "", y = ((C = c.data) == null ? void 0 : C.dir) ?? "", w = b && typeof b == "string" ? { [b]: y } : {}, k = B.ok({
        id: e.id,
        type: "email",
        action: "Sort",
        data: w
      });
      n(k);
      return;
    }
    if (c.type === "row" && c.action === "navigate") {
      const { to: b, ...y } = c.data || {}, w = B.ok({
        id: e.id,
        type: "email",
        action: "navigate",
        data: {
          to: b,
          ...y
        }
      });
      n(w);
      return;
    }
    if (c.type === "table") {
      const b = c.data || {}, y = c.action || "", w = (y || "").toLowerCase();
      if (w.includes("open")) {
        const k = f(b);
        r((M) => ({
          mode: "open",
          data: k,
          disabled: !0,
          // read-only view
          version: M.version + 1
        })), u(!0);
        return;
      }
      if (w.includes("reply")) {
        const k = f(b);
        r((M) => ({
          mode: "reply",
          data: k,
          disabled: !1,
          version: M.version + 1
        })), u(!0);
        return;
      }
      if (w.includes("delete")) {
        const k = f(b);
        r((M) => ({
          mode: "delete",
          data: k,
          disabled: !0,
          // read-only confirm
          version: M.version + 1
        })), u(!0);
        return;
      }
      if (y) {
        const k = B.ok({
          id: e.id,
          type: "email",
          action: y,
          data: {
            ...b
          }
        });
        n(k);
      }
      return;
    }
    const p = B.ok({
      id: e.id,
      type: "email",
      action: c.action || "table",
      data: { ...c.data || {} }
    });
    n(p);
  }, g = (c) => {
    var b, y;
    if (!c || c.type !== "modal" || c.error)
      return;
    const p = c.data || {};
    let v;
    i.mode === "open" ? v = "Open" : i.mode === "reply" ? v = "Reply" : i.mode === "delete" ? v = "Delete" : v = ((y = (b = e.modal) == null ? void 0 : b.submit) == null ? void 0 : y.name) || "submit";
    const C = B.ok({
      id: e.id,
      type: "email",
      action: v,
      data: {
        ...p
      }
    });
    n(C);
  }, N = () => {
    var p;
    const c = ((p = e.modal) == null ? void 0 : p.data) || {};
    r((v) => ({
      mode: "compose",
      data: { ...c },
      // fresh clone every time
      disabled: !1,
      version: v.version + 1
    })), u(!0);
  };
  return /* @__PURE__ */ x(Fe, { children: [
    /* @__PURE__ */ x("div", { className: e.className, children: [
      /* @__PURE__ */ x("div", { className: "row input-group mt-2", children: [
        /* @__PURE__ */ o("div", { className: "col-sm-8", children: e.search && /* @__PURE__ */ o(de, { input: e.search, output: h }) }),
        /* @__PURE__ */ o("div", { className: "col-sm-4 d-flex align-items-center justify-content-end", children: e.send && /* @__PURE__ */ o(
          te,
          {
            buttonIcon: e.send,
            output: N
          }
        ) })
      ] }),
      /* @__PURE__ */ o(
        ft,
        {
          tableAction: e.table,
          output: m
        }
      )
    ] }),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        ref: s,
        className: "d-none",
        "data-bs-toggle": "modal",
        "data-bs-target": `#${e.modal.id}`
      }
    ),
    /* @__PURE__ */ o(We, { modal: l, output: g })
  ] });
}
class Kn {
  constructor(t = {}) {
    const {
      id: n,
      title: s = "Contact Us",
      type: a = "AlloyInputTextIcon",
      className: i = "d-flex justify-content-center flex-column text-center h-100 mt-3",
      contactClass: r = "col-12 col-md-6",
      addressClass: d = "col-12 col-md-6",
      contactForm: u,
      addressCard: l,
      data: f,
      ...h
    } = t || {};
    this.id = n ?? S("contact"), this.title = s, this.type = a, this.className = i, this.contactClass = r, this.addressClass = d, this.contactForm = u instanceof ge ? u : new ge(u || {});
    const m = l && l.body ? l : {
      id: "contactAddressFallback",
      className: "card border-0",
      body: {
        id: "contactAddressFallbackBody",
        className: "card-body text-center text-muted",
        name: "Configure addressCard.body to show address info."
      }
    };
    this.addressCard = m instanceof be ? m : new be(m), this.data = f || {}, Object.assign(this, h);
  }
}
function ss({ contact: e, output: t }) {
  if (!e || !(e instanceof Kn))
    throw new Error(
      "AlloyContact requires `contact` (ContactObject instance)."
    );
  const n = (a) => {
    typeof t == "function" && t(a);
  };
  function s(a) {
    if (!a) return;
    const i = a instanceof B && typeof a.toJSON == "function" ? a.toJSON() : a || {}, r = new B({
      id: e.id,
      type: "contact",
      action: i.action || "submit",
      error: !!i.error,
      data: i.data || {}
    });
    n(r);
  }
  return /* @__PURE__ */ x("div", { id: e.id, className: e.className, children: [
    /* @__PURE__ */ o("h1", { className: "text-center mb-4", children: e.title }),
    /* @__PURE__ */ x("div", { className: "row d-flex align-items-center", children: [
      /* @__PURE__ */ o("div", { className: e.contactClass, children: /* @__PURE__ */ o(Bn, { form: e.contactForm, output: s }) }),
      /* @__PURE__ */ o("div", { className: e.addressClass, children: /* @__PURE__ */ o(Cn, { card: e.addressCard }) })
    ] })
  ] });
}
export {
  Ue as AlloyButton,
  Ce as AlloyButtonBar,
  te as AlloyButtonIcon,
  Ct as AlloyButtonSubmit,
  Cn as AlloyCard,
  kn as AlloyCardAction,
  Yn as AlloyCardIcon,
  An as AlloyCardIconAction,
  Zn as AlloyCardImage,
  On as AlloyCardImageAction,
  ss as AlloyContact,
  ts as AlloyCrudCard,
  es as AlloyCrudTable,
  ns as AlloyEmail,
  Bn as AlloyForm,
  V as AlloyIcon,
  de as AlloyInput,
  vt as AlloyLink,
  xe as AlloyLinkBar,
  Nt as AlloyLinkIcon,
  et as AlloyLinkLogo,
  We as AlloyModal,
  Qn as AlloyModalToast,
  In as AlloyNavBar,
  Xn as AlloyTabForm,
  Hn as AlloyTable,
  ft as AlloyTableAction,
  Gn as AlloyTableLink,
  Z as ButtonBarObject,
  q as ButtonIconObject,
  K as ButtonObject,
  we as ButtonSubmitObject,
  Re as CardActionObject,
  De as CardIconActionObject,
  En as CardIconObject,
  Me as CardImageActionObject,
  mt as CardImageObject,
  be as CardObject,
  Kn as ContactObject,
  qn as CrudCardObject,
  Pn as CrudTableObject,
  Vn as EmailObject,
  ge as FormObject,
  R as IconObject,
  W as InputObject,
  Y as LinkBarObject,
  ie as LinkIconObject,
  Q as LinkLogoObject,
  ae as LinkObject,
  I as ModalObject,
  Fn as ModalToastObject,
  kt as NavBarObject,
  Sn as TabFormObject,
  Ln as TabObject,
  ce as TableActionObject,
  wn as TableLinkObject,
  Ot as TableObject
};
//# sourceMappingURL=alloy-react.es.js.map
