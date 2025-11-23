// src/pages/Tissue/CardVideo.jsx
import React, { useMemo, useState } from "react";
import { AlloyCardVideo, CardVideoObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------
 * DEFAULT CARD VIDEO JSON CONFIG
 * ----------------------------------------- */

const DEFAULT_CARD_VIDEO_JSON = JSON.stringify(
  {
    id: "demoCardVideo",
    className: "card border m-2 shadow",
    header: {
      id: "videoHeader",
      name: "Featured Product Walkthrough",
      className: "card-header py-2 fw-semibold"
    },
    title: "ASTRO™ Septic Tank Mold — Overview",
    description:
      "Short product video highlighting key features, setup steps, and safety guidelines.",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://www.w3schools.com/html/pic_trulli.jpg",
    controls: true,
    autoPlay: false,
    loop: false,
    muted: false,
    playsInline: true,
    footer: {
      id: "videoFooter",
      name: "Product video · 1:23 min",
      className:
        "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2"
    },
    type: "AlloyButtonBar",
    action: {
      id: "videoActions",
      className: "btn-group btn-group-sm",
      barName: { show: false },
      type: "AlloyButton",
      buttons: [
        {
          id: "watchAgainBtn",
          name: "Watch again",
          className: "btn btn-primary",
          ariaLabel: "Watch video again"
        },
        {
          id: "viewDetailsBtn",
          name: "View details",
          className: "btn btn-outline-secondary",
          ariaLabel: "View product details"
        }
      ]
    },
    meta: {
      productId: "P-1000",
      productName: "ASTRO Septic Tank Mold",
      vendorId: "V-001",
      vendorName: "Astro Forms Inc.",
      price: 25000,
      currency: "CAD"
    }
  },
  null,
  2
);

/* -------------------------------------------
 * Demo Page
 * ----------------------------------------- */

export default function CardVideoPage() {
  const [videoJson, setVideoJson] = useState(DEFAULT_CARD_VIDEO_JSON);
  const [videoParseError, setVideoParseError] = useState("");
  const [videoOutputJson, setVideoOutputJson] = useState(
    "// Click footer actions (Watch again / View details) to see OutputObject here…"
  );

  /* -------------------------------------------
   * Build CardVideoObject from JSON
   * ----------------------------------------- */
  const videoModel = useMemo(() => {
    try {
      const raw = JSON.parse(videoJson || "{}");

      const model = new CardVideoObject(raw);
      setVideoParseError("");
      return model;
    } catch (e) {
      setVideoParseError(String(e.message || e));

      // Safe fallback – must include src to satisfy CardVideoObject
      return new CardVideoObject({
        id: "fallbackCardVideo",
        className: "card border m-2 shadow",
        title: "Invalid JSON (CardVideo)",
        description:
          "Fix the JSON on the left to preview your actual video card configuration.",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        controls: true
      });
    }
  }, [videoJson]);

  /* -------------------------------------------
   * Global output handler
   * ----------------------------------------- */

  function handleVideoOutput(out) {
    const payload =
      out instanceof OutputObject && typeof out.toJSON === "function"
        ? out.toJSON()
        : out;

    setVideoOutputJson(JSON.stringify(payload, null, 2));
  }

  /* -------------------------------------------
   * Helpers for reset / format / clear
   * ----------------------------------------- */

  function resetVideo() {
    setVideoJson(DEFAULT_CARD_VIDEO_JSON);
    setVideoOutputJson(
      "// Click footer actions (Watch again / View details) to see OutputObject here…"
    );
    setVideoParseError("");
  }

  function formatVideo() {
    try {
      const parsed = JSON.parse(videoJson);
      setVideoJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error already shown
    }
  }

  /* -------------------------------------------
   * RENDER
   * ----------------------------------------- */

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyCardVideo</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
{`import { AlloyCardVideo, CardVideoObject } from "@alloy/react";

<AlloyCardVideo
  cardVideo={new CardVideoObject(cardVideoObject)}
  output={handleOutput}
/>`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12 col-xl-8 mx-auto">
          <AlloyCardVideo cardVideo={videoModel} output={handleVideoOutput} />

          <div className="small text-secondary mt-2 text-center">
            <strong>Footer actions</strong> (e.g.{" "}
            <code>Watch again</code>, <code>View details</code>) emit a
            standardized <code>OutputObject</code> with{" "}
            <code>type="card-video"</code> and <code>data</code> containing{" "}
            <code>src</code>, <code>title</code>,{" "}
            <code>description</code>, and anything inside{" "}
            <code>meta</code>.
          </div>
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              CardVideo Input JSON (editable)
            </span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={resetVideo}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={formatVideo}
                title="Format JSON"
              >
                <i
                  className="fa-solid fa-wand-magic-sparkles me-2"
                  aria-hidden="true"
                />
                Format
              </button>
            </div>
          </div>

          <textarea
            className={`form-control font-monospace ${
              videoParseError ? "is-invalid" : ""
            }`}
            rows={22}
            value={videoJson}
            onChange={(e) => setVideoJson(e.target.value)}
            spellCheck={false}
          />
          {videoParseError && (
            <div className="invalid-feedback d-block mt-1">
              {videoParseError}
            </div>
          )}

          <div className="form-text">
            Required: <code>src</code> (video URL). Optional:{" "}
            <code>title</code>, <code>description</code>,{" "}
            <code>header</code>, <code>footer</code>, and{" "}
            <code>meta</code>. Footer actions are configured via{" "}
            <code>type</code> (
            <code>"AlloyButtonBar"</code> or <code>"AlloyLinkBar"</code>) and{" "}
            <code>action</code> (ButtonBar / LinkBar config).
          </div>
        </div>

        {/* Right: Output JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Output (from <code>output</code> callback)
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => setVideoOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={videoOutputJson}
            onChange={(e) => setVideoOutputJson(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            Example output (click <code>View details</code>):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "demoCardVideo",
  "type": "card-video",
  "action": "View details",
  "error": false,
  "data": {
    "src": "https://www.w3schools.com/html/mov_bbb.mp4",
    "title": "ASTRO™ Septic Tank Mold — Overview",
    "description": "Short product video highlighting key features, setup steps, and safety guidelines.",
    "productId": "P-1000",
    "productName": "ASTRO Septic Tank Mold",
    "vendorId": "V-001",
    "vendorName": "Astro Forms Inc.",
    "price": 25000,
    "currency": "CAD"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
