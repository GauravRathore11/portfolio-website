import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { achievements } from "@/data/profile";

export function Achievements() {
  return (
    <section id="achievements" className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-6 py-28 md:px-10 md:py-40">
        <SectionHeading
          index="05"
          label="Achievements & Certifications"
          title="Achievements &\nCertifications"
        />

        <ol>
          {achievements.map((achievement, i) => (
            <Reveal
              as="li"
              key={achievement}
              delay={i * 110}
              className="grid gap-5 border-t border-line py-10 md:grid-cols-[150px_1fr] md:gap-10 md:py-12"
            >
              <span className="font-display text-4xl font-normal text-ice/70 md:text-5xl">
                0{i + 1}
              </span>
              <p className="max-w-2xl text-lg leading-relaxed text-ghost/90 md:text-xl">
                {achievement}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}