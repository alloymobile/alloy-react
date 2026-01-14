// AlloyInput.jsx
import React, { useEffect, useRef, useState, useMemo } from "react";
import AlloyIcon, { IconObject } from "./AlloyIcon.jsx";
import { useDomId, OutputObject } from "../../utils/idHelper.js";

/**
 * @typedef {Object} InputOption
 * @property {string} value
 * @property {string} label
 */

/**
 * @typedef {Object} InputConfig
 * @property {string} name
 * @property {string} [id]
 * @property {string} [type]
 * @property {string} [label]
 * @property {string|string[]|File|File[]|boolean} [value]
 * @property {string} [layout]
 * @property {IconObject|{iconClass:string}} [icon]
 * @property {string} [placeholder]
 * @property {boolean} [required]
 * @property {number}  [minLength]
 * @property {number}  [maxLength]
 * @property {number|string} [min]
 * @property {number|string} [max]
 * @property {string} [pattern]
 * @property {boolean} [passwordStrength]
 * @property {string} [matchWith]
 * @property {string} [className]
 * @property {string} [colClass]
 * @property {InputOption[]|any[]} [options]
 * @property {Array<Function>} [validators]
 * @property {string} [iconGroupClass]
 * @property {string} [accept]
 * @property {boolean} [multiple]
 * @property {boolean} [disabled]
 * @property {number} [width]
 * @property {number} [height]
 * @property {number} [canvasStrokeWidth]
 * @property {number} [size]
 *
 * // multiselect(search UI)
 * @property {boolean} [searchable]
 * @property {string} [valueKey]
 * @property {string} [labelKey]
 *
 * @property {any} [rest]
 */
export class InputObject {
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
      colClass,
      options = [],
      validators = [],
      iconGroupClass,
      size,
      searchable,
      valueKey,
      labelKey,
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

    let initialValue;
    if (typeof value !== "undefined") {
      initialValue = value;
    } else if (type === "checkbox" || type === "multiselect") {
      initialValue = [];
    } else if (type === "switch") {
      initialValue = false;
    } else {
      initialValue = "";
    }

    const normalizedIcon =
      icon instanceof IconObject ? icon : icon ? new IconObject(icon) : undefined;

    this.id = id;
    this.name = name;
    this.type = type;
    this.label = label;
    this.value = initialValue;
    this.layout = layout;
    this.icon = normalizedIcon;
    this.placeholder = placeholder;

    const baseIconGroupClass = "input-group-text";
    if (typeof iconGroupClass === "string" && iconGroupClass.trim() !== "") {
      this.iconGroupClass = baseIconGroupClass + " " + iconGroupClass.trim();
    } else {
      this.iconGroupClass = baseIconGroupClass;
    }

    this.required = !!required;
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.min = min;
    this.max = max;
    this.pattern = pattern;
    this.matchWith = matchWith;
    this.passwordStrength = passwordStrength;

    this.size = size;

    if (typeof className === "string" && className.trim() !== "") {
      this.className = className.trim();
    } else {
      if (type === "select" || type === "multiselect") {
        this.className = "form-control";
      } else if (type === "radio" || type === "checkbox" || type === "switch") {
        this.className = "form-check-input";
      } else {
        this.className = "form-control";
      }
    }

    if (typeof colClass === "string" && colClass.trim() !== "") {
      this.colClass = colClass.trim();
    } else {
      this.colClass = "col-12 col-md-6 mx-auto";
    }

    this.options = options;
    this.validators = validators;

    // multiselect searchable config
    this.searchable =
      typeof searchable === "boolean" ? searchable : type === "multiselect";
    this.valueKey = valueKey;
    this.labelKey = labelKey;

    Object.assign(this, rest);
  }
}

export function AlloyInput({ input, output }) {
  const domId = useDomId("input", input.id);

  const [val, setVal] = useState(input.value);
  const [touched, setTouched] = useState(false);

  // Multiselect (searchable) state
  const [msOpen, setMsOpen] = useState(false);
  const [msQuery, setMsQuery] = useState("");
  const msWrapRef = useRef(null);
  const msSearchRef = useRef(null);

  // Canvas refs/state
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });
  const hasDrawnRef = useRef(false);

  const canvasWidth = input.width ?? 420;
  const canvasHeight = input.height ?? 180;
  const strokeWidth = input.canvasStrokeWidth ?? 2;
  const disabled = !!input.disabled;

  const wrapClass =
    typeof input.colClass === "string" && input.colClass.trim() !== ""
      ? input.colClass.trim()
      : "col-12 col-md-6 mx-auto";

  /* ---------------- CANVAS HELPERS ---------------- */

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = "#000";
  };

  const clearCanvasSurface = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawCanvasDataUrl = (dataUrl) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      clearCanvasSurface();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      initCanvas();
    };
    img.src = dataUrl;
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

    const next = hasDrawnRef.current ? getCanvasDataUrl() : "";
    setVal(next);
    emit(next, "change");
  };

  const clearCanvas = () => {
    clearCanvasSurface();
    initCanvas();
    hasDrawnRef.current = false;
    setVal("");
    emit("", "change");
  };

  // Resync when value/validation config changes
  useEffect(() => {
    setVal(input.value);
    setTouched(false);

    if (input.type === "multiselect") {
      setMsOpen(false);
      setMsQuery("");
    }

    if (input.type === "canvas") {
      hasDrawnRef.current = Boolean(input.value);

      requestAnimationFrame(() => {
        initCanvas();

        if (
          input.value &&
          typeof input.value === "string" &&
          input.value.startsWith("data:image/")
        ) {
          drawCanvasDataUrl(input.value);
        } else {
          clearCanvasSurface();
        }
      });
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

    if (input.required) {
      const isEmptyArray = Array.isArray(trimmed) && trimmed.length === 0;
      const isEmptyScalar =
        !Array.isArray(trimmed) &&
        (trimmed === "" || trimmed === false || trimmed == null);

      if (isEmptyArray || isEmptyScalar) {
        errs.push("This field is required.");
      }
    }

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

  // Emit via OutputObject
  const emit = (nextVal, action = "change") => {
    const errs = validate(nextVal);
    const hasError = errs.length > 0;

    if (typeof output === "function") {
      const out = new OutputObject({
        id: domId,
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

    // ✅ Auto-commit default for <select> when value is empty
  const selectAutoCommittedRef = useRef("");

  useEffect(() => {
    if (input.type !== "select") return;

    const opts = Array.isArray(input.options) ? input.options : [];
    if (opts.length === 0) return;

    const current = val == null ? "" : String(val);
    if (current.trim() !== "") return;

    const first = opts[0];
    const firstVal = first?.value == null ? "" : String(first.value);
    if (firstVal.trim() === "") return;

    // build a stable signature so we don't re-emit forever
    const sig =
      `${input.name}::${firstVal}::${opts.length}`;

    if (selectAutoCommittedRef.current === sig) return;
    selectAutoCommittedRef.current = sig;

    // commit
    setVal(firstVal);
    emit(firstVal, "change");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.type, input.name, input.options, val]);


  const handleFileChange = (e) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList);
    const isMulti = !!input.multiple;

    const nextVal = isMulti ? files : files[0];
    setVal(nextVal);
    emit(nextVal, "change");

    e.target.value = "";
  };

  // Legacy multiselect(native) change handler
  const handleMultiSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setVal(selectedOptions);
    emit(selectedOptions, "change");
  };

  const handleChange = (e) => {
    if (input.type === "file") {
      return handleFileChange(e);
    }

    if (input.type === "multiselect" && !input.searchable) {
      return handleMultiSelectChange(e);
    }

    if (input.type === "switch") {
      const checked = !!e.target.checked;
      setVal(checked);
      emit(checked, "change");
      return;
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

  /* ---------------- MULTISELECT (SEARCHABLE) ---------------- */

  const msKeys = useMemo(() => {
    const opts = Array.isArray(input.options) ? input.options : [];
    const sample = opts[0];

    const inferredValueKey =
      input.valueKey ??
      (sample && typeof sample === "object" && sample !== null && "value" in sample
        ? "value"
        : "id");

    const inferredLabelKey =
      input.labelKey ??
      (sample && typeof sample === "object" && sample !== null && "label" in sample
        ? "label"
        : "name");

    return { valueKey: inferredValueKey, labelKey: inferredLabelKey };
  }, [input.options, input.valueKey, input.labelKey]);

  // selected value MUST be string[]
  const msSelected = Array.isArray(val) ? val.map((x) => String(x)) : [];

  const msSelectedIdSet = useMemo(() => {
    const set = new Set();
    msSelected.forEach((x) => {
      if (x != null) set.add(String(x));
    });
    return set;
  }, [msSelected]);

  const msGetOptId = (opt, idx) => {
    if (!opt) return String(idx);
    if (typeof opt === "object") {
      const k = opt?.[msKeys.valueKey];
      if (k != null && String(k).trim() !== "") return String(k);
    }
    return String(opt ?? idx);
  };

  const msGetOptLabel = (opt) => {
    if (!opt) return "";
    if (typeof opt === "object") {
      const l = opt?.[msKeys.labelKey];
      if (l != null) return String(l);
    }
    return String(opt);
  };

  const msDisplayText = useMemo(() => {
    const opts = Array.isArray(input.options) ? input.options : [];
    const map = new Map();
    opts.forEach((o, i) => {
      const id = msGetOptId(o, i);
      map.set(String(id), msGetOptLabel(o));
    });

    const labels = msSelected
      .map((x) => {
        if (x != null && map.has(String(x))) return map.get(String(x));
        return x != null ? String(x) : "";
      })
      .filter((s) => typeof s === "string" && s.trim() !== "");

    return labels.join(", ");
  }, [msSelected, input.options, msKeys.valueKey, msKeys.labelKey]);

  const msFilteredOptions = useMemo(() => {
    const q = String(msQuery || "").trim().toLowerCase();
    const opts = Array.isArray(input.options) ? input.options : [];
    if (!q) return opts;

    return opts.filter((o, i) => {
      const label = msGetOptLabel(o).toLowerCase();
      const slug =
        o && typeof o === "object" && o.slug != null ? String(o.slug).toLowerCase() : "";
      const id = msGetOptId(o, i).toLowerCase();
      return label.includes(q) || slug.includes(q) || id.includes(q);
    });
  }, [msQuery, input.options]);

  // ✅ FIXED: proper add/removeEventListener with defined handlers
  useEffect(() => {
    const onDocDown = (e) => {
      if (!msWrapRef.current) return;
      if (!msWrapRef.current.contains(e.target)) setMsOpen(false);
    };

    const onEsc = (e) => {
      if (e.key === "Escape") setMsOpen(false);
    };

    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // focus search immediately when opening
  useEffect(() => {
    if (!msOpen) return;
    requestAnimationFrame(() => {
      if (msSearchRef.current) msSearchRef.current.focus();
    });
  }, [msOpen]);

  const msToggle = (opt, idx) => {
    const id = msGetOptId(opt, idx);
    if (!id) return;

    const next = Array.isArray(msSelected) ? [...msSelected] : [];
    const hitIndex = next.findIndex((x) => String(x ?? "") === String(id));

    if (hitIndex > -1) {
      next.splice(hitIndex, 1);
    } else {
      next.push(String(id));
    }

    setVal(next);
    emit(next, "change");
  };

  const msClear = () => {
    setVal([]);
    emit([], "change");
  };

  const renderMultiSelectSearch = () => (
    <div ref={msWrapRef} className="position-relative w-100">
      <input
        {...commonControlProps}
        type="text"
        value={msDisplayText}
        readOnly
        onFocus={() => {
          if (!disabled) setMsOpen(true);
        }}
        onClick={() => {
          if (!disabled) setMsOpen(true);
        }}
        className={withInvalid(input.className)}
        placeholder={input.placeholder}
      />

      {msOpen && !disabled && (
        <div
          className="dropdown-menu show w-100 p-2 shadow"
          style={{ maxHeight: 320, overflow: "auto" }}
        >
          <input
            ref={msSearchRef}
            type="text"
            className="form-control mb-2"
            value={msQuery}
            onChange={(e) => setMsQuery(e.target.value)}
            placeholder="Search..."
          />

          {msFilteredOptions.length === 0 ? (
            <div className="text-muted small px-2 py-2">No results</div>
          ) : (
            <div className="list-group">
              {msFilteredOptions.map((opt, i) => {
                const id = msGetOptId(opt, i);
                const label = msGetOptLabel(opt);
                const checked = msSelectedIdSet.has(String(id));
                const slug =
                  opt && typeof opt === "object" && opt.slug != null
                    ? String(opt.slug)
                    : "";

                return (
                  <button
                    key={id}
                    type="button"
                    className="list-group-item list-group-item-action d-flex align-items-center gap-2"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => msToggle(opt, i)}
                  >
                    <input
                      className="form-check-input m-0"
                      type="checkbox"
                      checked={checked}
                      readOnly
                    />
                    <span className="flex-grow-1">{label}</span>
                    {slug ? <span className="small text-muted">{slug}</span> : null}
                  </button>
                );
              })}
            </div>
          )}

          <div className="d-flex justify-content-between mt-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onMouseDown={(e) => e.preventDefault()}
              onClick={msClear}
            >
              Clear
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setMsOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );

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

  const renderMultiSelectNative = () => {
    const selectedValues = Array.isArray(val) ? val : [];
    const visibleSize = input.size ?? 4;

    return (
      <select
        {...commonControlProps}
        multiple
        size={visibleSize}
        value={selectedValues}
        onChange={handleMultiSelectChange}
        className={withInvalid(input.className)}
      >
        {input.options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    );
  };

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

  const renderSwitch = () => (
    <div className="form-check form-switch">
      <input
        type="checkbox"
        id={domId}
        className={withInvalid(input.className)}
        name={input.name}
        checked={!!val}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={showError || undefined}
        disabled={!!input.disabled}
      />
      {input.label && (
        <label className="form-check-label" htmlFor={domId}>
          {input.label}
        </label>
      )}
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

    if (typeof val === "string") {
      return <div className="form-text mt-1 text-break">{val}</div>;
    }

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

    if (val instanceof File) {
      return (
        <div className="form-text mt-1">
          {val.name} ({Math.round(val.size / 1024)} KB)
        </div>
      );
    }

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

  const renderDateTimeLocal = () => (
    <input
      {...commonControlProps}
      type="datetime-local"
      value={val}
      onChange={handleChange}
      className={withInvalid(input.className)}
      min={input.min}
      max={input.max}
    />
  );

  const renderTime = () => (
    <input
      {...commonControlProps}
      type="time"
      value={val}
      onChange={handleChange}
      className={withInvalid(input.className)}
      min={input.min}
      max={input.max}
    />
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
      case "multiselect":
        return input.searchable ? renderMultiSelectSearch() : renderMultiSelectNative();
      case "radio":
        return renderRadioGroup();
      case "checkbox":
        return renderCheckboxGroup();
      case "switch":
        return renderSwitch();
      case "file":
        return renderFile();
      case "canvas":
        return renderCanvas();
      case "datetime-local":
        return renderDateTimeLocal();
      case "time":
        return renderTime();
      default:
        return renderTextLike();
    }
  };

  /* ---------------- LAYOUT VARIANTS ---------------- */

  if (input.layout === "floating") {
    return (
      <div className={wrapClass}>
        <div className="mb-3">
          <div className="form-floating">
            {renderControl()}
            <label htmlFor={domId}>
              {input.icon && <AlloyIcon icon={input.icon} />}
              {input.icon && "\u00A0"}
              {input.label}
            </label>
          </div>
          {!(input.type === "radio" || input.type === "checkbox" || input.type === "switch") && errorBlock}
        </div>
      </div>
    );
  }

  if (input.layout === "icon") {
    return (
      <div className={wrapClass}>
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

            {["radio", "checkbox", "switch"].includes(input.type)
              ? renderControl()
              : input.type === "textarea"
              ? renderTextarea()
              : input.type === "select"
              ? renderSelect()
              : input.type === "multiselect"
              ? (input.searchable ? renderMultiSelectSearch() : renderMultiSelectNative())
              : input.type === "file"
              ? renderFile()
              : input.type === "canvas"
              ? renderCanvas()
              : input.type === "datetime-local"
              ? renderDateTimeLocal()
              : input.type === "time"
              ? renderTime()
              : renderTextLike()}
          </div>

          {!(input.type === "radio" || input.type === "checkbox" || input.type === "switch") && errorBlock}
        </div>
      </div>
    );
  }

  const labelTypes = [
    "text",
    "textarea",
    "number",
    "email",
    "password",
    "date",
    "datetime-local",
    "time",
    "file",
    "canvas",
    "select",
    "multiselect"
  ];

  return (
    <div className={wrapClass}>
      <div className="mb-3">
        {labelTypes.includes(input.type) && input.label && (
          <label htmlFor={domId} className="form-label">
            {input.label}
          </label>
        )}

        {renderControl()}

        {!(input.type === "radio" || input.type === "checkbox" || input.type === "switch") && errorBlock}
      </div>
    </div>
  );
}

export default AlloyInput;
