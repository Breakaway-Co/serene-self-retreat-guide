import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const testAccounts = [
      {
        email: 'admin@healingjourney.com',
        password: 'TestAdmin2024!',
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        description: 'Full admin access to all retreat management, user data, and system settings'
      },
      {
        email: 'therapist@healingjourney.com', 
        password: 'TestTherapist2024!',
        role: 'admin',
        firstName: 'Clinical',
        lastName: 'Therapist',
        description: 'Clinical oversight with access to user progress and retreat management'
      },
      {
        email: 'user1@healingjourney.com',
        password: 'TestUser2024!',
        role: 'user',
        firstName: 'Sarah',
        lastName: 'Johnson',
        description: 'Regular user with active stress recovery retreat'
      },
      {
        email: 'user2@healingjourney.com',
        password: 'TestUser2024!',
        role: 'user', 
        firstName: 'Mike',
        lastName: 'Chen',
        description: 'Regular user with anxiety relief retreat'
      },
      {
        email: 'user3@healingjourney.com',
        password: 'TestUser2024!',
        role: 'user',
        firstName: 'Emma',
        lastName: 'Rodriguez',
        description: 'Regular user with depression support retreat'
      }
    ];

    const results = [];

    for (const account of testAccounts) {
      console.log(`Creating account: ${account.email}`);
      
      // Create user account
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: account.email,
        password: account.password,
        email_confirm: true,
        user_metadata: {
          first_name: account.firstName,
          last_name: account.lastName
        }
      });

      if (authError) {
        console.error(`Error creating ${account.email}:`, authError);
        results.push({
          email: account.email,
          success: false,
          error: authError.message
        });
        continue;
      }

      const userId = authData.user.id;
      console.log(`Created user ${account.email} with ID: ${userId}`);

      // Create profile 
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .upsert({
          id: userId,
          email: account.email,
          full_name: `${account.firstName} ${account.lastName}`
        });

      if (profileError) {
        console.error(`Error creating profile for ${account.email}:`, profileError);
      }

      // If admin role, add to admin_users
      if (account.role === 'admin') {
        const { error: adminError } = await supabaseAdmin
          .from('admin_users')
          .upsert({
            user_id: userId,
            role: 'admin',
            permissions: {
              retreats: ['view', 'edit', 'create', 'delete'],
              users: ['view', 'edit'],
              content: ['view', 'edit', 'create', 'delete'],
              analytics: ['view'],
              system: ['manage']
            }
          });

        if (adminError) {
          console.error(`Error creating admin role for ${account.email}:`, adminError);
        }
      }

      // For regular users, create intake assessment and retreat enrollment
      if (account.role === 'user') {
        // Create intake assessment
        const { data: intakeData, error: intakeError } = await supabaseAdmin
          .from('intake_assessments')
          .upsert({
            user_id: userId,
            consent_data: {
              privacy_consent: true,
              terms_consent: true,
              research_consent: false,
              marketing_consent: true
            },
            demographics_data: {
              age_range: '25-34',
              gender: 'prefer_not_to_say',
              location: 'test_location',
              timezone: 'UTC'
            },
            presenting_concerns_data: {
              primary_concerns: ['stress', 'anxiety'],
              severity: 'moderate',
              duration: '6_months_to_1_year',
              previous_treatment: true
            },
            wellbeing_screening_data: {
              phq9_score: 8,
              gad7_score: 6,
              stress_level: 7,
              sleep_quality: 5
            },
            safety_data: {
              suicide_risk: false,
              self_harm_risk: false,
              substance_use: false,
              support_system: true
            },
            lifestyle_data: {
              exercise_frequency: 'weekly',
              sleep_hours: 7,
              work_stress: 'high',
              accessibility_needs: []
            },
            goals_data: {
              primary_goals: ['stress_reduction', 'better_sleep'],
              timeline: '3_months',
              commitment_level: 'moderate'
            },
            risk_assessment: {
              overall_risk: 'low',
              contraindications: [],
              recommendations: ['stress_recovery', 'mindfulness_practice']
            },
            retreat_recommendations: {
              recommended_retreats: ['stress-recovery', 'anxiety-relief'],
              intensity: 'gentle',
              supervision_needed: false
            },
            is_completed: true,
            completed_at: new Date().toISOString()
          })
          .select('id')
          .single();

        if (intakeError) {
          console.error(`Error creating intake for ${account.email}:`, intakeError);
        }

        // Assign retreat based on email
        let retreatSlug = 'stress-recovery'; // default
        if (account.email.includes('user2')) {
          retreatSlug = 'anxiety-relief';
        } else if (account.email.includes('user3')) {
          retreatSlug = 'depression-support';
        }

        // Get retreat configuration
        const { data: retreatConfig, error: retreatConfigError } = await supabaseAdmin
          .from('retreat_configurations')
          .select('id')
          .eq('slug', retreatSlug)
          .eq('is_active', true)
          .single();

        if (retreatConfigError) {
          console.error(`Error finding retreat ${retreatSlug}:`, retreatConfigError);
        } else {
          // Create user retreat enrollment
          const { error: userRetreatError } = await supabaseAdmin
            .from('user_retreats')
            .upsert({
              user_id: userId,
              retreat_id: retreatConfig.id,
              intake_assessment_id: intakeData?.id,
              start_date: new Date().toISOString().split('T')[0],
              status: 'active',
              personalization_data: {
                riskMitigations: ['gentle_pacing', 'optional_activities'],
                adaptations: ['shorter_sessions', 'more_breaks'],
                preferences: {
                  timeCommitment: 'flexible',
                  intensity: 'gentle',
                  modalities: ['mindfulness', 'reflection', 'gentle_movement']
                }
              },
              gentle_mode: true
            });

          if (userRetreatError) {
            console.error(`Error creating user retreat for ${account.email}:`, userRetreatError);
          }
        }
      }

      results.push({
        email: account.email,
        password: account.password,
        role: account.role,
        description: account.description,
        success: true,
        userId: userId
      });
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Test accounts created successfully',
      accounts: results
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in create-test-accounts function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});