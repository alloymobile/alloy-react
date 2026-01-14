// src/lib/components/cell/AlloyButtonDropDown.jsx

import React, { useMemo, useRef } from "react";

import AlloyLinkBar, { LinkBarObject } from "../tissue/AlloyLinkBar.jsx";
import { LinkObject } from "../cell/AlloyLink.jsx";
import { LinkIconObject } from "../cell/AlloyLinkIcon.jsx";
import { LinkLogoObject } from "../cell/AlloyLinkLogo.jsx";

import { generateId, TagObject } from "../../utils/idHelper.js";

/* ---------------------------------------------------------
 * ButtonDropDownObject
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

      // NEW
      badge,
    } = res;

    this.id = id ?? generateId("btnDropdown");
    this.name = name;
    this.type = type;
    this.className = className;
    this.active = active;

    this.icon = icon || { iconClass: "" };

    // normalize badge → TagObject | null
    const rawBadge = badge || null;
    this.badge = rawBadge
      ? rawBadge instanceof TagObject
        ? rawBadge
        : new TagObject(rawBadge)
      : null;

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
 * ------------------------------------------------------- */

export function AlloyButtonDropDown({ buttonDropDown, output }) {
  const model =
    buttonDropDown instanceof ButtonDropDownObject
      ? buttonDropDown
      : new ButtonDropDownObject(buttonDropDown || {});

  const btnIdRef = useRef(model.id);

  const enhancedLinkBar = useMemo(() => {
    const base =
      model.linkBar instanceof LinkBarObject
        ? model.linkBar
        : new LinkBarObject(model.linkBar || {});

    const cloned = new LinkBarObject({
      id: base.id,
      type: base.type,
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

        return link;
      }),
    });

    return cloned;
  }, [model.linkBar, output]);

  const showBadge =
    !!model.badge &&
    typeof model.badge.name === "string" &&
    model.badge.name.trim().length > 0;

  return (
    <div className="dropdown">
      <button
        id={btnIdRef.current}
        type={model.type}
        className={model.className}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="position-relative d-inline-flex align-items-center">
          {model.icon?.iconClass && (
            <i className={`${model.icon.iconClass} me-2`} aria-hidden="true" />
          )}
          <span>{model.name}</span>

          {showBadge && (
            <span
              className={`position-absolute top-0 start-100 translate-middle ${model.badge.className || ""}`}
              title={model.badge.title || undefined}
            >
              {model.badge.name}
            </span>
          )}
        </span>
      </button>

      <AlloyLinkBar linkBar={enhancedLinkBar} />
    </div>
  );
}

export default AlloyButtonDropDown;
