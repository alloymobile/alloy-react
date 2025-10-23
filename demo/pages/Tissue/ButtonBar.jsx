// demo/pages/tissue/ButtonBar.jsx
import React, { useMemo, useState } from "react";
import { AlloyButtonBar, ButtonBarObject } from "../../../src";

/* ─────────────────────────── Defaults (editable) ─────────────────────────── */

const DEFAULT_JSON_BTN = JSON.stringify(
  {
    type: "AlloyButton",
    className: "nav justify-content-center gap-2",
    buttonClass: "nav-item",
    selected: "active",   // bar-level selected class
    barName: { show: true, name: "Actions", className: "text-center fw-semibold mb-2" },
    buttons: [
      { id: "save",  name: "Save",   className: "btn btn-primary" },
      { id: "reset", name: "Reset",  className: "btn btn-outline-secondary" },
      { id: "del",   name: "Delete", className: "btn btn-danger" }
    ]
  },
  null,
  2
);

const DEFAULT_JSON_BTN_ICON = JSON.stringify(
  {
    type: "AlloyButtonIcon",
    className: "nav justify-content-center gap-2",
    buttonClass: "nav-item",
    selected: "active",   // bar-level selected class
    barName: { show: true, name: "Shortcuts", className: "text-center fw-semibold mb-2" },
    buttons: [
      { id: "homeI", name: "Home",    icon: { iconClass: "fa-solid fa-house" }, className: "btn btn-light" },
      { id: "codeI", name: "Code",    icon: { iconClass: "fa-solid fa-code"  }, className: "btn btn-light" },
      { id: "userI", name: "Profile", icon: { iconClass: "fa-regular fa-user"}, className: "btn btn-light" }
    ]
  },
  null,
  2
);

/* ───────────────────────── UI helpers ─────────────────────────────────────── */

function tagSnippet(type) {
  return type === "AlloyButtonIcon"
    ? `<AlloyButtonBar buttonBar={new ButtonBarObject(buttonBarIcon)} output={handleOutput} />`
    : `<AlloyButtonBar buttonBar={new ButtonBarObject(buttonBar)} output={handleOutput} />`;
}

function buildOutputPayload(self, e) {
  return {
    event: e?.type ?? "unknown",
    button: {
      id: self?.id,
      name: self?.name,
      className: self?.className,
      active: self?.active,       // will include bar's selected class when chosen
      disabled: !!self?.disabled,
      title: self?.title,
      ariaLabel: self?.ariaLabel,
      tabIndex: self?.tabIndex,
      iconClass: self?.icon?.iconClass, // present for ButtonIconObject
    },
  };
}

/* ───────────────────────── Section (one tab content) ─────────────────────── */

function Section({ title, jsonState, setJsonState, outputJson, setOutputJson }) {
  const [parseError, setParseError] = useState("");

  const model = useMemo(() => {
    try {
      setParseError("");
      const parsed = JSON.parse(jsonState);
      // 🔑 Hydration happens inside ButtonBarObject
      return new ButtonBarObject(parsed);
    } catch (e) {
      setParseError(String(e.message || e));
      return new ButtonBarObject({
        type: title,
        className: "nav justify-content-center gap-2",
        barName: { show: true, name: title === "AlloyButton" ? "Actions" : "Shortcuts", className: "text-center fw-semibold mb-2" },
        buttonClass: "nav-item",
        selected: "active",
        buttons: [],
      });
    }
  }, [jsonState, title]);

  function handleOutput(self, e) {
    setOutputJson(JSON.stringify(buildOutputPayload(self, e), null, 2));
  }

  return (
    <div className="card p-3 mb-4">
      <h5 className="mb-3 text-center">{title}</h5>

      {/* Row 1 — Tag sample */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{tagSnippet(title)}</code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Demo bar */}
      <div className="row mb-4">
        <div className="col-12 text-center">
          <AlloyButtonBar buttonBar={model} output={handleOutput} />
          <div className="small text-secondary mt-2">
            Tip: Hover, focus, keydown/keyup, click — all emit via <code>output</code>.  
            Only one button is “selected” at a time (class from <code>selected</code>).
          </div>
        </div>
      </div>

      {/* Row 3 — Two columns: editable input JSON and live output JSON */}
      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable)</span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  const def = title === "AlloyButton" ? DEFAULT_JSON_BTN : DEFAULT_JSON_BTN_ICON;
                  setJsonState(def);
                  setOutputJson("// Interact with the buttons to see events here…");
                }}
              >
                Reset
              </button>
            </div>
          </div>

          <textarea
            className={`form-control font-monospace ${parseError ? "is-invalid" : ""}`}
            rows={18}
            value={jsonState}
            onChange={(e) => setJsonState(e.target.value)}
            spellCheck={false}
          />
          {parseError && <div className="invalid-feedback d-block mt-1">{parseError}</div>}
          <div className="form-text">
            The constructor of <code>ButtonBarObject</code> hydrates <code>buttons</code> to
            <code>ButtonObject</code> or <code>ButtonIconObject</code> based on <code>type</code>.
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Output (from <code>output</code> callback)</span>
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
            Includes the full clicked button’s model (id, name, className, etc.).
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── Page (tabs) ──────────────────────────────── */

export default function ButtonBarPage() {
  const [activeTab, setActiveTab] = useState("AlloyButton");

  const [jsonBtn, setJsonBtn] = useState(DEFAULT_JSON_BTN);
  const [jsonBtnIcon, setJsonBtnIcon] = useState(DEFAULT_JSON_BTN_ICON);

  const [outputBtn, setOutputBtn] = useState("// Interact with the buttons to see events here…");
  const [outputBtnIcon, setOutputBtnIcon] = useState("// Interact with the buttons to see events here…");

  return (
    <div className="container py-4">
      <h3 className="text-center mb-3">AlloyButtonBar</h3>

      {/* Tabs */}
      <ul className="nav nav-tabs justify-content-center mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "AlloyButton" ? "active" : ""}`}
            onClick={() => setActiveTab("AlloyButton")}
          >
            AlloyButton
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "AlloyButtonIcon" ? "active" : ""}`}
            onClick={() => setActiveTab("AlloyButtonIcon")}
          >
            AlloyButtonIcon
          </button>
        </li>
      </ul>

      {/* Panels */}
      {activeTab === "AlloyButton" && (
        <Section
          title="AlloyButton"
          jsonState={jsonBtn}
          setJsonState={setJsonBtn}
          outputJson={outputBtn}
          setOutputJson={setOutputBtn}
        />
      )}
      {activeTab === "AlloyButtonIcon" && (
        <Section
          title="AlloyButtonIcon"
          jsonState={jsonBtnIcon}
          setJsonState={setJsonBtnIcon}
          outputJson={outputBtnIcon}
          setOutputJson={setOutputBtnIcon}
        />
      )}
    </div>
  );
}
