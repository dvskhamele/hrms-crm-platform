
document.addEventListener('DOMContentLoaded', () => {
    const calculateCphBtn = document.getElementById('calculate-cph');
    const totalInternalCostInput = document.getElementById('total-internal-cost');
    const totalExternalCostInput = document.getElementById('total-external-cost');
    const totalHiresInput = document.getElementById('total-hires');
    const costOutputDiv = document.getElementById('cost-output');
    const emailCaptureDiv = document.getElementById('email-capture');
    const submitEmailBtn = document.getElementById('submit-email');
    const emailMessage = document.getElementById('email-message');

    const calculateCostPerHire = () => {
        const totalInternalCost = parseFloat(totalInternalCostInput.value);
        const totalExternalCost = parseFloat(totalExternalCostInput.value);
        const totalHires = parseInt(totalHiresInput.value);

        if (isNaN(totalInternalCost) || isNaN(totalExternalCost) || isNaN(totalHires) || totalInternalCost < 0 || totalExternalCost < 0 || totalHires <= 0) {
            alert('Please enter valid non-negative numbers for costs and a positive number for hires.');
            return;
        }

        const totalRecruitmentCost = totalInternalCost + totalExternalCost;
        const costPerHire = totalRecruitmentCost / totalHires;

        costOutputDiv.innerHTML = `
            <h2>Recruitment Cost Per Hire Summary</h2>
            <p><strong>Total Internal Recruitment Costs:</strong> $${totalInternalCost.toLocaleString()}</p>
            <p><strong>Total External Recruitment Costs:</strong> $${totalExternalCost.toLocaleString()}</p>
            <p><strong>Total Recruitment Costs:</strong> $${totalRecruitmentCost.toLocaleString()}</p>
            <p><strong>Total Number of Hires:</strong> ${totalHires}</p>
            <p><strong>Cost Per Hire (CPH):</strong> $${costPerHire.toFixed(2).toLocaleString()}</p>
        `;
        costOutputDiv.style.display = 'block';
        emailCaptureDiv.style.display = 'block';

        logAnalytics('recruitment_cph_calculated');
    };

    const handleEmailSubmit = () => {
        const email = document.getElementById('email').value;
        if (email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            const leadData = {
                email: email,
                tool: 'Recruitment Cost Per Hire Calculator',
                timestamp: new Date().toISOString()
            };
            saveLead(leadData);
            emailMessage.textContent = 'Thank you! Your CPH report has been sent to your email.';
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

    calculateCphBtn.addEventListener('click', calculateCostPerHire);
    submitEmailBtn.addEventListener('click', handleEmailSubmit);
});
