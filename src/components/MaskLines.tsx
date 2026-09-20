"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type MaskLinesProps = {
  /** One entry per masked line. Strings or styled nodes are allowed. */
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** When provided, the visual is hidden from AT and this clean text is read instead. */
  ariaLabel?: string;
};

/**
 * Reveals text line-by-line inside overflow masks — the classic masked
 * typographic reveal used for headlines and hero type.
 */
export function MaskLines({
  lines,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 120,
  ariaLabel,
}: MaskLinesProps) {
  const { ref, inView } = useInView<HTMLElement>({
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <Tag ref={ref as never} className={`${className} ${inView ? "is-in" : ""}`}>
      {ariaLabel ? <span className="sr-only">{ariaLabel}</span> : null}
      <span aria-hidden={ariaLabel ? "true" : undefined} className="block">
        {lines.map((line, i) => (
          <span key={i} className="mask block">
            <span
              className="mask-line block"
              style={
                { "--rv-delay": `${delay + i * stagger}ms` } as CSSProperties
              }
            >
              {line}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}