document.addEventListener('DOMContentLoaded', () => {
    const hourlyRateInput = document.getElementById('hourlyRate');
    const shiftHoursInput = document.getElementById('shiftHours');
    const differentialPercentageInput = document.getElementById('differentialPercentage');
    const calculateBtn = document.getElementById('calculateBtn');
    const regularShiftPaySpan = document.getElementById('regularShiftPay');
    const differentialPaySpan = document.getElementById('differentialPay');
    const totalShiftPaySpan = document.getElementById('totalShiftPay');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    const saveInputs = () => {
        localStorage.setItem('hourlyRate', hourlyRateInput.value);
        localStorage.setItem('shiftHours', shiftHoursInput.value);
        localStorage.setItem('differentialPercentage', differentialPercentageInput.value);
    };

    const loadInputs = () => {
        if (localStorage.getItem('hourlyRate')) {
            hourlyRateInput.value = localStorage.getItem('hourlyRate');
        }
        if (localStorage.getItem('shiftHours')) {
            shiftHoursInput.value = localStorage.getItem('shiftHours');
        }
        if (localStorage.getItem('differentialPercentage')) {
            differentialPercentageInput.value = localStorage.getItem('differentialPercentage');
        }
    };

    const calculateShiftPay = () => {
        const hourlyRate = parseFloat(hourlyRateInput.value);
        const shiftHours = parseFloat(shiftHoursInput.value);
        const differentialPercentage = parseFloat(differentialPercentageInput.value);

        if (isNaN(hourlyRate) || hourlyRate < 0 ||
            isNaN(shiftHours) || shiftHours < 0 ||
            isNaN(differentialPercentage) || differentialPercentage < 0) {
            regularShiftPaySpan.textContent = 'Invalid Input';
            differentialPaySpan.textContent = 'Invalid Input';
            totalShiftPaySpan.textContent = 'Invalid Input';
            console.error('Analytics Event: Invalid input for shift differential pay calculation');
            return;
        }

        const regularShiftPay = hourlyRate * shiftHours;
        const differentialAmount = regularShiftPay * (differentialPercentage / 100);
        const totalShiftPay = regularShiftPay + differentialAmount;

        regularShiftPaySpan.textContent = regularShiftPay.toFixed(2);
        differentialPaySpan.textContent = differentialAmount.toFixed(2);
        totalShiftPaySpan.textContent = totalShiftPay.toFixed(2);

        saveInputs();
        console.log(`Analytics Event: Shift differential pay calculated - Total: $${totalShiftPay.toFixed(2)}`);
    };

    calculateBtn.addEventListener('click', calculateShiftPay);

    // Add event listeners for input changes to trigger recalculation and save
    hourlyRateInput.addEventListener('input', () => { saveInputs(); calculateShiftPay(); });
    shiftHoursInput.addEventListener('input', () => { saveInputs(); calculateShiftPay(); });
    differentialPercentageInput.addEventListener('input', () => { saveInputs(); calculateShiftPay(); });

    loadInputs();
    calculateShiftPay(); // Initial calculation on page load

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
        leadEmailInput.value = ''; // Clear the input

        try {
            const response = await fetch('/data/tools/shift-differential-pay-calculator-leads.json', {
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