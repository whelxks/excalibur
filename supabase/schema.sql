-- EVERY TOURIST · Supabase/Postgres backend
-- Run in a fresh Supabase project's SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'tourist' check (role in ('tourist','host','both')),
  name text not null default '',
  age int check (age is null or age >= 18),
  bio text not null default '',
  home_country text,
  languages text[] not null default '{}',
  interests text[] not null default '{}',
  avatar_url text,
  verification_status text not null default 'pending' check (verification_status in ('pending','verified','rejected')),
  crypto_public_key text,
  created_at timestamptz not null default now()
);

create table if not exists public.host_certifications (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references public.profiles(id) on delete cascade,
  certification_type text not null,
  document_path text,
  status text not null default 'pending' check (status in ('pending','verified','rejected')),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  blurb text not null,
  story text not null default '',
  country text not null,
  city text not null,
  neighbourhood text,
  category text not null,
  duration_minutes int not null check (duration_minutes between 30 and 1440),
  price_aud numeric(10,2) not null default 0 check (price_aud >= 0),
  max_pax int not null check (max_pax between 1 and 3),
  image_url text,
  status text not null default 'draft' check (status in ('draft','review','published','paused','archived')),
  starts_at timestamptz,
  meeting_area text,
  created_at timestamptz not null default now()
);

-- An activity can have one or multiple approved locals available to host it.
create table if not exists public.activity_hosts (
  activity_id uuid not null references public.activities(id) on delete cascade,
  host_id uuid not null references public.profiles(id) on delete cascade,
  approved boolean not null default false,
  capacity_override int check (capacity_override is null or capacity_override between 1 and 3),
  primary key (activity_id, host_id)
);

create table if not exists public.activity_requests (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references public.activities(id) on delete cascade,
  host_id uuid not null references public.profiles(id) on delete cascade,
  tourist_id uuid not null references public.profiles(id) on delete cascade,
  tourist_decision text not null default 'right' check (tourist_decision in ('right','left')),
  host_decision text not null default 'pending' check (host_decision in ('pending','accepted','rejected')),
  created_at timestamptz not null default now(),
  decided_at timestamptz,
  unique(activity_id,host_id,tourist_id)
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references public.activities(id) on delete cascade,
  host_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'forming' check (status in ('forming','confirmed','completed','cancelled')),
  created_at timestamptz not null default now(),
  unique(activity_id,host_id)
);

create table if not exists public.booking_members (
  booking_id uuid not null references public.bookings(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  member_role text not null check (member_role in ('host','tourist')),
  joined_at timestamptz not null default now(),
  primary key (booking_id,user_id)
);

create table if not exists public.chats (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Each member gets the same random group-chat key wrapped to that member's public key on-device.
-- Supabase stores only the encrypted envelope.
create table if not exists public.chat_key_envelopes (
  chat_id uuid not null references public.chats(id) on delete cascade,
  member_id uuid not null references public.profiles(id) on delete cascade,
  sender_public_key text not null,
  nonce text not null,
  wrapped_key text not null,
  created_at timestamptz not null default now(),
  primary key (chat_id,member_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null references public.chats(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  ciphertext text not null,
  nonce text not null,
  created_at timestamptz not null default now()
);
create index if not exists messages_chat_created_idx on public.messages(chat_id,created_at);

create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  description text not null default '',
  category text not null,
  art_url text
);

create table if not exists public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  activity_id uuid references public.activities(id) on delete set null,
  note text not null default '',
  photo_urls text[] not null default '{}',
  earned_at timestamptz not null default now(),
  unique(user_id,badge_id,activity_id)
);

-- Firefly cloud copy. The mobile app still keeps a local cache and can QR-sync without this table.
create table if not exists public.firefly_resources (
  id text primary key,
  name text not null,
  resource_type text not null check (resource_type in ('water','power','firstaid','toilet','shelter','connectivity')),
  latitude double precision,
  longitude double precision,
  status text not null check (status in ('available','limited','unavailable')),
  confidence numeric(4,3) not null default 0.5 check (confidence between 0 and 1),
  report_count int not null default 0,
  last_verified_at timestamptz not null default now(),
  source text not null default 'community'
);

create table if not exists public.firefly_reports (
  id uuid primary key default gen_random_uuid(),
  resource_id text not null references public.firefly_resources(id) on delete cascade,
  reporter_id uuid references public.profiles(id) on delete set null,
  status text not null check (status in ('available','limited','unavailable')),
  observed_at timestamptz not null default now(),
  source_device_id_hash text,
  created_at timestamptz not null default now()
);

-- Create a profile when a new Supabase Auth user is created.
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles(id,name) values(new.id,coalesce(new.raw_user_meta_data->>'name','')) on conflict do nothing;
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- When enough tourists have been accepted for one host/activity pairing,
-- automatically confirm a booking, add members, and create the group chat.
create or replace function public.finalize_group_if_full() returns trigger language plpgsql security definer set search_path=public as $$
declare
  accepted_count int;
  pax_limit int;
  booking_uuid uuid;
begin
  if new.host_decision <> 'accepted' then return new; end if;
  select coalesce(ah.capacity_override,a.max_pax) into pax_limit
    from public.activities a
    left join public.activity_hosts ah on ah.activity_id=a.id and ah.host_id=new.host_id
    where a.id=new.activity_id;
  select count(*) into accepted_count from public.activity_requests
    where activity_id=new.activity_id and host_id=new.host_id and tourist_decision='right' and host_decision='accepted';
  if accepted_count >= pax_limit then
    insert into public.bookings(activity_id,host_id,status) values(new.activity_id,new.host_id,'confirmed')
      on conflict(activity_id,host_id) do update set status='confirmed'
      returning id into booking_uuid;
    insert into public.booking_members(booking_id,user_id,member_role) values(booking_uuid,new.host_id,'host') on conflict do nothing;
    insert into public.booking_members(booking_id,user_id,member_role)
      select booking_uuid,tourist_id,'tourist' from public.activity_requests
      where activity_id=new.activity_id and host_id=new.host_id and tourist_decision='right' and host_decision='accepted'
      on conflict do nothing;
    insert into public.chats(booking_id) values(booking_uuid) on conflict(booking_id) do nothing;
  end if;
  return new;
end; $$;
drop trigger if exists activity_request_group_finalize on public.activity_requests;
create trigger activity_request_group_finalize after insert or update of host_decision on public.activity_requests
for each row execute procedure public.finalize_group_if_full();

-- View shaped close to the mobile discovery model.
create or replace view public.activities_view as
select a.id,a.title,a.country,a.city,a.neighbourhood,a.image_url as image,a.category,
       concat(round(a.duration_minutes/60.0,1),' hrs') as duration,a.price_aud as price,a.max_pax as "maxPax",
       coalesce((select count(*) from public.activity_requests ar where ar.activity_id=a.id and ar.host_decision='accepted'),0)::int as joined,
       a.blurb,a.story,a.status,
       coalesce((select jsonb_agg(jsonb_build_object('id',p.id,'name',p.name,'age',p.age,'image',p.avatar_url,'tagline',p.bio,'bio',p.bio,'languages',p.languages,'badges',array['ID VERIFIED'],'rating',5.0,'verified',p.verification_status='verified'))
         from public.activity_hosts ah join public.profiles p on p.id=ah.host_id where ah.activity_id=a.id and ah.approved=true),'[]'::jsonb) as hosts
from public.activities a;

-- RLS
alter table public.profiles enable row level security;
alter table public.host_certifications enable row level security;
alter table public.activities enable row level security;
alter table public.activity_hosts enable row level security;
alter table public.activity_requests enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_members enable row level security;
alter table public.chats enable row level security;
alter table public.chat_key_envelopes enable row level security;
alter table public.messages enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
alter table public.firefly_resources enable row level security;
alter table public.firefly_reports enable row level security;

create policy "public verified profiles" on public.profiles for select using (verification_status='verified' or auth.uid()=id);
create policy "profile self update" on public.profiles for update using (auth.uid()=id) with check (auth.uid()=id);
create policy "published activities readable" on public.activities for select using (status='published' or auth.uid()=created_by);
create policy "hosts manage own activities" on public.activities for all using (auth.uid()=created_by) with check (auth.uid()=created_by);
create policy "activity hosts readable" on public.activity_hosts for select using (approved=true or auth.uid()=host_id);
create policy "host links self" on public.activity_hosts for insert with check (auth.uid()=host_id);
create policy "request participants read" on public.activity_requests for select using (auth.uid()=tourist_id or auth.uid()=host_id);
create policy "tourist creates request" on public.activity_requests for insert with check (auth.uid()=tourist_id);
create policy "host decides request" on public.activity_requests for update using (auth.uid()=host_id) with check (auth.uid()=host_id);
create policy "members read bookings" on public.bookings for select using (exists(select 1 from public.booking_members bm where bm.booking_id=id and bm.user_id=auth.uid()));
create policy "members read booking membership" on public.booking_members for select using (exists(select 1 from public.booking_members mine where mine.booking_id=booking_id and mine.user_id=auth.uid()));
create policy "members read chats" on public.chats for select using (exists(select 1 from public.booking_members bm where bm.booking_id=booking_id and bm.user_id=auth.uid()));
create policy "member key envelope read" on public.chat_key_envelopes for select using (auth.uid()=member_id);
create policy "members create key envelopes" on public.chat_key_envelopes for insert with check (exists(select 1 from public.chats c join public.booking_members bm on bm.booking_id=c.booking_id where c.id=chat_id and bm.user_id=auth.uid()));
create policy "members read ciphertext" on public.messages for select using (exists(select 1 from public.chats c join public.booking_members bm on bm.booking_id=c.booking_id where c.id=chat_id and bm.user_id=auth.uid()));
create policy "members send ciphertext" on public.messages for insert with check (auth.uid()=sender_id and exists(select 1 from public.chats c join public.booking_members bm on bm.booking_id=c.booking_id where c.id=chat_id and bm.user_id=auth.uid()));
create policy "badges public read" on public.badges for select using (true);
create policy "own journal read" on public.user_badges for select using (auth.uid()=user_id);
create policy "own journal update" on public.user_badges for update using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "firefly resources public read" on public.firefly_resources for select using (true);
create policy "authenticated firefly reports" on public.firefly_reports for insert to authenticated with check (auth.uid()=reporter_id or reporter_id is null);

insert into public.badges(code,title,description,category) values
 ('AFTER_HOURS','After-hours Local','Completed a local night experience.','night'),
 ('HANDS_IN','Hands In','Made something with a local craftsperson.','craft'),
 ('LOCAL_TABLE','Local Table','Cooked or ate inside a local food tradition.','food'),
 ('FIRST_MATCH','First Local Match','Completed your first Every Tourist experience.','milestone')
on conflict(code) do nothing;
