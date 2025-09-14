-- Add missing foreign key relationships and automation triggers

-- 1. Add foreign key relationships that are missing
ALTER TABLE public.user_retreats 
ADD CONSTRAINT fk_user_retreats_retreat_id 
FOREIGN KEY (retreat_id) REFERENCES public.retreat_configurations(id) ON DELETE CASCADE;

ALTER TABLE public.retreat_activities 
ADD CONSTRAINT fk_retreat_activities_retreat_id 
FOREIGN KEY (retreat_id) REFERENCES public.retreat_configurations(id) ON DELETE CASCADE;

ALTER TABLE public.retreat_progress 
ADD CONSTRAINT fk_retreat_progress_user_retreat_id 
FOREIGN KEY (user_retreat_id) REFERENCES public.user_retreats(id) ON DELETE CASCADE;

ALTER TABLE public.retreat_progress 
ADD CONSTRAINT fk_retreat_progress_activity_id 
FOREIGN KEY (activity_id) REFERENCES public.retreat_activities(id) ON DELETE CASCADE;

ALTER TABLE public.daily_checkins 
ADD CONSTRAINT fk_daily_checkins_user_retreat_id 
FOREIGN KEY (user_retreat_id) REFERENCES public.user_retreats(id) ON DELETE CASCADE;

ALTER TABLE public.retreat_engagement 
ADD CONSTRAINT fk_retreat_engagement_user_retreat_id 
FOREIGN KEY (user_retreat_id) REFERENCES public.user_retreats(id) ON DELETE CASCADE;

ALTER TABLE public.intake_assessments 
ADD CONSTRAINT fk_intake_assessments_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.user_retreats 
ADD CONSTRAINT fk_user_retreats_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.user_retreats 
ADD CONSTRAINT fk_user_retreats_intake_id 
FOREIGN KEY (intake_assessment_id) REFERENCES public.intake_assessments(id) ON DELETE SET NULL;

-- 2. Add automated triggers for seamless progression

-- Trigger to automatically create retreat progress entries when user enrolls
CREATE OR REPLACE FUNCTION public.initialize_retreat_activities()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert progress entries for all activities in the retreat
  INSERT INTO public.retreat_progress (
    user_retreat_id, 
    day_number, 
    activity_id, 
    status
  )
  SELECT 
    NEW.id,
    ra.day_number,
    ra.id,
    'not_started'
  FROM public.retreat_activities ra
  WHERE ra.retreat_id = NEW.retreat_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_initialize_retreat_activities
  AFTER INSERT ON public.user_retreats
  FOR EACH ROW
  EXECUTE FUNCTION public.initialize_retreat_activities();

-- Trigger to automatically advance to next day when all activities completed
CREATE OR REPLACE FUNCTION public.check_day_completion()
RETURNS TRIGGER AS $$
DECLARE
  total_activities_for_day INTEGER;
  completed_activities_for_day INTEGER;
  current_day INTEGER;
BEGIN
  -- Only process if activity was just completed
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    
    -- Get the current day being worked on
    current_day := NEW.day_number;
    
    -- Count total activities for this day
    SELECT COUNT(*) INTO total_activities_for_day
    FROM public.retreat_progress rp
    WHERE rp.user_retreat_id = NEW.user_retreat_id 
      AND rp.day_number = current_day;
    
    -- Count completed activities for this day
    SELECT COUNT(*) INTO completed_activities_for_day
    FROM public.retreat_progress rp
    WHERE rp.user_retreat_id = NEW.user_retreat_id 
      AND rp.day_number = current_day
      AND rp.status = 'completed';
    
    -- If all activities for the day are completed, update user retreat status
    IF completed_activities_for_day = total_activities_for_day THEN
      UPDATE public.user_retreats 
      SET updated_at = now()
      WHERE id = NEW.user_retreat_id;
      
      -- Insert daily engagement record
      INSERT INTO public.retreat_engagement (
        user_retreat_id,
        engagement_date,
        activities_completed,
        time_spent_minutes
      ) VALUES (
        NEW.user_retreat_id,
        CURRENT_DATE,
        completed_activities_for_day,
        COALESCE(NEW.completion_time_minutes, 0)
      ) ON CONFLICT (user_retreat_id, engagement_date)
      DO UPDATE SET 
        activities_completed = retreat_engagement.activities_completed + 1,
        time_spent_minutes = retreat_engagement.time_spent_minutes + COALESCE(NEW.completion_time_minutes, 0);
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_check_day_completion
  AFTER UPDATE ON public.retreat_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.check_day_completion();

-- Trigger to auto-create intake assessment when user signs up
CREATE OR REPLACE FUNCTION public.create_user_intake()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.intake_assessments (
    user_id,
    consent_data,
    is_completed
  ) VALUES (
    NEW.id,
    '{"privacy_consent": false, "terms_consent": false}'::jsonb,
    false
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_create_user_intake
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.create_user_intake();

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_retreat_progress_user_retreat_day 
ON public.retreat_progress(user_retreat_id, day_number);

CREATE INDEX IF NOT EXISTS idx_retreat_progress_status 
ON public.retreat_progress(status);

CREATE INDEX IF NOT EXISTS idx_user_retreats_user_id 
ON public.user_retreats(user_id);

CREATE INDEX IF NOT EXISTS idx_retreat_activities_retreat_day 
ON public.retreat_activities(retreat_id, day_number);

CREATE INDEX IF NOT EXISTS idx_daily_checkins_user_retreat_date 
ON public.daily_checkins(user_retreat_id, checkin_date);

-- Fix the retreat content security issue
CREATE POLICY "Users can only view activities for their enrolled retreats"
ON public.retreat_activities FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_retreats ur 
    WHERE ur.retreat_id = retreat_activities.retreat_id 
      AND ur.user_id = auth.uid()
  )
);

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can view retreat activities" ON public.retreat_activities;