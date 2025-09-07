import { RetreatConfiguration } from '@/types/retreat';

export const corporateBurnoutRetreat: RetreatConfiguration = {
  id: 'corporate_burnout',
  name: 'Phoenix Rising: Corporate Burnout Recovery',
  description: 'A comprehensive 14-day program designed specifically for high-achievers and corporate professionals experiencing burnout. Focus on sustainable work practices, energy restoration, and preventing future burnout.',
  shortDescription: 'Professional burnout recovery with sustainable work-life integration',
  duration: 14,
  focusAreas: ['Burnout Recovery', 'Work-Life Integration', 'Energy Management', 'Sustainable Performance', 'Leadership Wellness'],
  principles: ['Sustainable Achievement', 'Energy Management', 'Boundary Setting', 'Values Alignment', 'Rest as Productivity'],
  targetConditions: ['Corporate Burnout', 'Work Stress', 'Career Overwhelm', 'Performance Anxiety', 'Workaholic Patterns'],
  contraindications: ['Severe Depression (PHQ-9 > 20)', 'Active Substance Abuse', 'Severe Anxiety requiring medical intervention'],
  riskLevel: 'moderate',
  requiresSupervision: false,
  days: [
    {
      day: 1,
      theme: 'Recognition & Assessment',
      focus: 'Understanding burnout patterns and beginning energy restoration',
      morning: [
        { id: '1-energy-audit', time: '6:30 AM', activity: 'Energy Audit Assessment', duration: '20 min', type: 'reflection', description: 'Map energy drains and sources' },
        { id: '1-executive-breathing', time: '6:50 AM', activity: 'Executive Stress Breathing', duration: '10 min', type: 'mindfulness', guideId: 'executive-breathing' },
        { id: '1-power-breakfast', time: '7:00 AM', activity: 'High-Performance Breakfast', duration: '25 min', type: 'nutrition', description: 'Sustained energy nutrition' },
        { id: '1-movement-reset', time: '7:30 AM', activity: 'Morning Movement Reset', duration: '20 min', type: 'movement', modifications: ['Desk-friendly options', '5-minute minimum'] }
      ],
      afternoon: [
        { id: '1-strategic-lunch', time: '12:00 PM', activity: 'Strategic Lunch Break', duration: '30 min', type: 'nutrition', description: 'Mindful eating away from work' },
        { id: '1-burnout-education', time: '1:00 PM', activity: 'Understanding Burnout Cycles', duration: '25 min', type: 'therapy', guideId: 'burnout-cycle-education' },
        { id: '1-boundary-assessment', time: '1:30 PM', activity: 'Professional Boundary Assessment', duration: '20 min', type: 'therapy' },
        { id: '1-values-clarification', time: '2:00 PM', activity: 'Core Values Clarification', duration: '25 min', type: 'reflection', guideId: 'values-clarification' },
        { id: '1-micro-recovery', time: '2:30 PM', activity: 'Micro-Recovery Techniques', duration: '15 min', type: 'healing' }
      ],
      evening: [
        { id: '1-transition-ritual', time: '6:00 PM', activity: 'Work-to-Home Transition Ritual', duration: '15 min', type: 'reflection' },
        { id: '1-restoration-dinner', time: '6:30 PM', activity: 'Restorative Evening Meal', duration: '40 min', type: 'nutrition' },
        { id: '1-digital-boundary', time: '7:30 PM', activity: 'Digital Boundary Setting', duration: '15 min', type: 'therapy' },
        { id: '1-stress-release', time: '8:00 PM', activity: 'Executive Stress Release', duration: '25 min', type: 'movement' },
        { id: '1-recovery-meditation', time: '9:00 PM', activity: 'Recovery Sleep Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 2,
      theme: 'Energy Management Systems',
      focus: 'Building sustainable energy management and productivity systems',
      morning: [
        { id: '2-energy-planning', time: '6:30 AM', activity: 'Daily Energy Planning', duration: '15 min', type: 'reflection' },
        { id: '2-power-breathing', time: '6:45 AM', activity: 'Power Breathing Technique', duration: '12 min', type: 'mindfulness' },
        { id: '2-brain-fuel-breakfast', time: '7:00 AM', activity: 'Brain-Fuel Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '2-energizing-movement', time: '7:30 AM', activity: 'Energizing Movement Practice', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '2-mindful-lunch', time: '12:00 PM', activity: 'Mindful Power Lunch', duration: '30 min', type: 'nutrition' },
        { id: '2-time-energy', time: '1:00 PM', activity: 'Time vs Energy Management', duration: '30 min', type: 'therapy', guideId: 'time-energy-management' },
        { id: '2-delegation-skills', time: '1:40 PM', activity: 'Delegation & Saying No Workshop', duration: '25 min', type: 'therapy' },
        { id: '2-perfectionism-work', time: '2:15 PM', activity: 'Perfectionism Release Work', duration: '20 min', type: 'healing' },
        { id: '2-walking-meeting', time: '2:45 PM', activity: 'Walking Meeting Practice', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '2-shutdown-ritual', time: '6:00 PM', activity: 'Work Shutdown Ritual', duration: '10 min', type: 'reflection' },
        { id: '2-recovery-dinner', time: '6:30 PM', activity: 'Recovery-Supporting Dinner', duration: '40 min', type: 'nutrition' },
        { id: '2-wins-celebration', time: '7:30 PM', activity: 'Daily Wins Celebration', duration: '10 min', type: 'reflection' },
        { id: '2-tension-release', time: '8:00 PM', activity: 'Physical Tension Release', duration: '25 min', type: 'movement' },
        { id: '2-leader-meditation', time: '9:00 PM', activity: 'Leadership Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    }
  ]
};