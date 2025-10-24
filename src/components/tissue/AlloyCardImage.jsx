// src/components/tissue/AlloyCardImage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { CardItem, CardObject } from "./AlloyCard.jsx";

/* ---------------------- LogoObject ---------------------- */
/**
 * Represents the image/logo block shown on the left side.
 *
 * Fields:
 *  - imageUrl: string (src)
 *  - alt: string (alt text)
 *  - width: string (css width — e.g. "72", "auto", "64px")
 *  - height: string (css height)
 */
export class LogoObject {
  /**
   * @param {{
   *   imageUrl?: string,
   *   alt?: string,
   *   width?: string,
   *   height?: string
   * }=} res
   */
  constructor(res = {}) {
    if (res && Object.keys(res).length > 0) {
      this.imageUrl =
        res.imageUrl ??
        "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png";
      this.alt = res.alt ?? "Alloymobile";
      this.width = res.width ?? "auto";
      this.height = res.height ?? "auto";
    } else {
      this.imageUrl =
        "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png";
      this.alt = "Alloymobile";
      this.width = "72";
      this.height = "auto";
    }
  }
}

/* ---------------------- CardImageObject model ---------------------- */
/**
 * CardImageObject extends CardObject with:
 *  - logo: LogoObject (left column visual, instead of icon)
 *  - logoClass: string (class for the left logo column wrapper)
 *  - textClass: string (class for the right text column wrapper)
 *
 * Inherits:
 *  - id, className, link, body, fields
 */
export class CardImageObject extends CardObject {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *   link?: string,
   *   body?: CardItem|object,
   *   fields?: Array<CardItem|object>,
   *   logo?: LogoObject|object,
   *   logoClass?: string,
   *   textClass?: string
   * }=} res
   */
  constructor(res = {}) {
    super(res);

    // hydrate logo sub-object
    this.logo =
      res.logo instanceof LogoObject
        ? res.logo
        : new LogoObject(res.logo || {});

    // left column styling (similar to iconClass we used before)
    this.logoClass =
      res.logoClass ??
      "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0";

    // right column styling
    this.textClass = res.textClass ?? "col-8";
  }
}

/* ---------------------- AlloyCardImage component ---------------------- */
/**
 * Props:
 *  - cardImage: CardImageObject (required)
 *
 * Behavior:
 *  - If cardImage.link is set, wrap whole card in <Link>.
 *  - Otherwise render as a static div.
 *
 * Layout:
 */
export function AlloyCardImage({ cardImage }) {
  if (!cardImage || !(cardImage instanceof CardImageObject)) {
    throw new Error("AlloyCardImage requires `cardImage` (CardImageObject instance).");
  }

  // inner body content (logo column + text column)
  const bodyContent = (
    <div
      id={cardImage.body.id}
      className={cardImage.body.className}
      aria-label={cardImage.body.name}
    >
      <div className="row m-0">
        {/* left logo column */}
        <div className={cardImage.logoClass}>
          <img
            src={cardImage.logo.imageUrl}
            alt={cardImage.logo.alt}
            style={{
              width: cardImage.logo.width,
              height: cardImage.logo.height,
              maxWidth: "100%", // keep image from overflowing
              objectFit: "contain"
            }}
          />
        </div>

        {/* right text column */}
        <div className={cardImage.textClass}>
          <div className="row p-1">
            {cardImage.fields.map((field) =>
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

  // wrap card in <Link> if there's a link, otherwise plain <div>
  return cardImage.link ? (
    <Link
      id={cardImage.id}
      to={cardImage.link}
      className={cardImage.className + " text-decoration-none"}
    >
      {bodyContent}
    </Link>
  ) : (
    <div id={cardImage.id} className={cardImage.className}>
      {bodyContent}
    </div>
  );
}

export default AlloyCardImage;
