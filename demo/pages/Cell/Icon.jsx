// demo/pages/cell/Icon.jsx
import React, { useEffect, useMemo, useState } from "react";
import { AlloyIcon, Icon } from "../../../src";

// Using the free FA metadata to build the icon list
import * as fas from "@fortawesome/free-solid-svg-icons";
import * as far from "@fortawesome/free-regular-svg-icons";
import * as fab from "@fortawesome/free-brands-svg-icons";

// Collect all free icons into one array with { name, cls }
function collect(pack, styleClass) {
  return Object.values(pack)
    .filter((it) => it && typeof it === "object" && "iconName" in it && "prefix" in it)
    .map((it) => ({
      name: it.iconName,                  // e.g., "user"
      cls: `${styleClass} fa-${it.iconName}`, // e.g., "fa-solid fa-user"
    }));
}

const ALL_ICONS = [
  ...collect(fas, "fa-solid"),
  ...collect(far, "fa-regular"),
  ...collect(fab, "fa-brands"),
];

export default function IconPage() {
  const [selected, setSelected] = useState(
    () => new Icon({ iconClass: (ALL_ICONS[0]?.cls) || "fa-solid fa-user" })
  );
  const [jsonText, setJsonText] = useState(
    () => JSON.stringify({ id: selected.id, iconClass: selected.iconClass }, null, 2)
  );
  const [jsonError, setJsonError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setJsonText(JSON.stringify({ id: selected.id, iconClass: selected.iconClass }, null, 2));
    setJsonError("");
  }, [selected]);

  const codeSample = `<AlloyIcon icon={new Icon({ iconClass: "${selected.iconClass}" })} />`;

  // Filter by name or class
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_ICONS;
    return ALL_ICONS.filter(i =>
      i.name.toLowerCase().includes(q) || i.cls.toLowerCase().includes(q)
    );
  }, [query]);

  // Editable JSON box handlers
  function handleJsonChange(e) {
    const val = e.target.value;
    setJsonText(val);
    try {
      const parsed = JSON.parse(val);
      if (!parsed || typeof parsed !== "object") throw new Error("JSON must be an object.");
      if (!parsed.iconClass || typeof parsed.iconClass !== "string") {
        throw new Error(`Missing or invalid "iconClass".`);
      }
      const next = new Icon({ id: parsed.id, iconClass: parsed.iconClass });
      setSelected(next);
      setJsonError("");
    } catch (err) {
      setJsonError(err.message || "Invalid JSON.");
    }
  }

  function formatJson() {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setJsonError("");
    } catch (err) {
      setJsonError(err.message || "Invalid JSON.");
    }
  }

  return (
    <section id="icon" className="p-md-0">
      <h3 className="mb-1 text-center">AlloyIcon</h3>

      {/* Row 1 — Rendered icon (centered) */}
      <div className="row mb-1">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{codeSample}</code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Two columns: Tag sample + Editable JSON */}
      <div className="row g-3 align-items-stretch mb-4">
        <div className="col-12 col-lg-6 ">
            <div className="text-center">
                <span className="fw-semibold text-center">Icon</span>
            </div>
            <div className="d-flex justify-content-center align-items-center h-100">
                <AlloyIcon icon={new Icon({ iconClass: `${selected.iconClass} fa-3x` })} />
            </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="fw-semibold">Icon JSON (editable)</span>
            <button type="button" onClick={formatJson} className="btn btn-sm btn-outline-secondary">
              <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true" />
              Format JSON
            </button>
          </div>
          <textarea
            className={`form-control font-monospace ${jsonError ? "is-invalid" : ""}`}
            rows={8}
            spellCheck={false}
            value={jsonText}
            onChange={handleJsonChange}
            placeholder='{"iconClass":"fa-solid fa-user"}'
          />
          {jsonError ? (
            <div className="invalid-feedback">{jsonError}</div>
          ) : (
            <div className="form-text">
              Provide JSON with at least <code>iconClass</code>. Optional: <code>id</code>.
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="mb-3">
        <label htmlFor="iconSearch" className="form-label fw-semibold">Search Icons</label>
        <input
          id="iconSearch"
          type="search"
          className="form-control"
          placeholder="Type name (e.g., 'user', 'gear', 'arrow')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Gallery — 12 icons per row, icon-only, click to select */}
      <div className="row g-2">
        {filtered.map((it, idx) => {
          const active = it.cls === selected.iconClass;
          return (
            <div className="col-1" key={`${it.cls}-${idx}`}>
              <button
                type="button"
                className={`btn w-100 d-flex align-items-center justify-content-center py-3 ${active ? "btn-primary" : "btn-outline-secondary"}`}
                title={it.name}
                onClick={() => setSelected(new Icon({ iconClass: it.cls }))}
              >
                <i className={`${it.cls} fa-lg`} aria-hidden="true" />
              </button>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-12">
            <div className="alert alert-warning mb-0">No icons match “{query}”.</div>
          </div>
        )}
      </div>
    </section>
  );
}
