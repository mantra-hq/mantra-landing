/*
  # Force PostgREST Cache Refresh
  
  Adding a timestamp comment to force PostgREST to detect schema changes
  and refresh its internal cache.
*/

COMMENT ON TABLE public.subscribers IS 'Email subscribers - cache refresh at 2026-01-07T20:15:00Z';

SELECT pg_notify('pgrst', 'reload schema');