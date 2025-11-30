// src/lib/components/tissue/AlloyCrudForm.jsx
import React, { useEffect, useState } from "react";

import { OutputObject, generateId } from "../../utils/idHelper.js";

import AlloySearch, { SearchObject } from "../cell/AlloySearch.jsx";
import AlloyButtonIcon, {
  ButtonIconObject,
} from "../cell/AlloyButtonIcon.jsx";

import AlloyTableAction, {
  TableActionObject,
} from "../tissue/AlloyTableAction.jsx";

import AlloyCardAction, {
  CardActionObject,
} from "../tissue/AlloyCardAction.jsx";

import AlloyPagination, {
  PaginationObject,
} from "../tissue/AlloyPagination.jsx";

// NOTE: adjust this relative import path if needed in your repo
import AlloyTabForm, {
  TabFormObject,
} from "../../components/organ/AlloyTabForm.jsx";

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
      documentClass = "col-12", // wrapper for the whole document area
      form,
      pagination,
      ...rest
    } = cfg || {};

    this.id = id ?? generateId("crud-form");
    this.name = name ?? "";
    this.className = className;

    // Search → SearchObject (wrapping inner InputObject config)
    this.search =
      search instanceof SearchObject
        ? search
        : search
        ? new SearchObject({ search })
        : null;

    // Add button → ButtonIconObject
    this.add =
      add instanceof ButtonIconObject
        ? add
        : add
        ? new ButtonIconObject(add)
        : null;

    // List type: "table" or "card"
    this.type = type === "card" ? "card" : "table";

    // document:
    //  - table → single TableActionObject
    //  - card  → array of CardActionObject
    if (this.type === "table") {
      const rawTable =
        document && !Array.isArray(document) ? document : cfg.table || {};
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
        card instanceof CardActionObject
          ? card
          : new CardActionObject(card || {})
      );
    }

    // Wrapper class for the *whole* document area
    this.documentClass = documentClass || "col-12";

    // Base TabForm config – ALWAYS a TabFormObject
    this.form =
      form instanceof TabFormObject
        ? form
        : new TabFormObject(form || { tabs: [] });

    // Optional pagination → PaginationObject
    this.pagination =
      pagination instanceof PaginationObject
        ? pagination
        : pagination
        ? new PaginationObject(pagination)
        : null;

    Object.assign(this, rest);
  }
}

/* -------------------------------------------------------
 * Helpers
 * ----------------------------------------------------- */

// Build a TabFormObject for a given mode ("create" | "edit" | "delete")
// and an optional row object (for Edit/Delete prefilling).
//
// Uses crudForm.form as the BASE TabFormObject, converts it to a plain
// config, deep clones it, injects row values into tab.inputs[].value,
// and for delete mode marks fields readOnly/disabled.
//
// For "edit" mode we ONLY prefill the *first* tab from the row.
// Other tabs are left with their base/default values so they can be
// repopulated later from a full API response.
function buildTabFormModel(crudForm, mode = "create", row = null) {
  const base =
    crudForm.form instanceof TabFormObject
      ? crudForm.form
      : new TabFormObject(crudForm.form || { tabs: [] });

  // Convert TabFormObject → plain config
  const baseCfg = {
    id: base.id,
    name: base.name,
    status: base.status,
    currentIndex: base.currentIndex,
    navButtons: base.navButtons,
    tabs: base.tabs,
  };

  // Deep clone so we can safely mutate
  const clone = JSON.parse(JSON.stringify(baseCfg || {}));

  const tabs = Array.isArray(clone.tabs) ? clone.tabs : [];

  tabs.forEach((tab, tabIndex) => {
    if (!Array.isArray(tab.inputs)) return;
    tab.inputs.forEach((input) => {
      const fieldName = input?.name;
      if (!fieldName) return;

      // For "edit" mode, ONLY prefill the FIRST tab from the row.
      // For "create" / "delete", keep original behaviour (any tab).
      const shouldPrefillFromRow =
        row &&
        Object.prototype.hasOwnProperty.call(row, fieldName) &&
        (mode !== "edit" || tabIndex === 0);

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

// Flatten TabForm values map: { tabKey: { field: value } } → { field: value }
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

/* -------------------------------------------------------
 * AlloyCrudForm
 * ----------------------------------------------------- */
export function AlloyCrudForm({ crudForm, output }) {
  if (!crudForm || !(crudForm instanceof CrudFormObject)) {
    throw new Error(
      "AlloyCrudForm requires `crudForm` (CrudFormObject instance)."
    );
  }

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  const [view, setView] = useState("table"); // "table" or "form"
  const [formMode, setFormMode] = useState("create"); // "create" | "edit" | "delete"
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

  /* ----------------- Search handlers ----------------- */

  const handleSearchOutput = (searchOut) => {
    if (!searchOut) return;

    const base =
      searchOut instanceof OutputObject && typeof searchOut.toJSON === "function"
        ? searchOut.toJSON()
        : searchOut;

    const action = base?.action || "search";
    const data = base?.data || {};

    if (action === "search" || action === "select") {
      const out = OutputObject.ok({
        id: crudForm.id,
        type: "crud-form",
        action: action === "select" ? "search-select" : "search",
        data,
      });
      emit(out);
    }
  };

  /* ----------------- Pagination handler ----------------- */

  const handlePaginationOutput = (pageOut) => {
    if (!pageOut) return;

    const base =
      pageOut instanceof OutputObject && typeof pageOut.toJSON === "function"
        ? pageOut.toJSON()
        : pageOut;

    if (base.type !== "pagination" || base.action !== "page") {
      return;
    }

    const data = base.data || {};

    const out = OutputObject.ok({
      id: crudForm.id,
      type: "crud-form",
      action: "page",
      data,
    });

    emit(out);
  };

  /* ----------------- Helpers: open/close form view ----------------- */

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

  /* ----------------- Table handlers ----------------- */

  const handleTableOutput = (tableOut) => {
    if (!tableOut) return;

    if (tableOut.type === "column" && tableOut.action === "Sort") {
      const column = tableOut.data?.name ?? "";
      const dir = tableOut.data?.dir ?? "";
      const data =
        column && typeof column === "string" ? { [column]: dir } : {};

      const out = OutputObject.ok({
        id: crudForm.id,
        type: "crud-form",
        action: "Sort",
        data,
      });

      emit(out);
      return;
    }

    if (tableOut.type === "table") {
      const row = tableOut.data || {};
      const btnName = tableOut.action || "";
      const lower = (btnName || "").toLowerCase();

      if (lower.includes("edit")) {
        // Open form in "edit" mode with initial row data
        openForm("edit", row);

        // Emit an initial editInit event so the parent can fetch
        // the FULL entity and repopulate all tabs.
        const out = OutputObject.ok({
          id: crudForm.id,
          type: "crud-form",
          action: "editInit",
          data: { ...row },
        });
        emit(out);

        return;
      }

      if (lower.includes("delete")) {
        openForm("delete", row);
        return;
      }

      if (btnName) {
        const out = OutputObject.ok({
          id: crudForm.id,
          type: "crud-form",
          action: btnName,
          data: {
            ...row,
          },
        });
        emit(out);
      }
      return;
    }

    if (tableOut.type === "row" && tableOut.action === "navigate") {
      const { to, ...restRow } = tableOut.data || {};

      const out = OutputObject.ok({
        id: crudForm.id,
        type: "crud-form",
        action: "navigate",
        data: {
          to,
          ...restRow,
        },
      });

      emit(out);
      return;
    }

    const out = OutputObject.ok({
      id: crudForm.id,
      type: "crud-form",
      action: tableOut.action || "table",
      data: { ...(tableOut.data || {}) },
    });
    emit(out);
  };

  /* ----------------- Card handlers ----------------- */

  const handleCardOutput = (cardOut) => {
    if (!cardOut || cardOut.type !== "card-action") {
      return;
    }

    const row = cardOut.data || {};
    const btnName = cardOut.action || "";
    const lower = (btnName || "").toLowerCase();

    if (lower.includes("edit")) {
      // Open form in "edit" mode with initial row data
      openForm("edit", row);

      // Emit an initial editInit event so the parent can fetch
      // the FULL entity and repopulate all tabs.
      const out = OutputObject.ok({
        id: crudForm.id,
        type: "crud-form",
        action: "editInit",
        data: { ...row },
      });
      emit(out);

      return;
    }

    if (lower.includes("delete")) {
      openForm("delete", row);
      return;
    }

    if (btnName) {
      const out = OutputObject.ok({
        id: crudForm.id,
        type: "crud-form",
        action: btnName,
        data: {
          ...row,
        },
      });
      emit(out);
    }
  };

  /* ----------------- Add button ----------------- */

  const handleAddOutput = () => {
    openForm("create", null);
  };

  /* ----------------- TabForm output ----------------- */

  const handleFormOutput = (tfOut) => {
    if (!tfOut) return;

    const base =
      tfOut instanceof OutputObject && typeof tfOut.toJSON === "function"
        ? tfOut.toJSON()
        : tfOut;

    if (base.type !== "tab-form") return;

    const tfAction = base.action; // "draft" | "submit"
    const data = base.data || {};
    const valuesByTab = data.values || {};
    const flatValues = flattenValues(valuesByTab);

    if (tfAction !== "submit") {
      return;
    }

    let action;
    if (formMode === "edit") action = "Edit";
    else if (formMode === "delete") action = "Delete";
    else action = "Create";

    const out = OutputObject.ok({
      id: crudForm.id,
      type: "crud-form",
      action,
      data: {
        ...flatValues,
      },
    });

    emit(out);
    backToTable();
  };

  /* ----------------- Render list view (table or cards) ----------------- */

  const renderList = () => {
    if (isTable && crudForm.document) {
      return (
        <>
          <div className="row mt-2">
            <div className={crudForm.documentClass}>
              <AlloyTableAction
                tableAction={crudForm.document}
                output={handleTableOutput}
              />
            </div>
          </div>

          {crudForm.pagination && (
            <div className="row mt-2">
              <div className={crudForm.documentClass}>
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
            <div className={crudForm.documentClass}>
              <div className="row">
                {crudForm.document.map((card) => (
                  <div
                    key={card.id}
                    className="col-sm-6 col-md-4 col-lg-3 mb-3"
                  >
                    <AlloyCardAction
                      cardAction={card}
                      output={handleCardOutput}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {crudForm.pagination && (
            <div className="row mt-2">
              <div className={crudForm.documentClass}>
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
        <div className={crudForm.documentClass}>
          <div className="alert alert-warning mt-3">
            No document configured for this CrudForm.
          </div>
        </div>
      </div>
    );
  };

  /* ----------------- Render ----------------- */

  return (
    <div className={crudForm.className}>
      {inTableView ? (
        <>
          {/* Search + Add row */}
          <div className="row input-group mt-2">
            <div className="col-sm-8">
              {crudForm.search && (
                <AlloySearch
                  search={crudForm.search}
                  output={handleSearchOutput}
                />
              )}
            </div>

            <div className="col-sm-4 d-flex align-items-center justify-content-end">
              {crudForm.add && (
                <AlloyButtonIcon
                  buttonIcon={crudForm.add}
                  output={handleAddOutput}
                />
              )}
            </div>
          </div>

          {/* Table or Card grid wrapped in row + documentClass + pagination */}
          {renderList()}
        </>
      ) : (
        <>
          {/* Form header with back-to-list */}
          <div className="d-flex align-items-center justify-content-between mt-2 mb-3">
            <div>
              <h5 className="mb-1">
                {formMode === "edit"
                  ? "Edit"
                  : formMode === "delete"
                  ? "Delete"
                  : "Create"}
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

          {/* Tab-based form view */}
          <AlloyTabForm tabForm={tabFormModel} output={handleFormOutput} />
        </>
      )}
    </div>
  );
}

export default AlloyCrudForm;
