// src/pages/Organ/Donate.jsx
import React, { useMemo, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { AlloyDonate, DonateObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------
 * Stripe bootstrap
 * ----------------------------------------- */

// Put real key in .env as VITE_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51PxXXXXXX_ReplaceWithRealDemoKey"
);

/* -------------------------------------------
 * DEFAULT JSON CONFIG
 * ----------------------------------------- */

const DEFAULT_DONATE_JSON = JSON.stringify(
  {
    id: "donateForm",
    title: "Donate to Alloy Foundation",
    className: "col m-2",
    message: "",
    action: "Donate now",
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
        name: "note",
        label: "Note (optional)",
        type: "text",
        layout: "icon",
        placeholder: "Leave a short note for us",
        icon: { iconClass: "fa-regular fa-comment" }
      }
    ],
    amountBar: {
      id: "donateAmountBar",
      className: "nav gap-2 my-3",
      buttonClass: "btn btn-outline-secondary",
      barName: { show: false },
      type: "AlloyButton",
      buttons: [
        {
          id: "amt10",
          name: "$10",
          className: "btn btn-outline-secondary",
          ariaLabel: "Donate 10 dollars",
          title: "Donate 10 dollars",
          value: 10
        },
        {
          id: "amt25",
          name: "$25",
          className: "btn btn-outline-secondary",
          ariaLabel: "Donate 25 dollars",
          title: "Donate 25 dollars",
          value: 25
        },
        {
          id: "amt50",
          name: "$50",
          className: "btn btn-outline-secondary",
          ariaLabel: "Donate 50 dollars",
          title: "Donate 50 dollars",
          value: 50
        }
      ]
    },
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
        name: "Donate securely",
        icon: { iconClass: "fa-solid fa-heart" },
        className: "btn btn-primary w-100 mt-3",
        ariaLabel: "Donate securely",
        title: "Donate securely"
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

export default function DonatePage() {
  const [donateJson, setDonateJson] = useState(DEFAULT_DONATE_JSON);
  const [donateParseError, setDonateParseError] = useState("");
  const [donateOutputJson, setDonateOutputJson] = useState(
    "// Change donor details, pick an amount and submit payment to see OutputObject here…"
  );

  const donateModel = useMemo(() => {
    try {
      const raw = JSON.parse(donateJson || "{}");
      const model = new DonateObject(raw);
      setDonateParseError("");
      return model;
    } catch (e) {
      setDonateParseError(String(e.message || e));

      return new DonateObject({
        title: "Invalid JSON (AlloyDonate)",
        message: "Fix JSON on the left to see donate demo."
      });
    }
  }, [donateJson]);

  function handleDonateOutput(out) {
    const payload =
      out instanceof OutputObject && typeof out.toJSON === "function"
        ? out.toJSON()
        : out;

    setDonateOutputJson(JSON.stringify(payload, null, 2));
  }

  function resetDonate() {
    setDonateJson(DEFAULT_DONATE_JSON);
    setDonateOutputJson(
      "// Change donor details, pick an amount and submit payment to see OutputObject here…"
    );
    setDonateParseError("");
  }

  function formatDonate() {
    try {
      const parsed = JSON.parse(donateJson);
      setDonateJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error already shown
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyDonate</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
{`<Elements stripe={stripePromise}>
  <AlloyDonate
    donate={new DonateObject(donateObject)}
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
            <AlloyDonate
              donate={donateModel}
              output={handleDonateOutput}
            />
          </Elements>

          <div className="small text-secondary mt-2 text-center">
            Donor fields emit <code>action="field"</code> with the updated
            value and snapshot of all donor data. <br />
            Clicking a preset amount emits <code>action="amount"</code> with the
            selected amount. <br />
            When you click <code>Donate securely</code>, AlloyPay emits once,
            and AlloyDonate wraps it with donor + amount into a single
            OutputObject.
          </div>
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Donate Input JSON (editable)</span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={resetDonate}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={formatDonate}
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
              donateParseError ? "is-invalid" : ""
            }`}
            rows={22}
            value={donateJson}
            onChange={(e) => setDonateJson(e.target.value)}
            spellCheck={false}
          />
          {donateParseError && (
            <div className="invalid-feedback d-block mt-1">
              {donateParseError}
            </div>
          )}

          <div className="form-text">
            <code>fields[]</code> → donor inputs via{" "}
            <code>{"<AlloyInput />"}</code>. <code>amountBar</code> feeds{" "}
            <code>{"<AlloyButtonBar />"}</code>. <code>pay</code> feeds{" "}
            <code>{"<AlloyPay />"}</code>.
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
              onClick={() => setDonateOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={donateOutputJson}
            onChange={(e) => setDonateOutputJson(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            You’ll see <code>field</code> and <code>amount</code> events while
            interacting, and a single <code>Donate securely</code> event
            containing donor info, chosen amount, and Stripe payload on submit.
          </div>
        </div>
      </div>
    </div>
  );
}
