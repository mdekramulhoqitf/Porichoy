import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "light" | "ghost" | "ghost-dark";

const styles: Record<Variant, string> = {
  primary: "btn-object bg-ink text-white hover:-translate-y-0.5",
  light: "btn-object bg-white text-ink hover:-translate-y-0.5",
  ghost: "border hairline text-ink hover:bg-white/70",
  "ghost-dark": "border hairline-dark text-white hover:bg-white/5",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Adds the signal dot — use on one CTA per view. */
  signal?: boolean;
  external?: boolean;
  className?: string;
  arrow?: boolean;
};

export function Button({ href, children, variant = "primary", signal, external, className = "", arrow = true }: Props) {
  const cls = `group relative inline-flex h-12 items-center gap-3 rounded-full pl-5 pr-4 text-[0.9375rem] font-medium tracking-[-0.01em] transition ${styles[variant]} ${className}`;
  const inner = (
    <>
      {signal && <span className="size-2 rounded-full bg-signal animate-pulse-dot" aria-hidden />}
      <span>{children}</span>
      {arrow && (
        <span
          aria-hidden
          className="grid size-7 place-items-center overflow-hidden rounded-full bg-current/10 transition-colors duration-300 group-hover:bg-signal"
        >
          <svg
            viewBox="0 0 16 16"
            className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-[1px] group-hover:-rotate-45 group-hover:text-ink"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      )}
    </>
  );

  return (
    <Magnetic>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={cls}>
          {inner}
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}
