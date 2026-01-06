// src/components/cell/AlloyButton.jsx
import React, {
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { OutputObject, useDomId } from "../../utils/idHelper.js";

/* -------------------------------------------
 * useActiveClass
 *
 * Track hover / press / focus and return:
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
 * @property {string} [id]                  - Optional. DOM id. If omitted, stable id via useDomId().
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

    // IMPORTANT: do not generate random ids here (Next SSR/CSR safe)
    this.id = button.id;

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
  const isDisabled = button.disabled;

  // SSR/CSR stable DOM id (or provided id)
  const domId = useDomId("btn", button.id);

  const { className, events } = useActiveClass(button.className, button.active);

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
   * emitThen(handler, alsoCallInternal, action, shouldEmit) → event listener
   *
   * Order:
   *  1. alsoCallInternal(e)         → hover / press / focus state
   *  2. (ONLY IF shouldEmit) output(OutputObject)
   *  3. handler(e, button)          → model's own handler
   */
  const emitThen =
    (handler, alsoCallInternal, action, shouldEmit) => (e) => {
      // 1) internal active-class tracking
      alsoCallInternal?.(e);

      // 2) normalized OutputObject for parent (ONLY CLICK emits)
      if (shouldEmit && typeof output === "function") {
        const out = OutputObject.ok({
          id: domId,
          type: "button",
          action,
          data: {
            name: button.name,
          },
        });

        output(out);
      }

      // 3) per-event ButtonObject handler
      handler?.(e, button);
    };

  const mergedEvents = {
    // ✅ EMIT ONLY CLICK
    onClick: emitThen(button.onClick, undefined, "click", true),

    // NO EMIT – just state + model handler
    onMouseEnter: emitThen(
      button.onMouseEnter,
      events.onMouseEnter,
      "mouseenter",
      false
    ),
    onMouseLeave: emitThen(
      button.onMouseLeave,
      events.onMouseLeave,
      "mouseleave",
      false
    ),
    onMouseDown: emitThen(undefined, events.onMouseDown, "mousedown", false),
    onMouseUp: emitThen(undefined, events.onMouseUp, "mouseup", false),

    onFocus: emitThen(button.onFocus, events.onFocus, "focus", false),
    onBlur: emitThen(button.onBlur, events.onBlur, "blur", false),

    // NOTE: do not call events.onFocus here (keydown != focus)
    onKeyDown: emitThen(button.onKeyDown, undefined, "keydown", false),
    onKeyUp: emitThen(button.onKeyUp, undefined, "keyup", false),
  };

  return (
    <button
      id={domId}
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
