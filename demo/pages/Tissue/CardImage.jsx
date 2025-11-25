// demo/pages/tissue/CardImagePage.jsx
import React, { useMemo, useState } from "react";
import { AlloyCardImage, CardImageObject } from "../../../src";

/* ------------------------------------------------------------------
   Default presets for the two variants.

   NOTE:
   - `link` is OPTIONAL.
   - If `link` is a non-empty string (like "/product/123"), the BODY
     section will become clickable (once AlloyCardImage is updated
     to follow the "body-only link" rule, same as AlloyCard).
   - Header and footer are never wrapped in that link.
------------------------------------------------------------------- */

const DEFAULT_WITH_LINK = JSON.stringify(
  {
    id: "cardImageWithLink01",
    className: "card border m-2 shadow",
    link: "/product/123",

    header: {
      id: "cardImageWithLinkHeader",
      className: "card-header py-2 fw-semibold",
      name: "Featured Product"
    },

    body: {
      id: "cardImageWithLinkBody",
      className: "card-body py-3",
      name: "Alloy Mobile Suite"
    },

    // Left-side image / logo block
    logo: {
      imageUrl:
        "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
      alt: "Alloymobile",
      width: "72px",
      height: "auto"
    },

    // Layout classes for body row
    logoClass:
      "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0",
    textClass: "col-8",

    // Right-column text rows under body.name
    fields: [
      {
        id: "descLine",
        className: "text-muted small mb-1",
        name: "Cross-platform UI kit"
      },
      {
        id: "priceLine",
        className: "text-success fw-semibold",
        name: "$49 / month"
      }
    ],

    footer: {
      id: "cardImageWithLinkFooter",
      className: "card-footer small text-muted py-2",
      name: "Updated: 2025-01-15"
    }
  },
  null,
  2
);

const DEFAULT_NO_LINK = JSON.stringify(
  {
    id: "cardImageNoLink01",
    className: "card border m-2 shadow",
    link: "",

    header: {
      id: "cardImageNoLinkHeader",
      className: "card-header py-2 fw-semibold",
      name: "Featured Product"
    },

    body: {
      id: "cardImageNoLinkBody",
      className: "card-body py-3",
      name: "Alloy Mobile Suite"
    },

    logo: {
      imageUrl:
        "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
      alt: "Alloymobile",
      width: "72px",
      height: "auto"
    },

    logoClass:
      "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0",
    textClass: "col-8",

    fields: [
      {
        id: "descLine",
        className: "text-muted small mb-1",
        name: "Cross-platform UI kit"
      },
      {
        id: "priceLine",
        className: "text-success fw-semibold",
        name: "$49 / month"
      }
    ],

    footer: {
      id: "cardImageNoLinkFooter",
      className: "card-footer small text-muted py-2",
      name: "Updated: 2025-01-15"
    }
  },
  null,
  2
);

/* Display-only snippet */
const TAG_SNIPPET = `<AlloyCardImage cardImage={new CardImageObject(cardImageObject)} />`;

export default function CardImagePage() {
  // two tabs: with link / without link
  const TABS = [
    { key: "with", label: "With Link" },
    { key: "without", label: "Without Link" }
  ];

  const [active, setActive] = useState("with");

  // editable JSON state for each tab
  const [jsonWith, setJsonWith] = useState(DEFAULT_WITH_LINK);
  const [jsonWithout, setJsonWithout] = useState(DEFAULT_NO_LINK);

  // parse errors per tab
  const [errWith, setErrWith] = useState("");
  const [errWithout, setErrWithout] = useState("");

  // build model for active tab
  const modelWith = useMemo(() => {
    try {
      setErrWith("");
      return new CardImageObject(JSON.parse(jsonWith));
    } catch (e) {
      setErrWith(String(e.message || e));
      // graceful fallback for "with link" tab
      return new CardImageObject({
        className: "card border m-2 shadow",
        link: "/product/123",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON"
        },
        body: {
          className: "card-body py-3",
          name: "Could not parse input JSON."
        },
        logo: {
          imageUrl:
            "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
          alt: "Alloymobile",
          width: "48px",
          height: "auto"
        },
        logoClass:
          "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0",
        textClass: "col-8",
        fields: [
          {
            className: "text-danger",
            name: "Fix the JSON to continue."
          }
        ],
        footer: {
          className: "card-footer small text-muted py-2",
          name: "Updated: --"
        }
      });
    }
  }, [jsonWith]);

  const modelWithout = useMemo(() => {
    try {
      setErrWithout("");
      return new CardImageObject(JSON.parse(jsonWithout));
    } catch (e) {
      setErrWithout(String(e.message || e));
      // graceful fallback for "without link" tab
      return new CardImageObject({
        className: "card border m-2 shadow",
        link: "",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON"
        },
        body: {
          className: "card-body py-3",
          name: "Could not parse input JSON."
        },
        logo: {
          imageUrl:
            "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
          alt: "Alloymobile",
          width: "48px",
          height: "auto"
        },
        logoClass:
          "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0",
        textClass: "col-8",
        fields: [
          {
            className: "text-danger",
            name: "Fix the JSON to continue."
          }
        ],
        footer: {
          className: "card-footer small text-muted py-2",
          name: "Updated: --"
        }
      });
    }
  }, [jsonWithout]);

  // active tab binding block
  const tabBindings = {
    with: {
      label: "With Link",
      model: modelWith,
      inputJson: jsonWith,
      setInputJson: setJsonWith,
      parseError: errWith,
      resetJson: () => {
        setJsonWith(DEFAULT_WITH_LINK);
        setErrWith("");
      }
    },
    without: {
      label: "Without Link",
      model: modelWithout,
      inputJson: jsonWithout,
      setInputJson: setJsonWithout,
      parseError: errWithout,
      resetJson: () => {
        setJsonWithout(DEFAULT_NO_LINK);
        setErrWithout("");
      }
    }
  }[active];

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyCardImage</h3>

      {/* Tabs */}
      <ul className="nav nav-tabs flex-wrap justify-content-center mb-3">
        {TABS.map(({ key, label }) => (
          <li className="nav-item" key={key}>
            <button
              type="button"
              className={`nav-link ${active === key ? "active" : ""}`}
              onClick={() => setActive(key)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* Tag sample */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0 text-center">
            <code>{TAG_SNIPPET}</code>
          </pre>
        </div>
      </div>

      {/* Preview */}
      <div className="row mb-4">
        <div className="col-12 col-lg-6">
          <AlloyCardImage cardImage={tabBindings.model} />
          <div className="small text-secondary mt-2">
            <ul className="mb-0 ps-3">
              <li>
                <code>header</code> and <code>footer</code> render only if
                their <code>name</code> is non-empty.
              </li>
              <li>
                <code>body</code> is required. <code>body.name</code> becomes
                the heading text in the right column.
              </li>
              <li>
                <code>logo</code> controls the left image block (imageUrl / alt /
                width / height). The wrapper column uses{" "}
                <code>logoClass</code>.
              </li>
              <li>
                The right column uses <code>textClass</code> and renders{" "}
                <code>fields[]</code> in order, skipping empty{" "}
                <code>name</code>.
              </li>
              <li>
                <strong>Navigation behavior:</strong>{" "}
                <code>link</code> is optional. If it exists (like{" "}
                <code>"/product/123"</code> in the “With Link” tab),
                ONLY the <code>body</code> section should be wrapped in{" "}
                a React Router <code>&lt;Link/&gt;</code>. Header and footer
                never become part of that link.
              </li>
              <li>
                Clear <code>link</code> (empty string) to make the body
                non-clickable, as shown in the “Without Link” tab.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* JSON editor for active tab */}
      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Input JSON (editable) — {tabBindings.label}
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={tabBindings.resetJson}
            >
              Reset
            </button>
          </div>

          <textarea
            className={`form-control font-monospace ${
              tabBindings.parseError ? "is-invalid" : ""
            }`}
            rows={18}
            value={tabBindings.inputJson}
            onChange={(e) => tabBindings.setInputJson(e.target.value)}
            spellCheck={false}
          />
          {tabBindings.parseError && (
            <div className="invalid-feedback d-block mt-1">
              {tabBindings.parseError}
            </div>
          )}

          <div className="form-text">
            <div>
              <code>logoClass</code> is the left column wrapper. You can center
              the image with{" "}
              <code>d-flex align-items-center justify-content-center</code>.
            </div>
            <div>
              <code>textClass</code> is the right column wrapper (the text
              stack).
            </div>
            <div>
              <code>header</code>, <code>body</code>, <code>footer</code>, and{" "}
              <code>fields[]</code> all follow the same TagObject-ish shape:
              <code>{" { id?, className?, name? } "}</code>.
              You do not have to supply <code>id</code> yourself; constructors
              will generate one if it's missing.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
