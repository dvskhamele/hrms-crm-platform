// API Service for interacting with backend
class ApiService {
  constructor() {
    // Use environment variable for API URL, with fallback to localhost:3001
    // For Netlify deployments, the API will be at the same origin
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 
                  (typeof window !== 'undefined' ? window.location.origin + '/api' : 'http://localhost:3001/api');
    // In production, always use mock data
    this.useMockData = process.env.NODE_ENV === 'production';
  }

  // Mock data for when backend is not available
  getMockDashboardStats() {
    return Promise.resolve({
      pendingApplications: 12,
      activePositions: 42,
      availablePositions: 8,
      totalRecruiters: 24,
      candidateSatisfaction: 94,
      revenue: 12500
    });
  }

  getMockRecentActivity() {
    return Promise.resolve([
      {
        id: 1,
        type: 'application',
        title: 'New application submitted',
        description: 'John Doe - Software Engineer (Position 205)',
        time: '2 minutes ago'
      },
      {
        id: 2,
        type: 'position',
        title: 'Position status updated',
        description: 'Position 103 marked as In Review',
        time: '1 hour ago'
      },
      {
        id: 3,
        type: 'application',
        title: 'Application processed',
        description: 'Interview completed for Position 102',
        time: '15 minutes ago'
      },
      {
        id: 4,
        type: 'scheduling',
        title: 'Interview scheduled',
        description: 'Interview scheduled for Position 302',
        time: '2 hours ago'
      }
    ]);
  }

  getMockNotifications() {
    return Promise.resolve([
      {
        id: 1,
        title: 'New application received',
        message: 'John Doe applied for Software Engineer position',
        time: '2 minutes ago',
        read: false
      },
      {
        id: 2,
        title: 'Position status updated',
        message: 'Position 103 has been marked as In Review',
        time: '1 hour ago',
        read: false
      },
      {
        id: 3,
        title: 'Interview scheduled',
        message: 'Interview scheduled for Position 302',
        time: '2 hours ago',
        read: true
      }
    ]);
  }

  // Authentication
  async login(email, password) {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return Promise.resolve({
        user: { id: 1, name: 'Admin User', email: email, role: 'admin' },
        token: 'mock-jwt-token'
      });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      return response.json();
    } catch (error) {
      // Mock login for development
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock login due to backend error:', error);
      }
      return Promise.resolve({
        user: { id: 1, name: 'Admin User', email: email, role: 'admin' },
        token: 'mock-jwt-token'
      });
    }
  }

  // Dashboard
  async getDashboardStats() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return this.getMockDashboardStats();
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock dashboard stats due to backend error:', error);
      }
      return this.getMockDashboardStats();
    }
  }

  async getRecentActivity() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return this.getMockRecentActivity();
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/dashboard/activity`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock recent activity due to backend error:', error);
      }
      return this.getMockRecentActivity();
    }
  }

  // Additional dashboard functions matching backend API endpoints
  async getDashboardActivity() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return { activity: this.getMockRecentActivity() };
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/dashboard/activity`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock dashboard activity due to backend error:', error);
      }
      return { activity: this.getMockRecentActivity() };
    }
  }

  async getDashboardPositions() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Mock positions data
      return {
        positions: [
          { id: 1, title: 'Software Engineer', department: 'Technology', status: 'Open', updatedAt: '2 hours ago' },
          { id: 2, title: 'Marketing Manager', department: 'Marketing', status: 'In Review', updatedAt: '5 hours ago' },
          { id: 3, title: 'Sales Associate', department: 'Sales', status: 'Filled', updatedAt: '1 day ago' },
          { id: 4, title: 'HR Director', department: 'Human Resources', status: 'On Hold', updatedAt: '3 hours ago' }
        ]
      };
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/dashboard/positions`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock dashboard positions due to backend error:', error);
      }
      return {
        positions: [
          { id: 1, title: 'Software Engineer', department: 'Technology', status: 'Open', updatedAt: '2 hours ago' },
          { id: 2, title: 'Marketing Manager', department: 'Marketing', status: 'In Review', updatedAt: '5 hours ago' },
          { id: 3, title: 'Sales Associate', department: 'Sales', status: 'Filled', updatedAt: '1 day ago' },
          { id: 4, title: 'HR Director', department: 'Human Resources', status: 'On Hold', updatedAt: '3 hours ago' }
        ]
      };
    }
  }

  async getDashboardApplications() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Mock applications data
      return {
        applications: [
          { id: 1, candidateName: 'John Doe', title: 'Software Engineer Application', department: 'Technology', priority: 'MEDIUM', status: 'PENDING' },
          { id: 2, candidateName: 'Jane Smith', title: 'Marketing Manager Application', department: 'Marketing', priority: 'HIGH', status: 'IN_PROGRESS' },
          { id: 3, candidateName: 'Robert Johnson', title: 'Sales Associate Application', department: 'Sales', priority: 'URGENT', status: 'PENDING' },
          { id: 4, candidateName: 'Emily Wilson', title: 'HR Director Application', department: 'Human Resources', priority: 'LOW', status: 'COMPLETED' }
        ]
      };
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/dashboard/applications`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock dashboard applications due to backend error:', error);
      }
      return {
        applications: [
          { id: 1, candidateName: 'John Doe', title: 'Software Engineer Application', department: 'Technology', priority: 'MEDIUM', status: 'PENDING' },
          { id: 2, candidateName: 'Jane Smith', title: 'Marketing Manager Application', department: 'Marketing', priority: 'HIGH', status: 'IN_PROGRESS' },
          { id: 3, candidateName: 'Robert Johnson', title: 'Sales Associate Application', department: 'Sales', priority: 'URGENT', status: 'PENDING' },
          { id: 4, candidateName: 'Emily Wilson', title: 'HR Director Application', department: 'Human Resources', priority: 'LOW', status: 'COMPLETED' }
        ]
      };
    }
  }

  async getDashboardPerformance() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Mock performance data
      return {
        candidateScreening: 92,
        interviewScheduling: 87,
        onboarding: 95
      };
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/dashboard/performance`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock dashboard performance due to backend error:', error);
      }
      return {
        candidateScreening: 92,
        interviewScheduling: 87,
        onboarding: 95
      };
    }
  }

  // Rooms
  async getAllRooms() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedPositions = localStorage.getItem('recruitingPositions');
      if (storedPositions) {
        return Promise.resolve(JSON.parse(storedPositions));
      }
      return Promise.resolve([
        { id: 101, status: 'open', lastUpdated: '2 hours ago' },
        { id: 102, status: 'in-review', lastUpdated: '5 hours ago' },
        { id: 103, status: 'filled', lastUpdated: '1 day ago' },
        { id: 104, status: 'on-hold', lastUpdated: '3 hours ago' }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/rooms`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock rooms data due to backend error:', error);
      }
      return Promise.resolve([
        { id: 101, status: 'clean', lastUpdated: '2 hours ago' },
        { id: 102, status: 'dirty', lastUpdated: '5 hours ago' },
        { id: 103, status: 'inspected', lastUpdated: '1 day ago' },
        { id: 104, status: 'dirty', lastUpdated: '3 hours ago' }
      ]);
    }
  }

  async getRoomById(id) {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return Promise.resolve({
        id: id,
        status: 'clean',
        lastUpdated: '2 hours ago'
      });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/rooms/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock room data due to backend error:', error);
      }
      return Promise.resolve({
        id: id,
        status: 'clean',
        lastUpdated: '2 hours ago'
      });
    }
  }

  async updateRoomStatus(id, status, userId) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedPositions = localStorage.getItem('recruitingPositions');
      let positions = storedPositions ? JSON.parse(storedPositions) : [
        { id: 101, status: 'open', lastUpdated: '2 hours ago' },
        { id: 102, status: 'in-review', lastUpdated: '5 hours ago' },
        { id: 103, status: 'filled', lastUpdated: '1 day ago' },
        { id: 104, status: 'on-hold', lastUpdated: '3 hours ago' }
      ];
      
      const positionIndex = positions.findIndex(position => position.id === id);
      if (positionIndex !== -1) {
        positions[positionIndex] = { ...positions[positionIndex], status, lastUpdated: 'Just now' };
        localStorage.setItem('recruitingPositions', JSON.stringify(positions));
      }
      
      return Promise.resolve({
        id: id,
        status: status,
        lastUpdated: 'Just now'
      });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/rooms/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status, userId }),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock room update due to backend error:', error);
      }
      return Promise.resolve({
        id: id,
        status: status,
        lastUpdated: 'Just now'
      });
    }
  }

  // Requests
  async getAllRequests() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedApplications = localStorage.getItem('recruitingApplications');
      if (storedApplications) {
        return Promise.resolve(JSON.parse(storedApplications));
      }
      return Promise.resolve([
        { id: 1, candidate: 'John Doe', position: 205, request: 'Software Engineer', priority: 'medium', status: 'pending' },
        { id: 2, candidate: 'Jane Smith', position: 102, request: 'Product Manager', priority: 'high', status: 'in-progress' },
        { id: 3, candidate: 'Robert Johnson', position: 302, request: 'Designer', priority: 'low', status: 'completed' }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/requests`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock applications data due to backend error:', error);
      }
      return Promise.resolve([
        { id: 1, candidate: 'John Doe', position: 205, request: 'Software Engineer', priority: 'medium', status: 'pending' },
        { id: 2, candidate: 'Jane Smith', position: 102, request: 'Product Manager', priority: 'high', status: 'in-progress' },
        { id: 3, candidate: 'Robert Johnson', position: 302, request: 'Designer', priority: 'low', status: 'completed' }
      ]);
    }
  }

  async getRequestsByDepartment(department) {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return Promise.resolve([]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/requests/department/${department}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock department requests due to backend error:', error);
      }
      return Promise.resolve([]);
    }
  }

  async createRequest(requestData) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedApplications = localStorage.getItem('recruitingApplications');
      let applications = storedApplications ? JSON.parse(storedApplications) : [
        { id: 1, candidate: 'John Doe', position: 205, request: 'Software Engineer', priority: 'medium', status: 'pending' },
        { id: 2, candidate: 'Jane Smith', position: 102, request: 'Product Manager', priority: 'high', status: 'in-progress' },
        { id: 3, candidate: 'Robert Johnson', position: 302, request: 'Designer', priority: 'low', status: 'completed' }
      ];
      
      const newApplication = {
        id: Date.now(),
        ...requestData,
        status: 'pending'
      };
      
      applications.push(newApplication);
      localStorage.setItem('recruitingApplications', JSON.stringify(applications));
      
      return Promise.resolve(newApplication);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(requestData),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock application creation due to backend error:', error);
      }
      return Promise.resolve({
        id: Date.now(),
        ...requestData,
        status: 'pending'
      });
    }
  }

  async updateRequestStatus(id, status, userId) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedApplications = localStorage.getItem('recruitingApplications');
      let applications = storedApplications ? JSON.parse(storedApplications) : [
        { id: 1, candidate: 'John Doe', position: 205, request: 'Software Engineer', priority: 'medium', status: 'pending' },
        { id: 2, candidate: 'Jane Smith', position: 102, request: 'Product Manager', priority: 'high', status: 'in-progress' },
        { id: 3, candidate: 'Robert Johnson', position: 302, request: 'Designer', priority: 'low', status: 'completed' }
      ];
      
      const applicationIndex = applications.findIndex(application => application.id === id);
      if (applicationIndex !== -1) {
        applications[applicationIndex] = { ...applications[applicationIndex], status };
        localStorage.setItem('recruitingApplications', JSON.stringify(applications));
      }
      
      return Promise.resolve({
        id: id,
        status: status
      });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/requests/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status, userId }),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock application update due to backend error:', error);
      }
      return Promise.resolve({
        id: id,
        status: status
      });
    }
  }

  // Notifications
  async getNotifications() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return this.getMockNotifications();
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/notifications`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock notifications due to backend error:', error);
      }
      return this.getMockNotifications();
    }
  }

  async markNotificationAsRead(id) {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return Promise.resolve({ success: true });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/notifications/${id}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock notification update due to backend error:', error);
      }
      return Promise.resolve({ success: true });
    }
  }

  async markAllNotificationsAsRead() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return Promise.resolve({ success: true });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/notifications/read-all`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock notification update due to backend error:', error);
      }
      return Promise.resolve({ success: true });
    }
  }
}

// Export as a singleton
const apiService = new ApiService();
export default apiService;