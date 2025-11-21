// pages/Organ/Pay.jsx
import React, { useMemo, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { AlloyPay, PayObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------------------
 * Stripe publishable key
 * ----------------------------------------------------- */
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_3razFwq1sWDPvXkxGX5C8ORi00HyfFcIeL"
);

/* -------------------------------------------------------
 * DEFAULT PAY JSON CONFIG
 *
 * Single JSON blob with everything for AlloyPay:
 *  - id, name, className
 *  - brandIcon / cardIcon / expiryIcon / cvcIcon
 *  - submit button (IMPORTANT: must contain icon)
 *  - disclaimer
 * ----------------------------------------------------- */
const DEFAULT_PAY_JSON = JSON.stringify(
  {
    id: "alloyPayDemo",
    name: "Payment",
    className: "col-12 col-md-8 mx-auto",
    brandIcon: {
      iconClass: "fa-brands fa-cc-stripe fa-2xl",
      className: "text-primary"
    },
    cardIcon: {
      iconClass: "fa-solid fa-credit-card",
      className: "text-secondary"
    },
    expiryIcon: {
      iconClass: "fa-solid fa-calendar-days",
      className: "text-secondary"
    },
    cvcIcon: {
      iconClass: "fa-solid fa-lock",
      className: "text-secondary"
    },
    submit: {
      name: "Pay now",
      icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
      className: "btn btn-primary w-100 mt-3",
      disabled: false,
      loading: false,
      ariaLabel: "Pay now",
      title: "Pay now"
    },
    disclaimer: "*AlloyMobile do not store your credit card information."
  },
  null,
  2
);

/* -------------------------------------------------------
 * Demo Page
 * ----------------------------------------------------- */

export default function PayPage() {
  const [payJson, setPayJson] = useState(DEFAULT_PAY_JSON);
  const [payParseError, setPayParseError] = useState("");
  const [payOutputJson, setPayOutputJson] = useState(
    "// Interact with Stripe fields and click Pay now to see OutputObject here…"
  );

  /* -------------------------------------------
   * Build PayObject from JSON
   * ----------------------------------------- */
  const payModel = useMemo(() => {
    try {
      const raw = JSON.parse(payJson || "{}");

      const model = new PayObject(raw);
      setPayParseError("");
      return model;
    } catch (e) {
      setPayParseError(String(e.message || e));

      // Safe fallback with disabled button so UI still renders
      return new PayObject({
        id: "alloyPayInvalid",
        name: "Invalid JSON (AlloyPay)",
        className: "col-12 col-md-8 mx-auto",
        submit: {
          name: "Pay (disabled)",
          icon: { iconClass: "fa-solid fa-ban" },
          className: "btn btn-secondary w-100 mt-3",
          disabled: true,
          loading: false,
          ariaLabel: "Pay (disabled)",
          title: "Pay (disabled)"
        },
        disclaimer:
          "Fix the JSON on the left to preview a real payment form."
      });
    }
  }, [payJson]);

  /* -------------------------------------------
   * Global output handler
   * ----------------------------------------- */

  function handlePayOutput(out) {
    const payload =
      out instanceof OutputObject && typeof out.toJSON === "function"
        ? out.toJSON()
        : out;

    setPayOutputJson(JSON.stringify(payload, null, 2));
  }

  /* -------------------------------------------
   * Helpers for reset / format / clear
   * ----------------------------------------- */

  function resetPay() {
    setPayJson(DEFAULT_PAY_JSON);
    setPayOutputJson(
      "// Interact with Stripe fields and click Pay now to see OutputObject here…"
    );
    setPayParseError("");
  }

  function formatPay() {
    try {
      const parsed = JSON.parse(payJson);
      setPayJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error already shown
    }
  }

  /* -------------------------------------------
   * RENDER
   * ----------------------------------------- */

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyPay (Stripe)</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
{`import { Elements, loadStripe } from "@stripe/react-stripe-js";
import { AlloyPay, PayObject } from "alloy-react";

const stripePromise = loadStripe("<your-publishable-key>");

function Example() {
  const payModel = new PayObject(payConfig);

  function handleOutput(out) {
    console.log(out.toJSON ? out.toJSON() : out);
  }

  return (
    <Elements stripe={stripePromise}>
      <AlloyPay pay={payModel} output={handleOutput} />
    </Elements>
  );
}`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12">
          <Elements stripe={stripePromise}>
            <AlloyPay pay={payModel} output={handlePayOutput} />
          </Elements>

          <div className="small text-secondary mt-2 text-center">
            <strong>Pay now</strong> will:
            <br />
            - Call Stripe <code>createPaymentMethod</code> with the card data
            <br />
            - On success, emit an OutputObject where{" "}
            <code>type="pay"</code>, <code>action="Pay now"</code> (or your
            submit button name), and <code>data</code> contains{" "}
            <code>paymentMethodId</code> and the full{" "}
            <code>paymentMethod</code> object from Stripe.
            <br />
            - On error, emit <code>error=true</code> with Stripe error{" "}
            <code>message</code> and <code>code</code>.
          </div>
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              AlloyPay Input JSON (editable)
            </span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={resetPay}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={formatPay}
                title="Format JSON"
              >
                <i
                  className="fa-solid fa-wand-magic-sparkles me-2"
                  aria-hidden="true"
                />
                Format
              </button>
            </div>
          </div>

          <textarea
            className={`form-control font-monospace ${
              payParseError ? "is-invalid" : ""
            }`}
            rows={22}
            value={payJson}
            onChange={(e) => setPayJson(e.target.value)}
            spellCheck={false}
          />
          {payParseError && (
            <div className="invalid-feedback d-block mt-1">
              {payParseError}
            </div>
          )}

          <div className="form-text">
            Required pieces:
            <ul className="mb-0">
              <li>
                <code>submit.icon.iconClass</code> must exist (to satisfy{" "}
                <code>ButtonSubmitObject</code>).
              </li>
              <li>
                <code>brandIcon</code>, <code>cardIcon</code>,{" "}
                <code>expiryIcon</code>, <code>cvcIcon</code> should have{" "}
                <code>iconClass</code> for the relevant FontAwesome icons.
              </li>
              <li>
                <code>name</code> sets the section title (e.g. "Payment").
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Output JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Output (from <code>output</code> callback)
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => setPayOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={payOutputJson}
            onChange={(e) => setPayOutputJson(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            Example (successful payment method creation):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "alloyPayDemo",
  "type": "pay",
  "action": "Pay now",
  "error": false,
  "data": {
    "paymentMethodId": "pm_12345",
    "paymentMethod": { /* full Stripe PaymentMethod */ }
  }
}`}
            </pre>

            Example (error creating payment method):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "alloyPayDemo",
  "type": "pay",
  "action": "error",
  "error": true,
  "data": {
    "message": "Your card was declined.",
    "code": "card_declined"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
