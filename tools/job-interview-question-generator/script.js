const jobRoleInput = document.getElementById('job-role');
const desiredSkillsInput = document.getElementById('desired-skills');
const generateBtn = document.getElementById('generate-btn');
const questionList = document.getElementById('question-list');

const baseQuestions = [
    "Tell me about yourself.",
    "Why are you interested in this position?",
    "What are your strengths and weaknesses?",
    "Where do you see yourself in five years?",
    "Why do you want to work for our company?",
    "Describe a challenging situation you faced at work and how you handled it.",
    "How do you handle pressure and deadlines?",
    "What are your salary expectations?",
    "Do you have any questions for us?"
];

const roleSpecificQuestions = {
    "software engineer": [
        "Describe your experience with [programming language, e.g., Python, Java].",
        "Explain the concept of [data structure, e.g., linked list, hash map] and its applications.",
        "Walk me through a recent project where you used [technology, e.g., React, Node.js].",
        "How do you approach debugging complex code?",
        "What are your thoughts on [software development methodology, e.g., Agile, Scrum]?"
    ],
    "marketing manager": [
        "Describe your experience developing and executing marketing campaigns.",
        "How do you measure the success of a marketing campaign?",
        "What are the latest trends in digital marketing that you're following?",
        "How do you approach market segmentation and targeting?",
        "Tell me about a time you had to adapt your marketing strategy due to unforeseen circumstances."
    ],
    "project manager": [
        "Describe your experience managing projects from conception to completion.",
        "How do you handle project risks and issues?",
        "What project management methodologies are you familiar with?",
        "How do you ensure effective communication within your project team?",
        "Tell me about a time you had to manage conflicting priorities on a project."
    ]
};

const skillSpecificQuestions = {
    "python": [
        "Describe a project where you extensively used Python.",
        "Explain Python's GIL (Global Interpreter Lock) and its implications.",
        "How do you handle errors and exceptions in Python?"
    ],
    "communication": [
        "Describe a situation where you had to communicate complex information to a non-technical audience.",
        "How do you ensure effective communication within a team?"
    ],
    "leadership": [
        "Tell me about a time you led a team to achieve a challenging goal.",
        "How do you motivate and inspire your team members?"
    ]
};

generateBtn.addEventListener('click', () => {
    const jobRole = jobRoleInput.value.trim().toLowerCase();
    const desiredSkills = desiredSkillsInput.value.split(',').map(skill => skill.trim().toLowerCase()).filter(skill => skill !== '');

    questionList.innerHTML = '';
    const generatedQuestions = new Set();

    // Add base questions
    baseQuestions.forEach(q => generatedQuestions.add(q));

    // Add role-specific questions
    if (roleSpecificQuestions[jobRole]) {
        roleSpecificQuestions[jobRole].forEach(q => generatedQuestions.add(q));
    }

    // Add skill-specific questions
    desiredSkills.forEach(skill => {
        if (skillSpecificQuestions[skill]) {
            skillSpecificQuestions[skill].forEach(q => generatedQuestions.add(q));
        }
    });

    generatedQuestions.forEach(question => {
        const listItem = document.createElement('li');
        listItem.textContent = question;
        questionList.appendChild(listItem);
    });

    if (generatedQuestions.size === 0) {
        const listItem = document.createElement('li');
        listItem.textContent = "No specific questions generated. Try different keywords or skills.";
        questionList.appendChild(listItem);
    }
});

// Generate default questions on load
generateBtn.click();
