#!/bin/bash

# GitHub Repository Creation and Push Script
# Creates a new private GitHub repository and pushes the code

set -e  # Exit on any error

echo "🐙 GitHub Repository Creation and Push Script"
echo "=============================================="

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for required tools
echo "🔍 Checking for required tools..."

if ! command_exists gh; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "   Please install GitHub CLI first: https://cli.github.com/"
    exit 1
fi

if ! command_exists git; then
    echo "❌ Git is not installed."
    echo "   Please install Git first."
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

# Authenticate with GitHub (if not already authenticated)
echo "🔐 Checking GitHub authentication..."
if ! gh auth status >/dev/null 2>&1; then
    echo "⚠️  Not authenticated with GitHub. Initiating authentication..."
    gh auth login
fi

# Get repository details
echo ""
echo "📋 Repository Details"
echo "====================="
read -p "GitHub username/organization: " github_user
read -p "Repository name (default: hrms-crm-platform): " repo_name
repo_name=${repo_name:-hrms-crm-platform}
read -p "Repository description (optional): " repo_description

# Create the repository
echo ""
echo "🚀 Creating private repository..."
if [ -n "$repo_description" ]; then
    gh repo create "$github_user/$repo_name" --private --description "$repo_description" --clone
else
    gh repo create "$github_user/$repo_name" --private --clone
fi

# Check if repository was created successfully
if [ $? -eq 0 ]; then
    echo "✅ Repository created successfully!"
else
    echo "❌ Failed to create repository!"
    exit 1
fi

# Navigate to the cloned repository
if [ -d "$repo_name" ]; then
    cd "$repo_name"
    echo "📁 Navigated to repository directory."
else
    echo "❌ Repository directory not found!"
    exit 1
fi

# Copy all files from the parent directory (assuming this script is in the project root)
echo "📦 Preparing files for commit..."
cd ..
# Copy all files except the .git directory and the script itself
find . -maxdepth 1 -not -name "." -not -name ".." -not -name ".git" -exec cp -r {} "$repo_name"/ \;

# Also copy hidden files (starting with .) except .git
find . -maxdepth 1 -name ".*" -not -name "." -not -name ".." -not -name ".git" -exec cp -r {} "$repo_name"/ \; 2>/dev/null || true

cd "$repo_name"

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    git remote add origin "https://github.com/$github_user/$repo_name.git"
fi

# Add all files
echo "➕ Adding files to repository..."
git add .

# Check if there are files to commit
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Creating initial commit..."
    git commit -m "Initial commit: Complete HRMS/CRM platform with action-triggered automation
    
    Features:
    - Full dashboard with expandable KPIs
    - Candidate management with one-tap operations
    - Position management with status updates
    - Recruiter management with auto-updates
    - Analytics with instant refresh
    - Screening & scheduling automation
    - Bench matching system
    - Mobile-responsive design
    - Prototype mode for offline use
    - Action-triggered automation system"
    
    if [ $? -eq 0 ]; then
        echo "✅ Initial commit created successfully!"
    else
        echo "❌ Failed to create initial commit!"
        exit 1
    fi
else
    echo "ℹ️  No changes to commit."
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Code successfully pushed to GitHub!"
else
    echo "❌ Failed to push code to GitHub!"
    exit 1
fi

echo ""
echo "🎉 Repository Creation and Push Complete!"
echo "========================================="
echo ""
echo "Repository: https://github.com/$github_user/$repo_name"
echo "Description: $repo_description"
echo ""
echo "The HRMS/CRM platform has been successfully pushed to your private GitHub repository."
echo ""
echo "🚀 To get started with the platform:"
echo "   1. Clone the repository:"
echo "      git clone https://github.com/$github_user/$repo_name.git"
echo "   2. Navigate to the frontend directory:"
echo "      cd $repo_name/frontend"
echo "   3. Install dependencies:"
echo "      npm install"
echo "   4. Start in prototype mode (no backend required):"
echo "      npm run prototype"
echo ""
echo "📝 For more information about prototype mode, see PROTOTYPE_MODE.md"
echo ""