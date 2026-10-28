"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

let instance: Lenis | null = null;

/** Scroll to a target through Lenis when it is running, natively otherwise. */
export function scrollToTarget(target: string | HTMLElement) {
  if (instance) {
    instance.scrollTo(target, { offset: -8, duration: 1.4 });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: { offset: -8 },
      syncTouch: false,
    });
    instance = lenis;
    return () => {
      lenis.destroy();
      instance = null;
    };
  }, []);

  // New route starts at the top unless it targets a hash.
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) requestAnimationFrame(() => scrollToTarget(el as HTMLElement));
      return;
    }
    instance?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
