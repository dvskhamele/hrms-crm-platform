-- Create bench_list table
CREATE TABLE IF NOT EXISTS public.bench_list (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    experience TEXT NOT NULL,
    skills TEXT[] DEFAULT '{}',
    monthly_rate TEXT DEFAULT 'On Request',
    resume_link TEXT,
    market_rate TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.bench_list ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON public.bench_list
FOR SELECT USING (true);

-- Grant permissions
GRANT SELECT ON public.bench_list TO anon;
GRANT ALL ON public.bench_list TO authenticated;

-- Insert sample data
INSERT INTO public.bench_list (name, title, experience, skills, monthly_rate, resume_link, market_rate) VALUES
('Pranay Singhal', 'Salesforce Developer', '5 years', ARRAY['Salesforce Developer'], 'On Request', 'Profile on Request', '80,000'),
('Bhavesh Mistry', 'Full Stack Designer', '4 years', ARRAY['Design', 'Bootstrap', 'Tailwind CSS', 'Material UI', 'Responsive Design', 'Animations', 'Figma', 'Photoshop', 'Adobe XD', 'React.js', 'Ruby on Rails', '.NET', 'Angular'], 'On Request', 'Profile on Request', '75,000'),
('Sagar Shinde', 'Senior Java Developer', '3 years', ARRAY['Core Java', 'Spring', 'Spring Boot', 'REST API', 'Spring Data JPA', 'Hibernate', 'JPA', 'MySQL', 'Kafka', 'Redis', 'AWS', 'Spring Security'], 'On Request', 'Profile on Request', '70,000'),
('Abhishek Parihar', 'Full Stack Java/Python Developer', '6 years', ARRAY['Java', 'Spring', 'Spring Boot', 'REST API', 'Spring Data JPA', 'Hibernate', 'JPA', 'MySQL', 'Kafka', 'Redis', 'AWS', 'Spring Security', 'Python3', 'Django', 'Rest Framework', 'Git', 'Bit-bucket', 'SQLite', 'Slack', 'JIRA', 'Scrum', 'Kan-ban'], 'On Request', 'https://docs.google.com/document/d/10Xpu8R1Zy7rfCIKRHIrzpDJKhoOfOTz8n084f5pK5BI/edit', '120,000'),
('Shikha Gupta', 'Marketing Specialist', '2 years', ARRAY['Marketing'], 'On Request', 'Profile on Request', '50,000'),
('Aishwarya Kulkarni', 'UI/UX Designer', '5 years', ARRAY['Product Designer', 'UI/UX', 'Graphics Design', 'Figma', 'XD', 'Davanci Resolve', 'UIZARD', 'Zeplin', 'Photoshop', 'Illustrator', 'Canva'], 'On Request', 'Profile on Request', '90,000');