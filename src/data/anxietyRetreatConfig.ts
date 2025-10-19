import { RetreatConfiguration } from '@/types/retreat';

export const anxietyReliefRetreat: RetreatConfiguration = {
  id: 'anxiety_relief',
  name: 'Steady Ground: Anxiety Relief & Resilience',
  description: 'A structured 12-day program focused on anxiety management through proven techniques including grounding, breathing practices, and cognitive tools for building lasting calm.',
  shortDescription: 'Anxiety relief through grounding techniques and nervous system regulation',
  duration: 12,
  focusAreas: ['Anxiety Relief', 'Panic Management', 'Grounding Techniques', 'Nervous System Regulation', 'Cognitive Tools'],
  principles: ['Safety First', 'Gradual Exposure', 'Skill Building', 'Self-Regulation', 'Empowerment'],
  targetConditions: ['Generalized Anxiety', 'Social Anxiety', 'Panic Disorder', 'Worry', 'Anxiety Symptoms'],
  contraindications: ['Severe Panic Disorder requiring medication', 'Agoraphobia with safety concerns', 'Severe PTSD'],
  riskLevel: 'moderate',
  requiresSupervision: false,
  days: [
    {
      day: 1,
      theme: 'Safety & Grounding Foundation',
      focus: 'Establishing safety and learning fundamental grounding techniques',
      morning: [
        { id: '1-anxiety-check', time: '7:30 AM', activity: 'Anxiety Level Check-In', duration: '10 min', type: 'reflection', description: 'Rate anxiety 1-10, no judgment' },
        { id: '1-calming-breathing', time: '7:40 AM', activity: 'Calming Breath Practice', duration: '12 min', type: 'mindfulness', guideId: 'gentle-wake-up-breathing' },
        { id: '1-calm-breakfast', time: '8:00 AM', activity: 'Anxiety-Calming Breakfast', duration: '25 min', type: 'nutrition', description: 'Foods that stabilize blood sugar and mood' },
        { id: '1-gentle-movement', time: '8:30 AM', activity: 'Anxiety-Releasing Movement', duration: '15 min', type: 'movement', modifications: ['Stop if anxious', 'Very gentle'] }
      ],
      afternoon: [
        { id: '1-grounding-lunch', time: '12:00 PM', activity: 'Grounding Lunch Practice', duration: '25 min', type: 'nutrition' },
        { id: '1-anxiety-education', time: '1:00 PM', activity: 'Understanding Anxiety', duration: '20 min', type: 'therapy', guideId: 'emotion-regulation-techniques' },
        { id: '1-grounding-54321', time: '1:30 PM', activity: '5-4-3-2-1 Grounding Technique', duration: '15 min', type: 'healing', guideId: 'somatic-grounding-practice' },
        { id: '1-safe-space', time: '2:00 PM', activity: 'Creating Your Safe Space', duration: '20 min', type: 'healing' },
        { id: '1-nature-calm', time: '2:30 PM', activity: 'Nature Calming Walk', duration: '20 min', type: 'nature', modifications: ['Stay close to home'] }
      ],
      evening: [
        { id: '1-soothing-dinner', time: '6:30 PM', activity: 'Soothing Evening Meal', duration: '30 min', type: 'nutrition' },
        { id: '1-worry-time', time: '7:30 PM', activity: 'Scheduled Worry Time', duration: '10 min', type: 'reflection', guideId: 'narrative-therapy-letter-writing' },
        { id: '1-tension-release', time: '8:00 PM', activity: 'Anxiety Tension Release', duration: '20 min', type: 'movement' },
        { id: '1-calm-meditation', time: '8:30 PM', activity: 'Calm Abiding Meditation', duration: '15 min', type: 'mindfulness' }
      ]
    },
    {
      day: 2,
      theme: 'Nervous System Regulation',
      focus: 'Learning to regulate your nervous system and manage anxiety responses',
      morning: [
        { id: '2-nervous-system-check', time: '7:30 AM', activity: 'Nervous System Check-In', duration: '12 min', type: 'reflection' },
        { id: '2-regulation-breathing', time: '7:42 AM', activity: 'Nervous System Regulation Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '2-stabilizing-breakfast', time: '8:00 AM', activity: 'Blood Sugar Stabilizing Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '2-vagus-movement', time: '8:30 AM', activity: 'Vagus Nerve Stimulating Movement', duration: '18 min', type: 'movement', guideId: 'somatic-grounding-practice' }
      ],
      afternoon: [
        { id: '2-mindful-lunch', time: '12:00 PM', activity: 'Mindful Lunch for Calm', duration: '25 min', type: 'nutrition' },
        { id: '2-cognitive-tools', time: '1:00 PM', activity: 'Cognitive Tools for Anxiety', duration: '25 min', type: 'therapy', guideId: 'emotion-regulation-techniques' },
        { id: '2-progressive-relaxation', time: '1:35 PM', activity: 'Progressive Muscle Relaxation', duration: '20 min', type: 'healing' },
        { id: '2-self-soothing', time: '2:05 PM', activity: 'Self-Soothing Toolkit', duration: '20 min', type: 'healing' },
        { id: '2-calming-nature', time: '2:35 PM', activity: 'Calming Nature Practice', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '2-comfort-dinner', time: '6:30 PM', activity: 'Comfort Food Dinner', duration: '30 min', type: 'nutrition' },
        { id: '2-anxiety-wins', time: '7:30 PM', activity: 'Celebrating Anxiety Wins', duration: '10 min', type: 'reflection' },
        { id: '2-restorative-yoga', time: '8:00 PM', activity: 'Restorative Yoga for Anxiety', duration: '25 min', type: 'movement' },
        { id: '2-sleep-calm', time: '8:35 PM', activity: 'Sleep Calm Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 3,
      theme: 'Cognitive Restructuring',
      focus: 'Learning to identify and challenge anxious thoughts',
      morning: [
        { id: '3-thought-check', time: '7:30 AM', activity: 'Anxious Thought Check-In', duration: '12 min', type: 'reflection' },
        { id: '3-mindful-breathing', time: '7:42 AM', activity: 'Mindful Breathing Practice', duration: '15 min', type: 'mindfulness', guideId: 'gentle-wake-up-breathing' },
        { id: '3-nourishing-breakfast', time: '8:00 AM', activity: 'Anxiety-Soothing Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '3-anxiety-releasing-movement', time: '8:30 AM', activity: 'Anxiety-Releasing Gentle Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '3-calm-lunch', time: '12:00 PM', activity: 'Calming Lunch Practice', duration: '25 min', type: 'nutrition' },
        { id: '3-thought-records', time: '1:00 PM', activity: 'Thought Record Practice', duration: '25 min', type: 'therapy', guideId: 'emotion-regulation-techniques' },
        { id: '3-evidence-examination', time: '1:35 PM', activity: 'Evidence For & Against', duration: '20 min', type: 'therapy' },
        { id: '3-reframing-practice', time: '2:05 PM', activity: 'Thought Reframing Practice', duration: '20 min', type: 'healing' },
        { id: '3-grounding-walk', time: '2:35 PM', activity: 'Grounding Nature Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '3-peaceful-dinner', time: '6:30 PM', activity: 'Peaceful Evening Meal', duration: '30 min', type: 'nutrition' },
        { id: '3-cognitive-wins', time: '7:30 PM', activity: 'Cognitive Restructuring Wins', duration: '10 min', type: 'reflection' },
        { id: '3-tension-release-yoga', time: '8:00 PM', activity: 'Tension Release Yoga', duration: '25 min', type: 'movement' },
        { id: '3-peaceful-sleep', time: '8:35 PM', activity: 'Peaceful Sleep Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 4,
      theme: 'Exposure & Acceptance',
      focus: 'Gradual exposure to anxiety triggers with acceptance practices',
      morning: [
        { id: '4-anxiety-acceptance', time: '7:30 AM', activity: 'Anxiety Acceptance Practice', duration: '12 min', type: 'reflection' },
        { id: '4-acceptance-breathing', time: '7:42 AM', activity: 'Acceptance Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '4-strength-breakfast', time: '8:00 AM', activity: 'Strength-Building Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '4-gentle-exposure', time: '8:30 AM', activity: 'Gentle Exposure Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '4-mindful-eating', time: '12:00 PM', activity: 'Mindful Eating Practice', duration: '25 min', type: 'nutrition' },
        { id: '4-exposure-hierarchy', time: '1:00 PM', activity: 'Creating Exposure Hierarchy', duration: '25 min', type: 'therapy' },
        { id: '4-gradual-exposure', time: '1:35 PM', activity: 'Gradual Exposure Practice', duration: '20 min', type: 'healing', modifications: ['Start very small', 'Use grounding as needed'] },
        { id: '4-acceptance-practice', time: '2:05 PM', activity: 'Acceptance & Commitment', duration: '20 min', type: 'therapy' },
        { id: '4-nature-exposure', time: '2:35 PM', activity: 'Nature Exposure Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '4-calming-dinner', time: '6:30 PM', activity: 'Calming Evening Meal', duration: '30 min', type: 'nutrition' },
        { id: '4-exposure-reflection', time: '7:30 PM', activity: 'Exposure Practice Reflection', duration: '10 min', type: 'reflection' },
        { id: '4-restorative-practice', time: '8:00 PM', activity: 'Restorative Practice', duration: '25 min', type: 'movement' },
        { id: '4-acceptance-meditation', time: '8:35 PM', activity: 'Acceptance Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 5,
      theme: 'Self-Compassion & Kindness',
      focus: 'Building self-compassion to reduce anxiety and self-criticism',
      morning: [
        { id: '5-compassion-check', time: '7:30 AM', activity: 'Self-Compassion Check-In', duration: '12 min', type: 'reflection' },
        { id: '5-loving-kindness', time: '7:42 AM', activity: 'Loving-Kindness Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '5-nourishing-meal', time: '8:00 AM', activity: 'Self-Nourishing Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '5-kind-movement', time: '8:30 AM', activity: 'Kind Movement Practice', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '5-compassionate-lunch', time: '12:00 PM', activity: 'Compassionate Lunch', duration: '25 min', type: 'nutrition' },
        { id: '5-self-compassion-letter', time: '1:00 PM', activity: 'Self-Compassion Letter', duration: '25 min', type: 'therapy', guideId: 'narrative-therapy-letter-writing' },
        { id: '5-compassion-phrases', time: '1:35 PM', activity: 'Compassion Phrases Practice', duration: '20 min', type: 'healing' },
        { id: '5-kind-touch', time: '2:05 PM', activity: 'Self-Soothing Touch', duration: '20 min', type: 'healing', guideId: 'somatic-grounding-practice' },
        { id: '5-compassion-walk', time: '2:35 PM', activity: 'Compassionate Walking', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '5-gentle-dinner', time: '6:30 PM', activity: 'Gentle Evening Meal', duration: '30 min', type: 'nutrition' },
        { id: '5-kindness-reflection', time: '7:30 PM', activity: 'Kindness Reflection', duration: '10 min', type: 'reflection' },
        { id: '5-gentle-yoga', time: '8:00 PM', activity: 'Gentle Self-Compassion Yoga', duration: '25 min', type: 'movement' },
        { id: '5-loving-meditation', time: '8:35 PM', activity: 'Loving-Kindness Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 6,
      theme: 'Social Connection & Support',
      focus: 'Managing social anxiety and building supportive connections',
      morning: [
        { id: '6-social-check', time: '7:30 AM', activity: 'Social Anxiety Check-In', duration: '12 min', type: 'reflection' },
        { id: '6-confidence-breathing', time: '7:42 AM', activity: 'Confidence Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '6-energy-breakfast', time: '8:00 AM', activity: 'Social Energy Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '6-confidence-movement', time: '8:30 AM', activity: 'Confidence-Building Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '6-social-lunch', time: '12:00 PM', activity: 'Social Lunch Practice', duration: '25 min', type: 'nutrition', description: 'Optional: Eat with someone safe' },
        { id: '6-social-skills', time: '1:00 PM', activity: 'Social Skills Practice', duration: '25 min', type: 'therapy' },
        { id: '6-connection-practice', time: '1:35 PM', activity: 'Safe Connection Practice', duration: '20 min', type: 'healing', modifications: ['Start with text/call', 'Build gradually'] },
        { id: '6-support-mapping', time: '2:05 PM', activity: 'Support Network Mapping', duration: '20 min', type: 'reflection' },
        { id: '6-social-walk', time: '2:35 PM', activity: 'Social Nature Walk', duration: '20 min', type: 'nature', description: 'Optional: Walk with safe person' }
      ],
      evening: [
        { id: '6-connection-dinner', time: '6:30 PM', activity: 'Connection Dinner', duration: '30 min', type: 'nutrition' },
        { id: '6-social-wins', time: '7:30 PM', activity: 'Social Connection Wins', duration: '10 min', type: 'reflection' },
        { id: '6-calming-movement', time: '8:00 PM', activity: 'Calming Movement', duration: '25 min', type: 'movement' },
        { id: '6-connection-meditation', time: '8:35 PM', activity: 'Connection Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 7,
      theme: 'Mindfulness & Present Moment',
      focus: 'Deepening mindfulness practice to reduce worry about future',
      morning: [
        { id: '7-present-check', time: '7:30 AM', activity: 'Present Moment Check-In', duration: '12 min', type: 'reflection' },
        { id: '7-mindful-breathing', time: '7:42 AM', activity: 'Mindful Awareness Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '7-mindful-breakfast', time: '8:00 AM', activity: 'Fully Mindful Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '7-mindful-movement', time: '8:30 AM', activity: 'Mindful Movement Practice', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '7-present-lunch', time: '12:00 PM', activity: 'Present Moment Lunch', duration: '25 min', type: 'nutrition' },
        { id: '7-mindfulness-formal', time: '1:00 PM', activity: 'Formal Mindfulness Practice', duration: '25 min', type: 'mindfulness' },
        { id: '7-body-scan', time: '1:35 PM', activity: 'Mindful Body Scan', duration: '20 min', type: 'healing', guideId: 'somatic-grounding-practice' },
        { id: '7-mindful-activities', time: '2:05 PM', activity: 'Mindful Daily Activities', duration: '20 min', type: 'healing' },
        { id: '7-sensory-walk', time: '2:35 PM', activity: 'Sensory Awareness Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '7-mindful-dinner', time: '6:30 PM', activity: 'Mindful Evening Meal', duration: '30 min', type: 'nutrition' },
        { id: '7-mindfulness-reflection', time: '7:30 PM', activity: 'Mindfulness Reflection', duration: '10 min', type: 'reflection' },
        { id: '7-mindful-yoga', time: '8:00 PM', activity: 'Mindful Yoga Practice', duration: '25 min', type: 'movement' },
        { id: '7-presence-meditation', time: '8:35 PM', activity: 'Present Moment Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 8,
      theme: 'Values & Meaning',
      focus: 'Connecting with values to reduce anxiety and increase purpose',
      morning: [
        { id: '8-values-check', time: '7:30 AM', activity: 'Values Check-In', duration: '12 min', type: 'reflection' },
        { id: '8-purposeful-breathing', time: '7:42 AM', activity: 'Purposeful Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '8-values-breakfast', time: '8:00 AM', activity: 'Values-Aligned Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '8-purposeful-movement', time: '8:30 AM', activity: 'Purposeful Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '8-meaningful-lunch', time: '12:00 PM', activity: 'Meaningful Lunch', duration: '25 min', type: 'nutrition' },
        { id: '8-values-clarification', time: '1:00 PM', activity: 'Values Clarification Exercise', duration: '25 min', type: 'therapy' },
        { id: '8-values-action', time: '1:35 PM', activity: 'Values-Based Action Planning', duration: '20 min', type: 'healing' },
        { id: '8-meaning-making', time: '2:05 PM', activity: 'Meaning-Making Practice', duration: '20 min', type: 'reflection' },
        { id: '8-values-walk', time: '2:35 PM', activity: 'Values-Aligned Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '8-purpose-dinner', time: '6:30 PM', activity: 'Purposeful Evening Meal', duration: '30 min', type: 'nutrition' },
        { id: '8-values-reflection', time: '7:30 PM', activity: 'Values Reflection', duration: '10 min', type: 'reflection' },
        { id: '8-alignment-movement', time: '8:00 PM', activity: 'Alignment Movement Practice', duration: '25 min', type: 'movement' },
        { id: '8-values-meditation', time: '8:35 PM', activity: 'Values Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 9,
      theme: 'Resilience & Coping',
      focus: 'Building resilience and developing robust coping strategies',
      morning: [
        { id: '9-resilience-check', time: '7:30 AM', activity: 'Resilience Check-In', duration: '12 min', type: 'reflection' },
        { id: '9-strength-breathing', time: '7:42 AM', activity: 'Strength-Building Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '9-resilience-breakfast', time: '8:00 AM', activity: 'Resilience-Building Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '9-empowering-movement', time: '8:30 AM', activity: 'Empowering Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '9-strength-lunch', time: '12:00 PM', activity: 'Strengthening Lunch', duration: '25 min', type: 'nutrition' },
        { id: '9-coping-skills', time: '1:00 PM', activity: 'Coping Skills Toolkit', duration: '25 min', type: 'therapy', guideId: 'emotion-regulation-techniques' },
        { id: '9-stress-inoculation', time: '1:35 PM', activity: 'Stress Inoculation Practice', duration: '20 min', type: 'healing' },
        { id: '9-resilience-building', time: '2:05 PM', activity: 'Resilience Building Exercise', duration: '20 min', type: 'healing' },
        { id: '9-empowerment-walk', time: '2:35 PM', activity: 'Empowerment Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '9-strength-dinner', time: '6:30 PM', activity: 'Strength-Affirming Meal', duration: '30 min', type: 'nutrition' },
        { id: '9-resilience-reflection', time: '7:30 PM', activity: 'Resilience Reflection', duration: '10 min', type: 'reflection' },
        { id: '9-empowering-yoga', time: '8:00 PM', activity: 'Empowering Yoga', duration: '25 min', type: 'movement' },
        { id: '9-strength-meditation', time: '8:35 PM', activity: 'Inner Strength Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 10,
      theme: 'Lifestyle Integration',
      focus: 'Creating sustainable anxiety management practices for daily life',
      morning: [
        { id: '10-integration-check', time: '7:30 AM', activity: 'Integration Check-In', duration: '12 min', type: 'reflection' },
        { id: '10-sustainable-breathing', time: '7:42 AM', activity: 'Sustainable Breathing Practice', duration: '15 min', type: 'mindfulness' },
        { id: '10-lifestyle-breakfast', time: '8:00 AM', activity: 'Lifestyle-Aligned Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '10-sustainable-movement', time: '8:30 AM', activity: 'Sustainable Movement Practice', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '10-integration-lunch', time: '12:00 PM', activity: 'Integration Lunch', duration: '25 min', type: 'nutrition' },
        { id: '10-routine-building', time: '1:00 PM', activity: 'Anxiety Management Routine', duration: '25 min', type: 'therapy' },
        { id: '10-habit-stacking', time: '1:35 PM', activity: 'Habit Stacking Practice', duration: '20 min', type: 'healing' },
        { id: '10-sustainability-planning', time: '2:05 PM', activity: 'Sustainability Planning', duration: '20 min', type: 'reflection' },
        { id: '10-routine-walk', time: '2:35 PM', activity: 'Routine Nature Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '10-sustainable-dinner', time: '6:30 PM', activity: 'Sustainable Evening Meal', duration: '30 min', type: 'nutrition' },
        { id: '10-integration-reflection', time: '7:30 PM', activity: 'Integration Reflection', duration: '10 min', type: 'reflection' },
        { id: '10-lifestyle-yoga', time: '8:00 PM', activity: 'Lifestyle Yoga Practice', duration: '25 min', type: 'movement' },
        { id: '10-sustainable-meditation', time: '8:35 PM', activity: 'Sustainable Practice Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 11,
      theme: 'Relapse Prevention',
      focus: 'Identifying triggers and creating relapse prevention strategies',
      morning: [
        { id: '11-prevention-check', time: '7:30 AM', activity: 'Prevention Check-In', duration: '12 min', type: 'reflection' },
        { id: '11-anchoring-breathing', time: '7:42 AM', activity: 'Anchoring Breathing Practice', duration: '15 min', type: 'mindfulness' },
        { id: '11-preventive-breakfast', time: '8:00 AM', activity: 'Preventive Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '11-anchoring-movement', time: '8:30 AM', activity: 'Anchoring Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '11-mindful-lunch', time: '12:00 PM', activity: 'Mindful Prevention Lunch', duration: '25 min', type: 'nutrition' },
        { id: '11-trigger-mapping', time: '1:00 PM', activity: 'Trigger Mapping Exercise', duration: '25 min', type: 'therapy' },
        { id: '11-early-warning', time: '1:35 PM', activity: 'Early Warning Signs Practice', duration: '20 min', type: 'healing' },
        { id: '11-action-plan', time: '2:05 PM', activity: 'Relapse Prevention Action Plan', duration: '20 min', type: 'reflection' },
        { id: '11-grounding-walk', time: '2:35 PM', activity: 'Grounding Prevention Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '11-preventive-dinner', time: '6:30 PM', activity: 'Preventive Evening Meal', duration: '30 min', type: 'nutrition' },
        { id: '11-prevention-reflection', time: '7:30 PM', activity: 'Prevention Strategy Reflection', duration: '10 min', type: 'reflection' },
        { id: '11-stabilizing-yoga', time: '8:00 PM', activity: 'Stabilizing Yoga', duration: '25 min', type: 'movement' },
        { id: '11-anchoring-meditation', time: '8:35 PM', activity: 'Anchoring Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 12,
      theme: 'Celebration & Moving Forward',
      focus: 'Celebrating progress and committing to ongoing anxiety management',
      morning: [
        { id: '12-celebration-check', time: '7:30 AM', activity: 'Celebration Check-In', duration: '12 min', type: 'reflection' },
        { id: '12-gratitude-breathing', time: '7:42 AM', activity: 'Gratitude Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '12-celebration-breakfast', time: '8:00 AM', activity: 'Celebration Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '12-joy-movement', time: '8:30 AM', activity: 'Joyful Movement Celebration', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '12-celebration-lunch', time: '12:00 PM', activity: 'Celebration Lunch', duration: '25 min', type: 'nutrition' },
        { id: '12-progress-review', time: '1:00 PM', activity: 'Progress Review & Integration', duration: '25 min', type: 'reflection' },
        { id: '12-future-visioning', time: '1:35 PM', activity: 'Future Visioning Practice', duration: '20 min', type: 'healing' },
        { id: '12-commitment-ceremony', time: '2:05 PM', activity: 'Personal Commitment Ceremony', duration: '20 min', type: 'reflection' },
        { id: '12-celebration-walk', time: '2:35 PM', activity: 'Celebration Nature Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '12-celebratory-dinner', time: '6:30 PM', activity: 'Celebratory Evening Meal', duration: '30 min', type: 'nutrition' },
        { id: '12-gratitude-reflection', time: '7:30 PM', activity: 'Gratitude & Achievement Reflection', duration: '10 min', type: 'reflection', guideId: 'narrative-therapy-letter-writing' },
        { id: '12-integration-yoga', time: '8:00 PM', activity: 'Integration Yoga Practice', duration: '25 min', type: 'movement' },
        { id: '12-completion-meditation', time: '8:35 PM', activity: 'Completion & New Beginning Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    }
  ]
};