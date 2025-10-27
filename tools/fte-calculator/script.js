const fullTimeEmployeesInput = document.getElementById('full-time-employees');
const partTimeEmployeesInput = document.getElementById('part-time-employees');
const averagePartTimeHoursInput = document.getElementById('average-part-time-hours');
const calculateBtn = document.getElementById('calculate-btn');
const totalFteSpan = document.getElementById('total-fte');

const STANDARD_FULL_TIME_HOURS_WEEK = 40;

calculateBtn.addEventListener('click', () => {
    const fullTimeEmployees = parseFloat(fullTimeEmployeesInput.value) || 0;
    const partTimeEmployees = parseFloat(partTimeEmployeesInput.value) || 0;
    const averagePartTimeHours = parseFloat(averagePartTimeHoursInput.value) || 0;

    const fteFromPartTime = (partTimeEmployees * averagePartTimeHours) / STANDARD_FULL_TIME_HOURS_WEEK;
    const totalFTE = fullTimeEmployees + fteFromPartTime;

    totalFteSpan.textContent = totalFTE.toFixed(2);
});
