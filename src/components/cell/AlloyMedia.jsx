// src/components/tissue/AlloyMedia.jsx
import React, { useEffect, useMemo, useState } from "react";
import { generateId } from "../../utils/idHelper.js";

/* ----------------------------- helpers ----------------------------- */

function isGlbUrl(url) {
  return /\.glb(\?|#|$)/i.test(String(url || ""));
}

function isVideoUrl(url) {
  return /\.(mp4|webm|ogg)(\?|#|$)/i.test(String(url || ""));
}

function inferKind(item) {
  const url = String(item?.url || "").trim();
  if (!url) return "image";
  if (String(item?.kind || "").trim()) return String(item.kind).trim();
  if (isGlbUrl(url) || String(item?.mimeType || "").toLowerCase() === "model/gltf-binary") return "glb";
  if (isVideoUrl(url) || String(item?.mimeType || "").toLowerCase().startsWith("video/")) return "video";
  return "image";
}

function pickIconClass(fallback, def) {
  const c = String(fallback?.iconClass || "").trim();
  return c || def;
}

/* -------------------------- object models -------------------------- */

export class MediaObject {
  constructor(cfg = {}) {
    this.id = cfg.id ?? generateId("media");
    this.name = typeof cfg.name === "string" ? cfg.name : "";

    this.className = typeof cfg.className === "string" ? cfg.className : "";
    this.colClass = typeof cfg.colClass === "string" ? cfg.colClass : "col-12";

    this.thumbSize = Number.isFinite(Number(cfg.thumbSize)) ? Number(cfg.thumbSize) : 72;

    const rawItems = Array.isArray(cfg.items) ? cfg.items : [];
    this.items = rawItems
      .map((it, idx) => {
        const url = String(it?.url || "").trim();
        if (!url) return null;
        return {
          id: String(it?.id || `media-${idx}`),
          url,
          thumbUrl: String(it?.thumbUrl || it?.thumbnailUrl || "").trim() || "",
          isPrimary: !!it?.isPrimary,
          kind: inferKind(it),
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        const ap = a?.isPrimary ? 1 : 0;
        const bp = b?.isPrimary ? 1 : 0;
        if (bp !== ap) return bp - ap;
        return String(a?.id || "").localeCompare(String(b?.id || ""));
      });

    if (!this.items.length) {
      throw new Error("MediaObject requires at least 1 item with a non-empty `url`.");
    }

    const img = cfg.img && typeof cfg.img === "object" ? cfg.img : {};
    this.img = {
      alt: img.alt ?? "Image",
      className: img.className ?? "",
      cardFitClass: img.cardFitClass ?? "object-fit-cover",
      zoomFitClass: img.zoomFitClass ?? "object-fit-contain",
      fallbackIcon: img.fallbackIcon ?? { iconClass: "fa-regular fa-image" },
      attrs: img.attrs && typeof img.attrs === "object" ? img.attrs : {},
    };

    const vid = cfg.vid && typeof cfg.vid === "object" ? cfg.vid : {};
    this.vid = {
      className: vid.className ?? "",
      cardFitClass: vid.cardFitClass ?? "object-fit-cover",
      zoomFitClass: vid.zoomFitClass ?? "object-fit-contain",
      fallbackIcon: vid.fallbackIcon ?? { iconClass: "fa-solid fa-play" },
      attrs:
        vid.attrs && typeof vid.attrs === "object"
          ? vid.attrs
          : { autoPlay: true, loop: true, muted: true, playsInline: true, preload: "auto" },
    };

    const glb = cfg.glb && typeof cfg.glb === "object" ? cfg.glb : {};
    this.glb = {
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
    };

    const zoom = cfg.zoom && typeof cfg.zoom === "object" ? cfg.zoom : {};
    this.zoom = {
      icon: zoom.icon ?? { iconClass: "fa-solid fa-magnifying-glass-plus" },
      buttonClassName:
        zoom.buttonClassName ??
        "btn btn-light btn-sm rounded-circle shadow-sm d-flex align-items-center justify-content-center",
      wrapperClassName: zoom.wrapperClassName ?? "position-absolute top-0 start-0 m-2",
    };
  }
}

/* ----------------------------- view ----------------------------- */

function MediaThumb({ item, activeId, size, onClick, media }) {
  const isActive = String(item?.id) === String(activeId);
  const kind = item?.kind || "image";

  const iconClass =
    kind === "glb"
      ? pickIconClass(media?.glb?.fallbackIcon, "fa-solid fa-cube")
      : kind === "video"
      ? pickIconClass(media?.vid?.fallbackIcon, "fa-solid fa-play")
      : pickIconClass(media?.img?.fallbackIcon, "fa-regular fa-image");

  const aria =
    kind === "glb" ? "View 3D model" : kind === "video" ? "View video" : "View image";

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
  const kind = active?.kind || inferKind(active);

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
    const attrs = media?.glb?.attrs || {};
    return (
      <model-viewer
        key={`glb-${String(active?.id || "glb")}-${keySuffix}`}
        src={url}
        alt={media?.glb?.alt || "3D model"}
        class={`w-100 h-100 ${media?.glb?.className || ""}`}
        style={{ position: "absolute", inset: 0 }}
        {...attrs}
      />
    );
  }

  if (kind === "video") {
    const attrs = media?.vid?.attrs || {};
    return (
      <video
        key={`vid-${String(active?.id || "vid")}-${keySuffix}`}
        src={url}
        className={`w-100 h-100 ${fitClass} ${media?.vid?.className || ""}`}
        style={{ position: "absolute", inset: 0, margin: "auto" }}
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
      style={{ position: "absolute", inset: 0, margin: "auto" }}
      {...attrs}
    />
  );
}

export function AlloyMedia({ media }) {
  if (!media || !(media instanceof MediaObject)) {
    throw new Error("AlloyMedia requires `media` (MediaObject instance).");
  }

  const items = useMemo(
    () => (Array.isArray(media.items) ? media.items : []),
    [media.items]
  );
  const first = items[0] || null;

  const [activeMediaId, setActiveMediaId] = useState(first ? String(first.id) : "");
  const active = useMemo(
    () => items.find((m) => String(m.id) === String(activeMediaId)) || first,
    [items, activeMediaId, first]
  );

  const [zoomOpen, setZoomOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [thumbPx, setThumbPx] = useState(Number(media.thumbSize || 72));

  useEffect(() => {
    function compute() {
      const base = Number(media.thumbSize || 72);
      const w = typeof window !== "undefined" ? window.innerWidth : 1200;
      const next = w < 380 ? Math.min(56, base) : w < 576 ? Math.min(64, base) : base;
      setThumbPx(next);
    }
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [media.thumbSize]);

  useEffect(() => {
    if (!zoomOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [zoomOpen]);

  // Close modal on Escape key
  useEffect(() => {
    if (!zoomOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setZoomOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [zoomOpen]);

  const zoomBtnWrapperClass = `${media.zoom?.wrapperClassName || "position-absolute top-0 start-0 m-2"}`;

  const zoomBtnClass = media.zoom?.buttonClassName || "btn btn-light btn-sm rounded-circle shadow-sm";
  const zoomIconClass = String(media.zoom?.icon?.iconClass || "fa-solid fa-magnifying-glass-plus");

  return (
    <>
      <div id={media.id} className={`${media.colClass || ""} ${media.className || ""}`}>
        <div
          className="ratio ratio-1x1 bg-light rounded-4 overflow-hidden border position-relative w-100"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Media content layer */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {renderActiveMedia(active, media, media.img?.cardFitClass || "object-fit-cover", "card")}
          </div>

          {/* Zoom button layer - always on top with pointer-events control */}
          <div
            className={zoomBtnWrapperClass}
            style={{
              zIndex: 10,
              opacity: hover ? 1 : 0,
              pointerEvents: hover ? "auto" : "none",
              transition: "opacity 0.2s ease-in-out",
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
              style={{ width: 36, height: 36 }}
            >
              <i className={zoomIconClass}></i>
            </button>
          </div>
        </div>

        {items.length > 1 ? (
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
      </div>

      {zoomOpen ? (
        <>
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            onClick={() => setZoomOpen(false)}
          >
            <div className="modal-dialog modal-dialog-centered modal-xl" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content rounded-4 overflow-hidden border-0 shadow">
                <div className="modal-header">
                  <div className="fw-semibold text-truncate">{media.name || "Media"}</div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setZoomOpen(false)}
                    aria-label="Close"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <div className="modal-body p-0 bg-light">
                  <div className="ratio ratio-1x1">
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {renderActiveMedia(
                        active,
                        media,
                        active?.kind === "video"
                          ? media.vid?.zoomFitClass || "object-fit-contain"
                          : media.img?.zoomFitClass || "object-fit-contain",
                        "zoom"
                      )}
                    </div>
                  </div>
                </div>

                {items.length > 1 ? (
                  <div className="modal-footer d-block">
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
                ) : (
                  <div className="modal-footer"></div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      ) : null}
    </>
  );
}

export default AlloyMedia;