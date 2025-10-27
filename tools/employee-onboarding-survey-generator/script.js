document.getElementById('generate-btn').addEventListener('click', () => {
    const questionsDiv = document.getElementById('questions');

    const questions = {
        title: "Employee Onboarding Survey Questions",
        categories: [
            {
                title: "Pre-Boarding Experience",
                questions: [
                    "How satisfied were you with the information provided before your start date?",
                    "Was the new hire paperwork process clear and efficient?",
                    "Did you receive all necessary equipment and access before your first day?"
                ]
            },
            {
                title: "First Day/Week Experience",
                questions: [
                    "Did you feel welcomed on your first day?",
                    "Was your workspace set up and ready for you?",
                    "Did you receive a clear overview of your role and responsibilities?",
                    "How helpful was your manager/onboarding buddy during your first week?"
                ]
            },
            {
                title: "Training & Resources",
                questions: [
                    "Did you receive adequate training to perform your job effectively?",
                    "Were the company's tools and systems easy to learn and use?",
                    "Do you feel you have access to the resources you need to succeed?"
                ]
            },
            {
                title: "Integration & Culture",
                questions: [
                    "Do you feel like a valued member of your team?",
                    "How well do you understand the company's culture and values?",
                    "Do you feel comfortable asking questions and seeking help?"
                ]
            },
            {
                title: "Overall Onboarding Experience",
                questions: [
                    "How would you rate your overall onboarding experience?",
                    "What was the most positive aspect of your onboarding?",
                    "What is one thing we could improve about our onboarding process?"
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