-- Create listing_requests table
CREATE TABLE listing_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  category_id UUID REFERENCES categories(id),
  town_id UUID REFERENCES towns(id),
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE listing_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the public form)
CREATE POLICY "Allow anonymous insert" ON listing_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Restrict reads to service_role only (admin access)
CREATE POLICY "Service role can read" ON listing_requests
  FOR SELECT
  TO service_role
  USING (true);

-- Service role can update (for changing status)
CREATE POLICY "Service role can update" ON listing_requests
  FOR UPDATE
  TO service_role
  USING (true);
