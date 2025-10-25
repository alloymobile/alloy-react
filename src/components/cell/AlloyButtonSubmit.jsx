import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import AlloyIcon, { IconObject } from "./AlloyIcon.jsx";
import { generateId } from "../../utils/idHelper.js";

/**
 * @typedef {Object} ButtonSubmitConfig
 * @property {string} name
 * @property {IconObject|{iconClass:string}} icon
 * @property {string} [id]
 * @property {string} [className]
 * @property {boolean} [disabled]
 * @property {boolean} [loading]
 * @property {string} [title]
 * @property {string} [ariaLabel]
 * @property {number} [tabIndex]
 * @property {(e:any,self:ButtonSubmitObject)=>void} [onClick]
 * @property {(e:any,self:ButtonSubmitObject)=>void} [onMouseDown]
 * @property {(e:any,self:ButtonSubmitObject)=>void} [onKeyDown]
 */
export class ButtonSubmitObject {
  /**
   * @param {ButtonSubmitConfig} buttonSubmit
   */
  constructor(buttonSubmit = {}) {
    if (!buttonSubmit.name) {
      throw new Error("ButtonSubmitObject requires `name`.");
    }
    if (!buttonSubmit.icon) {
      throw new Error("ButtonSubmitObject requires `icon`.");
    }

    const normalizedIcon =
      buttonSubmit.icon instanceof IconObject
        ? buttonSubmit.icon
        : new IconObject(buttonSubmit.icon);

    this.id = buttonSubmit.id ?? generateId("btn-submit");
    this.name = buttonSubmit.name;
    this.icon = normalizedIcon;

    this.className = buttonSubmit.className ?? "";
    this.disabled = !!buttonSubmit.disabled;
    this.loading = !!buttonSubmit.loading;

    this.title = buttonSubmit.title ?? buttonSubmit.name;
    this.ariaLabel = buttonSubmit.ariaLabel ?? buttonSubmit.name;
    this.tabIndex = buttonSubmit.tabIndex;

    this.onClick = buttonSubmit.onClick;
    this.onMouseDown = buttonSubmit.onMouseDown;
    this.onKeyDown = buttonSubmit.onKeyDown;
  }
}

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
  const autoId = useRef(buttonSubmit.id);

  // internal loading mirror, always synced from props
  const [loading, setLoading] = useState(!!buttonSubmit.loading);

  // firedRef prevents double-trigger while "in flight"
  const firedRef = useRef(false);

  // Sync internal loading with parent model every render when prop changes.
  // ALSO: if parent sends loading=false, clear firedRef so the button is reusable.
  useEffect(() => {
    const nextLoading = !!buttonSubmit.loading;
    setLoading(nextLoading);
    if (!nextLoading) {
      firedRef.current = false;
    }
  }, [buttonSubmit.loading]);

  // compute disabled for the rendered <button>
  const isDisabled = buttonSubmit.disabled || loading;

  // Expose ref API
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

  // arm() tries to move us into "loading". It returns true if we armed.
  // This DOES mutate the model instance so output() sees loading:true,
  // but actual rendering will still ultimately follow parent props.
  // Parent is expected to flip loading:false later.
  const arm = () => {
    if (firedRef.current || isDisabled) return false;

    firedRef.current = true;

    // reflect "in-flight" on the current model snapshot
    buttonSubmit.loading = true;
    buttonSubmit.disabled = true;

    // update our local mirror right away so UI shows spinner instantly,
    // without waiting for parent to re-render with updated props.
    setLoading(true);

    return true;
  };

  // emit helper: fire parent output and model handler
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

  // spinner shows while loading === true (either internal arm() OR parent prop)
  const showIcon = loading;

  return (
    <button
      id={autoId.current}
      ref={elRef}
      type="submit"
      className={buttonSubmit.className}
      title={buttonSubmit.title}
      aria-label={buttonSubmit.ariaLabel}
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
