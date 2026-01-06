// demo/pages/tissue/AlloyMediaPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { AlloyMedia, MediaObject } from "../../../src";

const IMG =
  "https://files.precastxchange.com/PRECASTXCHANGE/products/a6d072d3-9415-4b8e-9c88-73810c29fa6c_display.jpg";
const GLB = "https://files.precastxchange.com/PRECASTXCHANGE/temp/4%20feet_optimized.glb";
const VID = "https://files.precastxchange.com/PRECASTXCHANGE/temp/demo.mp4";

const DEFAULT_ALL = JSON.stringify(
  {
    id: "media01",
    name: "Mixed media (Image + GLB + Video)",
    className: "",
    colClass: "col-12 col-md-6 col-lg-5",
    thumbSize: 72,

    items: [
      { id: "img-1", url: IMG, thumbUrl: IMG, isPrimary: true },
      { id: "glb-1", url: GLB, thumbUrl: "" },
      { id: "vid-1", url: VID, thumbUrl: "" }
    ],

    img: {
      alt: "Media image",
      cardFitClass: "object-fit-cover",
      zoomFitClass: "object-fit-contain",
      fallbackIcon: { iconClass: "fa-regular fa-image" }
    },

    vid: {
      cardFitClass: "object-fit-cover",
      zoomFitClass: "object-fit-contain",
      fallbackIcon: { iconClass: "fa-solid fa-play" },
      attrs: { autoPlay: true, loop: true, muted: true, playsInline: true, preload: "auto" }
    },

    glb: {
      alt: "3D model",
      fallbackIcon: { iconClass: "fa-solid fa-cube" },
      attrs: {
        crossorigin: "anonymous",
        "camera-controls": true,
        "auto-rotate": true,
        "shadow-intensity": "1",
        "environment-image": "neutral"
      }
    },

    zoom: {
      icon: { iconClass: "fa-solid fa-magnifying-glass-plus" }
    }
  },
  null,
  2
);

export default function AlloyMediaPage() {
  useEffect(() => {
    const id = "model-viewer-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.type = "module";
    s.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    document.body.appendChild(s);
  }, []);

  const [jsonAll, setJsonAll] = useState(DEFAULT_ALL);
  const [errAll, setErrAll] = useState("");

  const modelAll = useMemo(() => {
    try {
      setErrAll("");
      return new MediaObject(JSON.parse(jsonAll));
    } catch (e) {
      setErrAll(String(e?.message || e));
      return new MediaObject({
        id: "media-fallback",
        name: "Invalid JSON",
        colClass: "col-12 col-md-6 col-lg-5",
        thumbSize: 72,
        items: [{ id: "img-1", url: IMG, thumbUrl: IMG, isPrimary: true }]
      });
    }
  }, [jsonAll]);

  function reset() {
    setJsonAll(DEFAULT_ALL);
    setErrAll("");
  }

  return (
    <div className="container py-3 d-flex flex-column align-items-center">
      <div className="col-12 col-lg-10 col-xl-9">
        <h3 className="mb-3 text-center">AlloyMedia</h3>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div className="card-body p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <div className="fw-semibold">{modelAll?.name || "Media"}</div>
                <div className="text-muted small">
                  Zoom icon top-left (hover) · thumbnails under media · supports image / video / glb
                </div>
              </div>
              <span className="badge text-bg-light border">thumbSize: {modelAll?.thumbSize || 72}</span>
            </div>

            <div className="row justify-content-center">
              {modelAll ? <AlloyMedia media={modelAll} /> : null}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-semibold">Input JSON (editable)</span>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={reset}>
            Reset
          </button>
        </div>

        <textarea
          className={`form-control font-monospace ${errAll ? "is-invalid" : ""}`}
          rows={18}
          value={jsonAll}
          onChange={(e) => setJsonAll(e.target.value)}
          spellCheck={false}
        />
        {errAll ? <div className="invalid-feedback d-block mt-1">{errAll}</div> : null}
      </div>
    </div>
  );
}
