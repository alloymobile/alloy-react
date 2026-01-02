// src/components/tissue/AlloyMarquee.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

import AlloyCard, { CardObject } from "../tissue/AlloyCard.jsx";
import { generateId } from "../../utils/idHelper.js";

export class MarqueeObject {
  constructor(cfg = {}) {
    this.id = cfg.id ?? generateId("marquee");
    this.className = cfg.className ?? "alloy-marquee-wrap";
    this.marqueeClassName = cfg.marqueeClassName ?? "alloy-marquee";
    this.trackClassName = cfg.trackClassName ?? "alloy-marquee-track";
    this.setClassName = cfg.setClassName ?? "alloy-marquee-set";

    this.gap = Number.isFinite(cfg.gap) ? Number(cfg.gap) : 12;

    this.speed = Number.isFinite(cfg.speed) ? Number(cfg.speed) : 140; // px/sec
    this.paused = Boolean(cfg.paused);
    this.direction = cfg.direction === "ltr" ? "ltr" : "rtl";

    this.pauseOnHover = cfg.pauseOnHover !== false;
    this.pauseOnTouch = cfg.pauseOnTouch !== false;

    const rawCards = Array.isArray(cfg.cards) ? cfg.cards : [];
    this.cards = rawCards.map((c) => (c instanceof CardObject ? c : new CardObject(c)));
  }
}

export function AlloyMarquee({ marquee }) {
  if (!marquee || !(marquee instanceof MarqueeObject)) {
    throw new Error("AlloyMarquee requires `marquee` (MarqueeObject instance).");
  }

  const trackRef = useRef(null);
  const set1Ref = useRef(null);

  const [touchHold, setTouchHold] = useState(false);

  const cardsKey = useMemo(() => marquee.cards.map((c) => String(c?.id ?? "")).join("|"), [marquee.cards]);

  const reverse = marquee.direction === "ltr";
  const isPaused = marquee.paused || touchHold;

  const applyMotionVars = () => {
    const track = trackRef.current;
    const set1 = set1Ref.current;
    if (!track || !set1) return;

    const shift = set1.scrollWidth || 0;

    track.style.setProperty("--gap", `${Math.max(0, marquee.gap || 0)}px`);
    track.style.setProperty("--shift", `${shift}px`);

    const speed = Math.max(40, Number(marquee.speed) || 140);
    const duration = Math.max(8, shift / speed);
    track.style.setProperty("--duration", `${duration}s`);
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => applyMotionVars());
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsKey, marquee.speed, marquee.gap]);

  useEffect(() => {
    const set1 = set1Ref.current;
    if (!set1) return;

    const ro = new ResizeObserver(() => applyMotionVars());
    ro.observe(set1);

    const onResize = () => applyMotionVars();
    window.addEventListener("resize", onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!marquee.cards.length) {
    return null;
  }

  return (
    <div
      id={marquee.id}
      className={`${marquee.className}${marquee.pauseOnHover ? " alloy-marquee-hover-pause" : ""}`}
      onTouchStart={marquee.pauseOnTouch ? () => setTouchHold(true) : undefined}
      onTouchEnd={marquee.pauseOnTouch ? () => setTouchHold(false) : undefined}
    >
      <div className={marquee.marqueeClassName}>
        <div
          ref={trackRef}
          className={`${marquee.trackClassName}${reverse ? " reverse" : ""}${isPaused ? " paused" : ""}`}
          aria-label="Alloy marquee track"
        >
          <div ref={set1Ref} className={marquee.setClassName}>
            {marquee.cards.map((card) => (
              <AlloyCard key={card.id} card={card} />
            ))}
          </div>

          <div className={marquee.setClassName} aria-hidden="true">
            {marquee.cards.map((card) => (
              <AlloyCard key={`${card.id}-dup`} card={card} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .alloy-marquee-wrap{
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .alloy-marquee{
          width: 100%;
          overflow: hidden;
        }

        .alloy-marquee-track{
          display: flex;
          width: max-content;
          will-change: transform;

          --gap: 12px;
          --shift: 1200px;
          --duration: 28s;

          gap: var(--gap);
          animation: alloy-marquee var(--duration) linear infinite;
        }

        .alloy-marquee-set{
          display: flex;
          gap: var(--gap);
          width: max-content;
        }

        .alloy-marquee-track.reverse{
          animation-direction: reverse;
        }

        .alloy-marquee-track.paused{
          animation-play-state: paused;
        }

        .alloy-marquee-hover-pause:hover .alloy-marquee-track{
          animation-play-state: paused;
        }

        @keyframes alloy-marquee{
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-1 * var(--shift))); }
        }
      `}</style>
    </div>
  );
}

export default AlloyMarquee;
