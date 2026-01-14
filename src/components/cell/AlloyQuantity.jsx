// src/components/tissue/AlloyQuantity.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { InputObject } from "../cell/AlloyInput.jsx";
import { ButtonIconObject } from "../cell/AlloyButtonIcon.jsx";
import { IconObject } from "../cell/AlloyIcon.jsx";

import { OutputObject, useDomId } from "../../utils/idHelper.js";

function toNum(x, fallback) {
  if (typeof x === "string") {
    const s = x.trim();
    if (!s) return fallback;
    const n = Number(s);
    return Number.isFinite(n) ? n : fallback;
  }
  const n = Number(x);
  return Number.isFinite(n) ? n : fallback;
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

/**
 * @typedef {Object} QuantityConfig
 * @property {string} name                         - REQUIRED
 * @property {string} [id]
 * @property {string} [label]
 *
 * @property {number|string} [value]
 * @property {number|string} [min]
 * @property {number|string} [max]
 * @property {number|string} [step]
 *
 * @property {boolean} [disabled]
 * @property {boolean} [showRange]
 *
 * @property {string} [colClass]                   - wrapper classes
 * @property {string} [className]                  - group classes
 *
 * @property {InputObject|Object} [input]
 * @property {ButtonIconObject|Object} [decrease]
 * @property {ButtonIconObject|Object} [increase]
 *
 * @property {(next:number, self:QuantityObject, meta:{action:"inc"|"dec"|"set", event?:any})=>void} [onChange]
 * @property {any} [rest]
 */
export class QuantityObject {
  constructor(cfg = {}) {
    const {
      id,
      name,
      label = "Quantity",

      value,
      min = 1,
      max = 999,
      step = 1,

      disabled = false,
      showRange = true,

      colClass = "col-12",
      className = "",

      input,
      decrease,
      increase,

      onChange,
      ...rest
    } = cfg || {};

    if (!name) throw new Error("QuantityObject requires `name`.");

    this.id = id;
    this.name = name;
    this.label = label;

    this.min = toNum(min, 1);
    this.max = toNum(max, this.min);
    if (this.max < this.min) {
      const tmp = this.min;
      this.min = this.max;
      this.max = tmp;
    }

    this.step = Math.abs(toNum(step, 1)) || 1;
    this.disabled = !!disabled;

    const initial =
      typeof value === "undefined" ? this.min : toNum(value, this.min);
    this.value = clamp(initial, this.min, this.max);

    this.showRange = showRange !== false;

    this.colClass = colClass;
    this.className = className;

    this.input =
      input instanceof InputObject
        ? input
        : new InputObject({
            name: this.name,
            type: "number",
            label: "",
            value: this.value,
            min: this.min,
            max: this.max,
            className: "form-control text-center",
            disabled: this.disabled,
            ...(input && !(input instanceof InputObject) ? input : {})
          });

    this.decrease =
      decrease instanceof ButtonIconObject
        ? decrease
        : new ButtonIconObject({
            name: "",
            className: "btn btn-outline-secondary",
            disabled: this.disabled || this.value <= this.min,
            ariaLabel: "Decrease quantity",
            title: "Decrease",
            icon: new IconObject({ iconClass: "fa-solid fa-minus" }),
            ...(decrease && !(decrease instanceof ButtonIconObject) ? decrease : {})
          });

    this.increase =
      increase instanceof ButtonIconObject
        ? increase
        : new ButtonIconObject({
            name: "",
            className: "btn btn-outline-secondary",
            disabled: this.disabled || this.value >= this.max,
            ariaLabel: "Increase quantity",
            title: "Increase",
            icon: new IconObject({ iconClass: "fa-solid fa-plus" }),
            ...(increase && !(increase instanceof ButtonIconObject) ? increase : {})
          });

    this.onChange = onChange;

    Object.assign(this, rest);
  }

  rangeText() {
    if (!this.showRange) return "";
    return `Min: ${this.min}, Max: ${this.max}`;
  }

  sync(nextValue) {
    const next = clamp(toNum(nextValue, this.min), this.min, this.max);

    this.value = next;

    this.input.value = next;
    this.input.min = this.min;
    this.input.max = this.max;
    this.input.disabled = this.disabled;

    this.decrease.disabled = this.disabled || next <= this.min;
    this.increase.disabled = this.disabled || next >= this.max;

    return next;
  }
}

export function AlloyQuantity({ quantity, output }) {
  if (!quantity || !(quantity instanceof QuantityObject)) {
    throw new Error("AlloyQuantity requires `quantity` (QuantityObject instance).");
  }

  const domId = useDomId("qty", quantity.id);

  const initialQty = useMemo(() => {
    return clamp(toNum(quantity.value, quantity.min), quantity.min, quantity.max);
  }, [quantity.value, quantity.min, quantity.max]);

  const [qty, setQty] = useState(initialQty);
  const [display, setDisplay] = useState(String(initialQty));

  useEffect(() => {
    if (quantity.input && !quantity.input.id) quantity.input.id = `${domId}-input`;
    if (quantity.decrease && !quantity.decrease.id) quantity.decrease.id = `${domId}-dec`;
    if (quantity.increase && !quantity.increase.id) quantity.increase.id = `${domId}-inc`;
  }, [domId, quantity]);

  useEffect(() => {
    const next = clamp(toNum(quantity.value, quantity.min), quantity.min, quantity.max);
    setQty(next);
    setDisplay(String(next));
    quantity.sync(next);
  }, [quantity, quantity.value, quantity.min, quantity.max, quantity.disabled]);

  const emit = useCallback(
    (action, nextValue, event) => {
      quantity.onChange?.(nextValue, quantity, { action, event });

      if (typeof output === "function") {
        const payload = OutputObject.ok({
          id: domId,
          type: "quantity",
          action,
          data: {
            [quantity.name]: nextValue
          }
        });
        output(payload && typeof payload.toJSON === "function" ? payload.toJSON() : payload);
      }
    },
    [domId, output, quantity]
  );

  const commit = useCallback(
    (nextValue, action, event) => {
      const next = clamp(toNum(nextValue, quantity.min), quantity.min, quantity.max);
      setQty(next);
      setDisplay(String(next));
      quantity.sync(next);
      emit(action, next, event);
    },
    [emit, quantity]
  );

  const decDisabled = quantity.disabled || qty <= quantity.min;
  const incDisabled = quantity.disabled || qty >= quantity.max;

  const onDec = useCallback(
    (e) => {
      if (decDisabled) return;
      commit(qty - quantity.step, "dec", e);
    },
    [commit, decDisabled, qty, quantity.step]
  );

  const onInc = useCallback(
    (e) => {
      if (incDisabled) return;
      commit(qty + quantity.step, "inc", e);
    },
    [commit, incDisabled, qty, quantity.step]
  );

  const onInputChange = useCallback(
    (e) => {
      const v = e.target.value;
      setDisplay(v);

      const n = toNum(v, NaN);
      if (Number.isFinite(n)) {
        const next = clamp(n, quantity.min, quantity.max);
        setQty(next);
        quantity.sync(next);
      }
    },
    [quantity]
  );

  const onInputBlur = useCallback(
    (e) => {
      const n = toNum(display, NaN);
      if (!Number.isFinite(n)) {
        setDisplay(String(qty));
        return;
      }
      commit(n, "set", e);
    },
    [commit, display, qty]
  );

  const btnDecClass = quantity.decrease?.className || "btn btn-outline-secondary";
  const btnIncClass = quantity.increase?.className || "btn btn-outline-secondary";
  const inputClass = quantity.input?.className || "form-control text-center";

  return (
    <div className={quantity.colClass} id={domId}>
      {quantity.label ? (
        <div className="fw-semibold fs-3 mb-2">{quantity.label}</div>
      ) : null}

      <div className={["input-group", quantity.className].filter(Boolean).join(" ")}>
        <button
          type="button"
          id={quantity.decrease?.id}
          className={btnDecClass}
          disabled={decDisabled}
          aria-label={quantity.decrease?.ariaLabel}
          title={quantity.decrease?.title}
          onClick={onDec}
        >
          {quantity.decrease?.name ? (
            quantity.decrease.name
          ) : quantity.decrease?.icon?.iconClass ? (
            <i className={quantity.decrease.icon.iconClass}></i>
          ) : (
            "-"
          )}
        </button>

        <input
          id={quantity.input?.id}
          type="number"
          inputMode="numeric"
          className={inputClass}
          value={display}
          min={quantity.min}
          max={quantity.max}
          step={quantity.step}
          disabled={!!quantity.disabled}
          aria-label={quantity.input?.ariaLabel || quantity.label || "Quantity"}
          onChange={onInputChange}
          onBlur={onInputBlur}
        />

        <button
          type="button"
          id={quantity.increase?.id}
          className={btnIncClass}
          disabled={incDisabled}
          aria-label={quantity.increase?.ariaLabel}
          title={quantity.increase?.title}
          onClick={onInc}
        >
          {quantity.increase?.name ? (
            quantity.increase.name
          ) : quantity.increase?.icon?.iconClass ? (
            <i className={quantity.increase.icon.iconClass}></i>
          ) : (
            "+"
          )}
        </button>
      </div>

      {quantity.showRange ? (
        <div className="text-muted mt-2">{quantity.rangeText()}</div>
      ) : null}
    </div>
  );
}

export default AlloyQuantity;
