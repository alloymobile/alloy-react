// pages/Cell/ButtonDropDown.jsx
import React, { useMemo, useState } from "react";
import { AlloyButtonDropDown, ButtonDropDownObject } from "../../../src";

const DEFAULT_INPUT_OBJ = {
  id: "alloyBtnDropdown01",
  name: "Alerts",
  type: "button",
  className: "btn btn-primary dropdown-toggle",
  active: "",

  icon: {
    iconClass: "fa-solid fa-bell",
  },

  badge: {
    name: "3",
    title: "Unread alerts",
    className: "badge bg-danger rounded-pill",
  },

  linkBar: {
    id: "alertsLinkBar",
    className: "dropdown-menu",
    linkClass: "dropdown-item",
    selected: "active",
    title: null,
    links: [
      {
        id: "alertLink1",
        name: "Server CPU high",
        href: "/private/alerts/1",
        icon: { iconClass: "fa-solid fa-triangle-exclamation" },
      },
      {
        id: "alertLink2",
        name: "New message from Admin",
        href: "/private/messages",
        icon: { iconClass: "fa-solid fa-envelope" },
      },
      {
        id: "alertLink3",
        name: "View all alerts",
        href: "/private/alerts",
        icon: { iconClass: "fa-solid fa-list" },
      },
    ],
  },
};

const DEFAULT_INPUT = JSON.stringify(DEFAULT_INPUT_OBJ, null, 2);

export default function ButtonDropDownPage() {
  const [inputJson, setInputJson] = useState(DEFAULT_INPUT);
  const [parseError, setParseError] = useState("");
  const [outputJson, setOutputJson] = useState(
    "// Click a dropdown item to see output here…"
  );

  const [parsed, setParsed] = useState(DEFAULT_INPUT_OBJ);

  function handleInputChange(e) {
    const val = e.target.value;
    setInputJson(val);

    try {
      const obj = JSON.parse(val || "{}");
      if (!obj || typeof obj !== "object") throw new Error("JSON must be an object.");
      setParsed(obj);
      setParseError("");
    } catch (err) {
      setParseError(err.message || "Invalid JSON.");
    }
  }

  const model = useMemo(() => {
    try {
      const safe = parsed && typeof parsed === "object" ? parsed : {};
      return new ButtonDropDownObject(safe);
    } catch {
      return new ButtonDropDownObject({
        id: "invalidDropdown",
        name: "Invalid config",
        className: "btn btn-secondary dropdown-toggle",
        icon: { iconClass: "fa-solid fa-triangle-exclamation" },
        badge: { name: "!", className: "badge bg-warning text-dark rounded-pill" },
        linkBar: {
          className: "dropdown-menu",
          linkClass: "dropdown-item",
          links: [
            {
              id: "invalidItem",
              name: "Fix JSON to enable menu",
              href: "#",
              icon: { iconClass: "fa-solid fa-wrench" },
            },
          ],
        },
      });
    }
  }, [parsed]);

  function handleOutput(link) {
    const payload =
      link && typeof link.toJSON === "function"
        ? link.toJSON()
        : link && typeof link === "object"
        ? link
        : { value: link };

    setOutputJson(JSON.stringify(payload, null, 2));
  }

  function handleReset() {
    setInputJson(DEFAULT_INPUT);
    setParsed(DEFAULT_INPUT_OBJ);
    setOutputJson("// Click a dropdown item to see output here…");
    setParseError("");
  }

  function handleFormat() {
    try {
      const obj = JSON.parse(inputJson);
      setInputJson(JSON.stringify(obj, null, 2));
      setParsed(obj);
      setParseError("");
    } catch {
      // ignore
    }
  }

  function handleToggleClick() {
    if (typeof document === "undefined") return;
    const el = document.getElementById(model.id);
    el?.click();
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyButtonDropDown</h3>

      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyButtonDropDown buttonDropDown={new ButtonDropDownObject(buttonDropDownObject)} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12 text-center">
          <AlloyButtonDropDown buttonDropDown={model} output={handleOutput} />

          <div className="d-flex gap-2 justify-content-center mt-3">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={handleReset}
            >
              Reset
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={handleFormat}
              title="Format JSON"
            >
              <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true" />
              Format
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={handleToggleClick}
              title="Programmatically toggle the dropdown"
            >
              Toggle Dropdown
            </button>
          </div>

          <div className="small text-secondary mt-2">
            Badge renders only when <code>badge</code> exists and{" "}
            <code>badge.name</code> is non-empty. Clicking the badge toggles the
            dropdown since it is inside the same button.
          </div>
        </div>
      </div>

      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable)</span>
          </div>

          <textarea
            className={`form-control font-monospace ${parseError ? "is-invalid" : ""}`}
            rows={18}
            value={inputJson}
            onChange={handleInputChange}
            spellCheck={false}
          />
          {parseError && (
            <div className="invalid-feedback d-block mt-1">{parseError}</div>
          )}

          <div className="form-text">
            Optional badge:
            <br />
            <code>{`badge: { id?, name, className?, title? }`}</code>
            <br />
            Menu items come from <code>linkBar.links</code>.
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Output (from <code>output</code> callback)
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => setOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={18}
            value={outputJson}
            onChange={(e) => setOutputJson(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            Output is the clicked link object (or its <code>toJSON()</code> if present).
          </div>
        </div>
      </div>
    </div>
  );
}
