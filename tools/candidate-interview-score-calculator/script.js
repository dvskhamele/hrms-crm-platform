const criteriaInputs = document.getElementById('criteria-inputs');
const calculateBtn = document.getElementById('calculate-btn');
const totalScoreSpan = document.getElementById('total-score');

const interviewCriteria = [
    "Technical Skills",
    "Problem Solving",
    "Communication",
    "Teamwork",
    "Experience",
    "Cultural Fit"
];

function initializeCriteria() {
    criteriaInputs.innerHTML = '';
    interviewCriteria.forEach(criteria => {
        const criteriaItem = document.createElement('div');
        criteriaItem.classList.add('criteria-item');
        criteriaItem.innerHTML = `
            <label for="${criteria.toLowerCase().replace(/\s/g, '-')}">${criteria}:</label>
            <input type="number" id="${criteria.toLowerCase().replace(/\s/g, '-')}" min="0" max="10" value="0">
        `;
        criteriaInputs.appendChild(criteriaItem);
    });
}

calculateBtn.addEventListener('click', () => {
    let totalScore = 0;
    interviewCriteria.forEach(criteria => {
        const inputElement = document.getElementById(criteria.toLowerCase().replace(/\s/g, '-'));
        totalScore += parseInt(inputElement.value) || 0;
    });
    totalScoreSpan.textContent = totalScore;
});

// Initialize criteria on page load
initializeCriteria();
