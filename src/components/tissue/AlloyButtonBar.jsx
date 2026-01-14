// src/components/tissue/AlloyButtonBar.jsx

import React, { useEffect, useRef, useState } from "react";

import AlloyButton, { ButtonObject } from "../cell/AlloyButton.jsx";
import AlloyButtonIcon, { ButtonIconObject } from "../cell/AlloyButtonIcon.jsx";
import AlloyButtonDropDown, {
  ButtonDropDownObject,
} from "../cell/AlloyButtonDropDown.jsx";

import { generateId, TagObject, OutputObject } from "../../utils/idHelper.js";

/**
 * @typedef {Object} ButtonBarConfig
 * @property {string} [id]                   - Optional DOM id for the <ul>. Auto-generated if missing.
 * @property {string} [className]            - Class names for the <ul> wrapper of the bar.
 *                                             Defaults to "d-flex justify-content-center".
 * @property {TagObject|Object} [title]      - Optional heading object for the bar.
 *                                             Can be:
 *                                               - instance of TagObject
 *                                               - plain { id?, name?, className? }
 *                                               - or undefined
 *                                             We will ALWAYS store a TagObject.
 *                                             If its `.name` is "", UI won't render it.
 * @property {string} [type]                 - Which flavor of buttons we render:
 *                                             "AlloyButton" | "AlloyButtonIcon"
 *                                             Defaults to "AlloyButton".
 * @property {string} [buttonClass]          - Class applied to each <li>.
 *                                             Defaults to "nav-item".
 * @property {Array<any>} [buttons]          - Array of button configs or already-constructed button objects.
 *                                             We will ensure each entry becomes the right model:
 *                                               - ButtonObject          (for AlloyButton)
 *                                               - ButtonIconObject      (for AlloyButtonIcon)
 *                                               - ButtonDropDownObject  (for AlloyButtonDropDown inside the bar)
 * @property {string} [selected]             - CSS class to inject into the active/selected button's `active`.
 *                                             Defaults to "active".
 */

/**
 * ButtonBarObject
 *
 * Normalizes config for AlloyButtonBar.
 * Responsibilities:
 *  - generate id and apply defaults for its own scalar fields
 *  - normalize `title` into a TagObject
 *  - normalize `buttons` array into ButtonObject / ButtonIconObject / ButtonDropDownObject instances
 *
 * No UI logic lives here.
 */
export class ButtonBarObject {
  /**
   * @param {ButtonBarConfig} bar
   */
  constructor(bar = {}) {
    // Unique id for the <ul> container
    this.id = bar.id ?? generateId("buttonBar");

    // ClassName for the <ul> container
    this.className = bar.className ?? "d-flex justify-content-center";

    // Which "flavor" of button row we are:
    //   "AlloyButton" | "AlloyButtonIcon"
    this.type = bar.type ?? "AlloyButton";

    // Class to apply to each <li>
    this.buttonClass = bar.buttonClass ?? "nav-item";

    // Class to inject on the active/selected button (into its .active field)
    this.selected = bar.selected ?? "active";

    // Normalize title into TagObject
    if (bar.title instanceof TagObject) {
      this.title = bar.title;
    } else if (bar.title) {
      this.title = new TagObject(bar.title);
    } else {
      this.title = new TagObject({}); // defaults to name:"" so UI can safely check .name
    }

    // Normalize buttons
    const rawButtons = Array.isArray(bar.buttons) ? bar.buttons : [];

    this.buttons = rawButtons.map((b) => {
      // Allow a dropdown item inside the same bar
      const isDropdown =
        b instanceof ButtonDropDownObject ||
        b?.type === "dropdown" ||
        b?.type === "AlloyButtonDropDown" ||
        !!b?.linkBar;

      if (isDropdown) {
        return b instanceof ButtonDropDownObject ? b : new ButtonDropDownObject(b);
      }

      if (this.type === "AlloyButtonIcon") {
        return b instanceof ButtonIconObject ? b : new ButtonIconObject(b);
      }

      // Default "AlloyButton"
      return b instanceof ButtonObject ? b : new ButtonObject(b);
    });
  }
}

/**
 * cloneWithActiveAndWrapOutput
 *
 * We don't mutate the original button model. We create a *new* instance
 * of the same class (ButtonObject or ButtonIconObject), but with:
 *  - updated `active` (only if selected)
 *  - wrapped output so we can:
 *      - maintain selection
 *      - forward the child's OutputObject up to parent
 *
 * We return:
 *   { model: <newBtnInstance>, onAnyEvent: (out: OutputObject) => void }
 *
 * The calling component then wires that handler into the rendered component's
 * `output` prop.
 */
function cloneWithActiveAndWrapOutput(
  btnModel,
  injectedActiveClass,
  isSelected,
  setSelectedId,
  parentOutput
) {
  const activeClass = isSelected ? injectedActiveClass : "";

  // Wrapper for child's OutputObject
  /**
   * @param {OutputObject|any} out
   */
  function passUp(out) {
    if (!out) {
      return;
    }

    // Try to detect a click to manage "selected" state.
    const action = out.action || out?.data?.event || "";
    const isClick = action === "click";

    if (isClick) {
      const nextId = out?.data?.id ?? "";
      if (nextId) {
        setSelectedId(nextId);
      }
    }

    // Forward child's OutputObject (unchanged) to parent.
    parentOutput?.(out);
  }

  // Rebuild the model with the same fields, but replaced `active`.
  // NOTE: We do NOT copy runtime-only stuff like "internal hover state".
  //       We DO copy the user's callbacks like onClick, onKeyDown, etc.
  if (btnModel instanceof ButtonObject) {
    const cloned = new ButtonObject({
      id: btnModel.id,
      name: btnModel.name,
      className: btnModel.className,
      active: activeClass,
      disabled: btnModel.disabled,
      title: btnModel.title,
      ariaLabel: btnModel.ariaLabel,
      tabIndex: btnModel.tabIndex,
      onClick: btnModel.onClick,
      onKeyDown: btnModel.onKeyDown,
      onKeyUp: btnModel.onKeyUp,
      onFocus: btnModel.onFocus,
      onBlur: btnModel.onBlur,
      onMouseEnter: btnModel.onMouseEnter,
      onMouseLeave: btnModel.onMouseLeave,
    });

    return { model: cloned, onAnyEvent: passUp };
  }

  if (btnModel instanceof ButtonIconObject) {
    const cloned = new ButtonIconObject({
      id: btnModel.id,
      name: btnModel.name,
      icon: btnModel.icon, // already an IconObject (normalized in ButtonIconObject)
      className: btnModel.className,
      active: activeClass,
      disabled: btnModel.disabled,
      title: btnModel.title,
      ariaLabel: btnModel.ariaLabel,
      tabIndex: btnModel.tabIndex,
      onClick: btnModel.onClick,
      onKeyDown: btnModel.onKeyDown,
      onKeyUp: btnModel.onKeyUp,
      onFocus: btnModel.onFocus,
      onBlur: btnModel.onBlur,
      onMouseEnter: btnModel.onMouseEnter,
      onMouseLeave: btnModel.onMouseLeave,
    });

    return { model: cloned, onAnyEvent: passUp };
  }

  // Fallback (shouldn't happen in normal usage)
  return { model: btnModel, onAnyEvent: passUp };
}

/**
 * AlloyButtonBar
 *
 * Props:
 *  - buttonBar: ButtonBarObject (required)
 *  - output?: (out: OutputObject) => void
 */
export function AlloyButtonBar({ buttonBar, output }) {
  if (!buttonBar || !(buttonBar instanceof ButtonBarObject)) {
    throw new Error(
      "AlloyButtonBar requires `buttonBar` (ButtonBarObject instance)."
    );
  }

  // Stable <ul> id
  const ulIdRef = useRef(buttonBar.id);

  // Track which button is selected (visually "active")
  const [selectedId, setSelectedId] = useState("");

  // Whenever an entirely new ButtonBarObject is passed in,
  // reset local selection state.
  useEffect(() => {
    setSelectedId("");
  }, [buttonBar]);

  // Optional title heading:
  // Only render if buttonBar.title.name is truthy.
  const Title = () =>
    buttonBar.title && buttonBar.title.name ? (
      <div id={buttonBar.title.id} className={buttonBar.title.className}>
        {buttonBar.title.name}
      </div>
    ) : null;

  // Mixed renderer: supports ButtonObject + ButtonIconObject + ButtonDropDownObject
  function renderMixedList() {
    return (
      <ul
        id={ulIdRef.current}
        className={`${buttonBar.className} list-unstyled`}
        style={{ listStyle: "none", paddingLeft: 0, marginBottom: 0 }}
      >
        {buttonBar.buttons.map((btnModel, idx) => {
          if (btnModel instanceof ButtonDropDownObject) {
            return (
              <li
                key={(btnModel?.id ?? idx) + "-li"}
                className={buttonBar.buttonClass}
              >
                <AlloyButtonDropDown
                  buttonDropDown={btnModel}
                  output={(link) => {
                    const out = OutputObject.ok({
                      id: btnModel.id,
                      type: "dropdown",
                      action: "click",
                      data: {
                        id: link?.id ?? "",
                        name: link?.name ?? "",
                        href: link?.href ?? "",
                        link,
                      },
                    });
                    output?.(out);
                  }}
                />
              </li>
            );
          }

          if (btnModel instanceof ButtonIconObject) {
            const isSelected = (btnModel?.id ?? "") === selectedId;

            const { model: clonedBtn, onAnyEvent } = cloneWithActiveAndWrapOutput(
              btnModel,
              buttonBar.selected,
              isSelected,
              setSelectedId,
              output
            );

            return (
              <li
                key={(btnModel?.id ?? idx) + "-li"}
                className={buttonBar.buttonClass}
              >
                <AlloyButtonIcon buttonIcon={clonedBtn} output={onAnyEvent} />
              </li>
            );
          }

          if (btnModel instanceof ButtonObject) {
            const isSelected = (btnModel?.id ?? "") === selectedId;

            const { model: clonedBtn, onAnyEvent } = cloneWithActiveAndWrapOutput(
              btnModel,
              buttonBar.selected,
              isSelected,
              setSelectedId,
              output
            );

            return (
              <li
                key={(btnModel?.id ?? idx) + "-li"}
                className={buttonBar.buttonClass}
              >
                <AlloyButton button={clonedBtn} output={onAnyEvent} />
              </li>
            );
          }

          throw new Error(
            "AlloyButtonBar expects ButtonObject | ButtonIconObject | ButtonDropDownObject items."
          );
        })}
      </ul>
    );
  }

  // Render helpers for the 2 legacy variants.
  function renderAlloyButtonList() {
    return (
      <ul
        id={ulIdRef.current}
        className={`${buttonBar.className} list-unstyled`}
        style={{ listStyle: "none", paddingLeft: 0, marginBottom: 0 }}
      >
        {buttonBar.buttons.map((btnModel, idx) => {
          if (!(btnModel instanceof ButtonObject)) {
            throw new Error(
              "AlloyButtonBar (type='AlloyButton') expects ButtonObject items."
            );
          }

          const isSelected = (btnModel?.id ?? "") === selectedId;

          // clone model with active class and wrapped output
          const { model: clonedBtn, onAnyEvent } = cloneWithActiveAndWrapOutput(
            btnModel,
            buttonBar.selected,
            isSelected,
            setSelectedId,
            output
          );

          return (
            <li
              key={(btnModel?.id ?? idx) + "-li"}
              className={buttonBar.buttonClass}
            >
              <AlloyButton button={clonedBtn} output={onAnyEvent} />
            </li>
          );
        })}
      </ul>
    );
  }

  function renderAlloyButtonIconList() {
    return (
      <ul
        id={ulIdRef.current}
        className={`${buttonBar.className} list-unstyled`}
        style={{ listStyle: "none", paddingLeft: 0, marginBottom: 0 }}
      >
        {buttonBar.buttons.map((btnModel, idx) => {
          if (!(btnModel instanceof ButtonIconObject)) {
            throw new Error(
              "AlloyButtonBar (type='AlloyButtonIcon') expects ButtonIconObject items."
            );
          }

          const isSelected = (btnModel?.id ?? "") === selectedId;

          const { model: clonedBtn, onAnyEvent } = cloneWithActiveAndWrapOutput(
            btnModel,
            buttonBar.selected,
            isSelected,
            setSelectedId,
            output
          );

          return (
            <li
              key={(btnModel?.id ?? idx) + "-li"}
              className={buttonBar.buttonClass}
            >
              <AlloyButtonIcon buttonIcon={clonedBtn} output={onAnyEvent} />
            </li>
          );
        })}
      </ul>
    );
  }

  // Decide which list to render based on buttonBar.type
  function renderBody() {
    const hasDropdown = buttonBar.buttons.some(
      (b) => b instanceof ButtonDropDownObject
    );
    if (hasDropdown) {
      return renderMixedList();
    }

    switch (buttonBar.type) {
      case "AlloyButtonIcon":
        return renderAlloyButtonIconList();
      case "AlloyButton":
      default:
        return renderAlloyButtonList();
    }
  }

  return (
    <nav data-type={buttonBar.type}>
      <Title />
      {renderBody()}
    </nav>
  );
}

export default AlloyButtonBar;
