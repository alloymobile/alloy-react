// src/components/tissue/AlloyProductAction.jsx
import React, { useEffect, useMemo, useState } from "react";

import { generateId, OutputObject } from "../../utils/idHelper.js";

import AlloyButtonBar, { ButtonBarObject } from "./AlloyButtonBar.jsx";
import AlloyLinkBar, { LinkBarObject } from "./AlloyLinkBar.jsx";

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

function resolveTemplateLink(template, source) {
  if (!template || typeof template !== "string") return "";
  const trimmed = template.trim();
  if (!trimmed) return "";

  if (trimmed.includes("{")) {
    return trimmed.replace(/{(\w+)}/g, (_m, key) => {
      const val =
        source && source[key] != null
          ? source[key]
          : source && source.product && source.product[key] != null
          ? source.product[key]
          : "";
      return val != null ? String(val) : "";
    });
  }

  return trimmed;
}

// name → ariaLabel → title → id (prefers data.* first)
function resolveActionName(source) {
  if (!source || typeof source !== "object") return "";

  const pickFrom = (obj) => {
    if (!obj || typeof obj !== "object") return "";
    const name = typeof obj.name === "string" ? obj.name.trim() : "";
    if (name) return name;

    const aria = typeof obj.ariaLabel === "string" ? obj.ariaLabel.trim() : "";
    if (aria) return aria;

    const title = typeof obj.title === "string" ? obj.title.trim() : "";
    if (title) return title;

    const id = typeof obj.id === "string" ? obj.id.trim() : "";
    if (id) return id;

    return "";
  };

  const data = source.data && typeof source.data === "object" ? source.data : null;

  if (data) {
    if (data.action && typeof data.action === "object") {
      const v = pickFrom(data.action);
      if (v) return v;
    }
    if (data.button && typeof data.button === "object") {
      const v = pickFrom(data.button);
      if (v) return v;
    }
    if (data.link && typeof data.link === "object") {
      const v = pickFrom(data.link);
      if (v) return v;
    }
    const v = pickFrom(data);
    if (v) return v;
  }

  return pickFrom(source);
}

/* -------------------------- object models -------------------------- */

export class ProductActionObject {
  constructor(cfg = {}) {
    this.renderer = typeof cfg.renderer === "string" ? cfg.renderer : "product";

    this.id = cfg.id ?? generateId("product-action");
    this.className = cfg.className ?? "card border-0 shadow-sm rounded-4 overflow-hidden";

    this.link = typeof cfg.link === "string" ? cfg.link : "";

    const p = cfg.product && typeof cfg.product === "object" ? cfg.product : {};
    this.product = {
      id: p.id ?? "",
      brand: p.brand ?? "",
      title: p.title ?? p.productName ?? "Product",
      sku: p.sku ?? "",
      status: p.status ?? "",
      description: p.description ?? "",
      price: p.price ?? null,
      compareAtPrice: p.compareAtPrice ?? null,
      metaLine: p.metaLine ?? "",
      tags: Array.isArray(p.tags) ? p.tags : [],
    };

    const m = cfg.media && typeof cfg.media === "object" ? cfg.media : {};
    const rawItems = Array.isArray(m.items) ? m.items : [];
    this.media = {
      items: rawItems
        .map((it, idx) => {
          const url = String(it?.url || "").trim();
          if (!url) return null;
          return {
            id: String(it?.id || `media-${idx}`),
            kind: inferKind(it),
            url,
            thumbUrl: String(it?.thumbUrl || it?.thumbnailUrl || "").trim() || "",
            title: it?.title ?? "",
            isPrimary: !!it?.isPrimary,
            sortOrder: Number.isFinite(Number(it?.sortOrder)) ? Number(it.sortOrder) : null,
          };
        })
        .filter(Boolean)
        .sort((a, b) => {
          const ap = a?.isPrimary ? 1 : 0;
          const bp = b?.isPrimary ? 1 : 0;
          if (bp !== ap) return bp - ap;

          const as = Number.isFinite(Number(a?.sortOrder)) ? Number(a.sortOrder) : 999999;
          const bs = Number.isFinite(Number(b?.sortOrder)) ? Number(b.sortOrder) : 999999;
          if (as !== bs) return as - bs;

          return String(a?.title || "").localeCompare(String(b?.title || ""));
        }),
    };

    const q = cfg.quantity && typeof cfg.quantity === "object" ? cfg.quantity : {};
    const min = Number.isFinite(Number(q.min)) ? Number(q.min) : 1;
    const max = Number.isFinite(Number(q.max)) ? Number(q.max) : 999999;
    const step = Number.isFinite(Number(q.step)) ? Number(q.step) : 1;
    const initial = Number.isFinite(Number(q.value)) ? Number(q.value) : min;

    this.quantity = {
      label: q.label ?? "Quantity",
      min,
      max,
      step,
      value: Math.min(Math.max(initial, min), max),
      emitOnChange: !!q.emitOnChange,
    };

    const f = cfg.footer && typeof cfg.footer === "object" ? cfg.footer : {};
    this.footer = {
      leftText: f.leftText ?? "Try actions + see output payload",
      className:
        f.className ??
        "card-footer bg-white d-flex align-items-center justify-content-between flex-wrap gap-2 py-3 px-3",
    };

    this.type = cfg.type ?? "AlloyButtonBar";

    const rawAction = cfg.action;
    if (this.type === "AlloyLinkBar") {
      this.action =
        rawAction instanceof LinkBarObject
          ? rawAction
          : rawAction
          ? new LinkBarObject(rawAction)
          : undefined;
    } else {
      this.action =
        rawAction instanceof ButtonBarObject
          ? rawAction
          : rawAction
          ? new ButtonBarObject(rawAction)
          : undefined;
    }

    if (!this.action) {
      throw new Error("ProductActionObject requires `action` (ButtonBarObject or LinkBarObject).");
    }
  }
}

/* ----------------------------- view ----------------------------- */

function renderMedia(active, fallbackUrl, mode) {
  const url = active?.url ? String(active.url) : String(fallbackUrl || "");
  const kind = active?.kind || (isVideoUrl(url) ? "video" : isGlbUrl(url) ? "glb" : "image");

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
    return (
      <div className="w-100 h-100">
        <model-viewer
        src={url}
        alt="3D model"
        className="w-100 h-100"
        crossorigin="anonymous"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        environment-image="neutral"
        />
      </div>
    );
  }

  if (kind === "video") {
    return (
      <video
        key={String(active?.id || "vid") + "-" + mode}
        src={url}
        className={`w-100 h-100 ${mode === "zoom" ? "object-fit-contain" : "object-fit-cover"}`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
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

  return (
    <img
      src={active?.thumbUrl || url}
      alt="Product"
      className={`w-100 h-100 ${mode === "zoom" ? "object-fit-contain" : "object-fit-cover"}`}
    />
  );
}

function Thumb({ item, active, onClick, size = 64 }) {
  const isActive = String(item?.id) === String(active?.id);
  const kind = item?.kind || "image";
  const badge = kind === "glb" ? "3D" : kind === "video" ? "VID" : "";

  return (
    <button
      type="button"
      className={`btn p-0 border ${
        isActive ? "border-primary" : "border-light"
      } rounded-3 overflow-hidden flex-shrink-0`}
      style={{ width: size, height: size }}
      onClick={onClick}
      aria-label={kind === "glb" ? "View 3D model" : kind === "video" ? "View video" : "View image"}
      title={item?.title || (kind === "glb" ? "3D model" : kind === "video" ? "Video" : "Image")}
    >
      {kind === "glb" ? (
        item?.thumbUrl ? (
          <div className="position-relative w-100 h-100">
            <img src={item.thumbUrl} alt="3D thumbnail" className="w-100 h-100 object-fit-cover" />
            <span className="badge bg-dark position-absolute top-0 end-0 m-1">{badge}</span>
          </div>
        ) : (
          <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light position-relative">
            <i className="fa-solid fa-cube text-muted"></i>
            <span className="badge bg-dark position-absolute top-0 end-0 m-1">{badge}</span>
          </div>
        )
      ) : kind === "video" ? (
        item?.thumbUrl ? (
          <div className="position-relative w-100 h-100">
            <img src={item.thumbUrl} alt="Video thumbnail" className="w-100 h-100 object-fit-cover" />
            <span className="badge bg-dark position-absolute top-0 end-0 m-1">{badge}</span>
          </div>
        ) : (
          <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light position-relative">
            <i className="fa-solid fa-play text-muted"></i>
            <span className="badge bg-dark position-absolute top-0 end-0 m-1">{badge}</span>
          </div>
        )
      ) : (
        <img src={item?.thumbUrl || item?.url} alt="Thumbnail" className="w-100 h-100 object-fit-cover" />
      )}
    </button>
  );
}

export function AlloyProductAction({ productAction, output }) {
  if (!productAction || !(productAction instanceof ProductActionObject)) {
    throw new Error("AlloyProductAction requires `productAction` (ProductActionObject instance).");
  }

  const items = Array.isArray(productAction.media?.items) ? productAction.media.items : [];
  const first = items[0] || null;

  const [activeMediaId, setActiveMediaId] = useState(first ? String(first.id) : "");
  const active = useMemo(
    () => items.find((m) => String(m.id) === String(activeMediaId)) || first,
    [items, activeMediaId, first]
  );

  const [qty, setQty] = useState(Number(productAction.quantity?.value ?? 1));

  const [zoomOpen, setZoomOpen] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!zoomOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [zoomOpen]);

  function clampQty(v) {
    const min = Number(productAction.quantity?.min ?? 1);
    const max = Number(productAction.quantity?.max ?? 999999);
    const n = Number.isFinite(Number(v)) ? Number(v) : min;
    return Math.min(Math.max(n, min), max);
  }

  function emit(action, data) {
    if (typeof output !== "function") return;

    const wrapped = new OutputObject({
      id: productAction.id,
      type: "product-action",
      action: action || "",
      error: false,
      errorMessage: [],
      data: data || {},
    });

    output(wrapped);
  }

  function handleFooterBarOutput(innerOut) {
    if (typeof output !== "function") return;

    const base = innerOut && typeof innerOut.toJSON === "function" ? innerOut.toJSON() : innerOut || {};
    const { error = false, errorMessage = [] } = base;

    const actionName = resolveActionName(base);

    const p = productAction.product || {};
    const payload = {
      productId: p.id || "",
      title: p.title || "",
      sku: p.sku || "",
      status: p.status || "",
      price: p.price ?? null,
      compareAtPrice: p.compareAtPrice ?? null,
      quantity: qty,
      activeMediaId: active?.id ? String(active.id) : "",
      activeMediaKind: active?.kind || "",
      activeMediaUrl: active?.url || "",
    };

    const wrapped = new OutputObject({
      id: productAction.id,
      type: "product-action",
      action: actionName,
      error: !!error,
      errorMessage: errorMessage || [],
      data: payload,
    });

    output(wrapped);
  }

  const resolvedLink = resolveTemplateLink(productAction.link, { ...productAction, product: productAction.product });

const mediaBox = (
  <div
    className="ratio ratio-1x1 bg-light rounded-4 overflow-hidden border position-relative"
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
  >
    <div className="w-100 h-100 position-relative">
      <div
        className="position-absolute top-0 start-0 m-2"
        style={{
          zIndex: 10,
          opacity: hover ? 1 : 0,
          pointerEvents: hover ? "auto" : "none",
          transition: "opacity 120ms ease"
        }}
      >
        <button
          type="button"
          className="btn p-0 border-0 bg-transparent"
          style={{ width: 36, height: 36, borderRadius: 999 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setZoomOpen(true);
          }}
          aria-label="Zoom media"
          title="Zoom"
        >
          <i className="fa-solid fa-magnifying-glass-plus"></i>
        </button>
      </div>

      {renderMedia(active, "", "card")}
    </div>
  </div>
);


  const mediaBlock = mediaBox;

  const tags = Array.isArray(productAction.product?.tags) ? productAction.product.tags : [];

  const hasFooterAction = !!productAction.action;
  const footerBar =
    hasFooterAction && productAction.type === "AlloyLinkBar" ? (
      <AlloyLinkBar linkBar={productAction.action} output={handleFooterBarOutput} />
    ) : hasFooterAction ? (
      <AlloyButtonBar buttonBar={productAction.action} output={handleFooterBarOutput} />
    ) : null;

  const min = Number(productAction.quantity?.min ?? 1);
  const max = Number(productAction.quantity?.max ?? 999999);
  const step = Number(productAction.quantity?.step ?? 1);

  const detailsTop = (
    <>
      <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
        <div>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <h4 className="mb-1 text-primary">{productAction.product?.title || "Product"}</h4>
            {productAction.product?.status ? (
              <span
                className={`badge ${
                  String(productAction.product.status).toUpperCase() === "ACTIVE"
                    ? "bg-success"
                    : String(productAction.product.status).toUpperCase() === "INACTIVE"
                    ? "bg-danger"
                    : "bg-secondary"
                }`}
              >
                {productAction.product.status}
              </span>
            ) : null}
          </div>

          {productAction.product?.brand ? <div className="text-muted">{productAction.product.brand}</div> : null}

          {productAction.product?.sku ? <div className="text-muted mt-1">SKU: {productAction.product.sku}</div> : null}

          {productAction.product?.description ? (
            <div className="text-muted mt-2">{productAction.product.description}</div>
          ) : null}
        </div>

        <div className="text-end">
          {productAction.product?.price != null ? (
            <>
              <div className="fs-3 fw-bold text-primary">
                {typeof productAction.product.price === "number"
                  ? `$${productAction.product.price.toFixed(2)}`
                  : String(productAction.product.price)}
              </div>
              {productAction.product?.compareAtPrice != null ? (
                <div className="text-muted text-decoration-line-through">
                  {typeof productAction.product.compareAtPrice === "number"
                    ? `$${productAction.product.compareAtPrice.toFixed(2)}`
                    : String(productAction.product.compareAtPrice)}
                </div>
              ) : null}
            </>
          ) : null}

          {productAction.product?.metaLine ? <div className="text-muted mt-2">{productAction.product.metaLine}</div> : null}
        </div>
      </div>

      {tags.length ? (
        <div className="d-flex flex-wrap gap-2 mt-3">
          {tags.map((t, idx) => (
            <span key={String(t) + "-" + idx} className="badge rounded-pill text-bg-light border">
              {String(t)}
            </span>
          ))}
        </div>
      ) : null}
    </>
  );

  const detailsBlock = resolvedLink ? (
    <a href={resolvedLink} className="text-decoration-none d-block text-reset" aria-label="Open product">
      {detailsTop}
    </a>
  ) : (
    detailsTop
  );

  return (
    <>
      <div id={productAction.id} className={productAction.className}>
        <div className="card-body p-4">
          <div className="row g-4 align-items-start">
            <div className="col-12 col-md-5">
              {mediaBlock}

              {items.length > 0 ? (
                <div className="mt-2">
                  <div className="d-flex gap-2 overflow-auto pb-1">
                    {items.map((m) => (
                      <Thumb
                        key={m.id}
                        item={m}
                        active={active}
                        onClick={() => {
                          setActiveMediaId(String(m.id));
                          if (productAction.quantity?.emitOnChange) {
                            emit("media", { mediaId: String(m.id), kind: m.kind || "", url: m.url || "" });
                          }
                        }}
                        size={72}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="col-12 col-md-7">
              {detailsBlock}

              <div className="mt-4">
                <div className="fw-bold text-primary mb-2">{productAction.quantity?.label || "Quantity"}</div>

                <div className="border rounded-3 overflow-hidden" style={{ maxWidth: 520 }}>
                  <div className="d-flex align-items-stretch">
                    <button
                      type="button"
                      className="btn btn-light border-0 px-4"
                      onClick={() => {
                        const next = clampQty(qty - step);
                        setQty(next);
                        if (productAction.quantity?.emitOnChange) emit("quantity", { quantity: next, min, max });
                      }}
                      aria-label="Decrease quantity"
                      title="Decrease"
                      disabled={qty <= min}
                    >
                      <span className="fs-4">−</span>
                    </button>

                    <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-white fw-semibold fs-5">
                      {qty}
                    </div>

                    <button
                      type="button"
                      className="btn btn-light border-0 px-4"
                      onClick={() => {
                        const next = clampQty(qty + step);
                        setQty(next);
                        if (productAction.quantity?.emitOnChange) emit("quantity", { quantity: next, min, max });
                      }}
                      aria-label="Increase quantity"
                      title="Increase"
                      disabled={qty >= max}
                    >
                      <span className="fs-4">+</span>
                    </button>
                  </div>
                </div>

                <div className="text-muted mt-2">Min: {min}, Max: {max}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={productAction.footer?.className}>
          <div className="text-muted">{productAction.footer?.leftText || ""}</div>
          {footerBar ? <div role="group">{footerBar}</div> : null}
        </div>
      </div>

      {zoomOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setZoomOpen(false)}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />

          <div
            style={{
              position: "relative",
              width: "min(1100px, 92vw)",
              height: "min(820px, 92vh)",
              background: "#fff",
              borderRadius: "1rem",
              boxShadow: "0 1rem 3rem rgba(0,0,0,0.35)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: "0.75rem 1rem",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.75rem",
              }}
            >
              <div className="fw-semibold text-truncate">{productAction.product?.title || "Media"}</div>
              <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => setZoomOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div style={{ flex: "1 1 auto", minHeight: 0, background: "rgba(248,249,250,1)" }}>
              <div style={{ width: "100%", height: "100%" }}>{renderMedia(active, "", "zoom")}</div>
            </div>

            <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              <div className="d-flex gap-2 overflow-auto pb-1">
                {items.map((m) => (
                  <Thumb key={"zoom-" + m.id} item={m} active={active} onClick={() => setActiveMediaId(String(m.id))} size={72} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AlloyProductAction;
