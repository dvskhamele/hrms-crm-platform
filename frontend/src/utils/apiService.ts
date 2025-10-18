// API Service for Recruitment Management System
// Disable API calls completely for frontend-only mode
const API_BASE_URL = 'http://localhost:3002'; // Updated to use the correct port for backend-api.js
const DISABLE_API_CALLS = false;
const USE_MOCK_DATA = true; // Changed back to use mock data for UI components

// Helper function to always return mock data when USE_MOCK_DATA is true
const useMockData = () => USE_MOCK_DATA || DISABLE_API_CALLS;

// Types for our API responses
interface LoginResponse {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
  token: string;
}

interface DashboardStats {
  stats: {
    pendingApplications: number;
    activeCandidates: number;
    availablePositions: number;
    revenueToday: number;
    hiringRate: number;
    recruitersActive: number;
    pendingInterviews: number;
    avgResponseTime: number;
    candidateSatisfaction: number;
  };
}

interface DashboardActivity {
  activity: Array<{
    id: number;
    type: string;
    title: string;
    description: string;
    timestamp: string;
    status: string;
  }>;
}

interface DashboardPositions {
  positions: Array<{
    id: number;
    title: string;
    department: string;
    status: string;
  }>;
}

interface DashboardApplications {
  applications: Array<{
    id: number;
    candidateId: number;
    positionId: number;
    departmentId: number;
    title: string;
    description: string;
    statusId: number;
    status: string;
    candidateName: string;
    positionTitle: string;
    department: string;
  }>;
}

interface DashboardPerformance {
  candidateScreening: number;
  interviewScheduling: number;
  onboarding: number;
}

interface PositionsResponse {
  positions: Array<{
    id: number;
    title: string;
    department: string;
    status: string;
  }>;
}

interface RecruitersResponse {
  recruiters: Array<{
    id: number;
    name: string;
    role: string;
    status: string;
  }>;
}

interface ApplicationsResponse {
  applications: Array<{
    id: number;
    candidateId: number;
    positionId: number;
    departmentId: number;
    title: string;
    description: string;
    statusId: number;
    status: string;
    candidateName: string;
    positionTitle: string;
    department: string;
  }>;
}

interface ResourcesResponse {
  resources: Array<{
    id: number;
    name: string;
    quantity: number;
    minStock: number;
  }>;
}

interface DepartmentsResponse {
  departments: Array<{
    id: number;
    name: string;
    description: string;
  }>;
}



class APIService {
  // Authentication
  async login(email: string, password: string): Promise<LoginResponse> {
    // Skip actual API call and always return mock data
    console.log('Using mock login for prototype');
    return {
      user: {
        id: 1,
        email: email,
        name: email.split('@')[0],
        role: 'ADMIN'
      },
      token: 'mock-jwt-token'
    };
  }

  async register(userData: { email: string; password: string; name: string; companyName: string; companySize: string }): Promise<LoginResponse> {
    // Skip actual API call and always return mock data
    console.log('Using mock registration for prototype');
    return {
      user: {
        id: 1,
        email: userData.email,
        name: userData.name,
        role: 'ADMIN'
      },
      token: 'mock-jwt-token'
    };
  }

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    // Always return mock data for frontend-only mode - no conditionals
    console.log('Using mock dashboard stats for prototype - always returning mock data');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      stats: {
        pendingApplications: 12,
        activeCandidates: 65,
        availablePositions: 35,
        revenueToday: 12500,
        hiringRate: 65,
        recruitersActive: 24,
        pendingInterviews: 8,
        avgResponseTime: 32,
        candidateSatisfaction: 94
      }
    };
  }

  async getDashboardActivity(): Promise<DashboardActivity> {
    if (useMockData()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        activity: [
          {
            id: 1,
            type: 'application',
            title: 'New application created',
            description: 'John Doe - Software Engineer',
            timestamp: new Date().toISOString(),
            status: 'REVIEWED'
          },
          {
            id: 2,
            type: 'position',
            title: 'Position status updated',
            description: 'Software Engineer marked as FILLED',
            timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            status: 'FILLED'
          },
          {
            id: 3,
            type: 'application',
            title: 'Application completed',
            description: 'Jane Smith - Marketing Manager',
            timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
            status: 'HIRED'
          }
        ]
      };
    }

    /*
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard/activity`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      console.error('Dashboard activity error:', error);
    }
    */

    // Always return mock data
    return {
      activity: [
        {
          id: 1,
          type: 'application',
          title: 'New application created',
          description: 'John Doe - Software Engineer',
          timestamp: new Date().toISOString(),
          status: 'REVIEWED'
        },
        {
          id: 2,
          type: 'position',
          title: 'Position status updated',
          description: 'Software Engineer marked as FILLED',
          timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          status: 'FILLED'
        },
        {
          id: 3,
          type: 'application',
          title: 'Application completed',
          description: 'Jane Smith - Marketing Manager',
          timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
          status: 'HIRED'
        }
      ]
    };
  }

  async getDashboardPositions(): Promise<DashboardPositions> {
    // Always return mock data for frontend-only mode - no conditionals
    console.log('Using mock dashboard positions for prototype - always returning mock data');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    // Try to get from localStorage first
    const storedPositions = localStorage.getItem('recruitmentPositions');
    if (storedPositions) {
      return JSON.parse(storedPositions);
    }
    return {
      positions: [
        { id: 1, title: 'Software Engineer', department: 'Technology', status: 'OPEN' },
        { id: 2, title: 'Marketing Manager', department: 'Marketing', status: 'OPEN' },
        { id: 3, title: 'Sales Associate', department: 'Sales', status: 'CLOSED' },
        { id: 4, title: 'HR Director', department: 'Human Resources', status: 'ON_HOLD' }
      ]
    };
  }

  async getDashboardApplications(): Promise<DashboardApplications> {
    if (useMockData()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedApplications = localStorage.getItem('recruitmentApplications');
      if (storedApplications) {
        return JSON.parse(storedApplications);
      }
      return {
        applications: [
          {
            id: 1,
            candidateId: 1,
            positionId: 1,
            departmentId: 1,
            title: 'Software Engineer',
            description: 'Senior Software Engineer with 5+ years experience',
            statusId: 1,
            status: 'REVIEWED',
            candidateName: 'John Smith',
            positionTitle: 'Software Engineer',
            department: 'TECHNOLOGY'
          }
        ]
      };
    }

    /*
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard/applications`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      console.error('Dashboard applications error:', error);
    }
    */

    // Always return mock data
    return {
      applications: [
        {
          id: 1,
          candidateId: 1,
          positionId: 1,
          departmentId: 1,
          title: 'Software Engineer',
          description: 'Senior Software Engineer with 5+ years experience',
          statusId: 1,
          status: 'REVIEWED',
          candidateName: 'John Smith',
          positionTitle: 'Software Engineer',
          department: 'TECHNOLOGY'
        }
      ]
    };
  }

  async getDashboardPerformance(): Promise<DashboardPerformance> {
    // Always return mock data for frontend-only mode - no conditionals
    console.log('Using mock dashboard performance for prototype - always returning mock data');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      candidateScreening: 92,
      interviewScheduling: 87,
      onboarding: 95
    };
  }

  // Positions
  async getPositions(): Promise<PositionsResponse> {
    if (useMockData()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        positions: [
          { id: 1, title: 'Software Engineer', department: 'Technology', status: 'OPEN' },
          { id: 2, title: 'Marketing Manager', department: 'Marketing', status: 'OPEN' },
          { id: 3, title: 'Sales Associate', department: 'Sales', status: 'CLOSED' },
          { id: 4, title: 'HR Director', department: 'Human Resources', status: 'ON_HOLD' }
        ]
      };
    }

    /*
    try {
      const response = await fetch(`${API_BASE_URL}/api/positions`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      console.error('Positions error:', error);
    }
    */

    // Always return mock data
    return {
      positions: [
        { id: 1, title: 'Software Engineer', department: 'Technology', status: 'OPEN' },
        { id: 2, title: 'Marketing Manager', department: 'Marketing', status: 'OPEN' },
        { id: 3, title: 'Sales Associate', department: 'Sales', status: 'CLOSED' },
        { id: 4, title: 'HR Director', department: 'Human Resources', status: 'ON_HOLD' }
      ]
    };
  }

  async updatePositionStatus(positionId: number, status: string): Promise<any> {
    if (useMockData()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        success: true,
        position: {
          id: positionId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }

    /*
    try {
      const response = await fetch(`${API_BASE_URL}/api/positions/${positionId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }

      return response.json();
    } catch (error) {
      console.error('Position status update error:', error);
    }
    */

    // Always return mock data
    return {
      success: true,
      position: {
        id: positionId,
        status: status,
        updatedAt: new Date().toISOString()
      }
    };
  }

  // Recruiters
  async getRecruiters(): Promise<RecruitersResponse> {
    if (useMockData()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        recruiters: [
          { id: 1, name: 'John Smith', role: 'Manager', status: 'ACTIVE' },
          { id: 2, name: 'Jane Doe', role: 'Recruiter', status: 'ACTIVE' },
          { id: 3, name: 'Robert Johnson', role: 'Coordinator', status: 'ON_BREAK' }
        ]
      };
    }

    /*
    try {
      const response = await fetch(`${API_BASE_URL}/api/recruiters`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      console.error('Recruiters error:', error);
    }
    */

    // Always return mock data
    return {
      recruiters: [
        { id: 1, name: 'John Smith', role: 'Manager', status: 'ACTIVE' },
        { id: 2, name: 'Jane Doe', role: 'Recruiter', status: 'ACTIVE' },
        { id: 3, name: 'Robert Johnson', role: 'Coordinator', status: 'ON_BREAK' }
      ]
    };
  }

  async updateRecruiterStatus(recruiterId: number, status: string): Promise<any> {
    if (useMockData()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        success: true,
        recruiter: {
          id: recruiterId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }

    /*
    try {
      const response = await fetch(`${API_BASE_URL}/api/recruiters/${recruiterId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }

      return response.json();
    } catch (error) {
      console.error('Recruiter status update error:', error);
    }
    */

    // Always return mock data
    return {
      success: true,
      recruiter: {
        id: recruiterId,
        status: status,
        updatedAt: new Date().toISOString()
      }
    };
  }

  // Applications
  async getApplications(): Promise<ApplicationsResponse> {
    if (useMockData()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        applications: [
          {
            id: 1,
            candidateId: 1,
            positionId: 1,
            departmentId: 1,
            title: 'Software Engineer',
            description: 'Senior Software Engineer with 5+ years experience',
            statusId: 1,
            status: 'REVIEWED',
            candidateName: 'John Smith',
            positionTitle: 'Software Engineer',
            department: 'TECHNOLOGY'
          }
        ]
      };
    }

    /*
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      console.error('Applications error:', error);
    }
    */

    // Always return mock data
    return {
      applications: [
        {
          id: 1,
          candidateId: 1,
          positionId: 1,
          departmentId: 1,
          title: 'Software Engineer',
          description: 'Senior Software Engineer with 5+ years experience',
          statusId: 1,
          status: 'REVIEWED',
          candidateName: 'John Smith',
          positionTitle: 'Software Engineer',
          department: 'TECHNOLOGY'
        }
      ]
    };
  }

  async updateApplicationStatus(applicationId: number, status: string): Promise<any> {
    if (useMockData()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        success: true,
        application: {
          id: applicationId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }

    /*
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }

      return response.json();
    } catch (error) {
      console.error('Application status update error:', error);
    }
    */

    // Always return mock data
    return {
      success: true,
      application: {
        id: applicationId,
        status: status,
        updatedAt: new Date().toISOString()
      }
    };
  }



  // Resources
  async getResources(): Promise<ResourcesResponse> {
    if (useMockData()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        resources: [
          { id: 1, name: 'Conference Room A', quantity: 100, minStock: 50 },
          { id: 2, name: 'Interview Scheduling', quantity: 200, minStock: 75 },
          { id: 3, name: 'Background Checks', quantity: 150, minStock: 60 }
        ]
      };
    }

    /*
    try {
      const response = await fetch(`${API_BASE_URL}/api/resources`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      console.error('Resources error:', error);
    }
    */

    // Always return mock data
    return {
      resources: [
        { id: 1, name: 'Conference Room A', quantity: 100, minStock: 50 },
        { id: 2, name: 'Interview Scheduling', quantity: 200, minStock: 75 },
        { id: 3, name: 'Background Checks', quantity: 150, minStock: 60 }
      ]
    };
  }

  async updateResourceQuantity(resourceId: number, quantity: number): Promise<any> {
    if (useMockData()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        success: true,
        resource: {
          id: resourceId,
          quantity: quantity,
          updatedAt: new Date().toISOString()
        }
      };
    }

    /*
    try {
      const response = await fetch(`${API_BASE_URL}/api/resources/${resourceId}/quantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update resource quantity');
      }

      return response.json();
    } catch (error) {
      console.error('Resource quantity update error:', error);
    }
    */

    // Always return mock data
    return {
      success: true,
      resource: {
        id: resourceId,
        quantity: quantity,
        updatedAt: new Date().toISOString()
      }
    };
  }

  // Departments
  async getDepartments(): Promise<DepartmentsResponse> {
    if (useMockData()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        departments: [
          { id: 1, name: 'TECHNOLOGY', description: 'Technology Department' },
          { id: 2, name: 'MARKETING', description: 'Marketing Department' },
          { id: 3, name: 'SALES', description: 'Sales Department' },
          { id: 4, name: 'HUMAN_RESOURCES', description: 'Human Resources Department' }
        ]
      };
    }

    /*
    try {
      const response = await fetch(`${API_BASE_URL}/api/departments`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      console.error('Departments error:', error);
    }
    */

    // Always return mock data
    return {
      departments: [
        { id: 1, name: 'TECHNOLOGY', description: 'Technology Department' },
        { id: 2, name: 'MARKETING', description: 'Marketing Department' },
        { id: 3, name: 'SALES', description: 'Sales Department' },
        { id: 4, name: 'HUMAN_RESOURCES', description: 'Human Resources Department' }
      ]
    };
  }

  // HR Operations - Process new candidate application
  async processCandidateApplication(candidateInfo: any): Promise<any> {
    if (useMockData()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        success: true,
        application: {
          id: Math.floor(Math.random() * 1000),
          candidateName: candidateInfo.name,
          positionId: candidateInfo.positionId || 1,
          title: candidateInfo.positionApplied || 'New Application',
          status: 'PENDING',
          createdAt: new Date().toISOString()
        },
        candidate: {
          id: Math.floor(Math.random() * 1000),
          name: candidateInfo.name,
          email: candidateInfo.email,
          status: 'Applied'
        }
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/hr/operations/application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ candidateInfo }),
      });

      if (!response.ok) {
        throw new Error('Failed to process candidate application');
      }

      return response.json();
    } catch (error) {
      console.error('Process candidate application error:', error);
      throw error;
    }
  }
}

const apiService = new APIService();
export default apiService;