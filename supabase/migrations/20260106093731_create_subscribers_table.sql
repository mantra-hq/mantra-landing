/*
  # Create Subscribers Table for Mantra Launch

  1. New Tables
    - `subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null) - subscriber email
      - `referral_code` (text, unique) - unique code for referral tracking
      - `referred_by` (text, nullable) - referral code of the user who referred them
      - `referral_count` (integer, default 0) - number of successful referrals
      - `created_at` (timestamptz) - signup timestamp
      - `ip_hash` (text, nullable) - hashed IP for spam prevention

  2. Security
    - Enable RLS on `subscribers` table
    - Add policy for inserting new subscribers (public access for signup)
    - Add policy for reading own data by referral_code

  3. Indexes
    - Index on referral_code for fast lookups
    - Index on referred_by for counting referrals
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  referral_code text UNIQUE NOT NULL,
  referred_by text,
  referral_count integer DEFAULT 0 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  ip_hash text
);

CREATE INDEX IF NOT EXISTS idx_subscribers_referral_code ON subscribers(referral_code);
CREATE INDEX IF NOT EXISTS idx_subscribers_referred_by ON subscribers(referred_by);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Subscribers can read own data by referral code"
  ON subscribers
  FOR SELECT
  TO anon
  USING (referral_code = current_setting('request.headers', true)::json->>'x-referral-code');

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
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_new_subscriber ON subscribers;
CREATE TRIGGER on_new_subscriber
  AFTER INSERT ON subscribers
  FOR EACH ROW
  EXECUTE FUNCTION increment_referral_count();