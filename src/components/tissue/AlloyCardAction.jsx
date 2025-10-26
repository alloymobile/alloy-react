// src/components/tissue/AlloyCardAction.jsx
import React from "react";
import { Link } from "react-router-dom";

import { TagObject, generateId } from "../../utils/idHelper.js";
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

  // bubble up footer button/link clicks
  function handleBarOutput(self, e) {
    output?.({
      type: "action",
      action: {
        id: self?.id,
        name: self?.name,
        className: self?.className,
        active: self?.active,
        disabled: self?.disabled ?? false,
        title: self?.title,
        ariaLabel: self?.ariaLabel,
        tabIndex: self?.tabIndex,
        iconClass: self?.icon?.iconClass,
        href: self?.href,
      },
      card: {
        id: cardAction.id,
      },
    });
  }

  /* ------- header block (NEVER link) ------- */
  // Only render if header.name is non-empty
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
  // This is the visual body markup WITHOUT link wrapping yet.
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
  // If cardAction.link is provided, wrap ONLY bodyInner with <Link>.
  // Otherwise, render bodyInner as-is.
  const bodyBlock = cardAction.link ? (
    <Link
      to={cardAction.link}
      className="text-decoration-none d-block"
      // we do NOT forward cardAction.className here; that stays on the outer .card
      aria-label={cardAction.body?.name}
    >
      {bodyInner}
    </Link>
  ) : (
    bodyInner
  );

  /* ------- footer block (NEVER link) ------- */
  const footerBlock = (
    <div
      id={cardAction.footer.id}
      className={
        cardAction.footer.className ??
        "card-footer d-flex align-items-center gap-2 py-2"
      }
    >
      {cardAction.footer.name ? (
        <div className="me-auto small text-muted">{cardAction.footer.name}</div>
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
  // OUTER is always a plain <div class="card ..."> now.
  // Inside order: header (if any) → body (link-wrapped or not) → footer.
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
