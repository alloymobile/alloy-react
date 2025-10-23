import { NavLink } from "react-router-dom"; // ensure this import exists

export default function Sidebar({ active }) {
  const items =
    active === "cell"
      ? [
          { label: "Icon", to: "/cell/icon", icon: "fa-solid fa-icons" },
          { label: "Link", to: "/cell/link", icon: "fa-solid fa-link" },
          { label: "LinkIcon", to: "/cell/link-icon", icon: "fa-solid fa-icons" },
          { label: "LinkLogo", to: "/cell/link-logo", icon: "fa-solid fa-image" },
          { label: "AlloyButton", to: "/cell/button", icon: "fa-solid fa-hand-pointer" },
          { label: "AlloyButtonIcon", to: "/cell/button-icon", icon: "fa-solid fa-tablet-button" },
          { label: "AlloyButtonSubmit", to: "/cell/button-submit", icon: "fa-solid fa-spinner" },
          { label: "AlloyInput", to: "/cell/input", icon: "fa-solid fa-arrows-down-to-line" },
          { label: "AlloyInputIcon", to: "/cell/input-icon", icon: "fa-solid fa-box-open" },
          { label: "AlloyInputFloating", to: "/cell/input-floating", icon: "fa-solid fa-calendar-days" },
        ]
      : active === "tissue"
      ? [
          // 👇 New tissue item
          { label: "AlloyLinkBar", to: "/tissue/link-bar", icon: "fa-solid fa-bars-progress" },
          { label: "AlloyButtonBar", to: "/tissue/button-bar", icon: "fa-solid fa-bars-progress" },
        ]
      : [];

  return (
    <div className="d-flex flex-column h-100">
      <div className="px-3 pt-3 pb-2 border-bottom bg-white">
        <div className="fw-semibold small text-uppercase text-secondary">Components</div>
        <div className="h5 mb-0">{active.charAt(0).toUpperCase() + active.slice(1)}</div>
      </div>

      <nav className="nav nav-pills nav-fill flex-column p-2">
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
