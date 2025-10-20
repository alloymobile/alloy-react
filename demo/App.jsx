import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopTabs from "./components/TopTabs.jsx";
import Sidebar from "./components/Sidebar.jsx";

export default function App() {
  const { pathname } = useLocation();
  const active = pathname.startsWith("/tissue")
    ? "tissue"
    : pathname.startsWith("/organ")
    ? "organ"
    : "cell";

  return (
    <div className="d-flex flex-column min-vh-100 bg-body">
      {/* Light navbar */}
      <nav className="navbar navbar-light bg-white border-bottom">
        <div className="container-fluid">
          {/* mobile: open sidebar */}
          <button
            className="btn btn-outline-secondary d-md-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarOffcanvas"
            aria-controls="sidebarOffcanvas"
          >
            <i className="fa-solid fa-bars" aria-hidden="true" />
          </button>

          <a className="navbar-brand ms-2 d-flex align-items-center gap-2" href="#">
            <i className="fa-solid fa-layer-group" aria-hidden="true" />
            <span>Alloy Components</span>
          </a>

          <TopTabs active={active} />
        </div>
      </nav>

      {/* Body: Sidebar + Routed content */}
      <div className="container-fluid flex-grow-1">
        <div className="row h-100">
          {/* Sidebar (desktop) */}
          <aside className="col-md-3 col-lg-2 d-none d-md-block border-end p-0 bg-white">
            <Sidebar active={active} />
          </aside>

          {/* Offcanvas sidebar (mobile) */}
          <div
            className="offcanvas offcanvas-start d-md-none"
            tabIndex="-1"
            id="sidebarOffcanvas"
            aria-labelledby="sidebarOffcanvasLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="sidebarOffcanvasLabel">Components</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body p-0">
              <Sidebar active={active} />
            </div>
          </div>

          {/* Routed content */}
          <main className="col-md-9 col-lg-10 p-0">
            <Outlet />
          </main>
        </div>
      </div>

      <footer className="border-top py-2 small text-center text-secondary bg-white">
        React {React.version} • Bootstrap 5 • Font Awesome 6
      </footer>
    </div>
  );
}
