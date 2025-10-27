-- Create job_postings table
CREATE TABLE IF NOT EXISTS public.job_postings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT NOT NULL,
    experience TEXT NOT NULL,
    location TEXT NOT NULL,
    employment_type TEXT,
    salary_min INTEGER,
    salary_max INTEGER,
    benefits TEXT,
    start_date DATE,
    application_deadline DATE,
    responsibilities TEXT,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access for published jobs
CREATE POLICY "Allow public read access to published jobs" ON public.job_postings
FOR SELECT USING (status = 'published');

-- Create policy to allow authenticated users to insert/update jobs
CREATE POLICY "Allow authenticated users to manage jobs" ON public.job_postings
FOR ALL USING (auth.role() = 'authenticated');

-- Grant permissions
GRANT SELECT ON public.job_postings TO anon;
GRANT ALL ON public.job_postings TO authenticated;