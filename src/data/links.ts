import { profile } from "@/data/profile";

/**
 * Every URL / href used anywhere on the site lives here.
 *
 * To keep the site in sync with your resume, edit this file (and
 * `profile.ts` for content) — the components only ever read from these two
 * files. Paste your real profile URLs into `github.url` / `linkedin.url`
 * when you have them: the site renders them as links automatically, and as
 * plain labels while they are empty.
 */

export type ContactLink = {
  label: string;
  /** Visible text additionally shown in the contact list. */
  text: string;
  href: string;
};

export type OptionalLink = {
  label: string;
  /** Leave empty/undefined to render as a non-link label. */
  url?: string;
};

export const links: {
  email: ContactLink;
  phone: ContactLink;
  github: OptionalLink;
  linkedin: OptionalLink;
} = {
  email: {
    label: "Email",
    text: profile.email,
    href: `mailto:${profile.email}`,
  },
  phone: {
    label: "Phone",
    text: profile.phone,
    href: `tel:${profile.phoneLink}`,
  },
  github: {
    label: "GitHub",
    url: "", // e.g. "https://github.com/gauravrathore"
  },
  linkedin: {
    label: "LinkedIn",
    url: "", // e.g. "https://www.linkedin.com/in/gauravrathore"
  },
};

/** Anchor used by the "return to top" controls. */
export const TOP_ANCHOR = "#top";