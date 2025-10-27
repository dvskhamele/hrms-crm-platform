#!/bin/bash

# Startup Script for HRMS/CRM Recruitment System
# This script initializes and starts the complete system

echo "🚀 Starting HRMS/CRM Recruitment System..."
echo "========================================="

# Check if required tools are installed
echo "🔧 Checking prerequisites..."
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

# Navigate to project directory
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Start Supabase local development stack
echo "🐳 Starting Supabase local development stack..."
npx supabase start

# Apply database migrations
echo "🗄️  Applying database migrations..."
npx supabase migration up

# Initialize database with sample data
echo "📋 Initializing database with sample data..."
./scripts/init-database.sh

# Start development server
echo "🔥 Starting development server..."
echo "   Access the application at: http://localhost:3000"
echo "   Admin dashboard at: http://localhost:3000/dashboard"
echo "   Public job listings at: http://localhost:3000/public/jobs"
echo "   Workshop registration at: http://localhost:3000/workshop/registration"
echo "   Purchase redirection at: http://localhost:3000/purchase"
echo ""
echo "🎉 System startup complete!"
echo "   Press Ctrl+C to stop the development server"

# Run development server in background
npm run dev &

# Wait for user to press Ctrl+C
wait