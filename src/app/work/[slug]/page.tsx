import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { caseChapterOrder, getProject, projects } from "@/data/projects";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { CaseNav } from "@/components/case/CaseNav";
import { TiltStage } from "@/components/case/TiltStage";
import { StackDiagram } from "@/components/case/StackDiagram";
import { Button } from "@/components/ui/Button";
import { Reveal, SplitReveal } from "@/components/ui/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.title} — case study`, description: p.summary };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const dark = project.tone === "dark";
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const cs = project.caseStudy;

  return (
    <article aria-labelledby="case-title">
      {/* Intro */}
      <header className="relative bg-paper pt-32 md:pt-40">
        <div className="shell">
          <Link href="/#work" className="eyebrow inline-flex items-center gap-2 text-steel hover:text-ink">
            <span aria-hidden>←</span> All work
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow flex flex-wrap items-center gap-x-4 gap-y-2 text-steel">
                <span>{project.category}</span>
                {project.status && (
                  <span className="flex items-center gap-1.5">
                    <span className={`size-1.5 rounded-full ${project.status === "Live" ? "bg-signal" : "bg-ink/25"}`} />
                    {project.status}
                  </span>
                )}
                {project.year && <span>{project.year}</span>}
              </p>
              <h1 id="case-title" className="display mt-6 text-[clamp(3.25rem,10vw,9rem)]">
                <SplitReveal text={project.title} immediate />
              </h1>
            </div>
            <Reveal className="lg:col-span-4" delay={0.2}>
              <p className="text-[1.125rem] leading-relaxed text-steel">{project.summary}</p>
            </Reveal>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-6 border-t hairline pt-8 text-[0.9375rem] md:grid-cols-4">
            {project.role && (
              <div>
                <dt className="eyebrow mb-2 text-steel">Role</dt>
                <dd>{project.role}</dd>
              </div>
            )}
            <div>
              <dt className="eyebrow mb-2 text-steel">Type</dt>
              <dd>{project.category}</dd>
            </div>
            {project.stack.length > 0 && (
              <div>
                <dt className="eyebrow mb-2 text-steel">Stack</dt>
                <dd>{project.stack.join(" · ")}</dd>
              </div>
            )}
            {project.liveUrl && (
              <div>
                <dt className="eyebrow mb-2 text-steel">Live</dt>
                <dd>
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="underline decoration-ink/25 underline-offset-4 hover:decoration-signal">
                    {project.liveUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} ↗
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="shell mt-12 pb-10">
          <div
            className={`relative aspect-[4/3] overflow-hidden rounded-[28px] md:aspect-[16/9] md:rounded-[40px] ${
              dark ? "bg-graphite" : project.image ? "bg-paper" : "bg-white"
            }`}
          >
            {!project.image && <div className={`absolute inset-0 ${dark ? "grid-field-dark" : "grid-field"}`} aria-hidden />}
            <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
              <div className={`absolute ${project.image ? "inset-0" : "inset-[6%] md:inset-[8%_12%]"}`}>
                <ProjectVisual project={project} priority />
              </div>
            </ViewTransition>
          </div>
        </div>
      </header>

      {/* Chapters */}
      {cs && (
      <div className="bg-paper pb-28 pt-16 md:pb-40">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <CaseNav chapters={caseChapterOrder} />

          <div className="space-y-28 md:space-y-40 lg:col-span-9">
            {caseChapterOrder.map(({ key, label }, i) => {
              const ch = cs[key];
              return (
                <section key={key} id={`ch-${key}`} aria-labelledby={`h-${key}`} className="scroll-mt-28">
                  <Reveal>
                    <p className="eyebrow mb-5 flex items-center gap-3 text-steel">
                      <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
                      <span className="h-px w-6 bg-ink/25" aria-hidden />
                      {label}
                    </p>
                  </Reveal>
                  <h2 id={`h-${key}`} className="display max-w-[18ch] text-[clamp(2rem,4.4vw,3.75rem)] leading-[1]">
                    <SplitReveal text={ch.heading} />
                  </h2>
                  <Reveal delay={0.1}>
                    <p className="mt-7 max-w-2xl text-[1.1875rem] leading-[1.6] text-ink/75">{ch.body}</p>
                  </Reveal>

                  {ch.points && (
                    <Reveal delay={0.15}>
                      <ol className="mt-10 flex flex-col gap-2 md:flex-row md:items-stretch">
                        {ch.points.map((pt, j) => (
                          <li key={pt} className="flex flex-1 items-center gap-2 md:flex-col md:items-stretch">
                            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white p-4 shadow-[var(--shadow-object)] md:flex-col md:items-start md:gap-6 md:p-5">
                              <span className="eyebrow text-steel">{String(j + 1).padStart(2, "0")}</span>
                              <span className="text-[0.9875rem] font-medium">{pt}</span>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </Reveal>
                  )}

                  {key === "concept" && (
                    <Reveal delay={0.1}>
                      <ul className="mt-10 grid gap-x-8 border-t hairline sm:grid-cols-2">
                        {project.features.map((f) => (
                          <li key={f} className="flex items-center gap-3 border-b hairline py-4 text-[1rem]">
                            <span className="size-1.5 rounded-full bg-ink/40" aria-hidden />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  )}

                  {key === "design" && (
                    <div className="mt-14">
                      <TiltStage dark={dark}>
                        <ProjectVisual project={project} />
                      </TiltStage>
                    </div>
                  )}

                  {key === "development" && (
                    <div className="mt-14">
                      <StackDiagram stack={project.stack} />
                    </div>
                  )}

                  {key === "result" && (
                    <Reveal delay={0.15}>
                      <div className="mt-10 flex flex-wrap gap-3">
                        {project.liveUrl && (
                          <Button href={project.liveUrl} external signal>
                            Visit the live site
                          </Button>
                        )}
                        <Button href="/#contact" variant="ghost" arrow={false}>
                          Start a similar project
                        </Button>
                      </div>
                    </Reveal>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
      )}

      {/* Next */}
      <Link
        href={`/work/${next.slug}`}
        data-cursor="view:Next"
        className="group relative block overflow-hidden bg-white py-20 md:py-28"
      >
        <div className="shell flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-steel">Next project</p>
            <p className="display mt-4 text-[clamp(2.75rem,7vw,6.5rem)] transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
              {next.title} <span className="inline-block text-signal transition-transform duration-700 ease-out-expo group-hover:translate-x-2">→</span>
            </p>
            <p className="mt-3 max-w-md text-steel">{next.summary}</p>
          </div>
          <div
            className={`relative aspect-[16/10] w-full max-w-md shrink-0 overflow-hidden rounded-3xl p-5 transition-transform duration-700 ease-out-expo group-hover:-rotate-1 group-hover:scale-[1.02] ${
              next.tone === "dark" ? "bg-graphite" : "bg-paper"
            }`}
          >
            <ViewTransition name={`project-${next.slug}`} share="morph" default="none">
              <div className="h-full w-full">
                <ProjectVisual project={next} />
              </div>
            </ViewTransition>
          </div>
        </div>
      </Link>
    </article>
  );
}
