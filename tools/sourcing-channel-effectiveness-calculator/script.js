document.getElementById('calculate-btn').addEventListener('click', () => {
    const channelName = document.getElementById('channel-name').value;
    const applications = parseInt(document.getElementById('applications').value) || 0;
    const interviews = parseInt(document.getElementById('interviews').value) || 0;
    const hires = parseInt(document.getElementById('hires').value) || 0;

    if (applications === 0) {
        document.getElementById('results').innerHTML = '<p style="color: red;">Please enter the number of applications.</p>';
        return;
    }

    const applicationToInterviewRate = (interviews / applications) * 100;
    const interviewToHireRate = (hires / interviews) * 100;
    const applicationToHireRate = (hires / applications) * 100;

    document.getElementById('results').innerHTML = `
        <h2>Effectiveness for ${channelName}</h2>
        <p>Application-to-Interview Rate: ${applicationToInterviewRate.toFixed(2)}%</p>
        <p>Interview-to-Hire Rate: ${interviewToHireRate.toFixed(2)}%</p>
        <p>Application-to-Hire Rate: ${applicationToHireRate.toFixed(2)}%</p>
    `;
});
