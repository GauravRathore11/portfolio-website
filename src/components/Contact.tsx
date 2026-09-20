import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { links, TOP_ANCHOR } from "@/data/links";
import { profile } from "@/data/profile";

export function Contact() {
  const rows: { label: string; content: ReactNode }[] = [
    {
      label: links.email.label,
      content: (
        <a
          className="link-line font-mono text-[15px] text-ghost"
          href={links.email.href}
          aria-label={`Email ${links.email.text}`}
        >
          {links.email.text}
        </a>
      ),
    },
    {
      label: links.phone.label,
      content: (
        <a
          className="link-line font-mono text-[15px] text-ghost"
          href={links.phone.href}
          aria-label={`Phone ${links.phone.text}`}
        >
          {links.phone.text}
        </a>
      ),
    },
    {
      label: links.github.label,
      content: links.github.url ? (
        <a
          className="link-line font-mono text-[15px] text-ghost"
          href={links.github.url}
          target="_blank"
          rel="noreferrer"
        >
          {links.github.label} ↗
        </a>
      ) : (
        <span className="font-mono text-[15px] text-muted">
          {links.github.label}
        </span>
      ),
    },
    {
      label: links.linkedin.label,
      content: links.linkedin.url ? (
        <a
          className="link-line font-mono text-[15px] text-ghost"
          href={links.linkedin.url}
          target="_blank"
          rel="noreferrer"
        >
          {links.linkedin.label} ↗
        </a>
      ) : (
        <span className="font-mono text-[15px] text-muted">
          {links.linkedin.label}
        </span>
      ),
    },
    {
      label: "Location",
      content: (
        <span className="font-mono text-[15px] text-muted">
          {profile.location}
        </span>
      ),
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute bottom-[-30%] left-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2"
      >
        <div className="aurora-a h-full w-full opacity-60" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-28 md:px-10 md:py-40">
        <SectionHeading index="06" label="Contact" title="Contact" />

        <Reveal className="max-w-2xl">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid gap-1 border-b border-line py-5 md:grid-cols-[160px_1fr] md:items-baseline md:gap-10"
            >
              <dt className="font-mono text-[11px] tracking-[0.28em] text-muted uppercase">
                {row.label}
              </dt>
              <dd>{row.content}</dd>
            </div>
          ))}
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <a
            href={TOP_ANCHOR}
            className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.28em] text-muted uppercase transition-colors hover:text-ice"
          >
            <span aria-hidden="true" className="text-ice">
              ↑
            </span>
            Return to top
          </a>
        </Reveal>
      </div>
    </section>
  );
}