// pages/Cell/Input.jsx
import React, { useMemo, useState } from "react";
import { AlloyInput, InputObject } from "../../../src";

const DEFAULT_INPUTS = {
  text: {
    name: "fullName",
    label: "Full Name",
    type: "text",
    layout: "text",
    placeholder: "Enter your name",
    required: true
  },
  email: {
    name: "email",
    label: "Email",
    type: "email",
    layout: "text",
    placeholder: "Enter your email",
    required: true,
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
  },
  password: {
    name: "password",
    label: "Password",
    type: "password",
    layout: "text",
    placeholder: "Enter your password",
    required: true,
    passwordStrength: true
  },
  number: {
    name: "age",
    label: "Age",
    type: "number",
    layout: "text",
    placeholder: "Age in years",
    min: 18
  },
  textarea: {
    name: "bio",
    label: "Bio",
    type: "textarea",
    layout: "text",
    placeholder: "Tell us about yourself...",
    required: true,
    minLength: 10
  },
  checkbox: {
    name: "interests",
    label: "Interests",
    type: "checkbox",
    layout: "text",
    required: true,
    options: [
      { value: "news", label: "News" },
      { value: "updates", label: "Product Updates" },
      { value: "offers", label: "Special Offers" }
    ]
  },
  select: {
    name: "role",
    label: "Role",
    type: "select",
    layout: "text",
    options: [
      { value: "", label: "Select role" },
      { value: "admin", label: "Admin" },
      { value: "user", label: "User" },
      { value: "guest", label: "Guest" }
    ],
    required: true
  },
  date: {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    layout: "text",
    required: true
  },
  radio: {
    name: "gender",
    label: "Gender",
    type: "radio",
    layout: "text",
    required: true,
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" }
    ]
  }
};

const TABS = Object.keys(DEFAULT_INPUTS);

export default function InputPage() {
  const [tab, setTab] = useState("text");
  const [inputJson, setInputJson] = useState(
    JSON.stringify(DEFAULT_INPUTS["text"], null, 2)
  );
  const [outputJson, setOutputJson] = useState(
    "// Interact with the field (type, blur, select, etc.)"
  );
  const [parseError, setParseError] = useState("");

  // Build an InputObject from the editable JSON.
  // If parse fails, fall back to the default for the selected tab.
  const inputModel = useMemo(() => {
    try {
      const raw = JSON.parse(inputJson || "{}");
      setParseError("");
      return new InputObject(raw);
    } catch (e) {
      setParseError(String(e.message || e));
      return new InputObject(DEFAULT_INPUTS[tab]);
    }
  }, [inputJson, tab]);

  // Called by AlloyInput on change / blur.
  function handleOutput(report) {
    setOutputJson(JSON.stringify(report, null, 2));
  }

  // Switch between input variants (text, email, checkbox, etc.)
  function switchTab(nextTab) {
    const freshConfig = DEFAULT_INPUTS[nextTab];
    setTab(nextTab);
    setInputJson(JSON.stringify(freshConfig, null, 2));
    setOutputJson("// Interact with the field (type, blur, select, etc.)");
    setParseError("");
  }

  // Prettify current JSON
  function handleFormat() {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore if invalid; parseError is already showing
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-4 text-center">AlloyInput</h3>

      {/* Tabs for field types */}
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

      {/* Live field preview */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <AlloyInput input={inputModel} output={handleOutput} />
          <div className="small text-secondary mt-2 text-center">
            Required, minLength, pattern, passwordStrength, etc. validate on
            blur. Errors are spoken with{" "}
            <code>aria-live="polite"</code>.
          </div>
        </div>
      </div>

      {/* JSON editor (left) and callback output (right) */}
      <div className="row g-3 align-items-stretch">
        {/* LEFT: Input JSON */}
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
            Only <code>name</code> is required.
            <br />
            For checkbox / radio, use{" "}
            <code>
              options: [ {"{"}value:"news", label:"News"{"}"} , ... ]
            </code>
            .
            <br />
            To enforce strong password rules, set{" "}
            <code>passwordStrength: true</code>.
            <br />
            Layout variants <code>"icon"</code> or <code>"floating"</code>{" "}
            require an <code>icon</code> like{" "}
            <code>{`{ iconClass: "fa-solid fa-user" }`}</code>.
          </div>
        </div>

        {/* RIGHT: Output from handleOutput */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="fw-semibold mb-0">
              Output (from <code>output</code> callback)
            </label>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() =>
                setOutputJson(
                  "// Interact with the field (type, blur, select, etc.)"
                )
              }
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace bg-light border"
            rows={18}
            value={outputJson || "// no interaction yet"}
            readOnly
            spellCheck={false}
          />

          <div className="form-text">
            Contains <code>value</code> and validation status:
            <code>valid</code>, <code>error</code>, and{" "}
            <code>errors</code> array.
          </div>
        </div>
      </div>
    </div>
  );
}
