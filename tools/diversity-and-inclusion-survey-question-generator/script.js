document.getElementById('generate-btn').addEventListener('click', () => {
    const questionsDiv = document.getElementById('questions');

    const questions = {
        title: "Diversity and Inclusion Survey Questions",
        categories: [
            {
                title: "Inclusion & Belonging",
                questions: [
                    "I feel a sense of belonging at this company.",
                    "I feel comfortable being my authentic self at work.",
                    "My opinions are valued and respected by my colleagues and managers.",
                    "I feel that I am a part of a supportive and inclusive team."
                ]
            },
            {
                title: "Fairness & Equity",
                questions: [
                    "I believe that everyone has an equal opportunity for advancement at this company.",
                    "I believe that the performance evaluation process is fair and unbiased.",
                    "I am confident that the company is committed to fair pay and compensation practices.",
                    "I believe that the company takes appropriate action to address discrimination and harassment."
                ]
            },
            {
                title: "Diversity & Representation",
                questions: [
                    "I see a diverse representation of people at all levels of the organization.",
                    "I believe that the company is committed to recruiting and retaining a diverse workforce.",
                    "I am satisfied with the company's efforts to promote diversity and inclusion.",
                    "I believe that the company values the unique perspectives and experiences of all employees."
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
