// src/components/cell/AlloyLoading.jsx

import React, { useMemo } from "react";

import AlloyIcon, { IconObject } from "./AlloyIcon.jsx";
import { useDomId } from "../../utils/idHelper.js"; // <-- adjust path to your hook

/* -------------------------------------------
 * LoadingObject
 * ----------------------------------------- */

export class LoadingObject {
  /**
   * @param {Object} cfg
   */
  constructor(cfg = {}) {
    // IMPORTANT (SSR-safe):
    // Do NOT auto-generate ids in the model layer.
    // If caller wants a fixed id, they pass it.
    this.id = cfg.id; // optional

    this.message = cfg.message ?? "Loading...";
    this.visible = cfg.visible ?? true;

    this.ariaLabel = cfg.ariaLabel ?? this.message ?? "Loading";

    // Icon: allow IconObject or plain { iconClass, className?, id? }
    if (cfg.icon instanceof IconObject) {
      this.icon = cfg.icon;
    } else if (cfg.icon && typeof cfg.icon === "object") {
      this.icon = new IconObject(cfg.icon);
    } else {
      this.icon = new IconObject({
        iconClass: "fa-solid fa-spinner fa-3x fa-spin"
      });
    }

    this.overlayClass =
      cfg.overlayClass ??
      "position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50";

    this.contentClass = cfg.contentClass ?? "text-center p-4 rounded bg-white shadow";

    this.messageClass = cfg.messageClass ?? "mt-3 text-muted";
  }
}

/* -------------------------------------------
 * AlloyLoading
 * ----------------------------------------- */

export function AlloyLoading({ loading }) {
  if (!loading || !(loading instanceof LoadingObject)) {
    throw new Error("AlloyLoading requires `loading` (LoadingObject instance).");
  }

  if (!loading.visible) {
    return null;
  }

  // SSR/CSR-stable DOM id
  const domId = useDomId("loading", loading.id);

  return (
    <div
      id={domId}
      className={loading.overlayClass}
      aria-busy="true"
      aria-live="polite"
      aria-label={loading.ariaLabel}
      role="status"
    >
      <div className={loading.contentClass}>
        <AlloyIcon icon={loading.icon} />
        {loading.message && <div className={loading.messageClass}>{loading.message}</div>}
      </div>
    </div>
  );
}

export default AlloyLoading;
