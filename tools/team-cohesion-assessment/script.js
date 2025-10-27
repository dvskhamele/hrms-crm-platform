const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit-btn');
const resultsContainer = document.getElementById('results');

const questions = [
    {
        question: "Team members are comfortable sharing their opinions, even if they are different from the rest of the group.",
        answers: {
            a: "Strongly Disagree",
            b: "Disagree",
            c: "Neutral",
            d: "Agree",
            e: "Strongly Agree"
        },
        scores: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
        question: "Team members trust each other.",
        answers: {
            a: "Strongly Disagree",
            b: "Disagree",
            c: "Neutral",
            d: "Agree",
            e: "Strongly Agree"
        },
        scores: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
        question: "Team members are able to resolve conflicts effectively.",
        answers: {
            a: "Strongly Disagree",
            b: "Disagree",
            c: "Neutral",
            d: "Agree",
            e: "Strongly Agree"
        },
        scores: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
        question: "Team members are committed to the team's goals.",
        answers: {
            a: "Strongly Disagree",
            b: "Disagree",
            c: "Neutral",
            d: "Agree",
            e: "Strongly Agree"
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
    let cohesionLevel = "";
    if (averageScore < 2.5) {
        cohesionLevel = "Low";
    } else if (averageScore < 4) {
        cohesionLevel = "Moderate";
    } else {
        cohesionLevel = "High";
    }

    resultsContainer.innerHTML = `<h2>Your Team Cohesion Score is: ${averageScore.toFixed(2)}</h2><h3>Cohesion Level: ${cohesionLevel}</h3>`;
}

buildQuiz();
submitButton.addEventListener('click', showResults);
