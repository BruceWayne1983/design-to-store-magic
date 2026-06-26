CREATE TABLE public.product_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('request','survey')),
  name text,
  email text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.product_feedback TO anon, authenticated;
GRANT ALL ON public.product_feedback TO service_role;
ALTER TABLE public.product_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts" ON public.product_feedback FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "No public reads" ON public.product_feedback FOR SELECT USING (false);