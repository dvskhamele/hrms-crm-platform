# HRMS/CRM Recruitment Platform (Gem)

Welcome to Gem - the AI-first all-in-one recruiting software that helps teams hire 5x faster!

## System Architecture

This project consists of two main components:
1. **Frontend**: Next.js 14+ application (HRMS/CRM Recruitment Platform)
2. **Backend**: Node.js/Express API server

## Prerequisites

- Node.js v18+ installed
- npm or yarn package manager

## Running the Application

### Method 1: Manual Start

1. **Start the Backend Server**:
```bash
# Navigate to project root
cd /Users/test/startups/hrmscrm

# Important: Unset PORT environment variable to avoid conflicts
unset PORT

# Start backend server on port 3001
node server.js
```

2. **Start the Frontend Server** (in a new terminal):
```bash
# Navigate to frontend directory
cd /Users/test/startups/hrmscrm/frontend

# Start frontend server on port 3006
npm run dev
```

### Method 2: Using the Startup Script

```bash
# Make the startup script executable
chmod +x /Users/test/startups/hrmscrm/start-recruitment-platform.sh

# Run the startup script
/Users/test/startups/hrmscrm/start-recruitment-platform.sh
```

## Access Points

- **Frontend (Website)**: http://localhost:3006
- **Backend (API)**: http://localhost:3001

## Default Login Credentials

- **Email**: admin@gem.com
- **Password**: password123

## Key Features

1. **AI-Powered Dashboard**: Real-time analytics and insights
2. **Agentic AI**: Autonomous agents for candidate outreach and screening
3. **ATS Integration**: Seamlessly connect with existing applicant tracking systems
4. **CRM**: Centralized candidate relationship management
5. **Sourcing**: Access to 650M+ candidate profiles with intelligent matching
6. **Scheduling**: Automated interview scheduling
7. **Analytics**: Advanced reporting and ROI measurement
8. **Talent Marketing**: Campaign management and landing pages

## Troubleshooting

### Port Conflicts

If you encounter "address already in use" errors:

1. Kill existing processes:
```bash
pkill -f "node.*server.js"
pkill -f "next dev"
```

2. Ensure PORT environment variable is not set:
```bash
unset PORT
```

### Common Issues

1. **Blank Page Loading**: Check browser console for JavaScript errors
2. **API Connection Issues**: Ensure backend is running on port 3001
3. **Authentication Problems**: Clear browser cookies and localStorage

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
- JSON File Storage (Development Mode)

## Development Notes

This is a demonstration version with simulated data. In a production environment:
- Real databases (MongoDB/PostgreSQL) would be used
- Actual integration with third-party services would be implemented
- Proper authentication and authorization would be in place
- Advanced security measures would be implemented

## Support

For issues or questions, please contact the development team.