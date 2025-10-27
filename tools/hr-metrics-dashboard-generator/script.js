document.getElementById('generate-btn').addEventListener('click', () => {
    const dashboardDiv = document.getElementById('dashboard');

    const metrics = [
        {
            title: "Employee Turnover Rate",
            value: "15%",
            description: "Percentage of employees who left the company over a period."
        },
        {
            title: "Time to Hire",
            value: "30 days",
            description: "Average number of days to fill a job position."
        },
        {
            title: "Cost Per Hire",
            value: "$4,000",
            description: "Average cost incurred to hire a new employee."
        },
        {
            title: "Employee Engagement Score",
            value: "75%",
            description: "Overall score indicating employee satisfaction and motivation."
        },
        {
            title: "Training Completion Rate",
            value: "90%",
            description: "Percentage of employees who completed assigned training programs."
        }
    ];

    let html = '<h2>HR Metrics Dashboard</h2>';
    metrics.forEach(metric => {
        html += `
            <div class="metric-card">
                <h3>${metric.title}</h3>
                <p><strong>Value:</strong> ${metric.value}</p>
                <p>${metric.description}</p>
            </div>
        `;
    });

    dashboardDiv.innerHTML = html;
});
