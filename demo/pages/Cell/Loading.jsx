// demo/pages/tissue/LoadingPage.jsx

import React, { useMemo, useState } from "react";
import { AlloyLoading, LoadingObject } from "../../../src"; // ensure re-export

export default function LoadingPage() {
  // Starting example the user can edit in the textarea
  const initial = {
    id: "alloyLoading1",
    message: "Loading data...",
    icon: {
      iconClass: "fa-solid fa-spinner fa-3x fa-spin"
    },
    // Bootstrap defaults – user can change via JSON
    overlayClass:
      "d-flex align-items-center justify-content-center bg-dark bg-opacity-25 w-100 h-100 rounded",
    contentClass: "text-center p-4 rounded bg-white shadow",
    messageClass: "mt-3 text-muted",
    ariaLabel: "Loading demo overlay",
    visible: true
  };

  // Textarea value as string
  const [jsonText, setJsonText] = useState(JSON.stringify(initial, null, 2));
  const [error, setError] = useState("");

  // Simple toggle so user can hide/show overlay in the demo
  const [show, setShow] = useState(true);

  // Parse the textarea into a plain object `data`
  const data = useMemo(() => {
    try {
      const obj = JSON.parse(jsonText || "{}");
      setError("");
      return obj;
    } catch (e) {
      setError(e.message);
      return initial;
    }
  }, [jsonText]);

  // Convert plain object -> LoadingObject (injecting `visible` from demo toggle)
  const loadingObj = useMemo(() => {
    try {
      return new LoadingObject({
        ...data,
        visible: show
      });
    } catch (e) {
      setError(e.message);
      return new LoadingObject({
        ...initial,
        visible: show
      });
    }
  }, [data, show]);

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
              onClick={() => setShow((v) => !v)}
            >
              {show ? "Hide" : "Show"} overlay
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
              <code>loading.visible === true</code>.
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
            placeholder='{"message":"Loading...","icon":{"iconClass":"fa-solid fa-spinner fa-3x fa-spin"},"visible":true}'
          />

          {error ? (
            <div className="invalid-feedback">{error}</div>
          ) : (
            <div className="form-text">
              All fields are optional. Common keys:
              <ul className="mb-0">
                <li>
                  <code>message</code> – text under the icon (default:{" "}
                  <code>"Loading..."</code>).
                </li>
                <li>
                  <code>icon.iconClass</code> – Font Awesome classes, e.g.{" "}
                  <code>"fa-solid fa-spinner fa-3x fa-spin"</code>.
                </li>
                <li>
                  <code>overlayClass</code>, <code>contentClass</code>,{" "}
                  <code>messageClass</code> – override Bootstrap classes used
                  for layout and styling.
                </li>
                <li>
                  <code>visible</code> – controls whether the overlay is
                  rendered.
                </li>
                <li>
                  <code>ariaLabel</code> – accessible label for screen
                  readers.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
