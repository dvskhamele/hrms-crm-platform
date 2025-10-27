document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');

    calculateBtn.addEventListener('click', () => {
        const startingBalance = parseFloat(document.getElementById('starting-balance').value);
        const accrualRate = parseFloat(document.getElementById('accrual-rate').value);
        const payPeriodsPerYear = parseInt(document.getElementById('pay-periods-per-year').value);
        const ptoTakenInput = document.getElementById('pto-taken').value;

        if (isNaN(startingBalance) || isNaN(accrualRate) || isNaN(payPeriodsPerYear)) {
            alert('Please enter valid numbers for starting balance, accrual rate, and pay periods.');
            return;
        }

        const ptoTaken = ptoTakenInput.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
        const totalPtoTaken = ptoTaken.reduce((sum, current) => sum + current, 0);

        // Assuming current date for calculation of accrued PTO
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const daysIntoYear = (today - startOfYear) / (1000 * 60 * 60 * 24);
        const currentPayPeriod = Math.floor((daysIntoYear / 365) * payPeriodsPerYear);

        const accruedPto = currentPayPeriod * accrualRate;
        const currentBalance = startingBalance + accruedPto - totalPtoTaken;

        // Projected end of year balance
        const remainingPayPeriods = payPeriodsPerYear - currentPayPeriod;
        const projectedAccrual = remainingPayPeriods * accrualRate;
        const projectedBalance = currentBalance + projectedAccrual;

        document.getElementById('current-balance').textContent = currentBalance.toFixed(2);
        document.getElementById('projected-balance').textContent = projectedBalance.toFixed(2);
    });

    // Initial calculation on load with default values
    calculateBtn.click();
});
