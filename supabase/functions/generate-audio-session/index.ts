import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AudioGenerationRequest {
  sessionId: string;
  sessionName: string;
  sessionType: string;
  activityType: string;
  masterScript: string;
  voiceId?: string;
  metadata?: Record<string, any>;
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

    const body: AudioGenerationRequest = await req.json();
    const { sessionId, sessionName, sessionType, activityType, masterScript, voiceId, metadata } = body;

    // Log generation start
    await supabase.from('generation_logs').insert({
      session_id: null,
      log_level: 'info',
      message: `Starting audio generation for session: ${sessionName}`,
      details: { sessionId, sessionType, activityType }
    });

    // Create session record
    const { data: sessionData, error: sessionError } = await supabase
      .from('audio_sessions')
      .insert({
        session_id: sessionId,
        session_name: sessionName,
        session_type: sessionType,
        activity_type: activityType,
        master_script: masterScript,
        status: 'generating',
        metadata: metadata || {},
        voice_id: voiceId || 'SAz9YHcvj6GT2YYXdXww', // River - soothing voice
        language: 'en'
      })
      .select()
      .single();

    if (sessionError) {
      console.error('Session creation error:', sessionError);
      throw new Error('Failed to create session record');
    }

    const sessionDbId = sessionData.id;

    // Log session created
    await supabase.from('generation_logs').insert({
      session_id: sessionDbId,
      log_level: 'info',
      message: 'Session record created successfully',
      details: { sessionDbId }
    });

    // Generate audio with ElevenLabs
    const audioResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId || 'SAz9YHcvj6GT2YYXdXww'}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': elevenlabsApiKey
      },
      body: JSON.stringify({
        text: masterScript,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.8,
          similarity_boost: 0.8,
          style: 0.3,
          use_speaker_boost: true
        }
      })
    });

    if (!audioResponse.ok) {
      const errorText = await audioResponse.text();
      console.error('ElevenLabs error:', errorText);
      
      // Log error
      await supabase.from('generation_logs').insert({
        session_id: sessionDbId,
        log_level: 'error',
        message: 'ElevenLabs audio generation failed',
        details: { error: errorText, status: audioResponse.status }
      });

      // Mark this session as failed
      await supabase.from('audio_sessions').update({
        status: 'failed'
      }).eq('id', sessionDbId);

      // Try fallback: return last known good audio for this session_id
      try {
        const { data: cached } = await supabase
          .from('audio_sessions')
          .select('id, audio_url, duration_seconds, breath_cycle_count, metadata')
          .eq('session_id', sessionId)
          .eq('status', 'completed')
          .order('generated_at', { ascending: false })
          .limit(1)
          .single();

        if (cached?.audio_url) {
          await supabase.from('generation_logs').insert({
            session_id: sessionDbId,
            log_level: 'warn',
            message: 'Fallback to cached audio served after generation failure',
            details: { cachedSessionId: cached.id, cachedUrl: cached.audio_url }
          });

          // Best-effort: enqueue for later regeneration (self-healing)
          try {
            await supabase.from('audio_generation_queue').insert({
              session_id: sessionId,
              session_name: sessionName,
              session_type: sessionType,
              activity_type: activityType,
              master_script: masterScript,
              voice_id: voiceId || 'SAz9YHcvj6GT2YYXdXww',
              metadata: { ...(metadata || {}), scheduledFrom: 'generate-audio-session-fallback' },
              priority: 5,
              scheduled_for: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // retry in 1h
              is_pregenerated: false,
              tags: ['auto-retry', 'fallback-served']
            });
          } catch (_e) {
            // ignore enqueue errors
          }

          return new Response(JSON.stringify({
            success: true,
            sessionId: cached.id,
            audioUrl: cached.audio_url,
            duration: cached.duration_seconds,
            metadata: {
              ...(cached.metadata || {}),
              fallback: true,
              fallback_reason: 'generation_failed'
            }
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } catch (_e) {
        // ignore fallback errors
      }

      // As a last resort: enqueue for later regeneration and return 202 Accepted to avoid 500s
      try {
        await supabase.from('audio_generation_queue').insert({
          session_id: sessionId,
          session_name: sessionName,
          session_type: sessionType,
          activity_type: activityType,
          master_script: masterScript,
          voice_id: voiceId || 'SAz9YHcvj6GT2YYXdXww',
          metadata: { ...(metadata || {}), scheduledFrom: 'generate-audio-session-no-cache' },
          priority: 7,
          scheduled_for: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // retry in 2h
          is_pregenerated: false,
          tags: ['auto-retry', 'no-cache']
        });
      } catch (_e) {
        // ignore enqueue errors
      }

      await supabase.from('generation_logs').insert({
        session_id: sessionDbId,
        log_level: 'warn',
        message: 'Audio generation queued due to provider failure',
        details: { status: audioResponse.status, error: errorText }
      });

      return new Response(JSON.stringify({
        success: true,
        queued: true,
        sessionId: sessionDbId,
        audioUrl: null,
        duration: null,
        metadata: {
          fallback: false,
          reason: 'queued_after_generation_failure',
          provider_error: errorText
        }
      }), {
        status: 202,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    // Get audio blob
    const audioBlob = await audioResponse.blob();
    const audioBuffer = await audioBlob.arrayBuffer();

    // Upload to Supabase Storage
    const fileName = `${sessionId}-${Date.now()}.mp3`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('audio-sessions')
      .upload(fileName, audioBuffer, {
        contentType: 'audio/mpeg',
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      
      await supabase.from('generation_logs').insert({
        session_id: sessionDbId,
        log_level: 'error',
        message: 'Audio file upload failed',
        details: { error: uploadError }
      });

      await supabase.from('audio_sessions').update({
        status: 'failed'
      }).eq('id', sessionDbId);

      throw new Error('Failed to upload audio file');
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('audio-sessions')
      .getPublicUrl(fileName);

    // Calculate metadata
    const estimatedDuration = Math.ceil(masterScript.length / 150 * 60); // ~150 words per minute
    const breathCycles = (masterScript.match(/breathe|inhale|exhale/gi) || []).length;

    // Update session with completion
    const { error: updateError } = await supabase.from('audio_sessions').update({
      status: 'completed',
      audio_url: publicUrl,
      duration_seconds: estimatedDuration,
      breath_cycle_count: breathCycles,
      generated_at: new Date().toISOString(),
      metadata: {
        ...metadata,
        fileSize: audioBuffer.byteLength,
        fileName: fileName,
        wordCount: masterScript.split(' ').length
      }
    }).eq('id', sessionDbId);

    if (updateError) {
      console.error('Update error:', updateError);
      throw new Error('Failed to update session record');
    }

    // Log completion
    await supabase.from('generation_logs').insert({
      session_id: sessionDbId,
      log_level: 'info',
      message: 'Audio generation completed successfully',
      details: { 
        audioUrl: publicUrl, 
        duration: estimatedDuration, 
        breathCycles: breathCycles,
        fileSize: audioBuffer.byteLength
      }
    });

    return new Response(JSON.stringify({
      success: true,
      sessionId: sessionDbId,
      audioUrl: publicUrl,
      duration: estimatedDuration,
      metadata: {
        breathCycles,
        wordCount: masterScript.split(' ').length,
        fileSize: audioBuffer.byteLength
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-audio-session:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});