// pages/Organ/Contact.jsx
import React, { useMemo, useState } from "react";
import { AlloyContact, ContactObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------
 * SINGLE DEFAULT CONTACT JSON
 * (form + addressCard together)
 * ----------------------------------------- */

const DEFAULT_CONTACT_JSON = JSON.stringify(
  {
    id: "contact",
    title: "Contact Us",
    type: "AlloyInputTextIcon",
    className:
      "d-flex justify-content-center flex-column text-center h-100 mt-3",
    contactClass: "col-12 col-md-6 mb-3 mb-md-0",
    addressClass: "col-12 col-md-6",

    /* Contact form config (AlloyForm) */
    contactForm: {
      id: "contactForm",
      title: "Send us a message",
      className: "col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2",
      message: "",
      action: "submitContact",
      type: "AlloyInputTextIcon",

      submit: {
        id: "contactSubmit",
        name: "Submit",
        icon: { iconClass: "fa-solid fa-paper-plane" }, // REQUIRED
        className: "btn btn-primary w-100 mt-3",
        disabled: false,
        loading: false,
        ariaLabel: "Submit contact form",
        title: "Submit contact form"
      },

      fields: [
        {
          name: "name",
          label: "Full Name",
          type: "text",
          layout: "text",
          placeholder: "Your name",
          required: true,
          minLength: 2
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          layout: "text",
          placeholder: "you@example.com",
          required: true
        },
        {
          name: "subject",
          label: "Subject",
          type: "text",
          layout: "text",
          placeholder: "How can we help?",
          required: true,
          minLength: 3
        },
        {
          name: "message",
          label: "Message",
          type: "textarea",
          layout: "textarea",
          placeholder: "Type your message here…",
          required: true,
          minLength: 10,
          rows: 4
        }
      ],

      data: {}
    },

    /* Address card config (AlloyCard) */
    addressCard: {
      id: "contactAddressCard",
      className: "card border shadow-sm m-2",

      header: {
        id: "contactAddressHeader",
        className: "card-header fw-semibold",
        name: "Our Office"
      },

      body: {
        id: "contactAddressBody",
        className: "card-body text-start",
        name: "PrecastXchange Inc."
      },

      fields: [
        {
          id: "contactAddressLine1",
          className: "small",
          name: "123 Main Street"
        },
        {
          id: "contactAddressLine2",
          className: "small",
          name: "Hamilton, ON L8P 1A1"
        },
        {
          id: "contactAddressLine3",
          className: "small mt-2",
          name: "Email: support@precastxchange.com"
        },
        {
          id: "contactAddressLine4",
          className: "small",
          name: "Phone: (555) 123-4567"
        }
      ],

      footer: {
        id: "contactAddressFooter",
        className: "card-footer small text-muted",
        name: "We typically reply within 1–2 business days."
      }
    }
  },
  null,
  2
);

/* -------------------------------------------
 * Demo Page
 * ----------------------------------------- */

export default function ContactPage() {
  const [contactJson, setContactJson] = useState(DEFAULT_CONTACT_JSON);
  const [contactParseError, setContactParseError] = useState("");
  const [contactOutputJson, setContactOutputJson] = useState(
    "// Submit the contact form to see OutputObject here…"
  );

  /* -------------------------------------------
   * Build ContactObject from single JSON
   * ----------------------------------------- */
  const contactModel = useMemo(() => {
    try {
      const raw = JSON.parse(contactJson || "{}");
      setContactParseError("");

      // Single object → ContactObject
      return new ContactObject(raw);
    } catch (e) {
      setContactParseError(String(e.message || e));

      // Fallback model for invalid JSON (non-crashing UI)
      return new ContactObject({
        id: "invalidContact",
        title: "Invalid JSON (Contact)",
        className:
          "d-flex justify-content-center flex-column text-center h-100 mt-3",
        contactClass: "col-12 mb-3",
        addressClass: "col-12",

        contactForm: {
          id: "invalidContactForm",
          title: "Invalid JSON",
          className: "col-12 col-md-8 offset-md-2",
          message:
            "Fix the JSON on the left to preview the real contact form.",
          action: "",
          submit: {
            id: "invalidContactSubmit",
            name: "Submit (disabled)",
            icon: { iconClass: "fa-solid fa-ban" },
            className: "btn btn-secondary w-100 mt-3",
            disabled: true,
            loading: false,
            ariaLabel: "Submit (disabled)",
            title: "Submit (disabled)"
          },
          fields: []
        },

        // NOTE: we only pass body; ContactObject will synthesize fields[]
        addressCard: {
          id: "invalidContactAddressCard",
          className: "card border-0",
          body: {
            id: "invalidContactAddressBody",
            className: "card-body text-center text-muted",
            name: "Address (JSON invalid)"
          }
        }
      });
    }
  }, [contactJson]);

  /* -------------------------------------------
   * Global output handler
   * ----------------------------------------- */

  function handleContactOutput(out) {
    const payload =
      out instanceof OutputObject && typeof out.toJSON === "function"
        ? out.toJSON()
        : out;

    setContactOutputJson(JSON.stringify(payload, null, 2));
  }

  /* -------------------------------------------
   * Helpers
   * ----------------------------------------- */

  function resetContact() {
    setContactJson(DEFAULT_CONTACT_JSON);
    setContactOutputJson(
      "// Submit the contact form to see OutputObject here…"
    );
    setContactParseError("");
  }

  function formatContactJson() {
    try {
      const parsed = JSON.parse(contactJson);
      setContactJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; error already shown
    }
  }

  /* -------------------------------------------
   * RENDER
   * ----------------------------------------- */

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyContact</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyContact
  contact={new ContactObject(contactObject)}
  output={handleOutput}
/>`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyContact contact={contactModel} output={handleContactOutput} />

          <div className="small text-secondary mt-2 text-center">
            <strong>Contact form</strong> is a normal <code>AlloyForm</code>:
            it validates each field and emits an <code>OutputObject</code> on
            submit.
            <br />
            The payload uses <code>type="contact"</code>,{" "}
            <code>action="submit"</code>, and a flat <code>data</code> map with
            your values.
          </div>
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Contact Input JSON (form + addressCard, editable)
            </span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={resetContact}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={formatContactJson}
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
              contactParseError ? "is-invalid" : ""
            }`}
            rows={22}
            value={contactJson}
            onChange={(e) => setContactJson(e.target.value)}
            spellCheck={false}
          />
          {contactParseError && (
            <div className="invalid-feedback d-block mt-1">
              {contactParseError}
            </div>
          )}

          <div className="form-text">
            This single JSON controls the{" "}
            <code>ContactObject</code>: layout,{" "}
            <code>contactForm</code> (AlloyForm) and{" "}
            <code>addressCard</code> (AlloyCard).
            <br />
            <ul className="mb-0 ps-3">
              <li>
                <code>contactForm.submit.icon</code> must be present (required
                by <code>AlloyForm</code>).
              </li>
              <li>
                If you omit <code>addressCard.fields</code>,{" "}
                <code>ContactObject</code> will synthesize a single field line
                from <code>addressCard.body.name</code> so{" "}
                <code>AlloyCard</code> still has at least one field.
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
              onClick={() => setContactOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={contactOutputJson}
            onChange={(e) => setContactOutputJson(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            On successful submit you&apos;ll see:
            <pre className="mb-0 mt-1 small">
{`{
  "id": "contact",
  "type": "contact",
  "action": "submit",
  "error": false,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Hello",
    "message": "Hi team…"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
