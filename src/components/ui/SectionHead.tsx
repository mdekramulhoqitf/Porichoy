import type { ReactNode } from "react";
import { SplitReveal, Reveal } from "./Reveal";

/** Eyebrow + editorial headline + optional aside, shared by home sections. */
export function SectionHead({
  eyebrow,
  title,
  aside,
  dark = false,
  id,
}: {
  eyebrow: string;
  title: string;
  aside?: ReactNode;
  dark?: boolean;
  id?: string;
}) {
  return (
    <div className="grid gap-8 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <Reveal>
          <p className={`eyebrow mb-6 flex items-center gap-3 ${dark ? "text-fog" : "text-steel"}`}>
            <span className={`h-px w-8 ${dark ? "bg-white/25" : "bg-ink/25"}`} aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
        <h2 id={id} className={`display text-[clamp(2.5rem,6.4vw,5.75rem)] ${dark ? "text-white" : "text-ink"}`}>
          <SplitReveal text={title} />
        </h2>
      </div>
      {aside && (
        <Reveal delay={0.15} className={`md:col-span-4 md:pb-2 text-[1.0625rem] leading-relaxed ${dark ? "text-fog" : "text-steel"}`}>
          {aside}
        </Reveal>
      )}
    </div>
  );
}
