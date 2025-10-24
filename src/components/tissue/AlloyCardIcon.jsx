// src/components/tissue/AlloyCardIcon.jsx
import React from "react";
import { Link } from "react-router-dom";
import { AlloyIcon, IconObject } from "../cell/AlloyIcon.jsx";
import { CardItem, CardObject } from "./AlloyCard.jsx";

/* ---------------------- CardIconObject model ---------------------- */
/**
 * CardIconObject extends CardObject with icon, iconClass, and textClass
 *
 * Fields:
 *  - id, className, link, body, fields  (from CardObject)
 *  - icon: IconObject (shown in left column)
 *  - iconClass: string (wrapper class for icon column)
 *  - textClass: string (wrapper class for text/right column)
 */
export class CardIconObject extends CardObject {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *   link?: string,
   *   body?: CardItem|object,
   *   fields?: Array<CardItem|object>,
   *   icon?: IconObject|object,
   *   iconClass?: string,
   *   textClass?: string
   * }=} res
   */
  constructor(res = {}) {
    super(res);

    // hydrate icon sub-object
    this.icon =
      res.icon instanceof IconObject
        ? res.icon
        : new IconObject(res.icon || {});

    // visual classes
    this.iconClass =
      res.iconClass ??
      "col-4 icon-lg rounded-circle bg-warning text-white mb-0";

    this.textClass = res.textClass ?? "col-8";
  }
}

/* ---------------------- Component ---------------------- */
/**
 * Props:
 *  - cardIcon: CardIconObject (required)
 *
 * Behavior:
 *  - If `cardIcon.link` is truthy, wrap whole thing in <Link>.
 *  - Otherwise just render <div>.
 *
 */
export function AlloyCardIcon({ cardIcon }) {
  if (!cardIcon || !(cardIcon instanceof CardIconObject)) {
    throw new Error("AlloyCardIcon requires `cardIcon` (CardIconObject instance).");
  }

  // inner body portion
  const bodyContent = (
    <div
      id={cardIcon.body.id}
      className={cardIcon.body.className}
      aria-label={cardIcon.body.name}
    >
      <div className="row m-0">
        {/* icon column */}
        <div className={cardIcon.iconClass}>
          {/* Render the icon object */}
          <AlloyIcon icon={cardIcon.icon} />
        </div>

        {/* text column */}
        <div className={cardIcon.textClass}>
          <div className="row p-1">
            {cardIcon.fields.map((field) =>
              field?.show ? (
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
    </div>
  );

  // wrap the card in Link or plain div, same as AlloyCard
  return cardIcon.link ? (
    <Link
      id={cardIcon.id}
      to={cardIcon.link}
      className={cardIcon.className + " text-decoration-none"}
    >
      {bodyContent}
    </Link>
  ) : (
    <div id={cardIcon.id} className={cardIcon.className}>
      {bodyContent}
    </div>
  );
}

export default AlloyCardIcon;
