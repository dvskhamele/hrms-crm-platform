const generateBtn = document.getElementById('generate-btn');
const questionList = document.getElementById('question-list');

const feedbackQuestions = [
    "How effectively does the individual communicate with team members and stakeholders?",
    "Describe a situation where the individual demonstrated strong leadership skills.",
    "In what areas could the individual improve their collaboration with others?",
    "How well does the individual handle constructive criticism and feedback?",
    "Provide an example of how the individual contributes to a positive team environment.",
    "How effectively does the individual manage their workload and prioritize tasks?",
    "Describe a time when the individual went above and beyond their regular duties.",
    "What are the individual's greatest strengths that benefit the team/organization?",
    "What skills or areas do you think the individual should focus on for professional development?",
    "How effectively does the individual solve problems and make decisions?",
    "How well does the individual adapt to change and new challenges?",
    "Do you feel the individual consistently meets expectations in their role? Why or why not?",
    "What advice would you give this individual to help them grow and succeed?"
];

generateBtn.addEventListener('click', () => {
    questionList.innerHTML = '';
    feedbackQuestions.forEach(question => {
        const listItem = document.createElement('li');
        listItem.textContent = question;
        questionList.appendChild(listItem);
    });
});
