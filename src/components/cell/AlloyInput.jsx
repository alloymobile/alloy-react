import React, { useState, useEffect } from "react";
import AlloyIcon, { IconObject } from "./AlloyIcon.jsx";
import { generateId, OutputObject } from "../../utils/idHelper.js";

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
      className,
      options = [],
      validators = [],
      ...rest
    } = config;

    if (!name) {
      throw new Error("InputObject requires `name`.");
    }

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

    // validation config
    this.required = !!required;
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.min = min;
    this.max = max;
    this.pattern = pattern;
    this.matchWith = matchWith;
    this.passwordStrength = passwordStrength;

    // control classes
    if (typeof className === "string" && className.trim() !== "") {
      this.className = className.trim();
    } else {
      if (type === "select") {
        this.className = "form-select";
      } else if (type === "radio" || type === "checkbox") {
        this.className = "form-check-input";
      } else {
        this.className = "form-control";
      }
    }

    this.options = options;
    this.validators = validators;

    Object.assign(this, rest);
  }
}

/**
 * AlloyInput
 *
 * Props:
 *   - input: InputObject (required)
 *   - output?: (out: OutputObject) => void
 */
export function AlloyInput({ input, output }) {
  const [val, setVal] = useState(input.value);
  const [touched, setTouched] = useState(false);

  // Resync when validation / value props change
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

    // minLength / maxLength
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

    // pattern
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
      const strongEnough = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(
        trimmed
      );
      if (!strongEnough) {
        errs.push("Password is too weak.");
      }
    }

    // (matchWith & custom validators can be wired later)

    return errs;
  };

  const currentErrors = validate(val);
  const showError = touched && currentErrors.length > 0;

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

  // Emit via OutputObject (used by demo AND AlloyForm)
  const emit = (nextVal, action = "change") => {
    const errs = validate(nextVal);
    const hasError = errs.length > 0;

    if (typeof output === "function") {
      const out = new OutputObject({
        id: input.id,
        type: "input",
        action,
        error: hasError,
        data: {
          name: input.name,
          value: nextVal,
          errors: errs
        }
      });
      output(out);
    }
  };

  // shared change handler
  const handleChange = (e) => {
    const v = e.target.value;

    if (input.type === "checkbox") {
      const prev = Array.isArray(val) ? [...val] : [];
      const idx = prev.indexOf(v);
      if (idx > -1) {
        prev.splice(idx, 1);
      } else {
        prev.push(v);
      }
      setVal(prev);
      emit(prev, "change");
    } else if (input.type === "radio") {
      setVal(v);
      emit(v, "change");
    } else {
      setVal(v);
      emit(v, "change");
    }
  };

  // onBlur: mark field as touched AND emit a "blur" action
  const handleBlur = () => {
    setTouched(true);
    emit(val, "blur");
  };

  const commonControlProps = {
    id: input.id,
    name: input.name,
    placeholder: input.placeholder,
    onBlur: handleBlur,
    "aria-invalid": showError || undefined
  };

  const withInvalid = (base) =>
    base + (showError ? " is-invalid" : "");

  /* ---------------- RENDERERS ---------------- */

  const renderTextarea = () => (
    <textarea
      {...commonControlProps}
      value={val}
      onChange={handleChange}
      className={withInvalid(input.className)}
    />
  );

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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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

  const renderTextLike = () => (
    <input
      {...commonControlProps}
      type={input.type}
      value={val}
      onChange={handleChange}
      className={withInvalid(input.className)}
    />
  );

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
        {!(input.type === "radio" || input.type === "checkbox") &&
          errorBlock}
      </div>
    );
  }

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

        {!(input.type === "radio" || input.type === "checkbox") &&
          errorBlock}
      </div>
    );
  }

  // layout: "text" (default)
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

      {!(input.type === "radio" || input.type === "checkbox") &&
        errorBlock}
    </div>
  );
}

export default AlloyInput;
