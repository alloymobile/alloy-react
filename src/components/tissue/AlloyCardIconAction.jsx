// src/components/tissue/AlloyCardIconAction.jsx
import React from "react";
import { Link } from "react-router-dom";
import { AlloyIcon, IconObject } from "../cell/AlloyIcon.jsx";
import { generateId, TagObject } from "../../utils/idHelper.js";

import AlloyButtonBar, { ButtonBarObject } from "./AlloyButtonBar.jsx";
import AlloyLinkBar, { LinkBarObject } from "./AlloyLinkBar.jsx";

/* ------------------------------------------------------------------
 * CardIconActionObject
 *
 * Card with:
 *   - optional header TagObject
 *   - required body TagObject
 *   - fields[] of TagObject (text rows on the right side)
 *   - required footer TagObject
 *
 *   layout in body:
 *     [icon | text-block]
 *
 *   footer includes an action bar (button bar OR link bar)
 *
 * PLUS:
 *   - link?: string
 *     If present, ONLY the body section becomes clickable (<Link>).
 *     Header and footer never become part of the link.
 *
 *   - icon:       IconObject (avatar / glyph on the left side)
 *   - iconClass:  string (classes for the left column)
 *   - textClass:  string (classes for the right column)
 *
 *   - type:   "AlloyButtonBar" | "AlloyLinkBar"
 *   - action: ButtonBarObject | LinkBarObject
 * ------------------------------------------------------------------ */

/**
 * @typedef {Object} CardIconActionConfig
 * @property {string} [id]
 * @property {string} [className]
 * @property {string} [link]   // NEW: optional. If set, body becomes clickable.
 *
 * @property {TagObject|{id?:string,className?:string,name?:string}} [header]
 *           Optional. Rendered only if it has a non-empty `name`.
 *
 * @property {TagObject|{id?:string,className?:string,name?:string}} body
 *           Required. Used for the main body wrapper/div.
 *
 * @property {Array<TagObject|{id?:string,className?:string,name?:string}>} [fields]
 *           Optional. Rendered in order, in the right column of the body layout.
 *
 * @property {TagObject|{id?:string,className?:string,name?:string}} footer
 *           Required. Footer container. Its `name` renders left side text in footer.
 *
 * @property {IconObject|{iconClass?:string,id?:string}} [icon]
 *           Required-ish visual avatar on the left column. Defaults provided.
 *
 * @property {string} [iconClass]
 *           Class for the left icon column wrapper.
 *
 * @property {string} [textClass]
 *           Class for the right text column wrapper.
 *
 * @property {"AlloyButtonBar"|"AlloyLinkBar"} [type]
 *           Which bar the footer should render on the right.
 *
 * @property {ButtonBarObject|LinkBarObject|object} [action]
 *           Bar config. ButtonBarObject or LinkBarObject will be hydrated.
 */
export class CardIconActionObject {
  /**
   * @param {CardIconActionConfig} card = {}
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

    // footer: required TagObject (again we normalize to avoid undefined)
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
 *   - output?: (payload:any) => void
 *
 * Behavior:
 *   - Outer wrapper is ALWAYS a <div className="card ...">.
 *   - Header is never wrapped in a link.
 *   - Footer is never wrapped in a link.
 *   - ONLY the body becomes a <Link> if cardIconAction.link is set.
 *
 * Footer still emits actions through `output`.
 * ------------------------------------------------------------------ */
export function AlloyCardIconAction({ cardIconAction, output }) {
  if (!cardIconAction || !(cardIconAction instanceof CardIconActionObject)) {
    throw new Error(
      "AlloyCardIconAction requires `cardIconAction` (CardIconActionObject instance)."
    );
  }

  // bridge footer bar's click -> parent output
  function makeActionEmitter() {
    return (self, e) => {
      output?.({
        type: "action",
        action: {
          id: self?.id,
          name: self?.name,
          title: self?.title,
          href: self?.href,
          className: self?.className,
          iconClass: self?.icon?.iconClass,
          active: self?.active,
          disabled: !!self?.disabled,
          ariaLabel: self?.ariaLabel,
          tabIndex: self?.tabIndex,
        },
        card: {
          id: cardIconAction.id,
        },
      });
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
  // We ALWAYS return a <div className="card ...">.
  // We NEVER wrap the whole card in <Link>.
  // Only bodySection is link-wrapped if link is provided.
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
