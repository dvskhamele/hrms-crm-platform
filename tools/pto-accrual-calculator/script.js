document.getElementById('calculate-btn').addEventListener('click', () => {
    const hoursPerPayPeriod = parseFloat(document.getElementById('hours-per-pay-period').value) || 0;
    const accrualRate = parseFloat(document.getElementById('accrual-rate').value) || 0;
    const maxAccrual = parseFloat(document.getElementById('max-accrual').value) || Infinity;
    const resultsDiv = document.getElementById('results');

    if (hoursPerPayPeriod === 0 || accrualRate === 0) {
        resultsDiv.innerHTML = '<p style="color: red;">Please enter hours worked per pay period and accrual rate.</p>';
        return;
    }

    let accruedPto = hoursPerPayPeriod * accrualRate;
    if (accruedPto > maxAccrual) {
        accruedPto = maxAccrual;
    }

    resultsDiv.innerHTML = `<h2>Accrued PTO per Pay Period: ${accruedPto.toFixed(2)} hours</h2>`;
});