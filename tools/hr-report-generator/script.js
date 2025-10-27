document.getElementById('generate-btn').addEventListener('click', () => {
    const reportType = document.getElementById('report-type').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const reportOutputDiv = document.getElementById('report-output');

    if (!startDate || !endDate) {
        reportOutputDiv.innerHTML = '<p style="color: red;">Please select both start and end dates.</p>';
        return;
    }

    let reportContent = `<h2>${reportType.replace(/-/g, ' ').toUpperCase()} Report (${startDate} to ${endDate})</h2>`;

    switch (reportType) {
        case 'headcount':
            reportContent += `
                <p><strong>Total Employees:</strong> 150</p>
                <p><strong>New Hires:</strong> 15</p>
                <p><strong>Departures:</strong> 5</p>
                <p><strong>Active Employees:</strong> 160</p>
            `;
            break;
        case 'turnover':
            reportContent += `
                <p><strong>Voluntary Turnover Rate:</strong> 10%</p>
                <p><strong>Involuntary Turnover Rate:</strong> 3%</p>
                <p><strong>Total Turnover Rate:</strong> 13%</p>
            `;
            break;
        case 'diversity':
            reportContent += `
                <p><strong>Gender Distribution:</strong> 55% Female, 45% Male</p>
                <p><strong>Ethnicity Distribution:</strong> 60% White, 20% Asian, 10% Black, 10% Other</p>
                <p><strong>Age Distribution:</strong> 30% Under 30, 50% 30-50, 20% Over 50</p>
            `;
            break;
        default:
            reportContent = '<p style="color: red;">Please select a valid report type.</p>';
    }

    reportOutputDiv.innerHTML = reportContent;
});
