// demo/pages/tissue/HoverRail.jsx
import React, { useMemo, useState } from "react";
import { AlloyHoverRail, HoverRailObject } from "../../../src";

const DEFAULT_JSON_RAIL = {
  id: "demoHoverRail",
  className: "alloy-rail",
  styleClass: "alloy-rail-style",
  expandMultiplier: 3,
  closeDelayMs: 140,
  defaultActiveId: "",
  items: [
    {
      id: "rail-products",
      label: { name: "Products", className: "alloy-rail-label" },
      content: {
        name: "Browse new & used equipment, parts, and ready-to-ship inventory.",
        className: "alloy-rail-content",
      },
      linkBar: {
        type: "AlloyLink",
        className: "d-flex flex-column gap-2 m-0 p-0 list-unstyled",
        linkClass: "nav-item",
        selected: "active",
        title: { name: "", className: "" },
        links: [
          { id: "p1", name: "Catalog", href: "/catalogue", className: "nav-link p-0 text-white" },
          { id: "p2", name: "New Listings", href: "/products?filter=new", className: "nav-link p-0 text-white" },
          { id: "p3", name: "Used Equipment", href: "/products?filter=used", className: "nav-link p-0 text-white" }
        ]
      }
    },
    {
      id: "rail-engineering",
      label: { name: "Engineering", className: "alloy-rail-label" },
      content: {
        name: "Find engineering support, drawings, detailing, and project collaboration.",
        className: "alloy-rail-content",
      },
      linkBar: {
        type: "AlloyLinkIcon",
        className: "d-flex flex-column gap-2 m-0 p-0 list-unstyled",
        linkClass: "nav-item",
        selected: "active",
        title: { name: "", className: "" },
        links: [
          {
            id: "e1",
            name: "Services",
            href: "/engineering",
            className: "nav-link p-0 text-white d-inline-flex align-items-center gap-2",
            icon: { iconClass: "fa-solid fa-drafting-compass", className: "d-inline-flex align-items-center justify-content-center" }
          },
          {
            id: "e2",
            name: "Approvals",
            href: "/approvals",
            className: "nav-link p-0 text-white d-inline-flex align-items-center gap-2",
            icon: { iconClass: "fa-regular fa-circle-check", className: "d-inline-flex align-items-center justify-content-center" }
          },
          {
            id: "e3",
            name: "Standards",
            href: "/standards",
            className: "nav-link p-0 text-white d-inline-flex align-items-center gap-2",
            icon: { iconClass: "fa-solid fa-scale-balanced", className: "d-inline-flex align-items-center justify-content-center" }
          }
        ]
      }
    },
    {
      id: "rail-auctions",
      label: { name: "Auctions", className: "alloy-rail-label" },
      content: {
        name: "Bid on equipment and inventory from trusted sellers.",
        className: "alloy-rail-content",
      },
      linkBar: {
        type: "AlloyLink",
        className: "d-flex flex-column gap-2 m-0 p-0 list-unstyled",
        linkClass: "nav-item",
        selected: "active",
        title: { name: "", className: "" },
        links: [
          { id: "a1", name: "Live Auctions", href: "/auction", className: "nav-link p-0 text-white" },
          { id: "a2", name: "Upcoming", href: "/auction?tab=upcoming", className: "nav-link p-0 text-white" },
          { id: "a3", name: "How it Works", href: "/auction/how", className: "nav-link p-0 text-white" }
        ]
      }
    },
    {
      id: "rail-contact",
      label: { name: "Contact", className: "alloy-rail-label" },
      content: {
        name: "Reach out for partnerships, onboarding, or support.",
        className: "alloy-rail-content",
      },
      linkBar: {
        type: "AlloyLinkIcon",
        className: "d-flex flex-column gap-2 m-0 p-0 list-unstyled",
        linkClass: "nav-item",
        selected: "active",
        title: { name: "", className: "" },
        links: [
          {
            id: "c1",
            name: "Email",
            href: "mailto:admin@precastxchange.com",
            className: "nav-link p-0 text-white d-inline-flex align-items-center gap-2",
            icon: { iconClass: "fa-regular fa-envelope", className: "d-inline-flex align-items-center justify-content-center" }
          },
          {
            id: "c2",
            name: "Phone",
            href: "tel:+18005551234",
            className: "nav-link p-0 text-white d-inline-flex align-items-center gap-2",
            icon: { iconClass: "fa-solid fa-phone", className: "d-inline-flex align-items-center justify-content-center" }
          },
          {
            id: "c3",
            name: "Location",
            href: "https://maps.google.com/?q=PrecastXchange",
            className: "nav-link p-0 text-white d-inline-flex align-items-center gap-2",
            target: "_blank",
            rel: "nofollow",
            icon: { iconClass: "fa-solid fa-location-dot", className: "d-inline-flex align-items-center justify-content-center" }
          }
        ]
      }
    }
  ]
};

function snippet() {
  return `<AlloyHoverRail rail={new HoverRailObject(railJson)} />`;
}

export default function HoverRailPage() {
  const [jsonRail, setJsonRail] = useState(
    JSON.stringify(DEFAULT_JSON_RAIL, null, 2)
  );

  const model = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonRail);
      return new HoverRailObject(parsed);
    } catch (e) {
      return new HoverRailObject({
        id: "demoHoverRail",
        items: [],
      });
    }
  }, [jsonRail]);

  return (
    <div className="container py-4">
      <h3 className="text-center mb-3">AlloyHoverRail</h3>

      <div className="card p-3 mb-4">
        <div className="row mb-3">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
              <code>{snippet()}</code>
            </pre>
          </div>
        </div>

        <div className="row g-3">
          {/* Input (JSON only) */}
          <div className="col-12 col-lg-6">
            <label className="form-label fw-semibold">Edit JSON</label>
            <textarea
              className="form-control font-monospace"
              rows={22}
              value={jsonRail}
              onChange={(e) => setJsonRail(e.target.value)}
              spellCheck={false}
            />
            <div className="form-text mt-2">
              Each <code>items[]</code> entry represents one rail “card”. Each card can have its own{" "}
              <code>linkBar</code> config (AlloyLink / AlloyLinkIcon / AlloyLinkLogo).
            </div>
          </div>

          {/* Preview */}
          <div className="col-12 col-lg-6">
            <label className="form-label fw-semibold">Preview</label>
            <div className="border rounded-3 p-2 bg-white">
              <AlloyHoverRail rail={model} />
            </div>
            <div className="form-text mt-2">
              Desktop: hover expands. Mobile: tap toggles and rail becomes horizontally scrollable.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
