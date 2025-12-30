// src/lib/components/tissue/AlloyCrud.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

import { OutputObject, generateId } from "../../utils/idHelper.js";

import AlloyModal, { ModalObject } from "../tissue/AlloyModal.jsx";
import AlloyButtonIcon, { ButtonIconObject } from "../cell/AlloyButtonIcon.jsx";

import AlloyTableAction, { TableActionObject } from "../tissue/AlloyTableAction.jsx";
import AlloyCardAction, { CardActionObject } from "../tissue/AlloyCardAction.jsx";

import AlloySearch, { SearchObject } from "../cell/AlloySearch.jsx";

import AlloyPagination, { PaginationObject } from "../tissue/AlloyPagination.jsx";

import AlloyModalToast, { ModalToastObject } from "../tissue/AlloyModalToast.jsx";

/* -------------------------------------------------------
 * CrudObject
 * ----------------------------------------------------- */
export class CrudObject {
  constructor(cfg = {}) {
    const {
      id,
      className = "container-fluid",
      type = "table",
      documentClass,
      modal,
      toast,
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
      this.documentClass = documentClass || "col-6 col-md-4 col-lg-3 col-xl-2 mb-3";
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

    // ✅ Search → supports BOTH wrapper + old input-only shape
    if (search instanceof SearchObject) {
      this.search = search;
    } else if (search) {
      if (search.search) this.search = new SearchObject(search); // wrapper
      else this.search = new SearchObject({ search }); // old input-only
    } else {
      this.search = null;
    }

    // Add button
    this.add =
      add instanceof ButtonIconObject
        ? add
        : add
        ? new ButtonIconObject(add)
        : null;

    // Document (table or cards)
    if (this.type === "table") {
      this.document =
        document instanceof TableActionObject
          ? document
          : new TableActionObject(document || {});
    } else {
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
 * ----------------------------------------------------- */
/**
 * @typedef {Object} AlloyCrudProps
 * @property {CrudObject} crud
 * @property {(out: any) => void | Promise<void>} [output]
 */
/**
 * @param {AlloyCrudProps} props
 */
export function AlloyCrud({ crud, output }) {
  if (!crud || !(crud instanceof CrudObject)) {
    throw new Error("AlloyCrud requires `crud` (CrudObject instance).");
  }

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  const hasAdd = !!crud.add;

  const hiddenTriggerRef = useRef(null);
  const hiddenToastTriggerRef = useRef(null);

  const doOpenModal = () => {
    if (
      hiddenTriggerRef.current &&
      typeof hiddenTriggerRef.current.click === "function"
    ) {
      hiddenTriggerRef.current.click();
      return;
    }
    if (crud.modal?.id) openModalById(crud.modal.id);
  };

  const doOpenToastModal = () => {
    if (
      hiddenToastTriggerRef.current &&
      typeof hiddenToastTriggerRef.current.click === "function"
    ) {
      hiddenToastTriggerRef.current.click();
      return;
    }
    if (crud.toast?.id) openModalById(crud.toast.id);
  };

  /* ----------------- Modal state ----------------- */
  const [modalState, setModalState] = useState(() => ({
    mode: "create", // "create" | "edit" | "delete"
    data: crud.modal?.data || {},
    disabled: false,
    version: 0,
  }));

  const [deleteRow, setDeleteRow] = useState(null);
  const [shouldOpen, setShouldOpen] = useState(false);

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

  useEffect(() => {
    if (!shouldOpen) return;
    if (!crud.modal?.id) return;

    doOpenModal();
    setShouldOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState.version, shouldOpen, crud.modal?.id]);

  const modalModel = useMemo(() => {
    const base = crud.modal;

    let actionLabel;
    if (modalState.mode === "edit") actionLabel = "Edit";
    else if (modalState.mode === "delete") actionLabel = "Delete";
    else actionLabel = base.action || "Create";

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

      if (Object.prototype.hasOwnProperty.call(row, key)) result[key] = row[key];
      else if (Object.prototype.hasOwnProperty.call(defaultData, key))
        result[key] = defaultData[key];
      else result[key] = "";
    });

    return result;
  }

  function mapDefaultsToEmpty() {
    const result = {};
    const modalCfg = crud.modal || {};
    const fields = Array.isArray(modalCfg.fields) ? modalCfg.fields : [];
    const defaultData = modalCfg.data || {};

    fields.forEach((f) => {
      const key = f?.name;
      if (!key) return;

      // For Create: ALWAYS empty, never reuse old values.
      // Keep checkbox groups sane.
      if (f?.type === "checkbox") result[key] = false;
      else if (Array.isArray(defaultData[key])) result[key] = [];
      else result[key] = "";
    });

    return result;
  }

  /* ----------------- Handlers ----------------- */

  // ✅ SEARCH → forward ONLY "Search" and "Clear" (capitalized)
  const handleSearchOutput = (searchOut) => {
    if (!searchOut) return;

    const base =
      searchOut instanceof OutputObject && typeof searchOut.toJSON === "function"
        ? searchOut.toJSON()
        : searchOut;

    if (base?.type && base.type !== "search-bar") return;

    const rawAction = String(base?.action || "");
    const lower = rawAction.toLowerCase();
    const data = base?.data || {};

    if (lower === "search") {
      emit(
        OutputObject.ok({
          id: crud.id,
          type: "crud",
          action: "Search",
          data,
        })
      );
      return;
    }

    if (lower === "clear") {
      emit(
        OutputObject.ok({
          id: crud.id,
          type: "crud",
          action: "Clear",
          data,
        })
      );
      return;
    }
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

      emit(
        OutputObject.ok({
          id: crud.id,
          type: "crud",
          action: "Sort",
          data,
        })
      );
      return;
    }

    // ROW NAVIGATE
    if (tableOut.type === "row" && tableOut.action === "navigate") {
      const { to, ...restRow } = tableOut.data || {};

      emit(
        OutputObject.ok({
          id: crud.id,
          type: "crud",
          action: "navigate",
          data: { to, ...restRow },
        })
      );
      return;
    }

    // ROW ACTIONS
    if (tableOut.type === "table") {
      const row = tableOut.data || {};
      const btnName = tableOut.action || "";
      const lower = (btnName || "").toLowerCase();

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

      if (btnName) {
        emit(
          OutputObject.ok({
            id: crud.id,
            type: "crud",
            action: btnName,
            data: { ...row },
          })
        );
      }
      return;
    }

    emit(
      OutputObject.ok({
        id: crud.id,
        type: "crud",
        action: tableOut.action || "table",
        data: { ...(tableOut.data || {}) },
      })
    );
  };

  // CARD → Edit / Delete / custom actions
  const handleCardOutput = (cardOut) => {
    if (!cardOut || cardOut.type !== "card-action") return;

    const row = cardOut.data || {};
    const btnName = cardOut.action || "";
    const lower = btnName.toLowerCase();

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

    if (btnName) {
      emit(
        OutputObject.ok({
          id: crud.id,
          type: "crud",
          action: btnName,
          data: { ...row },
        })
      );
    }
  };

  // MODAL → propagate change + handle submit
  const handleModalOutput = (modalOut) => {
    if (!modalOut || modalOut.type !== "modal") return;

    // ✅ bubble modal "change" upwards so parent can react (file upload / server calls)
    if (String(modalOut.action || "").toLowerCase() === "change") {
      emit(
        new OutputObject({
          id: crud.id,
          type: "crud",
          action: "change",
          error: !!modalOut.error,
          data: {
            mode: modalState.mode,
            ...(modalOut.data || {}),
          },
        })
      );
      return;
    }

    // Submit handling remains the same
    if (modalOut.error) return;

    const fields = modalOut.data || {};
    const baseData = modalState.data || {};

    let action;
    if (modalState.mode === "edit") action = "Edit";
    else if (modalState.mode === "delete") action = "Delete";
    else action = crud.modal?.submit?.name || "Create";

    const merged = { ...baseData, ...fields };

    if (!Object.prototype.hasOwnProperty.call(merged, "id")) {
      merged.id = baseData.id ?? fields.id ?? "";
    }

    emit(
      OutputObject.ok({
        id: crud.id,
        type: "crud",
        action,
        data: merged,
      })
    );
  };

  // TOAST MODAL → confirm delete
  const handleToastOutput = (toastOut) => {
    if (!toastOut || toastOut.type !== "modal-toast" || toastOut.action !== "click")
      return;

    const payload =
      deleteRow && typeof deleteRow === "object" ? { ...deleteRow } : null;

    if (!payload || payload.id === undefined) {
      setDeleteRow(null);
      return;
    }

    emit(
      OutputObject.ok({
        id: crud.id,
        type: "crud",
        action: "Delete",
        data: payload,
      })
    );

    setDeleteRow(null);
  };

  // ADD BUTTON → open create modal with defaults
  const handleAddOutput = () => {
    // ✅ Create must always be clean/empty (no stale values)
    const emptyData = mapDefaultsToEmpty();

    setModalState((prev) => ({
      mode: "create",
      data: { ...emptyData },
      disabled: false,
      version: prev.version + 1,
    }));
    setShouldOpen(true);
  };

  // ✅ PAGINATION → forward EXACT "page" event upwards
  // AlloyPagination now emits: type="pagination", action="Page", data={ pageNumber }
  // We forward to parent as: type="crud", action="page", data={ pageNumber }
  const handlePageOutput = (pageOut) => {
    if (!pageOut) return;

    const base =
      pageOut instanceof OutputObject && typeof pageOut.toJSON === "function"
        ? pageOut.toJSON()
        : pageOut;

    // Accept only pagination "Page"
    if (base?.type && base.type !== "pagination") return;

    const actionLower = String(base?.action || "").toLowerCase();
    if (actionLower !== "page") return;

    const pageNumber = base?.data?.pageNumber;

    // Only forward when it is a valid number
    if (typeof pageNumber !== "number" || Number.isNaN(pageNumber)) return;

    emit(
      OutputObject.ok({
        id: crud.id,
        type: "crud",
        action: "Page", // parent expects "page"
        data: { pageNumber }, // ONLY what is needed
      })
    );
  };

  /* ----------------- Render helpers ----------------- */
  const renderDocument = () => {
    if (crud.type === "table") {
      return (
        <div className="row mt-3">
          <div className="col-12">
            <AlloyTableAction tableAction={crud.document} output={handleTableOutput} />
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
          <div className={hasAdd ? "col-sm-8" : "col-12 col-sm-8 offset-sm-2"}>
            {crud.search && (
              <AlloySearch search={crud.search} output={handleSearchOutput} />
            )}
          </div>
          {hasAdd && (
            <div className="col-sm-4 d-flex align-items-center justify-content-end">
              {crud.add && (
                <AlloyButtonIcon buttonIcon={crud.add} output={handleAddOutput} />
              )}
            </div>
          )}
        </div>

        {/* Document */}
        {renderDocument()}

        {/* Pagination */}
        {crud.page && crud.page instanceof PaginationObject && (
          <div className="row mt-3">
            <div className="col-12">
              <AlloyPagination pagination={crud.page} output={handlePageOutput} />
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
      <AlloyModal key={modalState.version} modal={modalModel} output={handleModalOutput} />

      {/* Toast modal */}
      {crud.toast && <AlloyModalToast modalToast={crud.toast} output={handleToastOutput} />}
    </>
  );
}

export default AlloyCrud;
