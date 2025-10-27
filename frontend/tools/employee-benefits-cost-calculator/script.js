document.addEventListener('DOMContentLoaded', () => {
    const benefitInputsDiv = document.getElementById('benefitInputs');
    const addBenefitItemBtn = document.getElementById('addBenefitItem');
    const numberOfEmployeesInput = document.getElementById('numberOfEmployees');
    const calculateBtn = document.getElementById('calculateBtn');
    const costPerEmployeeSpan = document.getElementById('costPerEmployee');
    const totalOrganizationCostSpan = document.getElementById('totalOrganizationCost');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    const saveInputs = () => {
        const currentBenefitItems = [];
        document.querySelectorAll('.benefit-item').forEach(item => {
            currentBenefitItems.push({
                description: item.querySelector('.benefit-description').value,
                cost: item.querySelector('.benefit-cost').value
            });
        });
        localStorage.setItem('benefitItems', JSON.stringify(currentBenefitItems));
        localStorage.setItem('numberOfEmployees', numberOfEmployeesInput.value);
    };

    const loadInputs = () => {
        const savedBenefitItems = JSON.parse(localStorage.getItem('benefitItems'));
        if (savedBenefitItems && savedBenefitItems.length > 0) {
            benefitInputsDiv.innerHTML = ''; // Clear default items
            savedBenefitItems.forEach(item => addBenefitItem(item.description, item.cost));
        } else {
            // Add default items if nothing saved
            addBenefitItem('Health Insurance', 6000);
            addBenefitItem('Dental & Vision', 500);
            addBenefitItem('401k Match', 1500);
        }

        if (localStorage.getItem('numberOfEmployees')) {
            numberOfEmployeesInput.value = localStorage.getItem('numberOfEmployees');
        }
    };

    const addBenefitItem = (description = '', cost = 0) => {
        const benefitItemDiv = document.createElement('div');
        benefitItemDiv.classList.add('form-group', 'benefit-item');
        benefitItemDiv.innerHTML = `
            <label>Benefit Item:</label>
            <input type="text" class="benefit-description" value="${description}">
            <label>Cost per Employee ($):</label>
            <input type="number" class="benefit-cost" min="0" value="${cost}">
            <button class="remove-benefit-item">Remove</button>
        `;
        benefitInputsDiv.appendChild(benefitItemDiv);
        benefitItemDiv.querySelector('.remove-benefit-item').addEventListener('click', () => {
            benefitItemDiv.remove();
            saveInputs();
            calculateBenefitsCost();
        });
        benefitItemDiv.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                saveInputs();
                calculateBenefitsCost();
            });
        });
    };

    addBenefitItemBtn.addEventListener('click', () => {
        addBenefitItem();
        saveInputs();
        calculateBenefitsCost();
    });

    const calculateBenefitsCost = () => {
        let totalCostPerEmployee = 0;
        document.querySelectorAll('.benefit-cost').forEach(input => {
            const cost = parseFloat(input.value);
            if (!isNaN(cost) && cost > 0) {
                totalCostPerEmployee += cost;
            }
        });

        const numberOfEmployees = parseFloat(numberOfEmployeesInput.value);

        if (isNaN(numberOfEmployees) || numberOfEmployees <= 0) {
            costPerEmployeeSpan.textContent = totalCostPerEmployee.toFixed(2);
            totalOrganizationCostSpan.textContent = 'Invalid Number of Employees';
            console.error('Analytics Event: Invalid number of employees for benefits cost calculation');
            return;
        }

        const totalOrganizationCost = totalCostPerEmployee * numberOfEmployees;

        costPerEmployeeSpan.textContent = totalCostPerEmployee.toFixed(2);
        totalOrganizationCostSpan.textContent = totalOrganizationCost.toFixed(2);

        saveInputs();
        console.log(`Analytics Event: Benefits cost calculated - Total: $${totalOrganizationCost.toFixed(2)}`);
    };

    calculateBtn.addEventListener('click', calculateBenefitsCost);

    // Add event listeners for input changes to trigger recalculation and save
    numberOfEmployeesInput.addEventListener('input', () => {
        saveInputs();
        calculateBenefitsCost();
    });

    loadInputs();
    calculateBenefitsCost(); // Initial calculation on page load

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
            const response = await fetch('/data/tools/employee-benefits-cost-calculator-leads.json', {
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