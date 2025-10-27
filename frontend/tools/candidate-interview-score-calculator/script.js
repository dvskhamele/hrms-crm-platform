document.addEventListener('DOMContentLoaded', () => {
    const criteriaInputsDiv = document.getElementById('criteriaInputs');
    const addCriterionItemBtn = document.getElementById('addCriterionItem');
    const calculateBtn = document.getElementById('calculateBtn');
    const interviewScoreSpan = document.getElementById('interviewScore');
    const scoreInterpretationP = document.getElementById('scoreInterpretation');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    const saveInputs = () => {
        const currentCriteriaItems = [];
        document.querySelectorAll('.criteria-item').forEach(item => {
            currentCriteriaItems.push({
                description: item.querySelector('.criterion-description').value,
                score: item.querySelector('.criterion-score').value,
                weight: item.querySelector('.criterion-weight').value
            });
        });
        localStorage.setItem('interviewCriteria', JSON.stringify(currentCriteriaItems));
    };

    const loadInputs = () => {
        const savedCriteriaItems = JSON.parse(localStorage.getItem('interviewCriteria'));
        if (savedCriteriaItems && savedCriteriaItems.length > 0) {
            criteriaInputsDiv.innerHTML = ''; // Clear default items
            savedCriteriaItems.forEach(item => addCriterionItem(item.description, item.score, item.weight));
        } else {
            // Add default items if nothing saved
            addCriterionItem('Technical Skills', 4, 30);
            addCriterionItem('Problem Solving', 5, 25);
            addCriterionItem('Communication', 4, 25);
            addCriterionItem('Cultural Fit', 3, 20);
        }
    };

    const addCriterionItem = (description = '', score = 3, weight = 0) => {
        const criterionItemDiv = document.createElement('div');
        criterionItemDiv.classList.add('form-group', 'criteria-item');
        criterionItemDiv.innerHTML = `
            <label>Criterion:</label>
            <input type="text" class="criterion-description" value="${description}">
            <label>Score (1-5):</label>
            <input type="number" class="criterion-score" min="1" max="5" value="${score}">
            <label>Weight (%):</label>
            <input type="number" class="criterion-weight" min="0" max="100" value="${weight}">
            <button class="remove-criterion-item">Remove</button>
        `;
        criteriaInputsDiv.appendChild(criterionItemDiv);
        criterionItemDiv.querySelector('.remove-criterion-item').addEventListener('click', () => {
            criterionItemDiv.remove();
            saveInputs();
            calculateInterviewScore();
        });
        criterionItemDiv.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                saveInputs();
                calculateInterviewScore();
            });
        });
    };

    addCriterionItemBtn.addEventListener('click', () => {
        addCriterionItem();
        saveInputs();
        calculateInterviewScore();
    });

    const calculateInterviewScore = () => {
        let totalWeightedScore = 0;
        let totalWeight = 0;
        let isValid = true;

        document.querySelectorAll('.criteria-item').forEach(item => {
            const score = parseFloat(item.querySelector('.criterion-score').value);
            const weight = parseFloat(item.querySelector('.criterion-weight').value);

            if (isNaN(score) || score < 1 || score > 5 || isNaN(weight) || weight < 0) {
                isValid = false;
            }

            totalWeightedScore += (score * weight);
            totalWeight += weight;
        });

        if (!isValid || totalWeight === 0) {
            interviewScoreSpan.textContent = 'Invalid Input';
            scoreInterpretationP.textContent = '';
            console.error('Analytics Event: Invalid input for interview score calculation');
            return;
        }

        const overallScore = totalWeightedScore / totalWeight;
        interviewScoreSpan.textContent = overallScore.toFixed(2);

        let interpretation = '';
        if (overallScore >= 4.5) {
            interpretation = 'Highly Recommended';
        } else if (overallScore >= 3.5) {
            interpretation = 'Recommended';
        } else if (overallScore >= 2.5) {
            interpretation = 'Consider with Reservations';
        } else {
            interpretation = 'Not Recommended';
        }
        scoreInterpretationP.textContent = `Recommendation: ${interpretation}`;

        saveInputs();
        console.log(`Analytics Event: Interview score calculated - ${overallScore.toFixed(2)} (${interpretation})`);
    };

    calculateBtn.addEventListener('click', calculateInterviewScore);

    // Add event listeners for input changes to trigger recalculation and save
    criteriaInputsDiv.addEventListener('input', () => {
        saveInputs();
        calculateInterviewScore();
    });

    loadInputs();
    calculateInterviewScore(); // Initial calculation on page load

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
            const response = await fetch('/data/tools/candidate-interview-score-calculator-leads.json', {
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