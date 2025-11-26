// demo/pages/Tissue/CardCarousel.jsx
import React, { useMemo, useState } from "react";

import { AlloyCarousel, CarouselObject } from "../../../src";

/* -------------------------------------------------------
 * DEFAULT JSON CONFIG (CarouselObject)
 * ----------------------------------------------------- */
const DEFAULT_CAROUSEL_JSON = JSON.stringify(
  {
    id: "demoCarousel",
    className: "card h-100 rounded-3 shadow-sm",
    link: "/products/astro-septic-tank",

    // BlockObject-like header (can include iconClass)
    header: {
      name: "Septic Tanks",
      className: "card-title mb-1",
      iconClass: "fa-solid fa-dumpster"
    },

    // BlockObject-like body (main title)
    body: {
      name: "ASTRO™ Septic Tank Mold",
      className: "fw-semibold"
    },

    // At least 1 field (BlockObject). These become info lines.
    fields: [
      {
        id: "subtitle",
        name: "Steel form — 1,000–3,000 gal",
        className: "small text-secondary"
      },
      {
        id: "description",
        name: "High-throughput modular formwork with quick-release panels for accelerated cycles.",
        className: "mt-3 text-secondary small"
      },
      {
        id: "badge",
        name: "New Equipment",
        className:
          "badge text-bg-primary-subtle text-primary d-inline-block mt-2"
      }
    ],

    // Optional footer (BlockObject)
    footer: {
      id: "carouselFooter",
      name: "Click to view full product details.",
      className:
        "mt-3 small text-muted d-flex justify-content-between align-items-center"
    },

    // REQUIRED: at least 2 images (CarouselImageObject[])
    images: [
      {
        url: "https://picsum.photos/seed/septic1/600/350",
        altText: "Septic tank mold — angle 1",
        isPrimary: true,
        sortOrder: 1
      },
      {
        url: "https://picsum.photos/seed/septic2/600/350",
        altText: "Septic tank mold — angle 2",
        isPrimary: false,
        sortOrder: 2
      },
      {
        url: "https://picsum.photos/seed/septic3/600/350",
        altText: "Septic tank mold — angle 3",
        isPrimary: false,
        sortOrder: 3
      }
    ]
  },
  null,
  2
);

/* -------------------------------------------------------
 * DEMO PAGE
 * ----------------------------------------------------- */
export default function CarouselPage() {
  const [carouselJson, setCarouselJson] = useState(DEFAULT_CAROUSEL_JSON);
  const [parseError, setParseError] = useState("");
  const [infoText, setInfoText] = useState(
    `// AlloyCarousel is purely visual.
// It does not emit OutputObject.
// Use \`link\` to navigate to a product page.`
  );

  const carouselModel = useMemo(() => {
    try {
      const raw = JSON.parse(carouselJson || "{}");
      const model = new CarouselObject(raw);
      setParseError("");
      return model;
    } catch (e) {
      setParseError(String(e.message || e));

      // Safe fallback: must satisfy CarouselObject rules
      return new CarouselObject({
        className: "card h-100 rounded-3 border border-danger-subtle",
        header: {
          name: "Invalid JSON",
          className: "card-title mb-1 text-danger",
          iconClass: "fa-solid fa-triangle-exclamation"
        },
        body: {
          name: "Fix JSON on the left to preview the real carousel.",
          className: "small text-secondary"
        },
        fields: [
          {
            id: "fallback-line",
            name: "This is a fallback carousel card.",
            className: "small text-secondary"
          }
        ],
        footer: {
          name: "CarouselObject still requires fields[] and at least 2 images.",
          className: "mt-2 small text-muted"
        },
        images: [
          {
            url: "https://picsum.photos/seed/fallback1/600/350",
            altText: "Fallback image 1",
            sortOrder: 1
          },
          {
            url: "https://picsum.photos/seed/fallback2/600/350",
            altText: "Fallback image 2",
            sortOrder: 2
          }
        ]
      });
    }
  }, [carouselJson]);

  function resetJson() {
    setCarouselJson(DEFAULT_CAROUSEL_JSON);
    setParseError("");
    setInfoText(
      `// AlloyCarousel is purely visual.
// It does not emit OutputObject.
// Use \`link\` to navigate to a product page.`
    );
  }

  function formatJson() {
    try {
      const parsed = JSON.parse(carouselJson);
      setCarouselJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error already shown
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyCarousel</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyCarousel carousel={new CarouselObject(carouselObject)} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12 col-md-6 mx-auto">
          <AlloyCarousel carousel={carouselModel} />
        </div>
      </div>

      {/* JSON in / Info out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Carousel Input JSON (editable)</span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={resetJson}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={formatJson}
                title="Format JSON"
              >
                <i
                  className="fa-solid fa-wand-magic-sparkles me-1"
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
            value={carouselJson}
            onChange={(e) => setCarouselJson(e.target.value)}
            spellCheck={false}
          />
          {parseError && (
            <div className="invalid-feedback d-block mt-1">
              {parseError}
            </div>
          )}

          <div className="form-text">
            Required pieces:
            <ul className="mb-0">
              <li>
                <code>header</code> and <code>body</code> →{" "}
                <code>BlockObject</code>-style blocks.
              </li>
              <li>
                <code>fields[]</code> → at least one line of text (subtitle,
                badge, description, etc.).
              </li>
              <li>
                <code>images[]</code> → at least 2 images for the Bootstrap
                carousel.
              </li>
              <li>
                Optional <code>footer</code> for helper text or tags.
              </li>
              <li>
                <code>link</code> → when set, body becomes a{" "}
                <code>&lt;Link&gt;</code> to that route.
              </li>
            </ul>
          </div>
        </div>

        {/* Right: info / docs (no OutputObject) */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Notes (AlloyCarousel is visual only)
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => setInfoText("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={infoText}
            onChange={(e) => setInfoText(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            This component is intended for catalog / gallery layouts:
            <ul className="mb-0">
              <li>No CTA button or quantity controls.</li>
              <li>
                Use it inside higher-level cells/tissues (e.g.{" "}
                <code>AlloyGallery</code> or a product grid) which handle
                actions.
              </li>
              <li>
                For interactive cards with buttons and OutputObject, keep using{" "}
                <code>AlloyCardAction</code> or other action-oriented tissues.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
