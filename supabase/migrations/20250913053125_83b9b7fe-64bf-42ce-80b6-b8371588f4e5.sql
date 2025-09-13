-- Add missing RLS policies for existing tables that may not have them

-- Users can manage their own screening sessions
DROP POLICY IF EXISTS "Users can manage their own screening sessions" ON public.screening_sessions;
CREATE POLICY "Users can manage their own screening sessions" ON public.screening_sessions
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Users can view their screening results
DROP POLICY IF EXISTS "Users can view their screening results" ON public.screening_results;
CREATE POLICY "Users can view their screening results" ON public.screening_results
FOR SELECT USING (EXISTS (
  SELECT 1 FROM public.screening_sessions WHERE id = screening_results.session_id AND user_id = auth.uid()
));

-- Users can manage their intake assessments
DROP POLICY IF EXISTS "Users can manage their intake assessments" ON public.intake_assessments;
CREATE POLICY "Users can manage their intake assessments" ON public.intake_assessments
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Users can view their risk assessments
DROP POLICY IF EXISTS "Users can view their risk assessments" ON public.risk_assessments;
CREATE POLICY "Users can view their risk assessments" ON public.risk_assessments
FOR SELECT USING (auth.uid() = user_id);

-- Everyone can view retreat configurations
DROP POLICY IF EXISTS "Everyone can view retreat configurations" ON public.retreat_configurations;
CREATE POLICY "Everyone can view retreat configurations" ON public.retreat_configurations
FOR SELECT USING (is_active = true);

-- Everyone can view retreat activities
DROP POLICY IF EXISTS "Everyone can view retreat activities" ON public.retreat_activities;
CREATE POLICY "Everyone can view retreat activities" ON public.retreat_activities
FOR SELECT USING (true);

-- Users can manage their retreat enrollments
DROP POLICY IF EXISTS "Users can manage their retreat enrollments" ON public.user_retreats;
CREATE POLICY "Users can manage their retreat enrollments" ON public.user_retreats
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Users can manage their retreat progress
DROP POLICY IF EXISTS "Users can manage their retreat progress" ON public.retreat_progress;
CREATE POLICY "Users can manage their retreat progress" ON public.retreat_progress
FOR ALL USING (EXISTS (
  SELECT 1 FROM public.user_retreats WHERE id = retreat_progress.user_retreat_id AND user_id = auth.uid()
));

-- Users can manage their daily checkins
DROP POLICY IF EXISTS "Users can manage their daily checkins" ON public.daily_checkins;
CREATE POLICY "Users can manage their daily checkins" ON public.daily_checkins
FOR ALL USING (EXISTS (
  SELECT 1 FROM public.user_retreats WHERE id = daily_checkins.user_retreat_id AND user_id = auth.uid()
));

-- Users can manage their preferences
DROP POLICY IF EXISTS "Users can manage their preferences" ON public.user_preferences;
CREATE POLICY "Users can manage their preferences" ON public.user_preferences
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Users can view their outcomes
DROP POLICY IF EXISTS "Users can view their outcomes" ON public.user_outcomes;
CREATE POLICY "Users can view their outcomes" ON public.user_outcomes
FOR SELECT USING (auth.uid() = user_id);

-- Admin policies for screening data
DROP POLICY IF EXISTS "Admins can manage all screening data" ON public.screening_sessions;
CREATE POLICY "Admins can manage all screening data" ON public.screening_sessions
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can manage screening results" ON public.screening_results;
CREATE POLICY "Admins can manage screening results" ON public.screening_results
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can manage intake assessments" ON public.intake_assessments;
CREATE POLICY "Admins can manage intake assessments" ON public.intake_assessments
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can manage risk assessments" ON public.risk_assessments;
CREATE POLICY "Admins can manage risk assessments" ON public.risk_assessments
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

-- Admin policies for retreat management
DROP POLICY IF EXISTS "Admins can manage retreat configs" ON public.retreat_configurations;
CREATE POLICY "Admins can manage retreat configs" ON public.retreat_configurations
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can manage retreat activities" ON public.retreat_activities;
CREATE POLICY "Admins can manage retreat activities" ON public.retreat_activities
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can view all user retreats" ON public.user_retreats;
CREATE POLICY "Admins can view all user retreats" ON public.user_retreats
FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can view all progress" ON public.retreat_progress;
CREATE POLICY "Admins can view all progress" ON public.retreat_progress
FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can view all checkins" ON public.daily_checkins;
CREATE POLICY "Admins can view all checkins" ON public.daily_checkins
FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can manage user preferences" ON public.user_preferences;
CREATE POLICY "Admins can manage user preferences" ON public.user_preferences
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can view all outcomes" ON public.user_outcomes;
CREATE POLICY "Admins can view all outcomes" ON public.user_outcomes
FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

-- Admin policies for content and compliance
DROP POLICY IF EXISTS "Admins can manage compliance" ON public.compliance_checks;
CREATE POLICY "Admins can manage compliance" ON public.compliance_checks
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can manage trauma flags" ON public.trauma_informed_flags;
CREATE POLICY "Admins can manage trauma flags" ON public.trauma_informed_flags
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can manage crisis protocols" ON public.crisis_protocols;
CREATE POLICY "Admins can manage crisis protocols" ON public.crisis_protocols
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can manage referrals" ON public.professional_referrals;
CREATE POLICY "Admins can manage referrals" ON public.professional_referrals
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can manage effectiveness data" ON public.retreat_effectiveness;
CREATE POLICY "Admins can manage effectiveness data" ON public.retreat_effectiveness
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

-- Create missing triggers for updated_at timestamps where they don't exist
CREATE OR REPLACE FUNCTION check_trigger_exists(table_name text, trigger_name text) 
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM information_schema.triggers 
        WHERE event_object_table = table_name 
        AND trigger_name = trigger_name
    );
END;
$$ LANGUAGE plpgsql;

-- Add triggers only if they don't exist
DO $$
BEGIN
    IF NOT check_trigger_exists('screening_sessions', 'update_screening_sessions_updated_at') THEN
        CREATE TRIGGER update_screening_sessions_updated_at
        BEFORE UPDATE ON public.screening_sessions
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT check_trigger_exists('intake_assessments', 'update_intake_assessments_updated_at') THEN
        CREATE TRIGGER update_intake_assessments_updated_at
        BEFORE UPDATE ON public.intake_assessments
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT check_trigger_exists('risk_assessments', 'update_risk_assessments_updated_at') THEN
        CREATE TRIGGER update_risk_assessments_updated_at
        BEFORE UPDATE ON public.risk_assessments
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT check_trigger_exists('retreat_configurations', 'update_retreat_configurations_updated_at') THEN
        CREATE TRIGGER update_retreat_configurations_updated_at
        BEFORE UPDATE ON public.retreat_configurations
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT check_trigger_exists('retreat_activities', 'update_retreat_activities_updated_at') THEN
        CREATE TRIGGER update_retreat_activities_updated_at
        BEFORE UPDATE ON public.retreat_activities
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT check_trigger_exists('user_retreats', 'update_user_retreats_updated_at') THEN
        CREATE TRIGGER update_user_retreats_updated_at
        BEFORE UPDATE ON public.user_retreats
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT check_trigger_exists('retreat_progress', 'update_retreat_progress_updated_at') THEN
        CREATE TRIGGER update_retreat_progress_updated_at
        BEFORE UPDATE ON public.retreat_progress
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT check_trigger_exists('user_preferences', 'update_user_preferences_updated_at') THEN
        CREATE TRIGGER update_user_preferences_updated_at
        BEFORE UPDATE ON public.user_preferences
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT check_trigger_exists('crisis_protocols', 'update_crisis_protocols_updated_at') THEN
        CREATE TRIGGER update_crisis_protocols_updated_at
        BEFORE UPDATE ON public.crisis_protocols
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT check_trigger_exists('professional_referrals', 'update_professional_referrals_updated_at') THEN
        CREATE TRIGGER update_professional_referrals_updated_at
        BEFORE UPDATE ON public.professional_referrals
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT check_trigger_exists('trauma_informed_flags', 'update_trauma_informed_flags_updated_at') THEN
        CREATE TRIGGER update_trauma_informed_flags_updated_at
        BEFORE UPDATE ON public.trauma_informed_flags
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT check_trigger_exists('retreat_effectiveness', 'update_retreat_effectiveness_updated_at') THEN
        CREATE TRIGGER update_retreat_effectiveness_updated_at
        BEFORE UPDATE ON public.retreat_effectiveness
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END
$$;

-- Drop the helper function
DROP FUNCTION check_trigger_exists(text, text);

-- Create missing indexes for performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_screening_sessions_user_id ON public.screening_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_screening_results_session_id ON public.screening_results(session_id);
CREATE INDEX IF NOT EXISTS idx_intake_assessments_user_id ON public.intake_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_risk_assessments_user_id ON public.risk_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_retreats_user_id ON public.user_retreats(user_id);
CREATE INDEX IF NOT EXISTS idx_retreat_progress_user_retreat_id ON public.retreat_progress(user_retreat_id);
CREATE INDEX IF NOT EXISTS idx_daily_checkins_user_retreat_id ON public.daily_checkins(user_retreat_id);
CREATE INDEX IF NOT EXISTS idx_daily_checkins_date ON public.daily_checkins(checkin_date);
CREATE INDEX IF NOT EXISTS idx_content_library_asset_id ON public.content_library(asset_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON public.user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_crisis_protocols_user_id ON public.crisis_protocols(user_id);
CREATE INDEX IF NOT EXISTS idx_professional_referrals_user_id ON public.professional_referrals(user_id);
CREATE INDEX IF NOT EXISTS idx_user_outcomes_user_id ON public.user_outcomes(user_id);
CREATE INDEX IF NOT EXISTS idx_retreat_activities_retreat_day ON public.retreat_activities(retreat_id, day_number);