// pages/Tissue/CrudForm.jsx
import React, { useMemo, useState } from "react";
import { AlloyCrudForm, CrudFormObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------
 * DEFAULT JSON CONFIG (AlloyCrudForm)
 *
 * Layout:
 *  - Top: Search (AlloySearch) + Add vendor button
 *  - List: Vendors table (AlloyTableAction) + Pagination (AlloyPagination)
 *  - Form: Multi-step TabForm (AlloyTabForm) for Create/Edit/Delete
 * ----------------------------------------- */

const DEFAULT_CRUD_FORM_JSON = JSON.stringify(
  {
    id: "vendorCrudForm",
    name: "Vendor",
    className: "container-fluid",

    // Wrapper for the whole document area (table or cards)
    documentClass: "col-12",

    // List type → use "table" for this demo
    type: "table",

    // NOTE: Search config is the INNER InputObject config.
    // CrudFormObject wraps it as: new SearchObject({ search: <this> })
    search: {
      name: "vendorSearch",
      id: "vendorSearch",
      type: "text",
      layout: "icon",
      icon: { iconClass: "fa-solid fa-magnifying-glass" },
      label: "Search Vendors",
      placeholder: "Search by name, email, city…",
      className: "form-control"
    },

    // Add button
    add: {
      id: "addVendorButton",
      name: "Add vendor",
      icon: { iconClass: "fa-solid fa-plus" },
      className: "btn btn-primary",
      title: "Add Vendor",
      ariaLabel: "Add Vendor"
    },

    // DOCUMENT (table variant)
    // This object will be hydrated into a TableActionObject
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
          status: "Active"
        },
        {
          id: "v002",
          vendorName: "Beta Concrete Inc.",
          email: "contact@betaconcrete.com",
          city: "Hamilton",
          status: "Pending"
        }
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
            ariaLabel: "Edit vendor"
          },
          {
            id: "deleteVendorBtn",
            name: "Delete",
            icon: { iconClass: "fa-solid fa-trash" },
            className: "btn btn-outline-danger",
            title: "Delete vendor",
            ariaLabel: "Delete vendor"
          }
        ]
      }
    },

    // PAGINATION (AlloyPagination config)
    pagination: {
      id: "vendorCrudPagination",
      name: "Vendors",
      className: "d-flex justify-content-end align-items-center mt-3",
      listClassName: "pagination justify-content-end mb-0",
      itemClassName: "page-item",
      activeClassName: "active",
      disabledClassName: "disabled",

      // Server-side page info (Spring-style)
      totalPages: 10,
      totalElements: 480,
      last: false,
      numberOfElements: 50,
      size: 50,
      number: 0,   // current page index (0-based)
      first: true,
      empty: false
    },

    /* ---------------------------------------
     * FORM (AlloyTabForm config)
     *
     * This is plain TabFormObject config.
     * CrudFormObject will hydrate it to TabFormObject.
     * ------------------------------------- */
    form: {
      id: "vendorTabForm",
      name: "Vendor Registration",
      status: "draft",
      currentIndex: 0,
      navButtons: {
        previous: {
          name: "Previous",
          icon: { iconClass: "fa-solid fa-arrow-left" },
          className: "btn btn-outline-secondary"
        },
        next: {
          name: "Next",
          icon: { iconClass: "fa-solid fa-arrow-right" },
          className: "btn btn-primary"
        },
        finish: {
          name: "Finish",
          icon: { iconClass: "fa-solid fa-paper-plane" },
          className: "btn btn-success"
        }
      },
      tabs: [
        {
          id: "vendorStep1",
          key: "basic",
          order: 1,
          title: "Basic Details",
          subtitle: "Who is this vendor?",
          icon: { iconClass: "fa-solid fa-address-card" },
          inputs: [
            {
              name: "vendorName",
              label: "Vendor Name",
              type: "text",
              layout: "text",
              placeholder: "Enter vendor name",
              required: true,
              minLength: 3
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              layout: "text",
              placeholder: "name@example.com",
              required: true
            }
          ]
        },
        {
          id: "vendorStep2",
          key: "location",
          order: 2,
          title: "Location & Status",
          subtitle: "Where are they based and what is their status?",
          icon: { iconClass: "fa-solid fa-location-dot" },
          inputs: [
            {
              name: "city",
              label: "City",
              type: "text",
              layout: "text",
              placeholder: "Toronto"
            },
            {
              name: "status",
              label: "Status",
              type: "select",
              layout: "text",
              options: [
                { value: "active", label: "Active" },
                { value: "pending", label: "Pending" },
                { value: "inactive", label: "Inactive" }
              ],
              value: "active",
              required: true
            }
          ]
        },
        {
          id: "vendorStep3",
          key: "review",
          order: 3,
          title: "Review & Confirm",
          subtitle: "Check details before submitting.",
          icon: { iconClass: "fa-solid fa-clipboard-check" },
          inputs: [
            {
              name: "acceptTerms",
              label: "I confirm the above vendor details are accurate.",
              type: "checkbox",
              layout: "checkbox",
              required: true
            }
          ]
        }
      ]
    }
  },
  null,
  2
);

/* -------------------------------------------
 * Demo Page
 * ----------------------------------------- */

export default function CrudFormPage() {
  const [crudJson, setCrudJson] = useState(DEFAULT_CRUD_FORM_JSON);
  const [crudParseError, setCrudParseError] = useState("");
  const [crudOutputJson, setCrudOutputJson] = useState(
    "// Use the search bar, table row buttons, Add vendor, pagination, and the multi-step form to see OutputObject here…"
  );

  /* -------------------------------------------
   * Build CrudFormObject from JSON
   * ----------------------------------------- */
  const crudModel = useMemo(() => {
    try {
      const raw = JSON.parse(crudJson || "{}");

      const model = new CrudFormObject(raw);
      setCrudParseError("");
      return model;
    } catch (e) {
      setCrudParseError(String(e.message || e));

      // Safe fallback
      return new CrudFormObject({
        id: "fallbackCrudForm",
        name: "Invalid JSON (CrudForm)",
        className: "container-fluid",
        type: "table",
        documentClass: "col-12",
        search: {
          name: "search",
          label: "Search (JSON invalid)",
          type: "text",
          layout: "text",
          placeholder: "Fix JSON on the left to preview real CRUD…"
        },
        add: {
          name: "Add (disabled)",
          icon: { iconClass: "fa-solid fa-plus" },
          className: "btn btn-secondary",
          disabled: true
        },
        document: {
          name: "Table",
          rows: []
        },
        form: {
          id: "fallbackForm",
          name: "Invalid Form",
          status: "draft",
          tabs: []
        },
        pagination: {
          totalPages: 0,
          totalElements: 0,
          size: 0,
          number: 0,
          first: true,
          last: true,
          empty: true
        }
      });
    }
  }, [crudJson]);

  /* -------------------------------------------
   * Global output handler
   * ----------------------------------------- */

  function handleCrudOutput(out) {
    const payload =
      out instanceof OutputObject && typeof out.toJSON === "function"
        ? out.toJSON()
        : out;

    setCrudOutputJson(JSON.stringify(payload, null, 2));
  }

  /* -------------------------------------------
   * Helpers for reset / format / clear
   * ----------------------------------------- */

  function resetCrud() {
    setCrudJson(DEFAULT_CRUD_FORM_JSON);
    setCrudOutputJson(
      "// Use the search bar, table row buttons, Add vendor, pagination, and the multi-step form to see OutputObject here…"
    );
    setCrudParseError("");
  }

  function formatCrud() {
    try {
      const parsed = JSON.parse(crudJson);
      setCrudJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error already shown
    }
  }

  /* -------------------------------------------
   * RENDER
   * ----------------------------------------- */

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyCrudForm</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyCrudForm crudForm={new CrudFormObject(crudFormObject)} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyCrudForm crudForm={crudModel} output={handleCrudOutput} />

          <div className="small text-secondary mt-2 text-center">
            <strong>Search bar</strong> uses <code>AlloySearch</code> (wrapped
            by <code>CrudFormObject</code>). It emits{" "}
            <code>type="crud-form"</code> with <code>action="search"</code> and{" "}
            <code>data</code> like{" "}
            <code>{`{ "vendorSearch": "alpha" }`}</code> after debounced typing.
            <br />
            <strong>Sort</strong> (table header) emits{" "}
            <code>action="Sort"</code> with{" "}
            <code>data</code> like <code>{`{ "email": "asc" }`}</code>.
            <br />
            <strong>Pagination</strong> uses <code>AlloyPagination</code>.
            Clicking First / Previous / a page number / Next / Last emits{" "}
            <code>type="crud-form"</code>, <code>action="page"</code> with{" "}
            <code>data</code> containing <code>nav</code>,{" "}
            <code>pageNumber</code>, <code>size</code>,{" "}
            <code>totalPages</code> and <code>totalElements</code>.
            <br />
            <strong>Add vendor</strong> switches to the multi-step{" "}
            <code>AlloyTabForm</code> with blank values (Create mode). On{" "}
            <code>Finish</code>, you get{" "}
            <code>type="crud-form"</code>, <code>action="Create"</code> and
            flat form values in <code>data</code>.
            <br />
            <strong>Edit</strong> / <strong>Delete</strong> on a row open the
            same TabForm prefilled from that row. In Delete mode fields are
            read-only. On <code>Finish</code>, you get{" "}
            <code>action="Edit"</code> or <code>action="Delete"</code> with the
            flattened payload.
          </div>
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">CrudForm Input JSON (editable)</span>
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
              crudParseError ? "is-invalid" : ""
            }`}
            rows={22}
            value={crudJson}
            onChange={(e) => setCrudJson(e.target.value)}
            spellCheck={false}
          />
          {crudParseError && (
            <div className="invalid-feedback d-block mt-1">
              {crudParseError}
            </div>
          )}

          <div className="form-text">
            Required pieces: <code>type</code> (<code>"table"</code> or{" "}
            <code>"card"</code>), <code>document</code> (table object or card
            array), <code>search.name</code>, <code>add.name</code>, vendor
            fields in both <code>document.rows[]</code> and{" "}
            <code>form.tabs[].inputs[]</code> so Edit/Delete can prefill
            correctly. <br />
            Optional: <code>pagination</code> to enable page events.
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
              onClick={() => setCrudOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={crudOutputJson}
            onChange={(e) => setCrudOutputJson(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            Example (search event):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "vendorCrudForm",
  "type": "crud-form",
  "action": "search",
  "error": false,
  "data": {
    "vendorSearch": "alpha"
  }
}`}
            </pre>

            Example (pagination: click Next from page 1 of 10):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "vendorCrudForm",
  "type": "crud-form",
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
      "...": "original AlloyButtonIcon OutputObject"
    }
  }
}`}
            </pre>

            Example (Add → Finish, after successful submit):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "vendorCrudForm",
  "type": "crud-form",
  "action": "Create",
  "error": false,
  "data": {
    "vendorName": "New Vendor Inc.",
    "email": "new@vendor.com",
    "city": "Toronto",
    "status": "active",
    "acceptTerms": true
  }
}`}
            </pre>

            Example (Edit row → Finish):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "vendorCrudForm",
  "type": "crud-form",
  "action": "Edit",
  "error": false,
  "data": {
    "vendorName": "Alpha Precast Ltd. (Updated)",
    "email": "updated@alphaprecast.com",
    "city": "Toronto",
    "status": "active",
    "acceptTerms": true
  }
}`}
            </pre>

            Example (Delete row → Finish):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "vendorCrudForm",
  "type": "crud-form",
  "action": "Delete",
  "error": false,
  "data": {
    "vendorName": "Beta Concrete Inc.",
    "email": "contact@betaconcrete.com",
    "city": "Hamilton",
    "status": "pending",
    "acceptTerms": true
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
