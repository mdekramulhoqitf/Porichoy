"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { featuredProjects, type Project } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { ProjectVisual } from "./ProjectVisual";

export function FeaturedWork() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  const total = featuredProjects.length;

  return (
    <div ref={container} className="relative">
      {featuredProjects.map((p, i) => (
        <Slide key={p.slug} project={p} index={i} total={total} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function Slide({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const dark = project.tone === "dark";
  const start = index / total;
  // Cap the depth so early cards in a long stack do not shrink to nothing.
  const scale = useTransform(progress, [start, 1], [1, 1 - Math.min(total - 1 - index, 3) * 0.045]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, index === total - 1 ? 0 : 0.35]);

  return (
    <div className="sticky top-0 flex h-[100svh] items-end pb-3 md:pb-5">
      <div className="shell">
        <motion.article
          style={reduce ? undefined : { scale, top: Math.min(index, 3) * 10 }}
          className={`relative grid h-[calc(100svh-5.75rem)] min-h-[540px] md:h-[calc(100svh-6.5rem)] origin-top overflow-hidden grid-rows-[minmax(0,1fr)_auto] rounded-[28px] md:rounded-[36px] lg:grid-cols-12 lg:grid-rows-1 ${
            dark ? "bg-graphite text-white" : "bg-white text-ink"
          } shadow-[0_1px_0_rgb(255_255_255/0.6)_inset,0_50px_100px_-50px_rgb(12_13_16/0.45)]`}
          aria-labelledby={`p-${project.slug}`}
          data-nav={dark ? "dark" : undefined}
        >
          {/* Copy */}
          <div className="order-2 flex min-h-0 flex-col p-6 sm:p-8 lg:order-1 lg:col-span-5 lg:p-12 xl:p-14">
            <div className={`eyebrow flex flex-wrap items-center gap-x-4 gap-y-2 ${dark ? "text-fog" : "text-steel"}`}>
              <span className={dark ? "text-white" : "text-ink"}>
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span>{project.category}</span>
              {project.status && (
                <span className="flex items-center gap-1.5">
                  <span className={`size-1.5 rounded-full ${project.status === "Live" ? "bg-signal" : dark ? "bg-white/30" : "bg-ink/25"}`} />
                  {project.status}
                </span>
              )}
            </div>

            <h3
              id={`p-${project.slug}`}
              className="display mt-5 text-[clamp(2.5rem,5.4vw,5.25rem)] lg:mt-auto"
            >
              {project.title}
            </h3>
            <p className={`mt-4 max-w-md text-[0.9875rem] leading-relaxed sm:text-[1.0625rem] ${dark ? "text-fog" : "text-steel"}`}>
              <span className="lg:hidden">{project.summary}</span>
              <span className="hidden lg:inline">{project.description}</span>
            </p>

            <ul className={`mt-7 hidden grid-cols-2 gap-x-6 gap-y-2.5 border-t pt-6 text-[0.875rem] lg:grid ${dark ? "hairline-dark" : "hairline"}`}>
              {project.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span className={`mt-[0.55em] size-1 shrink-0 rounded-full ${dark ? "bg-white/50" : "bg-ink/40"}`} aria-hidden />
                  {f}
                </li>
              ))}
            </ul>

            {(project.role || project.stack.length > 0) && (
              <dl className={`mt-6 hidden gap-8 text-[0.8125rem] lg:flex ${dark ? "text-fog" : "text-steel"}`}>
                {project.role && (
                  <div>
                    <dt className="eyebrow mb-1.5 text-[10px]">Role</dt>
                    <dd className={dark ? "text-white" : "text-ink"}>{project.role}</dd>
                  </div>
                )}
                {project.stack.length > 0 && (
                  <div>
                    <dt className="eyebrow mb-1.5 text-[10px]">Stack</dt>
                    <dd className={dark ? "text-white" : "text-ink"}>{project.stack.join(" · ")}</dd>
                  </div>
                )}
              </dl>
            )}

            <div className="mt-6 flex flex-wrap gap-3 lg:mt-9">
              <Button href={`/work/${project.slug}`} variant={dark ? "light" : "primary"}>
                {project.caseStudy ? "Read case study" : "View project"}
              </Button>
              {project.liveUrl && (
                <Button href={project.liveUrl} external variant={dark ? "ghost-dark" : "ghost"} arrow={false}>
                  Visit site
                </Button>
              )}
            </div>
          </div>

          {/* Visual */}
          <Link
            href={`/work/${project.slug}`}
            data-cursor={project.caseStudy ? "view:Case study" : "view:Project"}
            aria-label={`${project.title} ${project.caseStudy ? "case study" : "project"}`}
            className={`group relative order-1 m-3 block min-h-0 overflow-hidden rounded-[20px] sm:m-4 md:rounded-[26px] lg:order-2 lg:col-span-7 lg:m-5 ${
              dark ? "bg-[#101216]" : "bg-paper"
            }`}
          >
            {!project.image && (
              <div className={`absolute inset-0 ${dark ? "grid-field-dark" : "grid-field"} opacity-70`} aria-hidden />
            )}
            <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
              <div
                className={`absolute transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.025] ${
                  project.image ? "inset-0" : "inset-[6%] lg:inset-[8%]"
                }`}
              >
                <ProjectVisual project={project} priority={index === 0} />
              </div>
            </ViewTransition>
          </Link>

          <motion.div
            aria-hidden
            style={reduce ? undefined : { opacity: dim }}
            className="pointer-events-none absolute inset-0 bg-ink opacity-0"
          />
        </motion.article>
      </div>
    </div>
  );
}
