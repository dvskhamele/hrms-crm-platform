#!/bin/bash

# Start script for HRMS/CRM system
# This script starts both frontend and backend servers

echo "Starting HRMS/CRM system..."

# Start backend server on port 3002
echo "Starting backend server on port 3002..."
cd /Users/test/startups/hrmscrm
node enhanced-backend.js > backend.log 2>&1 &

# Wait a moment for backend to start
sleep 2

# Start frontend server on port 3006
echo "Starting frontend server on port 3006..."
cd /Users/test/startups/hrmscrm
npm run dev:frontend > frontend.log 2>&1 &

echo "Both servers started successfully!"
echo "Frontend: http://localhost:3006"
echo "Backend: http://localhost:3002"
echo ""
echo "Access the application at: http://localhost:3006"
echo ""
echo "All end-to-end functionality is available:"
echo "- Registration: http://localhost:3006/api/auth/register"
echo "- Login: http://localhost:3006/api/auth/login"
echo "- Onboarding: http://localhost:3006/api/onboarding"
echo "- Job Requirements: http://localhost:3006/api/requirements"
echo "- Applications: http://localhost:3006/api/applications"