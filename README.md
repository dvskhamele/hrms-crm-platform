# HRMS/CRM Platform (Gem)

AI-first HRMS/CRM Recruiting Platform with Action-Triggered Automation, featuring integrated hotel operations management.

## Project Overview

This is a comprehensive HR recruitment platform called "Gem" that includes:
- HR management and recruitment features
- Hotel operations management (rooms, staff, requests, inventory)
- Dashboard with analytics
- Role-based access control
- Action-triggered automation

## Architecture

- **Frontend**: Next.js application with React
- **Backend**: Node.js/Express API server
- **Database**: Local storage (for prototype, with integration capabilities for production)

## Setup and Development

1. **Install dependencies**:
```bash
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

2. **Start development servers**:
```bash
# Start frontend (runs on http://localhost:3000)
cd frontend
npm run dev

# In another terminal, start backend (runs on http://localhost:3001)
cd backend
npm run dev
```

Or use the auto-start script:
```bash
./auto-start.sh
```

## Default Credentials

- **Admin**: admin@gem.com / password123
- **HR Manager**: david.wilson@gem.com / password123
- **Recruiter**: alice.johnson@gem.com / password123
- **Candidate**: john.doe@example.com / password123

## Key Features

- Role-based authentication and access
- Dashboard with real-time stats
- Position and application management
- Room and guest management
- Request handling system
- Inventory tracking
- Notification system
- Performance analytics

## Deployment

The application is ready for deployment. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

To deploy automatically:
```bash
./deploy.sh
```

## API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### HR Operations
- `GET /api/positions` - Get all positions
- `POST /api/positions` - Create a new position
- `PUT /api/positions/:id/status` - Update position status
- `GET /api/applications` - Get all applications
- `POST /api/applications` - Create a new application
- `PUT /api/applications/:id/status` - Update application status
- `GET /api/recruiters` - Get all recruiters
- `PUT /api/recruiters/:id/status` - Update recruiter status
- `GET /api/departments` - Get all departments

### Hotel Operations
- `GET /api/rooms` - Get all rooms
- `PUT /api/rooms/:id/status` - Update room status
- `GET /api/requests` - Get all requests
- `POST /api/requests` - Create a new request
- `PUT /api/requests/:id/status` - Update request status
- `GET /api/inventory` - Get inventory items
- `PUT /api/inventory/:id/quantity` - Update inventory quantity

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/activity` - Get recent activity
- `GET /api/dashboard/positions` - Get positions for dashboard
- `GET /api/dashboard/applications` - Get applications for dashboard
- `GET /api/dashboard/performance` - Get performance metrics

## Environment Variables

For production deployment, configure the following environment variables:

Backend (.env):
```
NODE_ENV=production
PORT=3001
PMS_API_URL=your_pms_api_url
PMS_API_KEY=your_pms_api_key
JWT_SECRET=your_jwt_secret
```

## Support

For support with this application, please contact the development team or create an issue in the repository.// Test change for dual service verification
