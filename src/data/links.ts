import { profile } from "@/data/profile";

/**
 * Every URL / href used anywhere on the site lives here.
 *
 * To keep the site in sync with your resume, edit this file (and
 * `profile.ts` for content) — the components only ever read from these two
 * files. The GitHub / LinkedIn URLs are read straight from
 * `profile.socials`: put (or update) the real profile links there and every
 * label on the site becomes clickable automatically.
 */

export type ContactLink = {
  label: string;
  /** Visible text additionally shown in the contact list. */
  text: string;
  href: string;
};

export type OptionalLink = {
  label: string;
  /** Undefined/empty while no real profile URL is available. */
  url?: string;
};

/** Looks up a social profile URL by its label in `profile.socials`. */
function socialUrl(label: string): string | undefined {
  return profile.socials.find((social) => social.label === label)?.href;
}

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
    url: socialUrl("GitHub"),
  },
  linkedin: {
    label: "LinkedIn",
    url: socialUrl("LinkedIn"),
  },
};

/** Anchor used by the "return to top" controls. */
export const TOP_ANCHOR = "#top";