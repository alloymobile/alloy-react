import React from "react";

/** Incrementing ID: icon1, icon2, ... */
let __iconCounter = 0;
function nextIconId() {
  __iconCounter += 1;
  return `icon${__iconCounter}`;
}

/**
 * Icon object with two properties:
 * - id?: string  (auto-generated if omitted)
 * - iconClass: string  (Font Awesome classes, e.g., "fa-solid fa-user")
 */
export class IconObject {
  /**
   * @param {{ id?: string, iconClass: string }} params
   */
  constructor({ id, iconClass }) {
    if (!iconClass) throw new Error("Icon requires iconClass");
    this.id = id ?? nextIconId();
    this.iconClass = iconClass;
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
