document.addEventListener('DOMContentLoaded', () => {
    const currentSalaryInput = document.getElementById('currentSalary');
    const performanceRatingInput = document.getElementById('performanceRating');
    const marketAdjustmentInput = document.getElementById('marketAdjustment');
    const budgetConstraintInput = document.getElementById('budgetConstraint');
    const calculateBtn = document.getElementById('calculateBtn');
    const recommendedIncreasePercentSpan = document.getElementById('recommendedIncreasePercent');
    const newAnnualSalarySpan = document.getElementById('newAnnualSalary');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    const saveInputs = () => {
        localStorage.setItem('currentSalary', currentSalaryInput.value);
        localStorage.setItem('performanceRating', performanceRatingInput.value);
        localStorage.setItem('marketAdjustment', marketAdjustmentInput.value);
        localStorage.setItem('budgetConstraint', budgetConstraintInput.value);
    };

    const loadInputs = () => {
        if (localStorage.getItem('currentSalary')) {
            currentSalaryInput.value = localStorage.getItem('currentSalary');
        }
        if (localStorage.getItem('performanceRating')) {
            performanceRatingInput.value = localStorage.getItem('performanceRating');
        }
        if (localStorage.getItem('marketAdjustment')) {
            marketAdjustmentInput.value = localStorage.getItem('marketAdjustment');
        }
        if (localStorage.getItem('budgetConstraint')) {
            budgetConstraintInput.value = localStorage.getItem('budgetConstraint');
        }
    };

    const calculateSalaryIncrease = () => {
        const currentSalary = parseFloat(currentSalaryInput.value);
        const performanceRating = parseFloat(performanceRatingInput.value);
        const marketAdjustment = parseFloat(marketAdjustmentInput.value);
        const budgetConstraint = parseFloat(budgetConstraintInput.value);

        if (isNaN(currentSalary) || currentSalary < 0 ||
            isNaN(performanceRating) || performanceRating < 1 || performanceRating > 5 ||
            isNaN(marketAdjustment) ||
            isNaN(budgetConstraint) || budgetConstraint < 0) {
            recommendedIncreasePercentSpan.textContent = 'Invalid Input';
            newAnnualSalarySpan.textContent = 'Invalid Input';
            console.error('Analytics Event: Invalid input for salary increase calculation');
            return;
        }

        // Base increase based on performance (example logic)
        let performanceIncrease = 0;
        switch (performanceRating) {
            case 1: performanceIncrease = 0; break;
            case 2: performanceIncrease = 1; break;
            case 3: performanceIncrease = 2.5; break;
            case 4: performanceIncrease = 4; break;
            case 5: performanceIncrease = 6; break;
        }

        // Combine performance and market adjustment
        let recommendedIncrease = performanceIncrease + marketAdjustment;

        // Apply budget constraint
        if (recommendedIncrease > budgetConstraint) {
            recommendedIncrease = budgetConstraint;
        }

        const increaseAmount = currentSalary * (recommendedIncrease / 100);
        const newSalary = currentSalary + increaseAmount;

        recommendedIncreasePercentSpan.textContent = `${recommendedIncrease.toFixed(2)}%`;
        newAnnualSalarySpan.textContent = newSalary.toFixed(2);

        saveInputs();
        console.log(`Analytics Event: Salary increase calculated - ${recommendedIncrease.toFixed(2)}%`);
    };

    calculateBtn.addEventListener('click', calculateSalaryIncrease);

    // Add event listeners for input changes to trigger recalculation and save
    currentSalaryInput.addEventListener('input', () => { saveInputs(); calculateSalaryIncrease(); });
    performanceRatingInput.addEventListener('input', () => { saveInputs(); calculateSalaryIncrease(); });
    marketAdjustmentInput.addEventListener('input', () => { saveInputs(); calculateSalaryIncrease(); });
    budgetConstraintInput.addEventListener('input', () => { saveInputs(); calculateSalaryIncrease(); });

    loadInputs();
    calculateSalaryIncrease(); // Initial calculation on page load

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
            const response = await fetch('/data/tools/employee-salary-increase-calculator-leads.json', {
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