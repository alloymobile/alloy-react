// demo/pages/tissue/NavBar.jsx
import React, { useMemo, useState } from "react";
import { AlloyNavBar, NavBarObject } from "../../../src";

/* ── Default JSON (three variants) ───────────────────────── */
const DEFAULT_JSON_NAV_LINK = JSON.stringify(
  {
    id: "navbarDemo1",
    className: "navbar navbar-expand-lg navbar-light bg-light shadow-sm",
    logo: {
      id: "brand",
      name: "Alloy",
      href: "/",
      logo: "/logos/alloy.svg",
      width: 110,
      height: 28,
      logoAlt: "Alloy",
      className: "navbar-brand d-flex align-items-center gap-2"
    },
    linkBar: {
      type: "AlloyLink",
      className: "navbar-nav ms-auto mb-2 mb-lg-0 gap-2",
      linkClass: "nav-item",
      selected: "active",                      // <— bar-level selected class
      barName: { show: false },
      links: [
        { id: "docs", name: "Docs", href: "https://alloymobile.com", className: "nav-link", target: "_blank", rel: "noopener" },
        { id: "api",  name: "API",  href: "#api", className: "nav-link" },
        { id: "blog", name: "Blog", href: "#blog", className: "nav-link" }
      ]
    }
  },
  null,
  2
);

const DEFAULT_JSON_NAV_ICON = JSON.stringify(
  {
    id: "navbarDemo2",
    className: "navbar navbar-expand-lg navbar-light bg-white border-bottom",
    logo: {
      id: "brand2",
      name: "Alloy",
      href: "/",
      logo: "/logos/alloy-mark.svg",
      width: 32,
      height: 32,
      logoAlt: "Alloy",
      className: "navbar-brand d-flex align-items-center gap-2"
    },
    linkBar: {
      type: "AlloyLinkIcon",
      className: "navbar-nav ms-auto mb-2 mb-lg-0 gap-2",
      linkClass: "nav-item",
      selected: "active",                      // <— bar-level selected class
      barName: { show: false },
      links: [
        { id: "homeI", name: "Home", href: "/",     icon: { iconClass: "fa-solid fa-house" }, className: "nav-link" },
        { id: "codeI", name: "Code", href: "#code", icon: { iconClass: "fa-solid fa-code"  }, className: "nav-link" },
        { id: "userI", name: "Me",   href: "#me",   icon: { iconClass: "fa-regular fa-user"}, className: "nav-link" }
      ]
    }
  },
  null,
  2
);

const DEFAULT_JSON_NAV_LOGO = JSON.stringify(
  {
    id: "navbarDemo3",
    className: "navbar navbar-expand-lg navbar-dark bg-dark",
    logo: {
      id: "brand3",
      name: "Alloy",
      href: "/",
      logo: "/logos/alloy-invert.svg",
      width: 110,
      height: 28,
      logoAlt: "Alloy",
      className: "navbar-brand d-flex align-items-center gap-2"
    },
    linkBar: {
      type: "AlloyLinkLogo",
      className: "navbar-nav ms-auto mb-2 mb-lg-0 gap-3",
      linkClass: "nav-item",
      selected: "active",                      // <— bar-level selected class
      barName: { show: false },
      links: [
        { id: "brandA", name: "Brand A", href: "#a", logo: "/logos/logo-a.svg", width: 96, height: 24, logoAlt: "Brand A", className: "nav-link" },
        { id: "brandB", name: "Brand B", href: "#b", logo: "/logos/logo-b.svg", width: 96, height: 24, logoAlt: "Brand B", className: "nav-link" }
      ]
    }
  },
  null,
  2
);

/* ── Section (Tag → Render → JSON editor) ─────────────────── */
function tagSnippet(type) {
  const v = type === "AlloyLinkIcon" ? "new NavBarObject(navBarIcon)" : type === "AlloyLinkLogo" ? "new NavBarObject(navBarLogo)" : "new NavBarObject(navBar)";
  return `<AlloyNavBar navBar={${v}} />`;
}

function Section({ title, jsonState, setJsonState }) {
  const [parseError, setParseError] = useState("");

  const model = useMemo(() => {
    try {
      setParseError("");
      const parsed = JSON.parse(jsonState);
      return new NavBarObject(parsed); // hydration happens inside (LinkBarObject + selected)
    } catch (e) {
      setParseError(String(e.message || e));
      return new NavBarObject({
        className: "navbar navbar-expand-lg navbar-light bg-light",
        logo: { href: "/", logo: "/logos/alloy.svg", name: "Alloy" },
        linkBar: { type: title, className: "navbar-nav ms-auto mb-2 mb-lg-0 gap-2", linkClass: "nav-item", selected: "active", links: [] }
      });
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

      {/* 2) Rendered navbar */}
      <div className="row mb-3">
        <div className="col-12">
          <AlloyNavBar navBar={model} />
        </div>
      </div>

      {/* 3) Editable JSON */}
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable)</span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                const def =
                  title === "AlloyLink"
                    ? DEFAULT_JSON_NAV_LINK
                    : title === "AlloyLinkIcon"
                    ? DEFAULT_JSON_NAV_ICON
                    : DEFAULT_JSON_NAV_LOGO;
                setJsonState(def);
              }}
            >
              Reset
            </button>
          </div>

          <textarea
            className={`form-control font-monospace ${parseError ? "is-invalid" : ""}`}
            rows={16}
            value={jsonState}
            onChange={(e) => setJsonState(e.target.value)}
            spellCheck={false}
          />
          {parseError && <div className="invalid-feedback d-block mt-1">{parseError}</div>}

          <div className="form-text">
            The bar’s <code>selected</code> (e.g. <code>"active"</code>) is applied only to the clicked link.  
            Per-link <code>active</code> is no longer needed.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page (tabs) ──────────────────────────────────────────── */
export default function NavBarPage() {
  const [activeTab, setActiveTab] = useState("AlloyLink");

  const [jsonLink, setJsonLink] = useState(DEFAULT_JSON_NAV_LINK);
  const [jsonIcon, setJsonIcon] = useState(DEFAULT_JSON_NAV_ICON);
  const [jsonLogo, setJsonLogo] = useState(DEFAULT_JSON_NAV_LOGO);

  return (
    <div className="container py-4">
      <h3 className="text-center mb-3">AlloyNavBar</h3>

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
