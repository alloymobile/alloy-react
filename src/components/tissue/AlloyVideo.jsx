// src/lib/components/tissue/AlloyVideo.jsx

import React from "react";
import { generateId, BlockObject } from "../../utils/idHelper.js";

/* -------------------------------------------------------
 * VideoMediaObject
 *
 * Single video configuration:
 *  - src:        string   (REQUIRED)
 *  - poster?:    string
 *  - controls?:  boolean  (default true)
 *  - autoPlay?:  boolean
 *  - loop?:      boolean
 *  - muted?:     boolean
 *  - playsInline?: boolean (default true)
 *  - caption?:   string
 * ----------------------------------------------------- */
export class VideoMediaObject {
  constructor(v = {}) {
    this.src = v.src || "";
    this.poster = v.poster || "";

    this.controls =
      typeof v.controls === "boolean" ? v.controls : true;
    this.autoPlay = !!v.autoPlay;
    this.loop = !!v.loop;
    this.muted = !!v.muted;
    this.playsInline =
      typeof v.playsInline === "boolean" ? v.playsInline : true;

    this.caption = v.caption || "";
  }
}

/* -------------------------------------------------------
 * VideoObject
 *
 * Schema aligned with ImageObject / CarouselObject:
 *
 *   - id:        string
 *   - className: string
 *   - link?:     string           // (reserved – not used by AlloyVideo)
 *
 *   - header:    BlockObject      // e.g. category / meta
 *   - body:      BlockObject      // e.g. title / main text
 *   - fields:    BlockObject[]    // e.g. status, description
 *   - footer:    BlockObject      // e.g. badge / note
 *
 *   - video:     VideoMediaObject // REQUIRED
 *
 * Visual-only: no OutputObject, no actions.
 * ----------------------------------------------------- */
export class VideoObject {
  constructor(cfg = {}) {
    const {
      id,
      className = "card h-100 rounded-3",
      link,

      header,
      body,
      fields,
      footer,

      video,
      ...rest
    } = cfg || {};

    this.id = id ?? generateId("video");
    this.className = className;

    // link is reserved to keep parity with ImageObject schema;
    // AlloyVideo itself does not use it for navigation.
    this.link = typeof link === "string" ? link : "";

    // header (optional BlockObject)
    const rawHeader = header ?? {};
    this.header =
      rawHeader instanceof BlockObject
        ? rawHeader
        : new BlockObject(rawHeader);

    // body (required BlockObject – title / main label)
    const rawBody = body ?? {};
    this.body =
      rawBody instanceof BlockObject
        ? rawBody
        : new BlockObject(rawBody);

    // fields (required, at least 1 BlockObject)
    const rawFields = Array.isArray(fields) ? fields : [];
    if (rawFields.length === 0) {
      throw new Error(
        "VideoObject requires at least one field in `fields`."
      );
    }
    this.fields = rawFields.map((f) =>
      f instanceof BlockObject ? f : new BlockObject(f || {})
    );

    // footer (optional BlockObject)
    const rawFooter = footer ?? {};
    this.footer =
      rawFooter instanceof BlockObject
        ? rawFooter
        : new BlockObject(rawFooter);

    // video: REQUIRED
    const rawVideo =
      video instanceof VideoMediaObject
        ? video
        : new VideoMediaObject(video || {});
    if (!rawVideo.src || typeof rawVideo.src !== "string") {
      throw new Error(
        "VideoObject requires `video.src` (video URL string)."
      );
    }
    this.video = rawVideo;

    // Allow extensions (e.g. meta, data)
    Object.assign(this, rest);
  }
}

/* -------------------------------------------------------
 * Helper: render BlockObject
 * ----------------------------------------------------- */
function renderBlock(block, { as: Tag = "div" } = {}) {
  if (!block || !(block instanceof BlockObject)) return null;

  const hasIcon =
    block.icon && typeof block.icon.iconClass === "string";

  return (
    <Tag
      id={block.id}
      className={block.className}
      aria-label={block.ariaLabel}
    >
      {hasIcon && (
        <i
          className={`${block.icon.iconClass} me-1`}
          aria-hidden="true"
        />
      )}
      {block.name}
    </Tag>
  );
}

/* -------------------------------------------------------
 * AlloyVideo
 *
 * Props:
 *   - video: VideoObject
 *
 * Behavior:
 *   - Renders a card frame:
 *       header → BlockObject
 *       body   → BlockObject
 *       fields → BlockObject[]
 *       footer → BlockObject
 *   - Embeds the video in a 16x9 ratio box.
 *
 * Visual-only (no OutputObject, no actions).
 * For action-oriented usage, use AlloyCardVideo.
 * ----------------------------------------------------- */
export function AlloyVideo({ video }) {
  if (!video || !(video instanceof VideoObject)) {
    throw new Error(
      "AlloyVideo requires `video` (VideoObject instance)."
    );
  }

  const v = video.video;

  return (
    <div id={video.id} className={video.className}>
      <div className="card-body">
        {/* Header */}
        {video.header && (
          <div className="mb-2">
            {renderBlock(video.header)}
          </div>
        )}

        {/* Body (title / main text) */}
        {video.body && (
          <div className="mb-2">
            {renderBlock(video.body)}
          </div>
        )}

        {/* Video */}
        <div className="ratio ratio-16x9 mb-2">
          <video
            src={v.src}
            poster={v.poster || undefined}
            controls={v.controls}
            autoPlay={v.autoPlay}
            loop={v.loop}
            muted={v.muted}
            playsInline={v.playsInline}
            className="w-100 h-100 rounded-3"
          />
        </div>

        {/* Video caption (optional) */}
        {v.caption && (
          <div className="small text-secondary mb-2">
            {v.caption}
          </div>
        )}

        {/* Fields */}
        {video.fields && video.fields.length > 0 && (
          <div className="mt-2">
            {video.fields.map((field, idx) => (
              <div key={`${video.id}-field-${idx}`} className="mb-1">
                {renderBlock(field)}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {video.footer && (
          <div className="mt-2">
            {renderBlock(video.footer)}
          </div>
        )}
      </div>
    </div>
  );
}

export default AlloyVideo;
