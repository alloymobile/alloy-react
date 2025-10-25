// pages/Cell/InputFloatingPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyInput, InputObject } from "../../../src";

// Floating layout examples: all of these use layout: "floating"
// and provide an icon.
const DEFAULTS = {
  name: {
    name: "name",
    label: "Name",
    type: "text",
    layout: "floating",
    placeholder: "Enter your name",
    required: true,
    icon: { iconClass: "fa-solid fa-user" }
  },
  email: {
    name: "email",
    label: "Email",
    type: "email",
    layout: "floating",
    placeholder: "Enter your email",
    required: true,
    icon: { iconClass: "fa-solid fa-envelope" },
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
  },
  password: {
    name: "password",
    label: "Password",
    type: "password",
    layout: "floating",
    required: true,
    icon: { iconClass: "fa-solid fa-lock" },
    passwordStrength: true,
    placeholder: "Enter a strong password"
  },
  age: {
    name: "age",
    label: "Age",
    type: "number",
    layout: "floating",
    placeholder: "Enter your age",
    required: true,
    min: 0,
    icon: { iconClass: "fa-solid fa-hashtag" }
  },
  dob: {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    layout: "floating",
    required: true,
    icon: { iconClass: "fa-solid fa-calendar" }
  }
};

const TABS = Object.keys(DEFAULTS);

export default function InputFloatingPage() {
  // which floating field we're previewing
  const [tab, setTab] = useState("name");

  // editable JSON for that field
  const [inputJson, setInputJson] = useState(
    JSON.stringify(DEFAULTS["name"], null, 2)
  );

  // display from AlloyInput -> output()
  const [outputJson, setOutputJson] = useState(
    "// Interact with the field (type, blur, etc.)"
  );

  // parse error for the JSON editor
  const [parseError, setParseError] = useState("");

  // Build model from current JSON, fallback to that tab's default if broken
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

  // When user types/blur/selects/etc, AlloyInput calls this.
  function handleOutput(report) {
    setOutputJson(JSON.stringify(report, null, 2));
  }

  // Switch to different floating input config
  function switchTab(nextTab) {
    const fresh = DEFAULTS[nextTab];
    setTab(nextTab);
    setInputJson(JSON.stringify(fresh, null, 2));
    setOutputJson("// Interact with the field (type, blur, etc.)");
    setParseError("");
  }

  // Pretty print editor JSON
  function handleFormat() {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore parse failure; parseError UI handles it
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-4 text-center">AlloyInput (layout: "floating")</h3>

      {/* Tabs to choose which floating field we're previewing */}
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

      {/* How to use it */}
      <div className="row g-3 mb-3">
        <div className="col-12 text-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyInput input={new InputObject(inputObject)} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live floating input preview */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <AlloyInput input={model} output={handleOutput} />
          <div className="small text-secondary mt-2 text-center">
            Floating layout uses Bootstrap's <code>.form-floating</code> style.
            The label floats above once there's content or focus.
            <br />
            An <code>icon</code> is required with <code>layout:"floating"</code>.
            <br />
            Validation (required, pattern, passwordStrength, etc.) shows after
            blur.
          </div>
        </div>
      </div>

      {/* Editor / Output panels */}
      <div className="row g-3 align-items-stretch">
        {/* LEFT PANEL: editable JSON */}
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
            <strong>Required:</strong>{" "}
            <code>name</code>, <code>layout:"floating"</code>, and{" "}
            <code>icon</code> (ex:{" "}
            <code>{`{ iconClass: "fa-solid fa-user" }`}</code>).
            <br />
            Other common fields:
            <ul className="mb-1">
              <li>
                <code>required: true</code>
              </li>
              <li>
                <code>passwordStrength: true</code> (must be 8+ chars with
                upper/lower/digit)
              </li>
              <li>
                <code>pattern</code> for email/phone/etc.
              </li>
            </ul>
            Errors are announced with <code>aria-live="polite"</code>.
          </div>
        </div>

        {/* RIGHT PANEL: output from handleOutput */}
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
            <code>value</code>, <code>valid</code>, <code>error</code>, and{" "}
            <code>errors</code> array, based on current validation.
          </div>
        </div>
      </div>
    </div>
  );
}
