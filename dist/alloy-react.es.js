import { jsx as i, jsxs as A, Fragment as Be } from "react/jsx-runtime";
import * as I from "react";
import ie, { useRef as se, useState as L, useMemo as fe, forwardRef as bt, useImperativeHandle as Nt, useEffect as ge, useCallback as En } from "react";
import "react-dom";
function B(e = "id") {
  const t = Date.now(), n = Math.random().toString(36).slice(2, 7);
  return `${e}-${t}-${n}`;
}
class re {
  constructor(t = {}) {
    const { id: n, name: a, className: s } = t;
    this.id = n ?? B("tag"), this.name = a ?? "", this.className = s ?? "";
  }
}
class k {
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
    } = t || {}, c = typeof n < "u" ? n : r && typeof r.id < "u" ? r.id : "";
    this.id = c, this.type = a, this.action = s, this.error = !!d, this.data = { ...r };
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
    return new k({
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
    return s && d.message == null && (d.message = String(s)), new k({
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
class ze {
  constructor(t = {}) {
    this.id = t.id ?? B("logo"), this.imageUrl = t.imageUrl ?? "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png", this.alt = t.alt ?? "Alloymobile", this.width = t.width ?? "100%", this.height = t.height ?? "auto", this.className = t.className ?? "img-fluid d-block w-100 h-auto object-fit-contain";
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
    this.id = t.id ?? B("block"), this.name = typeof t.name == "string" ? t.name : "", this.className = t.className ?? "", this.colClass = t.colClass ?? "col-12", this.ariaLabel = typeof t.ariaLabel == "string" ? t.ariaLabel : this.name || "";
    const n = t.icon || (t.iconClass ? { iconClass: t.iconClass } : null);
    this.icon = n ? n instanceof F ? n : new F(n) : null;
    const a = t.logo || null;
    this.logo = a ? a instanceof ze ? a : new ze(a) : null;
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
class F {
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
function oe({ icon: e }) {
  if (!e) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ i("i", { id: e.id, className: e.iconClass, "aria-hidden": "true" });
}
function Cn(e = "", t = "") {
  const [n, a] = L(!1), [s, r] = L(!1), [d, c] = L(!1);
  return {
    className: fe(() => [e, (n || s || d) && t].filter(Boolean).join(" "), [e, t, n, s, d]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), r(!1);
      },
      onMouseDown: () => r(!0),
      onMouseUp: () => r(!1),
      onFocus: () => c(!0),
      onBlur: () => c(!1)
    }
  };
}
class je {
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
function An({ link: e }) {
  if (!e || !(e instanceof je))
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  const t = se(e.id), { className: n, events: a } = Cn(e.className, e.active), s = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel;
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
function Sn(e = "", t = "") {
  const [n, a] = L(!1), [s, r] = L(!1), [d, c] = L(!1);
  return {
    className: fe(() => [e, (n || s || d) && t].filter(Boolean).join(" "), [e, t, n, s, d]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), r(!1);
      },
      onMouseDown: () => r(!0),
      onMouseUp: () => r(!1),
      onFocus: () => c(!0),
      onBlur: () => c(!1)
    }
  };
}
class Pe {
  /**
   * @param {LinkIconConfig} linkIcon
   */
  constructor(t = {}) {
    if (!t.href)
      throw new Error("LinkIconObject requires `href`.");
    if (!t.icon)
      throw new Error("LinkIconObject requires `icon`.");
    const n = t.icon instanceof F ? t.icon : new F(t.icon);
    this.id = t.id ?? B("link-icon"), this.href = t.href, this.icon = n, this.name = t.name, this.className = t.className ?? "nav-link", this.active = t.active ?? "", this.target = t.target, this.rel = t.rel, this.onClick = t.onClick, this.title = t.title ?? t.name;
  }
}
function On({ linkIcon: e }) {
  if (!e || !(e instanceof Pe))
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  const t = se(e.id), { className: n, events: a } = Sn(
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
        /* @__PURE__ */ i(oe, { icon: e.icon }),
        r && /* @__PURE__ */ i("span", { className: "px-1", children: e.name })
      ] })
    }
  );
}
function kn(e = "", t = "") {
  const [n, a] = L(!1), [s, r] = L(!1), [d, c] = L(!1);
  return {
    className: fe(() => [e, (n || s || d) && t].filter(Boolean).join(" "), [e, t, n, s, d]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), r(!1);
      },
      onMouseDown: () => r(!0),
      onMouseUp: () => r(!1),
      onFocus: () => c(!0),
      onBlur: () => c(!1)
    }
  };
}
class Ae {
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
function tn({ linkLogo: e }) {
  if (!e || !(e instanceof Ae))
    throw new Error(
      "AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance)."
    );
  const t = se(e.id), { className: n, events: a } = kn(
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
function jn(e = "", t = "") {
  const [n, a] = L(!1), [s, r] = L(!1), [d, c] = L(!1);
  return {
    className: fe(() => [e, (n || s || d) && t].filter(Boolean).join(" "), [e, t, n, s, d]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), r(!1);
      },
      onMouseDown: () => r(!0),
      onMouseUp: () => r(!1),
      onFocus: () => c(!0),
      onBlur: () => c(!1)
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
    this.id = t.id ?? B("btn"), this.name = t.name, this.className = t.className ?? "btn btn-primary", this.active = t.active ?? "", this.disabled = !!t.disabled, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const Qe = bt(function({ button: t, output: n }, a) {
  if (!t || !(t instanceof he))
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  const s = se(null), r = se(t.id), d = t.disabled, { className: c, events: o } = jn(
    t.className,
    t.active
  );
  Nt(
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
  const l = (u, y, x, E) => (v) => {
    if (y == null || y(v), E && typeof n == "function") {
      const f = k.ok({
        id: t.id,
        type: "button",
        action: x,
        data: {
          // keep payload minimal; we don't duplicate id here
          name: t.name
        }
      });
      n(f);
    }
    u == null || u(v, t);
  }, m = {
    // EMIT
    onClick: l(t.onClick, void 0, "click", !0),
    onMouseDown: l(void 0, o.onMouseDown, "mousedown", !0),
    // NO EMIT – just state + model handler
    onKeyDown: l(
      t.onKeyDown,
      o.onFocus,
      "keydown",
      !1
    ),
    onKeyUp: l(t.onKeyUp, void 0, "keyup", !1),
    onFocus: l(t.onFocus, o.onFocus, "focus", !1),
    onBlur: l(t.onBlur, o.onBlur, "blur", !1),
    onMouseEnter: l(
      t.onMouseEnter,
      o.onMouseEnter,
      "mouseenter",
      !1
    ),
    onMouseLeave: l(
      t.onMouseLeave,
      o.onMouseLeave,
      "mouseleave",
      !1
    ),
    onMouseUp: l(void 0, o.onMouseUp, "mouseup", !1)
  };
  return /* @__PURE__ */ i(
    "button",
    {
      id: r.current,
      ref: s,
      type: "button",
      className: c,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-disabled": d || void 0,
      disabled: d,
      tabIndex: t.tabIndex,
      ...m,
      children: /* @__PURE__ */ i("span", { className: "px-2 align-middle", children: t.name })
    }
  );
});
function Pn(e = "", t = "") {
  const [n, a] = L(!1), [s, r] = L(!1), [d, c] = L(!1);
  return {
    className: fe(() => [e, (n || s || d) && t].filter(Boolean).join(" "), [e, t, n, s, d]),
    events: {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => {
        a(!1), r(!1);
      },
      onMouseDown: () => r(!0),
      onMouseUp: () => r(!1),
      onFocus: () => c(!0),
      onBlur: () => c(!1)
    }
  };
}
class le {
  /**
   * @param {ButtonIconConfig} btn
   */
  constructor(t = {}) {
    if (!t.icon)
      throw new Error("ButtonIconObject requires `icon`.");
    this.id = t.id ?? B("btn-icon"), this.name = t.name, this.className = t.className ?? "btn btn-primary", this.active = t.active ?? "", this.disabled = !!t.disabled;
    const n = this.name || "icon button";
    this.title = t.title ?? n, this.ariaLabel = t.ariaLabel ?? n, this.tabIndex = t.tabIndex, this.icon = t.icon instanceof F ? t.icon : new F(t.icon), this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const Oe = bt(function({ buttonIcon: t, output: n }, a) {
  if (!t || !(t instanceof le))
    throw new Error(
      "AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance)."
    );
  const s = se(null), r = se(t.id), d = t.disabled, { className: c, events: o } = Pn(
    t.className,
    t.active
  );
  Nt(
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
  const l = (u, y, x, E) => (v) => {
    if (y == null || y(v), E && typeof n == "function") {
      const f = k.ok({
        id: t.id,
        type: "button-icon",
        action: x,
        data: {
          name: t.name
        }
      });
      n(f);
    }
    u == null || u(v, t);
  }, m = {
    // EMIT
    onClick: l(t.onClick, void 0, "click", !0),
    onKeyDown: l(
      t.onKeyDown,
      o.onFocus,
      "keydown",
      !0
    ),
    // NO EMIT – just state + model handler
    onKeyUp: l(t.onKeyUp, void 0, "keyup", !1),
    onFocus: l(t.onFocus, o.onFocus, "focus", !1),
    onBlur: l(t.onBlur, o.onBlur, "blur", !1),
    onMouseEnter: l(
      t.onMouseEnter,
      o.onMouseEnter,
      "mouseenter",
      !1
    ),
    onMouseLeave: l(
      t.onMouseLeave,
      o.onMouseLeave,
      "mouseleave",
      !1
    ),
    onMouseDown: l(void 0, o.onMouseDown, "mousedown", !1),
    onMouseUp: l(void 0, o.onMouseUp, "mouseup", !1)
  };
  return /* @__PURE__ */ A(
    "button",
    {
      id: r.current,
      ref: s,
      type: "button",
      className: c,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-disabled": d || void 0,
      disabled: d,
      tabIndex: t.tabIndex,
      ...m,
      children: [
        /* @__PURE__ */ i("span", { className: "align-middle", children: /* @__PURE__ */ i(oe, { icon: t.icon }) }),
        t.name && /* @__PURE__ */ i("span", { className: "px-2 align-middle", children: t.name })
      ]
    }
  );
});
class Te {
  /**
   * @param {ButtonSubmitConfig} buttonSubmit
   */
  constructor(t = {}) {
    if (!t.name)
      throw new Error("ButtonSubmitObject requires `name`.");
    if (!t.icon)
      throw new Error("ButtonSubmitObject requires `icon`.");
    const n = t.icon instanceof F ? t.icon : new F(t.icon);
    this.id = t.id ?? B("btn-submit"), this.name = t.name, this.icon = n, this.className = t.className ?? "", this.disabled = !!t.disabled, this.loading = !!t.loading, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onMouseDown = t.onMouseDown, this.onKeyDown = t.onKeyDown;
  }
}
const nn = bt(function({ buttonSubmit: t, output: n }, a) {
  if (!t || !(t instanceof Te))
    throw new Error(
      "AlloyButtonSubmit requires `buttonSubmit` (ButtonSubmitObject instance)."
    );
  const s = se(null), r = se(t.id), [d, c] = L(!!t.loading), o = se(!1);
  ge(() => {
    const f = !!t.loading;
    c(f), f || (o.current = !1);
  }, [t.loading]);
  const l = t.disabled || d;
  Nt(
    a,
    () => ({
      el: s.current,
      model: t,
      focus: () => {
        var f;
        return (f = s.current) == null ? void 0 : f.focus();
      },
      click: () => {
        var f;
        return (f = s.current) == null ? void 0 : f.click();
      }
    }),
    [t]
  );
  const m = () => o.current || l ? !1 : (o.current = !0, t.loading = !0, t.disabled = !0, c(!0), !0), u = (f, g, h) => {
    if (typeof n == "function") {
      const w = new k({
        id: t.id,
        type: "button-submit",
        action: h,
        error: !1,
        data: {
          name: t.name
        }
      });
      n(w);
    }
    g == null || g(f, t);
  }, y = (f) => {
    m() && u(f, t.onClick, "click");
  }, x = (f) => {
    m() && u(f, t.onMouseDown, "mousedown");
  }, E = (f) => {
    const g = f.key;
    (g === "Enter" || g === " ") && m() && u(f, t.onKeyDown, "keydown");
  }, v = d;
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
      onClick: y,
      onMouseDown: x,
      onKeyDown: E,
      children: [
        v && /* @__PURE__ */ i("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ i(oe, { icon: t.icon }) }),
        /* @__PURE__ */ i("span", { className: v ? "px-2 align-middle" : "align-middle", children: t.name }),
        d ? /* @__PURE__ */ i("span", { className: "ms-2 visually-hidden", "aria-live": "polite", children: "Loading…" }) : null
      ]
    }
  );
});
class ne {
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
      layout: c = "text",
      icon: o,
      placeholder: l = "",
      required: m = !1,
      minLength: u,
      maxLength: y,
      min: x,
      max: E,
      pattern: v,
      matchWith: f,
      passwordStrength: g,
      className: h,
      options: w = [],
      validators: b = [],
      ...p
    } = t;
    if (!a)
      throw new Error("InputObject requires `name`.");
    if ((c === "icon" || c === "floating") && !o)
      throw new Error(
        "InputObject with layout='icon' or 'floating' requires `icon`."
      );
    let N;
    typeof d < "u" ? N = d : s === "checkbox" ? N = [] : N = "";
    const S = o instanceof F ? o : o ? new F(o) : void 0;
    this.id = n ?? B("input"), this.name = a, this.type = s, this.label = r, this.value = N, this.layout = c, this.icon = S, this.placeholder = l, this.required = !!m, this.minLength = u, this.maxLength = y, this.min = x, this.max = E, this.pattern = v, this.matchWith = f, this.passwordStrength = g, typeof h == "string" && h.trim() !== "" ? this.className = h.trim() : s === "select" ? this.className = "form-select" : s === "radio" || s === "checkbox" ? this.className = "form-check-input" : this.className = "form-control", this.options = w, this.validators = b, Object.assign(this, p);
  }
}
function Ee({ input: e, output: t }) {
  const [n, a] = L(e.value), [s, r] = L(!1);
  ge(() => {
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
  const d = (p) => {
    const N = [], S = typeof p == "string" ? p.trim() : p;
    if (e.required) {
      const R = Array.isArray(S) && S.length === 0, T = !Array.isArray(S) && (S === "" || S === !1 || S == null);
      (R || T) && N.push("This field is required.");
    }
    return typeof S == "string" && e.minLength != null && S.length < e.minLength && N.push(`Minimum length is ${e.minLength}`), typeof S == "string" && e.maxLength != null && S.length > e.maxLength && N.push(`Maximum length is ${e.maxLength}`), typeof S == "string" && e.pattern && e.pattern !== "" && (new RegExp(e.pattern).test(S) || N.push("Invalid format.")), e.passwordStrength && typeof S == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(
      S
    ) || N.push("Password is too weak.")), N;
  }, c = d(n), o = s && c.length > 0, l = o && c.length > 0 && /* @__PURE__ */ i("div", { className: "mt-2", "aria-live": "polite", children: c.map((p, N) => /* @__PURE__ */ i(
    "div",
    {
      className: "alert alert-danger py-2 mb-2",
      role: "alert",
      children: p
    },
    N
  )) }), m = (p, N = "change") => {
    const S = d(p), R = S.length > 0;
    if (typeof t == "function") {
      const T = new k({
        id: e.id,
        type: "input",
        action: N,
        error: R,
        data: {
          name: e.name,
          value: p,
          errors: S
        }
      });
      t(T);
    }
  }, u = (p) => {
    const N = p.target.value;
    if (e.type === "checkbox") {
      const S = Array.isArray(n) ? [...n] : [], R = S.indexOf(N);
      R > -1 ? S.splice(R, 1) : S.push(N), a(S), m(S, "change");
    } else e.type, a(N), m(N, "change");
  }, y = () => {
    r(!0), m(n, "blur");
  }, x = {
    id: e.id,
    name: e.name,
    placeholder: e.placeholder,
    onBlur: y,
    "aria-invalid": o || void 0
  }, E = (p) => p + (o ? " is-invalid" : ""), v = () => /* @__PURE__ */ i(
    "textarea",
    {
      ...x,
      value: n,
      onChange: u,
      className: E(e.className)
    }
  ), f = () => /* @__PURE__ */ i(
    "select",
    {
      ...x,
      value: n,
      onChange: u,
      className: E(e.className),
      children: e.options.map((p) => /* @__PURE__ */ i("option", { value: p.value, children: p.label }, p.value))
    }
  ), g = () => /* @__PURE__ */ A("div", { children: [
    e.label && /* @__PURE__ */ i("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((p, N) => /* @__PURE__ */ A("div", { className: "form-check", children: [
      /* @__PURE__ */ i(
        "input",
        {
          type: "radio",
          id: `${e.id}_${N}`,
          className: E(e.className),
          name: e.name,
          value: p.value,
          checked: n === p.value,
          onChange: u,
          onBlur: y,
          "aria-invalid": o || void 0
        }
      ),
      /* @__PURE__ */ i(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${N}`,
          children: p.label
        }
      )
    ] }, N)),
    l
  ] }), h = () => /* @__PURE__ */ A("div", { children: [
    e.label && /* @__PURE__ */ i("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((p, N) => /* @__PURE__ */ A("div", { className: "form-check", children: [
      /* @__PURE__ */ i(
        "input",
        {
          type: "checkbox",
          id: `${e.id}_${N}`,
          className: E(e.className),
          name: e.name,
          value: p.value,
          checked: Array.isArray(n) && n.includes(p.value),
          onChange: u,
          onBlur: y,
          "aria-invalid": o || void 0
        }
      ),
      /* @__PURE__ */ i(
        "label",
        {
          className: "form-check-label",
          htmlFor: `${e.id}_${N}`,
          children: p.label
        }
      )
    ] }, N)),
    l
  ] }), w = () => /* @__PURE__ */ i(
    "input",
    {
      ...x,
      type: e.type,
      value: n,
      onChange: u,
      className: E(e.className)
    }
  ), b = () => {
    switch (e.type) {
      case "textarea":
        return v();
      case "select":
        return f();
      case "radio":
        return g();
      case "checkbox":
        return h();
      default:
        return w();
    }
  };
  return e.layout === "floating" ? /* @__PURE__ */ A("div", { className: "mb-3", children: [
    /* @__PURE__ */ A("div", { className: "form-floating", children: [
      b(),
      /* @__PURE__ */ A("label", { htmlFor: e.id, children: [
        e.icon && /* @__PURE__ */ i(oe, { icon: e.icon }),
        e.icon && " ",
        e.label
      ] })
    ] }),
    !(e.type === "radio" || e.type === "checkbox") && l
  ] }) : e.layout === "icon" ? /* @__PURE__ */ A("div", { className: "mb-3", children: [
    e.label && /* @__PURE__ */ i("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    /* @__PURE__ */ A("div", { className: "input-group", children: [
      /* @__PURE__ */ i("span", { className: "input-group-text", children: /* @__PURE__ */ i(oe, { icon: e.icon }) }),
      ["radio", "checkbox"].includes(e.type) ? b() : /* @__PURE__ */ i(
        "input",
        {
          ...x,
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
class Tn {
  /**
   * @param {Object} response
   */
  constructor(t = {}) {
    const n = t || {};
    this.id = n.id ?? B("search"), this.className = n.className ?? "row mb-3", n.search instanceof ne ? this.search = n.search : n.search ? this.search = new ne(n.search) : this.search = new ne({
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
function jr({ search: e, output: t }) {
  if (!e || !(e instanceof Tn))
    throw new Error("AlloySearch requires `search` (SearchObject instance).");
  const n = (l) => {
    typeof t == "function" && t(l);
  }, [a, s] = L(() => {
    var l;
    return typeof ((l = e.search) == null ? void 0 : l.value) < "u" ? String(e.search.value) : "";
  });
  ge(() => {
    var m;
    const l = typeof ((m = e.search) == null ? void 0 : m.value) < "u" ? String(e.search.value) : "";
    s(l);
  }, [e]), ge(() => {
    var y;
    const l = ((y = e.search) == null ? void 0 : y.name) ?? "search", m = (a || "").trim();
    if (!m || m.length < e.minChars)
      return;
    const u = setTimeout(() => {
      const x = { [l]: m }, E = k.ok({
        id: e.id,
        type: "search-bar",
        action: "search",
        data: x
      });
      n(E);
    }, e.debounceMs);
    return () => clearTimeout(u);
  }, [a, e, n]);
  const r = (l) => {
    var y;
    if (!l) return;
    const m = l instanceof k && typeof l.toJSON == "function" ? l.toJSON() : l, u = (y = m == null ? void 0 : m.data) == null ? void 0 : y.value;
    s(typeof u == "string" ? u : String(u ?? ""));
  }, d = fe(() => {
    const { resultConfig: l } = e, { idKey: m, labelKey: u, descriptionKey: y, iconKey: x } = l;
    return (e.results || []).map((E, v) => {
      if (typeof E == "string" || typeof E == "number")
        return {
          raw: E,
          id: String(v),
          label: String(E),
          description: "",
          iconClass: ""
        };
      const f = E || {}, g = f[m] ?? f.id ?? f.key ?? String(v), h = f[u] ?? f.name ?? f.title ?? f.subject ?? JSON.stringify(f), w = y ? f[y] : "", b = x && f[x] ? f[x] : "";
      return {
        raw: E,
        id: String(g),
        label: String(h),
        description: w ? String(w) : "",
        iconClass: b ? String(b) : ""
      };
    });
  }, [e.results, e.resultConfig]), c = d.length > 0, o = (l) => {
    var y;
    const m = ((y = e.search) == null ? void 0 : y.name) ?? "search", u = k.ok({
      id: e.id,
      type: "search-bar",
      action: "select",
      data: {
        [m]: (a || "").trim(),
        result: l.raw
        // send raw object/string back to parent
      }
    });
    n(u);
  };
  return /* @__PURE__ */ i("div", { id: e.id, className: e.className, children: /* @__PURE__ */ A("div", { className: "col-12 col-md-8", children: [
    /* @__PURE__ */ i(Ee, { input: e.search, output: r }),
    c && /* @__PURE__ */ i("div", { className: "mt-2", children: /* @__PURE__ */ i("ul", { className: "list-group shadow-sm", children: d.map((l) => /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        className: "list-group-item list-group-item-action d-flex justify-content-between align-items-start",
        onClick: () => o(l),
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
class be {
  /**
   * @param {LinkBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? B("linkBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyLink", this.linkClass = t.linkClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof re ? this.title = t.title : t.title ? this.title = new re(t.title) : this.title = new re({});
    const n = Array.isArray(t.links) ? t.links : [];
    this.type === "AlloyLinkIcon" ? this.links = n.map(
      (a) => a instanceof Pe ? a : new Pe(a)
    ) : this.type === "AlloyLinkLogo" ? this.links = n.map(
      (a) => a instanceof Ae ? a : new Ae(a)
    ) : this.links = n.map(
      (a) => a instanceof je ? a : new je(a)
    );
  }
}
function Rn(e, t, n, a) {
  const s = n ? t : "";
  return e instanceof je ? new je({
    id: e.id,
    name: e.name,
    href: e.href,
    className: e.className,
    active: s,
    target: e.target,
    rel: e.rel,
    onClick: a,
    title: e.title
  }) : e instanceof Pe ? new Pe({
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
  }) : e instanceof Ae ? new Ae({
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
function Me({ linkBar: e }) {
  if (!e || !(e instanceof be))
    throw new Error("AlloyLinkBar requires `linkBar` (LinkBarObject instance).");
  const t = se(e.id), [n, a] = L("");
  ge(() => {
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
  function r(c) {
    const o = c.onClick;
    return (l) => {
      const m = c.id || `${c.href || ""}-${c.name || ""}`;
      a(m), o == null || o(l);
    };
  }
  function d() {
    return /* @__PURE__ */ i("ul", { id: t.current, className: e.className, children: e.links.map((c, o) => {
      const l = ((c == null ? void 0 : c.id) ?? "") === n, m = Rn(
        c,
        e.selected,
        l,
        r(c)
      );
      switch (e.type) {
        case "AlloyLink":
          if (!(m instanceof je))
            throw new Error(
              "AlloyLinkBar (type='AlloyLink') expects each link to be a LinkObject instance."
            );
          return /* @__PURE__ */ i(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ i(An, { link: m })
            },
            ((c == null ? void 0 : c.id) ?? o) + "-li"
          );
        case "AlloyLinkIcon":
          if (!(m instanceof Pe))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkIcon') expects each link to be a LinkIconObject instance."
            );
          return /* @__PURE__ */ i(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ i(On, { linkIcon: m })
            },
            ((c == null ? void 0 : c.id) ?? o) + "-li"
          );
        case "AlloyLinkLogo":
          if (!(m instanceof Ae))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkLogo') expects each link to be a LinkLogoObject instance."
            );
          return /* @__PURE__ */ i(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ i(tn, { linkLogo: m })
            },
            ((c == null ? void 0 : c.id) ?? o) + "-li"
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
class xe {
  /**
   * @param {ButtonBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? B("buttonBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyButton", this.buttonClass = t.buttonClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof re ? this.title = t.title : t.title ? this.title = new re(t.title) : this.title = new re({});
    const n = Array.isArray(t.buttons) ? t.buttons : [];
    this.type === "AlloyButtonIcon" ? this.buttons = n.map(
      (a) => a instanceof le ? a : new le(a)
    ) : this.buttons = n.map(
      (a) => a instanceof he ? a : new he(a)
    );
  }
}
function Tt(e, t, n, a, s) {
  const r = n ? t : "";
  function d(c) {
    var m, u;
    if (!c)
      return;
    if ((c.action || ((m = c == null ? void 0 : c.data) == null ? void 0 : m.event) || "") === "click") {
      const y = ((u = c == null ? void 0 : c.data) == null ? void 0 : u.id) ?? "";
      y && a(y);
    }
    s == null || s(c);
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
  }), onAnyEvent: d } : e instanceof le ? { model: new le({
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
function Xe({ buttonBar: e, output: t }) {
  if (!e || !(e instanceof xe))
    throw new Error(
      "AlloyButtonBar requires `buttonBar` (ButtonBarObject instance)."
    );
  const n = se(e.id), [a, s] = L("");
  ge(() => {
    s("");
  }, [e]);
  const r = () => e.title && e.title.name ? /* @__PURE__ */ i("div", { id: e.title.id, className: e.title.className, children: e.title.name }) : null;
  function d() {
    return /* @__PURE__ */ i("ul", { id: n.current, className: e.className, children: e.buttons.map((l, m) => {
      if (!(l instanceof he))
        throw new Error(
          "AlloyButtonBar (type='AlloyButton') expects ButtonObject items."
        );
      const u = ((l == null ? void 0 : l.id) ?? "") === a, { model: y, onAnyEvent: x } = Tt(
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
          children: /* @__PURE__ */ i(Qe, { button: y, output: x })
        },
        ((l == null ? void 0 : l.id) ?? m) + "-li"
      );
    }) });
  }
  function c() {
    return /* @__PURE__ */ i("ul", { id: n.current, className: e.className, children: e.buttons.map((l, m) => {
      if (!(l instanceof le))
        throw new Error(
          "AlloyButtonBar (type='AlloyButtonIcon') expects ButtonIconObject items."
        );
      const u = ((l == null ? void 0 : l.id) ?? "") === a, { model: y, onAnyEvent: x } = Tt(
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
          children: /* @__PURE__ */ i(Oe, { buttonIcon: y, output: x })
        },
        ((l == null ? void 0 : l.id) ?? m) + "-li"
      );
    }) });
  }
  function o() {
    switch (e.type) {
      case "AlloyButtonIcon":
        return c();
      case "AlloyButton":
      default:
        return d();
    }
  }
  return /* @__PURE__ */ A("nav", { "data-type": e.type, children: [
    /* @__PURE__ */ i(r, {}),
    o()
  ] });
}
class Ln {
  /**
   * @param {NavBarConfig} nav = {}
   */
  constructor(t = {}) {
    if (this.id = t.id ?? B("navbar"), this.className = t.className ?? "navbar navbar-expand-lg navbar-light bg-light", t.logo instanceof Ae)
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
      this.logo = new Ae(n);
    }
    if (t.linkBar instanceof be)
      this.linkBar = t.linkBar;
    else {
      const n = t.linkBar ?? {};
      this.linkBar = new be({
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
function Pr({ navBar: e }) {
  if (!e || !(e instanceof Ln))
    throw new Error("AlloyNavBar requires `navBar` (NavBarObject instance).");
  const t = se(e.id), n = `${t.current}-collapse`;
  return /* @__PURE__ */ i("nav", { id: t.current, className: e.className, children: /* @__PURE__ */ A("div", { className: "container-fluid", children: [
    /* @__PURE__ */ i(tn, { linkLogo: e.logo }),
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
        children: /* @__PURE__ */ i(Me, { linkBar: e.linkBar })
      }
    )
  ] }) });
}
function In(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
class Bn {
  /**
   * @param {TableConfig} table
   */
  constructor(t = {}) {
    this.id = t.id ?? B("table"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [];
    const n = { iconClass: "fa-solid fa-user" }, a = { iconClass: "fa-solid fa-arrow-down" }, s = t.icon instanceof F ? t.icon : new F(t.icon || n), r = t.sort instanceof F ? t.sort : new F(t.sort || a);
    this.icon = s, this.sort = r;
  }
}
function Mn(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function Tr({ table: e, output: t }) {
  if (!e || !(e instanceof Bn))
    throw new Error("AlloyTable requires `table` (TableObject instance).");
  const n = se(e.id), [a, s] = L({ col: "", dir: "asc" }), r = fe(
    () => Mn(e.rows),
    [e.rows]
  ), d = (o) => {
    if (!o) return;
    const l = a.col === o && a.dir === "asc" ? "desc" : "asc";
    s({ col: o, dir: l }), t == null || t({
      type: "column",
      name: o,
      dir: l
    });
  }, c = (o) => {
    t == null || t({
      type: "row",
      id: o
    });
  };
  return /* @__PURE__ */ A("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ i("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ i("thead", { children: /* @__PURE__ */ A("tr", { children: [
      /* @__PURE__ */ i("th", { scope: "col", children: "Type" }),
      r.map((o) => {
        const l = a.col === o, m = l && a.dir === "desc";
        return /* @__PURE__ */ i("th", { scope: "col", children: /* @__PURE__ */ A(
          "span",
          {
            onClick: () => d(o),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              In(o),
              l && /* @__PURE__ */ i(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: m ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: m ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ i(oe, { icon: e.sort })
                }
              )
            ]
          }
        ) }, o);
      })
    ] }) }),
    /* @__PURE__ */ i("tbody", { children: e.rows.length > 0 ? e.rows.map((o, l) => /* @__PURE__ */ A(
      "tr",
      {
        onClick: () => c(o == null ? void 0 : o.id),
        style: { cursor: "pointer" },
        children: [
          /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i(oe, { icon: e.icon }) }),
          r.map((m) => /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i("span", { children: o == null ? void 0 : o[m] }) }, `${(o == null ? void 0 : o.id) ?? l}-${m}`))
        ]
      },
      (o == null ? void 0 : o.id) ?? l
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
function dt() {
  return dt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, dt.apply(this, arguments);
}
var Rt;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(Rt || (Rt = {}));
function ae(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function $e(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function ut(e) {
  let {
    pathname: t = "/",
    search: n = "",
    hash: a = ""
  } = e;
  return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n), a && a !== "#" && (t += a.charAt(0) === "#" ? a : "#" + a), t;
}
function an(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
    let a = e.indexOf("?");
    a >= 0 && (t.search = e.substr(a), e = e.substr(0, a)), e && (t.pathname = e);
  }
  return t;
}
var Lt;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(Lt || (Lt = {}));
function It(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [n, a] = _n(e.path, e.caseSensitive, e.end), s = t.match(n);
  if (!s) return null;
  let r = s[0], d = r.replace(/(.)\/+$/, "$1"), c = s.slice(1);
  return {
    params: a.reduce((l, m, u) => {
      let {
        paramName: y,
        isOptional: x
      } = m;
      if (y === "*") {
        let v = c[u] || "";
        d = r.slice(0, r.length - v.length).replace(/(.)\/+$/, "$1");
      }
      const E = c[u];
      return x && !E ? l[y] = void 0 : l[y] = (E || "").replace(/%2F/g, "/"), l;
    }, {}),
    pathname: r,
    pathnameBase: d,
    pattern: e
  };
}
function _n(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !0), $e(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let a = [], s = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (d, c, o) => (a.push({
    paramName: c,
    isOptional: o != null
  }), o ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (a.push({
    paramName: "*"
  }), s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? s += "\\/*$" : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, t ? void 0 : "i"), a];
}
function Re(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length, a = e.charAt(n);
  return a && a !== "/" ? null : e.slice(n) || "/";
}
function Dn(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: a = "",
    hash: s = ""
  } = typeof e == "string" ? an(e) : e;
  return {
    pathname: n ? n.startsWith("/") ? n : $n(n, t) : t,
    search: qn(a),
    hash: Un(s)
  };
}
function $n(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? n.length > 1 && n.pop() : s !== "." && n.push(s);
  }), n.length > 1 ? n.join("/") : "/";
}
function tt(e, t, n, a) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(a) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Fn(e) {
  return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0);
}
function rn(e, t) {
  let n = Fn(e);
  return t ? n.map((a, s) => s === n.length - 1 ? a.pathname : a.pathnameBase) : n.map((a) => a.pathnameBase);
}
function sn(e, t, n, a) {
  a === void 0 && (a = !1);
  let s;
  typeof e == "string" ? s = an(e) : (s = dt({}, e), ae(!s.pathname || !s.pathname.includes("?"), tt("?", "pathname", "search", s)), ae(!s.pathname || !s.pathname.includes("#"), tt("#", "pathname", "hash", s)), ae(!s.search || !s.search.includes("#"), tt("#", "search", "hash", s)));
  let r = e === "" || s.pathname === "", d = r ? "/" : s.pathname, c;
  if (d == null)
    c = n;
  else {
    let u = t.length - 1;
    if (!a && d.startsWith("..")) {
      let y = d.split("/");
      for (; y[0] === ".."; )
        y.shift(), u -= 1;
      s.pathname = y.join("/");
    }
    c = u >= 0 ? t[u] : "/";
  }
  let o = Dn(s, c), l = d && d !== "/" && d.endsWith("/"), m = (r || d === ".") && n.endsWith("/");
  return !o.pathname.endsWith("/") && (l || m) && (o.pathname += "/"), o;
}
const wt = (e) => e.join("/").replace(/\/\/+/g, "/"), qn = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Un = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, on = ["post", "put", "patch", "delete"];
new Set(on);
const Wn = ["get", ...on];
new Set(Wn);
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
function ft() {
  return ft = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, ft.apply(this, arguments);
}
const Ze = /* @__PURE__ */ I.createContext(null);
process.env.NODE_ENV !== "production" && (Ze.displayName = "DataRouter");
const cn = /* @__PURE__ */ I.createContext(null);
process.env.NODE_ENV !== "production" && (cn.displayName = "DataRouterState");
const Kn = /* @__PURE__ */ I.createContext(null);
process.env.NODE_ENV !== "production" && (Kn.displayName = "Await");
const Ce = /* @__PURE__ */ I.createContext(null);
process.env.NODE_ENV !== "production" && (Ce.displayName = "Navigation");
const xt = /* @__PURE__ */ I.createContext(null);
process.env.NODE_ENV !== "production" && (xt.displayName = "Location");
const Ie = /* @__PURE__ */ I.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (Ie.displayName = "Route");
const Vn = /* @__PURE__ */ I.createContext(null);
process.env.NODE_ENV !== "production" && (Vn.displayName = "RouteError");
function Jn(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t;
  Et() || (process.env.NODE_ENV !== "production" ? ae(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : ae(!1));
  let {
    basename: a,
    navigator: s
  } = I.useContext(Ce), {
    hash: r,
    pathname: d,
    search: c
  } = qe(e, {
    relative: n
  }), o = d;
  return a !== "/" && (o = d === "/" ? a : wt([a, d])), s.createHref({
    pathname: o,
    search: c,
    hash: r
  });
}
function Et() {
  return I.useContext(xt) != null;
}
function Fe() {
  return Et() || (process.env.NODE_ENV !== "production" ? ae(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : ae(!1)), I.useContext(xt).location;
}
const ln = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function dn(e) {
  I.useContext(Ce).static || I.useLayoutEffect(e);
}
function Yn() {
  let {
    isDataRoute: e
  } = I.useContext(Ie);
  return e ? Xn() : zn();
}
function zn() {
  Et() || (process.env.NODE_ENV !== "production" ? ae(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : ae(!1));
  let e = I.useContext(Ze), {
    basename: t,
    future: n,
    navigator: a
  } = I.useContext(Ce), {
    matches: s
  } = I.useContext(Ie), {
    pathname: r
  } = Fe(), d = JSON.stringify(rn(s, n.v7_relativeSplatPath)), c = I.useRef(!1);
  return dn(() => {
    c.current = !0;
  }), I.useCallback(function(l, m) {
    if (m === void 0 && (m = {}), process.env.NODE_ENV !== "production" && $e(c.current, ln), !c.current) return;
    if (typeof l == "number") {
      a.go(l);
      return;
    }
    let u = sn(l, JSON.parse(d), r, m.relative === "path");
    e == null && t !== "/" && (u.pathname = u.pathname === "/" ? t : wt([t, u.pathname])), (m.replace ? a.replace : a.push)(u, m.state, m);
  }, [t, a, d, r, e]);
}
function qe(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    future: a
  } = I.useContext(Ce), {
    matches: s
  } = I.useContext(Ie), {
    pathname: r
  } = Fe(), d = JSON.stringify(rn(s, a.v7_relativeSplatPath));
  return I.useMemo(() => sn(e, JSON.parse(d), r, n === "path"), [e, d, r, n]);
}
var un = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(un || {}), Ct = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(Ct || {});
function fn(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Hn(e) {
  let t = I.useContext(Ze);
  return t || (process.env.NODE_ENV !== "production" ? ae(!1, fn(e)) : ae(!1)), t;
}
function Gn(e) {
  let t = I.useContext(Ie);
  return t || (process.env.NODE_ENV !== "production" ? ae(!1, fn(e)) : ae(!1)), t;
}
function mn(e) {
  let t = Gn(e), n = t.matches[t.matches.length - 1];
  return n.route.id || (process.env.NODE_ENV !== "production" ? ae(!1, e + ' can only be used on routes that contain a unique "id"') : ae(!1)), n.route.id;
}
function Qn() {
  return mn(Ct.UseRouteId);
}
function Xn() {
  let {
    router: e
  } = Hn(un.UseNavigateStable), t = mn(Ct.UseNavigateStable), n = I.useRef(!1);
  return dn(() => {
    n.current = !0;
  }), I.useCallback(function(s, r) {
    r === void 0 && (r = {}), process.env.NODE_ENV !== "production" && $e(n.current, ln), n.current && (typeof s == "number" ? e.navigate(s) : e.navigate(s, ft({
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
function Le() {
  return Le = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, Le.apply(this, arguments);
}
function At(e, t) {
  if (e == null) return {};
  var n = {}, a = Object.keys(e), s, r;
  for (r = 0; r < a.length; r++)
    s = a[r], !(t.indexOf(s) >= 0) && (n[s] = e[s]);
  return n;
}
const Ve = "get", Je = "application/x-www-form-urlencoded";
function et(e) {
  return e != null && typeof e.tagName == "string";
}
function Zn(e) {
  return et(e) && e.tagName.toLowerCase() === "button";
}
function ea(e) {
  return et(e) && e.tagName.toLowerCase() === "form";
}
function ta(e) {
  return et(e) && e.tagName.toLowerCase() === "input";
}
function na(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function aa(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !na(e);
}
let We = null;
function ra() {
  if (We === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), We = !1;
    } catch {
      We = !0;
    }
  return We;
}
const sa = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function nt(e) {
  return e != null && !sa.has(e) ? (process.env.NODE_ENV !== "production" && $e(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + Je + '"')), null) : e;
}
function ia(e, t) {
  let n, a, s, r, d;
  if (ea(e)) {
    let c = e.getAttribute("action");
    a = c ? Re(c, t) : null, n = e.getAttribute("method") || Ve, s = nt(e.getAttribute("enctype")) || Je, r = new FormData(e);
  } else if (Zn(e) || ta(e) && (e.type === "submit" || e.type === "image")) {
    let c = e.form;
    if (c == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let o = e.getAttribute("formaction") || c.getAttribute("action");
    if (a = o ? Re(o, t) : null, n = e.getAttribute("formmethod") || c.getAttribute("method") || Ve, s = nt(e.getAttribute("formenctype")) || nt(c.getAttribute("enctype")) || Je, r = new FormData(c, e), !ra()) {
      let {
        name: l,
        type: m,
        value: u
      } = e;
      if (m === "image") {
        let y = l ? l + "." : "";
        r.append(y + "x", "0"), r.append(y + "y", "0");
      } else l && r.append(l, u);
    }
  } else {
    if (et(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    n = Ve, a = null, s = Je, d = e;
  }
  return r && s === "text/plain" && (d = r, r = void 0), {
    action: a,
    method: n.toLowerCase(),
    encType: s,
    formData: r,
    body: d
  };
}
const oa = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], ca = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], la = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], da = "6";
try {
  window.__reactRouterVersion = da;
} catch {
}
const hn = /* @__PURE__ */ I.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (hn.displayName = "ViewTransition");
const ua = /* @__PURE__ */ I.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (ua.displayName = "Fetchers");
process.env.NODE_ENV;
const fa = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", ma = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, ke = /* @__PURE__ */ I.forwardRef(function(t, n) {
  let {
    onClick: a,
    relative: s,
    reloadDocument: r,
    replace: d,
    state: c,
    target: o,
    to: l,
    preventScrollReset: m,
    viewTransition: u
  } = t, y = At(t, oa), {
    basename: x
  } = I.useContext(Ce), E, v = !1;
  if (typeof l == "string" && ma.test(l) && (E = l, fa))
    try {
      let w = new URL(window.location.href), b = l.startsWith("//") ? new URL(w.protocol + l) : new URL(l), p = Re(b.pathname, x);
      b.origin === w.origin && p != null ? l = p + b.search + b.hash : v = !0;
    } catch {
      process.env.NODE_ENV !== "production" && $e(!1, '<Link to="' + l + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let f = Jn(l, {
    relative: s
  }), g = va(l, {
    replace: d,
    state: c,
    target: o,
    preventScrollReset: m,
    relative: s,
    viewTransition: u
  });
  function h(w) {
    a && a(w), w.defaultPrevented || g(w);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ I.createElement("a", Le({}, y, {
      href: E || f,
      onClick: v || r ? a : h,
      ref: n,
      target: o
    }))
  );
});
process.env.NODE_ENV !== "production" && (ke.displayName = "Link");
const ha = /* @__PURE__ */ I.forwardRef(function(t, n) {
  let {
    "aria-current": a = "page",
    caseSensitive: s = !1,
    className: r = "",
    end: d = !1,
    style: c,
    to: o,
    viewTransition: l,
    children: m
  } = t, u = At(t, ca), y = qe(o, {
    relative: u.relative
  }), x = Fe(), E = I.useContext(cn), {
    navigator: v,
    basename: f
  } = I.useContext(Ce), g = E != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Ea(y) && l === !0, h = v.encodeLocation ? v.encodeLocation(y).pathname : y.pathname, w = x.pathname, b = E && E.navigation && E.navigation.location ? E.navigation.location.pathname : null;
  s || (w = w.toLowerCase(), b = b ? b.toLowerCase() : null, h = h.toLowerCase()), b && f && (b = Re(b, f) || b);
  const p = h !== "/" && h.endsWith("/") ? h.length - 1 : h.length;
  let N = w === h || !d && w.startsWith(h) && w.charAt(p) === "/", S = b != null && (b === h || !d && b.startsWith(h) && b.charAt(h.length) === "/"), R = {
    isActive: N,
    isPending: S,
    isTransitioning: g
  }, T = N ? a : void 0, V;
  typeof r == "function" ? V = r(R) : V = [r, N ? "active" : null, S ? "pending" : null, g ? "transitioning" : null].filter(Boolean).join(" ");
  let U = typeof c == "function" ? c(R) : c;
  return /* @__PURE__ */ I.createElement(ke, Le({}, u, {
    "aria-current": T,
    className: V,
    ref: n,
    style: U,
    to: o,
    viewTransition: l
  }), typeof m == "function" ? m(R) : m);
});
process.env.NODE_ENV !== "production" && (ha.displayName = "NavLink");
const pa = /* @__PURE__ */ I.forwardRef((e, t) => {
  let {
    fetcherKey: n,
    navigate: a,
    reloadDocument: s,
    replace: r,
    state: d,
    method: c = Ve,
    action: o,
    onSubmit: l,
    relative: m,
    preventScrollReset: u,
    viewTransition: y
  } = e, x = At(e, la), E = wa(), v = xa(o, {
    relative: m
  }), f = c.toLowerCase() === "get" ? "get" : "post", g = (h) => {
    if (l && l(h), h.defaultPrevented) return;
    h.preventDefault();
    let w = h.nativeEvent.submitter, b = (w == null ? void 0 : w.getAttribute("formmethod")) || c;
    E(w || h.currentTarget, {
      fetcherKey: n,
      method: b,
      navigate: a,
      replace: r,
      state: d,
      relative: m,
      preventScrollReset: u,
      viewTransition: y
    });
  };
  return /* @__PURE__ */ I.createElement("form", Le({
    ref: t,
    method: f,
    action: v,
    onSubmit: s ? l : g
  }, x));
});
process.env.NODE_ENV !== "production" && (pa.displayName = "Form");
process.env.NODE_ENV;
var He;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(He || (He = {}));
var Bt;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Bt || (Bt = {}));
function ya(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function pn(e) {
  let t = I.useContext(Ze);
  return t || (process.env.NODE_ENV !== "production" ? ae(!1, ya(e)) : ae(!1)), t;
}
function va(e, t) {
  let {
    target: n,
    replace: a,
    state: s,
    preventScrollReset: r,
    relative: d,
    viewTransition: c
  } = t === void 0 ? {} : t, o = Yn(), l = Fe(), m = qe(e, {
    relative: d
  });
  return I.useCallback((u) => {
    if (aa(u, n)) {
      u.preventDefault();
      let y = a !== void 0 ? a : ut(l) === ut(m);
      o(e, {
        replace: y,
        state: s,
        preventScrollReset: r,
        relative: d,
        viewTransition: c
      });
    }
  }, [l, o, m, a, s, n, e, r, d, c]);
}
function ga() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let ba = 0, Na = () => "__" + String(++ba) + "__";
function wa() {
  let {
    router: e
  } = pn(He.UseSubmit), {
    basename: t
  } = I.useContext(Ce), n = Qn();
  return I.useCallback(function(a, s) {
    s === void 0 && (s = {}), ga();
    let {
      action: r,
      method: d,
      encType: c,
      formData: o,
      body: l
    } = ia(a, t);
    if (s.navigate === !1) {
      let m = s.fetcherKey || Na();
      e.fetch(m, n, s.action || r, {
        preventScrollReset: s.preventScrollReset,
        formData: o,
        body: l,
        formMethod: s.method || d,
        formEncType: s.encType || c,
        flushSync: s.flushSync
      });
    } else
      e.navigate(s.action || r, {
        preventScrollReset: s.preventScrollReset,
        formData: o,
        body: l,
        formMethod: s.method || d,
        formEncType: s.encType || c,
        replace: s.replace,
        state: s.state,
        fromRouteId: n,
        flushSync: s.flushSync,
        viewTransition: s.viewTransition
      });
  }, [e, t, n]);
}
function xa(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    basename: a
  } = I.useContext(Ce), s = I.useContext(Ie);
  s || (process.env.NODE_ENV !== "production" ? ae(!1, "useFormAction must be used inside a RouteContext") : ae(!1));
  let [r] = s.matches.slice(-1), d = Le({}, qe(e || ".", {
    relative: n
  })), c = Fe();
  if (e == null) {
    d.search = c.search;
    let o = new URLSearchParams(d.search), l = o.getAll("index");
    if (l.some((u) => u === "")) {
      o.delete("index"), l.filter((y) => y).forEach((y) => o.append("index", y));
      let u = o.toString();
      d.search = u ? "?" + u : "";
    }
  }
  return (!e || e === ".") && r.route.index && (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"), a !== "/" && (d.pathname = d.pathname === "/" ? a : wt([a, d.pathname])), ut(d);
}
function Ea(e, t) {
  t === void 0 && (t = {});
  let n = I.useContext(hn);
  n == null && (process.env.NODE_ENV !== "production" ? ae(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : ae(!1));
  let {
    basename: a
  } = pn(He.useViewTransitionState), s = qe(e, {
    relative: t.relative
  });
  if (!n.isTransitioning)
    return !1;
  let r = Re(n.currentLocation.pathname, a) || n.currentLocation.pathname, d = Re(n.nextLocation.pathname, a) || n.nextLocation.pathname;
  return It(s.pathname, d) != null || It(s.pathname, r) != null;
}
function Ca(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
class Aa {
  /**
   * @param {TableLinkConfig} tableLink
   */
  constructor(t = {}) {
    if (!t.link)
      throw new Error("TableLinkObject requires `link` (base route).");
    this.id = t.id ?? B("table-link"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = t.link;
    const n = { iconClass: "fa-solid fa-user" }, a = { iconClass: "fa-solid fa-arrow-down" };
    this.icon = t.icon instanceof F ? t.icon : new F(t.icon || n), this.sort = t.sort instanceof F ? t.sort : new F(t.sort || a);
  }
}
function Sa(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function Rr({ tableLink: e, output: t }) {
  if (!e || !(e instanceof Aa))
    throw new Error(
      "AlloyTableLink requires `tableLink` (TableLinkObject instance)."
    );
  const n = se(e.id), [a, s] = L({ col: "", dir: "asc" }), r = fe(
    () => Sa(e.rows),
    [e.rows]
  ), d = (c) => {
    if (!c) return;
    const o = a.col === c && a.dir === "asc" ? "desc" : "asc";
    s({ col: c, dir: o }), t == null || t({
      type: "column",
      name: c,
      dir: o
    });
  };
  return /* @__PURE__ */ A("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ i("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ i("thead", { children: /* @__PURE__ */ A("tr", { children: [
      /* @__PURE__ */ i("th", { scope: "col", children: "Type" }),
      r.map((c) => {
        const o = a.col === c, l = o && a.dir === "desc";
        return /* @__PURE__ */ i("th", { scope: "col", children: /* @__PURE__ */ A(
          "span",
          {
            onClick: () => d(c),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              Ca(c),
              o && /* @__PURE__ */ i(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: l ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: l ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ i(oe, { icon: e.sort })
                }
              )
            ]
          }
        ) }, c);
      })
    ] }) }),
    /* @__PURE__ */ i("tbody", { children: e.rows.length > 0 ? e.rows.map((c, o) => {
      const l = (c == null ? void 0 : c.id) ?? o, u = `${e.link.endsWith("/") ? e.link.slice(0, -1) : e.link}/${l}`;
      return /* @__PURE__ */ A("tr", { children: [
        /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i(oe, { icon: e.icon }) }),
        r.map((y) => /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i(
          ke,
          {
            to: u,
            className: "text-decoration-none",
            onClick: () => t == null ? void 0 : t({
              type: "navigate",
              to: u,
              id: l
            }),
            children: /* @__PURE__ */ i("span", { children: c == null ? void 0 : c[y] })
          }
        ) }, `${l}-${y}`))
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
function Oa(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
function ka(e) {
  if (!Array.isArray(e) || e.length === 0) return [];
  const t = e[0] ?? {};
  return Object.keys(t).filter((n) => n !== "id");
}
function ja(e) {
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
class _e {
  /**
   * @param {Object} cfg
   */
  constructor(t = {}) {
    this.id = t.id ?? B("table-action"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [], this.link = typeof t.link == "string" ? t.link : "";
    const n = new F({ iconClass: "fa-solid fa-user" }), a = new F({ iconClass: "fa-solid fa-arrow-down" });
    this.icon = t.icon instanceof F ? t.icon : new F(t.icon || n), this.sort = t.sort instanceof F ? t.sort : new F(t.sort || a), this.actions = t.actions ? t.actions instanceof xe ? t.actions : new xe(t.actions) : void 0;
  }
}
function yn({ tableAction: e, output: t }) {
  if (!e || !(e instanceof _e))
    throw new Error(
      "AlloyTableAction requires `tableAction` (TableActionObject instance)."
    );
  const n = se(e.id), a = fe(
    () => ka(e.rows),
    [e.rows]
  ), [s, r] = L({ col: "", dir: "asc" });
  function d(l) {
    const m = s.col === l && s.dir === "asc" ? "desc" : "asc";
    r({ col: l, dir: m });
    const u = new k({
      id: n.current,
      type: "column",
      action: "Sort",
      error: !1,
      data: {
        name: l,
        dir: m
      }
    });
    t == null || t(u);
  }
  function c(l) {
    return (m, u) => {
      const y = ja(m), x = new k({
        id: n.current,
        type: "table",
        action: y,
        error: !1,
        data: l
      });
      t == null || t(x);
    };
  }
  const o = !!e.actions;
  return /* @__PURE__ */ A("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ i("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ i("thead", { children: /* @__PURE__ */ A("tr", { children: [
      /* @__PURE__ */ i("th", { scope: "col", children: "Type" }),
      a.map((l) => {
        const m = s.col === l, u = m && s.dir === "desc";
        return /* @__PURE__ */ i("th", { scope: "col", children: /* @__PURE__ */ A(
          "span",
          {
            onClick: () => d(l),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              Oa(l),
              m && /* @__PURE__ */ i(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: u ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: u ? "rotate(180deg)" : "none",
                    transition: "transform 120ms"
                  },
                  children: /* @__PURE__ */ i(oe, { icon: e.sort })
                }
              )
            ]
          }
        ) }, `h-${l}`);
      }),
      o && /* @__PURE__ */ i("th", { scope: "col", className: "text-end", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ i("tbody", { children: e.rows.length > 0 ? e.rows.map((l, m) => {
      const u = (l == null ? void 0 : l.id) ?? m, y = e.actions;
      return /* @__PURE__ */ A("tr", { children: [
        /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i(oe, { icon: e.icon }) }),
        a.map((x) => {
          const E = e.link || "", v = E.endsWith("/") ? E.slice(0, -1) : E, f = v ? `${v}/${u}` : "";
          return /* @__PURE__ */ i("td", { children: v ? /* @__PURE__ */ i(
            ke,
            {
              to: f,
              onClick: () => {
                const g = new k({
                  id: n.current,
                  type: "row",
                  action: "navigate",
                  error: !1,
                  data: {
                    to: f,
                    ...l
                  }
                });
                t == null || t(g);
              },
              className: "text-decoration-none",
              children: /* @__PURE__ */ i("span", { children: l == null ? void 0 : l[x] })
            }
          ) : /* @__PURE__ */ i("span", { children: l == null ? void 0 : l[x] }) }, `${u}-${x}`);
        }),
        o && /* @__PURE__ */ i("td", { className: "text-end", children: /* @__PURE__ */ i(
          Xe,
          {
            buttonBar: y,
            output: c(l)
          }
        ) })
      ] }, u);
    }) : /* @__PURE__ */ i("tr", { children: /* @__PURE__ */ i(
      "td",
      {
        colSpan: (
          // icon col + data cols (+ actions col if present)
          1 + a.length + (o ? 1 : 0)
        ),
        className: "text-center text-secondary",
        children: "No rows"
      }
    ) }) })
  ] });
}
class mt {
  /**
   * @param {Object} card
   */
  constructor(t = {}) {
    this.id = t.id ?? B("card"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "";
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
function Pa({ card: e }) {
  var c, o;
  if (!e || !(e instanceof mt))
    throw new Error("AlloyCard requires `card` (CardObject instance).");
  const n = e.header && (e.header.hasText() || ((c = e.header.className) == null ? void 0 : c.trim())) ? /* @__PURE__ */ i(
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
        const m = l.id, u = l.colClass || "col-12";
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
              /* @__PURE__ */ i(oe, { icon: l.icon })
            ) : l.hasText() ? (
              // Text-only field
              /* @__PURE__ */ i("span", { children: l.name })
            ) : null
          }
        ) }, m);
      }) })
    }
  ), s = e.link ? /* @__PURE__ */ i(
    ke,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": e.body.ariaLabel,
      children: a
    }
  ) : a, d = e.footer && (e.footer.hasText() || ((o = e.footer.className) == null ? void 0 : o.trim().length)) ? /* @__PURE__ */ i(
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
class ht {
  constructor(t = {}) {
    this.id = t.id ?? B("card-action"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "";
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
      (c) => c instanceof ce ? c : new ce(c || {})
    );
    const r = t.footer ?? {};
    this.footer = r instanceof ce ? r : new ce(r), this.type = t.type ?? "AlloyButtonBar";
    const d = t.action;
    if (this.type === "AlloyLinkBar" ? this.action = d instanceof be ? d : d ? new be(d) : void 0 : this.action = d instanceof xe ? d : d ? new xe(d) : void 0, !this.action)
      throw new Error(
        "CardActionObject requires `action` (ButtonBarObject or LinkBarObject)."
      );
  }
}
function Ta({ cardAction: e, output: t }) {
  var x, E;
  if (!e || !(e instanceof ht))
    throw new Error(
      "AlloyCardAction requires `cardAction` (CardActionObject instance)."
    );
  function n(v) {
    if (typeof t != "function") return;
    const f = v && typeof v.toJSON == "function" ? v.toJSON() : v || {}, { error: g = !1, errorMessage: h = [] } = f, w = a(f), b = {};
    Array.isArray(e.fields) && e.fields.forEach((N) => {
      if (!N) return;
      const S = N.id, R = N.name;
      S && typeof R < "u" && (b[S] = R);
    });
    const p = new k({
      id: e.id,
      type: "card-action",
      action: w,
      error: !!g,
      errorMessage: h || [],
      data: b
    });
    t(p);
  }
  function a(v) {
    if (!v || typeof v != "object") return "";
    const f = (h) => {
      if (!h || typeof h != "object") return "";
      const w = typeof h.name == "string" ? h.name.trim() : "";
      if (w) return w;
      const b = typeof h.ariaLabel == "string" ? h.ariaLabel.trim() : "";
      if (b) return b;
      const p = typeof h.title == "string" ? h.title.trim() : "";
      if (p) return p;
      const N = typeof h.id == "string" ? h.id.trim() : "";
      return N || "";
    }, g = v.data && typeof v.data == "object" ? v.data : null;
    if (g) {
      if (g.action && typeof g.action == "object") {
        const w = f(g.action);
        if (w) return w;
      }
      if (g.button && typeof g.button == "object") {
        const w = f(g.button);
        if (w) return w;
      }
      if (g.link && typeof g.link == "object") {
        const w = f(g.link);
        if (w) return w;
      }
      const h = f(g);
      if (h) return h;
    }
    return f(v);
  }
  const r = e.header && (e.header.hasText() || ((x = e.header.className) == null ? void 0 : x.trim())) ? /* @__PURE__ */ i(
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
      children: /* @__PURE__ */ i("div", { className: "row g-2", children: e.fields.map((v) => {
        if (!v) return null;
        const f = v.id, g = v.colClass || "col-12";
        return /* @__PURE__ */ i("div", { className: g, children: /* @__PURE__ */ i(
          "div",
          {
            id: v.id,
            className: v.className,
            "aria-label": v.ariaLabel,
            children: v.hasLogo() ? (
              // Logo-only field
              /* @__PURE__ */ i(
                "img",
                {
                  src: v.logo.imageUrl,
                  alt: v.logo.alt,
                  width: v.logo.width,
                  height: v.logo.height,
                  className: v.logo.className
                }
              )
            ) : v.hasIcon() ? (
              // Icon-only field (use AlloyIcon)
              /* @__PURE__ */ i(oe, { icon: v.icon })
            ) : v.hasText() ? (
              // Text-only field
              /* @__PURE__ */ i("span", { children: v.name })
            ) : null
          }
        ) }, f);
      }) })
    }
  ), c = e.link ? /* @__PURE__ */ i(
    ke,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (E = e.body) == null ? void 0 : E.ariaLabel,
      children: d
    }
  ) : d, o = e.footer && e.footer.hasText(), l = !!e.action, m = l && e.type === "AlloyLinkBar" ? /* @__PURE__ */ i(Me, { linkBar: e.action, output: n }) : l ? /* @__PURE__ */ i(Xe, { buttonBar: e.action, output: n }) : null, y = o || l ? /* @__PURE__ */ A(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className ?? "card-footer d-flex align-items-center gap-2 py-2",
      "aria-label": e.footer.ariaLabel,
      children: [
        o && /* @__PURE__ */ i("div", { className: "me-auto small text-muted", children: e.footer.name }),
        m && /* @__PURE__ */ i("div", { role: "group", children: m })
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
        c,
        y
      ]
    }
  );
}
class Se {
  constructor(t = {}) {
    const {
      id: n,
      title: a = "AlloyMobile",
      className: s = "col m-2",
      message: r = "",
      action: d = "",
      type: c = "AlloyInputTextIcon",
      submit: o,
      fields: l,
      data: m
    } = t;
    this.id = n ?? B("form"), this.title = a, this.className = s, this.message = r, this.action = d, this.type = c, this.submit = o instanceof Te ? o : new Te(
      o || {
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
      (y) => y instanceof ne ? y : new ne(y)
    ), this.data = m ?? {};
  }
}
function Mt(e, t, n) {
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
function St({ form: e, output: t }) {
  const n = e instanceof Se ? e : new Se(e || {});
  if (!n || !Array.isArray(n.fields) || !(n.submit instanceof Te))
    throw new Error(
      "AlloyForm could not hydrate a valid FormObject (missing fields[] or submit)."
    );
  const [a, s] = L(() => {
    const u = {}, y = {};
    return n.fields.forEach((x) => {
      y[x.name] = x.value;
    }), n.fields.forEach((x) => {
      const E = x.value, { valid: v, error: f, errors: g } = Mt(
        x,
        E,
        y
      );
      u[x.name] = {
        value: E,
        valid: v,
        error: f,
        errors: g
      };
    }), u;
  }), r = se(null), d = En(
    (u) => {
      const y = {};
      Object.keys(u).forEach((E) => {
        y[E] = u[E].value;
      });
      const x = {};
      return n.fields.forEach((E) => {
        const v = y[E.name], { valid: f, error: g, errors: h } = Mt(
          E,
          v,
          y
        );
        x[E.name] = {
          value: v,
          valid: f,
          error: g,
          errors: h
        };
      }), x;
    },
    [n.fields]
  );
  function c(u) {
    const y = u instanceof k ? u.data || {} : u || {}, { name: x, value: E } = y;
    x && s((v) => {
      const f = { ...v };
      return f[x] = {
        ...v[x] || {
          value: void 0,
          valid: !0,
          error: !1,
          errors: []
        },
        value: E
      }, d(f);
    });
  }
  const o = fe(() => {
    const u = {};
    return Object.keys(a).forEach((y) => {
      u[y] = a[y].value;
    }), u;
  }, [a]), l = fe(() => Object.values(a).some(
    (u) => u.error || !u.valid
  ), [a]);
  function m(u) {
    let y = !1;
    Object.values(a).forEach((f) => {
      (f.error || !f.valid) && (y = !0);
    });
    const x = { ...o };
    n.data = x, n.message = "";
    const E = y ? { ...a } : x, v = new k({
      id: n.id,
      // top-level id, as you requested
      type: "form",
      action: "submit",
      data: E,
      error: y
      // no errorMessage; all useful info is inside data for error=true
    });
    t == null || t(v);
  }
  return n.submit.disabled = l || !!n.submit.loading, /* @__PURE__ */ i("div", { className: "row", children: /* @__PURE__ */ i("div", { className: n.className, children: /* @__PURE__ */ A("div", { className: "text-center", children: [
    /* @__PURE__ */ i("h3", { children: n.title }),
    n.message !== "" && /* @__PURE__ */ i("div", { className: "alert alert-text-danger m-0 p-0", children: n.message }),
    n.fields.map((u) => /* @__PURE__ */ i(
      Ee,
      {
        input: u,
        output: c
      },
      u.id
    )),
    /* @__PURE__ */ i(
      nn,
      {
        ref: r,
        buttonSubmit: n.submit,
        output: m
      }
    )
  ] }) }) });
}
class Ra {
  constructor(t = {}) {
    this.id = t.id ?? B("tab"), this.key = t.key ?? this.id, this.title = t.title ?? "", this.subtitle = t.subtitle ?? "", this.order = typeof t.order == "number" ? t.order : 0, this.required = !!t.required, this.stage = t.stage ?? "", this.status = t.status ?? "", this.icon = t.icon ? t.icon instanceof F ? t.icon : new F(t.icon) : null, this.inputs = Array.isArray(t.inputs) ? t.inputs : [];
  }
}
class La {
  constructor(t = {}) {
    this.id = t.id ?? B("tab-form"), this.name = t.name ?? "", this.status = t.status ?? "draft";
    const a = (Array.isArray(t.tabs) ? t.tabs : []).map((d) => new Ra(d));
    this.tabs = a.sort((d, c) => d.order - c.order);
    let s = typeof t.currentIndex == "number" ? t.currentIndex : 0;
    s < 0 && (s = 0), s >= this.tabs.length && (s = this.tabs.length - 1), this.currentIndex = this.tabs.length > 0 ? s : 0;
    const r = t.navButtons || {};
    this.navButtons = {
      previous: r.previous ? new le({
        ...r.previous,
        name: r.previous.name || r.previous.label || "Previous"
      }) : null,
      next: r.next ? new le({
        ...r.next,
        name: r.next.name || r.next.label || "Next"
      }) : null,
      finish: r.finish ? new le({
        ...r.finish,
        name: r.finish.name || r.finish.label || "Finish"
      }) : null
    };
  }
}
function Ia(e) {
  const t = {};
  return e.tabs.forEach((n) => {
    const a = {};
    n.inputs.forEach((s) => {
      const r = s.name;
      r && (typeof s.value < "u" ? a[r] = s.value : s.type === "checkbox" ? a[r] = !1 : a[r] = "");
    }), t[n.key] = a;
  }), t;
}
function _t(e, t) {
  const n = {};
  return e.inputs.forEach((a) => {
    const s = a.name;
    if (!s) return;
    const r = [], d = typeof t[s] < "u" ? t[s] : a.value;
    if (a.required && (a.type === "checkbox" ? d || r.push("This field is required.") : (d === "" || d === null || typeof d > "u") && r.push("This field is required.")), a.matchWith) {
      const c = a.matchWith, o = t[c];
      d !== o && r.push("Values do not match.");
    }
    r.length > 0 && (n[s] = r);
  }), n;
}
function Lr({ tabForm: e, output: t }) {
  if (!e || !(e instanceof La))
    throw new Error("AlloyTabForm requires `tabForm` (TabFormObject instance).");
  const [n, a] = L(e.currentIndex), [s, r] = L(() => Ia(e)), [d, c] = L({}), o = e.tabs, l = o.length, m = o[n] || null, u = m ? m.key : "", y = e.navButtons || {};
  function x(T, V, U, H) {
    const Q = s[T] || {};
    return Object.prototype.hasOwnProperty.call(Q, V) ? Q[V] : typeof U < "u" ? U : H === "checkbox" ? !1 : "";
  }
  function E(T, V) {
    var te, ee, de;
    const U = V && typeof V.toJSON == "function" ? V.toJSON() : V, H = (te = U == null ? void 0 : U.data) == null ? void 0 : te.name, Q = (ee = U == null ? void 0 : U.data) == null ? void 0 : ee.value, X = ((de = U == null ? void 0 : U.data) == null ? void 0 : de.errors) || [];
    H && (r((Z) => {
      const ve = { ...Z }, C = { ...ve[T] || {} };
      return C[H] = Q, ve[T] = C, ve;
    }), c((Z) => {
      const ve = { ...Z }, C = { ...ve[T] || {} };
      return X.length > 0 ? C[H] = X : delete C[H], ve[T] = C, ve;
    }));
  }
  function v(T, V, U, H, Q) {
    const X = o[V] || m, te = X ? X.key : u, ee = {
      currentIndex: V,
      currentTabKey: te,
      values: U
    };
    if (Q && H && Object.keys(H).length > 0 && (ee.errors = H, ee.message = "Validation failed for current step."), typeof t != "function") return;
    const de = Q ? k.errorOf({
      id: e.id,
      type: "tab-form",
      action: T === "finish" ? "submit" : "draft",
      data: ee
    }) : k.ok({
      id: e.id,
      type: "tab-form",
      action: T === "finish" ? "submit" : "draft",
      data: ee
    });
    t(de);
  }
  function f() {
    if (!m || n <= 0) return;
    const T = n - 1;
    a(T), v("previous", T, s, d, !1);
  }
  function g() {
    if (!m || n >= l - 1) return;
    const T = m.key, V = s[T] || {}, U = _t(m, V);
    if (Object.keys(U).length > 0) {
      const X = {
        ...d,
        [T]: U
      };
      c(X), v("next", n, s, X, !0);
      return;
    }
    const H = n + 1;
    a(H);
    const Q = { ...d };
    delete Q[T], c(Q), v("next", H, s, Q, !1);
  }
  function h() {
    if (!m) return;
    const T = m.key, V = s[T] || {}, U = _t(m, V);
    if (Object.keys(U).length > 0) {
      const Q = {
        ...d,
        [T]: U
      };
      c(Q), v("finish", n, s, Q, !0);
      return;
    }
    const H = { ...d };
    delete H[T], c(H), v("finish", n, s, H, !1);
  }
  if (!m)
    return /* @__PURE__ */ i("div", { className: "alert alert-warning", children: "No steps defined for this TabForm." });
  const w = n > 0, b = n === l - 1, p = !b, N = w && (y.previous || new le({
    name: "Previous",
    icon: { iconClass: "fa-solid fa-arrow-left" },
    className: "btn btn-primary"
  })), S = p && (y.next || new le({
    name: "Next",
    icon: { iconClass: "fa-solid fa-arrow-right" },
    className: "btn btn-primary"
  })), R = b && (y.finish || new le({
    name: "Finish",
    icon: { iconClass: "fa-solid fa-paper-plane" },
    className: "btn btn-primary"
  }));
  return /* @__PURE__ */ A("div", { className: "alloy-tab-form", children: [
    /* @__PURE__ */ i("ul", { className: "nav nav-tabs mb-3 flex-wrap", children: o.map((T, V) => /* @__PURE__ */ i("li", { className: "nav-item", children: /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        className: `nav-link ${V === n ? "active" : ""}`,
        onClick: () => a(V),
        children: [
          T.icon && /* @__PURE__ */ i("span", { className: "me-1", children: /* @__PURE__ */ i(oe, { icon: T.icon }) }),
          T.title || `Step ${V + 1}`
        ]
      }
    ) }, T.id)) }),
    (m.title || m.subtitle) && /* @__PURE__ */ A("div", { className: "mb-3", children: [
      m.title && /* @__PURE__ */ i("h5", { className: "mb-1", children: m.title }),
      m.subtitle && /* @__PURE__ */ i("div", { className: "text-muted small", children: m.subtitle })
    ] }),
    /* @__PURE__ */ A(
      "form",
      {
        onSubmit: (T) => T.preventDefault(),
        noValidate: !0,
        children: [
          /* @__PURE__ */ i("div", { className: "row g-3", children: /* @__PURE__ */ i("div", { className: "col-12 col-md-6 col-lg-5 mx-auto", children: m.inputs.map((T, V) => {
            const U = x(
              m.key,
              T.name,
              T.value,
              T.type
            ), Q = (d[m.key] || {})[T.name] || [], X = Q.length > 0, te = new ne({
              ...T,
              value: U,
              errors: Q,
              invalid: X
            });
            return /* @__PURE__ */ i(
              Ee,
              {
                input: te,
                output: (ee) => E(m.key, ee)
              },
              `inp-${V}`
            );
          }) }) }),
          /* @__PURE__ */ A("div", { className: "d-flex justify-content-between mt-4", children: [
            w ? /* @__PURE__ */ i(
              Oe,
              {
                buttonIcon: N,
                output: () => f()
              }
            ) : /* @__PURE__ */ i("span", {}),
            /* @__PURE__ */ A("div", { className: "d-flex gap-2 ms-auto", children: [
              p && /* @__PURE__ */ i(
                Oe,
                {
                  buttonIcon: S,
                  output: () => g()
                }
              ),
              b && /* @__PURE__ */ i(
                Oe,
                {
                  buttonIcon: R,
                  output: () => h()
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
class we {
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
      fields: c = [],
      data: o = {},
      ...l
    } = t;
    this.id = n ?? B("modal"), this.title = a ?? "", this.className = s ?? "modal fade", this.action = r ?? "", d instanceof he ? this.submit = d : d && typeof d == "object" ? this.submit = new he(d) : this.submit = null, this.fields = c.map(
      (u) => u instanceof ne ? u : new ne(u)
    );
    const m = {};
    this.fields.forEach((u) => {
      m[u.name] = u.value;
    }), this.data = { ...m, ...o }, Object.assign(this, l);
  }
}
function Dt(e) {
  const t = {};
  return e && Array.isArray(e.fields) && e.fields.forEach((n) => {
    n instanceof ne && (t[n.name] = n.value);
  }), { ...t, ...e.data || {} };
}
function Ba(e) {
  return Object.values(e).some(
    (t) => Array.isArray(t) && t.length > 0
  );
}
function Ma(e) {
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
function Ot({ modal: e, output: t }) {
  if (!e || !(e instanceof we))
    throw new Error("AlloyModal requires `modal` (ModalObject instance).");
  if (!e.submit || !(e.submit instanceof he))
    throw new Error(
      "ModalObject.submit must be a ButtonObject instance for AlloyModal."
    );
  const [n, a] = L(() => Dt(e)), [s, r] = L({});
  ge(() => {
    a(Dt(e)), r({});
  }, [e]);
  const d = (o) => {
    if (!o || !(o instanceof k)) return;
    const { data: l, error: m } = o;
    if (!l || !l.name) return;
    const { name: u, value: y, errors: x = [] } = l;
    a((E) => ({
      ...E,
      [u]: y
    })), r((E) => ({
      ...E,
      [u]: m ? x : []
    }));
  }, c = () => {
    if (typeof t != "function") return;
    const o = { ...n };
    if (Ba(s)) {
      const m = k.errorOf({
        id: e.id,
        type: "modal",
        action: "submit",
        message: "Validation failed",
        data: {
          ...o,
          errors: s
        }
      });
      t(m);
      return;
    }
    const l = k.ok({
      id: e.id,
      type: "modal",
      action: "submit",
      data: o
    });
    t(l), Ma(e.id);
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
        /* @__PURE__ */ i("div", { className: "modal-body", children: e.fields.map((o) => /* @__PURE__ */ i(
          Ee,
          {
            input: o,
            output: d
          },
          o.id
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
          /* @__PURE__ */ i(Qe, { button: e.submit, output: c })
        ] })
      ] }) })
    }
  );
}
class _a {
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
      message: c,
      ...o
    } = t;
    this.id = n ?? B("modalToast"), this.title = a ?? "", this.className = s ?? "modal fade", this.action = r ?? "", d instanceof he ? this.submit = d : d && typeof d == "object" ? this.submit = new he(d) : this.submit = null, this.message = c ?? "", Object.assign(this, o);
  }
}
function Da(e) {
  const t = document.getElementById(e);
  if (!t) return;
  const n = t.querySelector('[data-bs-dismiss="modal"]');
  n && typeof n.click == "function" && n.click();
}
function Ir({ modalToast: e, output: t }) {
  if (!e || !(e instanceof _a))
    throw new Error(
      "AlloyModalToast requires `modalToast` (ModalToastObject instance)."
    );
  if (!e.submit || !(e.submit instanceof he))
    throw new Error(
      "ModalToastObject.submit must be a ButtonObject instance for AlloyModalToast."
    );
  const n = () => {
    if (typeof t == "function") {
      const a = k.ok({
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
    Da(e.id);
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
          /* @__PURE__ */ i(Qe, { button: e.submit, output: n })
        ] })
      ] }) })
    }
  );
}
function $a(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var pt = { exports: {} }, Ke = { exports: {} }, J = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $t;
function Fa() {
  if ($t) return J;
  $t = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, a = e ? Symbol.for("react.fragment") : 60107, s = e ? Symbol.for("react.strict_mode") : 60108, r = e ? Symbol.for("react.profiler") : 60114, d = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, o = e ? Symbol.for("react.async_mode") : 60111, l = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, u = e ? Symbol.for("react.suspense") : 60113, y = e ? Symbol.for("react.suspense_list") : 60120, x = e ? Symbol.for("react.memo") : 60115, E = e ? Symbol.for("react.lazy") : 60116, v = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, g = e ? Symbol.for("react.responder") : 60118, h = e ? Symbol.for("react.scope") : 60119;
  function w(p) {
    if (typeof p == "object" && p !== null) {
      var N = p.$$typeof;
      switch (N) {
        case t:
          switch (p = p.type, p) {
            case o:
            case l:
            case a:
            case r:
            case s:
            case u:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case c:
                case m:
                case E:
                case x:
                case d:
                  return p;
                default:
                  return N;
              }
          }
        case n:
          return N;
      }
    }
  }
  function b(p) {
    return w(p) === l;
  }
  return J.AsyncMode = o, J.ConcurrentMode = l, J.ContextConsumer = c, J.ContextProvider = d, J.Element = t, J.ForwardRef = m, J.Fragment = a, J.Lazy = E, J.Memo = x, J.Portal = n, J.Profiler = r, J.StrictMode = s, J.Suspense = u, J.isAsyncMode = function(p) {
    return b(p) || w(p) === o;
  }, J.isConcurrentMode = b, J.isContextConsumer = function(p) {
    return w(p) === c;
  }, J.isContextProvider = function(p) {
    return w(p) === d;
  }, J.isElement = function(p) {
    return typeof p == "object" && p !== null && p.$$typeof === t;
  }, J.isForwardRef = function(p) {
    return w(p) === m;
  }, J.isFragment = function(p) {
    return w(p) === a;
  }, J.isLazy = function(p) {
    return w(p) === E;
  }, J.isMemo = function(p) {
    return w(p) === x;
  }, J.isPortal = function(p) {
    return w(p) === n;
  }, J.isProfiler = function(p) {
    return w(p) === r;
  }, J.isStrictMode = function(p) {
    return w(p) === s;
  }, J.isSuspense = function(p) {
    return w(p) === u;
  }, J.isValidElementType = function(p) {
    return typeof p == "string" || typeof p == "function" || p === a || p === l || p === r || p === s || p === u || p === y || typeof p == "object" && p !== null && (p.$$typeof === E || p.$$typeof === x || p.$$typeof === d || p.$$typeof === c || p.$$typeof === m || p.$$typeof === f || p.$$typeof === g || p.$$typeof === h || p.$$typeof === v);
  }, J.typeOf = w, J;
}
var Y = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ft;
function qa() {
  return Ft || (Ft = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, a = e ? Symbol.for("react.fragment") : 60107, s = e ? Symbol.for("react.strict_mode") : 60108, r = e ? Symbol.for("react.profiler") : 60114, d = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, o = e ? Symbol.for("react.async_mode") : 60111, l = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, u = e ? Symbol.for("react.suspense") : 60113, y = e ? Symbol.for("react.suspense_list") : 60120, x = e ? Symbol.for("react.memo") : 60115, E = e ? Symbol.for("react.lazy") : 60116, v = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, g = e ? Symbol.for("react.responder") : 60118, h = e ? Symbol.for("react.scope") : 60119;
    function w(O) {
      return typeof O == "string" || typeof O == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      O === a || O === l || O === r || O === s || O === u || O === y || typeof O == "object" && O !== null && (O.$$typeof === E || O.$$typeof === x || O.$$typeof === d || O.$$typeof === c || O.$$typeof === m || O.$$typeof === f || O.$$typeof === g || O.$$typeof === h || O.$$typeof === v);
    }
    function b(O) {
      if (typeof O == "object" && O !== null) {
        var Ne = O.$$typeof;
        switch (Ne) {
          case t:
            var Ue = O.type;
            switch (Ue) {
              case o:
              case l:
              case a:
              case r:
              case s:
              case u:
                return Ue;
              default:
                var Pt = Ue && Ue.$$typeof;
                switch (Pt) {
                  case c:
                  case m:
                  case E:
                  case x:
                  case d:
                    return Pt;
                  default:
                    return Ne;
                }
            }
          case n:
            return Ne;
        }
      }
    }
    var p = o, N = l, S = c, R = d, T = t, V = m, U = a, H = E, Q = x, X = n, te = r, ee = s, de = u, Z = !1;
    function ve(O) {
      return Z || (Z = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), C(O) || b(O) === o;
    }
    function C(O) {
      return b(O) === l;
    }
    function j(O) {
      return b(O) === c;
    }
    function _(O) {
      return b(O) === d;
    }
    function D(O) {
      return typeof O == "object" && O !== null && O.$$typeof === t;
    }
    function P(O) {
      return b(O) === m;
    }
    function q(O) {
      return b(O) === a;
    }
    function M(O) {
      return b(O) === E;
    }
    function $(O) {
      return b(O) === x;
    }
    function W(O) {
      return b(O) === n;
    }
    function z(O) {
      return b(O) === r;
    }
    function K(O) {
      return b(O) === s;
    }
    function me(O) {
      return b(O) === u;
    }
    Y.AsyncMode = p, Y.ConcurrentMode = N, Y.ContextConsumer = S, Y.ContextProvider = R, Y.Element = T, Y.ForwardRef = V, Y.Fragment = U, Y.Lazy = H, Y.Memo = Q, Y.Portal = X, Y.Profiler = te, Y.StrictMode = ee, Y.Suspense = de, Y.isAsyncMode = ve, Y.isConcurrentMode = C, Y.isContextConsumer = j, Y.isContextProvider = _, Y.isElement = D, Y.isForwardRef = P, Y.isFragment = q, Y.isLazy = M, Y.isMemo = $, Y.isPortal = W, Y.isProfiler = z, Y.isStrictMode = K, Y.isSuspense = me, Y.isValidElementType = w, Y.typeOf = b;
  }()), Y;
}
var qt;
function vn() {
  return qt || (qt = 1, process.env.NODE_ENV === "production" ? Ke.exports = Fa() : Ke.exports = qa()), Ke.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var at, Ut;
function Ua() {
  if (Ut) return at;
  Ut = 1;
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
      for (var d = {}, c = 0; c < 10; c++)
        d["_" + String.fromCharCode(c)] = c;
      var o = Object.getOwnPropertyNames(d).map(function(m) {
        return d[m];
      });
      if (o.join("") !== "0123456789")
        return !1;
      var l = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(m) {
        l[m] = m;
      }), Object.keys(Object.assign({}, l)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return at = s() ? Object.assign : function(r, d) {
    for (var c, o = a(r), l, m = 1; m < arguments.length; m++) {
      c = Object(arguments[m]);
      for (var u in c)
        t.call(c, u) && (o[u] = c[u]);
      if (e) {
        l = e(c);
        for (var y = 0; y < l.length; y++)
          n.call(c, l[y]) && (o[l[y]] = c[l[y]]);
      }
    }
    return o;
  }, at;
}
var rt, Wt;
function kt() {
  if (Wt) return rt;
  Wt = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return rt = e, rt;
}
var st, Kt;
function gn() {
  return Kt || (Kt = 1, st = Function.call.bind(Object.prototype.hasOwnProperty)), st;
}
var it, Vt;
function Wa() {
  if (Vt) return it;
  Vt = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = kt(), n = {}, a = gn();
    e = function(r) {
      var d = "Warning: " + r;
      typeof console < "u" && console.error(d);
      try {
        throw new Error(d);
      } catch {
      }
    };
  }
  function s(r, d, c, o, l) {
    if (process.env.NODE_ENV !== "production") {
      for (var m in r)
        if (a(r, m)) {
          var u;
          try {
            if (typeof r[m] != "function") {
              var y = Error(
                (o || "React class") + ": " + c + " type `" + m + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[m] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw y.name = "Invariant Violation", y;
            }
            u = r[m](d, m, o, c, null, t);
          } catch (E) {
            u = E;
          }
          if (u && !(u instanceof Error) && e(
            (o || "React class") + ": type specification of " + c + " `" + m + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof u + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), u instanceof Error && !(u.message in n)) {
            n[u.message] = !0;
            var x = l ? l() : "";
            e(
              "Failed " + c + " type: " + u.message + (x ?? "")
            );
          }
        }
    }
  }
  return s.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, it = s, it;
}
var ot, Jt;
function Ka() {
  if (Jt) return ot;
  Jt = 1;
  var e = vn(), t = Ua(), n = kt(), a = gn(), s = Wa(), r = function() {
  };
  process.env.NODE_ENV !== "production" && (r = function(c) {
    var o = "Warning: " + c;
    typeof console < "u" && console.error(o);
    try {
      throw new Error(o);
    } catch {
    }
  });
  function d() {
    return null;
  }
  return ot = function(c, o) {
    var l = typeof Symbol == "function" && Symbol.iterator, m = "@@iterator";
    function u(C) {
      var j = C && (l && C[l] || C[m]);
      if (typeof j == "function")
        return j;
    }
    var y = "<<anonymous>>", x = {
      array: g("array"),
      bigint: g("bigint"),
      bool: g("boolean"),
      func: g("function"),
      number: g("number"),
      object: g("object"),
      string: g("string"),
      symbol: g("symbol"),
      any: h(),
      arrayOf: w,
      element: b(),
      elementType: p(),
      instanceOf: N,
      node: V(),
      objectOf: R,
      oneOf: S,
      oneOfType: T,
      shape: H,
      exact: Q
    };
    function E(C, j) {
      return C === j ? C !== 0 || 1 / C === 1 / j : C !== C && j !== j;
    }
    function v(C, j) {
      this.message = C, this.data = j && typeof j == "object" ? j : {}, this.stack = "";
    }
    v.prototype = Error.prototype;
    function f(C) {
      if (process.env.NODE_ENV !== "production")
        var j = {}, _ = 0;
      function D(q, M, $, W, z, K, me) {
        if (W = W || y, K = K || $, me !== n) {
          if (o) {
            var O = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw O.name = "Invariant Violation", O;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Ne = W + ":" + $;
            !j[Ne] && // Avoid spamming the console because they are often not actionable except for lib authors
            _ < 3 && (r(
              "You are manually calling a React.PropTypes validation function for the `" + K + "` prop on `" + W + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), j[Ne] = !0, _++);
          }
        }
        return M[$] == null ? q ? M[$] === null ? new v("The " + z + " `" + K + "` is marked as required " + ("in `" + W + "`, but its value is `null`.")) : new v("The " + z + " `" + K + "` is marked as required in " + ("`" + W + "`, but its value is `undefined`.")) : null : C(M, $, W, z, K);
      }
      var P = D.bind(null, !1);
      return P.isRequired = D.bind(null, !0), P;
    }
    function g(C) {
      function j(_, D, P, q, M, $) {
        var W = _[D], z = ee(W);
        if (z !== C) {
          var K = de(W);
          return new v(
            "Invalid " + q + " `" + M + "` of type " + ("`" + K + "` supplied to `" + P + "`, expected ") + ("`" + C + "`."),
            { expectedType: C }
          );
        }
        return null;
      }
      return f(j);
    }
    function h() {
      return f(d);
    }
    function w(C) {
      function j(_, D, P, q, M) {
        if (typeof C != "function")
          return new v("Property `" + M + "` of component `" + P + "` has invalid PropType notation inside arrayOf.");
        var $ = _[D];
        if (!Array.isArray($)) {
          var W = ee($);
          return new v("Invalid " + q + " `" + M + "` of type " + ("`" + W + "` supplied to `" + P + "`, expected an array."));
        }
        for (var z = 0; z < $.length; z++) {
          var K = C($, z, P, q, M + "[" + z + "]", n);
          if (K instanceof Error)
            return K;
        }
        return null;
      }
      return f(j);
    }
    function b() {
      function C(j, _, D, P, q) {
        var M = j[_];
        if (!c(M)) {
          var $ = ee(M);
          return new v("Invalid " + P + " `" + q + "` of type " + ("`" + $ + "` supplied to `" + D + "`, expected a single ReactElement."));
        }
        return null;
      }
      return f(C);
    }
    function p() {
      function C(j, _, D, P, q) {
        var M = j[_];
        if (!e.isValidElementType(M)) {
          var $ = ee(M);
          return new v("Invalid " + P + " `" + q + "` of type " + ("`" + $ + "` supplied to `" + D + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return f(C);
    }
    function N(C) {
      function j(_, D, P, q, M) {
        if (!(_[D] instanceof C)) {
          var $ = C.name || y, W = ve(_[D]);
          return new v("Invalid " + q + " `" + M + "` of type " + ("`" + W + "` supplied to `" + P + "`, expected ") + ("instance of `" + $ + "`."));
        }
        return null;
      }
      return f(j);
    }
    function S(C) {
      if (!Array.isArray(C))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? r(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : r("Invalid argument supplied to oneOf, expected an array.")), d;
      function j(_, D, P, q, M) {
        for (var $ = _[D], W = 0; W < C.length; W++)
          if (E($, C[W]))
            return null;
        var z = JSON.stringify(C, function(me, O) {
          var Ne = de(O);
          return Ne === "symbol" ? String(O) : O;
        });
        return new v("Invalid " + q + " `" + M + "` of value `" + String($) + "` " + ("supplied to `" + P + "`, expected one of " + z + "."));
      }
      return f(j);
    }
    function R(C) {
      function j(_, D, P, q, M) {
        if (typeof C != "function")
          return new v("Property `" + M + "` of component `" + P + "` has invalid PropType notation inside objectOf.");
        var $ = _[D], W = ee($);
        if (W !== "object")
          return new v("Invalid " + q + " `" + M + "` of type " + ("`" + W + "` supplied to `" + P + "`, expected an object."));
        for (var z in $)
          if (a($, z)) {
            var K = C($, z, P, q, M + "." + z, n);
            if (K instanceof Error)
              return K;
          }
        return null;
      }
      return f(j);
    }
    function T(C) {
      if (!Array.isArray(C))
        return process.env.NODE_ENV !== "production" && r("Invalid argument supplied to oneOfType, expected an instance of array."), d;
      for (var j = 0; j < C.length; j++) {
        var _ = C[j];
        if (typeof _ != "function")
          return r(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Z(_) + " at index " + j + "."
          ), d;
      }
      function D(P, q, M, $, W) {
        for (var z = [], K = 0; K < C.length; K++) {
          var me = C[K], O = me(P, q, M, $, W, n);
          if (O == null)
            return null;
          O.data && a(O.data, "expectedType") && z.push(O.data.expectedType);
        }
        var Ne = z.length > 0 ? ", expected one of type [" + z.join(", ") + "]" : "";
        return new v("Invalid " + $ + " `" + W + "` supplied to " + ("`" + M + "`" + Ne + "."));
      }
      return f(D);
    }
    function V() {
      function C(j, _, D, P, q) {
        return X(j[_]) ? null : new v("Invalid " + P + " `" + q + "` supplied to " + ("`" + D + "`, expected a ReactNode."));
      }
      return f(C);
    }
    function U(C, j, _, D, P) {
      return new v(
        (C || "React class") + ": " + j + " type `" + _ + "." + D + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + P + "`."
      );
    }
    function H(C) {
      function j(_, D, P, q, M) {
        var $ = _[D], W = ee($);
        if (W !== "object")
          return new v("Invalid " + q + " `" + M + "` of type `" + W + "` " + ("supplied to `" + P + "`, expected `object`."));
        for (var z in C) {
          var K = C[z];
          if (typeof K != "function")
            return U(P, q, M, z, de(K));
          var me = K($, z, P, q, M + "." + z, n);
          if (me)
            return me;
        }
        return null;
      }
      return f(j);
    }
    function Q(C) {
      function j(_, D, P, q, M) {
        var $ = _[D], W = ee($);
        if (W !== "object")
          return new v("Invalid " + q + " `" + M + "` of type `" + W + "` " + ("supplied to `" + P + "`, expected `object`."));
        var z = t({}, _[D], C);
        for (var K in z) {
          var me = C[K];
          if (a(C, K) && typeof me != "function")
            return U(P, q, M, K, de(me));
          if (!me)
            return new v(
              "Invalid " + q + " `" + M + "` key `" + K + "` supplied to `" + P + "`.\nBad object: " + JSON.stringify(_[D], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(C), null, "  ")
            );
          var O = me($, K, P, q, M + "." + K, n);
          if (O)
            return O;
        }
        return null;
      }
      return f(j);
    }
    function X(C) {
      switch (typeof C) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !C;
        case "object":
          if (Array.isArray(C))
            return C.every(X);
          if (C === null || c(C))
            return !0;
          var j = u(C);
          if (j) {
            var _ = j.call(C), D;
            if (j !== C.entries) {
              for (; !(D = _.next()).done; )
                if (!X(D.value))
                  return !1;
            } else
              for (; !(D = _.next()).done; ) {
                var P = D.value;
                if (P && !X(P[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function te(C, j) {
      return C === "symbol" ? !0 : j ? j["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && j instanceof Symbol : !1;
    }
    function ee(C) {
      var j = typeof C;
      return Array.isArray(C) ? "array" : C instanceof RegExp ? "object" : te(j, C) ? "symbol" : j;
    }
    function de(C) {
      if (typeof C > "u" || C === null)
        return "" + C;
      var j = ee(C);
      if (j === "object") {
        if (C instanceof Date)
          return "date";
        if (C instanceof RegExp)
          return "regexp";
      }
      return j;
    }
    function Z(C) {
      var j = de(C);
      switch (j) {
        case "array":
        case "object":
          return "an " + j;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + j;
        default:
          return j;
      }
    }
    function ve(C) {
      return !C.constructor || !C.constructor.name ? y : C.constructor.name;
    }
    return x.checkPropTypes = s, x.resetWarningCache = s.resetWarningCache, x.PropTypes = x, x;
  }, ot;
}
var ct, Yt;
function Va() {
  if (Yt) return ct;
  Yt = 1;
  var e = kt();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, ct = function() {
    function a(d, c, o, l, m, u) {
      if (u !== e) {
        var y = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw y.name = "Invariant Violation", y;
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
  }, ct;
}
if (process.env.NODE_ENV !== "production") {
  var Ja = vn(), Ya = !0;
  pt.exports = Ka()(Ja.isElement, Ya);
} else
  pt.exports = Va()();
var za = pt.exports;
const G = /* @__PURE__ */ $a(za);
function zt(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), n.push.apply(n, a);
  }
  return n;
}
function Ht(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zt(Object(n), !0).forEach(function(a) {
      bn(e, a, n[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : zt(Object(n)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
    });
  }
  return e;
}
function Ye(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Ye = function(t) {
    return typeof t;
  } : Ye = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ye(e);
}
function bn(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Ha(e, t) {
  if (e == null) return {};
  var n = {}, a = Object.keys(e), s, r;
  for (r = 0; r < a.length; r++)
    s = a[r], !(t.indexOf(s) >= 0) && (n[s] = e[s]);
  return n;
}
function Ga(e, t) {
  if (e == null) return {};
  var n = Ha(e, t), a, s;
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    for (s = 0; s < r.length; s++)
      a = r[s], !(t.indexOf(a) >= 0) && Object.prototype.propertyIsEnumerable.call(e, a) && (n[a] = e[a]);
  }
  return n;
}
function Qa(e, t) {
  return Xa(e) || Za(e, t) || er(e, t) || tr();
}
function Xa(e) {
  if (Array.isArray(e)) return e;
}
function Za(e, t) {
  var n = e && (typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"]);
  if (n != null) {
    var a = [], s = !0, r = !1, d, c;
    try {
      for (n = n.call(e); !(s = (d = n.next()).done) && (a.push(d.value), !(t && a.length === t)); s = !0)
        ;
    } catch (o) {
      r = !0, c = o;
    } finally {
      try {
        !s && n.return != null && n.return();
      } finally {
        if (r) throw c;
      }
    }
    return a;
  }
}
function er(e, t) {
  if (e) {
    if (typeof e == "string") return Gt(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Gt(e, t);
  }
}
function Gt(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
  return a;
}
function tr() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var ue = function(t, n, a) {
  var s = !!a, r = ie.useRef(a);
  ie.useEffect(function() {
    r.current = a;
  }, [a]), ie.useEffect(function() {
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
}, nr = function(t) {
  var n = ie.useRef(t);
  return ie.useEffect(function() {
    n.current = t;
  }, [t]), n.current;
}, Ge = function(t) {
  return t !== null && Ye(t) === "object";
}, Qt = "[object Object]", ar = function e(t, n) {
  if (!Ge(t) || !Ge(n))
    return t === n;
  var a = Array.isArray(t), s = Array.isArray(n);
  if (a !== s) return !1;
  var r = Object.prototype.toString.call(t) === Qt, d = Object.prototype.toString.call(n) === Qt;
  if (r !== d) return !1;
  if (!r && !a) return t === n;
  var c = Object.keys(t), o = Object.keys(n);
  if (c.length !== o.length) return !1;
  for (var l = {}, m = 0; m < c.length; m += 1)
    l[c[m]] = !0;
  for (var u = 0; u < o.length; u += 1)
    l[o[u]] = !0;
  var y = Object.keys(l);
  if (y.length !== c.length)
    return !1;
  var x = t, E = n, v = function(g) {
    return e(x[g], E[g]);
  };
  return y.every(v);
}, rr = function(t, n, a) {
  return Ge(t) ? Object.keys(t).reduce(function(s, r) {
    var d = !Ge(n) || !ar(t[r], n[r]);
    return a.includes(r) ? (d && console.warn("Unsupported prop change: options.".concat(r, " is not a mutable property.")), s) : d ? Ht(Ht({}, s || {}), {}, bn({}, r, t[r])) : s;
  }, null) : null;
}, jt = /* @__PURE__ */ ie.createContext(null);
jt.displayName = "ElementsContext";
var Nn = function(t, n) {
  if (!t)
    throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(n, " in an <Elements> provider."));
  return t;
};
G.any, G.object;
var sr = function(t) {
  var n = ie.useContext(jt);
  return Nn(n, t);
}, ir = function() {
  var t = sr("calls useElements()"), n = t.elements;
  return n;
};
G.func.isRequired;
var wn = /* @__PURE__ */ ie.createContext(null);
wn.displayName = "CheckoutContext";
G.any, G.shape({
  clientSecret: G.oneOfType([G.string, G.instanceOf(Promise)]).isRequired,
  elementsOptions: G.object
}).isRequired;
var yt = function(t) {
  var n = ie.useContext(wn), a = ie.useContext(jt);
  if (n) {
    if (a)
      throw new Error("You cannot wrap the part of your app that ".concat(t, " in both <CheckoutProvider> and <Elements> providers."));
    return n;
  } else
    return Nn(a, t);
}, or = ["mode"], cr = function(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}, pe = function(t, n) {
  var a = "".concat(cr(t), "Element"), s = function(o) {
    var l = o.id, m = o.className, u = o.options, y = u === void 0 ? {} : u, x = o.onBlur, E = o.onFocus, v = o.onReady, f = o.onChange, g = o.onEscape, h = o.onClick, w = o.onLoadError, b = o.onLoaderStart, p = o.onNetworksChange, N = o.onConfirm, S = o.onCancel, R = o.onShippingAddressChange, T = o.onShippingRateChange, V = o.onSavedPaymentMethodRemove, U = o.onSavedPaymentMethodUpdate, H = yt("mounts <".concat(a, ">")), Q = "elements" in H ? H.elements : null, X = "checkoutState" in H ? H.checkoutState : null, te = (X == null ? void 0 : X.type) === "success" || (X == null ? void 0 : X.type) === "loading" ? X.sdk : null, ee = ie.useState(null), de = Qa(ee, 2), Z = de[0], ve = de[1], C = ie.useRef(null), j = ie.useRef(null);
    ue(Z, "blur", x), ue(Z, "focus", E), ue(Z, "escape", g), ue(Z, "click", h), ue(Z, "loaderror", w), ue(Z, "loaderstart", b), ue(Z, "networkschange", p), ue(Z, "confirm", N), ue(Z, "cancel", S), ue(Z, "shippingaddresschange", R), ue(Z, "shippingratechange", T), ue(Z, "savedpaymentmethodremove", V), ue(Z, "savedpaymentmethodupdate", U), ue(Z, "change", f);
    var _;
    v && (t === "expressCheckout" ? _ = v : _ = function() {
      v(Z);
    }), ue(Z, "ready", _), ie.useLayoutEffect(function() {
      if (C.current === null && j.current !== null && (Q || te)) {
        var P = null;
        if (te)
          switch (t) {
            case "paymentForm":
              P = te.createPaymentFormElement();
              break;
            case "payment":
              P = te.createPaymentElement(y);
              break;
            case "address":
              if ("mode" in y) {
                var q = y.mode, M = Ga(y, or);
                if (q === "shipping")
                  P = te.createShippingAddressElement(M);
                else if (q === "billing")
                  P = te.createBillingAddressElement(M);
                else
                  throw new Error("Invalid options.mode. mode must be 'billing' or 'shipping'.");
              } else
                throw new Error("You must supply options.mode. mode must be 'billing' or 'shipping'.");
              break;
            case "expressCheckout":
              P = te.createExpressCheckoutElement(y);
              break;
            case "currencySelector":
              P = te.createCurrencySelectorElement();
              break;
            case "taxId":
              P = te.createTaxIdElement(y);
              break;
            default:
              throw new Error("Invalid Element type ".concat(a, ". You must use either the <PaymentElement />, <AddressElement options={{mode: 'shipping'}} />, <AddressElement options={{mode: 'billing'}} />, or <ExpressCheckoutElement />."));
          }
        else Q && (P = Q.create(t, y));
        C.current = P, ve(P), P && P.mount(j.current);
      }
    }, [Q, te, y]);
    var D = nr(y);
    return ie.useEffect(function() {
      if (C.current) {
        var P = rr(y, D, ["paymentRequest"]);
        P && "update" in C.current && C.current.update(P);
      }
    }, [y, D]), ie.useLayoutEffect(function() {
      return function() {
        if (C.current && typeof C.current.destroy == "function")
          try {
            C.current.destroy(), C.current = null;
          } catch {
          }
      };
    }, []), /* @__PURE__ */ ie.createElement("div", {
      id: l,
      className: m,
      ref: j
    });
  }, r = function(o) {
    yt("mounts <".concat(a, ">"));
    var l = o.id, m = o.className;
    return /* @__PURE__ */ ie.createElement("div", {
      id: l,
      className: m
    });
  }, d = n ? r : s;
  return d.propTypes = {
    id: G.string,
    className: G.string,
    onChange: G.func,
    onBlur: G.func,
    onFocus: G.func,
    onReady: G.func,
    onEscape: G.func,
    onClick: G.func,
    onLoadError: G.func,
    onLoaderStart: G.func,
    onNetworksChange: G.func,
    onConfirm: G.func,
    onCancel: G.func,
    onShippingAddressChange: G.func,
    onShippingRateChange: G.func,
    onSavedPaymentMethodRemove: G.func,
    onSavedPaymentMethodUpdate: G.func,
    options: G.object
  }, d.displayName = a, d.__elementType = t, d;
}, ye = typeof window > "u", lr = /* @__PURE__ */ ie.createContext(null);
lr.displayName = "EmbeddedCheckoutProviderContext";
var dr = function() {
  var t = yt("calls useStripe()"), n = t.stripe;
  return n;
};
pe("auBankAccount", ye);
pe("card", ye);
var Xt = pe("cardNumber", ye), ur = pe("cardExpiry", ye), fr = pe("cardCvc", ye);
pe("iban", ye);
pe("payment", ye);
pe("expressCheckout", ye);
pe("paymentRequestButton", ye);
pe("linkAuthentication", ye);
pe("address", ye);
pe("shippingAddress", ye);
pe("paymentMethodMessaging", ye);
pe("taxId", ye);
class De {
  constructor(t = {}) {
    const {
      id: n,
      name: a = "Payment",
      className: s = "",
      brandIcon: r,
      cardIcon: d,
      expiryIcon: c,
      cvcIcon: o,
      submit: l,
      disclaimer: m
    } = t || {};
    this.id = n ?? B("alloyPay"), this.name = a, this.className = s || "col-12", this.brandIcon = r instanceof F ? r : new F(
      r || {
        iconClass: "fa-brands fa-cc-stripe fa-2xl"
      }
    ), this.cardIcon = d instanceof F ? d : new F(
      d || {
        iconClass: "fa-solid fa-credit-card"
      }
    ), this.expiryIcon = c instanceof F ? c : new F(
      c || {
        iconClass: "fa-solid fa-calendar-days"
      }
    ), this.cvcIcon = o instanceof F ? o : new F(
      o || {
        iconClass: "fa-solid fa-lock"
      }
    ), this.submit = l instanceof Te ? l : new Te(
      l || {
        name: "Pay now",
        icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
        className: "btn btn-primary w-100 mt-3",
        disabled: !1,
        loading: !1,
        ariaLabel: "Pay now",
        title: "Pay now"
      }
    ), this.disclaimer = typeof m == "string" && m.trim() ? m : "*AlloyMobile do not store your credit card information.";
  }
}
const lt = {
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
function xn({ pay: e, output: t }) {
  if (!e || !(e instanceof De))
    throw new Error("AlloyPay requires `pay` (PayObject instance).");
  const n = dr(), a = ir(), [s, r] = L(!1), [d, c] = L(""), o = (u) => {
    typeof t == "function" && t(u);
  };
  async function l(u) {
    var x, E;
    if (!n || !a) {
      const v = new k({
        id: e.id,
        type: "pay",
        action: "error",
        error: !0,
        data: {
          message: "Payment system is not ready. Please try again."
        }
      });
      o(v), c("Payment system is not ready. Please try again.");
      return;
    }
    r(!0), c("");
    const y = a.getElement(Xt);
    if (!y) {
      const v = new k({
        id: e.id,
        type: "pay",
        action: "error",
        error: !0,
        data: {
          message: "Card number element is missing."
        }
      });
      o(v), c("Card number element is missing."), r(!1);
      return;
    }
    try {
      const { error: v, paymentMethod: f } = await n.createPaymentMethod({
        type: "card",
        card: y
      });
      if (v || !f) {
        const w = new k({
          id: e.id,
          type: "pay",
          action: "error",
          error: !0,
          data: {
            message: (v == null ? void 0 : v.message) || "Payment failed.",
            code: v == null ? void 0 : v.code
          }
        });
        o(w), c((v == null ? void 0 : v.message) || "Payment failed."), r(!1);
        return;
      }
      const g = ((x = u == null ? void 0 : u.data) == null ? void 0 : x.name) || ((E = e.submit) == null ? void 0 : E.name) || "submit", h = new k({
        id: e.id,
        type: "pay",
        action: g,
        error: !1,
        data: {
          paymentMethodId: f.id,
          paymentMethod: f
        }
      });
      o(h), r(!1);
    } catch (v) {
      const f = v && typeof v.message == "string" ? v.message : "Unexpected error during payment.", g = new k({
        id: e.id,
        type: "pay",
        action: "error",
        error: !0,
        data: {
          message: f
        }
      });
      o(g), c(f), r(!1);
    }
  }
  const m = e.submit;
  return m.loading = s, m.disabled = s || !n || !a, /* @__PURE__ */ A("div", { id: e.id, className: e.className, children: [
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
    /* @__PURE__ */ i("h4", { className: "text-center", children: /* @__PURE__ */ i(oe, { icon: e.brandIcon }) }),
    /* @__PURE__ */ A("div", { className: "row", children: [
      /* @__PURE__ */ i("div", { className: "col-sm-12", children: /* @__PURE__ */ A("div", { className: "input-group py-2", children: [
        /* @__PURE__ */ i("span", { className: "input-group-text", children: /* @__PURE__ */ i(oe, { icon: e.cardIcon }) }),
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
            Xt,
            {
              id: `${e.id}-cardNumber`,
              options: lt
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ i("div", { className: "col-lg-6", children: /* @__PURE__ */ A("div", { className: "input-group py-2", children: [
        /* @__PURE__ */ i("span", { className: "input-group-text", children: /* @__PURE__ */ i(oe, { icon: e.expiryIcon }) }),
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
            ur,
            {
              id: `${e.id}-cardExpiry`,
              options: lt
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ i("div", { className: "col-lg-6", children: /* @__PURE__ */ A("div", { className: "input-group py-2", children: [
        /* @__PURE__ */ i("span", { className: "input-group-text", children: /* @__PURE__ */ i(oe, { icon: e.cvcIcon }) }),
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
            fr,
            {
              id: `${e.id}-cardCvc`,
              options: lt
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ i(
      nn,
      {
        buttonSubmit: m,
        output: l
      }
    ),
    d && /* @__PURE__ */ i("div", { className: "text-danger mt-2 small", children: d }),
    /* @__PURE__ */ i("p", { className: "m-0 p-0 small text-muted", children: e.disclaimer })
  ] });
}
class mr {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "card border m-2 shadow",
      header: s,
      title: r = "",
      description: d = "",
      src: c,
      poster: o = "",
      controls: l = !0,
      autoPlay: m = !1,
      loop: u = !1,
      muted: y = !1,
      playsInline: x = !0,
      footer: E,
      type: v = "AlloyButtonBar",
      action: f,
      meta: g = {}
    } = t;
    if (!c || typeof c != "string")
      throw new Error("CardVideoObject requires `src` (video URL).");
    this.id = n ?? B("card-video"), this.className = a, this.header = s instanceof re ? s : s ? new re(s) : null, this.title = r, this.description = d, this.src = c, this.poster = o, this.controls = !!l, this.autoPlay = !!m, this.loop = !!u, this.muted = !!y, this.playsInline = !!x, this.footer = E instanceof re ? E : E ? new re(E) : null, this.type = v === "AlloyLinkBar" ? "AlloyLinkBar" : "AlloyButtonBar", this.type === "AlloyLinkBar" ? this.action = f instanceof be ? f : new be(
      f || {
        id: B("video-link-bar"),
        className: "nav gap-2",
        barName: { show: !1 },
        type: "AlloyLink",
        links: []
      }
    ) : this.action = f instanceof xe ? f : new xe(
      f || {
        id: B("video-button-bar"),
        className: "btn-group btn-group-sm",
        barName: { show: !1 },
        type: "AlloyButton",
        buttons: []
      }
    ), this.meta = g && typeof g == "object" ? g : {};
  }
}
function Br({ cardVideo: e, output: t }) {
  if (!e || !(e instanceof mr))
    throw new Error(
      "AlloyCardVideo requires `cardVideo` (CardVideoObject instance)."
    );
  const n = (o) => {
    typeof t == "function" && t(o);
  };
  function a(o) {
    if (!o || typeof o != "object") return "";
    const l = typeof o.name == "string" ? o.name.trim() : "";
    if (l) return l;
    const m = typeof o.ariaLabel == "string" ? o.ariaLabel.trim() : "";
    if (m) return m;
    const u = typeof o.title == "string" ? o.title.trim() : "";
    if (u) return u;
    const y = typeof o.id == "string" ? o.id.trim() : "";
    return y || "";
  }
  function s() {
    return (o, l) => {
      const m = a(o), u = {
        src: e.src,
        title: e.title,
        description: e.description,
        ...e.meta || {}
      }, y = new k({
        id: e.id,
        type: "card-video",
        action: m,
        error: !1,
        errorMessage: [],
        data: u
      });
      n(y);
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
  ] }), c = e.footer ? /* @__PURE__ */ A(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className || "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      "aria-label": e.footer.name,
      children: [
        /* @__PURE__ */ i("div", { className: "me-auto small text-muted", children: e.footer.name }),
        /* @__PURE__ */ i("div", { role: "group", children: e.type === "AlloyLinkBar" ? /* @__PURE__ */ i(
          Me,
          {
            linkBar: e.action,
            output: s()
          }
        ) : /* @__PURE__ */ i(
          Xe,
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
    c
  ] });
}
class hr {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "card h-100 rounded-3",
      link: s = "",
      category: r,
      title: d,
      subtitle: c,
      description: o,
      badge: l,
      media: m,
      button: u,
      data: y,
      ...x
    } = t || {};
    this.id = n ?? B("card-carousel"), this.className = a, this.link = typeof s == "string" ? s : "", this.category = r instanceof re ? r : new re(
      r || {
        name: "",
        className: "card-title mb-1"
      }
    ), this.title = d instanceof re ? d : new re(
      d || {
        name: "",
        className: "card-title mb-1"
      }
    ), this.subtitle = c instanceof re ? c : new re(
      c || {
        name: "",
        className: "small text-secondary"
      }
    ), this.description = o instanceof re ? o : new re(
      o || {
        name: "",
        className: "mt-3 text-secondary small"
      }
    ), this.badge = l instanceof re ? l : new re(
      l || {
        name: "",
        className: "badge text-bg-primary-subtle text-primary"
      }
    );
    const E = m && Array.isArray(m.images) ? m.images : [];
    this.media = {
      images: E
    }, this.button = u instanceof he ? u : u ? new he(u) : null, this.data = y || x.data || {};
  }
}
function Mr({ cardCarousel: e, output: t }) {
  var x, E, v, f, g;
  if (!e || !(e instanceof hr))
    throw new Error(
      "AlloyCardCarousel requires `cardCarousel` (CardCarouselObject instance)."
    );
  const n = Array.isArray((x = e.media) == null ? void 0 : x.images) ? e.media.images : [], a = n.length > 0, s = `${e.id}-carousel`;
  function r(h) {
    if (!h || typeof h != "object") return "";
    const w = typeof h.name == "string" ? h.name.trim() : "";
    if (w) return w;
    const b = typeof h.ariaLabel == "string" ? h.ariaLabel.trim() : "";
    if (b) return b;
    const p = typeof h.title == "string" ? h.title.trim() : "";
    if (p) return p;
    const N = typeof h.id == "string" ? h.id.trim() : "";
    return N || "";
  }
  function d(h) {
    if (typeof t != "function") return;
    const w = h instanceof k ? h.toJSON() : h || {}, b = w.data && w.data.button ? w.data.button : e.button, p = r(b), N = k.ok({
      id: e.id,
      type: "card-carousel",
      action: p,
      data: {
        ...e.data || {}
      }
    });
    t(N);
  }
  const c = /* @__PURE__ */ A("div", { className: "d-flex align-items-center gap-3", children: [
    /* @__PURE__ */ i("div", { className: "category-icon", children: /* @__PURE__ */ i("i", { className: "fa-solid fa-dumpster" }) }),
    /* @__PURE__ */ A("div", { children: [
      ((E = e.category) == null ? void 0 : E.name) && /* @__PURE__ */ i("h5", { className: e.category.className || "card-title mb-1", children: e.category.name }),
      ((v = e.subtitle) == null ? void 0 : v.name) && /* @__PURE__ */ i(
        "div",
        {
          className: e.subtitle.className || "small text-secondary",
          children: e.subtitle.name
        }
      )
    ] })
  ] }), o = a ? /* @__PURE__ */ A("div", { id: s, className: "carousel slide mt-3", children: [
    /* @__PURE__ */ i("div", { className: "carousel-inner rounded-3 overflow-hidden", children: n.map((h, w) => {
      var b;
      return /* @__PURE__ */ i(
        "div",
        {
          className: `carousel-item ${w === 0 ? "active" : ""}`,
          children: /* @__PURE__ */ i(
            "img",
            {
              src: h.url,
              className: "d-block w-100",
              alt: h.altText || ((b = e.title) == null ? void 0 : b.name) || "",
              style: { objectFit: "cover", maxHeight: "220px" }
            }
          )
        },
        h.url || w
      );
    }) }),
    n.length > 1 && /* @__PURE__ */ A(Be, { children: [
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
  ] }) : null, l = (f = e.description) != null && f.name ? /* @__PURE__ */ i(
    "p",
    {
      className: e.description.className || "mt-3 text-secondary small",
      children: e.description.name
    }
  ) : null, m = /* @__PURE__ */ A("div", { className: "d-flex justify-content-between align-items-center mt-2", children: [
    /* @__PURE__ */ i(
      "span",
      {
        className: e.badge.className || "badge text-bg-primary-subtle text-primary",
        children: e.badge.name
      }
    ),
    e.button && /* @__PURE__ */ i(
      Qe,
      {
        button: e.button,
        output: d
      }
    )
  ] }), u = /* @__PURE__ */ A(Be, { children: [
    c,
    o,
    l,
    m
  ] }), y = e.link ? /* @__PURE__ */ i(
    ke,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (g = e.title) == null ? void 0 : g.name,
      children: u
    }
  ) : u;
  return /* @__PURE__ */ i("div", { id: e.id, className: e.className, children: /* @__PURE__ */ i("div", { className: "card-body", children: y }) });
}
class pr {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "container-fluid",
      modal: s,
      search: r,
      add: d,
      table: c,
      ...o
    } = t || {};
    this.id = n ?? B("crud-table"), this.className = a, this.modal = s instanceof we ? s : new we(s || {}), this.search = r instanceof ne ? r : r ? new ne(r) : null, this.add = d instanceof le ? d : d ? new le(d) : null, this.table = c instanceof _e ? c : new _e(c || {}), Object.assign(this, o);
  }
}
function yr(e) {
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
function _r({ crudTable: e, output: t }) {
  var v;
  if (!e || !(e instanceof pr))
    throw new Error(
      "AlloyCrudTable requires `crudTable` (CrudTableObject instance)."
    );
  const n = (f) => {
    typeof t == "function" && t(f);
  }, a = se(null), s = () => {
    var f;
    if (a.current && typeof a.current.click == "function") {
      a.current.click();
      return;
    }
    (f = e.modal) != null && f.id && yr(e.modal.id);
  }, [r, d] = L(() => {
    var f;
    return {
      mode: "create",
      // "create" | "edit" | "delete"
      data: ((f = e.modal) == null ? void 0 : f.data) || {},
      disabled: !1,
      version: 0
      // bump this to force rebuild of ModalObject
    };
  }), [c, o] = L(!1);
  ge(() => {
    d((f) => {
      var g;
      return {
        mode: "create",
        data: ((g = e.modal) == null ? void 0 : g.data) || {},
        disabled: !1,
        version: f.version + 1
      };
    }), o(!1);
  }, [e]), ge(() => {
    var f;
    c && (f = e.modal) != null && f.id && (s(), o(!1));
  }, [r.version, c, (v = e.modal) == null ? void 0 : v.id]);
  const l = fe(() => {
    const f = e.modal;
    let g;
    r.mode === "edit" ? g = "Edit" : r.mode === "delete" ? g = "Delete" : g = f.action || "Create";
    const h = r.data || {}, w = Array.isArray(f.fields) ? f.fields.map((b) => {
      const p = b instanceof ne ? { ...b } : { ...b }, N = p.name;
      return N && Object.prototype.hasOwnProperty.call(h, N) && (p.value = h[N]), r.disabled && (p.disabled = !0, p.readOnly = !0), p;
    }) : [];
    return new we({
      ...f,
      action: g,
      fields: w,
      data: r.data
    });
  }, [
    e.modal,
    r.mode,
    r.data,
    r.disabled,
    r.version
    // ensure fresh ModalObject for every Add/Edit/Delete
  ]);
  function m(f = {}) {
    const g = {}, h = e.modal || {}, w = h.data || {};
    return (Array.isArray(h.fields) ? h.fields : []).forEach((p) => {
      const N = p == null ? void 0 : p.name;
      N && (Object.prototype.hasOwnProperty.call(f, N) ? g[N] = f[N] : Object.prototype.hasOwnProperty.call(w, N) ? g[N] = w[N] : g[N] = "");
    }), g;
  }
  const u = (f) => {
    var p, N, S;
    const g = ((p = f == null ? void 0 : f.data) == null ? void 0 : p.name) ?? ((N = e.search) == null ? void 0 : N.name) ?? "", h = (S = f == null ? void 0 : f.data) == null ? void 0 : S.value, w = g && typeof g == "string" ? { [g]: h } : {}, b = k.ok({
      id: e.id,
      type: "crud-table",
      action: "search",
      data: w
    });
    n(b);
  }, y = (f) => {
    var h, w;
    if (!f) return;
    if (f.type === "column" && f.action === "Sort") {
      const b = ((h = f.data) == null ? void 0 : h.name) ?? "", p = ((w = f.data) == null ? void 0 : w.dir) ?? "", N = b && typeof b == "string" ? { [b]: p } : {}, S = k.ok({
        id: e.id,
        type: "crud-table",
        action: "Sort",
        data: N
      });
      n(S);
      return;
    }
    if (f.type === "table") {
      const b = f.data || {}, p = f.action || "", N = (p || "").toLowerCase();
      if (N.includes("edit")) {
        const S = m(b);
        d((R) => ({
          mode: "edit",
          data: S,
          disabled: !1,
          version: R.version + 1
        })), o(!0);
        return;
      }
      if (N.includes("delete")) {
        const S = m(b);
        d((R) => ({
          mode: "delete",
          data: S,
          disabled: !0,
          version: R.version + 1
        })), o(!0);
        return;
      }
      if (p) {
        const S = k.ok({
          id: e.id,
          type: "crud-table",
          action: p,
          // any custom button name
          data: {
            ...b
          }
        });
        n(S);
      }
      return;
    }
    if (f.type === "row" && f.action === "navigate") {
      const { to: b, ...p } = f.data || {}, N = k.ok({
        id: e.id,
        type: "crud-table",
        action: "navigate",
        data: {
          to: b,
          ...p
        }
      });
      n(N);
      return;
    }
    const g = k.ok({
      id: e.id,
      type: "crud-table",
      action: f.action || "table",
      data: { ...f.data || {} }
    });
    n(g);
  }, x = (f) => {
    var b, p;
    if (!f || f.type !== "modal" || f.error)
      return;
    const g = f.data || {};
    let h;
    r.mode === "edit" ? h = "Edit" : r.mode === "delete" ? h = "Delete" : h = ((p = (b = e.modal) == null ? void 0 : b.submit) == null ? void 0 : p.name) || "Create";
    const w = k.ok({
      id: e.id,
      type: "crud-table",
      action: h,
      data: {
        ...g
        // key/value only (vendorName, email, city, status, ...)
      }
    });
    n(w);
  }, E = () => {
    var g;
    const f = ((g = e.modal) == null ? void 0 : g.data) || {};
    d((h) => ({
      mode: "create",
      data: { ...f },
      // fresh clone every time
      disabled: !1,
      version: h.version + 1
    })), o(!0);
  };
  return /* @__PURE__ */ A(Be, { children: [
    /* @__PURE__ */ A("div", { className: e.className, children: [
      /* @__PURE__ */ A("div", { className: "row input-group mt-2", children: [
        /* @__PURE__ */ i("div", { className: "col-sm-8", children: e.search && /* @__PURE__ */ i(
          Ee,
          {
            input: e.search,
            output: u
          }
        ) }),
        /* @__PURE__ */ i("div", { className: "col-sm-4 d-flex align-items-center justify-content-end", children: e.add && /* @__PURE__ */ i(
          Oe,
          {
            buttonIcon: e.add,
            output: E
          }
        ) })
      ] }),
      /* @__PURE__ */ i(
        yn,
        {
          tableAction: e.table,
          output: y
        }
      )
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
    /* @__PURE__ */ i(Ot, { modal: l, output: x })
  ] });
}
class vt {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "col-sm-6 col-md-4 col-lg-3 mb-3",
      type: s = "AlloyCardAction",
      modal: r,
      add: d,
      cards: c = [],
      ...o
    } = t || {};
    this.id = n ?? B("crud-card"), this.className = a, this.type = s || "AlloyCardAction", this.modal = r instanceof we ? r : new we(r || {}), this.add = d instanceof le ? d : d ? new le(d) : null, this.cards = c.map(
      (l) => l instanceof ht ? l : new ht(l || {})
    ), Object.assign(this, o);
  }
}
function vr(e) {
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
function gr({ crudCard: e, output: t }) {
  var v;
  if (!e || !(e instanceof vt))
    throw new Error(
      "AlloyCrudCard requires `crudCard` (CrudCardObject instance)."
    );
  const n = (f) => {
    typeof t == "function" && t(f);
  }, a = se(null), s = () => {
    var f;
    if (a.current && typeof a.current.click == "function") {
      a.current.click();
      return;
    }
    (f = e.modal) != null && f.id && vr(e.modal.id);
  }, [r, d] = L(() => {
    var f;
    return {
      mode: "create",
      // "create" | "edit" | "delete"
      data: ((f = e.modal) == null ? void 0 : f.data) || {},
      disabled: !1,
      version: 0
      // bump this to force rebuild of ModalObject
    };
  }), [c, o] = L(!1);
  ge(() => {
    d((f) => {
      var g;
      return {
        mode: "create",
        data: ((g = e.modal) == null ? void 0 : g.data) || {},
        disabled: !1,
        version: f.version + 1
      };
    }), o(!1);
  }, [e]), ge(() => {
    var f;
    c && (f = e.modal) != null && f.id && (s(), o(!1));
  }, [r.version, c, (v = e.modal) == null ? void 0 : v.id]);
  const l = fe(() => {
    const f = e.modal;
    let g;
    r.mode === "edit" ? g = "Edit" : r.mode === "delete" ? g = "Delete" : g = f.action || "Create";
    const h = r.data || {}, w = Array.isArray(f.fields) ? f.fields.map((b) => {
      const p = b ? { ...b } : {}, N = p.name;
      return N && Object.prototype.hasOwnProperty.call(h, N) && (p.value = h[N]), r.disabled && (p.disabled = !0, p.readOnly = !0), p;
    }) : [];
    return new we({
      ...f,
      action: g,
      fields: w,
      data: r.data
    });
  }, [
    e.modal,
    r.mode,
    r.data,
    r.disabled,
    r.version
  ]);
  function m(f = {}) {
    const g = {}, h = e.modal || {}, w = h.data || {};
    return (Array.isArray(h.fields) ? h.fields : []).forEach((p) => {
      const N = p == null ? void 0 : p.name;
      N && (Object.prototype.hasOwnProperty.call(f, N) ? g[N] = f[N] : Object.prototype.hasOwnProperty.call(w, N) ? g[N] = w[N] : g[N] = "");
    }), g;
  }
  const u = (f) => {
    if (!f || f.type !== "card-action")
      return;
    const g = f.data || {}, h = f.action || "", w = h.toLowerCase();
    if (w.includes("edit")) {
      const b = m(g);
      d((p) => ({
        mode: "edit",
        data: b,
        disabled: !1,
        version: p.version + 1
      })), o(!0);
      return;
    }
    if (w.includes("delete")) {
      const b = m(g);
      d((p) => ({
        mode: "delete",
        data: b,
        disabled: !0,
        version: p.version + 1
      })), o(!0);
      return;
    }
    if (h) {
      const b = k.ok({
        id: e.id,
        type: "crud-card",
        action: h,
        data: {
          ...g
        }
      });
      n(b);
    }
  }, y = (f) => {
    var b, p;
    if (!f || f.type !== "modal" || f.error)
      return;
    const g = f.data || {};
    let h;
    r.mode === "edit" ? h = "Edit" : r.mode === "delete" ? h = "Delete" : h = ((p = (b = e.modal) == null ? void 0 : b.submit) == null ? void 0 : p.name) || "Create";
    const w = k.ok({
      id: e.id,
      type: "crud-card",
      action: h,
      data: {
        ...g
      }
    });
    n(w);
  }, x = () => {
    var g;
    const f = ((g = e.modal) == null ? void 0 : g.data) || {};
    d((h) => ({
      mode: "create",
      data: { ...f },
      disabled: !1,
      version: h.version + 1
    })), o(!0);
  }, E = () => Array.isArray(e.cards) ? e.cards.map((f) => /* @__PURE__ */ i("div", { className: e.className, children: /* @__PURE__ */ i(Ta, { cardAction: f, output: u }) }, f.id)) : null;
  return /* @__PURE__ */ A(Be, { children: [
    /* @__PURE__ */ i("div", { className: "row mt-2", children: /* @__PURE__ */ i("div", { className: "col-sm-12 text-end", children: e.add && /* @__PURE__ */ i(
      Oe,
      {
        buttonIcon: e.add,
        output: x
      }
    ) }) }),
    /* @__PURE__ */ i("div", { id: e.id, className: "row", children: E() }),
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
    /* @__PURE__ */ i(Ot, { modal: l, output: y })
  ] });
}
class br {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "container-fluid",
      modal: s,
      search: r,
      send: d,
      table: c,
      ...o
    } = t || {};
    this.id = n ?? B("email"), this.className = a, this.modal = s instanceof we ? s : new we(s || {}), this.search = r instanceof ne ? r : r ? new ne(r) : null, this.send = d instanceof le ? d : d ? new le(d) : null, this.table = c instanceof _e ? c : new _e(c || {}), Object.assign(this, o);
  }
}
function Nr(e) {
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
function Dr({ email: e, output: t }) {
  var v;
  if (!e || !(e instanceof br))
    throw new Error("AlloyEmail requires `email` (EmailObject instance).");
  const n = (f) => {
    typeof t == "function" && t(f);
  }, a = se(null), s = () => {
    var f;
    if (a.current && typeof a.current.click == "function") {
      a.current.click();
      return;
    }
    (f = e.modal) != null && f.id && Nr(e.modal.id);
  }, [r, d] = L(() => {
    var f;
    return {
      mode: "compose",
      // "compose" | "open" | "reply" | "delete"
      data: ((f = e.modal) == null ? void 0 : f.data) || {},
      disabled: !1,
      version: 0
      // bump this to force rebuild / open timing
    };
  }), [c, o] = L(!1);
  ge(() => {
    d((f) => {
      var g;
      return {
        mode: "compose",
        data: ((g = e.modal) == null ? void 0 : g.data) || {},
        disabled: !1,
        version: f.version + 1
      };
    }), o(!1);
  }, [e]), ge(() => {
    var f;
    c && (f = e.modal) != null && f.id && (s(), o(!1));
  }, [r.version, c, (v = e.modal) == null ? void 0 : v.id]);
  const l = fe(() => {
    const f = e.modal;
    let g;
    r.mode === "open" ? g = "Open" : r.mode === "reply" ? g = "Reply" : r.mode === "delete" ? g = "Delete" : g = f.action || "Compose";
    const h = r.data || {}, w = Array.isArray(f.fields) ? f.fields.map((b) => {
      const p = b instanceof ne ? { ...b } : { ...b }, N = p.name;
      return N && Object.prototype.hasOwnProperty.call(h, N) && (p.value = h[N]), r.disabled && (p.disabled = !0, p.readOnly = !0), p;
    }) : [];
    return new we({
      ...f,
      action: g,
      fields: w,
      data: r.data
    });
  }, [e.modal, r.mode, r.data, r.disabled]);
  function m(f = {}) {
    const g = {}, h = e.modal || {}, w = h.data || {};
    return (Array.isArray(h.fields) ? h.fields : []).forEach((p) => {
      const N = p == null ? void 0 : p.name;
      N && (Object.prototype.hasOwnProperty.call(f, N) ? g[N] = f[N] : Object.prototype.hasOwnProperty.call(w, N) ? g[N] = w[N] : g[N] = "");
    }), g;
  }
  const u = (f) => {
    var p, N, S;
    const g = ((p = f == null ? void 0 : f.data) == null ? void 0 : p.name) ?? ((N = e.search) == null ? void 0 : N.name) ?? "", h = (S = f == null ? void 0 : f.data) == null ? void 0 : S.value, w = g && typeof g == "string" ? { [g]: h } : {}, b = k.ok({
      id: e.id,
      type: "email",
      action: "search",
      data: w
    });
    n(b);
  }, y = (f) => {
    var h, w;
    if (!f) return;
    if (f.type === "column" && f.action === "Sort") {
      const b = ((h = f.data) == null ? void 0 : h.name) ?? "", p = ((w = f.data) == null ? void 0 : w.dir) ?? "", N = b && typeof b == "string" ? { [b]: p } : {}, S = k.ok({
        id: e.id,
        type: "email",
        action: "Sort",
        data: N
      });
      n(S);
      return;
    }
    if (f.type === "row" && f.action === "navigate") {
      const { to: b, ...p } = f.data || {}, N = k.ok({
        id: e.id,
        type: "email",
        action: "navigate",
        data: {
          to: b,
          ...p
        }
      });
      n(N);
      return;
    }
    if (f.type === "table") {
      const b = f.data || {}, p = f.action || "", N = (p || "").toLowerCase();
      if (N.includes("open")) {
        const S = m(b);
        d((R) => ({
          mode: "open",
          data: S,
          disabled: !0,
          // read-only view
          version: R.version + 1
        })), o(!0);
        return;
      }
      if (N.includes("reply")) {
        const S = m(b);
        d((R) => ({
          mode: "reply",
          data: S,
          disabled: !1,
          version: R.version + 1
        })), o(!0);
        return;
      }
      if (N.includes("delete")) {
        const S = m(b);
        d((R) => ({
          mode: "delete",
          data: S,
          disabled: !0,
          // read-only confirm
          version: R.version + 1
        })), o(!0);
        return;
      }
      if (p) {
        const S = k.ok({
          id: e.id,
          type: "email",
          action: p,
          data: {
            ...b
          }
        });
        n(S);
      }
      return;
    }
    const g = k.ok({
      id: e.id,
      type: "email",
      action: f.action || "table",
      data: { ...f.data || {} }
    });
    n(g);
  }, x = (f) => {
    var b, p;
    if (!f || f.type !== "modal" || f.error)
      return;
    const g = f.data || {};
    let h;
    r.mode === "open" ? h = "Open" : r.mode === "reply" ? h = "Reply" : r.mode === "delete" ? h = "Delete" : h = ((p = (b = e.modal) == null ? void 0 : b.submit) == null ? void 0 : p.name) || "submit";
    const w = k.ok({
      id: e.id,
      type: "email",
      action: h,
      data: {
        ...g
      }
    });
    n(w);
  }, E = () => {
    var g;
    const f = ((g = e.modal) == null ? void 0 : g.data) || {};
    d((h) => ({
      mode: "compose",
      data: { ...f },
      // fresh clone every time
      disabled: !1,
      version: h.version + 1
    })), o(!0);
  };
  return /* @__PURE__ */ A(Be, { children: [
    /* @__PURE__ */ A("div", { className: e.className, children: [
      /* @__PURE__ */ A("div", { className: "row input-group mt-2", children: [
        /* @__PURE__ */ i("div", { className: "col-sm-8", children: e.search && /* @__PURE__ */ i(Ee, { input: e.search, output: u }) }),
        /* @__PURE__ */ i("div", { className: "col-sm-4 d-flex align-items-center justify-content-end", children: e.send && /* @__PURE__ */ i(
          Oe,
          {
            buttonIcon: e.send,
            output: E
          }
        ) })
      ] }),
      /* @__PURE__ */ i(
        yn,
        {
          tableAction: e.table,
          output: y
        }
      )
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
    /* @__PURE__ */ i(Ot, { modal: l, output: x })
  ] });
}
class wr {
  constructor(t = {}) {
    const {
      id: n,
      title: a = "Contact Us",
      type: s = "AlloyInputTextIcon",
      className: r = "d-flex justify-content-center flex-column text-center h-100 mt-3",
      contactClass: d = "col-12 col-md-6",
      addressClass: c = "col-12 col-md-6",
      contactForm: o,
      addressCard: l,
      data: m,
      ...u
    } = t || {};
    if (this.id = n ?? B("contact"), this.title = a, this.type = s, this.className = r, this.contactClass = d, this.addressClass = c, this.contactForm = o instanceof Se ? o : new Se(o || {}), l instanceof mt)
      this.addressCard = l;
    else {
      const y = l || {}, x = y.body || {
        id: "contactAddressBody",
        className: "card-body"
      }, E = Array.isArray(y.fields) && y.fields.length > 0, v = E ? y.fields : [
        {
          id: "addressLine",
          className: "text-center text-muted",
          name: x.name || "Configure addressCard.fields to show address info."
        }
      ], f = {
        ...x,
        name: E && x.name || ""
      }, g = {
        id: y.id || "contactAddressFallback",
        className: y.className || "card border-0",
        header: y.header,
        body: f,
        fields: v,
        footer: y.footer
      };
      this.addressCard = new mt(g);
    }
    this.data = m || {}, Object.assign(this, u);
  }
}
function $r({ contact: e, output: t }) {
  if (!e || !(e instanceof wr))
    throw new Error(
      "AlloyContact requires `contact` (ContactObject instance)."
    );
  const n = (s) => {
    typeof t == "function" && t(s);
  };
  function a(s) {
    if (!s) return;
    const r = s instanceof k && typeof s.toJSON == "function" ? s.toJSON() : s || {}, d = new k({
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
      /* @__PURE__ */ i("div", { className: e.contactClass, children: /* @__PURE__ */ i(St, { form: e.contactForm, output: a }) }),
      /* @__PURE__ */ i("div", { className: e.addressClass, children: /* @__PURE__ */ i(Pa, { card: e.addressCard }) })
    ] })
  ] });
}
class xr {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "col m-2",
      action: s = "",
      profileForm: r,
      data: d,
      details: c,
      name: o = "",
      email: l = "",
      icon: m,
      ...u
    } = t || {};
    this.id = n ?? "profile", this.className = a, this.action = s, this.name = o, this.email = l, this.icon = m instanceof F ? m : new F(
      m || {
        iconClass: "fa-solid fa-user fa-2xl"
      }
    ), this.profileForm = r instanceof Se ? r : new Se(r || {}), this.data = d || {}, this.details = c instanceof vt ? c : new vt(c || {}), Object.assign(this, u);
  }
}
function Fr({ profile: e, output: t }) {
  if (!e || !(e instanceof xr))
    throw new Error("AlloyProfile requires `profile` (ProfileObject instance).");
  const n = (r) => {
    typeof t == "function" && t(r);
  }, a = (r) => {
    if (!r || r.type !== "form") return;
    const d = r instanceof k && typeof r.toJSON == "function" ? r.toJSON() : r, c = new k({
      id: e.id,
      type: "profile",
      action: "form.submit",
      error: !!d.error,
      data: d.data || {}
    });
    n(c);
  }, s = (r) => {
    if (!r) return;
    const d = r instanceof k && typeof r.toJSON == "function" ? r.toJSON() : r, c = new k({
      id: e.id,
      type: "profile",
      action: `details.${d.action || "unknown"}`,
      error: !!d.error,
      data: d.data || {}
    });
    n(c);
  };
  return /* @__PURE__ */ A("div", { id: e.id, className: e.className, children: [
    /* @__PURE__ */ A("div", { className: "row m-2", children: [
      /* @__PURE__ */ i("div", { className: "col-md-12 col-lg-3", children: /* @__PURE__ */ i("div", { className: "card h-100", children: /* @__PURE__ */ A("div", { className: "card-body d-flex flex-column justify-content-center align-items-center", children: [
        /* @__PURE__ */ i("div", { className: "m-2 text-center p-3 border bg-dark rounded-circle text-white", children: /* @__PURE__ */ i(oe, { icon: e.icon }) }),
        /* @__PURE__ */ i("div", { className: "text-center", children: /* @__PURE__ */ i("span", { children: e.name }) }),
        /* @__PURE__ */ i("div", { className: "text-center", children: /* @__PURE__ */ i("span", { children: e.email }) })
      ] }) }) }),
      /* @__PURE__ */ i("div", { className: "col-md-12 col-lg-9", children: /* @__PURE__ */ i(St, { form: e.profileForm, output: a }) })
    ] }),
    /* @__PURE__ */ i("hr", {}),
    /* @__PURE__ */ i("h4", { children: "Address:" }),
    /* @__PURE__ */ i(gr, { crudCard: e.details, output: s })
  ] });
}
class Er {
  constructor(t = {}) {
    const {
      id: n,
      title: a = "AlloyMobile",
      className: s = "col m-2",
      message: r = "",
      action: d = "",
      fields: c,
      pay: o,
      data: l
    } = t || {};
    this.id = n ?? B("checkout"), this.title = a, this.className = s, this.message = r, this.action = d;
    const m = Array.isArray(c) ? c : [];
    this.fields = m.map(
      (u) => u instanceof ne ? u : new ne(u || {})
    ), this.pay = o instanceof De ? o : new De(o || {}), this.data = l ?? {};
  }
}
function qr({ checkout: e, output: t }) {
  if (!e || !(e instanceof Er))
    throw new Error(
      "AlloyCheckout requires `checkout` (CheckoutObject instance)."
    );
  const n = (c) => {
    typeof t == "function" && t(c);
  }, [a, s] = L(() => {
    const c = {};
    return e.fields.forEach((o) => {
      o != null && o.name && (c[o.name] = o.value);
    }), c;
  }), r = (c) => {
    const o = c instanceof k ? c.data || {} : c || {}, { name: l, value: m } = o;
    l && s((u) => {
      const y = { ...u, [l]: m }, x = k.ok({
        id: e.id,
        type: "checkout",
        action: "field",
        data: {
          name: l,
          value: m,
          values: y
        }
      });
      return n(x), y;
    });
  }, d = (c) => {
    const o = c instanceof k && typeof c.toJSON == "function" ? c.toJSON() : c || {}, l = o.action || e.action || "submit", m = k.ok({
      id: e.id,
      type: "checkout",
      action: l,
      data: {
        billing: { ...a },
        pay: o
      }
    });
    n(m);
  };
  return /* @__PURE__ */ A("div", { className: e.className, id: e.id, children: [
    /* @__PURE__ */ i("h3", { children: e.title }),
    e.message && e.message.trim() !== "" && /* @__PURE__ */ i("div", { className: "alert alert-text-danger m-0 p-0", children: e.message }),
    /* @__PURE__ */ i("hr", { className: "my-4" }),
    /* @__PURE__ */ A("div", { className: "row m-2", children: [
      /* @__PURE__ */ A("div", { className: "col-sm-12 col-md-6 col-lg-8 col-xl-9 border-end", children: [
        /* @__PURE__ */ i("h5", { children: "Billing address:" }),
        e.fields.map((c) => /* @__PURE__ */ i(
          Ee,
          {
            input: c,
            output: r
          },
          c.id
        )),
        /* @__PURE__ */ i(xn, { pay: e.pay, output: d })
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
class Cr {
  constructor(t = {}) {
    const {
      id: n,
      title: a = "AlloyMobile",
      className: s = "col m-2",
      message: r = "",
      action: d = "",
      fields: c,
      pay: o,
      amountBar: l,
      data: m
    } = t || {};
    this.id = n ?? B("donate"), this.title = a, this.className = s, this.message = r, this.action = d;
    const u = Array.isArray(c) ? c : [];
    this.fields = u.map(
      (y) => y instanceof ne ? y : new ne(y || {})
    ), this.pay = o instanceof De ? o : new De(o || {}), this.amountBar = l instanceof xe ? l : new xe(
      l || {
        className: "nav gap-2 my-3",
        buttonClass: "btn btn-outline-secondary",
        barName: { show: !1 },
        type: "AlloyButton",
        buttons: []
      }
    ), this.data = m ?? {};
  }
}
function Ur({ donate: e, output: t }) {
  if (!e || !(e instanceof Cr))
    throw new Error(
      "AlloyDonate requires `donate` (DonateObject instance)."
    );
  const n = (m) => {
    typeof t == "function" && t(m);
  }, [a, s] = L(() => {
    const m = {};
    return e.fields.forEach((u) => {
      u != null && u.name && (m[u.name] = u.value);
    }), m;
  }), [r, d] = L(""), c = (m) => {
    const u = m instanceof k ? m.data || {} : m || {}, { name: y, value: x } = u;
    y && s((E) => {
      const v = { ...E, [y]: x }, f = k.ok({
        id: e.id,
        type: "donate",
        action: "field",
        data: {
          name: y,
          value: x,
          values: v
        }
      });
      return n(f), v;
    });
  }, o = (m) => {
    var v, f;
    const u = m instanceof k && typeof m.toJSON == "function" ? m.toJSON() : m || {}, y = ((v = u == null ? void 0 : u.data) == null ? void 0 : v.value) ?? ((f = u == null ? void 0 : u.data) == null ? void 0 : f.name) ?? (u == null ? void 0 : u.action) ?? "", x = String(y).trim();
    d(x);
    const E = k.ok({
      id: e.id,
      type: "donate",
      action: "amount",
      data: {
        amount: x,
        raw: u
      }
    });
    n(E);
  }, l = (m) => {
    const u = m instanceof k && typeof m.toJSON == "function" ? m.toJSON() : m || {}, y = u.action || e.action || "submit", x = k.ok({
      id: e.id,
      type: "donate",
      action: y,
      data: {
        donor: { ...a },
        amount: r,
        pay: u
      }
    });
    n(x);
  };
  return /* @__PURE__ */ A("div", { className: e.className, id: e.id, children: [
    /* @__PURE__ */ i("h3", { children: e.title }),
    e.message && e.message.trim() !== "" && /* @__PURE__ */ i("div", { className: "alert alert-text-danger m-0 p-0", children: e.message }),
    /* @__PURE__ */ i("hr", { className: "my-3" }),
    /* @__PURE__ */ i("div", { className: "row m-2", children: /* @__PURE__ */ A("div", { className: "col-12", children: [
      /* @__PURE__ */ i("h5", { children: "Payment Details:" }),
      e.fields.map((m) => /* @__PURE__ */ i(
        Ee,
        {
          input: m,
          output: c
        },
        m.id
      )),
      e.amountBar && Array.isArray(e.amountBar.buttons) && e.amountBar.buttons.length > 0 && /* @__PURE__ */ i(
        Xe,
        {
          buttonBar: e.amountBar,
          output: o
        }
      ),
      /* @__PURE__ */ i(xn, { pay: e.pay, output: l })
    ] }) })
  ] });
}
class gt {
  constructor(t = {}) {
    this.url = t.url || "", this.altText = t.altText || "", this.isPrimary = !!t.isPrimary, this.sortOrder = typeof t.sortOrder == "number" ? t.sortOrder : 0;
  }
}
class Zt {
  constructor(t = {}) {
    this.id = t.id ?? B("gallery-item"), this.productName = t.productName || "", this.productSlug = t.productSlug || "", this.categoryName = t.categoryName || "", this.subcategoryName = t.subcategoryName || "", this.shortDescription = t.shortDescription || "", this.status = t.status || "", this.tags = Array.isArray(t.tags) ? t.tags : [];
    const a = (t.media && Array.isArray(t.media.images) ? t.media.images : []).map((r) => new gt(r));
    a.sort((r, d) => r.sortOrder - d.sortOrder), this.images = a;
    const s = t.pricing || {};
    this.pricing = {
      currency: s.currency || "CAD",
      unitPrice: typeof s.unitPrice == "number" ? s.unitPrice : 0,
      salePrice: typeof s.salePrice == "number" ? s.salePrice : 0
    }, this.data = t.data || {};
  }
}
class Ar {
  constructor(t = {}) {
    const {
      id: n,
      name: a = "Product Gallery",
      className: s = "container-fluid",
      search: r,
      items: d,
      ...c
    } = t || {};
    this.id = n ?? B("gallery"), this.name = a, this.className = s, this.search = r instanceof ne ? r : r ? new ne(r) : null;
    const o = Array.isArray(d) ? d : [];
    this.items = o.map(
      (l) => l instanceof Zt ? l : new Zt(l)
    ), Object.assign(this, c);
  }
}
function Wr({ gallery: e, output: t }) {
  if (!e || !(e instanceof Ar))
    throw new Error(
      "AlloyGallery requires `gallery` (GalleryObject instance)."
    );
  const n = (h) => {
    typeof t == "function" && t(h);
  }, [a, s] = L(""), [r, d] = L({}), [c, o] = L({});
  function l(h, w) {
    const b = e.items.filter((N) => {
      const S = h[N.id];
      return typeof S == "number" && S > 0;
    }).map((N) => {
      const S = h[N.id], R = N.pricing.salePrice > 0 ? N.pricing.salePrice : N.pricing.unitPrice, T = R * S;
      return {
        id: N.id,
        productName: N.productName,
        quantity: S,
        unitPrice: R,
        currency: N.pricing.currency,
        totalPrice: T
      };
    }), p = k.ok({
      id: e.id,
      type: "gallery",
      action: w || "updateQuantity",
      data: {
        items: b
      }
    });
    n(p);
  }
  function m(h, w, b) {
    d((p) => {
      const N = { ...p }, S = Number.isFinite(w) ? Math.max(0, w) : 0;
      return S <= 0 ? delete N[h] : N[h] = S, l(
        N,
        b
      ), N;
    });
  }
  function u(h) {
    d((w) => {
      const b = { ...w }, N = (Number.isFinite(w[h]) ? w[h] : 0) + 1;
      return b[h] = N, l(b, "add"), b;
    });
  }
  function y(h, w) {
    const b = parseInt(w, 10);
    Number.isNaN(b) ? m(h, 0, "updateQuantity") : m(h, b, "updateQuantity");
  }
  function x(h, w) {
    o((b) => ({
      ...b,
      [h]: w
    }));
  }
  function E(h) {
    const w = h instanceof k ? h.data || {} : h || {}, { name: b, value: p } = w, N = typeof p == "string" ? p.trim().toLowerCase() : "";
    s(N);
    const S = b && typeof b == "string" ? { [b]: p } : {}, R = k.ok({
      id: e.id,
      type: "gallery",
      action: "search",
      data: S
    });
    n(R);
  }
  const v = fe(() => a ? e.items.filter((h) => [
    h.productName,
    h.categoryName,
    h.subcategoryName,
    h.shortDescription,
    h.status,
    ...h.tags || []
  ].filter(Boolean).join(" ").toLowerCase().includes(a)) : e.items, [e.items, a]);
  function f(h) {
    const w = h.pricing.salePrice > 0 ? h.pricing.salePrice : h.pricing.unitPrice, b = h.pricing.currency || "CAD";
    return !w || w <= 0 ? null : /* @__PURE__ */ i("div", { className: "mt-2", children: /* @__PURE__ */ A("span", { className: "fw-semibold", children: [
      b,
      " ",
      w.toFixed(2)
    ] }) });
  }
  function g(h) {
    const w = h.images && h.images.length > 0 ? h.images : [
      new gt({
        url: "",
        altText: h.productName || "No image",
        sortOrder: 0
      })
    ], b = typeof c[h.id] == "number" ? c[h.id] : 0, p = w[b] || w[0] || new gt({}), N = r[h.id] || 0;
    return /* @__PURE__ */ i(
      "div",
      {
        className: "col-12 col-md-6 col-lg-4 mb-3 item",
        "data-category": h.categoryName,
        "data-title": h.productName,
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
              /* @__PURE__ */ i("h5", { className: "card-title mb-1", children: h.categoryName || "Category" }),
              /* @__PURE__ */ i("div", { className: "small text-secondary", children: h.productName || "Product name" })
            ] })
          ] }),
          /* @__PURE__ */ i("div", { className: "mt-3 w-100 text-center", children: p.url ? /* @__PURE__ */ i(
            "img",
            {
              src: p.url,
              alt: p.altText || h.productName,
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
          w.length > 1 && /* @__PURE__ */ i("div", { className: "d-flex gap-2 justify-content-center mt-2", children: w.map((S, R) => /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "btn btn-sm p-0 border-0 " + (R === b ? "opacity-100" : "opacity-75"),
              onClick: () => x(h.id, R),
              "aria-label": `Image ${R + 1} for ${h.productName || "product"}`,
              children: S.url ? /* @__PURE__ */ i(
                "img",
                {
                  src: S.url,
                  alt: S.altText,
                  className: "rounded",
                  style: {
                    width: "52px",
                    height: "52px",
                    objectFit: "cover",
                    border: R === b ? "2px solid var(--bs-primary)" : "1px solid #dee2e6"
                  }
                }
              ) : /* @__PURE__ */ i(
                "div",
                {
                  className: "bg-light rounded",
                  style: {
                    width: "52px",
                    height: "52px",
                    border: R === b ? "2px solid var(--bs-primary)" : "1px solid #dee2e6"
                  }
                }
              )
            },
            `${h.id}-thumb-${R}`
          )) }),
          /* @__PURE__ */ i("p", { className: "mt-3 text-secondary small", children: h.shortDescription || "Product description goes here." }),
          f(h),
          /* @__PURE__ */ A("div", { className: "d-flex justify-content-between align-items-center mt-3", children: [
            /* @__PURE__ */ i("span", { className: "badge text-bg-primary-subtle text-primary", children: h.status || "Available" }),
            /* @__PURE__ */ A("div", { className: "d-flex align-items-center gap-2", children: [
              /* @__PURE__ */ i(
                "input",
                {
                  type: "number",
                  min: "0",
                  className: "form-control form-control-sm",
                  style: { width: "70px" },
                  value: N,
                  onChange: (S) => y(
                    h.id,
                    S.target.value
                  ),
                  "aria-label": `Quantity for ${h.productName}`
                }
              ),
              /* @__PURE__ */ A(
                "button",
                {
                  type: "button",
                  className: "btn btn-sm btn-primary addCart",
                  onClick: () => u(h.id),
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
      h.id
    );
  }
  return /* @__PURE__ */ A("div", { id: e.id, className: e.className, children: [
    /* @__PURE__ */ i("div", { className: "d-flex justify-content-between align-items-center mb-2 mt-2", children: /* @__PURE__ */ i("h4", { className: "mb-0", children: e.name }) }),
    e.search && /* @__PURE__ */ i("div", { className: "row mb-3", children: /* @__PURE__ */ i("div", { className: "col-12 col-md-6 col-lg-4", children: /* @__PURE__ */ i(
      Ee,
      {
        input: e.search,
        output: E
      }
    ) }) }),
    /* @__PURE__ */ i("div", { className: "row", children: v.length === 0 ? /* @__PURE__ */ i("div", { className: "col-12", children: /* @__PURE__ */ i("div", { className: "alert alert-info mb-0", children: "No products match your search." }) }) : v.map((h) => g(h)) })
  ] });
}
class en {
  constructor(t = {}) {
    const {
      id: n,
      name: a,
      className: s = "footer pt-5 pb-4 bg-dark text-light",
      logo: r,
      details: d,
      social: c,
      section: o,
      subscribe: l
    } = t || {};
    if (this.id = n ?? B("footer"), this.name = a ?? "Footer", this.className = s, r instanceof ze ? this.logo = r : this.logo = new ze(
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
    ), c instanceof be)
      this.social = c;
    else {
      const u = c || {};
      this.social = new be({
        id: u.id ?? B("footer-social"),
        className: u.className ?? "nav gap-3",
        type: u.type ?? "AlloyLinkIcon",
        linkClass: u.linkClass ?? "nav-link p-0 text-light",
        selected: u.selected ?? "active",
        title: u.title,
        // TagObject handled inside LinkBarObject
        links: Array.isArray(u.links) ? u.links : []
      });
    }
    const m = Array.isArray(o) ? o : [];
    if (this.section = m.map((u) => u instanceof be ? u : new be({
      id: u.id ?? B("footer-section"),
      className: u.className ?? "list-unstyled small",
      type: u.type ?? "AlloyLink",
      linkClass: u.linkClass ?? "d-block mb-1 text-decoration-none text-light",
      selected: u.selected ?? "active",
      title: u.title,
      // wrapped into TagObject inside LinkBarObject
      links: Array.isArray(u.links) ? u.links : []
    })), l instanceof Se)
      this.subscribe = l;
    else {
      const u = l || {};
      this.subscribe = new Se({
        id: u.id ?? B("footer-subscribe"),
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
function Kr({ footer: e, output: t }) {
  const n = e instanceof en ? e : new en(e || {}), a = (c) => {
    typeof t == "function" && t(c);
  }, s = (c) => {
    if (!c) return;
    const o = c instanceof k && typeof c.toJSON == "function" ? c.toJSON() : c;
    if (o.type !== "form" || o.action !== "submit")
      return;
    const l = !!o.error, m = o.data || {}, u = new k({
      id: n.id,
      type: "footer",
      action: "subscribe",
      error: l,
      data: m
    });
    a(u);
  }, r = (c) => {
    if (!c) return;
    const o = c instanceof k && typeof c.toJSON == "function" ? c.toJSON() : c, l = o.data || {}, m = l.link || {}, u = m.href || l.href || "#", y = typeof m.name == "string" && m.name.trim() || typeof m.ariaLabel == "string" && m.ariaLabel.trim() || o.action || "link", x = new k({
      id: n.id,
      type: "footer",
      action: y,
      error: !1,
      data: { href: u }
    });
    a(x);
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
        Me,
        {
          linkBar: n.social,
          output: r
        }
      ) })
    ] }),
    d.map((c, o) => /* @__PURE__ */ i(
      "div",
      {
        className: "col-12 col-md-3",
        children: /* @__PURE__ */ i(
          Me,
          {
            linkBar: c,
            output: r
          }
        )
      },
      c.id || `footer-section-${o}`
    )),
    /* @__PURE__ */ i("div", { className: "col-12 col-md-3", children: /* @__PURE__ */ i(
      St,
      {
        form: n.subscribe,
        output: s
      }
    ) })
  ] }) }) });
}
export {
  Qe as AlloyButton,
  Xe as AlloyButtonBar,
  Oe as AlloyButtonIcon,
  nn as AlloyButtonSubmit,
  Pa as AlloyCard,
  Ta as AlloyCardAction,
  Mr as AlloyCardCarousel,
  Br as AlloyCardVideo,
  qr as AlloyCheckout,
  $r as AlloyContact,
  gr as AlloyCrudCard,
  _r as AlloyCrudTable,
  Ur as AlloyDonate,
  Dr as AlloyEmail,
  Kr as AlloyFooter,
  St as AlloyForm,
  Wr as AlloyGallery,
  oe as AlloyIcon,
  Ee as AlloyInput,
  An as AlloyLink,
  Me as AlloyLinkBar,
  On as AlloyLinkIcon,
  tn as AlloyLinkLogo,
  Ot as AlloyModal,
  Ir as AlloyModalToast,
  Pr as AlloyNavBar,
  xn as AlloyPay,
  Fr as AlloyProfile,
  jr as AlloySearch,
  Lr as AlloyTabForm,
  Tr as AlloyTable,
  yn as AlloyTableAction,
  Rr as AlloyTableLink,
  xe as ButtonBarObject,
  le as ButtonIconObject,
  he as ButtonObject,
  Te as ButtonSubmitObject,
  ht as CardActionObject,
  hr as CardCarouselObject,
  mt as CardObject,
  mr as CardVideoObject,
  Er as CheckoutObject,
  wr as ContactObject,
  vt as CrudCardObject,
  pr as CrudTableObject,
  Cr as DonateObject,
  br as EmailObject,
  en as FooterObject,
  Se as FormObject,
  Ar as GalleryObject,
  F as IconObject,
  ne as InputObject,
  be as LinkBarObject,
  Pe as LinkIconObject,
  Ae as LinkLogoObject,
  je as LinkObject,
  we as ModalObject,
  _a as ModalToastObject,
  Ln as NavBarObject,
  De as PayObject,
  xr as ProfileObject,
  Tn as SearchObject,
  La as TabFormObject,
  Ra as TabObject,
  _e as TableActionObject,
  Aa as TableLinkObject,
  Bn as TableObject
};
//# sourceMappingURL=alloy-react.es.js.map
