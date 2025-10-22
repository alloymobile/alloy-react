
import React, { useMemo, useRef, useState } from "react";
import { AlloyButtonSubmit, ButtonSubmitObject, IconObject } from "../../../src";

const DEFAULT_INPUT_OBJ = {
  id: "btnSubmit01",
  name: "Save",
  className: "btn btn-success",
  disabled: false,
  loading: false,
  ariaLabel: "Submit form",
  tabIndex: 0,
  icon: { iconClass: "fa-solid fa-spinner fa-spin" },
};
const DEFAULT_INPUT = JSON.stringify(DEFAULT_INPUT_OBJ, null, 2);

export default function ButtonSubmitPage() {
  const [inputJson, setInputJson] = useState(DEFAULT_INPUT);
  const [parseError, setParseError] = useState("");
  const [outputJson, setOutputJson] = useState(""); // Output only appears on triggers
  const [resetSignal, setResetSignal] = useState(0); // tell child to clear internals
  const btnRef = useRef(null);

  const model = useMemo(() => {
    try {
      setParseError("");
      const raw = JSON.parse(inputJson);
      if (raw.icon && !(raw.icon instanceof IconObject)) {
        raw.icon = new IconObject(raw.icon);
      }
      return new ButtonSubmitObject(raw);
    } catch (e) {
      setParseError(String(e.message || e));
      return new ButtonSubmitObject({
        name: "Invalid",
        className: "btn btn-secondary",
        disabled: true,
        icon: new IconObject({ iconClass: "fa-solid fa-triangle-exclamation" }),
      });
    }
  }, [inputJson]);

  // Output only on triggers
  function handleOutput(self, e) {
    const payload = {
      event: e?.type ?? "unknown",
      buttonSubmit: {
        id: self.id,
        name: self.name,
        className: self.className,
        disabled: self.disabled,
        loading: self.loading,
        title: self.title,
        ariaLabel: self.ariaLabel,
        tabIndex: self.tabIndex,
        icon: { ...self.icon },
      },
    };
    setOutputJson(JSON.stringify(payload, null, 2));
  }

  // ——— Header actions ———
  const doReset = () => {
    setInputJson(DEFAULT_INPUT); // resets loading=false, disabled=false in model
    setOutputJson("");           // clear output (no output on reset)
    setResetSignal((s) => s + 1); // instruct child to clear internal state
  };

  const triggerClick = () => {
    btnRef.current?.click(); // will arm (internal loading) and output
  };

  const triggerLoading = () => {
    try {
      const obj = JSON.parse(inputJson);
      obj.loading = true;       // external prop → child mirrors to internal loading (icon visible)
      obj.disabled = true;      // optional mirror (component also disables while loading)
      const next = JSON.stringify(obj, null, 2);
      setInputJson(next);

      // Reflect in Output immediately for this action
      const temp = new ButtonSubmitObject({
        ...obj,
        icon: obj.icon instanceof IconObject ? obj.icon : new IconObject(obj.icon),
      });
      const payload = {
        event: "trigger-loading",
        buttonSubmit: {
          id: temp.id,
          name: temp.name,
          className: temp.className,
          disabled: temp.disabled,
          loading: temp.loading,
          title: temp.title,
          ariaLabel: temp.ariaLabel,
          tabIndex: temp.tabIndex,
          icon: { ...temp.icon },
        },
      };
      setOutputJson(JSON.stringify(payload, null, 2));
    } catch {
      // ignore parse error; textarea already shows it
    }
  };

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyButtonSubmit</h3>

      {/* Tag sample */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{`<AlloyButtonSubmit buttonSubmit={new ButtonSubmitObject(buttonSubmitObject)} output={handleOutput} resetSignal={resetSignal} />`}</code>
          </pre>
        </div>
      </div>

      {/* Demo inside a form (prevent navigation in demo) */}
      <div className="row mb-4">
        <div className="col-12 text-center">
          <form onSubmit={(e) => { e.preventDefault(); /* demo only */ }}>
            <AlloyButtonSubmit
              ref={btnRef}
              buttonSubmit={model}
              output={handleOutput}
              resetSignal={resetSignal}
            />
          </form>
          <div className="small text-secondary mt-2">
            Triggers: <code>mousedown</code>, <code>keydown</code> (Enter/Space), <code>click</code>.  
            First trigger → <code>loading=true</code> (icon visible, disabled).  
            When <code>loading</code> returns to <code>false</code>, icon hides and the button re-enables.
          </div>
        </div>
      </div>

      {/* Editable input / live output */}
      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable)</span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={doReset}
                title="Restore defaults, clear output, and reset the button's internal state"
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={triggerClick}
                title="Programmatically click (arms internal loading)"
              >
                Trigger Click
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-warning"
                onClick={triggerLoading}
                title="Force loading=true & disabled=true in the input model"
              >
                Trigger Loading
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
            <strong>Required:</strong> <code>name</code>, <code>icon</code>. Element is always <code>type="submit"</code>.  
            Output only updates on <strong>Trigger Click</strong> or <strong>Trigger Loading</strong> (not on Reset).
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Output (from <code>output</code> callback)</span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => setOutputJson("")}
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
            placeholder="// Output will appear here after Trigger Click or Trigger Loading"
          />
          <div className="form-text">
            <em>Reset</em> clears this box and restores the rendered button to default (enabled, icon hidden).
          </div>
        </div>
      </div>
    </div>
  );
}