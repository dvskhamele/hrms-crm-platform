const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit-btn');
const resultsContainer = document.getElementById('results');

const questions = [
    {
        question: "How often do you feel emotionally drained from your work?",
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
        question: "How often do you feel cynical or detached from your work?",
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
        question: "How often do you feel a sense of accomplishment from your work?",
        answers: {
            a: "Always",
            b: "Often",
            c: "Sometimes",
            d: "Rarely",
            e: "Never"
        },
        scores: { a: 0, b: 1, c: 2, d: 3, e: 4 }
    },
    {
        question: "How often do you feel overwhelmed by your workload?",
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

    let riskLevel = "";
    if (totalScore <= 4) {
        riskLevel = "Low Risk";
    } else if (totalScore <= 8) {
        riskLevel = "Moderate Risk";
    } else {
        riskLevel = "High Risk";
    }

    resultsContainer.innerHTML = `<h2>Your Burnout Risk Score is: ${totalScore}</h2><h3>Risk Level: ${riskLevel}</h3>`;
}

buildQuiz();
submitButton.addEventListener('click', showResults);
