import { RetreatConfiguration } from '@/types/retreat';

export const stressManagementRetreat: RetreatConfiguration = {
  id: 'stress_management',
  name: 'Calm Waters: Comprehensive Stress Management',
  description: 'A practical 10-day program focused on immediate stress relief and long-term stress management strategies. Perfect for anyone feeling overwhelmed by daily life pressures.',
  shortDescription: 'Practical stress relief through proven management techniques',
  duration: 10,
  focusAreas: ['Immediate Stress Relief', 'Stress Prevention', 'Resilience Building', 'Work-Life Balance', 'Relaxation Skills'],
  principles: ['Evidence-Based', 'Practical Application', 'Sustainable Practices', 'Holistic Wellness', 'Self-Empowerment'],
  targetConditions: ['Chronic Stress', 'Work Stress', 'Life Transitions', 'Overwhelm', 'General Anxiety'],
  contraindications: ['Severe Anxiety requiring medication', 'Active Panic Disorder', 'Severe Depression'],
  riskLevel: 'low',
  requiresSupervision: false,
  days: [
    {
      day: 1,
      theme: 'Stress Awareness & Quick Relief',
      focus: 'Understanding your stress patterns and learning immediate relief techniques',
      morning: [
        { id: '1-stress-assessment', time: '7:00 AM', activity: 'Personal Stress Assessment', duration: '15 min', type: 'reflection', description: 'Identify your unique stress patterns' },
        { id: '1-instant-calm-breathing', time: '7:15 AM', activity: 'Instant Calm Breathing', duration: '10 min', type: 'mindfulness', guideId: 'gentle-wake-up-breathing' },
        { id: '1-energizing-breakfast', time: '7:30 AM', activity: 'Anti-Stress Breakfast', duration: '25 min', type: 'nutrition', description: 'Foods that naturally reduce stress hormones' },
        { id: '1-wake-up-movement', time: '8:00 AM', activity: 'Wake-Up Stress Shake', duration: '15 min', type: 'movement', modifications: ['High and low intensity options'] }
      ],
      afternoon: [
        { id: '1-stress-free-lunch', time: '12:00 PM', activity: 'Stress-Free Lunch Break', duration: '30 min', type: 'nutrition' },
        { id: '1-stress-cycle-education', time: '1:00 PM', activity: 'Understanding the Stress Cycle', duration: '20 min', type: 'therapy', guideId: 'emotion-regulation-techniques' },
        { id: '1-quick-reset', time: '1:30 PM', activity: '5-Minute Stress Reset Techniques', duration: '15 min', type: 'healing', guideId: 'somatic-grounding-practice' },
        { id: '1-trigger-mapping', time: '2:00 PM', activity: 'Stress Trigger Mapping', duration: '20 min', type: 'reflection' },
        { id: '1-nature-destress', time: '2:30 PM', activity: 'Nature De-Stress Walk', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '1-calming-dinner', time: '6:30 PM', activity: 'Calming Evening Meal', duration: '35 min', type: 'nutrition' },
        { id: '1-stress-journal', time: '7:30 PM', activity: 'Stress Release Journaling', duration: '15 min', type: 'reflection' },
        { id: '1-tension-release', time: '8:00 PM', activity: 'Physical Tension Release', duration: '20 min', type: 'movement' },
        { id: '1-sleep-prep', time: '8:30 PM', activity: 'Stress-Free Sleep Preparation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 2,
      theme: 'Building Stress Resilience',
      focus: 'Developing long-term resilience and stress prevention strategies',
      morning: [
        { id: '2-resilience-check', time: '7:00 AM', activity: 'Daily Resilience Check-In', duration: '10 min', type: 'reflection' },
        { id: '2-power-breathing', time: '7:10 AM', activity: 'Resilience Power Breathing', duration: '12 min', type: 'mindfulness' },
        { id: '2-brain-food-breakfast', time: '7:25 AM', activity: 'Brain-Supporting Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '2-strength-movement', time: '7:55 AM', activity: 'Inner Strength Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '2-power-lunch', time: '12:00 PM', activity: 'Power Lunch for Resilience', duration: '30 min', type: 'nutrition' },
        { id: '2-cognitive-tools', time: '1:00 PM', activity: 'Cognitive Stress Management Tools', duration: '25 min', type: 'therapy', guideId: 'emotion-regulation-techniques' },
        { id: '2-boundary-setting', time: '1:30 PM', activity: 'Stress-Reducing Boundary Setting', duration: '20 min', type: 'therapy' },
        { id: '2-energy-management', time: '2:00 PM', activity: 'Daily Energy Management', duration: '20 min', type: 'healing' },
        { id: '2-mindful-walking', time: '2:30 PM', activity: 'Mindful Stress-Relief Walking', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '2-nourishing-dinner', time: '6:30 PM', activity: 'Deeply Nourishing Dinner', duration: '35 min', type: 'nutrition' },
        { id: '2-wins-celebration', time: '7:30 PM', activity: 'Celebrating Daily Wins', duration: '10 min', type: 'reflection' },
        { id: '2-stress-yoga', time: '8:00 PM', activity: 'Stress-Relief Yoga Flow', duration: '25 min', type: 'movement' },
        { id: '2-peaceful-meditation', time: '8:30 PM', activity: 'Peaceful Mind Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 3,
      theme: 'Cognitive Reframing',
      focus: 'Changing thought patterns that create stress',
      morning: [
        { id: '3-thought-check', time: '7:00 AM', activity: 'Daily Thought Check', duration: '12 min', type: 'reflection' },
        { id: '3-mindful-breathing', time: '7:12 AM', activity: 'Mindful Morning Breathing', duration: '10 min', type: 'mindfulness' },
        { id: '3-brain-breakfast', time: '7:25 AM', activity: 'Brain-Health Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '3-morning-flow', time: '7:55 AM', activity: 'Morning Flow Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '3-mindful-lunch', time: '12:00 PM', activity: 'Mindful Lunch Practice', duration: '30 min', type: 'nutrition' },
        { id: '3-cognitive-tools', time: '1:00 PM', activity: 'Cognitive Reframing Tools', duration: '25 min', type: 'therapy', guideId: 'emotion-regulation-techniques' },
        { id: '3-worry-workshop', time: '1:30 PM', activity: 'Worry Management Workshop', duration: '20 min', type: 'therapy' },
        { id: '3-thought-journaling', time: '2:00 PM', activity: 'Thought Pattern Journaling', duration: '20 min', type: 'reflection' },
        { id: '3-walking-meditation', time: '2:30 PM', activity: 'Walking Meditation', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '3-calm-dinner', time: '6:30 PM', activity: 'Calming Dinner Ritual', duration: '35 min', type: 'nutrition' },
        { id: '3-thought-review', time: '7:30 PM', activity: 'Thought Pattern Review', duration: '15 min', type: 'reflection' },
        { id: '3-release-movement', time: '8:00 PM', activity: 'Stress Release Movement', duration: '20 min', type: 'movement' },
        { id: '3-peace-meditation', time: '8:30 PM', activity: 'Peace of Mind Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 4,
      theme: 'Boundary Setting',
      focus: 'Creating healthy boundaries to reduce stress',
      morning: [
        { id: '4-boundary-check', time: '7:00 AM', activity: 'Boundary Assessment', duration: '15 min', type: 'reflection' },
        { id: '4-power-breathing', time: '7:15 AM', activity: 'Power Breathing Practice', duration: '10 min', type: 'mindfulness' },
        { id: '4-energy-breakfast', time: '7:30 AM', activity: 'Energy-Sustaining Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '4-strength-movement', time: '8:00 AM', activity: 'Inner Strength Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '4-nourishing-lunch', time: '12:00 PM', activity: 'Nourishing Lunch', duration: '30 min', type: 'nutrition' },
        { id: '4-boundary-workshop', time: '1:00 PM', activity: 'Healthy Boundaries Workshop', duration: '30 min', type: 'therapy' },
        { id: '4-saying-no', time: '1:35 PM', activity: 'Practicing Saying No', duration: '15 min', type: 'therapy' },
        { id: '4-values-alignment', time: '2:00 PM', activity: 'Values Alignment Check', duration: '20 min', type: 'reflection', guideId: 'core-values-identification' },
        { id: '4-nature-grounding', time: '2:30 PM', activity: 'Grounding Nature Walk', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '4-boundary-dinner', time: '6:30 PM', activity: 'Boundary-Respecting Dinner Time', duration: '35 min', type: 'nutrition' },
        { id: '4-boundary-reflection', time: '7:30 PM', activity: 'Boundary Success Journaling', duration: '15 min', type: 'reflection' },
        { id: '4-yoga-boundaries', time: '8:00 PM', activity: 'Boundary-Affirming Yoga', duration: '25 min', type: 'movement' },
        { id: '4-self-care-meditation', time: '8:30 PM', activity: 'Self-Care Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 5,
      theme: 'Energy Restoration',
      focus: 'Rebuilding energy reserves and vitality',
      morning: [
        { id: '5-energy-assessment', time: '7:00 AM', activity: 'Energy Level Assessment', duration: '10 min', type: 'reflection' },
        { id: '5-vitality-breathing', time: '7:10 AM', activity: 'Vitality Breathing', duration: '12 min', type: 'mindfulness' },
        { id: '5-power-breakfast', time: '7:25 AM', activity: 'High-Energy Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '5-energizing-movement', time: '7:55 AM', activity: 'Energizing Movement Practice', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '5-restorative-lunch', time: '12:00 PM', activity: 'Restorative Lunch', duration: '30 min', type: 'nutrition' },
        { id: '5-energy-management', time: '1:00 PM', activity: 'Energy Management Skills', duration: '25 min', type: 'therapy' },
        { id: '5-rest-practice', time: '1:30 PM', activity: 'Active Rest Practice', duration: '20 min', type: 'healing' },
        { id: '5-energy-mapping', time: '2:00 PM', activity: 'Personal Energy Mapping', duration: '20 min', type: 'reflection' },
        { id: '5-rejuvenating-nature', time: '2:30 PM', activity: 'Rejuvenating Nature Time', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '5-replenishing-dinner', time: '6:30 PM', activity: 'Replenishing Dinner', duration: '35 min', type: 'nutrition' },
        { id: '5-energy-gratitude', time: '7:30 PM', activity: 'Energy Gratitude Practice', duration: '10 min', type: 'reflection' },
        { id: '5-restorative-yoga', time: '8:00 PM', activity: 'Restorative Yoga Flow', duration: '25 min', type: 'movement' },
        { id: '5-recharge-meditation', time: '8:30 PM', activity: 'Deep Recharge Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 6,
      theme: 'Mindful Living',
      focus: 'Integrating mindfulness into daily activities',
      morning: [
        { id: '6-mindful-awakening', time: '7:00 AM', activity: 'Mindful Awakening', duration: '15 min', type: 'mindfulness' },
        { id: '6-present-moment', time: '7:15 AM', activity: 'Present Moment Practice', duration: '10 min', type: 'mindfulness' },
        { id: '6-mindful-breakfast', time: '7:30 AM', activity: 'Mindful Breakfast Experience', duration: '25 min', type: 'nutrition' },
        { id: '6-flowing-movement', time: '8:00 AM', activity: 'Mindful Flowing Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '6-conscious-lunch', time: '12:00 PM', activity: 'Conscious Eating Lunch', duration: '30 min', type: 'nutrition' },
        { id: '6-mindfulness-skills', time: '1:00 PM', activity: 'Practical Mindfulness Skills', duration: '25 min', type: 'therapy' },
        { id: '6-sensory-awareness', time: '1:30 PM', activity: 'Sensory Awareness Practice', duration: '20 min', type: 'healing' },
        { id: '6-mindful-activities', time: '2:00 PM', activity: 'Mindful Daily Activities', duration: '20 min', type: 'reflection' },
        { id: '6-nature-mindfulness', time: '2:30 PM', activity: 'Mindful Nature Immersion', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '6-present-dinner', time: '6:30 PM', activity: 'Present Moment Dinner', duration: '35 min', type: 'nutrition' },
        { id: '6-day-reflection', time: '7:30 PM', activity: 'Mindful Day Reflection', duration: '15 min', type: 'reflection' },
        { id: '6-awareness-movement', time: '8:00 PM', activity: 'Body Awareness Movement', duration: '20 min', type: 'movement' },
        { id: '6-meditation-practice', time: '8:30 PM', activity: 'Deepening Meditation Practice', duration: '25 min', type: 'mindfulness' }
      ]
    },
    {
      day: 7,
      theme: 'Emotional Resilience',
      focus: 'Building capacity to handle stress and challenges',
      morning: [
        { id: '7-resilience-check', time: '7:00 AM', activity: 'Resilience Self-Check', duration: '12 min', type: 'reflection' },
        { id: '7-strength-breathing', time: '7:12 AM', activity: 'Inner Strength Breathing', duration: '10 min', type: 'mindfulness' },
        { id: '7-resilience-breakfast', time: '7:25 AM', activity: 'Resilience-Building Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '7-empowering-movement', time: '7:55 AM', activity: 'Empowering Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '7-strengthening-lunch', time: '12:00 PM', activity: 'Strengthening Lunch', duration: '30 min', type: 'nutrition' },
        { id: '7-resilience-tools', time: '1:00 PM', activity: 'Resilience Building Tools', duration: '30 min', type: 'therapy' },
        { id: '7-challenge-response', time: '1:35 PM', activity: 'Stress Challenge Response Practice', duration: '20 min', type: 'therapy' },
        { id: '7-growth-reflection', time: '2:05 PM', activity: 'Growth Mindset Reflection', duration: '20 min', type: 'reflection' },
        { id: '7-nature-strength', time: '2:35 PM', activity: 'Nature-Based Strengthening', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '7-celebration-dinner', time: '6:30 PM', activity: 'Mid-Journey Celebration Dinner', duration: '40 min', type: 'nutrition' },
        { id: '7-wins-review', time: '7:30 PM', activity: 'Week Review & Wins', duration: '15 min', type: 'reflection' },
        { id: '7-power-yoga', time: '8:00 PM', activity: 'Empowering Yoga Practice', duration: '25 min', type: 'movement' },
        { id: '7-strength-meditation', time: '8:30 PM', activity: 'Inner Strength Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 8,
      theme: 'Joy & Pleasure',
      focus: 'Reconnecting with joy and reducing stress through pleasure',
      morning: [
        { id: '8-joy-inventory', time: '7:00 AM', activity: 'Personal Joy Inventory', duration: '15 min', type: 'reflection' },
        { id: '8-joyful-breathing', time: '7:15 AM', activity: 'Joyful Breathing Practice', duration: '10 min', type: 'mindfulness' },
        { id: '8-pleasure-breakfast', time: '7:30 AM', activity: 'Pleasure-Focused Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '8-playful-movement', time: '8:00 AM', activity: 'Playful Movement Practice', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '8-delightful-lunch', time: '12:00 PM', activity: 'Delightful Lunch Experience', duration: '30 min', type: 'nutrition' },
        { id: '8-pleasure-activation', time: '1:00 PM', activity: 'Pleasure Activation Techniques', duration: '25 min', type: 'therapy' },
        { id: '8-creative-expression', time: '1:30 PM', activity: 'Creative Joy Expression', duration: '25 min', type: 'creative' },
        { id: '8-gratitude-practice', time: '2:00 PM', activity: 'Gratitude for Joy Practice', duration: '15 min', type: 'reflection' },
        { id: '8-nature-joy', time: '2:25 PM', activity: 'Joyful Nature Experience', duration: '30 min', type: 'nature' }
      ],
      evening: [
        { id: '8-celebration-meal', time: '6:30 PM', activity: 'Celebration Meal', duration: '40 min', type: 'nutrition' },
        { id: '8-joy-journaling', time: '7:30 PM', activity: 'Joy Journaling', duration: '15 min', type: 'reflection' },
        { id: '8-dance-movement', time: '8:00 PM', activity: 'Dance or Free Movement', duration: '20 min', type: 'movement' },
        { id: '8-joy-meditation', time: '8:30 PM', activity: 'Loving-Kindness Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 9,
      theme: 'Sustainable Practices',
      focus: 'Creating sustainable long-term stress management',
      morning: [
        { id: '9-sustainability-planning', time: '7:00 AM', activity: 'Sustainability Life Planning', duration: '20 min', type: 'reflection' },
        { id: '9-routine-breathing', time: '7:20 AM', activity: 'Sustainable Breathing Routine', duration: '10 min', type: 'mindfulness' },
        { id: '9-realistic-breakfast', time: '7:35 AM', activity: 'Realistic Daily Breakfast', duration: '20 min', type: 'nutrition' },
        { id: '9-maintainable-movement', time: '8:00 AM', activity: 'Maintainable Movement Practice', duration: '15 min', type: 'movement' }
      ],
      afternoon: [
        { id: '9-simple-lunch', time: '12:00 PM', activity: 'Simple Sustainable Lunch', duration: '25 min', type: 'nutrition' },
        { id: '9-integration-planning', time: '1:00 PM', activity: 'Practice Integration Planning', duration: '30 min', type: 'therapy' },
        { id: '9-habit-building', time: '1:35 PM', activity: 'Stress-Management Habit Building', duration: '20 min', type: 'therapy' },
        { id: '9-commitment-review', time: '2:05 PM', activity: 'Personal Commitment Review', duration: '20 min', type: 'reflection' },
        { id: '9-nature-routine', time: '2:35 PM', activity: 'Regular Nature Routine', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '9-everyday-dinner', time: '6:30 PM', activity: 'Everyday Healthy Dinner', duration: '30 min', type: 'nutrition' },
        { id: '9-future-planning', time: '7:30 PM', activity: 'Future Self Planning', duration: '20 min', type: 'reflection' },
        { id: '9-regular-yoga', time: '8:00 PM', activity: 'Regular Yoga Practice', duration: '20 min', type: 'movement' },
        { id: '9-nightly-meditation', time: '8:30 PM', activity: 'Nightly Meditation Routine', duration: '15 min', type: 'mindfulness' }
      ]
    },
    {
      day: 10,
      theme: 'Integration & Celebration',
      focus: 'Celebrating progress and integrating learning into life',
      morning: [
        { id: '10-journey-reflection', time: '7:00 AM', activity: 'Full Journey Reflection', duration: '25 min', type: 'reflection' },
        { id: '10-gratitude-breathing', time: '7:25 AM', activity: 'Gratitude Breathing', duration: '10 min', type: 'mindfulness' },
        { id: '10-celebration-breakfast', time: '7:40 AM', activity: 'Celebration Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '10-victory-movement', time: '8:15 AM', activity: 'Victory Movement Celebration', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '10-completion-lunch', time: '12:00 PM', activity: 'Completion Lunch', duration: '35 min', type: 'nutrition' },
        { id: '10-future-visioning', time: '1:00 PM', activity: 'Future Self Visioning', duration: '30 min', type: 'therapy' },
        { id: '10-commitment-ceremony', time: '1:35 PM', activity: 'Personal Commitment Ceremony', duration: '25 min', type: 'healing' },
        { id: '10-letter-to-self', time: '2:10 PM', activity: 'Letter to Future Self', duration: '25 min', type: 'reflection', guideId: 'narrative-therapy-letter-writing' },
        { id: '10-gratitude-walk', time: '2:45 PM', activity: 'Final Gratitude Walk', duration: '30 min', type: 'nature' }
      ],
      evening: [
        { id: '10-closing-dinner', time: '6:30 PM', activity: 'Closing Ceremony Dinner', duration: '45 min', type: 'nutrition' },
        { id: '10-transformation-review', time: '7:30 PM', activity: 'Transformation Review', duration: '20 min', type: 'reflection' },
        { id: '10-celebration-flow', time: '8:00 PM', activity: 'Celebration Flow Practice', duration: '25 min', type: 'movement' },
        { id: '10-completion-meditation', time: '8:30 PM', activity: 'Completion & Gratitude Meditation', duration: '30 min', type: 'mindfulness' }
      ]
    }
  ]
};