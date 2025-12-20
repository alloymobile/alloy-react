// src/components/cell/AlloyButtonSubmit.jsx
import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

import AlloyIcon, { IconObject } from "./AlloyIcon.jsx";
import { OutputObject, useDomId } from "../../utils/idHelper.js";

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

/**
 * @typedef {Object} ButtonSubmitConfig
 * @property {string} name
 * @property {IconObject|{iconClass:string, id?:string, className?:string}} icon
 * @property {string} [id]
 * @property {string} [className]
 * @property {string} [active]
 * @property {boolean} [disabled]
 * @property {boolean} [loading]
 * @property {string} [title]
 * @property {string} [ariaLabel]
 * @property {number} [tabIndex]
 * @property {(e:any,self:ButtonSubmitObject)=>void} [onClick]
 */
export class ButtonSubmitObject {
  constructor(buttonSubmit = {}) {
    if (!buttonSubmit.name) throw new Error("ButtonSubmitObject requires `name`.");
    if (!buttonSubmit.icon) throw new Error("ButtonSubmitObject requires `icon`.");

    // IMPORTANT (Next.js safe): do not generate random ids in the model
    this.id = buttonSubmit.id;

    this.name = buttonSubmit.name;

    this.className = buttonSubmit.className ?? "btn btn-primary";
    this.active = buttonSubmit.active ?? "";

    this.disabled = !!buttonSubmit.disabled;
    this.loading = !!buttonSubmit.loading;

    this.title = buttonSubmit.title ?? buttonSubmit.name;
    this.ariaLabel = buttonSubmit.ariaLabel ?? buttonSubmit.name;
    this.tabIndex = buttonSubmit.tabIndex;

    this.icon =
      buttonSubmit.icon instanceof IconObject
        ? buttonSubmit.icon
        : new IconObject(buttonSubmit.icon);

    this.onClick = buttonSubmit.onClick;
  }
}

/* -------------------------------------------
 * AlloyButtonSubmit
 *
 * Behavior (your use case):
 * - When user clicks, component "arms" immediately:
 *    - shows rotating/loading icon
 *    - disables to prevent double submit
 * - Parent controls reset by toggling model.loading:
 *    - when parent sets loading=false, component clears armed and becomes reusable
 *
 * Emits:
 * - ONLY "click" (clean, consistent with AlloyButton decision)
 * ----------------------------------------- */
export const AlloyButtonSubmit = forwardRef(function AlloyButtonSubmit(
  { buttonSubmit, output },
  ref
) {
  if (!buttonSubmit || !(buttonSubmit instanceof ButtonSubmitObject)) {
    throw new Error(
      "AlloyButtonSubmit requires `buttonSubmit` (ButtonSubmitObject instance)."
    );
  }

  const elRef = useRef(null);

  // SSR/CSR stable id (or provided id)
  const domId = useDomId("btn-submit", buttonSubmit.id);

  // Internal arm: flips ON immediately on click (before parent roundtrip)
  const [armed, setArmed] = useState(false);

  // Parent-driven loading flag
  const externalLoading = !!buttonSubmit.loading;

  // Effective loading is internal OR external
  const loading = armed || externalLoading;

  // When parent says loading=false, release the arm so it can be used again
  useEffect(() => {
    if (!externalLoading) {
      setArmed(false);
    }
  }, [externalLoading]);

  // Disabled if parent disabled OR currently loading/armed
  const isDisabled = !!buttonSubmit.disabled || loading;

  const { className, events } = useActiveClass(
    buttonSubmit.className,
    buttonSubmit.active
  );

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

  // Compute a spinning icon class while loading (without mutating the model)
  const computedIcon = useMemo(() => {
    const base = buttonSubmit.icon;
    const iconClass = base?.iconClass || "";

    // Add fa-spin only while loading (if user didn't already include it)
    const shouldSpin =
      loading && iconClass && !/\bfa-spin\b/.test(iconClass) && !/\bfa-pulse\b/.test(iconClass);

    const nextClass = shouldSpin ? `${iconClass} fa-spin` : iconClass;

    return new IconObject({
      id: base?.id,
      iconClass: nextClass,
      className: base?.className, // wrapper styling supported by AlloyIcon now
    });
  }, [buttonSubmit.icon, loading]);

  const handleClick = (e) => {
    // If already disabled/loading, do nothing (prevents double submit)
    if (isDisabled) return;

    // Arm immediately so the UI reacts instantly
    setArmed(true);

    // Emit "click" only
    if (typeof output === "function") {
      output(
        OutputObject.ok({
          id: domId,
          type: "button-submit",
          action: "click",
          data: {
            name: buttonSubmit.name,
          },
        })
      );
    }

    buttonSubmit.onClick?.(e, buttonSubmit);
  };

  return (
    <button
      id={domId}
      ref={elRef}
      type="submit"
      className={className}
      title={buttonSubmit.title}
      aria-label={buttonSubmit.ariaLabel}
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      disabled={isDisabled}
      tabIndex={buttonSubmit.tabIndex}
      onClick={handleClick}
      {...events}
    >
      {/* Icon is ONLY visible while communicating/loading (your requirement) */}
      {loading && (
        <span className="d-inline-flex align-middle">
          <AlloyIcon icon={computedIcon} />
        </span>
      )}

      <span className={loading ? "px-2 align-middle" : "align-middle"}>
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
