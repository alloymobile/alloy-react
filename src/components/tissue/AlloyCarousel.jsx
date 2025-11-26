// src/lib/components/tissue/AlloyCarousel.jsx
import React from "react";
import { Link } from "react-router-dom";

import { generateId, BlockObject } from "../../utils/idHelper.js";

/* -------------------------------------------------------
 * CarouselImageObject
 * ----------------------------------------------------- */
export class CarouselImageObject {
  constructor(img = {}) {
    this.url = img.url || "";
    this.altText = img.altText || "";
    this.isPrimary = Boolean(img.isPrimary);
    this.sortOrder = typeof img.sortOrder === "number" ? img.sortOrder : 0;
  }
}

/* -------------------------------------------------------
 * CarouselObject
 *
 * Common card-like shape aligned with CardObject / BlockObject:
 *   - id: string
 *   - className: string
 *   - link?: string                // click body → navigate
 *
 *   - header: BlockObject          // e.g. category + icon
 *   - body: BlockObject            // e.g. product title
 *   - fields: BlockObject[]        // e.g. SKU, status, description lines
 *   - footer: BlockObject          // e.g. badge / price text
 *
 * Extras for carousel (visual only, no actions):
 *   - images: CarouselImageObject[]   // REQUIRED, at least 2
 * ----------------------------------------------------- */
export class CarouselObject {
  constructor(card = {}) {
    const {
      id,
      className = "card h-100 rounded-3",
      link,

      header,
      body,
      fields,
      footer,

      images,
      ...rest
    } = card || {};

    this.id = id ?? generateId("carousel");
    this.className = className;

    // link: clicking body navigates here (optional)
    this.link = typeof link === "string" ? link : "";

    // header (optional, BlockObject)
    const rawHeader = header ?? {};
    this.header =
      rawHeader instanceof BlockObject
        ? rawHeader
        : new BlockObject(rawHeader);

    // body (required BlockObject – title / main text)
    const rawBody = body ?? {};
    this.body =
      rawBody instanceof BlockObject ? rawBody : new BlockObject(rawBody);

    // fields (required, at least 1 BlockObject – same rule as CardObject)
    const rawFields = Array.isArray(fields) ? fields : [];
    if (rawFields.length === 0) {
      throw new Error(
        "CarouselObject requires at least one field in `fields`."
      );
    }
    this.fields = rawFields.map((f) =>
      f instanceof BlockObject ? f : new BlockObject(f || {})
    );

    // footer (optional BlockObject)
    const rawFooter = footer ?? {};
    this.footer =
      rawFooter instanceof BlockObject
        ? rawFooter
        : new BlockObject(rawFooter);

    // images: REQUIRED, at least 2
    const rawImages = Array.isArray(images) ? images : [];
    if (rawImages.length < 2) {
      throw new Error(
        "CarouselObject requires at least 2 images in `images`."
      );
    }
    const hydrated = rawImages.map((img) => new CarouselImageObject(img));
    hydrated.sort((a, b) => a.sortOrder - b.sortOrder);
    this.images = hydrated;

    Object.assign(this, rest);
  }
}

/* -------------------------------------------------------
 * AlloyCarousel
 *
 * Purely visual + navigation:
 *   - NO OutputObject, NO CTA button
 *   - Optional <Link> around body if carousel.link is set
 * ----------------------------------------------------- */
export function AlloyCarousel({ carousel }) {
  if (!carousel || !(carousel instanceof CarouselObject)) {
    throw new Error(
      "AlloyCarousel requires `carousel` (CarouselObject instance)."
    );
  }

  const images = Array.isArray(carousel.images) ? carousel.images : [];
  const hasImages = images.length > 0;
  const carouselId = `${carousel.id}-carousel`;

  const { header, body, fields, footer } = carousel;

  /* ----------------- sections ----------------- */

  // Header: icon + header text + body as subtitle
  const headerBlock = (
    <div className="d-flex align-items-center gap-3">
      {header?.icon && (
        <span className="category-icon">
          <i
            className={header.icon.iconClass}
            aria-hidden="true"
          />
        </span>
      )}
      <div>
        {header?.name && (
          <h5
            className={
              header.className || "card-title mb-1"
            }
          >
            {header.name}
          </h5>
        )}
        {body?.name && (
          <div
            className={
              body.className || "small text-secondary"
            }
          >
            {body.name}
          </div>
        )}
      </div>
    </div>
  );

  // Carousel for images
  const carouselSection = hasImages ? (
    <div id={carouselId} className="carousel slide mt-3">
      <div className="carousel-inner rounded-3 overflow-hidden">
        {images.map((img, index) => (
          <div
            key={img.url || index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={img.url}
              className="d-block w-100"
              alt={img.altText || body?.name || header?.name || ""}
              style={{ objectFit: "cover", maxHeight: "220px" }}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            />
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            />
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  ) : null;

  // Fields as info lines
  const fieldsSection =
    Array.isArray(fields) && fields.length > 0 ? (
      <ul className="list-unstyled mt-3 mb-0 small text-secondary">
        {fields.map((f) =>
          f.name ? (
            <li
              key={f.id}
              className={f.className || ""}
              aria-label={f.ariaLabel || f.name}
            >
              {f.name}
            </li>
          ) : null
        )}
      </ul>
    ) : null;

  // Footer block
  const footerSection =
    footer && (footer.name || footer.className) ? (
      <div
        id={footer.id}
        className={
          footer.className ||
          "mt-2 small text-muted d-flex align-items-center justify-content-between flex-wrap gap-2"
        }
        aria-label={footer.ariaLabel || footer.name}
      >
        {footer.name}
      </div>
    ) : null;

  // Body content we optionally wrap in <Link>
  const bodyInner = (
    <>
      {headerBlock}
      {carouselSection}
      {fieldsSection}
      {footerSection}
    </>
  );

  const bodyWrapped = carousel.link ? (
    <Link
      to={carousel.link}
      className="text-decoration-none d-block"
      aria-label={body?.name || header?.name || ""}
    >
      {bodyInner}
    </Link>
  ) : (
    bodyInner
  );

  return (
    <div id={carousel.id} className={carousel.className}>
      <div className="card-body">{bodyWrapped}</div>
    </div>
  );
}

export default AlloyCarousel;
