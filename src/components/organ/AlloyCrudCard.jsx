// src/lib/components/tissue/AlloyCrudCard.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

import { OutputObject, generateId } from "../../utils/idHelper.js";

import AlloyModal, { ModalObject } from "../tissue/AlloyModal.jsx";
import AlloyButtonIcon, {
  ButtonIconObject,
} from "../cell/AlloyButtonIcon.jsx";

import AlloyCardAction, {
  CardActionObject,
} from "../tissue/AlloyCardAction.jsx";

/* -------------------------------------------------------
 * CrudCardObject
 *
 * Unified config (only AlloyCardAction now):
 *
 * {
 *   id?: string,              // row id wrapper
 *   className?: string,       // col classes for each card, e.g. "col-sm-6 col-md-4 col-lg-3 mb-3"
 *
 *   // type is kept only for backwards compatibility in JSON,
 *   // but we always render AlloyCardAction.
 *   type?: "AlloyCardAction",
 *
 *   modal: ModalConfig,
 *
 *   add?: ButtonIconConfig,
 *
 *   cards: Array<CardActionConfig>  // each → CardActionObject
 * }
 * ----------------------------------------------------- */
export class CrudCardObject {
  constructor(cfg = {}) {
    const {
      id,
      className = "col-sm-6 col-md-4 col-lg-3 mb-3",
      type = "AlloyCardAction",
      modal,
      add,
      cards = [],
      ...rest
    } = cfg || {};

    this.id = id ?? generateId("crud-card");
    // NOTE: className here is for each card column wrapper
    this.className = className;

    // Keep the field, but it's effectively informational now.
    this.type = type || "AlloyCardAction";

    // Modal
    this.modal =
      modal instanceof ModalObject ? modal : new ModalObject(modal || {});

    // Add button
    this.add =
      add instanceof ButtonIconObject
        ? add
        : add
        ? new ButtonIconObject(add)
        : null;

    // Cards → always hydrate to CardActionObject
    this.cards = cards.map((card) =>
      card instanceof CardActionObject
        ? card
        : new CardActionObject(card || {})
    );

    Object.assign(this, rest);
  }
}

/* -------------------------------------------------------
 * Helper: open a Bootstrap modal by id (fallback)
 * ----------------------------------------------------- */
function openModalById(id) {
  if (!id) return;
  const modalEl = document.getElementById(id);
  if (!modalEl) return;

  const win = typeof window !== "undefined" ? window : undefined;

  if (win && win.bootstrap && win.bootstrap.Modal) {
    const modalInstance = win.bootstrap.Modal.getOrCreateInstance(modalEl);
    modalInstance.show();
    return;
  }

  const trigger = document.querySelector(
    `[data-bs-toggle="modal"][data-bs-target="#${id}"]`
  );
  if (trigger && typeof trigger.click === "function") {
    trigger.click();
  }
}

/* -------------------------------------------------------
 * AlloyCrudCard
 *
 * Output schema (same pattern as CrudTable, but type="crud-card"):
 *
 * 1) Add (on modal submit):
 * {
 *   id: "<crudCard.id>",
 *   type: "crud-card",
 *   action: "<crudCard.modal.submit.name | 'Create'>",
 *   error: false,
 *   data: { vendorName: "...", email: "...", city: "...", status: "..." }
 * }
 *
 * 2) Edit/Delete (on modal submit):
 * {
 *   id: "<crudCard.id>",
 *   type: "crud-card",
 *   action: "Edit" | "Delete",
 *   error: false,
 *   data: { ...fieldsFromModal }
 * }
 *
 * 3) Other card footer buttons (custom actions):
 * {
 *   id: "<crudCard.id>",
 *   type: "crud-card",
 *   action: "<buttonName>",
 *   error: false,
 *   data: { ...rowFromCard }   // e.g. { vendorName: "...", email: "..." }
 * }
 * ----------------------------------------------------- */
export function AlloyCrudCard({ crudCard, output }) {
  if (!crudCard || !(crudCard instanceof CrudCardObject)) {
    throw new Error(
      "AlloyCrudCard requires `crudCard` (CrudCardObject instance)."
    );
  }

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  // Hidden trigger button for Bootstrap's data-api
  const hiddenTriggerRef = useRef(null);

  const doOpenModal = () => {
    if (
      hiddenTriggerRef.current &&
      typeof hiddenTriggerRef.current.click === "function"
    ) {
      hiddenTriggerRef.current.click();
      return;
    }

    if (crudCard.modal?.id) {
      openModalById(crudCard.modal.id);
    }
  };

  /* ----------------- Modal state (mode + data + version) ----------------- */

  const [modalState, setModalState] = useState(() => ({
    mode: "create", // "create" | "edit" | "delete"
    data: crudCard.modal?.data || {},
    disabled: false,
    version: 0, // bump this to force rebuild of ModalObject
  }));

  // Only open the modal when explicitly requested by Add/Edit/Delete
  const [shouldOpen, setShouldOpen] = useState(false);

  // If crudCard changes from outside, reset modal state (but do NOT open)
  useEffect(() => {
    setModalState((prev) => ({
      mode: "create",
      data: crudCard.modal?.data || {},
      disabled: false,
      version: prev.version + 1,
    }));
    setShouldOpen(false);
  }, [crudCard]);

  // Whenever version changes AND we explicitly requested opening,
  // open the modal *after* React has rendered the updated modalModel.
  useEffect(() => {
    if (!shouldOpen) return;
    if (!crudCard.modal?.id) return;

    doOpenModal();
    setShouldOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState.version, shouldOpen, crudCard.modal?.id]);

  // Build modal model based on mode + data
  const modalModel = useMemo(() => {
    const base = crudCard.modal;

    let actionLabel;
    if (modalState.mode === "edit") {
      actionLabel = "Edit";
    } else if (modalState.mode === "delete") {
      actionLabel = "Delete";
    } else {
      actionLabel = base.action || "Create";
    }

    const valuesMap = modalState.data || {};

    const fields = Array.isArray(base.fields)
      ? base.fields.map((f) => {
          const plain = f ? { ...f } : {};
          const key = plain.name;
          if (key && Object.prototype.hasOwnProperty.call(valuesMap, key)) {
            plain.value = valuesMap[key];
          }
          if (modalState.disabled) {
            plain.disabled = true;
            plain.readOnly = true;
          }
          return plain;
        })
      : [];

    return new ModalObject({
      ...base,
      action: actionLabel,
      fields,
      data: modalState.data,
    });
  }, [
    crudCard.modal,
    modalState.mode,
    modalState.data,
    modalState.disabled,
    modalState.version,
  ]);

  /* ----------------- Helpers ----------------- */

  function mapRowToModalData(row = {}) {
    const result = {};
    const modalCfg = crudCard.modal || {};
    const defaultData = modalCfg.data || {};
    const fields = Array.isArray(modalCfg.fields) ? modalCfg.fields : [];

    fields.forEach((f) => {
      const key = f?.name;
      if (!key) return;

      if (Object.prototype.hasOwnProperty.call(row, key)) {
        result[key] = row[key];
      } else if (Object.prototype.hasOwnProperty.call(defaultData, key)) {
        result[key] = defaultData[key];
      } else {
        result[key] = "";
      }
    });

    return result;
  }

  /* ----------------- Handlers ----------------- */

  // CARD → Edit / Delete / custom actions
  const handleCardOutput = (cardOut) => {
    if (!cardOut || cardOut.type !== "card-action") {
      return;
    }

    const row = cardOut.data || {};
    const btnName = cardOut.action || "";
    const lower = btnName.toLowerCase();

    // EDIT
    if (lower.includes("edit")) {
      const mappedData = mapRowToModalData(row);

      setModalState((prev) => ({
        mode: "edit",
        data: mappedData,
        disabled: false,
        version: prev.version + 1,
      }));
      setShouldOpen(true);
      return;
    }

    // DELETE
    if (lower.includes("delete")) {
      const mappedData = mapRowToModalData(row);

      setModalState((prev) => ({
        mode: "delete",
        data: mappedData,
        disabled: true,
        version: prev.version + 1,
      }));
      setShouldOpen(true);
      return;
    }

    // Other custom actions → flat, immediate emit
    if (btnName) {
      const out = OutputObject.ok({
        id: crudCard.id,
        type: "crud-card",
        action: btnName,
        data: {
          ...row,
        },
      });
      emit(out);
    }
  };

  // MODAL SUBMIT → only here we emit for Add/Edit/Delete
  const handleModalOutput = (modalOut) => {
    if (!modalOut || modalOut.type !== "modal") return;

    if (modalOut.error) {
      return;
    }

    const fields = modalOut.data || {};

    let action;
    if (modalState.mode === "edit") action = "Edit";
    else if (modalState.mode === "delete") action = "Delete";
    else action = crudCard.modal?.submit?.name || "Create";

    const out = OutputObject.ok({
      id: crudCard.id,
      type: "crud-card",
      action,
      data: {
        ...fields,
      },
    });

    emit(out);
  };

  // ADD BUTTON → open create modal with EMPTY/default values
  const handleAddOutput = () => {
    const defaultData = crudCard.modal?.data || {};

    setModalState((prev) => ({
      mode: "create",
      data: { ...defaultData },
      disabled: false,
      version: prev.version + 1,
    }));
    setShouldOpen(true);
  };

  /* ----------------- Render ----------------- */

  const renderCards = () => {
    if (!Array.isArray(crudCard.cards)) return null;

    // Unified path: always AlloyCardAction
    return crudCard.cards.map((card) => (
      <div key={card.id} className={crudCard.className}>
        <AlloyCardAction cardAction={card} output={handleCardOutput} />
      </div>
    ));
  };

  return (
    <>
      {/* Add button row (top-right) */}
      <div className="row mt-2">
        <div className="col-sm-12 text-end">
          {crudCard.add && (
            <AlloyButtonIcon
              buttonIcon={crudCard.add}
              output={handleAddOutput}
            />
          )}
        </div>
      </div>

      {/* Cards row (id is the CRUD card id, class="row" like Angular) */}
      <div id={crudCard.id} className="row">
        {renderCards()}
      </div>

      {/* Hidden trigger so Bootstrap data-api always has something to click */}
      <button
        type="button"
        ref={hiddenTriggerRef}
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target={`#${crudCard.modal.id}`}
      />

      {/* Modal (closes itself via dismissModalById inside AlloyModal) */}
      <AlloyModal modal={modalModel} output={handleModalOutput} />
    </>
  );
}

export default AlloyCrudCard;
