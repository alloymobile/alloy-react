import React, { useMemo, useRef, useState } from "react";
import { generateId } from "../../utils/idHelper.js";

/* -------------------------------------------
 * Hook: useActiveClassLogo
 *
 * Same pattern as useActiveClass / useActiveClassIcon:
 * returns merged className and a bundle of event handlers
 * based on hover / press / focus.
 * ----------------------------------------- */
function useActiveClassLogo(className = "", active = "") {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);

  const merged = useMemo(() => {
    const on = hovered || pressed || focused;
    return [className, on && active].filter(Boolean).join(" ");
  }, [className, active, hovered, pressed, focused]);

  return {
    className: merged,
    events: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => {
        setHovered(false);
        setPressed(false);
      },
      onMouseDown: () => setPressed(true),
      onMouseUp: () => setPressed(false),
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    },
  };
}

/* -------------------------------------------
 * LinkLogoObject
 *
 * Data model for AlloyLinkLogo.
 * This is "link + brand image (logo)" instead of icon/font.
 *
 * It:
 *  - validates required fields (href, logo)
 *  - ensures it always has an id
 *  - normalizes defaults
 *  - provides fallback for title
 *
 * After construction, AlloyLinkLogo can trust it.
 * ----------------------------------------- */

/**
 * @typedef {Object} LinkLogoConfig
 * @property {string} href                        - Required. Destination URL/path.
 * @property {string} logo                        - Required. <img src="..."> URL.
 * @property {string} [id]                        - Optional. DOM id. Auto-generated if missing.
 * @property {string} [name]                      - Optional. Visible label text after the logo.
 * @property {number|string} [width]              - Optional. Logo width (px, number, etc.).
 * @property {number|string} [height]             - Optional. Logo height.
 * @property {string} [logoAlt]                   - Optional. alt text for the <img>. Defaults to name.
 * @property {string} [className]                 - Optional. Base classes for <a>.
 * @property {string} [active]                    - Optional. Classes applied on hover/press/focus.
 * @property {string} [target]                    - Optional. e.g. "_blank".
 * @property {string} [rel]                       - Optional. e.g. "nofollow".
 * @property {(e:any)=>void} [onClick]            - Optional. Custom click handler
 *                                                  (preventDefault()+navigate(), analytics, etc.).
 * @property {string} [title]                     - Optional. Tooltip text. Defaults to `name`.
 */
export class LinkLogoObject {
  /**
   * @param {LinkLogoConfig} linkLogo
   */
  constructor(linkLogo = {}) {
    if (!linkLogo.href) {
      throw new Error("LinkLogoObject requires `href`.");
    }
    if (!linkLogo.logo) {
      throw new Error("LinkLogoObject requires `logo`.");
    }

    this.id = linkLogo.id ?? generateId("link-logo");
    this.name = linkLogo.name;
    this.href = linkLogo.href;
    this.logo = linkLogo.logo;
    this.width = linkLogo.width;
    this.height = linkLogo.height;
    this.logoAlt = linkLogo.logoAlt ?? linkLogo.name ?? "";
    this.className = linkLogo.className ?? "nav-link";
    this.active = linkLogo.active ?? "";
    this.target = linkLogo.target;
    this.rel = linkLogo.rel;
    this.onClick = linkLogo.onClick;
    this.title = linkLogo.title ?? linkLogo.name;
  }
}

/* -------------------------------------------
 * AlloyLinkLogo
 *
 * Props:
 *   { linkLogo: LinkLogoObject }
 *
 * Renders an <a> with:
 *   - a logo <img />
 *   - optional text label right after the logo
 *
 * Behavior:
 *   - className changes on hover/press/focus via useActiveClassLogo
 *   - "noopener noreferrer" is auto-added for target="_blank"
 *   - onClick is passed through for custom logic (navigate(), analytics, etc.)
 * ----------------------------------------- */
export function AlloyLinkLogo({ linkLogo }) {
  if (!linkLogo || !(linkLogo instanceof LinkLogoObject)) {
    throw new Error(
      "AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance)."
    );
  }

  // Keep the id stable across re-renders
  const autoId = useRef(linkLogo.id);

  // Build visual state classes + event handlers
  const { className, events } = useActiveClassLogo(
    linkLogo.className,
    linkLogo.active
  );

  // Safe rel behavior for external targets
  const safeRel =
    linkLogo.target === "_blank"
      ? linkLogo.rel
        ? `${linkLogo.rel} noopener noreferrer`
        : "noopener noreferrer"
      : linkLogo.rel;

  const hasLabel = Boolean(linkLogo.name);

  return (
    <a
      id={autoId.current}
      href={linkLogo.href}
      className={className}
      target={linkLogo.target}
      rel={safeRel}
      onClick={linkLogo.onClick}
      title={linkLogo.title}
      {...events}
    >
      <span className="d-inline-flex align-items-center">
        <img
          src={linkLogo.logo}
          alt={linkLogo.logoAlt || linkLogo.name || ""}
          width={linkLogo.width}
          height={linkLogo.height}
          style={{ display: "inline-block" }}
        />
        {hasLabel && <span className="px-1">{linkLogo.name}</span>}
      </span>
    </a>
  );
}

export default AlloyLinkLogo;
