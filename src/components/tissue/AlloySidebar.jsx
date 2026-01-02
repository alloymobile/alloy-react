// src/lib/components/organ/AlloySideBar.jsx
import React, { useMemo } from "react";

import AlloyLinkBar, { LinkBarObject } from "../tissue/AlloyLinkBar.jsx";
import { LinkObject } from "../cell/AlloyLink.jsx";
import { LinkIconObject } from "../cell/AlloyLinkIcon.jsx";
import { LinkLogoObject } from "../cell/AlloyLinkLogo.jsx";
import { generateId } from "../../utils/idHelper.js";

/* ---------------------------------------------------------
 * SideBarObject
 * ------------------------------------------------------- */

export class SideBarObject {
  constructor(res = {}) {
    const {
      close = "mobileSidebar",
      offcanvasId,
      selected,
      categories,
    } = res;

    this.id = res.id ?? generateId("sidebar");

    // Offcanvas id (used as #id for mobile)
    this.close = offcanvasId ?? close;

    this.selected =
      selected instanceof LinkObject
        ? selected
        : null;

    const rawCategories = Array.isArray(categories) ? categories : [];
    this.categories = rawCategories.map((bar) =>
      bar instanceof LinkBarObject ? bar : new LinkBarObject(bar)
    );
  }
}

export function AlloySideBar({ sideBar, output }) {
  const model =
    sideBar instanceof SideBarObject
      ? sideBar
      : new SideBarObject(sideBar || {});

  const enhancedCategories = useMemo(() => {
    return model.categories.map((bar) => {
      const baseBar =
        bar instanceof LinkBarObject ? bar : new LinkBarObject(bar);

      const clonedBar = new LinkBarObject({
        id: baseBar.id,
        className: baseBar.className,
        type: baseBar.type,
        linkClass: baseBar.linkClass,
        selected: baseBar.selected,
        title: baseBar.title,
        links: baseBar.links.map((link) => {
          const original = link.onClick;

          const wrappedClick = (e) => {
            original?.(e);
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

      return clonedBar;
    });
  }, [model, output]);

  const offcanvasId = model.close || "mobileSidebar";

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="desktop-sidebar d-none d-lg-block">
          {enhancedCategories.map((bar) => (
            <AlloyLinkBar key={bar.id} linkBar={bar} />
          ))}
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
