import { RetreatConfiguration } from '@/types/retreat';

export const griefHealingRetreat: RetreatConfiguration = {
  id: 'grief_healing',
  name: 'Sacred Journey: Grief & Loss Healing',
  description: 'A compassionate 21-day program for individuals navigating grief and loss. Gentle, trauma-informed approach to processing grief, honoring memories, and finding meaning after loss.',
  shortDescription: 'Compassionate grief support through gentle healing practices',
  duration: 21,
  focusAreas: ['Grief Processing', 'Loss Integration', 'Memory Honoring', 'Meaning-Making', 'Continuing Bonds'],
  principles: ['Compassionate Presence', 'No Timeline for Grief', 'Honoring the Deceased', 'Gentle Processing', 'Community Support'],
  targetConditions: ['Recent Loss', 'Complicated Grief', 'Anniversary Grief', 'Anticipatory Grief', 'Disenfranchised Grief'],
  contraindications: ['Active Suicidal Crisis', 'Severe Depression requiring hospitalization', 'Active Psychosis'],
  riskLevel: 'high',
  requiresSupervision: true,
  days: [
    {
      day: 1,
      theme: 'Gentle Acknowledgment',
      focus: 'Gently acknowledging loss and creating sacred space for grief',
      morning: [
        { id: '1-grief-check', time: '8:30 AM', activity: 'Gentle Grief Check-In', duration: '15 min', type: 'reflection', description: 'Honor where you are today', modifications: ['Optional', 'No pressure'] },
        { id: '1-breath-of-compassion', time: '8:45 AM', activity: 'Breath of Self-Compassion', duration: '10 min', type: 'mindfulness', guideId: 'compassionate-breathing' },
        { id: '1-nourishing-breakfast', time: '9:00 AM', activity: 'Gentle Nourishment', duration: '30 min', type: 'nutrition', description: 'Comfort foods that nourish', modifications: ['Simple options available'] },
        { id: '1-gentle-movement', time: '9:30 AM', activity: 'Gentle Movement for Grief', duration: '15 min', type: 'movement', modifications: ['Chair-based', 'Rest when needed'] }
      ],
      afternoon: [
        { id: '1-comfort-lunch', time: '12:30 PM', activity: 'Comfort Lunch Preparation', duration: '25 min', type: 'nutrition' },
        { id: '1-grief-education', time: '1:30 PM', activity: 'Understanding Grief', duration: '20 min', type: 'therapy', guideId: 'grief-education' },
        { id: '1-memory-honoring', time: '2:00 PM', activity: 'Memory Honoring Practice', duration: '25 min', type: 'healing', guideId: 'memory-honoring' },
        { id: '1-sacred-space', time: '2:30 PM', activity: 'Creating Sacred Space', duration: '20 min', type: 'creative', guideId: 'sacred-space-creation' },
        { id: '1-nature-support', time: '3:00 PM', activity: 'Nature Support', duration: '20 min', type: 'nature', modifications: ['Indoor options available'] }
      ],
      evening: [
        { id: '1-simple-dinner', time: '6:30 PM', activity: 'Simple Evening Meal', duration: '30 min', type: 'nutrition' },
        { id: '1-gratitude-practice', time: '7:30 PM', activity: 'Gratitude for Love Shared', duration: '10 min', type: 'reflection' },
        { id: '1-gentle-release', time: '8:00 PM', activity: 'Gentle Emotional Release', duration: '20 min', type: 'healing' },
        { id: '1-loving-meditation', time: '8:30 PM', activity: 'Loving-Kindness Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 2,
      theme: 'Feeling the Feelings',
      focus: 'Creating safe space to feel and process grief emotions',
      morning: [
        { id: '2-emotion-check', time: '8:30 AM', activity: 'Emotion Check-In', duration: '12 min', type: 'reflection' },
        { id: '2-heart-breathing', time: '8:45 AM', activity: 'Heart-Centered Breathing', duration: '12 min', type: 'mindfulness' },
        { id: '2-comfort-breakfast', time: '9:00 AM', activity: 'Comfort Breakfast Ritual', duration: '30 min', type: 'nutrition' },
        { id: '2-expressive-movement', time: '9:30 AM', activity: 'Expressive Movement for Grief', duration: '20 min', type: 'movement', modifications: ['No right way to move'] }
      ],
      afternoon: [
        { id: '2-mindful-lunch', time: '12:30 PM', activity: 'Mindful Lunch Practice', duration: '25 min', type: 'nutrition' },
        { id: '2-feeling-safe', time: '1:30 PM', activity: 'Creating Safety for Feelings', duration: '25 min', type: 'therapy' },
        { id: '2-tears-healing', time: '2:00 PM', activity: 'The Healing Power of Tears', duration: '20 min', type: 'healing', guideId: 'tears-healing' },
        { id: '2-letter-writing', time: '2:30 PM', activity: 'Letter to Your Loved One', duration: '25 min', type: 'creative' },
        { id: '2-garden-time', time: '3:00 PM', activity: 'Garden Meditation', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '2-soul-food-dinner', time: '6:30 PM', activity: 'Soul Food Dinner', duration: '35 min', type: 'nutrition' },
        { id: '2-day-honoring', time: '7:30 PM', activity: 'Honoring Your Day', duration: '10 min', type: 'reflection' },
        { id: '2-gentle-yoga', time: '8:00 PM', activity: 'Grief-Supportive Yoga', duration: '25 min', type: 'movement' },
        { id: '2-sleep-comfort', time: '8:45 PM', activity: 'Sleep Comfort Practice', duration: '20 min', type: 'mindfulness' }
      ]
    }
  ]
};

export const griefParentChildRetreat: RetreatConfiguration = {
  id: 'grief_parent_child',
  name: 'Together in Healing: Parent-Child Grief Support',
  description: 'A specialized 14-day program for parents and children (ages 6-17) to process grief together. Age-appropriate activities, family bonding, and gentle healing practices.',
  shortDescription: 'Family grief support with age-appropriate healing activities',
  duration: 14,
  focusAreas: ['Family Grief Processing', 'Age-Appropriate Support', 'Family Bonding', 'Communication Skills', 'Shared Healing'],
  principles: ['Family-Centered', 'Age-Appropriate', 'Safe Expression', 'Honoring Together', 'Strengthening Bonds'],
  targetConditions: ['Family Loss', 'Parent Grief', 'Child Grief', 'Family Communication', 'Shared Trauma'],
  contraindications: ['Child safety concerns', 'Severe family dysfunction', 'Active child abuse'],
  riskLevel: 'moderate',
  requiresSupervision: true,
  days: [
    {
      day: 1,
      theme: 'Family Safety & Connection',
      focus: 'Creating safe family space and gentle connection activities',
      morning: [
        { id: '1-family-circle', time: '9:00 AM', activity: 'Family Morning Circle', duration: '15 min', type: 'reflection', description: 'Gentle check-in for everyone' },
        { id: '1-family-breathing', time: '9:15 AM', activity: 'Family Breathing Together', duration: '10 min', type: 'mindfulness', guideId: 'family-breathing' },
        { id: '1-together-breakfast', time: '9:30 AM', activity: 'Breakfast Together Ritual', duration: '30 min', type: 'nutrition', description: 'Preparing and sharing meals' },
        { id: '1-family-movement', time: '10:00 AM', activity: 'Family Movement Fun', duration: '20 min', type: 'movement', modifications: ['Age-appropriate options'] }
      ],
      afternoon: [
        { id: '1-lunch-together', time: '12:30 PM', activity: 'Lunch Preparation Together', duration: '30 min', type: 'nutrition' },
        { id: '1-grief-education-family', time: '1:30 PM', activity: 'Understanding Grief as a Family', duration: '25 min', type: 'therapy', guideId: 'family-grief-education' },
        { id: '1-memory-sharing', time: '2:00 PM', activity: 'Gentle Memory Sharing', duration: '20 min', type: 'healing' },
        { id: '1-art-together', time: '2:30 PM', activity: 'Art Therapy Together', duration: '30 min', type: 'creative', guideId: 'family-art-therapy' },
        { id: '1-nature-walk', time: '3:00 PM', activity: 'Family Nature Walk', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '1-dinner-together', time: '6:00 PM', activity: 'Family Dinner Time', duration: '40 min', type: 'nutrition' },
        { id: '1-story-time', time: '7:00 PM', activity: 'Healing Story Time', duration: '20 min', type: 'creative' },
        { id: '1-gentle-yoga-family', time: '7:30 PM', activity: 'Family Gentle Yoga', duration: '20 min', type: 'movement' },
        { id: '1-bedtime-meditation', time: '8:00 PM', activity: 'Family Bedtime Meditation', duration: '15 min', type: 'mindfulness' }
      ]
    }
  ]
};