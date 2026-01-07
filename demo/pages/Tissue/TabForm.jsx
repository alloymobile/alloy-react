// demo/pages/tissue/TabFormPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyTabForm, TabFormObject } from "../../../src";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

/* -------------------------------------------------------
 * Stripe publishable key
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

const stripePromise = loadStripe(
  (STRIPE_PUBLISHABLE_KEY && STRIPE_PUBLISHABLE_KEY.trim()) || "pk_test_replace_me"
);

/* -------------------------------------------------------
 * Embedded object samples (CRUD / PAY / CARD)
 * ----------------------------------------------------- */

const VENDOR_CRUD_CARD = {
  id: "vendorCrudCard",
  className: "container-fluid",
  type: "card",
  documentClass: "col-sm-6 col-md-4 col-lg-3 mb-3",
  modal: {
    id: "vendorCardModal",
    title: "Vendor",
    className: "modal fade",
    action: "Create",
    submit: {
      name: "Create",
      className: "btn btn-primary",
      active: "active",
    },
    fields: [
      { name: "id", label: "Vendor ID", type: "hidden", layout: "text" },
      {
        name: "vendorName",
        label: "Vendor Name",
        type: "text",
        layout: "text",
        placeholder: "Enter vendor name",
        required: true,
        minLength: 3,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        layout: "text",
        placeholder: "name@example.com",
        required: true,
      },
      { name: "city", label: "City", type: "text", layout: "text", placeholder: "Toronto" },
      {
        name: "status",
        label: "Status",
        type: "select",
        layout: "text",
        options: [
          { value: "active", label: "Active" },
          { value: "pending", label: "Pending" },
          { value: "inactive", label: "Inactive" },
        ],
        value: "active",
        required: true,
      },
    ],
    data: {
      id: "",
      vendorName: "",
      email: "",
      city: "",
      status: "active",
    },
  },
  toast: {
    id: "vendorCardDeleteToast",
    title: "Delete Vendor",
    className: "modal fade",
    action: "deleteVendorConfirmed",
    submit: {
      name: "Delete",
      className: "btn btn-danger",
      active: "active",
    },
    message: "Are you sure you want to delete this vendor card? This action cannot be undone.",
  },
  search: {
    name: "vendorSearchCard",
    id: "vendorSearchCard",
    type: "text",
    layout: "icon",
    icon: { iconClass: "fa-solid fa-magnifying-glass" },
    label: "Search Vendors",
    placeholder: "Search by name, email, city…",
    className: "form-control",
  },
  add: {
    id: "addVendorCardButton",
    name: "Add vendor",
    icon: { iconClass: "fa-solid fa-plus" },
    className: "btn btn-primary",
    title: "Add Vendor",
    ariaLabel: "Add Vendor",
  },
  document: [
    {
      id: "v001",
      className: "card border shadow-sm h-100",
      link: "",
      header: { name: "Alpha Precast Ltd.", className: "card-header fw-bold" },
      body: { name: "Toronto • Active", className: "card-body pb-2" },
      fields: [
        { name: "v001", className: "d-none", tag: "div", id: "id" },
        { name: "Alpha Precast Ltd.", className: "d-none", tag: "div", id: "vendorName" },
        { name: "active", className: "d-none", tag: "div", id: "status" },
        { name: "info@alphaprecast.com", className: "small text-muted", tag: "div", id: "email" },
        { name: "Toronto", className: "small", tag: "div", id: "city" },
      ],
      footer: { name: "", className: "card-footer bg-transparent border-0 pt-0" },
      type: "AlloyButtonBar",
      action: {
        type: "AlloyButtonIcon",
        className: "nav justify-content-end gap-2",
        buttonClass: "nav-item",
        selected: "active",
        buttons: [
          {
            id: "editVendorCardBtn1",
            name: "Edit",
            icon: { iconClass: "fa-solid fa-pen" },
            className: "btn btn-outline-primary btn-sm",
          },
          {
            id: "deleteVendorCardBtn1",
            name: "Delete",
            icon: { iconClass: "fa-solid fa-trash" },
            className: "btn btn-outline-danger btn-sm",
          },
        ],
      },
    },
    {
      id: "v002",
      className: "card border shadow-sm h-100",
      link: "",
      header: { name: "Beta Concrete Inc.", className: "card-header fw-bold" },
      body: { name: "Hamilton • Pending", className: "card-body pb-2" },
      fields: [
        { name: "v002", className: "d-none", tag: "div", id: "id" },
        { name: "Beta Concrete Inc.", className: "d-none", tag: "div", id: "vendorName" },
        { name: "pending", className: "d-none", tag: "div", id: "status" },
        { name: "contact@betaconcrete.com", className: "small text-muted", tag: "div", id: "email" },
        { name: "Hamilton", className: "small", tag: "div", id: "city" },
      ],
      footer: { name: "", className: "card-footer bg-transparent border-0 pt-0" },
      type: "AlloyButtonBar",
      action: {
        type: "AlloyButtonIcon",
        className: "nav justify-content-end gap-2",
        buttonClass: "nav-item",
        selected: "active",
        buttons: [
          {
            id: "editVendorCardBtn2",
            name: "Edit",
            icon: { iconClass: "fa-solid fa-pen" },
            className: "btn btn-outline-primary btn-sm",
          },
          {
            id: "deleteVendorCardBtn2",
            name: "Delete",
            icon: { iconClass: "fa-solid fa-trash" },
            className: "btn btn-outline-danger btn-sm",
          },
        ],
      },
    },
  ],
  page: {
    id: "vendorPageCard",
    name: "Vendors (cards)",
    className: "d-flex justify-content-end align-items-center mt-3",
    listClassName: "pagination justify-content-end mb-0",
    itemClassName: "page-item",
    activeClassName: "active",
    disabledClassName: "disabled",
    totalPages: 5,
    totalElements: 200,
    last: false,
    numberOfElements: 12,
    size: 12,
    number: 0,
    first: true,
    empty: false,
  },
};

const ALLOY_PAY_DEMO = {
  id: "alloyPayDemo",
  name: "Payment",
  className: "col-12 col-md-8 mx-auto",
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

/* -------------------------------------------------------
 * DEFAULT TAB FORM CONFIG (for AlloyTabForm)
 * ----------------------------------------------------- */

const DEFAULT_TAB_FORM = JSON.stringify(
  {
    id: "client-registration-demo",
    name: "Client Registration Flow",
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
        id: "tab-crud",
        key: "crud",
        type: "crud",
        title: "CRUD",
        subtitle: "Manage embedded data (CRUD).",
        order: 2,
        required: false,
        stage: "registration",
        status: "not_started",
        icon: { iconClass: "fa-solid fa-database" },
        crud: VENDOR_CRUD_CARD,
      },

      {
        id: "tab-pay",
        key: "pay",
        type: "pay",
        title: "Payment",
        subtitle: "Enter payment details.",
        order: 3,
        required: false,
        stage: "registration",
        status: "not_started",
        icon: { iconClass: "fa-solid fa-credit-card" },
        pay: ALLOY_PAY_DEMO,
      },

      {
        id: "tab-summary",
        key: "summary",
        type: "card",
        title: "Summary",
        subtitle: "Summary view rendered by AlloyCard.",
        order: 4,
        required: false,
        stage: "registration",
        status: "not_started",
        icon: { iconClass: "fa-solid fa-clipboard-check" },
        card: ALLOY_CARD_DEMO,
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
  const [submitOut, setSubmitOut] = useState(
    "// Latest OutputObject will appear here (tab-form nav, input, crud, pay, card)"
  );

  const { model, parseError } = useMemo(() => {
    try {
      const cfg = JSON.parse(jsonConfig);
      const m = new TabFormObject(cfg);
      return { model: m, parseError: "" };
    } catch (e) {
      const msg = String(e?.message || e || "Invalid JSON");
      return {
        model: new TabFormObject({
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
        }),
        parseError: msg,
      };
    }
  }, [jsonConfig]);

  function handleOutput(payload) {
    const plain =
      payload && typeof payload.toJSON === "function" ? payload.toJSON() : payload;
    setSubmitOut(JSON.stringify(plain, null, 2));
  }

  function resetJson() {
    setJsonConfig(DEFAULT_TAB_FORM);
    setSubmitOut(
      "// Latest OutputObject will appear here (tab-form nav, input, crud, pay, card)"
    );
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyTabForm</h3>
      <p className="text-muted text-center mb-4">
        Multi-step flow. Each tab renders ONE type: inputs (default), crud, pay, or
        card. Child components emit their own OutputObject and AlloyTabForm forwards
        it to the parent.
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
              TabForm JSON (editable) — inputs + crud + pay + card
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
          {parseError && (
            <div className="invalid-feedback d-block mt-1">{parseError}</div>
          )}

          <div className="form-text">
            <ul className="mb-0 ps-3">
              <li>
                Each tab can set <code>type</code>: <code>"inputs"</code>,{" "}
                <code>"crud"</code>, <code>"pay"</code>, <code>"card"</code>.
              </li>
              <li>
                For <code>type: "inputs"</code>, provide <code>inputs[]</code>.
              </li>
              <li>
                For <code>type: "crud"</code>, provide <code>crud</code>.
              </li>
              <li>
                For <code>type: "pay"</code>, provide <code>pay</code> (Stripe Elements).
              </li>
              <li>
                For <code>type: "card"</code>, provide <code>card</code>.
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
        </div>
      </div>
    </div>
  );
}
