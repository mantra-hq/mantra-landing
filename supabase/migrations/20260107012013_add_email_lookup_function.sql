/*
  # Add Email Lookup Function for Referral Stats

  1. New Functions
    - `get_referral_stats_by_email(email text)`
      - Allows users to look up their referral statistics by email
      - Returns: email, referral_code, referral_count, created_at
      - Secure function that only returns data for the provided email

  2. Security
    - Function uses SECURITY DEFINER to bypass RLS
    - Only returns data for the exact email provided
    - Rate limiting should be handled at application level
*/

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
  FROM subscribers s
  WHERE s.email = p_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

GRANT EXECUTE ON FUNCTION get_referral_stats_by_email(text) TO anon;