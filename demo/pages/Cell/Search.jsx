// demo/pages/Cell/Search.jsx
import React, { useMemo, useEffect, useState } from "react";
// Prefer re-export from src/index if you have it:
import AlloySearch, { SearchObject } from "../../../src/components/cell/AlloySearch.jsx";

/* -------------------------------------------------------
 * Mock dataset (pretend this is your server)
 * ----------------------------------------------------- */
const MOCK_EMAILS = [
  {
    id: "e001",
    to: "alpha@precastxchange.com",
    subject: "Welcome to PrecastXchange",
    status: "Sent",
    tags: "welcome,onboarding"
  },
  {
    id: "e002",
    to: "beta@precastxchange.com",
    subject: "Password reset instructions",
    status: "Queued",
    tags: "security,reset"
  },
  {
    id: "e003",
    to: "gamma@precastxchange.com",
    subject: "Your invoice #401",
    status: "Failed",
    tags: "invoice,billing"
  }
];

/* -------------------------------------------------------
 * Default Search config (for the left JSON editor)
 *
 * NOTE (SSR-safe IDs):
 * - SearchObject should NOT auto-generate `id`.
 * - If you omit root `id`, AlloySearch generates a stable SSR/CSR id internally.
 * - For the nested Input config, you can omit `search.id` as well; AlloyInput
 *   will generate a stable SSR/CSR id internally.
 * ----------------------------------------------------- */
const DEFAULT_SEARCH_CONFIG = {
  // Optional: keep for predictable demos/tests. You can delete it and it still works.
  id: "emailSearchBar",

  className: "row my-3",

  search: {
    // Optional: you can omit this too (AlloyInput generates SSR-safe id)
    id: "emailSearch",
    name: "emailSearch",
    type: "text",
    layout: "icon",
    icon: { iconClass: "fa-solid fa-magnifying-glass", className: "" },
    label: "Search Emails",
    placeholder: "Search by recipient, subject, tags…",
    className: "form-control",
    // styles the <span> that wraps the icon (merged with "input-group-text")
    iconGroupClass: "bg-light border-0"
  },

  minChars: 2,
  debounceMs: 400,

  resultConfig: {
    idKey: "id",
    labelKey: "subject",
    descriptionKey: "to"
    // iconKey: "iconClass" // if your results have a status icon
  }
};

export default function SearchPage() {
  // LEFT: editable JSON for SearchObject config (WITHOUT results)
  const [searchJson, setSearchJson] = useState(
    JSON.stringify(DEFAULT_SEARCH_CONFIG, null, 2)
  );

  // RIGHT: Output from AlloySearch
  const [outputJson, setOutputJson] = useState(
    "// Type in the search box, wait for debounce, click a result...\n"
  );

  // parse error for the left JSON editor
  const [parseError, setParseError] = useState("");

  // Results injected into SearchObject (simulating server response)
  const [results, setResults] = useState([]);
  const [lastQuery, setLastQuery] = useState("");

  /**
   * Parse JSON safely (no setState inside useMemo).
   */
  const { baseConfig, parseErr } = useMemo(() => {
    try {
      const obj = JSON.parse(searchJson || "{}");
      return { baseConfig: obj, parseErr: "" };
    } catch (e) {
      return {
        baseConfig: DEFAULT_SEARCH_CONFIG,
        parseErr: String(e?.message || e)
      };
    }
  }, [searchJson]);

  useEffect(() => {
    setParseError(parseErr);
  }, [parseErr]);

  /**
   * Build SearchObject from JSON + current results.
   * If SearchObject construction fails, fall back to defaults.
   */
  const searchModel = useMemo(() => {
    try {
      return new SearchObject({
        ...baseConfig,
        results
      });
    } catch (e) {
      setParseError(String(e?.message || e));
      return new SearchObject({
        ...DEFAULT_SEARCH_CONFIG,
        results
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseConfig, results]);

  // Handle output from AlloySearch (debounced "search" + "select")
  function handleOutput(out) {
    const payload = out && typeof out.toJSON === "function" ? out.toJSON() : out;

    // Show raw payload in the right-hand textarea
    setOutputJson(JSON.stringify(payload, null, 2));

    if (!payload) return;

    const { type, action, data } = payload;
    if (type !== "search-bar") return;

    // Debounced query -> pretend to call server
    if (action === "search") {
      // data: { [fieldName]: "query" }
      const value = data ? Object.values(data)[0] : "";
      const query = String(value ?? "").toLowerCase().trim();

      setLastQuery(query);

      // In real app: call your backend here
      // For demo, filter MOCK_EMAILS
      if (!query || query.length < 2) {
        setResults([]);
        return;
      }

      const filtered = MOCK_EMAILS.filter((email) => {
        const haystack = [email.to, email.subject, email.tags, email.status]
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      });

      setResults(filtered);
      return;
    }

    // Clear event (input below minChars or empty)
    if (action === "clear") {
      setLastQuery("");
      setResults([]);
      return;
    }

    // Result selected (user clicked a row)
    if (action === "select") {
      const result = data?.result;
      console.log("Selected search result:", result);
    }
  }

  // Pretty-print the JSON in the left editor
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
      <h3 className="mb-4 text-center">AlloySearch</h3>

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

      {/* Live search bar + results preview */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <AlloySearch search={searchModel} output={handleOutput} />

          <div className="small text-secondary mt-2 text-center">
            <div>
              Debounce is handled <strong>inside</strong> AlloySearch using{" "}
              <code>minChars</code> and <code>debounceMs</code> from the JSON.
            </div>
            <div>
              When the debounced query fires, it emits{" "}
              <code>action: "search"</code>. This demo filters a mock email list
              and injects results via <code>SearchObject.results</code>.
            </div>
            <div>
              Clearing the input (or typing below <code>minChars</code>) emits{" "}
              <code>action: "clear"</code>, and the demo clears results.
            </div>
            <div>
              Clicking a result emits <code>action: "select"</code> and returns
              the <strong>raw result</strong> in <code>data.result</code>.
            </div>
            <div className="mt-1">
              Last query: <code>{lastQuery || "(none yet)"}</code> — Results:{" "}
              {results.length}
            </div>
            <div className="mt-1">
              Tip: Remove <code>id</code> at the root or inside{" "}
              <code>search</code> in the JSON — IDs remain stable because the
              components generate SSR-safe DOM ids internally.
            </div>
          </div>
        </div>
      </div>

      {/* JSON editor (left) and callback output (right) */}
      <div className="row g-3 align-items-stretch">
        {/* LEFT: Search JSON editor */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="fw-semibold mb-0">
              Search JSON (SearchObject config, editable)
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
            <div className="invalid-feedback d-block mt-1">{parseError}</div>
          )}

          <div className="form-text">
            <ul className="mb-0 ps-3">
              <li>
                Root shape is a <code>SearchObject</code>.
              </li>
              <li>
                <code>search</code> is passed into <code>new InputObject</code>,
                so it must follow the Input schema (requires <code>name</code>;
                <code>layout: "icon"</code> requires <code>icon</code>).
              </li>
              <li>
                For <code>layout: "icon"</code>, <code>iconGroupClass</code>{" "}
                customizes the span wrapping the icon (appended to{" "}
                <code>"input-group-text"</code>).
              </li>
              <li>
                SSR note: You may omit <code>id</code> fields — the components
                generate stable ids internally using <code>useId()</code>.
              </li>
              <li>
                <strong>Do not</strong> add <code>results</code> into this JSON;
                they are injected via code after the server call.
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT: Output payload from AlloySearch */}
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
                  "// Type in the search box, wait for debounce, click a result...\n"
                )
              }
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace bg-light border"
            rows={18}
            value={outputJson || "// no interaction yet"}
            readOnly
            spellCheck={false}
          />

          <div className="form-text">
            AlloySearch emits normalized <code>OutputObject</code> payloads:
            <pre className="bg-light border rounded-3 p-2 mt-2 small mb-2">
{`// Debounced query:
{
  "id": "search-<stable>",
  "type": "search-bar",
  "action": "search",
  "error": false,
  "data": { "emailSearch": "welcome" }
}

// Clear:
{
  "id": "search-<stable>",
  "type": "search-bar",
  "action": "clear",
  "error": false,
  "data": { "emailSearch": "" }
}

// Result row clicked:
{
  "id": "search-<stable>",
  "type": "search-bar",
  "action": "select",
  "error": false,
  "data": {
    "emailSearch": "welcome",
    "result": { "...raw object..." }
  }
}`}
            </pre>
            Listen for <code>"search"</code> to call your API and feed results
            back into <code>SearchObject.results</code>; listen for{" "}
            <code>"select"</code> to handle the chosen item.
          </div>
        </div>
      </div>
    </div>
  );
}
