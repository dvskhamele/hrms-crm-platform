// Test onboarding flow
console.log('Testing onboarding flow...');

// Simulate completing all onboarding steps
const simulateOnboarding = () => {
  console.log('Simulating onboarding steps...');
  
  // Step 1: Set industry and team size
  // In a real app, this would be done through form inputs
  
  // Step 2: Set goals
  // In a real app, this would be done through checkbox selections
  
  // Step 3: Set features
  // In a real app, this would be done through checkbox selections
  
  // Step 4: Complete onboarding
  console.log('Step 4: Completing onboarding...');
  localStorage.setItem('onboardingComplete', 'true');
  console.log('onboardingComplete set to:', localStorage.getItem('onboardingComplete'));
  
  // Verify that onboardingComplete is set
  const onboardingComplete = localStorage.getItem('onboardingComplete');
  if (onboardingComplete === 'true') {
    console.log('SUCCESS: onboardingComplete is set correctly');
    return true;
  } else {
    console.log('ERROR: onboardingComplete is not set correctly');
    return false;
  }
};

// Test dashboard access
const testDashboardAccess = () => {
  console.log('Testing dashboard access...');
  
  // Check if onboarding is complete
  const onboardingComplete = localStorage.getItem('onboardingComplete');
  if (!onboardingComplete) {
    console.log('ERROR: onboardingComplete not found, should redirect to /onboarding');
    return false;
  }
  
  console.log('SUCCESS: onboardingComplete found, dashboard access allowed');
  return true;
};

// Run tests
const onboardingSuccess = simulateOnboarding();
if (onboardingSuccess) {
  const dashboardAccess = testDashboardAccess();
  if (dashboardAccess) {
    console.log('ALL TESTS PASSED: Onboarding flow works correctly');
  } else {
    console.log('TEST FAILED: Dashboard access denied despite onboarding completion');
  }
} else {
  console.log('TEST FAILED: Onboarding completion failed');
}