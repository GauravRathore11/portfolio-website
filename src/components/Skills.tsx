import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { skillGroups } from "@/data/profile";

export function Skills() {
  const [languages, backend, cloud, data, core] = skillGroups;
  const marqueeA = [...languages.items, ...backend.items];
  const marqueeB = [...cloud.items, ...data.items, ...core.items];

  return (
    <section id="skills" className="relative overflow-hidden">
      {/* Ghost display type drifting behind the section; wrapper adds scroll parallax */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 overflow-hidden select-none"
        style={{
          transform: "translate3d(0, calc(var(--sy, 0) * -0.05), 0)",
        }}
      >
        <p className="ghost-type font-display text-center text-[26vw] leading-none whitespace-nowrap">
          Skills — Skills — Skills
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-28 md:px-10 md:py-40">
        <SectionHeading index="01" label="Technical Skills" title="Technical\nSkills" />

        <div className="-mx-6 mb-16 md:-mx-10">
          <Marquee
            items={marqueeA}
            speed={54}
            className="border-y border-line py-4 font-mono text-[13px] tracking-[0.24em] uppercase text-ghost/40"
          />
        </div>

        <div className="relative grid gap-x-12 gap-y-14 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 70}
              className="border-t border-line pt-6"
            >
              <div className="mb-5 flex items-baseline gap-4">
                <span className="font-mono text-xs text-ice">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl font-normal text-ghost md:text-3xl">
                  {group.title}
                </h3>
              </div>
              <p className="font-mono text-[13px] leading-loose text-muted">
                {group.items.map((item, j) => (
                  <span key={item}>
                    {j > 0 && (
                      <span aria-hidden="true" className="mx-2 text-ice/40">
                        ·
                      </span>
                    )}
                    <span className="transition-colors duration-300 hover:text-ghost">
                      {item}
                    </span>
                  </span>
                ))}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="-mx-6 mt-16 md:-mx-10">
          <Marquee
            items={marqueeB}
            reverse
            speed={64}
            className="border-y border-line py-4 font-mono text-[13px] tracking-[0.24em] uppercase text-ghost/30"
          />
        </div>
      </div>
    </section>
  );
}