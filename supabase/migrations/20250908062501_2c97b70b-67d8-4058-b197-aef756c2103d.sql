-- Fix profiles table RLS policies to allow proper user creation
-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create new policies that work with auth flows
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);

-- Allow service role to manage profiles (needed for auth triggers)
CREATE POLICY "Service role can manage all profiles" 
ON public.profiles FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

-- Create a trigger to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'full_name', ''));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert a test user profile (this will be linked when the test user signs up)
-- Note: We can't directly insert into auth.users as it's managed by Supabase
-- The test user will need to be created through the auth signup process