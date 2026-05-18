-- Listing features: amenities/attributes that can filter listings.
-- One row per (listing, feature). feature_slug + feature_name kept
-- inline per project spec — no separate features lookup table.

create table if not exists public.listing_features (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  feature_slug text not null,
  feature_name text not null,
  created_at timestamptz not null default now(),
  unique (listing_id, feature_slug)
);

create index if not exists listing_features_listing_id_idx
  on public.listing_features (listing_id);
create index if not exists listing_features_feature_slug_idx
  on public.listing_features (feature_slug);

alter table public.listing_features enable row level security;

-- Public read; writes restricted to service_role.
drop policy if exists "listing_features public read"
  on public.listing_features;
create policy "listing_features public read"
  on public.listing_features
  for select
  using (true);

-- Reference list of supported features (also used by the filter UI).
-- Inserted as comment for documentation; no rows are required to start.
--   kid-friendly             Kid friendly
--   dog-friendly             Dog friendly
--   outdoor-seating          Outdoor seating
--   wheelchair-accessible    Wheelchair accessible
--   free-parking             Free parking
--   wifi                     Wi-Fi
--   takeout                  Takeout
--   delivery                 Delivery
--   reservations-required    Reservations required
