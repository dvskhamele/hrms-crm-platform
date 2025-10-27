// Vercel API Handler for both hotel operations and recruitment services
import recruitmentService from './services/recruitmentService.js';

// Initialize services
let hotelService;

// Initialize hotel service if not already initialized
async function getHotelService() {
  if (!hotelService) {
    const { default: HotelService } = await import('./services/hotelService.js');
    hotelService = new HotelService();
    await hotelService.init();
  }
  return hotelService;
}

// Vercel API Handler
export default async function handler(request, response) {
  try {
    // Set CORS headers
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      response.status(200).end();
      return;
    }
    
    // Initialize services
    const hotelService = await getHotelService();
    
    // Route handling
    const url = new URL(request.url, `http://${request.headers.host}`);
    const path = url.pathname;
    
    // Recruitment Authentication routes
    if (path === '/api/auth/register' && request.method === 'POST') {
      const result = recruitmentService.register(await request.json());
      
      if (result.success) {
        response.status(200).json(result);
      } else {
        response.status(400).json({ error: result.error || 'Registration failed' });
      }
      return;
    }
    
    // Separate recruitment and hotel login endpoints
    if (path === '/api/recruitment/auth/login' && request.method === 'POST') {
      const body = await request.json();
      const result = recruitmentService.login(body.email, body.password);
      
      if (result.success) {
        response.status(200).json(result);
      } else {
        response.status(401).json({ error: result.error || 'Invalid credentials' });
      }
      return;
    }
    
    if (path === '/api/hotel/auth/login' && request.method === 'POST') {
      const body = await request.json();
      const result = await hotelService.authenticate(body.email, body.password);
      
      if (result.success) {
        response.status(200).json({
          user: result.user,
          token: 'fake-jwt-token'
        });
      } else {
        response.status(401).json({ error: 'Invalid credentials' });
      }
      return;
    }
    
    // Recruitment Positions routes
    if (path === '/api/positions' && request.method === 'GET') {
      const positions = recruitmentService.getAllPositions();
      response.status(200).json({ positions });
      return;
    }
    
    if (path.match(/^\/api\/positions\/\d+$/) && request.method === 'GET') {
      const id = path.split('/')[3];
      const position = recruitmentService.getPositionById(id);
      if (position) {
        response.status(200).json({ position });
      } else {
        response.status(404).json({ error: 'Position not found' });
      }
      return;
    }
    
    if (path === '/api/positions' && request.method === 'POST') {
      const result = recruitmentService.createPosition(await request.json());
      
      if (result.success) {
        response.status(200).json(result);
      } else {
        response.status(400).json({ error: result.error || 'Failed to create position' });
      }
      return;
    }
    
    const positionStatusMatch = path.match(/^\/api\/positions\/(\d+)\/status$/);
    if (positionStatusMatch && request.method === 'PUT') {
      const id = positionStatusMatch[1];
      const body = await request.json();
      const result = recruitmentService.updatePositionStatus(id, body.status);
      
      if (result.success) {
        response.status(200).json(result);
      } else {
        response.status(400).json({ error: result.error || 'Failed to update position status' });
      }
      return;
    }
    
    // Recruitment Applications routes
    if (path === '/api/applications' && request.method === 'GET') {
      const applications = recruitmentService.getAllApplications();
      response.status(200).json({ applications });
      return;
    }
    
    if (path.match(/^\/api\/applications\/\d+$/) && request.method === 'GET') {
      const id = path.split('/')[3];
      const application = recruitmentService.getApplicationById(id);
      if (application) {
        response.status(200).json({ application });
      } else {
        response.status(404).json({ error: 'Application not found' });
      }
      return;
    }
    
    if (path === '/api/applications' && request.method === 'POST') {
      const result = recruitmentService.createApplication(await request.json());
      
      if (result.success) {
        response.status(200).json(result);
      } else {
        response.status(400).json({ error: result.error || 'Failed to create application' });
      }
      return;
    }
    
    const applicationStatusMatch = path.match(/^\/api\/applications\/(\d+)\/status$/);
    if (applicationStatusMatch && request.method === 'PUT') {
      const id = applicationStatusMatch[1];
      const body = await request.json();
      const result = recruitmentService.updateApplicationStatus(id, body.status);
      
      if (result.success) {
        response.status(200).json(result);
      } else {
        response.status(400).json({ error: result.error || 'Failed to update application status' });
      }
      return;
    }
    
    // Recruitment Recruiters routes
    if (path === '/api/recruiters' && request.method === 'GET') {
      const recruiters = recruitmentService.getAllRecruiters();
      response.status(200).json({ recruiters });
      return;
    }
    
    const recruiterStatusMatch = path.match(/^\/api\/recruiters\/(\d+)\/status$/);
    if (recruiterStatusMatch && request.method === 'PUT') {
      const id = recruiterStatusMatch[1];
      const body = await request.json();
      const result = recruitmentService.updateRecruiterStatus(id, body.status);
      
      if (result.success) {
        response.status(200).json(result);
      } else {
        response.status(400).json({ error: result.error || 'Failed to update recruiter status' });
      }
      return;
    }
    
    // Recruitment Departments routes
    if (path === '/api/departments' && request.method === 'GET') {
      const departments = recruitmentService.getAllDepartments();
      response.status(200).json({ departments });
      return;
    }
    
    // Recruitment Dashboard routes
    if (path === '/api/recruitment/dashboard/stats' && request.method === 'GET') {
      const stats = recruitmentService.getDashboardStats();
      response.status(200).json({ stats });
      return;
    }
    
    if (path === '/api/recruitment/dashboard/activity' && request.method === 'GET') {
      const activity = recruitmentService.getDashboardActivity();
      response.status(200).json({ activity });
      return;
    }
    
    // Hotel Operations routes
    // Hotel dashboard stats
    if (path === '/api/hotel/dashboard/stats' && request.method === 'GET') {
      const stats = await hotelService.getDashboardStats();
      response.status(200).json(stats);
      return;
    }
    
    if (path === '/api/hotel/dashboard/activity' && request.method === 'GET') {
      const activity = await hotelService.getRecentActivity();
      response.status(200).json(activity);
      return;
    }
    
    // Rooms endpoints
    if (path === '/api/hotel/rooms' && request.method === 'GET') {
      const rooms = await hotelService.getAllRooms();
      response.status(200).json({ rooms });
      return;
    }
    
    const roomStatusMatch = path.match(/^\/api\/hotel\/rooms\/(\d+)\/status$/);
    if (roomStatusMatch && request.method === 'PUT') {
      const roomId = parseInt(roomStatusMatch[1]);
      const body = await request.json();
      const room = await hotelService.updateRoomStatus(roomId, body.status);
      response.status(200).json(room);
      return;
    }
    
    // Staff endpoints
    if (path === '/api/hotel/staff' && request.method === 'GET') {
      const staff = await hotelService.getAllStaff();
      response.status(200).json({ staff });
      return;
    }
    
    const staffStatusMatch = path.match(/^\/api\/hotel\/staff\/(\d+)\/status$/);
    if (staffStatusMatch && request.method === 'PUT') {
      const staffId = parseInt(staffStatusMatch[1]);
      const body = await request.json();
      const staff = await hotelService.updateStaffStatus(staffId, body.status);
      response.status(200).json(staff);
      return;
    }
    
    // Requests endpoints
    if (path === '/api/hotel/requests' && request.method === 'GET') {
      const requests = await hotelService.getAllRequests();
      response.status(200).json({ requests });
      return;
    }
    
    const requestStatusMatch = path.match(/^\/api\/hotel\/requests\/(\d+)\/status$/);
    if (requestStatusMatch && request.method === 'PUT') {
      const requestId = parseInt(requestStatusMatch[1]);
      const body = await request.json();
      const request = await hotelService.updateRequestStatus(requestId, body.status);
      response.status(200).json(request);
      return;
    }
    
    // Inventory endpoints
    if (path === '/api/hotel/inventory' && request.method === 'GET') {
      const inventory = await hotelService.getAllInventory();
      response.status(200).json({ inventory });
      return;
    }
    
    const inventoryQuantityMatch = path.match(/^\/api\/hotel\/inventory\/(\d+)\/quantity$/);
    if (inventoryQuantityMatch && request.method === 'PUT') {
      const inventoryId = parseInt(inventoryQuantityMatch[1]);
      const body = await request.json();
      const item = await hotelService.updateInventoryQuantity(inventoryId, body.quantity);
      response.status(200).json(item);
      return;
    }
    
    // Hotel departments
    if (path === '/api/hotel/departments' && request.method === 'GET') {
      const departments = await hotelService.getAllDepartments();
      response.status(200).json({ departments });
      return;
    }
    
    // Default 404
    response.status(404).json({ error: 'Endpoint not found' });
  } catch (error) {
    console.error('Handler error:', error);
    response.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// Export config for Vercel
export const config = {
  runtime: 'nodejs18.x',
};