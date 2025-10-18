# HRMS/CRM Recruitment Platform (Gem) - Deployment Guide

## Overview
Gem is an AI-first all-in-one recruiting software that helps teams hire 5x faster. This platform includes advanced HR operations functionality with dynamic data updates based on internal HR operations.

## Deployment

### Prerequisites
- Node.js v18+ installed
- npm or yarn package manager

### Quick Deployment

1. **Make the deployment script executable:**
```bash
chmod +x deploy-platform.sh
```

2. **Run the deployment script:**
```bash
./deploy-platform.sh
```

### Manual Deployment

1. **Start the backend server (HR operations enabled):**
```bash
cd /Users/test/startups/hrmscrm
npm install  # Install dependencies
node backend-api.js
```

2. **In a new terminal, build and start the frontend server:**
```bash
cd /Users/test/startups/hrmscrm/frontend
npm install  # Install dependencies
npm run build
npm run start
```

## Access Points

- **Frontend (Website):** http://localhost:3006
- **Backend API:** http://localhost:3002
- **Talent Bench:** http://localhost:3006/bench
- **Public Talent Bench:** http://localhost:3006/public/bench

## Default Login Credentials
- **Email:** admin@gem.com
- **Password:** password123

## HR Operations API Endpoints

### Candidate Operations
- `POST /api/hr/operations/application` - Process new candidate applications
- `PUT /api/hr/operations/application/:id/status` - Update application status
- `PUT /api/hr/operations/candidate/:id/status` - Update candidate status

### Position Operations
- `PUT /api/hr/operations/position/:id/status` - Update position status

### Recruiter Operations
- `PUT /api/hr/operations/recruiter/:id/status` - Update recruiter status

### Onboarding Operations
- `POST /api/hr/operations/new-hire` - Process new hires and create onboarding records
- `PUT /api/hr/operations/onboarding/:id/task/:taskId` - Update onboarding task status

### Analytics & Reporting
- `GET /api/hr/operations/dashboard-stats` - Get HR statistics
- `GET /api/hr/operations/run-daily` - Run daily operations

## Key Features

1. **AI-Powered Dashboard**: Real-time analytics and insights
2. **Agentic AI**: Autonomous agents for candidate outreach and screening
3. **ATS Integration**: Seamlessly connect with existing applicant tracking systems
4. **CRM**: Centralized candidate relationship management
5. **Sourcing**: Access to 650M+ candidate profiles with intelligent matching
6. **Scheduling**: Automated interview scheduling
7. **Analytics**: Advanced reporting and ROI measurement
8. **Talent Marketing**: Campaign management and landing pages

## Architecture

The platform consists of:

1. **Frontend**: Next.js 14+ application with React, TypeScript, and Tailwind CSS
2. **Backend**: Node.js/Express API server with HR operations service
3. **Data Layer**: JSON file storage (for prototype) with dynamic updates
4. **HR Operations Service**: Core logic for managing recruitment workflows

## Technology Stack

### Frontend
- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Recharts (Data Visualization)

### Backend
- Node.js
- Express.js
- HR Operations Service (Custom)

## Troubleshooting

### Port Conflicts
If you encounter "address already in use" errors:
```bash
pkill -f "node.*backend-api.js"
pkill -f "next dev"
```

### Common Issues
1. **Blank Page Loading**: Check browser console for JavaScript errors
2. **API Connection Issues**: Ensure backend is running on port 3002
3. **Authentication Problems**: Clear browser cookies and localStorage

## Support

For issues or questions, please contact the development team or check the GitHub repository.