// src/lib/components/tissue/AlloyModal.jsx
import React, { useState, useEffect } from "react";
import { generateId, OutputObject } from "../../utils/idHelper.js";

import AlloyButton, { ButtonObject } from "../cell/AlloyButton.jsx";
import AlloyInput, { InputObject } from "../cell/AlloyInput.jsx";

/* -------------------------------------------
 * ModalObject
 * ----------------------------------------- */

/**
 * @typedef {Object} ModalConfig
 * @property {string} [id]                  - Optional DOM id. Auto-generated if missing.
 * @property {string} [title]               - Modal title text.
 * @property {string} [className]           - Wrapper classes. Defaults to "modal fade".
 * @property {string} [action]              - Domain action (e.g. "Create", "Edit").
 * @property {ButtonObject|Object} [submit] - Button model (ButtonObject or raw config).
 *
 * @property {Array<InputObject|Object>} [fields]
 *                                           Array of InputObject or raw configs.
 * @property {Object} [data]                - Initial values override: { [name]: value }.
 */
export class ModalObject {
  /**
   * @param {ModalConfig} modal
   */
  constructor(modal = {}) {
    const {
      id,
      title,
      className,
      action,
      submit,
      fields = [],
      data = {},
      ...rest
    } = modal;

    this.id = id ?? generateId("modal");
    this.title = title ?? "";
    this.className = className ?? "modal fade";
    this.action = action ?? "";

    // normalize submit to ButtonObject (if raw config is passed)
    if (submit instanceof ButtonObject) {
      this.submit = submit;
    } else if (submit && typeof submit === "object") {
      this.submit = new ButtonObject(submit);
    } else {
      this.submit = null;
    }

    // normalize fields → InputObject[]
    this.fields = fields.map((f) =>
      f instanceof InputObject ? f : new InputObject(f)
    );

    // initial data map by name; explicit data wins over field.value
    const baseData = {};
    this.fields.forEach((f) => {
      baseData[f.name] = f.value;
    });
    this.data = { ...baseData, ...data };

    Object.assign(this, rest);
  }
}

/* -------------------------------------------
 * Helpers
 * ----------------------------------------- */

function buildInitialValues(modal) {
  const values = {};
  if (modal && Array.isArray(modal.fields)) {
    modal.fields.forEach((f) => {
      if (f instanceof InputObject) {
        values[f.name] = f.value;
      }
    });
  }
  return { ...values, ...(modal.data || {}) };
}

function hasAnyError(fieldErrors) {
  return Object.values(fieldErrors).some(
    (arr) => Array.isArray(arr) && arr.length > 0
  );
}

/**
 * Dismiss a Bootstrap modal:
 *  1) Prefer Bootstrap JS API (Modal.hide())
 *  2) Fallback: click first [data-bs-dismiss="modal"] inside
 */
function dismissModalById(id) {
  if (!id) return;

  const modalEl = document.getElementById(id);
  if (!modalEl) return;

  const win = typeof window !== "undefined" ? window : undefined;

  // 1) Prefer Bootstrap Modal.hide() if available
  if (win && win.bootstrap && win.bootstrap.Modal) {
    const instance = win.bootstrap.Modal.getOrCreateInstance(modalEl);
    if (instance) {
      instance.hide();
      return;
    }
  }

  // 2) Fallback to clicking any dismiss button inside the modal
  const dismissBtn = modalEl.querySelector('[data-bs-dismiss="modal"]');
  if (dismissBtn && typeof dismissBtn.click === "function") {
    dismissBtn.click();
  }
}

/* -------------------------------------------
 * AlloyModal
 * ----------------------------------------- */
export function AlloyModal({ modal, output }) {
  if (!modal || !(modal instanceof ModalObject)) {
    throw new Error("AlloyModal requires `modal` (ModalObject instance).");
  }

  if (!modal.submit || !(modal.submit instanceof ButtonObject)) {
    throw new Error(
      "ModalObject.submit must be a ButtonObject instance for AlloyModal."
    );
  }

  const [values, setValues] = useState(() => buildInitialValues(modal));
  const [fieldErrors, setFieldErrors] = useState({}); // { [name]: string[] }

  // resync when parent passes a new modal object
  useEffect(() => {
    setValues(buildInitialValues(modal));
    setFieldErrors({});
  }, [modal]);

  // Collect child OutputObject from AlloyInput
  const handleInputOutput = (out) => {
    if (!out || !(out instanceof OutputObject)) return;
    const { data, error } = out;
    if (!data || !data.name) return;

    const { name, value, errors = [] } = data;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: error ? errors : [],
    }));
  };

  const handleSubmit = () => {
    if (typeof output !== "function") return;

    const baseFieldsData = { ...values };

    if (hasAnyError(fieldErrors)) {
      const out = OutputObject.errorOf({
        id: modal.id,
        type: "modal",
        action: "submit",
        message: "Validation failed",
        data: {
          ...baseFieldsData,
          errors: fieldErrors,
        },
      });
      output(out);
      return;
    }

    // SUCCESS → data contains ONLY field values
    const out = OutputObject.ok({
      id: modal.id,
      type: "modal",
      action: "submit",
      data: baseFieldsData,
    });

    output(out);

    // AUTO-DISMISS
    dismissModalById(modal.id);
  };

  return (
    <div
      className={modal.className}
      id={modal.id}
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
              {modal.action + " a " + modal.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          {/* Body: render each InputObject */}
          <div className="modal-body">
            {modal.fields.map((inputObj) => (
              <AlloyInput
                key={inputObj.id}
                input={inputObj}
                output={handleInputOutput}
              />
            ))}
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

            <AlloyButton button={modal.submit} output={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlloyModal;
