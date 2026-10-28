import { Hero } from "@/components/hero/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { FeaturedWork } from "@/components/work/FeaturedWork";
import { MoreWork } from "@/components/work/MoreWork";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { WhatIBuild } from "@/components/sections/WhatIBuild";
import { AIWorkflow } from "@/components/sections/AIWorkflow";
import { Lab } from "@/components/sections/Lab";
import { SectionHead } from "@/components/ui/SectionHead";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />

      <section id="work" aria-labelledby="work-title" className="relative bg-paper pb-24 pt-10 md:pb-36">
        <div className="shell mb-10 md:mb-16">
          <SectionHead
            id="work-title"
            eyebrow="Selected work"
            title="Products, not just pages."
            aside="Projects that show how I think — from a Bangla design platform to travel, community and commerce products."
          />
        </div>
        <FeaturedWork />

        <div className="shell mt-28 md:mt-40">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h3 className="display text-[clamp(2rem,4vw,3.5rem)]">More work</h3>
            <p className="max-w-xs text-right text-[0.9375rem] text-steel">
              Platform concepts across healthcare and SaaS.
            </p>
          </div>
          <MoreWork />
        </div>
      </section>

      <About />
      <Experience />
      <Ecosystem />
      <WhatIBuild />
      <AIWorkflow />
      <Lab />
    </>
  );
}
