document.getElementById('generate-btn').addEventListener('click', () => {
    const questionsDiv = document.getElementById('questions');

    const questions = {
        title: "Candidate Experience Survey Questions",
        categories: [
            {
                title: "Application Process",
                questions: [
                    "How easy was it to find and apply for jobs on our career site?",
                    "Was the job description clear and accurate?",
                    "How would you rate the length and complexity of our application form?"
                ]
            },
            {
                title: "Interview Process",
                questions: [
                    "Were you given enough information to prepare for your interviews?",
                    "How would you describe your interactions with our interviewers?",
                    "Did you feel that the interview process was fair and unbiased?"
                ]
            },
            {
                title: "Communication",
                questions: [
                    "How satisfied were you with the communication you received throughout the hiring process?",
                    "Did you receive timely updates on your application status?",
                    "Did you feel comfortable asking questions and receiving clear answers?"
                ]
            },
            {
                title: "Overall Experience",
                questions: [
                    "How likely are you to recommend our company as an employer to a friend or colleague?",
                    "What was the most positive aspect of your candidate experience?",
                    "What is one thing we could improve about our hiring process?"
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
