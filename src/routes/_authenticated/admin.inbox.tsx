import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  getConversationMessages,
  isCurrentUserAdmin,
  listConversations,
  sendAdminMessage,
} from "@/lib/chat.functions";

export const Route = createFileRoute("/_authenticated/admin/inbox")({
  component: Inbox,
  head: () => ({
    meta: [
      { title: "Chat Inbox | Heseven" },
      { name: "description", content: "Private Heseven inbox for live chat conversations." },
      { property: "og:title", content: "Chat Inbox | Heseven" },
      { property: "og:description", content: "Private Heseven inbox for live chat conversations." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Inbox() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const checkAdmin = useServerFn(isCurrentUserAdmin);
  const fetchConversations = useServerFn(listConversations);
  const fetchMessages = useServerFn(getConversationMessages);
  const reply = useServerFn(sendAdminMessage);

  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);

  const adminQuery = useQuery({ queryKey: ["is-admin"], queryFn: () => checkAdmin({ data: undefined }) });
  const isAdmin = adminQuery.data?.isAdmin === true;

  const conversations = useQuery({
    queryKey: ["conversations"],
    queryFn: () => fetchConversations({ data: undefined }),
    enabled: isAdmin,
    refetchInterval: 8000,
  });

  const messages = useQuery({
    queryKey: ["conversation", selected],
    queryFn: () => fetchMessages({ data: { conversationId: selected! } }),
    enabled: Boolean(selected) && isAdmin,
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (!selected && conversations.data && conversations.data.length > 0) {
      setSelected(conversations.data[0]!.id);
    }
  }, [conversations.data, selected]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !draft.trim()) return;
    const body = draft.trim();
    setDraft("");
    setError(null);
    try {
      await reply({ data: { conversationId: selected, body } });
      await queryClient.invalidateQueries({ queryKey: ["conversation", selected] });
    } catch {
      setError("Reply not sent.");
    }
  };

  if (adminQuery.isLoading) {
    return <p className="p-8 text-sm text-muted-foreground">Loading...</p>;
  }

  if (!isAdmin) {
    return (
      <main className="mx-auto max-w-lg p-8">
        <div className="panel p-6">
          <h1 className="text-xl font-bold text-brand-ink">No access</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This account is signed in but is not marked as a team admin yet.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1200px] p-4 lg:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-ink">Chat inbox</h1>
        <button
          type="button"
          className="rounded-full border border-border px-4 py-2 text-sm"
          onClick={async () => {
            await supabase.auth.signOut();
            queryClient.clear();
            await navigate({ to: "/auth" });
          }}
        >
          Sign out
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <div className="panel max-h-[70vh] overflow-y-auto p-2">
          {(conversations.data ?? []).length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">No conversations yet.</p>
          ) : null}
          {(conversations.data ?? []).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c.id)}
              className={`block w-full rounded-xl px-3 py-2.5 text-left text-sm ${
                selected === c.id ? "bg-secondary text-primary" : "hover:bg-secondary/60"
              }`}
            >
              <span className="block font-semibold text-brand-ink">{c.visitor_name || "Visitor"}</span>
              <span className="block text-xs text-muted-foreground">{c.visitor_email}</span>
              <span className="block text-[11px] text-muted-foreground">
                {new Date(c.last_message_at).toLocaleString()}
              </span>
            </button>
          ))}
        </div>

        <div className="panel flex max-h-[70vh] flex-col p-0">
          <div className="flex-1 space-y-2 overflow-y-auto p-4">
            {(messages.data ?? []).map((m) => (
              <div
                key={m.id}
                className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${
                  m.sender === "admin"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "mr-auto border border-border bg-card text-brand-ink"
                }`}
              >
                {m.body}
              </div>
            ))}
            {selected && (messages.data ?? []).length === 0 ? (
              <p className="text-sm text-muted-foreground">No messages in this conversation.</p>
            ) : null}
          </div>
          <form onSubmit={send} className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a reply"
              className="w-full rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary"
            />
            <button type="submit" className="btn-cta rounded-full px-5 py-2 text-sm font-semibold">
              Send
            </button>
          </form>
          {error ? <p className="px-4 pb-3 text-xs text-destructive">{error}</p> : null}
        </div>
      </div>
    </main>
  );
}
