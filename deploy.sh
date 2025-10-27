#!/bin/bash

# HRMS/CRM Platform Deployment Script
# Deploys both frontend and backend applications to production

set -e  # Exit on any error

echo "🚀 Starting HRMS/CRM Platform Deployment Process..."
echo "==================================================="

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

# Function to deploy frontend
deploy_frontend() {
    echo "🌐 Deploying Frontend Application..."
    echo "-------------------------------------"
    
    if [ ! -d "frontend" ]; then
        echo "❌ Frontend directory not found"
        exit 1
    fi
    
    cd frontend
    
    echo "🔧 Installing frontend dependencies..."
    npm install
    
    echo "⚙️  Building the frontend application..."
    npm run build
    
    # Check if build was successful
    if [ $? -eq 0 ]; then
        echo "✅ Frontend build successful!"
    else
        echo "❌ Frontend build failed!"
        exit 1
    fi
    
    echo "🌐 Deploying frontend to Vercel..."
    vercel --prod --confirm
    
    cd ..
}

# Function to deploy backend
deploy_backend() {
    echo "🔗 Deploying Backend API..."
    echo "---------------------------------"
    
    if [ ! -d "backend" ]; then
        echo "❌ Backend directory not found"
        exit 1
    fi
    
    cd backend
    
    echo "🔧 Installing backend dependencies..."
    npm install
    
    echo "🌐 Deploying backend API to Vercel..."
    vercel --prod --confirm
    
    cd ..
}

# Main deployment process
echo "📋 Deployment Plan:"
echo "   1. Frontend: HR/Gem Recruitment Platform (React/Next.js)"
echo "   2. Backend: Node.js API Server with HR and Hotel Operations"
echo ""

read -p "Do you want to deploy both frontend and backend? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Confirm environment variables
    echo ""
    echo "📋 Environment Variables Check:"
    echo "   Make sure you have set up your environment variables correctly"
    echo "   For backend: PMS_API_URL, PMS_API_KEY (if needed)"
    echo "   For deployment: Vercel account linked"
    echo ""
    
    echo "🌐 Linking Vercel account..."
    vercel login
    
    # Deploy backend first
    deploy_backend
    
    # Deploy frontend
    deploy_frontend
    
    echo ""
    echo "🎉 Deployment complete!"
    echo ""
    echo "📋 Post-deployment checklist:"
    echo "   1. Visit your deployed frontend URL"
    echo "   2. Ensure the login page is accessible at /login"
    echo "   3. Test the following key pages:"
    echo "      - / (Home page)"
    echo "      - /login (Login page)"
    echo "      - /role-select (Role selection page)"
    echo "      - /dashboard (Main dashboard)"
    echo "      - /onboarding (Onboarding flow)"
    echo "   4. Verify that all pages render correctly"
    echo "   5. Test that navigation works properly"
    echo ""
    echo "💡 Note: The API endpoints will be available at your Vercel domain + /api/*"
    echo "   Example API endpoints:"
    echo "   - POST /api/auth/login (Login)"
    echo "   - GET /api/dashboard/stats (Dashboard stats)"
    echo "   - GET /api/positions (Recruitment positions)"
    echo "   - GET /api/rooms (Hotel rooms)"
    echo "   - GET /api/requests (Hotel requests)"
    echo ""
    echo "🔐 Default login credentials:"
    echo "   - Admin: admin@gem.com / password123"
    echo "   - HR Manager: david.wilson@gem.com / password123"
    echo "   - Recruiter: alice.johnson@gem.com / password123"
    echo "   - Candidate: john.doe@example.com / password123"
else
    echo ""
    echo "❌ Deployment cancelled by user."
    exit 1
fi