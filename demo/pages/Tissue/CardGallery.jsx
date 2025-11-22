// demo/pages/Tissue/CardGallery.jsx
import React, { useMemo, useState } from "react";

import {
  AlloyCardGallery,
  CardGalleryObject
} from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------------------
 * DEFAULT GALLERY JSON
 * ----------------------------------------------------- */
const DEFAULT_GALLERY_JSON = JSON.stringify(
  {
    id: "demoCardGallery",
    title: "Precast Product Gallery",
    className: "container-fluid",
    search: {
      id: "gallerySearch",
      name: "productSearch",
      label: "Search Products",
      type: "text",
      layout: "icon",
      placeholder: "Search by product, category, tag…",
      icon: { iconClass: "fa-solid fa-magnifying-glass" },
      className: "form-control"
    },
    cards: [
      {
        id: "prod-astro-1000",
        link: "/products/astro-septic-tank",
        category: {
          name: "Septic Tanks",
          className: "card-title mb-1"
        },
        title: {
          name: "ASTRO™ Septic Tank Mold",
          className: "fw-semibold"
        },
        subtitle: {
          name: "Steel form — 1,000–3,000 gal",
          className: "small text-secondary"
        },
        description: {
          name: "High-throughput modular formwork with quick-release panels for accelerated cycles.",
          className: "mt-3 text-secondary small"
        },
        badge: {
          name: "New Equipment",
          className: "badge text-bg-primary-subtle text-primary"
        },
        media: {
          images: [
            {
              url: "https://picsum.photos/seed/astro1/600/350",
              altText: "ASTRO septic mold 1",
              isPrimary: true,
              sortOrder: 1
            },
            {
              url: "https://picsum.photos/seed/astro2/600/350",
              altText: "ASTRO septic mold 2",
              isPrimary: false,
              sortOrder: 2
            }
          ]
        },
        button: {
          id: "addAstro",
          name: "Add",
          className: "btn btn-sm btn-primary",
          icon: { iconClass: "fa-solid fa-cart-plus me-1" },
          title: "Add ASTRO mold",
          ariaLabel: "Add ASTRO mold"
        },
        data: {
          productId: "P-ASTRO-1000",
          productName: "ASTRO Septic Tank Mold",
          currency: "CAD",
          unitPrice: 25000,
          unitOfMeasure: "unit",
          quantity: 1
        }
      },
      {
        id: "prod-wall-panel",
        link: "/products/insulated-wall-panel",
        category: {
          name: "Wall Panels",
          className: "card-title mb-1"
        },
        title: {
          name: "Insulated Wall Panel Form",
          className: "fw-semibold"
        },
        subtitle: {
          name: "ThermalCore™ system",
          className: "small text-secondary"
        },
        description: {
          name: "Adjustable depth form for high-performance insulated wall panels.",
          className: "mt-3 text-secondary small"
        },
        badge: {
          name: "Used Equipment",
          className: "badge text-bg-warning-subtle text-warning"
        },
        media: {
          images: [
            {
              url: "https://picsum.photos/seed/wall1/600/350",
              altText: "Insulated wall panel 1",
              isPrimary: true,
              sortOrder: 1
            },
            {
              url: "https://picsum.photos/seed/wall2/600/350",
              altText: "Insulated wall panel 2",
              isPrimary: false,
              sortOrder: 2
            }
          ]
        },
        button: {
          id: "addWallPanel",
          name: "Add",
          className: "btn btn-sm btn-primary",
          icon: { iconClass: "fa-solid fa-cart-plus me-1" },
          title: "Add wall panel form",
          ariaLabel: "Add wall panel form"
        },
        data: {
          productId: "P-WALL-THERMALCORE",
          productName: "Insulated Wall Panel Form",
          currency: "CAD",
          unitPrice: 18000,
          unitOfMeasure: "unit",
          quantity: 1
        }
      }
    ]
  },
  null,
  2
);

/* -------------------------------------------------------
 * DEMO PAGE
 * ----------------------------------------------------- */
export default function CardGalleryPage() {
  const [galleryJson, setGalleryJson] = useState(
    DEFAULT_GALLERY_JSON
  );
  const [parseError, setParseError] = useState("");
  const [outputJson, setOutputJson] = useState(
    "// Type in search or click Add to see OutputObject here…"
  );

  const galleryModel = useMemo(() => {
    try {
      const raw = JSON.parse(galleryJson || "{}");
      const model = new CardGalleryObject(raw);
      setParseError("");
      return model;
    } catch (e) {
      setParseError(String(e.message || e));
      return new CardGalleryObject({
        title: "Invalid JSON (CardGallery)",
        className: "container-fluid",
        cards: []
      });
    }
  }, [galleryJson]);

  function handleGalleryOutput(out) {
    const payload =
      out instanceof OutputObject ? out.toJSON() : out;
    setOutputJson(JSON.stringify(payload, null, 2));
  }

  function resetJson() {
    setGalleryJson(DEFAULT_GALLERY_JSON);
    setOutputJson(
      "// Type in search or click Add to see OutputObject here…"
    );
    setParseError("");
  }

  function formatJson() {
    try {
      const parsed = JSON.parse(galleryJson);
      setGalleryJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error already shown
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyCardGallery</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyCardGallery gallery={new CardGalleryObject(galleryJson)} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyCardGallery
            gallery={galleryModel}
            output={handleGalleryOutput}
          />
          <div className="small text-secondary mt-2 text-center">
            <strong>Search</strong> emits{" "}
            <code>action="search"</code> with{" "}
            <code>data</code> like{" "}
            <code>{`{ "productSearch": "septic" }`}</code>.
            <br />
            <strong>Add</strong> emits{" "}
            <code>action="Add"</code> with{" "}
            <code>data</code> containing{" "}
            <code>productId</code>, <code>productName</code>,{" "}
            <code>unitPrice</code>, <code>currency</code>,{" "}
            <code>quantity</code>, etc.
          </div>
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              CardGallery Input JSON (editable)
            </span>
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
              >
                <i className="fa-solid fa-wand-magic-sparkles me-1" />
                Format
              </button>
            </div>
          </div>

          <textarea
            className={`form-control font-monospace ${
              parseError ? "is-invalid" : ""
            }`}
            rows={22}
            value={galleryJson}
            onChange={(e) => setGalleryJson(e.target.value)}
            spellCheck={false}
          />
          {parseError && (
            <div className="invalid-feedback d-block mt-1">
              {parseError}
            </div>
          )}
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
              onClick={() => setOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={outputJson}
            onChange={(e) => setOutputJson(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
