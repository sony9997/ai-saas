/*
  # Subscription and Billing Details

  1. New Columns
    - `subscription_status` (text): Active, canceled, etc.
    - `subscription_end_date` (timestamptz): When current subscription expires
    - `total_credits_used` (integer): Track total credits usage
    - `billing_cycle_start` (timestamptz): Start of current billing cycle

  2. Security
    - Maintain existing RLS policies
*/

-- Add subscription-related columns
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS total_credits_used INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS billing_cycle_start TIMESTAMPTZ DEFAULT NOW();

-- Create function to update total_credits_used
CREATE OR REPLACE FUNCTION update_credits_used()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET total_credits_used = total_credits_used + 1
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating total_credits_used
CREATE TRIGGER on_image_generation
  AFTER INSERT ON generated_images
  FOR EACH ROW
  EXECUTE PROCEDURE update_credits_used();
