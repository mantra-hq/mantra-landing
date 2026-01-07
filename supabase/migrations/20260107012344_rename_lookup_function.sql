/*
  # Rename Email Lookup Function

  1. Changes
    - Create function with correct name: get_referral_stats_by_email
    - Drop old function: get_subscriber_stats_by_email
    
  2. Security
    - Function uses SECURITY DEFINER to bypass RLS
    - Accessible to anonymous users for public stats lookup
*/

DROP FUNCTION IF EXISTS get_subscriber_stats_by_email(text);

CREATE OR REPLACE FUNCTION get_referral_stats_by_email(p_email text)
RETURNS TABLE (
  email text,
  referral_code text,
  referral_count integer,
  created_at timestamptz
) AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

GRANT EXECUTE ON FUNCTION get_referral_stats_by_email(text) TO anon;