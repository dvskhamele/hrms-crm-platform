document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');

    calculateBtn.addEventListener('click', () => {
        const grossSalary = parseFloat(document.getElementById('gross-salary').value);
        const sacrificePercentage = parseFloat(document.getElementById('sacrifice-percentage').value);

        if (isNaN(grossSalary) || isNaN(sacrificePercentage)) {
            alert('Please enter valid numbers for salary and percentage.');
            return;
        }

        // Basic tax and NI rates for calculation
        const TAX_RATE = 0.20; // Basic rate
        const NI_RATE = 0.12; // Employee's National Insurance rate

        const originalMonthlyGross = grossSalary / 12;
        const amountSacrificed = grossSalary * (sacrificePercentage / 100);
        const monthlySacrificed = amountSacrificed / 12;
        const newGrossSalary = grossSalary - amountSacrificed;
        const newMonthlyGross = newGrossSalary / 12;

        // Estimate savings based on the sacrificed amount
        const taxSaving = amountSacrificed * TAX_RATE;
        const niSaving = amountSacrificed * NI_RATE;
        const annualSaving = taxSaving + niSaving;
        const monthlySaving = annualSaving / 12;

        // Display results
        document.getElementById('original-monthly-gross').textContent = `£${originalMonthlyGross.toFixed(2)}`;
        document.getElementById('new-monthly-gross').textContent = `£${newMonthlyGross.toFixed(2)}`;
        document.getElementById('monthly-sacrificed').textContent = `£${monthlySacrificed.toFixed(2)}`;
        document.getElementById('monthly-saving').textContent = `£${monthlySaving.toFixed(2)}`;
        document.getElementById('annual-saving').textContent = `£${annualSaving.toFixed(2)}`;
    });
});
