-- Create audio_sessions table for metadata tracking
CREATE TABLE public.audio_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL UNIQUE,
  session_name TEXT NOT NULL,
  session_type TEXT NOT NULL, -- e.g. 'breathwork', 'meditation', 'body-scan'
  activity_type TEXT NOT NULL, -- e.g. 'somatic-intervention', 'mindfulness'
  master_script TEXT NOT NULL,
  audio_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'generating', 'completed', 'failed'
  metadata JSONB DEFAULT '{}',
  duration_seconds INTEGER,
  breath_cycle_count INTEGER,
  difficulty_level TEXT,
  voice_id TEXT,
  language TEXT DEFAULT 'en',
  compliance_flag BOOLEAN DEFAULT false,
  audit_notes TEXT,
  generated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create generation_logs table for monitoring
CREATE TABLE public.generation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.audio_sessions(id) ON DELETE CASCADE,
  log_level TEXT NOT NULL, -- 'info', 'warning', 'error'
  message TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create admin dashboard access table
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin', -- 'admin', 'super_admin'
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public) VALUES ('audio-sessions', 'audio-sessions', true);

-- Enable RLS
ALTER TABLE public.audio_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for audio_sessions
CREATE POLICY "Admin can view all audio sessions" 
ON public.audio_sessions 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admin can insert audio sessions" 
ON public.audio_sessions 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admin can update audio sessions" 
ON public.audio_sessions 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

-- RLS Policies for generation_logs
CREATE POLICY "Admin can view all generation logs" 
ON public.generation_logs 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "System can insert generation logs" 
ON public.generation_logs 
FOR INSERT 
WITH CHECK (true);

-- RLS Policies for admin_users
CREATE POLICY "Admin can view admin users" 
ON public.admin_users 
FOR SELECT 
USING (user_id = auth.uid());

-- Storage policies for audio files
CREATE POLICY "Admin can access audio files" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'audio-sessions' AND 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "System can upload audio files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'audio-sessions');

CREATE POLICY "Admin can update audio files" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'audio-sessions' AND 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

-- Create indexes for performance
CREATE INDEX idx_audio_sessions_status ON public.audio_sessions(status);
CREATE INDEX idx_audio_sessions_session_type ON public.audio_sessions(session_type);
CREATE INDEX idx_audio_sessions_created_at ON public.audio_sessions(created_at);
CREATE INDEX idx_generation_logs_session_id ON public.generation_logs(session_id);
CREATE INDEX idx_generation_logs_created_at ON public.generation_logs(created_at);

-- Create triggers for updated_at
CREATE TRIGGER update_audio_sessions_updated_at
  BEFORE UPDATE ON public.audio_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for admin dashboard
ALTER PUBLICATION supabase_realtime ADD TABLE public.audio_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.generation_logs;