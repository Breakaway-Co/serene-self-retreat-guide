-- Create activity responses table for progress tracking
CREATE TABLE public.activity_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_retreat_id UUID NOT NULL,
  activity_id TEXT NOT NULL,
  day_number INTEGER NOT NULL,
  response_type TEXT NOT NULL, -- 'reflection', 'journal', 'scale', 'multiple_choice', 'checklist'
  response_data JSONB NOT NULL DEFAULT '{}',
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.activity_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for activity responses
CREATE POLICY "Users can view their own activity responses" 
ON public.activity_responses 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM user_retreats ur 
  WHERE ur.id = activity_responses.user_retreat_id 
  AND ur.user_id = auth.uid()
));

CREATE POLICY "Users can create their own activity responses" 
ON public.activity_responses 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM user_retreats ur 
  WHERE ur.id = activity_responses.user_retreat_id 
  AND ur.user_id = auth.uid()
));

CREATE POLICY "Users can update their own activity responses" 
ON public.activity_responses 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM user_retreats ur 
  WHERE ur.id = activity_responses.user_retreat_id 
  AND ur.user_id = auth.uid()
));

CREATE POLICY "Admins can view all activity responses" 
ON public.activity_responses 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE admin_users.user_id = auth.uid()
));

-- Create unique constraint to prevent duplicate responses
CREATE UNIQUE INDEX activity_responses_unique_idx 
ON public.activity_responses (user_retreat_id, activity_id, day_number);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_activity_responses_updated_at
BEFORE UPDATE ON public.activity_responses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();