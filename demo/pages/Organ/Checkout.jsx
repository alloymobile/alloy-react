// src/pages/Organ/Checkout.jsx
import React, { useMemo, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { AlloyCheckout, CheckoutObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------
 * Stripe bootstrap
 * ----------------------------------------- */

// Put your real publishable key in .env:
// VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx...
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51PxXXXXXX_ReplaceWithRealDemoKey"
);

/* -------------------------------------------
 * DEFAULT JSON CONFIG
 * ----------------------------------------- */

const DEFAULT_CHECKOUT_JSON = JSON.stringify(
  {
    id: "checkoutForm",
    title: "AlloyMobile Checkout",
    className: "col m-2",
    message: "",
    action: "Pay 25 CAD",
    fields: [
      {
        name: "fullName",
        label: "Full name",
        type: "text",
        layout: "icon",
        placeholder: "John Doe",
        icon: { iconClass: "fa-solid fa-user" },
        required: true,
        minLength: 3
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        layout: "icon",
        placeholder: "you@example.com",
        icon: { iconClass: "fa-solid fa-envelope" },
        required: true
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        layout: "icon",
        placeholder: "123 Main Street",
        icon: { iconClass: "fa-solid fa-location-dot" },
        required: true
      },
      {
        name: "city",
        label: "City",
        type: "text",
        layout: "icon",
        placeholder: "Toronto",
        icon: { iconClass: "fa-solid fa-city" }
      }
    ],
    pay: {
      name: "Payment",
      brandIcon: {
        iconClass: "fa-brands fa-stripe fa-2xl"
      },
      cardIcon: {
        iconClass: "fa-solid fa-credit-card"
      },
      expiryIcon: {
        iconClass: "fa-regular fa-calendar"
      },
      cvcIcon: {
        iconClass: "fa-solid fa-key"
      },
      submit: {
        name: "Pay 25 CAD",
        icon: { iconClass: "fa-solid fa-lock" },
        className: "btn btn-primary w-100 mt-3",
        ariaLabel: "Pay 25 CAD",
        title: "Pay 25 CAD"
      },
      disclaimer:
        "*AlloyMobile does not store your credit card information."
    }
  },
  null,
  2
);

/* -------------------------------------------
 * Demo Page
 * ----------------------------------------- */

export default function CheckoutPage() {
  const [checkoutJson, setCheckoutJson] = useState(DEFAULT_CHECKOUT_JSON);
  const [checkoutParseError, setCheckoutParseError] = useState("");
  const [checkoutOutputJson, setCheckoutOutputJson] = useState(
    "// Change billing fields and submit payment to see OutputObject here…"
  );

  const checkoutModel = useMemo(() => {
    try {
      const raw = JSON.parse(checkoutJson || "{}");
      const model = new CheckoutObject(raw);
      setCheckoutParseError("");
      return model;
    } catch (e) {
      setCheckoutParseError(String(e.message || e));

      return new CheckoutObject({
        title: "Invalid JSON (AlloyCheckout)",
        message: "Fix JSON on the left to see checkout demo."
      });
    }
  }, [checkoutJson]);

  function handleCheckoutOutput(out) {
    const payload =
      out instanceof OutputObject && typeof out.toJSON === "function"
        ? out.toJSON()
        : out;

    setCheckoutOutputJson(JSON.stringify(payload, null, 2));
  }

  function resetCheckout() {
    setCheckoutJson(DEFAULT_CHECKOUT_JSON);
    setCheckoutOutputJson(
      "// Change billing fields and submit payment to see OutputObject here…"
    );
    setCheckoutParseError("");
  }

  function formatCheckout() {
    try {
      const parsed = JSON.parse(checkoutJson);
      setCheckoutJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore, error already shown
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyCheckout</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
{`<Elements stripe={stripePromise}>
  <AlloyCheckout
    checkout={new CheckoutObject(checkoutObject)}
    output={handleOutput}
  />
</Elements>`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12">
          <Elements stripe={stripePromise}>
            <AlloyCheckout
              checkout={checkoutModel}
              output={handleCheckoutOutput}
            />
          </Elements>

          <div className="small text-secondary mt-2 text-center">
            Billing fields emit <code>action="field"</code> with the updated
            value and a snapshot of all values. <br />
            When you click <code>Pay 25 CAD</code>, AlloyPay emits once, and
            AlloyCheckout wraps it with the current billing data.
          </div>
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Checkout Input JSON (editable)
            </span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={resetCheckout}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={formatCheckout}
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
              checkoutParseError ? "is-invalid" : ""
            }`}
            rows={22}
            value={checkoutJson}
            onChange={(e) => setCheckoutJson(e.target.value)}
            spellCheck={false}
          />
          {checkoutParseError && (
            <div className="invalid-feedback d-block mt-1">
              {checkoutParseError}
            </div>
          )}

          <div className="form-text">
            <code>fields[]</code> are hydrated into <code>InputObject</code>{" "}
            and rendered via <code>{"<AlloyInput />"}</code>. The{" "}
            <code>pay</code> block feeds into <code>{"<AlloyPay />"}</code>.
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
              onClick={() => setCheckoutOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={checkoutOutputJson}
            onChange={(e) => setCheckoutOutputJson(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            You’ll see <code>action="field"</code> events as you type, and a
            single <code>action="Pay 25 CAD"</code> event when you submit
            payment, containing both billing and Stripe payloads.
          </div>
        </div>
      </div>
    </div>
  );
}
