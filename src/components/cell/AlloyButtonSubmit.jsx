// AlloyButtonSubmit.jsx
import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import AlloyIcon, { IconObject } from "./AlloyIcon.jsx";

/* id generator */
let __btnSubmitCounter = 0;
function nextSubmitId() {
  __btnSubmitCounter += 1;
  return `alloybtnsubmit${__btnSubmitCounter}`;
}

/**
 * REQUIRED:
 *  - name: string
 *  - icon: IconObject | { iconClass: string, ... }
 *
 * OPTIONAL:
 *  - id?: string
 *  - className?: string
 *  - disabled?: boolean
 *  - loading?: boolean
 *  - title?: string
 *  - ariaLabel?: string
 *  - tabIndex?: number
 *  - onClick? / onMouseDown? / onKeyDown?   (each receives (event, self))
 */
export class ButtonSubmitObject {
  constructor(p) {
    if (!p || !p.name) throw new Error("ButtonSubmitObject requires `name`.");
    if (!p.icon) throw new Error("ButtonSubmitObject requires `icon`.");

    this.id = p.id ?? nextSubmitId();
    this.name = p.name;
    this.icon = p.icon instanceof IconObject ? p.icon : new IconObject(p.icon);

    this.className = p.className ?? "";
    this.disabled = !!p.disabled;
    this.loading = !!p.loading;
    this.title = p.title;
    this.ariaLabel = p.ariaLabel;
    this.tabIndex = p.tabIndex;

    // optional (only these three are honored)
    this.onClick = p.onClick;
    this.onMouseDown = p.onMouseDown;
    this.onKeyDown = p.onKeyDown;
  }
}

/**
 * Props:
 *  - buttonSubmit: ButtonSubmitObject (required)
 *  - output?: (self: ButtonSubmitObject, e?: any) => void
 *
 * Behavior:
 *  - Triggered by mousedown / keydown(Enter|Space) / click
 *  - On trigger → loading=true, disabled=true, icon visible
 *  - While loading → disabled, icon visible
 *  - When loading=false → icon hidden, enabled again
 */
export const AlloyButtonSubmit = forwardRef(function AlloyButtonSubmit({ buttonSubmit, output }, ref) {
  if (!buttonSubmit || !(buttonSubmit instanceof ButtonSubmitObject)) {
    throw new Error("AlloyButtonSubmit requires `buttonSubmit` (ButtonSubmitObject instance).");
  }

  const elRef = useRef(null);
  const autoId = useRef(buttonSubmit.id);

  const [loading, setLoading] = useState(!!buttonSubmit.loading);

  useEffect(() => {
    setLoading(!!buttonSubmit.loading);
  }, [buttonSubmit.loading]);

  const isDisabled = buttonSubmit.disabled || loading;

  useImperativeHandle(
    ref,
    () => ({
      el: elRef.current,
      model: buttonSubmit,
      focus: () => elRef.current?.focus(),
      click: () => elRef.current?.click(),
    }),
    [buttonSubmit]
  );

  const firedRef = useRef(false);
  useEffect(() => {
    if (!loading) firedRef.current = false;
  }, [loading]);

  const arm = () => {
    if (firedRef.current || isDisabled) return false;
    firedRef.current = true;

    // Update model + internal
    buttonSubmit.loading = true;
    buttonSubmit.disabled = true;
    setLoading(true);

    return true;
  };

  const emit = (e, handler) => {
    output?.(buttonSubmit, e);
    handler?.(e, buttonSubmit);
  };

  const handleClick = (e) => {
    if (arm()) emit(e, buttonSubmit.onClick);
  };

  const handleMouseDown = (e) => {
    if (arm()) emit(e, buttonSubmit.onMouseDown);
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === "Enter" || key === " ") {
      if (arm()) emit(e, buttonSubmit.onKeyDown);
    }
  };

  const showIcon = loading;

  return (
    <button
      id={autoId.current}
      ref={elRef}
      type="submit"
      className={buttonSubmit.className}
      title={buttonSubmit.title}
      aria-label={buttonSubmit.ariaLabel || buttonSubmit.name}
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      disabled={isDisabled}
      tabIndex={buttonSubmit.tabIndex}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
    >
      {showIcon && (
        <span className="d-inline-flex align-middle">
          <AlloyIcon icon={buttonSubmit.icon} />
        </span>
      )}
      <span className={showIcon ? "px-2 align-middle" : "align-middle"}>
        {buttonSubmit.name}
      </span>

      {loading ? (
        <span className="ms-2 visually-hidden" aria-live="polite">
          Loading…
        </span>
      ) : null}
    </button>
  );
});

export default AlloyButtonSubmit;
