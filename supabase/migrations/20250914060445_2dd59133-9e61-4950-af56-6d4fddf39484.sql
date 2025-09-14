-- Populate retreat configurations from the application data
INSERT INTO public.retreat_configurations (
  id, name, slug, description, short_description, duration_days, 
  focus_areas, principles, target_conditions, contraindications, 
  risk_level, requires_supervision, evidence_based_therapies, is_active
) VALUES 
(
  'stress-recovery',
  'Inner Compass: Stress Recovery Retreat',
  'stress-recovery',
  'A comprehensive 7-day program designed to help individuals recover from chronic stress using evidence-based mindfulness, somatic therapy, and cognitive behavioral techniques.',
  'Evidence-based stress recovery through mindfulness and somatic practices',
  7,
  ARRAY['Stress Management', 'Mindfulness', 'Somatic Awareness', 'Cognitive Flexibility'],
  ARRAY['Trauma-informed care', 'Gentle progression', 'Body-based healing', 'Mindful awareness'],
  ARRAY['Chronic stress', 'Burnout', 'Anxiety', 'Sleep difficulties'],
  ARRAY['Active psychosis', 'Severe dissociation', 'Acute suicidal ideation'],
  'low',
  false,
  ARRAY['Mindfulness-Based Stress Reduction (MBSR)', 'Somatic Experiencing', 'Cognitive Behavioral Therapy (CBT)'],
  true
),
(
  'anxiety-relief',
  'Steady Ground: Anxiety Relief & Resilience',
  'anxiety-relief', 
  'A 10-day evidence-based program combining CBT, mindfulness, and exposure therapy techniques to build resilience and reduce anxiety symptoms.',
  'Evidence-based anxiety relief through CBT and mindfulness practices',
  10,
  ARRAY['Anxiety Management', 'Cognitive Restructuring', 'Mindfulness', 'Exposure Therapy'],
  ARRAY['Evidence-based practice', 'Gradual exposure', 'Cognitive flexibility', 'Mindful awareness'],
  ARRAY['Generalized anxiety', 'Social anxiety', 'Panic disorder', 'Phobias'],
  ARRAY['Active psychosis', 'Severe agoraphobia', 'Acute suicidal ideation'],
  'moderate',
  false,
  ARRAY['Cognitive Behavioral Therapy (CBT)', 'Mindfulness-Based Cognitive Therapy (MBCT)', 'Exposure and Response Prevention (ERP)'],
  true
),
(
  'depression-support',
  'Gentle Dawn: Depression Support & Healing',
  'depression-support',
  'A 14-day therapeutic program using evidence-based approaches including behavioral activation, mindfulness, and gentle movement to support depression recovery.',
  'Gentle, evidence-based approach to depression support and healing',
  14,
  ARRAY['Depression Support', 'Behavioral Activation', 'Mindfulness', 'Gentle Movement'],
  ARRAY['Gentle progression', 'Behavioral activation', 'Mindful awareness', 'Self-compassion'],
  ARRAY['Major depression', 'Persistent depressive disorder', 'Seasonal depression'],
  ARRAY['Active suicidal ideation', 'Severe psychosis', 'Active substance abuse'],
  'moderate',
  true,
  ARRAY['Behavioral Activation Therapy (BAT)', 'Mindfulness-Based Cognitive Therapy (MBCT)', 'Acceptance and Commitment Therapy (ACT)'],
  true
),
(
  'ptsd-recovery',
  'Safe Harbor: PTSD Recovery & Integration',
  'ptsd-recovery',
  'A specialized 21-day trauma-informed program using EMDR, somatic experiencing, and mindfulness to support PTSD recovery in a safe, gradual manner.',
  'Trauma-informed PTSD recovery through EMDR and somatic practices',
  21,
  ARRAY['Trauma Recovery', 'EMDR', 'Somatic Experiencing', 'Safety Building'],
  ARRAY['Trauma-informed care', 'Safety first', 'Window of tolerance', 'Gentle progression'],
  ARRAY['PTSD', 'Complex trauma', 'Acute stress disorder'],
  ARRAY['Active psychosis', 'Severe dissociation', 'Active substance abuse', 'Acute suicidal ideation'],
  'high',
  true,
  ARRAY['Eye Movement Desensitization and Reprocessing (EMDR)', 'Somatic Experiencing', 'Trauma-Focused CBT'],
  true
),
(
  'corporate-burnout',
  'Reset Path: Corporate Burnout Recovery',
  'corporate-burnout',
  'A 14-day intensive program specifically designed for corporate burnout recovery, combining stress management, boundary setting, and career realignment strategies.',
  'Comprehensive corporate burnout recovery and prevention program',
  14,
  ARRAY['Burnout Recovery', 'Stress Management', 'Boundary Setting', 'Work-Life Balance'],
  ARRAY['Sustainable practices', 'Boundary awareness', 'Value alignment', 'Mindful leadership'],
  ARRAY['Burnout', 'Work stress', 'Career transition', 'Leadership stress'],
  ARRAY['Active psychosis', 'Severe depression', 'Acute suicidal ideation'],
  'moderate',
  false,
  ARRAY['Acceptance and Commitment Therapy (ACT)', 'Mindfulness-Based Stress Reduction (MBSR)', 'Values-Based Action'],
  true
),
(
  'grief-healing',
  'Sacred Journey: Grief & Loss Healing',
  'grief-healing',
  'A 21-day compassionate program supporting individuals through grief and loss using evidence-based approaches including grief therapy, mindfulness, and creative expression.',
  'Compassionate grief support through evidence-based healing practices',
  21,
  ARRAY['Grief Processing', 'Loss Integration', 'Meaning Making', 'Creative Expression'],
  ARRAY['Compassionate presence', 'Meaning making', 'Creative expression', 'Community support'],
  ARRAY['Bereavement', 'Loss', 'Complicated grief', 'Anticipatory grief'],
  ARRAY['Active suicidal ideation', 'Severe psychosis', 'Active substance abuse'],
  'moderate',
  true,
  ARRAY['Grief Therapy', 'Narrative Therapy', 'Expressive Arts Therapy', 'Mindfulness-Based Approaches'],
  true
);

-- Now populate retreat activities with comprehensive daily content
-- Stress Recovery Retreat (7 days, 2 sessions per day)
INSERT INTO public.retreat_activities (
  retreat_id, day_number, time_slot, activity_name, activity_type, 
  description, instructions, duration_minutes, evidence_base, 
  trauma_considerations, difficulty_level
) VALUES 
-- Day 1: Foundation & Assessment
('stress-recovery', 1, 'morning', 'Welcome & Stress Assessment', 'reflection',
 'Comprehensive welcome session including stress level assessment and program orientation.',
 'Complete initial stress questionnaires, set intentions, and learn about the program structure.',
 45, 'Perceived Stress Scale (PSS), evidence-based stress assessment tools',
 ARRAY['Gentle introduction', 'Choice and consent emphasized', 'Safe space creation'],
 'beginner'),
('stress-recovery', 1, 'evening', 'Introduction to Mindful Breathing', 'mindfulness',
 'Learn foundational breathing techniques for immediate stress relief.',
 'Practice 4-7-8 breathing, box breathing, and natural breath awareness in comfortable position.',
 30, 'Mindfulness-Based Stress Reduction (MBSR) breathing protocols',
 ARRAY['Option to keep eyes open', 'Permission to adjust position', 'No forced breathing'],
 'beginner'),

-- Day 2: Body Awareness
('stress-recovery', 2, 'morning', 'Body Scan for Stress Release', 'mindfulness',
 'Progressive body scan meditation to identify and release physical tension.',
 'Guided body scan from toes to head, noticing sensations without judgment.',
 35, 'MBSR body scan meditation protocol',
 ARRAY['Option to skip uncomfortable areas', 'Permission to move as needed'],
 'beginner'),
('stress-recovery', 2, 'evening', 'Gentle Movement Therapy', 'movement',
 'Trauma-informed gentle movement to release stored stress in the body.',
 'Simple stretches, gentle yoga poses, and intuitive movement guided by body wisdom.',
 40, 'Trauma-Sensitive Yoga principles',
 ARRAY['All movements optional', 'Stop anytime', 'Listen to body signals'],
 'beginner'),

-- Day 3: Cognitive Awareness
('stress-recovery', 3, 'morning', 'Stress Thought Patterns Recognition', 'reflection',
 'Identify and understand personal stress-inducing thought patterns.',
 'Journal about stress triggers, notice thought patterns, learn cognitive awareness techniques.',
 40, 'Cognitive Behavioral Therapy (CBT) thought monitoring',
 ARRAY['No judgment of thoughts', 'Observation only', 'Self-compassion emphasized'],
 'intermediate'),
('stress-recovery', 3, 'evening', 'Progressive Muscle Relaxation', 'healing',
 'Evidence-based muscle relaxation technique for deep stress release.',
 'Systematic tensing and releasing of muscle groups with guided instruction.',
 30, 'Jacobson Progressive Muscle Relaxation protocol',
 ARRAY['Option to skip muscle tension', 'Focus on release only if needed'],
 'beginner'),

-- Day 4: Emotional Regulation
('stress-recovery', 4, 'morning', 'Mindful Emotional Awareness', 'mindfulness',
 'Develop skills to observe and regulate emotions mindfully.',
 'Practice RAIN technique (Recognize, Allow, Investigate, Nurture) with current emotions.',
 35, 'Mindfulness-Based Emotional Regulation techniques',
 ARRAY['No forced emotional processing', 'Permission to pause anytime'],
 'intermediate'),
('stress-recovery', 4, 'evening', 'Stress-Relief Visualization', 'healing',
 'Guided imagery for deep relaxation and stress relief.',
 'Peaceful place visualization with all senses engaged for deep relaxation.',
 25, 'Clinical guided imagery protocols for stress reduction',
 ARRAY['Create own safe place', 'Option to keep eyes open'],
 'beginner'),

-- Day 5: Resilience Building
('stress-recovery', 5, 'morning', 'Building Stress Resilience', 'reflection',
 'Learn evidence-based strategies for long-term stress resilience.',
 'Explore personal resilience factors, create resilience toolkit, practice stress inoculation.',
 45, 'Stress Inoculation Training (SIT) principles',
 ARRAY['Focus on existing strengths', 'Gradual skill building'],
 'intermediate'),
('stress-recovery', 5, 'evening', 'Nature Connection Practice', 'nature',
 'Connect with nature for natural stress relief and grounding.',
 'Mindful nature observation, earthing practice, or indoor nature meditation.',
 30, 'Ecotherapy and nature-based stress reduction research',
 ARRAY['Indoor alternatives available', 'Adapt to comfort level'],
 'beginner'),

-- Day 6: Integration
('stress-recovery', 6, 'morning', 'Mindful Daily Living', 'mindfulness',
 'Integrate mindfulness into daily activities and routines.',
 'Practice mindful eating, walking, and routine activities with full attention.',
 40, 'Mindfulness in daily life applications from MBSR',
 ARRAY['Choose familiar activities', 'No performance pressure'],
 'intermediate'),
('stress-recovery', 6, 'evening', 'Self-Compassion Practice', 'healing',
 'Develop self-compassion skills for stress recovery and prevention.',
 'Learn Kristin Neff self-compassion practices including self-kindness meditation.',
 35, 'Mindful Self-Compassion (MSC) evidence-based practices',
 ARRAY['Gentle approach to self-relationship', 'No forced forgiveness'],
 'intermediate'),

-- Day 7: Completion & Future Planning
('stress-recovery', 7, 'morning', 'Personal Stress Management Plan', 'reflection',
 'Create personalized, sustainable stress management plan for ongoing wellness.',
 'Review learned techniques, identify favorites, create daily/weekly practice schedule.',
 50, 'Behavior change and maintenance strategies from health psychology',
 ARRAY['Realistic goal setting', 'Built-in flexibility'],
 'intermediate'),
('stress-recovery', 7, 'evening', 'Gratitude & Completion Ceremony', 'reflection',
 'Celebrate progress and set intentions for continued growth.',
 'Reflect on journey, express gratitude, set future intentions in ceremonial format.',
 30, 'Gratitude practice research and completion ritual benefits',
 ARRAY['Participate at comfort level', 'Honor all experiences'],
 'beginner');

-- Add similar comprehensive content for other retreats
-- Anxiety Relief Retreat (10 days, 2 sessions per day)
INSERT INTO public.retreat_activities (
  retreat_id, day_number, time_slot, activity_name, activity_type,
  description, instructions, duration_minutes, evidence_base,
  trauma_considerations, difficulty_level
) VALUES
-- Sample days for anxiety retreat (would continue for all 10 days)
('anxiety-relief', 1, 'morning', 'Anxiety Assessment & Psychoeducation', 'reflection',
 'Comprehensive anxiety assessment and education about anxiety mechanisms.',
 'Complete GAD-7, learn about anxiety physiology, understand fight-flight-freeze responses.',
 50, 'GAD-7 validated assessment, CBT anxiety psychoeducation',
 ARRAY['Normalize anxiety responses', 'Non-pathologizing language'],
 'beginner'),
('anxiety-relief', 1, 'evening', 'Basic Anxiety Breathing Techniques', 'mindfulness',
 'Learn specific breathing techniques proven effective for anxiety management.',
 'Practice diaphragmatic breathing, coherent breathing, and anxiety-specific breath work.',
 30, 'Heart Rate Variability research, anxiety-specific breathing protocols',
 ARRAY['No forced breath holding', 'Option for natural breathing'],
 'beginner'),

('anxiety-relief', 2, 'morning', 'Cognitive Restructuring Basics', 'therapy',
 'Learn to identify and challenge anxiety-provoking thoughts.',
 'Practice thought records, identify cognitive distortions, learn balanced thinking.',
 45, 'Cognitive Behavioral Therapy (CBT) for anxiety disorders',
 ARRAY['No judgment of thoughts', 'Gentle challenging approach'],
 'intermediate'),
('anxiety-relief', 2, 'evening', 'Progressive Exposure Planning', 'therapy',
 'Create personalized exposure hierarchy for gradual anxiety reduction.',
 'Identify fear triggers, rank by intensity, create step-by-step exposure plan.',
 40, 'Exposure and Response Prevention (ERP) protocols',
 ARRAY['Full control over exposure pace', 'Start with imagination only'],
 'intermediate');

-- Depression Support Retreat (14 days, 1-2 sessions per day)
INSERT INTO public.retreat_activities (
  retreat_id, day_number, time_slot, activity_name, activity_type,
  description, instructions, duration_minutes, evidence_base,
  trauma_considerations, difficulty_level
) VALUES
('depression-support', 1, 'morning', 'Depression Assessment & Hope Building', 'reflection',
 'Gentle assessment and introduction to hope-based recovery approach.',
 'Complete PHQ-9, explore personal strengths, introduce behavioral activation concepts.',
 45, 'PHQ-9 validated assessment, Behavioral Activation Therapy principles',
 ARRAY['Strength-based approach', 'Honor current capacity'],
 'beginner'),
('depression-support', 1, 'evening', 'Gentle Mindfulness Introduction', 'mindfulness',
 'Very gentle introduction to mindfulness for depression.',
 'Simple breath awareness, loving-kindness for self, brief body awareness.',
 25, 'Mindfulness-Based Cognitive Therapy (MBCT) depression protocols',
 ARRAY['Very short sessions', 'Option to rest instead'],
 'beginner'),

('depression-support', 2, 'morning', 'Activity Scheduling Basics', 'reflection',
 'Learn behavioral activation through pleasant activity scheduling.',
 'Identify previously enjoyed activities, schedule one small pleasant activity.',
 35, 'Behavioral Activation Therapy (BAT) for depression',
 ARRAY['Very small steps', 'No pressure for enjoyment'],
 'beginner');

-- Add trigger to ensure data quality
CREATE OR REPLACE FUNCTION validate_retreat_activity_content()
RETURNS TRIGGER AS $$
BEGIN
  -- Ensure all activities have evidence base
  IF NEW.evidence_base IS NULL OR NEW.evidence_base = '' THEN
    RAISE EXCEPTION 'All retreat activities must have evidence-based foundation documented';
  END IF;
  
  -- Ensure trauma considerations are documented
  IF NEW.trauma_considerations IS NULL OR ARRAY_LENGTH(NEW.trauma_considerations, 1) = 0 THEN
    RAISE EXCEPTION 'All activities must document trauma-informed considerations';
  END IF;
  
  -- Ensure appropriate session duration (15-60 minutes)
  IF NEW.duration_minutes < 15 OR NEW.duration_minutes > 60 THEN
    RAISE EXCEPTION 'Activity duration must be between 15-60 minutes for optimal engagement';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER validate_activity_content
  BEFORE INSERT OR UPDATE ON public.retreat_activities
  FOR EACH ROW
  EXECUTE FUNCTION validate_retreat_activity_content();