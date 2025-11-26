// demo/pages/Tissue/Image.jsx
import React, { useMemo, useState } from "react";

import { AlloyImage, ImageObject } from "../../../src";

/* -------------------------------------------------------
 * DEFAULT JSON CONFIG (ImageObject)
 * ----------------------------------------------------- */
const DEFAULT_IMAGE_JSON = JSON.stringify(
  {
    id: "demoImage",
    className: "card h-100 rounded-3 shadow-sm",
    link: "/projects/plant-layout",

    // BlockObject-like header (can include iconClass)
    header: {
      name: "Precast Plant Layout",
      className: "card-title mb-1",
      iconClass: "fa-solid fa-industry"
    },

    // BlockObject-like body (main title)
    body: {
      name: "ASTRO™ Wet-Cast Production Line",
      className: "fw-semibold"
    },

    // At least 1 field (BlockObject). These become info lines.
    fields: [
      {
        id: "subtitle",
        name: "3D visualization — bays, batching & curing",
        className: "small text-secondary"
      },
      {
        id: "description",
        name: "Cycle through perspectives to review crane coverage, pallet flow, and curing chamber access.",
        className: "mt-3 text-secondary small"
      },
      {
        id: "badge",
        name: "Concept Design",
        className:
          "badge text-bg-primary-subtle text-primary d-inline-block mt-2"
      }
    ],

    // Optional footer (BlockObject)
    footer: {
      id: "imageFooter",
      name: "Click the large image to cycle through views.",
      className:
        "mt-3 small text-muted d-flex justify-content-between align-items-center"
    },

    // REQUIRED: at least 2 images (ImageMediaObject[])
    images: [
      {
        url: "https://picsum.photos/seed/plant1/900/500",
        altText: "Plant layout — top-down perspective",
        caption: "Top-down view across casting bays.",
        isPrimary: true,
        sortOrder: 1
      },
      {
        url: "https://picsum.photos/seed/plant2/900/500",
        altText: "Plant layout — side elevation",
        caption: "Side elevation showing crane runway.",
        isPrimary: false,
        sortOrder: 2
      },
      {
        url: "https://picsum.photos/seed/plant3/900/500",
        altText: "Plant layout — curing chamber detail",
        caption: "Detail around curing chambers and loading.",
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
export default function ImagePage() {
  const [imageJson, setImageJson] = useState(DEFAULT_IMAGE_JSON);
  const [parseError, setParseError] = useState("");
  const [infoText, setInfoText] = useState(
    `// AlloyImage is purely visual.
// It does not emit OutputObject.
// Click the large image to go to the next frame.
// Use \`link\` to navigate to a route when needed.`
  );

  const imageModel = useMemo(() => {
    try {
      const raw = JSON.parse(imageJson || "{}");
      const model = new ImageObject(raw);
      setParseError("");
      return model;
    } catch (e) {
      setParseError(String(e.message || e));

      // Safe fallback: must satisfy ImageObject rules
      return new ImageObject({
        className: "card h-100 rounded-3 border border-danger-subtle",
        header: {
          name: "Invalid JSON",
          className: "card-title mb-1 text-danger",
          iconClass: "fa-solid fa-triangle-exclamation"
        },
        body: {
          name: "Fix JSON on the left to preview the real image card.",
          className: "small text-secondary"
        },
        fields: [
          {
            id: "fallback-line",
            name: "This is a fallback AlloyImage card.",
            className: "small text-secondary"
          }
        ],
        footer: {
          name: "ImageObject still requires fields[] and at least 2 images.",
          className: "mt-2 small text-muted"
        },
        images: [
          {
            url: "https://picsum.photos/seed/fallback1/900/500",
            altText: "Fallback image 1",
            caption: "Fallback primary image.",
            sortOrder: 1
          },
          {
            url: "https://picsum.photos/seed/fallback2/900/500",
            altText: "Fallback image 2",
            caption: "Fallback secondary image.",
            sortOrder: 2
          }
        ]
      });
    }
  }, [imageJson]);

  function resetJson() {
    setImageJson(DEFAULT_IMAGE_JSON);
    setParseError("");
    setInfoText(
      `// AlloyImage is purely visual.
// It does not emit OutputObject.
// Click the large image to go to the next frame.
// Use \`link\` to navigate to a route when needed.`
    );
  }

  function formatJson() {
    try {
      const parsed = JSON.parse(imageJson);
      setImageJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error already shown
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyImage</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyImage image={new ImageObject(imageObject)} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12 col-md-8 mx-auto">
          <AlloyImage image={imageModel} />
        </div>
      </div>

      {/* JSON in / Info out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Image Input JSON (editable)</span>
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
            value={imageJson}
            onChange={(e) => setImageJson(e.target.value)}
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
                <code>BlockObject</code>-style blocks (title/meta).
              </li>
              <li>
                <code>fields[]</code> → at least one line of text (subtitle,
                description, status, etc.).
              </li>
              <li>
                <code>images[]</code> → at least 2 images to cycle through.
              </li>
              <li>
                Optional <code>footer</code> for helper text or tags.
              </li>
              <li>
                <code>link</code> → when set, the main image/body is wrapped in{" "}
                <code>&lt;a&gt;</code> to that route (click also advances
                images).
              </li>
            </ul>
          </div>
        </div>

        {/* Right: info / docs (no OutputObject) */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Notes (AlloyImage is visual only)
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
            This component is intended for visual galleries and hero visuals:
            <ul className="mb-0">
              <li>No quantity controls, no OutputObject events.</li>
              <li>
                Use it to showcase multiple frames of the same product, layout,
                or drawing.
              </li>
              <li>
                For interactive actions (add to cart, CTAs, etc.), combine with
                action-oriented tissues like{" "}
                <code>AlloyCardAction</code> or higher-level organs.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
