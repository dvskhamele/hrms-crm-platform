document.addEventListener('DOMContentLoaded', () => {
    const feedbackCategorySelect = document.getElementById('feedback-category');
    const generateBtn = document.getElementById('generate-btn');
    const questionsList = document.getElementById('questions-list');

    const feedbackQuestions = {
        leadership: [
            "How effectively does this person inspire and motivate others?",
            "Describe a situation where this person demonstrated strong leadership.",
            "What could this person do to improve their leadership skills?",
            "How well does this person delegate tasks and empower their team?",
            "Does this person provide clear direction and vision?"
        ],
        communication: [
            "How effectively does this person communicate ideas and information?",
            "Describe a time when this person's communication style was particularly effective or ineffective.",
            "How well does this person listen to others' perspectives?",
            "Does this person provide clear and constructive feedback?",
            "How effectively does this person communicate with diverse audiences?"
        ],
        teamwork: [
            "How well does this person collaborate with team members?",
            "Describe a situation where this person contributed positively to team dynamics.",
            "What could this person do to improve their teamwork and collaboration skills?",
            "How effectively does this person resolve conflicts within a team?",
            "Does this person support and encourage their colleagues?"
        ],
        problem_solving: [
            "How effectively does this person approach and solve complex problems?",
            "Describe a situation where this person demonstrated strong problem-solving skills.",
            "What could this person do to improve their problem-solving and decision-making abilities?",
            "How well does this person analyze information before making decisions?",
            "Does this person take initiative to address challenges?"
        ],
        adaptability: [
            "How well does this person adapt to change and new situations?",
            "Describe a time when this person demonstrated flexibility in their work.",
            "What could this person do to improve their adaptability and innovation?",
            "Does this person embrace new ideas and technologies?",
            "How effectively does this person handle ambiguity and uncertainty?"
        ],
        interpersonal: [
            "How well does this person build and maintain relationships with colleagues?",
            "Describe a situation where this person's interpersonal skills were particularly effective.",
            "What could this person do to improve their interpersonal skills?",
            "How effectively does this person handle difficult conversations?",
            "Does this person show empathy and understanding towards others?"
        ]
    };

    generateBtn.addEventListener('click', () => {
        const selectedCategory = feedbackCategorySelect.value;
        const questions = feedbackQuestions[selectedCategory];

        questionsList.innerHTML = ''; // Clear previous questions

        if (questions && questions.length > 0) {
            questions.forEach(question => {
                const listItem = document.createElement('li');
                listItem.textContent = question;
                questionsList.appendChild(listItem);
            });
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = "No questions available for this category yet. Please select another or check back later!";
            questionsList.appendChild(listItem);
        }
    });
});