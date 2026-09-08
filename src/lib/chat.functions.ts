import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type ChatMessage = {
  id: string;
  sender: string;
  body: string;
  created_at: string;
};

/** Visitor starts (or resumes) a chat. Returns the private visitor token. */
export const startChat = createServerFn({ method: "POST" })
  .inputValidator((input: { name?: string; email?: string; token?: string }) => ({
    name: (input.name ?? "").slice(0, 80),
    email: (input.email ?? "").slice(0, 120),
    token: input.token && UUID_RE.test(input.token) ? input.token : undefined,
  }))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    if (data.token) {
      const { data: existing } = await supabaseAdmin
        .from("chat_conversations")
        .select("id, visitor_token")
        .eq("visitor_token", data.token)
        .maybeSingle();
      if (existing) return { token: existing.visitor_token as string };
    }

    const { data: created, error } = await supabaseAdmin
      .from("chat_conversations")
      .insert({ visitor_name: data.name || null, visitor_email: data.email || null })
      .select("visitor_token")
      .single();
    if (error) throw new Error("Could not start the chat");
    return { token: created.visitor_token as string };
  });

export const sendVisitorMessage = createServerFn({ method: "POST" })
  .inputValidator((input: { token: string; body: string }) => {
    if (!UUID_RE.test(input.token)) throw new Error("Invalid chat session");
    const body = input.body.trim().slice(0, 4000);
    if (!body) throw new Error("Message is empty");
    return { token: input.token, body };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: convo } = await supabaseAdmin
      .from("chat_conversations")
      .select("id")
      .eq("visitor_token", data.token)
      .maybeSingle();
    if (!convo) throw new Error("Chat session not found");

    const { error } = await supabaseAdmin
      .from("chat_messages")
      .insert({ conversation_id: convo.id, sender: "visitor", body: data.body });
    if (error) throw new Error("Could not send the message");

    await supabaseAdmin
      .from("chat_conversations")
      .update({ last_message_at: new Date().toISOString() })
      .eq("id", convo.id);
    return { ok: true };
  });

export const getVisitorMessages = createServerFn({ method: "POST" })
  .inputValidator((input: { token: string }) => {
    if (!UUID_RE.test(input.token)) throw new Error("Invalid chat session");
    return { token: input.token };
  })
  .handler(async ({ data }): Promise<ChatMessage[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: convo } = await supabaseAdmin
      .from("chat_conversations")
      .select("id")
      .eq("visitor_token", data.token)
      .maybeSingle();
    if (!convo) return [];
    const { data: rows } = await supabaseAdmin
      .from("chat_messages")
      .select("id, sender, body, created_at")
      .eq("conversation_id", convo.id)
      .order("created_at", { ascending: true });
    return (rows ?? []) as ChatMessage[];
  });

/* ---------------- admin ---------------- */

export const listConversations = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("chat_conversations")
      .select("id, visitor_name, visitor_email, last_message_at, created_at")
      .order("last_message_at", { ascending: false })
      .limit(100);
    if (error) throw new Error("Not allowed");
    return data ?? [];
  });

export const getConversationMessages = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { conversationId: string }) => {
    if (!UUID_RE.test(input.conversationId)) throw new Error("Invalid conversation");
    return input;
  })
  .handler(async ({ data, context }): Promise<ChatMessage[]> => {
    const { data: rows, error } = await context.supabase
      .from("chat_messages")
      .select("id, sender, body, created_at")
      .eq("conversation_id", data.conversationId)
      .order("created_at", { ascending: true });
    if (error) throw new Error("Not allowed");
    return (rows ?? []) as ChatMessage[];
  });

export const sendAdminMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { conversationId: string; body: string }) => {
    if (!UUID_RE.test(input.conversationId)) throw new Error("Invalid conversation");
    const body = input.body.trim().slice(0, 4000);
    if (!body) throw new Error("Message is empty");
    return { conversationId: input.conversationId, body };
  })
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("chat_messages")
      .insert({ conversation_id: data.conversationId, sender: "admin", body: data.body });
    if (error) throw new Error("Not allowed");
    await context.supabase
      .from("chat_conversations")
      .update({ last_message_at: new Date().toISOString() })
      .eq("id", data.conversationId);
    return { ok: true };
  });

export const isCurrentUserAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: Boolean(data) };
  });
