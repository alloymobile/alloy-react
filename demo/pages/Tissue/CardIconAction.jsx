// demo/pages/tissue/CardIconActionPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyCardIconAction, CardIconActionObject } from "../../../src";

/* ---------------------- Default JSON presets ---------------------- */
/* All six variants include the icon/avatar block at the top and
   an action area at the bottom that can be either ButtonBar or LinkBar. */

/* 1) ButtonBar - text only */
const DEFAULT_BTN_TEXT = JSON.stringify(
  {
    id: "cardIconBtnText01",
    className: "card border m-2 shadow",

    body: {
      id: "cardIconBtnTextBody",
      className: "card-body d-flex align-items-center",
      name: "User Actions (Buttons - Text)",
      show: true
    },

    // icon/avatar column on the left
    icon: {
      iconClass: "fa-solid fa-user fa-2xl"
    },
    iconClass:
      "col-4 icon-lg rounded-circle bg-warning text-white mb-0 d-flex align-items-center justify-content-center",
    textClass: "col-8",

    // right-side info fields
    fields: [
      {
        id: "fullName",
        className: "fw-semibold",
        name: "Ada Lovelace",
        show: true
      },
      {
        id: "role",
        className: "text-muted small",
        name: "Admin",
        show: true
      }
    ],

    type: "AlloyButtonBar",
    action: {
      // ButtonBarObject hydrate
      type: "AlloyButton", // plain text buttons
      className: "nav gap-2 p-2 border-top justify-content-end flex-row",
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

/* 2) ButtonBar - icon + text */
const DEFAULT_BTN_ICON_TEXT = JSON.stringify(
  {
    id: "cardIconBtnIconText01",
    className: "card border m-2 shadow",

    body: {
      id: "cardIconBtnIconTextBody",
      className: "card-body d-flex align-items-center",
      name: "User Actions (Buttons - Icon+Text)",
      show: true
    },

    icon: {
      iconClass: "fa-solid fa-user-gear fa-2xl"
    },
    iconClass:
      "col-4 icon-lg rounded-circle bg-primary text-white mb-0 d-flex align-items-center justify-content-center",
    textClass: "col-8",

    fields: [
      {
        id: "fullName",
        className: "fw-semibold",
        name: "Linus Torvalds",
        show: true
      },
      {
        id: "role",
        className: "text-muted small",
        name: "User",
        show: true
      }
    ],

    type: "AlloyButtonBar",
    action: {
      // `AlloyButtonIcon` means icon+text per button
      type: "AlloyButtonIcon",
      className: "nav gap-2 p-2 border-top justify-content-end flex-row",
      buttonClass: "nav-item",
      barName: { show: false },
      buttons: [
        {
          id: "editBtn",
          name: "Edit",
          className:
            "btn btn-sm btn-outline-primary d-flex align-items-center gap-1",
          icon: { iconClass: "fa-regular fa-pen-to-square" }
        },
        {
          id: "delBtn",
          name: "Delete",
          className:
            "btn btn-sm btn-outline-danger d-flex align-items-center gap-1",
          icon: { iconClass: "fa-regular fa-trash-can" }
        }
      ]
    }
  },
  null,
  2
);

/* 3) ButtonBar - icon only (no text label on the buttons) */
const DEFAULT_BTN_ICON_ONLY = JSON.stringify(
  {
    id: "cardIconBtnIconOnly01",
    className: "card border m-2 shadow",

    body: {
      id: "cardIconBtnIconOnlyBody",
      className: "card-body d-flex align-items-center",
      name: "User Actions (Buttons - Icon Only)",
      show: true
    },

    icon: {
      iconClass: "fa-solid fa-user-astronaut fa-2xl"
    },
    iconClass:
      "col-4 icon-lg rounded-circle bg-dark text-white mb-0 d-flex align-items-center justify-content-center",
    textClass: "col-8",

    fields: [
      {
        id: "fullName",
        className: "fw-semibold",
        name: "Margaret Hamilton",
        show: true
      },
      {
        id: "role",
        className: "text-muted small",
        name: "Owner",
        show: true
      }
    ],

    type: "AlloyButtonBar",
    action: {
      type: "AlloyButtonIcon", // icon buttons
      className: "nav gap-2 p-2 border-top justify-content-end flex-row",
      buttonClass: "nav-item",
      barName: { show: false },
      buttons: [
        {
          id: "editBtn",
          ariaLabel: "Edit",
          className: "btn btn-sm btn-outline-primary",
          icon: { iconClass: "fa-regular fa-pen-to-square" }
        },
        {
          id: "delBtn",
          ariaLabel: "Delete",
          className: "btn btn-sm btn-outline-danger",
          icon: { iconClass: "fa-regular fa-trash-can" }
        }
      ]
    }
  },
  null,
  2
);

/* 4) LinkBar - text only */
const DEFAULT_LINK_TEXT = JSON.stringify(
  {
    id: "cardIconLinkText01",
    className: "card border m-2 shadow",

    body: {
      id: "cardIconLinkTextBody",
      className: "card-body d-flex align-items-center",
      name: "Resources (Links - Text)",
      show: true
    },

    icon: {
      iconClass: "fa-solid fa-book-open fa-2xl"
    },
    iconClass:
      "col-4 icon-lg rounded-circle bg-info text-white mb-0 d-flex align-items-center justify-content-center",
    textClass: "col-8",

    fields: [
      {
        id: "title",
        className: "fw-semibold",
        name: "Alloy Docs",
        show: true
      },
      {
        id: "desc",
        className: "text-muted small",
        name: "Developer resources & API surface",
        show: true
      }
    ],

    type: "AlloyLinkBar",
    action: {
      // LinkBarObject hydrate: plain text links
      type: "AlloyLink",
      className: "nav gap-2 p-2 border-top justify-content-end flex-row",
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

/* 5) LinkBar - icon + text */
const DEFAULT_LINK_ICON_TEXT = JSON.stringify(
  {
    id: "cardIconLinkIconText01",
    className: "card border m-2 shadow",

    body: {
      id: "cardIconLinkIconTextBody",
      className: "card-body d-flex align-items-center",
      name: "Resources (Links - Icon+Text)",
      show: true
    },

    icon: {
      iconClass: "fa-solid fa-life-ring fa-2xl"
    },
    iconClass:
      "col-4 icon-lg rounded-circle bg-danger text-white mb-0 d-flex align-items-center justify-content-center",
    textClass: "col-8",

    fields: [
      {
        id: "title",
        className: "fw-semibold",
        name: "Support Center",
        show: true
      },
      {
        id: "desc",
        className: "text-muted small",
        name: "Guides, help, and chat",
        show: true
      }
    ],

    type: "AlloyLinkBar",
    action: {
      // LinkBarObject hydrate: links w/ icon + text
      type: "AlloyLinkIcon",
      className: "nav gap-2 p-2 border-top justify-content-end flex-row",
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

/* 6) LinkBar - icon only (no text label) */
const DEFAULT_LINK_ICON_ONLY = JSON.stringify(
  {
    id: "cardIconLinkIconOnly01",
    className: "card border m-2 shadow",

    body: {
      id: "cardIconLinkIconOnlyBody",
      className: "card-body d-flex align-items-center",
      name: "Resources (Links - Icon Only)",
      show: true
    },

    icon: {
      iconClass: "fa-solid fa-bolt fa-2xl"
    },
    iconClass:
      "col-4 icon-lg rounded-circle bg-warning text-white mb-0 d-flex align-items-center justify-content-center",
    textClass: "col-8",

    fields: [
      {
        id: "title",
        className: "fw-semibold",
        name: "Quick Access",
        show: true
      },
      {
        id: "desc",
        className: "text-muted small",
        name: "Shortcuts",
        show: true
      }
    ],

    type: "AlloyLinkBar",
    action: {
      // LinkBarObject hydrate: links w/ icons only
      type: "AlloyLinkIcon",
      className: "nav gap-2 p-2 border-top justify-content-end flex-row",
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
const TAG_SNIPPET = `<AlloyCardIconAction cardIconAction={new CardIconActionObject(cardIconActionObject)} output={handleOutput} />`;

/* ---------------------- Page Component ---------------------- */
export default function CardIconActionPage() {
  // tabs for each variant
  const TABS = [
    { key: "BtnText", label: "Button (text)" },
    { key: "BtnIconText", label: "Button (icon+text)" },
    { key: "BtnIcon", label: "Button (icon only)" },
    { key: "LinkText", label: "Link (text)" },
    { key: "LinkIconText", label: "Link (icon+text)" },
    { key: "LinkIcon", label: "Link (icon only)" }
  ];

  const [active, setActive] = useState("BtnText");

  // per-tab state: editable JSON string, parse error, and output emitted by clicks
  const [jsonBtnText, setJsonBtnText] = useState(DEFAULT_BTN_TEXT);
  const [errBtnText, setErrBtnText] = useState("");
  const [emitBtnText, setEmitBtnText] = useState("// click an action to see payload");

  const [jsonBtnIconText, setJsonBtnIconText] = useState(DEFAULT_BTN_ICON_TEXT);
  const [errBtnIconText, setErrBtnIconText] = useState("");
  const [emitBtnIconText, setEmitBtnIconText] = useState("// click an action to see payload");

  const [jsonBtnIcon, setJsonBtnIcon] = useState(DEFAULT_BTN_ICON_ONLY);
  const [errBtnIcon, setErrBtnIcon] = useState("");
  const [emitBtnIcon, setEmitBtnIcon] = useState("// click an action to see payload");

  const [jsonLinkText, setJsonLinkText] = useState(DEFAULT_LINK_TEXT);
  const [errLinkText, setErrLinkText] = useState("");
  const [emitLinkText, setEmitLinkText] = useState("// click an action to see payload");

  const [jsonLinkIconText, setJsonLinkIconText] = useState(DEFAULT_LINK_ICON_TEXT);
  const [errLinkIconText, setErrLinkIconText] = useState("");
  const [emitLinkIconText, setEmitLinkIconText] = useState("// click an action to see payload");

  const [jsonLinkIcon, setJsonLinkIcon] = useState(DEFAULT_LINK_ICON_ONLY);
  const [errLinkIcon, setErrLinkIcon] = useState("");
  const [emitLinkIcon, setEmitLinkIcon] = useState("// click an action to see payload");

  // hydrate each tab into a CardIconActionObject
  const modelBtnText = useMemo(() => {
    try {
      setErrBtnText("");
      return new CardIconActionObject(JSON.parse(jsonBtnText));
    } catch (e) {
      setErrBtnText(String(e.message || e));
      return new CardIconActionObject({
        className: "card border m-2 shadow",
        body: { className: "card-body d-flex align-items-center", name: "Invalid JSON (Button text)" },
        icon: { iconClass: "fa-solid fa-triangle-exclamation" },
        iconClass: "col-4 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center",
        textClass: "col-8",
        fields: [{ className: "text-danger", name: "Parse error", show: true }],
        type: "AlloyButtonBar",
        action: { type: "AlloyButton", className: "nav p-2 border-top justify-content-end flex-row", buttons: [] }
      });
    }
  }, [jsonBtnText]);

  const modelBtnIconText = useMemo(() => {
    try {
      setErrBtnIconText("");
      return new CardIconActionObject(JSON.parse(jsonBtnIconText));
    } catch (e) {
      setErrBtnIconText(String(e.message || e));
      return new CardIconActionObject({
        className: "card border m-2 shadow",
        body: { className: "card-body d-flex align-items-center", name: "Invalid JSON (Button icon+text)" },
        icon: { iconClass: "fa-solid fa-triangle-exclamation" },
        iconClass: "col-4 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center",
        textClass: "col-8",
        fields: [{ className: "text-danger", name: "Parse error", show: true }],
        type: "AlloyButtonBar",
        action: { type: "AlloyButtonIcon", className: "nav p-2 border-top justify-content-end flex-row", buttons: [] }
      });
    }
  }, [jsonBtnIconText]);

  const modelBtnIcon = useMemo(() => {
    try {
      setErrBtnIcon("");
      return new CardIconActionObject(JSON.parse(jsonBtnIcon));
    } catch (e) {
      setErrBtnIcon(String(e.message || e));
      return new CardIconActionObject({
        className: "card border m-2 shadow",
        body: { className: "card-body d-flex align-items-center", name: "Invalid JSON (Button icon only)" },
        icon: { iconClass: "fa-solid fa-triangle-exclamation" },
        iconClass: "col-4 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center",
        textClass: "col-8",
        fields: [{ className: "text-danger", name: "Parse error", show: true }],
        type: "AlloyButtonBar",
        action: { type: "AlloyButtonIcon", className: "nav p-2 border-top justify-content-end flex-row", buttons: [] }
      });
    }
  }, [jsonBtnIcon]);

  const modelLinkText = useMemo(() => {
    try {
      setErrLinkText("");
      return new CardIconActionObject(JSON.parse(jsonLinkText));
    } catch (e) {
      setErrLinkText(String(e.message || e));
      return new CardIconActionObject({
        className: "card border m-2 shadow",
        body: { className: "card-body d-flex align-items-center", name: "Invalid JSON (Link text)" },
        icon: { iconClass: "fa-solid fa-triangle-exclamation" },
        iconClass: "col-4 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center",
        textClass: "col-8",
        fields: [{ className: "text-danger", name: "Parse error", show: true }],
        type: "AlloyLinkBar",
        action: { type: "AlloyLink", className: "nav p-2 border-top justify-content-end flex-row", links: [] }
      });
    }
  }, [jsonLinkText]);

  const modelLinkIconText = useMemo(() => {
    try {
      setErrLinkIconText("");
      return new CardIconActionObject(JSON.parse(jsonLinkIconText));
    } catch (e) {
      setErrLinkIconText(String(e.message || e));
      return new CardIconActionObject({
        className: "card border m-2 shadow",
        body: { className: "card-body d-flex align-items-center", name: "Invalid JSON (Link icon+text)" },
        icon: { iconClass: "fa-solid fa-triangle-exclamation" },
        iconClass: "col-4 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center",
        textClass: "col-8",
        fields: [{ className: "text-danger", name: "Parse error", show: true }],
        type: "AlloyLinkBar",
        action: { type: "AlloyLinkIcon", className: "nav p-2 border-top justify-content-end flex-row", links: [] }
      });
    }
  }, [jsonLinkIconText]);

  const modelLinkIcon = useMemo(() => {
    try {
      setErrLinkIcon("");
      return new CardIconActionObject(JSON.parse(jsonLinkIcon));
    } catch (e) {
      setErrLinkIcon(String(e.message || e));
      return new CardIconActionObject({
        className: "card border m-2 shadow",
        body: { className: "card-body d-flex align-items-center", name: "Invalid JSON (Link icon only)" },
        icon: { iconClass: "fa-solid fa-triangle-exclamation" },
        iconClass: "col-4 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center",
        textClass: "col-8",
        fields: [{ className: "text-danger", name: "Parse error", show: true }],
        type: "AlloyLinkBar",
        action: { type: "AlloyLinkIcon", className: "nav p-2 border-top justify-content-end flex-row", links: [] }
      });
    }
  }, [jsonLinkIcon]);

  // handle click output from AlloyCardIconAction -> output textarea
  function handleOutput(tabKey, payload) {
    const formatted = JSON.stringify(payload, null, 2);
    switch (tabKey) {
      case "BtnText":
        setEmitBtnText(formatted);
        break;
      case "BtnIconText":
        setEmitBtnIconText(formatted);
        break;
      case "BtnIcon":
        setEmitBtnIcon(formatted);
        break;
      case "LinkText":
        setEmitLinkText(formatted);
        break;
      case "LinkIconText":
        setEmitLinkIconText(formatted);
        break;
      case "LinkIcon":
        setEmitLinkIcon(formatted);
        break;
      default:
        break;
    }
  }

  // per-tab bindings for cleaner render
  const tabBindings = {
    BtnText: {
      label: "Button (text)",
      model: modelBtnText,
      inputJson: jsonBtnText,
      setInputJson: setJsonBtnText,
      parseError: errBtnText,
      outputJson: emitBtnText,
      setOutputJson: setEmitBtnText,
      resetJson: () => {
        setJsonBtnText(DEFAULT_BTN_TEXT);
        setEmitBtnText("// click an action to see payload");
      }
    },
    BtnIconText: {
      label: "Button (icon+text)",
      model: modelBtnIconText,
      inputJson: jsonBtnIconText,
      setInputJson: setJsonBtnIconText,
      parseError: errBtnIconText,
      outputJson: emitBtnIconText,
      setOutputJson: setEmitBtnIconText,
      resetJson: () => {
        setJsonBtnIconText(DEFAULT_BTN_ICON_TEXT);
        setEmitBtnIconText("// click an action to see payload");
      }
    },
    BtnIcon: {
      label: "Button (icon only)",
      model: modelBtnIcon,
      inputJson: jsonBtnIcon,
      setInputJson: setJsonBtnIcon,
      parseError: errBtnIcon,
      outputJson: emitBtnIcon,
      setOutputJson: setEmitBtnIcon,
      resetJson: () => {
        setJsonBtnIcon(DEFAULT_BTN_ICON_ONLY);
        setEmitBtnIcon("// click an action to see payload");
      }
    },
    LinkText: {
      label: "Link (text)",
      model: modelLinkText,
      inputJson: jsonLinkText,
      setInputJson: setJsonLinkText,
      parseError: errLinkText,
      outputJson: emitLinkText,
      setOutputJson: setEmitLinkText,
      resetJson: () => {
        setJsonLinkText(DEFAULT_LINK_TEXT);
        setEmitLinkText("// click an action to see payload");
      }
    },
    LinkIconText: {
      label: "Link (icon+text)",
      model: modelLinkIconText,
      inputJson: jsonLinkIconText,
      setInputJson: setJsonLinkIconText,
      parseError: errLinkIconText,
      outputJson: emitLinkIconText,
      setOutputJson: setEmitLinkIconText,
      resetJson: () => {
        setJsonLinkIconText(DEFAULT_LINK_ICON_TEXT);
        setEmitLinkIconText("// click an action to see payload");
      }
    },
    LinkIcon: {
      label: "Link (icon only)",
      model: modelLinkIcon,
      inputJson: jsonLinkIcon,
      setInputJson: setJsonLinkIcon,
      parseError: errLinkIcon,
      outputJson: emitLinkIcon,
      setOutputJson: setEmitLinkIcon,
      resetJson: () => {
        setJsonLinkIcon(DEFAULT_LINK_ICON_ONLY);
        setEmitLinkIcon("// click an action to see payload");
      }
    }
  }[active];

  return (
    <div className="container py-3 d-flex flex-column align-items-center">
      <div className="col-12 col-lg-10 col-xl-8">
        <h3 className="mb-3 text-center">AlloyCardIconAction</h3>

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
              <code>{`<AlloyCardIconAction cardIconAction={new CardIconActionObject(cardIconActionObject)} output={handleOutput} />`}</code>
            </pre>
          </div>
        </div>

        {/* Preview */}
        <div className="row mb-4 justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <AlloyCardIconAction
              cardIconAction={tabBindings.model}
              output={(payload) => handleOutput(active, payload)}
            />
            <div className="small text-secondary mt-2 text-center text-lg-start">
              Top row = avatar/icon + text fields.  
              Bottom row = <code>AlloyButtonBar</code> or <code>AlloyLinkBar</code>  
              in text / icon+text / icon-only variants.
            </div>
          </div>
        </div>

        {/* Editable JSON + Output side by side */}
        <div className="row g-3 align-items-stretch justify-content-center mb-5">
          {/* Left: Input JSON */}
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
              <code>icon.iconClass</code> controls the left avatar/bubble.<br />
              <code>iconClass</code>/<code>textClass</code> control layout of the row.<br />
              <code>type</code> picks <code>"AlloyButtonBar"</code> or <code>"AlloyLinkBar"</code>.
            </div>
          </div>

          {/* Right: Output payload */}
          <div className="col-12 col-lg-6">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-semibold">Output (from action click)</span>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => tabBindings.setOutputJson("// cleared")}
              >
                Clear
              </button>
            </div>

            <textarea
              className="form-control font-monospace"
              rows={18}
              value={tabBindings.outputJson}
              onChange={(e) => tabBindings.setOutputJson(e.target.value)}
              spellCheck={false}
            />
            <div className="form-text">
              You’ll consume this payload to route, open dialogs, call APIs, etc.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
