import React from "react";
import { generateId } from "../../utils/idHelper.js";

/**
 * @typedef {Object} IconConfig
 * @property {string} iconClass             - Required. Font Awesome class string
 *                                            e.g. "fa-solid fa-user fa-2x".
 * @property {string} [id]                  - Optional. If not provided, a unique
 *                                            id will be generated like
 *                                            "icon-1730145329012-x8f3k".
 */

export class IconObject {
  /**
   * Build a new IconObject.
   *
   * Consumers pass one config object (IconConfig). We normalize it
   * and guarantee it has an id.
   *
   * @param {IconConfig} icon
   */
  constructor(icon = {}) {
    if (!icon.iconClass) {
      throw new Error("IconObject requires `iconClass`.");
    }

    this.id = icon.id ?? generateId("icon");
    this.iconClass = icon.iconClass;
  }
}
/**
 * AlloyIcon: accepts ONLY an `icon` prop (instance of Icon).
 * Renders an <i> with the provided id and classes.
 */
export function AlloyIcon({ icon }) {
  if (!icon) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return <i id={icon.id} className={icon.iconClass} aria-hidden="true" />;
}

export default AlloyIcon;
