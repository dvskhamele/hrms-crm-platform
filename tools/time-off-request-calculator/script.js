const accrualRateInput = document.getElementById('accrual-rate');
const currentBalanceInput = document.getElementById('current-balance');
const requestedDaysInput = document.getElementById('requested-days');
const calculateBtn = document.getElementById('calculate-btn');
const newBalanceSpan = document.getElementById('new-balance');
const messageP = document.getElementById('message');

calculateBtn.addEventListener('click', () => {
    const accrualRate = parseFloat(accrualRateInput.value) || 0;
    const currentBalance = parseFloat(currentBalanceInput.value) || 0;
    const requestedDays = parseFloat(requestedDaysInput.value) || 0;

    // For simplicity, let's assume a monthly accrual and calculate for one month ahead
    const projectedBalance = currentBalance + accrualRate;
    const newBalance = projectedBalance - requestedDays;

    newBalanceSpan.textContent = newBalance.toFixed(2);

    if (newBalance < 0) {
        messageP.textContent = `Warning: Requested days exceed projected balance. You will have a deficit of ${Math.abs(newBalance).toFixed(2)} days.`;
    } else {
        messageP.textContent = '';
    }
});
