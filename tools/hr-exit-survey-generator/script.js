document.getElementById('generate-btn').addEventListener('click', () => {
    const questionsDiv = document.getElementById('questions');

    const questions = {
        title: "HR Exit Survey Questions",
        categories: [
            {
                title: "Reason for Leaving",
                questions: [
                    "What was your primary reason for leaving [Company Name]?",
                    "What factors influenced your decision to seek employment elsewhere?",
                    "Were there any specific events or circumstances that led to your decision to leave?"
                ]
            },
            {
                title: "Job Role & Responsibilities",
                questions: [
                    "What did you like most about your job role and responsibilities?",
                    "What did you like least about your job role and responsibilities?",
                    "Did you feel adequately challenged and utilized in your role?"
                ]
            },
            {
                title: "Management & Leadership",
                questions: [
                    "How would you describe your relationship with your direct manager?",
                    "Did you receive sufficient feedback and support from your manager?",
                    "How would you rate the overall leadership of [Company Name]?"
                ]
            },
            {
                title: "Company Culture & Environment",
                questions: [
                    "How would you describe the company culture at [Company Name]?",
                    "Did you feel a sense of belonging and inclusion within the company?",
                    "What aspects of the work environment could be improved?"
                ]
            },
            {
                title: "Compensation & Benefits",
                questions: [
                    "How satisfied were you with your compensation and benefits package?",
                    "Did you feel your compensation was competitive with similar roles in the industry?",
                    "Did you understand the value of your total compensation package?"
                ]
            },
            {
                title: "Overall Experience & Suggestions",
                questions: [
                    "What advice would you give to [Company Name] to improve the employee experience?",
                    "Would you recommend [Company Name] as an employer to others? Why or why not?",
                    "Is there anything else you would like to share about your experience at [Company Name]?"
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
