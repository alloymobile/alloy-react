// src/lib/components/organ/AlloyClientBar.jsx
import React from "react";

import AlloyButtonIcon, {
  ButtonIconObject,
} from "../cell/AlloyButtonIcon.jsx";

import AlloyButtonDropDown, {
  ButtonDropDownObject,
} from "../cell/AlloyButtonDropDown.jsx";

import { generateId } from "../../utils/idHelper.js";

/* ---------------------------------------------------------
 * ClientBarObject
 * ------------------------------------------------------- */

export class ClientBarObject {
  constructor(res = {}) {
    const {
      id,
      className = "client-topbar border-bottom bg-white",
      backButton,
      client,
      sidebarId = "mobileSidebar",
    } = res;

    this.id = id ?? generateId("clientBar");
    this.className = className;

    // Offcanvas id to toggle (must match SideBarObject.close/offcanvasId)
    this.sidebarId = String(sidebarId || "mobileSidebar").replace(/^#/, "");

    if (backButton instanceof ButtonIconObject) {
      this.backButton = backButton;
    } else {
      this.backButton = new ButtonIconObject(
        backButton || {
          name: "Back",
          className: "btn btn-outline-secondary",
          icon: { iconClass: "fa-solid fa-arrow-left" },
          type: "button",
        }
      );
    }

    if (client instanceof ButtonDropDownObject) {
      this.client = client;
    } else {
      this.client = new ButtonDropDownObject(
        client || {
          name: "Account",
          className:
            "btn btn-sm btn-outline-secondary dropdown-toggle align-items-center d-inline-flex",
          icon: { iconClass: "fa-regular fa-user" },
        }
      );
    }
  }
}

export function AlloyClientBar({ clientBar, output }) {
  const model =
    clientBar instanceof ClientBarObject
      ? clientBar
      : new ClientBarObject(clientBar || {});

  function handleBackOutput(out) {
    output?.(out);
  }

  function handleClientDropdownOutput(out) {
    output?.(out);
  }

  const sidebarId = model.sidebarId || "mobileSidebar";

  return (
    <header id={model.id} className={model.className}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid justify-content-between py-2">
          {/* Left: mobile sidebar toggle + back button */}
          <div className="mx-2 d-flex align-items-center">
            {/* Mobile sidebar toggle */}
            <button
              className="btn d-lg-none me-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target={`#${sidebarId}`}
              aria-controls={sidebarId}
              aria-label="Toggle sidebar"
            >
              <i className="fa-solid fa-bars" />
            </button>

            {/* Back button */}
            <AlloyButtonIcon
              buttonIcon={model.backButton}
              output={handleBackOutput}
            />
          </div>

          {/* Right: client dropdown */}
          <AlloyButtonDropDown
            buttonDropDown={model.client}
            output={handleClientDropdownOutput}
          />
        </div>
      </nav>
    </header>
  );
}

export default AlloyClientBar;
