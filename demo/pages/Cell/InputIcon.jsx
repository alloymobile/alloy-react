// pages/Cell/InputIconPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyInput, InputObject } from "../../../src";

/**
 * DEFAULTS
 *
 * All of these use layout: "icon".
 * layout: "icon" REQUIRES `icon`.
 *
 * We include `className` in every preset. That class is passed down
 * to the rendered <input /> / <textarea /> / etc. in AlloyInput.
 *
 * You can override className in the JSON textarea to do custom themes
 * (e.g. "form-control form-control-lg bg-dark text-white").
 */
const DEFAULTS = {
  username: {
    name: "username",
    label: "Username",
    type: "text",
    layout: "icon",
    placeholder: "Enter username",
    required: true,
    icon: { iconClass: "fa-solid fa-user" },
    className: "form-control",
    // styles the <span> wrapping the icon (in addition to "input-group-text")
    iconGroupClass: "bg-light border-0"
  },

  email: {
    name: "email",
    label: "Email",
    type: "email",
    layout: "icon",
    placeholder: "Enter email",
    required: true,
    icon: { iconClass: "fa-solid fa-envelope" },
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    className: "form-control"
  },

  password: {
    name: "password",
    label: "Password",
    type: "password",
    layout: "icon",
    required: true,
    icon: { iconClass: "fa-solid fa-lock" },
    passwordStrength: true,
    placeholder: "Enter password",
    className: "form-control"
  },

  age: {
    name: "age",
    label: "Age",
    type: "number",
    layout: "icon",
    placeholder: "Enter your age",
    required: true,
    min: 0,
    icon: { iconClass: "fa-solid fa-hashtag" },
    className: "form-control"
  },

  dob: {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    layout: "icon",
    required: true,
    icon: { iconClass: "fa-solid fa-calendar" },
    className: "form-control"
  },

  // ✅ NEW: Canvas demo in icon layout
  // Emits: data.value = "data:image/png;base64,...."
  canvas: {
    name: "signature",
    label: "Signature (Canvas)",
    type: "canvas",
    layout: "icon",
    required: true,
    icon: { iconClass: "fa-solid fa-pen-nib" },
    iconGroupClass: "bg-light border-0",
    width: 600,
    height: 220,
    canvasStrokeWidth: 2
  }
};

const TABS = Object.keys(DEFAULTS);

export default function InputIconPage() {
  // which icon-style input we're looking at
  const [tab, setTab] = useState("username");

  // editable JSON for the currently selected preset
  const [inputJson, setInputJson] = useState(
    JSON.stringify(DEFAULTS["username"], null, 2)
  );

  // live output from AlloyInput's `output` callback
  const [outputJson, setOutputJson] = useState(
    "// Interact with the field (type, blur, etc.)"
  );

  // parse error state for the JSON editor
  const [parseError, setParseError] = useState("");

  /**
   * Build InputObject for preview.
   * If user JSON is broken, fall back to DEFAULTS[tab] so preview never dies.
   */
  const model = useMemo(() => {
    try {
      const raw = JSON.parse(inputJson || "{}");
      setParseError("");
      return new InputObject(raw);
    } catch (e) {
      setParseError(String(e.message || e));
      return new InputObject(DEFAULTS[tab]);
    }
  }, [inputJson, tab]);

  // AlloyInput calls this whenever the field changes (OutputObject)
  function handleOutput(out) {
    const payload =
      out && typeof out.toJSON === "function" ? out.toJSON() : out;

    setOutputJson(JSON.stringify(payload, null, 2));
  }

  // Switch tabs between username / email / password / age / dob / canvas
  function switchTab(nextTab) {
    const fresh = DEFAULTS[nextTab];
    setTab(nextTab);
    setInputJson(JSON.stringify(fresh, null, 2));
    setOutputJson("// Interact with the field (type, blur, etc.)");
    setParseError("");
  }

  // Pretty-print whatever's in the left JSON editor
  function handleFormat() {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parseError UI already covers invalid JSON
    }
  }

  const isCanvas = tab === "canvas" || model?.type === "canvas";

  return (
    <div className="container py-3">
      <h3 className="mb-4 text-center">AlloyInput (layout: "icon")</h3>

      {/* Tabs for the different icon-field presets */}
      <ul className="nav nav-underline nav-fill mb-3">
        {TABS.map((key) => (
          <li className="nav-item" key={key}>
            <button
              className={`nav-link ${key === tab ? "active" : ""}`}
              onClick={() => switchTab(key)}
            >
              {key}
            </button>
          </li>
        ))}
      </ul>

      {/* Usage snippet */}
      <div className="row g-3 mb-3">
        <div className="col-12 text-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyInput input={new InputObject(inputObject)} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live component preview */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <AlloyInput input={model} output={handleOutput} />

          <div className="small text-secondary mt-2 text-center">
            <div>
              <code>layout: "icon"</code> uses a Bootstrap{" "}
              <code>.input-group</code> and shows an icon on the left.
            </div>

            <div>
              This layout <strong>requires</strong>{" "}
              <code>icon</code> (example:{" "}
              <code>{`{ "iconClass": "fa-solid fa-user" }`}</code>).
            </div>

            {isCanvas && (
              <div className="mt-1">
                <strong>Canvas output:</strong> emits a DataURL string in{" "}
                <code>data.value</code>, like{" "}
                <code>data:image/png;base64,...</code>.
              </div>
            )}

            <div className="mt-1">
              <code>className</code> goes directly on the control element. We
              default to <code>"form-control"</code>, but you can try editing the
              JSON to something like{" "}
              <code>"form-control form-control-lg bg-dark text-white"</code> and
              see it live.
            </div>

            <div className="mt-1">
              You can style the icon wrapper span using{" "}
              <code>iconGroupClass</code> (merged with{" "}
              <code>"input-group-text"</code>), e.g.{" "}
              <code>"bg-light border-0"</code>.
            </div>

            <div className="mt-1">
              Required / pattern / passwordStrength validate on blur and speak
              errors with <code>aria-live="polite"</code>.
            </div>
          </div>
        </div>
      </div>

      {/* Editor (left) / Output (right) */}
      <div className="row g-3 align-items-stretch">
        {/* LEFT: Input JSON editor */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="fw-semibold mb-0">Input JSON (editable)</label>

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
            <ul className="mb-0 ps-3">
              <li>
                Must include <code>name</code>, <code>layout: "icon"</code>, and{" "}
                <code>icon</code>.
              </li>
              <li>
                <code>className</code> controls styling for the actual{" "}
                {"<input />"} (or {"<input type='date' />"}, etc.). Default is{" "}
                <code>"form-control"</code>.
              </li>
              <li>
                <code>iconGroupClass</code> controls classes on the icon span
                inside the input group. It is appended to{" "}
                <code>"input-group-text"</code>.
              </li>
              <li>
                You can customize validation:{" "}
                <code>required</code>, <code>pattern</code>,{" "}
                <code>passwordStrength</code>, <code>min</code>, etc.
              </li>
              <li>
                NEW: <code>type: "canvas"</code> supports optional{" "}
                <code>width</code>, <code>height</code>,{" "}
                <code>canvasStrokeWidth</code>, and <code>disabled</code>, and
                emits <code>data:image/png;base64,...</code> as <code>value</code>.
              </li>
              <li>
                These rules update live — delete <code>required</code> in the
                JSON, blur again, and the error should stop.
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT: Output inspector */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="fw-semibold mb-0">
              Output (from <code>output</code> callback)
            </label>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() =>
                setOutputJson("// Interact with the field (type, blur, etc.)")
              }
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace bg-light border"
            rows={18}
            value={outputJson || "// No interaction yet"}
            readOnly
            spellCheck={false}
          />

          <div className="form-text">
            The callback receives a normalized <code>OutputObject</code>, e.g.:
            <pre className="bg-light border rounded-3 p-2 mt-2 small mb-2">
{`{
  "id": "input-abc123",
  "type": "input",
  "action": "change",
  "error": false,
  "data": {
    "name": "username",
    "value": "imtapas",
    "errors": []
  }
}`}
            </pre>

            For <code>type: "canvas"</code>, <code>data.value</code> will be a
            DataURL string like <code>data:image/png;base64,...</code>.
          </div>
        </div>
      </div>
    </div>
  );
}
