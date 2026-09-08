create type public.app_role as enum ('admin', 'moderator', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users can read their own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.update_updated_at_column()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

create table public.chat_conversations (
  id uuid primary key default gen_random_uuid(),
  visitor_token uuid not null unique default gen_random_uuid(),
  visitor_name text,
  visitor_email text,
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant all on public.chat_conversations to service_role;
grant select, update on public.chat_conversations to authenticated;
alter table public.chat_conversations enable row level security;
create policy "Admins can view conversations" on public.chat_conversations for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update conversations" on public.chat_conversations for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger update_chat_conversations_updated_at before update on public.chat_conversations for each row execute function public.update_updated_at_column();

create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.chat_conversations(id) on delete cascade,
  sender text not null check (sender in ('visitor','admin')),
  body text not null,
  read_by_admin boolean not null default false,
  created_at timestamptz not null default now()
);
create index chat_messages_conversation_idx on public.chat_messages (conversation_id, created_at);
grant all on public.chat_messages to service_role;
grant select, insert on public.chat_messages to authenticated;
alter table public.chat_messages enable row level security;
create policy "Admins can view messages" on public.chat_messages for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can send messages" on public.chat_messages for insert to authenticated with check (public.has_role(auth.uid(), 'admin') and sender = 'admin');