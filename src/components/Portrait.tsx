"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

/**
 * Simple framed portrait. Shows the file configured in
 * `profile.avatar.src` (drop it at /public/profile/portrait.jpg) and falls
 * back to a quiet initials mark if the file is missing or fails to load.
 */
export function Portrait({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const avatar = profile.avatar;
  const showImage = Boolean(avatar?.src) && !failed;

  return (
    <figure
      data-cursor
      className={`relative ${className}`}
      role="img"
      aria-label={showImage ? avatar?.alt : `Initials of ${profile.name}`}
    >
      <div className="h-full w-full overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_18px_50px_-24px_rgba(0,0,0,0.7)]">
        {showImage ? (
          // Plain <img>: built before hydration, gracefully swaps to the
          // initials mark if the file is ever missing.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatar!.src}
            alt={avatar!.alt}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full flex-col items-center justify-center gap-1"
          >
            <span className="font-display text-4xl leading-none italic text-ghost md:text-5xl">
              {profile.name.split(" ")[0][0]}
            </span>
            <span className="font-display text-4xl leading-none italic text-ice md:text-5xl">
              {profile.name.split(" ")[1][0]}
            </span>
          </div>
        )}
      </div>
    </figure>
  );
}