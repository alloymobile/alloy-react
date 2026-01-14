// pages/Cell/InputPage.jsx
import React, { useMemo, useEffect, useState } from "react";
import { AlloyInput, InputObject } from "../../../src";

/**
 * DEFAULT_INPUTS
 * Each preset is valid to pass directly to `new InputObject(...)`.
 *
 * NOTE (SSR-safe IDs):
 * - InputObject should NOT auto-generate `id` (prevents Next.js SSR hydration mismatches).
 * - If you want a predictable id for testing, add `id: "myId"` in any preset JSON.
 * - Otherwise AlloyInput generates a stable SSR/CSR id internally via useId()/useDomId().
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

  switch: {
    name: "isActive",
    label: "Active",
    type: "switch",
    layout: "text",
    required: false,
    className: "form-check-input",
    value: true
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

  // ✅ Multiselect demo (UPDATED: emits string[] like checkbox)
  multiselect: {
    name: "categories",
    label: "Categories",
    type: "multiselect",
    layout: "text",
    required: true,
    className: "form-control",
    searchable: true,
    placeholder: "Type to search categories...",

    // key/value rule (like checkbox/select)
    options: [
      { value: "cat-001", label: "Concrete Pipes", slug: "concrete-pipes" },
      { value: "cat-002", label: "Precast Slabs", slug: "precast-slabs" },
      { value: "cat-003", label: "Rebar", slug: "rebar" },
      { value: "cat-004", label: "Cement Products", slug: "cement-products" },
      { value: "cat-005", label: "Aggregates", slug: "aggregates" },
      { value: "cat-006", label: "Steel & Wire", slug: "steel-wire" }
    ],

    // value is string[]
    value: ["cat-003"]
  },

  date: {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    layout: "text",
    required: true,
    className: "form-control"
  },

  "datetime-local": {
    name: "appointmentTime",
    label: "Appointment Date & Time",
    type: "datetime-local",
    layout: "text",
    required: true,
    className: "form-control",
    min: "2024-01-01T00:00",
    max: "2025-12-31T23:59"
  },

  time: {
    name: "preferredTime",
    label: "Preferred Time",
    type: "time",
    layout: "text",
    required: true,
    className: "form-control",
    min: "09:00",
    max: "17:00"
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
  },

  file: {
    name: "attachments",
    label: "Upload Files (multi)",
    type: "file",
    layout: "text",
    required: true,
    className: "form-control",
    accept: ".pdf,.png,.jpg,.jpeg",
    multiple: true
  },

  canvas: {
    name: "signature",
    label: "Signature (canvas)",
    type: "canvas",
    layout: "text",
    required: true,
    width: 600,
    height: 220,
    canvasStrokeWidth: 2
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

  const { inputModel, parseErr } = useMemo(() => {
    try {
      const raw = JSON.parse(inputJson || "{}");
      return { inputModel: new InputObject(raw), parseErr: "" };
    } catch (e) {
      const msg = String(e?.message || e);
      return { inputModel: new InputObject(DEFAULT_INPUTS[tab]), parseErr: msg };
    }
  }, [inputJson, tab]);

  useEffect(() => {
    setParseError(parseErr);
  }, [parseErr]);

  async function demoFileUploader(fieldName, file) {
    const _ = fieldName;
    return URL.createObjectURL(file);
  }

  function handleOutput(out) {
    const payload =
      out && typeof out.toJSON === "function" ? out.toJSON() : out;

    setOutputJson(JSON.stringify(payload, null, 2));
  }

  function switchTab(nextTab) {
    const freshConfig = DEFAULT_INPUTS[nextTab];
    setTab(nextTab);
    setInputJson(JSON.stringify(freshConfig, null, 2));
    setOutputJson("// Interact with the field (type, blur, select, etc.)");
    setParseError("");
  }

  function handleFormat() {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore
    }
  }

  const uploader = tab === "file" ? demoFileUploader : undefined;

  return (
    <div className="container py-3">
      <h3 className="mb-4 text-center">AlloyInput</h3>

      <ul className="nav nav-underline nav-fill mb-3 flex-wrap">
        {TABS.map((key) => (
          <li className="nav-item" key={key}>
            <button
              className={`nav-link ${key === tab ? "active" : ""}`}
              onClick={() => switchTab(key)}
              type="button"
            >
              {key}
            </button>
          </li>
        ))}
      </ul>

      <div className="row g-3 mb-3">
        <div className="col-12 text-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyInput input={new InputObject(inputObject)} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <AlloyInput
            key={tab}
            input={inputModel}
            output={handleOutput}
            fileUploader={uploader}
          />

          <div className="small text-secondary mt-2 text-center">
            <div>
              Try editing the JSON on the left: remove <code>required</code>,
              change <code>minLength</code>, tweak <code>pattern</code>, etc.
            </div>

            {tab === "multiselect" && (
              <div className="mt-1">
                Multiselect (searchable) emits <code>data.value</code> as a{" "}
                <strong>string[]</strong> (array of selected <code>value</code>s),
                same as checkbox groups.
              </div>
            )}

            <div>
              Errors announce with <code>aria-live="polite"</code> after blur.
            </div>

            <div className="mt-1">
              Tip: You can set an explicit <code>id</code> in the JSON for a
              predictable DOM id. If omitted, AlloyInput generates a stable id
              using React <code>useId()</code> (SSR-safe in Next.js).
            </div>
          </div>
        </div>
      </div>

      {/* JSON editor (left) and callback output (right) */}
      <div className="row g-3 align-items-stretch">
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
        </div>

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
            For <code>type: "multiselect"</code>,{" "}
            <code>data.value</code> will be a <code>string[]</code> of selected values.
          </div>
        </div>
      </div>
    </div>
  );
}
