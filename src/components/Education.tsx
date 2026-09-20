import { MaskLines } from "@/components/MaskLines";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { education } from "@/data/profile";

export function Education() {
  return (
    <section id="education" className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-6 py-28 md:px-10 md:py-40">
        <SectionHeading index="04" label="Education" title="Education" />

        <div className="border-t border-line">
          {education.map((entry, i) => (
            <Reveal
              key={entry.institution}
              delay={i * 90}
              className="grid gap-4 border-b border-line py-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline md:gap-16 md:py-14"
            >
              <div>
                <h3 className="font-display text-3xl font-normal text-ghost md:text-4xl">
                  <MaskLines lines={[entry.institution]} delay={90} />
                </h3>
                <div className="mt-4 flex flex-col gap-1 font-mono text-[13px] text-muted">
                  {entry.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
              </div>
              {entry.period ? (
                <p className="font-mono text-xs tracking-[0.24em] text-ice/80 uppercase">
                  {entry.period}
                </p>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}