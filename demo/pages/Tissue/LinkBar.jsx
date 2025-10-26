// demo/pages/tissue/LinkBar.jsx
import React, { useMemo, useState } from "react";
import { AlloyLinkBar, LinkBarObject } from "../../../src";

/* ───────────────────────── Default JSON models ────────────────────────────
   These are the raw configs fed to `new LinkBarObject(...)`.
   LinkBarObject will:
     - generate id, defaults
     - wrap `title` into TagObject
     - hydrate each `links[]` item into the right model class based on `type`
*/

/** Plain text links (AlloyLink) */
const DEFAULT_JSON_LINK = {
  type: "AlloyLink",
  className: "nav nav-pills justify-content-center gap-2",
  linkClass: "nav-item",
  selected: "active",
  title: {
    // TagObject will be created out of this by LinkBarObject
    name: "Resources",
    className: "text-center fw-semibold mb-2",
  },
  links: [
    {
      id: "docs",
      name: "Docs",
      href: "https://alloymobile.com",
      className: "nav-link",
      title: "Alloy docs",
    },
    {
      id: "api",
      name: "API",
      href: "#api",
      className: "nav-link",
      title: "API section",
    },
    {
      id: "blog",
      name: "Blog",
      href: "#blog",
      className: "nav-link",
      title: "Blog",
    },
  ],
};

/** Icon links (AlloyLinkIcon) */
const DEFAULT_JSON_ICON = {
  type: "AlloyLinkIcon",
  className: "nav nav-pills justify-content-center gap-2",
  linkClass: "nav-item",
  selected: "active",
  title: {
    name: "Shortcuts",
    className: "text-center fw-semibold mb-2",
  },
  links: [
    {
      id: "homeI",
      name: "Home",
      href: "#home",
      icon: { iconClass: "fa-solid fa-house" },
      className: "nav-link",
      title: "Home",
    },
    {
      id: "codeI",
      name: "Code",
      href: "#code",
      icon: { iconClass: "fa-solid fa-code" },
      className: "nav-link",
      title: "Code",
    },
    {
      id: "userI",
      name: "Profile",
      href: "#profile",
      icon: { iconClass: "fa-regular fa-user" },
      className: "nav-link",
      title: "Profile",
    },
  ],
};

/** Logo links (AlloyLinkLogo) */
const DEFAULT_JSON_LOGO = {
  type: "AlloyLinkLogo",
  className: "nav nav-pills justify-content-center gap-2",
  linkClass: "nav-item",
  selected: "active",
  title: {
    name: "Brands",
    className: "text-center fw-semibold mb-2",
  },
  links: [
    {
      id: "brandA",
      name: "Brand A",
      href: "#brandA",
      logo: "/logos/logo-a.svg",
      width: 96,
      height: 24,
      logoAlt: "Brand A",
      className: "nav-link",
      title: "Brand A",
    },
    {
      id: "brandB",
      name: "Brand B",
      href: "#brandB",
      logo: "/logos/logo-b.svg",
      width: 96,
      height: 24,
      logoAlt: "Brand B",
      className: "nav-link",
      title: "Brand B",
    },
  ],
};

/* ───────────────────────── Small helpers ─────────────────────────────── */

function snippetFor(type) {
  // Just for the pretty <code> block in the demo header
  return `<AlloyLinkBar linkBar={new LinkBarObject(linkBarJson)} />`;
}

function Section({ tabType, jsonState, setJsonState }) {
  // Build a live LinkBarObject off whatever's currently in the textarea.
  const model = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonState);
      return new LinkBarObject(parsed);
    } catch (err) {
      // fallback if JSON is currently invalid
      return new LinkBarObject({
        type: tabType,
        title: { name: "" },
        links: [],
      });
    }
  }, [jsonState, tabType]);

  return (
    <div className="card p-3 mb-4">
      <h5 className="mb-3 text-center">{tabType}</h5>

      {/* 1) Usage snippet */}
      <div className="row mb-2">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{snippetFor(tabType)}</code>
          </pre>
        </div>
      </div>

      {/* 2) Live rendered bar */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <AlloyLinkBar linkBar={model} />
        </div>
      </div>

      {/* 3) JSON editor */}
      <div className="row">
        <div className="col-12">
          <label className="form-label fw-semibold">Edit JSON</label>
          <textarea
            className="form-control font-monospace"
            rows={14}
            value={jsonState}
            onChange={(e) => setJsonState(e.target.value)}
            spellCheck={false}
          />
          <div className="form-text mt-2">
            <ul className="mb-0 ps-3">
              <li>
                <code>type</code> controls which link component is used:
                <code>"AlloyLink"</code>, <code>"AlloyLinkIcon"</code>, or{" "}
                <code>"AlloyLinkLogo"</code>.
              </li>
              <li>
                <code>title</code> becomes a TagObject internally. If{" "}
                <code>title.name</code> is empty, no heading renders.
              </li>
              <li>
                <code>links</code> is an array of plain objects. Each one is
                turned into the right model automatically (
                <code>LinkObject</code>, <code>LinkIconObject</code>, or{" "}
                <code>LinkLogoObject</code>).
              </li>
              <li>
                When you click a link in the preview, that link becomes
                "selected" and gets <code>selected</code> (for example{" "}
                <code>"active"</code>) injected into its{" "}
                <code>active</code> class.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Page with tabs ─────────────────────────────── */

export default function LinkBarPage() {
  const [activeTab, setActiveTab] = useState("AlloyLink");

  const [jsonLink, setJsonLink] = useState(
    JSON.stringify(DEFAULT_JSON_LINK, null, 2)
  );
  const [jsonIcon, setJsonIcon] = useState(
    JSON.stringify(DEFAULT_JSON_ICON, null, 2)
  );
  const [jsonLogo, setJsonLogo] = useState(
    JSON.stringify(DEFAULT_JSON_LOGO, null, 2)
  );

  return (
    <div className="container py-4">
      <h3 className="text-center mb-3">AlloyLinkBar</h3>

      {/* Tabs */}
      <ul className="nav nav-tabs justify-content-center mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "AlloyLink" ? "active" : ""
            }`}
            onClick={() => setActiveTab("AlloyLink")}
          >
            AlloyLink
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "AlloyLinkIcon" ? "active" : ""
            }`}
            onClick={() => setActiveTab("AlloyLinkIcon")}
          >
            AlloyLinkIcon
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "AlloyLinkLogo" ? "active" : ""
            }`}
            onClick={() => setActiveTab("AlloyLinkLogo")}
          >
            AlloyLinkLogo
          </button>
        </li>
      </ul>

      {/* Panels */}
      {activeTab === "AlloyLink" && (
        <Section
          tabType="AlloyLink"
          jsonState={jsonLink}
          setJsonState={setJsonLink}
        />
      )}

      {activeTab === "AlloyLinkIcon" && (
        <Section
          tabType="AlloyLinkIcon"
          jsonState={jsonIcon}
          setJsonState={setJsonIcon}
        />
      )}

      {activeTab === "AlloyLinkLogo" && (
        <Section
          tabType="AlloyLinkLogo"
          jsonState={jsonLogo}
          setJsonState={setJsonLogo}
        />
      )}
    </div>
  );
}
