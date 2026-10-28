"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { buildTypes, pipeline } from "@/data/build";
import { getProject } from "@/data/projects";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";

export function WhatIBuild() {
  const rail = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: rail, offset: ["start 80%", "end 55%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section aria-labelledby="build-title" className="relative bg-paper py-28 md:py-40">
      <div className="shell">
        <SectionHead
          id="build-title"
          eyebrow="What I build"
          title="From idea to a live URL."
          aside="I can own the whole path — or join at any step of it. Fewer handoffs, fewer things lost between them."
        />

        {/* Pipeline: a real sequence, so it is numbered. */}
        <div ref={rail} className="relative mt-20">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-ink/10 md:left-0 md:right-0 md:top-[7px] md:bottom-auto md:h-px md:w-auto" aria-hidden>
            <motion.div style={reduce ? undefined : { scaleY: fill }} className="absolute inset-0 origin-top bg-ink md:hidden" />
            <motion.div style={reduce ? undefined : { scaleX: fill }} className="absolute inset-0 hidden origin-left bg-ink md:block" />
          </div>
          <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
          {pipeline.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 0.08} className="relative pl-9 md:pl-0 md:pt-10">
              <span
                className={`absolute left-0 top-0 grid size-[15px] place-items-center rounded-full border-2 bg-paper ${
                  i === pipeline.length - 1 ? "border-signal" : "border-ink"
                }`}
                aria-hidden
              >
                {i === pipeline.length - 1 && <span className="size-1.5 rounded-full bg-signal" />}
              </span>
              <p className="eyebrow text-steel">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="display mt-3 text-[1.75rem] leading-none">{s.label}</h3>
              <p className="mt-3 max-w-[16rem] text-[0.9375rem] leading-relaxed text-steel">{s.line}</p>
            </Reveal>
          ))}
          </ol>
        </div>

        {/* Kinds of builds, linked to evidence where it exists */}
        <div className="mt-24 grid gap-x-10 md:grid-cols-2">
          {buildTypes.map((b, i) => (
            <Reveal key={b.name} delay={(i % 2) * 0.05}>
              <div className="group flex items-baseline justify-between gap-6 border-t hairline py-5">
                <p className="font-display text-[clamp(1.35rem,2.1vw,1.85rem)] font-medium tracking-[-0.03em] transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">
                  {b.name}
                </p>
                {b.examples ? (
                  <p className="flex shrink-0 flex-wrap justify-end gap-x-3 text-right text-[0.8125rem] text-steel">
                    {b.examples.map((slug) => {
                      const p = getProject(slug);
                      return p ? (
                        <Link key={slug} href={`/work/${slug}`} className="underline decoration-ink/20 underline-offset-4 hover:text-ink hover:decoration-signal">
                          {p.title}
                        </Link>
                      ) : null;
                    })}
                  </p>
                ) : (
                  <span className="text-[0.8125rem] text-fog" aria-hidden>
                    —
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
