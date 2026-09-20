import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 font-mono text-[11px] tracking-[0.24em] text-muted uppercase md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} — {profile.name}</p>
        <p className="hidden md:block">
          {profile.role} · {profile.company} · {profile.location}
        </p>
        <p className="hidden lg:block">
          Built with Next.js · React · TypeScript · Tailwind CSS
        </p>
      </div>
    </footer>
  );
}