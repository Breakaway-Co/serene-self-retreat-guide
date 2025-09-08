import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QueueProcessorRequest {
  action: 'process_queue' | 'add_to_queue' | 'retry_failed' | 'schedule_pregeneration';
  sessionId?: string;
  sessionName?: string;
  sessionType?: string;
  activityType?: string;
  masterScript?: string;
  voiceId?: string;
  metadata?: Record<string, any>;
  priority?: number;
  scheduledFor?: string;
  isPregenerated?: boolean;
  releaseDate?: string;
  tags?: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const elevenlabsApiKey = Deno.env.get('ELEVENLABS_API_KEY');

    if (!elevenlabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body: QueueProcessorRequest = await req.json();

    console.log('Seamless audio processor request:', body);

    switch (body.action) {
      case 'add_to_queue':
        return await addToQueue(supabase, body);
      case 'process_queue':
        return await processQueue(supabase, elevenlabsApiKey);
      case 'retry_failed':
        return await retryFailed(supabase);
      case 'schedule_pregeneration':
        return await schedulePregeneration(supabase);
      default:
        throw new Error('Invalid action');
    }

  } catch (error) {
    console.error('Error in seamless-audio-processor:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function addToQueue(supabase: any, request: QueueProcessorRequest) {
  console.log('Adding session to queue:', request.sessionName);

  const { data, error } = await supabase
    .from('audio_generation_queue')
    .insert({
      session_id: request.sessionId,
      session_name: request.sessionName,
      session_type: request.sessionType,
      activity_type: request.activityType,
      master_script: request.masterScript,
      voice_id: request.voiceId || 'SAz9YHcvj6GT2YYXdXww',
      metadata: request.metadata || {},
      priority: request.priority || 0,
      scheduled_for: request.scheduledFor ? new Date(request.scheduledFor) : null,
      is_pregenerated: request.isPregenerated || false,
      release_date: request.releaseDate ? new Date(request.releaseDate) : null,
      tags: request.tags || []
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to add to queue:', error);
    throw new Error('Failed to add session to queue');
  }

  await supabase.from('generation_logs').insert({
    queue_id: data.id,
    category: 'queue',
    log_level: 'info',
    message: `Session queued: ${request.sessionName}`,
    details: { sessionId: request.sessionId, priority: request.priority }
  });

  return new Response(JSON.stringify({
    success: true,
    queueId: data.id,
    message: 'Session added to generation queue'
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function processQueue(supabase: any, elevenlabsApiKey: string) {
  console.log('Processing audio generation queue...');

  // Get processor state
  const { data: processor } = await supabase
    .from('queue_processor_state')
    .select('*')
    .eq('processor_name', 'default_processor')
    .single();

  if (!processor || processor.is_paused) {
    console.log('Processor is paused or not found');
    return new Response(JSON.stringify({ success: true, message: 'Processor paused' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Update heartbeat
  await supabase
    .from('queue_processor_state')
    .update({ 
      last_heartbeat: new Date().toISOString(),
      is_running: true 
    })
    .eq('processor_name', 'default_processor');

  // Get pending items (including scheduled items that are due)
  const { data: queueItems, error: queueError } = await supabase
    .from('audio_generation_queue')
    .select('*')
    .in('status', ['pending', 'retrying'])
    .or(`scheduled_for.is.null,scheduled_for.lte.${new Date().toISOString()}`)
    .order('priority', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(processor.concurrent_limit);

  if (queueError || !queueItems?.length) {
    console.log('No queue items to process');
    await supabase
      .from('queue_processor_state')
      .update({ is_running: false })
      .eq('processor_name', 'default_processor');
    
    return new Response(JSON.stringify({ success: true, processed: 0 }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let processed = 0;
  const results = [];

  for (const item of queueItems) {
    try {
      console.log(`Processing queue item: ${item.session_name}`);
      
      // Mark as in progress
      await supabase
        .from('audio_generation_queue')
        .update({
          status: 'in_progress',
          started_at: new Date().toISOString()
        })
        .eq('id', item.id);

      await supabase.from('generation_logs').insert({
        queue_id: item.id,
        category: 'queue',
        log_level: 'info',
        message: `Started processing: ${item.session_name}`,
        details: { queueId: item.id }
      });

      const result = await generateAudioWithRetry(supabase, elevenlabsApiKey, item);
      results.push(result);
      processed++;

    } catch (error) {
      console.error(`Failed to process queue item ${item.id}:`, error);
      await handleProcessingFailure(supabase, item, error.message);
    }
  }

  // Update processor state
  await supabase
    .from('queue_processor_state')
    .update({ 
      is_running: false,
      total_processed: processor.total_processed + processed,
      last_processed_queue_id: queueItems[queueItems.length - 1]?.id
    })
    .eq('processor_name', 'default_processor');

  console.log(`Processed ${processed} queue items`);

  return new Response(JSON.stringify({
    success: true,
    processed,
    results
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function generateAudioWithRetry(supabase: any, elevenlabsApiKey: string, queueItem: any) {
  const maxRetries = queueItem.max_retries;
  let lastError = '';

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Generation attempt ${attempt + 1}/${maxRetries + 1} for ${queueItem.session_name}`);

      if (attempt > 0) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, attempt - 1) * 1000;
        console.log(`Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));

        // Update retry status
        await supabase
          .from('audio_generation_queue')
          .update({
            status: 'retrying',
            retry_count: attempt
          })
          .eq('id', queueItem.id);

        await supabase.from('generation_logs').insert({
          queue_id: queueItem.id,
          category: 'retry',
          log_level: 'info',
          message: `Retry attempt ${attempt} for ${queueItem.session_name}`,
          details: { attempt, delay, previousError: lastError }
        });
      }

      // Generate audio
      const startTime = Date.now();
      const audioResponse = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${queueItem.voice_id}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': elevenlabsApiKey
          },
          body: JSON.stringify({
            text: queueItem.master_script,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.8,
              similarity_boost: 0.8,
              style: 0.3,
              use_speaker_boost: true
            }
          })
        }
      );

      if (!audioResponse.ok) {
        const errorText = await audioResponse.text();
        console.error('ElevenLabs error:', errorText);
        
        // Check if it's a permanent error (don't retry)
        if ([400, 401, 403].includes(audioResponse.status)) {
          throw new Error(`Permanent error: ${errorText}`);
        }
        
        // Check if it's a transient error (retry)
        if ([429, 500, 502, 503, 504].includes(audioResponse.status)) {
          lastError = errorText;
          continue; // Retry
        }

        throw new Error(`ElevenLabs API error: ${errorText}`);
      }

      // Upload successful audio
      const audioBlob = await audioResponse.blob();
      const audioBuffer = await audioBlob.arrayBuffer();
      const fileName = `${queueItem.session_id}-${Date.now()}.mp3`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('audio-sessions')
        .upload(fileName, audioBuffer, {
          contentType: 'audio/mpeg',
          cacheControl: '3600'
        });

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('audio-sessions')
        .getPublicUrl(fileName);

      // Calculate metadata
      const processingTime = Math.round((Date.now() - startTime) / 1000);
      const estimatedDuration = Math.ceil(queueItem.master_script.length / 150 * 60);
      const breathCycles = (queueItem.master_script.match(/breathe|inhale|exhale/gi) || []).length;

      // Create audio session record
      const { data: sessionData, error: sessionError } = await supabase
        .from('audio_sessions')
        .insert({
          session_id: queueItem.session_id,
          session_name: queueItem.session_name,
          session_type: queueItem.session_type,
          activity_type: queueItem.activity_type,
          master_script: queueItem.master_script,
          status: 'completed',
          audio_url: publicUrl,
          duration_seconds: estimatedDuration,
          breath_cycle_count: breathCycles,
          voice_id: queueItem.voice_id,
          language: queueItem.language,
          metadata: {
            ...queueItem.metadata,
            fileSize: audioBuffer.byteLength,
            fileName: fileName,
            wordCount: queueItem.master_script.split(' ').length,
            processingTime
          },
          generation_queue_id: queueItem.id,
          tags: queueItem.tags,
          retry_count: attempt,
          is_pregenerated: queueItem.is_pregenerated,
          release_date: queueItem.release_date,
          processing_time_seconds: processingTime,
          generated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (sessionError) {
        throw new Error(`Failed to create session record: ${sessionError.message}`);
      }

      // Mark queue item as completed
      const finalStatus = attempt > 0 ? 'recovered' : 'completed';
      await supabase
        .from('audio_generation_queue')
        .update({
          status: finalStatus,
          completed_at: new Date().toISOString(),
          processing_time_seconds: processingTime,
          last_error: null
        })
        .eq('id', queueItem.id);

      const logCategory = attempt > 0 ? 'retry' : 'general';
      await supabase.from('generation_logs').insert({
        session_id: sessionData.id,
        queue_id: queueItem.id,
        category: logCategory,
        log_level: 'info',
        message: `Audio generation ${finalStatus}: ${queueItem.session_name}`,
        details: {
          audioUrl: publicUrl,
          duration: estimatedDuration,
          breathCycles,
          fileSize: audioBuffer.byteLength,
          processingTime,
          attempts: attempt + 1,
          recovered: attempt > 0
        }
      });

      console.log(`Successfully generated audio for ${queueItem.session_name} after ${attempt + 1} attempts`);

      return {
        success: true,
        sessionId: sessionData.id,
        audioUrl: publicUrl,
        attempts: attempt + 1,
        recovered: attempt > 0
      };

    } catch (error) {
      lastError = error.message;
      console.error(`Attempt ${attempt + 1} failed:`, error.message);

      // If it's a permanent error or last attempt, fail the item
      if (error.message.includes('Permanent error') || attempt === maxRetries) {
        await supabase
          .from('audio_generation_queue')
          .update({
            status: 'failed',
            completed_at: new Date().toISOString(),
            last_error: error.message,
            retry_count: attempt
          })
          .eq('id', queueItem.id);

        await supabase.from('generation_logs').insert({
          queue_id: queueItem.id,
          category: 'failover',
          log_level: 'error',
          message: `Final failure for ${queueItem.session_name}`,
          details: { error: error.message, totalAttempts: attempt + 1 }
        });

        throw error;
      }
    }
  }
}

async function handleProcessingFailure(supabase: any, queueItem: any, errorMessage: string) {
  await supabase
    .from('audio_generation_queue')
    .update({
      status: 'failed',
      last_error: errorMessage,
      completed_at: new Date().toISOString()
    })
    .eq('id', queueItem.id);

  await supabase
    .from('queue_processor_state')
    .update({ 
      total_failures: supabase.raw('total_failures + 1')
    })
    .eq('processor_name', 'default_processor');
}

async function retryFailed(supabase: any) {
  console.log('Retrying failed items...');

  const { data: failedItems, error } = await supabase
    .from('audio_generation_queue')
    .select('*')
    .eq('status', 'failed')
    .lt('retry_count', supabase.raw('max_retries'))
    .order('created_at', { ascending: true })
    .limit(10);

  if (error || !failedItems?.length) {
    return new Response(JSON.stringify({ success: true, retried: 0 }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  for (const item of failedItems) {
    await supabase
      .from('audio_generation_queue')
      .update({
        status: 'pending',
        last_error: null,
        scheduled_for: new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes from now
      })
      .eq('id', item.id);

    await supabase.from('generation_logs').insert({
      queue_id: item.id,
      category: 'retry',
      log_level: 'info',
      message: `Scheduled for self-healing retry: ${item.session_name}`,
      details: { previousFailure: item.last_error }
    });
  }

  return new Response(JSON.stringify({
    success: true,
    retried: failedItems.length
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function schedulePregeneration(supabase: any) {
  console.log('Scheduling pregeneration...');

  // Find sessions that need pre-generation (release date within next 24-72 hours)
  const now = new Date();
  const next72Hours = new Date(now.getTime() + 72 * 60 * 60 * 1000);

  const { data: scheduleItems, error } = await supabase
    .from('session_pregeneration_schedule')
    .select('*')
    .eq('is_scheduled', false)
    .lte('scheduled_release_date', next72Hours.toISOString())
    .limit(20);

  if (error || !scheduleItems?.length) {
    return new Response(JSON.stringify({ success: true, scheduled: 0 }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let scheduled = 0;

  for (const item of scheduleItems) {
    try {
      // Create master script from retreat configuration
      const masterScript = await createMasterScriptFromRetreat(item.retreat_id, item.activity_id);

      // Add to generation queue with high priority
      const { data: queueData, error: queueError } = await supabase
        .from('audio_generation_queue')
        .insert({
          session_id: `${item.retreat_id}-${item.activity_id}-pregen-${Date.now()}`,
          session_name: item.session_name,
          session_type: 'meditation',
          activity_type: 'mindfulness',
          master_script: masterScript,
          voice_id: 'SAz9YHcvj6GT2YYXdXww',
          metadata: {
            retreat_id: item.retreat_id,
            activity_id: item.activity_id,
            pregenerated: true
          },
          priority: 100, // High priority for pre-generation
          is_pregenerated: true,
          release_date: item.scheduled_release_date,
          tags: ['pregenerated', item.retreat_id]
        })
        .select()
        .single();

      if (queueError) {
        console.error('Failed to queue pregeneration:', queueError);
        continue;
      }

      // Update schedule item
      await supabase
        .from('session_pregeneration_schedule')
        .update({
          is_scheduled: true,
          generation_queue_id: queueData.id
        })
        .eq('id', item.id);

      await supabase.from('generation_logs').insert({
        queue_id: queueData.id,
        category: 'pregeneration',
        log_level: 'info',
        message: `Pre-generation scheduled: ${item.session_name}`,
        details: { 
          releaseDate: item.scheduled_release_date,
          retreatId: item.retreat_id,
          activityId: item.activity_id
        }
      });

      scheduled++;

    } catch (error) {
      console.error(`Failed to schedule pregeneration for ${item.session_name}:`, error);
    }
  }

  return new Response(JSON.stringify({
    success: true,
    scheduled
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function createMasterScriptFromRetreat(retreatId: string, activityId: string): Promise<string> {
  // This would integrate with your retreat configuration system
  // For now, return a placeholder script
  return `Welcome to your personalized meditation session from the ${retreatId} retreat. 
  
  This is a gentle, healing practice designed to support your journey. Find a comfortable position and allow yourself to be fully present.

  Take three deep breaths with me now. Breathe in slowly through your nose... hold for a moment... and exhale gently through your mouth.

  Notice how your body feels in this moment. There's no need to change anything, just observe with kindness and curiosity.

  Continue breathing naturally as we move through this practice together. You are safe, you are supported, and you are exactly where you need to be.

  Take your time with each breath, allowing yourself to settle deeper into this peaceful state.

  When you're ready, gently bring your attention back to the space around you. Notice how you feel now compared to when we started.

  Thank you for taking this time for yourself. Carry this sense of peace with you as you continue your day.`;
}