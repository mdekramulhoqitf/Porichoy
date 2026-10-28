"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { skillCategories, skills, type Skill } from "@/data/skills";
import { getProject } from "@/data/projects";
import { profile } from "@/data/profile";
import { SectionHead } from "@/components/ui/SectionHead";

/* ---------- layout maths (percent of a 16:10 stage) ---------- */

type Placed = Skill & { x: number; y: number };
type Hub = { id: string; label: string; x: number; y: number };

const STAGE_RATIO = 11 / 16;

function layout() {
  const hubs: Hub[] = [];
  const placed: Placed[] = [];
  const n = skillCategories.length;
  skillCategories.forEach((c, i) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const hx = 50 + Math.cos(a) * 25;
    const hy = 50 + ((Math.sin(a) * 25) / STAGE_RATIO) * 0.66;
    hubs.push({ id: c.id, label: c.label, x: hx, y: hy });

    const members = skills.filter((s) => s.category === c.id);
    const spread = Math.min(Math.PI * 0.95, 0.42 * Math.max(1, members.length - 1) + 0.001);
    members.forEach((s, j) => {
      const t = members.length === 1 ? 0 : j / (members.length - 1) - 0.5;
      const sa = a + t * spread;
      const r = 12.5;
      placed.push({
        ...s,
        x: hx + Math.cos(sa) * r,
        y: hy + ((Math.sin(sa) * r) / STAGE_RATIO) * 0.6,
      });
    });
  });
  return { hubs, placed };
}

const { hubs, placed } = layout();

function Glyph({ skill, className = "size-[18px]" }: { skill: Skill; className?: string }) {
  if (skill.icon) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
        <path d={skill.icon.path} />
      </svg>
    );
  }
  return (
    <span aria-hidden className="font-mono text-[13px] leading-none">
      {skill.glyph}
    </span>
  );
}

export function Ecosystem() {
  const [activeId, setActiveId] = useState<string>("next");
  const [focusCat, setFocusCat] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const active = skills.find((s) => s.id === activeId)!;
  const activeCat = skillCategories.find((c) => c.id === active.category)!;
  const litCat = focusCat ?? active.category;

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative overflow-hidden bg-white py-28 md:py-40">
      <div className="shell">
        <SectionHead
          id="skills-title"
          eyebrow="Skills"
          title="One stack, end to end."
          aside="Everything I use to take an idea from interface to production. Hover or tab through a tool to see where it fits."
        />

        {/* Desktop: node graph */}
        <div className="mt-16 hidden gap-8 lg:grid lg:grid-cols-12">
          <div
            className="relative col-span-9 aspect-[16/11] rounded-[32px] bg-paper"
            onPointerLeave={() => setFocusCat(null)}
          >
            <div className="grid-field absolute inset-0 rounded-[32px] [mask-image:radial-gradient(closest-side,black,transparent)]" aria-hidden />

            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              {hubs.map((h) => (
                <line
                  key={h.id}
                  x1={50}
                  y1={50}
                  x2={h.x}
                  y2={h.y}
                  vectorEffect="non-scaling-stroke"
                  className={`transition-[stroke,stroke-width] duration-500 ${h.id === litCat ? "stroke-ink" : "stroke-ink/10"}`}
                  strokeWidth={h.id === litCat ? 1.4 : 1}
                />
              ))}
              {placed.map((s) => {
                const h = hubs.find((x) => x.id === s.category)!;
                const on = s.id === activeId;
                return (
                  <line
                    key={s.id}
                    x1={h.x}
                    y1={h.y}
                    x2={s.x}
                    y2={s.y}
                    vectorEffect="non-scaling-stroke"
                    strokeDasharray={on ? undefined : "2 3"}
                    className={`transition-[stroke] duration-500 ${on ? "stroke-signal" : s.category === litCat ? "stroke-ink/35" : "stroke-ink/10"}`}
                    strokeWidth={on ? 1.5 : 1}
                  />
                );
              })}
            </svg>

            {/* Core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative grid size-28 place-items-center rounded-full bg-ink text-white shadow-[0_30px_60px_-20px_rgb(12_13_16/0.6)]">
                <span className="absolute inset-[-10px] rounded-full border border-ink/10" aria-hidden />
                <span className="absolute inset-[-22px] animate-spin-slow rounded-full border border-dashed border-ink/10" aria-hidden />
                <span className="px-3 text-center font-display text-[0.8rem] font-semibold leading-tight tracking-[0.14em]">{profile.name.toUpperCase()}</span>
              </div>
            </div>

            {/* Hubs */}
            {hubs.map((h) => (
              <button
                key={h.id}
                type="button"
                onPointerEnter={() => setFocusCat(h.id)}
                onFocus={() => setFocusCat(h.id)}
                onBlur={() => setFocusCat(null)}
                onClick={() => {
                  const first = skills.find((s) => s.category === h.id);
                  if (first) setActiveId(first.id);
                }}
                className={`eyebrow absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-2 transition-all duration-500 ${
                  h.id === litCat ? "bg-ink text-white" : "bg-white text-steel shadow-[var(--shadow-object)]"
                }`}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
              >
                {h.label}
              </button>
            ))}

            {/* Tools */}
            {placed.map((s, i) => {
              const on = s.id === activeId;
              const dim = litCat && s.category !== litCat;
              return (
                <button
                  key={s.id}
                  type="button"
                  data-cursor-label={s.name}
                  aria-pressed={on}
                  aria-label={s.name}
                  onPointerEnter={() => setActiveId(s.id)}
                  onFocus={() => setActiveId(s.id)}
                  onClick={() => setActiveId(s.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                >
                  <span
                    className={`grid size-11 place-items-center rounded-2xl border transition-all duration-500 ease-out-expo ${
                      on
                        ? "scale-[1.18] border-ink bg-ink text-white shadow-[0_16px_30px_-12px_rgb(12_13_16/0.6)]"
                        : "border-white bg-white text-ink shadow-[var(--shadow-object)] hover:scale-110"
                    } ${dim && !on ? "opacity-45" : "opacity-100"} ${reduce ? "" : "animate-float-slow"}`}
                    style={reduce ? undefined : { animationDelay: `${(i % 7) * -1.1}s` }}
                  >
                    <Glyph skill={s} />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <div className="col-span-3 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="sticky top-32 rounded-[28px] bg-ink p-7 text-white"
                aria-live="polite"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl bg-white/8">
                    <Glyph skill={active} className="size-7" />
                  </span>
                  <span className="eyebrow text-fog">{activeCat.label}</span>
                </div>
                <h3 className="display mt-10 text-[2.25rem] leading-none">{active.name}</h3>
                <p className="mt-4 text-[0.9875rem] leading-relaxed text-white/75">{active.context}</p>
                <p className="mt-6 border-t border-white/10 pt-5 text-[0.8125rem] text-fog">{activeCat.blurb}</p>
                {active.projects && (
                  <div className="mt-5">
                    <p className="eyebrow mb-3 text-[10px] text-fog">Used in</p>
                    <ul className="space-y-1.5">
                      {active.projects.map((slug) => {
                        const p = getProject(slug);
                        return p ? (
                          <li key={slug}>
                            <Link href={`/work/${slug}`} className="flex items-center justify-between text-[0.9375rem] hover:text-filament">
                              {p.title} <span aria-hidden>↗</span>
                            </Link>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile / tablet: grouped, tap to reveal */}
        <div className="mt-14 space-y-3 lg:hidden">
          {skillCategories.map((c) => {
            const items = skills.filter((s) => s.category === c.id);
            return (
              <div key={c.id} className="rounded-3xl bg-paper p-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-[1.25rem] font-semibold tracking-tight">{c.label}</h3>
                  <span className="eyebrow text-steel">{items.length}</span>
                </div>
                <p className="mt-1 text-[0.875rem] text-steel">{c.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {items.map((s) => {
                    const on = s.id === activeId;
                    return (
                      <li key={s.id}>
                        <button
                          type="button"
                          aria-expanded={on}
                          onClick={() => setActiveId(s.id)}
                          className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.875rem] transition-colors ${
                            on ? "bg-ink text-white" : "bg-white text-ink shadow-[var(--shadow-object)]"
                          }`}
                        >
                          <Glyph skill={s} className="size-4" />
                          {s.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {active.category === c.id && (
                  <p className="mt-4 border-t hairline pt-4 text-[0.9375rem] leading-relaxed text-ink/80" aria-live="polite">
                    <span className="font-medium text-ink">{active.name}.</span> {active.context}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
