import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AlloyIcon, { IconObject } from "../cell/AlloyIcon.jsx";

/* -------------------- utils --------------------------- */
function capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* -------------------- id generator -------------------- */
let __tableLinkCounter = 0;
function nextTableLinkId() {
  __tableLinkCounter += 1;
  return `tablelink${__tableLinkCounter}`;
}

/* -------------------- Model --------------------------- */
/**
 * TableLinkObject
 *  - id?: string
 *  - className?: string               // e.g. "table table-hover"
 *  - name?: string                    // caption
 *  - rows?: Array<object>             // each row should include unique `id`
 *  - icon?: IconObject|object         // first "Type" column icon
 *  - sort?: IconObject|object         // header sort indicator icon
 *  - link: string                     // REQUIRED; base route (e.g., "/users")
 */
export class TableLinkObject {
  constructor(p = {}) {
    if (!p.link) throw new Error("TableLinkObject requires `link` (base route).");

    this.id = p.id ?? nextTableLinkId();
    this.className = p.className ?? "table";
    this.name = p.name ?? "table";
    this.rows = Array.isArray(p.rows) ? p.rows.slice() : [];
    this.link = p.link; // base route

    // Defaults
    const defaultIcon = new IconObject({ iconClass: "fa-solid fa-user" });
    const defaultSort = new IconObject({ iconClass: "fa-solid fa-arrow-down" });

    this.icon =
      p.icon instanceof IconObject ? p.icon : new IconObject(p.icon || defaultIcon);
    this.sort =
      p.sort instanceof IconObject ? p.sort : new IconObject(p.sort || defaultSort);
  }
}

/* -------------------- helpers ------------------------- */
function getHeaderKeys(rows) {
  if (!rows || rows.length === 0) return [];
  // Canonical order from first row; exclude special "id"
  return Object.keys(rows[0]).filter((k) => k !== "id");
}

/* -------------------- Component ----------------------- */
/**
 * Props:
 *  - table: TableLinkObject (required)
 *  - output?: (payload:
 *        { type: "column", name: string, dir: "asc"|"desc" } |
 *        { type: "navigate", to: string, id: string|number }
 *    ) => void
 *
 * Notes:
 *  - No client sorting; header click only toggles local icon + emits column intent.
 *  - Each data cell (except icon column) navigates to `${tableLink.link}/${row.id}`.
 */
export function AlloyTableLink({ tableLink, output }) {
  if (!tableLink || !(tableLink instanceof TableLinkObject)) {
    throw new Error("AlloyTableLink requires `tableLink` (TableLinkObject instance).");
  }

  const tableIdRef = useRef(tableLink.id);
  const [sort, setSort] = useState({ col: "", dir: "asc" }); // icon-only

  const headerKeys = useMemo(() => getHeaderKeys(tableLink.rows), [tableLink.rows]);

  const handleHeaderClick = (name) => {
    if (!name) return;
    const nextDir = sort.col === name && sort.dir === "asc" ? "desc" : "asc";
    setSort({ col: name, dir: nextDir });
    output?.({ type: "column", name, dir: nextDir });
  };

  return (
    <table id={tableIdRef.current} className={tableLink.className}>
      <caption className="caption-top text-center">{tableLink.name}</caption>

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
                      <AlloyIcon icon={tableLink.sort} />
                    </span>
                  )}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {(tableLink.rows ?? []).length > 0 ? (
          (tableLink.rows ?? []).map((row, idx) => {
            const rowId = row?.id ?? idx;
            const toBase = tableLink.link.endsWith("/")
              ? tableLink.link.slice(0, -1)
              : tableLink.link;
            const to = `${toBase}/${rowId}`;

            return (
              <tr key={rowId}>
                <td>
                  <AlloyIcon icon={tableLink.icon} />
                </td>

                {/* Each cell is a <Link> to `${link}/${id}` (id column excluded) */}
                {headerKeys.map((key) => (
                  <td key={`${rowId}-${key}`}>
                    <Link
                      to={to}
                      onClick={() => output?.({ type: "navigate", to, id: rowId })}
                      className="text-decoration-none"
                    >
                      <span>{row?.[key]}</span>
                    </Link>
                  </td>
                ))}
              </tr>
            );
          })
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

export default AlloyTableLink;
