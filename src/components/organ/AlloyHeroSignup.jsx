// src/lib/components/organ/AlloyHeroSignup.jsx
import React from "react";
import { generateId } from "../../utils/idHelper.js";
import AlloyLinkBar, { LinkBarObject } from "../tissue/AlloyLinkBar.jsx";
import { CardObject } from "../tissue/AlloyCard.jsx";
import AlloySignup from "./AlloySignup.jsx";

/* -------------------------------------------------------
 * HeroSignupObject (model)
 *
 * Fields:
 *  - id:        string
 *  - name:      string            // kicker text ("Empowering Precast & Concrete")
 *  - className: string            // section classes
 *  - title:     string            // H1 text, with optional [[highlight]] markers
 *  - subTitle:  string            // lead paragraph
 *
 *  - action:  LinkBarObject|null  // CTA row (e.g. Explore / Add Foundry)
 *  - stats:   CardObject[]        // stat chips under hero text
 *  - signup:  any                 // passed straight to <AlloySignup />
 *  - heading: CardObject|null     // (optional, unused in layout for now)
 * ----------------------------------------------------- */
export class HeroSignupObject {
  constructor(cfg = {}) {
    const {
      id,
      name,
      className,
      title,
      subTitle,
      action,
      stats,
      signup,
      heading,
      ...rest
    } = cfg || {};

    this.id = id ?? generateId("hero-signup");
    this.name = typeof name === "string" ? name : "";

    this.className =
      typeof className === "string" && className.trim().length > 0
        ? className
        : "hero py-2 py-lg-2 position-relative overflow-hidden";

    // Supports [[highlight]] markers in the string
    this.title = typeof title === "string" ? title : "";
    this.subTitle = typeof subTitle === "string" ? subTitle : "";

    // action → LinkBarObject or null
    this.action =
      action instanceof LinkBarObject
        ? action
        : action
        ? new LinkBarObject(action)
        : null;

    // stats → CardObject[]
    const rawStats = Array.isArray(stats) ? stats : [];
    this.stats = rawStats.map((c) =>
      c instanceof CardObject ? c : new CardObject(c || {})
    );

    // signup → passed as-is to <AlloySignup />
    this.signup = signup || null;

    // heading → optional CardObject (not used in this layout yet)
    this.heading =
      heading instanceof CardObject
        ? heading
        : heading
        ? new CardObject(heading)
        : null;

    Object.assign(this, rest);
  }
}

/* -------------------------------------------------------
 * Helper: renderHighlightedText
 *
 * Input string can contain [[...]] which will be wrapped
 * in <span class="text-primary">...</span>.
 *
 * Example:
 *   "A [[bold]] title"
 * → ["A ", <span class="text-primary">bold</span>, " title"]
 * ----------------------------------------------------- */
function renderHighlightedText(text) {
  if (!text || typeof text !== "string") return text;

  const parts = [];
  let cursor = 0;
  let index = 0;

  while (cursor < text.length) {
    const start = text.indexOf("[[", cursor);

    // no more markers → push the rest and break
    if (start === -1) {
      parts.push(text.slice(cursor));
      break;
    }

    // push any plain text before [[
    if (start > cursor) {
      parts.push(text.slice(cursor, start));
    }

    const end = text.indexOf("]]", start + 2);

    // unmatched [[ → treat as plain text
    if (end === -1) {
      parts.push(text.slice(start));
      break;
    }

    const highlighted = text.slice(start + 2, end);

    parts.push(
      <span key={`hero-h-${index}`} className="text-primary">
        {highlighted}
      </span>
    );
    index += 1;
    cursor = end + 2;
  }

  return parts;
}

/* -------------------------------------------------------
 * AlloyHeroSignup (view)
 *
 * Props:
 *   - hero:   HeroSignupObject (required)
 *   - output: (out) => void     (proxied to AlloySignup)
 *
 * Layout matches:
 *   <section class="hero ...">
 *     .container
 *       .row
 *         .col-lg-7  (kicker, h1, lead, actions, stats)
 *         .col-lg-5  (signup block)
 * ----------------------------------------------------- */
export function AlloyHeroSignup({ hero, output }) {
  if (!hero || !(hero instanceof HeroSignupObject)) {
    throw new Error(
      "AlloyHeroSignup requires `hero` (HeroSignupObject instance)."
    );
  }

  const hasStats = Array.isArray(hero.stats) && hero.stats.length > 0;

  return (
    <section id={hero.id} className={hero.className}>
      <div className="container position-relative">
        <div className="row align-items-center g-5">
          {/* Left column: text + actions + stats */}
          <div className="col-lg-7">
            {/* Kicker */}
            {hero.name && (
              <span className="kicker mb-2">
                <i className="fa-solid fa-bolt" /> {hero.name}
              </span>
            )}

            {/* Title with [[highlight]] support */}
            {hero.title && (
              <h1 className="display-5 fw-bold mt-2">
                {renderHighlightedText(hero.title)}
              </h1>
            )}

            {/* Sub-title / lead */}
            {hero.subTitle && (
              <p className="lead text-secondary mt-3">{hero.subTitle}</p>
            )}

            {/* CTA row: use LinkBar inside the same flex wrapper */}
            {hero.action && (
              <div className="d-flex gap-3 mt-4">
                <AlloyLinkBar linkBar={hero.action} />
              </div>
            )}

            {/* Stats row: exactly like the static HTML */}
            {hasStats && (
              <div className="d-flex gap-4 mt-4">
                {hero.stats.map((card) => (
                  <div key={card.id} className="stat">
                    <div className="fw-bold h4 mb-0">
                      {/* first field: number, e.g. "1,200+" */}
                      {card.fields?.[0]?.name}
                    </div>
                    <div className="text-secondary small">
                      {/* second field: label, e.g. "Listings live" */}
                      {card.fields?.[1]?.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column: signup (existing AlloySignup) */}
          <div className="col-lg-5">
            {hero.signup && (
              <AlloySignup signup={hero.signup} output={output} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AlloyHeroSignup;
