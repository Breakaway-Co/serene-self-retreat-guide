-- Add Life Upgrade and Wisdom Development retreats to retreat_configurations table

-- Life Upgrade Retreat
INSERT INTO retreat_configurations (
  id,
  name,
  slug,
  description,
  short_description,
  duration_days,
  focus_areas,
  principles,
  target_conditions,
  contraindications,
  risk_level,
  requires_supervision,
  evidence_based_therapies,
  is_active
) VALUES (
  gen_random_uuid(),
  'Life Upgrade: 6-Step Transformation Journey',
  'life_upgrade',
  'A structured 14-day retreat integrating the 6 Step Upgrade Process and Belief System Upgrade practices. Transform limiting beliefs into empowering truths while building sustainable life changes through trauma-informed, evidence-based methods.',
  'Transform your belief systems and upgrade your life through gentle, structured practices',
  14,
  ARRAY['Belief System Transformation', 'Life Upgrade Process', 'Self-Compassion', 'Sustainable Change', 'Personal Empowerment', 'Emotional Regulation'],
  ARRAY['Trauma-informed practice with emotional safety', 'Gentle, self-paced progression', 'Evidence-based cognitive restructuring', 'Integration of learning into daily life', 'Self-compassion as foundation', 'Sustainable behavioral change'],
  ARRAY['Limiting beliefs', 'Low self-esteem', 'Perfectionism', 'Self-sabotage patterns', 'Fear of change', 'Imposter syndrome'],
  ARRAY['Active psychosis', 'Severe dissociative disorders without professional support', 'Current suicidal ideation requiring immediate intervention'],
  'low',
  false,
  ARRAY['Cognitive Behavioral Therapy (CBT)', 'Acceptance and Commitment Therapy (ACT)', 'Emotional Freedom Technique (EFT)', 'Mindfulness-Based Cognitive Therapy', 'Self-Compassion Therapy'],
  true
);

-- Inner Wisdom Retreat
INSERT INTO retreat_configurations (
  id,
  name,
  slug,
  description,
  short_description,
  duration_days,
  focus_areas,
  principles,
  target_conditions,
  contraindications,
  risk_level,
  requires_supervision,
  evidence_based_therapies,
  is_active
) VALUES (
  gen_random_uuid(),
  'Inner Wisdom: The Method & Wisdom Development Journey',
  'wisdom_development',
  'A transformative 21-day retreat integrating The Method and Wisdom Development Model. Cultivate deep inner knowing, develop intuitive intelligence, and access your innate wisdom through trauma-informed, evidence-based practices rooted in mindfulness and self-inquiry.',
  'Awaken your inner wisdom and develop intuitive intelligence through guided self-discovery',
  21,
  ARRAY['Inner Wisdom Development', 'Intuitive Intelligence', 'Self-Trust Building', 'Mindful Awareness', 'Authentic Decision-Making', 'Life Purpose Clarity'],
  ARRAY['Wisdom is innate and accessible to all', 'Trauma-informed gentle inquiry', 'Body wisdom integration', 'Non-judgmental self-exploration', 'Sustainable practice development', 'Integration of head, heart, and gut intelligence'],
  ARRAY['Disconnection from self', 'Decision-making difficulty', 'Lack of direction', 'Over-reliance on external validation', 'Confusion about life purpose', 'Intuition blocks'],
  ARRAY['Active psychosis without professional support', 'Severe dissociation requiring clinical care', 'Acute suicidal crisis'],
  'low',
  false,
  ARRAY['Mindfulness-Based Stress Reduction (MBSR)', 'Internal Family Systems (IFS)', 'Somatic Experiencing', 'Emotional Freedom Technique (EFT)', 'Contemplative Practice', 'Intuitive Development Methods'],
  true
);