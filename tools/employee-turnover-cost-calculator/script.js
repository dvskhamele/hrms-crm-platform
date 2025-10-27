document.getElementById('calculate-btn').addEventListener('click', () => {
    const employeeSalary = parseFloat(document.getElementById('employee-salary').value) || 0;
    const recruitmentCosts = parseFloat(document.getElementById('recruitment-costs').value) || 0;
    const onboardingTrainingCosts = parseFloat(document.getElementById('onboarding-training-costs').value) || 0;
    const lostProductivityCosts = parseFloat(document.getElementById('lost-productivity-costs').value) || 0;

    const totalTurnoverCost = employeeSalary + recruitmentCosts + onboardingTrainingCosts + lostProductivityCosts;

    document.getElementById('results').innerHTML = `<h2>Total Employee Turnover Cost: $${totalTurnoverCost.toFixed(2)}</h2>`;
});