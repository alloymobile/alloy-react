// src/lib/components/tissue/AlloyImage.jsx

import React, { useState } from "react";
import { generateId, BlockObject } from "../../utils/idHelper.js";

/* -------------------------------------------------------
 * ImageMediaObject
 *
 * Single visual frame in the AlloyImage carousel:
 *  - url:       string
 *  - altText:   string
 *  - caption?:  string   // optional, if you want overlay text later
 *  - isPrimary: boolean
 *  - sortOrder: number   // used to sort thumbnails / slides
 * ----------------------------------------------------- */
export class ImageMediaObject {
  constructor(img = {}) {
    this.url = img.url || "";
    this.altText = img.altText || "";
    this.caption = img.caption || "";

    this.isPrimary = Boolean(img.isPrimary);
    this.sortOrder =
      typeof img.sortOrder === "number" ? img.sortOrder : 0;
  }
}

/* -------------------------------------------------------
 * ImageObject
 *
 * Schema aligned with CarouselObject / CardObject / BlockObject:
 *
 *   - id:        string
 *   - className: string
 *   - link?:     string           // click on main image/body → navigate
 *
 *   - header:    BlockObject      // e.g. category / meta
 *   - body:      BlockObject      // e.g. title / main text
 *   - fields:    BlockObject[]    // e.g. status, SKU, short description
 *   - footer:    BlockObject      // e.g. badge / note / small text
 *
 *   - images:    ImageMediaObject[] // REQUIRED, at least 2
 * ----------------------------------------------------- */
export class ImageObject {
  constructor(cfg = {}) {
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
    } = cfg || {};

    this.id = id ?? generateId("image");
    this.className = className;

    // Optional link: clicking main image/body can navigate here
    this.link = typeof link === "string" ? link : "";

    // header (optional BlockObject)
    const rawHeader = header ?? {};
    this.header =
      rawHeader instanceof BlockObject
        ? rawHeader
        : new BlockObject(rawHeader);

    // body (required BlockObject – title / main label)
    const rawBody = body ?? {};
    this.body =
      rawBody instanceof BlockObject
        ? rawBody
        : new BlockObject(rawBody);

    // fields (required, at least 1 BlockObject – same rule as Card/Carousel)
    const rawFields = Array.isArray(fields) ? fields : [];
    if (rawFields.length === 0) {
      throw new Error(
        "ImageObject requires at least one field in `fields`."
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
        "ImageObject requires at least 2 images in `images`."
      );
    }

    const hydrated = rawImages.map(
      (img) => new ImageMediaObject(img)
    );
    hydrated.sort((a, b) => a.sortOrder - b.sortOrder);
    this.images = hydrated;

    // Allow extensions (e.g. data, flags)
    Object.assign(this, rest);
  }
}

/* -------------------------------------------------------
 * Helper: render BlockObject
 * ----------------------------------------------------- */
function renderBlock(block, { as: Tag = "div" } = {}) {
  if (!block || !(block instanceof BlockObject)) return null;

  const hasIcon =
    block.icon && typeof block.icon.iconClass === "string";

  return (
    <Tag
      id={block.id}
      className={block.className}
      aria-label={block.ariaLabel}
    >
      {hasIcon && (
        <i
          className={`${block.icon.iconClass} me-1`}
          aria-hidden="true"
        />
      )}
      {block.name}
    </Tag>
  );
}

/* -------------------------------------------------------
 * AlloyImage
 *
 * Props:
 *   - image: ImageObject
 *
 * Behavior:
 *   - Renders a single card-like block:
 *       header → BlockObject
 *       body   → BlockObject
 *       fields → BlockObject[]
 *       footer → BlockObject
 *
 *   - Shows one big "active" image.
 *   - Shows thumbnails for all images.
 *   - Clicking a thumbnail sets that image active.
 *   - Clicking the big image advances to the next image
 *     (wrap-around at the end).
 *
 * Visual-only: no OutputObject / actions emitted.
 * ----------------------------------------------------- */
export function AlloyImage({ image }) {
  if (!image || !(image instanceof ImageObject)) {
    throw new Error(
      "AlloyImage requires `image` (ImageObject instance)."
    );
  }

  const imgs = image.images || [];

  // Initial active index: first primary image if present, else 0
  const [activeIndex, setActiveIndex] = useState(() => {
    if (!imgs.length) return 0;
    const primaryIdx = imgs.findIndex((img) => img.isPrimary);
    return primaryIdx >= 0 ? primaryIdx : 0;
  });

  const active =
    imgs[activeIndex] || imgs[0] || new ImageMediaObject({});

  function goToIndex(idx) {
    if (!imgs.length) return;
    const bounded = ((idx % imgs.length) + imgs.length) % imgs.length;
    setActiveIndex(bounded);
  }

  function goNext() {
    goToIndex(activeIndex + 1);
  }

  function handleThumbClick(idx) {
    goToIndex(idx);
  }

  const MainWrapper = image.link ? "a" : "div";
  const mainWrapperProps = image.link
    ? {
        href: image.link,
        className: "d-block text-decoration-none",
      }
    : {
        className: "d-block",
      };

  return (
    <div id={image.id} className={image.className}>
      <div className="card-body">
        {/* Header */}
        {image.header && (
          <div className="mb-2">
            {renderBlock(image.header)}
          </div>
        )}

        {/* Body (title / main text) */}
        {image.body && (
          <div className="mb-2">
            {renderBlock(image.body)}
          </div>
        )}

        {/* Main image (click to advance) */}
        <MainWrapper
          {...mainWrapperProps}
          onClick={(e) => {
            // If you want to *prevent* navigation and only cycle images:
            // if (image.link) e.preventDefault();
            goNext();
          }}
        >
          {active.url ? (
            <img
              src={active.url}
              alt={active.altText || ""}
              className="img-fluid rounded-3 w-100"
              style={{
                maxHeight: "360px",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              className="bg-light border rounded-3 w-100"
              style={{ height: "360px" }}
            />
          )}

          {active.caption && (
            <div className="mt-2 small text-secondary">
              {active.caption}
            </div>
          )}
        </MainWrapper>

        {/* Thumbnails */}
        {imgs.length > 1 && (
          <div className="d-flex gap-2 justify-content-center mt-3 flex-wrap">
            {imgs.map((img, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={`${image.id}-thumb-${index}`}
                  type="button"
                  className={
                    "btn btn-sm p-0 border-0" +
                    (isActive ? " opacity-100" : " opacity-75")
                  }
                  onClick={() => handleThumbClick(index)}
                  aria-label={`Image ${index + 1}`}
                >
                  {img.url ? (
                    <img
                      src={img.url}
                      alt={img.altText || ""}
                      className="rounded"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        border: isActive
                          ? "2px solid var(--bs-primary)"
                          : "1px solid #dee2e6",
                      }}
                    />
                  ) : (
                    <div
                      className="bg-light rounded"
                      style={{
                        width: "60px",
                        height: "60px",
                        border: isActive
                          ? "2px solid var(--bs-primary)"
                          : "1px solid #dee2e6",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Fields */}
        {image.fields && image.fields.length > 0 && (
          <div className="mt-3">
            {image.fields.map((field, idx) => (
              <div key={`${image.id}-field-${idx}`} className="mb-1">
                {renderBlock(field)}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {image.footer && (
          <div className="mt-2">
            {renderBlock(image.footer)}
          </div>
        )}
      </div>
    </div>
  );
}

export default AlloyImage;
