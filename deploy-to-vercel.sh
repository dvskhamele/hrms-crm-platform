#!/bin/bash

# HRMS Platform Vercel Deployment Script
# This script helps deploy the HRMS Platform application to Vercel

echo "🏢 HRMS Platform Vercel Deployment Script"
echo "==========================================="

# Check if we're in the right directory
BASE_DIR="/Users/test/startups/hrmscrm"
if [ ! -d "$BASE_DIR" ]; then
    echo "❌ Error: HRMS Platform directory not found at $BASE_DIR"
    exit 1
fi

cd "$BASE_DIR"

echo "📍 Working directory: $(pwd)"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Error: Vercel CLI is not installed"
    echo ""
    echo "Please install Vercel CLI by running:"
    echo "  npm install -g vercel"
    echo ""
    echo "Or visit https://vercel.com/cli for installation instructions"
    exit 1
fi

echo "✅ Vercel CLI version: $(vercel --version)"
echo ""

# Check if required files exist
REQUIRED_FILES=("package.json" "frontend/package.json" "backend/package.json" "vercel.json")
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Error: Required file '$file' not found"
        exit 1
    fi
done

echo "✅ All required files found"
echo ""

# Login to Vercel (if not already logged in)
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "You need to login to Vercel first:"
    vercel login
    if [ $? -ne 0 ]; then
        echo "❌ Error: Failed to login to Vercel"
        exit 1
    fi
    echo ""
fi

echo "✅ Successfully authenticated with Vercel"
echo ""

# Deploy to Vercel
echo "🚀 Deploying HRMS Platform to Vercel..."
echo ""
echo "This will deploy both the frontend and backend:"
echo "  • Frontend: Next.js application"
echo "  • Backend: Node.js API server"
echo ""
echo "Press Enter to continue or Ctrl+C to cancel..."
read

echo "📤 Starting deployment..."
echo ""

# Deploy the entire project
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ HRMS Platform deployed successfully to Vercel!"
    echo ""
    echo "💡 Next steps:"
    echo "  • Visit your deployed application URL"
    echo "  • Configure environment variables in Vercel dashboard if needed"
    echo "  • Set up custom domain if desired"
    echo ""
else
    echo ""
    echo "❌ Error: Failed to deploy HRMS Platform to Vercel"
    echo ""
    echo "💡 Troubleshooting tips:"
    echo "  • Check your internet connection"
    echo "  • Verify Vercel authentication"
    echo "  • Check for any error messages above"
    echo "  • Ensure all required files are present"
    exit 1
fi