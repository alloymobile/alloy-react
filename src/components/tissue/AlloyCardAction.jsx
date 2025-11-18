// src/components/tissue/AlloyCardAction.jsx
import React from "react";
import { Link } from "react-router-dom";

import { TagObject, generateId, OutputObject } from "../../utils/idHelper.js";
import AlloyButtonBar, { ButtonBarObject } from "./AlloyButtonBar.jsx";
import AlloyLinkBar, { LinkBarObject } from "./AlloyLinkBar.jsx";

/* ------------------ Model ------------------ */

export class CardActionObject {
  constructor(cardAction = {}) {
    // outer card shell props
    this.id = cardAction.id ?? generateId("card-action");
    this.className = cardAction.className ?? "card border m-2 shadow";

    // NOTE: link is allowed but now ONLY applies to the BODY block
    this.link = cardAction.link ?? "";

    // header (optional TagObject)
    const rawHeader = cardAction.header ?? {};
    this.header =
      rawHeader instanceof TagObject ? rawHeader : new TagObject(rawHeader);

    // body (required-ish; fallback to empty TagObject for safety)
    const rawBody = cardAction.body ?? {};
    this.body =
      rawBody instanceof TagObject ? rawBody : new TagObject(rawBody);

    // fields[]
    const rawFields = Array.isArray(cardAction.fields)
      ? cardAction.fields
      : [];
    this.fields = rawFields.map((f) =>
      f instanceof TagObject ? f : new TagObject(f || {})
    );

    // footer (required-ish; we always create one so layout is predictable)
    const rawFooter = cardAction.footer ?? {};
    this.footer =
      rawFooter instanceof TagObject ? rawFooter : new TagObject(rawFooter);

    // action bar config
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
  }
}

/* ------------------ View ------------------ */

export function AlloyCardAction({ cardAction, output }) {
  if (!cardAction || !(cardAction instanceof CardActionObject)) {
    throw new Error(
      "AlloyCardAction requires `cardAction` (CardActionObject instance)."
    );
  }

  /**
   * handleBarOutput
   *
   * STANDARDIZED OUTPUT:
   *
   * {
   *   id: "<card-id>",
   *   type: "card-action",
   *   action: "<name | ariaLabel | title | id of clicked control>",
   *   error: false,
   *   data: {
   *     "<field.id>": "<field.name>",
   *     ...
   *   }
   * }
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

  /* ------- header block (NEVER link) ------- */
  const headerBlock = cardAction.header?.name ? (
    <div
      id={cardAction.header.id}
      className={
        cardAction.header.className ?? "card-header py-2 fw-semibold"
      }
    >
      {cardAction.header.name}
    </div>
  ) : null;

  /* ------- body content core ------- */
  const bodyInner = (
    <div
      id={cardAction.body.id}
      className={cardAction.body.className ?? "card-body"}
    >
      {cardAction.body.name ? (
        <div className="fw-semibold mb-1">{cardAction.body.name}</div>
      ) : null}

      {cardAction.fields.map((field) =>
        field?.name ? (
          <div
            key={field.id ?? generateId("card-field")}
            id={field.id}
            className={field.className ?? ""}
          >
            {field.name}
          </div>
        ) : null
      )}
    </div>
  );

  /* ------- bodyBlock (ONLY this can be <Link>) ------- */
  const bodyBlock = cardAction.link ? (
    <Link
      to={cardAction.link}
      className="text-decoration-none d-block"
      aria-label={cardAction.body?.name}
    >
      {bodyInner}
    </Link>
  ) : (
    bodyInner
  );

  /* ------- footer block (NEVER link wrapper) ------- */
  const footerBlock = (
    <div
      id={cardAction.footer.id}
      className={
        cardAction.footer.className ??
        "card-footer d-flex align-items-center gap-2 py-2"
      }
    >
      {cardAction.footer.name ? (
        <div className="me-auto small text-muted">
          {cardAction.footer.name}
        </div>
      ) : null}

      {cardAction.action ? (
        cardAction.type === "AlloyLinkBar" ? (
          <AlloyLinkBar linkBar={cardAction.action} output={handleBarOutput} />
        ) : (
          <AlloyButtonBar
            buttonBar={cardAction.action}
            output={handleBarOutput}
          />
        )
      ) : null}
    </div>
  );

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
