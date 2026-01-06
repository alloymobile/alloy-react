// src/components/cell/AlloyLink.jsx  (REACT VERSION)
import { useMemo, useState } from "react";
import { useDomId } from "../../utils/idHelper.js";

/* -------------------------------------------
 * useActiveClass (unchanged)
 * ----------------------------------------- */
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

/**
 * @typedef {Object} LinkConfig
 * @property {string} href
 * @property {string} name
 * @property {string} [id]
 * @property {string} [className]
 * @property {string} [active]
 * @property {string} [target]
 * @property {string} [rel]
 * @property {(e:any)=>void} [onClick]
 * @property {string} [title]
 */
export class LinkObject {
  constructor(link = {}) {
    if (!link.href) throw new Error("LinkObject requires `href`.");
    if (!link.name) throw new Error("LinkObject requires `name`.");

    // NOTE: do NOT generate random ids here (Next hydration-safe pattern)
    this.id = link.id;

    this.name = link.name;
    this.href = link.href;
    this.className = link.className ?? "nav-link";
    this.active = link.active ?? "";
    this.target = link.target;
    this.rel = link.rel;
    this.onClick = link.onClick;
    this.title = link.title ?? link.name;
  }
}

export function AlloyLink({ link }) {
  if (!link || !(link instanceof LinkObject)) {
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  }

  const { className, events } = useActiveClass(link.className, link.active);

  const href = link.href || "#";

  const safeRel =
    link.target === "_blank"
      ? link.rel
        ? `${link.rel} noopener noreferrer`
        : "noopener noreferrer"
      : link.rel;

  // SSR/CSR stable id (or provided id)
  const domId = useDomId("link", link.id);

  return (
    <a
      id={domId}
      href={href}
      className={className}
      target={link.target}
      rel={safeRel}
      onClick={link.onClick}
      title={link.title}
      {...events}
    >
      {link.name}
    </a>
  );
}

export default AlloyLink;
