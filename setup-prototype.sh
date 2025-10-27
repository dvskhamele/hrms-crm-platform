#!/bin/bash

# Gem Platform Deployment Script
# This script deploys the platform with prototype mode enabled by default
# for easy demonstration and testing without backend requirements

set -e  # Exit on any error

echo "🚀 Gem HRMS/CRM Platform Deployment Script"
echo "============================================="

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

echo "✅ All required tools are available."

# Navigate to project root
cd "$(dirname "$0")"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Not in project root directory. Please run this script from the project root."
    exit 1
fi

echo "📁 Project directory verified."

# Check if frontend directory exists
if [ ! -d "frontend" ]; then
    echo "❌ Frontend directory not found!"
    exit 1
fi

echo "✨ Setting up prototype mode by default..."

# Create .env.local file with prototype mode enabled
cat > frontend/.env.local << EOF
# Gem Platform Environment Configuration
# Prototype Mode Enabled by Default

# Enable prototype mode - when true, app works without backend
NEXT_PUBLIC_PROTOTYPE_MODE=true

# API configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Development environment
NODE_ENV=development

# Mock data behavior
MOCK_DELAY_MIN=200
MOCK_DELAY_MAX=500

# Feature flags
FEATURE_NOTIFICATIONS=true
FEATURE_DASHBOARD=true
FEATURE_APPLICATIONS=true
FEATURE_POSITIONS=true
FEATURE_RECRUITERS=true
FEATURE_ANALYTICS=true
FEATURE_SCREENING=true
FEATURE_SCHEDULING=true
FEATURE_BENCH_MATCHING=true

# UI behavior
RESPONSIVE_ENABLED=true
MOBILE_OPTIMIZED=true
TOUCH_ENABLED=true
ANIMATION_ENABLED=true

# Storage
STORAGE_TYPE=localStorage
STORAGE_PERSISTENCE=true

# Performance
CACHE_ENABLED=true
CACHE_TTL=300000

# Security
SECURITY_MOCK_AUTH=true
SECURITY_TOKEN_EXPIRY=3600000

# Logging
LOG_LEVEL=info
LOG_MOCK_REQUESTS=true
EOF

echo "✅ Prototype mode configuration created."

# Navigate to frontend directory
cd frontend

echo "📦 Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully!"
else
    echo "❌ Failed to install frontend dependencies!"
    exit 1
fi

echo "🏗️  Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Application built successfully!"
else
    echo "❌ Failed to build the application!"
    exit 1
fi

echo ""
echo "🎉 Deployment Preparation Complete!"
echo "===================================="
echo ""
echo "The Gem platform is now ready for deployment with prototype mode enabled."
echo ""
echo "🚀 To start the platform in prototype mode:"
echo "   cd frontend && npm run prototype"
echo ""
echo "📝 To start the platform in development mode (with backend):"
echo "   cd frontend && npm run dev"
echo ""
echo "🌐 To start the platform in production mode:"
echo "   cd frontend && npm start"
echo ""
echo "📱 Prototype Mode Features:"
echo "   • No backend required"
echo "   • Full feature set available"
echo "   • Action-triggered automation system"
echo "   • Mobile-responsive design"
echo "   • Persistent mock data (localStorage)"
echo "   • One-tap multi-outcome actions"
echo ""
echo "📋 For more information about prototype mode, see PROTOTYPE_MODE.md"
echo ""