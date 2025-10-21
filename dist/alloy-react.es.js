import { jsx as c, jsxs as C } from "react/jsx-runtime";
import { useRef as m, useState as l, useMemo as p } from "react";
let w = 0;
function v() {
  return w += 1, `icon${w}`;
}
class A {
  /**
   * @param {{ id?: string, iconClass: string }} params
   */
  constructor({ id: s, iconClass: t }) {
    if (!t) throw new Error("Icon requires iconClass");
    this.id = s ?? v(), this.iconClass = t;
  }
}
function E({ icon: e }) {
  if (!e) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ c("i", { id: e.id, className: e.iconClass, "aria-hidden": "true" });
}
let g = 0;
function M() {
  return g += 1, `alloylink${g}`;
}
function O(e = "", s = "") {
  const [t, r] = l(!1), [o, n] = l(!1), [i, a] = l(!1);
  return {
    className: p(() => [e, (t || o || i) && s].filter(Boolean).join(" "), [e, s, t, o, i]),
    events: {
      onMouseEnter: () => r(!0),
      onMouseLeave: () => {
        r(!1), n(!1);
      },
      onMouseDown: () => n(!0),
      onMouseUp: () => n(!1),
      onFocus: () => a(!0),
      onBlur: () => a(!1)
    }
  };
}
class q {
  /**
   * @param {{ id?: string, name?: string, link: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e: any)=>void, title?: string }} p
   */
  constructor({
    id: s,
    name: t,
    href: r,
    className: o,
    active: n,
    target: i,
    rel: a,
    onClick: u,
    title: h
  }) {
    if (!r) throw new Error("LinkObject requires `href`.");
    this.id = s ?? M(), this.name = t, this.href = r, this.className = o ?? "", this.active = n ?? "", this.target = i, this.rel = a, this.onClick = u, this.title = h;
  }
}
function H({ link: e }) {
  if (!e || !(e instanceof q))
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  if (!e.name) throw new Error("AlloyLink requires `link.name`.");
  const s = m(e.id), { className: t, events: r } = O(e.className, e.active), o = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel;
  return /* @__PURE__ */ c(
    "a",
    {
      id: s.current,
      href: e.href,
      className: t,
      target: e.target,
      rel: o,
      onClick: e.onClick,
      title: e.title,
      ...r,
      children: /* @__PURE__ */ c("span", { children: e.name })
    }
  );
}
let b = 0;
function _() {
  return b += 1, `alloylink${b}`;
}
function N(e = "", s = "") {
  const [t, r] = l(!1), [o, n] = l(!1), [i, a] = l(!1);
  return {
    className: p(
      () => [e, (t || o || i) && s].filter(Boolean).join(" "),
      [e, s, t, o, i]
    ),
    events: {
      onMouseEnter: () => r(!0),
      onMouseLeave: () => {
        r(!1), n(!1);
      },
      onMouseDown: () => n(!0),
      onMouseUp: () => n(!1),
      onFocus: () => a(!0),
      onBlur: () => a(!1)
    }
  };
}
class x {
  /**
   * @param {{ id?: string, link: string, icon: Icon, name?: string, gap?: string|number, className?: string, active?: string, target?: string, rel?: string, onClick?: (e:any)=>void, title?: string }} p
   */
  constructor({
    id: s,
    href: t,
    icon: r,
    name: o,
    gap: n = ".5rem",
    className: i,
    active: a,
    target: u,
    rel: h,
    onClick: f,
    title: d
  }) {
    if (!t) throw new Error("LinkIconObject requires `href`.");
    if (!r || !(r instanceof A))
      throw new Error("LinkIconObject requires `icon` (Icon instance).");
    this.id = s ?? _(), this.href = t, this.icon = r, this.name = o, this.gap = n, this.className = i ?? "", this.active = a ?? "", this.target = u, this.rel = h, this.onClick = f, this.title = d;
  }
}
function P({ linkIcon: e }) {
  if (!e || !(e instanceof x))
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  const s = m(e.id), { className: t, events: r } = N(e.className, e.active), o = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, n = !!e.name;
  return /* @__PURE__ */ c(
    "a",
    {
      id: s.current,
      href: e.href,
      className: t,
      target: e.target,
      rel: o,
      onClick: e.onClick,
      title: e.title,
      ...r,
      children: /* @__PURE__ */ C(
        "span",
        {
          style: {
            display: "inline-flex",
            alignlinks: "center",
            gap: n ? e.gap : 0
          },
          children: [
            /* @__PURE__ */ c(E, { icon: e.icon }),
            n && /* @__PURE__ */ c("span", { children: e.name })
          ]
        }
      )
    }
  );
}
let y = 0;
function B() {
  return y += 1, `alloylink${y}`;
}
function I(e = "", s = "") {
  const [t, r] = l(!1), [o, n] = l(!1), [i, a] = l(!1);
  return {
    className: p(
      () => [e, (t || o || i) && s].filter(Boolean).join(" "),
      [e, s, t, o, i]
    ),
    events: {
      onMouseEnter: () => r(!0),
      onMouseLeave: () => {
        r(!1), n(!1);
      },
      onMouseDown: () => n(!0),
      onMouseUp: () => n(!1),
      onFocus: () => a(!0),
      onBlur: () => a(!1)
    }
  };
}
class $ {
  /**
   * @param {{ id?: string, name?: string, link: string, logo: string, width?: number|string, height?: number|string, logoAlt?: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e:any)=>void, title?: string }} p
   */
  constructor({
    id: s,
    name: t,
    href: r,
    logo: o,
    width: n,
    height: i,
    logoAlt: a = "",
    className: u,
    active: h,
    target: f,
    rel: d,
    onClick: L,
    title: j
  }) {
    if (!r) throw new Error("LinkLogoObject requires `href`.");
    if (!o) throw new Error("LinkLogoObject requires `logo`.");
    this.id = s ?? B(), this.name = t, this.href = r, this.logo = o, this.width = n, this.height = i, this.logoAlt = a, this.className = u ?? "", this.active = h ?? "", this.target = f, this.rel = d, this.onClick = L, this.title = j;
  }
}
function U({ linkLogo: e }) {
  if (!e || !(e instanceof $))
    throw new Error("AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance).");
  const s = m(e.id), { className: t, events: r } = I(e.className, e.active), o = e.target === "_blank" ? e.rel ? `${e.rel} noopener noreferrer` : "noopener noreferrer" : e.rel, n = !!e.name;
  return /* @__PURE__ */ c(
    "a",
    {
      id: s.current,
      href: e.href,
      className: t,
      target: e.target,
      rel: o,
      onClick: e.onClick,
      title: e.title,
      ...r,
      children: /* @__PURE__ */ C(
        "span",
        {
          style: { display: "inline-flex", alignItems: "center", gap: ".6rem" },
          children: [
            /* @__PURE__ */ c(
              "img",
              {
                src: e.logo,
                alt: e.logoAlt || e.name,
                width: e.width,
                height: e.height,
                style: { display: "inline-block" }
              }
            ),
            n && /* @__PURE__ */ c("span", { children: e.name })
          ]
        }
      )
    }
  );
}
export {
  E as AlloyIcon,
  H as AlloyLink,
  P as AlloyLinkIcon,
  U as AlloyLinkLogo,
  A as IconObject,
  x as LinkIconObject,
  $ as LinkLogoObject,
  q as LinkObject
};
//# sourceMappingURL=alloy-react.es.js.map
