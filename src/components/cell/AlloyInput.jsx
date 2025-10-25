// AlloyInput.jsx
import React, { useState } from "react";
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
 *                                            Default:
 *                                              "" for most,
 *                                              [] for checkbox group.
 *
 * @property {string} [layout]               - Visual layout style:
 *                                              "text" (default),
 *                                              "icon" (icon adornment on the left),
 *                                              "floating" (Bootstrap floating label).
 *                                            If "icon" or "floating", an icon is required.
 *
 * @property {IconObject|{iconClass:string}} [icon]
 *                                          - For "icon" or "floating" layout.
 *                                            Either pass an IconObject instance or a
 *                                            plain config like { iconClass: "fa-solid fa-user" }.
 *
 * @property {string} [placeholder]          - Placeholder text (text-ish inputs / textarea / select)
 * @property {boolean} [required]            - Mark as required. Default false.
 *
 * @property {number} [minLength]            - Minimum string length
 * @property {number} [maxLength]            - Maximum string length
 * @property {number|string} [min]           - Minimum numeric/date (not enforced here yet)
 * @property {number|string} [max]           - Maximum numeric/date (not enforced here yet)
 * @property {string} [pattern]              - Regex pattern string (ex: "^[0-9]+$")
 *
 * @property {boolean} [passwordStrength]    - If true, enforce simple strong password rule:
 *                                            at least 8 chars, upper+lower+digit.
 *
 * @property {string} [matchWith]            - (Reserved for future cross-field validation)
 *
 * @property {InputOption[]} [options]       - For select, radio, checkbox group.
 * @property {Array<Function>} [validators]  - (Reserved for custom validators)
 *
 * @property {any} [rest]                    - Any other props the user wants to stash.
 */

/**
 * InputObject
 *
 * Creates a stable model describing one input field or group.
 * This mirrors the pattern of ButtonObject, LinkObject, etc:
 * - single config object in constructor
 * - normalize defaults
 * - generate id
 * - coerce icon into IconObject if provided
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

    this.id = id ?? generateId("input"); // consistent auto-id scheme
    this.name = name;
    this.type = type;
    this.label = label;
    this.value = initialValue;
    this.layout = layout;
    this.icon = normalizedIcon;
    this.placeholder = placeholder;
    this.required = !!required;
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.min = min;
    this.max = max;
    this.pattern = pattern;
    this.matchWith = matchWith;
    this.passwordStrength = passwordStrength;
    this.options = options;
    this.validators = validators;

    // anything else user passed in config, we keep
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
 * Accessibility:
 *   - Adds aria-invalid on inputs with error after blur
 *   - Adds aria-live="polite" to the error block
 */
export function AlloyInput({ input, output }) {
  // local value
  const [val, setVal] = useState(input.value);
  // whether the user interacted/blurred (to control when to show errors)
  const [touched, setTouched] = useState(false);

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
      // basic policy: >=8 chars, 1 lower, 1 upper, 1 digit
      const strongEnough = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(
        trimmed
      );
      if (!strongEnough) {
        errs.push("Password is too weak.");
      }
    }

    // NOTE:
    // - matchWith isn't enforced here (would require parent cross-field data)
    // - validators[] is not invoked here yet, but we kept it in the model so
    //   you can expand later

    return errs;
  };

  // Whether we're currently invalid AND we've blurred
  const currentErrors = validate(val);
  const showError = touched && currentErrors.length > 0;

  // inline error block
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

  // common props for all "single-control" elements
  const commonControlProps = {
    id: input.id,
    name: input.name,
    placeholder: input.placeholder,
    onBlur: () => setTouched(true),
    "aria-invalid": showError || undefined
  };

  // push update to parent whenever value changes
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

  // ---- onChange handler shared by many inputs ----
  const handleChange = (e) => {
    const v = e.target.value;

    if (input.type === "checkbox") {
      // checkbox group → maintain array of checked values
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

  // ---- individual renderers ----

  // textarea
  const renderTextarea = () => (
    <textarea
      {...commonControlProps}
      value={val}
      onChange={handleChange}
      className={`form-control${showError ? " is-invalid" : ""}`}
    />
  );

  // select dropdown
  const renderSelect = () => (
    <select
      {...commonControlProps}
      value={val}
      onChange={handleChange}
      className={`form-select${showError ? " is-invalid" : ""}`}
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
            className={`form-check-input${
              showError ? " is-invalid" : ""
            }`}
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
            className={`form-check-input${
              showError ? " is-invalid" : ""
            }`}
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
    </div>
  );

  // default text-ish input (text, email, password, number, date, etc.)
  const renderTextLike = () => (
    <input
      {...commonControlProps}
      type={input.type}
      value={val}
      onChange={handleChange}
      className={`form-control${showError ? " is-invalid" : ""}`}
    />
  );

  // Decide which control to render based on input.type
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

  // ---- Layout variants ----

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
        {errorBlock}
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
          {renderControl()}
        </div>
        {errorBlock}
      </div>
    );
  }

  // layout: default "text", etc.
  return (
    <div className="mb-3">
      {/* We only render a top label for certain types, same as your original logic */}
      {["text", "textarea", "number", "email", "password", "date"].includes(
        input.type
      ) &&
        input.label && (
          <label htmlFor={input.id} className="form-label">
            {input.label}
          </label>
        )}

      {renderControl()}
      {errorBlock}
    </div>
  );
}

export default AlloyInput;
