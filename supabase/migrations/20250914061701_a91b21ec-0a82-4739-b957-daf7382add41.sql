-- Create test user accounts with different access levels

-- First, we need to understand that Supabase auth.users table is managed by Supabase
-- We'll create the accounts via the app, but let's prepare the admin users table for them

-- Create test admin users (we'll add these UUIDs after creating the accounts)
-- These will be inserted after the accounts are created via the auth system

-- For now, let's create a helper function to easily promote users to admin
CREATE OR REPLACE FUNCTION public.promote_user_to_admin(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    target_user_id uuid;
BEGIN
    -- Find user by email in auth.users
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    IF target_user_id IS NULL THEN
        RAISE EXCEPTION 'User with email % not found', user_email;
    END IF;
    
    -- Insert into admin_users if not already exists
    INSERT INTO public.admin_users (user_id, role, permissions)
    VALUES (
        target_user_id,
        'admin',
        '{
            "retreats": ["view", "edit", "create", "delete"],
            "users": ["view", "edit"],
            "content": ["view", "edit", "create", "delete"],
            "analytics": ["view"],
            "system": ["manage"]
        }'::jsonb
    )
    ON CONFLICT (user_id) DO NOTHING;
    
END;
$$;

-- Create a function to add sample retreat data for testing
CREATE OR REPLACE FUNCTION public.create_test_user_retreat(p_user_id uuid, p_retreat_slug text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    retreat_config_id uuid;
    user_retreat_id uuid;
BEGIN
    -- Get retreat configuration ID by slug
    SELECT id INTO retreat_config_id
    FROM retreat_configurations
    WHERE slug = p_retreat_slug AND is_active = true;
    
    IF retreat_config_id IS NULL THEN
        RAISE EXCEPTION 'Retreat with slug % not found', p_retreat_slug;
    END IF;
    
    -- Create user retreat enrollment
    INSERT INTO public.user_retreats (
        user_id,
        retreat_id,
        start_date,
        status,
        personalization_data,
        gentle_mode
    ) VALUES (
        p_user_id,
        retreat_config_id,
        CURRENT_DATE,
        'active',
        '{
            "riskMitigations": ["gentle_pacing", "optional_activities"],
            "adaptations": ["shorter_sessions", "more_breaks"],
            "preferences": {
                "timeCommitment": "flexible",
                "intensity": "gentle",
                "modalities": ["mindfulness", "reflection", "gentle_movement"]
            }
        }'::jsonb,
        true
    ) RETURNING id INTO user_retreat_id;
    
    RETURN user_retreat_id;
END;
$$;

-- Create sample intake assessment for testing
CREATE OR REPLACE FUNCTION public.create_test_intake_assessment(p_user_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    assessment_id uuid;
BEGIN
    INSERT INTO public.intake_assessments (
        user_id,
        consent_data,
        demographics_data,
        presenting_concerns_data,
        wellbeing_screening_data,
        safety_data,
        lifestyle_data,
        goals_data,
        risk_assessment,
        retreat_recommendations,
        is_completed,
        completed_at
    ) VALUES (
        p_user_id,
        '{
            "privacy_consent": true,
            "terms_consent": true,
            "research_consent": false,
            "marketing_consent": true
        }'::jsonb,
        '{
            "age_range": "25-34",
            "gender": "prefer_not_to_say",
            "location": "test_location",
            "timezone": "UTC"
        }'::jsonb,
        '{
            "primary_concerns": ["stress", "anxiety"],
            "severity": "moderate",
            "duration": "6_months_to_1_year",
            "previous_treatment": true
        }'::jsonb,
        '{
            "phq9_score": 8,
            "gad7_score": 6,
            "stress_level": 7,
            "sleep_quality": 5
        }'::jsonb,
        '{
            "suicide_risk": false,
            "self_harm_risk": false,
            "substance_use": false,
            "support_system": true
        }'::jsonb,
        '{
            "exercise_frequency": "weekly",
            "sleep_hours": 7,
            "work_stress": "high",
            "accessibility_needs": []
        }'::jsonb,
        '{
            "primary_goals": ["stress_reduction", "better_sleep"],
            "timeline": "3_months",
            "commitment_level": "moderate"
        }'::jsonb,
        '{
            "overall_risk": "low",
            "contraindications": [],
            "recommendations": ["stress_recovery", "mindfulness_practice"]
        }'::jsonb,
        '{
            "recommended_retreats": ["stress-recovery", "anxiety-relief"],
            "intensity": "gentle",
            "supervision_needed": false
        }'::jsonb,
        true,
        now()
    ) RETURNING id INTO assessment_id;
    
    RETURN assessment_id;
END;
$$;