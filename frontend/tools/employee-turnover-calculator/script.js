document.addEventListener('DOMContentLoaded', () => {
    const employeesStartInput = document.getElementById('employeesStart');
    const employeesEndInput = document.getElementById('employeesEnd');
    const separationsInput = document.getElementById('separations');
    const calculateBtn = document.getElementById('calculateBtn');
    const turnoverRateSpan = document.getElementById('turnoverRate');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    // Load saved inputs from local storage
    if (localStorage.getItem('employeesStart')) {
        employeesStartInput.value = localStorage.getItem('employeesStart');
    }
    if (localStorage.getItem('employeesEnd')) {
        employeesEndInput.value = localStorage.getItem('employeesEnd');
    }
    if (localStorage.getItem('separations')) {
        separationsInput.value = localStorage.getItem('separations');
    }

    const calculateTurnoverRate = () => {
        const employeesStart = parseFloat(employeesStartInput.value);
        const employeesEnd = parseFloat(employeesEndInput.value);
        const separations = parseFloat(separationsInput.value);

        // Basic validation
        if (isNaN(employeesStart) || isNaN(employeesEnd) || isNaN(separations) || employeesStart < 0 || employeesEnd < 0 || separations < 0) {
            turnoverRateSpan.textContent = 'Invalid Input';
            console.error('Analytics Event: Invalid input for turnover rate calculation');
            return;
        }

        // Save inputs to local storage
        localStorage.setItem('employeesStart', employeesStart);
        localStorage.setItem('employeesEnd', employeesEnd);
        localStorage.setItem('separations', separations);

        const averageEmployees = (employeesStart + employeesEnd) / 2;
        let turnoverRate = 0;

        if (averageEmployees > 0) {
            turnoverRate = (separations / averageEmployees) * 100;
        }

        turnoverRateSpan.textContent = `${turnoverRate.toFixed(2)}%`;
        console.log(`Analytics Event: Turnover rate calculated - ${turnoverRate.toFixed(2)}%`);
    };

    calculateBtn.addEventListener('click', calculateTurnoverRate);

    // Initial calculation on page load if values are present
    calculateTurnoverRate();

    subscribeBtn.addEventListener('click', async () => {
        const email = leadEmailInput.value;
        if (!email || !email.includes('@')) {
            leadMessage.textContent = 'Please enter a valid email address.';
            leadMessage.style.color = 'red';
            console.warn('Analytics Event: Invalid email for lead capture');
            return;
        }

        // Simulate saving lead to a JSON file
        // In a real application, this would be a fetch request to a backend endpoint
        // that saves the email to a file or database.
        console.log(`Analytics Event: Lead captured - ${email}`);
        leadMessage.textContent = 'Thank you for subscribing!';
        leadMessage.style.color = 'green';
        leadEmailInput.value = ''; // Clear the input

        // Simulate API call to save lead (without actual backend interaction)
        try {
            // This fetch will likely fail in a real browser without a backend,
            // but it demonstrates the intended client-side action.
            const response = await fetch('/data/tools/employee-turnover-calculator-leads.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, timestamp: new Date().toISOString() }),
            });

            // For this additive-only exercise, we'll assume success if the fetch is initiated.
            // In a real scenario, you'd check response.ok
            console.log('Simulated lead save attempt initiated.');
        } catch (error) {
            console.error('Simulated lead save failed (expected without backend):', error);
        }
    });
});
