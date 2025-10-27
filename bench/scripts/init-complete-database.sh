#!/bin/bash

# Script to initialize the Supabase database with all required tables
# This script should be run after starting the Supabase local development stack

echo "Initializing Supabase database with all required tables..."

# Apply all migrations
echo "Applying migrations..."
npx supabase migration up

# Create storage bucket for resumes if it doesn't exist
echo "Creating storage bucket for resumes..."
npx supabase sql -f <<EOF
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM storage.buckets WHERE id = 'resumes') THEN
    INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);
  END IF;
END
\$\$;
EOF

# Restart Supabase to ensure all changes are applied
echo "Restarting Supabase..."
npx supabase restart

echo "Database initialization complete!"
echo "The following tables have been created:"
echo "- bench_list (for talent bench)"
echo "- job_postings (for job listings)"
echo "- job_applications (for job applications)"
echo "A storage bucket 'resumes' has been created for resume uploads."