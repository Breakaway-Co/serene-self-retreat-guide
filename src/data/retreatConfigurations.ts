import { RetreatConfiguration } from '@/types/retreat';

export const retreatConfigurations: Record<string, RetreatConfiguration> = {
  inner_compass: {
    id: 'inner_compass',
    name: 'Inner Compass: Stress Recovery Retreat',
    description: 'A comprehensive 14-day program designed to help you develop effective stress management strategies and restore inner balance.',
    shortDescription: 'Stress management through mindfulness and somatic practices',
    duration: 14,
    focusAreas: ['Stress Management', 'Mindfulness', 'Work-Life Balance', 'Nervous System Regulation'],
    principles: ['Trauma-Informed', 'Evidence-Based', 'Holistic Healing', 'Self-Compassion'],
    targetConditions: ['Chronic Stress', 'Burnout', 'Work Stress', 'General Anxiety'],
    contraindications: ['Active Psychosis', 'Severe Depression (PHQ-9 > 20)', 'Active Suicidal Ideation'],
    riskLevel: 'low',
    requiresSupervision: false,
    days: [
      {
        day: 1,
        theme: 'Foundation & Safety',
        focus: 'Creating a safe space and establishing stress-aware routines',
        morning: [
          { id: '1-gentle-breathing', time: '7:00 AM', activity: 'Gentle Wake-Up Breathing', duration: '10 min', type: 'mindfulness', guideId: 'gentle-wake-up-breathing' },
          { id: '1-stress-journal', time: '7:15 AM', activity: 'Stress Awareness Journaling', duration: '15 min', type: 'reflection', description: 'Identify stress patterns and triggers' },
          { id: '1-calming-breakfast', time: '7:30 AM', activity: 'Calming Breakfast Preparation', duration: '30 min', type: 'nutrition', description: 'Anti-inflammatory foods for stress reduction' },
          { id: '1-gentle-movement', time: '8:00 AM', activity: 'Gentle Movement for Stress Relief', duration: '20 min', type: 'movement', modifications: ['Chair-based options', 'Low impact alternatives'] }
        ],
        afternoon: [
          { id: '1-mindful-lunch', time: '12:00 PM', activity: 'Mindful Lunch Preparation', duration: '30 min', type: 'nutrition' },
          { id: '1-body-scan', time: '1:00 PM', activity: 'Stress-Release Body Scan', duration: '20 min', type: 'healing', guideId: 'stress-release-body-scan' },
          { id: '1-boundary-work', time: '2:00 PM', activity: 'Boundary Setting Practice', duration: '30 min', type: 'therapy', guideId: 'boundary-setting-practice' },
          { id: '1-nature-walk', time: '3:00 PM', activity: 'Stress-Relief Nature Walk', duration: '30 min', type: 'nature', guideId: 'stress-relief-nature-walk' }
        ],
        evening: [
          { id: '1-nourishing-dinner', time: '6:00 PM', activity: 'Nourishing Dinner Ritual', duration: '40 min', type: 'nutrition' },
          { id: '1-stress-checkin', time: '7:30 PM', activity: 'Daily Stress Check-In', duration: '15 min', type: 'reflection' },
          { id: '1-restorative-yoga', time: '8:00 PM', activity: 'Restorative Yoga for Stress', duration: '25 min', type: 'movement' },
          { id: '1-evening-meditation', time: '9:00 PM', activity: 'Evening Stress-Release Meditation', duration: '15 min', type: 'mindfulness' }
        ]
      },
      {
        day: 2,
        theme: 'Nervous System Regulation',
        focus: 'Learning to regulate your nervous system and stress responses',
        morning: [
          { id: '2-breathing-regulation', time: '7:00 AM', activity: 'Nervous System Breathing', duration: '12 min', type: 'mindfulness', guideId: 'nervous-system-breathing' },
          { id: '2-stress-patterns', time: '7:15 AM', activity: 'Stress Pattern Recognition', duration: '15 min', type: 'reflection' },
          { id: '2-adaptogenic-breakfast', time: '7:30 AM', activity: 'Adaptogenic Breakfast', duration: '30 min', type: 'nutrition' },
          { id: '2-somatic-movement', time: '8:00 AM', activity: 'Somatic Stress Release', duration: '25 min', type: 'somatic' }
        ],
        afternoon: [
          { id: '2-grounding-lunch', time: '12:00 PM', activity: 'Grounding Lunch Practice', duration: '30 min', type: 'nutrition' },
          { id: '2-progressive-relaxation', time: '1:00 PM', activity: 'Progressive Muscle Relaxation', duration: '25 min', type: 'healing', guideId: 'progressive-muscle-relaxation' },
          { id: '2-stress-toolkit', time: '2:00 PM', activity: 'Personal Stress Toolkit Building', duration: '30 min', type: 'therapy' },
          { id: '2-earthing', time: '3:00 PM', activity: 'Earthing Practice', duration: '30 min', type: 'nature' }
        ],
        evening: [
          { id: '2-comfort-dinner', time: '6:00 PM', activity: 'Comfort Food Dinner', duration: '40 min', type: 'nutrition' },
          { id: '2-wins-reflection', time: '7:30 PM', activity: 'Daily Wins & Growth', duration: '15 min', type: 'reflection' },
          { id: '2-yin-yoga', time: '8:00 PM', activity: 'Yin Yoga for Deep Rest', duration: '30 min', type: 'movement' },
          { id: '2-body-gratitude', time: '9:00 PM', activity: 'Body Gratitude Meditation', duration: '20 min', type: 'mindfulness' }
        ]
      }
    ]
  },

  still_waters: {
    id: 'still_waters',
    name: 'Still Waters: Depression & Anxiety Support Retreat',
    description: 'A gentle 14-day journey focusing on mood stabilization, anxiety reduction, and building emotional resilience.',
    shortDescription: 'Gentle support for depression and anxiety through behavioral activation',
    duration: 14,
    focusAreas: ['Depression Support', 'Anxiety Relief', 'Mood Stabilization', 'Behavioral Activation'],
    principles: ['Trauma-Informed', 'Gentle Pacing', 'Self-Compassion', 'Evidence-Based'],
    targetConditions: ['Depression', 'Anxiety', 'Low Mood', 'Social Anxiety'],
    contraindications: ['Severe Depression (PHQ-9 > 20)', 'Active Suicidal Ideation', 'Severe Anxiety (GAD-7 > 15)'],
    riskLevel: 'moderate',
    requiresSupervision: true,
    days: [
      {
        day: 1,
        theme: 'Gentle Beginning',
        focus: 'Creating safety and very gentle activation',
        morning: [
          { id: '1-gentle-awakening', time: '8:00 AM', activity: 'Extra Gentle Wake-Up', duration: '10 min', type: 'mindfulness', modifications: ['Optional', 'Stay in bed if needed'] },
          { id: '1-mood-check', time: '8:15 AM', activity: 'Gentle Mood Check-In', duration: '10 min', type: 'reflection' },
          { id: '1-nourishing-breakfast', time: '8:30 AM', activity: 'Nourishing Breakfast', duration: '30 min', type: 'nutrition', description: 'Mood-supporting nutrients' },
          { id: '1-micro-movement', time: '9:00 AM', activity: 'Micro Movement Practice', duration: '15 min', type: 'movement', modifications: ['5 minutes minimum', 'Chair-based options'] }
        ],
        afternoon: [
          { id: '1-gentle-lunch', time: '12:30 PM', activity: 'Gentle Lunch Preparation', duration: '25 min', type: 'nutrition' },
          { id: '1-safe-grounding', time: '1:30 PM', activity: 'Safe Grounding Practice', duration: '15 min', type: 'healing', guideId: 'safe-grounding-practice' },
          { id: '1-tiny-accomplishment', time: '2:00 PM', activity: 'One Tiny Accomplishment', duration: '20 min', type: 'therapy' },
          { id: '1-sunlight', time: '3:00 PM', activity: 'Sunlight Exposure', duration: '15 min', type: 'nature', modifications: ['Window sitting acceptable'] }
        ],
        evening: [
          { id: '1-simple-dinner', time: '6:30 PM', activity: 'Simple Dinner Prep', duration: '30 min', type: 'nutrition' },
          { id: '1-gratitude-moment', time: '8:00 PM', activity: 'One Gratitude Moment', duration: '5 min', type: 'reflection' },
          { id: '1-gentle-stretch', time: '8:30 PM', activity: 'Gentle Bedtime Stretch', duration: '10 min', type: 'movement' },
          { id: '1-sleep-meditation', time: '9:00 PM', activity: 'Sleep Support Meditation', duration: '20 min', type: 'mindfulness' }
        ]
      }
    ]
  },

  reset_path: {
    id: 'reset_path',
    name: 'Reset Path: Addiction Recovery Support',
    description: 'A structured 21-day program supporting addiction recovery with coping strategies and healing practices.',
    shortDescription: 'Recovery support through structured healing and coping strategies',
    duration: 21,
    focusAreas: ['Addiction Recovery', 'Coping Strategies', 'Trigger Management', 'Healthy Habits'],
    principles: ['Trauma-Informed', 'Harm Reduction', 'Evidence-Based', 'Non-Judgmental'],
    targetConditions: ['Substance Use', 'Behavioral Addictions', 'Recovery Support'],
    contraindications: ['Active Withdrawal', 'Severe Mental Health Crisis', 'Requires Medical Detox'],
    riskLevel: 'high',
    requiresSupervision: true,
    days: [
      {
        day: 1,
        theme: 'Foundation for Recovery',
        focus: 'Building safety and initial coping strategies',
        morning: [
          { id: '1-recovery-intention', time: '7:30 AM', activity: 'Recovery Intention Setting', duration: '15 min', type: 'reflection' },
          { id: '1-cleansing-breath', time: '7:45 AM', activity: 'Cleansing Breathwork', duration: '10 min', type: 'mindfulness' },
          { id: '1-nutrition-reset', time: '8:00 AM', activity: 'Nutrition Reset Breakfast', duration: '30 min', type: 'nutrition' },
          { id: '1-movement-commitment', time: '8:30 AM', activity: 'Movement Commitment', duration: '20 min', type: 'movement' }
        ],
        afternoon: [
          { id: '1-trigger-mapping', time: '1:00 PM', activity: 'Trigger Mapping Exercise', duration: '30 min', type: 'therapy', guideId: 'trigger-mapping' },
          { id: '1-craving-surf', time: '2:00 PM', activity: 'Craving Surfing Practice', duration: '20 min', type: 'healing', guideId: 'craving-surf' },
          { id: '1-support-network', time: '3:00 PM', activity: 'Support Network Building', duration: '25 min', type: 'therapy' }
        ],
        evening: [
          { id: '1-recovery-dinner', time: '7:00 PM', activity: 'Recovery-Supporting Dinner', duration: '40 min', type: 'nutrition' },
          { id: '1-evening-checkin', time: '8:30 PM', activity: 'Evening Recovery Check-In', duration: '15 min', type: 'reflection' },
          { id: '1-recovery-meditation', time: '9:00 PM', activity: 'Recovery Meditation', duration: '20 min', type: 'mindfulness' }
        ]
      }
    ]
  }
};