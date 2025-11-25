// src/pages/Organ/HeroSignup.jsx
import React, { useMemo, useState } from "react";

import { AlloyHeroSignup, HeroSignupObject, SignupObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* ------------------------------------------------------------------
 * DEFAULT HERO JSON (schema for HeroSignupObject)
 *
 * {
 *   id, name, className, title, subTitle,
 *   action: LinkBarObject config,
 *   stats:  CardObject[] config,
 *   signup: SignupObject config
 * }
 * ------------------------------------------------------------------ */
const DEFAULT_HERO_JSON = JSON.stringify(
  {
    id: "hero-pexchange",
    name: "Empowering Precast & Concrete",
    className: "hero py-2 py-lg-2 position-relative overflow-hidden",

    title: "A marketplace built for precast manufacturers, engineers & buyers",
    subTitle:
      "Discover new & used equipment, trade inventory, request appraisals, and browse standards — all in one professional platform.",

    /* CTA row: Explore Catalog / Add Foundry (using AlloyLinkBar + AlloyLinkIcon) */
    action: {
      id: "hero-actions",
      className: "d-flex gap-3 list-unstyled mb-0",
      type: "AlloyLinkIcon",
      linkClass: "nav-item",
      selected: "active",
      links: [
        {
          id: "hero-explore",
          href: "#catalog",
          name: "Explore Catalog",
          className: "btn btn-primary btn-lg shadow-soft",
          icon: { iconClass: "fa-solid fa-cart-plus me-2" },
          title: "Explore Catalog"
        },
        {
          id: "hero-add-foundry",
          href: "#offAddFoundry",
          name: "Add Foundry",
          className: "btn btn-outline-primary btn-lg",
          icon: { iconClass: "fa-solid fa-industry me-2" },
          title: "Add Foundry"
        }
      ]
    },

    /* Stats row: 3 chips under the hero */
    stats: [
      {
        id: "stat-listings",
        className: "stat",
        body: {
          id: "stat-listings-body",
          className: ""
        },
        fields: [
          {
            id: "stat-listings-value",
            name: "1,200+",
            className: "fw-bold h4 mb-0",
            colClass: "col-12"
          },
          {
            id: "stat-listings-label",
            name: "Listings live",
            className: "text-secondary small",
            colClass: "col-12"
          }
        ],
        footer: {}
      },
      {
        id: "stat-vendors",
        className: "stat",
        body: {
          id: "stat-vendors-body",
          className: ""
        },
        fields: [
          {
            id: "stat-vendors-value",
            name: "180+",
            className: "fw-bold h4 mb-0",
            colClass: "col-12"
          },
          {
            id: "stat-vendors-label",
            name: "Vetted vendors",
            className: "text-secondary small",
            colClass: "col-12"
          }
        ],
        footer: {}
      },
      {
        id: "stat-countries",
        className: "stat",
        body: {
          id: "stat-countries-body",
          className: ""
        },
        fields: [
          {
            id: "stat-countries-value",
            name: "35",
            className: "fw-bold h4 mb-0",
            colClass: "col-12"
          },
          {
            id: "stat-countries-label",
            name: "Countries",
            className: "text-secondary small",
            colClass: "col-12"
          }
        ],
        footer: {}
      }
    ],

    /* Signup block – your existing AlloySignup schema */
    signup: {
      id: "pex-signup",
      title: "precastXchange",
      description: "Create your account to access the full marketplace.",
      className: "bg-white p-3 p-lg-4 rounded-2xl shadow-soft border search-wrap",
      signinText: "Already have an account?",
      termsAndPrivacy: "By signing up, you agree to our",
      form: {
        title: "",
        className: "col-10 mx-auto",
        message: "",
        action: "signup",
        type: "AlloyInputFloatingText",
        fields: [
          {
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "you@example.com",
            layout: "floating",
            icon: {
              iconClass: "fa-regular fa-envelope"
            },
            required: true,
            value: "",
            className: "form-control"
          }
        ],
        submit: {
          name: "Sign Up",
          icon: {
            iconClass: "fa-solid fa-circle-notch fa-spin"
          },
          className: "btn btn-primary w-100 mt-3",
          disabled: false,
          loading: false,
          ariaLabel: "Create account",
          title: "Create account"
        }
      },
      signin: {
        href: "/signin",
        name: "Sign in",
        className: "text-primary text-decoration-underline d-inline"
      },
      terms: {
        href: "/terms",
        name: "Terms of Service",
        className: "text-primary text-decoration-underline d-inline"
      },
      privacy: {
        href: "/privacy",
        name: "Privacy Policy",
        className: "text-primary text-decoration-underline d-inline"
      }
    }
  },
  null,
  2
);

/* ------------------------------------------------------------------
 * Demo page – AlloyHeroSignup
 * ------------------------------------------------------------------ */
export default function HeroSignupPage() {
  const [heroJson, setHeroJson] = useState(DEFAULT_HERO_JSON);
  const [heroParseError, setHeroParseError] = useState("");
  const [heroOutputJson, setHeroOutputJson] = useState(
    "// Submit the signup form to see OutputObject here…"
  );

  const heroModel = useMemo(() => {
    try {
      const raw = JSON.parse(heroJson || "{}");

      // Hydrate nested signup into SignupObject so AlloySignup works as in your app
      const signupModel =
        raw.signup instanceof SignupObject
          ? raw.signup
          : raw.signup
          ? new SignupObject(raw.signup)
          : null;

      const model = new HeroSignupObject({
        ...raw,
        signup: signupModel
      });

      setHeroParseError("");
      return model;
    } catch (e) {
      setHeroParseError(String(e.message || e));

      // Fallback minimal model that still renders
      return new HeroSignupObject({
        name: "AlloyHeroSignup",
        title: "Invalid JSON.",
        subTitle: "Please fix the config on the left and try again."
      });
    }
  }, [heroJson]);

  function handleHeroOutput(out) {
    const payload =
      out instanceof OutputObject && typeof out.toJSON === "function"
        ? out.toJSON()
        : out;

    setHeroOutputJson(JSON.stringify(payload, null, 2));
  }

  function resetHero() {
    setHeroJson(DEFAULT_HERO_JSON);
    setHeroParseError("");
    setHeroOutputJson(
      "// Submit the signup form to see OutputObject here…"
    );
  }

  function formatHero() {
    try {
      const parsed = JSON.parse(heroJson);
      setHeroJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; error already visible
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyHeroSignup</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
{`const heroObject = {
  // id, name, className, title, subTitle,
  // action, stats[], signup
};

<AlloyHeroSignup
  hero={new HeroSignupObject(heroObject)}
  output={handleOutput}
/>`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview – EXACT layout as your hero + signup section */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyHeroSignup hero={heroModel} output={handleHeroOutput} />
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* LEFT: Hero JSON editor */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Hero Input JSON (editable)
            </span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={resetHero}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={formatHero}
                title="Format JSON"
              >
                <i
                  className="fa-solid fa-wand-magic-sparkles me-2"
                  aria-hidden="true"
                />
                Format
              </button>
            </div>
          </div>

          <textarea
            className={`form-control font-monospace ${
              heroParseError ? "is-invalid" : ""
            }`}
            rows={22}
            value={heroJson}
            onChange={(e) => setHeroJson(e.target.value)}
            spellCheck={false}
          />
          {heroParseError && (
            <div className="invalid-feedback d-block mt-1">
              {heroParseError}
            </div>
          )}

          <div className="form-text">
            Tweak <code>action.links</code> for CTAs,{" "}
            <code>stats[]</code> for the chips, and{" "}
            <code>signup</code> for the right-hand form.
          </div>
        </div>

        {/* RIGHT: Output JSON from AlloySignup inside hero */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Output (from <code>output</code> callback)
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => setHeroOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={heroOutputJson}
            readOnly
            spellCheck={false}
          />

          <div className="form-text">
            Example signup submit:
            <pre className="bg-light border rounded-3 p-2 mt-2 small mb-2">
{`{
  "id": "pex-signup",
  "type": "form",
  "action": "signup",
  "error": false,
  "data": {
    "email": "user@example.com"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
