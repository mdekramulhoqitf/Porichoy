import { siClaude, siGooglegemini } from "simple-icons";
import { Reveal, SplitReveal } from "@/components/ui/Reveal";

type Tool = { name: string; path?: string; glyph?: string };

const stations: { id: string; label: string; line: string; tools: Tool[]; angle: number; human?: boolean }[] = [
  {
    id: "explore",
    label: "Explore",
    line: "Research, options, first drafts.",
    tools: [
      { name: "Claude", path: siClaude.path },
      { name: "Gemini", path: siGooglegemini.path },
    ],
    angle: -90,
  },
  {
    id: "prototype",
    label: "Prototype",
    line: "Test the idea before building it.",
    tools: [{ name: "Lovable", glyph: "♥" }],
    angle: 0,
  },
  {
    id: "build",
    label: "Build",
    line: "AI-assisted code, reviewed line by line.",
    tools: [
      { name: "Cursor", glyph: "▲" },
      { name: "Claude", path: siClaude.path },
    ],
    angle: 90,
  },
  {
    id: "decide",
    label: "Decide",
    line: "Taste, trade-offs, what ships.",
    tools: [],
    angle: 180,
    human: true,
  },
];

const principles = [
  { k: "AI drafts. I decide.", v: "Every suggestion is reviewed, tested and owned by me before it ships." },
  { k: "Faster, not looser.", v: "Prototypes come together in hours; the engineering bar stays where it was." },
  { k: "Visuals, art-directed.", v: "Image models for exploration — final visuals are chosen and refined by hand." },
];

export function AIWorkflow() {
  return (
    <section data-nav="dark" aria-labelledby="ai-title" className="noise relative overflow-hidden bg-graphite py-28 text-white md:py-40">
      <div className="grid-field-dark absolute inset-0 [mask-image:radial-gradient(60%_60%_at_70%_50%,black,transparent)]" aria-hidden />
      <div className="shell relative grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3 text-fog">
              <span className="h-px w-8 bg-white/25" aria-hidden />
              AI in the workflow
            </p>
          </Reveal>
          <h2 id="ai-title" className="display text-[clamp(2.3rem,4.6vw,4.4rem)] leading-[0.98]">
            <SplitReveal text="Not a replacement for engineering." />
            <br />
            <span className="text-fog">
              <SplitReveal text="A force multiplier." delay={0.12} />
            </span>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-lg text-[1.0625rem] leading-relaxed text-fog">
              I use AI across design, development and experimentation — to explore more options, prototype faster
              and spend my own time on the decisions that matter. Human creativity, engineering and AI, in that order.
            </p>
          </Reveal>

          <dl className="mt-14 space-y-0">
            {principles.map((p, i) => (
              <Reveal key={p.k} delay={0.1 + i * 0.06}>
                <div className="grid gap-2 border-t border-white/10 py-6 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <dt className="font-display text-[1.2rem] font-medium tracking-[-0.02em]">{p.k}</dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-fog">{p.v}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* The loop */}
        <div className="lg:col-span-6 lg:pl-6">
          <Reveal delay={0.1}>
            <figure className="relative mx-auto aspect-square w-full max-w-[560px]">
              <figcaption className="sr-only">
                My AI-assisted loop: explore with Claude and Gemini, prototype with Lovable, build with Cursor and
                Claude, and decide myself — then repeat.
              </figcaption>
              <div className="absolute inset-[12%] rounded-full border border-white/10" aria-hidden />
              <div className="absolute inset-[12%] rounded-full border border-dashed border-white/10 [transform:scale(1.18)]" aria-hidden />
              {/* travelling signal */}
              <div className="absolute inset-[12%] animate-spin-slow" aria-hidden>
                <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-filament shadow-[0_0_24px_6px_rgb(255_201_12/0.45)]" />
              </div>

              <div className="absolute left-1/2 top-1/2 grid size-[34%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/[0.04] text-center ring-1 ring-white/10 backdrop-blur-sm">
                <div>
                  <p className="eyebrow text-[10px] text-fog">The loop</p>
                  <p className="mt-2 font-display text-[clamp(1rem,2vw,1.35rem)] font-medium leading-tight tracking-tight">
                    Human
                    <br />
                    in the loop
                  </p>
                </div>
              </div>

              {stations.map((s) => {
                const rad = (s.angle * Math.PI) / 180;
                const x = 50 + Math.cos(rad) * 38;
                const y = 50 + Math.sin(rad) * 38;
                return (
                  <div
                    key={s.id}
                    className="absolute w-[40%] max-w-[190px] -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div
                      className={`rounded-2xl p-3.5 backdrop-blur-md sm:p-4 ${
                        s.human ? "bg-white text-ink" : "border border-white/10 bg-carbon/85"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-display text-[0.95rem] font-semibold tracking-tight sm:text-[1.05rem]">{s.label}</p>
                        <div className="flex gap-1">
                          {s.human ? (
                            <span className="size-2 rounded-full bg-signal" aria-hidden />
                          ) : (
                            s.tools.map((t) => (
                              <span
                                key={t.name}
                                title={t.name}
                                className="grid size-6 place-items-center rounded-md bg-white/8 text-[10px]"
                              >
                                {t.path ? (
                                  <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
                                    <path d={t.path} />
                                  </svg>
                                ) : (
                                  <span aria-hidden>{t.glyph}</span>
                                )}
                                <span className="sr-only">{t.name}</span>
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                      <p className={`mt-1.5 hidden text-[0.75rem] leading-snug sm:block ${s.human ? "text-steel" : "text-fog"}`}>
                        {s.line}
                      </p>
                    </div>
                  </div>
                );
              })}
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
