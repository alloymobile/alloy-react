// demo/pages/tissue/ButtonBar.jsx
import React, { useMemo, useState } from "react";
import { AlloyButtonBar, ButtonBarObject } from "../../../src";

/* ─────────────────────────── Defaults (editable) ───────────────────────────
   These are plain JSON configs. We pass them into new ButtonBarObject(...).
   ButtonBarObject will:
   - generate ids
   - wrap title into a TagObject
   - hydrate each entry in buttons[] into ButtonObject or ButtonIconObject
     depending on `type`.
*/

const DEFAULT_JSON_BTN = JSON.stringify(
  {
    type: "AlloyButton",
    className: "nav justify-content-center gap-2",
    buttonClass: "nav-item",
    selected: "active", // class name injected into the selected button's `active`
    title: {
      name: "Actions",
      className: "text-center fw-semibold mb-2",
    },
    buttons: [
      { id: "save",  name: "Save",   className: "btn btn-primary" },
      { id: "reset", name: "Reset",  className: "btn btn-outline-secondary" },
      { id: "del",   name: "Delete", className: "btn btn-danger" },
    ],
  },
  null,
  2
);

const DEFAULT_JSON_BTN_ICON = JSON.stringify(
  {
    type: "AlloyButtonIcon",
    className: "nav justify-content-center gap-2",
    buttonClass: "nav-item",
    selected: "active",
    title: {
      name: "Shortcuts",
      className: "text-center fw-semibold mb-2",
    },
    buttons: [
      {
        id: "homeI",
        name: "Home",
        icon: { iconClass: "fa-solid fa-house" },
        className: "btn btn-light",
      },
      {
        id: "codeI",
        name: "Code",
        icon: { iconClass: "fa-solid fa-code" },
        className: "btn btn-light",
      },
      {
        id: "userI",
        name: "Profile",
        icon: { iconClass: "fa-regular fa-user" },
        className: "btn btn-light",
      },
    ],
  },
  null,
  2
);

/* ───────────────────────── UI helpers ───────────────────────────────────── */

function tagSnippet() {
  // just for the <code> example block
  return `<AlloyButtonBar buttonBar={new ButtonBarObject(buttonBarJson)} output={handleOutput} />`;
}

/* ───────────────────────── Section (per tab) ────────────────────────────── */

function Section({ tabType, jsonState, setJsonState, outputJson, setOutputJson }) {
  const [parseError, setParseError] = useState("");

  // Build the live model from the textarea
  const model = useMemo(() => {
    try {
      setParseError("");
      const parsed = JSON.parse(jsonState);
      return new ButtonBarObject(parsed);
    } catch (e) {
      setParseError(String(e.message || e));
      // safe fallback if JSON is currently invalid
      return new ButtonBarObject({
        type: tabType,
        className: "nav justify-content-center gap-2",
        buttonClass: "nav-item",
        selected: "active",
        title: {
          name: tabType === "AlloyButton" ? "Actions" : "Shortcuts",
          className: "text-center fw-semibold mb-2",
        },
        buttons: [],
      });
    }
  }, [jsonState, tabType]);

  // capture OutputObject from AlloyButtonBar
  function handleOutput(out) {
    const payload =
      out && typeof out.toJSON === "function" ? out.toJSON() : out;

    setOutputJson(JSON.stringify(payload, null, 2));
  }

  return (
    <div className="card p-3 mb-4">
      <h5 className="mb-3 text-center">{tabType}</h5>

      {/* Row 1 — Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{tagSnippet(tabType)}</code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Live demo */}
      <div className="row mb-4">
        <div className="col-12 text-center">
          <AlloyButtonBar buttonBar={model} output={handleOutput} />
          <div className="small text-secondary mt-2">
            Click, hover, focus, keydown/keyup all emit via{" "}
            <code>output</code> as an <code>OutputObject</code>.
            Clicking a button marks it as “selected”, and that button’s cloned
            model gets <code>selected</code> (for example <code>"active"</code>) injected
            into its <code>active</code> field inside the output’s{" "}
            <code>data.button</code>.
          </div>
        </div>
      </div>

      {/* Row 3 — Editor + Output */}
      <div className="row g-3 align-items-stretch">
        {/* Left: editable JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable)</span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  const def =
                    tabType === "AlloyButton"
                      ? DEFAULT_JSON_BTN
                      : DEFAULT_JSON_BTN_ICON;
                  setJsonState(def);
                  setOutputJson("// Interact with the bar to see events here…");
                }}
              >
                Reset
              </button>
            </div>
          </div>

          <textarea
            className={`form-control font-monospace ${
              parseError ? "is-invalid" : ""
            }`}
            rows={18}
            value={jsonState}
            onChange={(e) => setJsonState(e.target.value)}
            spellCheck={false}
          />
          {parseError && (
            <div className="invalid-feedback d-block mt-1">{parseError}</div>
          )}

          <div className="form-text">
            <ul className="mb-0 ps-3">
              <li>
                <code>type</code> decides which component is used for each
                button: <code>"AlloyButton"</code> or{" "}
                <code>"AlloyButtonIcon"</code>.
              </li>
              <li>
                <code>title</code> becomes a TagObject internally. If{" "}
                <code>title.name</code> is empty, the heading won’t render.
              </li>
              <li>
                <code>buttons</code> is an array of plain objects here.
                The <code>ButtonBarObject</code> constructor automatically
                wraps each into a{" "}
                <code>ButtonObject</code> or{" "}
                <code>ButtonIconObject</code>.
              </li>
              <li>
                When you click a button in the preview, that one becomes
                selected and gets <code>selected</code> (like{" "}
                <code>"active"</code>) injected into its{" "}
                <code>active</code> class.
              </li>
            </ul>
          </div>
        </div>

        {/* Right: output inspector */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Output (from <code>output</code> callback)
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => setOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>
          <textarea
            className="form-control font-monospace"
            rows={18}
            value={outputJson}
            onChange={(e) => setOutputJson(e.target.value)}
            spellCheck={false}
          />
          <div className="form-text">
            This is the normalized <code>OutputObject</code>, typically:
            <ul className="mb-0 ps-3">
              <li>
                <code>type</code>: <code>"button"</code>
              </li>
              <li>
                <code>action</code>: e.g. <code>"click"</code>,{" "}
                <code>"keydown"</code>, etc.
              </li>
              <li>
                <code>data</code>: includes button model snapshot:
                <ul className="mb-0 ps-3">
                  <li>
                    <code>id</code>, <code>name</code>,{" "}
                    <code>className</code>, <code>active</code>
                  </li>
                  <li>
                    <code>disabled</code>, <code>title</code>,{" "}
                    <code>ariaLabel</code>, <code>tabIndex</code>
                  </li>
                  <li>
                    For icon variant: <code>button.iconClass</code> if present.
                  </li>
                </ul>
              </li>
              <li>
                Top-level <code>error</code> /{" "}
                <code>errorMessage</code> are reserved for flow-level errors.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── Page (tabs) ─────────────────────────────── */

export default function ButtonBarPage() {
  const [activeTab, setActiveTab] = useState("AlloyButton");

  const [jsonBtn, setJsonBtn] = useState(DEFAULT_JSON_BTN);
  const [jsonBtnIcon, setJsonBtnIcon] = useState(DEFAULT_JSON_BTN_ICON);

  const [outputBtn, setOutputBtn] = useState(
    "// Interact with the bar to see events here…"
  );
  const [outputBtnIcon, setOutputBtnIcon] = useState(
    "// Interact with the bar to see events here…"
  );

  return (
    <div className="container py-4">
      <h3 className="text-center mb-3">AlloyButtonBar</h3>

      {/* Tabs */}
      <ul className="nav nav-tabs justify-content-center mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "AlloyButton" ? "active" : ""
            }`}
            onClick={() => setActiveTab("AlloyButton")}
          >
            AlloyButton
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "AlloyButtonIcon" ? "active" : ""
            }`}
            onClick={() => setActiveTab("AlloyButtonIcon")}
          >
            AlloyButtonIcon
          </button>
        </li>
      </ul>

      {/* Panels */}
      {activeTab === "AlloyButton" && (
        <Section
          tabType="AlloyButton"
          jsonState={jsonBtn}
          setJsonState={setJsonBtn}
          outputJson={outputBtn}
          setOutputJson={setOutputBtn}
        />
      )}

      {activeTab === "AlloyButtonIcon" && (
        <Section
          tabType="AlloyButtonIcon"
          jsonState={jsonBtnIcon}
          setJsonState={setJsonBtnIcon}
          outputJson={outputBtnIcon}
          setOutputJson={setOutputBtnIcon}
        />
      )}
    </div>
  );
}
