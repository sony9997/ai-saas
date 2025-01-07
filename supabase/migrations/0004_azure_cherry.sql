/*
  # User Settings and Profile Enhancements

  1. New Columns
    - `display_name` (text): User's display name
    - `avatar_url` (text): URL to user's avatar
    - `preferences` (jsonb): User preferences like notifications, theme, etc.
    - `last_login` (timestamptz): Track user's last login time

  2. Security
    - Maintain existing RLS policies
    - Add trigger for last_login updates
*/

-- Add new columns to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS display_name TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{"theme": "light", "notifications": true}'::jsonb,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ;

-- Create function to update last_login
CREATE OR REPLACE FUNCTION update_last_login()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET last_login = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for last_login updates
CREATE TRIGGER on_auth_user_login
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE update_last_login();
