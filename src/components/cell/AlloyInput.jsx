import React, { useState, useEffect, useRef } from "react";
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
 *                                              "checkbox",
 *                                              "file",
 *                                              "canvas"   // ✅ NEW
 *
 * @property {string} [label]                - Human label for the field or group
 * @property {string|string[]|File} [value]  - Initial value.
 *                                            For checkbox group: an array of checked values.
 *                                            For file: URL or File.
 *                                            For canvas: DataURL string (data:image/png;base64,...)
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
 * @property {string} [iconGroupClass]       - Extra classes for the icon span in
 *                                            "icon" layout. Defaults to "input-group-text".
 *
 * @property {string} [accept]               - For file input: accept attribute
 * @property {boolean} [multiple]            - For file input: multiple files (future use)
 *
 * @property {boolean} [disabled]            - Standard disabled flag. For canvas: disables drawing.
 *
 * @property {number} [width]                - Canvas width in px (default 420)
 * @property {number} [height]               - Canvas height in px (default 180)
 * @property {number} [canvasStrokeWidth]    - Canvas stroke width (default 2)
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

    this.id = id ?? generateId("input");
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
      this.iconGroupClass = baseIconGroupClass; // backward compatible default
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
 *   - fileUploader?: (fieldName: string, file: File, context?: any) => Promise<string>
 */
export function AlloyInput({ input, output, fileUploader }) {
  const [val, setVal] = useState(input.value);
  const [touched, setTouched] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Canvas refs/state
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });

  const canvasWidth = input.width ?? 420;
  const canvasHeight = input.height ?? 180;
  const strokeWidth = input.canvasStrokeWidth ?? 2;
  const disabled = !!input.disabled;

  // Resync when validation / value props change
  useEffect(() => {
    setVal(input.value);
    setTouched(false);
    setUploading(false);
    setUploadError("");

    // Initialize canvas when switching to canvas type
    if (input.type === "canvas") {
      setTimeout(() => initCanvas(), 0);
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

    // pattern (safe)
    if (
      typeof trimmed === "string" &&
      input.pattern &&
      input.pattern !== ""
    ) {
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

  const baseErrors = validate(val);
  const combinedErrors = uploadError ? [...baseErrors, uploadError] : baseErrors;
  const showError = touched && combinedErrors.length > 0;

  const errorBlock =
    showError &&
    combinedErrors.length > 0 && (
      <div className="mt-2" aria-live="polite">
        {combinedErrors.map((msg, i) => (
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
    if (uploadError) {
      errs.push(uploadError);
    }
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

  // file-specific change handler
  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    if (!fileUploader) {
      // fallback: pass File directly if no uploader (demo / tests)
      setVal(file);
      setUploadError("");
      emit(file, "change");
      return;
    }

    try {
      setUploading(true);
      setUploadError("");
      // pass fieldName + file + context
      const url = await fileUploader(input.name, file, { input });
      setVal(url);          // store URL as field value
      emit(url, "change");  // propagate URL upward
    } catch (err) {
      console.error("File upload failed", err);
      const msg =
        (err && err.message) || "File upload failed. Please try again.";
      setUploadError(msg);
      // emit with previous val so form state doesn't break
      emit(val, "change");
    } finally {
      setUploading(false);
    }
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

    // For canvas, commit the current drawing to a DataURL before blur emit
    if (input.type === "canvas") {
      const next = getCanvasDataUrl();
      setVal(next);
      emit(next, "blur");
      return;
    }

    emit(val, "blur");
  };

  const commonControlProps = {
    id: input.id,
    name: input.name,
    placeholder: input.placeholder,
    onBlur: handleBlur,
    "aria-invalid": showError || undefined,
    disabled: !!input.disabled
  };

  const withInvalid = (base) => base + (showError ? " is-invalid" : "");

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
    // Always include file type prefix
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
    drawingRef.current = true;
    lastPointRef.current = getPoint(e);
  };

  const onCanvasMove = (e) => {
    if (disabled) return;
    if (!drawingRef.current) return;
    if (e.preventDefault) e.preventDefault();

    const p = getPoint(e);
    drawLine(lastPointRef.current, p);
    lastPointRef.current = p;
  };

  const onCanvasEnd = () => {
    if (disabled) return;
    if (!drawingRef.current) return;

    drawingRef.current = false;
    const dataUrl = getCanvasDataUrl(); // data:image/png;base64,...
    setVal(dataUrl);
    emit(dataUrl, "change");
  };

  const clearCanvas = () => {
    initCanvas();
    setVal("");
    emit("", "change");
  };

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
            id={`${input.id}_${i}`}
            className={withInvalid(input.className)}
            name={input.name}
            value={o.value}
            checked={val === o.value}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError || undefined}
            disabled={!!input.disabled}
          />
          <label className="form-check-label" htmlFor={`${input.id}_${i}`}>
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
            id={`${input.id}_${i}`}
            className={withInvalid(input.className)}
            name={input.name}
            value={o.value}
            checked={Array.isArray(val) && val.includes(o.value)}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError || undefined}
            disabled={!!input.disabled}
          />
          <label className="form-check-label" htmlFor={`${input.id}_${i}`}>
            {o.label}
          </label>
        </div>
      ))}
      {errorBlock}
    </div>
  );

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
      {uploading && <div className="form-text mt-1">Uploading...</div>}
      {!uploading && val && typeof val === "string" && (
        <div className="form-text mt-1 text-break">{val}</div>
      )}
    </div>
  );

  const renderCanvas = () => (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
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
          <label htmlFor={input.id}>
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
          <label htmlFor={input.id} className="form-label">
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
          <label htmlFor={input.id} className="form-label">
            {input.label}
          </label>
        )}

      {renderControl()}

      {!(input.type === "radio" || input.type === "checkbox") && errorBlock}
    </div>
  );
}

export default AlloyInput;
