// src/lib/components/tissue/AlloyCardCarousel.jsx
import React from "react";
import { Link } from "react-router-dom";

import {
  generateId,
  TagObject,
  OutputObject
} from "../../utils/idHelper.js";

import AlloyButton, {
  ButtonObject
} from "../cell/AlloyButton.jsx";

/* -------------------------------------------------------
 * CardCarouselObject
 *
 * A single product card with:
 *  - category / title / subtitle (TagObject)
 *  - Bootstrap carousel for media.images[]
 *  - description (TagObject or field)
 *  - badge (TagObject)
 *  - primary action button (ButtonObject)
 *  - link (only body is clickable)
 *  - data: raw product payload (id / price / qty / etc.)
 *
 * Expected shape for media:
 *   {
 *     images: [
 *       { url, altText, isPrimary, sortOrder }
 *     ]
 *   }
 * ----------------------------------------------------- */
export class CardCarouselObject {
  constructor(card = {}) {
    const {
      id,
      className = "card h-100 rounded-3",
      link = "",
      category,
      title,
      subtitle,
      description,
      badge,
      media,
      button,
      data,
      ...rest
    } = card || {};

    this.id = id ?? generateId("card-carousel");
    this.className = className;
    this.link = typeof link === "string" ? link : "";

    this.category =
      category instanceof TagObject
        ? category
        : new TagObject(
            category || {
              name: "",
              className: "card-title mb-1"
            }
          );

    this.title =
      title instanceof TagObject
        ? title
        : new TagObject(
            title || {
              name: "",
              className: "card-title mb-1"
            }
          );

    this.subtitle =
      subtitle instanceof TagObject
        ? subtitle
        : new TagObject(
            subtitle || {
              name: "",
              className: "small text-secondary"
            }
          );

    this.description =
      description instanceof TagObject
        ? description
        : new TagObject(
            description || {
              name: "",
              className: "mt-3 text-secondary small"
            }
          );

    this.badge =
      badge instanceof TagObject
        ? badge
        : new TagObject(
            badge || {
              name: "",
              className: "badge text-bg-primary-subtle text-primary"
            }
          );

    // Media (images only for now)
    const images =
      media && Array.isArray(media.images) ? media.images : [];
    this.media = {
      images
    };

    // Button
    this.button =
      button instanceof ButtonObject
        ? button
        : button
        ? new ButtonObject(button)
        : null;

    // Raw payload (id, sku, price, qty, etc.)
    this.data = data || rest.data || {};
  }
}

/* -------------------------------------------------------
 * AlloyCardCarousel
 *
 * Props:
 *   - cardCarousel: CardCarouselObject
 *   - output?: (out: OutputObject) => void
 *
 * Output on button click:
 * {
 *   id: "<card-id>",
 *   type: "card-carousel",
 *   action: "<button name | ariaLabel | title | id>",
 *   error: false,
 *   data: {
 *     ...cardCarousel.data
 *   }
 * }
 * ----------------------------------------------------- */
export function AlloyCardCarousel({ cardCarousel, output }) {
  if (!cardCarousel || !(cardCarousel instanceof CardCarouselObject)) {
    throw new Error(
      "AlloyCardCarousel requires `cardCarousel` (CardCarouselObject instance)."
    );
  }

  const images = Array.isArray(cardCarousel.media?.images)
    ? cardCarousel.media.images
    : [];
  const hasImages = images.length > 0;
  const carouselId = `${cardCarousel.id}-carousel`;

  function resolveActionName(btn) {
    if (!btn || typeof btn !== "object") return "";
    const name =
      typeof btn.name === "string" ? btn.name.trim() : "";
    if (name) return name;

    const aria =
      typeof btn.ariaLabel === "string"
        ? btn.ariaLabel.trim()
        : "";
    if (aria) return aria;

    const title =
      typeof btn.title === "string" ? btn.title.trim() : "";
    if (title) return title;

    const id =
      typeof btn.id === "string" ? btn.id.trim() : "";
    if (id) return id;

    return "";
  }

  function handleButtonOutput(btnOut) {
    if (typeof output !== "function") return;

    // btnOut is usually OutputObject from AlloyButton; take its `data.button`.
    const payload =
      btnOut instanceof OutputObject ? btnOut.toJSON() : btnOut || {};
    const btnSelf =
      payload.data && payload.data.button
        ? payload.data.button
        : cardCarousel.button;

    const actionName = resolveActionName(btnSelf);

    const out = OutputObject.ok({
      id: cardCarousel.id,
      type: "card-carousel",
      action: actionName,
      data: {
        ...(cardCarousel.data || {})
      }
    });

    output(out);
  }

  // --- header section (category + title + subtitle) ---
  const headerBlock = (
    <div className="d-flex align-items-center gap-3">
      <div className="category-icon">
        {/* purely decorative; caller can override via category.className */}
        <i className="fa-solid fa-dumpster" />
      </div>
      <div>
        {cardCarousel.category?.name && (
          <h5 className={cardCarousel.category.className || "card-title mb-1"}>
            {cardCarousel.category.name}
          </h5>
        )}
        {cardCarousel.subtitle?.name && (
          <div
            className={
              cardCarousel.subtitle.className ||
              "small text-secondary"
            }
          >
            {cardCarousel.subtitle.name}
          </div>
        )}
      </div>
    </div>
  );

  // --- carousel section ---
  const carouselSection = hasImages ? (
    <div id={carouselId} className="carousel slide mt-3">
      <div className="carousel-inner rounded-3 overflow-hidden">
        {images.map((img, index) => (
          <div
            key={img.url || index}
            className={`carousel-item ${
              index === 0 ? "active" : ""
            }`}
          >
            <img
              src={img.url}
              className="d-block w-100"
              alt={img.altText || cardCarousel.title?.name || ""}
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

  // --- description section ---
  const descriptionSection =
    cardCarousel.description?.name ? (
      <p
        className={
          cardCarousel.description.className ||
          "mt-3 text-secondary small"
        }
      >
        {cardCarousel.description.name}
      </p>
    ) : null;

  // --- footer (badge + button) ---
  const footerSection = (
    <div className="d-flex justify-content-between align-items-center mt-2">
      <span
        className={
          cardCarousel.badge.className ||
          "badge text-bg-primary-subtle text-primary"
        }
      >
        {cardCarousel.badge.name}
      </span>

      {cardCarousel.button && (
        <AlloyButton
          button={cardCarousel.button}
          output={handleButtonOutput}
        />
      )}
    </div>
  );

  // --- bodyInner (optionally wrapped by <Link>) ---
  const bodyInner = (
    <>
      {headerBlock}
      {carouselSection}
      {descriptionSection}
      {footerSection}
    </>
  );

  const bodyWrapped = cardCarousel.link ? (
    <Link
      to={cardCarousel.link}
      className="text-decoration-none d-block"
      aria-label={cardCarousel.title?.name}
    >
      {bodyInner}
    </Link>
  ) : (
    bodyInner
  );

  return (
    <div id={cardCarousel.id} className={cardCarousel.className}>
      <div className="card-body">{bodyWrapped}</div>
    </div>
  );
}

export default AlloyCardCarousel;
