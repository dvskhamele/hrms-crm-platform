document.getElementById('generate-btn').addEventListener('click', () => {
    const questionsDiv = document.getElementById('questions');

    const questions = {
        title: "Training Needs Assessment Questions",
        categories: [
            {
                title: "Current Skills and Knowledge",
                questions: [
                    "What skills do you currently possess that are relevant to your job?",
                    "What knowledge do you currently have that is relevant to your job?",
                    "Are there any areas where you feel your current skills or knowledge are lacking?"
                ]
            },
            {
                title: "Job Responsibilities and Performance",
                questions: [
                    "What are your primary job responsibilities?",
                    "What tasks do you find most challenging in your role?",
                    "Are there any areas where you feel additional training would improve your performance?"
                ]
            },
            {
                title: "Future Goals and Development",
                questions: [
                    "What are your career goals for the next 1-3 years?",
                    "What skills or knowledge do you believe will be essential for your future success?",
                    "What training opportunities would you be interested in pursuing?"
                ]
            },
            {
                title: "Training Preferences",
                questions: [
                    "What learning methods do you prefer (e.g., online courses, workshops, on-the-job training)?",
                    "How much time can you realistically dedicate to training each week/month?",
                    "Are there any specific topics or software you would like to receive training on?"
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
