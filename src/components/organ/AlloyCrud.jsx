// src/lib/components/tissue/AlloyCrud.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

import { OutputObject, generateId } from "../../utils/idHelper.js";

import AlloyModal, { ModalObject } from "../tissue/AlloyModal.jsx";
import AlloyButtonIcon, {
  ButtonIconObject,
} from "../cell/AlloyButtonIcon.jsx";

import AlloyTableAction, {
  TableActionObject,
} from "../tissue/AlloyTableAction.jsx";

import AlloyCardAction, {
  CardActionObject,
} from "../tissue/AlloyCardAction.jsx";

import AlloySearch, { SearchObject } from "../cell/AlloySearch.jsx";

import AlloyPagination, {
  PaginationObject,
} from "../tissue/AlloyPagination.jsx";

import AlloyModalToast, {
  ModalToastObject,
} from "../tissue/AlloyModalToast.jsx";

/* -------------------------------------------------------
 * CrudObject
 *
 * Unified config for BOTH table + card CRUD:
 *
 * {
 *   id?: string;
 *   className?: string;         // outer container ("container-fluid" etc.)
 *
 *   type: "table" | "card";     // REQUIRED – decides which document renderer
 *
 *   // document wrapper:
 *   //  - For table: <div class="row"><div class={documentClass}><AlloyTableAction/></div></div>
 *   //  - For card:  <div class="row"><div class={documentClass} * per card ><AlloyCardAction/></div></div>
 *   documentClass?: string;     // defaults: "col-12" for table, "col-sm-6 col-md-4 col-lg-3 mb-3" for card
 *
 *   modal: ModalConfig;         // same pattern as CrudTable / CrudCard
 *
 *   // OPTIONAL toast modal for delete confirmation:
 *   //   toast?: ModalToastConfig | ModalToastObject;
 *
 *   search?: SearchConfig | SearchObject;  // wrapped to SearchObject({ search: ... })
 *   add?: ButtonIconConfig | ButtonIconObject;
 *
 *   // document:
 *   //   type="table" → document: TableActionConfig
 *   //   type="card"  → document: CardActionConfig[]
 *   document: TableActionConfig | Array<CardActionConfig>;
 *
 *   // pagination (optional):
 *   //   Spring Data style + styling for AlloyPagination
 *   page?: PaginationConfig | PaginationObject;
 * }
 * ----------------------------------------------------- */
export class CrudObject {
  constructor(cfg = {}) {
    const {
      id,
      className = "container-fluid",
      type = "table",
      documentClass, // optional; default depends on type
      modal,
      toast, // optional: confirmation toast modal
      search,
      add,
      document,
      page,
      ...rest
    } = cfg || {};

    this.id = id ?? generateId("crud");
    this.className = className;

    // "table" | "card"
    this.type = type === "card" ? "card" : "table";

    // documentClass defaults differ per type
    if (this.type === "table") {
      this.documentClass = documentClass || "col-12";
    } else {
      this.documentClass =
        documentClass || "col-sm-6 col-md-4 col-lg-3 mb-3";
    }

    // Modal
    this.modal =
      modal instanceof ModalObject ? modal : new ModalObject(modal || {});

    // Optional toast modal (for confirm delete)
    this.toast =
      toast instanceof ModalToastObject
        ? toast
        : toast
        ? new ModalToastObject(toast)
        : null;

    // Search → always SearchObject
    this.search =
      search instanceof SearchObject
        ? search
        : search
        ? new SearchObject({ search })
        : null;

    // Add button
    this.add =
      add instanceof ButtonIconObject
        ? add
        : add
        ? new ButtonIconObject(add)
        : null;

    // Document (table or cards)
    if (this.type === "table") {
      // TableActionObject
      this.document =
        document instanceof TableActionObject
          ? document
          : new TableActionObject(document || {});
    } else {
      // array of CardActionObject
      const rawCards = Array.isArray(document) ? document : [];
      this.document = rawCards.map((card) =>
        card instanceof CardActionObject
          ? card
          : new CardActionObject(card || {})
      );
    }

    // Pagination
    this.page =
      page instanceof PaginationObject
        ? page
        : page
        ? new PaginationObject(page)
        : null;

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
 * AlloyCrud
 *
 * Props:
 *   - crud: CrudObject
 *   - output?: (out: OutputObject) => void
 *
 * Output (top-level) is always:
 * {
 *   id: crud.id,
 *   type: "crud",
 *   action: "<action-name>",
 *   error: false,
 *   data: { ...payload }
 * }
 * ----------------------------------------------------- */
/**
 * @typedef {Object} AlloyCrudProps
 * @property {CrudObject} crud
 * @property {(out: any) => void | Promise<void>} [output]
 * @property {(files: any) => Promise<any>} [fileUploader]  // <-- change this
 */
/**
 * @param {AlloyCrudProps} props
 */
export function AlloyCrud({ crud, output, fileUploader }) {
  if (!crud || !(crud instanceof CrudObject)) {
    throw new Error("AlloyCrud requires `crud` (CrudObject instance).");
  }

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  // Hidden trigger button for Bootstrap's data-api (form modal)
  const hiddenTriggerRef = useRef(null);
  // Hidden trigger for toast modal (confirm delete)
  const hiddenToastTriggerRef = useRef(null);

  const doOpenModal = () => {
    if (
      hiddenTriggerRef.current &&
      typeof hiddenTriggerRef.current.click === "function"
    ) {
      hiddenTriggerRef.current.click();
      return;
    }

    if (crud.modal?.id) {
      openModalById(crud.modal.id);
    }
  };

  // Optional: open toast modal (if configured)
  const doOpenToastModal = () => {
    if (
      hiddenToastTriggerRef.current &&
      typeof hiddenToastTriggerRef.current.click === "function"
    ) {
      hiddenToastTriggerRef.current.click();
      return;
    }

    if (crud.toast?.id) {
      openModalById(crud.toast.id);
    }
  };

  /* ----------------- Modal state (mode + data + version) ----------------- */

  const [modalState, setModalState] = useState(() => ({
    mode: "create", // "create" | "edit" | "delete"
    data: crud.modal?.data || {},
    disabled: false,
    version: 0, // bump to force rebuild ModalObject
  }));

  // Store row selected for delete (for toast)
  const [deleteRow, setDeleteRow] = useState(null);

  // Only open the modal when explicitly requested
  const [shouldOpen, setShouldOpen] = useState(false);

  // If crud changes from outside, reset modal state (but do NOT open)
  useEffect(() => {
    setModalState((prev) => ({
      mode: "create",
      data: crud.modal?.data || {},
      disabled: false,
      version: prev.version + 1,
    }));
    setShouldOpen(false);
    setDeleteRow(null);
  }, [crud]);

  // When version changes AND we explicitly requested opening, open modal
  useEffect(() => {
    if (!shouldOpen) return;
    if (!crud.modal?.id) return;

    doOpenModal();
    setShouldOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState.version, shouldOpen, crud.modal?.id]);

  // Build ModalObject based on mode + data
  const modalModel = useMemo(() => {
    const base = crud.modal;

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

    const submit = base.submit
      ? {
          ...base.submit,
          name: actionLabel,
        }
      : null;

    return new ModalObject({
      ...base,
      action: actionLabel,
      submit,
      fields,
      data: modalState.data,
    });
  }, [
    crud.modal,
    modalState.mode,
    modalState.data,
    modalState.disabled,
    modalState.version,
  ]);

  /* ----------------- Helpers ----------------- */

  function mapRowToModalData(row = {}) {
    const result = {};
    const modalCfg = crud.modal || {};
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

  // SEARCH (via AlloySearch) → re-emit as CRUD-level events
  const handleSearchOutput = (searchOut) => {
    if (!searchOut) return;

    const base =
      searchOut instanceof OutputObject &&
      typeof searchOut.toJSON === "function"
        ? searchOut.toJSON()
        : searchOut;

    const action = base?.action || "search";
    const data = base?.data || {};

    if (action === "search" || action === "select") {
      const out = OutputObject.ok({
        id: crud.id,
        type: "crud",
        action: action === "select" ? "search-select" : "search",
        data,
      });
      console.log("⭐ AlloyCrud.emit CRUD", out);
      emit(out);
    }
  };

  // TABLE (AlloyTableAction) → Sort / Edit / Delete / navigate / other actions
  const handleTableOutput = (tableOut) => {
    if (!tableOut) return;

    // SORT
    if (tableOut.type === "column" && tableOut.action === "Sort") {
      const column = tableOut.data?.name ?? "";
      const dir = tableOut.data?.dir ?? "";
      const data =
        column && typeof column === "string" ? { [column]: dir } : {};

      const out = OutputObject.ok({
        id: crud.id,
        type: "crud",
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
        id: crud.id,
        type: "crud",
        action: "navigate",
        data: {
          to,
          ...restRow,
        },
      });

      emit(out);
      return;
    }

    // ROW ACTION (Edit / Delete / custom buttons)
    if (tableOut.type === "table") {
      const row = tableOut.data || {};
      const btnName = tableOut.action || "";
      const lower = (btnName || "").toLowerCase();

      // EDIT
      if (lower.includes("edit")) {
        const mappedData = mapRowToModalData(row);

        setModalState((prev) => ({
          mode: "edit",
          // keep full row (with id) plus mapped form fields
          data: { ...row, ...mappedData },
          disabled: false,
          version: prev.version + 1,
        }));
        setShouldOpen(true);
        return;
      }

      // DELETE
      if (lower.includes("delete")) {
        if (crud.toast) {
          setDeleteRow(row);
          doOpenToastModal();
        } else {
          const mappedData = mapRowToModalData(row);

          setModalState((prev) => ({
            mode: "delete",
            // keep full row (with id) plus mapped form fields
            data: { ...row, ...mappedData },
            disabled: true,
            version: prev.version + 1,
          }));
          setShouldOpen(true);
        }
        return;
      }

      // Other custom actions → flat emit
      if (btnName) {
        const out = OutputObject.ok({
          id: crud.id,
          type: "crud",
          action: btnName,
          data: {
            ...row,
          },
        });
        emit(out);
      }
      return;
    }

    // Fallback
    const out = OutputObject.ok({
      id: crud.id,
      type: "crud",
      action: tableOut.action || "table",
      data: { ...(tableOut.data || {}) },
    });
    emit(out);
  };

  // CARD (AlloyCardAction) → Edit / Delete / custom actions
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
        data: { ...row, ...mappedData },
        disabled: false,
        version: prev.version + 1,
      }));
      setShouldOpen(true);
      return;
    }

    // DELETE
    if (lower.includes("delete")) {
      if (crud.toast) {
        setDeleteRow(row);
        doOpenToastModal();
      } else {
        const mappedData = mapRowToModalData(row);

        setModalState((prev) => ({
          mode: "delete",
          data: { ...row, ...mappedData },
          disabled: true,
          version: prev.version + 1,
        }));
        setShouldOpen(true);
      }
      return;
    }

    // Other custom actions → flat emit
    if (btnName) {
      const out = OutputObject.ok({
        id: crud.id,
        type: "crud",
        action: btnName,
        data: {
          ...row,
        },
      });
      emit(out);
    }
  };

  // MODAL SUBMIT → only here we emit for create/edit/delete via full form
  const handleModalOutput = (modalOut) => {
    if (!modalOut || modalOut.type !== "modal") return;
    if (modalOut.error) return;

    const fields = modalOut.data || {};
    const baseData = modalState.data || {};

    let action;
    if (modalState.mode === "edit") action = "Edit";
    else if (modalState.mode === "delete") action = "Delete";
    else action = crud.modal?.submit?.name || "Create";

    // Merge stored row data + current form values
    const merged = {
      ...baseData,
      ...fields,
    };

    // Ensure `id` field is always present (Create / Edit / Delete)
    if (!Object.prototype.hasOwnProperty.call(merged, "id")) {
      // If backend insists on `id` but modal doesn't have it, send empty string
      merged.id = baseData.id ?? fields.id ?? "";
    }

    const out = OutputObject.ok({
      id: crud.id,
      type: "crud",
      action,
      data: merged,
    });

    emit(out);
  };

  // TOAST MODAL → confirm delete, emit full row with Delete action
  const handleToastOutput = (toastOut) => {
    if (
      !toastOut ||
      toastOut.type !== "modal-toast" ||
      toastOut.action !== "click"
    ) {
      return;
    }

    const payload =
      deleteRow && typeof deleteRow === "object" ? { ...deleteRow } : null;

    // Avoid emitting an empty Delete event (prevents "blip" with empty data)
    if (!payload || payload.id === undefined) {
      setDeleteRow(null);
      return;
    }

    const out = OutputObject.ok({
      id: crud.id,
      type: "crud",
      action: "Delete",
      data: payload,
    });

    emit(out);
    setDeleteRow(null);
  };

  // ADD BUTTON → open create modal with EMPTY/default values
  const handleAddOutput = () => {
    const defaultData = crud.modal?.data || {};

    setModalState((prev) => ({
      mode: "create",
      data: { ...defaultData },
      disabled: false,
      version: prev.version + 1,
    }));
    setShouldOpen(true);
  };

  // PAGINATION → forward page navigation
  const handlePageOutput = (pageOut) => {
    if (!pageOut) return;

    const base =
      pageOut instanceof OutputObject &&
      typeof pageOut.toJSON === "function"
        ? pageOut.toJSON()
        : pageOut;

    const data = base?.data || {};

    const out = OutputObject.ok({
      id: crud.id,
      type: "crud",
      action: "page",
      data,
    });

    emit(out);
  };

  /* ----------------- Render helpers ----------------- */

  const renderDocument = () => {
    if (crud.type === "table") {
      return (
        <div className="row mt-3">
          <div className={crud.documentClass}>
            <AlloyTableAction
              tableAction={crud.document}
              output={handleTableOutput}
            />
          </div>
        </div>
      );
    }

    if (!Array.isArray(crud.document)) return null;

    return (
      <div className="row mt-3">
        {crud.document.map((card) => (
          <div key={card.id} className={crud.documentClass}>
            <AlloyCardAction cardAction={card} output={handleCardOutput} />
          </div>
        ))}
      </div>
    );
  };

  /* ----------------- Render ----------------- */

  return (
    <>
      <div className={crud.className}>
        {/* Search + Add row */}
        <div className="row input-group mt-2">
          <div className="col-sm-8">
            {crud.search && (
              <AlloySearch search={crud.search} output={handleSearchOutput} />
            )}
          </div>
          <div className="col-sm-4 d-flex align-items-center justify-content-end">
            {crud.add && (
              <AlloyButtonIcon
                buttonIcon={crud.add}
                output={handleAddOutput}
              />
            )}
          </div>
        </div>

        {/* Document (table or cards) */}
        {renderDocument()}

        {/* Pagination (optional) */}
        {crud.page && crud.page instanceof PaginationObject && (
          <div className="row mt-3">
            <div className="col-12 d-flex justify-content-end">
              <AlloyPagination
                pagination={crud.page}
                output={handlePageOutput}
              />
            </div>
          </div>
        )}
      </div>

      {/* Hidden trigger for form modal */}
      <button
        type="button"
        ref={hiddenTriggerRef}
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target={`#${crud.modal.id}`}
      />

      {/* Hidden trigger for toast modal */}
      {crud.toast && (
        <button
          type="button"
          ref={hiddenToastTriggerRef}
          className="d-none"
          data-bs-toggle="modal"
          data-bs-target={`#${crud.toast.id}`}
        />
      )}

      {/* Main form modal */}
      <AlloyModal
        modal={modalModel}
        output={handleModalOutput}
        fileUploader={fileUploader}
      />

      {/* Optional Toast Modal for confirm-delete */}
      {crud.toast && (
        <AlloyModalToast
          modalToast={crud.toast}
          output={handleToastOutput}
        />
      )}
    </>
  );
}

export default AlloyCrud;
