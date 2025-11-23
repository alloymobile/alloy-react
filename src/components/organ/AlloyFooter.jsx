// src/lib/components/organ/AlloyFooter.jsx
import React from "react";

import { generateId, OutputObject } from "../../utils/idHelper.js";

import AlloyLinkLogo, {
  LinkLogoObject
} from "../cell/AlloyLinkLogo.jsx";

import AlloyLinkBar, {
  LinkBarObject
} from "../tissue/AlloyLinkBar.jsx";

import AlloyForm, { FormObject } from "../tissue/AlloyForm.jsx";

/* ------------------------------------------------------------------
 * FooterObject
 *
 * Model fields:
 *   - id, className
 *   - brandName, brandLogo (LinkLogoObject), brandDetails, brandClass
 *
 *   - exploreTitle, exploreBar (LinkBarObject)
 *   - companyTitle, companyBar (LinkBarObject)
 *
 *   - subscribeTitle, subscribeForm (FormObject)
 *
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
      socialBar
    } = res || {};

    this.id = id ?? generateId("footer");
    this.className = className;

    this.brandName = brandName;

    // Brand logo (LinkLogoObject) – MUST have a "logo" object
    this.brandLogo =
      brandLogo instanceof LinkLogoObject
        ? brandLogo
        : new LinkLogoObject(
            brandLogo || {
              id: generateId("footer-brand"),
              name: brandName,
              href: "#",
              logo: {
                iconClass: "fa-solid fa-building"
              },
              className:
                "brand-badge text-decoration-none text-light"
            }
          );

    this.brandDetails = brandDetails;
    this.brandClass = brandClass;

    // Explore column → LinkBarObject
    this.exploreTitle = exploreTitle;
    this.exploreBar =
      exploreBar instanceof LinkBarObject
        ? exploreBar
        : new LinkBarObject(
            exploreBar || {
              id: generateId("footer-explore"),
              className: "list-unstyled small",
              type: "AlloyLink",
              links: []
            }
          );

    // Company column → LinkBarObject
    this.companyTitle = companyTitle;
    this.companyBar =
      companyBar instanceof LinkBarObject
        ? companyBar
        : new LinkBarObject(
            companyBar || {
              id: generateId("footer-company"),
              className: "list-unstyled small",
              type: "AlloyLink",
              links: []
            }
          );

    // Subscribe form → FormObject (email + subscribe button)
    this.subscribeTitle = subscribeTitle;
    this.subscribeForm =
      subscribeForm instanceof FormObject
        ? subscribeForm
        : new FormObject(
            subscribeForm || {
              id: generateId("footer-subscribe"),
              title: "",
              className: "",
              message: "",
              action: "subscribe",
              type: "AlloyInputTextIcon",
              submit: {
                name: "Subscribe",
                icon: { iconClass: "fa-solid fa-paper-plane" },
                className: "btn btn-primary w-100 mt-2",
                disabled: false,
                loading: false,
                ariaLabel: "Subscribe to newsletter",
                title: "Subscribe"
              },
              fields: [
                {
                  name: "email",
                  label: "",
                  type: "email",
                  layout: "text",
                  placeholder: "name@company.com",
                  required: true,
                  className: "mb-2"
                }
              ],
              data: {}
            }
          );

    // Bottom-left text – default with current year
    const year = new Date().getFullYear();
    this.bottomLeft =
      bottomLeft ??
      `© ${year} ${this.brandName}. All rights reserved.`;

    // Social icons bar (LinkBarObject)
    this.socialBar =
      socialBar instanceof LinkBarObject
        ? socialBar
        : new LinkBarObject(
            socialBar || {
              id: generateId("footer-social"),
              className: "nav gap-3",
              type: "AlloyLink",
              links: []
            }
          );
  }
}

/* ------------------------------------------------------------------
 * AlloyFooter
 *
 * Props:
 *   - footer: FooterObject | plain JSON config
 *   - output?: (out: OutputObject) => void
 *
 * Output patterns:
 *
 *   1) Subscribe form submit:
 *      {
 *        id: "<footer-id>",
 *        type: "footer",
 *        action: "subscribe",
 *        error: false,
 *        data: { email: "name@company.com" }
 *      }
 *
 *   2) Link clicks (explore/company/social):
 *      {
 *        id: "<footer-id>",
 *        type: "footer",
 *        action: "<link-name-or-ariaLabel>",
 *        error: false,
 *        data: { href: "/route-or-#hash" }
 *      }
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

  /* ----------------- Handlers ----------------- */

  // Handle subscribe form output
  const handleSubscribeOutput = (formOut) => {
    if (!formOut) return;

    const payload =
      formOut instanceof OutputObject && typeof formOut.toJSON === "function"
        ? formOut.toJSON()
        : formOut;

    if (payload.type !== "form" || payload.action !== "submit") {
      return;
    }

    // If there was validation error, bubble it through but keep the source
    const hasError = !!payload.error;
    const data = payload.data || {};

    const out = new OutputObject({
      id: model.id,
      type: "footer",
      action: "subscribe",
      error: hasError,
      data
    });

    emit(out);
  };

  // Handle clicks from any AlloyLinkBar
  const handleLinksOutput = (barOut) => {
    if (!barOut) return;

    const payload =
      barOut instanceof OutputObject && typeof barOut.toJSON === "function"
        ? barOut.toJSON()
        : barOut;

    const data = payload.data || {};
    const link = data.link || {};
    const href = link.href || data.href || "#";

    // Try to derive a human-friendly action name
    const actionName =
      typeof link.name === "string" && link.name.trim()
        ? link.name.trim()
        : typeof link.ariaLabel === "string" && link.ariaLabel.trim()
        ? link.ariaLabel.trim()
        : payload.action || "link";

    const out = new OutputObject({
      id: model.id,
      type: "footer",
      action: actionName,
      error: false,
      data: {
        href
      }
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

        {/* Bottom row: copyright + social icons */}
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
