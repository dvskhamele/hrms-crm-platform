/**
 * Test script for HR Operations Service
 * Verifies that the dynamic data update functionality works correctly
 */

const HROperationsService = require('./hr-operations-service');

console.log('Testing HR Operations Service...');

// Initialize the HR Operations Service
const hrService = new HROperationsService();

// Test 1: Process a new candidate application
console.log('\n--- Test 1: Processing new candidate application ---');
const candidateInfo = {
  name: 'Test Candidate',
  email: 'test.candidate@example.com',
  phone: '+1234567895',
  positionApplied: 'Software Developer',
  positionId: 1,
  department: 'Technology',
  priority: 'HIGH',
  description: 'Experienced software developer with React and Node.js skills',
  skills: ['JavaScript', 'React', 'Node.js', 'Python'],
  experience: '3 years',
  resume: 'https://example.com/test-resume.pdf',
  additionalInfo: {
    linkedin: 'https://linkedin.com/in/test-candidate'
  }
};

try {
  const applicationResult = hrService.processCandidateApplication(candidateInfo);
  console.log('✓ Application created successfully:', applicationResult.application.title);
  console.log('✓ Candidate created successfully:', applicationResult.candidate.name);
} catch (error) {
  console.error('✗ Error processing application:', error.message);
}

// Test 2: Update application status
console.log('\n--- Test 2: Updating application status ---');
try {
  const updatedApplication = hrService.updateApplicationStatus(1, 'IN_PROGRESS');
  console.log('✓ Application status updated to:', updatedApplication.status);
} catch (error) {
  console.error('✗ Error updating application status:', error.message);
}

// Test 3: Update candidate status directly
console.log('\n--- Test 3: Updating candidate status directly ---');
try {
  const updatedCandidate = hrService.updateCandidateStatus(1, 'Interview Scheduled');
  console.log('✓ Candidate status updated to:', updatedCandidate.status);
} catch (error) {
  console.error('✗ Error updating candidate status:', error.message);
}

// Test 4: Update position status
console.log('\n--- Test 4: Updating position status ---');
try {
  const updatedPosition = hrService.updatePositionStatus(1, 'IN_REVIEW');
  console.log('✓ Position status updated to:', updatedPosition.status);
} catch (error) {
  console.error('✗ Error updating position status:', error.message);
}

// Test 5: Update recruiter status
console.log('\n--- Test 5: Updating recruiter status ---');
try {
  const updatedRecruiter = hrService.updateRecruiterStatus(1, 'Break');
  console.log('✓ Recruiter status updated to:', updatedRecruiter.status);
} catch (error) {
  console.error('✗ Error updating recruiter status:', error.message);
}

// Test 6: Get dashboard stats
console.log('\n--- Test 6: Getting dashboard statistics ---');
try {
  const stats = hrService.getDashboardStats();
  console.log('✓ Dashboard stats retrieved:', stats);
} catch (error) {
  console.error('✗ Error getting dashboard stats:', error.message);
}

// Test 7: Process new hire (this will also update application status and position)
console.log('\n--- Test 7: Processing new hire ---');
try {
  // First create an application to hire from
  const hireCandidateInfo = {
    name: 'Hire Candidate',
    email: 'hire.candidate@example.com',
    positionApplied: 'Product Manager',
    positionId: 5,
    department: 'Technology',
    priority: 'HIGH'
  };
  
  const hireApplication = hrService.processCandidateApplication(hireCandidateInfo);
  console.log('✓ Created test application for hiring:', hireApplication.application.id);
  
  // Now process the new hire
  const onboardingResult = hrService.processNewHire(hireApplication.application.id);
  console.log('✓ New hire processed, onboarding created:', onboardingResult.id);
} catch (error) {
  console.error('✗ Error processing new hire:', error.message);
}

// Test 8: Update onboarding task
console.log('\n--- Test 8: Updating onboarding task ---');
try {
  // Get the first onboarding record
  if (hrService.data.onboarding.length > 0) {
    const onboardingId = hrService.data.onboarding[0].id;
    const updatedOnboarding = hrService.updateOnboardingTask(onboardingId, 1, true);
    console.log('✓ Onboarding task updated, status:', updatedOnboarding.status);
  } else {
    console.log('- No onboarding records to test with');
  }
} catch (error) {
  console.error('✗ Error updating onboarding task:', error.message);
}

// Test 9: Run daily operations
console.log('\n--- Test 9: Running daily operations ---');
try {
  hrService.runDailyOperations();
  console.log('✓ Daily operations completed');
} catch (error) {
  console.error('✗ Error running daily operations:', error.message);
}

console.log('\n--- All tests completed ---');

// Print some final stats
console.log('\nFinal Dashboard Stats:');
const finalStats = hrService.getDashboardStats();
console.log(finalStats);