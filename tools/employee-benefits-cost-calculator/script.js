document.getElementById('calculate-btn').addEventListener('click', () => {
    const healthInsurance = parseFloat(document.getElementById('health-insurance').value) || 0;
    const dentalVision = parseFloat(document.getElementById('dental-vision').value) || 0;
    const retirementContributions = parseFloat(document.getElementById('retirement-contributions').value) || 0;
    const paidTimeOff = parseFloat(document.getElementById('paid-time-off').value) || 0;
    const otherBenefits = parseFloat(document.getElementById('other-benefits').value) || 0;
    const numEmployees = parseInt(document.getElementById('num-employees').value) || 0;

    if (numEmployees === 0) {
        document.getElementById('results').innerHTML = '<p style="color: red;">Please enter the number of employees.</p>';
        return;
    }

    const totalBenefitsPerEmployeePerMonth = healthInsurance + dentalVision + retirementContributions + paidTimeOff + otherBenefits;
    const totalBenefitsCostPerMonth = totalBenefitsPerEmployeePerMonth * numEmployees;
    const totalBenefitsCostPerYear = totalBenefitsCostPerMonth * 12;

    document.getElementById('results').innerHTML = `
        <h2>Total Employee Benefits Cost:</h2>
        <p>Per Employee Per Month: $${totalBenefitsPerEmployeePerMonth.toFixed(2)}</p>
        <p>Total Per Month: $${totalBenefitsCostPerMonth.toFixed(2)}</p>
        <p>Total Per Year: $${totalBenefitsCostPerYear.toFixed(2)}</p>
    `;
});
