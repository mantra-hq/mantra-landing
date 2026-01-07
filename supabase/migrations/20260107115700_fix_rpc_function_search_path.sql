/*
  # Fix RPC Function Search Path Issue

  1. Changes
    - Recreate get_referral_stats_by_email function with proper search_path
    - Use search_path = 'public' instead of empty string to ensure table is found

  2. Notes
    - SET search_path = '' causes "relation does not exist" errors
    - Setting search_path to 'public' allows the function to find the subscribers table
*/

DROP FUNCTION IF EXISTS get_referral_stats_by_email(text);

CREATE OR REPLACE FUNCTION get_referral_stats_by_email(p_email text)
RETURNS TABLE (
  email text,
  referral_code text,
  referral_count integer,
  created_at timestamptz
) 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.email,
    s.referral_code,
    s.referral_count,
    s.created_at
  FROM subscribers s
  WHERE s.email = p_email;
END;
$$;

GRANT EXECUTE ON FUNCTION get_referral_stats_by_email(text) TO anon;
GRANT EXECUTE ON FUNCTION get_referral_stats_by_email(text) TO authenticated;