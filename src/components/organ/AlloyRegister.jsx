// AlloyRegister.jsx
import React from "react";

import AlloyForm, { FormObject } from "../tissue/AlloyForm";
import AlloyLink, { LinkObject } from "../cell/AlloyLink.jsx";
import { generateId } from "../../utils/idHelper.js";

export class RegisterObject {
  constructor(res = {}) {
    const {
      id,

      title = "Create your PExChange account",
      description = "Register to manage listings, equipment, and marketplace tools.",
      cardClassName = "bg-white p-3 p-lg-4 rounded-2xl shadow-soft border search-wrap",

      // underlying AlloyForm config (optional – we will build a default if missing)
      form,

      // footer links
      signin,
      privacy,
      terms,

      signinText = "Already have an account?",
      termsAndPrivacy = "By registering, you agree to our",
    } = res;

    this.id = id ?? generateId("register");

    this.title = title;
    this.description = description;
    this.cardClassName = cardClassName;

    // ----- Form -----
    // If caller provides a FormObject or plain form config, use that.
    // Otherwise, build a default 4-field form (email, fullName, password, retypePassword).
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
        title: "Create Account",
        className: "col-12",
        message: "",
        action: "register",
        type: "AlloyInputFloatingText",
        submit: {
          name: "Create Account",
          icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
          className: "btn btn-primary w-100 mt-3",
          disabled: false,
          loading: false,
          ariaLabel: "Create account",
          title: "Create account",
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
          {
            name: "fullName",
            type: "text",
            label: "Full name",
            placeholder: "Your full name",
            layout: "floating",
            icon: {
              iconClass: "fa-regular fa-user",
            },
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
 *  - register : RegisterObject | plain config
 *  - output   : (out: OutputObject) => void    // AlloyForm output
 */
export function AlloyRegister({ register, output }) {
  const model =
    register instanceof RegisterObject
      ? register
      : new RegisterObject(register || {});

  function handleFormOutput(out) {
    // Just bubble AlloyForm's OutputObject up to the parent
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

export default AlloyRegister;
