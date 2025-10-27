# HRMS/CRM Platform Deployment Guide

This document provides comprehensive instructions for deploying the HRMS/CRM platform (Gem) with hotel operations integration.

## Architecture Overview

The application consists of:
- **Frontend**: Next.js application for the HR/Gem recruitment platform
- **Backend**: Node.js/Express API server supporting both HR functions and hotel operations
- **Database**: Local storage (for prototype) with integration capabilities

## Prerequisites

1. **Node.js** (v18 or higher)
2. **npm** package manager
3. **Vercel CLI** for deployment (`npm install -g vercel`)
4. **Git** for version control
5. Vercel account for frontend deployment
6. (Optional) Environment variables for production

## Deployment Process

### 1. Automated Deployment (Recommended)

Run the automated deployment script:

```bash
./deploy.sh
```

This script will:
- Install dependencies for both frontend and backend
- Build the frontend application
- Deploy both applications to Vercel
- Provide deployment URLs and credentials

### 2. Manual Deployment

#### Frontend Deployment

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Build the application:
```bash
npm run build
```

4. Deploy to Vercel:
```bash
vercel --prod
```

#### Backend Deployment

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Deploy to Vercel:
```bash
vercel --prod
```

## Configuration

### Environment Variables

For production environment, create a `.env.production` file in the backend directory:

```env
NODE_ENV=production
PORT=3001
PMS_API_URL=your_pms_api_url
PMS_API_KEY=your_pms_api_key
JWT_SECRET=your_jwt_secret
```

### API Endpoints

After deployment, the backend API will be available at:
- `https://your-domain.vercel.app/api/*`

Key API endpoints:
- `POST /api/auth/login` - User authentication
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/positions` - Job positions
- `POST /api/positions` - Create new position
- `PUT /api/positions/:id/status` - Update position status
- `GET /api/rooms` - Hotel rooms
- `PUT /api/rooms/:id/status` - Update room status
- `GET /api/requests` - Hotel requests
- `POST /api/requests` - Create new request
- `PUT /api/requests/:id/status` - Update request status
- `GET /api/notifications` - User notifications
- `PUT /api/notifications/:id/read` - Mark notification as read

## Default Credentials

After deployment, the following default credentials will work for the login:

- **Administrator**: admin@gem.com / password123
- **HR Manager**: david.wilson@gem.com / password123
- **Recruiter**: alice.johnson@gem.com / password123
- **Candidate**: john.doe@example.com / password123

## Post-Deployment Checklist

After deployment, verify the following:

1. ✅ Frontend loads at the provided URL
2. ✅ Login page is accessible at `/login`
3. ✅ Role selection page works at `/role-select`
4. ✅ Dashboard loads after login
5. ✅ Navigation between pages works correctly
6. ✅ API requests are successful (check browser console for errors)
7. ✅ Both HR and hotel features are accessible based on user role

## Troubleshooting

### Common Issues

1. **"Module not found" errors during build**:
   - Ensure all dependencies are installed in both frontend and backend directories
   - Run `npm install` in each directory separately

2. **API requests failing after deployment**:
   - Verify that your frontend is correctly configured to connect to the deployed backend API
   - Check CORS settings in the backend server
   - Ensure API endpoint URLs are correctly configured

3. **Authentication not working**:
   - Verify that JWT tokens are being properly set and retrieved
   - Check that user data is persisting correctly
   - Confirm that login credentials match expected format

4. **Page not found errors**:
   - Ensure the Next.js app is properly configured for the production domain
   - Verify routing is set up correctly for all required pages

### Debugging Steps

1. Check browser console for JavaScript errors
2. Review network tab for failed API requests
3. Check server logs (available in Vercel dashboard)
4. Verify that all environment variables are properly set
5. Confirm that the frontend is pointing to the correct backend API URL

## Rollback Process

To rollback to a previous version:

1. Log in to your Vercel dashboard
2. Navigate to your project
3. Go to the "Deployments" tab
4. Select the deployment you want to rollback to
5. Click "Promote" to make it the production version

## Security Considerations

- Change default passwords after deployment
- Set up proper JWT secrets in production
- Implement rate limiting for API endpoints
- Use HTTPS for all communications
- Regularly update dependencies to address security vulnerabilities

## Monitoring

For production monitoring:
- Set up error tracking (e.g., Sentry)
- Implement logging for backend operations
- Use Vercel's analytics to monitor performance
- Set up health checks for API endpoints

## Support

For support with deployment or operational issues:
1. Check the application logs in your Vercel dashboard
2. Verify all configuration settings
3. Contact the development team via the support channels
4. Create an issue in the project repository if it's a system issue