const numEmployeesInput = document.getElementById('num-employees');
const shiftsPerDayInput = document.getElementById('shifts-per-day');
const daysPerWeekInput = document.getElementById('days-per-week');
const generateBtn = document.getElementById('generate-btn');
const generatedSchedulePre = document.getElementById('generated-schedule');

generateBtn.addEventListener('click', () => {
    const numEmployees = parseInt(numEmployeesInput.value) || 0;
    const shiftsPerDay = parseInt(shiftsPerDayInput.value) || 0;
    const daysPerWeek = parseInt(daysPerWeekInput.value) || 0;

    if (numEmployees <= 0 || shiftsPerDay <= 0 || daysPerWeek <= 0) {
        generatedSchedulePre.textContent = "Please enter valid positive numbers for all fields.";
        return;
    }

    let schedule = `**Weekly Shift Schedule**\n\n`;

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const shiftTimes = [];
    for (let i = 0; i < shiftsPerDay; i++) {
        shiftTimes.push(`Shift ${i + 1} ([Start Time] - [End Time])`);
    }

    for (let d = 0; d < daysPerWeek; d++) {
        schedule += `**${days[d]}**\n`;
        for (let s = 0; s < shiftsPerDay; s++) {
            schedule += `  ${shiftTimes[s]}: `;
            const employeesOnShift = [];
            // Simple rotating assignment
            for (let i = 0; i < Math.ceil(numEmployees / shiftsPerDay); i++) {
                const employeeIndex = (d * shiftsPerDay + s + i) % numEmployees;
                employeesOnShift.push(`Employee ${employeeIndex + 1}`);
            }
            schedule += `${employeesOnShift.join(', ')}\n`;
        }
        schedule += `\n`;
    }

    generatedSchedulePre.textContent = schedule;
});
