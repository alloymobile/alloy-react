import React, { useMemo, useRef, useState } from "react";

let __logoLinkCounter = 0;
function nextLogoLinkId() {
  __logoLinkCounter += 1;
  return `alloyLinkLogo${__logoLinkCounter}`;
}

function useActiveClassLogo(className = "", active = "") {
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

export class LinkLogoObject {
  /**
   * @param {{ id?: string, name?: string, link: string, logo: string, width?: number|string, height?: number|string, logoAlt?: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e:any)=>void, title?: string }} p
   */
  constructor({
    id,
    name,
    href,
    logo,
    width,
    height,
    logoAlt = "",
    className,
    active,
    target,
    rel,
    onClick,
    title,
  }) {
    if (!href) throw new Error("LinkLogoObject requires `href`.");
    if (!logo) throw new Error("LinkLogoObject requires `logo`.");
    this.id = id ?? nextLogoLinkId();
    this.name = name; 
    this.href = href;
    this.logo = logo;
    this.width = width;
    this.height = height;
    this.logoAlt = logoAlt;
    this.className = className ?? "";
    this.active = active ?? "";
    this.target = target;
    this.rel = rel;
    this.onClick = onClick;
    this.title = title;
  }
}

export function AlloyLinkLogo({ linkLogo }) {
  if (!linkLogo || !(linkLogo instanceof LinkLogoObject)) {
    throw new Error("AlloyLinkLogo requires `linkLogo` (LinkLogoObject instance).");
  }
  const autoId = useRef(linkLogo.id);
  const { className, events } = useActiveClassLogo(linkLogo.className, linkLogo.active);
  const rel =
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
      rel={rel}
      onClick={linkLogo.onClick}
      title={linkLogo.title}
      {...events}
    >
      <span>
        <img
          src={linkLogo.logo}
          alt={linkLogo.logoAlt || linkLogo.name}
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