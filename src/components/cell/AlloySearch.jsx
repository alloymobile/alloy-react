// src/lib/components/tissue/AlloySearch.jsx
import React, { useEffect, useMemo, useState } from "react";

import { OutputObject, generateId } from "../../utils/idHelper.js";
import AlloyInput, { InputObject } from "./AlloyInput.jsx";

/* -------------------------------------------------------
 * SearchObject (model)
 *
 * Config shape:
 * {
 *   id?: string;
 *   className?: string;          // wrapper row
 *   search: InputConfig | InputObject;
 *
 *   // Behaviour tuning
 *   minChars?: number;           // default 2
 *   debounceMs?: number;         // default 400
 *
 *   // Results (injected by parent, usually from server)
 *   results?: any[];             // array of strings or objects
 *   resultConfig?: {
 *     idKey?: string;            // property for id (default "id")
 *     labelKey?: string;         // property for main label (default "label" | "name" | "title")
 *     descriptionKey?: string;   // optional property for second line
 *     iconKey?: string;          // optional property for iconClass
 *   };
 * }
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
      this.search = new InputObject(cfg.search);
    } else {
      // SAFE DEFAULT: provide name + icon so InputObject doesn't throw
      this.search = new InputObject({
        id: "searchInput",
        name: "query",
        type: "text",
        layout: "icon",
        label: cfg.label ?? "Search",
        placeholder: cfg.placeholder ?? "Search…",
        icon: { iconClass: "fa-solid fa-magnifying-glass" },
        className: "form-control",
      });
    }

    // Behaviour tuning
    this.minChars =
      typeof cfg.minChars === "number" && cfg.minChars >= 0 ? cfg.minChars : 2;

    this.debounceMs =
      typeof cfg.debounceMs === "number" && cfg.debounceMs >= 0
        ? cfg.debounceMs
        : 400;

    // Results (injected from server by parent)
    this.results = Array.isArray(cfg.results) ? cfg.results : [];

    // How to map a result object → UI (id / label / description / icon)
    const defaultResultConfig = {
      idKey: "id",
      labelKey: "label",
      descriptionKey: "description",
      iconKey: "iconClass",
    };

    this.resultConfig = {
      ...defaultResultConfig,
      ...(cfg.resultConfig || {}),
    };
  }
}

/* -------------------------------------------------------
 * AlloySearch (view)
 *
 * Emits:
 *   1) Debounced query:
 *      {
 *        id: search.id,
 *        type: "search-bar",
 *        action: "search",
 *        error: false,
 *        data: { [fieldName]: "query text" }
 *      }
 *
 *   1b) Clear:
 *      {
 *        id: search.id,
 *        type: "search-bar",
 *        action: "clear",
 *        error: false,
 *        data: { [fieldName]: "" }
 *      }
 *
 *   2) Result selection:
 *      {
 *        id: search.id,
 *        type: "search-bar",
 *        action: "select",
 *        error: false,
 *        data: {
 *          [fieldName]: "current query text",
 *          result: <raw result object or string>
 *        }
 *      }
 *
 * NOTE:
 *   - Component does NOT call HTTP. Parent listens for "search"/"clear",
 *     calls server, and re-renders with updated `results`.
 * ----------------------------------------------------- */
export function AlloySearch({ search, output }) {
  if (!search || !(search instanceof SearchObject)) {
    throw new Error("AlloySearch requires `search` (SearchObject instance).");
  }

  const emit = (out) => {
    if (typeof output === "function") output(out);
  };

  const inputName = search.search?.name ?? "query";

  /* ----------------- Local state (live query) ----------------- */

  const [liveValue, setLiveValue] = useState(() => {
    return typeof search.search?.value !== "undefined"
      ? String(search.search.value)
      : "";
  });

  // When parent swaps SearchObject (e.g. different screen), sync value
  useEffect(() => {
    const v =
      typeof search.search?.value !== "undefined"
        ? String(search.search.value)
        : "";
    setLiveValue(v);
  }, [search]);

  /* ----------------- Debounced search + clear emission ----------------- */

  useEffect(() => {
    const trimmed = (liveValue || "").trim();

    // ✅ IMPORTANT: when cleared (or below minChars) emit "clear"
    if (!trimmed || trimmed.length < search.minChars) {
      const out = OutputObject.ok({
        id: search.id,
        type: "search-bar",
        action: "clear",
        data: { [inputName]: "" },
      });
      emit(out);
      return;
    }

    const handle = setTimeout(() => {
      const out = OutputObject.ok({
        id: search.id,
        type: "search-bar",
        action: "search",
        data: { [inputName]: trimmed },
      });
      emit(out);
    }, search.debounceMs);

    return () => clearTimeout(handle);
  }, [liveValue, search.id, search.minChars, search.debounceMs, inputName]);

  /* ----------------- Handle inner input events ----------------- */

  const handleSearchOutput = (inputOut) => {
    if (!inputOut) return;

    const base =
      inputOut instanceof OutputObject && typeof inputOut.toJSON === "function"
        ? inputOut.toJSON()
        : inputOut;

    const value = base?.data?.value;
    setLiveValue(typeof value === "string" ? value : String(value ?? ""));
    // NOTE: no emit here — effect above handles debounced search/clear.
  };

  /* ----------------- Results mapping helpers ----------------- */

  const normalizedResults = useMemo(() => {
    const { resultConfig } = search;
    const { idKey, labelKey, descriptionKey, iconKey } = resultConfig;

    return (search.results || []).map((item, index) => {
      if (typeof item === "string" || typeof item === "number") {
        return {
          raw: item,
          id: String(index),
          label: String(item),
          description: "",
          iconClass: "",
        };
      }

      const obj = item || {};
      const id = obj[idKey] ?? obj.id ?? obj.key ?? String(index);

      const label =
        obj[labelKey] ??
        obj.name ??
        obj.title ??
        obj.subject ??
        JSON.stringify(obj);

      const description = descriptionKey ? obj[descriptionKey] : "";
      const iconClass = iconKey && obj[iconKey] ? obj[iconKey] : "";

      return {
        raw: item,
        id: String(id),
        label: String(label),
        description: description ? String(description) : "",
        iconClass: iconClass ? String(iconClass) : "",
      };
    });
  }, [search.results, search.resultConfig]);

  const hasResults = normalizedResults.length > 0;

  /* ----------------- Result selection handler ----------------- */

  const handleResultClick = (resultItem) => {
    const out = OutputObject.ok({
      id: search.id,
      type: "search-bar",
      action: "select",
      data: {
        [inputName]: (liveValue || "").trim(),
        result: resultItem.raw,
      },
    });

    emit(out);

    // ✅ Optional UX: clear the input after selecting a result
    // If you DON'T want this behaviour, remove the next line.
    setLiveValue("");
  };

  /* ----------------- Render ----------------- */

  return (
    <div id={search.id} className={search.className}>
      <div className="col-12">
        {/* Search input */}
        <AlloyInput input={search.search} output={handleSearchOutput} />

        {/* Results list */}
        {hasResults && (
          <div className="mt-2">
            <ul className="list-group shadow-sm">
              {normalizedResults.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
                  onClick={() => handleResultClick(item)}
                >
                  <div className="ms-0 me-auto">
                    <div className="fw-semibold">{item.label}</div>
                    {item.description && (
                      <small className="text-muted">{item.description}</small>
                    )}
                  </div>

                  {item.iconClass && (
                    <span className="ms-2 text-secondary">
                      <i className={item.iconClass} aria-hidden="true" />
                    </span>
                  )}
                </button>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlloySearch;
