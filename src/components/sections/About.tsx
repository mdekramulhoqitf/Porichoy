import { Reveal, SplitReveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

const story = [
  {
    k: "Started",
    body: `In ${profile.freelancingSince} I began freelancing on Fiverr and Upwork — real clients, real deadlines. It taught me that a website is only as good as the problem it solves.`,
  },
  {
    k: "Grew",
    body: "At Creative IT Institute I worked in a professional team of designers and developers, and learned how good work gets made together.",
  },
  {
    k: "Now",
    body: `At ${profile.currentCompany} I work on digital products like WishHub and client work across web, branding, automation and AI-related services.`,
  },
  {
    k: "Always",
    body: "I design before I code, use AI to move faster, and care about the details that make a product feel finished.",
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-white py-28 md:py-40">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow mb-6 flex items-center gap-3 text-steel">
                <span className="h-px w-8 bg-ink/25" aria-hidden />
                About
              </p>
            </Reveal>
            <h2 id="about-title" className="display text-[clamp(2.5rem,5.6vw,5.25rem)]">
              <SplitReveal text="Started with client briefs." />
              <br />
              <span className="text-steel">
                <SplitReveal text="Now I build products." delay={0.15} />
              </span>
            </h2>

            <Reveal delay={0.2} className="mt-12 max-w-md">
              <div className="flex items-center gap-5 rounded-3xl border hairline bg-paper p-5">
                <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-ink font-display text-[0.95rem] font-semibold tracking-wide text-white">
                  {profile.education.short}
                </div>
                <div>
                  <p className="text-[0.9375rem] font-medium">{profile.education.school}</p>
                  <p className="text-[0.875rem] text-steel">{profile.education.program}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <ol className="space-y-4 lg:col-span-5 lg:col-start-8 lg:pt-24">
          {story.map((s, i) => (
            <Reveal as="li" key={s.k} delay={i * 0.05}>
              <div className="group grid grid-cols-[5.5rem_1fr] gap-4 border-t hairline pt-6 pb-8">
                <p className="eyebrow pt-1.5 text-steel transition-colors group-hover:text-signal">{s.k}</p>
                <p className="text-[1.1875rem] leading-[1.55] tracking-[-0.01em] text-ink/85">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
