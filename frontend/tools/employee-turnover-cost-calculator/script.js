document.addEventListener('DOMContentLoaded', () => {
    const costInputsDiv = document.getElementById('costInputs');
    const addCostItemBtn = document.getElementById('addCostItem');
    const numberOfTurnoversInput = document.getElementById('numberOfTurnovers');
    const calculateBtn = document.getElementById('calculateBtn');
    const costPerTurnoverSpan = document.getElementById('costPerTurnover');
    const totalAnnualCostSpan = document.getElementById('totalAnnualCost');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    const saveInputs = () => {
        const currentCostItems = [];
        document.querySelectorAll('.cost-item').forEach(item => {
            currentCostItems.push({
                description: item.querySelector('.cost-description').value,
                amount: item.querySelector('.cost-amount').value
            });
        });
        localStorage.setItem('turnoverCostItems', JSON.stringify(currentCostItems));
        localStorage.setItem('numberOfTurnovers', numberOfTurnoversInput.value);
    };

    const loadInputs = () => {
        const savedCostItems = JSON.parse(localStorage.getItem('turnoverCostItems'));
        if (savedCostItems && savedCostItems.length > 0) {
            costInputsDiv.innerHTML = ''; // Clear default items
            savedCostItems.forEach(item => addCostItem(item.description, item.amount));
        } else {
            // Add default items if nothing saved
            addCostItem('Recruitment Costs', 2000);
            addCostItem('Onboarding & Training', 1500);
            addCostItem('Lost Productivity', 3000);
        }

        if (localStorage.getItem('numberOfTurnovers')) {
            numberOfTurnoversInput.value = localStorage.getItem('numberOfTurnovers');
        }
    };

    const addCostItem = (description = '', amount = 0) => {
        const costItemDiv = document.createElement('div');
        costItemDiv.classList.add('form-group', 'cost-item');
        costItemDiv.innerHTML = `
            <label>Cost Category:</label>
            <input type="text" class="cost-description" value="${description}">
            <label>Estimated Cost ($):</label>
            <input type="number" class="cost-amount" min="0" value="${amount}">
            <button class="remove-cost-item">Remove</button>
        `;
        costInputsDiv.appendChild(costItemDiv);
        costItemDiv.querySelector('.remove-cost-item').addEventListener('click', () => {
            costItemDiv.remove();
            saveInputs();
            calculateTurnoverCost();
        });
        costItemDiv.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                saveInputs();
                calculateTurnoverCost();
            });
        });
    };

    addCostItemBtn.addEventListener('click', () => {
        addCostItem();
        saveInputs();
        calculateTurnoverCost();
    });

    const calculateTurnoverCost = () => {
        let costPerTurnover = 0;
        document.querySelectorAll('.cost-amount').forEach(input => {
            const amount = parseFloat(input.value);
            if (!isNaN(amount) && amount > 0) {
                costPerTurnover += amount;
            }
        });

        const numberOfTurnovers = parseFloat(numberOfTurnoversInput.value);

        if (isNaN(numberOfTurnovers) || numberOfTurnovers < 0) {
            costPerTurnoverSpan.textContent = costPerTurnover.toFixed(2);
            totalAnnualCostSpan.textContent = 'Invalid Number of Turnovers';
            console.error('Analytics Event: Invalid number of turnovers for cost calculation');
            return;
        }

        const totalAnnualCost = costPerTurnover * numberOfTurnovers;

        costPerTurnoverSpan.textContent = costPerTurnover.toFixed(2);
        totalAnnualCostSpan.textContent = totalAnnualCost.toFixed(2);

        saveInputs();
        console.log(`Analytics Event: Turnover cost calculated - Total: $${totalAnnualCost.toFixed(2)}`);
    };

    calculateBtn.addEventListener('click', calculateTurnoverCost);

    // Add event listeners for input changes to trigger recalculation and save
    numberOfTurnoversInput.addEventListener('input', () => {
        saveInputs();
        calculateTurnoverCost();
    });

    loadInputs();
    calculateTurnoverCost(); // Initial calculation on page load

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
            const response = await fetch('/data/tools/employee-turnover-cost-calculator-leads.json', {
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