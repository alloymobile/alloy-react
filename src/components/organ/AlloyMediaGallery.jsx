// src/lib/components/tissue/AlloyMediaGallery.jsx
import React, { useMemo } from "react";
import { generateId } from "../../utils/idHelper.js";
import AlloyMedia, { MediaObject } from "../cell/AlloyMedia.jsx";

function cn(...xs) {
  return xs.filter(Boolean).join(" ").trim();
}

export class MediaGalleryObject {
  constructor(g = {}) {
    this.id = g.id ?? generateId("mediaGallery");
    this.name = g.name ?? "";
    this.className = typeof g.className === "string" ? g.className : "";

    const layout = String(g.layout ?? "grid").toLowerCase();
    this.layout = ["bootstrap", "grid", "masonry", "list"].includes(layout) ? layout : "grid";

    this.columns = Number.isFinite(g.columns) ? g.columns : 12;
    this.rowHeight = Number.isFinite(g.rowHeight) ? g.rowHeight : 180;
    this.gap = Number.isFinite(g.gap) ? g.gap : 12;

    const items = Array.isArray(g.items) ? g.items : [];
    this.items = items.map((x) => (x instanceof MediaObject ? x : new MediaObject(x || {})));
  }
}

export function AlloyMediaGallery({ mediaGallery }) {
  const gallery = useMemo(() => {
    return mediaGallery instanceof MediaGalleryObject
      ? mediaGallery
      : new MediaGalleryObject(mediaGallery || {});
  }, [mediaGallery]);

  const items = Array.isArray(gallery.items) ? gallery.items : [];
  const gapPx = Math.max(0, Number(gallery.gap || 0));

  const gutterStyle = {
    "--bs-gutter-x": `${gapPx}px`,
    "--bs-gutter-y": `${gapPx}px`,
  };

  const header = gallery.name ? <div className={gallery.className}>{gallery.name}</div> : null;

  // ---------------- masonry (CSS grid collage) ----------------
  if (gallery.layout === "masonry") {
    const cols = Math.max(1, Math.min(24, Number(gallery.columns || 12)));
    const rowH = Math.max(1, Number(gallery.rowHeight || 180));

    const containerStyle = {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gridAutoRows: `${rowH}px`,
      gap: `${gapPx}px`,
    };

    return (
      <div id={gallery.id} className="w-100">
        {header}
        <div style={containerStyle}>
          {items.map((m) => {
            // IMPORTANT: masonry must not force square ratio, so ensure fill height.
            const media = m instanceof MediaObject ? m : new MediaObject(m || {});
            if (!String(media.frameClassName || "").trim()) media.frameClassName = "h-100";
            media.className = cn(media.className, "h-100");

            const colSpan = Math.max(1, Math.floor(Number(media.colSpan || 1)));
            const rowSpan = Math.max(1, Math.floor(Number(media.rowSpan || 1)));

            const tileStyle = {
              gridColumnEnd: `span ${Math.min(cols, colSpan)}`,
              gridRowEnd: `span ${rowSpan}`,
            };

            return (
              <div key={media.id} style={tileStyle} className="h-100">
                <AlloyMedia media={media} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------------- list (stacked) ----------------
  if (gallery.layout === "list") {
    return (
      <div id={gallery.id} className="w-100">
        {header}
        <div className="d-flex flex-column" style={{ gap: `${gapPx}px` }}>
          {items.map((m) => {
            const media = m instanceof MediaObject ? m : new MediaObject(m || {});
            return (
              <div key={media.id}>
                <AlloyMedia media={media} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------------- bootstrap (responsive stacking) ----------------
  // columns = the md span out of 12 (ex: 6 => 2/row on md+, stacks on mobile)
  if (gallery.layout === "bootstrap") {
    const mdSpan = Math.max(1, Math.min(12, Math.floor(Number(gallery.columns || 6))));

    return (
      <div id={gallery.id} className="w-100">
        {header}
        <div className="row" style={gutterStyle}>
          {items.map((m) => {
            const media = m instanceof MediaObject ? m : new MediaObject(m || {});
            return (
              <div key={media.id} className={cn("col-12", `col-md-${mdSpan}`)}>
                <AlloyMedia media={media} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------------- grid (fixed span all breakpoints) ----------------
  const span = Math.max(1, Math.min(12, Math.floor(Number(gallery.columns || 4))));
  return (
    <div id={gallery.id} className="w-100">
      {header}
      <div className="row" style={gutterStyle}>
        {items.map((m) => {
          const media = m instanceof MediaObject ? m : new MediaObject(m || {});
          return (
            <div key={media.id} className={cn(`col-${span}`)}>
              <AlloyMedia media={media} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AlloyMediaGallery;
