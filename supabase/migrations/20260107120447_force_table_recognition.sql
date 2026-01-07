/*
  # Force Table Recognition by PostgREST

  1. Changes
    - Add comment to table to trigger schema change detection
    - Revoke and re-grant permissions to force cache invalidation
    - Send multiple reload signals to PostgREST

  2. Notes
    - Sometimes PostgREST needs explicit cache invalidation
    - Adding metadata changes can trigger recognition
*/

-- Add a comment to trigger change detection
COMMENT ON TABLE public.subscribers IS 'Email subscribers with referral tracking';

-- Revoke and re-grant to force cache invalidation
REVOKE ALL ON public.subscribers FROM authenticator;
GRANT ALL ON public.subscribers TO authenticator;

REVOKE ALL ON public.subscribers FROM anon;
GRANT ALL ON public.subscribers TO anon;

REVOKE ALL ON public.subscribers FROM authenticated;
GRANT ALL ON public.subscribers TO authenticated;

-- Ensure schema usage is granted
GRANT USAGE ON SCHEMA public TO authenticator;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Multiple reload signals
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';
NOTIFY pgrst;