// demo/pages/tissue/CardIconActionPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyCardIconAction, CardIconActionObject } from "../../../src";

/* ------------------------------------------------------------------
   Default presets for each variant.

   NOTE:
   - Every preset includes `link: "/users/101"`.
   - `link` is OPTIONAL. If you remove it or set it to "", the body
     will no longer be clickable.
   - Only the BODY becomes clickable when link is provided.
     Header, footer, and the footer action bar are never wrapped
     in <Link/>.

   Layout details for CardIconActionObject:
   - header (optional; renders only if header.name)
   - body   (required; also where the optional link click lives)
   - icon / iconClass  (left bubble/avatar in body row)
   - textClass + fields[] (right column lines in body row)
   - footer (required; always rendered)
        - footer.name = left text
        - footer action bar (ButtonBar or LinkBar) = right side
   - type + action configure footer bar behavior and content
------------------------------------------------------------------- */

/* 1) ButtonBar - text only */
const DEFAULT_BTN_TEXT = JSON.stringify(
  {
    id: "cardIconBtnText01",
    className: "card border m-2 shadow",
    link: "/users/101",

    header: {
      id: "cardIconBtnTextHeader",
      className: "card-header py-2 fw-semibold",
      name: "User Actions (Buttons - Text)"
    },

    body: {
      id: "cardIconBtnTextBody",
      className: "card-body d-flex align-items-center",
      name: "User Summary"
    },

    // avatar / glyph column on the left
    icon: {
      iconClass: "fa-solid fa-user fa-2xl"
    },
    iconClass:
      "col-4 rounded-circle bg-warning text-white mb-0 d-flex align-items-center justify-content-center",
    textClass: "col-8",

    // right column lines
    fields: [
      {
        id: "fullName",
        className: "fw-semibold",
        name: "Ada Lovelace"
      },
      {
        id: "role",
        className: "text-muted small",
        name: "Admin"
      }
    ],

    footer: {
      id: "cardIconBtnTextFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Manage this user"
    },

    type: "AlloyButtonBar",
    action: {
      // ButtonBarObject (text buttons)
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

/* 2) ButtonBar - icon + text */
const DEFAULT_BTN_ICON_TEXT = JSON.stringify(
  {
    id: "cardIconBtnIconText01",
    className: "card border m-2 shadow",
    link: "/users/101",

    header: {
      id: "cardIconBtnIconTextHeader",
      className: "card-header py-2 fw-semibold",
      name: "User Actions (Buttons - Icon+Text)"
    },

    body: {
      id: "cardIconBtnIconTextBody",
      className: "card-body d-flex align-items-center",
      name: "User Summary"
    },

    icon: {
      iconClass: "fa-solid fa-user-gear fa-2xl"
    },
    iconClass:
      "col-4 rounded-circle bg-primary text-white mb-0 d-flex align-items-center justify-content-center",
    textClass: "col-8",

    fields: [
      {
        id: "fullName",
        className: "fw-semibold",
        name: "Linus Torvalds"
      },
      {
        id: "role",
        className: "text-muted small",
        name: "User"
      }
    ],

    footer: {
      id: "cardIconBtnIconTextFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Available actions"
    },

    type: "AlloyButtonBar",
    action: {
      // ButtonBarObject w/ ButtonIconObject children (icon+text buttons)
      type: "AlloyButtonIcon",
      className: "nav gap-2",
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

/* 3) ButtonBar - icon only */
const DEFAULT_BTN_ICON_ONLY = JSON.stringify(
  {
    id: "cardIconBtnIconOnly01",
    className: "card border m-2 shadow",
    link: "/users/101",

    header: {
      id: "cardIconBtnIconOnlyHeader",
      className: "card-header py-2 fw-semibold",
      name: "User Actions (Buttons - Icon Only)"
    },

    body: {
      id: "cardIconBtnIconOnlyBody",
      className: "card-body d-flex align-items-center",
      name: "User Summary"
    },

    icon: {
      iconClass: "fa-solid fa-user-astronaut fa-2xl"
    },
    iconClass:
      "col-4 rounded-circle bg-dark text-white mb-0 d-flex align-items-center justify-content-center",
    textClass: "col-8",

    fields: [
      {
        id: "fullName",
        className: "fw-semibold",
        name: "Margaret Hamilton"
      },
      {
        id: "role",
        className: "text-muted small",
        name: "Owner"
      }
    ],

    footer: {
      id: "cardIconBtnIconOnlyFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Admin tools"
    },

    type: "AlloyButtonBar",
    action: {
      // icon-only buttons
      type: "AlloyButtonIcon",
      className: "nav gap-2",
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
    link: "/users/101",

    header: {
      id: "cardIconLinkTextHeader",
      className: "card-header py-2 fw-semibold",
      name: "Resources (Links - Text)"
    },

    body: {
      id: "cardIconLinkTextBody",
      className: "card-body d-flex align-items-center",
      name: "Docs & Help"
    },

    icon: {
      iconClass: "fa-solid fa-book-open fa-2xl"
    },
    iconClass:
      "col-4 rounded-circle bg-info text-white mb-0 d-flex align-items-center justify-content-center",
    textClass: "col-8",

    fields: [
      {
        id: "title",
        className: "fw-semibold",
        name: "Alloy Docs"
      },
      {
        id: "desc",
        className: "text-muted small",
        name: "Developer resources & API surface"
      }
    ],

    footer: {
      id: "cardIconLinkTextFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Helpful links"
    },

    type: "AlloyLinkBar",
    action: {
      // LinkBarObject hydrate: plain text links
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

/* 5) LinkBar - icon + text */
const DEFAULT_LINK_ICON_TEXT = JSON.stringify(
  {
    id: "cardIconLinkIconText01",
    className: "card border m-2 shadow",
    link: "/users/101",

    header: {
      id: "cardIconLinkIconTextHeader",
      className: "card-header py-2 fw-semibold",
      name: "Resources (Links - Icon+Text)"
    },

    body: {
      id: "cardIconLinkIconTextBody",
      className: "card-body d-flex align-items-center",
      name: "Guides, help, chat"
    },

    icon: {
      iconClass: "fa-solid fa-life-ring fa-2xl"
    },
    iconClass:
      "col-4 rounded-circle bg-danger text-white mb-0 d-flex align-items-center justify-content-center",
    textClass: "col-8",

    fields: [
      {
        id: "title",
        className: "fw-semibold",
        name: "Support Center"
      },
      {
        id: "desc",
        className: "text-muted small",
        name: "Guides, help, and chat"
      }
    ],

    footer: {
      id: "cardIconLinkIconTextFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Support options"
    },

    type: "AlloyLinkBar",
    action: {
      // LinkBarObject hydrate: links w/ icon + label
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

/* 6) LinkBar - icon only */
const DEFAULT_LINK_ICON_ONLY = JSON.stringify(
  {
    id: "cardIconLinkIconOnly01",
    className: "card border m-2 shadow",
    link: "/users/101",

    header: {
      id: "cardIconLinkIconOnlyHeader",
      className: "card-header py-2 fw-semibold",
      name: "Resources (Links - Icon Only)"
    },

    body: {
      id: "cardIconLinkIconOnlyBody",
      className: "card-body d-flex align-items-center",
      name: "Shortcuts"
    },

    icon: {
      iconClass: "fa-solid fa-bolt fa-2xl"
    },
    iconClass:
      "col-4 rounded-circle bg-warning text-white mb-0 d-flex align-items-center justify-content-center",
    textClass: "col-8",

    fields: [
      {
        id: "title",
        className: "fw-semibold",
        name: "Quick Access"
      },
      {
        id: "desc",
        className: "text-muted small",
        name: "Shortcuts"
      }
    ],

    footer: {
      id: "cardIconLinkIconOnlyFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Jump to…"
    },

    type: "AlloyLinkBar",
    action: {
      // LinkBarObject hydrate: icon links only (ariaLabel/title drive a11y)
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
const TAG_SNIPPET = `<AlloyCardIconAction cardIconAction={new CardIconActionObject(cardIconActionObject)} output={handleOutput} />`;

export default function CardIconActionPage() {
  // same 6 tabs style as CardActionPage
  const TABS = [
    { key: "BtnText", label: "Button (text)" },
    { key: "BtnIconText", label: "Button (icon+text)" },
    { key: "BtnIcon", label: "Button (icon only)" },
    { key: "LinkText", label: "Link (text)" },
    { key: "LinkIconText", label: "Link (icon+text)" },
    { key: "LinkIcon", label: "Link (icon only)" }
  ];

  const [active, setActive] = useState("BtnText");

  // editable JSON per tab
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

  // emitted output (from footer bar click)
  const [emitBtnText, setEmitBtnText] = useState(
    "// click an action to see payload"
  );
  const [emitBtnIconText, setEmitBtnIconText] = useState(
    "// click an action to see payload"
  );
  const [emitBtnIcon, setEmitBtnIcon] = useState(
    "// click an action to see payload"
  );
  const [emitLinkText, setEmitLinkText] = useState(
    "// click an action to see payload"
  );
  const [emitLinkIconText, setEmitLinkIconText] = useState(
    "// click an action to see payload"
  );
  const [emitLinkIcon, setEmitLinkIcon] = useState(
    "// click an action to see payload"
  );

  /* ---------------- model builders per tab ---------------- */
  const modelBtnText = useMemo(() => {
    try {
      setErrBtnText("");
      return new CardIconActionObject(JSON.parse(jsonBtnText));
    } catch (e) {
      setErrBtnText(String(e.message || e));
      return new CardIconActionObject({
        className: "card border m-2 shadow",
        link: "/users/101",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Button text)"
        },
        body: {
          className: "card-body d-flex align-items-center",
          name: "Parse error"
        },
        icon: { iconClass: "fa-solid fa-triangle-exclamation" },
        iconClass:
          "col-4 rounded-circle bg-danger text-white mb-0 d-flex align-items-center justify-content-center",
        textClass: "col-8",
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
      return new CardIconActionObject(JSON.parse(jsonBtnIconText));
    } catch (e) {
      setErrBtnIconText(String(e.message || e));
      return new CardIconActionObject({
        className: "card border m-2 shadow",
        link: "/users/101",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Button icon+text)"
        },
        body: {
          className: "card-body d-flex align-items-center",
          name: "Parse error"
        },
        icon: { iconClass: "fa-solid fa-triangle-exclamation" },
        iconClass:
          "col-4 rounded-circle bg-danger text-white mb-0 d-flex align-items-center justify-content-center",
        textClass: "col-8",
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
      return new CardIconActionObject(JSON.parse(jsonBtnIcon));
    } catch (e) {
      setErrBtnIcon(String(e.message || e));
      return new CardIconActionObject({
        className: "card border m-2 shadow",
        link: "/users/101",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Button icon only)"
        },
        body: {
          className: "card-body d-flex align-items-center",
          name: "Parse error"
        },
        icon: { iconClass: "fa-solid fa-triangle-exclamation" },
        iconClass:
          "col-4 rounded-circle bg-danger text-white mb-0 d-flex align-items-center justify-content-center",
        textClass: "col-8",
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
      return new CardIconActionObject(JSON.parse(jsonLinkText));
    } catch (e) {
      setErrLinkText(String(e.message || e));
      return new CardIconActionObject({
        className: "card border m-2 shadow",
        link: "/users/101",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Link text)"
        },
        body: {
          className: "card-body d-flex align-items-center",
          name: "Parse error"
        },
        icon: { iconClass: "fa-solid fa-triangle-exclamation" },
        iconClass:
          "col-4 rounded-circle bg-danger text-white mb-0 d-flex align-items-center justify-content-center",
        textClass: "col-8",
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
      return new CardIconActionObject(JSON.parse(jsonLinkIconText));
    } catch (e) {
      setErrLinkIconText(String(e.message || e));
      return new CardIconActionObject({
        className: "card border m-2 shadow",
        link: "/users/101",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Link icon+text)"
        },
        body: {
          className: "card-body d-flex align-items-center",
          name: "Parse error"
        },
        icon: { iconClass: "fa-solid fa-triangle-exclamation" },
        iconClass:
          "col-4 rounded-circle bg-danger text-white mb-0 d-flex align-items-center justify-content-center",
        textClass: "col-8",
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
      return new CardIconActionObject(JSON.parse(jsonLinkIcon));
    } catch (e) {
      setErrLinkIcon(String(e.message || e));
      return new CardIconActionObject({
        className: "card border m-2 shadow",
        link: "/users/101",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Link icon only)"
        },
        body: {
          className: "card-body d-flex align-items-center",
          name: "Parse error"
        },
        icon: { iconClass: "fa-solid fa-triangle-exclamation" },
        iconClass:
          "col-4 rounded-circle bg-danger text-white mb-0 d-flex align-items-center justify-content-center",
        textClass: "col-8",
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

  /* ---------------- tab bindings (active tab drives UI panes) ---------------- */
  const tabBindings = {
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
        setEmitBtnText("// click an action to see payload");
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
        setEmitBtnIconText("// click an action to see payload");
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
        setEmitBtnIcon("// click an action to see payload");
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
        setEmitLinkText("// click an action to see payload");
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
        setEmitLinkIconText("// click an action to see payload");
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
        setEmitLinkIcon("// click an action to see payload");
        setErrLinkIcon("");
      }
    }
  }[active];

  /* ---------------- footer action click -> capture payload for that tab ---------------- */
  function handleOutput(payload) {
    const formatted = JSON.stringify(payload, null, 2);
    tabBindings.setOutputJson(formatted);
  }

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
              <code>{TAG_SNIPPET}</code>
            </pre>
          </div>
        </div>

        {/* Preview */}
        <div className="row mb-4 justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <AlloyCardIconAction
              cardIconAction={tabBindings.model}
              output={handleOutput}
            />
            <div className="small text-secondary mt-2 text-center text-lg-start">
              <div className="mb-1">
                <strong>Navigation behavior:</strong>{" "}
                <code>link</code> is optional.
                If it exists (like <code>"/users/101"</code> in these demos),
                ONLY the <code>body</code> row (the icon + text block) becomes
                clickable via React Router <code>&lt;Link/&gt;</code>.
              </div>
              <div className="mb-1">
                The header, footer, and the footer action bar are never part of
                that link. Footer actions still work and still fire{" "}
                <code>output()</code>.
              </div>
              <div className="text-muted">
                Remove or clear <code>link</code> to make the body non-clickable.
              </div>
            </div>
          </div>
        </div>

        {/* Input JSON + Output payload side by side */}
        <div className="row g-3 align-items-stretch justify-content-center mb-5">
          {/* Left pane: JSON editor */}
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
                  <code>iconClass</code> usually includes{" "}
                  <code>d-flex align-items-center justify-content-center</code>{" "}
                  so the avatar bubble is centered.
                </li>
                <li>
                  <code>textClass</code> is the right column wrapper that
                  renders your <code>fields[]</code> lines.
                </li>
                <li>
                  <code>footer</code> always renders. The left side shows{" "}
                  <code>footer.name</code>; the right side renders either{" "}
                  <code>AlloyButtonBar</code> or <code>AlloyLinkBar</code>{" "}
                  depending on <code>type</code>.
                </li>
                <li>
                  Clicking any footer button/link emits an{" "}
                  <code>output(payload)</code> with
                  <code>action</code> details and the card id.
                </li>
              </ul>
            </div>
          </div>

          {/* Right pane: emitted output */}
          <div className="col-12 col-lg-6">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-semibold">
                Output (from action click)
              </span>
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
              This payload is what you'll use to route,
              open dialogs, or call APIs. You’ll usually key off{" "}
              <code>action.id</code>, <code>action.name</code>, or{" "}
              <code>action.href</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
