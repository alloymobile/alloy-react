// src/lib/components/organ/AlloyPay.jsx
import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import { OutputObject, generateId } from "../../utils/idHelper.js";
import { AlloyIcon, IconObject } from "../cell/AlloyIcon.jsx";
import {
  AlloyButtonSubmit,
  ButtonSubmitObject,
} from "../cell/AlloyButtonSubmit.jsx";

/* -------------------------------------------------------
 * PayObject (model)
 *
 * Mirrors the Angular AlloyPay schema:
 *
 *  id: string;
 *  name: string;
 *  className: string;
 *  brandIcon: AlloyIcon;
 *  cardIcon: AlloyIcon;
 *  expiryIcon: AlloyIcon;
 *  cvcIcon: AlloyIcon;
 *  submit: AlloyButtonSubmit;
 *  disclaimer: string;
 * ----------------------------------------------------- */
export class PayObject {
  constructor(res = {}) {
    const {
      id,
      name = "Payment",
      className = "",
      brandIcon,
      cardIcon,
      expiryIcon,
      cvcIcon,
      submit,
      disclaimer,
    } = res || {};

    this.id = id ?? generateId("alloyPay");
    this.name = name;
    this.className = className || "col-12";

    // Icons
    this.brandIcon =
      brandIcon instanceof IconObject
        ? brandIcon
        : new IconObject(
            brandIcon || {
              iconClass: "fa-brands fa-cc-stripe fa-2xl",
            }
          );

    this.cardIcon =
      cardIcon instanceof IconObject
        ? cardIcon
        : new IconObject(
            cardIcon || {
              iconClass: "fa-solid fa-credit-card",
            }
          );

    this.expiryIcon =
      expiryIcon instanceof IconObject
        ? expiryIcon
        : new IconObject(
            expiryIcon || {
              iconClass: "fa-solid fa-calendar-days",
            }
          );

    this.cvcIcon =
      cvcIcon instanceof IconObject
        ? cvcIcon
        : new IconObject(
            cvcIcon || {
              iconClass: "fa-solid fa-lock",
            }
          );

    // Submit button (ButtonSubmitObject)
    this.submit =
      submit instanceof ButtonSubmitObject
        ? submit
        : new ButtonSubmitObject(
            submit || {
              name: "Pay now",
              icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
              className: "btn btn-primary w-100 mt-3",
              disabled: false,
              loading: false,
              ariaLabel: "Pay now",
              title: "Pay now",
            }
          );

    this.disclaimer =
      typeof disclaimer === "string" && disclaimer.trim()
        ? disclaimer
        : "*AlloyMobile do not store your credit card information.";
  }
}

/* -------------------------------------------------------
 * Stripe Element options (simple defaults)
 * ----------------------------------------------------- */
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      color: "#212529",
      "::placeholder": {
        color: "#adb5bd",
      },
    },
    invalid: {
      color: "#dc3545",
    },
  },
};

/* -------------------------------------------------------
 * AlloyPay (view)
 *
 * Props:
 *   - pay: PayObject (required)
 *   - output?: (out: OutputObject) => void
 *
 * Behavior:
 *   - Renders separate Stripe Elements:
 *       CardNumberElement / CardExpiryElement / CardCvcElement
 *   - On submit:
 *       - calls stripe.createPaymentMethod({ type: "card", card: CardNumberElement })
 *       - emits OutputObject:
 *
 *         SUCCESS:
 *         {
 *           id: "<pay-id>",
 *           type: "pay",
 *           action: "<submit button name>",
 *           error: false,
 *           data: {
 *             paymentMethodId: "...",
 *             paymentMethod: { ...full PM from Stripe... }
 *           }
 *         }
 *
 *         ERROR:
 *         {
 *           id: "<pay-id>",
 *           type: "pay",
 *           action: "error",
 *           error: true,
 *           data: {
 *             message: "<error message>",
 *             code: "<stripe error code | undefined>"
 *           }
 *         }
 *
 * NOTE:
 *   - Component must be rendered inside <Elements stripe={stripePromise}>.
 * ----------------------------------------------------- */
export function AlloyPay({ pay, output }) {
  if (!pay || !(pay instanceof PayObject)) {
    throw new Error("AlloyPay requires `pay` (PayObject instance).");
  }

  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  async function handleSubmit(btnOut) {
    if (!stripe || !elements) {
      const errOut = new OutputObject({
        id: pay.id,
        type: "pay",
        action: "error",
        error: true,
        data: {
          message: "Payment system is not ready. Please try again.",
        },
      });
      emit(errOut);
      setErrorMessage("Payment system is not ready. Please try again.");
      return;
    }

    setProcessing(true);
    setErrorMessage("");

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      const errOut = new OutputObject({
        id: pay.id,
        type: "pay",
        action: "error",
        error: true,
        data: {
          message: "Card number element is missing.",
        },
      });
      emit(errOut);
      setErrorMessage("Card number element is missing.");
      setProcessing(false);
      return;
    }

    try {
      // 1) Create a PaymentMethod from the card details
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement,
      });

      if (error || !paymentMethod) {
        const errOut = new OutputObject({
          id: pay.id,
          type: "pay",
          action: "error",
          error: true,
          data: {
            message: error?.message || "Payment failed.",
            code: error?.code,
          },
        });
        emit(errOut);
        setErrorMessage(error?.message || "Payment failed.");
        setProcessing(false);
        return;
      }

      // 2) Success → emit PaymentMethod to parent
      const actionName =
        btnOut?.data?.name || pay.submit?.name || "submit";

      const okOut = new OutputObject({
        id: pay.id,
        type: "pay",
        action: actionName,
        error: false,
        data: {
          paymentMethodId: paymentMethod.id,
          paymentMethod,
        },
      });

      emit(okOut);
      setProcessing(false);
    } catch (e) {
      const message =
        e && typeof e.message === "string"
          ? e.message
          : "Unexpected error during payment.";

      const errOut = new OutputObject({
        id: pay.id,
        type: "pay",
        action: "error",
        error: true,
        data: {
          message,
        },
      });

      emit(errOut);
      setErrorMessage(message);
      setProcessing(false);
    }
  }

  // Keep submit button in sync with Stripe readiness + processing state
  const submitModel = pay.submit;
  submitModel.loading = processing;
  submitModel.disabled = processing || !stripe || !elements;

  return (
    <div id={pay.id} className={pay.className}>
      <hr className="my-4" />
      <h4 className="mb-3">{pay.name || "Payment"}</h4>

      {/* Payment method selector (only credit card for now) */}
      <div className="my-3">
        <div className="form-check">
          <input
            id={`${pay.id}-credit`}
            name="paymentMethod"
            type="radio"
            className="form-check-input"
            defaultChecked
            required
          />
          <label
            className="form-check-label"
            htmlFor={`${pay.id}-credit`}
          >
            Credit card
          </label>
        </div>
      </div>

      {/* Brand icon (centered) */}
      <h4 className="text-center">
        <AlloyIcon icon={pay.brandIcon} />
      </h4>

      {/* Stripe Card Elements */}
      <div className="row">
        {/* Card Number */}
        <div className="col-sm-12">
          <div className="input-group py-2">
            <span className="input-group-text">
              <AlloyIcon icon={pay.cardIcon} />
            </span>
            <div className="form-control">
              <label
                htmlFor={`${pay.id}-cardNumber`}
                className="form-label mb-1"
              >
                Card Number
              </label>
              <CardNumberElement
                id={`${pay.id}-cardNumber`}
                options={CARD_ELEMENT_OPTIONS}
              />
            </div>
          </div>
        </div>

        {/* Expiry */}
        <div className="col-lg-6">
          <div className="input-group py-2">
            <span className="input-group-text">
              <AlloyIcon icon={pay.expiryIcon} />
            </span>
            <div className="form-control">
              <label
                htmlFor={`${pay.id}-cardExpiry`}
                className="form-label mb-1"
              >
                Expiry Date
              </label>
              <CardExpiryElement
                id={`${pay.id}-cardExpiry`}
                options={CARD_ELEMENT_OPTIONS}
              />
            </div>
          </div>
        </div>

        {/* CVC */}
        <div className="col-lg-6">
          <div className="input-group py-2">
            <span className="input-group-text">
              <AlloyIcon icon={pay.cvcIcon} />
            </span>
            <div className="form-control">
              <label
                htmlFor={`${pay.id}-cardCvc`}
                className="form-label mb-1"
              >
                CVC Number
              </label>
              <CardCvcElement
                id={`${pay.id}-cardCvc`}
                options={CARD_ELEMENT_OPTIONS}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <AlloyButtonSubmit
        buttonSubmit={submitModel}
        output={handleSubmit}
      />

      {/* Stripe / UI error */}
      {errorMessage && (
        <div className="text-danger mt-2 small">{errorMessage}</div>
      )}

      {/* Disclaimer */}
      <p className="m-0 p-0 small text-muted">{pay.disclaimer}</p>
    </div>
  );
}

export default AlloyPay;
