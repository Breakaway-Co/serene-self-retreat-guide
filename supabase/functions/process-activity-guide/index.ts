import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ActivityGuideRequest {
  guideId: string;
  customizations?: {
    intensity?: 'gentle' | 'moderate' | 'intensive';
    duration?: 'short' | 'medium' | 'long';
    focus?: string;
  };
}

// Activity guides with step-by-step instructions
const activityGuides: Record<string, any> = {
  "gentle-wake-up-breathing": {
    name: "Clinical Breathwork Protocol",
    type: "somatic-intervention",
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
    type: "dialectical-behavioral-therapy",
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

    const { guideId, customizations }: ActivityGuideRequest = await req.json();

    if (!activityGuides[guideId]) {
      throw new Error(`Activity guide not found: ${guideId}`);
    }

    const guide = activityGuides[guideId];
    
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