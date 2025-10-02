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
    }
  ]
};