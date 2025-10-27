document.addEventListener('DOMContentLoaded', () => {
    const hourlyRateInput = document.getElementById('hourlyRate');
    const regularHoursInput = document.getElementById('regularHours');
    const overtimeHoursInput = document.getElementById('overtimeHours');
    const overtimeMultiplierInput = document.getElementById('overtimeMultiplier');
    const calculateBtn = document.getElementById('calculateBtn');
    const regularPaySpan = document.getElementById('regularPay');
    const overtimePaySpan = document.getElementById('overtimePay');
    const totalPaySpan = document.getElementById('totalPay');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    const saveInputs = () => {
        localStorage.setItem('hourlyRate', hourlyRateInput.value);
        localStorage.setItem('regularHours', regularHoursInput.value);
        localStorage.setItem('overtimeHours', overtimeHoursInput.value);
        localStorage.setItem('overtimeMultiplier', overtimeMultiplierInput.value);
    };

    const loadInputs = () => {
        if (localStorage.getItem('hourlyRate')) {
            hourlyRateInput.value = localStorage.getItem('hourlyRate');
        }
        if (localStorage.getItem('regularHours')) {
            regularHoursInput.value = localStorage.getItem('regularHours');
        }
        if (localStorage.getItem('overtimeHours')) {
            overtimeHoursInput.value = localStorage.getItem('overtimeHours');
        }
        if (localStorage.getItem('overtimeMultiplier')) {
            overtimeMultiplierInput.value = localStorage.getItem('overtimeMultiplier');
        }
    };

    const calculatePay = () => {
        const hourlyRate = parseFloat(hourlyRateInput.value);
        const regularHours = parseFloat(regularHoursInput.value);
        const overtimeHours = parseFloat(overtimeHoursInput.value);
        const overtimeMultiplier = parseFloat(overtimeMultiplierInput.value);

        if (isNaN(hourlyRate) || hourlyRate < 0 ||
            isNaN(regularHours) || regularHours < 0 ||
            isNaN(overtimeHours) || overtimeHours < 0 ||
            isNaN(overtimeMultiplier) || overtimeMultiplier < 1) {
            regularPaySpan.textContent = 'Invalid Input';
            overtimePaySpan.textContent = 'Invalid Input';
            totalPaySpan.textContent = 'Invalid Input';
            console.error('Analytics Event: Invalid input for overtime pay calculation');
            return;
        }

        const regularPay = hourlyRate * regularHours;
        const overtimePay = hourlyRate * overtimeHours * overtimeMultiplier;
        const totalPay = regularPay + overtimePay;

        regularPaySpan.textContent = regularPay.toFixed(2);
        overtimePaySpan.textContent = overtimePay.toFixed(2);
        totalPaySpan.textContent = totalPay.toFixed(2);

        saveInputs();
        console.log(`Analytics Event: Overtime pay calculated - Total: $${totalPay.toFixed(2)}`);
    };

    calculateBtn.addEventListener('click', calculatePay);

    // Add event listeners for input changes to trigger recalculation and save
    hourlyRateInput.addEventListener('input', () => { saveInputs(); calculatePay(); });
    regularHoursInput.addEventListener('input', () => { saveInputs(); calculatePay(); });
    overtimeHoursInput.addEventListener('input', () => { saveInputs(); calculatePay(); });
    overtimeMultiplierInput.addEventListener('input', () => { saveInputs(); calculatePay(); });

    loadInputs();
    calculatePay(); // Initial calculation on page load

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
            const response = await fetch('/data/tools/overtime-pay-calculator-leads.json', {
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