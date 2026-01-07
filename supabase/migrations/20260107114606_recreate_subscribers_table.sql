/*
  # Recreate Subscribers Table

  1. New Tables
    - `subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `referral_code` (text, unique)
      - `referred_by` (text, nullable)
      - `referral_count` (integer, default 0)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Allow anonymous inserts for email signup
    - Allow anonymous selects for referral lookup
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  referral_code text UNIQUE NOT NULL,
  referred_by text,
  referral_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous insert" ON subscribers;
CREATE POLICY "Allow anonymous insert"
  ON subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow select by email" ON subscribers;
CREATE POLICY "Allow select by email"
  ON subscribers
  FOR SELECT
  TO anon
  USING (true);

DROP POLICY IF EXISTS "Allow update referral count" ON subscribers;
CREATE POLICY "Allow update referral count"
  ON subscribers
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

GRANT SELECT, INSERT, UPDATE ON subscribers TO anon;
GRANT SELECT, INSERT, UPDATE ON subscribers TO authenticated;

NOTIFY pgrst, 'reload schema';
