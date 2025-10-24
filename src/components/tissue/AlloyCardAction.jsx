// src/components/tissue/AlloyCardAction.jsx
import React from "react";
import { CardItem, CardObject } from "./AlloyCard.jsx";
import AlloyButtonBar, { ButtonBarObject } from "./AlloyButtonBar.jsx";
import AlloyLinkBar, { LinkBarObject } from "./AlloyLinkBar.jsx";

/* ---------------------- CardActionObject model ---------------------- */
/**
 * CardActionObject extends CardObject and adds:
 *  - type: string ("AlloyButtonBar" | "AlloyLinkBar")
 *  - action: ButtonBarObject | LinkBarObject
 *
 * Mirrors your Angular AlloyCardAction class.
 */
export class CardActionObject extends CardObject {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *   link?: string,            // (in CardAction template we don't wrap whole card in a Link, but we still inherit)
   *   body?: CardItem|object,
   *   fields?: Array<CardItem|object>,
   *   type?: string,            // "AlloyButtonBar" | "AlloyLinkBar"
   *   action?: object           // raw config for the bar
   * }=} res
   */
  constructor(res = {}) {
    super(res);

    this.type = res.type ?? "AlloyButtonBar";

    switch (this.type) {
      case "AlloyLinkBar": {
        // hydrate a link bar
        this.action =
          res.action instanceof LinkBarObject
            ? res.action
            : new LinkBarObject(res.action || {});
        break;
      }

      case "AlloyButtonBar":
      default: {
        // hydrate a button bar
        this.action =
          res.action instanceof ButtonBarObject
            ? res.action
            : new ButtonBarObject(res.action || {});
        break;
      }
    }
  }
}

/* ---------------------- Component ---------------------- */
/**
 * Props:
 *  - cardAction: CardActionObject (required)
 *  - output?: (payload: any) => void
 *
 * Emits:
 *   { type: "action", action: <button/link meta>, card: <cardAction snapshot> }
 */
export function AlloyCardAction({ cardAction, output }) {
  if (!cardAction || !(cardAction instanceof CardActionObject)) {
    throw new Error("AlloyCardAction requires `cardAction` (CardActionObject instance).");
  }

  // We’ll reuse the approach from AlloyTableAction:
  // The inner bar (AlloyButtonBar / AlloyLinkBar) will call us back with
  // (self, e). We translate that into a structured payload.
  function makeActionEmitter() {
    return (self, e) => {
      // collect a minimal snapshot of the clicked item / bar item
      output?.({
        type: "action",
        action: {
          id: self?.id,
          name: self?.name,
          className: self?.className,
          active: self?.active,
          disabled: !!self?.disabled,
          title: self?.title,
          ariaLabel: self?.ariaLabel,
          tabIndex: self?.tabIndex,
          iconClass: self?.icon?.iconClass,
          href: self?.href,
        },
        card: {
          id: cardAction.id,
          bodyId: cardAction.body?.id,
        },
      });
    };
  }

  // Render the "body" portion (fields)
  const bodySection = (
    <div
      id={cardAction.body.id}
      className={cardAction.body.className}
      aria-label={cardAction.body.name}
    >
      {cardAction.fields.map((field) =>
        field?.show ? (
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
  );

  // Render the "action" portion, switching on cardAction.type
  // We always apply the id/className of the bar container div as in Angular.
  const actionSection = (
    <div
      id={cardAction.action?.id}
      className={cardAction.action?.className}
      role="group"
    >
      {cardAction.type === "AlloyLinkBar" ? (
        <AlloyLinkBar linkBar={cardAction.action} output={makeActionEmitter()} />
      ) : (
        // default: AlloyButtonBar
        <AlloyButtonBar
          buttonBar={cardAction.action}
          output={makeActionEmitter()}
        />
      )}
    </div>
  );

  return (
    <div id={cardAction.id} className={cardAction.className}>
      {bodySection}
      {actionSection}
    </div>
  );
}

export default AlloyCardAction;
