// Recruitment Service - Handles all recruitment-related operations
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

class RecruitmentService {
  constructor() {
    // Initialize with default data if not exists
    this.initializeData();
  }

  // Initialize default data in localStorage
  initializeData() {
    // Check if we already have recruitment data
    if (!localStorage.getItem('recruitmentData')) {
      const initialData = {
        users: [
          { 
            id: 1, 
            email: 'admin@gem.com', 
            password: 'password123', 
            role: 'ADMIN', 
            name: 'Admin User',
            companyName: 'Gem Inc.',
            companySize: '51-200'
          },
        ],
        positions: [
          { 
            id: 1, 
            title: 'Software Engineer', 
            department: 'Technology', 
            status: 'OPEN',
            description: 'Looking for an experienced software engineer with React and Node.js experience',
            requirements: ['JavaScript', 'React', 'Node.js', '5+ years experience'],
            updatedAt: new Date().toISOString()
          },
          { 
            id: 2, 
            title: 'Marketing Manager', 
            department: 'Marketing', 
            status: 'OPEN',
            description: 'Seeking a marketing manager to lead our marketing initiatives',
            requirements: ['Marketing Strategy', 'Digital Marketing', 'Team Management'],
            updatedAt: new Date().toISOString()
          },
          { 
            id: 3, 
            title: 'HR Director', 
            department: 'Human Resources', 
            status: 'IN_REVIEW',
            description: 'Senior HR role requiring extensive experience in talent management',
            requirements: ['HR Management', 'Talent Acquisition', '5+ years experience'],
            updatedAt: new Date().toISOString()
          }
        ],
        applications: [
          { 
            id: 1, 
            candidateName: 'John Doe', 
            candidateEmail: 'john.doe@example.com',
            positionId: 1,
            positionTitle: 'Software Engineer', 
            department: 'Technology',
            status: 'REVIEWED',
            priority: 'MEDIUM',
            appliedDate: new Date().toISOString(),
            description: 'Experienced software engineer with React and Node.js skills',
            resume: 'resume_john_doe.pdf',
            coverLetter: 'I am very interested in this position...'
          },
          { 
            id: 2, 
            candidateName: 'Jane Smith', 
            candidateEmail: 'jane.smith@example.com',
            positionId: 2,
            positionTitle: 'Marketing Manager', 
            department: 'Marketing',
            status: 'PENDING',
            priority: 'HIGH',
            appliedDate: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            description: 'Marketing professional with 7 years of experience',
            resume: 'resume_jane_smith.pdf',
            coverLetter: 'I have extensive experience in digital marketing...'
          }
        ],
        departments: [
          { id: 1, name: 'TECHNOLOGY', description: 'Technology Department' },
          { id: 2, name: 'MARKETING', description: 'Marketing Department' },
          { id: 3, name: 'SALES', description: 'Sales Department' },
          { id: 4, name: 'HUMAN_RESOURCES', description: 'Human Resources Department' },
          { id: 5, name: 'FINANCE', description: 'Finance Department' },
          { id: 6, name: 'OPERATIONS', description: 'Operations Department' }
        ],
        recruiters: [
          { id: 1, name: 'John Smith', role: 'Manager', status: 'ACTIVE' },
          { id: 2, name: 'Jane Doe', role: 'Recruiter', status: 'ACTIVE' },
          { id: 3, name: 'Robert Johnson', role: 'Coordinator', status: 'ON_BREAK' }
        ]
      };
      
      localStorage.setItem('recruitmentData', JSON.stringify(initialData));
    }
  }

  // Get all data from localStorage
  getData() {
    const data = localStorage.getItem('recruitmentData');
    return data ? JSON.parse(data) : null;
  }

  // Save data to localStorage
  saveData(data) {
    localStorage.setItem('recruitmentData', JSON.stringify(data));
  }

  // User authentication
  login(email, password) {
    const data = this.getData();
    const user = data.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      return {
        success: true,
        token: email, // For prototype, we'll just use email as token
        user: userWithoutPassword
      };
    }
    
    // For prototype, allow login with any email for flexibility
    return {
      success: true,
      token: email,
      user: {
        id: 1,
        email: email,
        role: 'ADMIN',
        name: email.split('@')[0],
        companyName: 'Demo Company',
        companySize: '51-200'
      }
    };
  }

  // User registration
  register(userData) {
    const data = this.getData();
    
    // Check if user already exists
    const existingUser = data.users.find(u => u.email === userData.email);
    
    if (existingUser) {
      return {
        success: false,
        error: 'User with this email already exists'
      };
    }
    
    // Generate new user ID
    const newId = data.users.length > 0 ? Math.max(...data.users.map(u => u.id)) + 1 : 1;
    
    // Create new user
    const newUser = {
      id: newId,
      email: userData.email,
      password: userData.password,
      role: 'ADMIN',
      name: userData.name,
      companyName: userData.companyName,
      companySize: userData.companySize,
      createdAt: new Date().toISOString()
    };
    
    // Add to users array
    data.users.push(newUser);
    this.saveData(data);
    
    // Return user without password
    const { password: pwd, ...userWithoutPassword } = newUser;
    
    return {
      success: true,
      token: userData.email,
      user: userWithoutPassword
    };
  }

  // Get all positions
  getAllPositions() {
    const data = this.getData();
    return data.positions;
  }

  // Get position by ID
  getPositionById(positionId) {
    const data = this.getData();
    return data.positions.find(position => position.id === parseInt(positionId));
  }

  // Update position status
  updatePositionStatus(positionId, newStatus) {
    const data = this.getData();
    const positionIndex = data.positions.findIndex(position => position.id === parseInt(positionId));
    
    if (positionIndex !== -1) {
      data.positions[positionIndex].status = newStatus;
      data.positions[positionIndex].updatedAt = new Date().toISOString();
      
      this.saveData(data);
      
      return {
        success: true,
        position: data.positions[positionIndex]
      };
    }
    
    return {
      success: false,
      error: 'Position not found'
    };
  }

  // Create a new position
  createPosition(positionData) {
    const data = this.getData();
    
    // Generate new ID
    const newId = data.positions.length > 0 ? Math.max(...data.positions.map(p => p.id)) + 1 : 1;
    
    // Create new position
    const newPosition = {
      id: newId,
      title: positionData.title,
      department: positionData.department,
      status: positionData.status || 'OPEN',
      description: positionData.description || '',
      requirements: positionData.requirements || [],
      updatedAt: new Date().toISOString()
    };
    
    // Add to positions array
    data.positions.push(newPosition);
    this.saveData(data);
    
    return {
      success: true,
      position: newPosition
    };
  }

  // Get all applications
  getAllApplications() {
    const data = this.getData();
    return data.applications;
  }

  // Get application by ID
  getApplicationById(applicationId) {
    const data = this.getData();
    return data.applications.find(app => app.id === parseInt(applicationId));
  }

  // Update application status
  updateApplicationStatus(applicationId, newStatus) {
    const data = this.getData();
    const applicationIndex = data.applications.findIndex(app => app.id === parseInt(applicationId));
    
    if (applicationIndex !== -1) {
      data.applications[applicationIndex].status = newStatus;
      data.applications[applicationIndex].updatedAt = new Date().toISOString();
      
      this.saveData(data);
      
      return {
        success: true,
        application: data.applications[applicationIndex]
      };
    }
    
    return {
      success: false,
      error: 'Application not found'
    };
  }

  // Create a new application
  createApplication(applicationData) {
    const data = this.getData();
    
    // Generate new ID
    const newId = data.applications.length > 0 ? Math.max(...data.applications.map(a => a.id)) + 1 : 1;
    
    // Find the position to get its details
    const position = data.positions.find(p => p.id === applicationData.positionId);
    
    // Create new application
    const newApplication = {
      id: newId,
      candidateName: applicationData.candidateName,
      candidateEmail: applicationData.candidateEmail,
      positionId: applicationData.positionId,
      positionTitle: position ? position.title : 'Unknown Position',
      department: position ? position.department : 'Unknown Department',
      status: 'PENDING',
      priority: applicationData.priority || 'MEDIUM',
      appliedDate: new Date().toISOString(),
      description: applicationData.description || '',
      resume: applicationData.resume || null,
      coverLetter: applicationData.coverLetter || '',
      updatedAt: new Date().toISOString()
    };
    
    // Add to applications array
    data.applications.push(newApplication);
    this.saveData(data);
    
    return {
      success: true,
      application: newApplication
    };
  }

  // Get all recruiters
  getAllRecruiters() {
    const data = this.getData();
    return data.recruiters;
  }

  // Update recruiter status
  updateRecruiterStatus(recruiterId, newStatus) {
    const data = this.getData();
    const recruiterIndex = data.recruiters.findIndex(recruiter => recruiter.id === parseInt(recruiterId));
    
    if (recruiterIndex !== -1) {
      data.recruiters[recruiterIndex].status = newStatus;
      
      this.saveData(data);
      
      return {
        success: true,
        recruiter: data.recruiters[recruiterIndex]
      };
    }
    
    return {
      success: false,
      error: 'Recruiter not found'
    };
  }

  // Get all departments
  getAllDepartments() {
    const data = this.getData();
    return data.departments;
  }

  // Get dashboard statistics
  getDashboardStats() {
    const data = this.getData();
    
    const pendingApplications = data.applications.filter(app => app.status === 'PENDING').length;
    const activePositions = data.positions.filter(pos => pos.status === 'OPEN').length;
    const inReviewApplications = data.applications.filter(app => app.status === 'REVIEWED').length;
    const filledPositions = data.positions.filter(pos => pos.status === 'FILLED').length;
    const pendingInterviews = data.applications.filter(app => app.status === 'INTERVIEW_SCH').length;
    
    // Mock data for other metrics
    return {
      pendingApplications,
      activeCandidates: 65, // Mock data
      availablePositions: activePositions,
      revenueToday: 12500, // Mock data
      hiringRate: 65, // Mock data
      recruitersActive: 24, // Mock data
      pendingInterviews: pendingInterviews || 8, // Mock data
      avgResponseTime: 32, // Mock data
      candidateSatisfaction: 94 // Mock data
    };
  }

  // Get dashboard activity
  getDashboardActivity() {
    const data = this.getData();
    
    // Get recent applications
    const recentApplications = [...data.applications]
      .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
      .slice(0, 5)
      .map(app => ({
        id: app.id,
        type: 'application',
        title: app.status === 'PENDING' ? 'New application received' : `Application ${app.status.toLowerCase()}`,
        description: `${app.candidateName} - ${app.positionTitle}`,
        timestamp: app.appliedDate || app.updatedAt,
        status: app.status
      }));
    
    // Get recent position updates
    const recentPositions = [...data.positions]
      .filter(pos => pos.updatedAt)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5)
      .map(pos => ({
        id: pos.id,
        type: 'position',
        title: 'Position status updated',
        description: `${pos.title} marked as ${pos.status}`,
        timestamp: pos.updatedAt,
        status: pos.status
      }));
    
    // Combine and sort by timestamp
    const recentActivity = [...recentApplications, ...recentPositions]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);
    
    return recentActivity;
  }
}

// Export as a singleton
const recruitmentService = new RecruitmentService();
module.exports = recruitmentService;