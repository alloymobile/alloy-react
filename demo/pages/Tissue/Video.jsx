// demo/pages/Tissue/Video.jsx
import React, { useMemo, useState } from "react";

import { AlloyVideo, VideoObject } from "../../../src";

/* -------------------------------------------------------
 * DEFAULT JSON CONFIG (VideoObject)
 * ----------------------------------------------------- */
const DEFAULT_VIDEO_JSON = JSON.stringify(
  {
    id: "demoVideo",
    className: "card h-100 rounded-3 shadow-sm",

    // BlockObject-like header (can include iconClass)
    header: {
      name: "Precast Training Session",
      className: "card-title mb-1",
      iconClass: "fa-solid fa-chalkboard-teacher"
    },

    // BlockObject-like body (main title)
    body: {
      name: "ASTRO™ Wet-Cast Line — Operator Overview",
      className: "fw-semibold"
    },

    // At least 1 field (BlockObject). These become info lines.
    fields: [
      {
        id: "subtitle",
        name: "Introduction to cycle times, safety zones and crane interface.",
        className: "small text-secondary"
      },
      {
        id: "description",
        name: "Use this clip to onboard new operators on batching sequence, casting order and curing workflow.",
        className: "mt-3 text-secondary small"
      },
      {
        id: "badge",
        name: "Internal Training",
        className:
          "badge text-bg-primary-subtle text-primary d-inline-block mt-2"
      }
    ],

    // Optional footer (BlockObject)
    footer: {
      id: "videoFooter",
      name: "Use in LMS or embed on your operator portal.",
      className:
        "mt-3 small text-muted d-flex justify-content-between align-items-center"
    },

    // REQUIRED: video (VideoMediaObject)
    video: {
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: "https://picsum.photos/seed/videoposter/900/500",
      caption: "Sample training clip — replace with your own precast walkthrough.",
      controls: true,
      autoPlay: false,
      loop: false,
      muted: false,
      playsInline: true
    }
  },
  null,
  2
);

/* -------------------------------------------------------
 * DEMO PAGE
 * ----------------------------------------------------- */
export default function VideoPage() {
  const [videoJson, setVideoJson] = useState(DEFAULT_VIDEO_JSON);
  const [parseError, setParseError] = useState("");
  const [infoText, setInfoText] = useState(
    `// AlloyVideo is purely visual.
// It does not emit OutputObject.
// Use it when you just need a video inside a card frame.
// For clickable CTAs and events, use AlloyCardVideo.`
  );

  const videoModel = useMemo(() => {
    try {
      const raw = JSON.parse(videoJson || "{}");
      const model = new VideoObject(raw);
      setParseError("");
      return model;
    } catch (e) {
      setParseError(String(e.message || e));

      // Safe fallback: must satisfy VideoObject rules
      return new VideoObject({
        className: "card h-100 rounded-3 border border-danger-subtle",
        header: {
          name: "Invalid JSON",
          className: "card-title mb-1 text-danger",
          iconClass: "fa-solid fa-triangle-exclamation"
        },
        body: {
          name: "Fix JSON on the left to preview the real video card.",
          className: "small text-secondary"
        },
        fields: [
          {
            id: "fallback-line",
            name: "This is a fallback AlloyVideo card.",
            className: "small text-secondary"
          }
        ],
        footer: {
          name: "VideoObject still requires fields[] and a valid video.src.",
          className: "mt-2 small text-muted"
        },
        video: {
          src: "https://www.w3schools.com/html/mov_bbb.mp4",
          poster: "https://picsum.photos/seed/fallbackvideo/900/500",
          caption: "Fallback sample video — replace JSON on the left."
        }
      });
    }
  }, [videoJson]);

  function resetJson() {
    setVideoJson(DEFAULT_VIDEO_JSON);
    setParseError("");
    setInfoText(
      `// AlloyVideo is purely visual.
// It does not emit OutputObject.
// Use it when you just need a video inside a card frame.
// For clickable CTAs and events, use AlloyCardVideo.`
    );
  }

  function formatJson() {
    try {
      const parsed = JSON.parse(videoJson);
      setVideoJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error already shown
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyVideo</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyVideo video={new VideoObject(videoObject)} />`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12 col-md-8 mx-auto">
          <AlloyVideo video={videoModel} />
        </div>
      </div>

      {/* JSON in / Info out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Video Input JSON (editable)</span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={resetJson}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={formatJson}
                title="Format JSON"
              >
                <i
                  className="fa-solid fa-wand-magic-sparkles me-1"
                  aria-hidden="true"
                />
                Format
              </button>
            </div>
          </div>

          <textarea
            className={`form-control font-monospace ${
              parseError ? "is-invalid" : ""
            }`}
            rows={22}
            value={videoJson}
            onChange={(e) => setVideoJson(e.target.value)}
            spellCheck={false}
          />
          {parseError && (
            <div className="invalid-feedback d-block mt-1">
              {parseError}
            </div>
          )}

          <div className="form-text">
            Required pieces:
            <ul className="mb-0">
              <li>
                <code>header</code> and <code>body</code> →{" "}
                <code>BlockObject</code>-style blocks (title/meta).
              </li>
              <li>
                <code>fields[]</code> → at least one line of text (subtitle,
                description, status, etc.).
              </li>
              <li>
                <code>video.src</code> → required video URL; other video props
                are optional.
              </li>
              <li>
                Optional <code>footer</code> for helper text or tags.
              </li>
              <li>
                <code>link</code> is reserved for schema parity with{" "}
                <code>ImageObject</code> but not used by <code>AlloyVideo</code>{" "}
                itself.
              </li>
            </ul>
          </div>
        </div>

        {/* Right: info / docs (no OutputObject) */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Notes (AlloyVideo is visual only)
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => setInfoText("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={infoText}
            onChange={(e) => setInfoText(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            This component is intended for embedded video previews:
            <ul className="mb-0">
              <li>No quantity controls, no OutputObject events.</li>
              <li>
                Use it to drop training clips, walkthroughs, or marketing videos
                into dashboards and detail pages.
              </li>
              <li>
                For actions (enrol, watch later, share, etc.), combine with{" "}
                <code>AlloyCardVideo</code> or other action-oriented tissues.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
