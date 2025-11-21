// src/lib/components/tissue/AlloyCrudTable.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

import { OutputObject, generateId } from "../../utils/idHelper.js";

import AlloyModal, { ModalObject } from "../tissue/AlloyModal.jsx";
import AlloyInput, { InputObject } from "../cell/AlloyInput.jsx";
import AlloyButtonIcon, { ButtonIconObject } from "../cell/AlloyButtonIcon.jsx";
import AlloyTableAction, {
  TableActionObject,
} from "../tissue/AlloyTableAction.jsx";

/* -------------------------------------------------------
 * CrudTableObject
 * ----------------------------------------------------- */
export class CrudTableObject {
  constructor(cfg = {}) {
    const {
      id,
      className = "container-fluid",
      modal,
      search,
      add,
      table,
      ...rest
    } = cfg || {};

    this.id = id ?? generateId("crud-table");
    this.className = className;

    this.modal =
      modal instanceof ModalObject ? modal : new ModalObject(modal || {});

    this.search =
      search instanceof InputObject
        ? search
        : search
        ? new InputObject(search)
        : null;

    this.add =
      add instanceof ButtonIconObject
        ? add
        : add
        ? new ButtonIconObject(add)
        : null;

    this.table =
      table instanceof TableActionObject
        ? table
        : new TableActionObject(table || {});

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
 * AlloyCrudTable
 * ----------------------------------------------------- */
export function AlloyCrudTable({ crudTable, output }) {
  if (!crudTable || !(crudTable instanceof CrudTableObject)) {
    throw new Error(
      "AlloyCrudTable requires `crudTable` (CrudTableObject instance)."
    );
  }

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  // Hidden trigger button for Bootstrap's data-api
  const hiddenTriggerRef = useRef(null);

  const openModal = () => {
    if (
      hiddenTriggerRef.current &&
      typeof hiddenTriggerRef.current.click === "function"
    ) {
      hiddenTriggerRef.current.click();
      return;
    }

    if (crudTable.modal?.id) {
      openModalById(crudTable.modal.id);
    }
  };

  /* ----------------- Modal state (mode + data + version) ----------------- */

  const [modalState, setModalState] = useState(() => ({
    mode: "create", // "create" | "edit" | "delete"
    data: crudTable.modal?.data || {},
    disabled: false,
    version: 0, // bump this to force rebuild of ModalObject
  }));

  // Only open the modal when explicitly requested by Add/Edit/Delete
  const [shouldOpen, setShouldOpen] = useState(false);

  // If crudTable changes from outside, reset modal state (but do NOT open)
  useEffect(() => {
    setModalState((prev) => ({
      mode: "create",
      data: crudTable.modal?.data || {},
      disabled: false,
      version: prev.version + 1,
    }));
    setShouldOpen(false);
  }, [crudTable]);

  // Whenever version changes AND we explicitly requested opening,
  // open the modal *after* React has rendered the updated modalModel.
  useEffect(() => {
    if (!shouldOpen) return;
    if (!crudTable.modal?.id) return;

    openModal();
    setShouldOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState.version, shouldOpen, crudTable.modal?.id]);

  // Build modal model based on mode + data
  const modalModel = useMemo(() => {
    const base = crudTable.modal;

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
          // base.fields are InputObject instances; convert to plain config
          const plain = f instanceof InputObject ? { ...f } : { ...f };

          // Inject current values from modalState.data
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

    // modalState.data is the *current* value map (vendorName, email, city, status…)
    return new ModalObject({
      ...base,
      action: actionLabel,
      fields,
      data: modalState.data,
    });
  }, [
    crudTable.modal,
    modalState.mode,
    modalState.data,
    modalState.disabled,
    modalState.version, // ensure fresh ModalObject for every Add/Edit/Delete
  ]);

  /* ----------------- Helpers ----------------- */

  // Build a data object for modal from a table row:
  //   key = field.name of modal, value = row[field.name] (if present)
  // STRICT mapping:
  //   - If modal field is "vendorName", we read row["vendorName"].
  //   - No smart mapping between "name" and "vendorName".
  function mapRowToModalData(row = {}) {
    const result = {};
    const modalCfg = crudTable.modal || {};
    const defaultData = modalCfg.data || {};
    const fields = Array.isArray(modalCfg.fields) ? modalCfg.fields : [];

    fields.forEach((f) => {
      const key = f?.name;
      if (!key) return;

      if (Object.prototype.hasOwnProperty.call(row, key)) {
        // strict: only take exact column → field match
        result[key] = row[key];
      } else if (Object.prototype.hasOwnProperty.call(defaultData, key)) {
        // fall back to modal.data default
        result[key] = defaultData[key];
      } else {
        // else empty
        result[key] = "";
      }
    });

    return result;
  }

  /* ----------------- Handlers ----------------- */

  // SEARCH → { [fieldName]: value }
  const handleSearchOutput = (inputOut) => {
    const field = inputOut?.data?.name ?? crudTable.search?.name ?? "";
    const value = inputOut?.data?.value;

    const data =
      field && typeof field === "string" ? { [field]: value } : {};

    const out = OutputObject.ok({
      id: crudTable.id,
      type: "crud-table",
      action: "search",
      data,
    });

    emit(out);
  };

  // TABLE → Sort / Edit / Delete / navigate / other actions
  const handleTableOutput = (tableOut) => {
    if (!tableOut) return;

    // SORT
    if (tableOut.type === "column" && tableOut.action === "Sort") {
      const column = tableOut.data?.name ?? "";
      const dir = tableOut.data?.dir ?? "";
      const data =
        column && typeof column === "string" ? { [column]: dir } : {};

      const out = OutputObject.ok({
        id: crudTable.id,
        type: "crud-table",
        action: "Sort",
        data,
      });

      emit(out);
      return;
    }

    // ROW ACTION (Edit / Delete / custom buttons)
    if (tableOut.type === "table") {
      const row = tableOut.data || {};
      const btnName = tableOut.action || "";
      const lower = (btnName || "").toLowerCase();

      // ── EDIT ──
      if (lower.includes("edit")) {
        const mappedData = mapRowToModalData(row);

        setModalState((prev) => ({
          mode: "edit",
          data: mappedData,
          disabled: false,
          version: prev.version + 1,
        }));
        setShouldOpen(true);
        // NO OUTPUT HERE – wait for modal submit
        return;
      }

      // ── DELETE ──
      if (lower.includes("delete")) {
        const mappedData = mapRowToModalData(row);

        setModalState((prev) => ({
          mode: "delete",
          data: mappedData,
          disabled: true,
          version: prev.version + 1,
        }));
        setShouldOpen(true);
        // NO OUTPUT HERE – wait for modal submit
        return;
      }

      // Other buttons (custom actions) – immediate flat emit
      if (btnName) {
        const out = OutputObject.ok({
          id: crudTable.id,
          type: "crud-table",
          action: btnName, // any custom button name
          data: {
            ...row,
          },
        });
        emit(out);
      }
      return;
    }

    // ROW NAVIGATE
    if (tableOut.type === "row" && tableOut.action === "navigate") {
      const { to, ...restRow } = tableOut.data || {};

      const out = OutputObject.ok({
        id: crudTable.id,
        type: "crud-table",
        action: "navigate",
        data: {
          to,
          ...restRow,
        },
      });

      emit(out);
      return;
    }

    // Fallback
    const out = OutputObject.ok({
      id: crudTable.id,
      type: "crud-table",
      action: tableOut.action || "table",
      data: { ...(tableOut.data || {}) },
    });
    emit(out);
  };

  // MODAL SUBMIT → only here we emit for create/edit/delete
  const handleModalOutput = (modalOut) => {
    if (!modalOut || modalOut.type !== "modal") return;

    // If AlloyModal reported validation error → DO NOT emit
    if (modalOut.error) {
      return;
    }

    const fields = modalOut.data || {};

    let action;
    if (modalState.mode === "edit") action = "Edit";
    else if (modalState.mode === "delete") action = "Delete";
    else action = crudTable.modal?.submit?.name || "Create";

    const out = OutputObject.ok({
      id: crudTable.id,
      type: "crud-table",
      action,
      data: {
        ...fields, // key/value only (vendorName, email, city, status, ...)
      },
    });

    emit(out);
  };

  // ADD BUTTON → open create modal with EMPTY/default values
  const handleAddOutput = () => {
    const defaultData = crudTable.modal?.data || {};

    setModalState((prev) => ({
      mode: "create",
      data: { ...defaultData }, // fresh clone every time
      disabled: false,
      version: prev.version + 1,
    }));
    setShouldOpen(true);
    // No OutputObject here; final output only on modal submit
  };

  /* ----------------- Render ----------------- */

  return (
    <>
      <div className={crudTable.className}>
        {/* Search + Add button row */}
        <div className="row input-group mt-2">
          <div className="col-sm-8">
            {crudTable.search && (
              <AlloyInput
                input={crudTable.search}
                output={handleSearchOutput}
              />
            )}
          </div>

          <div className="col-sm-4 d-flex align-items-center justify-content-end">
            {crudTable.add && (
              <AlloyButtonIcon
                buttonIcon={crudTable.add}
                output={handleAddOutput}
              />
            )}
          </div>
        </div>

        {/* Table */}
        <AlloyTableAction
          tableAction={crudTable.table}
          output={handleTableOutput}
        />
      </div>

      {/* Hidden trigger so Bootstrap data-api always has something to click */}
      <button
        type="button"
        ref={hiddenTriggerRef}
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target={`#${crudTable.modal.id}`}
      />

      {/* Modal (closes itself via dismissModalById inside AlloyModal) */}
      <AlloyModal modal={modalModel} output={handleModalOutput} />
    </>
  );
}

export default AlloyCrudTable;
