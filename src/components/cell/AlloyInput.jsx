// AlloyInput.jsx
import React, { useEffect, useRef, useState } from "react";
import AlloyIcon, { IconObject } from "./AlloyIcon.jsx";
import { useDomId, OutputObject } from "../../utils/idHelper.js";

/**
 * @typedef {Object} InputOption
 * @property {string} value   - submitted value
 * @property {string} label   - visible label
 */

/**
 * @typedef {Object} InputConfig
 *
 * @property {string} name                   - REQUIRED. Field name / group name.
 * @property {string} [id]                   - Optional DOM id. (SSR-safe id is generated in the component if omitted.)
 *
 * @property {string} [type]                 - Supported:
 *                                              "text" (default),
 *                                              "email",
 *                                              "password",
 *                                              "number",
 *                                              "date",
 *                                              "textarea",
 *                                              "select",
 *                                              "radio",
 *                                              "checkbox",
 *                                              "file",
 *                                              "canvas"
 *
 * @property {string} [label]                - Human label for the field or group
 * @property {string|string[]|File|File[]} [value]
 *                                            - checkbox group: string[]
 *                                            - file (single): File | string(url)
 *                                            - file (multi):  File[] | string[](urls)
 *                                            - canvas: DataURL string
 *
 * @property {string} [layout]               - "text"(default) | "icon" | "floating"
 * @property {IconObject|{iconClass:string}} [icon] - required for "icon" or "floating"
 *
 * @property {string} [placeholder]
 *
 * @property {boolean} [required]
 * @property {number}  [minLength]
 * @property {number}  [maxLength]
 * @property {number|string} [min]
 * @property {number|string} [max]
 * @property {string} [pattern]
 *
 * @property {boolean} [passwordStrength]
 * @property {string} [matchWith]
 *
 * @property {string} [className]
 * @property {InputOption[]} [options]
 * @property {Array<Function>} [validators]
 *
 * @property {string} [iconGroupClass]       - extra classes for icon span in "icon" layout
 *
 * @property {string} [accept]               - file accept attribute
 * @property {boolean} [multiple]            - file: allow multiple files
 *
 * @property {boolean} [disabled]            - disables input; for canvas: disables drawing
 *
 * @property {number} [width]                - canvas width (default 420)
 * @property {number} [height]               - canvas height (default 180)
 * @property {number} [canvasStrokeWidth]    - canvas stroke width (default 2)
 *
 * @property {any} [rest]
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
      iconGroupClass,
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
      icon instanceof IconObject ? icon : icon ? new IconObject(icon) : undefined;

    // NOTE: Do NOT auto-generate IDs here (SSR/CSR mismatch risk in Next.js).
    // If id is omitted, AlloyInput will generate a stable DOM id via useDomId().
    this.id = id;
    this.name = name;
    this.type = type;
    this.label = label;
    this.value = initialValue;
    this.layout = layout;
    this.icon = normalizedIcon;
    this.placeholder = placeholder;

    // icon group class (span around icon in "icon" layout)
    const baseIconGroupClass = "input-group-text";
    if (typeof iconGroupClass === "string" && iconGroupClass.trim() !== "") {
      this.iconGroupClass = baseIconGroupClass + " " + iconGroupClass.trim();
    } else {
      this.iconGroupClass = baseIconGroupClass;
    }

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
/**
 * @typedef {Object} AlloyInputProps
 * @property {InputObject} input
 * @property {(out: any) => void | Promise<void>} [output]
 */
/**
 * @param {AlloyInputProps} props
 */
export function AlloyInput({ input, output }) {
  // SSR/CSR-stable DOM id (React useId-based)
  const domId = useDomId("input", input.id);

  const [val, setVal] = useState(input.value);
  const [touched, setTouched] = useState(false);

  // Canvas refs/state
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });
  const hasDrawnRef = useRef(false); // required correctness for canvas

  const canvasWidth = input.width ?? 420;
  const canvasHeight = input.height ?? 180;
  const strokeWidth = input.canvasStrokeWidth ?? 2;
  const disabled = !!input.disabled;

  /* ---------------- CANVAS HELPERS ---------------- */

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = "#000";
  };

  const getCanvasDataUrl = () => {
    const canvas = canvasRef.current;
    if (!canvas) return "";
    return canvas.toDataURL("image/png");
  };

  const getPoint = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if (e.touches && e.touches[0]) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const drawLine = (from, to) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  };

  const onCanvasStart = (e) => {
    if (disabled) return;
    if (e.preventDefault) e.preventDefault();

    drawingRef.current = true;
    const p = getPoint(e);
    lastPointRef.current = p;

    // tap counts as drawn (dot)
    hasDrawnRef.current = true;
    drawLine(p, p);
  };

  const onCanvasMove = (e) => {
    if (disabled) return;
    if (!drawingRef.current) return;
    if (e.preventDefault) e.preventDefault();

    hasDrawnRef.current = true;
    const p = getPoint(e);
    drawLine(lastPointRef.current, p);
    lastPointRef.current = p;
  };

  const onCanvasEnd = () => {
    if (disabled) return;
    if (!drawingRef.current) return;

    drawingRef.current = false;

    // if user never drew, store "" so required works
    const next = hasDrawnRef.current ? getCanvasDataUrl() : "";
    setVal(next);
    emit(next, "change");
  };

  const clearCanvas = () => {
    initCanvas();
    hasDrawnRef.current = false;
    setVal("");
    emit("", "change");
  };

  // Resync when value/validation config changes
  useEffect(() => {
    setVal(input.value);
    setTouched(false);

    if (input.type === "canvas") {
      hasDrawnRef.current = Boolean(input.value);
      requestAnimationFrame(() => initCanvas());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    input.layout
  ]);

  // ----- Validation -----
  const validate = (candidate) => {
    const errs = [];
    const trimmed = typeof candidate === "string" ? candidate.trim() : candidate;

    // required
    if (input.required) {
      const isEmptyArray = Array.isArray(trimmed) && trimmed.length === 0;
      const isEmptyScalar =
        !Array.isArray(trimmed) &&
        (trimmed === "" || trimmed === false || trimmed == null);

      if (isEmptyArray || isEmptyScalar) {
        errs.push("This field is required.");
      }
    }

    // minLength / maxLength (strings only)
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

    // pattern (safe)
    if (typeof trimmed === "string" && input.pattern && input.pattern !== "") {
      try {
        const re = new RegExp(input.pattern);
        if (!re.test(trimmed)) {
          errs.push("Invalid format.");
        }
      } catch (e) {
        console.warn("Invalid regex pattern:", input.pattern, e);
        errs.push("Invalid validation pattern configuration.");
      }
    }

    // password strength
    if (input.passwordStrength && typeof trimmed === "string") {
      const strongEnough = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(trimmed);
      if (!strongEnough) {
        errs.push("Password is too weak.");
      }
    }

    return errs;
  };

  const errors = validate(val);
  const showError = touched && errors.length > 0;

  const errorBlock =
    showError &&
    errors.length > 0 && (
      <div className="mt-2" aria-live="polite">
        {errors.map((msg, i) => (
          <div key={i} className="alert alert-danger py-2 mb-2" role="alert">
            {msg}
          </div>
        ))}
      </div>
    );

  // Emit via OutputObject (demo + AlloyForm)
  const emit = (nextVal, action = "change") => {
    const errs = validate(nextVal);
    const hasError = errs.length > 0;

    if (typeof output === "function") {
      const out = new OutputObject({
        id: domId, // always emit the real DOM id
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

  // file-specific change handler (single + multiple)
  const handleFileChange = (e) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList);
    const isMulti = !!input.multiple;

    const nextVal = isMulti ? files : files[0];
    setVal(nextVal);
    emit(nextVal, "change");

    // allow re-selecting same file(s)
    e.target.value = "";
  };

  // shared change handler
  const handleChange = (e) => {
    if (input.type === "file") {
      return handleFileChange(e);
    }

    const v = e.target.value;

    if (input.type === "checkbox") {
      const prev = Array.isArray(val) ? [...val] : [];
      const idx = prev.indexOf(v);
      if (idx > -1) prev.splice(idx, 1);
      else prev.push(v);
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

  // onBlur: mark touched + emit blur
  const handleBlur = () => {
    setTouched(true);

    if (input.type === "canvas") {
      const next = hasDrawnRef.current ? getCanvasDataUrl() : "";
      setVal(next);
      emit(next, "blur");
      return;
    }

    emit(val, "blur");
  };

  const commonControlProps = {
    id: domId,
    name: input.name,
    placeholder: input.placeholder,
    onBlur: handleBlur,
    "aria-invalid": showError || undefined,
    disabled: !!input.disabled
  };

  const withInvalid = (base) => base + (showError ? " is-invalid" : "");

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
        <div className="form-check" key={o.value ?? i}>
          <input
            type="radio"
            id={`${domId}_${i}`}
            className={withInvalid(input.className)}
            name={input.name}
            value={o.value}
            checked={val === o.value}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError || undefined}
            disabled={!!input.disabled}
          />
          <label className="form-check-label" htmlFor={`${domId}_${i}`}>
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
        <div className="form-check" key={o.value ?? i}>
          <input
            type="checkbox"
            id={`${domId}_${i}`}
            className={withInvalid(input.className)}
            name={input.name}
            value={o.value}
            checked={Array.isArray(val) && val.includes(o.value)}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError || undefined}
            disabled={!!input.disabled}
          />
          <label className="form-check-label" htmlFor={`${domId}_${i}`}>
            {o.label}
          </label>
        </div>
      ))}
      {errorBlock}
    </div>
  );

  const renderFileValuePreview = () => {
    if (!val) return null;

    // string (single url)
    if (typeof val === "string") {
      return <div className="form-text mt-1 text-break">{val}</div>;
    }

    // string[] (multiple urls)
    if (Array.isArray(val) && val.every((x) => typeof x === "string")) {
      return (
        <div className="form-text mt-1">
          {val.map((u, i) => (
            <div key={i} className="text-break">
              {u}
            </div>
          ))}
        </div>
      );
    }

    // File (single)
    if (val instanceof File) {
      return (
        <div className="form-text mt-1">
          {val.name} ({Math.round(val.size / 1024)} KB)
        </div>
      );
    }

    // File[] (multiple)
    if (Array.isArray(val) && val.every((x) => x instanceof File)) {
      return (
        <div className="form-text mt-1">
          {val.map((f, i) => (
            <div key={i}>
              {f.name} ({Math.round(f.size / 1024)} KB)
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderFile = () => (
    <div>
      <input
        {...commonControlProps}
        type="file"
        onChange={handleFileChange}
        className={withInvalid(input.className)}
        accept={input.accept}
        multiple={!!input.multiple}
      />
      {renderFileValuePreview()}
      {showError && errorBlock}
    </div>
  );

  const renderCanvas = () => (
    <div>
      <canvas
        ref={canvasRef}
        id={domId}
        name={input.name}
        width={canvasWidth}
        height={canvasHeight}
        tabIndex={disabled ? -1 : 0}
        onBlur={handleBlur}
        style={{
          width: "100%",
          maxWidth: "100%",
          border: "1px solid #ced4da",
          borderRadius: "0.375rem",
          touchAction: "none",
          cursor: disabled ? "not-allowed" : "crosshair",
          opacity: disabled ? 0.6 : 1
        }}
        onMouseDown={onCanvasStart}
        onMouseMove={onCanvasMove}
        onMouseUp={onCanvasEnd}
        onMouseLeave={onCanvasEnd}
        onTouchStart={onCanvasStart}
        onTouchMove={onCanvasMove}
        onTouchEnd={onCanvasEnd}
        aria-invalid={showError || undefined}
      />

      {!disabled && (
        <div className="mt-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={clearCanvas}
          >
            Clear
          </button>
        </div>
      )}

      {showError && errorBlock}
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
      case "file":
        return renderFile();
      case "canvas":
        return renderCanvas();
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
          <label htmlFor={domId}>
            {input.icon && <AlloyIcon icon={input.icon} />}
            {input.icon && "\u00A0"}
            {input.label}
          </label>
        </div>
        {!(input.type === "radio" || input.type === "checkbox") && errorBlock}
      </div>
    );
  }

  if (input.layout === "icon") {
    return (
      <div className="m-2">
        {input.label && (
          <label htmlFor={domId} className="form-label">
            {input.label}
          </label>
        )}

        <div className="input-group">
          <span className={input.iconGroupClass}>
            <AlloyIcon icon={input.icon} />
          </span>

          {["radio", "checkbox"].includes(input.type)
            ? renderControl()
            : input.type === "textarea"
            ? renderTextarea()
            : input.type === "select"
            ? renderSelect()
            : input.type === "file"
            ? renderFile()
            : input.type === "canvas"
            ? renderCanvas()
            : renderTextLike()}
        </div>

        {!(input.type === "radio" || input.type === "checkbox") && errorBlock}
      </div>
    );
  }

  // layout: "text" (default)
  return (
    <div className="mb-3">
      {[
        "text",
        "textarea",
        "number",
        "email",
        "password",
        "date",
        "file",
        "canvas"
      ].includes(input.type) &&
        input.label && (
          <label htmlFor={domId} className="form-label">
            {input.label}
          </label>
        )}

      {renderControl()}

      {!(input.type === "radio" || input.type === "checkbox") && errorBlock}
    </div>
  );
}

export default AlloyInput;
