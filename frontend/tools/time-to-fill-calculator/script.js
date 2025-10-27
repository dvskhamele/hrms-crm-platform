document.addEventListener('DOMContentLoaded', () => {
    const requisitionApprovedDateInput = document.getElementById('requisitionApprovedDate');
    const offerAcceptedDateInput = document.getElementById('offerAcceptedDate');
    const calculateBtn = document.getElementById('calculateBtn');
    const timeToFillSpan = document.getElementById('timeToFill');
    const timeToFillInterpretationP = document.getElementById('timeToFillInterpretation');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    // Set default dates to today for convenience
    const today = new Date().toISOString().split('T')[0];
    requisitionApprovedDateInput.value = today;
    offerAcceptedDateInput.value = today;

    const saveInputs = () => {
        localStorage.setItem('requisitionApprovedDate', requisitionApprovedDateInput.value);
        localStorage.setItem('offerAcceptedDate', offerAcceptedDateInput.value);
    };

    const loadInputs = () => {
        if (localStorage.getItem('requisitionApprovedDate')) {
            requisitionApprovedDateInput.value = localStorage.getItem('requisitionApprovedDate');
        }
        if (localStorage.getItem('offerAcceptedDate')) {
            offerAcceptedDateInput.value = localStorage.getItem('offerAcceptedDate');
        }
    };

    const calculateTimeToFill = () => {
        const requisitionApprovedDate = new Date(requisitionApprovedDateInput.value);
        const offerAcceptedDate = new Date(offerAcceptedDateInput.value);

        const isValidDate = (date) => !isNaN(date.getTime());

        if (!isValidDate(requisitionApprovedDate) || !isValidDate(offerAcceptedDate)) {
            timeToFillSpan.textContent = 'Invalid Date Input';
            timeToFillInterpretationP.textContent = '';
            console.error('Analytics Event: Invalid date input for time to fill calculation');
            return;
        }

        const diffDays = (date1, date2) => {
            const diffTime = Math.abs(date2 - date1);
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        };

        const timeToFill = diffDays(requisitionApprovedDate, offerAcceptedDate);

        timeToFillSpan.textContent = timeToFill;

        let interpretation = '';
        if (timeToFill > 0) {
            interpretation = `It took approximately ${timeToFill} days to fill this position from requisition approval to offer acceptance.`;
        } else {
            interpretation = 'Please ensure dates are valid and offer acceptance is after requisition approval.';
        }
        timeToFillInterpretationP.textContent = interpretation;

        saveInputs();
        console.log(`Analytics Event: Time to fill calculated - ${timeToFill} days`);
    };

    calculateBtn.addEventListener('click', calculateTimeToFill);

    // Add event listeners for input changes to trigger recalculation and save
    requisitionApprovedDateInput.addEventListener('change', () => { saveInputs(); calculateTimeToFill(); });
    offerAcceptedDateInput.addEventListener('change', () => { saveInputs(); calculateTimeToFill(); });

    loadInputs();
    calculateTimeToFill(); // Initial calculation on page load

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
            const response = await fetch('/data/tools/time-to-fill-calculator-leads.json', {
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