// src/components/tissue/AlloyCardAction.jsx
import React from "react";
import { Link } from "react-router-dom";

import { generateId, OutputObject, BlockObject } from "../../utils/idHelper.js";

import AlloyButtonBar, { ButtonBarObject } from "./AlloyButtonBar.jsx";
import AlloyLinkBar, { LinkBarObject } from "./AlloyLinkBar.jsx";
import AlloyIcon from "../cell/AlloyIcon.jsx";

/* ------------------------------------------------------------------
 * CardActionObject
 *
 * Card semantics (matches AlloyCard + actions):
 *  - header:  optional BlockObject
 *  - body:    required BlockObject
 *  - fields:  required BlockObject[] (at least 1)
 *  - footer:  required BlockObject (normalized, may be textless)
 *  - link:    optional string (wraps ONLY the body in <Link>)
 *  - type:    "AlloyButtonBar" | "AlloyLinkBar"
 *  - action:  REQUIRED ButtonBarObject | LinkBarObject (rendered in footer)
 * ------------------------------------------------------------------ */

export class CardActionObject {
  constructor(cardAction = {}) {
    // outer card shell props
    this.id = cardAction.id ?? generateId("card-action");
    this.className = cardAction.className ?? "card border m-2 shadow";

    // NOTE: link applies ONLY to the BODY block
    this.link = typeof cardAction.link === "string" ? cardAction.link : "";

    // header (optional BlockObject)
    const rawHeader = cardAction.header ?? {};
    this.header =
      rawHeader instanceof BlockObject
        ? rawHeader
        : new BlockObject(rawHeader);

    // body (required BlockObject)
    const rawBody = cardAction.body ?? {};
    this.body =
      rawBody instanceof BlockObject ? rawBody : new BlockObject(rawBody);

    // fields (required, at least one)
    const rawFields = Array.isArray(cardAction.fields)
      ? cardAction.fields
      : [];
    if (rawFields.length === 0) {
      throw new Error(
        "CardActionObject requires at least one field in `fields`."
      );
    }
    this.fields = rawFields.map((f) =>
      f instanceof BlockObject ? f : new BlockObject(f || {})
    );

    // footer (required conceptually, but normalized even if empty config)
    const rawFooter = cardAction.footer ?? {};
    this.footer =
      rawFooter instanceof BlockObject
        ? rawFooter
        : new BlockObject(rawFooter);

    // action bar config (REQUIRED)
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

/* ------------------------------------------------------------------
 * AlloyCardAction (view)
 *
 * Layout:
 *  - header (never linked)
 *  - body grid (link wrapper if link != "")
 *  - footer with:
 *      - optional footer text
 *      - AlloyButtonBar or AlloyLinkBar on the right
 *
 * Output:
 *  - ButtonBar/LinkBar emit → wrapped into standardized OutputObject:
 *    {
 *      id: "<card-id>",
 *      type: "card-action",
 *      action: "<name | ariaLabel | title | id of clicked control>",
 *      error: false,
 *      data: { "<field.id>": "<field.name>", ... }
 *    }
 * ------------------------------------------------------------------ */

export function AlloyCardAction({ cardAction, output }) {
  if (!cardAction || !(cardAction instanceof CardActionObject)) {
    throw new Error(
      "AlloyCardAction requires `cardAction` (CardActionObject instance)."
    );
  }

  /**
   * handleBarOutput
   *
   * Wraps the inner ButtonBar/LinkBar output into a standardized OutputObject.
   */
  function handleBarOutput(innerOut) {
    if (typeof output !== "function") return;

    const base =
      innerOut && typeof innerOut.toJSON === "function"
        ? innerOut.toJSON()
        : innerOut || {};

    const { error = false, errorMessage = [] } = base;

    // Resolve action name from innerOut (prefers nested data)
    const actionName = resolveActionName(base);

    // Build the data map from fields[]
    const fieldMap = {};
    if (Array.isArray(cardAction.fields)) {
      cardAction.fields.forEach((field) => {
        if (!field) return;
        const key = field.id;
        const value = field.name;
        if (key && typeof value !== "undefined") {
          fieldMap[key] = value;
        }
      });
    }

    const wrapped = new OutputObject({
      id: cardAction.id,
      type: "card-action",
      action: actionName,
      error: !!error,
      errorMessage: errorMessage || [],
      data: fieldMap
    });

    output(wrapped);
  }

  // name → ariaLabel → title → id, preferring data.* first
  function resolveActionName(source) {
    if (!source || typeof source !== "object") return "";

    const pickFrom = (obj) => {
      if (!obj || typeof obj !== "object") return "";
      const name =
        typeof obj.name === "string" ? obj.name.trim() : "";
      if (name) return name;

      const aria =
        typeof obj.ariaLabel === "string" ? obj.ariaLabel.trim() : "";
      if (aria) return aria;

      const title =
        typeof obj.title === "string" ? obj.title.trim() : "";
      if (title) return title;

      const id =
        typeof obj.id === "string" ? obj.id.trim() : "";
      if (id) return id;

      return "";
    };

    const data =
      source.data && typeof source.data === "object" ? source.data : null;

    // Try nested shapes first (future-proof for ButtonBar/LinkBar internals)
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

    // Fallback to root object
    return pickFrom(source);
  }

  /* ------- header (NEVER link) ------- */
  const shouldRenderHeader =
    cardAction.header &&
    (cardAction.header.hasText() || cardAction.header.className?.trim());

  const headerBlock = shouldRenderHeader ? (
    <div
      id={cardAction.header.id}
      className={
        cardAction.header.className ?? "card-header py-2 fw-semibold"
      }
      aria-label={cardAction.header.ariaLabel}
    >
      {cardAction.header.name}
    </div>
  ) : null;

  /* ------- body content core (grid of fields) ------- */
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
                  // Logo-only field
                  <img
                    src={field.logo.imageUrl}
                    alt={field.logo.alt}
                    width={field.logo.width}
                    height={field.logo.height}
                    className={field.logo.className}
                  />
                ) : field.hasIcon() ? (
                  // Icon-only field (use AlloyIcon)
                  <AlloyIcon icon={field.icon} />
                ) : field.hasText() ? (
                  // Text-only field
                  <span>{field.name}</span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ------- bodyBlock (ONLY this can be <Link>) ------- */
  const bodyBlock = cardAction.link ? (
    <Link
      to={cardAction.link}
      className="text-decoration-none d-block"
      aria-label={cardAction.body?.ariaLabel}
    >
      {bodyInner}
    </Link>
  ) : (
    bodyInner
  );

  /* ------- footer block (text + ButtonBar/LinkBar) ------- */
  const hasFooterText = cardAction.footer && cardAction.footer.hasText();
  const hasFooterAction = !!cardAction.action;

  // we know action is always present (constructor enforces), but keep this guard
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
        <div className="me-auto small text-muted">
          {cardAction.footer.name}
        </div>
      )}
      {footerBar && <div role="group">{footerBar}</div>}
    </div>
  ) : null;

  /* ------- final card layout ------- */
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
