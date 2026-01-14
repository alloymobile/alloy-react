// src/utils/idHelper.js (BlockObject excerpt)

import { IconObject } from "../components/cell/AlloyIcon.jsx";
import { ButtonIconObject } from "../components/cell/AlloyButtonIcon.jsx";
import { LinkIconObject } from "../components/cell/AlloyLinkIcon.jsx";
import { QuantityObject } from "../components/cell/AlloyQuantity.jsx";
import { MediaObject } from "../components/cell/AlloyMedia.jsx";

/* ----------------------------- helpers ----------------------------- */

let idCounter = 0;

export function generateId(prefix = "id") {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/* ----------------------------- LogoObject ----------------------------- */

export class LogoObject {
  constructor(logo = {}) {
    const toSize = (v) => {
      if (v == null) return undefined;
      if (typeof v === "number" && Number.isFinite(v)) return v; // React => px
      if (typeof v === "string" && v.trim()) return v.trim();   // e.g. "180px", "auto", "10rem"
      return undefined;
    };

    this.id = logo.id ?? generateId("logo");
    this.imageUrl = typeof logo.imageUrl === "string" ? logo.imageUrl : "";
    this.alt = typeof logo.alt === "string" ? logo.alt : "Logo";
    this.width = toSize(logo.width);
    this.height = toSize(logo.height);
    this.className = typeof logo.className === "string" ? logo.className : "";
  }
}


/* ----------------------------- TagObject ----------------------------- */

/* ----------------------------- TagObject ----------------------------- */

export class TagObject {
  constructor(tag = {}) {
    this.id = tag.id ?? generateId("tag");
    this.name = typeof tag.name === "string" ? tag.name : "";
    this.className = typeof tag.className === "string" ? tag.className : "badge bg-secondary";
    this.title = typeof tag.title === "string" ? tag.title : "";
  }
}

/* ----------------------------- OutputObject ----------------------------- */

export class OutputObject {
  constructor(cfg = {}) {
    this.id = cfg.id ?? "";
    this.type = cfg.type ?? "";
    this.action = cfg.action ?? "";
    this.error = !!cfg.error;
    this.errorMessage = Array.isArray(cfg.errorMessage) ? cfg.errorMessage : [];
    this.data = cfg.data && typeof cfg.data === "object" ? cfg.data : {};
  }

  static ok(cfg = {}) {
    return new OutputObject({ ...cfg, error: false, errorMessage: [] });
  }

  static err(cfg = {}, messages = []) {
    return new OutputObject({
      ...cfg,
      error: true,
      errorMessage: Array.isArray(messages) ? messages : [messages],
    });
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type,
      action: this.action,
      error: this.error,
      errorMessage: this.errorMessage,
      data: this.data,
    };
  }
}

/* ----------------------------- useDomId hook ----------------------------- */

import { useRef } from "react";

export function useDomId(prefix = "id", providedId) {
  const idRef = useRef(providedId || null);
  if (!idRef.current) {
    idRef.current = generateId(prefix);
  }
  return idRef.current;
}

/* ----------------------------- BlockObject ----------------------------- */

/**
 * BlockObject - Universal field container for card layouts
 *
 * Supports rendering ONE of the following (checked in priority order):
 *   1. media      → AlloyMedia (gallery with images/videos/3D)
 *   2. logo       → <img> (simple image)
 *   3. icon       → AlloyIcon
 *   4. tags       → vertical stack of badges
 *   5. quantity   → AlloyQuantity (number input with +/- buttons)
 *   6. buttonIcon → AlloyButtonIcon (icon button for actions)
 *   7. linkIcon   → AlloyLinkIcon (icon link for navigation)
 *   8. name       → plain text (fallback)
 */
export class BlockObject {
  constructor(block = {}) {
    this.id = block.id ?? generateId("block");

    this.name = typeof block.name === "string" ? block.name : "";

    // Inner styles
    this.className = block.className ?? "";

    // Outer grid width – default full width
    this.colClass = block.colClass ?? "col-12";

    this.ariaLabel =
      typeof block.ariaLabel === "string" ? block.ariaLabel : this.name || "";

    /* ----- Icon ----- */
    const rawIcon =
      block.icon || (block.iconClass ? { iconClass: block.iconClass } : null);
    this.icon = rawIcon
      ? rawIcon instanceof IconObject
        ? rawIcon
        : new IconObject(rawIcon)
      : null;

    /* ----- Logo ----- */
    const rawLogo = block.logo || null;
    this.logo = rawLogo
      ? rawLogo instanceof LogoObject
        ? rawLogo
        : new LogoObject(rawLogo)
      : null;

    /* ----- Tags (stacked badges) ----- */
    const rawTags = Array.isArray(block.tags) ? block.tags : [];
    this.tags = rawTags
      .filter(Boolean)
      .map((t) => (t instanceof TagObject ? t : new TagObject(t || {})));

    /* ----- Quantity (AlloyQuantity) ----- */
    const rawQuantity = block.quantity || null;
    if (rawQuantity) {
      const quantityCfg = {
        name: this.name || this.id,
        ...rawQuantity,
      };
      this.quantity =
        rawQuantity instanceof QuantityObject
          ? rawQuantity
          : new QuantityObject(quantityCfg);
    } else {
      this.quantity = null;
    }

    /* ----- ButtonIcon (AlloyButtonIcon) ----- */
    const rawButtonIcon = block.buttonIcon || null;
    if (rawButtonIcon) {
      this.buttonIcon =
        rawButtonIcon instanceof ButtonIconObject
          ? rawButtonIcon
          : new ButtonIconObject(rawButtonIcon);
    } else {
      this.buttonIcon = null;
    }

    /* ----- LinkIcon (AlloyLinkIcon) ----- */
    const rawLinkIcon = block.linkIcon || null;
    if (rawLinkIcon) {
      this.linkIcon =
        rawLinkIcon instanceof LinkIconObject
          ? rawLinkIcon
          : new LinkIconObject(rawLinkIcon);
    } else {
      this.linkIcon = null;
    }

    /* ----- Media (AlloyMedia) ----- */
    const rawMedia = block.media || null;
    if (rawMedia) {
      this.media =
        rawMedia instanceof MediaObject
          ? rawMedia
          : new MediaObject(rawMedia);
    } else {
      this.media = null;
    }
  }

  /* ----- Type checks (priority order for rendering) ----- */

  hasMedia() {
    return !!(this.media && this.media.items && this.media.items.length > 0);
  }

  hasLogo() {
    return !!(this.logo && this.logo.imageUrl);
  }

  hasIcon() {
    return !!(this.icon && this.icon.iconClass);
  }

  hasTags() {
    return (
      Array.isArray(this.tags) &&
      this.tags.some((t) => t && t.name && t.name.trim().length > 0)
    );
  }

  hasQuantity() {
    return !!(this.quantity && this.quantity.name);
  }

  hasButtonIcon() {
    return !!(this.buttonIcon && this.buttonIcon.icon);
  }

  hasLinkIcon() {
    return !!(this.linkIcon && this.linkIcon.to);
  }

  hasText() {
    return !!(this.name && this.name.trim().length > 0);
  }

  getContentType() {
    if (this.hasMedia()) return "media";
    if (this.hasLogo()) return "logo";
    if (this.hasIcon()) return "icon";
    if (this.hasTags()) return "tags";
    if (this.hasQuantity()) return "quantity";
    if (this.hasButtonIcon()) return "buttonIcon";
    if (this.hasLinkIcon()) return "linkIcon";
    if (this.hasText()) return "text";
    return "empty";
  }
}

export default BlockObject;