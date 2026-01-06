import React, { useMemo, useState } from "react";
import { useDomId } from "../../utils/idHelper.js";

/* -------------------------------------------
 * Hook: useActiveClassLogo
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

/**
 * @typedef {Object} LinkLogoConfig
 * @property {string} href
 * @property {string} logo
 * @property {string} [id]
 * @property {string} [name]
 * @property {number|string} [width]
 * @property {number|string} [height]
 * @property {string} [logoAlt]
 * @property {string} [className]
 * @property {string} [active]
 * @property {string} [target]
 * @property {string} [rel]
 * @property {(e:any)=>void} [onClick]
 * @property {string} [title]
 * @property {string} [ariaLabel]   - Optional: for logo-only links
 */
export class LinkLogoObject {
  constructor(linkLogo = {}) {
    if (!linkLogo.href) throw new Error("LinkLogoObject requires `href`.");
    if (!linkLogo.logo) throw new Error("LinkLogoObject requires `logo`.");

    // IMPORTANT: no generateId here (SSR-safe pattern)
    this.id = linkLogo.id;

    this.name = linkLogo.name;
    this.href = linkLogo.href;
    this.logo = linkLogo.logo;
    this.width = linkLogo.width;
    this.height = linkLogo.height;

    // alt text: prefer explicit alt, else name, else empty
    this.logoAlt = linkLogo.logoAlt ?? linkLogo.name ?? "";

    this.className = linkLogo.className ?? "nav-link";
    this.active = linkLogo.active ?? "";
    this.target = linkLogo.target;
    this.rel = linkLogo.rel;
    this.onClick = linkLogo.onClick;

    // better defaults
    this.title = linkLogo.title ?? linkLogo.name ?? linkLogo.href;
    this.ariaLabel =
      linkLogo.ariaLabel ?? linkLogo.title ?? linkLogo.name ?? "Link";
  }
}

/* -------------------------------------------
 * AlloyLinkLogo (React)
 * ----------------------------------------- */
export function AlloyLinkLogo({ linkLogo }) {
  if (!linkLogo || !(linkLogo instanceof LinkLogoObject)) {
    throw new Error(
      "AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance)."
    );
  }

  const { className, events } = useActiveClassLogo(
    linkLogo.className,
    linkLogo.active
  );

  const safeRel =
    linkLogo.target === "_blank"
      ? linkLogo.rel
        ? `${linkLogo.rel} noopener noreferrer`
        : "noopener noreferrer"
      : linkLogo.rel;

  const hasLabel = Boolean(linkLogo.name);

  // stable id (or provided id)
  const domId = useDomId("link-logo", linkLogo.id);

  return (
    <a
      id={domId}
      href={linkLogo.href}
      className={className}
      target={linkLogo.target}
      rel={safeRel}
      onClick={linkLogo.onClick}
      title={linkLogo.title}
      aria-label={hasLabel ? undefined : linkLogo.ariaLabel}
      {...events}
    >
      <img
        src={linkLogo.logo}
        alt={linkLogo.logoAlt || linkLogo.name || ""}
        width={linkLogo.width}
        height={linkLogo.height}
        style={{ display: "inline-block" }}
      />
      {hasLabel && <span className="px-1">{linkLogo.name}</span>}
    </a>
  );
}

export default AlloyLinkLogo;
