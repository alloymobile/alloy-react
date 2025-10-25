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
  icon: { iconClass: "fa-solid fa-spinner fa-spin" }
};

const DEFAULT_INPUT = JSON.stringify(DEFAULT_INPUT_OBJ, null, 2);

export default function ButtonSubmitPage() {
  // Left editor JSON string
  const [inputJson, setInputJson] = useState(DEFAULT_INPUT);

  // UI state for parse/model errors
  const [parseError, setParseError] = useState("");

  // Right panel output (event log)
  const [outputJson, setOutputJson] = useState(
    "" // starts empty; will fill after triggers
  );

  // Ref to call .click() programmatically on the button
  const btnRef = useRef(null);

  // Build a ButtonSubmitObject from the current JSON (or safe fallback if invalid)
  const model = useMemo(() => {
    try {
      const raw = JSON.parse(inputJson || "{}");
      setParseError("");

      // Construct model. ButtonSubmitObject will:
      // - validate required fields (name, icon)
      // - wrap icon into IconObject if needed
      // - generate id if missing
      // - default ariaLabel/title
      // - respect disabled/loading from raw
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

  /**
   * handleOutput is called by AlloyButtonSubmit whenever it "arms":
   *   - on mousedown
   *   - on click
   *   - on keydown Enter/Space
   *
   * At that moment, AlloyButtonSubmit sets its internal loading=true/disabled=true
   * and mutates the model instance it was passed. We reflect that into the parent's
   * JSON (inputJson) so THE PARENT becomes source of truth for loading/disabled.
   *
   * After that, Reset works correctly, because Reset sets loading:false/disabled:false
   * in the JSON, which creates a fresh model with loading:false, and the button
   * will immediately unlock and hide the spinner.
   */
  function handleOutput(self, e) {
    // Sync the model's live state (loading/disabled) into the editable JSON
    // so the JSON text accurately represents "in flight".
    try {
      const current = JSON.parse(inputJson || "{}");
      current.loading = self.loading;
      current.disabled = self.disabled;
      setInputJson(JSON.stringify(current, null, 2));
    } catch {
      // If inputJson was invalid JSON at that moment, ignore.
      // parseError UI already tells the user it's invalid.
    }

    // Also update the Output panel so devs can see what fired
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
        icon: {
          id: self.icon.id,
          iconClass: self.icon.iconClass
        }
      }
    };
    setOutputJson(JSON.stringify(payload, null, 2));
  }

  /**
   * Reset:
   * - Restore the JSON editor to DEFAULT_INPUT (loading:false, disabled:false)
   * - Clear the output panel
   * - Clear parseError
   *
   * Because we actually set a new inputJson string here, React will
   * build a fresh model with loading=false and pass it to AlloyButtonSubmit.
   * AlloyButtonSubmit sees props.loading === false and immediately:
   *   - hides spinner,
   *   - unlocks itself,
   *   - clears its internal "fired" state.
   */
  function doReset() {
    setInputJson(DEFAULT_INPUT);
    setOutputJson("");
    setParseError("");
  }

  /**
   * Programmatically fire the button's click handler.
   * This is how a parent could imperatively submit a form.
   * The button will arm (loading=true, disabled=true) and
   * handleOutput(...) will run.
   */
  function triggerClick() {
    btnRef.current?.click();
  }

  /**
   * Force the "request in-flight" state from the parent side.
   *
   * This simulates:
   *   - you start an async action elsewhere in code
   *   - you mark loading:true / disabled:true in your state
   *   - you pass those props down so the button shows spinner immediately
   *
   * We do that by editing the JSON directly, since in this demo
   * JSON == parent state.
   *
   * We also immediately reflect that state in the Output panel so devs
   * can see what the model looks like.
   */
  function triggerLoading() {
    try {
      const obj = JSON.parse(inputJson || "{}");
      obj.loading = true;
      obj.disabled = true;

      // Update the JSON editor so parent state now represents "in-flight"
      const next = JSON.stringify(obj, null, 2);
      setInputJson(next);

      // Show that state in the output box too
      const tempModel = new ButtonSubmitObject(obj);
      const payload = {
        event: "trigger-loading",
        buttonSubmit: {
          id: tempModel.id,
          name: tempModel.name,
          className: tempModel.className,
          disabled: tempModel.disabled,
          loading: tempModel.loading,
          title: tempModel.title,
          ariaLabel: tempModel.ariaLabel,
          tabIndex: tempModel.tabIndex,
          icon: {
            id: tempModel.icon.id,
            iconClass: tempModel.icon.iconClass
          }
        }
      };
      setOutputJson(JSON.stringify(payload, null, 2));
    } catch {
      // ignore parse fail; parseError already indicates invalid JSON
    }
  }

  /**
   * Pretty-print the JSON editor content
   */
  function handleFormat() {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore: invalid JSON is already surfaced in parseError
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

      {/* Row 2 — Live demo, inside a form so type="submit" is meaningful */}
      <div className="row mb-4">
        <div className="col-12 text-center">
          <form
            onSubmit={(e) => {
              e.preventDefault(); // demo only - no navigation
            }}
          >
            <AlloyButtonSubmit
              ref={btnRef}
              buttonSubmit={model}
              output={handleOutput}
            />
          </form>

          <div className="small text-secondary mt-2">
            Events that arm the button:{" "}
            <code>mousedown</code>,{" "}
            <code>keydown</code> (<code>Enter</code>/<code>Space</code>),{" "}
            <code>click</code>.
            <br />
            On first arm:
            {" "}
            <code>loading:true</code> and{" "}
            <code>disabled:true</code>, spinner shows, <code>output</code> fires.
            <br />
            The parent (in real life) would later set{" "}
            <code>loading:false</code> and <code>disabled:false</code> when the
            server responds.
            <br />
            In this demo, editing those fields in the JSON — or hitting Reset —
            does the same thing.
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
                title="Restore defaults, clear output, unlock the button"
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
                title="Programmatically click (arms internal loading)"
              >
                Trigger Click
              </button>

              <button
                type="button"
                className="btn btn-sm btn-outline-warning"
                onClick={triggerLoading}
                title="Pretend an async request is running (loading=true, disabled=true)"
              >
                Trigger Loading
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
            <br />
            To unlock the button and hide the spinner, make sure the JSON has{" "}
            <code>"loading": false</code> and{" "}
            <code>"disabled": false</code>, or press Reset.
            <br />
            Notice how clicking (or Trigger Click) will automatically update the
            JSON to <code>"loading": true</code> /{" "}
            <code>"disabled": true</code> — exactly like a real async submit.
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
            placeholder="// Output will appear here after Trigger Click / Trigger Loading"
          />
          <div className="form-text">
            The payload shows the live model state at the moment of arm
            (loading, disabled, etc).
          </div>
        </div>
      </div>
    </div>
  );
}
