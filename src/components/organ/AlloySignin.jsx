// AlloySignin.jsx
import React from "react";

import AlloyForm, { FormObject } from "../tissue/AlloyForm.jsx";
import AlloyLink, { LinkObject } from "../cell/AlloyLink.jsx";
import { generateId } from "../../utils/idHelper.js";

export class SigninObject {
  constructor(res = {}) {
    const {
      id,

      // Card / header content
      title = "Sign in to PExChange",
      description = "Access your dashboard, listings, and marketplace tools.",
      cardClassName = "bg-white p-3 p-lg-4 rounded-2xl shadow-soft border search-wrap",

      // Underlying form config (required)
      form,

      // Footer links
      signup,
      privacy,
      terms,

      // Footer text
      signupText = "Don’t have an account?",
      termsAndPrivacy = "By signing in, you agree to our",
    } = res;

    this.id = id ?? generateId("signin");

    this.title = title;
    this.description = description;
    this.cardClassName = cardClassName;

    // ----- Form (required) -----
    if (!form) {
      throw new Error("SigninObject requires `form` (FormObject or config).");
    }

    if (form instanceof FormObject) {
      this.form = form;
    } else {
      this.form = new FormObject({
        id: form.id ?? this.id,
        ...form,
      });
    }

    // ----- Links (must be valid LinkObject configs) -----
    // You will typically provide these from JSON just like Signup.
    this.signup = new LinkObject(signup);
    this.privacy = new LinkObject(privacy);
    this.terms = new LinkObject(terms);

    this.signupText = signupText;
    this.termsAndPrivacy = termsAndPrivacy;

    // In SigninObject constructor, after signup/privacy/terms
    this.forgetPassword = new LinkObject({
      href: res.forgetPassword?.forgetPasswordHref || "/forget",
      name: res.forgetPassword?.forgetPasswordText || "Forgot Password",
      className: "fw-semibold text-primary text-decoration-underline",
    });
  }
}

/**
 * Props:
 *  - signin  : SigninObject | plain config
 *  - output : (out: OutputObject) => void
 */
export function AlloySignin({ signin, output }) {
  const model =
    signin instanceof SigninObject ? signin : new SigninObject(signin || {});

  function handleFormOutput(out) {
    // Just bubble up AlloyForm's OutputObject
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

      {/* Signup row + Forgot Password*/}
      <div className="mt-4 text-center small text-muted">
        {model.signupText}{" "}
        <AlloyLink link={model.signup} />
      </div>
      <div className="mt-2 text-center small text-muted">
        <AlloyLink link={model.forgetPassword} />
      </div>

      {/* Terms + Privacy row */}
      <p className="mt-2 text-center text-muted small px-2">
        {model.termsAndPrivacy} <AlloyLink link={model.terms} /> and{" "}
        <AlloyLink link={model.privacy} />.
      </p>
    </div>
  );
}

export default AlloySignin;
