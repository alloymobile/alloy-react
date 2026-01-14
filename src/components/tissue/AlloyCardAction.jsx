// src/components/tissue/AlloyCardAction.jsx
import React from "react";

import { generateId, OutputObject, BlockObject } from "../../utils/idHelper.js";

import AlloyButtonBar, { ButtonBarObject } from "./AlloyButtonBar.jsx";
import AlloyLinkBar, { LinkBarObject } from "./AlloyLinkBar.jsx";
import AlloyQuantity from "../cell/AlloyQuantity.jsx";
import AlloyMedia from "../cell/AlloyMedia.jsx";
import AlloyButtonIcon from "../cell/AlloyButtonIcon.jsx";
import AlloyLinkIcon from "../cell/AlloyLinkIcon.jsx";
import AlloyIcon from "../cell/AlloyIcon.jsx";

/* -------------------------- CardActionObject -------------------------- */

export class CardActionObject {
  constructor(cardAction = {}) {
    this.id = cardAction.id ?? generateId("card-action");
    this.className = cardAction.className ?? "card border m-2 shadow";

    // Layout: "single" (default) or "split"
    this.layout = cardAction.layout === "split" ? "split" : "single";

    // Column classes for split layout
    this.leftColClass =
      typeof cardAction.leftColClass === "string"
        ? cardAction.leftColClass
        : "col-12 col-sm-4";
    this.rightColClass =
      typeof cardAction.rightColClass === "string"
        ? cardAction.rightColClass
        : "col-12 col-sm-8";

    // Header (optional)
    const rawHeader = cardAction.header ?? {};
    this.header =
      rawHeader instanceof BlockObject ? rawHeader : new BlockObject(rawHeader);

    // Body wrapper (optional styling)
    const rawBody = cardAction.body ?? {};
    this.body = rawBody instanceof BlockObject ? rawBody : new BlockObject(rawBody);

    // Left fields (for split layout)
    const rawLeftFields = Array.isArray(cardAction.leftFields)
      ? cardAction.leftFields
      : [];
    this.leftFields = rawLeftFields.map((f) =>
      f instanceof BlockObject ? f : new BlockObject(f || {})
    );

    // Fields (required, at least 1)
    const rawFields = Array.isArray(cardAction.fields) ? cardAction.fields : [];
    if (rawFields.length === 0) {
      throw new Error(
        "CardActionObject requires at least one field in `fields`."
      );
    }
    this.fields = rawFields.map((f) =>
      f instanceof BlockObject ? f : new BlockObject(f || {})
    );

    // Footer (optional)
    const rawFooter = cardAction.footer ?? {};
    this.footer =
      rawFooter instanceof BlockObject ? rawFooter : new BlockObject(rawFooter);

    // Action bar type: "AlloyButtonBar" (default) or "AlloyLinkBar"
    this.type = cardAction.type ?? "AlloyButtonBar";

    // Action bar instance
    const rawAction = cardAction.action;
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
      throw new Error(
        "CardActionObject requires `action` (ButtonBarObject or LinkBarObject)."
      );
    }
  }
}

/* ----------------------------- AlloyCardAction ----------------------------- */

export function AlloyCardAction({ cardAction, output }) {
  if (!cardAction || !(cardAction instanceof CardActionObject)) {
    throw new Error(
      "AlloyCardAction requires `cardAction` (CardActionObject instance)."
    );
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

  /* ----- Field value extraction ----- */
  function extractFieldValue(field) {
    if (!field) return "";

    if (field.hasMedia && field.hasMedia()) {
      return field.media?.items?.map((item) => item.url) ?? [];
    }
    if (field.hasLogo && field.hasLogo()) {
      return field.logo?.imageUrl ?? "";
    }
    if (field.hasIcon && field.hasIcon()) {
      return field.icon?.iconClass ?? "";
    }
    if (field.hasTags && field.hasTags()) {
      return Array.isArray(field.tags)
        ? field.tags
            .filter((t) => t && typeof t.name === "string" && t.name.trim())
            .map((t) => ({ id: t.id, name: t.name }))
        : [];
    }
    if (field.hasQuantity && field.hasQuantity()) {
      return field.quantity?.value ?? 0;
    }
    if (field.hasButtonIcon && field.hasButtonIcon()) {
      return field.buttonIcon?.id ?? "";
    }
    if (field.hasLinkIcon && field.hasLinkIcon()) {
      return field.linkIcon?.to ?? "";
    }
    if (field.hasText && field.hasText()) {
      return field.name;
    }
    return "";
  }

  /* ----- Collect all field values ----- */
  function collectFieldValues(overrides = {}) {
    const fieldMap = {};
    const allFields = [...cardAction.leftFields, ...cardAction.fields];

    allFields.forEach((field) => {
      if (!field) return;
      const key = field.id;
      if (!key) return;

      const value = key in overrides ? overrides[key] : extractFieldValue(field);

      if (looksLikeTagsArray(value)) {
        value.forEach((t) => {
          const id = String(t.id || "").trim();
          const name = String(t.name || "").trim();
          if (id && name) fieldMap[id] = name;
        });
        return;
      }

      fieldMap[key] = value;
    });

    return fieldMap;
  }

  /* ----- Output handler for action bar ----- */
  function handleBarOutput(innerOut) {
    if (typeof output !== "function") return;

    const base =
      innerOut && typeof innerOut.toJSON === "function"
        ? innerOut.toJSON()
        : innerOut || {};

    const { error = false, errorMessage = [] } = base;
    const actionName = resolveActionName(base);

    const wrapped = new OutputObject({
      id: cardAction.id,
      type: "card-action",
      action: actionName,
      error: !!error,
      errorMessage: errorMessage || [],
      data: collectFieldValues(),
    });

    output(wrapped);
  }

  /* ----- Quantity change handler ----- */
  function handleQuantityChange(fieldId, quantityOut) {
    if (typeof output !== "function") return;

    const base =
      quantityOut && typeof quantityOut.toJSON === "function"
        ? quantityOut.toJSON()
        : quantityOut || {};

    const { error = false, errorMessage = [] } = base;

    const innerAction = resolveActionName(base) || "change";

    const newValue =
      base?.data?.[fieldId] ??
      base?.data?.quantity ??
      base?.data?.value ??
      0;

    const wrapped = new OutputObject({
      id: cardAction.id,
      type: "card-action",
      action: `quantity-${innerAction}`,
      error: !!error,
      errorMessage: errorMessage || [],
      data: {
        ...collectFieldValues({ [fieldId]: newValue }),
        triggeredBy: fieldId,
        quantityData: base?.data || {},
      },
    });

    output(wrapped);
  }

  /* ----- ButtonIcon click handler ----- */
  function handleButtonIconClick(fieldId, buttonOut) {
    if (typeof output !== "function") return;

    const base =
      buttonOut && typeof buttonOut.toJSON === "function"
        ? buttonOut.toJSON()
        : buttonOut || {};

    const { error = false, errorMessage = [] } = base;

    const actionName = resolveActionName(base) || "button-icon-click";

    const wrapped = new OutputObject({
      id: cardAction.id,
      type: "card-action",
      action: actionName,
      error: !!error,
      errorMessage: errorMessage || [],
      data: {
        ...collectFieldValues(),
        triggeredBy: fieldId,
        buttonData: base?.data || {},
      },
    });

    output(wrapped);
  }

  /* ----- Resolve action name from output ----- */
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
      // Prefer button/link names over generic "click"
      if (data.button && typeof data.button === "object") {
        const v = pickFrom(data.button);
        if (v) return v;
      }
      if (data.link && typeof data.link === "object") {
        const v = pickFrom(data.link);
        if (v) return v;
      }

      // Quantity or other children can send string actions like "increment"
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

    // Only fallback to source.action if nothing better exists
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
          output={(out) => handleQuantityChange(field.id, out)}
        />
      );
    }

    // 6. ButtonIcon
    if (field.hasButtonIcon && field.hasButtonIcon()) {
      return (
        <AlloyButtonIcon
          buttonIcon={field.buttonIcon}
          output={(out) => handleButtonIconClick(field.id, out)}
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
    cardAction.header &&
    (cardAction.header.hasText() || cardAction.header.className?.trim());

  const headerBlock = shouldRenderHeader ? (
    <div
      id={cardAction.header.id}
      className={cardAction.header.className ?? "card-header py-2 fw-semibold"}
      aria-label={cardAction.header.ariaLabel}
    >
      {cardAction.header.name}
    </div>
  ) : null;

  /* ----- Body ----- */
  const isSplitLayout =
    cardAction.layout === "split" && cardAction.leftFields.length > 0;

  const bodyInner = isSplitLayout ? (
    <div
      id={cardAction.body.id}
      className={cardAction.body.className ?? "card-body"}
      aria-label={cardAction.body.ariaLabel}
    >
      <div className="row g-3">
        <div className={cardAction.leftColClass}>
          {renderFieldsGrid(cardAction.leftFields)}
        </div>
        <div className={cardAction.rightColClass}>
          {renderFieldsGrid(cardAction.fields)}
        </div>
      </div>
    </div>
  ) : (
    <div
      id={cardAction.body.id}
      className={cardAction.body.className ?? "card-body"}
      aria-label={cardAction.body.ariaLabel}
    >
      {renderFieldsGrid(cardAction.fields)}
    </div>
  );

  /* ----- Footer ----- */
  const hasFooterText = cardAction.footer && cardAction.footer.hasText();
  const hasFooterAction = !!cardAction.action;

  const footerBar =
    hasFooterAction && cardAction.type === "AlloyLinkBar" ? (
      <AlloyLinkBar linkBar={cardAction.action} output={handleBarOutput} />
    ) : hasFooterAction ? (
      <AlloyButtonBar buttonBar={cardAction.action} output={handleBarOutput} />
    ) : null;

  const shouldRenderFooter = hasFooterText || hasFooterAction;

  const footerBlock = shouldRenderFooter ? (
    <div
      id={cardAction.footer.id}
      className={
        cardAction.footer.className ??
        "card-footer d-flex align-items-center gap-2 py-2"
      }
      aria-label={cardAction.footer.ariaLabel}
    >
      {hasFooterText && (
        <div className="me-auto small text-muted">{cardAction.footer.name}</div>
      )}
      {footerBar && <div role="group">{footerBar}</div>}
    </div>
  ) : null;

  /* ----- Final render ----- */
  return (
    <div
      id={cardAction.id}
      className={cardAction.className ?? "card border m-2 shadow"}
    >
      {headerBlock}
      {bodyInner}
      {footerBlock}
    </div>
  );
}

export default AlloyCardAction;
