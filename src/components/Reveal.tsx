"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type RevealProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  style?: CSSProperties;
};

/**
 * Wraps content in a scroll-reveal: hidden + translated below the fold,
 * then eased into place once it intersects the viewport.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  id,
  style,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  });

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`rv ${className} ${inView ? "is-in" : ""}`}
      style={{ ...style, "--rv-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}