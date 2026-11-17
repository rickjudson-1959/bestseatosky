-- Contact form messages. Apply this in the Supabase SQL editor.
-- The app does not run it.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  email_sent boolean not null default false
);

alter table public.contact_messages enable row level security;

-- New public tables inherit grants for anon and authenticated, including
-- select and truncate. RLS does not cover truncate, so take the grants back.
revoke all on table public.contact_messages from anon, authenticated;

-- The contact route uses the public anon client in src/lib/supabase.ts,
-- the same client subscribe and get-listed use. It does not use the
-- service role key. service_role bypasses RLS and keeps full access.
-- anon can insert a row and later mark that row sent. It cannot read
-- name, email, subject, or message, and authenticated has no grants.
grant insert on table public.contact_messages to anon;
grant select (id, email_sent) on table public.contact_messages to anon;
grant update (email_sent) on table public.contact_messages to anon;
grant all on table public.contact_messages to service_role;

drop policy if exists "Allow anonymous insert" on public.contact_messages;
create policy "Allow anonymous insert"
  on public.contact_messages
  for insert
  to anon
  with check (email_sent = false);

drop policy if exists "Allow anonymous read send flag" on public.contact_messages;
create policy "Allow anonymous read send flag"
  on public.contact_messages
  for select
  to anon
  using (true);

drop policy if exists "Allow anonymous mark sent" on public.contact_messages;
create policy "Allow anonymous mark sent"
  on public.contact_messages
  for update
  to anon
  using (email_sent = false)
  with check (email_sent = true);
