
document.addEventListener('DOMContentLoaded', () => {
    const offersExtendedInput = document.getElementById('offers-extended');
    const offersAcceptedInput = document.getElementById('offers-accepted');
    const calculateBtn = document.getElementById('calculate-btn');
    const acceptanceRateEl = document.getElementById('acceptance-rate');

    calculateBtn.addEventListener('click', () => {
        const offersExtended = parseFloat(offersExtendedInput.value);
        const offersAccepted = parseFloat(offersAcceptedInput.value);

        if (isNaN(offersExtended) || isNaN(offersAccepted) || offersExtended <= 0) {
            acceptanceRateEl.textContent = 'Invalid Input';
            return;
        }

        if (offersAccepted > offersExtended) {
            acceptanceRateEl.textContent = 'Accepted cannot be greater than extended';
            return;
        }

        const acceptanceRate = (offersAccepted / offersExtended) * 100;
        acceptanceRateEl.textContent = `${acceptanceRate.toFixed(2)}%`;
    });
});
