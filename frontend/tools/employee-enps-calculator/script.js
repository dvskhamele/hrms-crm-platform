document.addEventListener('DOMContentLoaded', () => {
    const promotersInput = document.getElementById('promoters');
    const passivesInput = document.getElementById('passives');
    const detractorsInput = document.getElementById('detractors');
    const calculateBtn = document.getElementById('calculateBtn');
    const totalRespondentsSpan = document.getElementById('totalRespondents');
    const enpsScoreSpan = document.getElementById('enpsScore');
    const enpsInterpretationP = document.getElementById('enpsInterpretation');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    const saveInputs = () => {
        localStorage.setItem('promoters', promotersInput.value);
        localStorage.setItem('passives', passivesInput.value);
        localStorage.setItem('detractors', detractorsInput.value);
    };

    const loadInputs = () => {
        if (localStorage.getItem('promoters')) {
            promotersInput.value = localStorage.getItem('promoters');
        }
        if (localStorage.getItem('passives')) {
            passivesInput.value = localStorage.getItem('passives');
        }
        if (localStorage.getItem('detractors')) {
            detractorsInput.value = localStorage.getItem('detractors');
        }
    };

    const calculateEnps = () => {
        const promoters = parseFloat(promotersInput.value);
        const passives = parseFloat(passivesInput.value);
        const detractors = parseFloat(detractorsInput.value);

        if (isNaN(promoters) || promoters < 0 ||
            isNaN(passives) || passives < 0 ||
            isNaN(detractors) || detractors < 0) {
            totalRespondentsSpan.textContent = 'Invalid Input';
            enpsScoreSpan.textContent = 'Invalid Input';
            enpsInterpretationP.textContent = '';
            console.error('Analytics Event: Invalid input for eNPS calculation');
            return;
        }

        const totalRespondents = promoters + passives + detractors;
        totalRespondentsSpan.textContent = totalRespondents;

        let enps = 0;
        if (totalRespondents > 0) {
            enps = ((promoters - detractors) / totalRespondents) * 100;
        }

        enpsScoreSpan.textContent = enps.toFixed(0);

        let interpretation = '';
        if (enps >= 50) {
            interpretation = 'Excellent eNPS: Your employees are highly engaged and loyal.';
        } else if (enps >= 0) {
            interpretation = 'Good eNPS: Your employees are generally satisfied.';
        } else {
            interpretation = 'Poor eNPS: There are significant issues with employee satisfaction.';
        }
        enpsInterpretationP.textContent = interpretation;

        saveInputs();
        console.log(`Analytics Event: eNPS calculated - ${enps.toFixed(0)} (${interpretation})`);
    };

    calculateBtn.addEventListener('click', calculateEnps);

    // Add event listeners for input changes to trigger recalculation and save
    promotersInput.addEventListener('input', () => { saveInputs(); calculateEnps(); });
    passivesInput.addEventListener('input', () => { saveInputs(); calculateEnps(); });
    detractorsInput.addEventListener('input', () => { saveInputs(); calculateEnps(); });

    loadInputs();
    calculateEnps(); // Initial calculation on page load

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
            const response = await fetch('/data/tools/employee-enps-calculator-leads.json', {
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