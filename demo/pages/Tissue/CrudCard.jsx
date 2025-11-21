// pages/Tissue/CrudCard.jsx
import React, { useMemo, useState } from "react";
import { AlloyCrudCard, CrudCardObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------
 * DEFAULT JSON CONFIG (AlloyCrudCard)
 * ----------------------------------------- */

const DEFAULT_CRUD_CARD_JSON = JSON.stringify(
  {
    id: "vendorCrudCard",
    // className here is applied to *each* card column wrapper
    className: "col-sm-6 col-md-4 col-lg-3 mb-3",
    type: "AlloyCardAction", // "AlloyCardAction" | "AlloyCardIconAction" | "AlloyCardImageAction"

    modal: {
      id: "vendorCardModal",
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

    add: {
      id: "addVendorCardButton",
      name: "Add vendor",
      icon: { iconClass: "fa-solid fa-plus" },
      className: "btn btn-primary",
      title: "Add Vendor",
      ariaLabel: "Add Vendor"
    },

    // Cards: each card represents a vendor row
    // NOTE:
    //  - fields[].id MUST match modal.fields[].name
    //    (vendorName, email, city, status) so Edit/Delete can prefill modal.
    cards: [
      {
        id: "vendorCard_v001",
        className: "card h-100 shadow-sm",
        header: {
          id: "vendorCardHeader_v001",
          className: "card-header py-2 fw-semibold",
          name: "Vendor v001"
        },
        body: {
          id: "vendorCardBody_v001",
          className: "card-body",
          name: "Alpha Precast Ltd."
        },
        fields: [
          {
            id: "vendorName",
            className: "fw-semibold",
            name: "Alpha Precast Ltd."
          },
          {
            id: "email",
            className: "text-muted small",
            name: "info@alphaprecast.com"
          },
          {
            id: "city",
            className: "small",
            name: "Toronto"
          },
          {
            id: "status",
            className: "badge text-bg-success",
            name: "Active"
          }
        ],
        footer: {
          id: "vendorCardFooter_v001",
          className:
            "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
          name: "Alpha Precast Ltd."
        },
        type: "AlloyButtonBar",
        action: {
          id: "vendorCardActions_v001",
          className: "btn-group btn-group-sm",
          barName: { show: false },
          type: "AlloyButton",
          buttons: [
            {
              id: "editVendorCardBtn_v001",
              name: "Edit",
              className: "btn btn-outline-primary",
              icon: { iconClass: "fa-solid fa-pen" },
              title: "Edit vendor",
              ariaLabel: "Edit vendor"
            },
            {
              id: "deleteVendorCardBtn_v001",
              name: "Delete",
              className: "btn btn-outline-danger",
              icon: { iconClass: "fa-solid fa-trash" },
              title: "Delete vendor",
              ariaLabel: "Delete vendor"
            }
          ]
        }
      },
      {
        id: "vendorCard_v002",
        className: "card h-100 shadow-sm",
        header: {
          id: "vendorCardHeader_v002",
          className: "card-header py-2 fw-semibold",
          name: "Vendor v002"
        },
        body: {
          id: "vendorCardBody_v002",
          className: "card-body",
          name: "Beta Concrete Inc."
        },
        fields: [
          {
            id: "vendorName",
            className: "fw-semibold",
            name: "Beta Concrete Inc."
          },
          {
            id: "email",
            className: "text-muted small",
            name: "contact@betaconcrete.com"
          },
          {
            id: "city",
            className: "small",
            name: "Hamilton"
          },
          {
            id: "status",
            className: "badge text-bg-warning",
            name: "Pending"
          }
        ],
        footer: {
          id: "vendorCardFooter_v002",
          className:
            "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
          name: "Beta Concrete Inc."
        },
        type: "AlloyButtonBar",
        action: {
          id: "vendorCardActions_v002",
          className: "btn-group btn-group-sm",
          barName: { show: false },
          type: "AlloyButton",
          buttons: [
            {
              id: "editVendorCardBtn_v002",
              name: "Edit",
              className: "btn btn-outline-primary",
              icon: { iconClass: "fa-solid fa-pen" },
              title: "Edit vendor",
              ariaLabel: "Edit vendor"
            },
            {
              id: "deleteVendorCardBtn_v002",
              name: "Delete",
              className: "btn btn-outline-danger",
              icon: { iconClass: "fa-solid fa-trash" },
              title: "Delete vendor",
              ariaLabel: "Delete vendor"
            }
          ]
        }
      }
    ]
  },
  null,
  2
);

/* -------------------------------------------
 * Demo Page
 * ----------------------------------------- */

export default function CrudCardPage() {
  const [crudJson, setCrudJson] = useState(DEFAULT_CRUD_CARD_JSON);
  const [crudParseError, setCrudParseError] = useState("");
  const [crudOutputJson, setCrudOutputJson] = useState(
    "// Interact with Add vendor (card), Edit/Delete buttons and the modal to see OutputObject here…"
  );

  /* -------------------------------------------
   * Build CrudCardObject from JSON
   * ----------------------------------------- */
  const crudModel = useMemo(() => {
    try {
      const raw = JSON.parse(crudJson || "{}");

      const model = new CrudCardObject(raw);
      setCrudParseError("");
      return model;
    } catch (e) {
      setCrudParseError(String(e.message || e));

      // Safe fallback
      return new CrudCardObject({
        className: "col-sm-6 col-md-4 col-lg-3 mb-3",
        type: "AlloyCardAction",
        modal: {
          title: "Invalid JSON (CrudCard)",
          action: "",
          submit: {
            name: "Submit (disabled)",
            className: "btn btn-secondary",
            disabled: true
          },
          fields: []
        },
        add: {
          name: "Add (disabled)",
          icon: { iconClass: "fa-solid fa-plus" },
          className: "btn btn-secondary",
          disabled: true
        },
        cards: []
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
    setCrudJson(DEFAULT_CRUD_CARD_JSON);
    setCrudOutputJson(
      "// Interact with Add vendor (card), Edit/Delete buttons and the modal to see OutputObject here…"
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
      <h3 className="mb-3 text-center">AlloyCrudCard</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyCrudCard crudCard={new CrudCardObject(crudCardObject)} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyCrudCard crudCard={crudModel} output={handleCrudOutput} />

          <div className="small text-secondary mt-2 text-center">
            <strong>Add vendor</strong> opens the modal with empty/default
            values from <code>modal.data</code>. Every click gives a fresh,
            blank form. Only when you click <code>Save vendor</code> (and
            validation passes) do you get a single output where{" "}
            <code>action="Save vendor"</code> and <code>data</code> is flat
            key/value for all fields.
            <br />
            <strong>Edit</strong> / <strong>Delete</strong> use the card footer
            buttons. They open the same modal and prefill values from the
            clicked card. For Delete, fields are disabled/read-only. On modal
            submit you get a single output with <code>action="Edit"</code> or{" "}
            <code>action="Delete"</code> and the same flat key/value payload.
            <br />
            Any other footer button name becomes the{" "}
            <code>action</code> on the emitted <code>OutputObject</code> with{" "}
            <code>type="crud-card"</code>.
          </div>
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">CrudCard Input JSON (editable)</span>
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
            <code>modal.fields[].name</code>, and <code>cards[].id</code>. For
            Edit/Delete mapping,{" "}
            <strong>
              <code>cards[].fields[].id</code> must match{" "}
              <code>modal.fields[].name</code>
            </strong>{" "}
            (e.g. <code>vendorName</code>, <code>email</code>,{" "}
            <code>city</code>, <code>status</code>) so the modal can prefill
            correctly from the card output.
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
            Example (Add → Save vendor, after successful submit):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "vendorCrudCard",
  "type": "crud-card",
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

            Example (Edit card and submit):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "vendorCrudCard",
  "type": "crud-card",
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

            Example (Delete card and confirm in modal):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "vendorCrudCard",
  "type": "crud-card",
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
