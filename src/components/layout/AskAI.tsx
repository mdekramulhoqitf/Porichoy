"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = ["What do you build?", "Which projects are live?", "What's your tech stack?"];

/** Floating "Ask AI" chat, answered from the portfolio's own data via /api/chat. */
export function AskAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("open-chat", show);
    return () => window.removeEventListener("open-chat", show);
  }, []);

  useEffect(() => {
    if (!open) return;
    field.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight });
  }, [messages]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    // Keep the last few turns only; the API caps history length.
    const history: Message[] = [...messages, { role: "user" as const, content: q }].slice(-11);
    const start = history.findIndex((m) => m.role === "user");
    const payload = history.slice(start);
    setMessages([...messages, { role: "user", content: q }, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    const append = (chunk: string) =>
      setMessages((cur) => {
        const next = [...cur];
        next[next.length - 1] = { role: "assistant", content: next[next.length - 1].content + chunk };
        return next;
      });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });
      if (!res.ok || !res.body) {
        append((await res.text()) || "Something went wrong — please try again.");
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        append(decoder.decode(value, { stream: true }));
      }
    } catch {
      append("Couldn't reach the assistant — check your connection.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="ask-ai"
        className="btn-object fixed bottom-5 right-5 z-[60] inline-flex h-12 items-center gap-2.5 rounded-full bg-ink pl-4 pr-5 text-[0.9375rem] font-medium text-white shadow-[0_20px_40px_-18px_rgb(12_13_16/0.6)] hover:-translate-y-0.5"
      >
        <span className="size-2 animate-pulse-dot rounded-full bg-signal" aria-hidden />
        {open ? "Close" : "Ask AI"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.section
            id="ask-ai"
            aria-label="Ask AI about my work"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-4 z-[60] flex h-[min(560px,calc(100svh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[24px] border border-white/70 bg-white/90 text-ink shadow-[0_40px_80px_-30px_rgb(12_13_16/0.5)] backdrop-blur-xl"
          >
            <header className="border-b hairline px-5 py-4">
              <p className="font-display text-[1.05rem] font-semibold tracking-tight">Ask about my work</p>
              <p className="mt-0.5 text-[0.8125rem] text-steel">AI answers from this portfolio. For anything else, email {profile.email}.</p>
            </header>

            <div ref={list} data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto px-5 py-4" aria-live="polite">
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-ink/12 px-3.5 py-1.5 text-[0.8125rem] text-ink/75 hover:border-ink/35 hover:text-ink"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((m, i) => (
                <p
                  key={i}
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[0.9375rem] leading-relaxed ${
                    m.role === "user" ? "ml-auto bg-ink text-white" : "bg-paper"
                  }`}
                >
                  {m.content || <span className="text-steel">Thinking…</span>}
                </p>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2 border-t hairline p-3"
            >
              <label className="flex-1">
                <span className="sr-only">Your question</span>
                <input
                  ref={field}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={1000}
                  placeholder="Ask anything about my work…"
                  className="h-11 w-full rounded-full bg-paper px-4 text-[0.9375rem] placeholder:text-steel focus:outline-none focus:ring-2 focus:ring-ink/15"
                />
              </label>
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="h-11 rounded-full bg-ink px-5 text-[0.9375rem] font-medium text-white disabled:opacity-40"
              >
                Send
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
