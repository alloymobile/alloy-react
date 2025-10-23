// demo/pages/tissue/LinkBar.jsx
import React, { useMemo, useState } from "react";

// Import from your library barrel for the bar:
import { AlloyLinkBar, LinkBarObject, LinkObject, LinkIconObject, LinkLogoObject, IconObject } from "../../../src";

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers: Hydrate JSON -> proper class instances (LinkObject / LinkIconObject / LinkLogoObject)
────────────────────────────────────────────────────────────────────────────── */

function toLinkObjects(type, linksArr) {
  if (!Array.isArray(linksArr)) return [];
  switch (type) {
    case "AlloyLinkIcon":
      // LinkIconObject requires an IconObject!
      return linksArr.map((l) => {
        if (l instanceof LinkIconObject) return l;
        const icon = l?.icon instanceof IconObject ? l.icon : new IconObject(l?.icon || {});
        return new LinkIconObject({
          id: l?.id,
          href: l?.href,
          icon,
          name: l?.name,
          className: l?.className,
          active: l?.active,
          target: l?.target,
          rel: l?.rel,
          onClick: l?.onClick,
          title: l?.title,
        });
      });

    case "AlloyLinkLogo":
      return linksArr.map((l) => {
        if (l instanceof LinkLogoObject) return l;
        return new LinkLogoObject({
          id: l?.id,
          name: l?.name,
          href: l?.href,
          logo: l?.logo,
          width: l?.width,
          height: l?.height,
          logoAlt: l?.logoAlt,
          className: l?.className,
          active: l?.active,
          target: l?.target,
          rel: l?.rel,
          onClick: l?.onClick,
          title: l?.title,
        });
      });

    case "AlloyLink":
    default:
      return linksArr.map((l) => {
        if (l instanceof LinkObject) return l;
        return new LinkObject({
          id: l?.id,
          name: l?.name,
          href: l?.href,
          className: l?.className,
          active: l?.active,
          target: l?.target,
          rel: l?.rel,
          onClick: l?.onClick,
          title: l?.title,
        });
      });
  }
}

function hydrateLinkBar(obj) {
  const type = obj?.type ?? "AlloyLink";
  const links = toLinkObjects(type, obj?.links || []);
  return new LinkBarObject({
    id: obj?.id,
    className: obj?.className ?? "nav nav-pills justify-content-center gap-2",
    barName: obj?.barName ?? {
      show: true,
      name: type === "AlloyLink" ? "Resources" : type === "AlloyLinkIcon" ? "Shortcuts" : "Brands",
      className: "text-center fw-semibold mb-2",
    },
    type,
    linkClass: obj?.linkClass ?? "nav-item",
    links,
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   Default JSON models (editable in the page)
────────────────────────────────────────────────────────────────────────────── */

const DEFAULT_JSON_LINK = {
  type: "AlloyLink",
  className: "nav nav-pills justify-content-center gap-2",
  linkClass: "nav-item",
  barName: { show: true, name: "Resources", className: "text-center fw-semibold mb-2" },
  links: [
    { id: "docs", name: "Docs", href: "https://alloymobile.com", className: "nav-link", active: "active", title: "Alloy docs" },
    { id: "api", name: "API", href: "#api", className: "nav-link", active: "active", title: "API section" },
    { id: "blog", name: "Blog", href: "#blog", className: "nav-link", active: "active", title: "Blog" }
  ]
};

const DEFAULT_JSON_ICON = {
  type: "AlloyLinkIcon",
  className: "nav nav-pills justify-content-center gap-2",
  linkClass: "nav-item",
  barName: { show: true, name: "Shortcuts", className: "text-center fw-semibold mb-2" },
  links: [
    { id: "homeI", name: "Home", href: "#home", icon: { iconClass: "fa-solid fa-house" }, className: "nav-link", active: "active", title: "Home" },
    { id: "codeI", name: "Code", href: "#code", icon: { iconClass: "fa-solid fa-code" }, className: "nav-link", active: "active", title: "Code" },
    { id: "userI", name: "Profile", href: "#profile", icon: { iconClass: "fa-regular fa-user" }, className: "nav-link", active: "active", title: "Profile" }
  ]
};

const DEFAULT_JSON_LOGO = {
  type: "AlloyLinkLogo",
  className: "nav nav-pills justify-content-center gap-2",
  linkClass: "nav-item",
  barName: { show: true, name: "Brands", className: "text-center fw-semibold mb-2" },
  links: [
    { id: "brandA", name: "Brand A", href: "#brandA", logo: "/logos/logo-a.svg", width: 96, height: 24, logoAlt: "Brand A", className: "nav-link", active: "active", title: "Brand A" },
    { id: "brandB", name: "Brand B", href: "#brandB", logo: "/logos/logo-b.svg", width: 96, height: 24, logoAlt: "Brand B", className: "nav-link", active: "active", title: "Brand B" }
  ]
};

/* ─────────────────────────────────────────────────────────────────────────────
   Display helpers
────────────────────────────────────────────────────────────────────────────── */

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
      // Parse and hydrate to class instances required by your constructors
      const parsed = JSON.parse(jsonState);
      return hydrateLinkBar(parsed);
    } catch (e) {
      // Safe fallback if JSON breaks
      return hydrateLinkBar({ type: title, links: [] });
    }
  }, [jsonState, title]);

  const onChange = (e) => setJsonState(e.target.value);

  return (
    <div className="card p-3 mb-4">
      <h5 className="mb-3 text-center">{title}</h5>

      {/* Row 1 — Tag (copyable) */}
      <div className="row mb-2">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{tagSnippet(title)}</code>
          </pre>
        </div>
      </div>

      {/* Row 2 — Rendered bar */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <AlloyLinkBar linkBar={model} />
        </div>
      </div>

      {/* Row 3 — Editable JSON */}
      <div className="row">
        <div className="col-12">
          <label className="form-label fw-semibold">Edit JSON</label>
          <textarea
            className="form-control"
            rows={12}
            value={jsonState}
            onChange={onChange}
            spellCheck={false}
          />
          <div className="form-text">
            <ul className="m-0 ps-3">
              <li>
                For <code>AlloyLink</code>, each item must satisfy <code>new LinkObject(&#123; name, href, ... &#125;)</code>.
              </li>
              <li>
                For <code>AlloyLinkIcon</code>, each item must satisfy <code>new LinkIconObject(&#123; href, icon: new IconObject(&#123; iconClass &#125;), ... &#125;)</code>.
              </li>
              <li>
                For <code>AlloyLinkLogo</code>, each item must satisfy <code>new LinkLogoObject(&#123; href, logo, ... &#125;)</code>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page
────────────────────────────────────────────────────────────────────────────── */

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
