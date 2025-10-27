document.getElementById('generate-btn').addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const jobTitle = document.getElementById('job-title').value;
    const startDate = document.getElementById('start-date').value;
    const onboardingPlanDiv = document.getElementById('onboarding-plan');

    if (!employeeName || !jobTitle || !startDate) {
        onboardingPlanDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    const planContent = `
        <h1>Employee Onboarding Plan for ${employeeName} (${jobTitle})</h1>
        <p><strong>Start Date:</strong> ${startDate}</p>
        <p>This onboarding plan is designed to ensure a smooth and successful transition for our new ${jobTitle}, ${employeeName}.</p>
        
        <div class="plan-section">
            <h3>Week 1: Welcome & Foundation</h3>
            <ul>
                <li><strong>Day 1:</strong> Welcome & Orientation (HR paperwork, company overview, IT setup).</li>
                <li><strong>Day 2-3:</strong> Team Introductions & Role Overview (Meet team, understand department structure, review job description).</li>
                <li><strong>Day 4-5:</strong> Initial Training & Tool Access (Access to necessary software, basic system training).</li>
                <li><strong>End of Week 1:</strong> Check-in with Manager (Discuss first impressions, answer questions).</li>
            </ul>
        </div>
        
        <div class="plan-section">
            <h3>Month 1: Learning & Integration</h3>
            <ul>
                <li><strong>Weeks 2-4:</strong> Deeper Dive into Role (Shadow colleagues, begin small tasks, understand workflows).</li>
                <li><strong>Ongoing:</strong> Scheduled 1:1s with Manager (Regular feedback, goal setting discussion).</li>
                <li><strong>Training:</strong> Complete mandatory compliance training and role-specific modules.</li>
                <li><strong>Social:</strong> Participate in team lunches or social events.</li>
                <li><strong>End of Month 1:</strong> Formal Review with Manager (Discuss progress, adjust goals).</li>
            </ul>
        </div>
        
        <div class="plan-section">
            <h3>Month 2-3: Contribution & Development</h3>
            <ul>
                <li><strong>Weeks 5-12:</strong> Take Ownership (Lead small projects, contribute to team initiatives).</li>
                <li><strong>Feedback:</strong> Seek and provide feedback regularly.</li>
                <li><strong>Development:</strong> Identify long-term development goals and resources.</li>
                <li><strong>Networking:</strong> Connect with cross-functional teams.</li>
                <li><strong>End of Month 3:</strong> Performance Review & Future Planning (Comprehensive review, career path discussion).</li>
            </ul>
        </div>
        
        <p>This plan is a living document and will be adapted to best support ${employeeName}'s growth and success at [Company Name].</p>
    `;

    onboardingPlanDiv.innerHTML = planContent;
});
