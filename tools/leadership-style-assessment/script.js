const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit-btn');
const resultsContainer = document.getElementById('results');

const questions = [
    {
        question: "When making a decision, I am most likely to:",
        answers: {
            a: "Make the decision on my own and announce it to the team.",
            b: "Consult with the team, but make the final decision myself.",
            c: "Delegate the decision to the team.",
            d: "Facilitate a discussion and build consensus around a decision."
        },
        styles: { a: 'autocratic', b: 'democratic', c: 'laissez-faire', d: 'transformational' }
    },
    {
        question: "When a team member is struggling, I am most likely to:",
        answers: {
            a: "Tell them what to do to solve the problem.",
            b: "Brainstorm solutions with them.",
            c: "Let them figure it out on their own.",
            d: "Inspire and motivate them to find their own solution."
        },
        styles: { a: 'autocratic', b: 'democratic', c: 'laissez-faire', d: 'transformational' }
    },
    {
        question: "I believe that my primary role as a leader is to:",
        answers: {
            a: "Provide clear direction and instructions.",
            b: "Facilitate collaboration and teamwork.",
            c: "Provide resources and support, but otherwise stay out of the way.",
            d: "Inspire and empower my team to achieve their full potential."
        },
        styles: { a: 'autocratic', b: 'democratic', c: 'laissez-faire', d: 'transformational' }
    }
];

function buildQuiz() {
    const output = [];
    questions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        for (const letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} : ${currentQuestion.answers[letter]}
                </label>`
            );
        }
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    });
    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    const styles = { autocratic: 0, democratic: 0, 'laissez-faire': 0, transformational: 0 };

    questions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        if (userAnswer) {
            const style = currentQuestion.styles[userAnswer];
            styles[style]++;
        }
    });

    const dominantStyle = Object.keys(styles).reduce((a, b) => styles[a] > styles[b] ? a : b);

    resultsContainer.innerHTML = `<h2>Your Dominant Leadership Style is: ${dominantStyle.charAt(0).toUpperCase() + dominantStyle.slice(1)}</h2>`;
}

buildQuiz();
submitButton.addEventListener('click', showResults);
