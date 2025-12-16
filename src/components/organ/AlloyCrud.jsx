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

    this.type = type === "card" ? "card" : "table";

    if (this.type === "table") {
      this.documentClass = documentClass || "col-12";
    } else {
      this.documentClass =
        documentClass || "col-sm-6 col-md-4 col-lg-3 mb-3";
    }

    this.modal =
      modal instanceof ModalObject ? modal : new ModalObject(modal || {});

    this.toast =
      toast instanceof ModalToastObject
        ? toast
        : toast
        ? new ModalToastObject(toast)
        : null;

    // ✅ Search: supports BOTH wrapper + old input-only shape
    if (search instanceof SearchObject) {
      this.search = search;
    } else if (search) {
      if (search.search) {
        // wrapper config
        this.search = new SearchObject(search);
      } else {
        // input-only config
        this.search = new SearchObject({ search });
      }
    } else {
      this.search = null;
    }

    this.add =
      add instanceof ButtonIconObject
        ? add
        : add
        ? new ButtonIconObject(add)
        : null;

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
 * ----------------------------------------------------- */
export function AlloyCrud({ crud, output, fileUploader }) {
  if (!crud || !(crud instanceof CrudObject)) {
    throw new Error("AlloyCrud requires `crud` (CrudObject instance).");
  }

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

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

    if (crud.modal?.id) {
      openModalById(crud.modal.id);
    }
  };

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

  const [modalState, setModalState] = useState(() => ({
    mode: "create",
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

  // ✅ SEARCH: forward "search", "select", AND "clear"
  const handleSearchOutput = (searchOut) => {
    if (!searchOut) return;

    const base =
      searchOut instanceof OutputObject &&
      typeof searchOut.toJSON === "function"
        ? searchOut.toJSON()
        : searchOut;

    const action = base?.action || "search";
    const data = base?.data || {};

    if (action === "search" || action === "select" || action === "clear") {
      const out = OutputObject.ok({
        id: crud.id,
        type: "crud",
        action:
          action === "select"
            ? "search-select"
            : action === "clear"
            ? "clear"
            : "search",
        data,
      });

      emit(out);
    }
  };

  const handleTableOutput = (tableOut) => {
    if (!tableOut) return;

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
        const out = OutputObject.ok({
          id: crud.id,
          type: "crud",
          action: btnName,
          data: { ...row },
        });
        emit(out);
      }
      return;
    }

    const out = OutputObject.ok({
      id: crud.id,
      type: "crud",
      action: tableOut.action || "table",
      data: { ...(tableOut.data || {}) },
    });
    emit(out);
  };

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
      const out = OutputObject.ok({
        id: crud.id,
        type: "crud",
        action: btnName,
        data: { ...row },
      });
      emit(out);
    }
  };

  const handleModalOutput = (modalOut) => {
    if (!modalOut || modalOut.type !== "modal") return;
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

    const out = OutputObject.ok({
      id: crud.id,
      type: "crud",
      action,
      data: merged,
    });

    emit(out);
  };

  const handleToastOutput = (toastOut) => {
    if (
      !toastOut ||
      toastOut.type !== "modal-toast" ||
      toastOut.action !== "click"
    )
      return;

    const payload =
      deleteRow && typeof deleteRow === "object" ? { ...deleteRow } : null;

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

  return (
    <>
      <div className={crud.className}>
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

        {renderDocument()}

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

      <button
        type="button"
        ref={hiddenTriggerRef}
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target={`#${crud.modal.id}`}
      />

      {crud.toast && (
        <button
          type="button"
          ref={hiddenToastTriggerRef}
          className="d-none"
          data-bs-toggle="modal"
          data-bs-target={`#${crud.toast.id}`}
        />
      )}

      <AlloyModal
        modal={modalModel}
        output={handleModalOutput}
        fileUploader={fileUploader}
      />

      {crud.toast && (
        <AlloyModalToast modalToast={crud.toast} output={handleToastOutput} />
      )}
    </>
  );
}

export default AlloyCrud;
