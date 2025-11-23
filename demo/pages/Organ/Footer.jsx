// src/pages/Organ/Footer.jsx
import React, { useMemo, useState } from "react";

import { AlloyFooter, FooterObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* ------------------------------------------------------------------
 * DEFAULT FOOTER JSON
 * ------------------------------------------------------------------ */
const DEFAULT_FOOTER_JSON = JSON.stringify(
  {
    id: "pexFooter",
    className: "footer pt-5 pb-4 bg-dark text-light",

    brandName: "PExChange",
    brandLogo: {
      id: "pexBrand",
      name: "PExChange",
      href: "/",
      logo: {
        iconClass: "fa-solid fa-building"
      },
      className: "brand-badge text-decoration-none text-light"
    },
    brandDetails:
      "Professional marketplace connecting precast manufacturers, engineers and buyers. New & used equipment, services and standards — in one platform.",
    brandClass: "col-md-4",

    exploreTitle: "Explore",
    exploreBar: {
      id: "exploreBar",
      className: "list-unstyled small",
      type: "AlloyLink",
      linkClass: "mb-1",
      selected: "active",
      links: [
        {
          id: "lnkProducts",
          name: "Products",
          href: "#products",
          className: "d-block"
        },
        {
          id: "lnkExchange",
          name: "Exchange",
          href: "#exchange",
          className: "d-block"
        },
        {
          id: "lnkResources",
          name: "Resources",
          href: "#resources",
          className: "d-block"
        },
        {
          id: "lnkAuctions",
          name: "Auctions",
          href: "#auctions",
          className: "d-block"
        }
      ]
    },

    companyTitle: "Company",
    companyBar: {
      id: "companyBar",
      className: "list-unstyled small",
      type: "AlloyLink",
      linkClass: "mb-1",
      selected: "active",
      links: [
        {
          id: "lnkAbout",
          name: "About",
          href: "#about",
          className: "d-block"
        },
        {
          id: "lnkCareers",
          name: "Careers",
          href: "#careers",
          className: "d-block"
        },
        {
          id: "lnkContact",
          name: "Contact",
          href: "#contact",
          className: "d-block"
        }
      ]
    },

    subscribeTitle: "Stay in the loop",
    subscribeForm: {
      id: "newsletterForm",
      title: "",
      className: "",
      message: "",
      action: "subscribe",
      type: "AlloyInputTextIcon",
      submit: {
        name: "Subscribe",
        icon: { iconClass: "fa-solid fa-paper-plane" },
        className: "btn btn-primary w-100 mt-2",
        disabled: false,
        loading: false,
        ariaLabel: "Subscribe to newsletter",
        title: "Subscribe"
      },
      fields: [
        {
          name: "email",
          label: "",
          type: "email",
          layout: "text",
          placeholder: "name@company.com",
          required: true,
          className: "mb-2"
        }
      ],
      data: {}
    },

    bottomLeft: "© 2025 PExChange. All rights reserved.",

    socialBar: {
      id: "footerSocial",
      className: "nav gap-3",
      type: "AlloyLink",
      linkClass: "nav-item",
      selected: "active",
      links: [
        {
          id: "lnkLinkedIn",
          name: "",
          href: "#",
          icon: { iconClass: "fa-brands fa-linkedin" },
          ariaLabel: "LinkedIn",
          className: "nav-link p-0 text-light"
        },
        {
          id: "lnkTwitter",
          name: "",
          href: "#",
          icon: { iconClass: "fa-brands fa-x-twitter" },
          ariaLabel: "X / Twitter",
          className: "nav-link p-0 text-light"
        },
        {
          id: "lnkYouTube",
          name: "",
          href: "#",
          icon: { iconClass: "fa-brands fa-youtube" },
          ariaLabel: "YouTube",
          className: "nav-link p-0 text-light"
        }
      ]
    }
  },
  null,
  2
);

/* ------------------------------------------------------------------
 * Demo page
 * ------------------------------------------------------------------ */
export default function FooterPage() {
  const [footerJson, setFooterJson] = useState(DEFAULT_FOOTER_JSON);
  const [footerParseError, setFooterParseError] = useState("");
  const [footerOutputJson, setFooterOutputJson] = useState(
    "// Interact with links or subscribe form to see OutputObject here…"
  );

  const footerModel = useMemo(() => {
    try {
      const raw = JSON.parse(footerJson || "{}");
      const model = new FooterObject(raw);
      setFooterParseError("");
      return model;
    } catch (e) {
      setFooterParseError(String(e.message || e));

      // fallback minimal, but still valid according to schema
      return new FooterObject({
        brandName: "AlloyFooter",
        brandDetails: "Invalid JSON. Please fix the config on the left.",
        exploreBar: {
          id: "fallback-explore",
          className: "list-unstyled small",
          type: "AlloyLink",
          links: []
        },
        companyBar: {
          id: "fallback-company",
          className: "list-unstyled small",
          type: "AlloyLink",
          links: []
        },
        subscribeForm: {
          id: "fallback-subscribe",
          title: "",
          className: "",
          message: "JSON parse error above.",
          action: "subscribe",
          fields: [],
          submit: {
            name: "Subscribe",
            icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
            className: "btn btn-secondary w-100 mt-2",
            disabled: true,
            loading: false,
            ariaLabel: "Subscribe (disabled)",
            title: "Subscribe (disabled)"
          },
          data: {}
        },
        socialBar: {
          id: "fallback-social",
          className: "nav gap-3",
          type: "AlloyLink",
          links: []
        }
      });
    }
  }, [footerJson]);

  function handleFooterOutput(out) {
    const payload =
      out instanceof OutputObject && typeof out.toJSON === "function"
        ? out.toJSON()
        : out;

    setFooterOutputJson(JSON.stringify(payload, null, 2));
  }

  function resetFooter() {
    setFooterJson(DEFAULT_FOOTER_JSON);
    setFooterParseError("");
    setFooterOutputJson(
      "// Interact with links or subscribe form to see OutputObject here…"
    );
  }

  function formatFooter() {
    try {
      const parsed = JSON.parse(footerJson);
      setFooterJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error already shown
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyFooter</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyFooter footer={new FooterObject(footerObject)} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyFooter footer={footerModel} output={handleFooterOutput} />
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Footer Input JSON (editable)</span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={resetFooter}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={formatFooter}
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
              footerParseError ? "is-invalid" : ""
            }`}
            rows={22}
            value={footerJson}
            onChange={(e) => setFooterJson(e.target.value)}
            spellCheck={false}
          />
          {footerParseError && (
            <div className="invalid-feedback d-block mt-1">
              {footerParseError}
            </div>
          )}

          <div className="form-text">
            Required pieces:{" "}
            <code>brandLogo.href</code>, <code>brandLogo.logo</code>,{" "}
            <code>exploreBar.links[].href</code>,{" "}
            <code>companyBar.links[].href</code>,{" "}
            <code>subscribeForm.submit.icon.iconClass</code>,{" "}
            <code>socialBar.links[].href</code>.
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
              onClick={() => setFooterOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={footerOutputJson}
            onChange={(e) => setFooterOutputJson(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            Example (Subscribe event):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "pexFooter",
  "type": "footer",
  "action": "subscribe",
  "error": false,
  "data": {
    "email": "user@example.com"
  }
}`}
            </pre>

            Example (Link click):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "pexFooter",
  "type": "footer",
  "action": "Products",
  "error": false,
  "data": {
    "href": "#products"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
