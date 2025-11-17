// demo/pages/tissue/FormPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyForm, FormObject } from "../../../src";

/* -------------------------------------------------------
 * DEFAULT FORMS (3 variants)
 * NOTE:
 * - We do NOT pass explicit `id`; FormObject will auto-id
 *   via generateId("form") when hydrating.
 *
 * - Each field now includes `className`, which AlloyInput
 *   will use as the base input classNames. If you omit it,
 *   AlloyInput will fall back to Bootstrap defaults.
 *
 * - Submit button gets disabled automatically by AlloyForm
 *   until all fields validate.
 * -----------------------------------------------------*/

/* 1) Plain text inputs */
const DEFAULT_FORM_TEXT = JSON.stringify(
  {
    title: "Sign In (Text Inputs)",
    className: "col-12 col-md-6 col-lg-4 mx-auto",
    message: "",
    action: "login",
    type: "AlloyInputText",

    fields: [
      {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "you@example.com",
        layout: "text",
        required: true,
        value: "",
        className: "form-control"
      },
      {
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "••••••••",
        layout: "text",
        required: true,
        passwordStrength: true,
        value: "",
        className: "form-control"
      }
    ],

    submit: {
      name: "Sign In",
      icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
      className: "btn btn-primary w-100 mt-3",
      disabled: false,
      loading: false,
      ariaLabel: "Submit login form",
      title: "Submit login form"
    }
  },
  null,
  2
);

/* 2) Icon inputs */
const DEFAULT_FORM_ICON = JSON.stringify(
  {
    title: "Contact Support (Icon Inputs)",
    className: "col-12 col-md-6 col-lg-4 mx-auto",
    message: "",
    action: "support",
    type: "AlloyInputTextIcon",

    fields: [
      {
        name: "fullName",
        type: "text",
        label: "Full Name",
        placeholder: "Ada Lovelace",
        layout: "icon",
        icon: { iconClass: "fa-regular fa-user" },
        required: true,
        value: "",
        className: "form-control form-control-lg"
      },
      {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "ada@example.com",
        layout: "icon",
        icon: { iconClass: "fa-regular fa-envelope" },
        required: true,
        value: "",
        className: "form-control"
      },
      {
        name: "message",
        type: "textarea",
        label: "How can we help?",
        placeholder: "Write your issue here...",
        layout: "text",
        required: true,
        minLength: 10,
        value: "",
        className: "form-control"
      }
    ],

    submit: {
      name: "Send Message",
      icon: { iconClass: "fa-solid fa-paper-plane" },
      className: "btn btn-success w-100 mt-3",
      disabled: false,
      loading: false,
      ariaLabel: "Send support request",
      title: "Send support request"
    }
  },
  null,
  2
);

/* 3) Floating label inputs */
const DEFAULT_FORM_FLOAT = JSON.stringify(
  {
    title: "Create Account (Floating Inputs)",
    className: "col-12 col-md-6 col-lg-4 mx-auto",
    message: "",
    action: "signup",
    type: "AlloyInputFloatingText",

    fields: [
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
        label: "Confirm Password",
        placeholder: "Re-enter password",
        layout: "floating",
        icon: { iconClass: "fa-solid fa-lock" },
        required: true,
        matchWith: "password",
        value: "",
        className: "form-control"
      }
    ],

    submit: {
      name: "Sign Up",
      icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
      className: "btn btn-warning w-100 mt-3",
      disabled: false,
      loading: false,
      ariaLabel: "Create account",
      title: "Create account"
    }
  },
  null,
  2
);

/* Tag snippet for display */
const TAG_SNIPPET = `<AlloyForm form={new FormObject(formObject)} output={handleOutput} />`;

export default function FormPage() {
  /* Tabs */
  const TABS = [
    { key: "Text", label: "Text Inputs" },
    { key: "Icon", label: "Icon Inputs" },
    { key: "Float", label: "Floating Inputs" }
  ];
  const [active, setActive] = useState("Text");

  /* Per-tab state */
  const [jsonText, setJsonText] = useState(DEFAULT_FORM_TEXT);
  const [errText, setErrText] = useState("");
  const [submitOutText, setSubmitOutText] = useState("// submit OutputObject here");

  const [jsonIcon, setJsonIcon] = useState(DEFAULT_FORM_ICON);
  const [errIcon, setErrIcon] = useState("");
  const [submitOutIcon, setSubmitOutIcon] = useState("// submit OutputObject here");

  const [jsonFloat, setJsonFloat] = useState(DEFAULT_FORM_FLOAT);
  const [errFloat, setErrFloat] = useState("");
  const [submitOutFloat, setSubmitOutFloat] = useState("// submit OutputObject here");

  /* Hydrate models */
  const modelText = useMemo(() => {
    try {
      setErrText("");
      return new FormObject(JSON.parse(jsonText));
    } catch (e) {
      setErrText(String(e.message || e));
      return new FormObject({
        title: "Invalid JSON (Text Inputs)",
        className: "col-12 col-md-6 col-lg-4 mx-auto",
        message: "Could not parse form JSON.",
        action: "error",
        fields: [],
        submit: {
          name: "Submit",
          icon: { iconClass: "fa-solid fa-triangle-exclamation" },
          className: "btn btn-secondary w-100 mt-3",
          disabled: true,
          loading: false
        }
      });
    }
  }, [jsonText]);

  const modelIcon = useMemo(() => {
    try {
      setErrIcon("");
      return new FormObject(JSON.parse(jsonIcon));
    } catch (e) {
      setErrIcon(String(e.message || e));
      return new FormObject({
        title: "Invalid JSON (Icon Inputs)",
        className: "col-12 col-md-6 col-lg-4 mx-auto",
        message: "Could not parse form JSON.",
        action: "error",
        fields: [],
        submit: {
          name: "Submit",
          icon: { iconClass: "fa-solid fa-triangle-exclamation" },
          className: "btn btn-secondary w-100 mt-3",
          disabled: true,
          loading: false
        }
      });
    }
  }, [jsonIcon]);

  const modelFloat = useMemo(() => {
    try {
      setErrFloat("");
      return new FormObject(JSON.parse(jsonFloat));
    } catch (e) {
      setErrFloat(String(e.message || e));
      return new FormObject({
        title: "Invalid JSON (Floating Inputs)",
        className: "col-12 col-md-6 col-lg-4 mx-auto",
        message: "Could not parse form JSON.",
        action: "error",
        fields: [],
        submit: {
          name: "Submit",
          icon: { iconClass: "fa-solid fa-triangle-exclamation" },
          className: "btn btn-secondary w-100 mt-3",
          disabled: true,
          loading: false
        }
      });
    }
  }, [jsonFloat]);

  /* handle submit from AlloyForm
   * payload is now ALWAYS an OutputObject from AlloyForm
   */
  function handleOutput(tabKey, payload) {
    const plain =
      payload && typeof payload.toJSON === "function"
        ? payload.toJSON()
        : payload;

    const formatted = JSON.stringify(plain, null, 2);

    switch (tabKey) {
      case "Text":
        setSubmitOutText(formatted);
        break;
      case "Icon":
        setSubmitOutIcon(formatted);
        break;
      case "Float":
        setSubmitOutFloat(formatted);
        break;
      default:
        break;
    }
  }

  /* choose active tab binding */
  const tabBindings =
    {
      Text: {
        label: "Text Inputs",
        model: modelText,
        jsonVal: jsonText,
        setJsonVal: setJsonText,
        parseError: errText,
        outVal: submitOutText,
        setOutVal: setSubmitOutText,
        resetJson: () => {
          setJsonText(DEFAULT_FORM_TEXT);
          setSubmitOutText("// submit OutputObject here");
        }
      },
      Icon: {
        label: "Icon Inputs",
        model: modelIcon,
        jsonVal: jsonIcon,
        setJsonVal: setJsonIcon,
        parseError: errIcon,
        outVal: submitOutIcon,
        setOutVal: setSubmitOutIcon,
        resetJson: () => {
          setJsonIcon(DEFAULT_FORM_ICON);
          setSubmitOutIcon("// submit OutputObject here");
        }
      },
      Float: {
        label: "Floating Inputs",
        model: modelFloat,
        jsonVal: jsonFloat,
        setJsonVal: setJsonFloat,
        parseError: errFloat,
        outVal: submitOutFloat,
        setOutVal: setSubmitOutFloat,
        resetJson: () => {
          setJsonFloat(DEFAULT_FORM_FLOAT);
          setSubmitOutFloat("// submit OutputObject here");
        }
      }
    }[active];

  return (
    <div className="container py-3">
      {/* Header */}
      <h3 className="mb-3 text-center">AlloyForm</h3>

      {/* Tabs */}
      <ul className="nav nav-tabs flex-wrap justify-content-center mb-3">
        {TABS.map(({ key, label }) => (
          <li className="nav-item" key={key}>
            <button
              type="button"
              className={`nav-link ${active === key ? "active" : ""}`}
              onClick={() => setActive(key)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* 1. Tag snippet */}
      <div className="row mb-4">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0 text-center w-100">
            <code>{TAG_SNIPPET}</code>
          </pre>
        </div>
      </div>

      {/* 2. Rendered form */}
      <div className="row mb-5">
        <div className="col-12 mx-auto mb-4">
          <AlloyForm
            form={tabBindings.model}
            output={(payload) => handleOutput(active, payload)}
          />
        </div>
      </div>

      {/* 3. Editable JSON + Submit Output */}
      <div className="row g-3 align-items-stretch justify-content-center mb-5">
        {/* Left: editable JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Input JSON (editable) — {tabBindings.label}
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={tabBindings.resetJson}
            >
              Reset
            </button>
          </div>

          <textarea
            className={`form-control font-monospace ${
              tabBindings.parseError ? "is-invalid" : ""
            }`}
            rows={18}
            value={tabBindings.jsonVal}
            onChange={(e) => tabBindings.setJsonVal(e.target.value)}
            spellCheck={false}
          />
          {tabBindings.parseError && (
            <div className="invalid-feedback d-block mt-1">
              {tabBindings.parseError}
            </div>
          )}

          <div className="form-text">
            <ul className="mb-0 ps-3">
              <li>
                Each entry in <code>fields[]</code> becomes an{" "}
                <code>&lt;AlloyInput/&gt;</code>. You can pass{" "}
                <code>className</code> per field to control the input's
                classes; if you omit it, Bootstrap defaults are used.
              </li>
              <li>
                <code>layout</code> can be <code>"text"</code>,{" "}
                <code>"icon"</code>, or <code>"floating"</code>. For{" "}
                <code>"icon"</code> / <code>"floating"</code> you must pass{" "}
                <code>icon</code>.
              </li>
              <li>
                The submit button comes from <code>submit</code>. It will be
                auto-disabled until all fields pass validation (required,
                minLength, passwordStrength, matchWith, etc.).
              </li>
            </ul>
          </div>
        </div>

        {/* Right: latest submit output mirror */}
        <div className="col-12 col-lg-6">
          <div className="fw-semibold mb-2 text-center text-lg-start">
            Submit Output (OutputObject from <code>AlloyForm</code>)
          </div>
          <textarea
            className="form-control font-monospace bg-light border"
            rows={18}
            value={tabBindings.outVal}
            readOnly
            spellCheck={false}
          />
          <div className="form-text">
            On submit, <code>AlloyForm</code> emits a single{" "}
            <code>OutputObject</code>:
            <ul className="mb-0 ps-3">
              <li>
                <code>type</code> is always <code>"form"</code>.
              </li>
              <li>
                <code>action</code> is <code>"submit"</code>.
              </li>
              <li>
                <code>data</code> contains the form snapshot:
                <code>id</code>, <code>name</code>, <code>action</code>,{" "}
                <code>event</code>, <code>values</code>, and{" "}
                <code>fields</code> (per-field validity + errors).
              </li>
              <li>
                <code>error</code> is <code>true</code> if ANY field is
                invalid.
              </li>
              <li>
                <code>errorMessage</code> is an array of all field errors,
                prefixed with the field name (e.g.{" "}
                <code>"email: This field is required."</code>).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
