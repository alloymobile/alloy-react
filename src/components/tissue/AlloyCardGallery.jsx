// src/lib/components/tissue/AlloyCardGallery.jsx
import React from "react";

import { OutputObject, generateId } from "../../utils/idHelper.js";

import AlloyInput, {
  InputObject
} from "../cell/AlloyInput.jsx";

import {
  AlloyCardCarousel,
  CardCarouselObject
} from "./AlloyCardCarousel.jsx";

/* -------------------------------------------------------
 * CardGalleryObject
 *
 * Container for:
 *  - title (string)
 *  - className
 *  - search: InputObject (search box)
 *  - cards[]: CardCarouselObject[]
 * ----------------------------------------------------- */
export class CardGalleryObject {
  constructor(cfg = {}) {
    const {
      id,
      title = "Product Gallery",
      className = "container-fluid",
      search,
      cards,
      ...rest
    } = cfg || {};

    this.id = id ?? generateId("card-gallery");
    this.title = title;
    this.className = className;

    this.search =
      search instanceof InputObject
        ? search
        : search
        ? new InputObject(search)
        : null;

    const rawCards = Array.isArray(cards) ? cards : [];
    this.cards = rawCards.map((c) =>
      c instanceof CardCarouselObject
        ? c
        : new CardCarouselObject(c || {})
    );

    this.data = rest.data || {};
  }
}

/* -------------------------------------------------------
 * AlloyCardGallery
 *
 * Props:
 *   - gallery: CardGalleryObject
 *   - output?: (out: OutputObject) => void
 *
 * Output:
 *
 *   Search:
 *   {
 *     id: "<gallery-id>",
 *     type: "card-gallery",
 *     action: "search",
 *     error: false,
 *     data: { "<searchName>": "<value>" }
 *   }
 *
 *   Card button (forwarded from AlloyCardCarousel):
 *   {
 *     id: "<gallery-id>",
 *     type: "card-gallery",
 *     action: "<button action>",
 *     error: false,
 *     data: {
 *       ...cardCarousel.data
 *     }
 *   }
 * ----------------------------------------------------- */
export function AlloyCardGallery({ gallery, output }) {
  if (!gallery || !(gallery instanceof CardGalleryObject)) {
    throw new Error(
      "AlloyCardGallery requires `gallery` (CardGalleryObject instance)."
    );
  }

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  // SEARCH
  function handleSearchOutput(inputOut) {
    const payload =
      inputOut instanceof OutputObject
        ? inputOut.toJSON()
        : inputOut || {};
    const field = payload.data?.name ?? gallery.search?.name ?? "";
    const value = payload.data?.value;

    const data =
      field && typeof field === "string" ? { [field]: value } : {};

    const out = OutputObject.ok({
      id: gallery.id,
      type: "card-gallery",
      action: "search",
      data
    });

    emit(out);
  }

  // CARD CLICK
  function handleCardOutput(cardOut) {
    if (!cardOut) return;

    const payload =
      cardOut instanceof OutputObject
        ? cardOut.toJSON()
        : cardOut || {};

    const out = OutputObject.ok({
      id: gallery.id,
      type: "card-gallery",
      action: payload.action || "select",
      data: {
        ...(payload.data || {})
      }
    });

    emit(out);
  }

  return (
    <div className={gallery.className}>
      <h3 className="mb-3 text-center">{gallery.title}</h3>

      {/* Search bar */}
      {gallery.search && (
        <div className="row mb-3">
          <div className="col-12 col-md-8 mx-auto">
            <AlloyInput
              input={gallery.search}
              output={handleSearchOutput}
            />
          </div>
        </div>
      )}

      {/* Cards grid */}
      <div className="row g-3">
        {gallery.cards.map((card) => (
          <div
            key={card.id}
            className="col-12 col-md-6 col-lg-4"
          >
            <AlloyCardCarousel
              cardCarousel={card}
              output={handleCardOutput}
            />
          </div>
        ))}

        {gallery.cards.length === 0 && (
          <div className="col-12 text-center text-secondary small">
            No products to display.
          </div>
        )}
      </div>
    </div>
  );
}

export default AlloyCardGallery;
