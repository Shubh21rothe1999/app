import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MessageSquare, Send, X, Loader2, Bot, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";

// Works both on Emergent (REACT_APP_BACKEND_URL set) and on Vercel (empty -> same-origin /api)
const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;

const SUGGESTIONS = [
  "What is your Databricks experience?",
  "Explain Medallion architecture",
  "What projects has Shubham worked on?",
  "Tell me about your PySpark skills",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi — I'm the DE Career Assistant. Ask me anything about Shubham's Data Engineering experience, projects, or tech stack.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async (text) => {
    const message = (text ?? input).trim();
    if (!message || busy) return;
    setMessages((m) => [...m, { role: "user", text: message }]);
    setInput("");
    setBusy(true);
    try {
      const res = await axios.post(`${API}/chat`, {
        message,
        session_id: sessionId,
      });
      setSessionId(res.data.session_id);
      const reply = res.data.reply || "";
      const outOfScope = reply
        .toLowerCase()
        .includes("not part of shubham's documented experience");
      setMessages((m) => [...m, { role: "assistant", text: reply, outOfScope }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "I couldn't reach the model right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          data-testid="chatbot-open-button"
          onClick={() => setOpen(true)}
          className="fixed z-50 bottom-5 right-5 h-14 w-14 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 grid place-items-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform"
          aria-label="Open chatbot"
        >
          <MessageSquare size={22} />
        </button>
      )}

      {open && (
        <div
          data-testid="chatbot-window"
          className="fixed z-50 bottom-5 right-5 w-[92vw] max-w-[400px] h-[78vh] max-h-[640px] rounded-xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-white/[0.03]">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 grid place-items-center rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                <Bot size={16} />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                  DE Career Assistant
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  online · gemini 3 flash
                </div>
              </div>
            </div>
            <Button
              data-testid="chatbot-close"
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
            >
              <X size={18} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" data-testid="chatbot-messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="h-7 w-7 mt-0.5 grid place-items-center rounded-md bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 shrink-0">
                    <Bot size={14} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                      : "bg-zinc-100 text-zinc-800 dark:bg-white/[0.06] dark:text-zinc-200"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  {m.outOfScope && (
                    <Link
                      to="/contact"
                      onClick={() => setOpen(false)}
                      data-testid="chatbot-contact-cta"
                      className="mt-2 inline-block text-xs font-medium underline underline-offset-4 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                    >
                      → Contact Shubham directly
                    </Link>
                  )}
                </div>
                {m.role === "user" && (
                  <div className="h-7 w-7 mt-0.5 grid place-items-center rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shrink-0">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}
            {busy && (
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <Loader2 size={14} className="animate-spin" /> thinking…
              </div>
            )}
            <div ref={endRef} />
          </div>

          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  data-testid={`chatbot-suggestion-${s.slice(0, 12)}`}
                  onClick={() => send(s)}
                  className="text-[11px] px-2 py-1 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="border-t border-zinc-200 dark:border-white/10 px-3 py-3 flex items-center gap-2 bg-white dark:bg-zinc-950"
          >
            <Input
              data-testid="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a project, skill, tool…"
              className="flex-1"
              disabled={busy}
            />
            <Button
              type="submit"
              data-testid="chatbot-send"
              size="icon"
              disabled={busy || !input.trim()}
              className="rounded-full"
            >
              <Send size={16} />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
