// pages/Tissue/CrudTable.jsx
import React, { useMemo, useState } from "react";
import { AlloyCrudTable, CrudTableObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------
 * DEFAULT JSON CONFIG
 * ----------------------------------------- */

const DEFAULT_CRUD_JSON = JSON.stringify(
  {
    id: "vendorCrudTable",
    className: "container-fluid",
    modal: {
      id: "vendorModal",
      title: "Vendor",
      className: "modal fade",
      action: "Create",
      submit: {
        name: "Save vendor",
        className: "btn btn-primary",
        active: "active"
      },
      fields: [
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
        },
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
      ],
      data: {
        vendorName: "",
        email: "",
        city: "",
        status: "active"
      }
    },
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
    add: {
      id: "addVendorButton",
      name: "Add vendor",
      icon: { iconClass: "fa-solid fa-plus" },
      className: "btn btn-primary",
      title: "Add Vendor",
      ariaLabel: "Add Vendor"
    },
    table: {
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
    }
  },
  null,
  2
);

/* -------------------------------------------
 * Demo Page
 * ----------------------------------------- */

export default function CrudTablePage() {
  const [crudJson, setCrudJson] = useState(DEFAULT_CRUD_JSON);
  const [crudParseError, setCrudParseError] = useState("");
  const [crudOutputJson, setCrudOutputJson] = useState(
    "// Interact with search, Add vendor, table rows and modal to see OutputObject here…"
  );

  /* -------------------------------------------
   * Build CrudTableObject from JSON
   * ----------------------------------------- */
  const crudModel = useMemo(() => {
    try {
      const raw = JSON.parse(crudJson || "{}");

      const model = new CrudTableObject(raw);
      setCrudParseError("");
      return model;
    } catch (e) {
      setCrudParseError(String(e.message || e));

      // Safe fallback
      return new CrudTableObject({
        className: "container-fluid",
        modal: {
          title: "Invalid JSON (CrudTable)",
          action: "",
          submit: {
            name: "Submit (disabled)",
            className: "btn btn-secondary",
            disabled: true
          },
          fields: []
        },
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
        table: {
          name: "Table",
          rows: []
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
    setCrudJson(DEFAULT_CRUD_JSON);
    setCrudOutputJson(
      "// Interact with search, Add vendor, table rows and modal to see OutputObject here…"
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
      <h3 className="mb-3 text-center">AlloyCrudTable</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyCrudTable crudTable={new CrudTableObject(crudTableObject)} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyCrudTable crudTable={crudModel} output={handleCrudOutput} />

          <div className="small text-secondary mt-2 text-center">
            <strong>Search</strong> emits <code>action="search"</code> with{" "}
            <code>data</code> like{" "}
            <code>{`{ "vendorSearch": "alpha" }`}</code>.
            <br />
            <strong>Sort</strong> emits <code>action="Sort"</code> with{" "}
            <code>data</code> like <code>{`{ "email": "asc" }`}</code> (column
            name as key, direction as value).
            <br />
            <strong>Add vendor</strong> opens the modal with empty/default
            values from <code>modal.data</code>. Only when you click{" "}
            <code>Save vendor</code> (and validation passes) do you get a single
            output where <code>action="Save vendor"</code> and{" "}
            <code>data</code> is flat key/value for all fields.
            <br />
            <strong>Edit</strong> / <strong>Delete</strong> open the same modal
            and prefill values from the clicked row (column names must match{" "}
            <code>modal.fields[].name</code>). On modal submit you get a single
            output with <code>action="Edit"</code> or{" "}
            <code>action="Delete"</code> and the same flat key/value payload.
          </div>
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">CrudTable Input JSON (editable)</span>
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
            Required pieces: <code>modal.submit.name</code>,{" "}
            <code>modal.fields[].name</code>, <code>search.name</code>,{" "}
            <code>table.rows[].id</code>. Column names in{" "}
            <code>table.rows[]</code> must match{" "}
            <code>modal.fields[].name</code> so Edit/Delete can prefill
            correctly.
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
  "id": "vendorCrudTable",
  "type": "crud-table",
  "action": "search",
  "error": false,
  "data": {
    "vendorSearch": "alpha"
  }
}`}
            </pre>

            Example (sort event on email ASC):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "vendorCrudTable",
  "type": "crud-table",
  "action": "Sort",
  "error": false,
  "data": {
    "email": "asc"
  }
}`}
            </pre>

            Example (Add → Save vendor, after successful submit):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "vendorCrudTable",
  "type": "crud-table",
  "action": "Save vendor",
  "error": false,
  "data": {
    "vendorName": "New Vendor Inc.",
    "email": "new@vendor.com",
    "city": "Toronto",
    "status": "active"
  }
}`}
            </pre>

            Example (Edit row and submit):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "vendorCrudTable",
  "type": "crud-table",
  "action": "Edit",
  "error": false,
  "data": {
    "vendorName": "Alpha Precast Ltd. (Updated)",
    "email": "updated@alphaprecast.com",
    "city": "Toronto",
    "status": "Active"
  }
}`}
            </pre>

            Example (Delete row and confirm in modal):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "vendorCrudTable",
  "type": "crud-table",
  "action": "Delete",
  "error": false,
  "data": {
    "vendorName": "Beta Concrete Inc.",
    "email": "contact@betaconcrete.com",
    "city": "Hamilton",
    "status": "Pending"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
