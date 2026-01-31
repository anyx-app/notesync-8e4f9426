# NoteSync Schema Plan

## Overview
NoteSync requires a relational schema to handle users, their folders, notes, and tags. The focus is on a hierarchical structure (Folders -> Notes) with flexible tagging (Notes <-> Tags).

## Tables

### 1. `profiles`
- **Description**: Stores public user profile data. Links to Supabase Auth.
- **Columns**:
  - `id` (uuid, PK, FK -> auth.users.id)
  - `email` (text, unique)
  - `full_name` (text, nullable)
  - `avatar_url` (text, nullable)
  - `updated_at` (timestamptz)
- **RLS**: Users can only read/update their own profile.

### 2. `folders`
- **Description**: Hierarchical organization for notes.
- **Columns**:
  - `id` (uuid, PK, default: gen_random_uuid())
  - `user_id` (uuid, FK -> profiles.id, not null)
  - `name` (text, not null)
  - `parent_id` (uuid, FK -> folders.id, nullable) - *Self-referencing for nesting*
  - `created_at` (timestamptz, default: now())
  - `updated_at` (timestamptz, default: now())
- **RLS**: Users can only CRUD their own folders.

### 3. `notes`
- **Description**: The core content unit.
- **Columns**:
  - `id` (uuid, PK, default: gen_random_uuid())
  - `user_id` (uuid, FK -> profiles.id, not null)
  - `folder_id` (uuid, FK -> folders.id, nullable) - *Can be root level if null*
  - `title` (text, not null, default: 'Untitled')
  - `content` (jsonb, nullable) - *Rich text content (e.g. TipTap JSON)*
  - `is_favorite` (boolean, default: false)
  - `is_trashed` (boolean, default: false)
  - `created_at` (timestamptz, default: now())
  - `updated_at` (timestamptz, default: now())
- **Indexes**: `user_id`, `folder_id`, `title` (for search)
- **RLS**: Users can only CRUD their own notes.

### 4. `tags`
- **Description**: Labels for flexible organization.
- **Columns**:
  - `id` (uuid, PK, default: gen_random_uuid())
  - `user_id` (uuid, FK -> profiles.id, not null)
  - `name` (text, not null)
  - `color` (text, nullable)
  - `created_at` (timestamptz, default: now())
- **RLS**: Users can only CRUD their own tags.

### 5. `note_tags`
- **Description**: Many-to-many relationship between Notes and Tags.
- **Columns**:
  - `note_id` (uuid, FK -> notes.id, not null)
  - `tag_id` (uuid, FK -> tags.id, not null)
  - **PK**: (note_id, tag_id)
- **RLS**: Inherited from parent tables via user_id check on join or explicit policies.

## Relationships
- `profiles` (1) -> (Many) `folders`
- `profiles` (1) -> (Many) `notes`
- `profiles` (1) -> (Many) `tags`
- `folders` (1) -> (Many) `notes`
- `folders` (1) -> (Many) `folders` (Children)
- `notes` (Many) <-> (Many) `tags` (via `note_tags`)

## Functions & Triggers
- `handle_new_user`: Trigger on `auth.users` creation to insert a row into `public.profiles`.
- `update_updated_at`: Trigger to auto-update `updated_at` columns.
