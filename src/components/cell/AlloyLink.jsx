import React, { useMemo, useRef, useState } from "react";

let __linkCounter = 0;
function nextLinkId() {
  __linkCounter += 1;
  return `alloylink${__linkCounter}`;
}

// ---- Active class hook ----
function useActiveClass(className = "", active = "") {
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

// ---- Classes ----
export class LinkObject {
  /**
   * @param {{ id?: string, name?: string, link: string, className?: string, active?: string, target?: string, rel?: string, onClick?: (e: any)=>void, title?: string }} p
   */
  constructor({
    id,
    name,
    href,
    className,
    active,
    target,
    rel,
    onClick,
    title,
  }) {
    if (!href) throw new Error("LinkObject requires `href`.");
    this.id = id ?? nextLinkId();
    this.name = name; 
    this.href = href;
    this.className = className ?? "";
    this.active = active ?? "";
    this.target = target;
    this.rel = rel;
    this.onClick = onClick;
    this.title = title;
  }
}

// ---- Component ----
/**
 * AlloyLink — accepts ONLY a LinkObject instance via `link`.
 */
export function AlloyLink({ link }) {
  if (!link || !(link instanceof LinkObject)) {
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  }
  if (!link.name) throw new Error("AlloyLink requires `link.name`.");

  const autoId = useRef(link.id);
  const { className, events } = useActiveClass(link.className, link.active);
  const rel =
    link.target === "_blank"
      ? link.rel
        ? `${link.rel} noopener noreferrer`
        : "noopener noreferrer"
      : link.rel;

  return (
    <a
      id={autoId.current}
      href={link.href}
      className={className}
      target={link.target}
      rel={rel}
      onClick={link.onClick}
      title={link.title}
      {...events}
    >
      <span>{link.name}</span>
    </a>
  );
}
export default AlloyLink;