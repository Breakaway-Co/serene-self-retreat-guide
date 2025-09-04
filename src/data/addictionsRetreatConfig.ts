import { RetreatConfiguration } from '../types/retreat';

export const addictionsRecoveryRetreat: RetreatConfiguration = {
  id: 'retreat_addictions_recovery',
  name: 'Addictions Recovery Program',
  description: 'A comprehensive, trauma-informed recovery program designed to support individuals overcoming substance and behavioral addictions through evidence-based practices.',
  shortDescription: 'Evidence-based recovery program for substance and behavioral addictions',
  duration: 7, // 7-day intensive program
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
    {
      day: 1,
      theme: 'Starting the Journey',
      focus: 'Stabilisation & Awareness - Building foundation for recovery',
      morning: [
        {
          id: 'som_resonance_breathing',
          time: '8:00 AM',
          activity: 'Resonance Breathing Practice',
          duration: '20 minutes',
          type: 'somatic',
          description: 'Calming breathwork to stabilize the nervous system and create inner safety',
          modifications: ['Seated option', 'Paced guidance available']
        },
        {
          id: 'rx_b_01_blueberry_chia',
          time: '8:30 AM',
          activity: 'Blueberry Chia Pudding',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Nutrient-dense breakfast rich in omega-3s and antioxidants for brain healing',
          modifications: ['Dairy-free option', 'Sugar alternatives available']
        }
      ],
      afternoon: [
        {
          id: 'therapy_craving_surf_intro',
          time: '2:00 PM',
          activity: 'Introduction to Craving Surfing',
          duration: '90 minutes',
          type: 'therapy',
          description: 'Learn foundational techniques for riding out cravings without acting on them',
          contraindications: ['Skip if overwhelmed'],
          modifications: ['Self-paced modules', 'Break into shorter segments']
        },
        {
          id: 'rx_l_01_quinoa_bowl',
          time: '12:30 PM',
          activity: 'Quinoa Veggie Bowl',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Protein-rich lunch to maintain stable blood sugar and sustained energy'
        }
      ],
      evening: [
        {
          id: 'movement_gentle_yoga',
          time: '5:00 PM',
          activity: 'Gentle Yoga for Recovery',
          duration: '45 minutes',
          type: 'movement',
          description: 'Trauma-informed yoga practice to reconnect with the body safely',
          modifications: ['Chair-based options', 'Audio-only guidance']
        },
        {
          id: 'rx_d_01_sweet_potato_lentil_soup',
          time: '6:30 PM',
          activity: 'Sweet Potato & Lentil Soup',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Warming, grounding dinner that supports liver detoxification'
        },
        {
          id: 'restore_sound_bath',
          time: '8:00 PM',
          activity: 'Sound Bath Restoration',
          duration: '30 minutes',
          type: 'healing',
          description: 'Vibrational healing to release tension and promote deep relaxation'
        }
      ]
    },
    {
      day: 2,
      theme: 'Mapping Triggers',
      focus: 'Identifying High-Risk Situations and personal trigger patterns',
      morning: [
        {
          id: 'som_box_breathing',
          time: '8:00 AM',
          activity: 'Box Breathing Practice',
          duration: '15 minutes',
          type: 'somatic',
          description: 'Four-count breathing to build emotional regulation skills'
        },
        {
          id: 'rx_b_02_avocado_toast',
          time: '8:30 AM',
          activity: 'Avocado Toast with Hemp Seeds',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Healthy fats and protein to support brain function and mood stability'
        }
      ],
      afternoon: [
        {
          id: 'therapy_trigger_mapping',
          time: '2:00 PM',
          activity: 'Personal Trigger Mapping',
          duration: '90 minutes',
          type: 'therapy',
          description: 'Comprehensive exploration of personal triggers, warning signs, and patterns',
          modifications: ['Written and visual options', 'Break into shorter segments']
        },
        {
          id: 'rx_l_02_lentil_beetroot_salad',
          time: '12:30 PM',
          activity: 'Lentil & Beetroot Salad',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Liver-supporting nutrients to aid in natural detoxification'
        }
      ],
      evening: [
        {
          id: 'movement_emotional_release',
          time: '5:00 PM',
          activity: 'Emotional Release Movement',
          duration: '40 minutes',
          type: 'movement',
          description: 'Gentle movement to process and release stored emotions and trauma'
        },
        {
          id: 'rx_d_02_zucchini_noodles_cashew',
          time: '6:30 PM',
          activity: 'Zucchini Noodles with Cashew Cream',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Light, nutritious dinner rich in healthy fats and minerals'
        },
        {
          id: 'restore_yoga_nidra',
          time: '8:00 PM',
          activity: 'Yoga Nidra Practice',
          duration: '35 minutes',
          type: 'healing',
          description: 'Deep relaxation practice for nervous system restoration'
        }
      ]
    },
    {
      day: 3,
      theme: 'Building Coping Skills',
      focus: 'Emotion Regulation and healthy coping mechanisms',
      morning: [
        {
          id: 'som_grounding_54321',
          time: '8:00 AM',
          activity: '5-4-3-2-1 Grounding Technique',
          duration: '15 minutes',
          type: 'somatic',
          description: 'Sensory grounding practice to anchor in the present moment'
        },
        {
          id: 'rx_b_03_oatmeal_walnuts',
          time: '8:30 AM',
          activity: 'Oatmeal with Walnuts & Banana',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Complex carbohydrates and omega-3s for sustained energy and brain health'
        }
      ],
      afternoon: [
        {
          id: 'therapy_emotion_regulation',
          time: '2:00 PM',
          activity: 'Emotion Regulation Skills',
          duration: '90 minutes',
          type: 'therapy',
          description: 'Learning healthy ways to manage difficult emotions without substances',
          modifications: ['Interactive exercises', 'Practice scenarios']
        },
        {
          id: 'rx_l_03_chickpea_salad',
          time: '12:30 PM',
          activity: 'Chickpea & Spinach Salad',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Protein and iron-rich meal to support energy and cognitive function'
        }
      ],
      evening: [
        {
          id: 'movement_walking_meditation',
          time: '5:00 PM',
          activity: 'Walking Meditation',
          duration: '30 minutes',
          type: 'movement',
          description: 'Mindful movement practice to integrate awareness and embodiment'
        },
        {
          id: 'rx_d_03_brown_rice_veggie_stirfry',
          time: '6:30 PM',
          activity: 'Brown Rice & Veggie Stir-Fry',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Balanced meal with complex carbs and vegetables for stable mood'
        },
        {
          id: 'restore_pmr',
          time: '8:00 PM',
          activity: 'Progressive Muscle Relaxation',
          duration: '25 minutes',
          type: 'somatic',
          description: 'Systematic relaxation to release physical tension and stress'
        }
      ]
    },
    {
      day: 4,
      theme: 'Relapse Prevention',
      focus: 'Planning for Challenges and building resilience',
      morning: [
        {
          id: 'som_resonance_breathing_day4',
          time: '8:00 AM',
          activity: 'Resonance Breathing Practice',
          duration: '20 minutes',
          type: 'somatic',
          description: 'Continued practice to deepen nervous system regulation'
        },
        {
          id: 'rx_b_04_warm_oats_berries',
          time: '8:30 AM',
          activity: 'Warm Oats with Berries',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Antioxidant-rich breakfast to support brain healing and protection'
        }
      ],
      afternoon: [
        {
          id: 'therapy_relapse_prevention',
          time: '2:00 PM',
          activity: 'Relapse Prevention Planning',
          duration: '120 minutes',
          type: 'therapy',
          description: 'Creating a comprehensive plan for maintaining recovery and handling setbacks',
          modifications: ['Digital planning tools', 'Emergency contact integration']
        },
        {
          id: 'rx_l_04_mediterranean_salad',
          time: '12:30 PM',
          activity: 'Mediterranean Salad',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Anti-inflammatory ingredients to support overall healing'
        }
      ],
      evening: [
        {
          id: 'movement_gentle_yoga_day4',
          time: '5:00 PM',
          activity: 'Gentle Yoga Practice',
          duration: '45 minutes',
          type: 'movement',
          description: 'Continued yoga practice to build body awareness and self-regulation'
        },
        {
          id: 'rx_d_04_lentil_veggie_stew',
          time: '6:30 PM',
          activity: 'Lentil & Vegetable Stew',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Warming, nourishing meal rich in protein and fiber'
        },
        {
          id: 'restore_sound_bath_day4',
          time: '8:00 PM',
          activity: 'Sound Bath Restoration',
          duration: '30 minutes',
          type: 'healing',
          description: 'Deep relaxation to integrate the day\'s learning'
        }
      ]
    },
    {
      day: 5,
      theme: 'Reconnecting with Values',
      focus: 'Meaning & Purpose - rediscovering what matters most',
      morning: [
        {
          id: 'som_box_breathing_day5',
          time: '8:00 AM',
          activity: 'Box Breathing Practice',
          duration: '15 minutes',
          type: 'somatic',
          description: 'Centering practice to prepare for values exploration'
        },
        {
          id: 'rx_b_05_banana_almond_smoothie',
          time: '8:30 AM',
          activity: 'Banana Almond Smoothie',
          duration: '20 minutes',
          type: 'nutrition',
          description: 'Quick, nutritious breakfast with natural sugars and healthy fats'
        }
      ],
      afternoon: [
        {
          id: 'therapy_values_mapping',
          time: '2:00 PM',
          activity: 'Values Mapping Workshop',
          duration: '90 minutes',
          type: 'therapy',
          description: 'Identifying core values and creating a value-driven recovery plan',
          modifications: ['Creative expression options', 'Group sharing available']
        },
        {
          id: 'rx_l_05_quinoa_roast_veg',
          time: '12:30 PM',
          activity: 'Quinoa with Roast Vegetables',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Colorful, nutrient-dense meal to support mood and energy'
        }
      ],
      evening: [
        {
          id: 'movement_emotional_release_day5',
          time: '5:00 PM',
          activity: 'Emotional Release Movement',
          duration: '40 minutes',
          type: 'movement',
          description: 'Movement practice to connect with and express authentic self'
        },
        {
          id: 'rx_d_05_pumpkin_soup',
          time: '6:30 PM',
          activity: 'Pumpkin Soup',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Comforting, vitamin-rich soup to nourish body and soul'
        },
        {
          id: 'restore_yoga_nidra_day5',
          time: '8:00 PM',
          activity: 'Yoga Nidra Practice',
          duration: '35 minutes',
          type: 'healing',
          description: 'Deep relaxation to integrate values work and inner wisdom'
        }
      ]
    },
    {
      day: 6,
      theme: 'Lifestyle Rebuild',
      focus: 'Healthy Routines and sustainable lifestyle changes',
      morning: [
        {
          id: 'som_grounding_54321_day6',
          time: '8:00 AM',
          activity: '5-4-3-2-1 Grounding Technique',
          duration: '15 minutes',
          type: 'somatic',
          description: 'Grounding practice to anchor new lifestyle intentions'
        },
        {
          id: 'rx_b_06_chia_matcha_pudding',
          time: '8:30 AM',
          activity: 'Chia Matcha Pudding',
          duration: '20 minutes',
          type: 'nutrition',
          description: 'Energizing breakfast with gentle caffeine and superfoods'
        }
      ],
      afternoon: [
        {
          id: 'therapy_lifestyle_rebuild',
          time: '2:00 PM',
          activity: 'Lifestyle Rebuild Workshop',
          duration: '90 minutes',
          type: 'therapy',
          description: 'Creating sustainable daily routines and healthy habits for recovery',
          modifications: ['Personalized planning tools', 'Implementation strategies']
        },
        {
          id: 'rx_l_06_lentil_tabouli',
          time: '12:30 PM',
          activity: 'Lentil Tabouli',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Fresh, herb-rich salad packed with plant protein and nutrients'
        }
      ],
      evening: [
        {
          id: 'movement_walking_meditation_day6',
          time: '5:00 PM',
          activity: 'Walking Meditation',
          duration: '30 minutes',
          type: 'movement',
          description: 'Mindful movement to practice presence in daily activities'
        },
        {
          id: 'rx_d_06_brown_rice_bowl',
          time: '6:30 PM',
          activity: 'Brown Rice Bowl',
          duration: '40 minutes',
          type: 'nutrition',
          description: 'Customizable bowl with healthy grains, vegetables, and proteins'
        },
        {
          id: 'restore_pmr_day6',
          time: '8:00 PM',
          activity: 'Progressive Muscle Relaxation',
          duration: '25 minutes',
          type: 'somatic',
          description: 'Relaxation practice to prepare for program completion'
        }
      ]
    },
    {
      day: 7,
      theme: 'Looking Ahead',
      focus: 'Aftercare & Maintenance - sustaining recovery beyond the program',
      morning: [
        {
          id: 'som_resonance_breathing_day7',
          time: '8:00 AM',
          activity: 'Resonance Breathing Practice',
          duration: '20 minutes',
          type: 'somatic',
          description: 'Final practice to solidify nervous system regulation skills'
        },
        {
          id: 'rx_b_07_coconut_yogurt_parfait',
          time: '8:30 AM',
          activity: 'Coconut Yogurt Parfait',
          duration: '25 minutes',
          type: 'nutrition',
          description: 'Celebratory breakfast with probiotics for gut-brain health'
        }
      ],
      afternoon: [
        {
          id: 'therapy_aftercare_plan',
          time: '2:00 PM',
          activity: 'Aftercare Planning Session',
          duration: '120 minutes',
          type: 'therapy',
          description: 'Creating a comprehensive 30-60-90 day aftercare plan for sustained recovery',
          modifications: ['Resource directories', 'Professional referral options']
        },
        {
          id: 'rx_l_07_soba_noodle_salad',
          time: '12:30 PM',
          activity: 'Soba Noodle Salad',
          duration: '35 minutes',
          type: 'nutrition',
          description: 'Light, energizing lunch with buckwheat noodles and fresh vegetables'
        }
      ],
      evening: [
        {
          id: 'movement_gentle_yoga_day7',
          time: '5:00 PM',
          activity: 'Gentle Yoga Practice',
          duration: '45 minutes',
          type: 'movement',
          description: 'Final yoga practice to honor the body and celebrate progress'
        },
        {
          id: 'rx_d_07_miso_soup_tofu',
          time: '6:30 PM',
          activity: 'Miso Soup with Tofu',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Healing, warming soup to close the nutritional journey'
        },
        {
          id: 'restore_sound_bath_final',
          time: '7:30 PM',
          activity: 'Final Sound Bath',
          duration: '30 minutes',
          type: 'healing',
          description: 'Ceremonial sound bath to honor transformation'
        },
        {
          id: 'closure_recovery_commitment',
          time: '8:15 PM',
          activity: 'Recovery Commitment Ritual',
          duration: '45 minutes',
          type: 'healing',
          description: 'Create a personal commitment statement and identify your top 3 ongoing recovery actions',
          modifications: ['Written and artistic options', 'Digital and physical certificates']
        }
      ]
    }
  ]
};