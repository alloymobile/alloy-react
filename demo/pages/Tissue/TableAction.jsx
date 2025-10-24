// demo/pages/tissue/TableAction.jsx
import React, { useMemo, useState } from "react";
import { AlloyTableAction, TableActionObject } from "../../../src";

/* ---------------------- Default editable JSONs ---------------------- */
// 1) Text buttons
const DEFAULT_BUTTONS = JSON.stringify(
  {
    id: "userTableAction_btn",
    name: "Users (text actions)",
    className: "table table-hover align-middle",
    // When provided, each non-id cell becomes a Link to `${link}/{row.id}`:
    link: "/users",
    // icon/sort default inside component:
    //   icon:  fa-solid fa-user
    //   sort:  fa-solid fa-arrow-down
    rows: [
      { id: 101, name: "Ada Lovelace",      role: "Admin",  joined: "2023-12-01" },
      { id: 102, name: "Linus Torvalds",    role: "User",   joined: "2024-04-15" },
      { id: 103, name: "Margaret Hamilton", role: "Owner",  joined: "2022-07-22" }
    ],
    actions: {
      // Renders the SAME bar instance in each row (no cloning)
      type: "AlloyButton",
      className: "nav justify-content-end gap-2",
      buttonClass: "nav-item",
      barName: { show: false },
      buttons: [
        { name: "Edit",   className: "btn btn-sm btn-outline-primary" },
        { name: "Delete", className: "btn btn-sm btn-outline-danger" }
      ]
    }
  },
  null,
  2
);

// 2) Icon buttons (can have titles + iconClass; names optional)
const DEFAULT_ICON_BUTTONS = JSON.stringify(
  {
    id: "userTableAction_iconbtn",
    name: "Users (icon actions)",
    className: "table table-hover align-middle",
    link: "/users",
    rows: [
      { id: 201, name: "Grace Hopper",   role: "Owner", joined: "2021-11-03" },
      { id: 202, name: "Alan Turing",    role: "Admin", joined: "2020-06-12" },
      { id: 203, name: "Barbara Liskov", role: "User",  joined: "2022-02-18" }
    ],
    // Leading column icon (table-wide)
    icon: { iconClass: "fa-solid fa-user-gear" },
    // Sort icon
    sort: { iconClass: "fa-solid fa-arrow-down" },
    actions: {
      type: "AlloyButtonIcon", // icon-only bar
      className: "nav justify-content-end gap-2",
      buttonClass: "nav-item",
      selected: "active",
      barName: { show: false },
      buttons: [
        { title: "Edit", name: "Edit", className: "btn btn-outline",   ariaLabel: "Edit",   icon: { iconClass: "fa-regular fa-pen-to-square" } },
        { title: "Delete", name: "Delete", className: "btn btn-outline", ariaLabel: "Delete", icon: { iconClass: "fa-regular fa-trash-can" } }
      ]
    }
  },
  null,
  2
);

// 3) Icon buttons with NO `name` fields (pure icons) + different table icon
const DEFAULT_ACTION_ICON = JSON.stringify(
  {
    id: "userTableAction_tableicon",
    name: "Users (icon-only, no names; different table icon)",
    className: "table table-hover align-middle",
    link: "/users",
    rows: [
      { id: 301, name: "Katherine Johnson", role: "Admin",  joined: "2023-07-09" },
      { id: 302, name: "John von Neumann",  role: "User",   joined: "2024-01-25" },
      { id: 303, name: "Donald Knuth",      role: "Owner",  joined: "2022-10-05" }
    ],
    // Different leading icon so this tab is visually distinct
    icon: { iconClass: "fa-solid fa-id-badge" },
    sort: { iconClass: "fa-solid fa-arrow-down" },
    actions: {
      type: "AlloyButtonIcon", // icon-only bar
      className: "nav justify-content-end gap-2",
      buttonClass: "nav-item",
      barName: { show: false },
      buttons: [
        // NOTE: no `name` field — icons render without text
        { title: "Edit", className: "btn btn-outline-dark",  ariaLabel: "Edit",   icon: { iconClass: "fa-regular fa-pen-to-square" } },
        { title: "Delete", className: "btn btn-outline-dark", ariaLabel: "Delete", icon: { iconClass: "fa-regular fa-trash-can" } }
      ]
    }
  },
  null,
  2
);

/* ---------------------- Tag snippet (display only) ---------------------- */
const TAG_SNIPPET = `<AlloyTableAction table={new TableActionObject(tableActionObject)} output={handleOutput} />`;

/* ---------------------- Utilities ---------------------- */
function preamble() {
  return [
    "// Header click → { type: 'column', name, dir }  (ask server for sorted rows).",
    "// Action click → { type: 'action', action, row }",
    "// Row cell click (when `link` present) → { type: 'navigate', to, id, row }"
  ].join("\n");
}

function useParsedModel(inputJson) {
  const [parseError, setParseError] = useState("");
  const model = useMemo(() => {
    try {
      setParseError("");
      const raw = JSON.parse(inputJson);
      return new TableActionObject(raw);
    } catch (e) {
      setParseError(String(e.message || e));
      // Safe fallback
      return new TableActionObject({
        name: "Invalid JSON",
        className: "table table-striped",
        rows: [],
        actions: {
          type: "AlloyButton",
          className: "nav justify-content-end gap-2",
          buttonClass: "nav-item",
          barName: { show: false },
          buttons: [{ name: "Edit", className: "btn btn-sm btn-outline-primary" }]
        }
      });
    }
  }, [inputJson]);
  return { model, parseError, setParseError };
}

/* ---------------------- Page with Tabs ---------------------- */
export default function TableActionPage() {
  const TABS = ["ActionButton", "ActionIconButton", "ActionIcon"];
  const [active, setActive] = useState("ActionButton");

  const [jsonBtn, setJsonBtn] = useState(DEFAULT_BUTTONS);
  const [jsonIconBtn, setJsonIconBtn] = useState(DEFAULT_ICON_BUTTONS);
  const [jsonActionIcon, setJsonActionIcon] = useState(DEFAULT_ACTION_ICON);

  const [outBtn, setOutBtn] = useState(preamble());
  const [outIconBtn, setOutIconBtn] = useState(preamble());
  const [outActionIcon, setOutActionIcon] = useState(preamble());

  const { model: modelBtn,        parseError: errBtn }        = useParsedModel(jsonBtn);
  const { model: modelIconBtn,    parseError: errIconBtn }    = useParsedModel(jsonIconBtn);
  const { model: modelActionIcon, parseError: errActionIcon } = useParsedModel(jsonActionIcon);

  function handleOutput(tab, payload) {
    const s = JSON.stringify(payload, null, 2);
    if (tab === "ActionButton") setOutBtn(s);
    if (tab === "ActionIconButton") setOutIconBtn(s);
    if (tab === "ActionIcon") setOutActionIcon(s);
  }

  function resetTab(tab) {
    if (tab === "ActionButton") {
      setJsonBtn(DEFAULT_BUTTONS);
      setOutBtn(preamble());
    } else if (tab === "ActionIconButton") {
      setJsonIconBtn(DEFAULT_ICON_BUTTONS);
      setOutIconBtn(preamble());
    } else {
      setJsonActionIcon(DEFAULT_ACTION_ICON);
      setOutActionIcon(preamble());
    }
  }

  // Active tab bindings
  const bindings = {
    ActionButton: {
      inputJson: jsonBtn,
      setInputJson: setJsonBtn,
      parseError: errBtn,
      outputJson: outBtn,
      setOutputJson: setOutBtn,
      model: modelBtn
    },
    ActionIconButton: {
      inputJson: jsonIconBtn,
      setInputJson: setJsonIconBtn,
      parseError: errIconBtn,
      outputJson: outIconBtn,
      setOutputJson: setOutIconBtn,
      model: modelIconBtn
    },
    ActionIcon: {
      inputJson: jsonActionIcon,
      setInputJson: setJsonActionIcon,
      parseError: errActionIcon,
      outputJson: outActionIcon,
      setOutputJson: setOutActionIcon,
      model: modelActionIcon
    }
  }[active];

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyTableAction</h3>

      {/* Row 1 — Tag sample */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{TAG_SNIPPET}</code>
          </pre>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        {TABS.map((t) => (
          <li className="nav-item" key={t}>
            <button
              type="button"
              className={`nav-link ${active === t ? "active" : ""}`}
              onClick={() => setActive(t)}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>

      {/* Row 2 — Live table (per tab) */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyTableAction
            tableAction={bindings.model}
            output={(payload) => handleOutput(active, payload)}
          />
          <div className="small text-secondary mt-2">
            Server-sorted. Actions render via <code>AlloyButtonBar</code> in the last column.{" "}
            If <code>link</code> is set, each data cell links to{" "}
            <code>{`"${bindings.model.link}/{row.id}"`}</code>.
          </div>
        </div>
      </div>

      {/* Row 3 — Input JSON (editable) and Output panel (per tab) */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable) — {active}</span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => resetTab(active)}
              >
                Reset {active}
              </button>
            </div>
          </div>

          <textarea
            className={`form-control font-monospace ${bindings.parseError ? "is-invalid" : ""}`}
            rows={18}
            value={bindings.inputJson}
            onChange={(e) => bindings.setInputJson(e.target.value)}
            spellCheck={false}
          />
          {bindings.parseError && (
            <div className="invalid-feedback d-block mt-1">{bindings.parseError}</div>
          )}
          <div className="form-text">
            Columns derive from the first row’s keys (excluding <code>id</code>).  
            The same <code>actions</code> bar instance is used in every row.  
            Set <code>link</code> (e.g. <code>"/users"</code>) to enable row detail links.
          </div>
        </div>

        {/* Right: Output JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Output (from <code>output</code> callback)
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => bindings.setOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>
          <textarea
            className="form-control font-monospace"
            rows={18}
            value={bindings.outputJson}
            onChange={(e) => bindings.setOutputJson(e.target.value)}
            spellCheck={false}
          />
          <div className="form-text">
            Use the payload to trigger server sort, handle row actions, or navigate.
          </div>
        </div>
      </div>
    </div>
  );
}
