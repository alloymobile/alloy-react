// demo/pages/tissue/TableLink.jsx
import React, { useMemo, useState } from "react";
import { AlloyTableLink, TableLinkObject } from "../../../src";

/* ---------------------- Default editable JSON ---------------------- */
const DEFAULT_INPUT = JSON.stringify(
  {
    id: "userTableLink01",
    name: "Users (click any cell to open details)",
    className: "table table-hover align-middle",
    link: "/users", // base route; final URL becomes "/users/<row.id>"

    // icon and sort have defaults from the TableLinkObject model:
    //   icon: fa-solid fa-user
    //   sort: fa-solid fa-arrow-down

    rows: [
      { id: 101, name: "Ada Lovelace",        role: "Admin",  joined: "2023-12-01" },
      { id: 102, name: "Linus Torvalds",      role: "User",   joined: "2024-04-15" },
      { id: 103, name: "Margaret Hamilton",   role: "Owner",  joined: "2022-07-22" }
    ]
  },
  null,
  2
);

/* ---------------------- Tag snippet (display only) ---------------------- */
const TAG_SNIPPET = `<AlloyTableLink tableLink={new TableLinkObject(tableLinkObject)} output={handleOutput} />`;

/* ---------------------- Page ---------------------- */
export default function TableLinkPage() {
  const [inputJson, setInputJson] = useState(DEFAULT_INPUT);
  const [parseError, setParseError] = useState("");
  const [outputJson, setOutputJson] = useState(
    [
      "// Header click → { type: 'column', name, dir }",
      "//   Ask server for sorted data and re-supply rows.",
      "// Cell click   → { type: 'navigate', to, id }",
      "//   <Link> already navigates there. This payload is for analytics / side effects."
    ].join("\n")
  );

  // Build the model from textarea JSON.
  // Fall back to a safe default if parse fails.
  const model = useMemo(() => {
    try {
      setParseError("");
      const raw = JSON.parse(inputJson);
      return new TableLinkObject(raw);
    } catch (e) {
      setParseError(String(e.message || e));
      return new TableLinkObject({
        name: "Invalid JSON",
        className: "table table-striped",
        link: "/users",
        rows: []
      });
    }
  }, [inputJson]);

  // Capture events from AlloyTableLink and reflect them in the right-hand panel.
  function handleOutput(payload) {
    // payload is either:
    //   { type: "column", name, dir }
    // or
    //   { type: "navigate", to, id }
    setOutputJson(JSON.stringify(payload, null, 2));
  }

  // Reset helper
  function handleReset() {
    setInputJson(DEFAULT_INPUT);
    setOutputJson(
      [
        "// Header click → { type: 'column', name, dir }",
        "//   Ask server for sorted data and re-supply rows.",
        "// Cell click   → { type: 'navigate', to, id }",
        "//   <Link> already navigates there. This payload is for analytics / side effects."
      ].join("\n")
    );
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyTableLink</h3>

      {/* Row 1 — Example tag usage */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{TAG_SNIPPET}</code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Live table preview */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyTableLink tableLink={model} output={handleOutput} />

          <div className="small text-secondary mt-2">
            <div>
              • Clicking a column header does <strong>not</strong> client-sort.
              It just emits <code>{`{ type: "column", name, dir }`}</code> so
              your parent can call the server and then pass in new rows.
            </div>
            <div className="mt-1">
              • Clicking a cell navigates via{" "}
              <code>&lt;Link&gt;</code> to <code>"/base/:id"</code> (for example
              if <code>link === "/users"</code> and <code>row.id === 42</code>,
              navigation goes to <code>"/users/42"</code>). At the same time we
              emit <code>{`{ type: "navigate", to, id }`}</code> for analytics.
            </div>
            <div className="mt-1">
              • Make sure this demo is rendered inside{" "}
              <code>&lt;BrowserRouter&gt;</code> so the links work.
            </div>
          </div>
        </div>
      </div>

      {/* Row 3 — Editable JSON (left) + Output payload (right) */}
      <div className="row g-3 align-items-stretch">
        {/* LEFT: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable)</span>

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={handleReset}
            >
              Reset
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
            Columns are inferred from the <em>first row’s</em> keys (except{" "}
            <code>id</code>). Each cell becomes a link to{" "}
            <code>link + "/" + row.id</code>.
          </div>
        </div>

        {/* RIGHT: Output JSON */}
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
            Use the emitted payload to call APIs (sorting) or track
            navigation/analytics.
          </div>
        </div>
      </div>
    </div>
  );
}
