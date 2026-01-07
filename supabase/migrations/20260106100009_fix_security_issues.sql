/*
  # Fix Security Issues

  1. RLS Policy Performance
    - Replace direct current_setting() call with (select current_setting())
    - This prevents re-evaluation for each row and improves query performance

  2. Unused Indexes
    - Drop idx_subscribers_referral_code (unused)
    - Drop idx_subscribers_referred_by (unused)
    - Note: referral_code already has unique constraint which creates an index

  3. Function Security
    - Fix increment_referral_count() search_path mutability
    - Add SET search_path = '' for immutable search path
*/

DROP POLICY IF EXISTS "Subscribers can read own data by referral code" ON subscribers;

CREATE POLICY "Subscribers can read own data by referral code"
  ON subscribers
  FOR SELECT
  TO anon
  USING (referral_code = (select current_setting('request.headers', true)::json->>'x-referral-code'));

DROP INDEX IF EXISTS idx_subscribers_referral_code;
DROP INDEX IF EXISTS idx_subscribers_referred_by;

CREATE OR REPLACE FUNCTION increment_referral_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE subscribers
    SET referral_count = referral_count + 1
    WHERE referral_code = NEW.referred_by;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';
