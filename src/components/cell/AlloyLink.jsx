import { useMemo, useRef, useState } from "react";
import { generateId } from "../../utils/idHelper.js"; 

/* -------------------------------------------
 * Hook: useActiveClass
 *
 * - Takes a base className and an "active" className.
 * - Tracks hover / press / focus.
 * - Returns:
 *    className => merged classes depending on state
 *    events    => mouse/keyboard handlers to drive the state
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

/* -------------------------------------------
 * LinkObject
 *
 * Public shape for AlloyLink.
 * We do NOT destructure in the constructor anymore.
 * We validate required fields, normalize defaults,
 * and guarantee an id.
 * ----------------------------------------- */

/**
 * @typedef {Object} LinkConfig
 * @property {string} href                - Required. Destination URL/path.
 * @property {string} name                - Required. Visible text label.
 * @property {string} [id]                - Optional. If not provided, a unique id is generated.
 * @property {string} [className]         - Optional. Base classes for <a>.
 * @property {string} [active]            - Optional. Classes added on hover/press/focus.
 * @property {string} [target]            - Optional. E.g. "_blank".
 * @property {string} [rel]               - Optional. E.g. "nofollow".
 * @property {(e:any)=>void} [onClick]    - Optional. Click handler (can navigate(), log, preventDefault, etc.).
 * @property {string} [title]             - Optional. Tooltip text. Defaults to `name`.
 */
export class LinkObject {
  /**
   * @param {LinkConfig} link
   */
  constructor(link = {}) {
    if (!link.href) {
      throw new Error("LinkObject requires `href`.");
    }
    if (!link.name) {
      throw new Error("LinkObject requires `name`.");
    }

    this.id = link.id ?? generateId("link");
    this.name = link.name;
    this.href = link.href;
    this.className = link.className ?? "nav-link";
    this.active = link.active ?? "";
    this.target = link.target;
    this.rel = link.rel;
    this.onClick = link.onClick;
    this.title = link.title ?? link.name; // fallback to visible label
  }
}

/* -------------------------------------------
 * AlloyLink Component
 *
 * - Accepts a single prop: { link }
 * - `link` MUST be an instance of LinkObject.
 * - Renders an <a> with:
 *    - stable id via useRef
 *    - hover/active/focus styling from useActiveClass
 *    - safe rel handling for target="_blank"
 *    - optional onClick (consumer logic, e.g. navigate())
 * ----------------------------------------- */

export function AlloyLink({ link }) {
  // Validate prop contract
  if (!link || !(link instanceof LinkObject)) {
    throw new Error("AlloyLink requires `link` (LinkObject instance).");
  }

  // Stabilize DOM id across re-renders so the <a id="..."> doesn't change
  const autoId = useRef(link.id);

  // Merge base class and active class depending on hover/press/focus
  const { className, events } = useActiveClass(link.className, link.active);

  // Security: if opening a new tab, include noopener/noreferrer
  const safeRel =
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
      rel={safeRel}
      onClick={link.onClick}
      title={link.title}
      {...events}
    >
      <span>{link.name}</span>
    </a>
  );
}

export default AlloyLink;
