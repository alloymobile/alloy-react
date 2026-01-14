// src/lib/components/tissue/AlloyNavBarAction.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

import AlloyLinkLogo, { LinkLogoObject } from "../cell/AlloyLinkLogo.jsx";
import AlloyLinkBar, { LinkBarObject } from "./AlloyLinkBar.jsx";

import AlloyButtonBar, { ButtonBarObject } from "./AlloyButtonBar.jsx";
import AlloyButtonIcon, { ButtonIconObject } from "../cell/AlloyButtonIcon.jsx";

import { generateId, TagObject } from "../../utils/idHelper.js";

/* ----------------------------- auth helpers ----------------------------- */

function readCookie(name) {
  if (typeof document === "undefined") return "";
  const parts = document.cookie.split(";").map((s) => s.trim());
  const hit = parts.find((p) => p.startsWith(name + "="));
  if (!hit) return "";
  return hit.slice(name.length + 1);
}

function readAuth(storageKey) {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem(storageKey);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed?.token) return parsed;
    } catch {}
  }

  const c = readCookie(storageKey);
  if (c) {
    try {
      const decoded = decodeURIComponent(c);
      const parsed = JSON.parse(decoded);
      if (parsed?.token) return parsed;
    } catch {}
  }

  return null;
}

/* ----------------------------- model ----------------------------- */

export class NavBarActionObject {
  constructor(cfg = {}) {
    this.id = cfg.id ?? generateId("navBarAction");
    this.className =
      cfg.className ??
      "navbar navbar-expand-lg navbar-light bg-light shadow-sm border-bottom";

    // Offcanvas sidebar toggle id (optional)
    this.sidebarId = cfg.sidebarId ? String(cfg.sidebarId).replace(/^#/, "") : "";

    // Collapse area (default true)
    this.collapse = cfg.collapse !== false;

    // Brand / logo (big area)
    if (cfg.brand instanceof LinkLogoObject) {
      this.brand = cfg.brand;
    } else {
      const b = cfg.brand ?? cfg.logo ?? {
        href: "/",
        logo: "/logos/alloy.svg",
        name: "Alloy",
        width: 110,
        height: 28,
        logoAlt: "Alloy",
        className: "navbar-brand d-flex align-items-center gap-2",
      };
      this.brand = new LinkLogoObject(b);
    }

    // Optional title next to brand
    if (cfg.title instanceof TagObject) {
      this.title = cfg.title;
    } else if (cfg.title) {
      this.title = new TagObject(cfg.title);
    } else {
      this.title = new TagObject({});
    }

    // Optional back button (left side)
    if (cfg.backButton === null) {
      this.backButton = null;
    } else if (cfg.backButton instanceof ButtonIconObject) {
      this.backButton = cfg.backButton;
    } else if (cfg.backButton) {
      this.backButton = new ButtonIconObject(cfg.backButton);
    } else {
      this.backButton = null;
    }

    // Main nav links
    if (cfg.linkBar instanceof LinkBarObject) {
      this.linkBar = cfg.linkBar;
    } else if (cfg.linkBar) {
      this.linkBar = new LinkBarObject(cfg.linkBar);
    } else {
      this.linkBar = null;
    }

    // Auth mode:
    //  - "guest" => always show guestActions
    //  - "user"  => always show userActions
    //  - "auto"  => read storageKey token and switch
    this.auth = {
      mode: String(cfg.auth?.mode ?? "auto").toLowerCase(),
      storageKey: cfg.auth?.storageKey ?? "pexAuth",
    };

    // Right-side action bars
    this.guestActions =
      cfg.guestActions instanceof ButtonBarObject
        ? cfg.guestActions
        : new ButtonBarObject(cfg.guestActions || {});

    this.userActions =
      cfg.userActions instanceof ButtonBarObject
        ? cfg.userActions
        : new ButtonBarObject(cfg.userActions || {});
  }
}

/* ----------------------------- component ----------------------------- */

export function AlloyNavBarAction({ navBarAction, output }) {
  if (!navBarAction || !(navBarAction instanceof NavBarActionObject)) {
    throw new Error(
      "AlloyNavBarAction requires `navBarAction` (NavBarActionObject instance)."
    );
  }

  const navIdRef = useRef(navBarAction.id);
  const collapseId = `${navIdRef.current}-collapse`;

  const [mode, setMode] = useState(navBarAction.auth.mode);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMode(navBarAction.auth.mode);
  }, [navBarAction]);

  // Determine logged-in state (only in auto mode)
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (mode === "guest") {
      setIsLoggedIn(false);
      return;
    }
    if (mode === "user") {
      setIsLoggedIn(true);
      return;
    }

    const storageKey = navBarAction.auth.storageKey || "pexAuth";
    const a = readAuth(storageKey);
    setIsLoggedIn(!!a?.token);

    const onFocus = () => {
      const next = readAuth(storageKey);
      setIsLoggedIn(!!next?.token);
    };

    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [mode, navBarAction]);

  const actionBarModel = useMemo(() => {
    return isLoggedIn ? navBarAction.userActions : navBarAction.guestActions;
  }, [isLoggedIn, navBarAction]);

  const showCollapse = !!navBarAction.linkBar && navBarAction.collapse !== false;

  // Same philosophy as ClientBar:
  // - Do NOT navigate here
  // - Only emit events, parent decides what to do
  function handleAnyOutput(out) {
    output?.(out);
  }

  function handleBackOutput(out) {
    if (output) {
      output(out);
      return;
    }
    // fallback behavior if consumer didn't wire output
    if (typeof window !== "undefined") window.history.back();
  }

  const titleNode =
    navBarAction.title && navBarAction.title.name ? (
      <span id={navBarAction.title.id} className={navBarAction.title.className}>
        {navBarAction.title.name}
      </span>
    ) : null;

  return (
    <nav id={navIdRef.current} className={navBarAction.className}>
      <div className="container-fluid">
        {/* Left: sidebar toggle + back */}
        <div className="d-flex align-items-center gap-2">
          {navBarAction.sidebarId ? (
            <button
              className="btn d-lg-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target={`#${navBarAction.sidebarId}`}
              aria-controls={navBarAction.sidebarId}
              aria-label="Toggle sidebar"
            >
              <i className="fa-solid fa-bars" />
            </button>
          ) : null}

          {navBarAction.backButton ? (
            <AlloyButtonIcon
              buttonIcon={navBarAction.backButton}
              output={handleBackOutput}
            />
          ) : null}
        </div>

        {/* Middle: big brand/logo + title */}
        <div className="d-flex align-items-center flex-grow-1 ms-2">
          <AlloyLinkLogo linkLogo={navBarAction.brand} />
          {titleNode ? <div className="ms-2">{titleNode}</div> : null}
        </div>

        {/* Collapse toggler (only if linkBar exists) */}
        {showCollapse ? (
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${collapseId}`}
            aria-controls={collapseId}
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        ) : null}

        {/* Right: links + actions */}
        <div
          className={
            showCollapse
              ? "navbar-collapse collapse justify-content-end"
              : "d-flex align-items-center justify-content-end"
          }
          id={showCollapse ? collapseId : undefined}
        >
          {navBarAction.linkBar ? (
            <AlloyLinkBar linkBar={navBarAction.linkBar} />
          ) : null}

          <AlloyButtonBar buttonBar={actionBarModel} output={handleAnyOutput} />
        </div>
      </div>
    </nav>
  );
}

export default AlloyNavBarAction;
