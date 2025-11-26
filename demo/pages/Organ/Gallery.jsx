// demo/pages/Organ/Gallery.jsx
import React, { useMemo, useState } from "react";

import {
  AlloyGallery,
  GalleryObject,
} from "../../../src"; // assumes you re-export these from src/index

import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------------------
 * DEFAULT GALLERY JSONs (one per type)
 * ----------------------------------------------------- */

const DEFAULT_CARD_GALLERY_JSON = JSON.stringify(
  {
    id: "demoCardGallery",
    name: "Card Gallery",
    className: "container py-3",
    layoutClass: "row g-3",
    emptyMessage: "No card items found.",

    // Optional search (centered)
    search: {
      search: {
        id: "cardGallerySearch",
        name: "cardQuery",
        type: "text",
        layout: "icon",
        label: "Search cards",
        placeholder: "Search card titles…",
        icon: {
          iconClass: "fa-solid fa-magnifying-glass",
        },
        className: "form-control",
      },
      minChars: 0,
      debounceMs: 300,
    },

    // Optional pagination
    page: {
      name: "Card gallery",
      totalPages: 5,
      totalElements: 50,
      size: 10,
      number: 0,
      numberOfElements: 10,
    },

    items: [
      {
        type: "card",
        colClass: "col-12 col-md-6 col-lg-4",
        document: {
          id: "card1",
          className: "card h-100 rounded-3 shadow-sm",
          link: "/products/astro-septic-tank",
          header: {
            name: "Septic Tanks",
            className: "card-title mb-1",
            iconClass: "fa-solid fa-dumpster",
          },
          body: {
            name: "ASTRO™ Septic Tank Mold",
            className: "fw-semibold",
          },
          fields: [
            {
              id: "subtitle",
              name: "Steel form — 1,000–3,000 gal",
              className: "small text-secondary",
            },
            {
              id: "description",
              name: "High-throughput modular formwork with quick-release panels.",
              className: "mt-3 text-secondary small",
            },
            {
              id: "badge",
              name: "New Equipment",
              className:
                "badge text-bg-primary-subtle text-primary d-inline-block mt-2",
            },
          ],
          footer: {
            id: "cardFooter1",
            name: "Click card body to view product details.",
            className: "mt-3 small text-muted",
          },
        },
      },
      {
        type: "card",
        colClass: "col-12 col-md-6 col-lg-4",
        document: {
          id: "card2",
          className: "card h-100 rounded-3 shadow-sm",
          link: "/products/bridge-barrier",
          header: {
            name: "Bridge Barriers",
            className: "card-title mb-1",
            iconClass: "fa-solid fa-road-barrier",
          },
          body: {
            name: "PX-Guard™ Barrier Mold",
            className: "fw-semibold",
          },
          fields: [
            {
              id: "subtitle",
              name: "Highway & bridge parapets",
              className: "small text-secondary",
            },
            {
              id: "description",
              name: "Modular forms for DOT-compliant barrier profiles.",
              className: "mt-3 text-secondary small",
            },
          ],
          footer: {
            id: "cardFooter2",
            name: "Ideal for barrier production cells.",
            className: "mt-3 small text-muted",
          },
        },
      },
    ],
  },
  null,
  2
);

const DEFAULT_CAROUSEL_GALLERY_JSON = JSON.stringify(
  {
    id: "demoCarouselGallery",
    name: "Carousel Gallery",
    className: "container py-3",
    layoutClass: "row g-3",
    emptyMessage: "No carousel items found.",

    search: {
      search: {
        id: "carouselGallerySearch",
        name: "carouselQuery",
        type: "text",
        layout: "icon",
        label: "Search carousels",
        placeholder: "Search carousel titles…",
        icon: {
          iconClass: "fa-solid fa-magnifying-glass",
        },
        className: "form-control",
      },
      minChars: 0,
      debounceMs: 300,
    },

    page: {
      name: "Carousel gallery",
      totalPages: 3,
      totalElements: 30,
      size: 10,
      number: 0,
      numberOfElements: 10,
    },

    items: [
      {
        type: "carousel",
        colClass: "col-12 col-md-6 col-lg-4",
        document: {
          id: "carousel1",
          className: "card h-100 rounded-3 shadow-sm",
          link: "/products/astro-septic-tank",
          header: {
            name: "Septic Tanks",
            className: "card-title mb-1",
            iconClass: "fa-solid fa-dumpster",
          },
          body: {
            name: "ASTRO™ Septic Tank Mold",
            className: "fw-semibold",
          },
          fields: [
            {
              id: "subtitle",
              name: "Steel form — 1,000–3,000 gal",
              className: "small text-secondary",
            },
            {
              id: "description",
              name: "High-throughput modular formwork with quick-release panels.",
              className: "mt-3 text-secondary small",
            },
            {
              id: "badge",
              name: "New Equipment",
              className:
                "badge text-bg-primary-subtle text-primary d-inline-block mt-2",
            },
          ],
          footer: {
            id: "carouselFooter1",
            name: "Swipe through mold perspectives.",
            className:
              "mt-3 small text-muted d-flex justify-content-between align-items-center",
          },
          images: [
            {
              url: "https://picsum.photos/seed/septic1/600/350",
              altText: "Septic tank mold — angle 1",
              isPrimary: true,
              sortOrder: 1,
            },
            {
              url: "httpsum.photos/seed/septic2/600/350",
              altText: "Septic tank mold — angle 2",
              isPrimary: false,
              sortOrder: 2,
            },
            {
              url: "https://picsum.photos/seed/septic3/600/350",
              altText: "Septic tank mold — angle 3",
              isPrimary: false,
              sortOrder: 3,
            },
          ],
        },
      },
      {
        type: "carousel",
        colClass: "col-12 col-md-6 col-lg-4",
        document: {
          id: "carousel2",
          className: "card h-100 rounded-3 shadow-sm",
          link: "/products/tilt-table",
          header: {
            name: "Floor Slabs",
            className: "card-title mb-1",
            iconClass: "fa-solid fa-border-all",
          },
          body: {
            name: "PX-Tilt™ Casting Table",
            className: "fw-semibold",
          },
          fields: [
            {
              id: "subtitle",
              name: "Tilting table for hollowcore and solid slabs.",
              className: "small text-secondary",
            },
            {
              id: "description",
              name: "Hydraulic tilting, vibrators and integrated side rails.",
              className: "mt-3 text-secondary small",
            },
          ],
          footer: {
            id: "carouselFooter2",
            name: "Cycle through table angles & configurations.",
            className: "mt-3 small text-muted",
          },
          images: [
            {
              url: "https://picsum.photos/seed/tilt1/600/350",
              altText: "Tilting table — flat position",
              isPrimary: true,
              sortOrder: 1,
            },
            {
              url: "https://picsum.photos/seed/tilt2/600/350",
              altText: "Tilting table — 45 degrees",
              isPrimary: false,
              sortOrder: 2,
            },
          ],
        },
      },
    ],
  },
  null,
  2
);

const DEFAULT_IMAGE_GALLERY_JSON = JSON.stringify(
  {
    id: "demoImageGallery",
    name: "Image Gallery",
    className: "container py-3",
    layoutClass: "row g-3",
    emptyMessage: "No image items found.",

    search: {
      search: {
        id: "imageGallerySearch",
        name: "imageQuery",
        type: "text",
        layout: "icon",
        label: "Search images",
        placeholder: "Search image titles…",
        icon: {
          iconClass: "fa-solid fa-magnifying-glass",
        },
        className: "form-control",
      },
      minChars: 0,
      debounceMs: 300,
    },

    page: {
      name: "Image gallery",
      totalPages: 2,
      totalElements: 12,
      size: 6,
      number: 0,
      numberOfElements: 6,
    },

    items: [
      {
        type: "image",
        colClass: "col-12 col-md-6 col-lg-6",
        document: {
          id: "image1",
          className: "card h-100 rounded-3 shadow-sm",
          link: "/projects/plant-layout",
          header: {
            name: "Precast Plant Layout",
            className: "card-title mb-1",
            iconClass: "fa-solid fa-industry",
          },
          body: {
            name: "ASTRO™ Wet-Cast Production Line",
            className: "fw-semibold",
          },
          fields: [
            {
              id: "subtitle",
              name: "3D visualization — bays, batching & curing",
              className: "small text-secondary",
            },
            {
              id: "description",
              name: "Cycle through perspectives to review crane coverage, pallet flow, and curing chamber access.",
              className: "mt-3 text-secondary small",
            },
            {
              id: "badge",
              name: "Concept Design",
              className:
                "badge text-bg-primary-subtle text-primary d-inline-block mt-2",
            },
          ],
          footer: {
            id: "imageFooter1",
            name: "Click the large image to cycle through views.",
            className:
              "mt-3 small text-muted d-flex justify-content-between align-items-center",
          },
          images: [
            {
              url: "https://picsum.photos/seed/plant1/900/500",
              altText: "Plant layout — top-down perspective",
              caption: "Top-down view across casting bays.",
              isPrimary: true,
              sortOrder: 1,
            },
            {
              url: "https://picsum.photos/seed/plant2/900/500",
              altText: "Plant layout — side elevation",
              caption: "Side elevation showing crane runway.",
              isPrimary: false,
              sortOrder: 2,
            },
            {
              url: "https://picsum.photos/seed/plant3/900/500",
              altText: "Plant layout — curing chamber detail",
              caption: "Detail around curing chambers and loading.",
              isPrimary: false,
              sortOrder: 3,
            },
          ],
        },
      },
    ],
  },
  null,
  2
);

const DEFAULT_VIDEO_GALLERY_JSON = JSON.stringify(
  {
    id: "demoVideoGallery",
    name: "Video Gallery",
    className: "container py-3",
    layoutClass: "row g-3",
    emptyMessage: "No video items found.",

    search: {
      search: {
        id: "videoGallerySearch",
        name: "videoQuery",
        type: "text",
        layout: "icon",
        label: "Search videos",
        placeholder: "Search video titles…",
        icon: {
          iconClass: "fa-solid fa-magnifying-glass",
        },
        className: "form-control",
      },
      minChars: 0,
      debounceMs: 300,
    },

    page: {
      name: "Video gallery",
      totalPages: 1,
      totalElements: 6,
      size: 3,
      number: 0,
      numberOfElements: 3,
    },

    items: [
      {
        type: "video",
        colClass: "col-12 col-md-6 col-lg-6",
        document: {
          id: "video1",
          className: "card h-100 rounded-3 shadow-sm",
          header: {
            name: "Precast Training Session",
            className: "card-title mb-1",
            iconClass: "fa-solid fa-chalkboard-teacher",
          },
          body: {
            name: "ASTRO™ Wet-Cast Line — Operator Overview",
            className: "fw-semibold",
          },
          fields: [
            {
              id: "subtitle",
              name: "Cycle times, safety zones and crane interface.",
              className: "small text-secondary",
            },
            {
              id: "description",
              name: "Use this clip to onboard new operators on batching sequence, casting order and curing workflow.",
              className: "mt-3 text-secondary small",
            },
            {
              id: "badge",
              name: "Internal Training",
              className:
                "badge text-bg-primary-subtle text-primary d-inline-block mt-2",
            },
          ],
          footer: {
            id: "videoFooter1",
            name: "Embed this training clip into your LMS.",
            className:
              "mt-3 small text-muted d-flex justify-content-between align-items-center",
          },
          video: {
            src: "https://www.w3schools.com/html/mov_bbb.mp4",
            poster: "https://picsum.photos/seed/videoposter/900/500",
            caption:
              "Sample training clip — replace with your own precast walkthrough.",
            controls: true,
            autoPlay: false,
            loop: false,
            muted: false,
            playsInline: true,
          },
        },
      },
      {
        type: "video",
        colClass: "col-12 col-md-6 col-lg-6",
        document: {
          id: "video2",
          className: "card h-100 rounded-3 shadow-sm",
          header: {
            name: "Plant Walkthrough",
            className: "card-title mb-1",
            iconClass: "fa-solid fa-person-walking",
          },
          body: {
            name: "PX-Line™ Dry-Cast Carousel — Tour",
            className: "fw-semibold",
          },
          fields: [
            {
              id: "subtitle",
              name: "Loading, demolding and curing carousel overview.",
              className: "small text-secondary",
            },
            {
              id: "description",
              name: "Use this clip in marketing presentations for plant tours and investor decks.",
              className: "mt-3 text-secondary small",
            },
            {
              id: "badge",
              name: "Marketing",
              className:
                "badge text-bg-success-subtle text-success d-inline-block mt-2",
            },
          ],
          footer: {
            id: "videoFooter2",
            name: "Share as a short in your sales portal.",
            className: "mt-3 small text-muted",
          },
          video: {
            src: "https://www.w3schools.com/html/movie.mp4",
            poster: "https://picsum.photos/seed/videoposter2/900/500",
            caption: "Demo plant walkthrough — replace with your own content.",
            controls: true,
            autoPlay: false,
            loop: false,
            muted: false,
            playsInline: true,
          },
        },
      },
    ],
  },
  null,
  2
);

/* -------------------------------------------------------
 * DEMO PAGE WITH FOUR TABS
 * ----------------------------------------------------- */

export default function GalleryDemoPage() {
  const [activeTab, setActiveTab] = useState("card");

  const [cardJson, setCardJson] = useState(DEFAULT_CARD_GALLERY_JSON);
  const [carouselJson, setCarouselJson] = useState(
    DEFAULT_CAROUSEL_GALLERY_JSON
  );
  const [imageJson, setImageJson] = useState(DEFAULT_IMAGE_GALLERY_JSON);
  const [videoJson, setVideoJson] = useState(DEFAULT_VIDEO_GALLERY_JSON);

  const [cardError, setCardError] = useState("");
  const [carouselError, setCarouselError] = useState("");
  const [imageError, setImageError] = useState("");
  const [videoError, setVideoError] = useState("");

  const [infoText, setInfoText] = useState(
    `// AlloyGallery renders Card / Carousel / Image / Video tiles.
// Use items[].type = "card" | "carousel" | "image" | "video".
// search and page are optional but follow their own OutputObject contracts.`
  );

  /* ----- Models (one per tab) ----- */

  const cardGalleryModel = useMemo(() => {
    try {
      const raw = JSON.parse(cardJson || "{}");
      const model = new GalleryObject(raw);
      setCardError("");
      return model;
    } catch (e) {
      setCardError(String(e.message || e));

      return new GalleryObject({
        name: "Card Gallery (fallback)",
        emptyMessage: "Fix JSON on the left to preview card gallery.",
        items: [
          {
            type: "card",
            colClass: "col-12 col-md-6 col-lg-4",
            document: {
              header: {
                name: "Invalid JSON",
                className: "card-title mb-1 text-danger",
                iconClass: "fa-solid fa-triangle-exclamation",
              },
              body: {
                name: "This is a fallback card item.",
                className: "small text-secondary",
              },
              fields: [
                {
                  id: "fallback-card-field",
                  name: "CardObject requires fields[].",
                  className: "small text-secondary",
                },
              ],
              footer: {
                name: "Update JSON to see your real configuration.",
                className: "mt-2 small text-muted",
              },
            },
          },
        ],
      });
    }
  }, [cardJson]);

  const carouselGalleryModel = useMemo(() => {
    try {
      const raw = JSON.parse(carouselJson || "{}");
      const model = new GalleryObject(raw);
      setCarouselError("");
      return model;
    } catch (e) {
      setCarouselError(String(e.message || e));

      return new GalleryObject({
        name: "Carousel Gallery (fallback)",
        emptyMessage: "Fix JSON on the left to preview carousel gallery.",
        items: [
          {
            type: "carousel",
            colClass: "col-12 col-md-6 col-lg-4",
            document: {
              header: {
                name: "Invalid JSON",
                className: "card-title mb-1 text-danger",
                iconClass: "fa-solid fa-triangle-exclamation",
              },
              body: {
                name: "Fallback AlloyCarousel item.",
                className: "small text-secondary",
              },
              fields: [
                {
                  id: "fallback-carousel-field",
                  name: "CarouselObject requires fields[] and images[].",
                  className: "small text-secondary",
                },
              ],
              images: [
                {
                  url: "https://picsum.photos/seed/fallback1/600/350",
                  altText: "Fallback image 1",
                  sortOrder: 1,
                },
                {
                  url: "https://picsum.photos/seed/fallback2/600/350",
                  altText: "Fallback image 2",
                  sortOrder: 2,
                },
              ],
            },
          },
        ],
      });
    }
  }, [carouselJson]);

  const imageGalleryModel = useMemo(() => {
    try {
      const raw = JSON.parse(imageJson || "{}");
      const model = new GalleryObject(raw);
      setImageError("");
      return model;
    } catch (e) {
      setImageError(String(e.message || e));

      return new GalleryObject({
        name: "Image Gallery (fallback)",
        emptyMessage: "Fix JSON on the left to preview image gallery.",
        items: [
          {
            type: "image",
            colClass: "col-12 col-md-6 col-lg-6",
            document: {
              header: {
                name: "Invalid JSON",
                className: "card-title mb-1 text-danger",
                iconClass: "fa-solid fa-triangle-exclamation",
              },
              body: {
                name: "Fallback AlloyImage item.",
                className: "small text-secondary",
              },
              fields: [
                {
                  id: "fallback-image-field",
                  name: "ImageObject requires fields[] and at least 2 images[].",
                  className: "small text-secondary",
                },
              ],
              images: [
                {
                  url: "https://picsum.photos/seed/fallbackimage1/900/500",
                  altText: "Fallback image 1",
                  caption: "Fallback primary image.",
                  sortOrder: 1,
                },
                {
                  url: "https://picsum.photos/seed/fallbackimage2/900/500",
                  altText: "Fallback image 2",
                  caption: "Fallback secondary image.",
                  sortOrder: 2,
                },
              ],
            },
          },
        ],
      });
    }
  }, [imageJson]);

  const videoGalleryModel = useMemo(() => {
    try {
      const raw = JSON.parse(videoJson || "{}");
      const model = new GalleryObject(raw);
      setVideoError("");
      return model;
    } catch (e) {
      setVideoError(String(e.message || e));

      return new GalleryObject({
        name: "Video Gallery (fallback)",
        emptyMessage: "Fix JSON on the left to preview video gallery.",
        items: [
          {
            type: "video",
            colClass: "col-12 col-md-6 col-lg-6",
            document: {
              header: {
                name: "Invalid JSON",
                className: "card-title mb-1 text-danger",
                iconClass: "fa-solid fa-triangle-exclamation",
              },
              body: {
                name: "Fallback AlloyVideo item.",
                className: "small text-secondary",
              },
              fields: [
                {
                  id: "fallback-video-field",
                  name: "VideoObject requires fields[] and video.src.",
                  className: "small text-secondary",
                },
              ],
              video: {
                src: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster:
                  "https://picsum.photos/seed/fallbackvideo/900/500",
                caption: "Fallback sample video.",
              },
            },
          },
        ],
      });
    }
  }, [videoJson]);

  /* ----- Helpers ----- */

  function resetJson(tab) {
    switch (tab) {
      case "card":
        setCardJson(DEFAULT_CARD_GALLERY_JSON);
        setCardError("");
        break;
      case "carousel":
        setCarouselJson(DEFAULT_CAROUSEL_GALLERY_JSON);
        setCarouselError("");
        break;
      case "image":
        setImageJson(DEFAULT_IMAGE_GALLERY_JSON);
        setImageError("");
        break;
      case "video":
        setVideoJson(DEFAULT_VIDEO_GALLERY_JSON);
        setVideoError("");
        break;
      default:
        break;
    }
    setInfoText(
      `// AlloyGallery renders Card / Carousel / Image / Video tiles.
// items[].type controls which renderer is used.
// search (AlloySearch) and page (AlloyPagination) are optional.`
    );
  }

  function formatJson(tab) {
    try {
      let parsed;
      if (tab === "card") parsed = JSON.parse(cardJson);
      else if (tab === "carousel") parsed = JSON.parse(carouselJson);
      else if (tab === "image") parsed = JSON.parse(imageJson);
      else parsed = JSON.parse(videoJson);

      const pretty = JSON.stringify(parsed, null, 2);

      if (tab === "card") setCardJson(pretty);
      else if (tab === "carousel") setCarouselJson(pretty);
      else if (tab === "image") setImageJson(pretty);
      else setVideoJson(pretty);
    } catch {
      // ignore; parse error already shown
    }
  }

  const activeModel =
    activeTab === "card"
      ? cardGalleryModel
      : activeTab === "carousel"
      ? carouselGalleryModel
      : activeTab === "image"
      ? imageGalleryModel
      : videoGalleryModel;

  const activeJson =
    activeTab === "card"
      ? cardJson
      : activeTab === "carousel"
      ? carouselJson
      : activeTab === "image"
      ? imageJson
      : videoJson;

  const activeError =
    activeTab === "card"
      ? cardError
      : activeTab === "carousel"
      ? carouselError
      : activeTab === "image"
      ? imageError
      : videoError;

  const titleMap = {
    card: "Card Gallery",
    carousel: "Carousel Gallery",
    image: "Image Gallery",
    video: "Video Gallery",
  };

  /* ----- Render ----- */

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">
        AlloyGallery (Cards / Carousel / Image / Video)
      </h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyGallery gallery={new GalleryObject(galleryObject)} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            type="button"
            className={
              "nav-link " + (activeTab === "card" ? "active" : "")
            }
            onClick={() => setActiveTab("card")}
          >
            <i className="fa-regular fa-square me-1" aria-hidden="true" />
            Cards
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={
              "nav-link " +
              (activeTab === "carousel" ? "active" : "")
            }
            onClick={() => setActiveTab("carousel")}
          >
            <i className="fa-solid fa-images me-1" aria-hidden="true" />
            Carousel
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={
              "nav-link " + (activeTab === "image" ? "active" : "")
            }
            onClick={() => setActiveTab("image")}
          >
            <i className="fa-regular fa-image me-1" aria-hidden="true" />
            Image
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={
              "nav-link " + (activeTab === "video" ? "active" : "")
            }
            onClick={() => setActiveTab("video")}
          >
            <i className="fa-solid fa-play-circle me-1" aria-hidden="true" />
            Video
          </button>
        </li>
      </ul>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyGallery
            gallery={activeModel}
            output={(out) => {
              let payload = out;
              try {
                if (
                  out instanceof OutputObject &&
                  typeof out.toJSON === "function"
                ) {
                  payload = out.toJSON();
                }
                setInfoText(
                  `// Last event from AlloyGallery (search / pagination)\n` +
                    JSON.stringify(payload, null, 2)
                );
              } catch {
                setInfoText(String(out));
              }
            }}
          />
        </div>
      </div>

      {/* JSON in / Info out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              {titleMap[activeTab]} Input JSON (editable)
            </span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => resetJson(activeTab)}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => formatJson(activeTab)}
                title="Format JSON"
              >
                <i
                  className="fa-solid fa-wand-magic-sparkles me-1"
                  aria-hidden="true"
                />
                Format
              </button>
            </div>
          </div>

          <textarea
            className={`form-control font-monospace ${
              activeError ? "is-invalid" : ""
            }`}
            rows={22}
            value={activeJson}
            onChange={(e) => {
              const v = e.target.value;
              if (activeTab === "card") setCardJson(v);
              else if (activeTab === "carousel") setCarouselJson(v);
              else if (activeTab === "image") setImageJson(v);
              else setVideoJson(v);
            }}
            spellCheck={false}
          />
          {activeError && (
            <div className="invalid-feedback d-block mt-1">
              {activeError}
            </div>
          )}

          <div className="form-text">
            Required pieces (per tab use case):
            <ul className="mb-0">
              <li>
                <code>items[]</code> → each entry has <code>type</code>,{" "}
                <code>colClass</code>, and a <code>document</code> matching its
                base object (Card / Carousel / Image / Video).
              </li>
              <li>
                <code>search</code> → optional, uses{" "}
                <code>SearchObject</code> and <code>AlloySearch</code>.
              </li>
              <li>
                <code>page</code> → optional, uses{" "}
                <code>PaginationObject</code> and{" "}
                <code>AlloyPagination</code>.
              </li>
            </ul>
          </div>
        </div>

        {/* Right: info / docs */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Notes (AlloyGallery + {titleMap[activeTab]})
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => setInfoText("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={infoText}
            onChange={(e) => setInfoText(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            This demo shows how the same <code>AlloyGallery</code> organ can
            host different document types:
            <ul className="mb-0">
              <li>
                Use <code>type: "card"</code> for simple content cards.
              </li>
              <li>
                Use <code>type: "carousel"</code> for image carousels.
              </li>
              <li>
                Use <code>type: "image"</code> when you want a hero image +
                thumbnails.
              </li>
              <li>
                Use <code>type: "video"</code> for embedded training /
                marketing clips.
              </li>
              <li>
                <code>search</code> and <code>page</code> are optional, and
                their OutputObjects are passed through unchanged so parents can
                wire server-side filtering and paging.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
