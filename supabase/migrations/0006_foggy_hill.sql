/*
  # Audit Trail for User Actions

  1. New Table
    - `user_activity_logs`
      - Track important user actions
      - Store activity type, timestamp, and metadata

  2. Security
    - Enable RLS
    - Allow users to view their own logs
    - Prevent modification of logs
*/

-- Create activity logs table
CREATE TABLE IF NOT EXISTS user_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_activity_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing own logs
CREATE POLICY "Users can view own activity logs"
  ON user_activity_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create function to log user activities
CREATE OR REPLACE FUNCTION log_user_activity(
  user_id UUID,
  activity_type TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO user_activity_logs (user_id, activity_type, metadata)
  VALUES (user_id, activity_type, metadata)
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$ language 'plpgsql';
