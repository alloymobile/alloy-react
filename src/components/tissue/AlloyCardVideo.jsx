// src/lib/components/tissue/AlloyCardVideo.jsx
import React from "react";

import { TagObject, OutputObject, generateId } from "../../utils/idHelper.js";

import AlloyButtonBar, { ButtonBarObject } from "./AlloyButtonBar.jsx";
import AlloyLinkBar, { LinkBarObject } from "./AlloyLinkBar.jsx";

/* ------------------------------------------------------------------
 * CardVideoObject
 *
 * A "video card" model, consistent with AlloyCard* patterns.
 *
 * Fields:
 *   - id, className
 *   - header?: TagObject
 *   - title?: string
 *   - description?: string
 *   - src: string (REQUIRED video URL)
 *   - poster?: string
 *   - controls?: boolean
 *   - autoPlay?: boolean
 *   - loop?: boolean
 *   - muted?: boolean
 *   - playsInline?: boolean
 *   - footer?: TagObject
 *
 *   - type: "AlloyButtonBar" | "AlloyLinkBar"
 *   - action: ButtonBarObject | LinkBarObject
 *
 *   - meta?: object (extra payload merged into OutputObject.data)
 * ------------------------------------------------------------------ */
export class CardVideoObject {
  constructor(res = {}) {
    const {
      id,
      className = "card border m-2 shadow",
      header,
      title = "",
      description = "",
      src,
      poster = "",
      controls = true,
      autoPlay = false,
      loop = false,
      muted = false,
      playsInline = true,
      footer,
      type = "AlloyButtonBar",
      action,
      meta = {},
    } = res;

    if (!src || typeof src !== "string") {
      throw new Error("CardVideoObject requires `src` (video URL).");
    }

    this.id = id ?? generateId("card-video");
    this.className = className;

    this.header =
      header instanceof TagObject
        ? header
        : header
        ? new TagObject(header)
        : null;

    this.title = title;
    this.description = description;

    this.src = src;
    this.poster = poster;
    this.controls = !!controls;
    this.autoPlay = !!autoPlay;
    this.loop = !!loop;
    this.muted = !!muted;
    this.playsInline = !!playsInline;

    this.footer =
      footer instanceof TagObject
        ? footer
        : footer
        ? new TagObject(footer)
        : null;

    this.type = type === "AlloyLinkBar" ? "AlloyLinkBar" : "AlloyButtonBar";

    if (this.type === "AlloyLinkBar") {
      this.action =
        action instanceof LinkBarObject
          ? action
          : new LinkBarObject(
              action || {
                id: generateId("video-link-bar"),
                className: "nav gap-2",
                barName: { show: false },
                type: "AlloyLink",
                links: [],
              }
            );
    } else {
      this.action =
        action instanceof ButtonBarObject
          ? action
          : new ButtonBarObject(
              action || {
                id: generateId("video-button-bar"),
                className: "btn-group btn-group-sm",
                barName: { show: false },
                type: "AlloyButton",
                buttons: [],
              }
            );
    }

    this.meta = meta && typeof meta === "object" ? meta : {};
  }
}

/* ------------------------------------------------------------------
 * AlloyCardVideo
 *
 * Props:
 *   - cardVideo: CardVideoObject (required)
 *   - output?: (out: OutputObject) => void
 *
 * Footer click → OutputObject:
 * {
 *   id: "<card-id>",
 *   type: "card-video",
 *   action: "<button/link name>",
 *   error: false,
 *   data: {
 *     src,
 *     title,
 *     description,
 *     ...meta
 *   }
 * }
 * ------------------------------------------------------------------ */
export function AlloyCardVideo({ cardVideo, output }) {
  if (!cardVideo || !(cardVideo instanceof CardVideoObject)) {
    throw new Error(
      "AlloyCardVideo requires `cardVideo` (CardVideoObject instance)."
    );
  }

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  // resolve name → ariaLabel → title → id
  function resolveActionName(self) {
    if (!self || typeof self !== "object") return "";

    const name =
      typeof self.name === "string" ? self.name.trim() : "";
    if (name) return name;

    const aria =
      typeof self.ariaLabel === "string" ? self.ariaLabel.trim() : "";
    if (aria) return aria;

    const title =
      typeof self.title === "string" ? self.title.trim() : "";
    if (title) return title;

    const id =
      typeof self.id === "string" ? self.id.trim() : "";
    if (id) return id;

    return "";
  }

  function makeActionEmitter() {
    return (self, e) => {
      const actionName = resolveActionName(self);

      const data = {
        src: cardVideo.src,
        title: cardVideo.title,
        description: cardVideo.description,
        ...(cardVideo.meta || {}),
      };

      const out = new OutputObject({
        id: cardVideo.id,
        type: "card-video",
        action: actionName,
        error: false,
        errorMessage: [],
        data,
      });

      emit(out);
    };
  }

  /* ----- header ----- */
  const headerSection =
    cardVideo.header && (cardVideo.header.name || cardVideo.header.className) ? (
      <div
        id={cardVideo.header.id}
        className={cardVideo.header.className || "card-header py-2 fw-semibold"}
        aria-label={cardVideo.header.name}
      >
        {cardVideo.header.name}
      </div>
    ) : null;

  /* ----- body (video + text) ----- */
  const bodySection = (
    <div className="card-body">
      {cardVideo.title && (
        <h5 className="card-title mb-2">{cardVideo.title}</h5>
      )}

      <div className="ratio ratio-16x9 mb-2">
        <video
          src={cardVideo.src}
          poster={cardVideo.poster || undefined}
          controls={cardVideo.controls}
          autoPlay={cardVideo.autoPlay}
          loop={cardVideo.loop}
          muted={cardVideo.muted}
          playsInline={cardVideo.playsInline}
          className="w-100 h-100"
        />
      </div>

      {cardVideo.description && (
        <p className="card-text small text-secondary">
          {cardVideo.description}
        </p>
      )}
    </div>
  );

  /* ----- footer (actions) ----- */
  const footerSection = cardVideo.footer ? (
    <div
      id={cardVideo.footer.id}
      className={
        cardVideo.footer.className ||
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2"
      }
      aria-label={cardVideo.footer.name}
    >
      <div className="me-auto small text-muted">
        {cardVideo.footer.name}
      </div>

      <div role="group">
        {cardVideo.type === "AlloyLinkBar" ? (
          <AlloyLinkBar
            linkBar={cardVideo.action}
            output={makeActionEmitter()}
          />
        ) : (
          <AlloyButtonBar
            buttonBar={cardVideo.action}
            output={makeActionEmitter()}
          />
        )}
      </div>
    </div>
  ) : null;

  /* ----- final card ----- */
  return (
    <div id={cardVideo.id} className={cardVideo.className}>
      {headerSection}
      {bodySection}
      {footerSection}
    </div>
  );
}

export default AlloyCardVideo;
