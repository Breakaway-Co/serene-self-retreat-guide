import { RetreatConfiguration } from '@/types/retreat';

export const depressionSupportRetreat: RetreatConfiguration = {
  id: 'depression_support',
  name: 'Gentle Dawn: Depression Support & Healing',
  description: 'A compassionate 14-day program designed specifically for depression support through behavioral activation, gentle movement, and mood-supporting practices.',
  shortDescription: 'Gentle depression support through behavioral activation and self-compassion',
  duration: 14,
  focusAreas: ['Depression Support', 'Behavioral Activation', 'Mood Stabilization', 'Self-Compassion', 'Energy Building'],
  principles: ['Gentle Pacing', 'Self-Compassion', 'Small Steps', 'No Judgment', 'Progress Over Perfection'],
  targetConditions: ['Depression', 'Low Mood', 'Seasonal Affective Disorder', 'Persistent Sadness', 'Energy Depletion'],
  contraindications: ['Severe Depression (PHQ-9 > 20)', 'Active Suicidal Ideation', 'Psychotic Depression'],
  riskLevel: 'moderate',
  requiresSupervision: true,
  days: [
    {
      day: 1,
      theme: 'Gentle Awakening',
      focus: 'Very gentle start with micro-activities and self-compassion',
      morning: [
        { id: '1-gentle-wake', time: '8:30 AM', activity: 'Gentle Wake-Up Practice', duration: '10 min', type: 'mindfulness', modifications: ['Stay in bed if needed', 'No pressure'], description: 'Gentle awareness without getting up' },
        { id: '1-mood-check', time: '8:40 AM', activity: 'Compassionate Mood Check', duration: '10 min', type: 'reflection', description: 'Non-judgmental awareness of current mood' },
        { id: '1-micro-breakfast', time: '9:00 AM', activity: 'Micro Breakfast Goal', duration: '20 min', type: 'nutrition', modifications: ['One piece of toast is enough', 'Pre-made options'], description: 'Any nourishment is a win' },
        { id: '1-tiny-movement', time: '9:30 AM', activity: 'Tiny Movement Practice', duration: '10 min', type: 'movement', modifications: ['Chair-based', '2-minute minimum', 'Stretching in bed ok'] }
      ],
      afternoon: [
        { id: '1-simple-lunch', time: '12:30 PM', activity: 'Simple Lunch', duration: '20 min', type: 'nutrition', modifications: ['Prepared foods ok', 'Focus on convenience'] },
        { id: '1-depression-education', time: '1:30 PM', activity: 'Understanding Depression Gently', duration: '15 min', type: 'therapy', guideId: 'emotion-regulation-techniques' },
        { id: '1-one-activity', time: '2:00 PM', activity: 'One Small Pleasant Activity', duration: '15 min', type: 'healing', description: 'Anything that brings tiny bit of pleasure' },
        { id: '1-sunlight-moment', time: '2:30 PM', activity: 'Sunlight Moment', duration: '10 min', type: 'nature', modifications: ['Window sitting counts', 'Even 2 minutes helps'] }
      ],
      evening: [
        { id: '1-easy-dinner', time: '6:30 PM', activity: 'Easy Evening Meal', duration: '25 min', type: 'nutrition', modifications: ['Takeout is fine', 'Simple foods'] },
        { id: '1-self-compassion', time: '7:30 PM', activity: 'Self-Compassion Practice', duration: '10 min', type: 'reflection', guideId: 'self-compassion-meditation' },
        { id: '1-gentle-stretch', time: '8:00 PM', activity: 'Gentle Evening Stretch', duration: '10 min', type: 'movement' },
        { id: '1-sleep-support', time: '8:30 PM', activity: 'Sleep Support Meditation', duration: '15 min', type: 'mindfulness' }
      ]
    },
    {
      day: 2,
      theme: 'Building Tiny Routines',
      focus: 'Establishing very small, manageable daily routines',
      morning: [
        { id: '2-routine-start', time: '8:30 AM', activity: 'Tiny Morning Routine', duration: '15 min', type: 'reflection', description: 'Simple 3-step morning routine' },
        { id: '2-breathing-support', time: '8:45 AM', activity: 'Depression-Support Breathing', duration: '8 min', type: 'mindfulness' },
        { id: '2-nourishing-breakfast', time: '9:00 AM', activity: 'Mood-Supporting Breakfast', duration: '25 min', type: 'nutrition', description: 'Foods that support brain health' },
        { id: '2-energy-movement', time: '9:30 AM', activity: 'Gentle Energy Movement', duration: '12 min', type: 'movement', modifications: ['Build from yesterday'] }
      ],
      afternoon: [
        { id: '2-mood-lunch', time: '12:30 PM', activity: 'Mood-Boosting Lunch', duration: '25 min', type: 'nutrition' },
        { id: '2-activity-scheduling', time: '1:30 PM', activity: 'Gentle Activity Scheduling', duration: '20 min', type: 'therapy', guideId: 'core-values-identification' },
        { id: '2-accomplishment', time: '2:00 PM', activity: 'One Small Accomplishment', duration: '20 min', type: 'healing', description: 'Any task completion counts' },
        { id: '2-nature-connection', time: '2:30 PM', activity: 'Gentle Nature Connection', duration: '15 min', type: 'nature' }
      ],
      evening: [
        { id: '2-comfort-dinner', time: '6:30 PM', activity: 'Comfort Food Dinner', duration: '30 min', type: 'nutrition' },
        { id: '2-gratitude-tiny', time: '7:30 PM', activity: 'Tiny Gratitude Practice', duration: '5 min', type: 'reflection' },
        { id: '2-gentle-yoga', time: '8:00 PM', activity: 'Depression-Support Yoga', duration: '15 min', type: 'movement' },
        { id: '2-loving-meditation', time: '8:30 PM', activity: 'Loving-Kindness for Self', duration: '15 min', type: 'mindfulness' }
      ]
    },
    {
      day: 3,
      theme: 'Behavioral Activation Begins',
      focus: 'Starting gentle behavioral activation to increase mood-boosting activities',
      morning: [
        { id: '3-activation-check', time: '8:30 AM', activity: 'Activation Energy Check', duration: '10 min', type: 'reflection' },
        { id: '3-energizing-breathing', time: '8:40 AM', activity: 'Gentle Energizing Breath', duration: '10 min', type: 'mindfulness' },
        { id: '3-energy-breakfast', time: '9:00 AM', activity: 'Energy-Supporting Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '3-activation-movement', time: '9:30 AM', activity: 'Behavioral Activation Movement', duration: '15 min', type: 'movement', modifications: ['Increase gradually'] }
      ],
      afternoon: [
        { id: '3-activation-lunch', time: '12:30 PM', activity: 'Activation Lunch', duration: '25 min', type: 'nutrition' },
        { id: '3-pleasant-activities', time: '1:30 PM', activity: 'Pleasant Activities List', duration: '20 min', type: 'therapy', guideId: 'behavioral-activation' },
        { id: '3-one-activity-do', time: '2:00 PM', activity: 'Do One Pleasant Activity', duration: '25 min', type: 'healing', description: 'Choose from your list' },
        { id: '3-nature-pleasure', time: '2:30 PM', activity: 'Nature Pleasure Walk', duration: '15 min', type: 'nature' }
      ],
      evening: [
        { id: '3-activation-dinner', time: '6:30 PM', activity: 'Activation Dinner', duration: '30 min', type: 'nutrition' },
        { id: '3-activity-log', time: '7:30 PM', activity: 'Activity-Mood Log', duration: '10 min', type: 'reflection' },
        { id: '3-gentle-flow', time: '8:00 PM', activity: 'Gentle Flow Movement', duration: '15 min', type: 'movement' },
        { id: '3-hope-meditation', time: '8:30 PM', activity: 'Cultivating Hope Meditation', duration: '15 min', type: 'mindfulness' }
      ]
    },
    {
      day: 4,
      theme: 'Social Connection',
      focus: 'Gentle social reconnection and reducing isolation',
      morning: [
        { id: '4-connection-check', time: '8:30 AM', activity: 'Connection Energy Check', duration: '10 min', type: 'reflection' },
        { id: '4-opening-breathing', time: '8:40 AM', activity: 'Heart-Opening Breathing', duration: '10 min', type: 'mindfulness' },
        { id: '4-connection-breakfast', time: '9:00 AM', activity: 'Social Breakfast Option', duration: '25 min', type: 'nutrition', description: 'Optional: Text someone' },
        { id: '4-social-movement', time: '9:30 AM', activity: 'Social Movement', duration: '15 min', type: 'movement' }
      ],
      afternoon: [
        { id: '4-social-lunch', time: '12:30 PM', activity: 'Optional Social Lunch', duration: '30 min', type: 'nutrition', modifications: ['Phone call counts', 'No pressure'] },
        { id: '4-connection-planning', time: '1:30 PM', activity: 'Social Connection Planning', duration: '20 min', type: 'therapy' },
        { id: '4-reach-out', time: '2:00 PM', activity: 'One Small Reach-Out', duration: '15 min', type: 'healing', description: 'Text, call, or message' },
        { id: '4-shared-nature', time: '2:30 PM', activity: 'Shared Nature Experience', duration: '20 min', type: 'nature', modifications: ['Virtual sharing ok'] }
      ],
      evening: [
        { id: '4-connection-dinner', time: '6:30 PM', activity: 'Connection Dinner', duration: '30 min', type: 'nutrition' },
        { id: '4-social-reflection', time: '7:30 PM', activity: 'Social Connection Reflection', duration: '10 min', type: 'reflection' },
        { id: '4-opening-yoga', time: '8:00 PM', activity: 'Heart-Opening Yoga', duration: '20 min', type: 'movement' },
        { id: '4-connection-meditation', time: '8:30 PM', activity: 'Connection Meditation', duration: '15 min', type: 'mindfulness' }
      ]
    },
    {
      day: 5,
      theme: 'Self-Compassion Deepening',
      focus: 'Developing stronger self-compassion practices for depression',
      morning: [
        { id: '5-compassion-wake', time: '8:30 AM', activity: 'Compassionate Awakening', duration: '12 min', type: 'reflection' },
        { id: '5-loving-breathing', time: '8:42 AM', activity: 'Loving-Kindness Breathing', duration: '10 min', type: 'mindfulness' },
        { id: '5-kind-breakfast', time: '9:00 AM', activity: 'Self-Kind Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '5-compassion-movement', time: '9:30 AM', activity: 'Compassionate Movement', duration: '15 min', type: 'movement' }
      ],
      afternoon: [
        { id: '5-compassion-lunch', time: '12:30 PM', activity: 'Self-Compassion Lunch', duration: '25 min', type: 'nutrition' },
        { id: '5-compassion-letter', time: '1:30 PM', activity: 'Compassionate Letter to Self', duration: '25 min', type: 'therapy', guideId: 'self-compassion-letter' },
        { id: '5-self-care-activity', time: '2:00 PM', activity: 'One Self-Care Activity', duration: '20 min', type: 'healing' },
        { id: '5-gentle-nature', time: '2:30 PM', activity: 'Gentle Nature Self-Care', duration: '15 min', type: 'nature' }
      ],
      evening: [
        { id: '5-nourishing-dinner', time: '6:30 PM', activity: 'Nourishing Dinner', duration: '30 min', type: 'nutrition' },
        { id: '5-compassion-reflection', time: '7:30 PM', activity: 'Compassion Practice Reflection', duration: '10 min', type: 'reflection' },
        { id: '5-restorative-movement', time: '8:00 PM', activity: 'Restorative Movement', duration: '20 min', type: 'movement' },
        { id: '5-loving-meditation', time: '8:30 PM', activity: 'Loving-Kindness for Depression', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 6,
      theme: 'Energy & Vitality Building',
      focus: 'Gradually increasing energy through movement and nutrition',
      morning: [
        { id: '6-energy-wake', time: '8:30 AM', activity: 'Vitality Check-In', duration: '10 min', type: 'reflection' },
        { id: '6-vitality-breathing', time: '8:40 AM', activity: 'Vitality-Building Breathing', duration: '12 min', type: 'mindfulness' },
        { id: '6-power-breakfast', time: '9:00 AM', activity: 'Power-Building Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '6-energy-movement', time: '9:30 AM', activity: 'Energy-Building Movement', duration: '20 min', type: 'movement', modifications: ['Gradual intensity'] }
      ],
      afternoon: [
        { id: '6-vitality-lunch', time: '12:30 PM', activity: 'Vitality Lunch', duration: '25 min', type: 'nutrition' },
        { id: '6-energy-cycle', time: '1:30 PM', activity: 'Understanding Energy Cycles', duration: '20 min', type: 'therapy' },
        { id: '6-accomplishment-task', time: '2:00 PM', activity: 'Small Accomplishment Task', duration: '25 min', type: 'healing' },
        { id: '6-energizing-nature', time: '2:30 PM', activity: 'Energizing Nature Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '6-energy-dinner', time: '6:30 PM', activity: 'Energy-Supporting Dinner', duration: '30 min', type: 'nutrition' },
        { id: '6-vitality-reflection', time: '7:30 PM', activity: 'Energy Reflection', duration: '10 min', type: 'reflection' },
        { id: '6-flowing-movement', time: '8:00 PM', activity: 'Flowing Movement Practice', duration: '20 min', type: 'movement' },
        { id: '6-rest-meditation', time: '8:30 PM', activity: 'Restorative Sleep Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 7,
      theme: 'Midpoint Integration',
      focus: 'Reviewing progress and adjusting practices',
      morning: [
        { id: '7-progress-check', time: '8:30 AM', activity: 'Midpoint Progress Check', duration: '15 min', type: 'reflection' },
        { id: '7-integration-breathing', time: '8:45 AM', activity: 'Integration Breathing', duration: '10 min', type: 'mindfulness' },
        { id: '7-celebration-breakfast', time: '9:00 AM', activity: 'Progress Celebration Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '7-integration-movement', time: '9:30 AM', activity: 'Integration Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '7-mindful-lunch', time: '12:30 PM', activity: 'Mindful Integration Lunch', duration: '25 min', type: 'nutrition' },
        { id: '7-what-works', time: '1:30 PM', activity: 'What Is Working Assessment', duration: '25 min', type: 'therapy' },
        { id: '7-favorite-activity', time: '2:00 PM', activity: 'Favorite Pleasant Activity', duration: '25 min', type: 'healing' },
        { id: '7-gratitude-nature', time: '2:30 PM', activity: 'Gratitude Nature Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '7-integration-dinner', time: '6:30 PM', activity: 'Integration Dinner', duration: '30 min', type: 'nutrition' },
        { id: '7-progress-reflection', time: '7:30 PM', activity: 'Progress Reflection', duration: '15 min', type: 'reflection' },
        { id: '7-celebration-yoga', time: '8:00 PM', activity: 'Celebration Yoga', duration: '20 min', type: 'movement' },
        { id: '7-gratitude-meditation', time: '8:30 PM', activity: 'Gratitude Meditation', duration: '15 min', type: 'mindfulness' }
      ]
    },
    {
      day: 8,
      theme: 'Thought Patterns & Beliefs',
      focus: 'Working with depression-related thought patterns',
      morning: [
        { id: '8-thought-check', time: '8:30 AM', activity: 'Thought Pattern Check-In', duration: '12 min', type: 'reflection' },
        { id: '8-clarity-breathing', time: '8:42 AM', activity: 'Mental Clarity Breathing', duration: '10 min', type: 'mindfulness' },
        { id: '8-brain-breakfast', time: '9:00 AM', activity: 'Brain-Supporting Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '8-clarity-movement', time: '9:30 AM', activity: 'Mental Clarity Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '8-nourishing-lunch', time: '12:30 PM', activity: 'Nourishing Lunch', duration: '25 min', type: 'nutrition' },
        { id: '8-thought-work', time: '1:30 PM', activity: 'Depression Thought Work', duration: '25 min', type: 'therapy', guideId: 'cognitive-reframing' },
        { id: '8-belief-examination', time: '2:00 PM', activity: 'Core Belief Examination', duration: '20 min', type: 'therapy' },
        { id: '8-affirmation-practice', time: '2:30 PM', activity: 'Gentle Affirmation Practice', duration: '15 min', type: 'healing' },
        { id: '8-mindful-nature', time: '2:50 PM', activity: 'Mindful Nature Experience', duration: '15 min', type: 'nature' }
      ],
      evening: [
        { id: '8-clarity-dinner', time: '6:30 PM', activity: 'Clarity-Supporting Dinner', duration: '30 min', type: 'nutrition' },
        { id: '8-thought-reflection', time: '7:30 PM', activity: 'Thought Pattern Reflection', duration: '10 min', type: 'reflection' },
        { id: '8-releasing-movement', time: '8:00 PM', activity: 'Thought-Releasing Movement', duration: '20 min', type: 'movement' },
        { id: '8-peaceful-meditation', time: '8:30 PM', activity: 'Peaceful Mind Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 9,
      theme: 'Purpose & Meaning',
      focus: 'Reconnecting with purpose and meaning in life',
      morning: [
        { id: '9-purpose-check', time: '8:30 AM', activity: 'Purpose Check-In', duration: '12 min', type: 'reflection' },
        { id: '9-purpose-breathing', time: '8:42 AM', activity: 'Purposeful Breathing', duration: '10 min', type: 'mindfulness' },
        { id: '9-meaningful-breakfast', time: '9:00 AM', activity: 'Meaningful Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '9-purposeful-movement', time: '9:30 AM', activity: 'Purposeful Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '9-purpose-lunch', time: '12:30 PM', activity: 'Purpose-Aligned Lunch', duration: '25 min', type: 'nutrition' },
        { id: '9-values-work', time: '1:30 PM', activity: 'Values Clarification Work', duration: '25 min', type: 'therapy', guideId: 'core-values-identification' },
        { id: '9-meaning-making', time: '2:00 PM', activity: 'Meaning-Making Practice', duration: '20 min', type: 'healing' },
        { id: '9-purpose-action', time: '2:30 PM', activity: 'One Purpose-Aligned Action', duration: '20 min', type: 'healing' },
        { id: '9-meaningful-nature', time: '2:55 PM', activity: 'Meaningful Nature Connection', duration: '15 min', type: 'nature' }
      ],
      evening: [
        { id: '9-values-dinner', time: '6:30 PM', activity: 'Values-Aligned Dinner', duration: '30 min', type: 'nutrition' },
        { id: '9-purpose-reflection', time: '7:30 PM', activity: 'Purpose Reflection', duration: '10 min', type: 'reflection' },
        { id: '9-meaningful-movement', time: '8:00 PM', activity: 'Meaningful Movement', duration: '20 min', type: 'movement' },
        { id: '9-purpose-meditation', time: '8:30 PM', activity: 'Purpose Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 10,
      theme: 'Joy & Pleasure',
      focus: 'Reconnecting with joy and pleasure in small moments',
      morning: [
        { id: '10-joy-check', time: '8:30 AM', activity: 'Joy Capacity Check-In', duration: '10 min', type: 'reflection' },
        { id: '10-joy-breathing', time: '8:40 AM', activity: 'Joy-Cultivating Breathing', duration: '10 min', type: 'mindfulness' },
        { id: '10-pleasure-breakfast', time: '9:00 AM', activity: 'Pleasurable Breakfast', duration: '25 min', type: 'nutrition', description: 'Foods you enjoy' },
        { id: '10-joyful-movement', time: '9:30 AM', activity: 'Joyful Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '10-pleasure-lunch', time: '12:30 PM', activity: 'Pleasure-Focused Lunch', duration: '30 min', type: 'nutrition' },
        { id: '10-pleasure-planning', time: '1:30 PM', activity: 'Pleasure Planning Practice', duration: '20 min', type: 'therapy' },
        { id: '10-joy-activity', time: '2:00 PM', activity: 'One Joyful Activity', duration: '30 min', type: 'healing', description: 'Something purely for pleasure' },
        { id: '10-beauty-nature', time: '2:35 PM', activity: 'Beauty-Seeking Nature Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '10-joyful-dinner', time: '6:30 PM', activity: 'Joyful Dinner Experience', duration: '35 min', type: 'nutrition' },
        { id: '10-joy-reflection', time: '7:30 PM', activity: 'Joy Reflection', duration: '10 min', type: 'reflection' },
        { id: '10-playful-movement', time: '8:00 PM', activity: 'Playful Movement', duration: '20 min', type: 'movement' },
        { id: '10-joy-meditation', time: '8:30 PM', activity: 'Joy Cultivation Meditation', duration: '15 min', type: 'mindfulness' }
      ]
    },
    {
      day: 11,
      theme: 'Sustainable Practices',
      focus: 'Creating sustainable mood-supporting practices',
      morning: [
        { id: '11-sustainability-check', time: '8:30 AM', activity: 'Sustainability Check-In', duration: '12 min', type: 'reflection' },
        { id: '11-sustainable-breathing', time: '8:42 AM', activity: 'Sustainable Practice Breathing', duration: '10 min', type: 'mindfulness' },
        { id: '11-routine-breakfast', time: '9:00 AM', activity: 'Sustainable Routine Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '11-routine-movement', time: '9:30 AM', activity: 'Routine Movement Practice', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '11-sustainable-lunch', time: '12:30 PM', activity: 'Sustainable Lunch Practice', duration: '25 min', type: 'nutrition' },
        { id: '11-habit-building', time: '1:30 PM', activity: 'Depression-Prevention Habits', duration: '25 min', type: 'therapy' },
        { id: '11-routine-design', time: '2:00 PM', activity: 'Sustainable Routine Design', duration: '25 min', type: 'healing' },
        { id: '11-regular-nature', time: '2:30 PM', activity: 'Regular Nature Practice', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '11-sustainable-dinner', time: '6:30 PM', activity: 'Sustainable Evening Meal', duration: '30 min', type: 'nutrition' },
        { id: '11-sustainability-reflection', time: '7:30 PM', activity: 'Sustainability Reflection', duration: '10 min', type: 'reflection' },
        { id: '11-routine-yoga', time: '8:00 PM', activity: 'Routine Yoga Practice', duration: '20 min', type: 'movement' },
        { id: '11-routine-meditation', time: '8:30 PM', activity: 'Routine Sleep Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 12,
      theme: 'Relapse Prevention',
      focus: 'Identifying warning signs and prevention strategies',
      morning: [
        { id: '12-prevention-check', time: '8:30 AM', activity: 'Prevention Check-In', duration: '12 min', type: 'reflection' },
        { id: '12-prevention-breathing', time: '8:42 AM', activity: 'Prevention Practice Breathing', duration: '10 min', type: 'mindfulness' },
        { id: '12-protective-breakfast', time: '9:00 AM', activity: 'Protective Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '12-prevention-movement', time: '9:30 AM', activity: 'Prevention Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '12-prevention-lunch', time: '12:30 PM', activity: 'Prevention Lunch', duration: '25 min', type: 'nutrition' },
        { id: '12-warning-signs', time: '1:30 PM', activity: 'Early Warning Signs Mapping', duration: '25 min', type: 'therapy' },
        { id: '12-action-plan', time: '2:00 PM', activity: 'Relapse Prevention Action Plan', duration: '25 min', type: 'healing' },
        { id: '12-support-network', time: '2:30 PM', activity: 'Support Network Review', duration: '20 min', type: 'reflection' },
        { id: '12-grounding-nature', time: '2:55 PM', activity: 'Grounding Nature Practice', duration: '15 min', type: 'nature' }
      ],
      evening: [
        { id: '12-prevention-dinner', time: '6:30 PM', activity: 'Prevention Dinner', duration: '30 min', type: 'nutrition' },
        { id: '12-prevention-reflection', time: '7:30 PM', activity: 'Prevention Strategy Reflection', duration: '10 min', type: 'reflection' },
        { id: '12-anchoring-movement', time: '8:00 PM', activity: 'Anchoring Movement', duration: '20 min', type: 'movement' },
        { id: '12-safety-meditation', time: '8:30 PM', activity: 'Safety & Support Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 13,
      theme: 'Future Visioning',
      focus: 'Creating vision for life beyond depression',
      morning: [
        { id: '13-vision-check', time: '8:30 AM', activity: 'Future Vision Check-In', duration: '12 min', type: 'reflection' },
        { id: '13-hope-breathing', time: '8:42 AM', activity: 'Hope-Building Breathing', duration: '10 min', type: 'mindfulness' },
        { id: '13-future-breakfast', time: '9:00 AM', activity: 'Future-Focused Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '13-forward-movement', time: '9:30 AM', activity: 'Forward-Moving Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '13-vision-lunch', time: '12:30 PM', activity: 'Vision Lunch', duration: '25 min', type: 'nutrition' },
        { id: '13-life-visioning', time: '1:30 PM', activity: 'Life Visioning Exercise', duration: '30 min', type: 'therapy', guideId: 'future-self-visualization' },
        { id: '13-goal-setting', time: '2:05 PM', activity: 'Gentle Goal Setting', duration: '25 min', type: 'healing' },
        { id: '13-hope-nature', time: '2:35 PM', activity: 'Hope-Filled Nature Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '13-vision-dinner', time: '6:30 PM', activity: 'Vision Dinner', duration: '30 min', type: 'nutrition' },
        { id: '13-vision-reflection', time: '7:30 PM', activity: 'Future Vision Reflection', duration: '15 min', type: 'reflection', guideId: 'narrative-therapy-letter-writing' },
        { id: '13-opening-movement', time: '8:00 PM', activity: 'Opening Movement', duration: '20 min', type: 'movement' },
        { id: '13-hope-meditation', time: '8:30 PM', activity: 'Hope & Possibility Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 14,
      theme: 'Completion & New Beginning',
      focus: 'Celebrating progress and transitioning to ongoing wellness',
      morning: [
        { id: '14-completion-check', time: '8:30 AM', activity: 'Completion Check-In', duration: '15 min', type: 'reflection' },
        { id: '14-gratitude-breathing', time: '8:45 AM', activity: 'Gratitude Breathing', duration: '12 min', type: 'mindfulness' },
        { id: '14-celebration-breakfast', time: '9:00 AM', activity: 'Celebration Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '14-celebration-movement', time: '9:35 AM', activity: 'Celebration Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '14-celebration-lunch', time: '12:30 PM', activity: 'Celebration Lunch', duration: '30 min', type: 'nutrition' },
        { id: '14-progress-review', time: '1:30 PM', activity: 'Full Progress Review', duration: '30 min', type: 'reflection' },
        { id: '14-commitment-practice', time: '2:05 PM', activity: 'Ongoing Wellness Commitment', duration: '25 min', type: 'healing' },
        { id: '14-gratitude-nature', time: '2:35 PM', activity: 'Gratitude Nature Celebration', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '14-celebratory-dinner', time: '6:30 PM', activity: 'Celebratory Dinner', duration: '40 min', type: 'nutrition' },
        { id: '14-completion-letter', time: '7:30 PM', activity: 'Letter to Future Self', duration: '20 min', type: 'reflection', guideId: 'narrative-therapy-letter-writing' },
        { id: '14-integration-yoga', time: '8:00 PM', activity: 'Integration Yoga', duration: '25 min', type: 'movement' },
        { id: '14-completion-meditation', time: '8:35 PM', activity: 'Completion & New Dawn Meditation', duration: '25 min', type: 'mindfulness' }
      ]
    }
  ]
};