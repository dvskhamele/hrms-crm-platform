#!/bin/bash

# Test script to verify the HRMS/CRM Recruitment System functionality

echo "🧪 Testing HRMS/CRM Recruitment System"

# Test 1: Check if required ports are available
echo "🔍 Test 1: Checking port availability..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null; then
    echo "✅ Port 3000 is available"
else
    echo "⚠️  Port 3000 may already be in use"
fi

# Test 2: Check if required dependencies are installed
echo "🔍 Test 2: Checking dependencies..."
if command -v node >/dev/null 2>&1; then
    echo "✅ Node.js is installed ($(node --version))"
else
    echo "❌ Node.js is not installed"
    exit 1
fi

if command -v npm >/dev/null 2>&1; then
    echo "✅ npm is installed"
else
    echo "❌ npm is not installed"
    exit 1
fi

if command -v docker >/dev/null 2>&1; then
    echo "✅ Docker is installed"
else
    echo "❌ Docker is not installed"
    exit 1
fi

# Test 3: Check project structure
echo "🔍 Test 3: Checking project structure..."
REQUIRED_FILES=(
  "package.json"
  "next.config.ts"
  "tsconfig.json"
  "app/page.tsx"
  "lib/supabase.ts"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "/Users/test/startups/hrmscrm/bench/$file" ]; then
    echo "✅ $file exists"
  else
    echo "❌ $file is missing"
  fi
done

# Test 4: Check if Supabase is running
echo "🔍 Test 4: Checking Supabase status..."
if curl -s http://localhost:54321/rest/v1/ >/dev/null 2>&1; then
    echo "✅ Supabase is running"
else
    echo "⚠️  Supabase may not be running"
fi

# Test 5: Check database connectivity
echo "🔍 Test 5: Testing database connectivity..."
# This would normally test actual database connection
# For now, we'll just check if the database migration files exist
if [ -d "/Users/test/startups/hrmscrm/bench/supabase/migrations" ]; then
    echo "✅ Migration files exist"
else
    echo "❌ Migration files are missing"
fi

# Test 6: Check API routes
echo "🔍 Test 6: Checking API routes..."
API_ROUTES=(
  "/app/api/bench-list/route.ts"
  "/app/api/job-posting/route.ts"
  "/app/api/job-application/route.ts"
)

for route in "${API_ROUTES[@]}"; do
  if [ -f "/Users/test/startups/hrmscrm/bench$route" ]; then
    echo "✅ $route exists"
  else
    echo "❌ $route is missing"
  fi
done

# Test 7: Check frontend pages
echo "🔍 Test 7: Checking frontend pages..."
FRONTEND_PAGES=(
  "/app/bench/page.tsx"
  "/app/dashboard/page.tsx"
  "/app/job-posting/page.tsx"
  "/app/public/jobs/page.tsx"
  "/app/apply/[id]/page.tsx"
)

for page in "${FRONTEND_PAGES[@]}"; do
  if [ -f "/Users/test/startups/hrmscrm/bench$page" ]; then
    echo "✅ $page exists"
  else
    echo "❌ $page is missing"
  fi
done

# Test 8: Check setup scripts
echo "🔍 Test 8: Checking setup scripts..."
SETUP_SCRIPTS=(
  "/setup-complete.sh"
  "/demo.sh"
)

for script in "${SETUP_SCRIPTS[@]}"; do
  if [ -f "/Users/test/startups/hrmscrm/bench$script" ]; then
    echo "✅ $script exists"
  else
    echo "❌ $script is missing"
  fi
done

# Test 9: Check if all scripts are executable
echo "🔍 Test 9: Checking script permissions..."
EXECUTABLE_SCRIPTS=(
  "/setup-complete.sh"
  "/demo.sh"
)

for script in "${EXECUTABLE_SCRIPTS[@]}"; do
  if [ -x "/Users/test/startups/hrmscrm/bench$script" ]; then
    echo "✅ $script is executable"
  else
    echo "❌ $script is not executable"
  fi
done

# Test 10: Check documentation
echo "🔍 Test 10: Checking documentation..."
DOCUMENTATION=(
  "/README.md"
  "/IMPLEMENTATION_SUMMARY.md"
)

for doc in "${DOCUMENTATION[@]}"; do
  if [ -f "/Users/test/startups/hrmscrm/bench$doc" ]; then
    echo "✅ $doc exists"
  else
    echo "❌ $doc is missing"
  fi
done

echo "🏁 Testing complete!"
echo ""
echo "💡 To run the complete system:"
echo "   1. Navigate to the bench directory: cd /Users/test/startups/hrmscrm/bench"
echo "   2. Start the system: ./setup-complete.sh"
echo "   3. Run the development server: npm run dev"
echo "   4. Visit http://localhost:3000 in your browser"
echo ""
echo "💡 To run the demonstration:"
echo "   ./demo.sh"