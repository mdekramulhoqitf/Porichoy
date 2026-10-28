"use client";

import { useEffect, useState } from "react";
import { scrollToTarget } from "@/components/providers/SmoothScroll";

/** Sticky chapter index that tracks the chapter in view. */
export function CaseNav({ chapters }: { chapters: { key: string; label: string }[] }) {
  const [active, setActive] = useState(chapters[0]?.key);

  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(`ch-${c.key}`))
      .filter((el): el is HTMLElement => !!el);
    // Active = the last chapter whose top has passed 40% of the viewport.
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let current = els[0];
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el;
      if (current) setActive(current.id.replace("ch-", ""));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [chapters]);

  return (
    <nav aria-label="Case study chapters" className="hidden lg:col-span-3 lg:block">
      <ol className="sticky top-32 space-y-1">
        {chapters.map((c, i) => {
          const on = c.key === active;
          return (
            <li key={c.key}>
              <a
                href={`#ch-${c.key}`}
                aria-current={on ? "step" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(`ch-${c.key}`);
                  if (el) scrollToTarget(el);
                }}
                className={`group flex items-center gap-4 rounded-full py-1.5 text-[0.9375rem] transition-colors ${
                  on ? "text-ink" : "text-steel hover:text-ink"
                }`}
              >
                <span className="eyebrow w-6 text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={`h-px transition-all duration-500 ease-out-expo ${on ? "w-10 bg-signal" : "w-4 bg-ink/20 group-hover:w-6"}`}
                  aria-hidden
                />
                {c.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
