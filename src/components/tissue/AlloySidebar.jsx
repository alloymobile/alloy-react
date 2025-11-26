// src/lib/components/organ/AlloySideBar.jsx
import React, { useMemo } from "react";

import AlloyLinkBar, { LinkBarObject } from "../tissue/AlloyLinkBar.jsx";
import { LinkObject } from "../cell/AlloyLink.jsx";
import { LinkIconObject } from "../cell/AlloyLinkIcon.jsx";
import { LinkLogoObject } from "../cell/AlloyLinkLogo.jsx";
import { generateId } from "../../utils/idHelper.js";

/* ---------------------------------------------------------
 * SideBarObject
 *
 * React equivalent of your Angular AlloySideBar model:
 *   - close: string (offcanvas id)
 *   - selected: LinkObject (optional, not used for state yet)
 *   - categories: LinkBarObject[]
 * ------------------------------------------------------- */

export class SideBarObject {
  constructor(res = {}) {
    const {
      close = "mobileSidebar",
      selected,
      categories,
    } = res;

    this.id = res.id ?? generateId("sidebar");

    // Offcanvas id (used as #id for mobile)
    this.close = close;

    // Optional selected link; we keep it for parity with Angular,
    // even if selection is actually handled by AlloyLinkBar internally.
    this.selected =
      selected instanceof LinkObject
        ? selected
        : null;

    // Normalize categories into LinkBarObject[]
    const rawCategories = Array.isArray(categories) ? categories : [];
    this.categories = rawCategories.map((bar) =>
      bar instanceof LinkBarObject ? bar : new LinkBarObject(bar)
    );
  }
}

/* ---------------------------------------------------------
 * AlloySideBar
 *
 * Props:
 *   - sideBar : SideBarObject | plain config
 *   - output? : (link: LinkObject | LinkIconObject | LinkLogoObject) => void
 *
 * Behavior:
 *   - Renders a DESKTOP sidebar + MOBILE offcanvas sidebar.
 *   - Uses AlloyLinkBar for each category.
 *   - Injects a wrapped onClick into each link so `output(link)`
 *     is called whenever user clicks a sidebar item.
 *
 * NOTE:
 *   Selection highlight is handled by AlloyLinkBar itself,
 *   via its own internal `selectedId` state.
 * ------------------------------------------------------- */

export function AlloySideBar({ sideBar, output }) {
  const model =
    sideBar instanceof SideBarObject
      ? sideBar
      : new SideBarObject(sideBar || {});

  // Build categories where each link has an onClick that
  // both calls any existing link.onClick and also emits to `output`.
  const enhancedCategories = useMemo(() => {
    return model.categories.map((bar) => {
      const baseBar =
        bar instanceof LinkBarObject ? bar : new LinkBarObject(bar);

      // Clone into a new LinkBarObject config so we don't mutate the original
      const clonedBar = new LinkBarObject({
        id: baseBar.id,
        className: baseBar.className,
        type: baseBar.type,
        linkClass: baseBar.linkClass,
        selected: baseBar.selected,
        title: baseBar.title,
        // We'll rewire links below
        links: baseBar.links.map((link) => {
          const original = link.onClick;

          const wrappedClick = (e) => {
            // let the link's own handler run first if it exists
            original?.(e);
            // then bubble up to parent (like Angular EventEmitter)
            output?.(link);
          };

          // Rebuild according to the actual link type
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

          // Default: plain LinkObject
          if (link instanceof LinkObject) {
            return new LinkObject({
              ...link,
              onClick: wrappedClick,
            });
          }

          // Unknown type – return as-is
          return link;
        }),
      });

      return clonedBar;
    });
  }, [model, output]);

  const offcanvasId = model.close || "mobileSidebar";

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="desktop-sidebar d-none d-lg-block">
        <div className="p-3">
          {enhancedCategories.map((bar) => (
            <AlloyLinkBar key={bar.id} linkBar={bar} />
          ))}
        </div>
      </aside>

      {/* MOBILE SIDEBAR (Bootstrap offcanvas) */}
      <div
        className="offcanvas offcanvas-start d-lg-none"
        tabIndex={-1}
        id={offcanvasId}
        aria-labelledby={`${offcanvasId}Label`}
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {enhancedCategories.map((bar) => (
            <AlloyLinkBar key={`${bar.id}-mobile`} linkBar={bar} />
          ))}
        </div>
      </div>
    </>
  );
}

export default AlloySideBar;
