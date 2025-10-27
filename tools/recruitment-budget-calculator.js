
document.addEventListener('DOMContentLoaded', () => {
    const calculateBudgetBtn = document.getElementById('calculate-budget');
    const hiresNeededInput = document.getElementById('hires-needed');
    const avgCostPerHireInput = document.getElementById('avg-cost-per-hire');
    const marketingBudgetInput = document.getElementById('marketing-budget');
    const toolSoftwareCostInput = document.getElementById('tool-software-cost');
    const budgetOutputDiv = document.getElementById('budget-output');
    const emailCaptureDiv = document.getElementById('email-capture');
    const submitEmailBtn = document.getElementById('submit-email');
    const emailMessage = document.getElementById('email-message');

    const calculateBudget = () => {
        const hiresNeeded = parseInt(hiresNeededInput.value);
        const avgCostPerHire = parseFloat(avgCostPerHireInput.value);
        const marketingBudget = parseFloat(marketingBudgetInput.value);
        const toolSoftwareCost = parseFloat(toolSoftwareCostInput.value);

        if (isNaN(hiresNeeded) || isNaN(avgCostPerHire) || isNaN(marketingBudget) || isNaN(toolSoftwareCost) || hiresNeeded < 0 || avgCostPerHire < 0 || marketingBudget < 0 || toolSoftwareCost < 0) {
            alert('Please enter valid non-negative numbers for all fields.');
            return;
        }

        const totalHiringCost = hiresNeeded * avgCostPerHire;
        const totalBudget = totalHiringCost + marketingBudget + toolSoftwareCost;

        budgetOutputDiv.innerHTML = `
            <h2>Recruitment Budget Summary</h2>
            <p><strong>Estimated Total Hiring Cost:</strong> $${totalHiringCost.toLocaleString()}</p>
            <p><strong>Marketing & Advertising Budget:</strong> $${marketingBudget.toLocaleString()}</p>
            <p><strong>Tools & Software Cost:</strong> $${toolSoftwareCost.toLocaleString()}</p>
            <p><strong>Total Estimated Recruitment Budget:</strong> $${totalBudget.toLocaleString()}</p>
        `;
        budgetOutputDiv.style.display = 'block';
        emailCaptureDiv.style.display = 'block';

        logAnalytics('recruitment_budget_calculated');
    };

    const handleEmailSubmit = () => {
        const email = document.getElementById('email').value;
        if (email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            const leadData = {
                email: email,
                tool: 'Recruitment Budget Calculator',
                timestamp: new Date().toISOString()
            };
            saveLead(leadData);
            emailMessage.textContent = 'Thank you! Your budget report has been sent to your email.';
            emailMessage.style.color = 'green';
        } else {
            emailMessage.textContent = 'Please enter a valid email address.';
            emailMessage.style.color = 'red';
        }
    };

    const saveLead = (leadData) => {
        console.log('Lead Captured:', JSON.stringify(leadData));
    };

    const logAnalytics = (eventName) => {
        console.log(`Analytics Event: ${eventName}`);
    };

    calculateBudgetBtn.addEventListener('click', calculateBudget);
    submitEmailBtn.addEventListener('click', handleEmailSubmit);
});
