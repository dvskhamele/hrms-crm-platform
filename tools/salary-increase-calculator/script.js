document.getElementById('calculate-btn').addEventListener('click', () => {
    const currentSalary = parseFloat(document.getElementById('current-salary').value) || 0;
    const increasePercentage = parseFloat(document.getElementById('increase-percentage').value) || 0;
    const resultsDiv = document.getElementById('results');

    if (currentSalary === 0) {
        resultsDiv.innerHTML = '<p style="color: red;">Please enter current annual salary.</p>';
        return;
    }

    const newSalary = currentSalary * (1 + (increasePercentage / 100));
    const increaseAmount = newSalary - currentSalary;

    resultsDiv.innerHTML = `
        <h2>Salary Increase Calculation:</h2>
        <p><strong>Current Annual Salary:</strong> $${currentSalary.toFixed(2)}</p>
        <p><strong>Increase Amount:</strong> $${increaseAmount.toFixed(2)}</p>
        <p><strong>New Annual Salary:</strong> $${newSalary.toFixed(2)}</p>
    `;
});
