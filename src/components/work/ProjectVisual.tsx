import Image from "next/image";
import type { Project, ProjectVisual as VisualKind } from "@/data/projects";

/**
 * Art-directed interface mockups, one per project, built in HTML/CSS.
 * They stand in for screenshots: set `image` on a project to show the real thing.
 * Everything inside is illustrative UI — no real customer data.
 */

export function ProjectVisual({ project, priority = false }: { project: Project; priority?: boolean }) {
  const alt = `${project.title} — ${project.summary}`;
  if (project.image && project.imageFit === "contain" && project.imageSize) {
    // Contained illustrations carry their own backdrop; feather the image's own
    // edges so it melts into whatever stage it sits on.
    const [w, h] = project.imageSize;
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Image
          src={project.image}
          alt={alt}
          width={w}
          height={h}
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority={priority}
          className="h-auto max-h-full w-auto max-w-full"
          style={featherEdges}
        />
      </div>
    );
  }
  if (project.image) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
        <Image
          src={project.image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority={priority}
          className={project.imageFit === "contain" ? "object-contain" : "object-cover"}
        />
      </div>
    );
  }
  const V = visuals[project.visual];
  return (
    <div role="img" aria-label={`Illustration of the ${project.title} interface`} className="h-full w-full">
      <V />
    </div>
  );
}

const feather =
  "linear-gradient(to right, transparent, black 7%, black 93%, transparent), linear-gradient(to bottom, transparent, black 7%, black 93%, transparent)";
const featherEdges: React.CSSProperties = {
  maskImage: feather,
  WebkitMaskImage: feather,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
};

const visuals: Record<VisualKind, () => React.JSX.Element> = {
  vingo: Vingo,
  wishhub: WishHub,
  safat: Safat,
  academy: Academy,
  dental: Dental,
  realestate: RealEstate,
  billing: Billing,
  research: Research,
  commerce: Commerce,
};

/* ---------- shared bits ---------- */

function Bar({ w, className = "bg-ink/12" }: { w: string; className?: string }) {
  return <span className={`block h-2 rounded-full ${className}`} style={{ width: w }} />;
}

function Window({
  children,
  url,
  dark = false,
  className = "",
}: {
  children: React.ReactNode;
  url?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden rounded-[18px] border ${
        dark ? "border-white/8 bg-[#121418]" : "border-ink/6 bg-white"
      } shadow-[0_40px_80px_-40px_rgb(12_13_16/0.45)] ${className}`}
    >
      <div className={`flex h-9 shrink-0 items-center gap-1.5 border-b px-3.5 ${dark ? "border-white/6" : "border-ink/6"}`}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={`size-2 rounded-full ${dark ? "bg-white/15" : "bg-ink/12"}`} />
        ))}
        {url && (
          <span
            className={`mx-auto rounded-full px-3 py-0.5 font-mono text-[10px] ${dark ? "bg-white/6 text-white/50" : "bg-ink/4 text-ink/45"}`}
          >
            {url}
          </span>
        )}
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}

/* ---------- VingoBD: Bangla card editor ---------- */

function Vingo() {
  return (
    <Window url="vingobd.com/editor">
      <div className="flex h-full">
        <div className="flex w-12 flex-col items-center gap-3 border-r border-ink/6 py-4 sm:w-14">
          {["T", "◻", "◯", "✦", "▦"].map((g, i) => (
            <span
              key={g}
              className={`grid size-8 place-items-center rounded-lg text-[13px] ${i === 0 ? "bg-ink text-white" : "text-ink/45"}`}
            >
              {g}
            </span>
          ))}
        </div>
        <div className="grid flex-1 place-items-center bg-[#eef0f3] p-4 sm:p-6">
          <div className="relative aspect-[4/5] h-[88%] max-h-full overflow-hidden rounded-xl bg-[#1a1208] shadow-[0_30px_60px_-25px_rgb(12_13_16/0.55)]">
            <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,#ff8b00_0%,#b84a00_45%,#1a1208_100%)]" />
            <div className="absolute inset-x-0 top-[12%] mx-auto size-[38%] rounded-full border border-filament/60" />
            <div className="absolute inset-x-0 top-[17%] mx-auto size-[28%] rounded-full bg-filament/90 blur-[1px]" />
            <div className="absolute inset-x-[10%] bottom-[12%] text-center font-bangla text-white">
              <p className="text-[clamp(1.1rem,2.6vw,2rem)] font-bold leading-tight">শুভ নববর্ষ</p>
              <p className="mt-1 text-[clamp(0.55rem,1vw,0.8rem)] font-medium text-white/75">১৪৩৩ · পহেলা বৈশাখ</p>
            </div>
            <div className="absolute inset-x-[8%] bottom-[9%] top-[62%] rounded-md border border-dashed border-white/80">
              {[
                "-left-1 -top-1",
                "-right-1 -top-1",
                "-bottom-1 -left-1",
                "-bottom-1 -right-1",
              ].map((c) => (
                <span key={c} className={`absolute size-2 rounded-[2px] border border-signal bg-white ${c}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="hidden w-[30%] flex-col gap-4 border-l border-ink/6 p-4 md:flex">
          <p className="eyebrow text-[9px] text-ink/45">Text</p>
          <div className="rounded-lg border border-ink/8 px-3 py-2 font-bangla text-[13px] font-medium">শুভ নববর্ষ</div>
          <div className="flex gap-2">
            {["#ff8b00", "#ffc90c", "#ffffff", "#0c0d10"].map((c) => (
              <span key={c} className="size-6 rounded-full border border-ink/10" style={{ background: c }} />
            ))}
          </div>
          <p className="eyebrow mt-2 text-[9px] text-ink/45">Occasions</p>
          <div className="flex flex-wrap gap-1.5">
            {["বৈশাখ", "ঈদ", "জন্মদিন", "বিয়ে"].map((t, i) => (
              <span
                key={t}
                className={`rounded-full px-2.5 py-1 font-bangla text-[11px] ${i === 0 ? "bg-ink text-white" : "bg-ink/5 text-ink/60"}`}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-auto rounded-full bg-ink py-2 text-center text-[11px] font-medium text-white">Download</div>
        </div>
      </div>
    </Window>
  );
}

/* ---------- WishHub: scheduled wish card ---------- */

function WishHub() {
  return (
    <div className="relative grid h-full w-full place-items-center">
      <div className="relative flex w-[92%] max-w-[640px] items-center gap-[4%]">
        <div className="relative aspect-[3/4] w-[48%] -rotate-3 overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]">
          <div className="absolute inset-0 bg-[conic-gradient(from_200deg_at_70%_30%,#fff4dc,#ffffff,#fff0e0,#ffffff)]" />
          {[...Array(9)].map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                width: 6 + (i % 3) * 4,
                height: 6 + (i % 3) * 4,
                left: `${12 + ((i * 37) % 76)}%`,
                top: `${8 + ((i * 23) % 40)}%`,
                background: i % 2 ? "#ffc90c" : "#ff8b00",
                opacity: 0.85,
              }}
            />
          ))}
          <div className="absolute inset-x-[10%] bottom-[12%]">
            <p className="font-display text-[clamp(1.2rem,2.6vw,2.1rem)] font-semibold leading-none tracking-tight text-ink">
              Happy
              <br />
              Birthday
            </p>
            <p className="mt-2 text-[clamp(0.55rem,0.9vw,0.75rem)] text-ink/55">A little something, right on time.</p>
          </div>
        </div>
        <div className="flex-1 space-y-2.5">
          <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4 backdrop-blur">
            <p className="eyebrow text-[9px] text-white/40">Deliver on</p>
            <div className="mt-3 grid grid-cols-7 gap-1">
              {[...Array(21)].map((_, i) => (
                <span
                  key={i}
                  className={`grid aspect-square place-items-center rounded-md text-[9px] ${
                    i === 11 ? "bg-signal font-semibold text-ink" : "text-white/45"
                  }`}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
            <span className="eyebrow text-[9px] text-white/40">Time</span>
            <span className="font-mono text-[13px] text-white">00:00</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
            <span className="size-6 rounded-full bg-gradient-to-br from-filament to-signal" />
            <Bar w="45%" className="bg-white/20" />
          </div>
          <div className="flex items-center justify-center gap-2 rounded-full bg-white py-2.5 text-[12px] font-medium text-ink">
            <span className="size-1.5 rounded-full bg-signal" />
            Scheduled
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Safat Group: industrial / battery ---------- */

function Safat() {
  return (
    <Window url="safatgroupbd.com" dark>
      <div className="grid-field-dark relative flex h-full items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_68%_55%,rgb(255_139_0/0.16),transparent_70%)]" />
        <div className="relative z-10 w-[46%] space-y-3 pl-[7%]">
          <p className="eyebrow text-[9px] text-signal">Industrial · Energy</p>
          <div className="space-y-2">
            <Bar w="92%" className="h-3.5 bg-white/85" />
            <Bar w="70%" className="h-3.5 bg-white/85" />
          </div>
          <Bar w="80%" className="bg-white/15" />
          <Bar w="60%" className="bg-white/15" />
          <div className="flex gap-2 pt-2">
            <span className="h-7 w-20 rounded-full bg-white" />
            <span className="h-7 w-16 rounded-full border border-white/20" />
          </div>
        </div>
        {/* battery, lit from the left */}
        <div className="relative z-10 ml-auto mr-[10%] flex h-[70%] items-end gap-[6%]" style={{ perspective: 800 }}>
          {[0.78, 1, 0.64].map((h, i) => (
            <div key={i} className="relative w-[clamp(2.4rem,6vw,4.6rem)]" style={{ height: `${h * 100}%` }}>
              <div className="absolute left-1/2 top-0 h-[5%] w-[36%] -translate-x-1/2 -translate-y-full rounded-t-md bg-[linear-gradient(90deg,#3a3d44,#9aa0aa,#3a3d44)]" />
              <div className="absolute inset-0 overflow-hidden rounded-xl bg-[linear-gradient(90deg,#1b1d22_0%,#50545d_28%,#23262c_60%,#0f1013_100%)] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]">
                <div className="absolute inset-x-0 top-[18%] h-[14%] bg-[linear-gradient(90deg,#b35f00,#ff8b00_30%,#ffb040_45%,#b35f00)]" />
                <div className="absolute inset-x-[18%] bottom-[10%] space-y-1">
                  <span className="block h-0.5 rounded bg-white/25" />
                  <span className="block h-0.5 w-2/3 rounded bg-white/15" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#121418] to-transparent" />
      </div>
    </Window>
  );
}

/* ---------- Academy ---------- */

function Academy() {
  const courses = ["IELTS", "GRE", "PTE", "SAT", "TOEFL", "GED"];
  return (
    <Window url="academy / dashboard">
      <div className="flex h-full">
        <div className="hidden w-[22%] flex-col gap-2 border-r border-ink/6 bg-paper/60 p-4 sm:flex">
          <span className="mb-3 size-7 rounded-lg bg-ink" />
          {["Courses", "Students", "Enrolments", "Payments"].map((l, i) => (
            <span key={l} className={`rounded-lg px-2.5 py-1.5 text-[11px] ${i === 0 ? "bg-white font-medium shadow-sm" : "text-ink/50"}`}>
              {l}
            </span>
          ))}
        </div>
        <div className="flex-1 space-y-3 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <Bar w="30%" className="h-3 bg-ink/80" />
            <span className="rounded-full bg-ink px-3 py-1 text-[10px] text-white">+ New course</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {courses.map((c, i) => (
              <div key={c} className="rounded-xl border border-ink/6 bg-white p-3 shadow-[0_8px_20px_-14px_rgb(12_13_16/0.4)]">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[13px] font-semibold tracking-tight">{c}</span>
                  <span className={`size-1.5 rounded-full ${i === 0 ? "bg-signal" : "bg-ink/15"}`} />
                </div>
                <div className="mt-3 h-1 rounded-full bg-ink/6">
                  <div className="h-full rounded-full bg-ink/70" style={{ width: `${40 + ((i * 17) % 50)}%` }} />
                </div>
                <Bar w="60%" className="mt-2 h-1.5 bg-ink/10" />
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-ink/6 bg-white">
            {[0, 1, 2].map((r) => (
              <div key={r} className="flex items-center gap-3 border-b border-ink/5 px-3 py-2.5 last:border-0">
                <span className="size-5 rounded-full bg-ink/10" />
                <Bar w="26%" />
                <Bar w="14%" className="bg-ink/8" />
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-[9px] ${r === 0 ? "bg-signal/15 text-[#b35f00]" : "bg-ink/5 text-ink/50"}`}
                >
                  {r === 0 ? "Paid" : "Enrolled"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}

/* ---------- Dental ---------- */

function Dental() {
  return (
    <Window url="clinic / appointments">
      <div className="grid h-full grid-cols-5 gap-3 p-4">
        <div className="col-span-3 rounded-xl border border-ink/6 p-3">
          <Bar w="40%" className="mb-3 h-2.5 bg-ink/70" />
          <div className="grid grid-cols-5 gap-1.5">
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className={`h-6 rounded-md ${[3, 8, 14].includes(i) ? "bg-ink" : [6, 11].includes(i) ? "bg-signal/70" : "bg-ink/5"}`}
              />
            ))}
          </div>
        </div>
        <div className="col-span-2 space-y-2">
          {["Requested", "Requested", "Follow-up"].map((s, i) => (
            <div key={i} className="rounded-xl border border-ink/6 p-2.5">
              <div className="flex items-center gap-2">
                <span className="size-5 rounded-full bg-ink/10" />
                <Bar w="50%" />
              </div>
              <div className="mt-2 flex gap-1.5">
                <span className="rounded-full bg-ink px-2 py-0.5 text-[9px] text-white">Approve</span>
                <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[9px] text-ink/55">{s === "Follow-up" ? "Schedule" : "Reject"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}

/* ---------- Real estate ---------- */

function RealEstate() {
  return (
    <Window url="stays / listing">
      <div className="flex h-full gap-3 p-4">
        <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-2">
          <div className="row-span-2 rounded-xl bg-[linear-gradient(160deg,#d6d9df,#a8adb7)]" />
          <div className="rounded-xl bg-[linear-gradient(160deg,#e3e5e9,#c3c7ce)]" />
          <div className="rounded-xl bg-[linear-gradient(160deg,#cfd3d9,#9ea3ad)]" />
        </div>
        <div className="w-[38%] space-y-2 rounded-xl border border-ink/6 p-3 shadow-[0_12px_30px_-18px_rgb(12_13_16/0.4)]">
          <Bar w="50%" className="h-2.5 bg-ink/80" />
          <div className="grid grid-cols-2 gap-1.5">
            <span className="h-8 rounded-lg border border-ink/10" />
            <span className="h-8 rounded-lg border border-ink/10" />
          </div>
          <Bar w="70%" className="bg-ink/8" />
          <Bar w="40%" className="bg-ink/8" />
          <div className="rounded-lg bg-[#635bff] py-1.5 text-center text-[10px] font-medium text-white">Pay with Stripe</div>
        </div>
      </div>
    </Window>
  );
}

/* ---------- Billing ---------- */

function Billing() {
  return (
    <div className="grid h-full w-full place-items-center p-5">
      <div className="w-[70%] max-w-[380px] rotate-[-2deg] rounded-xl bg-white p-5 shadow-[0_40px_70px_-30px_rgb(12_13_16/0.45)]">
        <div className="flex items-start justify-between">
          <span className="font-display text-[15px] font-semibold tracking-tight">Invoice</span>
          <span className="rounded-full bg-signal/15 px-2 py-0.5 text-[9px] font-medium text-[#b35f00]">Sent</span>
        </div>
        <div className="mt-4 space-y-2.5">
          {[62, 48, 55].map((w, i) => (
            <div key={i} className="flex items-center justify-between border-b border-ink/5 pb-2">
              <Bar w={`${w}%`} />
              <Bar w="14%" className="bg-ink/20" />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="eyebrow text-[9px] text-ink/45">Total</span>
          <Bar w="24%" className="h-3 bg-ink/80" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Research ---------- */

function Research() {
  return (
    <Window url="research / reader" dark>
      <div className="flex h-full gap-3 p-4">
        <div className="flex-1 space-y-2 rounded-xl bg-white/[0.04] p-4">
          <Bar w="70%" className="h-3 bg-white/70" />
          <Bar w="40%" className="mb-3 bg-white/25" />
          {[92, 88, 95, 60, 90, 84].map((w, i) => (
            <Bar key={i} w={`${w}%`} className={i === 3 ? "bg-filament/60" : "bg-white/12"} />
          ))}
        </div>
        <div className="w-[36%] space-y-2 rounded-xl border border-white/8 p-3">
          <p className="flex items-center gap-1.5 text-[10px] text-white/60">
            <span className="text-filament">✦</span> Assistant
          </p>
          <div className="rounded-lg bg-white/6 p-2">
            <Bar w="80%" className="bg-white/25" />
          </div>
          <div className="space-y-1.5 rounded-lg p-2">
            <Bar w="90%" className="bg-white/15" />
            <Bar w="70%" className="bg-white/15" />
          </div>
          <span className="inline-block rounded-full border border-filament/40 px-2 py-0.5 font-mono text-[9px] text-filament">§ source</span>
        </div>
      </div>
    </Window>
  );
}

/* ---------- Commerce ---------- */

function Commerce() {
  return (
    <Window url="store / catalogue">
      <div className="grid h-full grid-cols-3 gap-3 p-4">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div
              className="flex-1 rounded-xl"
              style={{ background: `linear-gradient(160deg, ${i % 2 ? "#e6e8ec" : "#d9dce2"}, ${i === 1 ? "#ffd28a" : "#b9bdc6"})` }}
            />
            <Bar w="70%" />
            <Bar w="35%" className="bg-ink/25" />
          </div>
        ))}
      </div>
    </Window>
  );
}
