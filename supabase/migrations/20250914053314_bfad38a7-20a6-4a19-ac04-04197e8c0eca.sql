-- Fix security warnings by setting search_path for all functions

-- Fix function search path security warnings
ALTER FUNCTION public.validate_retreat_dates() SET search_path = public;
ALTER FUNCTION public.trigger_progress_calculation() SET search_path = public;
ALTER FUNCTION public.update_retreat_engagement() SET search_path = public;

-- Update the calculate_retreat_progress function to have proper search_path
CREATE OR REPLACE FUNCTION public.calculate_retreat_progress(p_user_retreat_id uuid)
RETURNS numeric 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  total_activities integer;
  completed_activities integer;
  progress_percentage numeric;
BEGIN
  -- Get total activities for this retreat
  SELECT COUNT(*) INTO total_activities
  FROM retreat_activities ra
  JOIN user_retreats ur ON ur.retreat_id = ra.retreat_id
  WHERE ur.id = p_user_retreat_id;
  
  -- Get completed activities
  SELECT COUNT(*) INTO completed_activities
  FROM retreat_progress rp
  WHERE rp.user_retreat_id = p_user_retreat_id 
  AND rp.status = 'completed';
  
  -- Calculate percentage
  IF total_activities > 0 THEN
    progress_percentage := ROUND((completed_activities::numeric / total_activities::numeric) * 100, 2);
  ELSE
    progress_percentage := 0;
  END IF;
  
  -- Update user_retreats table
  UPDATE user_retreats 
  SET completion_percentage = progress_percentage,
      updated_at = now()
  WHERE id = p_user_retreat_id;
  
  RETURN progress_percentage;
END;
$$;