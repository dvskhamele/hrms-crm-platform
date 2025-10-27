document.getElementById('generate-btn').addEventListener('click', () => {
    const roleType = document.getElementById('role-type').value;
    const seniorityLevel = document.getElementById('seniority-level').value;
    const location = document.getElementById('location').value;
    const strategyDiv = document.getElementById('strategy');

    if (!roleType || !seniorityLevel || !location) {
        strategyDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    let sourcingChannels = [];

    // General channels
    sourcingChannels.push(
        "LinkedIn Recruiter",
        "Indeed",
        "Company Career Page",
        "Employee Referrals"
    );

    // Seniority-specific channels
    if (seniorityLevel === 'executive') {
        sourcingChannels.push("Executive Search Firms", "Networking Events");
    } else if (seniorityLevel === 'senior') {
        sourcingChannels.push("Specialized Job Boards", "Professional Associations");
    } else if (seniorityLevel === 'entry') {
        sourcingChannels.push("University Career Fairs", "Internship Programs");
    }

    // Location-specific considerations (simplified example)
    if (location.toLowerCase() !== 'remote') {
        sourcingChannels.push("Local Job Fairs", "Community Outreach Programs");
    }

    let html = `<h2>Sourcing Strategy for ${seniorityLevel.charAt(0).toUpperCase() + seniorityLevel.slice(1)} ${roleType} in ${location}</h2>`;
    html += '<h3>Recommended Sourcing Channels:</h3>';
    html += '<ul>';
    sourcingChannels.forEach(channel => {
        html += `<li>${channel}</li>`;
    });
    html += '</ul>';

    strategyDiv.innerHTML = html;
});
