"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const SECTIONS = [
  { id: "top", label: "Intro" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

/**
 * Minimal navigation chrome: a thin gradient scroll-progress bar at the very
 * top, and a right-edge rail (md+) with labelled section ticks that track the
 * section currently crossing the viewport.
 */
export function ProgressRail() {
  const progress = useScrollProgress();
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState("top");

  useEffect(() => {
    const elements = SECTIONS.map((s) =>
      document.getElementById(s.id),
    ).filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-line"
      >
        <div
          className="h-full bg-gradient-to-r from-ice to-ember"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <nav
        aria-label="Section navigation"
        className="fixed top-1/2 right-4 z-[60] hidden -translate-y-1/2 md:block lg:right-6"
      >
        <ul className="flex flex-col items-end gap-4">
          {SECTIONS.map((section) => {
            const active = section.id === activeId;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => go(section.id)}
                  aria-current={active ? "true" : undefined}
                  className="group flex items-center gap-3"
                >
                  <span
                    className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                      active
                        ? "text-ice opacity-100"
                        : "text-muted opacity-0 group-hover:opacity-70"
                    }`}
                  >
                    {section.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`block h-[2px] transition-all duration-300 ${
                      active
                        ? "w-8 bg-ice shadow-[0_0_10px_rgba(142,166,232,0.8)]"
                        : "w-4 bg-ghost/20 group-hover:w-6"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}