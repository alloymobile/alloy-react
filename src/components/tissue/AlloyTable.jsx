// src/components/tissue/AlloyTable.jsx
import React, { useMemo, useRef, useState } from "react";
import AlloyIcon, { IconObject } from "../cell/AlloyIcon.jsx";

/* utils */
function capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* id generator */
let __tableCounter = 0;
function nextTableId() {
  __tableCounter += 1;
  return `table${__tableCounter}`;
}

/* Model */
export class TableObject {
  constructor(p = {}) {
    this.id = p.id ?? nextTableId();
    this.className = p.className ?? "table";
    this.name = p.name ?? "table";
    this.rows = Array.isArray(p.rows) ? p.rows.slice() : [];

    // defaults
    const defaultIcon = new IconObject({ iconClass: "fa-solid fa-user" });
    const defaultSort = new IconObject({ iconClass: "fa-solid fa-arrow-down" });

    this.icon = p.icon instanceof IconObject ? p.icon : new IconObject(p.icon || defaultIcon);
    this.sort = p.sort instanceof IconObject ? p.sort : new IconObject(p.sort || defaultSort);
  }
}

/* helpers */
function getHeaderKeys(rows) {
  if (!rows || rows.length === 0) return [];
  return Object.keys(rows[0]).filter((k) => k !== "id"); // preserve first-row order; skip id
}

/* Component
   Props:
   - table: TableObject
   - output?: ({ type: "column", name, dir } | { type: "row", id }) => void
*/
export function AlloyTable({ table, output }) {
  if (!table || !(table instanceof TableObject)) {
    throw new Error("AlloyTable requires `table` (TableObject instance).");
  }

  const tableIdRef = useRef(table.id);

  // Local icon-only state (like Angular's `sort`)
  const [sort, setSort] = useState({ col: "", dir: "asc" });

  const headerKeys = useMemo(() => getHeaderKeys(table.rows), [table.rows]);

  const handleHeaderClick = (name) => {
    if (!name) return;
    const nextDir = sort.col === name && sort.dir === "asc" ? "desc" : "asc";
    setSort({ col: name, dir: nextDir });                 // just UI indicator
    output?.({ type: "column", name, dir: nextDir });     // tell parent/server to fetch
  };

  const handleRowClick = (rowId) => {
    output?.({ type: "row", id: rowId });
  };

  return (
    <table id={tableIdRef.current} className={table.className}>
      <caption className="caption-top text-center">{table.name}</caption>

      <thead>
        <tr>
          <th scope="col">Type</th>
          {headerKeys.map((key) => {
            const isActive = sort.col === key;
            const isDesc = isActive && sort.dir === "desc";
            return (
              <th key={key} scope="col">
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
                      <AlloyIcon icon={table.sort} />
                    </span>
                  )}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {(table.rows ?? []).length > 0 ? (
          (table.rows ?? []).map((row, idx) => (
            <tr key={row?.id ?? idx} onClick={() => handleRowClick(row?.id)}>
              <td>
                <AlloyIcon icon={table.icon} />
              </td>
              {headerKeys.map((key) => (
                <td key={`${row?.id ?? idx}-${key}`} className="cursor">
                  <span>{row?.[key]}</span>
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={Math.max(1, headerKeys.length) + 1} className="text-center text-secondary">
              No rows
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default AlloyTable;
