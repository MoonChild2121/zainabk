"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Slides its children up into place whenever they scroll into view, and snaps
 * straight back to the start position the moment they leave — so the slide-in
 * replays every time you pass by. No hover. Respects prefers-reduced-motion.
 */
export function Reveal({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShown(entry.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${
        shown
          ? "translate-y-0 opacity-100 motion-safe:transition-[transform,opacity] motion-safe:duration-700 motion-safe:ease-out"
          : "motion-safe:translate-y-4 motion-safe:opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

/**
 * Sets `data-inview="true|false"` on a `group` wrapper as it enters/leaves the
 * viewport, so children can drive their own transitions with
 * `group-data-[inview=true]:…` variants (replays every pass). No hover.
 */
export function InView({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShown(entry.isIntersecting),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-inview={shown} className={`group ${className}`}>
      {children}
    </div>
  );
}
