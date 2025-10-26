// src/components/tissue/AlloyLinkBar.jsx

import React, { useEffect, useRef, useState } from "react";

import AlloyLink, { LinkObject } from "../cell/AlloyLink.jsx";
import AlloyLinkIcon, { LinkIconObject } from "../cell/AlloyLinkIcon.jsx";
import AlloyLinkLogo, { LinkLogoObject } from "../cell/AlloyLinkLogo.jsx";

import { generateId, TagObject } from "../../utils/idHelper.js";

/**
 * @typedef {Object} LinkBarConfig
 * @property {string} [id]                - Optional DOM id for the <ul>. Auto-generated if missing.
 * @property {string} [className]         - Optional. Classes for the <ul> container.
 *                                          Defaults to "d-flex justify-content-center".
 * @property {TagObject|Object} [title]   - Optional. Bar heading.
 *                                          Can be:
 *                                            - instance of TagObject
 *                                            - plain object { id?, name?, className? }
 *                                            - or undefined
 *                                          We'll always store a TagObject instance.
 *                                          If title.name is "", AlloyLinkBar will not render it.
 * @property {string} [type]              - Which link flavor this bar renders.
 *                                          "AlloyLink" | "AlloyLinkIcon" | "AlloyLinkLogo"
 *                                          Defaults to "AlloyLink".
 * @property {string} [linkClass]         - Class name applied to each <li>.
 *                                          Defaults to "nav-item".
 * @property {Array<any>} [links]         - Array of link models or link-like configs.
 *                                          For each element:
 *                                            - If already the correct instance, keep it.
 *                                            - Else we'll wrap it with new LinkObject / LinkIconObject / LinkLogoObject.
 * @property {string} [selected]          - Class string applied to the active/selected item.
 *                                          Defaults to "active".
 */

/**
 * LinkBarObject
 *
 * This is the data model for AlloyLinkBar.
 *
 * Responsibilities:
 *  - Validate / default its OWN fields (id, className, type, linkClass, selected).
 *  - Normalize `title` so it's ALWAYS a TagObject instance.
 *  - Normalize `links` so they're ALWAYS instances of the correct link model
 *    based on `this.type`.
 *
 * It does NOT do UI work (no selection state, no onClick wrapping).
 * AlloyLinkBar (the component) handles interaction.
 */
export class LinkBarObject {
  /**
   * @param {LinkBarConfig} bar
   */
  constructor(bar = {}) {
    // --- basic fields for THIS object ---
    this.id = bar.id ?? generateId("linkBar");
    this.className = bar.className ?? "d-flex justify-content-center";
    this.type = bar.type ?? "AlloyLink";
    this.linkClass = bar.linkClass ?? "nav-item";
    this.selected = bar.selected ?? "active";

    // --- normalize title into a TagObject instance ---
    // If caller passed:
    //   - TagObject → keep it
    //   - plain object → wrap it
    //   - nothing → make empty TagObject { name:"" } so render logic can safely read .name
    if (bar.title instanceof TagObject) {
      this.title = bar.title;
    } else if (bar.title) {
      this.title = new TagObject(bar.title);
    } else {
      this.title = new TagObject({}); // name defaults to "" inside TagObject
    }

    // --- normalize links into the proper link model instances ---
    const rawLinks = Array.isArray(bar.links) ? bar.links : [];

    if (this.type === "AlloyLinkIcon") {
      // Expect LinkIconObject or plain config usable by new LinkIconObject
      this.links = rawLinks.map((item) =>
        item instanceof LinkIconObject ? item : new LinkIconObject(item)
      );
    } else if (this.type === "AlloyLinkLogo") {
      // Expect LinkLogoObject or plain config usable by new LinkLogoObject
      this.links = rawLinks.map((item) =>
        item instanceof LinkLogoObject ? item : new LinkLogoObject(item)
      );
    } else {
      // Default "AlloyLink"
      this.links = rawLinks.map((item) =>
        item instanceof LinkObject ? item : new LinkObject(item)
      );
    }
  }
}

/**
 * cloneWithActiveAndClick
 *
 * We never mutate the user's original link model.
 * We instead create a *new* model instance of the SAME CLASS with:
 *   - updated `active` (only if this item is selected)
 *   - wrapped `onClick` so we update local selection, then call user's original handler
 */
function cloneWithActiveAndClick(item, injectedActiveClass, isSelected, wrapClickFn) {
  const activeClass = isSelected ? injectedActiveClass : "";

  if (item instanceof LinkObject) {
    return new LinkObject({
      id: item.id,
      name: item.name,
      href: item.href,
      className: item.className,
      active: activeClass,
      target: item.target,
      rel: item.rel,
      onClick: wrapClickFn,
      title: item.title
    });
  }

  if (item instanceof LinkIconObject) {
    return new LinkIconObject({
      id: item.id,
      href: item.href,
      icon: item.icon,
      name: item.name,
      className: item.className,
      active: activeClass,
      target: item.target,
      rel: item.rel,
      onClick: wrapClickFn,
      title: item.title
    });
  }

  if (item instanceof LinkLogoObject) {
    return new LinkLogoObject({
      id: item.id,
      name: item.name,
      href: item.href,
      logo: item.logo,
      width: item.width,
      height: item.height,
      logoAlt: item.logoAlt,
      className: item.className,
      active: activeClass,
      target: item.target,
      rel: item.rel,
      onClick: wrapClickFn,
      title: item.title
    });
  }

  // If it's some unknown thing, just return it as-is.
  return item;
}

/**
 * AlloyLinkBar
 *
 * Props:
 *   - linkBar: LinkBarObject (required)
 *
 * Renders:
 *   [optional heading if linkBar.title.name is truthy]
 *   <ul id={linkBar.id} className={linkBar.className}>
 *     <li className={linkBar.linkClass}>
 *       <AlloyLink / AlloyLinkIcon / AlloyLinkLogo />
 *     </li>
 *   </ul>
 *
 * Behavior:
 *   - Tracks which link is "selected"
 *   - Injects linkBar.selected into just that one cloned link as `active`
 *   - Wraps each link's onClick to update selectedId first, then call the original handler
 */
export function AlloyLinkBar({ linkBar }) {
  if (!linkBar || !(linkBar instanceof LinkBarObject)) {
    throw new Error("AlloyLinkBar requires `linkBar` (LinkBarObject instance).");
  }

  // Stable UL id, so React doesn't reassign DOM ids on rerender
  const ulIdRef = useRef(linkBar.id);

  // Track which link is currently "active"
  const [selectedId, setSelectedId] = useState("");

  // Reset selection when a whole new LinkBarObject is passed in
  useEffect(() => {
    setSelectedId("");
  }, [linkBar]);

  // Optional title. We render ONLY if there's a non-empty .name
  const Title = () =>
    linkBar.title && linkBar.title.name ? (
      <div
        id={linkBar.title.id}
        className={linkBar.title.className}
      >
        {linkBar.title.name}
      </div>
    ) : null;

  // wrap user's onClick:
  // 1. mark as selected
  // 2. call original onClick if present
  function wrapClick(item) {
    const original = item.onClick;
    return (e) => {
      const nextId = item.id || `${item.href || ""}-${item.name || ""}`;
      setSelectedId(nextId);
      original?.(e);
    };
  }

  function renderLinks() {
    return (
      <ul id={ulIdRef.current} className={linkBar.className}>
        {linkBar.links.map((item, idx) => {
          const isSelected = (item?.id ?? "") === selectedId;

          // clone the model so we can inject active + wrapped onClick
          const cloned = cloneWithActiveAndClick(
            item,
            linkBar.selected,
            isSelected,
            wrapClick(item)
          );

          switch (linkBar.type) {
            case "AlloyLink":
              if (!(cloned instanceof LinkObject)) {
                throw new Error(
                  "AlloyLinkBar (type='AlloyLink') expects each link to be a LinkObject instance."
                );
              }
              return (
                <li
                  key={(item?.id ?? idx) + "-li"}
                  className={linkBar.linkClass}
                >
                  <AlloyLink link={cloned} />
                </li>
              );

            case "AlloyLinkIcon":
              if (!(cloned instanceof LinkIconObject)) {
                throw new Error(
                  "AlloyLinkBar (type='AlloyLinkIcon') expects each link to be a LinkIconObject instance."
                );
              }
              return (
                <li
                  key={(item?.id ?? idx) + "-li"}
                  className={linkBar.linkClass}
                >
                  <AlloyLinkIcon linkIcon={cloned} />
                </li>
              );

            case "AlloyLinkLogo":
              if (!(cloned instanceof LinkLogoObject)) {
                throw new Error(
                  "AlloyLinkBar (type='AlloyLinkLogo') expects each link to be a LinkLogoObject instance."
                );
              }
              return (
                <li
                  key={(item?.id ?? idx) + "-li"}
                  className={linkBar.linkClass}
                >
                  <AlloyLinkLogo linkLogo={cloned} />
                </li>
              );

            default:
              throw new Error(
                `Unsupported linkBar.type "${linkBar.type}".`
              );
          }
        })}
      </ul>
    );
  }

  return (
    <nav data-type={linkBar.type}>
      <Title />
      {renderLinks()}
    </nav>
  );
}

export default AlloyLinkBar;
