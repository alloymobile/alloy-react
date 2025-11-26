// src/lib/components/organ/AlloyProfile.jsx
import React from "react";

import { OutputObject } from "../../utils/idHelper.js";

import AlloyForm, { FormObject } from "../tissue/AlloyForm.jsx";
// NOTE: adjust path if your AlloyCrud lives elsewhere
import AlloyCrud, { CrudObject } from "../organ/AlloyCrud.jsx";
import { AlloyIcon, IconObject } from "../cell/AlloyIcon.jsx";

/* -------------------------------------------------------
 * ProfileObject  (AlloyProfile model)
 *
 * Fields:
 *   id, className, action, profileForm, data, address
 *   name?: string
 *   email?: string
 *   icon?: IconObject | plain config
 *
 * address is a CrudObject (used by AlloyCrud)
 * ----------------------------------------------------- */
export class ProfileObject {
  constructor(res = {}) {
    const {
      id,
      className = "col m-2",
      action = "",
      profileForm,
      data,
      address,
      name = "",
      email = "",
      icon,
      ...rest
    } = res || {};

    this.id = id ?? "profile";
    this.className = className;
    this.action = action;

    // Profile header bits
    this.name = name;
    this.email = email;

    this.icon =
      icon instanceof IconObject
        ? icon
        : new IconObject(
            icon || {
              iconClass: "fa-solid fa-user fa-2xl",
            }
          );

    // Form
    this.profileForm =
      profileForm instanceof FormObject
        ? profileForm
        : new FormObject(profileForm || {});

    // Optional payload snapshot
    this.data = data || {};

    // Address CRUD (AlloyCrud)
    this.address =
      address instanceof CrudObject
        ? address
        : new CrudObject(address || {});

    Object.assign(this, rest);
  }
}

/* -------------------------------------------------------
 * AlloyProfile (view)
 *
 * Props:
 *   - profile: ProfileObject
 *   - output?: (out: OutputObject) => void
 *
 * Layout:
 *   - Left: profile avatar + name + email (3 cols on lg)
 *   - Right: AlloyForm (profileForm)
 *   - Below: "Address:" heading + AlloyCrud (address)
 *
 * Output semantics:
 *   - Form submit:
 *       {
 *         id: "<profile.id>",
 *         type: "profile",
 *         action: "form.submit",
 *         error: <boolean>,
 *         data: <AlloyForm data payload>
 *       }
 *
 *   - Address (AlloyCrud) events:
 *       {
 *         id: "<profile.id>",
 *         type: "profile",
 *         action: "address.<innerAction>",
 *         error: <boolean>,
 *         data: <inner data>
 *       }
 * ----------------------------------------------------- */
export function AlloyProfile({ profile, output }) {
  if (!profile || !(profile instanceof ProfileObject)) {
    throw new Error("AlloyProfile requires `profile` (ProfileObject instance).");
  }

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  /* ----------------- Handlers ----------------- */

  // From AlloyForm
  const handleFormOutput = (formOut) => {
    if (!formOut || formOut.type !== "form") return;

    const base =
      formOut instanceof OutputObject && typeof formOut.toJSON === "function"
        ? formOut.toJSON()
        : formOut;

    const wrapped = new OutputObject({
      id: profile.id,
      type: "profile",
      action: "form.submit",
      error: !!base.error,
      data: base.data || {},
    });

    emit(wrapped);
  };

  // From AlloyCrud (address)
  const handleAddressOutput = (innerOut) => {
    if (!innerOut) return;

    const base =
      innerOut instanceof OutputObject && typeof innerOut.toJSON === "function"
        ? innerOut.toJSON()
        : innerOut;

    const wrapped = new OutputObject({
      id: profile.id,
      type: "profile",
      action: `address.${base.action || "unknown"}`,
      error: !!base.error,
      data: base.data || {},
    });

    emit(wrapped);
  };

  /* ----------------- Render ----------------- */

  return (
    <div id={profile.id} className={profile.className}>
      {/* Top row: avatar + form */}
      <div className="row m-2">
        {/* Left: avatar + basic info */}
        <div className="col-md-12 col-lg-3">
          <div className="card h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <div className="m-2 text-center p-3 border bg-dark rounded-circle text-white">
                <AlloyIcon icon={profile.icon} />
              </div>
              <div className="text-center">
                <span>{profile.name}</span>
              </div>
              <div className="text-center">
                <span>{profile.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: profile form */}
        <div className="col-md-12 col-lg-9">
          <AlloyForm form={profile.profileForm} output={handleFormOutput} />
        </div>
      </div>

      <hr />

      {/* Address via AlloyCrud */}
      <h4>Address:</h4>
      <AlloyCrud crud={profile.address} output={handleAddressOutput} />
    </div>
  );
}

export default AlloyProfile;
