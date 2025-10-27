document.getElementById('calculate-btn').addEventListener('click', () => {
    const candidateSalary = parseFloat(document.getElementById('candidate-salary').value) || 0;
    const feePercentage = parseFloat(document.getElementById('fee-percentage').value) || 0;
    const resultsDiv = document.getElementById('results');

    if (candidateSalary === 0 || feePercentage === 0) {
        resultsDiv.innerHTML = '<p style="color: red;">Please enter candidate annual salary and agency fee percentage.</p>';
        return;
    }

    const agencyFee = candidateSalary * (feePercentage / 100);

    resultsDiv.innerHTML = `<h2>Recruitment Agency Fee: $${agencyFee.toFixed(2)}</h2>`;
});