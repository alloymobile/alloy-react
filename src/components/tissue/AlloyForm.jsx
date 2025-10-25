import React, { useMemo, useState, useRef, useCallback } from "react";

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
  constructor(res = {}) {
    this.id = res.id ?? nextFormId();
    this.title = res.title ?? "AlloyMobile";
    this.className = res.className ?? "col m-2";
    this.message = res.message ?? "";
    this.action = res.action ?? "";
    this.type = res.type ?? "AlloyInputTextIcon"; // informational only

    // hydrate submit
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

    // hydrate fields
    const rawFields = Array.isArray(res.fields) ? res.fields : [];
    this.fields = rawFields.map((fld) =>
      fld instanceof InputObject ? fld : new InputObject(fld)
    );

    // last submitted data snapshot
    this.data = res.data ?? {};
  }
}

/* ---------------------- helpers ---------------------- */

/**
 * Run validation rules for a single field value,
 * using the field definition and (optionally) other field values
 * for things like matchWith.
 *
 * Returns { valid:boolean, error:boolean, errors:string[] }
 */
function validateField(fieldDef, value, allValues) {
  let isValid = true;
  const errs = [];

  // 1. required
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

  // 2. minLength
  if (
    isValid &&
    typeof fieldDef.minLength === "number" &&
    typeof value === "string" &&
    value.length < fieldDef.minLength
  ) {
    isValid = false;
    errs.push(`Minimum length is ${fieldDef.minLength}`);
  }

  // 3. maxLength
  if (
    isValid &&
    typeof fieldDef.maxLength === "number" &&
    typeof value === "string" &&
    value.length > fieldDef.maxLength
  ) {
    isValid = false;
    errs.push(`Maximum length is ${fieldDef.maxLength}`);
  }

  // 4. pattern
  if (
    isValid &&
    fieldDef.pattern &&
    typeof value === "string" &&
    !(new RegExp(fieldDef.pattern).test(value))
  ) {
    isValid = false;
    errs.push("Invalid format.");
  }

  // 5. passwordStrength (only if explicitly required on this field)
  if (isValid && fieldDef.passwordStrength && typeof value === "string") {
    // must contain:
    // - lowercase
    // - uppercase
    // - digit
    // - at least 8 chars
    const strongRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/;
    const strong = strongRegex.test(value);
    if (!strong) {
      isValid = false;
      errs.push("Password is too weak.");
    }
  }

  // 6. matchWith (e.g. confirmPassword matches password)
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
    errors: errs,
  };
}

/* ---------------------- Component ---------------------- */
/**
 * Props:
 *  - form: FormObject | plain JSON config
 *  - output?: (payload:any) => void
 *
 * UX contract:
 *  - Submit button is DISABLED while any field has an error or is invalid.
 *  - As soon as all fields are valid (no errors), submit ENABLES.
 *  - After submit:
 *      finalOut = { ...values, action: hydrated.action }
 *      hydrated.data = finalOut
 *      hydrated.message = ""
 *      output(finalOut)
 */
export function AlloyForm({ form, output }) {
  //
  // 1. Hydrate form prop into a canonical FormObject.
  //
  const hydrated = form instanceof FormObject ? form : new FormObject(form || {});

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
  // 2. Build initial state for each field.
  // We keep "value", "valid", "error", "errors"
  //
  const [fieldState, setFieldState] = useState(() => {
    const init = {};
    // first gather a map of initial values so matchWith works on first pass
    const initialValues = {};
    hydrated.fields.forEach((fld) => {
      initialValues[fld.name] = fld.value;
    });

    hydrated.fields.forEach((fld) => {
      const val = fld.value;
      const { valid, error, errors } = validateField(fld, val, initialValues);

      init[fld.name] = {
        value: val,
        valid,
        error,
        errors,
      };
    });

    return init;
  });

  const submitRef = useRef(null);

  //
  // 3. Helper to recompute validity for ALL fields,
  //    given an updated "nextFieldState" map of { [name]: {value,...} }.
  //
  const recomputeAllValidity = useCallback(
    (draftFieldState) => {
      // Build a plain values map first so matchWith can compare cross-fields
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
          errors,
        };
      });

      return nextState;
    },
    [hydrated.fields]
  );

  //
  // 4. When an individual AlloyInput changes,
  //    we update that field's value, THEN recompute validity for *all* fields.
  //
  function handleFieldOutput(fieldPayload) {
    if (!fieldPayload || !fieldPayload.name) return;
    const { name, value } = fieldPayload;

    setFieldState((prev) => {
      // first, update just this field's value in a draft
      const draft = { ...prev };
      draft[name] = {
        ...prev[name],
        value,
      };

      // now recompute validity for the entire form using the draft
      const validated = recomputeAllValidity(draft);
      return validated;
    });
  }

  //
  // 5. Build submit payload from current state
  //
  const dataPayload = useMemo(() => {
    const out = {};
    Object.keys(fieldState).forEach((fname) => {
      out[fname] = fieldState[fname].value;
    });
    return out;
  }, [fieldState]);

  //
  // 6. Check if any field is invalid. This drives the submit disabled state.
  //
  const isAnyInvalid = useMemo(() => {
    return Object.values(fieldState).some(
      (f) => f.error || !f.valid
    );
  }, [fieldState]);

  //
  // 7. Submit handler
  //
  function handleSubmit(btnModel /* ButtonSubmitObject */, e) {
    const finalOut = {
      ...dataPayload,
      action: hydrated.action,
    };

    // match Angular behavior
    hydrated.data = finalOut;
    hydrated.message = "";

    output?.(finalOut);
  }

  //
  // 8. Force the submit button's disabled prop based on validity.
  //    We do NOT permanently "stick" it; it updates every render.
  //
  hydrated.submit.disabled = isAnyInvalid || !!hydrated.submit.loading;

  //
  // 9. Render
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

          {/* Field list */}
          {hydrated.fields.map((fld) => (
            <AlloyInput
              key={fld.id}
              input={fld}
              output={handleFieldOutput}
            />
          ))}

          {/* Submit button (auto-disabled until form valid) */}
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
