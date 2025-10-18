# HRMS/CRM - AI Recruiting Platform Deployment Guide

## 🚀 Deployment Process

This document outlines the deployment process to ensure onboarding, login, and dashboard are visible without blockages.

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- Vercel CLI (for frontend deployment)
- A Vercel account

## 🏗️ Architecture

The application is structured as follows:

### Frontend (Next.js)
- Location: `/frontend`
- Framework: Next.js 14 with App Router
- Key pages:
  - `/` - Landing page
  - `/onboarding` - User onboarding flow
  - `/login` - Authentication
  - `/signup` - User registration
  - `/dashboard` - Main dashboard
  - `/dashboard-automated` - Action-triggered automation dashboard
  - `/candidate-profiles` - Candidate management
  - `/applications` - Application tracking
  - `/positions` - Position management
  - `/recruiters` - Recruiter management
  - `/analytics` - Analytics dashboard
  - `/screening` - Screening & scheduling
  - `/bench` - Bench matching system

### Backend (Node.js/Express)
- Location: `/backend`
- API endpoints for all application functionality

## 🔧 Deployment Steps

### 1. Frontend Deployment (Recommended: Vercel)

#### Option A: Using the deployment script
```bash
./deploy.sh
```

#### Option B: Manual deployment
```bash
cd frontend

# Install dependencies
npm install

# Build the application
npm run build

# Deploy to Vercel
npx vercel --prod
```

### 2. Backend Deployment (Choose one)

#### Option A: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway up
```

#### Option B: Render
1. Create a new Web Service on Render
2. Connect to your GitHub repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`

#### Option C: Heroku
```bash
heroku create your-app-name
git push heroku main
```

## 🎯 Ensuring Visibility of Critical Pages

The following pages are guaranteed to be accessible without blockages:

### 1. Onboarding Flow (`/onboarding`)
- Complete user onboarding experience
- Step-by-step guide for new users
- Proper navigation with no access restrictions

### 2. Login System (`/login`)
- Secure authentication
- Demo credentials for testing
- Direct access without blocking
- Proper error handling

### 3. Main Dashboard (`/dashboard`)
- Comprehensive KPI display
- Action-triggered automation system
- Expandable KPIs with multi-outcome actions
- Real-time updates without blocking

### 4. Additional Critical Pages
- `/dashboard-automated` - Enhanced automation dashboard
- `/candidate-profiles` - Full candidate management
- `/applications` - Bulk actions and tracking
- `/positions` - Position management with updates
- `/recruiters` - Recruiter assignments and metrics
- `/analytics` - Real-time analytics with refresh
- `/screening` - Screening and scheduling automation
- `/bench` - Candidate matching system

## 🏗️ Environment Configuration

### Frontend Environment Variables:
```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_BASE_URL=https://your-frontend-url.com
```

### Backend Environment Variables:
```bash
PORT=8080
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
NODE_ENV=production
```

## 🔒 Authentication Flow

The application uses a token-based authentication system:
1. Users log in at `/login`
2. JWT token is stored in localStorage
3. Token is used for API authentication
4. Onboarding completion is tracked in localStorage
5. Users are redirected appropriately based on onboarding status

## 🎨 User Experience

### Onboarding Experience
- 5-step onboarding process
- Progress tracking
- Responsive design for all devices
- No access restrictions during onboarding

### Login/Signup Experience
- Clean, modern authentication UI
- Demo user options
- Proper error handling
- Direct access from any page

### Dashboard Experience
- Responsive layout with sidebar
- Action-triggered automation system
- Real-time updates
- No blocking operations
- Smooth transitions between views

## 🧪 Testing Checklist

After deployment, verify:

- [ ] `/` loads correctly
- [ ] `/login` is accessible
- [ ] `/signup` is accessible
- [ ] `/onboarding` works properly
- [ ] `/dashboard` is functional
- [ ] All pages load without access restrictions
- [ ] Action-triggered automation works
- [ ] Navigation between pages is smooth
- [ ] Mobile responsiveness is maintained
- [ ] API calls work correctly

## 🚨 Troubleshooting

### Common Issues:
1. **Page not loading**: Check environment variables
2. **API errors**: Verify backend deployment and CORS settings
3. **Authentication issues**: Check JWT configuration
4. **Styling problems**: Ensure CSS is properly built

### Debugging Steps:
1. Check browser console for errors
2. Verify all environment variables are set
3. Test API endpoints directly
4. Check server logs

## 📱 Mobile Responsiveness

All pages are designed to be mobile-responsive:
- Dashboard adapts to mobile screens
- Onboarding flow works on mobile
- Login form is mobile-friendly
- Action buttons are appropriately sized
- Navigation works on all screen sizes

## 🚀 Post-Deployment

1. Test the complete user flow: Onboarding → Login → Dashboard
2. Verify all action-triggered automation features work
3. Check that no pages are blocked by authentication unexpectedly
4. Test all critical navigation paths
5. Verify mobile responsiveness
6. Test API connectivity

The deployment will create a fully functional HRMS/CRM application with all components visible and accessible without blockages.