// pages/Cell/InputFloatingPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyInput, InputObject } from "../../../src";

/**
 * DEFAULTS
 *
 * All of these use layout: "floating".
 * layout: "floating" REQUIRES an `icon`.
 *
 * Every preset now includes `className: "form-control"`.
 * You can override that in the editor to apply custom classes to the actual
 * rendered control (<input>, <textarea>, etc.).
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
  // AlloyInput syncs validation + className props on each render now.
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

  function handleOutput(report) {
    setOutputJson(JSON.stringify(report, null, 2));
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
          <AlloyInput input={model} output={handleOutput} />
          <div className="small text-secondary mt-2 text-center">
            <div className="mb-2">
              <code>layout: "floating"</code> uses Bootstrap{" "}
              <code>.form-floating</code>. The label floats above on focus or
              once there's content.
            </div>

            <div className="mb-2">
              <strong>Must include:</strong>{" "}
              <code>layout: "floating"</code> and an{" "}
              <code>icon</code> (for example{" "}
              <code>{`{ iconClass: "fa-solid fa-user" }`}</code>).
            </div>

            <div className="mb-2">
              <strong>Styling:</strong>{" "}
              <code>className</code> is applied directly to the rendered control
              (&lt;input/&gt;, &lt;textarea/&gt;, etc).
              All presets default to{" "}
              <code>"form-control"</code>.
              You can live-edit it in the JSON to anything like{" "}
              <code>
                "form-control form-control-lg bg-dark text-white border-warning"
              </code>{" "}
              and the preview will reflect that.
            </div>

            <div className="mb-0">
              Validation (<code>required</code>, <code>pattern</code>,{" "}
              <code>passwordStrength</code>, <code>min</code>, etc.) now
              re-syncs every render. If you delete <code>required</code> from
              the JSON and blur again, the "required" error should go away.
              Errors are spoken with <code>aria-live="polite"</code>.
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
            <div className="invalid-feedback d-block mt-1">
              {parseError}
            </div>
          )}

          <div className="form-text">
            <ul className="mb-1 ps-3">
              <li>
                <code>name</code> is required.
              </li>
              <li>
                <code>layout: "floating"</code> is required and must include{" "}
                <code>icon</code>.
              </li>
              <li>
                <code>className</code> customizes the control’s classes. We
                default to <code>"form-control"</code> for you.
              </li>
              <li>
                Add validation knobs like{" "}
                <code>required</code>, <code>pattern</code>,{" "}
                <code>passwordStrength</code>, <code>min</code>, etc.
              </li>
              <li>
                Those validation props are reactive in the preview — edit the
                JSON, blur the field, and watch the error rules change.
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
            Output shows:
            <ul className="mb-0 ps-3">
              <li>
                <code>value</code>
              </li>
              <li>
                <code>valid</code> / <code>error</code>
              </li>
              <li>
                <code>errors</code> (array of human-readable messages)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
