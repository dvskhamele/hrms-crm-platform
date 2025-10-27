document.getElementById('calculate-btn').addEventListener('click', () => {
    const startTimeInput = document.getElementById('start-time').value;
    const endTimeInput = document.getElementById('end-time').value;
    const breakDuration = parseFloat(document.getElementById('break-duration').value) || 0;
    const hourlyRate = parseFloat(document.getElementById('hourly-rate').value) || 0;
    const overtimeMultiplier = parseFloat(document.getElementById('overtime-multiplier').value) || 1.5;
    const resultsDiv = document.getElementById('results');

    if (!startTimeInput || !endTimeInput || hourlyRate === 0) {
        resultsDiv.innerHTML = '<p style="color: red;">Please enter start time, end time, and hourly rate.</p>';
        return;
    }

    const parseTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    const startTime = parseTime(startTimeInput);
    let endTime = parseTime(endTimeInput);

    // Handle overnight shifts
    if (endTime < startTime) {
        endTime.setDate(endTime.getDate() + 1);
    }

    let totalMilliseconds = endTime - startTime;
    let totalHours = totalMilliseconds / (1000 * 60 * 60);

    // Subtract break duration
    totalHours -= (breakDuration / 60);

    const regularHours = Math.min(totalHours, 8); // Assuming 8 hours is regular workday
    const overtimeHours = Math.max(0, totalHours - 8);

    const regularPay = regularHours * hourlyRate;
    const overtimePay = overtimeHours * hourlyRate * overtimeMultiplier;
    const totalPay = regularPay + overtimePay;

    resultsDiv.innerHTML = `
        <h2>Timesheet Calculation:</h2>
        <p><strong>Total Hours Worked:</strong> ${totalHours.toFixed(2)}</p>
        <p><strong>Regular Hours:</strong> ${regularHours.toFixed(2)}</p>
        <p><strong>Overtime Hours:</strong> ${overtimeHours.toFixed(2)}</p>
        <p><strong>Regular Pay:</strong> $${regularPay.toFixed(2)}</p>
        <p><strong>Overtime Pay:</strong> $${overtimePay.toFixed(2)}</p>
        <p><strong>Total Pay:</strong> $${totalPay.toFixed(2)}</p>
    `;
});
