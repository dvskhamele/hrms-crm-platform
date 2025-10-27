const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend', 'out')));

// Mock data for the recruitment platform
const mockData = {
  dashboard: {
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
    },
    activity: [
      {
        id: 1,
        type: 'application',
        title: 'New application received',
        description: 'John Doe - Software Engineer',
        timestamp: new Date().toISOString(),
        status: 'PENDING'
      },
      {
        id: 2,
        type: 'position',
        title: 'Position status updated',
        description: 'Marketing Manager marked as Open',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'OPEN'
      },
      {
        id: 3,
        type: 'application',
        title: 'Application completed',
        description: 'Jane Smith - Sales Associate',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: 'COMPLETED'
      }
    ]
  },
  candidates: [
    { 
      id: 'pranay-singhal', 
      name: 'Pranay Singhal', 
      title: 'Salesforce Developer', 
      experience: '5 years', 
      skills: ['Salesforce Developer'], 
      monthlyRate: 'On Request', 
      resumeLink: 'Profile on Request', 
      marketRate: '80,000',
      status: 'Available',
      rating: 4.7,
      email: 'pranay.singhal@example.com',
      phone: '+91-9876543210',
      location: 'Bangalore, India',
      availability: 'Immediate',
      linkedin: 'linkedin.com/in/pranaysinghal'
    },
    { 
      id: 'bhavesh-mistry', 
      name: 'Bhavesh Mistry', 
      title: 'Full Stack Designer', 
      experience: '4 years', 
      skills: ['Design', 'Bootstrap', 'Tailwind CSS', 'Material UI', 'Responsive Design', 'Animations', 'Figma', 'Photoshop', 'Adobe XD', 'React.js', 'Ruby on Rails', '.NET', 'Angular'], 
      monthlyRate: 'On Request', 
      resumeLink: 'Profile on Request', 
      marketRate: '75,000',
      status: 'Available',
      rating: 4.5,
      email: 'bhavesh.mistry@example.com',
      phone: '+91-9876543211',
      location: 'Mumbai, India',
      availability: 'Immediate',
      linkedin: 'linkedin.com/in/bhaveshmistry'
    },
    { 
      id: 'sagar-shinde', 
      name: 'Sagar Shinde', 
      title: 'Senior Java Developer', 
      experience: '3 years', 
      skills: ['Core Java', 'Spring', 'Spring Boot', 'REST API', 'Spring Data JPA', 'Hibernate', 'JPA', 'MySQL', 'Kafka', 'Redis', 'AWS', 'Spring Security'], 
      monthlyRate: 'On Request', 
      resumeLink: 'Profile on Request', 
      marketRate: '70,000',
      status: 'Interview Scheduled',
      rating: 4.2,
      email: 'sagar.shinde@example.com',
      phone: '+91-9876543212',
      location: 'Pune, India',
      availability: '2 weeks',
      linkedin: 'linkedin.com/in/sagarshinde'
    },
    { 
      id: 'abhishek-parihar', 
      name: 'Abhishek Parihar', 
      title: 'Full Stack Java/Python Developer', 
      experience: '6 years', 
      skills: ['Java', 'Spring', 'Spring Boot', 'REST API', 'Spring Data JPA', 'Hibernate', 'JPA', 'MySQL', 'Kafka', 'Redis', 'AWS', 'Spring Security', 'Python3', 'Django', 'Rest Framework', 'Git', 'Bit-bucket', 'SQLite', 'Slack', 'JIRA', 'Scrum', 'Kan-ban'], 
      monthlyRate: 'On Request', 
      resumeLink: 'https://docs.google.com/document/d/10Xpu8R1Zy7rfCIKRHIrzpDJKhoOfOTz8n084f5pK5BI/edit', 
      marketRate: '120,000',
      status: 'Available',
      rating: 4.9,
      email: 'abhishek.parihar@example.com',
      phone: '+91-9876543213',
      location: 'Hyderabad, India',
      availability: 'Immediate',
      linkedin: 'linkedin.com/in/abhishekparihar'
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
  departments: [
    { id: 1, name: 'Technology', head: 'Alice Johnson', recruiterCount: 5, performance: 92 },
    { id: 2, name: 'Marketing', head: 'David Wilson', recruiterCount: 3, performance: 88 },
    { id: 3, name: 'Sales', head: 'Frank Miller', recruiterCount: 4, performance: 93 },
    { id: 4, name: 'Human Resources', head: 'Kate Williams', recruiterCount: 3, performance: 94 }
  ]
};

// API Routes - Updated to match frontend expectations
app.get('/api/dashboard/stats', (req, res) => {
  res.json({ stats: mockData.dashboard.stats });
});

app.get('/api/dashboard/activity', (req, res) => {
  res.json({ activity: mockData.dashboard.activity });
});

app.get('/api/candidates', (req, res) => {
  res.json({ candidates: mockData.candidates });
});

app.get('/api/positions', (req, res) => {
  res.json({ positions: mockData.positions });
});

app.get('/api/recruiters', (req, res) => {
  res.json({ recruiters: mockData.recruiters });
});

app.get('/api/applications', (req, res) => {
  res.json({ applications: mockData.applications });
});

app.get('/api/departments', (req, res) => {
  res.json({ departments: mockData.departments });
});

// Serve index.html for all routes (client-side routing)
app.get(/.*/, (req, res) => {
  const indexPath = path.join(__dirname, 'frontend', 'out', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not found');
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`HRMS Recruitment Platform running on http://localhost:${PORT}`);
  console.log(`Frontend files served from: ${path.join(__dirname, 'frontend', 'out')}`);
});