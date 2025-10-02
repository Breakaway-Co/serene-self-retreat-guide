import { RetreatConfiguration } from '@/types/retreat';

export const ptsdRecoveryRetreat: RetreatConfiguration = {
  id: 'ptsd_recovery',
  name: 'Gentle Path: PTSD Recovery & Trauma Healing',
  description: 'A trauma-informed 21-day program designed to support PTSD recovery through gentle, evidence-based approaches including EMDR preparation, somatic healing, and nervous system regulation.',
  shortDescription: 'Trauma-informed PTSD recovery through gentle healing practices',
  duration: 21,
  focusAreas: ['Trauma Healing', 'PTSD Recovery', 'Nervous System Regulation', 'Safety Building', 'Somatic Healing'],
  principles: ['Trauma-Informed', 'Safety First', 'Client Choice', 'Somatic Awareness', 'Window of Tolerance'],
  targetConditions: ['PTSD', 'Complex Trauma', 'Trauma Symptoms', 'Hypervigilance', 'Emotional Dysregulation'],
  contraindications: ['Active Psychosis', 'Severe Dissociation', 'Active Suicidal Crisis', 'Severe Substance Withdrawal'],
  riskLevel: 'high',
  requiresSupervision: true,
  days: [
    {
      day: 1,
      theme: 'Safety & Grounding Foundation',
      focus: 'Establishing safety, grounding techniques, and trauma-informed awareness',
      morning: [
        { id: '1-safety-check', time: '8:00 AM', activity: 'Daily Safety Check-In', duration: '10 min', type: 'reflection', description: 'Assess current safety and readiness for the day' },
        { id: '1-grounding-breathwork', time: '8:15 AM', activity: 'Grounding Breathwork Practice', duration: '15 min', type: 'mindfulness', guideId: 'trauma-safe-breathing', modifications: ['Optional', 'Stop if triggered'] },
        { id: '1-nourishing-breakfast', time: '8:30 AM', activity: 'Nourishing Breakfast Ritual', duration: '30 min', type: 'nutrition', description: 'Nervous system supporting foods' },
        { id: '1-gentle-movement', time: '9:00 AM', activity: 'Trauma-Sensitive Movement', duration: '20 min', type: 'movement', modifications: ['Eyes open', 'Stop anytime', 'Chair-based options'] }
      ],
      afternoon: [
        { id: '1-mindful-lunch', time: '12:30 PM', activity: 'Mindful Lunch Preparation', duration: '30 min', type: 'nutrition' },
        { id: '1-window-tolerance', time: '1:30 PM', activity: 'Window of Tolerance Education', duration: '25 min', type: 'therapy', guideId: 'window-of-tolerance' },
        { id: '1-grounding-skills', time: '2:00 PM', activity: '5-4-3-2-1 Grounding Practice', duration: '15 min', type: 'healing', guideId: 'grounding-5432' },
        { id: '1-safe-place', time: '2:30 PM', activity: 'Safe Place Visualization', duration: '20 min', type: 'healing', guideId: 'safe-place-visualization' },
        { id: '1-nature-grounding', time: '3:00 PM', activity: 'Nature Grounding Walk', duration: '25 min', type: 'nature', modifications: ['Stay close to home', 'Bring support person'] }
      ],
      evening: [
        { id: '1-comfort-dinner', time: '6:30 PM', activity: 'Comfort Food Dinner', duration: '40 min', type: 'nutrition' },
        { id: '1-day-reflection', time: '7:30 PM', activity: 'Gentle Day Reflection', duration: '10 min', type: 'reflection' },
        { id: '1-restorative-practice', time: '8:00 PM', activity: 'Restorative Practice', duration: '25 min', type: 'healing' },
        { id: '1-sleep-safety', time: '9:00 PM', activity: 'Sleep Safety Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 2,
      theme: 'Body Awareness & Regulation',
      focus: 'Developing somatic awareness and nervous system regulation skills',
      morning: [
        { id: '2-body-check', time: '8:00 AM', activity: 'Gentle Body Check-In', duration: '12 min', type: 'somatic', modifications: ['Stop if overwhelming'] },
        { id: '2-regulation-breathing', time: '8:15 AM', activity: 'Nervous System Regulation Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '2-stabilizing-breakfast', time: '8:30 AM', activity: 'Blood Sugar Stabilizing Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '2-somatic-movement', time: '9:00 AM', activity: 'Somatic Movement Practice', duration: '25 min', type: 'somatic', guideId: 'trauma-somatic-movement' }
      ],
      afternoon: [
        { id: '2-grounding-lunch', time: '12:30 PM', activity: 'Grounding Lunch Practice', duration: '30 min', type: 'nutrition' },
        { id: '2-boundaries', time: '1:30 PM', activity: 'Healthy Boundaries Workshop', duration: '30 min', type: 'therapy', guideId: 'trauma-boundaries' },
        { id: '2-progressive-relaxation', time: '2:15 PM', activity: 'Trauma-Safe Progressive Relaxation', duration: '20 min', type: 'healing' },
        { id: '2-sensory-grounding', time: '2:45 PM', activity: 'Sensory Grounding Practice', duration: '15 min', type: 'healing' },
        { id: '2-gentle-nature', time: '3:15 PM', activity: 'Gentle Nature Connection', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '2-calming-dinner', time: '6:30 PM', activity: 'Calming Evening Meal', duration: '40 min', type: 'nutrition' },
        { id: '2-wins-tracking', time: '7:30 PM', activity: 'Small Wins Tracking', duration: '10 min', type: 'reflection' },
        { id: '2-gentle-yoga', time: '8:00 PM', activity: 'Trauma-Sensitive Gentle Yoga', duration: '30 min', type: 'movement' },
        { id: '2-body-gratitude', time: '9:00 PM', activity: 'Body Gratitude Practice', duration: '15 min', type: 'mindfulness' }
      ]
    },
    {
      day: 3,
      theme: 'Building Internal Resources',
      focus: 'Developing internal resources and self-soothing capabilities',
      morning: [
        { id: '3-resource-check', time: '8:00 AM', activity: 'Internal Resources Check-In', duration: '10 min', type: 'reflection' },
        { id: '3-bilateral-breathing', time: '8:15 AM', activity: 'Bilateral Breathing Exercise', duration: '15 min', type: 'mindfulness', guideId: 'bilateral-stimulation-practice' },
        { id: '3-recovery-breakfast', time: '8:30 AM', activity: 'Recovery-Supporting Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '3-strength-movement', time: '9:00 AM', activity: 'Gentle Strength Building', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '3-nourishing-lunch', time: '12:30 PM', activity: 'Self-Nourishing Lunch', duration: '30 min', type: 'nutrition' },
        { id: '3-resource-building', time: '1:30 PM', activity: 'Positive Resource Building', duration: '25 min', type: 'therapy', guideId: 'resource-building' },
        { id: '3-self-soothing', time: '2:00 PM', activity: 'Self-Soothing Toolkit', duration: '20 min', type: 'healing' },
        { id: '3-container-exercise', time: '2:30 PM', activity: 'Container Exercise for Difficult Feelings', duration: '20 min', type: 'healing' },
        { id: '3-peaceful-walk', time: '3:00 PM', activity: 'Peaceful Awareness Walk', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '3-comfort-dinner', time: '6:30 PM', activity: 'Comfort & Nourishment Dinner', duration: '40 min', type: 'nutrition' },
        { id: '3-gratitude-practice', time: '7:30 PM', activity: 'Gratitude for Progress', duration: '10 min', type: 'reflection' },
        { id: '3-gentle-stretching', time: '8:00 PM', activity: 'Gentle Evening Stretching', duration: '20 min', type: 'movement' },
        { id: '3-peaceful-meditation', time: '9:00 PM', activity: 'Peaceful Sleep Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 4,
      theme: 'Emotional Regulation Skills',
      focus: 'Learning skills to manage and regulate difficult emotions safely',
      morning: [
        { id: '4-emotion-check', time: '8:00 AM', activity: 'Gentle Emotion Check-In', duration: '10 min', type: 'reflection' },
        { id: '4-regulating-breath', time: '8:15 AM', activity: 'Emotion Regulating Breathwork', duration: '15 min', type: 'mindfulness' },
        { id: '4-balanced-breakfast', time: '8:30 AM', activity: 'Mood-Balancing Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '4-expressive-movement', time: '9:00 AM', activity: 'Gentle Expressive Movement', duration: '25 min', type: 'movement' }
      ],
      afternoon: [
        { id: '4-mindful-lunch', time: '12:30 PM', activity: 'Mindful Eating Practice', duration: '30 min', type: 'nutrition' },
        { id: '4-distress-tolerance', time: '1:30 PM', activity: 'Distress Tolerance Skills', duration: '25 min', type: 'therapy', guideId: 'distress-tolerance' },
        { id: '4-emotional-first-aid', time: '2:00 PM', activity: 'Emotional First Aid Kit', duration: '20 min', type: 'healing' },
        { id: '4-pendulation', time: '2:30 PM', activity: 'Pendulation Practice', duration: '15 min', type: 'somatic' },
        { id: '4-healing-walk', time: '3:00 PM', activity: 'Healing Nature Walk', duration: '30 min', type: 'nature' }
      ],
      evening: [
        { id: '4-soothing-dinner', time: '6:30 PM', activity: 'Soothing Evening Meal', duration: '40 min', type: 'nutrition' },
        { id: '4-emotion-journal', time: '7:30 PM', activity: 'Emotion Processing Journal', duration: '15 min', type: 'reflection' },
        { id: '4-calming-movement', time: '8:00 PM', activity: 'Calming Movement Practice', duration: '25 min', type: 'movement' },
        { id: '4-safe-meditation', time: '9:00 PM', activity: 'Safe Container Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 5,
      theme: 'Strengthening Support Systems',
      focus: 'Building and strengthening healthy relationships and support networks',
      morning: [
        { id: '5-connection-check', time: '8:00 AM', activity: 'Connection & Support Check', duration: '10 min', type: 'reflection' },
        { id: '5-heart-breathing', time: '8:15 AM', activity: 'Heart-Centered Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '5-connection-breakfast', time: '8:30 AM', activity: 'Connection-Focused Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '5-partner-movement', time: '9:00 AM', activity: 'Partner/Support Person Movement', duration: '20 min', type: 'movement', modifications: ['Can be done solo if preferred'] }
      ],
      afternoon: [
        { id: '5-social-lunch', time: '12:30 PM', activity: 'Social Connection Lunch', duration: '30 min', type: 'nutrition' },
        { id: '5-communication-skills', time: '1:30 PM', activity: 'Trauma-Informed Communication', duration: '30 min', type: 'therapy' },
        { id: '5-relationship-mapping', time: '2:15 PM', activity: 'Healthy Relationship Mapping', duration: '20 min', type: 'reflection' },
        { id: '5-co-regulation', time: '2:45 PM', activity: 'Co-Regulation Practice', duration: '15 min', type: 'healing' },
        { id: '5-group-nature', time: '3:15 PM', activity: 'Group Nature Activity', duration: '25 min', type: 'nature', modifications: ['Virtual group option available'] }
      ],
      evening: [
        { id: '5-shared-dinner', time: '6:30 PM', activity: 'Shared Meal Practice', duration: '40 min', type: 'nutrition' },
        { id: '5-connection-reflection', time: '7:30 PM', activity: 'Connection Reflection', duration: '15 min', type: 'reflection' },
        { id: '5-gentle-partner-yoga', time: '8:00 PM', activity: 'Gentle Partner Yoga', duration: '25 min', type: 'movement', modifications: ['Solo version available'] },
        { id: '5-loving-kindness', time: '9:00 PM', activity: 'Loving-Kindness Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 6,
      theme: 'Creative Expression & Healing',
      focus: 'Using creative expression as a pathway to healing and processing',
      morning: [
        { id: '6-creative-check', time: '8:00 AM', activity: 'Creative Energy Check-In', duration: '10 min', type: 'reflection' },
        { id: '6-flowing-breath', time: '8:15 AM', activity: 'Creative Flow Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '6-artist-breakfast', time: '8:30 AM', activity: 'Artist\'s Nourishing Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '6-creative-movement', time: '9:00 AM', activity: 'Creative Movement Expression', duration: '25 min', type: 'creative' }
      ],
      afternoon: [
        { id: '6-inspiration-lunch', time: '12:30 PM', activity: 'Inspiration-Fueling Lunch', duration: '30 min', type: 'nutrition' },
        { id: '6-art-therapy', time: '1:30 PM', activity: 'Trauma-Informed Art Therapy', duration: '35 min', type: 'creative', guideId: 'expressive-art-processing' },
        { id: '6-narrative-therapy', time: '2:15 PM', activity: 'Narrative Therapy Writing', duration: '25 min', type: 'creative' },
        { id: '6-music-healing', time: '2:50 PM', activity: 'Music for Healing', duration: '20 min', type: 'creative' },
        { id: '6-creative-nature', time: '3:20 PM', activity: 'Creative Nature Collection', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '6-creative-dinner', time: '6:30 PM', activity: 'Creative Dinner Preparation', duration: '40 min', type: 'nutrition' },
        { id: '6-expression-journal', time: '7:30 PM', activity: 'Creative Expression Journal', duration: '15 min', type: 'reflection' },
        { id: '6-dance-therapy', time: '8:00 PM', activity: 'Gentle Dance/Movement Therapy', duration: '25 min', type: 'creative' },
        { id: '6-visualization', time: '9:00 PM', activity: 'Creative Visualization', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 7,
      theme: 'Weekly Integration & Self-Compassion',
      focus: 'Integrating the week\'s learning with deep self-compassion practices',
      morning: [
        { id: '7-integration-check', time: '8:00 AM', activity: 'Weekly Integration Check', duration: '15 min', type: 'reflection' },
        { id: '7-compassion-breathing', time: '8:20 AM', activity: 'Self-Compassion Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '7-loving-breakfast', time: '8:40 AM', activity: 'Self-Love Breakfast Ritual', duration: '35 min', type: 'nutrition' },
        { id: '7-gentle-yoga', time: '9:20 AM', activity: 'Gentle Self-Compassion Yoga', duration: '30 min', type: 'movement' }
      ],
      afternoon: [
        { id: '7-nourishing-lunch', time: '12:30 PM', activity: 'Self-Nourishing Lunch', duration: '35 min', type: 'nutrition' },
        { id: '7-forgiveness-work', time: '1:15 PM', activity: 'Gentle Self-Forgiveness Practice', duration: '25 min', type: 'therapy' },
        { id: '7-body-appreciation', time: '1:50 PM', activity: 'Body Appreciation Practice', duration: '20 min', type: 'healing' },
        { id: '7-integration-walk', time: '2:20 PM', activity: 'Integration Nature Walk', duration: '30 min', type: 'nature' }
      ],
      evening: [
        { id: '7-celebration-dinner', time: '6:30 PM', activity: 'Week 1 Celebration Dinner', duration: '45 min', type: 'nutrition' },
        { id: '7-progress-reflection', time: '7:30 PM', activity: 'Progress & Growth Reflection', duration: '20 min', type: 'reflection' },
        { id: '7-gentle-stretch', time: '8:00 PM', activity: 'Loving Stretch Practice', duration: '25 min', type: 'movement' },
        { id: '7-compassion-meditation', time: '9:00 PM', activity: 'Self-Compassion Meditation', duration: '25 min', type: 'mindfulness' }
      ]
    },
    {
      day: 8,
      theme: 'Deeper Somatic Awareness',
      focus: 'Developing deeper connection with body wisdom and somatic healing',
      morning: [
        { id: '8-somatic-check', time: '8:00 AM', activity: 'Deep Somatic Check-In', duration: '12 min', type: 'somatic' },
        { id: '8-embodied-breathing', time: '8:15 AM', activity: 'Embodied Awareness Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '8-grounding-breakfast', time: '8:35 AM', activity: 'Grounding Foods Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '8-somatic-exploration', time: '9:10 AM', activity: 'Somatic Movement Exploration', duration: '25 min', type: 'somatic' }
      ],
      afternoon: [
        { id: '8-embodied-lunch', time: '12:30 PM', activity: 'Embodied Eating Practice', duration: '35 min', type: 'nutrition' },
        { id: '8-felt-sense', time: '1:15 PM', activity: 'Felt Sense Awareness', duration: '25 min', type: 'somatic', guideId: 'felt-sense-awareness' },
        { id: '8-titration', time: '1:50 PM', activity: 'Titration Practice', duration: '20 min', type: 'healing' },
        { id: '8-discharge-practice', time: '2:20 PM', activity: 'Gentle Discharge Practice', duration: '15 min', type: 'somatic' },
        { id: '8-earthing', time: '2:45 PM', activity: 'Earthing Practice', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '8-wholesome-dinner', time: '6:30 PM', activity: 'Wholesome Evening Meal', duration: '40 min', type: 'nutrition' },
        { id: '8-body-wisdom', time: '7:30 PM', activity: 'Body Wisdom Journaling', duration: '15 min', type: 'reflection' },
        { id: '8-restorative-yoga', time: '8:00 PM', activity: 'Restorative Yoga Practice', duration: '30 min', type: 'movement' },
        { id: '8-body-scan', time: '9:00 PM', activity: 'Loving Body Scan', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 9,
      theme: 'Working with Triggers Safely',
      focus: 'Learning to recognize and work with triggers in a safe, controlled way',
      morning: [
        { id: '9-trigger-awareness', time: '8:00 AM', activity: 'Trigger Awareness Check', duration: '10 min', type: 'reflection' },
        { id: '9-stabilizing-breath', time: '8:15 AM', activity: 'Stabilizing Breath Practice', duration: '15 min', type: 'mindfulness' },
        { id: '9-stable-breakfast', time: '8:35 AM', activity: 'Stabilizing Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '9-grounding-movement', time: '9:10 AM', activity: 'Grounding Movement Practice', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '9-mindful-lunch', time: '12:30 PM', activity: 'Mindful Trigger-Free Lunch', duration: '30 min', type: 'nutrition' },
        { id: '9-trigger-education', time: '1:15 PM', activity: 'Understanding Triggers Workshop', duration: '30 min', type: 'therapy', guideId: 'trigger-education' },
        { id: '9-safety-planning', time: '1:55 PM', activity: 'Trigger Safety Planning', duration: '25 min', type: 'therapy' },
        { id: '9-quick-grounding', time: '2:30 PM', activity: 'Quick Grounding Techniques', duration: '15 min', type: 'healing' },
        { id: '9-safe-space-walk', time: '2:55 PM', activity: 'Safe Space Nature Walk', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '9-calming-dinner', time: '6:30 PM', activity: 'Calming Dinner Ritual', duration: '40 min', type: 'nutrition' },
        { id: '9-trigger-journal', time: '7:30 PM', activity: 'Trigger Awareness Journal', duration: '15 min', type: 'reflection' },
        { id: '9-releasing-yoga', time: '8:00 PM', activity: 'Tension Releasing Yoga', duration: '25 min', type: 'movement' },
        { id: '9-safety-meditation', time: '9:00 PM', activity: 'Safety & Protection Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 10,
      theme: 'Building Resilience',
      focus: 'Strengthening resilience and post-traumatic growth capacity',
      morning: [
        { id: '10-resilience-check', time: '8:00 AM', activity: 'Resilience Assessment', duration: '12 min', type: 'reflection' },
        { id: '10-power-breathing', time: '8:15 AM', activity: 'Resilience Power Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '10-strength-breakfast', time: '8:35 AM', activity: 'Strength-Building Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '10-empowerment-movement', time: '9:10 AM', activity: 'Empowerment Movement', duration: '25 min', type: 'movement' }
      ],
      afternoon: [
        { id: '10-resilient-lunch', time: '12:30 PM', activity: 'Resilient Living Lunch', duration: '30 min', type: 'nutrition' },
        { id: '10-growth-mindset', time: '1:15 PM', activity: 'Post-Traumatic Growth Exploration', duration: '30 min', type: 'therapy' },
        { id: '10-strength-mapping', time: '1:55 PM', activity: 'Personal Strengths Mapping', duration: '20 min', type: 'reflection' },
        { id: '10-victory-practice', time: '2:25 PM', activity: 'Victory Posture Practice', duration: '15 min', type: 'healing' },
        { id: '10-challenge-walk', time: '2:50 PM', activity: 'Challenge & Overcome Walk', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '10-warrior-dinner', time: '6:30 PM', activity: 'Inner Warrior Dinner', duration: '40 min', type: 'nutrition' },
        { id: '10-courage-journal', time: '7:30 PM', activity: 'Courage & Strength Journal', duration: '15 min', type: 'reflection' },
        { id: '10-warrior-yoga', time: '8:00 PM', activity: 'Gentle Warrior Yoga', duration: '30 min', type: 'movement' },
        { id: '10-empowerment-meditation', time: '9:00 PM', activity: 'Empowerment Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 11,
      theme: 'Healthy Intimacy & Trust',
      focus: 'Rebuilding capacity for healthy intimacy and trust in relationships',
      morning: [
        { id: '11-trust-check', time: '8:00 AM', activity: 'Trust & Safety Check-In', duration: '10 min', type: 'reflection' },
        { id: '11-heart-opening-breath', time: '8:15 AM', activity: 'Gentle Heart-Opening Breathwork', duration: '15 min', type: 'mindfulness' },
        { id: '11-bonding-breakfast', time: '8:35 AM', activity: 'Bonding & Connection Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '11-trust-movement', time: '9:10 AM', activity: 'Trust-Building Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '11-connecting-lunch', time: '12:30 PM', activity: 'Connecting Lunch Practice', duration: '30 min', type: 'nutrition' },
        { id: '11-healthy-intimacy', time: '1:15 PM', activity: 'Healthy Intimacy Education', duration: '30 min', type: 'therapy' },
        { id: '11-boundary-practice', time: '1:55 PM', activity: 'Intimate Boundary Practice', duration: '20 min', type: 'therapy' },
        { id: '11-trust-building', time: '2:25 PM', activity: 'Trust-Building Exercise', duration: '20 min', type: 'healing' },
        { id: '11-partnership-walk', time: '2:55 PM', activity: 'Partnership Nature Walk', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '11-intimate-dinner', time: '6:30 PM', activity: 'Intimate Connection Dinner', duration: '45 min', type: 'nutrition' },
        { id: '11-relationship-journal', time: '7:30 PM', activity: 'Relationship Growth Journal', duration: '15 min', type: 'reflection' },
        { id: '11-partner-massage', time: '8:00 PM', activity: 'Gentle Partner Massage', duration: '25 min', type: 'healing', modifications: ['Self-massage if solo'] },
        { id: '11-connection-meditation', time: '9:00 PM', activity: 'Connection Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 12,
      theme: 'Spiritual Reconnection',
      focus: 'Reconnecting with spiritual practices and meaning-making',
      morning: [
        { id: '12-spiritual-check', time: '8:00 AM', activity: 'Spiritual Connection Check', duration: '10 min', type: 'reflection' },
        { id: '12-sacred-breathing', time: '8:15 AM', activity: 'Sacred Breath Practice', duration: '15 min', type: 'mindfulness' },
        { id: '12-sacred-breakfast', time: '8:35 AM', activity: 'Sacred Morning Meal', duration: '30 min', type: 'nutrition' },
        { id: '12-spiritual-movement', time: '9:10 AM', activity: 'Spiritual Movement Practice', duration: '25 min', type: 'movement' }
      ],
      afternoon: [
        { id: '12-mindful-lunch', time: '12:30 PM', activity: 'Mindful Sacred Lunch', duration: '30 min', type: 'nutrition' },
        { id: '12-meaning-making', time: '1:15 PM', activity: 'Meaning-Making Workshop', duration: '30 min', type: 'therapy' },
        { id: '12-prayer-meditation', time: '1:55 PM', activity: 'Prayer/Meditation Practice', duration: '25 min', type: 'mindfulness' },
        { id: '12-forgiveness', time: '2:30 PM', activity: 'Gentle Forgiveness Practice', duration: '20 min', type: 'healing' },
        { id: '12-sacred-walk', time: '3:00 PM', activity: 'Sacred Nature Walk', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '12-blessed-dinner', time: '6:30 PM', activity: 'Blessed Evening Meal', duration: '40 min', type: 'nutrition' },
        { id: '12-gratitude-practice', time: '7:30 PM', activity: 'Deep Gratitude Practice', duration: '15 min', type: 'reflection' },
        { id: '12-devotional-yoga', time: '8:00 PM', activity: 'Devotional Yoga Practice', duration: '30 min', type: 'movement' },
        { id: '12-spiritual-meditation', time: '9:00 PM', activity: 'Spiritual Connection Meditation', duration: '25 min', type: 'mindfulness' }
      ]
    },
    {
      day: 13,
      theme: 'Cognitive Restructuring',
      focus: 'Gently challenging and restructuring trauma-related thought patterns',
      morning: [
        { id: '13-thought-awareness', time: '8:00 AM', activity: 'Thought Pattern Awareness', duration: '10 min', type: 'reflection' },
        { id: '13-clarity-breathing', time: '8:15 AM', activity: 'Mental Clarity Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '13-brain-breakfast', time: '8:35 AM', activity: 'Brain-Healthy Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '13-cognitive-movement', time: '9:10 AM', activity: 'Cognitive-Motor Integration', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '13-mindful-lunch', time: '12:30 PM', activity: 'Mindful Thought-Free Lunch', duration: '30 min', type: 'nutrition' },
        { id: '13-thought-work', time: '1:15 PM', activity: 'Gentle Cognitive Restructuring', duration: '30 min', type: 'therapy', guideId: 'cognitive-restructuring' },
        { id: '13-reframing', time: '1:55 PM', activity: 'Positive Reframing Practice', duration: '20 min', type: 'therapy' },
        { id: '13-affirmations', time: '2:25 PM', activity: 'Healing Affirmations', duration: '15 min', type: 'healing' },
        { id: '13-clearing-walk', time: '2:50 PM', activity: 'Mental Clearing Walk', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '13-clarity-dinner', time: '6:30 PM', activity: 'Mental Clarity Dinner', duration: '40 min', type: 'nutrition' },
        { id: '13-thought-journal', time: '7:30 PM', activity: 'Thought Transformation Journal', duration: '15 min', type: 'reflection' },
        { id: '13-balancing-yoga', time: '8:00 PM', activity: 'Mental Balance Yoga', duration: '25 min', type: 'movement' },
        { id: '13-peace-meditation', time: '9:00 PM', activity: 'Mental Peace Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 14,
      theme: 'Integration & Mid-Journey Reflection',
      focus: 'Integrating the first two weeks and reflecting on progress made',
      morning: [
        { id: '14-integration-check', time: '8:00 AM', activity: 'Mid-Journey Assessment', duration: '15 min', type: 'reflection' },
        { id: '14-integration-breathing', time: '8:20 AM', activity: 'Integration Breathwork', duration: '15 min', type: 'mindfulness' },
        { id: '14-celebration-breakfast', time: '8:40 AM', activity: 'Progress Celebration Breakfast', duration: '35 min', type: 'nutrition' },
        { id: '14-integration-movement', time: '9:20 AM', activity: 'Integration Movement Flow', duration: '30 min', type: 'movement' }
      ],
      afternoon: [
        { id: '14-reflection-lunch', time: '12:30 PM', activity: 'Reflective Lunch Practice', duration: '35 min', type: 'nutrition' },
        { id: '14-progress-review', time: '1:15 PM', activity: 'Progress Review & Planning', duration: '30 min', type: 'therapy' },
        { id: '14-skill-practice', time: '1:55 PM', activity: 'Skill Integration Practice', duration: '25 min', type: 'healing' },
        { id: '14-wisdom-walk', time: '2:30 PM', activity: 'Wisdom Integration Walk', duration: '30 min', type: 'nature' }
      ],
      evening: [
        { id: '14-milestone-dinner', time: '6:30 PM', activity: 'Milestone Celebration Dinner', duration: '45 min', type: 'nutrition' },
        { id: '14-growth-journal', time: '7:30 PM', activity: 'Growth & Learning Journal', duration: '20 min', type: 'reflection' },
        { id: '14-appreciation-yoga', time: '8:00 PM', activity: 'Self-Appreciation Yoga', duration: '30 min', type: 'movement' },
        { id: '14-integration-meditation', time: '9:00 PM', activity: 'Integration Meditation', duration: '25 min', type: 'mindfulness' }
      ]
    },
    {
      day: 15,
      theme: 'Advanced Trauma Processing',
      focus: 'Gentle processing of deeper trauma material with full support',
      morning: [
        { id: '15-readiness-check', time: '8:00 AM', activity: 'Processing Readiness Check', duration: '12 min', type: 'reflection' },
        { id: '15-protective-breathing', time: '8:15 AM', activity: 'Protective Breathwork', duration: '15 min', type: 'mindfulness' },
        { id: '15-strengthening-breakfast', time: '8:35 AM', activity: 'Strengthening Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '15-preparation-movement', time: '9:10 AM', activity: 'Processing Preparation Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '15-grounding-lunch', time: '12:30 PM', activity: 'Deep Grounding Lunch', duration: '30 min', type: 'nutrition' },
        { id: '15-emdr-preparation', time: '1:15 PM', activity: 'EMDR Preparation & Safety', duration: '30 min', type: 'therapy', guideId: 'emdr-preparation' },
        { id: '15-bilateral-stimulation', time: '1:55 PM', activity: 'Bilateral Stimulation Practice', duration: '20 min', type: 'healing' },
        { id: '15-containment', time: '2:25 PM', activity: 'Trauma Containment Practice', duration: '20 min', type: 'healing' },
        { id: '15-safety-walk', time: '2:55 PM', activity: 'Safety & Grounding Walk', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '15-recovery-dinner', time: '6:30 PM', activity: 'Recovery Support Dinner', duration: '40 min', type: 'nutrition' },
        { id: '15-processing-journal', time: '7:30 PM', activity: 'Gentle Processing Journal', duration: '15 min', type: 'reflection' },
        { id: '15-release-yoga', time: '8:00 PM', activity: 'Gentle Release Yoga', duration: '30 min', type: 'movement' },
        { id: '15-protection-meditation', time: '9:00 PM', activity: 'Protection & Healing Meditation', duration: '25 min', type: 'mindfulness' }
      ]
    },
    {
      day: 16,
      theme: 'Rebuilding Trust in Self',
      focus: 'Reconnecting with and rebuilding trust in your own instincts and wisdom',
      morning: [
        { id: '16-self-trust-check', time: '8:00 AM', activity: 'Self-Trust Assessment', duration: '10 min', type: 'reflection' },
        { id: '16-intuitive-breathing', time: '8:15 AM', activity: 'Intuitive Breath Practice', duration: '15 min', type: 'mindfulness' },
        { id: '16-intuition-breakfast', time: '8:35 AM', activity: 'Intuition-Supporting Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '16-instinctual-movement', time: '9:10 AM', activity: 'Instinctual Movement Practice', duration: '25 min', type: 'movement' }
      ],
      afternoon: [
        { id: '16-wisdom-lunch', time: '12:30 PM', activity: 'Inner Wisdom Lunch', duration: '30 min', type: 'nutrition' },
        { id: '16-body-wisdom', time: '1:15 PM', activity: 'Body Wisdom Workshop', duration: '30 min', type: 'therapy' },
        { id: '16-decision-practice', time: '1:55 PM', activity: 'Intuitive Decision Practice', duration: '20 min', type: 'healing' },
        { id: '16-self-guidance', time: '2:25 PM', activity: 'Self-Guidance Practice', duration: '20 min', type: 'healing' },
        { id: '16-trust-walk', time: '2:55 PM', activity: 'Trust-Building Nature Walk', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '16-wisdom-dinner', time: '6:30 PM', activity: 'Inner Wisdom Dinner', duration: '40 min', type: 'nutrition' },
        { id: '16-trust-journal', time: '7:30 PM', activity: 'Self-Trust Building Journal', duration: '15 min', type: 'reflection' },
        { id: '16-flowing-yoga', time: '8:00 PM', activity: 'Intuitive Flow Yoga', duration: '30 min', type: 'movement' },
        { id: '16-wisdom-meditation', time: '9:00 PM', activity: 'Inner Wisdom Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 17,
      theme: 'Reclaiming Joy & Playfulness',
      focus: 'Safely reconnecting with joy, playfulness, and positive emotions',
      morning: [
        { id: '17-joy-check', time: '8:00 AM', activity: 'Joy Capacity Check-In', duration: '10 min', type: 'reflection' },
        { id: '17-joyful-breathing', time: '8:15 AM', activity: 'Joyful Breath Practice', duration: '15 min', type: 'mindfulness' },
        { id: '17-playful-breakfast', time: '8:35 AM', activity: 'Playful Breakfast Creation', duration: '30 min', type: 'nutrition' },
        { id: '17-dance-movement', time: '9:10 AM', activity: 'Joyful Dance Movement', duration: '25 min', type: 'creative' }
      ],
      afternoon: [
        { id: '17-delightful-lunch', time: '12:30 PM', activity: 'Delightful Lunch Experience', duration: '30 min', type: 'nutrition' },
        { id: '17-play-therapy', time: '1:15 PM', activity: 'Adult Play Therapy', duration: '30 min', type: 'creative' },
        { id: '17-laughter-practice', time: '1:55 PM', activity: 'Laughter & Joy Practice', duration: '20 min', type: 'healing' },
        { id: '17-inner-child', time: '2:25 PM', activity: 'Inner Child Connection', duration: '20 min', type: 'healing' },
        { id: '17-wonder-walk', time: '2:55 PM', activity: 'Wonder & Curiosity Walk', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '17-celebration-dinner', time: '6:30 PM', activity: 'Joy Celebration Dinner', duration: '40 min', type: 'nutrition' },
        { id: '17-happiness-journal', time: '7:30 PM', activity: 'Happiness & Joy Journal', duration: '15 min', type: 'reflection' },
        { id: '17-playful-yoga', time: '8:00 PM', activity: 'Playful Yoga Practice', duration: '25 min', type: 'movement' },
        { id: '17-bliss-meditation', time: '9:00 PM', activity: 'Bliss & Contentment Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 18,
      theme: 'Future Visioning',
      focus: 'Creating a hopeful vision for post-trauma growth and future possibilities',
      morning: [
        { id: '18-vision-check', time: '8:00 AM', activity: 'Future Vision Check-In', duration: '10 min', type: 'reflection' },
        { id: '18-expansive-breathing', time: '8:15 AM', activity: 'Expansive Vision Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '18-visionary-breakfast', time: '8:35 AM', activity: 'Visionary Breakfast Ritual', duration: '30 min', type: 'nutrition' },
        { id: '18-possibility-movement', time: '9:10 AM', activity: 'Possibility Movement Practice', duration: '25 min', type: 'movement' }
      ],
      afternoon: [
        { id: '18-hope-lunch', time: '12:30 PM', activity: 'Hope & Possibility Lunch', duration: '30 min', type: 'nutrition' },
        { id: '18-vision-boarding', time: '1:15 PM', activity: 'Future Vision Creation', duration: '35 min', type: 'creative' },
        { id: '18-goal-setting', time: '2:00 PM', activity: 'Trauma-Informed Goal Setting', duration: '25 min', type: 'therapy' },
        { id: '18-manifestation', time: '2:35 PM', activity: 'Gentle Manifestation Practice', duration: '15 min', type: 'healing' },
        { id: '18-future-walk', time: '3:00 PM', activity: 'Future Self Nature Walk', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '18-possibility-dinner', time: '6:30 PM', activity: 'Infinite Possibility Dinner', duration: '40 min', type: 'nutrition' },
        { id: '18-dreams-journal', time: '7:30 PM', activity: 'Dreams & Aspirations Journal', duration: '15 min', type: 'reflection' },
        { id: '18-opening-yoga', time: '8:00 PM', activity: 'Heart Opening Yoga', duration: '30 min', type: 'movement' },
        { id: '18-future-meditation', time: '9:00 PM', activity: 'Future Self Meditation', duration: '25 min', type: 'mindfulness' }
      ]
    },
    {
      day: 19,
      theme: 'Preparing for Independence',
      focus: 'Developing skills and confidence for continued healing independently',
      morning: [
        { id: '19-independence-check', time: '8:00 AM', activity: 'Independence Readiness Check', duration: '12 min', type: 'reflection' },
        { id: '19-confident-breathing', time: '8:15 AM', activity: 'Confident Independence Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '19-independence-breakfast', time: '8:35 AM', activity: 'Independence Celebration Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '19-empowered-movement', time: '9:10 AM', activity: 'Empowered Movement Practice', duration: '25 min', type: 'movement' }
      ],
      afternoon: [
        { id: '19-self-reliant-lunch', time: '12:30 PM', activity: 'Self-Reliant Lunch Prep', duration: '30 min', type: 'nutrition' },
        { id: '19-toolkit-building', time: '1:15 PM', activity: 'Personal Toolkit Building', duration: '30 min', type: 'therapy' },
        { id: '19-crisis-planning', time: '1:55 PM', activity: 'Crisis Prevention Planning', duration: '25 min', type: 'therapy' },
        { id: '19-resource-mapping', time: '2:30 PM', activity: 'Support Resource Mapping', duration: '20 min', type: 'healing' },
        { id: '19-confidence-walk', time: '3:00 PM', activity: 'Confidence Building Walk', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '19-mastery-dinner', time: '6:30 PM', activity: 'Self-Mastery Dinner', duration: '40 min', type: 'nutrition' },
        { id: '19-skills-journal', time: '7:30 PM', activity: 'Skills Mastery Journal', duration: '15 min', type: 'reflection' },
        { id: '19-strength-yoga', time: '8:00 PM', activity: 'Inner Strength Yoga', duration: '30 min', type: 'movement' },
        { id: '19-confidence-meditation', time: '9:00 PM', activity: 'Confidence & Capability Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 20,
      theme: 'Celebrating Transformation',
      focus: 'Acknowledging and celebrating the profound transformation achieved',
      morning: [
        { id: '20-transformation-check', time: '8:00 AM', activity: 'Transformation Acknowledgment', duration: '15 min', type: 'reflection' },
        { id: '20-celebration-breathing', time: '8:20 AM', activity: 'Celebration Breathwork', duration: '15 min', type: 'mindfulness' },
        { id: '20-victory-breakfast', time: '8:40 AM', activity: 'Victory Celebration Breakfast', duration: '35 min', type: 'nutrition' },
        { id: '20-triumph-movement', time: '9:20 AM', activity: 'Triumph Movement Celebration', duration: '30 min', type: 'movement' }
      ],
      afternoon: [
        { id: '20-achievement-lunch', time: '12:30 PM', activity: 'Achievement Celebration Lunch', duration: '35 min', type: 'nutrition' },
        { id: '20-story-rewriting', time: '1:15 PM', activity: 'Personal Story Rewriting', duration: '35 min', type: 'creative' },
        { id: '20-legacy-planning', time: '2:00 PM', activity: 'Healing Legacy Planning', duration: '25 min', type: 'therapy' },
        { id: '20-gift-giving', time: '2:35 PM', activity: 'Self-Gift Practice', duration: '15 min', type: 'healing' },
        { id: '20-gratitude-walk', time: '3:00 PM', activity: 'Gratitude Journey Walk', duration: '30 min', type: 'nature' }
      ],
      evening: [
        { id: '20-feast-dinner', time: '6:30 PM', activity: 'Transformation Feast', duration: '45 min', type: 'nutrition' },
        { id: '20-celebration-journal', time: '7:30 PM', activity: 'Celebration & Gratitude Journal', duration: '20 min', type: 'reflection' },
        { id: '20-celebration-yoga', time: '8:00 PM', activity: 'Celebration Yoga Flow', duration: '30 min', type: 'movement' },
        { id: '20-blessing-meditation', time: '9:00 PM', activity: 'Blessing & Gratitude Meditation', duration: '25 min', type: 'mindfulness' }
      ]
    },
    {
      day: 21,
      theme: 'Graduation & New Beginnings',
      focus: 'Completing the program and stepping confidently into continued healing',
      morning: [
        { id: '21-graduation-check', time: '8:00 AM', activity: 'Graduation Reflection', duration: '15 min', type: 'reflection' },
        { id: '21-completion-breathing', time: '8:20 AM', activity: 'Completion Circle Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '21-graduation-breakfast', time: '8:40 AM', activity: 'Graduation Celebration Breakfast', duration: '35 min', type: 'nutrition' },
        { id: '21-commencement-movement', time: '9:20 AM', activity: 'Commencement Movement Ritual', duration: '30 min', type: 'movement' }
      ],
      afternoon: [
        { id: '21-farewell-lunch', time: '12:30 PM', activity: 'Farewell & New Beginning Lunch', duration: '35 min', type: 'nutrition' },
        { id: '21-integration-ceremony', time: '1:15 PM', activity: 'Integration Ceremony', duration: '40 min', type: 'therapy' },
        { id: '21-commitment-ritual', time: '2:05 PM', activity: 'Continued Healing Commitment', duration: '25 min', type: 'healing' },
        { id: '21-blessing-walk', time: '2:40 PM', activity: 'Blessing & Release Walk', duration: '30 min', type: 'nature' }
      ],
      evening: [
        { id: '21-graduation-dinner', time: '6:30 PM', activity: 'Graduation Celebration Dinner', duration: '50 min', type: 'nutrition' },
        { id: '21-completion-journal', time: '7:30 PM', activity: 'Program Completion Journal', duration: '25 min', type: 'reflection' },
        { id: '21-honor-yoga', time: '8:00 PM', activity: 'Self-Honor Yoga Practice', duration: '35 min', type: 'movement' },
        { id: '21-graduation-meditation', time: '9:00 PM', activity: 'Graduation Blessing Meditation', duration: '30 min', type: 'mindfulness' }
      ]
    }
  ]
};