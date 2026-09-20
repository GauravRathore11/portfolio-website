"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Returns overall scroll progress through the page as a value from 0 to 1.
 * As a side effect it publishes the raw scroll Y into `--sy` on <html>,
 * which drives lightweight CSS parallax anywhere on the page. Skipped under
 * reduced motion.
 */
export function useScrollProgress(): number {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (!reduced) {
          document.documentElement.style.setProperty("--sy", String(y));
        }
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return progress;
}