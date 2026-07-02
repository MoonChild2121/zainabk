"use client";

import { type ReactNode, useEffect, useRef } from "react";

/**
 * Accessible modal built on the native <dialog> (Esc, focus trap, inert
 * background). Light teal panel, slim scrollbar, body-scroll lock while open,
 * backdrop-click and an X to close. Shared by the project and design overlays.
 */
export function Overlay({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    // Lock background scroll while the overlay is open.
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="m-auto w-[min(84rem,94vw)] overflow-visible bg-transparent p-0 backdrop:bg-teal-900/60 backdrop:backdrop-blur-sm"
    >
      {open ? (
        <div className="modal-in relative flex max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-teal-100 shadow-2xl">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 grid size-10 cursor-pointer place-items-center rounded-full bg-teal-600 text-green-100 shadow-md transition-colors hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              aria-hidden="true"
              className="size-5"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <div className="modal-scroll overflow-y-auto overscroll-contain px-8 py-10 sm:px-12 sm:py-12">
            {children}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
