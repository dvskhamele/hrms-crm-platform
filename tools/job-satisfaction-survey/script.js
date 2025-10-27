const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit-btn');
const resultsContainer = document.getElementById('results');

const questions = [
    {
        question: "How satisfied are you with your current role?",
        answers: {
            a: "Very Dissatisfied",
            b: "Dissatisfied",
            c: "Neutral",
            d: "Satisfied",
            e: "Very Satisfied"
        },
        scores: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
        question: "How satisfied are you with your opportunities for growth and development?",
        answers: {
            a: "Very Dissatisfied",
            b: "Dissatisfied",
            c: "Neutral",
            d: "Satisfied",
            e: "Very Satisfied"
        },
        scores: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
        question: "How satisfied are you with your relationship with your manager?",
        answers: {
            a: "Very Dissatisfied",
            b: "Dissatisfied",
            c: "Neutral",
            d: "Satisfied",
            e: "Very Satisfied"
        },
        scores: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
        question: "How satisfied are you with the company culture?",
        answers: {
            a: "Very Dissatisfied",
            b: "Dissatisfied",
            c: "Neutral",
            d: "Satisfied",
            e: "Very Satisfied"
        },
        scores: { a: 1, b: 2, c: 3, d: 4, e: 5 }
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
    let numQuestions = questions.length;

    questions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        if (userAnswer) {
            totalScore += currentQuestion.scores[userAnswer];
        }
    });

    const averageScore = totalScore / numQuestions;
    let satisfactionLevel = "";
    if (averageScore < 2.5) {
        satisfactionLevel = "Low";
    } else if (averageScore < 4) {
        satisfactionLevel = "Moderate";
    } else {
        satisfactionLevel = "High";
    }

    resultsContainer.innerHTML = `<h2>Your Job Satisfaction Score is: ${averageScore.toFixed(2)}</h2><h3>Satisfaction Level: ${satisfactionLevel}</h3>`;
}

buildQuiz();
submitButton.addEventListener('click', showResults);
