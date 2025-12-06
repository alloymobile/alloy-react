// src/components/cell/AlloyLoading.jsx

import React, { useRef, forwardRef, useImperativeHandle } from "react";

import AlloyIcon, { IconObject } from "./AlloyIcon.jsx";
import { generateId } from "../../utils/idHelper.js";

/* -------------------------------------------
 * LoadingObject
 *
 * Constructor config shape:
 *
 * {
 *   id?: string;                 // optional DOM id; auto "loading-..." if missing
 *   message?: string;            // optional text under icon (default: "Loading...")
 *   visible?: boolean;           // control visibility (default: true)
 *
 *   // icon can be:
 *   //   - IconObject instance
 *   //   - plain { iconClass: string, id?: string }
 *   icon?: IconObject | { iconClass: string; id?: string };
 *
 *   // Bootstrap classes (all overridable / injectable via JSON)
 *   overlayClass?: string;       // outer overlay wrapper
 *   contentClass?: string;       // inner content container
 *   messageClass?: string;       // message text element
 *
 *   ariaLabel?: string;          // accessible label, default = message or "Loading"
 * }
 * ----------------------------------------- */

export class LoadingObject {
  /**
   * @param {Object} cfg
   */
  constructor(cfg = {}) {
    // Id
    this.id = cfg.id ?? generateId("loading");

    // Message
    this.message = cfg.message ?? "Loading...";

    // Visibility
    this.visible = cfg.visible ?? true;

    // Accessible label
    this.ariaLabel = cfg.ariaLabel ?? this.message ?? "Loading";

    // Icon: allow IconObject or plain { iconClass, id? }
    if (cfg.icon instanceof IconObject) {
      this.icon = cfg.icon;
    } else if (cfg.icon && typeof cfg.icon === "object") {
      this.icon = new IconObject(cfg.icon);
    } else {
      // default Font Awesome spinner
      this.icon = new IconObject({
        iconClass: "fa-solid fa-spinner fa-3x fa-spin",
      });
    }

    // Bootstrap-only defaults (no custom CSS)
    this.overlayClass =
      cfg.overlayClass ??
      "position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50";

    this.contentClass =
      cfg.contentClass ?? "text-center p-4 rounded bg-white shadow";

    this.messageClass =
      cfg.messageClass ?? "mt-3 text-muted";
  }
}

/* -------------------------------------------
 * AlloyLoading
 *
 * Props:
 *   - loading: LoadingObject   (required)
 *
 * Visibility is driven by `loading.visible`.
 * If `visible === false`, component returns null.
 * ----------------------------------------- */

export const AlloyLoading = forwardRef(function AlloyLoading({ loading }, ref) {
  if (!loading || !(loading instanceof LoadingObject)) {
    throw new Error("AlloyLoading requires `loading` (LoadingObject instance).");
  }

  if (!loading.visible) {
    return null;
  }

  const elRef = useRef(null);
  const autoId = useRef(loading.id);

  useImperativeHandle(
    ref,
    () => ({
      el: elRef.current,
      model: loading,
      focus: () => elRef.current?.focus(),
    }),
    [loading]
  );

  return (
    <div
      id={autoId.current}
      ref={elRef}
      className={loading.overlayClass}
      aria-busy="true"
      aria-live="polite"
      aria-label={loading.ariaLabel}
      role="status"
    >
      <div className={loading.contentClass}>
        <AlloyIcon icon={loading.icon} />
        {loading.message && (
          <div className={loading.messageClass}>{loading.message}</div>
        )}
      </div>
    </div>
  );
});

export default AlloyLoading;
