"use client";

import { useInView } from "@/hooks/useInView";

/**
 * Small rotated square marking each entry on the experience spine. Glows and
 * pulses ice-blue once the entry scrolls into view.
 */
export function SpineNode({ className = "" }: { className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.6 });

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`absolute -m-[4.5px] block h-[9px] w-[9px] rotate-45 transition-colors duration-500 ${
        inView ? "node-on bg-ice" : "bg-ghost/20"
      } ${className}`}
    />
  );
}