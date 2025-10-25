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
