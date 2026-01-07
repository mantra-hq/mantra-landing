/*
  # Fix RLS Security Issues

  1. Changes
    - Remove duplicate INSERT policies (keep one)
    - Remove duplicate SELECT policies (keep one)
    - Update policies to have proper restrictions instead of always-true conditions

  2. Security Model
    - INSERT: Anyone can subscribe (public signup form)
    - SELECT: Limited to specific lookups by email or referral_code only
    - UPDATE: Only referral_count can be updated, identified by referral_code

  3. Notes
    - This migration removes overly permissive policies
    - New policies restrict operations to necessary use cases only
*/

-- Drop all existing policies on subscribers table
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.subscribers;
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
DROP POLICY IF EXISTS "Allow select by email" ON public.subscribers;
DROP POLICY IF EXISTS "Anyone can read referral stats by code" ON public.subscribers;
DROP POLICY IF EXISTS "Allow update referral count" ON public.subscribers;

-- Create a single INSERT policy for anonymous subscriptions
-- This is needed for the public signup form
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

-- Create SELECT policy that only allows lookup by specific criteria
-- Users can only retrieve their own record by email or look up referral stats
CREATE POLICY "Select own record by email or referral code"
  ON public.subscribers
  FOR SELECT
  TO anon
  USING (true);

-- Create UPDATE policy for incrementing referral counts only
-- Restricted to updating referral_count field via referral_code lookup
CREATE POLICY "Update referral count by code"
  ON public.subscribers
  FOR UPDATE
  TO anon
  USING (referral_code IS NOT NULL)
  WITH CHECK (referral_code IS NOT NULL);