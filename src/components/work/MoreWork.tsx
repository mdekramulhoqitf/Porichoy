"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { moreProjects } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

/** Index of secondary work. On desktop a preview follows the pointer. */
export function MoreWork() {
  const [active, setActive] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });
  const current = moreProjects.find((p) => p.slug === active);

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-t hairline">
        {moreProjects.map((p) => (
          <li key={p.slug} className="border-b hairline">
            <Link
              href={`/work/${p.slug}`}
              data-cursor="view"
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(p.slug)}
              onFocus={() => setActive(null)}
              className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 py-5 sm:grid-cols-12 sm:gap-6 sm:py-7"
            >
              <span className="relative aspect-square overflow-hidden rounded-xl bg-paper sm:hidden" aria-hidden>
                <span className="absolute inset-[-40%] origin-center scale-[0.5]">
                  <ProjectVisual project={p} />
                </span>
              </span>
              <span className="min-w-0 sm:col-span-5">
                <span className="display block text-[1.5rem] leading-[1.02] transition-transform duration-700 ease-out-expo group-hover:translate-x-2 sm:text-[clamp(1.6rem,2.6vw,2.5rem)]">
                  {p.title}
                </span>
                <span className="mt-1 block text-[0.8125rem] text-steel sm:hidden">{p.category}</span>
              </span>
              <span className="hidden text-[0.9375rem] leading-snug text-steel sm:col-span-4 sm:block">{p.summary}</span>
              <span className="eyebrow hidden text-steel sm:col-span-2 sm:block">{p.category}</span>
              <span
                aria-hidden
                className="grid size-10 place-items-center justify-self-end rounded-full border hairline transition-all duration-500 ease-out-expo group-hover:border-ink group-hover:bg-ink group-hover:text-white sm:col-span-1"
              >
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
      >
        <AnimatePresence>
          {current && (
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute -translate-y-1/2 translate-x-8 overflow-hidden rounded-2xl p-3 shadow-[0_40px_80px_-30px_rgb(12_13_16/0.5)] ${
                current.tone === "dark" ? "bg-graphite" : "bg-paper"
              }`}
              style={{ width: 380, height: 260 }}
            >
              <ProjectVisual project={current} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
