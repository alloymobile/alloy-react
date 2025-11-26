// src/lib/components/organ/AlloyGallery.jsx

import React from "react";

import { generateId } from "../../utils/idHelper.js";

// Card / Carousel / Image / Video
import AlloyCard, { CardObject } from "../tissue/AlloyCard.jsx";
import { AlloyCarousel, CarouselObject } from "../tissue/AlloyCarousel.jsx";
import AlloyImage, { ImageObject } from "../tissue/AlloyImage.jsx";
import AlloyVideo, { VideoObject } from "../tissue/AlloyVideo.jsx";

// Search + Pagination
import AlloySearch, { SearchObject } from "../cell/AlloySearch.jsx";
import AlloyPagination, {
  PaginationObject,
} from "../tissue/AlloyPagination.jsx";

/* -------------------------------------------------------
 * GalleryItemObject
 * ----------------------------------------------------- */
export class GalleryItemObject {
  constructor(item = {}) {
    const {
      id,
      type = "card",
      colClass = "col-12 col-md-6 col-lg-4",
      document,
      meta = {},
      ...rest
    } = item || {};

    this.id = id ?? generateId("gallery-item");
    this.type = ["card", "carousel", "image", "video"].includes(type)
      ? type
      : "card";
    this.colClass = colClass;

    const rawDoc = document || {};

    if (this.type === "carousel") {
      this.document =
        rawDoc instanceof CarouselObject
          ? rawDoc
          : new CarouselObject(rawDoc);
    } else if (this.type === "image") {
      this.document =
        rawDoc instanceof ImageObject ? rawDoc : new ImageObject(rawDoc);
    } else if (this.type === "video") {
      this.document =
        rawDoc instanceof VideoObject ? rawDoc : new VideoObject(rawDoc);
    } else {
      this.document =
        rawDoc instanceof CardObject ? rawDoc : new CardObject(rawDoc);
    }

    this.meta = meta && typeof meta === "object" ? meta : {};

    Object.assign(this, rest);
  }
}

/* -------------------------------------------------------
 * GalleryObject
 * ----------------------------------------------------- */
export class GalleryObject {
  constructor(cfg = {}) {
    const {
      id,
      name = "Gallery",
      className = "container-fluid",
      layoutClass = "row g-3",

      search,
      page,
      items,

      emptyMessage = "No items found.",
      ...rest
    } = cfg || {};

    this.id = id ?? generateId("gallery");
    this.name = name;
    this.className = className;
    this.layoutClass = layoutClass;

    this.search =
      search instanceof SearchObject
        ? search
        : search
        ? new SearchObject(search)
        : null;

    this.page =
      page instanceof PaginationObject
        ? page
        : page
        ? new PaginationObject(page)
        : null;

    const rawItems = Array.isArray(items) ? items : [];
    this.items = rawItems.map((it) =>
      it instanceof GalleryItemObject ? it : new GalleryItemObject(it || {})
    );

    this.emptyMessage =
      typeof emptyMessage === "string" ? emptyMessage : "No items found.";

    Object.assign(this, rest);
  }
}

/* -------------------------------------------------------
 * AlloyGallery
 * ----------------------------------------------------- */
export function AlloyGallery({ gallery, output }) {
  if (!gallery || !(gallery instanceof GalleryObject)) {
    throw new Error(
      "AlloyGallery requires `gallery` (GalleryObject instance)."
    );
  }

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  const totalCount = gallery.items.length;

  // Pass-through search output
  function handleSearchOutput(searchOut) {
    emit(searchOut);
  }

  // Pass-through pagination output
  function handlePageOutput(pageOut) {
    emit(pageOut);
  }

  function renderTile(item) {
    if (!item || !item.document) return null;

    switch (item.type) {
      case "carousel":
        return <AlloyCarousel carousel={item.document} />;
      case "image":
        return <AlloyImage image={item.document} />;
      case "video":
        return <AlloyVideo video={item.document} />;
      case "card":
      default:
        return <AlloyCard card={item.document} />;
    }
  }

  return (
    <div id={gallery.id} className={gallery.className}>
      {/* Header row */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 mt-2">
        <h4 className="mb-0">{gallery.name}</h4>
        <div className="small text-secondary">
          Showing <strong>{totalCount}</strong> item
          {totalCount === 1 ? "" : "s"}
        </div>
      </div>

      {/* Search row (centered) */}
      {gallery.search && (
        <div className="row mb-3">
          <div className="col-12 d-flex justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">
              <AlloySearch
                search={gallery.search}
                output={handleSearchOutput}
              />
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className={gallery.layoutClass}>
        {gallery.items.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info mb-0">
              {gallery.emptyMessage}
            </div>
          </div>
        ) : (
          gallery.items.map((item) => (
            <div key={item.id} className={item.colClass}>
              {renderTile(item)}
            </div>
          ))
        )}
      </div>

      {/* Pagination row (centered) */}
      {gallery.page && (
        <div className="row mt-3">
          <div className="col-12 d-flex justify-content-center">
            <AlloyPagination
              pagination={gallery.page}
              output={handlePageOutput}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AlloyGallery;
