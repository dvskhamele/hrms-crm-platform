#!/bin/bash

# Startup Script for HRMS/CRM Recruitment Platform (Gem)
# This script starts both the backend and frontend servers for the Gem platform

echo "🚀 Starting HRMS/CRM Recruitment Platform (Gem)..."

# Kill any existing processes on our ports
echo "🧹 Cleaning up existing processes..."
pkill -f "node.*server.js" 2>/dev/null
pkill -f "next dev" 2>/dev/null
sleep 2

# Start the backend server
echo "🔧 Starting backend server..."
cd /Users/test/startups/hrmscrm
# Unset PORT to ensure it uses the correct port (3001)
unset PORT
node server.js > backend.log 2>&1 &

# Wait for backend to start
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
echo "🎨 Starting frontend server..."
cd /Users/test/startups/hrmscrm/frontend
PORT=3006 npm run dev > frontend.log 2>&1 &

# Wait for frontend to start
sleep 8

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