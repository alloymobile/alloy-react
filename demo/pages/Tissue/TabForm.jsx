// demo/pages/tissue/TabFormPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyTabForm, TabFormObject } from "../../../src";

/* -------------------------------------------------------
 * DEFAULT TAB FORM CONFIG (for AlloyTabForm)
 * ----------------------------------------------------- */

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
        type: "button"
      },
      next: {
        id: "btn-next",
        label: "Next",
        icon: { iconClass: "fa-solid fa-arrow-right" },
        className: "btn btn-primary btn-sm",
        type: "button"
      },
      finish: {
        id: "btn-finish",
        label: "Finish",
        icon: { iconClass: "fa-regular fa-circle-check" },
        className: "btn btn-success btn-sm",
        type: "button"
      }
    },

    tabs: [
      /* STEP 1: Account */
      {
        id: "tab-account",
        key: "account",
        title: "Account",
        subtitle: "Create your login credentials.",
        order: 1,
        required: true,
        stage: "registration",
        status: "in_progress",
        icon: { iconClass: "fa-regular fa-user" },

        // NEW schema: flat inputs per tab
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
            className: "form-control"
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
            className: "form-control"
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
            className: "form-control"
          }
        ]
      },

      /* STEP 2: Company */
      {
        id: "tab-company",
        key: "company",
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
            className: "form-control"
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
            className: "form-control"
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
            className: "form-control"
          }
        ]
      },

      /* STEP 3: Review & Submit */
      {
        id: "tab-review",
        key: "review",
        title: "Review",
        subtitle: "Confirm everything before submitting.",
        order: 3,
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
            className: "form-check-input"
          }
        ]
      }
    ]
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
    "// AlloyTabForm OutputObject (id, type, action, data.currentIndex, data.currentTabKey, data.values, data.errors) will appear here"
  );

  // Hydrate TabFormObject from JSON
  const model = useMemo(() => {
    try {
      setParseError("");
      const cfg = JSON.parse(jsonConfig);
      return new TabFormObject(cfg);
    } catch (e) {
      setParseError(String(e.message || e));
      // Minimal fallback so the demo always renders — using new schema
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
            inputs: []
          }
        ]
      });
    }
  }, [jsonConfig]);

  function handleOutput(payload) {
    const plain =
      payload && typeof payload.toJSON === "function"
        ? payload.toJSON()
        : payload;

    setSubmitOut(JSON.stringify(plain, null, 2));
  }

  function resetJson() {
    setJsonConfig(DEFAULT_TAB_FORM);
    setSubmitOut(
      "// AlloyTabForm OutputObject (id, type, action, data.currentIndex, data.currentTabKey, data.values, data.errors) will appear here"
    );
  }

  return (
    <div className="container py-3">
      {/* Header */}
      <h3 className="mb-3 text-center">AlloyTabForm</h3>
      <p className="text-muted text-center mb-4">
        Multi-step approval / registration flow. Each tab defines its own
        inputs; AlloyTabForm renders the steps, handles Previous / Next /
        Finish (via AlloyButtonIcon), and emits a single OutputObject per
        action.
      </p>

      {/* Tag snippet */}
      <div className="row mb-4">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0 text-center w-100">
            <code>{TAG_SNIPPET}</code>
          </pre>
        </div>
      </div>

      {/* 1. Rendered multi-step form */}
      <div className="row mb-5">
        <div className="col-12 mx-auto mb-4">
          <AlloyTabForm tabForm={model} output={handleOutput} />
        </div>
      </div>

      {/* 2. Editable JSON + latest Output */}
      <div className="row g-3 align-items-stretch justify-content-center mb-5">
        {/* Left: editable JSON config */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              TabForm JSON (editable) — 3-step registration flow
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
            className={`form-control font-monospace ${
              parseError ? "is-invalid" : ""
            }`}
            rows={20}
            value={jsonConfig}
            onChange={(e) => setJsonConfig(e.target.value)}
            spellCheck={false}
          />
          {parseError && (
            <div className="invalid-feedback d-block mt-1">
              {parseError}
            </div>
          )}

          <div className="form-text">
            <ul className="mb-0 ps-3">
              <li>
                <code>tabs[]</code> is an ordered list of steps.
              </li>
              <li>
                Each tab defines <code>inputs[]</code> (same configs as{" "}
                <code>AlloyInput</code>); the layout is handled by{" "}
                <code>AlloyTabForm</code> (one centered column).
              </li>
              <li>
                Use <code>icon</code> on the tab to show a Font Awesome icon in
                the tab header.
              </li>
              <li>
                Optionally provide <code>navButtons.previous</code>,{" "}
                <code>navButtons.next</code>,{" "}
                <code>navButtons.finish</code> to customize the{" "}
                <code>AlloyButtonIcon</code> instances used for navigation.
                When omitted, default buttons are used.
              </li>
            </ul>
          </div>
        </div>

        {/* Right: latest OutputObject */}
        <div className="col-12 col-lg-6">
          <div className="fw-semibold mb-2 text-center text-lg-start">
            Latest AlloyTabForm output
          </div>
          <textarea
            className="form-control font-monospace bg-light border"
            rows={20}
            value={submitOut}
            readOnly
            spellCheck={false}
          />
          <div className="form-text">
            The OutputObject from <code>AlloyTabForm</code> has:
            <ul className="mb-0 ps-3">
              <li>
                <code>id</code> – the flow id (
                <code>client-registration-demo</code> in the demo).
              </li>
              <li>
                <code>type</code> – always <code>"tab-form"</code>.
              </li>
              <li>
                <code>action</code> – <code>"draft"</code> for Previous/Next,{" "}
                <code>"submit"</code> for Finish.
              </li>
              <li>
                <code>data.currentIndex</code> and{" "}
                <code>data.currentTabKey</code> – the current wizard position.
              </li>
              <li>
                <code>data.values</code> – accumulated values per tabKey, e.g.{" "}
                <code>{`values.account.email`}</code>,{" "}
                <code>{`values.company.companyName`}</code>.
              </li>
              <li>
                <code>data.errors</code> (only when{" "}
                <code>error === true</code>) – per-tab, per-field messages, e.g.:
                <br />
                <code>{`errors.company.country = ["This field is required."]`}</code>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
