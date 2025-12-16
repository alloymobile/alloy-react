import React, { useMemo, useState } from "react";
import { AlloyInput, InputObject } from "../../../src";

/**
 * DEFAULTS
 *
 * Most of these use layout: "floating".
 * layout: "floating" REQUIRES an `icon`.
 *
 * NOTE:
 * - Canvas does NOT work well with Bootstrap floating labels.
 *   So canvas preset uses layout: "text" (or you can switch it to "icon").
 */
const DEFAULTS = {
  name: {
    name: "name",
    label: "Name",
    type: "text",
    layout: "floating",
    placeholder: "Enter your name",
    required: true,
    icon: { iconClass: "fa-solid fa-user" },
    className: "form-control"
  },
  email: {
    name: "email",
    label: "Email",
    type: "email",
    layout: "floating",
    placeholder: "Enter your email",
    required: true,
    icon: { iconClass: "fa-solid fa-envelope" },
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    className: "form-control"
  },
  password: {
    name: "password",
    label: "Password",
    type: "password",
    layout: "floating",
    required: true,
    icon: { iconClass: "fa-solid fa-lock" },
    passwordStrength: true,
    placeholder: "Enter a strong password",
    className: "form-control"
  },
  age: {
    name: "age",
    label: "Age",
    type: "number",
    layout: "floating",
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
    layout: "floating",
    required: true,
    icon: { iconClass: "fa-solid fa-calendar" },
    className: "form-control"
  },

  // ✅ NEW: Canvas demo
  // IMPORTANT: canvas uses layout "text" (floating label isn't suitable for <canvas>).
  // Emits: data.value = "data:image/png;base64,...."
  canvas: {
    name: "signature",
    label: "Signature (Canvas)",
    type: "canvas",
    layout: "text", // ✅ do NOT use "floating" for canvas
    required: true,
    width: 600,
    height: 220,
    canvasStrokeWidth: 2
    // If you want an icon next to canvas, you can change to:
    // layout: "icon",
    // icon: { iconClass: "fa-solid fa-pen-nib" }
  }
};

const TABS = Object.keys(DEFAULTS);

export default function InputFloatingPage() {
  const [tab, setTab] = useState("name");
  const [inputJson, setInputJson] = useState(
    JSON.stringify(DEFAULTS["name"], null, 2)
  );
  const [outputJson, setOutputJson] = useState(
    "// Interact with the field (type, blur, etc.)"
  );
  const [parseError, setParseError] = useState("");

  // Build model from current JSON, fallback to tab default if broken.
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

  // Now receives OutputObject from AlloyInput
  function handleOutput(out) {
    const payload =
      out && typeof out.toJSON === "function" ? out.toJSON() : out;

    setOutputJson(JSON.stringify(payload, null, 2));
  }

  function switchTab(nextTab) {
    const fresh = DEFAULTS[nextTab];
    setTab(nextTab);
    setInputJson(JSON.stringify(fresh, null, 2));
    setOutputJson("// Interact with the field (type, blur, etc.)");
    setParseError("");
  }

  function handleFormat() {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parseError UI covers it
    }
  }

  const isCanvas = tab === "canvas" || model?.type === "canvas";
  const isFloating = model?.layout === "floating";

  return (
    <div className="container py-3">
      <h3 className="mb-4 text-center">AlloyInput (layout: "floating")</h3>

      {/* Tabs */}
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

      {/* Live preview */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          {isCanvas && isFloating && (
            <div className="alert alert-warning py-2">
              <strong>Note:</strong> Canvas doesn’t work well with{" "}
              <code>layout: "floating"</code>. Switch canvas to{" "}
              <code>layout: "text"</code> or <code>layout: "icon"</code> in the
              JSON.
            </div>
          )}

          <AlloyInput input={model} output={handleOutput} />

          <div className="small text-secondary mt-2 text-center">
            <div className="mb-2">
              <code>layout: "floating"</code> uses Bootstrap{" "}
              <code>.form-floating</code>. The label floats above on focus or
              once there's content.
            </div>

            <div className="mb-2">
              <strong>Floating requires:</strong>{" "}
              <code>layout: "floating"</code> and an <code>icon</code> (for
              example <code>{`{ iconClass: "fa-solid fa-user" }`}</code>).
            </div>

            {isCanvas && (
              <div className="mb-2">
                <strong>Canvas output:</strong> emits a DataURL string in{" "}
                <code>data.value</code>, like{" "}
                <code>data:image/png;base64,...</code>.
                <br />
                Best layouts for canvas: <code>"text"</code> or{" "}
                <code>"icon"</code>.
              </div>
            )}

            <div className="mb-0">
              Validation (<code>required</code>, <code>pattern</code>,{" "}
              <code>passwordStrength</code>, <code>min</code>, etc.) is reactive.
              Edit the JSON, blur again, and watch rules change. Errors are
              spoken with <code>aria-live="polite"</code>.
            </div>
          </div>
        </div>
      </div>

      {/* Editor / Output */}
      <div className="row g-3 align-items-stretch">
        {/* LEFT: JSON editor */}
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
            <ul className="mb-1 ps-3">
              <li>
                <code>name</code> is required.
              </li>
              <li>
                <code>layout: "floating"</code> requires an <code>icon</code>.
              </li>
              <li>
                <code>className</code> customizes the control’s classes (default{" "}
                <code>"form-control"</code>).
              </li>
              <li>
                Add validation knobs like{" "}
                <code>required</code>, <code>pattern</code>,{" "}
                <code>passwordStrength</code>, <code>min</code>, etc.
              </li>
              <li>
                NEW: <code>type: "canvas"</code> supports optional{" "}
                <code>width</code>, <code>height</code>,{" "}
                <code>canvasStrokeWidth</code>, and <code>disabled</code>.
              </li>
              <li>
                For canvas, use <code>layout: "text"</code> or{" "}
                <code>layout: "icon"</code> (floating labels aren’t suitable for{" "}
                <code>&lt;canvas&gt;</code>).
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT: output from handleOutput */}
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
            The callback gets a normalized <code>OutputObject</code>, like:
            <pre className="bg-light border rounded-3 p-2 mt-2 small mb-2">
{`{
  "id": "input-xyz",
  "type": "input",
  "action": "change",
  "error": false,
  "data": {
    "name": "email",
    "value": "user@example.com",
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
