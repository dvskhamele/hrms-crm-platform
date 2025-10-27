const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const HROperationsService = require('./hr-operations-service');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data storage
let data = {
  users: [],
  positions: [],
  recruiters: [],
  applications: [],
  candidates: [],
  departments: [],
  activity: [],
  rooms: [],
  staff: [],
  requests: [],
  inventory: [],
  onboarding: []  // Added onboarding array
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
        ],
        rooms: [
          { id: 1, number: '101', floor: 1, type: 'Standard', status: 'OCCUPIED', updatedAt: new Date(Date.now() - 3600000).toISOString() },
          { id: 2, number: '102', floor: 1, type: 'Standard', status: 'DIRTY', updatedAt: new Date(Date.now() - 7200000).toISOString() },
          { id: 3, number: '201', floor: 2, type: 'Deluxe', status: 'CLEAN', updatedAt: new Date(Date.now() - 10800000).toISOString() },
          { id: 4, number: '202', floor: 2, type: 'Suite', status: 'OCCUPIED', updatedAt: new Date(Date.now() - 14400000).toISOString() }
        ],
        staff: [
          { id: 1, name: 'John Smith', department: 'Housekeeping', position: 'Housekeeper', status: 'ACTIVE', email: 'john.smith@hotel.com', phone: '+1234567890', hireDate: '2022-01-15', performance: 85, schedule: '9:00 AM - 5:00 PM' },
          { id: 2, name: 'Sarah Johnson', department: 'Front Desk', position: 'Receptionist', status: 'ACTIVE', email: 'sarah.johnson@hotel.com', phone: '+1234567891', hireDate: '2022-03-22', performance: 90, schedule: '9:00 AM - 5:00 PM' },
          { id: 3, name: 'Mike Davis', department: 'Maintenance', position: 'Technician', status: 'OFFLINE', email: 'mike.davis@hotel.com', phone: '+1234567892', hireDate: '2021-11-05', performance: 88, schedule: '9:00 AM - 5:00 PM' }
        ],
        requests: [
          { id: 1, guestName: 'Guest 1', roomNumber: '101', title: 'Extra Towels', department: 'Housekeeping', priority: 'MEDIUM', status: 'PENDING', createdAt: new Date(Date.now() - 3600000).toISOString() },
          { id: 2, guestName: 'Guest 2', roomNumber: '102', title: 'Room Service', department: 'Food & Beverage', priority: 'HIGH', status: 'IN_PROGRESS', createdAt: new Date(Date.now() - 7200000).toISOString() },
          { id: 3, guestName: 'Guest 3', roomNumber: '201', title: 'WiFi Issue', department: 'IT', priority: 'HIGH', status: 'PENDING', createdAt: new Date(Date.now() - 10800000).toISOString() },
          { id: 4, guestName: 'Guest 4', roomNumber: '202', title: 'Late Checkout', department: 'Front Desk', priority: 'LOW', status: 'COMPLETED', createdAt: new Date(Date.now() - 14400000).toISOString(), completedAt: new Date(Date.now() - 12600000).toISOString() }
        ],
        inventory: [
          { id: 1, name: 'Towels', category: 'Linens', quantity: 50, minStock: 20, supplier: 'ABC Linens', price: 5.00, lastOrdered: new Date(Date.now() - 86400000).toISOString() },
          { id: 2, name: 'Shampoo', category: 'Toiletries', quantity: 100, minStock: 30, supplier: 'Clean Products Co.', price: 3.50, lastOrdered: new Date(Date.now() - 172800000).toISOString() },
          { id: 3, name: 'Coffee', category: 'Food & Beverage', quantity: 25, minStock: 10, supplier: 'Brew Co.', price: 8.00, lastOrdered: new Date(Date.now() - 259200000).toISOString() }
        ],
        onboarding: []  // Initialize onboarding array
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

// Hotel operations endpoints
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

// HR Operations Service endpoints
app.post('/api/hr/operations/application', (req, res) => {
  try {
    const hrService = new HROperationsService(DATA_FILE);
    const { candidateInfo } = req.body;
    
    const result = hrService.processCandidateApplication(candidateInfo);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/hr/operations/application/:id/status', (req, res) => {
  try {
    const hrService = new HROperationsService(DATA_FILE);
    const applicationId = parseInt(req.params.id);
    const { status } = req.body;
    
    const result = hrService.updateApplicationStatus(applicationId, status);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/hr/operations/position/:id/status', (req, res) => {
  try {
    const hrService = new HROperationsService(DATA_FILE);
    const positionId = parseInt(req.params.id);
    const { status } = req.body;
    
    const result = hrService.updatePositionStatus(positionId, status);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/hr/operations/recruiter/:id/status', (req, res) => {
  try {
    const hrService = new HROperationsService(DATA_FILE);
    const recruiterId = parseInt(req.params.id);
    const { status } = req.body;
    
    const result = hrService.updateRecruiterStatus(recruiterId, status);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/hr/operations/new-hire', (req, res) => {
  try {
    const hrService = new HROperationsService(DATA_FILE);
    const { applicationId } = req.body;
    
    const result = hrService.processNewHire(applicationId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/hr/operations/onboarding/:id/task/:taskId', (req, res) => {
  try {
    const hrService = new HROperationsService(DATA_FILE);
    const onboardingId = parseInt(req.params.id);
    const taskId = parseInt(req.params.taskId);
    const { completed } = req.body;
    
    const result = hrService.updateOnboardingTask(onboardingId, taskId, completed);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/hr/operations/department/:name/head', (req, res) => {
  try {
    const hrService = new HROperationsService(DATA_FILE);
    const departmentName = req.params.name;
    const { headName } = req.body;
    
    const result = hrService.updateDepartmentHead(departmentName, headName);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/hr/operations/candidate/:id/status', (req, res) => {
  try {
    const hrService = new HROperationsService(DATA_FILE);
    const candidateId = parseInt(req.params.id);
    const { status } = req.body;
    
    const result = hrService.updateCandidateStatus(candidateId, status);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/hr/operations/dashboard-stats', (req, res) => {
  try {
    const hrService = new HROperationsService(DATA_FILE);
    const stats = hrService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/hr/operations/run-daily', (req, res) => {
  try {
    const hrService = new HROperationsService(DATA_FILE);
    const report = hrService.runDailyOperations();
    res.json({ message: 'Daily operations completed', report });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lead capture endpoint
app.post('/api/leads', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const leadsFilePath = path.join(__dirname, 'data', 'prelogin_leads', 'leads.json');

  fs.readFile(leadsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading leads file:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    let leads = [];
    try {
      leads = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing leads file:', parseErr);
      return res.status(500).json({ error: 'Internal server error' });
    }

    leads.push({ email, createdAt: new Date().toISOString() });

    fs.writeFile(leadsFilePath, JSON.stringify(leads, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing leads file:', writeErr);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(200).json({ message: 'Lead captured successfully' });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`HRMS Recruitment Management server running on http://localhost:${PORT}`);
});