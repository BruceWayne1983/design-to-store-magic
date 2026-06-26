
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.email_signups;
CREATE POLICY "Allow anonymous inserts" ON public.email_signups
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND char_length(email) BETWEEN 3 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND source IS NOT NULL
    AND char_length(source) <= 64
  );

DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.product_feedback;
CREATE POLICY "Allow anonymous inserts" ON public.product_feedback
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND char_length(email) BETWEEN 3 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND kind IN ('request','survey')
    AND (name IS NULL OR char_length(name) <= 120)
    AND (source IS NULL OR char_length(source) <= 64)
  );
