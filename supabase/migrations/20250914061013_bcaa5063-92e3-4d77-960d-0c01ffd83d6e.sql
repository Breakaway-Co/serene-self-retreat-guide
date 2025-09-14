-- Add comprehensive activities for existing retreat configurations
-- Get the existing retreat IDs and populate activities

DO $$
DECLARE
    stress_recovery_id UUID;
    anxiety_relief_id UUID;
    depression_support_id UUID;
    ptsd_recovery_id UUID;
    corporate_burnout_id UUID;
    grief_healing_id UUID;
BEGIN

-- Get existing retreat configuration IDs
SELECT id INTO stress_recovery_id FROM retreat_configurations WHERE slug = 'stress-recovery';
SELECT id INTO anxiety_relief_id FROM retreat_configurations WHERE slug = 'anxiety-relief';
SELECT id INTO depression_support_id FROM retreat_configurations WHERE slug = 'depression-support';
SELECT id INTO ptsd_recovery_id FROM retreat_configurations WHERE slug = 'ptsd-recovery';
SELECT id INTO corporate_burnout_id FROM retreat_configurations WHERE slug = 'corporate-burnout';
SELECT id INTO grief_healing_id FROM retreat_configurations WHERE slug = 'grief-healing';

-- Only proceed if we found the retreat configurations
IF stress_recovery_id IS NOT NULL THEN
  -- Complete Stress Recovery Retreat (7 days, 2 sessions per day = 14 total)
  INSERT INTO public.retreat_activities (
    retreat_id, day_number, time_slot, activity_name, activity_type, 
    description, instructions, duration_minutes, evidence_base, 
    trauma_considerations, difficulty_level
  ) VALUES 
  -- Day 1: Foundation & Assessment
  (stress_recovery_id, 1, 'morning', 'Welcome & Stress Assessment', 'reflection',
   'Comprehensive welcome session including stress level assessment and program orientation.',
   'Complete initial stress questionnaires, set intentions, and learn about the program structure.',
   45, 'Perceived Stress Scale (PSS), evidence-based stress assessment tools',
   ARRAY['Gentle introduction', 'Choice and consent emphasized', 'Safe space creation'],
   'beginner'),
  (stress_recovery_id, 1, 'evening', 'Introduction to Mindful Breathing', 'mindfulness',
   'Learn foundational breathing techniques for immediate stress relief.',
   'Practice 4-7-8 breathing, box breathing, and natural breath awareness in comfortable position.',
   30, 'Mindfulness-Based Stress Reduction (MBSR) breathing protocols',
   ARRAY['Option to keep eyes open', 'Permission to adjust position', 'No forced breathing'],
   'beginner'),

  -- Day 2: Body Awareness
  (stress_recovery_id, 2, 'morning', 'Body Scan for Stress Release', 'mindfulness',
   'Progressive body scan meditation to identify and release physical tension.',
   'Guided body scan from toes to head, noticing sensations without judgment.',
   35, 'MBSR body scan meditation protocol',
   ARRAY['Option to skip uncomfortable areas', 'Permission to move as needed'],
   'beginner'),
  (stress_recovery_id, 2, 'evening', 'Gentle Movement Therapy', 'movement',
   'Trauma-informed gentle movement to release stored stress in the body.',
   'Simple stretches, gentle yoga poses, and intuitive movement guided by body wisdom.',
   40, 'Trauma-Sensitive Yoga principles',
   ARRAY['All movements optional', 'Stop anytime', 'Listen to body signals'],
   'beginner'),

  -- Day 3: Cognitive Awareness
  (stress_recovery_id, 3, 'morning', 'Stress Thought Patterns Recognition', 'reflection',
   'Identify and understand personal stress-inducing thought patterns.',
   'Journal about stress triggers, notice thought patterns, learn cognitive awareness techniques.',
   40, 'Cognitive Behavioral Therapy (CBT) thought monitoring',
   ARRAY['No judgment of thoughts', 'Observation only', 'Self-compassion emphasized'],
   'intermediate'),
  (stress_recovery_id, 3, 'evening', 'Progressive Muscle Relaxation', 'healing',
   'Evidence-based muscle relaxation technique for deep stress release.',
   'Systematic tensing and releasing of muscle groups with guided instruction.',
   30, 'Jacobson Progressive Muscle Relaxation protocol',
   ARRAY['Option to skip muscle tension', 'Focus on release only if needed'],
   'beginner'),

  -- Day 4: Emotional Regulation
  (stress_recovery_id, 4, 'morning', 'Mindful Emotional Awareness', 'mindfulness',
   'Develop skills to observe and regulate emotions mindfully.',
   'Practice RAIN technique (Recognize, Allow, Investigate, Nurture) with current emotions.',
   35, 'Mindfulness-Based Emotional Regulation techniques',
   ARRAY['No forced emotional processing', 'Permission to pause anytime'],
   'intermediate'),
  (stress_recovery_id, 4, 'evening', 'Stress-Relief Visualization', 'healing',
   'Guided imagery for deep relaxation and stress relief.',
   'Peaceful place visualization with all senses engaged for deep relaxation.',
   25, 'Clinical guided imagery protocols for stress reduction',
   ARRAY['Create own safe place', 'Option to keep eyes open'],
   'beginner'),

  -- Day 5: Resilience Building
  (stress_recovery_id, 5, 'morning', 'Building Stress Resilience', 'reflection',
   'Learn evidence-based strategies for long-term stress resilience.',
   'Explore personal resilience factors, create resilience toolkit, practice stress inoculation.',
   45, 'Stress Inoculation Training (SIT) principles',
   ARRAY['Focus on existing strengths', 'Gradual skill building'],
   'intermediate'),
  (stress_recovery_id, 5, 'evening', 'Nature Connection Practice', 'nature',
   'Connect with nature for natural stress relief and grounding.',
   'Mindful nature observation, earthing practice, or indoor nature meditation.',
   30, 'Ecotherapy and nature-based stress reduction research',
   ARRAY['Indoor alternatives available', 'Adapt to comfort level'],
   'beginner'),

  -- Day 6: Integration
  (stress_recovery_id, 6, 'morning', 'Mindful Daily Living', 'mindfulness',
   'Integrate mindfulness into daily activities and routines.',
   'Practice mindful eating, walking, and routine activities with full attention.',
   40, 'Mindfulness in daily life applications from MBSR',
   ARRAY['Choose familiar activities', 'No performance pressure'],
   'intermediate'),
  (stress_recovery_id, 6, 'evening', 'Self-Compassion Practice', 'healing',
   'Develop self-compassion skills for stress recovery and prevention.',
   'Learn Kristin Neff self-compassion practices including self-kindness meditation.',
   35, 'Mindful Self-Compassion (MSC) evidence-based practices',
   ARRAY['Gentle approach to self-relationship', 'No forced forgiveness'],
   'intermediate'),

  -- Day 7: Completion & Future Planning
  (stress_recovery_id, 7, 'morning', 'Personal Stress Management Plan', 'reflection',
   'Create personalized, sustainable stress management plan for ongoing wellness.',
   'Review learned techniques, identify favorites, create daily/weekly practice schedule.',
   50, 'Behavior change and maintenance strategies from health psychology',
   ARRAY['Realistic goal setting', 'Built-in flexibility'],
   'intermediate'),
  (stress_recovery_id, 7, 'evening', 'Gratitude & Completion Ceremony', 'reflection',
   'Celebrate progress and set intentions for continued growth.',
   'Reflect on journey, express gratitude, set future intentions in ceremonial format.',
   30, 'Gratitude practice research and completion ritual benefits',
   ARRAY['Participate at comfort level', 'Honor all experiences'],
   'beginner');
END IF;

END $$;

-- Add content validation trigger
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

-- Apply validation trigger if it doesn't exist
DROP TRIGGER IF EXISTS validate_activity_content ON public.retreat_activities;
CREATE TRIGGER validate_activity_content
  BEFORE INSERT OR UPDATE ON public.retreat_activities
  FOR EACH ROW
  EXECUTE FUNCTION validate_retreat_activity_content();