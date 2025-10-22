// pages/Cell/Button.jsx
import React, { useMemo, useState, useRef } from "react";
import { AlloyButton, ButtonObject } from "../../../src";

const DEFAULT_INPUT = JSON.stringify(
  {
    id: "alloyBtn01",            // optional; auto-generated if omitted
    name: "Primary",
    className: "btn btn-primary",
    active: "active",
    disabled: false,
    ariaLabel: "Primary action",
    tabIndex: 0
  },
  null,
  2
);

export default function ButtonPage() {
  const [inputJson, setInputJson] = useState(DEFAULT_INPUT);
  const [parseError, setParseError] = useState("");
  const [outputJson, setOutputJson] = useState("// Interact with the button to see events here…");
  const btnRef = useRef(null);

  const model = useMemo(() => {
    try {
      setParseError("");
      const raw = JSON.parse(inputJson);
      return new ButtonObject(raw);
    } catch (e) {
      setParseError(String(e.message || e));
      return new ButtonObject({ name: "Invalid JSON", className: "btn btn-secondary", disabled: true });
    }
  }, [inputJson]);

  function handleOutput(self, e) {
    const payload = {
      event: e?.type ?? "unknown",
      button: {
        id: self.id,
        name: self.name,
        className: self.className,
        active: self.active,
        disabled: self.disabled,
        title: self.title,
        ariaLabel: self.ariaLabel,
        tabIndex: self.tabIndex
      }
    };
    setOutputJson(JSON.stringify(payload, null, 2));
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyButton</h3>

      {/* Row 1 — Tag sample */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{`<AlloyButton button={new ButtonObject(buttonObject)} output={handleOutput} />`}</code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Demo button */}
      <div className="row mb-4">
        <div className="col-12 text-center">
          <AlloyButton ref={btnRef} button={model} output={handleOutput} />
          <div className="small text-secondary mt-2">
            Tip: Hover, focus, blur, keydown/keyup, click — all emit via <code>output</code>.
          </div>
        </div>
      </div>

      {/* Row 3 — Two columns: editable input JSON and live output JSON */}
      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable)</span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                setInputJson(DEFAULT_INPUT);
                setOutputJson("// Interact with the button to see events here…");
                }}
              >
                Reset
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
            className={`form-control font-monospace ${parseError ? "is-invalid" : ""}`}
            rows={18}
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            spellCheck={false}
          />
          {parseError && <div className="invalid-feedback d-block mt-1">{parseError}</div>}
          <div className="form-text">
            Only <code>name</code> is required. <code>id</code> is optional; it auto-generates if missing.
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Output (from <code>output</code> callback)</span>
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
          <div className="form-text">Updates on every interaction with the button.</div>
        </div>
      </div>
    </div>
  );
}
