import { RetreatConfiguration } from '../types/retreat';

export const addictionsRecoveryRetreat: RetreatConfiguration = {
  id: 'retreat_addictions_recovery',
  name: 'Addictions Recovery Program',
  description: 'A comprehensive, trauma-informed recovery program designed to support individuals overcoming substance and behavioral addictions through evidence-based practices.',
  shortDescription: 'Evidence-based recovery program for substance and behavioral addictions',
  duration: 14, // 14-day comprehensive program
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
          guideId: 'gentle-wake-up-breathing',
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
          guideId: 'urge-surfing-technique',
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
          guideId: 'grounding-exercises-outdoors',
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
          guideId: 'trauma-informed-body-scan',
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
          guideId: 'gentle-wake-up-breathing',
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
          guideId: 'emotion-regulation-techniques',
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
          guideId: 'trauma-informed-body-scan',
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
    },
    {
      day: 8,
      theme: 'Strengthening Craving Control',
      focus: 'Advanced Urge Surfing and craving management techniques',
      morning: [
        {
          id: 'som_box_breathing_day8',
          time: '8:00 AM',
          activity: 'Box Breathing Practice',
          duration: '15 minutes',
          type: 'somatic',
          description: 'Advanced breathing practice for immediate craving management'
        },
        {
          id: 'rx_b_08_spinach_feta_omelette',
          time: '8:30 AM',
          activity: 'Spinach & Feta Omelette',
          duration: '35 minutes',
          type: 'nutrition',
          description: 'Protein-rich breakfast with B-vitamins for neurological support'
        }
      ],
      afternoon: [
        {
          id: 'therapy_craving_surf_advanced',
          time: '2:00 PM',
          activity: 'Advanced Craving Surfing',
          duration: '90 minutes',
          type: 'therapy',
          description: 'Sophisticated techniques for managing intense cravings and urges',
          modifications: ['In-the-moment practice tools', 'Emergency craving protocols']
        },
        {
          id: 'rx_l_08_chickpea_curry',
          time: '12:30 PM',
          activity: 'Chickpea Curry',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Warming, spiced meal with protein and complex flavors'
        }
      ],
      evening: [
        {
          id: 'movement_emotional_release_day8',
          time: '5:00 PM',
          activity: 'Emotional Release Movement',
          duration: '40 minutes',
          type: 'movement',
          description: 'Dynamic movement to process and release stored emotions'
        },
        {
          id: 'rx_d_08_sweet_potato_salad',
          time: '6:30 PM',
          activity: 'Sweet Potato Salad',
          duration: '35 minutes',
          type: 'nutrition',
          description: 'Nutrient-dense dinner with beta-carotene and fiber'
        },
        {
          id: 'restore_yoga_nidra_day8',
          time: '8:00 PM',
          activity: 'Yoga Nidra Practice',
          duration: '35 minutes',
          type: 'healing',
          description: 'Deep restorative practice to integrate craving management skills'
        }
      ]
    },
    {
      day: 9,
      theme: 'Deep Trigger Work',
      focus: 'Rescripting High-Risk Scenarios and trauma-informed healing',
      morning: [
        {
          id: 'som_grounding_54321_day9',
          time: '8:00 AM',
          activity: '5-4-3-2-1 Grounding Technique',
          duration: '15 minutes',
          type: 'somatic',
          description: 'Stabilizing practice before deeper trauma work'
        },
        {
          id: 'rx_b_09_mango_coconut_smoothie',
          time: '8:30 AM',
          activity: 'Mango Coconut Smoothie',
          duration: '25 minutes',
          type: 'nutrition',
          description: 'Tropical smoothie with healthy fats and natural enzymes'
        }
      ],
      afternoon: [
        {
          id: 'therapy_trigger_rescripting',
          time: '2:00 PM',
          activity: 'Trigger Rescripting Therapy',
          duration: '120 minutes',
          type: 'therapy',
          description: 'Advanced EMDR-informed techniques to reprocess traumatic triggers',
          contraindications: ['Skip if feeling overwhelmed', 'Professional support recommended'],
          modifications: ['Self-paced modules', 'Grounding breaks included']
        },
        {
          id: 'rx_l_09_grilled_veg_wrap',
          time: '12:30 PM',
          activity: 'Grilled Vegetable Wrap',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Light, portable lunch with colorful grilled vegetables'
        }
      ],
      evening: [
        {
          id: 'movement_walking_meditation_day9',
          time: '5:00 PM',
          activity: 'Walking Meditation',
          duration: '30 minutes',
          type: 'movement',
          description: 'Gentle movement to integrate and process therapeutic work'
        },
        {
          id: 'rx_d_09_lentil_shepherds_pie',
          time: '6:30 PM',
          activity: 'Lentil Shepherd\'s Pie',
          duration: '50 minutes',
          type: 'nutrition',
          description: 'Comforting, protein-rich dinner for emotional nourishment'
        },
        {
          id: 'restore_pmr_day9',
          time: '8:00 PM',
          activity: 'Progressive Muscle Relaxation',
          duration: '25 minutes',
          type: 'somatic',
          description: 'Gentle body relaxation to release tension from deep work'
        }
      ]
    },
    {
      day: 10,
      theme: 'Emotion Regulation Mastery',
      focus: 'DBT Skills in Practice - advanced emotional regulation',
      morning: [
        {
          id: 'som_resonance_breathing_day10',
          time: '8:00 AM',
          activity: 'Resonance Breathing Practice',
          duration: '20 minutes',
          type: 'somatic',
          description: 'Refined breathing practice for emotional balance'
        },
        {
          id: 'rx_b_10_berry_protein_bowl',
          time: '8:30 AM',
          activity: 'Berry Protein Bowl',
          duration: '25 minutes',
          type: 'nutrition',
          description: 'Antioxidant-rich breakfast with plant-based proteins'
        }
      ],
      afternoon: [
        {
          id: 'therapy_emotion_regulation_advanced',
          time: '2:00 PM',
          activity: 'Advanced Emotion Regulation',
          duration: '90 minutes',
          type: 'therapy',
          description: 'Dialectical Behavior Therapy (DBT) skills for managing intense emotions',
          modifications: ['Interactive skill-building', 'Real-time practice scenarios']
        },
        {
          id: 'rx_l_10_mediterranean_quinoa',
          time: '12:30 PM',
          activity: 'Mediterranean Quinoa Salad',
          duration: '35 minutes',
          type: 'nutrition',
          description: 'Brain-healthy Mediterranean diet with omega-3 rich ingredients'
        }
      ],
      evening: [
        {
          id: 'movement_gentle_yoga_day10',
          time: '5:00 PM',
          activity: 'Gentle Yoga Practice',
          duration: '45 minutes',
          type: 'movement',
          description: 'Yoga practice focused on emotional regulation through movement'
        },
        {
          id: 'rx_d_10_tomato_lentil_soup',
          time: '6:30 PM',
          activity: 'Tomato Lentil Soup',
          duration: '40 minutes',
          type: 'nutrition',
          description: 'Warming soup with lycopene and plant protein'
        },
        {
          id: 'restore_sound_bath_day10',
          time: '8:00 PM',
          activity: 'Sound Bath Restoration',
          duration: '30 minutes',
          type: 'healing',
          description: 'Vibrational healing to harmonize emotional energy'
        }
      ]
    },
    {
      day: 11,
      theme: 'Relapse Prevention Master Plan',
      focus: 'Long-Term Safeguards and comprehensive prevention planning',
      morning: [
        {
          id: 'som_box_breathing_day11',
          time: '8:00 AM',
          activity: 'Box Breathing Practice',
          duration: '15 minutes',
          type: 'somatic',
          description: 'Centering practice for strategic planning work'
        },
        {
          id: 'rx_b_11_green_smoothie',
          time: '8:30 AM',
          activity: 'Green Smoothie',
          duration: '20 minutes',
          type: 'nutrition',
          description: 'Nutrient-dense green smoothie with superfoods and adaptogens'
        }
      ],
      afternoon: [
        {
          id: 'therapy_relapse_prevention_master',
          time: '2:00 PM',
          activity: 'Master Relapse Prevention Plan',
          duration: '120 minutes',
          type: 'therapy',
          description: 'Comprehensive long-term prevention strategy with multiple contingency plans',
          modifications: ['Digital planning tools', 'Professional support integration', 'Family involvement options']
        },
        {
          id: 'rx_l_11_roast_veg_salad',
          time: '12:30 PM',
          activity: 'Roasted Vegetable Salad',
          duration: '40 minutes',
          type: 'nutrition',
          description: 'Seasonal roasted vegetables with healing herbs and spices'
        }
      ],
      evening: [
        {
          id: 'movement_emotional_release_day11',
          time: '5:00 PM',
          activity: 'Emotional Release Movement',
          duration: '40 minutes',
          type: 'movement',
          description: 'Movement practice to release any remaining stored trauma'
        },
        {
          id: 'rx_d_11_chickpea_stew',
          time: '6:30 PM',
          activity: 'Chickpea Stew',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Hearty, warming stew with protein and healing spices'
        },
        {
          id: 'restore_yoga_nidra_day11',
          time: '8:00 PM',
          activity: 'Yoga Nidra Practice',
          duration: '35 minutes',
          type: 'healing',
          description: 'Deep integration practice for prevention planning'
        }
      ]
    },
    {
      day: 12,
      theme: 'Purpose & Future Vision',
      focus: 'Life Beyond Addiction - creating meaningful future goals',
      morning: [
        {
          id: 'som_grounding_54321_day12',
          time: '8:00 AM',
          activity: '5-4-3-2-1 Grounding Technique',
          duration: '15 minutes',
          type: 'somatic',
          description: 'Grounding practice for visionary work'
        },
        {
          id: 'rx_b_12_overnight_oats',
          time: '8:30 AM',
          activity: 'Overnight Oats with Berries',
          duration: '15 minutes',
          type: 'nutrition',
          description: 'Prepared overnight oats with antioxidants and fiber'
        }
      ],
      afternoon: [
        {
          id: 'therapy_future_vision',
          time: '2:00 PM',
          activity: 'Future Vision Workshop',
          duration: '90 minutes',
          type: 'therapy',
          description: 'Creating a compelling vision for life in recovery with concrete goals',
          modifications: ['Creative visualization tools', 'Goal-setting frameworks', 'Vision board creation']
        },
        {
          id: 'rx_l_12_pasta_salad',
          time: '12:30 PM',
          activity: 'Whole Grain Pasta Salad',
          duration: '35 minutes',
          type: 'nutrition',
          description: 'Energizing pasta salad with vegetables and healthy fats'
        }
      ],
      evening: [
        {
          id: 'movement_walking_meditation_day12',
          time: '5:00 PM',
          activity: 'Walking Meditation',
          duration: '30 minutes',
          type: 'movement',
          description: 'Mindful movement to embody future vision'
        },
        {
          id: 'rx_d_12_veggie_curry',
          time: '6:30 PM',
          activity: 'Vegetable Curry',
          duration: '45 minutes',
          type: 'nutrition',
          description: 'Aromatic curry with healing spices and colorful vegetables'
        },
        {
          id: 'restore_pmr_day12',
          time: '8:00 PM',
          activity: 'Progressive Muscle Relaxation',
          duration: '25 minutes',
          type: 'somatic',
          description: 'Relaxation practice to anchor future vision in the body'
        }
      ]
    },
    {
      day: 13,
      theme: 'Community & Connection',
      focus: 'Building Support Networks and healthy relationships',
      morning: [
        {
          id: 'som_resonance_breathing_day13',
          time: '8:00 AM',
          activity: 'Resonance Breathing Practice',
          duration: '20 minutes',
          type: 'somatic',
          description: 'Breathing practice to prepare for connection work'
        },
        {
          id: 'rx_b_13_scrambled_eggs_spinach',
          time: '8:30 AM',
          activity: 'Scrambled Eggs with Spinach',
          duration: '25 minutes',
          type: 'nutrition',
          description: 'Protein-rich breakfast with iron and B-vitamins'
        }
      ],
      afternoon: [
        {
          id: 'therapy_support_networks',
          time: '2:00 PM',
          activity: 'Building Support Networks',
          duration: '90 minutes',
          type: 'therapy',
          description: 'Strategies for building and maintaining healthy support systems',
          modifications: ['Communication skills practice', 'Boundary setting tools', 'Community resource mapping']
        },
        {
          id: 'rx_l_13_grain_bowl',
          time: '12:30 PM',
          activity: 'Ancient Grain Bowl',
          duration: '40 minutes',
          type: 'nutrition',
          description: 'Nutrient-dense bowl with ancient grains and fresh vegetables'
        }
      ],
      evening: [
        {
          id: 'movement_gentle_yoga_day13',
          time: '5:00 PM',
          activity: 'Gentle Yoga Practice',
          duration: '45 minutes',
          type: 'movement',
          description: 'Heart-opening yoga practice to cultivate connection and compassion'
        },
        {
          id: 'rx_d_13_stir_fry_tofu',
          time: '6:30 PM',
          activity: 'Vegetable Stir-Fry with Tofu',
          duration: '40 minutes',
          type: 'nutrition',
          description: 'Protein-rich stir-fry with colorful vegetables and healing ginger'
        },
        {
          id: 'restore_sound_bath_day13',
          time: '8:00 PM',
          activity: 'Sound Bath Restoration',
          duration: '30 minutes',
          type: 'healing',
          description: 'Group healing sounds to foster sense of connection'
        }
      ]
    },
    {
      day: 14,
      theme: 'Graduation & New Beginnings',
      focus: 'Integration & Commitment - celebrating transformation and committing to ongoing recovery',
      morning: [
        {
          id: 'som_integration_breathing',
          time: '8:00 AM',
          activity: 'Integration Breathing Practice',
          duration: '25 minutes',
          type: 'somatic',
          description: 'Special breathing practice to integrate all 14 days of learning'
        },
        {
          id: 'rx_b_14_celebration_parfait',
          time: '8:30 AM',
          activity: 'Celebration Breakfast Parfait',
          duration: '30 minutes',
          type: 'nutrition',
          description: 'Special breakfast to celebrate completion with superfoods and natural sweetness'
        }
      ],
      afternoon: [
        {
          id: 'therapy_integration_ceremony',
          time: '2:00 PM',
          activity: 'Integration & Graduation Ceremony',
          duration: '120 minutes',
          type: 'therapy',
          description: 'Comprehensive review of progress, creation of ongoing recovery plan, and celebration ceremony',
          modifications: ['Digital certificate creation', 'Personal achievement portfolio', 'Ongoing support resource access']
        },
        {
          id: 'rx_l_14_celebration_salad',
          time: '12:30 PM',
          activity: 'Celebration Rainbow Salad',
          duration: '40 minutes',
          type: 'nutrition',
          description: 'Colorful, celebratory salad representing the full spectrum of healing'
        }
      ],
      evening: [
        {
          id: 'movement_celebration_dance',
          time: '5:00 PM',
          activity: 'Celebration Movement',
          duration: '30 minutes',
          type: 'movement',
          description: 'Joyful movement practice to celebrate transformation and embodied healing'
        },
        {
          id: 'rx_d_14_feast_bowl',
          time: '6:30 PM',
          activity: 'Graduation Feast Bowl',
          duration: '50 minutes',
          type: 'nutrition',
          description: 'Special meal combining favorite elements from the 14-day nutritional journey'
        },
        {
          id: 'restore_gratitude_meditation',
          time: '7:30 PM',
          activity: 'Gratitude Meditation',
          duration: '20 minutes',
          type: 'healing',
          description: 'Meditation to honor the journey and cultivate gratitude for healing'
        },
        {
          id: 'closure_commitment_ritual',
          time: '8:00 PM',
          activity: 'Final Commitment Ritual',
          duration: '45 minutes',
          type: 'healing',
          description: 'Sacred ceremony to commit to ongoing recovery and celebrate transformation',
          modifications: ['Written commitments', 'Digital memory book', 'Personal sacred objects creation']
        }
      ]
    }
  ]
};