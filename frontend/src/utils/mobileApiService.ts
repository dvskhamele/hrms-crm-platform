// Mock API service for mobile dashboard
const apiService = {
  getDashboardStats: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      stats: {
        pendingApplications: Math.floor(Math.random() * 20) + 5,
        activeCandidates: Math.floor(Math.random() * 50) + 30,
        availablePositions: Math.floor(Math.random() * 30) + 10,
        revenueToday: Math.floor(Math.random() * 20000) + 5000,
        hiringRate: Math.floor(Math.random() * 40) + 60,
        recruitersActive: Math.floor(Math.random() * 15) + 10,
        pendingInterviews: Math.floor(Math.random() * 10) + 3,
        avgResponseTime: Math.floor(Math.random() * 20) + 15,
        candidateSatisfaction: Math.floor(Math.random() * 20) + 80
      }
    };
  },
  
  getDashboardActivity: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      activity: [
        {
          id: '1',
          title: 'Application Reviewed',
          description: 'Software Engineer position',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          type: 'position',
          status: 'REVIEWED'
        },
        {
          id: '2',
          title: 'Candidate Interview #1247',
          description: 'Marketing Manager role',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          type: 'application',
          status: 'SCHEDULED'
        },
        {
          id: '3',
          title: 'Offer Extended #892',
          description: 'Product Designer position',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          type: 'application',
          status: 'OFFER_EXTENDED'
        },
        {
          id: '4',
          title: 'New Application',
          description: 'Frontend Developer role',
          timestamp: new Date(Date.now() - 14400000).toISOString(),
          type: 'application',
          status: 'RECEIVED'
        },
        {
          id: '5',
          title: 'Candidate Hired',
          description: 'HR Director position',
          timestamp: new Date(Date.now() - 18000000).toISOString(),
          type: 'application',
          status: 'HIRED'
        }
      ]
    };
  },
  
  getDashboardPositions: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      positions: [
        {
          id: 1,
          title: 'Software Engineer',
          department: 'Technology',
          status: 'OPEN'
        },
        {
          id: 2,
          title: 'Marketing Manager',
          department: 'Marketing',
          status: 'IN_REVIEW'
        },
        {
          id: 3,
          title: 'Product Designer',
          department: 'Design',
          status: 'FILLED'
        },
        {
          id: 4,
          title: 'HR Director',
          department: 'Human Resources',
          status: 'ON_HOLD'
        }
      ]
    };
  },
  
  getDashboardApplications: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      applications: [
        {
          id: 1,
          candidateId: 101,
          positionId: 1,
          departmentId: 1,
          title: 'Software Engineer',
          description: 'Senior developer with 5+ years experience',
          statusId: 2,
          status: 'IN_REVIEW',
          candidateName: 'John Smith',
          positionTitle: 'Software Engineer',
          department: 'TECHNOLOGY'
        },
        {
          id: 2,
          candidateId: 102,
          positionId: 2,
          departmentId: 2,
          title: 'Marketing Manager',
          description: 'Digital marketing specialist',
          statusId: 1,
          status: 'RECEIVED',
          candidateName: 'Jane Doe',
          positionTitle: 'Marketing Manager',
          department: 'MARKETING'
        },
        {
          id: 3,
          candidateId: 103,
          positionId: 3,
          departmentId: 3,
          title: 'Product Designer',
          description: 'UI/UX designer with portfolio',
          statusId: 3,
          status: 'INTERVIEW_SCHEDULED',
          candidateName: 'Robert Johnson',
          positionTitle: 'Product Designer',
          department: 'DESIGN'
        }
      ]
    };
  },
  
  getDashboardPerformance: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      candidateScreening: Math.floor(Math.random() * 30) + 70,
      interviewScheduling: Math.floor(Math.random() * 25) + 75,
      onboarding: Math.floor(Math.random() * 20) + 80
    };
  }
};

export default apiService;