// src/lib/components/organ/AlloyDonate.jsx
import React, { useState } from "react";

import AlloyInput, { InputObject } from "../cell/AlloyInput.jsx";
import AlloyPay, { PayObject } from "../tissue/AlloyPay.jsx";
import AlloyButtonBar, {
  ButtonBarObject
} from "../tissue/AlloyButtonBar.jsx";

import { OutputObject, generateId } from "../../utils/idHelper.js";

/* -------------------------------------------------------
 * DonateObject (model)
 * ----------------------------------------------------- */

export class DonateObject {
  constructor(res = {}) {
    const {
      id,
      title = "AlloyMobile",
      className = "col m-2",
      message = "",
      action = "",
      fields,
      pay,
      amountBar,
      data
    } = res || {};

    this.id = id ?? generateId("donate");
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

    this.amountBar =
      amountBar instanceof ButtonBarObject
        ? amountBar
        : new ButtonBarObject(
            amountBar || {
              className: "nav gap-2 my-3",
              buttonClass: "btn btn-outline-secondary",
              barName: { show: false },
              type: "AlloyButton",
              buttons: []
            }
          );

    this.data = data ?? {};
  }
}

/* -------------------------------------------------------
 * AlloyDonate (view)
 *
 * Props:
 *   - donate: DonateObject
 *   - output?: (out: OutputObject) => void
 *
 * Behavior:
 *   - Text fields (donor info):
 *       {
 *         id: "<donate.id>",
 *         type: "donate",
 *         action: "field",
 *         error: false,
 *         data: { name, value, values: { ...allFields } }
 *       }
 *
 *   - Amount bar:
 *       {
 *         id: "<donate.id>",
 *         type: "donate",
 *         action: "amount",
 *         error: false,
 *         data: {
 *           amount: "<resolved-amount>",
 *           raw: <ButtonBar OutputObject JSON>
 *         }
 *       }
 *
 *   - Payment (AlloyPay submit):
 *       {
 *         id: "<donate.id>",
 *         type: "donate",
 *         action: "<payOut.action | donate.action | 'submit'>",
 *         error: false,
 *         data: {
 *           donor:  { ...all donor fields },
 *           amount: "<selectedAmount | ''>",
 *           pay:    <plain AlloyPay OutputObject JSON>
 *         }
 *       }
 * ----------------------------------------------------- */

export function AlloyDonate({ donate, output }) {
  if (!donate || !(donate instanceof DonateObject)) {
    throw new Error(
      "AlloyDonate requires `donate` (DonateObject instance)."
    );
  }

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  // donor info
  const [values, setValues] = useState(() => {
    const init = {};
    donate.fields.forEach((fld) => {
      if (fld?.name) {
        init[fld.name] = fld.value;
      }
    });
    return init;
  });

  // selected amount (from bar)
  const [amount, setAmount] = useState("");

  /* ----------------- Handlers ----------------- */

  // Donor text fields
  const handleFieldOutput = (out) => {
    const payload =
      out instanceof OutputObject ? out.data || {} : out || {};
    const { name, value } = payload;
    if (!name) return;

    setValues((prev) => {
      const next = { ...prev, [name]: value };

      const evt = OutputObject.ok({
        id: donate.id,
        type: "donate",
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

  // Amount bar
  const handleAmountOutput = (barOut) => {
    const plain =
      barOut instanceof OutputObject && typeof barOut.toJSON === "function"
        ? barOut.toJSON()
        : barOut || {};

    // Try to resolve an amount string from the bar output
    const candidate =
      plain?.data?.value ??
      plain?.data?.name ??
      plain?.action ??
      "";

    const amt = String(candidate).trim();

    setAmount(amt);

    const evt = OutputObject.ok({
      id: donate.id,
      type: "donate",
      action: "amount",
      data: {
        amount: amt,
        raw: plain
      }
    });

    emit(evt);
  };

  // Payment (AlloyPay)
  const handlePayOutput = (payOut) => {
    const plain =
      payOut instanceof OutputObject && typeof payOut.toJSON === "function"
        ? payOut.toJSON()
        : payOut || {};

    const action = plain.action || donate.action || "submit";

    const evt = OutputObject.ok({
      id: donate.id,
      type: "donate",
      action,
      data: {
        donor: { ...values },
        amount,
        pay: plain
      }
    });

    emit(evt);
  };

  /* ----------------- Render ----------------- */

  return (
    <div className={donate.className} id={donate.id}>
      <h3>{donate.title}</h3>

      {donate.message && donate.message.trim() !== "" && (
        <div className="alert alert-text-danger m-0 p-0">
          {donate.message}
        </div>
      )}

      <hr className="my-3" />

      <div className="row m-2">
        <div className="col-12">
          <h5>Payment Details:</h5>

          {donate.fields.map((fld) => (
            <AlloyInput
              key={fld.id}
              input={fld}
              output={handleFieldOutput}
            />
          ))}

          {/* Optional: preset amount bar */}
          {donate.amountBar &&
            Array.isArray(donate.amountBar.buttons) &&
            donate.amountBar.buttons.length > 0 && (
              <AlloyButtonBar
                buttonBar={donate.amountBar}
                output={handleAmountOutput}
              />
            )}

          <AlloyPay pay={donate.pay} output={handlePayOutput} />
        </div>
      </div>
    </div>
  );
}

export default AlloyDonate;
