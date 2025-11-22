import React, { useMemo, useState } from "react";

import { generateId, OutputObject } from "../../utils/idHelper.js";
import AlloyInput, { InputObject } from "../cell/AlloyInput.jsx";

/* -------------------------------------------------------
 * GalleryItemObject (single product)
 * ----------------------------------------------------- */

export class GalleryImageObject {
  constructor(img = {}) {
    this.url = img.url || "";
    this.altText = img.altText || "";
    this.isPrimary = Boolean(img.isPrimary);
    this.sortOrder = typeof img.sortOrder === "number" ? img.sortOrder : 0;
  }
}

export class GalleryItemObject {
  constructor(res = {}) {
    this.id = res.id ?? generateId("gallery-item");

    this.productName = res.productName || "";
    this.productSlug = res.productSlug || "";

    this.categoryName = res.categoryName || "";
    this.subcategoryName = res.subcategoryName || "";

    this.shortDescription = res.shortDescription || "";
    this.status = res.status || "";

    this.tags = Array.isArray(res.tags) ? res.tags : [];

    // hydrate images from media.images[]
    const mediaImages = (res.media && Array.isArray(res.media.images))
      ? res.media.images
      : [];

    const hydrated = mediaImages.map((img) => new GalleryImageObject(img));

    // sort by sortOrder; if none, keep original order
    hydrated.sort((a, b) => a.sortOrder - b.sortOrder);
    this.images = hydrated;

    const price = res.pricing || {};
    this.pricing = {
      currency: price.currency || "CAD",
      unitPrice:
        typeof price.unitPrice === "number" ? price.unitPrice : 0,
      salePrice:
        typeof price.salePrice === "number" ? price.salePrice : 0
    };

    this.data = res.data || {};
  }
}

/* -------------------------------------------------------
 * GalleryObject (top-level gallery model)
 *
 * {
 *   id: string
 *   name: string
 *   className: string
 *   search: InputObject
 *   items: GalleryItemObject[]
 * }
 * ----------------------------------------------------- */

export class GalleryObject {
  constructor(res = {}) {
    const {
      id,
      name = "Product Gallery",
      className = "container-fluid",
      search,
      items,
      ...rest
    } = res || {};

    this.id = id ?? generateId("gallery");
    this.name = name;
    this.className = className;

    this.search =
      search instanceof InputObject
        ? search
        : search
        ? new InputObject(search)
        : null;

    const rawItems = Array.isArray(items) ? items : [];
    this.items = rawItems.map((it) =>
      it instanceof GalleryItemObject
        ? it
        : new GalleryItemObject(it)
    );

    Object.assign(this, rest);
  }
}

/* -------------------------------------------------------
 * AlloyGallery
 *
 * Props:
 *   - gallery: GalleryObject
 *   - output?: (out: OutputObject) => void
 *
 * Behavior:
 *   - Search:
 *       action: "search"
 *       data: { [searchName]: value }
 *
 *   - Quantity changes / Add clicks:
 *       action: "add" | "updateQuantity"
 *       data: {
 *         items: [
 *           {
 *             id,
 *             productName,
 *             quantity,
 *             unitPrice,
 *             currency,
 *             totalPrice
 *           },
 *           ...
 *         ]
 *       }
 * ----------------------------------------------------- */

export function AlloyGallery({ gallery, output }) {
  if (!gallery || !(gallery instanceof GalleryObject)) {
    throw new Error(
      "AlloyGallery requires `gallery` (GalleryObject instance)."
    );
  }

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  // local search term
  const [searchTerm, setSearchTerm] = useState("");

  // quantity per product id
  const [quantities, setQuantities] = useState({});

  // active image index per product id
  const [activeImageIndex, setActiveImageIndex] = useState({});

  /* ----------------- helpers ----------------- */

  function buildSelectionSnapshot(nextQuantities, action) {
    const items = gallery.items
      .filter((it) => {
        const qty = nextQuantities[it.id];
        return typeof qty === "number" && qty > 0;
      })
      .map((it) => {
        const qty = nextQuantities[it.id];
        const unitPrice =
          it.pricing.salePrice > 0
            ? it.pricing.salePrice
            : it.pricing.unitPrice;
        const totalPrice = unitPrice * qty;

        return {
          id: it.id,
          productName: it.productName,
          quantity: qty,
          unitPrice,
          currency: it.pricing.currency,
          totalPrice
        };
      });

    const out = OutputObject.ok({
      id: gallery.id,
      type: "gallery",
      action: action || "updateQuantity",
      data: {
        items
      }
    });

    emit(out);
  }

  function updateQuantity(productId, newQty, actionOverride) {
    setQuantities((prev) => {
      const next = { ...prev };
      const qty = Number.isFinite(newQty) ? Math.max(0, newQty) : 0;

      if (qty <= 0) {
        delete next[productId];
      } else {
        next[productId] = qty;
      }

      // Emit snapshot after we compute next
      buildSelectionSnapshot(
        next,
        actionOverride || "updateQuantity"
      );

      return next;
    });
  }

  function handleAddClick(productId) {
    setQuantities((prev) => {
      const next = { ...prev };
      const current = Number.isFinite(prev[productId])
        ? prev[productId]
        : 0;
      const qty = current + 1;
      next[productId] = qty;

      buildSelectionSnapshot(next, "add");
      return next;
    });
  }

  function handleQuantityInputChange(productId, value) {
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed)) {
      updateQuantity(productId, 0, "updateQuantity");
    } else {
      updateQuantity(productId, parsed, "updateQuantity");
    }
  }

  function handleThumbClick(productId, idx) {
    setActiveImageIndex((prev) => ({
      ...prev,
      [productId]: idx
    }));
  }

  /* ----------------- search handling ----------------- */

  function handleSearchOutput(inputOut) {
    const payload =
      inputOut instanceof OutputObject
        ? inputOut.data || {}
        : inputOut || {};

    const { name, value } = payload;

    const term =
      typeof value === "string" ? value.trim().toLowerCase() : "";
    setSearchTerm(term);

    const data =
      name && typeof name === "string" ? { [name]: value } : {};

    const out = OutputObject.ok({
      id: gallery.id,
      type: "gallery",
      action: "search",
      data
    });

    emit(out);
  }

  /* ----------------- derived: filteredItems ----------------- */

  const filteredItems = useMemo(() => {
    if (!searchTerm) return gallery.items;

    return gallery.items.filter((it) => {
      const haystack = [
        it.productName,
        it.categoryName,
        it.subcategoryName,
        it.shortDescription,
        it.status,
        ...(it.tags || [])
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(searchTerm);
    });
  }, [gallery.items, searchTerm]);

  /* ----------------- render helpers ----------------- */

  function renderPrice(item) {
    const unitPrice =
      item.pricing.salePrice > 0
        ? item.pricing.salePrice
        : item.pricing.unitPrice;
    const currency = item.pricing.currency || "CAD";

    if (!unitPrice || unitPrice <= 0) return null;

    return (
      <div className="mt-2">
        <span className="fw-semibold">
          {currency} {unitPrice.toFixed(2)}
        </span>
      </div>
    );
  }

  function renderCard(item) {
    const images =
      item.images && item.images.length > 0
        ? item.images
        : [
            new GalleryImageObject({
              url: "",
              altText: item.productName || "No image",
              sortOrder: 0
            })
          ];

    const idx =
      typeof activeImageIndex[item.id] === "number"
        ? activeImageIndex[item.id]
        : 0;

    const active =
      images[idx] || images[0] || new GalleryImageObject({});

    const qty = quantities[item.id] || 0;

    return (
      <div
        key={item.id}
        className="col-12 col-md-6 col-lg-4 mb-3 item"
        data-category={item.categoryName}
        data-title={item.productName}
      >
        <div className="card h-100 rounded-3">
          <div className="card-body">
            {/* Header: category + product */}
            <div className="d-flex align-items-center gap-3">
              <div className="category-icon">
                <i
                  className="fa-solid fa-dumpster"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h5 className="card-title mb-1">
                  {item.categoryName || "Category"}
                </h5>
                <div className="small text-secondary">
                  {item.productName || "Product name"}
                </div>
              </div>
            </div>

            {/* Main image */}
            <div className="mt-3 w-100 text-center">
              {active.url ? (
                <img
                  src={active.url}
                  alt={active.altText || item.productName}
                  className="img-fluid rounded-3"
                  style={{
                    maxHeight: "210px",
                    objectFit: "cover"
                  }}
                />
              ) : (
                <div
                  className="bg-light border rounded-3 w-100"
                  style={{ height: "210px" }}
                />
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="d-flex gap-2 justify-content-center mt-2">
                {images.map((img, index) => (
                  <button
                    key={`${item.id}-thumb-${index}`}
                    type="button"
                    className={
                      "btn btn-sm p-0 border-0 " +
                      (index === idx
                        ? "opacity-100"
                        : "opacity-75")
                    }
                    onClick={() =>
                      handleThumbClick(item.id, index)
                    }
                    aria-label={`Image ${index + 1} for ${
                      item.productName || "product"
                    }`}
                  >
                    {img.url ? (
                      <img
                        src={img.url}
                        alt={img.altText}
                        className="rounded"
                        style={{
                          width: "52px",
                          height: "52px",
                          objectFit: "cover",
                          border:
                            index === idx
                              ? "2px solid var(--bs-primary)"
                              : "1px solid #dee2e6"
                        }}
                      />
                    ) : (
                      <div
                        className="bg-light rounded"
                        style={{
                          width: "52px",
                          height: "52px",
                          border:
                            index === idx
                              ? "2px solid var(--bs-primary)"
                              : "1px solid #dee2e6"
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <p className="mt-3 text-secondary small">
              {item.shortDescription ||
                "Product description goes here."}
            </p>

            {renderPrice(item)}

            {/* Status + quantity + Add */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="badge text-bg-primary-subtle text-primary">
                {item.status || "Available"}
              </span>

              <div className="d-flex align-items-center gap-2">
                <input
                  type="number"
                  min="0"
                  className="form-control form-control-sm"
                  style={{ width: "70px" }}
                  value={qty}
                  onChange={(e) =>
                    handleQuantityInputChange(
                      item.id,
                      e.target.value
                    )
                  }
                  aria-label={`Quantity for ${item.productName}`}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-primary addCart"
                  onClick={() => handleAddClick(item.id)}
                >
                  <i
                    className="fa-solid fa-cart-plus me-1"
                    aria-hidden="true"
                  />
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ----------------- render ----------------- */

  return (
    <div id={gallery.id} className={gallery.className}>
      <div className="d-flex justify-content-between align-items-center mb-2 mt-2">
        <h4 className="mb-0">{gallery.name}</h4>
      </div>

      {/* Search row */}
      {gallery.search && (
        <div className="row mb-3">
          <div className="col-12 col-md-6 col-lg-4">
            <AlloyInput
              input={gallery.search}
              output={handleSearchOutput}
            />
          </div>
        </div>
      )}

      {/* Card grid */}
      <div className="row">
        {filteredItems.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info mb-0">
              No products match your search.
            </div>
          </div>
        ) : (
          filteredItems.map((item) => renderCard(item))
        )}
      </div>
    </div>
  );
}

export default AlloyGallery;
