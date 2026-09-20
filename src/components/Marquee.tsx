import type { CSSProperties } from "react";

type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  speed?: number;
  className?: string;
  itemClassName?: string;
};

/**
 * Seamless CSS-only kinetic typography strip. Content is duplicated once so
 * the -50% translation loops without a visible seam. Pauses on hover/focus
 * and stops entirely under reduced motion (handled globally in CSS).
 */
export function Marquee({
  items,
  reverse = false,
  speed = 46,
  className = "",
  itemClassName = "",
}: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div
        className={`marquee-track items-center ${reverse ? "marquee-rev" : ""}`}
        style={{ "--mq-speed": `${speed}s` } as CSSProperties}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap ${itemClassName}`}
          >
            <span>{item}</span>
            <span aria-hidden="true" className="text-[0.6em] text-ice/40">
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}