// demo/pages/tissue/CardActionPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyCardAction, CardActionObject } from "../../../src";

/* ------------------------------------------------------------------
   CardActionObject layout (uses BlockObject for all content blocks):

   - cardAction.id, .className
   - layout: "single" (default) | "split"
   - leftColClass, rightColClass (for split layout)

   - header: BlockObject (optional)
   - body:   BlockObject (container styling)

   - leftFields: BlockObject[] (for split layout - left column)
   - fields: BlockObject[] (REQUIRED, at least one)

   - footer: BlockObject (optional)

   - type: "AlloyButtonBar" | "AlloyLinkBar"
   - action: ButtonBarObject | LinkBarObject (REQUIRED)

   BlockObject field types (priority order):
     1. media      → AlloyMedia
     2. logo       → <img>
     3. icon       → AlloyIcon
     4. tags       → vertical badge stack
     5. quantity   → AlloyQuantity
     6. buttonIcon → AlloyButtonIcon
     7. linkIcon   → AlloyLinkIcon
     8. name       → plain text
------------------------------------------------------------------- */

/* 1) ButtonBar - text buttons */
const DEFAULT_BTN_TEXT = JSON.stringify(
  {
    id: "cardBtnText01",
    className: "card border m-2 shadow",

    header: {
      id: "cardBtnTextHeader",
      className: "card-header py-2 fw-semibold",
      name: "User Actions (Buttons - Text)"
    },

    body: {
      id: "cardBtnTextBody",
      className: "card-body",
      ariaLabel: "User card"
    },

    fields: [
      {
        id: "userName",
        colClass: "col-12",
        className: "fw-semibold mb-1",
        name: "Ada Lovelace"
      },
      {
        id: "role",
        colClass: "col-12",
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

    header: {
      id: "cardBtnIconTextHeader",
      className: "card-header py-2 fw-semibold",
      name: "Project Actions (Buttons - Icon+Text)"
    },

    body: {
      id: "cardBtnIconTextBody",
      className: "card-body",
      ariaLabel: "Project card"
    },

    fields: [
      {
        id: "projIcon",
        colClass: "col-auto",
        className: "d-flex align-items-center justify-content-center",
        icon: { iconClass: "fa-solid fa-diagram-project" }
      },
      {
        id: "projTitle",
        colClass: "col",
        className: "fw-semibold",
        name: "Compiler Migration"
      },
      {
        id: "status",
        colClass: "col-12",
        className: "text-muted small mt-1",
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

    header: {
      id: "cardBtnIconOnlyHeader",
      className: "card-header py-2 fw-semibold",
      name: "Server Actions (Buttons - Icon Only)"
    },

    body: {
      id: "cardBtnIconOnlyBody",
      className: "card-body",
      ariaLabel: "Server card"
    },

    fields: [
      {
        id: "serverName",
        colClass: "col-12",
        className: "fw-semibold mb-1",
        name: "prod-api-01"
      },
      {
        id: "meta",
        colClass: "col-12",
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

/* 4) Tags stack inside fields[] */
const DEFAULT_TAGS_STACK = JSON.stringify(
  {
    id: "cardTagsStack01",
    className: "card border m-2 shadow",

    header: {
      id: "cardTagsHeader",
      className: "card-header py-2 fw-semibold",
      name: "Product Card (Tags Stack)"
    },

    body: {
      id: "cardTagsBody",
      className: "card-body",
      ariaLabel: "Product card"
    },

    fields: [
      {
        id: "prodImg",
        colClass: "col-4",
        className: "d-flex align-items-start",
        logo: {
          imageUrl:
            "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
          alt: "Alloymobile",
          className: "img-fluid rounded"
        }
      },
      {
        id: "prodMeta",
        colClass: "col-8",
        className: "d-flex flex-column",
        name: "Alloymobile · Design system · Updated",
        tags: [
          { id: "t1", name: "Alloymobile", className: "fw-semibold" },
          { id: "t2", name: "Design system components", className: "text-muted small" },
          { id: "t3", name: "Image left • stacked tags right", className: "text-muted small" }
        ]
      }
    ],

    footer: {
      id: "cardTagsFooter",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
      name: "Product actions"
    },

    type: "AlloyButtonBar",
    action: {
      type: "AlloyButtonIcon",
      className: "nav gap-2",
      buttonClass: "nav-item",
      barName: { show: false },
      buttons: [
        {
          id: "viewBtn",
          name: "View",
          className:
            "btn btn-sm btn-outline-secondary d-flex align-items-center gap-1",
          icon: { iconClass: "fa-regular fa-eye" }
        },
        {
          id: "saveBtn",
          ariaLabel: "Save",
          title: "Save",
          className: "btn btn-sm btn-outline-primary",
          icon: { iconClass: "fa-regular fa-bookmark" }
        }
      ]
    }
  },
  null,
  2
);

/* 5) NEW - Split Layout with Media */
const DEFAULT_SPLIT_MEDIA = JSON.stringify(
  {
    id: "cardSplitMedia01",
    className: "card border m-2 shadow",
    layout: "split",
    leftColClass: "col-12 col-sm-5",
    rightColClass: "col-12 col-sm-7",

    header: {
      id: "cardSplitMediaHeader",
      className: "card-header py-2 fw-semibold",
      name: "Product Card (Split + Media)"
    },

    body: {
      id: "cardSplitMediaBody",
      className: "card-body",
      ariaLabel: "Product card with media gallery"
    },

    leftFields: [
      {
        id: "productMedia",
        colClass: "col-12",
        media: {
          name: "Product Gallery",
          thumbSize: 56,
          items: [
            {
              id: "img-1",
              url: "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
              isPrimary: true
            },
            {
              id: "img-2",
              url: "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png"
            }
          ]
        }
      }
    ],

    fields: [
      {
        id: "prodTitle",
        colClass: "col-12",
        className: "fw-bold fs-5",
        name: "Premium Widget Pro"
      },
      {
        id: "prodTags",
        colClass: "col-12",
        tags: [
          { id: "tag-new", name: "New Arrival", className: "badge bg-success me-1" },
          { id: "tag-sale", name: "20% Off", className: "badge bg-danger" }
        ]
      },
      {
        id: "prodPrice",
        colClass: "col-12",
        className: "fs-4 text-primary fw-bold mt-2",
        name: "$149.99"
      }
    ],

    footer: {
      id: "cardSplitMediaFooter",
      className: "card-footer d-flex align-items-center gap-2 py-2",
      name: "In Stock"
    },

    type: "AlloyButtonBar",
    action: {
      type: "AlloyButtonIcon",
      className: "nav gap-2",
      buttons: [
        {
          id: "addCart",
          name: "Add to Cart",
          className: "btn btn-sm btn-primary d-flex align-items-center gap-1",
          icon: { iconClass: "fa-solid fa-cart-plus" }
        }
      ]
    }
  },
  null,
  2
);

/* 6) NEW - Quantity Field */
const DEFAULT_QUANTITY = JSON.stringify(
  {
    id: "cardQuantity01",
    className: "card border m-2 shadow",
    layout: "split",
    leftColClass: "col-4",
    rightColClass: "col-8",

    header: {
      id: "cardQuantityHeader",
      className: "card-header py-2 fw-semibold",
      name: "Cart Item (Quantity Field)"
    },

    body: {
      id: "cardQuantityBody",
      className: "card-body",
      ariaLabel: "Cart item with quantity"
    },

    leftFields: [
      {
        id: "itemImage",
        colClass: "col-12",
        logo: {
          imageUrl: "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
          alt: "Product",
          className: "img-fluid rounded"
        }
      }
    ],

    fields: [
      {
        id: "itemName",
        colClass: "col-12",
        className: "fw-semibold",
        name: "Widget Basic Edition"
      },
      {
        id: "itemPrice",
        colClass: "col-12",
        className: "text-primary fw-bold",
        name: "$29.99"
      },
      {
        id: "itemQty",
        colClass: "col-12",
        quantity: {
          name: "quantity",
          label: "",
          value: 2,
          min: 1,
          max: 10,
          step: 1,
          showRange: false
        }
      }
    ],

    footer: {
      id: "cardQuantityFooter",
      className: "card-footer d-flex align-items-center gap-2 py-2",
      name: "Subtotal: $59.98"
    },

    type: "AlloyButtonBar",
    action: {
      type: "AlloyButtonIcon",
      className: "nav gap-2",
      buttons: [
        {
          id: "updateBtn",
          name: "Update",
          className: "btn btn-sm btn-outline-primary",
          icon: { iconClass: "fa-solid fa-check" }
        },
        {
          id: "removeBtn",
          ariaLabel: "Remove",
          title: "Remove",
          className: "btn btn-sm btn-outline-danger",
          icon: { iconClass: "fa-solid fa-trash" }
        }
      ]
    }
  },
  null,
  2
);

/* 7) NEW - ButtonIcon Fields */
const DEFAULT_BUTTON_ICON = JSON.stringify(
  {
    id: "cardButtonIcon01",
    className: "card border m-2 shadow",

    header: {
      id: "cardButtonIconHeader",
      className: "card-header py-2 fw-semibold",
      name: "Quick Actions (ButtonIcon Fields)"
    },

    body: {
      id: "cardButtonIconBody",
      className: "card-body",
      ariaLabel: "Card with buttonIcon fields"
    },

    fields: [
      {
        id: "docTitle",
        colClass: "col",
        className: "fw-semibold",
        name: "Annual Report 2024.pdf"
      },
      {
        id: "btnFavorite",
        colClass: "col-auto",
        buttonIcon: {
          icon: { iconClass: "fa-regular fa-heart" },
          className: "btn btn-outline-danger btn-sm",
          ariaLabel: "Add to favorites",
          name: "favorite"
        }
      },
      {
        id: "btnShare",
        colClass: "col-auto",
        buttonIcon: {
          icon: { iconClass: "fa-solid fa-share-nodes" },
          className: "btn btn-outline-secondary btn-sm",
          ariaLabel: "Share",
          name: "share"
        }
      },
      {
        id: "btnDownload",
        colClass: "col-auto",
        buttonIcon: {
          icon: { iconClass: "fa-solid fa-download" },
          className: "btn btn-outline-primary btn-sm",
          ariaLabel: "Download",
          name: "download"
        }
      }
    ],

    footer: {
      id: "cardButtonIconFooter",
      className: "card-footer d-flex align-items-center gap-2 py-2",
      name: "Last modified: Jan 5, 2026"
    },

    type: "AlloyButtonBar",
    action: {
      type: "AlloyButton",
      className: "nav gap-2",
      buttons: [
        {
          id: "openBtn",
          name: "Open",
          className: "btn btn-sm btn-primary"
        }
      ]
    }
  },
  null,
  2
);

/* 8) NEW - LinkIcon Fields */
const DEFAULT_LINK_ICON = JSON.stringify(
  {
    id: "cardLinkIcon01",
    className: "card border m-2 shadow",

    header: {
      id: "cardLinkIconHeader",
      className: "card-header py-2 fw-semibold",
      name: "Navigation Links (LinkIcon Fields)"
    },

    body: {
      id: "cardLinkIconBody",
      className: "card-body",
      ariaLabel: "Card with linkIcon fields"
    },

    fields: [
      {
        id: "itemTitle",
        colClass: "col",
        className: "fw-semibold",
        name: "Project Dashboard"
      },
      {
        id: "linkView",
        colClass: "col-auto",
        linkIcon: {
          to: "/projects/123",
          icon: { iconClass: "fa-solid fa-eye" },
          className: "btn btn-outline-secondary btn-sm",
          ariaLabel: "View project"
        }
      },
      {
        id: "linkEdit",
        colClass: "col-auto",
        linkIcon: {
          to: "/projects/123/edit",
          icon: { iconClass: "fa-solid fa-pen" },
          className: "btn btn-outline-primary btn-sm",
          ariaLabel: "Edit project"
        }
      },
      {
        id: "linkExternal",
        colClass: "col-auto",
        linkIcon: {
          to: "https://example.com",
          icon: { iconClass: "fa-solid fa-external-link-alt" },
          className: "btn btn-outline-dark btn-sm",
          ariaLabel: "Open external",
          target: "_blank"
        }
      },
      {
        id: "description",
        colClass: "col-12",
        className: "text-muted small mt-2",
        name: "LinkIcon fields render as navigation links with icons. Use for internal routing or external URLs."
      }
    ],

    footer: {
      id: "cardLinkIconFooter",
      className: "card-footer d-flex align-items-center gap-2 py-2",
      name: "Status: Active"
    },

    type: "AlloyLinkBar",
    action: {
      type: "AlloyLinkIcon",
      className: "nav gap-2",
      links: [
        {
          id: "settingsLink",
          name: "Settings",
          href: "/projects/123/settings",
          className: "btn btn-sm btn-outline-secondary d-flex align-items-center gap-1",
          icon: { iconClass: "fa-solid fa-cog" }
        }
      ]
    }
  },
  null,
  2
);

/* ---------------------- Tag snippet ---------------------- */
const TAG_SNIPPET = `<AlloyCardAction cardAction={new CardActionObject(cardActionObject)} output={handleOutput} />`;

export default function CardActionPage() {
  const TABS = [
    { key: "BtnText", label: "Button (text)" },
    { key: "BtnIconText", label: "Button (icon+text)" },
    { key: "BtnIcon", label: "Button (icon)" },
    { key: "Tags", label: "Tags" },
    { key: "SplitMedia", label: "Split + Media" },
    { key: "Quantity", label: "Quantity" },
    { key: "ButtonIcon", label: "ButtonIcon" },
    { key: "LinkIcon", label: "LinkIcon" }
  ];

  const [active, setActive] = useState("BtnText");

  // JSON per tab
  const [jsonBtnText, setJsonBtnText] = useState(DEFAULT_BTN_TEXT);
  const [jsonBtnIconText, setJsonBtnIconText] = useState(DEFAULT_BTN_ICON_TEXT);
  const [jsonBtnIcon, setJsonBtnIcon] = useState(DEFAULT_BTN_ICON_ONLY);
  const [jsonTags, setJsonTags] = useState(DEFAULT_TAGS_STACK);
  const [jsonSplitMedia, setJsonSplitMedia] = useState(DEFAULT_SPLIT_MEDIA);
  const [jsonQuantity, setJsonQuantity] = useState(DEFAULT_QUANTITY);
  const [jsonButtonIcon, setJsonButtonIcon] = useState(DEFAULT_BUTTON_ICON);
  const [jsonLinkIcon, setJsonLinkIcon] = useState(DEFAULT_LINK_ICON);

  // parse errors
  const [errBtnText, setErrBtnText] = useState("");
  const [errBtnIconText, setErrBtnIconText] = useState("");
  const [errBtnIcon, setErrBtnIcon] = useState("");
  const [errTags, setErrTags] = useState("");
  const [errSplitMedia, setErrSplitMedia] = useState("");
  const [errQuantity, setErrQuantity] = useState("");
  const [errButtonIcon, setErrButtonIcon] = useState("");
  const [errLinkIcon, setErrLinkIcon] = useState("");

  // Output per tab
  const defaultOutputMsg =
    '// click a footer action or interactive field to see OutputObject:\n' +
    '// {\n' +
    '//   id: "<card-id>",\n' +
    '//   type: "card-action",\n' +
    '//   action: "<name | ariaLabel | title | id>",\n' +
    '//   error: false,\n' +
    '//   data: { "<field.id>": "<value>", ... }\n' +
    '// }';

  const [emitBtnText, setEmitBtnText] = useState(defaultOutputMsg);
  const [emitBtnIconText, setEmitBtnIconText] = useState(defaultOutputMsg);
  const [emitBtnIcon, setEmitBtnIcon] = useState(defaultOutputMsg);
  const [emitTags, setEmitTags] = useState(defaultOutputMsg);
  const [emitSplitMedia, setEmitSplitMedia] = useState(defaultOutputMsg);
  const [emitQuantity, setEmitQuantity] = useState(defaultOutputMsg);
  const [emitButtonIcon, setEmitButtonIcon] = useState(defaultOutputMsg);
  const [emitLinkIcon, setEmitLinkIcon] = useState(defaultOutputMsg);

  /* ---------------- Fallback card for errors ---------------- */
  function makeFallbackCard(tabName) {
    return new CardActionObject({
      className: "card border m-2 shadow",
      header: {
        className: "card-header py-2 fw-semibold text-danger",
        name: `Invalid JSON (${tabName})`
      },
      body: { className: "card-body" },
      fields: [{ className: "text-danger", name: "Fix JSON to preview", colClass: "col-12" }],
      footer: { className: "card-footer py-2" },
      type: "AlloyButtonBar",
      action: { className: "nav gap-2", buttons: [] }
    });
  }

  /* ---------------- model builders ---------------- */

  const modelBtnText = useMemo(() => {
    try {
      setErrBtnText("");
      return new CardActionObject(JSON.parse(jsonBtnText));
    } catch (e) {
      setErrBtnText(String(e.message || e));
      return makeFallbackCard("Button text");
    }
  }, [jsonBtnText]);

  const modelBtnIconText = useMemo(() => {
    try {
      setErrBtnIconText("");
      return new CardActionObject(JSON.parse(jsonBtnIconText));
    } catch (e) {
      setErrBtnIconText(String(e.message || e));
      return makeFallbackCard("Button icon+text");
    }
  }, [jsonBtnIconText]);

  const modelBtnIcon = useMemo(() => {
    try {
      setErrBtnIcon("");
      return new CardActionObject(JSON.parse(jsonBtnIcon));
    } catch (e) {
      setErrBtnIcon(String(e.message || e));
      return makeFallbackCard("Button icon");
    }
  }, [jsonBtnIcon]);

  const modelTags = useMemo(() => {
    try {
      setErrTags("");
      return new CardActionObject(JSON.parse(jsonTags));
    } catch (e) {
      setErrTags(String(e.message || e));
      return makeFallbackCard("Tags");
    }
  }, [jsonTags]);

  const modelSplitMedia = useMemo(() => {
    try {
      setErrSplitMedia("");
      return new CardActionObject(JSON.parse(jsonSplitMedia));
    } catch (e) {
      setErrSplitMedia(String(e.message || e));
      return makeFallbackCard("Split + Media");
    }
  }, [jsonSplitMedia]);

  const modelQuantity = useMemo(() => {
    try {
      setErrQuantity("");
      return new CardActionObject(JSON.parse(jsonQuantity));
    } catch (e) {
      setErrQuantity(String(e.message || e));
      return makeFallbackCard("Quantity");
    }
  }, [jsonQuantity]);

  const modelButtonIcon = useMemo(() => {
    try {
      setErrButtonIcon("");
      return new CardActionObject(JSON.parse(jsonButtonIcon));
    } catch (e) {
      setErrButtonIcon(String(e.message || e));
      return makeFallbackCard("ButtonIcon");
    }
  }, [jsonButtonIcon]);

  const modelLinkIcon = useMemo(() => {
    try {
      setErrLinkIcon("");
      return new CardActionObject(JSON.parse(jsonLinkIcon));
    } catch (e) {
      setErrLinkIcon(String(e.message || e));
      return makeFallbackCard("LinkIcon");
    }
  }, [jsonLinkIcon]);

  /* ---------------- active tab bindings ---------------- */

  const tabBindings = {
    BtnText: {
      label: "Button (text)",
      model: modelBtnText,
      inputJson: jsonBtnText,
      setInputJson: setJsonBtnText,
      parseError: errBtnText,
      outputJson: emitBtnText,
      setOutputJson: setEmitBtnText,
      resetJson: () => { setJsonBtnText(DEFAULT_BTN_TEXT); setEmitBtnText(defaultOutputMsg); setErrBtnText(""); }
    },
    BtnIconText: {
      label: "Button (icon+text)",
      model: modelBtnIconText,
      inputJson: jsonBtnIconText,
      setInputJson: setJsonBtnIconText,
      parseError: errBtnIconText,
      outputJson: emitBtnIconText,
      setOutputJson: setEmitBtnIconText,
      resetJson: () => { setJsonBtnIconText(DEFAULT_BTN_ICON_TEXT); setEmitBtnIconText(defaultOutputMsg); setErrBtnIconText(""); }
    },
    BtnIcon: {
      label: "Button (icon)",
      model: modelBtnIcon,
      inputJson: jsonBtnIcon,
      setInputJson: setJsonBtnIcon,
      parseError: errBtnIcon,
      outputJson: emitBtnIcon,
      setOutputJson: setEmitBtnIcon,
      resetJson: () => { setJsonBtnIcon(DEFAULT_BTN_ICON_ONLY); setEmitBtnIcon(defaultOutputMsg); setErrBtnIcon(""); }
    },
    Tags: {
      label: "Tags",
      model: modelTags,
      inputJson: jsonTags,
      setInputJson: setJsonTags,
      parseError: errTags,
      outputJson: emitTags,
      setOutputJson: setEmitTags,
      resetJson: () => { setJsonTags(DEFAULT_TAGS_STACK); setEmitTags(defaultOutputMsg); setErrTags(""); }
    },
    SplitMedia: {
      label: "Split + Media",
      model: modelSplitMedia,
      inputJson: jsonSplitMedia,
      setInputJson: setJsonSplitMedia,
      parseError: errSplitMedia,
      outputJson: emitSplitMedia,
      setOutputJson: setEmitSplitMedia,
      resetJson: () => { setJsonSplitMedia(DEFAULT_SPLIT_MEDIA); setEmitSplitMedia(defaultOutputMsg); setErrSplitMedia(""); }
    },
    Quantity: {
      label: "Quantity",
      model: modelQuantity,
      inputJson: jsonQuantity,
      setInputJson: setJsonQuantity,
      parseError: errQuantity,
      outputJson: emitQuantity,
      setOutputJson: setEmitQuantity,
      resetJson: () => { setJsonQuantity(DEFAULT_QUANTITY); setEmitQuantity(defaultOutputMsg); setErrQuantity(""); }
    },
    ButtonIcon: {
      label: "ButtonIcon",
      model: modelButtonIcon,
      inputJson: jsonButtonIcon,
      setInputJson: setJsonButtonIcon,
      parseError: errButtonIcon,
      outputJson: emitButtonIcon,
      setOutputJson: setEmitButtonIcon,
      resetJson: () => { setJsonButtonIcon(DEFAULT_BUTTON_ICON); setEmitButtonIcon(defaultOutputMsg); setErrButtonIcon(""); }
    },
    LinkIcon: {
      label: "LinkIcon",
      model: modelLinkIcon,
      inputJson: jsonLinkIcon,
      setInputJson: setJsonLinkIcon,
      parseError: errLinkIcon,
      outputJson: emitLinkIcon,
      setOutputJson: setEmitLinkIcon,
      resetJson: () => { setJsonLinkIcon(DEFAULT_LINK_ICON); setEmitLinkIcon(defaultOutputMsg); setErrLinkIcon(""); }
    }
  }[active] || {};

  /* ---------------- handleOutput ---------------- */

  function handleOutput(out) {
    const payload = out && typeof out.toJSON === "function" ? out.toJSON() : out;
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
              <AlloyCardAction cardAction={tabBindings.model} output={handleOutput} />
            )}
            <div className="small text-secondary mt-2 text-center text-lg-start">
              <div className="mb-1">
                <strong>Layout:</strong> <code>layout: "single"</code> (default) or <code>"split"</code> with <code>leftFields</code> + <code>fields</code>.
              </div>
              <div className="mb-1">
                <strong>Field types:</strong> media, logo, icon, tags, quantity, buttonIcon, linkIcon, text.
              </div>
              <div className="text-muted">
                Interactive fields (quantity, buttonIcon) emit output. LinkIcon navigates.
              </div>
            </div>
          </div>
        </div>

        {/* Input JSON + Output payload */}
        <div className="row g-3 align-items-stretch justify-content-center mb-5">
          <div className="col-12 col-lg-6">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-semibold">Input JSON — {tabBindings.label}</span>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={tabBindings.resetJson}>
                Reset
              </button>
            </div>

            <textarea
              className={`form-control font-monospace ${tabBindings.parseError ? "is-invalid" : ""}`}
              rows={18}
              value={tabBindings.inputJson}
              onChange={(e) => tabBindings.setInputJson(e.target.value)}
              spellCheck={false}
            />
            {tabBindings.parseError && (
              <div className="invalid-feedback d-block mt-1">{tabBindings.parseError}</div>
            )}

            <div className="form-text">
              <ul className="mb-0 ps-3">
                <li><code>layout</code>: "single" (default) | "split"</li>
                <li><code>leftFields</code>: fields for left column (split layout)</li>
                <li><code>fields</code>: main fields (required, at least 1)</li>
                <li>Field types: media, logo, icon, tags, quantity, buttonIcon, linkIcon, text</li>
              </ul>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-semibold">Output (from interactions)</span>
              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => tabBindings.setOutputJson(defaultOutputMsg)}>
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
              <code>OutputObject</code> actions:
              <ul className="mb-0 ps-3">
                <li>Footer button/link click → action name</li>
                <li>Quantity change → <code>"quantity-change"</code></li>
                <li>ButtonIcon click → button name</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}