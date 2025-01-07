/*
  # AI Generated Images Table

  1. New Tables
    - `generated_images`
      - `id` (uuid)
      - `user_id` (uuid, references profiles)
      - `prompt` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)
      - `model` (text)

  2. Security
    - Enable RLS
    - Add policies for:
      - Users can view their own generated images
      - Users can create new images if they have credits
*/

CREATE TABLE IF NOT EXISTS generated_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  model TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own images"
  ON generated_images
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create images"
  ON generated_images
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
