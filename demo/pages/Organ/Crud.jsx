// pages/Tissue/Crud.jsx
import React, { useMemo, useState } from "react";
import { AlloyCrud, CrudObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------
 * DEFAULT JSON CONFIGS (for AlloyCrud)
 *
 * TAB 1: type = "table"
 * TAB 2: type = "card"
 * ----------------------------------------- */

const DEFAULT_CRUD_TABLE_JSON = JSON.stringify(
  {
    id: "vendorCrudTable",
    className: "container-fluid",

    type: "table",
    documentClass: "col-6 col-md-4 col-lg-3 col-xl-2 mb-3",

    modal: {
      id: "vendorModal",
      title: "Vendor",
      className: "modal fade",
      action: "Create",
      submit: {
        name: "Create",
        className: "btn btn-primary",
        active: "active",
      },
      fields: [
        {
          name: "id",
          label: "Vendor ID",
          type: "hidden",
          layout: "text",
        },
        {
          name: "vendorName",
          label: "Vendor Name",
          type: "text",
          layout: "text",
          placeholder: "Enter vendor name",
          required: true,
          minLength: 3,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          layout: "text",
          placeholder: "name@example.com",
          required: true,
        },
        {
          name: "city",
          label: "City",
          type: "text",
          layout: "text",
          placeholder: "Toronto",
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          layout: "text",
          options: [
            { value: "active", label: "Active" },
            { value: "pending", label: "Pending" },
            { value: "inactive", label: "Inactive" },
          ],
          value: "active",
          required: true,
        },
      ],
      data: {
        id: "",
        vendorName: "",
        email: "",
        city: "",
        status: "active",
      },
    },

    // Toast modal for delete confirmation
    toast: {
      id: "vendorDeleteToast",
      title: "Delete Vendor",
      className: "modal fade",
      action: "deleteVendorConfirmed",
      submit: {
        name: "Delete",
        className: "btn btn-danger",
        active: "active",
      },
      message: "Are you sure you want to delete this vendor? This action cannot be undone.",
    },

    // NOTE: This config is treated as the inner InputObject of SearchObject.
    // CrudObject wraps it as: new SearchObject({ search: <this> })
    search: {
      name: "vendorSearch",
      id: "vendorSearch",
      type: "text",
      layout: "icon",
      icon: { iconClass: "fa-solid fa-magnifying-glass" },
      label: "Search Vendors",
      placeholder: "Search by name, email, city…",
      className: "form-control",
    },

    add: {
      id: "addVendorButton",
      name: "Add vendor",
      icon: { iconClass: "fa-solid fa-plus" },
      className: "btn btn-primary",
      title: "Add Vendor",
      ariaLabel: "Add Vendor",
    },

    // DOCUMENT (table variant)
    document: {
      id: "vendorTable",
      className: "table table-striped align-middle",
      name: "Vendors",
      link: "/vendors",
      icon: { iconClass: "fa-solid fa-industry" },
      sort: { iconClass: "fa-solid fa-arrow-down-short-wide" },
      rows: [
        {
          id: "v001",
          vendorName: "Alpha Precast Ltd.",
          email: "info@alphaprecast.com",
          city: "Toronto",
          status: "active",
        },
        {
          id: "v002",
          vendorName: "Beta Concrete Inc.",
          email: "contact@betaconcrete.com",
          city: "Hamilton",
          status: "pending",
        },
      ],
      actions: {
        id: "vendorRowActions",
        className: "btn-group btn-group-sm",
        name: "Row Actions",
        buttons: [
          {
            id: "editVendorBtn",
            name: "Edit",
            icon: { iconClass: "fa-solid fa-pen" },
            className: "btn btn-outline-primary",
            title: "Edit vendor",
            ariaLabel: "Edit vendor",
          },
          {
            id: "deleteVendorBtn",
            name: "Delete",
            icon: { iconClass: "fa-solid fa-trash" },
            className: "btn btn-outline-danger",
            title: "Delete vendor",
            ariaLabel: "Delete vendor",
          },
        ],
      },
    },

    // PAGINATION
    page: {
      id: "vendorPageTable",
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
      number: 0, // current page index (0-based)
      first: true,
      empty: false,
    },
  },
  null,
  2
);

const DEFAULT_CRUD_CARD_JSON = JSON.stringify(
  {
    id: "vendorCrudCard",
    className: "container-fluid",

    type: "card",
    // each card column:
    documentClass: "col-sm-6 col-md-4 col-lg-3 mb-3",

    modal: {
      id: "vendorCardModal",
      title: "Vendor",
      className: "modal fade",
      action: "Create",
      submit: {
        name: "Create",
        className: "btn btn-primary",
        active: "active",
      },
      fields: [
        {
          name: "id",
          label: "Vendor ID",
          type: "hidden",
          layout: "text",
        },
        {
          name: "vendorName",
          label: "Vendor Name",
          type: "text",
          layout: "text",
          placeholder: "Enter vendor name",
          required: true,
          minLength: 3,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          layout: "text",
          placeholder: "name@example.com",
          required: true,
        },
        {
          name: "city",
          label: "City",
          type: "text",
          layout: "text",
          placeholder: "Toronto",
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          layout: "text",
          options: [
            { value: "active", label: "Active" },
            { value: "pending", label: "Pending" },
            { value: "inactive", label: "Inactive" },
          ],
          value: "active",
          required: true,
        },
      ],
      data: {
        id: "",
        vendorName: "",
        email: "",
        city: "",
        status: "active",
      },
    },

    // Toast modal for delete confirmation (cards)
    toast: {
      id: "vendorCardDeleteToast",
      title: "Delete Vendor",
      className: "modal fade",
      action: "deleteVendorConfirmed",
      submit: {
        name: "Delete",
        className: "btn btn-danger",
        active: "active",
      },
      message: "Are you sure you want to delete this vendor card? This action cannot be undone.",
    },

    // Search bar (same pattern)
    search: {
      name: "vendorSearchCard",
      id: "vendorSearchCard",
      type: "text",
      layout: "icon",
      icon: { iconClass: "fa-solid fa-magnifying-glass" },
      label: "Search Vendors",
      placeholder: "Search by name, email, city…",
      className: "form-control",
    },

    // Add button
    add: {
      id: "addVendorCardButton",
      name: "Add vendor",
      icon: { iconClass: "fa-solid fa-plus" },
      className: "btn btn-primary",
      title: "Add Vendor",
      ariaLabel: "Add Vendor",
    },

    // DOCUMENT (card variant) → array of CardActionConfig
    // IMPORTANT: card objects must carry values keyed by modal field names.
    // Here we do that using fields[].id = modal field name (id/vendorName/email/city/status)
    // and fields[].name = the display/value.
    document: [
      {
        id: "v001",
        className: "card border shadow-sm h-100",
        link: "",
        header: {
          name: "Alpha Precast Ltd.",
          className: "card-header fw-bold",
        },
        body: {
          name: "Toronto • Active",
          className: "card-body pb-2",
        },
        fields: [
          { name: "v001", className: "d-none", tag: "div", id: "id" },
          { name: "Alpha Precast Ltd.", className: "d-none", tag: "div", id: "vendorName" },
          { name: "active", className: "d-none", tag: "div", id: "status" },

          {
            name: "info@alphaprecast.com",
            className: "small text-muted",
            tag: "div",
            id: "email",
          },
          {
            name: "Toronto",
            className: "small",
            tag: "div",
            id: "city",
          },
        ],
        footer: {
          name: "",
          className: "card-footer bg-transparent border-0 pt-0",
        },
        type: "AlloyButtonBar",
        action: {
          type: "AlloyButtonIcon",
          className: "nav justify-content-end gap-2",
          buttonClass: "nav-item",
          selected: "active",
          buttons: [
            {
              id: "editVendorCardBtn1",
              name: "Edit",
              icon: { iconClass: "fa-solid fa-pen" },
              className: "btn btn-outline-primary btn-sm",
            },
            {
              id: "deleteVendorCardBtn1",
              name: "Delete",
              icon: { iconClass: "fa-solid fa-trash" },
              className: "btn btn-outline-danger btn-sm",
            },
          ],
        },
      },
      {
        id: "v002",
        className: "card border shadow-sm h-100",
        link: "",
        header: {
          name: "Beta Concrete Inc.",
          className: "card-header fw-bold",
        },
        body: {
          name: "Hamilton • Pending",
          className: "card-body pb-2",
        },
        fields: [
          { name: "v002", className: "d-none", tag: "div", id: "id" },
          { name: "Beta Concrete Inc.", className: "d-none", tag: "div", id: "vendorName" },
          { name: "pending", className: "d-none", tag: "div", id: "status" },

          {
            name: "contact@betaconcrete.com",
            className: "small text-muted",
            tag: "div",
            id: "email",
          },
          {
            name: "Hamilton",
            className: "small",
            tag: "div",
            id: "city",
          },
        ],
        footer: {
          name: "",
          className: "card-footer bg-transparent border-0 pt-0",
        },
        type: "AlloyButtonBar",
        action: {
          type: "AlloyButtonIcon",
          className: "nav justify-content-end gap-2",
          buttonClass: "nav-item",
          selected: "active",
          buttons: [
            {
              id: "editVendorCardBtn2",
              name: "Edit",
              icon: { iconClass: "fa-solid fa-pen" },
              className: "btn btn-outline-primary btn-sm",
            },
            {
              id: "deleteVendorCardBtn2",
              name: "Delete",
              icon: { iconClass: "fa-solid fa-trash" },
              className: "btn btn-outline-danger btn-sm",
            },
          ],
        },
      },
    ],

    // PAGINATION
    page: {
      id: "vendorPageCard",
      name: "Vendors (cards)",
      className: "d-flex justify-content-end align-items-center mt-3",
      listClassName: "pagination justify-content-end mb-0",
      itemClassName: "page-item",
      activeClassName: "active",
      disabledClassName: "disabled",

      totalPages: 5,
      totalElements: 200,
      last: false,
      numberOfElements: 12,
      size: 12,
      number: 0,
      first: true,
      empty: false,
    },
  },
  null,
  2
);

/* -------------------------------------------
 * Shared Section component (per tab)
 * ----------------------------------------- */

function CrudSection({
  label,
  jsonState,
  setJsonState,
  outputJson,
  setOutputJson,
  defaultJson,
}) {
  const [parseError, setParseError] = useState("");

  const crudModel = useMemo(() => {
    try {
      const raw = JSON.parse(jsonState || "{}");
      const model = new CrudObject(raw);
      setParseError("");
      return model;
    } catch (e) {
      setParseError(String(e.message || e));
      // Safe fallback
      return new CrudObject({
        className: "container-fluid",
        type: label === "Table" ? "table" : "card",
        documentClass: label === "Table" ? "col-12" : "col-6 col-md-4 col-lg-3 col-xl-2 mb-3",
        modal: {
          title: `Invalid JSON (${label})`,
          action: "",
          submit: {
            name: "Submit (disabled)",
            className: "btn btn-secondary",
            disabled: true,
          },
          fields: [],
        },
        search: {
          name: "search",
          label: "Search (JSON invalid)",
          type: "text",
          layout: "text",
          placeholder: "Fix JSON on the left to preview real CRUD…",
        },
        add: {
          name: "Add (disabled)",
          icon: { iconClass: "fa-solid fa-plus" },
          className: "btn btn-secondary",
          disabled: true,
        },
        document:
          label === "Table"
            ? { name: "Table", rows: [] }
            : [
                {
                  id: "cardFallback",
                  className: "card border shadow-sm",
                  header: { name: "Invalid", className: "card-header" },
                  body: { name: "Fix JSON to see cards", className: "card-body" },
                  fields: [
                    {
                      name: "info",
                      className: "small text-muted",
                      tag: "div",
                      id: "cardFallback-info",
                    },
                  ],
                  footer: { name: "", className: "card-footer" },
                  type: "AlloyButtonBar",
                  action: {
                    type: "AlloyButtonIcon",
                    buttons: [],
                  },
                },
              ],
        page: {
          id: `fallbackPage-${label.toLowerCase()}`,
          totalPages: 1,
          totalElements: 0,
          last: true,
          numberOfElements: 0,
          size: 50,
          number: 0,
          first: true,
          empty: true,
        },
      });
    }
  }, [jsonState, label]);

  function handleCrudOutput(out) {
    const payload =
      out instanceof OutputObject && typeof out.toJSON === "function"
        ? out.toJSON()
        : out;
    setOutputJson(JSON.stringify(payload, null, 2));
  }

  function resetCrud() {
    setJsonState(defaultJson);
    setOutputJson(
      "// Interact with search, Add, document and pagination to see OutputObject here…"
    );
    setParseError("");
  }

  function formatCrud() {
    try {
      const parsed = JSON.parse(jsonState);
      setJsonState(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error already shown
    }
  }

  function usageSnippet() {
    return `<AlloyCrud crud={new CrudObject(crudObject)} output={handleOutput} />`;
  }

  return (
    <div className="card p-3 mb-4">
      <h5 className="mb-3 text-center">{`AlloyCrud — ${label} view`}</h5>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{usageSnippet()}</code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyCrud crud={crudModel} output={handleCrudOutput} />

          <div className="small text-secondary mt-2 text-center">
            <strong>Search</strong> uses <code>AlloySearch</code> with debounced
            input and emits <code>type="crud"</code>,{" "}
            <code>action="search"</code> or <code>"search-select"</code>.
            <br />
            <strong>Add</strong> and <strong>Edit</strong> use the shared form
            modal; <strong>Delete</strong> can use the toast confirmation modal
            (when <code>toast</code> is configured).
            <br />
            <strong>Pagination</strong> emits{" "}
            <code>action="page"</code> with <code>nav</code>,{" "}
            <code>pageNumber</code> and <code>size</code>, so you can reload
            from the server.
          </div>
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              {label} Crud Input JSON (editable)
            </span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={resetCrud}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={formatCrud}
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
              parseError ? "is-invalid" : ""
            }`}
            rows={22}
            value={jsonState}
            onChange={(e) => setJsonState(e.target.value)}
            spellCheck={false}
          />
          {parseError && (
            <div className="invalid-feedback d-block mt-1">{parseError}</div>
          )}

          <div className="form-text">
            Required pieces:
            <ul className="mb-0 ps-3">
              <li>
                <code>type</code>: <code>"table"</code> or{" "}
                <code>"card"</code>.
              </li>
              <li>
                <code>modal.submit.name</code>,{" "}
                <code>modal.fields[].name</code>.
              </li>
              <li>
                <code>search.name</code> for <code>AlloySearch</code>.
              </li>
              <li>
                For <code>table</code>, <code>document.rows[].id</code> and row
                keys that match <code>modal.fields[].name</code>.
              </li>
              <li>
                For <code>card</code>, ensure each card carries values keyed by
                <code>modal.fields[].name</code> (commonly via{" "}
                <code>fields[].id</code> matching the modal field name, and{" "}
                <code>fields[].name</code> holding the value).
              </li>
              <li>
                Optional <code>toast</code> for delete confirmation using{" "}
                <code>AlloyModalToast</code>.
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
              onClick={() => setOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={outputJson}
            onChange={(e) => setOutputJson(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            Typical events:
            <ul className="mb-0 ps-3">
              <li>
                Search:
                <pre className="mb-0 mt-1 small">
{`{
  "id": "...",
  "type": "crud",
  "action": "search",
  "error": false,
  "data": {
    "vendorSearch": "alpha"
  }
}`}
                </pre>
              </li>
              <li className="mt-2">
                Sort:
                <pre className="mb-0 mt-1 small">
{`{
  "id": "...",
  "type": "crud",
  "action": "Sort",
  "error": false,
  "data": {
    "email": "asc"
  }
}`}
                </pre>
              </li>
              <li className="mt-2">
                Create vendor:
                <pre className="mb-0 mt-1 small">
{`{
  "id": "...",
  "type": "crud",
  "action": "Create",
  "error": false,
  "data": {
    "id": "",
    "vendorName": "New Vendor Inc.",
    "email": "new@vendor.com",
    "city": "Toronto",
    "status": "active"
  }
}`}
                </pre>
              </li>
              <li className="mt-2">
                Delete vendor (via toast confirm):
                <pre className="mb-0 mt-1 small">
{`{
  "id": "...",
  "type": "crud",
  "action": "Delete",
  "error": false,
  "data": {
    "id": "v001"
  }
}`}
                </pre>
              </li>
              <li className="mt-2">
                Page navigation:
                <pre className="mb-0 mt-1 small">
{`{
  "id": "...",
  "type": "crud",
  "action": "page",
  "error": false,
  "data": {
    "nav": "next",
    "pageNumber": 1,
    "size": 50,
    "totalPages": 10,
    "totalElements": 480,
    "first": false,
    "last": false
  }
}`}
                </pre>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------
 * Page with two tabs: Table / Card
 * ----------------------------------------- */

export default function CrudPage() {
  const [activeTab, setActiveTab] = useState("Table");

  const [jsonTable, setJsonTable] = useState(DEFAULT_CRUD_TABLE_JSON);
  const [jsonCard, setJsonCard] = useState(DEFAULT_CRUD_CARD_JSON);

  const [outputTable, setOutputTable] = useState(
    "// Interact with the TABLE view to see events here…"
  );
  const [outputCard, setOutputCard] = useState(
    "// Interact with the CARD view to see events here…"
  );

  return (
    <div className="container py-4">
      <h3 className="text-center mb-3">AlloyCrud</h3>

      {/* Tabs */}
      <ul className="nav nav-tabs justify-content-center mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "Table" ? "active" : ""}`}
            onClick={() => setActiveTab("Table")}
          >
            Table
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "Card" ? "active" : ""}`}
            onClick={() => setActiveTab("Card")}
          >
            Card
          </button>
        </li>
      </ul>

      {/* Panels */}
      {activeTab === "Table" && (
        <CrudSection
          label="Table"
          jsonState={jsonTable}
          setJsonState={setJsonTable}
          outputJson={outputTable}
          setOutputJson={setOutputTable}
          defaultJson={DEFAULT_CRUD_TABLE_JSON}
        />
      )}

      {activeTab === "Card" && (
        <CrudSection
          label="Card"
          jsonState={jsonCard}
          setJsonState={setJsonCard}
          outputJson={outputCard}
          setOutputJson={setOutputCard}
          defaultJson={DEFAULT_CRUD_CARD_JSON}
        />
      )}
    </div>
  );
}
