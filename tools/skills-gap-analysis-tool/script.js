document.getElementById('analyze-btn').addEventListener('click', () => {
    const requiredSkillsInput = document.getElementById('required-skills').value;
    const employeeSkillsInput = document.getElementById('employee-skills').value;
    const resultsDiv = document.getElementById('results');

    if (!requiredSkillsInput || !employeeSkillsInput) {
        resultsDiv.innerHTML = '<p style="color: red;">Please enter both required and employee skills.</p>';
        return;
    }

    const requiredSkills = requiredSkillsInput.split(',').map(skill => skill.trim().toLowerCase());
    const employeeSkills = employeeSkillsInput.split(',').map(skill => skill.trim().toLowerCase());

    const skillsGap = requiredSkills.filter(skill => !employeeSkills.includes(skill));

    if (skillsGap.length === 0) {
        resultsDiv.innerHTML = '<h2>No Skills Gap Identified!</h2><p>Your employee possesses all the required skills.</p>';
    } else {
        resultsDiv.innerHTML = `
            <h2>Skills Gap Identified:</h2>
            <p>The following required skills are missing:</p>
            <ul>
                ${skillsGap.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        `;
    }
});
