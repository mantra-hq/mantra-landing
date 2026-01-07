/*
  # Fix Security Issues
  
  1. Indexes
    - Drop redundant index `idx_subscribers_referral_code` (UNIQUE constraint already creates index)
    - Drop unused index `idx_subscribers_referred_by` (not actively queried)
  
  2. Function Security
    - Fix `increment_referral_count` function to have immutable search_path
    - Prevents search_path hijacking attacks
  
  ## Changes Made
  - Removed 2 unused indexes to reduce maintenance overhead
  - Added `SET search_path = public` to trigger function for security hardening
*/

-- Drop redundant indexes
DROP INDEX IF EXISTS public.idx_subscribers_referral_code;
DROP INDEX IF EXISTS public.idx_subscribers_referred_by;

-- Recreate the increment_referral_count function with secure search_path
CREATE OR REPLACE FUNCTION public.increment_referral_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE public.subscribers
    SET referral_count = referral_count + 1
    WHERE referral_code = NEW.referred_by;
  END IF;
  RETURN NEW;
END;
$$;