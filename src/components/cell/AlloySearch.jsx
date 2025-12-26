import React, { useEffect, useMemo, useRef, useState } from "react";

import { OutputObject } from "../../utils/idHelper.js";
import { useDomId } from "../../utils/idHelper.js";
import AlloyInput, { InputObject } from "./AlloyInput.jsx";

/* -------------------------------------------------------
 * SearchObject (model)
 * ----------------------------------------------------- */
export class SearchObject {
  constructor(response = {}) {
    const cfg = response || {};

    this.id = cfg.id; // optional
    this.className = cfg.className ?? "row mb-3";

    if (cfg.search instanceof InputObject) {
      this.search = cfg.search;
    } else if (cfg.search) {
      this.search = new InputObject(cfg.search);
    } else {
      this.search = new InputObject({
        name: "query",
        type: "text",
        layout: "icon",
        label: cfg.label ?? "Search",
        placeholder: cfg.placeholder ?? "Search…",
        icon: { iconClass: "fa-solid fa-magnifying-glass" },
        className: "form-control",
        iconGroupClass: cfg.iconGroupClass ?? ""
      });
    }

    this.minChars =
      typeof cfg.minChars === "number" && cfg.minChars >= 0 ? cfg.minChars : 2;

    this.debounceMs =
      typeof cfg.debounceMs === "number" && cfg.debounceMs >= 0
        ? cfg.debounceMs
        : 400;

    this.results = Array.isArray(cfg.results) ? cfg.results : [];

    const defaultResultConfig = {
      idKey: "id",
      labelKey: "label",
      descriptionKey: "description",
      iconKey: "iconClass"
    };

    this.resultConfig = {
      ...defaultResultConfig,
      ...(cfg.resultConfig || {})
    };
  }
}

/* -------------------------------------------------------
 * AlloySearch (view)
 * ----------------------------------------------------- */
export function AlloySearch({ search, output }) {
  if (!search || !(search instanceof SearchObject)) {
    throw new Error("AlloySearch requires `search` (SearchObject instance).");
  }

  const emit = (out) => {
    if (typeof output === "function") output(out);
  };

  const domId = useDomId("search", search.id);
  const inputName = search.search?.name ?? "query";

  /* ----------------- Local state ----------------- */
  const [liveValue, setLiveValue] = useState(() => {
    return typeof search.search?.value !== "undefined"
      ? String(search.search.value)
      : "";
  });

  // Optional: if parent truly changes the configured value, reflect it
  useEffect(() => {
    const v =
      typeof search.search?.value !== "undefined"
        ? String(search.search.value)
        : "";
    // only update if different (prevents accidental wipes)
    setLiveValue((prev) => (prev === v ? prev : v));
  }, [search.search?.value]);

  /* ----------------- Emission control (no spam) ----------------- */
  const lastActionRef = useRef(null); // "Search" | "Clear" | null
  const lastSearchTextRef = useRef(""); // last searched trimmed text

  /* ----------------- Search/Clear logic ----------------- */
  useEffect(() => {
    const trimmed = (liveValue || "").trim();

    // BELOW threshold -> emit Clear immediately (once per phase)
    if (trimmed.length < search.minChars) {
      if (lastActionRef.current !== "Clear") {
        lastActionRef.current = "Clear";
        lastSearchTextRef.current = ""; // reset last search payload

        emit(
          OutputObject.ok({
            id: domId,
            type: "search-bar",
            action: "Clear",
            data: { [inputName]: "" }
          })
        );
      }
      return; // IMPORTANT: do not schedule Search
    }

    // ABOVE/EQUAL threshold -> debounce then emit Search (only if changed)
    const handle = setTimeout(() => {
      if (lastSearchTextRef.current === trimmed && lastActionRef.current === "Search") {
        return; // don't resend the same Search payload
      }

      lastActionRef.current = "Search";
      lastSearchTextRef.current = trimmed;

      emit(
        OutputObject.ok({
          id: domId,
          type: "search-bar",
          action: "Search",
          data: { [inputName]: trimmed }
        })
      );
    }, search.debounceMs);

    return () => clearTimeout(handle);
  }, [liveValue, search.minChars, search.debounceMs, inputName, domId]);

  /* ----------------- Input event bridge ----------------- */
  const handleSearchOutput = (inputOut) => {
    if (!inputOut) return;

    const base =
      inputOut instanceof OutputObject && typeof inputOut.toJSON === "function"
        ? inputOut.toJSON()
        : inputOut;

    const data = base?.data || {};

    // ✅ KEY FIX: read from the field name first, fallback to common keys
    const next =
      data[inputName] ??
      data.value ??
      data.text ??
      "";

    setLiveValue(typeof next === "string" ? next : String(next ?? ""));
  };

  /* ----------------- Render ----------------- */
  return (
    <div id={domId} className={search.className}>
      <div className="col-12">
        <AlloyInput input={search.search} output={handleSearchOutput} />
      </div>
    </div>
  );
}

export default AlloySearch;
