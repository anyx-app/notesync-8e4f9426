-- Create profiles table
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamptz default now(),
  primary key (id),
  constraint username_length check (char_length(full_name) >= 3)
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Create folders table
create table public.folders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  parent_id uuid references public.folders(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.folders enable row level security;

create policy "Users can view own folders"
  on public.folders for select
  using ( auth.uid() = user_id );

create policy "Users can insert own folders"
  on public.folders for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own folders"
  on public.folders for update
  using ( auth.uid() = user_id );

create policy "Users can delete own folders"
  on public.folders for delete
  using ( auth.uid() = user_id );

-- Create notes table
create table public.notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  folder_id uuid references public.folders(id) on delete set null,
  title text not null default 'Untitled',
  content jsonb,
  is_favorite boolean default false,
  is_trashed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.notes enable row level security;

create policy "Users can view own notes"
  on public.notes for select
  using ( auth.uid() = user_id );

create policy "Users can insert own notes"
  on public.notes for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own notes"
  on public.notes for update
  using ( auth.uid() = user_id );

create policy "Users can delete own notes"
  on public.notes for delete
  using ( auth.uid() = user_id );

-- Create tags table
create table public.tags (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  color text,
  created_at timestamptz default now()
);

alter table public.tags enable row level security;

create policy "Users can view own tags"
  on public.tags for select
  using ( auth.uid() = user_id );

create policy "Users can insert own tags"
  on public.tags for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own tags"
  on public.tags for update
  using ( auth.uid() = user_id );

create policy "Users can delete own tags"
  on public.tags for delete
  using ( auth.uid() = user_id );

-- Create note_tags table (junction)
create table public.note_tags (
  note_id uuid references public.notes(id) on delete cascade not null,
  tag_id uuid references public.tags(id) on delete cascade not null,
  primary key (note_id, tag_id)
);

alter table public.note_tags enable row level security;

create policy "Users can view own note_tags"
  on public.note_tags for select
  using ( exists (select 1 from public.notes where id = note_tags.note_id and user_id = auth.uid()) );

create policy "Users can insert own note_tags"
  on public.note_tags for insert
  with check ( exists (select 1 from public.notes where id = note_tags.note_id and user_id = auth.uid()) );

create policy "Users can delete own note_tags"
  on public.note_tags for delete
  using ( exists (select 1 from public.notes where id = note_tags.note_id and user_id = auth.uid()) );


-- Trigger for new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger on_folders_updated
  before update on public.folders
  for each row execute procedure public.handle_updated_at();

create trigger on_notes_updated
  before update on public.notes
  for each row execute procedure public.handle_updated_at();
