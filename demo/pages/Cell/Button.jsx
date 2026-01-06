// pages/Cell/Button.jsx
import React, { useMemo, useRef, useState } from "react";
import { AlloyButton, ButtonObject } from "../../../src";

const DEFAULT_INPUT_OBJ = {
  id: "alloyBtn01", // optional; stable via useDomId() if omitted
  name: "Primary",
  className: "btn btn-primary",
  active: "active",
  disabled: false,
  ariaLabel: "Primary action",
  tabIndex: 0,
};

const DEFAULT_INPUT = JSON.stringify(DEFAULT_INPUT_OBJ, null, 2);

export default function ButtonPage() {
  const [inputJson, setInputJson] = useState(DEFAULT_INPUT);
  const [parseError, setParseError] = useState("");
  const [outputJson, setOutputJson] = useState(
    "// Click the button to see output here…"
  );

  // Keep last valid parsed object so preview stays stable while typing invalid JSON
  const [parsed, setParsed] = useState(DEFAULT_INPUT_OBJ);

  const btnRef = useRef(null);

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

  // Turn parsed object -> ButtonObject model
  const model = useMemo(() => {
    try {
      return new ButtonObject(parsed);
    } catch {
      // Safe fallback so preview still renders
      return new ButtonObject({
        name: "Invalid config",
        className: "btn btn-secondary",
        disabled: true,
      });
    }
  }, [parsed]);

  // Receives a single OutputObject instance from AlloyButton (ONLY on click)
  function handleOutput(out) {
    const payload = out && typeof out.toJSON === "function" ? out.toJSON() : out;
    setOutputJson(JSON.stringify(payload, null, 2));
  }

  function handleReset() {
    setInputJson(DEFAULT_INPUT);
    setParsed(DEFAULT_INPUT_OBJ);
    setOutputJson("// Click the button to see output here…");
    setParseError("");
  }

  function handleFormat() {
    try {
      const obj = JSON.parse(inputJson);
      setInputJson(JSON.stringify(obj, null, 2));
      setParsed(obj);
      setParseError("");
    } catch {
      // ignore
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyButton</h3>

      {/* Row 1 — Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyButton button={new ButtonObject(buttonObject)} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Live Button Preview */}
      <div className="row mb-4">
        <div className="col-12 text-center">
          <AlloyButton ref={btnRef} button={model} output={handleOutput} />
          <div className="small text-secondary mt-2">
            Tip: <strong>Only click emits</strong> via <code>output</code> as an{" "}
            <code>OutputObject</code> with <code>id</code>, <code>type</code>,{" "}
            <code>action</code>, <code>error</code> and a minimal{" "}
            <code>data</code> payload.
          </div>
        </div>
      </div>

      {/* Row 3 — JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left side: Input editor */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable)</span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleFormat}
                title="Format JSON"
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
                onClick={() => btnRef.current?.click()}
                title="Programmatically click the AlloyButton"
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
            onChange={handleInputChange}
            spellCheck={false}
          />
          {parseError && (
            <div className="invalid-feedback d-block mt-1">{parseError}</div>
          )}

          <div className="form-text">
            Required: <code>name</code>. Optional: <code>id</code>,{" "}
            <code>className</code>, <code>active</code>, <code>disabled</code>,{" "}
            <code>title</code>, <code>ariaLabel</code>, <code>tabIndex</code>,
            and per-event handlers like <code>onClick(e, self)</code>. If you omit{" "}
            <code>id</code>, the component will generate a stable one via{" "}
            <code>useDomId()</code>.
          </div>
        </div>

        {/* Right side: Output inspector */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Output (from <code>output</code> callback)
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => setOutputJson("// cleared")}
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
          />

          <div className="form-text">
            Shape:
            <pre className="mb-0 mt-1 small">
{`{
  "id": "alloyBtn01",
  "type": "button",
  "action": "click",
  "error": false,
  "data": {
    "name": "Primary"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
