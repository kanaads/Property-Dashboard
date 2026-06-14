-- Propvia Property Dashboard — PostgreSQL schema (Phase 3)
-- Run in the Supabase SQL editor to provision the database.

create extension if not exists "pgcrypto";

create table if not exists public.properties (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  title               text    not null check (char_length(title) >= 5),
  description         text    not null,
  price               numeric not null check (price > 0),
  location            text    not null,
  property_type       text    not null,
  bedrooms            integer not null check (bedrooms >= 0),
  bathrooms           numeric not null check (bathrooms >= 0),
  square_feet         integer not null check (square_feet > 0),
  image_url           text    not null,
  -- Domain-specific column: signals product awareness (uncover hidden value).
  latent_value_score  integer not null check (latent_value_score between 1 and 100)
);

-- Row Level Security (Phase 7 — security architecture).
alter table public.properties enable row level security;

-- Demo policies: public read + insert via the anon key. Tighten for production.
create policy "Public read access"
  on public.properties for select
  using (true);

create policy "Public insert access"
  on public.properties for insert
  with check (true);
