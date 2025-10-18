#!/bin/bash

# Deployment script for HRMS/CRM Recruitment Platform (Gem) with HR Operations
# This script builds and starts the application with HR operations functionality

echo "🚀 Deploying HRMS/CRM Recruitment Platform (Gem) with HR Operations..."

# Kill any existing processes on our ports
echo "🧹 Cleaning up existing processes..."
pkill -f "node.*3002" 2>/dev/null
pkill -f "node.*3006" 2>/dev/null
sleep 2

# Install backend dependencies if not already installed
echo "📦 Installing backend dependencies..."
cd /Users/test/startups/hrmscrm
npm install

# Start the enhanced backend server with HR operations on port 3002
echo "🔧 Starting enhanced backend server with HR operations on port 3002..."
node backend-api.js > backend-running.log 2>&1 &

# Wait a moment for backend to start
sleep 3

# Check if backend started successfully
if lsof -i :3002 >/dev/null; then
    echo "✅ Backend server started successfully on port 3002"
    echo "🔌 HR Operations API endpoints available at http://localhost:3002"
else
    echo "❌ Failed to start backend server on port 3002"
    echo "💡 Check backend-running.log for details"
    exit 1
fi

# Install frontend dependencies and build the frontend
echo "🎨 Installing frontend dependencies..."
cd /Users/test/startups/hrmscrm/frontend
npm install

echo "🏗️ Building frontend application..."
npm run build

# Start the frontend server to serve the built application
echo "🌐 Starting frontend server on port 3006..."
PORT=3006 npm run start > frontend.log 2>&1 &

# Wait for frontend to start
sleep 5

# Check if frontend started successfully
if lsof -i :3006 >/dev/null; then
    echo "✅ Frontend server started successfully on port 3006"
else
    echo "❌ Failed to start frontend server on port 3006"
    echo "💡 Check frontend.log for details"
    exit 1
fi

echo ""
echo "🎉 HRMS/CRM Recruitment Platform (Gem) with HR Operations is now running!"
echo "🌐 Frontend (Website): http://localhost:3006"
echo "🔌 Backend API: http://localhost:3002"
echo ""
echo "🔐 Default Login Credentials:"
echo "   Email: admin@gem.com"
echo "   Password: password123"
echo ""
echo "💼 Key HR Operations Endpoints:"
echo "   - POST /api/hr/operations/application - Process new candidate applications"
echo "   - PUT /api/hr/operations/application/:id/status - Update application status"
echo "   - PUT /api/hr/operations/position/:id/status - Update position status"
echo "   - PUT /api/hr/operations/candidate/:id/status - Update candidate status"
echo "   - GET /api/hr/operations/dashboard-stats - Get HR statistics"
echo ""
echo "✨ Happy recruiting with Gem!"
echo ""
echo "💡 To access the Talent Bench: http://localhost:3006/bench"
echo "💡 To access the Public Talent Bench: http://localhost:3006/public/bench"