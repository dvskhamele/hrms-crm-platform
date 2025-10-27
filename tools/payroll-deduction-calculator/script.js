document.getElementById('calculate-btn').addEventListener('click', () => {
    const grossPay = parseFloat(document.getElementById('gross-pay').value) || 0;
    const federalTaxRate = parseFloat(document.getElementById('federal-tax-rate').value) || 0;
    const stateTaxRate = parseFloat(document.getElementById('state-tax-rate').value) || 0;
    const socialSecurityRate = parseFloat(document.getElementById('social-security-rate').value) || 0;
    const medicareRate = parseFloat(document.getElementById('medicare-rate').value) || 0;
    const healthInsurancePremium = parseFloat(document.getElementById('health-insurance-premium').value) || 0;
    const retirementContribution = parseFloat(document.getElementById('retirement-contribution').value) || 0;
    const resultsDiv = document.getElementById('results');

    if (grossPay === 0) {
        resultsDiv.innerHTML = '<p style="color: red;">Please enter gross pay.</p>';
        return;
    }

    const federalTax = grossPay * (federalTaxRate / 100);
    const stateTax = grossPay * (stateTaxRate / 100);
    const socialSecurity = grossPay * (socialSecurityRate / 100);
    const medicare = grossPay * (medicareRate / 100);

    const totalDeductions = federalTax + stateTax + socialSecurity + medicare + healthInsurancePremium + retirementContribution;
    const netPay = grossPay - totalDeductions;

    resultsDiv.innerHTML = `
        <h2>Payroll Calculation:</h2>
        <p><strong>Gross Pay:</strong> $${grossPay.toFixed(2)}</p>
        <p><strong>Federal Tax:</strong> $${federalTax.toFixed(2)}</p>
        <p><strong>State Tax:</strong> $${stateTax.toFixed(2)}</p>
        <p><strong>Social Security:</strong> $${socialSecurity.toFixed(2)}</p>
        <p><strong>Medicare:</strong> $${medicare.toFixed(2)}</p>
        <p><strong>Health Insurance:</strong> $${healthInsurancePremium.toFixed(2)}</p>
        <p><strong>Retirement:</strong> $${retirementContribution.toFixed(2)}</p>
        <p><strong>Total Deductions:</strong> $${totalDeductions.toFixed(2)}</p>
        <p><strong>Net Pay:</strong> $${netPay.toFixed(2)}</p>
    `;
});
