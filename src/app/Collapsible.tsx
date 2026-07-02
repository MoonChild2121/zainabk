"use client";

import { useState, type ReactNode } from "react";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/**
 * Read-only card that collapses on mobile and is always open on md+.
 *
 * We deliberately avoid <details>: modern browsers wrap its content in a
 * ::details-content pseudo-element, which stops the body from being a direct
 * flex child of the card and breaks the order-swap / flex layout the desktop
 * bento relies on. A plain button + state gives identical behaviour everywhere.
 *
 * The body is `hidden` when closed (mobile only); each caller's `bodyClassName`
 * carries an `md:` display utility (md:flex / md:block) so the body is always
 * visible from md up, regardless of the open state.
 */
export function Collapsible({
  summary,
  children,
  className,
  summaryClassName,
  bodyClassName,
}: {
  summary: ReactNode;
  children: ReactNode;
  className?: string;
  summaryClassName?: string;
  bodyClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full cursor-pointer items-start gap-3 text-left md:pointer-events-none md:cursor-default ${summaryClassName ?? ""}`}
      >
        {summary}
        <ChevronDown
          className={`mt-1 size-5 shrink-0 text-fg/50 transition-transform duration-200 md:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`${open ? "" : "hidden"} ${bodyClassName ?? ""}`}>
        {children}
      </div>
    </div>
  );
}
