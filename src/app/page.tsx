import Image from "next/image";
import type { ReactNode } from "react";
import heroImage from "../../assets/landing_graphic.webp";
import journalImage from "../../assets/journalImage.png";
import cvImage from "../../assets/cv.png";
import paperImage from "../../assets/paper.png";
import drawing1 from "../../assets/drawing1.jpeg";
import drawing2 from "../../assets/drawing2.jpeg";
import { Reveal, InView } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { Typewriter } from "./Typewriter";
import { FlagshipProjects } from "./FlagshipProjects";
import { DesignSnippets } from "./DesignSnippets";

/** Full-viewport screen shared by every section. */
function Frame({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section
      id={id}
      className="flex min-h-[calc(100dvh-1.5rem)] scroll-mt-3 flex-col"
    >
      {children}
    </section>
  );
}

function ArrowUpRight({
  className,
  strokeWidth = 2,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/**
 * Standard arrow affordance: no background at rest, gains a filled chip with
 * inverted color on the parent's hover (parent must have the `group` class).
 *   onLight — for arrows on light tiles (dark arrow → dark chip on hover)
 *   onDark  — for arrows on dark tiles  (light arrow → light chip on hover)
 */
function ArrowChip({
  variant = "onLight",
  big = false,
  className = "",
}: {
  variant?: "onLight" | "onDark";
  big?: boolean;
  className?: string;
}) {
  const tones =
    variant === "onDark"
      ? "text-green-100 group-hover:bg-green-100 group-hover:text-teal-900"
      : "text-teal-600 group-hover:bg-teal-500 group-hover:text-green-100";
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-sm transition-colors duration-200 ${big ? "size-12" : "size-10"} ${tones} ${className}`}
    >
      <ArrowUpRight strokeWidth={2.25} className={big ? "size-7" : "size-5"} />
    </span>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path d="M5 21h14" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.44-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

function ContactTile({
  href,
  label,
  handle,
  icon,
}: {
  href: string;
  label: string;
  handle: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-md bg-teal-200 p-4 text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-teal-300 text-teal-900">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-body font-bold leading-tight">{label}</span>
        <span className="truncate text-sm text-fg/70">{handle}</span>
      </span>
      <ArrowChip variant="onLight" big className="ml-auto" />
    </a>
  );
}

/** Highlighter-style emphasis for hero copy — a soft marker swipe under the
    lower half of the text, like a highlighter pen. */
function Mark({ children }: { children: ReactNode }) {
  return (
    <span className="font-bold text-green-100">{children}</span>
  );
}

/** Tech tag — tinted chip that inherits the tile's text color. */
function Pill({
  children,
  strong = false,
}: {
  children: ReactNode;
  strong?: boolean;
}) {
  return (
    <span
      className={`inline-flex rounded-sm border border-current/30 px-2.5 py-1 text-xs font-semibold ${strong ? "bg-current/10" : "bg-white/25"}`}
    >
      {children}
    </span>
  );
}

/** Interest tile on the journal screen — shows its detail inline. */
function Interest({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col justify-center rounded-md bg-teal-300 px-6 py-5 text-fg">
      <p className="text-title font-bold">{label}</p>
      {children ? (
        <p className="mt-2 text-sm leading-relaxed text-fg/80">{children}</p>
      ) : null}
    </div>
  );
}

// Supporting work — described inline on the card, no modal.
const codeProjects = [
  {
    title: "Style Shift Detection",
    tagline: "Detecting when an author stops sounding like themselves.",
    sentence:
      "Fine-tuned Mistral-7B with LoRA and built the full pipeline from preprocessing to F1 evaluation.",
    tech: ["PyTorch", "LoRA", "Mistral-7B", "HuggingFace"],
  },
  {
    title: "Mood-to-Music Generator",
    tagline: "Turning emotional context into generated audio.",
    sentence:
      "An emotion classifier feeds intent into an LSTM generator, hitting ~80% mood-prediction accuracy.",
    tech: ["TensorFlow", "LSTM", "Transformers"],
  },
  {
    title: "Real-Time Speed Detection",
    tagline: "Tracking vehicles and estimating speed from live footage.",
    sentence:
      "YOLOv8 and DeepSORT bridge detection boxes with motion trajectories for ~95% accuracy.",
    tech: ["YOLOv8", "DeepSORT", "Computer Vision"],
  },
];

// My design process — a real four-step sequence, so the steps are numbered.
const processSteps = [
  {
    n: "01",
    title: "Discover",
    subtitle: "Research & inspiration",
    body: "Before anything is designed, I look at what exists: Awwwards for interaction patterns, real users for context, and competitive products for gaps. Inspiration is structured, not random.",
    tools: ["Awwwards", "Cosmos", "Reference gathering"],
  },
  {
    n: "02",
    title: "Define",
    subtitle: "Ideation & structure",
    body: "I map out flows and information architecture on Canva whiteboards before touching a design tool, thinking through user journeys, edge cases, and content hierarchy first.",
    tools: ["Canva Whiteboards", "User Flows", "IA mapping"],
  },
  {
    n: "03",
    title: "Design",
    subtitle: "Wireframes to high-fidelity",
    body: "Low-fidelity first to validate structure, then high-fidelity in Figma, building with components and auto-layout so the design is already thinking about how it'll be built.",
    tools: ["Figma", "Wireframing", "Component-first"],
  },
  {
    n: "04",
    title: "Build",
    subtitle: "Design systems & handoff",
    body: "I close the gap between design and code myself. I've built design systems in Figma and in production (GitHub Packages), so what gets designed actually ships consistently.",
    tools: ["Design Systems", "Figma tokens", "GitHub Packages", "Stitch"],
  },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col gap-3 overflow-x-clip bg-teal-100 p-3 text-fg">
      {/* Screen 1 — hero */}
      <Frame id="top">
        <main className="grid flex-1">
          {/* One dark teal box; the teal fades into the illustration on the right */}
          <section className="rise group relative flex items-center overflow-hidden rounded-md bg-teal-900">
            {/* Illustration on the right, faded; the teal fades into it */}
            <div className="absolute inset-y-0 right-0 z-0 w-full lg:w-[58%]">
              <Image
                src={heroImage}
                alt="A person rowing a small boat with a fox across a lily-covered pond toward a dense green forest"
                fill
                priority
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover opacity-80"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-teal-900 via-teal-900/55 to-teal-900/25 lg:via-teal-900/25 lg:to-transparent"
              />
            </div>
            {/* Copy on the left */}
            <div className="relative z-10 flex max-w-xl flex-col gap-6 p-8 sm:p-12 lg:p-16">
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.18em] text-green-100/60">
                  Software Engineer · Designer
                </p>
                <h1 className="mt-5 text-display font-bold text-green-100">
                  <Typewriter text="Hi, I’m Zainab." />
                </h1>
              </div>
              <p className="max-w-xl text-lg leading-relaxed text-green-100/85">
                I build interfaces <Mark>end to end</Mark>, from the{" "}
                <Mark>system underneath</Mark> to the <Mark>pixels on top</Mark>,
                so design and engineering never fight each other. I use AI as a
                real tool, not a buzzword, to ship work that holds up in
                production.
              </p>
            </div>
          </section>
        </main>
      </Frame>

      {/* Screen 2 — design */}
      <Frame id="design">
        <main className="grid flex-1 grid-cols-1 gap-3 lg:grid-cols-2 lg:grid-rows-2">
          {/* Intro tile */}
          <section className="flex min-h-[200px] flex-col items-center justify-center gap-3 p-2 text-center lg:col-start-1 lg:row-start-1 slide-in-left">
            <h2 className="text-heading font-bold text-fg">I design.</h2>
            <p className="max-w-sm text-body text-fg/80">
              I think in systems, not screens, and design interfaces I can
              actually build.
            </p>
          </section>

          {/* Design Snippets — opens a modal of design work */}
          <DesignSnippets />

          {/* My Process — four-step sequence, full width. Sits one standard
              gap below the top row; cards match the app's card gap. */}
          <div className="grid min-h-[180px] gap-3 sm:grid-cols-2 lg:col-span-2 lg:row-start-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <article
                key={s.n}
                className={`flex flex-col gap-3 rounded-md bg-teal-200 p-6 text-fg ${i % 2 === 0 ? "slide-in-left" : "slide-in-right"}`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-title font-bold tabular-nums text-fg/40">
                    {s.n}
                  </span>
                  <div>
                    <h4 className="text-title font-bold leading-tight">{s.title}</h4>
                    <p className="text-sm font-medium text-fg/75">{s.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-fg/90">{s.body}</p>
                <p className="mt-auto border-t border-fg/15 pt-3 text-xs font-medium text-fg/70">
                  {s.tools.join(" · ")}
                </p>
              </article>
            ))}
          </div>
        </main>
      </Frame>

      {/* Screen 3 — code */}
      <Frame id="code">
        <main className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {/* Intro tile */}
          <section className="flex min-h-[160px] flex-col justify-center gap-3 p-2 lg:col-start-1 lg:row-start-1 slide-in-left">
            <h2 className="text-heading font-bold text-fg">I code.</h2>
            <p className="text-body text-fg/80">
              Apps, tools, and experiments I&rsquo;ve shipped, from healthcare
              platforms to weekend AI builds.
            </p>
          </section>

          {/* Flagship — dark cards that open a detail overlay */}
          <FlagshipProjects />

          {/* Supporting — described inline */}
          {codeProjects.map((p, i) => (
            <article
              key={p.title}
              className={`flex flex-col justify-between gap-8 rounded-md bg-teal-300 p-6 text-fg ${i % 2 === 0 ? "slide-in-left" : "slide-in-right"}`}
            >
              <div>
                <p className="text-base leading-relaxed text-fg/85">
                  {p.sentence}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-title font-bold leading-tight">{p.title}</h3>
                <p className="mt-1 text-sm text-fg/70">{p.tagline}</p>
              </div>
            </article>
          ))}
        </main>
      </Frame>

      {/* Screen 4 — AI */}
      <Frame id="ai">
        <main className="grid flex-1 gap-3 lg:grid-cols-[1fr_2fr] lg:grid-rows-2">
          {/* NiftyBooks */}
          <article className="flex min-h-[200px] flex-col rounded-md bg-teal-300 p-6 text-fg lg:col-start-1 lg:row-start-1 slide-in-left">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-title font-bold leading-tight">NiftyBooks</h3>
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-fg/55">
                1 yr · Remote
              </span>
            </div>
            <p className="mt-3 text-body text-fg/85">
              Led AI-powered illustration tooling for a German startup,
              directing SDXL and FLUX LoRA development for stylized image
              generation in production, plus sprint planning and stakeholder
              delivery as project lead.
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              <Pill>SDXL</Pill>
              <Pill>FLUX</Pill>
              <Pill>LoRA</Pill>
              <Pill>Agile</Pill>
            </div>
          </article>

          {/* Heading */}
          <div className="flex min-h-[200px] flex-col items-center justify-center p-8 text-center lg:col-start-2 lg:row-start-1 slide-in-up">
            <p className="text-label font-medium uppercase tracking-[0.18em] text-fg-subtle">
              Apart from developing websites
            </p>
            <h2 className="mt-3 text-heading font-bold text-fg">
              I build AI solutions.
            </h2>
          </div>

          {/* Legal RAG Chatbot */}
          <article className="flex min-h-[200px] flex-col rounded-md bg-teal-900 p-6 text-green-100 lg:col-start-1 lg:row-start-2 slide-in-left">
            <h3 className="text-title font-bold leading-tight">
              Legal RAG Chatbot
            </h3>
            <p className="mt-3 text-body text-green-100/80">
              Built a legal advisory chatbot with LangChain and a RAG pipeline
              for context-aware retrieval, cutting NLP processing time by 35%
              while improving entity recognition.
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              <Pill strong>LangChain</Pill>
              <Pill strong>RAG</Pill>
              <Pill strong>NLP</Pill>
            </div>
          </article>

          {/* Research paper — wide feature */}
          <a
            href="https://www.researchgate.net/publication/399978277_Towards_Early_Alzheimer's_Diagnosis_A_Fusion_of_Cognitive_and_Genetic_Data_via_Ensemble_Learning"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-[200px] flex-col overflow-hidden rounded-md bg-teal-700 p-7 text-green-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-100 lg:col-start-2 lg:row-start-2 slide-in-right"
          >
            <div className="relative z-10 flex h-full max-w-[58%] flex-col">
              <p className="text-label font-semibold uppercase tracking-[0.18em] text-green-100/70">
                Published research
              </p>
              <h3 className="mt-1 text-title font-bold">
                Detecting Alzheimer&rsquo;s, earlier
              </h3>
              <p className="mt-3 text-body text-green-100/85">
                Co-authored a multi-modal deep learning framework combining MRI
                imaging and clinical data for early-stage Alzheimer&rsquo;s
                detection, published in IEEE Access, 2025.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>Medical Image Processing</Pill>
                <Pill>Vision Models</Pill>
                <Pill>SPM</Pill>
                <Pill>CAT Preprocessing</Pill>
              </div>
              <ArrowChip variant="onDark" big className="mt-auto" />
            </div>
            <Image
              src={paperImage}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[5%] -right-[4%] z-0 w-[44%] rotate-3 rounded-sm shadow-xl transition-transform duration-300 ease-out group-hover:-translate-x-2 group-hover:-translate-y-2"
            />
          </a>
        </main>
      </Frame>

      {/* Screen 5 — journal / about */}
      <Frame id="journal">
        <main className="grid flex-1 grid-rows-2 gap-3">
          {/* More About Me — centered (top half) */}
          <header className="flex min-h-0 flex-col items-center justify-center gap-2 text-center slide-in-up">
            <h2 className="text-heading font-bold text-fg">More About Me</h2>
            <p className="max-w-md text-body text-fg/80">
              When I&rsquo;m not building, I&rsquo;m journaling, painting, or deep
              in a playlist.
            </p>
          </header>

          {/* Journaling · Digital art · Interests (bottom half) */}
          <div className="grid min-h-0 gap-3 lg:grid-cols-3">
            {/* Journaling */}
            <div className="relative flex min-h-[320px] flex-col overflow-hidden rounded-md bg-teal-500 p-6 lg:min-h-0 slide-in-left">
              <h3 className="relative z-10 max-w-[14ch] text-title font-bold leading-snug text-green-100">
                A piece of everything belongs in my journal
              </h3>
              <Reveal className="pointer-events-none absolute -bottom-[24%] left-[13%] z-0 w-[74%]">
                <Image
                  src={journalImage}
                  alt="An open sketchbook of watercolor landscapes, pencil drawings, and a color palette"
                  className="block h-auto w-full"
                />
              </Reveal>
            </div>

            {/* Digital art */}
            <div className="flex min-h-[320px] flex-col gap-4 overflow-hidden rounded-md bg-teal-900 p-6 lg:min-h-0 slide-in-up">
              <InView className="-mt-12 grid flex-1 grid-cols-2 items-start gap-3">
                <Image
                  src={drawing1}
                  alt="Digital painting of Sophie and Calcifer from Howl's Moving Castle"
                  className="w-full rounded-sm shadow-xl ring-1 ring-green-100/10 motion-safe:-translate-y-8 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out group-data-[inview=true]:translate-y-0"
                />
                <Image
                  src={drawing2}
                  alt="Digital drawing of Rem from Re:Zero"
                  className="w-full rounded-sm shadow-xl ring-1 ring-green-100/10 motion-safe:-translate-y-8 motion-safe:transition-transform motion-safe:delay-100 motion-safe:duration-700 motion-safe:ease-out group-data-[inview=true]:translate-y-0"
                />
              </InView>
              <span className="text-title font-bold text-green-100">
                Occasional Digital Art
              </span>
            </div>

            {/* Interests */}
            <div className="grid gap-3 lg:grid-rows-3 slide-in-right">
              <Interest label="Music">
                JJBA openings on loop, Tame Impala for everything else, and an
                embarrassing amount of One Direction when nostalgia hits.
              </Interest>
              <Interest label="Cats" />
              <Interest label="YouTube">
                PewDiePie, Drew Gooden, Tom Scott, BigBoxSWE, mostly because I
                learn better when someone&rsquo;s funny about it.
              </Interest>
            </div>
          </div>
        </main>
      </Frame>

      {/* Screen 6 — contact */}
      <Frame id="contact">
        <main className="flex flex-1 flex-col items-center justify-center gap-8 py-10">
          {/* Heading — centered on the page with breathing room */}
          <header className="text-center slide-in-up">
            <h2 className="text-heading font-bold text-fg">
              Let&rsquo;s work together.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-body text-fg/70">
              Have a project in mind, or just want to say hi? Send a note, or
              reach me anywhere below.
            </p>
          </header>

          <div className="grid w-full max-w-4xl gap-3 md:grid-cols-[1.4fr_1fr]">
            {/* Message form */}
            <ContactForm />

            {/* Contact methods + CV */}
            <div className="flex flex-col gap-3 slide-in-right">
              <ContactTile
                href="https://www.linkedin.com/in/zainab-kashif-193b26218"
                label="LinkedIn"
                handle="/in/zainab-kashif-193b26218"
                icon={<LinkedInIcon className="size-5" />}
              />
              <ContactTile
                href="https://github.com/MoonChild2121"
                label="GitHub"
                handle="@MoonChild2121"
                icon={<GitHubIcon className="size-5" />}
              />
              <ContactTile
                href="mailto:zkashif.bscs21seecs@seecs.edu.pk"
                label="Email"
                handle="zkashif.bscs21seecs@seecs.edu.pk"
                icon={<MailIcon className="size-5" />}
              />

              <a
                href="/Zainab_CV.pdf"
                download
                className="group relative flex min-h-[200px] flex-1 flex-col overflow-hidden rounded-md bg-teal-300 p-6 text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900"
              >
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-title font-bold">Get CV</span>
                  <span className="flex size-12 items-center justify-center rounded-sm text-teal-600 transition-colors duration-200 group-hover:bg-teal-500 group-hover:text-green-100">
                    <DownloadIcon className="size-6" />
                  </span>
                </div>
                {/* Scrim: keeps the header legible when the light CV image
                    slides up behind it on short viewports. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-24 bg-gradient-to-b from-teal-300 via-teal-300/80 to-transparent"
                />
                <Image
                  src={cvImage}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-[14%] -left-[10%] z-0 w-[72%] -rotate-3 rounded-sm shadow-xl transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:translate-x-3"
                />
              </a>
            </div>
          </div>
        </main>
      </Frame>
    </div>
  );
}
