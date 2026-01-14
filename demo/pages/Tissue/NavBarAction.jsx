// demo/pages/tissue/NavBarAction.jsx
import React, { useMemo, useState } from "react";
import { AlloyNavBarAction, NavBarActionObject } from "../../../src";

const DEFAULT_JSON_NAV_ACTION_GUEST = JSON.stringify(
  {
    id: "navBarActionGuestDemo",
    className: "navbar navbar-expand-lg navbar-light bg-light shadow-sm",
    sidebarId: "mobileSidebar",
    backButton: {
      id: "back",
      name: "Back",
      icon: { iconClass: "fa-solid fa-arrow-left" },
      className: "btn btn-link",
      active: "",
    },
    brand: {
      id: "brand",
      name: "Alloy",
      href: "/",
      logo: "/logos/alloy.svg",
      width: 110,
      height: 28,
      logoAlt: "Alloy",
      className: "navbar-brand d-flex align-items-center gap-2",
    },
    title: {
      name: "",
      className: "fw-semibold",
    },
    linkBar: {
      type: "AlloyLink",
      className: "navbar-nav ms-auto mb-2 mb-lg-0 gap-2",
      linkClass: "nav-item",
      selected: "active",
      title: { name: "", className: "text-center fw-semibold mb-2" },
      links: [
        {
          id: "docs",
          name: "Docs",
          href: "https://alloymobile.com",
          className: "nav-link",
          target: "_blank",
          rel: "noopener",
        },
        { id: "api", name: "API", href: "#api", className: "nav-link" },
        { id: "blog", name: "Blog", href: "#blog", className: "nav-link" },
      ],
    },
    auth: { mode: "guest", storageKey: "pexAuth" },
    guestActions: {
      type: "AlloyButton",
      className: "nav d-flex align-items-center gap-2 ms-lg-3 mb-0",
      buttonClass: "nav-item",
      selected: "active",
      title: { name: "", className: "" },
      buttons: [
        { id: "signin", name: "Sign in", className: "btn btn-outline-primary btn-sm" },
        { id: "signup", name: "Sign up", className: "btn btn-primary btn-sm" },
      ],
    },
    userActions: {
      type: "AlloyButton",
      className: "nav d-flex align-items-center gap-2 ms-lg-3 mb-0",
      buttonClass: "nav-item",
      selected: "active",
      title: { name: "", className: "" },
      buttons: [
        {
          type: "dropdown",
          id: "userMenu",
          name: "",
          className: "btn btn-outline-secondary btn-sm dropdown-toggle",
          icon: { iconClass: "fa-regular fa-user" },
          badge: {
            name: "1",
            title: "Updates",
            className: "badge bg-danger rounded-pill",
          },
          linkBar: {
            type: "AlloyLinkIcon",
            className: "dropdown-menu dropdown-menu-end",
            linkClass: "dropdown-item d-flex align-items-center gap-2",
            selected: "active",
            title: { name: "", className: "" },
            links: [
              {
                id: "profile",
                href: "/private/member/profile",
                icon: { iconClass: "fa-regular fa-id-card" },
                name: "Profile",
              },
              {
                id: "signout",
                href: "#",
                icon: { iconClass: "fa-solid fa-arrow-right-from-bracket" },
                name: "Sign out",
              },
            ],
          },
        },
      ],
    },
  },
  null,
  2
);

const DEFAULT_JSON_NAV_ACTION_USER = JSON.stringify(
  {
    id: "navBarActionUserDemo",
    className: "navbar navbar-expand-lg navbar-light bg-white border-bottom",
    sidebarId: "mobileSidebar",
    backButton: {
      id: "back",
      name: "Back",
      icon: { iconClass: "fa-solid fa-arrow-left" },
      className: "btn btn-link",
      active: "",
    },
    brand: {
      id: "brand2",
      name: "Alloy",
      href: "/",
      logo: "/logos/alloy-mark.svg",
      width: 32,
      height: 32,
      logoAlt: "Alloy",
      className: "navbar-brand d-flex align-items-center gap-2",
    },
    title: { name: "", className: "fw-semibold" },
    linkBar: {
      type: "AlloyLinkIcon",
      className: "navbar-nav ms-auto mb-2 mb-lg-0 gap-2",
      linkClass: "nav-item",
      selected: "active",
      title: { name: "", className: "text-center fw-semibold mb-2" },
      links: [
        {
          id: "homeI",
          name: "Home",
          href: "/",
          icon: { iconClass: "fa-solid fa-house" },
          className: "nav-link",
        },
        {
          id: "codeI",
          name: "Code",
          href: "#code",
          icon: { iconClass: "fa-solid fa-code" },
          className: "nav-link",
        },
        {
          id: "meI",
          name: "Me",
          href: "#me",
          icon: { iconClass: "fa-regular fa-user" },
          className: "nav-link",
        },
      ],
    },
    auth: { mode: "user", storageKey: "pexAuth" },
    guestActions: {
      type: "AlloyButton",
      className: "nav d-flex align-items-center gap-2 ms-lg-3 mb-0",
      buttonClass: "nav-item",
      selected: "active",
      title: { name: "", className: "" },
      buttons: [
        { id: "signin", name: "Sign in", className: "btn btn-outline-primary btn-sm" },
        { id: "signup", name: "Sign up", className: "btn btn-primary btn-sm" },
      ],
    },
    userActions: {
      type: "AlloyButton",
      className: "nav d-flex align-items-center gap-2 ms-lg-3 mb-0",
      buttonClass: "nav-item",
      selected: "active",
      title: { name: "", className: "" },
      buttons: [
        {
          type: "dropdown",
          id: "userMenu",
          name: "",
          className: "btn btn-outline-secondary btn-sm dropdown-toggle",
          icon: { iconClass: "fa-regular fa-user" },
          badge: {
            name: "7",
            title: "Notifications",
            className: "badge bg-danger rounded-pill",
          },
          linkBar: {
            type: "AlloyLinkIcon",
            className: "dropdown-menu dropdown-menu-end",
            linkClass: "dropdown-item d-flex align-items-center gap-2",
            selected: "active",
            title: { name: "", className: "" },
            links: [
              {
                id: "profile",
                href: "/private/member/profile",
                icon: { iconClass: "fa-regular fa-id-card" },
                name: "Profile",
              },
              {
                id: "settings",
                href: "/private/member/settings",
                icon: { iconClass: "fa-solid fa-gear" },
                name: "Settings",
              },
              {
                id: "signout",
                href: "#",
                icon: { iconClass: "fa-solid fa-arrow-right-from-bracket" },
                name: "Sign out",
              },
            ],
          },
        },
      ],
    },
  },
  null,
  2
);

const DEFAULT_JSON_NAV_DROPDOWNS_ONLY = JSON.stringify(
  {
    id: "navBarDropDownsOnlyDemo",
    className: "navbar navbar-expand-lg navbar-light bg-white border-bottom",
    sidebarId: "mobileSidebar",
    backButton: {
      id: "back",
      name: "Back",
      icon: { iconClass: "fa-solid fa-arrow-left" },
      className: "btn btn-link",
      active: "",
    },
    brand: {
      id: "brand3",
      name: "Alloy",
      href: "/",
      logo: "/logos/alloy-mark.svg",
      width: 32,
      height: 32,
      logoAlt: "Alloy",
      className: "navbar-brand d-flex align-items-center gap-2",
    },
    title: { name: "", className: "fw-semibold" },
    linkBar: null,
    auth: { mode: "user", storageKey: "pexAuth" },
    guestActions: {
      type: "AlloyButton",
      className: "nav d-flex align-items-center gap-2 ms-lg-3 mb-0",
      buttonClass: "nav-item",
      selected: "active",
      title: { name: "", className: "" },
      buttons: [],
    },
    userActions: {
      type: "AlloyButton",
      className: "nav d-flex align-items-center gap-2 ms-lg-3 mb-0",
      buttonClass: "nav-item",
      selected: "active",
      title: { name: "", className: "" },
      buttons: [
        {
          type: "dropdown",
          id: "ddNotifications",
          name: "",
          className: "btn btn-outline-secondary btn-sm dropdown-toggle",
          icon: { iconClass: "fa-regular fa-bell" },
          badge: {
            name: "3",
            title: "Unread notifications",
            className: "badge bg-danger rounded-pill",
          },
          linkBar: {
            type: "AlloyLinkIcon",
            className: "dropdown-menu dropdown-menu-end",
            linkClass: "dropdown-item d-flex align-items-center gap-2",
            selected: "active",
            title: { name: "", className: "" },
            links: [
              {
                id: "n1",
                href: "/private/member/notifications",
                icon: { iconClass: "fa-regular fa-bell" },
                name: "View notifications",
              },
              {
                id: "n2",
                href: "#",
                icon: { iconClass: "fa-solid fa-check" },
                name: "Mark all read",
              },
            ],
          },
        },
        {
          type: "dropdown",
          id: "ddMessages",
          name: "",
          className: "btn btn-outline-secondary btn-sm dropdown-toggle",
          icon: { iconClass: "fa-regular fa-envelope" },
          badge: {
            name: "NEW",
            title: "New messages",
            className: "badge bg-primary rounded-pill",
          },
          linkBar: {
            type: "AlloyLinkIcon",
            className: "dropdown-menu dropdown-menu-end",
            linkClass: "dropdown-item d-flex align-items-center gap-2",
            selected: "active",
            title: { name: "", className: "" },
            links: [
              {
                id: "m1",
                href: "/private/member/messages",
                icon: { iconClass: "fa-regular fa-envelope" },
                name: "Inbox",
              },
              {
                id: "m2",
                href: "/private/member/messages?filter=unread",
                icon: { iconClass: "fa-regular fa-circle-dot" },
                name: "Unread",
              },
            ],
          },
        },
        {
          type: "dropdown",
          id: "ddAlerts",
          name: "",
          className: "btn btn-outline-secondary btn-sm dropdown-toggle",
          icon: { iconClass: "fa-solid fa-triangle-exclamation" },
          badge: {
            name: "!",
            title: "Important alerts",
            className: "badge bg-warning text-dark rounded-pill",
          },
          linkBar: {
            type: "AlloyLinkIcon",
            className: "dropdown-menu dropdown-menu-end",
            linkClass: "dropdown-item d-flex align-items-center gap-2",
            selected: "active",
            title: { name: "", className: "" },
            links: [
              {
                id: "a1",
                href: "/private/member/alerts",
                icon: { iconClass: "fa-solid fa-triangle-exclamation" },
                name: "View alerts",
              },
              {
                id: "a2",
                href: "#",
                icon: { iconClass: "fa-solid fa-bell-slash" },
                name: "Mute alerts",
              },
            ],
          },
        },
        {
          type: "dropdown",
          id: "ddProfile",
          name: "",
          className: "btn btn-outline-secondary btn-sm dropdown-toggle",
          icon: { iconClass: "fa-regular fa-user" },
          linkBar: {
            type: "AlloyLinkIcon",
            className: "dropdown-menu dropdown-menu-end",
            linkClass: "dropdown-item d-flex align-items-center gap-2",
            selected: "active",
            title: { name: "", className: "" },
            links: [
              {
                id: "p1",
                href: "/private/member/profile",
                icon: { iconClass: "fa-regular fa-id-card" },
                name: "Profile",
              },
              {
                id: "p2",
                href: "/private/member/settings",
                icon: { iconClass: "fa-solid fa-gear" },
                name: "Settings",
              },
              {
                id: "p3",
                href: "#",
                icon: { iconClass: "fa-solid fa-arrow-right-from-bracket" },
                name: "Sign out",
              },
            ],
          },
        },
      ],
    },
  },
  null,
  2
);

function tagSnippet() {
  return `<AlloyNavBarAction navBarAction={new NavBarActionObject(JSON.parse(jsonState))} output={handleOutput} />`;
}

function Section({ title, jsonState, setJsonState, defaultJson, outputJson, setOutputJson }) {
  const [parseError, setParseError] = useState("");

  const model = useMemo(() => {
    try {
      setParseError("");
      const parsed = JSON.parse(jsonState);
      return new NavBarActionObject(parsed);
    } catch (e) {
      setParseError(String(e.message || e));
      return new NavBarActionObject({
        className: "navbar navbar-expand-lg navbar-light bg-light shadow-sm",
        auth: { mode: "guest", storageKey: "pexAuth" },
        brand: {
          href: "/",
          logo: "/logos/alloy.svg",
          name: "Alloy",
          width: 110,
          height: 28,
          logoAlt: "Alloy",
          className: "navbar-brand d-flex align-items-center gap-2",
        },
        linkBar: null,
        guestActions: {
          type: "AlloyButton",
          className: "nav d-flex align-items-center gap-2 ms-lg-3 mb-0",
          buttonClass: "nav-item",
          buttons: [],
        },
        userActions: {
          type: "AlloyButton",
          className: "nav d-flex align-items-center gap-2 ms-lg-3 mb-0",
          buttonClass: "nav-item",
          buttons: [],
        },
      });
    }
  }, [jsonState]);

  function handleOutput(out) {
    const payload = out && typeof out.toJSON === "function" ? out.toJSON() : out;
    setOutputJson(JSON.stringify(payload, null, 2));
  }

  return (
    <div className="card p-3 mb-4">
      <h5 className="mb-3 text-center">{title}</h5>

      <div className="row mb-2">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{tagSnippet()}</code>
          </pre>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <AlloyNavBarAction navBarAction={model} output={handleOutput} />
        </div>
      </div>

      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable)</span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                setJsonState(defaultJson);
                setOutputJson("// Interact with navbar to see events here…");
              }}
            >
              Reset
            </button>
          </div>

          <textarea
            className={`form-control font-monospace ${parseError ? "is-invalid" : ""}`}
            rows={18}
            value={jsonState}
            onChange={(e) => setJsonState(e.target.value)}
            spellCheck={false}
          />
          {parseError && (
            <div className="invalid-feedback d-block mt-1">{parseError}</div>
          )}
        </div>

        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Output (from <code>output</code> callback)
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => setOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={18}
            value={outputJson}
            onChange={(e) => setOutputJson(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

export default function NavBarActionPage() {
  const [layoutTab, setLayoutTab] = useState("mixed");
  const [authTab, setAuthTab] = useState("guest");

  const [jsonGuest, setJsonGuest] = useState(DEFAULT_JSON_NAV_ACTION_GUEST);
  const [jsonUser, setJsonUser] = useState(DEFAULT_JSON_NAV_ACTION_USER);
  const [jsonDropDowns, setJsonDropDowns] = useState(DEFAULT_JSON_NAV_DROPDOWNS_ONLY);

  const [outputGuest, setOutputGuest] = useState("// Interact with navbar to see events here…");
  const [outputUser, setOutputUser] = useState("// Interact with navbar to see events here…");
  const [outputDropDowns, setOutputDropDowns] = useState(
    "// Interact with navbar to see events here…"
  );

  return (
    <div className="container py-4">
      <h3 className="text-center mb-3">AlloyNavBarAction</h3>

      <ul className="nav nav-tabs justify-content-center mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${layoutTab === "mixed" ? "active" : ""}`}
            onClick={() => setLayoutTab("mixed")}
          >
            LinkBar + ButtonBar
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${layoutTab === "dropdowns" ? "active" : ""}`}
            onClick={() => setLayoutTab("dropdowns")}
          >
            DropDowns-only ButtonBar
          </button>
        </li>
      </ul>

      {layoutTab === "mixed" && (
        <>
          <ul className="nav nav-tabs justify-content-center mb-3">
            <li className="nav-item">
              <button
                className={`nav-link ${authTab === "guest" ? "active" : ""}`}
                onClick={() => setAuthTab("guest")}
              >
                Logged out (guest)
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link ${authTab === "user" ? "active" : ""}`}
                onClick={() => setAuthTab("user")}
              >
                Logged in (user)
              </button>
            </li>
          </ul>

          {authTab === "guest" && (
            <Section
              title="Logged out (guest) — LinkBar + ButtonBar"
              jsonState={jsonGuest}
              setJsonState={setJsonGuest}
              defaultJson={DEFAULT_JSON_NAV_ACTION_GUEST}
              outputJson={outputGuest}
              setOutputJson={setOutputGuest}
            />
          )}

          {authTab === "user" && (
            <Section
              title="Logged in (user) — LinkBar + ButtonBar"
              jsonState={jsonUser}
              setJsonState={setJsonUser}
              defaultJson={DEFAULT_JSON_NAV_ACTION_USER}
              outputJson={outputUser}
              setOutputJson={setOutputUser}
            />
          )}
        </>
      )}

      {layoutTab === "dropdowns" && (
        <Section
          title="DropDowns-only — ButtonBar contains only DropDowns (each with its own LinkBar)"
          jsonState={jsonDropDowns}
          setJsonState={setJsonDropDowns}
          defaultJson={DEFAULT_JSON_NAV_DROPDOWNS_ONLY}
          outputJson={outputDropDowns}
          setOutputJson={setOutputDropDowns}
        />
      )}

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileSidebarLabel">
            Sidebar
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="text-muted small">
            This is just a demo offcanvas so the navbar’s sidebar button works.
          </div>
        </div>
      </div>
    </div>
  );
}
