// demo/pages/tissue/Pagignation.jsx
import React, { useMemo, useState } from "react";
import { AlloyPagination, PaginationObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------
 * DEFAULT PAGIGNATION JSON (editable)
 *
 * This mimics a typical Spring Data page response:
 * {
 *   "totalPages": 10,
 *   "totalElements": 480,
 *   "last": false,
 *   "numberOfElements": 50,
 *   "size": 50,
 *   "number": 0,
 *   "first": true,
 *   "empty": false
 * }
 *
 * Plus optional styling fields:
 *   - name?: string
 *   - className?: string
 *   - listClassName?: string
 *   - itemClassName?: string
 *   - activeClassName?: string
 *   - disabledClassName?: string
 * ----------------------------------------- */

const DEFAULT_PAGIGNATION_JSON = JSON.stringify(
  {
    id: "vendorPagignation",
    name: "Vendors",
    className: "d-flex justify-content-end align-items-center mt-3",
    listClassName: "pagination justify-content-end mb-0",
    itemClassName: "page-item",
    activeClassName: "active",
    disabledClassName: "disabled",

    totalPages: 10,
    totalElements: 480,
    last: false,
    numberOfElements: 50,
    size: 50,
    number: 0,
    first: true,
    empty: false
  },
  null,
  2
);

/* -------------------------------------------
 * Demo Page
 * ----------------------------------------- */

export default function PagignationPage() {
  const [paginationJson, setPagignationJson] = useState(
    DEFAULT_PAGIGNATION_JSON
  );
  const [paginationParseError, setPagignationParseError] = useState("");
  const [paginationOutputJson, setPagignationOutputJson] = useState(
    "// Click First / Previous / numbered pages / Next / Last to see OutputObject here…"
  );

  /* -------------------------------------------
   * Build PaginationObject from JSON
   * ----------------------------------------- */
  const paginationModel = useMemo(() => {
    try {
      const raw = JSON.parse(paginationJson || "{}");
      const model = new PaginationObject(raw);
      setPagignationParseError("");
      return model;
    } catch (e) {
      setPagignationParseError(String(e.message || e));

      // Safe fallback
      return new PaginationObject({
        name: "Fallback",
        totalPages: 1,
        totalElements: 0,
        last: true,
        numberOfElements: 0,
        size: 50,
        number: 0,
        first: true,
        empty: true
      });
    }
  }, [paginationJson]);

  /* -------------------------------------------
   * Global output handler
   * ----------------------------------------- */

  function handlePagignationOutput(out) {
    const payload =
      out instanceof OutputObject && typeof out.toJSON === "function"
        ? out.toJSON()
        : out;

    setPagignationOutputJson(JSON.stringify(payload, null, 2));
  }

  /* -------------------------------------------
   * Helpers for reset / format / clear
   * ----------------------------------------- */

  function resetPagignation() {
    setPagignationJson(DEFAULT_PAGIGNATION_JSON);
    setPagignationOutputJson(
      "// Click First / Previous / numbered pages / Next / Last to see OutputObject here…"
    );
    setPagignationParseError("");
  }

  function formatPagignation() {
    try {
      const parsed = JSON.parse(paginationJson);
      setPagignationJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error already shown
    }
  }

  /* -------------------------------------------
   * RENDER
   * ----------------------------------------- */

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyPagination</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyPagination pagination={new PaginationObject(paginationJson)} output={handlePagignationOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyPagination
            pagination={paginationModel}
            output={handlePagignationOutput}
          />

          <div className="small text-secondary mt-2 text-center">
            <strong>AlloyPagination</strong> renders{" "}
            <code>First</code>, <code>Previous</code>, a window of page
            numbers with ellipses, then <code>Next</code> and{" "}
            <code>Last</code>. It uses{" "}
            <code>AlloyButtonIcon</code> for all controls.
            <br />
            Every click emits an <code>OutputObject</code> with{" "}
            <code>type="pagination"</code>, <code>action="page"</code>, and{" "}
            <code>data</code> containing{" "}
            <code>nav</code> (<code>"first"</code>, <code>"prev"</code>,{" "}
            <code>"page"</code>, <code>"next"</code>,{" "}
            <code>"last"</code>), the target{" "}
            <code>pageNumber</code> (0-based), <code>size</code>,{" "}
            <code>totalPages</code>, <code>totalElements</code>, and the
            original button event in <code>data.button</code>.
          </div>
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Pagignation Input JSON (editable)
            </span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={resetPagignation}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={formatPagignation}
                title="Format JSON"
              >
                <i
                  className="fa-solid fa-wand-magic-sparkles me-2"
                  aria-hidden="true"
                />
                Format
              </button>
            </div>
          </div>

          <textarea
            className={`form-control font-monospace ${
              paginationParseError ? "is-invalid" : ""
            }`}
            rows={22}
            value={paginationJson}
            onChange={(e) => setPagignationJson(e.target.value)}
            spellCheck={false}
          />
          {paginationParseError && (
            <div className="invalid-feedback d-block mt-1">
              {paginationParseError}
            </div>
          )}

          <div className="form-text">
            Required server fields:
            <ul className="mb-0 ps-3">
              <li>
                <code>totalPages</code>, <code>totalElements</code>,{" "}
                <code>numberOfElements</code>, <code>size</code>,{" "}
                <code>number</code> (current page, 0-based),{" "}
                <code>first</code>, <code>last</code>, <code>empty</code>.
              </li>
              <li>
                Optional styling: <code>name</code>,{" "}
                <code>className</code>, <code>listClassName</code>,{" "}
                <code>itemClassName</code>,{" "}
                <code>activeClassName</code>,{" "}
                <code>disabledClassName</code>.
              </li>
            </ul>
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
              onClick={() => setPagignationOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={paginationOutputJson}
            onChange={(e) => setPagignationOutputJson(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            Example (click <code>Next</code> from page 1 of 10):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "vendorPagignation",
  "type": "pagination",
  "action": "page",
  "error": false,
  "data": {
    "nav": "next",
    "pageNumber": 1,
    "size": 50,
    "totalPages": 10,
    "totalElements": 480,
    "first": false,
    "last": false,
    "button": {
      "id": "pg-btn-...",
      "type": "button",
      "action": "click",
      "error": false,
      "data": {
        "id": "pg-btn-...",
        "name": "Next",
        "className": "page-link",
        "ariaLabel": "Go to next page"
      }
    }
  }
}`}
            </pre>
            You can call your API with{" "}
            <code>data.pageNumber</code> and <code>data.size</code> to
            fetch the correct page, and still inspect{" "}
            <code>data.button</code> if you need the raw button event.
          </div>
        </div>
      </div>
    </div>
  );
}
