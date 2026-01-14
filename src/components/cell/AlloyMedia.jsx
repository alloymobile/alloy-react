// src/components/tissue/AlloyMedia.jsx
import React, { useEffect, useMemo, useState } from "react";
import { generateId, TagObject} from "../../utils/idHelper.js";
import AlloyLink, { LinkObject } from "../cell/AlloyLink.jsx";

/* ----------------------------- helpers ----------------------------- */

function cleanUrl(u) {
  const s = String(u || "").trim();
  if (!s) return "";
  return s.split("#")[0].split("?")[0];
}

function extOf(u) {
  const c = cleanUrl(u).toLowerCase();
  const i = c.lastIndexOf(".");
  return i >= 0 ? c.slice(i + 1) : "";
}

function inferKindFromUrl(url) {
  const ext = extOf(url);

  if (ext === "glb") return "glb";
  if (ext === "pdf") return "pdf";

  if (["mp4", "webm", "ogg", "ogv"].includes(ext)) return "video";
  if (["mp3", "wav", "m4a", "aac", "opus", "oga", "flac"].includes(ext)) return "audio";

  if (["png", "jpg", "jpeg", "webp", "avif", "gif", "svg", "bmp"].includes(ext)) return "image";

  return "unknown";
}

function pickIconClass(fallback, def) {
  const c = String(fallback?.iconClass || "").trim();
  return c || def;
}

function namePosition(pos) {
  const p = String(pos || "").trim().toLowerCase();
  return p || "below";
}

function isOverlayPos(pos) {
  const p = namePosition(pos);
  return p.startsWith("overlay-");
}

function overlayPosClass(pos) {
  const p = namePosition(pos);
  return p === "overlay-top-left"
    ? "top-0 start-0"
    : p === "overlay-top-right"
    ? "top-0 end-0"
    : p === "overlay-bottom-right"
    ? "bottom-0 end-0"
    : "bottom-0 start-0";
}

/* -------------------------- layers -------------------------- */

const Z_MEDIA = 1;
const Z_NAME = 15;
const Z_CAROUSEL = 20;
const Z_ZOOM = 25;

/* -------------------------- object models -------------------------- */

export class MediaItemObject {
  constructor(it = {}, idx = 0) {
    this.id = String(it?.id || `media-item-${idx}`);
    this.url = String(it?.url || "").trim();
    this.thumbUrl = String(it?.thumbUrl || it?.thumbnailUrl || "").trim() || "";
    this.isPrimary = !!it?.isPrimary;
  }

  kind() {
    return inferKindFromUrl(this.url);
  }
}

export class MediaObject {
  constructor(cfg = {}) {
    this.id = cfg.id ?? generateId("media");

    this.className = typeof cfg.className === "string" ? cfg.className : "";
    this.frameClassName = typeof cfg.frameClassName === "string" ? cfg.frameClassName : "";
    this.colSpan = Number.isFinite(Number(cfg.colSpan)) ? Math.max(1, Math.floor(Number(cfg.colSpan))) : 1;
    this.rowSpan = Number.isFinite(Number(cfg.rowSpan)) ? Math.max(1, Math.floor(Number(cfg.rowSpan))) : 1;

    const rawName = cfg.name ?? null;
    this.name = rawName
      ? rawName instanceof LinkObject
        ? rawName
        : new LinkObject(rawName)
      : null;

    const nd = cfg.nameDisplay && typeof cfg.nameDisplay === "object" ? cfg.nameDisplay : null;
    this.nameDisplay = nd
      ? {
          position: namePosition(nd.position),
          className: typeof nd.className === "string" ? nd.className : "",
          wrapperClassName: typeof nd.wrapperClassName === "string" ? nd.wrapperClassName : "",
        }
      : null;

    this.thumbSize = Number.isFinite(Number(cfg.thumbSize)) ? Number(cfg.thumbSize) : null;

    const car = cfg.carousel && typeof cfg.carousel === "object" ? cfg.carousel : null;
    this.carousel = car
      ? {
          controls: car.controls !== false,
          indicators: car.indicators !== false,
          keyboard: car.keyboard !== false,
          swipe: car.swipe !== false,
        }
      : null;

    const zoom = cfg.zoom && typeof cfg.zoom === "object" ? cfg.zoom : null;
    this.zoom = zoom
      ? {
          icon: zoom.icon ?? { iconClass: "fa-solid fa-magnifying-glass-plus" },
          buttonClassName:
            zoom.buttonClassName ??
            "btn btn-light btn-sm rounded-circle shadow-sm d-flex align-items-center justify-content-center",
          wrapperClassName: zoom.wrapperClassName ?? "position-absolute top-0 end-0 m-2",
        }
      : null;

    const rawAuto = cfg.auto && typeof cfg.auto === "object" ? cfg.auto : null;
    if (rawAuto) {
      const ms = Number(rawAuto.intervalMs);
      this.auto = {
        enabled: !!rawAuto.enabled,
        intervalMs: Number.isFinite(ms) ? Math.max(1000, ms) : 5000,
        pauseOnHover: rawAuto.pauseOnHover !== false,
        pauseOnZoom: rawAuto.pauseOnZoom !== false,
        loop: rawAuto.loop !== false,
      };
    } else {
      this.auto = null;
    }

    const img = cfg.img && typeof cfg.img === "object" ? cfg.img : null;
    this.img = img
      ? {
          alt: img.alt ?? "Image",
          className: img.className ?? "",
          cardFitClass: img.cardFitClass ?? "object-fit-cover",
          zoomFitClass: img.zoomFitClass ?? "object-fit-contain",
          fallbackIcon: img.fallbackIcon ?? { iconClass: "fa-regular fa-image" },
          attrs: img.attrs && typeof img.attrs === "object" ? img.attrs : {},
        }
      : null;

    const vid = cfg.vid && typeof cfg.vid === "object" ? cfg.vid : null;
    this.vid = vid
      ? {
          className: vid.className ?? "",
          cardFitClass: vid.cardFitClass ?? "object-fit-cover",
          zoomFitClass: vid.zoomFitClass ?? "object-fit-contain",
          fallbackIcon: vid.fallbackIcon ?? { iconClass: "fa-solid fa-play" },
          attrs:
            vid.attrs && typeof vid.attrs === "object"
              ? vid.attrs
              : { autoPlay: true, loop: true, muted: true, playsInline: true, preload: "auto" },
        }
      : null;

    const aud = cfg.aud && typeof cfg.aud === "object" ? cfg.aud : null;
    this.aud = aud
      ? {
          className: aud.className ?? "",
          fallbackIcon: aud.fallbackIcon ?? { iconClass: "fa-solid fa-volume-high" },
          attrs: aud.attrs && typeof aud.attrs === "object" ? aud.attrs : { controls: true, preload: "metadata" },
        }
      : null;

    const pdf = cfg.pdf && typeof cfg.pdf === "object" ? cfg.pdf : null;
    this.pdf = pdf
      ? {
          className: pdf.className ?? "",
          fallbackIcon: pdf.fallbackIcon ?? { iconClass: "fa-regular fa-file-pdf" },
          attrs: pdf.attrs && typeof pdf.attrs === "object" ? pdf.attrs : {},
        }
      : null;

    const glb = cfg.glb && typeof cfg.glb === "object" ? cfg.glb : null;
    this.glb = glb
      ? {
          alt: glb.alt ?? "3D model",
          className: glb.className ?? "",
          fallbackIcon: glb.fallbackIcon ?? { iconClass: "fa-solid fa-cube" },
          attrs:
            glb.attrs && typeof glb.attrs === "object"
              ? glb.attrs
              : {
                  crossorigin: "anonymous",
                  "camera-controls": true,
                  "auto-rotate": true,
                  "shadow-intensity": "1",
                  "environment-image": "neutral",
                },
        }
      : null;

    this.detailsClassName =
      typeof cfg.detailsClassName === "string" && cfg.detailsClassName.trim()
        ? cfg.detailsClassName
        : "d-flex flex-wrap gap-2 mt-2";

    const rawDetails = Array.isArray(cfg.details) ? cfg.details : [];
    this.details = rawDetails
      .map((t, i) => {
        const obj = t instanceof TagObject ? t : new TagObject(t || {});
        if (!String(obj.name || "").trim()) return null;
        if (!obj.id) obj.id = `tag-${i}`;
        return obj;
      })
      .filter(Boolean);

    const rawItems = Array.isArray(cfg.items) ? cfg.items : [];
    const items = rawItems
      .map((it, idx) => {
        const obj = it instanceof MediaItemObject ? it : new MediaItemObject(it || {}, idx);
        if (!obj.url) return null;
        return obj;
      })
      .filter(Boolean)
      .sort((a, b) => {
        const ap = a?.isPrimary ? 1 : 0;
        const bp = b?.isPrimary ? 1 : 0;
        if (bp !== ap) return bp - ap;
        return String(a?.id || "").localeCompare(String(b?.id || ""));
      });

    if (!items.length) {
      throw new Error("MediaObject requires at least 1 item with a non-empty `url`.");
    }

    this.items = items;
  }
}

/* ----------------------------- view ----------------------------- */

function MediaThumb({ item, activeId, size, onClick, media }) {
  const isActive = String(item?.id) === String(activeId);
  const kind = typeof item?.kind === "function" ? item.kind() : inferKindFromUrl(item?.url);

  const iconClass =
    kind === "glb"
      ? pickIconClass(media?.glb?.fallbackIcon, "fa-solid fa-cube")
      : kind === "pdf"
      ? pickIconClass(media?.pdf?.fallbackIcon, "fa-regular fa-file-pdf")
      : kind === "audio"
      ? pickIconClass(media?.aud?.fallbackIcon, "fa-solid fa-volume-high")
      : kind === "video"
      ? pickIconClass(media?.vid?.fallbackIcon, "fa-solid fa-play")
      : pickIconClass(media?.img?.fallbackIcon, "fa-regular fa-image");

  const aria =
    kind === "glb"
      ? "View 3D model"
      : kind === "pdf"
      ? "View PDF"
      : kind === "audio"
      ? "Play audio"
      : kind === "video"
      ? "View video"
      : "View image";

  return (
    <button
      type="button"
      className={`btn p-0 border rounded-3 overflow-hidden flex-shrink-0 ${
        isActive ? "border-primary" : "border-light"
      }`}
      style={{ width: size, height: size }}
      onClick={onClick}
      aria-label={aria}
      title={aria}
    >
      {item?.thumbUrl ? (
        <img src={item.thumbUrl} alt="Thumbnail" className="w-100 h-100 object-fit-cover" />
      ) : (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light">
          <i className={`${iconClass} text-muted`}></i>
        </div>
      )}
    </button>
  );
}

function renderActiveMedia(active, media, fitClass, keySuffix) {
  const url = String(active?.url || "").trim();
  const kind = typeof active?.kind === "function" ? active.kind() : inferKindFromUrl(active?.url);

  if (!url) {
    return (
      <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
        <div className="text-center">
          <i className="fa-solid fa-box-open fa-2x mb-2"></i>
          <div className="small">No media</div>
        </div>
      </div>
    );
  }

  if (kind === "glb") {
    const attrs = media?.glb?.attrs || {
      crossorigin: "anonymous",
      "camera-controls": true,
      "auto-rotate": true,
      "shadow-intensity": "1",
      "environment-image": "neutral",
    };

    return (
      <model-viewer
        key={`glb-${String(active?.id || "glb")}-${keySuffix}`}
        src={url}
        alt={media?.glb?.alt || "3D model"}
        className={`w-100 h-100 ${media?.glb?.className || ""}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", zIndex: Z_MEDIA }}
        {...attrs}
      />
    );
  }

  if (kind === "pdf") {
    const attrs = media?.pdf?.attrs || {};
    return (
      <iframe
        key={`pdf-${String(active?.id || "pdf")}-${keySuffix}`}
        src={url}
        title="PDF"
        className={`w-100 h-100 ${media?.pdf?.className || ""}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, zIndex: Z_MEDIA }}
        {...attrs}
      />
    );
  }

  if (kind === "audio") {
    const attrs = media?.aud?.attrs || { controls: true, preload: "metadata" };
    return (
      <div
        key={`aud-${String(active?.id || "aud")}-${keySuffix}`}
        className={`w-100 h-100 d-flex align-items-center justify-content-center ${media?.aud?.className || ""}`}
        style={{ position: "absolute", inset: 0, zIndex: Z_MEDIA }}
      >
        <audio src={url} {...attrs} />
      </div>
    );
  }

  if (kind === "video") {
    const attrs =
      media?.vid?.attrs && typeof media.vid.attrs === "object"
        ? media.vid.attrs
        : { autoPlay: true, loop: true, muted: true, playsInline: true, preload: "auto" };

    return (
      <video
        key={`vid-${String(active?.id || "vid")}-${keySuffix}`}
        src={url}
        className={`w-100 h-100 ${fitClass} ${media?.vid?.className || ""}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", zIndex: Z_MEDIA }}
        {...attrs}
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          try {
            v.currentTime = 0;
            const pr = v.play();
            if (pr && typeof pr.catch === "function") pr.catch(() => {});
          } catch {}
        }}
        onCanPlay={(e) => {
          const v = e.currentTarget;
          try {
            const pr = v.play();
            if (pr && typeof pr.catch === "function") pr.catch(() => {});
          } catch {}
        }}
      />
    );
  }

  const attrs = media?.img?.attrs || {};
  return (
    <img
      key={`img-${String(active?.id || "img")}-${keySuffix}`}
      src={url}
      alt={media?.img?.alt || "Image"}
      className={`w-100 h-100 ${fitClass} ${media?.img?.className || ""}`}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", zIndex: Z_MEDIA }}
      {...attrs}
    />
  );
}

function NameOverlay({ media, position }) {
  if (!media?.name || !(media.name instanceof LinkObject)) return null;

  const nd = media?.nameDisplay;
  const wrapperClass = String(nd?.wrapperClassName || "").trim();
  const textClass = String(nd?.className || "").trim();

  return (
    <div
      className={`position-absolute ${overlayPosClass(position)} m-2 ${wrapperClass}`.trim()}
      style={{ zIndex: Z_NAME, pointerEvents: "none" }}
    >
      <div className={textClass} style={{ display: "inline-flex", width: "auto", pointerEvents: "auto" }}>
        <AlloyLink link={media.name} />
      </div>
    </div>
  );
}

function NameInline({ media }) {
  if (!media?.name || !(media.name instanceof LinkObject)) return null;

  const nd = media?.nameDisplay;
  const wrapperClass = String(nd?.wrapperClassName || "").trim();
  const textClass = String(nd?.className || "").trim();

  return (
    <div className={wrapperClass} style={{ width: "auto" }}>
      <div className={textClass} style={{ display: "inline-flex", width: "auto" }}>
        <AlloyLink link={media.name} />
      </div>
    </div>
  );
}

export function AlloyMedia({ media }) {
  if (!media || !(media instanceof MediaObject)) {
    throw new Error("AlloyMedia requires `media` (MediaObject instance).");
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.customElements && !window.customElements.get("model-viewer")) {
        import("@google/model-viewer").catch(() => {});
      }
    } catch {}
  }, []);

  const items = useMemo(() => (Array.isArray(media.items) ? media.items : []), [media.items]);
  const first = items[0] || null;

  const [activeMediaId, setActiveMediaId] = useState(first ? String(first.id) : "");
  const active = useMemo(
    () => items.find((m) => String(m.id) === String(activeMediaId)) || first,
    [items, activeMediaId, first]
  );

  const activeKind = useMemo(() => {
    if (!active) return "unknown";
    return typeof active?.kind === "function" ? active.kind() : inferKindFromUrl(active?.url);
  }, [active]);

  const [zoomOpen, setZoomOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [thumbPx, setThumbPx] = useState(Number(media.thumbSize || 72));

  const canThumbs = !!media.thumbSize && Array.isArray(items) && items.length > 1;
  const canCarousel = !!media.carousel && Array.isArray(items) && items.length > 1;

  useEffect(() => {
    if (!canThumbs) return;
    function compute() {
      const base = Number(media.thumbSize || 72);
      const w = typeof window !== "undefined" ? window.innerWidth : 1200;
      const next = w < 380 ? Math.min(56, base) : w < 576 ? Math.min(64, base) : base;
      setThumbPx(next);
    }
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [media.thumbSize, canThumbs]);

  useEffect(() => {
    if (!zoomOpen) return;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    const sbw = window.innerWidth - document.documentElement.clientWidth;
    if (sbw > 0) body.style.paddingRight = `${sbw}px`;

    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [zoomOpen]);

  function currentIndex() {
    return Math.max(0, items.findIndex((m) => String(m.id) === String(activeMediaId)));
  }

  function goNext() {
    if (!Array.isArray(items) || items.length <= 1) return;
    const idx = currentIndex();
    const next = idx + 1 < items.length ? idx + 1 : 0;
    setActiveMediaId(String(items[next].id));
  }

  function goPrev() {
    if (!Array.isArray(items) || items.length <= 1) return;
    const idx = currentIndex();
    const prev = idx - 1 >= 0 ? idx - 1 : items.length - 1;
    setActiveMediaId(String(items[prev].id));
  }

  useEffect(() => {
    if (!canCarousel) return;
    if (!media?.carousel?.keyboard) return;

    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canCarousel, media?.carousel?.keyboard, activeMediaId, items]);

  useEffect(() => {
    const auto = media?.auto;
    if (!auto?.enabled) return;
    if (!Array.isArray(items) || items.length <= 1) return;

    if (auto.pauseOnZoom && zoomOpen) return;
    if (auto.pauseOnHover && hover) return;

    const idx = currentIndex();
    const nextIdx = idx + 1 < items.length ? idx + 1 : auto.loop ? 0 : idx;
    if (nextIdx === idx) return;

    const t = window.setTimeout(() => {
      setActiveMediaId(String(items[nextIdx].id));
    }, Number(auto.intervalMs || 5000));

    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media, items, activeMediaId, hover, zoomOpen]);

  const zoomBtnWrapperClass = `${media.zoom?.wrapperClassName || "position-absolute top-0 end-0 m-2"}`;
  const zoomBtnClass = media.zoom?.buttonClassName || "btn btn-light btn-sm rounded-circle shadow-sm";
  const zoomIconClass = String(media.zoom?.icon?.iconClass || "fa-solid fa-magnifying-glass-plus");

  const showZoom = !!media.zoom && Array.isArray(items) && items.length > 0;
  const idx = currentIndex();

  const ndPos = namePosition(media?.nameDisplay?.position);
  const showNameTop = !!media?.nameDisplay && ndPos === "top";
  const showNameBelow = !!media?.nameDisplay && ndPos === "below";
  const showNameOverlay = !!media?.nameDisplay && isOverlayPos(ndPos) && activeKind !== "glb";

  const cardFrameClass =
    media.frameClassName && String(media.frameClassName).trim()
      ? `bg-light rounded-4 overflow-hidden border position-relative w-100 d-flex align-items-center justify-content-center ${String(
          media.frameClassName
        ).trim()}`
      : "ratio ratio-1x1 bg-light rounded-4 overflow-hidden border position-relative w-100 d-flex align-items-center justify-content-center";

  const hasDetails = Array.isArray(media.details) && media.details.length > 0;

  return (
    <>
      <div id={media.id} className={`${media.className || ""}`}>
        {showNameTop ? <NameInline media={media} /> : null}

        <div className={cardFrameClass} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          {renderActiveMedia(active, media, media.img?.cardFitClass || "object-fit-cover", "card")}

          {showNameOverlay ? <NameOverlay media={media} position={ndPos} /> : null}

          {canCarousel && (media?.carousel?.controls || media?.carousel?.indicators) ? (
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{ zIndex: Z_CAROUSEL, pointerEvents: "none" }}
            >
              {media?.carousel?.controls ? (
                <>
                  <button
                    type="button"
                    className="btn btn-light btn-sm position-absolute top-50 start-0 translate-middle-y ms-2 shadow-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      goPrev();
                    }}
                    aria-label="Previous"
                    title="Previous"
                    style={{ pointerEvents: "auto" }}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light btn-sm position-absolute top-50 end-0 translate-middle-y me-2 shadow-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      goNext();
                    }}
                    aria-label="Next"
                    title="Next"
                    style={{ pointerEvents: "auto" }}
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </>
              ) : null}

              {media?.carousel?.indicators ? (
                <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2 d-flex gap-2">
                  {items.map((m, i) => (
                    <button
                      key={`dot-${m.id}`}
                      type="button"
                      className={`btn p-0 rounded-circle ${i === idx ? "bg-primary" : "bg-white"} border`}
                      style={{
                        width: 10,
                        height: 10,
                        opacity: i === idx ? 1 : 0.75,
                        pointerEvents: "auto",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveMediaId(String(m.id));
                      }}
                      aria-label={`Go to item ${i + 1}`}
                      title={`Item ${i + 1}`}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {showZoom ? (
            <div
              className={zoomBtnWrapperClass}
              style={{
                zIndex: Z_ZOOM,
                opacity: hover ? 1 : 0,
                pointerEvents: hover ? "auto" : "none",
                transition: "opacity 0.2s ease-in-out",
                display: "inline-flex",
                width: "auto",
                height: "auto",
              }}
            >
              <button
                type="button"
                className={zoomBtnClass}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setZoomOpen(true);
                }}
                aria-label="Zoom media"
                title="Zoom"
                style={{ width: 34, height: 34 }}
              >
                <i className={zoomIconClass}></i>
              </button>
            </div>
          ) : null}
        </div>

        {showNameBelow ? <NameInline media={media} /> : null}

        {canThumbs ? (
          <div className="mt-2">
            <div className="d-flex gap-2 overflow-auto pb-1">
              {items.map((m) => (
                <MediaThumb
                  key={m.id}
                  item={m}
                  activeId={active?.id}
                  size={thumbPx}
                  media={media}
                  onClick={() => setActiveMediaId(String(m.id))}
                />
              ))}
            </div>
          </div>
        ) : null}

        {hasDetails ? (
          <div className={media.detailsClassName}>
            {media.details.map((t) => (
              <span key={t.id} className={t.className} title={t.title || undefined}>
                {t.name}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {zoomOpen && showZoom ? (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ zIndex: 2000 }}
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomOpen(false)}
        >
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75" />

          <div className="position-relative w-100 h-100 d-flex flex-column" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="btn btn-light btn-sm position-absolute top-0 end-0 m-3"
              onClick={() => setZoomOpen(false)}
              aria-label="Close"
              title="Close"
              style={{ zIndex: 5 }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="p-3 p-md-4 text-white">
              <div className="fw-semibold text-truncate pe-5">{media.name?.name || "Media"}</div>
            </div>

            <div className="flex-grow-1 px-2 px-md-4 pb-3">
              <div className="w-100 h-100 bg-light rounded-4 overflow-hidden border position-relative d-flex align-items-center justify-content-center">
                {renderActiveMedia(
                  active,
                  media,
                  (() => {
                    const k = typeof active?.kind === "function" ? active.kind() : inferKindFromUrl(active?.url);
                    if (k === "video") return media.vid?.zoomFitClass || "object-fit-contain";
                    return media.img?.zoomFitClass || "object-fit-contain";
                  })(),
                  "zoom"
                )}
              </div>
            </div>

            {canThumbs ? (
              <div className="pb-3 px-2 px-md-4">
                <div className="d-flex gap-2 overflow-auto pb-1">
                  {items.map((m) => (
                    <MediaThumb
                      key={"zoom-" + m.id}
                      item={m}
                      activeId={active?.id}
                      size={thumbPx}
                      media={media}
                      onClick={() => setActiveMediaId(String(m.id))}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AlloyMedia;
