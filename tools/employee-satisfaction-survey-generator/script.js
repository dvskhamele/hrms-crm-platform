document.getElementById('generate-btn').addEventListener('click', () => {
    const questionsDiv = document.getElementById('questions');

    const questions = {
        title: "Employee Satisfaction Survey Questions",
        categories: [
            {
                title: "Overall Satisfaction",
                questions: [
                    "How satisfied are you with your job overall?",
                    "How likely are you to recommend this company as a great place to work?",
                    "Do you feel valued and appreciated for your contributions?"
                ]
            },
            {
                title: "Work Environment & Culture",
                questions: [
                    "Do you feel that our company culture is positive and inclusive?",
                    "Do you have a healthy work-life balance?",
                    "Do you feel that your workplace is safe and supportive?"
                ]
            },
            {
                title: "Management & Leadership",
                questions: [
                    "Do you feel that your manager provides clear direction and support?",
                    "Do you receive regular and constructive feedback from your manager?",
                    "Do you trust the leadership of this company?"
                ]
            },
            {
                title: "Compensation & Benefits",
                questions: [
                    "Are you satisfied with your current compensation and benefits package?",
                    "Do you feel that your compensation is fair compared to similar roles in the industry?",
                    "Do you understand the value of your total compensation package?"
                ]
            },
            {
                title: "Growth & Development",
                questions: [
                    "Do you have opportunities for career growth and development at this company?",
                    "Does the company invest in your professional development?",
                    "Do you feel that your skills and talents are being utilized to their full potential?"
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
