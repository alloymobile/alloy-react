import React, { useMemo, useRef, useState } from "react";
import { AlloyIcon, IconObject } from "./AlloyIcon";
import { generateId } from "../../utils/idHelper.js";

/* -------------------------------------------
 * Hook: useActiveClassIcon
 *
 * Same idea as useActiveClass in AlloyLink:
 * - Tracks hover / press / focus
 * - Returns merged className and the event handlers
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

/* -------------------------------------------
 * LinkIconObject
 *
 * This is the data model for AlloyLinkIcon.
 * It is the "Link + Icon" equivalent of LinkObject.
 *
 * We normalize config, validate required pieces,
 * generate an id if not provided,
 * and ensure `icon` is an IconObject instance.
 * ----------------------------------------- */

/**
 * @typedef {Object} LinkIconConfig
 * @property {string} href                   - Required. Destination URL/path.
 * @property {IconObject|{iconClass:string,id?:string}} icon
 *                                            Required. Either an IconObject or plain
 *                                            { iconClass, id? } that can be turned into one.
 * @property {string} [name]                 - Optional. Visible label text next to the icon.
 * @property {string} [id]                   - Optional. Unique DOM id. Auto-generated if missing.
 * @property {string} [className]            - Optional. Base classes for <a>.
 * @property {string} [active]               - Optional. Classes applied on hover/press/focus.
 * @property {string} [target]               - Optional. e.g. "_blank".
 * @property {string} [rel]                  - Optional. e.g. "nofollow".
 * @property {(e:any)=>void} [onClick]       - Optional. Custom click handler
 *                                             (can preventDefault()+navigate(), analytics, etc.)
 * @property {string} [title]                - Optional. Tooltip/title. Defaults to `name`.
 */
export class LinkIconObject {
  /**
   * @param {LinkIconConfig} linkIcon
   */
  constructor(linkIcon = {}) {
    // required checks
    if (!linkIcon.href) {
      throw new Error("LinkIconObject requires `href`.");
    }
    if (!linkIcon.icon) {
      throw new Error("LinkIconObject requires `icon`.");
    }

    // normalize icon: if caller passed a plain object, wrap it; if it's already IconObject, keep it
    const normalizedIcon =
      linkIcon.icon instanceof IconObject
        ? linkIcon.icon
        : new IconObject(linkIcon.icon);

    // finalize
    this.id = linkIcon.id ?? generateId("link-icon");
    this.href = linkIcon.href;
    this.icon = normalizedIcon;
    this.name = linkIcon.name;
    this.className = linkIcon.className ?? "nav-link";
    this.active = linkIcon.active ?? "";
    this.target = linkIcon.target;
    this.rel = linkIcon.rel;
    this.onClick = linkIcon.onClick;
    this.title = linkIcon.title ?? linkIcon.name;
  }
}

/* -------------------------------------------
 * AlloyLinkIcon
 *
 * Props:
 *   { linkIcon: LinkIconObject }
 *
 * Renders:
 *   <a>
 *     <i .../>
 *     optional text label
 *   </a>
 *
 * Behavior:
 * - Hover/press/focus styling via useActiveClassIcon.
 * - ID is stable across renders via useRef.
 * - Automatically injects "noopener noreferrer" for target="_blank".
 * - Calls linkIcon.onClick when clicked (if provided).
 * ----------------------------------------- */
export function AlloyLinkIcon({ linkIcon }) {
  // dev safety
  if (!linkIcon || !(linkIcon instanceof LinkIconObject)) {
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  }

  // lock the id for stable DOM behavior across re-renders
  const autoId = useRef(linkIcon.id);

  // build active/hover className + mouse/focus handlers
  const { className, events } = useActiveClassIcon(
    linkIcon.className,
    linkIcon.active
  );

  // sanitize rel for security if target is _blank
  const safeRel =
    linkIcon.target === "_blank"
      ? linkIcon.rel
        ? `${linkIcon.rel} noopener noreferrer`
        : "noopener noreferrer"
      : linkIcon.rel;

  const hasLabel = Boolean(linkIcon.name);

  return (
    <a
      id={autoId.current}
      href={linkIcon.href}
      className={className}
      target={linkIcon.target}
      rel={safeRel}
      onClick={linkIcon.onClick}
      title={linkIcon.title}
      {...events}
    >
      <span className="d-inline-flex align-items-center">
        <AlloyIcon icon={linkIcon.icon} />
        {hasLabel && <span className="px-1">{linkIcon.name}</span>}
      </span>
    </a>
  );
}

export default AlloyLinkIcon;
