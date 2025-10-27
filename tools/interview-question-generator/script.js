document.getElementById('generate-btn').addEventListener('click', () => {
    const jobRole = document.getElementById('job-role').value;
    const keySkillsInput = document.getElementById('key-skills').value;
    const questionsDiv = document.getElementById('questions');

    if (!jobRole || !keySkillsInput) {
        questionsDiv.innerHTML = '<p style="color: red;">Please enter job role and key skills.</p>';
        return;
    }

    const keySkills = keySkillsInput.split(',').map(skill => skill.trim());

    let generatedQuestions = [
        `Tell me about your experience as a ${jobRole}.`,
        `What motivated you to apply for this ${jobRole} position?`,
        `Where do you see yourself in this ${jobRole} role in the next 3-5 years?`,
        `Describe a challenging situation you faced in a previous ${jobRole} role and how you overcame it.`
    ];

    keySkills.forEach(skill => {
        generatedQuestions.push(`Can you give me an example of how you've demonstrated your ${skill} skills in a previous role?`);
    });

    let html = `<h2>Interview Questions for ${jobRole}</h2>`;
    html += '<ul>';
    generatedQuestions.forEach(question => {
        html += `<li>${question}</li>`;
    });
    html += '</ul>';

    questionsDiv.innerHTML = html;
});