// src/lib/components/organ/AlloyPost.jsx
import React, { useMemo } from "react";

import { generateId, OutputObject } from "../../utils/idHelper.js";

import AlloyForm, { FormObject } from "../tissue/AlloyForm.jsx";
import AlloyButtonIcon, {
  ButtonIconObject,
} from "../cell/AlloyButtonIcon.jsx";

/* -------------------------------------------------------
 * PostObject (model)
 * ----------------------------------------------------- */

/**
 * @typedef {Object} CommentConfig
 * @property {string} [name]
 * @property {string} [email]
 * @property {string} [body]
 * @property {string} [createdAt] ISO string
 */

/**
 * @typedef {Object} PostConfig
 * @property {string} [id]
 * @property {string} [className]
 * @property {string} [title]
 * @property {string} [slug]
 * @property {string} [authorName]
 * @property {string} [publishedAt]
 * @property {string} [categoryName]
 * @property {string} [subcategoryName]
 * @property {string[]} [tags]
 * @property {string} [imageUrl]
 * @property {string} [imageAlt]
 * @property {string} [contentHtml]
 * @property {number} [likesCount]
 * @property {CommentConfig[]} [comments]
 * @property {Object} [likeButton]
 * @property {Object} [commentForm]
 */

export class PostObject {
  /**
   * @param {PostConfig} post
   */
  constructor(post = {}) {
    this.id = post.id ?? generateId("post");
    this.className = post.className ?? "container my-4 my-lg-5";

    // Core post fields
    this.title = post.title ?? "";
    this.slug = post.slug ?? "";
    this.authorName = post.authorName ?? "";
    this.publishedAt = post.publishedAt ? new Date(post.publishedAt) : null;

    this.categoryName = post.categoryName ?? "";
    this.subcategoryName = post.subcategoryName ?? "";

    this.tags = Array.isArray(post.tags) ? post.tags : [];

    this.imageUrl = post.imageUrl ?? "";
    this.imageAlt = post.imageAlt ?? this.title; // fallback

    // Main content (HTML string – should be sanitized by backend)
    this.contentHtml = post.contentHtml ?? "";

    // Engagement
    this.likesCount =
      typeof post.likesCount === "number" ? post.likesCount : 0;

    this.comments = Array.isArray(post.comments) ? post.comments : [];

    // ---------- Like button (AlloyButtonIcon) ----------
    const likeBtn = post.likeButton ?? {};
    this.likeButton =
      likeBtn instanceof ButtonIconObject
        ? likeBtn
        : new ButtonIconObject({
            id: likeBtn.id ?? `${this.id}-like`,
            name: likeBtn.name ?? "Like",
            icon: likeBtn.icon ?? { iconClass: "fa-regular fa-heart me-1" },
            className:
              likeBtn.className ?? "btn btn-outline-danger btn-sm me-2",
            active: likeBtn.active ?? "",
            disabled: !!likeBtn.disabled,
            title: likeBtn.title ?? likeBtn.name ?? "Like",
            ariaLabel: likeBtn.ariaLabel ?? likeBtn.name ?? "Like",
            data: {
              ...(likeBtn.data || {}),
              slug: this.slug,
            },
          });

    // ---------- Comment form (AlloyForm) ----------
    const commentCfg = post.commentForm ?? {};

    // Ensure submit has icon, following FormObject's default style
    const submitCfg = commentCfg.submit || {};
    const safeSubmit = commentCfg.submit
      ? {
          ...submitCfg,
          icon:
            submitCfg.icon ??
            {
              iconClass: "fa-solid fa-paper-plane",
            },
          className:
            submitCfg.className ?? "btn btn-primary btn-sm mt-2",
          ariaLabel: submitCfg.ariaLabel ?? "Post comment",
          title: submitCfg.title ?? "Post comment",
          disabled: submitCfg.disabled ?? false,
          loading: submitCfg.loading ?? false,
        }
      : {
          name: "Post comment",
          icon: { iconClass: "fa-solid fa-paper-plane" },
          className: "btn btn-primary btn-sm mt-2",
          disabled: false,
          loading: false,
          ariaLabel: "Post comment",
          title: "Post comment",
        };

    this.commentForm =
      commentCfg instanceof FormObject
        ? commentCfg
        : new FormObject({
            id: commentCfg.id ?? `${this.id}-commentForm`,
            title: commentCfg.title ?? "Add your comment",
            className:
              commentCfg.className ??
              "bg-white rounded-4 shadow-sm p-4",
            message: commentCfg.message ?? "",
            action: commentCfg.action ?? "post.comment",
            type: commentCfg.type ?? "AlloyInputTextIcon",
            submit: safeSubmit,
            fields:
              commentCfg.fields ??
              [
                {
                  name: "name",
                  label: "Name",
                  type: "text",
                  required: true,
                  className: "form-control form-control-sm",
                  layoutClass: "col-md-6",
                },
                {
                  name: "email",
                  label: "Email (optional)",
                  type: "email",
                  required: false,
                  className: "form-control form-control-sm",
                  layoutClass: "col-md-6",
                },
                {
                  name: "body",
                  label: "Comment",
                  type: "textarea",
                  rows: 3,
                  required: true,
                  className: "form-control form-control-sm",
                  layoutClass: "col-12",
                },
              ],
          });
  }
}

/* -------------------------------------------------------
 * AlloyPost (view)
 * ----------------------------------------------------- */

export function AlloyPost({ post, output }) {
  // Hydrate like AlloyForm / AlloyDonate: accept plain JSON or PostObject
  const model = useMemo(
    () => (post instanceof PostObject ? post : new PostObject(post || {})),
    [post]
  );

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  const handleLikeOutput = (innerOut) => {
    if (!innerOut) return;
    const base =
      innerOut instanceof OutputObject && typeof innerOut.toJSON === "function"
        ? innerOut.toJSON()
        : innerOut;

    // You can wrap if you want:
    // const wrapped = new OutputObject({
    //   id: model.id,
    //   type: "post",
    //   action: "like",
    //   error: !!base.error,
    //   data: base.data || {}
    // });
    // emit(wrapped);

    emit(base);
  };

  const handleCommentOutput = (innerOut) => {
    if (!innerOut) return;
    const base =
      innerOut instanceof OutputObject && typeof innerOut.toJSON === "function"
        ? innerOut.toJSON()
        : innerOut;

    // Same note as above – can wrap if you want a "post.comment" envelope
    emit(base);
  };

  const {
    id,
    className,
    title,
    authorName,
    publishedAt,
    categoryName,
    subcategoryName,
    tags,
    imageUrl,
    imageAlt,
    contentHtml,
    likesCount,
    comments,
    likeButton,
    commentForm,
  } = model;

  const formattedDate = publishedAt
    ? publishedAt.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div id={id} className={className}>
      <div className="row justify-content-center">
        <div className="col-xl-9 col-xxl-8">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <a href="#">Blog</a>
              </li>
              {categoryName && (
                <li className="breadcrumb-item">
                  <a href="#">{categoryName}</a>
                </li>
              )}
              {subcategoryName && (
                <li
                  className="breadcrumb-item active"
                  aria-current="page"
                >
                  {subcategoryName}
                </li>
              )}
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-4">
            <h1 className="display-6 fw-bold mb-2">{title}</h1>

            <div className="d-flex flex-wrap align-items-center text-muted post-meta">
              {authorName && (
                <span className="me-2">
                  By <strong>{authorName}</strong>
                </span>
              )}
              {formattedDate && (
                <>
                  <span className="mx-2 text-secondary">•</span>
                  <span className="me-2">
                    Published on <time>{formattedDate}</time>
                  </span>
                </>
              )}
              {(categoryName || subcategoryName) && (
                <>
                  <span className="mx-2 text-secondary">•</span>
                  <span>
                    {categoryName}
                    {subcategoryName ? ` · ${subcategoryName}` : ""}
                  </span>
                </>
              )}
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="post-tags mt-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="badge text-bg-secondary me-1 mb-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Hero image */}
          {imageUrl && (
            <figure className="mb-4">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="post-hero shadow-sm rounded-4 w-100"
                style={{
                  maxHeight: "440px",
                  objectFit: "cover",
                }}
              />
            </figure>
          )}

          <div className="row">
            {/* Main article */}
            <article className="col-lg-8 mb-5">
              <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 post-content">
                <div
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </div>

              {/* Comments */}
              <section className="mt-5">
                <h2 className="h5 mb-3">
                  Comments{" "}
                  {comments && comments.length > 0 && (
                    <span className="text-muted small">
                      ({comments.length})
                    </span>
                  )}
                </h2>

                {/* Existing comments */}
                {comments && comments.length > 0 && (
                  <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
                    {comments.map((c, idx) => {
                      const created =
                        c.createdAt &&
                        new Date(c.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        );
                      return (
                        <div
                          key={idx}
                          className="comment border-bottom border-light-subtle pb-3 mb-3"
                        >
                          <div className="fw-semibold">
                            {c.name}
                          </div>
                          {(created || c.email) && (
                            <div className="text-muted small mb-1">
                              {created}
                              {created && c.email ? " · " : ""}
                              {c.email}
                            </div>
                          )}
                          <p className="mb-0">{c.body}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Comment form */}
                <div className="bg-white rounded-4 shadow-sm p-4">
                  <h3 className="h6 mb-3">Add your comment</h3>
                  <AlloyForm
                    form={commentForm}
                    output={handleCommentOutput}
                  />
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="col-lg-4">
              <div className="sidebar-card bg-white rounded-4 shadow-sm p-3 p-md-4 mb-4">
                <h2 className="h6 text-uppercase text-muted mb-3">
                  Post engagement
                </h2>

                <div className="d-flex align-items-center mb-3">
                  <AlloyButtonIcon
                    buttonIcon={likeButton}
                    output={handleLikeOutput}
                  />
                  <span className="small ms-2">
                    <span className="fw-semibold">
                      {likesCount}
                    </span>{" "}
                    likes
                  </span>
                </div>

                <p className="small text-muted mb-2">
                  Liked this article? Hit the like button and share it
                  with your project team to start planning your next
                  precast job.
                </p>

                <hr />

                <h3 className="h6 text-uppercase text-muted mb-2">
                  Post details
                </h3>
                <dl className="row mb-0 small">
                  {categoryName && (
                    <>
                      <dt className="col-5">Category</dt>
                      <dd className="col-7">{categoryName}</dd>
                    </>
                  )}
                  {subcategoryName && (
                    <>
                      <dt className="col-5">Subcategory</dt>
                      <dd className="col-7">
                        {subcategoryName}
                      </dd>
                    </>
                  )}
                  <dt className="col-5">Published</dt>
                  <dd className="col-7">
                    {publishedAt ? "Yes" : "Draft"}
                  </dd>
                  <dt className="col-5">Comments</dt>
                  <dd className="col-7">
                    {comments ? comments.length : 0}
                  </dd>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlloyPost;
