"use client";

import dynamic from "next/dynamic";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SplitReveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

const AssemblyScene = dynamic(() => import("./AssemblyScene"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;
const LAYERS = ["Code", "Design", "AI"] as const;

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(section, { margin: "0px 0px 0px 0px" });
  const [compact, setCompact] = useState(false);
  const [ready, setReady] = useState(false);
  const [assembled, setAssembled] = useState(false);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  // Assembly completes a little before the pin releases, so the finished state can be read.
  const assembly = useTransform(scrollYProgress, [0.04, 0.72], [0, 1], { clamp: true });
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const copyOpacity = useTransform(scrollYProgress, [0.3, 0.62], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0.3, 0.62], [0, -40]);
  const railScale = useTransform(scrollYProgress, [0, 0.72], [0, 1]);

  useMotionValueEvent(assembly, "change", (v) => setAssembled(v > 0.92));

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      ref={section}
      aria-labelledby="hero-title"
      className="relative h-[175svh] lg:h-[210vh]"
    >
      <div className="sticky top-0 h-[100svh] min-h-[640px] overflow-hidden">
        {/* Studio backdrop: a lit sweep, a faint technical grid, no blobs. */}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_35%,#ffffff_0%,#f4f5f7_55%,#eceef1_100%)]" />
        <div
          aria-hidden
          className="grid-field absolute inset-0 [mask-image:radial-gradient(70%_60%_at_65%_40%,black,transparent)]"
        />

        {/* Name wordmark — the 3D layers sit in front of it. */}
        <motion.div
          style={{ y: reduce ? 0 : wordY }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 select-none"
        >
          <div className="shell">
            <motion.h1
              id="hero-title"
              initial={reduce ? false : { y: "30%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1.6, ease, delay: 0.15 }}
              className="display translate-y-[16%] whitespace-nowrap text-[clamp(2.75rem,min(8.6vw,24vh),11rem)] leading-[0.78] tracking-[-0.065em] text-ink"
            >
              <span aria-hidden>{profile.name.toUpperCase()}</span>
              <span className="sr-only">
                {profile.name} — {profile.roles.join(", ")}
              </span>
            </motion.h1>
          </div>
        </motion.div>

        {/* 3D assembly */}
        <div
          className={`absolute z-10 transition-opacity duration-[1400ms] ease-out-expo ${
            ready ? "opacity-100" : "opacity-0"
          } inset-x-0 bottom-[7%] top-[max(58%,31rem)] sm:top-[52%] lg:inset-y-0 lg:left-[38%] lg:right-0 lg:top-0 lg:bottom-0`}
        >
          <AssemblyScene
            progress={assembly}
            reduced={reduce}
            compact={compact}
            active={inView}
            onReady={() => setReady(true)}
          />
        </div>

        {/* Copy */}
        <motion.div
          style={reduce ? undefined : { opacity: copyOpacity, y: copyY }}
          className="relative z-20 h-full"
        >
          <div className="shell flex h-full flex-col pt-24 sm:pt-28 lg:justify-center lg:pb-[21vh] lg:pt-20">
            <div className="max-w-[40rem] lg:max-w-[34rem] xl:max-w-[38rem]">
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease, delay: 0.1 }}
                className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-steel"
              >
                {profile.roles.map((r, i) => (
                  <span key={r} className="flex items-center gap-3">
                    {i > 0 && <span className="size-1 rounded-full bg-ink/25" aria-hidden />}
                    {r}
                  </span>
                ))}
              </motion.p>

              <p className="display text-[clamp(2.15rem,5.2vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.045em] text-ink">
                <SplitReveal text="Code, design and AI —" immediate delay={0.25} />
                <br />
                <SplitReveal text="assembled into" immediate delay={0.45} />{" "}
                <span className="relative inline-block">
                  <SplitReveal text="real products." immediate delay={0.55} />
                  <motion.span
                    aria-hidden
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, ease, delay: 1.2 }}
                    className="absolute -bottom-1 left-0 h-[0.09em] w-full origin-left rounded-full bg-signal"
                  />
                </span>
              </p>

              <motion.p
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.85 }}
                className="mt-6 hidden max-w-[30rem] text-[1.0625rem] leading-relaxed text-steel sm:block lg:mt-7"
              >
                I&apos;m {profile.name} — I design interfaces, write the full stack and ship. Freelancing since{" "}
                {profile.freelancingSince}, now building products at {profile.currentCompany} while studying CSE at{" "}
                {profile.education.short}.
              </motion.p>

              <p className="mt-5 text-[0.9375rem] leading-relaxed text-steel sm:hidden">
                Building products at {profile.currentCompany}. Freelancing since {profile.freelancingSince}.
              </p>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease, delay: 1 }}
                className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3"
              >
                <Button href="/#work" signal>
                  Explore my work
                </Button>
                <Button href="/#contact" variant="ghost" arrow={false}>
                  Let&apos;s build something
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Assembly legend + scroll cue */}
        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-30 hidden lg:block">
          <div className="shell flex items-end justify-between">
            <div className="flex items-center gap-3 rounded-full bg-white/70 py-2 pl-4 pr-4 backdrop-blur">
              <div className="relative h-4 w-px overflow-hidden bg-ink/15" aria-hidden>
                <motion.div style={{ scaleY: railScale }} className="absolute inset-0 origin-top bg-ink" />
              </div>
              <p className="eyebrow text-steel">Scroll to assemble</p>
            </div>
            <p className="eyebrow flex items-center gap-2.5 rounded-full bg-white/70 px-4 py-2.5 text-steel backdrop-blur" aria-live="polite">
              {LAYERS.map((l, i) => (
                <span key={l} className="flex items-center gap-2.5">
                  <span className={assembled ? "text-ink" : ""}>{l}</span>
                  <span aria-hidden>{i < LAYERS.length - 1 ? "×" : "="}</span>
                </span>
              ))}
              <span
                className={`flex items-center gap-1.5 transition-colors duration-500 ${assembled ? "text-ink" : ""}`}
              >
                <span
                  className={`size-1.5 rounded-full transition-colors duration-500 ${assembled ? "bg-signal" : "bg-ink/20"}`}
                  aria-hidden
                />
                Product
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
