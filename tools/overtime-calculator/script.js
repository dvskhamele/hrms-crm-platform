
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const totalPayEl = document.getElementById('total-pay');
    const payBreakdownEl = document.getElementById('pay-breakdown');

    calculateBtn.addEventListener('click', () => {
        const hourlyRate = parseFloat(document.getElementById('hourly-rate').value);
        const regularHours = parseFloat(document.getElementById('regular-hours').value);
        const overtimeHours = parseFloat(document.getElementById('overtime-hours').value) || 0;
        const overtimeMultiplier = parseFloat(document.getElementById('overtime-multiplier').value);

        if (isNaN(hourlyRate) || hourlyRate <= 0 || isNaN(regularHours) || regularHours < 0) {
            alert('Please enter valid numbers for hourly rate and regular hours.');
            return;
        }

        const regularPay = hourlyRate * regularHours;
        const overtimeRate = hourlyRate * overtimeMultiplier;
        const overtimePay = overtimeRate * overtimeHours;
        const totalPay = regularPay + overtimePay;

        totalPayEl.textContent = `$${totalPay.toFixed(2)}`;
        payBreakdownEl.innerHTML = `
            Regular Pay: $${regularPay.toFixed(2)}<br>
            Overtime Pay: $${overtimePay.toFixed(2)}
        `;

        resultDiv.classList.remove('hidden');
    });
});
