import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContentPipelineRequest {
  action: 'merge_retreat_session' | 'schedule_session' | 'bulk_process_retreat';
  retreatId?: string;
  activityId?: string;
  customizations?: {
    intensity?: 'gentle' | 'moderate' | 'intensive';
    duration?: 'short' | 'medium' | 'long';
    focus?: string;
    voiceId?: string;
  };
  releaseDate?: string;
}

// Comprehensive retreat configurations with full session scripts
const retreatSessions = {
  'inner_compass': {
    'gentle-wake-up-breathing': {
      name: 'Gentle Morning Awakening',
      type: 'breathwork',
      steps: [
        {
          instruction: "Remain lying down comfortably in your bed. Place one hand gently on your chest and one on your belly.",
          timing: "30 seconds",
          tip: "Notice which hand moves more naturally - there's no wrong way to breathe."
        },
        {
          instruction: "Without forcing anything, take a natural breath in through your nose for 4 seconds.",
          timing: "4 seconds",
          tip: "If nose breathing feels restricted, mouth breathing is perfectly fine."
        },
        {
          instruction: "Pause naturally at the top of your breath for 1-2 seconds.",
          timing: "1-2 seconds", 
          tip: "Don't hold your breath forcefully - just a gentle pause."
        },
        {
          instruction: "Exhale slowly through your mouth with a gentle 'ahh' sound for 6 seconds.",
          timing: "6 seconds",
          tip: "The sound helps release tension and signals safety to your nervous system."
        },
        {
          instruction: "Repeat this breathing pattern 5-10 times, noticing how your body feels with each breath.",
          timing: "3-6 minutes",
          tip: "Stop if you feel dizzy or uncomfortable - your comfort is the priority."
        },
        {
          instruction: "End by taking three normal breaths and gently wiggling your fingers and toes before getting up.",
          timing: "30 seconds",
          tip: "This helps you reconnect with your body before starting your day."
        }
      ]
    },
    'stress-release-body-scan': {
      name: 'Stress Release Body Scan',
      type: 'healing',
      steps: [
        {
          instruction: "Find a comfortable position where you feel safe - sitting, lying down, or standing.",
          timing: "1 minute",
          tip: "You're always in charge of this practice."
        },
        {
          instruction: "Take three gentle breaths and remind yourself: 'I am in control. I can stop or modify this practice anytime.'",
          timing: "1 minute",
          tip: "This practice builds awareness safely and at your own pace."
        },
        {
          instruction: "Starting with your feet, gently notice any sensations without trying to change them.",
          timing: "2 minutes",
          tip: "Some areas might feel numb or disconnected - that's perfectly normal."
        },
        {
          instruction: "If you notice tension or discomfort, breathe into that area or simply acknowledge it.",
          timing: "1 minute",
          tip: "Focus on sensations that feel neutral or pleasant."
        },
        {
          instruction: "Slowly move your attention up through your legs, noticing what feels comfortable to notice.",
          timing: "3 minutes",
          tip: "This is your choice and shows self-care."
        },
        {
          instruction: "Continue through your torso, arms, and finally your head and face, going at your own pace.",
          timing: "3 minutes",
          tip: "There's no wrong way to do this scan."
        },
        {
          instruction: "If you feel overwhelmed at any point, open your eyes and focus on something in the room.",
          timing: "as needed",
          tip: "This grounding technique helps you return to safety."
        },
        {
          instruction: "End by placing your hands on your heart and thanking your body for its strength.",
          timing: "1 minute",
          tip: "Your body has carried you through so much."
        }
      ]
    },
    'boundary-setting-practice': {
      name: 'Healthy Boundary Setting',
      type: 'therapy',
      steps: [
        {
          instruction: "Take a moment to think about an area of your life where you feel your boundaries are being crossed.",
          timing: "2 minutes",
          tip: "Start with a smaller, less intense situation to practice with."
        },
        {
          instruction: "Notice what feelings come up when you think about this situation - anger, frustration, exhaustion, or resentment.",
          timing: "2 minutes", 
          tip: "These feelings are valid information about your needs."
        },
        {
          instruction: "Practice saying 'no' out loud in different tones - firm but kind, clear and direct.",
          timing: "3 minutes",
          tip: "You have the right to say no without extensive justification."
        },
        {
          instruction: "Imagine yourself setting this boundary calmly and confidently.",
          timing: "5 minutes",
          tip: "Boundaries protect your energy and well-being."
        },
        {
          instruction: "Think of one small boundary you can implement today.",
          timing: "3 minutes",
          tip: "Start small - every boundary you set strengthens your ability to set more."
        }
      ]
    }
  },
  'still_waters': {
    'safe-grounding-practice': {
      name: 'Safe Grounding for Difficult Days',
      type: 'healing',
      steps: [
        {
          instruction: "Notice that you're safe in this moment. Look around and name three things you can see.",
          timing: "2 minutes",
          tip: "Grounding helps bring you back to the present moment."
        },
        {
          instruction: "Take slow, gentle breaths. If deep breathing feels hard, just breathe normally.",
          timing: "2 minutes",
          tip: "On difficult days, normal breathing is perfectly enough."
        },
        {
          instruction: "Feel your body supported by the chair, bed, or floor beneath you.",
          timing: "2 minutes",
          tip: "You are physically supported right now."
        },
        {
          instruction: "If comfortable, place one hand on your heart and one on your belly.",
          timing: "3 minutes",
          tip: "This gentle touch can be very soothing."
        },
        {
          instruction: "Remind yourself: 'This feeling will pass. I have survived difficult moments before.'",
          timing: "2 minutes",
          tip: "You are stronger than you know."
        },
        {
          instruction: "End by acknowledging that you showed up for yourself today, which takes courage.",
          timing: "2 minutes",
          tip: "Every small step counts, especially on hard days."
        }
      ]
    }
  },
  'reset_path': {
    'trigger-mapping': {
      name: 'Understanding Your Triggers',
      type: 'therapy',
      steps: [
        {
          instruction: "Think about a recent time when you felt triggered to use or engage in your addictive behavior.",
          timing: "3 minutes",
          tip: "Approach this with curiosity, not judgment."
        },
        {
          instruction: "Notice what was happening right before the trigger - were you tired, stressed, lonely, or in a specific place?",
          timing: "3 minutes",
          tip: "Triggers often have patterns we can learn to recognize."
        },
        {
          instruction: "Identify the emotion you were feeling - anger, sadness, anxiety, boredom, or something else.",
          timing: "3 minutes",
          tip: "Emotions are information about our needs."
        },
        {
          instruction: "Think about what you really needed in that moment - rest, connection, comfort, or validation.",
          timing: "4 minutes",
          tip: "Behind every trigger is an unmet need."
        },
        {
          instruction: "Brainstorm three healthy ways you could meet that need next time.",
          timing: "5 minutes",
          tip: "Having alternatives ready makes it easier to make different choices."
        },
        {
          instruction: "Practice self-compassion - recovery is a journey, and understanding triggers is important progress.",
          timing: "2 minutes",
          tip: "Be patient and kind with yourself as you learn."
        }
      ]
    },
    'craving-surf': {
      name: 'Surfing Through Cravings',
      type: 'healing',
      steps: [
        {
          instruction: "When you notice a craving arising, don't try to fight it or make it go away.",
          timing: "1 minute",
          tip: "Cravings are temporary waves that will naturally subside."
        },
        {
          instruction: "Imagine the craving as a wave in the ocean - it builds up, peaks, and then naturally crashes.",
          timing: "2 minutes",
          tip: "You are surfing this wave, not being consumed by it."
        },
        {
          instruction: "Notice where you feel the craving in your body - tension, heat, restlessness, or tightness.",
          timing: "2 minutes",
          tip: "Physical sensations give us information about our internal experience."
        },
        {
          instruction: "Breathe with the sensation rather than against it, like riding the wave.",
          timing: "3 minutes",
          tip: "Your breath can be your surfboard - keeping you balanced."
        },
        {
          instruction: "Notice how the intensity changes moment by moment - sometimes stronger, sometimes weaker.",
          timing: "4 minutes",
          tip: "Cravings are not constant - they fluctuate and will pass."
        },
        {
          instruction: "Ride the wave until it naturally subsides, knowing you've built strength and resilience.",
          timing: "3 minutes",
          tip: "Each time you surf a craving, you're proving to yourself that you can handle difficult feelings."
        }
      ]
    }
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

    const body: ContentPipelineRequest = await req.json();
    console.log('Content pipeline request:', body);

    switch (body.action) {
      case 'merge_retreat_session':
        return await mergeRetreatSession(supabase, body);
      case 'schedule_session':
        return await scheduleSession(supabase, body);
      case 'bulk_process_retreat':
        return await bulkProcessRetreat(supabase, body);
      default:
        throw new Error('Invalid action');
    }

  } catch (error) {
    console.error('Error in seamless-content-pipeline:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function mergeRetreatSession(supabase: any, request: ContentPipelineRequest) {
  const { retreatId, activityId, customizations } = request;
  
  if (!retreatId || !activityId) {
    throw new Error('Missing retreatId or activityId');
  }

  console.log(`Merging session: ${retreatId}/${activityId}`);

  const sessionConfig = retreatSessions[retreatId]?.[activityId];
  if (!sessionConfig) {
    throw new Error(`Session not found: ${retreatId}/${activityId}`);
  }

  const masterScript = createSeamlessMasterScript(sessionConfig, customizations);
  
  const sessionId = `${retreatId}-${activityId}-${Date.now()}`;
  const sessionName = sessionConfig.name;

  // Add to generation queue
  const queueResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/seamless-audio-processor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`
    },
    body: JSON.stringify({
      action: 'add_to_queue',
      sessionId,
      sessionName,
      sessionType: sessionConfig.type,
      activityType: sessionConfig.type,
      masterScript,
      voiceId: customizations?.voiceId || getOptimalVoiceForSession(sessionConfig),
      metadata: {
        retreatId,
        activityId,
        customizations,
        stepCount: sessionConfig.steps.length,
        totalEstimatedDuration: calculateSessionDuration(sessionConfig.steps),
        seamlessGeneration: true
      },
      priority: 10,
      tags: ['seamless', retreatId, sessionConfig.type]
    })
  });

  if (!queueResponse.ok) {
    throw new Error('Failed to add session to generation queue');
  }

  const queueResult = await queueResponse.json();

  return new Response(JSON.stringify({
    success: true,
    sessionId,
    sessionName,
    queueId: queueResult.queueId,
    masterScript,
    metadata: {
      retreatId,
      activityId,
      stepCount: sessionConfig.steps.length,
      estimatedDuration: calculateSessionDuration(sessionConfig.steps)
    }
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function scheduleSession(supabase: any, request: ContentPipelineRequest) {
  const { retreatId, activityId, releaseDate } = request;
  
  if (!retreatId || !activityId || !releaseDate) {
    throw new Error('Missing required fields for scheduling');
  }

  const sessionConfig = retreatSessions[retreatId]?.[activityId];
  if (!sessionConfig) {
    throw new Error(`Session not found: ${retreatId}/${activityId}`);
  }

  // Add to pregeneration schedule
  const { data, error } = await supabase
    .from('session_pregeneration_schedule')
    .insert({
      retreat_id: retreatId,
      activity_id: activityId,
      session_name: sessionConfig.name,
      scheduled_release_date: new Date(releaseDate),
      pregenerate_hours_before: 24
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to schedule session: ${error.message}`);
  }

  return new Response(JSON.stringify({
    success: true,
    scheduleId: data.id,
    sessionName: sessionConfig.name,
    releaseDate
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function bulkProcessRetreat(supabase: any, request: ContentPipelineRequest) {
  const { retreatId, customizations } = request;
  
  if (!retreatId) {
    throw new Error('Missing retreatId');
  }

  const retreatSessions = getRetreatSessions(retreatId);
  if (!retreatSessions.length) {
    throw new Error(`No sessions found for retreat: ${retreatId}`);
  }

  const results = [];
  
  for (const sessionKey of retreatSessions) {
    try {
      const sessionResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/seamless-content-pipeline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`
        },
        body: JSON.stringify({
          action: 'merge_retreat_session',
          retreatId,
          activityId: sessionKey,
          customizations
        })
      });

      if (sessionResponse.ok) {
        const result = await sessionResponse.json();
        results.push(result);
      } else {
        console.error(`Failed to process session ${sessionKey}:`, await sessionResponse.text());
      }
    } catch (error) {
      console.error(`Error processing session ${sessionKey}:`, error);
    }
  }

  return new Response(JSON.stringify({
    success: true,
    retreatId,
    processedSessions: results.length,
    results
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function createSeamlessMasterScript(sessionConfig: any, customizations?: any): string {
  const intensity = customizations?.intensity || 'moderate';
  const duration = customizations?.duration || 'medium';
  const focus = customizations?.focus || '';

  let script = `Welcome to your ${sessionConfig.name} session. `;
  
  // Personalized opening based on intensity
  if (intensity === 'gentle') {
    script += "This will be a very gentle, nurturing practice. Take your time and be extra kind to yourself. ";
  } else if (intensity === 'intensive') {
    script += "This will be a focused, transformative practice. Stay present and committed to your healing journey. ";
  } else {
    script += "This will be a balanced practice at a comfortable pace. ";
  }

  if (focus) {
    script += `We'll be focusing especially on ${focus}. `;
  }

  script += "Find a comfortable position and allow yourself to be fully present for this healing experience. ";
  script += "Remember, you are always in control. You can modify or pause this practice at any time if you need to. ";

  // Seamlessly merge all steps with natural transitions
  sessionConfig.steps.forEach((step: any, index: number) => {
    // Natural transition phrases
    if (index > 0) {
      const transitions = [
        "Now, let's move to the next part of our practice. ",
        "Continuing our journey together, ",
        "As we flow into the next step, ",
        "Gently transitioning now, ",
        "When you're ready, "
      ];
      script += transitions[index % transitions.length];
    }

    script += `${step.instruction} `;
    
    if (step.tip) {
      script += `${step.tip} `;
    }

    // Add pacing based on timing and customizations
    if (step.timing.includes('minutes')) {
      const baseMinutes = parseInt(step.timing.match(/(\d+)/)?.[1] || '2');
      let adjustedTime = baseMinutes;

      if (duration === 'short') {
        adjustedTime = Math.max(1, Math.floor(baseMinutes * 0.7));
      } else if (duration === 'long') {
        adjustedTime = Math.ceil(baseMinutes * 1.3);
      }

      script += `Take about ${adjustedTime} minute${adjustedTime > 1 ? 's' : ''} for this step. There's no rush. `;
      
      if (intensity === 'gentle') {
        script += "Allow yourself to go even slower if that feels better. ";
      }
    }

    // Natural breathing cues between major steps
    if (index < sessionConfig.steps.length - 1 && index % 2 === 1) {
      script += "Take a moment to breathe naturally and notice how you're feeling before we continue. ";
    }
  });

  // Seamless, heartfelt closing
  script += "\n\nAs we come to the end of this practice, take a moment to notice how you feel now compared to when we started. ";
  script += "Notice any changes in your body, your breathing, or your overall sense of wellbeing. ";
  script += "You've given yourself a beautiful gift today by taking this time for healing and self-care. ";
  script += "The peace and strength you've cultivated here stays with you. You can return to this feeling anytime you need to. ";
  script += "Remember, every time you practice self-care like this, you're building resilience and nurturing your inner healing. ";
  script += "Thank you for trusting in this process and for the courage you show every day. ";
  script += "You are worthy of peace, you are worthy of healing, and you are worthy of love. Carry this with you.";

  return script;
}

function getOptimalVoiceForSession(sessionConfig: any): string {
  const voiceMap: Record<string, string> = {
    'breathwork': 'SAz9YHcvj6GT2YYXdXww', // River - calming for breathwork
    'healing': 'pFZP5JQG7iQjIQuC4Bku', // Lily - gentle for healing
    'therapy': 'EXAVITQu4vr4xnSDxMaL', // Sarah - professional for therapy
    'mindfulness': 'XB0fDUnXU5powFXDhCwa', // Charlotte - natural for mindfulness
    'meditation': 'cgSgspJ2msm6clMCkdW9' // Jessica - encouraging for meditation
  };
  return voiceMap[sessionConfig.type] || 'SAz9YHcvj6GT2YYXdXww';
}

function calculateSessionDuration(steps: any[]): number {
  let totalSeconds = 0;
  steps.forEach(step => {
    if (step.timing.includes('minutes')) {
      const minutes = parseInt(step.timing.match(/(\d+)/)?.[1] || '2');
      totalSeconds += minutes * 60;
    } else if (step.timing.includes('seconds')) {
      const seconds = parseInt(step.timing.match(/(\d+)/)?.[1] || '30');
      totalSeconds += seconds;
    } else {
      totalSeconds += 120; // Default 2 minutes
    }
  });
  return totalSeconds;
}

function getRetreatSessions(retreatId: string): string[] {
  return Object.keys(retreatSessions[retreatId] || {});
}