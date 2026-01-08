// demo/pages/Organ/MediaGallery.jsx
import React, { useMemo, useState } from "react";

import { AlloyMediaGallery, MediaGalleryObject } from "../../../src";

const DEFAULT_MASONRY_IMAGE_JSON = JSON.stringify(
  {
    id: "mgMasonryImage",
    name: "Masonry • Images",
    nameClass: "fw-semibold mb-2",

    layout: "masonry",
    columns: 12,
    rowHeight: 180,
    gap: 12,

    className: "position-relative overflow-hidden rounded-4",
    titlePosition: "overlay",
    titleClass: "badge bg-dark bg-opacity-75",
    mediaClass: "w-100 h-100 object-fit-cover",

    items: [
      {
        id: "mi1",
        type: "image",
        url: "https://picsum.photos/seed/mgimg1/1200/800",
        title: "Septic",
        colSpan: 7,
        rowSpan: 2,
        link: "/products/septic"
      },
      {
        id: "mi2",
        type: "image",
        url: "https://picsum.photos/seed/mgimg2/1200/800",
        title: "Barrier",
        colSpan: 5,
        rowSpan: 1,
        link: "/products/barrier"
      },
      {
        id: "mi3",
        type: "image",
        url: "https://picsum.photos/seed/mgimg3/1200/800",
        title: "Manhole",
        colSpan: 4,
        rowSpan: 1,
        link: "/products/manhole"
      },
      {
        id: "mi4",
        type: "image",
        url: "https://picsum.photos/seed/mgimg4/1200/800",
        title: "Culvert",
        colSpan: 3,
        rowSpan: 1,
        link: "/products/culvert"
      },
      {
        id: "mi5",
        type: "image",
        url: "https://picsum.photos/seed/mgimg5/1200/800",
        title: "Tilt Table",
        colSpan: 5,
        rowSpan: 2,
        link: "/products/tilt-table"
      },
      {
        id: "mi6",
        type: "image",
        url: "https://picsum.photos/seed/mgimg6/1200/800",
        title: "Pavers",
        colSpan: 7,
        rowSpan: 1,
        link: "/products/pavers"
      }
    ]
  },
  null,
  2
);

const DEFAULT_MASONRY_VIDEO_JSON = JSON.stringify(
  {
    id: "mgMasonryVideo",
    name: "Masonry • Videos",
    nameClass: "fw-semibold mb-2",

    layout: "masonry",
    columns: 12,
    rowHeight: 180,
    gap: 12,

    className: "position-relative overflow-hidden rounded-4",
    titlePosition: "top",
    titleClass: "badge bg-dark bg-opacity-75",
    mediaClass: "w-100 h-100",

    items: [
      {
        id: "mv1",
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        title: "Training Clip",
        colSpan: 7,
        rowSpan: 2,
        link: "/training/clip-1",
        meta: { poster: "https://picsum.photos/seed/mgvidp1/1200/800" }
      },
      {
        id: "mv2",
        type: "video",
        url: "https://www.w3schools.com/html/movie.mp4",
        title: "Walkthrough",
        colSpan: 5,
        rowSpan: 1,
        link: "/training/clip-2",
        meta: { poster: "https://picsum.photos/seed/mgvidp2/1200/800" }
      },
      {
        id: "mv3",
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        title: "Safety",
        colSpan: 5,
        rowSpan: 1,
        link: "/training/safety",
        meta: { poster: "https://picsum.photos/seed/mgvidp3/1200/800" }
      }
    ]
  },
  null,
  2
);

const DEFAULT_MASONRY_GLB_JSON = JSON.stringify(
  {
    id: "mgMasonryGlb",
    name: "Masonry • GLB",
    nameClass: "fw-semibold mb-2",

    layout: "masonry",
    columns: 12,
    rowHeight: 180,
    gap: 12,

    className: "position-relative overflow-hidden rounded-4 bg-light",
    titlePosition: "overlay",
    titleClass: "badge bg-dark bg-opacity-75",
    mediaClass: "w-100 h-100",

    items: [
      {
        id: "mg1",
        type: "glb",
        url: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
        title: "Astronaut",
        colSpan: 7,
        rowSpan: 2,
        link: "/models/astronaut"
      },
      {
        id: "mg2",
        type: "glb",
        url: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
        title: "Detail View",
        colSpan: 5,
        rowSpan: 1,
        link: "/models/detail"
      },
      {
        id: "mg3",
        type: "glb",
        url: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
        title: "Alt Angle",
        colSpan: 5,
        rowSpan: 1,
        link: "/models/alt"
      }
    ]
  },
  null,
  2
);

const DEFAULT_MASONRY_ICON_JSON = JSON.stringify(
  {
    id: "mgMasonryIcon",
    name: "Masonry • Icons",
    nameClass: "fw-semibold mb-2",

    layout: "masonry",
    columns: 12,
    rowHeight: 180,
    gap: 12,

    className: "position-relative overflow-hidden rounded-4 border bg-white",
    titlePosition: "overlay",
    titleClass: "badge bg-dark bg-opacity-75",
    mediaClass: "w-100 h-100 d-flex align-items-center justify-content-center fs-1",

    items: [
      {
        id: "ic1",
        type: "icon",
        iconClass: "fa-solid fa-file-pdf",
        title: "Spec PDF",
        colSpan: 4,
        rowSpan: 1,
        link: "/docs/spec"
      },
      {
        id: "ic2",
        type: "icon",
        iconClass: "fa-solid fa-cube",
        title: "3D",
        colSpan: 4,
        rowSpan: 1,
        link: "/products/3d"
      },
      {
        id: "ic3",
        type: "icon",
        iconClass: "fa-solid fa-video",
        title: "Video",
        colSpan: 4,
        rowSpan: 1,
        link: "/media/videos"
      },
      {
        id: "ic4",
        type: "icon",
        iconClass: "fa-solid fa-image",
        title: "Gallery",
        colSpan: 6,
        rowSpan: 2,
        link: "/media/images"
      },
      {
        id: "ic5",
        type: "icon",
        iconClass: "fa-solid fa-clipboard-check",
        title: "Checklist",
        colSpan: 6,
        rowSpan: 2,
        link: "/docs/checklist"
      }
    ]
  },
  null,
  2
);

const DEFAULT_GRID_IMAGES_JSON = JSON.stringify(
  {
    id: "mgGridImages",
    name: "Grid • Images",
    nameClass: "fw-semibold mb-2",

    layout: "grid",
    gap: 12,

    className: "col-12 col-sm-6 col-lg-4 position-relative overflow-hidden rounded-4",
    titlePosition: "overlay",
    titleClass: "badge bg-dark bg-opacity-75",
    mediaClass: "w-100 h-100 object-fit-cover",

    items: [
      {
        id: "gi1",
        type: "image",
        url: "https://picsum.photos/seed/mggrid1/1200/800",
        title: "ASTRO™",
        link: "/products/astro"
      },
      {
        id: "gi2",
        type: "image",
        url: "https://picsum.photos/seed/mggrid2/1200/800",
        title: "PX-Guard™",
        link: "/products/px-guard"
      },
      {
        id: "gi3",
        type: "image",
        url: "https://picsum.photos/seed/mggrid3/1200/800",
        title: "PX-Tilt™",
        link: "/products/px-tilt"
      }
    ]
  },
  null,
  2
);

const DEFAULT_GRID_MIXED_JSON = JSON.stringify(
  {
    id: "mgGridMixed",
    name: "Grid • Mixed",
    nameClass: "fw-semibold mb-2",

    layout: "grid",
    gap: 12,

    className: "col-12 col-md-6 position-relative overflow-hidden rounded-4",
    titlePosition: "top",
    titleClass: "badge bg-dark bg-opacity-75",
    mediaClass: "w-100 h-100",

    items: [
      {
        id: "gm1",
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        title: "Operator",
        link: "/training/operator",
        meta: { poster: "https://picsum.photos/seed/mggridvp1/1200/800" }
      },
      {
        id: "gm2",
        type: "image",
        url: "https://picsum.photos/seed/mggridm2/1200/800",
        title: "Plant Layout",
        link: "/projects/layout"
      }
    ]
  },
  null,
  2
);

const DEFAULT_LIST_ICONS_JSON = JSON.stringify(
  {
    id: "mgListIcons",
    name: "List • Icons (Side)",
    nameClass: "fw-semibold mb-2",

    layout: "list",
    gap: 12,

    className: "p-3 border rounded-4 bg-white",
    titlePosition: "side",
    titleClass: "badge bg-dark bg-opacity-75",
    mediaClass: "w-100 h-100 d-flex align-items-center justify-content-center fs-2 bg-light rounded-3",

    items: [
      {
        id: "li1",
        type: "icon",
        iconClass: "fa-solid fa-file-pdf",
        title: "Spec Sheet (PDF)",
        link: "/docs/spec"
      },
      {
        id: "li2",
        type: "icon",
        iconClass: "fa-solid fa-video",
        title: "Training Videos",
        link: "/media/videos"
      },
      {
        id: "li3",
        type: "icon",
        iconClass: "fa-solid fa-cube",
        title: "3D Models",
        link: "/media/3d"
      }
    ]
  },
  null,
  2
);

const DEFAULT_LIST_MIXED_JSON = JSON.stringify(
  {
    id: "mgListMixed",
    name: "List • Mixed (Below)",
    nameClass: "fw-semibold mb-2",

    layout: "list",
    gap: 12,

    className: "p-3 border rounded-4 bg-white",
    titlePosition: "below",
    titleClass: "badge bg-dark bg-opacity-75",
    mediaClass: "w-100 h-100",

    items: [
      {
        id: "lm1",
        type: "image",
        url: "https://picsum.photos/seed/mglist1/1200/800",
        title: "Gallery Image",
        link: "/media/images",
        mediaClass: "w-100 h-100 object-fit-cover rounded-3"
      },
      {
        id: "lm2",
        type: "video",
        url: "https://www.w3schools.com/html/movie.mp4",
        title: "Walkthrough",
        link: "/training/walkthrough",
        meta: { poster: "https://picsum.photos/seed/mglistvp1/1200/800" },
        mediaClass: "w-100 h-100 rounded-3"
      }
    ]
  },
  null,
  2
);

const TABS = [
  { key: "masonry-image", label: "Masonry • Image", icon: "fa-regular fa-image", json: DEFAULT_MASONRY_IMAGE_JSON },
  { key: "masonry-video", label: "Masonry • Video", icon: "fa-solid fa-video", json: DEFAULT_MASONRY_VIDEO_JSON },
  { key: "masonry-glb", label: "Masonry • GLB", icon: "fa-solid fa-cube", json: DEFAULT_MASONRY_GLB_JSON },
  { key: "masonry-icon", label: "Masonry • Icon", icon: "fa-solid fa-icons", json: DEFAULT_MASONRY_ICON_JSON },

  { key: "grid-images", label: "Grid • Images", icon: "fa-solid fa-border-all", json: DEFAULT_GRID_IMAGES_JSON },
  { key: "grid-mixed", label: "Grid • Mixed", icon: "fa-solid fa-layer-group", json: DEFAULT_GRID_MIXED_JSON },

  { key: "list-icons", label: "List • Icons", icon: "fa-solid fa-list", json: DEFAULT_LIST_ICONS_JSON },
  { key: "list-mixed", label: "List • Mixed", icon: "fa-solid fa-bars", json: DEFAULT_LIST_MIXED_JSON }
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
        nameClass: "fw-semibold mb-2 text-danger",
        layout: "grid",
        gap: 12,
        className: "col-12 col-md-6 col-lg-4 position-relative overflow-hidden rounded-4 border",
        titlePosition: "overlay",
        titleClass: "badge bg-danger",
        mediaClass: "w-100 h-100 d-flex align-items-center justify-content-center fs-1 bg-light",
        items: [
          {
            id: "fallback1",
            type: "icon",
            iconClass: "fa-solid fa-triangle-exclamation",
            title: "Fix JSON to preview",
            link: ""
          }
        ]
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
    } catch {
      // ignore
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyMediaGallery Demo (8 tabs)</h3>

      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{`<AlloyMediaGallery mediaGallery={new MediaGalleryObject(mediaGalleryObject)} />`}</code>
          </pre>
        </div>
      </div>

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
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={formatJson}
                title="Format JSON"
              >
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

          <div className="form-text">
            <ul className="mb-0">
              <li>
                <code>layout</code>: <code>masonry</code> uses <code>colSpan/rowSpan</code> (grid spans).
              </li>
              <li>
                <code>grid</code> + <code>list</code> ignore spans.
              </li>
              <li>
                If <code>link</code> is present, the entire item is clickable.
              </li>
              <li>
                Item types: <code>image</code>, <code>video</code>, <code>glb</code>, <code>icon</code>.
              </li>
            </ul>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Quick reference</span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => {
                // keep simple
              }}
              disabled
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={
              `// AlloyMediaGallery\n` +
              `// Layouts: masonry | grid | list\n` +
              `// Title positions: overlay | top | below | side\n` +
              `// Types: image | video | glb | icon\n\n` +
              `// Key fields\n` +
              `// - className: default item wrapper class\n` +
              `// - mediaClass: default media element class\n` +
              `// - titleClass: title styling (overlay/top)\n` +
              `// - items[].itemClass / items[].mediaClass: per-item overrides\n` +
              `// - items[].link: makes whole item clickable\n`
            }
            readOnly
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
