const yearsOfServiceInput = document.getElementById('years-of-service');
const annualLeaveDaysInput = document.getElementById('annual-leave-days');
const calculateBtn = document.getElementById('calculate-btn');
const totalEntitlementSpan = document.getElementById('total-entitlement');

calculateBtn.addEventListener('click', () => {
    const yearsOfService = parseInt(yearsOfServiceInput.value) || 0;
    const annualLeaveDays = parseInt(annualLeaveDaysInput.value) || 0;
    let totalEntitlement = annualLeaveDays;

    // Example: Add 1 extra day for every 5 years of service after the first 5 years
    if (yearsOfService > 5) {
        totalEntitlement += Math.floor((yearsOfService - 5) / 5);
    }

    totalEntitlementSpan.textContent = totalEntitlement;
});
