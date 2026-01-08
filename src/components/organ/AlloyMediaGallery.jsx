// src/lib/components/tissue/AlloyMediaGallery.jsx
import React, { useMemo } from "react";
import "@google/model-viewer";
import { generateId } from "../../utils/idHelper.js";

export class MediaGalleryItemObject {
  constructor(item = {}) {
    this.id = item.id ?? generateId("mg-item");

    const t = String(item.type ?? "image").toLowerCase();
    this.type = ["image", "video", "glb", "icon"].includes(t) ? t : "image";

    this.url = String(item.url ?? "").trim();
    this.title = item.title ?? "";

    this.colSpan = Number.isFinite(item.colSpan) ? item.colSpan : null;
    this.rowSpan = Number.isFinite(item.rowSpan) ? item.rowSpan : null;

    this.itemClass = typeof item.itemClass === "string" ? item.itemClass : "";
    this.mediaClass = typeof item.mediaClass === "string" ? item.mediaClass : "";

    this.iconClass =
      typeof item.iconClass === "string"
        ? item.iconClass
        : typeof item.icon?.iconClass === "string"
        ? item.icon.iconClass
        : "";

    this.link = item.link ?? null;
    this.meta = item.meta && typeof item.meta === "object" ? item.meta : {};
  }
}

export class MediaGalleryObject {
  constructor(g = {}) {
    this.id = g.id ?? generateId("mediaGallery");
    this.name = g.name ?? "";
    this.nameClass = typeof g.nameClass === "string" ? g.nameClass : "";

    const layout = String(g.layout ?? "grid").toLowerCase();
    this.layout = ["grid", "masonry", "list"].includes(layout) ? layout : "grid";

    this.columns = Number.isFinite(g.columns) ? g.columns : 12;
    this.rowHeight = Number.isFinite(g.rowHeight) ? g.rowHeight : 180;
    this.gap = Number.isFinite(g.gap) ? g.gap : 12;

    this.className = typeof g.className === "string" ? g.className : "";
    this.mediaClass = typeof g.mediaClass === "string" ? g.mediaClass : "";

    const tp = String(g.titlePosition ?? "overlay").toLowerCase();
    this.titlePosition = ["overlay", "top", "below", "side"].includes(tp) ? tp : "overlay";

    this.titleClass = typeof g.titleClass === "string" ? g.titleClass : "badge bg-dark bg-opacity-75";

    const items = Array.isArray(g.items) ? g.items : [];
    this.items = items.map((x) => (x instanceof MediaGalleryItemObject ? x : new MediaGalleryItemObject(x)));
  }
}

function cn(...xs) {
  return xs.filter(Boolean).join(" ").trim();
}

function normalizeLink(link) {
  if (!link) return null;
  if (typeof link === "string") return { href: link };
  if (typeof link === "object" && link.href) return link;
  return null;
}

function safeTarget(target) {
  const t = String(target ?? "_self");
  return t === "_blank" ? "_blank" : "_self";
}

function relForTarget(target) {
  return target === "_blank" ? "noreferrer" : undefined;
}

function ItemWrapper({ link, fullLink, className, style, children }) {
  if (fullLink && link?.href) {
    const target = safeTarget(link.target);
    return (
      <a
        href={link.href}
        target={target}
        rel={relForTarget(target)}
        className={cn("d-block text-reset text-decoration-none", className)}
        style={style}
        aria-label={link.ariaLabel ?? "Open"}
      >
        {children}
      </a>
    );
  }

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

function ClickableTitle({ title, titleClass, link }) {
  if (!title) return null;

  const badge = <span className={titleClass}>{title}</span>;

  if (!link?.href) return badge;

  const target = safeTarget(link.target);
  return (
    <a
      href={link.href}
      target={target}
      rel={relForTarget(target)}
      className="text-reset text-decoration-none"
      onClick={(e) => e.stopPropagation()}
      aria-label={link.ariaLabel ?? title}
    >
      {badge}
    </a>
  );
}

function renderTitle(item, titlePosition, titleClass, titleLink) {
  if (!item.title) return null;

  if (titlePosition === "overlay") {
    return (
      <div className="position-absolute bottom-0 start-0 m-2">
        <ClickableTitle title={item.title} titleClass={titleClass} link={titleLink} />
      </div>
    );
  }

  if (titlePosition === "top") {
    return (
      <div className="position-absolute top-0 start-0 m-2">
        <ClickableTitle title={item.title} titleClass={titleClass} link={titleLink} />
      </div>
    );
  }

  if (titlePosition === "below") {
    return (
      <div className="mt-2 fw-semibold">
        <ClickableTitle title={item.title} titleClass={titleClass} link={titleLink} />
      </div>
    );
  }

  return null;
}

function renderMedia(item, galleryMediaClass) {
  const baseMediaClass = cn("w-100 h-100", item.mediaClass || galleryMediaClass);

  if (item.type === "icon") {
    return (
      <div className={baseMediaClass}>
        {item.iconClass ? <i className={item.iconClass} aria-hidden="true" /> : null}
      </div>
    );
  }

  if (!item.url) return <div className={cn("w-100 h-100 bg-light")} />;

  if (item.type === "video") {
    const m = item.meta || {};
    const poster = m.poster ? String(m.poster) : undefined;

    const autoPlay = m.autoPlay !== false;
    const loop = m.loop !== false;
    const muted = m.muted !== false;
    const playsInline = m.playsInline !== false;
    const controls = m.controls === true;

    return (
      <video
        className={baseMediaClass}
        src={item.url}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        controls={controls}
        preload="metadata"
      />
    );
  }

  if (item.type === "glb") {
    return (
      <model-viewer
        className={baseMediaClass}
        src={item.url}
        camera-controls
        style={{ width: "100%", height: "100%" }}
      />
    );
  }

  const alt = item.meta?.alt ? String(item.meta.alt) : String(item.title || "");
  return <img className={cn("d-block", baseMediaClass)} src={item.url} alt={alt} loading="lazy" />;
}

export function AlloyMediaGallery({ mediaGallery }) {
  const gallery = useMemo(() => {
    return mediaGallery instanceof MediaGalleryObject
      ? mediaGallery
      : new MediaGalleryObject(mediaGallery || {});
  }, [mediaGallery]);

  const items = gallery.items || [];
  const gapPx = Math.max(0, gallery.gap || 0);

  const gutterStyle = {
    "--bs-gutter-x": `${gapPx}px`,
    "--bs-gutter-y": `${gapPx}px`
  };

  const header = gallery.name ? <div className={gallery.nameClass}>{gallery.name}</div> : null;

  if (gallery.layout === "masonry") {
    const cols = Math.max(1, gallery.columns || 12);
    const rowH = Math.max(1, gallery.rowHeight || 180);

    const containerStyle = {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gridAutoRows: `${rowH}px`,
      gap: `${gapPx}px`
    };

    return (
      <div id={gallery.id} className="w-100">
        {header}
        <div style={containerStyle}>
          {items.map((item) => {
            const wrapperClass = item.itemClass || gallery.className;
            const link = normalizeLink(item.link);

            const fullLink = !!link?.href && item.type !== "glb";
            const titleLink = item.type === "glb" ? link : null;

            const colSpan = Math.max(1, item.colSpan || 1);
            const rowSpan = Math.max(1, item.rowSpan || 1);

            const tileStyle = {
              gridColumnEnd: `span ${Math.min(cols, colSpan)}`,
              gridRowEnd: `span ${rowSpan}`
            };

            return (
              <ItemWrapper key={item.id} link={link} fullLink={fullLink} className={wrapperClass} style={tileStyle}>
                <div className="position-relative w-100 h-100">
                  {renderMedia(item, gallery.mediaClass)}
                  {gallery.titlePosition !== "below"
                    ? renderTitle(item, gallery.titlePosition, gallery.titleClass, titleLink)
                    : null}
                </div>

                {gallery.titlePosition === "below"
                  ? renderTitle(item, "below", gallery.titleClass, titleLink)
                  : null}
              </ItemWrapper>
            );
          })}
        </div>
      </div>
    );
  }

  if (gallery.layout === "list") {
    return (
      <div id={gallery.id} className="w-100">
        {header}
        {items.map((item) => {
          const link = normalizeLink(item.link);
          const fullLink = !!link?.href && item.type !== "glb";
          const titleLink = item.type === "glb" ? link : null;

          const wrapperClass = item.itemClass || gallery.className;

          if (gallery.titlePosition === "side") {
            return (
              <ItemWrapper
                key={item.id}
                link={link}
                fullLink={fullLink}
                className="d-block"
                style={{ marginBottom: gapPx }}
              >
                <div className="row align-items-start" style={gutterStyle}>
                  <div className="col-12 col-md-5">
                    <div className={wrapperClass}>
                      <div className="position-relative w-100 h-100">
                        {renderMedia(item, gallery.mediaClass)}
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    {item.title ? (
                      <div className="fw-semibold">
                        {item.type === "glb" ? (
                          <a
                            href={titleLink?.href || "#"}
                            target={titleLink?.href ? safeTarget(titleLink.target) : undefined}
                            rel={titleLink?.href ? relForTarget(safeTarget(titleLink.target)) : undefined}
                            className={titleLink?.href ? "text-reset text-decoration-none" : ""}
                            onClick={(e) => {
                              if (!titleLink?.href) e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            {item.title}
                          </a>
                        ) : (
                          item.title
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
              </ItemWrapper>
            );
          }

          return (
            <ItemWrapper
              key={item.id}
              link={link}
              fullLink={fullLink}
              className={wrapperClass}
              style={{ marginBottom: gapPx }}
            >
              <div className="position-relative w-100 h-100">
                {renderMedia(item, gallery.mediaClass)}
                {gallery.titlePosition !== "below"
                  ? renderTitle(item, gallery.titlePosition, gallery.titleClass, titleLink)
                  : null}
              </div>

              {gallery.titlePosition === "below"
                ? renderTitle(item, "below", gallery.titleClass, titleLink)
                : null}
            </ItemWrapper>
          );
        })}
      </div>
    );
  }

  return (
    <div id={gallery.id} className="w-100">
      {header}
      <div className="row" style={gutterStyle}>
        {items.map((item) => {
          const wrapperClass = item.itemClass || gallery.className;
          const link = normalizeLink(item.link);

          const fullLink = !!link?.href && item.type !== "glb";
          const titleLink = item.type === "glb" ? link : null;

          return (
            <ItemWrapper key={item.id} link={link} fullLink={fullLink} className={wrapperClass}>
              <div className="position-relative w-100 h-100">
                {renderMedia(item, gallery.mediaClass)}
                {gallery.titlePosition !== "below"
                  ? renderTitle(item, gallery.titlePosition, gallery.titleClass, titleLink)
                  : null}
              </div>

              {gallery.titlePosition === "below"
                ? renderTitle(item, "below", gallery.titleClass, titleLink)
                : null}
            </ItemWrapper>
          );
        })}
      </div>
    </div>
  );
}

export default AlloyMediaGallery;