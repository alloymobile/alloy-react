// pages/Cell/ButtonSubmit.jsx
import React, { useMemo, useRef, useState } from "react";
import { AlloyButtonSubmit, ButtonSubmitObject } from "../../../src";

// Default model shown in the editor
const DEFAULT_INPUT_OBJ = {
  id: "btnSubmit01",
  name: "Save",
  className: "btn btn-success",
  disabled: false,
  loading: false,
  ariaLabel: "Submit form",
  tabIndex: 0,
  icon: {
    iconClass: "fa-solid fa-spinner fa-spin",
    // NEW: AlloyIcon now supports wrapper styling via icon.className (span wrapper)
    className: "d-inline-flex align-items-center justify-content-center",
  },
};

const DEFAULT_INPUT = JSON.stringify(DEFAULT_INPUT_OBJ, null, 2);

export default function ButtonSubmitPage() {
  const [inputJson, setInputJson] = useState(DEFAULT_INPUT);
  const [parseError, setParseError] = useState("");
  const [outputJson, setOutputJson] = useState(
    "// Interact with the submit button to see OutputObject here…"
  );

  const btnRef = useRef(null);

  // Keep last valid parsed object so preview stays stable while typing invalid JSON
  const [parsed, setParsed] = useState(DEFAULT_INPUT_OBJ);

  function handleInputChange(e) {
    const val = e.target.value;
    setInputJson(val);

    try {
      const obj = JSON.parse(val || "{}");
      if (!obj || typeof obj !== "object") throw new Error("JSON must be an object.");
      setParsed(obj);
      setParseError("");
    } catch (err) {
      setParseError(err.message || "Invalid JSON.");
      // keep last valid parsed
    }
  }

  // Build ButtonSubmitObject from parsed (PURE memo)
  const model = useMemo(() => {
    try {
      const safe = parsed && typeof parsed === "object" ? parsed : {};
      return new ButtonSubmitObject(safe);
    } catch {
      // Safe fallback so preview never crashes (no setState here)
      return new ButtonSubmitObject({
        name: "Invalid",
        className: "btn btn-secondary",
        disabled: true,
        loading: false,
        icon: {
          iconClass: "fa-solid fa-triangle-exclamation",
          className: "d-inline-flex align-items-center justify-content-center",
        },
      });
    }
  }, [parsed]);

  // Called by AlloyButtonSubmit on click / mousedown / keydown
  function handleOutput(out) {
    const payload =
      out && typeof out.toJSON === "function" ? out.toJSON() : out || {};
    setOutputJson(JSON.stringify(payload, null, 2));
  }

  function doReset() {
    setInputJson(DEFAULT_INPUT);
    setParsed(DEFAULT_INPUT_OBJ);
    setOutputJson("// Interact with the submit button to see OutputObject here…");
    setParseError("");
  }

  function triggerClick() {
    const api = btnRef.current;
    if (!api) return;
    if (typeof api.click === "function") api.click();
    else if (api.el && typeof api.el.click === "function") api.el.click();
  }

  function handleFormat() {
    try {
      const obj = JSON.parse(inputJson);
      setInputJson(JSON.stringify(obj, null, 2));
      setParsed(obj);
      setParseError("");
    } catch {
      // ignore - parseError already visible
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyButtonSubmit</h3>

      {/* Row 1 — Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyButtonSubmit buttonSubmit={new ButtonSubmitObject(buttonSubmitObject)} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Live demo */}
      <div className="row mb-4">
        <div className="col-12 text-center">
          <form
            onSubmit={(e) => {
              e.preventDefault(); // demo only
            }}
          >
            <AlloyButtonSubmit
              ref={btnRef}
              buttonSubmit={model}
              output={handleOutput}
            />
          </form>

          <div className="small text-secondary mt-2">
            Arms on: <code>mousedown</code>, <code>keydown</code> (<code>Enter</code>/<code>Space</code>),{" "}
            <code>click</code>. While armed/loading, the spinner icon is shown and the button is disabled
            until parent sets <code>loading:false</code> again.
          </div>
        </div>
      </div>

      {/* Row 3 — JSON editor (left) / Output log (right) */}
      <div className="row g-3 align-items-stretch">
        {/* LEFT PANEL */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable)</span>

            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={doReset}
                title="Restore defaults, clear output"
              >
                Reset
              </button>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleFormat}
                title="Prettify JSON"
              >
                <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true" />
                Format
              </button>

              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={triggerClick}
                title="Programmatically click"
              >
                Trigger Click
              </button>
            </div>
          </div>

          <textarea
            className={`form-control font-monospace ${parseError ? "is-invalid" : ""}`}
            rows={18}
            value={inputJson}
            onChange={handleInputChange}
            spellCheck={false}
            placeholder={DEFAULT_INPUT}
          />
          {parseError && (
            <div className="invalid-feedback d-block mt-1">{parseError}</div>
          )}

          <div className="form-text">
            <strong>Required:</strong> <code>name</code>, <code>icon.iconClass</code>.{" "}
            <strong>Optional:</strong> <code>id</code>, <code>className</code>, <code>disabled</code>,{" "}
            <code>loading</code>, <code>title</code>, <code>ariaLabel</code>, <code>tabIndex</code>.
            <br />
            <strong>Icon wrapper styling:</strong> use <code>icon.className</code> (applies to the icon’s
            wrapping <code>&lt;span&gt;</code> inside <code>AlloyIcon</code>).
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Output (from <code>output</code> callback)
            </span>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() =>
                setOutputJson("// Interact with the submit button to see OutputObject here…")
              }
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={18}
            value={outputJson}
            onChange={(e) => setOutputJson(e.target.value)}
            spellCheck={false}
            placeholder='// { "id": "btnSubmit01", "type": "button-submit", "action": "click", "error": false, "data": { "name": "Save" } }'
          />

          <div className="form-text">
            Only real events from <code>AlloyButtonSubmit</code> appear here.
          </div>
        </div>
      </div>
    </div>
  );
}
