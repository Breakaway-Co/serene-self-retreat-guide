import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ActivityGuideRequest {
  guideId: string;
  guideName?: string;
  activityType?: string;
  instructions?: string[];
  customizations?: {
    intensity?: 'gentle' | 'moderate' | 'intensive';
    duration?: 'short' | 'medium' | 'long';
    focus?: string;
  };
}

// Activity guides with step-by-step instructions - mapped from ActivityGuides.tsx
const activityGuides: Record<string, any> = {
  // Life Upgrade Retreat Guides
  "welcome_grounding": {
    name: "Welcome & Grounding Ritual",
    type: "mindfulness",
    steps: [
      "Find a comfortable seated position. Close your eyes or soften your gaze.",
      "Take three deep breaths, exhaling with a gentle sigh.",
      "Scan your body from head to toe, noticing without changing anything.",
      "Place your hands on your heart and belly. Feel the warmth.",
      "Set an intention: 'I am here for my healing and growth.'",
      "Return to natural breathing and gently open your eyes."
    ],
    timings: ["1 min", "1 min", "5 min", "3 min", "2 min", "1 min"],
    tips: [
      "Notice where your body contacts the chair or floor",
      "The sigh activates the vagus nerve for relaxation",
      "Just observe - no need to relax or fix anything",
      "This self-touch activates self-compassion circuits",
      "This is your intention for the journey",
      "Welcome back to the present moment"
    ]
  },
  "life_upgrade_intro": {
    name: "Introduction to Life Upgrade Process",
    type: "therapy",
    steps: [
      "Read or listen to overview of the 6-step process",
      "Step 1 - Awareness: Notice limiting beliefs without judgment",
      "Step 2 - Acceptance: Meet yourself with compassion where you are",
      "Step 3 - Release: Let go of beliefs that no longer serve you",
      "Step 4 - Choose: Select new, empowering beliefs",
      "Step 5 - Integrate: Practice and embody new beliefs",
      "Step 6 - Embody: Live from your new truth",
      "Reflect on which step feels most relevant today"
    ],
    timings: ["10 min", "3 min", "3 min", "3 min", "3 min", "3 min", "3 min", "2 min"],
    tips: [
      "This is your roadmap for transformation",
      "Just observing creates distance from beliefs",
      "Acceptance doesn't mean giving up - it means starting truthfully",
      "Release is a gentle letting go",
      "Choose beliefs that serve your highest good",
      "Integration takes practice and patience",
      "Embodiment is living your truth",
      "There's no wrong answer - trust yourself"
    ]
  },
  "belief_inventory": {
    name: "Belief Inventory Journal",
    type: "reflection",
    steps: [
      "Set up your journal with four categories: Self, Relationships, Success, Worthiness",
      "For each category, write: 'I believe...' and complete the sentence 5 times",
      "Circle the beliefs that feel most charged or powerful",
      "For each circled belief, ask: Where did this come from?",
      "Ask: How has this belief served me? How has it limited me?"
    ],
    timings: ["2 min", "15 min", "3 min", "5 min", "5 min"],
    tips: [
      "Set up your framework",
      "Write quickly without censoring",
      "Notice emotional charge",
      "Understand the origin",
      "Beliefs often have both protective and limiting aspects"
    ]
  },
  "step1_awareness": {
    name: "Step 1: Awareness Practice",
    type: "therapy",
    steps: [
      "Sit comfortably with your journal",
      "Think of a recent challenging situation",
      "What thoughts arose? What beliefs were underneath?",
      "Notice how these beliefs felt in your body",
      "Practice saying: 'I'm having the thought that...' before each belief",
      "Write: 'This belief is a pattern, not the truth about who I am'"
    ],
    timings: ["1 min", "3 min", "10 min", "5 min", "5 min", "3 min"],
    tips: [
      "Get comfortable",
      "Choose something mildly difficult, not overwhelming",
      "Example: 'I made a mistake' → belief: 'I'm not good enough'",
      "Tune into physical sensations",
      "This creates psychological distance",
      "Affirm the truth - beliefs are patterns, not identity"
    ]
  },
  "eft_basics": {
    name: "EFT Tapping Introduction",
    type: "healing",
    steps: [
      "Learn the 8 tapping points: top of head, eyebrow, side of eye, under eye, under nose, chin, collarbone, under arm",
      "Rate your stress level 0-10",
      "Setup statement: Tap karate chop point while saying 'Even though [problem], I deeply and completely accept myself' (3x)",
      "Tap each point 5-7 times while repeating a reminder phrase about the problem",
      "Take a deep breath and rate your stress again 0-10",
      "Repeat rounds until stress reduces to 3 or below"
    ],
    timings: ["5 min", "1 min", "2 min", "7 min", "2 min", "10 min"],
    tips: [
      "Learn the points systematically",
      "Establish baseline",
      "Example: 'This anxiety' or 'This belief'",
      "Tap gently and consistently",
      "Notice the shift",
      "Stop if emotions escalate beyond your window of tolerance"
    ]
  },
  "self_compassion_meditation": {
    name: "Self-Compassion Meditation",
    type: "mindfulness",
    steps: [
      "Sit comfortably and place your hands on your heart",
      "Think of yourself struggling with something",
      "Say silently: 'This is a moment of suffering'",
      "Say: 'Suffering is a part of life' or 'Others feel this too'",
      "Say: 'May I be kind to myself' and 'May I give myself the compassion I need'",
      "Breathe naturally, hands on heart, for several minutes",
      "Imagine sending yourself loving energy with each breath"
    ],
    timings: ["1 min", "2 min", "1 min", "2 min", "3 min", "5 min", "3 min"],
    tips: [
      "Feel the warmth and gentle pressure",
      "Start with something mild, not your deepest wound",
      "Mindfulness: acknowledging the difficulty",
      "Common humanity: you're not alone",
      "Self-kindness: offering yourself care",
      "Let compassion flow",
      "Send loving energy to yourself"
    ]
  },

  // Wisdom Development Retreat Guides  
  "arrival_meditation": {
    name: "Arrival & Centering Meditation",
    type: "mindfulness",
    steps: [
      "Find a comfortable seated position with spine gently upright",
      "Close your eyes or lower your gaze softly",
      "Take three intentional breaths, exhaling fully",
      "Allow your breath to return to its natural rhythm",
      "Notice sensations in your body without changing them",
      "When thoughts arise, gently return to the breath",
      "Slowly deepen your breath and gently open your eyes"
    ],
    timings: ["1 min", "30 sec", "1 min", "2 min", "5 min", "8 min", "1 min"],
    tips: [
      "Align your posture gently",
      "Choose what feels safest",
      "Exhale completely to release",
      "Let go of breath control",
      "Just observe - feet on floor, seat on chair, breath moving",
      "This is the practice - returning, not perfect stillness",
      "Transition gently back"
    ]
  },
  "the_method_intro": {
    name: "Introduction to The Method",
    type: "therapy",
    steps: [
      "Read overview: The Method helps you access your inner wisdom in six steps",
      "PAUSE: Learn to create space before reacting",
      "NOTICE: Develop neutral observation of thoughts, feelings, sensations",
      "FEEL: Drop into body sensations and emotional awareness",
      "ASK: Pose clear questions to your inner wisdom",
      "LISTEN: Receive answers without forcing or editing",
      "TRUST: Act on your inner knowing"
    ],
    timings: ["3 min", "5 min", "5 min", "5 min", "5 min", "5 min", "5 min"],
    tips: [
      "Understand the framework",
      "Even a micro-pause changes outcomes",
      "Observe without judgment",
      "Wisdom speaks through the body",
      "Ask clear, open questions",
      "First thought is often wisest",
      "Trust builds over time"
    ]
  },
  "body_wisdom_scan": {
    name: "Body Wisdom Scanning",
    type: "somatic",
    steps: [
      "Lie down or sit comfortably",
      "Scan head: notice any sensations without judgment",
      "Scan throat and chest: notice communication and heart sensations",
      "Scan belly/gut: notice your 'gut feelings'",
      "Ask your body: 'What are you trying to tell me?'",
      "Listen without forcing - notice any images, words, or knowings that arise",
      "Thank your body for its wisdom"
    ],
    timings: ["1 min", "2 min", "3 min", "3 min", "4 min", "5 min", "1 min"],
    tips: [
      "Get comfortable",
      "Tingling, warmth, coolness, tightness, ease",
      "These areas hold emotional wisdom",
      "The gut has more neurons than the spinal cord",
      "Ask with genuine curiosity",
      "Receive without judgment",
      "Express gratitude"
    ]
  },
  "method_pause": {
    name: "The Method Practice: Pause",
    type: "mindfulness",
    steps: [
      "Think of a situation where you typically react quickly",
      "Visualize that situation arising again",
      "Practice pausing: Take one full breath before responding",
      "In the pause, notice: What am I feeling? What do I need?",
      "Repeat with different scenarios",
      "Set intention: 'I will practice pausing today'"
    ],
    timings: ["2 min", "2 min", "5 min", "5 min", "10 min", "2 min"],
    tips: [
      "Choose a specific situation",
      "Make it vivid",
      "Count: 1...2...3...4 in, 1...2...3...4 out",
      "Pause creates choice",
      "Practice makes progress",
      "Set your intention"
    ]
  },

  // Generic/Shared Guides
  "gentle-wake-up-breathing": {
    name: "Clinical Breathwork Protocol",
    type: "somatic",
    steps: [
      "Remain lying down in bed. Place one hand on your chest, one on your belly.",
      "Without forcing anything, take a natural breath in through your nose for 4 seconds.",
      "Pause naturally at the top of your breath for 1-2 seconds.",
      "Exhale slowly through your mouth with a gentle 'ahh' sound for 6 seconds.",
      "Repeat this pattern 5-10 times, noticing how your body feels.",
      "End by taking three normal breaths and gently wiggling your fingers and toes."
    ],
    timings: ["30 seconds", "4 seconds", "1-2 seconds", "6 seconds", "3-6 minutes", "30 seconds"],
    tips: [
      "Notice which hand moves more naturally - there's no wrong way",
      "If nose breathing feels restricted, mouth breathing is perfectly fine",
      "Don't hold your breath forcefully - just a gentle pause",
      "The sound helps release tension and signals safety to your nervous system",
      "Stop if you feel dizzy or uncomfortable - your comfort is the priority",
      "This helps you reconnect with your body before getting up"
    ]
  },
  "emotion-regulation-techniques": {
    name: "Clinical Emotion Regulation Protocol",
    type: "therapy",
    steps: [
      "Name the emotion you're feeling right now without judgment.",
      "Rate the intensity of this emotion on a scale of 1-10.",
      "Locate where you feel this emotion in your body.",
      "Practice the TIPP technique: Temperature with cold water, Intense exercise for 30 seconds, Paced breathing, or Paired muscle relaxation.",
      "Use opposite action: If angry, be gentle. If sad, do something active. If anxious, approach rather than avoid.",
      "Practice self-validation: 'This emotion makes sense given my situation.'",
      "Rate your emotion intensity again and notice any changes."
    ],
    timings: ["2 minutes", "1 minute", "2 minutes", "5 minutes", "5 minutes", "2 minutes", "1 minute"],
    tips: [
      "Use emotion words like 'angry,' 'sad,' 'anxious' rather than 'bad' or 'upset'",
      "This helps create distance between you and the emotion",
      "Notice tension, heat, cold, heaviness, or other physical sensations",
      "Choose one TIPP technique that feels most accessible right now",
      "This works by changing your body chemistry and breaking emotion-behavior cycles",
      "Validation reduces the intensity of emotions without changing the situation",
      "Even small decreases are meaningful progress"
    ]
  },
  "trauma-informed-body-scan": {
    name: "Trauma-Informed Body Scan",
    type: "healing",
    steps: [
      "Find a comfortable position where you feel safe - sitting, lying down, or standing.",
      "Take three gentle breaths and remind yourself: 'I am in control. I can stop or modify this practice anytime.'",
      "Starting with your feet, gently notice any sensations without trying to change them.",
      "If you notice tension or discomfort, breathe into that area or simply acknowledge it.",
      "Move your attention slowly up through your legs, noticing what feels comfortable to notice.",
      "Continue through your torso, arms, and finally your head and face.",
      "If you feel overwhelmed at any point, open your eyes and focus on something in the room.",
      "End by placing your hands on your heart and thanking your body for its strength."
    ],
    timings: ["1 minute", "1 minute", "2 minutes", "1 minute", "3 minutes", "3 minutes", "as needed", "1 minute"],
    tips: [
      "You're always in charge of this practice",
      "This practice builds awareness safely and at your own pace",
      "Some areas might feel numb or disconnected - that's perfectly normal",
      "Focus on sensations that feel neutral or pleasant",
      "This is your choice and shows self-care",
      "There's no wrong way to do this scan",
      "This grounding technique helps you return to safety",
      "Your body has carried you through so much"
    ]
  },
  "grounding-exercises-outdoors": {
    name: "Grounding Exercises Outdoors",
    type: "nature",
    steps: [
      "Find a safe outdoor space - yard, park, balcony, or even by an open window.",
      "Stand or sit comfortably and take three natural breaths of fresh air.",
      "Use the 5-4-3-2-1 technique: Notice 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste.",
      "Find something in nature to focus on - a tree, cloud, flower, or patch of grass.",
      "If possible, make physical contact with nature - touch a tree, hold a leaf, or feel the ground.",
      "Practice 'nature breathing' - breathe in for 4 counts, hold for 4, exhale for 6.",
      "Set an intention to carry this peaceful feeling with you as you go inside."
    ],
    timings: ["2 minutes", "1 minute", "5 minutes", "3 minutes", "2 minutes", "5 minutes", "2 minutes"],
    tips: [
      "Any access to nature counts, even urban green spaces",
      "Notice how outdoor air feels different from indoor air",
      "Focus on natural elements - birds, wind, sunlight, earth smells",
      "Let your eyes rest on this natural object without trying to analyze it",
      "This creates a literal grounding connection with the earth",
      "Imagine breathing in the life energy of plants around you",
      "This helps maintain the benefits of nature connection throughout your day"
    ]
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { guideId, guideName, activityType, instructions, customizations }: ActivityGuideRequest = await req.json();

    let guide;
    
    // If instructions are provided directly, use them
    if (instructions && instructions.length > 0) {
      guide = {
        name: guideName || 'Guided Practice',
        type: activityType || 'mindfulness',
        steps: instructions,
        timings: instructions.map(() => "variable"), // Will be calculated by TTS pacing
        tips: []
      };
    } else if (!activityGuides[guideId]) {
      throw new Error(`Activity guide not found: ${guideId}`);
    } else {
      guide = activityGuides[guideId];
    }
    
    // Create master script by combining all steps with natural pacing
    const masterScript = createMasterScript(guide, customizations);

    // Generate a unique session ID
    const sessionId = `${guideId}-${Date.now()}`;

    // Call the audio generation function
    const audioGenResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/generate-audio-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`
      },
      body: JSON.stringify({
        sessionId,
        sessionName: guide.name,
        sessionType: getSessionType(guide.type),
        activityType: guide.type,
        masterScript,
        voiceId: getVoiceForActivityType(guide.type),
        metadata: {
          originalGuideId: guideId,
          customizations,
          stepCount: guide.steps.length,
          totalEstimatedDuration: calculateTotalDuration(guide.timings)
        }
      })
    });

    if (!audioGenResponse.ok) {
      const error = await audioGenResponse.text();
      throw new Error(`Audio generation failed: ${error}`);
    }

    const result = await audioGenResponse.json();

    return new Response(JSON.stringify({
      success: true,
      ...result,
      guideInfo: {
        name: guide.name,
        type: guide.type,
        stepCount: guide.steps.length
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in process-activity-guide:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function createMasterScript(guide: any, customizations?: any): string {
  const intensity = customizations?.intensity || 'moderate';
  const duration = customizations?.duration || 'medium';

  let script = `Welcome to your guided ${guide.name.toLowerCase()} session. `;
  
  if (intensity === 'gentle') {
    script += "This will be a very gentle, slow-paced practice. Take your time and be kind to yourself. ";
  } else if (intensity === 'intensive') {
    script += "This will be a more focused, intensive practice. Stay present and committed to the process. ";
  } else {
    script += "This will be a balanced practice at a comfortable pace. ";
  }

  script += "Find a comfortable position and allow yourself to be fully present for this healing practice. ";

  // Add safety reminder
  script += "Remember, you are always in control. You can modify or stop this practice at any time if you need to. ";

  // Process each step with natural pacing
  guide.steps.forEach((step: string, index: number) => {
    const timing = guide.timings[index];
    const tip = guide.tips[index];

    script += `\n\nStep ${index + 1}: ${step} `;
    
    if (tip) {
      script += `${tip} `;
    }

    // Add pacing based on timing
    if (timing && timing.includes('minutes')) {
      script += "Take your time with this step. There's no rush. ";
      if (duration === 'long') {
        script += "Allow yourself extra time to fully experience this. ";
      }
    } else if (timing && timing.includes('seconds')) {
      script += "Move at a pace that feels right for you. ";
    }

    // Add breathing cues between steps
    if (index < guide.steps.length - 1) {
      script += "Take a moment to breathe naturally before we continue. ";
    }
  });

  // Closing
  script += "\n\nYou've completed this practice beautifully. Take a moment to notice how you feel now compared to when you started. ";
  script += "Notice any changes in your body, your breathing, or your overall sense of wellbeing. ";
  script += "Carry this sense of peace and accomplishment with you as you continue your healing journey. ";
  script += "Remember, every time you practice self-care like this, you're building resilience and nurturing your wellbeing. ";
  script += "Thank you for taking this time for yourself. You deserve this care and attention.";

  return script;
}

function getSessionType(activityType: string): string {
  const typeMap: Record<string, string> = {
    "somatic-intervention": "breathwork",
    "dialectical-behavioral-therapy": "meditation",
    "healing": "body-scan",
    "nature": "meditation",
    "mindfulness": "meditation",
    "creative": "meditation"
  };
  return typeMap[activityType] || "meditation";
}

function getVoiceForActivityType(activityType: string): string {
  const voiceMap: Record<string, string> = {
    "somatic-intervention": "SAz9YHcvj6GT2YYXdXww", // River - calming
    "dialectical-behavioral-therapy": "EXAVITQu4vr4xnSDxMaL", // Sarah - professional
    "healing": "SAz9YHcvj6GT2YYXdXww", // River - soothing
    "nature": "XB0fDUnXU5powFXDhCwa", // Charlotte - natural
    "mindfulness": "pFZP5JQG7iQjIQuC4Bku", // Lily - gentle
    "creative": "cgSgspJ2msm6clMCkdW9" // Jessica - encouraging
  };
  return voiceMap[activityType] || "SAz9YHcvj6GT2YYXdXww";
}

function calculateTotalDuration(timings: string[]): number {
  let totalSeconds = 0;
  timings.forEach(timing => {
    if (timing.includes('minutes')) {
      const minutes = parseInt(timing.match(/(\d+)/)?.[1] || '0');
      totalSeconds += minutes * 60;
    } else if (timing.includes('seconds')) {
      const seconds = parseInt(timing.match(/(\d+)/)?.[1] || '0');
      totalSeconds += seconds;
    }
  });
  return totalSeconds;
}