"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const LINE = "I build. I experiment. I design. I solve.";

/** Words light up from grey to ink as the line scrolls through the viewport. */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = LINE.split(" ");

  return (
    <section aria-label="Manifesto" className="relative bg-paper py-[18vh]">
      <div className="shell">
        <p
          ref={ref}
          className="display mx-auto max-w-[15ch] text-center text-[clamp(3rem,10vw,9.5rem)] font-semibold leading-[0.95]"
        >
          <span className="sr-only">{LINE}</span>
          <span aria-hidden>
            {words.map((w, i) => (
              <Word key={i} word={w} range={[i / words.length, (i + 1) / words.length]} progress={scrollYProgress} static={!!reduce} />
            ))}
          </span>
        </p>
      </div>
    </section>
  );
}

function Word({
  word,
  range,
  progress,
  static: isStatic,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  static: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const isVerb = word !== "I";
  return (
    <motion.span style={isStatic ? undefined : { opacity }} className="inline-block pr-[0.22em]">
      {isVerb ? (
        <>
          {word.replace(".", "")}
          <span className="text-signal">.</span>
        </>
      ) : (
        word
      )}
    </motion.span>
  );
}
