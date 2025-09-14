-- Security improvements and database infrastructure enhancements

-- 1. Fix therapy content security - restrict retreat_activities to authenticated users only
DROP POLICY IF EXISTS "Everyone can view retreat activities" ON public.retreat_activities;

CREATE POLICY "Authenticated users can view retreat activities" 
ON public.retreat_activities 
FOR SELECT 
TO authenticated 
USING (true);

-- 2. Add missing foreign key constraints for data integrity
-- Update user_retreats to properly reference retreat_configurations
ALTER TABLE public.user_retreats 
DROP CONSTRAINT IF EXISTS user_retreats_retreat_id_fkey;

ALTER TABLE public.user_retreats 
ADD CONSTRAINT user_retreats_retreat_id_fkey 
FOREIGN KEY (retreat_id) REFERENCES public.retreat_configurations(id) ON DELETE CASCADE;

-- 3. Add foreign key for retreat_activities to retreat_configurations
ALTER TABLE public.retreat_activities
DROP CONSTRAINT IF EXISTS retreat_activities_retreat_id_fkey;

ALTER TABLE public.retreat_activities 
ADD CONSTRAINT retreat_activities_retreat_id_fkey 
FOREIGN KEY (retreat_id) REFERENCES public.retreat_configurations(id) ON DELETE CASCADE;

-- 4. Add missing indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_user_retreats_user_id ON public.user_retreats(user_id);
CREATE INDEX IF NOT EXISTS idx_user_retreats_status ON public.user_retreats(status);
CREATE INDEX IF NOT EXISTS idx_daily_checkins_user_retreat_id ON public.daily_checkins(user_retreat_id);
CREATE INDEX IF NOT EXISTS idx_daily_checkins_date ON public.daily_checkins(checkin_date);
CREATE INDEX IF NOT EXISTS idx_retreat_progress_user_retreat_id ON public.retreat_progress(user_retreat_id);
CREATE INDEX IF NOT EXISTS idx_retreat_progress_day ON public.retreat_progress(day_number);
CREATE INDEX IF NOT EXISTS idx_audio_sessions_status ON public.audio_sessions(status);
CREATE INDEX IF NOT EXISTS idx_audio_generation_queue_status ON public.audio_generation_queue(status);
CREATE INDEX IF NOT EXISTS idx_screening_sessions_user_id ON public.screening_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_screening_results_session_id ON public.screening_results(session_id);

-- 5. Add data consistency triggers
CREATE OR REPLACE FUNCTION public.validate_retreat_dates()
RETURNS TRIGGER AS $$
BEGIN
  -- Ensure end date is after start date
  IF NEW.expected_end_date IS NOT NULL AND NEW.start_date IS NOT NULL THEN
    IF NEW.expected_end_date <= NEW.start_date THEN
      RAISE EXCEPTION 'Expected end date must be after start date';
    END IF;
  END IF;
  
  -- Ensure actual end date is after start date
  IF NEW.actual_end_date IS NOT NULL AND NEW.start_date IS NOT NULL THEN
    IF NEW.actual_end_date < NEW.start_date THEN
      RAISE EXCEPTION 'Actual end date must be after start date';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_user_retreat_dates
  BEFORE INSERT OR UPDATE ON public.user_retreats
  FOR EACH ROW EXECUTE FUNCTION public.validate_retreat_dates();

-- 6. Add function to calculate retreat progress automatically
CREATE OR REPLACE FUNCTION public.calculate_retreat_progress(p_user_retreat_id uuid)
RETURNS numeric AS $$
DECLARE
  total_activities integer;
  completed_activities integer;
  progress_percentage numeric;
BEGIN
  -- Get total activities for this retreat
  SELECT COUNT(*) INTO total_activities
  FROM public.retreat_activities ra
  JOIN public.user_retreats ur ON ur.retreat_id = ra.retreat_id
  WHERE ur.id = p_user_retreat_id;
  
  -- Get completed activities
  SELECT COUNT(*) INTO completed_activities
  FROM public.retreat_progress rp
  WHERE rp.user_retreat_id = p_user_retreat_id 
  AND rp.status = 'completed';
  
  -- Calculate percentage
  IF total_activities > 0 THEN
    progress_percentage := ROUND((completed_activities::numeric / total_activities::numeric) * 100, 2);
  ELSE
    progress_percentage := 0;
  END IF;
  
  -- Update user_retreats table
  UPDATE public.user_retreats 
  SET completion_percentage = progress_percentage,
      updated_at = now()
  WHERE id = p_user_retreat_id;
  
  RETURN progress_percentage;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Add trigger to auto-calculate progress when activities are completed
CREATE OR REPLACE FUNCTION public.trigger_progress_calculation()
RETURNS TRIGGER AS $$
BEGIN
  -- Only recalculate if status changed to completed or from completed
  IF (TG_OP = 'UPDATE' AND OLD.status != NEW.status AND (NEW.status = 'completed' OR OLD.status = 'completed'))
     OR (TG_OP = 'INSERT' AND NEW.status = 'completed') THEN
    PERFORM public.calculate_retreat_progress(COALESCE(NEW.user_retreat_id, OLD.user_retreat_id));
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_calculate_progress
  AFTER INSERT OR UPDATE ON public.retreat_progress
  FOR EACH ROW EXECUTE FUNCTION public.trigger_progress_calculation();

-- 8. Add crisis intervention tracking
CREATE TABLE IF NOT EXISTS public.crisis_interventions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  crisis_protocol_id uuid REFERENCES public.crisis_protocols(id) ON DELETE SET NULL,
  intervention_type text NOT NULL,
  severity_level text NOT NULL CHECK (severity_level IN ('low', 'moderate', 'high', 'critical')),
  automated_response jsonb DEFAULT '{}',
  human_contacted boolean DEFAULT false,
  follow_up_required boolean DEFAULT true,
  resolution_status text DEFAULT 'active' CHECK (resolution_status IN ('active', 'monitoring', 'resolved', 'escalated')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.crisis_interventions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage crisis interventions" 
ON public.crisis_interventions 
FOR ALL 
TO authenticated 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

CREATE INDEX idx_crisis_interventions_user_id ON public.crisis_interventions(user_id);
CREATE INDEX idx_crisis_interventions_severity ON public.crisis_interventions(severity_level);
CREATE INDEX idx_crisis_interventions_status ON public.crisis_interventions(resolution_status);

-- 9. Add retreat engagement analytics
CREATE TABLE IF NOT EXISTS public.retreat_engagement (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_retreat_id uuid REFERENCES public.user_retreats(id) ON DELETE CASCADE,
  engagement_date date NOT NULL DEFAULT CURRENT_DATE,
  time_spent_minutes integer DEFAULT 0,
  activities_completed integer DEFAULT 0,
  activities_skipped integer DEFAULT 0,
  difficulty_ratings jsonb DEFAULT '{}', -- {activity_id: rating}
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_retreat_id, engagement_date)
);

ALTER TABLE public.retreat_engagement ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their retreat engagement" 
ON public.retreat_engagement 
FOR ALL 
TO authenticated 
USING (EXISTS (
  SELECT 1 FROM public.user_retreats ur 
  WHERE ur.id = retreat_engagement.user_retreat_id 
  AND ur.user_id = auth.uid()
));

CREATE POLICY "Admins can view all retreat engagement" 
ON public.retreat_engagement 
FOR SELECT 
TO authenticated 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

CREATE INDEX idx_retreat_engagement_user_retreat_id ON public.retreat_engagement(user_retreat_id);
CREATE INDEX idx_retreat_engagement_date ON public.retreat_engagement(engagement_date);

-- 10. Add trigger to update retreat engagement
CREATE OR REPLACE FUNCTION public.update_retreat_engagement()
RETURNS TRIGGER AS $$
DECLARE
  today_date date := CURRENT_DATE;
BEGIN
  -- Only update if activity was completed today
  IF NEW.status = 'completed' AND NEW.completed_at::date = today_date THEN
    INSERT INTO public.retreat_engagement (
      user_retreat_id, 
      engagement_date, 
      activities_completed
    ) VALUES (
      NEW.user_retreat_id,
      today_date,
      1
    ) ON CONFLICT (user_retreat_id, engagement_date) 
    DO UPDATE SET 
      activities_completed = retreat_engagement.activities_completed + 1,
      updated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER track_engagement
  AFTER UPDATE ON public.retreat_progress
  FOR EACH ROW 
  WHEN (NEW.status = 'completed' AND OLD.status != 'completed')
  EXECUTE FUNCTION public.update_retreat_engagement();