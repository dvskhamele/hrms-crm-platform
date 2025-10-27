#!/bin/bash

# Startup script for HRMS/CRM Recruitment Platform (Gem)
# This script starts both the frontend and backend servers

echo "🚀 Starting HRMS/CRM Recruitment Platform (Gem)..."

# Kill any existing processes on our ports
echo "🧹 Cleaning up existing processes..."
pkill -f "node.*3001" 2>/dev/null
pkill -f "node.*3006" 2>/dev/null
sleep 2

# Start the main backend server (Hotel Ops - but we'll use it for Gem too)
echo "🔧 Starting backend server on port 3001..."
cd /Users/test/startups/hrmscrm
PORT=3001 node server.js > backend.log 2>&1 &

# Wait a moment for backend to start
sleep 3

# Check if backend started successfully
if lsof -i :3001 >/dev/null; then
    echo "✅ Backend server started successfully on port 3001"
else
    echo "❌ Failed to start backend server on port 3001"
    echo "💡 Check backend.log for details"
    exit 1
fi

# Start the frontend server
echo "🎨 Starting frontend server on port 3006..."
cd /Users/test/startups/hrmscrm/frontend
npm run dev > frontend.log 2>&1 &

# Wait for frontend to start
sleep 5

# Check if frontend started successfully
if lsof -i :3006 >/dev/null; then
    echo "✅ Frontend server started successfully on port 3006"
else
    echo "❌ Failed to start frontend server on port 3006"
    echo "💡 Check frontend/frontend.log for details"
    exit 1
fi

echo ""
echo "🎉 HRMS/CRM Recruitment Platform (Gem) is now running!"
echo "🌐 Frontend (Website): http://localhost:3006"
echo "🔌 Backend (API): http://localhost:3001"
echo ""
echo "🔐 Default Login Credentials:"
echo "   Email: admin@gem.com"
echo "   Password: password123"
echo ""
echo "✨ Happy recruiting with Gem!"