// demo/pages/tissue/LinkBar.jsx
import React, { useMemo, useState } from "react";
import { AlloyLinkBar, LinkBarObject } from "../../../src";

/* ───────────────────────── Default JSON models ──────────────────────────── */

const DEFAULT_JSON_LINK = {
  type: "AlloyLink",
  className: "nav nav-pills justify-content-center gap-2",
  linkClass: "nav-item",
  selected: "active",
  barName: { show: true, name: "Resources", className: "text-center fw-semibold mb-2" },
  links: [
    { id: "docs", name: "Docs", href: "https://alloymobile.com", className: "nav-link", title: "Alloy docs" },
    { id: "api",  name: "API",  href: "#api",                      className: "nav-link", title: "API section" },
    { id: "blog", name: "Blog", href: "#blog",                     className: "nav-link", title: "Blog" }
  ]
};

const DEFAULT_JSON_ICON = {
  type: "AlloyLinkIcon",
  className: "nav nav-pills justify-content-center gap-2",
  linkClass: "nav-item",
  selected: "active",
  barName: { show: true, name: "Shortcuts", className: "text-center fw-semibold mb-2" },
  links: [
    { id: "homeI", name: "Home",    href: "#home",   icon: { iconClass: "fa-solid fa-house" }, className: "nav-link", title: "Home" },
    { id: "codeI", name: "Code",    href: "#code",   icon: { iconClass: "fa-solid fa-code"  }, className: "nav-link", title: "Code" },
    { id: "userI", name: "Profile", href: "#profile",icon: { iconClass: "fa-regular fa-user"}, className: "nav-link", title: "Profile" }
  ]
};

const DEFAULT_JSON_LOGO = {
  type: "AlloyLinkLogo",
  className: "nav nav-pills justify-content-center gap-2",
  linkClass: "nav-item",
  selected: "active",
  barName: { show: true, name: "Brands", className: "text-center fw-semibold mb-2" },
  links: [
    { id: "brandA", name: "Brand A", href: "#brandA", logo: "/logos/logo-a.svg", width: 96, height: 24, logoAlt: "Brand A", className: "nav-link", title: "Brand A" },
    { id: "brandB", name: "Brand B", href: "#brandB", logo: "/logos/logo-b.svg", width: 96, height: 24, logoAlt: "Brand B", className: "nav-link", title: "Brand B" }
  ]
};

/* ───────────────────────── Display helpers ─────────────────────────────── */

function tagSnippet(type) {
  switch (type) {
    case "AlloyLinkIcon":
      return `<AlloyLinkBar linkBar={new LinkBarObject(linkBarIcon)} />`;
    case "AlloyLinkLogo":
      return `<AlloyLinkBar linkBar={new LinkBarObject(linkBarLogo)} />`;
    case "AlloyLink":
    default:
      return `<AlloyLinkBar linkBar={new LinkBarObject(linkBar)} />`;
  }
}

function Section({ title, jsonState, setJsonState }) {
  const model = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonState);
      // 🔑 Hydration now handled internally by LinkBarObject
      return new LinkBarObject(parsed);
    } catch {
      return new LinkBarObject({ type: title, links: [] });
    }
  }, [jsonState, title]);

  return (
    <div className="card p-3 mb-4">
      <h5 className="mb-3 text-center">{title}</h5>

      {/* 1) Tag */}
      <div className="row mb-2">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{tagSnippet(title)}</code>
          </pre>
        </div>
      </div>

      {/* 2) Rendered bar */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <AlloyLinkBar linkBar={model} />
        </div>
      </div>

      {/* 3) Editable JSON */}
      <div className="row">
        <div className="col-12">
          <label className="form-label fw-semibold">Edit JSON</label>
          <textarea
            className="form-control"
            rows={12}
            value={jsonState}
            onChange={(e) => setJsonState(e.target.value)}
            spellCheck={false}
          />
          <div className="form-text">
            The <code>LinkBarObject</code> constructor hydrates items automatically based on <code>type</code>.  
            Set <code>selected</code> (e.g. <code>"active"</code>) to control the class applied to the clicked link.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Page (tabs) ─────────────────────────────────── */

export default function LinkBarPage() {
  const [activeTab, setActiveTab] = useState("AlloyLink");
  const [jsonLink, setJsonLink] = useState(JSON.stringify(DEFAULT_JSON_LINK, null, 2));
  const [jsonIcon, setJsonIcon] = useState(JSON.stringify(DEFAULT_JSON_ICON, null, 2));
  const [jsonLogo, setJsonLogo] = useState(JSON.stringify(DEFAULT_JSON_LOGO, null, 2));

  return (
    <div className="container py-4">
      <h3 className="text-center mb-3">AlloyLinkBar</h3>

      {/* Tabs */}
      <ul className="nav nav-tabs justify-content-center mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "AlloyLink" ? "active" : ""}`}
            onClick={() => setActiveTab("AlloyLink")}
          >
            AlloyLink
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "AlloyLinkIcon" ? "active" : ""}`}
            onClick={() => setActiveTab("AlloyLinkIcon")}
          >
            AlloyLinkIcon
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "AlloyLinkLogo" ? "active" : ""}`}
            onClick={() => setActiveTab("AlloyLinkLogo")}
          >
            AlloyLinkLogo
          </button>
        </li>
      </ul>

      {/* Panels */}
      {activeTab === "AlloyLink" && (
        <Section title="AlloyLink" jsonState={jsonLink} setJsonState={setJsonLink} />
      )}
      {activeTab === "AlloyLinkIcon" && (
        <Section title="AlloyLinkIcon" jsonState={jsonIcon} setJsonState={setJsonIcon} />
      )}
      {activeTab === "AlloyLinkLogo" && (
        <Section title="AlloyLinkLogo" jsonState={jsonLogo} setJsonState={setJsonLogo} />
      )}
    </div>
  );
}
