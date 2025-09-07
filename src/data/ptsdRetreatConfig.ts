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
    }
  ]
};