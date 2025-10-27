#!/bin/bash

# Gem Platform Start Script - Prototype Mode
# Starts the platform with prototype mode enabled for easy demonstration

set -e  # Exit on any error

echo "🚀 Starting Gem HRMS/CRM Platform in Prototype Mode"
echo "==================================================="

# Navigate to project root
cd "$(dirname "$0")"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Not in project root directory. Please run this script from the project root."
    exit 1
fi

# Navigate to frontend directory
cd frontend

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "✨ Starting platform in prototype mode..."
echo "   • No backend required"
echo "   • Full feature set available"
echo "   • Action-triggered automation enabled"
echo "   • Mobile-responsive design"
echo ""
echo "🌐 Access the platform at: http://localhost:3000"
echo "   Press CTRL+C to stop the server"
echo ""

# Start the platform in prototype mode
npm run prototype