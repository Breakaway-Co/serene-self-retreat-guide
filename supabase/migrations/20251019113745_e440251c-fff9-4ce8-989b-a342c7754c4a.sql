-- Add RLS policy to restrict retreat_configurations to authenticated users only
-- This prevents public exposure of mental health program details

-- Drop the existing policy if it exists
DROP POLICY IF EXISTS "Retreat configurations are viewable by authenticated users" ON retreat_configurations;

-- Create new policy restricting to authenticated users
CREATE POLICY "Retreat configurations are viewable by authenticated users"
ON retreat_configurations
FOR SELECT
TO authenticated
USING (true);

-- Ensure RLS is enabled
ALTER TABLE retreat_configurations ENABLE ROW LEVEL SECURITY;