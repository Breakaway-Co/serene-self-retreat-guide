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
        { id: '1-executive-breathing', time: '6:50 AM', activity: 'Executive Stress Breathing', duration: '10 min', type: 'mindfulness', guideId: 'gentle-wake-up-breathing' },
        { id: '1-power-breakfast', time: '7:00 AM', activity: 'High-Performance Breakfast', duration: '25 min', type: 'nutrition', description: 'Sustained energy nutrition' },
        { id: '1-movement-reset', time: '7:30 AM', activity: 'Morning Movement Reset', duration: '20 min', type: 'movement', modifications: ['Desk-friendly options', '5-minute minimum'] }
      ],
      afternoon: [
        { id: '1-strategic-lunch', time: '12:00 PM', activity: 'Strategic Lunch Break', duration: '30 min', type: 'nutrition', description: 'Mindful eating away from work' },
        { id: '1-burnout-education', time: '1:00 PM', activity: 'Understanding Burnout Cycles', duration: '25 min', type: 'therapy', guideId: 'burnout-cycle-education' },
        { id: '1-boundary-assessment', time: '1:30 PM', activity: 'Professional Boundary Assessment', duration: '20 min', type: 'therapy' },
        { id: '1-values-clarification', time: '2:00 PM', activity: 'Core Values Clarification', duration: '25 min', type: 'reflection', guideId: 'core-values-identification' },
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
    },
    {
      day: 3,
      theme: 'Boundary Mastery',
      focus: 'Strengthening professional and personal boundaries',
      morning: [
        { id: '3-boundary-audit', time: '6:30 AM', activity: 'Boundary Audit Check-In', duration: '15 min', type: 'reflection' },
        { id: '3-boundary-breathing', time: '6:45 AM', activity: 'Boundary-Strengthening Breathing', duration: '12 min', type: 'mindfulness' },
        { id: '3-power-breakfast', time: '7:00 AM', activity: 'Boundary-Supporting Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '3-empowering-movement', time: '7:30 AM', activity: 'Empowering Movement Practice', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '3-boundary-lunch', time: '12:00 PM', activity: 'Mindful Boundary Lunch', duration: '30 min', type: 'nutrition' },
        { id: '3-saying-no', time: '1:00 PM', activity: 'The Art of Saying No', duration: '30 min', type: 'therapy', guideId: 'assertiveness-training' },
        { id: '3-boundary-scripts', time: '1:40 PM', activity: 'Boundary Communication Scripts', duration: '25 min', type: 'therapy' },
        { id: '3-digital-boundaries', time: '2:15 PM', activity: 'Digital Boundary Practice', duration: '20 min', type: 'healing' },
        { id: '3-boundary-walk', time: '2:45 PM', activity: 'Boundary-Affirming Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '3-transition-dinner', time: '6:00 PM', activity: 'Work-Life Transition Dinner', duration: '40 min', type: 'nutrition' },
        { id: '3-boundary-wins', time: '7:30 PM', activity: 'Boundary Wins Reflection', duration: '10 min', type: 'reflection' },
        { id: '3-grounding-movement', time: '8:00 PM', activity: 'Grounding Movement', duration: '25 min', type: 'movement' },
        { id: '3-boundary-meditation', time: '9:00 PM', activity: 'Boundary Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 4,
      theme: 'Rest & Recovery',
      focus: 'Deep rest and understanding rest as productive',
      morning: [
        { id: '4-rest-check', time: '7:00 AM', activity: 'Rest Quality Assessment', duration: '15 min', type: 'reflection', modifications: ['Sleep in if needed'] },
        { id: '4-restorative-breathing', time: '7:15 AM', activity: 'Restorative Breathing', duration: '12 min', type: 'mindfulness' },
        { id: '4-recovery-breakfast', time: '7:30 AM', activity: 'Recovery Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '4-gentle-movement', time: '8:05 AM', activity: 'Gentle Recovery Movement', duration: '15 min', type: 'movement', modifications: ['Very gentle', 'Restorative only'] }
      ],
      afternoon: [
        { id: '4-leisurely-lunch', time: '12:30 PM', activity: 'Leisurely Lunch', duration: '40 min', type: 'nutrition', description: 'Slow, unhurried eating' },
        { id: '4-rest-education', time: '1:30 PM', activity: 'Rest as Productivity Education', duration: '25 min', type: 'therapy' },
        { id: '4-rest-practice', time: '2:05 PM', activity: 'Intentional Rest Practice', duration: '30 min', type: 'healing', description: 'Guilt-free rest' },
        { id: '4-nature-rest', time: '2:45 PM', activity: 'Restful Nature Experience', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '4-nourishing-dinner', time: '6:30 PM', activity: 'Deeply Nourishing Dinner', duration: '40 min', type: 'nutrition' },
        { id: '4-rest-reflection', time: '7:30 PM', activity: 'Rest Quality Reflection', duration: '10 min', type: 'reflection' },
        { id: '4-restorative-yoga', time: '8:00 PM', activity: 'Restorative Yoga Practice', duration: '30 min', type: 'movement' },
        { id: '4-deep-rest-meditation', time: '8:45 PM', activity: 'Deep Rest Meditation', duration: '25 min', type: 'mindfulness' }
      ]
    },
    {
      day: 5,
      theme: 'Values Realignment',
      focus: 'Aligning work and life with core values',
      morning: [
        { id: '5-values-check', time: '6:30 AM', activity: 'Values Check-In', duration: '15 min', type: 'reflection' },
        { id: '5-aligned-breathing', time: '6:45 AM', activity: 'Values-Aligned Breathing', duration: '12 min', type: 'mindfulness' },
        { id: '5-values-breakfast', time: '7:00 AM', activity: 'Values-Aligned Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '5-purposeful-movement', time: '7:30 AM', activity: 'Purposeful Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '5-meaningful-lunch', time: '12:00 PM', activity: 'Meaningful Lunch', duration: '30 min', type: 'nutrition' },
        { id: '5-values-deep-dive', time: '1:00 PM', activity: 'Deep Values Exploration', duration: '30 min', type: 'therapy', guideId: 'core-values-identification' },
        { id: '5-work-values-gap', time: '1:40 PM', activity: 'Work-Values Gap Analysis', duration: '25 min', type: 'therapy' },
        { id: '5-alignment-action', time: '2:15 PM', activity: 'One Alignment Action', duration: '20 min', type: 'healing' },
        { id: '5-values-walk', time: '2:45 PM', activity: 'Values Reflection Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '5-alignment-dinner', time: '6:30 PM', activity: 'Alignment Dinner', duration: '40 min', type: 'nutrition' },
        { id: '5-values-reflection', time: '7:30 PM', activity: 'Values Alignment Reflection', duration: '15 min', type: 'reflection' },
        { id: '5-centering-movement', time: '8:00 PM', activity: 'Centering Movement', duration: '25 min', type: 'movement' },
        { id: '5-values-meditation', time: '9:00 PM', activity: 'Values Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 6,
      theme: 'Sustainable Performance',
      focus: 'Creating sustainable high-performance practices',
      morning: [
        { id: '6-performance-check', time: '6:30 AM', activity: 'Sustainable Performance Check', duration: '15 min', type: 'reflection' },
        { id: '6-peak-breathing', time: '6:45 AM', activity: 'Peak Performance Breathing', duration: '12 min', type: 'mindfulness' },
        { id: '6-performance-breakfast', time: '7:00 AM', activity: 'Performance-Optimizing Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '6-optimal-movement', time: '7:30 AM', activity: 'Optimal Performance Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '6-peak-lunch', time: '12:00 PM', activity: 'Peak Performance Lunch', duration: '30 min', type: 'nutrition' },
        { id: '6-energy-cycles', time: '1:00 PM', activity: 'Personal Energy Cycles Mapping', duration: '30 min', type: 'therapy' },
        { id: '6-deep-work', time: '1:40 PM', activity: 'Deep Work Practices', duration: '25 min', type: 'therapy' },
        { id: '6-recovery-intervals', time: '2:15 PM', activity: 'Performance-Recovery Intervals', duration: '20 min', type: 'healing' },
        { id: '6-peak-nature', time: '2:45 PM', activity: 'Peak State Nature Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '6-recovery-dinner', time: '6:30 PM', activity: 'Recovery Dinner', duration: '40 min', type: 'nutrition' },
        { id: '6-performance-reflection', time: '7:30 PM', activity: 'Performance Reflection', duration: '10 min', type: 'reflection' },
        { id: '6-athletic-recovery', time: '8:00 PM', activity: 'Athletic Recovery Movement', duration: '25 min', type: 'movement' },
        { id: '6-peak-meditation', time: '9:00 PM', activity: 'Peak Performance Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 7,
      theme: 'Midpoint Integration',
      focus: 'Reviewing progress and recalibrating practices',
      morning: [
        { id: '7-midpoint-check', time: '6:30 AM', activity: 'Midpoint Progress Review', duration: '20 min', type: 'reflection' },
        { id: '7-integration-breathing', time: '6:50 AM', activity: 'Integration Breathing', duration: '12 min', type: 'mindfulness' },
        { id: '7-celebration-breakfast', time: '7:05 AM', activity: 'Progress Celebration Breakfast', duration: '30 min', type: 'nutrition' },
        { id: '7-integration-movement', time: '7:40 AM', activity: 'Integration Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '7-reflection-lunch', time: '12:30 PM', activity: 'Reflection Lunch', duration: '40 min', type: 'nutrition' },
        { id: '7-what-works', time: '1:30 PM', activity: 'What Is Working Analysis', duration: '30 min', type: 'therapy' },
        { id: '7-adjustment-planning', time: '2:10 PM', activity: 'Practice Adjustment Planning', duration: '25 min', type: 'healing' },
        { id: '7-gratitude-walk', time: '2:45 PM', activity: 'Gratitude Nature Walk', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '7-integration-dinner', time: '6:30 PM', activity: 'Integration Dinner', duration: '40 min', type: 'nutrition' },
        { id: '7-progress-reflection', time: '7:30 PM', activity: 'Progress Reflection', duration: '15 min', type: 'reflection', guideId: 'narrative-therapy-letter-writing' },
        { id: '7-celebration-movement', time: '8:00 PM', activity: 'Celebration Movement', duration: '25 min', type: 'movement' },
        { id: '7-gratitude-meditation', time: '9:00 PM', activity: 'Gratitude Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 8,
      theme: 'Leadership from Within',
      focus: 'Cultivating authentic leadership and self-leadership',
      morning: [
        { id: '8-leadership-check', time: '6:30 AM', activity: 'Leadership Energy Check', duration: '15 min', type: 'reflection' },
        { id: '8-leader-breathing', time: '6:45 AM', activity: 'Leadership Breathing Practice', duration: '12 min', type: 'mindfulness' },
        { id: '8-leader-breakfast', time: '7:00 AM', activity: 'Leadership Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '8-empowered-movement', time: '7:30 AM', activity: 'Empowered Leadership Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '8-leadership-lunch', time: '12:00 PM', activity: 'Leadership Lunch', duration: '30 min', type: 'nutrition' },
        { id: '8-leadership-style', time: '1:00 PM', activity: 'Authentic Leadership Style', duration: '30 min', type: 'therapy' },
        { id: '8-self-leadership', time: '1:40 PM', activity: 'Self-Leadership Practice', duration: '25 min', type: 'therapy' },
        { id: '8-influence-practice', time: '2:15 PM', activity: 'Sustainable Influence Practice', duration: '20 min', type: 'healing' },
        { id: '8-leadership-walk', time: '2:45 PM', activity: 'Leadership Reflection Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '8-leader-dinner', time: '6:30 PM', activity: 'Leader Dinner', duration: '40 min', type: 'nutrition' },
        { id: '8-leadership-reflection', time: '7:30 PM', activity: 'Leadership Reflection', duration: '10 min', type: 'reflection' },
        { id: '8-strength-movement', time: '8:00 PM', activity: 'Inner Strength Movement', duration: '25 min', type: 'movement' },
        { id: '8-leadership-meditation', time: '9:00 PM', activity: 'Leadership Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 9,
      theme: 'Communication Mastery',
      focus: 'Developing clear, compassionate professional communication',
      morning: [
        { id: '9-communication-check', time: '6:30 AM', activity: 'Communication Pattern Check', duration: '15 min', type: 'reflection' },
        { id: '9-clarity-breathing', time: '6:45 AM', activity: 'Clarity Breathing', duration: '12 min', type: 'mindfulness' },
        { id: '9-clarity-breakfast', time: '7:00 AM', activity: 'Mental Clarity Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '9-expressive-movement', time: '7:30 AM', activity: 'Expressive Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '9-mindful-lunch', time: '12:00 PM', activity: 'Mindful Communication Lunch', duration: '30 min', type: 'nutrition' },
        { id: '9-communication-skills', time: '1:00 PM', activity: 'Professional Communication Skills', duration: '30 min', type: 'therapy' },
        { id: '9-difficult-conversations', time: '1:40 PM', activity: 'Difficult Conversations Framework', duration: '25 min', type: 'therapy' },
        { id: '9-active-listening', time: '2:15 PM', activity: 'Active Listening Practice', duration: '20 min', type: 'healing' },
        { id: '9-clarity-walk', time: '2:45 PM', activity: 'Clarity Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '9-connection-dinner', time: '6:30 PM', activity: 'Connection Dinner', duration: '40 min', type: 'nutrition' },
        { id: '9-communication-reflection', time: '7:30 PM', activity: 'Communication Reflection', duration: '10 min', type: 'reflection' },
        { id: '9-opening-movement', time: '8:00 PM', activity: 'Opening Movement', duration: '25 min', type: 'movement' },
        { id: '9-clarity-meditation', time: '9:00 PM', activity: 'Clarity Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 10,
      theme: 'Work-Life Harmony',
      focus: 'Creating genuine work-life harmony and integration',
      morning: [
        { id: '10-harmony-check', time: '6:30 AM', activity: 'Work-Life Harmony Check', duration: '15 min', type: 'reflection' },
        { id: '10-balance-breathing', time: '6:45 AM', activity: 'Balance Breathing', duration: '12 min', type: 'mindfulness' },
        { id: '10-harmony-breakfast', time: '7:00 AM', activity: 'Harmony Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '10-balanced-movement', time: '7:30 AM', activity: 'Balanced Movement Practice', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '10-integration-lunch', time: '12:00 PM', activity: 'Work-Life Integration Lunch', duration: '30 min', type: 'nutrition' },
        { id: '10-harmony-planning', time: '1:00 PM', activity: 'Harmony Planning Workshop', duration: '30 min', type: 'therapy' },
        { id: '10-integration-practice', time: '1:40 PM', activity: 'Integration Practice', duration: '25 min', type: 'healing' },
        { id: '10-life-activities', time: '2:15 PM', activity: 'Non-Work Life Activities', duration: '25 min', type: 'healing', description: 'Purely personal activity' },
        { id: '10-balance-walk', time: '2:50 PM', activity: 'Balance Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '10-family-dinner', time: '6:30 PM', activity: 'Family/Personal Dinner', duration: '45 min', type: 'nutrition', description: 'Focus on personal life' },
        { id: '10-harmony-reflection', time: '7:30 PM', activity: 'Harmony Reflection', duration: '10 min', type: 'reflection' },
        { id: '10-integrative-movement', time: '8:00 PM', activity: 'Integrative Movement', duration: '25 min', type: 'movement' },
        { id: '10-harmony-meditation', time: '9:00 PM', activity: 'Harmony Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 11,
      theme: 'Stress Resilience',
      focus: 'Building resilience to workplace stress and pressure',
      morning: [
        { id: '11-resilience-check', time: '6:30 AM', activity: 'Resilience Check-In', duration: '15 min', type: 'reflection' },
        { id: '11-resilience-breathing', time: '6:45 AM', activity: 'Resilience Breathing', duration: '12 min', type: 'mindfulness' },
        { id: '11-strength-breakfast', time: '7:00 AM', activity: 'Resilience-Building Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '11-power-movement', time: '7:30 AM', activity: 'Power-Building Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '11-resilience-lunch', time: '12:00 PM', activity: 'Resilience Lunch', duration: '30 min', type: 'nutrition' },
        { id: '11-stress-toolkit', time: '1:00 PM', activity: 'Executive Stress Toolkit', duration: '30 min', type: 'therapy', guideId: 'stress-management-techniques' },
        { id: '11-pressure-practice', time: '1:40 PM', activity: 'Pressure Management Practice', duration: '25 min', type: 'therapy' },
        { id: '11-recovery-techniques', time: '2:15 PM', activity: 'Quick Recovery Techniques', duration: '20 min', type: 'healing' },
        { id: '11-resilience-walk', time: '2:45 PM', activity: 'Resilience Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '11-recovery-dinner', time: '6:30 PM', activity: 'Recovery Dinner', duration: '40 min', type: 'nutrition' },
        { id: '11-resilience-reflection', time: '7:30 PM', activity: 'Resilience Reflection', duration: '10 min', type: 'reflection' },
        { id: '11-strength-yoga', time: '8:00 PM', activity: 'Strength Yoga', duration: '25 min', type: 'movement' },
        { id: '11-resilience-meditation', time: '9:00 PM', activity: 'Resilience Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 12,
      theme: 'Prevention Systems',
      focus: 'Creating systems to prevent future burnout',
      morning: [
        { id: '12-prevention-check', time: '6:30 AM', activity: 'Prevention Check-In', duration: '15 min', type: 'reflection' },
        { id: '12-sustainable-breathing', time: '6:45 AM', activity: 'Sustainable Practice Breathing', duration: '12 min', type: 'mindfulness' },
        { id: '12-preventive-breakfast', time: '7:00 AM', activity: 'Preventive Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '12-sustainable-movement', time: '7:30 AM', activity: 'Sustainable Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '12-prevention-lunch', time: '12:00 PM', activity: 'Prevention Lunch', duration: '30 min', type: 'nutrition' },
        { id: '12-early-warning', time: '1:00 PM', activity: 'Early Warning System Creation', duration: '30 min', type: 'therapy' },
        { id: '12-prevention-plan', time: '1:40 PM', activity: 'Burnout Prevention Action Plan', duration: '30 min', type: 'healing' },
        { id: '12-accountability', time: '2:20 PM', activity: 'Accountability Systems', duration: '20 min', type: 'reflection' },
        { id: '12-grounding-walk', time: '2:50 PM', activity: 'Grounding Prevention Walk', duration: '20 min', type: 'nature' }
      ],
      evening: [
        { id: '12-sustainable-dinner', time: '6:30 PM', activity: 'Sustainable Dinner', duration: '40 min', type: 'nutrition' },
        { id: '12-prevention-reflection', time: '7:30 PM', activity: 'Prevention Reflection', duration: '10 min', type: 'reflection' },
        { id: '12-grounding-movement', time: '8:00 PM', activity: 'Grounding Movement', duration: '25 min', type: 'movement' },
        { id: '12-prevention-meditation', time: '9:00 PM', activity: 'Prevention Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 13,
      theme: 'Future Vision',
      focus: 'Creating sustainable career vision and life design',
      morning: [
        { id: '13-vision-check', time: '6:30 AM', activity: 'Future Vision Check-In', duration: '15 min', type: 'reflection' },
        { id: '13-visioning-breathing', time: '6:45 AM', activity: 'Visioning Breathing', duration: '12 min', type: 'mindfulness' },
        { id: '13-future-breakfast', time: '7:00 AM', activity: 'Future-Focused Breakfast', duration: '25 min', type: 'nutrition' },
        { id: '13-forward-movement', time: '7:30 AM', activity: 'Forward-Moving Movement', duration: '20 min', type: 'movement' }
      ],
      afternoon: [
        { id: '13-vision-lunch', time: '12:00 PM', activity: 'Visioning Lunch', duration: '30 min', type: 'nutrition' },
        { id: '13-career-vision', time: '1:00 PM', activity: 'Sustainable Career Visioning', duration: '35 min', type: 'therapy', guideId: 'future-self-visualization' },
        { id: '13-life-design', time: '1:45 PM', activity: 'Life Design Workshop', duration: '30 min', type: 'healing' },
        { id: '13-vision-walk', time: '2:25 PM', activity: 'Vision Walk', duration: '25 min', type: 'nature' }
      ],
      evening: [
        { id: '13-vision-dinner', time: '6:30 PM', activity: 'Vision Dinner', duration: '40 min', type: 'nutrition' },
        { id: '13-future-letter', time: '7:30 PM', activity: 'Letter to Future Self', duration: '20 min', type: 'reflection', guideId: 'narrative-therapy-letter-writing' },
        { id: '13-opening-movement', time: '8:00 PM', activity: 'Future-Opening Movement', duration: '25 min', type: 'movement' },
        { id: '13-vision-meditation', time: '9:00 PM', activity: 'Vision Meditation', duration: '20 min', type: 'mindfulness' }
      ]
    },
    {
      day: 14,
      theme: 'Completion & Commitment',
      focus: 'Celebrating recovery and committing to sustainable excellence',
      morning: [
        { id: '14-completion-check', time: '6:30 AM', activity: 'Completion Check-In', duration: '20 min', type: 'reflection' },
        { id: '14-gratitude-breathing', time: '6:50 AM', activity: 'Gratitude Breathing', duration: '15 min', type: 'mindfulness' },
        { id: '14-celebration-breakfast', time: '7:10 AM', activity: 'Celebration Breakfast', duration: '35 min', type: 'nutrition' },
        { id: '14-victory-movement', time: '7:50 AM', activity: 'Victory Movement', duration: '25 min', type: 'movement' }
      ],
      afternoon: [
        { id: '14-celebration-lunch', time: '12:30 PM', activity: 'Celebration Lunch', duration: '45 min', type: 'nutrition', description: 'Celebrate with someone special' },
        { id: '14-full-review', time: '1:30 PM', activity: 'Complete Journey Review', duration: '40 min', type: 'reflection' },
        { id: '14-commitment-ceremony', time: '2:20 PM', activity: 'Personal Commitment Ceremony', duration: '30 min', type: 'healing' },
        { id: '14-celebration-walk', time: '3:00 PM', activity: 'Celebration Nature Walk', duration: '30 min', type: 'nature' }
      ],
      evening: [
        { id: '14-feast-dinner', time: '6:30 PM', activity: 'Celebration Feast', duration: '60 min', type: 'nutrition' },
        { id: '14-legacy-reflection', time: '8:00 PM', activity: 'Legacy & Impact Reflection', duration: '20 min', type: 'reflection', guideId: 'narrative-therapy-letter-writing' },
        { id: '14-integration-yoga', time: '8:30 PM', activity: 'Integration Yoga', duration: '30 min', type: 'movement' },
        { id: '14-completion-meditation', time: '9:10 PM', activity: 'Completion & New Beginning Meditation', duration: '30 min', type: 'mindfulness' }
      ]
    }
  ]
};