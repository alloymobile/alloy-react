import React, { useMemo, useState } from "react";
import { AlloyLinkIcon, LinkIconObject } from "../../../src";

export default function LinkIconPage() {
  const initial = {
    id: "alloyLinkIcon1",
    href: "#home",
    icon: {
      iconClass: "fa-solid fa-house",
      // ✅ NEW: AlloyIcon wrapper className (background/padding/rounding etc.)
      className:
        "d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle p-2",
    },
    name: "Home",
    className: "px-2 py-1 rounded d-inline-block",
    active: "bg-light",
    title: "Go Home",
  };

  const [jsonText, setJsonText] = useState(JSON.stringify(initial, null, 2));
  const [error, setError] = useState("");

  // Keep last valid parsed object so preview still works while typing invalid JSON
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

  const linkIconObj = useMemo(() => {
    try {
      const safeHref = parsed?.href ?? "#";
      // NOTE: LinkIconObject will validate icon + icon.iconClass and normalize icon -> IconObject
      return new LinkIconObject({ ...parsed, href: safeHref });
    } catch {
      return new LinkIconObject(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsed]);

  const codeSample = `<AlloyLinkIcon linkIcon={new LinkIconObject(linkIconObject)} />`;

  const formatJson = () => {
    try {
      const obj = JSON.parse(jsonText);
      setJsonText(JSON.stringify(obj, null, 2));
      setParsed(obj);
      setError("");
    } catch {
      // ignore
    }
  };

  return (
    <section id="link-icon" className="p-md-0">
      <h3 className="mb-1 text-center">AlloyLinkIcon</h3>

      <div className="row mb-2">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{codeSample}</code>
          </pre>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12 text-center">
          <span className="fw-semibold d-block mb-2">Link Icon</span>
          <div className="d-flex justify-content-center">
            <AlloyLinkIcon linkIcon={linkIconObj} />
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="fw-semibold">LinkIcon JSON (editable)</span>
            <button
              type="button"
              onClick={formatJson}
              className="btn btn-sm btn-outline-secondary"
            >
              <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true" />
              Format JSON
            </button>
          </div>

          <textarea
            className={`form-control font-monospace ${error ? "is-invalid" : ""}`}
            rows={12}
            spellCheck={false}
            value={jsonText}
            onChange={handleChange}
            placeholder={`{
  "href":"#home",
  "icon":{
    "iconClass":"fa-solid fa-house",
    "className":"d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle p-2"
  },
  "name":"Home"
}`}
          />

          {error ? (
            <div className="invalid-feedback">{error}</div>
          ) : (
            <div className="form-text">
              Required: <code>href</code>, <code>icon.iconClass</code>. Optional:{" "}
              <code>id</code>, <code>name</code>, <code>className</code>,{" "}
              <code>active</code>, <code>target</code>, <code>rel</code>,{" "}
              <code>title</code>, and for icon wrapper styling: <code>icon.className</code>.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
