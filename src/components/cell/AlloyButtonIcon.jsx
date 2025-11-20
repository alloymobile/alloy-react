// src/components/cell/AlloyButtonIcon.jsx
import React, {
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

import AlloyIcon, { IconObject } from "./AlloyIcon.jsx";
import { generateId, OutputObject } from "../../utils/idHelper.js";

/* -------------------------------------------
 * useActiveClass (same pattern as AlloyButton)
 * ----------------------------------------- */
function useActiveClass(className = "", active = "") {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);

  const merged = useMemo(() => {
    const on = hovered || pressed || focused;
    return [className, on && active].filter(Boolean).join(" ");
  }, [className, active, hovered, pressed, focused]);

  return {
    className: merged,
    events: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => {
        setHovered(false);
        setPressed(false);
      },
      onMouseDown: () => setPressed(true),
      onMouseUp: () => setPressed(false),
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    },
  };
}

/* -------------------------------------------
 * ButtonIconObject
 * ----------------------------------------- */

/**
 * @typedef {Object} ButtonIconConfig
 * @property {string} [name]               - Optional. Visible label text. If missing → icon-only.
 * @property {string} [id]                 - Optional. DOM id. Auto-generated if missing.
 * @property {string} [className]          - Optional. Base classes for <button>.
 * @property {string} [active]             - Optional. Classes added on hover/press/focus.
 * @property {boolean} [disabled]          - Optional. Defaults to false.
 * @property {string} [title]              - Optional. Tooltip/title. Defaults to name or "icon button".
 * @property {string} [ariaLabel]          - Optional. Accessible name. Defaults to name or "icon button".
 * @property {number} [tabIndex]           - Optional. Tab index override.
 *
 * @property {{iconClass:string, id?:string}} icon  - Required. Passed to IconObject.
 *
 * @property {(e:any, self:ButtonIconObject)=>void} [onClick]
 * @property {(e:any, self:ButtonIconObject)=>void} [onKeyDown]
 * @property {(e:any, self:ButtonIconObject)=>void} [onKeyUp]
 * @property {(e:any, self:ButtonIconObject)=>void} [onFocus]
 * @property {(e:any, self:ButtonIconObject)=>void} [onBlur]
 * @property {(e:any, self:ButtonIconObject)=>void} [onMouseEnter]
 * @property {(e:any, self:ButtonIconObject)=>void} [onMouseLeave]
 */
export class ButtonIconObject {
  /**
   * @param {ButtonIconConfig} btn
   */
  constructor(btn = {}) {
    if (!btn.icon) {
      throw new Error("ButtonIconObject requires `icon`.");
    }

    this.id = btn.id ?? generateId("btn-icon");
    this.name = btn.name; // optional

    this.className = btn.className ?? "btn btn-primary";
    this.active = btn.active ?? "";
    this.disabled = !!btn.disabled;

    const fallbackLabel = this.name || "icon button";
    this.title = btn.title ?? fallbackLabel;
    this.ariaLabel = btn.ariaLabel ?? fallbackLabel;
    this.tabIndex = btn.tabIndex;

    // icon as IconObject
    this.icon =
      btn.icon instanceof IconObject ? btn.icon : new IconObject(btn.icon);

    // optional per-event callbacks
    this.onClick = btn.onClick;
    this.onKeyDown = btn.onKeyDown;
    this.onKeyUp = btn.onKeyUp;
    this.onFocus = btn.onFocus;
    this.onBlur = btn.onBlur;
    this.onMouseEnter = btn.onMouseEnter;
    this.onMouseLeave = btn.onMouseLeave;
  }
}

/* -------------------------------------------
 * AlloyButtonIcon
 *
 * IMPORTANT: Only emits OutputObject on:
 *  - click
 *  - keydown
 * ----------------------------------------- */
export const AlloyButtonIcon = forwardRef(function AlloyButtonIcon(
  { buttonIcon, output },
  ref
) {
  if (!buttonIcon || !(buttonIcon instanceof ButtonIconObject)) {
    throw new Error(
      "AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance)."
    );
  }

  const elRef = useRef(null);
  const autoId = useRef(buttonIcon.id);
  const isDisabled = buttonIcon.disabled;

  const { className, events } = useActiveClass(
    buttonIcon.className,
    buttonIcon.active
  );

  // expose focus() / click() / element / model via ref
  useImperativeHandle(
    ref,
    () => ({
      el: elRef.current,
      model: buttonIcon,
      focus: () => elRef.current?.focus(),
      click: () => elRef.current?.click(),
    }),
    [buttonIcon]
  );

  /**
   * emitThen(handler, alsoCallInternal, action, shouldEmit) → event listener
   *
   * Order:
   *  1. alsoCallInternal(e)     → hover / press / focus state
   *  2. (ONLY IF shouldEmit) output(OutputObject)
   *  3. handler(e, buttonIcon)  → model's own handler
   */
  const emitThen =
    (handler, alsoCallInternal, action, shouldEmit) => (e) => {
      // 1) internal active-class tracking
      alsoCallInternal?.(e);

      // 2) normalized OutputObject for parent (only for click / keydown)
      if (shouldEmit && typeof output === "function") {
        const out = OutputObject.ok({
          id: buttonIcon.id,
          type: "button-icon",
          action,
          data: {
            name: buttonIcon.name,
          },
        });

        output(out);
      }

      // 3) per-event handler on model
      handler?.(e, buttonIcon);
    };

  const mergedEvents = {
    // EMIT
    onClick: emitThen(buttonIcon.onClick, undefined, "click", true),
    onKeyDown: emitThen(
      buttonIcon.onKeyDown,
      events.onFocus,
      "keydown",
      true
    ),

    // NO EMIT – just state + model handler
    onKeyUp: emitThen(buttonIcon.onKeyUp, undefined, "keyup", false),
    onFocus: emitThen(buttonIcon.onFocus, events.onFocus, "focus", false),
    onBlur: emitThen(buttonIcon.onBlur, events.onBlur, "blur", false),
    onMouseEnter: emitThen(
      buttonIcon.onMouseEnter,
      events.onMouseEnter,
      "mouseenter",
      false
    ),
    onMouseLeave: emitThen(
      buttonIcon.onMouseLeave,
      events.onMouseLeave,
      "mouseleave",
      false
    ),
    onMouseDown: emitThen(undefined, events.onMouseDown, "mousedown", false),
    onMouseUp: emitThen(undefined, events.onMouseUp, "mouseup", false),
  };

  return (
    <button
      id={autoId.current}
      ref={elRef}
      type="button"
      className={className}
      title={buttonIcon.title}
      aria-label={buttonIcon.ariaLabel}
      aria-disabled={isDisabled || undefined}
      disabled={isDisabled}
      tabIndex={buttonIcon.tabIndex}
      {...mergedEvents}
    >
      {/* icon */}
      <span className="align-middle">
        <AlloyIcon icon={buttonIcon.icon} />
      </span>

      {/* optional label */}
      {buttonIcon.name && (
        <span className="px-2 align-middle">{buttonIcon.name}</span>
      )}
    </button>
  );
});

export default AlloyButtonIcon;
