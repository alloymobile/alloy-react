import { jsx as o, jsxs as v, Fragment as B } from "react/jsx-runtime";
import { useRef as N, useState as w, useMemo as x, forwardRef as M, useImperativeHandle as E, useEffect as C } from "react";
let I = 0;
function J() {
  return I += 1, `alloyIcon${I}`;
}
class b {
  /**
   * @param {{ id?: string, iconClass: string }} params
   */
  constructor({ id: e, iconClass: s }) {
    if (!s) throw new Error("Icon requires iconClass");
    this.id = e ?? J(), this.iconClass = s;
  }
}
function k({ icon: n }) {
  if (!n) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ o("i", { id: n.id, className: n.iconClass, "aria-hidden": "true" });
}
let j = 0;
function Q() {
  return j += 1, `alloyLink${j}`;
}
function X(n = "", e = "") {
  const [s, t] = w(!1), [a, l] = w(!1), [r, i] = w(!1);
  return {
    className: x(() => [n, (s || a || r) && e].filter(Boolean).join(" "), [n, e, s, a, r]),
    events: {
      onMouseEnter: () => t(!0),
      onMouseLeave: () => {
        t(!1), l(!1);
      },
      onMouseDown: () => l(!0),
      onMouseUp: () => l(!1),
      onFocus: () => i(!0),
      onBlur: () => i(!1)
    }
  };
}
class H {
  /**
   * @param {{ id?: string, name?: string, link: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e: any)=>void, title?: string }} p
   */
  constructor({
    id: e,
    name: s,
    href: t,
    className: a,
    active: l,
    target: r,
    rel: i,
    onClick: c,
    title: d
  }) {
    if (!t) throw new Error("LinkObject requires `href`.");
    this.id = e ?? Q(), this.name = s, this.href = t, this.className = a ?? "", this.active = l ?? "", this.target = r, this.rel = i, this.onClick = c, this.title = d;
  }
}
function Y({ link: n }) {
  if (!n || !(n instanceof H))
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  if (!n.name) throw new Error("AlloyLink requires `link.name`.");
  const e = N(n.id), { className: s, events: t } = X(n.className, n.active), a = n.target === "_blank" ? n.rel ? `${n.rel} noopener noreferrer` : "noopener noreferrer" : n.rel;
  return /* @__PURE__ */ o(
    "a",
    {
      id: e.current,
      href: n.href,
      className: s,
      target: n.target,
      rel: a,
      onClick: n.onClick,
      title: n.title,
      ...t,
      children: /* @__PURE__ */ o("span", { children: n.name })
    }
  );
}
let O = 0;
function S() {
  return O += 1, `alloyLinkIcon${O}`;
}
function ee(n = "", e = "") {
  const [s, t] = w(!1), [a, l] = w(!1), [r, i] = w(!1);
  return {
    className: x(
      () => [n, (s || a || r) && e].filter(Boolean).join(" "),
      [n, e, s, a, r]
    ),
    events: {
      onMouseEnter: () => t(!0),
      onMouseLeave: () => {
        t(!1), l(!1);
      },
      onMouseDown: () => l(!0),
      onMouseUp: () => l(!1),
      onFocus: () => i(!0),
      onBlur: () => i(!1)
    }
  };
}
class P {
  /**
   * @param {{ id?: string, link: string, icon: Icon, name?: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e:any)=>void, title?: string }} p
   */
  constructor({
    id: e,
    href: s,
    icon: t,
    name: a,
    className: l,
    active: r,
    target: i,
    rel: c,
    onClick: d,
    title: g
  }) {
    if (!s) throw new Error("LinkIconObject requires `href`.");
    if (!t || !(t instanceof b))
      throw new Error("LinkIconObject requires `icon` (Icon instance).");
    this.id = e ?? S(), this.href = s, this.icon = t instanceof b ? t : new b(t), this.name = a, this.className = l ?? "", this.active = r ?? "", this.target = i, this.rel = c, this.onClick = d, this.title = g;
  }
}
function ne({ linkIcon: n }) {
  if (!n || !(n instanceof P))
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  const e = N(n.id), { className: s, events: t } = ee(n.className, n.active), a = n.target === "_blank" ? n.rel ? `${n.rel} noopener noreferrer` : "noopener noreferrer" : n.rel, l = !!n.name;
  return /* @__PURE__ */ o(
    "a",
    {
      id: e.current,
      href: n.href,
      className: s,
      target: n.target,
      rel: a,
      onClick: n.onClick,
      title: n.title,
      ...t,
      children: /* @__PURE__ */ v("span", { children: [
        /* @__PURE__ */ o(k, { icon: n.icon }),
        l && /* @__PURE__ */ o("span", { className: "px-1", children: n.name })
      ] })
    }
  );
}
let $ = 0;
function se() {
  return $ += 1, `alloyLinkLogo${$}`;
}
function re(n = "", e = "") {
  const [s, t] = w(!1), [a, l] = w(!1), [r, i] = w(!1);
  return {
    className: x(
      () => [n, (s || a || r) && e].filter(Boolean).join(" "),
      [n, e, s, a, r]
    ),
    events: {
      onMouseEnter: () => t(!0),
      onMouseLeave: () => {
        t(!1), l(!1);
      },
      onMouseDown: () => l(!0),
      onMouseUp: () => l(!1),
      onFocus: () => i(!0),
      onBlur: () => i(!1)
    }
  };
}
class T {
  /**
   * @param {{ id?: string, name?: string, link: string, logo: string, width?: number|string, height?: number|string, logoAlt?: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e:any)=>void, title?: string }} p
   */
  constructor({
    id: e,
    name: s,
    href: t,
    logo: a,
    width: l,
    height: r,
    logoAlt: i = "",
    className: c,
    active: d,
    target: g,
    rel: m,
    onClick: y,
    title: L
  }) {
    if (!t) throw new Error("LinkLogoObject requires `href`.");
    if (!a) throw new Error("LinkLogoObject requires `logo`.");
    this.id = e ?? se(), this.name = s, this.href = t, this.logo = a, this.width = l, this.height = r, this.logoAlt = i, this.className = c ?? "", this.active = d ?? "", this.target = g, this.rel = m, this.onClick = y, this.title = L;
  }
}
function oe({ linkLogo: n }) {
  if (!n || !(n instanceof T))
    throw new Error("AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance).");
  const e = N(n.id), { className: s, events: t } = re(n.className, n.active), a = n.target === "_blank" ? n.rel ? `${n.rel} noopener noreferrer` : "noopener noreferrer" : n.rel, l = !!n.name;
  return /* @__PURE__ */ o(
    "a",
    {
      id: e.current,
      href: n.href,
      className: s,
      target: n.target,
      rel: a,
      onClick: n.onClick,
      title: n.title,
      ...t,
      children: /* @__PURE__ */ v("span", { children: [
        /* @__PURE__ */ o(
          "img",
          {
            src: n.logo,
            alt: n.logoAlt || n.name,
            width: n.width,
            height: n.height,
            style: { display: "inline-block" }
          }
        ),
        l && /* @__PURE__ */ o("span", { className: "px-1", children: n.name })
      ] })
    }
  );
}
let p = 0;
function te() {
  return p += 1, `alloyBtn${p}`;
}
function ae(n = "", e = "") {
  const [s, t] = w(!1), [a, l] = w(!1), [r, i] = w(!1);
  return {
    className: x(() => [n, (s || a || r) && e].filter(Boolean).join(" "), [n, e, s, a, r]),
    events: {
      onMouseEnter: () => t(!0),
      onMouseLeave: () => {
        t(!1), l(!1);
      },
      onMouseDown: () => l(!0),
      onMouseUp: () => l(!1),
      onFocus: () => i(!0),
      onBlur: () => i(!1)
    }
  };
}
class W {
  constructor(e) {
    if (!e || !e.name) throw new Error("ButtonObject requires `name`.");
    this.id = e.id ?? te(), this.name = e.name, this.className = e.className ?? "", this.active = e.active ?? "", this.disabled = !!e.disabled, this.title = e.title, this.ariaLabel = e.ariaLabel, this.tabIndex = e.tabIndex, this.onClick = e.onClick, this.onKeyDown = e.onKeyDown, this.onKeyUp = e.onKeyUp, this.onFocus = e.onFocus, this.onBlur = e.onBlur, this.onMouseEnter = e.onMouseEnter, this.onMouseLeave = e.onMouseLeave;
  }
}
const ie = M(function({ button: e, output: s }, t) {
  if (!e || !(e instanceof W))
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  const a = N(null), l = N(e.id), r = e.disabled, { className: i, events: c } = ae(e.className, e.active);
  E(
    t,
    () => ({
      el: a.current,
      model: e,
      focus: () => {
        var m;
        return (m = a.current) == null ? void 0 : m.focus();
      },
      click: () => {
        var m;
        return (m = a.current) == null ? void 0 : m.click();
      }
    }),
    [e]
  );
  const d = (m, y) => (L) => {
    y == null || y(L), s == null || s(e, L), m == null || m(L, e);
  }, g = {
    onClick: d(e.onClick),
    onKeyDown: d(e.onKeyDown, c.onFocus),
    onKeyUp: d(e.onKeyUp),
    onFocus: d(e.onFocus, c.onFocus),
    onBlur: d(e.onBlur, c.onBlur),
    onMouseEnter: d(e.onMouseEnter, c.onMouseEnter),
    onMouseLeave: d(e.onMouseLeave, c.onMouseLeave),
    onMouseDown: d(void 0, c.onMouseDown),
    onMouseUp: d(void 0, c.onMouseUp)
  };
  return /* @__PURE__ */ o(
    "button",
    {
      id: l.current,
      ref: a,
      type: "button",
      className: i,
      title: e.title,
      "aria-label": e.ariaLabel || e.name,
      "aria-disabled": r || void 0,
      disabled: r,
      tabIndex: e.tabIndex,
      ...g,
      children: /* @__PURE__ */ o("span", { className: "px-2 align-middle", children: e.name })
    }
  );
});
let q = 0;
function le() {
  return q += 1, `alloyBtnicon${q}`;
}
function ce(n = "", e = "") {
  const [s, t] = w(!1), [a, l] = w(!1), [r, i] = w(!1);
  return {
    className: x(() => [n, (s || a || r) && e].filter(Boolean).join(" "), [n, e, s, a, r]),
    events: {
      onMouseEnter: () => t(!0),
      onMouseLeave: () => {
        t(!1), l(!1);
      },
      onMouseDown: () => l(!0),
      onMouseUp: () => l(!1),
      onFocus: () => i(!0),
      onBlur: () => i(!1)
    }
  };
}
class z {
  constructor(e) {
    if (!e || !e.icon) throw new Error("ButtonIconObject requires `icon` (IconObject).");
    this.id = e.id ?? le(), this.name = e.name, this.icon = e.icon instanceof b ? e.icon : new b(e.icon), this.className = e.className ?? "", this.active = e.active ?? "", this.disabled = !!e.disabled, this.title = e.title, this.ariaLabel = e.ariaLabel, this.tabIndex = e.tabIndex, this.onClick = e.onClick, this.onKeyDown = e.onKeyDown, this.onKeyUp = e.onKeyUp, this.onFocus = e.onFocus, this.onBlur = e.onBlur, this.onMouseEnter = e.onMouseEnter, this.onMouseLeave = e.onMouseLeave;
  }
}
const de = M(function({ buttonIcon: e, output: s }, t) {
  if (!e || !(e instanceof z))
    throw new Error("AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance).");
  const a = N(null), l = N(e.id), r = e.disabled, { className: i, events: c } = ce(e.className, e.active);
  E(
    t,
    () => ({
      el: a.current,
      model: e,
      focus: () => {
        var y;
        return (y = a.current) == null ? void 0 : y.focus();
      },
      click: () => {
        var y;
        return (y = a.current) == null ? void 0 : y.click();
      }
    }),
    [e]
  );
  const d = (y, L) => (u) => {
    L == null || L(u), s == null || s(e, u), y == null || y(u, e);
  }, g = {
    onClick: d(e.onClick),
    onKeyDown: d(e.onKeyDown, c.onFocus),
    onKeyUp: d(e.onKeyUp),
    onFocus: d(e.onFocus, c.onFocus),
    onBlur: d(e.onBlur, c.onBlur),
    onMouseEnter: d(e.onMouseEnter, c.onMouseEnter),
    onMouseLeave: d(e.onMouseLeave, c.onMouseLeave),
    onMouseDown: d(void 0, c.onMouseDown),
    onMouseUp: d(void 0, c.onMouseUp)
  }, m = e.ariaLabel || e.name || "icon button";
  return /* @__PURE__ */ v(
    "button",
    {
      id: l.current,
      ref: a,
      type: "button",
      className: i,
      title: e.title,
      "aria-label": m,
      "aria-disabled": r || void 0,
      disabled: r,
      tabIndex: e.tabIndex,
      ...g,
      children: [
        /* @__PURE__ */ o("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ o(k, { icon: e.icon }) }),
        e.name ? /* @__PURE__ */ o("span", { className: "px-2 align-middle", children: e.name }) : null
      ]
    }
  );
});
let _ = 0;
function he() {
  return _ += 1, `alloyBtnsubmit${_}`;
}
class ue {
  constructor(e) {
    if (!e || !e.name) throw new Error("ButtonSubmitObject requires `name`.");
    if (!e.icon) throw new Error("ButtonSubmitObject requires `icon`.");
    this.id = e.id ?? he(), this.name = e.name, this.icon = e.icon instanceof b ? e.icon : new b(e.icon), this.className = e.className ?? "", this.disabled = !!e.disabled, this.loading = !!e.loading, this.title = e.title, this.ariaLabel = e.ariaLabel, this.tabIndex = e.tabIndex, this.onClick = e.onClick, this.onMouseDown = e.onMouseDown, this.onKeyDown = e.onKeyDown;
  }
}
const ke = M(function({ buttonSubmit: e, output: s }, t) {
  if (!e || !(e instanceof ue))
    throw new Error("AlloyButtonSubmit requires `buttonSubmit` (ButtonSubmitObject instance).");
  const a = N(null), l = N(e.id), [r, i] = w(!!e.loading);
  C(() => {
    i(!!e.loading);
  }, [e.loading]);
  const c = e.disabled || r;
  E(
    t,
    () => ({
      el: a.current,
      model: e,
      focus: () => {
        var h;
        return (h = a.current) == null ? void 0 : h.focus();
      },
      click: () => {
        var h;
        return (h = a.current) == null ? void 0 : h.click();
      }
    }),
    [e]
  );
  const d = N(!1);
  C(() => {
    r || (d.current = !1);
  }, [r]);
  const g = () => d.current || c ? !1 : (d.current = !0, e.loading = !0, e.disabled = !0, i(!0), !0), m = (h, A) => {
    s == null || s(e, h), A == null || A(h, e);
  }, y = (h) => {
    g() && m(h, e.onClick);
  }, L = (h) => {
    g() && m(h, e.onMouseDown);
  }, u = (h) => {
    const A = h.key;
    (A === "Enter" || A === " ") && g() && m(h, e.onKeyDown);
  }, f = r;
  return /* @__PURE__ */ v(
    "button",
    {
      id: l.current,
      ref: a,
      type: "submit",
      className: e.className,
      title: e.title,
      "aria-label": e.ariaLabel || e.name,
      "aria-busy": r || void 0,
      "aria-disabled": c || void 0,
      disabled: c,
      tabIndex: e.tabIndex,
      onClick: y,
      onMouseDown: L,
      onKeyDown: u,
      children: [
        f && /* @__PURE__ */ o("span", { className: "d-inline-flex align-middle", children: /* @__PURE__ */ o(k, { icon: e.icon }) }),
        /* @__PURE__ */ o("span", { className: f ? "px-2 align-middle" : "align-middle", children: e.name }),
        r ? /* @__PURE__ */ o("span", { className: "ms-2 visually-hidden", "aria-live": "polite", children: "Loading…" }) : null
      ]
    }
  );
});
let D = 0;
function fe() {
  return D += 1, `alloyinput${D}`;
}
class xe {
  constructor(e) {
    const {
      id: s,
      name: t,
      type: a = "text",
      label: l = "",
      value: r = a === "checkbox" ? [] : "",
      layout: i = "text",
      icon: c,
      placeholder: d = "",
      required: g = !1,
      minLength: m,
      maxLength: y,
      min: L,
      max: u,
      pattern: f,
      matchWith: h,
      passwordStrength: A,
      options: V = [],
      validators: Z = [],
      ...G
    } = e || {};
    if (!t) throw new Error("InputObject requires a 'name' field");
    if (["icon", "floating"].includes(i) && !c)
      throw new Error("Icon is required for icon and floating layouts");
    this.id = s ?? fe(), this.name = t, this.type = a, this.label = l, this.value = r, this.layout = i, this.icon = c instanceof b ? c : c ? new b(c) : void 0, this.placeholder = d, this.required = g, this.minLength = m, this.maxLength = y, this.min = L, this.max = u, this.pattern = f, this.matchWith = h, this.passwordStrength = A, this.options = V, this.validators = Z, Object.assign(this, G);
  }
}
function Me({ input: n, output: e }) {
  const [s, t] = w(n.value), [a, l] = w(!1), r = (u) => {
    const f = [], h = typeof u == "string" ? u.trim() : u;
    return n.required && (Array.isArray(h) && h.length === 0 || !Array.isArray(h) && (h === "" || h === !1)) && f.push("This field is required."), n.minLength && typeof h == "string" && h.length < n.minLength && f.push(`Minimum length is ${n.minLength}`), n.maxLength && typeof h == "string" && h.length > n.maxLength && f.push(`Maximum length is ${n.maxLength}`), n.pattern && typeof h == "string" && !new RegExp(n.pattern).test(h) && f.push("Invalid format."), n.passwordStrength && typeof h == "string" && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(h) && f.push("Password is too weak."), f;
  }, i = (u) => {
    const f = r(u);
    e == null || e({
      id: n.id,
      name: n.name,
      value: u,
      valid: f.length === 0,
      error: f.length > 0,
      errors: f
    });
  }, c = () => l(!0), d = a && r(s).length > 0, g = d && /* @__PURE__ */ o("div", { className: "mt-2", "aria-live": "polite", children: r(s).map((u, f) => /* @__PURE__ */ o("div", { className: "alert alert-danger py-2 mb-2", role: "alert", children: u }, f)) }), m = {
    name: n.name,
    placeholder: n.placeholder,
    onBlur: c,
    "aria-invalid": d || void 0
  }, y = (u) => {
    const f = u.target.value;
    if (n.type === "checkbox") {
      const h = Array.isArray(s) ? [...s] : [], A = h.indexOf(f);
      A > -1 ? h.splice(A, 1) : h.push(f), t(h), i(h);
    } else
      t(f), i(f);
  }, L = () => n.type === "textarea" ? /* @__PURE__ */ o("textarea", { ...m, value: s, className: `form-control${d ? " is-invalid" : ""}` }) : n.type === "select" ? /* @__PURE__ */ o("select", { ...m, value: s, className: `form-select${d ? " is-invalid" : ""}`, onChange: y, children: n.options.map((u) => /* @__PURE__ */ o("option", { value: u.value, children: u.label }, u.value)) }) : n.type === "radio" ? /* @__PURE__ */ v("div", { children: [
    /* @__PURE__ */ o("label", { className: "form-label d-block mb-2", children: n.label }),
    n.options.map((u, f) => /* @__PURE__ */ v("div", { className: "form-check", children: [
      /* @__PURE__ */ o(
        "input",
        {
          type: "radio",
          id: `${n.id}_${f}`,
          className: `form-check-input${d ? " is-invalid" : ""}`,
          name: n.name,
          value: u.value,
          checked: s === u.value,
          onChange: (h) => {
            t(h.target.value), i(h.target.value);
          }
        }
      ),
      /* @__PURE__ */ o("label", { className: "form-check-label", htmlFor: `${n.id}_${f}`, children: u.label })
    ] }, f))
  ] }) : n.type === "checkbox" ? /* @__PURE__ */ v("div", { children: [
    /* @__PURE__ */ o("label", { className: "form-label d-block mb-2", children: n.label }),
    n.options.map((u, f) => /* @__PURE__ */ v("div", { className: "form-check", children: [
      /* @__PURE__ */ o(
        "input",
        {
          type: "checkbox",
          id: `${n.id}_${f}`,
          className: `form-check-input${d ? " is-invalid" : ""}`,
          name: n.name,
          value: u.value,
          checked: Array.isArray(s) && s.includes(u.value),
          onChange: y
        }
      ),
      /* @__PURE__ */ o("label", { className: "form-check-label", htmlFor: `${n.id}_${f}`, children: u.label })
    ] }, f))
  ] }) : /* @__PURE__ */ o("input", { ...m, type: n.type, value: s, onChange: y, className: `form-control${d ? " is-invalid" : ""}` });
  return n.layout === "floating" ? /* @__PURE__ */ v("div", { className: "mb-3", children: [
    /* @__PURE__ */ v("div", { className: "form-floating", children: [
      L(),
      /* @__PURE__ */ v("label", { htmlFor: n.id, children: [
        n.icon && /* @__PURE__ */ o(k, { icon: n.icon }),
        " ",
        n.label
      ] })
    ] }),
    g
  ] }) : n.layout === "icon" ? /* @__PURE__ */ v("div", { className: "mb-3", children: [
    /* @__PURE__ */ o("label", { htmlFor: n.id, className: "form-label", children: n.label }),
    /* @__PURE__ */ v("div", { className: "input-group", children: [
      /* @__PURE__ */ o("span", { className: "input-group-text", children: /* @__PURE__ */ o(k, { icon: n.icon }) }),
      L()
    ] }),
    g
  ] }) : /* @__PURE__ */ v("div", { className: "mb-3", children: [
    ["text", "textarea", "number", "email", "password", "date"].includes(n.type) && /* @__PURE__ */ o("label", { htmlFor: n.id, className: "form-label", children: n.label }),
    L(),
    g
  ] });
}
let F = 0;
function me() {
  return F += 1, `barItem${F}`;
}
let K = 0;
function ye() {
  return K += 1, `linkBar${K}`;
}
let U = class {
  /**
   * @param {{ id?: string, name?: string, className?: string, show?: boolean }} p
   */
  constructor({ id: e, name: s, className: t, show: a } = {}) {
    this.id = e ?? me(), this.name = s ?? "Bar Item", this.className = t ?? "", this.show = typeof a == "boolean" ? a : !1;
  }
};
class ve {
  constructor({ id: e, className: s, barName: t, type: a, linkClass: l, links: r } = {}) {
    this.id = e ?? ye(), this.className = s ?? "d-flex justify-content-center", this.barName = t instanceof U ? t : new U(t ?? {}), this.type = a ?? "AlloyLink", this.linkClass = l ?? "nav-item", this.links = Array.isArray(r) ? r.slice() : [];
  }
}
function Ce({ linkBar: n }) {
  if (!n || !(n instanceof ve))
    throw new Error("AlloyLinkBar requires `linkBar` (LinkBarObject instance).");
  const e = N(n.id), s = () => {
    var r;
    return (r = n.barName) != null && r.show ? /* @__PURE__ */ o("div", { id: n.barName.id, className: n.barName.className, children: n.barName.name }) : null;
  }, t = () => /* @__PURE__ */ v(B, { children: [
    /* @__PURE__ */ o(s, {}),
    /* @__PURE__ */ o("ul", { id: e.current, className: n.className, children: n.links.map((r, i) => {
      if (!(r instanceof H))
        throw new Error(
          "AlloyLinkBar (type='AlloyLink') requires each `links` item to be a LinkObject instance."
        );
      return /* @__PURE__ */ o("li", { className: n.linkClass, children: /* @__PURE__ */ o(Y, { link: r }) }, ((r == null ? void 0 : r.id) ?? i) + "-li");
    }) })
  ] }), a = () => /* @__PURE__ */ v(B, { children: [
    /* @__PURE__ */ o(s, {}),
    /* @__PURE__ */ o("ul", { id: e.current, className: n.className, children: n.links.map((r, i) => {
      if (!(r instanceof P))
        throw new Error(
          "AlloyLinkBar (type='AlloyLinkIcon') requires each `links` item to be a LinkIconObject instance."
        );
      return /* @__PURE__ */ o("li", { className: n.linkClass, children: /* @__PURE__ */ o(ne, { linkIcon: r }) }, ((r == null ? void 0 : r.id) ?? i) + "-li");
    }) })
  ] }), l = () => /* @__PURE__ */ v(B, { children: [
    /* @__PURE__ */ o(s, {}),
    /* @__PURE__ */ o("ul", { id: e.current, className: n.className, children: n.links.map((r, i) => {
      if (!(r instanceof T))
        throw new Error(
          "AlloyLinkBar (type='AlloyLinkLogo') requires each `links` item to be a LinkLogoObject instance."
        );
      return /* @__PURE__ */ o("li", { className: n.linkClass, children: /* @__PURE__ */ o(oe, { linkLogo: r }) }, ((r == null ? void 0 : r.id) ?? i) + "-li");
    }) })
  ] });
  switch (n.type) {
    case "AlloyLink":
      return /* @__PURE__ */ o("nav", { "data-type": "AlloyLink", children: t() });
    case "AlloyLinkIcon":
      return /* @__PURE__ */ o("nav", { "data-type": "AlloyLinkIcon", children: a() });
    case "AlloyLinkLogo":
      return /* @__PURE__ */ o("nav", { "data-type": "AlloyLinkLogo", children: l() });
    default:
      return /* @__PURE__ */ o("nav", { "data-type": "AlloyLink", children: t() });
  }
}
let we = 0;
function ge() {
  return `barItem${++we}`;
}
let Le = 0;
function Ne() {
  return `buttonBar${++Le}`;
}
class R {
  constructor({ id: e, name: s, className: t, show: a } = {}) {
    this.id = e ?? ge(), this.name = s ?? "Bar", this.className = t ?? "", this.show = typeof a == "boolean" ? a : !1;
  }
}
class Ae {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *   barName?: BarItem|object,
   *   type?: "AlloyButton"|"AlloyButtonIcon",
   *   buttonClass?: string,
   *   buttons?: any[]
   * }} p
   */
  constructor({ id: e, className: s, barName: t, type: a, buttonClass: l, buttons: r } = {}) {
    this.id = e ?? Ne(), this.className = s ?? "d-flex justify-content-center", this.barName = t instanceof R ? t : new R(t ?? {}), this.type = a ?? "AlloyButton", this.buttonClass = l ?? "nav-item", this.buttons = Array.isArray(r) ? r.slice() : [];
  }
}
function Ie({ buttonBar: n, output: e }) {
  if (!n || !(n instanceof Ae))
    throw new Error("AlloyButtonBar requires `buttonBar` (ButtonBarObject instance).");
  const s = N(n.id), t = () => {
    var i;
    return (i = n.barName) != null && i.show ? /* @__PURE__ */ o("div", { id: n.barName.id, className: n.barName.className, children: n.barName.name }) : null;
  }, a = (i, c) => {
    e == null || e(i, c);
  }, l = () => /* @__PURE__ */ v(B, { children: [
    /* @__PURE__ */ o(t, {}),
    /* @__PURE__ */ o("ul", { id: s.current, className: n.className, children: n.buttons.map((i, c) => {
      if (!(i instanceof W))
        throw new Error("AlloyButtonBar (type='AlloyButton') requires ButtonObject items.");
      return /* @__PURE__ */ o("li", { className: n.buttonClass, children: /* @__PURE__ */ o(ie, { button: i, output: a }) }, ((i == null ? void 0 : i.id) ?? c) + "-li");
    }) })
  ] }), r = () => /* @__PURE__ */ v(B, { children: [
    /* @__PURE__ */ o(t, {}),
    /* @__PURE__ */ o("ul", { id: s.current, className: n.className, children: n.buttons.map((i, c) => {
      if (!(i instanceof z))
        throw new Error("AlloyButtonBar (type='AlloyButtonIcon') requires ButtonIconObject items.");
      return /* @__PURE__ */ o("li", { className: n.buttonClass, children: /* @__PURE__ */ o(de, { buttonIcon: i, output: a }) }, ((i == null ? void 0 : i.id) ?? c) + "-li");
    }) })
  ] });
  switch (n.type) {
    case "AlloyButton":
      return /* @__PURE__ */ o("nav", { "data-type": "AlloyButton", children: l() });
    case "AlloyButtonIcon":
      return /* @__PURE__ */ o("nav", { "data-type": "AlloyButtonIcon", children: r() });
    default:
      return /* @__PURE__ */ o("nav", { "data-type": "AlloyButton", children: l() });
  }
}
export {
  ie as AlloyButton,
  Ie as AlloyButtonBar,
  de as AlloyButtonIcon,
  ke as AlloyButtonSubmit,
  k as AlloyIcon,
  Me as AlloyInput,
  Y as AlloyLink,
  Ce as AlloyLinkBar,
  ne as AlloyLinkIcon,
  oe as AlloyLinkLogo,
  Ae as ButtonBarObject,
  z as ButtonIconObject,
  W as ButtonObject,
  ue as ButtonSubmitObject,
  b as IconObject,
  xe as InputObject,
  ve as LinkBarObject,
  P as LinkIconObject,
  T as LinkLogoObject,
  H as LinkObject
};
//# sourceMappingURL=alloy-react.es.js.map
