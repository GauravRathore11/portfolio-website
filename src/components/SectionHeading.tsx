import { MaskLines } from "@/components/MaskLines";
import { Reveal } from "@/components/Reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  /** May contain "\n" to control where the display type breaks. */
  title: string;
};

/**
 * Editorial section opener: indexed mono kicker + masked serif display type.
 */
export function SectionHeading({ index, label, title }: SectionHeadingProps) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal
        className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted"
        delay={0}
      >
        <span className="text-ice">{index}</span>
        <span
          aria-hidden="true"
          className="kicker-line hidden h-px w-8 origin-left bg-ice/40 sm:block"
        />
        <span>{label}</span>
      </Reveal>
      <h2 className="font-display text-[clamp(2.4rem,7vw,5rem)] font-normal leading-[0.95] tracking-tight text-ghost">
        <MaskLines
          lines={title.split("\n")}
          ariaLabel={title.replace(/\n/g, " ")}
          delay={100}
          stagger={120}
        />
      </h2>
    </div>
  );
}