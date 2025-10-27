document.addEventListener('DOMContentLoaded', () => {
    const startDateInput = document.getElementById('startDate');
    const accrualRateInput = document.getElementById('accrualRate');
    const maxAccrualInput = document.getElementById('maxAccrual');
    const leaveTakenInput = document.getElementById('leaveTaken');
    const calculateBtn = document.getElementById('calculateBtn');
    const totalAccruedSpan = document.getElementById('totalAccrued');
    const currentBalanceSpan = document.getElementById('currentBalance');
    const projectedBalanceSpan = document.getElementById('projectedBalance');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    // Set default start date to today
    const today = new Date();
    startDateInput.value = today.toISOString().split('T')[0];

    const saveInputs = () => {
        localStorage.setItem('startDate', startDateInput.value);
        localStorage.setItem('accrualRate', accrualRateInput.value);
        localStorage.setItem('maxAccrual', maxAccrualInput.value);
        localStorage.setItem('leaveTaken', leaveTakenInput.value);
    };

    const loadInputs = () => {
        if (localStorage.getItem('startDate')) {
            startDateInput.value = localStorage.getItem('startDate');
        }
        if (localStorage.getItem('accrualRate')) {
            accrualRateInput.value = localStorage.getItem('accrualRate');
        }
        if (localStorage.getItem('maxAccrual')) {
            maxAccrualInput.value = localStorage.getItem('maxAccrual');
        }
        if (localStorage.getItem('leaveTaken')) {
            leaveTakenInput.value = localStorage.getItem('leaveTaken');
        }
    };

    const calculateLeaveBalance = () => {
        const startDate = new Date(startDateInput.value);
        const accrualRate = parseFloat(accrualRateInput.value);
        const maxAccrual = parseFloat(maxAccrualInput.value);
        const leaveTaken = parseFloat(leaveTakenInput.value);

        if (isNaN(startDate.getTime()) || isNaN(accrualRate) || accrualRate < 0 ||
            isNaN(maxAccrual) || maxAccrual < 0 ||
            isNaN(leaveTaken) || leaveTaken < 0) {
            totalAccruedSpan.textContent = 'Invalid Input';
            currentBalanceSpan.textContent = 'Invalid Input';
            projectedBalanceSpan.textContent = 'Invalid Input';
            console.error('Analytics Event: Invalid input for leave balance calculation');
            return;
        }

        const now = new Date();
        const monthsWorked = (now.getFullYear() - startDate.getFullYear()) * 12 +
                             (now.getMonth() - startDate.getMonth());

        let totalAccrued = monthsWorked * accrualRate;
        if (maxAccrual > 0 && totalAccrued > maxAccrual) {
            totalAccrued = maxAccrual;
        }

        const currentBalance = totalAccrued - leaveTaken;

        let projectedAccrualSixMonths = (monthsWorked + 6) * accrualRate;
        if (maxAccrual > 0 && projectedAccrualSixMonths > maxAccrual) {
            projectedAccrualSixMonths = maxAccrual;
        }
        const projectedBalance = projectedAccrualSixMonths - leaveTaken;

        totalAccruedSpan.textContent = totalAccrued.toFixed(2);
        currentBalanceSpan.textContent = currentBalance.toFixed(2);
        projectedBalanceSpan.textContent = projectedBalance.toFixed(2);

        saveInputs();
        console.log(`Analytics Event: Leave balance calculated - Current: ${currentBalance.toFixed(2)} hours`);
    };

    calculateBtn.addEventListener('click', calculateLeaveBalance);

    // Add event listeners for input changes to trigger recalculation and save
    startDateInput.addEventListener('change', () => { saveInputs(); calculateLeaveBalance(); });
    accrualRateInput.addEventListener('input', () => { saveInputs(); calculateLeaveBalance(); });
    maxAccrualInput.addEventListener('input', () => { saveInputs(); calculateLeaveBalance(); });
    leaveTakenInput.addEventListener('input', () => { saveInputs(); calculateLeaveBalance(); });

    loadInputs();
    calculateLeaveBalance(); // Initial calculation on page load

    subscribeBtn.addEventListener('click', async () => {
        const email = leadEmailInput.value;
        if (!email || !email.includes('@')) {
            leadMessage.textContent = 'Please enter a valid email address.';
            leadMessage.style.color = 'red';
            console.warn('Analytics Event: Invalid email for lead capture');
            return;
        }

        // Simulate saving lead to a JSON file
        console.log(`Analytics Event: Lead captured - ${email}`);
        leadMessage.textContent = 'Thank you for subscribing!';
        leadMessage.style.color = 'green';
        leadEmailInput.value = ''; // Clear the input

        try {
            const response = await fetch('/data/tools/leave-entitlement-calculator-leads.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, timestamp: new Date().toISOString() }),
            });
            console.log('Simulated lead save attempt initiated.');
        } catch (error) {
            console.error('Simulated lead save failed (expected without backend):', error);
        }
    });
});