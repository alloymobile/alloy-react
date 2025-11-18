// demo/pages/tissue/CardActionPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyCardAction, CardActionObject } from "../../../src";

/* ------------------------------------------------------------------
   Default presets for each variant.

   Layout details for CardActionObject:
   - cardAction.id, .className
   - link (optional): ONLY wraps the body in <Link>; header/footer stay normal
   - header: TagObject (optional; renders only if header.name)
   - body:   TagObject (main title / summary)
   - fields: TagObject[] (extra lines under body)
   - footer: TagObject (left side text)
   - type + action: configure footer bar:
        type = "AlloyButtonBar" or "AlloyLinkBar"
        action = ButtonBarObject / LinkBarObject config
------------------------------------------------------------------- */

/* 1) ButtonBar - text buttons */
const DEFAULT_BTN_TEXT = JSON.stringify(
  {
    id: "cardBtnText01",
    className: "card border m-2 shadow",
    link: "/users/101",

    header: {
      id: "cardBtnTextHeader",
      className: "card-header py-2 fw-semibold",
      name: "User Actions (Buttons - Text)"
    },

    body: {
      id: "cardBtnTextBody",
      className: "card-body",
      name: "Ada Lovelace"
    },

    fields: [
      {
        id: "role",
        className: "text-muted small",
        name: "Admin · Active since 2020"
      }
    ],

    footer: {
      id: "cardBtnTextFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Manage this user"
    },

    type: "AlloyButtonBar",
    action: {
      type: "AlloyButton",
      className: "nav gap-2",
      buttonClass: "nav-item",
      barName: { show: false },
      buttons: [
        {
          id: "editBtn",
          name: "Edit",
          className: "btn btn-sm btn-outline-primary"
        },
        {
          id: "delBtn",
          name: "Delete",
          className: "btn btn-sm btn-outline-danger"
        }
      ]
    }
  },
  null,
  2
);

/* 2) ButtonBar - icon + text buttons */
const DEFAULT_BTN_ICON_TEXT = JSON.stringify(
  {
    id: "cardBtnIconText01",
    className: "card border m-2 shadow",
    link: "/projects/501",

    header: {
      id: "cardBtnIconTextHeader",
      className: "card-header py-2 fw-semibold",
      name: "Project Actions (Buttons - Icon+Text)"
    },

    body: {
      id: "cardBtnIconTextBody",
      className: "card-body",
      name: "Compiler Migration"
    },

    fields: [
      {
        id: "status",
        className: "text-muted small",
        name: "Status: In progress · Priority: High"
      }
    ],

    footer: {
      id: "cardBtnIconTextFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Available actions"
    },

    type: "AlloyButtonBar",
    action: {
      type: "AlloyButtonIcon",
      className: "nav gap-2",
      buttonClass: "nav-item",
      barName: { show: false },
      buttons: [
        {
          id: "detailsBtn",
          name: "Details",
          className:
            "btn btn-sm btn-outline-secondary d-flex align-items-center gap-1",
          icon: { iconClass: "fa-regular fa-file-lines" }
        },
        {
          id: "assignBtn",
          name: "Assign",
          className:
            "btn btn-sm btn-outline-primary d-flex align-items-center gap-1",
          icon: { iconClass: "fa-regular fa-user" }
        }
      ]
    }
  },
  null,
  2
);

/* 3) ButtonBar - icon-only buttons */
const DEFAULT_BTN_ICON_ONLY = JSON.stringify(
  {
    id: "cardBtnIconOnly01",
    className: "card border m-2 shadow",
    link: "/servers/42",

    header: {
      id: "cardBtnIconOnlyHeader",
      className: "card-header py-2 fw-semibold",
      name: "Server Actions (Buttons - Icon Only)"
    },

    body: {
      id: "cardBtnIconOnlyBody",
      className: "card-body",
      name: "prod-api-01"
    },

    fields: [
      {
        id: "meta",
        className: "text-muted small",
        name: "Region: us-east · Status: Healthy"
      }
    ],

    footer: {
      id: "cardBtnIconOnlyFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Admin tools"
    },

    type: "AlloyButtonBar",
    action: {
      type: "AlloyButtonIcon",
      className: "nav gap-2",
      buttonClass: "nav-item",
      barName: { show: false },
      buttons: [
        {
          id: "restartBtn",
          ariaLabel: "Restart",
          title: "Restart",
          className: "btn btn-sm btn-outline-warning",
          icon: { iconClass: "fa-solid fa-rotate-right" }
        },
        {
          id: "logsBtn",
          ariaLabel: "View logs",
          title: "View logs",
          className: "btn btn-sm btn-outline-secondary",
          icon: { iconClass: "fa-regular fa-file-lines" }
        }
      ]
    }
  },
  null,
  2
);

/* 4) LinkBar - text links */
const DEFAULT_LINK_TEXT = JSON.stringify(
  {
    id: "cardLinkText01",
    className: "card border m-2 shadow",
    link: "/docs/overview",

    header: {
      id: "cardLinkTextHeader",
      className: "card-header py-2 fw-semibold",
      name: "Resources (Links - Text)"
    },

    body: {
      id: "cardLinkTextBody",
      className: "card-body",
      name: "Alloy Documentation"
    },

    fields: [
      {
        id: "desc",
        className: "text-muted small",
        name: "Guides, API reference, and examples"
      }
    ],

    footer: {
      id: "cardLinkTextFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Helpful links"
    },

    type: "AlloyLinkBar",
    action: {
      type: "AlloyLink",
      className: "nav gap-2",
      linkClass: "nav-item",
      barName: { show: false },
      links: [
        {
          id: "viewDocs",
          name: "View Docs",
          href: "/docs",
          className: "btn btn-sm btn-outline-secondary"
        },
        {
          id: "support",
          name: "Support",
          href: "/support",
          className: "btn btn-sm btn-outline-dark"
        }
      ]
    }
  },
  null,
  2
);

/* 5) LinkBar - icon+text links */
const DEFAULT_LINK_ICON_TEXT = JSON.stringify(
  {
    id: "cardLinkIconText01",
    className: "card border m-2 shadow",
    link: "/support",

    header: {
      id: "cardLinkIconTextHeader",
      className: "card-header py-2 fw-semibold",
      name: "Support (Links - Icon+Text)"
    },

    body: {
      id: "cardLinkIconTextBody",
      className: "card-body",
      name: "Help & Support"
    },

    fields: [
      {
        id: "desc",
        className: "text-muted small",
        name: "Guides, help, and chat"
      }
    ],

    footer: {
      id: "cardLinkIconTextFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Support options"
    },

    type: "AlloyLinkBar",
    action: {
      type: "AlloyLinkIcon",
      className: "nav gap-2",
      linkClass: "nav-item",
      barName: { show: false },
      links: [
        {
          id: "docs",
          name: "Docs",
          href: "/docs",
          className:
            "btn btn-sm btn-outline-secondary d-flex align-items-center gap-1",
          icon: { iconClass: "fa-regular fa-file-lines" }
        },
        {
          id: "chat",
          name: "Chat",
          href: "/support/chat",
          className:
            "btn btn-sm btn-outline-dark d-flex align-items-center gap-1",
          icon: { iconClass: "fa-regular fa-comments" }
        }
      ]
    }
  },
  null,
  2
);

/* 6) LinkBar - icon-only links */
const DEFAULT_LINK_ICON_ONLY = JSON.stringify(
  {
    id: "cardLinkIconOnly01",
    className: "card border m-2 shadow",
    link: "/shortcuts",

    header: {
      id: "cardLinkIconOnlyHeader",
      className: "card-header py-2 fw-semibold",
      name: "Shortcuts (Links - Icon Only)"
    },

    body: {
      id: "cardLinkIconOnlyBody",
      className: "card-body",
      name: "Quick Actions"
    },

    fields: [
      {
        id: "desc",
        className: "text-muted small",
        name: "Common navigation shortcuts"
      }
    ],

    footer: {
      id: "cardLinkIconOnlyFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Jump to…"
    },

    type: "AlloyLinkBar",
    action: {
      type: "AlloyLinkIcon",
      className: "nav gap-2",
      linkClass: "nav-item",
      barName: { show: false },
      links: [
        {
          id: "docs",
          href: "/docs",
          className: "btn btn-sm btn-outline-secondary",
          icon: { iconClass: "fa-regular fa-file-lines" },
          ariaLabel: "Docs",
          title: "Docs"
        },
        {
          id: "chat",
          href: "/support/chat",
          className: "btn btn-sm btn-outline-dark",
          icon: { iconClass: "fa-regular fa-comments" },
          ariaLabel: "Chat",
          title: "Chat"
        }
      ]
    }
  },
  null,
  2
);

/* ---------------------- Tag snippet (display only) ---------------------- */
const TAG_SNIPPET = `<AlloyCardAction cardAction={new CardActionObject(cardActionObject)} output={handleOutput} />`;

export default function CardActionPage() {
  const TABS = [
    { key: "BtnText", label: "Button (text)" },
    { key: "BtnIconText", label: "Button (icon+text)" },
    { key: "BtnIcon", label: "Button (icon only)" },
    { key: "LinkText", label: "Link (text)" },
    { key: "LinkIconText", label: "Link (icon+text)" },
    { key: "LinkIcon", label: "Link (icon only)" }
  ];

  const [active, setActive] = useState("BtnText");

  // JSON per tab
  const [jsonBtnText, setJsonBtnText] = useState(DEFAULT_BTN_TEXT);
  const [jsonBtnIconText, setJsonBtnIconText] = useState(DEFAULT_BTN_ICON_TEXT);
  const [jsonBtnIcon, setJsonBtnIcon] = useState(DEFAULT_BTN_ICON_ONLY);
  const [jsonLinkText, setJsonLinkText] = useState(DEFAULT_LINK_TEXT);
  const [jsonLinkIconText, setJsonLinkIconText] =
    useState(DEFAULT_LINK_ICON_TEXT);
  const [jsonLinkIcon, setJsonLinkIcon] = useState(DEFAULT_LINK_ICON_ONLY);

  // parse errors
  const [errBtnText, setErrBtnText] = useState("");
  const [errBtnIconText, setErrBtnIconText] = useState("");
  const [errBtnIcon, setErrBtnIcon] = useState("");
  const [errLinkText, setErrLinkText] = useState("");
  const [errLinkIconText, setErrLinkIconText] = useState("");
  const [errLinkIcon, setErrLinkIcon] = useState("");

  // Output per tab
  const defaultOutputMsg =
    '// click a footer action to see OutputObject:\n' +
    '// {\n' +
    '//   id: "<card-id>",\n' +
    '//   type: "card-action",\n' +
    '//   action: "<name | ariaLabel | title | id>",\n' +
    '//   error: false,\n' +
    '//   data: { "<field.id>": "<field.name>", ... }\n' +
    '// }';

  const [emitBtnText, setEmitBtnText] = useState(defaultOutputMsg);
  const [emitBtnIconText, setEmitBtnIconText] = useState(defaultOutputMsg);
  const [emitBtnIcon, setEmitBtnIcon] = useState(defaultOutputMsg);
  const [emitLinkText, setEmitLinkText] = useState(defaultOutputMsg);
  const [emitLinkIconText, setEmitLinkIconText] =
    useState(defaultOutputMsg);
  const [emitLinkIcon, setEmitLinkIcon] = useState(defaultOutputMsg);

  /* ---------------- model builders per tab ---------------- */

  const modelBtnText = useMemo(() => {
    try {
      setErrBtnText("");
      return new CardActionObject(JSON.parse(jsonBtnText));
    } catch (e) {
      setErrBtnText(String(e.message || e));
      return new CardActionObject({
        className: "card border m-2 shadow",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Button text)"
        },
        body: {
          className: "card-body",
          name: "Parse error"
        },
        fields: [
          {
            className: "text-danger",
            name: "Fix JSON to preview actions"
          }
        ],
        footer: {
          className:
            "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
          name: "Manage this user"
        },
        type: "AlloyButtonBar",
        action: {
          type: "AlloyButton",
          className: "nav gap-2",
          buttons: []
        }
      });
    }
  }, [jsonBtnText]);

  const modelBtnIconText = useMemo(() => {
    try {
      setErrBtnIconText("");
      return new CardActionObject(JSON.parse(jsonBtnIconText));
    } catch (e) {
      setErrBtnIconText(String(e.message || e));
      return new CardActionObject({
        className: "card border m-2 shadow",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Button icon+text)"
        },
        body: {
          className: "card-body",
          name: "Parse error"
        },
        fields: [
          {
            className: "text-danger",
            name: "Fix JSON to preview actions"
          }
        ],
        footer: {
          className:
            "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
          name: "Available actions"
        },
        type: "AlloyButtonBar",
        action: {
          type: "AlloyButtonIcon",
          className: "nav gap-2",
          buttons: []
        }
      });
    }
  }, [jsonBtnIconText]);

  const modelBtnIcon = useMemo(() => {
    try {
      setErrBtnIcon("");
      return new CardActionObject(JSON.parse(jsonBtnIcon));
    } catch (e) {
      setErrBtnIcon(String(e.message || e));
      return new CardActionObject({
        className: "card border m-2 shadow",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Button icon only)"
        },
        body: {
          className: "card-body",
          name: "Parse error"
        },
        fields: [
          {
            className: "text-danger",
            name: "Fix JSON to preview actions"
          }
        ],
        footer: {
          className:
            "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
          name: "Admin tools"
        },
        type: "AlloyButtonBar",
        action: {
          type: "AlloyButtonIcon",
          className: "nav gap-2",
          buttons: []
        }
      });
    }
  }, [jsonBtnIcon]);

  const modelLinkText = useMemo(() => {
    try {
      setErrLinkText("");
      return new CardActionObject(JSON.parse(jsonLinkText));
    } catch (e) {
      setErrLinkText(String(e.message || e));
      return new CardActionObject({
        className: "card border m-2 shadow",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Link text)"
        },
        body: {
          className: "card-body",
          name: "Parse error"
        },
        fields: [
          {
            className: "text-danger",
            name: "Fix JSON to preview actions"
          }
        ],
        footer: {
          className:
            "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
          name: "Helpful links"
        },
        type: "AlloyLinkBar",
        action: {
          type: "AlloyLink",
          className: "nav gap-2",
          links: []
        }
      });
    }
  }, [jsonLinkText]);

  const modelLinkIconText = useMemo(() => {
    try {
      setErrLinkIconText("");
      return new CardActionObject(JSON.parse(jsonLinkIconText));
    } catch (e) {
      setErrLinkIconText(String(e.message || e));
      return new CardActionObject({
        className: "card border m-2 shadow",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Link icon+text)"
        },
        body: {
          className: "card-body",
          name: "Parse error"
        },
        fields: [
          {
            className: "text-danger",
            name: "Fix JSON to preview actions"
          }
        ],
        footer: {
          className:
            "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
          name: "Support options"
        },
        type: "AlloyLinkBar",
        action: {
          type: "AlloyLinkIcon",
          className: "nav gap-2",
          links: []
        }
      });
    }
  }, [jsonLinkIconText]);

  const modelLinkIcon = useMemo(() => {
    try {
      setErrLinkIcon("");
      return new CardActionObject(JSON.parse(jsonLinkIcon));
    } catch (e) {
      setErrLinkIcon(String(e.message || e));
      return new CardActionObject({
        className: "card border m-2 shadow",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Link icon only)"
        },
        body: {
          className: "card-body",
          name: "Parse error"
        },
        fields: [
          {
            className: "text-danger",
            name: "Fix JSON to preview actions"
          }
        ],
        footer: {
          className:
            "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
          name: "Jump to…"
        },
        type: "AlloyLinkBar",
        action: {
          type: "AlloyLinkIcon",
          className: "nav gap-2",
          links: []
        }
      });
    }
  }, [jsonLinkIcon]);

  /* ---------------- active tab bindings ---------------- */

  const tabBindings =
    {
      BtnText: {
        label: "Button (text)",
        model: modelBtnText,
        inputJson: jsonBtnText,
        setInputJson: setJsonBtnText,
        parseError: errBtnText,
        setParseError: setErrBtnText,
        outputJson: emitBtnText,
        setOutputJson: setEmitBtnText,
        resetJson: () => {
          setJsonBtnText(DEFAULT_BTN_TEXT);
          setEmitBtnText(defaultOutputMsg);
          setErrBtnText("");
        }
      },
      BtnIconText: {
        label: "Button (icon+text)",
        model: modelBtnIconText,
        inputJson: jsonBtnIconText,
        setInputJson: setJsonBtnIconText,
        parseError: errBtnIconText,
        setParseError: setErrBtnIconText,
        outputJson: emitBtnIconText,
        setOutputJson: setEmitBtnIconText,
        resetJson: () => {
          setJsonBtnIconText(DEFAULT_BTN_ICON_TEXT);
          setEmitBtnIconText(defaultOutputMsg);
          setErrBtnIconText("");
        }
      },
      BtnIcon: {
        label: "Button (icon only)",
        model: modelBtnIcon,
        inputJson: jsonBtnIcon,
        setInputJson: setJsonBtnIcon,
        parseError: errBtnIcon,
        setParseError: setErrBtnIcon,
        outputJson: emitBtnIcon,
        setOutputJson: setEmitBtnIcon,
        resetJson: () => {
          setJsonBtnIcon(DEFAULT_BTN_ICON_ONLY);
          setEmitBtnIcon(defaultOutputMsg);
          setErrBtnIcon("");
        }
      },
      LinkText: {
        label: "Link (text)",
        model: modelLinkText,
        inputJson: jsonLinkText,
        setInputJson: setJsonLinkText,
        parseError: errLinkText,
        setParseError: setErrLinkText,
        outputJson: emitLinkText,
        setOutputJson: setEmitLinkText,
        resetJson: () => {
          setJsonLinkText(DEFAULT_LINK_TEXT);
          setEmitLinkText(defaultOutputMsg);
          setErrLinkText("");
        }
      },
      LinkIconText: {
        label: "Link (icon+text)",
        model: modelLinkIconText,
        inputJson: jsonLinkIconText,
        setInputJson: setJsonLinkIconText,
        parseError: errLinkIconText,
        setParseError: setErrLinkIconText,
        outputJson: emitLinkIconText,
        setOutputJson: setEmitLinkIconText,
        resetJson: () => {
          setJsonLinkIconText(DEFAULT_LINK_ICON_TEXT);
          setEmitLinkIconText(defaultOutputMsg);
          setErrLinkIconText("");
        }
      },
      LinkIcon: {
        label: "Link (icon only)",
        model: modelLinkIcon,
        inputJson: jsonLinkIcon,
        setInputJson: setJsonLinkIcon,
        parseError: errLinkIcon,
        setParseError: setErrLinkIcon,
        outputJson: emitLinkIcon,
        setOutputJson: setEmitLinkIcon,
        resetJson: () => {
          setJsonLinkIcon(DEFAULT_LINK_ICON_ONLY);
          setEmitLinkIcon(defaultOutputMsg);
          setErrLinkIcon("");
        }
      }
    }[active] || {};

  /* ---------------- handleOutput: normalize OutputObject ---------------- */

  function handleOutput(out) {
    const payload =
      out && typeof out.toJSON === "function" ? out.toJSON() : out;

    tabBindings.setOutputJson(JSON.stringify(payload, null, 2));
  }

  return (
    <div className="container py-3 d-flex flex-column align-items-center">
      <div className="col-12 col-lg-10 col-xl-8">
        <h3 className="mb-3 text-center">AlloyCardAction</h3>

        {/* Tabs */}
        <ul className="nav nav-tabs flex-wrap justify-content-center mb-3">
          {TABS.map(({ key, label }) => (
            <li className="nav-item" key={key}>
              <button
                type="button"
                className={`nav-link ${active === key ? "active" : ""}`}
                onClick={() => setActive(key)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Tag snippet */}
        <div className="row mb-3 justify-content-center">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <pre className="bg-light text-dark border rounded-3 p-3 small mb-0 text-center">
              <code>{TAG_SNIPPET}</code>
            </pre>
          </div>
        </div>

        {/* Preview */}
        <div className="row mb-4 justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            {tabBindings.model && (
              <AlloyCardAction
                cardAction={tabBindings.model}
                output={handleOutput}
              />
            )}
            <div className="small text-secondary mt-2 text-center text-lg-start">
              <div className="mb-1">
                <strong>Navigation behavior:</strong>{" "}
                <code>link</code> is optional.
                If present (like <code>"/users/101"</code>), ONLY the{" "}
                <code>body</code> area becomes clickable (React Router{" "}
                <code>&lt;Link/&gt;</code>).
              </div>
              <div className="mb-1">
                Header, footer, and the footer action bar are never part of that
                link. Footer actions still work and emit{" "}
                <code>output()</code>.
              </div>
              <div className="text-muted">
                Remove <code>link</code> (or set it to <code>""</code>) to make
                the card body non-clickable.
              </div>
            </div>
          </div>
        </div>

        {/* Input JSON + Output payload side by side */}
        <div className="row g-3 align-items-stretch justify-content-center mb-5">
          {/* Left: JSON editor */}
          <div className="col-12 col-lg-6">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-semibold">
                Input JSON (editable) — {tabBindings.label}
              </span>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={tabBindings.resetJson}
              >
                Reset
              </button>
            </div>

            <textarea
              className={`form-control font-monospace ${
                tabBindings.parseError ? "is-invalid" : ""
              }`}
              rows={18}
              value={tabBindings.inputJson}
              onChange={(e) => tabBindings.setInputJson(e.target.value)}
              spellCheck={false}
            />
            {tabBindings.parseError && (
              <div className="invalid-feedback d-block mt-1">
                {tabBindings.parseError}
              </div>
            )}

            <div className="form-text">
              <ul className="mb-0 ps-3">
                <li>
                  <code>header</code>, <code>body</code>,{" "}
                  <code>fields[]</code>, and <code>footer</code> are plain tag
                  configs (<code>id</code>, <code>className</code>,{" "}
                  <code>name</code>).
                </li>
                <li>
                  <code>type</code> determines footer bar (
                  <code>"AlloyButtonBar"</code> vs{" "}
                  <code>"AlloyLinkBar"</code>).
                </li>
                <li>
                  <code>action</code> hydrates into a ButtonBarObject or
                  LinkBarObject (buttons/links arrays).
                </li>
                <li>
                  When an action is clicked, <code>fields[]</code> with both{" "}
                  <code>id</code> and <code>name</code> become a key/value map
                  in <code>OutputObject.data</code>.
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Output payload */}
          <div className="col-12 col-lg-6">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-semibold">
                Output (from action click)
              </span>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() =>
                  tabBindings.setOutputJson(defaultOutputMsg)
                }
              >
                Clear
              </button>
            </div>

            <textarea
              className="form-control font-monospace bg-light border"
              rows={18}
              value={tabBindings.outputJson || defaultOutputMsg}
              readOnly
              spellCheck={false}
            />
            <div className="form-text">
              Standard <code>OutputObject</code> shape from{" "}
              <code>AlloyCardAction</code>:
              <pre className="mt-2 mb-1 small bg-light border rounded-3 p-2">
{`{
  id: "<card-id>",
  type: "card-action",
  action: "<name | ariaLabel | title | id>",
  error: false,
  data: {
    "<field.id>": "<field.name>",
    ...
  }
}`}
              </pre>
              Typical usage:
              <ul className="mb-0 ps-3">
                <li>
                  Branch on <code>action</code> (e.g.{" "}
                  <code>"Edit"</code>, <code>"Delete"</code>,{" "}
                  <code>"Restart"</code>, <code>"Docs"</code>,{" "}
                  <code>"Chat"</code>).
                </li>
                <li>
                  Use <code>data</code> as a pre-normalized payload of the
                  card’s field values (e.g. <code>role</code>,{" "}
                  <code>status</code>, etc.).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
