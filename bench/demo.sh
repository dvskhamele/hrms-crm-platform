#!/bin/bash

# Demonstration Script for the HRMS/CRM Recruitment System
# This script showcases the key features of the system

echo "🚀 Starting HRMS/CRM Recruitment System Demonstration"

# Check if the system is running
echo "🔍 Checking if the system is running..."

# Try to access the main page
curl -s http://localhost:3000 > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "⚠️  System is not running. Please start it with 'npm run dev'"
    read -p "Would you like to start the system now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🚀 Starting development server..."
        npm run dev &
        sleep 10
    else
        echo "❌ Please start the system manually before running this demo"
        exit 1
    fi
fi

echo "✅ System is running"

# Demonstrate public job listings
echo ""
echo "💼 Public Job Listings"
echo "======================="
echo "Visit: http://localhost:3000/public/jobs"
echo "Feature: Anyone can view job listings without logging in"
echo "Benefit: Increases job visibility and application rates"

# Demonstrate job application without account
echo ""
echo "📝 Apply Without Account"
echo "========================"
echo "Visit: http://localhost:3000/apply/sample-job-id"
echo "Feature: Candidates can apply directly without creating an account"
echo "Benefit: Eliminates application barriers and increases conversion"

# Demonstrate talent bench
echo ""
echo "👥 Talent Bench Management"
echo "==========================="
echo "Visit: http://localhost:3000/bench"
echo "Feature: Pre-vetted talent pool with skill-based filtering"
echo "Benefit: Faster candidate matching for urgent requirements"

# Demonstrate job posting
echo ""
echo "📢 Job Posting"
echo "==============="
echo "Visit: http://localhost:3000/job-posting"
echo "Feature: Single interface to post to multiple platforms"
echo "Benefit: Saves time and ensures consistent job listings"

# Demonstrate employer dashboard
echo ""
echo "📊 Employer Dashboard"
echo "====================="
echo "Visit: http://localhost:3000/dashboard"
echo "Feature: Centralized view of all recruitment activities"
echo "Benefit: Streamlined hiring process with real-time analytics"

# Demonstrate key integration points
echo ""
echo "🔗 Integration Points"
echo "===================="
echo "1. LinkedIn - Professional networking and job posting"
echo "2. Indeed - Mass job distribution"
echo "3. Unstop - Campus recruitment platform"
echo "4. WhatsApp Communities - Direct candidate engagement"
echo "5. Calendly - Interview scheduling"
echo "6. Email Providers - Automated communication sequences"

# Demonstrate the end-to-end workflow
echo ""
echo "🔄 End-to-End Workflow"
echo "======================="
echo "1. Employer posts job → Multiple platforms"
echo "2. Candidates view job → Apply without account"
echo "3. Applications received → Processed in dashboard"
echo "4. Qualified candidates → Moved to talent bench"
echo "5. Future requirements → Matched with bench talent"
echo "6. Interviews scheduled → Via integrated calendar"
echo "7. Offers extended → Through system tracking"

# Demonstrate key benefits
echo ""
echo "🏆 Key Benefits"
echo "==============="
echo "✅ No account required for candidates to apply"
echo "✅ Single dashboard for multi-platform job posting"
echo "✅ Real-time application tracking"
echo "✅ Talent bench for faster hiring"
echo "✅ Integrated communication tools"
echo "✅ Automated workflows to save time"

# Demonstrate ease of use
echo ""
echo "🎯 Ease of Use"
echo "============="
echo "→ Everything works without complex setup"
echo "→ No coding required for basic operations"
echo "→ Intuitive interfaces for all user types"
echo "→ Mobile-responsive design"
echo "→ Contextual help throughout the system"

echo ""
echo "🏁 Demonstration Complete!"
echo "=========================="
echo "For detailed documentation, see: README.md"
echo "For setup instructions, run: ./setup-complete.sh"
echo ""
echo "Need help? Contact: hr@signimus.com"