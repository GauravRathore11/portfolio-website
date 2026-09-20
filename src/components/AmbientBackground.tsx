"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

type RGB = [number, number, number];

/**
 * One ambient tint per section. The fixed backdrop layer cross-fades between
 * neighbouring sections as you scroll, so the whole page subtly changes
 * colour as it moves. Alpha stays low — it colours the atmosphere, not the
 * content.
 */
const PALETTES: Record<"dark" | "light", RGB[]> = {
  dark: [
    [7, 9, 16], // Intro — near-black blue
    [13, 17, 32], // Skills — blue
    [11, 15, 28], // Experience — blue
    [36, 12, 20], // Projects — maroon
    [14, 14, 30], // Education — blue
    [32, 11, 20], // Achievements — maroon
    [7, 9, 16], // Contact — bookend
  ],
  light: [
    [232, 236, 244], // Intro
    [230, 233, 243], // Skills
    [228, 232, 242], // Experience
    [244, 228, 230], // Projects
    [231, 233, 244], // Education
    [242, 228, 230], // Achievements
    [232, 236, 244], // Contact
  ],
};

const SECTION_IDS = [
  "top",
  "skills",
  "experience",
  "projects",
  "education",
  "achievements",
  "contact",
];

function lerp(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

const rgba = (c: RGB, alpha: number) =>
  `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;

export function AmbientBackground() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (s): s is HTMLElement => s !== null,
    );
    if (sections.length < 2) return;

    let raf = 0;
    let dirty = true;

    const render = () => {
      raf = 0;
      dirty = false;
      const palette = PALETTES[theme];
      const sampleY = window.scrollY + window.innerHeight * 0.35;

      let index = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= sampleY) index = i;
      }
      const next = Math.min(index + 1, sections.length - 1);
      const span = Math.max(1, sections[next].offsetTop - sections[index].offsetTop);
      const t = Math.min(1, Math.max(0, (sampleY - sections[index].offsetTop) / span));

      const c1 = lerp(palette[index], palette[next], t);
      // Second gradient spot simply follows the upcoming section's tint.
      const c2 = palette[next];

      el.style.backgroundImage = `radial-gradient(90% 70% at 14% 6%, ${rgba(c1, theme === "dark" ? 0.5 : 0.55)}, transparent 62%), radial-gradient(80% 64% at 88% 96%, ${rgba(c2, theme === "dark" ? 0.42 : 0.5)}, transparent 58%)`;
    };

    const mark = () => {
      if (!dirty) {
        dirty = true;
        raf = requestAnimationFrame(render);
      }
    };

    render();
    window.addEventListener("scroll", mark, { passive: true });
    window.addEventListener("resize", mark);
    return () => {
      window.removeEventListener("scroll", mark);
      window.removeEventListener("resize", mark);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [theme]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}