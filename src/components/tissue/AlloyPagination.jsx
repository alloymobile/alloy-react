// src/components/tissue/AlloyPagination.jsx

import React, { useMemo } from "react";

import AlloyButtonIcon, { ButtonIconObject } from "../cell/AlloyButtonIcon.jsx";
import { generateId, OutputObject } from "../../utils/idHelper.js";

/* -------------------------------------------------------
 * PaginationObject
 * ----------------------------------------------------- */
export class PaginationObject {
  constructor(cfg = {}) {
    const {
      id,
      name,
      className,

      listClassName,
      itemClassName,
      activeClassName,
      disabledClassName,

      totalPages,
      totalElements,
      last,
      numberOfElements,
      size,
      number,
      first,
      empty,

      ...rest
    } = cfg || {};

    this.id = id ?? generateId("pagination");
    this.name = name ?? "";
    this.className =
      className ?? "d-flex justify-content-end align-items-center mt-2";

    this.listClassName =
      listClassName ?? "pagination justify-content-end mb-0";
    this.itemClassName = itemClassName ?? "page-item";
    this.activeClassName = activeClassName ?? "active";
    this.disabledClassName = disabledClassName ?? "disabled";

    // Server-side pagination info
    this.totalPages =
      typeof totalPages === "number" && totalPages >= 0 ? totalPages : 0;
    this.totalElements =
      typeof totalElements === "number" && totalElements >= 0
        ? totalElements
        : 0;

    this.size = typeof size === "number" ? size : 0;

    this.pageNumber = typeof number === "number" && number >= 0 ? number : 0;

    this.numberOfElements =
      typeof numberOfElements === "number" ? numberOfElements : 0;

    this.empty = !!empty;

    this.first = typeof first === "boolean" ? first : this.pageNumber === 0;

    this.last =
      typeof last === "boolean"
        ? last
        : this.totalPages > 0
        ? this.pageNumber >= this.totalPages - 1
        : true;

    Object.assign(this, rest);
  }
}

/* -------------------------------------------------------
 * Helpers: window with ellipses
 * ----------------------------------------------------- */
function buildPageWindow(current, total) {
  const items = [];
  if (total <= 7) {
    for (let i = 0; i < total; i++) items.push({ type: "page", index: i });
    return items;
  }

  const push = (i) => {
    if (i >= 0 && i < total && !items.some((x) => x.index === i))
      items.push({ type: "page", index: i });
  };

  push(0);
  push(total - 1);

  const left = Math.max(current - 1, 1);
  const right = Math.min(current + 1, total - 2);

  for (let i = left; i <= right; i++) push(i);

  items.sort((a, b) => a.index - b.index);

  const final = [];
  for (let i = 0; i < items.length; i++) {
    const prev = items[i - 1];
    const curr = items[i];
    if (i > 0 && curr.index - prev.index > 1) {
      final.push({ type: "ellipsis", key: `el-${prev.index}-${curr.index}` });
    }
    final.push(curr);
  }

  return final;
}

/* -------------------------------------------------------
 * AlloyPagination
 *
 * Emits ONLY:
 *   OutputObject.ok({
 *     id: pagination.id,
 *     type: "pagination",
 *     action: "Page",
 *     data: { pageNumber: <number> }
 *   })
 * ----------------------------------------------------- */
export function AlloyPagination({ pagination, output }) {
  if (!pagination || !(pagination instanceof PaginationObject)) {
    throw new Error(
      "AlloyPagination requires `pagination` (PaginationObject instance)."
    );
  }

  const emit = (o) => typeof output === "function" && output(o);

  const {
    id,
    name,
    className,
    totalPages,
    pageNumber,
    first,
    last,
    listClassName,
    itemClassName,
    activeClassName,
    disabledClassName,
  } = pagination;

  const pageWindow = useMemo(
    () => buildPageWindow(pageNumber, totalPages),
    [pageNumber, totalPages]
  );

  function clampTarget(target) {
    let t = typeof target === "number" ? target : 0;
    if (t < 0) t = 0;
    if (totalPages > 0 && t > totalPages - 1) t = totalPages - 1;
    return t;
  }

  // ✅ ONLY payload server needs
  function emitPage(target) {
    const t = clampTarget(target);

    const out = OutputObject.ok({
      id,
      type: "pagination",
      action: "Page", // Capital P (library standard)
      data: {
        pageNumber: t, // ONLY field required
      },
    });

    emit(out);
  }

  function makeBtn(label, ariaLabel, iconClass) {
    return new ButtonIconObject({
      id: generateId("pg-btn"),
      name: label,
      ariaLabel,
      icon: { iconClass },
      className: "page-link",
    });
  }

  function renderBtn(target, label, ariaLabel, icon, disabled, active) {
    const liClass = [
      itemClassName,
      disabled ? disabledClassName : "",
      active ? activeClassName : "",
    ]
      .filter(Boolean)
      .join(" ");

    const model = makeBtn(label, ariaLabel, icon);

    return (
      <li key={`pg-${label}-${target}`} className={liClass}>
        <AlloyButtonIcon
          buttonIcon={model}
          output={() => {
            if (!disabled) emitPage(target);
          }}
        />
      </li>
    );
  }

  function renderEllipsis(key) {
    return (
      <li key={key} className={`${itemClassName} ${disabledClassName}`}>
        <span className="page-link">…</span>
      </li>
    );
  }

  return (
    <nav
      className={className}
      aria-label={name ? `${name} pagination` : "pagination"}
    >
      {name && totalPages > 0 && (
        <div className="me-2 small text-muted">
          {name}: Page {pageNumber + 1} of {totalPages}
        </div>
      )}

      {totalPages > 0 && (
        <ul
          className={`${listClassName} list-unstyled`}
          style={{ listStyle: "none", paddingLeft: 0, marginBottom: 0 }}
        >
          {renderBtn(
            0,
            "First",
            "Go to first page",
            "fa-solid fa-angles-left",
            first,
            false
          )}

          {renderBtn(
            pageNumber - 1,
            "Previous",
            "Go to previous page",
            "fa-solid fa-chevron-left",
            first,
            false
          )}

          {pageWindow.map((it) =>
            it.type === "ellipsis"
              ? renderEllipsis(it.key)
              : renderBtn(
                  it.index,
                  String(it.index + 1),
                  `Go to page ${it.index + 1}`,
                  "fa-solid fa-circle-dot",
                  false,
                  it.index === pageNumber
                )
          )}

          {renderBtn(
            pageNumber + 1,
            "Next",
            "Go to next page",
            "fa-solid fa-chevron-right",
            last,
            false
          )}

          {renderBtn(
            totalPages - 1,
            "Last",
            "Go to last page",
            "fa-solid fa-angles-right",
            last,
            false
          )}
        </ul>
      )}
    </nav>
  );
}

export default AlloyPagination;
