import { RetreatConfiguration } from '@/types/retreat';

export const lifeUpgradeRetreat: RetreatConfiguration = {
  id: 'life_upgrade',
  name: 'Life Upgrade: 6-Step Transformation Journey',
  description: 'A structured 14-day retreat integrating the 6 Step Upgrade Process and Belief System Upgrade practices. Transform limiting beliefs into empowering truths while building sustainable life changes through trauma-informed, evidence-based methods.',
  shortDescription: 'Transform your belief systems and upgrade your life through gentle, structured practices',
  duration: 14,
  focusAreas: [
    'Belief System Transformation',
    'Life Upgrade Process',
    'Self-Compassion',
    'Sustainable Change',
    'Personal Empowerment',
    'Emotional Regulation'
  ],
  principles: [
    'Trauma-informed practice with emotional safety',
    'Gentle, self-paced progression',
    'Evidence-based cognitive restructuring',
    'Integration of learning into daily life',
    'Self-compassion as foundation',
    'Sustainable behavioral change'
  ],
  targetConditions: [
    'Limiting beliefs',
    'Low self-esteem',
    'Perfectionism',
    'Self-sabotage patterns',
    'Fear of change',
    'Imposter syndrome'
  ],
  contraindications: [
    'Active psychosis',
    'Severe dissociative disorders without professional support',
    'Current suicidal ideation requiring immediate intervention'
  ],
  riskLevel: 'low',
  requiresSupervision: false,
  days: [
    {
      day: 1,
      theme: 'Foundation & Awareness',
      focus: 'Understanding your current belief systems and setting intentions',
      morning: [
        {
          id: 'life_upgrade_d1_morning_welcome',
          time: '7:00 AM',
          activity: 'Welcome & Grounding Ritual',
          duration: '15 min',
          type: 'mindfulness',
          description: 'Gentle breathing and body scan to arrive fully present',
          guideId: 'welcome_grounding'
        },
        {
          id: 'life_upgrade_d1_morning_intro',
          time: '7:30 AM',
          activity: 'Introduction to Life Upgrade Process',
          duration: '30 min',
          type: 'reflection',
          description: 'Understanding the 6 steps: Awareness, Acceptance, Release, Choose, Integrate, Embody',
          guideId: 'life_upgrade_intro'
        },
        {
          id: 'life_upgrade_d1_morning_beliefs',
          time: '8:30 AM',
          activity: 'Belief Inventory Journal',
          duration: '30 min',
          type: 'reflection',
          description: 'Identify current beliefs about self, relationships, success, and worthiness',
          guideId: 'belief_inventory',
          responsePrompts: {
            questions: [
              'What beliefs about yourself do you notice arising most frequently?',
              'Where did these beliefs originate?',
              'How have these beliefs served or limited you?'
            ],
            reflectionAreas: ['Core beliefs', 'Origin stories', 'Impact on behavior'],
            trackingMetrics: ['Number of beliefs identified', 'Emotional response', 'Clarity level']
          }
        }
      ],
      afternoon: [
        {
          id: 'life_upgrade_d1_afternoon_nutrition',
          time: '12:00 PM',
          activity: 'Mindful Nourishment',
          duration: '45 min',
          type: 'nutrition',
          description: 'Eating with awareness and gratitude',
          modifications: ['Can be adapted for any dietary preferences']
        },
        {
          id: 'life_upgrade_d1_afternoon_step1',
          time: '2:00 PM',
          activity: 'Step 1: Awareness Practice',
          duration: '45 min',
          type: 'therapy',
          description: 'Guided exploration of how beliefs show up in daily life through observation without judgment',
          guideId: 'step1_awareness',
          responsePrompts: {
            questions: [
              'When did you notice a limiting belief arise today?',
              'What triggered it?',
              'How did it feel in your body?'
            ]
          }
        },
        {
          id: 'life_upgrade_d1_afternoon_movement',
          time: '3:00 PM',
          activity: 'Gentle Movement Integration',
          duration: '20 min',
          type: 'movement',
          description: 'Yoga or stretching to release stored tension',
          modifications: ['Chair-based options', 'Standing alternatives', 'Full floor practice']
        }
      ],
      evening: [
        {
          id: 'life_upgrade_d1_evening_eft',
          time: '6:00 PM',
          activity: 'EFT Tapping Introduction',
          duration: '30 min',
          type: 'healing',
          description: 'Learn basic tapping points and sequence for emotional regulation',
          guideId: 'eft_basics',
          contraindications: ['Pause if emotional intensity becomes overwhelming']
        },
        {
          id: 'life_upgrade_d1_evening_reflection',
          time: '7:30 PM',
          activity: 'Evening Integration Journal',
          duration: '15 min',
          type: 'reflection',
          description: 'Reflect on insights and prepare for rest',
          responsePrompts: {
            questions: ['What did I discover about myself today?', 'What am I grateful for?', 'What intention do I set for tomorrow?']
          }
        }
      ]
    },
    {
      day: 2,
      theme: 'Acceptance & Self-Compassion',
      focus: 'Meeting yourself with kindness where you are',
      morning: [
        {
          id: 'life_upgrade_d2_morning_meditation',
          time: '7:00 AM',
          activity: 'Self-Compassion Meditation',
          duration: '20 min',
          type: 'mindfulness',
          description: 'Loving-kindness practice directed toward self',
          guideId: 'self_compassion_meditation'
        },
        {
          id: 'life_upgrade_d2_morning_step2',
          time: '7:30 AM',
          activity: 'Step 2: Acceptance Practice',
          duration: '45 min',
          type: 'therapy',
          description: 'Learning to accept beliefs without judgment as information, not truth',
          guideId: 'step2_acceptance'
        },
        {
          id: 'life_upgrade_d2_morning_journal',
          time: '8:30 AM',
          activity: 'Compassionate Belief Reframe',
          duration: '30 min',
          type: 'reflection',
          description: 'Writing exercise: "I accept that I learned [belief] AND I can learn something new"',
          responsePrompts: {
            reflectionAreas: ['Acceptance statements', 'Emotional shifts', 'Resistance patterns']
          }
        }
      ],
      afternoon: [
        {
          id: 'life_upgrade_d2_afternoon_nutrition',
          time: '12:00 PM',
          activity: 'Nourishing Meal',
          duration: '45 min',
          type: 'nutrition',
          description: 'Continue mindful eating practice'
        },
        {
          id: 'life_upgrade_d2_afternoon_nature',
          time: '2:00 PM',
          activity: 'Nature Connection Walk',
          duration: '30 min',
          type: 'nature',
          description: 'Walking meditation in nature or near a window observing natural elements',
          modifications: ['Indoor alternative: window gazing', 'Seated observation option']
        },
        {
          id: 'life_upgrade_d2_afternoon_creative',
          time: '3:00 PM',
          activity: 'Belief Map Creation',
          duration: '45 min',
          type: 'creative',
          description: 'Visual representation of belief system network using art supplies or digital tools',
          guideId: 'belief_mapping'
        }
      ],
      evening: [
        {
          id: 'life_upgrade_d2_evening_eft',
          time: '6:00 PM',
          activity: 'EFT for Self-Acceptance',
          duration: '25 min',
          type: 'healing',
          description: 'Tapping sequence: "Even though I have this belief, I deeply and completely accept myself"',
          guideId: 'eft_acceptance'
        },
        {
          id: 'life_upgrade_d2_evening_rest',
          time: '8:00 PM',
          activity: 'Restorative Reflection',
          duration: '15 min',
          type: 'reflection',
          description: 'Evening gratitude and integration',
          responsePrompts: {
            questions: ['How did acceptance feel different from resistance today?']
          }
        }
      ]
    },
    {
      day: 3,
      theme: 'Release & Letting Go',
      focus: 'Creating space for new beliefs',
      morning: [
        {
          id: 'life_upgrade_d3_morning_breath',
          time: '7:00 AM',
          activity: 'Release Breathwork',
          duration: '20 min',
          type: 'somatic',
          description: 'Gentle breathing technique to release old patterns',
          guideId: 'release_breath',
          contraindications: ['Avoid if experiencing anxiety', 'Modify pace as needed']
        },
        {
          id: 'life_upgrade_d3_morning_step3',
          time: '7:30 AM',
          activity: 'Step 3: Release Ceremony',
          duration: '45 min',
          type: 'healing',
          description: 'Ritual practice to consciously release limiting beliefs',
          guideId: 'step3_release',
          responsePrompts: {
            questions: ['What belief am I ready to release?', 'What would become possible without it?']
          }
        },
        {
          id: 'life_upgrade_d3_morning_letter',
          time: '8:30 AM',
          activity: 'Release Letter Writing',
          duration: '30 min',
          type: 'reflection',
          description: 'Write a letter to your old belief thanking it and releasing it',
          guideId: 'release_letter'
        }
      ],
      afternoon: [
        {
          id: 'life_upgrade_d3_afternoon_nutrition',
          time: '12:00 PM',
          activity: 'Mindful Meal',
          duration: '45 min',
          type: 'nutrition'
        },
        {
          id: 'life_upgrade_d3_afternoon_movement',
          time: '2:00 PM',
          activity: 'Releasing Movement Practice',
          duration: '30 min',
          type: 'movement',
          description: 'Dance, shake, or flowing movement to physically release stored energy',
          modifications: ['Seated shaking', 'Gentle swaying', 'Full body dance']
        },
        {
          id: 'life_upgrade_d3_afternoon_eft',
          time: '3:00 PM',
          activity: 'EFT Release Sequence',
          duration: '30 min',
          type: 'healing',
          description: 'Tapping to support the release process',
          guideId: 'eft_release'
        }
      ],
      evening: [
        {
          id: 'life_upgrade_d3_evening_bath',
          time: '6:00 PM',
          activity: 'Cleansing Ritual',
          duration: '30 min',
          type: 'healing',
          description: 'Bath, shower, or hand washing ritual symbolizing release',
          modifications: ['Foot soak alternative', 'Hand washing ceremony']
        },
        {
          id: 'life_upgrade_d3_evening_rest',
          time: '8:00 PM',
          activity: 'Rest & Integration',
          duration: '20 min',
          type: 'mindfulness',
          description: 'Gentle body scan and gratitude practice'
        }
      ]
    },
    {
      day: 4,
      theme: 'Choice & New Possibilities',
      focus: 'Consciously choosing empowering beliefs',
      morning: [
        {
          id: 'life_upgrade_d4_morning_vision',
          time: '7:00 AM',
          activity: 'Future Self Visualization',
          duration: '20 min',
          type: 'mindfulness',
          description: 'Guided meditation to connect with your upgraded self',
          guideId: 'future_self_meditation'
        },
        {
          id: 'life_upgrade_d4_morning_step4',
          time: '7:30 AM',
          activity: 'Step 4: Choose Your Truth',
          duration: '45 min',
          type: 'therapy',
          description: 'Intentionally select new empowering beliefs aligned with your values',
          guideId: 'step4_choose',
          responsePrompts: {
            questions: [
              'What belief would serve me better?',
              'What would I need to believe to achieve my goals?',
              'What does my wisest self believe?'
            ]
          }
        },
        {
          id: 'life_upgrade_d4_morning_affirmations',
          time: '8:30 AM',
          activity: 'New Belief Affirmation Creation',
          duration: '30 min',
          type: 'reflection',
          description: 'Craft personal affirmations that feel authentic and empowering',
          guideId: 'affirmation_creation'
        }
      ],
      afternoon: [
        {
          id: 'life_upgrade_d4_afternoon_nutrition',
          time: '12:00 PM',
          activity: 'Nourishing Lunch',
          duration: '45 min',
          type: 'nutrition'
        },
        {
          id: 'life_upgrade_d4_afternoon_vision',
          time: '2:00 PM',
          activity: 'Vision Board Creation',
          duration: '60 min',
          type: 'creative',
          description: 'Create visual representation of new beliefs and life vision',
          guideId: 'vision_board'
        }
      ],
      evening: [
        {
          id: 'life_upgrade_d4_evening_eft',
          time: '6:00 PM',
          activity: 'EFT for New Beliefs',
          duration: '25 min',
          type: 'healing',
          description: 'Tapping sequence to install new empowering beliefs',
          guideId: 'eft_install_beliefs'
        },
        {
          id: 'life_upgrade_d4_evening_journal',
          time: '7:30 PM',
          activity: 'Choice Commitment Journal',
          duration: '20 min',
          type: 'reflection',
          description: 'Write commitment to new beliefs and identify first small action',
          responsePrompts: {
            questions: ['What new belief am I committing to?', 'What small action can I take tomorrow?']
          }
        }
      ]
    },
    {
      day: 5,
      theme: 'Integration & Practice',
      focus: 'Beginning to live your new beliefs',
      morning: [
        {
          id: 'life_upgrade_d5_morning_meditation',
          time: '7:00 AM',
          activity: 'Morning Embodiment Practice',
          duration: '20 min',
          type: 'mindfulness',
          description: 'Meditation to feel new beliefs in your body',
          guideId: 'embodiment_meditation'
        },
        {
          id: 'life_upgrade_d5_morning_step5',
          time: '7:30 AM',
          activity: 'Step 5: Integration Practice',
          duration: '45 min',
          type: 'therapy',
          description: 'Learn to integrate new beliefs into daily decisions and actions',
          guideId: 'step5_integration'
        },
        {
          id: 'life_upgrade_d5_morning_scenarios',
          time: '8:30 AM',
          activity: 'Life Scenario Practice',
          duration: '30 min',
          type: 'reflection',
          description: 'Mental rehearsal: How would your new belief respond to common situations?',
          responsePrompts: {
            reflectionAreas: ['Challenging scenarios', 'New responses', 'Confidence level']
          }
        }
      ],
      afternoon: [
        {
          id: 'life_upgrade_d5_afternoon_nutrition',
          time: '12:00 PM',
          activity: 'Mindful Meal',
          duration: '45 min',
          type: 'nutrition'
        },
        {
          id: 'life_upgrade_d5_afternoon_movement',
          time: '2:00 PM',
          activity: 'Confidence Movement',
          duration: '30 min',
          type: 'movement',
          description: 'Power poses and strength-building movements',
          modifications: ['Seated power poses', 'Standing practice', 'Dynamic movement']
        },
        {
          id: 'life_upgrade_d5_afternoon_practice',
          time: '3:00 PM',
          activity: 'Real-World Practice',
          duration: '45 min',
          type: 'therapy',
          description: 'Take one small action from your new belief system',
          guideId: 'real_world_practice'
        }
      ],
      evening: [
        {
          id: 'life_upgrade_d5_evening_eft',
          time: '6:00 PM',
          activity: 'EFT for Courage',
          duration: '25 min',
          type: 'healing',
          description: 'Tapping to build confidence in new beliefs',
          guideId: 'eft_courage'
        },
        {
          id: 'life_upgrade_d5_evening_celebration',
          time: '7:30 PM',
          activity: 'Progress Celebration',
          duration: '20 min',
          type: 'reflection',
          description: 'Acknowledge all growth and small wins',
          responsePrompts: {
            questions: ['What am I proud of today?', 'How did I show up differently?']
          }
        }
      ]
    },
    {
      day: 6,
      theme: 'Embodiment & Deepening',
      focus: 'Living from your new beliefs',
      morning: [
        {
          id: 'life_upgrade_d6_morning_somatic',
          time: '7:00 AM',
          activity: 'Somatic Embodiment Practice',
          duration: '25 min',
          type: 'somatic',
          description: 'Body-based practice to anchor new beliefs in your nervous system',
          guideId: 'somatic_embodiment'
        },
        {
          id: 'life_upgrade_d6_morning_step6',
          time: '7:30 AM',
          activity: 'Step 6: Embodiment Deep Dive',
          duration: '45 min',
          type: 'therapy',
          description: 'Make new beliefs your natural, automatic response',
          guideId: 'step6_embodiment'
        },
        {
          id: 'life_upgrade_d6_morning_identity',
          time: '8:30 AM',
          activity: 'Identity Exploration Journal',
          duration: '30 min',
          type: 'reflection',
          description: '"I am..." statements from new belief system',
          responsePrompts: {
            questions: ['Who am I becoming?', 'What values guide me now?', 'How do I want to show up?']
          }
        }
      ],
      afternoon: [
        {
          id: 'life_upgrade_d6_afternoon_nutrition',
          time: '12:00 PM',
          activity: 'Nourishing Meal',
          duration: '45 min',
          type: 'nutrition'
        },
        {
          id: 'life_upgrade_d6_afternoon_nature',
          time: '2:00 PM',
          activity: 'Grounding Nature Practice',
          duration: '30 min',
          type: 'nature',
          description: 'Connect with earth energy to anchor transformation',
          modifications: ['Indoor plant connection', 'Window nature observation']
        },
        {
          id: 'life_upgrade_d6_afternoon_creative',
          time: '3:00 PM',
          activity: 'New Self Expression',
          duration: '45 min',
          type: 'creative',
          description: 'Create art, write, or express your transformed self',
          guideId: 'creative_expression'
        }
      ],
      evening: [
        {
          id: 'life_upgrade_d6_evening_eft',
          time: '6:00 PM',
          activity: 'EFT Integration Session',
          duration: '30 min',
          type: 'healing',
          description: 'Comprehensive tapping to solidify all changes',
          guideId: 'eft_integration'
        },
        {
          id: 'life_upgrade_d6_evening_rest',
          time: '8:00 PM',
          activity: 'Deep Rest Integration',
          duration: '20 min',
          type: 'mindfulness',
          description: 'Yoga nidra or body scan for deep integration'
        }
      ]
    },
    {
      day: 7,
      theme: 'Reflection & Consolidation',
      focus: 'Reviewing progress and reinforcing changes',
      morning: [
        {
          id: 'life_upgrade_d7_morning_gratitude',
          time: '7:00 AM',
          activity: 'Gratitude Practice',
          duration: '15 min',
          type: 'mindfulness',
          description: 'Appreciating your journey and growth'
        },
        {
          id: 'life_upgrade_d7_morning_review',
          time: '7:30 AM',
          activity: 'Week One Review',
          duration: '60 min',
          type: 'reflection',
          description: 'Comprehensive reflection on 6-step process',
          responsePrompts: {
            questions: [
              'What has shifted?',
              'What challenges arose?',
              'What surprised me?',
              'What do I need for week two?'
            ],
            reflectionAreas: ['Key insights', 'Obstacles', 'Wins', 'Adjustments needed']
          }
        }
      ],
      afternoon: [
        {
          id: 'life_upgrade_d7_afternoon_nutrition',
          time: '12:00 PM',
          activity: 'Celebratory Meal',
          duration: '60 min',
          type: 'nutrition',
          description: 'Special meal honoring your progress'
        },
        {
          id: 'life_upgrade_d7_afternoon_rest',
          time: '2:00 PM',
          activity: 'Restorative Rest',
          duration: '90 min',
          type: 'healing',
          description: 'Gentle rest, nap, or quiet time',
          modifications: ['Reading', 'Gentle music', 'Nature time', 'Complete rest']
        }
      ],
      evening: [
        {
          id: 'life_upgrade_d7_evening_ritual',
          time: '6:00 PM',
          activity: 'Renewal Ritual',
          duration: '30 min',
          type: 'healing',
          description: 'Personal ceremony marking the first week completion',
          guideId: 'renewal_ritual'
        },
        {
          id: 'life_upgrade_d7_evening_intention',
          time: '7:30 PM',
          activity: 'Week Two Intention Setting',
          duration: '20 min',
          type: 'reflection',
          description: 'Set intentions for deepening practice',
          responsePrompts: {
            questions: ['What do I want to deepen?', 'What support do I need?']
          }
        }
      ]
    },
    {
      day: 8,
      theme: 'Advanced Integration',
      focus: 'Deepening embodiment in daily life',
      morning: [
        {
          id: 'life_upgrade_d8_morning_practice',
          time: '7:00 AM',
          activity: 'Morning Belief Embodiment',
          duration: '25 min',
          type: 'somatic',
          description: 'Advanced practice connecting beliefs to body wisdom',
          guideId: 'advanced_embodiment'
        },
        {
          id: 'life_upgrade_d8_morning_challenges',
          time: '7:30 AM',
          activity: 'Working with Resistance',
          duration: '45 min',
          type: 'therapy',
          description: 'Understanding and transforming parts that resist change',
          guideId: 'resistance_work'
        },
        {
          id: 'life_upgrade_d8_morning_dialogue',
          time: '8:30 AM',
          activity: 'Inner Parts Dialogue',
          duration: '30 min',
          type: 'reflection',
          description: 'Written conversation with resistant parts',
          responsePrompts: {
            questions: ['What part of me is scared?', 'What does it need?', 'How can I honor both old and new?']
          }
        }
      ],
      afternoon: [
        {
          id: 'life_upgrade_d8_afternoon_nutrition',
          time: '12:00 PM',
          activity: 'Mindful Meal',
          duration: '45 min',
          type: 'nutrition'
        },
        {
          id: 'life_upgrade_d8_afternoon_movement',
          time: '2:00 PM',
          activity: 'Integration Movement',
          duration: '30 min',
          type: 'movement',
          description: 'Mindful yoga or dance integrating all parts of self'
        },
        {
          id: 'life_upgrade_d8_afternoon_action',
          time: '3:00 PM',
          activity: 'Bold Action Practice',
          duration: '45 min',
          type: 'therapy',
          description: 'Take a bigger step from new belief system',
          guideId: 'bold_action'
        }
      ],
      evening: [
        {
          id: 'life_upgrade_d8_evening_eft',
          time: '6:00 PM',
          activity: 'EFT for Resistance',
          duration: '30 min',
          type: 'healing',
          description: 'Tapping to honor resistance while choosing change',
          guideId: 'eft_resistance'
        },
        {
          id: 'life_upgrade_d8_evening_integration',
          time: '7:30 PM',
          activity: 'Daily Integration Journal',
          duration: '20 min',
          type: 'reflection',
          responsePrompts: {
            questions: ['How did I navigate resistance today?', 'What felt courageous?']
          }
        }
      ]
    },
    {
      day: 9,
      theme: 'Relationship & Connection',
      focus: 'New beliefs in relationships',
      morning: [
        {
          id: 'life_upgrade_d9_morning_lovingkindness',
          time: '7:00 AM',
          activity: 'Loving-Kindness Meditation',
          duration: '20 min',
          type: 'mindfulness',
          description: 'Extending compassion to self and others',
          guideId: 'lovingkindness_meditation'
        },
        {
          id: 'life_upgrade_d9_morning_boundaries',
          time: '7:30 AM',
          activity: 'Healthy Boundaries Workshop',
          duration: '45 min',
          type: 'therapy',
          description: 'How new beliefs support healthy boundaries',
          guideId: 'boundaries_workshop'
        },
        {
          id: 'life_upgrade_d9_morning_communication',
          time: '8:30 AM',
          activity: 'Communication Scripts',
          duration: '30 min',
          type: 'reflection',
          description: 'Practice expressing new beliefs in relationships',
          responsePrompts: {
            reflectionAreas: ['Boundary statements', 'Needs expression', 'Value communication']
          }
        }
      ],
      afternoon: [
        {
          id: 'life_upgrade_d9_afternoon_nutrition',
          time: '12:00 PM',
          activity: 'Nourishing Meal',
          duration: '45 min',
          type: 'nutrition'
        },
        {
          id: 'life_upgrade_d9_afternoon_practice',
          time: '2:00 PM',
          activity: 'Relationship Visualization',
          duration: '30 min',
          type: 'mindfulness',
          description: 'Visualize healthy relationships from new beliefs',
          guideId: 'relationship_visualization'
        },
        {
          id: 'life_upgrade_d9_afternoon_roleplay',
          time: '3:00 PM',
          activity: 'Empowered Response Practice',
          duration: '45 min',
          type: 'therapy',
          description: 'Mental rehearsal of challenging conversations',
          guideId: 'response_practice'
        }
      ],
      evening: [
        {
          id: 'life_upgrade_d9_evening_eft',
          time: '6:00 PM',
          activity: 'EFT for Relationships',
          duration: '25 min',
          type: 'healing',
          description: 'Tapping for healthy connection and boundaries',
          guideId: 'eft_relationships'
        },
        {
          id: 'life_upgrade_d9_evening_journal',
          time: '7:30 PM',
          activity: 'Relationship Reflection',
          duration: '20 min',
          type: 'reflection',
          responsePrompts: {
            questions: ['How do my new beliefs support healthier relationships?', 'What boundaries feel important?']
          }
        }
      ]
    },
    {
      day: 10,
      theme: 'Success & Achievement',
      focus: 'New beliefs about success and worthiness',
      morning: [
        {
          id: 'life_upgrade_d10_morning_meditation',
          time: '7:00 AM',
          activity: 'Abundance Meditation',
          duration: '20 min',
          type: 'mindfulness',
          description: 'Connecting to inner worthiness and abundance',
          guideId: 'abundance_meditation'
        },
        {
          id: 'life_upgrade_d10_morning_success',
          time: '7:30 AM',
          activity: 'Success Redefined Workshop',
          duration: '45 min',
          type: 'therapy',
          description: 'Exploring authentic success aligned with values',
          guideId: 'success_workshop'
        },
        {
          id: 'life_upgrade_d10_morning_goals',
          time: '8:30 AM',
          activity: 'Values-Based Goal Setting',
          duration: '30 min',
          type: 'reflection',
          description: 'Set goals from new belief system',
          responsePrompts: {
            questions: ['What do I truly want?', 'What would success look like from my new beliefs?', 'What first step calls to me?']
          }
        }
      ],
      afternoon: [
        {
          id: 'life_upgrade_d10_afternoon_nutrition',
          time: '12:00 PM',
          activity: 'Mindful Meal',
          duration: '45 min',
          type: 'nutrition'
        },
        {
          id: 'life_upgrade_d10_afternoon_action',
          time: '2:00 PM',
          activity: 'Success Action Planning',
          duration: '60 min',
          type: 'therapy',
          description: 'Create action plan aligned with new beliefs',
          guideId: 'action_planning'
        }
      ],
      evening: [
        {
          id: 'life_upgrade_d10_evening_eft',
          time: '6:00 PM',
          activity: 'EFT for Worthiness',
          duration: '30 min',
          type: 'healing',
          description: 'Tapping to embody deserving success',
          guideId: 'eft_worthiness'
        },
        {
          id: 'life_upgrade_d10_evening_celebration',
          time: '7:30 PM',
          activity: 'Success Stories Journal',
          duration: '20 min',
          type: 'reflection',
          description: 'Document past successes through new lens',
          responsePrompts: {
            questions: ['What have I already achieved?', 'What strengths do I have?']
          }
        }
      ]
    },
    {
      day: 11,
      theme: 'Resilience & Sustainability',
      focus: 'Building lasting change',
      morning: [
        {
          id: 'life_upgrade_d11_morning_grounding',
          time: '7:00 AM',
          activity: 'Resilience Grounding Practice',
          duration: '20 min',
          type: 'somatic',
          description: 'Body-based resilience building',
          guideId: 'resilience_grounding'
        },
        {
          id: 'life_upgrade_d11_morning_setback',
          time: '7:30 AM',
          activity: 'Setback Recovery Workshop',
          duration: '45 min',
          type: 'therapy',
          description: 'Planning for challenges and maintaining progress',
          guideId: 'setback_recovery'
        },
        {
          id: 'life_upgrade_d11_morning_toolkit',
          time: '8:30 AM',
          activity: 'Personal Toolkit Creation',
          duration: '30 min',
          type: 'reflection',
          description: 'Compile your go-to practices for difficult moments',
          responsePrompts: {
            reflectionAreas: ['Quick practices', 'Support resources', 'Reminder statements']
          }
        }
      ],
      afternoon: [
        {
          id: 'life_upgrade_d11_afternoon_nutrition',
          time: '12:00 PM',
          activity: 'Nourishing Meal',
          duration: '45 min',
          type: 'nutrition'
        },
        {
          id: 'life_upgrade_d11_afternoon_movement',
          time: '2:00 PM',
          activity: 'Strength-Building Movement',
          duration: '30 min',
          type: 'movement',
          description: 'Physical practice mirroring inner resilience'
        },
        {
          id: 'life_upgrade_d11_afternoon_practice',
          time: '3:00 PM',
          activity: 'Challenge Simulation',
          duration: '45 min',
          type: 'therapy',
          description: 'Mental practice navigating challenges from new beliefs',
          guideId: 'challenge_simulation'
        }
      ],
      evening: [
        {
          id: 'life_upgrade_d11_evening_eft',
          time: '6:00 PM',
          activity: 'EFT for Resilience',
          duration: '25 min',
          type: 'healing',
          description: 'Tapping to strengthen inner stability',
          guideId: 'eft_resilience'
        },
        {
          id: 'life_upgrade_d11_evening_journal',
          time: '7:30 PM',
          activity: 'Resilience Reflection',
          duration: '20 min',
          type: 'reflection',
          responsePrompts: {
            questions: ['What makes me resilient?', 'How have I bounced back before?']
          }
        }
      ]
    },
    {
      day: 12,
      theme: 'Joy & Expansion',
      focus: 'Living fully from new beliefs',
      morning: [
        {
          id: 'life_upgrade_d12_morning_joy',
          time: '7:00 AM',
          activity: 'Joy Meditation',
          duration: '20 min',
          type: 'mindfulness',
          description: 'Connecting to joy as natural state',
          guideId: 'joy_meditation'
        },
        {
          id: 'life_upgrade_d12_morning_expansion',
          time: '7:30 AM',
          activity: 'Life Expansion Exploration',
          duration: '45 min',
          type: 'therapy',
          description: 'Dreaming bigger from secure foundation',
          guideId: 'expansion_exploration'
        },
        {
          id: 'life_upgrade_d12_morning_possibilities',
          time: '8:30 AM',
          activity: 'Possibility Mapping',
          duration: '30 min',
          type: 'creative',
          description: 'Visual or written exploration of new possibilities',
          responsePrompts: {
            questions: ['What becomes possible now?', 'What excites me?', 'What lights me up?']
          }
        }
      ],
      afternoon: [
        {
          id: 'life_upgrade_d12_afternoon_nutrition',
          time: '12:00 PM',
          activity: 'Joyful Meal',
          duration: '45 min',
          type: 'nutrition',
          description: 'Eat something truly enjoyable'
        },
        {
          id: 'life_upgrade_d12_afternoon_play',
          time: '2:00 PM',
          activity: 'Playful Movement',
          duration: '30 min',
          type: 'movement',
          description: 'Dance, play, or joyful movement',
          modifications: ['Whatever feels fun and free']
        },
        {
          id: 'life_upgrade_d12_afternoon_adventure',
          time: '3:00 PM',
          activity: 'Mini Adventure',
          duration: '60 min',
          type: 'nature',
          description: 'Do something new or explore somewhere different',
          modifications: ['Can be small - new route, new activity, new perspective']
        }
      ],
      evening: [
        {
          id: 'life_upgrade_d12_evening_eft',
          time: '6:00 PM',
          activity: 'EFT for Joy',
          duration: '25 min',
          type: 'healing',
          description: 'Tapping to allow more joy and pleasure',
          guideId: 'eft_joy'
        },
        {
          id: 'life_upgrade_d12_evening_gratitude',
          time: '7:30 PM',
          activity: 'Gratitude & Joy Journal',
          duration: '20 min',
          type: 'reflection',
          responsePrompts: {
            questions: ['What brought me joy today?', 'What am I excited about?']
          }
        }
      ]
    },
    {
      day: 13,
      theme: 'Integration & Preparation',
      focus: 'Preparing for life beyond retreat',
      morning: [
        {
          id: 'life_upgrade_d13_morning_meditation',
          time: '7:00 AM',
          activity: 'Integration Meditation',
          duration: '25 min',
          type: 'mindfulness',
          description: 'Bringing all learnings together',
          guideId: 'integration_meditation'
        },
        {
          id: 'life_upgrade_d13_morning_plan',
          time: '7:30 AM',
          activity: 'Post-Retreat Life Plan',
          duration: '60 min',
          type: 'therapy',
          description: 'Creating sustainable daily practices',
          guideId: 'life_plan',
          responsePrompts: {
            questions: [
              'What daily practices support my new beliefs?',
              'How will I handle challenges?',
              'What support do I need?',
              'What are my non-negotiables?'
            ]
          }
        }
      ],
      afternoon: [
        {
          id: 'life_upgrade_d13_afternoon_nutrition',
          time: '12:00 PM',
          activity: 'Mindful Meal',
          duration: '45 min',
          type: 'nutrition'
        },
        {
          id: 'life_upgrade_d13_afternoon_systems',
          time: '2:00 PM',
          activity: 'Support System Building',
          duration: '45 min',
          type: 'therapy',
          description: 'Identify and strengthen your support network',
          guideId: 'support_systems'
        },
        {
          id: 'life_upgrade_d13_afternoon_schedule',
          time: '3:00 PM',
          activity: 'Weekly Schedule Design',
          duration: '45 min',
          type: 'reflection',
          description: 'Plan realistic integration into daily life',
          responsePrompts: {
            reflectionAreas: ['Daily practices', 'Weekly review', 'Monthly check-ins']
          }
        }
      ],
      evening: [
        {
          id: 'life_upgrade_d13_evening_eft',
          time: '6:00 PM',
          activity: 'EFT for Transition',
          duration: '30 min',
          type: 'healing',
          description: 'Tapping to ease transition back to daily life',
          guideId: 'eft_transition'
        },
        {
          id: 'life_upgrade_d13_evening_commitment',
          time: '7:30 PM',
          activity: 'Commitment Letter to Self',
          duration: '30 min',
          type: 'reflection',
          description: 'Write letter committing to continued growth',
          responsePrompts: {
            questions: ['What am I committing to?', 'What will I remember?', 'How will I honor myself?']
          }
        }
      ]
    },
    {
      day: 14,
      theme: 'Celebration & Completion',
      focus: 'Honoring your transformation',
      morning: [
        {
          id: 'life_upgrade_d14_morning_gratitude',
          time: '7:00 AM',
          activity: 'Journey Gratitude Practice',
          duration: '20 min',
          type: 'mindfulness',
          description: 'Honoring every step of the journey'
        },
        {
          id: 'life_upgrade_d14_morning_review',
          time: '7:30 AM',
          activity: 'Complete Journey Review',
          duration: '60 min',
          type: 'reflection',
          description: 'Comprehensive reflection on entire retreat',
          responsePrompts: {
            questions: [
              'Who was I when I started?',
              'Who am I now?',
              'What changed?',
              'What did I learn?',
              'What am I proud of?',
              'What continues?'
            ],
            reflectionAreas: ['Biggest shifts', 'Key learnings', 'Ongoing practices', 'Future intentions']
          }
        }
      ],
      afternoon: [
        {
          id: 'life_upgrade_d14_afternoon_celebration',
          time: '12:00 PM',
          activity: 'Celebration Meal',
          duration: '60 min',
          type: 'nutrition',
          description: 'Special meal honoring completion'
        },
        {
          id: 'life_upgrade_d14_afternoon_ceremony',
          time: '2:00 PM',
          activity: 'Completion Ceremony',
          duration: '45 min',
          type: 'healing',
          description: 'Personal ritual marking transformation',
          guideId: 'completion_ceremony'
        },
        {
          id: 'life_upgrade_d14_afternoon_gift',
          time: '3:00 PM',
          activity: 'Gift to Future Self',
          duration: '30 min',
          type: 'creative',
          description: 'Create something for yourself to open in 30 days',
          guideId: 'future_gift'
        }
      ],
      evening: [
        {
          id: 'life_upgrade_d14_evening_meditation',
          time: '6:00 PM',
          activity: 'New Beginning Meditation',
          duration: '30 min',
          type: 'mindfulness',
          description: 'Meditation honoring completion and new beginning',
          guideId: 'new_beginning_meditation'
        },
        {
          id: 'life_upgrade_d14_evening_blessing',
          time: '7:30 PM',
          activity: 'Self-Blessing Ritual',
          duration: '20 min',
          type: 'healing',
          description: 'Closing blessing for yourself and your journey',
          guideId: 'self_blessing'
        },
        {
          id: 'life_upgrade_d14_evening_rest',
          time: '8:00 PM',
          activity: 'Peaceful Rest',
          duration: '30 min',
          type: 'mindfulness',
          description: 'Deep rest in your transformed state'
        }
      ]
    }
  ]
};
