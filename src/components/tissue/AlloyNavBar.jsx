// src/components/tissue/AlloyNavBar.jsx
import React, { useRef } from "react";
import AlloyLinkLogo, { LinkLogoObject } from "../cell/AlloyLinkLogo.jsx";
import AlloyLinkBar, { LinkBarObject } from "./AlloyLinkBar.jsx";

// NEW: import the item classes so we can hydrate plain JSON
import { LinkObject } from "../cell/AlloyLink.jsx";
import { LinkIconObject } from "../cell/AlloyLinkIcon.jsx";
import { IconObject } from "../cell/AlloyIcon.jsx";

/* ── ID generator ─────────────────────────────────────────── */
let __navCounter = 0;
function nextNavId() {
  __navCounter += 1;
  return `navbar${__navCounter}`;
}

/* ── helper: map plain link JSON → proper instances ───────── */
function toLinkItems(type, arr) {
  if (!Array.isArray(arr)) return [];
  switch (type) {
    case "AlloyLinkIcon":
      return arr.map((l) =>
        l instanceof LinkIconObject
          ? l
          : new LinkIconObject({
              id: l?.id,
              name: l?.name,
              href: l?.href,
              icon: l?.icon instanceof IconObject ? l.icon : new IconObject(l?.icon || {}),
              className: l?.className,
              // no per-item active; bar will inject selected class
              target: l?.target,
              rel: l?.rel,
              onClick: l?.onClick,
              title: l?.title,
            })
      );

    case "AlloyLinkLogo":
      return arr.map((l) =>
        l instanceof LinkLogoObject
          ? l
          : new LinkLogoObject({
              id: l?.id,
              name: l?.name,
              href: l?.href,
              logo: l?.logo,
              width: l?.width,
              height: l?.height,
              logoAlt: l?.logoAlt,
              className: l?.className,
              target: l?.target,
              rel: l?.rel,
              onClick: l?.onClick,
              title: l?.title,
            })
      );

    case "AlloyLink":
    default:
      return arr.map((l) =>
        l instanceof LinkObject
          ? l
          : new LinkObject({
              id: l?.id,
              name: l?.name,
              href: l?.href,
              className: l?.className,
              // no per-item active; bar will inject selected class
              target: l?.target,
              rel: l?.rel,
              onClick: l?.onClick,
              title: l?.title,
            })
      );
  }
}

/* ── NavBarObject (hydrates logo + link bar + links) ──────── */
/**
 * @param {{
 *   id?: string,
 *   className?: string,
 *   logo?: LinkLogoObject|object,
 *   linkBar?: LinkBarObject|{
 *     id?: string,
 *     className?: string,
 *     barName?: object,
 *     type?: "AlloyLink"|"AlloyLinkIcon"|"AlloyLinkLogo",
 *     linkClass?: string,
 *     links?: any[],
 *     selected?: string
 *   }
 * }} p
 */
export class NavBarObject {
  constructor({ id, className, logo, linkBar } = {}) {
    this.id = id ?? nextNavId();
    this.className = className ?? "navbar navbar-expand-lg navbar-light bg-light";

    // logo → ensure LinkLogoObject instance
    this.logo =
      logo instanceof LinkLogoObject
        ? logo
        : new LinkLogoObject(
            logo || {
              href: "/",
              logo: "/logos/alloy.svg",
              name: "Alloy",
              width: 110,
              height: 28,
              logoAlt: "Alloy",
              className: "navbar-brand d-flex align-items-center gap-2",
            }
          );

    // linkBar → ensure LinkBarObject instance and hydrate its links
    if (linkBar instanceof LinkBarObject) {
      this.linkBar = linkBar;
    } else {
      const type = linkBar?.type ?? "AlloyLink";
      const links = toLinkItems(type, linkBar?.links || []);
      this.linkBar = new LinkBarObject({
        id: linkBar?.id,
        className: linkBar?.className ?? "navbar-nav ms-auto mb-2 mb-lg-0 gap-2",
        barName: linkBar?.barName ?? { show: false },
        type,
        linkClass: linkBar?.linkClass ?? "nav-item",
        links,
        selected: linkBar?.selected ?? "active", // navbar demos want 'active'
      });
    }
  }
}

/* ── Component (requires NavBarObject) ────────────────────── */
export function AlloyNavBar({ navBar }) {
  if (!navBar || !(navBar instanceof NavBarObject)) {
    throw new Error("AlloyNavBar requires `navBar` (NavBarObject instance).");
  }

  const navIdRef = useRef(navBar.id);
  const collapseId = `${navIdRef.current}-collapse`;

  return (
    <nav id={navIdRef.current} className={navBar.className}>
      <div className="container-fluid">
        {/* Logo */}
        <AlloyLinkLogo linkLogo={navBar.logo} />

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseId}`}
          aria-controls={collapseId}
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapsible area */}
        <div className="position-relative navbar-collapse collapse justify-content-end" id={collapseId}>
          <AlloyLinkBar linkBar={navBar.linkBar} />
        </div>
      </div>
    </nav>
  );
}

export default AlloyNavBar;
