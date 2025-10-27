document.getElementById('generate-btn').addEventListener('click', () => {
    const questionsDiv = document.getElementById('questions');

    const questions = {
        title: "Employee Engagement Survey Questions",
        categories: [
            {
                title: "Job Satisfaction & Meaning",
                questions: [
                    "I find my work meaningful and purposeful.",
                    "I am satisfied with my current role and responsibilities.",
                    "My work challenges me and allows me to grow."
                ]
            },
            {
                title: "Management & Leadership",
                questions: [
                    "My manager provides me with the support and resources I need to succeed.",
                    "I receive regular and constructive feedback from my manager.",
                    "I trust the leadership of this company."
                ]
            },
            {
                title: "Team & Collaboration",
                questions: [
                    "I feel a strong sense of camaraderie with my team members.",
                    "My team collaborates effectively to achieve common goals.",
                    "I feel comfortable sharing my ideas and opinions with my team."
                ]
            },
            {
                title: "Growth & Development",
                questions: [
                    "I have opportunities for career growth and development at this company.",
                    "The company invests in my professional development.",
                    "I feel that my skills and talents are being utilized to their full potential."
                ]
            },
            {
                title: "Work-Life Balance & Well-being",
                questions: [
                    "I am able to maintain a healthy work-life balance.",
                    "The company supports my overall well-being.",
                    "I feel that my workload is manageable."
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