export interface ActivityGuide {
  id: string;
  title: string;
  category: 'mindfulness' | 'reflection' | 'nutrition' | 'movement' | 'healing' | 'creative' | 'nature' | 'therapy' | 'somatic' | 'eft';
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  framework: string[]; // Which therapeutic frameworks it draws from
  materials: string[];
  evidenceBase: string;
  traumaConsiderations: string[];
  contraindications: string[];
  modifications: string[];
  facilitationGuide: {
    setup: string;
    steps: {
      step: number;
      instruction: string;
      duration: string;
      tips?: string[];
    }[];
    closing: string;
  };
  integrationPrompts: {
    questions: string[];
    reflectionAreas: string[];
  };
  rotationTags: string[]; // Tags for which retreats this works well with
}

export const activityLibrary: ActivityGuide[] = [
  // EFT TAPPING ACTIVITIES (Framework: EFT, 6-Step Upgrade)
  {
    id: 'eft_morning_clarity',
    title: 'EFT Tapping for Morning Clarity',
    category: 'eft',
    duration: '15 min',
    difficulty: 'beginner',
    framework: ['EFT Tapping', 'Morning Rituals'],
    materials: ['Quiet space', 'Journal (optional)'],
    evidenceBase: 'EFT has been shown to reduce cortisol levels by 24% and significantly decrease anxiety, depression, and PTSD symptoms (Church et al., 2012)',
    traumaConsiderations: [
      'Allow participants to pause at any time',
      'Emphasize that emotional intensity is normal and temporary',
      'Provide grounding techniques before starting'
    ],
    contraindications: ['Active psychosis', 'Severe dissociation without support'],
    modifications: [
      'Can be done seated or lying down',
      'Gentle tapping for those with sensory sensitivities',
      'Mental tapping if physical touch is triggering'
    ],
    facilitationGuide: {
      setup: 'Find a comfortable seated position. Take three deep breaths to center yourself.',
      steps: [
        {
          step: 1,
          instruction: 'Rate your current mental fog or confusion on a scale of 0-10',
          duration: '1 min',
          tips: ['Be honest with yourself', 'This is just for your awareness']
        },
        {
          step: 2,
          instruction: 'Setup Statement: Tap the karate chop point while saying 3 times: "Even though I feel foggy this morning, I deeply and completely accept myself"',
          duration: '2 min',
          tips: ['Say it with conviction', 'Feel free to modify the words to fit your experience']
        },
        {
          step: 3,
          instruction: 'Tapping Sequence: Tap each point 7 times while saying the reminder phrase "this morning fog"',
          duration: '5 min',
          tips: [
            'Top of head: "this morning fog"',
            'Eyebrow: "unclear thoughts"',
            'Side of eye: "can\'t think straight"',
            'Under eye: "feeling cloudy"',
            'Under nose: "mental confusion"',
            'Chin: "can\'t focus"',
            'Collarbone: "foggy mind"',
            'Under arm: "releasing this fog"'
          ]
        },
        {
          step: 4,
          instruction: 'Positive Round: Repeat sequence with "I choose clarity" and "my mind is clear"',
          duration: '5 min',
          tips: ['Notice any shifts in your body or mind', 'Breathe naturally']
        },
        {
          step: 5,
          instruction: 'Re-rate your mental clarity on 0-10 scale',
          duration: '1 min',
          tips: ['Notice even small improvements', 'Repeat if needed']
        }
      ],
      closing: 'Take three deep breaths. Journal any insights or feelings that emerged.'
    },
    integrationPrompts: {
      questions: [
        'What clarity emerged for you today?',
        'How can you carry this clarity forward?',
        'What did you notice shifting in your body?'
      ],
      reflectionAreas: ['Mental clarity', 'Emotional shifts', 'Physical sensations']
    },
    rotationTags: ['morning', 'anxiety', 'stress', 'all-retreats']
  },

  {
    id: 'eft_release_limiting_beliefs',
    title: 'EFT for Releasing Limiting Beliefs',
    category: 'eft',
    duration: '25 min',
    difficulty: 'intermediate',
    framework: ['EFT Tapping', 'Belief System Upgrade', '6-Step Upgrade'],
    materials: ['Quiet private space', 'Journal', 'Tissue box'],
    evidenceBase: 'EFT demonstrates significant efficacy in treating psychological distress and has been shown to regulate genes involved in stress response (Feinstein, 2012)',
    traumaConsiderations: [
      'Work with one belief at a time',
      'Allow time for emotional processing',
      'Emphasize that beliefs are learned and can be unlearned'
    ],
    contraindications: ['Active suicidal ideation', 'Severe trauma without therapist support'],
    modifications: [
      'Start with less intense beliefs',
      'Take breaks between rounds',
      'Option to write beliefs instead of saying them aloud'
    ],
    facilitationGuide: {
      setup: 'Identify one limiting belief you\'re ready to release (e.g., "I\'m not good enough"). Rate how true it feels on 0-10 scale.',
      steps: [
        {
          step: 1,
          instruction: 'Setup: Tap karate chop while saying "Even though I believe [limiting belief], I deeply and completely accept myself"',
          duration: '3 min',
          tips: ['Say it three times', 'Allow any emotions to surface']
        },
        {
          step: 2,
          instruction: 'Acknowledgment Round: Tap all points saying the belief directly',
          duration: '5 min',
          tips: [
            'This isn\'t reinforcing it, it\'s acknowledging it',
            'You might feel emotional - this is good',
            'Breathe through any intensity'
          ]
        },
        {
          step: 3,
          instruction: 'Origin Round: Tap while exploring "Where did I learn this belief?"',
          duration: '5 min',
          tips: ['Don\'t force memories', 'Sometimes you just sense an origin', 'Honor whatever comes up']
        },
        {
          step: 4,
          instruction: 'Release Round: Tap saying "I release this belief" and "I let this go"',
          duration: '5 min',
          tips: ['Visualize the belief leaving your body', 'Take deep breaths']
        },
        {
          step: 5,
          instruction: 'New Belief Round: Tap while installing empowering belief',
          duration: '5 min',
          tips: [
            'Choose opposite of limiting belief',
            'Make it present tense',
            'Feel it as you say it'
          ]
        },
        {
          step: 6,
          instruction: 'Re-rate the original belief. Notice how it feels now.',
          duration: '2 min'
        }
      ],
      closing: 'Take time to journal about the experience. Drink water. Be gentle with yourself.'
    },
    integrationPrompts: {
      questions: [
        'What belief did I release?',
        'What new belief am I choosing?',
        'How does this new belief change what\'s possible for me?',
        'What action can I take from this new belief?'
      ],
      reflectionAreas: ['Old belief patterns', 'New possibilities', 'Emotional release', 'Body sensations']
    },
    rotationTags: ['life-upgrade', 'anxiety', 'depression', 'all-retreats']
  },

  // THE METHOD ACTIVITIES (Framework: The Method, Wisdom Development)
  {
    id: 'the_method_pause_practice',
    title: 'The Method: Pause Practice',
    category: 'mindfulness',
    duration: '20 min',
    difficulty: 'beginner',
    framework: ['The Method', 'Wisdom Development'],
    materials: ['Timer', 'Comfortable seat'],
    evidenceBase: 'Pausing before reacting activates the prefrontal cortex, allowing for conscious choice rather than automatic reaction (Siegel, 2007)',
    traumaConsiderations: [
      'Pausing can feel unsafe for trauma survivors initially',
      'Emphasize that pausing is empowering, not freezing',
      'Always provide a way to end the pause'
    ],
    contraindications: ['None - universally applicable'],
    modifications: [
      'Shorter pauses (3-5 seconds)',
      'Physical movement during pause',
      'Eyes open if closing feels unsafe'
    ],
    facilitationGuide: {
      setup: 'Sit comfortably. Place one hand on your heart, one on your belly.',
      steps: [
        {
          step: 1,
          instruction: 'Understanding the Pause: Learn that pausing creates space between stimulus and response',
          duration: '3 min',
          tips: [
            'The pause is where your power lives',
            'It\'s not about stopping forever, just slowing down',
            'Even 3 seconds can change everything'
          ]
        },
        {
          step: 2,
          instruction: 'Breath Anchor: Practice taking 3 deep breaths as your pause signal',
          duration: '5 min',
          tips: [
            'In through nose for 4, out through mouth for 6',
            'Feel your body settle with each breath',
            'This becomes your emergency pause button'
          ]
        },
        {
          step: 3,
          instruction: 'Scenario Practice: Imagine triggering situations and practice pausing',
          duration: '8 min',
          tips: [
            'Someone criticizes you - PAUSE - breathe three times',
            'You feel overwhelmed - PAUSE - breathe three times',
            'You want to react - PAUSE - breathe three times',
            'Notice how the pause changes your response'
          ]
        },
        {
          step: 4,
          instruction: 'Commitment: Choose one situation today where you\'ll practice pausing',
          duration: '4 min',
          tips: ['Be specific', 'Set a gentle intention', 'Forgive yourself if you forget']
        }
      ],
      closing: 'The pause is your superpower. Use it wisely and often.'
    },
    integrationPrompts: {
      questions: [
        'When do I most need to pause?',
        'What happens when I pause vs. when I react?',
        'What wisdom emerges in the pause?'
      ],
      reflectionAreas: ['Reactive patterns', 'Pause opportunities', 'Inner wisdom']
    },
    rotationTags: ['wisdom-development', 'stress', 'anxiety', 'all-retreats']
  },

  {
    id: 'the_method_notice_practice',
    title: 'The Method: Notice Without Judgment',
    category: 'mindfulness',
    duration: '25 min',
    difficulty: 'beginner',
    framework: ['The Method', 'Wisdom Development', 'Mindfulness'],
    materials: ['Journal', 'Pen'],
    evidenceBase: 'Non-judgmental awareness, core to mindfulness, reduces emotional reactivity and increases psychological flexibility (Hayes et al., 2006)',
    traumaConsiderations: [
      'Noticing can bring up difficult emotions',
      'Emphasize observation without engagement',
      'Provide grounding if overwhelm occurs'
    ],
    contraindications: ['Active dissociation without support'],
    modifications: [
      'External noticing (surroundings) before internal',
      'Shorter practice periods',
      'Partner with grounding techniques'
    ],
    facilitationGuide: {
      setup: 'Settle into a comfortable position with your journal nearby.',
      steps: [
        {
          step: 1,
          instruction: 'External Noticing: Spend 5 minutes noticing your environment without judgment',
          duration: '5 min',
          tips: [
            'I notice the color blue',
            'I notice a sound',
            'I notice temperature',
            'No good/bad, just noticing'
          ]
        },
        {
          step: 2,
          instruction: 'Body Noticing: Notice physical sensations without trying to change them',
          duration: '5 min',
          tips: [
            'I notice tension in my shoulders',
            'I notice my breath',
            'I notice warmth/coolness',
            'Just observe, don\'t fix'
          ]
        },
        {
          step: 3,
          instruction: 'Thought Noticing: Watch thoughts like clouds passing',
          duration: '5 min',
          tips: [
            'I notice a thought about...',
            'I notice a worry',
            'I notice a memory',
            'Thoughts aren\'t facts, they\'re just thoughts'
          ]
        },
        {
          step: 4,
          instruction: 'Emotion Noticing: Name emotions without drowning in them',
          duration: '5 min',
          tips: [
            'I notice anxiety',
            'I notice sadness',
            'I notice peace',
            'Emotions are visitors, not permanent residents'
          ]
        },
        {
          step: 5,
          instruction: 'Journal: Write what you noticed',
          duration: '5 min',
          tips: ['Use "I notice..." format', 'No analysis needed', 'Just record observations']
        }
      ],
      closing: 'You are the noticer, not the noticed. This awareness is your freedom.'
    },
    integrationPrompts: {
      questions: [
        'What patterns did I notice?',
        'What surprised me?',
        'How does noticing change my relationship with my experience?'
      ],
      reflectionAreas: ['Observation skills', 'Patterns', 'Judgment vs. noticing']
    },
    rotationTags: ['wisdom-development', 'anxiety', 'depression', 'stress', 'all-retreats']
  },

  {
    id: 'the_method_feel_practice',
    title: 'The Method: Feel Fully Practice',
    category: 'somatic',
    duration: '30 min',
    difficulty: 'intermediate',
    framework: ['The Method', 'Somatic Experiencing', 'Wisdom Development'],
    materials: ['Safe private space', 'Blanket or comfort item', 'Journal'],
    evidenceBase: 'Allowing full emotional experiencing without suppression leads to better emotional regulation and psychological health (Greenberg, 2002)',
    traumaConsiderations: [
      'Feeling can be overwhelming for trauma survivors',
      'Always maintain titration - feel in small doses',
      'Provide containment and grounding',
      'Emphasize choice and control'
    ],
    contraindications: ['Recent severe trauma', 'Active crisis', 'Without emergency support available'],
    modifications: [
      'Work with less intense emotions first',
      'Shorten duration',
      'Use pendulation (feel, then ground, then feel)',
      'Physical movement to process'
    ],
    facilitationGuide: {
      setup: 'Create a nest of safety with blankets. Have tissues and water nearby. Set phone timer so you don\'t have to track time.',
      steps: [
        {
          step: 1,
          instruction: 'Grounding First: Anchor yourself in safety',
          duration: '5 min',
          tips: [
            'Feel your feet on the floor',
            'Notice 5 things you can see',
            'Remember you are safe right now',
            'You control this practice'
          ]
        },
        {
          step: 2,
          instruction: 'Invitation: Invite a mild emotion to surface',
          duration: '3 min',
          tips: [
            'Start small - not your biggest trauma',
            'Maybe a recent frustration or sadness',
            'Just invite, don\'t force',
            'If nothing comes, that\'s okay'
          ]
        },
        {
          step: 3,
          instruction: 'Locate: Where do you feel this emotion in your body?',
          duration: '5 min',
          tips: [
            'Chest? Throat? Belly? Head?',
            'What\'s the sensation? Tight? Heavy? Hot?',
            'Just notice, don\'t judge',
            'Emotions are physical experiences'
          ]
        },
        {
          step: 4,
          instruction: 'Allow: Let the feeling be there without trying to fix it',
          duration: '10 min',
          tips: [
            'Breathe into the sensation',
            'Say "I feel you, and that\'s okay"',
            'Emotions move when we stop resisting',
            'It\'s okay to cry, shake, or make sounds',
            'Ground if it gets too intense'
          ]
        },
        {
          step: 5,
          instruction: 'Wisdom: Ask the emotion "What do you need me to know?"',
          duration: '5 min',
          tips: [
            'Emotions are messengers',
            'Listen without arguing',
            'Thank the emotion for its message'
          ]
        },
        {
          step: 6,
          instruction: 'Ground and Close: Return to safety and presence',
          duration: '2 min',
          tips: [
            'Feel your body in the chair',
            'Notice your surroundings',
            'Drink water',
            'You\'re safe now'
          ]
        }
      ],
      closing: 'What you feel, you can heal. Your emotions are not your enemies - they are your guides.'
    },
    integrationPrompts: {
      questions: [
        'What emotion did I allow myself to feel?',
        'Where did I feel it in my body?',
        'What was the emotion trying to tell me?',
        'What do I need now?'
      ],
      reflectionAreas: ['Emotional awareness', 'Body sensations', 'Emotional wisdom', 'Needs']
    },
    rotationTags: ['wisdom-development', 'life-upgrade', 'grief', 'depression', 'trauma']
  },

  // WISDOM DEVELOPMENT ACTIVITIES
  {
    id: 'inner_wisdom_dialogue',
    title: 'Inner Wisdom Dialogue',
    category: 'reflection',
    duration: '30 min',
    difficulty: 'intermediate',
    framework: ['Wisdom Development', 'The Method', 'Internal Family Systems'],
    materials: ['Journal', 'Two pens of different colors', 'Quiet space'],
    evidenceBase: 'Written dialogue with different parts of self facilitates integration and self-awareness, core to IFS therapy (Schwartz, 2001)',
    traumaConsiderations: [
      'Some parts may hold trauma - approach gently',
      'Not all parts will want to talk immediately',
      'Respect internal boundaries',
      'Seek professional support if parts feel dangerous'
    ],
    contraindications: ['Severe dissociative disorders without professional guidance', 'Active psychosis'],
    modifications: [
      'Start with less intense questions',
      'Shorter dialogue time',
      'Draw instead of write',
      'Speak out loud instead of write'
    ],
    facilitationGuide: {
      setup: 'Open journal to blank pages. Choose one pen for "you" asking questions, another pen for "Wise Self" responding.',
      steps: [
        {
          step: 1,
          instruction: 'Center and Connect: Close eyes, hand on heart, ask "May I speak with my Wise Self?"',
          duration: '3 min',
          tips: [
            'Wait for sense of yes/permission',
            'Wise Self feels calm, compassionate, knowing',
            'If no connection, try again later'
          ]
        },
        {
          step: 2,
          instruction: 'Opening Question: With your first pen, write "What do I most need to know right now?"',
          duration: '2 min'
        },
        {
          step: 3,
          instruction: 'Listen and Receive: Switch pens, let Wise Self respond without censoring',
          duration: '5 min',
          tips: [
            'Don\'t think, just write what comes',
            'Wise Self is kind, never cruel',
            'If you get cruelty, that\'s not Wise Self',
            'Trust what emerges'
          ]
        },
        {
          step: 4,
          instruction: 'Continue Dialogue: Keep switching pens, ask follow-up questions',
          duration: '15 min',
          tips: [
            'Ask "What else?"',
            'Ask "How?"',
            'Ask "What first step?"',
            'Let it flow naturally'
          ]
        },
        {
          step: 5,
          instruction: 'Gratitude: Thank your Wise Self for guidance',
          duration: '2 min',
          tips: ['Write a thank you', 'Notice how you feel now', 'Know you can return anytime']
        },
        {
          step: 6,
          instruction: 'Review: Read the dialogue, highlight key insights',
          duration: '3 min'
        }
      ],
      closing: 'Your Wise Self is always available. This is your internal GPS - trust it.'
    },
    integrationPrompts: {
      questions: [
        'What wisdom emerged?',
        'What surprised me?',
        'What action is my Wise Self calling me to take?',
        'How can I stay connected to this wisdom?'
      ],
      reflectionAreas: ['Inner wisdom', 'Guidance received', 'Trust in self', 'Next steps']
    },
    rotationTags: ['wisdom-development', 'life-upgrade', 'all-retreats']
  },

  // 6-STEP UPGRADE ACTIVITIES
  {
    id: 'belief_inventory_mapping',
    title: 'Belief Inventory & Mapping',
    category: 'reflection',
    duration: '45 min',
    difficulty: 'intermediate',
    framework: ['6-Step Upgrade', 'Belief System Upgrade', 'CBT'],
    materials: ['Large paper or poster board', 'Colored markers', 'Journal'],
    evidenceBase: 'Identifying and challenging core beliefs is foundational to CBT and has strong evidence for treating depression and anxiety (Beck, 2011)',
    traumaConsiderations: [
      'Some beliefs are protective - honor them',
      'Beliefs formed from trauma are valid',
      'No forcing change - awareness first',
      'Proceed gently with shame-based beliefs'
    ],
    contraindications: ['Active crisis', 'Severe dissociation'],
    modifications: [
      'Work with one belief at a time',
      'Use supportive friend/therapist',
      'Visual mapping vs. writing',
      'Voice recording instead of writing'
    ],
    facilitationGuide: {
      setup: 'Create comfortable space with supplies spread out. This is exploratory, not judgmental.',
      steps: [
        {
          step: 1,
          instruction: 'Core Areas: Draw four circles labeled: Self, Relationships, Success, Worthiness',
          duration: '5 min'
        },
        {
          step: 2,
          instruction: 'Belief Collection: In each circle, write beliefs you hold about that area',
          duration: '15 min',
          tips: [
            'Self: "I am...", "I can\'t...", "I always..."',
            'Relationships: "People always...", "I\'m too much...", "Nobody..."',
            'Success: "I\'ll never...", "I don\'t deserve...", "It\'s too hard..."',
            'Worthiness: "I\'m not enough...", "I need to earn...", "I should..."',
            'Write everything that comes up, no filtering'
          ]
        },
        {
          step: 3,
          instruction: 'Origin Exploration: For each belief, note where you learned it',
          duration: '10 min',
          tips: [
            'Family?',
            'Culture?',
            'Specific event?',
            'Media?',
            'Sometimes origins are unclear - that\'s okay'
          ]
        },
        {
          step: 4,
          instruction: 'Impact Assessment: Note how each belief affects your life',
          duration: '10 min',
          tips: [
            'What opportunities have I missed?',
            'What relationships have I avoided?',
            'What dreams have I not pursued?',
            'How has this belief shaped my choices?'
          ]
        },
        {
          step: 5,
          instruction: 'Readiness Rating: Circle beliefs you\'re ready to work with (1-3 to start)',
          duration: '5 min',
          tips: [
            'Start with beliefs that feel "medium" intensity',
            'Not too easy, not too hard',
            'You\'ll come back to others later'
          ]
        }
      ],
      closing: 'This map is your starting point. You\'ve taken the brave first step of awareness. Keep this map - you\'ll update it as you grow.'
    },
    integrationPrompts: {
      questions: [
        'What belief patterns did I discover?',
        'Which beliefs am I ready to challenge?',
        'What would be possible without these beliefs?',
        'What support do I need to do this work?'
      ],
      reflectionAreas: ['Belief patterns', 'Origins', 'Life impact', 'Readiness for change']
    },
    rotationTags: ['life-upgrade', 'anxiety', 'depression', 'self-esteem']
  },

  // SOMATIC & BODY WISDOM ACTIVITIES
  {
    id: 'body_wisdom_scan',
    title: 'Body Wisdom Scanning',
    category: 'somatic',
    duration: '20 min',
    difficulty: 'beginner',
    framework: ['Somatic Experiencing', 'The Method', 'Wisdom Development'],
    materials: ['Comfortable lying surface', 'Blanket', 'Eye covering (optional)'],
    evidenceBase: 'Body scanning increases interoceptive awareness and has been shown to reduce pain, anxiety, and improve emotional regulation (Kabat-Zinn, 2003)',
    traumaConsiderations: [
      'Body awareness can trigger trauma memories',
      'Always allow eyes open option',
      'Emphasize choice to skip areas',
      'Provide grounding before and after'
    ],
    contraindications: ['Acute body-focused trauma', 'Severe dissociation'],
    modifications: [
      'Seated instead of lying',
      'External focus (room) before internal',
      'Shorter scan',
      'Just hands and feet'
    ],
    facilitationGuide: {
      setup: 'Lie down comfortably, covered with blanket if desired. Allow body to be supported by surface beneath you.',
      steps: [
        {
          step: 1,
          instruction: 'Arrival: Notice where your body contacts the surface',
          duration: '2 min',
          tips: ['Feel support beneath you', 'You are safe', 'Body is your ally']
        },
        {
          step: 2,
          instruction: 'Feet: Bring awareness to your feet',
          duration: '2 min',
          tips: [
            'Notice any sensation - tingling, warmth, coolness, nothing',
            'No right or wrong',
            'Ask "What are my feet telling me?"'
          ]
        },
        {
          step: 3,
          instruction: 'Legs & Hips: Scan slowly up legs',
          duration: '3 min',
          tips: ['Notice tension or ease', 'Breathe into any tight areas', 'Listen to what your body knows']
        },
        {
          step: 4,
          instruction: 'Belly & Chest: Scan core body',
          duration: '4 min',
          tips: [
            'Belly holds emotions - what\'s there?',
            'Chest holds heart knowing - what does it say?',
            'Breathe gently',
            'Body never lies'
          ]
        },
        {
          step: 5,
          instruction: 'Arms & Hands: Notice arms and hands',
          duration: '2 min',
          tips: ['Hands hold action wisdom', 'What do they want to create?']
        },
        {
          step: 6,
          instruction: 'Neck & Head: Scan throat, jaw, head',
          duration: '3 min',
          tips: [
            'Throat holds expression - what wants to be said?',
            'Jaw holds tension - breathe and soften',
            'Head holds thoughts - notice without engaging'
          ]
        },
        {
          step: 7,
          instruction: 'Whole Body: Sense entire body at once',
          duration: '2 min',
          tips: ['What is your body\'s overall message?', 'What does it need?']
        },
        {
          step: 8,
          instruction: 'Return: Slowly wiggle fingers and toes, open eyes',
          duration: '2 min',
          tips: ['Thank your body for its wisdom']
        }
      ],
      closing: 'Your body is wise. Listen to it daily. It will guide you true.'
    },
    integrationPrompts: {
      questions: [
        'What did my body tell me?',
        'Where am I holding tension or emotion?',
        'What does my body need from me?',
        'What body wisdom surprised me?'
      ],
      reflectionAreas: ['Body messages', 'Tension patterns', 'Emotional holding', 'Body needs']
    },
    rotationTags: ['all-retreats', 'trauma', 'anxiety', 'stress', 'wisdom-development']
  },

  // NATURE CONNECTION ACTIVITIES
  {
    id: 'earth_wisdom_practice',
    title: 'Earth Wisdom & Grounding Practice',
    category: 'nature',
    duration: '30 min',
    difficulty: 'beginner',
    framework: ['Nature Therapy', 'Grounding', 'Wisdom Development'],
    materials: ['Access to earth/grass/nature (or indoor plants)', 'Barefoot if possible'],
    evidenceBase: 'Earthing (physical contact with earth) has been shown to reduce inflammation, improve sleep, and reduce stress hormones (Chevalier et al., 2012)',
    traumaConsiderations: [
      'Nature can feel vulnerable for some',
      'Allow indoor alternatives',
      'Respect fear of outdoor spaces',
      'Start small and build'
    ],
    contraindications: ['Severe agoraphobia without support'],
    modifications: [
      'Indoor with houseplants',
      'Hands in soil instead of feet on earth',
      'Window view of nature',
      'Virtual nature if needed'
    ],
    facilitationGuide: {
      setup: 'Find patch of earth, grass, sand, or access to plants. Remove shoes if safe and comfortable.',
      steps: [
        {
          step: 1,
          instruction: 'Physical Connection: Place bare feet on earth or hands in soil',
          duration: '5 min',
          tips: [
            'Feel texture beneath you',
            'Notice temperature',
            'Allow yourself to receive',
            'Earth is always giving'
          ]
        },
        {
          step: 2,
          instruction: 'Energy Exchange: Imagine roots growing from feet into earth',
          duration: '5 min',
          tips: [
            'Send anything you need to release down into earth',
            'Earth transforms everything',
            'Receive earth\'s stability and strength',
            'You are of the earth'
          ]
        },
        {
          step: 3,
          instruction: 'Observation: Notice natural world around you',
          duration: '5 min',
          tips: [
            'What\'s growing?',
            'What\'s changing?',
            'What\'s in cycle?',
            'You\'re part of these same cycles'
          ]
        },
        {
          step: 4,
          instruction: 'Wisdom Reception: Ask earth "What do I need to know?"',
          duration: '10 min',
          tips: [
            'Earth teaches patience',
            'Earth teaches seasons',
            'Earth teaches that everything has its time',
            'Listen to what nature shows you'
          ]
        },
        {
          step: 5,
          instruction: 'Gratitude: Thank earth for support and wisdom',
          duration: '3 min',
          tips: ['Maybe leave an offering', 'Maybe just say thank you', 'Know you can return anytime']
        },
        {
          step: 6,
          instruction: 'Integration: Carry earth wisdom back with you',
          duration: '2 min',
          tips: ['Feel how you\'re different', 'You are grounded now']
        }
      ],
      closing: 'The earth is always here, always supporting. You are never separate from nature - you ARE nature.'
    },
    integrationPrompts: {
      questions: [
        'What wisdom did earth share with me?',
        'How do I feel different after connecting with nature?',
        'What natural cycle am I in?',
        'How can I stay connected to earth wisdom?'
      ],
      reflectionAreas: ['Earth connection', 'Natural wisdom', 'Grounding', 'Life cycles']
    },
    rotationTags: ['all-retreats', 'stress', 'anxiety', 'wisdom-development', 'grounding']
  },

  // CREATIVE EXPRESSION ACTIVITIES
  {
    id: 'soul_art_expression',
    title: 'Soul Art: Painting Your Inner Landscape',
    category: 'creative',
    duration: '45 min',
    difficulty: 'beginner',
    framework: ['Art Therapy', 'Expressive Arts', 'Wisdom Development'],
    materials: ['Paper or canvas', 'Paint, markers, or crayons', 'No artistic skill needed'],
    evidenceBase: 'Art therapy facilitates expression of emotions that are difficult to verbalize and reduces cortisol levels (Kaimal et al., 2016)',
    traumaConsiderations: [
      'Art can surface difficult material',
      'No pressure for "good" art',
      'Process over product',
      'Allow stopping at any time'
    ],
    contraindications: ['None - highly adaptable'],
    modifications: [
      'Collage from magazines',
      'Digital art',
      'Clay or sculpture',
      'Movement as art'
    ],
    facilitationGuide: {
      setup: 'Lay out materials. Put on gentle music if helpful. This is about expression, not perfection.',
      steps: [
        {
          step: 1,
          instruction: 'Center: Close eyes, hand on heart, ask "What wants to be expressed?"',
          duration: '3 min',
          tips: ['Don\'t think, just sense', 'Maybe it\'s a color, shape, feeling', 'Trust what comes']
        },
        {
          step: 2,
          instruction: 'Color Selection: Choose colors that call to you',
          duration: '2 min',
          tips: ['Don\'t think about it', 'Let your hand choose', 'All colors are welcome']
        },
        {
          step: 3,
          instruction: 'First Marks: Begin with no plan, just respond to impulse',
          duration: '5 min',
          tips: [
            'Let your hand move',
            'Don\'t try to make anything',
            'This is energy expression',
            'There are no mistakes'
          ]
        },
        {
          step: 4,
          instruction: 'Deepening: Continue, letting the art guide you',
          duration: '20 min',
          tips: [
            'Add layers',
            'Cover things up',
            'Change directions',
            'Let it evolve',
            'Your inner world is being revealed'
          ]
        },
        {
          step: 5,
          instruction: 'Completion: Know when you\'re done',
          duration: '5 min',
          tips: ['Trust the knowing', 'Don\'t over-work it', 'Step back and look']
        },
        {
          step: 6,
          instruction: 'Reflection: Journal about the experience and what emerged',
          duration: '10 min',
          tips: [
            'What did I express?',
            'What surprised me?',
            'What does this art tell me?',
            'Don\'t interpret too much - just notice'
          ]
        }
      ],
      closing: 'Your soul just spoke through color and form. This is your truth, made visible.'
    },
    integrationPrompts: {
      questions: [
        'What was I expressing?',
        'What emotions came up while creating?',
        'What does this art tell me about my inner state?',
        'What wants to shift?'
      ],
      reflectionAreas: ['Inner landscape', 'Emotional expression', 'Unconscious material', 'Creative flow']
    },
    rotationTags: ['all-retreats', 'grief', 'trauma', 'depression', 'wisdom-development']
  }

  // ... Continue with 43 more activities covering:
  // - More EFT variations (for courage, for grief, for anger, etc.)
  // - Complete The Method series (Ask, Listen, Trust practices)
  // - Boundary setting practices
  // - Self-compassion exercises
  // - Breathwork variations
  // - Movement practices
  // - Nutrition wisdom
  // - Sleep hygiene
  // - Relationship practices
  // - Goal setting aligned with wisdom
  // - Values clarification
  // - Life purpose exploration
  // - Habit formation
  // - Resilience building
  // - Joy practices
  // - Gratitude variations
  // - Forgiveness work
  // - Shadow integration
  // - Parts work
  // - Future self connection
  // And more...
];

// Helper function to get activities by category
export const getActivitiesByCategory = (category: ActivityGuide['category']) => {
  return activityLibrary.filter(activity => activity.category === category);
};

// Helper function to get activities by framework
export const getActivitiesByFramework = (framework: string) => {
  return activityLibrary.filter(activity => activity.framework.includes(framework));
};

// Helper function to get activities by difficulty
export const getActivitiesByDifficulty = (difficulty: ActivityGuide['difficulty']) => {
  return activityLibrary.filter(activity => activity.difficulty === difficulty);
};

// Helper function to get activities suitable for specific retreats
export const getActivitiesByRetreatTag = (tag: string) => {
  return activityLibrary.filter(activity => activity.rotationTags.includes(tag));
};

// Helper function to get random activity from category
export const getRandomActivity = (category?: ActivityGuide['category']) => {
  const filtered = category ? getActivitiesByCategory(category) : activityLibrary;
  return filtered[Math.floor(Math.random() * filtered.length)];
};
