import { useEffect, useRef, useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { getVisitorMessages, sendVisitorMessage, startChat, type ChatMessage } from "@/lib/chat.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TOKEN_KEY = "heseven_chat_token";

export function ChatWidget({ open, onOpen, onClose }: { open: boolean; onOpen: () => void; onClose: () => void }) {
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
  const messagesRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ height: 0, top: 0 });

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
    const list = messagesRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!open || typeof window === "undefined") return;
    const visualViewport = window.visualViewport;
    const updateViewport = () => {
      setViewport({
        height: visualViewport?.height ?? window.innerHeight,
        top: visualViewport?.offsetTop ?? 0,
      });
    };
    updateViewport();
    visualViewport?.addEventListener("resize", updateViewport);
    visualViewport?.addEventListener("scroll", updateViewport);
    return () => {
      visualViewport?.removeEventListener("resize", updateViewport);
      visualViewport?.removeEventListener("scroll", updateViewport);
    };
  }, [open]);

  useEffect(() => {
    if (!open || typeof window === "undefined") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

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
    <>
      {!open ? (
        <Button
          type="button"
          onClick={onOpen}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-12 items-center gap-2 rounded-full px-5 shadow-lg lg:hidden"
          aria-label="Open chat with Heseven. We are online."
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </span>
          <MessageCircle className="h-4 w-4" />
          <span>Chat with us</span>
        </Button>
      ) : null}
      {!open ? null : (
        <>
          <button
            type="button"
            aria-label="Close chat"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-[2px] lg:hidden"
          />
          <section
            role="dialog"
            aria-label="Chat with Heseven"
            aria-modal="true"
            style={viewport.height ? { top: `${viewport.top + 8}px`, height: `${Math.max(viewport.height - 16, 240)}px` } : undefined}
            className="fixed inset-x-2 bottom-2 z-50 flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl [height:calc(100dvh-1rem)] lg:inset-auto lg:bottom-4 lg:right-4 lg:top-auto lg:h-[min(36rem,calc(100dvh-2rem))] lg:max-h-[calc(100dvh-2rem)] lg:w-[min(24rem,calc(100vw-2rem))]"
          >
            <header className="flex shrink-0 items-center justify-between gap-3 bg-primary px-4 py-4 text-primary-foreground">
              <div className="flex min-w-0 items-center gap-3">
                <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-foreground text-primary">
                  <MessageCircle className="h-5 w-5" />
                  <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-primary bg-emerald-400" />
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold leading-tight">Chat with Heseven</h2>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-primary-foreground/80">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                    We’re online and ready to help
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close chat"
                onClick={onClose}
                className="h-10 w-10 shrink-0 rounded-full text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </header>

            {!token ? (
              <>
                <div className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-secondary/30 p-5 sm:p-6">
                  <div>
                    <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-border bg-card p-4 text-sm leading-relaxed text-foreground shadow-sm">
                      Hi! Tell us who you are and we’ll reply here, usually within the hour.
                    </div>
                    <p className="mt-2 pl-2 text-[11px] font-semibold uppercase text-muted-foreground">Heseven Support</p>
                  </div>
                  <form id="chat-start-form" onSubmit={handleStart} className="space-y-4">
                    <label className="block space-y-1.5 text-sm font-medium text-foreground">
                      <span>Your name</span>
                      <Input
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="h-12 rounded-xl bg-card px-4 text-base"
                      />
                    </label>
                    <label className="block space-y-1.5 text-sm font-medium text-foreground">
                      <span>Email address</span>
                      <Input
                        required
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="h-12 rounded-xl bg-card px-4 text-base"
                      />
                    </label>
                  </form>
                </div>
                <footer className="shrink-0 border-t border-border bg-card px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-6">
                  <Button
                    type="submit"
                    form="chat-start-form"
                    disabled={busy}
                    className="h-12 w-full rounded-xl text-base font-semibold"
                  >
                    {busy ? "Starting…" : "Start chat"}
                    <Send className="h-4 w-4" />
                  </Button>
                  {error ? <p role="alert" className="mt-3 text-sm text-destructive">{error}</p> : null}
                  <p className="mt-3 text-center text-xs text-muted-foreground">Average reply time: under an hour</p>
                </footer>
              </>
            ) : (
              <>
                <div
                  ref={messagesRef}
                  aria-live="polite"
                  aria-label="Chat messages"
                  className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-secondary/30 p-4 sm:p-5"
                >
                  {messages.length === 0 ? (
                    <div className="space-y-2 pt-6">
                      <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-border bg-card p-4 text-sm leading-relaxed text-foreground shadow-sm">
                        You’re connected. Send us a message and we’ll be right with you.
                      </div>
                      <p className="pl-2 text-[11px] font-semibold uppercase text-muted-foreground">Heseven Support</p>
                    </div>
                  ) : null}
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`max-w-[86%] break-words rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        m.sender === "visitor"
                          ? "ml-auto rounded-br-sm bg-primary text-primary-foreground"
                          : "mr-auto rounded-bl-sm border border-border bg-card text-foreground shadow-sm"
                      }`}
                    >
                      {m.body}
                      <time className={`mt-1 block text-[10px] ${m.sender === "visitor" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {new Date(m.created_at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                      </time>
                    </div>
                  ))}
                </div>
                <footer className="shrink-0 border-t border-border bg-card p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4">
                  <form onSubmit={handleSend} className="flex items-center gap-2">
                    <Input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Type a message…"
                      aria-label="Type a message"
                      autoComplete="off"
                      className="h-12 min-w-0 rounded-full bg-background px-4 text-base"
                    />
                    <Button
                      type="submit"
                      disabled={busy || !draft.trim()}
                      aria-label="Send message"
                      size="icon"
                      className="h-12 w-12 shrink-0 rounded-full"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                  {error ? <p role="alert" className="px-2 pt-2 text-sm text-destructive">{error}</p> : null}
                </footer>
              </>
            )}
          </section>
        </>
      )}
    </>
  );
}
