"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

type CursorState =
  | { kind: "default" }
  | { kind: "link" }
  | { kind: "view"; label: string }
  | { kind: "label"; label: string };

/**
 * Desktop-only cursor. States are declared in markup:
 *   data-cursor="view"            → "View" disc (projects)
 *   data-cursor="view:Open site"  → disc with custom text
 *   data-cursor-label="React"     → small tag beside the dot (tech nodes)
 * Any link or button gets a soft ring.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>({ kind: "default" });
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as Element | null;
      const viewEl = target?.closest<HTMLElement>("[data-cursor]");
      if (viewEl) {
        const raw = viewEl.dataset.cursor ?? "";
        if (raw.startsWith("view")) {
          setState({ kind: "view", label: raw.split(":")[1] ?? "View" });
          return;
        }
      }
      const labelEl = target?.closest<HTMLElement>("[data-cursor-label]");
      if (labelEl) {
        setState({ kind: "label", label: labelEl.dataset.cursorLabel ?? "" });
        return;
      }
      if (target?.closest("a, button, [role='button'], label, select")) {
        setState({ kind: "link" });
        return;
      }
      setState({ kind: "default" });
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = state.kind === "view" ? 88 : state.kind === "link" ? 44 : 10;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            width: ringSize,
            height: ringSize,
            backgroundColor:
              state.kind === "view"
                ? "rgba(12,13,16,0.92)"
                : state.kind === "link"
                  ? "rgba(255,139,0,0.0)"
                  : "rgba(255,255,255,1)",
            borderColor: state.kind === "link" ? "rgba(255,139,0,0.9)" : "rgba(12,13,16,0)",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          style={{ borderWidth: 1.5, borderStyle: "solid", mixBlendMode: state.kind === "default" ? "difference" : "normal" }}
        >
          <AnimatePresence>
            {state.kind === "view" && (
              <motion.span
                key={state.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="eyebrow absolute inset-0 grid place-items-center text-center text-[10px] text-white"
              >
                {state.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {state.kind === "label" && (
            <motion.span
              key={state.label}
              initial={{ opacity: 0, x: 4 }}
              animate={{ opacity: 1, x: 14 }}
              exit={{ opacity: 0 }}
              className="eyebrow absolute left-0 top-0 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-2.5 py-1.5 text-white"
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
