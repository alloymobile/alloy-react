// demo/pages/tissue/TabFormPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyTabForm, TabFormObject } from "../../../src";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

/* -------------------------------------------------------
 * DEFAULT TAB FORM CONFIG (for AlloyTabForm)
 * ----------------------------------------------------- */

const STRIPE_PUBLISHABLE_KEY = (() => {
  try {
    // Vite
    if (typeof import.meta !== "undefined" && import.meta.env) {
      return (
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
        import.meta.env.VITE_STRIPE_PUBLIC_KEY ||
        ""
      );
    }
  } catch (e) {}
  return "";
})();

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY || "pk_test_replace_me");

const DEFAULT_TAB_FORM = JSON.stringify(
  {
    id: "client-registration-demo",
    name: "Client Registration Flow",
    status: "draft",
    currentIndex: 0,

    // Optional: navButtons for AlloyButtonIcon
    navButtons: {
      previous: {
        id: "btn-prev",
        label: "Previous",
        icon: { iconClass: "fa-solid fa-arrow-left" },
        className: "btn btn-outline-secondary btn-sm",
        type: "button",
      },
      next: {
        id: "btn-next",
        label: "Next",
        icon: { iconClass: "fa-solid fa-arrow-right" },
        className: "btn btn-primary btn-sm",
        type: "button",
      },
      finish: {
        id: "btn-finish",
        label: "Finish",
        icon: { iconClass: "fa-regular fa-circle-check" },
        className: "btn btn-success btn-sm",
        type: "button",
      },
    },

    tabs: [
      /* STEP 1: Account */
      {
        id: "tab-account",
        key: "account",
        type: "inputs",
        title: "Account",
        subtitle: "Create your login credentials.",
        order: 1,
        required: true,
        stage: "registration",
        status: "in_progress",
        icon: { iconClass: "fa-regular fa-user" },

        inputs: [
          {
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "you@example.com",
            layout: "floating",
            icon: { iconClass: "fa-regular fa-envelope" },
            required: true,
            value: "",
            className: "form-control",
          },
          {
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "Create a password",
            layout: "floating",
            icon: { iconClass: "fa-solid fa-lock" },
            required: true,
            passwordStrength: true,
            value: "",
            className: "form-control",
          },
          {
            name: "confirmPassword",
            type: "password",
            label: "Confirm password",
            placeholder: "Re-enter password",
            layout: "floating",
            icon: { iconClass: "fa-solid fa-lock" },
            required: true,
            matchWith: "password",
            value: "",
            className: "form-control",
          },
        ],
      },

      /* STEP 2: Company */
      {
        id: "tab-company",
        key: "company",
        type: "inputs",
        title: "Company",
        subtitle: "Tell us about your company.",
        order: 2,
        required: true,
        stage: "registration",
        status: "not_started",
        icon: { iconClass: "fa-regular fa-building" },

        inputs: [
          {
            name: "companyName",
            type: "text",
            label: "Company name",
            placeholder: "ACME Concrete Ltd.",
            layout: "floating",
            icon: { iconClass: "fa-regular fa-building" },
            required: true,
            value: "",
            className: "form-control",
          },
          {
            name: "country",
            type: "text",
            label: "Country",
            placeholder: "Canada",
            layout: "floating",
            icon: { iconClass: "fa-solid fa-globe" },
            required: true,
            value: "",
            className: "form-control",
          },
          {
            name: "website",
            type: "url",
            label: "Website (optional)",
            placeholder: "https://example.com",
            layout: "floating",
            icon: { iconClass: "fa-solid fa-link" },
            required: false,
            value: "",
            className: "form-control",
          },
        ],
      },

      /* STEP 3: CRUD */
      {
        id: "tab-crud",
        key: "crud",
        type: "crud",
        title: "CRUD",
        subtitle: "Manage embedded data (CRUD).",
        order: 3,
        required: false,
        stage: "registration",
        status: "not_started",
        icon: { iconClass: "fa-solid fa-database" },

        crud: {
          id: "demo-crud",
          className: "container-fluid",
          type: "card",

          search: {
            name: "demoCrudSearch",
            id: "demoCrudSearch",
            type: "text",
            layout: "icon",
            icon: { iconClass: "fa-solid fa-magnifying-glass" },
            label: "Search",
            placeholder: "Search…",
            className: "form-control",
          },

          add: {
            id: "demoCrudAdd",
            name: "Add",
            icon: { iconClass: "fa-solid fa-plus" },
            className: "btn btn-primary btn-sm",
            type: "button",
          },

          modal: {
            id: "demoCrudModal",
            title: "Demo CRUD",
            action: "create",
            submit: {
              name: "Save",
              className: "btn btn-primary",
              type: "button",
            },
            fields: [
              {
                name: "name",
                type: "text",
                label: "Name",
                layout: "floating",
                required: true,
                value: "",
                className: "form-control",
              },
              {
                name: "email",
                type: "email",
                label: "Email",
                layout: "floating",
                required: false,
                value: "",
                className: "form-control",
              },
            ],
            data: {
              name: "",
              email: "",
            },
          },

          document: [],
        },
      },

      /* STEP 4: Pay */
      {
        id: "tab-pay",
        key: "pay",
        type: "pay",
        title: "Payment",
        subtitle: "Enter payment details.",
        order: 4,
        required: false,
        stage: "registration",
        status: "not_started",
        icon: { iconClass: "fa-solid fa-credit-card" },

        pay: {
          id: "demoPay",
          name: "Payment",
          className: "col-12 col-md-8 col-lg-6 mx-auto",
          disclaimer: "*Demo only. Use your Stripe publishable key for Elements.",
          submit: {
            name: "Pay now",
            icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
            className: "btn btn-primary w-100 mt-3",
            disabled: false,
            loading: false,
            ariaLabel: "Pay now",
            title: "Pay now",
          },
        },
      },

      /* STEP 5: Review & Submit */
      {
        id: "tab-review",
        key: "review",
        type: "inputs",
        title: "Review",
        subtitle: "Confirm everything before submitting.",
        order: 5,
        required: true,
        stage: "registration",
        status: "not_started",
        icon: { iconClass: "fa-solid fa-clipboard-check" },

        inputs: [
          {
            name: "confirm",
            type: "checkbox",
            label: "I confirm the information provided is correct.",
            layout: "text",
            required: true,
            value: false,
            className: "form-check-input",
          },
        ],
      },
    ],
  },
  null,
  2
);

const TAG_SNIPPET = `const model = new TabFormObject(config);
<AlloyTabForm tabForm={model} output={handleOutput} />`;

export default function TabFormPage() {
  const [jsonConfig, setJsonConfig] = useState(DEFAULT_TAB_FORM);
  const [parseError, setParseError] = useState("");
  const [submitOut, setSubmitOut] = useState(
    "// Latest OutputObject will appear here (tab-form nav, input, crud, pay)"
  );

  const model = useMemo(() => {
    try {
      setParseError("");
      const cfg = JSON.parse(jsonConfig);
      return new TabFormObject(cfg);
    } catch (e) {
      setParseError(String(e.message || e));
      return new TabFormObject({
        id: "invalid-config",
        name: "Invalid config",
        tabs: [
          {
            id: "error-tab",
            key: "error",
            title: "Invalid JSON",
            order: 1,
            required: false,
            stage: "error",
            status: "in_progress",
            type: "inputs",
            inputs: [],
          },
        ],
      });
    }
  }, [jsonConfig]);

  function handleOutput(payload) {
    const plain =
      payload && typeof payload.toJSON === "function" ? payload.toJSON() : payload;

    setSubmitOut(JSON.stringify(plain, null, 2));
  }

  function resetJson() {
    setJsonConfig(DEFAULT_TAB_FORM);
    setSubmitOut("// Latest OutputObject will appear here (tab-form nav, input, crud, pay)");
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyTabForm</h3>
      <p className="text-muted text-center mb-4">
        Multi-step flow. Each tab renders ONE type: inputs (default), crud, or pay.
        Child components emit their own OutputObject and AlloyTabForm forwards it to
        the parent.
      </p>

      <div className="row mb-4">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0 text-center w-100">
            <code>{TAG_SNIPPET}</code>
          </pre>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12 mx-auto mb-4">
          <Elements stripe={stripePromise}>
            <AlloyTabForm tabForm={model} output={handleOutput} />
          </Elements>
        </div>
      </div>

      <div className="row g-3 align-items-stretch justify-content-center mb-5">
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              TabForm JSON (editable) — inputs + crud + pay
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={resetJson}
            >
              Reset
            </button>
          </div>

          <textarea
            className={`form-control font-monospace ${parseError ? "is-invalid" : ""}`}
            rows={20}
            value={jsonConfig}
            onChange={(e) => setJsonConfig(e.target.value)}
            spellCheck={false}
          />
          {parseError && <div className="invalid-feedback d-block mt-1">{parseError}</div>}

          <div className="form-text">
            <ul className="mb-0 ps-3">
              <li>
                <code>tabs[]</code> is an ordered list of steps.
              </li>
              <li>
                Each tab can set <code>type</code>: <code>"inputs"</code>,{" "}
                <code>"crud"</code>, <code>"pay"</code>.
              </li>
              <li>
                For <code>type: "inputs"</code>, provide <code>inputs[]</code> (AlloyInput configs).
              </li>
              <li>
                For <code>type: "crud"</code>, provide <code>crud</code> (AlloyCrud config).
              </li>
              <li>
                For <code>type: "pay"</code>, provide <code>pay</code> (AlloyPay config; requires Stripe Elements).
              </li>
            </ul>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="fw-semibold mb-2 text-center text-lg-start">
            Latest output
          </div>
          <textarea
            className="form-control font-monospace bg-light border"
            rows={20}
            value={submitOut}
            readOnly
            spellCheck={false}
          />
          <div className="form-text">
            Outputs you may see:
            <ul className="mb-0 ps-3">
              <li>
                <code>type: "tab-form"</code> for Previous/Next/Finish (includes{" "}
                <code>data.navAction</code>).
              </li>
              <li>
                Input events from <code>AlloyInput</code> (change/blur/etc).
              </li>
              <li>
                <code>type: "crud"</code> events from <code>AlloyCrud</code>.
              </li>
              <li>
                <code>type: "pay"</code> events from <code>AlloyPay</code>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
