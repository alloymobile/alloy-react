// src/lib/components/tissue/AlloyCrudForm.jsx
import React, { useEffect, useRef, useState } from "react";

import { OutputObject, generateId } from "../../utils/idHelper.js";

import AlloySearch, { SearchObject } from "../cell/AlloySearch.jsx";
import AlloyButtonIcon, { ButtonIconObject } from "../cell/AlloyButtonIcon.jsx";

import AlloyTableAction, { TableActionObject } from "../tissue/AlloyTableAction.jsx";
import AlloyCardAction, { CardActionObject } from "../tissue/AlloyCardAction.jsx";

import AlloyPagination, { PaginationObject } from "../tissue/AlloyPagination.jsx";

// NOTE: adjust this relative import path if needed in your repo
import AlloyTabForm, { TabFormObject } from "../../components/organ/AlloyTabForm.jsx";

import AlloyModalToast, { ModalToastObject } from "../tissue/AlloyModalToast.jsx";

/* -------------------------------------------------------
 * CrudFormObject
 * ----------------------------------------------------- */
export class CrudFormObject {
  constructor(cfg = {}) {
    const {
      id,
      name,
      className = "container-fluid",
      search,
      add,
      type = "table",
      document,
      documentClass = "col-6 col-md-4 col-lg-3 col-xl-2 mb-3",
      form,
      pagination,
      modalToast,
      ...rest
    } = cfg || {};

    this.id = id ?? generateId("crud-form");
    this.name = name ?? "";
    this.className = className;

    // ✅ Search → supports BOTH shapes:
    // 1) Old: search is InputConfig/InputObject (no wrapper)
    // 2) New: wrapper SearchObject config
    this.search =
      search instanceof SearchObject
        ? search
        : search
        ? search.search
          ? new SearchObject(search) // wrapper shape
          : new SearchObject({ search }) // old shape (input-only)
        : null;

    // Add button → ButtonIconObject
    this.add =
      add instanceof ButtonIconObject ? add : add ? new ButtonIconObject(add) : null;

    // List type: "table" or "card"
    this.type = type === "card" ? "card" : "table";

    // document:
    if (this.type === "table") {
      const rawTable = document && !Array.isArray(document) ? document : cfg.table || {};
      this.document =
        rawTable instanceof TableActionObject
          ? rawTable
          : new TableActionObject(rawTable || {});
    } else {
      const rawCards = Array.isArray(document)
        ? document
        : Array.isArray(cfg.cards)
        ? cfg.cards
        : [];
      this.document = rawCards.map((card) =>
        card instanceof CardActionObject ? card : new CardActionObject(card || {})
      );
    }

    this.documentClass = documentClass || "col-6 col-md-4 col-lg-3 col-xl-2 mb-3";

    // Base TabForm config – ALWAYS a TabFormObject
    this.form =
      form instanceof TabFormObject ? form : new TabFormObject(form || { tabs: [] });

    // Optional pagination → PaginationObject
    this.pagination =
      pagination instanceof PaginationObject
        ? pagination
        : pagination
        ? new PaginationObject(pagination)
        : null;

    // Optional delete toast modal → ModalToastObject
    this.modalToast =
      modalToast instanceof ModalToastObject
        ? modalToast
        : modalToast
        ? new ModalToastObject(modalToast)
        : null;

    Object.assign(this, rest);
  }
}

/* -------------------------------------------------------
 * Helpers
 * ----------------------------------------------------- */

function buildTabFormModel(crudForm, mode = "create", row = null) {
  const base =
    crudForm.form instanceof TabFormObject
      ? crudForm.form
      : new TabFormObject(crudForm.form || { tabs: [] });

  const baseCfg = {
    id: base.id,
    name: base.name,
    status: base.status,
    currentIndex: base.currentIndex,
    navButtons: base.navButtons,
    tabs: base.tabs,
  };

  const clone = JSON.parse(JSON.stringify(baseCfg || {}));
  const tabs = Array.isArray(clone.tabs) ? clone.tabs : [];

  tabs.forEach((tab, tabIndex) => {
    if (!Array.isArray(tab.inputs)) return;
    tab.inputs.forEach((input) => {
      const fieldName = input?.name;
      if (!fieldName) return;

      const hasRowValue =
        row &&
        Object.prototype.hasOwnProperty.call(row, fieldName) &&
        row[fieldName] !== undefined &&
        row[fieldName] !== null &&
        row[fieldName] !== "";

      const shouldPrefillFromRow = hasRowValue && (mode !== "edit" || tabIndex === 0);

      if (shouldPrefillFromRow) {
        input.value = row[fieldName];
      }

      if (mode === "delete") {
        input.readOnly = true;
        input.disabled = true;
      }
    });
  });

  if (typeof clone.currentIndex !== "number") {
    clone.currentIndex = 0;
  }

  return new TabFormObject(clone);
}

function flattenValues(valuesByTab = {}) {
  const flat = {};
  Object.values(valuesByTab || {}).forEach((perTab) => {
    if (!perTab || typeof perTab !== "object") return;
    Object.entries(perTab).forEach(([k, v]) => {
      flat[k] = v;
    });
  });
  return flat;
}

function openModalById(id) {
  if (!id) return;
  if (typeof document === "undefined" || typeof window === "undefined") return;

  const modalEl = document.getElementById(id);
  if (!modalEl) return;

  const win = window;
  const globalBootstrap = win.bootstrap || win.Bootstrap || win["bootstrap"] || null;

  if (globalBootstrap && typeof globalBootstrap.Modal === "function") {
    const modalInstance = globalBootstrap.Modal.getOrCreateInstance(modalEl);
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

/**
 * Normalize any event (OutputObject or plain object):
 * - type: lowercase
 * - action: lowercase
 * - everything else preserved
 */
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

/* -------------------------------------------------------
 * AlloyCrudForm
 * ----------------------------------------------------- */
/**
 * @typedef {Object} AlloyCrudFormProps
 * @property {CrudFormObject} crudForm
 * @property {(out: any) => void | Promise<void>} [output]
 */

/**
 * @param {AlloyCrudFormProps} props
 */
export function AlloyCrudForm({ crudForm, output }) {
  if (!crudForm || !(crudForm instanceof CrudFormObject)) {
    throw new Error("AlloyCrudForm requires `crudForm` (CrudFormObject instance).");
  }

  const emit = (out) => {
    if (typeof output === "function") output(out);
  };

  const [view, setView] = useState("table");
  const [formMode, setFormMode] = useState("create");
  const [activeRow, setActiveRow] = useState(null);

  const [tabFormModel, setTabFormModel] = useState(() =>
    buildTabFormModel(crudForm, formMode, activeRow)
  );

  useEffect(() => {
    setTabFormModel(buildTabFormModel(crudForm, formMode, activeRow));
  }, [crudForm, formMode, activeRow]);

  const inTableView = view === "table";
  const isTable = crudForm.type === "table";
  const isCard = crudForm.type === "card";

  const hiddenToastTriggerRef = useRef(null);

  const doOpenToastModal = () => {
    if (
      hiddenToastTriggerRef.current &&
      typeof hiddenToastTriggerRef.current.click === "function"
    ) {
      hiddenToastTriggerRef.current.click();
      return;
    }
    if (crudForm.modalToast?.id) openModalById(crudForm.modalToast.id);
  };

  // Keep search mounted; ignore first init clear if any
  const ignoreFirstSearchClearRef = useRef(false);

  const handleSearchOutput = (searchOut) => {
    const base = normalizeEvent(searchOut);
    if (!base) return;

    if (base.type && base.type !== "search-bar") return;

    const action = base.action; // already lowercase
    const data = base.data || {};

    // Ignore ONLY the first init "clear" (if any)
    if (action === "clear" && !ignoreFirstSearchClearRef.current) {
      ignoreFirstSearchClearRef.current = true;
      return;
    }

    switch (action) {
      case "search":
        emit(
          OutputObject.ok({
            id: crudForm.id,
            type: "crud-form",
            action: "search",
            data,
          })
        );
        return;

      case "clear":
        emit(
          OutputObject.ok({
            id: crudForm.id,
            type: "crud-form",
            action: "clear",
            data,
          })
        );
        return;

      default:
        return;
    }
  };

  const handlePaginationOutput = (pageOut) => {
    const base = normalizeEvent(pageOut);
    if (!base) return;

    if (base.type && base.type !== "pagination") return;

    // only "page"
    if (base.action !== "page") return;

    const pageNumber = base?.data?.pageNumber;
    if (typeof pageNumber !== "number" || Number.isNaN(pageNumber)) return;

    emit(
      OutputObject.ok({
        id: crudForm.id,
        type: "crud-form",
        action: "page",
        data: { pageNumber },
      })
    );
  };

  function openForm(mode, row) {
    setFormMode(mode);
    setActiveRow(row || null);
    setTabFormModel(buildTabFormModel(crudForm, mode, row || null));
    setView("form");
  }

  function backToTable() {
    setView("table");
    setFormMode("create");
    setActiveRow(null);
  }

  const handleTableOutput = (tableOut) => {
    if (!tableOut) return;

    const typeLower = lower(tableOut.type);
    const actionLower = lower(tableOut.action);

    // column sort
    if (typeLower === "column" && actionLower === "sort") {
      const column = tableOut?.data?.name ?? "";
      const dir = tableOut?.data?.dir ?? "";
      const data = column && typeof column === "string" ? { [column]: dir } : {};

      emit(
        OutputObject.ok({
          id: crudForm.id,
          type: "crud-form",
          action: "sort",
          data,
        })
      );
      return;
    }

    // table row action buttons
    if (typeLower === "table") {
      const row = tableOut.data || {};
      const btnNameLower = actionLower;

      if (btnNameLower.includes("edit")) {
        openForm("edit", row);

        emit(
          OutputObject.ok({
            id: crudForm.id,
            type: "crud-form",
            action: "editinit",
            data: { ...row },
          })
        );
        return;
      }

      if (btnNameLower.includes("delete")) {
        setActiveRow(row || null);

        if (crudForm.modalToast) doOpenToastModal();
        else openForm("delete", row);

        return;
      }

      if (btnNameLower) {
        emit(
          OutputObject.ok({
            id: crudForm.id,
            type: "crud-form",
            action: btnNameLower, // ✅ emit lowercase action
            data: { ...row },
          })
        );
      }
      return;
    }

    // row navigate
    if (typeLower === "row" && actionLower === "navigate") {
      const { to, ...restRow } = tableOut.data || {};

      emit(
        OutputObject.ok({
          id: crudForm.id,
          type: "crud-form",
          action: "navigate",
          data: { to, ...restRow },
        })
      );
      return;
    }

    // generic fallback
    emit(
      OutputObject.ok({
        id: crudForm.id,
        type: "crud-form",
        action: actionLower || "table",
        data: { ...(tableOut.data || {}) },
      })
    );
  };

  const handleCardOutput = (cardOut) => {
    if (!cardOut) return;

    const typeLower = lower(cardOut.type);
    if (typeLower !== "card-action") return;

    const row = cardOut.data || {};
    const btnNameLower = lower(cardOut.action);

    if (btnNameLower.includes("edit")) {
      openForm("edit", row);

      emit(
        OutputObject.ok({
          id: crudForm.id,
          type: "crud-form",
          action: "editinit",
          data: { ...row },
        })
      );
      return;
    }

    if (btnNameLower.includes("delete")) {
      setActiveRow(row || null);

      if (crudForm.modalToast) doOpenToastModal();
      else openForm("delete", row);

      return;
    }

    if (btnNameLower) {
      emit(
        OutputObject.ok({
          id: crudForm.id,
          type: "crud-form",
          action: btnNameLower, // ✅ emit lowercase action
          data: { ...row },
        })
      );
    }
  };

  const handleAddOutput = () => {
    openForm("create", null);

    emit(
      OutputObject.ok({
        id: crudForm.id,
        type: "crud-form",
        action: "createInit",
        data: {},
      })
    );
  };

  // TabForm output: check in lowercase; emit normalized lowercase for pass-through
  const handleFormOutput = (tfOut) => {
    const base = normalizeEvent(tfOut);
    if (!base) return;

    const action = base.action; // lowercase

    switch (action) {
      case "submit": {
        const data = base.data || {};
        const valuesByTab = data.values || {};
        const flatValues = flattenValues(valuesByTab);

        const outAction =
          formMode === "edit" ? "edit" : formMode === "delete" ? "delete" : "create";

        emit(
          OutputObject.ok({
            id: crudForm.id,
            type: "crud-form",
            action: outAction, // ✅ lowercase
            data: { ...flatValues },
          })
        );

        backToTable();
        return;
      }

      case "draft": {
        const data = base.data || {};
        const valuesByTab = data.values || {};
        const flatValues = flattenValues(valuesByTab);

        emit(
          OutputObject.ok({
            id: crudForm.id,
            type: "crud-form",
            action: "draft",
            data: {
              currentIndex: data.currentIndex,
              currentTabKey: data.currentTabKey,
              values: valuesByTab,
              ...flatValues,
            },
          })
        );
        return;
      }

      default: {
        // ✅ whatever it gets -> lowercase type/action -> emit
        emit(base);
        return;
      }
    }
  };

  const handleModalToastOutput = (toastOut) => {
    const base = normalizeEvent(toastOut);
    if (!base) return;

    if (base.type !== "modal-toast") return;
    if (base.action !== "click") return;

    if (activeRow) {
      emit(
        OutputObject.ok({
          id: crudForm.id,
          type: "crud-form",
          action: "delete",
          data: { ...activeRow },
        })
      );
      setActiveRow(null);
    }
  };

  const renderList = () => {
    if (isTable && crudForm.document) {
      return (
        <>
          <div className="row mt-2">
            <div className="col-12">
              <AlloyTableAction
                tableAction={crudForm.document}
                output={handleTableOutput}
              />
            </div>
          </div>

          {crudForm.pagination && (
            <div className="row mt-2">
              <div className="col-12">
                <AlloyPagination
                  pagination={crudForm.pagination}
                  output={handlePaginationOutput}
                />
              </div>
            </div>
          )}
        </>
      );
    }

    if (isCard && Array.isArray(crudForm.document)) {
      return (
        <>
          <div className="row mt-2">
            {crudForm.document.map((card) => (
              <div key={card.id} className={crudForm.documentClass}>
                <AlloyCardAction cardAction={card} output={handleCardOutput} />
              </div>
            ))}
          </div>
          {crudForm.pagination && (
            <div className="row mt-2">
              <div className="col-12">
                <AlloyPagination
                  pagination={crudForm.pagination}
                  output={handlePaginationOutput}
                />
              </div>
            </div>
          )}
        </>
      );
    }

    return (
      <div className="row mt-2">
        <div className="col-12">
          <div className="alert alert-warning mt-3">No document configured for this CrudForm.</div>
        </div>
      </div>
    );
  };

  return (
    <div className={crudForm.className}>
      {/* Search remains mounted always, but hidden in form view */}
      <div className={`row input-group mt-2 ${inTableView ? "" : "d-none"}`}>
        <div className="col-sm-8">
          {crudForm.search && <AlloySearch search={crudForm.search} output={handleSearchOutput} />}
        </div>

        <div className="col-sm-4 d-flex align-items-center justify-content-end">
          {crudForm.add && <AlloyButtonIcon buttonIcon={crudForm.add} output={handleAddOutput} />}
        </div>
      </div>

      {inTableView ? (
        <>{renderList()}</>
      ) : (
        <>
          <div className="d-flex align-items-center justify-content-between mt-2 mb-3">
            <div>
              <h5 className="mb-1">
                {formMode === "edit" ? "Edit" : formMode === "delete" ? "Delete" : "Create"}
                {crudForm.name ? ` — ${crudForm.name}` : ""}
              </h5>
              <div className="text-muted small">
                Use the steps below to{" "}
                {formMode === "edit"
                  ? "update"
                  : formMode === "delete"
                  ? "review and confirm deletion of"
                  : "create"}
                {" the record."}
              </div>
            </div>

            <AlloyButtonIcon
              buttonIcon={
                new ButtonIconObject({
                  name: "Back to list",
                  icon: { iconClass: "fa-solid fa-arrow-left" },
                  className: "btn btn-outline-secondary btn-sm",
                })
              }
              output={backToTable}
            />
          </div>

          <AlloyTabForm tabForm={tabFormModel} output={handleFormOutput} />
        </>
      )}

      {crudForm.modalToast && (
        <button
          type="button"
          ref={hiddenToastTriggerRef}
          className="d-none"
          data-bs-toggle="modal"
          data-bs-target={`#${crudForm.modalToast.id}`}
        />
      )}

      {crudForm.modalToast && (
        <AlloyModalToast modalToast={crudForm.modalToast} output={handleModalToastOutput} />
      )}
    </div>
  );
}

export default AlloyCrudForm;
