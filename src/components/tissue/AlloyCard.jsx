// src/components/tissue/AlloyCard.jsx
import React from "react";
import { generateId, BlockObject } from "../../utils/idHelper.js";

import AlloyIcon from "../cell/AlloyIcon.jsx";
import AlloyButtonIcon from "../cell/AlloyButtonIcon.jsx";
import AlloyLinkIcon from "../cell/AlloyLinkIcon.jsx";
import AlloyQuantity from "../cell/AlloyQuantity.jsx";
import AlloyMedia from "../cell/AlloyMedia.jsx";

/* ------------------------------------------------------------------
 * CardObject
 * ------------------------------------------------------------------ */

export class CardObject {
  constructor(card = {}) {
    this.id = card.id ?? generateId("card");
    this.className = card.className ?? "card border m-2 shadow";

    // Layout: "single" (default) or "split"
    this.layout = card.layout === "split" ? "split" : "single";

    // Column classes for split layout
    this.leftColClass =
      typeof card.leftColClass === "string"
        ? card.leftColClass
        : "col-12 col-sm-4";
    this.rightColClass =
      typeof card.rightColClass === "string"
        ? card.rightColClass
        : "col-12 col-sm-8";

    // Header (optional)
    const rawHeader = card.header ?? {};
    this.header =
      rawHeader instanceof BlockObject ? rawHeader : new BlockObject(rawHeader);

    // Body (optional - for wrapper styling)
    const rawBody = card.body ?? {};
    this.body =
      rawBody instanceof BlockObject ? rawBody : new BlockObject(rawBody);

    // Left fields (for split layout)
    const rawLeftFields = Array.isArray(card.leftFields)
      ? card.leftFields
      : [];
    this.leftFields = rawLeftFields.map((f) =>
      f instanceof BlockObject ? f : new BlockObject(f || {})
    );

    // Fields (required, at least 1)
    const rawFields = Array.isArray(card.fields) ? card.fields : [];
    if (rawFields.length === 0) {
      throw new Error("CardObject requires at least one field in `fields`.");
    }
    this.fields = rawFields.map((f) =>
      f instanceof BlockObject ? f : new BlockObject(f || {})
    );

    // Footer (optional)
    const rawFooter = card.footer ?? {};
    this.footer =
      rawFooter instanceof BlockObject ? rawFooter : new BlockObject(rawFooter);
  }
}

/* ------------------------------------------------------------------
 * AlloyCard (React component)
 * ------------------------------------------------------------------ */

export function AlloyCard({ card, output }) {
  if (!card || !(card instanceof CardObject)) {
    throw new Error("AlloyCard requires `card` (CardObject instance).");
  }

  function isTagArrayKey(key) {
    return typeof key === "string" && key.toLowerCase().includes("tag");
  }

  function looksLikeTagsArray(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return false;
    return arr.every((t) => {
      if (!t || typeof t !== "object" || Array.isArray(t)) return false;
      const idOk = typeof t.id === "string" && t.id.trim().length > 0;
      const nameOk = typeof t.name === "string" && t.name.trim().length > 0;
      return idOk && nameOk;
    });
  }

  function normalizeData(data) {
    if (!data || typeof data !== "object" || Array.isArray(data)) return data;

    const next = {};

    Object.keys(data).forEach((k) => {
      const v = data[k];

      if (isTagArrayKey(k) && looksLikeTagsArray(v)) {
        v.forEach((t) => {
          const id = String(t.id || "").trim();
          const name = String(t.name || "").trim();
          if (id && name) next[id] = name;
        });
        return;
      }

      if (v && typeof v === "object" && !Array.isArray(v)) {
        next[k] = normalizeData(v);
        return;
      }

      next[k] = v;
    });

    return next;
  }

  function normalizeOut(out) {
    if (!out || typeof out !== "object") return out;
    if (!out.data || typeof out.data !== "object" || Array.isArray(out.data)) return out;
    return { ...out, data: normalizeData(out.data) };
  }

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
      if (data.button && typeof data.button === "object") {
        const v = pickFrom(data.button);
        if (v) return v;
      }
      if (data.link && typeof data.link === "object") {
        const v = pickFrom(data.link);
        if (v) return v;
      }
      if (typeof data.action === "string" && data.action.trim()) {
        return data.action.trim();
      }
      if (data.action && typeof data.action === "object") {
        const v = pickFrom(data.action);
        if (v) return v;
      }
      const v = pickFrom(data);
      if (v) return v;
    }

    if (typeof source.action === "string" && source.action.trim()) {
      return source.action.trim();
    }

    return pickFrom(source);
  }

  /* ----- Render single field ----- */
  function renderField(field) {
    if (!field) return null;

    // 1. Media
    if (field.hasMedia && field.hasMedia()) {
      return <AlloyMedia media={field.media} />;
    }

    // 2. Logo
    if (field.hasLogo && field.hasLogo()) {
      return (
        <img
          src={field.logo.imageUrl}
          alt={field.logo.alt}
          width={field.logo.width}
          height={field.logo.height}
          className={field.logo.className}
        />
      );
    }

    // 3. Icon
    if (field.hasIcon && field.hasIcon()) {
      return <AlloyIcon icon={field.icon} />;
    }

    // 4. Tags
    if (field.hasTags && field.hasTags()) {
      return (
        <div className="d-flex flex-column gap-1">
          {field.tags.map((t) => {
            if (!t || !t.name || !t.name.trim()) return null;
            return (
              <div key={t.id} id={t.id} className={t.className}>
                {t.name}
              </div>
            );
          })}
        </div>
      );
    }

    // 5. Quantity
    if (field.hasQuantity && field.hasQuantity()) {
      return (
        <AlloyQuantity
          quantity={field.quantity}
          output={(out) => {
            if (typeof output === "function") {
              const base =
                out && typeof out.toJSON === "function" ? out.toJSON() : out || {};
              output(normalizeOut({ ...base, type: "quantity", fieldId: field.id }));
            }
          }}
        />
      );
    }

    // 6. ButtonIcon
    if (field.hasButtonIcon && field.hasButtonIcon()) {
      return (
        <AlloyButtonIcon
          buttonIcon={field.buttonIcon}
          output={(out) => {
            if (typeof output === "function") {
              const base =
                out && typeof out.toJSON === "function" ? out.toJSON() : out || {};
              const actionName = resolveActionName(base);
              output(
                normalizeOut({
                  ...base,
                  type: "buttonIcon",
                  fieldId: field.id,
                  action: actionName || base.action,
                })
              );
            }
          }}
        />
      );
    }

    // 7. LinkIcon
    if (field.hasLinkIcon && field.hasLinkIcon()) {
      return <AlloyLinkIcon linkIcon={field.linkIcon} />;
    }

    // 8. Text (fallback)
    if (field.hasText && field.hasText()) {
      return <span>{field.name}</span>;
    }

    return null;
  }

  /* ----- Render fields grid ----- */
  function renderFieldsGrid(fields) {
    return (
      <div className="row g-2">
        {fields.map((field) => {
          if (!field) return null;

          const key = field.id;
          const colClass = field.colClass || "col-12";

          return (
            <div key={key} className={colClass}>
              <div
                id={field.id}
                className={field.className}
                aria-label={field.ariaLabel}
              >
                {renderField(field)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  /* ----- Header ----- */
  const shouldRenderHeader =
    card.header && (card.header.hasText() || card.header.className?.trim());

  const headerSection = shouldRenderHeader ? (
    <div
      id={card.header.id}
      className={card.header.className || "card-header py-2 fw-semibold"}
      aria-label={card.header.ariaLabel}
    >
      {card.header.name}
    </div>
  ) : null;

  /* ----- Body ----- */
  const isSplitLayout = card.layout === "split" && card.leftFields.length > 0;

  const bodyContent = isSplitLayout ? (
    <div className="row g-3">
      <div className={card.leftColClass}>
        {renderFieldsGrid(card.leftFields)}
      </div>
      <div className={card.rightColClass}>
        {renderFieldsGrid(card.fields)}
      </div>
    </div>
  ) : (
    renderFieldsGrid(card.fields)
  );

  const bodySection = (
    <div
      id={card.body.id}
      className={card.body.className || "card-body"}
      aria-label={card.body.ariaLabel}
    >
      {bodyContent}
    </div>
  );

  /* ----- Footer ----- */
  const shouldRenderFooter =
    card.footer &&
    (card.footer.hasText() || card.footer.className?.trim().length);

  const footerSection = shouldRenderFooter ? (
    <div
      id={card.footer.id}
      className={
        card.footer.className ||
        "card-footer d-flex align-items-center justify-content-between py-2"
      }
      aria-label={card.footer.ariaLabel}
    >
      {card.footer.name && <span>{card.footer.name}</span>}
    </div>
  ) : null;

  /* ----- Final card ----- */
  return (
    <div id={card.id} className={card.className}>
      {headerSection}
      {bodySection}
      {footerSection}
    </div>
  );
}

export default AlloyCard;
