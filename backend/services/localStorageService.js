// Local Storage Service - Replaces backend API for prototype
// Since this is running in Node.js, we'll simulate localStorage with an in-memory object

// Mock localStorage for Node.js environment
if (typeof localStorage === 'undefined' || localStorage === null) {
  var localStorage = {
    _data: {},
    setItem: function(id, val) { return this._data[id] = String(val); },
    getItem: function(id) { return Object.prototype.hasOwnProperty.call(this._data, id) ? this._data[id] : undefined; },
    removeItem: function(id) { return delete this._data[id]; },
    clear: function() { return this._data = {}; }
  };
}

function LocalStorageService() {
  // Initialize with default data if not exists
  this.initializeData();
}

// Initialize default data in localStorage
LocalStorageService.prototype.initializeData = function() {
  // Check if we already have data
  if (!localStorage.getItem('hotelData')) {
    var initialData = {
      users: [
        { id: 1, email: 'admin@example.com', password: 'admin123', role: 'ADMIN', name: 'Admin User' },
        { id: 2, email: 'manager@example.com', password: 'manager123', role: 'MANAGER', name: 'Manager User' },
        { id: 3, email: 'supervisor@example.com', password: 'supervisor123', role: 'SUPERVISOR', name: 'Supervisor User' },
        { id: 4, email: 'staff@example.com', password: 'staff123', role: 'STAFF', name: 'Staff User' },
        { id: 5, email: 'housekeeping@example.com', password: 'housekeeping123', role: 'HOUSEKEEPING', name: 'Housekeeping Staff' }
      ],
      rooms: [
        { id: 1, number: '101', type: 'Standard', status: 'CLEAN' },
        { id: 2, number: '102', type: 'Standard', status: 'DIRTY' },
        { id: 3, number: '103', type: 'Deluxe', status: 'INSPECTED' },
        { id: 4, number: '104', type: 'Suite', status: 'OUT_OF_ORDER' },
        { id: 5, number: '201', type: 'Standard', status: 'CLEAN' },
        { id: 6, number: '202', type: 'Standard', status: 'DIRTY' },
        { id: 7, number: '203', type: 'Deluxe', status: 'CLEAN' },
        { id: 8, number: '204', type: 'Suite', status: 'DIRTY' }
      ],
      guests: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1234567890' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1234567891' },
        { id: 3, name: 'Robert Johnson', email: 'robert.johnson@example.com', phone: '+1234567892' }
      ],
      departments: [
        { id: 1, name: 'HOUSEKEEPING', description: 'Housekeeping Department' },
        { id: 2, name: 'MAINTENANCE', description: 'Maintenance Department' },
        { id: 3, name: 'FOOD_AND_BEVERAGE', description: 'Food and Beverage Department' },
        { id: 4, name: 'FRONT_OFFICE', description: 'Front Office Department' }
      ],
      requestStatuses: [
        { id: 1, status: 'PENDING' },
        { id: 2, status: 'IN_PROGRESS' },
        { id: 3, status: 'COMPLETED' },
        { id: 4, status: 'CANCELLED' }
      ],
      priorities: [
        { id: 1, level: 'LOW' },
        { id: 2, level: 'MEDIUM' },
        { id: 3, level: 'HIGH' },
        { id: 4, level: 'URGENT' }
      ],
      roomStatuses: [
        { id: 1, name: 'CLEAN' },
        { id: 2, name: 'DIRTY' },
        { id: 3, name: 'INSPECTED' },
        { id: 4, name: 'OUT_OF_ORDER' }
      ],
      requests: [
        { 
          id: 1, 
          guestId: 1, 
          roomId: 1, 
          departmentId: 1,
          title: 'Extra Towels', 
          description: 'Guest needs extra towels in room 101',
          priorityId: 2,
          statusId: 1,
          assignedToId: 5,
          createdAt: '2023-05-01T10:00:00Z',
          updatedAt: '2023-05-01T10:00:00Z'
        },
        { 
          id: 2, 
          guestId: 2, 
          roomId: 2, 
          departmentId: 2,
          title: 'Leaky Faucet', 
          description: 'Bathroom faucet is leaking in room 102',
          priorityId: 3,
          statusId: 2,
          assignedToId: null,
          createdAt: '2023-05-01T09:30:00Z',
          updatedAt: '2023-05-01T09:30:00Z'
        },
        { 
          id: 3, 
          guestId: 3, 
          roomId: 3, 
          departmentId: 3,
          title: 'Room Service', 
          description: 'Guest ordered breakfast to room 103',
          priorityId: 1,
          statusId: 3,
          assignedToId: null,
          createdAt: '2023-04-30T19:45:00Z',
          updatedAt: '2023-04-30T20:15:00Z'
        }
      ]
    };
    
    localStorage.setItem('hotelData', JSON.stringify(initialData));
  }
};

// Get all data from localStorage
LocalStorageService.prototype.getData = function() {
  var data = localStorage.getItem('hotelData');
  return data ? JSON.parse(data) : null;
};

// Save data to localStorage
LocalStorageService.prototype.saveData = function(data) {
  localStorage.setItem('hotelData', JSON.stringify(data));
};

// User authentication
LocalStorageService.prototype.login = function(email, password) {
  var data = this.getData();
  var user = data.users.find(function(u) { return u.email === email && u.password === password; });
  
  if (user) {
    // Return user without password
    var userWithoutPassword = Object.assign({}, user);
    delete userWithoutPassword.password;
    return {
      success: true,
      token: email, // For prototype, we'll just use email as token
      user: userWithoutPassword
    };
  }
  
  return {
    success: false,
    error: 'Invalid credentials'
  };
};

// Check if user has required role
LocalStorageService.prototype.hasRole = function(userRole, requiredRoles) {
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }
  
  if (typeof requiredRoles === 'string') {
    requiredRoles = [requiredRoles];
  }
  
  return requiredRoles.includes(userRole);
};

// Get all rooms
LocalStorageService.prototype.getAllRooms = function() {
  var data = this.getData();
  return data.rooms;
};

// Get room by ID
LocalStorageService.prototype.getRoomById = function(roomId) {
  var data = this.getData();
  return data.rooms.find(function(room) { return room.id === parseInt(roomId); });
};

// Update room status (only admins, managers, supervisors, and housekeeping can update)
LocalStorageService.prototype.updateRoomStatus = function(roomId, newStatus, userId, userRole) {
  // For prototype, we'll allow any user to update room status
  // In a real implementation, we would check permissions
  
  var data = this.getData();
  var roomIndex = data.rooms.findIndex(function(room) { return room.id === parseInt(roomId); });
  
  if (roomIndex !== -1) {
    data.rooms[roomIndex].status = newStatus;
    data.rooms[roomIndex].updatedAt = new Date().toISOString();
    
    this.saveData(data);
    
    return {
      success: true,
      room: data.rooms[roomIndex]
    };
  }
  
  return {
    success: false,
    error: 'Room not found'
  };
};

// Get all requests
LocalStorageService.prototype.getAllRequests = function() {
  var data = this.getData();
  
  // Enrich requests with related data
  var enrichedRequests = data.requests.map(function(request) {
    var guest = data.guests.find(function(g) { return g.id === request.guestId; });
    var room = data.rooms.find(function(r) { return r.id === request.roomId; });
    var department = data.departments.find(function(d) { return d.id === request.departmentId; });
    var status = data.requestStatuses.find(function(s) { return s.id === request.statusId; });
    var priority = data.priorities.find(function(p) { return p.id === request.priorityId; });
    var assignedTo = request.assignedToId ? data.users.find(function(u) { return u.id === request.assignedToId; }) : null;
    
    return Object.assign({}, request, {
      guestName: guest ? guest.name : 'Unknown Guest',
      roomNumber: room ? room.number : 'Unknown Room',
      department: department ? department.name : 'Unknown Department',
      status: status ? status.status : 'Unknown Status',
      priority: priority ? priority.level : 'Unknown Priority',
      assignedTo: assignedTo ? assignedTo.name : 'Unassigned'
    });
  });
  
  return enrichedRequests;
};

// Get requests by department (only admins, managers, and supervisors can view all departments)
LocalStorageService.prototype.getRequestsByDepartment = function(departmentName, userRole) {
  // Check permissions for viewing all departments
  // For prototype, we'll allow any user to view department requests
  // In a real implementation, we would check permissions
  
  var data = this.getData();
  var department = data.departments.find(function(d) { return d.name === departmentName; });
  
  if (!department) {
    return {
      success: false,
      error: 'Department not found'
    };
  }
  
  // Get requests for this department
  var departmentRequests = data.requests.filter(function(request) { return request.departmentId === department.id; });
  
  // Enrich requests with related data
  var enrichedRequests = departmentRequests.map(function(request) {
    var guest = data.guests.find(function(g) { return g.id === request.guestId; });
    var room = data.rooms.find(function(r) { return r.id === request.roomId; });
    var status = data.requestStatuses.find(function(s) { return s.id === request.statusId; });
    var priority = data.priorities.find(function(p) { return p.id === request.priorityId; });
    var assignedTo = request.assignedToId ? data.users.find(function(u) { return u.id === request.assignedToId; }) : null;
    
    return Object.assign({}, request, {
      guestName: guest ? guest.name : 'Unknown Guest',
      roomNumber: room ? room.number : 'Unknown Room',
      department: department.name,
      status: status ? status.status : 'Unknown Status',
      priority: priority ? priority.level : 'Unknown Priority',
      assignedTo: assignedTo ? assignedTo.name : 'Unassigned'
    });
  });
  
  return {
    success: true,
    requests: enrichedRequests
  };
};

// Create a new request (only admins, managers, supervisors, and front office can create)
// For prototype, we'll allow any user to create requests
// In a real implementation, we would check permissions
LocalStorageService.prototype.createRequest = function(requestData, userRole) {
  
  var data = this.getData();
  
  // Generate new ID
  var newId = data.requests.length > 0 ? Math.max.apply(Math, data.requests.map(function(r) { return r.id; })) + 1 : 1;
  
  // Determine department based on request type
  var department = this.routeRequestToDepartment(requestData.type);
  var departmentObj = data.departments.find(function(d) { return d.name === department; });
  
  // Create new request
  var newRequest = {
    id: newId,
    guestId: requestData.guestId,
    roomId: requestData.roomId,
    departmentId: departmentObj ? departmentObj.id : 1, // Default to housekeeping
    title: requestData.title,
    description: requestData.description,
    priorityId: requestData.priorityId || 2, // Default to medium
    statusId: 1, // Default to pending
    assignedToId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Add to requests array
  data.requests.push(newRequest);
  
  // Save data
  this.saveData(data);
  
  // Enrich with related data
  var guest = data.guests.find(function(g) { return g.id === newRequest.guestId; });
  var room = data.rooms.find(function(r) { return r.id === newRequest.roomId; });
  var status = data.requestStatuses.find(function(s) { return s.id === newRequest.statusId; });
  var priority = data.priorities.find(function(p) { return p.id === newRequest.priorityId; });
  
  return {
    success: true,
    request: Object.assign({}, newRequest, {
      guestName: guest ? guest.name : 'Unknown Guest',
      roomNumber: room ? room.number : 'Unknown Room',
      department: department,
      status: status ? status.status : 'Unknown Status',
      priority: priority ? priority.level : 'Unknown Priority',
      assignedTo: 'Unassigned'
    })
  };
};

// Update request status (only admins, managers, and supervisors can update)
// For prototype, we'll allow any user to update request status
// In a real implementation, we would check permissions
LocalStorageService.prototype.updateRequestStatus = function(requestId, newStatus, userId, userRole) {
  
  var data = this.getData();
  var statusObj = data.requestStatuses.find(function(s) { return s.status === newStatus; });
  
  if (!statusObj) {
    return {
      success: false,
      error: 'Invalid status'
    };
  }
  
  var requestIndex = data.requests.findIndex(function(request) { return request.id === parseInt(requestId); });
  
  if (requestIndex !== -1) {
    data.requests[requestIndex].statusId = statusObj.id;
    data.requests[requestIndex].updatedAt = new Date().toISOString();
    
    // If completing request, assign to user
    if (newStatus === 'COMPLETED') {
      data.requests[requestIndex].assignedToId = userId;
    }
    
    this.saveData(data);
    
    // Enrich with related data
    var request = data.requests[requestIndex];
    var guest = data.guests.find(function(g) { return g.id === request.guestId; });
    var room = data.rooms.find(function(r) { return r.id === request.roomId; });
    var requestStatus = data.requestStatuses.find(function(s) { return s.id === request.statusId; });
    var priority = data.priorities.find(function(p) { return p.id === request.priorityId; });
    var assignedTo = request.assignedToId ? data.users.find(function(u) { return u.id === request.assignedToId; }) : null;
    
    return {
      success: true,
      request: Object.assign({}, request, {
        guestName: guest ? guest.name : 'Unknown Guest',
        roomNumber: room ? room.number : 'Unknown Room',
        department: (data.departments.find(function(d) { return d.id === request.departmentId; }) || {}).name || 'Unknown Department',
        status: requestStatus ? requestStatus.status : 'Unknown Status',
        priority: priority ? priority.level : 'Unknown Priority',
        assignedTo: assignedTo ? assignedTo.name : 'Unassigned'
      })
    };
  }
  
  return {
    success: false,
    error: 'Request not found'
  };
};

// Route request to appropriate department based on request type
LocalStorageService.prototype.routeRequestToDepartment = function(requestType) {
  var routingMap = {
    'cleaning': 'HOUSEKEEPING',
    'maintenance': 'MAINTENANCE',
    'room_service': 'FOOD_AND_BEVERAGE',
    'amenity': 'FOOD_AND_BEVERAGE',
    'checkout': 'FRONT_OFFICE',
    'checkin': 'FRONT_OFFICE',
    'complaint': 'MANAGEMENT',
    'other': 'FRONT_OFFICE'
  };

  return routingMap[requestType] || 'FRONT_OFFICE';
};

// Get statistics for dashboard
LocalStorageService.prototype.getDashboardStats = function() {
  var data = this.getData();
  
  var pendingRequests = data.requests.filter(function(r) {
    var status = data.requestStatuses.find(function(s) { return s.id === r.statusId; });
    return status && status.status === 'PENDING';
  }).length;
  
  var occupiedRooms = data.rooms.filter(function(r) { return r.status !== 'CLEAN'; }).length;
  var availableRooms = data.rooms.filter(function(r) { return r.status === 'CLEAN'; }).length;
  
  return {
    pendingRequests: pendingRequests,
    occupiedRooms: occupiedRooms,
    availableRooms: availableRooms
  };
};

// Get recent activity
LocalStorageService.prototype.getRecentActivity = function() {
  var data = this.getData();
  
  // Get recent requests
  var recentRequests = data.requests
    .slice()
    .sort(function(a, b) { return new Date(b.createdAt) - new Date(a.createdAt); })
    .slice(0, 5)
    .map(function(request) {
      var guest = data.guests.find(function(g) { return g.id === request.guestId; });
      var room = data.rooms.find(function(r) { return r.id === request.roomId; });
      var status = data.requestStatuses.find(function(s) { return s.id === request.statusId; });
      
      return {
        id: request.id,
        type: 'request',
        title: status.status === 'COMPLETED' ? 'Request completed' : 'New request created',
        description: (guest ? guest.name : 'Guest') + ' - ' + request.title + ' (' + (room ? 'Room ' + room.number : 'Unknown Room') + ')',
        timestamp: request.updatedAt || request.createdAt,
        status: status ? status.status : 'Unknown'
      };
    });
  
  // Get recent room status changes
  var recentRoomChanges = data.rooms
    .filter(function(room) { return room.updatedAt; })
    .slice()
    .sort(function(a, b) { return new Date(b.updatedAt) - new Date(a.updatedAt); })
    .slice(0, 5)
    .map(function(room) {
      return {
        id: room.id,
        type: 'room',
        title: 'Room status updated',
        description: 'Room ' + room.number + ' marked as ' + room.status,
        timestamp: room.updatedAt,
        status: room.status
      };
    });
  
  // Combine and sort by timestamp
  var recentActivity = recentRequests.concat(recentRoomChanges)
    .sort(function(a, b) { return new Date(b.timestamp) - new Date(a.timestamp); })
    .slice(0, 5);
  
  return recentActivity;
};

// Export as a singleton
var localStorageService = new LocalStorageService();
module.exports = localStorageService;