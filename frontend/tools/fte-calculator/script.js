document.addEventListener('DOMContentLoaded', () => {
    const fullTimeEmployeesInput = document.getElementById('fullTimeEmployees');
    const partTimeInputsDiv = document.getElementById('partTimeInputs');
    const addPartTimeEmployeeBtn = document.getElementById('addPartTimeEmployee');
    const standardFullTimeHoursInput = document.getElementById('standardFullTimeHours');
    const calculateBtn = document.getElementById('calculateBtn');
    const totalFTESpan = document.getElementById('totalFTE');
    const fteInterpretationP = document.getElementById('fteInterpretation');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    const saveInputs = () => {
        const currentPartTimeHours = [];
        document.querySelectorAll('.part-time-hours').forEach(input => {
            currentPartTimeHours.push(input.value);
        });
        localStorage.setItem('fullTimeEmployees', fullTimeEmployeesInput.value);
        localStorage.setItem('partTimeHours', JSON.stringify(currentPartTimeHours));
        localStorage.setItem('standardFullTimeHours', standardFullTimeHoursInput.value);
    };

    const loadInputs = () => {
        if (localStorage.getItem('fullTimeEmployees')) {
            fullTimeEmployeesInput.value = localStorage.getItem('fullTimeEmployees');
        }
        const savedPartTimeHours = JSON.parse(localStorage.getItem('partTimeHours'));
        if (savedPartTimeHours && savedPartTimeHours.length > 0) {
            partTimeInputsDiv.innerHTML = ''; // Clear default items
            savedPartTimeHours.forEach(hours => addPartTimeEmployee(hours));
        } else {
            // Add default items if nothing saved
            addPartTimeEmployee(20);
            addPartTimeEmployee(30);
        }
        if (localStorage.getItem('standardFullTimeHours')) {
            standardFullTimeHoursInput.value = localStorage.getItem('standardFullTimeHours');
        }
    };

    const addPartTimeEmployee = (hours = 20) => {
        const partTimeItemDiv = document.createElement('div');
        partTimeItemDiv.classList.add('form-group', 'part-time-item');
        partTimeItemDiv.innerHTML = `
            <label>Employee Hours per Week:</label>
            <input type="number" class="part-time-hours" min="1" max="39" value="${hours}">
            <button class="remove-part-time-item">Remove</button>
        `;
        partTimeInputsDiv.appendChild(partTimeItemDiv);
        partTimeItemDiv.querySelector('.remove-part-time-item').addEventListener('click', () => {
            partTimeItemDiv.remove();
            saveInputs();
            calculateFTE();
        });
        partTimeItemDiv.querySelector('.part-time-hours').addEventListener('input', () => {
            saveInputs();
            calculateFTE();
        });
    };

    addPartTimeEmployeeBtn.addEventListener('click', () => {
        addPartTimeEmployee();
        saveInputs();
        calculateFTE();
    });

    const calculateFTE = () => {
        const fullTimeEmployees = parseFloat(fullTimeEmployeesInput.value);
        const standardFullTimeHours = parseFloat(standardFullTimeHoursInput.value);

        if (isNaN(fullTimeEmployees) || fullTimeEmployees < 0 ||
            isNaN(standardFullTimeHours) || standardFullTimeHours <= 0) {
            totalFTESpan.textContent = 'Invalid Input';
            fteInterpretationP.textContent = '';
            console.error('Analytics Event: Invalid input for FTE calculation');
            return;
        }

        let partTimeFTE = 0;
        document.querySelectorAll('.part-time-hours').forEach(input => {
            const hours = parseFloat(input.value);
            if (!isNaN(hours) && hours > 0) {
                partTimeFTE += (hours / standardFullTimeHours);
            }
        });

        const totalFTE = fullTimeEmployees + partTimeFTE;
        totalFTESpan.textContent = totalFTE.toFixed(2);

        let interpretation = '';
        if (totalFTE > 0) {
            interpretation = `Your organization has a total of ${totalFTE.toFixed(2)} full-time equivalent employees.`;
        } else {
            interpretation = 'Please enter employee data to calculate FTE.';
        }
        fteInterpretationP.textContent = interpretation;

        saveInputs();
        console.log(`Analytics Event: FTE calculated - ${totalFTE.toFixed(2)}`);
    };

    calculateBtn.addEventListener('click', calculateFTE);

    // Add event listeners for input changes to trigger recalculation and save
    fullTimeEmployeesInput.addEventListener('input', () => { saveInputs(); calculateFTE(); });
    standardFullTimeHoursInput.addEventListener('input', () => { saveInputs(); calculateFTE(); });

    loadInputs();
    calculateFTE(); // Initial calculation on page load

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
            const response = await fetch('/data/tools/fte-calculator-leads.json', {
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