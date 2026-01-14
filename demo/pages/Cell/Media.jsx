// demo/pages/tissue/AlloyMediaPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { AlloyMedia, MediaObject } from "../../../src";

/* ----------------------------- sample URLs ----------------------------- */

const IMG1 = "https://files.precastxchange.com/PRECASTXCHANGE/products/a6d072d3-9415-4b8e-9c88-73810c29fa6c_display.jpg";
const IMG2 = "https://picsum.photos/id/1018/1200/900";
const IMG3 = "https://picsum.photos/id/1025/1200/900";

const VIDEO_MP4 = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const AUDIO_MP3 = "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";
const PDF_URL = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const GLB_URL = "https://files.precastxchange.com/PRECASTXCHANGE/glb/10%20FT%20LOW%20DOME_optimized.glb";

/* ----------------------------- defaults ----------------------------- */

const DEFAULTS = {
  imagesThumbs: JSON.stringify(
    {
      id: "media-images-thumbs",
      className: "col-12 col-md-10 col-lg-8",
      thumbSize: 72,
      zoom: { icon: { iconClass: "fa-solid fa-magnifying-glass-plus" } },
      name: { href: "/demo/media/images", name: "Images (Thumbs + Zoom)" },
      nameDisplay: {
        position: "below",
        className: "badge bg-dark bg-opacity-75",
        wrapperClassName: "mt-2 d-inline-flex",
      },
      items: [
        { id: "img-1", url: IMG2, thumbUrl: "https://picsum.photos/id/1018/200/150", isPrimary: true },
        { id: "img-2", url: IMG3, thumbUrl: "https://picsum.photos/id/1025/200/150" },
        { id: "img-3", url: IMG1, thumbUrl: IMG1 },
      ],
      img: {
        alt: "Image",
        cardFitClass: "object-fit-cover",
        zoomFitClass: "object-fit-contain",
        fallbackIcon: { iconClass: "fa-regular fa-image" },
      },
    },
    null,
    2
  ),

  // ✅ NEW: Details demo tab (details[] + detailsClassName)
  details: JSON.stringify(
    {
      id: "media-details",
      className: "col-12 col-md-10 col-lg-8",
      thumbSize: 72,
      zoom: { icon: { iconClass: "fa-solid fa-magnifying-glass-plus" } },
      name: { href: "/demo/media/details", name: "Details (Tags under media)" },
      nameDisplay: {
        position: "below",
        className: "badge bg-dark bg-opacity-75",
        wrapperClassName: "mt-2 d-inline-flex",
      },
      items: [
        { id: "img-1", url: IMG2, thumbUrl: "https://picsum.photos/id/1018/200/150", isPrimary: true },
        { id: "img-2", url: IMG3, thumbUrl: "https://picsum.photos/id/1025/200/150" },
      ],
      img: {
        alt: "Image",
        cardFitClass: "object-fit-cover",
        zoomFitClass: "object-fit-contain",
        fallbackIcon: { iconClass: "fa-regular fa-image" },
      },
      detailsClassName: "d-flex flex-wrap gap-2 mt-3",
      details: [
        { id: "t-1", name: "IN STOCK", className: "badge bg-success", title: "Availability" },
        { id: "t-2", name: "SKU: CB-1001", className: "badge bg-secondary", title: "SKU" },
        { id: "t-3", name: "Size: 24x24", className: "badge bg-info text-dark", title: "Dimensions" },
        { id: "t-4", name: "Precast", className: "badge bg-dark", title: "Category" },
      ],
    },
    null,
    2
  ),

  video: JSON.stringify(
    {
      id: "media-video",
      className: "col-12 col-md-10 col-lg-8",
      thumbSize: 72,
      zoom: { icon: { iconClass: "fa-solid fa-magnifying-glass-plus" } },
      name: { href: "/demo/media/video", name: "Video (Autoplay demo)" },
      nameDisplay: {
        position: "overlay-bottom-left",
        className: "badge bg-dark bg-opacity-50",
        wrapperClassName: "",
      },
      items: [{ id: "vid-1", url: VIDEO_MP4, thumbUrl: "https://picsum.photos/id/1069/200/150", isPrimary: true }],
      vid: {
        cardFitClass: "object-fit-cover",
        zoomFitClass: "object-fit-contain",
        fallbackIcon: { iconClass: "fa-solid fa-play" },
        attrs: { autoPlay: true, loop: true, muted: true, playsInline: true, preload: "auto", controls: true },
      },
      img: {
        alt: "Fallback",
        cardFitClass: "object-fit-cover",
        zoomFitClass: "object-fit-contain",
        fallbackIcon: { iconClass: "fa-regular fa-image" },
      },
    },
    null,
    2
  ),

  audio: JSON.stringify(
    {
      id: "media-audio",
      className: "col-12 col-md-10 col-lg-8",
      thumbSize: 72,
      zoom: { icon: { iconClass: "fa-solid fa-magnifying-glass-plus" } },
      name: { href: "/demo/media/audio", name: "Audio (Player in viewer)" },
      nameDisplay: { position: "top", className: "fw-semibold", wrapperClassName: "mb-2" },
      items: [{ id: "aud-1", url: AUDIO_MP3, thumbUrl: "", isPrimary: true }],
      aud: { className: "", fallbackIcon: { iconClass: "fa-solid fa-volume-high" }, attrs: { controls: true, preload: "metadata" } },
      img: { alt: "Fallback", cardFitClass: "object-fit-cover", zoomFitClass: "object-fit-contain", fallbackIcon: { iconClass: "fa-regular fa-image" } },
    },
    null,
    2
  ),

  pdf: JSON.stringify(
    {
      id: "media-pdf",
      className: "col-12 col-md-10 col-lg-8",
      thumbSize: 72,
      zoom: { icon: { iconClass: "fa-solid fa-magnifying-glass-plus" } },
      name: { href: "/demo/media/pdf", name: "PDF (iframe viewer)" },
      nameDisplay: { position: "below", className: "badge bg-primary", wrapperClassName: "mt-2 d-inline-flex" },
      items: [{ id: "pdf-1", url: PDF_URL, thumbUrl: "", isPrimary: true }],
      pdf: { className: "", fallbackIcon: { iconClass: "fa-regular fa-file-pdf" }, attrs: {} },
      img: { alt: "Fallback", cardFitClass: "object-fit-cover", zoomFitClass: "object-fit-contain", fallbackIcon: { iconClass: "fa-regular fa-image" } },
    },
    null,
    2
  ),

  glb: JSON.stringify(
    {
      id: "media-glb",
      className: "col-12 col-md-10 col-lg-8",
      thumbSize: 72,
      zoom: { icon: { iconClass: "fa-solid fa-magnifying-glass-plus" } },
      name: { href: "/demo/media/glb", name: "GLB (model-viewer)" },
      nameDisplay: { position: "overlay-top-left", className: "badge bg-dark bg-opacity-50", wrapperClassName: "" },
      items: [{ id: "glb-1", url: GLB_URL, thumbUrl: "", isPrimary: true }],
      glb: {
        alt: "3D model",
        className: "pex-hero-model",
        fallbackIcon: { iconClass: "fa-solid fa-cube" },
        attrs: {
          crossorigin: "anonymous",
          "camera-controls": true,
          "auto-rotate": true,
          "auto-rotate-delay": "0",
          "rotation-per-second": "25deg",
          "shadow-intensity": "1",
          "environment-image": "neutral",
          "camera-orbit": "0deg 75deg 2.6m",
          "field-of-view": "30deg",
          "interaction-prompt": "none",
        },
      },
      img: { alt: "Fallback", cardFitClass: "object-fit-cover", zoomFitClass: "object-fit-contain", fallbackIcon: { iconClass: "fa-regular fa-image" } },
    },
    null,
    2
  ),

  mixedAuto: JSON.stringify(
    {
      id: "media-mixed-auto",
      className: "col-12 col-md-10 col-lg-8",
      thumbSize: 72,
      auto: { enabled: true, intervalMs: 3200, pauseOnHover: true, pauseOnZoom: true, loop: true },
      zoom: { icon: { iconClass: "fa-solid fa-magnifying-glass-plus" } },
      carousel: { controls: true, indicators: true, keyboard: true, swipe: true },
      name: { href: "/demo/media/mixed", name: "Mixed (Auto + Carousel controls)" },
      nameDisplay: { position: "overlay-bottom-left", className: "badge bg-dark bg-opacity-50", wrapperClassName: "" },
      items: [
        { id: "img-1", url: IMG2, thumbUrl: "https://picsum.photos/id/1018/200/150", isPrimary: true },
        { id: "vid-1", url: VIDEO_MP4, thumbUrl: "https://picsum.photos/id/1069/200/150" },
        { id: "pdf-1", url: PDF_URL, thumbUrl: "" },
        { id: "aud-1", url: AUDIO_MP3, thumbUrl: "" },
        { id: "glb-1", url: GLB_URL, thumbUrl: "" },
      ],
      img: { alt: "Image", cardFitClass: "object-fit-cover", zoomFitClass: "object-fit-contain", fallbackIcon: { iconClass: "fa-regular fa-image" } },
      vid: { cardFitClass: "object-fit-cover", zoomFitClass: "object-fit-contain", fallbackIcon: { iconClass: "fa-solid fa-play" }, attrs: { autoPlay: true, loop: true, muted: true, playsInline: true, preload: "auto", controls: true } },
      pdf: { className: "", fallbackIcon: { iconClass: "fa-regular fa-file-pdf" }, attrs: {} },
      aud: { className: "", fallbackIcon: { iconClass: "fa-solid fa-volume-high" }, attrs: { controls: true, preload: "metadata" } },
      glb: { alt: "3D model", className: "pex-hero-model", fallbackIcon: { iconClass: "fa-solid fa-cube" }, attrs: { crossorigin: "anonymous", "camera-controls": true, "auto-rotate": true, "shadow-intensity": "1", "environment-image": "neutral" } },
    },
    null,
    2
  ),
};

/* ----------------------------- small helpers ----------------------------- */

function safeParseMedia(jsonText) {
  try {
    const obj = JSON.parse(jsonText);
    return { model: new MediaObject(obj), error: "" };
  } catch (e) {
    return {
      model: new MediaObject({
        id: "media-fallback",
        className: "col-12 col-md-10 col-lg-8",
        items: [{ id: "img-fallback", url: IMG1, thumbUrl: IMG1, isPrimary: true }],
        img: { alt: "Fallback", fallbackIcon: { iconClass: "fa-regular fa-image" } },
      }),
      error: String(e?.message || e),
    };
  }
}

function TabBtn({ id, active, onClick, children }) {
  return (
    <button
      type="button"
      className={`nav-link ${active ? "active" : ""}`}
      onClick={onClick}
      aria-controls={id}
      aria-selected={active ? "true" : "false"}
    >
      {children}
    </button>
  );
}

function DemoPanel({ title, note, json, setJson, err, model, onReset }) {
  return (
    <div className="row g-3">
      <div className="col-12">
        <div className="d-flex align-items-start justify-content-between">
          <div>
            <div className="fw-semibold">{title}</div>
            {note ? <div className="text-muted small">{note}</div> : null}
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>

      <div className="col-12 col-lg-6">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-semibold">Input JSON</span>
          {err ? <span className="badge text-bg-danger">JSON error</span> : <span className="badge text-bg-success">OK</span>}
        </div>
        <textarea
          className={`form-control font-monospace ${err ? "is-invalid" : ""}`}
          rows={20}
          value={json}
          onChange={(e) => setJson(e.target.value)}
          spellCheck={false}
        />
        {err ? <div className="invalid-feedback d-block mt-1">{err}</div> : null}
      </div>

      <div className="col-12 col-lg-6">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className="fw-semibold">Preview</span>
          <span className="badge text-bg-light border">
            items: {Array.isArray(model?.items) ? model.items.length : 0}
            {model?.thumbSize ? ` · thumbs: on` : ` · thumbs: off`}
            {model?.carousel ? ` · carousel: on` : ` · carousel: off`}
            {model?.auto?.enabled ? ` · auto: on` : ` · auto: off`}
            {model?.zoom ? ` · zoom: on` : ` · zoom: off`}
            {Array.isArray(model?.details) && model.details.length ? ` · details: on` : ` · details: off`}
          </span>
        </div>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-body p-4">
            <div className="row justify-content-center">{model ? <AlloyMedia media={model} /> : null}</div>

            <div className="mt-3">
              <div className="text-muted small">Resolved “name” (LinkObject)</div>
              <div className="small">
                <span className="me-2">
                  <span className="text-muted">name:</span> <span className="fw-semibold">{model?.name?.name || "—"}</span>
                </span>
                <span>
                  <span className="text-muted">href:</span> <span className="fw-semibold">{model?.name?.href || "—"}</span>
                </span>
              </div>

              <div className="text-muted small mt-2">Name display</div>
              <div className="small">
                <span className="me-2">
                  <span className="text-muted">position:</span>{" "}
                  <span className="fw-semibold">{model?.nameDisplay?.position || "—"}</span>
                </span>
                <span className="me-2">
                  <span className="text-muted">className:</span>{" "}
                  <span className="fw-semibold">{model?.nameDisplay?.className || "—"}</span>
                </span>
                <span>
                  <span className="text-muted">wrapperClassName:</span>{" "}
                  <span className="fw-semibold">{model?.nameDisplay?.wrapperClassName || "—"}</span>
                </span>
              </div>

              <div className="text-muted small mt-2">Details</div>
              <div className="small">
                <span className="me-2">
                  <span className="text-muted">detailsClassName:</span>{" "}
                  <span className="fw-semibold">{model?.detailsClassName || "—"}</span>
                </span>
                <span>
                  <span className="text-muted">details count:</span>{" "}
                  <span className="fw-semibold">{Array.isArray(model?.details) ? model.details.length : 0}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 text-muted small">
          Tip: Try changing <span className="font-monospace">nameDisplay.position</span> to{" "}
          <span className="font-monospace">top</span>, <span className="font-monospace">below</span>,{" "}
          <span className="font-monospace">overlay-top-left</span>, <span className="font-monospace">overlay-top-right</span>,{" "}
          <span className="font-monospace">overlay-bottom-left</span>, <span className="font-monospace">overlay-bottom-right</span>.
          <br />
          Tip: Remove <span className="font-monospace">details</span> or set it to <span className="font-monospace">[]</span> to see details disappear.
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- page ----------------------------- */

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

  useEffect(() => {
    const id = "pex-hero-model-style";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      .pex-hero-model { background: #fff; }
      .pex-hero-model::part(default-progress-bar) { display: none; }
    `;
    document.head.appendChild(style);
  }, []);

  const tabs = [
    { key: "imagesThumbs", label: "Images", title: "Images (Thumbs + Zoom)" },
    { key: "details", label: "Details", title: "Details (Tags under media)" },
    { key: "video", label: "Video", title: "Video (Controls / autoplay options)" },
    { key: "audio", label: "Audio", title: "Audio (Player)" },
    { key: "pdf", label: "PDF", title: "PDF (iframe viewer)" },
    { key: "glb", label: "GLB", title: "GLB (model-viewer)" },
    { key: "mixedAuto", label: "Mixed", title: "Mixed (Auto + Carousel + Multiple kinds)" },
  ];

  const [active, setActive] = useState("imagesThumbs");

  const [jsonMap, setJsonMap] = useState(() => ({
    imagesThumbs: DEFAULTS.imagesThumbs,
    details: DEFAULTS.details,
    video: DEFAULTS.video,
    audio: DEFAULTS.audio,
    pdf: DEFAULTS.pdf,
    glb: DEFAULTS.glb,
    mixedAuto: DEFAULTS.mixedAuto,
  }));

  const parsed = useMemo(() => {
    const out = {};
    for (const k of Object.keys(jsonMap)) {
      out[k] = safeParseMedia(jsonMap[k]);
    }
    return out;
  }, [jsonMap]);

  function setJsonFor(key, next) {
    setJsonMap((p) => ({ ...p, [key]: next }));
  }

  function resetTab(key) {
    setJsonMap((p) => ({ ...p, [key]: DEFAULTS[key] }));
  }

  const cur = parsed[active];

  return (
    <div className="container py-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h3 className="mb-0">AlloyMedia Demo</h3>
          <div className="text-muted small">
            Tabs show different behaviors. Each tab has editable JSON + live preview + resolved LinkObject info.
          </div>
        </div>
        <span className="badge text-bg-light border">Bootstrap tabs + editable JSON</span>
      </div>

      <ul className="nav nav-tabs mb-3" role="tablist">
        {tabs.map((t) => (
          <li className="nav-item" role="presentation" key={t.key}>
            <TabBtn id={`tab-${t.key}`} active={active === t.key} onClick={() => setActive(t.key)}>
              {t.label}
            </TabBtn>
          </li>
        ))}
      </ul>

      <div className="tab-content">
        <div className="tab-pane fade show active">
          <DemoPanel
            title={tabs.find((x) => x.key === active)?.title || "Demo"}
            note={
              active === "mixedAuto"
                ? "Try toggling: thumbSize (null/off), carousel (null/off), auto.enabled, and zoom (null/off)."
                : active === "details"
                ? "Edit details[] and detailsClassName to control the tag section rendered under media."
                : "Edit JSON and see it update instantly."
            }
            json={jsonMap[active]}
            setJson={(v) => setJsonFor(active, v)}
            err={cur?.error || ""}
            model={cur?.model}
            onReset={() => resetTab(active)}
          />
        </div>
      </div>
    </div>
  );
}
