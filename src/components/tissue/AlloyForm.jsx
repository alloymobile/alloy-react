// src/components/tissue/AlloyForm.jsx
import React, { useMemo, useState, useRef } from "react";

import AlloyInput, { InputObject } from "../cell/AlloyInput.jsx";
import {
  AlloyButtonSubmit,
  ButtonSubmitObject,
} from "../cell/AlloyButtonSubmit.jsx";

/* ---------------------- id generator ---------------------- */
let __formCounter = 0;
function nextFormId() {
  __formCounter += 1;
  return `alloyform${__formCounter}`;
}

/* ---------------------- Model ---------------------- */
export class FormObject {
  /**
   * @param {{
   *   id?: string,
   *   title?: string,
   *   className?: string,
   *   message?: string,
   *   action?: string,
   *   type?: string,
   *   submit?: ButtonSubmitObject|object,
   *   fields?: Array<InputObject|object>,
   *   data?: Record<string, any>,
   * }} [res]
   */
  constructor(res = {}) {
    this.id = res.id ?? nextFormId();
    this.title = res.title ?? "AlloyMobile";
    this.className = res.className ?? "col m-2";
    this.message = res.message ?? "";
    this.action = res.action ?? "";
    this.type = res.type ?? "AlloyInputTextIcon"; // informational / legacy from Angular

    // --- submit button hydration ---
    this.submit =
      res.submit instanceof ButtonSubmitObject
        ? res.submit
        : new ButtonSubmitObject(
            res.submit || {
              name: "Submit",
              icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
              className: "btn btn-primary w-100 mt-3",
              disabled: false,
              loading: false,
              ariaLabel: "Submit",
              title: "Submit",
            }
          );

    // --- fields hydration ---
    const rawFields = Array.isArray(res.fields) ? res.fields : [];
    this.fields = rawFields.map((fld) =>
      fld instanceof InputObject ? fld : new InputObject(fld)
    );

    // Angular parity: store last submitted payload here
    this.data = res.data ?? {};
  }
}

/* ---------------------- Component ---------------------- */
/**
 * Props:
 *  - form: FormObject | plain JSON config
 *  - output?: (payload:any) => void
 *
 * Behavior:
 *   • We SELF-HYDRATE the incoming `form` prop into a FormObject instance.
 *     So callers can pass either `new FormObject(...)` OR raw JSON.
 *
 *   • We render:
 *       - title
 *       - message (alert)
 *       - each field as <AlloyInput/>
 *       - a submit button <AlloyButtonSubmit/>
 *
 *   • We locally track field values + validity (fieldState).
 *     AlloyInput feeds us {name,value,valid,error,errors}.
 *
 *   • Before rendering submit, we force-disable it if any invalid fields.
 *
 *   • On submit:
 *        finalOut = { ...allFieldValues, action: hydrated.action }
 *     We copy that to hydrated.data, clear hydrated.message, and emit finalOut.
 *
 *   • AlloyButtonSubmit itself handles loading/disabled so the user
 *     can't spam-click.
 */
export function AlloyForm({ form, output }) {
  // ---------- 1. Hydrate incoming form prop ----------
  let hydrated;
  if (form instanceof FormObject) {
    hydrated = form;
  } else {
    hydrated = new FormObject(form || {});
  }

  // Now hydrated is guaranteed to have:
  //   hydrated.fields (array)
  //   hydrated.submit (ButtonSubmitObject)
  //   hydrated.action (string)
  // etc.

  // If something is wildly wrong (edge case), guard:
  if (
    !hydrated ||
    !Array.isArray(hydrated.fields) ||
    !(hydrated.submit instanceof ButtonSubmitObject)
  ) {
    throw new Error(
      "AlloyForm could not hydrate a valid FormObject (missing fields[] or submit)."
    );
  }

  // ---------- 2. Internal state for each field ----------
  // fieldState shape:
  // {
  //   [fieldName]: {
  //     value: any,
  //     valid: boolean,
  //     error: boolean,
  //     errors: string[]
  //   }
  // }
  const [fieldState, setFieldState] = useState(() => {
    const init = {};
    hydrated.fields.forEach((fld) => {
      const startVal = fld.value;
      let validGuess = true;

      if (fld.required) {
        if (fld.type === "checkbox") {
          const arrVal = Array.isArray(startVal) ? startVal : [];
          validGuess = arrVal.length > 0;
        } else {
          validGuess = !(
            startVal === "" ||
            startVal === false ||
            startVal === undefined ||
            startVal === null
          );
        }
      }

      init[fld.name] = {
        value: startVal,
        valid: validGuess,
        error: !validGuess && !!fld.required,
        errors:
          !validGuess && !!fld.required
            ? ["This field is required."]
            : [],
      };
    });
    return init;
  });

  // ref in case parent wants access to the submit button node/model
  const submitRef = useRef(null);

  // ---------- 3. Compute derived data (payload + validity) ----------
  const dataPayload = useMemo(() => {
    const out = {};
    Object.keys(fieldState).forEach((fname) => {
      out[fname] = fieldState[fname].value;
    });
    return out;
  }, [fieldState]);

  const isAnyInvalid = useMemo(() => {
    return Object.values(fieldState).some((f) => f.error || !f.valid);
  }, [fieldState]);

  // ---------- 4. Handle per-field updates from AlloyInput ----------
  // AlloyInput will emit:
  // { id, name, value, valid, error, errors }
  function handleFieldOutput(fieldPayload) {
    if (!fieldPayload || !fieldPayload.name) return;

    const { name, value, valid, error, errors } = fieldPayload;

    setFieldState((prev) => ({
      ...prev,
      [name]: {
        value,
        valid,
        error,
        errors: Array.isArray(errors) ? errors : [],
      },
    }));
  }

  // ---------- 5. Handle final submit ----------
  // AlloyButtonSubmit calls us with (btnModel, e)
  function handleSubmit(btnModel /* ButtonSubmitObject */, e) {
    const finalOut = {
      ...dataPayload,
      action: hydrated.action,
    };

    // keep parity with Angular
    hydrated.data = finalOut;
    hydrated.message = "";

    output?.(finalOut);
  }

  // ---------- 6. Before render, sync disabled state on submit ----------
  hydrated.submit.disabled = isAnyInvalid || hydrated.submit.disabled === true;

  // ---------- 7. Render ----------
  return (
    <div className="row">
      <div className={hydrated.className}>
        <div className="text-center">
          {/* Title */}
          <h3>{hydrated.title}</h3>

          {/* Message alert */}
          {hydrated.message !== "" && (
            <div className="alert alert-text-danger m-0 p-0">
              {hydrated.message}
            </div>
          )}

          {/* Inputs */}
          {hydrated.fields.map((fld) => (
            <AlloyInput
              key={fld.id}
              input={fld}
              output={handleFieldOutput}
            />
          ))}

          {/* Submit */}
          <AlloyButtonSubmit
            ref={submitRef}
            buttonSubmit={hydrated.submit}
            output={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default AlloyForm;
