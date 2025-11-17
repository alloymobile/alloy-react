// AlloyButton.jsx
import React, {
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { generateId, OutputObject } from "../../utils/idHelper.js";

/* -------------------------------------------
 * useActiveClass
 *
 * Same pattern as AlloyLink / AlloyLinkIcon / AlloyLinkLogo:
 * track hover / press / focus and return:
 *  - merged className (base + active if "on")
 *  - event handlers to control that state
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
 * ButtonObject
 * ----------------------------------------- */

/**
 * @typedef {Object} ButtonConfig
 * @property {string} name                  - Required. Visible label text.
 * @property {string} [id]                  - Optional. DOM id. Auto-generated if missing.
 * @property {string} [className]           - Optional. Base classes for <button>.
 * @property {string} [active]              - Optional. Classes added on hover/press/focus.
 * @property {boolean} [disabled]           - Optional. Defaults to false.
 * @property {string} [title]               - Optional. Tooltip/title. Defaults to `name`.
 * @property {string} [ariaLabel]           - Optional. Accessible name. Defaults to `name`.
 * @property {number} [tabIndex]            - Optional. Tab index override.
 *
 * @property {(e:any, self:ButtonObject)=>void} [onClick]
 * @property {(e:any, self:ButtonObject)=>void} [onKeyDown]
 * @property {(e:any, self:ButtonObject)=>void} [onKeyUp]
 * @property {(e:any, self:ButtonObject)=>void} [onFocus]
 * @property {(e:any, self:ButtonObject)=>void} [onBlur]
 * @property {(e:any, self:ButtonObject)=>void} [onMouseEnter]
 * @property {(e:any, self:ButtonObject)=>void} [onMouseLeave]
 */
export class ButtonObject {
  /**
   * @param {ButtonConfig} button
   */
  constructor(button = {}) {
    if (!button.name) {
      throw new Error("ButtonObject requires `name`.");
    }

    this.id = button.id ?? generateId("btn");
    this.name = button.name;

    this.className = button.className ?? "btn btn-primary";
    this.active = button.active ?? "";
    this.disabled = !!button.disabled;
    this.title = button.title ?? button.name;
    this.ariaLabel = button.ariaLabel ?? button.name;
    this.tabIndex = button.tabIndex;

    // optional per-event callbacks
    this.onClick = button.onClick;
    this.onKeyDown = button.onKeyDown;
    this.onKeyUp = button.onKeyUp;
    this.onFocus = button.onFocus;
    this.onBlur = button.onBlur;
    this.onMouseEnter = button.onMouseEnter;
    this.onMouseLeave = button.onMouseLeave;
  }
}

/* -------------------------------------------
 * AlloyButton
 * ----------------------------------------- */
export const AlloyButton = forwardRef(function AlloyButton(
  { button, output },
  ref
) {
  if (!button || !(button instanceof ButtonObject)) {
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  }

  const elRef = useRef(null);
  const autoId = useRef(button.id);
  const isDisabled = button.disabled;

  const { className, events } = useActiveClass(
    button.className,
    button.active
  );

  // expose focus() / click() / element / model via ref
  useImperativeHandle(
    ref,
    () => ({
      el: elRef.current,
      model: button,
      focus: () => elRef.current?.focus(),
      click: () => elRef.current?.click(),
    }),
    [button]
  );

  /**
   * emitThen(handler, alsoCallInternal, action) → event listener
   *
   * Order:
   *  1. alsoCallInternal(e)         → hover / press / focus state
   *  2. output(OutputObject)        → parent-level callback
   *  3. handler(e, button)          → model's own handler
   */
  const emitThen = (handler, alsoCallInternal, action) => (e) => {
    // 1) internal active-class tracking
    alsoCallInternal?.(e);

    // 2) normalized OutputObject for parent
    if (typeof output === "function") {
      // Success path only; no error here.
      const out = OutputObject.ok({
        id: button.id,
        type: "button",
        action,
        data: {
          // keep payload minimal; we don't duplicate id here
          name: button.name
        },
      });

      output(out);
    }

    // 3) per-event ButtonObject handler
    handler?.(e, button);
  };

  const mergedEvents = {
    onClick: emitThen(button.onClick, undefined, "click"),
    onKeyDown: emitThen(button.onKeyDown, events.onFocus, "keydown"),
    onKeyUp: emitThen(button.onKeyUp, undefined, "keyup"),
    onFocus: emitThen(button.onFocus, events.onFocus, "focus"),
    onBlur: emitThen(button.onBlur, events.onBlur, "blur"),
    onMouseEnter: emitThen(
      button.onMouseEnter,
      events.onMouseEnter,
      "mouseenter"
    ),
    onMouseLeave: emitThen(
      button.onMouseLeave,
      events.onMouseLeave,
      "mouseleave"
    ),
    onMouseDown: emitThen(undefined, events.onMouseDown, "mousedown"),
    onMouseUp: emitThen(undefined, events.onMouseUp, "mouseup"),
  };

  return (
    <button
      id={autoId.current}
      ref={elRef}
      type="button"
      className={className}
      title={button.title}
      aria-label={button.ariaLabel}
      aria-disabled={isDisabled || undefined}
      disabled={isDisabled}
      tabIndex={button.tabIndex}
      {...mergedEvents}
    >
      <span className="px-2 align-middle">{button.name}</span>
    </button>
  );
});

export default AlloyButton;
