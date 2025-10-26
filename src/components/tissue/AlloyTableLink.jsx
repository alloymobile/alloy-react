// src/components/tissue/AlloyTableLink.jsx
import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
 * @typedef {Object} TableLinkRow
 * @property {string|number} [id]
 *    Row identifier; used in the generated link `${baseLink}/${id}`.
 *    All other keys on the row are rendered as data cells.
 *
 * Example row:
 * { id: 42, name: "Ada Lovelace", role: "Admin" }
 *
 * -------------------------------------------
 * @typedef {Object} TableLinkConfig
 *
 * @property {string} link
 *    REQUIRED. Base route for link generation. e.g. "/users"
 *    Each row will link to `${link}/${row.id}`.
 *
 * @property {string} [id]
 *    Optional. DOM id for <table>. If not provided,
 *    we'll generate one with generateId("table-link").
 *
 * @property {string} [className]
 *    Optional. Class for the <table>.
 *    Default: "table"
 *
 * @property {string} [name]
 *    Optional. Caption text (table title).
 *    Default: "table"
 *
 * @property {TableLinkRow[]} [rows]
 *    Optional. Array of row objects. We do not transform them;
 *    we just render columns from the first row’s keys.
 *
 * @property {IconObject|{iconClass:string,id?:string}} [icon]
 *    Optional. Icon shown in the first "Type" column for each row.
 *    Defaults to a user icon.
 *
 * @property {IconObject|{iconClass:string,id?:string}} [sort]
 *    Optional. Icon used in headers to indicate sort direction.
 *    Defaults to a down arrow icon.
 *
 * After construction, AlloyTableLink can trust:
 *  - tableLink.id is string
 *  - tableLink.className is string
 *  - tableLink.name is string
 *  - tableLink.rows is an array
 *  - tableLink.link is string
 *  - tableLink.icon is IconObject
 *  - tableLink.sort is IconObject
 * ----------------------------------------- */

/**
 * TableLinkObject
 *
 * Data model for AlloyTableLink.
 * It:
 *  - enforces that `link` is provided
 *  - copies or defaults everything else
 *  - wraps `icon` and `sort` with IconObject
 *  - generates a stable id if missing
 *
 * It does NOT:
 *  - manage sorting state
 *  - emit events
 *  - alter rows
 *  - do navigation
 */
export class TableLinkObject {
  /**
   * @param {TableLinkConfig} tableLink
   */
  constructor(tableLink = {}) {
    // required prop
    if (!tableLink.link) {
      throw new Error("TableLinkObject requires `link` (base route).");
    }

    // id
    this.id = tableLink.id ?? generateId("table-link");

    // presentation bits
    this.className = tableLink.className ?? "table";
    this.name = tableLink.name ?? "table";

    // row data (shallow copied for safety)
    this.rows = Array.isArray(tableLink.rows)
      ? tableLink.rows.slice()
      : [];

    // base route for row links
    this.link = tableLink.link;

    // icon defaults
    const fallbackRowIcon = { iconClass: "fa-solid fa-user" };
    const fallbackSortIcon = { iconClass: "fa-solid fa-arrow-down" };

    // normalize icons
    this.icon =
      tableLink.icon instanceof IconObject
        ? tableLink.icon
        : new IconObject(tableLink.icon || fallbackRowIcon);

    this.sort =
      tableLink.sort instanceof IconObject
        ? tableLink.sort
        : new IconObject(tableLink.sort || fallbackSortIcon);
  }
}

/* -------------------------------------------
 * Internal helper:
 * Pick column order from first row's keys,
 * skipping "id" because that's used for linking.
 * ----------------------------------------- */
function getHeaderKeys(rows) {
  if (!rows || rows.length === 0) return [];
  return Object.keys(rows[0]).filter((k) => k !== "id");
}

/* -------------------------------------------
 * AlloyTableLink
 *
 * Renders:
 *   <table>
 *     <caption />
 *     <thead> clickable column headers for sort intent
 *     <tbody> rows where each cell (besides icon) is a <Link>
 *
 * Props:
 *   - tableLink: TableLinkObject (required)
 *   - output?: (payload) => void
 *
 * Payload on column header click:
 *   {
 *     type: "column",
 *     name: "<colName>",
 *     dir: "asc" | "desc"
 *   }
 *
 * Payload on row cell click (navigation intent):
 *   {
 *     type: "navigate",
 *     to: "/base/<row.id>",
 *     id: <row.id>
 *   }
 *
 * Notes:
 *  - We don't actually navigate manually; <Link> handles navigation.
 *    We just emit the intent in case the parent wants analytics, etc.
 *  - We keep a local "sort" state (col + dir) for arrow rotation,
 *    but we do NOT reorder the data. Server/parent handles that.
 * ----------------------------------------- */
export function AlloyTableLink({ tableLink, output }) {
  if (!tableLink || !(tableLink instanceof TableLinkObject)) {
    throw new Error(
      "AlloyTableLink requires `tableLink` (TableLinkObject instance)."
    );
  }

  const tableIdRef = useRef(tableLink.id);

  // purely visual sort hint
  const [sort, setSort] = useState({ col: "", dir: "asc" });

  // column keys from the first row
  const headerKeys = useMemo(
    () => getHeaderKeys(tableLink.rows),
    [tableLink.rows]
  );

  // click on column header -> toggle local arrow + emit intent
  const handleHeaderClick = (name) => {
    if (!name) return;

    const nextDir =
      sort.col === name && sort.dir === "asc" ? "desc" : "asc";

    setSort({ col: name, dir: nextDir });

    output?.({
      type: "column",
      name,
      dir: nextDir,
    });
  };

  return (
    <table id={tableIdRef.current} className={tableLink.className}>
      {/* Caption/title */}
      <caption className="caption-top text-center">
        {tableLink.name}
      </caption>

      {/* Header */}
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
                      <AlloyIcon icon={tableLink.sort} />
                    </span>
                  )}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      {/* Body */}
      <tbody>
        {tableLink.rows.length > 0 ? (
          tableLink.rows.map((row, idx) => {
            const rowId = row?.id ?? idx;

            // normalize `to` so we don't end up with double slashes
            const base = tableLink.link.endsWith("/")
              ? tableLink.link.slice(0, -1)
              : tableLink.link;
            const to = `${base}/${rowId}`;

            return (
              <tr key={rowId}>
                {/* leading icon cell */}
                <td>
                  <AlloyIcon icon={tableLink.icon} />
                </td>

                {/* data cells, each wrapped in a Link to /base/<rowId> */}
                {headerKeys.map((key) => (
                  <td key={`${rowId}-${key}`}>
                    <Link
                      to={to}
                      className="text-decoration-none"
                      onClick={() =>
                        output?.({
                          type: "navigate",
                          to,
                          id: rowId,
                        })
                      }
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

export default AlloyTableLink;
