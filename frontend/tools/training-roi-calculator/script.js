document.addEventListener('DOMContentLoaded', () => {
    const trainingCostInput = document.getElementById('trainingCost');
    const monetaryBenefitsInput = document.getElementById('monetaryBenefits');
    const calculateBtn = document.getElementById('calculateBtn');
    const trainingROISpan = document.getElementById('trainingROI');
    const roiInterpretationP = document.getElementById('roiInterpretation');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    const saveInputs = () => {
        localStorage.setItem('trainingCost', trainingCostInput.value);
        localStorage.setItem('monetaryBenefits', monetaryBenefitsInput.value);
    };

    const loadInputs = () => {
        if (localStorage.getItem('trainingCost')) {
            trainingCostInput.value = localStorage.getItem('trainingCost');
        }
        if (localStorage.getItem('monetaryBenefits')) {
            monetaryBenefitsInput.value = localStorage.getItem('monetaryBenefits');
        }
    };

    const calculateTrainingROI = () => {
        const trainingCost = parseFloat(trainingCostInput.value);
        const monetaryBenefits = parseFloat(monetaryBenefitsInput.value);

        if (isNaN(trainingCost) || trainingCost < 0 ||
            isNaN(monetaryBenefits) || monetaryBenefits < 0) {
            trainingROISpan.textContent = 'Invalid Input';
            roiInterpretationP.textContent = '';
            console.error('Analytics Event: Invalid input for training ROI calculation');
            return;
        }

        let roi = 0;
        if (trainingCost > 0) {
            roi = ((monetaryBenefits - trainingCost) / trainingCost) * 100;
        }

        trainingROISpan.textContent = `${roi.toFixed(2)}%`;

        let interpretation = '';
        if (roi > 0) {
            interpretation = 'The training program generated a positive return on investment.';
        } else if (roi < 0) {
            interpretation = 'The training program resulted in a negative return on investment.';
        } else {
            interpretation = 'The training program broke even.';
        }
        roiInterpretationP.textContent = interpretation;

        saveInputs();
        console.log(`Analytics Event: Training ROI calculated - ${roi.toFixed(2)}%`);
    };

    calculateBtn.addEventListener('click', calculateTrainingROI);

    // Add event listeners for input changes to trigger recalculation and save
    trainingCostInput.addEventListener('input', () => { saveInputs(); calculateTrainingROI(); });
    monetaryBenefitsInput.addEventListener('input', () => { saveInputs(); calculateTrainingROI(); });

    loadInputs();
    calculateTrainingROI(); // Initial calculation on page load

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
            const response = await fetch('/data/tools/training-roi-calculator-leads.json', {
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