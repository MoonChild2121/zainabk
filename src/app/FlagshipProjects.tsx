"use client";

import Image, { type StaticImageData } from "next/image";
import { Fragment, type ReactNode, useEffect, useRef, useState } from "react";
import posMockup from "../../assets/pos_mockup.png";
import fchMockup from "../../assets/fch_mockup.png";
import { Overlay } from "./Overlay";

type ProjectId = "fch" | "pos";

const BUILD_ITEMS = [
  { label: "Checkout Flow", desc: "Real-time cart with Square-integrated transactions." },
  { label: "Pricing Engine", desc: "Dynamic taxes, discounts, and edge-case handling." },
  { label: "Auth", desc: "OAuth-based Square merchant authentication." },
  { label: "UI System", desc: "Pallas UI components, extended and documented." },
];

const INTEGRATIONS = [
  {
    name: "Square POS API",
    desc: "Full payment processing pipeline: real-time transaction handling, order management, and payment workflows via Square's REST APIs.",
  },
  {
    name: "OAuth 2.0",
    desc: "Merchant authentication flow using Square's OAuth. Secure, scoped access with token management handled client-side in Next.js.",
  },
];

const LIGHTHOUSE = [
  { label: "Performance", score: 92 },
  { label: "Accessibility", score: 98 },
  { label: "Best Practices", score: 100 },
  { label: "SEO", score: 100 },
];

// FirstClass Healthcare — surface-area map: module names grouped by domain.
const FCH_SCOPE = [
  {
    label: "Clinical",
    modules: ["Controlled Substances", "Mortality Review", "Drug Information", "Pre-Intake", "SAFE Reports"],
  },
  {
    label: "Compliance",
    modules: ["HIPAA Incident Reporting", "Audit Trails", "Electronic Signatures", "Regulatory Reporting"],
  },
  {
    label: "Operations",
    modules: ["Inventory Audits", "Facilities Management", "Bulletin Board", "Issue Reports"],
  },
  {
    label: "Admin",
    modules: ["Role-Based Access Control", "Staff Permissions", "Dashboard", "Bulk Operations"],
  },
];

const FCH_BUILT = [
  {
    title: "RBAC",
    desc: "Designed and implemented fine-grained role-based access control across every module, with different permission layers for clinical staff, admins, and management roles.",
  },
  {
    title: "Form Architecture",
    desc: "Multi-step forms with validation, conditional logic, draft persistence, digital signatures, and approval chains, the kind of workflows healthcare compliance actually requires.",
  },
  {
    title: "Data Interfaces",
    desc: "Advanced filtering, range selectors, search, pagination, CSV import/export, and bulk operations, across modules that handle sensitive clinical records.",
  },
  {
    title: "Real-Time",
    desc: "WebSocket integration for collaborative workflows: multiple staff members, live updates, no conflicts.",
  },
  {
    title: "Design System",
    desc: "Built and maintains an internal component library, published as a private GitHub package and used across the FCH platform. Reusable UI patterns, consistent tokens, and accessible components that keep the interface coherent at scale.",
  },
];

const FCH_STACK = [
  "Next.js 14",
  "TypeScript",
  "React",
  "WebSockets",
  "RBAC",
  "HIPAA Compliance",
  "Internal Design System (GitHub Packages)",
];

/** Circular Lighthouse-style score ring. Scores are all ≥90, so green. */
function ScoreRing({ score, label }: { score: number; label: string }) {
  const r = 26;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - score / 100);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative size-[68px]">
        <svg viewBox="0 0 64 64" className="size-full -rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" strokeWidth="5" className="stroke-teal-900/10" />
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="stroke-green-700"
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-lg font-bold text-teal-900">
          {score}
        </span>
      </div>
      <span className="text-center text-xs font-medium text-teal-900/70">{label}</span>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-label font-semibold uppercase tracking-[0.18em] text-teal-600">
      {children}
    </h3>
  );
}

/** The two flagship cards trigger this — the POS write-up. */
function PosContent() {
  return (
    <div className="space-y-20">
      {/* Hook */}
      <header>
        <p className="text-label font-semibold uppercase tracking-[0.18em] text-teal-600">
          Custom POS · Real-time retail checkout
        </p>
        <p className="mt-4 max-w-3xl text-lg font-semibold leading-relaxed text-teal-900 sm:text-xl">
          A full-featured point-of-sale system built for real retail workflows: transactions,
          pricing logic, merchant auth, and a UI system, all designed and engineered from scratch.
        </p>
      </header>

      {/* The Build */}
      <section className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <SectionTitle>The Build</SectionTitle>
          <p className="mt-4 text-sm leading-relaxed text-teal-900/80">
            Built with Next.js 14, integrated against the Square POS API, and designed using Pallas
            UI, an in-house component library I extended to keep the interface consistent and
            accessible across every flow.
          </p>
          <dl className="mt-6 space-y-4">
            {BUILD_ITEMS.map((item) => (
              <div key={item.label} className="border-l-2 border-teal-500/40 pl-4">
                <dt className="text-sm font-bold text-teal-900">{item.label}</dt>
                <dd className="text-sm text-teal-900/70">{item.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Image
          src={posMockup}
          alt="Custom POS main interface"
          className="block h-auto w-full rounded-xl"
          sizes="(max-width: 1024px) 94vw, 48rem"
        />
      </section>

      {/* Integrations */}
      <section>
        <SectionTitle>Integrations</SectionTitle>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {INTEGRATIONS.map((it) => (
            <div key={it.name} className="rounded-lg bg-white p-5 ring-1 ring-teal-900/10">
              <p className="text-sm font-bold text-teal-900">{it.name}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-teal-900/70">{it.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {["Merchant", "OAuth", "Square API", "POS"].map((step, i, arr) => (
            <Fragment key={step}>
              <span className="rounded-full bg-teal-900 px-6 py-3 text-base font-semibold text-green-100">
                {step}
              </span>
              {i < arr.length - 1 ? (
                <span aria-hidden="true" className="text-2xl font-bold text-teal-500">
                  →
                </span>
              ) : null}
            </Fragment>
          ))}
        </div>
      </section>

      {/* Optimisations — the highlight */}
      <section>
        <SectionTitle>Optimisations</SectionTitle>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-6 ring-1 ring-teal-900/10">
            <h4 className="text-title font-bold text-teal-900">React Scan</h4>
            <p className="mt-2 text-sm leading-relaxed text-teal-900/75">
              Used React Scan to profile component render behaviour across critical UI flows, then
              identified and eliminated unnecessary re-renders in the cart, pricing engine, and
              checkout sequence. The goal was a UI that feels instant even under real transaction
              load.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 ring-1 ring-teal-900/10">
            <h4 className="text-title font-bold text-teal-900">Lighthouse</h4>
            <p className="mt-2 text-sm leading-relaxed text-teal-900/75">
              Optimised for performance, accessibility, and best practices, with strong scores
              across all four categories and no sacrifice to the richness of the interface.
            </p>
            <div className="mt-5 flex justify-between gap-2">
              {LIGHTHOUSE.map((l) => (
                <ScoreRing key={l.label} score={l.score} label={l.label} />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/** FirstClass Healthcare — HIPAA clinical operations platform. */
function FchContent() {
  return (
    <div className="space-y-20">
      {/* Hook — full width, at the top (like POS) */}
      <header>
        <p className="text-label font-semibold uppercase tracking-[0.18em] text-teal-600">
          FirstClass Healthcare · Clinical operations platform
        </p>
        <p className="mt-4 max-w-3xl text-lg font-semibold leading-relaxed text-teal-900 sm:text-xl">
          A HIPAA-compliant clinical operations platform in active use across multiple US counties.
          I&rsquo;m the top contributor, having built and maintained modules spanning every major
          area of the system, including the internal component library powering its UI.
        </p>
      </header>

      {/* Overview + image (text left, image right ~60%, like the POS Build) */}
      <section className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <SectionTitle>The Platform</SectionTitle>
          <p className="mt-4 text-sm leading-relaxed text-teal-900/80">
            Four domains under one HIPAA-compliant system, from clinical records to compliance
            reporting, all on a single Next.js 14 and TypeScript codebase.
          </p>
        </div>
        <div>
          <Image
            src={fchMockup}
            alt="FirstClass Healthcare interface"
            className="block h-auto w-full rounded-xl"
            sizes="(max-width: 1024px) 94vw, 48rem"
          />
          <p className="mt-3 text-xs text-teal-900/60">
            Production application, screenshots limited; available to discuss in detail.
          </p>
        </div>
      </section>

      {/* Scope — surface-area map */}
      <section>
        <SectionTitle>Scope</SectionTitle>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FCH_SCOPE.map((group) => (
            <div key={group.label}>
              <p className="text-sm font-bold text-teal-900">{group.label}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.modules.map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-teal-900 ring-1 ring-teal-900/10"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What I built */}
      <section>
        <SectionTitle>What I built across these</SectionTitle>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {FCH_BUILT.map((b) => (
            <div key={b.title} className="rounded-lg bg-white p-6 ring-1 ring-teal-900/10">
              <h4 className="text-title font-bold text-teal-900">{b.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-teal-900/75">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Code Organisation — architecture as the flex */}
      <section>
        <SectionTitle>Code Organisation</SectionTitle>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-center">
          <p className="text-sm leading-relaxed text-teal-900/80">
            As the codebase scaled, I maintained clean component architecture: reusable UI patterns,
            consistent folder structure, and design-system contributions that kept the frontend
            coherent across a system this large.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white p-5 text-center ring-1 ring-teal-900/10">
              <p className="text-4xl font-bold text-teal-900">200+</p>
              <p className="mt-1 text-xs font-medium text-teal-900/70">Jira tickets</p>
            </div>
            <div className="rounded-lg bg-white p-5 text-center ring-1 ring-teal-900/10">
              <p className="text-4xl font-bold text-teal-900">100+</p>
              <p className="mt-1 text-xs font-medium text-teal-900/70">Pull requests</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stack + privacy note */}
      <footer className="border-t border-teal-900/10 pt-6">
        <div className="flex flex-wrap gap-2">
          {FCH_STACK.map((s) => (
            <span
              key={s}
              className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-teal-900 ring-1 ring-teal-900/10"
            >
              {s}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}

function ProjectCard({
  title,
  tagline,
  image,
  onOpen,
}: {
  title: string;
  tagline: string;
  image: StaticImageData;
  onOpen: () => void;
}) {
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
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      className="group relative flex min-h-[160px] cursor-pointer flex-col justify-end overflow-hidden rounded-md bg-teal-900 p-6 text-left text-green-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-100"
    >
      {/* Mockup peeks in from the top-left to ~half on scroll, slides to ~70% on hover */}
      <Image
        src={image}
        alt=""
        aria-hidden="true"
        sizes="(max-width: 1024px) 50vw, 20vw"
        className={`pointer-events-none absolute left-0 top-0 z-0 w-[78%] rounded-sm shadow-lg motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out ${
          shown ? "-translate-x-1/2 group-hover:-translate-x-[30%]" : "-translate-x-full"
        }`}
      />
      {/* Scrim keeps the title legible over the light screenshot */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-teal-900 via-teal-900/45 to-transparent"
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
      <h3 className="relative z-10 text-title font-bold">{title}</h3>
      <p className="relative z-10 mt-1 text-sm text-green-100/70">{tagline}</p>
    </button>
  );
}

export function FlagshipProjects() {
  const [open, setOpen] = useState<ProjectId | null>(null);
  const close = () => setOpen(null);

  return (
    <>
      <ProjectCard
        title="FirstClass Healthcare"
        tagline="Clinical operations platform"
        image={fchMockup}
        onOpen={() => setOpen("fch")}
      />
      <ProjectCard
        title="Custom POS"
        tagline="Real-time retail checkout"
        image={posMockup}
        onOpen={() => setOpen("pos")}
      />

      <Overlay open={open !== null} onClose={close}>
        {open === "pos" ? <PosContent /> : open === "fch" ? <FchContent /> : null}
      </Overlay>
    </>
  );
}
