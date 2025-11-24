// src/pages/Organ/Footer.jsx
import React, { useMemo, useState } from "react";

import { AlloyFooter, FooterObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* ------------------------------------------------------------------
 * DEFAULT FOOTER JSON (new schema)
 *
 * {
 *   id, name, className,
 *   logo: LogoObject,
 *   details: BlockObject,
 *   social: LinkBarObject,        // usually AlloyLinkIcon
 *   section: LinkBarObject[],     // Explore, Company, etc.
 *   subscribe: FormObject
 * }
 * ------------------------------------------------------------------ */
const DEFAULT_FOOTER_JSON = JSON.stringify(
  {
    id: "footer-pexchange",
    name: "PExChange Footer",
    className: "footer pt-5 pb-4 bg-dark text-light",

    logo: {
      id: "footer-logo",
      imageUrl:
        "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
      alt: "precastXchange",
      width: "32px",
      height: "auto",
      className: "img-fluid d-block object-fit-contain bg-light"
    },

    details: {
      id: "footer-details",
      name:
        "Professional marketplace connecting precast manufacturers, engineers and buyers. New & used equipment, services and standards — in one platform.",
      className: "small opacity-75 mb-2",
      colClass: "col-12 col-md-3",
      ariaLabel: "About PExChange"
    },

    social: {
      id: "footer-social",
      className: "mt-2 d-flex gap-3",
      type: "AlloyLinkIcon",
      linkClass: "nav-link p-0 text-light",
      selected: "active",
      title: {
        name: "Follow us",
        className: "fw-semibold text-uppercase me-3"
      },
      links: [
        {
          id: "social-linkedin",
          name: "",
          href: "https://www.linkedin.com/company/precastxchange",
          ariaLabel: "LinkedIn",
          icon: { iconClass: "fa-brands fa-linkedin" }
        },
        {
          id: "social-x",
          name: "",
          href: "https://x.com/precastxchange",
          ariaLabel: "X (Twitter)",
          icon: { iconClass: "fa-brands fa-x-twitter" }
        },
        {
          id: "social-youtube",
          name: "",
          href: "https://www.youtube.com/@precastxchange",
          ariaLabel: "YouTube",
          icon: { iconClass: "fa-brands fa-youtube" }
        }
      ]
    },

    section: [
      {
        id: "footer-section-explore",
        className: "list-unstyled small",
        type: "AlloyLink",
        linkClass: "d-block mb-1 text-decoration-none text-light",
        selected: "active",
        title: {
          name: "Explore",
          className: "fw-semibold text-uppercase mb-2"
        },
        links: [
          {
            id: "explore-products",
            name: "Products",
            href: "#products"
          },
          {
            id: "explore-exchange",
            name: "Exchange",
            href: "#exchange"
          },
          {
            id: "explore-resources",
            name: "Resources",
            href: "#resources"
          },
          {
            id: "explore-auctions",
            name: "Auctions",
            href: "#auctions"
          }
        ]
      },
      {
        id: "footer-section-company",
        className: "list-unstyled small",
        type: "AlloyLink",
        linkClass: "d-block mb-1 text-decoration-none text-light",
        selected: "active",
        title: {
          name: "Company",
          className: "fw-semibold text-uppercase mb-2"
        },
        links: [
          {
            id: "company-about",
            name: "About",
            href: "#about"
          },
          {
            id: "company-careers",
            name: "Careers",
            href: "#careers"
          },
          {
            id: "company-contact",
            name: "Contact",
            href: "#contact"
          }
        ]
      }
    ],

    subscribe: {
      id: "footer-subscribe",
      title: "Stay in the loop",
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
          label: "Email",
          type: "email",
          layout: "text",
          placeholder: "name@company.com",
          required: true,
          className: "form-control"
        }
      ],
      data: {}
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

      // fallback minimal, but still valid for new FooterObject schema
      return new FooterObject({
        name: "AlloyFooter",
        details: {
          name: "Invalid JSON. Please fix the config on the left.",
          className: "small text-danger mb-2"
        },
        social: {
          id: "fallback-social",
          className: "nav gap-3",
          type: "AlloyLinkIcon",
          links: []
        },
        section: [],
        subscribe: {
          id: "fallback-subscribe",
          title: "Stay in the loop",
          className: "",
          message: "JSON parse error above.",
          action: "subscribe",
          type: "AlloyInputTextIcon",
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
{`const footerObject = {
  // id, name, className,
  // logo, details, social, section[], subscribe
};

<AlloyFooter footer={new FooterObject(footerObject)} output={handleOutput} />`}
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
            Useful pieces for a nice footer:{" "}
            <code>logo.imageUrl</code>,{" "}
            <code>social.links[].href</code>,{" "}
            <code>section[].links[].href</code>,{" "}
            <code>subscribe.submit.icon.iconClass</code>.
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
  "id": "footer-pexchange",
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
  "id": "footer-pexchange",
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
