const calculateBtn = document.getElementById('calculate-btn');
const totalBudgetSpan = document.getElementById('total-budget');

calculateBtn.addEventListener('click', () => {
    const advertisingCost = parseFloat(document.getElementById('advertising-cost').value) || 0;
    const agencyFees = parseFloat(document.getElementById('agency-fees').value) || 0;
    const assessmentTools = parseFloat(document.getElementById('assessment-tools').value) || 0;
    const backgroundChecks = parseFloat(document.getElementById('background-checks').value) || 0;
    const onboardingCosts = parseFloat(document.getElementById('onboarding-costs').value) || 0;
    const miscellaneousCosts = parseFloat(document.getElementById('miscellaneous-costs').value) || 0;

    const totalBudget = advertisingCost + agencyFees + assessmentTools + backgroundChecks + onboardingCosts + miscellaneousCosts;

    totalBudgetSpan.textContent = `$${totalBudget.toFixed(2)}`;
});
