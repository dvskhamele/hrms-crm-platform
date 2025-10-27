
document.addEventListener('DOMContentLoaded', () => {
    const calculateEntitlementBtn = document.getElementById('calculate-entitlement');
    const startDateInput = document.getElementById('start-date');
    const leavePolicyInput = document.getElementById('leave-policy');
    const calculationDateInput = document.getElementById('calculation-date');
    const entitlementOutputDiv = document.getElementById('entitlement-output');
    const emailCaptureDiv = document.getElementById('email-capture');
    const submitEmailBtn = document.getElementById('submit-email');
    const emailMessage = document.getElementById('email-message');

    const calculateEntitlement = () => {
        const startDate = new Date(startDateInput.value);
        const leavePolicy = parseFloat(leavePolicyInput.value);
        const calculationDate = new Date(calculationDateInput.value);

        if (isNaN(startDate.getTime()) || isNaN(leavePolicy) || isNaN(calculationDate.getTime()) || leavePolicy <= 0) {
            alert('Please enter valid dates and a positive annual leave policy.');
            return;
        }

        const diffTime = Math.abs(calculationDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const yearsOfService = diffDays / 365.25; // Account for leap years

        let entitledLeave = 0;

        // Simple linear accrual for demonstration
        if (yearsOfService > 0) {
            entitledLeave = leavePolicy * yearsOfService;
        }

        entitlementOutputDiv.innerHTML = `
            <h2>Leave Entitlement Calculation</h2>
            <p><strong>Employee Start Date:</strong> ${startDate.toDateString()}</p>
            <p><strong>Calculation Date:</strong> ${calculationDate.toDateString()}</p>
            <p><strong>Years of Service:</strong> ${yearsOfService.toFixed(2)}</p>
            <p><strong>Annual Leave Policy:</strong> ${leavePolicy} days</p>
            <p><strong>Estimated Entitled Leave:</strong> ${entitledLeave.toFixed(2)} days</p>
        `;
        entitlementOutputDiv.style.display = 'block';
        emailCaptureDiv.style.display = 'block';

        logAnalytics('leave_entitlement_calculated');
    };

    const handleEmailSubmit = () => {
        const email = document.getElementById('email').value;
        if (email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            const leadData = {
                email: email,
                tool: 'Leave Entitlement Calculator',
                timestamp: new Date().toISOString()
            };
            saveLead(leadData);
            emailMessage.textContent = 'Thank you! Your entitlement report has been sent to your email.';
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

    calculateEntitlementBtn.addEventListener('click', calculateEntitlement);
    submitEmailBtn.addEventListener('click', handleEmailSubmit);
});
