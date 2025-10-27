const courseFeesInput = document.getElementById('course-fees');
const materialsCostsInput = document.getElementById('materials-costs');
const instructorFeesInput = document.getElementById('instructor-fees');
const travelAccommodationInput = document.getElementById('travel-accommodation');
const lostProductivityInput = document.getElementById('lost-productivity');
const miscellaneousCostsInput = document.getElementById('miscellaneous-costs');
const calculateBtn = document.getElementById('calculate-btn');
const totalBudgetSpan = document.getElementById('total-budget');

calculateBtn.addEventListener('click', () => {
    const courseFees = parseFloat(courseFeesInput.value) || 0;
    const materialsCosts = parseFloat(materialsCostsInput.value) || 0;
    const instructorFees = parseFloat(instructorFeesInput.value) || 0;
    const travelAccommodation = parseFloat(travelAccommodationInput.value) || 0;
    const lostProductivity = parseFloat(lostProductivityInput.value) || 0;
    const miscellaneousCosts = parseFloat(miscellaneousCostsInput.value) || 0;

    const totalBudget = courseFees + materialsCosts + instructorFees + travelAccommodation + lostProductivity + miscellaneousCosts;

    totalBudgetSpan.textContent = `$${totalBudget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
});
