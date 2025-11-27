// src/pages/Organ/Post.jsx
import React, { useMemo, useState } from "react";

import { AlloyPost, PostObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------
 * DEFAULT JSON CONFIG
 * ----------------------------------------- */

const DEFAULT_POST_JSON = JSON.stringify(
  {
    id: "demoPost",
    className: "container my-4 my-lg-5",
    title: "How Precast Concrete Accelerates Project Timelines",
    slug: "how-precast-concrete-accelerates-project-timelines",
    authorName: "Tapas Mandal",
    publishedAt: "2025-11-26T10:15:00.000Z",
    categoryName: "Precast Business",
    subcategoryName: "Project Delivery",
    tags: ["precast", "project-management", "construction", "schedule"],
    imageUrl: "https://photosforclass.com/download/pixabay-1867187",
    imageAlt: "Precast concrete elements on a construction site",

    contentHtml: `
      <h2>Precast for Faster Delivery</h2>
      <p>
        Precast concrete elements are manufactured off-site and delivered
        just-in-time to the job site, dramatically reducing on-site cycle
        times. Instead of waiting for cast-in-place concrete to cure,
        crews can install pre-engineered panels, beams, and slabs in days
        rather than weeks.
      </p>
      <p>
        For developers and contractors, this translates into faster turnovers,
        fewer weather delays, and more predictable schedules. In this article,
        we explore the key ways precast accelerates project timelines and how
        to plan your next project around a precast-first strategy.
      </p>
      <h3>Off-site manufacturing advantages</h3>
      <p>
        Because precast is produced in a controlled environment, quality checks,
        curing, and finishing can happen in parallel with site preparation and
        foundation work. This overlap shortens the critical path and reduces
        idle time for trades on site.
      </p>
    `,

    likesCount: 27,

    comments: [
      {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        body: "Very helpful guide, thanks! This helped us plan our parking structure schedule.",
        createdAt: "2025-11-26T11:02:00.000Z"
      },
      {
        name: "Site Engineer",
        email: "engineer@contractor.com",
        body: "Would love a follow-up on connection design details.",
        createdAt: "2025-11-26T12:45:30.000Z"
      }
    ]

    // NOTE:
    // We are NOT overriding likeButton / commentForm here.
    // PostObject will create safe defaults that internally use
    // ButtonIconObject + FormObject.
  },
  null,
  2
);

/* -------------------------------------------
 * Demo Page
 * ----------------------------------------- */

export default function PostPage() {
  const [postJson, setPostJson] = useState(DEFAULT_POST_JSON);
  const [postParseError, setPostParseError] = useState("");
  const [postOutputJson, setPostOutputJson] = useState(
    "// Click like or submit a comment to see OutputObject here…"
  );

  const postModel = useMemo(() => {
    try {
      const raw = JSON.parse(postJson || "{}");
      const model = new PostObject(raw);
      setPostParseError("");
      return model;
    } catch (e) {
      setPostParseError(String(e.message || e));

      return new PostObject({
        title: "Invalid JSON (AlloyPost)",
        contentHtml:
          "<p>Fix the JSON on the left to see the AlloyPost demo.</p>",
      });
    }
  }, [postJson]);

  function handlePostOutput(out) {
    const payload =
      out instanceof OutputObject && typeof out.toJSON === "function"
        ? out.toJSON()
        : out;

    setPostOutputJson(JSON.stringify(payload, null, 2));
  }

  function resetPost() {
    setPostJson(DEFAULT_POST_JSON);
    setPostOutputJson(
      "// Click like or submit a comment to see OutputObject here…"
    );
    setPostParseError("");
  }

  function formatPost() {
    try {
      const parsed = JSON.parse(postJson);
      setPostJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error already shown
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyPost</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
{`import { AlloyPost, PostObject } from "@alloy/react";

const postModel = new PostObject(postJson);

<AlloyPost
  post={postModel}
  output={handleOutput}
/>`}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyPost post={postModel} output={handlePostOutput} />

          <div className="small text-secondary mt-2 text-center">
            The like button uses <code>AlloyButtonIcon</code> and emits an{" "}
            <code>OutputObject</code> with <code>type="button-icon"</code> and{" "}
            <code>action="click"</code>. <br />
            Submitting the comment form uses <code>AlloyForm</code> and emits an{" "}
            <code>OutputObject</code> with <code>type="form"</code> and{" "}
            <code>action="submit"</code>, plus the comment field values in{" "}
            <code>data</code>. You can map these to your{" "}
            <code>POST /api/v1/posts/:id/like</code> and{" "}
            <code>POST /api/v1/posts/:id/comments</code> endpoints.
          </div>
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Post Input JSON (editable)</span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={resetPost}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={formatPost}
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
              postParseError ? "is-invalid" : ""
            }`}
            rows={22}
            value={postJson}
            onChange={(e) => setPostJson(e.target.value)}
            spellCheck={false}
          />
          {postParseError && (
            <div className="invalid-feedback d-block mt-1">
              {postParseError}
            </div>
          )}

          <div className="form-text">
            <code>contentHtml</code> is the sanitized HTML from your backend.{" "}
            <code>comments[]</code> drives the existing comments list. The like
            button and comment form use built-in defaults you can override later
            by passing <code>likeButton</code> and <code>commentForm</code> into{" "}
            <code>PostObject</code>.
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
              onClick={() => setPostOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={22}
            value={postOutputJson}
            onChange={(e) => setPostOutputJson(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            Try: click the like button, then submit a comment. Each interaction
            emits an <code>OutputObject</code> with a clear{" "}
            <code>type</code>, <code>action</code>, and <code>data</code>{" "}
            payload that you can route to your Spring Boot blog API.
          </div>
        </div>
      </div>
    </div>
  );
}
