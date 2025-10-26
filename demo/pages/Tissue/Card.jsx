// demo/pages/tissue/CardDemo.jsx
import React, { useMemo, useState } from "react";
import { AlloyCard, CardObject } from "../../../src";

/* ---------------------- Base objects ---------------------- */
const CARD_NO_LINK_OBJ = {
  id: "demoCard01",
  className: "card border m-2 shadow",

  header: {
    id: "demoCardHeader",
    className: "card-header",
    name: "Account"
  },

  body: {
    id: "demoCardBody",
    className: "card-body p-3",
    name: "User Summary"
  },

  fields: [
    { id: "f-name",   className: "fw-semibold fs-5 mb-1", name: "Ada Lovelace" },
    { id: "f-role",   className: "text-muted mb-1",       name: "Role: Admin" },
    { id: "f-joined", className: "",                      name: "Joined: 2023-12-01" }
  ],

  footer: {
    id: "demoCardFooter",
    className: "card-footer text-muted small",
    name: "Last active: 2 hours ago"
  }
};

const CARD_WITH_LINK_OBJ = {
  ...CARD_NO_LINK_OBJ,
  // only difference: we give link a route
  link: "/users/101"
};

/* pretty-print defaults */
const DEFAULT_NO_LINK_JSON = JSON.stringify(CARD_NO_LINK_OBJ, null, 2);
const DEFAULT_WITH_LINK_JSON = JSON.stringify(CARD_WITH_LINK_OBJ, null, 2);

/* code snippet for docs */
const TAG_SNIPPET = `<AlloyCard card={new CardObject(cardObject)} />`;

export default function CardPage() {
  // which tab are we looking at
  const [activeTab, setActiveTab] = useState("nolink"); // "nolink" | "withlink"

  // each tab has its own editable JSON text
  const [jsonNoLink, setJsonNoLink] = useState(DEFAULT_NO_LINK_JSON);
  const [jsonWithLink, setJsonWithLink] = useState(DEFAULT_WITH_LINK_JSON);

  // and each tab tracks its own parse error
  const [errorNoLink, setErrorNoLink] = useState("");
  const [errorWithLink, setErrorWithLink] = useState("");

  // choose which JSON string + error is active right now
  const activeJson = activeTab === "withlink" ? jsonWithLink : jsonNoLink;
  const activeError = activeTab === "withlink" ? errorWithLink : errorNoLink;

  // parse the active JSON to build preview model
  const previewModel = useMemo(() => {
    const rawText = activeTab === "withlink" ? jsonWithLink : jsonNoLink;
    try {
      const raw = JSON.parse(rawText);
      // clear the appropriate error bucket
      if (activeTab === "withlink") {
        setErrorWithLink("");
      } else {
        setErrorNoLink("");
      }
      return new CardObject(raw);
    } catch (e) {
      // record parse error in the correct bucket
      const msg = String(e.message || e);
      if (activeTab === "withlink") {
        setErrorWithLink(msg);
      } else {
        setErrorNoLink(msg);
      }

      // fallback model so preview doesn't completely die
      return new CardObject({
        className: "card border m-2 shadow",
        link: "",
        header: {
          className: "card-header bg-danger text-white",
          name: "Error"
        },
        body: {
          className: "card-body p-3",
          name: "Invalid JSON"
        },
        fields: [
          {
            className: "text-danger",
            name: "Could not parse input JSON."
          }
        ],
        footer: {
          className: "card-footer text-muted small",
          name: "Fix the JSON on the right and the preview will update."
        }
      });
    }
  }, [activeTab, jsonNoLink, jsonWithLink]);

  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  function handleTextareaChange(e) {
    const next = e.target.value;
    if (activeTab === "withlink") {
      setJsonWithLink(next);
    } else {
      setJsonNoLink(next);
    }
  }

  function handleResetCurrent() {
    if (activeTab === "withlink") {
      setJsonWithLink(DEFAULT_WITH_LINK_JSON);
      setErrorWithLink("");
    } else {
      setJsonNoLink(DEFAULT_NO_LINK_JSON);
      setErrorNoLink("");
    }
  }

  function headerTitle() {
    return activeTab === "withlink"
      ? "With Link"
      : "Without Link";
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyCard</h3>

      {/* Row 1 — Tag sample */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{TAG_SNIPPET}</code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Tabs + Preview */}
      <div className="row mb-4">
        <div className="col-12 col-lg-6">

          {/* Tabs */}
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button
                className={
                  "nav-link " + (activeTab === "nolink" ? "active" : "")
                }
                onClick={() => handleTabClick("nolink")}
                type="button"
              >
                Without Link
              </button>
            </li>

            <li className="nav-item">
              <button
                className={
                  "nav-link " + (activeTab === "withlink" ? "active" : "")
                }
                onClick={() => handleTabClick("withlink")}
                type="button"
              >
                With Link
              </button>
            </li>
          </ul>

          {/* Preview card */}
          <AlloyCard card={previewModel} />

          {/* Helper text */}
          <div className="small text-secondary mt-2">
            <div className="mb-1">
              <strong>Click zone rule:</strong> Only the{" "}
              <code>body</code> section is clickable.
              If <code>link</code> is non-empty, we wrap ONLY{" "}
              <code>body</code> in a React Router{" "}
              <code>&lt;Link /&gt;</code>. Header and footer never become links.
            </div>

            <div className="mb-1">
              The <span className="fw-semibold">"Without Link"</span> tab uses
              JSON where <code>"link": ""</code>.
            </div>

            <div className="mb-1">
              The <span className="fw-semibold">"With Link"</span> tab uses
              JSON where <code>"link": "/users/101"</code>.
            </div>

            <div className="text-muted">
              You can edit each tab’s JSON separately below.
            </div>
          </div>
        </div>
      </div>

      {/* Row 3 — Tab-specific editable JSON */}
      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              {headerTitle()} — Input JSON (editable)
            </span>

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={handleResetCurrent}
            >
              Reset This Tab
            </button>
          </div>

          <textarea
            className={`form-control font-monospace ${
              activeError ? "is-invalid" : ""
            }`}
            rows={18}
            value={activeJson}
            onChange={handleTextareaChange}
            spellCheck={false}
          />

          {activeError && (
            <div className="invalid-feedback d-block mt-1">{activeError}</div>
          )}

          <div className="form-text">
            <ul className="mb-0 ps-3">
              <li>
                <code>body</code> is required. We wrap plain objects into{" "}
                <code>TagObject</code> and default missing classes to{" "}
                <code>"card-body"</code>.
              </li>

              <li>
                <code>header</code> and <code>footer</code> are optional. If
                present, we default their classes to{" "}
                <code>"card-header"</code> / <code>"card-footer"</code> unless
                you override.
              </li>

              <li>
                <code>fields</code> is an ordered array of blocks rendered
                inside <code>body</code>, after <code>body.name</code>.
              </li>

              <li className="mt-2">
                <strong>link</strong>:
                <ul className="ps-3 mb-0">
                  <li>
                    If <code>link</code> is <code>""</code> (empty string),
                    the card is not navigable.
                  </li>
                  <li>
                    If <code>link</code> is something like{" "}
                    <code>"/users/101"</code>, ONLY the{" "}
                    <code>body</code> area becomes a clickable{" "}
                    <code>&lt;Link/&gt;</code>.
                  </li>
                  <li>
                    The header and footer remain normal text/controls and
                    do not navigate.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
