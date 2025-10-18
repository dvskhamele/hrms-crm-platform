/**
 * API Test script for HR Operations Endpoints
 * Validates that the API endpoints work as expected
 */

const axios = require('axios');

const API_BASE = 'http://localhost:3002';

// Test HR operations API endpoints
async function testHROperationsAPI() {
  console.log('Testing HR Operations API endpoints...\n');
  
  try {
    // Test 1: Get dashboard stats
    console.log('1. Testing dashboard stats endpoint...');
    const statsResponse = await axios.get(`${API_BASE}/api/hr/operations/dashboard-stats`);
    console.log('✓ Dashboard stats retrieved:', statsResponse.data);
    
    // Test 2: Process a new candidate application
    console.log('\n2. Testing new application endpoint...');
    const applicationResponse = await axios.post(`${API_BASE}/api/hr/operations/application`, {
      candidateInfo: {
        name: 'API Test Candidate',
        email: 'api.test@example.com',
        phone: '+1234567899',
        positionApplied: 'Senior Developer',
        positionId: 2,
        department: 'Technology',
        priority: 'HIGH',
        description: 'Testing API candidate application',
        skills: ['JavaScript', 'React', 'Node.js'],
        experience: '5 years'
      }
    });
    console.log('✓ New application created:', applicationResponse.data.application.title);
    
    // Test 3: Update application status
    console.log('\n3. Testing application status update endpoint...');
    const appId = applicationResponse.data.application.id;
    const updateAppResponse = await axios.put(`${API_BASE}/api/hr/operations/application/${appId}/status`, {
      status: 'IN_PROGRESS'
    });
    console.log('✓ Application status updated to:', updateAppResponse.data.status);
    
    // Test 4: Update candidate status
    console.log('\n4. Testing candidate status update endpoint...');
    const candidateId = applicationResponse.data.candidate.id;
    const updateCandidateResponse = await axios.put(`${API_BASE}/api/hr/operations/candidate/${candidateId}/status`, {
      status: 'Interview Scheduled'
    });
    console.log('✓ Candidate status updated to:', updateCandidateResponse.data.status);
    
    // Test 5: Update position status
    console.log('\n5. Testing position status update endpoint...');
    const updatePositionResponse = await axios.put(`${API_BASE}/api/hr/operations/position/2/status`, {
      status: 'ON_HOLD'
    });
    console.log('✓ Position status updated to:', updatePositionResponse.data.status);
    
    // Test 6: Get updated dashboard stats
    console.log('\n6. Testing updated dashboard stats...');
    const updatedStatsResponse = await axios.get(`${API_BASE}/api/hr/operations/dashboard-stats`);
    console.log('✓ Updated dashboard stats:', updatedStatsResponse.data);
    
    console.log('\n✓ All HR Operations API tests passed successfully!');
    
  } catch (error) {
    console.error('✗ Error during API testing:', error.response?.data || error.message);
  }
}

testHROperationsAPI();