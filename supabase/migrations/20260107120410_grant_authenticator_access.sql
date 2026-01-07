/*
  # Grant Authenticator Role Access

  1. Changes
    - Grant USAGE on public schema to authenticator role
    - Grant access to subscribers table to authenticator role
    - Ensure PostgREST can access the table through the authenticator role

  2. Security
    - Authenticator role is the connection role used by PostgREST
    - It switches to anon or authenticated based on JWT
    - RLS policies still apply for actual data access
*/

-- Grant schema usage to authenticator
GRANT USAGE ON SCHEMA public TO authenticator;

-- Grant table access to authenticator
GRANT ALL ON public.subscribers TO authenticator;

-- Grant sequence access if needed
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticator;

-- Ensure anon and authenticated are members of the right groups
-- (This is usually already set up by Supabase, but let's be explicit)
GRANT anon TO authenticator;
GRANT authenticated TO authenticator;

-- Force PostgREST to reload
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';