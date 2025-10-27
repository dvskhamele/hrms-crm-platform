#!/bin/bash

# Quick Start Script for HRMS/CRM Recruitment System

echo "🚀 Starting HRMS/CRM Recruitment System..."

# Check if already running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  System appears to be already running on port 3000"
    echo "Visit: http://localhost:3000"
    exit 0
fi

# Start Supabase if not running
echo "🐳 Starting Supabase..."
npx supabase start

# Wait a moment for Supabase to start
sleep 5

# Apply database migrations
echo "📊 Applying database migrations..."
npx supabase db reset

# Start the Next.js development server
echo "⚡ Starting Next.js development server..."
echo "🌍 Visit http://localhost:3000 when ready"

# Run the development server in the foreground
npm run dev