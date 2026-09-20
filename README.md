# Gaurav Rathore — Portfolio

A premium, cinematic single-page portfolio for **Gaurav Rathore**, built with
Next.js (App Router), React 19, TypeScript and Tailwind CSS v4.

An abstract, editorial scroll experience — masked typographic reveals, kinetic
marquees, an Alto's-Odyssey night sky built on a restrained three-colour
palette (blue, maroon, black) with drifting stars and occasional comets that
react to the pointer, nebula washes, rotating and tilting geometry,
scroll-velocity parallax, an ambient background that shifts between blue and
maroon bands as you scroll, a custom accent cursor, and a fully themeable
light/dark mode (dark is the primary design).

## Profile picture

Drop your portrait at **`public/profile/portrait.jpg`**. The site shows it as
a simple framed image beside your name in the hero, and falls back to your
initials while the file is missing. The current file was fetched automatically
from the GitHub account this repository uses (`GauravRathore11`) — replace it
any time; no code change needed. See `public/profile/README.md`.

## Content source — how to keep it in sync with your resume

All content lives in **two** files, and the components read from them
exclusively:

| File                  | Holds                                                        |
| --------------------- | ------------------------------------------------------------ |
| `src/data/profile.ts` | Everything factual: skills, experience, projects, education, achievements, contact text |
| `src/data/links.ts`   | Every URL / `href`: email & phone links, GitHub, LinkedIn, project repo URLs |

Update your resume → edit `profile.ts` (content) and `links.ts` (URLs). Put
your real GitHub/LinkedIn/profile URLs into `links.ts` and the site renders
them as links automatically (they stay as plain labels while empty).

Nothing is invented or embellished; sections without supporting information in
the resume (e.g. a personal “About” paragraph) are omitted.

## Setup

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command         | Purpose                      |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Production build             |
| `npm run start` | Serve the production build   |
| `npm run lint`  | ESLint check                 |

## Structure

```
src/
  app/
    layout.tsx        Fonts, metadata, theme bootstrap script, ThemeProvider
    page.tsx          Section composition + overlays
    globals.css       Design tokens (dark + light), keyframes, reveal/mask CSS
  data/
    profile.ts        All resume-derived content (single source of truth)
    links.ts          Every URL / href used by the site
  hooks/
    useInView.ts          IntersectionObserver scroll-reveal hook
    useReducedMotion.ts   prefers-reduced-motion hook
    useScrollProgress.ts  rAF-throttled progress + global `--sy` parallax var
  components/
    ThemeProvider.tsx     Dark/light theme state (persisted, OS-aware)
    ThemeToggle.tsx       Fixed sun/moon toggle
    AmbientBackground.tsx Fixed backdrop that cross-fades per section
    CosmosField.tsx       Fixed CSS star field + nebula washes (page-wide)
    CustomCursor.tsx      Accent dot + lagging ring cursor
    Hero.tsx              Full-screen cinematic opener (pointer tilt)
    Portrait.tsx          Simple framed avatar + initials fallback
    Skills.tsx            Technical skills + kinetic marquees
    Experience.tsx        Spined timeline with pulsing nodes
    Projects.tsx          Editorial spreads + abstract SVG diagrams
    Education.tsx         Typographic education list
    Achievements.tsx      Numbered achievements & certifications
    Contact.tsx           Contact finale (reads from links.ts)
    ProgressRail.tsx      Scroll progress bar + section rail
    Marquee.tsx           CSS kinetic typography strip
    MaskLines.tsx         Masked line-by-line text reveal
    Reveal.tsx            Generic scroll reveal wrapper
    canvas/Constellation.tsx  Dense, multi-hue, pointer-reactive starfield
```

## Motion, themes & accessibility

- Reveals use `IntersectionObserver`; parallax runs via one rAF-throttled
  listener writing `--sy`; marquees, rings, aurora and floats are pure CSS;
  the canvas starfield pauses off-viewport and respects DPR — no animation
  library.
- **Light & dark themes**: toggle (sun/moon) in the top-right; follows the OS
  preference first, then persists to `localStorage`. A tiny inline script
  applies the stored theme before paint to avoid flashing.
- **Scroll**: the fixed background tints each section differently and
  cross-fades as you scroll; a gradient progress bar and labelled right rail
  track position.
- **Cursor**: a custom accent cursor (dot + lagging ring) that swells over
  interactive elements; the hero rings tilt toward the pointer, the starfield
  ripples away from and brightens around the cursor, and the whole field
  parallaxes with it. Disabled on touch devices.
- `prefers-reduced-motion: reduce` disables marquees, reveals, parallax, ring
  spin, cursor and canvas animation (a static frame is drawn).
- Semantic navigation (`<nav>`, `aria-current`, `aria-label`) throughout;
  decorative layers are `aria-hidden` with accessible text equivalents.