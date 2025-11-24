import { jsx as i, jsxs as A, Fragment as Be } from "react/jsx-runtime";
import * as L from "react";
import se, { useRef as re, useState as I, useMemo as me, forwardRef as bt, useImperativeHandle as Nt, useEffect as be, useCallback as En } from "react";
import "react-dom";
function B(e = "id") {
  const t = Date.now(), n = Math.random().toString(36).slice(2, 7);
  return `${e}-${t}-${n}`;
}
class ae {
  constructor(t = {}) {
    const { id: n, name: a, className: s } = t;
    this.id = n ?? B("tag"), this.name = a ?? "", this.className = s ?? "";
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
      error: l = !1
    } = t || {}, o = typeof n < "u" ? n : r && typeof r.id < "u" ? r.id : "";
    this.id = o, this.type = a, this.action = s, this.error = !!l, this.data = { ...r };
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
    const l = { ...r };
    return s && l.message == null && (l.message = String(s)), new j({
      id: t,
      type: n,
      action: a,
      error: !0,
      data: l
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
class oe {
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
function ie({ icon: e }) {
  if (!e) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ i("i", { id: e.id, className: e.iconClass, "aria-hidden": "true" });
}
function Cn(e = "", t = "") {
  const [n, a] = I(!1), [s, r] = I(!1), [l, o] = I(!1);
  return {
    className: me(() => [e, (n || s || l) && t].filter(Boolean).join(" "), [e, t, n, s, l]),
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
  const t = re(e.id), { className: n, events: a } = Cn(e.className, e.active), s = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel;
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
function On(e = "", t = "") {
  const [n, a] = I(!1), [s, r] = I(!1), [l, o] = I(!1);
  return {
    className: me(() => [e, (n || s || l) && t].filter(Boolean).join(" "), [e, t, n, s, l]),
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
function Sn({ linkIcon: e }) {
  if (!e || !(e instanceof Pe))
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  const t = re(e.id), { className: n, events: a } = On(
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
function kn(e = "", t = "") {
  const [n, a] = I(!1), [s, r] = I(!1), [l, o] = I(!1);
  return {
    className: me(() => [e, (n || s || l) && t].filter(Boolean).join(" "), [e, t, n, s, l]),
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
class Ce {
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
  if (!e || !(e instanceof Ce))
    throw new Error(
      "AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance)."
    );
  const t = re(e.id), { className: n, events: a } = kn(
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
  const [n, a] = I(!1), [s, r] = I(!1), [l, o] = I(!1);
  return {
    className: me(() => [e, (n || s || l) && t].filter(Boolean).join(" "), [e, t, n, s, l]),
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
    this.id = t.id ?? B("btn"), this.name = t.name, this.className = t.className ?? "btn btn-primary", this.active = t.active ?? "", this.disabled = !!t.disabled, this.title = t.title ?? t.name, this.ariaLabel = t.ariaLabel ?? t.name, this.tabIndex = t.tabIndex, this.onClick = t.onClick, this.onKeyDown = t.onKeyDown, this.onKeyUp = t.onKeyUp, this.onFocus = t.onFocus, this.onBlur = t.onBlur, this.onMouseEnter = t.onMouseEnter, this.onMouseLeave = t.onMouseLeave;
  }
}
const Qe = bt(function({ button: t, output: n }, a) {
  if (!t || !(t instanceof he))
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  const s = re(null), r = re(t.id), l = t.disabled, { className: o, events: c } = jn(
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
  const d = (u, y, x, C) => (g) => {
    if (y == null || y(g), C && typeof n == "function") {
      const f = j.ok({
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
    u == null || u(g, t);
  }, m = {
    // EMIT
    onClick: d(t.onClick, void 0, "click", !0),
    onMouseDown: d(void 0, c.onMouseDown, "mousedown", !0),
    // NO EMIT – just state + model handler
    onKeyDown: d(
      t.onKeyDown,
      c.onFocus,
      "keydown",
      !1
    ),
    onKeyUp: d(t.onKeyUp, void 0, "keyup", !1),
    onFocus: d(t.onFocus, c.onFocus, "focus", !1),
    onBlur: d(t.onBlur, c.onBlur, "blur", !1),
    onMouseEnter: d(
      t.onMouseEnter,
      c.onMouseEnter,
      "mouseenter",
      !1
    ),
    onMouseLeave: d(
      t.onMouseLeave,
      c.onMouseLeave,
      "mouseleave",
      !1
    ),
    onMouseUp: d(void 0, c.onMouseUp, "mouseup", !1)
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
      "aria-disabled": l || void 0,
      disabled: l,
      tabIndex: t.tabIndex,
      ...m,
      children: /* @__PURE__ */ i("span", { className: "px-2 align-middle", children: t.name })
    }
  );
});
function Pn(e = "", t = "") {
  const [n, a] = I(!1), [s, r] = I(!1), [l, o] = I(!1);
  return {
    className: me(() => [e, (n || s || l) && t].filter(Boolean).join(" "), [e, t, n, s, l]),
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
class ce {
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
const Se = bt(function({ buttonIcon: t, output: n }, a) {
  if (!t || !(t instanceof ce))
    throw new Error(
      "AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance)."
    );
  const s = re(null), r = re(t.id), l = t.disabled, { className: o, events: c } = Pn(
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
  const d = (u, y, x, C) => (g) => {
    if (y == null || y(g), C && typeof n == "function") {
      const f = j.ok({
        id: t.id,
        type: "button-icon",
        action: x,
        data: {
          name: t.name
        }
      });
      n(f);
    }
    u == null || u(g, t);
  }, m = {
    // EMIT
    onClick: d(t.onClick, void 0, "click", !0),
    onKeyDown: d(
      t.onKeyDown,
      c.onFocus,
      "keydown",
      !0
    ),
    // NO EMIT – just state + model handler
    onKeyUp: d(t.onKeyUp, void 0, "keyup", !1),
    onFocus: d(t.onFocus, c.onFocus, "focus", !1),
    onBlur: d(t.onBlur, c.onBlur, "blur", !1),
    onMouseEnter: d(
      t.onMouseEnter,
      c.onMouseEnter,
      "mouseenter",
      !1
    ),
    onMouseLeave: d(
      t.onMouseLeave,
      c.onMouseLeave,
      "mouseleave",
      !1
    ),
    onMouseDown: d(void 0, c.onMouseDown, "mousedown", !1),
    onMouseUp: d(void 0, c.onMouseUp, "mouseup", !1)
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
      "aria-disabled": l || void 0,
      disabled: l,
      tabIndex: t.tabIndex,
      ...m,
      children: [
        /* @__PURE__ */ i("span", { className: "align-middle", children: /* @__PURE__ */ i(ie, { icon: t.icon }) }),
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
  const s = re(null), r = re(t.id), [l, o] = I(!!t.loading), c = re(!1);
  be(() => {
    const f = !!t.loading;
    o(f), f || (c.current = !1);
  }, [t.loading]);
  const d = t.disabled || l;
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
  const m = () => c.current || d ? !1 : (c.current = !0, t.loading = !0, t.disabled = !0, o(!0), !0), u = (f, v, h) => {
    if (typeof n == "function") {
      const w = new j({
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
    v == null || v(f, t);
  }, y = (f) => {
    m() && u(f, t.onClick, "click");
  }, x = (f) => {
    m() && u(f, t.onMouseDown, "mousedown");
  }, C = (f) => {
    const v = f.key;
    (v === "Enter" || v === " ") && m() && u(f, t.onKeyDown, "keydown");
  }, g = l;
  return /* @__PURE__ */ A(
    "button",
    {
      id: r.current,
      ref: s,
      type: "submit",
      className: t.className,
      title: t.title,
      "aria-label": t.ariaLabel,
      "aria-busy": l || void 0,
      "aria-disabled": d || void 0,
      disabled: d,
      tabIndex: t.tabIndex,
      onClick: y,
      onMouseDown: x,
      onKeyDown: C,
      children: [
        g && /* @__PURE__ */ i("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ i(ie, { icon: t.icon }) }),
        /* @__PURE__ */ i("span", { className: g ? "px-2 align-middle" : "align-middle", children: t.name }),
        l ? /* @__PURE__ */ i("span", { className: "ms-2 visually-hidden", "aria-live": "polite", children: "Loading…" }) : null
      ]
    }
  );
});
class le {
  /**
   * @param {InputConfig} config
   */
  constructor(t = {}) {
    const {
      id: n,
      name: a,
      type: s = "text",
      label: r = "",
      value: l,
      layout: o = "text",
      icon: c,
      placeholder: d = "",
      required: m = !1,
      minLength: u,
      maxLength: y,
      min: x,
      max: C,
      pattern: g,
      matchWith: f,
      passwordStrength: v,
      className: h,
      options: w = [],
      validators: b = [],
      ...p
    } = t;
    if (!a)
      throw new Error("InputObject requires `name`.");
    if ((o === "icon" || o === "floating") && !c)
      throw new Error(
        "InputObject with layout='icon' or 'floating' requires `icon`."
      );
    let N;
    typeof l < "u" ? N = l : s === "checkbox" ? N = [] : N = "";
    const O = c instanceof F ? c : c ? new F(c) : void 0;
    this.id = n ?? B("input"), this.name = a, this.type = s, this.label = r, this.value = N, this.layout = o, this.icon = O, this.placeholder = d, this.required = !!m, this.minLength = u, this.maxLength = y, this.min = x, this.max = C, this.pattern = g, this.matchWith = f, this.passwordStrength = v, typeof h == "string" && h.trim() !== "" ? this.className = h.trim() : s === "select" ? this.className = "form-select" : s === "radio" || s === "checkbox" ? this.className = "form-check-input" : this.className = "form-control", this.options = w, this.validators = b, Object.assign(this, p);
  }
}
function Oe({ input: e, output: t }) {
  const [n, a] = I(e.value), [s, r] = I(!1);
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
  const l = (p) => {
    const N = [], O = typeof p == "string" ? p.trim() : p;
    if (e.required) {
      const R = Array.isArray(O) && O.length === 0, T = !Array.isArray(O) && (O === "" || O === !1 || O == null);
      (R || T) && N.push("This field is required.");
    }
    return typeof O == "string" && e.minLength != null && O.length < e.minLength && N.push(`Minimum length is ${e.minLength}`), typeof O == "string" && e.maxLength != null && O.length > e.maxLength && N.push(`Maximum length is ${e.maxLength}`), typeof O == "string" && e.pattern && e.pattern !== "" && (new RegExp(e.pattern).test(O) || N.push("Invalid format.")), e.passwordStrength && typeof O == "string" && (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(
      O
    ) || N.push("Password is too weak.")), N;
  }, o = l(n), c = s && o.length > 0, d = c && o.length > 0 && /* @__PURE__ */ i("div", { className: "mt-2", "aria-live": "polite", children: o.map((p, N) => /* @__PURE__ */ i(
    "div",
    {
      className: "alert alert-danger py-2 mb-2",
      role: "alert",
      children: p
    },
    N
  )) }), m = (p, N = "change") => {
    const O = l(p), R = O.length > 0;
    if (typeof t == "function") {
      const T = new j({
        id: e.id,
        type: "input",
        action: N,
        error: R,
        data: {
          name: e.name,
          value: p,
          errors: O
        }
      });
      t(T);
    }
  }, u = (p) => {
    const N = p.target.value;
    if (e.type === "checkbox") {
      const O = Array.isArray(n) ? [...n] : [], R = O.indexOf(N);
      R > -1 ? O.splice(R, 1) : O.push(N), a(O), m(O, "change");
    } else e.type, a(N), m(N, "change");
  }, y = () => {
    r(!0), m(n, "blur");
  }, x = {
    id: e.id,
    name: e.name,
    placeholder: e.placeholder,
    onBlur: y,
    "aria-invalid": c || void 0
  }, C = (p) => p + (c ? " is-invalid" : ""), g = () => /* @__PURE__ */ i(
    "textarea",
    {
      ...x,
      value: n,
      onChange: u,
      className: C(e.className)
    }
  ), f = () => /* @__PURE__ */ i(
    "select",
    {
      ...x,
      value: n,
      onChange: u,
      className: C(e.className),
      children: e.options.map((p) => /* @__PURE__ */ i("option", { value: p.value, children: p.label }, p.value))
    }
  ), v = () => /* @__PURE__ */ A("div", { children: [
    e.label && /* @__PURE__ */ i("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((p, N) => /* @__PURE__ */ A("div", { className: "form-check", children: [
      /* @__PURE__ */ i(
        "input",
        {
          type: "radio",
          id: `${e.id}_${N}`,
          className: C(e.className),
          name: e.name,
          value: p.value,
          checked: n === p.value,
          onChange: u,
          onBlur: y,
          "aria-invalid": c || void 0
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
    d
  ] }), h = () => /* @__PURE__ */ A("div", { children: [
    e.label && /* @__PURE__ */ i("label", { className: "form-label d-block mb-2", children: e.label }),
    e.options.map((p, N) => /* @__PURE__ */ A("div", { className: "form-check", children: [
      /* @__PURE__ */ i(
        "input",
        {
          type: "checkbox",
          id: `${e.id}_${N}`,
          className: C(e.className),
          name: e.name,
          value: p.value,
          checked: Array.isArray(n) && n.includes(p.value),
          onChange: u,
          onBlur: y,
          "aria-invalid": c || void 0
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
    d
  ] }), w = () => /* @__PURE__ */ i(
    "input",
    {
      ...x,
      type: e.type,
      value: n,
      onChange: u,
      className: C(e.className)
    }
  ), b = () => {
    switch (e.type) {
      case "textarea":
        return g();
      case "select":
        return f();
      case "radio":
        return v();
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
        e.icon && /* @__PURE__ */ i(ie, { icon: e.icon }),
        e.icon && " ",
        e.label
      ] })
    ] }),
    !(e.type === "radio" || e.type === "checkbox") && d
  ] }) : e.layout === "icon" ? /* @__PURE__ */ A("div", { className: "mb-3", children: [
    e.label && /* @__PURE__ */ i("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    /* @__PURE__ */ A("div", { className: "input-group", children: [
      /* @__PURE__ */ i("span", { className: "input-group-text", children: /* @__PURE__ */ i(ie, { icon: e.icon }) }),
      ["radio", "checkbox"].includes(e.type) ? b() : /* @__PURE__ */ i(
        "input",
        {
          ...x,
          type: e.type,
          value: n,
          onChange: u,
          className: C(e.className)
        }
      )
    ] }),
    !(e.type === "radio" || e.type === "checkbox") && d
  ] }) : /* @__PURE__ */ A("div", { className: "mb-3", children: [
    ["text", "textarea", "number", "email", "password", "date"].includes(
      e.type
    ) && e.label && /* @__PURE__ */ i("label", { htmlFor: e.id, className: "form-label", children: e.label }),
    b(),
    !(e.type === "radio" || e.type === "checkbox") && d
  ] });
}
class ge {
  /**
   * @param {LinkBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? B("linkBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyLink", this.linkClass = t.linkClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof ae ? this.title = t.title : t.title ? this.title = new ae(t.title) : this.title = new ae({});
    const n = Array.isArray(t.links) ? t.links : [];
    this.type === "AlloyLinkIcon" ? this.links = n.map(
      (a) => a instanceof Pe ? a : new Pe(a)
    ) : this.type === "AlloyLinkLogo" ? this.links = n.map(
      (a) => a instanceof Ce ? a : new Ce(a)
    ) : this.links = n.map(
      (a) => a instanceof je ? a : new je(a)
    );
  }
}
function Tn(e, t, n, a) {
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
  }) : e instanceof Ce ? new Ce({
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
  if (!e || !(e instanceof ge))
    throw new Error("AlloyLinkBar requires `linkBar` (LinkBarObject instance).");
  const t = re(e.id), [n, a] = I("");
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
    return (d) => {
      const m = o.id || `${o.href || ""}-${o.name || ""}`;
      a(m), c == null || c(d);
    };
  }
  function l() {
    return /* @__PURE__ */ i("ul", { id: t.current, className: e.className, children: e.links.map((o, c) => {
      const d = ((o == null ? void 0 : o.id) ?? "") === n, m = Tn(
        o,
        e.selected,
        d,
        r(o)
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
            ((o == null ? void 0 : o.id) ?? c) + "-li"
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
              children: /* @__PURE__ */ i(Sn, { linkIcon: m })
            },
            ((o == null ? void 0 : o.id) ?? c) + "-li"
          );
        case "AlloyLinkLogo":
          if (!(m instanceof Ce))
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkLogo') expects each link to be a LinkLogoObject instance."
            );
          return /* @__PURE__ */ i(
            "li",
            {
              className: e.linkClass,
              children: /* @__PURE__ */ i(tn, { linkLogo: m })
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
    l()
  ] });
}
class xe {
  /**
   * @param {ButtonBarConfig} bar
   */
  constructor(t = {}) {
    this.id = t.id ?? B("buttonBar"), this.className = t.className ?? "d-flex justify-content-center", this.type = t.type ?? "AlloyButton", this.buttonClass = t.buttonClass ?? "nav-item", this.selected = t.selected ?? "active", t.title instanceof ae ? this.title = t.title : t.title ? this.title = new ae(t.title) : this.title = new ae({});
    const n = Array.isArray(t.buttons) ? t.buttons : [];
    this.type === "AlloyButtonIcon" ? this.buttons = n.map(
      (a) => a instanceof ce ? a : new ce(a)
    ) : this.buttons = n.map(
      (a) => a instanceof he ? a : new he(a)
    );
  }
}
function Tt(e, t, n, a, s) {
  const r = n ? t : "";
  function l(o) {
    var m, u;
    if (!o)
      return;
    if ((o.action || ((m = o == null ? void 0 : o.data) == null ? void 0 : m.event) || "") === "click") {
      const y = ((u = o == null ? void 0 : o.data) == null ? void 0 : u.id) ?? "";
      y && a(y);
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
  }), onAnyEvent: l } : e instanceof ce ? { model: new ce({
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
  }), onAnyEvent: l } : { model: e, onAnyEvent: l };
}
function Xe({ buttonBar: e, output: t }) {
  if (!e || !(e instanceof xe))
    throw new Error(
      "AlloyButtonBar requires `buttonBar` (ButtonBarObject instance)."
    );
  const n = re(e.id), [a, s] = I("");
  be(() => {
    s("");
  }, [e]);
  const r = () => e.title && e.title.name ? /* @__PURE__ */ i("div", { id: e.title.id, className: e.title.className, children: e.title.name }) : null;
  function l() {
    return /* @__PURE__ */ i("ul", { id: n.current, className: e.className, children: e.buttons.map((d, m) => {
      if (!(d instanceof he))
        throw new Error(
          "AlloyButtonBar (type='AlloyButton') expects ButtonObject items."
        );
      const u = ((d == null ? void 0 : d.id) ?? "") === a, { model: y, onAnyEvent: x } = Tt(
        d,
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
        ((d == null ? void 0 : d.id) ?? m) + "-li"
      );
    }) });
  }
  function o() {
    return /* @__PURE__ */ i("ul", { id: n.current, className: e.className, children: e.buttons.map((d, m) => {
      if (!(d instanceof ce))
        throw new Error(
          "AlloyButtonBar (type='AlloyButtonIcon') expects ButtonIconObject items."
        );
      const u = ((d == null ? void 0 : d.id) ?? "") === a, { model: y, onAnyEvent: x } = Tt(
        d,
        e.selected,
        u,
        s,
        t
      );
      return /* @__PURE__ */ i(
        "li",
        {
          className: e.buttonClass,
          children: /* @__PURE__ */ i(Se, { buttonIcon: y, output: x })
        },
        ((d == null ? void 0 : d.id) ?? m) + "-li"
      );
    }) });
  }
  function c() {
    switch (e.type) {
      case "AlloyButtonIcon":
        return o();
      case "AlloyButton":
      default:
        return l();
    }
  }
  return /* @__PURE__ */ A("nav", { "data-type": e.type, children: [
    /* @__PURE__ */ i(r, {}),
    c()
  ] });
}
class Rn {
  /**
   * @param {NavBarConfig} nav = {}
   */
  constructor(t = {}) {
    if (this.id = t.id ?? B("navbar"), this.className = t.className ?? "navbar navbar-expand-lg navbar-light bg-light", t.logo instanceof Ce)
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
      this.logo = new Ce(n);
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
function kr({ navBar: e }) {
  if (!e || !(e instanceof Rn))
    throw new Error("AlloyNavBar requires `navBar` (NavBarObject instance).");
  const t = re(e.id), n = `${t.current}-collapse`;
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
function Ln(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
class In {
  /**
   * @param {TableConfig} table
   */
  constructor(t = {}) {
    this.id = t.id ?? B("table"), this.className = t.className ?? "table", this.name = t.name ?? "table", this.rows = Array.isArray(t.rows) ? t.rows.slice() : [];
    const n = { iconClass: "fa-solid fa-user" }, a = { iconClass: "fa-solid fa-arrow-down" }, s = t.icon instanceof F ? t.icon : new F(t.icon || n), r = t.sort instanceof F ? t.sort : new F(t.sort || a);
    this.icon = s, this.sort = r;
  }
}
function Bn(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function jr({ table: e, output: t }) {
  if (!e || !(e instanceof In))
    throw new Error("AlloyTable requires `table` (TableObject instance).");
  const n = re(e.id), [a, s] = I({ col: "", dir: "asc" }), r = me(
    () => Bn(e.rows),
    [e.rows]
  ), l = (c) => {
    if (!c) return;
    const d = a.col === c && a.dir === "asc" ? "desc" : "asc";
    s({ col: c, dir: d }), t == null || t({
      type: "column",
      name: c,
      dir: d
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
        const d = a.col === c, m = d && a.dir === "desc";
        return /* @__PURE__ */ i("th", { scope: "col", children: /* @__PURE__ */ A(
          "span",
          {
            onClick: () => l(c),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              Ln(c),
              d && /* @__PURE__ */ i(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: m ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: m ? "rotate(180deg)" : "none",
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
    /* @__PURE__ */ i("tbody", { children: e.rows.length > 0 ? e.rows.map((c, d) => /* @__PURE__ */ A(
      "tr",
      {
        onClick: () => o(c == null ? void 0 : c.id),
        style: { cursor: "pointer" },
        children: [
          /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i(ie, { icon: e.icon }) }),
          r.map((m) => /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i("span", { children: c == null ? void 0 : c[m] }) }, `${(c == null ? void 0 : c.id) ?? d}-${m}`))
        ]
      },
      (c == null ? void 0 : c.id) ?? d
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
function ne(e, t) {
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
  let [n, a] = Mn(e.path, e.caseSensitive, e.end), s = t.match(n);
  if (!s) return null;
  let r = s[0], l = r.replace(/(.)\/+$/, "$1"), o = s.slice(1);
  return {
    params: a.reduce((d, m, u) => {
      let {
        paramName: y,
        isOptional: x
      } = m;
      if (y === "*") {
        let g = o[u] || "";
        l = r.slice(0, r.length - g.length).replace(/(.)\/+$/, "$1");
      }
      const C = o[u];
      return x && !C ? d[y] = void 0 : d[y] = (C || "").replace(/%2F/g, "/"), d;
    }, {}),
    pathname: r,
    pathnameBase: l,
    pattern: e
  };
}
function Mn(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !0), $e(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let a = [], s = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (l, o, c) => (a.push({
    paramName: o,
    isOptional: c != null
  }), c ? "/?([^\\/]+)?" : "/([^\\/]+)"));
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
function _n(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: a = "",
    hash: s = ""
  } = typeof e == "string" ? an(e) : e;
  return {
    pathname: n ? n.startsWith("/") ? n : Dn(n, t) : t,
    search: Fn(a),
    hash: qn(s)
  };
}
function Dn(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? n.length > 1 && n.pop() : s !== "." && n.push(s);
  }), n.length > 1 ? n.join("/") : "/";
}
function tt(e, t, n, a) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(a) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function $n(e) {
  return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0);
}
function rn(e, t) {
  let n = $n(e);
  return t ? n.map((a, s) => s === n.length - 1 ? a.pathname : a.pathnameBase) : n.map((a) => a.pathnameBase);
}
function sn(e, t, n, a) {
  a === void 0 && (a = !1);
  let s;
  typeof e == "string" ? s = an(e) : (s = dt({}, e), ne(!s.pathname || !s.pathname.includes("?"), tt("?", "pathname", "search", s)), ne(!s.pathname || !s.pathname.includes("#"), tt("#", "pathname", "hash", s)), ne(!s.search || !s.search.includes("#"), tt("#", "search", "hash", s)));
  let r = e === "" || s.pathname === "", l = r ? "/" : s.pathname, o;
  if (l == null)
    o = n;
  else {
    let u = t.length - 1;
    if (!a && l.startsWith("..")) {
      let y = l.split("/");
      for (; y[0] === ".."; )
        y.shift(), u -= 1;
      s.pathname = y.join("/");
    }
    o = u >= 0 ? t[u] : "/";
  }
  let c = _n(s, o), d = l && l !== "/" && l.endsWith("/"), m = (r || l === ".") && n.endsWith("/");
  return !c.pathname.endsWith("/") && (d || m) && (c.pathname += "/"), c;
}
const wt = (e) => e.join("/").replace(/\/\/+/g, "/"), Fn = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, qn = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, on = ["post", "put", "patch", "delete"];
new Set(on);
const Un = ["get", ...on];
new Set(Un);
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
const Ze = /* @__PURE__ */ L.createContext(null);
process.env.NODE_ENV !== "production" && (Ze.displayName = "DataRouter");
const cn = /* @__PURE__ */ L.createContext(null);
process.env.NODE_ENV !== "production" && (cn.displayName = "DataRouterState");
const Wn = /* @__PURE__ */ L.createContext(null);
process.env.NODE_ENV !== "production" && (Wn.displayName = "Await");
const Ee = /* @__PURE__ */ L.createContext(null);
process.env.NODE_ENV !== "production" && (Ee.displayName = "Navigation");
const xt = /* @__PURE__ */ L.createContext(null);
process.env.NODE_ENV !== "production" && (xt.displayName = "Location");
const Ie = /* @__PURE__ */ L.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (Ie.displayName = "Route");
const Kn = /* @__PURE__ */ L.createContext(null);
process.env.NODE_ENV !== "production" && (Kn.displayName = "RouteError");
function Vn(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t;
  Et() || (process.env.NODE_ENV !== "production" ? ne(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : ne(!1));
  let {
    basename: a,
    navigator: s
  } = L.useContext(Ee), {
    hash: r,
    pathname: l,
    search: o
  } = qe(e, {
    relative: n
  }), c = l;
  return a !== "/" && (c = l === "/" ? a : wt([a, l])), s.createHref({
    pathname: c,
    search: o,
    hash: r
  });
}
function Et() {
  return L.useContext(xt) != null;
}
function Fe() {
  return Et() || (process.env.NODE_ENV !== "production" ? ne(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : ne(!1)), L.useContext(xt).location;
}
const ln = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function dn(e) {
  L.useContext(Ee).static || L.useLayoutEffect(e);
}
function Jn() {
  let {
    isDataRoute: e
  } = L.useContext(Ie);
  return e ? Qn() : Yn();
}
function Yn() {
  Et() || (process.env.NODE_ENV !== "production" ? ne(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : ne(!1));
  let e = L.useContext(Ze), {
    basename: t,
    future: n,
    navigator: a
  } = L.useContext(Ee), {
    matches: s
  } = L.useContext(Ie), {
    pathname: r
  } = Fe(), l = JSON.stringify(rn(s, n.v7_relativeSplatPath)), o = L.useRef(!1);
  return dn(() => {
    o.current = !0;
  }), L.useCallback(function(d, m) {
    if (m === void 0 && (m = {}), process.env.NODE_ENV !== "production" && $e(o.current, ln), !o.current) return;
    if (typeof d == "number") {
      a.go(d);
      return;
    }
    let u = sn(d, JSON.parse(l), r, m.relative === "path");
    e == null && t !== "/" && (u.pathname = u.pathname === "/" ? t : wt([t, u.pathname])), (m.replace ? a.replace : a.push)(u, m.state, m);
  }, [t, a, l, r, e]);
}
function qe(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    future: a
  } = L.useContext(Ee), {
    matches: s
  } = L.useContext(Ie), {
    pathname: r
  } = Fe(), l = JSON.stringify(rn(s, a.v7_relativeSplatPath));
  return L.useMemo(() => sn(e, JSON.parse(l), r, n === "path"), [e, l, r, n]);
}
var un = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(un || {}), Ct = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(Ct || {});
function fn(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function zn(e) {
  let t = L.useContext(Ze);
  return t || (process.env.NODE_ENV !== "production" ? ne(!1, fn(e)) : ne(!1)), t;
}
function Hn(e) {
  let t = L.useContext(Ie);
  return t || (process.env.NODE_ENV !== "production" ? ne(!1, fn(e)) : ne(!1)), t;
}
function mn(e) {
  let t = Hn(e), n = t.matches[t.matches.length - 1];
  return n.route.id || (process.env.NODE_ENV !== "production" ? ne(!1, e + ' can only be used on routes that contain a unique "id"') : ne(!1)), n.route.id;
}
function Gn() {
  return mn(Ct.UseRouteId);
}
function Qn() {
  let {
    router: e
  } = zn(un.UseNavigateStable), t = mn(Ct.UseNavigateStable), n = L.useRef(!1);
  return dn(() => {
    n.current = !0;
  }), L.useCallback(function(s, r) {
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
function Xn(e) {
  return et(e) && e.tagName.toLowerCase() === "button";
}
function Zn(e) {
  return et(e) && e.tagName.toLowerCase() === "form";
}
function ea(e) {
  return et(e) && e.tagName.toLowerCase() === "input";
}
function ta(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function na(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !ta(e);
}
let We = null;
function aa() {
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
const ra = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function nt(e) {
  return e != null && !ra.has(e) ? (process.env.NODE_ENV !== "production" && $e(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + Je + '"')), null) : e;
}
function sa(e, t) {
  let n, a, s, r, l;
  if (Zn(e)) {
    let o = e.getAttribute("action");
    a = o ? Re(o, t) : null, n = e.getAttribute("method") || Ve, s = nt(e.getAttribute("enctype")) || Je, r = new FormData(e);
  } else if (Xn(e) || ea(e) && (e.type === "submit" || e.type === "image")) {
    let o = e.form;
    if (o == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let c = e.getAttribute("formaction") || o.getAttribute("action");
    if (a = c ? Re(c, t) : null, n = e.getAttribute("formmethod") || o.getAttribute("method") || Ve, s = nt(e.getAttribute("formenctype")) || nt(o.getAttribute("enctype")) || Je, r = new FormData(o, e), !aa()) {
      let {
        name: d,
        type: m,
        value: u
      } = e;
      if (m === "image") {
        let y = d ? d + "." : "";
        r.append(y + "x", "0"), r.append(y + "y", "0");
      } else d && r.append(d, u);
    }
  } else {
    if (et(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    n = Ve, a = null, s = Je, l = e;
  }
  return r && s === "text/plain" && (l = r, r = void 0), {
    action: a,
    method: n.toLowerCase(),
    encType: s,
    formData: r,
    body: l
  };
}
const ia = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], oa = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], ca = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], la = "6";
try {
  window.__reactRouterVersion = la;
} catch {
}
const hn = /* @__PURE__ */ L.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (hn.displayName = "ViewTransition");
const da = /* @__PURE__ */ L.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (da.displayName = "Fetchers");
process.env.NODE_ENV;
const ua = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", fa = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, ke = /* @__PURE__ */ L.forwardRef(function(t, n) {
  let {
    onClick: a,
    relative: s,
    reloadDocument: r,
    replace: l,
    state: o,
    target: c,
    to: d,
    preventScrollReset: m,
    viewTransition: u
  } = t, y = At(t, ia), {
    basename: x
  } = L.useContext(Ee), C, g = !1;
  if (typeof d == "string" && fa.test(d) && (C = d, ua))
    try {
      let w = new URL(window.location.href), b = d.startsWith("//") ? new URL(w.protocol + d) : new URL(d), p = Re(b.pathname, x);
      b.origin === w.origin && p != null ? d = p + b.search + b.hash : g = !0;
    } catch {
      process.env.NODE_ENV !== "production" && $e(!1, '<Link to="' + d + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let f = Vn(d, {
    relative: s
  }), v = ya(d, {
    replace: l,
    state: o,
    target: c,
    preventScrollReset: m,
    relative: s,
    viewTransition: u
  });
  function h(w) {
    a && a(w), w.defaultPrevented || v(w);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ L.createElement("a", Le({}, y, {
      href: C || f,
      onClick: g || r ? a : h,
      ref: n,
      target: c
    }))
  );
});
process.env.NODE_ENV !== "production" && (ke.displayName = "Link");
const ma = /* @__PURE__ */ L.forwardRef(function(t, n) {
  let {
    "aria-current": a = "page",
    caseSensitive: s = !1,
    className: r = "",
    end: l = !1,
    style: o,
    to: c,
    viewTransition: d,
    children: m
  } = t, u = At(t, oa), y = qe(c, {
    relative: u.relative
  }), x = Fe(), C = L.useContext(cn), {
    navigator: g,
    basename: f
  } = L.useContext(Ee), v = C != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  xa(y) && d === !0, h = g.encodeLocation ? g.encodeLocation(y).pathname : y.pathname, w = x.pathname, b = C && C.navigation && C.navigation.location ? C.navigation.location.pathname : null;
  s || (w = w.toLowerCase(), b = b ? b.toLowerCase() : null, h = h.toLowerCase()), b && f && (b = Re(b, f) || b);
  const p = h !== "/" && h.endsWith("/") ? h.length - 1 : h.length;
  let N = w === h || !l && w.startsWith(h) && w.charAt(p) === "/", O = b != null && (b === h || !l && b.startsWith(h) && b.charAt(h.length) === "/"), R = {
    isActive: N,
    isPending: O,
    isTransitioning: v
  }, T = N ? a : void 0, V;
  typeof r == "function" ? V = r(R) : V = [r, N ? "active" : null, O ? "pending" : null, v ? "transitioning" : null].filter(Boolean).join(" ");
  let U = typeof o == "function" ? o(R) : o;
  return /* @__PURE__ */ L.createElement(ke, Le({}, u, {
    "aria-current": T,
    className: V,
    ref: n,
    style: U,
    to: c,
    viewTransition: d
  }), typeof m == "function" ? m(R) : m);
});
process.env.NODE_ENV !== "production" && (ma.displayName = "NavLink");
const ha = /* @__PURE__ */ L.forwardRef((e, t) => {
  let {
    fetcherKey: n,
    navigate: a,
    reloadDocument: s,
    replace: r,
    state: l,
    method: o = Ve,
    action: c,
    onSubmit: d,
    relative: m,
    preventScrollReset: u,
    viewTransition: y
  } = e, x = At(e, ca), C = Na(), g = wa(c, {
    relative: m
  }), f = o.toLowerCase() === "get" ? "get" : "post", v = (h) => {
    if (d && d(h), h.defaultPrevented) return;
    h.preventDefault();
    let w = h.nativeEvent.submitter, b = (w == null ? void 0 : w.getAttribute("formmethod")) || o;
    C(w || h.currentTarget, {
      fetcherKey: n,
      method: b,
      navigate: a,
      replace: r,
      state: l,
      relative: m,
      preventScrollReset: u,
      viewTransition: y
    });
  };
  return /* @__PURE__ */ L.createElement("form", Le({
    ref: t,
    method: f,
    action: g,
    onSubmit: s ? d : v
  }, x));
});
process.env.NODE_ENV !== "production" && (ha.displayName = "Form");
process.env.NODE_ENV;
var He;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(He || (He = {}));
var Bt;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Bt || (Bt = {}));
function pa(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function pn(e) {
  let t = L.useContext(Ze);
  return t || (process.env.NODE_ENV !== "production" ? ne(!1, pa(e)) : ne(!1)), t;
}
function ya(e, t) {
  let {
    target: n,
    replace: a,
    state: s,
    preventScrollReset: r,
    relative: l,
    viewTransition: o
  } = t === void 0 ? {} : t, c = Jn(), d = Fe(), m = qe(e, {
    relative: l
  });
  return L.useCallback((u) => {
    if (na(u, n)) {
      u.preventDefault();
      let y = a !== void 0 ? a : ut(d) === ut(m);
      c(e, {
        replace: y,
        state: s,
        preventScrollReset: r,
        relative: l,
        viewTransition: o
      });
    }
  }, [d, c, m, a, s, n, e, r, l, o]);
}
function va() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let ga = 0, ba = () => "__" + String(++ga) + "__";
function Na() {
  let {
    router: e
  } = pn(He.UseSubmit), {
    basename: t
  } = L.useContext(Ee), n = Gn();
  return L.useCallback(function(a, s) {
    s === void 0 && (s = {}), va();
    let {
      action: r,
      method: l,
      encType: o,
      formData: c,
      body: d
    } = sa(a, t);
    if (s.navigate === !1) {
      let m = s.fetcherKey || ba();
      e.fetch(m, n, s.action || r, {
        preventScrollReset: s.preventScrollReset,
        formData: c,
        body: d,
        formMethod: s.method || l,
        formEncType: s.encType || o,
        flushSync: s.flushSync
      });
    } else
      e.navigate(s.action || r, {
        preventScrollReset: s.preventScrollReset,
        formData: c,
        body: d,
        formMethod: s.method || l,
        formEncType: s.encType || o,
        replace: s.replace,
        state: s.state,
        fromRouteId: n,
        flushSync: s.flushSync,
        viewTransition: s.viewTransition
      });
  }, [e, t, n]);
}
function wa(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    basename: a
  } = L.useContext(Ee), s = L.useContext(Ie);
  s || (process.env.NODE_ENV !== "production" ? ne(!1, "useFormAction must be used inside a RouteContext") : ne(!1));
  let [r] = s.matches.slice(-1), l = Le({}, qe(e || ".", {
    relative: n
  })), o = Fe();
  if (e == null) {
    l.search = o.search;
    let c = new URLSearchParams(l.search), d = c.getAll("index");
    if (d.some((u) => u === "")) {
      c.delete("index"), d.filter((y) => y).forEach((y) => c.append("index", y));
      let u = c.toString();
      l.search = u ? "?" + u : "";
    }
  }
  return (!e || e === ".") && r.route.index && (l.search = l.search ? l.search.replace(/^\?/, "?index&") : "?index"), a !== "/" && (l.pathname = l.pathname === "/" ? a : wt([a, l.pathname])), ut(l);
}
function xa(e, t) {
  t === void 0 && (t = {});
  let n = L.useContext(hn);
  n == null && (process.env.NODE_ENV !== "production" ? ne(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : ne(!1));
  let {
    basename: a
  } = pn(He.useViewTransitionState), s = qe(e, {
    relative: t.relative
  });
  if (!n.isTransitioning)
    return !1;
  let r = Re(n.currentLocation.pathname, a) || n.currentLocation.pathname, l = Re(n.nextLocation.pathname, a) || n.nextLocation.pathname;
  return It(s.pathname, l) != null || It(s.pathname, r) != null;
}
function Ea(e) {
  return typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1);
}
class Ca {
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
function Aa(e) {
  return !e || e.length === 0 ? [] : Object.keys(e[0]).filter((t) => t !== "id");
}
function Pr({ tableLink: e, output: t }) {
  if (!e || !(e instanceof Ca))
    throw new Error(
      "AlloyTableLink requires `tableLink` (TableLinkObject instance)."
    );
  const n = re(e.id), [a, s] = I({ col: "", dir: "asc" }), r = me(
    () => Aa(e.rows),
    [e.rows]
  ), l = (o) => {
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
        const c = a.col === o, d = c && a.dir === "desc";
        return /* @__PURE__ */ i("th", { scope: "col", children: /* @__PURE__ */ A(
          "span",
          {
            onClick: () => l(o),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              Ea(o),
              c && /* @__PURE__ */ i(
                "span",
                {
                  className: "ms-1 d-inline-flex align-middle",
                  "aria-hidden": "true",
                  title: d ? "Sorted descending" : "Sorted ascending",
                  style: {
                    transform: d ? "rotate(180deg)" : "none",
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
      const d = (o == null ? void 0 : o.id) ?? c, u = `${e.link.endsWith("/") ? e.link.slice(0, -1) : e.link}/${d}`;
      return /* @__PURE__ */ A("tr", { children: [
        /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i(ie, { icon: e.icon }) }),
        r.map((y) => /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i(
          ke,
          {
            to: u,
            className: "text-decoration-none",
            onClick: () => t == null ? void 0 : t({
              type: "navigate",
              to: u,
              id: d
            }),
            children: /* @__PURE__ */ i("span", { children: o == null ? void 0 : o[y] })
          }
        ) }, `${d}-${y}`))
      ] }, d);
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
function Sa(e) {
  if (!Array.isArray(e) || e.length === 0) return [];
  const t = e[0] ?? {};
  return Object.keys(t).filter((n) => n !== "id");
}
function ka(e) {
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
  const n = re(e.id), a = me(
    () => Sa(e.rows),
    [e.rows]
  ), [s, r] = I({ col: "", dir: "asc" });
  function l(d) {
    const m = s.col === d && s.dir === "asc" ? "desc" : "asc";
    r({ col: d, dir: m });
    const u = new j({
      id: n.current,
      type: "column",
      action: "Sort",
      error: !1,
      data: {
        name: d,
        dir: m
      }
    });
    t == null || t(u);
  }
  function o(d) {
    return (m, u) => {
      const y = ka(m), x = new j({
        id: n.current,
        type: "table",
        action: y,
        error: !1,
        data: d
      });
      t == null || t(x);
    };
  }
  const c = !!e.actions;
  return /* @__PURE__ */ A("table", { id: n.current, className: e.className, children: [
    /* @__PURE__ */ i("caption", { className: "caption-top text-center", children: e.name }),
    /* @__PURE__ */ i("thead", { children: /* @__PURE__ */ A("tr", { children: [
      /* @__PURE__ */ i("th", { scope: "col", children: "Type" }),
      a.map((d) => {
        const m = s.col === d, u = m && s.dir === "desc";
        return /* @__PURE__ */ i("th", { scope: "col", children: /* @__PURE__ */ A(
          "span",
          {
            onClick: () => l(d),
            style: { userSelect: "none", cursor: "pointer" },
            children: [
              Oa(d),
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
                  children: /* @__PURE__ */ i(ie, { icon: e.sort })
                }
              )
            ]
          }
        ) }, `h-${d}`);
      }),
      c && /* @__PURE__ */ i("th", { scope: "col", className: "text-end", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ i("tbody", { children: e.rows.length > 0 ? e.rows.map((d, m) => {
      const u = (d == null ? void 0 : d.id) ?? m, y = e.actions;
      return /* @__PURE__ */ A("tr", { children: [
        /* @__PURE__ */ i("td", { children: /* @__PURE__ */ i(ie, { icon: e.icon }) }),
        a.map((x) => {
          const C = e.link || "", g = C.endsWith("/") ? C.slice(0, -1) : C, f = g ? `${g}/${u}` : "";
          return /* @__PURE__ */ i("td", { children: g ? /* @__PURE__ */ i(
            ke,
            {
              to: f,
              onClick: () => {
                const v = new j({
                  id: n.current,
                  type: "row",
                  action: "navigate",
                  error: !1,
                  data: {
                    to: f,
                    ...d
                  }
                });
                t == null || t(v);
              },
              className: "text-decoration-none",
              children: /* @__PURE__ */ i("span", { children: d == null ? void 0 : d[x] })
            }
          ) : /* @__PURE__ */ i("span", { children: d == null ? void 0 : d[x] }) }, `${u}-${x}`);
        }),
        c && /* @__PURE__ */ i("td", { className: "text-end", children: /* @__PURE__ */ i(
          Xe,
          {
            buttonBar: y,
            output: o(d)
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
class mt {
  /**
   * @param {Object} card
   */
  constructor(t = {}) {
    this.id = t.id ?? B("card"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "";
    const n = t.header ?? {};
    this.header = n instanceof oe ? n : new oe(n);
    const a = t.body ?? {};
    this.body = a instanceof oe ? a : new oe(a);
    const s = Array.isArray(t.fields) ? t.fields : [];
    if (s.length === 0)
      throw new Error(
        "CardObject requires at least one field in `fields`."
      );
    this.fields = s.map(
      (l) => l instanceof oe ? l : new oe(l || {})
    );
    const r = t.footer ?? {};
    this.footer = r instanceof oe ? r : new oe(r);
  }
}
function ja({ card: e }) {
  var o, c;
  if (!e || !(e instanceof mt))
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
      children: /* @__PURE__ */ i("div", { className: "row g-2", children: e.fields.map((d) => {
        if (!d) return null;
        const m = d.id, u = d.colClass || "col-12";
        return /* @__PURE__ */ i("div", { className: u, children: /* @__PURE__ */ i(
          "div",
          {
            id: d.id,
            className: d.className,
            "aria-label": d.ariaLabel,
            children: d.hasLogo() ? (
              // Logo-only field
              /* @__PURE__ */ i(
                "img",
                {
                  src: d.logo.imageUrl,
                  alt: d.logo.alt,
                  width: d.logo.width,
                  height: d.logo.height,
                  className: d.logo.className
                }
              )
            ) : d.hasIcon() ? (
              // Icon-only field
              /* @__PURE__ */ i(ie, { icon: d.icon })
            ) : d.hasText() ? (
              // Text-only field
              /* @__PURE__ */ i("span", { children: d.name })
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
  ) : a, l = e.footer && (e.footer.hasText() || ((c = e.footer.className) == null ? void 0 : c.trim().length)) ? /* @__PURE__ */ i(
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
    l
  ] });
}
class ht {
  constructor(t = {}) {
    this.id = t.id ?? B("card-action"), this.className = t.className ?? "card border m-2 shadow", this.link = typeof t.link == "string" ? t.link : "";
    const n = t.header ?? {};
    this.header = n instanceof oe ? n : new oe(n);
    const a = t.body ?? {};
    this.body = a instanceof oe ? a : new oe(a);
    const s = Array.isArray(t.fields) ? t.fields : [];
    if (s.length === 0)
      throw new Error(
        "CardActionObject requires at least one field in `fields`."
      );
    this.fields = s.map(
      (o) => o instanceof oe ? o : new oe(o || {})
    );
    const r = t.footer ?? {};
    this.footer = r instanceof oe ? r : new oe(r), this.type = t.type ?? "AlloyButtonBar";
    const l = t.action;
    if (this.type === "AlloyLinkBar" ? this.action = l instanceof ge ? l : l ? new ge(l) : void 0 : this.action = l instanceof xe ? l : l ? new xe(l) : void 0, !this.action)
      throw new Error(
        "CardActionObject requires `action` (ButtonBarObject or LinkBarObject)."
      );
  }
}
function Pa({ cardAction: e, output: t }) {
  var x, C;
  if (!e || !(e instanceof ht))
    throw new Error(
      "AlloyCardAction requires `cardAction` (CardActionObject instance)."
    );
  function n(g) {
    if (typeof t != "function") return;
    const f = g && typeof g.toJSON == "function" ? g.toJSON() : g || {}, { error: v = !1, errorMessage: h = [] } = f, w = a(f), b = {};
    Array.isArray(e.fields) && e.fields.forEach((N) => {
      if (!N) return;
      const O = N.id, R = N.name;
      O && typeof R < "u" && (b[O] = R);
    });
    const p = new j({
      id: e.id,
      type: "card-action",
      action: w,
      error: !!v,
      errorMessage: h || [],
      data: b
    });
    t(p);
  }
  function a(g) {
    if (!g || typeof g != "object") return "";
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
    }, v = g.data && typeof g.data == "object" ? g.data : null;
    if (v) {
      if (v.action && typeof v.action == "object") {
        const w = f(v.action);
        if (w) return w;
      }
      if (v.button && typeof v.button == "object") {
        const w = f(v.button);
        if (w) return w;
      }
      if (v.link && typeof v.link == "object") {
        const w = f(v.link);
        if (w) return w;
      }
      const h = f(v);
      if (h) return h;
    }
    return f(g);
  }
  const r = e.header && (e.header.hasText() || ((x = e.header.className) == null ? void 0 : x.trim())) ? /* @__PURE__ */ i(
    "div",
    {
      id: e.header.id,
      className: e.header.className ?? "card-header py-2 fw-semibold",
      "aria-label": e.header.ariaLabel,
      children: e.header.name
    }
  ) : null, l = /* @__PURE__ */ i(
    "div",
    {
      id: e.body.id,
      className: e.body.className ?? "card-body",
      "aria-label": e.body.ariaLabel,
      children: /* @__PURE__ */ i("div", { className: "row g-2", children: e.fields.map((g) => {
        if (!g) return null;
        const f = g.id, v = g.colClass || "col-12";
        return /* @__PURE__ */ i("div", { className: v, children: /* @__PURE__ */ i(
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
        ) }, f);
      }) })
    }
  ), o = e.link ? /* @__PURE__ */ i(
    ke,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (C = e.body) == null ? void 0 : C.ariaLabel,
      children: l
    }
  ) : l, c = e.footer && e.footer.hasText(), d = !!e.action, m = d && e.type === "AlloyLinkBar" ? /* @__PURE__ */ i(Me, { linkBar: e.action, output: n }) : d ? /* @__PURE__ */ i(Xe, { buttonBar: e.action, output: n }) : null, y = c || d ? /* @__PURE__ */ A(
    "div",
    {
      id: e.footer.id,
      className: e.footer.className ?? "card-footer d-flex align-items-center gap-2 py-2",
      "aria-label": e.footer.ariaLabel,
      children: [
        c && /* @__PURE__ */ i("div", { className: "me-auto small text-muted", children: e.footer.name }),
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
        o,
        y
      ]
    }
  );
}
class Ae {
  constructor(t = {}) {
    const {
      id: n,
      title: a = "AlloyMobile",
      className: s = "col m-2",
      message: r = "",
      action: l = "",
      type: o = "AlloyInputTextIcon",
      submit: c,
      fields: d,
      data: m
    } = t;
    this.id = n ?? B("form"), this.title = a, this.className = s, this.message = r, this.action = l, this.type = o, this.submit = c instanceof Te ? c : new Te(
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
    const u = Array.isArray(d) ? d : [];
    this.fields = u.map(
      (y) => y instanceof le ? y : new le(y)
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
function Ot({ form: e, output: t }) {
  const n = e instanceof Ae ? e : new Ae(e || {});
  if (!n || !Array.isArray(n.fields) || !(n.submit instanceof Te))
    throw new Error(
      "AlloyForm could not hydrate a valid FormObject (missing fields[] or submit)."
    );
  const [a, s] = I(() => {
    const u = {}, y = {};
    return n.fields.forEach((x) => {
      y[x.name] = x.value;
    }), n.fields.forEach((x) => {
      const C = x.value, { valid: g, error: f, errors: v } = Mt(
        x,
        C,
        y
      );
      u[x.name] = {
        value: C,
        valid: g,
        error: f,
        errors: v
      };
    }), u;
  }), r = re(null), l = En(
    (u) => {
      const y = {};
      Object.keys(u).forEach((C) => {
        y[C] = u[C].value;
      });
      const x = {};
      return n.fields.forEach((C) => {
        const g = y[C.name], { valid: f, error: v, errors: h } = Mt(
          C,
          g,
          y
        );
        x[C.name] = {
          value: g,
          valid: f,
          error: v,
          errors: h
        };
      }), x;
    },
    [n.fields]
  );
  function o(u) {
    const y = u instanceof j ? u.data || {} : u || {}, { name: x, value: C } = y;
    x && s((g) => {
      const f = { ...g };
      return f[x] = {
        ...g[x] || {
          value: void 0,
          valid: !0,
          error: !1,
          errors: []
        },
        value: C
      }, l(f);
    });
  }
  const c = me(() => {
    const u = {};
    return Object.keys(a).forEach((y) => {
      u[y] = a[y].value;
    }), u;
  }, [a]), d = me(() => Object.values(a).some(
    (u) => u.error || !u.valid
  ), [a]);
  function m(u) {
    let y = !1;
    Object.values(a).forEach((f) => {
      (f.error || !f.valid) && (y = !0);
    });
    const x = { ...c };
    n.data = x, n.message = "";
    const C = y ? { ...a } : x, g = new j({
      id: n.id,
      // top-level id, as you requested
      type: "form",
      action: "submit",
      data: C,
      error: y
      // no errorMessage; all useful info is inside data for error=true
    });
    t == null || t(g);
  }
  return n.submit.disabled = d || !!n.submit.loading, /* @__PURE__ */ i("div", { className: "row", children: /* @__PURE__ */ i("div", { className: n.className, children: /* @__PURE__ */ A("div", { className: "text-center", children: [
    /* @__PURE__ */ i("h3", { children: n.title }),
    n.message !== "" && /* @__PURE__ */ i("div", { className: "alert alert-text-danger m-0 p-0", children: n.message }),
    n.fields.map((u) => /* @__PURE__ */ i(
      Oe,
      {
        input: u,
        output: o
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
class Ta {
  constructor(t = {}) {
    this.id = t.id ?? B("tab"), this.key = t.key ?? this.id, this.title = t.title ?? "", this.subtitle = t.subtitle ?? "", this.order = typeof t.order == "number" ? t.order : 0, this.required = !!t.required, this.stage = t.stage ?? "", this.status = t.status ?? "", this.icon = t.icon ? t.icon instanceof F ? t.icon : new F(t.icon) : null, this.inputs = Array.isArray(t.inputs) ? t.inputs : [];
  }
}
class Ra {
  constructor(t = {}) {
    this.id = t.id ?? B("tab-form"), this.name = t.name ?? "", this.status = t.status ?? "draft";
    const a = (Array.isArray(t.tabs) ? t.tabs : []).map((l) => new Ta(l));
    this.tabs = a.sort((l, o) => l.order - o.order);
    let s = typeof t.currentIndex == "number" ? t.currentIndex : 0;
    s < 0 && (s = 0), s >= this.tabs.length && (s = this.tabs.length - 1), this.currentIndex = this.tabs.length > 0 ? s : 0;
    const r = t.navButtons || {};
    this.navButtons = {
      previous: r.previous ? new ce({
        ...r.previous,
        name: r.previous.name || r.previous.label || "Previous"
      }) : null,
      next: r.next ? new ce({
        ...r.next,
        name: r.next.name || r.next.label || "Next"
      }) : null,
      finish: r.finish ? new ce({
        ...r.finish,
        name: r.finish.name || r.finish.label || "Finish"
      }) : null
    };
  }
}
function La(e) {
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
    const r = [], l = typeof t[s] < "u" ? t[s] : a.value;
    if (a.required && (a.type === "checkbox" ? l || r.push("This field is required.") : (l === "" || l === null || typeof l > "u") && r.push("This field is required.")), a.matchWith) {
      const o = a.matchWith, c = t[o];
      l !== c && r.push("Values do not match.");
    }
    r.length > 0 && (n[s] = r);
  }), n;
}
function Tr({ tabForm: e, output: t }) {
  if (!e || !(e instanceof Ra))
    throw new Error("AlloyTabForm requires `tabForm` (TabFormObject instance).");
  const [n, a] = I(e.currentIndex), [s, r] = I(() => La(e)), [l, o] = I({}), c = e.tabs, d = c.length, m = c[n] || null, u = m ? m.key : "", y = e.navButtons || {};
  function x(T, V, U, H) {
    const Q = s[T] || {};
    return Object.prototype.hasOwnProperty.call(Q, V) ? Q[V] : typeof U < "u" ? U : H === "checkbox" ? !1 : "";
  }
  function C(T, V) {
    var te, ee, de;
    const U = V && typeof V.toJSON == "function" ? V.toJSON() : V, H = (te = U == null ? void 0 : U.data) == null ? void 0 : te.name, Q = (ee = U == null ? void 0 : U.data) == null ? void 0 : ee.value, X = ((de = U == null ? void 0 : U.data) == null ? void 0 : de.errors) || [];
    H && (r((Z) => {
      const ve = { ...Z }, E = { ...ve[T] || {} };
      return E[H] = Q, ve[T] = E, ve;
    }), o((Z) => {
      const ve = { ...Z }, E = { ...ve[T] || {} };
      return X.length > 0 ? E[H] = X : delete E[H], ve[T] = E, ve;
    }));
  }
  function g(T, V, U, H, Q) {
    const X = c[V] || m, te = X ? X.key : u, ee = {
      currentIndex: V,
      currentTabKey: te,
      values: U
    };
    if (Q && H && Object.keys(H).length > 0 && (ee.errors = H, ee.message = "Validation failed for current step."), typeof t != "function") return;
    const de = Q ? j.errorOf({
      id: e.id,
      type: "tab-form",
      action: T === "finish" ? "submit" : "draft",
      data: ee
    }) : j.ok({
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
    a(T), g("previous", T, s, l, !1);
  }
  function v() {
    if (!m || n >= d - 1) return;
    const T = m.key, V = s[T] || {}, U = _t(m, V);
    if (Object.keys(U).length > 0) {
      const X = {
        ...l,
        [T]: U
      };
      o(X), g("next", n, s, X, !0);
      return;
    }
    const H = n + 1;
    a(H);
    const Q = { ...l };
    delete Q[T], o(Q), g("next", H, s, Q, !1);
  }
  function h() {
    if (!m) return;
    const T = m.key, V = s[T] || {}, U = _t(m, V);
    if (Object.keys(U).length > 0) {
      const Q = {
        ...l,
        [T]: U
      };
      o(Q), g("finish", n, s, Q, !0);
      return;
    }
    const H = { ...l };
    delete H[T], o(H), g("finish", n, s, H, !1);
  }
  if (!m)
    return /* @__PURE__ */ i("div", { className: "alert alert-warning", children: "No steps defined for this TabForm." });
  const w = n > 0, b = n === d - 1, p = !b, N = w && (y.previous || new ce({
    name: "Previous",
    icon: { iconClass: "fa-solid fa-arrow-left" },
    className: "btn btn-primary"
  })), O = p && (y.next || new ce({
    name: "Next",
    icon: { iconClass: "fa-solid fa-arrow-right" },
    className: "btn btn-primary"
  })), R = b && (y.finish || new ce({
    name: "Finish",
    icon: { iconClass: "fa-solid fa-paper-plane" },
    className: "btn btn-primary"
  }));
  return /* @__PURE__ */ A("div", { className: "alloy-tab-form", children: [
    /* @__PURE__ */ i("ul", { className: "nav nav-tabs mb-3 flex-wrap", children: c.map((T, V) => /* @__PURE__ */ i("li", { className: "nav-item", children: /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        className: `nav-link ${V === n ? "active" : ""}`,
        onClick: () => a(V),
        children: [
          T.icon && /* @__PURE__ */ i("span", { className: "me-1", children: /* @__PURE__ */ i(ie, { icon: T.icon }) }),
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
            ), Q = (l[m.key] || {})[T.name] || [], X = Q.length > 0, te = new le({
              ...T,
              value: U,
              errors: Q,
              invalid: X
            });
            return /* @__PURE__ */ i(
              Oe,
              {
                input: te,
                output: (ee) => C(m.key, ee)
              },
              `inp-${V}`
            );
          }) }) }),
          /* @__PURE__ */ A("div", { className: "d-flex justify-content-between mt-4", children: [
            w ? /* @__PURE__ */ i(
              Se,
              {
                buttonIcon: N,
                output: () => f()
              }
            ) : /* @__PURE__ */ i("span", {}),
            /* @__PURE__ */ A("div", { className: "d-flex gap-2 ms-auto", children: [
              p && /* @__PURE__ */ i(
                Se,
                {
                  buttonIcon: O,
                  output: () => v()
                }
              ),
              b && /* @__PURE__ */ i(
                Se,
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
      submit: l,
      fields: o = [],
      data: c = {},
      ...d
    } = t;
    this.id = n ?? B("modal"), this.title = a ?? "", this.className = s ?? "modal fade", this.action = r ?? "", l instanceof he ? this.submit = l : l && typeof l == "object" ? this.submit = new he(l) : this.submit = null, this.fields = o.map(
      (u) => u instanceof le ? u : new le(u)
    );
    const m = {};
    this.fields.forEach((u) => {
      m[u.name] = u.value;
    }), this.data = { ...m, ...c }, Object.assign(this, d);
  }
}
function Dt(e) {
  const t = {};
  return e && Array.isArray(e.fields) && e.fields.forEach((n) => {
    n instanceof le && (t[n.name] = n.value);
  }), { ...t, ...e.data || {} };
}
function Ia(e) {
  return Object.values(e).some(
    (t) => Array.isArray(t) && t.length > 0
  );
}
function Ba(e) {
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
function St({ modal: e, output: t }) {
  if (!e || !(e instanceof we))
    throw new Error("AlloyModal requires `modal` (ModalObject instance).");
  if (!e.submit || !(e.submit instanceof he))
    throw new Error(
      "ModalObject.submit must be a ButtonObject instance for AlloyModal."
    );
  const [n, a] = I(() => Dt(e)), [s, r] = I({});
  be(() => {
    a(Dt(e)), r({});
  }, [e]);
  const l = (c) => {
    if (!c || !(c instanceof j)) return;
    const { data: d, error: m } = c;
    if (!d || !d.name) return;
    const { name: u, value: y, errors: x = [] } = d;
    a((C) => ({
      ...C,
      [u]: y
    })), r((C) => ({
      ...C,
      [u]: m ? x : []
    }));
  }, o = () => {
    if (typeof t != "function") return;
    const c = { ...n };
    if (Ia(s)) {
      const m = j.errorOf({
        id: e.id,
        type: "modal",
        action: "submit",
        message: "Validation failed",
        data: {
          ...c,
          errors: s
        }
      });
      t(m);
      return;
    }
    const d = j.ok({
      id: e.id,
      type: "modal",
      action: "submit",
      data: c
    });
    t(d), Ba(e.id);
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
          Oe,
          {
            input: c,
            output: l
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
          /* @__PURE__ */ i(Qe, { button: e.submit, output: o })
        ] })
      ] }) })
    }
  );
}
class Ma {
  /**
   * @param {ModalToastConfig} modalToast
   */
  constructor(t = {}) {
    const {
      id: n,
      title: a,
      className: s,
      action: r,
      submit: l,
      message: o,
      ...c
    } = t;
    this.id = n ?? B("modalToast"), this.title = a ?? "", this.className = s ?? "modal fade", this.action = r ?? "", l instanceof he ? this.submit = l : l && typeof l == "object" ? this.submit = new he(l) : this.submit = null, this.message = o ?? "", Object.assign(this, c);
  }
}
function _a(e) {
  const t = document.getElementById(e);
  if (!t) return;
  const n = t.querySelector('[data-bs-dismiss="modal"]');
  n && typeof n.click == "function" && n.click();
}
function Rr({ modalToast: e, output: t }) {
  if (!e || !(e instanceof Ma))
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
    _a(e.id);
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
function Da(e) {
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
function $a() {
  if ($t) return J;
  $t = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, a = e ? Symbol.for("react.fragment") : 60107, s = e ? Symbol.for("react.strict_mode") : 60108, r = e ? Symbol.for("react.profiler") : 60114, l = e ? Symbol.for("react.provider") : 60109, o = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, d = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, u = e ? Symbol.for("react.suspense") : 60113, y = e ? Symbol.for("react.suspense_list") : 60120, x = e ? Symbol.for("react.memo") : 60115, C = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, v = e ? Symbol.for("react.responder") : 60118, h = e ? Symbol.for("react.scope") : 60119;
  function w(p) {
    if (typeof p == "object" && p !== null) {
      var N = p.$$typeof;
      switch (N) {
        case t:
          switch (p = p.type, p) {
            case c:
            case d:
            case a:
            case r:
            case s:
            case u:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case o:
                case m:
                case C:
                case x:
                case l:
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
    return w(p) === d;
  }
  return J.AsyncMode = c, J.ConcurrentMode = d, J.ContextConsumer = o, J.ContextProvider = l, J.Element = t, J.ForwardRef = m, J.Fragment = a, J.Lazy = C, J.Memo = x, J.Portal = n, J.Profiler = r, J.StrictMode = s, J.Suspense = u, J.isAsyncMode = function(p) {
    return b(p) || w(p) === c;
  }, J.isConcurrentMode = b, J.isContextConsumer = function(p) {
    return w(p) === o;
  }, J.isContextProvider = function(p) {
    return w(p) === l;
  }, J.isElement = function(p) {
    return typeof p == "object" && p !== null && p.$$typeof === t;
  }, J.isForwardRef = function(p) {
    return w(p) === m;
  }, J.isFragment = function(p) {
    return w(p) === a;
  }, J.isLazy = function(p) {
    return w(p) === C;
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
    return typeof p == "string" || typeof p == "function" || p === a || p === d || p === r || p === s || p === u || p === y || typeof p == "object" && p !== null && (p.$$typeof === C || p.$$typeof === x || p.$$typeof === l || p.$$typeof === o || p.$$typeof === m || p.$$typeof === f || p.$$typeof === v || p.$$typeof === h || p.$$typeof === g);
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
function Fa() {
  return Ft || (Ft = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, a = e ? Symbol.for("react.fragment") : 60107, s = e ? Symbol.for("react.strict_mode") : 60108, r = e ? Symbol.for("react.profiler") : 60114, l = e ? Symbol.for("react.provider") : 60109, o = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, d = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, u = e ? Symbol.for("react.suspense") : 60113, y = e ? Symbol.for("react.suspense_list") : 60120, x = e ? Symbol.for("react.memo") : 60115, C = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, v = e ? Symbol.for("react.responder") : 60118, h = e ? Symbol.for("react.scope") : 60119;
    function w(S) {
      return typeof S == "string" || typeof S == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      S === a || S === d || S === r || S === s || S === u || S === y || typeof S == "object" && S !== null && (S.$$typeof === C || S.$$typeof === x || S.$$typeof === l || S.$$typeof === o || S.$$typeof === m || S.$$typeof === f || S.$$typeof === v || S.$$typeof === h || S.$$typeof === g);
    }
    function b(S) {
      if (typeof S == "object" && S !== null) {
        var Ne = S.$$typeof;
        switch (Ne) {
          case t:
            var Ue = S.type;
            switch (Ue) {
              case c:
              case d:
              case a:
              case r:
              case s:
              case u:
                return Ue;
              default:
                var Pt = Ue && Ue.$$typeof;
                switch (Pt) {
                  case o:
                  case m:
                  case C:
                  case x:
                  case l:
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
    var p = c, N = d, O = o, R = l, T = t, V = m, U = a, H = C, Q = x, X = n, te = r, ee = s, de = u, Z = !1;
    function ve(S) {
      return Z || (Z = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), E(S) || b(S) === c;
    }
    function E(S) {
      return b(S) === d;
    }
    function k(S) {
      return b(S) === o;
    }
    function _(S) {
      return b(S) === l;
    }
    function D(S) {
      return typeof S == "object" && S !== null && S.$$typeof === t;
    }
    function P(S) {
      return b(S) === m;
    }
    function q(S) {
      return b(S) === a;
    }
    function M(S) {
      return b(S) === C;
    }
    function $(S) {
      return b(S) === x;
    }
    function W(S) {
      return b(S) === n;
    }
    function z(S) {
      return b(S) === r;
    }
    function K(S) {
      return b(S) === s;
    }
    function fe(S) {
      return b(S) === u;
    }
    Y.AsyncMode = p, Y.ConcurrentMode = N, Y.ContextConsumer = O, Y.ContextProvider = R, Y.Element = T, Y.ForwardRef = V, Y.Fragment = U, Y.Lazy = H, Y.Memo = Q, Y.Portal = X, Y.Profiler = te, Y.StrictMode = ee, Y.Suspense = de, Y.isAsyncMode = ve, Y.isConcurrentMode = E, Y.isContextConsumer = k, Y.isContextProvider = _, Y.isElement = D, Y.isForwardRef = P, Y.isFragment = q, Y.isLazy = M, Y.isMemo = $, Y.isPortal = W, Y.isProfiler = z, Y.isStrictMode = K, Y.isSuspense = fe, Y.isValidElementType = w, Y.typeOf = b;
  }()), Y;
}
var qt;
function vn() {
  return qt || (qt = 1, process.env.NODE_ENV === "production" ? Ke.exports = $a() : Ke.exports = Fa()), Ke.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var at, Ut;
function qa() {
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
      for (var l = {}, o = 0; o < 10; o++)
        l["_" + String.fromCharCode(o)] = o;
      var c = Object.getOwnPropertyNames(l).map(function(m) {
        return l[m];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var d = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(m) {
        d[m] = m;
      }), Object.keys(Object.assign({}, d)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return at = s() ? Object.assign : function(r, l) {
    for (var o, c = a(r), d, m = 1; m < arguments.length; m++) {
      o = Object(arguments[m]);
      for (var u in o)
        t.call(o, u) && (c[u] = o[u]);
      if (e) {
        d = e(o);
        for (var y = 0; y < d.length; y++)
          n.call(o, d[y]) && (c[d[y]] = o[d[y]]);
      }
    }
    return c;
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
function Ua() {
  if (Vt) return it;
  Vt = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = kt(), n = {}, a = gn();
    e = function(r) {
      var l = "Warning: " + r;
      typeof console < "u" && console.error(l);
      try {
        throw new Error(l);
      } catch {
      }
    };
  }
  function s(r, l, o, c, d) {
    if (process.env.NODE_ENV !== "production") {
      for (var m in r)
        if (a(r, m)) {
          var u;
          try {
            if (typeof r[m] != "function") {
              var y = Error(
                (c || "React class") + ": " + o + " type `" + m + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[m] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw y.name = "Invariant Violation", y;
            }
            u = r[m](l, m, c, o, null, t);
          } catch (C) {
            u = C;
          }
          if (u && !(u instanceof Error) && e(
            (c || "React class") + ": type specification of " + o + " `" + m + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof u + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), u instanceof Error && !(u.message in n)) {
            n[u.message] = !0;
            var x = d ? d() : "";
            e(
              "Failed " + o + " type: " + u.message + (x ?? "")
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
function Wa() {
  if (Jt) return ot;
  Jt = 1;
  var e = vn(), t = qa(), n = kt(), a = gn(), s = Ua(), r = function() {
  };
  process.env.NODE_ENV !== "production" && (r = function(o) {
    var c = "Warning: " + o;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function l() {
    return null;
  }
  return ot = function(o, c) {
    var d = typeof Symbol == "function" && Symbol.iterator, m = "@@iterator";
    function u(E) {
      var k = E && (d && E[d] || E[m]);
      if (typeof k == "function")
        return k;
    }
    var y = "<<anonymous>>", x = {
      array: v("array"),
      bigint: v("bigint"),
      bool: v("boolean"),
      func: v("function"),
      number: v("number"),
      object: v("object"),
      string: v("string"),
      symbol: v("symbol"),
      any: h(),
      arrayOf: w,
      element: b(),
      elementType: p(),
      instanceOf: N,
      node: V(),
      objectOf: R,
      oneOf: O,
      oneOfType: T,
      shape: H,
      exact: Q
    };
    function C(E, k) {
      return E === k ? E !== 0 || 1 / E === 1 / k : E !== E && k !== k;
    }
    function g(E, k) {
      this.message = E, this.data = k && typeof k == "object" ? k : {}, this.stack = "";
    }
    g.prototype = Error.prototype;
    function f(E) {
      if (process.env.NODE_ENV !== "production")
        var k = {}, _ = 0;
      function D(q, M, $, W, z, K, fe) {
        if (W = W || y, K = K || $, fe !== n) {
          if (c) {
            var S = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw S.name = "Invariant Violation", S;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Ne = W + ":" + $;
            !k[Ne] && // Avoid spamming the console because they are often not actionable except for lib authors
            _ < 3 && (r(
              "You are manually calling a React.PropTypes validation function for the `" + K + "` prop on `" + W + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), k[Ne] = !0, _++);
          }
        }
        return M[$] == null ? q ? M[$] === null ? new g("The " + z + " `" + K + "` is marked as required " + ("in `" + W + "`, but its value is `null`.")) : new g("The " + z + " `" + K + "` is marked as required in " + ("`" + W + "`, but its value is `undefined`.")) : null : E(M, $, W, z, K);
      }
      var P = D.bind(null, !1);
      return P.isRequired = D.bind(null, !0), P;
    }
    function v(E) {
      function k(_, D, P, q, M, $) {
        var W = _[D], z = ee(W);
        if (z !== E) {
          var K = de(W);
          return new g(
            "Invalid " + q + " `" + M + "` of type " + ("`" + K + "` supplied to `" + P + "`, expected ") + ("`" + E + "`."),
            { expectedType: E }
          );
        }
        return null;
      }
      return f(k);
    }
    function h() {
      return f(l);
    }
    function w(E) {
      function k(_, D, P, q, M) {
        if (typeof E != "function")
          return new g("Property `" + M + "` of component `" + P + "` has invalid PropType notation inside arrayOf.");
        var $ = _[D];
        if (!Array.isArray($)) {
          var W = ee($);
          return new g("Invalid " + q + " `" + M + "` of type " + ("`" + W + "` supplied to `" + P + "`, expected an array."));
        }
        for (var z = 0; z < $.length; z++) {
          var K = E($, z, P, q, M + "[" + z + "]", n);
          if (K instanceof Error)
            return K;
        }
        return null;
      }
      return f(k);
    }
    function b() {
      function E(k, _, D, P, q) {
        var M = k[_];
        if (!o(M)) {
          var $ = ee(M);
          return new g("Invalid " + P + " `" + q + "` of type " + ("`" + $ + "` supplied to `" + D + "`, expected a single ReactElement."));
        }
        return null;
      }
      return f(E);
    }
    function p() {
      function E(k, _, D, P, q) {
        var M = k[_];
        if (!e.isValidElementType(M)) {
          var $ = ee(M);
          return new g("Invalid " + P + " `" + q + "` of type " + ("`" + $ + "` supplied to `" + D + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return f(E);
    }
    function N(E) {
      function k(_, D, P, q, M) {
        if (!(_[D] instanceof E)) {
          var $ = E.name || y, W = ve(_[D]);
          return new g("Invalid " + q + " `" + M + "` of type " + ("`" + W + "` supplied to `" + P + "`, expected ") + ("instance of `" + $ + "`."));
        }
        return null;
      }
      return f(k);
    }
    function O(E) {
      if (!Array.isArray(E))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? r(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : r("Invalid argument supplied to oneOf, expected an array.")), l;
      function k(_, D, P, q, M) {
        for (var $ = _[D], W = 0; W < E.length; W++)
          if (C($, E[W]))
            return null;
        var z = JSON.stringify(E, function(fe, S) {
          var Ne = de(S);
          return Ne === "symbol" ? String(S) : S;
        });
        return new g("Invalid " + q + " `" + M + "` of value `" + String($) + "` " + ("supplied to `" + P + "`, expected one of " + z + "."));
      }
      return f(k);
    }
    function R(E) {
      function k(_, D, P, q, M) {
        if (typeof E != "function")
          return new g("Property `" + M + "` of component `" + P + "` has invalid PropType notation inside objectOf.");
        var $ = _[D], W = ee($);
        if (W !== "object")
          return new g("Invalid " + q + " `" + M + "` of type " + ("`" + W + "` supplied to `" + P + "`, expected an object."));
        for (var z in $)
          if (a($, z)) {
            var K = E($, z, P, q, M + "." + z, n);
            if (K instanceof Error)
              return K;
          }
        return null;
      }
      return f(k);
    }
    function T(E) {
      if (!Array.isArray(E))
        return process.env.NODE_ENV !== "production" && r("Invalid argument supplied to oneOfType, expected an instance of array."), l;
      for (var k = 0; k < E.length; k++) {
        var _ = E[k];
        if (typeof _ != "function")
          return r(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Z(_) + " at index " + k + "."
          ), l;
      }
      function D(P, q, M, $, W) {
        for (var z = [], K = 0; K < E.length; K++) {
          var fe = E[K], S = fe(P, q, M, $, W, n);
          if (S == null)
            return null;
          S.data && a(S.data, "expectedType") && z.push(S.data.expectedType);
        }
        var Ne = z.length > 0 ? ", expected one of type [" + z.join(", ") + "]" : "";
        return new g("Invalid " + $ + " `" + W + "` supplied to " + ("`" + M + "`" + Ne + "."));
      }
      return f(D);
    }
    function V() {
      function E(k, _, D, P, q) {
        return X(k[_]) ? null : new g("Invalid " + P + " `" + q + "` supplied to " + ("`" + D + "`, expected a ReactNode."));
      }
      return f(E);
    }
    function U(E, k, _, D, P) {
      return new g(
        (E || "React class") + ": " + k + " type `" + _ + "." + D + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + P + "`."
      );
    }
    function H(E) {
      function k(_, D, P, q, M) {
        var $ = _[D], W = ee($);
        if (W !== "object")
          return new g("Invalid " + q + " `" + M + "` of type `" + W + "` " + ("supplied to `" + P + "`, expected `object`."));
        for (var z in E) {
          var K = E[z];
          if (typeof K != "function")
            return U(P, q, M, z, de(K));
          var fe = K($, z, P, q, M + "." + z, n);
          if (fe)
            return fe;
        }
        return null;
      }
      return f(k);
    }
    function Q(E) {
      function k(_, D, P, q, M) {
        var $ = _[D], W = ee($);
        if (W !== "object")
          return new g("Invalid " + q + " `" + M + "` of type `" + W + "` " + ("supplied to `" + P + "`, expected `object`."));
        var z = t({}, _[D], E);
        for (var K in z) {
          var fe = E[K];
          if (a(E, K) && typeof fe != "function")
            return U(P, q, M, K, de(fe));
          if (!fe)
            return new g(
              "Invalid " + q + " `" + M + "` key `" + K + "` supplied to `" + P + "`.\nBad object: " + JSON.stringify(_[D], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(E), null, "  ")
            );
          var S = fe($, K, P, q, M + "." + K, n);
          if (S)
            return S;
        }
        return null;
      }
      return f(k);
    }
    function X(E) {
      switch (typeof E) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !E;
        case "object":
          if (Array.isArray(E))
            return E.every(X);
          if (E === null || o(E))
            return !0;
          var k = u(E);
          if (k) {
            var _ = k.call(E), D;
            if (k !== E.entries) {
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
    function te(E, k) {
      return E === "symbol" ? !0 : k ? k["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && k instanceof Symbol : !1;
    }
    function ee(E) {
      var k = typeof E;
      return Array.isArray(E) ? "array" : E instanceof RegExp ? "object" : te(k, E) ? "symbol" : k;
    }
    function de(E) {
      if (typeof E > "u" || E === null)
        return "" + E;
      var k = ee(E);
      if (k === "object") {
        if (E instanceof Date)
          return "date";
        if (E instanceof RegExp)
          return "regexp";
      }
      return k;
    }
    function Z(E) {
      var k = de(E);
      switch (k) {
        case "array":
        case "object":
          return "an " + k;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + k;
        default:
          return k;
      }
    }
    function ve(E) {
      return !E.constructor || !E.constructor.name ? y : E.constructor.name;
    }
    return x.checkPropTypes = s, x.resetWarningCache = s.resetWarningCache, x.PropTypes = x, x;
  }, ot;
}
var ct, Yt;
function Ka() {
  if (Yt) return ct;
  Yt = 1;
  var e = kt();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, ct = function() {
    function a(l, o, c, d, m, u) {
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
  var Va = vn(), Ja = !0;
  pt.exports = Wa()(Va.isElement, Ja);
} else
  pt.exports = Ka()();
var Ya = pt.exports;
const G = /* @__PURE__ */ Da(Ya);
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
function za(e, t) {
  if (e == null) return {};
  var n = {}, a = Object.keys(e), s, r;
  for (r = 0; r < a.length; r++)
    s = a[r], !(t.indexOf(s) >= 0) && (n[s] = e[s]);
  return n;
}
function Ha(e, t) {
  if (e == null) return {};
  var n = za(e, t), a, s;
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    for (s = 0; s < r.length; s++)
      a = r[s], !(t.indexOf(a) >= 0) && Object.prototype.propertyIsEnumerable.call(e, a) && (n[a] = e[a]);
  }
  return n;
}
function Ga(e, t) {
  return Qa(e) || Xa(e, t) || Za(e, t) || er();
}
function Qa(e) {
  if (Array.isArray(e)) return e;
}
function Xa(e, t) {
  var n = e && (typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"]);
  if (n != null) {
    var a = [], s = !0, r = !1, l, o;
    try {
      for (n = n.call(e); !(s = (l = n.next()).done) && (a.push(l.value), !(t && a.length === t)); s = !0)
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
function Za(e, t) {
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
function er() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var ue = function(t, n, a) {
  var s = !!a, r = se.useRef(a);
  se.useEffect(function() {
    r.current = a;
  }, [a]), se.useEffect(function() {
    if (!s || !t)
      return function() {
      };
    var l = function() {
      r.current && r.current.apply(r, arguments);
    };
    return t.on(n, l), function() {
      t.off(n, l);
    };
  }, [s, n, t, r]);
}, tr = function(t) {
  var n = se.useRef(t);
  return se.useEffect(function() {
    n.current = t;
  }, [t]), n.current;
}, Ge = function(t) {
  return t !== null && Ye(t) === "object";
}, Qt = "[object Object]", nr = function e(t, n) {
  if (!Ge(t) || !Ge(n))
    return t === n;
  var a = Array.isArray(t), s = Array.isArray(n);
  if (a !== s) return !1;
  var r = Object.prototype.toString.call(t) === Qt, l = Object.prototype.toString.call(n) === Qt;
  if (r !== l) return !1;
  if (!r && !a) return t === n;
  var o = Object.keys(t), c = Object.keys(n);
  if (o.length !== c.length) return !1;
  for (var d = {}, m = 0; m < o.length; m += 1)
    d[o[m]] = !0;
  for (var u = 0; u < c.length; u += 1)
    d[c[u]] = !0;
  var y = Object.keys(d);
  if (y.length !== o.length)
    return !1;
  var x = t, C = n, g = function(v) {
    return e(x[v], C[v]);
  };
  return y.every(g);
}, ar = function(t, n, a) {
  return Ge(t) ? Object.keys(t).reduce(function(s, r) {
    var l = !Ge(n) || !nr(t[r], n[r]);
    return a.includes(r) ? (l && console.warn("Unsupported prop change: options.".concat(r, " is not a mutable property.")), s) : l ? Ht(Ht({}, s || {}), {}, bn({}, r, t[r])) : s;
  }, null) : null;
}, jt = /* @__PURE__ */ se.createContext(null);
jt.displayName = "ElementsContext";
var Nn = function(t, n) {
  if (!t)
    throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(n, " in an <Elements> provider."));
  return t;
};
G.any, G.object;
var rr = function(t) {
  var n = se.useContext(jt);
  return Nn(n, t);
}, sr = function() {
  var t = rr("calls useElements()"), n = t.elements;
  return n;
};
G.func.isRequired;
var wn = /* @__PURE__ */ se.createContext(null);
wn.displayName = "CheckoutContext";
G.any, G.shape({
  clientSecret: G.oneOfType([G.string, G.instanceOf(Promise)]).isRequired,
  elementsOptions: G.object
}).isRequired;
var yt = function(t) {
  var n = se.useContext(wn), a = se.useContext(jt);
  if (n) {
    if (a)
      throw new Error("You cannot wrap the part of your app that ".concat(t, " in both <CheckoutProvider> and <Elements> providers."));
    return n;
  } else
    return Nn(a, t);
}, ir = ["mode"], or = function(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}, pe = function(t, n) {
  var a = "".concat(or(t), "Element"), s = function(c) {
    var d = c.id, m = c.className, u = c.options, y = u === void 0 ? {} : u, x = c.onBlur, C = c.onFocus, g = c.onReady, f = c.onChange, v = c.onEscape, h = c.onClick, w = c.onLoadError, b = c.onLoaderStart, p = c.onNetworksChange, N = c.onConfirm, O = c.onCancel, R = c.onShippingAddressChange, T = c.onShippingRateChange, V = c.onSavedPaymentMethodRemove, U = c.onSavedPaymentMethodUpdate, H = yt("mounts <".concat(a, ">")), Q = "elements" in H ? H.elements : null, X = "checkoutState" in H ? H.checkoutState : null, te = (X == null ? void 0 : X.type) === "success" || (X == null ? void 0 : X.type) === "loading" ? X.sdk : null, ee = se.useState(null), de = Ga(ee, 2), Z = de[0], ve = de[1], E = se.useRef(null), k = se.useRef(null);
    ue(Z, "blur", x), ue(Z, "focus", C), ue(Z, "escape", v), ue(Z, "click", h), ue(Z, "loaderror", w), ue(Z, "loaderstart", b), ue(Z, "networkschange", p), ue(Z, "confirm", N), ue(Z, "cancel", O), ue(Z, "shippingaddresschange", R), ue(Z, "shippingratechange", T), ue(Z, "savedpaymentmethodremove", V), ue(Z, "savedpaymentmethodupdate", U), ue(Z, "change", f);
    var _;
    g && (t === "expressCheckout" ? _ = g : _ = function() {
      g(Z);
    }), ue(Z, "ready", _), se.useLayoutEffect(function() {
      if (E.current === null && k.current !== null && (Q || te)) {
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
                var q = y.mode, M = Ha(y, ir);
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
        E.current = P, ve(P), P && P.mount(k.current);
      }
    }, [Q, te, y]);
    var D = tr(y);
    return se.useEffect(function() {
      if (E.current) {
        var P = ar(y, D, ["paymentRequest"]);
        P && "update" in E.current && E.current.update(P);
      }
    }, [y, D]), se.useLayoutEffect(function() {
      return function() {
        if (E.current && typeof E.current.destroy == "function")
          try {
            E.current.destroy(), E.current = null;
          } catch {
          }
      };
    }, []), /* @__PURE__ */ se.createElement("div", {
      id: d,
      className: m,
      ref: k
    });
  }, r = function(c) {
    yt("mounts <".concat(a, ">"));
    var d = c.id, m = c.className;
    return /* @__PURE__ */ se.createElement("div", {
      id: d,
      className: m
    });
  }, l = n ? r : s;
  return l.propTypes = {
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
  }, l.displayName = a, l.__elementType = t, l;
}, ye = typeof window > "u", cr = /* @__PURE__ */ se.createContext(null);
cr.displayName = "EmbeddedCheckoutProviderContext";
var lr = function() {
  var t = yt("calls useStripe()"), n = t.stripe;
  return n;
};
pe("auBankAccount", ye);
pe("card", ye);
var Xt = pe("cardNumber", ye), dr = pe("cardExpiry", ye), ur = pe("cardCvc", ye);
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
      cardIcon: l,
      expiryIcon: o,
      cvcIcon: c,
      submit: d,
      disclaimer: m
    } = t || {};
    this.id = n ?? B("alloyPay"), this.name = a, this.className = s || "col-12", this.brandIcon = r instanceof F ? r : new F(
      r || {
        iconClass: "fa-brands fa-cc-stripe fa-2xl"
      }
    ), this.cardIcon = l instanceof F ? l : new F(
      l || {
        iconClass: "fa-solid fa-credit-card"
      }
    ), this.expiryIcon = o instanceof F ? o : new F(
      o || {
        iconClass: "fa-solid fa-calendar-days"
      }
    ), this.cvcIcon = c instanceof F ? c : new F(
      c || {
        iconClass: "fa-solid fa-lock"
      }
    ), this.submit = d instanceof Te ? d : new Te(
      d || {
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
  const n = lr(), a = sr(), [s, r] = I(!1), [l, o] = I(""), c = (u) => {
    typeof t == "function" && t(u);
  };
  async function d(u) {
    var x, C;
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
    const y = a.getElement(Xt);
    if (!y) {
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
      const { error: g, paymentMethod: f } = await n.createPaymentMethod({
        type: "card",
        card: y
      });
      if (g || !f) {
        const w = new j({
          id: e.id,
          type: "pay",
          action: "error",
          error: !0,
          data: {
            message: (g == null ? void 0 : g.message) || "Payment failed.",
            code: g == null ? void 0 : g.code
          }
        });
        c(w), o((g == null ? void 0 : g.message) || "Payment failed."), r(!1);
        return;
      }
      const v = ((x = u == null ? void 0 : u.data) == null ? void 0 : x.name) || ((C = e.submit) == null ? void 0 : C.name) || "submit", h = new j({
        id: e.id,
        type: "pay",
        action: v,
        error: !1,
        data: {
          paymentMethodId: f.id,
          paymentMethod: f
        }
      });
      c(h), r(!1);
    } catch (g) {
      const f = g && typeof g.message == "string" ? g.message : "Unexpected error during payment.", v = new j({
        id: e.id,
        type: "pay",
        action: "error",
        error: !0,
        data: {
          message: f
        }
      });
      c(v), o(f), r(!1);
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
            Xt,
            {
              id: `${e.id}-cardNumber`,
              options: lt
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
            dr,
            {
              id: `${e.id}-cardExpiry`,
              options: lt
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
            ur,
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
        output: d
      }
    ),
    l && /* @__PURE__ */ i("div", { className: "text-danger mt-2 small", children: l }),
    /* @__PURE__ */ i("p", { className: "m-0 p-0 small text-muted", children: e.disclaimer })
  ] });
}
class fr {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "card border m-2 shadow",
      header: s,
      title: r = "",
      description: l = "",
      src: o,
      poster: c = "",
      controls: d = !0,
      autoPlay: m = !1,
      loop: u = !1,
      muted: y = !1,
      playsInline: x = !0,
      footer: C,
      type: g = "AlloyButtonBar",
      action: f,
      meta: v = {}
    } = t;
    if (!o || typeof o != "string")
      throw new Error("CardVideoObject requires `src` (video URL).");
    this.id = n ?? B("card-video"), this.className = a, this.header = s instanceof ae ? s : s ? new ae(s) : null, this.title = r, this.description = l, this.src = o, this.poster = c, this.controls = !!d, this.autoPlay = !!m, this.loop = !!u, this.muted = !!y, this.playsInline = !!x, this.footer = C instanceof ae ? C : C ? new ae(C) : null, this.type = g === "AlloyLinkBar" ? "AlloyLinkBar" : "AlloyButtonBar", this.type === "AlloyLinkBar" ? this.action = f instanceof ge ? f : new ge(
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
    ), this.meta = v && typeof v == "object" ? v : {};
  }
}
function Lr({ cardVideo: e, output: t }) {
  if (!e || !(e instanceof fr))
    throw new Error(
      "AlloyCardVideo requires `cardVideo` (CardVideoObject instance)."
    );
  const n = (c) => {
    typeof t == "function" && t(c);
  };
  function a(c) {
    if (!c || typeof c != "object") return "";
    const d = typeof c.name == "string" ? c.name.trim() : "";
    if (d) return d;
    const m = typeof c.ariaLabel == "string" ? c.ariaLabel.trim() : "";
    if (m) return m;
    const u = typeof c.title == "string" ? c.title.trim() : "";
    if (u) return u;
    const y = typeof c.id == "string" ? c.id.trim() : "";
    return y || "";
  }
  function s() {
    return (c, d) => {
      const m = a(c), u = {
        src: e.src,
        title: e.title,
        description: e.description,
        ...e.meta || {}
      }, y = new j({
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
  ) : null, l = /* @__PURE__ */ A("div", { className: "card-body", children: [
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
    l,
    o
  ] });
}
class mr {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "card h-100 rounded-3",
      link: s = "",
      category: r,
      title: l,
      subtitle: o,
      description: c,
      badge: d,
      media: m,
      button: u,
      data: y,
      ...x
    } = t || {};
    this.id = n ?? B("card-carousel"), this.className = a, this.link = typeof s == "string" ? s : "", this.category = r instanceof ae ? r : new ae(
      r || {
        name: "",
        className: "card-title mb-1"
      }
    ), this.title = l instanceof ae ? l : new ae(
      l || {
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
    ), this.badge = d instanceof ae ? d : new ae(
      d || {
        name: "",
        className: "badge text-bg-primary-subtle text-primary"
      }
    );
    const C = m && Array.isArray(m.images) ? m.images : [];
    this.media = {
      images: C
    }, this.button = u instanceof he ? u : u ? new he(u) : null, this.data = y || x.data || {};
  }
}
function Ir({ cardCarousel: e, output: t }) {
  var x, C, g, f, v;
  if (!e || !(e instanceof mr))
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
  function l(h) {
    if (typeof t != "function") return;
    const w = h instanceof j ? h.toJSON() : h || {}, b = w.data && w.data.button ? w.data.button : e.button, p = r(b), N = j.ok({
      id: e.id,
      type: "card-carousel",
      action: p,
      data: {
        ...e.data || {}
      }
    });
    t(N);
  }
  const o = /* @__PURE__ */ A("div", { className: "d-flex align-items-center gap-3", children: [
    /* @__PURE__ */ i("div", { className: "category-icon", children: /* @__PURE__ */ i("i", { className: "fa-solid fa-dumpster" }) }),
    /* @__PURE__ */ A("div", { children: [
      ((C = e.category) == null ? void 0 : C.name) && /* @__PURE__ */ i("h5", { className: e.category.className || "card-title mb-1", children: e.category.name }),
      ((g = e.subtitle) == null ? void 0 : g.name) && /* @__PURE__ */ i(
        "div",
        {
          className: e.subtitle.className || "small text-secondary",
          children: e.subtitle.name
        }
      )
    ] })
  ] }), c = a ? /* @__PURE__ */ A("div", { id: s, className: "carousel slide mt-3", children: [
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
  ] }) : null, d = (f = e.description) != null && f.name ? /* @__PURE__ */ i(
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
        output: l
      }
    )
  ] }), u = /* @__PURE__ */ A(Be, { children: [
    o,
    c,
    d,
    m
  ] }), y = e.link ? /* @__PURE__ */ i(
    ke,
    {
      to: e.link,
      className: "text-decoration-none d-block",
      "aria-label": (v = e.title) == null ? void 0 : v.name,
      children: u
    }
  ) : u;
  return /* @__PURE__ */ i("div", { id: e.id, className: e.className, children: /* @__PURE__ */ i("div", { className: "card-body", children: y }) });
}
class hr {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "container-fluid",
      modal: s,
      search: r,
      add: l,
      table: o,
      ...c
    } = t || {};
    this.id = n ?? B("crud-table"), this.className = a, this.modal = s instanceof we ? s : new we(s || {}), this.search = r instanceof le ? r : r ? new le(r) : null, this.add = l instanceof ce ? l : l ? new ce(l) : null, this.table = o instanceof _e ? o : new _e(o || {}), Object.assign(this, c);
  }
}
function pr(e) {
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
function Br({ crudTable: e, output: t }) {
  var g;
  if (!e || !(e instanceof hr))
    throw new Error(
      "AlloyCrudTable requires `crudTable` (CrudTableObject instance)."
    );
  const n = (f) => {
    typeof t == "function" && t(f);
  }, a = re(null), s = () => {
    var f;
    if (a.current && typeof a.current.click == "function") {
      a.current.click();
      return;
    }
    (f = e.modal) != null && f.id && pr(e.modal.id);
  }, [r, l] = I(() => {
    var f;
    return {
      mode: "create",
      // "create" | "edit" | "delete"
      data: ((f = e.modal) == null ? void 0 : f.data) || {},
      disabled: !1,
      version: 0
      // bump this to force rebuild of ModalObject
    };
  }), [o, c] = I(!1);
  be(() => {
    l((f) => {
      var v;
      return {
        mode: "create",
        data: ((v = e.modal) == null ? void 0 : v.data) || {},
        disabled: !1,
        version: f.version + 1
      };
    }), c(!1);
  }, [e]), be(() => {
    var f;
    o && (f = e.modal) != null && f.id && (s(), c(!1));
  }, [r.version, o, (g = e.modal) == null ? void 0 : g.id]);
  const d = me(() => {
    const f = e.modal;
    let v;
    r.mode === "edit" ? v = "Edit" : r.mode === "delete" ? v = "Delete" : v = f.action || "Create";
    const h = r.data || {}, w = Array.isArray(f.fields) ? f.fields.map((b) => {
      const p = b instanceof le ? { ...b } : { ...b }, N = p.name;
      return N && Object.prototype.hasOwnProperty.call(h, N) && (p.value = h[N]), r.disabled && (p.disabled = !0, p.readOnly = !0), p;
    }) : [];
    return new we({
      ...f,
      action: v,
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
    const v = {}, h = e.modal || {}, w = h.data || {};
    return (Array.isArray(h.fields) ? h.fields : []).forEach((p) => {
      const N = p == null ? void 0 : p.name;
      N && (Object.prototype.hasOwnProperty.call(f, N) ? v[N] = f[N] : Object.prototype.hasOwnProperty.call(w, N) ? v[N] = w[N] : v[N] = "");
    }), v;
  }
  const u = (f) => {
    var p, N, O;
    const v = ((p = f == null ? void 0 : f.data) == null ? void 0 : p.name) ?? ((N = e.search) == null ? void 0 : N.name) ?? "", h = (O = f == null ? void 0 : f.data) == null ? void 0 : O.value, w = v && typeof v == "string" ? { [v]: h } : {}, b = j.ok({
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
      const b = ((h = f.data) == null ? void 0 : h.name) ?? "", p = ((w = f.data) == null ? void 0 : w.dir) ?? "", N = b && typeof b == "string" ? { [b]: p } : {}, O = j.ok({
        id: e.id,
        type: "crud-table",
        action: "Sort",
        data: N
      });
      n(O);
      return;
    }
    if (f.type === "table") {
      const b = f.data || {}, p = f.action || "", N = (p || "").toLowerCase();
      if (N.includes("edit")) {
        const O = m(b);
        l((R) => ({
          mode: "edit",
          data: O,
          disabled: !1,
          version: R.version + 1
        })), c(!0);
        return;
      }
      if (N.includes("delete")) {
        const O = m(b);
        l((R) => ({
          mode: "delete",
          data: O,
          disabled: !0,
          version: R.version + 1
        })), c(!0);
        return;
      }
      if (p) {
        const O = j.ok({
          id: e.id,
          type: "crud-table",
          action: p,
          // any custom button name
          data: {
            ...b
          }
        });
        n(O);
      }
      return;
    }
    if (f.type === "row" && f.action === "navigate") {
      const { to: b, ...p } = f.data || {}, N = j.ok({
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
    const v = j.ok({
      id: e.id,
      type: "crud-table",
      action: f.action || "table",
      data: { ...f.data || {} }
    });
    n(v);
  }, x = (f) => {
    var b, p;
    if (!f || f.type !== "modal" || f.error)
      return;
    const v = f.data || {};
    let h;
    r.mode === "edit" ? h = "Edit" : r.mode === "delete" ? h = "Delete" : h = ((p = (b = e.modal) == null ? void 0 : b.submit) == null ? void 0 : p.name) || "Create";
    const w = j.ok({
      id: e.id,
      type: "crud-table",
      action: h,
      data: {
        ...v
        // key/value only (vendorName, email, city, status, ...)
      }
    });
    n(w);
  }, C = () => {
    var v;
    const f = ((v = e.modal) == null ? void 0 : v.data) || {};
    l((h) => ({
      mode: "create",
      data: { ...f },
      // fresh clone every time
      disabled: !1,
      version: h.version + 1
    })), c(!0);
  };
  return /* @__PURE__ */ A(Be, { children: [
    /* @__PURE__ */ A("div", { className: e.className, children: [
      /* @__PURE__ */ A("div", { className: "row input-group mt-2", children: [
        /* @__PURE__ */ i("div", { className: "col-sm-8", children: e.search && /* @__PURE__ */ i(
          Oe,
          {
            input: e.search,
            output: u
          }
        ) }),
        /* @__PURE__ */ i("div", { className: "col-sm-4 d-flex align-items-center justify-content-end", children: e.add && /* @__PURE__ */ i(
          Se,
          {
            buttonIcon: e.add,
            output: C
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
    /* @__PURE__ */ i(St, { modal: d, output: x })
  ] });
}
class vt {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "col-sm-6 col-md-4 col-lg-3 mb-3",
      type: s = "AlloyCardAction",
      modal: r,
      add: l,
      cards: o = [],
      ...c
    } = t || {};
    this.id = n ?? B("crud-card"), this.className = a, this.type = s || "AlloyCardAction", this.modal = r instanceof we ? r : new we(r || {}), this.add = l instanceof ce ? l : l ? new ce(l) : null, this.cards = o.map(
      (d) => d instanceof ht ? d : new ht(d || {})
    ), Object.assign(this, c);
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
function vr({ crudCard: e, output: t }) {
  var g;
  if (!e || !(e instanceof vt))
    throw new Error(
      "AlloyCrudCard requires `crudCard` (CrudCardObject instance)."
    );
  const n = (f) => {
    typeof t == "function" && t(f);
  }, a = re(null), s = () => {
    var f;
    if (a.current && typeof a.current.click == "function") {
      a.current.click();
      return;
    }
    (f = e.modal) != null && f.id && yr(e.modal.id);
  }, [r, l] = I(() => {
    var f;
    return {
      mode: "create",
      // "create" | "edit" | "delete"
      data: ((f = e.modal) == null ? void 0 : f.data) || {},
      disabled: !1,
      version: 0
      // bump this to force rebuild of ModalObject
    };
  }), [o, c] = I(!1);
  be(() => {
    l((f) => {
      var v;
      return {
        mode: "create",
        data: ((v = e.modal) == null ? void 0 : v.data) || {},
        disabled: !1,
        version: f.version + 1
      };
    }), c(!1);
  }, [e]), be(() => {
    var f;
    o && (f = e.modal) != null && f.id && (s(), c(!1));
  }, [r.version, o, (g = e.modal) == null ? void 0 : g.id]);
  const d = me(() => {
    const f = e.modal;
    let v;
    r.mode === "edit" ? v = "Edit" : r.mode === "delete" ? v = "Delete" : v = f.action || "Create";
    const h = r.data || {}, w = Array.isArray(f.fields) ? f.fields.map((b) => {
      const p = b ? { ...b } : {}, N = p.name;
      return N && Object.prototype.hasOwnProperty.call(h, N) && (p.value = h[N]), r.disabled && (p.disabled = !0, p.readOnly = !0), p;
    }) : [];
    return new we({
      ...f,
      action: v,
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
    const v = {}, h = e.modal || {}, w = h.data || {};
    return (Array.isArray(h.fields) ? h.fields : []).forEach((p) => {
      const N = p == null ? void 0 : p.name;
      N && (Object.prototype.hasOwnProperty.call(f, N) ? v[N] = f[N] : Object.prototype.hasOwnProperty.call(w, N) ? v[N] = w[N] : v[N] = "");
    }), v;
  }
  const u = (f) => {
    if (!f || f.type !== "card-action")
      return;
    const v = f.data || {}, h = f.action || "", w = h.toLowerCase();
    if (w.includes("edit")) {
      const b = m(v);
      l((p) => ({
        mode: "edit",
        data: b,
        disabled: !1,
        version: p.version + 1
      })), c(!0);
      return;
    }
    if (w.includes("delete")) {
      const b = m(v);
      l((p) => ({
        mode: "delete",
        data: b,
        disabled: !0,
        version: p.version + 1
      })), c(!0);
      return;
    }
    if (h) {
      const b = j.ok({
        id: e.id,
        type: "crud-card",
        action: h,
        data: {
          ...v
        }
      });
      n(b);
    }
  }, y = (f) => {
    var b, p;
    if (!f || f.type !== "modal" || f.error)
      return;
    const v = f.data || {};
    let h;
    r.mode === "edit" ? h = "Edit" : r.mode === "delete" ? h = "Delete" : h = ((p = (b = e.modal) == null ? void 0 : b.submit) == null ? void 0 : p.name) || "Create";
    const w = j.ok({
      id: e.id,
      type: "crud-card",
      action: h,
      data: {
        ...v
      }
    });
    n(w);
  }, x = () => {
    var v;
    const f = ((v = e.modal) == null ? void 0 : v.data) || {};
    l((h) => ({
      mode: "create",
      data: { ...f },
      disabled: !1,
      version: h.version + 1
    })), c(!0);
  }, C = () => Array.isArray(e.cards) ? e.cards.map((f) => /* @__PURE__ */ i("div", { className: e.className, children: /* @__PURE__ */ i(Pa, { cardAction: f, output: u }) }, f.id)) : null;
  return /* @__PURE__ */ A(Be, { children: [
    /* @__PURE__ */ i("div", { className: "row mt-2", children: /* @__PURE__ */ i("div", { className: "col-sm-12 text-end", children: e.add && /* @__PURE__ */ i(
      Se,
      {
        buttonIcon: e.add,
        output: x
      }
    ) }) }),
    /* @__PURE__ */ i("div", { id: e.id, className: "row", children: C() }),
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
    /* @__PURE__ */ i(St, { modal: d, output: y })
  ] });
}
class gr {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "container-fluid",
      modal: s,
      search: r,
      send: l,
      table: o,
      ...c
    } = t || {};
    this.id = n ?? B("email"), this.className = a, this.modal = s instanceof we ? s : new we(s || {}), this.search = r instanceof le ? r : r ? new le(r) : null, this.send = l instanceof ce ? l : l ? new ce(l) : null, this.table = o instanceof _e ? o : new _e(o || {}), Object.assign(this, c);
  }
}
function br(e) {
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
function Mr({ email: e, output: t }) {
  var g;
  if (!e || !(e instanceof gr))
    throw new Error("AlloyEmail requires `email` (EmailObject instance).");
  const n = (f) => {
    typeof t == "function" && t(f);
  }, a = re(null), s = () => {
    var f;
    if (a.current && typeof a.current.click == "function") {
      a.current.click();
      return;
    }
    (f = e.modal) != null && f.id && br(e.modal.id);
  }, [r, l] = I(() => {
    var f;
    return {
      mode: "compose",
      // "compose" | "open" | "reply" | "delete"
      data: ((f = e.modal) == null ? void 0 : f.data) || {},
      disabled: !1,
      version: 0
      // bump this to force rebuild / open timing
    };
  }), [o, c] = I(!1);
  be(() => {
    l((f) => {
      var v;
      return {
        mode: "compose",
        data: ((v = e.modal) == null ? void 0 : v.data) || {},
        disabled: !1,
        version: f.version + 1
      };
    }), c(!1);
  }, [e]), be(() => {
    var f;
    o && (f = e.modal) != null && f.id && (s(), c(!1));
  }, [r.version, o, (g = e.modal) == null ? void 0 : g.id]);
  const d = me(() => {
    const f = e.modal;
    let v;
    r.mode === "open" ? v = "Open" : r.mode === "reply" ? v = "Reply" : r.mode === "delete" ? v = "Delete" : v = f.action || "Compose";
    const h = r.data || {}, w = Array.isArray(f.fields) ? f.fields.map((b) => {
      const p = b instanceof le ? { ...b } : { ...b }, N = p.name;
      return N && Object.prototype.hasOwnProperty.call(h, N) && (p.value = h[N]), r.disabled && (p.disabled = !0, p.readOnly = !0), p;
    }) : [];
    return new we({
      ...f,
      action: v,
      fields: w,
      data: r.data
    });
  }, [e.modal, r.mode, r.data, r.disabled]);
  function m(f = {}) {
    const v = {}, h = e.modal || {}, w = h.data || {};
    return (Array.isArray(h.fields) ? h.fields : []).forEach((p) => {
      const N = p == null ? void 0 : p.name;
      N && (Object.prototype.hasOwnProperty.call(f, N) ? v[N] = f[N] : Object.prototype.hasOwnProperty.call(w, N) ? v[N] = w[N] : v[N] = "");
    }), v;
  }
  const u = (f) => {
    var p, N, O;
    const v = ((p = f == null ? void 0 : f.data) == null ? void 0 : p.name) ?? ((N = e.search) == null ? void 0 : N.name) ?? "", h = (O = f == null ? void 0 : f.data) == null ? void 0 : O.value, w = v && typeof v == "string" ? { [v]: h } : {}, b = j.ok({
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
      const b = ((h = f.data) == null ? void 0 : h.name) ?? "", p = ((w = f.data) == null ? void 0 : w.dir) ?? "", N = b && typeof b == "string" ? { [b]: p } : {}, O = j.ok({
        id: e.id,
        type: "email",
        action: "Sort",
        data: N
      });
      n(O);
      return;
    }
    if (f.type === "row" && f.action === "navigate") {
      const { to: b, ...p } = f.data || {}, N = j.ok({
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
        const O = m(b);
        l((R) => ({
          mode: "open",
          data: O,
          disabled: !0,
          // read-only view
          version: R.version + 1
        })), c(!0);
        return;
      }
      if (N.includes("reply")) {
        const O = m(b);
        l((R) => ({
          mode: "reply",
          data: O,
          disabled: !1,
          version: R.version + 1
        })), c(!0);
        return;
      }
      if (N.includes("delete")) {
        const O = m(b);
        l((R) => ({
          mode: "delete",
          data: O,
          disabled: !0,
          // read-only confirm
          version: R.version + 1
        })), c(!0);
        return;
      }
      if (p) {
        const O = j.ok({
          id: e.id,
          type: "email",
          action: p,
          data: {
            ...b
          }
        });
        n(O);
      }
      return;
    }
    const v = j.ok({
      id: e.id,
      type: "email",
      action: f.action || "table",
      data: { ...f.data || {} }
    });
    n(v);
  }, x = (f) => {
    var b, p;
    if (!f || f.type !== "modal" || f.error)
      return;
    const v = f.data || {};
    let h;
    r.mode === "open" ? h = "Open" : r.mode === "reply" ? h = "Reply" : r.mode === "delete" ? h = "Delete" : h = ((p = (b = e.modal) == null ? void 0 : b.submit) == null ? void 0 : p.name) || "submit";
    const w = j.ok({
      id: e.id,
      type: "email",
      action: h,
      data: {
        ...v
      }
    });
    n(w);
  }, C = () => {
    var v;
    const f = ((v = e.modal) == null ? void 0 : v.data) || {};
    l((h) => ({
      mode: "compose",
      data: { ...f },
      // fresh clone every time
      disabled: !1,
      version: h.version + 1
    })), c(!0);
  };
  return /* @__PURE__ */ A(Be, { children: [
    /* @__PURE__ */ A("div", { className: e.className, children: [
      /* @__PURE__ */ A("div", { className: "row input-group mt-2", children: [
        /* @__PURE__ */ i("div", { className: "col-sm-8", children: e.search && /* @__PURE__ */ i(Oe, { input: e.search, output: u }) }),
        /* @__PURE__ */ i("div", { className: "col-sm-4 d-flex align-items-center justify-content-end", children: e.send && /* @__PURE__ */ i(
          Se,
          {
            buttonIcon: e.send,
            output: C
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
    /* @__PURE__ */ i(St, { modal: d, output: x })
  ] });
}
class Nr {
  constructor(t = {}) {
    const {
      id: n,
      title: a = "Contact Us",
      type: s = "AlloyInputTextIcon",
      className: r = "d-flex justify-content-center flex-column text-center h-100 mt-3",
      contactClass: l = "col-12 col-md-6",
      addressClass: o = "col-12 col-md-6",
      contactForm: c,
      addressCard: d,
      data: m,
      ...u
    } = t || {};
    if (this.id = n ?? B("contact"), this.title = a, this.type = s, this.className = r, this.contactClass = l, this.addressClass = o, this.contactForm = c instanceof Ae ? c : new Ae(c || {}), d instanceof mt)
      this.addressCard = d;
    else {
      const y = d || {}, x = y.body || {
        id: "contactAddressBody",
        className: "card-body"
      }, C = Array.isArray(y.fields) && y.fields.length > 0, g = C ? y.fields : [
        {
          id: "addressLine",
          className: "text-center text-muted",
          name: x.name || "Configure addressCard.fields to show address info."
        }
      ], f = {
        ...x,
        name: C && x.name || ""
      }, v = {
        id: y.id || "contactAddressFallback",
        className: y.className || "card border-0",
        header: y.header,
        body: f,
        fields: g,
        footer: y.footer
      };
      this.addressCard = new mt(v);
    }
    this.data = m || {}, Object.assign(this, u);
  }
}
function _r({ contact: e, output: t }) {
  if (!e || !(e instanceof Nr))
    throw new Error(
      "AlloyContact requires `contact` (ContactObject instance)."
    );
  const n = (s) => {
    typeof t == "function" && t(s);
  };
  function a(s) {
    if (!s) return;
    const r = s instanceof j && typeof s.toJSON == "function" ? s.toJSON() : s || {}, l = new j({
      id: e.id,
      type: "contact",
      action: r.action || "submit",
      error: !!r.error,
      data: r.data || {}
    });
    n(l);
  }
  return /* @__PURE__ */ A("div", { id: e.id, className: e.className, children: [
    /* @__PURE__ */ i("h1", { className: "text-center mb-4", children: e.title }),
    /* @__PURE__ */ A("div", { className: "row d-flex align-items-center", children: [
      /* @__PURE__ */ i("div", { className: e.contactClass, children: /* @__PURE__ */ i(Ot, { form: e.contactForm, output: a }) }),
      /* @__PURE__ */ i("div", { className: e.addressClass, children: /* @__PURE__ */ i(ja, { card: e.addressCard }) })
    ] })
  ] });
}
class wr {
  constructor(t = {}) {
    const {
      id: n,
      className: a = "col m-2",
      action: s = "",
      profileForm: r,
      data: l,
      details: o,
      name: c = "",
      email: d = "",
      icon: m,
      ...u
    } = t || {};
    this.id = n ?? "profile", this.className = a, this.action = s, this.name = c, this.email = d, this.icon = m instanceof F ? m : new F(
      m || {
        iconClass: "fa-solid fa-user fa-2xl"
      }
    ), this.profileForm = r instanceof Ae ? r : new Ae(r || {}), this.data = l || {}, this.details = o instanceof vt ? o : new vt(o || {}), Object.assign(this, u);
  }
}
function Dr({ profile: e, output: t }) {
  if (!e || !(e instanceof wr))
    throw new Error("AlloyProfile requires `profile` (ProfileObject instance).");
  const n = (r) => {
    typeof t == "function" && t(r);
  }, a = (r) => {
    if (!r || r.type !== "form") return;
    const l = r instanceof j && typeof r.toJSON == "function" ? r.toJSON() : r, o = new j({
      id: e.id,
      type: "profile",
      action: "form.submit",
      error: !!l.error,
      data: l.data || {}
    });
    n(o);
  }, s = (r) => {
    if (!r) return;
    const l = r instanceof j && typeof r.toJSON == "function" ? r.toJSON() : r, o = new j({
      id: e.id,
      type: "profile",
      action: `details.${l.action || "unknown"}`,
      error: !!l.error,
      data: l.data || {}
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
      /* @__PURE__ */ i("div", { className: "col-md-12 col-lg-9", children: /* @__PURE__ */ i(Ot, { form: e.profileForm, output: a }) })
    ] }),
    /* @__PURE__ */ i("hr", {}),
    /* @__PURE__ */ i("h4", { children: "Address:" }),
    /* @__PURE__ */ i(vr, { crudCard: e.details, output: s })
  ] });
}
class xr {
  constructor(t = {}) {
    const {
      id: n,
      title: a = "AlloyMobile",
      className: s = "col m-2",
      message: r = "",
      action: l = "",
      fields: o,
      pay: c,
      data: d
    } = t || {};
    this.id = n ?? B("checkout"), this.title = a, this.className = s, this.message = r, this.action = l;
    const m = Array.isArray(o) ? o : [];
    this.fields = m.map(
      (u) => u instanceof le ? u : new le(u || {})
    ), this.pay = c instanceof De ? c : new De(c || {}), this.data = d ?? {};
  }
}
function $r({ checkout: e, output: t }) {
  if (!e || !(e instanceof xr))
    throw new Error(
      "AlloyCheckout requires `checkout` (CheckoutObject instance)."
    );
  const n = (o) => {
    typeof t == "function" && t(o);
  }, [a, s] = I(() => {
    const o = {};
    return e.fields.forEach((c) => {
      c != null && c.name && (o[c.name] = c.value);
    }), o;
  }), r = (o) => {
    const c = o instanceof j ? o.data || {} : o || {}, { name: d, value: m } = c;
    d && s((u) => {
      const y = { ...u, [d]: m }, x = j.ok({
        id: e.id,
        type: "checkout",
        action: "field",
        data: {
          name: d,
          value: m,
          values: y
        }
      });
      return n(x), y;
    });
  }, l = (o) => {
    const c = o instanceof j && typeof o.toJSON == "function" ? o.toJSON() : o || {}, d = c.action || e.action || "submit", m = j.ok({
      id: e.id,
      type: "checkout",
      action: d,
      data: {
        billing: { ...a },
        pay: c
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
        e.fields.map((o) => /* @__PURE__ */ i(
          Oe,
          {
            input: o,
            output: r
          },
          o.id
        )),
        /* @__PURE__ */ i(xn, { pay: e.pay, output: l })
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
class Er {
  constructor(t = {}) {
    const {
      id: n,
      title: a = "AlloyMobile",
      className: s = "col m-2",
      message: r = "",
      action: l = "",
      fields: o,
      pay: c,
      amountBar: d,
      data: m
    } = t || {};
    this.id = n ?? B("donate"), this.title = a, this.className = s, this.message = r, this.action = l;
    const u = Array.isArray(o) ? o : [];
    this.fields = u.map(
      (y) => y instanceof le ? y : new le(y || {})
    ), this.pay = c instanceof De ? c : new De(c || {}), this.amountBar = d instanceof xe ? d : new xe(
      d || {
        className: "nav gap-2 my-3",
        buttonClass: "btn btn-outline-secondary",
        barName: { show: !1 },
        type: "AlloyButton",
        buttons: []
      }
    ), this.data = m ?? {};
  }
}
function Fr({ donate: e, output: t }) {
  if (!e || !(e instanceof Er))
    throw new Error(
      "AlloyDonate requires `donate` (DonateObject instance)."
    );
  const n = (m) => {
    typeof t == "function" && t(m);
  }, [a, s] = I(() => {
    const m = {};
    return e.fields.forEach((u) => {
      u != null && u.name && (m[u.name] = u.value);
    }), m;
  }), [r, l] = I(""), o = (m) => {
    const u = m instanceof j ? m.data || {} : m || {}, { name: y, value: x } = u;
    y && s((C) => {
      const g = { ...C, [y]: x }, f = j.ok({
        id: e.id,
        type: "donate",
        action: "field",
        data: {
          name: y,
          value: x,
          values: g
        }
      });
      return n(f), g;
    });
  }, c = (m) => {
    var g, f;
    const u = m instanceof j && typeof m.toJSON == "function" ? m.toJSON() : m || {}, y = ((g = u == null ? void 0 : u.data) == null ? void 0 : g.value) ?? ((f = u == null ? void 0 : u.data) == null ? void 0 : f.name) ?? (u == null ? void 0 : u.action) ?? "", x = String(y).trim();
    l(x);
    const C = j.ok({
      id: e.id,
      type: "donate",
      action: "amount",
      data: {
        amount: x,
        raw: u
      }
    });
    n(C);
  }, d = (m) => {
    const u = m instanceof j && typeof m.toJSON == "function" ? m.toJSON() : m || {}, y = u.action || e.action || "submit", x = j.ok({
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
        Oe,
        {
          input: m,
          output: o
        },
        m.id
      )),
      e.amountBar && Array.isArray(e.amountBar.buttons) && e.amountBar.buttons.length > 0 && /* @__PURE__ */ i(
        Xe,
        {
          buttonBar: e.amountBar,
          output: c
        }
      ),
      /* @__PURE__ */ i(xn, { pay: e.pay, output: d })
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
    a.sort((r, l) => r.sortOrder - l.sortOrder), this.images = a;
    const s = t.pricing || {};
    this.pricing = {
      currency: s.currency || "CAD",
      unitPrice: typeof s.unitPrice == "number" ? s.unitPrice : 0,
      salePrice: typeof s.salePrice == "number" ? s.salePrice : 0
    }, this.data = t.data || {};
  }
}
class Cr {
  constructor(t = {}) {
    const {
      id: n,
      name: a = "Product Gallery",
      className: s = "container-fluid",
      search: r,
      items: l,
      ...o
    } = t || {};
    this.id = n ?? B("gallery"), this.name = a, this.className = s, this.search = r instanceof le ? r : r ? new le(r) : null;
    const c = Array.isArray(l) ? l : [];
    this.items = c.map(
      (d) => d instanceof Zt ? d : new Zt(d)
    ), Object.assign(this, o);
  }
}
function qr({ gallery: e, output: t }) {
  if (!e || !(e instanceof Cr))
    throw new Error(
      "AlloyGallery requires `gallery` (GalleryObject instance)."
    );
  const n = (h) => {
    typeof t == "function" && t(h);
  }, [a, s] = I(""), [r, l] = I({}), [o, c] = I({});
  function d(h, w) {
    const b = e.items.filter((N) => {
      const O = h[N.id];
      return typeof O == "number" && O > 0;
    }).map((N) => {
      const O = h[N.id], R = N.pricing.salePrice > 0 ? N.pricing.salePrice : N.pricing.unitPrice, T = R * O;
      return {
        id: N.id,
        productName: N.productName,
        quantity: O,
        unitPrice: R,
        currency: N.pricing.currency,
        totalPrice: T
      };
    }), p = j.ok({
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
    l((p) => {
      const N = { ...p }, O = Number.isFinite(w) ? Math.max(0, w) : 0;
      return O <= 0 ? delete N[h] : N[h] = O, d(
        N,
        b
      ), N;
    });
  }
  function u(h) {
    l((w) => {
      const b = { ...w }, N = (Number.isFinite(w[h]) ? w[h] : 0) + 1;
      return b[h] = N, d(b, "add"), b;
    });
  }
  function y(h, w) {
    const b = parseInt(w, 10);
    Number.isNaN(b) ? m(h, 0, "updateQuantity") : m(h, b, "updateQuantity");
  }
  function x(h, w) {
    c((b) => ({
      ...b,
      [h]: w
    }));
  }
  function C(h) {
    const w = h instanceof j ? h.data || {} : h || {}, { name: b, value: p } = w, N = typeof p == "string" ? p.trim().toLowerCase() : "";
    s(N);
    const O = b && typeof b == "string" ? { [b]: p } : {}, R = j.ok({
      id: e.id,
      type: "gallery",
      action: "search",
      data: O
    });
    n(R);
  }
  const g = me(() => a ? e.items.filter((h) => [
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
  function v(h) {
    const w = h.images && h.images.length > 0 ? h.images : [
      new gt({
        url: "",
        altText: h.productName || "No image",
        sortOrder: 0
      })
    ], b = typeof o[h.id] == "number" ? o[h.id] : 0, p = w[b] || w[0] || new gt({}), N = r[h.id] || 0;
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
          w.length > 1 && /* @__PURE__ */ i("div", { className: "d-flex gap-2 justify-content-center mt-2", children: w.map((O, R) => /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "btn btn-sm p-0 border-0 " + (R === b ? "opacity-100" : "opacity-75"),
              onClick: () => x(h.id, R),
              "aria-label": `Image ${R + 1} for ${h.productName || "product"}`,
              children: O.url ? /* @__PURE__ */ i(
                "img",
                {
                  src: O.url,
                  alt: O.altText,
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
                  onChange: (O) => y(
                    h.id,
                    O.target.value
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
      Oe,
      {
        input: e.search,
        output: C
      }
    ) }) }),
    /* @__PURE__ */ i("div", { className: "row", children: g.length === 0 ? /* @__PURE__ */ i("div", { className: "col-12", children: /* @__PURE__ */ i("div", { className: "alert alert-info mb-0", children: "No products match your search." }) }) : g.map((h) => v(h)) })
  ] });
}
class en {
  constructor(t = {}) {
    const {
      id: n,
      name: a,
      className: s = "footer pt-5 pb-4 bg-dark text-light",
      logo: r,
      details: l,
      social: o,
      section: c,
      subscribe: d
    } = t || {};
    if (this.id = n ?? B("footer"), this.name = a ?? "Footer", this.className = s, r instanceof ze ? this.logo = r : this.logo = new ze(
      r || {
        imageUrl: "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
        alt: "Alloymobile"
      }
    ), l instanceof oe ? this.details = l : this.details = new oe(
      l || {
        // you told me: "details with name only ignore logo and icon"
        name: "Professional marketplace connecting precast manufacturers, engineers and buyers. New & used equipment, services and standards — in one platform.",
        className: "small opacity-75 mb-2",
        colClass: "col-12 col-md-3"
      }
    ), o instanceof ge)
      this.social = o;
    else {
      const u = o || {};
      this.social = new ge({
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
    const m = Array.isArray(c) ? c : [];
    if (this.section = m.map((u) => u instanceof ge ? u : new ge({
      id: u.id ?? B("footer-section"),
      className: u.className ?? "list-unstyled small",
      type: u.type ?? "AlloyLink",
      linkClass: u.linkClass ?? "d-block mb-1 text-decoration-none text-light",
      selected: u.selected ?? "active",
      title: u.title,
      // wrapped into TagObject inside LinkBarObject
      links: Array.isArray(u.links) ? u.links : []
    })), d instanceof Ae)
      this.subscribe = d;
    else {
      const u = d || {};
      this.subscribe = new Ae({
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
function Ur({ footer: e, output: t }) {
  const n = e instanceof en ? e : new en(e || {}), a = (o) => {
    typeof t == "function" && t(o);
  }, s = (o) => {
    if (!o) return;
    const c = o instanceof j && typeof o.toJSON == "function" ? o.toJSON() : o;
    if (c.type !== "form" || c.action !== "submit")
      return;
    const d = !!c.error, m = c.data || {}, u = new j({
      id: n.id,
      type: "footer",
      action: "subscribe",
      error: d,
      data: m
    });
    a(u);
  }, r = (o) => {
    if (!o) return;
    const c = o instanceof j && typeof o.toJSON == "function" ? o.toJSON() : o, d = c.data || {}, m = d.link || {}, u = m.href || d.href || "#", y = typeof m.name == "string" && m.name.trim() || typeof m.ariaLabel == "string" && m.ariaLabel.trim() || c.action || "link", x = new j({
      id: n.id,
      type: "footer",
      action: y,
      error: !1,
      data: { href: u }
    });
    a(x);
  }, l = Array.isArray(n.section) ? n.section : [];
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
    l.map((o, c) => /* @__PURE__ */ A(
      "div",
      {
        className: "col-12 col-md-3",
        children: [
          o.title && o.title.name && /* @__PURE__ */ i("h6", { className: "text-white mb-2", children: o.title.name }),
          /* @__PURE__ */ i(
            Me,
            {
              linkBar: o,
              output: r
            }
          )
        ]
      },
      o.id || `footer-section-${c}`
    )),
    /* @__PURE__ */ A("div", { className: "col-12 col-md-3", children: [
      n.subscribe && n.subscribe.title && /* @__PURE__ */ i("h6", { className: "text-white mb-2", children: n.subscribe.title }),
      /* @__PURE__ */ i(
        Ot,
        {
          form: n.subscribe,
          output: s
        }
      )
    ] })
  ] }) }) });
}
export {
  Qe as AlloyButton,
  Xe as AlloyButtonBar,
  Se as AlloyButtonIcon,
  nn as AlloyButtonSubmit,
  ja as AlloyCard,
  Pa as AlloyCardAction,
  Ir as AlloyCardCarousel,
  Lr as AlloyCardVideo,
  $r as AlloyCheckout,
  _r as AlloyContact,
  vr as AlloyCrudCard,
  Br as AlloyCrudTable,
  Fr as AlloyDonate,
  Mr as AlloyEmail,
  Ur as AlloyFooter,
  Ot as AlloyForm,
  qr as AlloyGallery,
  ie as AlloyIcon,
  Oe as AlloyInput,
  An as AlloyLink,
  Me as AlloyLinkBar,
  Sn as AlloyLinkIcon,
  tn as AlloyLinkLogo,
  St as AlloyModal,
  Rr as AlloyModalToast,
  kr as AlloyNavBar,
  xn as AlloyPay,
  Dr as AlloyProfile,
  Tr as AlloyTabForm,
  jr as AlloyTable,
  yn as AlloyTableAction,
  Pr as AlloyTableLink,
  xe as ButtonBarObject,
  ce as ButtonIconObject,
  he as ButtonObject,
  Te as ButtonSubmitObject,
  ht as CardActionObject,
  mr as CardCarouselObject,
  mt as CardObject,
  fr as CardVideoObject,
  xr as CheckoutObject,
  Nr as ContactObject,
  vt as CrudCardObject,
  hr as CrudTableObject,
  Er as DonateObject,
  gr as EmailObject,
  en as FooterObject,
  Ae as FormObject,
  Cr as GalleryObject,
  F as IconObject,
  le as InputObject,
  ge as LinkBarObject,
  Pe as LinkIconObject,
  Ce as LinkLogoObject,
  je as LinkObject,
  we as ModalObject,
  Ma as ModalToastObject,
  Rn as NavBarObject,
  De as PayObject,
  wr as ProfileObject,
  Ra as TabFormObject,
  Ta as TabObject,
  _e as TableActionObject,
  Ca as TableLinkObject,
  In as TableObject
};
//# sourceMappingURL=alloy-react.es.js.map
