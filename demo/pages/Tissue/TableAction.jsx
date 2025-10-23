// demo/pages/tissue/TableAction.jsx
import React, { useMemo, useState } from "react";
import { AlloyTableAction, TableActionObject } from "../../../src";

/* ---------------------- Default editable JSON ---------------------- */
const DEFAULT_INPUT = JSON.stringify(
  {
    id: "userTableAction01",
    name: "Users (row actions)",
    className: "table table-hover align-middle",
    // When provided, each non-id cell becomes a Link to `${link}/{row.id}`:
    link: "/users",
    // icon/sort default inside component:
    //   icon:  fa-solid fa-user
    //   sort:  fa-solid fa-arrow-down
    rows: [
      { id: 101, name: "Ada Lovelace",      role: "Admin",  joined: "2023-12-01" },
      { id: 102, name: "Linus Torvalds",    role: "User",   joined: "2024-04-15" },
      { id: 103, name: "Margaret Hamilton", role: "Owner",  joined: "2022-07-22" }
    ],
    actions: {
      // Renders the SAME bar instance in each row (no cloning)
      type: "AlloyButton",                            // or "AlloyButtonIcon"
      className: "nav justify-content-end gap-2",
      buttonClass: "nav-item",
      barName: { show: false },
      buttons: [
        { name: "Edit",   className: "btn btn-sm btn-outline-primary" },
        { name: "Delete", className: "btn btn-sm btn-outline-danger" }
      ]
    }
  },
  null,
  2
);

/* ---------------------- Tag snippet (display only) ---------------------- */
const TAG_SNIPPET = `<AlloyTableAction table={new TableActionObject(tableObject)} output={handleOutput} />`;

/* ---------------------- Page ---------------------- */
export default function TableActionPage() {
  const [inputJson, setInputJson] = useState(DEFAULT_INPUT);
  const [parseError, setParseError] = useState("");
  const [outputJson, setOutputJson] = useState(
    [
      "// Header click → { type: 'column', name, dir }  (ask server for sorted rows).",
      "// Action click → { type: 'action', action, row }",
      "// Row cell click (when `link` present) → { type: 'navigate', to, id, row }"
    ].join("\n")
  );

  const model = useMemo(() => {
    try {
      setParseError("");
      const raw = JSON.parse(inputJson);
      return new TableActionObject(raw);
    } catch (e) {
      setParseError(String(e.message || e));
      // Safe fallback
      return new TableActionObject({
        name: "Invalid JSON",
        className: "table table-striped",
        rows: [],
        actions: {
          type: "AlloyButton",
          className: "nav justify-content-end gap-2",
          buttonClass: "nav-item",
          barName: { show: false },
          buttons: [{ name: "Edit", className: "btn btn-sm btn-outline-primary" }]
        }
      });
    }
  }, [inputJson]);

  function handleOutput(payload) {
    // For demo, show payload.
    // In app:
    //   - { type:'column', name, dir } -> call API, update rows
    //   - { type:'action', action, row } -> perform edit/delete etc.
    //   - { type:'navigate', to, id, row } -> navigate programmatically if desired
    setOutputJson(JSON.stringify(payload, null, 2));
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyTableAction</h3>

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
          <AlloyTableAction table={model} output={handleOutput} />
          <div className="small text-secondary mt-2">
            Server-sorted. Actions render via <code>AlloyButtonBar</code> in the last column.  
            If <code>link</code> is set, each data cell links to <code>{`"${model.link}/{row.id}"`}</code>.
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
                      "// Header click → { type: 'column', name, dir }  (ask server for sorted rows).",
                      "// Action click → { type: 'action', action, row }",
                      "// Row cell click (when `link` present) → { type: 'navigate', to, id, row }"
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
            Columns derive from the first row’s keys (excluding <code>id</code>).  
            The same <code>actions</code> bar instance is used in every row.  
            Set <code>link</code> (e.g. <code>"/users"</code>) to enable row detail links.
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
            Use the payload to trigger server sort, handle row actions, or navigate.
          </div>
        </div>
      </div>
    </div>
  );
}
