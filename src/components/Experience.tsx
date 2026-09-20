import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SpineNode } from "@/components/SpineNode";
import { experience } from "@/data/profile";

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-6 py-28 md:px-10 md:py-40">
        <SectionHeading index="02" label="Professional Experience" title="Experience" />

        <div className="relative pl-12 md:pl-0">
          {/* Spine */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[15px] w-px bg-line md:left-[199px]"
          />

          <div className="flex flex-col gap-16 md:gap-20">
            {experience.map((job) => (
              <article
                key={`${job.role}-${job.period}`}
                className="relative md:grid md:grid-cols-[200px_1fr] md:gap-x-14"
              >
                <SpineNode className="top-2 left-[11px] md:left-[195px]" />

                <div>
                  <Reveal className="font-mono text-xs uppercase tracking-[0.24em] text-ice/80">
                    {job.period}
                  </Reveal>
                  <Reveal
                    delay={80}
                    className="mt-3 font-mono text-sm text-muted"
                  >
                    {job.company}
                    <span aria-hidden="true" className="mx-2 text-ice/50">
                      —
                    </span>
                    {job.location}
                  </Reveal>
                </div>

                <div className="mt-6 md:mt-0">
                  <Reveal
                    as="h3"
                    className="font-display text-3xl font-normal text-ghost md:text-4xl"
                  >
                    {job.role}
                  </Reveal>
                  <ul className="mt-6 space-y-4">
                    {job.bullets.map((bullet, j) => (
                      <Reveal
                        as="li"
                        key={bullet}
                        delay={140 + j * 90}
                        className="flex gap-4 text-[15px] leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.65em] h-px w-6 shrink-0 bg-ice/50"
                        />
                        <span>{bullet}</span>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}