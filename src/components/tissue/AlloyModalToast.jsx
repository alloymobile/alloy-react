// src/lib/components/tissue/AlloyModalToast.jsx
import React from "react";
import { generateId, OutputObject } from "../../utils/idHelper.js";

import AlloyButton, { ButtonObject } from "../cell/AlloyButton.jsx";

/* -------------------------------------------
 * ModalToastObject
 * ----------------------------------------- */

/**
 * @typedef {Object} ModalToastConfig
 * @property {string} [id]                  - Optional DOM id. Auto-generated if missing.
 * @property {string} [title]               - Modal title text.
 * @property {string} [className]           - Wrapper classes. Defaults to "modal fade".
 * @property {string} [action]              - Domain action key (e.g. "deleteVendorConfirmed").
 * @property {ButtonObject|Object} [submit] - Primary button model (ButtonObject or raw config).
 * @property {string} [message]             - Toast message in body.
 */
export class ModalToastObject {
  /**
   * @param {ModalToastConfig} modalToast
   */
  constructor(modalToast = {}) {
    const {
      id,
      title,
      className,
      action,
      submit,
      message,
      ...rest
    } = modalToast;

    this.id = id ?? generateId("modalToast");
    this.title = title ?? "";
    this.className = className ?? "modal fade";
    this.action = action ?? "";

    if (submit instanceof ButtonObject) {
      this.submit = submit;
    } else if (submit && typeof submit === "object") {
      this.submit = new ButtonObject(submit);
    } else {
      this.submit = null;
    }

    this.message = message ?? "";

    Object.assign(this, rest);
  }
}

/* -------------------------------------------
 * Helper: dismiss modal by id via data-bs-dismiss
 * (same strategy as AlloyModal)
 * ----------------------------------------- */
function dismissModalById(id) {
  const modalEl = document.getElementById(id);
  if (!modalEl) return;

  const dismissBtn = modalEl.querySelector('[data-bs-dismiss="modal"]');
  if (dismissBtn && typeof dismissBtn.click === "function") {
    dismissBtn.click();
  }
}

/* -------------------------------------------
 * AlloyModalToast
 *
 * Props:
 *   - modalToast: ModalToastObject (required)
 *   - output?: (out: OutputObject) => void
 *
 * Behaviour:
 *   - On primary button click, emit:
 *       OutputObject.ok({
 *         id: modalToast.id,
 *         type: "modal-toast",
 *         action: "click",
 *         data: {
 *           action: modalToast.action,
 *           title: modalToast.title,
 *           message: modalToast.message
 *         }
 *       })
 *     then auto-dismiss the modal via data-bs-dismiss.
 * ----------------------------------------- */
export function AlloyModalToast({ modalToast, output }) {
  if (!modalToast || !(modalToast instanceof ModalToastObject)) {
    throw new Error(
      "AlloyModalToast requires `modalToast` (ModalToastObject instance)."
    );
  }

  if (!modalToast.submit || !(modalToast.submit instanceof ButtonObject)) {
    throw new Error(
      "ModalToastObject.submit must be a ButtonObject instance for AlloyModalToast."
    );
  }

  const handleOk = () => {
    if (typeof output === "function") {
      const out = OutputObject.ok({
        id: modalToast.id,
        type: "modal-toast",
        action: "click",
        data: {
          action: modalToast.action,
          title: modalToast.title,
          message: modalToast.message,
        },
      });

      output(out);
    }

    // AUTO-DISMISS toast modal (same as AlloyModal)
    dismissModalById(modalToast.id);
  };

  return (
    <div
      className={modalToast.className}
      id={modalToast.id}
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {modalToast.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          {/* Body */}
          <div className="modal-body">
            <h3>{modalToast.message}</h3>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-dark"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>

            <AlloyButton button={modalToast.submit} output={handleOk} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlloyModalToast;
