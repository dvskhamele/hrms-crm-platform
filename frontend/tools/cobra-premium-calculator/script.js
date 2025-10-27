document.addEventListener('DOMContentLoaded', () => {
    const originalPremiumInput = document.getElementById('originalPremium');
    const adminFeePercentageInput = document.getElementById('adminFeePercentage');
    const calculateBtn = document.getElementById('calculateBtn');
    const cobraPremiumSpan = document.getElementById('cobraPremium');
    const cobraInterpretationP = document.getElementById('cobraInterpretation');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    const saveInputs = () => {
        localStorage.setItem('originalPremium', originalPremiumInput.value);
        localStorage.setItem('adminFeePercentage', adminFeePercentageInput.value);
    };

    const loadInputs = () => {
        if (localStorage.getItem('originalPremium')) {
            originalPremiumInput.value = localStorage.getItem('originalPremium');
        }
        if (localStorage.getItem('adminFeePercentage')) {
            adminFeePercentageInput.value = localStorage.getItem('adminFeePercentage');
        }
    };

    const calculateCobraPremium = () => {
        const originalPremium = parseFloat(originalPremiumInput.value);
        const adminFeePercentage = parseFloat(adminFeePercentageInput.value);

        if (isNaN(originalPremium) || originalPremium < 0 ||
            isNaN(adminFeePercentage) || adminFeePercentage < 0) {
            cobraPremiumSpan.textContent = 'Invalid Input';
            cobraInterpretationP.textContent = '';
            console.error('Analytics Event: Invalid input for COBRA premium calculation');
            return;
        }

        const adminFee = originalPremium * (adminFeePercentage / 100);
        const cobraPremium = originalPremium + adminFee;

        cobraPremiumSpan.textContent = cobraPremium.toFixed(2);

        let interpretation = '';
        if (cobraPremium > 0) {
            interpretation = `This is an estimate. Actual COBRA premiums may vary.`;
        } else {
            interpretation = 'Please enter valid premium and fee values.';
        }
        cobraInterpretationP.textContent = interpretation;

        saveInputs();
        console.log(`Analytics Event: COBRA premium calculated - $${cobraPremium.toFixed(2)}`);
    };

    calculateBtn.addEventListener('click', calculateCobraPremium);

    // Add event listeners for input changes to trigger recalculation and save
    originalPremiumInput.addEventListener('input', () => { saveInputs(); calculateCobraPremium(); });
    adminFeePercentageInput.addEventListener('input', () => { saveInputs(); calculateCobraPremium(); });

    loadInputs();
    calculateCobraPremium(); // Initial calculation on page load

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
            const response = await fetch('/data/tools/cobra-premium-calculator-leads.json', {
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