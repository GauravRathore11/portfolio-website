import type { CSSProperties } from "react";
import { MaskLines } from "@/components/MaskLines";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { projects, type Project } from "@/data/profile";

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

/**
 * Abstract diagram of the ITSM platform: a four-stage ticket lifecycle above a
 * two-stage asset-request approval chain, with the SLA window annotated across
 * the ticket track.
 */
function HelpdeskDiagram() {
  const lifecycle = ["OPEN", "IN PROGRESS", "RESOLVED", "CLOSED"];
  const approvals = ["REQUESTED", "MANAGER", "ADMIN", "ALLOCATED"];

  /** One horizontal track of four labelled nodes joined by arrows. */
  const track = (labels: string[], y: number, dashed: boolean) => (
    <g>
      {labels.map((label, i) => {
        const x = 40 + i * 148;
        return (
          <g key={label}>
            <rect
              x={x}
              y={y}
              width="116"
              height="58"
              rx="6"
              fill="rgba(238,244,250,0.05)"
              stroke="rgba(238,244,250,0.2)"
              strokeDasharray={dashed ? "1 4" : undefined}
            />
            <text
              x={x + 58}
              y={y + 33}
              textAnchor="middle"
              className="font-mono"
              fontSize="10"
              letterSpacing="1.5"
              fill="rgba(238,244,250,0.7)"
            >
              {label}
            </text>
            {i < labels.length - 1 ? (
              <g stroke="rgba(142,166,232,0.4)" fill="rgba(142,166,232,0.5)">
                <line
                  x1={x + 118}
                  y1={y + 29}
                  x2={x + 138}
                  y2={y + 29}
                  strokeWidth="1"
                />
                <path
                  d={`M${x + 130} ${y + 25} L${x + 140} ${y + 29} L${x + 130} ${y + 33} Z`}
                  stroke="none"
                />
              </g>
            ) : null}
          </g>
        );
      })}
    </g>
  );

  return (
    <svg
      viewBox="0 0 640 400"
      className="h-full w-full"
      role="img"
      aria-label="Abstract diagram: a four-stage ticket lifecycle with an SLA window above a four-stage asset request approval chain."
    >
      <defs>
        <linearGradient id="sla" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(192,86,108,0)" />
          <stop offset="50%" stopColor="rgba(192,86,108,0.5)" />
          <stop offset="100%" stopColor="rgba(192,86,108,0)" />
        </linearGradient>
      </defs>

      <g
        className="font-mono"
        fontSize="10"
        letterSpacing="3"
        fill="rgba(238,244,250,0.5)"
      >
        <text x="40" y="44">
          TICKET LIFECYCLE
        </text>
        <text x="600" y="44" textAnchor="end">
          SLA 4H — 72H
        </text>
      </g>

      <path
        className="draw-path"
        d="M 40 96 C 190 58, 450 58, 600 96"
        fill="none"
        stroke="url(#sla)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="40" cy="96" r="3.5" fill="rgba(192,86,108,0.85)" />
      <circle cx="600" cy="96" r="3.5" fill="rgba(142,166,232,0.9)" />

      {track(lifecycle, 124, false)}

      <line
        x1="40"
        y1="232"
        x2="600"
        y2="232"
        stroke="rgba(238,244,250,0.12)"
        strokeDasharray="1 6"
      />

      <text
        x="40"
        y="262"
        className="font-mono"
        fontSize="10"
        letterSpacing="3"
        fill="rgba(238,244,250,0.5)"
      >
        ASSET REQUEST APPROVAL
      </text>

      {track(approvals, 292, true)}
    </svg>
  );
}

/**
 * Abstract diagram of the multi-tenant platform: a request passes through a
 * JWT/RBAC gate and then fans into two tenant lanes whose records never cross
 * the dashed isolation boundary.
 */
function TenantDiagram() {
  const lane = (x: number, label: string, accent: string) => (
    <g>
      <rect
        x={x}
        y="232"
        width="240"
        height="124"
        rx="6"
        fill="rgba(238,244,250,0.05)"
        stroke="rgba(238,244,250,0.2)"
        strokeDasharray="1 4"
      />
      <text
        x={x + 16}
        y="258"
        className="font-mono"
        fontSize="10"
        letterSpacing="2.5"
        fill="rgba(238,244,250,0.55)"
      >
        {label}
      </text>
      {[282, 308, 334].map((y) => (
        <g key={y}>
          <circle cx={x + 18} cy={y + 4} r="2.5" fill={accent} />
          <rect
            x={x + 30}
            y={y}
            width="150"
            height="8"
            rx="4"
            fill="rgba(238,244,250,0.1)"
          />
        </g>
      ))}
    </g>
  );

  return (
    <svg
      viewBox="0 0 640 400"
      className="h-full w-full"
      role="img"
      aria-label="Abstract diagram: an API request passes a JWT and RBAC gate, then fans into two isolated tenant lanes."
    >
      <rect
        x="220"
        y="40"
        width="200"
        height="52"
        rx="6"
        fill="rgba(192,86,108,0.06)"
        stroke="rgba(192,86,108,0.28)"
        strokeDasharray="1 4"
      />
      <text
        x="320"
        y="71"
        textAnchor="middle"
        className="font-mono"
        fontSize="10"
        letterSpacing="2"
        fill="rgba(238,244,250,0.7)"
      >
        API REQUEST
      </text>

      <g stroke="rgba(142,166,232,0.4)" fill="rgba(142,166,232,0.5)">
        <line x1="320" y1="92" x2="320" y2="118" strokeWidth="1" />
        <path d="M 316 112 L 320 122 L 324 112 Z" stroke="none" />
      </g>

      <rect
        x="170"
        y="128"
        width="300"
        height="52"
        rx="6"
        fill="rgba(142,166,232,0.07)"
        stroke="rgba(142,166,232,0.32)"
      />
      <text
        x="320"
        y="159"
        textAnchor="middle"
        className="font-mono"
        fontSize="10"
        letterSpacing="2"
        fill="rgba(238,244,250,0.75)"
      >
        JWT AUTH · RBAC
      </text>

      <path
        className="draw-path"
        d="M 320 180 V 206 M 180 206 H 460 M 180 206 V 220 M 460 206 V 220"
        fill="none"
        stroke="rgba(142,166,232,0.35)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <g fill="rgba(142,166,232,0.5)">
        <path d="M 176 216 L 180 226 L 184 216 Z" />
        <path d="M 456 216 L 460 226 L 464 216 Z" />
      </g>

      {lane(60, "TENANT A", "rgba(142,166,232,0.9)")}
      {lane(340, "TENANT B", "rgba(192,86,108,0.85)")}

      <line
        x1="320"
        y1="214"
        x2="320"
        y2="372"
        stroke="rgba(238,244,250,0.12)"
        strokeDasharray="1 4"
      />

      <text
        x="320"
        y="390"
        textAnchor="middle"
        className="font-mono"
        fontSize="10"
        letterSpacing="3"
        fill="rgba(238,244,250,0.5)"
      >
        TENANT-LEVEL DATA ISOLATION
      </text>
    </svg>
  );
}

const DIAGRAMS: Record<Project["diagram"], () => React.JSX.Element> = {
  helpdesk: HelpdeskDiagram,
  tenant: TenantDiagram,
  agent: AgentDiagram,
  pipeline: PipelineDiagram,
};

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-6 py-28 md:px-10 md:py-40">
        <SectionHeading index="03" label="Projects" title="Projects" />

        <div className="flex flex-col gap-28 md:gap-36">
          {projects.map((project, i) => {
            const Diagram = DIAGRAMS[project.diagram] ?? AgentDiagram;
            const projectLinks = [
              { label: "GitHub", url: project.githubUrl },
              { label: "Live", url: project.liveUrl },
              { label: "Demo", url: project.demoUrl },
            ].filter((link): link is { label: string; url: string } =>
              Boolean(link.url),
            );

            return (
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
                    {projectLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${link.label} — opens in a new tab`}
                        className="chip font-mono text-[11px] uppercase text-ice"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </Reveal>
                </div>

                <Reveal
                  delay={150}
                  className="md:col-span-6 md:pl-8"
                >
                  <div className="float-slow relative aspect-[16/10] overflow-hidden rounded-sm border border-line bg-panel">
                    <div className="absolute inset-0 p-2 opacity-90">
                      <Diagram />
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-ice/5"
                    />
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}