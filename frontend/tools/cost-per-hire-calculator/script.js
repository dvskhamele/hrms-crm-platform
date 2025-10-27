document.addEventListener('DOMContentLoaded', () => {
    const costInputsDiv = document.getElementById('costInputs');
    const addCostItemBtn = document.getElementById('addCostItem');
    const numberOfHiresInput = document.getElementById('numberOfHires');
    const calculateBtn = document.getElementById('calculateBtn');
    const totalCostSpan = document.getElementById('totalCost');
    const costPerHireSpan = document.getElementById('costPerHire');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    let costItems = [];

    const saveInputs = () => {
        const currentCostItems = [];
        document.querySelectorAll('.cost-item').forEach(item => {
            currentCostItems.push({
                description: item.querySelector('.cost-description').value,
                amount: item.querySelector('.cost-amount').value
            });
        });
        localStorage.setItem('costItems', JSON.stringify(currentCostItems));
        localStorage.setItem('numberOfHires', numberOfHiresInput.value);
    };

    const loadInputs = () => {
        const savedCostItems = JSON.parse(localStorage.getItem('costItems'));
        if (savedCostItems && savedCostItems.length > 0) {
            costInputsDiv.innerHTML = ''; // Clear default items
            savedCostItems.forEach(item => addCostItem(item.description, item.amount));
        } else {
            // Add default items if nothing saved
            addCostItem('Advertising', 1000);
            addCostItem('Agency Fees', 2500);
        }

        if (localStorage.getItem('numberOfHires')) {
            numberOfHiresInput.value = localStorage.getItem('numberOfHires');
        }
    };

    const addCostItem = (description = '', amount = 0) => {
        const costItemDiv = document.createElement('div');
        costItemDiv.classList.add('form-group', 'cost-item');
        costItemDiv.innerHTML = `
            <label>Cost Item:</label>
            <input type="text" class="cost-description" value="${description}">
            <label>Amount ($):</label>
            <input type="number" class="cost-amount" min="0" value="${amount}">
            <button class="remove-cost-item">Remove</button>
        `;
        costInputsDiv.appendChild(costItemDiv);
        costItemDiv.querySelector('.remove-cost-item').addEventListener('click', () => {
            costItemDiv.remove();
            saveInputs();
            calculateCostPerHire();
        });
        costItemDiv.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                saveInputs();
                calculateCostPerHire();
            });
        });
    };

    addCostItemBtn.addEventListener('click', () => {
        addCostItem();
        saveInputs();
        calculateCostPerHire();
    });

    const calculateCostPerHire = () => {
        let totalCost = 0;
        document.querySelectorAll('.cost-amount').forEach(input => {
            const amount = parseFloat(input.value);
            if (!isNaN(amount) && amount > 0) {
                totalCost += amount;
            }
        });

        const numberOfHires = parseFloat(numberOfHiresInput.value);

        if (isNaN(numberOfHires) || numberOfHires <= 0) {
            totalCostSpan.textContent = totalCost.toFixed(2);
            costPerHireSpan.textContent = 'Invalid Number of Hires';
            console.error('Analytics Event: Invalid number of hires for cost per hire calculation');
            return;
        }

        const costPerHire = totalCost / numberOfHires;

        totalCostSpan.textContent = totalCost.toFixed(2);
        costPerHireSpan.textContent = costPerHire.toFixed(2);

        saveInputs();
        console.log(`Analytics Event: Cost per hire calculated - $${costPerHire.toFixed(2)}`);
    };

    numberOfHiresInput.addEventListener('input', () => {
        saveInputs();
        calculateCostPerHire();
    });

    calculateBtn.addEventListener('click', calculateCostPerHire);

    loadInputs();
    calculateCostPerHire(); // Initial calculation on page load

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
            const response = await fetch('/data/tools/cost-per-hire-calculator-leads.json', {
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