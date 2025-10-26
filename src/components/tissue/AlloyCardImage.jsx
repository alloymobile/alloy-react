// src/components/tissue/AlloyCardImage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { generateId, TagObject } from "../../utils/idHelper.js";

/**
 * LogoObject
 */
export class LogoObject {
  constructor(logo = {}) {
    this.id = logo.id ?? generateId("logo");

    // safe defaults
    this.imageUrl =
      logo.imageUrl ??
      "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png";

    this.alt = logo.alt ?? "Alloymobile";
    this.width = logo.width ?? "72px";
    this.height = logo.height ?? "auto";
  }
}

/**
 * CardImageObject
 *
 * Matches our standard card contract:
 *  - id, className
 *  - link?: string  (ONLY body becomes clickable if present)
 *  - header?: TagObject
 *  - body:   TagObject (required-ish; we normalize even if empty)
 *  - footer?: TagObject
 *  - fields?: TagObject[]
 *
 * Plus:
 *  - logo: LogoObject (required for this variant)
 *  - logoClass, textClass for body layout columns
 */
export class CardImageObject {
  constructor(cfg = {}) {
    // outer card shell
    this.id = cfg.id ?? generateId("card");
    this.className = cfg.className ?? "card border m-2 shadow";

    // IMPORTANT: link now only applies to body, not the full card
    this.link = typeof cfg.link === "string" ? cfg.link : "";

    // normalize header/body/footer to TagObject
    this.header =
      cfg.header instanceof TagObject
        ? cfg.header
        : new TagObject(cfg.header || {});

    this.body =
      cfg.body instanceof TagObject
        ? cfg.body
        : new TagObject(cfg.body || {});

    this.footer =
      cfg.footer instanceof TagObject
        ? cfg.footer
        : new TagObject(cfg.footer || {});

    // fields[] -> TagObject[]
    const rawFields = Array.isArray(cfg.fields) ? cfg.fields : [];
    this.fields = rawFields.map((f) =>
      f instanceof TagObject ? f : new TagObject(f || {})
    );

    // required visual block
    this.logo =
      cfg.logo instanceof LogoObject
        ? cfg.logo
        : new LogoObject(cfg.logo || {});

    // body row column classes
    this.logoClass =
      cfg.logoClass ??
      "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0";

    this.textClass = cfg.textClass ?? "col-8";
  }
}

/**
 * AlloyCardImage
 *
 * Props:
 *   - cardImage: CardImageObject (required)
 *
 * Behavior:
 *   - Outer wrapper is ALWAYS <div className="card ...">.
 *   - Header is never wrapped in <Link>.
 *   - Footer is never wrapped in <Link>.
 *   - ONLY the body block is wrapped in <Link> if cardImage.link is provided.
 */
export function AlloyCardImage({ cardImage }) {
  if (!(cardImage instanceof CardImageObject)) {
    throw new Error(
      "AlloyCardImage requires `cardImage` (CardImageObject instance)."
    );
  }

  /* ----- header (optional if .name is non-empty) ----- */
  const headerBlock =
    cardImage.header?.name ? (
      <div
        id={cardImage.header.id}
        className={
          cardImage.header.className || "card-header py-2 fw-semibold"
        }
        aria-label={cardImage.header.name}
      >
        {cardImage.header.name}
      </div>
    ) : null;

  /* ----- bodyInner (visual content, no link wrapping yet) ----- */
  const bodyInner = (
    <div
      id={cardImage.body.id}
      className={cardImage.body.className || "card-body py-3"}
      aria-label={cardImage.body.name}
    >
      <div className="row m-0">
        {/* LEFT: logo / image */}
        <div className={cardImage.logoClass}>
          <img
            src={cardImage.logo.imageUrl}
            alt={cardImage.logo.alt}
            style={{
              width: cardImage.logo.width,
              height: cardImage.logo.height,
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* RIGHT: text content */}
        <div className={cardImage.textClass}>
          <div className="row p-1">
            {/* body.name as "headline"/title line */}
            {cardImage.body?.name ? (
              <div className="fw-semibold mb-1">
                {cardImage.body.name}
              </div>
            ) : null}

            {/* additional rows from fields[] */}
            {cardImage.fields.map((fieldObj) =>
              fieldObj?.name ? (
                <div
                  key={fieldObj.id ?? generateId("card-image-field")}
                  id={fieldObj.id}
                  className={fieldObj.className || ""}
                >
                  {fieldObj.name}
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );

  /* ----- bodySection (ONLY this becomes clickable) ----- */
  const bodySection = cardImage.link ? (
    <Link
      to={cardImage.link}
      className="text-decoration-none d-block"
      aria-label={cardImage.body?.name}
    >
      {bodyInner}
    </Link>
  ) : (
    bodyInner
  );

  /* ----- footer (optional if .name is non-empty) ----- */
  const footerBlock =
    cardImage.footer?.name ? (
      <div
        id={cardImage.footer.id}
        className={
          cardImage.footer.className ||
          "card-footer small text-muted py-2"
        }
        aria-label={cardImage.footer.name}
      >
        {cardImage.footer.name}
      </div>
    ) : null;

  /* ----- final outer shell ----- */
  // We NEVER wrap the entire card in <Link>.
  // We ALWAYS render <div className="card ..."> as the root.
  return (
    <div
      id={cardImage.id}
      className={cardImage.className}
    >
      {headerBlock}
      {bodySection}
      {footerBlock}
    </div>
  );
}

export default AlloyCardImage;
