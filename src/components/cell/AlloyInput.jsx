import React, { useState } from "react";
import { AlloyIcon, IconObject } from "./AlloyIcon";

/** Auto-incrementing ID for input fields */
let __inputCounter = 0;
function nextInputId() {
  __inputCounter += 1;
  return `alloyinput${__inputCounter}`;
}

export class InputObject {
  constructor(params) {
    const {
      id,
      name,
      type = "text",
      label = "",
      value = type === "checkbox" ? [] : "",
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
    } = params || {};

    if (!name) throw new Error("InputObject requires a 'name' field");
    if (["icon", "floating"].includes(layout) && !icon)
      throw new Error("Icon is required for icon and floating layouts");

    this.id = id ?? nextInputId();
    this.name = name;
    this.type = type;
    this.label = label;
    this.value = value;
    this.layout = layout;
    this.icon =
      icon instanceof IconObject
        ? icon
        : icon
        ? new IconObject(icon)
        : undefined;
    this.placeholder = placeholder;
    this.required = required;
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.min = min;
    this.max = max;
    this.pattern = pattern;
    this.matchWith = matchWith;
    this.passwordStrength = passwordStrength;
    this.options = options;
    this.validators = validators;
    Object.assign(this, rest);
  }
}

export function AlloyInput({ input, output }) {
  const [val, setVal] = useState(input.value);
  const [touched, setTouched] = useState(false);

  const validate = (v) => {
    const errs = [];
    const trimmed = typeof v === "string" ? v.trim() : v;

    // required
    if (input.required) {
      if (
        (Array.isArray(trimmed) && trimmed.length === 0) ||
        (!Array.isArray(trimmed) && (trimmed === "" || trimmed === false))
      ) {
        errs.push("This field is required.");
      }
    }

    // length rules
    if (
      input.minLength &&
      typeof trimmed === "string" &&
      trimmed.length < input.minLength
    ) {
      errs.push(`Minimum length is ${input.minLength}`);
    }
    if (
      input.maxLength &&
      typeof trimmed === "string" &&
      trimmed.length > input.maxLength
    ) {
      errs.push(`Maximum length is ${input.maxLength}`);
    }

    // pattern
    if (
      input.pattern &&
      typeof trimmed === "string" &&
      !new RegExp(input.pattern).test(trimmed)
    ) {
      errs.push("Invalid format.");
    }

    // password strength
    if (
      input.passwordStrength &&
      typeof trimmed === "string" &&
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(trimmed)
    ) {
      errs.push("Password is too weak.");
    }

    return errs;
  };

  const emit = (v) => {
    const errors = validate(v);
    output?.({
      id: input.id,
      name: input.name,
      value: v,
      valid: errors.length === 0,
      error: errors.length > 0,
      errors,
    });
  };

  const onBlur = () => setTouched(true);

  const showError = touched && validate(val).length > 0;
  const errorBlock =
    showError &&
    validate(val).length > 0 && (
      <div className="mt-2" aria-live="polite">
        {validate(val).map((msg, i) => (
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

  // Common props shared by text-like inputs, textarea, select, etc.
  const common = {
    id: input.id,
    name: input.name,
    placeholder: input.placeholder,
    onBlur,
    "aria-invalid": showError || undefined,
  };

  const handleChange = (e) => {
    const v = e.target.value;

    if (input.type === "checkbox") {
      // checkbox group → array of selected values
      const valueArr = Array.isArray(val) ? [...val] : [];
      const idx = valueArr.indexOf(v);
      if (idx > -1) {
        valueArr.splice(idx, 1);
      } else {
        valueArr.push(v);
      }
      setVal(valueArr);
      emit(valueArr);
    } else if (input.type === "radio") {
      setVal(v);
      emit(v);
    } else {
      setVal(v);
      emit(v);
    }
  };

  const renderInput = () => {
    // textarea
    if (input.type === "textarea") {
      return (
        <textarea
          {...common}
          value={val}
          onChange={handleChange} // <-- FIXED
          className={`form-control${
            showError ? " is-invalid" : ""
          }`}
        />
      );
    }

    // select dropdown
    if (input.type === "select") {
      return (
        <select
          {...common}
          value={val}
          onChange={handleChange}
          className={`form-select${
            showError ? " is-invalid" : ""
          }`}
        >
          {input.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    }

    // radio group
    if (input.type === "radio") {
      return (
        <div>
          <label className="form-label d-block mb-2">
            {input.label}
          </label>
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
    }

    // checkbox group
    if (input.type === "checkbox") {
      return (
        <div>
          <label className="form-label d-block mb-2">
            {input.label}
          </label>
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
    }

    // default text-ish input (text, email, password, number, date, etc.)
    return (
      <input
        {...common}
        type={input.type}
        value={val}
        onChange={handleChange}
        className={`form-control${
          showError ? " is-invalid" : ""
        }`}
      />
    );
  };

  // floating layout
  if (input.layout === "floating") {
    return (
      <div className="mb-3">
        <div className="form-floating">
          {renderInput()}
          <label htmlFor={input.id}>
            {input.icon && <AlloyIcon icon={input.icon} />}&nbsp;
            {input.label}
          </label>
        </div>
        {errorBlock}
      </div>
    );
  }

  // icon layout
  if (input.layout === "icon") {
    return (
      <div className="mb-3">
        <label htmlFor={input.id} className="form-label">
          {input.label}
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <AlloyIcon icon={input.icon} />
          </span>
          {renderInput()}
        </div>
        {errorBlock}
      </div>
    );
  }

  // default (layout === "text" etc.)
  return (
    <div className="mb-3">
      {["text", "textarea", "number", "email", "password", "date"].includes(
        input.type
      ) && (
        <label htmlFor={input.id} className="form-label">
          {input.label}
        </label>
      )}
      {renderInput()}
      {errorBlock}
    </div>
  );
}

export default AlloyInput;
