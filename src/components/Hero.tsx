"use client";

import { useEffect, useRef } from "react";
import { Constellation } from "@/components/canvas/Constellation";
import { MaskLines } from "@/components/MaskLines";
import { Portrait } from "@/components/Portrait";
import { links } from "@/data/links";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Cinematic opener. Full-screen composition of:
 *  - an animated aurora field and a drifting constellation canvas,
 *  - counter-rotating dashed rings that tilt toward the pointer,
 *  - a masked, line-by-line reveal of the name,
 *  - scroll-velocity parallax (via the global `--sy` published by
 *    useScrollProgress) plus a subtle pointer-follow shift on the name.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  // Pointer tilt: the ring field and the name lean gently toward the cursor
  // (mouse pointers only, skipped under reduced motion).
  useEffect(() => {
    if (reduced) return;
    const el = rootRef.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const mx = (event.clientX - rect.left) / rect.width - 0.5;
      const my = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--mx", String(mx));
      el.style.setProperty("--my", String(my));
    };

    el.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => el.removeEventListener("pointermove", onPointerMove);
  }, [reduced]);

  return (
    <header
      id="top"
      ref={rootRef}
      className="relative overflow-hidden"
      style={{ "--mx": "0", "--my": "0" } as React.CSSProperties}
    >
      {/* Ambient aurora field (scroll parallax layer) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          transform: "translate3d(0, calc(var(--sy, 0) * -0.1), 0)",
        }}
      >
        <div className="aurora-a absolute -top-[18%] left-[-12%] h-[80vmin] w-[80vmin]" />
        <div className="aurora-b absolute top-[28%] right-[-18%] h-[70vmin] w-[70vmin]" />
        <div className="aurora-c absolute bottom-[-10%] left-[28%] h-[64vmin] w-[64vmin]" />
      </div>

      <Constellation className="absolute inset-0 h-full w-full opacity-70" />

      {/* Counter-rotating dashed rings — tilt toward the pointer */}
      <div
        aria-hidden="true"
        className="absolute top-[2%] right-[-30%] h-[70vmin] w-[70vmin] opacity-50 [perspective:1200px] md:right-[-8%]"
        style={{
          transform: "translate3d(0, calc(var(--sy, 0) * 0.16), 0)",
        }}
      >
        <div
          className="h-full w-full [transform-style:preserve-3d]"
          style={{
            transform:
              "rotateY(calc(var(--mx, 0) * 12deg)) rotateX(calc(var(--my, 0) * -9deg))",
          }}
        >
          <svg viewBox="0 0 600 600" className="ring h-full w-full">
            <circle
              cx="300"
              cy="300"
              r="280"
              fill="none"
              stroke="var(--ring-a)"
              strokeWidth="1"
              strokeDasharray="2 10"
            />
            <circle
              cx="300"
              cy="300"
              r="210"
              fill="none"
              stroke="var(--ring-b)"
              strokeWidth="1.5"
              strokeDasharray="40 30"
            />
          </svg>
          <svg
            viewBox="0 0 600 600"
            className="ring absolute inset-0 h-full w-full"
            style={{ animationDirection: "reverse" }}
          >
            <circle
              cx="300"
              cy="300"
              r="245"
              fill="none"
              stroke="var(--ring-b)"
              strokeWidth="1"
              strokeDasharray="1 6"
            />
          </svg>
        </div>
      </div>

      <div
        className="relative z-10 mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-between px-6 pt-28 pb-10 md:px-10 md:pt-32"
      >
        {/* Top meta strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
          <MaskLines
            as="p"
            delay={200}
            lines={[`${profile.role} — ${profile.company} · ${profile.location}`]}
          />
          <MaskLines
            as="p"
            delay={340}
            lines={[`${profile.name} · ${new Date().getFullYear()}`]}
          />
        </div>

        {/* Name + portrait — subtle pointer-follow shift */}
        <div
          className="mt-8 flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between"
          style={{
            transform:
              "translate3d(calc(var(--sy, 0) * 0.06), 0, 0) translateX(calc(var(--mx, 0) * 14px))",
          }}
        >
          <h1 className="font-display text-[clamp(3.4rem,13vw,10rem)] leading-[0.92] tracking-[-0.02em] font-normal text-ghost md:max-w-[15ch]">
            <MaskLines
              lines={[
                profile.name.split(" ")[0],
                <span key="last">
                  <span className="italic">{profile.name.split(" ")[1]}</span>
                  <span className="text-ice">.</span>
                </span>,
              ]}
              ariaLabel={profile.name}
              delay={480}
              stagger={160}
            />
          </h1>
          <Portrait className="h-28 w-28 shrink-0 md:h-52 md:w-52" />
        </div>

        {/* Bottom strip */}
        <div className="mt-16">
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 font-mono text-[13px] text-muted">
            <a
              className="link-line"
              href={links.email.href}
              aria-label={`Email ${links.email.text}`}
            >
              {links.email.text}
            </a>
            <a
              className="link-line"
              href={links.phone.href}
              aria-label={`Phone ${links.phone.text}`}
            >
              {links.phone.text}
            </a>
          </div>

          <div className="mt-6 h-px w-full bg-line" />

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.28em] text-muted/70">
              {[links.github, links.linkedin].map((social) =>
                social.url ? (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${social.label} (opens in a new tab)`}
                    className="link-line transition-colors hover:text-ice"
                  >
                    {social.label} <span className="text-ice">↗</span>
                  </a>
                ) : (
                  <span key={social.label}>{social.label}</span>
                ),
              )}
            </p>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                Scroll
              </span>
              <span
                aria-hidden="true"
                className="relative block h-10 w-px overflow-hidden bg-[var(--cue-track)]"
              >
                <span className="cue-dot absolute top-0 left-0 block h-3 w-px bg-ice" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}