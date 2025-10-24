// demo/pages/tissue/CardIconPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyCardIcon, CardIconObject } from "../../../src";

/* ---------------------- Default editable JSON ---------------------- */
const DEFAULT_CARD_ICON = JSON.stringify(
  {
    id: "userCardIcon01",
    className: "card border m-2 shadow",
    link: "", // set to "/users/101" etc. to make the entire card clickable

    body: {
      id: "cardIconBody",
      className: "card-body d-flex align-items-center",
      name: "User Card With Icon",
      show: true
    },

    // The visual icon on the left
    icon: {
      // The IconObject is typically `{ iconClass: "fa-solid fa-user fa-2xl" }`
      iconClass: "fa-solid fa-user fa-2xl"
    },

    // Column classes
    iconClass:
      "col-3 icon-lg rounded-circle bg-warning text-white mb-0 d-flex align-items-center justify-content-center",
    textClass: "col-9",

    // Text rows on the right
    fields: [
      {
        id: "ic-name",
        className: "fw-semibold",
        name: "Ada Lovelace",
        show: true
      },
      {
        id: "ic-role",
        className: "text-muted",
        name: "Admin",
        show: true
      },
      {
        id: "ic-joined",
        className: "small text-secondary",
        name: "Joined: 2023-12-01",
        show: true
      }
    ]
  },
  null,
  2
);

/* ---------------------- Tag snippet (display only) ---------------------- */
const TAG_SNIPPET = `<AlloyCardIcon cardIcon={new CardIconObject(cardIconObject)} />`;

/* ---------------------- Page ---------------------- */
export default function CardIconPage() {
  const [inputJson, setInputJson] = useState(DEFAULT_CARD_ICON);
  const [parseError, setParseError] = useState("");

  const model = useMemo(() => {
    try {
      setParseError("");
      const raw = JSON.parse(inputJson);
      return new CardIconObject(raw);
    } catch (e) {
      setParseError(String(e.message || e));
      // safe fallback so preview never explodes
      return new CardIconObject({
        className: "card border m-2 shadow",
        link: "",
        body: {
          className: "card-body d-flex align-items-center",
          name: "Invalid JSON"
        },
        icon: { iconClass: "fa-solid fa-circle-exclamation text-danger" },
        fields: [
          {
            className: "text-danger",
            name: "Could not parse input JSON.",
            show: true
          }
        ]
      });
    }
  }, [inputJson]);

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyCardIcon</h3>

      {/* Row 1 — Tag sample */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{TAG_SNIPPET}</code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Preview (output visual) */}
      <div className="row mb-4">
        <div className="col-4">
          <AlloyCardIcon cardIcon={model} />
          <div className="small text-secondary mt-2">
            The left bubble is the icon (Font Awesome via <code>icon.iconClass</code>).
            The right column renders each <code>fields[]</code> item if <code>show</code> is{" "}
            <code>true</code>.  
            Set <code>link</code> to make the whole card clickable.
          </div>
        </div>
      </div>

      {/* Row 3 — Input JSON (editable) */}
      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable)</span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setInputJson(DEFAULT_CARD_ICON)}
            >
              Reset
            </button>
          </div>

          <textarea
            className={`form-control font-monospace ${parseError ? "is-invalid" : ""}`}
            rows={18}
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            spellCheck={false}
          />
          {parseError && <div className="invalid-feedback d-block mt-1">{parseError}</div>}

          <div className="form-text">
            <code>iconClass</code> controls the left block styling (size, bg, circle).{" "}
            <code>textClass</code> controls the right text column.  
            <code>fields</code> preserves order.
          </div>
        </div>
      </div>
    </div>
  );
}
