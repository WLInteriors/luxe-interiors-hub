
-- 1) Make consultation-uploads bucket private
UPDATE storage.buckets SET public = false WHERE id = 'consultation-uploads';

-- 2) Replace storage policies
DROP POLICY IF EXISTS "Public can read consultation uploads" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload consultation files" ON storage.objects;

-- Only service role can read (edge functions generate signed URLs)
CREATE POLICY "Service role reads consultation uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'consultation-uploads' AND auth.role() = 'service_role');

-- Anonymous/authenticated uploads, but scoped to a UUID folder (no arbitrary paths)
CREATE POLICY "Scoped uploads to consultation bucket"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'consultation-uploads'
  AND (storage.foldername(name))[1] ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
);

-- 3) Explicit service-role-only SELECT on consultation_inquiries
CREATE POLICY "Service role can read inquiries"
ON public.consultation_inquiries FOR SELECT
USING (auth.role() = 'service_role');

-- 4) Harden SECURITY DEFINER functions: pinned search_path + service_role-only EXECUTE
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pg_temp;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pg_temp;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pg_temp;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pg_temp;

REVOKE ALL ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint) TO service_role;
