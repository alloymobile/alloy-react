// src/lib/components/cell/AlloyButtonDropDown.jsx

import React, { useMemo, useRef } from "react";

import AlloyLinkBar, { LinkBarObject } from "../tissue/AlloyLinkBar.jsx";
import { LinkObject } from "../cell/AlloyLink.jsx";
import { LinkIconObject } from "../cell/AlloyLinkIcon.jsx";
import { LinkLogoObject } from "../cell/AlloyLinkLogo.jsx";

import { generateId } from "../../utils/idHelper.js";

/* ---------------------------------------------------------
 * ButtonDropDownObject
 *
 * React equivalent of AlloyButtonDropDown (Angular):
 *  - id, name, type, className, active
 *  - icon: { iconClass?: string, ... }  (kept simple)
 *  - linkBar: LinkBarObject
 * ------------------------------------------------------- */

export class ButtonDropDownObject {
  constructor(res = {}) {
    const {
      id,
      name = "Menu",
      type = "button",
      className = "btn btn-sm btn-outline-secondary dropdown-toggle",
      active = "",
      icon,
      linkBar,
    } = res;

    this.id = id ?? generateId("btnDropdown");
    this.name = name;
    this.type = type;
    this.className = className;
    this.active = active;

    // icon is kept as a simple object; it matches what your LinkIconObject expects
    this.icon = icon || { iconClass: "" };

    // normalize linkBar → LinkBarObject
    if (linkBar instanceof LinkBarObject) {
      this.linkBar = linkBar;
    } else {
      this.linkBar = new LinkBarObject(
        linkBar || {
          className: "dropdown-menu",
          linkClass: "dropdown-item",
        }
      );
    }
  }
}

/* ---------------------------------------------------------
 * AlloyButtonDropDown
 *
 * Props:
 *  - buttonDropDown : ButtonDropDownObject | plain config
 *  - output?        : (link) => void
 *
 * Behavior:
 *  - Renders a Bootstrap dropdown:
 *      <div className="dropdown">
 *        <button ... data-bs-toggle="dropdown">
 *        <AlloyLinkBar ...> as dropdown menu
 *  - Wraps each link’s onClick so:
 *      - link’s own onClick (if any) fires
 *      - then `output(link)` is called (similar to Angular EventEmitter)
 * ------------------------------------------------------- */

export function AlloyButtonDropDown({ buttonDropDown, output }) {
  const model =
    buttonDropDown instanceof ButtonDropDownObject
      ? buttonDropDown
      : new ButtonDropDownObject(buttonDropDown || {});

  const btnIdRef = useRef(model.id);

  // Enhance linkBar so dropdown items call `output(link)` on click
  const enhancedLinkBar = useMemo(() => {
    const base =
      model.linkBar instanceof LinkBarObject
        ? model.linkBar
        : new LinkBarObject(model.linkBar || {});

    const cloned = new LinkBarObject({
      id: base.id,
      type: base.type,
      // For dropdown, default to Bootstrap menu classes if caller didn't override
      className: base.className || "dropdown-menu",
      linkClass: base.linkClass || "dropdown-item",
      selected: base.selected || "active",
      title: base.title,
      links: base.links.map((link) => {
        const originalOnClick = link.onClick;

        const wrappedClick = (e) => {
          originalOnClick?.(e);
          output?.(link);
        };

        if (link instanceof LinkIconObject) {
          return new LinkIconObject({
            ...link,
            onClick: wrappedClick,
          });
        }

        if (link instanceof LinkLogoObject) {
          return new LinkLogoObject({
            ...link,
            onClick: wrappedClick,
          });
        }

        if (link instanceof LinkObject) {
          return new LinkObject({
            ...link,
            onClick: wrappedClick,
          });
        }

        // Fallback – unknown type
        return link;
      }),
    });

    return cloned;
  }, [model.linkBar, output]);

  return (
    <div className="dropdown">
      <button
        id={btnIdRef.current}
        type={model.type}
        className={model.className}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {model.icon?.iconClass && (
          <i className={`${model.icon.iconClass} me-2`} aria-hidden="true" />
        )}
        <span>{model.name}</span>
      </button>

      {/* This nav/ul combo becomes the dropdown menu; the UL gets className="dropdown-menu" */}
      <AlloyLinkBar linkBar={enhancedLinkBar} />
    </div>
  );
}

export default AlloyButtonDropDown;
