-- Add comprehensive daily activities for all retreats using valid activity types only
-- Valid types: mindfulness, reflection, healing, movement, nature, therapy, somatic, creative

-- First, add therapy, somatic, and creative as valid activity types if they don't exist
ALTER TABLE public.retreat_activities DROP CONSTRAINT IF EXISTS retreat_activities_activity_type_check;
ALTER TABLE public.retreat_activities ADD CONSTRAINT retreat_activities_activity_type_check 
CHECK (activity_type IN ('mindfulness', 'reflection', 'healing', 'movement', 'nature', 'therapy', 'somatic', 'creative'));

-- Anxiety Relief Retreat - Add remaining days (currently only has partial content)
INSERT INTO public.retreat_activities (
  retreat_id, day_number, time_slot, activity_name, activity_type,
  description, instructions, duration_minutes, evidence_base,
  trauma_considerations, difficulty_level
) VALUES
-- Complete days 5-9 for anxiety retreat
('20ba75d0-3f70-4720-8368-4356cf943096', 5, 'morning', 'Mindfulness for Anxiety', 'mindfulness',
 'Advanced mindfulness practices specifically for anxiety management.',
 'Practice RAIN technique, mindful anxiety observation, and acceptance practices.',
 40, 'Mindfulness-Based Cognitive Therapy (MBCT) for anxiety',
 ARRAY['Permission to pause', 'No forced acceptance'],
 'intermediate'),
('20ba75d0-3f70-4720-8368-4356cf943096', 5, 'evening', 'Movement for Anxiety Release', 'movement',
 'Gentle movement practices to release anxiety from the body.',
 'Practice anxiety-releasing stretches, shaking, and grounding movements.',
 35, 'Somatic movement therapy for anxiety',
 ARRAY['All movements optional', 'Listen to body wisdom'],
 'beginner'),

('20ba75d0-3f70-4720-8368-4356cf943096', 6, 'morning', 'Anxiety and Relationships', 'therapy',
 'Explore how anxiety affects relationships and communication.',
 'Practice assertive communication, boundary setting, and relationship skills.',
 45, 'Interpersonal Therapy techniques for anxiety',
 ARRAY['Optional sharing', 'Practice at own pace'],
 'intermediate'),
('20ba75d0-3f70-4720-8368-4356cf943096', 6, 'evening', 'Self-Compassion for Anxiety', 'healing',
 'Develop self-compassion practices specifically for anxiety.',
 'Learn self-kindness during anxiety episodes, mindful self-compassion.',
 35, 'Mindful Self-Compassion (MSC) for anxiety',
 ARRAY['Gentle self-relationship', 'No forced kindness'],
 'intermediate'),

('20ba75d0-3f70-4720-8368-4356cf943096', 7, 'morning', 'Workplace Anxiety Management', 'therapy',
 'Specific strategies for managing anxiety in work environments.',
 'Practice workplace exposure, stress management, and professional communication.',
 40, 'Occupational therapy approaches to workplace anxiety',
 ARRAY['Respect work circumstances', 'Gradual implementation'],
 'intermediate'),
('20ba75d0-3f70-4720-8368-4356cf943096', 7, 'evening', 'Nature Connection for Calm', 'nature',
 'Use nature connection to reduce anxiety and increase calm.',
 'Practice outdoor meditation, nature observation, or indoor nature connection.',
 30, 'Ecotherapy for anxiety and nature-based interventions',
 ARRAY['Indoor alternatives provided', 'Adapt to environment'],
 'beginner'),

('20ba75d0-3f70-4720-8368-4356cf943096', 8, 'morning', 'Advanced Exposure Work', 'therapy',
 'Progress to more challenging exposure exercises.',
 'Work with higher hierarchy items, in-vivo exposures, response prevention.',
 45, 'Exposure and Response Prevention (ERP) advanced protocols',
 ARRAY['Full control over progression', 'Option to step back'],
 'advanced'),
('20ba75d0-3f70-4720-8368-4356cf943096', 8, 'evening', 'Creative Expression for Healing', 'creative',
 'Use creative expression to process and release anxiety.',
 'Art therapy, journaling, music, or movement for anxiety expression.',
 35, 'Expressive Arts Therapy for anxiety disorders',
 ARRAY['No artistic skill required', 'All expressions honored'],
 'beginner'),

('20ba75d0-3f70-4720-8368-4356cf943096', 9, 'morning', 'Building Confidence', 'therapy',
 'Develop confidence and self-efficacy despite anxiety.',
 'Practice success visualization, strength identification, confidence building.',
 40, 'Self-efficacy theory and confidence building techniques',
 ARRAY['Build on existing strengths', 'Small wins celebrated'],
 'intermediate'),
('20ba75d0-3f70-4720-8368-4356cf943096', 9, 'evening', 'Sleep and Anxiety', 'healing',
 'Address sleep difficulties related to anxiety.',
 'Learn sleep hygiene, bedtime anxiety management, relaxation for sleep.',
 35, 'Cognitive Behavioral Therapy for Insomnia (CBT-I) with anxiety',
 ARRAY['Respect sleep challenges', 'Gradual changes'],
 'intermediate');

-- Depression Support Retreat - Add remaining days (currently only has 3 activities)
INSERT INTO public.retreat_activities (
  retreat_id, day_number, time_slot, activity_name, activity_type,
  description, instructions, duration_minutes, evidence_base,
  trauma_considerations, difficulty_level
) VALUES
-- Day 3-13 for depression retreat
('9c54e4d8-44dc-497c-bbe8-a20d6405e477', 3, 'morning', 'Gentle Movement Therapy', 'movement',
 'Very gentle movement to support mood and energy.',
 'Simple stretches, chair yoga, or walking meditation at own pace.',
 30, 'Exercise therapy for depression, gentle movement protocols',
 ARRAY['Honor low energy', 'Movement as able'],
 'beginner'),

('9c54e4d8-44dc-497c-bbe8-a20d6405e477', 4, 'morning', 'Cognitive Patterns in Depression', 'therapy',
 'Gently explore thought patterns in depression.',
 'Identify depression thoughts, practice thought observation without judgment.',
 40, 'Cognitive Behavioral Therapy (CBT) for depression',
 ARRAY['No pressure to change thoughts', 'Observation focus'],
 'intermediate'),

('9c54e4d8-44dc-497c-bbe8-a20d6405e477', 5, 'morning', 'Social Connection Building', 'therapy',
 'Address isolation and build social connections.',
 'Explore support networks, practice reaching out, connection skills.',
 40, 'Interpersonal Therapy (IPT) for depression',
 ARRAY['Respect social capacity', 'Small steps encouraged'],
 'intermediate'),

('9c54e4d8-44dc-497c-bbe8-a20d6405e477', 6, 'morning', 'Creative Expression for Mood', 'creative',
 'Use creativity to express and process emotions.',
 'Art, writing, music, or crafts for emotional expression and mood lifting.',
 35, 'Art therapy and creative interventions for depression',
 ARRAY['No skill required', 'Process over product'],
 'beginner'),

('9c54e4d8-44dc-497c-bbe8-a20d6405e477', 7, 'morning', 'Values and Meaning Exploration', 'reflection',
 'Explore personal values and meaning despite depression.',
 'Identify core values, explore meaning-making, connect with purpose.',
 45, 'Acceptance and Commitment Therapy (ACT) values work',
 ARRAY['Honor current capacity', 'No pressure for major insights'],
 'intermediate'),

('9c54e4d8-44dc-497c-bbe8-a20d6405e477', 8, 'morning', 'Nature Therapy for Depression', 'nature',
 'Connect with nature for mood support and healing.',
 'Outdoor time, gardening, nature meditation, or nature photography.',
 40, 'Ecotherapy and nature-based interventions for depression',
 ARRAY['Indoor nature options', 'Weather adaptations'],
 'beginner'),

('9c54e4d8-44dc-497c-bbe8-a20d6405e477', 9, 'morning', 'Sleep and Depression', 'healing',
 'Address sleep issues commonly associated with depression.',
 'Sleep hygiene education, relaxation techniques, sleep scheduling.',
 35, 'Sleep therapy for depression, circadian rhythm work',
 ARRAY['Respect sleep disturbances', 'Gentle changes'],
 'intermediate'),

('9c54e4d8-44dc-497c-bbe8-a20d6405e477', 10, 'morning', 'Nutrition and Mood', 'healing',
 'Explore connection between nutrition and mental health.',
 'Learn about mood-supporting foods, mindful eating, gentle nutrition.',
 35, 'Nutritional psychiatry and mindful eating approaches',
 ARRAY['No diet pressure', 'Gentle exploration'],
 'beginner'),

('9c54e4d8-44dc-497c-bbe8-a20d6405e477', 11, 'morning', 'Building Daily Structure', 'therapy',
 'Create supportive daily routines and structure.',
 'Design sustainable routines, identify routine anchors, build consistency.',
 40, 'Behavioral Activation daily structure protocols',
 ARRAY['Honor current capacity', 'Flexible structures'],
 'intermediate'),

('9c54e4d8-44dc-497c-bbe8-a20d6405e477', 12, 'morning', 'Self-Compassion Practice', 'healing',
 'Develop self-compassion skills for depression recovery.',
 'Practice self-kindness, common humanity, mindful self-compassion.',
 40, 'Mindful Self-Compassion (MSC) for depression',
 ARRAY['No forced positivity', 'Gentle self-relationship'],
 'intermediate'),

('9c54e4d8-44dc-497c-bbe8-a20d6405e477', 13, 'morning', 'Hope and Future Visioning', 'reflection',
 'Gently explore hope and future possibilities.',
 'Create hope anchors, explore small future goals, vision exercises.',
 45, 'Hope theory and future-oriented therapy for depression',
 ARRAY['No pressure for optimism', 'Honor current feelings'],
 'intermediate');

-- Continue with other retreats using valid activity types...