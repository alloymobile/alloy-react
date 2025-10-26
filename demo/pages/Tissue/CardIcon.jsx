// demo/pages/tissue/CardIconPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyCardIcon, CardIconObject } from "../../../src";

/*
Two-tab demo:
- Tab 1: Without Link  => link: ""
- Tab 2: With Link     => link: "/users/101"

IMPORTANT BEHAVIOR:
- link is OPTIONAL.
- When link is non-empty, ONLY the card body becomes clickable
  (header and footer are NOT wrapped in <Link/>).
- AlloyCardIcon requires `icon`.
*/

/* ---------- base objects for both tabs ---------- */

// shared base content
const BASE_ICON_CARD = {
  id: "userCardIcon01",
  className: "card border m-2 shadow",

  header: {
    className: "card-header py-2 fw-semibold",
    name: "Account"
  },

  body: {
    className: "card-body py-3",
    name: "User Card With Icon"
  },

  // left / right layout inside body
  icon: {
    // will hydrate to IconObject({ iconClass: "..." })
    iconClass: "fa-solid fa-user fa-2xl text-warning"
  },

  // NOTE: align-items-center to vertically center the icon
  iconClass:
    "col-3 d-flex align-items-center justify-content-center text-warning fs-2",
  textClass: "col-9",

  // text rows on the right side
  fields: [
    {
      className: "fw-semibold mb-1",
      name: "Ada Lovelace"
    },
    {
      className: "text-muted mb-1",
      name: "Role: Admin"
    },
    {
      className: "small text-secondary",
      name: "Joined: 2023-12-01"
    }
  ],

  footer: {
    className: "card-footer small text-muted py-2",
    name: "Last login: 2 hours ago"
  }
};

// Variant A: no link
const DEFAULT_NO_LINK_JSON = JSON.stringify(
  {
    ...BASE_ICON_CARD,
    link: "" // no navigation; body is just static
  },
  null,
  2
);

// Variant B: with link
const DEFAULT_WITH_LINK_JSON = JSON.stringify(
  {
    ...BASE_ICON_CARD,
    link: "/users/101" // body becomes clickable
  },
  null,
  2
);

// snippet for docs
const TAG_SNIPPET = `<AlloyCardIcon cardIcon={new CardIconObject(cardIconObject)} />`;

export default function CardIconPage() {
  // active tab: "nolink" | "withlink"
  const [activeTab, setActiveTab] = useState("nolink");

  // editable JSON per tab
  const [jsonNoLink, setJsonNoLink] = useState(DEFAULT_NO_LINK_JSON);
  const [jsonWithLink, setJsonWithLink] = useState(DEFAULT_WITH_LINK_JSON);

  // parse error per tab
  const [errNoLink, setErrNoLink] = useState("");
  const [errWithLink, setErrWithLink] = useState("");

  // pick active buffers
  const activeJson = activeTab === "withlink" ? jsonWithLink : jsonNoLink;
  const activeErr = activeTab === "withlink" ? errWithLink : errNoLink;

  // parse active JSON into preview model
  const previewModel = useMemo(() => {
    const rawText = activeTab === "withlink" ? jsonWithLink : jsonNoLink;
    try {
      const parsed = JSON.parse(rawText);
      // clear this tab's error
      if (activeTab === "withlink") {
        setErrWithLink("");
      } else {
        setErrNoLink("");
      }
      return new CardIconObject(parsed);
    } catch (e) {
      const msg = String(e.message || e);
      if (activeTab === "withlink") {
        setErrWithLink(msg);
      } else {
        setErrNoLink(msg);
      }

      // fallback so preview doesn't blank out
      return new CardIconObject({
        className: "card border m-2 shadow",
        link: "",
        header: {
          className: "card-header py-2 fw-semibold text-danger",
          name: "Invalid JSON"
        },
        body: {
          className: "card-body py-3",
          name: "Unable to render"
        },
        icon: { iconClass: "fa-solid fa-circle-exclamation text-danger" },
        // keep icon vertically centered in fallback too
        iconClass:
          "col-3 d-flex align-items-center justify-content-center text-danger fs-2",
        textClass: "col-9",
        fields: [
          {
            className: "text-danger",
            name: "Could not parse input JSON."
          }
        ],
        footer: {
          className: "card-footer small text-muted py-2",
          name: "Fix the JSON to see live preview."
        }
      });
    }
  }, [activeTab, jsonNoLink, jsonWithLink]);

  function handleTabChange(tab) {
    setActiveTab(tab);
  }

  function handleResetCurrent() {
    if (activeTab === "withlink") {
      setJsonWithLink(DEFAULT_WITH_LINK_JSON);
      setErrWithLink("");
    } else {
      setJsonNoLink(DEFAULT_NO_LINK_JSON);
      setErrNoLink("");
    }
  }

  function handleTextareaChange(e) {
    const next = e.target.value;
    if (activeTab === "withlink") {
      setJsonWithLink(next);
    } else {
      setJsonNoLink(next);
    }
  }

  // UI label helper
  function headerTitle() {
    return activeTab === "withlink" ? "With Link" : "Without Link";
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyCardIcon</h3>

      {/* Row 0 — Tabs for link vs no-link */}
      <div className="row mb-3">
        <div className="col-12 d-flex justify-content-center">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={
                  "nav-link " + (activeTab === "nolink" ? "active" : "")
                }
                onClick={() => handleTabChange("nolink")}
                type="button"
              >
                Without Link
              </button>
            </li>
            <li className="nav-item">
              <button
                className={
                  "nav-link " + (activeTab === "withlink" ? "active" : "")
                }
                onClick={() => handleTabChange("withlink")}
                type="button"
              >
                With Link
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Row 1 — Tag sample */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{TAG_SNIPPET}</code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Live preview */}
      <div className="row mb-4">
        <div className="col-12 col-lg-6">
          <AlloyCardIcon cardIcon={previewModel} />

          <div className="small text-secondary mt-2">
            <ul className="mb-0 ps-3">
              <li>
                <code>header</code> and <code>footer</code> render only if{" "}
                <code>name</code> is provided.
              </li>

              <li>
                <code>body</code> is required. Its <code>name</code> shows as a
                heading in the right column above the fields.
              </li>

              <li>
                <code>icon</code> is required for AlloyCardIcon. The icon
                renders in the left column using <code>iconClass</code>. We set{" "}
                <code>align-items-center</code> so it's vertically centered next
                to the text.
              </li>

              <li>
                The rows in the right column come from{" "}
                <code>fields[]</code>, in order, if they have{" "}
                <code>name</code>.
              </li>

              <li className="mt-2">
                <strong>Navigation:</strong>{" "}
                <code>link</code> is optional.
                If <code>link</code> is an empty string, the card body is just
                static.
                If <code>link</code> is something like{" "}
                <code>"/users/101"</code>, ONLY the{" "}
                <code>body</code> section becomes clickable.
                The header and footer never become part of that link.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Row 3 — JSON editor */}
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
              Reset
            </button>
          </div>

          <textarea
            className={`form-control font-monospace ${
              activeErr ? "is-invalid" : ""
            }`}
            rows={18}
            value={activeJson}
            onChange={handleTextareaChange}
            spellCheck={false}
          />
          {activeErr && (
            <div className="invalid-feedback d-block mt-1">
              {activeErr}
            </div>
          )}

          <div className="form-text">
            <ul className="mb-0 ps-3">
              <li>
                <code>iconClass</code> is the class for the left (icon) column.
                To vertically center the icon, include{" "}
                <code>d-flex align-items-center justify-content-center</code>.
              </li>
              <li>
                <code>textClass</code> is the class for the right (text)
                column.
              </li>
              <li>
                You don't need to manually assign <code>id</code> for every
                block. The constructors will generate stable IDs using our
                shared <code>generateId()</code> helper if you omit them.
              </li>
              <li className="mt-2">
                <strong>About link:</strong> You can delete the{" "}
                <code>link</code> field or set it to <code>""</code> if you
                don't want navigation. When it exists, only{" "}
                <code>body</code> links.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
