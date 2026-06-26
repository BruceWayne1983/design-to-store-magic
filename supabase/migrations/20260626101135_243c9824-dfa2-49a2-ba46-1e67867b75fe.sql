CREATE TABLE public.product_reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_slug text NOT NULL,
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text,
  body text NOT NULL,
  reviewer_name text NOT NULL,
  reviewer_email text NOT NULL,
  verified boolean NOT NULL DEFAULT false,
  approved boolean NOT NULL DEFAULT false,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT reviewer_email_format CHECK (reviewer_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  CONSTRAINT body_length CHECK (char_length(body) BETWEEN 10 AND 4000),
  CONSTRAINT title_length CHECK (title IS NULL OR char_length(title) <= 200),
  CONSTRAINT reviewer_name_length CHECK (char_length(reviewer_name) BETWEEN 1 AND 120),
  CONSTRAINT product_slug_length CHECK (char_length(product_slug) BETWEEN 1 AND 120)
);

CREATE INDEX product_reviews_slug_approved_idx ON public.product_reviews (product_slug, approved, created_at DESC);

GRANT SELECT, INSERT ON public.product_reviews TO anon;
GRANT SELECT, INSERT ON public.product_reviews TO authenticated;
GRANT ALL ON public.product_reviews TO service_role;

ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read approved reviews"
  ON public.product_reviews FOR SELECT
  TO anon, authenticated
  USING (approved = true);

CREATE POLICY "Authenticated can read own reviews"
  ON public.product_reviews FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Anyone can submit a review"
  ON public.product_reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    approved = false
    AND verified = false
    AND (user_id IS NULL OR user_id = auth.uid())
  );

CREATE TRIGGER trg_product_reviews_updated_at
  BEFORE UPDATE ON public.product_reviews
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
