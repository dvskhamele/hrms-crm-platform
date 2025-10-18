#!/bin/bash

# HRMS/CRM Platform Deployment Script
# This script starts both the backend API server and frontend web server

echo "🚀 Starting HRMS/CRM Recruitment Platform Deployment..."

# Kill any existing processes on our ports
echo "🧹 Cleaning up existing processes..."
pkill -f "node.*3002" 2>/dev/null
pkill -f "serve.*3006" 2>/dev/null
sleep 2

# Install backend dependencies if not already installed
echo "📦 Checking backend dependencies..."
cd /Users/test/startups/hrmscrm
if [ ! -d "node_modules" ]; then
  echo "Installing backend dependencies..."
  npm install
else
  echo "Backend dependencies already installed."
fi

# Start the enhanced backend server with HR operations on port 3002
echo "🔧 Starting backend server with HR operations on port 3002..."
unset PORT  # Ensure PORT environment variable is not set
node backend-api.js > backend-deployment.log 2>&1 &

# Wait a moment for backend to start
sleep 3

# Check if backend started successfully
if lsof -i :3002 >/dev/null; then
    echo "✅ Backend server started successfully on port 3002"
    echo "🔌 HR Operations API endpoints available at http://localhost:3002"
else
    echo "❌ Failed to start backend server on port 3002"
    echo "💡 Check backend-deployment.log for details"
    exit 1
fi

# Install frontend dependencies if not already installed
echo "🎨 Checking frontend dependencies..."
cd /Users/test/startups/hrmscrm/frontend
if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
else
  echo "Frontend dependencies already installed."
fi

# Check if frontend is already built
if [ ! -d "out" ]; then
  echo "🏗️ Building frontend application..."
  npm run build
else
  echo "🏗️ Frontend already built."
fi

# Start the frontend server to serve the built application
echo "🌐 Starting frontend server on port 3006..."
npx serve -p 3006 out > frontend-deployment.log 2>&1 &

# Wait for frontend to start
sleep 5

# Check if frontend started successfully
if lsof -i :3006 >/dev/null; then
    echo "✅ Frontend server started successfully on port 3006"
else
    echo "❌ Failed to start frontend server on port 3006"
    echo "💡 Check frontend-deployment.log for details"
    exit 1
fi

echo ""
echo "🎉 HRMS/CRM Recruitment Platform is now deployed and running!"
echo "🌐 Frontend (Website): http://localhost:3006"
echo "🔌 Backend API: http://localhost:3002"
echo ""
echo "🔐 Default Login Credentials:"
echo "   Email: admin@gem.com"
echo "   Password: password123"
echo ""
echo "📂 Key Directories:"
echo "   Project Root: /Users/test/startups/hrmscrm"
echo "   Frontend Build: /Users/test/startups/hrmscrm/frontend/out"
echo "   Data Storage: /Users/test/startups/hrmscrm/data.json"
echo ""
echo "💼 Key HR Operations Endpoints:"
echo "   - POST /api/hr/operations/application - Process new candidate applications"
echo "   - PUT /api/hr/operations/application/:id/status - Update application status"
echo "   - PUT /api/hr/operations/position/:id/status - Update position status"
echo "   - PUT /api/hr/operations/candidate/:id/status - Update candidate status"
echo "   - GET /api/hr/operations/dashboard-stats - Get HR statistics"
echo ""
echo "✨ Platform Features:"
echo "   - Talent Bench: http://localhost:3006/bench"
echo "   - Candidate Profiles: http://localhost:3006/candidate-profiles"
echo "   - Positions Management: http://localhost:3006/positions"
echo "   - Applications Tracking: http://localhost:3006/applications"
echo "   - Recruiter Performance: http://localhost:3006/recruiter-performance"
echo ""
echo "💡 To stop the servers, run: pkill -f 'node.*backend-api.js' && pkill -f 'serve.*3006'"
echo ""
echo "🚀 Happy recruiting with Gem!"