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
  icon: { iconClass: "fa-solid fa-spinner fa-spin" }
};

const DEFAULT_INPUT = JSON.stringify(DEFAULT_INPUT_OBJ, null, 2);

export default function ButtonSubmitPage() {
  const [inputJson, setInputJson] = useState(DEFAULT_INPUT);
  const [parseError, setParseError] = useState("");
  const [outputJson, setOutputJson] = useState(
    "// Interact with the submit button to see OutputObject here…"
  );

  const btnRef = useRef(null);

  // Build ButtonSubmitObject from JSON (or safe fallback if invalid)
  const model = useMemo(() => {
    try {
      const raw = JSON.parse(inputJson || "{}");
      setParseError("");
      return new ButtonSubmitObject(raw);
    } catch (e) {
      setParseError(String(e.message || e));
      return new ButtonSubmitObject({
        name: "Invalid",
        className: "btn btn-secondary",
        disabled: true,
        loading: false,
        icon: { iconClass: "fa-solid fa-triangle-exclamation" }
      });
    }
  }, [inputJson]);

  // Called by AlloyButtonSubmit on click / mousedown / keydown
  function handleOutput(out) {
    const payload =
      out && typeof out.toJSON === "function" ? out.toJSON() : out || {};

    setOutputJson(JSON.stringify(payload, null, 2));
  }

  // Reset demo
  function doReset() {
    setInputJson(DEFAULT_INPUT);
    setOutputJson("// Interact with the submit button to see OutputObject here…");
    setParseError("");
  }

  // Programmatically trigger the same path as a user click
  function triggerClick() {
    const api = btnRef.current;
    if (!api) return;

    if (typeof api.click === "function") {
      api.click();
    } else if (api.el && typeof api.el.click === "function") {
      api.el.click();
    }
  }

  // Pretty-print the JSON editor content
  function handleFormat() {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, 2));
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
            Events that arm the button: <code>mousedown</code>,{" "}
            <code>keydown</code> (<code>Enter</code>/<code>Space</code>),{" "}
            <code>click</code>.
            <br />
            On arm, <code>output</code> receives an{" "}
            <code>OutputObject</code>{" "}
            {`{ id, type, action, error, errorMessage, data }`}, where{" "}
            <code>data</code> only includes the provided fields (e.g.{" "}
            <code>name</code>).
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
                <i
                  className="fa-solid fa-wand-magic-sparkles me-2"
                  aria-hidden="true"
                />
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
            className={`form-control font-monospace ${
              parseError ? "is-invalid" : ""
            }`}
            rows={18}
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            spellCheck={false}
            placeholder={DEFAULT_INPUT}
          />
          {parseError && (
            <div className="invalid-feedback d-block mt-1">
              {parseError}
            </div>
          )}

          <div className="form-text">
            <strong>Required:</strong>{" "}
            <code>name</code>, <code>icon</code>. The element is always{" "}
            <code>type="submit"</code>.
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
                setOutputJson(
                  "// Interact with the submit button to see OutputObject here…"
                )
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
            No more synthetic <code>trigger-loading</code> entries.
          </div>
        </div>
      </div>
    </div>
  );
}
