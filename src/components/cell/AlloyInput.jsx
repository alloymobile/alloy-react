// AlloyInput.jsx
import React, { useState, useEffect } from "react";
import AlloyIcon, { IconObject } from "./AlloyIcon.jsx";
import { generateId } from "../../utils/idHelper.js";

/**
 * @typedef {Object} InputOption
 * @property {string} value   - submitted value
 * @property {string} label   - visible label
 */

/**
 * @typedef {Object} InputConfig
 *
 * @property {string} name                   - REQUIRED. Field name / group name.
 * @property {string} [id]                   - Optional. DOM id. Auto-generated if missing.
 *
 * @property {string} [type]                 - Input type.
 *                                            Supported:
 *                                              "text" (default),
 *                                              "email",
 *                                              "password",
 *                                              "number",
 *                                              "date",
 *                                              "textarea",
 *                                              "select",
 *                                              "radio",
 *                                              "checkbox"
 *
 * @property {string} [label]                - Human label for the field or group
 * @property {string|string[]} [value]       - Initial value.
 *                                            For checkbox group: an array of checked values.
 *                                            Defaults to "" (or [] for checkbox).
 *
 * @property {string} [layout]               - Visual layout style:
 *                                              "text" (default),
 *                                              "icon" (icon adornment on the left),
 *                                              "floating" (Bootstrap floating label).
 *                                            If "icon" or "floating", an icon is required.
 *
 * @property {IconObject|{iconClass:string}} [icon]
 *                                            For "icon" or "floating" layout.
 *
 * @property {string} [placeholder]          - Placeholder text
 *
 * @property {boolean} [required]            - Mark as required. Default false.
 * @property {number}  [minLength]           - Minimum string length
 * @property {number}  [maxLength]           - Maximum string length
 * @property {number|string} [min]           - Minimum numeric/date
 * @property {number|string} [max]           - Maximum numeric/date
 * @property {string} [pattern]              - Regex pattern string (ex: "^[0-9]+$")
 *
 * @property {boolean} [passwordStrength]    - simple strong password rule:
 *                                            >=8 chars, upper+lower+digit.
 *
 * @property {string} [matchWith]            - (reserved for future cross-field validation)
 *
 * @property {string} [className]            - CSS classes to apply to the actual
 *                                            input/select/textarea control(s).
 *                                            Default:
 *                                              - "form-control" for most text-ish things
 *                                              - "form-select" for selects
 *                                              - "form-check-input" for radios/checkboxes
 *                                            We'll still append " is-invalid" if needed.
 *
 * @property {InputOption[]} [options]       - For select, radio, checkbox group.
 * @property {Array<Function>} [validators]  - (reserved for custom validators)
 *
 * @property {any} [rest]                    - Any other props the user wants to stash.
 */
export class InputObject {
  /**
   * @param {InputConfig} config
   */
  constructor(config = {}) {
    const {
      id,
      name,
      type = "text",
      label = "",
      value,
      layout = "text",
      icon,
      placeholder = "",
      required = false,
      minLength,
      maxLength,
      min,
      max,
      pattern,
      matchWith,
      passwordStrength,
      className, // NEW
      options = [],
      validators = [],
      ...rest
    } = config;

    if (!name) {
      throw new Error("InputObject requires `name`.");
    }

    // If layout needs an icon, enforce icon presence
    if ((layout === "icon" || layout === "floating") && !icon) {
      throw new Error(
        "InputObject with layout='icon' or 'floating' requires `icon`."
      );
    }

    // default starting value:
    // - checkbox group => []
    // - everything else => ""
    let initialValue;
    if (typeof value !== "undefined") {
      initialValue = value;
    } else if (type === "checkbox") {
      initialValue = [];
    } else {
      initialValue = "";
    }

    // normalize icon into IconObject if provided
    const normalizedIcon =
      icon instanceof IconObject
        ? icon
        : icon
        ? new IconObject(icon)
        : undefined;

    this.id = id ?? generateId("input");
    this.name = name;
    this.type = type;
    this.label = label;
    this.value = initialValue;
    this.layout = layout;
    this.icon = normalizedIcon;
    this.placeholder = placeholder;

    // validation-ish config
    this.required = !!required;
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.min = min;
    this.max = max;
    this.pattern = pattern;
    this.matchWith = matchWith;
    this.passwordStrength = passwordStrength;

    // classes for the control itself
    // we do NOT include "is-invalid" here; the renderer appends that at runtime
    if (typeof className === "string" && className.trim() !== "") {
      this.className = className.trim();
    } else {
      // pick sensible bootstrap default per type
      if (type === "select") {
        this.className = "form-select";
      } else if (type === "radio" || type === "checkbox") {
        this.className = "form-check-input";
      } else {
        // text, textarea, password, number, date, etc.
        this.className = "form-control";
      }
    }

    this.options = options;
    this.validators = validators;

    // stash any additional props
    Object.assign(this, rest);
  }
}

/**
 * AlloyInput
 *
 * Renders based on a single InputObject.
 *
 * Props:
 *   - input: InputObject (required)
 *   - output?: (payload: {
 *        id: string,
 *        name: string,
 *        value: any,
 *        valid: boolean,
 *        error: boolean,
 *        errors: string[]
 *     }) => void
 *
 * Behavior:
 *   - Tracks local state `val`
 *   - On every change, runs validation and calls `output`
 *   - Shows inline error messages after the field has been blurred once
 *   - Supports:
 *        text-ish inputs,
 *        textarea,
 *        select,
 *        radio group,
 *        checkbox group,
 *        layout=icon,
 *        layout=floating
 *
 * Reactivity:
 *   - If parent changes validation rules (required, minLength, etc.) OR
 *     default value, we resync local state via useEffect instead of forcing
 *     a remount.
 *
 * Accessibility:
 *   - Adds aria-invalid on inputs with error after blur
 *   - Adds aria-live="polite" to the error block
 */
export function AlloyInput({ input, output }) {
  const [val, setVal] = useState(input.value);
  const [touched, setTouched] = useState(false);

  // whenever validation-relevant props or default value change,
  // reset local state and clear touched/errors
  useEffect(() => {
    setVal(input.value);
    setTouched(false);
  }, [
    input.value,
    input.required,
    input.minLength,
    input.maxLength,
    input.min,
    input.max,
    input.pattern,
    input.passwordStrength,
    input.matchWith,
    input.type,
    input.layout,
    input.options
  ]);

  // ----- Validation -----
  const validate = (candidate) => {
    const errs = [];
    const trimmed =
      typeof candidate === "string" ? candidate.trim() : candidate;

    // required
    if (input.required) {
      const isEmptyArray =
        Array.isArray(trimmed) && trimmed.length === 0;
      const isEmptyScalar =
        !Array.isArray(trimmed) &&
        (trimmed === "" || trimmed === false || trimmed == null);

      if (isEmptyArray || isEmptyScalar) {
        errs.push("This field is required.");
      }
    }

    // length rules (strings only)
    if (
      typeof trimmed === "string" &&
      input.minLength != null &&
      trimmed.length < input.minLength
    ) {
      errs.push(`Minimum length is ${input.minLength}`);
    }
    if (
      typeof trimmed === "string" &&
      input.maxLength != null &&
      trimmed.length > input.maxLength
    ) {
      errs.push(`Maximum length is ${input.maxLength}`);
    }

    // pattern (regex)
    if (
      typeof trimmed === "string" &&
      input.pattern &&
      input.pattern !== ""
    ) {
      const re = new RegExp(input.pattern);
      if (!re.test(trimmed)) {
        errs.push("Invalid format.");
      }
    }

    // password strength
    if (input.passwordStrength && typeof trimmed === "string") {
      // >=8 chars, 1 lower, 1 upper, 1 digit
      const strongEnough = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(
        trimmed
      );
      if (!strongEnough) {
        errs.push("Password is too weak.");
      }
    }

    // NOTE:
    // - matchWith isn't enforced here (needs cross-field context)
    // - validators[] is not invoked here yet (extensibility hook)

    return errs;
  };

  const currentErrors = validate(val);
  const showError = touched && currentErrors.length > 0;

  // inline error block under the control
  const errorBlock =
    showError &&
    currentErrors.length > 0 && (
      <div className="mt-2" aria-live="polite">
        {currentErrors.map((msg, i) => (
          <div
            key={i}
            className="alert alert-danger py-2 mb-2"
            role="alert"
          >
            {msg}
          </div>
        ))}
      </div>
    );

  // Tell parent about changes
  const emit = (nextVal) => {
    const errs = validate(nextVal);
    output?.({
      id: input.id,
      name: input.name,
      value: nextVal,
      valid: errs.length === 0,
      error: errs.length > 0,
      errors: errs
    });
  };

  // shared onChange for most controls
  const handleChange = (e) => {
    const v = e.target.value;

    if (input.type === "checkbox") {
      // checkbox group → toggle array membership
      const prev = Array.isArray(val) ? [...val] : [];
      const idx = prev.indexOf(v);
      if (idx > -1) {
        prev.splice(idx, 1);
      } else {
        prev.push(v);
      }
      setVal(prev);
      emit(prev);
    } else if (input.type === "radio") {
      setVal(v);
      emit(v);
    } else {
      // text-ish, select, textarea, etc.
      setVal(v);
      emit(v);
    }
  };

  // common props for single "control" element
  const commonControlProps = {
    id: input.id,
    name: input.name,
    placeholder: input.placeholder,
    onBlur: () => setTouched(true),
    "aria-invalid": showError || undefined
  };

  // utility: builds className with " is-invalid" when needed
  const withInvalid = (base) =>
    base + (showError ? " is-invalid" : "");

  /* ---------------- RENDERERS ---------------- */

  // textarea
  const renderTextarea = () => (
    <textarea
      {...commonControlProps}
      value={val}
      onChange={handleChange}
      className={withInvalid(input.className)}
    />
  );

  // select dropdown
  const renderSelect = () => (
    <select
      {...commonControlProps}
      value={val}
      onChange={handleChange}
      className={withInvalid(input.className)}
    >
      {input.options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );

  // radio group
  const renderRadioGroup = () => (
    <div>
      {input.label && (
        <label className="form-label d-block mb-2">{input.label}</label>
      )}
      {input.options.map((o, i) => (
        <div className="form-check" key={i}>
          <input
            type="radio"
            id={`${input.id}_${i}`}
            className={withInvalid(input.className)}
            name={input.name}
            value={o.value}
            checked={val === o.value}
            onChange={handleChange}
            onBlur={() => setTouched(true)}
            aria-invalid={showError || undefined}
          />
          <label
            className="form-check-label"
            htmlFor={`${input.id}_${i}`}
          >
            {o.label}
          </label>
        </div>
      ))}
      {errorBlock}
    </div>
  );

  // checkbox group
  const renderCheckboxGroup = () => (
    <div>
      {input.label && (
        <label className="form-label d-block mb-2">{input.label}</label>
      )}
      {input.options.map((o, i) => (
        <div className="form-check" key={i}>
          <input
            type="checkbox"
            id={`${input.id}_${i}`}
            className={withInvalid(input.className)}
            name={input.name}
            value={o.value}
            checked={Array.isArray(val) && val.includes(o.value)}
            onChange={handleChange}
            onBlur={() => setTouched(true)}
            aria-invalid={showError || undefined}
          />
          <label
            className="form-check-label"
            htmlFor={`${input.id}_${i}`}
          >
            {o.label}
          </label>
        </div>
      ))}
      {errorBlock}
    </div>
  );

  // default text-ish input (text, email, password, number, date, etc.)
  const renderTextLike = () => (
    <input
      {...commonControlProps}
      type={input.type}
      value={val}
      onChange={handleChange}
      className={withInvalid(input.className)}
    />
  );

  // pick correct control renderer
  const renderControl = () => {
    switch (input.type) {
      case "textarea":
        return renderTextarea();
      case "select":
        return renderSelect();
      case "radio":
        return renderRadioGroup();
      case "checkbox":
        return renderCheckboxGroup();
      default:
        return renderTextLike();
    }
  };

  /* ---------------- LAYOUT VARIANTS ---------------- */

  // layout: "floating"
  if (input.layout === "floating") {
    return (
      <div className="mb-3">
        <div className="form-floating">
          {renderControl()}
          <label htmlFor={input.id}>
            {input.icon && <AlloyIcon icon={input.icon} />}
            {input.icon && "\u00A0"}
            {input.label}
          </label>
        </div>
        {/* error should appear below for floating */}
        {!(input.type === "radio" || input.type === "checkbox") &&
          errorBlock}
      </div>
    );
  }

  // layout: "icon" (input-group with left icon)
  if (input.layout === "icon") {
    return (
      <div className="mb-3">
        {input.label && (
          <label htmlFor={input.id} className="form-label">
            {input.label}
          </label>
        )}

        <div className="input-group">
          <span className="input-group-text">
            <AlloyIcon icon={input.icon} />
          </span>

          {/* we only want to override the control's className inside
             * input-group for non-group types; for radios/checkboxes,
             * we already render groups differently.
             */}
          {["radio", "checkbox"].includes(input.type) ? (
            renderControl()
          ) : (
            <input
              {...commonControlProps}
              type={input.type}
              value={val}
              onChange={handleChange}
              className={withInvalid(input.className)}
            />
          )}
        </div>

        {/* radio/checkbox already append errorBlock internally */}
        {!(input.type === "radio" || input.type === "checkbox") &&
          errorBlock}
      </div>
    );
  }

  // layout: default "text"
  return (
    <div className="mb-3">
      {["text", "textarea", "number", "email", "password", "date"].includes(
        input.type
      ) &&
        input.label && (
          <label htmlFor={input.id} className="form-label">
            {input.label}
          </label>
        )}

      {renderControl()}

      {/* radio/checkbox already handled errorBlock */}
      {!(input.type === "radio" || input.type === "checkbox") &&
        errorBlock}
    </div>
  );
}

export default AlloyInput;
