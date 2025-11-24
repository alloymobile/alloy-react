// src/lib/components/organ/AlloyFooter.jsx
import React from "react";

import {
  generateId,
  OutputObject,
  BlockObject,
  LogoObject,
} from "../../utils/idHelper.js";

import AlloyLinkBar, { LinkBarObject } from "../tissue/AlloyLinkBar.jsx";
import AlloyForm, { FormObject } from "../tissue/AlloyForm.jsx";

/* ------------------------------------------------------------------
 * FooterObject
 *
 * FINAL SCHEMA:
 *   {
 *     id?: string
 *     name?: string
 *     className?: string          // applied to <footer>
 *
 *     logo?: LogoObject | {...}     // company logo
 *     details?: BlockObject | {...} // text block (we usually use name only)
 *     social?: LinkBarObject | {...} // AlloyLinkBar (typically AlloyLinkIcon)
 *     section?: Array<LinkBarObject|Object> // list of AlloyLinkBar sections
 *     subscribe?: FormObject | {...} // AlloyForm for email subscribe
 *   }
 * ------------------------------------------------------------------ */
export class FooterObject {
  constructor(res = {}) {
    const {
      id,
      name,
      className = "footer pt-5 pb-4 bg-dark text-light",

      logo,
      details,
      social,
      section,
      subscribe,
    } = res || {};

    this.id = id ?? generateId("footer");
    this.name = name ?? "Footer";
    this.className = className;

    /* ----------------- logo (LogoObject) ----------------- */
    if (logo instanceof LogoObject) {
      this.logo = logo;
    } else {
      this.logo = new LogoObject(
        logo || {
          imageUrl:
            "https://alloymobile.blob.core.windows.net/alloymobile/alloymobile.png",
          alt: "Alloymobile",
        }
      );
    }

    /* ----------------- details (BlockObject) ----------------- */
    if (details instanceof BlockObject) {
      this.details = details;
    } else {
      this.details = new BlockObject(
        details || {
          // "details with name only ignore logo and icon"
          name:
            "Professional marketplace connecting precast manufacturers, engineers and buyers. New & used equipment, services and standards — in one platform.",
          className: "small opacity-75 mb-2",
          colClass: "col-12 col-md-3",
        }
      );
    }

    /* ----------------- social (LinkBarObject) ----------------- */
    if (social instanceof LinkBarObject) {
      this.social = social;
    } else {
      const rawSocial = social || {};
      this.social = new LinkBarObject({
        id: rawSocial.id ?? generateId("footer-social"),
        className: rawSocial.className ?? "nav gap-3",
        type: rawSocial.type ?? "AlloyLinkIcon",
        linkClass: rawSocial.linkClass ?? "nav-link p-0 text-light",
        selected: rawSocial.selected ?? "active",
        title: rawSocial.title, // TagObject handled inside LinkBarObject
        links: Array.isArray(rawSocial.links) ? rawSocial.links : [],
      });
    }

    /* ----------------- section[] (LinkBarObject list) ----------------- */
    const rawSection = Array.isArray(section) ? section : [];
    this.section = rawSection.map((sec) => {
      if (sec instanceof LinkBarObject) return sec;

      return new LinkBarObject({
        id: sec.id ?? generateId("footer-section"),
        className: sec.className ?? "list-unstyled small",
        type: sec.type ?? "AlloyLink",
        linkClass:
          sec.linkClass ??
          "d-block mb-1 text-decoration-none text-light",
        selected: sec.selected ?? "active",
        title: sec.title, // wrapped into TagObject inside LinkBarObject
        links: Array.isArray(sec.links) ? sec.links : [],
      });
    });

    /* ----------------- subscribe (FormObject) ----------------- */
    if (subscribe instanceof FormObject) {
      this.subscribe = subscribe;
    } else {
      const rawForm = subscribe || {};
      this.subscribe = new FormObject({
        id: rawForm.id ?? generateId("footer-subscribe"),
        title: rawForm.title ?? "Stay in the loop",
        className: rawForm.className ?? "",
        message: rawForm.message ?? "",
        action: rawForm.action ?? "subscribe",
        type: rawForm.type ?? "AlloyInputTextIcon",
        submit:
          rawForm.submit || {
            name: "Subscribe",
            icon: { iconClass: "fa-solid fa-paper-plane" },
            className: "btn btn-primary w-100 mt-2",
            disabled: false,
            loading: false,
            ariaLabel: "Subscribe to newsletter",
            title: "Subscribe",
          },
        fields:
          Array.isArray(rawForm.fields) && rawForm.fields.length > 0
            ? rawForm.fields
            : [
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  layout: "text",
                  placeholder: "name@company.com",
                  required: true,
                  className: "form-control",
                },
              ],
        data: rawForm.data ?? {},
      });
    }
  }
}

/* ------------------------------------------------------------------
 * AlloyFooter
 * ------------------------------------------------------------------ */
export function AlloyFooter({ footer, output }) {
  const model =
    footer instanceof FooterObject
      ? footer
      : new FooterObject(footer || {});

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  /* ----------------- Subscribe form handler ----------------- */
  const handleSubscribeOutput = (formOut) => {
    if (!formOut) return;

    const payload =
      formOut instanceof OutputObject && typeof formOut.toJSON === "function"
        ? formOut.toJSON()
        : formOut;

    if (payload.type !== "form" || payload.action !== "submit") {
      return;
    }

    const hasError = !!payload.error;
    const data = payload.data || {};

    const out = new OutputObject({
      id: model.id,
      type: "footer",
      action: "subscribe",
      error: hasError,
      data,
    });

    emit(out);
  };

  /* ----------------- LinkBar handler (sections + social) ----------------- */
  const handleLinksOutput = (barOut) => {
    if (!barOut) return;

    const payload =
      barOut instanceof OutputObject && typeof barOut.toJSON === "function"
        ? barOut.toJSON()
        : barOut;

    const data = payload.data || {};
    const link = data.link || {};
    const href = link.href || data.href || "#";

    const actionName =
      (typeof link.name === "string" && link.name.trim()) ||
      (typeof link.ariaLabel === "string" && link.ariaLabel.trim()) ||
      payload.action ||
      "link";

    const out = new OutputObject({
      id: model.id,
      type: "footer",
      action: actionName,
      error: false,
      data: { href },
    });

    emit(out);
  };

  const sections = Array.isArray(model.section) ? model.section : [];

  /* ----------------- Render ----------------- */

  return (
    <footer id={model.id} className={model.className}>
      <div className="container">
        <div className="row g-4">
          {/* Column 1: logo + alt text + details + social */}
          <div className="col-12 col-md-3">
            {/* Logo */}
            {model.logo && (
              <div className="mb-2">
                <img
                  src={model.logo.imageUrl}
                  alt={model.logo.alt}
                  className={model.logo.className}
                  style={{
                    width: model.logo.width,
                    height: model.logo.height,
                  }}
                />
              </div>
            )}

            {/* Alt text directly after logo */}
            {model.logo && model.logo.alt && (
              <h6 className="fw-semibold mb-1">
                {model.logo.alt}
              </h6>
            )}

            {/* Details text (BlockObject.name only) */}
            {model.details && model.details.name && (
              <p
                className={
                  model.details.className ||
                  "small opacity-75 mb-2"
                }
              >
                {model.details.name}
              </p>
            )}

            {/* Social icons (title + icons handled inside AlloyLinkBar) */}
            {model.social && (
              <div className="mt-2">
                <AlloyLinkBar
                  linkBar={model.social}
                  output={handleLinksOutput}
                />
              </div>
            )}
          </div>

          {/* Section columns (Explore, Company, etc.) */}
          {sections.map((sec, index) => (
            <div
              key={sec.id || `footer-section-${index}`}
              className="col-12 col-md-3"
            >
              {/* Let AlloyLinkBar render its own title from sec.title */}
              <AlloyLinkBar
                linkBar={sec}
                output={handleLinksOutput}
              />
            </div>
          ))}

          {/* Last column: subscribe form (title fully handled by AlloyForm) */}
          <div className="col-12 col-md-3">
            <AlloyForm
              form={model.subscribe}
              output={handleSubscribeOutput}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AlloyFooter;
