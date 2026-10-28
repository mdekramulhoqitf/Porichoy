"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { chapters, thirtyThirty } from "@/data/journey";
import { profile } from "@/data/profile";

const work = chapters.filter((c) => c.lane === "work");
const study = chapters.find((c) => c.lane === "study");

/**
 * Career line. Desktop: the section pins and the track moves sideways while a
 * rule draws through each chapter. Mobile and reduced motion: a vertical list.
 */
export function Experience() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [horizontal, setHorizontal] = useState(false);
  const [reached, setReached] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      const on = mq.matches && !reduce;
      setHorizontal(on);
      if (on && track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const line = useTransform(scrollYProgress, [0.02, 0.95], [0, 1]);
  useMotionValueEvent(line, "change", (v) => setReached(Math.floor(v * (work.length + 0.6)) + 1));

  return (
    <section
      id="experience"
      ref={section}
      aria-labelledby="exp-title"
      className="relative bg-paper"
      style={horizontal ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={horizontal ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-28"}>
        <motion.div
          ref={track}
          style={horizontal ? { x } : undefined}
          className={horizontal ? "flex w-max items-stretch gap-6 pl-[var(--gutter)] pr-[12vw]" : "shell flex flex-col gap-5"}
        >
          {/* Intro panel */}
          <div className={horizontal ? "flex w-[34vw] shrink-0 flex-col justify-center pr-10" : "mb-8"}>
            <p className="eyebrow mb-6 flex items-center gap-3 text-steel">
              <span className="h-px w-8 bg-ink/25" aria-hidden />
              Experience
            </p>
            <h2 id="exp-title" className="display text-[clamp(2.5rem,5vw,4.75rem)]">
              From first client
              <br />
              <span className="text-steel">to product team.</span>
            </h2>
            <p className="mt-6 max-w-sm text-[1.0625rem] leading-relaxed text-steel">
              Freelancing since {profile.freelancingSince}, a team at Creative IT Institute, and now {profile.currentCompany}.
            </p>
            {horizontal && (
              <p className="eyebrow mt-10 flex items-center gap-3 text-steel" aria-hidden>
                Keep scrolling <span className="inline-block animate-[float_2.4s_ease-in-out_infinite]">→</span>
              </p>
            )}
          </div>

          {/* Chapters */}
          {work.map((c, i) => {
            const lit = !horizontal || reached > i;
            return (
              <article
                key={c.id}
                className={`relative flex shrink-0 flex-col rounded-[28px] border p-7 transition-colors duration-700 md:p-9 ${
                  horizontal ? "w-[36vw] max-w-[560px]" : ""
                } ${c.current ? "border-ink bg-ink text-white" : "hairline bg-white"}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`relative grid size-4 place-items-center rounded-full border transition-colors duration-500 ${
                      lit ? (c.current ? "border-signal" : "border-ink") : "border-ink/20"
                    }`}
                    aria-hidden
                  >
                    <span
                      className={`size-1.5 rounded-full transition-all duration-500 ${
                        lit ? (c.current ? "bg-signal animate-pulse-dot" : "bg-ink") : "scale-0 bg-ink"
                      }`}
                    />
                  </span>
                  <span className={`eyebrow ${c.current ? "text-fog" : "text-steel"}`}>{c.when ?? c.org}</span>
                </div>

                <h3 className="display mt-auto pt-16 text-[clamp(2rem,3vw,2.9rem)] leading-[0.98]">{c.title}</h3>
                {c.when && <p className={`mt-2 text-[0.9375rem] ${c.current ? "text-fog" : "text-steel"}`}>{c.org}</p>}
                <p className={`mt-5 max-w-md text-[1rem] leading-relaxed ${c.current ? "text-white/80" : "text-ink/75"}`}>
                  {c.body}
                </p>

                {c.id === "digital-hub" && (
                  <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
                    <Link
                      href="/work/wishhub"
                      className="group flex items-center justify-between rounded-2xl bg-white/6 px-4 py-3 transition-colors hover:bg-white/10"
                    >
                      <span>
                        <span className="block text-[0.9375rem] font-medium">WishHub</span>
                        <span className="text-[0.8125rem] text-fog">Scheduled digital wish cards</span>
                      </span>
                      <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                    <div>
                      <p className="text-[0.9375rem] font-medium">{thirtyThirty.name}</p>
                      <p className="mb-3 text-[0.8125rem] text-fog">{thirtyThirty.line}</p>
                      <ul className="flex flex-wrap gap-1.5">
                        {thirtyThirty.services.map((s) => (
                          <li key={s} className="rounded-full border border-white/12 px-2.5 py-1 text-[0.75rem] text-white/70">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {c.tags && c.id !== "digital-hub" && (
                  <ul className="mt-7 flex flex-wrap gap-1.5">
                    {c.tags.map((t) => (
                      <li key={t} className="rounded-full bg-ink/5 px-2.5 py-1 text-[0.75rem] text-ink/60">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}

          {/* In parallel: study */}
          {study && (
            <aside
              className={`flex shrink-0 flex-col justify-between rounded-[28px] border border-dashed border-ink/20 p-7 md:p-9 ${
                horizontal ? "w-[26vw] max-w-[400px]" : ""
              }`}
            >
              <p className="eyebrow text-steel">Alongside all of it</p>
              <div className="pt-16">
                <h3 className="display text-[clamp(1.6rem,2.2vw,2.2rem)] leading-[1.02]">{study.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-steel">{study.org}</p>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink/70">{study.body}</p>
              </div>
            </aside>
          )}
        </motion.div>

        {horizontal && (
          <div className="shell mt-10" aria-hidden>
            <div className="relative h-px bg-ink/10">
              <motion.div style={{ scaleX: line }} className="absolute inset-0 origin-left bg-ink" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
