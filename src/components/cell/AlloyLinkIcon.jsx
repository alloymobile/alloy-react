import React, { useMemo, useRef, useState } from "react";
import { AlloyIcon,  IconObject } from "./AlloyIcon";

let __iconLinkCounter = 0;
function nextLinkIconId() {
  __iconLinkCounter += 1;
  return `alloylink${__iconLinkCounter}`;
}

function useActiveClassIcon(className = "", active = "") {
  const [h, setH] = useState(false);
  const [p, setP] = useState(false);
  const [f, setF] = useState(false);
  const merged = useMemo(
    () => [className, (h || p || f) && active].filter(Boolean).join(" "),
    [className, active, h, p, f]
  );
  return {
    className: merged,
    events: {
      onMouseEnter: () => setH(true),
      onMouseLeave: () => {
        setH(false);
        setP(false);
      },
      onMouseDown: () => setP(true),
      onMouseUp: () => setP(false),
      onFocus: () => setF(true),
      onBlur: () => setF(false),
    },
  };
}

export class LinkIconObject {
  /**
   * @param {{ id?: string, link: string, icon: Icon, name?: string, gap?: string|number, className?: string, active?: string, target?: string, rel?: string, onClick?: (e:any)=>void, title?: string }} p
   */
  constructor({
    id,
    href,
    icon,
    name,
    gap = ".5rem",
    className,
    active,
    target,
    rel,
    onClick,
    title,
  }) {
    if (!href) throw new Error("LinkIconObject requires `href`.");
    if (!icon || !(icon instanceof IconObject))
      throw new Error("LinkIconObject requires `icon` (Icon instance).");
    this.id = id ?? nextLinkIconId();
    this.href = href;
    this.icon = icon;
    this.name = name; 
    this.gap = gap;
    this.className = className ?? "";
    this.active = active ?? "";
    this.target = target;
    this.rel = rel;
    this.onClick = onClick;
    this.title = title;
  }
}

export function AlloyLinkIcon({ linkIcon }) {
  if (!linkIcon || !(linkIcon instanceof LinkIconObject)) {
    throw new Error("AlloyLinkIcon requires `linkIcon` (LinkIconObject instance).");
  }
  const autoId = useRef(linkIcon.id);
  const { className, events } = useActiveClassIcon(linkIcon.className, linkIcon.active);
  const rel =
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
      rel={rel}
      onClick={linkIcon.onClick}
      title={linkIcon.title}
      {...events}
    >
      <span
        style={{
          display: "inline-flex",
          alignlinks: "center",
          gap: hasLabel ? linkIcon.gap : 0,
        }}
      >
        <AlloyIcon icon={linkIcon.icon} />
        {hasLabel && <span>{linkIcon.name}</span>}
      </span>
    </a>
  );
}
export default AlloyLinkIcon;