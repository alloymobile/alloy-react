// pages/Cell/ButtonIcon.jsx
import React, { useMemo, useRef, useState } from "react";
import { AlloyButtonIcon, ButtonIconObject } from "../../../src";

const DEFAULT_INPUT = JSON.stringify(
  {
    id: "alloyBtnIcon01",
    name: "Sync", // remove this to see icon-only
    className: "btn btn-primary",
    active: "active",
    disabled: false,
    ariaLabel: "Sync now",
    tabIndex: 0,
    icon: { iconClass: "fa-solid fa-rotate" } // will be wrapped into IconObject automatically
  },
  null,
  2
);

export default function ButtonIconPage() {
  const [inputJson, setInputJson] = useState(DEFAULT_INPUT);
  const [parseError, setParseError] = useState("");
  const [outputJson, setOutputJson] = useState(
    "// Interact with the button to see events here…"
  );
  const btnRef = useRef(null);

  // Parse user JSON -> build a safe ButtonIconObject model.
  const model = useMemo(() => {
    try {
      const raw = JSON.parse(inputJson || "{}");
      setParseError("");

      // ButtonIconObject constructor will:
      // - validate that `icon` exists
      // - wrap raw.icon in IconObject if needed
      // - generate id if missing
      // - default ariaLabel/title if missing
      return new ButtonIconObject(raw);
    } catch (e) {
      setParseError(String(e.message || e));

      // Fallback model so preview never crashes
      return new ButtonIconObject({
        name: "Invalid JSON",
        className: "btn btn-secondary",
        disabled: true,
        icon: { iconClass: "fa-solid fa-triangle-exclamation" }
      });
    }
  }, [inputJson]);

  // Global output hook for AlloyButtonIcon
  // Receives a single OutputObject instance
  function handleOutput(out) {
    const payload =
      out && typeof out.toJSON === "function" ? out.toJSON() : out;

    setOutputJson(JSON.stringify(payload, null, 2));
  }

  function handleReset() {
    setInputJson(DEFAULT_INPUT);
    setOutputJson("// Interact with the button to see events here…");
    setParseError("");
  }

  function handleFormat() {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore if user JSON is currently invalid;
      // parseError UI already handles telling them
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
          <AlloyButtonIcon
            ref={btnRef}
            buttonIcon={model}
            output={handleOutput}
          />
          <div className="small text-secondary mt-2">
            If <code>name</code> is missing ⇒ icon-only button. All events emit
            an <code>OutputObject</code> with{" "}
            <code>{`{ id, type: "button-icon", action, error, data: { name } }`}</code>.
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
            onChange={(e) => setInputJson(e.target.value)}
            spellCheck={false}
          />
          {parseError && (
            <div className="invalid-feedback d-block mt-1">{parseError}</div>
          )}
          <div className="form-text">
            <code>icon</code> is required. <code>name</code> is optional.
            <br />
            <code>id</code> is optional — it will auto-generate if missing.
            <br />
            <code>title</code> and <code>ariaLabel</code> default to{" "}
            <code>name</code> (or <code>"icon button"</code> if no name).
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
            Output is an <code>OutputObject</code>:
            <br />
            <code>{`{ id, type, action, error, data: { name } }`}</code>.
          </div>
        </div>
      </div>
    </div>
  );
}
