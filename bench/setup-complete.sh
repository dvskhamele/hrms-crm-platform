#!/bin/bash

# Complete setup script for the HRMS/CRM Recruitment System
# This script initializes the database, starts the development server, and provides instructions

set -e

echo "🚀 Starting complete setup for HRMS/CRM Recruitment System..."

# Check if required tools are installed
echo "🔍 Checking prerequisites..."

if ! command -v node >/dev/null 2>&1; then
    echo "❌ Node.js is not installed. Please install Node.js v18+"
    exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
    echo "❌ npm is not installed. Please install Node.js (which includes npm)"
    exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
    echo "❌ Docker is not installed. Please install Docker Desktop"
    exit 1
fi

echo "✅ All prerequisites found"

# Navigate to the project directory
cd "$(dirname "$0")/.."

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# Start Supabase local development stack
echo "🐳 Starting Supabase local development stack..."
npx supabase start

# Initialize database with all tables
echo "📊 Initializing database with required tables..."
npx supabase migration up

# Create storage bucket for resumes
echo "📁 Creating storage bucket for resumes..."
npx supabase sql -f <<EOF
DO \$$
BEGIN
  IF NOT EXISTS (SELECT FROM storage.buckets WHERE id = 'resumes') THEN
    INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);
  END IF;
END
\$$;
EOF

# Insert sample data
echo "📋 Inserting sample data..."

# Insert sample bench profiles
npx supabase sql -f <<EOF
INSERT INTO public.bench_list (name, title, experience, skills, monthly_rate, resume_link, market_rate) VALUES
('Pranay Singhal', 'Salesforce Developer', '5 years', ARRAY['Salesforce Developer'], 'On Request', 'Profile on Request', '80,000'),
('Bhavesh Mistry', 'Full Stack Designer', '4 years', ARRAY['Design', 'Bootstrap', 'Tailwind CSS', 'Material UI', 'Responsive Design', 'Animations', 'Figma', 'Photoshop', 'Adobe XD', 'React.js', 'Ruby on Rails', '.NET', 'Angular'], 'On Request', 'Profile on Request', '75,000'),
('Sagar Shinde', 'Senior Java Developer', '3 years', ARRAY['Core Java', 'Spring', 'Spring Boot', 'REST API', 'Spring Data JPA', 'Hibernate', 'JPA', 'MySQL', 'Kafka', 'Redis', 'AWS', 'Spring Security'], 'On Request', 'Profile on Request', '70,000'),
('Abhishek Parihar', 'Full Stack Java/Python Developer', '6 years', ARRAY['Java', 'Spring', 'Spring Boot', 'REST API', 'Spring Data JPA', 'Hibernate', 'JPA', 'MySQL', 'Kafka', 'Redis', 'AWS', 'Spring Security', 'Python3', 'Django', 'Rest Framework', 'Git', 'Bit-bucket', 'SQLite', 'Slack', 'JIRA', 'Scrum', 'Kan-ban'], 'On Request', 'https://docs.google.com/document/d/10Xpu8R1Zy7rfCIKRHIrzpDJKhoOfOTz8n084f5pK5BI/edit', '120,000'),
('Shikha Gupta', 'Marketing Specialist', '2 years', ARRAY['Marketing'], 'On Request', 'Profile on Request', '50,000'),
('Aishwarya Kulkarni', 'UI/UX Designer', '5 years', ARRAY['Product Designer', 'UI/UX', 'Graphics Design', 'Figma', 'XD', 'Davanci Resolve', 'UIZARD', 'Zeplin', 'Photoshop', 'Illustrator', 'Canva'], 'On Request', 'Profile on Request', '90,000');
EOF

# Insert sample job postings
npx supabase sql -f <<EOF
INSERT INTO public.job_postings (id, title, department, description, requirements, experience, location, employment_type, salary_min, salary_max, benefits, responsibilities, status) VALUES
(gen_random_uuid(), 'Senior Software Engineer', 'Technology', 'We are looking for a Senior Software Engineer to join our dynamic technology team.', '5+ years of experience in software development, Expertise in JavaScript, React, and Node.js, Experience with cloud technologies (AWS, Azure, or GCP)', 'Senior Level (5+ years)', 'San Francisco, CA', 'Full-time', 120000, 160000, 'Health insurance, 401(k) matching, Unlimited PTO, Remote work options', 'Design and implement scalable software solutions, Collaborate with cross-functional teams, Write clean, maintainable code, Participate in code reviews', 'published'),
(gen_random_uuid(), 'Marketing Manager', 'Marketing', 'We are looking for a Marketing Manager to lead our marketing efforts and drive growth through innovative campaigns.', '3-5 years of marketing experience, Bachelor''s degree in Marketing or related field, Experience with digital marketing tools, Strong analytical skills', 'Mid Level (2-5 years)', 'New York, NY', 'Full-time', 85000, 110000, 'Health insurance, Performance bonuses, Flexible schedule', 'Develop and execute marketing strategies, Manage marketing campaigns, Analyze marketing data and performance, Collaborate with sales team', 'published');
EOF

echo "✅ Sample data insertion completed"

# Display setup information
echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📊 Database Info:"
echo "   - Supabase URL: http://localhost:54321"
echo "   - Supabase Studio: http://localhost:54323"
echo "   - API URL: http://localhost:54321/rest/v1/"
echo ""
echo "📁 Storage Buckets:"
echo "   - resumes: For storing candidate resumes"
echo ""
echo "📄 Tables created:"
echo "   - bench_list: For talent bench profiles"
echo "   - job_postings: For job listings"
echo "   - job_applications: For job applications (will be created when first application is submitted)"
echo ""
echo "🚀 To start the development server:"
echo "   Run: npm run dev"
echo "   Then visit: http://localhost:3000"
echo ""
echo "🔧 Admin Dashboard:"
echo "   Visit: http://localhost:3000/dashboard"
echo ""
echo "💼 Public Job Listings:"
echo "   Visit: http://localhost:3000/public/jobs"
echo ""
echo "📝 Job Posting Page:"
echo "   Visit: http://localhost:3000/job-posting"
echo ""
echo "👥 Talent Bench:"
echo "   Visit: http://localhost:3000/bench"
echo ""