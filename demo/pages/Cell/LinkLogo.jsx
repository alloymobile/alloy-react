import React, { useMemo, useState } from "react";
import { AlloyLinkLogo, LinkLogoObject } from "../../../src";

export default function LinkLogoPage() {
  const initial = {
    id: "alloyLinkLogo1",
    name: "Alloy UI",
    href: "/",
    logo: "https://sellcallput.com/assets/images/sellcallput.svg",
    width: 32,
    height: 32,
    className: "px-2 py-1 rounded d-inline-block",
    active: "bg-light",
    title: "Homepage",
  };

  const [jsonText, setJsonText] = useState(JSON.stringify(initial, null, 2));
  const [error, setError] = useState("");

  // Keep last valid parsed object so live preview stays stable while typing
  const [parsed, setParsed] = useState(initial);

  function handleChange(e) {
    const val = e.target.value;
    setJsonText(val);

    try {
      const obj = JSON.parse(val || "{}");
      if (!obj || typeof obj !== "object") throw new Error("JSON must be an object.");
      setParsed(obj);
      setError("");
    } catch (err) {
      setError(err.message || "Invalid JSON.");
      // keep last valid parsed
    }
  }

  // Build LinkLogoObject from parsed
  const brand = useMemo(() => {
    try {
      const safeHref = parsed?.href ?? "/";

      // NOTE: logo is required; if user deletes it, LinkLogoObject throws
      return new LinkLogoObject({
        ...parsed,
        href: safeHref,
      });
    } catch {
      // fallback so preview doesn't crash
      return new LinkLogoObject(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsed]);

  const codeSample = `<AlloyLinkLogo linkLogo={new LinkLogoObject(linkLogoObject)} />`;

  const formatJson = () => {
    try {
      const obj = JSON.parse(jsonText);
      setJsonText(JSON.stringify(obj, null, 2));
      setParsed(obj);
      setError("");
    } catch {
      // ignore if invalid
    }
  };

  return (
    <section id="link-logo" className="p-md-0">
      <h3 className="mb-1 text-center">AlloyLinkLogo</h3>

      {/* Row 1 — Code sample */}
      <div className="row mb-2">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{codeSample}</code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Live Output */}
      <div className="row mb-3">
        <div className="col-12 text-center">
          <span className="fw-semibold d-block mb-2">Logo Link</span>
          <div className="d-flex justify-content-center">
            <AlloyLinkLogo linkLogo={brand} />
          </div>
        </div>
      </div>

      {/* Row 3 — JSON editor */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="fw-semibold">Logo JSON (editable)</span>
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
            placeholder='{"name":"Alloy UI","href":"/","logo":"https://sellcallput.com/assets/images/sellcallput.svg"}'
          />

          {error ? (
            <div className="invalid-feedback">{error}</div>
          ) : (
            <div className="form-text">
              Required: <code>href</code>, <code>logo</code>. Optional:{" "}
              <code>id</code>, <code>name</code>, <code>width</code>,{" "}
              <code>height</code>, <code>className</code>, <code>active</code>,{" "}
              <code>target</code>, <code>rel</code>, <code>title</code>,{" "}
              <code>onClick</code>.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
