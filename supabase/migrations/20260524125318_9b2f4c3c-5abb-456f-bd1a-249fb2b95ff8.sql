-- Add attachments column
ALTER TABLE public.consultation_inquiries
  ADD COLUMN IF NOT EXISTS attachments jsonb NOT NULL DEFAULT '[]'::jsonb;

-- Create public bucket for consultation uploads with size + mime restrictions
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'consultation-uploads',
  'consultation-uploads',
  true,
  26214400, -- 25 MB per file
  ARRAY[
    'image/jpeg','image/png','image/webp','image/gif','image/heic','image/heif',
    'video/mp4','video/quicktime','video/webm'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage policies: anyone can upload to / read from this bucket
DROP POLICY IF EXISTS "Public can read consultation uploads" ON storage.objects;
CREATE POLICY "Public can read consultation uploads"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'consultation-uploads');

DROP POLICY IF EXISTS "Anyone can upload consultation files" ON storage.objects;
CREATE POLICY "Anyone can upload consultation files"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'consultation-uploads');