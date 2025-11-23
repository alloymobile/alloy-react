// src/components/tissue/AlloyCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { generateId, BlockObject } from "../../utils/idHelper.js";
import AlloyIcon from "../cell/AlloyIcon.jsx";

/* ------------------------------------------------------------------
 * CardObject
 *
 * Card semantics:
 *  - header:  optional BlockObject
 *  - body:    required BlockObject
 *  - fields:  required BlockObject[] (at least 1)
 *  - footer:  optional BlockObject
 *  - link:    optional string (wraps ONLY the body in <Link>)
 * ------------------------------------------------------------------ */

export class CardObject {
  /**
   * @param {Object} card
   */
  constructor(card = {}) {
    this.id = card.id ?? generateId("card");
    this.className = card.className ?? "card border m-2 shadow";

    // link: clicking body navigates here (optional)
    this.link = typeof card.link === "string" ? card.link : "";

    // header (optional)
    const rawHeader = card.header ?? {};
    this.header =
      rawHeader instanceof BlockObject
        ? rawHeader
        : new BlockObject(rawHeader);

    // body (required)
    const rawBody = card.body ?? {};
    this.body =
      rawBody instanceof BlockObject ? rawBody : new BlockObject(rawBody);

    // fields (required, at least 1)
    const rawFields = Array.isArray(card.fields) ? card.fields : [];
    if (rawFields.length === 0) {
      throw new Error(
        "CardObject requires at least one field in `fields`."
      );
    }
    this.fields = rawFields.map((f) =>
      f instanceof BlockObject ? f : new BlockObject(f || {})
    );

    // footer (optional)
    const rawFooter = card.footer ?? {};
    this.footer =
      rawFooter instanceof BlockObject
        ? rawFooter
        : new BlockObject(rawFooter);
  }
}

/* ------------------------------------------------------------------
 * AlloyCard (React component)
 *
 * Layout-only:
 *  - optional header
 *  - required body + fields grid
 *  - optional footer
 *  - if card.link → body is wrapped in <Link> (header/footer not clickable)
 * ------------------------------------------------------------------ */

export function AlloyCard({ card }) {
  if (!card || !(card instanceof CardObject)) {
    throw new Error("AlloyCard requires `card` (CardObject instance).");
  }

  /* ----- header (optional) ----- */
  const shouldRenderHeader =
    card.header && (card.header.hasText() || card.header.className?.trim());

  const headerSection = shouldRenderHeader ? (
    <div
      id={card.header.id}
      className={card.header.className || "card-header py-2 fw-semibold"}
      aria-label={card.header.ariaLabel}
    >
      {card.header.name}
    </div>
  ) : null;

  /* ----- body inner: grid of fields ----- */
  const bodyInner = (
    <div
      id={card.body.id}
      className={card.body.className || "card-body"}
      aria-label={card.body.ariaLabel}
    >
      <div className="row g-2">
        {card.fields.map((field) => {
          if (!field) return null;

          const key = field.id;
          const colClass = field.colClass || "col-12";

          return (
            <div key={key} className={colClass}>
              <div
                id={field.id}
                className={field.className}
                aria-label={field.ariaLabel}
              >
                {field.hasLogo() ? (
                  // Logo-only field
                  <img
                    src={field.logo.imageUrl}
                    alt={field.logo.alt}
                    width={field.logo.width}
                    height={field.logo.height}
                    className={field.logo.className}
                  />
                ) : field.hasIcon() ? (
                  // Icon-only field
                  <AlloyIcon icon={field.icon} />
                ) : field.hasText() ? (
                  // Text-only field
                  <span>{field.name}</span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ----- body section: optionally wrapped in <Link> ----- */
  const bodySection = card.link ? (
    <Link
      to={card.link}
      className="text-decoration-none d-block"
      aria-label={card.body.ariaLabel}
    >
      {bodyInner}
    </Link>
  ) : (
    bodyInner
  );

  /* ----- footer (optional) ----- */
  const shouldRenderFooter =
    card.footer &&
    (card.footer.hasText() || card.footer.className?.trim().length);

  const footerSection = shouldRenderFooter ? (
    <div
      id={card.footer.id}
      className={
        card.footer.className ||
        "card-footer d-flex align-items-center justify-content-between py-2"
      }
      aria-label={card.footer.ariaLabel}
    >
      {card.footer.name && <span>{card.footer.name}</span>}
    </div>
  ) : null;

  /* ----- final card ----- */
  return (
    <div id={card.id} className={card.className}>
      {headerSection}
      {bodySection}
      {footerSection}
    </div>
  );
}

export default AlloyCard;
