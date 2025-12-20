import React, { useMemo, useState } from "react";
import { AlloyIcon, IconObject } from "./AlloyIcon";
import { useDomId } from "../../utils/idHelper.js";

/* -------------------------------------------
 * Hook: useActiveClassIcon
 * ----------------------------------------- */
function useActiveClassIcon(className = "", active = "") {
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
 * @typedef {Object} LinkIconConfig
 * @property {string} href
 * @property {IconObject|{iconClass:string,id?:string,className?:string}} icon
 * @property {string} [name]
 * @property {string} [id]
 * @property {string} [className]
 * @property {string} [active]
 * @property {string} [target]
 * @property {string} [rel]
 * @property {(e:any)=>void} [onClick]
 * @property {string} [title]
 * @property {string} [ariaLabel]    - Optional. Helpful for icon-only links
 */
export class LinkIconObject {
  constructor(linkIcon = {}) {
    if (!linkIcon.href) throw new Error("LinkIconObject requires `href`.");
    if (!linkIcon.icon) throw new Error("LinkIconObject requires `icon`.");

    this.id = linkIcon.id; // ✅ no generateId here
    this.href = linkIcon.href;

    this.icon =
      linkIcon.icon instanceof IconObject
        ? linkIcon.icon
        : new IconObject(linkIcon.icon);

    this.name = linkIcon.name;

    this.className = linkIcon.className ?? "nav-link";
    this.active = linkIcon.active ?? "";
    this.target = linkIcon.target;
    this.rel = linkIcon.rel;
    this.onClick = linkIcon.onClick;

    // Better defaults
    this.title = linkIcon.title ?? linkIcon.name ?? linkIcon.href;
    this.ariaLabel = linkIcon.ariaLabel ?? linkIcon.title ?? linkIcon.name ?? "Link";
  }
}

export function AlloyLinkIcon({ linkIcon }) {
  if (!linkIcon || !(linkIcon instanceof LinkIconObject)) {
    throw new Error(
      "AlloyLinkIcon requires `linkIcon` (LinkIconObject instance)."
    );
  }

  // ✅ stable SSR/CSR id (or provided id)
  const domId = useDomId("link-icon", linkIcon.id);

  const { className, events } = useActiveClassIcon(
    linkIcon.className,
    linkIcon.active
  );

  const safeRel =
    linkIcon.target === "_blank"
      ? linkIcon.rel
        ? `${linkIcon.rel} noopener noreferrer`
        : "noopener noreferrer"
      : linkIcon.rel;

  const hasLabel = Boolean(linkIcon.name);

  return (
    <a
      id={domId}
      href={linkIcon.href}
      className={className}
      target={linkIcon.target}
      rel={safeRel}
      onClick={linkIcon.onClick}
      title={linkIcon.title}
      aria-label={hasLabel ? undefined : linkIcon.ariaLabel}
      {...events}
    >
        <AlloyIcon icon={linkIcon.icon} />
        {hasLabel && <span className="px-1">{linkIcon.name}</span>}
    </a>
  );
}

export default AlloyLinkIcon;
