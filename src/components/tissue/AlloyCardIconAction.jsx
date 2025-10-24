// src/components/tissue/AlloyCardIconAction.jsx
import React from "react";
import { AlloyIcon, IconObject } from "../cell/AlloyIcon.jsx";

import { CardItem } from "./AlloyCard.jsx";
import { CardIconObject } from "./AlloyCardIcon.jsx";

import AlloyButtonBar, { ButtonBarObject } from "./AlloyButtonBar.jsx";
import AlloyLinkBar, { LinkBarObject } from "./AlloyLinkBar.jsx";

/* ------------------------------------------------------------------
 * CardIconActionObject
 *
 * Extends CardIconObject (so it already has):
 *   - id
 *   - className
 *   - body (CardItem)
 *   - fields[] (CardItem[])
 *   - icon (IconObject), iconClass (left col), textClass (right col)
 *   - link (inherited but not used for wrapping here)
 *
 * Adds action support like CardActionObject:
 *   - type: "AlloyButtonBar" | "AlloyLinkBar"
 *   - action: ButtonBarObject | LinkBarObject
 * ------------------------------------------------------------------ */
export class CardIconActionObject extends CardIconObject {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *   link?: string,
   *   body?: CardItem|object,
   *   fields?: Array<CardItem|object>,
   *   icon?: IconObject|object,
   *   iconClass?: string,
   *   textClass?: string,
   *   type?: string,        // "AlloyButtonBar" | "AlloyLinkBar"
   *   action?: object       // config for the action bar
   * }=} res
   */
  constructor(res = {}) {
    super(res); // hydrate core card+icon shape

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
 * AlloyCardIconAction
 *
 * Props:
 *   - cardIconAction: CardIconActionObject (required)
 *   - output?: (payload:any) => void
 *
 * Renders:
 *   <div id={...} className={...}>
 *     <div id=body ...>
 *       <div.row>
 *         <div className={iconClass}><AlloyIcon .../></div>
 *         <div className={textClass}>
 *           <div.row.p-1>
 *             {fields[] where show===true}
 *           </div>
 *         </div>
 *       </div>
 *     </div>
 *
 *     <div id=action.id className=action.className role="group">
 *       Either <AlloyButtonBar .../> or <AlloyLinkBar .../>,
 *       depending on cardIconAction.type
 *     </div>
 *   </div>
 *
 * Emits on button/link click:
 *   {
 *     type: "action",
 *     action: {
 *       id,
 *       name,
 *       title,
 *       href,
 *       className,
 *       iconClass,
 *       active,
 *       disabled,
 *       ariaLabel,
 *       tabIndex
 *     },
 *     card: {
 *       id,
 *       bodyId
 *     }
 *   }
 * ------------------------------------------------------------------ */
export function AlloyCardIconAction({ cardIconAction, output }) {
  if (!cardIconAction || !(cardIconAction instanceof CardIconActionObject)) {
    throw new Error(
      "AlloyCardIconAction requires `cardIconAction` (CardIconActionObject instance)."
    );
  }

  // translate internal bar click -> external output()
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
          tabIndex: self?.tabIndex
        },
        card: {
          id: cardIconAction.id,
          bodyId: cardIconAction.body?.id
        }
      });
    };
  }

  // ---------- top content: icon left, text right ----------
  const bodySection = (
    <div
      id={cardIconAction.body.id}
      className={cardIconAction.body.className}
      aria-label={cardIconAction.body.name}
    >
      <div className="row m-0">
        {/* left icon bubble / avatar area */}
        <div className={cardIconAction.iconClass}>
          <AlloyIcon icon={cardIconAction.icon} />
        </div>

        {/* right fields */}
        <div className={cardIconAction.textClass}>
          <div className="row p-1">
            {cardIconAction.fields.map((field) =>
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
      id={cardIconAction.action?.id}
      className={cardIconAction.action?.className}
      role="group"
    >
      {cardIconAction.type === "AlloyLinkBar" ? (
        <AlloyLinkBar
          linkBar={cardIconAction.action}
          output={makeActionEmitter()}
        />
      ) : (
        // default: AlloyButtonBar
        <AlloyButtonBar
          buttonBar={cardIconAction.action}
          output={makeActionEmitter()}
        />
      )}
    </div>
  );

  return (
    <div id={cardIconAction.id} className={cardIconAction.className}>
      {bodySection}
      {actionSection}
    </div>
  );
}

export default AlloyCardIconAction;
