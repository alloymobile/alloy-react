import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ active }) {
  const items = active === "cell"
    ? [ { label: "Icon", to: "/cell/icon", icon: "fa-solid fa-icons" },
        { label: "Link", to: "/cell/link", icon: "fa-solid fa-link" },
        { label: "LinkIcon", to: "/cell/link-icon", icon: "fa-solid fa-icons" },
        { label: "LinkLogo", to: "/cell/link-logo", icon: "fa-solid fa-image" },
    ]
    : [];

  return (
    <div className="d-flex flex-column h-100">
      <div className="px-3 pt-3 pb-2 border-bottom bg-white">
        <div className="fw-semibold small text-uppercase text-secondary">Components</div>
        <div className="h5 mb-0">{active.charAt(0).toUpperCase() + active.slice(1)}</div>
      </div>

      <nav className="nav flex-column p-2 bg-white">
        {items.length === 0 && (
          <div className="text-secondary small px-2 py-2">
            No items yet. We’ll add them as we design.
          </div>
        )}

        {items.map((it, i) => (
          <NavLink
            key={i}
            to={it.to}
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${isActive ? "active fw-semibold" : ""}`
            }
          >
            <i className={it.icon} aria-hidden="true" />
            <span>{it.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
