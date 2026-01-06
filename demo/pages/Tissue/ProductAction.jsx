// demo/pages/tissue/ProductActionPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { AlloyProductAction, ProductActionObject } from "../../../src";

const IMG = "https://files.precastxchange.com/PRECASTXCHANGE/products/a6d072d3-9415-4b8e-9c88-73810c29fa6c_display.jpg";
const GLB = "https://files.precastxchange.com/PRECASTXCHANGE/temp/4%20feet_optimized.glb";
const VID = "https://files.precastxchange.com/PRECASTXCHANGE/temp/demo.mp4";

const DEFAULT_ALL = JSON.stringify(
  {
    renderer: "product",
    id: "productAction01",
    className: "card border-0 shadow-sm rounded-4 overflow-hidden",
    link: "/private/products/{id}",

    product: {
      id: "px-4ft-demo",
      brand: "PRECASTXCHANGE",
      title: "4 Feet Precast Demo Product",
      sku: "PX-4FT-DEMO",
      status: "ACTIVE",
      description: "This demo showcases image + GLB + video, thumbnails, zoom, and quantity controls.",
      price: 1499.0,
      compareAtPrice: 1799.0,
      metaLine: "Ships in 5–7 days • Weight: 220 lb",
      tags: ["Precast", "3D", "Video"]
    },

    media: {
      items: [
        { id: "img-1", kind: "image", url: IMG, thumbUrl: IMG, title: "Primary image", isPrimary: true, sortOrder: 1 },
        { id: "glb-1", kind: "glb", url: GLB, thumbUrl: IMG, title: "3D model", sortOrder: 2 },
        { id: "vid-1", kind: "video", url: VID, thumbUrl: IMG, title: "Video demo", sortOrder: 3 }
      ]
    },

    quantity: { label: "Quantity", min: 1, max: 25, step: 1, value: 1, emitOnChange: false },

    footer: {
      leftText: "Try actions + see output payload"
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
          className: "btn btn-outline-secondary rounded-pill px-4 d-flex align-items-center gap-2",
          icon: { iconClass: "fa-regular fa-eye" }
        },
        {
          id: "addBtn",
          name: "Add",
          className: "btn btn-primary rounded-pill px-4 d-flex align-items-center gap-2",
          icon: { iconClass: "fa-solid fa-cart-shopping" }
        }
      ]
    }
  },
  null,
  2
);

const DEFAULT_IMAGE_ONLY = JSON.stringify(
  {
    renderer: "product",
    id: "productActionImgOnly",
    className: "card border-0 shadow-sm rounded-4 overflow-hidden",
    product: {
      id: "img-only",
      brand: "PRECASTXCHANGE",
      title: "Image-only Product",
      sku: "PX-IMG-001",
      status: "ACTIVE",
      description: "Compact listing card with thumbnails + zoom.",
      price: 199.0,
      metaLine: "Ships in 2–4 days",
      tags: ["Precast"]
    },
    media: { items: [{ id: "img-1", url: IMG, kind: "image", thumbUrl: IMG, isPrimary: true }] },
    quantity: { min: 1, max: 10, value: 1, step: 1, emitOnChange: false },
    footer: { leftText: "Image-only preset" },
    type: "AlloyButtonBar",
    action: {
      type: "AlloyButton",
      className: "nav gap-2",
      buttonClass: "nav-item",
      barName: { show: false },
      buttons: [
        { id: "viewBtn", name: "View", className: "btn btn-sm btn-outline-secondary" },
        { id: "addBtn", name: "Add", className: "btn btn-sm btn-primary" }
      ]
    }
  },
  null,
  2
);

export default function ProductActionPage() {
  useEffect(() => {
    const id = "model-viewer-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.type = "module";
    s.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    document.body.appendChild(s);
  }, []);

  const TABS = [
    { key: "All", label: "Image + GLB + Video" },
    { key: "Img", label: "Image only" }
  ];

  const [active, setActive] = useState("All");

  const [jsonAll, setJsonAll] = useState(DEFAULT_ALL);
  const [jsonImg, setJsonImg] = useState(DEFAULT_IMAGE_ONLY);

  const [errAll, setErrAll] = useState("");
  const [errImg, setErrImg] = useState("");

  const defaultOutputMsg =
    '// click footer actions to see OutputObject:\n' +
    '// {\n' +
    '//   id: "<card-id>",\n' +
    '//   type: "product-action",\n' +
    '//   action: "<name | ariaLabel | title | id>",\n' +
    '//   error: false,\n' +
    '//   data: { productId, title, sku, status, price, compareAtPrice, quantity, activeMediaId, activeMediaKind, activeMediaUrl }\n' +
    '// }';

  const [emitAll, setEmitAll] = useState(defaultOutputMsg);
  const [emitImg, setEmitImg] = useState(defaultOutputMsg);

  const modelAll = useMemo(() => {
    try {
      setErrAll("");
      return new ProductActionObject(JSON.parse(jsonAll));
    } catch (e) {
      setErrAll(String(e.message || e));
      return new ProductActionObject({
        product: { title: "Invalid JSON (All media)" },
        media: { items: [{ url: IMG, kind: "image" }] },
        quantity: { min: 1, max: 5, value: 1 },
        footer: { leftText: "Fix JSON to preview" },
        type: "AlloyButtonBar",
        action: { type: "AlloyButton", className: "nav gap-2", buttons: [] }
      });
    }
  }, [jsonAll]);

  const modelImg = useMemo(() => {
    try {
      setErrImg("");
      return new ProductActionObject(JSON.parse(jsonImg));
    } catch (e) {
      setErrImg(String(e.message || e));
      return new ProductActionObject({
        product: { title: "Invalid JSON (Image only)" },
        media: { items: [{ url: IMG, kind: "image" }] },
        quantity: { min: 1, max: 5, value: 1 },
        footer: { leftText: "Fix JSON to preview" },
        type: "AlloyButtonBar",
        action: { type: "AlloyButton", className: "nav gap-2", buttons: [] }
      });
    }
  }, [jsonImg]);

  const bindings =
    {
      All: {
        label: "Image + GLB + Video",
        model: modelAll,
        inputJson: jsonAll,
        setInputJson: setJsonAll,
        parseError: errAll,
        outputJson: emitAll,
        setOutputJson: setEmitAll,
        resetJson: () => {
          setJsonAll(DEFAULT_ALL);
          setEmitAll(defaultOutputMsg);
          setErrAll("");
        }
      },
      Img: {
        label: "Image only",
        model: modelImg,
        inputJson: jsonImg,
        setInputJson: setJsonImg,
        parseError: errImg,
        outputJson: emitImg,
        setOutputJson: setEmitImg,
        resetJson: () => {
          setJsonImg(DEFAULT_IMAGE_ONLY);
          setEmitImg(defaultOutputMsg);
          setErrImg("");
        }
      }
    }[active] || {};

  function handleOutput(out) {
    const payload = out && typeof out.toJSON === "function" ? out.toJSON() : out;
    bindings.setOutputJson(JSON.stringify(payload, null, 2));
  }

  return (
    <div className="container py-3 d-flex flex-column align-items-center">
      <div className="col-12 col-lg-10 col-xl-9">
        <h3 className="mb-3 text-center">AlloyProductAction</h3>

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

        <div className="row mb-4 justify-content-center">
          <div className="col-12">
            {bindings.model ? <AlloyProductAction productAction={bindings.model} output={handleOutput} /> : null}
          </div>
        </div>

        <div className="row g-3 align-items-stretch justify-content-center mb-5">
          <div className="col-12 col-lg-6">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-semibold">Input JSON (editable) — {bindings.label}</span>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={bindings.resetJson}>
                Reset
              </button>
            </div>

            <textarea
              className={`form-control font-monospace ${bindings.parseError ? "is-invalid" : ""}`}
              rows={18}
              value={bindings.inputJson}
              onChange={(e) => bindings.setInputJson(e.target.value)}
              spellCheck={false}
            />
            {bindings.parseError ? <div className="invalid-feedback d-block mt-1">{bindings.parseError}</div> : null}
          </div>

          <div className="col-12 col-lg-6">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-semibold">Output (from action click)</span>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => bindings.setOutputJson(defaultOutputMsg)}
              >
                Clear
              </button>
            </div>

            <textarea className="form-control font-monospace bg-light border" rows={18} value={bindings.outputJson} readOnly />

            <div className="form-text mt-2">
              Notes:
              <ul className="mb-0 ps-3">
                <li>Zoom button is top-left, transparent, and appears only on hover.</li>
                <li>Zoom modal thumbnails are bottom (not side).</li>
                <li>Video is autoplay/loop/muted and shows no player UI.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
