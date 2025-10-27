document.getElementById('generate-btn').addEventListener('click', () => {
    const questionsDiv = document.getElementById('questions');

    const questions = {
        title: "Stay Interview Questions",
        categories: [
            {
                title: "Job Satisfaction",
                questions: [
                    "What do you look forward to when you come to work each day?",
                    "What do you like most about your job?",
                    "What do you like least about your job?",
                    "What would make your job more satisfying?"
                ]
            },
            {
                title: "Career Development",
                questions: [
                    "What are your long-term career goals?",
                    "What skills would you like to develop?",
                    "What opportunities for growth and development would you like to have?",
                    "How can the company help you to achieve your career goals?"
                ]
            },
            {
                title: "Manager Relationship",
                questions: [
                    "How would you describe your relationship with your manager?",
                    "What could your manager do to better support you?",
                    "How often do you receive feedback from your manager?",
                    "What is one thing you would like to change about your relationship with your manager?"
                ]
            },
            {
                title: "Company Culture",
                questions: [
                    "What do you like most about the company culture?",
                    "What do you like least about the company culture?",
                    "What is one thing you would change about the company culture?",
                    "Do you feel a sense of belonging at the company?"
                ]
            }
        ]
    };

    let html = `<h2>${questions.title}</h2>`;
    questions.categories.forEach(category => {
        html += `<h3>${category.title}</h3>`;
        html += '<ul>';
        category.questions.forEach(question => {
            html += `<li>${question}</li>`;
        });
        html += '</ul>';
    });

    questionsDiv.innerHTML = html;
});
