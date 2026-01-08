// demo/pages/tissue/TabFormPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyTabForm, TabFormObject } from "../../../src";

/* -------------------------------------------------------
 * Stripe publishable key (passed into Pay tab config)
 * ----------------------------------------------------- */

const STRIPE_PUBLISHABLE_KEY = (() => {
  try {
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

const STRIPE_KEY_OK =
  typeof STRIPE_PUBLISHABLE_KEY === "string" &&
  STRIPE_PUBLISHABLE_KEY.trim().startsWith("pk_");

/* -------------------------------------------------------
 * Embedded object samples (PAY / CARDS)
 * ----------------------------------------------------- */

const ALLOY_PAY_DEMO = {
  id: "alloyPayDemo",
  name: "Payment",
  className: "col-12 col-md-8 mx-auto",

  // New: AlloyPay handles <Elements> internally, so pass the key here.
  publicKey:
    (STRIPE_PUBLISHABLE_KEY && STRIPE_PUBLISHABLE_KEY.trim()) || "pk_test_replace_me",

  // (Optional) keep alias for backward compatibility if your PayObject supports it
  publishableKey:
    (STRIPE_PUBLISHABLE_KEY && STRIPE_PUBLISHABLE_KEY.trim()) || "pk_test_replace_me",

  brandIcon: { iconClass: "fa-brands fa-cc-stripe fa-2xl", className: "text-primary" },
  cardIcon: { iconClass: "fa-solid fa-credit-card", className: "text-secondary" },
  expiryIcon: { iconClass: "fa-solid fa-calendar-days", className: "text-secondary" },
  cvcIcon: { iconClass: "fa-solid fa-lock", className: "text-secondary" },
  submit: {
    name: "Pay now",
    icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
    className: "btn btn-primary w-100 mt-3",
    disabled: false,
    loading: false,
    ariaLabel: "Pay now",
    title: "Pay now",
  },
  disclaimer: "*AlloyMobile do not store your credit card information.",
};

const ALLOY_CARD_DEMO = {
  id: "demoTextCard01",
  className: "card border m-2 shadow",
  header: {
    id: "demoTextHeader",
    className: "card-header fw-semibold",
    name: "Simple Text Card",
  },
  body: {
    id: "demoTextBody",
    className: "card-body p-3",
  },
  fields: [
    {
      id: "txt-title",
      colClass: "col-12",
      className: "fw-semibold fs-5 mb-1",
      name: "Ada Lovelace",
    },
    {
      id: "txt-role",
      colClass: "col-12",
      className: "text-muted mb-1",
      name: "Pioneer of computing",
    },
    {
      id: "txt-note",
      colClass: "col-12",
      className: "small text-secondary",
      name: "This card demonstrates a simple layout with only text fields.",
    },
  ],
  footer: {
    id: "demoTextFooter",
    className: "card-footer text-muted small",
    name: "Footer (optional) — text only",
  },
};

const ALLOY_CARD_DEMO_2 = {
  id: "demoTextCard02",
  className: "card border m-2 shadow",
  header: {
    id: "demoTextHeader2",
    className: "card-header fw-semibold",
    name: "Second Text Card",
  },
  body: {
    id: "demoTextBody2",
    className: "card-body p-3",
  },
  fields: [
    {
      id: "txt2-title",
      colClass: "col-12",
      className: "fw-semibold fs-5 mb-1",
      name: "Grace Hopper",
    },
    {
      id: "txt2-role",
      colClass: "col-12",
      className: "text-muted mb-1",
      name: "Compiler + COBOL",
    },
    {
      id: "txt2-note",
      colClass: "col-12",
      className: "small text-secondary",
      name: 'This card is here to demonstrate Tab type: cards (list of AlloyCard).',
    },
  ],
  footer: {
    id: "demoTextFooter2",
    className: "card-footer text-muted small",
    name: "Footer (optional) — text only",
  },
};

/* -------------------------------------------------------
 * TAB FORM CONFIGS (tabs layout + mixed layout)
 * Supported types: inputs, pay, cards
 * ----------------------------------------------------- */

const TAB_FORM_TABS = {
  id: "client-registration-demo",
  name: "Client Registration Flow (Tabs)",
  status: "draft",
  currentIndex: 0,

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
    {
      id: "tab-inputs",
      key: "inputs",
      type: "inputs",
      title: "Inputs",
      subtitle: "Enter account + company details.",
      order: 1,
      required: true,
      stage: "registration",
      status: "in_progress",
      icon: { iconClass: "fa-regular fa-pen-to-square" },

      className: "col-12 col-lg-6",

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

    {
      id: "tab-pay",
      key: "pay",
      type: "pay",
      title: "Payment",
      subtitle: "Enter payment details.",
      order: 2,
      required: false,
      stage: "registration",
      status: "not_started",
      icon: { iconClass: "fa-solid fa-credit-card" },

      className: "col-12 col-lg-6",

      pay: ALLOY_PAY_DEMO,
    },

    {
      id: "tab-cards",
      key: "cards",
      type: "cards",
      title: "Cards",
      subtitle: "List of cards rendered by AlloyCard (type: cards).",
      order: 3,
      required: false,
      stage: "registration",
      status: "not_started",
      icon: { iconClass: "fa-regular fa-clone" },

      className: "col-12 col-lg-6",

      cards: [ALLOY_CARD_DEMO, ALLOY_CARD_DEMO_2],
    },
  ],
};

const TAB_FORM_MIXED = {
  ...TAB_FORM_TABS,
  id: "client-registration-mixed-demo",
  name: "Client Registration Flow (Mixed)",
  layout: "mixed",
  currentIndex: 0,
};

const DEFAULT_TAB_FORM = JSON.stringify(TAB_FORM_TABS, null, 2);
const DEFAULT_MIXED_FORM = JSON.stringify(TAB_FORM_MIXED, null, 2);

const TAG_SNIPPET = `const model = new TabFormObject(config);
<AlloyTabForm tabForm={model} output={handleOutput} />`;

export default function TabFormPage() {
  const [activeDemo, setActiveDemo] = useState("tabs");

  const [jsonConfigTabs, setJsonConfigTabs] = useState(DEFAULT_TAB_FORM);
  const [jsonConfigMixed, setJsonConfigMixed] = useState(DEFAULT_MIXED_FORM);

  const [submitOutTabs, setSubmitOutTabs] = useState(
    "// Latest OutputObject will appear here (tabs layout)"
  );
  const [submitOutMixed, setSubmitOutMixed] = useState(
    "// Latest OutputObject will appear here (mixed layout)"
  );

  const { model: modelTabs, parseError: parseErrorTabs } = useMemo(() => {
    try {
      const cfg = JSON.parse(jsonConfigTabs);
      const m = new TabFormObject(cfg);
      return { model: m, parseError: "" };
    } catch (e) {
      const msg = String(e?.message || e || "Invalid JSON");
      return {
        model: new TabFormObject({
          id: "invalid-config-tabs",
          name: "Invalid config (tabs)",
          tabs: [
            {
              id: "error-tab-tabs",
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
        }),
        parseError: msg,
      };
    }
  }, [jsonConfigTabs]);

  const { model: modelMixed, parseError: parseErrorMixed } = useMemo(() => {
    try {
      const cfg = JSON.parse(jsonConfigMixed);
      const m = new TabFormObject(cfg);
      return { model: m, parseError: "" };
    } catch (e) {
      const msg = String(e?.message || e || "Invalid JSON");
      return {
        model: new TabFormObject({
          id: "invalid-config-mixed",
          name: "Invalid config (mixed)",
          layout: "mixed",
          tabs: [
            {
              id: "error-tab-mixed",
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
        }),
        parseError: msg,
      };
    }
  }, [jsonConfigMixed]);

  function handleOutputTabs(payload) {
    const plain =
      payload && typeof payload.toJSON === "function" ? payload.toJSON() : payload;
    setSubmitOutTabs(JSON.stringify(plain, null, 2));
  }

  function handleOutputMixed(payload) {
    const plain =
      payload && typeof payload.toJSON === "function" ? payload.toJSON() : payload;
    setSubmitOutMixed(JSON.stringify(plain, null, 2));
  }

  function resetJsonTabs() {
    setJsonConfigTabs(DEFAULT_TAB_FORM);
    setSubmitOutTabs("// Latest OutputObject will appear here (tabs layout)");
  }

  function resetJsonMixed() {
    setJsonConfigMixed(DEFAULT_MIXED_FORM);
    setSubmitOutMixed("// Latest OutputObject will appear here (mixed layout)");
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyTabForm</h3>
      <p className="text-muted text-center mb-4">
        Multi-step flow. Tabs layout renders one tab at a time. Mixed layout renders all
        sections on the same page. Supported types: inputs, pay, cards.
      </p>

      {!STRIPE_KEY_OK && (
        <div className="alert alert-warning small">
          Stripe publishable key is not set. Set{" "}
          <code>VITE_STRIPE_PUBLISHABLE_KEY</code> (or{" "}
          <code>VITE_STRIPE_PUBLIC_KEY</code>) for a working Pay tab. The demo will
          still render.
        </div>
      )}

      <div className="row mb-4">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0 text-center w-100">
            <code>{TAG_SNIPPET}</code>
          </pre>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <ul className="nav nav-tabs justify-content-center" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                type="button"
                id="demo-tabs-tab"
                className={`nav-link ${activeDemo === "tabs" ? "active" : ""}`}
                role="tab"
                aria-controls="demo-tabs-pane"
                aria-selected={activeDemo === "tabs"}
                onClick={() => setActiveDemo("tabs")}
              >
                Tabs layout
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                type="button"
                id="demo-mixed-tab"
                className={`nav-link ${activeDemo === "mixed" ? "active" : ""}`}
                role="tab"
                aria-controls="demo-mixed-pane"
                aria-selected={activeDemo === "mixed"}
                onClick={() => setActiveDemo("mixed")}
              >
                Mixed layout
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="tab-content">
        {/* ----------------------------- TABS LAYOUT DEMO ----------------------------- */}
        <div
          id="demo-tabs-pane"
          className={`tab-pane fade ${activeDemo === "tabs" ? "show active" : ""}`}
          role="tabpanel"
          aria-labelledby="demo-tabs-tab"
        >
          <div className="row mb-2">
            <div className="col-12">
              <h5 className="mb-1">Demo A — Tabs layout</h5>
              <div className="text-muted small">
                One tab visible at a time. Includes a <code>type: "cards"</code> tab.
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-12 mx-auto mb-4">
              <AlloyTabForm tabForm={modelTabs} output={handleOutputTabs} />
            </div>

            <div className="row g-3 align-items-stretch justify-content-center mb-5">
              <div className="col-12 col-lg-6">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold">TabForm JSON (Tabs layout) — editable</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={resetJsonTabs}
                  >
                    Reset
                  </button>
                </div>

                <textarea
                  className={`form-control font-monospace ${
                    parseErrorTabs ? "is-invalid" : ""
                  }`}
                  rows={20}
                  value={jsonConfigTabs}
                  onChange={(e) => setJsonConfigTabs(e.target.value)}
                  spellCheck={false}
                />
                {parseErrorTabs && (
                  <div className="invalid-feedback d-block mt-1">{parseErrorTabs}</div>
                )}

                <div className="form-text">
                  <ul className="mb-0 ps-3">
                    <li>
                      Tab <code>type</code>: <code>"inputs"</code>, <code>"pay"</code>,{" "}
                      <code>"cards"</code>.
                    </li>
                    <li>
                      For <code>type: "pay"</code>, provide <code>pay.publicKey</code> (Stripe
                      publishable key).
                    </li>
                    <li>
                      For <code>type: "cards"</code>, provide <code>cards: []</code> (list of
                      card configs).
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="fw-semibold mb-2 text-center text-lg-start">
                  Latest output (Tabs)
                </div>
                <textarea
                  className="form-control font-monospace bg-light border"
                  rows={20}
                  value={submitOutTabs}
                  readOnly
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------- MIXED LAYOUT DEMO ----------------------------- */}
        <div
          id="demo-mixed-pane"
          className={`tab-pane fade ${activeDemo === "mixed" ? "show active" : ""}`}
          role="tabpanel"
          aria-labelledby="demo-mixed-tab"
        >
          <div className="row mb-2">
            <div className="col-12">
              <h5 className="mb-1">Demo B — Mixed layout</h5>
              <div className="text-muted small">
                <code>layout: "mixed"</code> renders all sections in one page (fieldset/legend
                grouping inside AlloyTabForm).
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-12 mx-auto mb-4">
              <AlloyTabForm tabForm={modelMixed} output={handleOutputMixed} />
            </div>

            <div className="row g-3 align-items-stretch justify-content-center mb-5">
              <div className="col-12 col-lg-6">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold">TabForm JSON (Mixed layout) — editable</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={resetJsonMixed}
                  >
                    Reset
                  </button>
                </div>

                <textarea
                  className={`form-control font-monospace ${
                    parseErrorMixed ? "is-invalid" : ""
                  }`}
                  rows={20}
                  value={jsonConfigMixed}
                  onChange={(e) => setJsonConfigMixed(e.target.value)}
                  spellCheck={false}
                />
                {parseErrorMixed && (
                  <div className="invalid-feedback d-block mt-1">{parseErrorMixed}</div>
                )}

                <div className="form-text">
                  <ul className="mb-0 ps-3">
                    <li>
                      Set <code>layout</code> on the form: <code>"tabs"</code> (default) or{" "}
                      <code>"mixed"</code>.
                    </li>
                    <li>
                      Mixed layout validates all <code>type: "inputs"</code> sections on Finish.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="fw-semibold mb-2 text-center text-lg-start">
                  Latest output (Mixed)
                </div>
                <textarea
                  className="form-control font-monospace bg-light border"
                  rows={20}
                  value={submitOutMixed}
                  readOnly
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
