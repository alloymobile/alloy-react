// src/components/tissue/AlloyTable.jsx
import React, { useMemo, useRef, useState } from "react";
import AlloyIcon, { IconObject } from "../cell/AlloyIcon.jsx";
import { generateId } from "../../utils/idHelper.js";

/* -------------------------------------------
 * Small util: capitalize column header labels
 * ----------------------------------------- */
function capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* -------------------------------------------
 * @typedef {Object} TableRow
 * @property {string|number} [id]
 *    Row identifier. Emitted in output() when this row is clicked.
 *    All other keys on the row will be rendered as <td> cells.
 *
 * Example row:
 * { id: "u1", name: "Alice", email: "a@example.com" }
 *
 * -------------------------------------------
 * @typedef {Object} TableConfig
 *
 * @property {string}        [id]
 *    Optional. DOM id for <table>. If missing, we'll generate via generateId("table").
 *
 * @property {string}        [className]
 *    Optional. Class for the <table>.
 *    Defaults to "table".
 *
 * @property {string}        [name]
 *    Optional. Name/label for the table, rendered in <caption>.
 *    Defaults to "table".
 *
 * @property {TableRow[]}    [rows]
 *    Optional. Array of plain row objects. We don't transform them;
 *    we just render keys from the first row as columns.
 *
 * @property {IconObject|{iconClass:string,id?:string}} [icon]
 *    Optional. IconObject (or plain { iconClass }) rendered in the first column
 *    of every row. Defaults to a "user" icon.
 *
 * @property {IconObject|{iconClass:string,id?:string}} [sort]
 *    Optional. IconObject (or plain { iconClass }) used to show sort direction
 *    in the column headers. Defaults to a "arrow-down" icon.
 *
 * After construction, AlloyTable can trust:
 *  - table.id is a string
 *  - table.className is string
 *  - table.name is string
 *  - table.rows is an array
 *  - table.icon is an IconObject
 *  - table.sort is an IconObject
 * ----------------------------------------- */

/**
 * TableObject
 *
 * Data model for AlloyTable.
 * Owns:
 *  - id generation
 *  - default className
 *  - default icons
 *  - shallow copy of rows
 *
 * Does NOT:
 *  - sort/filter rows
 *  - emit events
 *  - keep UI sort state
 */
export class TableObject {
  /**
   * @param {TableConfig} table
   */
  constructor(table = {}) {
    // 1. id
    this.id = table.id ?? generateId("table");

    // 2. table styling + label
    this.className = table.className ?? "table";
    this.name = table.name ?? "table";

    // 3. rows (shallow copy to avoid accidental external mutation refs)
    this.rows = Array.isArray(table.rows) ? table.rows.slice() : [];

    // 4. icons
    // default row icon
    const fallbackRowIcon = { iconClass: "fa-solid fa-user" };
    // default sort icon
    const fallbackSortIcon = { iconClass: "fa-solid fa-arrow-down" };

    const normalizedIcon =
      table.icon instanceof IconObject
        ? table.icon
        : new IconObject(table.icon || fallbackRowIcon);

    const normalizedSortIcon =
      table.sort instanceof IconObject
        ? table.sort
        : new IconObject(table.sort || fallbackSortIcon);

    this.icon = normalizedIcon;
    this.sort = normalizedSortIcon;
  }
}

/* -------------------------------------------
 * Internal helper: derive table headers
 * We treat keys of the first row as the canonical column order.
 * We intentionally skip "id" so "id" isn't rendered as a normal column.
 * ----------------------------------------- */
function getHeaderKeys(rows) {
  if (!rows || rows.length === 0) return [];
  return Object.keys(rows[0]).filter((k) => k !== "id");
}

/* -------------------------------------------
 * AlloyTable
 *
 * Renders:
 *  <table>
 *    <caption>
 *    <thead> clickable headers (sort hint only; parent does real sorting)
 *    <tbody> rows (clickable rows)
 *
 * Props:
 *  - table: TableObject (required)
 *  - output?: (payload: {
 *        type: "column",
 *        name: string,   // column key clicked
 *        dir: "asc"|"desc"
 *     } | {
 *        type: "row",
 *        id: string|number|undefined
 *     }) => void
 *
 * Behavior:
 *  - Clicking a header toggles local sort state {col,dir} and emits {type:"column"...}
 *    so parent/server can fetch real sorted data.
 *  - Clicking a row emits {type:"row", id: row.id}
 *  - We do NOT mutate table.rows or reorder them ourselves.
 *  - We do NOT transform table.icon / table.sort here. That's the model's job.
 * ----------------------------------------- */
export function AlloyTable({ table, output }) {
  if (!table || !(table instanceof TableObject)) {
    throw new Error("AlloyTable requires `table` (TableObject instance).");
  }

  const tableIdRef = useRef(table.id);

  // local-only UI state for current "sort hint"
  const [sort, setSort] = useState({ col: "", dir: "asc" });

  // figure out which keys to render as columns
  const headerKeys = useMemo(
    () => getHeaderKeys(table.rows),
    [table.rows]
  );

  // user clicked a column header
  const handleHeaderClick = (colName) => {
    if (!colName) return;

    // flip direction if clicking same col
    const nextDir =
      sort.col === colName && sort.dir === "asc" ? "desc" : "asc";

    setSort({ col: colName, dir: nextDir });

    // tell parent so it can (re)fetch or sort externally
    output?.({
      type: "column",
      name: colName,
      dir: nextDir,
    });
  };

  // user clicked a row
  const handleRowClick = (rowId) => {
    output?.({
      type: "row",
      id: rowId,
    });
  };

  return (
    <table id={tableIdRef.current} className={table.className}>
      {/* Table name / caption */}
      <caption className="caption-top text-center">{table.name}</caption>

      {/* Header row */}
      <thead>
        <tr>
          {/* Icon column label */}
          <th scope="col">Type</th>

          {headerKeys.map((key) => {
            const isActive = sort.col === key;
            const isDesc = isActive && sort.dir === "desc";

            return (
              <th key={key} scope="col">
                <span
                  onClick={() => handleHeaderClick(key)}
                  style={{ userSelect: "none", cursor: "pointer" }}
                >
                  {capitalize(key)}

                  {isActive && (
                    <span
                      className="ms-1 d-inline-flex align-middle"
                      aria-hidden="true"
                      title={
                        isDesc
                          ? "Sorted descending"
                          : "Sorted ascending"
                      }
                      style={{
                        transform: isDesc ? "rotate(180deg)" : "none",
                        transition: "transform 120ms",
                      }}
                    >
                      <AlloyIcon icon={table.sort} />
                    </span>
                  )}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      {/* Body rows */}
      <tbody>
        {table.rows.length > 0 ? (
          table.rows.map((row, idx) => (
            <tr
              key={row?.id ?? idx}
              onClick={() => handleRowClick(row?.id)}
              style={{ cursor: "pointer" }}
            >
              {/* icon col */}
              <td>
                <AlloyIcon icon={table.icon} />
              </td>

              {/* data cols */}
              {headerKeys.map((key) => (
                <td key={`${row?.id ?? idx}-${key}`}>
                  <span>{row?.[key]}</span>
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={Math.max(1, headerKeys.length) + 1}
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

export default AlloyTable;
