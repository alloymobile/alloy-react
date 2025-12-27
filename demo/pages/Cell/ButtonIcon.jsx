// pages/Cell/ButtonIcon.jsx
import React, { useMemo, useRef, useState } from "react";
import { AlloyButtonIcon, ButtonIconObject } from "../../../src";

const DEFAULT_INPUT_OBJ = {
  id: "alloyBtnIcon01", // optional; stable via useDomId() if omitted
  name: "Sync", // remove this to see icon-only (event will use `title`)
  title: "Sync", // used as fallback event name when `name` is missing (also tooltip)
  className: "btn btn-primary",
  active: "active",
  disabled: false,
  ariaLabel: "Sync now",
  tabIndex: 0,

  // ButtonIcon -> AlloyIcon (icon wrapper styling supported)
  icon: {
    iconClass: "fa-solid fa-rotate",
    className:
      "d-inline-flex align-items-center justify-content-center bg-light rounded-circle p-2",
  },
};

const DEFAULT_INPUT = JSON.stringify(DEFAULT_INPUT_OBJ, null, 2);

export default function ButtonIconPage() {
  const [inputJson, setInputJson] = useState(DEFAULT_INPUT);
  const [parseError, setParseError] = useState("");
  const [outputJson, setOutputJson] = useState(
    "// Click the button to see output here…"
  );

  const btnRef = useRef(null);

  // Keep last valid parsed object so preview stays stable while typing invalid JSON
  const [parsed, setParsed] = useState(DEFAULT_INPUT_OBJ);

  function handleInputChange(e) {
    const val = e.target.value;
    setInputJson(val);

    try {
      const obj = JSON.parse(val || "{}");
      if (!obj || typeof obj !== "object")
        throw new Error("JSON must be an object.");
      setParsed(obj);
      setParseError("");
    } catch (err) {
      setParseError(err.message || "Invalid JSON.");
      // keep last valid parsed
    }
  }

  // Parse user JSON -> build a safe ButtonIconObject model.
  const model = useMemo(() => {
    try {
      const safe = parsed && typeof parsed === "object" ? parsed : {};
      return new ButtonIconObject(safe);
    } catch {
      // Fallback model so preview never crashes
      return new ButtonIconObject({
        name: "Invalid config",
        className: "btn btn-secondary",
        disabled: true,
        icon: {
          iconClass: "fa-solid fa-triangle-exclamation",
          className:
            "d-inline-flex align-items-center justify-content-center bg-light rounded-circle p-2",
        },
      });
    }
  }, [parsed]);

  // Global output hook for AlloyButtonIcon (ONLY on click)
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
      <h3 className="mb-3 text-center">AlloyButtonIcon</h3>

      {/* Row 1 — Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyButtonIcon buttonIcon={new ButtonIconObject(buttonIconObject)} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Live ButtonIcon Preview */}
      <div className="row mb-4">
        <div className="col-12 text-center">
          <AlloyButtonIcon ref={btnRef} buttonIcon={model} output={handleOutput} />
          <div className="small text-secondary mt-2">
            If <code>name</code> is missing ⇒ icon-only button (no visible label).{" "}
            On click, output sends <code>data.name</code> as{" "}
            <code>name</code> if present, otherwise <code>title</code>.{" "}
            <strong>Only click emits</strong> an <code>OutputObject</code>:{" "}
            <code>{`{ id, type: "button-icon", action: "click", error, data: { name } }`}</code>.
          </div>
        </div>
      </div>

      {/* Row 3 — JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input editor */}
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
                title="Programmatically click the AlloyButtonIcon"
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
            Required: <code>icon.iconClass</code>. Optional: <code>name</code>,{" "}
            <code>id</code>, <code>className</code>, <code>active</code>,{" "}
            <code>disabled</code>, <code>title</code>, <code>ariaLabel</code>,{" "}
            <code>tabIndex</code>.
            <br />
            For icon-only buttons, set <code>title</code> so the click event has a
            reliable identifier (used when <code>name</code> is missing).
            <br />
            If you omit <code>id</code>, the component generates a stable one via{" "}
            <code>useDomId()</code> (SSR-safe).
            <br />
            Icon wrapper styling: <code>icon.className</code> (applied to the
            wrapper <code>{"<span>"}</code> inside <code>AlloyIcon</code>).
          </div>
        </div>

        {/* Right: Output inspector */}
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
            Output is an <code>OutputObject</code> (only on click):
            <br />
            <code>{`{ id, type, action, error, data: { name } }`}</code>
            <br />
            Where <code>data.name</code> = <code>name</code> (if provided) else{" "}
            <code>title</code>.
          </div>
        </div>
      </div>
    </div>
  );
}
