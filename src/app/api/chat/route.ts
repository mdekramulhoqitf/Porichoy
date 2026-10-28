import Anthropic from "@anthropic-ai/sdk";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { chapters } from "@/data/journey";
import { skills } from "@/data/skills";

const client = new Anthropic();

// Everything the assistant knows comes from the site's own data files, so it
// can't claim more than the portfolio does.
const knowledge = JSON.stringify({
  profile: {
    name: profile.name,
    roles: profile.roles,
    thesis: profile.thesis,
    base: profile.base,
    currentCompany: profile.currentCompany,
    freelancingSince: profile.freelancingSince,
    education: profile.education,
    email: profile.email,
    links: profile.socials.filter((s) => s.href),
  },
  journey: chapters.map(({ title, org, when, body }) => ({ title, org, when, body })),
  skills: skills.map(({ name, category, context }) => ({ name, category, context })),
  projects: projects.map(({ slug, title, category, summary, description, role, stack, features, liveUrl, status }) => ({
    title,
    category,
    summary,
    description,
    role,
    stack,
    features,
    liveUrl,
    status,
    page: `/work/${slug}`,
  })),
});

const system = `You are the assistant on ${profile.name}'s portfolio website. Visitors ask you about ${profile.name}'s work, skills and experience.

Answer only from the portfolio data below. If the answer is not in the data, say you don't know and suggest emailing ${profile.email}. Never invent clients, numbers, dates or technologies. Keep answers short and friendly (2–5 sentences), plain text without markdown headings. Reply in the visitor's language (English or Bangla).

Portfolio data:
${knowledge}`;

const MAX_TURNS = 12;
const MAX_CHARS = 1000;

// shortcut: in-memory per-IP limit resets on redeploy and isn't shared across server instances; move to a KV store if traffic grows.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 8;
}

function parse(body: unknown): Anthropic.Beta.BetaMessageParam[] | null {
  const list = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(list) || list.length === 0 || list.length > MAX_TURNS) return null;
  const out: Anthropic.Beta.BetaMessageParam[] = [];
  for (const [i, m] of list.entries()) {
    const role = i % 2 === 0 ? "user" : "assistant";
    if (m?.role !== role || typeof m.content !== "string" || !m.content.trim() || m.content.length > MAX_CHARS * 4) return null;
    if (role === "user" && m.content.length > MAX_CHARS) return null;
    out.push({ role, content: m.content });
  }
  return out.at(-1)?.role === "user" ? out : null;
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response("Chat is not configured yet.", { status: 503 });
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return new Response("Too many messages — try again in a minute.", { status: 429 });

  const messages = parse(await request.json().catch(() => null));
  if (!messages) return new Response("Invalid request.", { status: 400 });

  const stream = client.beta.messages.stream({
    model: "claude-opus-5-5",
    max_tokens: 4000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low" },
    cache_control: { type: "ephemeral" },
    system,
    messages,
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") controller.enqueue(encoder.encode("Sorry, I can't help with that."));
      } catch (error) {
        console.error("chat stream failed", error);
        controller.enqueue(encoder.encode("\n\nSomething went wrong — please try again."));
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
