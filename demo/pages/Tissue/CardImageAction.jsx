// demo/pages/tissue/CardImageActionPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyCardImageAction, CardImageActionObject } from "../../../src";

/* ------------------------------------------------------------------
   Default presets for each variant.

   NOTE:
   - Every preset includes `link: "/product/123"`.
   - `link` is OPTIONAL. If you remove it or set it to "", the body
     will no longer be clickable.
   - Only the BODY becomes clickable when link is provided.
     Header, footer, and the footer action bar are never wrapped in <Link/>.

   Shape pieces:
   - body (required)
   - fields[] (right column text lines)
   - logo / logoClass / textClass (2-col layout in body)
   - footer (required; left text label)
   - type ("AlloyButtonBar" | "AlloyLinkBar")
   - action (buttons[] or links[] depending on type)
------------------------------------------------------------------- */

/* 1) ButtonBar - text only */
const DEFAULT_BTN_TEXT = JSON.stringify(
  {
    id: "cardImageBtnText01",
    className: "card border m-2 shadow",
    link: "/product/123",

    header: {
      id: "cardImageBtnTextHeader",
      className: "card-header py-2 fw-semibold",
      name: "Product Actions (Buttons - Text)"
    },

    body: {
      id: "cardImageBtnTextBody",
      className: "card-body d-flex align-items-center",
      name: "Alloy Mobile Suite"
    },

    logo: {
      imageUrl:
        "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
      alt: "Alloymobile",
      width: "72px",
      height: "auto"
    },
    logoClass:
      "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0",
    textClass: "col-8",

    fields: [
      {
        id: "prodDesc",
        className: "text-muted small",
        name: "Cross-platform UI kit"
      },
      {
        id: "prodPrice",
        className: "text-success fw-semibold",
        name: "$49 / month"
      }
    ],

    footer: {
      id: "cardImageBtnTextFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Purchase & details"
    },

    type: "AlloyButtonBar",
    action: {
      // text-only buttons
      type: "AlloyButton",
      className: "nav gap-2 p-2 border-top justify-content-end flex-row",
      buttonClass: "nav-item",
      barName: { show: false },
      buttons: [
        {
          id: "buyBtn",
          name: "Buy",
          className: "btn btn-sm btn-outline-primary"
        },
        {
          id: "detailsBtn",
          name: "Details",
          className: "btn btn-sm btn-outline-secondary"
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
    id: "cardImageBtnIconText01",
    className: "card border m-2 shadow",
    link: "/product/123",

    header: {
      id: "cardImageBtnIconTextHeader",
      className: "card-header py-2 fw-semibold",
      name: "Product Actions (Buttons - Icon+Text)"
    },

    body: {
      id: "cardImageBtnIconTextBody",
      className: "card-body d-flex align-items-center",
      name: "Alloy Analytics"
    },

    logo: {
      imageUrl:
        "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
      alt: "Alloymobile",
      width: "72px",
      height: "auto"
    },
    logoClass:
      "col-4 d-flex align-items-center justify-content-center bg-warning bg-opacity-10 rounded mb-0",
    textClass: "col-8",

    fields: [
      {
        id: "prodDesc",
        className: "text-muted small",
        name: "Insights & dashboards"
      },
      {
        id: "prodPrice",
        className: "text-success fw-semibold",
        name: "$99 / month"
      }
    ],

    footer: {
      id: "cardImageBtnIconTextFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Next steps"
    },

    type: "AlloyButtonBar",
    action: {
      // icon+text buttons
      type: "AlloyButtonIcon",
      className: "nav gap-2 p-2 border-top justify-content-end flex-row",
      buttonClass: "nav-item",
      barName: { show: false },
      buttons: [
        {
          id: "buyBtn",
          name: "Buy",
          className:
            "btn btn-sm btn-outline-primary d-flex align-items-center gap-1",
          icon: { iconClass: "fa-solid fa-cart-shopping" }
        },
        {
          id: "learnBtn",
          name: "Learn",
          className:
            "btn btn-sm btn-outline-secondary d-flex align-items-center gap-1",
          icon: { iconClass: "fa-regular fa-circle-question" }
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
    id: "cardImageBtnIconOnly01",
    className: "card border m-2 shadow",
    link: "/product/123",

    header: {
      id: "cardImageBtnIconOnlyHeader",
      className: "card-header py-2 fw-semibold",
      name: "Product Actions (Buttons - Icon Only)"
    },

    body: {
      id: "cardImageBtnIconOnlyBody",
      className: "card-body d-flex align-items-center",
      name: "Alloy Secure"
    },

    logo: {
      imageUrl:
        "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
      alt: "Alloymobile",
      width: "72px",
      height: "auto"
    },
    logoClass:
      "col-4 d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded mb-0",
    textClass: "col-8",

    fields: [
      {
        id: "prodDesc",
        className: "text-muted small",
        name: "Access control & audit trail"
      },
      {
        id: "prodCompliance",
        className: "text-info small",
        name: "SOC2 Ready"
      }
    ],

    footer: {
      id: "cardImageBtnIconOnlyFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Admin tools"
    },

    type: "AlloyButtonBar",
    action: {
      // icon-only buttons (no visible text, ariaLabel/title instead)
      type: "AlloyButtonIcon",
      className: "nav gap-2 p-2 border-top justify-content-end flex-row",
      buttonClass: "nav-item",
      barName: { show: false },
      buttons: [
        {
          id: "buyBtn",
          ariaLabel: "Buy",
          className: "btn btn-sm btn-outline-primary",
          icon: { iconClass: "fa-solid fa-cart-shopping" }
        },
        {
          id: "infoBtn",
          ariaLabel: "Info",
          className: "btn btn-sm btn-outline-secondary",
          icon: { iconClass: "fa-regular fa-circle-question" }
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
    id: "cardImageLinkText01",
    className: "card border m-2 shadow",
    link: "/product/123",

    header: {
      id: "cardImageLinkTextHeader",
      className: "card-header py-2 fw-semibold",
      name: "Resources (Links - Text)"
    },

    body: {
      id: "cardImageLinkTextBody",
      className: "card-body d-flex align-items-center",
      name: "Alloy Docs"
    },

    logo: {
      imageUrl:
        "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
      alt: "Alloymobile",
      width: "72px",
      height: "auto"
    },
    logoClass:
      "col-4 d-flex align-items-center justify-content-center bg-light rounded mb-0",
    textClass: "col-8",

    fields: [
      {
        id: "desc",
        className: "text-muted small",
        name: "Developer resources & API surface"
      }
    ],

    footer: {
      id: "cardImageLinkTextFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Help and Support"
    },

    type: "AlloyLinkBar",
    action: {
      // plain text links
      type: "AlloyLink",
      className: "nav gap-2 p-2 border-top justify-content-end flex-row",
      linkClass: "nav-item",
      barName: { show: false },
      links: [
        {
          id: "docs",
          name: "Docs",
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
    id: "cardImageLinkIconText01",
    className: "card border m-2 shadow",
    link: "/product/123",

    header: {
      id: "cardImageLinkIconTextHeader",
      className: "card-header py-2 fw-semibold",
      name: "Resources (Links - Icon+Text)"
    },

    body: {
      id: "cardImageLinkIconTextBody",
      className: "card-body d-flex align-items-center",
      name: "Support Center"
    },

    logo: {
      imageUrl:
        "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
      alt: "Alloymobile",
      width: "72px",
      height: "auto"
    },
    logoClass:
      "col-4 d-flex align-items-center justify-content-center bg-warning bg-opacity-10 rounded mb-0",
    textClass: "col-8",

    fields: [
      {
        id: "desc",
        className: "text-muted small",
        name: "Guides, help, and chat"
      }
    ],

    footer: {
      id: "cardImageLinkIconTextFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Get help"
    },

    type: "AlloyLinkBar",
    action: {
      // links with icon + label
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

/* 6) LinkBar - icon only */
const DEFAULT_LINK_ICON_ONLY = JSON.stringify(
  {
    id: "cardImageLinkIconOnly01",
    className: "card border m-2 shadow",
    link: "/product/123",

    header: {
      id: "cardImageLinkIconOnlyHeader",
      className: "card-header py-2 fw-semibold",
      name: "Resources (Links - Icon Only)"
    },

    body: {
      id: "cardImageLinkIconOnlyBody",
      className: "card-body d-flex align-items-center",
      name: "Quick Access"
    },

    logo: {
      imageUrl:
        "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
      alt: "Alloymobile",
      width: "72px",
      height: "auto"
    },
    logoClass:
      "col-4 d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded mb-0",
    textClass: "col-8",

    fields: [
      {
        id: "desc",
        className: "text-muted small",
        name: "Shortcuts"
      }
    ],

    footer: {
      id: "cardImageLinkIconOnlyFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Shortcuts"
    },

    type: "AlloyLinkBar",
    action: {
      // icon links only (ariaLabel/title handles a11y)
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

/* Tag snippet (display only) */
const TAG_SNIPPET = `<AlloyCardImageAction cardImageAction={new CardImageActionObject(cardImageActionObject)} output={handleOutput} />`;

export default function CardImageActionPage() {
  const TABS = [
    { key: "BtnText", label: "Button (text)" },
    { key: "BtnIconText", label: "Button (icon+text)" },
    { key: "BtnIcon", label: "Button (icon only)" },
    { key: "LinkText", label: "Link (text)" },
    { key: "LinkIconText", label: "Link (icon+text)" },
    { key: "LinkIcon", label: "Link (icon only)" }
  ];

  const [active, setActive] = useState("BtnText");

  // tab-local editable JSON, parse error, and emitted payload
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

  /* hydrate each tab's JSON into CardImageActionObject,
     falling back to a safe preview model if parse blows up */
  const modelBtnText = useMemo(() => {
    try {
      setErrBtnText("");
      return new CardImageActionObject(JSON.parse(jsonBtnText));
    } catch (e) {
      setErrBtnText(String(e.message || e));
      return new CardImageActionObject({
        className: "card border m-2 shadow",
        link: "/product/123",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Button text)"
        },
        body: {
          className: "card-body d-flex align-items-center",
          name: "Parse error"
        },
        logo: {
          imageUrl:
            "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
          alt: "Alloymobile",
          width: "72px",
          height: "auto"
        },
        logoClass:
          "col-4 d-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded mb-0",
        textClass: "col-8",
        fields: [
          {
            className: "text-danger",
            name: "Fix the JSON to continue."
          }
        ],
        footer: {
          className:
            "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
          name: "Purchase & details"
        },
        type: "AlloyButtonBar",
        action: {
          type: "AlloyButton",
          className: "nav gap-2 p-2 border-top justify-content-end flex-row",
          buttons: []
        }
      });
    }
  }, [jsonBtnText]);

  const modelBtnIconText = useMemo(() => {
    try {
      setErrBtnIconText("");
      return new CardImageActionObject(JSON.parse(jsonBtnIconText));
    } catch (e) {
      setErrBtnIconText(String(e.message || e));
      return new CardImageActionObject({
        className: "card border m-2 shadow",
        link: "/product/123",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Button icon+text)"
        },
        body: {
          className: "card-body d-flex align-items-center",
          name: "Parse error"
        },
        logo: {
          imageUrl:
            "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
          alt: "Alloymobile",
          width: "72px",
          height: "auto"
        },
        logoClass:
          "col-4 d-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded mb-0",
        textClass: "col-8",
        fields: [
          {
            className: "text-danger",
            name: "Fix the JSON to continue."
          }
        ],
        footer: {
          className:
            "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
          name: "Next steps"
        },
        type: "AlloyButtonBar",
        action: {
          type: "AlloyButtonIcon",
          className: "nav gap-2 p-2 border-top justify-content-end flex-row",
          buttons: []
        }
      });
    }
  }, [jsonBtnIconText]);

  const modelBtnIcon = useMemo(() => {
    try {
      setErrBtnIcon("");
      return new CardImageActionObject(JSON.parse(jsonBtnIcon));
    } catch (e) {
      setErrBtnIcon(String(e.message || e));
      return new CardImageActionObject({
        className: "card border m-2 shadow",
        link: "/product/123",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Button icon only)"
        },
        body: {
          className: "card-body d-flex align-items-center",
          name: "Parse error"
        },
        logo: {
          imageUrl:
            "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
          alt: "Alloymobile",
          width: "72px",
          height: "auto"
        },
        logoClass:
          "col-4 d-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded mb-0",
        textClass: "col-8",
        fields: [
          {
            className: "text-danger",
            name: "Fix the JSON to continue."
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
          className: "nav gap-2 p-2 border-top justify-content-end flex-row",
          buttons: []
        }
      });
    }
  }, [jsonBtnIcon]);

  const modelLinkText = useMemo(() => {
    try {
      setErrLinkText("");
      return new CardImageActionObject(JSON.parse(jsonLinkText));
    } catch (e) {
      setErrLinkText(String(e.message || e));
      return new CardImageActionObject({
        className: "card border m-2 shadow",
        link: "/product/123",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Link text)"
        },
        body: {
          className: "card-body d-flex align-items-center",
          name: "Parse error"
        },
        logo: {
          imageUrl:
            "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
          alt: "Alloymobile",
          width: "72px",
          height: "auto"
        },
        logoClass:
          "col-4 d-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded mb-0",
        textClass: "col-8",
        fields: [
          {
            className: "text-danger",
            name: "Fix the JSON to continue."
          }
        ],
        footer: {
          className:
            "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
          name: "Help and Support"
        },
        type: "AlloyLinkBar",
        action: {
          type: "AlloyLink",
          className: "nav gap-2 p-2 border-top justify-content-end flex-row",
          links: []
        }
      });
    }
  }, [jsonLinkText]);

  const modelLinkIconText = useMemo(() => {
    try {
      setErrLinkIconText("");
      return new CardImageActionObject(JSON.parse(jsonLinkIconText));
    } catch (e) {
      setErrLinkIconText(String(e.message || e));
      return new CardImageActionObject({
        className: "card border m-2 shadow",
        link: "/product/123",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Link icon+text)"
        },
        body: {
          className: "card-body d-flex align-items-center",
          name: "Parse error"
        },
        logo: {
          imageUrl:
            "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
          alt: "Alloymobile",
          width: "72px",
          height: "auto"
        },
        logoClass:
          "col-4 d-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded mb-0",
        textClass: "col-8",
        fields: [
          {
            className: "text-danger",
            name: "Fix the JSON to continue."
          }
        ],
        footer: {
          className:
            "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
          name: "Get help"
        },
        type: "AlloyLinkBar",
        action: {
          type: "AlloyLinkIcon",
          className: "nav gap-2 p-2 border-top justify-content-end flex-row",
          links: []
        }
      });
    }
  }, [jsonLinkIconText]);

  const modelLinkIcon = useMemo(() => {
    try {
      setErrLinkIcon("");
      return new CardImageActionObject(JSON.parse(jsonLinkIcon));
    } catch (e) {
      setErrLinkIcon(String(e.message || e));
      return new CardImageActionObject({
        className: "card border m-2 shadow",
        link: "/product/123",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON (Link icon only)"
        },
        body: {
          className: "card-body d-flex align-items-center",
          name: "Parse error"
        },
        logo: {
          imageUrl:
            "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
          alt: "Alloymobile",
          width: "72px",
          height: "auto"
        },
        logoClass:
          "col-4 d-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded mb-0",
        textClass: "col-8",
        fields: [
          {
            className: "text-danger",
            name: "Fix the JSON to continue."
          }
        ],
        footer: {
          className:
            "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
          name: "Shortcuts"
        },
        type: "AlloyLinkBar",
        action: {
          type: "AlloyLinkIcon",
          className: "nav gap-2 p-2 border-top justify-content-end flex-row",
          links: []
        }
      });
    }
  }, [jsonLinkIcon]);

  /* click from footer action bar -> write JSON payload to the active tab's output box */
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

  /* active tab bindings (mirrors AlloyCardActionPage style) */
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
        <h3 className="mb-3 text-center">AlloyCardImageAction</h3>

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
              <code>
                {`<AlloyCardImageAction cardImageAction={new CardImageActionObject(cardImageActionObject)} output={handleOutput} />`}
              </code>
            </pre>
          </div>
        </div>

        {/* Preview */}
        <div className="row mb-4 justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <AlloyCardImageAction
              cardImageAction={tabBindings.model}
              output={(payload) => handleOutput(active, payload)}
            />
            <div className="small text-secondary mt-2 text-center text-lg-start">
              <div className="mb-1">
                <strong>Layout:</strong> Body row = product logo (left) + text
                lines (right). Footer row = left label text from{" "}
                <code>footer.name</code> and right-side CTA bar.
              </div>
              <div className="mb-1">
                <strong>CTA bar:</strong>{" "}
                <code>type</code> switches between{" "}
                <code>AlloyButtonBar</code> (buttons[] /{" "}
                <code>AlloyButton</code> / <code>AlloyButtonIcon</code>) and{" "}
                <code>AlloyLinkBar</code> (links[] /{" "}
                <code>AlloyLink</code> / <code>AlloyLinkIcon</code>).
              </div>
              <div className="mb-1">
                <strong>Navigation behavior:</strong>{" "}
                <code>link</code> is optional. If it exists (like{" "}
                <code>"/product/123"</code> in all these demos),
                ONLY the <code>body</code> section becomes clickable via React
                Router <code>&lt;Link/&gt;</code>. Header, footer, and footer
                actions never become part of that link.
              </div>
              <div className="text-muted">
                Clicking a footer action button/link will emit a payload into
                the Output panel on the right.
              </div>
            </div>
          </div>
        </div>

        {/* Editable JSON + Output side-by-side */}
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
              <ul className="mb-0 ps-3">
                <li>
                  <code>link</code> (string) is <strong>optional</strong>. If
                  provided, ONLY the <code>body</code> becomes clickable.
                </li>
                <li>
                  <code>logo</code> holds the image URL/alt/size.{" "}
                  <code>logoClass</code> styles the left bubble/column.{" "}
                  <code>textClass</code> styles the right column.
                </li>
                <li>
                  <code>footer</code> always renders. Its{" "}
                  <code>name</code> shows on the left; its CTA bar renders on
                  the right based on <code>type</code>.
                </li>
                <li>
                  The CTA bar items fire <code>output(payload)</code> so you can
                  route, open dialogs, or start checkout.
                </li>
              </ul>
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
              This JSON is the payload AlloyCardImageAction emitted for the
              clicked footer action. You’ll typically branch on{" "}
              <code>action.id</code> or <code>action.name</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
