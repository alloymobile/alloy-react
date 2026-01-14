// demo/pages/Organ/MediaGallery.jsx
import React, { useMemo, useState } from "react";
import { AlloyMediaGallery, MediaGalleryObject } from "../../../src";

const JSON_BOOTSTRAP_MIXED = JSON.stringify(
  {
    id: "mgBootstrapMixed",
    name: "Bootstrap • Mixed (stacks on mobile)",
    className: "fw-semibold mb-2",

    layout: "bootstrap",
    columns: 6,
    rowHeight: 180,
    gap: 12,

    items: [
      {
        id: "bs-img-carousel",
        name: { name: "Catch Basin (carousel + thumbs)", href: "/products/catch-basin" },
        nameDisplay: { position: "overlay-bottom-left", className: "badge bg-dark bg-opacity-75" },
        thumbSize: 72,
        zoom: {},
        carousel: { controls: true, indicators: true, keyboard: true },
        items: [
          {
            id: "bs-img-1",
            url: "https://picsum.photos/seed/bsimg1/1200/800",
            isPrimary: true,
            thumbUrl: "https://picsum.photos/seed/bsimg1/240/160",
          },
          {
            id: "bs-img-2",
            url: "https://picsum.photos/seed/bsimg2/1200/800",
            thumbUrl: "https://picsum.photos/seed/bsimg2/240/160",
          },
        ],
      },

      {
        id: "bs-video",
        name: { name: "Training Video", href: "/training/clip-1" },
        nameDisplay: { position: "overlay-top-left", className: "badge bg-dark bg-opacity-75" },
        zoom: {},
        vid: { attrs: { autoPlay: true, loop: true, muted: true, playsInline: true, preload: "auto" } },
        items: [
          {
            id: "bs-vid-1",
            url: "https://www.w3schools.com/html/mov_bbb.mp4",
            isPrimary: true,
            thumbUrl: "https://picsum.photos/seed/bsvid1/240/160",
          },
        ],
      },

      {
        id: "bs-pdf",
        name: { name: "Spec Sheet (PDF)", href: "/docs/spec" },
        nameDisplay: { position: "overlay-bottom-left", className: "badge bg-danger" },
        zoom: {},
        items: [
          {
            id: "bs-pdf-1",
            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            isPrimary: true,
          },
        ],
      },

      {
        id: "bs-glb",
        name: { name: "Astronaut (GLB)", href: "/models/astronaut" },
        nameDisplay: { position: "below", className: "fw-semibold mt-2" },
        zoom: {},
        items: [
          {
            id: "bs-glb-1",
            url: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
            isPrimary: true,
          },
        ],
      },

      {
        id: "bs-audio",
        name: { name: "Audio Guide", href: "/media/audio" },
        nameDisplay: { position: "below", className: "fw-semibold mt-2" },
        aud: { attrs: { controls: true, preload: "metadata" } },
        items: [
          {
            id: "bs-aud-1",
            url: "https://www.w3schools.com/html/horse.mp3",
            isPrimary: true,
          },
        ],
      },
    ],
  },
  null,
  2
);

const JSON_BOOTSTRAP_AUTO = JSON.stringify(
  {
    id: "mgBootstrapAuto",
    name: "Bootstrap • Auto slideshow (images)",
    className: "fw-semibold mb-2",

    layout: "bootstrap",
    columns: 4,
    rowHeight: 180,
    gap: 12,

    items: [
      {
        id: "auto-1",
        name: { name: "Auto: Plant Tour", href: "/tour" },
        nameDisplay: { position: "overlay-bottom-left", className: "badge bg-dark bg-opacity-75" },
        zoom: {},
        auto: { enabled: true, intervalMs: 2500, pauseOnHover: true, pauseOnZoom: true, loop: true },
        items: [
          { id: "a1", url: "https://picsum.photos/seed/auto1/1200/800", isPrimary: true, thumbUrl: "https://picsum.photos/seed/auto1/240/160" },
          { id: "a2", url: "https://picsum.photos/seed/auto2/1200/800", thumbUrl: "https://picsum.photos/seed/auto2/240/160" },
          { id: "a3", url: "https://picsum.photos/seed/auto3/1200/800", thumbUrl: "https://picsum.photos/seed/auto3/240/160" },
        ],
      },
      {
        id: "auto-2",
        name: { name: "Auto: Yard", href: "/yard" },
        nameDisplay: { position: "overlay-top-left", className: "badge bg-dark bg-opacity-75" },
        zoom: {},
        auto: { enabled: true, intervalMs: 1800, pauseOnHover: true, pauseOnZoom: true, loop: true },
        items: [
          { id: "b1", url: "https://picsum.photos/seed/auto4/1200/800", isPrimary: true },
          { id: "b2", url: "https://picsum.photos/seed/auto5/1200/800" },
        ],
      },
    ],
  },
  null,
  2
);

const JSON_GRID_OVERLAYS = JSON.stringify(
  {
    id: "mgGridOverlays",
    name: "Grid • Overlay positions",
    className: "fw-semibold mb-2",

    layout: "grid",
    columns: 4,
    rowHeight: 180,
    gap: 12,

    items: [
      {
        id: "go-1",
        name: { name: "Overlay BL", href: "/x" },
        nameDisplay: { position: "overlay-bottom-left", className: "badge bg-dark bg-opacity-75" },
        zoom: {},
        items: [{ id: "go-1-1", url: "https://picsum.photos/seed/ov1/1200/800", isPrimary: true }],
      },
      {
        id: "go-2",
        name: { name: "Overlay TR", href: "/x" },
        nameDisplay: { position: "overlay-top-right", className: "badge bg-dark bg-opacity-75" },
        zoom: {},
        items: [{ id: "go-2-1", url: "https://picsum.photos/seed/ov2/1200/800", isPrimary: true }],
      },
      {
        id: "go-3",
        name: { name: "Overlay TL", href: "/x" },
        nameDisplay: { position: "overlay-top-left", className: "badge bg-dark bg-opacity-75" },
        zoom: {},
        items: [{ id: "go-3-1", url: "https://picsum.photos/seed/ov3/1200/800", isPrimary: true }],
      },
      {
        id: "go-4",
        name: { name: "Below title", href: "/x" },
        nameDisplay: { position: "below", className: "fw-semibold mt-2" },
        zoom: {},
        items: [{ id: "go-4-1", url: "https://picsum.photos/seed/ov4/1200/800", isPrimary: true }],
      },
    ],
  },
  null,
  2
);

const JSON_GRID_THUMBS = JSON.stringify(
  {
    id: "mgGridThumbs",
    name: "Grid • Carousel + thumbs",
    className: "fw-semibold mb-2",

    layout: "grid",
    columns: 6,
    rowHeight: 180,
    gap: 12,

    items: [
      {
        id: "gt-1",
        name: { name: "PX-Guard™", href: "/products/px-guard" },
        nameDisplay: { position: "overlay-bottom-left", className: "badge bg-dark bg-opacity-75" },
        thumbSize: 72,
        zoom: {},
        carousel: { controls: true, indicators: true, keyboard: true },
        items: [
          { id: "gt-1a", url: "https://picsum.photos/seed/gt1/1200/800", isPrimary: true, thumbUrl: "https://picsum.photos/seed/gt1/240/160" },
          { id: "gt-1b", url: "https://picsum.photos/seed/gt2/1200/800", thumbUrl: "https://picsum.photos/seed/gt2/240/160" },
          { id: "gt-1c", url: "https://picsum.photos/seed/gt3/1200/800", thumbUrl: "https://picsum.photos/seed/gt3/240/160" },
        ],
      },
      {
        id: "gt-2",
        name: { name: "Operator Clip", href: "/training/operator" },
        nameDisplay: { position: "overlay-top-left", className: "badge bg-dark bg-opacity-75" },
        thumbSize: 72,
        zoom: {},
        items: [
          { id: "gt-2a", url: "https://www.w3schools.com/html/movie.mp4", isPrimary: true, thumbUrl: "https://picsum.photos/seed/gtv1/240/160" },
        ],
      },
    ],
  },
  null,
  2
);

const JSON_MASONRY_COLLAGE = JSON.stringify(
  {
    id: "mgMasonryCollage",
    name: "Masonry • Collage (colSpan/rowSpan)",
    className: "fw-semibold mb-2",

    layout: "masonry",
    columns: 12,
    rowHeight: 170,
    gap: 12,

    items: [
      {
        id: "mc-1",
        colSpan: 7,
        rowSpan: 3,
        frameClassName: "h-100",
        name: { name: "Open", href: "/open" },
        nameDisplay: { position: "overlay-bottom-left", className: "badge bg-dark bg-opacity-75" },
        zoom: {},
        items: [{ id: "mc-1a", url: "https://picsum.photos/seed/mc1/1600/900", isPrimary: true }],
      },
      {
        id: "mc-2",
        colSpan: 5,
        rowSpan: 1,
        frameClassName: "h-100",
        name: { name: "View", href: "/view" },
        nameDisplay: { position: "overlay-top-right", className: "badge bg-dark bg-opacity-75" },
        zoom: {},
        items: [{ id: "mc-2a", url: "https://picsum.photos/seed/mc2/1600/900", isPrimary: true }],
      },
      {
        id: "mc-3",
        colSpan: 3,
        rowSpan: 1,
        frameClassName: "h-100",
        name: { name: "Go", href: "/go" },
        nameDisplay: { position: "overlay-top-left", className: "badge bg-dark bg-opacity-75" },
        zoom: {},
        items: [{ id: "mc-3a", url: "https://picsum.photos/seed/mc3/1200/900", isPrimary: true }],
      },
      {
        id: "mc-4",
        colSpan: 4,
        rowSpan: 2,
        frameClassName: "h-100",
        name: { name: "Explore", href: "/explore" },
        nameDisplay: { position: "overlay-bottom-left", className: "badge bg-light text-dark bg-opacity-75" },
        zoom: {},
        items: [{ id: "mc-4a", url: "https://picsum.photos/seed/mc4/1200/900", isPrimary: true }],
      },
      {
        id: "mc-5",
        colSpan: 5,
        rowSpan: 2,
        frameClassName: "h-100",
        name: { name: "Open", href: "/open-2" },
        nameDisplay: { position: "overlay-top-right", className: "badge bg-dark bg-opacity-75" },
        zoom: {},
        items: [{ id: "mc-5a", url: "https://picsum.photos/seed/mc5/1200/900", isPrimary: true }],
      },
      {
        id: "mc-6",
        colSpan: 12,
        rowSpan: 2,
        frameClassName: "h-100",
        name: { name: "Details", href: "/details" },
        nameDisplay: { position: "overlay-bottom-left", className: "badge bg-dark bg-opacity-75" },
        zoom: {},
        items: [{ id: "mc-6a", url: "https://picsum.photos/seed/mc6/1800/900", isPrimary: true }],
      },
    ],
  },
  null,
  2
);

const JSON_MASONRY_MIXED = JSON.stringify(
  {
    id: "mgMasonryMixed",
    name: "Masonry • Mixed media",
    className: "fw-semibold mb-2",

    layout: "masonry",
    columns: 12,
    rowHeight: 170,
    gap: 12,

    items: [
      {
        id: "mm-1",
        colSpan: 6,
        rowSpan: 2,
        frameClassName: "h-100",
        name: { name: "Video", href: "/v" },
        nameDisplay: { position: "overlay-bottom-left", className: "badge bg-dark bg-opacity-75" },
        zoom: {},
        items: [{ id: "mm-1a", url: "https://www.w3schools.com/html/mov_bbb.mp4", isPrimary: true }],
      },
      {
        id: "mm-2",
        colSpan: 6,
        rowSpan: 2,
        frameClassName: "h-100",
        name: { name: "PDF", href: "/p" },
        nameDisplay: { position: "overlay-bottom-left", className: "badge bg-danger" },
        zoom: {},
        items: [{ id: "mm-2a", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", isPrimary: true }],
      },
      {
        id: "mm-3",
        colSpan: 7,
        rowSpan: 3,
        frameClassName: "h-100",
        name: { name: "Image", href: "/i" },
        nameDisplay: { position: "overlay-bottom-left", className: "badge bg-dark bg-opacity-75" },
        zoom: {},
        items: [{ id: "mm-3a", url: "https://picsum.photos/seed/mm3/1600/900", isPrimary: true }],
      },
      {
        id: "mm-4",
        colSpan: 5,
        rowSpan: 3,
        frameClassName: "h-100",
        name: { name: "GLB", href: "/g" },
        nameDisplay: { position: "below", className: "fw-semibold mt-2" },
        zoom: {},
        items: [{ id: "mm-4a", url: "https://modelviewer.dev/shared-assets/models/Astronaut.glb", isPrimary: true }],
      },
    ],
  },
  null,
  2
);

const JSON_LIST_MIXED = JSON.stringify(
  {
    id: "mgListMixed",
    name: "List • Mixed (below titles)",
    className: "fw-semibold mb-2",

    layout: "list",
    columns: 12,
    rowHeight: 180,
    gap: 12,

    items: [
      {
        id: "lm-1",
        name: { name: "Gallery Image", href: "/media/images" },
        nameDisplay: { position: "below", className: "fw-semibold mt-2" },
        zoom: {},
        items: [{ id: "lm-1a", url: "https://picsum.photos/seed/lm1/1200/800", isPrimary: true }],
      },
      {
        id: "lm-2",
        name: { name: "Training Video", href: "/training" },
        nameDisplay: { position: "below", className: "fw-semibold mt-2" },
        zoom: {},
        items: [{ id: "lm-2a", url: "https://www.w3schools.com/html/movie.mp4", isPrimary: true }],
      },
      {
        id: "lm-3",
        name: { name: "Spec PDF", href: "/docs/spec" },
        nameDisplay: { position: "below", className: "fw-semibold mt-2" },
        zoom: {},
        items: [{ id: "lm-3a", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", isPrimary: true }],
      },
    ],
  },
  null,
  2
);

const JSON_LIST_MEDIA_ONLY = JSON.stringify(
  {
    id: "mgListMediaOnly",
    name: "List • Media only (no titles)",
    className: "fw-semibold mb-2",

    layout: "list",
    columns: 12,
    rowHeight: 180,
    gap: 12,

    items: [
      { id: "lo-1", zoom: {}, items: [{ id: "lo-1a", url: "https://picsum.photos/seed/lo1/1200/800", isPrimary: true }] },
      { id: "lo-2", zoom: {}, items: [{ id: "lo-2a", url: "https://picsum.photos/seed/lo2/1200/800", isPrimary: true }] },
    ],
  },
  null,
  2
);

const TABS = [
  { key: "bs-mixed", label: "Bootstrap • Mixed", icon: "fa-brands fa-bootstrap", json: JSON_BOOTSTRAP_MIXED },
  { key: "bs-auto", label: "Bootstrap • Auto", icon: "fa-solid fa-arrows-rotate", json: JSON_BOOTSTRAP_AUTO },

  { key: "grid-overlays", label: "Grid • Overlays", icon: "fa-solid fa-border-all", json: JSON_GRID_OVERLAYS },
  { key: "grid-thumbs", label: "Grid • Thumbs", icon: "fa-solid fa-images", json: JSON_GRID_THUMBS },

  { key: "mas-collage", label: "Masonry • Collage", icon: "fa-solid fa-table-cells-large", json: JSON_MASONRY_COLLAGE },
  { key: "mas-mixed", label: "Masonry • Mixed", icon: "fa-solid fa-layer-group", json: JSON_MASONRY_MIXED },

  { key: "list-mixed", label: "List • Mixed", icon: "fa-solid fa-list", json: JSON_LIST_MIXED },
  { key: "list-only", label: "List • Media only", icon: "fa-solid fa-bars", json: JSON_LIST_MEDIA_ONLY },
];

export default function MediaGalleryPage() {
  const [activeTab, setActiveTab] = useState(TABS[0].key);

  const initialJsonByTab = useMemo(() => {
    const out = {};
    for (const t of TABS) out[t.key] = t.json;
    return out;
  }, []);

  const [jsonByTab, setJsonByTab] = useState(initialJsonByTab);
  const [errorByTab, setErrorByTab] = useState({});

  const activeJson = jsonByTab[activeTab] ?? "{}";
  const activeError = errorByTab[activeTab] ?? "";

  const activeModel = useMemo(() => {
    try {
      const raw = JSON.parse(activeJson || "{}");
      const model = new MediaGalleryObject(raw);
      setErrorByTab((prev) => ({ ...prev, [activeTab]: "" }));
      return model;
    } catch (e) {
      setErrorByTab((prev) => ({ ...prev, [activeTab]: String(e?.message || e) }));
      return new MediaGalleryObject({
        id: "mgFallback",
        name: "Invalid JSON (fallback)",
        className: "fw-semibold mb-2 text-danger",
        layout: "bootstrap",
        columns: 6,
        rowHeight: 180,
        gap: 12,
        items: [
          {
            id: "fb",
            name: { name: "Fix JSON", href: "" },
            nameDisplay: { position: "overlay-bottom-left", className: "badge bg-danger" },
            zoom: {},
            items: [{ id: "fb1", url: "https://picsum.photos/seed/fallback/1200/800", isPrimary: true }],
          },
        ],
      });
    }
  }, [activeJson, activeTab]);

  function resetJson() {
    const tab = TABS.find((t) => t.key === activeTab);
    if (!tab) return;
    setJsonByTab((prev) => ({ ...prev, [activeTab]: tab.json }));
    setErrorByTab((prev) => ({ ...prev, [activeTab]: "" }));
  }

  function formatJson() {
    try {
      const parsed = JSON.parse(activeJson);
      const pretty = JSON.stringify(parsed, null, 2);
      setJsonByTab((prev) => ({ ...prev, [activeTab]: pretty }));
    } catch {}
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyMediaGallery Demo (tabs)</h3>

      <ul className="nav nav-tabs mb-3 flex-wrap">
        {TABS.map((t) => (
          <li className="nav-item" key={t.key}>
            <button
              type="button"
              className={"nav-link " + (activeTab === t.key ? "active" : "")}
              onClick={() => setActiveTab(t.key)}
            >
              <i className={t.icon + " me-1"} aria-hidden="true" />
              {t.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="row mb-4">
        <div className="col-12">
          <AlloyMediaGallery mediaGallery={activeModel} />
        </div>
      </div>

      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable)</span>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={resetJson}>
                Reset
              </button>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={formatJson}>
                <i className="fa-solid fa-wand-magic-sparkles me-1" aria-hidden="true" />
                Format
              </button>
            </div>
          </div>

          <textarea
            className={`form-control font-monospace ${activeError ? "is-invalid" : ""}`}
            rows={22}
            value={activeJson}
            onChange={(e) => {
              const v = e.target.value;
              setJsonByTab((prev) => ({ ...prev, [activeTab]: v }));
            }}
            spellCheck={false}
          />

          {activeError && <div className="invalid-feedback d-block mt-1">{activeError}</div>}
        </div>

        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Quick reference</span>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={
              `Layouts: bootstrap | grid | masonry | list\n\n` +
              `MediaGalleryObject:\n` +
              `- id, name, className\n` +
              `- layout, columns, rowHeight, gap\n` +
              `- items: MediaObject[]\n\n` +
              `MediaObject:\n` +
              `- className\n` +
              `- frameClassName (CARD ONLY, for masonry use "h-100")\n` +
              `- colSpan, rowSpan (masonry only)\n` +
              `- name (LinkObject-like), nameDisplay.position\n` +
              `- thumbSize, zoom, carousel, auto\n` +
              `- items: [{ url, thumbUrl, isPrimary }]\n`
            }
            readOnly
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
