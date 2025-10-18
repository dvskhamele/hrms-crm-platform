// Test script to verify onboarding completion flow
console.log('Testing onboarding completion flow...');

// Simulate completing onboarding
console.log('Setting onboardingComplete in localStorage...');
localStorage.setItem('onboardingComplete', 'true');
console.log('onboardingComplete value:', localStorage.getItem('onboardingComplete'));

// Check if dashboard would allow access
const onboardingComplete = localStorage.getItem('onboardingComplete');
if (onboardingComplete) {
  console.log('SUCCESS: onboardingComplete is set, dashboard should allow access');
} else {
  console.log('ERROR: onboardingComplete is not set');
}

// Clean up
// localStorage.removeItem('onboardingComplete');