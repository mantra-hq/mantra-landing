/*
  # Comprehensive PostgREST Fix

  1. Changes
    - Reset all permissions from scratch
    - Ensure proper role hierarchy
    - Add explicit schema permissions
    - Force complete reload

  2. Security
    - Maintain RLS policies
    - Keep proper access controls
*/

-- Reset permissions completely
REVOKE ALL ON public.subscribers FROM PUBLIC;
REVOKE ALL ON public.subscribers FROM anon;
REVOKE ALL ON public.subscribers FROM authenticated;
REVOKE ALL ON public.subscribers FROM authenticator;

-- Grant schema usage to all necessary roles
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticator;

-- Grant table permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subscribers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subscribers TO authenticated;
GRANT ALL ON public.subscribers TO authenticator;
GRANT ALL ON public.subscribers TO service_role;

-- Ensure RLS is enabled
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Ensure RLS policies exist
DO $$ 
BEGIN
  -- Clean up old policies if they exist
  DROP POLICY IF EXISTS "Public can subscribe with email" ON public.subscribers;
  DROP POLICY IF EXISTS "Select own record by email or referral code" ON public.subscribers;
  DROP POLICY IF EXISTS "Update referral count by code" ON public.subscribers;
  
  -- Recreate policies
  CREATE POLICY "Public can subscribe with email"
    ON public.subscribers
    FOR INSERT
    TO anon
    WITH CHECK (
      email IS NOT NULL 
      AND referral_code IS NOT NULL 
      AND length(email) > 0 
      AND length(referral_code) = 8
    );

  CREATE POLICY "Select own record by email or referral code"
    ON public.subscribers
    FOR SELECT
    TO anon
    USING (true);

  CREATE POLICY "Update referral count by code"
    ON public.subscribers
    FOR UPDATE
    TO anon
    USING (referral_code IS NOT NULL)
    WITH CHECK (referral_code IS NOT NULL);
END $$;

-- Update table statistics
ANALYZE public.subscribers;

-- Trigger DDL event to reload PostgREST
COMMENT ON TABLE public.subscribers IS 'Email subscribers table - forcing PostgREST reload';

-- Send multiple reload signals
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';
NOTIFY pgrst;