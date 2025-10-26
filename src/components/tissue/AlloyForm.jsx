import React, {
  useMemo,
  useState,
  useRef,
  useCallback
} from "react";

import AlloyInput, { InputObject } from "../cell/AlloyInput.jsx";
import {
  AlloyButtonSubmit,
  ButtonSubmitObject
} from "../cell/AlloyButtonSubmit.jsx";

import { generateId } from "../../utils/idHelper.js";

/* ------------------------------------------------------------------
 * FormObject
 *
 * A normalized "form model" that AlloyForm consumes.
 *
 * Fields:
 *   - id          : unique form id. Auto via generateId("form") if missing.
 *   - title       : heading shown above the form
 *   - className   : wrapper column classes ("col m-2" by default)
 *   - message     : alert text shown above fields ("" hides it)
 *   - action      : opaque string you get back on submit
 *   - type        : informational only (e.g. "AlloyInputTextIcon")
 *
 *   - submit      : ButtonSubmitObject config for the submit CTA
 *   - fields[]    : array of InputObject configs
 *
 *   - data        : last submitted snapshot (AlloyForm will mutate it)
 * ------------------------------------------------------------------ */
export class FormObject {
  constructor(res = {}) {
    const {
      id,
      title = "AlloyMobile",
      className = "col m-2",
      message = "",
      action = "",
      type = "AlloyInputTextIcon",
      submit,
      fields,
      data
    } = res;

    // Consistent ID creation across the app.
    // If caller didn't supply an id, we generate one with the shared helper.
    this.id = id ?? generateId("form");

    this.title = title;
    this.className = className;
    this.message = message;
    this.action = action;
    this.type = type;

    // hydrate submit into ButtonSubmitObject
    this.submit =
      submit instanceof ButtonSubmitObject
        ? submit
        : new ButtonSubmitObject(
            submit || {
              // sane defaults
              name: "Submit",
              icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
              className: "btn btn-primary w-100 mt-3",
              disabled: false,
              loading: false,
              ariaLabel: "Submit",
              title: "Submit"
            }
          );

    // hydrate fields into InputObject[]
    const rawFields = Array.isArray(fields) ? fields : [];
    this.fields = rawFields.map((fld) =>
      fld instanceof InputObject ? fld : new InputObject(fld)
    );

    // remember last submit snapshot
    this.data = data ?? {};
  }
}

/* ------------------------------------------------------------------
 * validateField(fieldDef, value, allValues)
 *
 * Runs core validation for a single field:
 *   - required
 *   - minLength / maxLength
 *   - pattern
 *   - passwordStrength
 *   - matchWith (compare to some other field by name)
 *
 * Returns { valid, error, errors[] }
 * ------------------------------------------------------------------ */
function validateField(fieldDef, value, allValues) {
  let isValid = true;
  const errs = [];

  // required
  if (fieldDef.required) {
    if (fieldDef.type === "checkbox") {
      const arrVal = Array.isArray(value) ? value : [];
      if (arrVal.length === 0) {
        isValid = false;
        errs.push("This field is required.");
      }
    } else {
      const empty =
        value === "" ||
        value === false ||
        value === undefined ||
        value === null;
      if (empty) {
        isValid = false;
        errs.push("This field is required.");
      }
    }
  }

  // minLength
  if (
    isValid &&
    typeof fieldDef.minLength === "number" &&
    typeof value === "string" &&
    value.length < fieldDef.minLength
  ) {
    isValid = false;
    errs.push(`Minimum length is ${fieldDef.minLength}`);
  }

  // maxLength
  if (
    isValid &&
    typeof fieldDef.maxLength === "number" &&
    typeof value === "string" &&
    value.length > fieldDef.maxLength
  ) {
    isValid = false;
    errs.push(`Maximum length is ${fieldDef.maxLength}`);
  }

  // pattern
  if (
    isValid &&
    fieldDef.pattern &&
    typeof value === "string" &&
    !(new RegExp(fieldDef.pattern).test(value))
  ) {
    isValid = false;
    errs.push("Invalid format.");
  }

  // passwordStrength
  if (isValid && fieldDef.passwordStrength && typeof value === "string") {
    // must contain:
    // - lowercase
    // - uppercase
    // - digit
    // - at least 8 chars
    const strongRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/;
    if (!strongRegex.test(value)) {
      isValid = false;
      errs.push("Password is too weak.");
    }
  }

  // matchWith
  if (isValid && fieldDef.matchWith) {
    const otherName = fieldDef.matchWith;
    const otherVal = allValues[otherName];
    if (otherVal !== value) {
      isValid = false;
      errs.push("Values do not match.");
    }
  }

  return {
    valid: isValid,
    error: !isValid,
    errors: errs
  };
}

/* ------------------------------------------------------------------
 * AlloyForm
 *
 * Props:
 *   - form: FormObject | plain JSON config
 *   - output?: (finalOut:any) => void
 *
 * Behavior:
 *   - Hydrates the model into a FormObject (so IDs/fields are normalized).
 *   - Tracks value+validation for every field in internal state.
 *   - Disables submit until all fields are valid.
 *   - On submit, emits { ...values, action: form.action } via `output`.
 *
 * Accessibility:
 *   - Each AlloyInput already handles aria-invalid and aria-live for errors.
 * ------------------------------------------------------------------ */
export function AlloyForm({ form, output }) {
  //
  // 1. Hydrate prop -> FormObject with consistent IDs.
  //
  const hydrated =
    form instanceof FormObject ? form : new FormObject(form || {});

  if (
    !hydrated ||
    !Array.isArray(hydrated.fields) ||
    !(hydrated.submit instanceof ButtonSubmitObject)
  ) {
    throw new Error(
      "AlloyForm could not hydrate a valid FormObject (missing fields[] or submit)."
    );
  }

  //
  // 2. Initialize per-field state.
  //    We'll keep { value, valid, error, errors } for each field by name.
  //
  const [fieldState, setFieldState] = useState(() => {
    const init = {};

    // gather initial values so matchWith works on first pass
    const initialValues = {};
    hydrated.fields.forEach((fld) => {
      initialValues[fld.name] = fld.value;
    });

    hydrated.fields.forEach((fld) => {
      const val = fld.value;
      const { valid, error, errors } = validateField(
        fld,
        val,
        initialValues
      );
      init[fld.name] = {
        value: val,
        valid,
        error,
        errors
      };
    });

    return init;
  });

  const submitRef = useRef(null);

  //
  // 3. recomputeAllValidity(draftFieldState)
  //    Given a draft of { [fname]: {value,...} }, run validation on all fields,
  //    including cross-field checks like matchWith.
  //
  const recomputeAllValidity = useCallback(
    (draftFieldState) => {
      const valuesMap = {};
      Object.keys(draftFieldState).forEach((fname) => {
        valuesMap[fname] = draftFieldState[fname].value;
      });

      const nextState = {};
      hydrated.fields.forEach((fld) => {
        const currentVal = valuesMap[fld.name];
        const { valid, error, errors } = validateField(
          fld,
          currentVal,
          valuesMap
        );
        nextState[fld.name] = {
          value: currentVal,
          valid,
          error,
          errors
        };
      });

      return nextState;
    },
    [hydrated.fields]
  );

  //
  // 4. When a field updates (AlloyInput.output),
  //    update that one field's value, then fully revalidate.
  //
  function handleFieldOutput(fieldPayload) {
    if (!fieldPayload || !fieldPayload.name) return;
    const { name, value } = fieldPayload;

    setFieldState((prev) => {
      const draft = { ...prev };
      draft[name] = {
        ...prev[name],
        value
      };

      return recomputeAllValidity(draft);
    });
  }

  //
  // 5. Build a flat { [fieldName]: value } map for submit.
  //
  const dataPayload = useMemo(() => {
    const out = {};
    Object.keys(fieldState).forEach((fname) => {
      out[fname] = fieldState[fname].value;
    });
    return out;
  }, [fieldState]);

  //
  // 6. Disable submit if ANY field invalid.
  //
  const isAnyInvalid = useMemo(() => {
    return Object.values(fieldState).some(
      (f) => f.error || !f.valid
    );
  }, [fieldState]);

  //
  // 7. Submit handler.
  //
  function handleSubmit(btnModel /* ButtonSubmitObject */, e) {
    const finalOut = {
      ...dataPayload,
      action: hydrated.action
    };

    // snapshot on the hydrated form instance
    hydrated.data = finalOut;
    hydrated.message = "";

    output?.(finalOut);
  }

  //
  // 8. Keep submit button disabled/reactive.
  //
  hydrated.submit.disabled =
    isAnyInvalid || !!hydrated.submit.loading;

  //
  // 9. Render the form block.
  //
  return (
    <div className="row">
      <div className={hydrated.className}>
        <div className="text-center">
          {/* Title */}
          <h3>{hydrated.title}</h3>

          {/* message / alert area */}
          {hydrated.message !== "" && (
            <div className="alert alert-text-danger m-0 p-0">
              {hydrated.message}
            </div>
          )}

          {/* Fields */}
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
