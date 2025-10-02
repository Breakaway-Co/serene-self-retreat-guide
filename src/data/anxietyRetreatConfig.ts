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
    }
  ]
};