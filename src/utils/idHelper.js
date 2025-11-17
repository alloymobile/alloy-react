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
/**
 * OutputObject
 * - id: unique identifier of the source (e.g. "button1", "form-123")
 * - type: semantic source type, e.g. "button", "form", "icon"
 * - action: semantic action, e.g. "click", "submit", "change"
 * - error: boolean flag (default false)
 * - data: any key/value payload
 *          - if error === false: data contains your normal payload
 *          - if error === true:  data contains your error info (e.g. { message })
 */
export class OutputObject {
  /**
   * @param {Object} [output]
   * @param {string} [output.id]             - Optional top-level id; if omitted we try data.id, else "".
   * @param {string} [output.type=""]        - "button" | "form" | "icon" | ...
   * @param {string} [output.action=""]      - "click" | "submit" | "change" | ...
   * @param {Object} [output.data={}]        - Payload; shape depends on error flag.
   * @param {boolean} [output.error=false]   - Error flag
   */
  constructor(output = {}) {
    const {
      id,
      type = "",
      action = "",
      data = {},
      error = false
    } = output || {};

    // Prefer explicit id, else fall back to data.id, else ""
    const resolvedId =
      typeof id !== "undefined"
        ? id
        : (data && typeof data.id !== "undefined" ? data.id : "");

    this.id = resolvedId;
    this.type = type;
    this.action = action;
    this.error = Boolean(error);
    this.data = { ...data }; // no forced id/name inside data anymore
  }

  /**
   * Helper: success (non-error) payload
   *
   * Usage:
   *   OutputObject.ok({
   *     id: "button1",
   *     type: "button",
   *     action: "mouseleave",
   *     data: { name: "Primary" }
   *   });
   */
  static ok({ id = "", type = "", action = "", data = {} } = {}) {
    return new OutputObject({
      id,
      type,
      action,
      error: false,
      data
    });
  }

  /**
   * Helper: error payload
   *
   * Usage:
   *   OutputObject.errorOf({
   *     id: "button1",
   *     type: "button",
   *     action: "mouseleave",
   *     message: "There is an error in the button"
   *   });
   */
  static errorOf({
    id = "",
    type = "",
    action = "",
    message = "",
    data = {}
  } = {}) {
    const mergedData = { ...data };

    // Put message into data.message if provided,
    // but don't override an existing message unless you want to.
    if (message && mergedData.message == null) {
      mergedData.message = String(message);
    }

    return new OutputObject({
      id,
      type,
      action,
      error: true,
      data: mergedData
    });
  }

  /**
   * Mark this instance as error and merge extra fields into data.
   *
   * Example:
   *   out.addError("Bad value", { code: "BAD_VALUE" });
   */
  addError(message, extra = {}) {
    this.error = true;
    const next = { ...this.data, ...extra };

    if (message) {
      // keep/attach a message; don't blindly overwrite if already present
      if (next.message == null) {
        next.message = String(message);
      }
    }

    this.data = next;
    return this;
  }

  /** Clear error flag; keep existing data as-is */
  clearError() {
    this.error = false;
    return this;
  }

  /** Safe JSON representation */
  toJSON() {
    return {
      id: this.id,
      type: this.type,
      action: this.action,
      error: this.error,
      data: { ...this.data }
    };
  }
}
