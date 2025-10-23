import React, { useMemo, useState } from "react";
import { AlloyTable, TableObject } from "../../../src";

/* ---------------------- Default editable JSON ---------------------- */
const DEFAULT_INPUT = JSON.stringify(
  {
    id: "userTable01",
    name: "Users",
    className: "table table-hover align-middle",
    // icon and sort have sensible defaults:
    //   icon:  fa-solid fa-user
    //   sort:  fa-solid fa-arrow-down
    rows: [
      { id: 1, name: "Ada Lovelace",  role: "Admin",  joined: "2023-12-01" },
      { id: 2, name: "Linus Torvalds", role: "User",  joined: "2024-04-15" },
      { id: 3, name: "Margaret Hamilton", role: "Owner", joined: "2022-07-22" }
    ]
  },
  null,
  2
);

/* ---------------------- Tag snippet (display only) ---------------------- */
const TAG_SNIPPET = `<AlloyTable table={new TableObject(tableObject)} output={handleOutput} />`;

/* ---------------------- Page ---------------------- */
export default function TablePage() {
  const [inputJson, setInputJson] = useState(DEFAULT_INPUT);
  const [parseError, setParseError] = useState("");
  const [outputJson, setOutputJson] = useState(
    "// Click a header to emit { type: 'column', name, dir }.\n// Click a row to emit { type: 'row', id }."
  );

  const model = useMemo(() => {
    try {
      setParseError("");
      const raw = JSON.parse(inputJson);
      return new TableObject(raw);
    } catch (e) {
      setParseError(String(e.message || e));
      // Safe fallback
      return new TableObject({
        name: "Invalid JSON",
        className: "table table-striped",
        rows: []
      });
    }
  }, [inputJson]);

  function handleOutput(payload) {
    // You’ll call your API from the parent using this payload to fetch server-sorted rows.
    // We just log it to the right-hand box.
    setOutputJson(JSON.stringify(payload, null, 2));
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyTable</h3>

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
          <AlloyTable table={model} output={handleOutput} />
          <div className="small text-secondary mt-2">
            Sorting is server-driven: clicking a header only emits the intent (no client sorting).
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
                    "// Click a header to emit { type: 'column', name, dir }.\n// Click a row to emit { type: 'row', id }."
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
            Rows define the columns by the <em>first row’s</em> keys (excluding <code>id</code>).  
            Icons default to <code>fa-solid fa-user</code> (type column) and <code>fa-solid fa-arrow-down</code> (sort).
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
            Use the emitted payload to request server sorting and re-supply <code>rows</code>.
          </div>
        </div>
      </div>
    </div>
  );
}
