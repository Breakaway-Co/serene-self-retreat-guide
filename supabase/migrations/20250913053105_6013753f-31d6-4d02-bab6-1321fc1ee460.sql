-- Add missing RLS policies for existing tables that may not have them

-- Update profiles table with enhanced fields if needed
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS demographics_data JSONB DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS accessibility_needs TEXT[];

-- Create comprehensive RLS policies for all tables
DROP POLICY IF EXISTS "Users can view their screening results" ON public.screening_results;
CREATE POLICY "Users can view their screening results" ON public.screening_results
FOR SELECT USING (EXISTS (
  SELECT 1 FROM public.screening_sessions WHERE id = screening_results.session_id AND user_id = auth.uid()
));

DROP POLICY IF EXISTS "Admins can manage screening results" ON public.screening_results;
CREATE POLICY "Admins can manage screening results" ON public.screening_results
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

-- Ensure all tables have proper admin access
DROP POLICY IF EXISTS "Admins can manage risk assessments" ON public.risk_assessments;
CREATE POLICY "Admins can manage risk assessments" ON public.risk_assessments
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

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

DROP POLICY IF EXISTS "Admins can manage crisis protocols" ON public.crisis_protocols;
CREATE POLICY "Admins can manage crisis protocols" ON public.crisis_protocols
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can manage referrals" ON public.professional_referrals;
CREATE POLICY "Admins can manage referrals" ON public.professional_referrals
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can manage compliance" ON public.compliance_checks;
CREATE POLICY "Admins can manage compliance" ON public.compliance_checks
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can manage trauma flags" ON public.trauma_informed_flags;
CREATE POLICY "Admins can manage trauma flags" ON public.trauma_informed_flags
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can view all outcomes" ON public.user_outcomes;
CREATE POLICY "Admins can view all outcomes" ON public.user_outcomes
FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can manage effectiveness data" ON public.retreat_effectiveness;
CREATE POLICY "Admins can manage effectiveness data" ON public.retreat_effectiveness
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

-- User policies
DROP POLICY IF EXISTS "Users can view their risk assessments" ON public.risk_assessments;
CREATE POLICY "Users can view their risk assessments" ON public.risk_assessments
FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Everyone can view retreat configurations" ON public.retreat_configurations;
CREATE POLICY "Everyone can view retreat configurations" ON public.retreat_configurations
FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Everyone can view retreat activities" ON public.retreat_activities;
CREATE POLICY "Everyone can view retreat activities" ON public.retreat_activities
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can manage their retreat progress" ON public.retreat_progress;
CREATE POLICY "Users can manage their retreat progress" ON public.retreat_progress
FOR ALL USING (EXISTS (
  SELECT 1 FROM public.user_retreats WHERE id = retreat_progress.user_retreat_id AND user_id = auth.uid()
));

DROP POLICY IF EXISTS "Users can manage their daily checkins" ON public.daily_checkins;
CREATE POLICY "Users can manage their daily checkins" ON public.daily_checkins
FOR ALL USING (EXISTS (
  SELECT 1 FROM public.user_retreats WHERE id = daily_checkins.user_retreat_id AND user_id = auth.uid()
));

DROP POLICY IF EXISTS "Users can view their outcomes" ON public.user_outcomes;
CREATE POLICY "Users can view their outcomes" ON public.user_outcomes
FOR SELECT USING (auth.uid() = user_id);

-- Create missing indexes for performance
CREATE INDEX IF NOT EXISTS idx_screening_results_session_id ON public.screening_results(session_id);
CREATE INDEX IF NOT EXISTS idx_risk_assessments_user_id ON public.risk_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_retreat_progress_user_retreat_id ON public.retreat_progress(user_retreat_id);
CREATE INDEX IF NOT EXISTS idx_daily_checkins_user_retreat_id ON public.daily_checkins(user_retreat_id);
CREATE INDEX IF NOT EXISTS idx_daily_checkins_date ON public.daily_checkins(checkin_date);
CREATE INDEX IF NOT EXISTS idx_content_library_asset_id ON public.content_library(asset_id);
CREATE INDEX IF NOT EXISTS idx_crisis_protocols_user_id ON public.crisis_protocols(user_id);
CREATE INDEX IF NOT EXISTS idx_professional_referrals_user_id ON public.professional_referrals(user_id);
CREATE INDEX IF NOT EXISTS idx_user_outcomes_user_id ON public.user_outcomes(user_id);
CREATE INDEX IF NOT EXISTS idx_retreat_activities_retreat_day ON public.retreat_activities(retreat_id, day_number);

-- Create triggers for updated_at timestamps on missing tables
DROP TRIGGER IF EXISTS update_risk_assessments_updated_at ON public.risk_assessments;
CREATE TRIGGER update_risk_assessments_updated_at
BEFORE UPDATE ON public.risk_assessments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_retreat_configurations_updated_at ON public.retreat_configurations;
CREATE TRIGGER update_retreat_configurations_updated_at
BEFORE UPDATE ON public.retreat_configurations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_retreat_activities_updated_at ON public.retreat_activities;
CREATE TRIGGER update_retreat_activities_updated_at
BEFORE UPDATE ON public.retreat_activities
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_retreats_updated_at ON public.user_retreats;
CREATE TRIGGER update_user_retreats_updated_at
BEFORE UPDATE ON public.user_retreats
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_retreat_progress_updated_at ON public.retreat_progress;
CREATE TRIGGER update_retreat_progress_updated_at
BEFORE UPDATE ON public.retreat_progress
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_crisis_protocols_updated_at ON public.crisis_protocols;
CREATE TRIGGER update_crisis_protocols_updated_at
BEFORE UPDATE ON public.crisis_protocols
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_professional_referrals_updated_at ON public.professional_referrals;
CREATE TRIGGER update_professional_referrals_updated_at
BEFORE UPDATE ON public.professional_referrals
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_trauma_informed_flags_updated_at ON public.trauma_informed_flags;
CREATE TRIGGER update_trauma_informed_flags_updated_at
BEFORE UPDATE ON public.trauma_informed_flags
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_retreat_effectiveness_updated_at ON public.retreat_effectiveness;
CREATE TRIGGER update_retreat_effectiveness_updated_at
BEFORE UPDATE ON public.retreat_effectiveness
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();