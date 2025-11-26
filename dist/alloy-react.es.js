import { jsx as i, jsxs as A, Fragment as Se } from "react/jsx-runtime";
import * as $ from "react";
import re, { useRef as oe, useState as B, useMemo as fe, forwardRef as St, useImperativeHandle as Ot, useEffect as be, useCallback as Rn } from "react";
import "react-dom";
function M(e = "id") {
  const t = Date.now(), n = Math.random().toString(36).slice(2, 7);
  return `${e}-${t}-${n}`;
}
class ae {
  constructor(t = {}) {
    const { id: n, name: a, className: s } = t;
    this.id = n ?? M("tag"), this.name = a ?? "", this.className = s ?? "";
  }
}
class j {
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
      action: s = "",
      data: r = {},
      error: d = !1
    } = t || {}, o = typeof n < "u" ? n : r && typeof r.id < "u" ? r.id : "";
    this.id = o, this.type = a, this.action = s, this.error = !!d, this.data = { ...r };
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
  static ok({ id: t = "", type: n = "", action: a = "", data: s = {} } = {}) {
    return new j({
      id: t,
      type: n,
      action: a,
      error: !1,
      data: s
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
    message: s = "",
    data: r = {}
  } = {}) {
    const d = { ...r };
    return s && d.message == null && (d.message = String(s)), new j({
      id: t,
      type: n,
      action: a,
      error: !0,
      data: d
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
class et {
  constructor(t = {}) {
    this.id = t.id ?? M("logo"), this.imageUrl = t.imageUrl ?? "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png", this.alt = t.alt ?? "Alloymobile", this.width = t.width ?? "100%", this.height = t.height ?? "auto", this.className = t.className ?? "img-fluid d-block w-100 h-auto object-fit-contain";
  }
}
class ce {
  /**
   * @param {Object} block
   *   - id?: string
   *   - name?: string
   *   - className?: string         // inner styling
   *   - colClass?: string          // outer Bootstrap col (e.g. "col-12 col-md-6")
   *   - icon?: IconObject|{iconClass}
   *   - iconClass?: string         // shorthand
   *   - logo?: LogoObject|{imageUrl, alt, ...}
   *   - ariaLabel?: string
   */
  constructor(t = {}) {
    this.id = t.id ?? M("block"), this.name = typeof t.name == "string" ? t.name : "", this.className = t.className ?? "", this.colClass = t.colClass ?? "col-12", this.ariaLabel = typeof t.ariaLabel == "string" ? t.ariaLabel : this.name || "";
    const n = t.icon || (t.iconClass ? { iconClass: t.iconClass } : null);
    this.icon = n ? n instanceof K ? n : new K(n) : null;
    const a = t.logo || null;
    this.logo = a ? a instanceof et ? a : new et(a) : null;
  }
  hasLogo() {
    return !!this.logo;
  }
  hasIcon() {
    return !!this.icon;
  }
  hasText() {
    return !!(this.name && this.name.trim().length > 0);
  }
}
class K {
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
    this.id = t.id ?? M("icon"), this.iconClass = t.iconClass;
  }
}
function ie({ icon: e }) {
  if (!e) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ i("i", { id: e.id, className: e.iconClass, "aria-hidden": "true" });
}
function Ln(e = "", t = "") {
  const [n, a] = B(!1), [s, r] = B(!1), [d, o] = B(!1);
  return {
    className: fe(() => [e, (n || s || d) && t].filter(Boolean).join(" "), [e, t, n, s, d]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), r(!1);
      },
      onMouseDown: () => r(!0),
      onMouseUp: () => r(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class xe {
  /**
   * @param {LinkConfig} link
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkObject requires `href`.");
    if (!t.name)
      throw new Error("LinkObject requires `name`.");
    this.id = t.id ?? M("link"), this.name = t.name, this.href = t.href, this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function Ge({ link: e }) {
  if (!e || !(e instanceof xe))
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  const t = oe(e.id), { className: n, events: a } = Ln(e.className, e.active), s = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel;
  return /* @__PURE__ */ i(
    "a",
    {
      id: t.current,
      href: e.href,
      className: n,
      target: e.target,
      rel: s,
      onClick: e.onClick,
      title: e.title,
      ...a,
      children: /* @__PURE__ */ i("span", { children: e.name })
    }
  );
}
function In(e = "", t = "") {
  const [n, a] = B(!1), [s, r] = B(!1), [d, o] = B(!1);
  return {
    className: fe(() => [e, (n || s || d) && t].filter(Boolean).join(" "), [e, t, n, s, d]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), r(!1);
      },
      onMouseDown: () => r(!0),
      onMouseUp: () => r(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class Me {
  /**
   * @param {LinkIconConfig} linkIcon
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkIconObject requires `href`.");
    if (!t.icon)
      throw new Error("LinkIconObject requires `icon`.");
    const n = t.icon instanceof K ? t.icon : new K(t.icon);
    this.id = t.id ?? M("link-icon"), this.href = t.href, this.icon = n, this.name = t.name, this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function Bn({ linkIcon: e }) {
  if (!e || !(e instanceof Me))
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  const t = oe(e.id), { className: n, events: a } = In(
    e.className,
    e.active
  ), s = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, r = !!e.name;
  return /* @__PURE__ */ i(
    "a",
    {
      id: t.current,
      href: e.href,
      className: n,
      target: e.target,
      rel: s,
      onClick: e.onClick,
      title: e.title,
      ...a,
      children: /* @__PURE__ */ A("span", { className: "d-inline-flex align-items-center", children: [
        /* @__PURE__ */ i(ie, { icon: e.icon }),
        r && /* @__PURE__ */ i("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
function Mn(e = "", t = "") {
  const [n, a] = B(!1), [s, r] = B(!1), [d, o] = B(!1);
  return {
    className: fe(() => [e, (n || s || d) && t].filter(Boolean).join(" "), [e, t, n, s, d]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), r(!1);
      },
      onMouseDown: () => r(!0),
      onMouseUp: () => r(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class Oe {
  /**
   * @param {LinkLogoConfig} linkLogo
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkLogoObject requires `href`.");
    if (!t.logo)
      throw new Error("LinkLogoObject requires `logo`.");
    this.id = t.id ?? M("link-logo"), this.name = t.name, this.href = t.href, this.logo = t.logo, this.width = t.width, this.height = t.height, this.logoAlt = t.logoAlt ?? t.name ?? "", this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function dn({ linkLogo: e }) {
  if (!e || !(e instanceof Oe))
    throw new Error(
      "AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance)."
    );
  const t = oe(e.id), { className: n, events: a } = Mn(
    e.className,
    e.active
  ), s = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, r = !!e.name;
  return /* @__PURE__ */ i(
    "a",
    {
      id: t.current,
      href: e.href,
      className: n,
      target: e.target,
      rel: s,
      onClick: e.onClick,
      title: e.title,
      ...a,
      children: /* @__PURE__ */ A("span", { className: "d-inline-flex align-items-center", children: [
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
function $n(e = "", t = "") {
  const [n, a] = B(!1), [s, r] = B(!1), [d, o] = B(!1);
  return {
    className: fe(() => [e, (n || s || d) && t].filter(Boolean).join(" "), [e, t, n, s, d]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), r(!1);
      },
      onMouseDown: () => r(!0),
      onMouseUp: () => r(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class he {
  /**
   * @param {ButtonConfig} button
   */
  constructor(t = {}) {
    if (!t.name)
      throw new Error("ButtonObject requires `name`.");
    this.id = t.id ?? M("btn"), this.name = t.name, this.className = t.className ?? "btn btn-primary", this.active = t.active ?? "", this.disabled = !!t.disabled, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const st = St(function({ button: t, output: n }, a) {
  if (!t || !(t instanceof he))
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  const s = oe(null), r = oe(t.id), d = t.disabled, { className: o, events: c } = $n(
    t.className,
    t.active
  );
  Ot(
    a,
    () => ({
      el: s.current,
      model: t,
      focus: () => {
        var u;
        return (u = s.current) == null ? void 0 : u.focus();
      },
      click: () => {
        var u;
        return (u = s.current) == null ? void 0 : u.click();
      }
    }),
    [t]
  );
  const l = (u, p, w, E) => (g) => {
    if (p == null || p(g), E && typeof n == "function") {
      const x = j.ok({
        id: t.id,
        type: "button",
        action: w,
        data: {
          // keep payload minimal; we don't duplicate id here
          name: t.name
        }
      });
      n(x);
    }
    u == null || u(g, t);
  }, f = {
    // EMIT
    onClick: l(t.onClick, void 0, "click", !0),
    onMouseDown: l(void 0, c.onMouseDown, "mousedown", !0),
    // NO EMIT – just state + model handler
    onKeyDown: l(
      t.onKeyDown,
      c.onFocus,
      "keydown",
      !1
    ),
    onKeyUp: l(t.onKeyUp, void 0, "keyup", !1),
    onFocus: l(t.onFocus, c.onFocus, "focus", !1),
    onBlur: l(t.onBlur, c.onBlur, "blur", !1),
    onMouseEnter: l(
      t.onMouseEnter,
      c.onMouseEnter,
      "mouseenter",
      !1
    ),
    onMouseLeave: l(
      t.onMouseLeave,
      c.onMouseLeave,
      "mouseleave",
      !1
    ),
    onMouseUp: l(void 0, c.onMouseUp, "mouseup", !1)
  };
  return /* @__PURE__ */ i(
    "button",
    {
      id: r.current,
      ref: s,
      type: "button",
      className: o,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-disabled": d || void 0,
      disabled: d,
      tabIndex: t.tabIndex,
      ...f,
      children: /* @__PURE__ */ i("span", { className: "px-2 align-middle", children: t.name })
    }
  );
});
function _n(e = "", t = "") {
  const [n, a] = B(!1), [s, r] = B(!1), [d, o] = B(!1);
  return {
    className: fe(() => [e, (n || s || d) && t].filter(Boolean).join(" "), [e, t, n, s, d]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), r(!1);
      },
      onMouseDown: () => r(!0),
      onMouseUp: () => r(!1),
      onFocus: () => o(!0),
      onBlur: () => o(!1)
    }
  };
}
class se {
  /**
   * @param {ButtonIconConfig} btn
   */
  constructor(t = {}) {
    if (!t.icon)
      throw new Error("ButtonIconObject requires `icon`.");
    this.id = t.id ?? M("btn-icon"), this.name = t.name, this.className = t.className ?? "btn btn-primary", this.active = t.active ?? "", this.disabled = !!t.disabled;
    const n = this.name || "icon button";
    this.title = t.title ?? n, this.ariaLabel = t.ariaLabel ?? n, this.tabIndex = t.tabIndex, this.icon = t.icon instanceof K ? t.icon : new K(t.icon), this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const Ce = St(function({ buttonIcon: t, output: n }, a) {
  if (!t || !(t instanceof se))
    throw new Error(
      "AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance)."
    );
  const s = oe(null), r = oe(t.id), d = t.disabled, { className: o, events: c } = _n(
    t.className,
    t.active
  );
  Ot(
    a,
    () => ({
      el: s.current,
      model: t,
      focus: () => {
        var u;
        return (u = s.current) == null ? void 0 : u.focus();
      },
      click: () => {
        var u;
        return (u = s.current) == null ? void 0 : u.click();
      }
    }),
    [t]
  );
  const l = (u, p, w, E) => (g) => {
    if (p == null || p(g), E && typeof n == "function") {
      const x = j.ok({
        id: t.id,
        type: "button-icon",
        action: w,
        data: {
          name: t.name
        }
      });
      n(x);
    }
    u == null || u(g, t);
  }, f = {
    // EMIT
    onClick: l(t.onClick, void 0, "click", !0),
    onKeyDown: l(
      t.onKeyDown,
      c.onFocus,
      "keydown",
      !0
    ),
    // NO EMIT – just state + model handler
    onKeyUp: l(t.onKeyUp, void 0, "keyup", !1),
    onFocus: l(t.onFocus, c.onFocus, "focus", !1),
    onBlur: l(t.onBlur, c.onBlur, "blur", !1),
    onMouseEnter: l(
      t.onMouseEnter,
      c.onMouseEnter,
      "mouseenter",
      !1
    ),
    onMouseLeave: l(
      t.onMouseLeave,
      c.onMouseLeave,
      "mouseleave",
      !1
    ),
    onMouseDown: l(void 0, c.onMouseDown, "mousedown", !1),
    onMouseUp: l(void 0, c.onMouseUp, "mouseup", !1)
  };
  return /* @__PURE__ */ A(
    "button",
    {
      id: r.current,
      ref: s,
      type: "button",
      className: o,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-disabled": d || void 0,
      disabled: d,
      tabIndex: t.tabIndex,
      ...f,
      children: [
        /* @__PURE__ */ i("span", { className: "align-middle", children: /* @__PURE__ */ i(ie, { icon: t.icon }) }),
        t.name && /* @__PURE__ */ i("span", { className: "px-2 align-middle", children: t.name })
      ]
    }
  );
});
class $e {
  /**
   * @param {ButtonSubmitConfig} buttonSubmit
   */
  constructor(t = {}) {
    if (!t.name)
      throw new Error("ButtonSubmitObject requires `name`.");
    if (!t.icon)
      throw new Error("ButtonSubmitObject requires `icon`.");
    const n = t.icon instanceof K ? t.icon : new K(t.icon);
    this.id = t.id ?? M("btn-submit"), this.name = t.name, this.icon = n, this.className = t.className ?? "", this.disabled = !!t.disabled, this.loading = !!t.loading, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onMouseDown = t.onMouseDown, this.onKeyDown = t.onKeyDown;
  }
}
const un = St(function({ buttonSubmit: t, output: n }, a) {
  if (!t || !(t instanceof $e))
    throw new Error(
      "AlloyButtonSubmit requires `buttonSubmit` (ButtonSubmitObject instance)."
    );
  const s = oe(null), r = oe(t.id), [d, o] = B(!!t.loading), c = oe(!1);
  be(() => {
    const x = !!t.loading;
    o(x), x || (c.current = !1);
  }, [t.loading]);
  const l = t.disabled || d;
  Ot(
    a,
    () => ({
      el: s.current,
      model: t,
      focus: () => {
        var x;
        return (x = s.current) == null ? void 0 : x.focus();
      },
      click: () => {
        var x;
        return (x = s.current) == null ? void 0 : x.click();
      }
    }),
    [t]
  );
  const f = () => c.current || l ? !1 : (c.current = !0, t.loading = !0, t.disabled = !0, o(!0), !0), u = (x, N, y) => {
    if (typeof n == "function") {
      const h = new j({
        id: t.id,
        type: "button-submit",
        action: y,
        error: !1,
        data: {
          name: t.name
        }
      });
      n(h);
    }
    N == null || N(x, t);
  }, p = (x) => {
    f() && u(x, t.onClick, "click");
  }, w = (x) => {
    f() && u(x, t.onMouseDown, "mousedown");
  }, E = (x) => {
    const N = x.key;
    (N === "Enter" || N === " ") && f() && u(x, t.onKeyDown, "keydown");
  }, g = d;
  return /* @__PURE__ */ A(
    "button",
    {
      id: r.current,
      ref: s,
      type: "submit",
      className: t.className,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-busy": d || void 0,
      "aria-disabled": l || void 0,
      disabled: l,
      tabIndex: t.tabIndex,
      onClick: p,
      onMouseDown: w,
      onKeyDown: E,
      children: [
        g && /* @__PURE__ */ i("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ i(ie, { icon: t.icon }) }),
        /* @__PURE__ */ i("span", { className: g ? "px-2 align-middle" : "align-middle", children: t.name }),
        d ? /* @__PURE__ */ i("span", { className: "ms-2 visually-hidden", "aria-live": "polite", children: "Loading…" }) : null
      ]
    }
  );
});
class ue {
  /**
   * @param {InputConfig} config
   */
  constructor(t = {}) {
    const {
      id: n,
      name: a,
      type: s = "text",
      label: r = "",
      value: d,
      layout: o = "text",
      icon: c,
      placeholder: l = "",
      required: f = !1,
      minLength: u,
      maxLength: p,
      min: w,
      max: E,
      pattern: g,
      matchWith: x,
      passwordStrength: N,
      className: y,
      options: h = [],
      validators: b = [],
      iconGroupClass: m,
      ...C
    } = t;
    if (!a)
      throw new Error("InputObject requires `name`.");
    if ((o === "icon" || o === "floating") && !c)
      throw new Error(
        "InputObject with layout='icon' or 'floating' requires `icon`."
      );
    let v;
    typeof d < "u" ? v = d : s === "checkbox" ? v = [] : v = "";
    const O = c instanceof K ? c : c ? new K(c) : void 0;
    this.id = n ?? M("input"), this.name = a, this.type = s, this.label = r, this.value = v, this.layout = o, this.icon = O, this.placeholder = l;
    const k = "input-group-text";
    typeof m == "string" && m.trim() !== "" ? this.iconGroupClass = k + " " + m.trim() : this.iconGroupClass = k, this.required = !!f, this.minLength = u, this.maxLength = p, this.min = w, this.max = E, this.pattern = g, this.matchWith = x, this.passwordStrength = N, typeof y == "string" && y.trim() !== "" ? this.className = y.trim() : s === "select" ? this.className = "form-select" : s === "radio" || s === "checkbox" ? this.className = "form-check-input" : this.className = "form-control", this.options = h, this.validators = b, Object.assign(this, C);
  }
}
function Le({ input: e, output: t }) {
  const [n, a] = B(e.value), [s, r] = B(!1);
  be(() => {
    a(e.value), r(!1);
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
  const d = (m) => {
    const C = [], v = typeof m == "string" ? m.trim() : m;
    if (e.required) {
      const O = Array.isArray(v) && v.length === 0, k = !Array.isArray(v) && (v === "" || v === !1 || v == null);
      (O || k) && C.push("This field is required.");
    }
    return typeof v == "string" && e.minLength != null && v.length < e.minLength && C.push(`Minimum length is ${e.minLength}`), typeof v == "string" && e.maxLength != null && v.length > e.maxLength && C.push(`Maximum length is ${e.maxLength}`), typeof v == "string" && e.pattern && e.pattern !== "" && (new RegExp(e.pattern).test(v) || C.push("Invalid format.")), e.passwordStrength && typeof v == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(
      v
    ) || C.push("Password is too weak.")), C;
  }, o = d(n), c = s && o.length > 0, l = c && o.length > 0 && /* @__PURE__ */ i("div", { className: "mt-2", "aria-live": "polite", children: o.map((m, C) => /* @__PURE__ */ i(
    "div",
    {
      className: "alert alert-danger py-2 mb-2",
      role: "alert",
      children: m
    },
    C
  )) }), f = (m, C = "change") => {
    const v = d(m), O = v.length > 0;
    if (typeof t == "function") {
      const k = new j({
        id: e.id,
        type: "input",
        action: C,
        error: O,
        data: {
          name: e.name,
          value: m,
          errors: v
        }
      });
      t(k);
    }
  }, u = (m) => {
    const C = m.target.value;
    if (e.type === "checkbox") {
      const v = Array.isArray(n) ? [...n] : [], O = v.indexOf(C);
      O > -1 ? v.splice(O, 1) : v.push(C), a(v), f(v, "change");
    } else e.type, a(C), f(C, "change");
  }, p = () => {
    r(!0), f(n, "blur");
  }, w = {
    id: e.id,
    name: e.name,
    placeholder: e.placeholder,
    onBlur: p,
    "aria-invalid": c || void 0
  }, E = (m) => m + (c ? " is-invalid" : ""), g = () => /* @__PURE__ */ i(
    "textarea",
    {
      ...w,
      value: n,
      onChange: u,
      className: E(e.className)
    }
  ), x = () => /* @__PURE__ */ i(
    "select",
    {
      ...w,
      value: n,
      onChange: u,
      className: E(e.className),
      children: e.options.map((m) => /* @__PURE__ */ i("option", { value: m.value, children: m.label }, m.value))
    }
  ), N = () => /* @__PURE__ */ A("div", { children: [
    e.label && /* @__PURE__ */ i("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((m, C) => /* @__PURE__ */ A("div", { className: "form-check", children: [
      /* @__PURE__ */ i(
        "input",
        {
          type: "radio",
          id: `${e.id}_${C}`,
          className: E(e.className),
          name: e.name,
          value: m.value,
          checked: n === m.value,
          onChange: u,
          onBlur: p,
          "aria-invalid": c || void 0
        }
      ),
      /* @__PURE__ */ i(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${C}`,
          children: m.label
        }
      )
    ] }, C)),
    l
  ] }), y = () => /* @__PURE__ */ A("div", { children: [
    e.label && /* @__PURE__ */ i("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((m, C) => /* @__PURE__ */ A("div", { className: "form-check", children: [
      /* @__PURE__ */ i(
        "input",
        {
          type: "checkbox",
          id: `${e.id}_${C}`,
          className: E(e.className),
          name: e.name,
          value: m.value,
          checked: Array.isArray(n) && n.includes(m.value),
          onChange: u,
          onBlur: p,
          "aria-invalid": c || void 0
        }
      ),
      /* @__PURE__ */ i(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${C}`,
          children: m.label
        }
      )
    ] }, C)),
    l
  ] }), h = () => /* @__PURE__ */ i(
    "input",
    {
      ...w,
      type: e.type,
      value: n,
      onChange: u,
      className: E(e.className)
    }
  ), b = () => {
    switch (e.type) {
      case "textarea":
        return g();
      case "select":
        return x();
      case "radio":
        return N();
      case "checkbox":
        return y();
      default:
        return h();
    }
  };
  return e.layout === "floating" ? /* @__PURE__ */ A("div", { className: "mb-3", children: [
    /* @__PURE__ */ A("div", { className: "form-floating", children: [
      b(),
      /* @__PURE__ */ A("label", { htmlFor: e.id, children: [
        e.icon && /* @__PURE__ */ i(ie, { icon: e.icon }),
        e.icon && " ",
        e.label
      ] })
    ] }),
    !(e.type === "radio" || e.type === "checkbox") && l
  ] }) : e.layout === "icon" ? /* @__PURE__ */ A("div", { className: "m-2", children: [
    e.label && /* @__PURE__ */ i("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    /* @__PURE__ */ A("div", { className: "input-group", children: [
      /* @__PURE__ */ i("span", { className: e.iconGroupClass, children: /* @__PURE__ */ i(ie, { icon: e.icon }) }),
      ["radio", "checkbox"].includes(e.type) ? b() : /* @__PURE__ */ i(
        "input",
        {
          ...w,
          type: e.type,
          value: n,
          onChange: u,
          className: E(e.className)
        }
      )
    ] }),
    !(e.type === "radio" || e.type === "checkbox") && l
  ] }) : /* @__PURE__ */ A("div", { className: "mb-3", children: [
    ["text", "textarea", "number", "email", "password", "date"].includes(
      e.type
    ) && e.label && /* @__PURE__ */ i("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    b(),
    !(e.type === "radio" || e.type === "checkbox") && l
  ] });
}
class Pe {
  /**
   * @param {Object} response
   */
  constructor(t = {}) {
    const n = t || {};
    this.id = n.id ?? M("search"), this.className = n.className ?? "row mb-3", n.search instanceof ue ? this.search = n.search : n.search ? this.search = new ue(n.search) : this.search = new ue({
      id: "searchInput",
      name: "search",
      type: "text",
      layout: "icon",
      label: n.label ?? "Search",
      placeholder: n.placeholder ?? "Search…",
      icon: {
        iconClass: "fa-solid fa-magnifying-glass"
      },
      className: "form-control"
    }), this.minChars = typeof n.minChars == "number" && n.minChars >= 0 ? n.minChars : 2, this.debounceMs = typeof n.debounceMs == "number" && n.debounceMs >= 0 ? n.debounceMs : 400, this.results = Array.isArray(n.results) ? n.results : [];
    const a = {
      idKey: "id",
      labelKey: "label",
      descriptionKey: "description",
      iconKey: "iconClass"
    };
    this.resultConfig = {
      ...a,
      ...n.resultConfig || {}
    };
  }
}
function kt({ search: e, output: t }) {
  if (!e || !(e instanceof Pe))
    throw new Error("AlloySearch requires `search` (SearchObject instance).");
  const n = (l) => {
    typeof t == "function" && t(l);
  }, [a, s] = B(() => {
    var l;
    return typeof ((l = e.search) == null ? void 0 : l.value) < "u" ? String(e.search.value) : "";
  });
  be(() => {
    var f;
    const l = typeof ((f = e.search) == null ? void 0 : f.value) < "u" ? String(e.search.value) : "";
    s(l);
  }, [e]), be(() => {
    var p;
    const l = ((p = e.search) == null ? void 0 : p.name) ?? "search", f = (a || "").trim();
    if (!f || f.length < e.minChars)
      return;
    const u = setTimeout(() => {
      const w = { [l]: f }, E = j.ok({
        id: e.id,
        type: "search-bar",
        action: "search",
        data: w
      });
      n(E);
    }, e.debounceMs);
    return () => clearTimeout(u);
  }, [a, e, n]);
  const r = (l) => {
    var p;
    if (!l) return;
    const f = l instanceof j && typeof l.toJSON == "function" ? l.toJSON() : l, u = (p = f == null ? void 0 : f.data) == null ? void 0 : p.value;
    s(typeof u == "string" ? u : String(u ?? ""));
  }, d = fe(() => {
    const { resultConfig: l } = e, { idKey: f, labelKey: u, descriptionKey: p, iconKey: w } = l;
    return (e.results || []).map((E, g) => {
      if (typeof E == "string" || typeof E == "number")
        return {
          raw: E,
          id: String(g),
          label: String(E),
          description: "",
          iconClass: ""
        };
      const x = E || {}, N = x[f] ?? x.id ?? x.key ?? String(g), y = x[u] ?? x.name ?? x.title ?? x.subject ?? JSON.stringify(x), h = p ? x[p] : "", b = w && x[w] ? x[w] : "";
      return {
        raw: E,
        id: String(N),
        label: String(y),
        description: h ? String(h) : "",
        iconClass: b ? String(b) : ""
      };
    });
  }, [e.results, e.resultConfig]), o = d.length > 0, c = (l) => {
    var p;
    const f = ((p = e.search) == null ? void 0 : p.name) ?? "search", u = j.ok({
      id: e.id,
      type: "search-bar",
      action: "select",
      data: {
        [f]: (a || "").trim(),
        result: l.raw
        // send raw object/string back to parent
      }
    });
    n(u);
  };
  return /* @__PURE__ */ i("div", { id: e.id, className: e.className, children: /* @__PURE__ */ A("div", { className: "col-12", children: [
    /* @__PURE__ */ i(Le, { input: e.search, output: r }),
    o && /* @__PURE__ */ i("div", { className: "mt-2", children: /* @__PURE__ */ i("ul", { className: "list-group shadow-sm", children: d.map((l) => /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        className: "list-group-item list-group-item-action d-flex justify-content-between align-items-start",
        onClick: () => c(l),
        children: [
          /* @__PURE__ */ A("div", { className: "ms-0 me-auto", children: [
            /* @__PURE__ */ i("div", { className: "fw-semibold", children: l.label }),
            l.description && /* @__PURE__ */ i("small", { className: "text-muted", children: l.description })
          ] }),
          l.iconClass && /* @__PURE__ */ i("span", { className: "ms-2 text-secondary", children: /* @__PURE__ */ i("i", { className: l.iconClass, "aria-hidden": "true" }) })
        ]
      },
      l.id
    )) }) })
  ] }) });
}
class ge {
  /**
   * @param {LinkBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? M("linkBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyLink", this.linkClass = t.linkClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof ae ? this.title = t.title : t.title ? this.title = new ae(t.title) : this.title = new ae({});
    const n = Array.isArray(t.links) ? t.links : [];
    this.type === "AlloyLinkIcon" ? this.links = n.map(
      (a) => a instanceof Me ? a : new Me(a)
    ) : this.type === "AlloyLinkLogo" ? this.links = n.map(
      (a) => a instanceof Oe ? a : new Oe(a)
    ) : this.links = n.map(
      (a) => a instanceof xe ? a : new xe(a)
    );
  }
}
function Dn(e, t, n, a) {
  const s = n ? t : "";
  return e instanceof xe ? new xe({
    id: e.id,
    name: e.name,
    href: e.href,
    className: e.className,
    active: s,
    target: e.target,
    rel: e.rel,
    onClick: a,
    title: e.title
  }) : e instanceof Me ? new Me({
    id: e.id,
    href: e.href,
    icon: e.icon,
    name: e.name,
    className: e.className,
    active: s,
    target: e.target,
    rel: e.rel,
    onClick: a,
    title: e.title
  }) : e instanceof Oe ? new Oe({
    id: e.id,
    name: e.name,
    href: e.href,
    logo: e.logo,
    width: e.width,
    height: e.height,
    logoAlt: e.logoAlt,
    className: e.className,
    active: s,
    target: e.target,
    rel: e.rel,
    onClick: a,
    title: e.title
  }) : e;
}
function _e({ linkBar: e }) {
  if (!e || !(e instanceof ge))
    throw new Error("AlloyLinkBar requires `linkBar` (LinkBarObject instance).");
  const t = oe(e.id), [n, a] = B("");
  be(() => {
    a("");
  }, [e]);
  const s = () => e.title && e.title.name ? /* @__PURE__ */ i(
    "div",
    {
      id: e.title.id,
      className: e.title.className,
      children: e.title.name
    }
  ) : null;
  function r(o) {
    const c = o.onClick;
    return (l) => {
      const f = o.id || `${o.href || ""}-${o.name || ""}`;
      a(f), c == null || c(l);
    };
  }
  function d() {
    return /* @__PURE__ */ i("ul", { id: t.current, className: e.className, children: e.links.map((o, c) => {
      const l = ((o == null ? void 0 : o.id) ?? "") === n, f = Dn(
        o,
        e.selected,
        l,
        r(o)
      );
      switch (e.type) {
        case "AlloyLink":
          if (!(f instanceof xe))
            throw new Error(
              "AlloyLinkBar (type='AlloyLink') expects each link to be a LinkObject instance."
            );
          return /* @__PURE__ */ i(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ i(Ge, { link: f })
            },
            ((o == null ? void 0 : o.id) ?? c) + "-li"
          );
        case "AlloyLinkIcon":
          if (!(f instanceof Me))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkIcon') expects each link to be a LinkIconObject instance."
            );
          return /* @__PURE__ */ i(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ i(Bn, { linkIcon: f })
            },
            ((o == null ? void 0 : o.id) ?? c) + "-li"
          );
        case "AlloyLinkLogo":
          if (!(f instanceof Oe))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkLogo') expects each link to be a LinkLogoObject instance."
            );
          return /* @__PURE__ */ i(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ i(dn, { linkLogo: f })
            },
            ((o == null ? void 0 : o.id) ?? c) + "-li"
          );
        default:
          throw new Error(
            `Unsupported linkBar.type "${e.type}".`
          );
      }
    }) });
  }
  return /* @__PURE__ */ A("nav", { "data-type": e.type, children: [
    /* @__PURE__ */ i(s, {}),
    d()
  ] });
}
class Ee {
  /**
   * @param {ButtonBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? M("buttonBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyButton", this.buttonClass = t.buttonClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof ae ? this.title = t.title : t.title ? this.title = new ae(t.title) : this.title = new ae({});
    const n = Array.isArray(t.buttons) ? t.buttons : [];
    this.type === "AlloyButtonIcon" ? this.buttons = n.map(
      (a) => a instanceof se ? a : new se(a)
    ) : this.buttons = n.map(
      (a) => a instanceof he ? a : new he(a)
    );
  }
}
function _t(e, t, n, a, s) {
  const r = n ? t : "";
  function d(o) {
    var f, u;
    if (!o)
      return;
    if ((o.action || ((f = o == null ? void 0 : o.data) == null ? void 0 : f.event) || "") === "click") {
      const p = ((u = o == null ? void 0 : o.data) == null ? void 0 : u.id) ?? "";
      p && a(p);
    }
    s == null || s(o);
  }
  return e instanceof he ? { model: new he({
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
  }), onAnyEvent: d } : e instanceof se ? { model: new se({
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
  }), onAnyEvent: d } : { model: e, onAnyEvent: d };
}
function rt({ buttonBar: e, output: t }) {
  if (!e || !(e instanceof Ee))
    throw new Error(
      "AlloyButtonBar requires `buttonBar` (ButtonBarObject instance)."
    );
  const n = oe(e.id), [a, s] = B("");
  be(() => {
    s("");
  }, [e]);
  const r = () => e.title && e.title.name ? /* @__PURE__ */ i("div", { id: e.title.id, className: e.title.className, children: e.title.name }) : null;
  function d() {
    return /* @__PURE__ */ i(
      "ul",
      {
        id: n.current,
        className: `${e.className} list-unstyled`,
        style: { listStyle: "none", paddingLeft: 0, marginBottom: 0 },
        children: e.buttons.map((l, f) => {
          if (!(l instanceof he))
            throw new Error(
              "AlloyButtonBar (type='AlloyButton') expects ButtonObject items."
            );
          const u = ((l == null ? void 0 : l.id) ?? "") === a, { model: p, onAnyEvent: w } = _t(
            l,
            e.selected,
            u,
            s,
            t
          );
          return /* @__PURE__ */ i(
            "li",
            {
              className: e.buttonClass,
              children: /* @__PURE__ */ i(st, { button: p, output: w })
            },
            ((l == null ? void 0 : l.id) ?? f) + "-li"
          );
        })
      }
    );
  }
  function o() {
    return /* @__PURE__ */ i(
      "ul",
      {
        id: n.current,
        className: `${e.className} list-unstyled`,
        style: { listStyle: "none", paddingLeft: 0, marginBottom: 0 },
        children: e.buttons.map((l, f) => {
          if (!(l instanceof se))
            throw new Error(
              "AlloyButtonBar (type='AlloyButtonIcon') expects ButtonIconObject items."
            );
          const u = ((l == null ? void 0 : l.id) ?? "") === a, { model: p, onAnyEvent: w } = _t(
            l,
            e.selected,
            u,
            s,
            t
          );
          return /* @__PURE__ */ i(
            "li",
            {
              className: e.buttonClass,
              children: /* @__PURE__ */ i(Ce, { buttonIcon: p, output: w })
            },
            ((l == null ? void 0 : l.id) ?? f) + "-li"
          );
        })
      }
    );
  }
  function c() {
    switch (e.type) {
      case "AlloyButtonIcon":
        return o();
      case "AlloyButton":
      default:
        return d();
    }
  }
  return /* @__PURE__ */ A("nav", { "data-type": e.type, children: [
    /* @__PURE__ */ i(r, {}),
    c()
  ] });
}
class qn {
  /**
   * @param {NavBarConfig} nav = {}
   */
  constructor(t = {}) {
    if (this.id = t.id ?? M("navbar"), this.className = t.className ?? "navbar navbar-expand-lg navbar-light bg-light", t.logo instanceof Oe)
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
      this.logo = new Oe(n);
    }
    if (t.linkBar instanceof ge)
      this.linkBar = t.linkBar;
    else {
      const n = t.linkBar ?? {};
      this.linkBar = new ge({
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
function Ds({ navBar: e }) {
  if (!e || !(e instanceof qn))
    throw new Error("AlloyNavBar requires `navBar` (NavBarObject instance).");
  const t = oe(e.id), n = `${t.current}-collapse`;
  return /* @__PURE__ */ i("nav", { id: t.current, className: e.className, children: /* @__PURE__ */ A("div", { className: "container-fluid", children: [
    /* @__PURE__ */ i(dn, { linkLogo: e.logo }),
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
        children: /* @__PURE__ */ i(_e, { linkBar: e.linkBar })
      }
    )
  ] }) });
}
function Fn(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
class Un {
  /**
   * @param {TableConfig} table
   */
  constructor(t = {}) {
    this.id = t.id ?? M("table"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [];
    const n = { iconClass: "fa-solid fa-user" }, a = { iconClass: "fa-solid fa-arrow-down" }, s = t.icon instanceof K ? t.icon : new K(t.icon || n), r = t.sort instanceof K ? t.sort : new K(t.sort || a);
    this.icon = s, this.sort = r;
  }
}
function Wn(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function qs({ table: e, output: t }) {
  if (!e || !(e instanceof Un))
    throw new Error("AlloyTable requires `table` (TableObject instance).");
  const n = oe(e.id), [a, s] = B({ col: "", dir: "asc" }), r = fe(
    () => Wn(e.rows),
    [e.rows]
  ), d = (c) => {
    if (!c) return;
    const l = a.col === c && a.dir === "asc" ? "desc" : "asc";
    s({ col: c, dir: l }), t == null || t({
      type: "column",
      name: c,
      dir: l
    });
  }, o = (c) => {
    t == null || t({
      type: "row",
      id: c
    });
  };
  return /* @__PURE__ */ A("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ i("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ i("thead", { children: /* @__PURE__ */ A("tr", { children: [
      /* @__PURE__ */ i("th", { scope: "col", children: "Type" }),
      r.map((c) => {
        const l = a.col === c, f = l && a.dir === "desc";
        return /* @__PURE__ */ i("th", { scope: "col", children: /* @__PURE__ */ A(
          "span",
          {
            onClick: () => d(c),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              Fn(c),
              l && /* @__PURE__ */ i(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: f ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: f ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ i(ie, { icon: e.sort })
                }
              )
            ]
          }
        ) }, c);
      })
    ] }) }),
    /* @__PURE__ */ i("tbody", { children: e.rows.length > 0 ? e.rows.map((c, l) => /* @__PURE__ */ A(
      "tr",
      {
        onClick: () => o(c == null ? void 0 : c.id),
        style: { cursor: "pointer" },
        children: [
          /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i(ie, { icon: e.icon }) }),
          r.map((f) => /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i("span", { children: c == null ? void 0 : c[f] }) }, `${(c == null ? void 0 : c.id) ?? l}-${f}`))
        ]
      },
      (c == null ? void 0 : c.id) ?? l
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
function bt() {
  return bt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, bt.apply(this, arguments);
}
var Dt;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(Dt || (Dt = {}));
function ne(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function Ke(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function Nt(e) {
  let {
    pathname: t = "/",
    search: n = "",
    hash: a = ""
  } = e;
  return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n), a && a !== "#" && (t += a.charAt(0) === "#" ? a : "#" + a), t;
}
function fn(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
    let a = e.indexOf("?");
    a >= 0 && (t.search = e.substr(a), e = e.substr(0, a)), e && (t.pathname = e);
  }
  return t;
}
var qt;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(qt || (qt = {}));
function Ft(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [n, a] = Kn(e.path, e.caseSensitive, e.end), s = t.match(n);
  if (!s) return null;
  let r = s[0], d = r.replace(/(.)\/+$/, "$1"), o = s.slice(1);
  return {
    params: a.reduce((l, f, u) => {
      let {
        paramName: p,
        isOptional: w
      } = f;
      if (p === "*") {
        let g = o[u] || "";
        d = r.slice(0, r.length - g.length).replace(/(.)\/+$/, "$1");
      }
      const E = o[u];
      return w && !E ? l[p] = void 0 : l[p] = (E || "").replace(/%2F/g, "/"), l;
    }, {}),
    pathname: r,
    pathnameBase: d,
    pattern: e
  };
}
function Kn(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !0), Ke(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let a = [], s = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (d, o, c) => (a.push({
    paramName: o,
    isOptional: c != null
  }), c ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (a.push({
    paramName: "*"
  }), s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? s += "\\/*$" : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, t ? void 0 : "i"), a];
}
function De(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length, a = e.charAt(n);
  return a && a !== "/" ? null : e.slice(n) || "/";
}
function Jn(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: a = "",
    hash: s = ""
  } = typeof e == "string" ? fn(e) : e;
  return {
    pathname: n ? n.startsWith("/") ? n : Vn(n, t) : t,
    search: zn(a),
    hash: Hn(s)
  };
}
function Vn(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? n.length > 1 && n.pop() : s !== "." && n.push(s);
  }), n.length > 1 ? n.join("/") : "/";
}
function lt(e, t, n, a) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(a) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Yn(e) {
  return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0);
}
function mn(e, t) {
  let n = Yn(e);
  return t ? n.map((a, s) => s === n.length - 1 ? a.pathname : a.pathnameBase) : n.map((a) => a.pathnameBase);
}
function hn(e, t, n, a) {
  a === void 0 && (a = !1);
  let s;
  typeof e == "string" ? s = fn(e) : (s = bt({}, e), ne(!s.pathname || !s.pathname.includes("?"), lt("?", "pathname", "search", s)), ne(!s.pathname || !s.pathname.includes("#"), lt("#", "pathname", "hash", s)), ne(!s.search || !s.search.includes("#"), lt("#", "search", "hash", s)));
  let r = e === "" || s.pathname === "", d = r ? "/" : s.pathname, o;
  if (d == null)
    o = n;
  else {
    let u = t.length - 1;
    if (!a && d.startsWith("..")) {
      let p = d.split("/");
      for (; p[0] === ".."; )
        p.shift(), u -= 1;
      s.pathname = p.join("/");
    }
    o = u >= 0 ? t[u] : "/";
  }
  let c = Jn(s, o), l = d && d !== "/" && d.endsWith("/"), f = (r || d === ".") && n.endsWith("/");
  return !c.pathname.endsWith("/") && (l || f) && (c.pathname += "/"), c;
}
const jt = (e) => e.join("/").replace(/\/\/+/g, "/"), zn = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Hn = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, pn = ["post", "put", "patch", "delete"];
new Set(pn);
const Gn = ["get", ...pn];
new Set(Gn);
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
function wt() {
  return wt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, wt.apply(this, arguments);
}
const it = /* @__PURE__ */ $.createContext(null);
process.env.NODE_ENV !== "production" && (it.displayName = "DataRouter");
const yn = /* @__PURE__ */ $.createContext(null);
process.env.NODE_ENV !== "production" && (yn.displayName = "DataRouterState");
const Qn = /* @__PURE__ */ $.createContext(null);
process.env.NODE_ENV !== "production" && (Qn.displayName = "Await");
const Ae = /* @__PURE__ */ $.createContext(null);
process.env.NODE_ENV !== "production" && (Ae.displayName = "Navigation");
const Pt = /* @__PURE__ */ $.createContext(null);
process.env.NODE_ENV !== "production" && (Pt.displayName = "Location");
const Fe = /* @__PURE__ */ $.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (Fe.displayName = "Route");
const Xn = /* @__PURE__ */ $.createContext(null);
process.env.NODE_ENV !== "production" && (Xn.displayName = "RouteError");
function Zn(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t;
  Tt() || (process.env.NODE_ENV !== "production" ? ne(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : ne(!1));
  let {
    basename: a,
    navigator: s
  } = $.useContext(Ae), {
    hash: r,
    pathname: d,
    search: o
  } = Ve(e, {
    relative: n
  }), c = d;
  return a !== "/" && (c = d === "/" ? a : jt([a, d])), s.createHref({
    pathname: c,
    search: o,
    hash: r
  });
}
function Tt() {
  return $.useContext(Pt) != null;
}
function Je() {
  return Tt() || (process.env.NODE_ENV !== "production" ? ne(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : ne(!1)), $.useContext(Pt).location;
}
const vn = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function gn(e) {
  $.useContext(Ae).static || $.useLayoutEffect(e);
}
function ea() {
  let {
    isDataRoute: e
  } = $.useContext(Fe);
  return e ? ra() : ta();
}
function ta() {
  Tt() || (process.env.NODE_ENV !== "production" ? ne(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : ne(!1));
  let e = $.useContext(it), {
    basename: t,
    future: n,
    navigator: a
  } = $.useContext(Ae), {
    matches: s
  } = $.useContext(Fe), {
    pathname: r
  } = Je(), d = JSON.stringify(mn(s, n.v7_relativeSplatPath)), o = $.useRef(!1);
  return gn(() => {
    o.current = !0;
  }), $.useCallback(function(l, f) {
    if (f === void 0 && (f = {}), process.env.NODE_ENV !== "production" && Ke(o.current, vn), !o.current) return;
    if (typeof l == "number") {
      a.go(l);
      return;
    }
    let u = hn(l, JSON.parse(d), r, f.relative === "path");
    e == null && t !== "/" && (u.pathname = u.pathname === "/" ? t : jt([t, u.pathname])), (f.replace ? a.replace : a.push)(u, f.state, f);
  }, [t, a, d, r, e]);
}
function Ve(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    future: a
  } = $.useContext(Ae), {
    matches: s
  } = $.useContext(Fe), {
    pathname: r
  } = Je(), d = JSON.stringify(mn(s, a.v7_relativeSplatPath));
  return $.useMemo(() => hn(e, JSON.parse(d), r, n === "path"), [e, d, r, n]);
}
var bn = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(bn || {}), Rt = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(Rt || {});
function Nn(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function na(e) {
  let t = $.useContext(it);
  return t || (process.env.NODE_ENV !== "production" ? ne(!1, Nn(e)) : ne(!1)), t;
}
function aa(e) {
  let t = $.useContext(Fe);
  return t || (process.env.NODE_ENV !== "production" ? ne(!1, Nn(e)) : ne(!1)), t;
}
function wn(e) {
  let t = aa(e), n = t.matches[t.matches.length - 1];
  return n.route.id || (process.env.NODE_ENV !== "production" ? ne(!1, e + ' can only be used on routes that contain a unique "id"') : ne(!1)), n.route.id;
}
function sa() {
  return wn(Rt.UseRouteId);
}
function ra() {
  let {
    router: e
  } = na(bn.UseNavigateStable), t = wn(Rt.UseNavigateStable), n = $.useRef(!1);
  return gn(() => {
    n.current = !0;
  }), $.useCallback(function(s, r) {
    r === void 0 && (r = {}), process.env.NODE_ENV !== "production" && Ke(n.current, vn), n.current && (typeof s == "number" ? e.navigate(s) : e.navigate(s, wt({
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
function qe() {
  return qe = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, qe.apply(this, arguments);
}
function Lt(e, t) {
  if (e == null) return {};
  var n = {}, a = Object.keys(e), s, r;
  for (r = 0; r < a.length; r++)
    s = a[r], !(t.indexOf(s) >= 0) && (n[s] = e[s]);
  return n;
}
const Qe = "get", Xe = "application/x-www-form-urlencoded";
function ot(e) {
  return e != null && typeof e.tagName == "string";
}
function ia(e) {
  return ot(e) && e.tagName.toLowerCase() === "button";
}
function oa(e) {
  return ot(e) && e.tagName.toLowerCase() === "form";
}
function ca(e) {
  return ot(e) && e.tagName.toLowerCase() === "input";
}
function la(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function da(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !la(e);
}
let ze = null;
function ua() {
  if (ze === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), ze = !1;
    } catch {
      ze = !0;
    }
  return ze;
}
const fa = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function dt(e) {
  return e != null && !fa.has(e) ? (process.env.NODE_ENV !== "production" && Ke(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + Xe + '"')), null) : e;
}
function ma(e, t) {
  let n, a, s, r, d;
  if (oa(e)) {
    let o = e.getAttribute("action");
    a = o ? De(o, t) : null, n = e.getAttribute("method") || Qe, s = dt(e.getAttribute("enctype")) || Xe, r = new FormData(e);
  } else if (ia(e) || ca(e) && (e.type === "submit" || e.type === "image")) {
    let o = e.form;
    if (o == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let c = e.getAttribute("formaction") || o.getAttribute("action");
    if (a = c ? De(c, t) : null, n = e.getAttribute("formmethod") || o.getAttribute("method") || Qe, s = dt(e.getAttribute("formenctype")) || dt(o.getAttribute("enctype")) || Xe, r = new FormData(o, e), !ua()) {
      let {
        name: l,
        type: f,
        value: u
      } = e;
      if (f === "image") {
        let p = l ? l + "." : "";
        r.append(p + "x", "0"), r.append(p + "y", "0");
      } else l && r.append(l, u);
    }
  } else {
    if (ot(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    n = Qe, a = null, s = Xe, d = e;
  }
  return r && s === "text/plain" && (d = r, r = void 0), {
    action: a,
    method: n.toLowerCase(),
    encType: s,
    formData: r,
    body: d
  };
}
const ha = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], pa = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], ya = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], va = "6";
try {
  window.__reactRouterVersion = va;
} catch {
}
const xn = /* @__PURE__ */ $.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (xn.displayName = "ViewTransition");
const ga = /* @__PURE__ */ $.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (ga.displayName = "Fetchers");
process.env.NODE_ENV;
const ba = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Na = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Ie = /* @__PURE__ */ $.forwardRef(function(t, n) {
  let {
    onClick: a,
    relative: s,
    reloadDocument: r,
    replace: d,
    state: o,
    target: c,
    to: l,
    preventScrollReset: f,
    viewTransition: u
  } = t, p = Lt(t, ha), {
    basename: w
  } = $.useContext(Ae), E, g = !1;
  if (typeof l == "string" && Na.test(l) && (E = l, ba))
    try {
      let h = new URL(window.location.href), b = l.startsWith("//") ? new URL(h.protocol + l) : new URL(l), m = De(b.pathname, w);
      b.origin === h.origin && m != null ? l = m + b.search + b.hash : g = !0;
    } catch {
      process.env.NODE_ENV !== "production" && Ke(!1, '<Link to="' + l + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let x = Zn(l, {
    relative: s
  }), N = Ea(l, {
    replace: d,
    state: o,
    target: c,
    preventScrollReset: f,
    relative: s,
    viewTransition: u
  });
  function y(h) {
    a && a(h), h.defaultPrevented || N(h);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ $.createElement("a", qe({}, p, {
      href: E || x,
      onClick: g || r ? a : y,
      ref: n,
      target: c
    }))
  );
});
process.env.NODE_ENV !== "production" && (Ie.displayName = "Link");
const wa = /* @__PURE__ */ $.forwardRef(function(t, n) {
  let {
    "aria-current": a = "page",
    caseSensitive: s = !1,
    className: r = "",
    end: d = !1,
    style: o,
    to: c,
    viewTransition: l,
    children: f
  } = t, u = Lt(t, pa), p = Ve(c, {
    relative: u.relative
  }), w = Je(), E = $.useContext(yn), {
    navigator: g,
    basename: x
  } = $.useContext(Ae), N = E != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Pa(p) && l === !0, y = g.encodeLocation ? g.encodeLocation(p).pathname : p.pathname, h = w.pathname, b = E && E.navigation && E.navigation.location ? E.navigation.location.pathname : null;
  s || (h = h.toLowerCase(), b = b ? b.toLowerCase() : null, y = y.toLowerCase()), b && x && (b = De(b, x) || b);
  const m = y !== "/" && y.endsWith("/") ? y.length - 1 : y.length;
  let C = h === y || !d && h.startsWith(y) && h.charAt(m) === "/", v = b != null && (b === y || !d && b.startsWith(y) && b.charAt(y.length) === "/"), O = {
    isActive: C,
    isPending: v,
    isTransitioning: N
  }, k = C ? a : void 0, I;
  typeof r == "function" ? I = r(O) : I = [r, C ? "active" : null, v ? "pending" : null, N ? "transitioning" : null].filter(Boolean).join(" ");
  let L = typeof o == "function" ? o(O) : o;
  return /* @__PURE__ */ $.createElement(Ie, qe({}, u, {
    "aria-current": k,
    className: I,
    ref: n,
    style: L,
    to: c,
    viewTransition: l
  }), typeof f == "function" ? f(O) : f);
});
process.env.NODE_ENV !== "production" && (wa.displayName = "NavLink");
const xa = /* @__PURE__ */ $.forwardRef((e, t) => {
  let {
    fetcherKey: n,
    navigate: a,
    reloadDocument: s,
    replace: r,
    state: d,
    method: o = Qe,
    action: c,
    onSubmit: l,
    relative: f,
    preventScrollReset: u,
    viewTransition: p
  } = e, w = Lt(e, ya), E = ka(), g = ja(c, {
    relative: f
  }), x = o.toLowerCase() === "get" ? "get" : "post", N = (y) => {
    if (l && l(y), y.defaultPrevented) return;
    y.preventDefault();
    let h = y.nativeEvent.submitter, b = (h == null ? void 0 : h.getAttribute("formmethod")) || o;
    E(h || y.currentTarget, {
      fetcherKey: n,
      method: b,
      navigate: a,
      replace: r,
      state: d,
      relative: f,
      preventScrollReset: u,
      viewTransition: p
    });
  };
  return /* @__PURE__ */ $.createElement("form", qe({
    ref: t,
    method: x,
    action: g,
    onSubmit: s ? l : N
  }, w));
});
process.env.NODE_ENV !== "production" && (xa.displayName = "Form");
process.env.NODE_ENV;
var tt;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(tt || (tt = {}));
var Ut;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Ut || (Ut = {}));
function Ca(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Cn(e) {
  let t = $.useContext(it);
  return t || (process.env.NODE_ENV !== "production" ? ne(!1, Ca(e)) : ne(!1)), t;
}
function Ea(e, t) {
  let {
    target: n,
    replace: a,
    state: s,
    preventScrollReset: r,
    relative: d,
    viewTransition: o
  } = t === void 0 ? {} : t, c = ea(), l = Je(), f = Ve(e, {
    relative: d
  });
  return $.useCallback((u) => {
    if (da(u, n)) {
      u.preventDefault();
      let p = a !== void 0 ? a : Nt(l) === Nt(f);
      c(e, {
        replace: p,
        state: s,
        preventScrollReset: r,
        relative: d,
        viewTransition: o
      });
    }
  }, [l, c, f, a, s, n, e, r, d, o]);
}
function Aa() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let Sa = 0, Oa = () => "__" + String(++Sa) + "__";
function ka() {
  let {
    router: e
  } = Cn(tt.UseSubmit), {
    basename: t
  } = $.useContext(Ae), n = sa();
  return $.useCallback(function(a, s) {
    s === void 0 && (s = {}), Aa();
    let {
      action: r,
      method: d,
      encType: o,
      formData: c,
      body: l
    } = ma(a, t);
    if (s.navigate === !1) {
      let f = s.fetcherKey || Oa();
      e.fetch(f, n, s.action || r, {
        preventScrollReset: s.preventScrollReset,
        formData: c,
        body: l,
        formMethod: s.method || d,
        formEncType: s.encType || o,
        flushSync: s.flushSync
      });
    } else
      e.navigate(s.action || r, {
        preventScrollReset: s.preventScrollReset,
        formData: c,
        body: l,
        formMethod: s.method || d,
        formEncType: s.encType || o,
        replace: s.replace,
        state: s.state,
        fromRouteId: n,
        flushSync: s.flushSync,
        viewTransition: s.viewTransition
      });
  }, [e, t, n]);
}
function ja(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    basename: a
  } = $.useContext(Ae), s = $.useContext(Fe);
  s || (process.env.NODE_ENV !== "production" ? ne(!1, "useFormAction must be used inside a RouteContext") : ne(!1));
  let [r] = s.matches.slice(-1), d = qe({}, Ve(e || ".", {
    relative: n
  })), o = Je();
  if (e == null) {
    d.search = o.search;
    let c = new URLSearchParams(d.search), l = c.getAll("index");
    if (l.some((u) => u === "")) {
      c.delete("index"), l.filter((p) => p).forEach((p) => c.append("index", p));
      let u = c.toString();
      d.search = u ? "?" + u : "";
    }
  }
  return (!e || e === ".") && r.route.index && (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"), a !== "/" && (d.pathname = d.pathname === "/" ? a : jt([a, d.pathname])), Nt(d);
}
function Pa(e, t) {
  t === void 0 && (t = {});
  let n = $.useContext(xn);
  n == null && (process.env.NODE_ENV !== "production" ? ne(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : ne(!1));
  let {
    basename: a
  } = Cn(tt.useViewTransitionState), s = Ve(e, {
    relative: t.relative
  });
  if (!n.isTransitioning)
    return !1;
  let r = De(n.currentLocation.pathname, a) || n.currentLocation.pathname, d = De(n.nextLocation.pathname, a) || n.nextLocation.pathname;
  return Ft(s.pathname, d) != null || Ft(s.pathname, r) != null;
}
function Ta(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
class Ra {
  /**
   * @param {TableLinkConfig} tableLink
   */
  constructor(t = {}) {
    if (!t.link)
      throw new Error("TableLinkObject requires `link` (base route).");
    this.id = t.id ?? M("table-link"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = t.link;
    const n = { iconClass: "fa-solid fa-user" }, a = { iconClass: "fa-solid fa-arrow-down" };
    this.icon = t.icon instanceof K ? t.icon : new K(t.icon || n), this.sort = t.sort instanceof K ? t.sort : new K(t.sort || a);
  }
}
function La(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function Fs({ tableLink: e, output: t }) {
  if (!e || !(e instanceof Ra))
    throw new Error(
      "AlloyTableLink requires `tableLink` (TableLinkObject instance)."
    );
  const n = oe(e.id), [a, s] = B({ col: "", dir: "asc" }), r = fe(
    () => La(e.rows),
    [e.rows]
  ), d = (o) => {
    if (!o) return;
    const c = a.col === o && a.dir === "asc" ? "desc" : "asc";
    s({ col: o, dir: c }), t == null || t({
      type: "column",
      name: o,
      dir: c
    });
  };
  return /* @__PURE__ */ A("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ i("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ i("thead", { children: /* @__PURE__ */ A("tr", { children: [
      /* @__PURE__ */ i("th", { scope: "col", children: "Type" }),
      r.map((o) => {
        const c = a.col === o, l = c && a.dir === "desc";
        return /* @__PURE__ */ i("th", { scope: "col", children: /* @__PURE__ */ A(
          "span",
          {
            onClick: () => d(o),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              Ta(o),
              c && /* @__PURE__ */ i(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: l ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: l ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ i(ie, { icon: e.sort })
                }
              )
            ]
          }
        ) }, o);
      })
    ] }) }),
    /* @__PURE__ */ i("tbody", { children: e.rows.length > 0 ? e.rows.map((o, c) => {
      const l = (o == null ? void 0 : o.id) ?? c, u = `${e.link.endsWith("/") ? e.link.slice(0, -1) : e.link}/${l}`;
      return /* @__PURE__ */ A("tr", { children: [
        /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i(ie, { icon: e.icon }) }),
        r.map((p) => /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i(
          Ie,
          {
            to: u,
            className: "text-decoration-none",
            onClick: () => t == null ? void 0 : t({
              type: "navigate",
              to: u,
              id: l
            }),
            children: /* @__PURE__ */ i("span", { children: o == null ? void 0 : o[p] })
          }
        ) }, `${l}-${p}`))
      ] }, l);
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
function Ia(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
function Ba(e) {
  if (!Array.isArray(e) || e.length === 0) return [];
  const t = e[0] ?? {};
  return Object.keys(t).filter((n) => n !== "id");
}
function Ma(e) {
  if (!e || typeof e != "object") return "";
  const t = typeof e.name == "string" ? e.name.trim() : "";
  if (t) return t;
  const n = typeof e.ariaLabel == "string" ? e.ariaLabel.trim() : "";
  if (n) return n;
  const a = typeof e.title == "string" ? e.title.trim() : "";
  if (a) return a;
  const s = typeof e.id == "string" ? e.id.trim() : "";
  return s || "";
}
class Te {
  /**
   * @param {Object} cfg
   */
  constructor(t = {}) {
    this.id = t.id ?? M("table-action"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = typeof t.link == "string" ? t.link : "";
    const n = new K({ iconClass: "fa-solid fa-user" }), a = new K({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = t.icon instanceof K ? t.icon : new K(t.icon || n), this.sort = t.sort instanceof K ? t.sort : new K(t.sort || a), this.actions = t.actions ? t.actions instanceof Ee ? t.actions : new Ee(t.actions) : void 0;
  }
}
function It({ tableAction: e, output: t }) {
  if (!e || !(e instanceof Te))
    throw new Error(
      "AlloyTableAction requires `tableAction` (TableActionObject instance)."
    );
  const n = oe(e.id), a = fe(
    () => Ba(e.rows),
    [e.rows]
  ), [s, r] = B({ col: "", dir: "asc" });
  function d(l) {
    const f = s.col === l && s.dir === "asc" ? "desc" : "asc";
    r({ col: l, dir: f });
    const u = new j({
      id: n.current,
      type: "column",
      action: "Sort",
      error: !1,
      data: {
        name: l,
        dir: f
      }
    });
    t == null || t(u);
  }
  function o(l) {
    return (f, u) => {
      const p = Ma(f), w = new j({
        id: n.current,
        type: "table",
        action: p,
        error: !1,
        data: l
      });
      t == null || t(w);
    };
  }
  const c = !!e.actions;
  return /* @__PURE__ */ A("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ i("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ i("thead", { children: /* @__PURE__ */ A("tr", { children: [
      /* @__PURE__ */ i("th", { scope: "col", children: "Type" }),
      a.map((l) => {
        const f = s.col === l, u = f && s.dir === "desc";
        return /* @__PURE__ */ i("th", { scope: "col", children: /* @__PURE__ */ A(
          "span",
          {
            onClick: () => d(l),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              Ia(l),
              f && /* @__PURE__ */ i(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: u ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: u ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ i(ie, { icon: e.sort })
                }
              )
            ]
          }
        ) }, `h-${l}`);
      }),
      c && /* @__PURE__ */ i("th", { scope: "col", className: "text-end", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ i("tbody", { children: e.rows.length > 0 ? e.rows.map((l, f) => {
      const u = (l == null ? void 0 : l.id) ?? f, p = e.actions;
      return /* @__PURE__ */ A("tr", { children: [
        /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i(ie, { icon: e.icon }) }),
        a.map((w) => {
          const E = e.link || "", g = E.endsWith("/") ? E.slice(0, -1) : E, x = g ? `${g}/${u}` : "";
          return /* @__PURE__ */ i("td", { children: g ? /* @__PURE__ */ i(
            Ie,
            {
              to: x,
              onClick: () => {
                const N = new j({
                  id: n.current,
                  type: "row",
                  action: "navigate",
                  error: !1,
                  data: {
                    to: x,
                    ...l
                  }
                });
                t == null || t(N);
              },
              className: "text-decoration-none",
              children: /* @__PURE__ */ i("span", { children: l == null ? void 0 : l[w] })
            }
          ) : /* @__PURE__ */ i("span", { children: l == null ? void 0 : l[w] }) }, `${u}-${w}`);
        }),
        c && /* @__PURE__ */ i("td", { className: "text-end", children: /* @__PURE__ */ i(
          rt,
          {
            buttonBar: p,
            output: o(l)
          }
        ) })
      ] }, u);
    }) : /* @__PURE__ */ i("tr", { children: /* @__PURE__ */ i(
      "td",
      {
        colSpan: (
          // icon col + data cols (+ actions col if present)
          1 + a.length + (c ? 1 : 0)
        ),
        className: "text-center text-secondary",
        children: "No rows"
      }
    ) }) })
  ] });
}
class je {
  /**
   * @param {Object} card
   */
  constructor(t = {}) {
    this.id = t.id ?? M("card"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "";
    const n = t.header ?? {};
    this.header = n instanceof ce ? n : new ce(n);
    const a = t.body ?? {};
    this.body = a instanceof ce ? a : new ce(a);
    const s = Array.isArray(t.fields) ? t.fields : [];
    if (s.length === 0)
      throw new Error(
        "CardObject requires at least one field in `fields`."
      );
    this.fields = s.map(
      (d) => d instanceof ce ? d : new ce(d || {})
    );
    const r = t.footer ?? {};
    this.footer = r instanceof ce ? r : new ce(r);
  }
}
function $a({ card: e }) {
  var o, c;
  if (!e || !(e instanceof je))
    throw new Error("AlloyCard requires `card` (CardObject instance).");
  const n = e.header && (e.header.hasText() || ((o = e.header.className) == null ? void 0 : o.trim())) ? /* @__PURE__ */ i(
    "div",
    {
      id: e.header.id,
      className: e.header.className || "card-header py-2 fw-semibold",
      "aria-label": e.header.ariaLabel,
      children: e.header.name
    }
  ) : null, a = /* @__PURE__ */ i(
    "div",
    {
      id: e.body.id,
      className: e.body.className || "card-body",
      "aria-label": e.body.ariaLabel,
      children: /* @__PURE__ */ i("div", { className: "row g-2", children: e.fields.map((l) => {
        if (!l) return null;
        const f = l.id, u = l.colClass || "col-12";
        return /* @__PURE__ */ i("div", { className: u, children: /* @__PURE__ */ i(
          "div",
          {
            id: l.id,
            className: l.className,
            "aria-label": l.ariaLabel,
            children: l.hasLogo() ? (
              // Logo-only field
              /* @__PURE__ */ i(
                "img",
                {
                  src: l.logo.imageUrl,
                  alt: l.logo.alt,
                  width: l.logo.width,
                  height: l.logo.height,
                  className: l.logo.className
                }
              )
            ) : l.hasIcon() ? (
              // Icon-only field
              /* @__PURE__ */ i(ie, { icon: l.icon })
            ) : l.hasText() ? (
              // Text-only field
              /* @__PURE__ */ i("span", { children: l.name })
            ) : null
          }
        ) }, f);
      }) })
    }
  ), s = e.link ? /* @__PURE__ */ i(
    Ie,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": e.body.ariaLabel,
      children: a
    }
  ) : a, d = e.footer && (e.footer.hasText() || ((c = e.footer.className) == null ? void 0 : c.trim().length)) ? /* @__PURE__ */ i(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer d-flex align-items-center justify-content-between py-2",
      "aria-label": e.footer.ariaLabel,
      children: e.footer.name && /* @__PURE__ */ i("span", { children: e.footer.name })
    }
  ) : null;
  return /* @__PURE__ */ A("div", { id: e.id, className: e.className, children: [
    n,
    s,
    d
  ] });
}
class Ue {
  constructor(t = {}) {
    this.id = t.id ?? M("card-action"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "";
    const n = t.header ?? {};
    this.header = n instanceof ce ? n : new ce(n);
    const a = t.body ?? {};
    this.body = a instanceof ce ? a : new ce(a);
    const s = Array.isArray(t.fields) ? t.fields : [];
    if (s.length === 0)
      throw new Error(
        "CardActionObject requires at least one field in `fields`."
      );
    this.fields = s.map(
      (o) => o instanceof ce ? o : new ce(o || {})
    );
    const r = t.footer ?? {};
    this.footer = r instanceof ce ? r : new ce(r), this.type = t.type ?? "AlloyButtonBar";
    const d = t.action;
    if (this.type === "AlloyLinkBar" ? this.action = d instanceof ge ? d : d ? new ge(d) : void 0 : this.action = d instanceof Ee ? d : d ? new Ee(d) : void 0, !this.action)
      throw new Error(
        "CardActionObject requires `action` (ButtonBarObject or LinkBarObject)."
      );
  }
}
function En({ cardAction: e, output: t }) {
  var w, E;
  if (!e || !(e instanceof Ue))
    throw new Error(
      "AlloyCardAction requires `cardAction` (CardActionObject instance)."
    );
  function n(g) {
    if (typeof t != "function") return;
    const x = g && typeof g.toJSON == "function" ? g.toJSON() : g || {}, { error: N = !1, errorMessage: y = [] } = x, h = a(x), b = {};
    Array.isArray(e.fields) && e.fields.forEach((C) => {
      if (!C) return;
      const v = C.id, O = C.name;
      v && typeof O < "u" && (b[v] = O);
    });
    const m = new j({
      id: e.id,
      type: "card-action",
      action: h,
      error: !!N,
      errorMessage: y || [],
      data: b
    });
    t(m);
  }
  function a(g) {
    if (!g || typeof g != "object") return "";
    const x = (y) => {
      if (!y || typeof y != "object") return "";
      const h = typeof y.name == "string" ? y.name.trim() : "";
      if (h) return h;
      const b = typeof y.ariaLabel == "string" ? y.ariaLabel.trim() : "";
      if (b) return b;
      const m = typeof y.title == "string" ? y.title.trim() : "";
      if (m) return m;
      const C = typeof y.id == "string" ? y.id.trim() : "";
      return C || "";
    }, N = g.data && typeof g.data == "object" ? g.data : null;
    if (N) {
      if (N.action && typeof N.action == "object") {
        const h = x(N.action);
        if (h) return h;
      }
      if (N.button && typeof N.button == "object") {
        const h = x(N.button);
        if (h) return h;
      }
      if (N.link && typeof N.link == "object") {
        const h = x(N.link);
        if (h) return h;
      }
      const y = x(N);
      if (y) return y;
    }
    return x(g);
  }
  const r = e.header && (e.header.hasText() || ((w = e.header.className) == null ? void 0 : w.trim())) ? /* @__PURE__ */ i(
    "div",
    {
      id: e.header.id,
      className: e.header.className ?? "card-header py-2 fw-semibold",
      "aria-label": e.header.ariaLabel,
      children: e.header.name
    }
  ) : null, d = /* @__PURE__ */ i(
    "div",
    {
      id: e.body.id,
      className: e.body.className ?? "card-body",
      "aria-label": e.body.ariaLabel,
      children: /* @__PURE__ */ i("div", { className: "row g-2", children: e.fields.map((g) => {
        if (!g) return null;
        const x = g.id, N = g.colClass || "col-12";
        return /* @__PURE__ */ i("div", { className: N, children: /* @__PURE__ */ i(
          "div",
          {
            id: g.id,
            className: g.className,
            "aria-label": g.ariaLabel,
            children: g.hasLogo() ? (
              // Logo-only field
              /* @__PURE__ */ i(
                "img",
                {
                  src: g.logo.imageUrl,
                  alt: g.logo.alt,
                  width: g.logo.width,
                  height: g.logo.height,
                  className: g.logo.className
                }
              )
            ) : g.hasIcon() ? (
              // Icon-only field (use AlloyIcon)
              /* @__PURE__ */ i(ie, { icon: g.icon })
            ) : g.hasText() ? (
              // Text-only field
              /* @__PURE__ */ i("span", { children: g.name })
            ) : null
          }
        ) }, x);
      }) })
    }
  ), o = e.link ? /* @__PURE__ */ i(
    Ie,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (E = e.body) == null ? void 0 : E.ariaLabel,
      children: d
    }
  ) : d, c = e.footer && e.footer.hasText(), l = !!e.action, f = l && e.type === "AlloyLinkBar" ? /* @__PURE__ */ i(_e, { linkBar: e.action, output: n }) : l ? /* @__PURE__ */ i(rt, { buttonBar: e.action, output: n }) : null, p = c || l ? /* @__PURE__ */ A(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className ?? "card-footer d-flex align-items-center gap-2 py-2",
      "aria-label": e.footer.ariaLabel,
      children: [
        c && /* @__PURE__ */ i("div", { className: "me-auto small text-muted", children: e.footer.name }),
        f && /* @__PURE__ */ i("div", { role: "group", children: f })
      ]
    }
  ) : null;
  return /* @__PURE__ */ A(
    "div",
    {
      id: e.id,
      className: e.className ?? "card border m-2 shadow",
      children: [
        r,
        o,
        p
      ]
    }
  );
}
class we {
  constructor(t = {}) {
    const {
      id: n,
      title: a = "AlloyMobile",
      className: s = "col m-2",
      message: r = "",
      action: d = "",
      type: o = "AlloyInputTextIcon",
      submit: c,
      fields: l,
      data: f
    } = t;
    this.id = n ?? M("form"), this.title = a, this.className = s, this.message = r, this.action = d, this.type = o, this.submit = c instanceof $e ? c : new $e(
      c || {
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
    const u = Array.isArray(l) ? l : [];
    this.fields = u.map(
      (p) => p instanceof ue ? p : new ue(p)
    ), this.data = f ?? {};
  }
}
function Wt(e, t, n) {
  let a = !0;
  const s = [];
  if (e.required && (e.type === "checkbox" ? (Array.isArray(t) ? t : []).length === 0 && (a = !1, s.push("This field is required.")) : (t === "" || t === !1 || t === void 0 || t === null) && (a = !1, s.push("This field is required."))), a && typeof e.minLength == "number" && typeof t == "string" && t.length < e.minLength && (a = !1, s.push(`Minimum length is ${e.minLength}`)), a && typeof e.maxLength == "number" && typeof t == "string" && t.length > e.maxLength && (a = !1, s.push(`Maximum length is ${e.maxLength}`)), a && e.pattern && typeof t == "string" && !new RegExp(e.pattern).test(t) && (a = !1, s.push("Invalid format.")), a && e.passwordStrength && typeof t == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(t) || (a = !1, s.push("Password is too weak."))), a && e.matchWith) {
    const r = e.matchWith;
    n[r] !== t && (a = !1, s.push("Values do not match."));
  }
  return {
    valid: a,
    error: !a,
    errors: s
  };
}
function ct({ form: e, output: t }) {
  const n = e instanceof we ? e : new we(e || {});
  if (!n || !Array.isArray(n.fields) || !(n.submit instanceof $e))
    throw new Error(
      "AlloyForm could not hydrate a valid FormObject (missing fields[] or submit)."
    );
  const [a, s] = B(() => {
    const u = {}, p = {};
    return n.fields.forEach((w) => {
      p[w.name] = w.value;
    }), n.fields.forEach((w) => {
      const E = w.value, { valid: g, error: x, errors: N } = Wt(
        w,
        E,
        p
      );
      u[w.name] = {
        value: E,
        valid: g,
        error: x,
        errors: N
      };
    }), u;
  }), r = oe(null), d = Rn(
    (u) => {
      const p = {};
      Object.keys(u).forEach((E) => {
        p[E] = u[E].value;
      });
      const w = {};
      return n.fields.forEach((E) => {
        const g = p[E.name], { valid: x, error: N, errors: y } = Wt(
          E,
          g,
          p
        );
        w[E.name] = {
          value: g,
          valid: x,
          error: N,
          errors: y
        };
      }), w;
    },
    [n.fields]
  );
  function o(u) {
    const p = u instanceof j ? u.data || {} : u || {}, { name: w, value: E } = p;
    w && s((g) => {
      const x = { ...g };
      return x[w] = {
        ...g[w] || {
          value: void 0,
          valid: !0,
          error: !1,
          errors: []
        },
        value: E
      }, d(x);
    });
  }
  const c = fe(() => {
    const u = {};
    return Object.keys(a).forEach((p) => {
      u[p] = a[p].value;
    }), u;
  }, [a]), l = fe(() => Object.values(a).some(
    (u) => u.error || !u.valid
  ), [a]);
  function f(u) {
    let p = !1;
    Object.values(a).forEach((x) => {
      (x.error || !x.valid) && (p = !0);
    });
    const w = { ...c };
    n.data = w, n.message = "";
    const E = p ? { ...a } : w, g = new j({
      id: n.id,
      // top-level id, as you requested
      type: "form",
      action: "submit",
      data: E,
      error: p
      // no errorMessage; all useful info is inside data for error=true
    });
    t == null || t(g);
  }
  return n.submit.disabled = l || !!n.submit.loading, /* @__PURE__ */ i("div", { className: "row", children: /* @__PURE__ */ i("div", { className: n.className, children: /* @__PURE__ */ A("div", { className: "text-center", children: [
    /* @__PURE__ */ i("h3", { children: n.title }),
    n.message !== "" && /* @__PURE__ */ i("div", { className: "alert alert-text-danger m-0 p-0", children: n.message }),
    n.fields.map((u) => /* @__PURE__ */ i(
      Le,
      {
        input: u,
        output: o
      },
      u.id
    )),
    /* @__PURE__ */ i(
      un,
      {
        ref: r,
        buttonSubmit: n.submit,
        output: f
      }
    )
  ] }) }) });
}
class ke {
  constructor(t = {}) {
    const {
      id: n,
      name: a,
      className: s,
      listClassName: r,
      itemClassName: d,
      activeClassName: o,
      disabledClassName: c,
      totalPages: l,
      totalElements: f,
      last: u,
      numberOfElements: p,
      size: w,
      number: E,
      first: g,
      empty: x,
      ...N
    } = t || {};
    this.id = n ?? M("pagination"), this.name = a ?? "", this.className = s ?? "d-flex justify-content-end align-items-center mt-2", this.listClassName = r ?? "pagination justify-content-end mb-0", this.itemClassName = d ?? "page-item", this.activeClassName = o ?? "active", this.disabledClassName = c ?? "disabled", this.totalPages = typeof l == "number" && l >= 0 ? l : 0, this.totalElements = typeof f == "number" && f >= 0 ? f : 0, this.size = typeof w == "number" ? w : 0, this.pageNumber = typeof E == "number" && E >= 0 ? E : 0, this.numberOfElements = typeof p == "number" ? p : 0, this.empty = !!x, this.first = typeof g == "boolean" ? g : this.pageNumber === 0, this.last = typeof u == "boolean" ? u : this.totalPages > 0 ? this.pageNumber >= this.totalPages - 1 : !0, Object.assign(this, N);
  }
}
function _a(e, t) {
  const n = [];
  if (t <= 7) {
    for (let o = 0; o < t; o++) n.push({ type: "page", index: o });
    return n;
  }
  const a = (o) => {
    o >= 0 && o < t && !n.some((c) => c.index === o) && n.push({ type: "page", index: o });
  };
  a(0), a(t - 1);
  const s = Math.max(e - 1, 1), r = Math.min(e + 1, t - 2);
  for (let o = s; o <= r; o++) a(o);
  n.sort((o, c) => o.index - c.index);
  const d = [];
  for (let o = 0; o < n.length; o++) {
    const c = n[o - 1], l = n[o];
    o > 0 && l.index - c.index > 1 && d.push({ type: "ellipsis", key: `el-${c.index}-${l.index}` }), d.push(l);
  }
  return d;
}
function nt({ pagination: e, output: t }) {
  if (!e || !(e instanceof ke))
    throw new Error(
      "AlloyPagination requires `pagination` (PaginationObject instance)."
    );
  const n = (m) => typeof t == "function" && t(m), {
    id: a,
    name: s,
    className: r,
    totalPages: d,
    totalElements: o,
    size: c,
    pageNumber: l,
    first: f,
    last: u,
    listClassName: p,
    itemClassName: w,
    activeClassName: E,
    disabledClassName: g
  } = e, x = fe(
    () => _a(l, d),
    [l, d]
  );
  function N(m, C, v) {
    if (!v) return;
    C < 0 && (C = 0), d > 0 && C > d - 1 && (C = d - 1);
    const O = v instanceof j && typeof v.toJSON == "function" ? v.toJSON() : v, k = j.ok({
      id: a,
      type: "pagination",
      action: "page",
      data: {
        nav: m,
        // first | prev | page | next | last
        pageNumber: C,
        size: c,
        totalPages: d,
        totalElements: o,
        first: C === 0,
        last: d > 0 ? C === d - 1 : !0,
        button: O
        // original button output
      }
    });
    n(k);
  }
  function y(m, C, v) {
    return new se({
      id: M("pg-btn"),
      name: m,
      ariaLabel: C,
      icon: { iconClass: v },
      className: "page-link"
    });
  }
  function h(m, C, v, O, k, I, L) {
    const q = [
      w,
      I ? g : "",
      L ? E : ""
    ].filter(Boolean).join(" "), _ = y(v, O, k);
    return /* @__PURE__ */ i("li", { className: q, children: /* @__PURE__ */ i(
      Ce,
      {
        buttonIcon: _,
        output: (V) => {
          I || N(m, C, V);
        }
      }
    ) }, `${m}-${v}`);
  }
  function b(m) {
    return /* @__PURE__ */ i("li", { className: `${w} ${g}`, children: /* @__PURE__ */ i("span", { className: "page-link", children: "…" }) }, m);
  }
  return /* @__PURE__ */ A(
    "nav",
    {
      className: r,
      "aria-label": s ? `${s} pagination` : "pagination",
      children: [
        s && d > 0 && /* @__PURE__ */ A("div", { className: "me-2 small text-muted", children: [
          s,
          ": Page ",
          l + 1,
          " of ",
          d
        ] }),
        d > 0 && /* @__PURE__ */ A(
          "ul",
          {
            className: `${p} list-unstyled`,
            style: { listStyle: "none", paddingLeft: 0, marginBottom: 0 },
            children: [
              h(
                "first",
                0,
                "First",
                "Go to first page",
                "fa-solid fa-angles-left",
                f,
                !1
              ),
              h(
                "prev",
                l - 1,
                "Previous",
                "Go to previous page",
                "fa-solid fa-chevron-left",
                f,
                !1
              ),
              x.map(
                (m) => m.type === "ellipsis" ? b(m.key) : h(
                  "page",
                  m.index,
                  String(m.index + 1),
                  `Go to page ${m.index + 1}`,
                  "fa-solid fa-circle-dot",
                  !1,
                  m.index === l
                )
              ),
              h(
                "next",
                l + 1,
                "Next",
                "Go to next page",
                "fa-solid fa-chevron-right",
                u,
                !1
              ),
              h(
                "last",
                d - 1,
                "Last",
                "Go to last page",
                "fa-solid fa-angles-right",
                u,
                !1
              )
            ]
          }
        )
      ]
    }
  );
}
class Da {
  constructor(t = {}) {
    this.id = t.id ?? M("tab"), this.key = t.key ?? this.id, this.title = t.title ?? "", this.subtitle = t.subtitle ?? "", this.order = typeof t.order == "number" ? t.order : 0, this.required = !!t.required, this.stage = t.stage ?? "", this.status = t.status ?? "", this.icon = t.icon ? t.icon instanceof K ? t.icon : new K(t.icon) : null, this.inputs = Array.isArray(t.inputs) ? t.inputs : [];
  }
}
class Be {
  constructor(t = {}) {
    this.id = t.id ?? M("tab-form"), this.name = t.name ?? "", this.status = t.status ?? "draft";
    const a = (Array.isArray(t.tabs) ? t.tabs : []).map((d) => new Da(d));
    this.tabs = a.sort((d, o) => d.order - o.order);
    let s = typeof t.currentIndex == "number" ? t.currentIndex : 0;
    s < 0 && (s = 0), s >= this.tabs.length && (s = this.tabs.length - 1), this.currentIndex = this.tabs.length > 0 ? s : 0;
    const r = t.navButtons || {};
    this.navButtons = {
      previous: r.previous ? new se({
        ...r.previous,
        name: r.previous.name || r.previous.label || "Previous"
      }) : null,
      next: r.next ? new se({
        ...r.next,
        name: r.next.name || r.next.label || "Next"
      }) : null,
      finish: r.finish ? new se({
        ...r.finish,
        name: r.finish.name || r.finish.label || "Finish"
      }) : null
    };
  }
}
function qa(e) {
  const t = {};
  return e.tabs.forEach((n) => {
    const a = {};
    n.inputs.forEach((s) => {
      const r = s.name;
      r && (typeof s.value < "u" ? a[r] = s.value : s.type === "checkbox" ? a[r] = !1 : a[r] = "");
    }), t[n.key] = a;
  }), t;
}
function Kt(e, t) {
  const n = {};
  return e.inputs.forEach((a) => {
    const s = a.name;
    if (!s) return;
    const r = [], d = typeof t[s] < "u" ? t[s] : a.value;
    if (a.required && (a.type === "checkbox" ? d || r.push("This field is required.") : (d === "" || d === null || typeof d > "u") && r.push("This field is required.")), a.matchWith) {
      const o = a.matchWith, c = t[o];
      d !== c && r.push("Values do not match.");
    }
    r.length > 0 && (n[s] = r);
  }), n;
}
function Fa({ tabForm: e, output: t }) {
  if (!e || !(e instanceof Be))
    throw new Error("AlloyTabForm requires `tabForm` (TabFormObject instance).");
  const [n, a] = B(e.currentIndex), [s, r] = B(() => qa(e)), [d, o] = B({}), c = e.tabs, l = c.length, f = c[n] || null, u = f ? f.key : "", p = e.navButtons || {};
  function w(k, I, L, q) {
    const _ = s[k] || {};
    return Object.prototype.hasOwnProperty.call(_, I) ? _[I] : typeof L < "u" ? L : q === "checkbox" ? !1 : "";
  }
  function E(k, I) {
    var te, ee, le;
    const L = I && typeof I.toJSON == "function" ? I.toJSON() : I, q = (te = L == null ? void 0 : L.data) == null ? void 0 : te.name, _ = (ee = L == null ? void 0 : L.data) == null ? void 0 : ee.value, V = ((le = L == null ? void 0 : L.data) == null ? void 0 : le.errors) || [];
    q && (r((Z) => {
      const ve = { ...Z }, S = { ...ve[k] || {} };
      return S[q] = _, ve[k] = S, ve;
    }), o((Z) => {
      const ve = { ...Z }, S = { ...ve[k] || {} };
      return V.length > 0 ? S[q] = V : delete S[q], ve[k] = S, ve;
    }));
  }
  function g(k, I, L, q, _) {
    const V = c[I] || f, te = V ? V.key : u, ee = {
      currentIndex: I,
      currentTabKey: te,
      values: L
    };
    if (_ && q && Object.keys(q).length > 0 && (ee.errors = q, ee.message = "Validation failed for current step."), typeof t != "function") return;
    const le = _ ? j.errorOf({
      id: e.id,
      type: "tab-form",
      action: k === "finish" ? "submit" : "draft",
      data: ee
    }) : j.ok({
      id: e.id,
      type: "tab-form",
      action: k === "finish" ? "submit" : "draft",
      data: ee
    });
    t(le);
  }
  function x() {
    if (!f || n <= 0) return;
    const k = n - 1;
    a(k), g("previous", k, s, d, !1);
  }
  function N() {
    if (!f || n >= l - 1) return;
    const k = f.key, I = s[k] || {}, L = Kt(f, I);
    if (Object.keys(L).length > 0) {
      const V = {
        ...d,
        [k]: L
      };
      o(V), g("next", n, s, V, !0);
      return;
    }
    const q = n + 1;
    a(q);
    const _ = { ...d };
    delete _[k], o(_), g("next", q, s, _, !1);
  }
  function y() {
    if (!f) return;
    const k = f.key, I = s[k] || {}, L = Kt(f, I);
    if (Object.keys(L).length > 0) {
      const _ = {
        ...d,
        [k]: L
      };
      o(_), g("finish", n, s, _, !0);
      return;
    }
    const q = { ...d };
    delete q[k], o(q), g("finish", n, s, q, !1);
  }
  if (!f)
    return /* @__PURE__ */ i("div", { className: "alert alert-warning", children: "No steps defined for this TabForm." });
  const h = n > 0, b = n === l - 1, m = !b, C = h && (p.previous || new se({
    name: "Previous",
    icon: { iconClass: "fa-solid fa-arrow-left" },
    className: "btn btn-primary"
  })), v = m && (p.next || new se({
    name: "Next",
    icon: { iconClass: "fa-solid fa-arrow-right" },
    className: "btn btn-primary"
  })), O = b && (p.finish || new se({
    name: "Finish",
    icon: { iconClass: "fa-solid fa-paper-plane" },
    className: "btn btn-primary"
  }));
  return /* @__PURE__ */ A("div", { className: "alloy-tab-form", children: [
    /* @__PURE__ */ i("ul", { className: "nav nav-tabs mb-3 flex-wrap", children: c.map((k, I) => /* @__PURE__ */ i("li", { className: "nav-item", children: /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        className: `nav-link ${I === n ? "active" : ""}`,
        onClick: () => a(I),
        children: [
          k.icon && /* @__PURE__ */ i("span", { className: "me-1", children: /* @__PURE__ */ i(ie, { icon: k.icon }) }),
          k.title || `Step ${I + 1}`
        ]
      }
    ) }, k.id)) }),
    (f.title || f.subtitle) && /* @__PURE__ */ A("div", { className: "mb-3", children: [
      f.title && /* @__PURE__ */ i("h5", { className: "mb-1", children: f.title }),
      f.subtitle && /* @__PURE__ */ i("div", { className: "text-muted small", children: f.subtitle })
    ] }),
    /* @__PURE__ */ A(
      "form",
      {
        onSubmit: (k) => k.preventDefault(),
        noValidate: !0,
        children: [
          /* @__PURE__ */ i("div", { className: "row g-3", children: /* @__PURE__ */ i("div", { className: "col-12 col-md-6 col-lg-5 mx-auto", children: f.inputs.map((k, I) => {
            const L = w(
              f.key,
              k.name,
              k.value,
              k.type
            ), _ = (d[f.key] || {})[k.name] || [], V = _.length > 0, te = new ue({
              ...k,
              value: L,
              errors: _,
              invalid: V
            });
            return /* @__PURE__ */ i(
              Le,
              {
                input: te,
                output: (ee) => E(f.key, ee)
              },
              `inp-${I}`
            );
          }) }) }),
          /* @__PURE__ */ A("div", { className: "d-flex justify-content-between mt-4", children: [
            h ? /* @__PURE__ */ i(
              Ce,
              {
                buttonIcon: C,
                output: () => x()
              }
            ) : /* @__PURE__ */ i("span", {}),
            /* @__PURE__ */ A("div", { className: "d-flex gap-2 ms-auto", children: [
              m && /* @__PURE__ */ i(
                Ce,
                {
                  buttonIcon: v,
                  output: () => N()
                }
              ),
              b && /* @__PURE__ */ i(
                Ce,
                {
                  buttonIcon: O,
                  output: () => y()
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
class Re {
  /**
   * @param {ModalConfig} modal
   */
  constructor(t = {}) {
    const {
      id: n,
      title: a,
      className: s,
      action: r,
      submit: d,
      fields: o = [],
      data: c = {},
      ...l
    } = t;
    this.id = n ?? M("modal"), this.title = a ?? "", this.className = s ?? "modal fade", this.action = r ?? "", d instanceof he ? this.submit = d : d && typeof d == "object" ? this.submit = new he(d) : this.submit = null, this.fields = o.map(
      (u) => u instanceof ue ? u : new ue(u)
    );
    const f = {};
    this.fields.forEach((u) => {
      f[u.name] = u.value;
    }), this.data = { ...f, ...c }, Object.assign(this, l);
  }
}
function Jt(e) {
  const t = {};
  return e && Array.isArray(e.fields) && e.fields.forEach((n) => {
    n instanceof ue && (t[n.name] = n.value);
  }), { ...t, ...e.data || {} };
}
function Ua(e) {
  return Object.values(e).some(
    (t) => Array.isArray(t) && t.length > 0
  );
}
function Wa(e) {
  if (!e) return;
  const t = document.getElementById(e);
  if (!t) return;
  const n = typeof window < "u" ? window : void 0;
  if (n && n.bootstrap && n.bootstrap.Modal) {
    const s = n.bootstrap.Modal.getOrCreateInstance(t);
    if (s) {
      s.hide();
      return;
    }
  }
  const a = t.querySelector('[data-bs-dismiss="modal"]');
  a && typeof a.click == "function" && a.click();
}
function An({ modal: e, output: t }) {
  if (!e || !(e instanceof Re))
    throw new Error("AlloyModal requires `modal` (ModalObject instance).");
  if (!e.submit || !(e.submit instanceof he))
    throw new Error(
      "ModalObject.submit must be a ButtonObject instance for AlloyModal."
    );
  const [n, a] = B(() => Jt(e)), [s, r] = B({});
  be(() => {
    a(Jt(e)), r({});
  }, [e]);
  const d = (c) => {
    if (!c || !(c instanceof j)) return;
    const { data: l, error: f } = c;
    if (!l || !l.name) return;
    const { name: u, value: p, errors: w = [] } = l;
    a((E) => ({
      ...E,
      [u]: p
    })), r((E) => ({
      ...E,
      [u]: f ? w : []
    }));
  }, o = () => {
    if (typeof t != "function") return;
    const c = { ...n };
    if (Ua(s)) {
      const f = j.errorOf({
        id: e.id,
        type: "modal",
        action: "submit",
        message: "Validation failed",
        data: {
          ...c,
          errors: s
        }
      });
      t(f);
      return;
    }
    const l = j.ok({
      id: e.id,
      type: "modal",
      action: "submit",
      data: c
    });
    t(l), Wa(e.id);
  };
  return /* @__PURE__ */ i(
    "div",
    {
      className: e.className,
      id: e.id,
      tabIndex: -1,
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true",
      role: "dialog",
      children: /* @__PURE__ */ i("div", { className: "modal-dialog", role: "document", children: /* @__PURE__ */ A("div", { className: "modal-content", children: [
        /* @__PURE__ */ A("div", { className: "modal-header", children: [
          /* @__PURE__ */ i("h5", { className: "modal-title", id: "exampleModalLabel", children: e.action + " a " + e.title }),
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "btn-close",
              "data-bs-dismiss": "modal",
              "aria-label": "Close"
            }
          )
        ] }),
        /* @__PURE__ */ i("div", { className: "modal-body", children: e.fields.map((c) => /* @__PURE__ */ i(
          Le,
          {
            input: c,
            output: d
          },
          c.id
        )) }),
        /* @__PURE__ */ A("div", { className: "modal-footer", children: [
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "btn btn-outline-dark",
              "data-bs-dismiss": "modal",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ i(st, { button: e.submit, output: o })
        ] })
      ] }) })
    }
  );
}
class Ka {
  /**
   * @param {ModalToastConfig} modalToast
   */
  constructor(t = {}) {
    const {
      id: n,
      title: a,
      className: s,
      action: r,
      submit: d,
      message: o,
      ...c
    } = t;
    this.id = n ?? M("modalToast"), this.title = a ?? "", this.className = s ?? "modal fade", this.action = r ?? "", d instanceof he ? this.submit = d : d && typeof d == "object" ? this.submit = new he(d) : this.submit = null, this.message = o ?? "", Object.assign(this, c);
  }
}
function Ja(e) {
  const t = document.getElementById(e);
  if (!t) return;
  const n = t.querySelector('[data-bs-dismiss="modal"]');
  n && typeof n.click == "function" && n.click();
}
function Us({ modalToast: e, output: t }) {
  if (!e || !(e instanceof Ka))
    throw new Error(
      "AlloyModalToast requires `modalToast` (ModalToastObject instance)."
    );
  if (!e.submit || !(e.submit instanceof he))
    throw new Error(
      "ModalToastObject.submit must be a ButtonObject instance for AlloyModalToast."
    );
  const n = () => {
    if (typeof t == "function") {
      const a = j.ok({
        id: e.id,
        type: "modal-toast",
        action: "click",
        data: {
          action: e.action,
          title: e.title,
          message: e.message
        }
      });
      t(a);
    }
    Ja(e.id);
  };
  return /* @__PURE__ */ i(
    "div",
    {
      className: e.className,
      id: e.id,
      tabIndex: -1,
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true",
      role: "dialog",
      children: /* @__PURE__ */ i("div", { className: "modal-dialog", role: "document", children: /* @__PURE__ */ A("div", { className: "modal-content", children: [
        /* @__PURE__ */ A("div", { className: "modal-header", children: [
          /* @__PURE__ */ i("h5", { className: "modal-title", id: "exampleModalLabel", children: e.title }),
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "btn-close",
              "data-bs-dismiss": "modal",
              "aria-label": "Close"
            }
          )
        ] }),
        /* @__PURE__ */ i("div", { className: "modal-body", children: /* @__PURE__ */ i("h3", { children: e.message }) }),
        /* @__PURE__ */ A("div", { className: "modal-footer", children: [
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "btn btn-outline-dark",
              "data-bs-dismiss": "modal",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ i(st, { button: e.submit, output: n })
        ] })
      ] }) })
    }
  );
}
function Va(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var xt = { exports: {} }, He = { exports: {} }, H = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vt;
function Ya() {
  if (Vt) return H;
  Vt = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, a = e ? Symbol.for("react.fragment") : 60107, s = e ? Symbol.for("react.strict_mode") : 60108, r = e ? Symbol.for("react.profiler") : 60114, d = e ? Symbol.for("react.provider") : 60109, o = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, l = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, u = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, w = e ? Symbol.for("react.memo") : 60115, E = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, x = e ? Symbol.for("react.fundamental") : 60117, N = e ? Symbol.for("react.responder") : 60118, y = e ? Symbol.for("react.scope") : 60119;
  function h(m) {
    if (typeof m == "object" && m !== null) {
      var C = m.$$typeof;
      switch (C) {
        case t:
          switch (m = m.type, m) {
            case c:
            case l:
            case a:
            case r:
            case s:
            case u:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case o:
                case f:
                case E:
                case w:
                case d:
                  return m;
                default:
                  return C;
              }
          }
        case n:
          return C;
      }
    }
  }
  function b(m) {
    return h(m) === l;
  }
  return H.AsyncMode = c, H.ConcurrentMode = l, H.ContextConsumer = o, H.ContextProvider = d, H.Element = t, H.ForwardRef = f, H.Fragment = a, H.Lazy = E, H.Memo = w, H.Portal = n, H.Profiler = r, H.StrictMode = s, H.Suspense = u, H.isAsyncMode = function(m) {
    return b(m) || h(m) === c;
  }, H.isConcurrentMode = b, H.isContextConsumer = function(m) {
    return h(m) === o;
  }, H.isContextProvider = function(m) {
    return h(m) === d;
  }, H.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === t;
  }, H.isForwardRef = function(m) {
    return h(m) === f;
  }, H.isFragment = function(m) {
    return h(m) === a;
  }, H.isLazy = function(m) {
    return h(m) === E;
  }, H.isMemo = function(m) {
    return h(m) === w;
  }, H.isPortal = function(m) {
    return h(m) === n;
  }, H.isProfiler = function(m) {
    return h(m) === r;
  }, H.isStrictMode = function(m) {
    return h(m) === s;
  }, H.isSuspense = function(m) {
    return h(m) === u;
  }, H.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === a || m === l || m === r || m === s || m === u || m === p || typeof m == "object" && m !== null && (m.$$typeof === E || m.$$typeof === w || m.$$typeof === d || m.$$typeof === o || m.$$typeof === f || m.$$typeof === x || m.$$typeof === N || m.$$typeof === y || m.$$typeof === g);
  }, H.typeOf = h, H;
}
var G = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yt;
function za() {
  return Yt || (Yt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, a = e ? Symbol.for("react.fragment") : 60107, s = e ? Symbol.for("react.strict_mode") : 60108, r = e ? Symbol.for("react.profiler") : 60114, d = e ? Symbol.for("react.provider") : 60109, o = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, l = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, u = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, w = e ? Symbol.for("react.memo") : 60115, E = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, x = e ? Symbol.for("react.fundamental") : 60117, N = e ? Symbol.for("react.responder") : 60118, y = e ? Symbol.for("react.scope") : 60119;
    function h(P) {
      return typeof P == "string" || typeof P == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      P === a || P === l || P === r || P === s || P === u || P === p || typeof P == "object" && P !== null && (P.$$typeof === E || P.$$typeof === w || P.$$typeof === d || P.$$typeof === o || P.$$typeof === f || P.$$typeof === x || P.$$typeof === N || P.$$typeof === y || P.$$typeof === g);
    }
    function b(P) {
      if (typeof P == "object" && P !== null) {
        var Ne = P.$$typeof;
        switch (Ne) {
          case t:
            var Ye = P.type;
            switch (Ye) {
              case c:
              case l:
              case a:
              case r:
              case s:
              case u:
                return Ye;
              default:
                var $t = Ye && Ye.$$typeof;
                switch ($t) {
                  case o:
                  case f:
                  case E:
                  case w:
                  case d:
                    return $t;
                  default:
                    return Ne;
                }
            }
          case n:
            return Ne;
        }
      }
    }
    var m = c, C = l, v = o, O = d, k = t, I = f, L = a, q = E, _ = w, V = n, te = r, ee = s, le = u, Z = !1;
    function ve(P) {
      return Z || (Z = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), S(P) || b(P) === c;
    }
    function S(P) {
      return b(P) === l;
    }
    function T(P) {
      return b(P) === o;
    }
    function F(P) {
      return b(P) === d;
    }
    function U(P) {
      return typeof P == "object" && P !== null && P.$$typeof === t;
    }
    function R(P) {
      return b(P) === f;
    }
    function J(P) {
      return b(P) === a;
    }
    function D(P) {
      return b(P) === E;
    }
    function W(P) {
      return b(P) === w;
    }
    function Y(P) {
      return b(P) === n;
    }
    function Q(P) {
      return b(P) === r;
    }
    function z(P) {
      return b(P) === s;
    }
    function me(P) {
      return b(P) === u;
    }
    G.AsyncMode = m, G.ConcurrentMode = C, G.ContextConsumer = v, G.ContextProvider = O, G.Element = k, G.ForwardRef = I, G.Fragment = L, G.Lazy = q, G.Memo = _, G.Portal = V, G.Profiler = te, G.StrictMode = ee, G.Suspense = le, G.isAsyncMode = ve, G.isConcurrentMode = S, G.isContextConsumer = T, G.isContextProvider = F, G.isElement = U, G.isForwardRef = R, G.isFragment = J, G.isLazy = D, G.isMemo = W, G.isPortal = Y, G.isProfiler = Q, G.isStrictMode = z, G.isSuspense = me, G.isValidElementType = h, G.typeOf = b;
  }()), G;
}
var zt;
function Sn() {
  return zt || (zt = 1, process.env.NODE_ENV === "production" ? He.exports = Ya() : He.exports = za()), He.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var ut, Ht;
function Ha() {
  if (Ht) return ut;
  Ht = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
  function a(r) {
    if (r == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(r);
  }
  function s() {
    try {
      if (!Object.assign)
        return !1;
      var r = new String("abc");
      if (r[5] = "de", Object.getOwnPropertyNames(r)[0] === "5")
        return !1;
      for (var d = {}, o = 0; o < 10; o++)
        d["_" + String.fromCharCode(o)] = o;
      var c = Object.getOwnPropertyNames(d).map(function(f) {
        return d[f];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var l = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        l[f] = f;
      }), Object.keys(Object.assign({}, l)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return ut = s() ? Object.assign : function(r, d) {
    for (var o, c = a(r), l, f = 1; f < arguments.length; f++) {
      o = Object(arguments[f]);
      for (var u in o)
        t.call(o, u) && (c[u] = o[u]);
      if (e) {
        l = e(o);
        for (var p = 0; p < l.length; p++)
          n.call(o, l[p]) && (c[l[p]] = o[l[p]]);
      }
    }
    return c;
  }, ut;
}
var ft, Gt;
function Bt() {
  if (Gt) return ft;
  Gt = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return ft = e, ft;
}
var mt, Qt;
function On() {
  return Qt || (Qt = 1, mt = Function.call.bind(Object.prototype.hasOwnProperty)), mt;
}
var ht, Xt;
function Ga() {
  if (Xt) return ht;
  Xt = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Bt(), n = {}, a = On();
    e = function(r) {
      var d = "Warning: " + r;
      typeof console < "u" && console.error(d);
      try {
        throw new Error(d);
      } catch {
      }
    };
  }
  function s(r, d, o, c, l) {
    if (process.env.NODE_ENV !== "production") {
      for (var f in r)
        if (a(r, f)) {
          var u;
          try {
            if (typeof r[f] != "function") {
              var p = Error(
                (c || "React class") + ": " + o + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw p.name = "Invariant Violation", p;
            }
            u = r[f](d, f, c, o, null, t);
          } catch (E) {
            u = E;
          }
          if (u && !(u instanceof Error) && e(
            (c || "React class") + ": type specification of " + o + " `" + f + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof u + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), u instanceof Error && !(u.message in n)) {
            n[u.message] = !0;
            var w = l ? l() : "";
            e(
              "Failed " + o + " type: " + u.message + (w ?? "")
            );
          }
        }
    }
  }
  return s.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, ht = s, ht;
}
var pt, Zt;
function Qa() {
  if (Zt) return pt;
  Zt = 1;
  var e = Sn(), t = Ha(), n = Bt(), a = On(), s = Ga(), r = function() {
  };
  process.env.NODE_ENV !== "production" && (r = function(o) {
    var c = "Warning: " + o;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function d() {
    return null;
  }
  return pt = function(o, c) {
    var l = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
    function u(S) {
      var T = S && (l && S[l] || S[f]);
      if (typeof T == "function")
        return T;
    }
    var p = "<<anonymous>>", w = {
      array: N("array"),
      bigint: N("bigint"),
      bool: N("boolean"),
      func: N("function"),
      number: N("number"),
      object: N("object"),
      string: N("string"),
      symbol: N("symbol"),
      any: y(),
      arrayOf: h,
      element: b(),
      elementType: m(),
      instanceOf: C,
      node: I(),
      objectOf: O,
      oneOf: v,
      oneOfType: k,
      shape: q,
      exact: _
    };
    function E(S, T) {
      return S === T ? S !== 0 || 1 / S === 1 / T : S !== S && T !== T;
    }
    function g(S, T) {
      this.message = S, this.data = T && typeof T == "object" ? T : {}, this.stack = "";
    }
    g.prototype = Error.prototype;
    function x(S) {
      if (process.env.NODE_ENV !== "production")
        var T = {}, F = 0;
      function U(J, D, W, Y, Q, z, me) {
        if (Y = Y || p, z = z || W, me !== n) {
          if (c) {
            var P = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw P.name = "Invariant Violation", P;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Ne = Y + ":" + W;
            !T[Ne] && // Avoid spamming the console because they are often not actionable except for lib authors
            F < 3 && (r(
              "You are manually calling a React.PropTypes validation function for the `" + z + "` prop on `" + Y + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), T[Ne] = !0, F++);
          }
        }
        return D[W] == null ? J ? D[W] === null ? new g("The " + Q + " `" + z + "` is marked as required " + ("in `" + Y + "`, but its value is `null`.")) : new g("The " + Q + " `" + z + "` is marked as required in " + ("`" + Y + "`, but its value is `undefined`.")) : null : S(D, W, Y, Q, z);
      }
      var R = U.bind(null, !1);
      return R.isRequired = U.bind(null, !0), R;
    }
    function N(S) {
      function T(F, U, R, J, D, W) {
        var Y = F[U], Q = ee(Y);
        if (Q !== S) {
          var z = le(Y);
          return new g(
            "Invalid " + J + " `" + D + "` of type " + ("`" + z + "` supplied to `" + R + "`, expected ") + ("`" + S + "`."),
            { expectedType: S }
          );
        }
        return null;
      }
      return x(T);
    }
    function y() {
      return x(d);
    }
    function h(S) {
      function T(F, U, R, J, D) {
        if (typeof S != "function")
          return new g("Property `" + D + "` of component `" + R + "` has invalid PropType notation inside arrayOf.");
        var W = F[U];
        if (!Array.isArray(W)) {
          var Y = ee(W);
          return new g("Invalid " + J + " `" + D + "` of type " + ("`" + Y + "` supplied to `" + R + "`, expected an array."));
        }
        for (var Q = 0; Q < W.length; Q++) {
          var z = S(W, Q, R, J, D + "[" + Q + "]", n);
          if (z instanceof Error)
            return z;
        }
        return null;
      }
      return x(T);
    }
    function b() {
      function S(T, F, U, R, J) {
        var D = T[F];
        if (!o(D)) {
          var W = ee(D);
          return new g("Invalid " + R + " `" + J + "` of type " + ("`" + W + "` supplied to `" + U + "`, expected a single ReactElement."));
        }
        return null;
      }
      return x(S);
    }
    function m() {
      function S(T, F, U, R, J) {
        var D = T[F];
        if (!e.isValidElementType(D)) {
          var W = ee(D);
          return new g("Invalid " + R + " `" + J + "` of type " + ("`" + W + "` supplied to `" + U + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return x(S);
    }
    function C(S) {
      function T(F, U, R, J, D) {
        if (!(F[U] instanceof S)) {
          var W = S.name || p, Y = ve(F[U]);
          return new g("Invalid " + J + " `" + D + "` of type " + ("`" + Y + "` supplied to `" + R + "`, expected ") + ("instance of `" + W + "`."));
        }
        return null;
      }
      return x(T);
    }
    function v(S) {
      if (!Array.isArray(S))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? r(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : r("Invalid argument supplied to oneOf, expected an array.")), d;
      function T(F, U, R, J, D) {
        for (var W = F[U], Y = 0; Y < S.length; Y++)
          if (E(W, S[Y]))
            return null;
        var Q = JSON.stringify(S, function(me, P) {
          var Ne = le(P);
          return Ne === "symbol" ? String(P) : P;
        });
        return new g("Invalid " + J + " `" + D + "` of value `" + String(W) + "` " + ("supplied to `" + R + "`, expected one of " + Q + "."));
      }
      return x(T);
    }
    function O(S) {
      function T(F, U, R, J, D) {
        if (typeof S != "function")
          return new g("Property `" + D + "` of component `" + R + "` has invalid PropType notation inside objectOf.");
        var W = F[U], Y = ee(W);
        if (Y !== "object")
          return new g("Invalid " + J + " `" + D + "` of type " + ("`" + Y + "` supplied to `" + R + "`, expected an object."));
        for (var Q in W)
          if (a(W, Q)) {
            var z = S(W, Q, R, J, D + "." + Q, n);
            if (z instanceof Error)
              return z;
          }
        return null;
      }
      return x(T);
    }
    function k(S) {
      if (!Array.isArray(S))
        return process.env.NODE_ENV !== "production" && r("Invalid argument supplied to oneOfType, expected an instance of array."), d;
      for (var T = 0; T < S.length; T++) {
        var F = S[T];
        if (typeof F != "function")
          return r(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Z(F) + " at index " + T + "."
          ), d;
      }
      function U(R, J, D, W, Y) {
        for (var Q = [], z = 0; z < S.length; z++) {
          var me = S[z], P = me(R, J, D, W, Y, n);
          if (P == null)
            return null;
          P.data && a(P.data, "expectedType") && Q.push(P.data.expectedType);
        }
        var Ne = Q.length > 0 ? ", expected one of type [" + Q.join(", ") + "]" : "";
        return new g("Invalid " + W + " `" + Y + "` supplied to " + ("`" + D + "`" + Ne + "."));
      }
      return x(U);
    }
    function I() {
      function S(T, F, U, R, J) {
        return V(T[F]) ? null : new g("Invalid " + R + " `" + J + "` supplied to " + ("`" + U + "`, expected a ReactNode."));
      }
      return x(S);
    }
    function L(S, T, F, U, R) {
      return new g(
        (S || "React class") + ": " + T + " type `" + F + "." + U + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + R + "`."
      );
    }
    function q(S) {
      function T(F, U, R, J, D) {
        var W = F[U], Y = ee(W);
        if (Y !== "object")
          return new g("Invalid " + J + " `" + D + "` of type `" + Y + "` " + ("supplied to `" + R + "`, expected `object`."));
        for (var Q in S) {
          var z = S[Q];
          if (typeof z != "function")
            return L(R, J, D, Q, le(z));
          var me = z(W, Q, R, J, D + "." + Q, n);
          if (me)
            return me;
        }
        return null;
      }
      return x(T);
    }
    function _(S) {
      function T(F, U, R, J, D) {
        var W = F[U], Y = ee(W);
        if (Y !== "object")
          return new g("Invalid " + J + " `" + D + "` of type `" + Y + "` " + ("supplied to `" + R + "`, expected `object`."));
        var Q = t({}, F[U], S);
        for (var z in Q) {
          var me = S[z];
          if (a(S, z) && typeof me != "function")
            return L(R, J, D, z, le(me));
          if (!me)
            return new g(
              "Invalid " + J + " `" + D + "` key `" + z + "` supplied to `" + R + "`.\nBad object: " + JSON.stringify(F[U], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(S), null, "  ")
            );
          var P = me(W, z, R, J, D + "." + z, n);
          if (P)
            return P;
        }
        return null;
      }
      return x(T);
    }
    function V(S) {
      switch (typeof S) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !S;
        case "object":
          if (Array.isArray(S))
            return S.every(V);
          if (S === null || o(S))
            return !0;
          var T = u(S);
          if (T) {
            var F = T.call(S), U;
            if (T !== S.entries) {
              for (; !(U = F.next()).done; )
                if (!V(U.value))
                  return !1;
            } else
              for (; !(U = F.next()).done; ) {
                var R = U.value;
                if (R && !V(R[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function te(S, T) {
      return S === "symbol" ? !0 : T ? T["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && T instanceof Symbol : !1;
    }
    function ee(S) {
      var T = typeof S;
      return Array.isArray(S) ? "array" : S instanceof RegExp ? "object" : te(T, S) ? "symbol" : T;
    }
    function le(S) {
      if (typeof S > "u" || S === null)
        return "" + S;
      var T = ee(S);
      if (T === "object") {
        if (S instanceof Date)
          return "date";
        if (S instanceof RegExp)
          return "regexp";
      }
      return T;
    }
    function Z(S) {
      var T = le(S);
      switch (T) {
        case "array":
        case "object":
          return "an " + T;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + T;
        default:
          return T;
      }
    }
    function ve(S) {
      return !S.constructor || !S.constructor.name ? p : S.constructor.name;
    }
    return w.checkPropTypes = s, w.resetWarningCache = s.resetWarningCache, w.PropTypes = w, w;
  }, pt;
}
var yt, en;
function Xa() {
  if (en) return yt;
  en = 1;
  var e = Bt();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, yt = function() {
    function a(d, o, c, l, f, u) {
      if (u !== e) {
        var p = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw p.name = "Invariant Violation", p;
      }
    }
    a.isRequired = a;
    function s() {
      return a;
    }
    var r = {
      array: a,
      bigint: a,
      bool: a,
      func: a,
      number: a,
      object: a,
      string: a,
      symbol: a,
      any: a,
      arrayOf: s,
      element: a,
      elementType: a,
      instanceOf: s,
      node: a,
      objectOf: s,
      oneOf: s,
      oneOfType: s,
      shape: s,
      exact: s,
      checkPropTypes: n,
      resetWarningCache: t
    };
    return r.PropTypes = r, r;
  }, yt;
}
if (process.env.NODE_ENV !== "production") {
  var Za = Sn(), es = !0;
  xt.exports = Qa()(Za.isElement, es);
} else
  xt.exports = Xa()();
var ts = xt.exports;
const X = /* @__PURE__ */ Va(ts);
function tn(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), n.push.apply(n, a);
  }
  return n;
}
function nn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? tn(Object(n), !0).forEach(function(a) {
      kn(e, a, n[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : tn(Object(n)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
    });
  }
  return e;
}
function Ze(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Ze = function(t) {
    return typeof t;
  } : Ze = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ze(e);
}
function kn(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function ns(e, t) {
  if (e == null) return {};
  var n = {}, a = Object.keys(e), s, r;
  for (r = 0; r < a.length; r++)
    s = a[r], !(t.indexOf(s) >= 0) && (n[s] = e[s]);
  return n;
}
function as(e, t) {
  if (e == null) return {};
  var n = ns(e, t), a, s;
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    for (s = 0; s < r.length; s++)
      a = r[s], !(t.indexOf(a) >= 0) && Object.prototype.propertyIsEnumerable.call(e, a) && (n[a] = e[a]);
  }
  return n;
}
function ss(e, t) {
  return rs(e) || is(e, t) || os(e, t) || cs();
}
function rs(e) {
  if (Array.isArray(e)) return e;
}
function is(e, t) {
  var n = e && (typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"]);
  if (n != null) {
    var a = [], s = !0, r = !1, d, o;
    try {
      for (n = n.call(e); !(s = (d = n.next()).done) && (a.push(d.value), !(t && a.length === t)); s = !0)
        ;
    } catch (c) {
      r = !0, o = c;
    } finally {
      try {
        !s && n.return != null && n.return();
      } finally {
        if (r) throw o;
      }
    }
    return a;
  }
}
function os(e, t) {
  if (e) {
    if (typeof e == "string") return an(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return an(e, t);
  }
}
function an(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
  return a;
}
function cs() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var de = function(t, n, a) {
  var s = !!a, r = re.useRef(a);
  re.useEffect(function() {
    r.current = a;
  }, [a]), re.useEffect(function() {
    if (!s || !t)
      return function() {
      };
    var d = function() {
      r.current && r.current.apply(r, arguments);
    };
    return t.on(n, d), function() {
      t.off(n, d);
    };
  }, [s, n, t, r]);
}, ls = function(t) {
  var n = re.useRef(t);
  return re.useEffect(function() {
    n.current = t;
  }, [t]), n.current;
}, at = function(t) {
  return t !== null && Ze(t) === "object";
}, sn = "[object Object]", ds = function e(t, n) {
  if (!at(t) || !at(n))
    return t === n;
  var a = Array.isArray(t), s = Array.isArray(n);
  if (a !== s) return !1;
  var r = Object.prototype.toString.call(t) === sn, d = Object.prototype.toString.call(n) === sn;
  if (r !== d) return !1;
  if (!r && !a) return t === n;
  var o = Object.keys(t), c = Object.keys(n);
  if (o.length !== c.length) return !1;
  for (var l = {}, f = 0; f < o.length; f += 1)
    l[o[f]] = !0;
  for (var u = 0; u < c.length; u += 1)
    l[c[u]] = !0;
  var p = Object.keys(l);
  if (p.length !== o.length)
    return !1;
  var w = t, E = n, g = function(N) {
    return e(w[N], E[N]);
  };
  return p.every(g);
}, us = function(t, n, a) {
  return at(t) ? Object.keys(t).reduce(function(s, r) {
    var d = !at(n) || !ds(t[r], n[r]);
    return a.includes(r) ? (d && console.warn("Unsupported prop change: options.".concat(r, " is not a mutable property.")), s) : d ? nn(nn({}, s || {}), {}, kn({}, r, t[r])) : s;
  }, null) : null;
}, Mt = /* @__PURE__ */ re.createContext(null);
Mt.displayName = "ElementsContext";
var jn = function(t, n) {
  if (!t)
    throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(n, " in an <Elements> provider."));
  return t;
};
X.any, X.object;
var fs = function(t) {
  var n = re.useContext(Mt);
  return jn(n, t);
}, ms = function() {
  var t = fs("calls useElements()"), n = t.elements;
  return n;
};
X.func.isRequired;
var Pn = /* @__PURE__ */ re.createContext(null);
Pn.displayName = "CheckoutContext";
X.any, X.shape({
  clientSecret: X.oneOfType([X.string, X.instanceOf(Promise)]).isRequired,
  elementsOptions: X.object
}).isRequired;
var Ct = function(t) {
  var n = re.useContext(Pn), a = re.useContext(Mt);
  if (n) {
    if (a)
      throw new Error("You cannot wrap the part of your app that ".concat(t, " in both <CheckoutProvider> and <Elements> providers."));
    return n;
  } else
    return jn(a, t);
}, hs = ["mode"], ps = function(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}, pe = function(t, n) {
  var a = "".concat(ps(t), "Element"), s = function(c) {
    var l = c.id, f = c.className, u = c.options, p = u === void 0 ? {} : u, w = c.onBlur, E = c.onFocus, g = c.onReady, x = c.onChange, N = c.onEscape, y = c.onClick, h = c.onLoadError, b = c.onLoaderStart, m = c.onNetworksChange, C = c.onConfirm, v = c.onCancel, O = c.onShippingAddressChange, k = c.onShippingRateChange, I = c.onSavedPaymentMethodRemove, L = c.onSavedPaymentMethodUpdate, q = Ct("mounts <".concat(a, ">")), _ = "elements" in q ? q.elements : null, V = "checkoutState" in q ? q.checkoutState : null, te = (V == null ? void 0 : V.type) === "success" || (V == null ? void 0 : V.type) === "loading" ? V.sdk : null, ee = re.useState(null), le = ss(ee, 2), Z = le[0], ve = le[1], S = re.useRef(null), T = re.useRef(null);
    de(Z, "blur", w), de(Z, "focus", E), de(Z, "escape", N), de(Z, "click", y), de(Z, "loaderror", h), de(Z, "loaderstart", b), de(Z, "networkschange", m), de(Z, "confirm", C), de(Z, "cancel", v), de(Z, "shippingaddresschange", O), de(Z, "shippingratechange", k), de(Z, "savedpaymentmethodremove", I), de(Z, "savedpaymentmethodupdate", L), de(Z, "change", x);
    var F;
    g && (t === "expressCheckout" ? F = g : F = function() {
      g(Z);
    }), de(Z, "ready", F), re.useLayoutEffect(function() {
      if (S.current === null && T.current !== null && (_ || te)) {
        var R = null;
        if (te)
          switch (t) {
            case "paymentForm":
              R = te.createPaymentFormElement();
              break;
            case "payment":
              R = te.createPaymentElement(p);
              break;
            case "address":
              if ("mode" in p) {
                var J = p.mode, D = as(p, hs);
                if (J === "shipping")
                  R = te.createShippingAddressElement(D);
                else if (J === "billing")
                  R = te.createBillingAddressElement(D);
                else
                  throw new Error("Invalid options.mode. mode must be 'billing' or 'shipping'.");
              } else
                throw new Error("You must supply options.mode. mode must be 'billing' or 'shipping'.");
              break;
            case "expressCheckout":
              R = te.createExpressCheckoutElement(p);
              break;
            case "currencySelector":
              R = te.createCurrencySelectorElement();
              break;
            case "taxId":
              R = te.createTaxIdElement(p);
              break;
            default:
              throw new Error("Invalid Element type ".concat(a, ". You must use either the <PaymentElement />, <AddressElement options={{mode: 'shipping'}} />, <AddressElement options={{mode: 'billing'}} />, or <ExpressCheckoutElement />."));
          }
        else _ && (R = _.create(t, p));
        S.current = R, ve(R), R && R.mount(T.current);
      }
    }, [_, te, p]);
    var U = ls(p);
    return re.useEffect(function() {
      if (S.current) {
        var R = us(p, U, ["paymentRequest"]);
        R && "update" in S.current && S.current.update(R);
      }
    }, [p, U]), re.useLayoutEffect(function() {
      return function() {
        if (S.current && typeof S.current.destroy == "function")
          try {
            S.current.destroy(), S.current = null;
          } catch {
          }
      };
    }, []), /* @__PURE__ */ re.createElement("div", {
      id: l,
      className: f,
      ref: T
    });
  }, r = function(c) {
    Ct("mounts <".concat(a, ">"));
    var l = c.id, f = c.className;
    return /* @__PURE__ */ re.createElement("div", {
      id: l,
      className: f
    });
  }, d = n ? r : s;
  return d.propTypes = {
    id: X.string,
    className: X.string,
    onChange: X.func,
    onBlur: X.func,
    onFocus: X.func,
    onReady: X.func,
    onEscape: X.func,
    onClick: X.func,
    onLoadError: X.func,
    onLoaderStart: X.func,
    onNetworksChange: X.func,
    onConfirm: X.func,
    onCancel: X.func,
    onShippingAddressChange: X.func,
    onShippingRateChange: X.func,
    onSavedPaymentMethodRemove: X.func,
    onSavedPaymentMethodUpdate: X.func,
    options: X.object
  }, d.displayName = a, d.__elementType = t, d;
}, ye = typeof window > "u", ys = /* @__PURE__ */ re.createContext(null);
ys.displayName = "EmbeddedCheckoutProviderContext";
var vs = function() {
  var t = Ct("calls useStripe()"), n = t.stripe;
  return n;
};
pe("auBankAccount", ye);
pe("card", ye);
var rn = pe("cardNumber", ye), gs = pe("cardExpiry", ye), bs = pe("cardCvc", ye);
pe("iban", ye);
pe("payment", ye);
pe("expressCheckout", ye);
pe("paymentRequestButton", ye);
pe("linkAuthentication", ye);
pe("address", ye);
pe("shippingAddress", ye);
pe("paymentMethodMessaging", ye);
pe("taxId", ye);
class We {
  constructor(t = {}) {
    const {
      id: n,
      name: a = "Payment",
      className: s = "",
      brandIcon: r,
      cardIcon: d,
      expiryIcon: o,
      cvcIcon: c,
      submit: l,
      disclaimer: f
    } = t || {};
    this.id = n ?? M("alloyPay"), this.name = a, this.className = s || "col-12", this.brandIcon = r instanceof K ? r : new K(
      r || {
        iconClass: "fa-brands fa-cc-stripe fa-2xl"
      }
    ), this.cardIcon = d instanceof K ? d : new K(
      d || {
        iconClass: "fa-solid fa-credit-card"
      }
    ), this.expiryIcon = o instanceof K ? o : new K(
      o || {
        iconClass: "fa-solid fa-calendar-days"
      }
    ), this.cvcIcon = c instanceof K ? c : new K(
      c || {
        iconClass: "fa-solid fa-lock"
      }
    ), this.submit = l instanceof $e ? l : new $e(
      l || {
        name: "Pay now",
        icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
        className: "btn btn-primary w-100 mt-3",
        disabled: !1,
        loading: !1,
        ariaLabel: "Pay now",
        title: "Pay now"
      }
    ), this.disclaimer = typeof f == "string" && f.trim() ? f : "*AlloyMobile do not store your credit card information.";
  }
}
const vt = {
  style: {
    base: {
      fontSize: "16px",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      color: "#212529",
      "::placeholder": {
        color: "#adb5bd"
      }
    },
    invalid: {
      color: "#dc3545"
    }
  }
};
function Tn({ pay: e, output: t }) {
  if (!e || !(e instanceof We))
    throw new Error("AlloyPay requires `pay` (PayObject instance).");
  const n = vs(), a = ms(), [s, r] = B(!1), [d, o] = B(""), c = (u) => {
    typeof t == "function" && t(u);
  };
  async function l(u) {
    var w, E;
    if (!n || !a) {
      const g = new j({
        id: e.id,
        type: "pay",
        action: "error",
        error: !0,
        data: {
          message: "Payment system is not ready. Please try again."
        }
      });
      c(g), o("Payment system is not ready. Please try again.");
      return;
    }
    r(!0), o("");
    const p = a.getElement(rn);
    if (!p) {
      const g = new j({
        id: e.id,
        type: "pay",
        action: "error",
        error: !0,
        data: {
          message: "Card number element is missing."
        }
      });
      c(g), o("Card number element is missing."), r(!1);
      return;
    }
    try {
      const { error: g, paymentMethod: x } = await n.createPaymentMethod({
        type: "card",
        card: p
      });
      if (g || !x) {
        const h = new j({
          id: e.id,
          type: "pay",
          action: "error",
          error: !0,
          data: {
            message: (g == null ? void 0 : g.message) || "Payment failed.",
            code: g == null ? void 0 : g.code
          }
        });
        c(h), o((g == null ? void 0 : g.message) || "Payment failed."), r(!1);
        return;
      }
      const N = ((w = u == null ? void 0 : u.data) == null ? void 0 : w.name) || ((E = e.submit) == null ? void 0 : E.name) || "submit", y = new j({
        id: e.id,
        type: "pay",
        action: N,
        error: !1,
        data: {
          paymentMethodId: x.id,
          paymentMethod: x
        }
      });
      c(y), r(!1);
    } catch (g) {
      const x = g && typeof g.message == "string" ? g.message : "Unexpected error during payment.", N = new j({
        id: e.id,
        type: "pay",
        action: "error",
        error: !0,
        data: {
          message: x
        }
      });
      c(N), o(x), r(!1);
    }
  }
  const f = e.submit;
  return f.loading = s, f.disabled = s || !n || !a, /* @__PURE__ */ A("div", { id: e.id, className: e.className, children: [
    /* @__PURE__ */ i("hr", { className: "my-4" }),
    /* @__PURE__ */ i("h4", { className: "mb-3", children: e.name || "Payment" }),
    /* @__PURE__ */ i("div", { className: "my-3", children: /* @__PURE__ */ A("div", { className: "form-check", children: [
      /* @__PURE__ */ i(
        "input",
        {
          id: `${e.id}-credit`,
          name: "paymentMethod",
          type: "radio",
          className: "form-check-input",
          defaultChecked: !0,
          required: !0
        }
      ),
      /* @__PURE__ */ i(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}-credit`,
          children: "Credit card"
        }
      )
    ] }) }),
    /* @__PURE__ */ i("h4", { className: "text-center", children: /* @__PURE__ */ i(ie, { icon: e.brandIcon }) }),
    /* @__PURE__ */ A("div", { className: "row", children: [
      /* @__PURE__ */ i("div", { className: "col-sm-12", children: /* @__PURE__ */ A("div", { className: "input-group py-2", children: [
        /* @__PURE__ */ i("span", { className: "input-group-text", children: /* @__PURE__ */ i(ie, { icon: e.cardIcon }) }),
        /* @__PURE__ */ A("div", { className: "form-control", children: [
          /* @__PURE__ */ i(
            "label",
            {
              htmlFor: `${e.id}-cardNumber`,
              className: "form-label mb-1",
              children: "Card Number"
            }
          ),
          /* @__PURE__ */ i(
            rn,
            {
              id: `${e.id}-cardNumber`,
              options: vt
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ i("div", { className: "col-lg-6", children: /* @__PURE__ */ A("div", { className: "input-group py-2", children: [
        /* @__PURE__ */ i("span", { className: "input-group-text", children: /* @__PURE__ */ i(ie, { icon: e.expiryIcon }) }),
        /* @__PURE__ */ A("div", { className: "form-control", children: [
          /* @__PURE__ */ i(
            "label",
            {
              htmlFor: `${e.id}-cardExpiry`,
              className: "form-label mb-1",
              children: "Expiry Date"
            }
          ),
          /* @__PURE__ */ i(
            gs,
            {
              id: `${e.id}-cardExpiry`,
              options: vt
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ i("div", { className: "col-lg-6", children: /* @__PURE__ */ A("div", { className: "input-group py-2", children: [
        /* @__PURE__ */ i("span", { className: "input-group-text", children: /* @__PURE__ */ i(ie, { icon: e.cvcIcon }) }),
        /* @__PURE__ */ A("div", { className: "form-control", children: [
          /* @__PURE__ */ i(
            "label",
            {
              htmlFor: `${e.id}-cardCvc`,
              className: "form-label mb-1",
              children: "CVC Number"
            }
          ),
          /* @__PURE__ */ i(
            bs,
            {
              id: `${e.id}-cardCvc`,
              options: vt
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ i(
      un,
      {
        buttonSubmit: f,
        output: l
      }
    ),
    d && /* @__PURE__ */ i("div", { className: "text-danger mt-2 small", children: d }),
    /* @__PURE__ */ i("p", { className: "m-0 p-0 small text-muted", children: e.disclaimer })
  ] });
}
class Ns {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "card border m-2 shadow",
      header: s,
      title: r = "",
      description: d = "",
      src: o,
      poster: c = "",
      controls: l = !0,
      autoPlay: f = !1,
      loop: u = !1,
      muted: p = !1,
      playsInline: w = !0,
      footer: E,
      type: g = "AlloyButtonBar",
      action: x,
      meta: N = {}
    } = t;
    if (!o || typeof o != "string")
      throw new Error("CardVideoObject requires `src` (video URL).");
    this.id = n ?? M("card-video"), this.className = a, this.header = s instanceof ae ? s : s ? new ae(s) : null, this.title = r, this.description = d, this.src = o, this.poster = c, this.controls = !!l, this.autoPlay = !!f, this.loop = !!u, this.muted = !!p, this.playsInline = !!w, this.footer = E instanceof ae ? E : E ? new ae(E) : null, this.type = g === "AlloyLinkBar" ? "AlloyLinkBar" : "AlloyButtonBar", this.type === "AlloyLinkBar" ? this.action = x instanceof ge ? x : new ge(
      x || {
        id: M("video-link-bar"),
        className: "nav gap-2",
        barName: { show: !1 },
        type: "AlloyLink",
        links: []
      }
    ) : this.action = x instanceof Ee ? x : new Ee(
      x || {
        id: M("video-button-bar"),
        className: "btn-group btn-group-sm",
        barName: { show: !1 },
        type: "AlloyButton",
        buttons: []
      }
    ), this.meta = N && typeof N == "object" ? N : {};
  }
}
function Ws({ cardVideo: e, output: t }) {
  if (!e || !(e instanceof Ns))
    throw new Error(
      "AlloyCardVideo requires `cardVideo` (CardVideoObject instance)."
    );
  const n = (c) => {
    typeof t == "function" && t(c);
  };
  function a(c) {
    if (!c || typeof c != "object") return "";
    const l = typeof c.name == "string" ? c.name.trim() : "";
    if (l) return l;
    const f = typeof c.ariaLabel == "string" ? c.ariaLabel.trim() : "";
    if (f) return f;
    const u = typeof c.title == "string" ? c.title.trim() : "";
    if (u) return u;
    const p = typeof c.id == "string" ? c.id.trim() : "";
    return p || "";
  }
  function s() {
    return (c, l) => {
      const f = a(c), u = {
        src: e.src,
        title: e.title,
        description: e.description,
        ...e.meta || {}
      }, p = new j({
        id: e.id,
        type: "card-video",
        action: f,
        error: !1,
        errorMessage: [],
        data: u
      });
      n(p);
    };
  }
  const r = e.header && (e.header.name || e.header.className) ? /* @__PURE__ */ i(
    "div",
    {
      id: e.header.id,
      className: e.header.className || "card-header py-2 fw-semibold",
      "aria-label": e.header.name,
      children: e.header.name
    }
  ) : null, d = /* @__PURE__ */ A("div", { className: "card-body", children: [
    e.title && /* @__PURE__ */ i("h5", { className: "card-title mb-2", children: e.title }),
    /* @__PURE__ */ i("div", { className: "ratio ratio-16x9 mb-2", children: /* @__PURE__ */ i(
      "video",
      {
        src: e.src,
        poster: e.poster || void 0,
        controls: e.controls,
        autoPlay: e.autoPlay,
        loop: e.loop,
        muted: e.muted,
        playsInline: e.playsInline,
        className: "w-100 h-100"
      }
    ) }),
    e.description && /* @__PURE__ */ i("p", { className: "card-text small text-secondary", children: e.description })
  ] }), o = e.footer ? /* @__PURE__ */ A(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      "aria-label": e.footer.name,
      children: [
        /* @__PURE__ */ i("div", { className: "me-auto small text-muted", children: e.footer.name }),
        /* @__PURE__ */ i("div", { role: "group", children: e.type === "AlloyLinkBar" ? /* @__PURE__ */ i(
          _e,
          {
            linkBar: e.action,
            output: s()
          }
        ) : /* @__PURE__ */ i(
          rt,
          {
            buttonBar: e.action,
            output: s()
          }
        ) })
      ]
    }
  ) : null;
  return /* @__PURE__ */ A("div", { id: e.id, className: e.className, children: [
    r,
    d,
    o
  ] });
}
class ws {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "card h-100 rounded-3",
      link: s = "",
      category: r,
      title: d,
      subtitle: o,
      description: c,
      badge: l,
      media: f,
      button: u,
      data: p,
      ...w
    } = t || {};
    this.id = n ?? M("card-carousel"), this.className = a, this.link = typeof s == "string" ? s : "", this.category = r instanceof ae ? r : new ae(
      r || {
        name: "",
        className: "card-title mb-1"
      }
    ), this.title = d instanceof ae ? d : new ae(
      d || {
        name: "",
        className: "card-title mb-1"
      }
    ), this.subtitle = o instanceof ae ? o : new ae(
      o || {
        name: "",
        className: "small text-secondary"
      }
    ), this.description = c instanceof ae ? c : new ae(
      c || {
        name: "",
        className: "mt-3 text-secondary small"
      }
    ), this.badge = l instanceof ae ? l : new ae(
      l || {
        name: "",
        className: "badge text-bg-primary-subtle text-primary"
      }
    );
    const E = f && Array.isArray(f.images) ? f.images : [];
    this.media = {
      images: E
    }, this.button = u instanceof he ? u : u ? new he(u) : null, this.data = p || w.data || {};
  }
}
function Ks({ cardCarousel: e, output: t }) {
  var w, E, g, x, N;
  if (!e || !(e instanceof ws))
    throw new Error(
      "AlloyCardCarousel requires `cardCarousel` (CardCarouselObject instance)."
    );
  const n = Array.isArray((w = e.media) == null ? void 0 : w.images) ? e.media.images : [], a = n.length > 0, s = `${e.id}-carousel`;
  function r(y) {
    if (!y || typeof y != "object") return "";
    const h = typeof y.name == "string" ? y.name.trim() : "";
    if (h) return h;
    const b = typeof y.ariaLabel == "string" ? y.ariaLabel.trim() : "";
    if (b) return b;
    const m = typeof y.title == "string" ? y.title.trim() : "";
    if (m) return m;
    const C = typeof y.id == "string" ? y.id.trim() : "";
    return C || "";
  }
  function d(y) {
    if (typeof t != "function") return;
    const h = y instanceof j ? y.toJSON() : y || {}, b = h.data && h.data.button ? h.data.button : e.button, m = r(b), C = j.ok({
      id: e.id,
      type: "card-carousel",
      action: m,
      data: {
        ...e.data || {}
      }
    });
    t(C);
  }
  const o = /* @__PURE__ */ A("div", { className: "d-flex align-items-center gap-3", children: [
    /* @__PURE__ */ i("div", { className: "category-icon", children: /* @__PURE__ */ i("i", { className: "fa-solid fa-dumpster" }) }),
    /* @__PURE__ */ A("div", { children: [
      ((E = e.category) == null ? void 0 : E.name) && /* @__PURE__ */ i("h5", { className: e.category.className || "card-title mb-1", children: e.category.name }),
      ((g = e.subtitle) == null ? void 0 : g.name) && /* @__PURE__ */ i(
        "div",
        {
          className: e.subtitle.className || "small text-secondary",
          children: e.subtitle.name
        }
      )
    ] })
  ] }), c = a ? /* @__PURE__ */ A("div", { id: s, className: "carousel slide mt-3", children: [
    /* @__PURE__ */ i("div", { className: "carousel-inner rounded-3 overflow-hidden", children: n.map((y, h) => {
      var b;
      return /* @__PURE__ */ i(
        "div",
        {
          className: `carousel-item ${h === 0 ? "active" : ""}`,
          children: /* @__PURE__ */ i(
            "img",
            {
              src: y.url,
              className: "d-block w-100",
              alt: y.altText || ((b = e.title) == null ? void 0 : b.name) || "",
              style: { objectFit: "cover", maxHeight: "220px" }
            }
          )
        },
        y.url || h
      );
    }) }),
    n.length > 1 && /* @__PURE__ */ A(Se, { children: [
      /* @__PURE__ */ A(
        "button",
        {
          className: "carousel-control-prev",
          type: "button",
          "data-bs-target": `#${s}`,
          "data-bs-slide": "prev",
          children: [
            /* @__PURE__ */ i(
              "span",
              {
                className: "carousel-control-prev-icon",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ i("span", { className: "visually-hidden", children: "Previous" })
          ]
        }
      ),
      /* @__PURE__ */ A(
        "button",
        {
          className: "carousel-control-next",
          type: "button",
          "data-bs-target": `#${s}`,
          "data-bs-slide": "next",
          children: [
            /* @__PURE__ */ i(
              "span",
              {
                className: "carousel-control-next-icon",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ i("span", { className: "visually-hidden", children: "Next" })
          ]
        }
      )
    ] })
  ] }) : null, l = (x = e.description) != null && x.name ? /* @__PURE__ */ i(
    "p",
    {
      className: e.description.className || "mt-3 text-secondary small",
      children: e.description.name
    }
  ) : null, f = /* @__PURE__ */ A("div", { className: "d-flex justify-content-between align-items-center mt-2", children: [
    /* @__PURE__ */ i(
      "span",
      {
        className: e.badge.className || "badge text-bg-primary-subtle text-primary",
        children: e.badge.name
      }
    ),
    e.button && /* @__PURE__ */ i(
      st,
      {
        button: e.button,
        output: d
      }
    )
  ] }), u = /* @__PURE__ */ A(Se, { children: [
    o,
    c,
    l,
    f
  ] }), p = e.link ? /* @__PURE__ */ i(
    Ie,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (N = e.title) == null ? void 0 : N.name,
      children: u
    }
  ) : u;
  return /* @__PURE__ */ i("div", { id: e.id, className: e.className, children: /* @__PURE__ */ i("div", { className: "card-body", children: p }) });
}
class Et {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "container-fluid",
      type: s = "table",
      documentClass: r,
      // optional; default depends on type
      modal: d,
      search: o,
      add: c,
      document: l,
      page: f,
      ...u
    } = t || {};
    if (this.id = n ?? M("crud"), this.className = a, this.type = s === "card" ? "card" : "table", this.type === "table" ? this.documentClass = r || "col-12" : this.documentClass = r || "col-sm-6 col-md-4 col-lg-3 mb-3", this.modal = d instanceof Re ? d : new Re(d || {}), this.search = o instanceof Pe ? o : o ? new Pe({ search: o }) : null, this.add = c instanceof se ? c : c ? new se(c) : null, this.type === "table")
      this.document = l instanceof Te ? l : new Te(l || {});
    else {
      const p = Array.isArray(l) ? l : [];
      this.document = p.map(
        (w) => w instanceof Ue ? w : new Ue(w || {})
      );
    }
    this.page = f instanceof ke ? f : f ? new ke(f) : null, Object.assign(this, u);
  }
}
function xs(e) {
  if (!e) return;
  const t = document.getElementById(e);
  if (!t) return;
  const n = typeof window < "u" ? window : void 0;
  if (n && n.bootstrap && n.bootstrap.Modal) {
    n.bootstrap.Modal.getOrCreateInstance(t).show();
    return;
  }
  const a = document.querySelector(
    `[data-bs-toggle="modal"][data-bs-target="#${e}"]`
  );
  a && typeof a.click == "function" && a.click();
}
function Cs({ crud: e, output: t }) {
  var y;
  if (!e || !(e instanceof Et))
    throw new Error("AlloyCrud requires `crud` (CrudObject instance).");
  const n = (h) => {
    typeof t == "function" && t(h);
  }, a = oe(null), s = () => {
    var h;
    if (a.current && typeof a.current.click == "function") {
      a.current.click();
      return;
    }
    (h = e.modal) != null && h.id && xs(e.modal.id);
  }, [r, d] = B(() => {
    var h;
    return {
      mode: "create",
      // "create" | "edit" | "delete"
      data: ((h = e.modal) == null ? void 0 : h.data) || {},
      disabled: !1,
      version: 0
      // bump to force rebuild ModalObject
    };
  }), [o, c] = B(!1);
  be(() => {
    d((h) => {
      var b;
      return {
        mode: "create",
        data: ((b = e.modal) == null ? void 0 : b.data) || {},
        disabled: !1,
        version: h.version + 1
      };
    }), c(!1);
  }, [e]), be(() => {
    var h;
    o && (h = e.modal) != null && h.id && (s(), c(!1));
  }, [r.version, o, (y = e.modal) == null ? void 0 : y.id]);
  const l = fe(() => {
    const h = e.modal;
    let b;
    r.mode === "edit" ? b = "Edit" : r.mode === "delete" ? b = "Delete" : b = h.action || "Create";
    const m = r.data || {}, C = Array.isArray(h.fields) ? h.fields.map((v) => {
      const O = v ? { ...v } : {}, k = O.name;
      return k && Object.prototype.hasOwnProperty.call(m, k) && (O.value = m[k]), r.disabled && (O.disabled = !0, O.readOnly = !0), O;
    }) : [];
    return new Re({
      ...h,
      action: b,
      fields: C,
      data: r.data
    });
  }, [
    e.modal,
    r.mode,
    r.data,
    r.disabled,
    r.version
  ]);
  function f(h = {}) {
    const b = {}, m = e.modal || {}, C = m.data || {};
    return (Array.isArray(m.fields) ? m.fields : []).forEach((O) => {
      const k = O == null ? void 0 : O.name;
      k && (Object.prototype.hasOwnProperty.call(h, k) ? b[k] = h[k] : Object.prototype.hasOwnProperty.call(C, k) ? b[k] = C[k] : b[k] = "");
    }), b;
  }
  const u = (h) => {
    if (!h) return;
    const b = h instanceof j && typeof h.toJSON == "function" ? h.toJSON() : h, m = (b == null ? void 0 : b.action) || "search", C = (b == null ? void 0 : b.data) || {};
    if (m === "search" || m === "select") {
      const v = j.ok({
        id: e.id,
        type: "crud",
        action: m === "select" ? "search-select" : "search",
        data: C
      });
      n(v);
    }
  }, p = (h) => {
    var m, C;
    if (!h) return;
    if (h.type === "column" && h.action === "Sort") {
      const v = ((m = h.data) == null ? void 0 : m.name) ?? "", O = ((C = h.data) == null ? void 0 : C.dir) ?? "", k = v && typeof v == "string" ? { [v]: O } : {}, I = j.ok({
        id: e.id,
        type: "crud",
        action: "Sort",
        data: k
      });
      n(I);
      return;
    }
    if (h.type === "row" && h.action === "navigate") {
      const { to: v, ...O } = h.data || {}, k = j.ok({
        id: e.id,
        type: "crud",
        action: "navigate",
        data: {
          to: v,
          ...O
        }
      });
      n(k);
      return;
    }
    if (h.type === "table") {
      const v = h.data || {}, O = h.action || "", k = (O || "").toLowerCase();
      if (k.includes("edit")) {
        const I = f(v);
        d((L) => ({
          mode: "edit",
          data: I,
          disabled: !1,
          version: L.version + 1
        })), c(!0);
        return;
      }
      if (k.includes("delete")) {
        const I = f(v);
        d((L) => ({
          mode: "delete",
          data: I,
          disabled: !0,
          version: L.version + 1
        })), c(!0);
        return;
      }
      if (O) {
        const I = j.ok({
          id: e.id,
          type: "crud",
          action: O,
          data: {
            ...v
          }
        });
        n(I);
      }
      return;
    }
    const b = j.ok({
      id: e.id,
      type: "crud",
      action: h.action || "table",
      data: { ...h.data || {} }
    });
    n(b);
  }, w = (h) => {
    if (!h || h.type !== "card-action")
      return;
    const b = h.data || {}, m = h.action || "", C = m.toLowerCase();
    if (C.includes("edit")) {
      const v = f(b);
      d((O) => ({
        mode: "edit",
        data: v,
        disabled: !1,
        version: O.version + 1
      })), c(!0);
      return;
    }
    if (C.includes("delete")) {
      const v = f(b);
      d((O) => ({
        mode: "delete",
        data: v,
        disabled: !0,
        version: O.version + 1
      })), c(!0);
      return;
    }
    if (m) {
      const v = j.ok({
        id: e.id,
        type: "crud",
        action: m,
        data: {
          ...b
        }
      });
      n(v);
    }
  }, E = (h) => {
    var v, O;
    if (!h || h.type !== "modal" || h.error)
      return;
    const b = h.data || {};
    let m;
    r.mode === "edit" ? m = "Edit" : r.mode === "delete" ? m = "Delete" : m = ((O = (v = e.modal) == null ? void 0 : v.submit) == null ? void 0 : O.name) || "Create";
    const C = j.ok({
      id: e.id,
      type: "crud",
      action: m,
      data: {
        ...b
      }
    });
    n(C);
  }, g = () => {
    var b;
    const h = ((b = e.modal) == null ? void 0 : b.data) || {};
    d((m) => ({
      mode: "create",
      data: { ...h },
      disabled: !1,
      version: m.version + 1
    })), c(!0);
  }, x = (h) => {
    if (!h) return;
    const b = h instanceof j && typeof h.toJSON == "function" ? h.toJSON() : h, m = (b == null ? void 0 : b.data) || {}, C = j.ok({
      id: e.id,
      type: "crud",
      action: "page",
      data: m
    });
    n(C);
  }, N = () => e.type === "table" ? /* @__PURE__ */ i("div", { className: "row mt-3", children: /* @__PURE__ */ i("div", { className: e.documentClass, children: /* @__PURE__ */ i(
    It,
    {
      tableAction: e.document,
      output: p
    }
  ) }) }) : Array.isArray(e.document) ? /* @__PURE__ */ i("div", { className: "row mt-3", children: e.document.map((h) => /* @__PURE__ */ i("div", { className: e.documentClass, children: /* @__PURE__ */ i(En, { cardAction: h, output: w }) }, h.id)) }) : null;
  return /* @__PURE__ */ A(Se, { children: [
    /* @__PURE__ */ A("div", { className: e.className, children: [
      /* @__PURE__ */ A("div", { className: "row input-group mt-2", children: [
        /* @__PURE__ */ i("div", { className: "col-sm-8", children: e.search && /* @__PURE__ */ i(kt, { search: e.search, output: u }) }),
        /* @__PURE__ */ i("div", { className: "col-sm-4 d-flex align-items-center justify-content-end", children: e.add && /* @__PURE__ */ i(
          Ce,
          {
            buttonIcon: e.add,
            output: g
          }
        ) })
      ] }),
      N(),
      e.page && e.page instanceof ke && /* @__PURE__ */ i("div", { className: "row mt-3", children: /* @__PURE__ */ i("div", { className: "col-12 d-flex justify-content-end", children: /* @__PURE__ */ i(
        nt,
        {
          pagination: e.page,
          output: x
        }
      ) }) })
    ] }),
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        ref: a,
        className: "d-none",
        "data-bs-toggle": "modal",
        "data-bs-target": `#${e.modal.id}`
      }
    ),
    /* @__PURE__ */ i(An, { modal: l, output: E })
  ] });
}
class Es {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "container-fluid",
      modal: s,
      search: r,
      send: d,
      table: o,
      page: c,
      ...l
    } = t || {};
    this.id = n ?? M("email"), this.className = a, this.modal = s instanceof Re ? s : new Re(s || {}), r instanceof Pe ? this.search = r : r ? this.search = new Pe({ search: r }) : this.search = null, this.send = d instanceof se ? d : d ? new se(d) : null, this.table = o instanceof Te ? o : new Te(o || {}), this.page = c instanceof ke ? c : c ? new ke(c) : null, Object.assign(this, l);
  }
}
function As(e) {
  if (!e) return;
  const t = document.getElementById(e);
  if (!t) return;
  const n = typeof window < "u" ? window : void 0;
  if (n && n.bootstrap && n.bootstrap.Modal) {
    n.bootstrap.Modal.getOrCreateInstance(t).show();
    return;
  }
  const a = document.querySelector(
    `[data-bs-toggle="modal"][data-bs-target="#${e}"]`
  );
  a && typeof a.click == "function" && a.click();
}
function Js({ email: e, output: t }) {
  var x;
  if (!e || !(e instanceof Es))
    throw new Error("AlloyEmail requires `email` (EmailObject instance).");
  const n = (N) => {
    typeof t == "function" && t(N);
  }, a = oe(null), s = () => {
    var N;
    if (a.current && typeof a.current.click == "function") {
      a.current.click();
      return;
    }
    (N = e.modal) != null && N.id && As(e.modal.id);
  }, [r, d] = B(() => {
    var N;
    return {
      mode: "compose",
      // "compose" | "open" | "reply" | "delete"
      data: ((N = e.modal) == null ? void 0 : N.data) || {},
      disabled: !1,
      version: 0
      // bump this to force rebuild / open timing
    };
  }), [o, c] = B(!1);
  be(() => {
    d((N) => {
      var y;
      return {
        mode: "compose",
        data: ((y = e.modal) == null ? void 0 : y.data) || {},
        disabled: !1,
        version: N.version + 1
      };
    }), c(!1);
  }, [e]), be(() => {
    var N;
    o && (N = e.modal) != null && N.id && (s(), c(!1));
  }, [r.version, o, (x = e.modal) == null ? void 0 : x.id]);
  const l = fe(() => {
    const N = e.modal;
    let y;
    r.mode === "open" ? y = "Open" : r.mode === "reply" ? y = "Reply" : r.mode === "delete" ? y = "Delete" : y = N.action || "Compose";
    const h = r.data || {}, b = Array.isArray(N.fields) ? N.fields.map((m) => {
      const C = m ? { ...m } : {}, v = C.name;
      return v && Object.prototype.hasOwnProperty.call(h, v) && (C.value = h[v]), r.disabled && (C.disabled = !0, C.readOnly = !0), C;
    }) : [];
    return new Re({
      ...N,
      action: y,
      fields: b,
      data: r.data
    });
  }, [e.modal, r.mode, r.data, r.disabled]);
  function f(N = {}) {
    const y = {}, h = e.modal || {}, b = h.data || {};
    return (Array.isArray(h.fields) ? h.fields : []).forEach((C) => {
      const v = C == null ? void 0 : C.name;
      v && (Object.prototype.hasOwnProperty.call(N, v) ? y[v] = N[v] : Object.prototype.hasOwnProperty.call(b, v) ? y[v] = b[v] : y[v] = "");
    }), y;
  }
  const u = (N) => {
    if (!N) return;
    const y = N instanceof j && typeof N.toJSON == "function" ? N.toJSON() : N, h = y.action === "select" ? "search-select" : "search", b = y.data || {}, m = j.ok({
      id: e.id,
      type: "email",
      action: h,
      data: b
    });
    n(m);
  }, p = (N) => {
    var h, b;
    if (!N) return;
    if (N.type === "column" && N.action === "Sort") {
      const m = ((h = N.data) == null ? void 0 : h.name) ?? "", C = ((b = N.data) == null ? void 0 : b.dir) ?? "", v = m && typeof m == "string" ? { [m]: C } : {}, O = j.ok({
        id: e.id,
        type: "email",
        action: "Sort",
        data: v
      });
      n(O);
      return;
    }
    if (N.type === "row" && N.action === "navigate") {
      const { to: m, ...C } = N.data || {}, v = j.ok({
        id: e.id,
        type: "email",
        action: "navigate",
        data: {
          to: m,
          ...C
        }
      });
      n(v);
      return;
    }
    if (N.type === "table") {
      const m = N.data || {}, C = N.action || "", v = (C || "").toLowerCase();
      if (v.includes("open")) {
        const O = f(m);
        d((k) => ({
          mode: "open",
          data: O,
          disabled: !0,
          // read-only view
          version: k.version + 1
        })), c(!0);
        return;
      }
      if (v.includes("reply")) {
        const O = f(m);
        d((k) => ({
          mode: "reply",
          data: O,
          disabled: !1,
          version: k.version + 1
        })), c(!0);
        return;
      }
      if (v.includes("delete")) {
        const O = f(m);
        d((k) => ({
          mode: "delete",
          data: O,
          disabled: !0,
          // read-only confirm
          version: k.version + 1
        })), c(!0);
        return;
      }
      if (C) {
        const O = j.ok({
          id: e.id,
          type: "email",
          action: C,
          data: {
            ...m
          }
        });
        n(O);
      }
      return;
    }
    const y = j.ok({
      id: e.id,
      type: "email",
      action: N.action || "table",
      data: { ...N.data || {} }
    });
    n(y);
  }, w = (N) => {
    if (!N) return;
    const h = (N instanceof j && typeof N.toJSON == "function" ? N.toJSON() : N).data || {}, b = j.ok({
      id: e.id,
      type: "email",
      action: "page",
      data: h
    });
    n(b);
  }, E = (N) => {
    var m, C;
    if (!N || N.type !== "modal" || N.error)
      return;
    const y = N.data || {};
    let h;
    r.mode === "open" ? h = "Open" : r.mode === "reply" ? h = "Reply" : r.mode === "delete" ? h = "Delete" : h = ((C = (m = e.modal) == null ? void 0 : m.submit) == null ? void 0 : C.name) || "submit";
    const b = j.ok({
      id: e.id,
      type: "email",
      action: h,
      data: {
        ...y
      }
    });
    n(b);
  }, g = () => {
    var y;
    const N = ((y = e.modal) == null ? void 0 : y.data) || {};
    d((h) => ({
      mode: "compose",
      data: { ...N },
      // fresh clone every time
      disabled: !1,
      version: h.version + 1
    })), c(!0);
  };
  return /* @__PURE__ */ A(Se, { children: [
    /* @__PURE__ */ A("div", { className: e.className, children: [
      /* @__PURE__ */ A("div", { className: "row input-group mt-2", children: [
        /* @__PURE__ */ i("div", { className: "col-sm-8", children: e.search && /* @__PURE__ */ i(
          kt,
          {
            search: e.search,
            output: u
          }
        ) }),
        /* @__PURE__ */ i("div", { className: "col-sm-4 d-flex align-items-center justify-content-end", children: e.send && /* @__PURE__ */ i(
          Ce,
          {
            buttonIcon: e.send,
            output: g
          }
        ) })
      ] }),
      /* @__PURE__ */ i(
        It,
        {
          tableAction: e.table,
          output: p
        }
      ),
      e.page && /* @__PURE__ */ i("div", { className: "mt-2", children: /* @__PURE__ */ i(
        nt,
        {
          pagination: e.page,
          output: w
        }
      ) })
    ] }),
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        ref: a,
        className: "d-none",
        "data-bs-toggle": "modal",
        "data-bs-target": `#${e.modal.id}`
      }
    ),
    /* @__PURE__ */ i(An, { modal: l, output: E })
  ] });
}
class Ss {
  constructor(t = {}) {
    const {
      id: n,
      title: a = "Contact Us",
      type: s = "AlloyInputTextIcon",
      className: r = "d-flex justify-content-center flex-column text-center h-100 mt-3",
      contactClass: d = "col-12 col-md-6",
      addressClass: o = "col-12 col-md-6",
      contactForm: c,
      addressCard: l,
      data: f,
      ...u
    } = t || {};
    if (this.id = n ?? M("contact"), this.title = a, this.type = s, this.className = r, this.contactClass = d, this.addressClass = o, this.contactForm = c instanceof we ? c : new we(c || {}), l instanceof je)
      this.addressCard = l;
    else {
      const p = l || {}, w = p.body || {
        id: "contactAddressBody",
        className: "card-body"
      }, E = Array.isArray(p.fields) && p.fields.length > 0, g = E ? p.fields : [
        {
          id: "addressLine",
          className: "text-center text-muted",
          name: w.name || "Configure addressCard.fields to show address info."
        }
      ], x = {
        ...w,
        name: E && w.name || ""
      }, N = {
        id: p.id || "contactAddressFallback",
        className: p.className || "card border-0",
        header: p.header,
        body: x,
        fields: g,
        footer: p.footer
      };
      this.addressCard = new je(N);
    }
    this.data = f || {}, Object.assign(this, u);
  }
}
function Vs({ contact: e, output: t }) {
  if (!e || !(e instanceof Ss))
    throw new Error(
      "AlloyContact requires `contact` (ContactObject instance)."
    );
  const n = (s) => {
    typeof t == "function" && t(s);
  };
  function a(s) {
    if (!s) return;
    const r = s instanceof j && typeof s.toJSON == "function" ? s.toJSON() : s || {}, d = new j({
      id: e.id,
      type: "contact",
      action: r.action || "submit",
      error: !!r.error,
      data: r.data || {}
    });
    n(d);
  }
  return /* @__PURE__ */ A("div", { id: e.id, className: e.className, children: [
    /* @__PURE__ */ i("h1", { className: "text-center mb-4", children: e.title }),
    /* @__PURE__ */ A("div", { className: "row d-flex align-items-center", children: [
      /* @__PURE__ */ i("div", { className: e.contactClass, children: /* @__PURE__ */ i(ct, { form: e.contactForm, output: a }) }),
      /* @__PURE__ */ i("div", { className: e.addressClass, children: /* @__PURE__ */ i($a, { card: e.addressCard }) })
    ] })
  ] });
}
class Os {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "col m-2",
      action: s = "",
      profileForm: r,
      data: d,
      address: o,
      name: c = "",
      email: l = "",
      icon: f,
      ...u
    } = t || {};
    this.id = n ?? "profile", this.className = a, this.action = s, this.name = c, this.email = l, this.icon = f instanceof K ? f : new K(
      f || {
        iconClass: "fa-solid fa-user fa-2xl"
      }
    ), this.profileForm = r instanceof we ? r : new we(r || {}), this.data = d || {}, this.address = o instanceof Et ? o : new Et(o || {}), Object.assign(this, u);
  }
}
function Ys({ profile: e, output: t }) {
  if (!e || !(e instanceof Os))
    throw new Error("AlloyProfile requires `profile` (ProfileObject instance).");
  const n = (r) => {
    typeof t == "function" && t(r);
  }, a = (r) => {
    if (!r || r.type !== "form") return;
    const d = r instanceof j && typeof r.toJSON == "function" ? r.toJSON() : r, o = new j({
      id: e.id,
      type: "profile",
      action: "form.submit",
      error: !!d.error,
      data: d.data || {}
    });
    n(o);
  }, s = (r) => {
    if (!r) return;
    const d = r instanceof j && typeof r.toJSON == "function" ? r.toJSON() : r, o = new j({
      id: e.id,
      type: "profile",
      action: `address.${d.action || "unknown"}`,
      error: !!d.error,
      data: d.data || {}
    });
    n(o);
  };
  return /* @__PURE__ */ A("div", { id: e.id, className: e.className, children: [
    /* @__PURE__ */ A("div", { className: "row m-2", children: [
      /* @__PURE__ */ i("div", { className: "col-md-12 col-lg-3", children: /* @__PURE__ */ i("div", { className: "card h-100", children: /* @__PURE__ */ A("div", { className: "card-body d-flex flex-column justify-content-center align-items-center", children: [
        /* @__PURE__ */ i("div", { className: "m-2 text-center p-3 border bg-dark rounded-circle text-white", children: /* @__PURE__ */ i(ie, { icon: e.icon }) }),
        /* @__PURE__ */ i("div", { className: "text-center", children: /* @__PURE__ */ i("span", { children: e.name }) }),
        /* @__PURE__ */ i("div", { className: "text-center", children: /* @__PURE__ */ i("span", { children: e.email }) })
      ] }) }) }),
      /* @__PURE__ */ i("div", { className: "col-md-12 col-lg-9", children: /* @__PURE__ */ i(ct, { form: e.profileForm, output: a }) })
    ] }),
    /* @__PURE__ */ i("hr", {}),
    /* @__PURE__ */ i("h4", { children: "Address:" }),
    /* @__PURE__ */ i(Cs, { crud: e.address, output: s })
  ] });
}
class ks {
  constructor(t = {}) {
    const {
      id: n,
      title: a = "AlloyMobile",
      className: s = "col m-2",
      message: r = "",
      action: d = "",
      fields: o,
      pay: c,
      data: l
    } = t || {};
    this.id = n ?? M("checkout"), this.title = a, this.className = s, this.message = r, this.action = d;
    const f = Array.isArray(o) ? o : [];
    this.fields = f.map(
      (u) => u instanceof ue ? u : new ue(u || {})
    ), this.pay = c instanceof We ? c : new We(c || {}), this.data = l ?? {};
  }
}
function zs({ checkout: e, output: t }) {
  if (!e || !(e instanceof ks))
    throw new Error(
      "AlloyCheckout requires `checkout` (CheckoutObject instance)."
    );
  const n = (o) => {
    typeof t == "function" && t(o);
  }, [a, s] = B(() => {
    const o = {};
    return e.fields.forEach((c) => {
      c != null && c.name && (o[c.name] = c.value);
    }), o;
  }), r = (o) => {
    const c = o instanceof j ? o.data || {} : o || {}, { name: l, value: f } = c;
    l && s((u) => {
      const p = { ...u, [l]: f }, w = j.ok({
        id: e.id,
        type: "checkout",
        action: "field",
        data: {
          name: l,
          value: f,
          values: p
        }
      });
      return n(w), p;
    });
  }, d = (o) => {
    const c = o instanceof j && typeof o.toJSON == "function" ? o.toJSON() : o || {}, l = c.action || e.action || "submit", f = j.ok({
      id: e.id,
      type: "checkout",
      action: l,
      data: {
        billing: { ...a },
        pay: c
      }
    });
    n(f);
  };
  return /* @__PURE__ */ A("div", { className: e.className, id: e.id, children: [
    /* @__PURE__ */ i("h3", { children: e.title }),
    e.message && e.message.trim() !== "" && /* @__PURE__ */ i("div", { className: "alert alert-text-danger m-0 p-0", children: e.message }),
    /* @__PURE__ */ i("hr", { className: "my-4" }),
    /* @__PURE__ */ A("div", { className: "row m-2", children: [
      /* @__PURE__ */ A("div", { className: "col-sm-12 col-md-6 col-lg-8 col-xl-9 border-end", children: [
        /* @__PURE__ */ i("h5", { children: "Billing address:" }),
        e.fields.map((o) => /* @__PURE__ */ i(
          Le,
          {
            input: o,
            output: r
          },
          o.id
        )),
        /* @__PURE__ */ i(Tn, { pay: e.pay, output: d })
      ] }),
      /* @__PURE__ */ A("div", { className: "col-sm-12 col-md-6 col-lg-4 col-xl-3", children: [
        /* @__PURE__ */ A("h4", { className: "d-flex justify-content-between align-items-center mb-3", children: [
          /* @__PURE__ */ i("span", { className: "text-dark h5", children: "Total bill:" }),
          /* @__PURE__ */ i("span", { className: "badge bg-dark rounded-pill", children: "5" })
        ] }),
        /* @__PURE__ */ A("ul", { className: "list-group mb-3", children: [
          /* @__PURE__ */ A("li", { className: "list-group-item d-flex justify-content-between lh-sm", children: [
            /* @__PURE__ */ i("div", { children: /* @__PURE__ */ i("h6", { className: "my-0", children: "Electric bill" }) }),
            /* @__PURE__ */ i("span", { className: "text-muted", children: "25 CAD" })
          ] }),
          /* @__PURE__ */ A("li", { className: "list-group-item d-flex justify-content-between", children: [
            /* @__PURE__ */ i("span", { children: "Total (CAD)" }),
            /* @__PURE__ */ i("strong", { children: "25 CAD" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
class js {
  constructor(t = {}) {
    const {
      id: n,
      title: a = "AlloyMobile",
      className: s = "col m-2",
      message: r = "",
      action: d = "",
      fields: o,
      pay: c,
      amountBar: l,
      data: f
    } = t || {};
    this.id = n ?? M("donate"), this.title = a, this.className = s, this.message = r, this.action = d;
    const u = Array.isArray(o) ? o : [];
    this.fields = u.map(
      (p) => p instanceof ue ? p : new ue(p || {})
    ), this.pay = c instanceof We ? c : new We(c || {}), this.amountBar = l instanceof Ee ? l : new Ee(
      l || {
        className: "nav gap-2 my-3",
        buttonClass: "btn btn-outline-secondary",
        barName: { show: !1 },
        type: "AlloyButton",
        buttons: []
      }
    ), this.data = f ?? {};
  }
}
function Hs({ donate: e, output: t }) {
  if (!e || !(e instanceof js))
    throw new Error(
      "AlloyDonate requires `donate` (DonateObject instance)."
    );
  const n = (f) => {
    typeof t == "function" && t(f);
  }, [a, s] = B(() => {
    const f = {};
    return e.fields.forEach((u) => {
      u != null && u.name && (f[u.name] = u.value);
    }), f;
  }), [r, d] = B(""), o = (f) => {
    const u = f instanceof j ? f.data || {} : f || {}, { name: p, value: w } = u;
    p && s((E) => {
      const g = { ...E, [p]: w }, x = j.ok({
        id: e.id,
        type: "donate",
        action: "field",
        data: {
          name: p,
          value: w,
          values: g
        }
      });
      return n(x), g;
    });
  }, c = (f) => {
    var g, x;
    const u = f instanceof j && typeof f.toJSON == "function" ? f.toJSON() : f || {}, p = ((g = u == null ? void 0 : u.data) == null ? void 0 : g.value) ?? ((x = u == null ? void 0 : u.data) == null ? void 0 : x.name) ?? (u == null ? void 0 : u.action) ?? "", w = String(p).trim();
    d(w);
    const E = j.ok({
      id: e.id,
      type: "donate",
      action: "amount",
      data: {
        amount: w,
        raw: u
      }
    });
    n(E);
  }, l = (f) => {
    const u = f instanceof j && typeof f.toJSON == "function" ? f.toJSON() : f || {}, p = u.action || e.action || "submit", w = j.ok({
      id: e.id,
      type: "donate",
      action: p,
      data: {
        donor: { ...a },
        amount: r,
        pay: u
      }
    });
    n(w);
  };
  return /* @__PURE__ */ A("div", { className: e.className, id: e.id, children: [
    /* @__PURE__ */ i("h3", { children: e.title }),
    e.message && e.message.trim() !== "" && /* @__PURE__ */ i("div", { className: "alert alert-text-danger m-0 p-0", children: e.message }),
    /* @__PURE__ */ i("hr", { className: "my-3" }),
    /* @__PURE__ */ i("div", { className: "row m-2", children: /* @__PURE__ */ A("div", { className: "col-12", children: [
      /* @__PURE__ */ i("h5", { children: "Payment Details:" }),
      e.fields.map((f) => /* @__PURE__ */ i(
        Le,
        {
          input: f,
          output: o
        },
        f.id
      )),
      e.amountBar && Array.isArray(e.amountBar.buttons) && e.amountBar.buttons.length > 0 && /* @__PURE__ */ i(
        rt,
        {
          buttonBar: e.amountBar,
          output: c
        }
      ),
      /* @__PURE__ */ i(Tn, { pay: e.pay, output: l })
    ] }) })
  ] });
}
class At {
  constructor(t = {}) {
    this.url = t.url || "", this.altText = t.altText || "", this.isPrimary = !!t.isPrimary, this.sortOrder = typeof t.sortOrder == "number" ? t.sortOrder : 0;
  }
}
class on {
  constructor(t = {}) {
    this.id = t.id ?? M("gallery-item"), this.productName = t.productName || "", this.productSlug = t.productSlug || "", this.categoryName = t.categoryName || "", this.subcategoryName = t.subcategoryName || "", this.shortDescription = t.shortDescription || "", this.status = t.status || "", this.tags = Array.isArray(t.tags) ? t.tags : [];
    const a = (t.media && Array.isArray(t.media.images) ? t.media.images : []).map((r) => new At(r));
    a.sort((r, d) => r.sortOrder - d.sortOrder), this.images = a;
    const s = t.pricing || {};
    this.pricing = {
      currency: s.currency || "CAD",
      unitPrice: typeof s.unitPrice == "number" ? s.unitPrice : 0,
      salePrice: typeof s.salePrice == "number" ? s.salePrice : 0
    }, this.data = t.data || {};
  }
}
class Ps {
  constructor(t = {}) {
    const {
      id: n,
      name: a = "Product Gallery",
      className: s = "container-fluid",
      search: r,
      items: d,
      ...o
    } = t || {};
    this.id = n ?? M("gallery"), this.name = a, this.className = s, this.search = r instanceof ue ? r : r ? new ue(r) : null;
    const c = Array.isArray(d) ? d : [];
    this.items = c.map(
      (l) => l instanceof on ? l : new on(l)
    ), Object.assign(this, o);
  }
}
function Gs({ gallery: e, output: t }) {
  if (!e || !(e instanceof Ps))
    throw new Error(
      "AlloyGallery requires `gallery` (GalleryObject instance)."
    );
  const n = (y) => {
    typeof t == "function" && t(y);
  }, [a, s] = B(""), [r, d] = B({}), [o, c] = B({});
  function l(y, h) {
    const b = e.items.filter((C) => {
      const v = y[C.id];
      return typeof v == "number" && v > 0;
    }).map((C) => {
      const v = y[C.id], O = C.pricing.salePrice > 0 ? C.pricing.salePrice : C.pricing.unitPrice, k = O * v;
      return {
        id: C.id,
        productName: C.productName,
        quantity: v,
        unitPrice: O,
        currency: C.pricing.currency,
        totalPrice: k
      };
    }), m = j.ok({
      id: e.id,
      type: "gallery",
      action: h || "updateQuantity",
      data: {
        items: b
      }
    });
    n(m);
  }
  function f(y, h, b) {
    d((m) => {
      const C = { ...m }, v = Number.isFinite(h) ? Math.max(0, h) : 0;
      return v <= 0 ? delete C[y] : C[y] = v, l(
        C,
        b
      ), C;
    });
  }
  function u(y) {
    d((h) => {
      const b = { ...h }, C = (Number.isFinite(h[y]) ? h[y] : 0) + 1;
      return b[y] = C, l(b, "add"), b;
    });
  }
  function p(y, h) {
    const b = parseInt(h, 10);
    Number.isNaN(b) ? f(y, 0, "updateQuantity") : f(y, b, "updateQuantity");
  }
  function w(y, h) {
    c((b) => ({
      ...b,
      [y]: h
    }));
  }
  function E(y) {
    const h = y instanceof j ? y.data || {} : y || {}, { name: b, value: m } = h, C = typeof m == "string" ? m.trim().toLowerCase() : "";
    s(C);
    const v = b && typeof b == "string" ? { [b]: m } : {}, O = j.ok({
      id: e.id,
      type: "gallery",
      action: "search",
      data: v
    });
    n(O);
  }
  const g = fe(() => a ? e.items.filter((y) => [
    y.productName,
    y.categoryName,
    y.subcategoryName,
    y.shortDescription,
    y.status,
    ...y.tags || []
  ].filter(Boolean).join(" ").toLowerCase().includes(a)) : e.items, [e.items, a]);
  function x(y) {
    const h = y.pricing.salePrice > 0 ? y.pricing.salePrice : y.pricing.unitPrice, b = y.pricing.currency || "CAD";
    return !h || h <= 0 ? null : /* @__PURE__ */ i("div", { className: "mt-2", children: /* @__PURE__ */ A("span", { className: "fw-semibold", children: [
      b,
      " ",
      h.toFixed(2)
    ] }) });
  }
  function N(y) {
    const h = y.images && y.images.length > 0 ? y.images : [
      new At({
        url: "",
        altText: y.productName || "No image",
        sortOrder: 0
      })
    ], b = typeof o[y.id] == "number" ? o[y.id] : 0, m = h[b] || h[0] || new At({}), C = r[y.id] || 0;
    return /* @__PURE__ */ i(
      "div",
      {
        className: "col-12 col-md-6 col-lg-4 mb-3 item",
        "data-category": y.categoryName,
        "data-title": y.productName,
        children: /* @__PURE__ */ i("div", { className: "card h-100 rounded-3", children: /* @__PURE__ */ A("div", { className: "card-body", children: [
          /* @__PURE__ */ A("div", { className: "d-flex align-items-center gap-3", children: [
            /* @__PURE__ */ i("div", { className: "category-icon", children: /* @__PURE__ */ i(
              "i",
              {
                className: "fa-solid fa-dumpster",
                "aria-hidden": "true"
              }
            ) }),
            /* @__PURE__ */ A("div", { children: [
              /* @__PURE__ */ i("h5", { className: "card-title mb-1", children: y.categoryName || "Category" }),
              /* @__PURE__ */ i("div", { className: "small text-secondary", children: y.productName || "Product name" })
            ] })
          ] }),
          /* @__PURE__ */ i("div", { className: "mt-3 w-100 text-center", children: m.url ? /* @__PURE__ */ i(
            "img",
            {
              src: m.url,
              alt: m.altText || y.productName,
              className: "img-fluid rounded-3",
              style: {
                maxHeight: "210px",
                objectFit: "cover"
              }
            }
          ) : /* @__PURE__ */ i(
            "div",
            {
              className: "bg-light border rounded-3 w-100",
              style: { height: "210px" }
            }
          ) }),
          h.length > 1 && /* @__PURE__ */ i("div", { className: "d-flex gap-2 justify-content-center mt-2", children: h.map((v, O) => /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "btn btn-sm p-0 border-0 " + (O === b ? "opacity-100" : "opacity-75"),
              onClick: () => w(y.id, O),
              "aria-label": `Image ${O + 1} for ${y.productName || "product"}`,
              children: v.url ? /* @__PURE__ */ i(
                "img",
                {
                  src: v.url,
                  alt: v.altText,
                  className: "rounded",
                  style: {
                    width: "52px",
                    height: "52px",
                    objectFit: "cover",
                    border: O === b ? "2px solid var(--bs-primary)" : "1px solid #dee2e6"
                  }
                }
              ) : /* @__PURE__ */ i(
                "div",
                {
                  className: "bg-light rounded",
                  style: {
                    width: "52px",
                    height: "52px",
                    border: O === b ? "2px solid var(--bs-primary)" : "1px solid #dee2e6"
                  }
                }
              )
            },
            `${y.id}-thumb-${O}`
          )) }),
          /* @__PURE__ */ i("p", { className: "mt-3 text-secondary small", children: y.shortDescription || "Product description goes here." }),
          x(y),
          /* @__PURE__ */ A("div", { className: "d-flex justify-content-between align-items-center mt-3", children: [
            /* @__PURE__ */ i("span", { className: "badge text-bg-primary-subtle text-primary", children: y.status || "Available" }),
            /* @__PURE__ */ A("div", { className: "d-flex align-items-center gap-2", children: [
              /* @__PURE__ */ i(
                "input",
                {
                  type: "number",
                  min: "0",
                  className: "form-control form-control-sm",
                  style: { width: "70px" },
                  value: C,
                  onChange: (v) => p(
                    y.id,
                    v.target.value
                  ),
                  "aria-label": `Quantity for ${y.productName}`
                }
              ),
              /* @__PURE__ */ A(
                "button",
                {
                  type: "button",
                  className: "btn btn-sm btn-primary addCart",
                  onClick: () => u(y.id),
                  children: [
                    /* @__PURE__ */ i(
                      "i",
                      {
                        className: "fa-solid fa-cart-plus me-1",
                        "aria-hidden": "true"
                      }
                    ),
                    "Add"
                  ]
                }
              )
            ] })
          ] })
        ] }) })
      },
      y.id
    );
  }
  return /* @__PURE__ */ A("div", { id: e.id, className: e.className, children: [
    /* @__PURE__ */ i("div", { className: "d-flex justify-content-between align-items-center mb-2 mt-2", children: /* @__PURE__ */ i("h4", { className: "mb-0", children: e.name }) }),
    e.search && /* @__PURE__ */ i("div", { className: "row mb-3", children: /* @__PURE__ */ i("div", { className: "col-12 col-md-6 col-lg-4", children: /* @__PURE__ */ i(
      Le,
      {
        input: e.search,
        output: E
      }
    ) }) }),
    /* @__PURE__ */ i("div", { className: "row", children: g.length === 0 ? /* @__PURE__ */ i("div", { className: "col-12", children: /* @__PURE__ */ i("div", { className: "alert alert-info mb-0", children: "No products match your search." }) }) : g.map((y) => N(y)) })
  ] });
}
class cn {
  constructor(t = {}) {
    const {
      id: n,
      name: a,
      className: s = "footer pt-5 pb-4 bg-dark text-light",
      logo: r,
      details: d,
      social: o,
      section: c,
      subscribe: l
    } = t || {};
    if (this.id = n ?? M("footer"), this.name = a ?? "Footer", this.className = s, r instanceof et ? this.logo = r : this.logo = new et(
      r || {
        imageUrl: "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
        alt: "Alloymobile"
      }
    ), d instanceof ce ? this.details = d : this.details = new ce(
      d || {
        // "details with name only ignore logo and icon"
        name: "Professional marketplace connecting precast manufacturers, engineers and buyers. New & used equipment, services and standards — in one platform.",
        className: "small opacity-75 mb-2",
        colClass: "col-12 col-md-3"
      }
    ), o instanceof ge)
      this.social = o;
    else {
      const u = o || {};
      this.social = new ge({
        id: u.id ?? M("footer-social"),
        className: u.className ?? "nav gap-3",
        type: u.type ?? "AlloyLinkIcon",
        linkClass: u.linkClass ?? "nav-link p-0 text-light",
        selected: u.selected ?? "active",
        title: u.title,
        // TagObject handled inside LinkBarObject
        links: Array.isArray(u.links) ? u.links : []
      });
    }
    const f = Array.isArray(c) ? c : [];
    if (this.section = f.map((u) => u instanceof ge ? u : new ge({
      id: u.id ?? M("footer-section"),
      className: u.className ?? "list-unstyled small",
      type: u.type ?? "AlloyLink",
      linkClass: u.linkClass ?? "d-block mb-1 text-decoration-none text-light",
      selected: u.selected ?? "active",
      title: u.title,
      // wrapped into TagObject inside LinkBarObject
      links: Array.isArray(u.links) ? u.links : []
    })), l instanceof we)
      this.subscribe = l;
    else {
      const u = l || {};
      this.subscribe = new we({
        id: u.id ?? M("footer-subscribe"),
        title: u.title ?? "Stay in the loop",
        className: u.className ?? "",
        message: u.message ?? "",
        action: u.action ?? "subscribe",
        type: u.type ?? "AlloyInputTextIcon",
        submit: u.submit || {
          name: "Subscribe",
          icon: { iconClass: "fa-solid fa-paper-plane" },
          className: "btn btn-primary w-100 mt-2",
          disabled: !1,
          loading: !1,
          ariaLabel: "Subscribe to newsletter",
          title: "Subscribe"
        },
        fields: Array.isArray(u.fields) && u.fields.length > 0 ? u.fields : [
          {
            name: "email",
            label: "Email",
            type: "email",
            layout: "text",
            placeholder: "name@company.com",
            required: !0,
            className: "form-control"
          }
        ],
        data: u.data ?? {}
      });
    }
  }
}
function Qs({ footer: e, output: t }) {
  const n = e instanceof cn ? e : new cn(e || {}), a = (o) => {
    typeof t == "function" && t(o);
  }, s = (o) => {
    if (!o) return;
    const c = o instanceof j && typeof o.toJSON == "function" ? o.toJSON() : o;
    if (c.type !== "form" || c.action !== "submit")
      return;
    const l = !!c.error, f = c.data || {}, u = new j({
      id: n.id,
      type: "footer",
      action: "subscribe",
      error: l,
      data: f
    });
    a(u);
  }, r = (o) => {
    if (!o) return;
    const c = o instanceof j && typeof o.toJSON == "function" ? o.toJSON() : o, l = c.data || {}, f = l.link || {}, u = f.href || l.href || "#", p = typeof f.name == "string" && f.name.trim() || typeof f.ariaLabel == "string" && f.ariaLabel.trim() || c.action || "link", w = new j({
      id: n.id,
      type: "footer",
      action: p,
      error: !1,
      data: { href: u }
    });
    a(w);
  }, d = Array.isArray(n.section) ? n.section : [];
  return /* @__PURE__ */ i("footer", { id: n.id, className: n.className, children: /* @__PURE__ */ i("div", { className: "container", children: /* @__PURE__ */ A("div", { className: "row g-4", children: [
    /* @__PURE__ */ A("div", { className: "col-12 col-md-3", children: [
      n.logo && /* @__PURE__ */ i("div", { className: "mb-2", children: /* @__PURE__ */ i(
        "img",
        {
          src: n.logo.imageUrl,
          alt: n.logo.alt,
          className: n.logo.className,
          style: {
            width: n.logo.width,
            height: n.logo.height
          }
        }
      ) }),
      n.logo && n.logo.alt && /* @__PURE__ */ i("h6", { className: "fw-semibold mb-1", children: n.logo.alt }),
      n.details && n.details.name && /* @__PURE__ */ i(
        "p",
        {
          className: n.details.className || "small opacity-75 mb-2",
          children: n.details.name
        }
      ),
      n.social && /* @__PURE__ */ i("div", { className: "mt-2", children: /* @__PURE__ */ i(
        _e,
        {
          linkBar: n.social,
          output: r
        }
      ) })
    ] }),
    d.map((o, c) => /* @__PURE__ */ i(
      "div",
      {
        className: "col-12 col-md-3",
        children: /* @__PURE__ */ i(
          _e,
          {
            linkBar: o,
            output: r
          }
        )
      },
      o.id || `footer-section-${c}`
    )),
    /* @__PURE__ */ i("div", { className: "col-12 col-md-3", children: /* @__PURE__ */ i(
      ct,
      {
        form: n.subscribe,
        output: s
      }
    ) })
  ] }) }) });
}
class ln {
  constructor(t = {}) {
    const {
      id: n,
      title: a = "Join PExChange",
      description: s = "Create your account to access the full marketplace.",
      cardClassName: r = "bg-white p-3 p-lg-4 rounded-2xl shadow-soft border search-wrap",
      form: d,
      signin: o,
      privacy: c,
      terms: l,
      signinText: f = "Already have an account?",
      termsAndPrivacy: u = "By signing up, you agree to our"
    } = t;
    if (this.id = n ?? M("signup"), this.title = a, this.description = s, this.cardClassName = r, !d)
      throw new Error("SignupObject requires `form` (FormObject or config).");
    d instanceof we ? this.form = d : this.form = new we({
      id: d.id ?? this.id,
      ...d
    }), this.signin = new xe(o), this.privacy = new xe(c), this.terms = new xe(l), this.signinText = f, this.termsAndPrivacy = u;
  }
}
function Ts({ signup: e, output: t }) {
  const n = e instanceof ln ? e : new ln(e || {});
  typeof loading == "boolean" && (n.form.submit.loading = loading, n.form.submit.disabled = loading), typeof message == "string" && (n.form.message = message);
  function a(s) {
    t == null || t(s);
  }
  return /* @__PURE__ */ A("div", { className: n.cardClassName, id: n.id, children: [
    /* @__PURE__ */ A("div", { className: "text-center mb-3", children: [
      /* @__PURE__ */ i("div", { className: "h4 fw-bold text-gray-800 mb-1", children: n.title }),
      n.description && /* @__PURE__ */ i("div", { className: "text-muted small", children: n.description })
    ] }),
    /* @__PURE__ */ i("div", { className: "mt-3", children: /* @__PURE__ */ i(ct, { form: n.form, output: a }) }),
    /* @__PURE__ */ A("div", { className: "mt-4 text-center small text-muted", children: [
      n.signinText,
      " ",
      /* @__PURE__ */ i(Ge, { link: n.signin })
    ] }),
    /* @__PURE__ */ A("p", { className: "mt-2 text-center text-muted small px-2", children: [
      n.termsAndPrivacy,
      " ",
      /* @__PURE__ */ i(Ge, { link: n.terms }),
      " and ",
      /* @__PURE__ */ i(Ge, { link: n.privacy }),
      "."
    ] })
  ] });
}
class Rs {
  constructor(t = {}) {
    const {
      id: n,
      name: a,
      className: s,
      title: r,
      subTitle: d,
      action: o,
      stats: c,
      signup: l,
      heading: f,
      ...u
    } = t || {};
    this.id = n ?? M("hero-signup"), this.name = typeof a == "string" ? a : "", this.className = typeof s == "string" && s.trim().length > 0 ? s : "hero py-2 py-lg-2 position-relative overflow-hidden", this.title = typeof r == "string" ? r : "", this.subTitle = typeof d == "string" ? d : "", this.action = o instanceof ge ? o : o ? new ge(o) : null;
    const p = Array.isArray(c) ? c : [];
    this.stats = p.map(
      (w) => w instanceof je ? w : new je(w || {})
    ), this.signup = l || null, this.heading = f instanceof je ? f : f ? new je(f) : null, Object.assign(this, u);
  }
}
function Ls(e) {
  if (!e || typeof e != "string") return e;
  const t = [];
  let n = 0, a = 0;
  for (; n < e.length; ) {
    const s = e.indexOf("[[", n);
    if (s === -1) {
      t.push(e.slice(n));
      break;
    }
    s > n && t.push(e.slice(n, s));
    const r = e.indexOf("]]", s + 2);
    if (r === -1) {
      t.push(e.slice(s));
      break;
    }
    const d = e.slice(s + 2, r);
    t.push(
      /* @__PURE__ */ i("span", { className: "text-primary", children: d }, `hero-h-${a}`)
    ), a += 1, n = r + 2;
  }
  return t;
}
function Xs({ hero: e, output: t }) {
  if (!e || !(e instanceof Rs))
    throw new Error(
      "AlloyHeroSignup requires `hero` (HeroSignupObject instance)."
    );
  const n = Array.isArray(e.stats) && e.stats.length > 0;
  return /* @__PURE__ */ i("section", { id: e.id, className: e.className, children: /* @__PURE__ */ i("div", { className: "container position-relative", children: /* @__PURE__ */ A("div", { className: "row align-items-center g-5", children: [
    /* @__PURE__ */ A("div", { className: "col-lg-7", children: [
      e.name && /* @__PURE__ */ A("span", { className: "kicker mb-2", children: [
        /* @__PURE__ */ i("i", { className: "fa-solid fa-bolt" }),
        " ",
        e.name
      ] }),
      e.title && /* @__PURE__ */ i("h1", { className: "display-5 fw-bold mt-2", children: Ls(e.title) }),
      e.subTitle && /* @__PURE__ */ i("p", { className: "lead text-secondary mt-3", children: e.subTitle }),
      e.action && /* @__PURE__ */ i("div", { className: "d-flex gap-3 mt-4", children: /* @__PURE__ */ i(_e, { linkBar: e.action }) }),
      n && /* @__PURE__ */ i("div", { className: "d-flex gap-4 mt-4", children: e.stats.map((a) => {
        var s, r, d, o;
        return /* @__PURE__ */ A("div", { className: "stat", children: [
          /* @__PURE__ */ i("div", { className: "fw-bold h4 mb-0", children: (r = (s = a.fields) == null ? void 0 : s[0]) == null ? void 0 : r.name }),
          /* @__PURE__ */ i("div", { className: "text-secondary small", children: (o = (d = a.fields) == null ? void 0 : d[1]) == null ? void 0 : o.name })
        ] }, a.id);
      }) })
    ] }),
    /* @__PURE__ */ i("div", { className: "col-lg-5", children: e.signup && /* @__PURE__ */ i(Ts, { signup: e.signup, output: t }) })
  ] }) }) });
}
class Is {
  constructor(t = {}) {
    const {
      id: n,
      name: a,
      className: s = "container-fluid",
      search: r,
      add: d,
      type: o = "table",
      document: c,
      documentClass: l = "col-12",
      // wrapper for the whole document area
      form: f,
      pagination: u,
      ...p
    } = t || {};
    if (this.id = n ?? M("crud-form"), this.name = a ?? "", this.className = s, this.search = r instanceof Pe ? r : r ? new Pe({ search: r }) : null, this.add = d instanceof se ? d : d ? new se(d) : null, this.type = o === "card" ? "card" : "table", this.type === "table") {
      const w = c && !Array.isArray(c) ? c : t.table || {};
      this.document = w instanceof Te ? w : new Te(w || {});
    } else {
      const w = Array.isArray(c) ? c : Array.isArray(t.cards) ? t.cards : [];
      this.document = w.map(
        (E) => E instanceof Ue ? E : new Ue(E || {})
      );
    }
    this.documentClass = l || "col-12", this.form = f instanceof Be ? f : new Be(f || { tabs: [] }), this.pagination = u instanceof ke ? u : u ? new ke(u) : null, Object.assign(this, p);
  }
}
function gt(e, t = "create", n = null) {
  const a = e.form instanceof Be ? e.form : new Be(e.form || { tabs: [] }), s = {
    id: a.id,
    name: a.name,
    status: a.status,
    currentIndex: a.currentIndex,
    navButtons: a.navButtons,
    tabs: a.tabs
  }, r = JSON.parse(JSON.stringify(s || {}));
  return (Array.isArray(r.tabs) ? r.tabs : []).forEach((o) => {
    Array.isArray(o.inputs) && o.inputs.forEach((c) => {
      const l = c == null ? void 0 : c.name;
      l && (n && Object.prototype.hasOwnProperty.call(n, l) && (c.value = n[l]), t === "delete" && (c.readOnly = !0, c.disabled = !0));
    });
  }), typeof r.currentIndex != "number" && (r.currentIndex = 0), new Be(r);
}
function Bs(e = {}) {
  const t = {};
  return Object.values(e || {}).forEach((n) => {
    !n || typeof n != "object" || Object.entries(n).forEach(([a, s]) => {
      t[a] = s;
    });
  }), t;
}
function Zs({ crudForm: e, output: t }) {
  if (!e || !(e instanceof Is))
    throw new Error(
      "AlloyCrudForm requires `crudForm` (CrudFormObject instance)."
    );
  const n = (v) => {
    typeof t == "function" && t(v);
  }, [a, s] = B("table"), [r, d] = B("create"), [o, c] = B(null), [l, f] = B(
    () => gt(e, r, o)
  );
  be(() => {
    f(gt(e, r, o));
  }, [e, r, o]);
  const u = a === "table", p = e.type === "table", w = e.type === "card", E = (v) => {
    if (!v) return;
    const O = v instanceof j && typeof v.toJSON == "function" ? v.toJSON() : v, k = (O == null ? void 0 : O.action) || "search", I = (O == null ? void 0 : O.data) || {};
    if (k === "search" || k === "select") {
      const L = j.ok({
        id: e.id,
        type: "crud-form",
        action: k === "select" ? "search-select" : "search",
        data: I
      });
      n(L);
    }
  }, g = (v) => {
    if (!v) return;
    const O = v instanceof j && typeof v.toJSON == "function" ? v.toJSON() : v;
    if (O.type !== "pagination" || O.action !== "page")
      return;
    const k = O.data || {}, I = j.ok({
      id: e.id,
      type: "crud-form",
      action: "page",
      data: k
    });
    n(I);
  };
  function x(v, O) {
    d(v), c(O || null), f(gt(e, v, O || null)), s("form");
  }
  function N() {
    s("table"), d("create"), c(null);
  }
  const y = (v) => {
    var k, I;
    if (!v) return;
    if (v.type === "column" && v.action === "Sort") {
      const L = ((k = v.data) == null ? void 0 : k.name) ?? "", q = ((I = v.data) == null ? void 0 : I.dir) ?? "", _ = L && typeof L == "string" ? { [L]: q } : {}, V = j.ok({
        id: e.id,
        type: "crud-form",
        action: "Sort",
        data: _
      });
      n(V);
      return;
    }
    if (v.type === "table") {
      const L = v.data || {}, q = v.action || "", _ = (q || "").toLowerCase();
      if (_.includes("edit")) {
        x("edit", L);
        return;
      }
      if (_.includes("delete")) {
        x("delete", L);
        return;
      }
      if (q) {
        const V = j.ok({
          id: e.id,
          type: "crud-form",
          action: q,
          data: {
            ...L
          }
        });
        n(V);
      }
      return;
    }
    if (v.type === "row" && v.action === "navigate") {
      const { to: L, ...q } = v.data || {}, _ = j.ok({
        id: e.id,
        type: "crud-form",
        action: "navigate",
        data: {
          to: L,
          ...q
        }
      });
      n(_);
      return;
    }
    const O = j.ok({
      id: e.id,
      type: "crud-form",
      action: v.action || "table",
      data: { ...v.data || {} }
    });
    n(O);
  }, h = (v) => {
    if (!v || v.type !== "card-action")
      return;
    const O = v.data || {}, k = v.action || "", I = (k || "").toLowerCase();
    if (I.includes("edit")) {
      x("edit", O);
      return;
    }
    if (I.includes("delete")) {
      x("delete", O);
      return;
    }
    if (k) {
      const L = j.ok({
        id: e.id,
        type: "crud-form",
        action: k,
        data: {
          ...O
        }
      });
      n(L);
    }
  }, b = () => {
    x("create", null);
  }, m = (v) => {
    if (!v) return;
    const O = v instanceof j && typeof v.toJSON == "function" ? v.toJSON() : v;
    if (O.type !== "tab-form") return;
    const k = O.action, L = (O.data || {}).values || {}, q = Bs(L);
    if (k !== "submit")
      return;
    let _;
    r === "edit" ? _ = "Edit" : r === "delete" ? _ = "Delete" : _ = "Create";
    const V = j.ok({
      id: e.id,
      type: "crud-form",
      action: _,
      data: {
        ...q
      }
    });
    n(V), N();
  }, C = () => p && e.document ? /* @__PURE__ */ A(Se, { children: [
    /* @__PURE__ */ i("div", { className: "row mt-2", children: /* @__PURE__ */ i("div", { className: e.documentClass, children: /* @__PURE__ */ i(
      It,
      {
        tableAction: e.document,
        output: y
      }
    ) }) }),
    e.pagination && /* @__PURE__ */ i("div", { className: "row mt-2", children: /* @__PURE__ */ i("div", { className: e.documentClass, children: /* @__PURE__ */ i(
      nt,
      {
        pagination: e.pagination,
        output: g
      }
    ) }) })
  ] }) : w && Array.isArray(e.document) ? /* @__PURE__ */ A(Se, { children: [
    /* @__PURE__ */ i("div", { className: "row mt-2", children: /* @__PURE__ */ i("div", { className: e.documentClass, children: /* @__PURE__ */ i("div", { className: "row", children: e.document.map((v) => /* @__PURE__ */ i(
      "div",
      {
        className: "col-sm-6 col-md-4 col-lg-3 mb-3",
        children: /* @__PURE__ */ i(
          En,
          {
            cardAction: v,
            output: h
          }
        )
      },
      v.id
    )) }) }) }),
    e.pagination && /* @__PURE__ */ i("div", { className: "row mt-2", children: /* @__PURE__ */ i("div", { className: e.documentClass, children: /* @__PURE__ */ i(
      nt,
      {
        pagination: e.pagination,
        output: g
      }
    ) }) })
  ] }) : /* @__PURE__ */ i("div", { className: "row mt-2", children: /* @__PURE__ */ i("div", { className: e.documentClass, children: /* @__PURE__ */ i("div", { className: "alert alert-warning mt-3", children: "No document configured for this CrudForm." }) }) });
  return /* @__PURE__ */ i("div", { className: e.className, children: u ? /* @__PURE__ */ A(Se, { children: [
    /* @__PURE__ */ A("div", { className: "row input-group mt-2", children: [
      /* @__PURE__ */ i("div", { className: "col-sm-8", children: e.search && /* @__PURE__ */ i(
        kt,
        {
          search: e.search,
          output: E
        }
      ) }),
      /* @__PURE__ */ i("div", { className: "col-sm-4 d-flex align-items-center justify-content-end", children: e.add && /* @__PURE__ */ i(
        Ce,
        {
          buttonIcon: e.add,
          output: b
        }
      ) })
    ] }),
    C()
  ] }) : /* @__PURE__ */ A(Se, { children: [
    /* @__PURE__ */ A("div", { className: "d-flex align-items-center justify-content-between mt-2 mb-3", children: [
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ A("h5", { className: "mb-1", children: [
          r === "edit" ? "Edit" : r === "delete" ? "Delete" : "Create",
          e.name ? ` — ${e.name}` : ""
        ] }),
        /* @__PURE__ */ A("div", { className: "text-muted small", children: [
          "Use the steps below to",
          " ",
          r === "edit" ? "update" : r === "delete" ? "review and confirm deletion of" : "create",
          " the record."
        ] })
      ] }),
      /* @__PURE__ */ i(
        Ce,
        {
          buttonIcon: new se({
            name: "Back to list",
            icon: { iconClass: "fa-solid fa-arrow-left" },
            className: "btn btn-outline-secondary btn-sm"
          }),
          output: N
        }
      )
    ] }),
    /* @__PURE__ */ i(Fa, { tabForm: l, output: m })
  ] }) });
}
export {
  st as AlloyButton,
  rt as AlloyButtonBar,
  Ce as AlloyButtonIcon,
  un as AlloyButtonSubmit,
  $a as AlloyCard,
  En as AlloyCardAction,
  Ks as AlloyCardCarousel,
  Ws as AlloyCardVideo,
  zs as AlloyCheckout,
  Vs as AlloyContact,
  Cs as AlloyCrud,
  Zs as AlloyCrudForm,
  Hs as AlloyDonate,
  Js as AlloyEmail,
  Qs as AlloyFooter,
  ct as AlloyForm,
  Gs as AlloyGallery,
  Xs as AlloyHeroSignup,
  ie as AlloyIcon,
  Le as AlloyInput,
  Ge as AlloyLink,
  _e as AlloyLinkBar,
  Bn as AlloyLinkIcon,
  dn as AlloyLinkLogo,
  An as AlloyModal,
  Us as AlloyModalToast,
  Ds as AlloyNavBar,
  nt as AlloyPagination,
  Tn as AlloyPay,
  Ys as AlloyProfile,
  kt as AlloySearch,
  Ts as AlloySignup,
  Fa as AlloyTabForm,
  qs as AlloyTable,
  It as AlloyTableAction,
  Fs as AlloyTableLink,
  Ee as ButtonBarObject,
  se as ButtonIconObject,
  he as ButtonObject,
  $e as ButtonSubmitObject,
  Ue as CardActionObject,
  ws as CardCarouselObject,
  je as CardObject,
  Ns as CardVideoObject,
  ks as CheckoutObject,
  Ss as ContactObject,
  Is as CrudFormObject,
  Et as CrudObject,
  js as DonateObject,
  Es as EmailObject,
  cn as FooterObject,
  we as FormObject,
  Ps as GalleryObject,
  Rs as HeroSignupObject,
  K as IconObject,
  ue as InputObject,
  ge as LinkBarObject,
  Me as LinkIconObject,
  Oe as LinkLogoObject,
  xe as LinkObject,
  Re as ModalObject,
  Ka as ModalToastObject,
  qn as NavBarObject,
  ke as PaginationObject,
  We as PayObject,
  Os as ProfileObject,
  Pe as SearchObject,
  ln as SignupObject,
  Be as TabFormObject,
  Da as TabObject,
  Te as TableActionObject,
  Ra as TableLinkObject,
  Un as TableObject
};
//# sourceMappingURL=alloy-react.es.js.map
