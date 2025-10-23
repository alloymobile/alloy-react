import React, { useRef } from "react";
import AlloyButton, { ButtonObject } from "../cell/AlloyButton.jsx";
import AlloyButtonIcon, { ButtonIconObject } from "../cell/AlloyButtonIcon.jsx";

/* ids */
let __barItemCounter = 0;
function nextBarItemId() { return `barItem${++__barItemCounter}`; }
let __buttonBarCounter = 0;
function nextButtonBarId() { return `buttonBar${++__buttonBarCounter}`; }

/* BarItem */
export class BarItem {
  constructor({ id, name, className, show } = {}) {
    this.id = id ?? nextBarItemId();
    this.name = name ?? "Bar";
    this.className = className ?? "";
    this.show = typeof show === "boolean" ? show : false;
  }
}

/* ButtonBarObject (no inheritance) */
export class ButtonBarObject {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *   barName?: BarItem|object,
   *   type?: "AlloyButton"|"AlloyButtonIcon",
   *   buttonClass?: string,
   *   buttons?: any[]
   * }} p
   */
  constructor({ id, className, barName, type, buttonClass, buttons } = {}) {
    this.id = id ?? nextButtonBarId();
    this.className = className ?? "d-flex justify-content-center";
    this.barName = barName instanceof BarItem ? barName : new BarItem(barName ?? {});
    this.type = type ?? "AlloyButton";
    this.buttonClass = buttonClass ?? "nav-item";
    this.buttons = Array.isArray(buttons) ? buttons.slice() : [];
  }
}

/**
 * Props:
 *  - buttonBar: ButtonBarObject (required)
 *  - output?: (self: ButtonObject|ButtonIconObject, e?: any) => void
 *      // Receives the EXACT child ButtonObject/ButtonIconObject and the DOM event.
 */
export function AlloyButtonBar({ buttonBar, output }) {
  if (!buttonBar || !(buttonBar instanceof ButtonBarObject)) {
    throw new Error("AlloyButtonBar requires `buttonBar` (ButtonBarObject instance).");
  }

  const ulIdRef = useRef(buttonBar.id);

  const Title = () =>
    buttonBar.barName?.show ? (
      <div id={buttonBar.barName.id} className={buttonBar.barName.className}>
        {buttonBar.barName.name}
      </div>
    ) : null;

  // Re-emit child's output to parent (same instance + event)
  const passUp = (self, e) => { output?.(self, e); };

  const renderAlloyButton = () => (
    <>
      <Title />
      <ul id={ulIdRef.current} className={buttonBar.className}>
        {buttonBar.buttons.map((item, idx) => {
          if (!(item instanceof ButtonObject)) {
            throw new Error("AlloyButtonBar (type='AlloyButton') requires ButtonObject items.");
          }
          return (
            <li key={(item?.id ?? idx) + "-li"} className={buttonBar.buttonClass}>
              <AlloyButton button={item} output={passUp} />
            </li>
          );
        })}
      </ul>
    </>
  );

  const renderAlloyButtonIcon = () => (
    <>
      <Title />
      <ul id={ulIdRef.current} className={buttonBar.className}>
        {buttonBar.buttons.map((item, idx) => {
          if (!(item instanceof ButtonIconObject)) {
            throw new Error("AlloyButtonBar (type='AlloyButtonIcon') requires ButtonIconObject items.");
          }
          return (
            <li key={(item?.id ?? idx) + "-li"} className={buttonBar.buttonClass}>
              <AlloyButtonIcon buttonIcon={item} output={passUp} />
            </li>
          );
        })}
      </ul>
    </>
  );

  switch (buttonBar.type) {
    case "AlloyButton":
      return <nav data-type="AlloyButton">{renderAlloyButton()}</nav>;
    case "AlloyButtonIcon":
      return <nav data-type="AlloyButtonIcon">{renderAlloyButtonIcon()}</nav>;
    default:
      return <nav data-type="AlloyButton">{renderAlloyButton()}</nav>;
  }
}

export default AlloyButtonBar;
