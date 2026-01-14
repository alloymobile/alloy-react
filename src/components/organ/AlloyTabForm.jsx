// src/components/tissue/AlloyTabForm.jsx
import React, { useState, useEffect } from "react";

import AlloyInput, { InputObject } from "../cell/AlloyInput.jsx";
import AlloyButtonIcon, { ButtonIconObject } from "../cell/AlloyButtonIcon.jsx";
import AlloyIcon, { IconObject } from "../cell/AlloyIcon.jsx";

import AlloyPay, { PayObject } from "../tissue/AlloyPay.jsx";
import AlloyCard, { CardObject } from "../tissue/AlloyCard.jsx";

import { generateId, OutputObject } from "../../utils/idHelper.js";

/* -------------------------------------------------------
 * TabObject (one step) – RAW input configs
 * ----------------------------------------------------- */
export class TabObject {
  constructor(tab = {}) {
    this.id = tab.id ?? generateId("tab");
    this.key = tab.key ?? this.id;
    this.title = tab.title ?? "";
    this.subtitle = tab.subtitle ?? "";
    this.order = typeof tab.order === "number" ? tab.order : 0;
    this.required = !!tab.required;
    this.stage = tab.stage ?? "";
    this.status = tab.status ?? "";

    this.className =
      typeof tab.className === "string" && tab.className.trim()
        ? tab.className
        : "col-12";

    this.initError = "";

    const t = String(tab.type ?? "inputs").trim().toLowerCase();
    this.type = t === "pay" ? "pay" : t === "cards" ? "cards" : "inputs";

    this.icon = tab.icon
      ? tab.icon instanceof IconObject
        ? tab.icon
        : new IconObject(tab.icon)
      : null;

    // ✅ NEW: one customizable class for input sleeve (keeps old layout by default)
    this.inputClass =
      typeof tab.inputClass === "string" && tab.inputClass.trim()
        ? tab.inputClass
        : "col-12 col-md-6 col-lg-5 mx-auto";

    // inputs must be InputObject[]
    this.inputs = [];
    if (this.type === "inputs") {
      try {
        const rawInputs = Array.isArray(tab.inputs) ? tab.inputs : [];
        this.inputs = rawInputs.map((i) =>
          i instanceof InputObject ? i : new InputObject(i || {})
        );
      } catch (e) {
        this.initError = String(e?.message || e);
        this.inputs = [];
      }
    }

    this.pay = null;
    if (this.type === "pay") {
      try {
        this.pay = tab.pay instanceof PayObject ? tab.pay : new PayObject(tab.pay || {});
      } catch (e) {
        this.initError = String(e?.message || e);
        this.pay = null;
      }
    }

    this.cards = [];
    if (this.type === "cards") {
      try {
        const rawCards = Array.isArray(tab.cards) ? tab.cards : [];
        this.cards = rawCards.map((c) =>
          c instanceof CardObject ? c : new CardObject(c || {})
        );
      } catch (e) {
        this.initError = String(e?.message || e);
        this.cards = [];
      }
    }
  }
}

/* -------------------------------------------------------
 * TabFormObject (whole flow)
 * ----------------------------------------------------- */
export class TabFormObject {
  constructor(cfg = {}) {
    this.id = cfg.id ?? generateId("tab-form");
    this.name = cfg.name ?? "";
    this.status = cfg.status ?? "draft";

    // layout: "tabs" (default) or "mixed"
    this.layout = cfg.layout === "mixed" ? "mixed" : "tabs";

    const rawTabs = Array.isArray(cfg.tabs) ? cfg.tabs : [];
    const mappedTabs = rawTabs.map((t) => new TabObject(t));
    this.tabs = mappedTabs.sort((a, b) => a.order - b.order);

    let idx = typeof cfg.currentIndex === "number" ? cfg.currentIndex : 0;
    if (idx < 0) idx = 0;
    if (idx >= this.tabs.length) idx = this.tabs.length - 1;
    this.currentIndex = this.tabs.length > 0 ? idx : 0;

    const nb = cfg.navButtons || {};
    this.navButtons = {
      previous: nb.previous
        ? new ButtonIconObject({
            ...nb.previous,
            name: nb.previous.name || nb.previous.label || "Previous",
          })
        : null,
      next: nb.next
        ? new ButtonIconObject({
            ...nb.next,
            name: nb.next.name || nb.next.label || "Next",
          })
        : null,
      finish: nb.finish
        ? new ButtonIconObject({
            ...nb.finish,
            name: nb.finish.name || nb.finish.label || "Finish",
          })
        : null,
    };
  }
}

/* -------------------------------------------------------
 * Helpers
 * ----------------------------------------------------- */

// build initial values from config (per tabKey)
function buildInitialValues(tabForm) {
  const result = {};
  tabForm.tabs.forEach((tab) => {
    const tabValues = {};
    tab.inputs.forEach((input) => {
      const name = input.name;
      if (!name) return;

      if (typeof input.value !== "undefined") {
        tabValues[name] = input.value;
      } else if (input.type === "checkbox") {
        tabValues[name] = false;
      } else {
        tabValues[name] = "";
      }
    });
    result[tab.key] = tabValues;
  });
  return result;
}

// basic validation: required + matchWith
function validateTab(tab, tabValues) {
  const errors = {};

  tab.inputs.forEach((input) => {
    const name = input.name;
    if (!name) return;

    const messages = [];
    const value = typeof tabValues[name] !== "undefined" ? tabValues[name] : input.value;

    if (input.required) {
      if (input.type === "checkbox") {
        if (!value) {
          messages.push("This field is required.");
        }
      } else {
        if (value === "" || value === null || typeof value === "undefined") {
          messages.push("This field is required.");
        }
      }
    }

    if (input.matchWith) {
      const otherName = input.matchWith;
      const otherVal = tabValues[otherName];
      if (value !== otherVal) {
        messages.push("Values do not match.");
      }
    }

    if (messages.length > 0) {
      errors[name] = messages;
    }
  });

  return errors;
}

/* -------------------------------------------------------
 * AlloyTabForm
 * ----------------------------------------------------- */

export function AlloyTabForm({ tabForm, output }) {
  if (!tabForm || !(tabForm instanceof TabFormObject)) {
    throw new Error("AlloyTabForm requires `tabForm` (TabFormObject instance).");
  }

  const [currentIndex, setCurrentIndex] = useState(tabForm.currentIndex);
  const [values, setValues] = useState(() => buildInitialValues(tabForm));
  const [errors, setErrors] = useState({}); // { [tabKey]: { fieldName: string[] } }

  const tabs = tabForm.tabs;
  const totalSteps = tabs.length;
  const currentTab = tabs[currentIndex] || null;
  const currentTabKey = currentTab ? currentTab.key : "";
  const navButtons = tabForm.navButtons || {};

  const layout = tabForm.layout || "tabs";
  const isMixed = layout === "mixed";

  useEffect(() => {
    setCurrentIndex(tabForm.currentIndex);
    setValues(buildInitialValues(tabForm));
    setErrors({});
  }, [tabForm]);

  function getValue(tabKey, name, fallback, type) {
    const tabVals = values[tabKey] || {};
    if (Object.prototype.hasOwnProperty.call(tabVals, name)) {
      return tabVals[name];
    }
    if (typeof fallback !== "undefined") return fallback;
    return type === "checkbox" ? false : "";
  }

  function handleFieldOutput(tabKey, out) {
    const payload = out && typeof out.toJSON === "function" ? out.toJSON() : out;

    const name = payload?.data?.name;
    const nextVal = payload?.data?.value;
    const fieldErrors = payload?.data?.errors || [];

    if (!name) return;

    setValues((prev) => {
      const clone = { ...prev };
      const perTab = { ...(clone[tabKey] || {}) };
      perTab[name] = nextVal;
      clone[tabKey] = perTab;

      output?.(out);

      return clone;
    });

    setErrors((prev) => {
      const clone = { ...prev };
      const perTab = { ...(clone[tabKey] || {}) };

      if (fieldErrors.length > 0) {
        perTab[name] = fieldErrors;
      } else {
        delete perTab[name];
      }

      clone[tabKey] = perTab;
      return clone;
    });
  }

  function emit(navAction, nextIndex, nextValues, nextErrors, hadError) {
    const nextTab = tabs[nextIndex] || currentTab;
    const nextKey = nextTab ? nextTab.key : currentTabKey;

    const baseData = {
      navAction,
      currentIndex: nextIndex,
      currentTabKey: nextKey,
      values: nextValues,
    };

    if (hadError && nextErrors && Object.keys(nextErrors).length > 0) {
      baseData.errors = nextErrors;
      baseData.message = "Validation failed for current step.";
    }

    if (typeof output !== "function") return;

    const out = hadError
      ? OutputObject.err({
          id: tabForm.id,
          type: "tab-form",
          action: navAction === "finish" ? "submit" : "draft",
          data: baseData,
        })
      : OutputObject.ok({
          id: tabForm.id,
          type: "tab-form",
          action: navAction === "finish" ? "submit" : "draft",
          data: baseData,
        });

    output(out);
  }

  function handlePrevious() {
    if (isMixed) return;
    if (!currentTab || currentIndex <= 0) return;
    const nextIndex = currentIndex - 1;
    setCurrentIndex(nextIndex);
    emit("previous", nextIndex, values, errors, false);
  }

  function handleNext() {
    if (isMixed) return;
    if (!currentTab || currentIndex >= totalSteps - 1) return;

    if (currentTab.type === "inputs") {
      const tabKey = currentTab.key;
      const tabVals = values[tabKey] || {};
      const tabErr = validateTab(currentTab, tabVals);

      if (Object.keys(tabErr).length > 0) {
        const mergedErr = {
          ...errors,
          [tabKey]: tabErr,
        };
        setErrors(mergedErr);
        emit("next", currentIndex, values, mergedErr, true);
        return;
      }

      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      const nextErrors = { ...errors };
      delete nextErrors[tabKey];
      setErrors(nextErrors);
      emit("next", nextIndex, values, nextErrors, false);
      return;
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    emit("next", nextIndex, values, errors, false);
  }

  function handleFinish() {
    if (!tabs.length) return;

    if (isMixed) {
      let nextErrors = { ...errors };
      let hadError = false;

      tabs.forEach((tab) => {
        if (tab.type !== "inputs") return;

        const tabKey = tab.key;
        const tabVals = values[tabKey] || {};
        const tabErr = validateTab(tab, tabVals);

        if (Object.keys(tabErr).length > 0) {
          nextErrors = { ...nextErrors, [tabKey]: tabErr };
          hadError = true;
        } else if (nextErrors[tabKey]) {
          const clone = { ...nextErrors };
          delete clone[tabKey];
          nextErrors = clone;
        }
      });

      setErrors(nextErrors);
      emit("finish", currentIndex, values, nextErrors, hadError);
      return;
    }

    if (!currentTab) return;

    if (currentTab.type === "inputs") {
      const tabKey = currentTab.key;
      const tabVals = values[tabKey] || {};
      const tabErr = validateTab(currentTab, tabVals);

      if (Object.keys(tabErr).length > 0) {
        const mergedErr = {
          ...errors,
          [tabKey]: tabErr,
        };
        setErrors(mergedErr);
        emit("finish", currentIndex, values, mergedErr, true);
        return;
      }

      const nextErrors = { ...errors };
      delete nextErrors[tabKey];
      setErrors(nextErrors);
      emit("finish", currentIndex, values, nextErrors, false);
      return;
    }

    emit("finish", currentIndex, values, errors, false);
  }

  if (!currentTab) {
    return <div className="alert alert-warning">No steps defined for this TabForm.</div>;
  }

  const hasPrevious = !isMixed && currentIndex > 0;
  const isLast = isMixed ? true : currentIndex === totalSteps - 1;
  const hasNext = !isMixed && !isLast;

  const prevButtonModel =
    hasPrevious &&
    (navButtons.previous ||
      new ButtonIconObject({
        name: "Previous",
        icon: { iconClass: "fa-solid fa-arrow-left" },
        className: "btn btn-primary",
      }));

  const nextButtonModel =
    hasNext &&
    (navButtons.next ||
      new ButtonIconObject({
        name: "Next",
        icon: { iconClass: "fa-solid fa-arrow-right" },
        className: "btn btn-primary",
      }));

  const finishButtonModel =
    (isLast || isMixed) &&
    (navButtons.finish ||
      new ButtonIconObject({
        name: "Finish",
        icon: { iconClass: "fa-solid fa-paper-plane" },
        className: "btn btn-primary",
      }));

  return (
    <div className="alloy-tab-form">
      {!isMixed && (
        <ul className="nav nav-tabs mb-3 flex-wrap">
          {tabs.map((tab, idx) => {
            const active = idx === currentIndex;
            return (
              <li className="nav-item" key={tab.id}>
                <button
                  type="button"
                  className={`nav-link ${active ? "active" : ""}`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  {tab.icon && (
                    <span className="me-1">
                      <AlloyIcon icon={tab.icon} />
                    </span>
                  )}
                  {tab.title || `Step ${idx + 1}`}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <form onSubmit={(e) => e.preventDefault()} noValidate>
        {isMixed ? (
          <div className="row g-3">
            {tabs.map((tab, idx) => {
              const tabKey = tab.key;
              const legendTitle = tab.title || `Step ${idx + 1}`;
              return (
                <div className={tab.className || "col-12"} key={tab.id}>
                  <fieldset className="border rounded p-3">
                    <legend className="float-none w-auto px-2 mb-0">
                      {tab.icon && (
                        <span className="me-1">
                          <AlloyIcon icon={tab.icon} />
                        </span>
                      )}
                      {legendTitle}
                    </legend>

                    {tab.subtitle && (
                      <div className="text-muted small mb-3">{tab.subtitle}</div>
                    )}

                    {tab.initError ? (
                      <div className="alert alert-danger">{tab.initError}</div>
                    ) : null}

                    {tab.type === "inputs" && (
                      <div className="row g-3">
                        {/* ✅ CHANGED: wrapper class now comes from tab.inputClass (default keeps old behavior) */}
                        <div className={tab.inputClass}>
                          {tab.inputs.map((inputModel, iIdx) => {
                            const val = getValue(
                              tabKey,
                              inputModel.name,
                              inputModel.value,
                              inputModel.type
                            );

                            const tabErr = errors[tabKey] || {};
                            const fieldErrors = tabErr[inputModel.name] || [];
                            const invalid = fieldErrors.length > 0;

                            const model = new InputObject({
                              ...inputModel,
                              value: val,
                              errors: fieldErrors,
                              invalid,
                            });

                            return (
                              <AlloyInput
                                key={`inp-${tabKey}-${iIdx}`}
                                input={model}
                                output={(out) => handleFieldOutput(tabKey, out)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {tab.type === "pay" && (
                      <div className="col-12">
                        {tab.pay && (
                          <AlloyPay pay={tab.pay} output={(out) => output?.(out)} />
                        )}
                      </div>
                    )}

                    {tab.type === "cards" && (
                      <div className="col-12">
                        <div className="row g-3">
                          {tab.cards.map((c) => (
                            <div className="col-12" key={c.id}>
                              <AlloyCard card={c} output={(out) => output?.(out)} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </fieldset>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {(currentTab.title || currentTab.subtitle) && (
              <div className="mb-3">
                {currentTab.title && <h5 className="mb-1">{currentTab.title}</h5>}
                {currentTab.subtitle && (
                  <div className="text-muted small">{currentTab.subtitle}</div>
                )}
              </div>
            )}

            {currentTab.initError ? (
              <div className="alert alert-danger">{currentTab.initError}</div>
            ) : null}

            <div className="row g-3">
              {currentTab.type === "inputs" && (
                <div className="row g-3">
                  {/* ✅ CHANGED: wrapper class now comes from currentTab.inputClass (default keeps old behavior) */}
                  <div className={currentTab.inputClass}>
                    {currentTab.inputs.map((inputModel, iIdx) => {
                      const val = getValue(
                        currentTab.key,
                        inputModel.name,
                        inputModel.value,
                        inputModel.type
                      );
                      const tabErr = errors[currentTab.key] || {};
                      const fieldErrors = tabErr[inputModel.name] || [];
                      const invalid = fieldErrors.length > 0;

                      const model = new InputObject({
                        ...inputModel,
                        value: val,
                        errors: fieldErrors,
                        invalid,
                      });

                      return (
                        <AlloyInput
                          key={`inp-${iIdx}`}
                          input={model}
                          output={(out) => handleFieldOutput(currentTab.key, out)}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {currentTab.type === "pay" && (
                <div className="col-12">
                  {currentTab.pay && (
                    <AlloyPay pay={currentTab.pay} output={(out) => output?.(out)} />
                  )}
                </div>
              )}

              {currentTab.type === "cards" && (
                <div className="col-12">
                  <div className="row g-3">
                    {currentTab.cards.map((c) => (
                      <div className="col-12" key={c.id}>
                        <AlloyCard card={c} output={(out) => output?.(out)} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <div className="d-flex justify-content-between mt-4">
          {hasPrevious ? (
            <AlloyButtonIcon buttonIcon={prevButtonModel} output={handlePrevious} />
          ) : (
            <span />
          )}

          <div className="d-flex gap-2 ms-auto">
            {hasNext && <AlloyButtonIcon buttonIcon={nextButtonModel} output={handleNext} />}
            {(isLast || isMixed) && (
              <AlloyButtonIcon buttonIcon={finishButtonModel} output={handleFinish} />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default AlloyTabForm;
