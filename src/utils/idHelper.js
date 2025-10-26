// src/utils/idHelper.js

/**
 * Generate a unique ID string with a given prefix.
 *
 * Examples:
 *   generateId("link")   -> "link-1730145329012-x8f3k"
 *   generateId("input")  -> "input-1730145329012-p2a9q"
 *
 * - Timestamp gives us high uniqueness across runs / reloads / bundles.
 * - Random slug protects from two calls in the same millisecond.
 *
 * This is appropriate for DOM ids, React keys, etc.
 *
 * @param {string} prefix - semantic prefix like "link", "btn", "row", etc.
 * @returns {string} unique id
 */
export function generateId(prefix = "id") {
  const ts = Date.now(); // ms since epoch
  const rand = Math.random().toString(36).slice(2, 7); // short random token
  return `${prefix}-${ts}-${rand}`;
}

/**
 * TagObject
 *
 * Lightweight label/title model reused across the library.
 *
 * Fields:
 *  - id?: string        DOM id. Auto-generated if not provided.
 *  - name?: string      Text to render. If falsy ("" / undefined / null), consumers should NOT render.
 *  - className?: string Classes to style that label wrapper.
 *
 * Rendering rule:
 *   If `name` is missing or empty, nothing should render.
 */
export class TagObject {
  constructor(tag = {}) {
    const { id, name, className } = tag;

    this.id = id ?? generateId("tag");
    this.name = name ?? "";        // empty string = "do not render"
    this.className = className ?? "";
  }
}