// pages/Tissue/Modal.jsx
import React, { useMemo, useState } from "react";
import {
  AlloyModal,
  ModalObject,
  AlloyModalToast,
  ModalToastObject,
  ButtonObject,
  InputObject,
} from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------
 * DEFAULT JSON CONFIGS
 * ----------------------------------------- */

const DEFAULT_MODAL_JSON = JSON.stringify(
  {
    id: "alloyModal01",
    title: "Vendor",
    className: "modal fade",
    action: "Create",
    submit: {
      name: "Save vendor",
      className: "btn btn-primary",
      active: "active",
    },
    fields: [
      {
        name: "vendorName",
        label: "Vendor Name",
        type: "text",
        layout: "text",
        placeholder: "Enter vendor name",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        layout: "text",
        placeholder: "name@example.com",
        required: true,
      },
    ],
    data: {
      vendorName: "",
      email: "",
    },
  },
  null,
  2
);

const DEFAULT_TOAST_JSON = JSON.stringify(
  {
    id: "alloyModalToast01",
    title: "Delete vendor",
    className: "modal fade",
    action: "confirmDelete",
    message: "Are you sure you want to delete this vendor?",
    submit: {
      name: "Delete",
      className: "btn btn-danger",
      active: "active",
    },
  },
  null,
  2
);

/* -------------------------------------------
 * Demo Page
 * ----------------------------------------- */

export default function ModalPage() {
  const [activeTab, setActiveTab] = useState("modal"); // "modal" | "toast"

  // ----- MODAL DEMO STATE -----
  const [modalJson, setModalJson] = useState(DEFAULT_MODAL_JSON);
  const [modalParseError, setModalParseError] = useState("");
  const [modalOutputJson, setModalOutputJson] = useState(
    "// Interact with the modal and click the primary button to see OutputObject here…"
  );

  // ----- TOAST DEMO STATE -----
  const [toastJson, setToastJson] = useState(DEFAULT_TOAST_JSON);
  const [toastParseError, setToastParseError] = useState("");
  const [toastOutputJson, setToastOutputJson] = useState(
    "// Interact with the toast modal and click the primary button to see OutputObject here…"
  );

  /* -------------------------------------------
   * Build ModalObject from JSON
   * ----------------------------------------- */
  const modalModel = useMemo(() => {
    try {
      const raw = JSON.parse(modalJson || "{}");

      // Submit → ButtonObject
      if (raw.submit) {
        raw.submit = new ButtonObject(raw.submit);
      }

      // Fields → InputObject[]
      if (Array.isArray(raw.fields)) {
        raw.fields = raw.fields.map((f) =>
          f instanceof InputObject ? f : new InputObject(f)
        );
      }

      const model = new ModalObject(raw);
      setModalParseError("");
      return model;
    } catch (e) {
      setModalParseError(String(e.message || e));

      // Safe fallback (disabled primary button, empty form)
      return new ModalObject({
        title: "Invalid JSON (Modal)",
        action: "",
        submit: new ButtonObject({
          name: "Submit (disabled)",
          className: "btn btn-secondary",
          disabled: true,
        }),
        fields: [],
      });
    }
  }, [modalJson]);

  /* -------------------------------------------
   * Build ModalToastObject from JSON
   * ----------------------------------------- */
  const toastModel = useMemo(() => {
    try {
      const raw = JSON.parse(toastJson || "{}");

      if (raw.submit) {
        raw.submit = new ButtonObject(raw.submit);
      }

      const model = new ModalToastObject(raw);
      setToastParseError("");
      return model;
    } catch (e) {
      setToastParseError(String(e.message || e));

      return new ModalToastObject({
        title: "Invalid JSON (ModalToast)",
        message: "Fix the JSON on the left to preview a real toast modal.",
        submit: new ButtonObject({
          name: "OK (disabled)",
          className: "btn btn-secondary",
          disabled: true,
        }),
      });
    }
  }, [toastJson]);

  /* -------------------------------------------
   * Global output handlers (Modal / Toast)
   * ----------------------------------------- */

  function handleModalOutput(out) {
    const payload =
      out instanceof OutputObject && typeof out.toJSON === "function"
        ? out.toJSON()
        : out;

    setModalOutputJson(JSON.stringify(payload, null, 2));
  }

  function handleToastOutput(out) {
    const payload =
      out instanceof OutputObject && typeof out.toJSON === "function"
        ? out.toJSON()
        : out;

    setToastOutputJson(JSON.stringify(payload, null, 2));
  }

  /* -------------------------------------------
   * Helpers for reset / format / clear
   * ----------------------------------------- */

  function resetModal() {
    setModalJson(DEFAULT_MODAL_JSON);
    setModalOutputJson(
      "// Interact with the modal and click the primary button to see OutputObject here…"
    );
    setModalParseError("");
  }

  function formatModal() {
    try {
      const parsed = JSON.parse(modalJson);
      setModalJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error UI already shows
    }
  }

  function resetToast() {
    setToastJson(DEFAULT_TOAST_JSON);
    setToastOutputJson(
      "// Interact with the toast modal and click the primary button to see OutputObject here…"
    );
    setToastParseError("");
  }

  function formatToast() {
    try {
      const parsed = JSON.parse(toastJson);
      setToastJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore
    }
  }

  /* -------------------------------------------
   * RENDER
   * ----------------------------------------- */

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyModal &amp; AlloyModalToast</h3>

      {/* Tab switcher */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            type="button"
            className={
              "nav-link" + (activeTab === "modal" ? " active" : "")
            }
            onClick={() => setActiveTab("modal")}
          >
            AlloyModal
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={
              "nav-link" + (activeTab === "toast" ? " active" : "")
            }
            onClick={() => setActiveTab("toast")}
          >
            AlloyModalToast
          </button>
        </li>
      </ul>

      {activeTab === "modal" && (
        <>
          {/* Usage snippet */}
          <div className="row mb-3">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
                <code>
                  {`<AlloyModal modal={new ModalObject(modalObject)} output={handleOutput} />`}
                </code>
              </pre>
            </div>
          </div>

          {/* Live preview */}
          <div className="row mb-4">
            <div className="col-12 text-center">
              {/* Bootstrap trigger button */}
              <button
                type="button"
                className="btn btn-outline-primary mb-3"
                data-bs-toggle="modal"
                data-bs-target={`#${modalModel.id}`}
              >
                Open Modal
              </button>

              <AlloyModal modal={modalModel} output={handleModalOutput} />

              <div className="small text-secondary mt-2">
                The primary button emits a single <code>OutputObject</code>{" "}
                with <code>id</code>, <code>type="modal"</code>,{" "}
                <code>action="submit"</code>, <code>error</code> and a{" "}
                <code>data</code> payload containing field values,{" "}
                <code>action</code>, and <code>title</code>.
              </div>
            </div>
          </div>

          {/* JSON in / JSON out */}
          <div className="row g-3 align-items-stretch">
            {/* Left: Input JSON */}
            <div className="col-12 col-lg-6">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-semibold">
                  Modal Input JSON (editable)
                </span>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={resetModal}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={formatModal}
                    title="Format JSON"
                  >
                    <i
                      className="fa-solid fa-wand-magic-sparkles me-2"
                      aria-hidden="true"
                    />
                    Format
                  </button>
                </div>
              </div>

              <textarea
                className={`form-control font-monospace ${
                  modalParseError ? "is-invalid" : ""
                }`}
                rows={18}
                value={modalJson}
                onChange={(e) => setModalJson(e.target.value)}
                spellCheck={false}
              />
              {modalParseError && (
                <div className="invalid-feedback d-block mt-1">
                  {modalParseError}
                </div>
              )}

              <div className="form-text">
                Required: <code>submit.name</code> (for{" "}
                <code>ButtonObject</code>) and{" "}
                <code>fields[].name</code> (for <code>InputObject</code>).
                Optional: <code>id</code>, <code>className</code>,{" "}
                <code>action</code>, <code>data</code>, etc.
              </div>
            </div>

            {/* Right: Output JSON */}
            <div className="col-12 col-lg-6">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-semibold">
                  Output (from <code>output</code> callback)
                </span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => setModalOutputJson("// cleared")}
                >
                  Clear
                </button>
              </div>

              <textarea
                className="form-control font-monospace"
                rows={18}
                value={modalOutputJson}
                onChange={(e) => setModalOutputJson(e.target.value)}
                spellCheck={false}
              />
              <div className="form-text">
                Shape (success):
                <pre className="mb-0 mt-1 small">
{`{
  "id": "alloyModal01",
  "type": "modal",
  "action": "submit",
  "error": false,
  "data": {
    "vendorName": "Acme Inc.",
    "email": "info@example.com",
    "action": "Create",
    "title": "Vendor"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "toast" && (
        <>
          {/* Usage snippet */}
          <div className="row mb-3">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
                <code>
                  {`<AlloyModalToast modalToast={new ModalToastObject(modalToastObject)} output={handleOutput} />`}
                </code>
              </pre>
            </div>
          </div>

          {/* Live preview */}
          <div className="row mb-4">
            <div className="col-12 text-center">
              <button
                type="button"
                className="btn btn-outline-danger mb-3"
                data-bs-toggle="modal"
                data-bs-target={`#${toastModel.id}`}
              >
                Open Toast Modal
              </button>

              <AlloyModalToast
                modalToast={toastModel}
                output={handleToastOutput}
              />

              <div className="small text-secondary mt-2">
                The primary button emits a single <code>OutputObject</code>{" "}
                with <code>type="modal-toast"</code>,{" "}
                <code>action="click"</code> and <code>data</code> containing{" "}
                <code>action</code>, <code>title</code>, and{" "}
                <code>message</code>.
              </div>
            </div>
          </div>

          {/* JSON in / JSON out */}
          <div className="row g-3 align-items-stretch">
            {/* Left: Input JSON */}
            <div className="col-12 col-lg-6">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-semibold">
                  ModalToast Input JSON (editable)
                </span>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={resetToast}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={formatToast}
                    title="Format JSON"
                  >
                    <i
                      className="fa-solid fa-wand-magic-sparkles me-2"
                      aria-hidden="true"
                    />
                    Format
                  </button>
                </div>
              </div>

              <textarea
                className={`form-control font-monospace ${
                  toastParseError ? "is-invalid" : ""
                }`}
                rows={18}
                value={toastJson}
                onChange={(e) => setToastJson(e.target.value)}
                spellCheck={false}
              />
              {toastParseError && (
                <div className="invalid-feedback d-block mt-1">
                  {toastParseError}
                </div>
              )}

              <div className="form-text">
                Required: <code>submit.name</code> and{" "}
                <code>message</code>. Optional: <code>id</code>,{" "}
                <code>className</code>, <code>action</code>, etc.
              </div>
            </div>

            {/* Right: Output JSON */}
            <div className="col-12 col-lg-6">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-semibold">
                  Output (from <code>output</code> callback)
                </span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => setToastOutputJson("// cleared")}
                >
                  Clear
                </button>
              </div>

              <textarea
                className="form-control font-monospace"
                rows={18}
                value={toastOutputJson}
                onChange={(e) => setToastOutputJson(e.target.value)}
                spellCheck={false}
              />
              <div className="form-text">
                Shape:
                <pre className="mb-0 mt-1 small">
{`{
  "id": "alloyModalToast01",
  "type": "modal-toast",
  "action": "click",
  "error": false,
  "data": {
    "action": "confirmDelete",
    "title": "Delete vendor",
    "message": "Are you sure you want to delete this vendor?"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
