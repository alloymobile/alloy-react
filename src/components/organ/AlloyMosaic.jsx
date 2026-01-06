// src/components/tissue/AlloyMosaic.jsx
import React from "react";
import { Link } from "react-router-dom";
import { generateId, BlockObject } from "../../utils/idHelper.js";

/* ----------------------------- helpers ----------------------------- */

function resolveLink(template, data) {
  if (!template || typeof template !== "string") return "";

  const trimmed = template.trim();
  if (!trimmed) return "";

  if (trimmed.includes("{")) {
    return trimmed.replace(/{(\w+)}/g, (_match, key) => {
      const val = data && data[key] != null ? data[key] : "";
      return val != null ? String(val) : "";
    });
  }

  return trimmed;
}

function asCssLen(v, fallback) {
  if (v == null) return fallback;
  if (typeof v === "number" && Number.isFinite(v)) return `${v}px`;
  if (typeof v === "string" && v.trim()) return v.trim();
  return fallback;
}

function clampInt(v, min, max, fallback) {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  const i = Math.floor(n);
  if (i < min) return min;
  if (i > max) return max;
  return i;
}

function radiusClass(radius) {
  const r = String(radius || "").trim().toLowerCase();
  if (!r) return "rounded-4";
  if (r === "none") return "";
  if (r === "sm") return "rounded-2";
  if (r === "md") return "rounded-3";
  if (r === "lg") return "rounded-4";
  if (r === "pill") return "rounded-pill";
  return "rounded-4";
}

/* ----------------------------- MosaicObject ----------------------------- */

export class MosaicObject {
  constructor(mosaic = {}) {
    this.id = mosaic.id ?? generateId("mosaic");
    this.className =
      mosaic.className ?? "card border-0 shadow-sm rounded-4 overflow-hidden";

    this.wrapperClass = mosaic.wrapperClass ?? "col-12";
    this.link = typeof mosaic.link === "string" ? mosaic.link : "";

    const rawHeader = mosaic.header ?? {};
    this.header =
      rawHeader instanceof BlockObject ? rawHeader : new BlockObject(rawHeader);

    const rawBody = mosaic.body ?? {};
    this.body = rawBody instanceof BlockObject ? rawBody : new BlockObject(rawBody);

    const rawFooter = mosaic.footer ?? {};
    this.footer =
      rawFooter instanceof BlockObject ? rawFooter : new BlockObject(rawFooter);

    const fig = mosaic.figure ?? {};
    this.figure = {
      enabled: !!fig.enabled,
      title: fig.title ?? "",
      subtitle: fig.subtitle ?? "",
      align: fig.align ?? "center",
      className: fig.className ?? "",
    };

    const g = mosaic.grid ?? {};
    const columns = clampInt(g.columns, 1, 24, 12);

    this.grid = {
      columns,
      rowHeight: asCssLen(g.rowHeight, "clamp(56px, 6vw, 96px)"),
      className: g.className ?? "gap-2",
      style: g.style ?? {},
    };

    const rawItems = Array.isArray(mosaic.items) ? mosaic.items : [];
    if (rawItems.length === 0) {
      throw new Error("MosaicObject requires at least one item in `items`.");
    }

    this.items = rawItems.map((it = {}) => {
      const colSpan = clampInt(it.colSpan, 1, columns, 3);
      const rowSpan = clampInt(it.rowSpan, 1, 50, 2);

      const kind = String(it.kind || "").trim().toLowerCase() || (it.src ? "image" : "text");

      return {
        id: it.id ?? generateId("tile"),
        kind,
        src: it.src ?? it.url ?? "",
        alt: it.alt ?? "",
        text: it.text ?? it.name ?? "",
        colSpan,
        rowSpan,
        className: it.className ?? "",
        radius: it.radius ?? "lg",
        fit: it.fit ?? "cover",
        link: typeof it.link === "string" ? it.link : "",
        overlay: it.overlay ?? null,
        data: it.data ?? it,
      };
    });
  }
}

/* ----------------------------- AlloyMosaic ----------------------------- */

export function AlloyMosaic({ mosaic }) {
  if (!mosaic || !(mosaic instanceof MosaicObject)) {
    throw new Error("AlloyMosaic requires `mosaic` (MosaicObject instance).");
  }

  const shouldRenderHeader =
    mosaic.header && (mosaic.header.hasText() || mosaic.header.className?.trim());

  const headerSection = shouldRenderHeader ? (
    <div
      id={mosaic.header.id}
      className={mosaic.header.className || "card-header py-2 fw-semibold"}
      aria-label={mosaic.header.ariaLabel}
    >
      {mosaic.header.name}
    </div>
  ) : null;

  const shouldRenderFooter =
    mosaic.footer && (mosaic.footer.hasText() || mosaic.footer.className?.trim());

  const footerSection = shouldRenderFooter ? (
    <div
      id={mosaic.footer.id}
      className={
        mosaic.footer.className ||
        "card-footer d-flex align-items-center justify-content-between py-2"
      }
      aria-label={mosaic.footer.ariaLabel}
    >
      {mosaic.footer.name && <span>{mosaic.footer.name}</span>}
    </div>
  ) : null;

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${mosaic.grid.columns}, minmax(0, 1fr))`,
    gridAutoRows: mosaic.grid.rowHeight,
    width: "100%",
    ...mosaic.grid.style,
  };

  const bodyInner = (
    <div
      id={mosaic.body.id}
      className={mosaic.body.className || "card-body p-3"}
      aria-label={mosaic.body.ariaLabel}
    >
      <div className="row g-0">
        <div className={mosaic.wrapperClass}>
          <div className={`position-relative ${mosaic.grid.className || ""}`} style={gridStyle}>
            {mosaic.items.map((tile) => {
              if (!tile) return null;

              const spanStyle = {
                gridColumn: `span ${tile.colSpan}`,
                gridRow: `span ${tile.rowSpan}`,
                minWidth: 0,
                minHeight: 0,
              };

              const tileShellClass = [
                "position-relative overflow-hidden",
                radiusClass(tile.radius),
                tile.className || "",
              ]
                .join(" ")
                .trim();

              const tileContent =
                tile.kind === "image" ? (
                  <img
                    src={tile.src}
                    alt={tile.alt}
                    className="w-100 h-100 d-block"
                    style={{ objectFit: tile.fit || "cover" }}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center text-center p-3">
                    <span>{tile.text}</span>
                  </div>
                );

              const overlay =
                tile.overlay && (tile.overlay.text || tile.overlay.name) ? (
                  <div
                    className={[
                      "position-absolute",
                      tile.overlay.position === "top-left"
                        ? "top-0 start-0"
                        : tile.overlay.position === "top-right"
                          ? "top-0 end-0"
                          : tile.overlay.position === "bottom-right"
                            ? "bottom-0 end-0"
                            : "bottom-0 start-0",
                      "m-2 px-2 py-1 rounded-3",
                      tile.overlay.className || "bg-dark text-white bg-opacity-50",
                    ]
                      .join(" ")
                      .trim()}
                  >
                    {tile.overlay.text || tile.overlay.name}
                  </div>
                ) : null;

              const resolvedTileLink = resolveLink(tile.link, tile.data);

              const tileNode = (
                <div key={tile.id} className={tileShellClass} style={spanStyle}>
                  {resolvedTileLink ? (
                    <Link to={resolvedTileLink} className="d-block w-100 h-100 text-decoration-none">
                      {tileContent}
                    </Link>
                  ) : (
                    tileContent
                  )}
                  {overlay}
                </div>
              );

              return tileNode;
            })}

            {mosaic.figure?.enabled && (mosaic.figure.title || mosaic.figure.subtitle) ? (
              <div className="position-absolute top-50 start-50 translate-middle text-center pe-none">
                <div
                  className={[
                    "px-3 py-2 rounded-4",
                    mosaic.figure.className || "bg-white bg-opacity-75",
                  ]
                    .join(" ")
                    .trim()}
                >
                  {mosaic.figure.title ? (
                    <div className="fw-semibold">{mosaic.figure.title}</div>
                  ) : null}
                  {mosaic.figure.subtitle ? (
                    <div className="text-muted small">{mosaic.figure.subtitle}</div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  const resolvedMosaicLink = resolveLink(mosaic.link, mosaic);

  const bodySection = resolvedMosaicLink ? (
    <Link to={resolvedMosaicLink} className="text-decoration-none d-block">
      {bodyInner}
    </Link>
  ) : (
    bodyInner
  );

  return (
    <div id={mosaic.id} className={mosaic.className}>
      {headerSection}
      {bodySection}
      {footerSection}
    </div>
  );
}

export default AlloyMosaic;
