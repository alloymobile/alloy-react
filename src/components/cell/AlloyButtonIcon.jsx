// AlloyButtonIcon.jsx
import React, {
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import AlloyIcon, { IconObject } from "./AlloyIcon.jsx";

/* --------------- id generator --------------- */
let __btnIconCounter = 0;
function nextButtonIconId() {
  __btnIconCounter += 1;
  return `alloyBtnicon${__btnIconCounter}`;
}

/* --------------- hover/press/focus → class merge --------------- */
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
      onMouseLeave: () => { setHovered(false); setPressed(false); },
      onMouseDown: () => setPressed(true),
      onMouseUp: () => setPressed(false),
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    },
  };
}

/* --------------- ButtonIconObject (name optional) --------------- */
/**
 * Fields:
 *  - id?: string
 *  - name?: string                   // OPTIONAL; if omitted -> icon-only button
 *  - icon: IconObject                // REQUIRED
 *  - className?: string
 *  - active?: string
 *  - disabled?: boolean
 *  - title?: string
 *  - ariaLabel?: string              // falls back to name or "icon button"
 *  - tabIndex?: number
 *  - onClick? / onKeyDown? / onKeyUp? / onFocus? / onBlur? / onMouseEnter? / onMouseLeave?
 *      (each receives (event, self: ButtonIconObject))
 */
export class ButtonIconObject {
  constructor(p) {
    if (!p || !p.icon) throw new Error("ButtonIconObject requires `icon` (IconObject).");

    this.id = p.id ?? nextButtonIconId();
    this.name = p.name; // optional
    this.icon = p.icon instanceof IconObject ? p.icon : new IconObject(p.icon);

    this.className = p.className ?? "";
    this.active = p.active ?? "";
    this.disabled = !!p.disabled;
    this.title = p.title;
    this.ariaLabel = p.ariaLabel;
    this.tabIndex = p.tabIndex;

    // optional per-event callbacks
    this.onClick = p.onClick;
    this.onKeyDown = p.onKeyDown;
    this.onKeyUp = p.onKeyUp;
    this.onFocus = p.onFocus;
    this.onBlur = p.onBlur;
    this.onMouseEnter = p.onMouseEnter;
    this.onMouseLeave = p.onMouseLeave;
  }
}

/* --------------- AlloyButtonIcon --------------- */
/**
 * Props:
 *  - buttonIcon: ButtonIconObject (required)
 *  - output?: (self: ButtonIconObject, e?: any) => void   // fires on ALL events
 *
 * Ref:
 *   ref.current = { el, model, focus(), click() }
 */
export const AlloyButtonIcon = forwardRef(function AlloyButtonIcon({ buttonIcon, output }, ref) {
  if (!buttonIcon || !(buttonIcon instanceof ButtonIconObject)) {
    throw new Error("AlloyButtonIcon requires `buttonIcon` (ButtonIconObject instance).");
  }

  const elRef = useRef(null);
  const autoId = useRef(buttonIcon.id);
  const isDisabled = buttonIcon.disabled;

  const { className, events } = useActiveClass(buttonIcon.className, buttonIcon.active);

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

  // Emit output(self, event) first, then optional model handler
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

  const ariaLabel = buttonIcon.ariaLabel || buttonIcon.name || "icon button";

  return (
    <button
      id={autoId.current}
      ref={elRef}
      type="button"
      className={className}
      title={buttonIcon.title}
      aria-label={ariaLabel}
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
