// AlloySignup.jsx
import React from "react";

import AlloyForm, { FormObject } from "../tissue/AlloyForm";
import AlloyLink, { LinkObject } from "../cell/AlloyLink.jsx";
import { generateId } from "../../utils/idHelper.js";

export class SignupObject {
  constructor(res = {}) {
    const {
      id,

      title = "Join PExChange",
      description = "Create your account to access the full marketplace.",
      cardClassName = "bg-white p-3 p-lg-4 rounded-2xl shadow-soft border search-wrap",

      form,

      signin,
      privacy,
      terms,

      signinText = "Already have an account?",
      termsAndPrivacy = "By signing up, you agree to our",
    } = res;

    this.id = id ?? generateId("signup");

    this.title = title;
    this.description = description;
    this.cardClassName = cardClassName;

    if (!form) {
      throw new Error("SignupObject requires `form` (FormObject or config).");
    }

    // ensure we end up with a FormObject
    if (form instanceof FormObject) {
      this.form = form;
    } else {
      this.form = new FormObject({
        id: form.id ?? this.id,
        ...form,
      });
    }

    this.signin = new LinkObject(signin);
    this.privacy = new LinkObject(privacy);
    this.terms = new LinkObject(terms);

    this.signinText = signinText;
    this.termsAndPrivacy = termsAndPrivacy;
  }
}

/**
 * Props:
 *  - signup  : SignupObject | plain config
 *  - output  : (out: OutputObject) => void
 */
export function AlloySignup({ signup, output}) {
  const model =
    signup instanceof SignupObject ? signup : new SignupObject(signup || {});

  // Push parent-controlled state into underlying form model
  if (typeof loading === "boolean") {
    model.form.submit.loading = loading;
    model.form.submit.disabled = loading;
  }

  if (typeof message === "string") {
    model.form.message = message;
  }

  function handleFormOutput(out) {
    // just bubble up AlloyForm's OutputObject
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
        {model.termsAndPrivacy} <AlloyLink link={model.terms} /> and <AlloyLink link={model.privacy} />.
      </p>
    </div>
  );
}

export default AlloySignup;
