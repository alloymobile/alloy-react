// demo/pages/tissue/CardDemo.jsx
import React, { useMemo, useState } from "react";
import { AlloyCard, CardObject } from "../../../src";

/* ---------------------- Base demo card objects ---------------------- */

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
    className: "card-body p-3",
    name: "Text-only body"
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

/** 2) Card with icon + text (using separate fields) */
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
    className: "card-body p-3",
    name: "Icon and text blocks"
  },

  fields: [
    // Row 1: icon in a small column + title in remaining width
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

    // Row 2: description text
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
    className: "card-body p-3",
    name: "Logo and descriptive text"
  },

  fields: [
    // Row 1: full-width logo/image
    {
      id: "img-logo",
      colClass: "col-12",
      className: "mb-2",
      logo: {
        imageUrl:
          "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
        alt: "Alloymobile logo",
        className: "img-fluid d-block w-100 h-auto object-fit-contain rounded"
      }
    },
    // Row 2: title
    {
      id: "img-title",
      colClass: "col-12",
      className: "fw-semibold fs-5 mb-1",
      name: "Alloymobile"
    },
    // Row 3: description
    {
      id: "img-desc",
      colClass: "col-12",
      className: "small text-secondary",
      name: "This card demonstrates how a field with a LogoObject is rendered as a responsive, non-bleeding image above supporting text."
    }
  ],

  footer: {
    id: "demoImageTextFooter",
    className: "card-footer text-muted small",
    name: "Logo fields use LogoObject under the hood."
  }
};

/* pretty-print defaults */
const DEFAULT_TEXT_ONLY_JSON = JSON.stringify(CARD_TEXT_ONLY, null, 2);
const DEFAULT_ICON_TEXT_JSON = JSON.stringify(CARD_ICON_TEXT, null, 2);
const DEFAULT_IMAGE_TEXT_JSON = JSON.stringify(CARD_IMAGE_TEXT, null, 2);

/* code snippet for docs */
const TAG_SNIPPET = `<AlloyCard card={new CardObject(cardObject)} />`;

export default function CardPage() {
  // which tab are we looking at: "text" | "icontext" | "imagetext"
  const [activeTab, setActiveTab] = useState("text");

  // each tab has its own editable JSON text
  const [jsonText, setJsonText] = useState(DEFAULT_TEXT_ONLY_JSON);
  const [jsonIconText, setJsonIconText] = useState(DEFAULT_ICON_TEXT_JSON);
  const [jsonImageText, setJsonImageText] =
    useState(DEFAULT_IMAGE_TEXT_JSON);

  // each tab tracks its own parse error
  const [errorText, setErrorText] = useState("");
  const [errorIconText, setErrorIconText] = useState("");
  const [errorImageText, setErrorImageText] = useState("");

  // choose which JSON string + error is active right now
  const activeJson =
    activeTab === "icontext"
      ? jsonIconText
      : activeTab === "imagetext"
      ? jsonImageText
      : jsonText;

  const activeError =
    activeTab === "icontext"
      ? errorIconText
      : activeTab === "imagetext"
      ? errorImageText
      : errorText;

  // parse the active JSON to build preview model
  const previewModel = useMemo(() => {
    let rawText = jsonText;
    if (activeTab === "icontext") rawText = jsonIconText;
    if (activeTab === "imagetext") rawText = jsonImageText;

    try {
      const raw = JSON.parse(rawText);

      // clear the appropriate error bucket
      if (activeTab === "icontext") {
        setErrorIconText("");
      } else if (activeTab === "imagetext") {
        setErrorImageText("");
      } else {
        setErrorText("");
      }

      return new CardObject(raw);
    } catch (e) {
      const msg = String(e.message || e);

      if (activeTab === "icontext") {
        setErrorIconText(msg);
      } else if (activeTab === "imagetext") {
        setErrorImageText(msg);
      } else {
        setErrorText(msg);
      }

      // fallback model so preview doesn't completely die
      return new CardObject({
        className: "card border m-2 shadow",
        link: "",
        header: {
          className: "card-header bg-danger text-white",
          name: "Error"
        },
        body: {
          className: "card-body p-3",
          name: "Invalid JSON"
        },
        fields: [
          {
            className: "text-danger",
            colClass: "col-12",
            name: "Could not parse input JSON."
          }
        ],
        footer: {
          className: "card-footer text-muted small",
          name: "Fix the JSON on the right and the preview will update."
        }
      });
    }
  }, [activeTab, jsonText, jsonIconText, jsonImageText]);

  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  function handleTextareaChange(e) {
    const next = e.target.value;
    if (activeTab === "icontext") {
      setJsonIconText(next);
    } else if (activeTab === "imagetext") {
      setJsonImageText(next);
    } else {
      setJsonText(next);
    }
  }

  function handleResetCurrent() {
    if (activeTab === "icontext") {
      setJsonIconText(DEFAULT_ICON_TEXT_JSON);
      setErrorIconText("");
    } else if (activeTab === "imagetext") {
      setJsonImageText(DEFAULT_IMAGE_TEXT_JSON);
      setErrorImageText("");
    } else {
      setJsonText(DEFAULT_TEXT_ONLY_JSON);
      setErrorText("");
    }
  }

  function headerTitle() {
    if (activeTab === "icontext") return "Icon + Text Card";
    if (activeTab === "imagetext") return "Image + Text Card";
    return "Text-only Card";
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyCard</h3>

      {/* Row 1 — Tag sample */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{TAG_SNIPPET}</code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Tabs + Preview */}
      <div className="row mb-4">
        <div className="col-12 col-lg-6">
          {/* Tabs */}
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button
                className={
                  "nav-link " + (activeTab === "text" ? "active" : "")
                }
                onClick={() => handleTabClick("text")}
                type="button"
              >
                Text Only
              </button>
            </li>

            <li className="nav-item">
              <button
                className={
                  "nav-link " + (activeTab === "icontext" ? "active" : "")
                }
                onClick={() => handleTabClick("icontext")}
                type="button"
              >
                Icon + Text
              </button>
            </li>

            <li className="nav-item">
              <button
                className={
                  "nav-link " + (activeTab === "imagetext" ? "active" : "")
                }
                onClick={() => handleTabClick("imagetext")}
                type="button"
              >
                Image + Text
              </button>
            </li>
          </ul>

          {/* Preview card */}
          <AlloyCard card={previewModel} />

          {/* Helper text */}
          <div className="small text-secondary mt-2">
            <div className="mb-1">
              <strong>Layout model:</strong> <code>header</code> (optional),{" "}
              <code>body</code> (required), <code>fields</code> (required, at
              least one), and <code>footer</code> (optional).
            </div>

            <div className="mb-1">
              <code>fields</code> is an ordered array of{" "}
              <strong>blocks</strong> (BlockObject) rendered inside the{" "}
              <code>body</code> as a Bootstrap grid using{" "}
              <code>colClass</code>.
            </div>

            <div className="mb-1">
              Each field can render as:
              <ul className="ps-3 mb-0">
                <li>
                  <strong>Text</strong> — when <code>name</code> is present.
                </li>
                <li>
                  <strong>Icon</strong> — when <code>icon</code> /{" "}
                  <code>iconClass</code> is present (renders{" "}
                  <code>&lt;AlloyIcon/&gt;</code>).
                </li>
                <li>
                  <strong>Logo / Image</strong> — when <code>logo</code> is
                  present (renders a responsive image).
                </li>
              </ul>
            </div>

            <div className="mb-1">
              If <code>link</code> is provided on the card, only{" "}
              <code>body</code> becomes a clickable React Router{" "}
              <code>&lt;Link/&gt;</code>. Header and footer never become links.
            </div>
          </div>
        </div>
      </div>

      {/* Row 3 — Tab-specific editable JSON */}
      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              {headerTitle()} — Input JSON (editable)
            </span>

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={handleResetCurrent}
            >
              Reset This Tab
            </button>
          </div>

          <textarea
            className={`form-control font-monospace ${
              activeError ? "is-invalid" : ""
            }`}
            rows={18}
            value={activeJson}
            onChange={handleTextareaChange}
            spellCheck={false}
          />

          {activeError && (
            <div className="invalid-feedback d-block mt-1">
              {activeError}
            </div>
          )}

          <div className="form-text">
            <ul className="mb-0 ps-3">
              <li>
                <code>body</code> is required. We wrap plain objects into
                the internal <code>BlockObject</code> and default missing
                classes to <code>"card-body"</code>.
              </li>

              <li>
                <code>header</code> and <code>footer</code> are optional.
                If present, we default their classes to{" "}
                <code>"card-header"</code> / <code>"card-footer"</code>{" "}
                unless you override.
              </li>

              <li>
                <code>fields</code> is an ordered array of blocks rendered
                inside <code>body</code> in a Bootstrap{" "}
                <code>.row</code>. Each field may specify{" "}
                <code>colClass</code> (e.g. <code>"col-12"</code>,{" "}
                <code>"col-auto"</code>, <code>"col-md-6"</code>).
              </li>

              <li className="mt-2">
                Content rules:
                <ul className="ps-3 mb-0">
                  <li>
                    If a field has <code>logo</code> → it renders only the
                    logo.
                  </li>
                  <li>
                    Else if it has <code>icon</code> /{" "}
                    <code>iconClass</code> → it renders only the icon via{" "}
                    <code>&lt;AlloyIcon/&gt;</code>.
                  </li>
                  <li>
                    Else if it has <code>name</code> → it renders text.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
