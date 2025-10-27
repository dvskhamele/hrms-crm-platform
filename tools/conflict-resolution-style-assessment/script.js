const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit-btn');
const resultsContainer = document.getElementById('results');

const questions = [
    {
        question: "When a conflict arises, my first instinct is to:",
        answers: {
            a: "Address the issue directly and try to find a solution.",
            b: "Avoid the person or situation.",
            c: "Give in to the other person's demands to keep the peace.",
            d: "Try to find a middle ground where everyone gets something.",
            e: "Work with the other person to find a solution that satisfies both of our needs."
        },
        styles: { a: 'competing', b: 'avoiding', c: 'accommodating', d: 'compromising', e: 'collaborating' }
    },
    {
        question: "In a disagreement, I am most concerned with:",
        answers: {
            a: "Winning my point.",
            b: "Avoiding confrontation.",
            c: "Maintaining the relationship.",
            d: "Finding a quick and fair solution.",
            e: "Ensuring that both parties are happy with the outcome."
        },
        styles: { a: 'competing', b: 'avoiding', c: 'accommodating', d: 'compromising', e: 'collaborating' }
    },
    {
        question: "When someone has a different opinion than me, I tend to:",
        answers: {
            a: "Argue my point until they see my side.",
            b: "Change the subject or withdraw from the conversation.",
            c: "Agree with them, even if I don't really.",
            d: "Suggest we meet in the middle.",
            e: "Explore their perspective and try to understand their reasoning."
        },
        styles: { a: 'competing', b: 'avoiding', c: 'accommodating', d: 'compromising', e: 'collaborating' }
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
    const styles = { competing: 0, avoiding: 0, accommodating: 0, compromising: 0, collaborating: 0 };

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

    resultsContainer.innerHTML = `<h2>Your Dominant Conflict Resolution Style is: ${dominantStyle.charAt(0).toUpperCase() + dominantStyle.slice(1)}</h2>`;
}

buildQuiz();
submitButton.addEventListener('click', showResults);
