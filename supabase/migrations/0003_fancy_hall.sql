/*
  # Credits Management Function

  1. Functions
    - `handle_image_generation`: Manages credit deduction when generating images
    - Checks credit availability before generation
    - Deducts credits after successful generation

  2. Triggers
    - Automatically deducts credits when new image is generated
*/

CREATE OR REPLACE FUNCTION handle_image_generation()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if user has enough credits
  IF EXISTS (
    SELECT 1 FROM profiles
    WHERE id = NEW.user_id
    AND credits_remaining > 0
  ) THEN
    -- Deduct one credit
    UPDATE profiles
    SET credits_remaining = credits_remaining - 1
    WHERE id = NEW.user_id;
    
    RETURN NEW;
  ELSE
    RAISE EXCEPTION 'Insufficient credits';
  END IF;
END;
$$ language 'plpgsql';

-- Create trigger to handle credit deduction
CREATE TRIGGER deduct_credits_on_generation
  BEFORE INSERT ON generated_images
  FOR EACH ROW
  EXECUTE PROCEDURE handle_image_generation();
