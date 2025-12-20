// src/components/cell/AlloyIcon.jsx
import React from "react";
import { useDomId } from "../../utils/idHelper.js";

/**
 * @typedef {Object} IconConfig
 * @property {string} iconClass       - Required. Font Awesome class string (for <i>).
 *                                     e.g. "fa-solid fa-user" or "fa-solid fa-user fa-2x"
 * @property {string} [id]            - Optional DOM id. If omitted, stable id via useDomId().
 *
 * @property {string} [className]     - Optional wrapper <span> className.
 *                                     Defaults to "d-inline-flex align-items-center justify-content-center".
 */

export class IconObject {
  /**
   * Build a new IconObject.
   * Normalizes config and supports SSR-safe DOM id generation via AlloyIcon.
   *
   * @param {IconConfig} icon
   */
  constructor(icon = {}) {
    if (!icon.iconClass) {
      throw new Error("IconObject requires `iconClass`.");
    }

    // IMPORTANT for Next.js: do not generate random ids here
    this.id = icon.id;

    // <i> classes (Font Awesome + sizing)
    this.iconClass = icon.iconClass;

    // <span> wrapper classes (background/padding/rounding/etc.)
    this.className =
      icon.className ??
      "d-inline-flex align-items-center justify-content-center";
  }
}

/**
 * AlloyIcon: accepts ONLY an `icon` prop (IconObject instance).
 * Renders:
 *   <span id="..." class="...">
 *     <i class="..."></i>
 *   </span>
 *
 * NOTE: id is on the <span>.
 */
export function AlloyIcon({ icon }) {
  if (!icon || !(icon instanceof IconObject)) {
    throw new Error("AlloyIcon requires `icon` prop (IconObject instance).");
  }

  // Reminder: stable id across SSR/CSR (or provided id)
  const domId = useDomId("icon", icon.id);

  return (
    <span id={domId} className={icon.className} aria-hidden="true">
      <i className={icon.iconClass} aria-hidden="true" />
    </span>
  );
}

export default AlloyIcon;
