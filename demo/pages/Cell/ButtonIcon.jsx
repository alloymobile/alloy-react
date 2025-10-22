// pages/Cell/ButtonIcon.jsx
import React, { useMemo, useRef, useState } from "react";
import { AlloyButtonIcon,  ButtonIconObject, IconObject } from "../../../src";

const DEFAULT_INPUT = JSON.stringify(
  {
    id: "alloyBtnIcon01",
    name: "Sync",                        // remove this to see icon-only
    className: "btn btn-primary",
    active: "active",
    disabled: false,
    ariaLabel: "Sync now",
    tabIndex: 0,
    icon: { iconClass: "fa-solid fa-rotate" } // wrapped into IconObject
  },
  null,
  2
);

export default function ButtonIconPage() {
  const [inputJson, setInputJson] = useState(DEFAULT_INPUT);
  const [parseError, setParseError] = useState("");
  const [outputJson, setOutputJson] = useState("// Interact to see events here…");
  const btnRef = useRef(null);

  const model = useMemo(() => {
    try {
      setParseError("");
      const raw = JSON.parse(inputJson);
      if (raw.icon && !(raw.icon instanceof IconObject)) {
        raw.icon = new IconObject(raw.icon);
      }
      return new ButtonIconObject(raw);
    } catch (e) {
      setParseError(String(e.message || e));
      return new ButtonIconObject({
        name: "Invalid JSON",
        className: "btn btn-secondary",
        disabled: true,
        icon: new IconObject({ iconClass: "fa-solid fa-triangle-exclamation" }),
      });
    }
  }, [inputJson]);

  function handleOutput(self, e) {
    const payload = {
      event: e?.type ?? "unknown",
      buttonIcon: {
        id: self.id,
        name: self.name ?? null,
        className: self.className,
        active: self.active,
        disabled: self.disabled,
        title: self.title,
        ariaLabel: self.ariaLabel,
        tabIndex: self.tabIndex,
        icon: { ...self.icon },
      },
    };
    setOutputJson(JSON.stringify(payload, null, 2));
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyButtonIcon</h3>

      {/* Row 1 — Tag sample */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{`<AlloyButtonIcon buttonIcon={new ButtonIconObject(buttonIconObject)} output={handleOutput} />`}</code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Demo */}
      <div className="row mb-4">
        <div className="col-12 text-center">
          <AlloyButtonIcon ref={btnRef} buttonIcon={model} output={handleOutput} />
          <div className="small text-secondary mt-2">
            If <code>name</code> is missing ⇒ icon-only. All events emit via <code>output</code>.
          </div>
        </div>
      </div>

      {/* Row 3 — Editable input / live output */}
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
            <code>icon</code> is required; <code>name</code> is optional. Element is always <code>type="button"</code>.
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
          <div className="form-text">Updates on every interaction.</div>
        </div>
      </div>
    </div>
  );
}
