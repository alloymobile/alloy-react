// src/lib/components/tissue/AlloyEmail.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

import { OutputObject, generateId } from "../../utils/idHelper.js";

import AlloyModal, { ModalObject } from "../tissue/AlloyModal.jsx";
import AlloyInput, { InputObject } from "../cell/AlloyInput.jsx";
import AlloyButtonIcon, { ButtonIconObject } from "../cell/AlloyButtonIcon.jsx";
import AlloyTableAction, {
  TableActionObject,
} from "../tissue/AlloyTableAction.jsx";

/* -------------------------------------------------------
 * EmailObject (model)
 *
 * export class AlloyEmail {
 *   id: string;
 *   className: string;
 *   modal: AlloyModal;
 *   search: AlloyInputTextIcon;
 *   send: AlloyButtonIcon;
 *   table: TableAction;
 * }
 * ----------------------------------------------------- */
export class EmailObject {
  constructor(cfg = {}) {
    const {
      id,
      className = "container-fluid",
      modal,
      search,
      send,
      table,
      ...rest
    } = cfg || {};

    this.id = id ?? generateId("email");
    this.className = className;

    this.modal =
      modal instanceof ModalObject ? modal : new ModalObject(modal || {});

    this.search =
      search instanceof InputObject
        ? search
        : search
        ? new InputObject(search)
        : null;

    this.send =
      send instanceof ButtonIconObject
        ? send
        : send
        ? new ButtonIconObject(send)
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
 * AlloyEmail (view)
 *
 * Props:
 *   - email: EmailObject
 *   - output?: (out: OutputObject) => void
 *
 * Behaviour:
 *   - Search input → { [searchName]: value }
 *   - Send button → "compose" mode (blank/default modal.data)
 *   - Table:
 *       - column Sort       → { [columnName]: "asc" | "desc" }
 *       - Open row button   → "open"  mode (read-only modal with row data)
 *       - Reply row button  → "reply" mode (editable modal with row data)
 *       - Delete row button → "delete" mode (read-only modal with row data)
 *   - Modal submit:
 *       - open   → action "Open"
 *       - reply  → action "Reply"
 *       - delete → action "Delete"
 *       - compose(default) → action = modal.submit.name || "submit"
 *
 * All wrapped in:
 * {
 *   id: email.id,
 *   type: "email",
 *   action: "<action-name>",
 *   error: false,
 *   data: { ...fieldValues }
 * }
 * ----------------------------------------------------- */
export function AlloyEmail({ email, output }) {
  if (!email || !(email instanceof EmailObject)) {
    throw new Error("AlloyEmail requires `email` (EmailObject instance).");
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

    if (email.modal?.id) {
      openModalById(email.modal.id);
    }
  };

  /* ----------------- Modal state (mode + data + version) ----------------- */

  const [modalState, setModalState] = useState(() => ({
    mode: "compose", // "compose" | "open" | "reply" | "delete"
    data: email.modal?.data || {},
    disabled: false,
    version: 0, // bump this to force rebuild / open timing
  }));

  // Only open the modal when explicitly requested (Send / row actions)
  const [shouldOpen, setShouldOpen] = useState(false);

  // If parent changes the email model from outside, reset modal state (but do NOT open)
  useEffect(() => {
    setModalState((prev) => ({
      mode: "compose",
      data: email.modal?.data || {},
      disabled: false,
      version: prev.version + 1,
    }));
    setShouldOpen(false);
  }, [email]);

  // Whenever version changes AND we explicitly requested opening,
  // open the modal after React has rendered the updated modalModel.
  useEffect(() => {
    if (!shouldOpen) return;
    if (!email.modal?.id) return;

    openModal();
    setShouldOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState.version, shouldOpen, email.modal?.id]);

  // Build ModalObject based on mode + data
  const modalModel = useMemo(() => {
    const base = email.modal;

    let actionLabel;
    if (modalState.mode === "open") {
      actionLabel = "Open";
    } else if (modalState.mode === "reply") {
      actionLabel = "Reply";
    } else if (modalState.mode === "delete") {
      actionLabel = "Delete";
    } else {
      // compose/default
      actionLabel = base.action || "Compose";
    }

    const valuesMap = modalState.data || {};

    const fields = Array.isArray(base.fields)
      ? base.fields.map((f) => {
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

    return new ModalObject({
      ...base,
      action: actionLabel,
      fields,
      data: modalState.data,
    });
  }, [email.modal, modalState.mode, modalState.data, modalState.disabled]);

  /* ----------------- Helpers ----------------- */

  // Map a table row → modal.data
  // Strict: field names must match row keys (except you can ignore id in modal).
  function mapRowToModalData(row = {}) {
    const result = {};
    const modalCfg = email.modal || {};
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

  // SEARCH → { [fieldName]: value }
  const handleSearchOutput = (inputOut) => {
    const field = inputOut?.data?.name ?? email.search?.name ?? "";
    const value = inputOut?.data?.value;

    const data =
      field && typeof field === "string" ? { [field]: value } : {};

    const out = OutputObject.ok({
      id: email.id,
      type: "email",
      action: "search",
      data,
    });

    emit(out);
  };

  // TABLE → Sort / Open / Reply / Delete / navigate / custom actions
  const handleTableOutput = (tableOut) => {
    if (!tableOut) return;

    // SORT column
    if (tableOut.type === "column" && tableOut.action === "Sort") {
      const column = tableOut.data?.name ?? "";
      const dir = tableOut.data?.dir ?? "";
      const data =
        column && typeof column === "string" ? { [column]: dir } : {};

      const out = OutputObject.ok({
        id: email.id,
        type: "email",
        action: "Sort",
        data,
      });

      emit(out);
      return;
    }

    // ROW NAVIGATE
    if (tableOut.type === "row" && tableOut.action === "navigate") {
      const { to, ...restRow } = tableOut.data || {};

      const out = OutputObject.ok({
        id: email.id,
        type: "email",
        action: "navigate",
        data: {
          to,
          ...restRow,
        },
      });

      emit(out);
      return;
    }

    // ROW ACTION (Open / Reply / Delete / custom buttons)
    if (tableOut.type === "table") {
      const row = tableOut.data || {};
      const btnName = tableOut.action || "";
      const lower = (btnName || "").toLowerCase();

      // ── OPEN ──
      if (lower.includes("open")) {
        const mappedData = mapRowToModalData(row);

        setModalState((prev) => ({
          mode: "open",
          data: mappedData,
          disabled: true, // read-only view
          version: prev.version + 1,
        }));
        setShouldOpen(true);
        // NO OUTPUT HERE – wait for modal submit (if you want an explicit "Open" confirm)
        return;
      }

      // ── REPLY ──
      if (lower.includes("reply")) {
        const mappedData = mapRowToModalData(row);

        setModalState((prev) => ({
          mode: "reply",
          data: mappedData,
          disabled: false,
          version: prev.version + 1,
        }));
        setShouldOpen(true);
        return;
      }

      // ── DELETE ──
      if (lower.includes("delete")) {
        const mappedData = mapRowToModalData(row);

        setModalState((prev) => ({
          mode: "delete",
          data: mappedData,
          disabled: true, // read-only confirm
          version: prev.version + 1,
        }));
        setShouldOpen(true);
        return;
      }

      // Other buttons → immediate flat emit
      if (btnName) {
        const out = OutputObject.ok({
          id: email.id,
          type: "email",
          action: btnName,
          data: {
            ...row,
          },
        });
        emit(out);
      }
      return;
    }

    // Fallback: just proxy the data
    const out = OutputObject.ok({
      id: email.id,
      type: "email",
      action: tableOut.action || "table",
      data: { ...(tableOut.data || {}) },
    });
    emit(out);
  };

  // MODAL SUBMIT → final payload (only when validation passes)
  const handleModalOutput = (modalOut) => {
    if (!modalOut || modalOut.type !== "modal") return;

    // If AlloyModal reports validation error → DO NOT emit
    if (modalOut.error) {
      return;
    }

    const fields = modalOut.data || {};

    let action;
    if (modalState.mode === "open") action = "Open";
    else if (modalState.mode === "reply") action = "Reply";
    else if (modalState.mode === "delete") action = "Delete";
    else action = email.modal?.submit?.name || "submit";

    const out = OutputObject.ok({
      id: email.id,
      type: "email",
      action,
      data: {
        ...fields,
      },
    });

    emit(out);
  };

  // SEND BUTTON → compose new email (blank/default values)
  const handleSendOutput = () => {
    const defaultData = email.modal?.data || {};

    setModalState((prev) => ({
      mode: "compose",
      data: { ...defaultData }, // fresh clone every time
      disabled: false,
      version: prev.version + 1,
    }));
    setShouldOpen(true);
    // No output here; final output only on modal submit
  };

  /* ----------------- Render ----------------- */

  return (
    <>
      <div className={email.className}>
        {/* Search + Send button row */}
        <div className="row input-group mt-2">
          <div className="col-sm-8">
            {email.search && (
              <AlloyInput input={email.search} output={handleSearchOutput} />
            )}
          </div>

          <div className="col-sm-4 d-flex align-items-center justify-content-end">
            {email.send && (
              <AlloyButtonIcon
                buttonIcon={email.send}
                output={handleSendOutput}
              />
            )}
          </div>
        </div>

        {/* Table of emails / recipients / templates */}
        <AlloyTableAction
          tableAction={email.table}
          output={handleTableOutput}
        />
      </div>

      {/* Hidden trigger so Bootstrap data-api always has something to click */}
      <button
        type="button"
        ref={hiddenTriggerRef}
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target={`#${email.modal.id}`}
      />

      {/* Modal (auto-dismisses itself via dismissModalById inside AlloyModal) */}
      <AlloyModal modal={modalModel} output={handleModalOutput} />
    </>
  );
}

export default AlloyEmail;
