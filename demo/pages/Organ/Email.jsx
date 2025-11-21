// pages/Tissue/Email.jsx
import React, { useMemo, useState } from "react";
import { AlloyEmail, EmailObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------
 * DEFAULT JSON CONFIG
 * ----------------------------------------- */

const DEFAULT_EMAIL_JSON = JSON.stringify(
  {
    id: "emailComponent",
    className: "container-fluid",

    // Modal for composing / sending an email
    modal: {
      id: "emailComposeModal",
      title: "Email",
      className: "modal fade",
      action: "Create",
      submit: {
        name: "Send email",
        className: "btn btn-primary",
        active: "active"
      },
      fields: [
        {
          name: "to",
          label: "To",
          type: "email",
          layout: "text",
          placeholder: "recipient@example.com",
          required: true
        },
        {
          name: "subject",
          label: "Subject",
          type: "text",
          layout: "text",
          placeholder: "Enter subject",
          required: true,
          minLength: 3
        },
        {
          name: "body",
          label: "Message",
          type: "textarea",
          layout: "text",
          placeholder: "Write your message...",
          required: true,
          minLength: 5,
          rows: 4
        },
        {
          name: "tags",
          label: "Tags",
          type: "text",
          layout: "text",
          placeholder: "optional: e.g. invoice, reminder"
        }
      ],
      // Default values used every time "Send email" button is clicked
      data: {
        to: "",
        subject: "",
        body: "",
        tags: ""
      }
    },

    // Search bar (top-left)
    search: {
      name: "emailSearch",
      id: "emailSearch",
      type: "text",
      layout: "icon",
      icon: { iconClass: "fa-solid fa-magnifying-glass" },
      label: "Search Emails",
      placeholder: "Search by recipient, subject, tags…",
      className: "form-control"
    },

    // Send button (top-right)
    send: {
      id: "sendEmailButton",
      name: "Compose",
      icon: { iconClass: "fa-solid fa-paper-plane" },
      className: "btn btn-primary",
      title: "Compose email",
      ariaLabel: "Compose email"
    },

    // Table of existing emails / logs
    table: {
      id: "emailTable",
      className: "table table-striped align-middle",
      name: "Emails",
      icon: { iconClass: "fa-solid fa-envelope" },
      sort: { iconClass: "fa-solid fa-arrow-down-short-wide" },
      rows: [
        {
          id: "e001",
          to: "alpha@precastxchange.com",
          subject: "Welcome to PrecastXchange",
          status: "Sent",
          sentAt: "2025-11-20 10:15",
          tags: "welcome,onboarding"
        },
        {
          id: "e002",
          to: "beta@precastxchange.com",
          subject: "Password reset instructions",
          status: "Queued",
          sentAt: "2025-11-20 11:05",
          tags: "security,reset"
        },
        {
          id: "e003",
          to: "gamma@precastxchange.com",
          subject: "Your invoice #401",
          status: "Failed",
          sentAt: "2025-11-19 17:42",
          tags: "invoice,billing"
        }
      ],
      // Column-level actions (e.g. Open / Resend / Delete)
      actions: {
        id: "emailRowActions",
        className: "btn-group btn-group-sm",
        name: "Row Actions",
        buttons: [
          {
            id: "openEmailBtn",
            name: "Open",
            icon: { iconClass: "fa-solid fa-folder-open" },
            className: "btn btn-outline-primary",
            title: "Open email",
            ariaLabel: "Open email"
          },
          {
            id: "resendEmailBtn",
            name: "Resend",
            icon: { iconClass: "fa-solid fa-paper-plane" },
            className: "btn btn-outline-success",
            title: "Resend email",
            ariaLabel: "Resend email"
          },
          {
            id: "deleteEmailBtn",
            name: "Delete",
            icon: { iconClass: "fa-solid fa-trash" },
            className: "btn btn-outline-danger",
            title: "Delete email",
            ariaLabel: "Delete email"
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

export default function EmailPage() {
  const [emailJson, setEmailJson] = useState(DEFAULT_EMAIL_JSON);
  const [emailParseError, setEmailParseError] = useState("");
  const [emailOutputJson, setEmailOutputJson] = useState(
    "// Interact with search, Compose, table rows and modal to see OutputObject here…"
  );

  /* -------------------------------------------
   * Build EmailObject from JSON
   * ----------------------------------------- */
  const emailModel = useMemo(() => {
    try {
      const raw = JSON.parse(emailJson || "{}");

      const model = new EmailObject(raw);
      setEmailParseError("");
      return model;
    } catch (e) {
      setEmailParseError(String(e.message || e));

      // Safe fallback
      return new EmailObject({
        className: "container-fluid",
        modal: {
          title: "Invalid JSON (Email)",
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
          placeholder: "Fix JSON on the left to preview real Email component…"
        },
        send: {
          name: "Compose (disabled)",
          icon: { iconClass: "fa-solid fa-paper-plane" },
          className: "btn btn-secondary",
          disabled: true
        },
        table: {
          name: "Emails",
          rows: []
        }
      });
    }
  }, [emailJson]);

  /* -------------------------------------------
   * Global output handler
   * ----------------------------------------- */

  function handleEmailOutput(out) {
    const payload =
      out instanceof OutputObject && typeof out.toJSON === "function"
        ? out.toJSON()
        : out;

    setEmailOutputJson(JSON.stringify(payload, null, 2));
  }

  /* -------------------------------------------
   * Helpers for reset / format / clear
   * ----------------------------------------- */

  function resetEmail() {
    setEmailJson(DEFAULT_EMAIL_JSON);
    setEmailOutputJson(
      "// Interact with search, Compose, table rows and modal to see OutputObject here…"
    );
    setEmailParseError("");
  }

  function formatEmail() {
    try {
      const parsed = JSON.parse(emailJson);
      setEmailJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error already shown
    }
  }

  /* -------------------------------------------
   * RENDER
   * ----------------------------------------- */

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyEmail</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyEmail email={new EmailObject(emailObject)} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyEmail email={emailModel} output={handleEmailOutput} />

          <div className="small text-secondary mt-2 text-center">
            <strong>Search</strong> emits <code>type="email"</code>,{" "}
            <code>action="search"</code> with <code>data</code> like{" "}
            <code>{`{ "emailSearch": "invoice" }`}</code>.
            <br />
            <strong>Sort</strong> on a column (e.g. Subject ASC) emits{" "}
            <code>action="Sort"</code> with <code>data</code> like{" "}
            <code>{`{ "subject": "asc" }`}</code>.
            <br />
            <strong>Compose</strong> opens the modal with fresh{" "}
            <code>modal.data</code> every time (blank form). Only when you click{" "}
            <code>Send email</code> and validation passes do you get one output
            where <code>action="Send email"</code> and{" "}
            <code>data</code> is flat key/value for all fields (e.g.{" "}
            <code>to</code>, <code>subject</code>, <code>body</code>,{" "}
            <code>tags</code>).
            <br />
            Row buttons like <strong>Open</strong>, <strong>Resend</strong>,{" "}
            <strong>Delete</strong> emit immediate events with{" "}
            <code>action</code> equal to the button name and{" "}
            <code>data</code> containing the flat row payload.
          </div>
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Email Input JSON (editable)</span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={resetEmail}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={formatEmail}
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
              emailParseError ? "is-invalid" : ""
            }`}
            rows={22}
            value={emailJson}
            onChange={(e) => setEmailJson(e.target.value)}
            spellCheck={false}
          />
          {emailParseError && (
            <div className="invalid-feedback d-block mt-1">
              {emailParseError}
            </div>
          )}

          <div className="form-text">
            Required pieces: <code>modal.submit.name</code>,{" "}
            <code>modal.fields[].name</code>, <code>search.name</code>,{" "}
            <code>table.rows[].id</code>. Column names in{" "}
            <code>table.rows[]</code> should match your domain model (e.g.{" "}
            <code>to</code>, <code>subject</code>, <code>status</code>) so row
            actions can emit a clean, flat payload.
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
              onClick={() => setEmailOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={emailOutputJson}
            onChange={(e) => setEmailOutputJson(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            Example (search event):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "emailComponent",
  "type": "email",
  "action": "search",
  "error": false,
  "data": {
    "emailSearch": "invoice"
  }
}`}
            </pre>

            Example (Sort on subject ASC):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "emailComponent",
  "type": "email",
  "action": "Sort",
  "error": false,
  "data": {
    "subject": "asc"
  }
}`}
            </pre>

            Example (Compose → Send email, after successful submit):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "emailComponent",
  "type": "email",
  "action": "Send email",
  "error": false,
  "data": {
    "to": "user@example.com",
    "subject": "Welcome!",
    "body": "Hello and welcome to PrecastXchange.",
    "tags": "welcome,onboarding"
  }
}`}
            </pre>

            Example (row action: Resend email):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "emailComponent",
  "type": "email",
  "action": "Resend",
  "error": false,
  "data": {
    "id": "e003",
    "to": "gamma@precastxchange.com",
    "subject": "Your invoice #401",
    "status": "Failed",
    "sentAt": "2025-11-19 17:42",
    "tags": "invoice,billing"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
