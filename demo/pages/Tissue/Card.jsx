// demo/pages/tissue/CardDemo.jsx
import React, { useMemo, useState } from "react";
import { AlloyCard, CardObject } from "../../../src";

/* ------------------------------------------------------------------
   CardObject layout (uses BlockObject for all content blocks):

   - card.id, .className
   - layout: "single" (default) | "split"
   - leftColClass, rightColClass (for split layout)

   - header: BlockObject (optional)
   - body:   BlockObject (container styling)

   - leftFields: BlockObject[] (for split layout - left column)
   - fields: BlockObject[] (REQUIRED, at least one)

   - footer: BlockObject (optional)

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

/** 1) Simple text-only card */
const CARD_TEXT_ONLY = {
  id: "demoTextCard01",
  className: "card border m-2 shadow",

  header: {
    id: "demoTextHeader",
    className: "card-header fw-semibold",
    name: "Simple Text Card"
  },

  body: {
    id: "demoTextBody",
    className: "card-body p-3"
  },

  fields: [
    {
      id: "txt-title",
      colClass: "col-12",
      className: "fw-semibold fs-5 mb-1",
      name: "Ada Lovelace"
    },
    {
      id: "txt-role",
      colClass: "col-12",
      className: "text-muted mb-1",
      name: "Pioneer of computing"
    },
    {
      id: "txt-note",
      colClass: "col-12",
      className: "small text-secondary",
      name: "This card demonstrates a simple layout with only text fields."
    }
  ],

  footer: {
    id: "demoTextFooter",
    className: "card-footer text-muted small",
    name: "Footer (optional) — text only"
  }
};

/** 2) Card with icon + text */
const CARD_ICON_TEXT = {
  id: "demoIconTextCard01",
  className: "card border m-2 shadow",

  header: {
    id: "demoIconTextHeader",
    className: "card-header fw-semibold",
    name: "Icon + Text Card"
  },

  body: {
    id: "demoIconTextBody",
    className: "card-body p-3"
  },

  fields: [
    {
      id: "icon-user",
      colClass: "col-auto d-flex align-items-center",
      className: "me-2",
      iconClass: "fa-solid fa-user"
    },
    {
      id: "icon-title",
      colClass: "col",
      className: "fw-semibold fs-5 mb-1",
      name: "User Profile"
    },
    {
      id: "icon-desc",
      colClass: "col-12",
      className: "small text-secondary mb-1",
      name: "This card shows how to combine an icon field and a text field in the same row using Bootstrap grid classes."
    }
  ],

  footer: {
    id: "demoIconTextFooter",
    className: "card-footer text-muted small",
    name: "Icon and text are separate fields."
  }
};

/** 3) Card with image (logo) + text */
const CARD_IMAGE_TEXT = {
  id: "demoImageTextCard01",
  className: "card border m-2 shadow",

  header: {
    id: "demoImageTextHeader",
    className: "card-header fw-semibold",
    name: "Image + Text Card"
  },

  body: {
    id: "demoImageTextBody",
    className: "card-body p-3"
  },

  fields: [
    {
      id: "img-logo",
      colClass: "col-12",
      className: "mb-2",
      logo: {
        imageUrl: "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
        alt: "Alloymobile logo",
        className: "img-fluid d-block w-100 h-auto object-fit-contain rounded"
      }
    },
    {
      id: "img-title",
      colClass: "col-12",
      className: "fw-semibold fs-5 mb-1",
      name: "Alloymobile"
    },
    {
      id: "img-desc",
      colClass: "col-12",
      className: "small text-secondary",
      name: "This card demonstrates how a field with a LogoObject is rendered as a responsive image above supporting text."
    }
  ],

  footer: {
    id: "demoImageTextFooter",
    className: "card-footer text-muted small",
    name: "Logo fields use LogoObject under the hood."
  }
};

/** 4) Card with Tags stack */
const CARD_TAGS_STACK = {
  id: "demoTagsCard01",
  className: "card border m-2 shadow",

  header: {
    id: "demoTagsHeader",
    className: "card-header fw-semibold",
    name: "Tags Stack Card"
  },

  body: {
    id: "demoTagsBody",
    className: "card-body p-3"
  },

  fields: [
    {
      id: "tags-img",
      colClass: "col-4",
      className: "d-flex align-items-start",
      logo: {
        imageUrl: "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
        alt: "Alloymobile logo",
        className: "img-fluid rounded"
      }
    },
    {
      id: "tags-lines",
      colClass: "col-8",
      className: "d-flex flex-column",
      tags: [
        { id: "tags-title", name: "Alloymobile", className: "fw-semibold" },
        { id: "tags-sub", name: "Design system components", className: "text-secondary small" },
        { id: "tags-meta", name: "Image left • 3 lines right (tags stack)", className: "text-secondary small" }
      ]
    }
  ],

  footer: {
    id: "demoTagsFooter",
    className: "card-footer text-muted small",
    name: "Fields can render `tags` (TagObject[]) as a vertical stack."
  }
};

/** 5) NEW - Split Layout with Media */
const CARD_SPLIT_MEDIA = {
  id: "demoSplitMediaCard01",
  className: "card border m-2 shadow",
  layout: "split",
  leftColClass: "col-12 col-sm-5",
  rightColClass: "col-12 col-sm-7",

  header: {
    id: "demoSplitMediaHeader",
    className: "card-header fw-semibold",
    name: "Split Layout + Media"
  },

  body: {
    id: "demoSplitMediaBody",
    className: "card-body p-3"
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
      id: "prodDesc",
      colClass: "col-12",
      className: "text-muted small",
      name: "Split layout places leftFields in left column and fields in right column."
    },
    {
      id: "prodTags",
      colClass: "col-12",
      tags: [
        { id: "tag-new", name: "New", className: "badge bg-success me-1" },
        { id: "tag-featured", name: "Featured", className: "badge bg-primary" }
      ]
    }
  ],

  footer: {
    id: "demoSplitMediaFooter",
    className: "card-footer text-muted small",
    name: "layout: 'split' with leftFields containing media"
  }
};

/** 6) NEW - Quantity Field */
const CARD_QUANTITY = {
  id: "demoQuantityCard01",
  className: "card border m-2 shadow",
  layout: "split",
  leftColClass: "col-4",
  rightColClass: "col-8",

  header: {
    id: "demoQuantityHeader",
    className: "card-header fw-semibold",
    name: "Quantity Field"
  },

  body: {
    id: "demoQuantityBody",
    className: "card-body p-3"
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
      className: "text-primary fw-bold mb-2",
      name: "$29.99"
    },
    {
      id: "itemQty",
      colClass: "col-12",
      quantity: {
        name: "quantity",
        label: "",
        value: 1,
        min: 1,
        max: 10,
        step: 1,
        showRange: false
      }
    }
  ],

  footer: {
    id: "demoQuantityFooter",
    className: "card-footer text-muted small",
    name: "Quantity field with AlloyQuantity component"
  }
};

/** 7) NEW - ButtonIcon Fields */
const CARD_BUTTON_ICON = {
  id: "demoButtonIconCard01",
  className: "card border m-2 shadow",

  header: {
    id: "demoButtonIconHeader",
    className: "card-header fw-semibold",
    name: "ButtonIcon Fields"
  },

  body: {
    id: "demoButtonIconBody",
    className: "card-body p-3"
  },

  fields: [
    {
      id: "docIcon",
      colClass: "col-auto",
      icon: { iconClass: "fa-solid fa-file-pdf fa-2x text-danger" }
    },
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
        ariaLabel: "Favorite",
        name: "favorite"
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
    },
    {
      id: "btnDesc",
      colClass: "col-12",
      className: "text-muted small mt-2",
      name: "ButtonIcon fields trigger actions via output callback."
    }
  ],

  footer: {
    id: "demoButtonIconFooter",
    className: "card-footer text-muted small",
    name: "Interactive buttonIcon fields in card body"
  }
};

/** 8) NEW - LinkIcon Fields */
const CARD_LINK_ICON = {
  id: "demoLinkIconCard01",
  className: "card border m-2 shadow",

  header: {
    id: "demoLinkIconHeader",
    className: "card-header fw-semibold",
    name: "LinkIcon Fields"
  },

  body: {
    id: "demoLinkIconBody",
    className: "card-body p-3"
  },

  fields: [
    {
      id: "projIcon",
      colClass: "col-auto",
      icon: { iconClass: "fa-solid fa-folder fa-2x text-warning" }
    },
    {
      id: "projTitle",
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
        ariaLabel: "View"
      }
    },
    {
      id: "linkEdit",
      colClass: "col-auto",
      linkIcon: {
        to: "/projects/123/edit",
        icon: { iconClass: "fa-solid fa-pen" },
        className: "btn btn-outline-primary btn-sm",
        ariaLabel: "Edit"
      }
    },
    {
      id: "linkExternal",
      colClass: "col-auto",
      linkIcon: {
        to: "https://example.com",
        icon: { iconClass: "fa-solid fa-external-link-alt" },
        className: "btn btn-outline-dark btn-sm",
        ariaLabel: "External",
        target: "_blank"
      }
    },
    {
      id: "linkDesc",
      colClass: "col-12",
      className: "text-muted small mt-2",
      name: "LinkIcon fields navigate to URLs. Use for routing or external links."
    }
  ],

  footer: {
    id: "demoLinkIconFooter",
    className: "card-footer text-muted small",
    name: "Navigation via linkIcon fields (no output callback)"
  }
};

/* pretty-print defaults */
const DEFAULT_TEXT_ONLY_JSON = JSON.stringify(CARD_TEXT_ONLY, null, 2);
const DEFAULT_ICON_TEXT_JSON = JSON.stringify(CARD_ICON_TEXT, null, 2);
const DEFAULT_IMAGE_TEXT_JSON = JSON.stringify(CARD_IMAGE_TEXT, null, 2);
const DEFAULT_TAGS_STACK_JSON = JSON.stringify(CARD_TAGS_STACK, null, 2);
const DEFAULT_SPLIT_MEDIA_JSON = JSON.stringify(CARD_SPLIT_MEDIA, null, 2);
const DEFAULT_QUANTITY_JSON = JSON.stringify(CARD_QUANTITY, null, 2);
const DEFAULT_BUTTON_ICON_JSON = JSON.stringify(CARD_BUTTON_ICON, null, 2);
const DEFAULT_LINK_ICON_JSON = JSON.stringify(CARD_LINK_ICON, null, 2);

/* code snippet */
const TAG_SNIPPET = `<AlloyCard card={new CardObject(cardObject)} output={handleOutput} />`;

export default function CardPage() {
  const TABS = [
    { key: "text", label: "Text Only" },
    { key: "icontext", label: "Icon + Text" },
    { key: "imagetext", label: "Image + Text" },
    { key: "tags", label: "Tags" },
    { key: "splitmedia", label: "Split + Media" },
    { key: "quantity", label: "Quantity" },
    { key: "buttonicon", label: "ButtonIcon" },
    { key: "linkicon", label: "LinkIcon" }
  ];

  const [activeTab, setActiveTab] = useState("text");

  // JSON per tab
  const [jsonText, setJsonText] = useState(DEFAULT_TEXT_ONLY_JSON);
  const [jsonIconText, setJsonIconText] = useState(DEFAULT_ICON_TEXT_JSON);
  const [jsonImageText, setJsonImageText] = useState(DEFAULT_IMAGE_TEXT_JSON);
  const [jsonTags, setJsonTags] = useState(DEFAULT_TAGS_STACK_JSON);
  const [jsonSplitMedia, setJsonSplitMedia] = useState(DEFAULT_SPLIT_MEDIA_JSON);
  const [jsonQuantity, setJsonQuantity] = useState(DEFAULT_QUANTITY_JSON);
  const [jsonButtonIcon, setJsonButtonIcon] = useState(DEFAULT_BUTTON_ICON_JSON);
  const [jsonLinkIcon, setJsonLinkIcon] = useState(DEFAULT_LINK_ICON_JSON);

  // errors per tab
  const [errorText, setErrorText] = useState("");
  const [errorIconText, setErrorIconText] = useState("");
  const [errorImageText, setErrorImageText] = useState("");
  const [errorTags, setErrorTags] = useState("");
  const [errorSplitMedia, setErrorSplitMedia] = useState("");
  const [errorQuantity, setErrorQuantity] = useState("");
  const [errorButtonIcon, setErrorButtonIcon] = useState("");
  const [errorLinkIcon, setErrorLinkIcon] = useState("");

  // output per tab
  const defaultOutputMsg = '// Click interactive fields to see output';
  const [outputText, setOutputText] = useState(defaultOutputMsg);
  const [outputIconText, setOutputIconText] = useState(defaultOutputMsg);
  const [outputImageText, setOutputImageText] = useState(defaultOutputMsg);
  const [outputTags, setOutputTags] = useState(defaultOutputMsg);
  const [outputSplitMedia, setOutputSplitMedia] = useState(defaultOutputMsg);
  const [outputQuantity, setOutputQuantity] = useState(defaultOutputMsg);
  const [outputButtonIcon, setOutputButtonIcon] = useState(defaultOutputMsg);
  const [outputLinkIcon, setOutputLinkIcon] = useState(defaultOutputMsg);

  /* Fallback card for errors */
  function makeFallbackCard() {
    return new CardObject({
      className: "card border m-2 shadow",
      header: { className: "card-header bg-danger text-white", name: "Error" },
      body: { className: "card-body p-3" },
      fields: [{ className: "text-danger", colClass: "col-12", name: "Could not parse input JSON." }],
      footer: { className: "card-footer text-muted small", name: "Fix the JSON to preview." }
    });
  }

  /* Tab bindings */
  const tabConfig = {
    text: {
      json: jsonText, setJson: setJsonText, error: errorText, setError: setErrorText,
      output: outputText, setOutput: setOutputText, defaultJson: DEFAULT_TEXT_ONLY_JSON, label: "Text Only"
    },
    icontext: {
      json: jsonIconText, setJson: setJsonIconText, error: errorIconText, setError: setErrorIconText,
      output: outputIconText, setOutput: setOutputIconText, defaultJson: DEFAULT_ICON_TEXT_JSON, label: "Icon + Text"
    },
    imagetext: {
      json: jsonImageText, setJson: setJsonImageText, error: errorImageText, setError: setErrorImageText,
      output: outputImageText, setOutput: setOutputImageText, defaultJson: DEFAULT_IMAGE_TEXT_JSON, label: "Image + Text"
    },
    tags: {
      json: jsonTags, setJson: setJsonTags, error: errorTags, setError: setErrorTags,
      output: outputTags, setOutput: setOutputTags, defaultJson: DEFAULT_TAGS_STACK_JSON, label: "Tags"
    },
    splitmedia: {
      json: jsonSplitMedia, setJson: setJsonSplitMedia, error: errorSplitMedia, setError: setErrorSplitMedia,
      output: outputSplitMedia, setOutput: setOutputSplitMedia, defaultJson: DEFAULT_SPLIT_MEDIA_JSON, label: "Split + Media"
    },
    quantity: {
      json: jsonQuantity, setJson: setJsonQuantity, error: errorQuantity, setError: setErrorQuantity,
      output: outputQuantity, setOutput: setOutputQuantity, defaultJson: DEFAULT_QUANTITY_JSON, label: "Quantity"
    },
    buttonicon: {
      json: jsonButtonIcon, setJson: setJsonButtonIcon, error: errorButtonIcon, setError: setErrorButtonIcon,
      output: outputButtonIcon, setOutput: setOutputButtonIcon, defaultJson: DEFAULT_BUTTON_ICON_JSON, label: "ButtonIcon"
    },
    linkicon: {
      json: jsonLinkIcon, setJson: setJsonLinkIcon, error: errorLinkIcon, setError: setErrorLinkIcon,
      output: outputLinkIcon, setOutput: setOutputLinkIcon, defaultJson: DEFAULT_LINK_ICON_JSON, label: "LinkIcon"
    }
  };

  const currentTab = tabConfig[activeTab];

  /* Parse model */
  const previewModel = useMemo(() => {
    try {
      currentTab.setError("");
      return new CardObject(JSON.parse(currentTab.json));
    } catch (e) {
      currentTab.setError(String(e.message || e));
      return makeFallbackCard();
    }
  }, [activeTab, currentTab.json]);

  /* Handlers */
  function handleOutput(out) {
    const payload = out && typeof out.toJSON === "function" ? out.toJSON() : out;
    currentTab.setOutput(JSON.stringify(payload, null, 2));
  }

  function handleReset() {
    currentTab.setJson(currentTab.defaultJson);
    currentTab.setError("");
    currentTab.setOutput(defaultOutputMsg);
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyCard</h3>

      {/* Tag snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{TAG_SNIPPET}</code>
          </pre>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs flex-wrap justify-content-center mb-3">
        {TABS.map(({ key, label }) => (
          <li className="nav-item" key={key}>
            <button
              className={`nav-link ${activeTab === key ? "active" : ""}`}
              onClick={() => setActiveTab(key)}
              type="button"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* Preview + Output */}
      <div className="row mb-4">
        <div className="col-12 col-lg-6 mb-3 mb-lg-0">
          <AlloyCard card={previewModel} output={handleOutput} />

          <div className="small text-secondary mt-2">
            <div className="mb-1">
              <strong>Layout:</strong> <code>layout: "single"</code> (default) or <code>"split"</code>
            </div>
            <div className="mb-1">
              <strong>Field types:</strong> media, logo, icon, tags, quantity, buttonIcon, linkIcon, text
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Output</span>
            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => currentTab.setOutput(defaultOutputMsg)}>
              Clear
            </button>
          </div>
          <textarea
            className="form-control font-monospace bg-light border"
            rows={8}
            value={currentTab.output}
            readOnly
            spellCheck={false}
          />
        </div>
      </div>

      {/* JSON Editor */}
      <div className="row g-3">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">{currentTab.label} — Input JSON</span>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>

          <textarea
            className={`form-control font-monospace ${currentTab.error ? "is-invalid" : ""}`}
            rows={18}
            value={currentTab.json}
            onChange={(e) => currentTab.setJson(e.target.value)}
            spellCheck={false}
          />

          {currentTab.error && (
            <div className="invalid-feedback d-block mt-1">{currentTab.error}</div>
          )}

          <div className="form-text">
            <ul className="mb-0 ps-3">
              <li><code>layout</code>: "single" (default) | "split"</li>
              <li><code>leftFields</code>: left column fields (split layout)</li>
              <li><code>fields</code>: main fields (required)</li>
              <li>Field types (priority): media → logo → icon → tags → quantity → buttonIcon → linkIcon → text</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}