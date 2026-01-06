// src/lib/components/tissue/AlloySearch.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

import { OutputObject, generateId } from "../../utils/idHelper.js";
import AlloyInput, { InputObject } from "./AlloyInput.jsx";

/* -------------------------------------------------------
 * SearchObject (model)
 * ----------------------------------------------------- */
export class SearchObject {
  constructor(response = {}) {
    const cfg = response || {};

    this.id = cfg.id ?? generateId("search");
    this.className = cfg.className ?? "row mb-3";

    if (cfg.search instanceof InputObject) {
      this.search = cfg.search;
    } else if (cfg.search) {
      this.search = new InputObject(cfg.search);
    } else {
      this.search = new InputObject({
        id: generateId("searchInput"),
        name: "query",
        type: "text",
        layout: "icon",
        label: cfg.label ?? "Search",
        placeholder: cfg.placeholder ?? "Search…",
        icon: { iconClass: "fa-solid fa-magnifying-glass" },
        className: "form-control",
        iconGroupClass: cfg.iconGroupClass ?? "",
      });
    }

    this.minChars =
      typeof cfg.minChars === "number" && cfg.minChars >= 0 ? cfg.minChars : 2;

    this.debounceMs =
      typeof cfg.debounceMs === "number" && cfg.debounceMs >= 0 ? cfg.debounceMs : 400;

    this.results = Array.isArray(cfg.results) ? cfg.results : [];

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
 * Emits ONLY:
 *   - action: "search" (debounced, >= minChars)
 *   - action: "clear"  (immediate, ONLY when crossing from >= minChars to < minChars)
 * ----------------------------------------------------- */
export function AlloySearch({ search, output }) {
  if (!search || !(search instanceof SearchObject)) {
    throw new Error("AlloySearch requires `search` (SearchObject instance).");
  }

  const emit = (out) => {
    if (typeof output === "function") output(out);
  };

  const inputName = search.search?.name ?? "query";

  const [liveValue, setLiveValue] = useState(() => {
    return typeof search.search?.value !== "undefined" ? String(search.search.value) : "";
  });

  const didMountRef = useRef(false);
  const timerRef = useRef(null);

  // Tracks whether we were previously in "search mode" (>= minChars)
  const wasAboveRef = useRef(false);

  // Dedupe: last debounced search text
  const lastSearchTextRef = useRef("");

  // Reset when the SearchObject identity changes (screen swap)
  useEffect(() => {
    const v =
      typeof search.search?.value !== "undefined" ? String(search.search.value) : "";

    setLiveValue(v);

    didMountRef.current = false;
    wasAboveRef.current = (v || "").trim().length >= search.minChars;
    lastSearchTextRef.current = "";

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [search.id]); // IMPORTANT: do NOT depend on entire `search`

  // Controlled input to avoid DOM wipes on rerender
  const inputModel = useMemo(() => {
    const base = search.search instanceof InputObject ? search.search : new InputObject(search.search || {});
    return new InputObject({ ...base, value: liveValue });
  }, [search.search, liveValue]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const trimmed = (liveValue || "").trim();
    const minChars = search.minChars;

    // BELOW threshold:
    // ✅ Emit clear ONLY if we were previously above threshold (i.e., user deleted below threshold)
    if (trimmed.length < minChars) {
      if (wasAboveRef.current) {
        wasAboveRef.current = false;
        lastSearchTextRef.current = "";

        emit(
          OutputObject.ok({
            id: search.id,
            type: "search-bar",
            action: "clear",
            data: { [inputName]: "" },
          })
        );
      }
      return;
    }

    // ABOVE/EQUAL threshold: debounce search
    wasAboveRef.current = true;

    timerRef.current = setTimeout(() => {
      if (lastSearchTextRef.current === trimmed) return;

      lastSearchTextRef.current = trimmed;

      emit(
        OutputObject.ok({
          id: search.id,
          type: "search-bar",
          action: "search",
          data: { [inputName]: trimmed },
        })
      );
    }, search.debounceMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [liveValue, search.id, search.minChars, search.debounceMs, inputName]);

  const handleSearchOutput = (inputOut) => {
    if (!inputOut) return;

    const base =
      inputOut instanceof OutputObject && typeof inputOut.toJSON === "function"
        ? inputOut.toJSON()
        : inputOut;

    const data = base?.data || {};

    const hasDirect = Object.prototype.hasOwnProperty.call(data, inputName);

    // Ignore events for other fields (prevents random clears from unrelated input events)
    if (!hasDirect && typeof data.name === "string" && data.name && data.name !== inputName) {
      return;
    }

    let next;

    if (hasDirect) next = data[inputName];
    else if (typeof data.value !== "undefined") next = data.value;
    else if (typeof data.text !== "undefined") next = data.text;
    else return; // ignore events that don't carry a usable value

    setLiveValue(typeof next === "string" ? next : String(next ?? ""));
  };

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
        obj[labelKey] ?? obj.name ?? obj.title ?? obj.subject ?? JSON.stringify(obj);

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

  const handleResultClick = (resultItem) => {
    // No extra events. Just set value; debounced search will happen if >= minChars.
    setLiveValue(resultItem?.label ?? "");
  };

  return (
    <div id={search.id} className={search.className}>
      <div className="col-12">
        <AlloyInput input={inputModel} output={handleSearchOutput} />

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
