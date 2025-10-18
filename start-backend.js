const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3002; // Changed from 3001 to 3002

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, 'backend/src/data.json');

// Import our new modules
const NotificationService = require('./backend/src/notifications');
const RequestRoutingService = require('./backend/src/requestRouting');
const ReportingService = require('./backend/src/reporting');

// Initialize data storage
let data = {
  users: [],
  positions: [],
  recruiters: [],
  applications: [],
  candidates: [],
  departments: [],
  activity: []
};

// Load data from file or initialize with sample data
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const fileData = fs.readFileSync(DATA_FILE, 'utf8');
      data = JSON.parse(fileData);
    } else {
      // Initialize with comprehensive sample data
      data = {
        users: [
          {
            id: 1,
            email: 'admin@gem.com',
            password: 'password123',
            name: 'Admin User',
            role: 'ADMIN'
          }
        ],
        positions: [
          { id: 1, title: 'Software Engineer', department: 'Technology', status: 'OPEN', updatedAt: new Date().toISOString() },
          { id: 2, title: 'Marketing Manager', department: 'Marketing', status: 'IN_REVIEW', updatedAt: new Date(Date.now() - 3600000).toISOString() },
          { id: 3, title: 'Sales Associate', department: 'Sales', status: 'FILLED', updatedAt: new Date(Date.now() - 7200000).toISOString() },
          { id: 4, title: 'HR Director', department: 'Human Resources', status: 'ON_HOLD', updatedAt: new Date(Date.now() - 10800000).toISOString() },
          { id: 5, title: 'Product Designer', department: 'Technology', status: 'OPEN', updatedAt: new Date().toISOString() },
          { id: 6, title: 'Content Writer', department: 'Marketing', status: 'OPEN', updatedAt: new Date().toISOString() },
          { id: 7, title: 'DevOps Engineer', department: 'Technology', status: 'OPEN', updatedAt: new Date().toISOString() },
          { id: 8, title: 'Account Executive', department: 'Sales', status: 'IN_REVIEW', updatedAt: new Date(Date.now() - 3600000).toISOString() }
        ],
        recruiters: [
          { id: 1, name: 'Alice Johnson', department: 'Technology', position: 'Senior Recruiter', status: 'Active', email: 'alice.johnson@gem.com', phone: '+1234567890', hireDate: '2022-01-15', performance: 92, schedule: '9:00 AM - 5:00 PM' },
          { id: 2, name: 'Bob Smith', department: 'Marketing', position: 'Recruiter', status: 'Active', email: 'bob.smith@gem.com', phone: '+1234567891', hireDate: '2022-03-22', performance: 87, schedule: '9:00 AM - 5:00 PM' },
          { id: 3, name: 'Carol Davis', department: 'Sales', position: 'Recruiter', status: 'Offline', email: 'carol.davis@gem.com', phone: '+1234567892', hireDate: '2021-11-05', performance: 95, schedule: '9:00 AM - 5:00 PM' },
          { id: 4, name: 'David Wilson', department: 'Human Resources', position: 'Recruitment Manager', status: 'Active', email: 'david.wilson@gem.com', phone: '+1234567893', hireDate: '2020-07-18', performance: 88, schedule: '8:00 AM - 4:00 PM' },
          { id: 5, name: 'Eva Brown', department: 'Technology', position: 'Recruiter', status: 'Break', email: 'eva.brown@gem.com', phone: '+1234567894', hireDate: '2023-02-10', performance: 91, schedule: '8:00 AM - 4:00 PM' }
        ],
        applications: [
          { id: 1, candidateName: 'John Doe', positionId: 1, title: 'Software Engineer Application', department: 'Technology', priority: 'MEDIUM', status: 'PENDING', createdAt: new Date(Date.now() - 3600000).toISOString() },
          { id: 2, candidateName: 'Jane Smith', positionId: 2, title: 'Marketing Manager Application', department: 'Marketing', priority: 'HIGH', status: 'IN_PROGRESS', createdAt: new Date(Date.now() - 7200000).toISOString() },
          { id: 3, candidateName: 'Robert Johnson', positionId: 3, title: 'Sales Associate Application', department: 'Sales', priority: 'URGENT', status: 'PENDING', createdAt: new Date(Date.now() - 10800000).toISOString() },
          { id: 4, candidateName: 'Emily Wilson', positionId: 4, title: 'HR Director Application', department: 'Human Resources', priority: 'LOW', status: 'COMPLETED', createdAt: new Date(Date.now() - 14400000).toISOString(), completedAt: new Date(Date.now() - 12600000).toISOString() }
        ],
        candidates: [
          { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1234567890', positionApplied: 'Software Engineer', status: 'Applied', skills: ['JavaScript', 'React', 'Node.js'], experience: '5 years', resume: 'https://example.com/resume1.pdf', appliedDate: new Date(Date.now() - 3600000).toISOString() },
          { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1234567891', positionApplied: 'Marketing Manager', status: 'Under Review', skills: ['SEO', 'Content Marketing', 'Analytics'], experience: '7 years', resume: 'https://example.com/resume2.pdf', appliedDate: new Date(Date.now() - 7200000).toISOString() },
          { id: 3, name: 'Robert Johnson', email: 'robert.johnson@example.com', phone: '+1234567892', positionApplied: 'Sales Associate', status: 'Interview Scheduled', skills: ['Sales', 'Communication', 'CRM'], experience: '4 years', resume: 'https://example.com/resume3.pdf', appliedDate: new Date(Date.now() - 10800000).toISOString() },
          { id: 4, name: 'Emily Wilson', email: 'emily.wilson@example.com', phone: '+1234567893', positionApplied: 'HR Director', status: 'Hired', skills: ['HR Strategy', 'Leadership', 'Compliance'], experience: '10 years', resume: 'https://example.com/resume4.pdf', appliedDate: new Date(Date.now() - 14400000).toISOString() }
        ],
        departments: [
          { id: 1, name: 'Technology', head: 'Alice Johnson', recruiterCount: 5, performance: 92 },
          { id: 2, name: 'Marketing', head: 'David Wilson', recruiterCount: 3, performance: 88 },
          { id: 3, name: 'Sales', head: 'Frank Miller', recruiterCount: 4, performance: 93 },
          { id: 4, name: 'Human Resources', head: 'Kate Williams', recruiterCount: 3, performance: 94 }
        ],
        activity: [
          { id: 1, type: 'application', title: 'New application received', description: 'John Doe - Software Engineer', timestamp: new Date().toISOString(), status: 'PENDING' },
          { id: 2, type: 'position', title: 'Position status updated', description: 'Software Engineer marked as Open', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'OPEN' },
          { id: 3, type: 'application', title: 'Application completed', description: 'Jane Smith - Marketing Manager', timestamp: new Date(Date.now() - 7200000).toISOString(), status: 'COMPLETED' },
          { id: 4, type: 'position', title: 'Position status updated', description: 'HR Director marked as Closed', timestamp: new Date(Date.now() - 10800000).toISOString(), status: 'CLOSED' },
          { id: 5, type: 'application', title: 'New recruitment request', description: 'Robert Johnson - Sales Associate', timestamp: new Date(Date.now() - 14400000).toISOString(), status: 'PENDING' },
          { id: 6, type: 'recruiter', title: 'Recruiter checked in', description: 'Alice Johnson started shift', timestamp: new Date(Date.now() - 18000000).toISOString(), status: 'ACTIVE' }
        ]
      };
      saveData();
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Save data to file
function saveData() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// Load data on startup
loadData();

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'HRMS Recruitment Management API' });
});

// User registration route
app.post('/api/auth/register', (req, res) => {
  const { email, password, name, companyName, companySize } = req.body;
  
  // Validate input
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }
  
  // Check if user already exists
  const existingUser = data.users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ error: 'User with this email already exists' });
  }
  
  // Create new user
  const newUser = {
    id: data.users.length > 0 ? Math.max(...data.users.map(u => u.id)) + 1 : 1,
    email: email,
    password: password, // In a real app, you would hash this
    name: name,
    companyName: companyName || 'N/A',
    companySize: companySize || 'N/A',
    role: 'ADMIN',
    createdAt: new Date().toISOString()
  };
  
  data.users.push(newUser);
  saveData();
  
  // Remove password from response
  const { password: userPassword, ...userWithoutPassword } = newUser;
  
  res.status(201).json({
    user: userWithoutPassword,
    token: 'fake-jwt-token' // In a real app, you would generate a proper JWT
  });
});

// Authentication routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // For prototype, we'll be more flexible with login
  // In a real app, you would hash passwords and use proper authentication
  const user = data.users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    res.json({
      user: userWithoutPassword,
      token: 'fake-jwt-token'
    });
  } else {
    // For prototype, we'll be more permissive and allow login with any credentials
    // Create a user if one doesn't exist
    res.json({
      user: {
        id: Math.floor(Math.random() * 1000),
        email: email,
        name: email.split('@')[0],
        role: 'ADMIN'
      },
      token: 'fake-jwt-token'
    });
  }
});

// Dashboard routes
app.get('/api/dashboard/stats', (req, res) => {
  // Calculate recruitment-specific stats
  const stats = {
    pendingApplications: data.applications.filter(r => r.status === 'PENDING').length,
    activeCandidates: data.candidates.filter(c => c.status === 'Applied' || c.status === 'Under Review' || c.status === 'Interview Scheduled').length,
    availablePositions: data.positions.filter(r => r.status === 'OPEN').length,
    revenueToday: 12500,
    hiringRate: 65,
    recruitersActive: data.recruiters.filter(s => s.status === 'Active').length,
    pendingInterviews: data.applications.filter(r => r.status === 'PENDING' && r.priority === 'URGENT').length,
    avgResponseTime: 32, // Average response time in minutes
    candidateSatisfaction: 94
  };
  
  res.json(stats);
});

app.get('/api/dashboard/activity', (req, res) => {
  // Return recent activity (last 10 items)
  const recentActivity = data.activity.slice(-10).reverse();
  res.json(recentActivity);
});

app.get('/api/dashboard/positions', (req, res) => {
  // Return first 4 positions for dashboard preview
  res.json({ positions: data.positions.slice(0, 4) });
});

app.get('/api/dashboard/applications', (req, res) => {
  res.json({ applications: data.applications });
});

app.get('/api/dashboard/performance', (req, res) => {
  const performance = {
    candidateScreening: 92,
    interviewScheduling: 87,
    onboarding: 95
  };
  
  res.json(performance);
});

// Room routes
app.get('/api/rooms', (req, res) => {
  res.json(data.rooms);
});

app.put('/api/rooms/:id/status', (req, res) => {
  const roomId = parseInt(req.params.id);
  const { status } = req.body;
  
  const room = data.rooms.find(r => r.id === roomId);
  if (room) {
    room.status = status;
    room.updatedAt = new Date().toISOString();
    
    // Add activity log
    const activity = {
      id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
      type: 'room',
      title: 'Room status updated',
      description: `Room ${room.number} marked as ${status}`,
      timestamp: new Date().toISOString(),
      status: status
    };
    data.activity.push(activity);
    
    saveData();
    res.json(room);
  } else {
    // For prototype, we'll be more permissive and create a room if it doesn't exist
    const newRoom = {
      id: roomId,
      number: roomId.toString(),
      floor: Math.floor(roomId / 100),
      type: 'Standard',
      status: status,
      updatedAt: new Date().toISOString()
    };
    data.rooms.push(newRoom);
    
    // Add activity log
    const activity = {
      id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
      type: 'room',
      title: 'Room status updated',
      description: `Room ${newRoom.number} marked as ${status}`,
      timestamp: new Date().toISOString(),
      status: status
    };
    data.activity.push(activity);
    
    saveData();
    res.json(newRoom);
  }
});

// Staff routes
app.get('/api/staff', (req, res) => {
  res.json(data.staff);
});

app.put('/api/staff/:id/status', (req, res) => {
  const staffId = parseInt(req.params.id);
  const { status } = req.body;
  
  const staff = data.staff.find(s => s.id === staffId);
  if (staff) {
    staff.status = status;
    saveData();
    res.json(staff);
  } else {
    // For prototype, we'll be more permissive and create a staff member if not found
    const newStaff = {
      id: staffId,
      name: `Staff ${staffId}`,
      department: 'General',
      position: 'Staff',
      status: status,
      email: `staff${staffId}@hotelops.com`,
      phone: '+1234567890',
      hireDate: new Date().toISOString(),
      performance: 85,
      schedule: '9:00 AM - 5:00 PM'
    };
    data.staff.push(newStaff);
    saveData();
    res.json(newStaff);
  }
});

// Request routes
app.get('/api/requests', (req, res) => {
  res.json(data.requests);
});

app.put('/api/requests/:id/status', (req, res) => {
  const requestId = parseInt(req.params.id);
  const { status } = req.body;
  
  const request = data.requests.find(r => r.id === requestId);
  if (request) {
    request.status = status;
    
    // If request is being completed, add completedAt timestamp
    if (status === 'COMPLETED') {
      request.completedAt = new Date().toISOString();
    }
    
    // Add activity log
    const activity = {
      id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
      type: 'request',
      title: `Request ${status.toLowerCase()}`,
      description: `${request.guestName} - ${request.title} (${request.department})`,
      timestamp: new Date().toISOString(),
      status: status
    };
    data.activity.push(activity);
    
    saveData();
    res.json(request);
  } else {
    // For prototype, we'll be more permissive and create a request if not found
    const newRequest = {
      id: requestId,
      guestName: 'Guest ' + requestId,
      roomNumber: '100',
      title: 'Sample Request',
      department: 'General',
      priority: 'MEDIUM',
      status: status,
      createdAt: new Date().toISOString()
    };
    data.requests.push(newRequest);
    
    // Add activity log
    const activity = {
      id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
      type: 'request',
      title: `Request ${status.toLowerCase()}`,
      description: `${newRequest.guestName} - ${newRequest.title} (${newRequest.department})`,
      timestamp: new Date().toISOString(),
      status: status
    };
    data.activity.push(activity);
    
    saveData();
    res.json(newRequest);
  }
});

// Enhanced request management routes
app.get('/api/requests', (req, res) => {
  res.json(data.requests);
});

app.post('/api/requests', (req, res) => {
  const { guestName, roomNumber, title, description } = req.body;
  
  // Auto-route the request to the appropriate department
  const department = RequestRoutingService.routeRequest(title, description);
  const priority = RequestRoutingService.getPriority(title, description);
  const estimatedResponseTime = RequestRoutingService.getEstimatedResponseTime(department, priority);
  
  // Create new request
  const newRequest = {
    id: data.requests.length > 0 ? Math.max(...data.requests.map(r => r.id)) + 1 : 1,
    guestName,
    roomNumber,
    title,
    description: description || '',
    department,
    priority,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    estimatedResponseTime // in minutes
  };
  
  data.requests.push(newRequest);
  
  // Add activity log
  const activity = {
    id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
    type: 'request',
    title: 'New guest request',
    description: `${guestName} - ${title} (${department})`,
    timestamp: new Date().toISOString(),
    status: 'PENDING'
  };
  data.activity.push(activity);
  
  // Send push notifications to relevant department
  const notifications = NotificationService.notifyDepartment(
    department, 
    data.staff, 
    `New request: ${title} for room ${roomNumber}`
  );
  
  // Add notification activities
  notifications.forEach(notification => {
    data.activity.push(notification);
  });
  
  saveData();
  res.json(newRequest);
});

app.put('/api/requests/:id/assign', (req, res) => {
  const requestId = parseInt(req.params.id);
  const { staffId } = req.body;
  
  const request = data.requests.find(r => r.id === requestId);
  const staffMember = data.staff.find(s => s.id === staffId);
  
  if (request && staffMember) {
    request.assignedTo = staffId;
    request.status = 'IN_PROGRESS';
    request.assignedAt = new Date().toISOString();
    
    // Add activity log
    const activity = {
      id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
      type: 'request',
      title: 'Request assigned',
      description: `${request.guestName} - ${request.title} assigned to ${staffMember.name}`,
      timestamp: new Date().toISOString(),
      status: 'IN_PROGRESS'
    };
    data.activity.push(activity);
    
    // Send notification to assigned staff
    const notification = NotificationService.notifyStaffById(
      staffId, 
      data.staff, 
      `You have been assigned request: ${request.title} for room ${request.roomNumber}`
    );
    
    if (notification) {
      data.activity.push(notification);
    }
    
    saveData();
    res.json(request);
  } else {
    res.status(404).json({ error: 'Request or staff member not found' });
  }
});

// Reporting routes
app.get('/api/reports/request-metrics', (req, res) => {
  const metrics = {
    totalRequests: data.requests.length,
    avgResponseTime: ReportingService.calculateAverageResponseTime(data.requests),
    requestsByDepartment: ReportingService.getRequestVolumeByDepartment(data.requests),
    requestsByStatus: ReportingService.getRequestVolumeByStatus(data.requests),
    peakRequestTimes: ReportingService.getRequestTrends(data.requests)
  };
  
  res.json(metrics);
});

app.get('/api/reports/staff-performance', (req, res) => {
  const performanceMetrics = ReportingService.getStaffPerformanceMetrics(data.staff, data.requests);
  res.json(performanceMetrics);
});

// Inventory routes
app.get('/api/inventory', (req, res) => {
  res.json(data.inventory);
});

app.put('/api/inventory/:id/quantity', (req, res) => {
  const inventoryId = parseInt(req.params.id);
  const { quantity } = req.body;
  
  const item = data.inventory.find(i => i.id === inventoryId);
  if (item) {
    item.quantity = quantity;
    saveData();
    res.json(item);
  } else {
    // For prototype, we'll be more permissive and create an item if not found
    const newItem = {
      id: inventoryId,
      name: 'Item ' + inventoryId,
      category: 'General',
      quantity: quantity,
      minStock: 10,
      supplier: 'Supplier',
      price: 10.00,
      lastOrdered: new Date().toISOString()
    };
    data.inventory.push(newItem);
    saveData();
    res.json(newItem);
  }
});

// Department routes
app.get('/api/departments', (req, res) => {
  res.json(data.departments);
});

// Recruitment-specific API endpoints
// Positions endpoints
app.get('/api/positions', (req, res) => {
  // Return all positions
  res.json({ positions: data.positions });
});

app.put('/api/positions/:id/status', (req, res) => {
  const positionId = parseInt(req.params.id);
  const { status } = req.body;
  
  // Find the position and update its status
  const position = data.positions.find(r => r.id === positionId);
  if (position) {
    position.status = status;
    position.updatedAt = new Date().toISOString();
    
    // Add activity log
    const activity = {
      id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
      type: 'position',
      title: 'Position status updated',
      description: `Position ${position.title} marked as ${status}`,
      timestamp: new Date().toISOString(),
      status: status
    };
    data.activity.push(activity);
    
    saveData();
    res.json(position);
  } else {
    res.status(404).json({ error: 'Position not found' });
  }
});

// Recruiters endpoints
app.get('/api/recruiters', (req, res) => {
  res.json({ recruiters: data.recruiters });
});

app.put('/api/recruiters/:id/status', (req, res) => {
  const recruiterId = parseInt(req.params.id);
  const { status } = req.body;
  
  const recruiter = data.recruiters.find(s => s.id === recruiterId);
  if (recruiter) {
    recruiter.status = status;
    saveData();
    res.json(recruiter);
  } else {
    res.status(404).json({ error: 'Recruiter not found' });
  }
});

// Applications endpoints
app.get('/api/applications', (req, res) => {
  res.json({ applications: data.applications });
});

app.post('/api/applications', (req, res) => {
  const { candidateName, positionId, title, description, department, priority } = req.body;
  
  // Create new application
  const newApplication = {
    id: data.applications.length > 0 ? Math.max(...data.applications.map(r => r.id)) + 1 : 1,
    candidateName: candidateName || 'Applicant',
    positionId: positionId || 1,
    title: title || 'Application',
    description: description || 'No description',
    department: department || 'General',
    priority: priority || 'MEDIUM',
    status: 'PENDING',
    createdAt: new Date().toISOString()
  };
  
  data.applications.push(newApplication);
  
  // Add activity log
  const activity = {
    id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
    type: 'application',
    title: 'New application created',
    description: `${newApplication.candidateName} - ${newApplication.title}`,
    timestamp: new Date().toISOString(),
    status: 'PENDING'
  };
  data.activity.push(activity);
  
  saveData();
  res.json(newApplication);
});

app.put('/api/applications/:id/status', (req, res) => {
  const applicationId = parseInt(req.params.id);
  const { status } = req.body;
  
  const application = data.applications.find(r => r.id === applicationId);
  if (application) {
    application.status = status;
    
    // If application is being completed, add completedAt timestamp
    if (status === 'COMPLETED') {
      application.completedAt = new Date().toISOString();
    }
    
    // Add activity log
    const activity = {
      id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
      type: 'application',
      title: `Application ${status.toLowerCase()}`,
      description: `${application.candidateName} - ${application.title}`,
      timestamp: new Date().toISOString(),
      status: status
    };
    data.activity.push(activity);
    
    saveData();
    res.json(application);
  } else {
    res.status(404).json({ error: 'Application not found' });
  }
});

// Departments endpoints
app.get('/api/departments', (req, res) => {
  res.json({ departments: data.departments });
});

// Candidates endpoints (using candidates as resources)
app.get('/api/resources', (req, res) => {
  res.json({ resources: data.candidates });
});

app.put('/api/resources/:id/quantity', (req, res) => {
  const resourceId = parseInt(req.params.id);
  const { quantity } = req.body;
  
  const resource = data.candidates.find(i => i.id === resourceId);
  if (resource) {
    // For candidates, update their status instead of quantity
    resource.status = quantity > 0 ? 'Active' : 'Inactive';
    saveData();
    res.json(resource);
  } else {
    res.status(404).json({ error: 'Candidate not found' });
  }
});

// API routes only (no static frontend files served from backend)
// The frontend will be served separately by the Next.js dev server

// Start server
app.listen(PORT, () => {
  console.log(`HRMS Recruitment Management server running on http://localhost:${PORT}`);
});