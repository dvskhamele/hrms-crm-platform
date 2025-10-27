const competencySelect = document.getElementById('competency');
const generateBtn = document.getElementById('generate-btn');
const questionList = document.getElementById('question-list');

const behavioralQuestions = {
    "teamwork": [
        "Tell me about a time you had to work closely with someone whose personality was very different from yours.",
        "Describe a situation where you were part of a team that struggled. What was your role, and what was the outcome?",
        "Give me an example of a time you had to put team goals ahead of your own."
    ],
    "problem-solving": [
        "Describe a complex problem you faced at work. How did you approach it, and what was the result?",
        "Tell me about a time you made a mistake. What did you learn from it?",
        "Give me an example of a time you had to think outside the box to solve a challenge."
    ],
    "communication": [
        "Describe a situation where you had to explain complex information to someone who was not familiar with the topic. How did you ensure they understood?",
        "Tell me about a time your communication style was misunderstood. What happened, and what did you do to clarify?",
        "Give me an example of a time you had to deliver difficult news. How did you approach it?"
    ],
    "leadership": [
        "Tell me about a time you had to motivate a team or individual to achieve a goal.",
        "Describe a situation where you had to make a difficult decision as a leader. What was the outcome?",
        "Give me an example of a time you had to delegate tasks. How did you ensure success?"
    ],
    "adaptability": [
        "Describe a time you had to adjust to a significant change at work. How did you handle it?",
        "Tell me about a situation where you had to learn a new skill or technology quickly. How did you approach it?",
        "Give me an example of a time you had to work under constantly changing priorities. How did you manage?"
    ]
};

generateBtn.addEventListener('click', () => {
    const selectedCompetency = competencySelect.value;
    questionList.innerHTML = '';

    if (behavioralQuestions[selectedCompetency]) {
        behavioralQuestions[selectedCompetency].forEach(question => {
            const listItem = document.createElement('li');
            listItem.textContent = question;
            questionList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = "No questions available for this competency.";
        questionList.appendChild(listItem);
    }
});

// Generate default questions on load
generateBtn.click();
