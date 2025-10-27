
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const netPayEl = document.getElementById('net-pay');
    const deductionsBreakdownEl = document.getElementById('deductions-breakdown');

    // NOTE: Using simplified 2023 Federal Tax Brackets. This does not account for all deductions and credits.
    const taxBrackets = {
        single: [
            { rate: 0.10, threshold: 11000 },
            { rate: 0.12, threshold: 44725 },
            { rate: 0.22, threshold: 95375 },
            { rate: 0.24, threshold: 182100 },
            { rate: 0.32, threshold: 231250 },
            { rate: 0.35, threshold: 578125 },
            { rate: 0.37, threshold: Infinity }
        ],
        married: [
            { rate: 0.10, threshold: 22000 },
            { rate: 0.12, threshold: 89450 },
            { rate: 0.22, threshold: 190750 },
            { rate: 0.24, threshold: 364200 },
            { rate: 0.32, threshold: 462500 },
            { rate: 0.35, threshold: 693750 },
            { rate: 0.37, threshold: Infinity }
        ]
    };

    const FICA_RATES = {
        socialSecurity: 0.062,
        medicare: 0.0145,
        socialSecurityLimit: 160200 // 2023 limit
    };

    calculateBtn.addEventListener('click', () => {
        const grossPay = parseFloat(document.getElementById('gross-pay').value);
        const payFrequency = document.getElementById('pay-frequency').value;
        const filingStatus = document.getElementById('filing-status').value;

        if (isNaN(grossPay) || grossPay <= 0) {
            alert('Please enter a valid gross pay amount.');
            return;
        }

        let payPeriodsPerYear;
        switch (payFrequency) {
            case 'weekly': payPeriodsPerYear = 52; break;
            case 'bi-weekly': payPeriodsPerYear = 26; break;
            case 'semi-monthly': payPeriodsPerYear = 24; break;
            case 'monthly': payPeriodsPerYear = 12; break;
        }

        const annualGrossPay = grossPay * payPeriodsPerYear;

        // Calculate FICA Taxes
        const socialSecurityTaxable = Math.min(annualGrossPay, FICA_RATES.socialSecurityLimit);
        const socialSecurityTax = socialSecurityTaxable * FICA_RATES.socialSecurity;
        const medicareTax = annualGrossPay * FICA_RATES.medicare;
        const totalFICATax = socialSecurityTax + medicareTax;

        // Calculate Federal Income Tax
        const brackets = taxBrackets[filingStatus];
        let federalTax = 0;
        let remainingIncome = annualGrossPay;
        let previousThreshold = 0;

        for (const bracket of brackets) {
            if (remainingIncome > 0) {
                const taxableInBracket = Math.min(remainingIncome, bracket.threshold - previousThreshold);
                federalTax += taxableInBracket * bracket.rate;
                remainingIncome -= taxableInBracket;
                if (remainingIncome <= 0) break;
                previousThreshold = bracket.threshold;
            }
        }

        const totalDeductions = (totalFICATax + federalTax) / payPeriodsPerYear;
        const netPay = grossPay - totalDeductions;

        netPayEl.textContent = `$${netPay.toFixed(2)}`;
        deductionsBreakdownEl.innerHTML = `
            <p><strong>Federal Income Tax:</strong> ~$${(federalTax / payPeriodsPerYear).toFixed(2)}</p>
            <p><strong>FICA (Social Security & Medicare):</strong> ~$${(totalFICATax / payPeriodsPerYear).toFixed(2)}</p>
        `;

        resultDiv.classList.remove('hidden');
    });
});
