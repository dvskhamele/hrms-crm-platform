// Analytics Logging
function logAnalyticsEvent(eventName, data = {}) {
    console.log(`Analytics Event: ${eventName}`, data);
    // In a real scenario, this would send data to an analytics service
}

logAnalyticsEvent('ToolOpened', { tool: 'RecruitmentCostPerHireCalculator' });

function calculateCostPerHire(totalExternalCosts, totalInternalCosts, numHires) {
    const externalCosts = parseFloat(totalExternalCosts);
    const internalCosts = parseFloat(totalInternalCosts);
    const hires = parseInt(numHires);

    if (hires <= 0) {
        return { cph: 0, totalCosts: externalCosts + internalCosts };
    }

    const totalCosts = externalCosts + internalCosts;
    const cph = totalCosts / hires;

    return {
        cph: cph.toFixed(2),
        totalCosts: totalCosts.toFixed(2),
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cphCalculatorForm');
    const leadCaptureForm = document.getElementById('leadCaptureForm');
    const leadEmailInput = document.getElementById('leadEmail');
    const leadCaptureMessage = document.getElementById('leadCaptureMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        logAnalyticsEvent('ToolSubmitted', { tool: 'RecruitmentCostPerHireCalculator' });

        const totalExternalCosts = document.getElementById('totalExternalCosts').value;
        const totalInternalCosts = document.getElementById('totalInternalCosts').value;
        const numHires = document.getElementById('numHires').value;

        if (!totalExternalCosts || !totalInternalCosts || !numHires) {
            alert('Please fill in all required fields.');
            return;
        }

        if (parseFloat(totalExternalCosts) < 0 || parseFloat(totalInternalCosts) < 0 || parseInt(numHires) <= 0) {
            alert('Please enter valid positive numbers for costs and number of hires.');
            return;
        }

        const results = calculateCostPerHire(totalExternalCosts, totalInternalCosts, numHires);

        const resultData = {
            inputs: {
                totalExternalCosts,
                totalInternalCosts,
                numHires,
            },
            results: results,
        };

        const encodedData = btoa(JSON.stringify(resultData));
        window.location.href = `/tools/results/recruitment-cost-per-hire-calculator-results.html?data=${encodedData}`;
    });

    leadCaptureForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = leadEmailInput.value.trim();
        if (email) {
            logAnalyticsEvent('LeadCaptured', { tool: 'RecruitmentCostPerHireCalculator', email: email });
            leadCaptureMessage.textContent = 'Thank you! Your advanced recruitment analytics will be sent to ' + email;
            leadCaptureMessage.classList.remove('hidden');
            leadEmailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
});