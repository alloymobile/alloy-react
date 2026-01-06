// src/components/tissue/AlloyQuantity.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";

import AlloyInput, { InputObject } from "../cell/AlloyInput.jsx";
import AlloyButtonIcon, { ButtonIconObject } from "../cell/AlloyButtonIcon.jsx";
import { IconObject } from "../cell/AlloyIcon.jsx";

import { OutputObject, useDomId } from "../../utils/idHelper.js";

function toNum(x, fallback) {
  const n =
    typeof x === "string" && x.trim() !== "" ? Number(x.trim()) : Number(x);
  return Number.isFinite(n) ? n : fallback;
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function addOnce(base = "", add = "") {
  const b = String(base || "");
  const a = String(add || "").trim();
  if (!a) return b.trim();
  const tokens = a.split(/\s+/).filter(Boolean);
  const set = new Set(b.split(/\s+/).filter(Boolean));
  tokens.forEach((t) => set.add(t));
  return Array.from(set).join(" ").trim();
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

    const initial = typeof value === "undefined" ? this.min : toNum(value, this.min);
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
            className: "btn btn-light text-muted",
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
            className: "btn btn-light text-muted",
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

  const [qty, setQty] = useState(() =>
    clamp(toNum(quantity.value, quantity.min), quantity.min, quantity.max)
  );

  useEffect(() => {
    if (quantity.input && !quantity.input.id) quantity.input.id = `${domId}-input`;
    if (quantity.decrease && !quantity.decrease.id) quantity.decrease.id = `${domId}-dec`;
    if (quantity.increase && !quantity.increase.id) quantity.increase.id = `${domId}-inc`;

    if (quantity.decrease) {
      quantity.decrease.className = addOnce(
        quantity.decrease.className,
        "ax-qty-btn ax-qty-btn-dec"
      );
    }
    if (quantity.increase) {
      quantity.increase.className = addOnce(
        quantity.increase.className,
        "ax-qty-btn ax-qty-btn-inc"
      );
    }
  }, [domId, quantity]);

  useEffect(() => {
    const next = clamp(toNum(quantity.value, quantity.min), quantity.min, quantity.max);
    setQty(next);
    quantity.sync(next);
  }, [quantity, quantity.value, quantity.min, quantity.max, quantity.disabled]);

// inside AlloyQuantity.jsx

    const emit = useCallback(
    (action, nextValue, event) => {
        quantity.onChange?.(nextValue, quantity, { action, event });

        if (typeof output === "function") {
        output(
            OutputObject.ok({
            id: domId,
            type: "quantity",
            action,
            data: {
                [quantity.name]: nextValue
            }
            })
        );
        }
    },
    [domId, output, quantity]
    );


  const applyNext = useCallback(
    (nextValue, action, event) => {
      const next = clamp(toNum(nextValue, quantity.min), quantity.min, quantity.max);
      setQty(next);
      quantity.sync(next);
      emit(action, next, event);
    },
    [emit, quantity]
  );

  const onButtonOut = useCallback(
    (out) => {
      if (!out || out.action !== "click") return;

      if (out.id === quantity.decrease?.id) {
        applyNext(qty - quantity.step, "dec", out);
        return;
      }
      if (out.id === quantity.increase?.id) {
        applyNext(qty + quantity.step, "inc", out);
      }
    },
    [applyNext, qty, quantity]
  );

  const onInputOut = useCallback(
    (out) => {
      if (!out || out.type !== "input") return;
      if (out.id !== quantity.input?.id) return;

      const raw = out?.data?.value;

      if (raw === "" || raw == null) {
        if (out.action === "blur") applyNext(quantity.min, "set", out);
        return;
      }

      const n = toNum(raw, NaN);
      if (!Number.isFinite(n)) return;

      applyNext(n, "set", out);
    },
    [applyNext, quantity]
  );

  const groupClass = useMemo(() => {
    const base = "ax-qty-group";
    return [base, quantity.className].filter(Boolean).join(" ");
  }, [quantity.className]);

  return (
    <div className={quantity.colClass} id={domId}>
      {quantity.label ? (
        <div className="fw-semibold fs-3 mb-2">{quantity.label}</div>
      ) : null}

      <div className={groupClass}>
        <AlloyButtonIcon buttonIcon={quantity.decrease} output={onButtonOut} />

        <div className="ax-qty-input flex-grow-1">
          <AlloyInput input={quantity.input} output={onInputOut} />
        </div>

        <AlloyButtonIcon buttonIcon={quantity.increase} output={onButtonOut} />
      </div>

      {quantity.showRange ? (
        <div className="text-muted mt-2">{quantity.rangeText()}</div>
      ) : null}

      <style>{`
        .ax-qty-group{
          display:flex;
          align-items:stretch;
          width:100%;
          border:1px solid #dee2e6;
          border-radius:14px;
          overflow:hidden;
          background:#fff;
        }
        .ax-qty-btn{
          border:0 !important;
          border-radius:0 !important;
          min-width:72px;
          display:flex;
          align-items:center;
          justify-content:center;
          padding-left:18px;
          padding-right:18px;
          background:#fff !important;
        }
        .ax-qty-btn-dec{
          border-right:1px solid #dee2e6 !important;
        }
        .ax-qty-btn-inc{
          border-left:1px solid #dee2e6 !important;
        }
        .ax-qty-input > .mb-3{
          margin:0 !important;
        }
        .ax-qty-input input{
          border:0 !important;
          border-radius:0 !important;
          box-shadow:none !important;
          text-align:center !important;
          font-weight:600 !important;
          font-size:28px !important;
          padding-top:14px !important;
          padding-bottom:14px !important;
        }
        .ax-qty-input input:focus{
          box-shadow:none !important;
        }
        .ax-qty-input input[type=number]::-webkit-outer-spin-button,
        .ax-qty-input input[type=number]::-webkit-inner-spin-button{
          -webkit-appearance:none;
          margin:0;
        }
        .ax-qty-input input[type=number]{
          -moz-appearance:textfield;
        }
      `}</style>
    </div>
  );
}

export default AlloyQuantity;
