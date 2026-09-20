"use client";

import { useEffect, useRef } from "react";

/**
 * Accent cursor: a crisp dot that tracks the pointer and a lagging ring that
 * swells over anything interactive (links, buttons, chips). Pure decoration —
 * the native cursor stays visible. The markup is identical on server and
 * client; the layer is hidden on touch devices and under reduced motion.
 */
export function CustomCursor() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const dot = layer.querySelector<HTMLDivElement>(".cursor-dot");
    const ring = layer.querySelector<HTMLDivElement>(".cursor-ring");
    if (!dot || !ring) return;

    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      layer.style.display = "none";
      return;
    }

    let raf = 0;
    let hovering = false;
    const position = { x: -100, y: -100 };
    const ringPosition = { x: -100, y: -100 };

    const onMove = (event: PointerEvent) => {
      position.x = event.clientX;
      position.y = event.clientY;
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      hovering = Boolean(
        target?.closest("a, button, [data-cursor], .chip, .link-line"),
      );
    };

    const tick = () => {
      ringPosition.x += (position.x - ringPosition.x) * 0.16;
      ringPosition.y += (position.y - ringPosition.y) * 0.16;

      dot.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1.7 : 1})`;
      ring.style.opacity = hovering ? "0.9" : "0.5";
      dot.style.opacity = hovering ? "0.4" : "1";

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80]"
    >
      <div
        className="cursor-dot fixed top-0 left-0"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      <div
        className="cursor-ring fixed top-0 left-0"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
    </div>
  );
}