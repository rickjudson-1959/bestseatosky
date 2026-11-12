-- CASL consent evidence for newsletter signups.
-- Additive and nullable. Existing rows stay null. No backfill and no drops.
-- Apply in the Supabase SQL editor. This file does not run by itself.

alter table public.subscribers
  add column if not exists consent_text text,
  add column if not exists consent_version text,
  add column if not exists source_url text,
  add column if not exists ip text,
  add column if not exists user_agent text,
  add column if not exists consent_at timestamptz;
