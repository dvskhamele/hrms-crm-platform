
document.addEventListener('DOMContentLoaded', () => {
    const questions = {
        communication: [
            'How would you rate the transparency of communication from leadership?',
            'I feel comfortable voicing my opinions and ideas.',
            'Information is shared effectively across different teams.',
            'I receive timely and constructive feedback on my work.',
            'Communication channels in our company are effective.'
        ],
        leadership: [
            'Leadership provides a clear vision and direction for the company.',
            'I feel that my manager supports my professional development.',
            'Leaders in the company model our core values.',
            'I trust the decisions made by the leadership team.',
            'My manager provides the support I need to succeed.'
        ],
        collaboration: [
            'I feel a strong sense of teamwork in my department.',
            'It is easy to collaborate with other teams and departments.',
            'We celebrate team successes together.',
            'My colleagues are respectful of diverse perspectives.',
            'I feel like a valued member of my team.'
        ],
        'work-life-balance': [
            'I am able to maintain a healthy balance between my work and personal life.',
            'The company respects my time outside of working hours.',
            'I feel that my workload is manageable.',
            'Flexible work options are available and encouraged.',
            'I am encouraged to take time off to recharge.'
        ],
        recognition: [
            'I feel that my contributions are recognized and valued.',
            'There are clear opportunities for career growth in this company.',
            'The promotion process is fair and transparent.',
            'Recognition is given fairly across the organization.',
            'I am satisfied with the professional development opportunities available to me.'
        ]
    };

    const generateBtn = document.getElementById('generate-btn');
    const surveyOutput = document.getElementById('survey-output');
    const copyBtn = document.getElementById('copy-btn');

    generateBtn.addEventListener('click', () => {
        const numQuestions = parseInt(document.getElementById('num-questions').value);
        const surveyArea = document.getElementById('survey-area').value;

        let selectedQuestions = [];
        let availableQuestions = [];

        if (surveyArea === 'all') {
            availableQuestions = Object.values(questions).flat();
        } else {
            availableQuestions = questions[surveyArea];
        }

        // Shuffle and pick questions
        const shuffled = availableQuestions.sort(() => 0.5 - Math.random());
        selectedQuestions = shuffled.slice(0, numQuestions);

        displaySurvey(selectedQuestions);
        copyBtn.classList.remove('hidden');
    });

    const displaySurvey = (questionsToDisplay) => {
        surveyOutput.innerHTML = '';
        questionsToDisplay.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('survey-question');
            questionElement.innerHTML = `
                <p>${index + 1}. ${q}</p>
                <ul class="rating-scale">
                    <li>Strongly Disagree</li>
                    <li>Disagree</li>
                    <li>Neutral</li>
                    <li>Agree</li>
                    <li>Strongly Agree</li>
                </ul>
            `;
            surveyOutput.appendChild(questionElement);
        });
    };

    copyBtn.addEventListener('click', () => {
        const surveyText = surveyOutput.innerText;
        navigator.clipboard.writeText(surveyText).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy to Clipboard';
            }, 2000);
        });
    });
});
