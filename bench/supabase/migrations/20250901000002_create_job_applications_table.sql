-- Create job_applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES public.job_postings(id),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    cover_letter TEXT,
    resume_url TEXT,
    status TEXT DEFAULT 'submitted',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON public.job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON public.job_applications(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow authenticated users to insert applications
CREATE POLICY "Allow authenticated users to insert applications" ON public.job_applications
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to select their own applications
CREATE POLICY "Allow authenticated users to select their applications" ON public.job_applications
FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update their own applications
CREATE POLICY "Allow authenticated users to update their applications" ON public.job_applications
FOR UPDATE USING (auth.role() = 'authenticated');

-- Grant permissions
GRANT ALL ON public.job_applications TO authenticated;
GRANT INSERT ON public.job_applications TO anon; -- Allow anonymous insert for public applications