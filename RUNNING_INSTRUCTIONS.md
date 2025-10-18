# HRMS/CRM Recruitment Platform - Quick Start

## Prerequisites
- Node.js v18+ installed
- npm package manager

## Setup Instructions

1. **Install Backend Dependencies:**
```bash
cd /Users/test/startups/hrmscrm
npm install
```

2. **Install Frontend Dependencies:**
```bash
cd /Users/test/startups/hrmscrm/frontend
npm install
```

## Running the Application

### Method 1: Quick Deployment Script
```bash
cd /Users/test/startups/hrmscrm
./deploy-platform.sh
```

### Method 2: Manual Start
1. **Start Backend Server (HR Operations Enabled):**
```bash
cd /Users/test/startups/hrmscrm
unset PORT  # Ensure PORT environment variable is not set
node backend-api.js
```

2. **In a new terminal, serve the built frontend:**
```bash
cd /Users/test/startups/hrmscrm/frontend
npx serve -p 3006 out
```

## Access Points

- **Frontend (Website):** http://localhost:3006
- **Backend API:** http://localhost:3002
- **Talent Bench:** http://localhost:3006/bench
- **Public Talent Bench:** http://localhost:3006/public/bench

## Default Login Credentials
- **Email:** admin@gem.com
- **Password:** password123

## Key Features

✓ **Talent Bench Page:** http://localhost:3006/bench - Full candidate management with filters
✓ **Add New Candidate:** Modal form to add candidates via HR operations API
✓ **HR Operations:** Dynamic data updates to data.json file
✓ **Login System:** Protected routes requiring authentication
✓ **API Endpoints:** Full CRUD operations for HR operations

## HR Operations API Endpoints

- `POST /api/hr/operations/application` - Process new candidate applications
- `PUT /api/hr/operations/application/:id/status` - Update application status
- `PUT /api/hr/operations/candidate/:id/status` - Update candidate status
- `PUT /api/hr/operations/position/:id/status` - Update position status
- `GET /api/hr/operations/dashboard-stats` - Get HR statistics

## Troubleshooting

1. **If backend doesn't start on port 3002:**
```bash
lsof -i :3002  # Check if port is in use
kill -9 [PID]  # Kill any process using the port
```

2. **If frontend doesn't start on port 3006:**
```bash
lsof -i :3006  # Check if port is in use
kill -9 [PID]  # Kill any process using the port
```

3. **Ensure PORT environment variable is unset:**
```bash
unset PORT
```