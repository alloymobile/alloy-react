// demo/pages/tissue/TableAction.jsx
import React, { useMemo, useState } from "react";
import { AlloyTableAction, TableActionObject } from "../../../src";

/* ---------------------- Default editable JSONs ---------------------- */

// 0) Plain table (no link, no actions)
const DEFAULT_PLAIN = JSON.stringify(
  {
    id: "userTableAction_plain",
    name: "Users (plain table)",
    className: "table table-hover align-middle",
    rows: [
      { id: 1, name: "Ada Lovelace",      role: "Admin",  joined: "2023-12-01" },
      { id: 2, name: "Linus Torvalds",    role: "User",   joined: "2024-04-15" },
      { id: 3, name: "Margaret Hamilton", role: "Owner",  joined: "2022-07-22" }
    ]
    // no link, no actions
    // icon/sort fall back to defaults in TableActionObject
  },
  null,
  2
);

// 1) Table with link but no actions
const DEFAULT_LINK_ONLY = JSON.stringify(
  {
    id: "userTableAction_link",
    name: "Users (click cells to view)",
    className: "table table-hover align-middle",
    link: "/users", // cell -> "/users/{id}"
    rows: [
      { id: 10, name: "Grace Hopper",   role: "Owner",  joined: "2021-11-03" },
      { id: 11, name: "Alan Turing",    role: "Admin",  joined: "2020-06-12" },
      { id: 12, name: "Barbara Liskov", role: "User",   joined: "2022-02-18" }
    ]
    // no actions
    // icon/sort can be custom or omitted
  },
  null,
  2
);

// 2) Text buttons
const DEFAULT_BUTTONS = JSON.stringify(
  {
    id: "userTableAction_btn",
    name: "Users (text actions)",
    className: "table table-hover align-middle",
    link: "/users",
    rows: [
      { id: 101, name: "Ada Lovelace",      role: "Admin",  joined: "2023-12-01" },
      { id: 102, name: "Linus Torvalds",    role: "User",   joined: "2024-04-15" },
      { id: 103, name: "Margaret Hamilton", role: "Owner",  joined: "2022-07-22" }
    ],
    actions: {
      type: "AlloyButton",
      className: "nav justify-content-end gap-2",
      buttonClass: "nav-item",
      title: { name: "", className: "" }, // bar header/title optional
      buttons: [
        { name: "Edit",   className: "btn btn-sm btn-outline-primary" },
        { name: "Delete", className: "btn btn-sm btn-outline-danger" }
      ]
    }
  },
  null,
  2
);

// 3) Icon buttons (label+icon)
const DEFAULT_ICON_BUTTONS = JSON.stringify(
  {
    id: "userTableAction_iconbtn",
    name: "Users (icon actions)",
    className: "table table-hover align-middle",
    link: "/users",
    icon: { iconClass: "fa-solid fa-user-gear" },
    sort: { iconClass: "fa-solid fa-arrow-down" },
    rows: [
      { id: 201, name: "Grace Hopper",   role: "Owner", joined: "2021-11-03" },
      { id: 202, name: "Alan Turing",    role: "Admin", joined: "2020-06-12" },
      { id: 203, name: "Barbara Liskov", role: "User",  joined: "2022-02-18" }
    ],
    actions: {
      type: "AlloyButtonIcon",
      className: "nav justify-content-end gap-2",
      buttonClass: "nav-item",
      title: { name: "", className: "" },
      buttons: [
        {
          title: "Edit",
          name: "Edit",
          className: "btn btn-outline",
          ariaLabel: "Edit",
          icon: { iconClass: "fa-regular fa-pen-to-square" }
        },
        {
          title: "Delete",
          name: "Delete",
          className: "btn btn-outline",
          ariaLabel: "Delete",
          icon: { iconClass: "fa-regular fa-trash-can" }
        }
      ]
    }
  },
  null,
  2
);

// 4) Icon-only actions (no visible text on buttons)
const DEFAULT_ACTION_ICON = JSON.stringify(
  {
    id: "userTableAction_tableicon",
    name: "Users (icon-only actions)",
    className: "table table-hover align-middle",
    link: "/users",
    icon: { iconClass: "fa-solid fa-id-badge" },
    sort: { iconClass: "fa-solid fa-arrow-down" },
    rows: [
      { id: 301, name: "Katherine Johnson", role: "Admin",  joined: "2023-07-09" },
      { id: 302, name: "John von Neumann",  role: "User",   joined: "2024-01-25" },
      { id: 303, name: "Donald Knuth",      role: "Owner",  joined: "2022-10-05" }
    ],
    actions: {
      type: "AlloyButtonIcon",
      className: "nav justify-content-end gap-2",
      buttonClass: "nav-item",
      title: { name: "", className: "" },
      buttons: [
        {
          title: "Edit",
          className: "btn btn-outline-dark",
          ariaLabel: "Edit",
          icon: { iconClass: "fa-regular fa-pen-to-square" }
        },
        {
          title: "Delete",
          className: "btn btn-outline-dark",
          ariaLabel: "Delete",
          icon: { iconClass: "fa-regular fa-trash-can" }
        }
      ]
    }
  },
  null,
  2
);

/* ---------------------- Tag snippet (display only) ---------------------- */
const TAG_SNIPPET = `<AlloyTableAction tableAction={new TableActionObject(tableActionObject)} output={handleOutput} />`;

/* ---------------------- Helpers ---------------------- */
function preamble() {
  return [
    "// Header click → { type: 'column', name, dir }  (ask server for sorted rows).",
    "// Action click → { type: 'action', action, row }",
    "// Row cell click (when `link` present) → { type: 'navigate', to, id, row }"
  ].join("\n");
}

// builds model+parseError from a JSON string, using TableActionObject only
function useParsedModel(jsonState) {
  const [parseError, setParseError] = useState("");
  const model = useMemo(() => {
    try {
      setParseError("");
      const raw = JSON.parse(jsonState);
      return new TableActionObject(raw);
    } catch (e) {
      setParseError(String(e.message || e));
      // graceful fallback with empty rows
      return new TableActionObject({
        name: "Invalid JSON",
        className: "table table-striped",
        rows: []
        // no link, no actions in fallback
      });
    }
  }, [jsonState]);
  return { model, parseError, setParseError };
}

/* ---------------------- Page with Tabs ---------------------- */
export default function TableActionPage() {
  // tabs in the order you requested
  const TABS = [
    "PlainTable",
    "TableWithLink",
    "ActionButton",
    "ActionIconButton",
    "ActionIcon"
  ];

  const [active, setActive] = useState("PlainTable");

  // per-tab JSON state
  const [jsonPlain, setJsonPlain] = useState(DEFAULT_PLAIN);
  const [jsonLinkOnly, setJsonLinkOnly] = useState(DEFAULT_LINK_ONLY);
  const [jsonBtn, setJsonBtn] = useState(DEFAULT_BUTTONS);
  const [jsonIconBtn, setJsonIconBtn] = useState(DEFAULT_ICON_BUTTONS);
  const [jsonActionIcon, setJsonActionIcon] = useState(DEFAULT_ACTION_ICON);

  // per-tab OUTPUT panel state
  const [outPlain, setOutPlain] = useState(preamble());
  const [outLinkOnly, setOutLinkOnly] = useState(preamble());
  const [outBtn, setOutBtn] = useState(preamble());
  const [outIconBtn, setOutIconBtn] = useState(preamble());
  const [outActionIcon, setOutActionIcon] = useState(preamble());

  // hydrate models via TableActionObject
  const { model: modelPlain, parseError: errPlain } = useParsedModel(jsonPlain);
  const { model: modelLinkOnly, parseError: errLinkOnly } = useParsedModel(jsonLinkOnly);
  const { model: modelBtn, parseError: errBtn } = useParsedModel(jsonBtn);
  const { model: modelIconBtn, parseError: errIconBtn } = useParsedModel(jsonIconBtn);
  const { model: modelActionIcon, parseError: errActionIcon } = useParsedModel(jsonActionIcon);

  // helper: set output for whichever tab is active
  function handleOutput(tab, payload) {
    const s = JSON.stringify(payload, null, 2);
    switch (tab) {
      case "PlainTable":
        setOutPlain(s);
        break;
      case "TableWithLink":
        setOutLinkOnly(s);
        break;
      case "ActionButton":
        setOutBtn(s);
        break;
      case "ActionIconButton":
        setOutIconBtn(s);
        break;
      case "ActionIcon":
        setOutActionIcon(s);
        break;
      default:
        break;
    }
  }

  // reset button: restore default JSON + reset output panel
  function resetTab(tab) {
    switch (tab) {
      case "PlainTable":
        setJsonPlain(DEFAULT_PLAIN);
        setOutPlain(preamble());
        break;
      case "TableWithLink":
        setJsonLinkOnly(DEFAULT_LINK_ONLY);
        setOutLinkOnly(preamble());
        break;
      case "ActionButton":
        setJsonBtn(DEFAULT_BUTTONS);
        setOutBtn(preamble());
        break;
      case "ActionIconButton":
        setJsonIconBtn(DEFAULT_ICON_BUTTONS);
        setOutIconBtn(preamble());
        break;
      case "ActionIcon":
        setJsonActionIcon(DEFAULT_ACTION_ICON);
        setOutActionIcon(preamble());
        break;
      default:
        break;
    }
  }

  // active-tab bindings for shared UI below
  const bindings = {
    PlainTable: {
      inputJson: jsonPlain,
      setInputJson: setJsonPlain,
      parseError: errPlain,
      outputJson: outPlain,
      setOutputJson: setOutPlain,
      model: modelPlain
    },
    TableWithLink: {
      inputJson: jsonLinkOnly,
      setInputJson: setJsonLinkOnly,
      parseError: errLinkOnly,
      outputJson: outLinkOnly,
      setOutputJson: setOutLinkOnly,
      model: modelLinkOnly
    },
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

      {/* Tag sample */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{`<AlloyTableAction tableAction={new TableActionObject(tableActionObject)} output={handleOutput} />`}</code>
          </pre>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3 flex-wrap">
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

      {/* Live table */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyTableAction
            tableAction={bindings.model}
            output={(payload) => handleOutput(active, payload)}
          />
          <div className="small text-secondary mt-2">
            Server-driven sort. If <code>link</code> is present, cells link to{" "}
            <code>{`"${bindings.model.link || "/path"}/{row.id}"`}</code>.{" "}
            If <code>actions</code> is provided, a shared <code>AlloyButtonBar</code> renders in the last column.
          </div>
        </div>
      </div>

      {/* Editor + Output */}
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
            Columns come from the first row (excluding <code>id</code>).<br />
            <code>link</code> turns cells into navigable links.<br />
            <code>actions</code> (ButtonBarObject config) renders action buttons in each row.
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
            • Header click → sort intent.<br />
            • Action click → which button + which row.<br />
            • Cell click → nav intent (if <code>link</code> exists).
          </div>
        </div>
      </div>
    </div>
  );
}
