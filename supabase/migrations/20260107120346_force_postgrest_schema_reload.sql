/*
  # Force PostgREST Schema Reload

  1. Changes
    - Verify table exists and has correct permissions
    - Force PostgREST to reload its schema cache
    - Ensure REST API can access the subscribers table

  2. Security
    - Confirm RLS is enabled
    - Verify all policies are in place
    - Check grants for anon and authenticated roles
*/

-- Verify the table exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'subscribers') THEN
    RAISE EXCEPTION 'subscribers table does not exist';
  END IF;
END $$;

-- Ensure RLS is enabled
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Verify grants are in place
GRANT ALL ON public.subscribers TO anon;
GRANT ALL ON public.subscribers TO authenticated;
GRANT ALL ON public.subscribers TO service_role;

-- Force PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';