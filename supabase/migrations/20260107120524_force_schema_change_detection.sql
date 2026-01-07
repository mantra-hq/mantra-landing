/*
  # Force Schema Change Detection

  1. Changes
    - Add and immediately remove a temporary column to force schema change
    - This should trigger PostgREST to reload the table definition
    - Re-grant all permissions after the change

  2. Notes
    - PostgREST caches schema and sometimes needs a structural change to reload
    - This is a workaround for stubborn cache issues
*/

-- Add a temporary column
ALTER TABLE public.subscribers ADD COLUMN IF NOT EXISTS _temp_reload_trigger boolean DEFAULT false;

-- Remove it immediately
ALTER TABLE public.subscribers DROP COLUMN IF EXISTS _temp_reload_trigger;

-- Re-grant permissions to ensure they're fresh
GRANT ALL ON public.subscribers TO authenticator;
GRANT ALL ON public.subscribers TO anon;
GRANT ALL ON public.subscribers TO authenticated;
GRANT ALL ON public.subscribers TO service_role;

-- Update table stats
ANALYZE public.subscribers;

-- Multiple reload notifications
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';