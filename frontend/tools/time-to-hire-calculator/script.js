document.addEventListener('DOMContentLoaded', () => {
    const jobRequisitionOpenInput = document.getElementById('jobRequisitionOpen');
    const applicationReceivedInput = document.getElementById('applicationReceived');
    const interviewsStartInput = document.getElementById('interviewsStart');
    const offerExtendedInput = document.getElementById('offerExtended');
    const offerAcceptedInput = document.getElementById('offerAccepted');
    const startDateInput = document.getElementById('startDate');
    const calculateBtn = document.getElementById('calculateBtn');
    const timeToStartSpan = document.getElementById('timeToStart');
    const timeToHireSpan = document.getElementById('timeToHire');
    const timeToHireInterpretationP = document.getElementById('timeToHireInterpretation');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    // Set default dates to today for convenience
    const today = new Date().toISOString().split('T')[0];
    jobRequisitionOpenInput.value = today;
    applicationReceivedInput.value = today;
    interviewsStartInput.value = today;
    offerExtendedInput.value = today;
    offerAcceptedInput.value = today;
    startDateInput.value = today;

    const saveInputs = () => {
        localStorage.setItem('jobRequisitionOpen', jobRequisitionOpenInput.value);
        localStorage.setItem('applicationReceived', applicationReceivedInput.value);
        localStorage.setItem('interviewsStart', interviewsStartInput.value);
        localStorage.setItem('offerExtended', offerExtendedInput.value);
        localStorage.setItem('offerAccepted', offerAcceptedInput.value);
        localStorage.setItem('startDate', startDateInput.value);
    };

    const loadInputs = () => {
        if (localStorage.getItem('jobRequisitionOpen')) {
            jobRequisitionOpenInput.value = localStorage.getItem('jobRequisitionOpen');
        }
        if (localStorage.getItem('applicationReceived')) {
            applicationReceivedInput.value = localStorage.getItem('applicationReceived');
        }
        if (localStorage.getItem('interviewsStart')) {
            interviewsStartInput.value = localStorage.getItem('interviewsStart');
        }
        if (localStorage.getItem('offerExtended')) {
            offerExtendedInput.value = localStorage.getItem('offerExtended');
        }
        if (localStorage.getItem('offerAccepted')) {
            offerAcceptedInput.value = localStorage.getItem('offerAccepted');
        }
        if (localStorage.getItem('startDate')) {
            startDateInput.value = localStorage.getItem('startDate');
        }
    };

    const calculateTimeToHire = () => {
        const jobRequisitionOpen = new Date(jobRequisitionOpenInput.value);
        const applicationReceived = new Date(applicationReceivedInput.value);
        const offerAccepted = new Date(offerAcceptedInput.value);
        const startDate = new Date(startDateInput.value);

        const isValidDate = (date) => !isNaN(date.getTime());

        if (!isValidDate(jobRequisitionOpen) || !isValidDate(applicationReceived) ||
            !isValidDate(offerAccepted) || !isValidDate(startDate)) {
            timeToStartSpan.textContent = 'Invalid Date Input';
            timeToHireSpan.textContent = 'Invalid Date Input';
            timeToHireInterpretationP.textContent = '';
            console.error('Analytics Event: Invalid date input for time to hire calculation');
            return;
        }

        const diffDays = (date1, date2) => {
            const diffTime = Math.abs(date2 - date1);
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        };

        const timeToStart = diffDays(jobRequisitionOpen, startDate);
        const timeToHire = diffDays(applicationReceived, offerAccepted);

        timeToStartSpan.textContent = timeToStart;
        timeToHireSpan.textContent = timeToHire;

        let interpretation = '';
        if (timeToHire > 0) {
            interpretation = `It took approximately ${timeToHire} days from the first application to the offer acceptance.`;
        } else {
            interpretation = 'Please ensure all dates are valid and in chronological order.';
        }
        timeToHireInterpretationP.textContent = interpretation;

        saveInputs();
        console.log(`Analytics Event: Time to hire calculated - ${timeToHire} days`);
    };

    calculateBtn.addEventListener('click', calculateTimeToHire);

    // Add event listeners for input changes to trigger recalculation and save
    jobRequisitionOpenInput.addEventListener('change', () => { saveInputs(); calculateTimeToHire(); });
    applicationReceivedInput.addEventListener('change', () => { saveInputs(); calculateTimeToHire(); });
    interviewsStartInput.addEventListener('change', () => { saveInputs(); calculateTimeToHire(); });
    offerExtendedInput.addEventListener('change', () => { saveInputs(); calculateTimeToHire(); });
    offerAcceptedInput.addEventListener('change', () => { saveInputs(); calculateTimeToHire(); });
    startDateInput.addEventListener('change', () => { saveInputs(); calculateTimeToHire(); });

    loadInputs();
    calculateTimeToHire(); // Initial calculation on page load

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
            const response = await fetch('/data/tools/time-to-hire-calculator-leads.json', {
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