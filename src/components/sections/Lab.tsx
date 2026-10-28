import Image from "next/image";
import { labEntries } from "@/data/lab";
import { LabVisual } from "@/components/lab/LabVisual";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";

const span: Record<string, string> = {
  wide: "md:col-span-8",
  tall: "md:col-span-4 md:row-span-2",
  square: "md:col-span-4",
};

const darkVisuals = new Set(["prompt", "type"]);

export function Lab() {
  return (
    <section id="lab" aria-labelledby="lab-title" className="relative bg-paper py-28 md:py-40">
      <div className="shell">
        <SectionHead
          id="lab-title"
          eyebrow="Lab"
          title="Things I'm trying."
          aside="Not everything is a client project. Experiments, creative work and prototypes — where most new ideas start."
        />

        <ul className="mt-16 grid auto-rows-[minmax(300px,auto)] gap-4 md:grid-cols-12 md:auto-rows-[320px]">
          {labEntries.map((e, i) => {
            const dark = darkVisuals.has(e.visual);
            return (
              <Reveal as="li" key={e.id} delay={(i % 3) * 0.06} className={`${span[e.size]} min-h-[300px]`}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] ${
                    dark ? "bg-graphite text-white" : "bg-white text-ink"
                  } shadow-[0_1px_0_rgb(255_255_255/0.7)_inset,0_30px_60px_-40px_rgb(12_13_16/0.35)]`}
                >
                  <div className="relative min-h-0 flex-1">
                    {e.image ? (
                      <Image src={e.image} alt={e.title} fill className="object-cover" sizes="(min-width: 768px) 60vw, 100vw" />
                    ) : (
                      <LabVisual kind={e.visual} />
                    )}
                  </div>
                  <div className={`flex items-end justify-between gap-4 border-t px-6 py-5 ${dark ? "hairline-dark" : "hairline"}`}>
                    <div>
                      <h3 className="font-display text-[1.15rem] font-semibold tracking-[-0.02em]">{e.title}</h3>
                      <p className={`mt-1 max-w-md text-[0.875rem] leading-snug ${dark ? "text-fog" : "text-steel"}`}>{e.line}</p>
                    </div>
                    <span className={`eyebrow shrink-0 rounded-full px-2.5 py-1.5 text-[10px] ${dark ? "bg-white/8 text-fog" : "bg-ink/5 text-steel"}`}>
                      {e.kind}
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
