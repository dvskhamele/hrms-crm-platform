const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit-btn');
const resultsContainer = document.getElementById('results');

const questions = [
    {
        question: "How many employees will be affected by the change?",
        answers: {
            a: "A few",
            b: "Some",
            c: "Many",
            d: "Most",
            e: "All"
        },
        scores: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
        question: "How significant is the change to employees' daily work?",
        answers: {
            a: "Not at all",
            b: "Slightly",
            c: "Moderately",
            d: "Very",
            e: "Extremely"
        },
        scores: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
        question: "How much resistance do you expect to the change?",
        answers: {
            a: "None",
            b: "A little",
            c: "Some",
            d: "A lot",
            e: "A great deal"
        },
        scores: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
        question: "How much training will be required to implement the change?",
        answers: {
            a: "None",
            b: "A little",
            c: "Some",
            d: "A lot",
            e: "A great deal"
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

    questions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        if (userAnswer) {
            totalScore += currentQuestion.scores[userAnswer];
        }
    });

    let impactLevel = "";
    if (totalScore <= 8) {
        impactLevel = "Low";
    } else if (totalScore <= 14) {
        impactLevel = "Medium";
    } else {
        impactLevel = "High";
    }

    resultsContainer.innerHTML = `<h2>The Change Impact Score is: ${totalScore}</h2><h3>Impact Level: ${impactLevel}</h3>`;
}

buildQuiz();
submitButton.addEventListener('click', showResults);
