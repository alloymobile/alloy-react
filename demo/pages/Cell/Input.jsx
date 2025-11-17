import React, { useMemo, useState } from "react";
import { AlloyInput, InputObject } from "../../../src";

/**
 * DEFAULT_INPUTS
 * Each preset is valid to pass directly to `new InputObject(...)`.
 * Notice `className`:
 *   - text-ish, textarea, password, etc. use "form-control"
 *   - select uses "form-select"
 *   - radio / checkbox use "form-check-input"
 *
 * You can override className in your JSON to theme per-field.
 */
const DEFAULT_INPUTS = {
  text: {
    name: "fullName",
    label: "Full Name",
    type: "text",
    layout: "text",
    placeholder: "Enter your name",
    required: true,
    className: "form-control"
  },

  email: {
    name: "email",
    label: "Email",
    type: "email",
    layout: "text",
    placeholder: "Enter your email",
    required: true,
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    className: "form-control"
  },

  password: {
    name: "password",
    label: "Password",
    type: "password",
    layout: "text",
    placeholder: "Enter your password",
    required: true,
    passwordStrength: true,
    className: "form-control"
  },

  number: {
    name: "age",
    label: "Age",
    type: "number",
    layout: "text",
    placeholder: "Age in years",
    min: 18,
    className: "form-control"
  },

  textarea: {
    name: "bio",
    label: "Bio",
    type: "textarea",
    layout: "text",
    placeholder: "Tell us about yourself...",
    required: true,
    minLength: 10,
    className: "form-control"
  },

  checkbox: {
    name: "interests",
    label: "Interests",
    type: "checkbox",
    layout: "text",
    required: true,
    className: "form-check-input",
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
    required: true,
    className: "form-select",
    options: [
      { value: "", label: "Select role" },
      { value: "admin", label: "Admin" },
      { value: "user", label: "User" },
      { value: "guest", label: "Guest" }
    ]
  },

  date: {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    layout: "text",
    required: true,
    className: "form-control"
  },

  radio: {
    name: "gender",
    label: "Gender",
    type: "radio",
    layout: "text",
    required: true,
    className: "form-check-input",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" }
    ]
  }
};

const TABS = Object.keys(DEFAULT_INPUTS);

export default function InputPage() {
  // which preset we're looking at
  const [tab, setTab] = useState("text");

  // left textarea (editable JSON for the current tab)
  const [inputJson, setInputJson] = useState(
    JSON.stringify(DEFAULT_INPUTS["text"], null, 2)
  );

  // right textarea (live output from AlloyInput's output callback)
  const [outputJson, setOutputJson] = useState(
    "// Interact with the field (type, blur, select, etc.)"
  );

  // parseError if user types invalid JSON
  const [parseError, setParseError] = useState("");

  /**
   * Build an InputObject from whatever's in the editor.
   * If parsing fails, fallback to that tab's default preset
   * so the preview never explodes.
   */
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

  // AlloyInput calls this on change/blur with OutputObject
  function handleOutput(out) {
    const payload =
      out && typeof out.toJSON === "function" ? out.toJSON() : out;

    setOutputJson(JSON.stringify(payload, null, 2));
  }

  // switch tabs (ex: "text" -> "email")
  function switchTab(nextTab) {
    const freshConfig = DEFAULT_INPUTS[nextTab];
    setTab(nextTab);
    setInputJson(JSON.stringify(freshConfig, null, 2));
    setOutputJson("// Interact with the field (type, blur, select, etc.)");
    setParseError("");
  }

  // helper: pretty-print the JSON in the left editor
  function handleFormat() {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parseError is already shown if invalid
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-4 text-center">AlloyInput</h3>

      {/* Tabs for each field type */}
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
            <div>
              Try editing the JSON on the left: remove <code>required</code>, change{" "}
              <code>minLength</code>, tweak <code>pattern</code>, etc. The field
              re-validates live (no remount needed).
            </div>
            <div>
              Errors announce with <code>aria-live="polite"</code> after blur.
            </div>
          </div>
        </div>
      </div>

      {/* JSON editor (left) and callback output (right) */}
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
                Only <code>name</code> is required.
              </li>
              <li>
                <code>className</code> styles the control. Examples:
                <code>"form-control"</code>, <code>"form-select"</code>,{" "}
                <code>"form-check-input"</code>, or your own classes
                like <code>"form-control form-control-lg bg-dark text-white"</code>.
              </li>
              <li>
                For checkbox / radio, pass{" "}
                <code>
                  options: [ &#123;value:"news", label:"News"&#125;, ... ]
                </code>
              </li>
              <li>
                To enforce strong password rules, set{" "}
                <code>passwordStrength: true</code>.
              </li>
              <li>
                Layout <code>"icon"</code> or <code>"floating"</code> also
                requires an <code>icon</code>, for example{" "}
                <code>{`{ iconClass: "fa-solid fa-user" }`}</code>.
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT: Output payload from AlloyInput */}
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
            The callback receives a normalized <code>OutputObject</code>, e.g.:
            <pre className="bg-light border rounded-3 p-2 mt-2 small mb-2">
{`{
  "id": "input-xyz",
  "type": "input",
  "action": "change",   // or "blur"
  "error": false,       // true if validation failed
  "errorMessage": [],
  "data": {
    "name": "email",
    "value": "user@example.com",
    "errors": []        // array of validation messages for this field
  }
}`}
            </pre>
            Use <code>error</code> to know if the field is currently invalid,
            and read <code>data.value</code> for the latest value.
          </div>
        </div>
      </div>
    </div>
  );
}
