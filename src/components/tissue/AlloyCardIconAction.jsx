// src/components/tissue/AlloyCardIconAction.jsx
import React from "react";
import { Link } from "react-router-dom";
import { AlloyIcon, IconObject } from "../cell/AlloyIcon.jsx";
import { generateId, TagObject, OutputObject } from "../../utils/idHelper.js";

import AlloyButtonBar, { ButtonBarObject } from "./AlloyButtonBar.jsx";
import AlloyLinkBar, { LinkBarObject } from "./AlloyLinkBar.jsx";

/* ------------------------------------------------------------------
 * CardIconActionObject
 * ------------------------------------------------------------------ */

export class CardIconActionObject {
  /**
   * @param {CardIconActionConfig} card
   */
  constructor(card = {}) {
    // id / className / link
    this.id = card.id ?? generateId("card-icon-action");
    this.className = card.className ?? "card border m-2 shadow";
    this.link = typeof card.link === "string" ? card.link : "";

    // header: optional
    const rawHeader = card.header ?? {};
    this.header =
      rawHeader instanceof TagObject ? rawHeader : new TagObject(rawHeader);

    // body: required TagObject (fallback to empty object so render won't explode)
    const rawBody = card.body ?? {};
    this.body =
      rawBody instanceof TagObject ? rawBody : new TagObject(rawBody);

    // fields: array<TagObject>
    const rawFields = Array.isArray(card.fields) ? card.fields : [];
    this.fields = rawFields.map((f) =>
      f instanceof TagObject ? f : new TagObject(f || {})
    );

    // footer: required TagObject (normalize to avoid undefined)
    const rawFooter = card.footer ?? {};
    this.footer =
      rawFooter instanceof TagObject ? rawFooter : new TagObject(rawFooter);

    // icon: ensure IconObject
    const defaultIcon = new IconObject({ iconClass: "fa-solid fa-user fa-2xl" });
    this.icon =
      card.icon instanceof IconObject
        ? card.icon
        : new IconObject(card.icon || { iconClass: defaultIcon.iconClass });

    // column classes in body
    this.iconClass =
      card.iconClass ??
      "col-3 d-flex align-items-center justify-content-center rounded-circle bg-warning text-white mb-0";
    this.textClass = card.textClass ?? "col-9";

    // action bar
    this.type = card.type ?? "AlloyButtonBar";

    if (this.type === "AlloyLinkBar") {
      this.action =
        card.action instanceof LinkBarObject
          ? card.action
          : new LinkBarObject(card.action || {});
    } else {
      // default AlloyButtonBar
      this.action =
        card.action instanceof ButtonBarObject
          ? card.action
          : new ButtonBarObject(card.action || {});
    }
  }
}

/* ------------------------------------------------------------------
 * AlloyCardIconAction
 *
 * Props:
 *   - cardIconAction: CardIconActionObject (required)
 *   - output?: (out: OutputObject) => void
 *
 * NEW STANDARDIZED OUTPUT (same as AlloyCardAction):
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
 *
 * - Only footer actions emit this OutputObject.
 * - Body link (if present) is purely navigation; does not emit OutputObject here.
 * ------------------------------------------------------------------ */
export function AlloyCardIconAction({ cardIconAction, output }) {
  if (!cardIconAction || !(cardIconAction instanceof CardIconActionObject)) {
    throw new Error(
      "AlloyCardIconAction requires `cardIconAction` (CardIconActionObject instance)."
    );
  }

  // Same fallback logic as AlloyCardAction: name → ariaLabel → title → id
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

  // Footer bar → OutputObject (same semantics as AlloyCardAction)
  function makeActionEmitter() {
    // ButtonBar / LinkBar will call this as (self, event)
    return (self, e) => {
      if (typeof output !== "function") return;

      // Derive the "action" string via fallback chain
      const actionName = resolveActionName(self);

      // Build data from fields[]: data[field.id] = field.name
      const fieldMap = {};
      if (Array.isArray(cardIconAction.fields)) {
        cardIconAction.fields.forEach((field) => {
          if (!field) return;
          const key = field.id;
          const value = field.name;
          if (key && typeof value !== "undefined") {
            fieldMap[key] = value;
          }
        });
      }

      const out = new OutputObject({
        id: cardIconAction.id,
        // align with AlloyCardAction
        type: "card-action",
        action: actionName,
        error: false,
        errorMessage: [],
        data: fieldMap
      });

      output(out);
    };
  }

  /* ----- header (optional by .name) ----- */
  const headerSection =
    cardIconAction.header?.name ? (
      <div
        id={cardIconAction.header.id}
        className={
          cardIconAction.header.className ||
          "card-header py-2 fw-semibold"
        }
        aria-label={cardIconAction.header.name}
      >
        {cardIconAction.header.name}
      </div>
    ) : null;

  /* ----- bodyInner (visual body content, no link yet) ----- */
  const bodyInner = (
    <div
      id={cardIconAction.body.id}
      className={cardIconAction.body.className || "card-body"}
      aria-label={cardIconAction.body.name}
    >
      <div className="row m-0">
        {/* left icon column */}
        <div className={cardIconAction.iconClass}>
          <AlloyIcon icon={cardIconAction.icon} />
        </div>

        {/* right text column */}
        <div className={cardIconAction.textClass}>
          <div className="row p-1">
            {cardIconAction.fields.map((field) =>
              field?.name ? (
                <div
                  key={field.id ?? generateId("card-icon-action-field")}
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

  /* ----- bodySection (ONLY this may be wrapped in <Link>) ----- */
  const bodySection = cardIconAction.link ? (
    <Link
      to={cardIconAction.link}
      className="text-decoration-none d-block"
      aria-label={cardIconAction.body?.name}
    >
      {bodyInner}
    </Link>
  ) : (
    bodyInner
  );

  /* ----- footer (required) ----- */
  const footerBar =
    cardIconAction.type === "AlloyLinkBar" ? (
      <AlloyLinkBar
        linkBar={cardIconAction.action}
        output={makeActionEmitter()}
      />
    ) : (
      <AlloyButtonBar
        buttonBar={cardIconAction.action}
        output={makeActionEmitter()}
      />
    );

  const footerSection = (
    <div
      id={cardIconAction.footer.id}
      className={
        cardIconAction.footer.className ||
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2"
      }
      aria-label={cardIconAction.footer.name}
    >
      {/* footer text (left) */}
      <div className="me-auto">
        {cardIconAction.footer.name ? cardIconAction.footer.name : null}
      </div>

      {/* footer actions (right) */}
      <div role="group">{footerBar}</div>
    </div>
  );

  /* ----- final card layout ----- */
  return (
    <div
      id={cardIconAction.id}
      className={cardIconAction.className}
    >
      {headerSection}
      {bodySection}
      {footerSection}
    </div>
  );
}

export default AlloyCardIconAction;
