// src/lib/components/organ/AlloyFooter.jsx
import React from "react";

import { generateId, OutputObject } from "../../utils/idHelper.js";

import AlloyLinkLogo, {
  LinkLogoObject,
} from "../cell/AlloyLinkLogo.jsx";

import AlloyLinkBar, {
  LinkBarObject,
} from "../tissue/AlloyLinkBar.jsx";

import AlloyForm, { FormObject } from "../tissue/AlloyForm.jsx";

/* ------------------------------------------------------------------
 * FooterObject
 *
 * Fields:
 *   - id, className
 *   - brandName, brandLogo (LinkLogoObject), brandDetails, brandClass
 *   - exploreTitle, exploreBar (LinkBarObject)
 *   - companyTitle, companyBar (LinkBarObject)
 *   - subscribeTitle, subscribeForm (FormObject)
 *   - bottomLeft (string)
 *   - socialBar (LinkBarObject)
 * ------------------------------------------------------------------ */
export class FooterObject {
  constructor(res = {}) {
    const {
      id,
      className = "footer pt-5 pb-4 bg-dark text-light",

      brandName = "PExChange",
      brandLogo,
      brandDetails = "Professional marketplace connecting precast manufacturers, engineers and buyers. New & used equipment, services and standards — in one platform.",
      brandClass = "col-md-4",

      exploreTitle = "Explore",
      exploreBar,

      companyTitle = "Company",
      companyBar,

      subscribeTitle = "Stay in the loop",
      subscribeForm,

      bottomLeft,
      socialBar,
    } = res || {};

    this.id = id ?? generateId("footer");
    this.className = className;
    this.brandName = brandName;
    this.brandDetails = brandDetails;
    this.brandClass = brandClass;

    /* ----------------- brandLogo (LinkLogoObject) ----------------- */
    if (brandLogo instanceof LinkLogoObject) {
      this.brandLogo = brandLogo;
    } else if (
      brandLogo &&
      typeof brandLogo.href === "string" &&
      brandLogo.href &&
      brandLogo.logo
    ) {
      // user-supplied JSON has proper href + logo
      this.brandLogo = new LinkLogoObject(brandLogo);
    } else {
      // safe default that satisfies LinkLogoObject schema
      this.brandLogo = new LinkLogoObject({
        id: generateId("footer-brand"),
        name: brandName,
        href: "#",
        logo: {
          iconClass: "fa-solid fa-building",
        },
        className: "brand-badge text-decoration-none text-light",
      });
    }

    /* ----------------- exploreBar (LinkBarObject) ----------------- */
    if (exploreBar instanceof LinkBarObject) {
      this.exploreBar = exploreBar;
    } else {
      const rawExplore = exploreBar || {};
      const safeExplore = {
        id: rawExplore.id ?? generateId("footer-explore"),
        className: rawExplore.className ?? "list-unstyled small",
        type: rawExplore.type ?? "AlloyLink",
        linkClass: rawExplore.linkClass ?? "mb-1",
        selected: rawExplore.selected ?? "active",
        title: rawExplore.title, // LinkBarObject will wrap into TagObject
        links: Array.isArray(rawExplore.links)
          ? rawExplore.links
          : [],
      };
      this.exploreBar = new LinkBarObject(safeExplore);
    }

    /* ----------------- companyBar (LinkBarObject) ----------------- */
    if (companyBar instanceof LinkBarObject) {
      this.companyBar = companyBar;
    } else {
      const rawCompany = companyBar || {};
      const safeCompany = {
        id: rawCompany.id ?? generateId("footer-company"),
        className: rawCompany.className ?? "list-unstyled small",
        type: rawCompany.type ?? "AlloyLink",
        linkClass: rawCompany.linkClass ?? "mb-1",
        selected: rawCompany.selected ?? "active",
        title: rawCompany.title,
        links: Array.isArray(rawCompany.links)
          ? rawCompany.links
          : [],
      };
      this.companyBar = new LinkBarObject(safeCompany);
    }

    /* ----------------- subscribeForm (FormObject) ----------------- */
    if (subscribeForm instanceof FormObject) {
      this.subscribeForm = subscribeForm;
    } else {
      const rawForm = subscribeForm || {};
      this.subscribeForm = new FormObject({
        id: rawForm.id ?? generateId("footer-subscribe"),
        title: rawForm.title ?? "",
        className: rawForm.className ?? "",
        message: rawForm.message ?? "",
        action: rawForm.action ?? "subscribe",
        type: rawForm.type ?? "AlloyInputTextIcon",
        submit: rawForm.submit || {
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
                  label: "",
                  type: "email",
                  layout: "text",
                  placeholder: "name@company.com",
                  required: true,
                  className: "mb-2",
                },
              ],
        data: rawForm.data ?? {},
      });
    }

    /* ----------------- bottomLeft text ----------------- */
    const year = new Date().getFullYear();
    this.bottomLeft =
      typeof bottomLeft === "string" && bottomLeft.trim()
        ? bottomLeft
        : `© ${year} ${this.brandName}. All rights reserved.`;

    /* ----------------- socialBar (LinkBarObject) ----------------- */
    if (socialBar instanceof LinkBarObject) {
      this.socialBar = socialBar;
    } else {
      const rawSocial = socialBar || {};
      const safeSocial = {
        id: rawSocial.id ?? generateId("footer-social"),
        className: rawSocial.className ?? "nav gap-3",
        type: rawSocial.type ?? "AlloyLink",
        linkClass: rawSocial.linkClass ?? "nav-item",
        selected: rawSocial.selected ?? "active",
        title: rawSocial.title,
        links: Array.isArray(rawSocial.links)
          ? rawSocial.links
          : [],
      };
      this.socialBar = new LinkBarObject(safeSocial);
    }

    /* ----------------- headings ----------------- */
    this.exploreTitle = exploreTitle;
    this.companyTitle = companyTitle;
    this.subscribeTitle = subscribeTitle;
  }
}

/* ------------------------------------------------------------------
 * AlloyFooter
 *
 * Props:
 *   - footer: FooterObject | plain config
 *   - output?: (out: OutputObject) => void
 *
 * Output:
 *   1) Subscribe:
 *      { id, type:"footer", action:"subscribe", error, data:{ email } }
 *   2) Link clicks:
 *      { id, type:"footer", action:"<link label>", error:false, data:{ href } }
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

  /* ----------------- LinkBar handlers (Explore/Company/Social) ----------------- */
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

  /* ----------------- Render ----------------- */

  return (
    <footer id={model.id} className={model.className}>
      <div className="container">
        <div className="row g-4">
          {/* Brand / description */}
          <div className={model.brandClass}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <AlloyLinkLogo linkLogo={model.brandLogo} />
            </div>
            <p className="small opacity-75 mb-0">
              {model.brandDetails}
            </p>
          </div>

          {/* Explore column */}
          <div className="col-md-2">
            <h6 className="text-white">{model.exploreTitle}</h6>
            <AlloyLinkBar
              linkBar={model.exploreBar}
              output={handleLinksOutput}
            />
          </div>

          {/* Company column */}
          <div className="col-md-3">
            <h6 className="text-white">{model.companyTitle}</h6>
            <AlloyLinkBar
              linkBar={model.companyBar}
              output={handleLinksOutput}
            />
          </div>

          {/* Subscribe column */}
          <div className="col-md-3">
            <h6 className="text-white">{model.subscribeTitle}</h6>
            <AlloyForm
              form={model.subscribeForm}
              output={handleSubscribeOutput}
            />
          </div>
        </div>

        {/* Bottom row */}
        <div className="d-flex justify-content-between align-items-center mt-4 small opacity-75 flex-wrap gap-2">
          <div>{model.bottomLeft}</div>
          <div className="d-flex gap-3">
            <AlloyLinkBar
              linkBar={model.socialBar}
              output={handleLinksOutput}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AlloyFooter;
