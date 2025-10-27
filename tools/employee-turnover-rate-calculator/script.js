document.addEventListener('DOMContentLoaded', () => {
    const avgEmployeesInput = document.getElementById('avg-employees');
    const numSeparationsInput = document.getElementById('num-separations');
    const calculateBtn = document.getElementById('calculate-btn');
    const turnoverOutput = document.getElementById('turnover-output');

    const calculateTurnoverRate = () => {
        const avgEmployees = parseFloat(avgEmployeesInput.value) || 0;
        const numSeparations = parseFloat(numSeparationsInput.value) || 0;

        if (avgEmployees <= 0) {
            turnoverOutput.innerHTML = '<p style="color: red;">Average number of employees must be greater than zero.</p>';
            return;
        }
        if (numSeparations < 0) {
            turnoverOutput.innerHTML = '<p style="color: red;">Number of separations cannot be negative.</p>';
            return;
        }

        const turnoverRate = (numSeparations / avgEmployees) * 100;

        turnoverOutput.innerHTML = `
            <p>Employee Turnover Rate: <strong>${turnoverRate.toFixed(2)}%</strong></p>
        `;
    };

    calculateBtn.addEventListener('click', calculateTurnoverRate);

    // Calculate initial turnover rate on load
    calculateTurnoverRate();
});