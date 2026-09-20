"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** Hue pick from the active palette. */
  color: string;
  /** Large blurred glow star. */
  glow: boolean;
  /** Individual twinkle phase (0…2π). */
  phase: number;
  /** Per-star drift speed multiplier. */
  speed: number;
};

type Comet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

/**
 * Restrained night-sky palette: cool blue/white dominates, with a rare maroon
 * ember — never more than three general hues.
 */
const DARK_STAR_COLORS = [
  "rgba(142, 166, 232, 0.95)", // blue
  "rgba(126, 152, 224, 0.9)", // blue (variant)
  "rgba(210, 220, 246, 0.9)", // pale blue-white
  "rgba(238, 244, 250, 0.95)", // white
  "rgba(206, 218, 244, 0.8)", // dim cool white
  "rgba(192, 86, 108, 0.85)", // maroon (sparse)
];

const MAROON_WEIGHT = 0.18;

const LIGHT_STAR_COLORS = ["rgba(45, 58, 75, 0.6)", "rgba(45, 58, 75, 0.4)"];

function readLinkColor(): { r: number; g: number; b: number } {
  const raw =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--link-fill")
      .trim() || "rgba(142, 166, 232, 0.16)";
  const match = raw.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  return match
    ? { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) }
    : { r: 127, g: 227, b: 221 };
}

function starCount(width: number): number {
  if (width < 640) return 90;
  if (width < 1024) return 160;
  return 220;
}

/**
 * Ambient cosmic field on <canvas>. Dense, multi-coloured stars (with some
 * large glowing ones) drift and twinkle, link with faint lines when near each
 * other, ripple away from the pointer, brighten around it, and a comet
 * occasionally streaks across. The whole field shifts in parallax with the
 * cursor. Pauses off-viewport, stays static under reduced motion, honours DPR
 * and follows the active theme.
 */
export function Constellation({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const linkBase = readLinkColor();
    const palette =
      theme === "dark" ? DARK_STAR_COLORS : LIGHT_STAR_COLORS;
    const finePointer = window.matchMedia("(pointer: fine)").matches && !reduced;

    // Normalised pointer (-0.5…0.5) for parallax, raw position for repulsion.
    const pointer = { x: -9999, y: -9999, nx: 0, ny: 0, active: false };

    let raf = 0;
    let running = false;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let comet: Comet | null = null;
    let nextCometAt = performance.now() + 6000 + Math.random() * 9000;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = starCount(width);
      const lastIndex = palette.length - 1;
      stars = Array.from({ length: count }, () => {
        const glow = Math.random() < 0.1;
        // Glow stars are always cool tones; maroon (the final palette entry)
        // appears sparsely on the rest.
        const coolIndex = Math.floor(Math.random() * Math.max(1, lastIndex));
        const maroon = !glow && palette.length > 1 && Math.random() < MAROON_WEIGHT;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.24,
          vy: (Math.random() - 0.5) * 0.24,
          r: glow ? 2 + Math.random() * 1.8 : 0.5 + Math.random() * 1.5,
          color: maroon ? palette[lastIndex] : palette[coolIndex],
          glow,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random(),
        };
      });
    };

    const spawnComet = () => {
      const fromLeft = Math.random() < 0.5;
      const angle = (fromLeft ? -0.32 : Math.PI - 0.32) + (Math.random() - 0.5) * 0.15;
      const speed = 340 + Math.random() * 260;
      comet = {
        x: fromLeft ? -60 : width + 60,
        y: 0.15 * height + Math.random() * 0.5 * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 2.1 + Math.random() * 0.9,
      };
    };

    const drawFrame = (now: number) => {
      const t = now / 1000;
      ctx.clearRect(0, 0, width, height);

      // Whole-field parallax from the pointer.
      const ox = -pointer.nx * 20;
      const oy = -pointer.ny * 16;

      // Drift + repulsion + twinkle.
      for (const s of stars) {
        s.x += s.vx * s.speed;
        s.y += s.vy * s.speed;

        if (pointer.active) {
          const dx = s.x - pointer.x;
          const dy = s.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200 && dist > 0.001) {
            const force = ((200 - dist) / 200) * 3.4;
            s.x += (dx / dist) * force;
            s.y += (dy / dist) * force;
          }
        }

        if (s.x < -24) s.x = width + 24;
        else if (s.x > width + 24) s.x = -24;
        if (s.y < -24) s.y = height + 24;
        else if (s.y > height + 24) s.y = -24;
      }

      // Constellation links (cheap squared distance check first).
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 10000) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / 100) * 0.06;
            ctx.strokeStyle = `rgba(${linkBase.r}, ${linkBase.g}, ${linkBase.b}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(stars[i].x + ox, stars[i].y + oy);
            ctx.lineTo(stars[j].x + ox, stars[j].y + oy);
            ctx.stroke();
          }
        }
      }

      // Stars themselves.
      for (const s of stars) {
        const twinkle = 0.55 + 0.45 * Math.sin(t * (1.4 * s.speed) + s.phase);
        const nearPointer =
          pointer.active &&
          Math.hypot(s.x - pointer.x, s.y - pointer.y) < 130;
        const scale = nearPointer ? 1.8 : 1;
        const alpha = (nearPointer ? 1 : twinkle) * 0.95;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        if (s.glow) {
          // Soft halo + bright core.
          ctx.globalAlpha = alpha * 0.18;
          ctx.beginPath();
          ctx.arc(s.x + ox, s.y + oy, s.r * 3.1 * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = alpha;
        }
        ctx.beginPath();
        ctx.arc(s.x + ox, s.y + oy, s.r * scale, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Comet.
      if (!comet && now > nextCometAt) {
        spawnComet();
        nextCometAt = now + 9000 + Math.random() * 12000;
      }
      if (comet) {
        comet.life += 1 / 60;
        comet.x += comet.vx / 60;
        comet.y += comet.vy / 60;
        const fade = Math.max(0, 1 - comet.life / comet.maxLife);

        const speed = Math.hypot(comet.vx, comet.vy);
        const nx = comet.vx / speed;
        const ny = comet.vy / speed;
        const segments = 18;
        const len = 130;
        for (let k = segments; k >= 0; k--) {
          const p = k / segments;
          const px = comet.x - nx * len * p;
          const py = comet.y - ny * len * p;
          ctx.strokeStyle = `rgba(210, 222, 250, ${fade * (1 - p) * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.2, 1.2 * (1 - p)), 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(222, 232, 252, ${fade})`;
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 1.6, 0, Math.PI * 2);
        ctx.fill();

        if (comet.life >= comet.maxLife) comet = null;
      }

      raf = requestAnimationFrame(drawFrame);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = s.color;
        if (s.glow) {
          ctx.globalAlpha = 0.16;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3.1, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 0.85;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    resize();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !running && !reduced) {
            running = true;
            raf = requestAnimationFrame(drawFrame);
          } else if (!entry.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(raf);
          }
        }
      },
      { threshold: 0.01 },
    );

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.nx = event.clientX / window.innerWidth - 0.5;
      pointer.ny = event.clientY / window.innerHeight - 0.5;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
      pointer.nx = 0;
      pointer.ny = 0;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerLeave, { passive: true });
    io.observe(canvas);

    if (reduced) drawStatic();
    else {
      running = true;
      raf = requestAnimationFrame(drawFrame);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerLeave);
      io.disconnect();
    };
  }, [reduced, theme]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}