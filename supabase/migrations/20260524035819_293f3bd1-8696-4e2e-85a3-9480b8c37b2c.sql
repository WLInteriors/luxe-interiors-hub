
CREATE TABLE public.consultation_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.consultation_inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit an inquiry
CREATE POLICY "Anyone can submit inquiries"
ON public.consultation_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No public read access; only service role can read (for backend/admin use)
