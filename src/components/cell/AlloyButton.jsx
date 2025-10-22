// AlloyButton.jsx
import React, {
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

/* -------------------- id generator -------------------- */
let __btnCounter = 0;
function nextButtonId() {
  __btnCounter += 1;
  return `alloyBtn${__btnCounter}`;
}

/* -------------------- hover/press/focus → class merge -------------------- */
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

/* -------------------- ButtonObject (only `name` required) -------------------- */
/**
 * Fields:
 *  - id?: string
 *  - name: string (required)
 *  - className?: string
 *  - active?: string        // class applied on hover/press/focus
 *  - disabled?: boolean
 *  - title?: string         // tooltip
 *  - ariaLabel?: string     // screen-reader label; defaults to `name`
 *  - tabIndex?: number
 *  - onClick? / onKeyDown? / onKeyUp? / onFocus? / onBlur? / onMouseEnter? / onMouseLeave?
 *      (each receives (event, self: ButtonObject))
 */
export class ButtonObject {
  constructor(p) {
    if (!p || !p.name) throw new Error("ButtonObject requires `name`.");
    this.id = p.id ?? nextButtonId();
    this.name = p.name;

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

/* -------------------- AlloyButton (object-only input + separate output prop) -------------------- */
/**
 * Props:
 *  - button: ButtonObject (required)
 *  - output?: (self: ButtonObject, e?: any) => void   // fires on ALL events
 *
 * Ref exposes:
 *   ref.current = {
 *     el,        // underlying <button> element
 *     model,     // the same ButtonObject instance you passed
 *     focus(),   // focus the button
 *     click(),   // click the button
 *   }
 */
export const AlloyButton = forwardRef(function AlloyButton({ button, output }, ref) {
  if (!button || !(button instanceof ButtonObject)) {
    throw new Error("AlloyButton requires `button` (ButtonObject instance).");
  }

  const elRef = useRef(null);
  const autoId = useRef(button.id);
  const isDisabled = button.disabled;

  const { className, events } = useActiveClass(button.className, button.active);

  // Expose DOM + model + helpers via ref
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

  // helper: fire output(self, event) first, then specific handler(self, event)
  const emitThen = (handler, alsoCallInternal) => (e) => {
    alsoCallInternal?.(e);      // keep internal hover/focus state
    output?.(button, e);        // Angular-style, for ALL events
    handler?.(e, button);       // optional per-event model handler
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
      aria-label={button.ariaLabel || button.name}
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
