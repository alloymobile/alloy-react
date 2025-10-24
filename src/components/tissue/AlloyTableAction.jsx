// src/components/tissue/AlloyTableAction.jsx
import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AlloyIcon, { IconObject } from "../cell/AlloyIcon.jsx";
import AlloyButtonBar, { ButtonBarObject } from "./AlloyButtonBar.jsx";

/* ---------------------- id generator ---------------------- */
let __tblActionCounter = 0;
function nextTableActionId() {
  __tblActionCounter += 1;
  return `tableaction${__tblActionCounter}`;
}

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

/* ---------------------- Model ---------------------- */
export class TableActionObject {
  /**
   * @param {{
   *   id?: string,
   *   className?: string,
   *   name?: string,
   *   rows?: Array<Record<string, any>>,
   *   icon?: IconObject|object,
   *   sort?: IconObject|object,
   *   actions: ButtonBarObject|object,  // REQUIRED
   *   link?: string                     // OPTIONAL, base route for row links; e.g. "/users"
   * }} p
   */
  constructor(p = {}) {
    if (!p.actions) throw new Error("TableActionObject requires `actions`.");

    this.id = p.id ?? nextTableActionId();
    this.className = p.className ?? "table";
    this.name = p.name ?? "table";
    this.rows = Array.isArray(p.rows) ? p.rows.slice() : [];
    this.link = typeof p.link === "string" ? p.link : ""; // if provided, cells become Links

    const defaultIcon = new IconObject({ iconClass: "fa-solid fa-user" });
    const defaultSort = new IconObject({ iconClass: "fa-solid fa-arrow-down" });

    // icon/sort can be raw or instances
    this.icon = p.icon instanceof IconObject ? p.icon : new IconObject(p.icon || defaultIcon);
    this.sort = p.sort instanceof IconObject ? p.sort : new IconObject(p.sort || defaultSort);

    // Ensure actions is a ButtonBarObject; it hydrates its own internal buttons.
    this.actions = p.actions instanceof ButtonBarObject ? p.actions : new ButtonBarObject(p.actions || {});
  }
}

/* ---------------------- Component ---------------------- */
/**
 * Props:
 *  - tableAction: TableActionObject (required)
 *  - output?: (payload: any) => void
 *      Emits:
 *        • { type: "column", name, dir } on header click (you sort on server)
 *        • { type: "action", action, row } when an action button is clicked
 *        • { type: "navigate", to, id, row } when a row cell link is clicked
 */
export function AlloyTableAction({ tableAction, output }) {
  if (!tableAction || !(tableAction instanceof TableActionObject)) {
    throw new Error("AlloyTableAction requires `tableAction` (TableActionObject instance).");
  }

  const tblIdRef = useRef(tableAction.id);
  const headerKeys = useMemo(() => getHeaderKeys(tableAction.rows), [tableAction.rows]);

  // Local sort indicator (UI only; server actually sorts)
  const [sort, setSort] = useState({ col: "", dir: "asc" });

  function handleHeaderClick(colName) {
    const nextDir = sort.col === colName && sort.dir === "asc" ? "desc" : "asc";
    setSort({ col: colName, dir: nextDir });
    output?.({ type: "column", name: colName, dir: nextDir });
  }

  // Pass action events up with the row data
  function makeRowActionEmitter(row) {
    return (self, e) => {
      output?.({
        type: "action",
        action: {
          id: self?.id,
          name: self?.name,
          className: self?.className,
          active: self?.active,
          disabled: !!self?.disabled,
          title: self?.title,
          ariaLabel: self?.ariaLabel,
          tabIndex: self?.tabIndex,
          iconClass: self?.icon?.iconClass,
        },
        row,
      });
    };
  }

  return (
    <table id={tblIdRef.current} className={tableAction.className}>
      <caption className="caption-top text-center">{tableAction.name}</caption>
      <thead>
        <tr>
          <th scope="col">Type</th>
          {headerKeys.map((key) => {
            const isActive = sort.col === key;
            const isDesc = isActive && sort.dir === "desc";
            return (
              <th key={`h-${key}`} scope="col">
                <span
                  onClick={() => handleHeaderClick(key)}
                  style={{ userSelect: "none" }}
                >
                  {capitalize(key)}
                  {isActive && (
                    <span
                      className="ms-1 d-inline-flex align-middle"
                      aria-hidden="true"
                      title={isDesc ? "Sorted descending" : "Sorted ascending"}
                      style={{
                        transform: isDesc ? "rotate(180deg)" : "none",
                        transition: "transform 120ms",
                      }}
                    >
                      <AlloyIcon icon={tableAction.sort} />
                    </span>
                  )}
                </span>
              </th>
            );
          })}
          <th scope="col" className="text-end">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {tableAction.rows.map((row, idx) => {
          const rowId = row?.id ?? idx;

          // Reuse the SAME actions bar instance for each row (no cloning)
          const rowBar = tableAction.actions;

          return (
            <tr key={rowId}>
              <td>
                <AlloyIcon icon={tableAction.icon} />
              </td>

              {/* Cells — optionally wrapped in <Link> if tableAction.link is provided */}
              {headerKeys.map((key) => {
                const to = tableAction.link ? `${tableAction.link}/${rowId}` : "";
                return (
                  <td key={`${rowId}-${key}`}>
                    {tableAction.link ? (
                      <Link
                        to={to}
                        onClick={() => output?.({ type: "navigate", to, id: rowId, row })}
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

              {/* Actions column */}
              <td className="text-end">
                <AlloyButtonBar buttonBar={rowBar} output={makeRowActionEmitter(row)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default AlloyTableAction;
