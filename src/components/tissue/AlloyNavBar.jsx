// src/components/tissue/AlloyNavBar.jsx

import React, { useRef } from "react";

import AlloyLinkLogo, { LinkLogoObject } from "../cell/AlloyLinkLogo.jsx";
import AlloyLinkBar, { LinkBarObject } from "./AlloyLinkBar.jsx";

import { generateId } from "../../utils/idHelper.js";

/**
 * @typedef {Object} NavBarConfig
 *
 * @property {string} [id]
 *    Optional DOM id for the <nav>. Will be auto-generated if missing.
 *
 * @property {string} [className]
 *    Optional className for the outer <nav>.
 *    Defaults to Bootstrap-ish navbar styling.
 *
 * @property {LinkLogoObject|Object} [logo]
 *    Brand / home link at the left.
 *    Must ultimately become a LinkLogoObject.
 *    Callers can pass either:
 *      - new LinkLogoObject({...})
 *      - plain { href, logo, name, ... } and we'll wrap it.
 *
 * @property {LinkBarObject|Object} [linkBar]
 *    The right-side nav links.
 *    Must become a LinkBarObject.
 *    Callers can pass either:
 *      - new LinkBarObject({...})
 *      - plain config:
 *          {
 *            type: "AlloyLink" | "AlloyLinkIcon" | "AlloyLinkLogo",
 *            className,
 *            linkClass,
 *            selected,
 *            title,
 *            links: [...]
 *          }
 *    We'll wrap it with new LinkBarObject(...) which will handle hydration
 *    of links, normalize `title` into TagObject, etc.
 */

/**
 * NavBarObject
 *
 * This is the data model for AlloyNavBar.
 * Responsibilities:
 *  - normalize config
 *  - generate stable id
 *  - ensure `logo` is a LinkLogoObject
 *  - ensure `linkBar` is a LinkBarObject
 *
 * After this constructor runs, AlloyNavBar can trust:
 *   navBar.id is a string
 *   navBar.className is a string
 *   navBar.logo is a LinkLogoObject
 *   navBar.linkBar is a LinkBarObject
 */
export class NavBarObject {
  /**
   * @param {NavBarConfig} nav = {}
   */
  constructor(nav = {}) {
    // 1. id for the <nav> element
    this.id = nav.id ?? generateId("navbar");

    // 2. className for the outer navbar
    this.className =
      nav.className ?? "navbar navbar-expand-lg navbar-light bg-light";

    // 3. normalize logo into LinkLogoObject
    //    If caller passed an instance, keep it. Otherwise wrap the plain object.
    //    We provide a sane default if nothing was passed at all so the navbar
    //    is renderable even with an empty config.
    if (nav.logo instanceof LinkLogoObject) {
      this.logo = nav.logo;
    } else {
      const fallbackLogoConfig = nav.logo ?? {
        href: "/",
        logo: "/logos/alloy.svg",
        name: "Alloy",
        width: 110,
        height: 28,
        logoAlt: "Alloy",
        className: "navbar-brand d-flex align-items-center gap-2",
      };
      this.logo = new LinkLogoObject(fallbackLogoConfig);
    }

    // 4. normalize linkBar into LinkBarObject
    //    If caller passed an instance, keep it.
    //    Otherwise wrap the plain config in new LinkBarObject(...).
    //
    //    IMPORTANT:
    //    LinkBarObject itself:
    //      - generates its own id
    //      - ensures `title` is TagObject
    //      - ensures `links[]` are hydrated into LinkObject/LinkIconObject/LinkLogoObject
    //
    //    So we just pass through whatever plain config we were given, with
    //    some defaults for navbar layout.
    if (nav.linkBar instanceof LinkBarObject) {
      this.linkBar = nav.linkBar;
    } else {
      const rawLinkBar = nav.linkBar ?? {};

      this.linkBar = new LinkBarObject({
        // let LinkBarObject generate its own id if missing
        id: rawLinkBar.id,
        className:
          rawLinkBar.className ??
          "navbar-nav ms-auto mb-2 mb-lg-0 gap-2",

        // Nav bar headings are usually not shown, but we still pass something
        // valid for `title`. If name is "", AlloyLinkBar won't render it.
        title: rawLinkBar.title ?? {
          name: "",
          className: "text-center fw-semibold mb-2",
        },

        type: rawLinkBar.type ?? "AlloyLink",

        linkClass: rawLinkBar.linkClass ?? "nav-item",

        selected: rawLinkBar.selected ?? "active",

        // Let LinkBarObject do the heavy lifting:
        links: Array.isArray(rawLinkBar.links) ? rawLinkBar.links : [],
      });
    }
  }
}

/**
 * AlloyNavBar
 *
 * Renders a responsive Bootstrap-like navbar with:
 *   - brand/logo on the left (AlloyLinkLogo)
 *   - a collapse toggler
 *   - a collapsible area on the right that renders AlloyLinkBar
 *
 * Props:
 *   - navBar: NavBarObject (required)
 *
 * Behavior:
 *   - Uses navBar.id as the base id
 *   - Builds a derived collapse id (for aria-controls/data-bs-target)
 */
export function AlloyNavBar({ navBar }) {
  if (!navBar || !(navBar instanceof NavBarObject)) {
    throw new Error("AlloyNavBar requires `navBar` (NavBarObject instance).");
    // We assume upstream ALWAYS constructs new NavBarObject(navConfig)
    // so React component never has to repair anything.
  }

  const navIdRef = useRef(navBar.id);
  const collapseId = `${navIdRef.current}-collapse`;

  return (
    <nav id={navIdRef.current} className={navBar.className}>
      <div className="container-fluid">
        {/* Brand / Logo */}
        <AlloyLinkLogo linkLogo={navBar.logo} />

        {/* Mobile toggler */}
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

        {/* Collapsible nav links */}
        <div
          className="position-relative navbar-collapse collapse justify-content-end"
          id={collapseId}
        >
          <AlloyLinkBar linkBar={navBar.linkBar} />
        </div>
      </div>
    </nav>
  );
}

export default AlloyNavBar;
