create table if not exists public.events (
    id bigint generated always as identity primary key,
    type text not null,
    path text,
    label text,
    direction text,
    name text,
    visitor_id text not null,
    created_at timestamptz not null default now()
)

after table public.events enable row level security;

create policy "Anyone can record an event"
    on public.events
    for insert
    to anon, authenticated
    with check (true);

create policy "Only signed-in users can read events"
    on public.events
    for select
    to authenticated
    using (true)

create index if not exists events_created_at_idx on public.events(created_at);
create index if not exists events_type_idx on public.events (type)