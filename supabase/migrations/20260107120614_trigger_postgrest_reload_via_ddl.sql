/*
  # Trigger PostgREST Reload via DDL Event

  1. Changes
    - Modify table comment to trigger DDL event
    - This will fire the pgrst_ddl_watch event trigger
    - Event trigger automatically sends NOTIFY pgrst, 'reload schema'

  2. Notes
    - Event triggers should automatically notify PostgREST
    - This is a more reliable way than manual NOTIFY
*/

-- Update comment to trigger DDL event (which fires pgrst_ddl_watch)
COMMENT ON TABLE public.subscribers IS 'Email subscribers with referral tracking - Updated to trigger PostgREST reload';

-- Also update a column comment
COMMENT ON COLUMN public.subscribers.email IS 'Subscriber email address';