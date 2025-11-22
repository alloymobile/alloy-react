// demo/pages/Tissue/CardCarousel.jsx
import React, { useMemo, useState } from "react";

import {
  AlloyCardCarousel,
  CardCarouselObject
} from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------------------
 * DEFAULT JSON CONFIG
 * ----------------------------------------------------- */
const DEFAULT_CARD_JSON = JSON.stringify(
  {
    id: "demoCardCarousel",
    className: "card h-100 rounded-3 shadow-sm",
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
    button: {
      id: "addToCartBtn",
      name: "Add",
      className: "btn btn-sm btn-primary",
      icon: { iconClass: "fa-solid fa-cart-plus me-1" },
      title: "Add to cart",
      ariaLabel: "Add product to cart"
    },
    data: {
      productId: "P-1000-3K-ASTRO",
      productName: "ASTRO Septic Tank Mold",
      currency: "CAD",
      unitPrice: 25000,
      unitOfMeasure: "unit",
      quantity: 1
    }
  },
  null,
  2
);

/* -------------------------------------------------------
 * DEMO PAGE
 * ----------------------------------------------------- */
export default function CardCarouselPage() {
  const [cardJson, setCardJson] = useState(DEFAULT_CARD_JSON);
  const [parseError, setParseError] = useState("");
  const [outputJson, setOutputJson] = useState(
    "// Click Add to see OutputObject here…"
  );

  const cardModel = useMemo(() => {
    try {
      const raw = JSON.parse(cardJson || "{}");
      const model = new CardCarouselObject(raw);
      setParseError("");
      return model;
    } catch (e) {
      setParseError(String(e.message || e));
      // safe fallback
      return new CardCarouselObject({
        category: { name: "Invalid JSON" },
        subtitle: { name: "" },
        description: {
          name: "Fix JSON on the left to preview real card."
        },
        badge: { name: "Error" },
        media: { images: [] },
        button: {
          name: "Disabled",
          className: "btn btn-secondary",
          disabled: true,
          icon: { iconClass: "fa-solid fa-ban" }
        },
        data: {}
      });
    }
  }, [cardJson]);

  function handleCardOutput(out) {
    const payload =
      out instanceof OutputObject ? out.toJSON() : out;
    setOutputJson(JSON.stringify(payload, null, 2));
  }

  function resetJson() {
    setCardJson(DEFAULT_CARD_JSON);
    setOutputJson("// Click Add to see OutputObject here…");
    setParseError("");
  }

  function formatJson() {
    try {
      const parsed = JSON.parse(cardJson);
      setCardJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error already displayed
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyCardCarousel</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyCardCarousel cardCarousel={new CardCarouselObject(cardJson)} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12 col-md-6 mx-auto">
          <AlloyCardCarousel
            cardCarousel={cardModel}
            output={handleCardOutput}
          />
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              CardCarousel Input JSON (editable)
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
            value={cardJson}
            onChange={(e) => setCardJson(e.target.value)}
            spellCheck={false}
          />
          {parseError && (
            <div className="invalid-feedback d-block mt-1">
              {parseError}
            </div>
          )}
        </div>

        {/* Right: output JSON */}
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
