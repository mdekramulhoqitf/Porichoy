"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { navLinks, profile } from "@/data/profile";
import { projects } from "@/data/projects";

type Item = { group: string; label: string; hint?: string; run: () => void };

/** Ctrl/⌘+K palette: jump to any section or project, copy the email, open links. */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href);
    return [
      { group: "Actions", label: "Ask AI about my work", run: () => window.dispatchEvent(new Event("open-chat")) },
      ...(profile.email
        ? [
            {
              group: "Actions",
              label: "Copy email",
              hint: profile.email,
              run: () =>
                navigator.clipboard.writeText(profile.email!).then(
                  () => setToast("Email copied"),
                  () => setToast(profile.email!),
                ),
            },
          ]
        : []),
      ...navLinks.map((l) => ({ group: "Sections", label: l.label, run: go(l.href) })),
      ...projects.map((p) => ({ group: "Projects", label: p.title, hint: p.category, run: go(`/work/${p.slug}`) })),
      ...profile.socials
        .filter((s) => s.href)
        .map((s) => ({
          group: "Links",
          label: s.label,
          run: () => (s.href!.startsWith("http") ? window.open(s.href!, "_blank", "noreferrer") : (window.location.href = s.href!)),
        })),
    ];
  }, [router]);

  const q = query.trim().toLowerCase();
  const results = q ? items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q)) : items;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setActive(0);
      }
    };
    const show = () => {
      setOpen(true);
      setQuery("");
      setActive(0);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", show);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", show);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const pick = (item?: Item) => {
    if (!item) return;
    setOpen(false);
    item.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") pick(results[active]);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/30 px-4 pt-[14vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ y: -12, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl overflow-hidden rounded-[22px] border border-white/70 bg-white/95 text-ink shadow-[0_40px_80px_-30px_rgb(12_13_16/0.55)]"
              onKeyDown={onKeyDown}
            >
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Search sections, projects, links…"
                aria-label="Search"
                aria-controls="palette-results"
                aria-activedescendant={results[active] ? `palette-${active}` : undefined}
                className="h-14 w-full border-b hairline bg-transparent px-5 text-[1rem] placeholder:text-steel focus:outline-none"
              />
              <ul id="palette-results" role="listbox" data-lenis-prevent className="max-h-[50vh] overflow-y-auto p-2">
                {results.length === 0 && <li className="px-3 py-6 text-center text-[0.9375rem] text-steel">No results</li>}
                {results.map((item, i) => (
                  <li
                    key={`${item.group}-${item.label}`}
                    id={`palette-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseMove={() => setActive(i)}
                    onClick={() => pick(item)}
                    className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-[0.9375rem] ${
                      i === active ? "bg-ink text-white" : ""
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={`truncate text-[0.8125rem] ${i === active ? "text-white/60" : "text-steel"}`}>
                      {item.hint ?? item.group}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-20 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-[0.875rem] text-white"
          >
            {toast}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}
