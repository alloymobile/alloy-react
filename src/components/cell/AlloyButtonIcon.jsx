// AlloyButtonIcon.jsx
import React, {
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import AlloyIcon, { IconObject } from "./AlloyIcon.jsx";
import { generateId } from "../../utils/idHelper.js";

/* -------------------------------------------
 * useActiveClass
 *
 * Same hover/press/focus state pattern as:
 * - AlloyButton
 * - AlloyLinkIcon
 * - AlloyLinkLogo
 *
 * Returns:
 *  - className: base + active if hovered/pressed/focused
 *  - events: handlers to maintain that state
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
 *
 * Data model for AlloyButtonIcon.
 *
 * This is just like ButtonObject, but:
 * - `icon` is required
 * - `name` is optional (so you can have icon-only buttons)
 *
 * Responsibilities:
 *  - validate `icon`
 *  - normalize defaults
 *  - attach per-event callbacks
 *  - guarantee a stable `id`
 * ----------------------------------------- */

/**
 * @typedef {Object} ButtonIconConfig
 * @property {string} [id]                      - Optional. DOM id. Auto-generated if missing.
 * @property {string} [name]                    - Optional. Visible text label after the icon.
 * @property {IconObject|{iconClass:string}} icon
 *                                              - Required. Either an IconObject or a plain object
 *                                                like { iconClass: "fa-solid fa-star" }.
 * @property {string} [className]               - Optional. Base classes for <button>.
 * @property {string} [active]                  - Optional. Classes added during hover/press/focus.
 * @property {boolean} [disabled]               - Optional. Defaults to false.
 * @property {string} [title]                   - Optional. Tooltip/title. Defaults to `name` or "icon button".
 * @property {string} [ariaLabel]               - Optional. Accessible label for <button>. Defaults to `name` or "icon button".
 * @property {number} [tabIndex]                - Optional. Tab index override.
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
   * @param {ButtonIconConfig} buttonIcon
   */
  constructor(buttonIcon = {}) {
    if (!buttonIcon.icon) {
      throw new Error("ButtonIconObject requires `icon`.");
    }

    // normalize icon: accept IconObject instance or plain { iconClass: "..." }
    const normalizedIcon =
      buttonIcon.icon instanceof IconObject
        ? buttonIcon.icon
        : new IconObject(buttonIcon.icon);

    this.id = buttonIcon.id ?? generateId("btn-icon");
    this.name = buttonIcon.name; // may be undefined for icon-only button
    this.icon = normalizedIcon;

    this.className = buttonIcon.className ?? "btn btn-primary";
    this.active = buttonIcon.active ?? "";
    this.disabled = !!buttonIcon.disabled;

    // tooltip/title defaults to name or "icon button"
    this.title =
      buttonIcon.title ??
      buttonIcon.name ??
      "icon button";

    // aria-label defaults to ariaLabel -> name -> "icon button"
    this.ariaLabel =
      buttonIcon.ariaLabel ??
      buttonIcon.name ??
      "icon button";

    this.tabIndex = buttonIcon.tabIndex;

    // optional per-event callbacks
    this.onClick = buttonIcon.onClick;
    this.onKeyDown = buttonIcon.onKeyDown;
    this.onKeyUp = buttonIcon.onKeyUp;
    this.onFocus = buttonIcon.onFocus;
    this.onBlur = buttonIcon.onBlur;
    this.onMouseEnter = buttonIcon.onMouseEnter;
    this.onMouseLeave = buttonIcon.onMouseLeave;
  }
}

/* -------------------------------------------
 * AlloyButtonIcon
 *
 * Props:
 *   - buttonIcon: ButtonIconObject (required)
 *   - output?: (self: ButtonIconObject, e?: any) => void
 *        A global "event tap" that fires on all events.
 *
 * Ref:
 *   ref.current = {
 *     el,      // <button> element
 *     model,   // the ButtonIconObject instance you passed in
 *     focus(), // programmatically focus the button
 *     click(), // programmatically click the button
 *   }
 *
 * Behavior:
 *   - Applies hover/press/focus styling via useActiveClass
 *   - Handles disabled
 *   - Emits events in order:
 *        1. alsoCallInternal(e)  -> keeps hover/press/focus state
 *        2. output(model, e)     -> parent-level listener
 *        3. handler(e, model)    -> model's specific handler, e.g. onClick
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

  // Expose imperative API via ref
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

  // Same emit ordering we standardized in AlloyButton
  const emitThen = (handler, alsoCallInternal) => (e) => {
    alsoCallInternal?.(e);
    output?.(buttonIcon, e);
    handler?.(e, buttonIcon);
  };

  const mergedEvents = {
    onClick: emitThen(buttonIcon.onClick),
    onKeyDown: emitThen(buttonIcon.onKeyDown, events.onFocus),
    onKeyUp: emitThen(buttonIcon.onKeyUp),
    onFocus: emitThen(buttonIcon.onFocus, events.onFocus),
    onBlur: emitThen(buttonIcon.onBlur, events.onBlur),
    onMouseEnter: emitThen(buttonIcon.onMouseEnter, events.onMouseEnter),
    onMouseLeave: emitThen(buttonIcon.onMouseLeave, events.onMouseLeave),
    onMouseDown: emitThen(undefined, events.onMouseDown),
    onMouseUp: emitThen(undefined, events.onMouseUp),
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
      <span className="d-inline-flex align-middle">
        <AlloyIcon icon={buttonIcon.icon} />
      </span>
      {buttonIcon.name ? (
        <span className="px-2 align-middle">{buttonIcon.name}</span>
      ) : null}
    </button>
  );
});

export default AlloyButtonIcon;
