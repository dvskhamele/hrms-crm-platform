document.addEventListener('DOMContentLoaded', () => {
    const departmentInput = document.getElementById('department');
    const keySkillsInput = document.getElementById('key-skills');
    const generateBtn = document.getElementById('generate-btn');
    const questionsList = document.getElementById('questions-list');

    const genericQuestions = [
        "What are the most critical skills required for success in this role/department?",
        "What new technologies or methodologies are emerging that require new skills?",
        "What are the current performance gaps or challenges faced by employees in this area?",
        "What training programs have been offered in the past, and how effective were they?",
        "What are the long-term strategic goals of the department, and what skills are needed to achieve them?",
        "What feedback have employees provided regarding their development needs?",
        "Are there any compliance or regulatory changes that necessitate new training?",
        "How do employees currently acquire new skills, and what resources do they use?",
        "What are the career development aspirations of employees in this role/department?",
        "What external benchmarks or industry standards should we consider for skill development?"
    ];

    generateBtn.addEventListener('click', () => {
        const department = departmentInput.value.trim();
        const keySkills = keySkillsInput.value.split(',').map(s => s.trim()).filter(s => s.length > 0);

        questionsList.innerHTML = ''; // Clear previous questions

        let generated = [];

        if (department) {
            generated.push(`Regarding the "${department}" department/role:`);
        }

        if (keySkills.length > 0) {
            generated.push(`To assess proficiency in key skills like ${keySkills.join(', ')}:`);
            keySkills.forEach(skill => {
                generated.push(`- How would you rate the current proficiency level of employees in "${skill}"?`);
                generated.push(`- What specific training or development would enhance skills in "${skill}"?`);
            });
        }

        generated.push("General assessment questions:");
        generated = generated.concat(genericQuestions);

        if (generated.length > 0) {
            generated.forEach(question => {
                const listItem = document.createElement('li');
                listItem.textContent = question;
                questionsList.appendChild(listItem);
            });
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = "Please provide some input to generate assessment questions.";
            questionsList.appendChild(listItem);
        }
    });
});