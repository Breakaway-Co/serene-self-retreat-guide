import { RetreatConfiguration } from '../types/retreat';

export const addictionsRecoveryRetreat: RetreatConfiguration = {
  id: 'retreat_addictions_recovery',
  name: 'Addictions Recovery Program',
  description: 'A comprehensive, trauma-informed recovery program designed to support individuals overcoming substance and behavioral addictions through evidence-based practices.',
  shortDescription: 'Evidence-based recovery program for substance and behavioral addictions',
  duration: 21, // 21-day program
  focusAreas: [
    'Substance Addiction Recovery',
    'Behavioral Addiction Support', 
    'Craving Management',
    'Relapse Prevention',
    'Nutritional Healing',
    'Somatic Regulation',
    'Lifestyle Rebuilding'
  ],
  principles: [
    'Trauma-informed care',
    'Harm reduction approach',
    'Nutritional rehabilitation',
    'Somatic nervous system regulation',
    'Evidence-based therapy techniques',
    'Gentle, shame-free recovery',
    'Holistic lifestyle integration'
  ],
  targetConditions: [
    'Substance use disorders',
    'Behavioral addictions',
    'Co-occurring anxiety and depression',
    'Trauma-related addictions',
    'Early recovery support',
    'Relapse prevention'
  ],
  contraindications: [
    'Active withdrawal requiring medical supervision',
    'Severe psychosis or acute mental health crisis',
    'Active suicidal ideation',
    'Eating disorders requiring specialized treatment'
  ],
  riskLevel: 'moderate',
  requiresSupervision: true,
  days: [
    // Week 1: Foundation and Stabilization
    {
      day: 1,
      theme: 'Welcome & Foundation',
      focus: 'Creating safety and understanding the recovery journey',
      morning: [
        {
          id: 'day1_morning_grounding',
          time: '8:00 AM',
          activity: 'Morning Grounding Practice',
          duration: '20 minutes',
          type: 'somatic',
          description: 'Box breathing and body awareness to start the day centered',
          modifications: ['Seated option available', 'Guided audio support']
        },
        {
          id: 'day1_breakfast_prep',
          time: '8:30 AM',
          activity: 'Food School: Blood Sugar Stabilizing Breakfast',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Learn to prepare a protein-rich breakfast that supports stable energy',
          modifications: ['Dietary alternatives provided', 'Step-by-step video guides']
        }
      ],
      afternoon: [
        {
          id: 'day1_therapy_intro',
          time: '2:00 PM',
          activity: 'Understanding Your Recovery Journey',
          duration: '60 minutes',
          type: 'therapy',
          description: 'Introduction to recovery principles and personal story mapping',
          contraindications: ['Skip if feeling overwhelmed'],
          modifications: ['Self-paced modules', 'Optional peer support']
        },
        {
          id: 'day1_lunch_prep',
          time: '1:00 PM',
          activity: 'Food School: Nutrient-Dense Lunch',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Preparing meals that support brain healing and sustained energy'
        }
      ],
      evening: [
        {
          id: 'day1_gentle_movement',
          time: '5:00 PM',
          activity: 'Gentle Yoga for Recovery',
          duration: '30 minutes',
          type: 'movement',
          description: 'Trauma-informed yoga practice to reconnect with the body',
          modifications: ['Chair-based options', 'Audio-only guidance']
        },
        {
          id: 'day1_dinner_prep',
          time: '6:30 PM',
          activity: 'Food School: Calming Evening Meal',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Foods that support relaxation and quality sleep'
        },
        {
          id: 'day1_evening_restore',
          time: '8:00 PM',
          activity: 'Progressive Muscle Relaxation',
          duration: '20 minutes',
          type: 'somatic',
          description: 'Guided relaxation to prepare for restorative sleep'
        }
      ]
    },
    {
      day: 2,
      theme: 'Understanding Triggers',
      focus: 'Identifying and mapping personal addiction triggers',
      morning: [
        {
          id: 'day2_morning_grounding',
          time: '8:00 AM',
          activity: 'Paced Breathing Practice',
          duration: '15 minutes',
          type: 'somatic',
          description: 'Extended exhale breathing to activate parasympathetic nervous system'
        },
        {
          id: 'day2_breakfast_prep',
          time: '8:30 AM',
          activity: 'Food School: Anti-Inflammatory Breakfast',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Foods that reduce inflammation and support brain healing'
        }
      ],
      afternoon: [
        {
          id: 'day2_trigger_mapping',
          time: '2:00 PM',
          activity: 'Trigger Mapping Workshop',
          duration: '75 minutes',
          type: 'therapy',
          description: 'Comprehensive exploration of personal triggers and early warning signs',
          modifications: ['Break into shorter segments if needed', 'Written and visual options']
        },
        {
          id: 'day2_lunch_prep',
          time: '1:00 PM',
          activity: 'Food School: Liver Support Lunch',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Meals designed to support detoxification and liver health'
        }
      ],
      evening: [
        {
          id: 'day2_walking_meditation',
          time: '5:00 PM',
          activity: 'Mindful Walking Practice',
          duration: '25 minutes',
          type: 'movement',
          description: 'Gentle movement meditation in nature or indoor space'
        },
        {
          id: 'day2_dinner_prep',
          time: '6:30 PM',
          activity: 'Food School: Omega-3 Rich Dinner',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Brain-healthy fats to support mood and cognition'
        },
        {
          id: 'day2_evening_restore',
          time: '8:00 PM',
          activity: 'Guided Visualization for Safety',
          duration: '25 minutes',
          type: 'healing',
          description: 'Creating internal resources for emotional regulation'
        }
      ]
    },
    // Week 2: Building Skills and Coping Strategies
    {
      day: 8,
      theme: 'Craving Surf Mastery',
      focus: 'Learning to ride out cravings without acting on them',
      morning: [
        {
          id: 'day8_morning_grounding',
          time: '8:00 AM',
          activity: 'Grounding Through Five Senses',
          duration: '20 minutes',
          type: 'somatic',
          description: 'Sensory awareness practice to anchor in the present moment'
        },
        {
          id: 'day8_breakfast_prep',
          time: '8:30 AM',
          activity: 'Food School: Craving-Busting Breakfast',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Foods that help stabilize mood and reduce cravings'
        }
      ],
      afternoon: [
        {
          id: 'day8_urge_surfing',
          time: '2:00 PM',
          activity: 'Craving Surf Technique',
          duration: '90 minutes',
          type: 'therapy',
          description: 'Mastering the art of riding out cravings without resistance',
          modifications: ['Practice in low-risk scenarios first', 'Peer support available']
        },
        {
          id: 'day8_lunch_prep',
          time: '1:00 PM',
          activity: 'Food School: Balanced Energy Lunch',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Maintaining stable blood sugar to prevent mood swings'
        }
      ],
      evening: [
        {
          id: 'day8_somatic_movement',
          time: '5:00 PM',
          activity: 'Somatic Movement Therapy',
          duration: '40 minutes',
          type: 'somatic',
          description: 'Releasing trapped stress and trauma from the body'
        },
        {
          id: 'day8_dinner_prep',
          time: '6:30 PM',
          activity: 'Food School: Comfort Food Makeovers',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Healthy versions of comfort foods that satisfy cravings'
        },
        {
          id: 'day8_evening_restore',
          time: '8:00 PM',
          activity: 'Self-Compassion Meditation',
          duration: '25 minutes',
          type: 'healing',
          description: 'Cultivating kindness toward yourself in recovery'
        }
      ]
    },
    // Week 3: Integration and Future Planning
    {
      day: 15,
      theme: 'Values and Purpose',
      focus: 'Connecting with core values and life purpose beyond addiction',
      morning: [
        {
          id: 'day15_morning_grounding',
          time: '8:00 AM',
          activity: 'Gratitude and Intention Setting',
          duration: '20 minutes',
          type: 'reflection',
          description: 'Starting the day with appreciation and clear intentions'
        },
        {
          id: 'day15_breakfast_prep',
          time: '8:30 AM',
          activity: 'Food School: Energizing Power Breakfast',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Nutrient-dense meals for sustained energy and focus'
        }
      ],
      afternoon: [
        {
          id: 'day15_values_mapping',
          time: '2:00 PM',
          activity: 'Values Mapping Workshop',
          duration: '90 minutes',
          type: 'therapy',
          description: 'Identifying core values and creating a value-driven life plan',
          modifications: ['Interactive exercises available', 'Group sharing optional']
        },
        {
          id: 'day15_lunch_prep',
          time: '1:00 PM',
          activity: 'Food School: Brain-Boosting Lunch',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Foods that enhance cognitive function and mental clarity'
        }
      ],
      evening: [
        {
          id: 'day15_creative_expression',
          time: '5:00 PM',
          activity: 'Creative Expression Therapy',
          duration: '45 minutes',
          type: 'creative',
          description: 'Using art, music, or writing to explore values and aspirations'
        },
        {
          id: 'day15_dinner_prep',
          time: '6:30 PM',
          activity: 'Food School: Celebration Dinner',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Creating healthy celebration meals for special occasions'
        },
        {
          id: 'day15_evening_restore',
          time: '8:00 PM',
          activity: 'Future Self Visualization',
          duration: '30 minutes',
          type: 'healing',
          description: 'Connecting with your vision of recovery and future goals'
        }
      ]
    },
    {
      day: 21,
      theme: 'Graduation and Continued Journey',
      focus: 'Celebrating progress and preparing for ongoing recovery',
      morning: [
        {
          id: 'day21_morning_reflection',
          time: '8:00 AM',
          activity: 'Journey Reflection Practice',
          duration: '30 minutes',
          type: 'reflection',
          description: 'Reflecting on growth, insights, and transformation'
        },
        {
          id: 'day21_breakfast_prep',
          time: '8:30 AM',
          activity: 'Food School: Independence Breakfast',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Quick, healthy breakfast options for busy life transitions'
        }
      ],
      afternoon: [
        {
          id: 'day21_relapse_prevention',
          time: '2:00 PM',
          activity: 'Relapse Prevention Planning',
          duration: '120 minutes',
          type: 'therapy',
          description: 'Creating a comprehensive plan for maintaining recovery',
          modifications: ['Digital and printable versions', 'Emergency contact integration']
        },
        {
          id: 'day21_lunch_prep',
          time: '1:00 PM',
          activity: 'Food School: Maintenance Meal Planning',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Sustainable meal planning for long-term recovery'
        }
      ],
      evening: [
        {
          id: 'day21_graduation_ceremony',
          time: '5:00 PM',
          activity: 'Personal Graduation Ceremony',
          duration: '60 minutes',
          type: 'healing',
          description: 'Honoring your commitment and celebrating your progress'
        },
        {
          id: 'day21_dinner_prep',
          time: '6:30 PM',
          activity: 'Food School: Community Feast',
          duration: '60 minutes',
          type: 'nutrition',
          description: 'Preparing healthy meals to share with supportive community'
        },
        {
          id: 'day21_evening_commitment',
          time: '8:00 PM',
          activity: 'Continued Recovery Commitment',
          duration: '30 minutes',
          type: 'reflection',
          description: 'Setting intentions for ongoing recovery and aftercare'
        }
      ]
    }
  ]
};