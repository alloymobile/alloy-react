// src/components/tissue/AlloyButtonBar.jsx
import React, { useEffect, useRef, useState } from "react";
import AlloyButton, { ButtonObject } from "../cell/AlloyButton.jsx";
import AlloyButtonIcon, { ButtonIconObject } from "../cell/AlloyButtonIcon.jsx";
import { IconObject } from "../cell/AlloyIcon.jsx";

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

/* ButtonBarObject (hydrates `buttons` by `type`, includes `selected`) */
export class ButtonBarObject {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *   barName?: BarItem|object,
   *   type?: "AlloyButton"|"AlloyButtonIcon",
   *   buttonClass?: string,
   *   buttons?: any[],            // plain JSON or instances; hydrated here
   *   selected?: string           // class name for selected item, e.g. "active"
   * }} p
   */
  constructor({ id, className, barName, type, buttonClass, buttons, selected } = {}) {
    this.id = id ?? nextButtonBarId();
    this.className = className ?? "d-flex justify-content-center";
    this.barName = barName instanceof BarItem ? barName : new BarItem(barName ?? {});
    this.type = type ?? "AlloyButton";
    this.buttonClass = buttonClass ?? "nav-item";
    this.selected = selected ?? "active";

    const src = Array.isArray(buttons) ? buttons : [];
    if (this.type === "AlloyButtonIcon") {
      this.buttons = src.map((b) =>
        b instanceof ButtonIconObject
          ? b
          : new ButtonIconObject({
              id: b?.id,
              name: b?.name,
              icon:b?.icon instanceof IconObject ? b?.icon : new IconObject(b?.icon), 
              className: b?.className,
              active: b?.active,
              disabled: b?.disabled,
              title: b?.title,
              ariaLabel: b?.ariaLabel,
              tabIndex: b?.tabIndex,
              onClick: b?.onClick,
              onKeyDown: b?.onKeyDown,
              onKeyUp: b?.onKeyUp,
              onFocus: b?.onFocus,
              onBlur: b?.onBlur,
              onMouseEnter: b?.onMouseEnter,
              onMouseLeave: b?.onMouseLeave,
            })
      );
    } else {
      // default: AlloyButton
      this.buttons = src.map((b) =>
        b instanceof ButtonObject
          ? b
          : new ButtonObject({
              id: b?.id,
              name: b?.name,
              className: b?.className,
              active: b?.active,
              disabled: b?.disabled,
              title: b?.title,
              ariaLabel: b?.ariaLabel,
              tabIndex: b?.tabIndex,
              onClick: b?.onClick,
              onKeyDown: b?.onKeyDown,
              onKeyUp: b?.onKeyUp,
              onFocus: b?.onFocus,
              onBlur: b?.onBlur,
              onMouseEnter: b?.onMouseEnter,
              onMouseLeave: b?.onMouseLeave,
            })
      );
    }
  }
}

/* Clone helper: return a NEW instance of the SAME CLASS with injected `active` */
function cloneWithActive(item, activeClass, isSelected) {
  const active = isSelected ? activeClass : "";

  if (item instanceof ButtonObject) {
    return new ButtonObject({
      id: item.id,
      name: item.name,
      className: item.className,
      active,
      disabled: item.disabled,
      title: item.title,
      ariaLabel: item.ariaLabel,
      tabIndex: item.tabIndex,
      onClick: item.onClick,
      onKeyDown: item.onKeyDown,
      onKeyUp: item.onKeyUp,
      onFocus: item.onFocus,
      onBlur: item.onBlur,
      onMouseEnter: item.onMouseEnter,
      onMouseLeave: item.onMouseLeave,
    });
  }

  if (item instanceof ButtonIconObject) {
    return new ButtonIconObject({
      id: item.id,
      name: item.name,
      icon: item.icon, // keep IconObject instance
      className: item.className,
      active,
      disabled: item.disabled,
      title: item.title,
      ariaLabel: item.ariaLabel,
      tabIndex: item.tabIndex,
      onClick: item.onClick,
      onKeyDown: item.onKeyDown,
      onKeyUp: item.onKeyUp,
      onFocus: item.onFocus,
      onBlur: item.onBlur,
      onMouseEnter: item.onMouseEnter,
      onMouseLeave: item.onMouseLeave,
    });
  }

  return item;
}

/**
 * Props:
 *  - buttonBar: ButtonBarObject (required)
 *  - output?: (self: ButtonObject|ButtonIconObject, e?: any) => void
 */
export function AlloyButtonBar({ buttonBar, output }) {
  if (!buttonBar || !(buttonBar instanceof ButtonBarObject)) {
    throw new Error("AlloyButtonBar requires `buttonBar` (ButtonBarObject instance).");
  }

  const ulIdRef = useRef(buttonBar.id);
  const [selectedId, setSelectedId] = useState("");

  // Reset selection when the bar instance changes (or on mount)
  useEffect(() => {
    setSelectedId("");
  }, [buttonBar]);

  const Title = () =>
    buttonBar.barName?.show ? (
      <div id={buttonBar.barName.id} className={buttonBar.barName.className}>
        {buttonBar.barName.name}
      </div>
    ) : null;

  // Re-emit child's output AND set selection on click
  const passUp = (self, e) => {
    if (e?.type === "click") {
      const nextId = self?.id ?? "";
      setSelectedId(nextId);
    }
    output?.(self, e);
  };

  const renderAlloyButton = () => (
    <>
      <Title />
      <ul id={ulIdRef.current} className={buttonBar.className}>
        {buttonBar.buttons.map((item, idx) => {
          if (!(item instanceof ButtonObject)) {
            throw new Error("AlloyButtonBar (type='AlloyButton') requires ButtonObject items.");
          }
          const isSelected = (item?.id ?? "") === selectedId;
          const cloned = cloneWithActive(item, buttonBar.selected, isSelected);
          return (
            <li key={(item?.id ?? idx) + "-li"} className={buttonBar.buttonClass}>
              <AlloyButton button={cloned} output={passUp} />
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
          const isSelected = (item?.id ?? "") === selectedId;
          const cloned = cloneWithActive(item, buttonBar.selected, isSelected);
          return (
            <li key={(item?.id ?? idx) + "-li"} className={buttonBar.buttonClass}>
              <AlloyButtonIcon buttonIcon={cloned} output={passUp} />
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
