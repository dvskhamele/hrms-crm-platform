document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const generatedQuestions = document.getElementById('generated-questions');

    generateBtn.addEventListener('click', () => {
        const jobRole = document.getElementById('job-role').value.trim();
        const keySkills = document.getElementById('key-skills').value.trim().split(',').map(s => s.trim()).filter(s => s);
        const experienceLevel = document.getElementById('experience-level').value;
        const desiredTraits = document.getElementById('desired-traits').value.trim().split(',').map(s => s.trim()).filter(s => s);

        if (!jobRole || keySkills.length === 0) {
            alert('Please enter a Job Role and at least one Key Skill.');
            return;
        }

        let questions = [];

        // General questions
        questions.push(`1. Can you describe your experience with ${jobRole} roles?`);
        questions.push(`2. What motivated you to apply for this ${jobRole} position?`);

        // Skill-based questions
        keySkills.forEach(skill => {
            questions.push(`3. How would you rate your proficiency in ${skill} on a scale of 1-5? Can you give an example of when you used it?`);
        });

        // Experience level questions
        if (experienceLevel === 'entry') {
            questions.push(`4. What are your career aspirations for an entry-level ${jobRole} role?`);
        } else if (experienceLevel === 'mid') {
            questions.push(`4. Describe a challenging project you worked on in a ${jobRole} capacity and how you overcame obstacles.`);
        } else if (experienceLevel === 'senior') {
            questions.push(`4. How do you mentor junior team members and contribute to team growth in a senior ${jobRole} role?`);
        }

        // Trait-based questions
        desiredTraits.forEach(trait => {
            questions.push(`5. Can you provide an example of a time when you demonstrated ${trait}?`);
        });

        // Closing question
        questions.push(`6. Do you have any questions for us about the ${jobRole} role or our company?`);

        generatedQuestions.value = questions.join('\n\n');
    });

    copyBtn.addEventListener('click', () => {
        if (generatedQuestions.value) {
            navigator.clipboard.writeText(generatedQuestions.value)
                .then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy to Clipboard';
                    }, 2000);
                })
                .catch(err => {
                    alert('Failed to copy text.');
                });
        }
    });
});
