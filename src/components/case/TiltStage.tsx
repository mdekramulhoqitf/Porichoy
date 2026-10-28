"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/** A visual that rises out of the page and flattens as it scrolls into view. */
export function TiltStage({ children, dark }: { children: ReactNode; dark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <div ref={ref} className="[perspective:1400px]">
      <motion.div
        style={reduce ? undefined : { rotateX, scale, y }}
        className={`relative aspect-[16/10] origin-bottom overflow-hidden rounded-[28px] p-[5%] shadow-[0_60px_120px_-60px_rgb(12_13_16/0.55)] ${
          dark ? "bg-graphite" : "bg-white"
        }`}
      >
        <div className={`absolute inset-0 ${dark ? "grid-field-dark" : "grid-field"}`} aria-hidden />
        <div className="relative h-full w-full">{children}</div>
      </motion.div>
    </div>
  );
}
