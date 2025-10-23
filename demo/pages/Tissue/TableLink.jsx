// demo/pages/tissue/TableLink.jsx
import React, { useMemo, useState } from "react";
import { AlloyTableLink, TableLinkObject } from "../../../src";

/* ---------------------- Default editable JSON ---------------------- */
const DEFAULT_INPUT = JSON.stringify(
  {
    id: "userTableLink01",
    name: "Users (click any cell to open details)",
    className: "table table-hover align-middle",
    link: "/users", // base route; final URL becomes `${link}/${row.id}`
    // icon and sort have defaults:
    //   icon:  fa-solid fa-user
    //   sort:  fa-solid fa-arrow-down
    rows: [
      { id: 101, name: "Ada Lovelace",       role: "Admin",  joined: "2023-12-01" },
      { id: 102, name: "Linus Torvalds",     role: "User",   joined: "2024-04-15" },
      { id: 103, name: "Margaret Hamilton",  role: "Owner",  joined: "2022-07-22" }
    ]
  },
  null,
  2
);

/* ---------------------- Tag snippet (display only) ---------------------- */
const TAG_SNIPPET = `<AlloyTableLink table={new TableLinkObject(tableObject)} output={handleOutput} />`;

/* ---------------------- Page ---------------------- */
export default function TableLinkPage() {
  const [inputJson, setInputJson] = useState(DEFAULT_INPUT);
  const [parseError, setParseError] = useState("");
  const [outputJson, setOutputJson] = useState(
    [
      "// Header click → { type: 'column', name, dir } (ask server for sorted rows).",
      "// Cell click   → { type: 'navigate', to, id } (Link navigates to `${link}/${id}`)."
    ].join("\n")
  );

  const model = useMemo(() => {
    try {
      setParseError("");
      const raw = JSON.parse(inputJson);
      return new TableLinkObject(raw);
    } catch (e) {
      setParseError(String(e.message || e));
      // Safe fallback
      return new TableLinkObject({
        name: "Invalid JSON",
        className: "table table-striped",
        link: "/users",
        rows: []
      });
    }
  }, [inputJson]);

  function handleOutput(payload) {
    // For demo, just show payload. In real usage:
    // - { type:'column', name, dir } -> call API, update rows in state.
    // - { type:'navigate', to, id }  -> navigation is handled by <Link/>, this is for analytics.
    setOutputJson(JSON.stringify(payload, null, 2));
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyTableLink</h3>

      {/* Row 1 — Tag sample */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{TAG_SNIPPET}</code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Live table */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyTableLink table={model} output={handleOutput} />
          <div className="small text-secondary mt-2">
            Sorting is server-driven. Clicking a header only emits the intent; cells navigate using <code>&lt;Link&gt;</code> to <code>{`"${model.link}/:id"`}</code>.
          </div>
        </div>
      </div>

      {/* Row 3 — Input JSON (editable) and Output panel */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable)</span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  setInputJson(DEFAULT_INPUT);
                  setOutputJson(
                    [
                      "// Header click → { type: 'column', name, dir } (ask server for sorted rows).",
                      "// Cell click   → { type: 'navigate', to, id } (Link navigates to `${link}/${id}`)."
                    ].join("\n")
                  );
                }}
              >
                Reset
              </button>
            </div>
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
            Columns are derived from the <em>first row’s</em> keys (excluding <code>id</code>).  
            Navigation target is <code>link + '/' + row.id</code>.
          </div>
        </div>

        {/* Right: Output JSON */}
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
            Make sure this page is rendered inside a <code>&lt;BrowserRouter&gt;</code> so the links work.
          </div>
        </div>
      </div>
    </div>
  );
}
