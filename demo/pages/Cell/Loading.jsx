// demo/pages/tissue/LoadingPage.jsx

import React, { useMemo, useEffect, useState } from "react";
import { AlloyLoading, LoadingObject } from "../../../src"; // ensure re-export

export default function LoadingPage() {
  // Starting example the user can edit in the textarea
  const initial = {
    // Optional: You can set a predictable id for testing.
    // If omitted, AlloyLoading will generate an SSR-safe id internally.
    id: "alloyLoading1",

    message: "Loading data...",

    icon: {
      iconClass: "fa-solid fa-spinner fa-3x fa-spin",
      // IconObject now supports className ("" = ignore)
      className: ""
    },

    // Bootstrap defaults – user can change via JSON
    overlayClass:
      "d-flex align-items-center justify-content-center bg-dark bg-opacity-25 w-100 h-100 rounded",
    contentClass: "text-center p-4 rounded bg-white shadow",
    messageClass: "mt-3 text-muted",
    ariaLabel: "Loading demo overlay",

    // ✅ Playground should control this:
    visible: true
  };

  // Textarea value as string
  const [jsonText, setJsonText] = useState(JSON.stringify(initial, null, 2));

  // Parse/validation error shown under textarea
  const [error, setError] = useState("");

  /**
   * Parse JSON safely (keep useMemo PURE; do not setState inside render).
   * The textbox is the playground — JSON is the source of truth.
   */
  const { data, parseErr } = useMemo(() => {
    try {
      const obj = JSON.parse(jsonText || "{}");
      return { data: obj, parseErr: "" };
    } catch (e) {
      return { data: initial, parseErr: String(e?.message || e) };
    }
  }, [jsonText]);

  useEffect(() => {
    setError(parseErr);
  }, [parseErr]);

  /**
   * Convert plain object -> LoadingObject.
   * IMPORTANT: We do NOT override `visible` here.
   * Whatever is in the JSON is what the component uses.
   */
  const loadingObj = useMemo(() => {
    try {
      return new LoadingObject(data);
    } catch (e) {
      setError(String(e?.message || e));
      return new LoadingObject(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Code usage sample
  const codeSample = `<AlloyLoading loading={new LoadingObject(loadingObject)} />`;

  // Pretty-print the editor JSON
  const formatJson = () => {
    try {
      setJsonText(JSON.stringify(JSON.parse(jsonText), null, 2));
    } catch {
      /* ignore bad json until user fixes it */
    }
  };

  /**
   * Toggle visible by editing the JSON (keeps playground single-source-of-truth).
   */
  const toggleVisibleInJson = () => {
    try {
      const obj = JSON.parse(jsonText || "{}");
      const current = typeof obj.visible === "boolean" ? obj.visible : true;
      obj.visible = !current;
      setJsonText(JSON.stringify(obj, null, 2));
    } catch {
      // ignore; user can fix JSON
    }
  };

  const isVisible = typeof data?.visible === "boolean" ? data.visible : true;

  return (
    <section id="loading" className="p-md-0">
      <h3 className="mb-1 text-center">AlloyLoading</h3>

      {/* Row 1 — Code example */}
      <div className="row mb-2">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{codeSample}</code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Rendered output */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="fw-semibold">Loading overlay</span>

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={toggleVisibleInJson}
              disabled={!!error}
              title={error ? "Fix JSON first" : "Toggles data.visible in the JSON"}
            >
              {isVisible ? "Set visible=false" : "Set visible=true"}
            </button>
          </div>

          <div
            className="position-relative border rounded"
            style={{ minHeight: "180px" }}
          >
            {/* Overlay area (inside a local container) */}
            <div className="position-absolute top-0 start-0 w-100 h-100">
              <AlloyLoading loading={loadingObj} />
            </div>

            {/* Underlying content for demo */}
            <div className="p-3 text-muted small">
              This is your underlying content. The <code>AlloyLoading</code>{" "}
              overlay appears on top of this area when{" "}
              <code>visible === true</code> in the JSON.
            </div>
          </div>
        </div>
      </div>

      {/* Row 3 — Editable JSON */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="fw-semibold">Loading JSON (editable)</span>

            <button
              type="button"
              onClick={formatJson}
              className="btn btn-sm btn-outline-secondary"
            >
              <i
                className="fa-solid fa-wand-magic-sparkles me-2"
                aria-hidden="true"
              />
              Format JSON
            </button>
          </div>

          <textarea
            className={`form-control font-monospace ${error ? "is-invalid" : ""}`}
            rows={12}
            spellCheck={false}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder='{"message":"Loading...","icon":{"iconClass":"fa-solid fa-spinner fa-3x fa-spin","className":""},"visible":true}'
          />

          {error ? (
            <div className="invalid-feedback d-block">{error}</div>
          ) : (
            <div className="form-text">
              The textbox is the playground — this JSON is the source of truth.
              <ul className="mb-0">
                <li>
                  <code>visible</code> – set <code>false</code> to hide the overlay.
                </li>
                <li>
                  <code>message</code> – text under the icon (default:{" "}
                  <code>"Loading..."</code>).
                </li>
                <li>
                  <code>icon.iconClass</code> – Font Awesome classes.
                </li>
                <li>
                  <code>icon.className</code> – extra icon classes (use{" "}
                  <code>""</code> to ignore).
                </li>
                <li>
                  <code>overlayClass</code>, <code>contentClass</code>,{" "}
                  <code>messageClass</code> – Bootstrap class overrides.
                </li>
                <li>
                  <code>id</code> – optional predictable DOM id. If omitted,
                  AlloyLoading generates an SSR-safe id internally.
                </li>
                <li>
                  <code>ariaLabel</code> – accessible label for screen readers.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
