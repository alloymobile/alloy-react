// demo/pages/tissue/LinkPage.jsx

import React, { useMemo, useState } from "react";
import { AlloyLink, LinkObject } from "../../../src"; // make sure ../../../src re-exports both

export default function LinkPage() {
  // Starting example the user can edit in the textarea
  const initial = {
    id: "alloyLink1",
    name: "Open Docs",
    href: "https://vitejs.dev/",
    className: "link px-2 py-1 rounded",
    active: "bg-light",
    target: "_blank",
    title: "Vite documentation"
  };

  // Textarea value as string
  const [jsonText, setJsonText] = useState(JSON.stringify(initial, null, 2));
  const [error, setError] = useState("");

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

  // Convert plain object -> LinkObject (validated, normalized)
  const linkObj = useMemo(() => {
    try {
      return new LinkObject(data);
    } catch (e) {
      // Example: user deleted required 'href' or 'name'
      setError(e.message);
      return new LinkObject(initial);
    }
  }, [data]);

  // Just for showing code usage in the demo UI
  const codeSample = `<AlloyLink link={new LinkObject(linkObject)} />`;

  // Pretty-print the editor JSON
  const formatJson = () => {
    try {
      setJsonText(JSON.stringify(JSON.parse(jsonText), null, 2));
    } catch {
      /* ignore bad json until user fixes it */
    }
  };

  return (
    <section id="link" className="p-md-0">
      <h3 className="mb-1 text-center">AlloyLink</h3>

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
        <div className="col-12 text-center">
          <span className="fw-semibold d-block mb-2">Link</span>
          <div className="d-flex justify-content-center">
            <AlloyLink link={linkObj} />
          </div>
        </div>
      </div>

      {/* Row 3 — Editable JSON */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="fw-semibold">Link JSON (editable)</span>

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
            rows={10}
            spellCheck={false}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder='{"name":"Open Docs","href":"https://vitejs.dev/"}'
          />

          {error ? (
            <div className="invalid-feedback">{error}</div>
          ) : (
            <div className="form-text">
              Required: <code>href</code>, <code>name</code>. Optional:{" "}
              <code>id</code>, <code>className</code>, <code>active</code>,{" "}
              <code>target</code>, <code>rel</code>, <code>title</code>,{" "}
              <code>onClick</code>.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
