"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { LabEntry } from "@/data/lab";

/** Small live pieces for the Lab grid. Each runs only while visible. */
export function LabVisual({ kind }: { kind: LabEntry["visual"] }) {
  switch (kind) {
    case "orbit":
      return <Orbit />;
    case "flow":
      return <Flow />;
    case "grid":
      return <Controls />;
    case "prompt":
      return <Prompt />;
    case "brand":
      return <Brand />;
    case "type":
      return <Kinetic />;
  }
}

/* Stacked layers rotating in CSS 3D — a pocket version of the hero. */
function Orbit() {
  const reduce = useReducedMotion();
  return (
    <div className="grid h-full place-items-center pt-[8%] [perspective:900px]" aria-hidden>
      <div
        className="relative h-[40%] w-[40%] [transform-style:preserve-3d]"
        style={{
          animation: reduce ? undefined : "lab-orbit 14s linear infinite",
          transform: "rotateX(58deg) rotateZ(-30deg)",
        }}
      >
        {["#101216", "#ffffff", "#1b1d22", "#f4f5f7"].map((c, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-xl border border-ink/10 shadow-[0_20px_40px_-20px_rgb(12_13_16/0.5)]"
            style={{ background: c, transform: `translateZ(${i * 26}px)` }}
          >
            {i === 3 && <span className="absolute right-3 top-3 size-3 rounded-[3px] bg-signal" />}
          </div>
        ))}
      </div>
      <style>{`@keyframes lab-orbit{from{transform:rotateX(58deg) rotateZ(-30deg)}to{transform:rotateX(58deg) rotateZ(330deg)}}`}</style>
    </div>
  );
}

/* Flow field drawn with short strokes on a canvas. */
function Flow() {
  const ref = useRef<HTMLCanvasElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let raf = 0;
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const step = 18;
      for (let x = step / 2; x < width; x += step) {
        for (let y = step / 2; y < height; y += step) {
          const a = Math.sin(x * 0.012 + t) + Math.cos(y * 0.014 - t * 0.8);
          const len = 7;
          const d = Math.hypot(x - width * 0.62, y - height * 0.45);
          ctx.strokeStyle = d < 42 ? "#ff8b00" : "rgba(12,13,16,0.55)";
          ctx.lineWidth = d < 42 ? 1.6 : 1;
          ctx.beginPath();
          ctx.moveTo(x - Math.cos(a) * len, y - Math.sin(a) * len);
          ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
          ctx.stroke();
        }
      }
      t += 0.008;
      if (!reduce && inView) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  return <canvas ref={ref} className="h-full w-full" aria-hidden />;
}

/* Tiny interaction experiments that actually work. */
function Controls() {
  const [on, setOn] = useState(true);
  const [value, setValue] = useState(64);
  return (
    <div className="flex h-full flex-col justify-center gap-5 px-7">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-[0.875rem] shadow-[var(--shadow-object)]"
      >
        Magnetic buttons
        <span className={`relative h-6 w-10 rounded-full transition-colors duration-300 ${on ? "bg-ink" : "bg-ink/15"}`}>
          <span
            className={`absolute top-1 size-4 rounded-full bg-white shadow transition-transform duration-500 ease-out-expo ${
              on ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </span>
      </button>
      <label className="rounded-2xl bg-white px-4 py-3 text-[0.875rem] shadow-[var(--shadow-object)]">
        <span className="flex justify-between">
          Depth <span className="font-mono text-steel">{value}</span>
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="mt-2 w-full accent-[#0c0d10]"
        />
      </label>
      <div
        className="mx-auto h-10 w-28 rounded-xl bg-white transition-shadow duration-300"
        style={{
          boxShadow: `0 1px 0 #fff inset, 0 ${value / 6}px ${value / 2.2}px -${value / 8}px rgb(12 13 16 / ${0.15 + value / 400})`,
          transform: `translateY(${-value / 25}px)`,
        }}
        aria-hidden
      />
    </div>
  );
}

function Prompt() {
  return (
    <div className="flex h-full flex-col gap-3 p-5" aria-hidden>
      <div className="flex items-center gap-2 rounded-full bg-white/8 px-4 py-2.5 text-[0.8125rem] text-white/70">
        <span className="text-filament">✦</span>
        <span className="truncate">soft studio light, floating glass device, warm accent…</span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2.5">
        {[
          "radial-gradient(80% 70% at 30% 30%,#ffc90c 0%,#ff8b00 30%,#1f2228 75%)",
          "linear-gradient(160deg,#f4f5f7,#a9adb5 60%,#16181d)",
          "radial-gradient(60% 60% at 70% 60%,#ffffff 0%,#6a6f78 50%,#0c0d10 100%)",
          "conic-gradient(from 210deg at 50% 60%,#16181d,#ff8b00,#ffc90c,#16181d)",
        ].map((bg, i) => (
          <div key={i} className="relative overflow-hidden rounded-xl" style={{ background: bg }}>
            <span className="absolute inset-x-[22%] bottom-[18%] top-[30%] rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Brand() {
  return (
    <div className="relative grid h-full place-items-center" aria-hidden>
      <svg viewBox="0 0 200 200" className="h-[76%]">
        {[40, 70, 100, 130, 160].map((v) => (
          <g key={v} stroke="rgb(12 13 16 / 0.1)" strokeWidth="0.6">
            <line x1={v} y1="10" x2={v} y2="190" />
            <line x1="10" y1={v} x2="190" y2={v} />
          </g>
        ))}
        <circle cx="100" cy="100" r="60" fill="none" stroke="rgb(12 13 16 / 0.15)" strokeDasharray="2 3" />
        <rect x="55" y="55" width="90" height="90" rx="22" fill="#0c0d10" />
        <rect x="88" y="88" width="24" height="24" rx="5" fill="#ff8b00" transform="rotate(45 100 100)" />
        <text x="12" y="24" fontSize="7" fontFamily="var(--font-mono)" fill="#6a6f78">
          r=22 · 90×90
        </text>
      </svg>
    </div>
  );
}

function Kinetic() {
  const reduce = useReducedMotion();
  const word = "MOTION";
  return (
    <div className="flex h-full items-center justify-center overflow-hidden" aria-hidden>
      <p className="display flex text-[clamp(3rem,8vw,6.5rem)] text-white">
        {word.split("").map((ch, i) => (
          <span
            key={i}
            className="inline-block"
            style={
              reduce
                ? undefined
                : { animation: `lab-wave 2.8s cubic-bezier(0.83,0,0.17,1) ${i * 0.12}s infinite` }
            }
          >
            {ch}
          </span>
        ))}
      </p>
      <style>{`@keyframes lab-wave{0%,100%{transform:translateY(0) scaleY(1);color:#fff}40%{transform:translateY(-14%) scaleY(1.08);color:#ffc90c}}`}</style>
    </div>
  );
}
