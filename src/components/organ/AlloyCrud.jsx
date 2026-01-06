// src/lib/components/tissue/AlloyCrud.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

    this.type = type === "card" ? "card" : "table";

    if (this.type === "table") {
      this.documentClass = documentClass || "col-12";
    } else {
      this.documentClass = documentClass || "col-6 col-md-4 col-lg-3 col-xl-2 mb-3";
    }

    this.modal = modal instanceof ModalObject ? modal : new ModalObject(modal || {});

    this.toast =
      toast instanceof ModalToastObject ? toast : toast ? new ModalToastObject(toast) : null;

    if (search instanceof SearchObject) {
      this.search = search;
    } else if (search) {
      if (search.search) this.search = new SearchObject(search);
      else this.search = new SearchObject({ search });
    } else {
      this.search = null;
    }

    this.add = add instanceof ButtonIconObject ? add : add ? new ButtonIconObject(add) : null;

    if (this.type === "table") {
      this.document =
        document instanceof TableActionObject
          ? document
          : new TableActionObject(document || {});
    } else {
      const rawCards = Array.isArray(document) ? document : [];
      this.document = rawCards.map((card) =>
        card instanceof CardActionObject ? card : new CardActionObject(card || {})
      );
    }

    this.page = page instanceof PaginationObject ? page : page ? new PaginationObject(page) : null;

    Object.assign(this, rest);
  }
}

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

const lower = (v) => String(v ?? "").toLowerCase();

function normalizeEvent(e) {
  if (!e) return null;

  const base =
    e instanceof OutputObject && typeof e.toJSON === "function" ? e.toJSON() : e;

  if (!base || typeof base !== "object") return null;

  return {
    ...base,
    type: lower(base.type),
    action: lower(base.action),
  };
}

function extractChangeKV(d) {
  if (!d || typeof d !== "object") return { fieldName: "", value: undefined };

  const fieldName = String(d.name ?? d.fieldName ?? d.inputName ?? d.key ?? d.field ?? "").trim();

  let value = d.value ?? d.file ?? d.selected ?? d.val ?? d.data ?? undefined;

  if (Array.isArray(value) && value.length > 0) value = value[0];

  if (fieldName) return { fieldName, value };

  const keys = Object.keys(d);
  if (keys.length === 1) {
    const k = keys[0];
    return { fieldName: String(k), value: d[k] };
  }

  return { fieldName: "", value: undefined };
}

function flattenCardDocToRow(row) {
  const base = row && typeof row === "object" ? row : {};
  const fields = Array.isArray(base.fields) ? base.fields : null;
  if (!fields) return base;

  const flat = { ...base };

  fields.forEach((f) => {
    if (!f || typeof f !== "object") return;

    const key = String(f.id ?? "").trim(); // IMPORTANT: id must match modal field "name"
    if (!key) return;
    if (Object.prototype.hasOwnProperty.call(flat, key)) return;

    const val =
      f.value ??
      f.url ??
      f.imageUrl ??
      f.previewUrl ??
      f.publicUrl ??
      f.fileUrl ??
      f.name ??
      "";

    flat[key] = val;
  });

  return flat;
}

/* -------------------------------------------------------
 * AlloyCrud
 * ----------------------------------------------------- */
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
    if (hiddenTriggerRef.current && typeof hiddenTriggerRef.current.click === "function") {
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

  const [modalState, setModalState] = useState(() => ({
    mode: "create",
    data: crud.modal?.data || {},
    disabled: false,
    version: 0,
    dirty: {},
  }));

  const [deleteRow, setDeleteRow] = useState(null);
  const [shouldOpen, setShouldOpen] = useState(false);

  useEffect(() => {
    setModalState((prev) => ({
      mode: "create",
      data: crud.modal?.data || {},
      disabled: false,
      version: prev.version + 1,
      dirty: {},
    }));
    setShouldOpen(false);
    setDeleteRow(null);
  }, [crud.id]);

  // Patch-in updates (like imageUrl coming back) without overwriting user-typed (dirty) fields.
  useEffect(() => {
    const patch = crud.modal?.data || {};
    if (!patch || typeof patch !== "object") return;

    setModalState((prev) => {
      const prevData = prev.data || {};
      const dirty = prev.dirty || {};

      let changed = false;
      const nextData = { ...prevData };

      Object.keys(patch).forEach((k) => {
        const curVal = prevData[k];
        const nextVal = patch[k];

        const isFile = typeof File !== "undefined" && curVal instanceof File;
        const curEmpty = curVal === undefined || curVal === null || curVal === "";

        if (dirty[k] && !isFile) return;

        if (curEmpty || isFile) {
          if (nextData[k] !== nextVal) {
            nextData[k] = nextVal;
            changed = true;
          }
        }
      });

      if (!changed) return prev;

      return {
        ...prev,
        data: nextData,
      };
    });
  }, [crud.modal?.data]);

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
    if (modalState.mode === "edit") actionLabel = "edit";
    else if (modalState.mode === "delete") actionLabel = "delete";
    else actionLabel = lower(base.action) || "create";

    const valuesMap = modalState.data || {};

    const fields = Array.isArray(base.fields)
      ? base.fields.map((f) => {
          const plain = f ? { ...f } : {};
          const key = plain.name;

          if (key && Object.prototype.hasOwnProperty.call(valuesMap, key)) {
            plain.value = valuesMap[key];
            plain.url = valuesMap[key];
            plain.imageUrl = valuesMap[key];
            plain.previewUrl = valuesMap[key];
            plain.publicUrl = valuesMap[key];
            plain.fileUrl = valuesMap[key];
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
  }, [crud.modal, modalState.mode, modalState.data, modalState.disabled, modalState.version]);

  function mapRowToModalData(row = {}) {
    const result = {};
    const modalCfg = crud.modal || {};
    const defaultData = modalCfg.data || {};
    const fields = Array.isArray(modalCfg.fields) ? modalCfg.fields : [];

    fields.forEach((f) => {
      const key = f?.name;
      if (!key) return;

      if (Object.prototype.hasOwnProperty.call(row, key)) result[key] = row[key];
      else if (Object.prototype.hasOwnProperty.call(defaultData, key)) result[key] = defaultData[key];
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

      if (f?.type === "checkbox") result[key] = false;
      else if (Array.isArray(defaultData[key])) result[key] = [];
      else result[key] = "";
    });

    return result;
  }

  const handleSearchOutput = (searchOut) => {
    const base = normalizeEvent(searchOut);
    if (!base) return;

    if (base.type && base.type !== "search-bar") return;

    const data = base.data || {};

    if (base.action === "search") {
      emit(
        OutputObject.ok({
          id: crud.id,
          type: "crud",
          action: "search",
          data,
        })
      );
      return;
    }

    if (base.action === "clear") {
      emit(
        OutputObject.ok({
          id: crud.id,
          type: "crud",
          action: "clear",
          data,
        })
      );
      return;
    }
  };

  const handleTableOutput = (tableOut) => {
    if (!tableOut) return;

    if (lower(tableOut.type) === "column" && lower(tableOut.action) === "sort") {
      const column = tableOut.data?.name ?? "";
      const dir = tableOut.data?.dir ?? "";
      const data = column && typeof column === "string" ? { [column]: dir } : {};

      emit(
        OutputObject.ok({
          id: crud.id,
          type: "crud",
          action: "sort",
          data,
        })
      );
      return;
    }

    if (lower(tableOut.type) === "row" && lower(tableOut.action) === "navigate") {
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

    if (lower(tableOut.type) === "table") {
      const row = tableOut.data || {};
      const btnName = tableOut.action || "";
      const btnLower = lower(btnName);

      if (btnLower.includes("edit")) {
        const mappedData = mapRowToModalData(row);
        const payload = { ...row, ...mappedData };

        setModalState((prev) => ({
          mode: "edit",
          data: payload,
          disabled: false,
          version: prev.version + 1,
          dirty: {},
        }));
        setShouldOpen(true);

        emit(
          OutputObject.ok({
            id: crud.id,
            type: "crud",
            action: "editinit",
            data: payload,
          })
        );
        return;
      }

      if (btnLower.includes("delete")) {
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
            dirty: {},
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
            action: btnLower,
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
        action: lower(tableOut.action) || "table",
        data: { ...(tableOut.data || {}) },
      })
    );
  };

  const handleCardOutput = (cardOut) => {
    if (!cardOut || lower(cardOut.type) !== "card-action") return;

    const btnName = cardOut.action || "";
    const btnLower = lower(btnName);

    const raw = cardOut.data || {};
    const baseRow =
      raw && typeof raw === "object" && raw.data && typeof raw.data === "object" ? raw.data : raw;

    const row = flattenCardDocToRow(baseRow);

    if (btnLower.includes("edit")) {
      const mappedData = mapRowToModalData(row);
      const payload = { ...row, ...mappedData };

      setModalState((prev) => ({
        mode: "edit",
        data: payload,
        disabled: false,
        version: prev.version + 1,
        dirty: {},
      }));
      setShouldOpen(true);

      emit(
        OutputObject.ok({
          id: crud.id,
          type: "crud",
          action: "editinit",
          data: payload,
        })
      );
      return;
    }

    if (btnLower.includes("delete")) {
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
          dirty: {},
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
          action: btnLower,
          data: { ...row },
        })
      );
    }
  };

  const handleModalOutput = (modalOut) => {
    const base = normalizeEvent(modalOut);
    if (!base) return;

    if (base.type !== "modal") {
      emit(base);
      return;
    }

    if (base.action === "change") {
      const d = base.data || {};

      const { fieldName, value } = extractChangeKV(d);
      if (fieldName) {
        setModalState((prev) => ({
          ...prev,
          data: { ...(prev.data || {}), [fieldName]: value },
          dirty: { ...(prev.dirty || {}), [fieldName]: true },
        }));
      }

      emit(
        new OutputObject({
          id: crud.id,
          type: "crud",
          action: "change",
          error: !!base.error,
          data: {
            mode: modalState.mode,
            ...(d || {}),
          },
        })
      );
      return;
    }

    if (base.error) return;

    const fields = base.data || {};
    const baseData = modalState.data || {};
    const merged = { ...baseData, ...fields };

    const mergedId = String(merged?.id ?? "").trim();
    if (!mergedId) {
      const fallbackId = baseData.id ?? fields.id ?? "";
      const fb = String(fallbackId ?? "").trim();
      if (fb) merged.id = fb;
    }

    let outAction = base.action;

    if (outAction !== "edit" && outAction !== "create" && outAction !== "delete") {
      outAction =
        modalState.mode === "edit" ? "edit" : modalState.mode === "delete" ? "delete" : "create";
    }

    emit(
      OutputObject.ok({
        id: crud.id,
        type: "crud",
        action: outAction,
        data: merged,
      })
    );
  };

  const handleToastOutput = (toastOut) => {
    if (!toastOut || lower(toastOut.type) !== "modal-toast" || lower(toastOut.action) !== "click")
      return;

    const payload = deleteRow && typeof deleteRow === "object" ? { ...deleteRow } : null;

    if (!payload || payload.id === undefined) {
      setDeleteRow(null);
      return;
    }

    emit(
      OutputObject.ok({
        id: crud.id,
        type: "crud",
        action: "delete",
        data: payload,
      })
    );

    setDeleteRow(null);
  };

  const handleAddOutput = () => {
    const emptyData = mapDefaultsToEmpty();

    setModalState((prev) => ({
      mode: "create",
      data: { ...emptyData },
      disabled: false,
      version: prev.version + 1,
      dirty: {},
    }));
    setShouldOpen(true);

    emit(
      OutputObject.ok({
        id: crud.id,
        type: "crud",
        action: "createinit",
        data: { ...emptyData },
      })
    );
  };

  const handlePageOutput = (pageOut) => {
    const base = normalizeEvent(pageOut);
    if (!base) return;

    if (base.type && base.type !== "pagination") return;
    if (base.action !== "page") return;

    const pageNumber = base?.data?.pageNumber;
    if (typeof pageNumber !== "number" || Number.isNaN(pageNumber)) return;

    emit(
      OutputObject.ok({
        id: crud.id,
        type: "crud",
        action: "page",
        data: { pageNumber },
      })
    );
  };

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

  const portal = (node) => {
    if (typeof document === "undefined") return node;
    return createPortal(node, document.body);
  };

  return (
    <>
      <div className={crud.className}>
        <div className="row input-group mt-2">
          <div className={hasAdd ? "col-sm-8" : "col-12 col-sm-8 offset-sm-2"}>
            {crud.search && <AlloySearch search={crud.search} output={handleSearchOutput} />}
          </div>
          {hasAdd && (
            <div className="col-sm-4 d-flex align-items-center justify-content-end">
              {crud.add && <AlloyButtonIcon buttonIcon={crud.add} output={handleAddOutput} />}
            </div>
          )}
        </div>

        {renderDocument()}

        {crud.page && crud.page instanceof PaginationObject && (
          <div className="row mt-3">
            <div className="col-12">
              <AlloyPagination pagination={crud.page} output={handlePageOutput} />
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

      {portal(<AlloyModal key={modalState.version} modal={modalModel} output={handleModalOutput} />)}

      {crud.toast && portal(<AlloyModalToast modalToast={crud.toast} output={handleToastOutput} />)}
    </>
  );
}

export default AlloyCrud;
