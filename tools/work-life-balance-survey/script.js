const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit-btn');
const resultsContainer = document.getElementById('results');

const questions = [
    {
        question: "How often do you work beyond your scheduled hours?",
        answers: {
            a: "Never",
            b: "Rarely",
            c: "Sometimes",
            d: "Often",
            e: "Always"
        },
        scores: { a: 0, b: 1, c: 2, d: 3, e: 4 }
    },
    {
        question: "How often do you feel that you have to sacrifice personal time for work?",
        answers: {
            a: "Never",
            b: "Rarely",
            c: "Sometimes",
            d: "Often",
            e: "Always"
        },
        scores: { a: 0, b: 1, c: 2, d: 3, e: 4 }
    },
    {
        question: "How satisfied are you with the amount of time you have for non-work activities?",
        answers: {
            a: "Very Satisfied",
            b: "Satisfied",
            c: "Neutral",
            d: "Dissatisfied",
            e: "Very Dissatisfied"
        },
        scores: { a: 0, b: 1, c: 2, d: 3, e: 4 }
    },
    {
        question: "How often do you feel stressed or overwhelmed by your work?",
        answers: {
            a: "Never",
            b: "Rarely",
            c: "Sometimes",
            d: "Often",
            e: "Always"
        },
        scores: { a: 0, b: 1, c: 2, d: 3, e: 4 }
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
    let totalScore = 0;

    questions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        if (userAnswer) {
            totalScore += currentQuestion.scores[userAnswer];
        }
    });

    let balanceLevel = "";
    if (totalScore <= 4) {
        balanceLevel = "Good";
    } else if (totalScore <= 8) {
        balanceLevel = "Fair";
    } else {
        balanceLevel = "Poor";
    }

    resultsContainer.innerHTML = `<h2>Your Work-Life Balance Score is: ${totalScore}</h2><h3>Balance Level: ${balanceLevel}</h3>`;
}

buildQuiz();
submitButton.addEventListener('click', showResults);
