"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks, profile } from "@/data/profile";
import { Magnetic } from "@/components/ui/Magnetic";

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
    // Sections marked data-nav="dark" switch the bar to dark glass.
    const hit = document
      .elementsFromPoint(window.innerWidth / 2, 44)
      .some((el) => el.closest("[data-nav=dark]"));
    setOnDark(hit);
  });
  const dark = onDark && !open;

  // Close the menu when the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-4">
      <div className="shell">
        <nav
          aria-label="Primary"
          className={`flex h-14 items-center justify-between rounded-full pl-5 pr-2 transition-all duration-700 ease-out-expo ${
            dark
              ? "border border-white/10 bg-ink/70 text-white backdrop-blur-xl backdrop-saturate-150"
              : scrolled || open
                ? "border border-white/70 bg-white/72 shadow-[0_10px_30px_-18px_rgb(12_13_16/0.35)] backdrop-blur-xl backdrop-saturate-150"
                : "border border-transparent"
          }`}
        >
          <Link href="/" className="group flex items-center gap-2.5" aria-label={`${profile.name} — home`}>
            <span
              className={`relative grid size-6 place-items-center rounded-[7px] transition-colors ${dark ? "bg-white/12" : "bg-ink"}`}
              aria-hidden
            >
              <span className="size-2 rounded-[2px] bg-signal transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
            </span>
            <span className="font-display text-[0.95rem] font-semibold tracking-[0.18em]">
              {profile.name.toUpperCase()}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-full px-3.5 py-2 text-[0.875rem] transition-colors ${
                    dark ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-palette"))}
              aria-label="Open command palette (Ctrl+K)"
              className={`hidden h-10 items-center gap-1.5 rounded-full px-3 font-mono text-[0.75rem] md:inline-flex ${
                dark ? "bg-white/10 text-white/70 hover:text-white" : "bg-ink/5 text-ink/60 hover:text-ink"
              }`}
            >
              <span aria-hidden>⌘K</span>
            </button>
            <Magnetic className="hidden sm:inline-block">
              <Link
                href="/#contact"
                className={`btn-object inline-flex h-10 items-center gap-2 rounded-full px-4 text-[0.875rem] font-medium hover:-translate-y-0.5 ${
                  dark ? "bg-white text-ink" : "bg-ink text-white"
                }`}
              >
                <span className="size-1.5 rounded-full bg-signal" aria-hidden />
                Let&apos;s talk
              </Link>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`grid size-10 place-items-center rounded-full lg:hidden ${dark ? "bg-white/10" : "bg-ink/5"}`}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className="relative block h-3 w-4" aria-hidden>
                <span
                  className={`absolute left-0 h-[1.5px] w-4 transition-transform ${dark ? "bg-white" : "bg-ink"} duration-500 ease-out-expo ${open ? "top-1.5 rotate-45" : "top-0.5"}`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-4 transition-transform ${dark ? "bg-white" : "bg-ink"} duration-500 ease-out-expo ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 -z-10 bg-paper/96 backdrop-blur-xl lg:hidden"
          >
            <div className="shell flex h-full flex-col justify-between pb-10 pt-28">
              <ul className="space-y-1">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="display flex items-baseline justify-between border-b hairline py-3 text-[2.6rem]"
                    >
                      {l.label}
                      <span className="text-xl text-steel" aria-hidden>
                        ↗
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="btn-object flex h-14 items-center justify-center gap-2 rounded-full bg-ink text-white"
              >
                <span className="size-2 rounded-full bg-signal" aria-hidden />
                Let&apos;s talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
