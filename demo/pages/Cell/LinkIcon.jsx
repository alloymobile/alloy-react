import React, { useMemo, useState } from "react";
import { AlloyLinkIcon, LinkIconObject } from "../../../src";

export default function LinkIconPage() {
  // Initial demo config that gets loaded into the editor textarea
  const initial = {
    id: "alloyLinkIcon1",
    href: "#home",
    icon: { iconClass: "fa-solid fa-house" },
    name: "Home",
    className: "px-2 py-1 rounded d-inline-block",
    active: "bg-light",
    title: "Go Home"
  };

  const [jsonText, setJsonText] = useState(JSON.stringify(initial, null, 2));
  const [error, setError] = useState("");

  // Parse the textarea JSON into a plain object `data`
  const data = useMemo(() => {
    try {
      const obj = JSON.parse(jsonText || "{}");
      setError("");
      return obj;
    } catch (e) {
      // invalid JSON while user is typing
      setError(e.message);
      return initial;
    }
  }, [jsonText]);

  // Build a valid LinkIconObject for AlloyLinkIcon.
  // We wrap in try/catch so the live preview doesn't explode
  // if the user deletes required fields (href, icon.iconClass).
  const linkIconObj = useMemo(() => {
    try {
      // normalize href: if user deletes it, fall back to "#"
      const safeHref = data?.href ?? "#";

      // build LinkIconObject; this will:
      // - validate required fields
      // - generate unique id if missing
      // - convert `icon` into an IconObject if it's still just plain JSON
      return new LinkIconObject({
        ...data,
        href: safeHref
      });
    } catch (e) {
      // show validation error (e.g. missing iconClass)
      setError(e.message);

      // fall back to initial so the preview still renders
      return new LinkIconObject(initial);
    }
  }, [data]);

  // Shown in the code sample box at the top
  const codeSample = `<AlloyLinkIcon linkIcon={new LinkIconObject(linkIconObject)} />`;

  // Pretty-print current JSON when Format JSON is clicked
  const formatJson = () => {
    try {
      setJsonText(JSON.stringify(JSON.parse(jsonText), null, 2));
    } catch {
      // ignore if it's invalid JSON at the moment
    }
  };

  return (
    <section id="link-icon" className="p-md-0">
      <h3 className="mb-1 text-center">AlloyLinkIcon</h3>

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
          <span className="fw-semibold d-block mb-2">Link Icon</span>
          <div className="d-flex justify-content-center">
            <AlloyLinkIcon linkIcon={linkIconObj} />
          </div>
        </div>
      </div>

      {/* Row 3 — JSON editor */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="fw-semibold">LinkIcon JSON (editable)</span>
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
            placeholder='{"href":"#home","icon":{"iconClass":"fa-solid fa-house"},"name":"Home"}'
          />

          {error ? (
            <div className="invalid-feedback">{error}</div>
          ) : (
            <div className="form-text">
              Required:
              {" "}
              <code>href</code>,
              {" "}
              <code>icon.iconClass</code>.
              {" "}
              Optional:
              {" "}
              <code>id</code>,
              {" "}
              <code>name</code>,
              {" "}
              <code>className</code>,
              {" "}
              <code>active</code>,
              {" "}
              <code>target</code>,
              {" "}
              <code>rel</code>,
              {" "}
              <code>title</code>,
              {" "}
              <code>onClick</code>.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
