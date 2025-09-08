import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// This function runs as a scheduled job (can be triggered via cron or manually)
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Queue scheduler running...');

    const schedulerResults = {
      queueProcessed: 0,
      pregenerationScheduled: 0,
      failedRetried: 0,
      errors: []
    };

    // 1. Process the main generation queue
    try {
      const queueResponse = await fetch(`${supabaseUrl}/functions/v1/seamless-audio-processor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`
        },
        body: JSON.stringify({ action: 'process_queue' })
      });

      if (queueResponse.ok) {
        const queueResult = await queueResponse.json();
        schedulerResults.queueProcessed = queueResult.processed || 0;
        console.log(`Processed ${queueResult.processed} queue items`);
      } else {
        const error = await queueResponse.text();
        console.error('Queue processing failed:', error);
        schedulerResults.errors.push(`Queue processing: ${error}`);
      }
    } catch (error) {
      console.error('Queue processing error:', error);
      schedulerResults.errors.push(`Queue processing: ${error.message}`);
    }

    // 2. Schedule pre-generation for upcoming sessions
    try {
      const pregenerationResponse = await fetch(`${supabaseUrl}/functions/v1/seamless-audio-processor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`
        },
        body: JSON.stringify({ action: 'schedule_pregeneration' })
      });

      if (pregenerationResponse.ok) {
        const pregenerationResult = await pregenerationResponse.json();
        schedulerResults.pregenerationScheduled = pregenerationResult.scheduled || 0;
        console.log(`Scheduled ${pregenerationResult.scheduled} pre-generation items`);
      } else {
        const error = await pregenerationResponse.text();
        console.error('Pre-generation scheduling failed:', error);
        schedulerResults.errors.push(`Pre-generation: ${error}`);
      }
    } catch (error) {
      console.error('Pre-generation error:', error);
      schedulerResults.errors.push(`Pre-generation: ${error.message}`);
    }

    // 3. Retry failed items (self-healing)
    try {
      const retryResponse = await fetch(`${supabaseUrl}/functions/v1/seamless-audio-processor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`
        },
        body: JSON.stringify({ action: 'retry_failed' })
      });

      if (retryResponse.ok) {
        const retryResult = await retryResponse.json();
        schedulerResults.failedRetried = retryResult.retried || 0;
        console.log(`Retried ${retryResult.retried} failed items`);
      } else {
        const error = await retryResponse.text();
        console.error('Failed item retry failed:', error);
        schedulerResults.errors.push(`Failed retry: ${error}`);
      }
    } catch (error) {
      console.error('Failed retry error:', error);
      schedulerResults.errors.push(`Failed retry: ${error.message}`);
    }

    // 4. Update queue statistics and processor heartbeat
    try {
      const now = new Date().toISOString();
      
      // Update processor heartbeat
      await supabase
        .from('queue_processor_state')
        .update({ 
          last_heartbeat: now,
          is_running: false 
        })
        .eq('processor_name', 'default_processor');

      // Calculate queue statistics
      const { data: queueStats } = await supabase
        .from('audio_generation_queue')
        .select('status, processing_time_seconds')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      if (queueStats?.length) {
        const totalInQueue = queueStats.length;
        const avgProcessingTime = queueStats
          .filter(item => item.processing_time_seconds)
          .reduce((acc, item) => acc + item.processing_time_seconds, 0) / 
          queueStats.filter(item => item.processing_time_seconds).length || 0;

        await supabase
          .from('audio_generation_stats')
          .upsert({
            date: new Date().toISOString().split('T')[0],
            peak_queue_size: Math.max(totalInQueue, 0),
            avg_processing_time_seconds: avgProcessingTime
          }, { onConflict: 'date' });
      }

      console.log('Updated queue statistics and processor heartbeat');
    } catch (error) {
      console.error('Statistics update error:', error);
      schedulerResults.errors.push(`Statistics: ${error.message}`);
    }

    // 5. Clean up old logs (keep last 30 days)
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      
      await supabase
        .from('generation_logs')
        .delete()
        .lt('created_at', thirtyDaysAgo);

      console.log('Cleaned up old generation logs');
    } catch (error) {
      console.error('Log cleanup error:', error);
      schedulerResults.errors.push(`Log cleanup: ${error.message}`);
    }

    // Log scheduler run
    await supabase.from('generation_logs').insert({
      category: 'queue',
      log_level: 'info',
      message: 'Queue scheduler completed',
      details: schedulerResults
    });

    console.log('Queue scheduler completed:', schedulerResults);

    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      results: schedulerResults
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Queue scheduler error:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
