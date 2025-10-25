// AlloyButton.jsx
import React, {
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { generateId } from "../../utils/idHelper.js";

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
 *
 * This is the normalized model for AlloyButton.
 * It guarantees:
 *   - required `name`
 *   - stable unique `id`
 *   - safe defaults for all other fields
 *   - event handlers carried along on the instance
 *
 * We ALSO expose optional per-event callbacks:
 *   onClick, onKeyDown, onKeyUp, onFocus, onBlur,
 *   onMouseEnter, onMouseLeave
 *
 * And AlloyButton will call them in addition to a
 * parent-level `output` callback prop.
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

    this.className = button.className ?? "";
    this.active = button.active ?? "btn btn-primary";
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
 *
 * Props:
 *   - button: ButtonObject   (required)
 *   - output?: (self: ButtonObject, e?: any) => void
 *        Global event tap. Called for all supported events.
 *
 * Ref:
 *   ref.current = {
 *     el,        // underlying <button> element
 *     model,     // the same ButtonObject you passed
 *     focus(),   // focus the button
 *     click(),   // click() the button
 *   }
 *
 * Behavior:
 *   - Uses hover/press/focus state to apply button.active classes.
 *   - Wires events so they call:
 *       1. output(self, event)         // if provided
 *       2. per-event handler on model  // e.g. button.onClick(event, model)
 *   - Keeps DOM id stable via useRef(button.id).
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

  // Helper builder:
  // emitThen(handler, alsoCallInternal?) returns an event listener.
  //
  // Order:
  //   alsoCallInternal(e)   -> keeps internal hover/press/focus state in sync
  //   output(button, e)     -> global listener from parent
  //   handler(e, button)    -> specific handler from this ButtonObject
  const emitThen = (handler, alsoCallInternal) => (e) => {
    alsoCallInternal?.(e);
    output?.(button, e);
    handler?.(e, button);
  };

  const mergedEvents = {
    onClick: emitThen(button.onClick),
    onKeyDown: emitThen(button.onKeyDown, events.onFocus),
    onKeyUp: emitThen(button.onKeyUp),
    onFocus: emitThen(button.onFocus, events.onFocus),
    onBlur: emitThen(button.onBlur, events.onBlur),
    onMouseEnter: emitThen(button.onMouseEnter, events.onMouseEnter),
    onMouseLeave: emitThen(button.onMouseLeave, events.onMouseLeave),
    onMouseDown: emitThen(undefined, events.onMouseDown),
    onMouseUp: emitThen(undefined, events.onMouseUp),
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
