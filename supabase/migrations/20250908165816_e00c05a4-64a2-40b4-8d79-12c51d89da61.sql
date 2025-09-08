-- Enhanced audio generation system with queue management and enterprise features

-- Audio generation queue table
CREATE TABLE IF NOT EXISTS public.audio_generation_queue (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    session_name TEXT NOT NULL,
    session_type TEXT NOT NULL,
    activity_type TEXT NOT NULL,
    master_script TEXT NOT NULL,
    voice_id TEXT,
    language TEXT DEFAULT 'en',
    metadata JSONB DEFAULT '{}',
    
    -- Queue management
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed', 'retrying', 'recovered', 'pre_generated')),
    priority INTEGER NOT NULL DEFAULT 0,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    
    -- Retry and failover
    retry_count INTEGER NOT NULL DEFAULT 0,
    max_retries INTEGER NOT NULL DEFAULT 3,
    last_error TEXT,
    
    -- Processing details
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    processing_time_seconds INTEGER,
    
    -- Pre-generation
    is_pregenerated BOOLEAN DEFAULT FALSE,
    release_date TIMESTAMP WITH TIME ZONE,
    
    -- Compliance and audit
    compliance_flag BOOLEAN DEFAULT FALSE,
    audit_notes TEXT,
    tags TEXT[],
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_by UUID
);

-- Indexes for efficient queue processing
CREATE INDEX IF NOT EXISTS idx_audio_queue_status ON public.audio_generation_queue(status);
CREATE INDEX IF NOT EXISTS idx_audio_queue_priority ON public.audio_generation_queue(priority DESC, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_audio_queue_scheduled ON public.audio_generation_queue(scheduled_for) WHERE scheduled_for IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_audio_queue_release_date ON public.audio_generation_queue(release_date) WHERE release_date IS NOT NULL;

-- Audio generation statistics table
CREATE TABLE IF NOT EXISTS public.audio_generation_stats (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL,
    total_generated INTEGER DEFAULT 0,
    total_failed INTEGER DEFAULT 0,
    total_retried INTEGER DEFAULT 0,
    total_recovered INTEGER DEFAULT 0,
    total_pregenerated INTEGER DEFAULT 0,
    avg_processing_time_seconds FLOAT,
    peak_queue_size INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(date)
);

-- Session pregeneration schedule
CREATE TABLE IF NOT EXISTS public.session_pregeneration_schedule (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    retreat_id TEXT NOT NULL,
    activity_id TEXT NOT NULL,
    session_name TEXT NOT NULL,
    scheduled_release_date TIMESTAMP WITH TIME ZONE NOT NULL,
    pregenerate_hours_before INTEGER NOT NULL DEFAULT 24,
    
    -- Status tracking
    is_scheduled BOOLEAN DEFAULT FALSE,
    is_generated BOOLEAN DEFAULT FALSE,
    generation_queue_id UUID REFERENCES public.audio_generation_queue(id),
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add new columns to existing audio_sessions table
ALTER TABLE public.audio_sessions 
ADD COLUMN IF NOT EXISTS generation_queue_id UUID REFERENCES public.audio_generation_queue(id),
ADD COLUMN IF NOT EXISTS tags TEXT[],
ADD COLUMN IF NOT EXISTS retry_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_pregenerated BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS release_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS processing_time_seconds INTEGER;

-- Enhanced generation logs with categories
ALTER TABLE public.generation_logs 
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general' CHECK (category IN ('general', 'queue', 'retry', 'failover', 'pregeneration', 'compliance')),
ADD COLUMN IF NOT EXISTS queue_id UUID REFERENCES public.audio_generation_queue(id);

-- Queue processor state tracking
CREATE TABLE IF NOT EXISTS public.queue_processor_state (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    processor_name TEXT NOT NULL UNIQUE,
    is_running BOOLEAN DEFAULT FALSE,
    is_paused BOOLEAN DEFAULT FALSE,
    concurrent_limit INTEGER DEFAULT 3,
    last_heartbeat TIMESTAMP WITH TIME ZONE,
    last_processed_queue_id UUID,
    
    -- Statistics
    total_processed INTEGER DEFAULT 0,
    total_failures INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default queue processor
INSERT INTO public.queue_processor_state (processor_name, concurrent_limit) 
VALUES ('default_processor', 3) 
ON CONFLICT (processor_name) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.audio_generation_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audio_generation_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_pregeneration_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.queue_processor_state ENABLE ROW LEVEL SECURITY;

-- RLS Policies for audio_generation_queue
CREATE POLICY "Admin can manage audio generation queue" 
ON public.audio_generation_queue 
FOR ALL 
USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- RLS Policies for audio_generation_stats
CREATE POLICY "Admin can view audio generation stats" 
ON public.audio_generation_stats 
FOR SELECT 
USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- RLS Policies for session_pregeneration_schedule
CREATE POLICY "Admin can manage pregeneration schedule" 
ON public.session_pregeneration_schedule 
FOR ALL 
USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- RLS Policies for queue_processor_state
CREATE POLICY "Admin can manage queue processor state" 
ON public.queue_processor_state 
FOR ALL 
USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- Function to update queue statistics
CREATE OR REPLACE FUNCTION public.update_queue_statistics()
RETURNS TRIGGER AS $$
BEGIN
    -- Update daily statistics
    INSERT INTO public.audio_generation_stats (
        date, 
        total_generated, 
        total_failed, 
        total_retried, 
        total_recovered,
        total_pregenerated
    )
    VALUES (
        CURRENT_DATE,
        CASE WHEN NEW.status = 'completed' THEN 1 ELSE 0 END,
        CASE WHEN NEW.status = 'failed' AND NEW.retry_count >= NEW.max_retries THEN 1 ELSE 0 END,
        CASE WHEN NEW.status = 'retrying' THEN 1 ELSE 0 END,
        CASE WHEN NEW.status = 'recovered' THEN 1 ELSE 0 END,
        CASE WHEN NEW.is_pregenerated = TRUE AND NEW.status = 'completed' THEN 1 ELSE 0 END
    )
    ON CONFLICT (date) DO UPDATE SET
        total_generated = audio_generation_stats.total_generated + CASE WHEN NEW.status = 'completed' AND OLD.status != 'completed' THEN 1 ELSE 0 END,
        total_failed = audio_generation_stats.total_failed + CASE WHEN NEW.status = 'failed' AND NEW.retry_count >= NEW.max_retries AND OLD.status != 'failed' THEN 1 ELSE 0 END,
        total_retried = audio_generation_stats.total_retried + CASE WHEN NEW.status = 'retrying' AND OLD.status != 'retrying' THEN 1 ELSE 0 END,
        total_recovered = audio_generation_stats.total_recovered + CASE WHEN NEW.status = 'recovered' AND OLD.status != 'recovered' THEN 1 ELSE 0 END,
        total_pregenerated = audio_generation_stats.total_pregenerated + CASE WHEN NEW.is_pregenerated = TRUE AND NEW.status = 'completed' AND OLD.status != 'completed' THEN 1 ELSE 0 END;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for queue statistics
CREATE TRIGGER update_queue_statistics_trigger
    AFTER UPDATE ON public.audio_generation_queue
    FOR EACH ROW
    EXECUTE FUNCTION public.update_queue_statistics();

-- Trigger for updated_at timestamp
CREATE TRIGGER update_audio_queue_updated_at
    BEFORE UPDATE ON public.audio_generation_queue
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pregeneration_schedule_updated_at
    BEFORE UPDATE ON public.session_pregeneration_schedule
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_queue_processor_state_updated_at
    BEFORE UPDATE ON public.queue_processor_state
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();