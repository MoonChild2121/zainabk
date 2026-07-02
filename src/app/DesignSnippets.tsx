"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import posDesign from "../../assets/POS_design.png";
import buildingCompany from "../../assets/building_company.png";
import fchLogo from "../../assets/fch_logo.svg";
import { Overlay } from "./Overlay";

type DesignProject = {
  name: string;
  subtitle: string;
  points: string[];
  image: StaticImageData | null;
  link: string | null;
};

const DESIGN_PROJECTS: DesignProject[] = [
  {
    name: "POS System",
    subtitle: "Custom POS Interface",
    points: [
      "Built a full design system from scratch: color tokens, typography scale, spacing, and a component library.",
      "Designed every screen: category browsing, cart, discount logic, and order summary.",
      "Components built to map directly to how they'd be implemented in code.",
    ],
    image: posDesign,
    link: "https://www.figma.com/design/HdmD97w9qVMxBtz9A6aQnX/Pos-App?node-id=0-1&t=rY2efypy8PyUCRLp-1",
  },
  {
    name: "BuildWise Co",
    subtitle: "Construction Company Website",
    points: [
      "Exploration project to push Figma skills, referencing Dribbble for layout and composition patterns.",
      "Focused on typographic hierarchy, section rhythm, and reusable page-level components.",
      "Covers hero, services, testimonials, FAQ, and footer: the full page flow.",
    ],
    image: buildingCompany,
    link: "https://www.figma.com/design/ihDCnkfHKHeac8iEVdLliS/BuildWise-Co?t=rY2efypy8PyUCRLp-1",
  },
  {
    name: "FCH (Internal)",
    subtitle: "Enterprise Clinical UI · Internal Work",
    points: [
      "Designed modals, drawers, multi-step forms, data tables, and filter systems.",
      "All components built within an existing design system and extended where needed.",
      "Can't share the file publicly, but happy to walk through it.",
    ],
    image: null,
    link: null,
  },
];

function Bullet({ children }: { children: string }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-teal-900/80">
      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-500" />
      {children}
    </li>
  );
}

function DesignContent() {
  return (
    <div className="space-y-16">
      <header>
        <p className="text-label font-semibold uppercase tracking-[0.18em] text-teal-600">
          Design · Selected work
        </p>
        <p className="mt-4 max-w-3xl text-lg font-semibold leading-relaxed text-teal-900 sm:text-xl">
          Interfaces I&rsquo;ve designed end to end, from a POS design system to a marketing site to
          enterprise clinical UI.
        </p>
      </header>

      {DESIGN_PROJECTS.map((p, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={p.name} className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className={flip ? "lg:order-last" : ""}>
              <p className="text-label font-semibold uppercase tracking-[0.18em] text-teal-600">
                {p.name}
              </p>
              <h3 className="mt-1 text-title font-bold text-teal-900">{p.subtitle}</h3>
              <ul className="mt-4 space-y-2.5">
                {p.points.map((pt) => (
                  <Bullet key={pt}>{pt}</Bullet>
                ))}
              </ul>
              {p.link ? (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 transition-colors hover:text-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                >
                  View in Figma
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.25}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-4"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </a>
              ) : null}
            </div>
            {p.image ? (
              <Image
                src={p.image}
                alt={`${p.name} design`}
                className="block h-auto w-full rounded-xl"
                sizes="(max-width: 1024px) 94vw, 40rem"
              />
            ) : (
              <div className="flex items-center justify-center rounded-xl bg-white p-12 ring-1 ring-teal-900/10">
                <Image src={fchLogo} alt="FirstClass Healthcare" className="h-auto w-full max-w-xs" />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

export function DesignSnippets() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShown(entry.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <button
        ref={ref}
        type="button"
        onClick={() => setOpen(true)}
        className="group relative flex min-h-[200px] cursor-pointer flex-col overflow-hidden rounded-md bg-teal-900 p-7 text-left text-green-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-100 lg:col-start-2 lg:row-start-1 slide-in-right"
      >
        {/* Fanned stack of design thumbnails, cut off at the bottom-left. Slides
            in on scroll (like the journal), and further in on hover. */}
        <div
          className={`pointer-events-none absolute -bottom-8 left-0 z-0 h-72 w-[36rem] motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out ${
            shown
              ? "translate-x-0 translate-y-0 group-hover:-translate-y-8 group-hover:translate-x-4"
              : "-translate-x-16 translate-y-32"
          }`}
        >
          <Image
            src={posDesign}
            alt=""
            aria-hidden="true"
            sizes="14rem"
            className="absolute bottom-4 left-1 w-56 origin-bottom-left -rotate-[18deg] rounded-lg shadow-xl ring-1 ring-black/20"
          />
          <Image
            src={buildingCompany}
            alt=""
            aria-hidden="true"
            sizes="14rem"
            className="absolute bottom-0 left-24 w-56 origin-bottom-left -rotate-3 rounded-lg shadow-xl"
          />
          <div className="absolute bottom-16 left-52 w-44 origin-bottom-left rotate-[14deg] rounded-lg bg-white p-3 shadow-xl ring-1 ring-black/20">
            <Image src={fchLogo} alt="" aria-hidden="true" className="h-auto w-full" />
          </div>
        </div>

        {/* Scrim keeps the light title legible where the fanned screenshots
            cover the whole card on narrow (stacked) screens. Not needed at lg,
            where the two-column layout leaves the fan clear of the title. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-teal-900 via-teal-900/55 to-transparent lg:hidden"
        />

        <span className="absolute right-5 top-5 z-10 flex size-12 items-center justify-center rounded-sm text-green-100 transition-colors duration-200 group-hover:bg-green-100 group-hover:text-teal-900">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-7"
          >
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </span>
        <h3 className="relative z-10 mt-auto text-right text-title font-bold">Design Snippets</h3>
      </button>

      <Overlay open={open} onClose={() => setOpen(false)}>
        <DesignContent />
      </Overlay>
    </>
  );
}
