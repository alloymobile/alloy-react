// src/lib/components/organ/AlloyPay.jsx
import React, { useMemo, useState } from "react";
import {
  Elements,
  ElementsConsumer,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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
 *  publicKey: string;
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
      publicKey,
      publishableKey,
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

    const pk =
      typeof publicKey === "string" && publicKey.trim()
        ? publicKey.trim()
        : typeof publishableKey === "string" && publishableKey.trim()
          ? publishableKey.trim()
          : "";
    this.publicKey = pk;

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
 * ----------------------------------------------------- */
export function AlloyPay({ pay, output }) {
  if (!pay || !(pay instanceof PayObject)) {
    throw new Error("AlloyPay requires `pay` (PayObject instance).");
  }

  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const stripePromise = useMemo(() => {
    const k = typeof pay.publicKey === "string" ? pay.publicKey.trim() : "";
    if (!k) return null;
    try {
      return loadStripe(k);
    } catch (e) {
      return null;
    }
  }, [pay.publicKey]);

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  const content = (
    <ElementsConsumer>
      {({ stripe, elements }) => {
        async function handleSubmit(btnOut) {
          if (!stripe || !elements) {
            const errOut = new OutputObject({
              id: pay.id,
              type: "pay",
              action: "error",
              error: true,
              data: {
                message: "Payment system is not ready. Please try again.",
                publicKey: pay.publicKey || "",
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
                publicKey: pay.publicKey || "",
              },
            });
            emit(errOut);
            setErrorMessage("Card number element is missing.");
            setProcessing(false);
            return;
          }

          try {
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
                  publicKey: pay.publicKey || "",
                },
              });
              emit(errOut);
              setErrorMessage(error?.message || "Payment failed.");
              setProcessing(false);
              return;
            }

            const actionName = btnOut?.data?.name || pay.submit?.name || "submit";

            const okOut = new OutputObject({
              id: pay.id,
              type: "pay",
              action: actionName,
              error: false,
              data: {
                paymentMethodId: paymentMethod.id,
                paymentMethod,
                publicKey: pay.publicKey || "",
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
                publicKey: pay.publicKey || "",
              },
            });

            emit(errOut);
            setErrorMessage(message);
            setProcessing(false);
          }
        }

        const submitModel = pay.submit;
        submitModel.loading = processing;
        submitModel.disabled = processing || !stripe || !elements;

        return (
          <div id={pay.id} className={pay.className}>
            <hr className="my-4" />
            <h4 className="mb-3">{pay.name || "Payment"}</h4>

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
                <label className="form-check-label" htmlFor={`${pay.id}-credit`}>
                  Credit card
                </label>
              </div>
            </div>

            <h4 className="text-center">
              <AlloyIcon icon={pay.brandIcon} />
            </h4>

            <div className="row">
              <div className="col-sm-12">
                <div className="input-group py-2">
                  <span className="input-group-text">
                    <AlloyIcon icon={pay.cardIcon} />
                  </span>
                  <div className="form-control">
                    <label htmlFor={`${pay.id}-cardNumber`} className="form-label mb-1">
                      Card Number
                    </label>
                    <CardNumberElement
                      id={`${pay.id}-cardNumber`}
                      options={CARD_ELEMENT_OPTIONS}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="input-group py-2">
                  <span className="input-group-text">
                    <AlloyIcon icon={pay.expiryIcon} />
                  </span>
                  <div className="form-control">
                    <label htmlFor={`${pay.id}-cardExpiry`} className="form-label mb-1">
                      Expiry Date
                    </label>
                    <CardExpiryElement
                      id={`${pay.id}-cardExpiry`}
                      options={CARD_ELEMENT_OPTIONS}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="input-group py-2">
                  <span className="input-group-text">
                    <AlloyIcon icon={pay.cvcIcon} />
                  </span>
                  <div className="form-control">
                    <label htmlFor={`${pay.id}-cardCvc`} className="form-label mb-1">
                      CVC Number
                    </label>
                    <CardCvcElement id={`${pay.id}-cardCvc`} options={CARD_ELEMENT_OPTIONS} />
                  </div>
                </div>
              </div>
            </div>

            <AlloyButtonSubmit buttonSubmit={submitModel} output={handleSubmit} />

            {errorMessage && <div className="text-danger mt-2 small">{errorMessage}</div>}

            <p className="m-0 p-0 small text-muted">{pay.disclaimer}</p>
          </div>
        );
      }}
    </ElementsConsumer>
  );

  if (stripePromise) {
    return <Elements stripe={stripePromise}>{content}</Elements>;
  }

  return content;
}

export default AlloyPay;
