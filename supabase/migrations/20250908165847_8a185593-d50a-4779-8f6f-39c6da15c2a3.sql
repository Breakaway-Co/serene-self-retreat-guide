-- Fix function security warning by setting search_path
ALTER FUNCTION public.update_queue_statistics() SET search_path = public;