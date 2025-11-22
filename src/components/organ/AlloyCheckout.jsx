// src/lib/components/organ/AlloyCheckout.jsx
import React, { useState } from "react";

import AlloyInput, { InputObject } from "../cell/AlloyInput.jsx";
import AlloyPay, { PayObject } from "../tissue/AlloyPay.jsx";
import { OutputObject, generateId } from "../../utils/idHelper.js";

/* -------------------------------------------------------
 * CheckoutObject (model)
 * ----------------------------------------------------- */

export class CheckoutObject {
  constructor(res = {}) {
    const {
      id,
      title = "AlloyMobile",
      className = "col m-2",
      message = "",
      action = "",
      fields,
      pay,
      data
    } = res || {};

    this.id = id ?? generateId("checkout");
    this.title = title;
    this.className = className;
    this.message = message;
    this.action = action;

    const rawFields = Array.isArray(fields) ? fields : [];
    this.fields = rawFields.map((f) =>
      f instanceof InputObject ? f : new InputObject(f || {})
    );

    this.pay =
      pay instanceof PayObject ? pay : new PayObject(pay || {});

    this.data = data ?? {};
  }
}

/* -------------------------------------------------------
 * AlloyCheckout (view)
 *
 * Props:
 *   - checkout: CheckoutObject
 *   - output?: (out: OutputObject) => void
 *
 * Behavior:
 *   - Each billing field change:
 *       {
 *         id: "<checkout.id>",
 *         type: "checkout",
 *         action: "field",
 *         error: false,
 *         data: { name, value, values: { ...allBillingValues } }
 *       }
 *
 *   - Payment submit (from AlloyPay):
 *       {
 *         id: "<checkout.id>",
 *         type: "checkout",
 *         action: "<payOut.action | checkout.action | 'submit'>",
 *         error: false,
 *         data: {
 *           billing: { ...allBillingValues },
 *           pay:   <plain AlloyPay OutputObject JSON>
 *         }
 *       }
 * ----------------------------------------------------- */

export function AlloyCheckout({ checkout, output }) {
  if (!checkout || !(checkout instanceof CheckoutObject)) {
    throw new Error(
      "AlloyCheckout requires `checkout` (CheckoutObject instance)."
    );
  }

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  // Keep local map of billing field values
  const [values, setValues] = useState(() => {
    const init = {};
    checkout.fields.forEach((fld) => {
      if (fld?.name) {
        init[fld.name] = fld.value;
      }
    });
    return init;
  });

  /* ----------------- Handlers ----------------- */

  // Billing fields
  const handleFieldOutput = (out) => {
    const payload =
      out instanceof OutputObject ? out.data || {} : out || {};
    const { name, value } = payload;
    if (!name) return;

    setValues((prev) => {
      const next = { ...prev, [name]: value };

      const evt = OutputObject.ok({
        id: checkout.id,
        type: "checkout",
        action: "field",
        data: {
          name,
          value,
          values: next
        }
      });

      emit(evt);
      return next;
    });
  };

  // Payment (AlloyPay submit)
  const handlePayOutput = (payOut) => {
    const plain =
      payOut instanceof OutputObject && typeof payOut.toJSON === "function"
        ? payOut.toJSON()
        : payOut || {};

    const action = plain.action || checkout.action || "submit";

    const evt = OutputObject.ok({
      id: checkout.id,
      type: "checkout",
      action,
      data: {
        billing: { ...values },
        pay: plain
      }
    });

    emit(evt);
  };

  /* ----------------- Render ----------------- */

  return (
    <div className={checkout.className} id={checkout.id}>
      <h3>{checkout.title}</h3>

      {checkout.message && checkout.message.trim() !== "" && (
        <div className="alert alert-text-danger m-0 p-0">
          {checkout.message}
        </div>
      )}

      <hr className="my-4" />

      <div className="row m-2">
        {/* Left: billing + payment */}
        <div className="col-sm-12 col-md-6 col-lg-8 col-xl-9 border-end">
          <h5>Billing address:</h5>

          {checkout.fields.map((fld) => (
            <AlloyInput
              key={fld.id}
              input={fld}
              output={handleFieldOutput}
            />
          ))}

          <AlloyPay pay={checkout.pay} output={handlePayOutput} />
        </div>

        {/* Right: order summary (static for demo) */}
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-dark h5">Total bill:</span>
            <span className="badge bg-dark rounded-pill">5</span>
          </h4>

          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Electric bill</h6>
              </div>
              <span className="text-muted">25 CAD</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (CAD)</span>
              <strong>25 CAD</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AlloyCheckout;
