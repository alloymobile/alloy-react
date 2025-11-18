// src/components/tissue/AlloyTableAction.jsx
import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AlloyIcon, { IconObject } from "../cell/AlloyIcon.jsx";
import AlloyButtonBar, { ButtonBarObject } from "./AlloyButtonBar.jsx";
import { generateId, OutputObject } from "../../utils/idHelper.js";

/* ---------------------- helpers ---------------------- */
function capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Preserve original object-key order from the first row,
// but always exclude "id" from headers and cells.
function getHeaderKeys(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return [];
  const first = rows[0] ?? {};
  return Object.keys(first).filter((k) => k !== "id");
}

// Resolve a meaningful action name for buttons/links
function resolveActionName(self) {
  if (!self || typeof self !== "object") return "";

  const name =
    typeof self.name === "string" ? self.name.trim() : "";
  if (name) return name;

  const aria =
    typeof self.ariaLabel === "string" ? self.ariaLabel.trim() : "";
  if (aria) return aria;

  const title =
    typeof self.title === "string" ? self.title.trim() : "";
  if (title) return title;

  const id =
    typeof self.id === "string" ? self.id.trim() : "";
  if (id) return id;

  return "";
}

/* ---------------------- Model ---------------------- */
/**
 * TableActionObject
 *
 * Shape:
 *  - id?: string
 *  - className?: string                (table classes)
 *  - name?: string                     (caption)
 *  - rows?: Array<object>              (each row should contain unique `id`)
 *  - icon?: IconObject|object          (left "Type" column icon)
 *  - sort?: IconObject|object          (column-sort indicator arrow icon)
 *  - actions?: ButtonBarObject|object  (OPTIONAL; if present, rendered in last column)
 *  - link?: string                     (OPTIONAL base route; if set, cells become <Link> to `${link}/${row.id}`)
 */
export class TableActionObject {
  /**
   * @param {Object} cfg
   */
  constructor(cfg = {}) {
    // unique id for this table instance
    this.id = cfg.id ?? generateId("table-action");

    // table basics
    this.className = cfg.className ?? "table";
    this.name = cfg.name ?? "table";

    // rows
    this.rows = Array.isArray(cfg.rows) ? cfg.rows.slice() : [];

    // base route for navigation links
    this.link = typeof cfg.link === "string" ? cfg.link : "";

    // default icons for icon/sort
    const defaultIcon = new IconObject({ iconClass: "fa-solid fa-user" });
    const defaultSort = new IconObject({ iconClass: "fa-solid fa-arrow-down" });

    // normalize icon into IconObject
    this.icon =
      cfg.icon instanceof IconObject
        ? cfg.icon
        : new IconObject(cfg.icon || defaultIcon);

    // normalize sort icon into IconObject
    this.sort =
      cfg.sort instanceof IconObject
        ? cfg.sort
        : new IconObject(cfg.sort || defaultSort);

    // normalize actions -> ButtonBarObject (OPTIONAL)
    this.actions = cfg.actions
      ? cfg.actions instanceof ButtonBarObject
        ? cfg.actions
        : new ButtonBarObject(cfg.actions)
      : undefined;
  }
}

/* ---------------------- Component ---------------------- */
/**
 * AlloyTableAction
 *
 * Props:
 *  - tableAction: TableActionObject (required)
 *  - output?: (payload: any) => void
 *
 * Emits:
 *  • Header click (sort intent):
 *      OutputObject -> {
 *        id: <table-id>,
 *        type: "column",
 *        action: "Sort",
 *        error: false,
 *        data: { name: <columnName>, dir: "asc" | "desc" }
 *      }
 *
 *  • Row action click (button actions):
 *      OutputObject -> {
 *        id: <table-id>,
 *        type: "table",
 *        action: <button name / ariaLabel / title / id>,
 *        error: false,
 *        data: <full row object>
 *      }
 *
 *  • Cell click (when `link` set → navigation intent):
 *      OutputObject -> {
 *        id: <table-id>,
 *        type: "row",
 *        action: "navigate",
 *        error: false,
 *        data: { to: <url>, ...row }
 *      }
 */
export function AlloyTableAction({ tableAction, output }) {
  if (!tableAction || !(tableAction instanceof TableActionObject)) {
    throw new Error(
      "AlloyTableAction requires `tableAction` (TableActionObject instance)."
    );
  }

  // Stable table id for all OutputObject.id
  const tblIdRef = useRef(tableAction.id);

  // derive headers (once per data change)
  const headerKeys = useMemo(
    () => getHeaderKeys(tableAction.rows),
    [tableAction.rows]
  );

  // purely visual sort state (server decides actual row order)
  const [sort, setSort] = useState({ col: "", dir: "asc" });

  function handleHeaderClick(colName) {
    const nextDir =
      sort.col === colName && sort.dir === "asc" ? "desc" : "asc";
    setSort({ col: colName, dir: nextDir });

    const out = new OutputObject({
      id: tblIdRef.current,
      type: "column",
      action: "Sort",
      error: false,
      data: {
        name: colName,
        dir: nextDir
      }
    });

    output?.(out);
  }

  // When a row's action button is clicked, emit standardized OutputObject
  function makeRowActionEmitter(row) {
    return (self, e) => {
      const actionName = resolveActionName(self);

      const out = new OutputObject({
        id: tblIdRef.current,
        type: "table",
        action: actionName,
        error: false,
        data: row
      });

      output?.(out);
    };
  }

  // Do we have an actions bar at all?
  const hasActionsBar = !!tableAction.actions;

  return (
    <table id={tblIdRef.current} className={tableAction.className}>
      <caption className="caption-top text-center">
        {tableAction.name}
      </caption>

      <thead>
        <tr>
          {/* first column: icon */}
          <th scope="col">Type</th>

          {/* data-driven headers */}
          {headerKeys.map((key) => {
            const isActive = sort.col === key;
            const isDesc = isActive && sort.dir === "desc";

            return (
              <th key={`h-${key}`} scope="col">
                <span
                  onClick={() => handleHeaderClick(key)}
                  style={{ userSelect: "none", cursor: "pointer" }}
                >
                  {capitalize(key)}
                  {isActive && (
                    <span
                      className="ms-1 d-inline-flex align-middle"
                      aria-hidden="true"
                      title={isDesc ? "Sorted descending" : "Sorted ascending"}
                      style={{
                        transform: isDesc ? "rotate(180deg)" : "none",
                        transition: "transform 120ms"
                      }}
                    >
                      <AlloyIcon icon={tableAction.sort} />
                    </span>
                  )}
                </span>
              </th>
            );
          })}

          {/* actions column header (optional) */}
          {hasActionsBar && (
            <th scope="col" className="text-end">
              Actions
            </th>
          )}
        </tr>
      </thead>

      <tbody>
        {tableAction.rows.length > 0 ? (
          tableAction.rows.map((row, idx) => {
            const rowId = row?.id ?? idx;

            // Reuse the SAME actions bar instance for each row.
            const rowBar = tableAction.actions;

            return (
              <tr key={rowId}>
                {/* icon cell */}
                <td>
                  <AlloyIcon icon={tableAction.icon} />
                </td>

                {/* data cells */}
                {headerKeys.map((key) => {
                  const base = tableAction.link || "";
                  const cleanedBase = base.endsWith("/")
                    ? base.slice(0, -1)
                    : base;
                  const to = cleanedBase ? `${cleanedBase}/${rowId}` : "";

                  return (
                    <td key={`${rowId}-${key}`}>
                      {cleanedBase ? (
                        <Link
                          to={to}
                          onClick={() => {
                            const out = new OutputObject({
                              id: tblIdRef.current,
                              type: "row",
                              action: "navigate",
                              error: false,
                              data: {
                                to,
                                ...row
                              }
                            });
                            output?.(out);
                          }}
                          className="text-decoration-none"
                        >
                          <span>{row?.[key]}</span>
                        </Link>
                      ) : (
                        <span>{row?.[key]}</span>
                      )}
                    </td>
                  );
                })}

                {/* actions cell (optional) */}
                {hasActionsBar && (
                  <td className="text-end">
                    <AlloyButtonBar
                      buttonBar={rowBar}
                      output={makeRowActionEmitter(row)}
                    />
                  </td>
                )}
              </tr>
            );
          })
        ) : (
          <tr>
            <td
              colSpan={
                // icon col + data cols (+ actions col if present)
                1 + headerKeys.length + (hasActionsBar ? 1 : 0)
              }
              className="text-center text-secondary"
            >
              No rows
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default AlloyTableAction;
