// src/lib/components/tissue/AlloySearch.jsx
import React from "react";

import { OutputObject, generateId } from "../../utils/idHelper.js";
import AlloyInput, { InputObject } from "./AlloyInput.jsx";

/* -------------------------------------------------------
 * SearchObject (model)
 * ----------------------------------------------------- */
export class SearchObject {
  /**
   * @param {Object} response
   */
  constructor(response = {}) {
    const cfg = response || {};

    this.id = cfg.id ?? generateId("search");
    this.className = cfg.className ?? "row mb-3";

    // Normalize search → InputObject
    if (cfg.search instanceof InputObject) {
      this.search = cfg.search;
    } else if (cfg.search) {
      // caller provided plain config; must include `name`
      this.search = new InputObject(cfg.search);
    } else {
      // SAFE DEFAULT: provide name + icon so InputObject doesn't throw
      this.search = new InputObject({
        id: "searchInput",
        name: "search",
        type: "text",
        layout: "icon",
        label: cfg.label ?? "Search",
        placeholder: cfg.placeholder ?? "Search…",
        icon: {
          iconClass: "fa-solid fa-magnifying-glass",
        },
        className: "form-control",
      });
    }
  }
}

/* -------------------------------------------------------
 * AlloySearch (view)
 * ----------------------------------------------------- */
export function AlloySearch({ search, output }) {
  if (!search || !(search instanceof SearchObject)) {
    throw new Error(
      "AlloySearch requires `search` (SearchObject instance)."
    );
  }

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  const handleSearchOutput = (inputOut) => {
    if (!inputOut) return;

    // Expect AlloyInput → { type: "input", data: { name, value } }
    const field =
      inputOut?.data?.name ?? search.search?.name ?? "search";
    const value = inputOut?.data?.value;

    const data =
      field && typeof field === "string" ? { [field]: value } : {};

    const out = OutputObject.ok({
      id: search.id,
      type: "search-bar",
      action: "search",
      data,
    });

    emit(out);
  };

  return (
    <div id={search.id} className={search.className}>
      <div className="col-12 col-md-8">
        <AlloyInput input={search.search} output={handleSearchOutput} />
      </div>
    </div>
  );
}

export default AlloySearch;
