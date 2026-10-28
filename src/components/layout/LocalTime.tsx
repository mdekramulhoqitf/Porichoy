"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

/** Availability badge plus the owner's live local time (client-only to avoid hydration drift). */
export function LocalTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: profile.timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={`flex flex-wrap items-center gap-x-4 gap-y-1 ${className}`}>
      {profile.available && (
        <span className="flex items-center gap-2">
          <span className="size-1.5 animate-pulse-dot rounded-full bg-signal" aria-hidden />
          Available for new projects
        </span>
      )}
      <span suppressHydrationWarning>
        {profile.city} · {time ?? "--:--"}
      </span>
    </p>
  );
}
