-- User Assessment & Screening Tables
CREATE TABLE public.screening_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_type TEXT NOT NULL,
  overall_risk_level TEXT CHECK (overall_risk_level IN ('low', 'moderate', 'high', 'severe')),
  crisis_flags BOOLEAN DEFAULT FALSE,
  professional_referral_needed BOOLEAN DEFAULT FALSE,
  recommendations TEXT[],
  referrals TEXT[],
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.screening_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.screening_sessions(id) ON DELETE CASCADE,
  tool_id TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  risk_level TEXT CHECK (risk_level IN ('low', 'moderate', 'high', 'severe')),
  interpretation TEXT,
  recommendations TEXT[],
  risk_flags TEXT[],
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.intake_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  consent_data JSONB DEFAULT '{}',
  demographics_data JSONB DEFAULT '{}',
  presenting_concerns_data JSONB DEFAULT '{}',
  wellbeing_screening_data JSONB DEFAULT '{}',
  safety_data JSONB DEFAULT '{}',
  lifestyle_data JSONB DEFAULT '{}',
  goals_data JSONB DEFAULT '{}',
  risk_assessment JSONB DEFAULT '{}',
  retreat_recommendations JSONB DEFAULT '{}',
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.risk_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES public.intake_assessments(id) ON DELETE CASCADE,
  overall_risk_level TEXT CHECK (overall_risk_level IN ('low', 'moderate', 'high', 'severe')),
  suicide_risk BOOLEAN DEFAULT FALSE,
  self_harm_risk BOOLEAN DEFAULT FALSE,
  substance_abuse_risk BOOLEAN DEFAULT FALSE,
  crisis_intervention_needed BOOLEAN DEFAULT FALSE,
  professional_referral_required BOOLEAN DEFAULT FALSE,
  safety_plan_needed BOOLEAN DEFAULT FALSE,
  contraindications TEXT[],
  risk_factors JSONB DEFAULT '{}',
  protective_factors JSONB DEFAULT '{}',
  intervention_recommendations TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Retreat Management Tables
CREATE TABLE public.retreat_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  duration_days INTEGER NOT NULL,
  focus_areas TEXT[],
  principles TEXT[],
  target_conditions TEXT[],
  contraindications TEXT[],
  risk_level TEXT CHECK (risk_level IN ('low', 'moderate', 'high')) DEFAULT 'low',
  requires_supervision BOOLEAN DEFAULT FALSE,
  evidence_based_therapies TEXT[],
  trauma_informed_adaptations JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.retreat_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  retreat_id UUID REFERENCES public.retreat_configurations(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  time_slot TEXT NOT NULL,
  activity_name TEXT NOT NULL,
  activity_type TEXT CHECK (activity_type IN ('mindfulness', 'reflection', 'nutrition', 'movement', 'healing', 'creative', 'nature', 'therapy', 'somatic')),
  duration_minutes INTEGER,
  description TEXT,
  instructions TEXT,
  contraindications TEXT[],
  modifications TEXT[],
  trauma_considerations TEXT[],
  evidence_base TEXT,
  required_materials TEXT[],
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  is_optional BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.user_retreats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  retreat_id UUID REFERENCES public.retreat_configurations(id),
  intake_assessment_id UUID REFERENCES public.intake_assessments(id),
  personalization_data JSONB DEFAULT '{}',
  gentle_mode BOOLEAN DEFAULT FALSE,
  skip_activities TEXT[],
  additional_support TEXT[],
  start_date DATE,
  expected_end_date DATE,
  actual_end_date DATE,
  status TEXT CHECK (status IN ('assigned', 'active', 'paused', 'completed', 'discontinued')) DEFAULT 'assigned',
  completion_percentage DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.retreat_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_retreat_id UUID REFERENCES public.user_retreats(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  activity_id UUID REFERENCES public.retreat_activities(id),
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed', 'skipped')) DEFAULT 'not_started',
  completion_time_minutes INTEGER,
  user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
  notes TEXT,
  challenges_encountered TEXT[],
  insights TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.daily_checkins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_retreat_id UUID REFERENCES public.user_retreats(id) ON DELETE CASCADE,
  checkin_date DATE NOT NULL,
  mood_rating INTEGER CHECK (mood_rating >= 1 AND mood_rating <= 10),
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
  sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
  reflection_notes TEXT,
  gratitude_entries TEXT[],
  challenges TEXT[],
  wins TEXT[],
  needs_support BOOLEAN DEFAULT FALSE,
  crisis_flag BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Production Management Tables
CREATE TABLE public.production_assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  retreat_id UUID REFERENCES public.retreat_configurations(id),
  day_module TEXT NOT NULL,
  original_file_name TEXT NOT NULL,
  format TEXT CHECK (format IN ('Video', 'Audio', 'Workbook', 'Script', 'PDF')) NOT NULL,
  source TEXT NOT NULL,
  download_link TEXT,
  internal_storage_path TEXT,
  assigned_to TEXT,
  edit_task TEXT,
  estimated_hours DECIMAL(4,2),
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'review', 'completed', 'blocked')) DEFAULT 'not_started',
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  notes TEXT,
  completion_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.content_library (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_id UUID REFERENCES public.production_assets(id),
  title TEXT NOT NULL,
  content_type TEXT NOT NULL,
  file_url TEXT,
  file_size_bytes BIGINT,
  duration_seconds INTEGER,
  transcript TEXT,
  metadata JSONB DEFAULT '{}',
  tags TEXT[],
  compliance_reviewed BOOLEAN DEFAULT FALSE,
  trauma_informed_reviewed BOOLEAN DEFAULT FALSE,
  evidence_based_verified BOOLEAN DEFAULT FALSE,
  reviewer_notes TEXT,
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced User Support Tables
CREATE TABLE public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  time_commitment_preference TEXT CHECK (time_commitment_preference IN ('light', 'moderate', 'intensive')),
  intensity_preference TEXT CHECK (intensity_preference IN ('gentle', 'moderate', 'challenging')),
  preferred_modalities TEXT[],
  accessibility_needs TEXT[],
  trigger_warnings TEXT[],
  communication_preferences JSONB DEFAULT '{}',
  notification_settings JSONB DEFAULT '{}',
  privacy_settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.crisis_protocols (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  trigger_type TEXT NOT NULL,
  risk_level TEXT CHECK (risk_level IN ('moderate', 'high', 'severe')),
  protocol_activated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  intervention_taken TEXT[],
  professional_contacted BOOLEAN DEFAULT FALSE,
  follow_up_scheduled BOOLEAN DEFAULT FALSE,
  resolution_status TEXT CHECK (resolution_status IN ('active', 'monitoring', 'resolved')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.professional_referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_type TEXT CHECK (referral_type IN ('mental_health', 'medical', 'crisis', 'specialized_therapy')),
  urgency_level TEXT CHECK (urgency_level IN ('routine', 'urgent', 'emergency')),
  reason TEXT NOT NULL,
  recommended_providers JSONB DEFAULT '{}',
  referral_status TEXT CHECK (referral_status IN ('pending', 'contacted', 'scheduled', 'declined', 'completed')) DEFAULT 'pending',
  follow_up_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compliance & Standards Tables
CREATE TABLE public.compliance_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_id UUID REFERENCES public.content_library(id),
  retreat_id UUID REFERENCES public.retreat_configurations(id),
  check_type TEXT CHECK (check_type IN ('evidence_based', 'trauma_informed', 'nsqmhcmo_standards', 'safety_protocol')),
  compliance_status TEXT CHECK (compliance_status IN ('compliant', 'non_compliant', 'requires_review', 'pending')),
  reviewer_id UUID REFERENCES auth.users(id),
  review_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  findings TEXT[],
  recommendations TEXT[],
  action_required BOOLEAN DEFAULT FALSE,
  resolution_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.trauma_informed_flags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_id UUID REFERENCES public.content_library(id),
  flag_type TEXT CHECK (flag_type IN ('potential_trigger', 'requires_warning', 'needs_modification', 'safe_alternative')),
  description TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'moderate', 'high')),
  recommendations TEXT[],
  alternative_content_id UUID REFERENCES public.content_library(id),
  reviewed_by UUID REFERENCES auth.users(id),
  status TEXT CHECK (status IN ('active', 'resolved', 'acknowledged')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics & Reporting Tables
CREATE TABLE public.user_outcomes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  retreat_id UUID REFERENCES public.retreat_configurations(id),
  measurement_type TEXT CHECK (measurement_type IN ('pre_retreat', 'mid_retreat', 'post_retreat', 'follow_up')),
  phq9_score INTEGER,
  gad7_score INTEGER,
  stress_score INTEGER,
  wellbeing_score INTEGER,
  custom_metrics JSONB DEFAULT '{}',
  measurement_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.retreat_effectiveness (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  retreat_id UUID REFERENCES public.retreat_configurations(id),
  total_enrollments INTEGER DEFAULT 0,
  total_completions INTEGER DEFAULT 0,
  completion_rate DECIMAL(5,2),
  average_satisfaction DECIMAL(3,2),
  average_outcome_improvement DECIMAL(5,2),
  common_challenges TEXT[],
  success_factors TEXT[],
  recommended_improvements TEXT[],
  analysis_period_start DATE,
  analysis_period_end DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.screening_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screening_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intake_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.retreat_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.retreat_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_retreats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.retreat_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crisis_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trauma_informed_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.retreat_effectiveness ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user data access
CREATE POLICY "Users can manage their own screening sessions" ON public.screening_sessions
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their screening results" ON public.screening_results
FOR SELECT USING (EXISTS (
  SELECT 1 FROM public.screening_sessions WHERE id = screening_results.session_id AND user_id = auth.uid()
));

CREATE POLICY "Users can manage their intake assessments" ON public.intake_assessments
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their risk assessments" ON public.risk_assessments
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Everyone can view retreat configurations" ON public.retreat_configurations
FOR SELECT USING (is_active = true);

CREATE POLICY "Everyone can view retreat activities" ON public.retreat_activities
FOR SELECT USING (true);

CREATE POLICY "Users can manage their retreat enrollments" ON public.user_retreats
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their retreat progress" ON public.retreat_progress
FOR ALL USING (EXISTS (
  SELECT 1 FROM public.user_retreats WHERE id = retreat_progress.user_retreat_id AND user_id = auth.uid()
));

CREATE POLICY "Users can manage their daily checkins" ON public.daily_checkins
FOR ALL USING (EXISTS (
  SELECT 1 FROM public.user_retreats WHERE id = daily_checkins.user_retreat_id AND user_id = auth.uid()
));

CREATE POLICY "Users can manage their preferences" ON public.user_preferences
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their outcomes" ON public.user_outcomes
FOR SELECT USING (auth.uid() = user_id);

-- Admin policies
CREATE POLICY "Admins can manage all data" ON public.screening_sessions
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage screening results" ON public.screening_results
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage intake assessments" ON public.intake_assessments
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage risk assessments" ON public.risk_assessments
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage retreat configs" ON public.retreat_configurations
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage retreat activities" ON public.retreat_activities
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can view all user retreats" ON public.user_retreats
FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can view all progress" ON public.retreat_progress
FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can view all checkins" ON public.daily_checkins
FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage production assets" ON public.production_assets
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage content library" ON public.content_library
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage crisis protocols" ON public.crisis_protocols
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage referrals" ON public.professional_referrals
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage compliance" ON public.compliance_checks
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage trauma flags" ON public.trauma_informed_flags
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can view all outcomes" ON public.user_outcomes
FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage effectiveness data" ON public.retreat_effectiveness
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_screening_sessions_updated_at
BEFORE UPDATE ON public.screening_sessions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_intake_assessments_updated_at
BEFORE UPDATE ON public.intake_assessments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_risk_assessments_updated_at
BEFORE UPDATE ON public.risk_assessments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_retreat_configurations_updated_at
BEFORE UPDATE ON public.retreat_configurations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_retreat_activities_updated_at
BEFORE UPDATE ON public.retreat_activities
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_retreats_updated_at
BEFORE UPDATE ON public.user_retreats
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_retreat_progress_updated_at
BEFORE UPDATE ON public.retreat_progress
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_production_assets_updated_at
BEFORE UPDATE ON public.production_assets
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_content_library_updated_at
BEFORE UPDATE ON public.content_library
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
BEFORE UPDATE ON public.user_preferences
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_crisis_protocols_updated_at
BEFORE UPDATE ON public.crisis_protocols
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_professional_referrals_updated_at
BEFORE UPDATE ON public.professional_referrals
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_trauma_informed_flags_updated_at
BEFORE UPDATE ON public.trauma_informed_flags
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_retreat_effectiveness_updated_at
BEFORE UPDATE ON public.retreat_effectiveness
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_screening_sessions_user_id ON public.screening_sessions(user_id);
CREATE INDEX idx_screening_results_session_id ON public.screening_results(session_id);
CREATE INDEX idx_intake_assessments_user_id ON public.intake_assessments(user_id);
CREATE INDEX idx_risk_assessments_user_id ON public.risk_assessments(user_id);
CREATE INDEX idx_user_retreats_user_id ON public.user_retreats(user_id);
CREATE INDEX idx_retreat_progress_user_retreat_id ON public.retreat_progress(user_retreat_id);
CREATE INDEX idx_daily_checkins_user_retreat_id ON public.daily_checkins(user_retreat_id);
CREATE INDEX idx_daily_checkins_date ON public.daily_checkins(checkin_date);
CREATE INDEX idx_production_assets_retreat_id ON public.production_assets(retreat_id);
CREATE INDEX idx_content_library_asset_id ON public.content_library(asset_id);
CREATE INDEX idx_user_preferences_user_id ON public.user_preferences(user_id);
CREATE INDEX idx_crisis_protocols_user_id ON public.crisis_protocols(user_id);
CREATE INDEX idx_professional_referrals_user_id ON public.professional_referrals(user_id);
CREATE INDEX idx_user_outcomes_user_id ON public.user_outcomes(user_id);
CREATE INDEX idx_retreat_activities_retreat_day ON public.retreat_activities(retreat_id, day_number);