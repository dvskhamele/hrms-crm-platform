const categorySelect = document.getElementById('category');
const generateBtn = document.getElementById('generate-btn');
const phraseList = document.getElementById('phrase-list');

const phrases = {
    "communication": [
        "Effectively communicates ideas and information to colleagues and clients.",
        "Actively listens and seeks to understand others' perspectives.",
        "Provides clear and concise written and verbal communication.",
        "Needs to improve clarity and conciseness in written communications.",
        "Struggles to articulate ideas effectively in team meetings."
    ],
    "teamwork": [
        "Collaborates effectively with team members to achieve common goals.",
        "Supports colleagues and contributes positively to team morale.",
        "Shares knowledge and resources willingly with the team.",
        "Needs to improve collaboration and participation in team projects.",
        "Tends to work in isolation rather than engaging with the team."
    ],
    "leadership": [
        "Inspires and motivates team members to perform at their best.",
        "Provides clear direction and guidance to the team.",
        "Delegates tasks effectively and empowers team members.",
        "Needs to develop stronger leadership presence and decision-making skills.",
        "Struggles to provide constructive feedback and guidance to direct reports."
    ],
    "problem-solving": [
        "Identifies problems quickly and develops effective solutions.",
        "Approaches challenges with a logical and analytical mindset.",
        "Demonstrates creativity and innovation in resolving issues.",
        "Needs to improve analytical skills to identify root causes of problems.",
        "Tends to rely on others to solve complex problems."
    ],
    "productivity": [
        "Consistently meets or exceeds performance expectations.",
        "Manages time effectively and prioritizes tasks efficiently.",
        "Delivers high-quality work within established deadlines.",
        "Needs to improve time management and prioritization to meet deadlines consistently.",
        "Struggles with managing workload and often misses targets."
    ]
};

generateBtn.addEventListener('click', () => {
    const selectedCategory = categorySelect.value;
    phraseList.innerHTML = '';

    if (phrases[selectedCategory]) {
        phrases[selectedCategory].forEach(phrase => {
            const listItem = document.createElement('li');
            listItem.textContent = phrase;
            phraseList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = "No phrases available for this category.";
        phraseList.appendChild(listItem);
    }
});

// Generate default phrases on load
generateBtn.click();