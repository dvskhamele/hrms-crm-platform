#!/bin/bash

# Demonstration Script for Gem HRMS/CRM Platform
# Shows how to run the platform in prototype mode for immediate demonstration

echo "🚀 Gem HRMS/CRM Platform Demonstration"
echo "======================================="

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "frontend" ]; then
    echo "❌ Please run this script from the project root directory."
    exit 1
fi

echo "✅ Project structure verified."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js to run the demonstration."
    exit 1
fi

echo "✅ Node.js is available."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm to run the demonstration."
    exit 1
fi

echo "✅ npm is available."

echo ""
echo "🎯 Starting Gem Platform in Prototype Mode..."
echo "   This will enable all features without requiring a backend."
echo ""

# Navigate to frontend directory
cd frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies."
        exit 1
    fi
    echo "✅ Dependencies installed successfully."
fi

echo ""
echo "✨ Starting platform in prototype mode..."
echo "   • No backend required"
echo "   • All features fully functional"
echo "   • Action-triggered automation enabled"
echo "   • Mobile-responsive design"
echo "   • Persistent mock data"
echo ""
echo "🌐 Access the platform at: http://localhost:3000"
echo "   Press CTRL+C to stop the server"
echo ""
echo "📱 Try these actions to see the automation in action:"
echo "   1. Click any KPI on the dashboard to expand it"
echo "   2. Click 'Process All Daily' to update multiple metrics"
echo "   3. Click a candidate card and use the action buttons"
echo "   4. Try bulk operations on the Applications page"
echo "   5. Drag candidates to positions in the Bench Matching system"
echo ""
echo "💡 Notice how each action triggers multiple visible updates!"
echo ""

# Set environment variable and start in prototype mode
NEXT_PUBLIC_PROTOTYPE_MODE=true npm run dev