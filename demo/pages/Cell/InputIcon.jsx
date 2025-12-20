// pages/Cell/InputIconPage.jsx
import React, { useMemo, useEffect, useState } from "react";
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
 *
 * NOTE (SSR-safe IDs):
 * - InputObject should NOT auto-generate `id` (prevents Next.js SSR hydration mismatches).
 * - If you want a predictable id for testing, add `id: "myId"` in any preset JSON.
 * - Otherwise AlloyInput generates a stable SSR/CSR id internally via useId()/useDomId().
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
    // Tip: set iconGroupClass: "" to ignore extra styling (keeps only "input-group-text")
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

  // ✅ File demo in icon layout (MULTI enabled)
  // - With fileUploader: emits string[] (multi) blob URLs in this demo
  // - Without fileUploader: emits File[] (multi)
  file: {
    name: "attachments",
    label: "Upload Files (icon layout, multi)",
    type: "file",
    layout: "icon",
    required: true,
    icon: { iconClass: "fa-solid fa-paperclip" },
    className: "form-control",
    iconGroupClass: "bg-light border-0",
    accept: ".pdf,.png,.jpg,.jpeg",
    multiple: true
  },

  // ✅ Canvas demo in icon layout
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
  const [tab, setTab] = useState("username");

  const [inputJson, setInputJson] = useState(
    JSON.stringify(DEFAULTS["username"], null, 2)
  );

  const [outputJson, setOutputJson] = useState(
    "// Interact with the field (type, blur, etc.)"
  );

  const [parseError, setParseError] = useState("");

  /**
   * Build InputObject for preview.
   * Keep useMemo PURE (no setState inside render). We return parseErr and set it in an effect.
   */
  const { model, parseErr } = useMemo(() => {
    try {
      const raw = JSON.parse(inputJson || "{}");
      return { model: new InputObject(raw), parseErr: "" };
    } catch (e) {
      const msg = String(e?.message || e);
      return { model: new InputObject(DEFAULTS[tab]), parseErr: msg };
    }
  }, [inputJson, tab]);

  useEffect(() => {
    setParseError(parseErr);
  }, [parseErr]);

  // Demo-only fileUploader:
  // returns a local blob URL so you can see URL behavior without a backend.
  async function demoFileUploader(fieldName, file) {
    // eslint-disable-next-line no-unused-vars
    const _ = fieldName;
    return URL.createObjectURL(file);
  }

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
      // ignore; parseError UI already covers invalid JSON
    }
  }

  const isCanvas = tab === "canvas" || model?.type === "canvas";
  const isFile = tab === "file" || model?.type === "file";

  // Enable uploader only for file tab (keeps other tabs pure)
  const uploader = isFile ? demoFileUploader : undefined;

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
              type="button"
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
          {/* key={tab} remounts between presets (keeps demo clean; canvas won't carry state) */}
          <AlloyInput
            key={tab}
            input={model}
            output={handleOutput}
            fileUploader={uploader}
          />

          <div className="small text-secondary mt-2 text-center">
            <div>
              <code>layout: "icon"</code> uses a Bootstrap <code>.input-group</code>{" "}
              and shows an icon on the left.
            </div>

            <div>
              This layout <strong>requires</strong> <code>icon</code> (example:{" "}
              <code>{`{ "iconClass": "fa-solid fa-user" }`}</code>).
            </div>

            <div className="mt-1">
              You can style the icon wrapper span using <code>iconGroupClass</code>.
              It’s appended to <code>"input-group-text"</code>. If you want no extra
              styling, set <code>iconGroupClass: ""</code>.
            </div>

            {isFile && (
              <div className="mt-1">
                <strong>File output:</strong> this demo enables <code>fileUploader</code>{" "}
                and <code>multiple: true</code>, so <code>data.value</code> emits{" "}
                <code>string[]</code> (blob URLs). Without uploader, it would emit{" "}
                <code>File[]</code>.
              </div>
            )}

            {isCanvas && (
              <div className="mt-1">
                <strong>Canvas output:</strong> emits a DataURL string in{" "}
                <code>data.value</code>, like <code>data:image/png;base64,...</code>.
                Blank canvas stays empty so <code>required</code> works correctly.
              </div>
            )}

            <div className="mt-1">
              Required / pattern / passwordStrength validate on blur and speak errors
              with <code>aria-live="polite"</code>.
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
                <code>className</code> controls styling for the actual control
                element. Default is <code>"form-control"</code>.
              </li>
              <li>
                <code>iconGroupClass</code> controls classes on the icon span and
                is appended to <code>"input-group-text"</code>. Set it to{" "}
                <code>""</code> to ignore extra span styling.
              </li>
              <li>
                You can customize validation: <code>required</code>,{" "}
                <code>pattern</code>, <code>passwordStrength</code>, <code>min</code>, etc.
              </li>
              <li>
                <code>type: "file"</code> supports <code>accept</code> and{" "}
                <code>multiple</code>. With <code>fileUploader</code>, value becomes{" "}
                a URL string (multi = <code>string[]</code>).
              </li>
              <li>
                <code>type: "canvas"</code> supports optional <code>width</code>,{" "}
                <code>height</code>, <code>canvasStrokeWidth</code>, and{" "}
                <code>disabled</code>, and emits <code>data:image/png;base64,...</code>.
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
  "id": "input-<stable>",
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

            For <code>type: "canvas"</code>, <code>data.value</code> is a DataURL string.
            For <code>type: "file"</code> with multi enabled, <code>data.value</code> is an array.
          </div>
        </div>
      </div>
    </div>
  );
}
