const baseSalaryInput = document.getElementById('base-salary');
const performanceRatingInput = document.getElementById('performance-rating');
const companyProfitFactorInput = document.getElementById('company-profit-factor');
const calculateBtn = document.getElementById('calculate-btn');
const estimatedBonusSpan = document.getElementById('estimated-bonus');

calculateBtn.addEventListener('click', () => {
    const baseSalary = parseFloat(baseSalaryInput.value) || 0;
    const performanceRating = parseFloat(performanceRatingInput.value) || 0;
    const companyProfitFactor = parseFloat(companyProfitFactorInput.value) || 0;

    // Simple bonus calculation logic (can be customized)
    // Example: (Base Salary * Performance Factor) * (Company Profit Factor / 100)
    let performanceFactor = 0;
    if (performanceRating === 1) performanceFactor = 0.02; // 2% of salary
    else if (performanceRating === 2) performanceFactor = 0.05; // 5% of salary
    else if (performanceRating === 3) performanceFactor = 0.10; // 10% of salary
    else if (performanceRating === 4) performanceFactor = 0.15; // 15% of salary
    else if (performanceRating === 5) performanceFactor = 0.20; // 20% of salary

    const estimatedBonus = (baseSalary * performanceFactor) * (companyProfitFactor / 100);

    estimatedBonusSpan.textContent = `$${estimatedBonus.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
});
