# HRMS/CRM Recruitment Platform (Gem) - Running Instructions

## Current Status

The HRMS/CRM Recruitment Platform (Gem) is now successfully running with:

- **Backend Server**: Running on port 3001
- **Frontend Server**: Running on port 3006

## How to Access

1. Open your browser and navigate to: http://localhost:3006
2. You should see the Gem HRMS/CRM Recruitment Platform homepage
3. Use the default credentials to log in:
   - Email: admin@gem.com
   - Password: password123

## Key Features Available

1. **AI-Powered Dashboard** with real-time analytics
2. **Candidate Management** system
3. **Position Tracking** with department organization
4. **Recruiter Performance Monitoring**
5. **Application Processing** workflows
6. **Agentic AI** for automated tasks
7. **Sourcing Tools** with candidate profiles
8. **Analytics & Reporting** capabilities

## Technical Details

The application consists of:
- A Node.js/Express backend server on port 3001
- A Next.js 14+ frontend application on port 3006

Both servers are currently running and communicating properly.

## Troubleshooting

If you encounter any issues:

1. Make sure both servers are running:
   ```bash
   lsof -i :3001  # Backend
   lsof -i :3006  # Frontend
   ```

2. If ports are in use, kill existing processes:
   ```bash
   pkill -f "node.*server.js"
   pkill -f "next dev"
   ```

3. Restart both servers following the startup procedure in the start-recruitment-platform.sh script.

## Next Steps

The application is fully functional with demo data. All core HRMS/CRM features are accessible through the web interface at http://localhost:3006.