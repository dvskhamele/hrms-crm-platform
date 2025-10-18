#!/bin/bash

# HRMS/CRM Deployment Script
# Ensures onboarding, login, and dashboard are visible without blockages

set -e  # Exit on any error

echo "🚀 Starting HRMS/CRM Deployment Process..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for required tools
echo "🔍 Checking for required tools..."
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install Vercel CLI if not present
if ! command_exists vercel; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ All required tools are available."

# Navigate to frontend directory
cd frontend

echo "🔧 Installing frontend dependencies..."
npm install

echo "⚙️  Building the application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🌐 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo ""
echo "📋 To ensure onboarding, login, and dashboard are visible without blockages:"
echo "   1. Visit the deployment URL provided above"
echo "   2. Check these key pages:"
echo "      - /onboarding (Onboarding flow)"
echo "      - /login (Login page)"
echo "      - /dashboard (Main dashboard)"
echo "      - / (Home page)"
echo "      - /signup (Signup page)"
echo ""
echo "🔍 Make sure all pages render correctly and navigation works properly."
echo "   The action-triggered automation system should be fully functional."