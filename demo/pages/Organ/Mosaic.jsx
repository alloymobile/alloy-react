// demo/pages/tissue/MosaicDemo.jsx
import React, { useMemo, useState } from "react";
import { AlloyMosaic, MosaicObject } from "../../../src";

/* ---------------------- Base demo mosaic objects ---------------------- */

const IMG_1 =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=75";
const IMG_2 =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=75";
const IMG_3 =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=75";
const IMG_4 =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=75";
const IMG_5 =
  "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1600&q=75";
const IMG_6 =
  "https://images.unsplash.com/photo-1524503033411-f1df0fdbf5f8?auto=format&fit=crop&w=1600&q=75";

/** 1) Collage mosaic (rowSpan + colSpan) */
const MOSAIC_COLLAGE = {
  id: "demoMosaicCollage01",
  className: "card border m-2 shadow rounded-4 overflow-hidden",

  header: {
    id: "demoMosaicCollageHeader",
    className: "card-header fw-semibold",
    name: "Mosaic (Collage)"
  },

  body: {
    id: "demoMosaicCollageBody",
    className: "card-body p-3"
  },

  grid: {
    columns: 12,
    rowHeight: "clamp(56px, 6vw, 96px)",
    className: "gap-2 gap-md-3"
  },

  figure: {
    enabled: true,
    title: "Culture",
    subtitle: "rowSpan + colSpan collage",
    className: ""
  },

  items: [
    { id: "c-1", kind: "image", src: IMG_1, alt: "Image 1", colSpan: 4, rowSpan: 4, radius: "lg" },
    { id: "c-2", kind: "image", src: IMG_2, alt: "Image 2", colSpan: 5, rowSpan: 2, radius: "lg" },
    { id: "c-3", kind: "image", src: IMG_3, alt: "Image 3", colSpan: 3, rowSpan: 3, radius: "lg" },
    { id: "c-4", kind: "image", src: IMG_4, alt: "Image 4", colSpan: 5, rowSpan: 3, radius: "lg" },
    { id: "c-5", kind: "image", src: IMG_5, alt: "Image 5", colSpan: 5, rowSpan: 4, radius: "lg" },
    { id: "c-6", kind: "image", src: IMG_6, alt: "Image 6", colSpan: 3, rowSpan: 4, radius: "lg" }
  ],

  footer: {
    id: "demoMosaicCollageFooter",
    className: "card-footer text-muted small",
    name: "Tip: tune `grid.rowHeight` (vh/vw/clamp) and `grid.className` (gap-*)."
  }
};

/** 2) Mosaic with mixed tiles (images + text) */
const MOSAIC_MIXED = {
  id: "demoMosaicMixed01",
  className: "card border m-2 shadow rounded-4 overflow-hidden",

  header: {
    id: "demoMosaicMixedHeader",
    className: "card-header fw-semibold",
    name: "Mosaic (Mixed: Image + Text)"
  },

  body: {
    id: "demoMosaicMixedBody",
    className: "card-body p-3"
  },

  grid: {
    columns: 12,
    rowHeight: "clamp(52px, 5.6vw, 92px)",
    className: "gap-2 gap-md-3"
  },

  items: [
    { id: "m-1", kind: "image", src: IMG_2, alt: "Image 2", colSpan: 6, rowSpan: 3, radius: "lg" },
    {
      id: "m-2",
      kind: "text",
      text: "Built with rowSpan + colSpan.",
      colSpan: 6,
      rowSpan: 2,
      radius: "lg",
      className: "bg-light fw-semibold d-flex align-items-center justify-content-center text-center"
    },
    { id: "m-3", kind: "image", src: IMG_4, alt: "Image 4", colSpan: 4, rowSpan: 3, radius: "lg" },
    { id: "m-4", kind: "image", src: IMG_1, alt: "Image 1", colSpan: 4, rowSpan: 3, radius: "lg" },
    {
      id: "m-5",
      kind: "text",
      text: "Use Bootstrap `gap-*` + `p-*` classes.",
      colSpan: 4,
      rowSpan: 3,
      radius: "lg",
      className: "bg-white border fw-semibold d-flex align-items-center justify-content-center text-center"
    },
    { id: "m-6", kind: "image", src: IMG_6, alt: "Image 6", colSpan: 12, rowSpan: 2, radius: "lg" }
  ],

  footer: {
    id: "demoMosaicMixedFooter",
    className: "card-footer text-muted small",
    name: "Text tiles are `kind: \"text\"` with `text` + custom `className`."
  }
};

/** 3) Mosaic with tile overlays + links */
const MOSAIC_LINKS = {
  id: "demoMosaicLinks01",
  className: "card border m-2 shadow rounded-4 overflow-hidden",

  header: {
    id: "demoMosaicLinksHeader",
    className: "card-header fw-semibold",
    name: "Mosaic (Overlay + Tile Links)"
  },

  body: {
    id: "demoMosaicLinksBody",
    className: "card-body p-3"
  },

  grid: {
    columns: 12,
    rowHeight: "clamp(54px, 6vw, 98px)",
    className: "gap-2 gap-md-3"
  },

  figure: {
    enabled: true,
    title: "Explore",
    subtitle: "tile overlay + link",
    className: ""
  },

  items: [
    {
      id: "l-1",
      kind: "image",
      src: IMG_3,
      alt: "Image 3",
      colSpan: 6,
      rowSpan: 4,
      radius: "lg",
      link: "/demo/mosaic/one",
      overlay: { text: "Open", position: "bottom-left" }
    },
    {
      id: "l-2",
      kind: "image",
      src: IMG_5,
      alt: "Image 5",
      colSpan: 6,
      rowSpan: 2,
      radius: "lg",
      link: "/demo/mosaic/two",
      overlay: { text: "View", position: "bottom-right" }
    },
    {
      id: "l-3",
      kind: "image",
      src: IMG_1,
      alt: "Image 1",
      colSpan: 3,
      rowSpan: 2,
      radius: "lg",
      link: "/demo/mosaic/three",
      overlay: { text: "Go", position: "top-left" }
    },
    {
      id: "l-4",
      kind: "image",
      src: IMG_2,
      alt: "Image 2",
      colSpan: 3,
      rowSpan: 2,
      radius: "lg",
      link: "/demo/mosaic/four",
      overlay: { text: "Open", position: "top-right" }
    },
    {
      id: "l-5",
      kind: "image",
      src: IMG_4,
      alt: "Image 4",
      colSpan: 12,
      rowSpan: 2,
      radius: "lg",
      link: "/demo/mosaic/five",
      overlay: { text: "Details", position: "bottom-left" }
    }
  ],

  footer: {
    id: "demoMosaicLinksFooter",
    className: "card-footer text-muted small",
    name: "Each tile supports `link` and `overlay`."
  }
};

/* pretty-print defaults */
const DEFAULT_COLLAGE_JSON = JSON.stringify(MOSAIC_COLLAGE, null, 2);
const DEFAULT_MIXED_JSON = JSON.stringify(MOSAIC_MIXED, null, 2);
const DEFAULT_LINKS_JSON = JSON.stringify(MOSAIC_LINKS, null, 2);

/* code snippet for docs */
const MOSAIC_SNIPPET = `<AlloyMosaic mosaic={new MosaicObject(mosaicObject)} />`;

export default function MosaicPage() {
  // which tab are we looking at: "collage" | "mixed" | "links"
  const [activeTab, setActiveTab] = useState("collage");

  // each tab has its own editable JSON text
  const [jsonCollage, setJsonCollage] = useState(DEFAULT_COLLAGE_JSON);
  const [jsonMixed, setJsonMixed] = useState(DEFAULT_MIXED_JSON);
  const [jsonLinks, setJsonLinks] = useState(DEFAULT_LINKS_JSON);

  // each tab tracks its own parse error
  const [errorCollage, setErrorCollage] = useState("");
  const [errorMixed, setErrorMixed] = useState("");
  const [errorLinks, setErrorLinks] = useState("");

  const activeJson =
    activeTab === "mixed" ? jsonMixed : activeTab === "links" ? jsonLinks : jsonCollage;

  const activeError =
    activeTab === "mixed" ? errorMixed : activeTab === "links" ? errorLinks : errorCollage;

  const previewModel = useMemo(() => {
    let rawText = jsonCollage;
    if (activeTab === "mixed") rawText = jsonMixed;
    if (activeTab === "links") rawText = jsonLinks;

    try {
      const raw = JSON.parse(rawText);

      if (activeTab === "mixed") {
        setErrorMixed("");
      } else if (activeTab === "links") {
        setErrorLinks("");
      } else {
        setErrorCollage("");
      }

      return new MosaicObject(raw);
    } catch (e) {
      const msg = String(e.message || e);

      if (activeTab === "mixed") {
        setErrorMixed(msg);
      } else if (activeTab === "links") {
        setErrorLinks(msg);
      } else {
        setErrorCollage(msg);
      }

      return new MosaicObject({
        className: "card border m-2 shadow rounded-4 overflow-hidden",
        header: { className: "card-header bg-danger text-white", name: "Error" },
        body: { className: "card-body p-3" },
        grid: { columns: 12, rowHeight: "clamp(56px, 6vw, 96px)", className: "gap-2" },
        items: [
          {
            kind: "text",
            text: "Invalid JSON — fix input on the right.",
            colSpan: 12,
            rowSpan: 3,
            className: "bg-light text-danger fw-semibold d-flex align-items-center justify-content-center text-center",
            radius: "lg"
          }
        ],
        footer: { className: "card-footer text-muted small", name: "Preview fallback while JSON is invalid." }
      });
    }
  }, [activeTab, jsonCollage, jsonMixed, jsonLinks]);

  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  function handleTextareaChange(e) {
    const next = e.target.value;
    if (activeTab === "mixed") {
      setJsonMixed(next);
    } else if (activeTab === "links") {
      setJsonLinks(next);
    } else {
      setJsonCollage(next);
    }
  }

  function handleResetCurrent() {
    if (activeTab === "mixed") {
      setJsonMixed(DEFAULT_MIXED_JSON);
      setErrorMixed("");
    } else if (activeTab === "links") {
      setJsonLinks(DEFAULT_LINKS_JSON);
      setErrorLinks("");
    } else {
      setJsonCollage(DEFAULT_COLLAGE_JSON);
      setErrorCollage("");
    }
  }

  function headerTitle() {
    if (activeTab === "mixed") return "Mixed: Image + Text";
    if (activeTab === "links") return "Overlay + Links";
    return "Collage";
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyMosaic</h3>

      {/* Row 1 — snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{MOSAIC_SNIPPET}</code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Tabs + Preview */}
      <div className="row mb-4">
        <div className="col-12">
          {/* Tabs */}
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button
                className={"nav-link " + (activeTab === "collage" ? "active" : "")}
                onClick={() => handleTabClick("collage")}
                type="button"
              >
                Collage
              </button>
            </li>

            <li className="nav-item">
              <button
                className={"nav-link " + (activeTab === "mixed" ? "active" : "")}
                onClick={() => handleTabClick("mixed")}
                type="button"
              >
                Image + Text
              </button>
            </li>

            <li className="nav-item">
              <button
                className={"nav-link " + (activeTab === "links" ? "active" : "")}
                onClick={() => handleTabClick("links")}
                type="button"
              >
                Overlay + Links
              </button>
            </li>
          </ul>

          {/* Preview */}
          <AlloyMosaic mosaic={previewModel} />

          {/* Helper text */}
          <div className="small text-secondary mt-2">
            <div className="mb-1">
              <strong>Layout model:</strong> <code>header</code> (optional),{" "}
              <code>body</code> (optional), <code>grid</code> (optional),{" "}
              <code>items</code> (required), <code>footer</code> (optional).
            </div>

            <div className="mb-1">
              <code>items</code> is an ordered array of tiles. Each tile can
              specify <code>colSpan</code> and <code>rowSpan</code> to create
              collage-style layouts.
            </div>

            <div className="mb-1">
              Grid settings:
              <ul className="ps-3 mb-0">
                <li>
                  <code>grid.columns</code> (default 12) controls the span system.
                </li>
                <li>
                  <code>grid.rowHeight</code> accepts CSS lengths like{" "}
                  <code>"8vh"</code>, <code>"6vw"</code>, or{" "}
                  <code>clamp()</code>.
                </li>
                <li>
                  <code>grid.className</code> can be Bootstrap utilities like{" "}
                  <code>"gap-2 gap-md-3"</code>.
                </li>
              </ul>
            </div>

            <div className="mb-1">
              Tile types:
              <ul className="ps-3 mb-0">
                <li>
                  <strong>Image</strong> — <code>kind: "image"</code> with{" "}
                  <code>src</code>.
                </li>
                <li>
                  <strong>Text</strong> — <code>kind: "text"</code> with{" "}
                  <code>text</code> and custom <code>className</code>.
                </li>
                <li>
                  Optional: <code>overlay</code> and <code>link</code>.
                </li>
              </ul>
            </div>

            <div className="mb-1">
              <code>figure</code> (optional) renders a centered title overlay inside
              the mosaic area.
            </div>
          </div>
        </div>
      </div>

      {/* Row 3 — Tab-specific editable JSON */}
      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              {headerTitle()} — Input JSON (editable)
            </span>

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={handleResetCurrent}
            >
              Reset This Tab
            </button>
          </div>

          <textarea
            className={`form-control font-monospace ${activeError ? "is-invalid" : ""}`}
            rows={18}
            value={activeJson}
            onChange={handleTextareaChange}
            spellCheck={false}
          />

          {activeError && (
            <div className="invalid-feedback d-block mt-1">{activeError}</div>
          )}

          <div className="form-text">
            <ul className="mb-0 ps-3">
              <li>
                <code>items</code> is required (at least one tile).
              </li>
              <li>
                Each tile should include <code>colSpan</code> and{" "}
                <code>rowSpan</code> to control placement.
              </li>
              <li>
                Use <code>grid.rowHeight</code> as a CSS length (vh/vw/clamp) for
                responsive height scaling.
              </li>
              <li>
                Use Bootstrap utilities in <code>grid.className</code> for spacing
                (e.g. <code>gap-2</code>, <code>gap-md-3</code>), and in{" "}
                <code>body.className</code> for padding (e.g.{" "}
                <code>p-3 p-md-4</code>).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
