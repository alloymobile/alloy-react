// demo/pages/tissue/CardImagePage.jsx
import React, { useMemo, useState } from "react";
import { AlloyCardImage, CardImageObject } from "../../../src";

/* ---------------------- Default editable JSON ---------------------- */
const DEFAULT_CARD_IMAGE = JSON.stringify(
  {
    id: "userCardImage01",
    className: "card border m-2 shadow",
    link: "", // set to "/product/123" etc. to make the entire card clickable

    body: {
      id: "cardImageBody",
      className: "card-body d-flex align-items-center",
      name: "Product Card With Image",
      show: true
    },

    // Logo / image block on the left
    logo: {
      imageUrl: "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
      alt: "Alloymobile",
      width: "72",
      height: "auto"
    },

    // Left and right column classNames
    logoClass:
      "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0",
    textClass: "col-8",

    // Right side rows of text
    fields: [
      {
        id: "prod-name",
        className: "fw-semibold",
        name: "Alloy Mobile Suite",
        show: true
      },
      {
        id: "prod-desc",
        className: "text-muted small",
        name: "Cross-platform UI kit",
        show: true
      },
      {
        id: "prod-price",
        className: "text-success fw-semibold",
        name: "$49 / month",
        show: true
      }
    ]
  },
  null,
  2
);

/* ---------------------- Tag snippet (display only) ---------------------- */
const TAG_SNIPPET = `<AlloyCardImage cardImage={new CardImageObject(cardImageObject)} />`;

/* ---------------------- Page ---------------------- */
export default function CardImagePage() {
  const [inputJson, setInputJson] = useState(DEFAULT_CARD_IMAGE);
  const [parseError, setParseError] = useState("");

  // Hydrate CardImageObject from JSON, fallback safely on parse error
  const model = useMemo(() => {
    try {
      setParseError("");
      const raw = JSON.parse(inputJson);
      return new CardImageObject(raw);
    } catch (e) {
      setParseError(String(e.message || e));
      return new CardImageObject({
        className: "card border m-2 shadow",
        link: "",
        body: {
          className: "card-body d-flex align-items-center",
          name: "Invalid JSON"
        },
        logo: {
          imageUrl:
            "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
          alt: "Alloymobile",
          width: "48",
          height: "auto"
        },
        fields: [
          {
            className: "text-danger",
            name: "Could not parse input JSON.",
            show: true
          }
        ]
      });
    }
  }, [inputJson]);

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyCardImage</h3>

      {/* Row 1 — Tag sample */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{TAG_SNIPPET}</code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Preview (output visual) */}
      <div className="row mb-4">
        <div className="col-12 col-lg-6">
          <AlloyCardImage cardImage={model} />
          <div className="small text-secondary mt-2">
            The left block is <code>logo</code> (imageUrl / alt / width / height).
            The right block renders each entry in <code>fields[]</code> where{" "}
            <code>show</code> is <code>true</code>.  
            Set <code>link</code> to make the entire card clickable.
          </div>
        </div>
      </div>

      {/* Row 3 — Input JSON (editable) */}
      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable)</span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setInputJson(DEFAULT_CARD_IMAGE)}
            >
              Reset
            </button>
          </div>

          <textarea
            className={`form-control font-monospace ${parseError ? "is-invalid" : ""}`}
            rows={18}
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            spellCheck={false}
          />
          {parseError && (
            <div className="invalid-feedback d-block mt-1">{parseError}</div>
          )}

          <div className="form-text">
            <code>logoClass</code> = left column wrapper,  
            <code>textClass</code> = right column wrapper.  
            <code>logo</code> controls the image source and size.
          </div>
        </div>
      </div>
    </div>
  );
}
