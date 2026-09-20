import type { CSSProperties } from "react";
import { MaskLines } from "@/components/MaskLines";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/data/profile";

/**
 * Abstract diagram of the stated Bronze/Silver/Gold architecture: three strata
 * with a dashed data flow climbing from Bronze to Gold.
 */
function PipelineDiagram() {
  return (
    <svg
      viewBox="0 0 640 400"
      className="h-full w-full"
      role="img"
      aria-label="Abstract diagram: three layers labelled Bronze, Silver and Gold with a data flow drawn between them."
    >
      <defs>
        <linearGradient id="flow" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(142,166,232,0)" />
          <stop offset="45%" stopColor="rgba(142,166,232,0.5)" />
          <stop offset="100%" stopColor="rgba(142,166,232,0)" />
        </linearGradient>
      </defs>

      <rect
        x="24"
        y="40"
        width="592"
        height="84"
        rx="6"
        fill="rgba(192,86,108,0.06)"
        stroke="rgba(192,86,108,0.28)"
        strokeDasharray="1 4"
      />
      <rect
        x="24"
        y="150"
        width="592"
        height="84"
        rx="6"
        fill="rgba(238,244,250,0.05)"
        stroke="rgba(238,244,250,0.2)"
      />
      <rect
        x="24"
        y="260"
        width="592"
        height="84"
        rx="6"
        fill="rgba(142,166,232,0.07)"
        stroke="rgba(142,166,232,0.32)"
        strokeDasharray="1 4"
      />

      <g
        className="font-mono"
        fontSize="11"
        letterSpacing="3"
        fill="rgba(238,244,250,0.55)"
      >
        <text x="48" y="80">
          GOLD
        </text>
        <text x="48" y="190">
          SILVER
        </text>
        <text x="48" y="300">
          BRONZE
        </text>
      </g>

      <path
        className="draw-path"
        d="M 60 344 C 180 344, 140 300, 220 300 C 320 300, 260 234, 360 234 C 440 234, 400 124, 500 124 C 540 124, 560 138, 600 138"
        fill="none"
        stroke="url(#flow)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle cx="60" cy="344" r="4" fill="rgba(142,166,232,0.9)" />
      <circle cx="600" cy="138" r="4" fill="rgba(192,86,108,0.9)" />
    </svg>
  );
}

/**
 * Abstract diagram of the stated multi-tool agent system: stock queries enter
 * a central node and are routed to independent tools for market data,
 * computation and response generation, drawn as counter-rotating orbits.
 */
function AgentDiagram() {
  return (
    <svg
      viewBox="0 0 640 400"
      className="h-full w-full"
      role="img"
      aria-label="Abstract diagram: stock queries routed to tools for market data, computation and response generation."
    >
      <g className="spin-g" style={{ "--oa": "42s" } as CSSProperties}>
        <ellipse
          cx="320"
          cy="200"
          rx="252"
          ry="98"
          fill="none"
          stroke="rgba(238,244,250,0.14)"
          strokeDasharray="1 8"
        />
        <circle cx="572" cy="200" r="6" fill="rgba(192,86,108,0.85)" />
      </g>

      <g
        className="spin-g"
        style={{ "--oa": "70s", animationDirection: "reverse" } as CSSProperties}
      >
        <ellipse
          cx="320"
          cy="200"
          rx="178"
          ry="164"
          fill="none"
          stroke="rgba(142,166,232,0.18)"
          strokeDasharray="2 12"
        />
        <circle cx="498" cy="200" r="5" fill="rgba(142,166,232,0.9)" />
      </g>

      <g
        className="font-mono"
        fontSize="11"
        letterSpacing="2"
        fill="rgba(238,244,250,0.5)"
      >
        <text x="48" y="64">
          MARKET DATA
        </text>
        <text x="430" y="64">
          COMPUTATION
        </text>
        <text x="48" y="368">
          RESPONSE GENERATION
        </text>
      </g>

      <circle
        cx="320"
        cy="200"
        r="48"
        fill="rgba(142,166,232,0.06)"
        stroke="rgba(142,166,232,0.4)"
      />
      <circle
        cx="320"
        cy="200"
        r="35"
        fill="none"
        stroke="rgba(142,166,232,0.2)"
        strokeDasharray="3 6"
      />
      <text
        x="320"
        y="206"
        textAnchor="middle"
        className="font-mono"
        fontSize="12"
        letterSpacing="2"
        fill="rgba(238,244,250,0.85)"
      >
        QUERIES
      </text>
    </svg>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-6 py-28 md:px-10 md:py-40">
        <SectionHeading index="03" label="Projects" title="Projects" />

        <div className="flex flex-col gap-28 md:gap-36">
          {projects.map((project, i) => (
            <article
              key={project.title.replace(/\n/g, " ")}
              className="grid items-start gap-12 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-6">
                <Reveal className="font-mono text-xs uppercase tracking-[0.3em] text-ice">
                  Project 0{i + 1}
                </Reveal>
                <h3 className="mt-5 font-display text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.02] font-normal text-ghost">
                  <MaskLines
                    lines={project.title.split("\n")}
                    ariaLabel={project.title.replace(/\n/g, " ")}
                    delay={120}
                    stagger={110}
                  />
                </h3>
                <ul className="mt-7 space-y-4">
                  {project.bullets.map((bullet, j) => (
                    <Reveal
                      as="li"
                      key={bullet}
                      delay={220 + j * 90}
                      className="flex gap-4 text-[15px] leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.65em] h-px w-6 shrink-0 bg-ice/50"
                      />
                      <span>{bullet}</span>
                    </Reveal>
                  ))}
                </ul>
                <Reveal delay={300} className="mt-8 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="chip font-mono text-[11px] uppercase text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="chip font-mono text-[11px] uppercase text-ice"
                    >
                      GitHub ↗
                    </a>
                  ) : null}
                </Reveal>
              </div>

              <Reveal
                delay={150}
                className="md:col-span-6 md:pl-8"
              >
                <div className="float-slow relative aspect-[16/10] overflow-hidden rounded-sm border border-line bg-panel">
                  <div className="absolute inset-0 p-2 opacity-90">
                    {i === 0 ? <PipelineDiagram /> : <AgentDiagram />}
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-ice/5"
                  />
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}