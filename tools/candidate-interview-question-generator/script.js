document.addEventListener('DOMContentLoaded', () => {
    logAnalytic('ToolOpened');

    const form = document.getElementById('iq-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        logAnalytic('ToolSubmitted');

        const jobTitle = document.getElementById('job-title').value;
        const skills = document.getElementById('skills').value.split(',').map(item => item.trim());
        const experienceLevel = document.getElementById('experience-level').value;

        let generatedQuestions = [];

        // Basic questions based on experience level
        if (experienceLevel === 'junior') {
            generatedQuestions.push("Tell me about a time you learned a new skill. How did you approach it?");
            generatedQuestions.push("What interests you about this role and our company?");
            generatedQuestions.push("Describe a challenging problem you faced and how you overcame it.");
        } else if (experienceLevel === 'mid') {
            generatedQuestions.push("Describe a project you led from start to finish. What were the key challenges and how did you address them?");
            generatedQuestions.push("How do you prioritize tasks when you have multiple deadlines?");
            generatedQuestions.push("Tell me about a time you had to influence stakeholders without direct authority.");
        } else if (experienceLevel === 'senior') {
            generatedQuestions.push("Describe your leadership style and how you mentor junior team members.");
            generatedQuestions.push("How do you stay updated with industry trends and incorporate new technologies or methodologies into your work?");
            generatedQuestions.push("Tell me about a strategic decision you made that had a significant impact on your previous company.");
        }

        // Questions based on skills
        skills.forEach(skill => {
            if (skill) {
                generatedQuestions.push(`Can you describe your experience with ${skill}?`);
                generatedQuestions.push(`How have you applied ${skill} in a previous role?`);
            }
        });

        localStorage.setItem('generatedInterviewQuestions', JSON.stringify(generatedQuestions));
        localStorage.setItem('jobTitleForQuestions', jobTitle);

        const resultId = Date.now().toString();
        const resultUrl = `/tools/results/candidate-interview-question-generator-result.html?id=${resultId}`;

        window.location.href = resultUrl;
    });
});

function logAnalytic(eventName) {
    console.log(`Analytics Event: ${eventName}`);
}
