// demo/pages/tissue/LinkPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyLink, LinkObject } from "../../../src";

export default function LinkPage() {
  const initial = {
    id: "alloyLink1",
    name: "Open Docs",
    href: "https://vitejs.dev/",
    className: "link px-2 py-1 rounded",
    active: "bg-light",
    target: "_blank",
    title: "Vite documentation",
  };

  const [jsonText, setJsonText] = useState(JSON.stringify(initial, null, 2));
  const [error, setError] = useState("");

  // Keep the last valid parsed object so the demo still renders while typing invalid JSON
  const [parsed, setParsed] = useState(initial);

  function handleChange(e) {
    const val = e.target.value;
    setJsonText(val);

    try {
      const obj = JSON.parse(val || "{}");
      if (!obj || typeof obj !== "object") {
        throw new Error("JSON must be an object.");
      }
      setParsed(obj);
      setError("");
    } catch (err) {
      setError(err.message || "Invalid JSON.");
      // do NOT change parsed here; keep last valid
    }
  }

  const linkObj = useMemo(() => {
    try {
      return new LinkObject(parsed);
    } catch (err) {
      // Missing required fields: keep demo alive with fallback
      setError(err.message || "Invalid LinkObject config.");
      return new LinkObject(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsed]);

  const codeSample = `<AlloyLink link={new LinkObject(linkObject)} />`;

  const formatJson = () => {
    try {
      const obj = JSON.parse(jsonText);
      setJsonText(JSON.stringify(obj, null, 2));
      setError("");
      setParsed(obj);
    } catch {
      // ignore
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
            onChange={handleChange}
            placeholder='{"name":"Open Docs","href":"https://vitejs.dev/"}'
          />

          {error ? (
            <div className="invalid-feedback">{error}</div>
          ) : (
            <div className="form-text">
              Required: <code>href</code>, <code>name</code>. Optional:{" "}
              <code>id</code>, <code>className</code>, <code>active</code>,{" "}
              <code>target</code>, <code>rel</code>, <code>title</code>.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
