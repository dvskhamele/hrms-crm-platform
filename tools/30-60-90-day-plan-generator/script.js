document.getElementById('generate-btn').addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const role = document.getElementById('role').value;
    const managerName = document.getElementById('manager-name').value;
    const planDiv = document.getElementById('plan');

    if (!employeeName || !role || !managerName) {
        planDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    const planContent = `
        <h1>30-60-90 Day Plan for ${employeeName} (${role})</h1>
        <p><strong>Manager:</strong> ${managerName}</p>
        <p><strong>Date Generated:</strong> ${new Date().toLocaleDateString()}</p>
        
        <div class="plan-section">
            <h2>Days 1-30: Learn & Listen</h2>
            <ul>
                <li>Understand company culture, mission, and values.</li>
                <li>Meet key team members and stakeholders.</li>
                <li>Familiarize with current projects, tools, and processes.</li>
                <li>Complete essential onboarding training.</li>
                <li>Shadow colleagues to observe daily operations.</li>
                <li>Identify initial challenges and opportunities in the role.</li>
            </ul>
        </div>
        
        <div class="plan-section">
            <h2>Days 31-60: Contribute & Collaborate</h2>
            <ul>
                <li>Take ownership of initial tasks and small projects.</li>
                <li>Actively participate in team meetings and discussions.</li>
                <li>Provide initial insights and suggestions based on observations.</li>
                <li>Seek feedback from manager and peers.</li>
                <li>Begin building relationships across departments.</li>
                <li>Deepen understanding of specific role responsibilities and expectations.</li>
            </ul>
        </div>
        
        <div class="plan-section">
            <h2>Days 61-90: Lead & Optimize</h2>
            <ul>
                <li>Independently manage core responsibilities and projects.</li>
                <li>Propose and implement improvements to processes or workflows.</li>
                <li>Mentor new team members or share knowledge.</li>
                <li>Contribute to strategic discussions and long-term planning.</li>
                <li>Demonstrate full proficiency and autonomy in the role.</li>
                <li>Set future goals and development objectives with manager.</li>
            </ul>
        </div>
        
        <p>This plan serves as a guide and will be reviewed and adjusted as needed to support ${employeeName}'s successful integration and growth within the company.</p>
    `;

    planDiv.innerHTML = planContent;
});