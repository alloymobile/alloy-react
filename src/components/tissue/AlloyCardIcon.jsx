// src/components/tissue/AlloyCardIcon.jsx
import React from "react";
import { Link } from "react-router-dom";
import AlloyIcon, { IconObject } from "../cell/AlloyIcon.jsx";
import { TagObject } from "../../utils/idHelper.js";
import { CardObject } from "./AlloyCard.jsx";

/**
 * CardIconObject
 *
 * Extends CardObject by adding:
 *  - icon (REQUIRED)
 *  - iconClass (styling for the icon column)
 *  - textClass (styling for the text column)
 */
export class CardIconObject extends CardObject {
  constructor(cardIcon = {}) {
    super(cardIcon); // CardObject handles id, className, link, header/body/footer/etc.

    if (!cardIcon.icon) {
      throw new Error("CardIconObject requires `icon`.");
    }

    // normalize icon to IconObject
    this.icon =
      cardIcon.icon instanceof IconObject
        ? cardIcon.icon
        : new IconObject(cardIcon.icon);

    // layout classes for the two body columns
    this.iconClass =
      cardIcon.iconClass ??
      "col-4 d-flex align-items-start justify-content-center text-warning fs-2";

    this.textClass = cardIcon.textClass ?? "col-8";
  }
}

export function AlloyCardIcon({ cardIcon }) {
  if (!cardIcon || !(cardIcon instanceof CardIconObject)) {
    throw new Error(
      "AlloyCardIcon requires `cardIcon` (CardIconObject instance)."
    );
  }

  /* ---------- header (never linkable) ---------- */
  const headerBlock = cardIcon.header?.name ? (
    <div
      id={cardIcon.header.id}
      className={cardIcon.header.className}
    >
      {cardIcon.header.name}
    </div>
  ) : null;

  /* ---------- bodyInner (visual body content only) ---------- */
  const bodyInner = (
    <div
      id={cardIcon.body.id}
      className={cardIcon.body.className}
      aria-label={cardIcon.body.name}
    >
      <div className="row m-0">
        {/* Icon column */}
        <div className={cardIcon.iconClass}>
          <AlloyIcon icon={cardIcon.icon} />
        </div>

        {/* Text column */}
        <div className={cardIcon.textClass}>
          {/* main body heading */}
          {cardIcon.body?.name ? (
            <div className="mb-1 fw-semibold">{cardIcon.body.name}</div>
          ) : null}

          {/* extra fields */}
          {cardIcon.fields.map((field) =>
            field?.name ? (
              <div
                key={field.id}
                id={field.id}
                className={field.className}
              >
                {field.name}
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );

  /* ---------- bodyBlock (ONLY this may be wrapped in <Link>) ---------- */
  const bodyBlock = cardIcon.link ? (
    <Link
      to={cardIcon.link}
      className="text-decoration-none d-block"
      aria-label={cardIcon.body?.name}
    >
      {bodyInner}
    </Link>
  ) : (
    bodyInner
  );

  /* ---------- footer (never linkable) ---------- */
  const footerBlock = cardIcon.footer?.name ? (
    <div
      id={cardIcon.footer.id}
      className={cardIcon.footer.className}
    >
      {cardIcon.footer.name}
    </div>
  ) : null;

  /* ---------- final card shell ---------- */
  // IMPORTANT:
  // We do NOT wrap the entire card in <Link>. The card root is always a <div>.
  // Only the bodyBlock can be clickable.
  return (
    <div
      id={cardIcon.id}
      className={cardIcon.className}
    >
      {headerBlock}
      {bodyBlock}
      {footerBlock}
    </div>
  );
}

export default AlloyCardIcon;
