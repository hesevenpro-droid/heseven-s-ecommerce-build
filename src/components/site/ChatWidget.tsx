import { useEffect, useRef, useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { getVisitorMessages, sendVisitorMessage, startChat, type ChatMessage } from "@/lib/chat.functions";

const TOKEN_KEY = "heseven_chat_token";

export function ChatWidget({ open, onClose }: { open: boolean; onClose: () => void }) {
  const start = useServerFn(startChat);
  const send = useServerFn(sendVisitorMessage);
  const fetchMessages = useServerFn(getVisitorMessages);

  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setToken(window.localStorage.getItem(TOKEN_KEY));
  }, []);

  useEffect(() => {
    if (!open || !token) return;
    let active = true;
    const load = async () => {
      try {
        const rows = await fetchMessages({ data: { token } });
        if (active) setMessages(rows);
      } catch {
        /* ignore polling errors */
      }
    };
    void load();
    const id = window.setInterval(load, 5000);
    return () => {
      active = false;
      window.clearInterval(id);
    };
  }, [open, token, fetchMessages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  if (!open) return null;

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await start({ data: { name, email } });
      window.localStorage.setItem(TOKEN_KEY, res.token);
      setToken(res.token);
    } catch {
      setError("Could not start the chat. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !draft.trim()) return;
    const body = draft.trim();
    setDraft("");
    setBusy(true);
    setError(null);
    try {
      await send({ data: { token, body } });
      const rows = await fetchMessages({ data: { token } });
      setMessages(rows);
    } catch {
      setError("Message not sent. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
      <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <MessageCircle className="h-4 w-4" /> Chat with Heseven
        </span>
        <button type="button" aria-label="Close chat" onClick={onClose}>
          <X className="h-4 w-4" />
        </button>
      </div>

      {!token ? (
        <form onSubmit={handleStart} className="space-y-3 p-4">
          <p className="text-sm text-muted-foreground">
            Tell us who you are and we will reply here, usually within the hour.
          </p>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={busy}
            className="btn-cta w-full rounded-full px-4 py-2.5 text-sm font-semibold disabled:opacity-60"
          >
            {busy ? "Starting..." : "Start chat"}
          </button>
          {error ? <p className="text-xs text-destructive">{error}</p> : null}
        </form>
      ) : (
        <>
          <div className="h-72 space-y-2 overflow-y-auto bg-secondary/40 p-3">
            {messages.length === 0 ? (
              <p className="py-8 text-center text-xs text-muted-foreground">
                Say hello and our team will pick it up shortly.
              </p>
            ) : null}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                  m.sender === "visitor"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "mr-auto border border-border bg-card text-brand-ink"
                }`}
              >
                {m.body}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message"
              className="w-full rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          {error ? <p className="px-3 pb-3 text-xs text-destructive">{error}</p> : null}
        </>
      )}
    </div>
  );
}
