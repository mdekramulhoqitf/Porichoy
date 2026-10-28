import { Reveal } from "@/components/ui/Reveal";

const LAYERS = [
  { id: "interface", label: "Interface", line: "What people see and touch" },
  { id: "logic", label: "Application", line: "Rules, flows and APIs" },
  { id: "data", label: "Data", line: "Records, auth and storage" },
  { id: "infra", label: "Delivery", line: "Hosting, domain and SSL" },
];

/** Where each known tool sits. Unknown tools fall into the application layer. */
const PLACEMENT: Record<string, string> = {
  Supabase: "data",
  PostgreSQL: "data",
  MongoDB: "data",
  MySQL: "data",
  Firebase: "data",
  Stripe: "logic",
  React: "interface",
  "Next.js": "interface",
  Cloudflare: "infra",
};

/** An exploded layer diagram — the same idea as the hero, in two dimensions. */
export function StackDiagram({ stack }: { stack: string[] }) {
  return (
    <figure>
      <figcaption className="sr-only">Architecture layers for this project</figcaption>
      <div className="space-y-3 [perspective:1200px]">
        {LAYERS.map((l, i) => {
          const tools = stack.filter((s) => (PLACEMENT[s] ?? "logic") === l.id);
          return (
            <Reveal key={l.id} delay={i * 0.08} y={30}>
              <div
                className={`flex items-center justify-between gap-6 rounded-2xl border px-6 py-5 ${
                  i === 0 ? "border-ink bg-ink text-white" : "hairline bg-white"
                }`}
                style={{ marginLeft: `${i * 4}%`, marginRight: `${(LAYERS.length - 1 - i) * 4}%` }}
              >
                <div>
                  <p className="font-display text-[1.125rem] font-semibold tracking-tight">{l.label}</p>
                  <p className={`text-[0.8125rem] ${i === 0 ? "text-fog" : "text-steel"}`}>{l.line}</p>
                </div>
                {tools.length > 0 && (
                  <ul className="flex flex-wrap justify-end gap-1.5">
                    {tools.map((t) => (
                      <li
                        key={t}
                        className={`rounded-full px-3 py-1 text-[0.8125rem] ${i === 0 ? "bg-white/10" : "bg-ink/5"}`}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </figure>
  );
}
