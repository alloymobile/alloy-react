// AlloyForget.jsx
import React from "react";

import AlloyForm, { FormObject } from "../tissue/AlloyForm";
import AlloyLink, { LinkObject } from "../cell/AlloyLink.jsx";
import { generateId } from "../../utils/idHelper.js";

export class ForgetObject {
  constructor(res = {}) {
    const {
      id,

      title = "Forgot your password?",
      description = "Enter your email address and we’ll send you reset instructions.",
      cardClassName = "bg-white p-3 p-lg-4 rounded-2xl shadow-soft border search-wrap",

      form,

      // footer links
      signin,
      privacy,
      terms,

      signinText = "Remembered your password?",
      termsAndPrivacy = "By requesting a reset, you agree to our",
    } = res;

    this.id = id ?? generateId("forget");

    this.title = title;
    this.description = description;
    this.cardClassName = cardClassName;

    // ----- Form -----
    // If caller provides a FormObject or plain form config, use that.
    // Otherwise build a default single-email form.
    if (form instanceof FormObject) {
      this.form = form;
    } else if (form) {
      this.form = new FormObject({
        id: form.id ?? this.id,
        ...form,
      });
    } else {
      this.form = new FormObject({
        id: this.id,
        title: "Reset password",
        className: "col-12",
        message: "",
        action: "forget",
        type: "AlloyInputFloatingText",
        submit: {
          name: "Send reset link",
          icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
          className: "btn btn-primary w-100 mt-3",
          disabled: false,
          loading: false,
          ariaLabel: "Send reset link",
          title: "Send reset link",
        },
        fields: [
          {
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "you@example.com",
            layout: "floating",
            icon: {
              iconClass: "fa-regular fa-envelope",
            },
            required: true,
            value: "",
            className: "form-control",
          },
        ],
      });
    }

    // ----- Links -----
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
 *  - forget : ForgetObject | plain config
 *  - output : (out: OutputObject) => void
 */
export function AlloyForget({ forget, output }) {
  const model =
    forget instanceof ForgetObject
      ? forget
      : new ForgetObject(forget || {});

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

export default AlloyForget;
