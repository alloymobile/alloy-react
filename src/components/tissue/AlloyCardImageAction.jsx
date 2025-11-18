// src/components/tissue/AlloyCardImageAction.jsx
import React from "react";
import { Link } from "react-router-dom";

import { CardImageObject } from "./AlloyCardImage.jsx";

import AlloyButtonBar, { ButtonBarObject } from "./AlloyButtonBar.jsx";
import AlloyLinkBar, { LinkBarObject } from "./AlloyLinkBar.jsx";
import { TagObject, OutputObject } from "../../utils/idHelper.js";

/* ------------------------------------------------------------------
 * CardImageActionObject
 *
 * Extends CardImageObject and standardizes the "action card" contract.
 *
 * Keeps from CardImageObject:
 *   - id
 *   - className
 *   - link                // IMPORTANT: same semantics as the other cards;
 *                         // ONLY the body is allowed to be clickable.
 *   - logo, logoClass, textClass
 *
 * Re-normalizes:
 *   - header: TagObject        (optional, render only if .name)
 *   - body:   TagObject        (REQUIRED-ish; we normalize)
 *   - fields: TagObject[]      (text rows in body right column)
 *   - footer: TagObject        (REQUIRED-ish; always rendered)
 *
 * Adds footer action bar:
 *   - type:   "AlloyButtonBar" | "AlloyLinkBar"
 *   - action: ButtonBarObject  | LinkBarObject
 * ------------------------------------------------------------------ */
export class CardImageActionObject extends CardImageObject {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *
   *   link?: string,               // we keep it in the model - only body clickable
   *
   *   header?: TagObject|object,
   *   body?: TagObject|object,     // required-ish
   *   fields?: Array<TagObject|object>,
   *   footer?: TagObject|object,   // required-ish
   *
   *   logo?: object,
   *   logoClass?: string,
   *   textClass?: string,
   *
   *   type?: "AlloyButtonBar"|"AlloyLinkBar",
   *   action?: object
   * }=} res
   */
  constructor(res = {}) {
    // CardImageObject hydrates:
    //   id, className, link,
    //   header/body/footer (but we'll override below),
    //   fields, logo, logoClass, textClass
    super(res);

    // Normalize/override header/body/footer/fields into consistent TagObjects.
    this.header =
      res.header instanceof TagObject
        ? res.header
        : new TagObject(
            res.header || {
              className: "card-header py-2 fw-semibold",
              name: ""
            }
          );

    this.body =
      res.body instanceof TagObject
        ? res.body
        : new TagObject(
            res.body || {
              className: "card-body d-flex align-items-center",
              name: "Card Body"
            }
          );

    const rawFields = Array.isArray(res.fields) ? res.fields : [];
    this.fields = rawFields.map((f, idx) =>
      f instanceof TagObject
        ? f
        : new TagObject({
            id: f?.id || `field_${idx + 1}`,
            className: f?.className ?? "",
            name: f?.name ?? ""
          })
    );

    this.footer =
      res.footer instanceof TagObject
        ? res.footer
        : new TagObject(
            res.footer || {
              className:
                "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
              name: "Footer"
            }
          );

    // hydrate footer action bar
    this.type = res.type ?? "AlloyButtonBar";
    switch (this.type) {
      case "AlloyLinkBar": {
        this.action =
          res.action instanceof LinkBarObject
            ? res.action
            : new LinkBarObject(
                res.action || {
                  className: "nav gap-2",
                  linkClass: "nav-item",
                  barName: { show: false },
                  type: "AlloyLink",
                  links: []
                }
              );
        break;
      }

      case "AlloyButtonBar":
      default: {
        this.type = "AlloyButtonBar";
        this.action =
          res.action instanceof ButtonBarObject
            ? res.action
            : new ButtonBarObject(
                res.action || {
                  className: "nav gap-2",
                  buttonClass: "nav-item",
                  barName: { show: false },
                  type: "AlloyButton",
                  buttons: []
                }
              );
        break;
      }
    }
  }
}

/* ------------------------------------------------------------------
 * AlloyCardImageAction
 *
 * Props:
 *   - cardImageAction: CardImageActionObject (required)
 *   - output?: (payload: OutputObject) => void
 *
 * Layout / behavior:
 *   - Root is ALWAYS <div className="card ...">.
 *   - Header is never wrapped in a link.
 *   - Footer is never wrapped in a link.
 *   - ONLY the body becomes clickable if `cardImageAction.link` is set.
 *
 * Footer actions emit standardized OutputObject (same as AlloyCardAction):
 * {
 *   id: "<card-id>",
 *   type: "card-action",
 *   action: "<name | ariaLabel | title | id>",
 *   error: false,
 *   data: {
 *     "<field.id>": "<field.name>",
 *     ...
 *   }
 * }
 * ------------------------------------------------------------------ */
export function AlloyCardImageAction({ cardImageAction, output }) {
  if (
    !cardImageAction ||
    !(cardImageAction instanceof CardImageActionObject)
  ) {
    throw new Error(
      "AlloyCardImageAction requires `cardImageAction` (CardImageActionObject instance)."
    );
  }

  // translate footer bar item click -> standardized OutputObject
  function emitActionWrapper() {
    return (self, e) => {
      if (typeof output !== "function") return;

      // Derive a meaningful action name
      const actionName = resolveActionName(self);

      // Build the data map from fields[]
      const fieldMap = {};
      if (Array.isArray(cardImageAction.fields)) {
        cardImageAction.fields.forEach((field) => {
          if (!field) return;
          const key = field.id;
          const value = field.name;
          if (key && typeof value !== "undefined") {
            fieldMap[key] = value;
          }
        });
      }

      const wrapped = new OutputObject({
        id: cardImageAction.id,
        type: "card-action",
        action: actionName,
        error: false,
        errorMessage: [],
        data: fieldMap
      });

      output(wrapped);
    };
  }

  /* ----- header (optional) ----- */
  const headerHasContent =
    cardImageAction.header && cardImageAction.header.name?.trim();
  const headerSection = headerHasContent ? (
    <div
      id={cardImageAction.header.id}
      className={
        cardImageAction.header.className ||
        "card-header py-2 fw-semibold"
      }
      aria-label={cardImageAction.header.name}
    >
      {cardImageAction.header.name}
    </div>
  ) : null;

  /* ----- bodyInner (visual layout only, no link wrapper yet) ----- */
  const bodyInner = (
    <div
      id={cardImageAction.body.id}
      className={
        cardImageAction.body.className ||
        "card-body d-flex align-items-center"
      }
      aria-label={cardImageAction.body.name}
    >
      <div className="row m-0">
        {/* left: product / logo image */}
        <div className={cardImageAction.logoClass}>
          <img
            src={cardImageAction.logo?.imageUrl}
            alt={cardImageAction.logo?.alt}
            style={{
              width: cardImageAction.logo?.width,
              height: cardImageAction.logo?.height,
              maxWidth: "100%",
              objectFit: "contain"
            }}
          />
        </div>

        {/* right: text lines */}
        <div className={cardImageAction.textClass}>
          <div className="row p-1">
            {cardImageAction.fields.map((field) =>
              field?.name ? (
                <div
                  key={field.id}
                  id={field.id}
                  className={field.className}
                >
                  {field.name}
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );

  /* ----- bodySection (ONLY this becomes clickable via link) ----- */
  const bodySection = cardImageAction.link ? (
    <Link
      to={cardImageAction.link}
      className="text-decoration-none d-block"
      aria-label={cardImageAction.body?.name}
    >
      {bodyInner}
    </Link>
  ) : (
    bodyInner
  );

  /* ----- footer (required-ish) ----- */
  const footerSection = (
    <div
      id={cardImageAction.footer.id}
      className={
        cardImageAction.footer.className ||
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2"
      }
      aria-label={cardImageAction.footer.name}
    >
      {/* footer text on the left */}
      <div className="flex-grow-1">
        {cardImageAction.footer.name}
      </div>

      {/* action bar on the right */}
      <div role="group">
        {cardImageAction.type === "AlloyLinkBar" ? (
          <AlloyLinkBar
            linkBar={cardImageAction.action}
            output={emitActionWrapper()}
          />
        ) : (
          <AlloyButtonBar
            buttonBar={cardImageAction.action}
            output={emitActionWrapper()}
          />
        )}
      </div>
    </div>
  );

  /* ----- final shell ----- */
  // EXACT SAME PATTERN AS THE REST:
  // - Outer wrapper is always <div className="card ...">
  // - Only bodySection becomes link-wrapped
  // - Footer is safe for interactive actions
  return (
    <div
      id={cardImageAction.id}
      className={cardImageAction.className}
    >
      {headerSection}
      {bodySection}
      {footerSection}
    </div>
  );
}

/* ---------------- helper: resolveActionName ---------------- */
function resolveActionName(self) {
  if (!self || typeof self !== "object") return "";

  const name =
    typeof self.name === "string" ? self.name.trim() : "";
  if (name) return name;

  const aria =
    typeof self.ariaLabel === "string" ? self.ariaLabel.trim() : "";
  if (aria) return aria;

  const title =
    typeof self.title === "string" ? self.title.trim() : "";
  if (title) return title;

  const id =
    typeof self.id === "string" ? self.id.trim() : "";
  if (id) return id;

  return "";
}

export default AlloyCardImageAction;
