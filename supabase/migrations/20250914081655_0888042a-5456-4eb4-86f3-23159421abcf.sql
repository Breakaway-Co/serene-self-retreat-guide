-- First, let's clear any existing data and repopulate with complete retreat configurations
TRUNCATE TABLE retreat_activities CASCADE;
TRUNCATE TABLE retreat_configurations CASCADE;

-- Insert all retreat configurations
INSERT INTO retreat_configurations (
  name, slug, description, short_description, duration_days, focus_areas, principles, 
  target_conditions, contraindications, risk_level, requires_supervision, 
  evidence_based_therapies, trauma_informed_adaptations, is_active
) VALUES 
-- PTSD Recovery Retreat
('Gentle Path: PTSD Recovery & Trauma Healing', 'ptsd_recovery', 
 'A trauma-informed 21-day program designed to support PTSD recovery through gentle, evidence-based approaches including EMDR preparation, somatic healing, and nervous system regulation.', 
 'Trauma-informed PTSD recovery through gentle healing practices', 21,
 ARRAY['PTSD Recovery', 'Trauma Healing', 'Nervous System Regulation', 'Somatic Healing'],
 ARRAY['Trauma-Informed', 'Evidence-Based', 'Gentle Pacing', 'Safety-First'],
 ARRAY['PTSD', 'Complex PTSD', 'Trauma Responses', 'Hypervigilance'],
 ARRAY['Active Psychosis', 'Severe Dissociation', 'Active Substance Abuse'],
 'high', true,
 ARRAY['EMDR', 'Somatic Experiencing', 'DBT', 'Trauma-Sensitive Mindfulness'],
 '{"gentle_pacing": true, "choice_emphasis": true, "safety_first": true}'::jsonb, true),

-- Addictions Recovery
('Addictions Recovery Program', 'retreat_addictions_recovery',
 'A comprehensive, trauma-informed recovery program designed to support individuals overcoming substance and behavioral addictions through evidence-based practices.',
 'Evidence-based recovery program for substance and behavioral addictions', 14,
 ARRAY['Addiction Recovery', 'Coping Strategies', 'Trigger Management', 'Relapse Prevention'],
 ARRAY['Trauma-Informed', 'Harm Reduction', 'Evidence-Based', 'Non-Judgmental'],
 ARRAY['Substance Use Disorders', 'Behavioral Addictions', 'Co-occurring Disorders'],
 ARRAY['Active Withdrawal', 'Severe Mental Health Crisis', 'Medical Detox Required'],
 'high', true,
 ARRAY['CBT', 'DBT', 'Motivational Interviewing', 'Mindfulness-Based Relapse Prevention'],
 '{"trauma_awareness": true, "safety_planning": true, "gentle_approach": true}'::jsonb, true),

-- Corporate Burnout
('Phoenix Rising: Corporate Burnout Recovery', 'corporate_burnout',
 'A comprehensive 14-day program designed specifically for high-achievers and corporate professionals experiencing burnout. Focus on sustainable work practices, energy restoration, and preventing future burnout.',
 'Professional burnout recovery with sustainable work-life integration', 14,
 ARRAY['Burnout Recovery', 'Work-Life Balance', 'Energy Restoration', 'Sustainable Practices'],
 ARRAY['Evidence-Based', 'Practical Application', 'Professional Focus', 'Prevention'],
 ARRAY['Workplace Burnout', 'Chronic Stress', 'Exhaustion', 'Work Overwhelm'],
 ARRAY['Severe Depression', 'Active Suicidal Ideation', 'Substance Abuse'],
 'moderate', false,
 ARRAY['CBT', 'Acceptance and Commitment Therapy', 'Mindfulness', 'Stress Management'],
 '{"work_integration": true, "practical_focus": true, "sustainability": true}'::jsonb, true),

-- Grief Healing
('Sacred Journey: Grief & Loss Healing', 'grief_healing',
 'A compassionate 21-day program for individuals navigating grief and loss. Gentle, trauma-informed approach to processing grief, honoring memories, and finding meaning after loss.',
 'Compassionate grief support through gentle healing practices', 21,
 ARRAY['Grief Processing', 'Loss Support', 'Memory Honoring', 'Meaning Making'],
 ARRAY['Trauma-Informed', 'Compassionate', 'Gentle Pacing', 'Culturally Sensitive'],
 ARRAY['Grief', 'Loss', 'Bereavement', 'Complicated Grief'],
 ARRAY['Active Suicidal Ideation', 'Severe Depression', 'Active Psychosis'],
 'moderate', true,
 ARRAY['Grief Therapy', 'Narrative Therapy', 'Expressive Arts Therapy', 'Mindfulness'],
 '{"gentle_processing": true, "choice_based": true, "cultural_sensitivity": true}'::jsonb, true),

-- Parent-Child Grief
('Together in Healing: Parent-Child Grief Support', 'grief_parent_child',
 'A specialized 14-day program for parents and children (ages 6-17) to process grief together. Age-appropriate activities, family bonding, and gentle healing practices.',
 'Family grief support with age-appropriate healing activities', 14,
 ARRAY['Family Grief', 'Parent-Child Bonding', 'Age-Appropriate Support', 'Healing Together'],
 ARRAY['Family-Centered', 'Age-Appropriate', 'Trauma-Informed', 'Gentle'],
 ARRAY['Family Grief', 'Child Loss', 'Parent Grief', 'Family Trauma'],
 ARRAY['Child Safety Concerns', 'Severe Parental Depression', 'Family Violence'],
 'moderate', true,
 ARRAY['Family Therapy', 'Play Therapy', 'Art Therapy', 'Narrative Therapy'],
 '{"family_focus": true, "age_appropriate": true, "safety_first": true}'::jsonb, true),

-- Stress Management
('Calm Waters: Comprehensive Stress Management', 'stress_management',
 'A practical 10-day program focused on immediate stress relief and long-term stress management strategies. Perfect for anyone feeling overwhelmed by daily life pressures.',
 'Practical stress relief through proven management techniques', 10,
 ARRAY['Stress Management', 'Coping Strategies', 'Relaxation Techniques', 'Prevention'],
 ARRAY['Evidence-Based', 'Practical', 'Skill-Building', 'Prevention-Focused'],
 ARRAY['Chronic Stress', 'Work Stress', 'Daily Overwhelm', 'General Anxiety'],
 ARRAY['Severe Anxiety', 'Depression', 'Panic Disorder'],
 'low', false,
 ARRAY['CBT', 'Mindfulness-Based Stress Reduction', 'Progressive Relaxation', 'Breathing Techniques'],
 '{"accessibility": true, "practical_focus": true, "daily_integration": true}'::jsonb, true),

-- Depression Support
('Gentle Dawn: Depression Support & Healing', 'depression_support',
 'A compassionate 14-day program designed specifically for depression support through behavioral activation, gentle movement, and mood-supporting practices.',
 'Gentle depression support through behavioral activation and self-compassion', 14,
 ARRAY['Depression Support', 'Behavioral Activation', 'Mood Support', 'Self-Compassion'],
 ARRAY['Trauma-Informed', 'Gentle Pacing', 'Self-Compassion', 'Evidence-Based'],
 ARRAY['Depression', 'Low Mood', 'Seasonal Depression', 'Mild to Moderate Depression'],
 ARRAY['Severe Depression (PHQ-9 > 20)', 'Active Suicidal Ideation', 'Psychosis'],
 'moderate', true,
 ARRAY['Behavioral Activation', 'CBT', 'Mindfulness', 'Compassion-Focused Therapy'],
 '{"gentle_activation": true, "self_compassion": true, "trauma_aware": true}'::jsonb, true),

-- Anxiety Relief
('Steady Ground: Anxiety Relief & Resilience', 'anxiety_relief',
 'A structured 12-day program focused on anxiety management through proven techniques including grounding, breathing practices, and cognitive tools for building lasting calm.',
 'Anxiety relief through grounding techniques and nervous system regulation', 12,
 ARRAY['Anxiety Management', 'Grounding Techniques', 'Nervous System Regulation', 'Resilience Building'],
 ARRAY['Evidence-Based', 'Skill-Building', 'Trauma-Informed', 'Practical'],
 ARRAY['Generalized Anxiety', 'Social Anxiety', 'Panic', 'Anxiety Disorders'],
 ARRAY['Severe Anxiety (GAD-7 > 15)', 'Panic Disorder', 'Agoraphobia'],
 'moderate', false,
 ARRAY['CBT', 'Exposure Therapy', 'Mindfulness', 'Grounding Techniques'],
 '{"grounding_focus": true, "choice_based": true, "safety_first": true}'::jsonb, true);

-- Now insert sample activities for the PTSD retreat (as it has the most comprehensive structure)
-- Get the PTSD retreat ID
DO $$
DECLARE
    ptsd_retreat_id uuid;
BEGIN
    SELECT id INTO ptsd_retreat_id 
    FROM retreat_configurations 
    WHERE slug = 'ptsd_recovery';

    -- Day 1 Activities
    INSERT INTO retreat_activities (
        retreat_id, day_number, time_slot, activity_name, activity_type, 
        description, instructions, duration_minutes, contraindications, 
        modifications, trauma_considerations, evidence_base, difficulty_level
    ) VALUES 
    (ptsd_retreat_id, 1, 'morning', 'Grounding Breathwork Practice', 'mindfulness',
     'Gentle breathing exercise designed specifically for trauma survivors',
     'Practice slow, controlled breathing while maintaining awareness of safety and choice',
     15, ARRAY['Active panic attacks', 'Severe respiratory issues'], 
     ARRAY['Optional', 'Stop if triggered'], 
     ARRAY['Allows complete control', 'Can be stopped anytime', 'No forced breathing'],
     'Based on Trauma-Sensitive Mindfulness and nervous system regulation research', 'beginner'),
     
    (ptsd_retreat_id, 1, 'morning', 'Safety Check-In & Grounding', 'healing',
     'Establishing internal and external safety awareness',
     'Assess current safety levels and practice grounding techniques',
     15, ARRAY['Severe dissociation'], 
     ARRAY['Shorter duration if needed'], 
     ARRAY['Emphasizes choice and control', 'Validates all responses'],
     'Grounded in trauma-informed care principles and safety planning', 'beginner'),
     
    (ptsd_retreat_id, 1, 'afternoon', 'Window of Tolerance Education', 'therapy',
     'Learning about nervous system regulation and optimal arousal zones',
     'Educational session on understanding your nervous system responses',
     25, ARRAY['Cognitive impairment'], 
     ARRAY['Visual aids available', 'Shorter segments'],
     ARRAY['Normalizes trauma responses', 'Reduces self-blame'],
     'Based on Dan Siegel Window of Tolerance concept and Polyvagal Theory', 'beginner'),
     
    (ptsd_retreat_id, 1, 'afternoon', '5-4-3-2-1 Grounding Practice', 'healing',
     'Sensory-based grounding technique for present moment awareness',
     'Use five senses to anchor in the present moment and reduce dissociation',
     15, ARRAY['Severe sensory processing issues'], 
     ARRAY['Skip triggering senses'], 
     ARRAY['External focus prevents re-traumatization', 'Choice in sense engagement'],
     'Evidence-based grounding technique used in trauma therapy', 'beginner'),
     
    (ptsd_retreat_id, 1, 'evening', 'Safe Place Visualization', 'healing',
     'Creating an internal resource for safety and calm',
     'Guided visualization to establish or strengthen internal safe place',
     20, ARRAY['Severe dissociation', 'Visualization triggers'], 
     ARRAY['Use photos instead', 'Keep eyes open'],
     ARRAY['Complete control over content', 'Can modify or stop anytime'],
     'Core EMDR technique and trauma therapy resource', 'beginner');

END $$;

-- Insert content library resources
INSERT INTO content_library (
    title, content_type, file_url, transcript, tags, 
    compliance_reviewed, trauma_informed_reviewed, evidence_based_verified,
    metadata, is_active
) VALUES 
('Trauma-Safe Breathing Guide', 'audio', 
 '/audio/trauma-safe-breathing.mp3',
 'Welcome to this trauma-safe breathing practice. You are in complete control of this experience...',
 ARRAY['breathing', 'trauma-informed', 'grounding', 'nervous-system'],
 true, true, true,
 '{"duration_minutes": 15, "difficulty": "beginner", "trauma_adaptations": true}'::jsonb, true),
 
('5-4-3-2-1 Grounding Technique', 'audio',
 '/audio/grounding-5432.mp3',
 'This is a grounding technique that will help you connect with the present moment through your senses...',
 ARRAY['grounding', 'present-moment', 'anxiety-relief', 'trauma-informed'],
 true, true, true,
 '{"duration_minutes": 10, "difficulty": "beginner", "sensory_focus": true}'::jsonb, true),
 
('Window of Tolerance Educational Video', 'video',
 '/video/window-of-tolerance.mp4',
 'Understanding your nervous system: Learn about hyperarousal, hypoarousal, and your optimal zone...',
 ARRAY['education', 'nervous-system', 'self-awareness', 'trauma-informed'],
 true, true, true,
 '{"duration_minutes": 25, "educational": true, "captions_available": true}'::jsonb, true),
 
('Safe Place Visualization Guide', 'audio',
 '/audio/safe-place-visualization.mp3',
 'Find a comfortable position where you feel safe right now. This visualization is entirely under your control...',
 ARRAY['visualization', 'safety', 'resource-building', 'trauma-informed'],
 true, true, true,
 '{"duration_minutes": 20, "difficulty": "beginner", "emdr_resource": true}'::jsonb, true);