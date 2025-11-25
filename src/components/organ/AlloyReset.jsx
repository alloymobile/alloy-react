// AlloyReset.jsx
import React from "react";

import AlloyForm, { FormObject } from "../tissue/AlloyForm";
import AlloyLink, { LinkObject } from "../cell/AlloyLink.jsx";
import { generateId } from "../../utils/idHelper.js";

export class ResetObject {
  constructor(res = {}) {
    const {
      id,

      title = "Set a new password",
      description = "Enter a strong password and confirm it to reset your account.",
      cardClassName = "bg-white p-3 p-lg-4 rounded-2xl shadow-soft border search-wrap",

      form,

      signin,
      privacy,
      terms,

      signinText = "Remembered your password?",
      termsAndPrivacy = "By updating your password, you agree to our",
    } = res;

    this.id = id ?? generateId("reset");

    this.title = title;
    this.description = description;
    this.cardClassName = cardClassName;

    // ---- Form ----
    if (form instanceof FormObject) {
      this.form = form;
    } else if (form) {
      this.form = new FormObject({
        id: form.id ?? this.id,
        ...form,
      });
    } else {
      // default 2-field reset form
      this.form = new FormObject({
        id: this.id,
        title: "Reset password",
        className: "col-12",
        message: "",
        action: "reset",
        type: "AlloyInputFloatingText",
        submit: {
          name: "Update password",
          icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
          className: "btn btn-primary w-100 mt-3",
          disabled: false,
          loading: false,
          ariaLabel: "Update password",
          title: "Update password",
        },
        fields: [
          {
            name: "password",
            type: "password",
            label: "New password",
            placeholder: "Create a password",
            layout: "floating",
            icon: {
              iconClass: "fa-solid fa-lock",
            },
            required: true,
            passwordStrength: true,
            value: "",
            className: "form-control",
          },
          {
            name: "retypePassword",
            type: "password",
            label: "Re-type password",
            placeholder: "Re-enter password",
            layout: "floating",
            icon: {
              iconClass: "fa-solid fa-lock",
            },
            required: true,
            matchWith: "password",
            value: "",
            className: "form-control",
          },
        ],
      });
    }

    // ---- Links ----
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
 *  - reset  : ResetObject | plain config
 *  - output : (out: OutputObject) => void
 */
export function AlloyReset({ reset, output }) {
  const model =
    reset instanceof ResetObject ? reset : new ResetObject(reset || {});

  function handleFormOutput(out) {
    // bubble AlloyForm output to parent
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

export default AlloyReset;
