// src/components/tissue/AlloyCardImageAction.jsx
import React from "react";
import { CardItem } from "./AlloyCard.jsx";
import { CardImageObject } from "./AlloyCardImage.jsx";

import AlloyButtonBar, { ButtonBarObject } from "./AlloyButtonBar.jsx";
import AlloyLinkBar, { LinkBarObject } from "./AlloyLinkBar.jsx";

/* ------------------------------------------------------------------
 * CardImageActionObject
 *
 * Extends CardImageObject (so it already has):
 *   - id
 *   - className
 *   - link        (not used for wrapping here, same behavior pattern)
 *   - body        (CardItem)
 *   - fields[]    (CardItem[])
 *   - logo        (LogoObject { imageUrl, alt, width, height })
 *   - logoClass   (left visual column class)
 *   - textClass   (right text column class)
 *
 * Adds action support like CardActionObject / CardIconActionObject:
 *   - type: "AlloyButtonBar" | "AlloyLinkBar"
 *   - action: ButtonBarObject | LinkBarObject
 * ------------------------------------------------------------------ */
export class CardImageActionObject extends CardImageObject {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *   link?: string,
   *   body?: CardItem|object,
   *   fields?: Array<CardItem|object>,
   *   logo?: object,
   *   logoClass?: string,
   *   textClass?: string,
   *   type?: string,        // "AlloyButtonBar" | "AlloyLinkBar"
   *   action?: object       // config for the bar
   * }=} res
   */
  constructor(res = {}) {
    super(res); // hydrate card frame + image/logo layout

    this.type = res.type ?? "AlloyButtonBar";

    switch (this.type) {
      case "AlloyLinkBar": {
        this.action =
          res.action instanceof LinkBarObject
            ? res.action
            : new LinkBarObject(res.action || {});
        break;
      }

      case "AlloyButtonBar":
      default: {
        this.action =
          res.action instanceof ButtonBarObject
            ? res.action
            : new ButtonBarObject(res.action || {});
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
 *   - output?: (payload:any) => void
 *
 * Renders card:
 *
 * <div id=cardImageAction.id className=cardImageAction.className>
 *
 *   <div id=body.id className=body.className aria-label=body.name>
 *     <div.row.m-0>
 *       <div className={logoClass}>
 *         <img src=logo.imageUrl ... />
 *       </div>
 *       <div className={textClass}>
 *         <div.row.p-1>
 *           fields[] where show===true
 *         </div>
 *       </div>
 *     </div>
 *   </div>
 *
 *   <div id=action.id className=action.className role="group">
 *     {ButtonBar or LinkBar based on .type}
 *   </div>
 *
 * </div>
 *
 * On click inside the bar we emit:
 * {
 *   type: "action",
 *   action: { ...button/link meta... },
 *   card: { id, bodyId }
 * }
 * ------------------------------------------------------------------ */
export function AlloyCardImageAction({ cardImageAction, output }) {
  if (!cardImageAction || !(cardImageAction instanceof CardImageActionObject)) {
    throw new Error(
      "AlloyCardImageAction requires `cardImageAction` (CardImageActionObject instance)."
    );
  }

  // Map inner bar click to external output payload
  function makeActionEmitter() {
    return (self, e) => {
      output?.({
        type: "action",
        action: {
          id: self?.id,
          name: self?.name,           // button text OR link text
          title: self?.title,         // may be used for tooltip
          href: self?.href,           // link target if it's a link
          className: self?.className,
          iconClass: self?.icon?.iconClass,
          active: self?.active,
          disabled: !!self?.disabled,
          ariaLabel: self?.ariaLabel,
          tabIndex: self?.tabIndex
        },
        card: {
          id: cardImageAction.id,
          bodyId: cardImageAction.body?.id
        }
      });
    };
  }

  // ---------- top section: logo/image left, text fields right ----------
  const bodySection = (
    <div
      id={cardImageAction.body.id}
      className={cardImageAction.body.className}
      aria-label={cardImageAction.body.name}
    >
      <div className="row m-0">
        {/* left image/logo column */}
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

        {/* right fields column */}
        <div className={cardImageAction.textClass}>
          <div className="row p-1">
            {cardImageAction.fields.map((field) =>
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
        </div>
      </div>
    </div>
  );

  // ---------- bottom action bar ----------
  const actionSection = (
    <div
      id={cardImageAction.action?.id}
      className={cardImageAction.action?.className}
      role="group"
    >
      {cardImageAction.type === "AlloyLinkBar" ? (
        <AlloyLinkBar
          linkBar={cardImageAction.action}
          output={makeActionEmitter()}
        />
      ) : (
        // default to AlloyButtonBar
        <AlloyButtonBar
          buttonBar={cardImageAction.action}
          output={makeActionEmitter()}
        />
      )}
    </div>
  );

  return (
    <div id={cardImageAction.id} className={cardImageAction.className}>
      {bodySection}
      {actionSection}
    </div>
  );
}

export default AlloyCardImageAction;
