
document.addEventListener('DOMContentLoaded', () => {
    const buildStrategyBtn = document.getElementById('build-strategy');
    const roleNameInput = document.getElementById('role-name');
    const seniorityLevelSelect = document.getElementById('seniority-level');
    const keySkillsInput = document.getElementById('key-skills');
    const locationInput = document.getElementById('location');
    const strategyOutputDiv = document.getElementById('strategy-output');
    const emailCaptureDiv = document.getElementById('email-capture');
    const submitEmailBtn = document.getElementById('submit-email');
    const emailMessage = document.getElementById('email-message');

    const generateStrategy = () => {
        const roleName = roleNameInput.value;
        const seniorityLevel = seniorityLevelSelect.value;
        const keySkills = keySkillsInput.value.split(',').map(s => s.trim()).filter(s => s);
        const location = locationInput.value;

        if (!roleName || !keySkills.length) {
            alert('Please enter a Role Name and at least one Key Skill.');
            return;
        }

        let strategy = `<h2>Sourcing Strategy for ${roleName} (${seniorityLevel}-level)</h2>`;

        strategy += `
            <h3>Target Profile:</h3>
            <ul>
                <li><strong>Role:</strong> ${roleName}</li>
                <li><strong>Seniority:</strong> ${seniorityLevel.charAt(0).toUpperCase() + seniorityLevel.slice(1)}</li>
                <li><strong>Key Skills:</strong> ${keySkills.join(', ')}</li>
                ${location ? `<li><strong>Location:</strong> ${location}</li>` : ''}
            </ul>
        `;

        strategy += `
            <h3>Recommended Sourcing Channels:</h3>
            <ul>
                <li><strong>LinkedIn:</strong> Utilize advanced search, InMail, and network connections.</li>
                <li><strong>Job Boards:</strong> Post on industry-specific and general job boards (e.g., Indeed, Glassdoor, local boards).</li>
                <li><strong>Talent Databases:</strong> Search internal ATS/CRM and external talent pools.</li>
                <li><strong>Referral Programs:</strong> Encourage current employees to refer candidates.</li>
                <li><strong>Professional Communities:</strong> Engage with relevant online forums, groups, and meetups for ${keySkills[0]} professionals.</li>
                <li><strong>Boolean Search:</strong> Develop complex search strings for optimal results on search engines and platforms.</li>
            </ul>
        `;

        strategy += `
            <h3>Candidate Engagement Tactics:</h3>
            <ul>
                <li>Personalized outreach messages highlighting company culture and role benefits.</li>
                <li>Showcase employee testimonials and success stories.</li>
                <li>Transparent communication about the hiring process.</li>
            </ul>
        `;

        strategyOutputDiv.innerHTML = strategy;
        strategyOutputDiv.style.display = 'block';
        emailCaptureDiv.style.display = 'block';

        logAnalytics('sourcing_strategy_generated');
    };

    const handleEmailSubmit = () => {
        const email = document.getElementById('email').value;
        if (email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            const leadData = {
                email: email,
                tool: 'Candidate Sourcing Strategy Builder',
                timestamp: new Date().toISOString()
            };
            saveLead(leadData);
            emailMessage.textContent = 'Thank you! Your detailed strategy has been sent to your email.';
            emailMessage.style.color = 'green';
        } else {
            emailMessage.textContent = 'Please enter a valid email address.';
            emailMessage.style.color = 'red';
        }
    };

    const saveLead = (leadData) => {
        console.log('Lead Captured:', JSON.stringify(leadData));
    };

    const logAnalytics = (eventName) => {
        console.log(`Analytics Event: ${eventName}`);
    };

    buildStrategyBtn.addEventListener('click', generateStrategy);
    submitEmailBtn.addEventListener('click', handleEmailSubmit);
});
