// demo/pages/tissue/CardDemo.jsx
import React, { useMemo, useState } from "react";
import { AlloyCard, CardObject } from "../../../src";

/* ---------------------- Default editable JSON ---------------------- */
const DEFAULT_CARD = JSON.stringify(
  {
    id: "demoCard01",
    className: "card border m-2 shadow",
    link: "", // leave empty to stay on page; set to "/users/101" to test navigation
    body: {
      id: "demoCardBody",
      className: "card-body p-3",
      name: "User Summary",
      show: true
    },
    fields: [
      { id: "f-name",   className: "fw-semibold fs-5 mb-1", name: "Ada Lovelace", show: true },
      { id: "f-role",   className: "text-muted mb-1",       name: "Role: Admin",  show: true },
      { id: "f-joined", className: "",                      name: "Joined: 2023-12-01", show: true }
    ]
  },
  null,
  2
);

/* ---------------------- Tag snippet (display only) ---------------------- */
const TAG_SNIPPET = `<AlloyCard card={new CardObject(cardObject)} />`;

/* ---------------------- Page ---------------------- */
export default function CardPage() {
  const [inputJson, setInputJson] = useState(DEFAULT_CARD);
  const [parseError, setParseError] = useState("");

  const model = useMemo(() => {
    try {
      setParseError("");
      const raw = JSON.parse(inputJson);
      return new CardObject(raw);
    } catch (e) {
      setParseError(String(e.message || e));
      // Safe fallback
      return new CardObject({
        className: "card border m-2 shadow",
        link: "",
        body: { className: "card-body p-3", name: "Invalid JSON" },
        fields: [{ className: "text-danger", name: "Could not parse input JSON." }]
      });
    }
  }, [inputJson]);

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

      {/* Row 2 — Live card preview */}
      <div className="row mb-4">
        <div className="col-12 col-lg-6">
          <AlloyCard card={model} />
          <div className="small text-secondary mt-2">
            Set <code>link</code> (e.g., <code>"/users/101"</code>) to make the card navigable.
          </div>
        </div>
      </div>

      {/* Row 3 — Input JSON (editable) */}
      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable)</span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setInputJson(DEFAULT_CARD)}
            >
              Reset
            </button>
          </div>

          <textarea
            className={`form-control font-monospace ${parseError ? "is-invalid" : ""}`}
            rows={18}
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            spellCheck={false}
          />
          {parseError && <div className="invalid-feedback d-block mt-1">{parseError}</div>}
          <div className="form-text">
            <code>fields</code> preserves array order. Each field renders only when <code>show</code> is <code>true</code>.
          </div>
        </div>
      </div>
    </div>
  );
}
