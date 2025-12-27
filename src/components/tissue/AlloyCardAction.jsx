// src/components/tissue/AlloyCardAction.jsx
import React from "react";
import { Link } from "react-router-dom";

import { generateId, OutputObject, BlockObject } from "../../utils/idHelper.js";

import AlloyButtonBar, { ButtonBarObject } from "./AlloyButtonBar.jsx";
import AlloyLinkBar, { LinkBarObject } from "./AlloyLinkBar.jsx";
import AlloyIcon from "../cell/AlloyIcon.jsx";

function resolveCardActionLink(template, cardAction) {
  if (!template || typeof template !== "string") return "";

  const trimmed = template.trim();
  if (!trimmed) return "";

  if (trimmed.includes("{")) {
    return trimmed.replace(/{(\w+)}/g, (_match, key) => {
      if (key === "id") {
        return cardAction?.id != null ? String(cardAction.id) : "";
      }
      const val = cardAction && cardAction[key] != null ? cardAction[key] : "";
      return val != null ? String(val) : "";
    });
  }

  return trimmed;
}

export class CardActionObject {
  constructor(cardAction = {}) {
    this.id = cardAction.id ?? generateId("card-action");
    this.className = cardAction.className ?? "card border m-2 shadow";

    this.link = typeof cardAction.link === "string" ? cardAction.link : "";

    const rawHeader = cardAction.header ?? {};
    this.header =
      rawHeader instanceof BlockObject ? rawHeader : new BlockObject(rawHeader);

    const rawBody = cardAction.body ?? {};
    this.body = rawBody instanceof BlockObject ? rawBody : new BlockObject(rawBody);

    const rawFields = Array.isArray(cardAction.fields) ? cardAction.fields : [];
    if (rawFields.length === 0) {
      throw new Error(
        "CardActionObject requires at least one field in `fields`."
      );
    }
    this.fields = rawFields.map((f) =>
      f instanceof BlockObject ? f : new BlockObject(f || {})
    );

    const rawFooter = cardAction.footer ?? {};
    this.footer =
      rawFooter instanceof BlockObject ? rawFooter : new BlockObject(rawFooter);

    this.type = cardAction.type ?? "AlloyButtonBar";

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

export function AlloyCardAction({ cardAction, output }) {
  if (!cardAction || !(cardAction instanceof CardActionObject)) {
    throw new Error(
      "AlloyCardAction requires `cardAction` (CardActionObject instance)."
    );
  }

  function handleBarOutput(innerOut) {
    if (typeof output !== "function") return;

    const base =
      innerOut && typeof innerOut.toJSON === "function"
        ? innerOut.toJSON()
        : innerOut || {};

    const { error = false, errorMessage = [] } = base;

    const actionName = resolveActionName(base);

    const fieldMap = {};
    if (Array.isArray(cardAction.fields)) {
      cardAction.fields.forEach((field) => {
        if (!field) return;

        const key = field.id;
        if (!key) return;

        let value = "";

        if (field.hasLogo()) {
          value = field.logo?.imageUrl ?? "";
        } else if (field.hasIcon()) {
          value = field.icon?.iconClass ?? "";
        } else if (field.hasTags && field.hasTags()) {
          value = Array.isArray(field.tags)
            ? field.tags
                .filter((t) => t && typeof t.name === "string" && t.name.trim())
                .map((t) => ({
                  id: t.id,
                  name: t.name,
                }))
            : [];
        } else if (field.hasText()) {
          value = field.name;
        }

        fieldMap[key] = value;
      });
    }

    const wrapped = new OutputObject({
      id: cardAction.id,
      type: "card-action",
      action: actionName,
      error: !!error,
      errorMessage: errorMessage || [],
      data: fieldMap,
    });

    output(wrapped);
  }

  function resolveActionName(source) {
    if (!source || typeof source !== "object") return "";

    const pickFrom = (obj) => {
      if (!obj || typeof obj !== "object") return "";
      const name = typeof obj.name === "string" ? obj.name.trim() : "";
      if (name) return name;

      const aria =
        typeof obj.ariaLabel === "string" ? obj.ariaLabel.trim() : "";
      if (aria) return aria;

      const title = typeof obj.title === "string" ? obj.title.trim() : "";
      if (title) return title;

      const id = typeof obj.id === "string" ? obj.id.trim() : "";
      if (id) return id;

      return "";
    };

    const data =
      source.data && typeof source.data === "object" ? source.data : null;

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

  const bodyInner = (
    <div
      id={cardAction.body.id}
      className={cardAction.body.className ?? "card-body"}
      aria-label={cardAction.body.ariaLabel}
    >
      <div className="row g-2">
        {cardAction.fields.map((field) => {
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
                {field.hasLogo() ? (
                  <img
                    src={field.logo.imageUrl}
                    alt={field.logo.alt}
                    width={field.logo.width}
                    height={field.logo.height}
                    className={field.logo.className}
                  />
                ) : field.hasIcon() ? (
                  <AlloyIcon icon={field.icon} />
                ) : field.hasTags && field.hasTags() ? (
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
                ) : field.hasText() ? (
                  <span>{field.name}</span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const resolvedLink = resolveCardActionLink(cardAction.link, cardAction);

  const bodyBlock = resolvedLink ? (
    <Link
      to={resolvedLink}
      className="text-decoration-none d-block"
      aria-label={cardAction.body?.ariaLabel}
    >
      {bodyInner}
    </Link>
  ) : (
    bodyInner
  );

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

  return (
    <div
      id={cardAction.id}
      className={cardAction.className ?? "card border m-2 shadow"}
    >
      {headerBlock}
      {bodyBlock}
      {footerBlock}
    </div>
  );
}

export default AlloyCardAction;
