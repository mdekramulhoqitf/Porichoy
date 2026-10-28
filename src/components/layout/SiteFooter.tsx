"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { profile } from "@/data/profile";
import { Magnetic } from "@/components/ui/Magnetic";
import { SplitReveal } from "@/components/ui/Reveal";
import { scrollToTarget } from "@/components/providers/SmoothScroll";
import { LocalTime } from "./LocalTime";

const kinds = ["Website", "Web app", "SaaS", "E-commerce", "Dashboard", "Mobile app", "Something else"];

/**
 * Contact as a workspace: the brief you type on the left is typeset live as a
 * project document on the right, then handed to your mail app.
 */
export function SiteFooter() {
  const id = useId();
  const [kind, setKind] = useState<string[]>(["Web app"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const toggle = (k: string) => setKind((cur) => (cur.includes(k) ? cur.filter((c) => c !== k) : [...cur, k]));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.email) return;
    const subject = `Project brief — ${kind.join(", ") || "New project"}`;
    const body = `Hi ${profile.name},\n\n${message}\n\nType: ${kind.join(", ")}\nFrom: ${name}${email ? ` <${email}>` : ""}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[0.9375rem] text-white placeholder:text-white/35 transition-colors focus:border-white/40 focus:bg-white/[0.06] focus:outline-none";

  return (
    <footer data-nav="dark" id="contact" aria-labelledby="contact-title" className="noise relative overflow-hidden bg-ink text-white">
      <div className="grid-field-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden />
      <div className="shell relative pt-28 md:pt-40">
        <p className="eyebrow mb-8 flex items-center gap-3 text-fog">
          <span className="h-px w-8 bg-white/25" aria-hidden />
          Contact
        </p>
        <h2 id="contact-title" className="display max-w-[14ch] text-[clamp(3rem,9vw,8.75rem)] leading-[0.9]">
          <SplitReveal text="Let's build something" />{" "}
          <span className="text-filament">
            <SplitReveal text="remarkable." delay={0.2} />
          </span>
        </h2>

        {/* Workspace */}
        <div className="mt-20 grid gap-4 lg:grid-cols-12">
          <form
            onSubmit={onSubmit}
            className="rounded-[28px] border border-white/10 bg-carbon/70 p-5 backdrop-blur md:p-8 lg:col-span-7"
            aria-describedby={`${id}-hint`}
          >
            <div className="mb-6 flex items-center gap-1.5" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-2.5 rounded-full bg-white/12" />
              ))}
              <span className="ml-3 font-mono text-[11px] text-white/40">new-project.brief</span>
            </div>

            <fieldset>
              <legend className="eyebrow mb-3 text-fog">What are we building?</legend>
              <div className="flex flex-wrap gap-2">
                {kinds.map((k) => {
                  const on = kind.includes(k);
                  return (
                    <button
                      key={k}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(k)}
                      className={`rounded-full px-4 py-2 text-[0.875rem] transition-all duration-300 ${
                        on ? "bg-white text-ink" : "border border-white/12 text-white/75 hover:border-white/35 hover:text-white"
                      }`}
                    >
                      {k}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">Your name</span>
                <input className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </label>
              <label className="block">
                <span className="sr-only">Your email</span>
                <input
                  className={field}
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="sr-only">About the project</span>
                <textarea
                  className={`${field} min-h-36 resize-y`}
                  placeholder="The idea, who it's for, and where it is today."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  data-lenis-prevent
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p id={`${id}-hint`} className="text-[0.8125rem] text-fog">
                {profile.email ? "Opens your email app with the brief filled in." : "The contact inbox is being set up — please use a link below for now."}
              </p>
              <Magnetic>
                <button
                  type="submit"
                  disabled={!profile.email}
                  className="btn-object inline-flex h-12 items-center gap-3 rounded-full bg-white pl-5 pr-4 text-[0.9375rem] font-medium text-ink hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="size-2 rounded-full bg-signal" aria-hidden />
                  Send brief
                  <span aria-hidden>→</span>
                </button>
              </Magnetic>
            </div>
          </form>

          {/* Live document */}
          <div className="relative hidden rounded-[28px] bg-paper p-8 text-ink lg:col-span-5 lg:block" aria-hidden>
            <div className="flex items-center justify-between border-b hairline pb-5">
              <span className="eyebrow text-steel">Project brief</span>
              <span className="flex items-center gap-2 text-[0.75rem] text-steel">
                <span className="size-1.5 animate-pulse-dot rounded-full bg-signal" />
                {sent ? "Handed to mail" : "Drafting"}
              </span>
            </div>
            <p className="eyebrow mt-7 text-steel">For</p>
            <p className="mt-2 font-display text-[1.4rem] font-semibold tracking-tight">{profile.name}</p>
            <p className="eyebrow mt-7 text-steel">Type</p>
            <div className="mt-3 flex min-h-8 flex-wrap gap-1.5">
              <AnimatePresence>
                {kind.map((k) => (
                  <motion.span
                    key={k}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="rounded-full bg-ink px-3 py-1 text-[0.8125rem] text-white"
                  >
                    {k}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
            <p className="eyebrow mt-7 text-steel">Brief</p>
            <p className="mt-2 min-h-24 whitespace-pre-wrap text-[1rem] leading-relaxed text-ink/80">
              {message || <span className="text-ink/30">Your idea appears here as you type…</span>}
            </p>
            <div className="mt-8 border-t hairline pt-5 text-[0.875rem] text-steel">
              {name || "Your name"} {email && <span>· {email}</span>}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="mt-24 grid gap-10 border-t border-white/10 py-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-[1.25rem] font-semibold tracking-[0.18em]">{profile.name.toUpperCase()}</p>
            <p className="mt-3 max-w-xs text-[0.9375rem] text-fog">{profile.thesis}</p>
          </div>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-[0.9375rem] sm:grid-cols-3 md:col-span-5">
            <li className="col-span-2 sm:col-span-3">
              {profile.email ? (
                <a href={`mailto:${profile.email}`} className="break-all hover:text-filament">
                  {profile.email}
                </a>
              ) : (
                <span className="text-white/35">Email · soon</span>
              )}
            </li>
            {profile.socials.map((s) => (
              <li key={s.label}>
                {s.href ? (
                  s.href.startsWith("http") ? (
                    <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-filament">
                      {s.label} <span aria-hidden>↗</span>
                    </a>
                  ) : (
                    <a href={s.href} className="hover:text-filament">
                      {s.label}
                    </a>
                  )
                ) : (
                  <span className="text-white/35">{s.label} · soon</span>
                )}
              </li>
            ))}
          </ul>
          <div className="md:col-span-2 md:text-right">
            <button type="button" onClick={() => scrollToTarget(document.body)} className="text-[0.9375rem] text-fog hover:text-white">
              Back to top ↑
            </button>
          </div>
        </div>

        <div className="relative flex flex-col justify-between gap-2 pb-10 text-[0.8125rem] text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.name} — Designed &amp; built with curiosity.</p>
          <LocalTime />
        </div>
      </div>
    </footer>
  );
}
