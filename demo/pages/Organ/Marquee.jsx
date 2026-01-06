// demo/pages/tissue/MarqueeDemo.jsx
import React, { useMemo, useState } from "react";
import { AlloyMarquee, MarqueeObject, CardObject } from "../../../src";

/* ---------------------- Demo marquee JSON (single input) ---------------------- */

const DEMO_MARQUEE = {
  id: "demoMarquee01",

  gap: 12,
  speed: 140,
  paused: false,
  direction: "rtl",
  pauseOnHover: true,
  pauseOnTouch: true,

  className: "alloy-marquee-wrap demo-marquee-wrap",
  marqueeClassName: "alloy-marquee demo-marquee",
  trackClassName: "alloy-marquee-track demo-marquee-track",
  setClassName: "alloy-marquee-set demo-marquee-set",

  cards: [
    {
      id: "cat-001",
      className: "card border shadow-sm demo-card",
      link: "/private/admin/category/{id}/subcategory",
      body: { className: "card-body p-3" },
      fields: [
        {
          id: "img-001",
          colClass: "col-auto",
          className: "d-flex align-items-start",
          logo: {
            imageUrl: "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
            alt: "Construction",
            className: "img-fluid rounded demo-logo"
          }
        },
        {
          id: "lines-001",
          colClass: "col",
          className: "d-flex flex-column",
          tags: [
            { id: "t1-001", name: "Construction", className: "fw-semibold demo-title" },
            { id: "t2-001", name: "CONSTRUCTION & INFRASTRUCTURE", className: "text-secondary small demo-sub" }
          ]
        }
      ]
    },
    {
      id: "cat-002",
      className: "card border shadow-sm demo-card",
      link: "/private/admin/category/{id}/subcategory",
      body: { className: "card-body p-3" },
      fields: [
        {
          id: "img-002",
          colClass: "col-auto",
          className: "d-flex align-items-start",
          logo: {
            imageUrl: "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
            alt: "Custom Mfg",
            className: "img-fluid rounded demo-logo"
          }
        },
        {
          id: "lines-002",
          colClass: "col",
          className: "d-flex flex-column",
          tags: [
            { id: "t1-002", name: "Custom Mfg", className: "fw-semibold demo-title" },
            { id: "t2-002", name: "CUSTOM MANUFACTURING", className: "text-secondary small demo-sub" }
          ]
        }
      ]
    },
    {
      id: "cat-003",
      className: "card border shadow-sm demo-card",
      link: "/private/admin/category/{id}/subcategory",
      body: { className: "card-body p-3" },
      fields: [
        {
          id: "img-003",
          colClass: "col-auto",
          className: "d-flex align-items-start",
          logo: {
            imageUrl: "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
            alt: "Aerospace",
            className: "img-fluid rounded demo-logo"
          }
        },
        {
          id: "lines-003",
          colClass: "col",
          className: "d-flex flex-column",
          tags: [
            { id: "t1-003", name: "Aerospace", className: "fw-semibold demo-title" },
            { id: "t2-003", name: "DEFENCE & AEROSPACE", className: "text-secondary small demo-sub" }
          ]
        }
      ]
    },
    {
      id: "cat-004",
      className: "card border shadow-sm demo-card",
      link: "/private/admin/category/{id}/subcategory",
      body: { className: "card-body p-3" },
      fields: [
        {
          id: "img-004",
          colClass: "col-auto",
          className: "d-flex align-items-start",
          logo: {
            imageUrl: "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
            alt: "Fabrication",
            className: "img-fluid rounded demo-logo"
          }
        },
        {
          id: "lines-004",
          colClass: "col",
          className: "d-flex flex-column",
          tags: [
            { id: "t1-004", name: "Fabrication", className: "fw-semibold demo-title" },
            { id: "t2-004", name: "FABRICATION", className: "text-secondary small demo-sub" }
          ]
        }
      ]
    }
  ]
};

const DEFAULT_MARQUEE_JSON = JSON.stringify(DEMO_MARQUEE, null, 2);
const DEMO_SNIPPET = `<AlloyMarquee marquee={new MarqueeObject(marqueeObject)} />`;

export default function MarqueePage() {
  const [jsonText, setJsonText] = useState(DEFAULT_MARQUEE_JSON);
  const [errorText, setErrorText] = useState("");

  const previewModel = useMemo(() => {
    try {
      const raw = JSON.parse(jsonText);
      setErrorText("");
      return new MarqueeObject(raw);
    } catch (e) {
      const msg = String(e?.message || e);
      setErrorText(msg);

      return new MarqueeObject({
        id: "demoMarqueeError",
        gap: 12,
        speed: 140,
        paused: false,
        direction: "rtl",
        className: "alloy-marquee-wrap demo-marquee-wrap",
        marqueeClassName: "alloy-marquee demo-marquee",
        trackClassName: "alloy-marquee-track demo-marquee-track",
        setClassName: "alloy-marquee-set demo-marquee-set",
        cards: [
          new CardObject({
            id: "demoMarqueeErrorCard",
            className: "card border shadow-sm demo-card",
            link: "",
            body: { className: "card-body p-3" },
            fields: [
              {
                id: "err-lines",
                colClass: "col-12",
                className: "d-flex flex-column",
                tags: [
                  { id: "err-t1", name: "Invalid JSON", className: "fw-semibold text-danger" },
                  { id: "err-t2", name: "Fix the JSON to update marquee preview.", className: "text-secondary small" }
                ]
              }
            ]
          })
        ]
      });
    }
  }, [jsonText]);

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyMarquee</h3>

      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{DEMO_SNIPPET}</code>
          </pre>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <AlloyMarquee marquee={previewModel} />
        </div>
      </div>

      <div className="row g-3 align-items-stretch">
        <div className="col-12">
          <textarea
            className={`form-control font-monospace ${errorText ? "is-invalid" : ""}`}
            rows={18}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            spellCheck={false}
          />
          {errorText && <div className="invalid-feedback d-block mt-1">{errorText}</div>}
        </div>
      </div>

      <style>{`
        .demo-marquee-wrap{
          border: 1px solid rgba(0,0,0,.08);
          border-radius: 14px;
          padding: 10px;
          background: rgba(0,0,0,.02);
        }

        .demo-card{
          width: 300px;
          border-radius: 14px;
          overflow: hidden;
          margin: 0 !important;
        }

        .demo-logo{
          width: 44px;
          height: 44px;
          object-fit: cover;
          display: block;
        }

        .demo-sub{
          line-height: 1.2;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
