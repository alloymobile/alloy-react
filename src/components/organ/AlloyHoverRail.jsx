"use client";

// src/lib/components/tissue/AlloyHoverRail.jsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import AlloyLinkBar, { LinkBarObject } from "../tissue/AlloyLinkBar.jsx";
import { generateId, TagObject } from "../../utils/idHelper.js";

export class HoverRailItemObject {
  constructor(item = {}) {
    this.id = item.id ?? generateId("railItem");

    this.className = item.className ?? "alloy-rail-item";
    this.activeClassName = item.activeClassName ?? "is-active";

    this.label =
      item.label instanceof TagObject
        ? item.label
        : new TagObject(item.label ?? {});

    this.content =
      item.content instanceof TagObject
        ? item.content
        : new TagObject(item.content ?? {});

    this.linkBar =
      item.linkBar instanceof LinkBarObject
        ? item.linkBar
        : item.linkBar
        ? new LinkBarObject(item.linkBar)
        : null;
  }
}

export class HoverRailObject {
  constructor(cfg = {}) {
    this.id = cfg.id ?? generateId("hoverRail");

    this.className = cfg.className ?? "alloy-rail";
    this.styleClass = cfg.styleClass ?? "alloy-rail-style";

    this.expandMultiplier = Number(cfg.expandMultiplier ?? 3);
    this.closeDelayMs = Number(cfg.closeDelayMs ?? 120);

    this.defaultActiveId = cfg.defaultActiveId ?? "";

    const rawItems = Array.isArray(cfg.items) ? cfg.items : [];
    this.items = rawItems.map((it) =>
      it instanceof HoverRailItemObject ? it : new HoverRailItemObject(it)
    );
  }
}

export function AlloyHoverRail({ rail }) {
  if (!rail || !(rail instanceof HoverRailObject)) {
    throw new Error("AlloyHoverRail requires `rail` (HoverRailObject instance).");
  }

  const railIdRef = useRef(rail.id);
  const closeTimerRef = useRef(null);

  const [activeId, setActiveId] = useState(rail.defaultActiveId || "");

  useEffect(() => {
    setActiveId(rail.defaultActiveId || "");
  }, [rail]);

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function scheduleClose() {
    clearCloseTimer();
    const ms = Number.isFinite(rail.closeDelayMs) ? rail.closeDelayMs : 120;
    closeTimerRef.current = setTimeout(() => setActiveId(""), Math.max(0, ms));
  }

  function open(id) {
    clearCloseTimer();
    setActiveId(id);
  }

  function toggle(id) {
    clearCloseTimer();
    setActiveId((prev) => (prev === id ? "" : id));
  }

  function onKeyDown(e) {
    if (e?.key === "Escape") {
      clearCloseTimer();
      setActiveId("");
    }
  }

  const styleVars = useMemo(
    () => ({
      ["--rail-expand"]: String(rail.expandMultiplier || 3),
    }),
    [rail.expandMultiplier]
  );

  return (
    <div
      id={railIdRef.current}
      className={`${rail.styleClass} ${rail.className}`.trim()}
      style={styleVars}
      onMouseEnter={clearCloseTimer}
      onMouseLeave={scheduleClose}
      onKeyDown={onKeyDown}
      role="navigation"
      aria-label="Hover rail"
    >
      <style>{`
        .alloy-rail-style{
          --rail-expand: 3;

          --rail-bg: #0b4aa0;
          --rail-item-bg: #0a3f88;
          --rail-item-border: rgba(255,255,255,.18);

          --rail-active-bg: #5c79ff;
          --rail-shadow: rgba(0,0,0,.20);

          --rail-text: rgba(255,255,255,.92);
          --rail-muted: rgba(255,255,255,.72);

          --rail-label-size: 0.95rem;
          --rail-content-size: 0.95rem;

          --rail-radius: 12px;
          --rail-gap: 0px;
          --rail-min-height: 520px;

          --rail-pad: 22px;
          --rail-panel-max: 520px;
        }

        .alloy-rail{
          display: flex;
          width: 100%;
          align-items: stretch;
          gap: var(--rail-gap);
          background: var(--rail-bg);
          border-radius: var(--rail-radius);
          overflow: hidden;
          min-height: var(--rail-min-height);
        }

        .alloy-rail-item{
          flex: 1 1 0;
          position: relative;
          overflow: hidden;
          background: var(--rail-item-bg);
          border-right: 1px solid var(--rail-item-border);
          transition: flex-grow .22s ease, background .22s ease;
          outline: none;
        }

        .alloy-rail-item:last-child{
          border-right: none;
        }

        .alloy-rail-item.is-active{
          flex-grow: var(--rail-expand);
          background: var(--rail-active-bg);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.10);
        }

        .alloy-rail-hit{
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 14px 10px;
          cursor: pointer;
          user-select: none;
          z-index: 2;
        }

        .alloy-rail-label{
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-size: var(--rail-label-size);
          font-weight: 600;
          letter-spacing: .02em;
          color: var(--rail-text);
          opacity: .95;
          text-align: center;
          white-space: nowrap;
        }

        .alloy-rail-item.is-active .alloy-rail-label{
          opacity: .25;
        }

        .alloy-rail-panel{
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--rail-pad);
          opacity: 0;
          pointer-events: none;
          transition: opacity .18s ease;
          z-index: 1;
        }

        .alloy-rail-item.is-active .alloy-rail-panel{
          opacity: 1;
          pointer-events: auto;
        }

        .alloy-rail-panel-inner{
          width: 100%;
          max-width: var(--rail-panel-max);
          color: var(--rail-text);
          text-align: center;
        }

        .alloy-rail-content{
          font-size: var(--rail-content-size);
          color: var(--rail-text);
          line-height: 1.45;
          margin: 0 auto 14px auto;
          opacity: .95;
        }

        .alloy-rail-links{
          display: flex;
          justify-content: center;
        }

        .alloy-rail-links nav{
          width: 100%;
        }

        @media (max-width: 768px){
          .alloy-rail{
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            min-height: 420px;
          }

          .alloy-rail-item{
            flex: 0 0 clamp(12%, 18vw, 24%);
          }

          .alloy-rail-item.is-active{
            flex-basis: clamp(42%, 60vw, 76%);
          }

          .alloy-rail-panel-inner{
            text-align: left;
          }

          .alloy-rail-links{
            justify-content: flex-start;
          }
        }
      `}</style>

      {rail.items.map((item, idx) => {
        const id = item?.id ?? `rail-${idx}`;
        const isActive = activeId === id;

        const itemClass = `${item.className} ${isActive ? item.activeClassName : ""}`.trim();

        const labelNode =
          item.label && item.label.name ? (
            <span id={item.label.id} className={item.label.className || "alloy-rail-label"}>
              {item.label.name}
            </span>
          ) : null;

        const contentNode =
          item.content && item.content.name ? (
            <div id={item.content.id} className={item.content.className || "alloy-rail-content"}>
              {item.content.name}
            </div>
          ) : null;

        return (
          <div
            key={id}
            className={itemClass}
            onMouseEnter={() => open(id)}
            onFocus={() => open(id)}
            tabIndex={0}
            aria-expanded={isActive ? "true" : "false"}
          >
            <div
              className="alloy-rail-hit"
              onClick={() => toggle(id)}
              role="button"
              aria-label={item.label?.name || "Rail item"}
            >
              {labelNode}
            </div>

            <div className="alloy-rail-panel">
              <div className="alloy-rail-panel-inner">
                {contentNode}

                {item.linkBar ? (
                  <div className="alloy-rail-links">
                    <AlloyLinkBar linkBar={item.linkBar} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AlloyHoverRail;
