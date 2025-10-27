#!/bin/bash

# Deployment script for HRMS/CRM Platform to Vercel

echo "Starting deployment preparation..."

# Navigate to the frontend directory
cd /Users/test/startups/hrmscrm/frontend

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "Error: package.json not found. Please run this script from the project root."
  exit 1
fi

echo "Installing dependencies..."
npm install

# Check for build errors
echo "Running build check..."
npm run build

if [ $? -ne 0 ]; then
  echo "Error: Build failed. Please check the errors above."
  exit 1
fi

echo "Build successful!"

# Create necessary environment files if they don't exist
if [ ! -f ".env.production" ]; then
  echo "Creating .env.production file..."
  echo "NEXT_PUBLIC_APP_NAME=HRMS CRM Platform" > .env.production
  echo "NEXT_PUBLIC_APP_DESCRIPTION=AI-first all-in-one recruiting platform" >> .env.production
fi

# Ensure all necessary directories exist
mkdir -p public/locales/en
mkdir -p public/locales/hi

# Check if translation files exist, create if not
if [ ! -f "public/locales/en/common.json" ]; then
  echo "Creating English translation file..."
  echo '{"platform": "Platform", "dashboard": "Dashboard", "candidates": "Candidates"}' > public/locales/en/common.json
fi

if [ ! -f "public/locales/hi/common.json" ]; then
  echo "Creating Hindi translation file..."
  echo '{"platform": "प्लेटफॉर्म", "dashboard": "डैशबोर्ड", "candidates": "उम्मीदवार"}' > public/locales/hi/common.json
fi

echo "Deployment preparation complete!"
echo ""
echo "To deploy to Vercel:"
echo "1. Install Vercel CLI: npm install -g vercel"
echo "2. Login to Vercel: vercel login"
echo "3. Deploy: vercel --prod"
echo ""
echo "Note: Make sure to set up your environment variables in Vercel dashboard."

# Show current directory and files
echo ""
echo "Current directory: $(pwd)"
echo "Project files:"
ls -la