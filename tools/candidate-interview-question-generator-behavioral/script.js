document.addEventListener('DOMContentLoaded', () => {
    const skillAreaSelect = document.getElementById('skill-area');
    const generateBtn = document.getElementById('generate-btn');
    const questionsList = document.getElementById('questions-list');

    const behavioralQuestions = {
        teamwork: [
            "Tell me about a time you had to work closely with someone whose personality was very different from yours. How did you handle it?",
            "Describe a situation where you were part of a team that struggled to meet a deadline. What was your role, and what was the outcome?",
            "Give me an example of a time you had to put team goals ahead of your own. What was the situation, and what did you do?",
            "How do you handle conflict within a team? Provide a specific example.",
            "Describe a project where you collaborated with others. What was your contribution, and what did you learn from the experience?"
        ],
        leadership: [
            "Tell me about a time you had to motivate a team through a difficult project. What strategies did you use?",
            "Describe a situation where you had to make an unpopular decision as a leader. How did you communicate it, and what was the result?",
            "Give me an example of a time you successfully delegated tasks to team members. How did you ensure their success?",
            "How do you handle underperforming team members? Provide a specific example.",
            "Describe a time you mentored someone. What was their challenge, and how did you help them overcome it?"
        ],
        problem_solving: [
            "Tell me about a complex problem you faced at work and how you solved it. What was your thought process?",
            "Describe a situation where you had to make a quick decision without all the necessary information. What was the outcome?",
            "Give me an example of a time you identified a potential problem before it became a major issue. What did you do?",
            "How do you approach a situation where a solution you proposed didn't work? Provide a specific example.",
            "Describe a time you had to analyze a large amount of data to solve a problem. What was your approach?"
        ],
        adaptability: [
            "Tell me about a time you had to adjust to a significant change in your workplace. How did you adapt?",
            "Describe a situation where your priorities suddenly shifted. How did you manage the change?",
            "Give me an example of a time you had to learn a new skill or technology quickly. What was your process?",
            "How do you handle unexpected challenges or setbacks in a project? Provide a specific example.",
            "Describe a time you received feedback that required you to change your approach. How did you respond?"
        ],
        communication: [
            "Tell me about a time you had to explain a complex idea to someone who wasn't familiar with the topic. How did you ensure they understood?",
            "Describe a situation where you had to deliver difficult news to a colleague or client. How did you approach it?",
            "Give me an example of a time you had to resolve a misunderstanding through communication. What was the situation, and what did you do?",
            "How do you ensure effective communication when working with remote team members? Provide a specific example.",
            "Describe a time you had to persuade someone to agree with your point of view. What was your strategy?"
        ]
    };

    generateBtn.addEventListener('click', () => {
        const selectedSkill = skillAreaSelect.value;
        const questions = behavioralQuestions[selectedSkill];

        questionsList.innerHTML = ''; // Clear previous questions

        if (questions && questions.length > 0) {
            questions.forEach(question => {
                const listItem = document.createElement('li');
                listItem.textContent = question;
                questionsList.appendChild(listItem);
            });
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = "No questions available for this skill area yet. Please select another or check back later!";
            questionsList.appendChild(listItem);
        }
    });
});