/*
  # Fix Function Schema Qualification

  1. Changes
    - Recreate get_referral_stats_by_email with fully qualified table name
    - Ensure function works correctly with PostgREST
    - Add schema reload notification

  2. Notes
    - Use public.subscribers to fully qualify the table
    - Ensure proper SECURITY DEFINER context
*/

DROP FUNCTION IF EXISTS public.get_referral_stats_by_email(text);

CREATE OR REPLACE FUNCTION public.get_referral_stats_by_email(p_email text)
RETURNS TABLE (
  email text,
  referral_code text,
  referral_count integer,
  created_at timestamptz
) 
LANGUAGE plpgsql 
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.email,
    s.referral_code,
    s.referral_count,
    s.created_at
  FROM public.subscribers s
  WHERE s.email = p_email;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_referral_stats_by_email(text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_referral_stats_by_email(text) TO authenticated;

NOTIFY pgrst, 'reload schema';