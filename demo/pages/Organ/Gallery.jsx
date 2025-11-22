import React, { useMemo, useState } from "react";
import { AlloyGallery, GalleryObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------
 * DEFAULT GALLERY JSON
 * ----------------------------------------- */

const DEFAULT_GALLERY_JSON = JSON.stringify(
  {
    id: "productGallery",
    name: "Vendor Product Gallery",
    className: "container-fluid",

    search: {
      id: "gallerySearch",
      name: "gallerySearch",
      label: "Search products",
      type: "text",
      layout: "icon",
      placeholder: "Search by name, category, tag…",
      className: "form-control",
      icon: { iconClass: "fa-solid fa-magnifying-glass" }
    },

    items: [
      {
        id: "p001",
        productName: "ASTRO Septic Tank Mold",
        productSlug: "astro-septic-tank-mold",
        categoryName: "Septic Tanks",
        subcategoryName: "ASTRO™ steel form",
        shortDescription:
          "High-throughput, modular formwork with quick-release panels for accelerated cycles.",
        status: "New Equipment",
        tags: ["septic", "tank", "formwork"],
        pricing: {
          currency: "CAD",
          unitPrice: 25000,
          salePrice: 23500
        },
        media: {
          images: [
            {
              url: "https://picsum.photos/id/1018/600/400",
              altText: "ASTRO Septic Tank Mold front",
              isPrimary: true,
              sortOrder: 0
            },
            {
              url: "https://picsum.photos/id/1015/600/400",
              altText: "ASTRO Septic Tank Mold side",
              isPrimary: false,
              sortOrder: 1
            },
            {
              url: "https://picsum.photos/id/1019/600/400",
              altText: "ASTRO Septic Tank Mold detail",
              isPrimary: false,
              sortOrder: 2
            }
          ]
        }
      },
      {
        id: "p002",
        productName: "Bridge Girder Form",
        productSlug: "bridge-girder-form",
        categoryName: "Bridge Components",
        subcategoryName: "Girders",
        shortDescription:
          "Heavy-duty girder form with adjustable side rails for multi-span bridge projects.",
        status: "In Stock",
        tags: ["bridge", "girder", "form"],
        pricing: {
          currency: "CAD",
          unitPrice: 41000,
          salePrice: 0
        },
        media: {
          images: [
            {
              url: "https://picsum.photos/id/1025/600/400",
              altText: "Bridge girder form",
              isPrimary: true,
              sortOrder: 0
            },
            {
              url: "https://picsum.photos/id/1024/600/400",
              altText: "Bridge girder form closeup",
              isPrimary: false,
              sortOrder: 1
            }
          ]
        }
      },
      {
        id: "p003",
        productName: "Utility Vault Formwork",
        productSlug: "utility-vault-formwork",
        categoryName: "Utility Structures",
        subcategoryName: "Vaults",
        shortDescription:
          "Modular box forms with integrated lifting inserts and adjustable knock-outs.",
        status: "Made to Order",
        tags: ["utility", "vault"],
        pricing: {
          currency: "CAD",
          unitPrice: 32000,
          salePrice: 29900
        },
        media: {
          images: [
            {
              url: "https://picsum.photos/id/1035/600/400",
              altText: "Utility vault form",
              isPrimary: true,
              sortOrder: 0
            },
            {
              url: "https://picsum.photos/id/1033/600/400",
              altText: "Utility vault detail",
              isPrimary: false,
              sortOrder: 1
            }
          ]
        }
      }
    ]
  },
  null,
  2
);


/* -------------------------------------------
 * Demo Page
 * ----------------------------------------- */

export default function GalleryPage() {
  const [galleryJson, setGalleryJson] = useState(DEFAULT_GALLERY_JSON);
  const [galleryParseError, setGalleryParseError] = useState("");
  const [galleryOutputJson, setGalleryOutputJson] = useState(
    `// Interact with search and Add / quantity fields to see OutputObject here…`
  );

  /* -------------------------------------------
   * Build GalleryObject from JSON
   * ----------------------------------------- */

  const galleryModel = useMemo(() => {
    try {
      const raw = JSON.parse(galleryJson || "{}");
      const model = new GalleryObject(raw);
      setGalleryParseError("");
      return model;
    } catch (e) {
      setGalleryParseError(String(e.message || e));

      // Safe fallback so preview never explodes
      return new GalleryObject({
        id: "invalidGallery",
        name: "Invalid JSON (Gallery)",
        className: "container-fluid",
        search: {
          id: "invalidSearch",
          name: "invalidSearch",
          label: "Fix JSON to preview gallery…",
          type: "text",
          layout: "text",
          placeholder: "JSON parse error – fix left side."
        },
        items: []
      });
    }
  }, [galleryJson]);

  /* -------------------------------------------
   * Global output handler
   * ----------------------------------------- */

  function handleGalleryOutput(out) {
    const payload =
      out instanceof OutputObject && typeof out.toJSON === "function"
        ? out.toJSON()
        : out;

    setGalleryOutputJson(JSON.stringify(payload, null, 2));
  }

  /* -------------------------------------------
   * Helpers for reset / format / clear
   * ----------------------------------------- */

  function resetGallery() {
    setGalleryJson(DEFAULT_GALLERY_JSON);
    setGalleryOutputJson(
      `// Interact with search and Add / quantity fields to see OutputObject here…`
    );
    setGalleryParseError("");
  }

  function formatGallery() {
    try {
      const parsed = JSON.parse(galleryJson);
      setGalleryJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error already shown
    }
  }

  /* -------------------------------------------
   * Render
   * ----------------------------------------- */

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyGallery</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyGallery gallery={new GalleryObject(galleryConfig)} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyGallery
            gallery={galleryModel}
            output={handleGalleryOutput}
          />

          <div className="small text-secondary mt-2 text-center">
            <strong>Search</strong> emits{" "}
            <code>action="search"</code> with{" "}
            <code>data</code> like{" "}
            <code>{`{ "gallerySearch": "vault" }`}</code>.
            <br />
            Clicking <strong>Add</strong> or changing{" "}
            <strong>quantity</strong> emits{" "}
            <code>action="add"</code> or{" "}
            <code>action="updateQuantity"</code> with a snapshot of
            selected products:
            <code>{`{ items: [ { id, productName, quantity, unitPrice, currency, totalPrice } ] }`}</code>.
          </div>
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Gallery Input JSON (single object)
            </span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={resetGallery}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={formatGallery}
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
              galleryParseError ? "is-invalid" : ""
            }`}
            rows={24}
            value={galleryJson}
            onChange={(e) => setGalleryJson(e.target.value)}
            spellCheck={false}
          />
          {galleryParseError && (
            <div className="invalid-feedback d-block mt-1">
              {galleryParseError}
            </div>
          )}

          <div className="form-text">
            Required pieces: <code>items[].id</code>,{" "}
            <code>items[].productName</code>,{" "}
            <code>pricing.unitPrice</code> or{" "}
            <code>pricing.salePrice</code> for price calculations, and
            optional <code>media.images[]</code> for the slider.
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
              onClick={() => setGalleryOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={24}
            value={galleryOutputJson}
            onChange={(e) => setGalleryOutputJson(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            Example (add one ASTRO Septic Tank Mold):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "productGallery",
  "type": "gallery",
  "action": "add",
  "error": false,
  "data": {
    "items": [
      {
        "id": "p001",
        "productName": "ASTRO Septic Tank Mold",
        "quantity": 1,
        "unitPrice": 23500,
        "currency": "CAD",
        "totalPrice": 23500
      }
    ]
  }
}`}
            </pre>

            Example (update quantities for multiple items):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "productGallery",
  "type": "gallery",
  "action": "updateQuantity",
  "error": false,
  "data": {
    "items": [
      {
        "id": "p001",
        "productName": "ASTRO Septic Tank Mold",
        "quantity": 2,
        "unitPrice": 23500,
        "currency": "CAD",
        "totalPrice": 47000
      },
      {
        "id": "p002",
        "productName": "Bridge Girder Form",
        "quantity": 1,
        "unitPrice": 41000,
        "currency": "CAD",
        "totalPrice": 41000
      }
    ]
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
