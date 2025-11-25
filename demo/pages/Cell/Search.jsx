// demo/pages/tissue/SearchPage.jsx
import React, { useMemo, useState } from "react";

import AlloySearch, {
  SearchObject,
} from "../../../src/components/cell/AlloySearch.jsx";

/* -------------------------------------------------------
 * DEFAULT SEARCH CONFIG
 *
 * Matches the SearchObject schema:
 * {
 *   id?: string,
 *   className?: string,
 *   search: InputConfig
 * }
 *
 * And respects InputObject rules:
 *  - requires `name`
 *  - layout: "icon" requires `icon`
 * ----------------------------------------------------- */
const DEFAULT_SEARCH = {
  id: "emailSearchBar",
  className: "row my-3",
  search: {
    id: "emailSearch",
    name: "emailSearch",
    type: "text",
    layout: "icon",
    icon: { iconClass: "fa-solid fa-magnifying-glass" },
    label: "Search Emails",
    placeholder: "Search by recipient, subject, tags…",
    className: "form-control",
  },
};

export default function SearchPage() {
  // Editable JSON for the SearchObject config
  const [searchJson, setSearchJson] = useState(
    JSON.stringify(DEFAULT_SEARCH, null, 2)
  );

  // Live output from AlloySearch's `output` callback
  const [outputJson, setOutputJson] = useState(
    "// Interact with the search field (type, blur, etc.)"
  );

  // Parse error state
  const [parseError, setParseError] = useState("");

  /**
   * Build SearchObject for preview.
   * If JSON is invalid or InputObject throws (missing name/icon),
   * fall back to DEFAULT_SEARCH so preview never dies.
   */
  const model = useMemo(() => {
    try {
      const raw = JSON.parse(searchJson || "{}");
      const obj = new SearchObject(raw);
      setParseError("");
      return obj;
    } catch (e) {
      setParseError(String(e.message || e));
      return new SearchObject(DEFAULT_SEARCH);
    }
  }, [searchJson]);

  // AlloySearch calls this whenever the inner AlloyInput emits
  function handleOutput(out) {
    const payload =
      out && typeof out.toJSON === "function" ? out.toJSON() : out;

    setOutputJson(JSON.stringify(payload, null, 2));
  }

  // Pretty-print whatever's in the left JSON editor
  function handleFormat() {
    try {
      const parsed = JSON.parse(searchJson);
      setSearchJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parseError already shown
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-4 text-center">AlloySearch (icon search bar)</h3>

      {/* Usage snippet */}
      <div className="row g-3 mb-3">
        <div className="col-12 text-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`const search = new SearchObject(searchConfig);`}
              {"\n"}
              {`<AlloySearch search={search} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live component preview */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <AlloySearch search={model} output={handleOutput} />
          <div className="small text-secondary mt-2 text-center">
            <div>
              The inner <code>search</code> config is an <code>InputObject</code> with{" "}
              <code>layout: "icon"</code>, so it uses a Bootstrap{" "}
              <code>.input-group</code> and shows the icon.
            </div>
            <div>
              <code>InputObject</code> <strong>requires</strong> <code>name</code>, and
              for <code>layout: "icon"</code> it also <strong>requires</strong>{" "}
              <code>icon</code>.
            </div>
            <div>
              <code>className</code> on <code>search</code> goes directly on the{" "}
              {"<input />"}. Default is <code>"form-control"</code>, but you can change
              it in the JSON to e.g.{" "}
              <code>"form-control form-control-lg bg-dark text-white"</code> and see it
              live.
            </div>
          </div>
        </div>
      </div>

      {/* Editor (left) / Output (right) */}
      <div className="row g-3 align-items-stretch">
        {/* LEFT: Search JSON editor */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="fw-semibold mb-0">
              Search JSON (SearchObject config)
            </label>

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
            value={searchJson}
            onChange={(e) => setSearchJson(e.target.value)}
            spellCheck={false}
          />
          {parseError && (
            <div className="invalid-feedback d-block mt-1">
              {parseError}
            </div>
          )}

          <div className="form-text">
            <ul className="mb-0 ps-3">
              <li>
                Root object is a <code>SearchObject</code>:
                <pre className="bg-light border rounded-3 p-2 mt-2 small mb-2">
{`{
  "id": "emailSearchBar",
  "className": "row my-3",
  "search": {
    "id": "emailSearch",
    "name": "emailSearch",
    "type": "text",
    "layout": "icon",
    "icon": { "iconClass": "fa-solid fa-magnifying-glass" },
    "label": "Search Emails",
    "placeholder": "Search by recipient, subject, tags…",
    "className": "form-control"
  }
}`}
                </pre>
              </li>
              <li>
                You can rename <code>search.name</code> (e.g.{" "}
                <code>"emailSearch"</code> → <code>"query"</code>); that becomes the key
                in the output <code>data</code> object.
              </li>
              <li>
                If you remove <code>name</code> or <code>icon</code> while{" "}
                <code>layout</code> is <code>"icon"</code>,{" "}
                <code>InputObject</code> will throw; this demo will fall back to the
                default config and show the error text above.
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
                setOutputJson(
                  "// Interact with the search field (type, blur, etc.)"
                )
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
            <div className="mb-2">
              The callback receives a normalized <code>OutputObject</code>, e.g.:
            </div>
            <pre className="bg-light border rounded-3 p-2 small mb-2">
{`{
  "id": "emailSearchBar",
  "type": "search-bar",
  "action": "search",
  "error": false,
  "data": {
    "emailSearch": "welcome"
  }
}`}
            </pre>
            Use <code>data</code> as your search payload; the key is the{" "}
            <code>name</code> of the inner <code>search</code> field.
          </div>
        </div>
      </div>
    </div>
  );
}
