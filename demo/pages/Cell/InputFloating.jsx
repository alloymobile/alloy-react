// pages/Cell/InputFloatingPage.jsx
import React, { useMemo, useEffect, useState } from "react";
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
 * - File input also looks/behaves awkward in floating labels across browsers,
 *   so file preset uses layout: "icon".
 *
 * NOTE (SSR-safe IDs):
 * - InputObject should NOT auto-generate `id` (prevents Next.js SSR hydration mismatches).
 * - If you want a predictable id for testing, add `id: "myId"` in any preset JSON.
 * - Otherwise AlloyInput generates a stable SSR/CSR id internally via useId()/useDomId().
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

  // ✅ File demo (icon layout; MULTI enabled)
  // - With fileUploader: emits string[] (multi) blob URLs in this demo
  // - Without fileUploader: emits File[] (multi)
  file: {
    name: "attachments",
    label: "Upload Files",
    type: "file",
    layout: "icon", // ✅ not floating
    required: true,
    icon: { iconClass: "fa-solid fa-paperclip" },
    iconGroupClass: "bg-light border-0",
    className: "form-control",
    accept: ".pdf,.png,.jpg,.jpeg",
    multiple: true
  },

  // ✅ Canvas demo
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

  /**
   * Build model from current JSON, fallback to tab default if broken.
   * Keep useMemo PURE (no setState inside render). Return parseErr and set it via useEffect.
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
      // ignore; parseError UI covers it
    }
  }

  const isCanvas = tab === "canvas" || model?.type === "canvas";
  const isFile = tab === "file" || model?.type === "file";
  const isFloating = model?.layout === "floating";

  // Enable uploader only for file tab (keeps other tabs pure)
  const uploader = isFile ? demoFileUploader : undefined;

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

          {/* key={tab} remounts between presets (keeps demo clean; canvas won't carry state) */}
          <AlloyInput
            key={tab}
            input={model}
            output={handleOutput}
            fileUploader={uploader}
          />

          <div className="small text-secondary mt-2 text-center">
            <div className="mb-2">
              This page demonstrates <code>layout: "floating"</code> for normal
              inputs, and uses safer layouts for special controls.
            </div>

            <div className="mb-2">
              <strong>Floating requires:</strong>{" "}
              <code>layout: "floating"</code> and an <code>icon</code>.
            </div>

            {isFile && (
              <div className="mb-2">
                <strong>File note:</strong> file inputs don’t behave consistently
                with floating labels across browsers, so this preset uses{" "}
                <code>layout: "icon"</code>. With demo uploader +{" "}
                <code>multiple: true</code>, <code>data.value</code> emits{" "}
                <code>string[]</code> (blob URLs).
              </div>
            )}

            {isCanvas && (
              <div className="mb-2">
                <strong>Canvas note:</strong> canvas uses{" "}
                <code>layout: "text"</code> (or switch to <code>"icon"</code>).
                Output emits a DataURL string; blank stays empty so{" "}
                <code>required</code> works correctly.
              </div>
            )}

            <div className="mb-0">
              Validation is reactive. Edit JSON, blur again, and rules update.
              Errors announce with <code>aria-live="polite"</code>.
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
                File preset uses <code>layout: "icon"</code> (recommended for{" "}
                <code>&lt;input type="file"&gt;</code>).
              </li>
              <li>
                Canvas preset uses <code>layout: "text"</code> (recommended for{" "}
                <code>&lt;canvas&gt;</code>).
              </li>
              <li>
                <code>type: "file"</code> supports <code>accept</code> and{" "}
                <code>multiple</code>. With <code>fileUploader</code>, multi emits{" "}
                <code>string[]</code>.
              </li>
              <li>
                Optional: set an explicit <code>id</code> in JSON. If omitted,
                AlloyInput generates an SSR-safe id internally.
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
  "id": "input-<stable>",
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
            For <code>type: "canvas"</code>, <code>data.value</code> is a DataURL string.
            For <code>type: "file"</code> with multi enabled, <code>data.value</code> is an array.
          </div>
        </div>
      </div>
    </div>
  );
}
