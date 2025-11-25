// AlloyCode.jsx
import React from "react";

import AlloyForm, { FormObject } from "../tissue/AlloyForm";
import AlloyLink, { LinkObject } from "../cell/AlloyLink.jsx";
import { generateId } from "../../utils/idHelper.js";

export class CodeObject {
  constructor(res = {}) {
    const {
      id,

      title = "Enter verification code",
      description = "We’ve sent a one-time code to your email. Please enter it below to continue.",
      cardClassName = "bg-white p-3 p-lg-4 rounded-2xl shadow-soft border search-wrap",

      form,

      // footer links
      signin,
      privacy,
      terms,

      signinText = "Already verified?",
      termsAndPrivacy = "By confirming this code, you agree to our",
    } = res;

    this.id = id ?? generateId("code");

    this.title = title;
    this.description = description;
    this.cardClassName = cardClassName;

    // -------- Form ----------
    if (form instanceof FormObject) {
      this.form = form;
    } else if (form) {
      this.form = new FormObject({
        id: form.id ?? this.id,
        ...form,
      });
    } else {
      // Default: single code field
      this.form = new FormObject({
        id: this.id,
        title: "Two-factor authentication",
        className: "col-12",
        message: "",
        action: "code",
        type: "AlloyInputFloatingText",
        submit: {
          name: "Verify code",
          icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
          className: "btn btn-primary w-100 mt-3",
          disabled: false,
          loading: false,
          ariaLabel: "Verify code",
          title: "Verify code",
        },
        fields: [
          {
            name: "code",
            type: "text",
            label: "Verification code",
            placeholder: "Enter 6-digit code",
            layout: "floating",
            icon: {
              iconClass: "fa-solid fa-key",
            },
            required: true,
            // Optional: numeric 4-8 digits
            pattern: "^[0-9]{4,8}$",
            value: "",
            className: "form-control",
          },
        ],
      });
    }

    // -------- Links ----------
    this.signin = new LinkObject(
      signin || {
        href: "/signin",
        name: "Sign in",
        className: "fw-semibold text-primary text-decoration-underline",
      }
    );

    this.privacy = new LinkObject(
      privacy || {
        href: "/privacy",
        name: "Privacy Policy",
        className: "fw-semibold text-primary text-decoration-underline",
      }
    );

    this.terms = new LinkObject(
      terms || {
        href: "/terms",
        name: "Terms of Service",
        className: "fw-semibold text-primary text-decoration-underline",
      }
    );

    this.signinText = signinText;
    this.termsAndPrivacy = termsAndPrivacy;
  }
}

/**
 * Props:
 *  - code   : CodeObject | plain config
 *  - output : (out: OutputObject) => void   // from AlloyForm
 */
export function AlloyCode({ code, output }) {
  const model =
    code instanceof CodeObject ? code : new CodeObject(code || {});

  function handleFormOutput(out) {
    // bubble AlloyForm's OutputObject to parent
    output?.(out);
  }

  return (
    <div className={model.cardClassName} id={model.id}>
      {/* Header / title */}
      <div className="text-center mb-3">
        <div className="h4 fw-bold text-gray-800 mb-1">
          {model.title}
        </div>
        {model.description && (
          <div className="text-muted small">{model.description}</div>
        )}
      </div>

      {/* Form block */}
      <div className="mt-3">
        <AlloyForm form={model.form} output={handleFormOutput} />
      </div>

      {/* Sign-in row */}
      <div className="mt-4 text-center small text-muted">
        {model.signinText}{" "}
        <AlloyLink link={model.signin} />
      </div>

      {/* Terms + Privacy row */}
      <p className="mt-2 text-center text-muted small px-2">
        {model.termsAndPrivacy} <AlloyLink link={model.terms} /> and{" "}
        <AlloyLink link={model.privacy} />.
      </p>
    </div>
  );
}

export default AlloyCode;
