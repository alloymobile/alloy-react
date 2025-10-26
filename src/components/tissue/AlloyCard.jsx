// src/components/tissue/AlloyCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { generateId, TagObject } from "../../utils/idHelper.js";

/**
 * CardObject
 *
 * The base data model for AlloyCard.
 *
 * Rules:
 * - `body` is REQUIRED.
 * - `header` and `footer` are OPTIONAL.
 * - `fields` is OPTIONAL (array of TagObject to render inside body).
 * - `link` is OPTIONAL. If present, ONLY the body becomes clickable.
 *
 * This model does NOT try to interpret or mutate nested configs
 * beyond wrapping them in TagObject. If you pass a plain object for
 * header/body/footer/fields[i], we wrap it. If you pass instances,
 * we use them as-is.
 */
export class CardObject {
  /**
   * @param {Object} card
   * @param {string} [card.id]                - DOM id for the card wrapper
   * @param {string} [card.className]         - wrapper classes (outer .card)
   * @param {string} [card.link]              - optional href/route; used to wrap ONLY the body
   * @param {TagObject|Object} [card.header]  - optional top section (className defaults "card-header")
   * @param {TagObject|Object} card.body      - REQUIRED main content section (className defaults "card-body")
   * @param {TagObject|Object} [card.footer]  - optional bottom section (className defaults "card-footer")
   * @param {Array<TagObject|Object>} [card.fields] - optional array of content blocks inside body
   */
  constructor(card = {}) {
    // required: body
    if (!card.body) {
      throw new Error("CardObject requires `body`.");
    }

    // id / wrapper classes / link
    this.id = card.id ?? generateId("card");
    this.className = card.className ?? "card border m-2 shadow";
    this.link = typeof card.link === "string" ? card.link : "";

    // normalize header/body/footer to TagObject instances
    // header is optional
    if (card.header instanceof TagObject) {
      this.header = card.header;
    } else if (card.header) {
      const tmp = new TagObject(card.header);
      // default header class if caller didn't provide one
      tmp.className = tmp.className || "card-header";
      this.header = tmp;
    } else {
      this.header = undefined;
    }

    // body is required
    if (card.body instanceof TagObject) {
      this.body = card.body;
    } else {
      const tmp = new TagObject(card.body);
      tmp.className = tmp.className || "card-body";
      this.body = tmp;
    }

    // footer is optional
    if (card.footer instanceof TagObject) {
      this.footer = card.footer;
    } else if (card.footer) {
      const tmp = new TagObject(card.footer);
      tmp.className = tmp.className || "card-footer";
      this.footer = tmp;
    } else {
      this.footer = undefined;
    }

    // fields: optional array of TagObject
    const rawFields = Array.isArray(card.fields) ? card.fields : [];
    this.fields = rawFields.map((blk) => {
      if (blk instanceof TagObject) {
        return blk;
      }
      const tmp = new TagObject(blk || {});
      // no default className here beyond empty; caller controls layout inside body
      return tmp;
    });
  }
}

/**
 * AlloyCard
 *
 * Props:
 *  - card: CardObject (required)
 *
 * Behavior:
 *  - Renders optional header/footer.
 *  - Renders body, then each field inside body.
 *  - If `card.link` truthy, ONLY the body section is wrapped in <Link>.
 *    The header and footer are never clickable.
 */
export function AlloyCard({ card }) {
  if (!card || !(card instanceof CardObject)) {
    throw new Error("AlloyCard requires `card` (CardObject instance).");
  }

  // --- header section (render only if provided and has a name or class) ---
  const headerSection = card.header ? (
    <div
      id={card.header.id}
      className={card.header.className || "card-header"}
      aria-label={card.header.name}
    >
      {card.header.name}
    </div>
  ) : null;

  // --- body content WITHOUT link wrapping yet ---
  const bodyInner = (
    <div
      id={card.body.id}
      className={card.body.className || "card-body"}
      aria-label={card.body.name}
    >
      {/* Body main label/content */}
      {card.body.name && <div className="mb-2">{card.body.name}</div>}

      {/* Body extra fields (if any) */}
      {card.fields.map((field) => (
        <div
          key={field.id}
          id={field.id}
          className={field.className}
          aria-label={field.name}
        >
          {field.name}
        </div>
      ))}
    </div>
  );

  // --- bodySection (ONLY this can become a <Link>) ---
  const bodySection = card.link ? (
    <Link
      to={card.link}
      className="text-decoration-none d-block"
      aria-label={card.body?.name}
    >
      {bodyInner}
    </Link>
  ) : (
    bodyInner
  );

  // --- footer section (render only if provided) ---
  const footerSection = card.footer ? (
    <div
      id={card.footer.id}
      className={card.footer.className || "card-footer"}
      aria-label={card.footer.name}
    >
      {card.footer.name}
    </div>
  ) : null;

  // --- final card layout ---
  // IMPORTANT:
  // We NEVER wrap the whole card in <Link>.
  // The outer shell is always a <div>.
  // Only the bodySection is link-wrapped if link exists.
  return (
    <div id={card.id} className={card.className}>
      {headerSection}
      {bodySection}
      {footerSection}
    </div>
  );
}

export default AlloyCard;
