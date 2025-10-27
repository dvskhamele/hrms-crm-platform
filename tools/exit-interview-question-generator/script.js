document.getElementById('generate-btn').addEventListener('click', () => {
    const questionsDiv = document.getElementById('questions');

    const questions = {
        title: "Exit Interview Questions",
        categories: [
            {
                title: "Reason for Leaving",
                questions: [
                    "What is your primary reason for leaving the company?",
                    "What factors influenced your decision to seek employment elsewhere?",
                    "Were there any specific events or circumstances that led to your decision?"
                ]
            },
            {
                title: "Job Satisfaction",
                questions: [
                    "What did you like most about your job?",
                    "What did you like least about your job?",
                    "Were your job responsibilities clear and well-defined?",
                    "Did you feel adequately challenged and utilized in your role?"
                ]
            },
            {
                title: "Company Culture and Management",
                questions: [
                    "How would you describe the company culture?",
                    "Did you feel supported by your manager and colleagues?",
                    "Did you receive adequate feedback and recognition for your work?",
                    "What suggestions do you have for improving the company culture or management?"
                ]
            },
            {
                title: "Overall Experience and Suggestions",
                questions: [
                    "What advice would you give to your successor?",
                    "Would you recommend this company to others as a place to work? Why or why not?",
                    "What could the company have done to retain you?",
                    "Do you have any other comments or suggestions that would help us improve?"
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
