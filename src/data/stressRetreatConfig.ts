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
        { id: '1-instant-calm-breathing', time: '7:15 AM', activity: 'Instant Calm Breathing', duration: '10 min', type: 'mindfulness', guideId: 'instant-calm-breathing' },
        { id: '1-energizing-breakfast', time: '7:30 AM', activity: 'Anti-Stress Breakfast', duration: '25 min', type: 'nutrition', description: 'Foods that naturally reduce stress hormones' },
        { id: '1-wake-up-movement', time: '8:00 AM', activity: 'Wake-Up Stress Shake', duration: '15 min', type: 'movement', modifications: ['High and low intensity options'] }
      ],
      afternoon: [
        { id: '1-stress-free-lunch', time: '12:00 PM', activity: 'Stress-Free Lunch Break', duration: '30 min', type: 'nutrition' },
        { id: '1-stress-cycle-education', time: '1:00 PM', activity: 'Understanding the Stress Cycle', duration: '20 min', type: 'therapy', guideId: 'stress-cycle-education' },
        { id: '1-quick-reset', time: '1:30 PM', activity: '5-Minute Stress Reset Techniques', duration: '15 min', type: 'healing', guideId: 'quick-stress-reset' },
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
        { id: '2-cognitive-tools', time: '1:00 PM', activity: 'Cognitive Stress Management Tools', duration: '25 min', type: 'therapy', guideId: 'cognitive-stress-tools' },
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
    }
  ]
};