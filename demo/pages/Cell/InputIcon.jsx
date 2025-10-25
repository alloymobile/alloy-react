// pages/Cell/InputIconPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyInput, InputObject } from "../../../src";

const DEFAULTS = {
  username: {
    name: "username",
    label: "Username",
    type: "text",
    layout: "icon",
    placeholder: "Enter username",
    required: true,
    icon: { iconClass: "fa-solid fa-user" }
  },
  email: {
    name: "email",
    label: "Email",
    type: "email",
    layout: "icon",
    placeholder: "Enter email",
    required: true,
    icon: { iconClass: "fa-solid fa-envelope" },
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
  },
  password: {
    name: "password",
    label: "Password",
    type: "password",
    layout: "icon",
    required: true,
    icon: { iconClass: "fa-solid fa-lock" },
    passwordStrength: true,
    placeholder: "Enter password"
  },
  age: {
    name: "age",
    label: "Age",
    type: "number",
    layout: "icon",
    placeholder: "Enter your age",
    required: true,
    min: 0,
    icon: { iconClass: "fa-solid fa-hashtag" }
  },
  dob: {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    layout: "icon",
    required: true,
    icon: { iconClass: "fa-solid fa-calendar" }
  }
};

const TABS = Object.keys(DEFAULTS);

export default function InputIconPage() {
  // which icon-style input we're looking at
  const [tab, setTab] = useState("username");

  // editable JSON for the currently selected input model
  const [inputJson, setInputJson] = useState(
    JSON.stringify(DEFAULTS["username"], null, 2)
  );

  // output from AlloyInput's `output` callback
  const [outputJson, setOutputJson] = useState(
    "// Interact with the field (type, blur, etc.)"
  );

  // parse errors when user edits the JSON
  const [parseError, setParseError] = useState("");

  // Build InputObject for preview.
  // If parsing fails, fall back to the tab default so the demo never explodes.
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

  // AlloyInput calls this on change/blur/etc.
  function handleOutput(report) {
    setOutputJson(JSON.stringify(report, null, 2));
  }

  // Switch tabs between username / email / password / etc.
  function switchTab(nextTab) {
    const fresh = DEFAULTS[nextTab];
    setTab(nextTab);
    setInputJson(JSON.stringify(fresh, null, 2));
    setOutputJson("// Interact with the field (type, blur, etc.)");
    setParseError("");
  }

  // Prettify the JSON editor contents
  function handleFormat() {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore if invalid; parseError UI is already telling the story
    }
  }

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
            Icon layout renders a left-hand icon using{" "}
            <code>.input-group</code>.
            <br />
            <code>layout: "icon"</code> requires an <code>icon</code> prop like{" "}
            <code>{`{ iconClass: "fa-solid fa-user" }`}</code>.
            <br />
            Required, pattern, and passwordStrength rules show errors on blur.
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
            <div className="invalid-feedback d-block mt-1">
              {parseError}
            </div>
          )}

          <div className="form-text">
            <strong>Required:</strong>{" "}
            <code>name</code>, <code>layout:"icon"</code>, and{" "}
            <code>icon</code>.
            <br />
            The icon is any Font Awesome class list:
            <br />
            <code>{`{ iconClass: "fa-solid fa-lock" }`}</code>
            <br />
            For password strength enforcement, set{" "}
            <code>passwordStrength: true</code>.
            <br />
            Validation (required, pattern, etc.) runs on blur and is announced
            via <code>aria-live="polite"</code>.
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
            Output shows the current <code>value</code> plus validation:
            <code>valid</code>, <code>error</code>, and the{" "}
            <code>errors</code> array.
          </div>
        </div>
      </div>
    </div>
  );
}
