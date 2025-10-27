document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const generatedQuestions = document.getElementById('generated-questions');

    const questionBank = {
        // Likert Scale Questions
        likert: {
            leadership: [
                "My direct manager provides clear direction and guidance.",
                "I feel supported by my leadership team.",
                "Leadership effectively communicates the company's vision and goals."
            ],
            workLifeBalance: [
                "I am able to maintain a healthy work-life balance in my role.",
                "My workload is manageable and does not regularly lead to burnout.",
                "The company supports efforts to balance work and personal life."
            ],
            compensation: [
                "I believe my compensation is fair for my role and responsibilities.",
                "I understand how my pay is determined.",
                "The benefits package offered by the company meets my needs."
            ],
            careerDevelopment: [
                "I have opportunities for professional growth and development at this company.",
                "My manager helps me identify and pursue my career goals.",
                "I feel there is a clear career path for me within the organization."
            ],
            culture: [
                "I feel a strong sense of belonging at this company.",
                "The company's culture promotes diversity, equity, and inclusion.",
                "I feel comfortable expressing my opinions and ideas freely."
            ]
        },
        // Open-Ended Questions
        openEnded: {
            leadership: [
                "What could leadership do differently to better support you?",
                "How effectively do you think the company's vision and goals are communicated?",
            ],
            workLifeBalance: [
                "What challenges do you face in maintaining work-life balance, and what support would be helpful?",
                "What initiatives could the company implement to improve employee well-being?",
            ],
            compensation: [
                "What aspects of our compensation or benefits package do you value most, and what areas could be improved?",
                "Do you feel our compensation structure is transparent? Please explain.",
            ],
            careerDevelopment: [
                "What learning and development opportunities would you find most beneficial for your career growth?",
                "How do you envision your career progressing within the company?",
            ],
            culture: [
                "What do you appreciate most about our company culture?",
                "What steps could the company take to further enhance inclusion and belonging?",
            ]
        },
        // Yes/No Questions (often followed by open-ended for explanation)
        yesNo: {
            leadership: [
                "Do you trust your direct manager?",
                "Do you believe leadership makes fair decisions?",
            ],
            workLifeBalance: [
                "Do you generally feel you have enough time off to recharge?",
                "Do you feel your workload is sustainable?",
            ],
            compensation: [
                "Are you satisfied with your current salary?",
                "Are you aware of all the benefits available to you?",
            ],
            careerDevelopment: [
                "Do you feel your manager actively supports your career development?",
                "Have you had a career development conversation with your manager in the last 6 months?",
            ],
            culture: [
                "Would you recommend this company as a great place to work to a friend?",
                "Do you feel respected by your colleagues?",
            ]
        }
    };

    generateBtn.addEventListener('click', () => {
        const selectedFocusAreas = Array.from(document.querySelectorAll('.focus-area:checked')).map(cb => cb.value);
        const selectedQuestionTypes = Array.from(document.querySelectorAll('.question-type:checked')).map(cb => cb.value);

        if (selectedFocusAreas.length === 0 || selectedQuestionTypes.length === 0) {
            alert('Please select at least one Focus Area and one Question Type.');
            return;
        }

        let generated = [];
        selectedFocusAreas.forEach(area => {
            selectedQuestionTypes.forEach(type => {
                const questions = questionBank[type][area];
                if (questions) {
                    questions.forEach(q => generated.push(q));
                }
            });
        });

        if (generated.length === 0) {
            generatedQuestions.value = 'No questions generated for the selected criteria. Please choose different options.';
        } else {
            generatedQuestions.value = generated.join('\n\n');
        }
    });

    copyBtn.addEventListener('click', () => {
        if (generatedQuestions.value) {
            navigator.clipboard.writeText(generatedQuestions.value)
                .then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy to Clipboard';
                    }, 2000);
                })
                .catch(err => {
                    alert('Failed to copy text.');
                });
        }
    });
});
