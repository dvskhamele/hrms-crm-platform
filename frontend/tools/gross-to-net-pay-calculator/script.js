document.addEventListener('DOMContentLoaded', () => {
    const grossPayInput = document.getElementById('grossPay');
    const preTaxDeductionsInput = document.getElementById('preTaxDeductions');
    const federalTaxRateInput = document.getElementById('federalTaxRate');
    const stateTaxRateInput = document.getElementById('stateTaxRate');
    const otherDeductionsInput = document.getElementById('otherDeductions');
    const calculateBtn = document.getElementById('calculateBtn');
    const taxableIncomeSpan = document.getElementById('taxableIncome');
    const totalTaxesSpan = document.getElementById('totalTaxes');
    const netPaySpan = document.getElementById('netPay');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    const saveInputs = () => {
        localStorage.setItem('grossPay', grossPayInput.value);
        localStorage.setItem('preTaxDeductions', preTaxDeductionsInput.value);
        localStorage.setItem('federalTaxRate', federalTaxRateInput.value);
        localStorage.setItem('stateTaxRate', stateTaxRateInput.value);
        localStorage.setItem('otherDeductions', otherDeductionsInput.value);
    };

    const loadInputs = () => {
        if (localStorage.getItem('grossPay')) {
            grossPayInput.value = localStorage.getItem('grossPay');
        }
        if (localStorage.getItem('preTaxDeductions')) {
            preTaxDeductionsInput.value = localStorage.getItem('preTaxDeductions');
        }
        if (localStorage.getItem('federalTaxRate')) {
            federalTaxRateInput.value = localStorage.getItem('federalTaxRate');
        }
        if (localStorage.getItem('stateTaxRate')) {
            stateTaxRateInput.value = localStorage.getItem('stateTaxRate');
        }
        if (localStorage.getItem('otherDeductions')) {
            otherDeductionsInput.value = localStorage.getItem('otherDeductions');
        }
    };

    const calculateNetPay = () => {
        const grossPay = parseFloat(grossPayInput.value);
        const preTaxDeductions = parseFloat(preTaxDeductionsInput.value);
        const federalTaxRate = parseFloat(federalTaxRateInput.value) / 100;
        const stateTaxRate = parseFloat(stateTaxRateInput.value) / 100;
        const otherDeductions = parseFloat(otherDeductionsInput.value);

        if (isNaN(grossPay) || grossPay < 0 ||
            isNaN(preTaxDeductions) || preTaxDeductions < 0 ||
            isNaN(federalTaxRate) || federalTaxRate < 0 || federalTaxRate > 1 ||
            isNaN(stateTaxRate) || stateTaxRate < 0 || stateTaxRate > 1 ||
            isNaN(otherDeductions) || otherDeductions < 0) {
            taxableIncomeSpan.textContent = 'Invalid Input';
            totalTaxesSpan.textContent = 'Invalid Input';
            netPaySpan.textContent = 'Invalid Input';
            console.error('Analytics Event: Invalid input for gross to net pay calculation');
            return;
        }

        const taxableIncome = grossPay - preTaxDeductions;
        const federalTax = taxableIncome * federalTaxRate;
        const stateTax = taxableIncome * stateTaxRate;
        const totalTaxes = federalTax + stateTax;

        const netPay = taxableIncome - totalTaxes - otherDeductions;

        taxableIncomeSpan.textContent = taxableIncome.toFixed(2);
        totalTaxesSpan.textContent = totalTaxes.toFixed(2);
        netPaySpan.textContent = netPay.toFixed(2);

        saveInputs();
        console.log(`Analytics Event: Gross to net pay calculated - Net Pay: $${netPay.toFixed(2)}`);
    };

    calculateBtn.addEventListener('click', calculateNetPay);

    // Add event listeners for input changes to trigger recalculation and save
    grossPayInput.addEventListener('input', () => { saveInputs(); calculateNetPay(); });
    preTaxDeductionsInput.addEventListener('input', () => { saveInputs(); calculateNetPay(); });
    federalTaxRateInput.addEventListener('input', () => { saveInputs(); calculateNetPay(); });
    stateTaxRateInput.addEventListener('input', () => { saveInputs(); calculateNetPay(); });
    otherDeductionsInput.addEventListener('input', () => { saveInputs(); calculateNetPay(); });

    loadInputs();
    calculateNetPay(); // Initial calculation on page load

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
            const response = await fetch('/data/tools/gross-to-net-pay-calculator-leads.json', {
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