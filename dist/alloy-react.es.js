import { jsx as d, jsxs as L } from "react/jsx-runtime";
import { useRef as x, useState as y, useMemo as B, forwardRef as E, useImperativeHandle as A, useEffect as C } from "react";
let j = 0;
function p() {
  return j += 1, `alloyIcon${j}`;
}
class N {
  /**
   * @param {{ id?: string, iconClass: string }} params
   */
  constructor({ id: e, iconClass: n }) {
    if (!n) throw new Error("Icon requires iconClass");
    this.id = e ?? p(), this.iconClass = n;
  }
}
function b({ icon: s }) {
  if (!s) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ d("i", { id: s.id, className: s.iconClass, "aria-hidden": "true" });
}
let k = 0;
function R() {
  return k += 1, `alloyLink${k}`;
}
function H(s = "", e = "") {
  const [n, r] = y(!1), [o, i] = y(!1), [l, h] = y(!1);
  return {
    className: B(() => [s, (n || o || l) && e].filter(Boolean).join(" "), [s, e, n, o, l]),
    events: {
      onMouseEnter: () => r(!0),
      onMouseLeave: () => {
        r(!1), i(!1);
      },
      onMouseDown: () => i(!0),
      onMouseUp: () => i(!1),
      onFocus: () => h(!0),
      onBlur: () => h(!1)
    }
  };
}
class P {
  /**
   * @param {{ id?: string, name?: string, link: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e: any)=>void, title?: string }} p
   */
  constructor({
    id: e,
    name: n,
    href: r,
    className: o,
    active: i,
    target: l,
    rel: h,
    onClick: c,
    title: t
  }) {
    if (!r) throw new Error("LinkObject requires `href`.");
    this.id = e ?? R(), this.name = n, this.href = r, this.className = o ?? "", this.active = i ?? "", this.target = l, this.rel = h, this.onClick = c, this.title = t;
  }
}
function ae({ link: s }) {
  if (!s || !(s instanceof P))
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  if (!s.name) throw new Error("AlloyLink requires `link.name`.");
  const e = x(s.id), { className: n, events: r } = H(s.className, s.active), o = s.target === "_blank" ? s.rel ? `${s.rel} noopener noreferrer` : "noopener noreferrer" : s.rel;
  return /* @__PURE__ */ d(
    "a",
    {
      id: e.current,
      href: s.href,
      className: n,
      target: s.target,
      rel: o,
      onClick: s.onClick,
      title: s.title,
      ...r,
      children: /* @__PURE__ */ d("span", { children: s.name })
    }
  );
}
let D = 0;
function T() {
  return D += 1, `alloyLinkIcon${D}`;
}
function W(s = "", e = "") {
  const [n, r] = y(!1), [o, i] = y(!1), [l, h] = y(!1);
  return {
    className: B(
      () => [s, (n || o || l) && e].filter(Boolean).join(" "),
      [s, e, n, o, l]
    ),
    events: {
      onMouseEnter: () => r(!0),
      onMouseLeave: () => {
        r(!1), i(!1);
      },
      onMouseDown: () => i(!0),
      onMouseUp: () => i(!1),
      onFocus: () => h(!0),
      onBlur: () => h(!1)
    }
  };
}
class z {
  /**
   * @param {{ id?: string, link: string, icon: Icon, name?: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e:any)=>void, title?: string }} p
   */
  constructor({
    id: e,
    href: n,
    icon: r,
    name: o,
    className: i,
    active: l,
    target: h,
    rel: c,
    onClick: t,
    title: w
  }) {
    if (!n) throw new Error("LinkIconObject requires `href`.");
    if (!r || !(r instanceof N))
      throw new Error("LinkIconObject requires `icon` (Icon instance).");
    this.id = e ?? T(), this.href = n, this.icon = r instanceof N ? r : new N(r), this.name = o, this.className = i ?? "", this.active = l ?? "", this.target = h, this.rel = c, this.onClick = t, this.title = w;
  }
}
function ie({ linkIcon: s }) {
  if (!s || !(s instanceof z))
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  const e = x(s.id), { className: n, events: r } = W(s.className, s.active), o = s.target === "_blank" ? s.rel ? `${s.rel} noopener noreferrer` : "noopener noreferrer" : s.rel, i = !!s.name;
  return /* @__PURE__ */ d(
    "a",
    {
      id: e.current,
      href: s.href,
      className: n,
      target: s.target,
      rel: o,
      onClick: s.onClick,
      title: s.title,
      ...r,
      children: /* @__PURE__ */ L("span", { children: [
        /* @__PURE__ */ d(b, { icon: s.icon }),
        i && /* @__PURE__ */ d("span", { className: "px-1", children: s.name })
      ] })
    }
  );
}
let $ = 0;
function V() {
  return $ += 1, `alloyLinkLogo${$}`;
}
function Z(s = "", e = "") {
  const [n, r] = y(!1), [o, i] = y(!1), [l, h] = y(!1);
  return {
    className: B(
      () => [s, (n || o || l) && e].filter(Boolean).join(" "),
      [s, e, n, o, l]
    ),
    events: {
      onMouseEnter: () => r(!0),
      onMouseLeave: () => {
        r(!1), i(!1);
      },
      onMouseDown: () => i(!0),
      onMouseUp: () => i(!1),
      onFocus: () => h(!0),
      onBlur: () => h(!1)
    }
  };
}
class G {
  /**
   * @param {{ id?: string, name?: string, link: string, logo: string, width?: number|string, height?: number|string, logoAlt?: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e:any)=>void, title?: string }} p
   */
  constructor({
    id: e,
    name: n,
    href: r,
    logo: o,
    width: i,
    height: l,
    logoAlt: h = "",
    className: c,
    active: t,
    target: w,
    rel: m,
    onClick: v,
    title: g
  }) {
    if (!r) throw new Error("LinkLogoObject requires `href`.");
    if (!o) throw new Error("LinkLogoObject requires `logo`.");
    this.id = e ?? V(), this.name = n, this.href = r, this.logo = o, this.width = i, this.height = l, this.logoAlt = h, this.className = c ?? "", this.active = t ?? "", this.target = w, this.rel = m, this.onClick = v, this.title = g;
  }
}
function le({ linkLogo: s }) {
  if (!s || !(s instanceof G))
    throw new Error("AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance).");
  const e = x(s.id), { className: n, events: r } = Z(s.className, s.active), o = s.target === "_blank" ? s.rel ? `${s.rel} noopener noreferrer` : "noopener noreferrer" : s.rel, i = !!s.name;
  return /* @__PURE__ */ d(
    "a",
    {
      id: e.current,
      href: s.href,
      className: n,
      target: s.target,
      rel: o,
      onClick: s.onClick,
      title: s.title,
      ...r,
      children: /* @__PURE__ */ L("span", { children: [
        /* @__PURE__ */ d(
          "img",
          {
            src: s.logo,
            alt: s.logoAlt || s.name,
            width: s.width,
            height: s.height,
            style: { display: "inline-block" }
          }
        ),
        i && /* @__PURE__ */ d("span", { className: "px-1", children: s.name })
      ] })
    }
  );
}
let F = 0;
function J() {
  return F += 1, `alloyBtn${F}`;
}
function Q(s = "", e = "") {
  const [n, r] = y(!1), [o, i] = y(!1), [l, h] = y(!1);
  return {
    className: B(() => [s, (n || o || l) && e].filter(Boolean).join(" "), [s, e, n, o, l]),
    events: {
      onMouseEnter: () => r(!0),
      onMouseLeave: () => {
        r(!1), i(!1);
      },
      onMouseDown: () => i(!0),
      onMouseUp: () => i(!1),
      onFocus: () => h(!0),
      onBlur: () => h(!1)
    }
  };
}
class X {
  constructor(e) {
    if (!e || !e.name) throw new Error("ButtonObject requires `name`.");
    this.id = e.id ?? J(), this.name = e.name, this.className = e.className ?? "", this.active = e.active ?? "", this.disabled = !!e.disabled, this.title = e.title, this.ariaLabel = e.ariaLabel, this.tabIndex = e.tabIndex, this.onClick = e.onClick, this.onKeyDown = e.onKeyDown, this.onKeyUp = e.onKeyUp, this.onFocus = e.onFocus, this.onBlur = e.onBlur, this.onMouseEnter = e.onMouseEnter, this.onMouseLeave = e.onMouseLeave;
  }
}
const ce = E(function({ button: e, output: n }, r) {
  if (!e || !(e instanceof X))
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  const o = x(null), i = x(e.id), l = e.disabled, { className: h, events: c } = Q(e.className, e.active);
  A(
    r,
    () => ({
      el: o.current,
      model: e,
      focus: () => {
        var m;
        return (m = o.current) == null ? void 0 : m.focus();
      },
      click: () => {
        var m;
        return (m = o.current) == null ? void 0 : m.click();
      }
    }),
    [e]
  );
  const t = (m, v) => (g) => {
    v == null || v(g), n == null || n(e, g), m == null || m(g, e);
  }, w = {
    onClick: t(e.onClick),
    onKeyDown: t(e.onKeyDown, c.onFocus),
    onKeyUp: t(e.onKeyUp),
    onFocus: t(e.onFocus, c.onFocus),
    onBlur: t(e.onBlur, c.onBlur),
    onMouseEnter: t(e.onMouseEnter, c.onMouseEnter),
    onMouseLeave: t(e.onMouseLeave, c.onMouseLeave),
    onMouseDown: t(void 0, c.onMouseDown),
    onMouseUp: t(void 0, c.onMouseUp)
  };
  return /* @__PURE__ */ d(
    "button",
    {
      id: i.current,
      ref: o,
      type: "button",
      className: h,
      title: e.title,
      "aria-label": e.ariaLabel || e.name,
      "aria-disabled": l || void 0,
      disabled: l,
      tabIndex: e.tabIndex,
      ...w,
      children: /* @__PURE__ */ d("span", { className: "px-2 align-middle", children: e.name })
    }
  );
});
let O = 0;
function Y() {
  return O += 1, `alloyBtnicon${O}`;
}
function S(s = "", e = "") {
  const [n, r] = y(!1), [o, i] = y(!1), [l, h] = y(!1);
  return {
    className: B(() => [s, (n || o || l) && e].filter(Boolean).join(" "), [s, e, n, o, l]),
    events: {
      onMouseEnter: () => r(!0),
      onMouseLeave: () => {
        r(!1), i(!1);
      },
      onMouseDown: () => i(!0),
      onMouseUp: () => i(!1),
      onFocus: () => h(!0),
      onBlur: () => h(!1)
    }
  };
}
class ee {
  constructor(e) {
    if (!e || !e.icon) throw new Error("ButtonIconObject requires `icon` (IconObject).");
    this.id = e.id ?? Y(), this.name = e.name, this.icon = e.icon instanceof N ? e.icon : new N(e.icon), this.className = e.className ?? "", this.active = e.active ?? "", this.disabled = !!e.disabled, this.title = e.title, this.ariaLabel = e.ariaLabel, this.tabIndex = e.tabIndex, this.onClick = e.onClick, this.onKeyDown = e.onKeyDown, this.onKeyUp = e.onKeyUp, this.onFocus = e.onFocus, this.onBlur = e.onBlur, this.onMouseEnter = e.onMouseEnter, this.onMouseLeave = e.onMouseLeave;
  }
}
const de = E(function({ buttonIcon: e, output: n }, r) {
  if (!e || !(e instanceof ee))
    throw new Error("AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance).");
  const o = x(null), i = x(e.id), l = e.disabled, { className: h, events: c } = S(e.className, e.active);
  A(
    r,
    () => ({
      el: o.current,
      model: e,
      focus: () => {
        var v;
        return (v = o.current) == null ? void 0 : v.focus();
      },
      click: () => {
        var v;
        return (v = o.current) == null ? void 0 : v.click();
      }
    }),
    [e]
  );
  const t = (v, g) => (u) => {
    g == null || g(u), n == null || n(e, u), v == null || v(u, e);
  }, w = {
    onClick: t(e.onClick),
    onKeyDown: t(e.onKeyDown, c.onFocus),
    onKeyUp: t(e.onKeyUp),
    onFocus: t(e.onFocus, c.onFocus),
    onBlur: t(e.onBlur, c.onBlur),
    onMouseEnter: t(e.onMouseEnter, c.onMouseEnter),
    onMouseLeave: t(e.onMouseLeave, c.onMouseLeave),
    onMouseDown: t(void 0, c.onMouseDown),
    onMouseUp: t(void 0, c.onMouseUp)
  }, m = e.ariaLabel || e.name || "icon button";
  return /* @__PURE__ */ L(
    "button",
    {
      id: i.current,
      ref: o,
      type: "button",
      className: h,
      title: e.title,
      "aria-label": m,
      "aria-disabled": l || void 0,
      disabled: l,
      tabIndex: e.tabIndex,
      ...w,
      children: [
        /* @__PURE__ */ d("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ d(b, { icon: e.icon }) }),
        e.name ? /* @__PURE__ */ d("span", { className: "px-2 align-middle", children: e.name }) : null
      ]
    }
  );
});
let q = 0;
function se() {
  return q += 1, `alloyBtnsubmit${q}`;
}
class ne {
  constructor(e) {
    if (!e || !e.name) throw new Error("ButtonSubmitObject requires `name`.");
    if (!e.icon) throw new Error("ButtonSubmitObject requires `icon`.");
    this.id = e.id ?? se(), this.name = e.name, this.icon = e.icon instanceof N ? e.icon : new N(e.icon), this.className = e.className ?? "", this.disabled = !!e.disabled, this.loading = !!e.loading, this.title = e.title, this.ariaLabel = e.ariaLabel, this.tabIndex = e.tabIndex, this.onClick = e.onClick, this.onMouseDown = e.onMouseDown, this.onKeyDown = e.onKeyDown;
  }
}
const he = E(function({ buttonSubmit: e, output: n }, r) {
  if (!e || !(e instanceof ne))
    throw new Error("AlloyButtonSubmit requires `buttonSubmit` (ButtonSubmitObject instance).");
  const o = x(null), i = x(e.id), [l, h] = y(!!e.loading);
  C(() => {
    h(!!e.loading);
  }, [e.loading]);
  const c = e.disabled || l;
  A(
    r,
    () => ({
      el: o.current,
      model: e,
      focus: () => {
        var a;
        return (a = o.current) == null ? void 0 : a.focus();
      },
      click: () => {
        var a;
        return (a = o.current) == null ? void 0 : a.click();
      }
    }),
    [e]
  );
  const t = x(!1);
  C(() => {
    l || (t.current = !1);
  }, [l]);
  const w = () => t.current || c ? !1 : (t.current = !0, e.loading = !0, e.disabled = !0, h(!0), !0), m = (a, M) => {
    n == null || n(e, a), M == null || M(a, e);
  }, v = (a) => {
    w() && m(a, e.onClick);
  }, g = (a) => {
    w() && m(a, e.onMouseDown);
  }, u = (a) => {
    const M = a.key;
    (M === "Enter" || M === " ") && w() && m(a, e.onKeyDown);
  }, f = l;
  return /* @__PURE__ */ L(
    "button",
    {
      id: i.current,
      ref: o,
      type: "submit",
      className: e.className,
      title: e.title,
      "aria-label": e.ariaLabel || e.name,
      "aria-busy": l || void 0,
      "aria-disabled": c || void 0,
      disabled: c,
      tabIndex: e.tabIndex,
      onClick: v,
      onMouseDown: g,
      onKeyDown: u,
      children: [
        f && /* @__PURE__ */ d("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ d(b, { icon: e.icon }) }),
        /* @__PURE__ */ d("span", { className: f ? "px-2 align-middle" : "align-middle", children: e.name }),
        l ? /* @__PURE__ */ d("span", { className: "ms-2 visually-hidden", "aria-live": "polite", children: "Loading…" }) : null
      ]
    }
  );
});
let _ = 0;
function oe() {
  return _ += 1, `alloyinput${_}`;
}
class ue {
  constructor(e) {
    const {
      id: n,
      name: r,
      type: o = "text",
      label: i = "",
      value: l = o === "checkbox" ? [] : "",
      layout: h = "text",
      icon: c,
      placeholder: t = "",
      required: w = !1,
      minLength: m,
      maxLength: v,
      min: g,
      max: u,
      pattern: f,
      matchWith: a,
      passwordStrength: M,
      options: K = [],
      validators: I = [],
      ...U
    } = e || {};
    if (!r) throw new Error("InputObject requires a 'name' field");
    if (["icon", "floating"].includes(h) && !c)
      throw new Error("Icon is required for icon and floating layouts");
    this.id = n ?? oe(), this.name = r, this.type = o, this.label = i, this.value = l, this.layout = h, this.icon = c instanceof N ? c : c ? new N(c) : void 0, this.placeholder = t, this.required = w, this.minLength = m, this.maxLength = v, this.min = g, this.max = u, this.pattern = f, this.matchWith = a, this.passwordStrength = M, this.options = K, this.validators = I, Object.assign(this, U);
  }
}
function fe({ input: s, output: e }) {
  const [n, r] = y(s.value), [o, i] = y(!1), l = (u) => {
    const f = [], a = typeof u == "string" ? u.trim() : u;
    return s.required && (Array.isArray(a) && a.length === 0 || !Array.isArray(a) && (a === "" || a === !1)) && f.push("This field is required."), s.minLength && typeof a == "string" && a.length < s.minLength && f.push(`Minimum length is ${s.minLength}`), s.maxLength && typeof a == "string" && a.length > s.maxLength && f.push(`Maximum length is ${s.maxLength}`), s.pattern && typeof a == "string" && !new RegExp(s.pattern).test(a) && f.push("Invalid format."), s.passwordStrength && typeof a == "string" && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(a) && f.push("Password is too weak."), f;
  }, h = (u) => {
    const f = l(u);
    e == null || e({
      id: s.id,
      name: s.name,
      value: u,
      valid: f.length === 0,
      error: f.length > 0,
      errors: f
    });
  }, c = () => i(!0), t = o && l(n).length > 0, w = t && /* @__PURE__ */ d("div", { className: "mt-2", "aria-live": "polite", children: l(n).map((u, f) => /* @__PURE__ */ d("div", { className: "alert alert-danger py-2 mb-2", role: "alert", children: u }, f)) }), m = {
    name: s.name,
    placeholder: s.placeholder,
    onBlur: c,
    "aria-invalid": t || void 0
  }, v = (u) => {
    const f = u.target.value;
    if (s.type === "checkbox") {
      const a = Array.isArray(n) ? [...n] : [], M = a.indexOf(f);
      M > -1 ? a.splice(M, 1) : a.push(f), r(a), h(a);
    } else
      r(f), h(f);
  }, g = () => s.type === "textarea" ? /* @__PURE__ */ d("textarea", { ...m, value: n, className: `form-control${t ? " is-invalid" : ""}` }) : s.type === "select" ? /* @__PURE__ */ d("select", { ...m, value: n, className: `form-select${t ? " is-invalid" : ""}`, onChange: v, children: s.options.map((u) => /* @__PURE__ */ d("option", { value: u.value, children: u.label }, u.value)) }) : s.type === "radio" ? /* @__PURE__ */ L("div", { children: [
    /* @__PURE__ */ d("label", { className: "form-label d-block mb-2", children: s.label }),
    s.options.map((u, f) => /* @__PURE__ */ L("div", { className: "form-check", children: [
      /* @__PURE__ */ d(
        "input",
        {
          type: "radio",
          id: `${s.id}_${f}`,
          className: `form-check-input${t ? " is-invalid" : ""}`,
          name: s.name,
          value: u.value,
          checked: n === u.value,
          onChange: (a) => {
            r(a.target.value), h(a.target.value);
          }
        }
      ),
      /* @__PURE__ */ d("label", { className: "form-check-label", htmlFor: `${s.id}_${f}`, children: u.label })
    ] }, f))
  ] }) : s.type === "checkbox" ? /* @__PURE__ */ L("div", { children: [
    /* @__PURE__ */ d("label", { className: "form-label d-block mb-2", children: s.label }),
    s.options.map((u, f) => /* @__PURE__ */ L("div", { className: "form-check", children: [
      /* @__PURE__ */ d(
        "input",
        {
          type: "checkbox",
          id: `${s.id}_${f}`,
          className: `form-check-input${t ? " is-invalid" : ""}`,
          name: s.name,
          value: u.value,
          checked: Array.isArray(n) && n.includes(u.value),
          onChange: v
        }
      ),
      /* @__PURE__ */ d("label", { className: "form-check-label", htmlFor: `${s.id}_${f}`, children: u.label })
    ] }, f))
  ] }) : /* @__PURE__ */ d("input", { ...m, type: s.type, value: n, onChange: v, className: `form-control${t ? " is-invalid" : ""}` });
  return s.layout === "floating" ? /* @__PURE__ */ L("div", { className: "mb-3", children: [
    /* @__PURE__ */ L("div", { className: "form-floating", children: [
      g(),
      /* @__PURE__ */ L("label", { htmlFor: s.id, children: [
        s.icon && /* @__PURE__ */ d(b, { icon: s.icon }),
        " ",
        s.label
      ] })
    ] }),
    w
  ] }) : s.layout === "icon" ? /* @__PURE__ */ L("div", { className: "mb-3", children: [
    /* @__PURE__ */ d("label", { htmlFor: s.id, className: "form-label", children: s.label }),
    /* @__PURE__ */ L("div", { className: "input-group", children: [
      /* @__PURE__ */ d("span", { className: "input-group-text", children: /* @__PURE__ */ d(b, { icon: s.icon }) }),
      g()
    ] }),
    w
  ] }) : /* @__PURE__ */ L("div", { className: "mb-3", children: [
    ["text", "textarea", "number", "email", "password", "date"].includes(s.type) && /* @__PURE__ */ d("label", { htmlFor: s.id, className: "form-label", children: s.label }),
    g(),
    w
  ] });
}
export {
  ce as AlloyButton,
  de as AlloyButtonIcon,
  he as AlloyButtonSubmit,
  b as AlloyIcon,
  fe as AlloyInput,
  ae as AlloyLink,
  ie as AlloyLinkIcon,
  le as AlloyLinkLogo,
  ee as ButtonIconObject,
  X as ButtonObject,
  ne as ButtonSubmitObject,
  N as IconObject,
  ue as InputObject,
  z as LinkIconObject,
  G as LinkLogoObject,
  P as LinkObject
};
//# sourceMappingURL=alloy-react.es.js.map
