const generateBtn = document.getElementById('generate-btn');
const questionList = document.getElementById('question-list');

const exitInterviewQuestions = [
    "What prompted you to start looking for another job?",
    "What are your reasons for leaving this company?",
    "What did you like most about your job and the company?",
    "What did you like least about your job and the company?",
    "Do you feel you had the resources and support to do your job effectively?",
    "How would you describe the management style of your direct supervisor?",
    "Did you feel valued and recognized for your contributions?",
    "Were your job responsibilities accurately described to you during the hiring process?",
    "What suggestions do you have for improving our company culture?",
    "What could the company have done to retain you?",
    "Would you recommend this company as an employer to others? Why or why not?",
    "What advice would you give to your successor?",
    "Do you have any additional comments or feedback you'd like to share?"
];

generateBtn.addEventListener('click', () => {
    questionList.innerHTML = '';
    exitInterviewQuestions.forEach(question => {
        const listItem = document.createElement('li');
        listItem.textContent = question;
        questionList.appendChild(listItem);
    });
});